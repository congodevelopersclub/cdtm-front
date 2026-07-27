import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export type WebPageMetadataKey = "home" | "notFound"

export async function createRootMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata")

  return {
    title: {
      default: t("siteName"),
      template: `%s | ${t("siteName")}`,
    },
    description: t("defaultDescription"),
  }
}

export async function createPageMetadata(
  page: WebPageMetadataKey
): Promise<Metadata> {
  const t = await getTranslations("Metadata")

  return {
    title: t(`${page}.title`),
    description: t(`${page}.description`),
  }
}
