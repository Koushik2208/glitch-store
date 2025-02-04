import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([{ name: "Cart 1" }, { name: "Cart 2" }]);
}
