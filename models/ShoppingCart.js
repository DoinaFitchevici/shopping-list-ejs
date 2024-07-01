const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     ShoppingCart:
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
 */

const ShoppingCartSchema = new mongoose.Schema({
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
    },
  ],
});

module.exports = mongoose.model("ShoppingCart", ShoppingCartSchema);
