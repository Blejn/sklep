import { executeGraphql } from "../graphqlApi";

import { ProductGetListDocument, type ProdutListItemFragment } from "@/gql/graphql";

export const getProducts = async () => {
	const getProductList = async (): Promise<ProdutListItemFragment[]> => {
		const graphqlResponse = await executeGraphql({ query: ProductGetListDocument,next:{revalidate:15} });

		return graphqlResponse.products;
	};

	return getProductList();
};
