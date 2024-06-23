const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.get("/", productController.getProducts);
router.post("/add", productController.addProduct); // New route for adding a product
router.get("/new", productController.newProductForm); // New route to display the form
router.get("/edit/:id", productController.editProductForm); // New route to display the edit form
router.post("/update/:id", productController.updateProduct); // New route to handle the update

module.exports = router;
