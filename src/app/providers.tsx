"use client";

import { Provider, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "@/redux/store";
import { useEffect } from "react";
import { setUser } from "@/redux/slices/authSlice";
import { fetchCart } from "@/redux/auth/cartThunks";
import { CartProvider } from "@/hooks/useOptimisticCart";
import { setCartItems } from "@/redux/slices/cartSlice";
import CartModel from "@/components/cart/CartModel";
import { closeCart } from "@/redux/slices/modalSlice";

function HydrateUser({ user }: { user: any }) {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const hydrate = async () => {
      if (user) {
        dispatch(setUser(user));
        if (user.cart) {
          dispatch(setCartItems(user.cart));
        }
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

function CartModelWrapper() {
  const { isCartOpen } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <CartModel isOpen={isCartOpen} onClose={() => dispatch(closeCart())} />
  );
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
        <CartModelWrapper />
      </CartProvider>
    </Provider>
  );
}
