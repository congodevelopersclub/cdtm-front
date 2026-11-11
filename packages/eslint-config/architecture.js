/** @type {import("eslint").Linter.Config[]} */
export const architectureConfig = [
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/shared/axios/*"],
              message:
                "Client axios is removed — proxy backend calls through server actions.",
            },
          ],
        },
      ],
    },
  },
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
                "HTTP calls belong in server actions — never import axios in components or hooks.",
            },
          ],
          patterns: [
            {
              group: [
                "@/shared/axios/*",
                "@/shared/api/server-client",
                "@/shared/config/env.server",
                "@workspace/api",
                "@workspace/api/*",
              ],
              message:
                "Use server actions — do not call the server HTTP client from UI layers.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/features/**/*.{ts,tsx}", "src/entities/**/*.{ts,tsx}"],
    ignores: ["src/**/actions/**"],
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
