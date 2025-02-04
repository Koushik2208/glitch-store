import Category from "@/database/category.model";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { CategorySchema } from "@/lib/validations";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

// Get All Categories
export async function GET() {
  try {
    await dbConnect();

    const categories = await Category.find();

    return NextResponse.json(
      { success: true, data: categories },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// Create Category
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const validatedData = CategorySchema.safeParse(body);

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const { name, slug } = validatedData.data;

    // Check if the category name already exists
    const existingCategory = await Category.findOne({ name });

    if (existingCategory)
      throw new Error("Category with this name already exists");

    // Check if the slug already exists
    const existingSlug = await Category.findOne({ slug });

    if (existingSlug) throw new Error("Slug already exists");

    const newCategory = await Category.create(validatedData.data);

    return NextResponse.json(
      { success: true, data: newCategory },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
