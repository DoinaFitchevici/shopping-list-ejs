const Product = require("../models/product");
const ShoppingCart = require("../models/ShoppingCart");

const getCart = async (req, res) => {
  if (!req.user) {
    return res.redirect("/sessions/logon");
  }
  const page = parseInt(req.query.page) || 1;
  const limit = 8;
  const skip = (page - 1) * limit;

  try {
    const cart = await ShoppingCart.findOne({ user: req.user._id })
      .populate("products.product")
      .lean();

    if (cart) {
      const totalProducts = cart.products.length;
      const paginatedProducts = cart.products.slice(skip, skip + limit);
      const totalPages = Math.ceil(totalProducts / limit);

      res.render("cart/index", {
        cart: { ...cart, products: paginatedProducts },
        page,
        totalPages,
        successMessages: req.flash("success"),
        errorMessages: req.flash("error"),
      });
    } else {
      res.render("cart/index", {
        cart: { products: [] },
        page: 1,
        totalPages: 1,
        successMessages: req.flash("success"),
        errorMessages: req.flash("error"),
      });
    }
  } catch (error) {
    console.error("Error fetching shopping cart:", error);
    req.flash("error", "Error fetching shopping cart.");
    res.redirect("/");
  }
};

const getAddItemForm = async (req, res) => {
  if (!req.user) {
    return res.redirect("/sessions/logon");
  }
  try {
    const products = await Product.find();
    res.render("cart/add", { products });
  } catch (error) {
    console.error("Error fetching products:", error);
    req.flash("error", "Error fetching products.");
    res.redirect("/cart");
  }
};

const addToCart = async (req, res) => {
  if (!req.user) {
    return res.redirect("/sessions/logon");
  }
  try {
    let cart = await ShoppingCart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new ShoppingCart({ user: req.user._id, products: [] });
    }
    const { productId, quantity } = req.body;
    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );
    if (productIndex > -1) {
      cart.products[productIndex].quantity += parseInt(quantity, 10);
    } else {
      cart.products.push({ product: productId, quantity });
    }
    await cart.save();
    req.flash("info", "Product added to cart.");
    res.redirect("/cart?page=1");
  } catch (error) {
    //res.status(500).send("Server Error");
    console.error("Error adding to cart:", error);
    req.flash("error", "Could not add product to cart.");
    res.redirect("/cart/new");
  }
};

const deleteFromCart = async (req, res) => {
  if (!req.user) {
    return res.redirect("/sessions/logon");
  }
  try {
    let cart = await ShoppingCart.findOne({ user: req.user._id });
    const productId = req.params.productId;
    cart.products = cart.products.filter(
      (product) => product.product.toString() !== productId
    );
    await cart.save();
    req.flash("info", "Product removed from cart.");
    res.redirect("/cart");
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

const markItemDone = async (req, res) => {
  if (!req.user) {
    return res.redirect("/sessions/logon");
  }
  const productId = req.params.productId;
  const { done } = req.body;

  try {
    const cart = await ShoppingCart.findOne({ user: req.user._id });
    const product = cart.products.find((item) =>
      item.product.equals(productId)
    );

    if (product) {
      product.done = done;
      await cart.save();
      res.status(200).send({ success: true });
    } else {
      res.status(404).send({ error: "Product not found in cart" });
    }
  } catch (error) {
    res.status(500).send({ error: "An error occurred" });
  }
};

module.exports = {
  getCart,
  getAddItemForm,
  addToCart,
  deleteFromCart,
  markItemDone,
};
