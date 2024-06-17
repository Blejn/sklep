import { currentUser } from "@clerk/nextjs/server";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getOrdersByEmail } from "@/server/orders";
import { OrdersList } from "@/ui/organisms/OrdersList";

export default async function OrdersPage() {
	const user = await currentUser();
	const email = user?.emailAddresses[0]?.emailAddress;
	if (!email) {
		return;
	}
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ["orders"],
		queryFn: () => getOrdersByEmail(email ? email : ""),
	});
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<OrdersList email={email} />
		</HydrationBoundary>
	);
}
