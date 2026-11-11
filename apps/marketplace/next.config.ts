import path from "node:path"
import { fileURLToPath } from "node:url"

import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./src/shared/i18n/request.ts")

const monorepoRoot = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
)

const nextConfig: NextConfig = {
  outputFileTracingRoot: monorepoRoot,
  transpilePackages: ["@workspace/ui", "@workspace/api", "@workspace/i18n"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.licdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "/**",
      },
    ],
  },
}

export default withNextIntl(nextConfig)
