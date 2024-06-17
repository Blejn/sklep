
import { executeGraphql } from "@/api/graphqlApi";
import { GetCollectionsDocument, type GetCollectionsQuery } from "@/gql/graphql";


	export async function fetchCollectionsList(): Promise<GetCollectionsQuery['collections']> {

		const graphqlResponse = await executeGraphql({ query: GetCollectionsDocument });

		return graphqlResponse.collections;
	};

