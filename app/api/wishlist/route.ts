import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([{ name: "Wishlist 1" }, { name: "Wishlist 2" }]);
}
