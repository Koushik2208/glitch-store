import Subcategory from "@/database/subcategory.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { SubcategorySchema } from "@/lib/validations";
import { APIErrorResponse, RouteParams } from "@/types/global";
import { NextResponse } from "next/server";

// GET api/subcategories/[id]
export async function GET(_: Request, { params }: RouteParams) {
  const { id } = await params;

  if (!id) throw new NotFoundError("Subcategory");

  try {
    await dbConnect();

    const subcategory = await Subcategory.findById(id);

    if (!subcategory) throw new NotFoundError("Subcategory");

    return NextResponse.json(
      { success: true, data: subcategory },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// DELETE api/subcategories/[id]
export async function DELETE(_: Request, { params }: RouteParams) {
  const { id } = await params;

  if (!id) throw new NotFoundError("Subcategory");

  try {
    await dbConnect();

    const subcategory = await Subcategory.findByIdAndDelete(id);
    if (!subcategory) throw new NotFoundError("Subcategory");

    return NextResponse.json(
      { success: true, data: subcategory },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// PUT api/subcategories/[id]
export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params;

  if (!id) throw new NotFoundError("Subcategory");

  try {
    await dbConnect();

    const body = await request.json();

    const validatedData = SubcategorySchema.partial().parse(body);

    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
      id,
      validatedData,
      { new: true }
    );

    if (!updatedSubcategory) throw new NotFoundError("Subcategory");

    return NextResponse.json(
      { success: true, data: updatedSubcategory },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
