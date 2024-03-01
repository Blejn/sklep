import { GetCollectionsDocument, GetCollectionsQuery } from "@/gql/graphql";
import { executeGraphql } from "../graphqlApi";

export const getCollections = async () => {
	const getCollectionsList = async (): Promise<GetCollectionsQuery> => {
		const graphqlResponse = await executeGraphql(GetCollectionsDocument, {});
		return { collections: graphqlResponse.collections || [] };
	};
	return getCollectionsList();
};
