"use client";
import React, { useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

type Props = {
  totalAmount: () => number;
};

const ProductsCheckout = ({ totalAmount }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || data.message || "Failed to initiate checkout");
        setLoading(false);
      }
    } catch (error: any) {
      toast.error(error?.message || "An error occurred during checkout");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-zinc-800 bg-zinc-950/20">
      <div className="flex justify-between border-b border-zinc-800 p-2 text-xs">
        <p className="text-zinc-400 uppercase tracking-wider">Taxes</p>
        <span className="font-semibold text-zinc-200 font-mono">
          $0.00 USD
        </span>
      </div>
      <div className="flex justify-between border-b border-zinc-800 p-2 text-xs">
        <p className="text-zinc-400 uppercase tracking-wider">Shipping</p>
        <span className="text-zinc-500 uppercase tracking-wider text-[10px]">Calculated next</span>
      </div>
      <div className="flex justify-between border-b border-zinc-800 p-2 text-xs mb-3">
        <p className="text-zinc-300 font-medium uppercase tracking-wider">Total</p>
        <span className="font-bold text-zinc-100 font-mono">
          ${totalAmount().toFixed(2)} USD
        </span>
      </div>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`rounded-full text-center font-bold px-4 py-3.5 my-1 transition-all duration-200 w-full cursor-pointer text-xs uppercase tracking-widest min-h-[44px] flex items-center justify-center ${
          loading
            ? "bg-zinc-900 text-zinc-500 border border-zinc-800 cursor-not-allowed"
            : "bg-brand text-white hover:bg-brand-hover shadow-xl hover:scale-[1.01] active:scale-[0.99]"
        }`}>
        {loading ? (
          <PulseLoader size={4} color="#52525b" />
        ) : (
          "Proceed to Checkout"
        )}
      </button>
    </div>
  );
};

export default ProductsCheckout;
