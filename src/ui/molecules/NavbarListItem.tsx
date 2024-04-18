"use client";
import Link from "next/link";
import { type NavbarCategoriesType } from "@/utils/types/NavbarCategories";

export const NavbarListItem = ({
	navbarListItem,
	locale,
}: {
	navbarListItem: NavbarCategoriesType[];
	locale: string;
}) => {
	return (
		<ul className="flex w-full flex-row  justify-center gap-5  ">
			{navbarListItem.map((item) => {
				return (
					<li className="flex flex-row items-center" key={item.name}>
						<Link href={`/${locale}/${item.href}`}>{item.name}</Link>
					</li>
				);
			})}
		</ul>
	);
};
