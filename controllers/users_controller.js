const User = require('../models/user');

module.exports.profile = function (req, res) {
  return res.render("profile");
};

module.exports.update = async function (req, res) {
  return res.redirect("back");
};

// render sign up page
module.exports.signUp = function (req, res) {
  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }
  return res.render("signup");
};

// render sign in page
module.exports.signIn = function (req, res) {
  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }
  return res.render("signin");
};

// get the sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect('back');
  }

  User.findOne({email: req.body.email}, function(err, user){
      if(err){console.log('Error in finding user in signing up'); return;}

      if(!user) {
          User.create(req.body, function(err, user){
              if(err){console.log('Error in creating user in signing up'); return;}
              console.log("User: ", user);
              return res.redirect('/users/sign-in');
          })
      }else{
          return res.redirect('back');
      }

  });
  // return res.redirect("/");
};

// sign in  and create a session for user
module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout();
  return res.redirect("/");
};
