const express = require("express");
const shoppingCartController = require("../controllers/shoppingCartController");

const router = express.Router();

router.get("/", shoppingCartController.getCart);
router.get("/add", shoppingCartController.getAddItemForm);
router.post("/add", shoppingCartController.addToCart);
router.post("/delete/:productId", shoppingCartController.deleteFromCart);

module.exports = router;
