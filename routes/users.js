var express = require('express');
var router = express.Router();

router.get("/sign-up", function(req, res) {
  return res.render("signup")
} );
router.get("/sign-in", function(req, res) {
  return res.render("signin")
} );

module.exports = router;
