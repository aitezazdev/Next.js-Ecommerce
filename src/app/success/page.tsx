"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AiFillCheckCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { clearCart } from "@/redux/slices/cartSlice";
import Link from "next/link";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (sessionId) {
      fetch("/api/checkout/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      })
        .then(() => {
          dispatch(clearCart());
        })
        .catch((err) => {
          console.error("Failed to confirm checkout:", err);
        });
    }
  }, [sessionId, dispatch]);

  return (
    <div className="min-h-screen flex bg-zinc-950 text-white items-center justify-center px-4">
      <div className="max-w-md w-full bg-zinc-900/40 shadow-2xl rounded-2xl p-8 sm:p-10 text-center border border-zinc-800/80">
        <AiFillCheckCircle className="w-12 h-12 text-white mx-auto mb-6" />
        <h1 className="text-xl md:text-2xl uppercase tracking-widest font-bold mb-3">
          Order Confirmed
        </h1>
        <p className="text-sm text-zinc-400 font-light mb-8 leading-relaxed">
          Thank you for your order. Your payment has been processed successfully.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/search"
            className="inline-block text-center px-6 py-3.5 bg-white text-zinc-950 font-bold text-xs uppercase tracking-widest rounded-full hover:bg-zinc-200 transition shadow-xl"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="inline-block text-center px-6 py-3.5 bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold text-xs uppercase tracking-widest rounded-full hover:bg-zinc-800 hover:text-white transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
