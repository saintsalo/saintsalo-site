import nextCoreWebVitals from "eslint-config-next/core-web-vitals"
import eslintConfigPrettier from "eslint-config-prettier"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"

const config = [
  {
    ignores: [
      "tailwind.config.js",
      "next.config.js",
      "codegen.ts",
      "graphql/generated/**",
      "**/rnbo.js",
      ".next/**",
      "node_modules/**",
    ],
  },
  ...nextCoreWebVitals,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  {
    rules: {
      "prettier/prettier": "error",
      "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx", ".tsx", ".ts"] }],
      "react/require-default-props": 0,
      "@typescript-eslint/explicit-module-boundary-types": 0,
      "react/react-in-jsx-scope": 0,
      "react/jsx-props-no-spreading": 0,
      "import/prefer-default-export": 0,
      "no-underscore-dangle": 0,
      "no-console": ["warn", { allow: ["warn", "error", "info", "debug"] }],
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: { "react/prop-types": "off" },
  },
]

export default config
