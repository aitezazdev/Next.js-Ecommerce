"use client";

import { useOptimistic, useTransition, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { addToCart, decreaseCart } from "@/redux/auth/cartThunks";
import toast from "react-hot-toast";
import { CartItem } from "@/types/cartItem";
import { Product } from "@/types/product";

type ActionType = "increase" | "decrease";

export function useOptimisticCart() {
  const reduxItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  const [cachedItems, setCachedItems] = useState<CartItem[]>(reduxItems);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!isPending) {
      setCachedItems(reduxItems);
    }
  }, [reduxItems, isPending]);

  const [optimisticItems, updateOptimistic] = useOptimistic(
    cachedItems,
    (
      state,
      {
        product,
        size,
        type,
      }: { product: Product | string; size: string; type: ActionType }
    ) => {
      const productId = typeof product === "string" ? product : product._id;
      const exists = state.some(
        (item) => item.product._id === productId && item.size === size
      );

      if (type === "increase") {
        if (exists) {
          return state.map((item) => {
            if (item.product._id === productId && item.size === size) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          });
        } else if (typeof product !== "string") {
          return [...state, { product, size, quantity: 1 }];
        }
      } else if (type === "decrease") {
        return state
          .map((item) => {
            if (item.product._id === productId && item.size === size) {
              const newQty = item.quantity - 1;
              return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
          })
          .filter(Boolean) as CartItem[];
      }
      return state;
    }
  );

  const handleUpdate = async (
    product: Product | string,
    size: string,
    type: ActionType
  ) => {
    const productId = typeof product === "string" ? product : product._id;
    const rollback: any = {
      product: productId,
      size,
      type: type === "increase" ? "decrease" : "increase",
    };

    startTransition(async () => {
      updateOptimistic({ product, size, type });

      try {
        if (type === "increase") {
          await dispatch(addToCart({ productId, quantity: 1, size })).unwrap();
        } else {
          await dispatch(
            decreaseCart({ productId, quantity: 1, size })
          ).unwrap();
        }
      } catch {
        updateOptimistic(rollback);
        toast.error(
          `Failed to ${type === "increase" ? "add" : "remove"} item from cart`
        );
      }
    });
  };

  const totalAmount = Array.isArray(optimisticItems)
    ? optimisticItems.reduce(
        (acc, item) => acc + item.quantity * item.product.price,
        0
      )
    : 0;

  return {
    optimisticItems,
    isPending,
    handleIncrease: (product: Product | string, size: string) =>
      handleUpdate(product, size, "increase"),
    handleDecrease: (product: Product | string, size: string) =>
      handleUpdate(product, size, "decrease"),
    totalAmount,
  };
}
