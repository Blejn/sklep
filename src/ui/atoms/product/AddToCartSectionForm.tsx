"use client";
import { AddToCartButton } from "../AddToCartButton";
import { addToCardAction } from "./actions";

export const AddToCartSectionForm = ({ productId }: { productId: string }) => {
	return (
		<form
			action={async () => {
				await addToCardAction(productId);
			}}
		>
			<input type="hidden" name="productId" value={productId} />
			<AddToCartButton />
		</form>
	);
};
