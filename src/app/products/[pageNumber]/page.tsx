import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import getQueryClient from "../../getQueryClient";
import { ProductsList } from "@/ui/organisms/ProductsList";
import { fetchProducts } from "@/server/products";

export default async function ProductsPage({
	params: { pageNumber },
	searchParams,
}: {
	params: { pageNumber: string };
	readonly searchParams: { [key: string]: string | string[] };
}) {
	const query = searchParams.search?.toString() ?? "";

	const queryClient = getQueryClient();
	await queryClient.prefetchQuery({
		queryKey: ["products", pageNumber, query],
		queryFn: () => fetchProducts(pageNumber, query),
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<ProductsList pageNumber={pageNumber} search={query} />
		</HydrationBoundary>
	);
}
