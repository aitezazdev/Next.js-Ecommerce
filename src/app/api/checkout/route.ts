import { connectDB } from "@/lib/db";
import { verifyAuth } from "@/lib/middlewares/auth";
import { handleApiError } from "@/lib/middlewares/error";
import { User } from "@/lib/models/User";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const decoded = await verifyAuth(req);
    const userId = decoded.userId;
    if (!userId) {
      return NextResponse.json(
        {
          messsage: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const user = await User.findById(userId).populate("cart.product");
    if (!user || !user.cart || user.cart.length === 0) {
      return NextResponse.json(
        {
          message: "Cart is empty",
        },
        { status: 400 }
      );
    }

    const line_items = user.cart.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product.title,
          },
          unit_amount: Math.round(Number(item.product.price) * 100),
        },
        quantity: item.quantity,
      }));

    if (line_items.length === 0) {
      return NextResponse.json(
        { error: "No valid cart items to checkout." },
        { status: 400 }
      );
    }

    const origin = new URL(req.url).origin;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}`,
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["US", "PK", "IN"],
      },
      metadata: {
        userId: user._id.toString(),
      },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
};
