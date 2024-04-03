"use client";
import React, { useTransition } from "react";

import { removeProductFromCart } from "@/app/[locale]/cart/actions";
import { useRouter } from "@/navigation";

export const RemoveButton = ({ orderItemId }: { orderItemId: string }) => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	return (
		<button
			disabled={isPending}
			className="text-red-500"
			onClick={() => {
				startTransition(async () => {
					await removeProductFromCart(orderItemId);
					router.refresh();
				});
			}}
		>
			Remove
		</button>
	);
};
