import { useQuery } from "@tanstack/react-query";
import { ProductListItem } from "../molecules/ProductListItem";
import { fetchProductByHighestRate } from "@/server/products";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const SuggestedProductsList = async () => {
	const {
		data: products,
		isError,
		isLoading,
	} = useQuery({
		queryKey: ["suggestedProducts"],
		queryFn: () => fetchProductByHighestRate(5),
	});
	await sleep(5000);
	if (isLoading) return <div className="h-12 w-12 animate-spin">Loading...</div>;
	if (isError) return <div>Error</div>;
	if (!products) {
		return <div>No products found</div>;
	}
	return (
		<>
			<div className="m-2 flex flex-row justify-center">
				<h1>Suggested products</h1>
			</div>
			<div data-testid="related-products">
				<ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{products.map((product) => (
						<ProductListItem key={product.id} product={product} />
					))}
				</ul>
			</div>
		</>
	);
};
