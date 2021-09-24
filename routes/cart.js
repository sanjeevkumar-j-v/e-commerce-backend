var express = require("express");
var router = express.Router();
var cartContoller = require("../controllers/cart_controller.js");

router.get("/", cartContoller.view);
router.get("/add/:productId", cartContoller.add);

module.exports = router;
