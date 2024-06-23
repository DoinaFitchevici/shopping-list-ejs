const Product = require("../models/product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.render("products/index", { products });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

const newProductForm = (req, res) => {
  res.render("products/new");
};

const addProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    console.log("Form Data:", { name, price });
    await Product.create({ name, price, createdBy: req.user._id });
    req.flash("success", "Product added successfully!");
    res.redirect("/products");
  } catch (error) {
    console.error("Error adding product:", error);
    req.flash("error", "Error adding product.");
    res.redirect("/products/new");
  }
};

const editProductForm = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render("products/edit", { product });
  } catch (error) {
    console.error("Error fetching product:", error);
    req.flash("error", "Error fetching product.");
    res.redirect("/products");
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    await Product.findByIdAndUpdate(req.params.id, { name, price });
    req.flash("success", "Product updated successfully!");
    res.redirect("/products");
  } catch (error) {
    console.error("Error updating product:", error);
    req.flash("error", "Error updating product.");
    res.redirect(`/products/edit/${req.params.id}`);
  }
};

module.exports = {
  getProducts,
  newProductForm,
  addProduct,
  editProductForm,
  updateProduct,
};
