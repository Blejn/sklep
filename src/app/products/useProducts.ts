import { getProducts } from "@/utils/api/products/getProducts";

export const useGetProducts = async () => {
	const products = await getProducts();
	return { products };
};
