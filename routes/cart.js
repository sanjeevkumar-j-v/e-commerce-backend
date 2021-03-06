var express = require("express");
var router = express.Router();
var cartContoller = require("../controllers/cart_controller.js");

router.get("/", cartContoller.view);
router.get("/purchase", cartContoller.viewpurchase);
router.get("/confirm-purchase", cartContoller.purchase);
router.get("/add/:productId", cartContoller.add);
router.get("/remove/:cartitemId", cartContoller.remove);

module.exports = router;
