import type { NextRequest } from 'next/server'

const redirectPathnames = ["/login"]
const protectedPathnames = ['/cases', '/home', '/account'];

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const isProtectedRoute = protectedPathnames.some(pathname =>
    request.nextUrl.pathname.startsWith(pathname)
  );
  const isRedirectRoute = redirectPathnames.some(pathname =>
    request.nextUrl.pathname.startsWith(pathname)
  ) || request.nextUrl.pathname == "/";

  if (accessToken && isRedirectRoute) {
    return Response.redirect(new URL('/home', request.url));
  }

  if (!accessToken && isProtectedRoute) {
    return Response.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};