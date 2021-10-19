const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
    },
    address: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
    totalAmount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);


const Order = mongoose.model("Order", orderSchema);

module.exports = Order;