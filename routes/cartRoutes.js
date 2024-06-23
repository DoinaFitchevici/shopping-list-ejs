const express = require("express");
const shoppingCartController = require("../controllers/shoppingCartController");

const router = express.Router();

router.get("/", shoppingCartController.getCart);
router.get("/add", shoppingCartController.getAddItemForm); // New route to display add item form
router.post("/add", shoppingCartController.addToCart);
router.post("/delete/:productId", shoppingCartController.deleteFromCart);

module.exports = router;
