import { getTranslations } from "next-intl/server"

import { ContactForm } from "./contact-form"

export async function ContactPage() {
  const t = await getTranslations("contact")

  return (
    <section className="bg-background min-h-[calc(100svh-5rem)] py-16 md:py-24">
      <div className="page-container">
        <div className="mb-12 max-w-3xl">
          <h1 className="text-foreground text-4xl leading-tight font-black md:text-6xl">
            {t("title")}
          </h1>
          <p className="text-muted-foreground mt-5 max-w-2xl text-lg leading-relaxed">
            {t("description")}
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">

          <div>
            <h2 className="text-foreground mb-6 text-xl font-bold">
              {t("formTitle")}
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}