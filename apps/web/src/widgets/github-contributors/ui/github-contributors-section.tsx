import { getTranslations } from "next-intl/server"

import { GithubCarousel } from "./github-carousel"

import { getContributors } from "@/entities/github-contributor"

export async function GithubContributorsSection() {
  const t = await getTranslations("github")
  const contributors = await getContributors()

  if (contributors.length === 0) {
    return null
  }

  return (
    <section className="border-border bg-card/30 border-y py-24">
      <div className="page-container">
        <div className="mb-12">
          <h2 className="text-foreground text-4xl font-black tracking-tighter md:text-5xl">
            {t("title")}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl">{t("subtitle")}</p>
        </div>
        <GithubCarousel contributors={contributors} />
      </div>
    </section>
  )
}
