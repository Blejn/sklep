import Link from "next/link";
type PageInfoProps = {
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	startCursor?: string | null | undefined;
	endCursor?: string | null | undefined;
	pageSize?: number | null | undefined;
};

type PaginationProps = {
	pageInfo: PageInfoProps;
	pageArray: number[];
	category: string;
	pageNumber: string;
};

export const Paggination = ({ pageInfo, pageArray, category, pageNumber }: PaginationProps) => {
	const { hasNextPage, hasPreviousPage } = pageInfo;

	return (
		<ul className="list-style-none flex items-center justify-center py-4 font-bold">
			{hasPreviousPage && (
				<li>
					<Link
						className="text-md relative block rounded bg-transparent px-3 py-1.5 text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
						href={{ pathname: `/products/${category}/${Number(pageNumber) - 1}` }}
						passHref
					>
						{"< Previous"}
					</Link>
				</li>
			)}
			{pageArray.map((page) => (
				<li key={page}>
					<Link
						className={`text-md relative block rounded bg-transparent px-3 py-1.5 transition-all duration-300 hover:bg-neutral-100 hover:text-neutral-800 ${
							pageNumber === String(page)
								? "bg-neutral-500 text-neutral-800"
								: "text-neutral-600 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-800"
						}`}
						href={{ pathname: `/products/${category}/${page}` }}
						passHref
					>
						{page}
					</Link>
				</li>
			))}
			{hasNextPage && (
				<li>
					<Link
						className="text-md relative block rounded bg-transparent px-3 py-1.5 text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
						href={{
							pathname: `/products/${category}/${Number(pageNumber) + 1}`,
						}}
						passHref
					>
						{"Next >"}
					</Link>
				</li>
			)}
		</ul>
	);
};
