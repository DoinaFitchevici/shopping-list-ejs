const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.get("/", productController.getProducts);
router.post("/add", productController.addProduct);
router.get("/new", productController.newProductForm);
router.get("/edit/:id", productController.editProductForm);
router.post("/update/:id", productController.updateProduct);
router.post("/delete/:productId", productController.deleteProduct);

module.exports = router;
