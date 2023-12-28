import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_HASURA_API_URL,
  documents: "src/**/*.gql",
  generates: {
    "./src/graphql/generated/schema.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
      },
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};
export default config;
