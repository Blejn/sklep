import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { CartModal } from "@/ui/organisms/CartModal";

import { fetchCart } from "@/server/cart";

export default async function Page() {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ["cart"],
		queryFn: async () => fetchCart(),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<CartModal />
		</HydrationBoundary>
	);
}
