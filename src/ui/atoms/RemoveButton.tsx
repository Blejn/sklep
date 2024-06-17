"use client";
import React, { useTransition } from "react";

import { useMutation } from "@tanstack/react-query";
import { removeProductFromCart } from "@/server/cart";

export const RemoveButton = ({ orderItemId }: { orderItemId: string }) => {
	const mutation = useMutation({
		mutationFn: () => removeProductFromCart(orderItemId),
	});
	const [isPending, startTransition] = useTransition();

	return (
		<button
			disabled={isPending}
			className="text-red-500"
			onClick={() => {
				startTransition(async () => {
					mutation.mutate();
				});
			}}
		>
			{mutation.isPending && <div className="h-2 w-2 animate-spin">Loading...</div>}
			Remove
		</button>
	);
};
