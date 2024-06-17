import { ShoppingCart } from "lucide-react";

import clsx from "clsx";

import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Logo } from "../atoms/Logo";
import { NavbarListItem } from "../molecules/NavbarListItem";

import { SearchBar } from "../atoms/search-bar/search-bar";
import { getCartFromCookies } from "@/server/cart";

export async function Navbar() {
	const cart = await getCartFromCookies();
	const quantity = cart?.orderItems.length ?? 0;

	return (
		<nav className={clsx("sticky top-0 z-10 flex  w-full flex-row justify-between p-2")}>
			<SignedIn>
				<Logo />
				<NavbarListItem />
				<SearchBar />
				<div className="flex flex-row">
					{quantity}
					<Link href="/cart" className="group m-2 flex h-full items-center p-2">
						<ShoppingCart />
					</Link>
					<UserButton />
				</div>
			</SignedIn>
			<SignedOut>
				<SignInButton />
			</SignedOut>
			{/* <LocaleSwitcher /> */}
		</nav>
	);
}
