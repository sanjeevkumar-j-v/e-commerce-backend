const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    totalAmount: {
      type: Number,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartitemIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cartitem",
    }],
    ordered: {
      type: Boolean
    }
  },
  {
    timestamps: true,
  }
);


const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;