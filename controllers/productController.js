const Product = require("../models/product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("store");
    res.render("products/index", { products });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getProducts,
};
