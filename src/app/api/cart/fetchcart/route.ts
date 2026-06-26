import { connectDB } from "@/lib/db";
import { verifyAuth } from "@/lib/middlewares/auth";
import { handleApiError } from "@/lib/middlewares/error";
import { User } from "@/lib/models/User";
import { Product } from "@/lib/models/Product";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const decoded = await verifyAuth(req);
    const userId = decoded.userId;
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findById(userId).populate("cart.product");
    if(!user.cart ||user.cart.length === 0) {
      return NextResponse.json({
        message: "Cart is empty"
      })
    }

    return NextResponse.json({
      message: "cart fetched successfully",
      cart: user.cart
    })
  } catch (error) {
    return handleApiError(error);
  }
};
