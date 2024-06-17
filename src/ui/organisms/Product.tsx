"use client";
import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductDetails } from "../molecules/product/ProductDetails";
import { SuggestedProductsList } from "./SuggestedProducts";
import { fetchProductById } from "@/server/products";

export function Product({ id }: { id: string }) {
	const {
		data: product,
		isError,
		isLoading,
	} = useQuery({
		queryKey: ["product", id],
		queryFn: () => fetchProductById(id),
	});
	if (isError) return <div>Error</div>;
	if (isLoading) return <div>Loading...</div>;
	console.log(product);
	if (product)
		return (
			<div>
				<ProductDetails product={product} />
				<aside>
					<Suspense fallback={"Loading..."}>
						<SuggestedProductsList />
					</Suspense>
				</aside>
			</div>
		);
	return null;
}
