"use client";
import Link from "next/link";
import { navbarListItem } from "@/utils/mocks/navbarCategoriesData";

export const NavbarListItem = () => {
	return (
		<ul className="flex w-full flex-row  justify-center gap-5  ">
			{navbarListItem.map((item) => {
				return (
					<li className="flex flex-row items-center" key={item.name}>
						<Link href={item.href}>{item.name}</Link>
					</li>
				);
			})}
		</ul>
	);
};
