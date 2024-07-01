const express = require("express");
const shoppingCartController = require("../controllers/shoppingCartController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: API to manage the shopping cart.
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Retrieve the shopping cart
 *     tags: [ShoppingCart]
 *     responses:
 *       200:
 *         description: The shopping cart of the user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingCart'
 *       401:
 *         description: Unauthorized.
 */

router.get("/", shoppingCartController.getCart);

/**
 * @swagger
 * /cart/add:
 *   get:
 *     summary: Get a form to add an item to the cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: The add item form.
 */

router.get("/add", shoppingCartController.getAddItemForm);

/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Add an item to the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShoppingCart'
 *     responses:
 *       201:
 *         description: The item was successfully added.
 *       400:
 *         description: Bad request.
 */

router.post("/add", shoppingCartController.addToCart);

/**
 * @swagger
 * /cart/delete/{productId}:
 *   post:
 *     summary: Delete an item from the cart
 *     tags: [Cart]
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

router.post("/delete/:productId", shoppingCartController.deleteFromCart);

module.exports = router;
