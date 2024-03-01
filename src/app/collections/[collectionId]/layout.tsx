import { getCollections } from "@/utils/api/collections/getCollections";
import { ReactNode } from "react";

export const generateStaticParams = async () => {
	const data = await getCollections();
	return data.collections.map((collection) => {
		return { collection: collection.name };
	});
};
export default function CollectionProductLayout({ children }: { children: ReactNode }) {
	return <>{children}</>;
}
