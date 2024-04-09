import type { NextRequest } from "next/server";
import { validateUser } from "./lib/user";

export function middleware(req: NextRequest) {
  req.nextUrl;
  if (
    req.nextUrl.pathname == "/home" ||
    req.nextUrl.pathname.startsWith("/notes")
  ) {
    return validateUser().catch(() =>
      Response.redirect(new URL("/login", req.nextUrl.origin))
    );
  }
  if (req.nextUrl.pathname == "/login" || req.nextUrl.pathname == "/signup") {
    return validateUser()
      .then(() => Response.redirect(new URL("/home", req.nextUrl.origin)))
      .catch(() => null);
  }
}
