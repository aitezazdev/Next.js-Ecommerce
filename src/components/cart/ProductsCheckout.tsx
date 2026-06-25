"use client";
import React, { useState } from "react";
import { BiDollar } from "react-icons/bi";
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
    <div className="flex flex-col gap-2 mt-4">
      <div className="flex justify-between border-b border-gray-600 p-1.5 text-xs sm:text-sm">
        <p className="text-gray-400">Taxes</p>
        <strong className="flex items-center">
          <BiDollar />
          <span>0.00</span>
          <span className="text-gray-400 ml-1">USD</span>
        </strong>
      </div>
      <div className="flex justify-between border-b border-gray-600 p-1.5 text-xs sm:text-sm">
        <p className="text-gray-400">Shipping</p>
        <span className="text-gray-400">Check at Checkout</span>
      </div>
      <div className="flex justify-between border-b border-gray-600 p-1.5 text-xs sm:text-sm">
        <p className="text-gray-400">Total</p>
        <strong className="flex items-center">
          <BiDollar />
          {totalAmount().toFixed(2)}
          <span className="text-gray-400 ml-1">USD</span>
        </strong>
      </div>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`rounded-full text-center font-semibold px-3 py-2.5 my-2 transition-colors duration-300 w-full text-white cursor-pointer text-sm sm:text-base ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}>
        {loading ? (
          <PulseLoader size={6} color="#fff" />
        ) : (
          "Proceed to Checkout"
        )}
      </button>
    </div>
  );
};

export default ProductsCheckout;
