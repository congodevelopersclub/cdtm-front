/**
 * @deprecated Use createFsdLintConfig from "./fsd-lint.js" instead.
 * Kept for backwards compatibility — re-exports the new FSD lint factory.
 */
export { createFsdLintConfig as createFsdConfig } from "./fsd-lint.js"

/** @deprecated Use createFsdLintConfig({ tsconfigRootDir }) per app instead. */
export const fsdConfig = []
