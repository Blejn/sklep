"use client";
import { useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation";
import { ReactNode, useState } from "react";

export const ProductCounter = ({ children }: { children: ReactNode }) => {
	const [counter, setCounter] = useState(0);
	useSelectedLayoutSegment();
	useSelectedLayoutSegments();
	return (
		<div>
			<button
				className="border border-slate-200"
				onClick={() => setCounter((counter) => counter - 1)}
			>
				-
			</button>
			<input readOnly value={counter} className="border-slate-50" />
			<button
				className="border border-slate-200"
				onClick={() => setCounter((counter) => counter + 1)}
			>
				+
			</button>

			{counter % 2 === 0 && children}
		</div>
	);
};
