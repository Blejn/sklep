"use client";
import React from "react";
import { ProductListItem } from "@/ui/molecules/ProductListItem";
import { getProducts } from "@/api/products/getProducts";

export async function ProductsList() {
	const { data: products, isLoading, error: productsError, fetchStatus } = await getProducts();
	if (!products) {
		return 0;
	}
	if (isLoading) return <div>...isLoading</div>;
	return (
		<ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{products.map((product) => {
				return <ProductListItem key={product.id} product={product} />;
			})}
		</ul>
	);
}
