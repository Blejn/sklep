"use client";
import { NavbarCategoriesType } from "@/utils/types/NavbarCategories";
import { ActiveLink } from "../atoms/ActiveLink";

export const NavbarListItem = ({ navbarListItem }: { navbarListItem: NavbarCategoriesType[] }) => {
	return (
		<ul className="flex w-full flex-row justify-start gap-5">
			{navbarListItem.map((item) => {
				return (
					<li key={item.name}>
						<ActiveLink href={item.href}>{item.name}</ActiveLink>
					</li>
				);
			})}
		</ul>
	);
};
