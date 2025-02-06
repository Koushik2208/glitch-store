import Product from "@/database/product.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { ProductSchema } from "@/lib/validations";
import { ErrorResponse, RouteParams } from "@/types/global";
import { NextResponse } from "next/server";

// GET api/products/[id]
export async function GET(_: Request, { params }: RouteParams) {
  const { id } = await params;

  if (!id) throw new NotFoundError("Product");
  try {
    await dbConnect();

    const product = await Product.findById(id);
    if (!product) throw new NotFoundError("Product");

    return NextResponse.json({ success: true, data: product }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as ErrorResponse;
  }
}

// DELETE api/products/[id]
export async function DELETE(_: Request, { params }: RouteParams) {
  const { id } = await params;
  if (!id) throw new NotFoundError("Product");
  try {
    await dbConnect();

    const product = await Product.findByIdAndDelete(id);
    if (!product) throw new NotFoundError("Product");

    return NextResponse.json({ success: true, data: product }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as ErrorResponse;
  }
}

// PUT api/products/[id]
export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params;

  if (!id) throw new NotFoundError("Product");
  try {
    await dbConnect();

    const body = await request.json();

    const validatedData = ProductSchema.partial().parse(body);

    const product = await Product.findByIdAndUpdate(id, validatedData, {
      new: true,
    });
    if (!product) throw new NotFoundError("Product");

    return NextResponse.json({ success: true, data: product }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as ErrorResponse;
  }
}
