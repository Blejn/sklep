// ProductListItem.tsx
import React from "react";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductItemDescription } from "@/ui/atoms/ProductItemDescription";
import { type ProductListItemType } from "@/ui/molecules/types";

type ProductListItemProps = {
	product: ProductListItemType;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
	return (
		<li data-testid="products-list" className="flex flex-row overflow-hidden rounded-md shadow-md">
			<article>
				<ProductCoverImage {...product.coverImage} />
				<ProductItemDescription product={product} />
			</article>
		</li>
	);
};
