import { connectDB } from "@/lib/db";
import { handleApiError } from "@/lib/middlewares/error";
import { Product } from "@/lib/models/Product";
import { productSchema } from "@/lib/validations/product";
import { validateRequest } from "@/lib/validations/validateSchema";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";


export const GET = async () => {
  try {
    await connectDB();
    const products = await Product.find();
    return NextResponse.json(products);
  } catch (err) {
    return handleApiError(err);
  }
};


export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const validatedData = await validateRequest(productSchema, req);
    if (validatedData instanceof NextResponse) return validatedData;

    const { title, price, category, description, image, size } = validatedData;

    if (!title || !description || !category || !price || !size || !image) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingProduct = await Product.findOne({ title, category });
    if (existingProduct) {
      return NextResponse.json(
        { message: "Product already exists" },
        { status: 400 }
      );
    }

    const newProduct = await Product.create({
      title,
      slug: slugify(title, { lower: true, strict: true }),
      price,
      category,
      description,
      size,
      image: image ?? "",
    });

    return NextResponse.json(
      {
        message: "Product created successfully",
        product: newProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
};
