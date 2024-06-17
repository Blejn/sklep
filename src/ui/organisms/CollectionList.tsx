"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { CollectionListItem } from "../molecules/collection/CollectionListItem";
import { fetchCollectionsList } from "@/server/collection";

export function CollectionList() {
	const {
		data: collections,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["collections"],
		queryFn: () => fetchCollectionsList(),
	});
	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Sorry cant get any collections</div>;
	return collections ? (
		<ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{collections.map((collection) => {
				return <CollectionListItem key={collection.id} id={collection.id} name={collection.name} />;
			})}
		</ul>
	) : (
		<div>Sorry cant get any collections</div>
	);
}
