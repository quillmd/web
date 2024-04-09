import type { NextRequest } from "next/server";
import { validateUser } from "./lib/user";

export function middleware(req: NextRequest) {
	if (req.nextUrl.pathname == "/home" || req.nextUrl.pathname.startsWith("/notes")) {
		return validateUser().catch(() => Response.redirect(new URL("/login", req.url)));
	} 
    if (req.nextUrl.pathname == "/login" || req.nextUrl.pathname == "/signup"){
        return validateUser().then(() => Response.redirect(new URL("/home", req.url))).catch(()=>null);
    }
}
