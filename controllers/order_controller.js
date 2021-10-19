const path = require("path");
const Product = require("../models/product");
const Cart = require("../models/cart");
const Cartitem = require("../models/cartitem");
const User = require("../models/user");
const Order = require("../models/order");


module.exports.orders = async function (req, res) {
  Order.find({}, async function(err, orders) {
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
        order._id = orders[i]._id;
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
    return res.render("orders", {orders: allOrders});
  });
};

module.exports.view = async function (req, res) {
  var order = await Order.findById(req.params.orderId);
  if (order) {
    var user = User.findById(order.userId);
    console.log("Order Found: ", order);

    var cart = await Cart.findById(order.cartId);
    var cartDetails = [];
    for (var j in cart.cartitemIds) {
      var cartitem = await Cartitem.findById(cart.cartitemIds[j]);
      if (cartitem) {
        var prod = await Product.findById(cartitem.productId);
        cartDetails.push({
          itemId: prod._id,
          item: prod.name,
          category: prod.category,
          count: cartitem.count,
        });
      }
    }
    var orderDetails = {};
    orderDetails._id = order._id;
    orderDetails.totalAmount = order.totalAmount;
    orderDetails.status = order.status;
    orderDetails.address = order.address;
    orderDetails.date = String(order.createdAt).substring(0,24);
    orderDetails.cartDetails = cartDetails;
    console.log(orderDetails);
    return res.render("order", {order: orderDetails});
  }
};
