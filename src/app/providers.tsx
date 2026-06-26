"use client";

import { Provider, useDispatch } from "react-redux";
import { AppDispatch, store } from "@/redux/store";
import { useEffect } from "react";
import { setUser } from "@/redux/slices/authSlice";
import { fetchCart } from "@/redux/auth/cartThunks";
import { CartProvider } from "@/hooks/useOptimisticCart";

function HydrateUser({ user }: { user: any }) {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const hydrate = async () => {
      if (user) {
        dispatch(setUser(user));
        try {
          await dispatch(fetchCart());
        } catch (error) {
          throw new Error("Failed to fetch cart");
        }
      }
    };
    hydrate();
  }, [user, dispatch]);
  return null;
}

export default function ReduxProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) {
  return (
    <Provider store={store}>
      <HydrateUser user={user} />
      <CartProvider>
        {children}
      </CartProvider>
    </Provider>
  );
}
