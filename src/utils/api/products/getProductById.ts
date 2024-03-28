import { executeGraphql } from "../graphqlApi";

import { ProductsGetByIdDocument, type ProductsGetByIdQuery } from "@/gql/graphql";


export const getProductById = async ({ id }: { id: string }) => {
	const getProduct = async (): Promise<ProductsGetByIdQuery> => {
		const graphqlResponse = await executeGraphql({
			query: ProductsGetByIdDocument,
			variables: {
				id: id,
			},
			next:{
				revalidate:1
			}
		});
		return graphqlResponse;
	};
	return getProduct();
};
