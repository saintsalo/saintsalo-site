
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:5000/api/graphql",
  documents:[ "graphql/queries/**/*.graphql", "graphql/fragments/**/*.graphql"],
  ignoreNoDocuments: true,
  generates: {
    "graphql/generated/": {
      preset: "client",
      plugins: []
    },
  }
};
export default config;
