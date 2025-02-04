import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([{ name: "Order 1" }, { name: "Order 2" }]);
}
