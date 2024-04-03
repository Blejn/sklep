import { createLocalizedPathnamesNavigation, type Pathnames } from 'next-intl/navigation';
 
export const locales = ['en', 'pl'] as const;
export const defaultLocale = "en" as const;
export const localePrefix = 'always' as const; 
export const pathnames={
  "/restaurant":{
    en:"/restaurant",
    pl:'/restaruacja'
  },
  "/cart":{
    en:"/cart",
    pl:"/koszyk"
  },
  "/cart/success": { 
    en: "/cart/success",
    pl: "/koszyk/sukces"
  },

} satisfies Pathnames<typeof locales>;
 
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createLocalizedPathnamesNavigation({locales, localePrefix, pathnames});


