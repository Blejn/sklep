"use client";
import { startTransition, useOptimistic } from "react";

import { changeQuantity } from "@/app/cart/actions";
export const IncrementProductQuantity = ({
	quantity,
	itemId,
}: {
	quantity: number;
	itemId: string;
}) => {
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(quantity);

const incrementQuantity = async () => {

	try {
		startTransition(() => {
				setOptimisticQuantity(optimisticQuantity + 1);
		});
		await changeQuantity(itemId, optimisticQuantity + 1);
	} catch (error) {
		startTransition(() => {
			setOptimisticQuantity(optimisticQuantity);
		});
	}
};

const decrementQuantity = async () =>{
	try {
		startTransition(()=>{
			setOptimisticQuantity(optimisticQuantity - 1);
		})
		await changeQuantity(itemId, optimisticQuantity -1);
	} catch (error) {
				startTransition(() => {
					setOptimisticQuantity(optimisticQuantity);
				});
	}
}
	return (
		<form className=" flex flex-row">
			<span className="w-8 text-center">{optimisticQuantity}</span>
			<button
				formAction={incrementQuantity}
				className="ml-2 h-8 w-8 border bg-slate-50"
			>
				+
			</button>
			<button
				formAction={decrementQuantity}
				className="ml-2 h-8 w-8 border bg-slate-50"
			>
				-
			</button>
		</form>
	);
};
