import { CollectionList } from "@/ui/organisms/CollectionList";
import { getCollections } from "@/utils/api/collections/getCollections";
import React from "react";

export default async function Page() {
	const collection = await getCollections();

	return (
		<>
			{" "}
			<CollectionList data={collection} />
			<pre>{JSON.stringify(collection)}</pre>
		</>
	);
}
