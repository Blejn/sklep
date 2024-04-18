import { executeGraphql } from "../graphqlApi";

import { ProductsGetByIdDocument, type ProductsGetByIdQuery } from "@/gql/graphql";


export const getProductById = async ({ id }: { id: string }): Promise<ProductsGetByIdQuery>  => {
		const graphqlResponse = await executeGraphql({
			query: ProductsGetByIdDocument,
			variables: {
				id: id,
			},
			cache:"no-store",
		});
		return graphqlResponse;
	
	return graphqlResponse
};
