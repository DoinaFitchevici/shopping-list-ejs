const Product = require("../models/Product");
const ShoppingCart = require("../models/ShoppingCart");
const parseValidationErrors = require("../utils/parseValidationErrs");

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
    req.flash("success", "Product added to cart.");
    res.redirect("/cart?page=1");
  } catch (error) {
    console.error("Error adding to cart:", error);
    if (error.constructor.name === "ValidationError") {
      parseValidationErrors(error, req);
    } else {
      req.flash("error", error.message || "Could not add product to cart.");
    }
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
    req.flash("success", "Product removed from cart.");
    res.redirect("/cart");
  } catch (error) {
    console.error("Error removing from cart:", error);
    req.flash("error", "Could not remove product from cart.");
    res.redirect("/cart");
  }
};

module.exports = {
  getCart,
  getAddItemForm,
  addToCart,
  deleteFromCart,
};
