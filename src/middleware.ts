import createMiddleware from "next-intl/middleware";

// Middleware for internationalization
export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "ar"],

  // Used when no locale matches
  defaultLocale: "en",

  // For automatic locale detection
  localeDetection: true,

  // This is important to properly handle locale in the URL
  localePrefix: "always",
});

export const config = {
  // Match all pathnames except for
  // - api routes, _next and static files, public files with extensions
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
