import { ProductsList } from "@/ui/organisms/ProductsList";

import { useGetProducts } from "./useProducts";

export default async function ProductsPage() {
	const { products } = await useGetProducts();
	return (
		<>
			{" "}
			<ProductsList products={products} />
			<pre>{JSON.stringify(products, null, 2)}</pre>
		</>
	);
}
