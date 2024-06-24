const express = require("express");
const shoppingListController = require("../controllers/shoppingListController");

const router = express.Router();

router.get("/", shoppingListController.getShoppingList);
router.get("/add", shoppingListController.getAddItemForm); // New route to display add item form
router.post("/add", shoppingListController.addToShoppingList);
router.post(
  "/delete/:productId",
  shoppingListController.deleteFromShoppingList
);
router.get("/markItemDone/:productId", shoppingListController.markItemDone);

module.exports = router;
