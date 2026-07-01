import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./src/shared/i18n/request.ts")

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui", "@workspace/api", "@workspace/i18n"],
}

export default withNextIntl(nextConfig)
