"use client";

import { useOptimisticCart } from "@/hooks/useOptimisticCart";
import { addToCart } from "@/redux/auth/cartThunks";
import { openCart } from "@/redux/slices/modalSlice";
import { AppDispatch, RootState } from "@/redux/store";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "@/types/product";
import { IoAdd } from "react-icons/io5";

const AddToCartBtn = ({
  product,
  category,
}: {
  product: Product;
  category: string;
}) => {
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const { isPending, handleIncrease } = useOptimisticCart();

  const size = category === "shoes" ? "8" : "M";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const addProductToCart = async () => {
    if (!loading && !user) {
      toast.error("Please signin first");
      return;
    }
    try {
      handleIncrease(product, size);
      dispatch(openCart());
      toast.success("Added to cart");
    } catch (error: any) {
      toast.error(error);
    }
  };
  return (
    <button
      disabled={isPending}
      onClick={(e) => {
        handleClick(e);
        addProductToCart();
      }}
      className={`absolute right-3 top-3 w-8 h-8 md:w-auto md:h-auto p-1.5 md:px-4 md:py-1.5 rounded-full text-zinc-950 bg-white hover:cursor-pointer hover:bg-zinc-200 transition-all duration-250 flex items-center justify-center shadow-lg active:scale-95 text-[10px] font-semibold uppercase tracking-wider gap-1 ${
        isPending ? "opacity-75 cursor-not-allowed" : ""
      }`}>
      {isPending ? (
        <div className="h-3.5 w-3.5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <>
          <span className="hidden md:inline">Add to Cart</span>
          <span className="inline md:hidden flex items-center justify-center"><IoAdd size={16} /></span>
        </>
      )}
    </button>
  );
};

export default AddToCartBtn;
