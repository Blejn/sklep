import { ProductsGetByIdDocument, ProductsGetByIdQuery } from "@/gql/graphql";
import { executeGraphql } from "../graphqlApi";

export const getProductById = async ({ id }: { id: string }) => {
	const getProduct = async (): Promise<ProductsGetByIdQuery> => {
		const graphqlResponse = await executeGraphql(ProductsGetByIdDocument, {
			id: id,
		});
		return graphqlResponse;
	};
	return getProduct();
};
