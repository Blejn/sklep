import React from "react";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductItemDescription } from "@/ui/atoms/ProductItemDescription";
import { type ProdutListItemFragment } from "@/gql/graphql";
import { Link } from "@/navigation";

export const ProductListItem = ({ product }: { product: ProdutListItemFragment }) => {
	return (
		<li data-testid="products-list" className="flex flex-row overflow-hidden rounded-md shadow-md">
			<Link href={{ pathname: `/product/${product?.id}` }}>
				<article>
					<ProductCoverImage url={product?.images[0]?.url} />
					<ProductItemDescription product={product} />
				</article>
			</Link>
		</li>
	);
};
