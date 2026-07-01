"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"

import {
  subscribeNewsletter,
  type SubscribeNewsletterState,
} from "../actions/subscribe-newsletter"

const initialState: SubscribeNewsletterState = {
  success: false,
  message: "",
}

export function NewsletterSignupForm() {
  const t = useTranslations("Newsletter")
  const [state, formAction, isPending] = React.useActionState(
    subscribeNewsletter,
    initialState
  )

  React.useEffect(() => {
    if (!state.message) {
      return
    }

    if (state.success) {
      toast.success(state.message)
      return
    }

    toast.error(state.message)
  }, [state.message, state.success])

  return (
    <form action={formAction} className="flex w-full max-w-md flex-col gap-3">
      <div className="grid gap-2">
        <Label htmlFor="newsletter-email">{t("emailLabel")}</Label>
        <Input
          id="newsletter-email"
          name="email"
          placeholder={t("emailPlaceholder")}
          required
          type="email"
        />
      </div>
      <Button disabled={isPending} type="submit">
        {isPending ? t("submitting") : t("submit")}
      </Button>
    </form>
  )
}
