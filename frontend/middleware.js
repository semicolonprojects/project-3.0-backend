import { NextResponse } from "next/server";
import { getCookies } from "next-client-cookies/server";
import toast from "react-hot-toast";

export async function middleware(request) {
  const cookies = getCookies(request);
  const userToken = cookies.get("token");
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
