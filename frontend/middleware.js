import { NextResponse } from "next/server";
import { getCookies } from "next-client-cookies/server";

// This function can be marked `async` if using `await` inside

export function middleware(request) {
    const cookies = getCookies();
    const userToken = cookies.get("token");
    const requestedPath = new URL(request.url).pathname;

    if (userToken && requestedPath === "/login") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (!userToken && requestedPath === "/dashboard") {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/dashboard", "/login"],
};
