import { architectureConfig } from "@workspace/eslint-config/architecture"
import { createFsdLintConfig } from "@workspace/eslint-config/fsd-lint"
import { createNextTypeCheckedConfig } from "@workspace/eslint-config/next-typechecked"

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...createNextTypeCheckedConfig({ tsconfigRootDir: import.meta.dirname }),
  createFsdLintConfig({ tsconfigRootDir: import.meta.dirname }),
  ...architectureConfig,
]
