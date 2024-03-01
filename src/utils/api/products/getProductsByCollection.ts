import { ProductsGetByCollectionIdDocument, ProductsGetByCollectionIdQuery } from "@/gql/graphql";
import { executeGraphql } from "../graphqlApi";

export const getProductsByCollectionId = async (id: string) => {
	const getProductList = async (): Promise<ProductsGetByCollectionIdQuery> => {
		const graphqlResponse = await executeGraphql(ProductsGetByCollectionIdDocument, { id: id });
		return graphqlResponse;
	};
	return getProductList();
};
