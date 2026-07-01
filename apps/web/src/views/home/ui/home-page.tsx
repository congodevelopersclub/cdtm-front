"use client"

import { useTranslations } from "next-intl"

import { Button } from "@workspace/ui/components/button"
import { LocaleSwitcher } from "@/widgets/locale-switcher"
import { NewsletterSection } from "@/widgets/newsletter-section"

export function HomePage() {
  const t = useTranslations("HomePage")

  return (
    <div className="flex min-h-svh flex-col gap-8 p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-medium">{t("title")}</h1>
            <p>{t("description1")}</p>
            <p>{t("description2")}</p>
            <Button className="mt-2">{t("button")}</Button>
          </div>
          <LocaleSwitcher />
        </div>
        <div className="text-muted-foreground font-mono text-xs">
          {t("darkModeHint", { key: "d" })}
        </div>
      </div>
      <NewsletterSection />
    </div>
  )
}
