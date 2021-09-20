const mongoose = require("mongoose");

const cartitemSchema = new mongoose.Schema(
  {
    count: {
      type: Number,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const Cartitem = mongoose.model("Cartitem", cartitemSchema);

module.exports = Cartitem;