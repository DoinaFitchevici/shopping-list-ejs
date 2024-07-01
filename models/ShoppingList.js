const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     ShoppingList:
 *       type: object
 *       required:
 *         - user
 *         - products
 *       properties:
 *         user:
 *           type: string
 *           description: The user ID.
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 description: The product ID.
 *               quantity:
 *                 type: number
 *                 description: The quantity of the product.
 *               done:
 *                 type: boolean
 *                 description: Whether the item is done.
 */

const ShoppingListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      done: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

module.exports = mongoose.model("ShoppingList", ShoppingListSchema);
