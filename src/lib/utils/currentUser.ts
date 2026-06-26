import { cookies } from "next/headers";
import { verifyToken } from "./jwt";
import { User } from "../models/User";
import { connectDB } from "../db";

export const getCurrentUser = async () => {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;
  try {
    await connectDB();
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId)
      .select("-password")
      .populate("cart.product");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    return null;
  }
};
