import { executeGraphql } from "../graphqlApi";

import { ProductGetListDocument, type ProdutListItemFragment } from "@/gql/graphql";

export const fetchProducts = async (): Promise<ProdutListItemFragment[]>  => {
		const graphqlResponse = await executeGraphql({
			 query: ProductGetListDocument,
			 cache:"no-store" });

		return graphqlResponse.products;

};


