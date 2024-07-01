const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - createdBy
 *       properties:
 *         name:
 *           type: string
 *           description: The product name
 *         price:
 *           type: number
 *           description: The product price
 *         description:
 *           type: string
 *           description: The product description
 *         isActive:
 *           type: boolean
 *           description: Whether the product is active
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: The product tags
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The product creation date
 *         createdBy:
 *           type: string
 *           description: The user who created the product
 */

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide product name"],
      minlength: 3,
      maxlength: 50,
    },
    price: {
      type: Number,
      required: [true, "Please provide product price"],
      min: 0.01,
    },
    description: {
      type: String,
      maxlength: 255,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
