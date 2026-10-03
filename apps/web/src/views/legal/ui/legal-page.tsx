import { getTranslations } from "next-intl/server"

type LegalSection = {
  title: string
  paragraphs?: string[]
  items?: string[]
}

type LegalContent = {
  title: string
  introduction: string
  sections: LegalSection[]
}

type LegalPageProps = {
  page: "privacy" | "terms" | "cookies"
}

export async function LegalPage({ page }: LegalPageProps) {
  const t = await getTranslations("legal")
  const content = t.raw(page) as LegalContent

  return (
    <article className="page-container py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <header className="mb-12 border-b border-border pb-8">
          <p className="mb-3 text-xs font-bold tracking-widest text-primary uppercase">
            {t("label")}
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            {content.title}
          </h1>
          <p className="mt-5 leading-7 text-muted-foreground">
            {content.introduction}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            {t("lastUpdated")}
          </p>
        </header>

        <div className="space-y-10">
          {content.sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-4 text-2xl font-bold">{section.title}</h2>
              <div className="space-y-4 leading-7 text-muted-foreground">
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.items ? (
                  <ul className="list-disc space-y-2 pl-6">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-12 border-t border-border pt-8 text-sm text-muted-foreground">
          {t("contactPrompt")}{" "}
          <a
            className="font-medium text-primary underline underline-offset-4"
            href="mailto:hello@congodevelopers.club"
          >
            hello@congodevelopers.club
          </a>
        </p>
      </div>
    </article>
  )
}
