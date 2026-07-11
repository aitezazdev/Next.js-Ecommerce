"use client";

import React, { createContext, useContext, useOptimistic, useTransition, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { addToCart, decreaseCart, removeFromCart } from "@/redux/auth/cartThunks";
import toast from "react-hot-toast";
import { CartItem } from "@/types/cartItem";
import { Product } from "@/types/product";

type ActionType = "increase" | "decrease" | "remove";

interface CartContextType {
  optimisticItems: CartItem[];
  isPending: boolean;
  handleIncrease: (product: Product | string, size: string) => void;
  handleDecrease: (product: Product | string, size: string) => void;
  handleRemove: (product: Product | string, size: string) => void;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const reduxItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  const [cachedItems, setCachedItems] = useState<CartItem[]>(reduxItems || []);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!isPending) {
      setCachedItems(reduxItems || []);
    }
  }, [reduxItems, isPending]);

  const [optimisticItems, updateOptimistic] = useOptimistic(
    cachedItems,
    (
      state = [],
      {
        product,
        size,
        type,
      }: { product: Product | string; size: string; type: ActionType }
    ) => {
      const activeState = state || [];
      const productId = typeof product === "string" ? product : product._id;
      const exists = activeState.some(
        (item) => item.product?._id === productId && item.size === size
      );

      if (type === "increase") {
        if (exists) {
          return activeState.map((item) => {
            if (item.product?._id === productId && item.size === size) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          });
        } else if (typeof product !== "string") {
          return [...activeState, { product, size, quantity: 1 }];
        }
      } else if (type === "decrease") {
        return activeState
          .map((item) => {
            if (item.product?._id === productId && item.size === size) {
              const newQty = item.quantity - 1;
              return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
          })
          .filter(Boolean) as CartItem[];
      } else if (type === "remove") {
        return activeState.filter(
          (item) => !(item.product?._id === productId && item.size === size)
        );
      }
      return activeState;
    }
  );

  const handleUpdate = async (
    product: Product | string,
    size: string,
    type: ActionType
  ) => {
    const productId = typeof product === "string" ? product : product._id;

    startTransition(async () => {
      updateOptimistic({ product, size, type });

      try {
        if (type === "increase") {
          await dispatch(addToCart({ productId, quantity: 1, size })).unwrap();
        } else if (type === "decrease") {
          await dispatch(
            decreaseCart({ productId, quantity: 1, size })
          ).unwrap();
        } else if (type === "remove") {
          await dispatch(removeFromCart({ productId, size })).unwrap();
        }
      } catch {
        toast.error(
          `Failed to ${type === "increase" ? "add" : type === "decrease" ? "decrease" : "remove"} item`
        );
      }
    });
  };

  const totalAmount = Array.isArray(optimisticItems)
    ? optimisticItems
        .filter((item) => item.product && typeof item.product !== "string")
        .reduce(
          (acc, item) => acc + item.quantity * (item.product as Product).price,
          0
        )
    : 0;

  return React.createElement(CartContext.Provider, {
    value: {
      optimisticItems,
      isPending,
      handleIncrease: (product, size) => handleUpdate(product, size, "increase"),
      handleDecrease: (product, size) => handleUpdate(product, size, "decrease"),
      handleRemove: (product, size) => handleUpdate(product, size, "remove"),
      totalAmount,
    }
  }, children);
}

export function useOptimisticCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useOptimisticCart must be used within a CartProvider");
  }
  return context;
}
