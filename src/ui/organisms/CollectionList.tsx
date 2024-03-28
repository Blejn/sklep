import React from "react";
import { CollectionListItem } from "../molecules/collection/CollectionListItem";
import { type GetCollectionsQuery } from "@/gql/graphql";

export const CollectionList = ({ data }: { data: GetCollectionsQuery }) => {
	return (
		<ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{data.collections.map((collection) => {
				return <CollectionListItem key={collection.id} id={collection.id} name={collection.name} />;
			})}
		</ul>
	);
};
