import {
	ProductsGetSizeColorVariantsDocument,
	ProductsGetSizeColorVariantsQuery,
} from "@/gql/graphql";
import { executeGraphql } from "../graphqlApi";

export const getSizeColorVariantsOfProduct = async (id: string) => {
	const getProductList = async (): Promise<ProductsGetSizeColorVariantsQuery> => {
		const graphqlResponse = await executeGraphql(ProductsGetSizeColorVariantsDocument, {
			id: id,
		});
		return graphqlResponse;
	};
	return getProductList();
};
