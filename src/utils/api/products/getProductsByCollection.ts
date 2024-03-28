import { executeGraphql } from "../graphqlApi";

import {
	ProductsGetByCollectionIdDocument,
	type ProductsGetByCollectionIdQuery,
} from "@/gql/graphql";

export const getProductsByCollectionId = async (id: string) => {
	const getProductList = async (): Promise<ProductsGetByCollectionIdQuery> => {
		const graphqlResponse = await executeGraphql({
			query: ProductsGetByCollectionIdDocument,
			variables: { id: id },
		});
		return graphqlResponse;
	};
	return getProductList();
};
