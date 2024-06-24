const mongoose = require("mongoose");

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
    },
    description: {
      type: String,
      maxlength: 255, // Limiting description length
    },
    isActive: {
      type: Boolean,
      default: true, // Default value for isActive
    },
    tags: {
      type: [String], // Array of strings for product tags
      default: [], // Default empty array
    },
    createdAt: {
      type: Date,
      default: Date.now, // Default value set to current date/time
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
