import { TypedDocumentString } from "@/gql/graphql";

export const executeGraphql = async <TResult, TVariables>(
	query: TypedDocumentString<TResult, TVariables>,
	variables: TVariables,
): Promise<TResult> => {
	if (!process.env.GRAPHQL_URL) {
		throw TypeError("GRAPGQL_URL is not defined");
	}
	const res = await fetch(process.env.GRAPHQL_URL, {
		method: "POST",

		body: JSON.stringify({
			query,
			variables,
		}),
	});

	const graphqlResponse = (await res.json()) as GraphqLResponse<TResult>;
	if (graphqlResponse.errors) {
		throw new Error(graphqlResponse?.errors[0]?.message) || "";
	}
	return graphqlResponse.data;
};
type GraphqLResponse<T> =
	| {
			data?: undefined;
			errors: { message: string }[];
	  }
	| {
			data: T;
			errors?: undefined;
	  };
