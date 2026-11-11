"use client"

import { useState } from "react"
import { ArrowRight, LoaderCircle } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"

type FormStatus = "idle" | "success" | "invalid" | "error"

export function ContactForm() {
  const t = useTranslations("contact")
  const locale = useLocale()
  const [status, setStatus] = useState<FormStatus>("idle")
  const [isPending, setIsPending] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isPending) {
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)

    setIsPending(true)
    setStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
          website: formData.get("website"),
          locale,
        }),
      })

      const result = (await response.json().catch(() => null)) as {
        status?: FormStatus
      } | null

      if (!response.ok || !result?.status || result.status === "error") {
        setStatus(result?.status === "invalid" ? "invalid" : "error")
        return
      }

      setStatus(result.status)
      if (result.status === "success") {
        form.reset()
      }
    } catch {
      setStatus("error")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative space-y-5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] top-0 h-px w-px overflow-hidden opacity-0"
      >
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium" htmlFor="contact-name">
          {t("name")}
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder={t("namePlaceholder")}
            maxLength={120}
            required
            className="mt-2 h-11"
          />
        </label>
        <label className="space-y-2 text-sm font-medium" htmlFor="contact-email">
          {t("email")}
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            maxLength={254}
            required
            className="mt-2 h-11"
          />
        </label>
      </div>

      <label className="block space-y-2 text-sm font-medium" htmlFor="contact-subject">
        {t("subject")}
        <Input
          id="contact-subject"
          name="subject"
          placeholder={t("subjectPlaceholder")}
          maxLength={200}
          required
          className="mt-2 h-11"
        />
      </label>

      <label className="block space-y-2 text-sm font-medium" htmlFor="contact-message">
        {t("message")}
        <Textarea
          id="contact-message"
          name="message"
          placeholder={t("messagePlaceholder")}
          maxLength={5000}
          rows={8}
          required
          className="mt-2 h-24 resize-y"
        />
      </label>

      {status !== "idle" ? (
        <p
          role={status === "error" || status === "invalid" ? "alert" : "status"}
          className={
            status === "success"
              ? "text-sm text-emerald-700 dark:text-emerald-400"
              : "text-sm text-destructive"
          }
        >
          {t(status)}
        </p>
      ) : null}

      <div className="pt-3">
        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="h-12 gap-2 rounded-2xl px-10"
        >
          {isPending ? (
            <LoaderCircle className="animate-spin" aria-hidden="true" />
          ) : (
            <ArrowRight aria-hidden="true" />
          )}
          {isPending ? t("sending") : t("submit")}
        </Button>
      </div>
    </form>
  )
}
