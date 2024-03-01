// ProductListItem.tsx
import React from "react";
import { ProductsGetByIdQuery, ProductsGetSizeColorVariantsQuery } from "@/gql/graphql";
import { ProductDetailsImage } from "@/ui/atoms/product/ProductDetailsImage";
import { ProductDetailsDescription } from "@/ui/atoms/product/ProductItemDescription";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export const ProductDetails = ({ product }: { product: ProductsGetByIdQuery }) => {
	return (
		<div className="flex flex-row overflow-hidden rounded-md shadow-md">
			<article>
				<ProductDetailsImage url={product.product?.images[0]?.url} />
				<ProductDetailsDescription product={product.product} />
				{product.product?.variants ? (
					<Select>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder={"Color/Variant"} />
						</SelectTrigger>
						<SelectContent>
							{product.product?.variants.map((variant) => {
								if ("name" in variant) {
									return <SelectItem value="light">{variant.name}</SelectItem>;
								} else {
									return null;
								}
							})}
						</SelectContent>
					</Select>
				) : (
					<></>
				)}
			</article>
		</div>
	);
};
