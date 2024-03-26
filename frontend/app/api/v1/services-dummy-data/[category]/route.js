import { NextResponse } from "next/server";
import services from "../services";

export async function GET(request, { params }) {
  let data = params.category;
  let service = services.find((s) => s.category === data);

  if (!service) {
    // If the service is not found, return all services
    return NextResponse.json(
      { data: services, message: "Service Belum Tersedia" },
      { status: 200 }
    );
  } else {
    // If the service is found, return the specific service
    return NextResponse.json({ data: service }, { status: 200 });
  }
}
