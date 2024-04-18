import { getProducts } from "@/api/products/getProducts";
import { ProductsList } from "@/ui/organisms/ProductsList";

export default async function ProductsPage() {
	const products = await getProducts();
	return <ProductsList products={products} />;
}
