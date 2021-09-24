var express = require("express");
var router = express.Router();
const passport = require("passport");

const userController = require("../controllers/users_controller");

router.get("/profile", passport.checkAuthentication, userController.profile);
// router.get("/profile", passport.checkAuthentication, userController.profile);
router.post("/update", userController.update);

router.get("/sign-up", userController.signUp);
router.get("/sign-in", userController.signIn);
router.get("/sign-out", userController.destroySession);

router.post("/create", userController.create);

// use passport as middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  userController.createSession
);

module.exports = router;
