import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const authMiddleware = withAuth(
  function onSuccess(_req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

const locales = routing.locales.join("|");
const localePrefixPattern = new RegExp(`^/(${locales})/dashboard`);

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Auth-protect only locale-prefixed dashboard routes
  if (localePrefixPattern.test(pathname)) {
    return (authMiddleware as (req: NextRequest) => NextResponse)(req);
  }

  // Everything else goes through i18n middleware (adds locale prefix)
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2)).*)",
  ],
};
