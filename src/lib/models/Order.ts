import mongoose from "mongoose";
import "./User";
import "./Product";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        price: Number,
      },
    ],
    totalAmount: Number,
    status: { type: String, default: "paid" },
    stripeSessionId: String,
    shippingAddress: Object,
    billingEmail: String,
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
