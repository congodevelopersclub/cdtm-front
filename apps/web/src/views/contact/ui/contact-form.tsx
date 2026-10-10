"use client"

import { useActionState } from "react"
import { ArrowRight, LoaderCircle } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"
import { sendContactMessage } from "../actions/send-contact-message"

const initialState = { status: "idle" as const }

export function ContactForm() {
  const t = useTranslations("contact")
  const [state, formAction, isPending] = useActionState(
    sendContactMessage,
    initialState
  )

  return (
    <form action={formAction} className="space-y-5">

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

      {state.status !== "idle" ? (
        <p
          role={state.status === "error" || state.status === "invalid" ? "alert" : "status"}
          className={
            state.status === "success"
              ? "text-sm text-emerald-700 dark:text-emerald-400"
              : "text-sm text-destructive"
          }
        >
          {t(state.status)}
        </p>
      ) : null}

      <div className="pt-3">
        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="h-12 gap-2 px-10  rounded-2xl "
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