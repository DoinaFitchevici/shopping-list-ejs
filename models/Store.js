const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide store name"],
    minlength: 3,
    maxlength: 50,
  },
  location: {
    type: String,
    required: [true, "Please provide store location"],
  },
});

module.exports = mongoose.model("Store", StoreSchema);
