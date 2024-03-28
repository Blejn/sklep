import { type NavbarCategoriesType } from "../types/NavbarCategories";

export const navbarListItem: NavbarCategoriesType[] = [
	{
		name: "Home",
		href: { pathname: "/" },
	},
	{
		name: "All",
		href: { pathname: "/products" },
	},
	{
		name: "T-shirts",
		href: { pathname: "/products/t-shirts/1" },
	},
	{
		name: "Hoodies",
		href: { pathname: "/products/hoodies/1" },
	},
	{
		name: "Accessories",
		href: { pathname: "/products/accessories/1" },
	},
	{
		name: "Kolekcje",
		href: { pathname: "/collections" },
	},
];
