"use client";

import { useRouter } from "@/navigation";

export function Overlay({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	return (
		<div
			onClick={() => router.back()}
			className="absolute inset-0 z-30 flex flex-row items-center justify-center bg-slate-700 bg-opacity-75"
		>
			{children}
		</div>
	);
}
