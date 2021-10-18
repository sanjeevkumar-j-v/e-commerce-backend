const path = require("path");
const Product = require("../models/product");
const Cart = require("../models/cart");
const Cartitem = require("../models/cartitem");
const User = require("../models/user");

module.exports.add = function (req, res) {
  try {
    Cart.findOne(
      { userId: req.user._id, ordered: false },
      function (err, cart) {
        if (err) {
          console.log("Error in finding Cart: ", err);
          return;
        }
        if (!cart) {
          Cartitem.create(
            {
              count: 1,
              productId: req.params.productId,
              // productID: req.user._id,
            },
            function (err, item) {
              if (err) {
                console.log("Error in creating Cartitem", err);
                return;
              }
              var newcart = {
                totalAmount: 0,
                userId: req.user._id,
                cartitemIds: [item._id],
                ordered: false,
              };
              Cart.create(newcart, function (err, cart) {
                if (err) {
                  console.log("Error in creating new product: ", err);
                  return;
                }
                console.log("My New Cart: ", cart);
                return res.redirect("/cart");
              });
            }
          );
        } else {
          console.log("Cart found: ", cart);
          Cartitem.find({ id: cart.cartitemIds }, function (err, olditems) {
            console.log("Old Cart Items: ", olditems);
            var existingCartitemId = null;
            for (var i in olditems) {
              console.log(
                "two ids..:",
                olditems[i].productId,
                req.params.productId
              );
              if (olditems[i].productId == req.params.productId) {
                existingCartitemId = olditems[i].id;
                console.log("existingCartitemId: ", existingCartitemId);
                break;
              }
            }
            if (!existingCartitemId) {
              Cartitem.create(
                {
                  count: 1,
                  productId: req.params.productId,
                  // productID: req.user._id,
                },
                function (err, item) {
                  if (err) {
                    console.log("Error in creating Cartitem", err);
                    return;
                  }
                  Cart.findByIdAndUpdate(
                    cart.id,
                    { $push: { cartitemIds: item._id } },
                    function (err, cart) {
                      if (err) {
                        console.log("Error in creating new product: ", err);
                        return;
                      }
                      console.log("Cart Updated: ", cart);
                      return res.redirect("/cart");
                    }
                  );
                }
              );
            } else {
              Cartitem.findByIdAndUpdate(
                existingCartitemId,
                { count: olditems[i].count + 1 },
                function (err, item) {
                  if (err) {
                    console.log("Error occured while updating cart item", err);
                    return;
                  }
                  console.log("Cart item updated: ", item);
                  return res.redirect("/cart");
                }
              );
            }
          });
          // return res.redirect("/users/profile");
        }
      }
    );
  } catch (err) {
    console.log("Error occured: ", err);
    return res.redirect("back");
  }
};

// renders products page
module.exports.view = async function (req, res, next) {
  var cart = await Cart.findOne({ userId: req.user._id, ordered: false });
  var cartDetails = [];
  if (cart) {
    for (var i in cart.cartitemIds) {
      var cartitem = await Cartitem.findById(cart.cartitemIds[i]);
      if (cartitem) {
        var prod = await Product.findById(cartitem.productId);
        cartDetails.push({
          id: cartitem.id,
          item: prod,
          count: cartitem.count,
        });
      }
    }
  }
  return res.render("cart", {
    cartDetails,
  });
};

module.exports.product = function (req, res) {
  return res.end("<h1>product details</h1>");
};

module.exports.update = async function (req, res) {
  return res.redirect("back");
};

module.exports.remove = async function (req, res) {
  // console.log("Delete product: ", req.params.id);
  Cartitem.findByIdAndDelete(req.params.cartitemId , function (err) {
    if (err) {
      console.log("Error: ", err);
      return res.redirect('/');
    }
    console.log("Cartitem deleted");
    return res.redirect("/cart");
  });
};

module.exports.create = function (req, res) {
  return res.render("createproduct");
};
