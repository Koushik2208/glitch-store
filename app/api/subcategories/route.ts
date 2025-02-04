import Subcategory from "@/database/subcategory.model";
import Category from "@/database/category.model";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";
import { SubcategorySchema } from "@/lib/validations";

// ✅ Get All Subcategories
export async function GET() {
  try {
    await dbConnect();

    const subcategories = await Subcategory.find().populate("category", "name");

    return NextResponse.json(
      { success: true, data: subcategories },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// ✅ Create a New Subcategory
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const validatedData = SubcategorySchema.safeParse(body);
    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const { name, category, slug } = validatedData.data;

    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      throw new Error("Invalid category.");
    }

    const existingSubcategory = await Subcategory.findOne({ name, category });

    if (existingSubcategory) {
      throw new Error(
        "Subcategory with this name already exists in this category."
      );
    }

    const existingSlug = await Subcategory.findOne({ slug });

    if (existingSlug) throw new Error("Slug already exists.");

    const newSubcategory = await Subcategory.create(validatedData.data);

    return NextResponse.json(
      { success: true, data: newSubcategory },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
