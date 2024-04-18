import { type TypedDocumentString } from "@/gql/graphql";
import { environment } from "@/lib/environment";

export async function executeGraphql<TResult, TVariables>({
	query,
	variables,
	cache,
	next,
	headers,
}: {
	query: TypedDocumentString<TResult, TVariables>;
	cache?: RequestCache;
	headers?: HeadersInit;
	next?: NextFetchRequestConfig | undefined;
} & (TVariables extends { [key: string]: never }
	? { variables?: never }
	: { variables: TVariables })): Promise<TResult> {

    const { GRAPHQL_URL } = environment;


    const res = await fetch(`${GRAPHQL_URL}`, {
        method: "POST",
        body: JSON.stringify({
            query,
            variables,
        }),
        cache,
        next,
        headers: {
            ...headers,
            "Content-Type": "application/json",
        },
    });
	type GraphqlResponse<T> =
	| {
			data?: undefined;
			errors: { message: string }[];
	  }
	| {
			data: T;
			errors?: undefined;
	  };



	const graphqlResponse = (await res.json()) as GraphqlResponse<TResult>;

	if (graphqlResponse.errors) {
		throw TypeError(`GraphQL Error`, {
			cause: graphqlResponse.errors,
		});
	}

	return graphqlResponse.data;
}
