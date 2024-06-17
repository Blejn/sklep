import { type ReactNode } from "react";

import { fetchCollectionsList } from "@/server/collection";

export const generateStaticParams = async () => {
	const data = await fetchCollectionsList();

	return data.map((collection) => {
		return { collection: collection.id };
	});
};
export default function CollectionProductLayout({ children }: { children: ReactNode }) {
	return <>{children}</>;
}
