import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

export const proxy = auth((req) => {
    const isLoggedIn = !!req.auth;
    const { pathname } = req.nextUrl;
    const isAuthRoute =
        pathname.startsWith("/login") || pathname.startsWith("/register");
    const isPublicShare = pathname.startsWith("/share/");

    if (!isLoggedIn && !isAuthRoute && !isPublicShare) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    if (isLoggedIn && isAuthRoute) {
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg$).*)"],
};
