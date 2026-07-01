"use server"

import { newsletterSchema } from "../validation"

export type SubscribeNewsletterState = {
  success: boolean
  message: string
}

export async function subscribeNewsletter(
  _prevState: SubscribeNewsletterState,
  formData: FormData
): Promise<SubscribeNewsletterState> {
  const parsed = newsletterSchema.safeParse({
    email: formData.get("email"),
  })

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Invalid email",
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
        message: body?.message ?? "Unable to subscribe. Please try again.",
      }
    }

    return {
      success: true,
      message: "Thanks for subscribing!",
    }
  } catch {
    return {
      success: false,
      message: "Unable to subscribe. Please try again.",
    }
  }
}
