import fsdPlugin from "eslint-plugin-fsd-lint"

/**
 * FSD slice isolation and layer direction rules for app src/ code.
 *
 * @param {{ tsconfigRootDir: string }} options
 * @returns {import("eslint").Linter.Config}
 */
export function createFsdLintConfig({ tsconfigRootDir }) {
  return {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      fsd: fsdPlugin,
    },
    languageOptions: {
      parserOptions: {
        tsconfigRootDir,
      },
    },
    rules: {
      "fsd/forbidden-imports": [
        "error",
        {
          alias: { value: "@/", withSlash: true },
          rootPath: "/src/",
          tsconfigPath: "tsconfig.json",
          layers: {
            pages: {
              pattern: "views",
              priority: 3,
              allowedToImport: ["widgets", "features", "entities", "shared"],
            },
          },
          ignoreImportPatterns: ["^@workspace/"],
        },
      ],
      "fsd/no-cross-slice-dependency": [
        "error",
        {
          alias: { value: "@/", withSlash: true },
          rootPath: "/src/",
          tsconfigPath: "tsconfig.json",
          excludeLayers: ["shared"],
          layers: {
            pages: {
              pattern: "views",
            },
          },
        },
      ],
      "fsd/no-public-api-sidestep": [
        "error",
        {
          alias: { value: "@/", withSlash: true },
          rootPath: "/src/",
          tsconfigPath: "tsconfig.json",
          publicApi: {
            enforceForLayers: ["features", "entities", "widgets", "views"],
            allowSegmentImports: false,
          },
          layers: {
            pages: {
              pattern: "views",
            },
          },
        },
      ],
      "fsd/no-relative-imports": [
        "error",
        {
          alias: { value: "@/", withSlash: true },
          rootPath: "/src/",
          tsconfigPath: "tsconfig.json",
          allowSameSlice: true,
          allowTypeImports: true,
          layers: {
            pages: {
              pattern: "views",
            },
          },
        },
      ],
      "fsd/no-ui-in-business-logic": [
        "error",
        {
          alias: { value: "@/", withSlash: true },
          rootPath: "/src/",
          tsconfigPath: "tsconfig.json",
        },
      ],
      "fsd/no-global-store-imports": [
        "error",
        {
          forbiddenPaths: ["/app/store", "/store/", "/redux/", "/mobx/", "/recoil/"],
          allowedPaths: ["@/shared/store", "/shared/store"],
        },
      ],
      "fsd/ordered-imports": "error",
    },
  }
}
