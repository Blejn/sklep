import { useQuery } from "@tanstack/react-query";
import { executeGraphql } from "../graphqlApi";

import { ProductsGetByIdDocument, type ProductsGetByIdQuery } from "@/gql/graphql";


export const fetchProductById = async (id:string): Promise<ProductsGetByIdQuery>  => {
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

export const getProductById = async (id:string)=>{
	return useQuery({
		queryFn:async()=>fetchProductById(id),
		queryKey:["product"]
	})
}


