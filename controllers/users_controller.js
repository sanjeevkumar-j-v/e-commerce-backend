const User = require('../models/user');
const Order = require("../models/order");
const Cart = require('../models/cart');
const Product = require('../models/product');
const Cartitem = require('../models/cartitem');

module.exports.profile = async function (req, res) {
  Order.find({userId: req.user._id}, async function(err, orders) {
    var allOrders = [];
    if (orders) {
      for (i in orders) {
        var cart = await Cart.findById(orders[i].cartId);
        var cartDetails = [];
        for (var j in cart.cartitemIds) {
          var cartitem = await Cartitem.findById(cart.cartitemIds[j]);
          if (cartitem) {
            var prod = await Product.findById(cartitem.productId);
            cartDetails.push({
              item: prod.name,
              count: cartitem.count,
            });
          }
        }
        var order = {};
        order.totalAmount = orders[i].totalAmount;
        order.status = orders[i].status;
        order.address = orders[i].address;
        order.date = String(orders[i].createdAt).substring(0,16);
        order.cartDetails = cartDetails;
        // console.log(cartDetails);
        allOrders.push(order);
      }
    }
    console.log("My orders: ", allOrders);
    // console.log(Date().substring(0,16));
    return res.render("profile", {orders: allOrders});
  });
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
  return res.redirect("/users/profile");
};

module.exports.destroySession = function (req, res) {
  req.logout();
  return res.redirect("/");
};
