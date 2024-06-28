const Product = require("../models/product");

const getProducts = async (req, res) => {
  if (!req.user) {
    return res.redirect("/sessions/logon");
  }
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 8;

    let products = await Product.find()
      .skip((page - 1) * limit)
      .limit(limit);

    if (req.query.sort === "name") {
      products = products.sort((a, b) => {
        if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
          return -1;
        }
        if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
          return 1;
        }
        return 0;
      });
    } else if (req.query.sort === "pricelow") {
      products = products.sort((a, b) => a.price - b.price);
    } else if (req.query.sort === "pricehigh") {
      products = products.sort((a, b) => b.price - a.price);
    }

    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    res.render("products/index", { products, page, totalPages });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

const newProductForm = (req, res) => {
  if (!req.user) {
    return res.redirect("/sessions/logon");
  }
  res.render("products/new");
};

const addProduct = async (req, res) => {
  if (!req.user) {
    return res.redirect("/sessions/logon");
  }
  try {
    const { name, price, description, isActive, tags, createdBy } = req.body;
    const formattedPrice = parseFloat(price).toFixed(2);
    const selectedTags = Array.isArray(tags) ? tags : [tags];

    await Product.create({
      name,
      price: formattedPrice,
      description,
      isActive: isActive === "on",
      tags: selectedTags,
      createdBy: req.user._id,
    });
    req.flash("success", "Product added successfully!");
    res.redirect("/products");
  } catch (error) {
    console.error("Error adding product:", error);
    req.flash("error", "Product name must be at least 3 characters long.");
    res.redirect("/products/new");
  }
};

const editProductForm = async (req, res) => {
  if (!req.user) {
    return res.redirect("/sessions/logon");
  }
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
  if (!req.user) {
    return res.redirect("/sessions/logon");
  }
  try {
    const { name, price, description, isActive, tags } = req.body;
    const selectedTags = Array.isArray(tags) ? tags : [tags];
    await Product.findByIdAndUpdate(req.params.id, {
      name,
      price: parseFloat(price).toFixed(2),
      description,
      isActive: isActive === "on",
      tags: selectedTags,
    });
    req.flash("success", "Product updated successfully!");
    res.redirect("/products");
  } catch (error) {
    console.error("Error updating product:", error);
    req.flash("error", "Error updating product.");
    res.redirect(`/products/edit/${req.params.id}`);
  }
};

const deleteProduct = async (req, res) => {
  if (!req.user) {
    return res.redirect("/sessions/logon");
  }
  const productId = req.params.productId;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      req.flash("error", "Product not found.");
    } else {
      req.flash("success", "Product deleted successfully.");
    }
    res.redirect("/products");
  } catch (error) {
    console.error("Error deleting product:", error);
    req.flash("error", "Could not delete product.");
    res.redirect("/products");
  }
};

module.exports = {
  getProducts,
  newProductForm,
  addProduct,
  editProductForm,
  updateProduct,
  deleteProduct,
};
