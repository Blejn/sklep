import { ShoppingCart } from "lucide-react";

import clsx from "clsx";
import { useLocale } from "next-intl";

import { Logo } from "../atoms/Logo";
import { NavbarListItem } from "../molecules/NavbarListItem";
import { LocaleSwitcher } from "../molecules/LocaleSwitcher";

import { type NavbarCategoriesType } from "@/utils/types/NavbarCategories";
import { Link } from "@/navigation";
import { getCartFromCookies } from "@/app/[locale]/cart/actions";

export async function Navbar({ navbarListItem }: { navbarListItem: NavbarCategoriesType[] }) {
	const cart = await getCartFromCookies();
	const quantity = cart?.orderItems.length ?? 0;
	const locale = useLocale();
	return (
		<nav className={clsx("sticky top-0 z-10 flex  w-full flex-row justify-between p-2")}>
			<Logo /> <NavbarListItem navbarListItem={navbarListItem} locale={locale} />
			<div className="flex flex-row">
				{quantity}
				<Link href="/cart" className="group m-2 flex h-full items-center p-2">
					<ShoppingCart />
				</Link>
			</div>
			<LocaleSwitcher />
		</nav>
	);
}
