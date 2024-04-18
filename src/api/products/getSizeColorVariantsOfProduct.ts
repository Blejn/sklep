import { executeGraphql } from "../graphqlApi";


import {
	ProductsGetSizeColorVariantsDocument,
	type ProductsGetSizeColorVariantsQuery,
} from "@/gql/graphql";

export const getSizeColorVariantsOfProduct = async (id: string) => {
	const getProductList = async (): Promise<ProductsGetSizeColorVariantsQuery> => {
		const graphqlResponse = await executeGraphql({
			query: ProductsGetSizeColorVariantsDocument,
			variables: {
				id: id,
			},
		});
		return graphqlResponse;
	};
	return getProductList();
};
