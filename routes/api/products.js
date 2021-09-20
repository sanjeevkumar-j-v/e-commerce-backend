const express = require("express");

const router = express.Router();
const productsController = require("../../controllers/product_controller");

router.get("/", productsController.view);

module.exports = router;
