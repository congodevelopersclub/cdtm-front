import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import type { Plugin } from "vite"

const __dirname = dirname(fileURLToPath(import.meta.url))

export function mockServerActionsPlugin(): Plugin {
  const setLocaleMock = join(__dirname, "../mocks/set-locale.ts")
  const subscribeNewsletterMock = join(
    __dirname,
    "../mocks/subscribe-newsletter.ts"
  )
  const marketplaceAuthProviderMock = join(
    __dirname,
    "../mocks/marketplace-auth-provider.tsx"
  )

  return {
    name: "storybook-mock-server-actions",
    enforce: "pre",
    resolveId(source, importer) {
      if (
        source.includes("shared/i18n/actions/set-locale") ||
        source.endsWith("actions/set-locale")
      ) {
        return setLocaleMock
      }

      if (
        source.includes("subscribe-newsletter") &&
        source.includes("actions")
      ) {
        return subscribeNewsletterMock
      }

      if (
        importer?.includes("apps/marketplace") &&
        (source.includes("shared/providers/auth-provider") ||
          source.endsWith("providers/auth-provider"))
      ) {
        return marketplaceAuthProviderMock
      }

      return null
    },
  }
}
