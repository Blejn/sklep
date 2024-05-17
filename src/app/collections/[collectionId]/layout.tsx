import { type ReactNode } from "react";

import { getCollections } from "@/api/collections/getCollections";

export const generateStaticParams = async () => {
	const data = await getCollections();
	return data.collections.map((collection) => {
		return { collection: collection.id };
	});
};
export default function CollectionProductLayout({ children }: { children: ReactNode }) {
	return <>{children}</>;
}
