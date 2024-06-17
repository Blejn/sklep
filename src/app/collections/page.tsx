import React from "react";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { CollectionList } from "@/ui/organisms/CollectionList";
import { fetchCollectionsList } from "@/server/collection";

export default async function Page() {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ["collections"],
		queryFn: () => fetchCollectionsList(),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<CollectionList />
		</HydrationBoundary>
	);
}
