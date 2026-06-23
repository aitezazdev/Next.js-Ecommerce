import { connectDB } from "@/lib/db";
import { Product as ProductModel } from "@/lib/models/Product";
import { Product } from "@/types/product";
import mongoose from "mongoose";

// A utility helper to safely serialize MongoDB Mongoose documents/objects to plain JSON.
// This prevents Next.js serialization warnings/errors when passing data from Server Components to Client Components.
const serialize = <T>(data: T): T => {
  return JSON.parse(JSON.stringify(data));
};

export const dbGetAllProducts = async (): Promise<Product[]> => {
  await connectDB();
  const products = await ProductModel.find().lean();
  return serialize(products) as unknown as Product[];
};

export const dbGetProductByCategory = async (
  category: string,
): Promise<Product[]> => {
  await connectDB();
  const products = await ProductModel.find({ category }).lean();
  return serialize(products) as unknown as Product[];
};

export const dbGetRandomProducts = async (): Promise<Product[]> => {
  await connectDB();
  const excludeID = "6878989986889f438327844b";

  const randomProducts = await ProductModel.aggregate([
    { $match: { _id: { $ne: new mongoose.Types.ObjectId(excludeID) } } },
    { $sample: { size: 2 } },
  ]);
  return serialize(randomProducts) as unknown as Product[];
};

export const dbGetProductDetails = async (slug: string): Promise<Product> => {
  await connectDB();
  const product = await ProductModel.findOne({ slug }).lean();
  if (!product) throw new Error("Product not found");
  return serialize(product) as unknown as Product;
};

export const dbSearchProducts = async (query: string): Promise<Product[]> => {
  await connectDB();
  const products = await ProductModel.find({
    title: { $regex: query, $options: "i" },
  }).lean();
  return serialize(products) as unknown as Product[];
};
