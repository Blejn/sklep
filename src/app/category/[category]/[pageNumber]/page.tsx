import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/app/getQueryClient";
import { fetchProductsByCategory } from "@/server/products";
import { ProductCategoryList } from "@/ui/organisms/ProductCategoryList";

export async function generateStaticParams() {
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery({
		queryKey: ["productsCategory", "1"],
		queryFn: () => fetchProductsByCategory("t-shirts", "1"),
	});

	return [
		{ category: "t-shirts", pageNumber: "1" },
		{ category: "hoodies", pageNumber: "1" },
		{ category: "accessories", pageNumber: "1" },
		{ category: "accessories", pageNumber: "2" },
	];
}

export default async function CategoryProductPage({
	params: { category, pageNumber },
	searchParams,
}: {
	readonly params: { category: string; pageNumber: string };
	readonly searchParams: { [key: string]: string | string[] };
}) {
	const query = searchParams.search?.toString() ?? "";

	const queryClient = getQueryClient();
	await queryClient.prefetchQuery({
		queryKey: ["productsCategory", pageNumber, query],
		queryFn: () => fetchProductsByCategory(category, pageNumber, query),
	});
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ProductCategoryList category={category} pageNumber={pageNumber} search={query} />
		</HydrationBoundary>
	);
}
