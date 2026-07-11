import api from "@/lib/apiClient/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

type addToCartPayload = {
  productId: string;
  quantity?: number;
  size: string;
};


export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/cart/fetchcart");
      return res.data.cart;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "failed to fetch cart"
      );
    }
  }
);


export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (data: addToCartPayload, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/cart/add", data);
      return res.data.cart;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "failed to fetch cart"
      );
    }
  }
);


export const decreaseCart = createAsyncThunk(
  "cart/decreaseCart",
  async (data: addToCartPayload, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/cart/decrease", data);
      return res.data.cart;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "failed to fetch cart"
      );
    }
  }
);


export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (data: addToCartPayload, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/cart/remove", data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "failed to fetch cart"
      );
    }
  }
);