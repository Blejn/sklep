import { UseGetProducts } from "./useProducts";
import { ProductsList } from "@/ui/organisms/ProductsList";

export default async function ProductsPage() {
	const { products } = await UseGetProducts();
	return (
		<>
			{" "}
			<ProductsList products={products} />
			<pre>{JSON.stringify(products, null, 2)}</pre>
		</>
	);
}
