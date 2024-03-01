import { ProductsGetByHighestRatingDocument, ProductsGetByHighestRatingQuery } from "@/gql/graphql";
import { executeGraphql } from "../graphqlApi";

export const getProductByHighestRate = async (rate: number) => {
	const getProductList = async (): Promise<ProductsGetByHighestRatingQuery> => {
		const graphqlResponse = await executeGraphql(ProductsGetByHighestRatingDocument, {
			rate: rate,
		});
		return graphqlResponse;
	};

	return getProductList();
};
