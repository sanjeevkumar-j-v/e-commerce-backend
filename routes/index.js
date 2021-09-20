var express = require('express');
var router = express.Router();
var usersRouter = require("./users");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

router.use("/users", usersRouter);

router.use("/api", require("./api"));

module.exports = router;
