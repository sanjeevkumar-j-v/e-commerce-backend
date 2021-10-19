var express = require("express");
var router = express.Router();
var orderController = require("../controllers/order_controller.js");

router.get("/", orderController.orders);
router.get("/view/:orderId", orderController.view);

module.exports = router;
