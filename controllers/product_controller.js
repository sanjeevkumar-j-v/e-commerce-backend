const path = require("path");
const Product = require("../models/product");

// renders products page
module.exports.view = async function (req, res, next) {
  var products = await Product.find({});
  return res.render("products", {
    products,
  });
};

module.exports.product = function (req, res) {
  return res.end("<h1>product details</h1>");
};

module.exports.update = async function (req, res) {
  return res.redirect("back");
};

module.exports.delete = async function (req, res) {
  // console.log("Delete product: ", req.params.id);
  Product.findByIdAndDelete({ _id: req.params.id }, function (err) {
    if (err) {
      console.log("Error: ", err);
      return;
    }
    console.log("Product deleted");
  });
  return res.redirect("/products");
};

module.exports.create = function (req, res) {
  return res.render("createproduct");
};
module.exports.modify = async function (req, res) {
  var products = await Product.find({});
  return res.render("modifyproducts", {
    products,
  });
};
module.exports.update = async function (req, res) {
  // console.log("Delete product: ", req.params.id);
  Product.findByIdAndUpdate(req.body.id, req.body, function (err) {
    if (err) {
      console.log("Error: ", err);
      return;
    }
    console.log("Product Updated");
    return res.redirect("/products");
  });
};
module.exports.add = function (req, res) {
  Product.uploadedImage(req, res, function (err) {
    console.log("req.body : ", req.body);
    Product.findOne({ name: req.body.name }, function (err, product) {
      if (err) {
        console.log("Error in finding product: ", err);
        return;
      }

      if (!product) {
        let prod = req.body;
        prod.sales_count = 0;
        if (req.file) {
          prod.img_url = Product.productPath + "/" + req.file.filename;
        }
        Product.create(prod, function (err, product) {
          if (err) {
            console.log("Error in creating new product: ", err);
            return;
          }
          console.log("Product: ", product);
          return res.redirect("/products");
        });
      } else {
        return res.redirect("back");
      }
    });
  });
};
module.exports.remove = async function (req, res) {
  // console.log("Delete product: ", req.params.id);
  Product.findByIdAndDelete(req.params.productId , function (err) {
    if (err) {
      console.log("Error: ", err);
      return res.redirect('/');
    }
    console.log("Product deleted");
    return res.redirect("/products");
  });
};