import type { CodegenConfig } from "@graphql-codegen/cli";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const config: CodegenConfig = {
	schema: process.env["NEXT_PUBLIC_GRAPHQL_URL"],
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
