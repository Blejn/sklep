import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ProductsList } from "@/ui/organisms/ProductsList";
import { getProducts } from "@/api/products/getProducts";

export default async function ProductsPage() {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ["posts"],
		queryFn: getProducts,
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ProductsList />
		</HydrationBoundary>
	);
}
