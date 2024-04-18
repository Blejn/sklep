import { executeGraphql } from "../graphqlApi";

import { GetCollectionsDocument, type GetCollectionsQuery } from "@/gql/graphql";

export const getCollections = async () => {
	const getCollectionsList = async (): Promise<GetCollectionsQuery> => {
		const graphqlResponse = await executeGraphql({ query: GetCollectionsDocument });
		return { collections: graphqlResponse.collections || [] };
	};
	return getCollectionsList();
};
