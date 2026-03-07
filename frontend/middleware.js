import { NextResponse } from "next/server";

export async function middleware(request) {
  const userToken = request.cookies.get("token")?.value;
  const requestedPath = new URL(request.url).pathname;

  if (userToken) {
    if (requestedPath === "/login") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (requestedPath.startsWith("/dashboard")) {
      return NextResponse.next();
    }
  } else {
    if (requestedPath.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}
