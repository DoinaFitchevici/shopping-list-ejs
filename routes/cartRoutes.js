const express = require("express");
const shoppingCartController = require("../controllers/shoppingCartController");

const router = express.Router();

router.get("/", shoppingCartController.getCart);
router.post("/add", shoppingCartController.addToCart);

module.exports = router;
