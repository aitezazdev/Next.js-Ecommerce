import mongoose, { Schema } from "mongoose";
import "./Product";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
      size: {
        type: String,
      },
    },
  ],
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
