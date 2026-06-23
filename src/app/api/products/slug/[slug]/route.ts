import { connectDB } from "@/lib/db";
import { handleApiError } from "@/lib/middlewares/error";
import { Product } from "@/lib/models/Product";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export const GET = async (_req: NextRequest, { params }: Params) => {
  try {
    await connectDB();

    const { slug } = await params;
    const product = await Product.findOne({ slug });
    if (!product) {
      return NextResponse.json(
        {
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Product fetched successfully",
        product,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
};
