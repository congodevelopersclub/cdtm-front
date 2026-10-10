"use server"

import type { SubscribeNewsletterState } from "../../web/src/features/newsletter-signup/actions/subscribe-newsletter"

export async function subscribeNewsletter(
  _prevState: SubscribeNewsletterState,
  formData: FormData
): Promise<SubscribeNewsletterState> {
  const email = formData.get("email")

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return {
      success: false,
      message: "Enter a valid email address",
    }
  }

  return {
    success: true,
    message: "Thanks for subscribing!",
  }
}
