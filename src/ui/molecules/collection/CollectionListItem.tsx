import { useLocale } from "next-intl";
import Link from "next/link";
import React from "react";

export const CollectionListItem = ({ name, id }: { id: string; name: string }) => {
	const locale = useLocale();

	return (
		<li data-testid="products-list" className="flex flex-row overflow-hidden rounded-md shadow-md">
			<Link href={`${locale}/collections/${id}`}>
				<article>
					<h3>{name}</h3>
				</article>
			</Link>
		</li>
	);
};
