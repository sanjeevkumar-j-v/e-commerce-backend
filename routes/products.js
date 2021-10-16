var express = require("express");
var router = express.Router();
var productContoller = require("../controllers/product_controller.js");
const passport = require("passport");

router.get("/", passport.checkAuthentication, productContoller.view);
router.get("/create", productContoller.create);
router.post("/add", productContoller.add);

module.exports = router;
