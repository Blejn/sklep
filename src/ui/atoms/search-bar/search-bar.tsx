"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/utils/useDebounce";

export const SearchBar = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const query = searchParams.get("search") ?? "";
	const [searchQuery, setQueryParam] = useState<string>(query);

	const debouncedPhrase = useDebounce<string>(searchQuery, 500);
	useEffect(() => {
		if (debouncedPhrase.length > 1) {
			router.push(`${pathname}?search=${debouncedPhrase}`);
		} else {
			router.push(`${pathname}`);
		}
	}, [debouncedPhrase, pathname, router]);
	const changeQueryHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setQueryParam(value);
	};

	return (
		<Input
			value={searchQuery}
			onChange={changeQueryHandler}
			className=""
			type="text"
			placeholder="Search"
		/>
	);
};
