import { connectDB } from "@/lib/db";
import { Product as ProductModel } from "@/lib/models/Product";
import { Product } from "@/types/product";
import mongoose from "mongoose";

const serialize = <T>(data: T): T => {
  const serialized = JSON.parse(JSON.stringify(data));
  const replacePngWithWebp = (obj: any) => {
    if (!obj || typeof obj !== "object") return;
    if (Array.isArray(obj)) {
      obj.forEach(replacePngWithWebp);
    } else {
      for (const key in obj) {
        if (typeof obj[key] === "string") {
          if (obj[key].endsWith(".png")) {
            obj[key] = obj[key].replace(/\.png$/, ".webp");
          }
          if (obj[key].includes("/shoes/shoes")) {
            obj[key] = obj[key].replace("/shoes/shoes", "/shoes/shoe");
          }
        } else if (typeof obj[key] === "object") {
          replacePngWithWebp(obj[key]);
        }
      }
    }
  };
  replacePngWithWebp(serialized);
  return serialized;
};

const mockProducts: Product[] = [
  {
    _id: "mock-1",
    title: "Printed Summer Shirt",
    slug: "printed-summer-shirt",
    description: "A cool and comfortable summer shirt made with premium cotton.",
    category: "shirts",
    price: 19.00,
    size: "M",
    image: "/products/shirts/shirt4.webp",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as any,
  {
    _id: "mock-2",
    title: "Casual Running Shoes",
    slug: "casual-running-shoes",
    description: "Lightweight and breathable running shoes designed for daily comfort.",
    category: "shoes",
    price: 49.99,
    size: "9",
    image: "/products/shoes/shoe1.webp",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as any,
];

export const dbGetAllProducts = async (): Promise<Product[]> => {
  try {
    await connectDB();
    const products = await ProductModel.find().lean();
    return serialize(products) as unknown as Product[];
  } catch (error) {
    console.error("Database connection failed, falling back to mock products:", error);
    return mockProducts;
  }
};

export const dbGetProductByCategory = async (
  category: string,
): Promise<Product[]> => {
  try {
    await connectDB();
    const products = await ProductModel.find({ category }).lean();
    return serialize(products) as unknown as Product[];
  } catch (error) {
    console.error(`Database connection failed for category ${category}, falling back to mock products:`, error);
    return mockProducts.filter((p) => p.category === category);
  }
};

export const dbGetRandomProducts = async (): Promise<Product[]> => {
  try {
    await connectDB();
    const excludeID = "6878989986889f438327844b";

    const randomProducts = await ProductModel.aggregate([
      { $match: { _id: { $ne: new mongoose.Types.ObjectId(excludeID) } } },
      { $sample: { size: 2 } },
    ]);
    return serialize(randomProducts) as unknown as Product[];
  } catch (error) {
    console.error("Database connection failed for random products, falling back to mock products:", error);
    return mockProducts;
  }
};

export const dbGetProductDetails = async (slug: string): Promise<Product> => {
  try {
    await connectDB();
    const product = await ProductModel.findOne({ slug }).lean();
    if (!product) throw new Error("Product not found");
    return serialize(product) as unknown as Product;
  } catch (error) {
    console.error(`Database connection failed for slug ${slug}, looking in mock products:`, error);
    const mockProduct = mockProducts.find((p) => p.slug === slug);
    if (!mockProduct) throw new Error("Product not found");
    return mockProduct;
  }
};

export const dbSearchProducts = async (query: string): Promise<Product[]> => {
  try {
    await connectDB();
    const products = await ProductModel.find({
      title: { $regex: query, $options: "i" },
    }).lean();
    return serialize(products) as unknown as Product[];
  } catch (error) {
    console.error(`Database connection failed for search ${query}, searching mock products:`, error);
    return mockProducts.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );
  }
};
