"use client";

import { useRouter } from "next/navigation";

export const ReloadButton = () => {
	const router = useRouter();
	return <button className="flex-grow" onClick={() => router.back()}></button>;
};
