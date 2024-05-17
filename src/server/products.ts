"use server"

import { executeGraphql } from "@/api/graphqlApi";
import {
	ProductsGetByCategorySlugDocument,
	ProductsGetByHighestRatingDocument,
	ProductsGetByIdDocument,
	ProductsGetListDocument,
	type ProductsGetByCategorySlugQuery,
	type ProductsGetByHighestRatingQuery,
	type ProductsGetByIdQuery,
	type ProductsGetListQuery
} from "@/gql/graphql";



export const fetchProducts = async (pageNumber:string,search?:string): Promise<ProductsGetListQuery['productsConnection']>  => {
	console.log('search',search)
    const graphqlResponse = await executeGraphql({
         query: ProductsGetListDocument,
		 variables:{
         limit:8,
         offset:(parseInt(pageNumber) - 1) * 8,
		 search: search? search : ""
		 },
         cache:"no-store" });

		 if(!graphqlResponse){
			throw new Error("Bad response");
		 }

		 const { edges, pageInfo, aggregate } = graphqlResponse.productsConnection;
		 return { edges, pageInfo, aggregate };

};

export const fetchProductsByCategory = async (category: string, pageNumber: string, search?:string): Promise<ProductsGetByCategorySlugQuery['productsConnection']> => {

		const graphqlResponse = await executeGraphql({
			query: ProductsGetByCategorySlugDocument,
			variables: {
				limit:4,
				offset: (parseInt(pageNumber) - 1) * 4,
				slug: category,
				search:search ? search : ""
			},
		});

		if(!graphqlResponse){
			throw new Error("Bad response");
		 }
	const { edges, pageInfo, aggregate } = graphqlResponse.productsConnection;

	return { edges, pageInfo, aggregate };
};
export const fetchProductById = async (id:string): Promise<ProductsGetByIdQuery['product']>  => {
	const graphqlResponse = await executeGraphql({
		query: ProductsGetByIdDocument,
		variables: {
			id: id,
		},
		cache:"no-store",
	});

return graphqlResponse.product
};


export const fetchProductByHighestRate = async (rate:number): Promise<ProductsGetByHighestRatingQuery['products']> => {
		const graphqlResponse = await executeGraphql({
			query: ProductsGetByHighestRatingDocument,
			variables: {
				rate: rate,
			},
		});
		return graphqlResponse.products;
	};

