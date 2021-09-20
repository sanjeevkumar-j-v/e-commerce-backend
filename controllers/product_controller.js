const path = require("path");
const Product = require("../models/product");

module.exports.view = async function (req, res, next) {
  var products = await Product.find({});
  return res.json(200, {
    products: products,
  });
};
