import { executeGraphql } from "../graphqlApi";

import {
	ProductsGetByCategorySlugDocument,
	type ProductsGetByCategorySlugQuery,
} from "@/gql/graphql";

export const getProductsByCategory = async (category: string, pageNumber: string) => {
	const getProductList = async ({
		limit,
		offset,
		slug,
	}: {
		limit: number;
		offset: number;
		slug: string;
	}): Promise<ProductsGetByCategorySlugQuery> => {
		const graphqlResponse = await executeGraphql({
			query: ProductsGetByCategorySlugDocument,
			variables: {
				limit: limit,
				offset: offset,
				slug: slug,
			},
		});

		return graphqlResponse;
	};

	const data = await getProductList({
		slug: category,
		limit: 4,
		offset: (parseInt(pageNumber) - 1) * 4,
	});

	const { edges, pageInfo, aggregate } = data.productsConnection;
	const products = edges.map((edge) => edge.node);

	return { products, pageInfo, aggregate };
};
