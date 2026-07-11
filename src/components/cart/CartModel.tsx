"use client";
import React from "react";
import { IoClose } from "react-icons/io5";
import CartProducts from "./CartProducts";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { FiLogIn } from "react-icons/fi";

interface Cart {
  isOpen: boolean;
  onClose: () => void;
}

const CartModel = ({ isOpen, onClose }: Cart) => {
  const { user, loading } = useSelector((state: RootState) => state.auth);

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 cursor-pointer bg-black/50 transition-opacity duration-100 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute right-0 top-0 h-full w-3/4 sm:w-[400px] border-l border-zinc-900 cursor-default bg-zinc-950/95 p-0.5 md:p-6 shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transform flex flex-col`}>
        <div className="flex justify-between items-center mb-6 px-3 sm:px-5 mt-2.5">
          <h2 className="text-md uppercase tracking-widest text-zinc-200 font-bold">My Cart</h2>
          <button
            className="text-white border rounded-lg p-2 border-zinc-800 cursor-pointer group transition-all duration-300 hover:bg-zinc-900 hover:border-zinc-700"
            onClick={onClose}>
            <IoClose
              className="cursor-pointer group-hover:scale-105"
              size={18}
            />
          </button>
        </div>
        <div className="px-3 sm:px-5 flex-1 flex flex-col overflow-hidden">
          {!loading && user ? (
            <CartProducts />
          ) : (
            <div className="px-3 sm:px-5 flex flex-col items-center justify-center py-12 text-center my-auto">
              <FiLogIn className="text-4xl sm:text-5xl mb-4 text-zinc-650" />
              <p className="text-md font-semibold text-zinc-300">
                Please sign in to view your cart
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModel;
