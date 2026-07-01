"use server"

import { getTranslations } from "next-intl/server"

import { createNewsletterSchema } from "../validation"

export type SubscribeNewsletterState = {
  success: boolean
  message: string
}

export async function subscribeNewsletter(
  _prevState: SubscribeNewsletterState,
  formData: FormData
): Promise<SubscribeNewsletterState> {
  const t = await getTranslations("Newsletter")
  const parsed = createNewsletterSchema((key) => t(key)).safeParse({
    email: formData.get("email"),
  })

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? t("invalidEmail"),
    }
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api"}/newsletter/subscribe`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      }
    )

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as {
        message?: string
      } | null

      return {
        success: false,
        message: body?.message ?? t("error"),
      }
    }

    return {
      success: true,
      message: t("success"),
    }
  } catch {
    return {
      success: false,
      message: t("error"),
    }
  }
}
