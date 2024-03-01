"use client";
import { NavbarCategoriesType } from "@/utils/types/NavbarCategories";
import { NavbarListItem } from "../molecules/NavbarListItem";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";

export const Navbar = ({ navbarListItem }: { navbarListItem: NavbarCategoriesType[] }) => {
	const [top, setTop] = useState(true);
	useEffect(() => {
		const scrollHeader = () => {
			setTop(window.scrollY > 0);
		};
		return window.addEventListener("scroll", scrollHeader);
	}, []);
	return (
		<nav
			className={clsx(
				"fixed z-10 flex  w-full flex-row justify-between p-2",
				top && "backdrop-blur-lg backdrop-filter",
			)}
		>
			<NavbarListItem navbarListItem={navbarListItem} />
			<ShoppingCart />
		</nav>
	);
};
