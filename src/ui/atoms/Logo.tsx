"use client"

import Image from "next/image";
import Link from "next/link";



export const Logo  =()=>{
    return (
			<Link className="w-fit h-full" href="/">
					<Image src="/logo.webp" alt="logo" height={50} width={50} objectFit="cover" />

			</Link>
		);

}
