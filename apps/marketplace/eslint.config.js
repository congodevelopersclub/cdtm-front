import { nextJsConfig } from "@workspace/eslint-config/next-js"
import { fsdConfig } from "@workspace/eslint-config/fsd"

/** @type {import("eslint").Linter.Config} */
export default [...nextJsConfig, ...fsdConfig]
