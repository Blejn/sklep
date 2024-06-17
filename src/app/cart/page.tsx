import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { CartList } from "@/ui/organisms/CartList";
import { fetchCart } from "@/server/cart";

export default async function Page() {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ["cart"],
		queryFn: () => fetchCart(),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<CartList />{" "}
		</HydrationBoundary>
	);
}
