"use client";
import React, { useState } from "react";
import CartModel from "../cart/CartModel";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { closeCart, openCart } from "@/redux/slices/modalSlice";

const CartBtn = () => {
  const { isCartOpen } = useSelector((state: RootState) => state.modal);
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  const itemCount = items ? items.reduce((total, item) => total + item.quantity, 0) : 0;

  return (
    <>
      <button
        onClick={() => dispatch(openCart())}
        className="relative text-lg border rounded-lg p-2 border-zinc-800 cursor-pointer group transition-all duration-300 hover:bg-zinc-900/50 hover:border-zinc-800">
        <IoCartOutline className="group-hover:scale-105" />
        {itemCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-brand text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono">
            {itemCount}
          </span>
        )}
      </button>
      <CartModel isOpen={isCartOpen} onClose={() => dispatch(closeCart())} />
    </>
  );
};

export default CartBtn;
