import type { CodegenConfig } from "@graphql-codegen/cli";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const config: CodegenConfig = {
	schema: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clt0jgxsw000008ks11o0c2bf/master",
	overwrite: true,
	ignoreNoDocuments: true,
	documents: ["src/graphql/*.graphql"],
	generates: {
		"src/gql/": {
			preset: "client",
			presetConfig: {
				fragmentMasking: false,
				// fragmentMasking: { unmaskFunctionName: "getFragmentData" },
			},
			config: {
				useTypeImports: true,
				enumsAsTypes: true,
				defaultScalarType: "unknown",
				skipTypename: true,
				documentMode: "string",
			},
		},
	},
};

// eslint-disable-next-line import/no-default-export
export default config;
