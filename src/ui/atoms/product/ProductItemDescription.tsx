// ProductItemDescription.tsx
import React from "react";
import { formatMoney } from "@/utils";
import { ProductsGetByIdQuery } from "@/gql/graphql";

export const ProductDetailsDescription = (product: ProductsGetByIdQuery) => {
	return (
		<div className="mt-2 flex justify-between p-2">
			<div>
				<h3 className="text-sm font-semibold text-gray-700">{product.product?.name}</h3>
				<p className="text-sm text-gray-500">
					<span className="sr-only">Kategoria:</span>{" "}
					{product.product?.categories ? product.product?.categories[0]?.name : ""}
				</p>
			</div>
			<p className="text-sm font-medium text-gray-900">
				<span className="sr-only">Cena:</span>
				{formatMoney(product.product?.price ? product.product?.price / 100 : 0)}
			</p>
		</div>
	);
};
