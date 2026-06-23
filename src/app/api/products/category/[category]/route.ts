import { connectDB } from "@/lib/db";
import { handleApiError } from "@/lib/middlewares/error";
import { Product } from "@/lib/models/Product";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: Promise<{
    category: string;
  }>;
};

export const GET = async (_req: NextRequest, context: Params) => {
  try {
    await connectDB();

    const { category } = await context.params;
    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    const categoryProducts = await Product.find({ category });
    if (!categoryProducts || categoryProducts.length === 0) {
      return NextResponse.json(
        {
          message: `No products found for category: ${category}`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: `Products fetched successfully for ${category} category`,
        products: categoryProducts,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
};
