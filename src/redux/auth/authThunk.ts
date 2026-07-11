import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserData } from "@/types/userData";
import api from "@/lib/apiClient/axios";


export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (data: UserData, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/auth/signup", data);
      return res.data.user;
    } catch (err: any) {
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      }
      if (err.message) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Signup failed");
    }
  }
);


export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async (data: UserData, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/auth/signin", data);
      return res.data.user;
    } catch (err: any) {
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      }
      if (err.message) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Signin failed");
    }
  }
);


export const signOutUser = createAsyncThunk(
  "auth/signOutUser",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/api/auth/signout");
      return null;
    } catch (err: any) {
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      }
      if (err.message) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Signout failed");
    }
  }
);
