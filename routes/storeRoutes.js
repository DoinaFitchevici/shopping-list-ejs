const express = require("express");
const storeController = require("../controllers/storeController");

const router = express.Router();

router.get("/", storeController.getStores);

module.exports = router;