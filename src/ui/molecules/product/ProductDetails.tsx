import React from "react";
import { type ProductsGetByIdQuery } from "@/gql/graphql";
import { ProductDetailsImage } from "@/ui/atoms/product/ProductDetailsImage";
import { ProductDetailsDescription } from "@/ui/atoms/product/ProductItemDescription";

export const ProductDetails = ({ product }: { product: ProductsGetByIdQuery }) => {
	return (
		<div className="flex flex-row overflow-hidden rounded-md shadow-md">
			<article className="flex flex-row">
				<ProductDetailsImage url={product.product?.images[0]?.url} />
				<ProductDetailsDescription product={product.product} />
			</article>
		</div>
	);
};
