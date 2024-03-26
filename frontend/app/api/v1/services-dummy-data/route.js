import { NextResponse } from "next/server";
import services from "./services";

export async function GET(request) {
  return NextResponse.json({ data: services }, { status: 200 });
}
