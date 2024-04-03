"use client";

import { useRouter } from "@/navigation";

export function Overlay() {
	const router = useRouter();
	return (
		<div
			onClick={() => router.back()}
			className="absolute inset-0 z-30 bg-slate-700 bg-opacity-75"
		></div>
	);
}
