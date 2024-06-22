const Store = require("../models/store");

const getStores = async (req, res) => {
  try {
    const stores = await Store.find();
    res.render("stores/index", { stores });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getStores,
};
