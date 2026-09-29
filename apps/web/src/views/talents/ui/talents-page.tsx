import Link from "next/link"
import { getTranslations } from "next-intl/server"

import { Button } from "@workspace/ui/components/button"

import { TalentCard } from "./talent-card"

import { getPublicProfiles, type PublicTalentsPage } from "@/entities/talent"

type TalentsPageProps = {
  page: number
}

export async function TalentsPage({ page }: TalentsPageProps) {
  const t = await getTranslations("talents")
  let result: PublicTalentsPage | null = null
  let hasError = false

  try {
    result = await getPublicProfiles(page)
  } catch {
    hasError = true
  }

  return (
    <section className="py-16">
      <div className="page-container">
        <h1 className="text-foreground text-4xl font-black tracking-tighter md:text-5xl">
          {t("title")}
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl">{t("subtitle")}</p>

        {hasError ? (
          <p className="text-muted-foreground mt-12 text-sm">{t("loadError")}</p>
        ) : null}

        {result && result.profiles.length === 0 ? (
          <p className="text-muted-foreground mt-12 text-sm">{t("empty")}</p>
        ) : null}

        {result && result.profiles.length > 0 ? (
          <>
            <p className="text-muted-foreground mt-8 text-sm">
              {t("directoryCount", { total: result.pagination.total })}
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {result.profiles.map((profile) => (
                <TalentCard key={profile.id} profile={profile} />
              ))}
            </div>
            {result.pagination.lastPage > 1 ? (
              <div className="mt-10 flex items-center justify-center gap-3">
                {result.pagination.currentPage > 1 ? (
                  <Button variant="outline" className="rounded-full" asChild>
                    <Link href={`/talents?page=${result.pagination.currentPage - 1}`}>
                      {t("previous")}
                    </Link>
                  </Button>
                ) : null}
                <span className="text-muted-foreground text-sm">
                  {t("pageOf", {
                    page: result.pagination.currentPage,
                    lastPage: result.pagination.lastPage,
                  })}
                </span>
                {result.pagination.currentPage < result.pagination.lastPage ? (
                  <Button variant="outline" className="rounded-full" asChild>
                    <Link href={`/talents?page=${result.pagination.currentPage + 1}`}>
                      {t("next")}
                    </Link>
                  </Button>
                ) : null}
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </section>
  )
}
