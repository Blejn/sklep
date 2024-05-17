"use client";
import { useQuery } from "@tanstack/react-query";
import { ProductListItem } from "../molecules/ProductListItem";
import { Paggination } from "./Paggination";
import { fetchProductsByCategory } from "@/server/products";

export async function ProductCategoryList({
	category,
	pageNumber,
	search,
}: {
	category: string;
	pageNumber: string;
	search: string;
}) {
	const { data, isLoading, isError } = useQuery({
		queryFn: async () => fetchProductsByCategory(category, pageNumber, search),
		queryKey: ["productsCategory", pageNumber, search],
	});
	const { edges, pageInfo, aggregate } = data!;

	const { count } = aggregate;
	const pageTotal = Math.ceil(count / 4);
	const pageArray = Array.from({ length: pageTotal }, (_, i) => i + 1);

	const products = edges.map((item) => item.node);

	if (!products) {
		return 0;
	}
	if (isError) return <div>Error</div>;
	if (isLoading) return <div className="h-12 w-12 animate-spin">Loading...</div>;
	return (
		<>
			{" "}
			<ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{products.map((product) => {
					return <ProductListItem key={product.id} product={product} />;
				})}
			</ul>
			<Paggination
				pageInfo={pageInfo}
				pageArray={pageArray}
				category={category}
				pageNumber={pageNumber}
			/>
		</>
	);
}
