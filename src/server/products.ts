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



export const fetchProducts = async (pageNumber?:string,search?:string): Promise<ProductsGetListQuery['productsConnection']>  => {
	console.log('search',search)
    const graphqlResponse = await executeGraphql({
         query: ProductsGetListDocument,
		 variables:{
         limit:8,
         offset:pageNumber ? (parseInt(pageNumber) - 1) * 8 : 0,
		 search: search? search : ""
		 },
		 next:{tags:["products"]},
         cache:"force-cache" });

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
			next:{tags:["category"]},
			cache:"force-cache" 
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
		next:{tags:["product"]},
		cache:"force-cache",
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

