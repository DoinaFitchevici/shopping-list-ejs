const express = require("express");
const shoppingListController = require("../controllers/shoppingListController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ShoppingList
 *   description: API to manage the shopping list.
 */

/**
 * @swagger
 * /shoppingList:
 *   get:
 *     summary: Retrieve the shopping list
 *     tags: [ShoppingList]
 *     responses:
 *       200:
 *         description: The shopping list.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingList'
 */

router.get("/", shoppingListController.getShoppingList);

/**
 * @swagger
 * /shoppingList/add:
 *   get:
 *     summary: Get a form to add an item to the shopping list
 *     tags: [ShoppingList]
 *     responses:
 *       200:
 *         description: The add item form.
 */

router.get("/add", shoppingListController.getAddItemForm);

/**
 * @swagger
 * /shoppingList/add:
 *   post:
 *     summary: Add an item to the shopping list
 *     tags: [ShoppingList]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShoppingList'
 *     responses:
 *       201:
 *         description: The item was successfully added.
 *       400:
 *         description: Bad request.
 */

router.post("/add", shoppingListController.addToShoppingList);

/**
 * @swagger
 * /shoppingList/delete/{productId}:
 *   post:
 *     summary: Delete an item from the shopping list
 *     tags: [ShoppingList]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID.
 *     responses:
 *       200:
 *         description: The item was successfully deleted.
 *       404:
 *         description: The item was not found.
 */

router.post(
  "/delete/:productId",
  shoppingListController.deleteFromShoppingList
);

/**
 * @swagger
 * /shoppingList/markItemDone/{productId}:
 *   get:
 *     summary: Mark an item as done
 *     tags: [ShoppingList]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID.
 *     responses:
 *       200:
 *         description: The item was successfully marked as done.
 *       404:
 *         description: The item was not found.
 */

router.get("/markItemDone/:productId", shoppingListController.markItemDone);

module.exports = router;
