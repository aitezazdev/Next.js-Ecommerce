"use client";

import { useOptimisticCart } from "@/hooks/useOptimisticCart";
import { addToCart } from "@/redux/auth/cartThunks";
import { openCart } from "@/redux/slices/modalSlice";
import { AppDispatch, RootState } from "@/redux/store";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { IoAdd } from "react-icons/io5";

const AddToCartBtn = ({
  productId,
  category,
}: {
  productId: string;
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
      handleIncrease(productId, size);
      dispatch(openCart());
      toast.success("Added to cart");
    } catch (error: any) {
      toast.error(error);
    }
  };
  return (
    <button
      onClick={(e) => {
        handleClick(e);
        addProductToCart();
      }}
      className="absolute right-3 top-3 w-9 h-9 md:w-auto md:h-auto p-2 md:px-3 md:py-1.5 border-2 border-blue-500 rounded-full md:rounded-3xl text-white bg-blue-500 font-semibold hover:cursor-pointer hover:bg-blue-600 transition-all duration-300 flex items-center justify-center shadow-md active:scale-95">
      <span className="hidden md:inline">Add To Cart</span>
      <span className="inline md:hidden flex items-center justify-center"><IoAdd size={18} /></span>
    </button>
  );
};

export default AddToCartBtn;
