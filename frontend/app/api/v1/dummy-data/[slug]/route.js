import { NextResponse } from "next/server";
import products from "../products";

export async function GET(request, { params }) {
  let product = products.find((p) => p.slug === params.slug);
  // we will use params to access the data passed to the dynamic route
  return NextResponse.json({ data: product }, { status: 200 });
}
