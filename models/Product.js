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
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

// ProductSchema.statics.getAllProducts = function () {
//   return this.find({});
// };

module.exports = mongoose.model("Product", ProductSchema);
