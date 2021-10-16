const mongoose = require("mongoose");

const multer = require("multer");
const path = require("path");
const PRODUCT_PATH = path.join("/uploads/products/images");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    ingredients: {
      type: String,
    },
    category: {
      type: String,
    },
    img_url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public", PRODUCT_PATH));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      req.body.name
      +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

// static methods
productSchema.statics.uploadedImage = multer({ storage: storage }).single(
  "img_url"
);
productSchema.statics.productPath = PRODUCT_PATH;

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
