import { useQuery } from '@tanstack/react-query';
import { executeGraphql } from "../graphqlApi";

import { ProductGetListDocument, type ProdutListItemFragment } from "@/gql/graphql";

export const fetchProducts = async (): Promise<ProdutListItemFragment[]>  => {
		const graphqlResponse = await executeGraphql({
			 query: ProductGetListDocument,
			 cache:"no-store" });

		return graphqlResponse.products;

};
export const getProducts = async () => {
return useQuery({
	queryFn:async ()=> fetchProducts(),
	queryKey:["products"]
})
};

