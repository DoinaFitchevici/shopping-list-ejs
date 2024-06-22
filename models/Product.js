const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
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
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    required: true,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
