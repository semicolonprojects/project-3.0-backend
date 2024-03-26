import { NextResponse } from "next/server";
import products from "./products";

export async function GET(request) {
  return NextResponse.json({ data: products }, { status: 200 });
}
