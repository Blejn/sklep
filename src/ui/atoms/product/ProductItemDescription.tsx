import React from "react";
import { AddToCartButton } from "../AddToCartButton";

import { type ProductsGetByIdQuery } from "@/gql/graphql";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { formatMoney } from "@/utils";
import { addToCart } from "@/app/api/cart";
import { getOrCreateCard } from "@/app/cart/actions";

export const ProductDetailsDescription = (product: ProductsGetByIdQuery) => {
	async function addToCardAction() {
		"use server";
		const cart = await getOrCreateCard();

		cart && product.product && (await addToCart(cart.id, product.product?.id));
	}
	return (
		<div className=" mt-2 flex flex-col justify-between p-2">
			<div className="m-2 flex flex-col gap-2">
				<h3 className="text-xl font-semibold text-gray-700">{product.product?.name}</h3>
				<p className="text-sm text-gray-500">
					<span className="sr-only">Kategoria:</span>{" "}
					{product.product?.categories ? product.product?.categories[0]?.name : ""}
				</p>
			</div>
			<p className="text-sm font-medium text-gray-900">
				<span className="sr-only">Cena:</span>
				{formatMoney(product.product?.price ? product.product?.price / 100 : 0)}
			</p>
			{product.product?.variants ? (
				<Select>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder={"Color/Variant"} />
					</SelectTrigger>
					<SelectContent>
						{product.product?.variants.map((variant) => {
							if ("name" in variant) {
								return (
									<SelectItem key={variant.id} value="light">
										{variant.name}
									</SelectItem>
								);
							} else {
								return null;
							}
						})}
					</SelectContent>
				</Select>
			) : (
				<></>
			)}
			<form action={addToCardAction}>
				<input type="hidden" name="productId" value={product.product?.id} />
				<AddToCartButton />
			</form>
		</div>
	);
};
