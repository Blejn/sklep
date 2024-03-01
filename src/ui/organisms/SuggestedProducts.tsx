import { ProductsList } from "./ProductsList";
import { getProductByHighestRate } from "@/utils/api/products/getProductsByHighestRate";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const SuggestedProductsList = async () => {
	const { products } = await getProductByHighestRate(5);
	await sleep(5000);
	return (
		<>
			<div className="m-2 flex flex-row justify-center">
				<h1>Suggested products</h1>
			</div>
			<div data-testid="related-products">
				<ProductsList products={products.slice(-4)} />
			</div>
		</>
	);
};
