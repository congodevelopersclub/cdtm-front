import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { Home } from "lucide-react"

import { Button } from "@workspace/ui/components/button"

import { JOIN_URL } from "@/shared/config/site-links"

export default async function NotFound() {
  const t = await getTranslations("NotFound")

  return (
    <div className="flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center px-4 py-24">
      <div className="mx-auto max-w-lg text-center">
        <p className="text-brand-steel-blue mb-4 font-mono text-sm font-bold tracking-[0.3em] uppercase">
          404
        </p>
        <h1 className="text-foreground mb-4 text-4xl font-black tracking-tighter md:text-5xl">
          {t("title")}
        </h1>
        <p className="text-muted-foreground mb-10 text-lg leading-relaxed">
          {t("description")}
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild className="shadow-primary-sm">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              {t("back_home")}
            </Link>
          </Button>
          <Button asChild variant="outline">
            <a href={JOIN_URL}>{t("join")}</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
