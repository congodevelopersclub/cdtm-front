const upwardImportMessage =
  "FSD violation: dependencies must point downward. This layer cannot import from upper layers."

const sharedRestrictions = {
  patterns: [
    {
      group: [
        "@/entities/**",
        "@/features/**",
        "@/widgets/**",
        "@/pages/**",
        "@/processes/**",
      ],
      message: upwardImportMessage,
    },
  ],
}

const entityRestrictions = {
  patterns: [
    {
      group: [
        "@/features/**",
        "@/widgets/**",
        "@/pages/**",
        "@/processes/**",
      ],
      message: upwardImportMessage,
    },
  ],
}

const featureRestrictions = {
  patterns: [
    {
      group: ["@/widgets/**", "@/pages/**", "@/processes/**"],
      message: upwardImportMessage,
    },
  ],
}

const widgetRestrictions = {
  patterns: [
    {
      group: ["@/pages/**", "@/processes/**"],
      message: upwardImportMessage,
    },
  ],
}

const pageRestrictions = {
  patterns: [
    {
      group: ["@/processes/**"],
      message: upwardImportMessage,
    },
  ],
}

/** @type {import("eslint").Linter.Config[]} */
export const fsdConfig = [
  {
    files: ["src/shared/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": ["error", sharedRestrictions],
    },
  },
  {
    files: ["src/entities/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": ["error", entityRestrictions],
    },
  },
  {
    files: ["src/features/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": ["error", featureRestrictions],
    },
  },
  {
    files: ["src/widgets/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": ["error", widgetRestrictions],
    },
  },
  {
    files: ["src/views/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": ["error", pageRestrictions],
    },
  },
]
