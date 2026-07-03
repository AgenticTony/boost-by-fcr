import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://eu-west-2.cdn.hygraph.com/content/cmpsipkj900tq07w3wypgapa2/master",
  documents: ["src/**/*.tsx", "src/**/*.ts", "!src/types/**/*"],
  generates: {
    "src/types/generated.ts": {
      plugins: ["typescript", "typescript-operations"],
      config: {
        withHooks: false,
        withHOC: false,
        withComponent: false,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
