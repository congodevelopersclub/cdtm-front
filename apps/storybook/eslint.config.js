import { config as reactInternalConfig } from "@workspace/eslint-config/react-internal"
import storybook from "eslint-plugin-storybook"

/** @type {import("eslint").Linter.Config} */
export default [
  {
    ignores: ["storybook-static/**", "public/**"],
  },
  ...reactInternalConfig,
  ...storybook.configs["flat/recommended"],
]
