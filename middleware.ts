import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const authMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export default function middleware(req: NextRequest) {
  const isDashboard = req.nextUrl.pathname.match(/^(\/[a-z]{2})?\/dashboard/);
  if (isDashboard) {
    return (authMiddleware as (req: NextRequest) => NextResponse)(req);
  }
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2)).*)",
  ],
};
