import Category from "@/database/category.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { CategorySchema } from "@/lib/validations";
import { APIErrorResponse, RouteParams } from "@/types/global";
import { NextResponse } from "next/server";

// GET api/categories/[id]
export async function GET(_: Request, { params }: RouteParams) {
  const { id } = await params;

  if (!id) throw new NotFoundError("Category");

  try {
    await dbConnect();

    const category = await Category.findById(id);
    if (!category) throw new NotFoundError("Category");

    return NextResponse.json(
      { success: true, data: category },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// DELETE api/categories/[id]
export async function DELETE(_: Request, { params }: RouteParams) {
  const { id } = await params;

  if (!id) throw new NotFoundError("Category");

  try {
    await dbConnect();

    const category = await Category.findByIdAndDelete(id);
    if (!category) throw new NotFoundError("Category");

    return NextResponse.json(
      { success: true, data: category },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// PUT api/categories/[id]
export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params;

  if (!id) throw new NotFoundError("Category");
  try {
    await dbConnect();

    const body = await request.json();

    const validatedData = CategorySchema.partial().parse(body);

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      validatedData,
      { new: true }
    );

    if (!updatedCategory) throw new NotFoundError("Category");

    return NextResponse.json(
      { success: true, data: updatedCategory },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
