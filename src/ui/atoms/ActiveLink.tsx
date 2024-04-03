"use client";
import { type UrlObject } from "url";
import clsx from "clsx";
import { type ReactNode } from "react";
import { Link, usePathname } from "@/navigation";

export const ActiveLink = ({ href, children }: { href: UrlObject; children: ReactNode }) => {
	const pathname = usePathname();
	const isActive = pathname == href.pathname;

	return (
		<Link
			className={clsx("text-[#b79f97] hover:text-blue-900", isActive && `underline`)}
			href={href}
		>
			{children}
		</Link>
	);
};
