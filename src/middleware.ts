import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

const isProtectedRoute = createRouteMatcher(["/(.*)/profile(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (isProtectedRoute(request)) {
    // auth.protect() redirects (via unauthenticatedUrl) when the visitor is
    // not signed in. No return value is needed — the redirect is issued as a
    // side effect of the awaited call.
    await auth.protect({ unauthenticatedUrl: new URL("/", request.url).toString() });
  }
  return intlMiddleware(request);
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
