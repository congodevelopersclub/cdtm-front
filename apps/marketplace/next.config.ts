import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./src/shared/i18n/request.ts")

const nextConfig: NextConfig = {
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
    ],
  },
}

export default withNextIntl(nextConfig)
