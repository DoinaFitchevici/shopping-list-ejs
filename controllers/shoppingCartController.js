const ShoppingCart = require("../models/ShoppingCart");

const getCart = async (req, res) => {
  try {
    const cart = await ShoppingCart.findOne({ user: req.user._id }).populate(
      "products.product"
    );
    res.render("cart/index", { cart });
  } catch (error) {
    res.status(500).send("Server Error");
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
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getCart,
  addToCart,
};
