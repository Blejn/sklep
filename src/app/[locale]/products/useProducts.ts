import { getProducts } from "@/utils/api/products/getProducts";

export const UseGetProducts = async () => {
	const products = await getProducts();
	return { products };
};
