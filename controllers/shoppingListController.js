const Product = require("../models/product");
const ShoppingList = require("../models/ShoppingList");

const getShoppingList = async (req, res) => {
  if (!req.user) {
    return res.redirect("/sessions/logon");
  }
  const page = parseInt(req.query.page) || 1;
  const limit = 8;
  const skip = (page - 1) * limit;

  try {
    const shoppingList = await ShoppingList.findOne({ user: req.user._id })
      .populate("products.product")
      .lean();

    if (shoppingList) {
      const totalProducts = shoppingList.products.length;
      const paginatedProducts = shoppingList.products.slice(skip, skip + limit);
      const totalPages = Math.ceil(totalProducts / limit);

      res.render("shoppingList/index", {
        shoppingList: { ...shoppingList, products: paginatedProducts },
        page,
        totalPages,
        successMessages: req.flash("success"),
        errorMessages: req.flash("error"),
      });
    } else {
      res.render("shoppingList/index", {
        shoppingList: { products: [] },
        page: 1,
        totalPages: 1,
        successMessages: req.flash("success"),
        errorMessages: req.flash("error"),
      });
    }
  } catch (error) {
    console.error("Error fetching shopping shopping list:", error);
    req.flash("error", "Error fetching shopping shopping list.");
    res.redirect("/");
  }
};

const getAddItemForm = async (req, res) => {
  if (!req.user) {
    return res.redirect("/sessions/logon");
  }
  try {
    const products = await Product.find();
    res.render("shoppingList/add", { products });
  } catch (error) {
    console.error("Error fetching products:", error);
    req.flash("error", "Error fetching products.");
    res.redirect("/shoppingList");
  }
};

const addToShoppingList = async (req, res) => {
  if (!req.user) {
    return res.redirect("/sessions/logon");
  }
  try {
    let shoppingList = await ShoppingList.findOne({ user: req.user._id });
    if (!shoppingList) {
      shoppingList = new ShoppingList({ user: req.user._id, products: [] });
    }
    const { productId, quantity } = req.body;
    const productIndex = shoppingList.products.findIndex(
      (p) => p.product.toString() === productId
    );
    if (productIndex > -1) {
      shoppingList.products[productIndex].quantity += parseInt(quantity, 10);
    } else {
      shoppingList.products.push({ product: productId, quantity });
    }
    await shoppingList.save();
    req.flash("info", "Product added to shopping list.");
    res.redirect("/shoppingList?page=1");
  } catch (error) {
    //res.status(500).send("Server Error");
    console.error("Error adding to shopping list:", error);
    req.flash("error", "Could not add product to shopping list.");
    res.redirect("/shoppingList/new");
  }
};

const deleteFromShoppingList = async (req, res) => {
  if (!req.user) {
    return res.redirect("/sessions/logon");
  }
  try {
    let shoppingList = await ShoppingList.findOne({ user: req.user._id });
    const productId = req.params.productId;
    shoppingList.products = shoppingList.products.filter(
      (product) => product.product.toString() !== productId
    );
    await shoppingList.save();
    req.flash("info", "Product removed from shopping list.");
    res.redirect("/shoppingList");
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

const markItemDone = async (req, res) => {
  if (!req.user) {
    return res.redirect("/sessions/logon");
  }
  const productId = req.params.productId;

  try {
    const shoppingList = await ShoppingList.findOne({ user: req.user._id });
    const product = shoppingList.products.find((item) =>
      item.product.equals(productId)
    );

    if (product) {
      product.done = true;
      await shoppingList.save();
      const shoppingList2 = await ShoppingList.findOne({ user: req.user._id });
      console.log(shoppingList2);
      res.redirect("/shoppingList");
    } else {
      res.status(404).send({ error: "Product not found in shopping list" });
    }
  } catch (error) {
    res.status(500).send({ error: "An error occurred" });
  }
};

module.exports = {
  getShoppingList,
  getAddItemForm,
  addToShoppingList,
  deleteFromShoppingList,
  markItemDone,
};
