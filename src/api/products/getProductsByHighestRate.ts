import { executeGraphql } from "../graphqlApi";


import {
	ProductsGetByHighestRatingDocument,
	type ProductsGetByHighestRatingQuery,
} from "@/gql/graphql";

export const getProductByHighestRate = async (rate: number) => {
	const getProductList = async (): Promise<ProductsGetByHighestRatingQuery> => {
		const graphqlResponse = await executeGraphql({
			query: ProductsGetByHighestRatingDocument,
			variables: {
				rate: rate,
			},
		});
		return graphqlResponse;
	};

	return getProductList();
};
