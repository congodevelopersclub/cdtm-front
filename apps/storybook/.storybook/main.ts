import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

import type { StorybookConfig } from "@storybook/nextjs-vite"
import tsconfigPaths from "vite-tsconfig-paths"

import { mockServerActionsPlugin } from "./mock-server-actions-plugin.ts"

const __dirname = dirname(fileURLToPath(import.meta.url))
const monorepoRoot = join(__dirname, "../../..")

function getAbsolutePath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}

const config: StorybookConfig = {
  stories: [
    join(monorepoRoot, "packages/ui/src/**/*.stories.@(ts|tsx)"),
    join(monorepoRoot, "apps/web/src/**/*.stories.@(ts|tsx)"),
    join(monorepoRoot, "apps/marketplace/src/**/*.stories.@(ts|tsx)"),
  ],
  addons: [
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-themes"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/nextjs-vite"),
    options: {
      nextConfigPath: join(monorepoRoot, "apps/storybook/next.config.ts"),
    },
  },
  staticDirs: ["../public"],
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
  async viteFinal(viteConfig) {
    const { mergeConfig } = await import("vite")

    return mergeConfig(viteConfig, {
      plugins: [
        mockServerActionsPlugin(),
        tsconfigPaths({
          projects: [
            join(monorepoRoot, "packages/ui/tsconfig.json"),
            join(monorepoRoot, "apps/web/tsconfig.json"),
            join(monorepoRoot, "apps/marketplace/tsconfig.json"),
          ],
        }),
      ],
      resolve: {
        alias: {
          msw: getAbsolutePath("msw"),
          "@storybook/mocks/set-locale": join(__dirname, "../mocks/set-locale.ts"),
          "@storybook/mocks/subscribe-newsletter": join(
            __dirname,
            "../mocks/subscribe-newsletter.ts"
          ),
        },
      },
    })
  },
}

export default config
