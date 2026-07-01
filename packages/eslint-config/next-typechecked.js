import importX from "eslint-plugin-import-x"
import tseslint from "typescript-eslint"

import { nextJsConfig } from "./next.js"

/**
 * Type-aware Next.js app ESLint config with strict TypeScript and import hygiene.
 *
 * @param {{ tsconfigRootDir: string }} options
 * @returns {import("eslint").Linter.Config[]}
 */
export function createNextTypeCheckedConfig({ tsconfigRootDir }) {
  return tseslint.config(
    {
      ignores: [
        "eslint.config.js",
        "postcss.config.mjs",
        "next.config.ts",
      ],
    },
    ...nextJsConfig,
    ...tseslint.configs.recommendedTypeChecked,
    importX.flatConfigs.recommended,
    {
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir,
        },
      },
      settings: {
        "import-x/resolver": {
          typescript: {
            alwaysTryTypes: true,
            project: "./tsconfig.json",
          },
          node: true,
        },
      },
    },
    {
      rules: {
        "@typescript-eslint/consistent-type-definitions": ["error", "type"],
        "@typescript-eslint/consistent-type-imports": [
          "error",
          { prefer: "type-imports", fixStyle: "inline-type-imports" },
        ],
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/no-misused-promises": [
          "error",
          {
            checksVoidReturn: {
              attributes: false,
            },
          },
        ],
        "@typescript-eslint/no-unused-vars": [
          "error",
          { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
        ],
        "import-x/no-duplicates": "error",
        "import-x/no-self-import": "error",
        "import-x/no-unresolved": "off",
        "react-hooks/exhaustive-deps": "error",
      },
    }
  )
}
