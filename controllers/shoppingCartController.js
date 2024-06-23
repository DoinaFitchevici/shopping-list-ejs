const Product = require("../models/product");
const ShoppingCart = require("../models/ShoppingCart");

const getCart = async (req, res) => {
  try {
    const cart = await ShoppingCart.findOne({ user: req.user._id }).populate(
      "products.product"
    );
    const products = await Product.find(); // Fetch products for dropdown
    res.render("cart/index", { cart, products });
  } catch (error) {
    // res.status(500).send("Server Error");
    console.error("Error fetching shopping cart:", error);
    req.flash("error", "Error fetching shopping cart.");
    res.redirect("/");
  }
};

const getAddItemForm = async (req, res) => {
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
    res.redirect("/cart");
  } catch (error) {
    //res.status(500).send("Server Error");
    console.error("Error adding to cart:", error);
    req.flash("error", "Could not add product to cart.");
    res.redirect("/cart/new");
  }
};

const deleteFromCart = async (req, res) => {
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

module.exports = {
  getCart,
  getAddItemForm,
  addToCart,
  deleteFromCart,
};
