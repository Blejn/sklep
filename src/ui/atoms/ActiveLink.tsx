"use client";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { UrlObject } from "url";

export const ActiveLink = ({ href, children }: { href: UrlObject; children: ReactNode }) => {
	const pathname = usePathname();
	const isActive = pathname == href.pathname;

	return (
		<Link
			className={clsx("text-blue-400 hover:text-blue-900", isActive && `underline`)}
			href={href}
		>
			{children}
		</Link>
	);
};
