"use client";
import { ActiveLink } from "../atoms/ActiveLink";
import { type NavbarCategoriesType } from "@/utils/types/NavbarCategories";

export const NavbarListItem = ({ navbarListItem }: { navbarListItem: NavbarCategoriesType[] }) => {
	return (
		<ul className="flex w-full flex-row  justify-center gap-5  ">
			{navbarListItem.map((item) => {
				return (
					<li className="flex flex-row items-center" key={item.name}>
						<ActiveLink href={item.href}>{item.name}</ActiveLink>
					</li>
				);
			})}
		</ul>
	);
};
