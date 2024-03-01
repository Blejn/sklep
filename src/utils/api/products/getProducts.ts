import { ProductGetListDocument, ProdutListItemFragment } from "@/gql/graphql";
import { executeGraphql } from "../graphqlApi";

export const getProducts = async () => {
	const getProductList = async (): Promise<ProdutListItemFragment[]> => {
		const graphqlResponse = await executeGraphql(ProductGetListDocument, {});

		return graphqlResponse.products;
	};

	return getProductList();
};
