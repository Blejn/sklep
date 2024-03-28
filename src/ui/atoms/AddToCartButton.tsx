"use client";

import { useFormStatus } from "react-dom";

export const AddToCartButton = () => {
	const status = useFormStatus();
	return (
		<button
			type="submit"
			disabled={status.pending}
			className="rounded-sm border bg-slate-200 px-6 py-2 shadow-sm disabled:cursor-wait"
		>
			{" "}
			Add to Cart
		</button>
	);
};
