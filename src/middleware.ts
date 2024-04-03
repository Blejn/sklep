import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales, pathnames } from './navigation';
 
export default createMiddleware({
  // A list of all locales that are supported
locales:locales,
 
  // Used when no locale matches
  defaultLocale:defaultLocale,
  pathnames:pathnames
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(pl|en)/:path*']
};