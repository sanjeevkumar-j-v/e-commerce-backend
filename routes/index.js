var express = require('express');
var router = express.Router();
var usersRouter = require("./users");
var productsRouter = require("./products");
var cartRouter = require("./cart");
var orderRouter = require("./order");
var productContoller = require("../controllers/product_controller.js");

var passport = require("passport");

/* GET home page. */
router.get('/', productContoller.topsales);
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard');
});
router.use("/users", usersRouter);
router.use("/products", passport.checkAuthentication, productsRouter);
router.use("/cart",passport.checkAuthentication, cartRouter);
router.use("/orders",passport.checkAuthentication, orderRouter);

router.use("/api", require("./api"));

module.exports = router;
