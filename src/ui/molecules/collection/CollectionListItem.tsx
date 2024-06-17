import Link from "next/link";
import React from "react";

export const CollectionListItem = ({ name, id }: { id: string; name: string }) => {
	return (
		<Link href={`/collections/${id}`}>
			<li
				data-testid="products-list"
				className="flex flex-row overflow-hidden rounded-md shadow-md"
			>
				<article>
					<h3>{name}</h3>
				</article>
			</li>
		</Link>
	);
};
