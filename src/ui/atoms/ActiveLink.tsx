"use client";
import { type UrlObject } from "url";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

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
