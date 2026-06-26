import { connectDB } from '@/lib/db';
import Order from '@/lib/models/Order';
import { User } from '@/lib/models/User';
import { Product } from '@/lib/models/Product';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(req: NextRequest) {
  await connectDB();

  const { sessionId } = await req.json();
  if (!sessionId) return NextResponse.json({ error: "Missing session ID" }, { status: 400 });

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['shipping', 'customer_details'],
  });

  const userId = session.metadata?.userId;
  if (!userId) return NextResponse.json({ error: "No user ID" }, { status: 400 });

  const user = await User.findById(userId).populate('cart.product');
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const newOrder = new Order({
    user: userId,
    items: user.cart.map((item: any) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    })),
    totalAmount: session.amount_total! / 100,
    shippingAddress: session.customer_details?.address,
    billingEmail: session.customer_details?.email,
    status: "paid",
    stripeSessionId: session.id,
  });

  await newOrder.save();

  user.cart = [];
  await user.save();

  return NextResponse.json({ success: true });
}
