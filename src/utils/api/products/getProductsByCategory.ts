import { ProductsGetByCategorySlugDocument, ProdutListItemFragment } from "@/gql/graphql";
import { executeGraphql } from "../graphqlApi";

export const getProductsByCategory = async ({ slug }: { slug: string }) => {
	const getProductList = async (): Promise<ProdutListItemFragment[]> => {
		const graphqlResponse = await executeGraphql(ProductsGetByCategorySlugDocument, {
			slug: slug,
		});

		return graphqlResponse.categories[0]?.products || [];
	};

	return getProductList();
};
