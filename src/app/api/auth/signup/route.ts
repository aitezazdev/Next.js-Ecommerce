import { connectDB } from "@/lib/db";
import { handleApiError } from "@/lib/middlewares/error";
import { partialUserSchema } from "@/lib/validations/user";
import { validateRequest } from "@/lib/validations/validateSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/lib/models/User";
import { tokenSignIn } from "@/lib/utils/jwt";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const validatedData = await validateRequest(partialUserSchema, req);
    if (validatedData instanceof NextResponse) return validatedData;

    const { email, password } = validatedData;
    if (!email || !password) {
      return NextResponse.json(
        {
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          message: "Password must be at least 6 characters",
        },
        { status: 400 }
      );
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email: email,
      password: hashPassword,
    });

    const token = tokenSignIn({ userId: user._id });

    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json(
      {
        message: "User registered successfully",
        user,
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
};
