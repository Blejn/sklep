import React, { FC } from "react";
import { GetCollectionsQuery } from "@/gql/graphql";
import { CollectionListItem } from "../molecules/collection/CollectionListItem";

export const CollectionList = ({ data }: { data: GetCollectionsQuery }) => {
	return (
		<ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{data.collections.map((collection) => {
				return <CollectionListItem id={collection.id} name={collection.name} />;
			})}
		</ul>
	);
};
