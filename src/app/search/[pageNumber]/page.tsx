import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import getQueryClient from "../../getQueryClient";
import { fetchProducts } from "@/server/products";
import { ProductsListBySearch } from "@/ui/organisms/ProductsListBySearch";

export type ProductSearchPageType = {
	readonly params: { pageNumber: string };
	readonly searchParams: { [key: string]: string | string[] };
};

export default async function ProductsPage({
	params: { pageNumber },
	searchParams,
}: ProductSearchPageType) {
	const query = searchParams.search?.toString() ?? ""; // Upewnij się, że używasz właściwego klucza "search"
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery({
		queryKey: ["productsBySearch", pageNumber, query],
		queryFn: async () => fetchProducts(pageNumber, query),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ProductsListBySearch pageNumber={pageNumber} search={query} />
		</HydrationBoundary>
	);
}
