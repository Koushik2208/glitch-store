import Product from "@/database/product.model";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { ProductSchema } from "@/lib/validations";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const products = await Product.find();

    return NextResponse.json(
      { success: true, data: products },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// Create Product
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const validatedData = ProductSchema.safeParse(body);

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const { name, slug } = validatedData.data;

    const existingProduct = await Product.findOne({ name, slug });

    if (existingProduct)
      throw new Error("Product with this name already exists");

    const existingSlug = await Product.findOne({ slug });

    if (existingSlug) throw new Error("Slug already exists");

    const newProduct = await Product.create(validatedData.data);

    return NextResponse.json(
      { success: true, data: newProduct },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
