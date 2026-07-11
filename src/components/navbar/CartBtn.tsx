"use client";
import React, { useState } from "react";
import CartModel from "../cart/CartModel";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { closeCart, openCart } from "@/redux/slices/modalSlice";

const CartBtn = () => {
  const { isCartOpen } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <button
        onClick={() => dispatch(openCart())}
        className="text-lg border rounded-lg p-2 border-zinc-800 cursor-pointer group transition-all duration-300 hover:bg-zinc-900/50 hover:border-zinc-700">
        <IoCartOutline className="group-hover:scale-105" />
      </button>
      <CartModel isOpen={isCartOpen} onClose={() => dispatch(closeCart())} />
    </>
  );
};

export default CartBtn;
