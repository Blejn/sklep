import { createLocalizedPathnamesNavigation, type Pathnames } from 'next-intl/navigation';
 
export const locales = ['en', 'pl'] as const;
export const defaultLocale = "en" as const;
export const localePrefix = 'always' as const; 
export const pathnames={
  '/': '/',
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
  "/product/[id]":{
    en: "/product/[id]",
    pl: "/produkt/[id]"
  },
  "/products":{
    en: "/products",
    pl: "/produkty"
  },
  "/collections":{
    en: "/collections",
    pl: "/kolekcje"
  },
  "/text-mdx":{
    en: "/text-mdx",
    pl: "/text-mdx"
  },
  "/blog":{
    en: "/blog",
    pl: "/blog"
  },
  "/real-state":{
    en:"real-state",
    pl:"rynek-nieruchomości"
  },
  "/real-state/rent":{
    en:"/real-state/rent",
    pl:"/real-state/wynajem",
  }

  
 
  
  
  
  


} satisfies Pathnames<typeof locales>;
 
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createLocalizedPathnamesNavigation({locales, localePrefix, pathnames});


