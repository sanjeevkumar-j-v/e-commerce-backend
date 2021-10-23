var express = require("express");
var router = express.Router();
var productContoller = require("../controllers/product_controller.js");
const passport = require("passport");

router.get("/", passport.checkAuthentication, productContoller.view);
router.get("/create", productContoller.create);
router.get("/modify", productContoller.modify);
router.get("/remove/:productId", productContoller.remove);
router.post("/add", productContoller.add);
router.post("/update", productContoller.update);

module.exports = router;
