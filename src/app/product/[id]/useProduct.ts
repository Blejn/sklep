import { getProductById } from "@/utils/api/products/getProductById";

export const useGetProduct = async (id: string) => {
	const productResponse = await getProductById({ id: id });

	return productResponse;
};
