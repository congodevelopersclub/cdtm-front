/** @type {import("eslint").Linter.Config[]} */
export const architectureConfig = [
  {
    files: ["src/**/components/**/*.{ts,tsx}", "src/**/hooks/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "axios",
              message:
                "HTTP calls belong in api modules — never import axios in components or hooks.",
            },
          ],
          patterns: [
            {
              group: ["@/shared/axios/*", "@workspace/api", "@workspace/api/*"],
              message:
                "Use entity/feature api modules — do not call the HTTP client from UI layers.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/features/**/*.{ts,tsx}", "src/entities/**/*.{ts,tsx}"],
    ignores: ["src/**/api/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "zustand",
              message:
                "Client UI state belongs in src/shared/store/ — never use Zustand in features or entities.",
            },
          ],
        },
      ],
    },
  },
]
