var express = require('express');
var router = express.Router();
var usersRouter = require("./users");
var productsRouter = require("./products");
var cartRouter = require("./cart");

var passport = require("passport");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard');
});
router.use("/users", usersRouter);
router.use("/products", passport.checkAuthentication, productsRouter);
router.use("/cart",passport.checkAuthentication, cartRouter);

router.use("/api", require("./api"));

module.exports = router;
