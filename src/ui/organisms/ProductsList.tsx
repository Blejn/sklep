"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductListItem } from "@/ui/molecules/ProductListItem";
import { fetchProducts } from "@/server/products";

export function ProductsList({ pageNumber, search }: { pageNumber: string; search?: string }) {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["products", pageNumber, search],
		queryFn: () => fetchProducts(pageNumber, search),
	});

	if (isLoading) return <div className="h-12 w-12 animate-spin">Loading...</div>;
	if (isError) return <div>Error</div>;

	if (!data || !data.edges) {
		return <div>No products found</div>;
	}

	const { edges } = data;
	const products = edges.map((item) => item.node);

	return (
		<ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{products.map((product) => (
				<ProductListItem key={product.id} product={product} />
			))}
		</ul>
	);
}
