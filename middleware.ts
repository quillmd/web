import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { validateUser } from "./lib/user";

export function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname == "/home" ||
    req.nextUrl.pathname.startsWith("/notes")
  ) {
    return validateUser().then(()=>null).catch(() =>
      NextResponse.redirect(new URL("/login", req.nextUrl.origin))
    );
  }
  if (req.nextUrl.pathname == "/login" || req.nextUrl.pathname == "/signup") {
    return validateUser()
      .then(() => NextResponse.redirect(new URL("/home", req.nextUrl.origin)))
      .catch(() => null);
  }
}
