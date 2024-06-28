const express = require("express");
const productController = require("../controllers/productController");
const isAdmin = require("../middleware/adminAccess");
const router = express.Router();

router.get("/", isAdmin, productController.getProducts);
router.post("/add", productController.addProduct);
router.get("/new", isAdmin, productController.newProductForm);
router.get("/edit/:id", isAdmin, productController.editProductForm);
router.post("/update/:id", productController.updateProduct);
router.post("/delete/:productId", productController.deleteProduct);

module.exports = router;
