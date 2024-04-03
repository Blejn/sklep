"use client";

import Image from "next/image";
import { Link } from "@/navigation";

export const Logo = () => {
	return (
		<Link className="h-full w-fit" href="/">
			<Image src="/logo.webp" alt="logo" height={50} width={50} objectFit="cover" />
		</Link>
	);
};
