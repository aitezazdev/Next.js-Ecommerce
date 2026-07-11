import { connectDB } from "@/lib/db";
import { verifyAuth } from "@/lib/middlewares/auth";
import { handleApiError } from "@/lib/middlewares/error";
import { Product } from "@/lib/models/Product";
import { User } from "@/lib/models/User";
import { CartItem } from "@/types/cart";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const decoded = await verifyAuth(req);
    const userId = decoded.userId;
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { productId, quantity = 1, size } = await req.json();

    const isValidId = mongoose.Types.ObjectId.isValid(productId);
    if (!isValidId) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    if (!productId || !quantity || !size) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const safeQuantity = Math.max(1, quantity);

    const existingCartItem = user.cart.find(
      (item: CartItem) =>
        item.product.toString() === productId && item.size === size
    );
    if (existingCartItem) {
      existingCartItem.quantity += safeQuantity;
      await user.save();
    } else {
      user.cart.push({ product: productId, quantity: safeQuantity, size });
      await user.save();
    }

    await user.save();
    await user.populate("cart.product");

    const originalLength = user.cart?.length || 0;
    user.cart = (user.cart || []).filter((item: any) => item.product !== null);
    if (user.cart.length !== originalLength) {
      await user.save();
    }

    return NextResponse.json(
      {
        message: "Product added to cart successfully",
        cart: user.cart,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
};
