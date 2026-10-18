"use server"

import { getLocale } from "next-intl/server"

import { deliverContactEmails } from "../lib/deliver-contact-emails"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type ContactFormState = {
  status: "idle" | "success" | "invalid" | "error"
}

function readTrimmed(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === "string" ? value.trim() : ""
}

export async function sendContactMessage(
  _previousState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Honeypot: bots that fill this field get a fake success.
  if (readTrimmed(formData, "website")) {
    return { status: "success" }
  }

  const name = readTrimmed(formData, "name")
  const email = readTrimmed(formData, "email")
  const subject = readTrimmed(formData, "subject")
  const message = readTrimmed(formData, "message")

  if (
    !name ||
    !EMAIL_PATTERN.test(email) ||
    !subject ||
    !message ||
    name.length > 120 ||
    email.length > 254 ||
    subject.length > 200 ||
    message.length > 5000
  ) {
    return { status: "invalid" }
  }

  try {
    const locale = await getLocale()
    await deliverContactEmails({ name, email, subject, message, locale })
  } catch (error) {
    console.error("Mailtrap contact delivery failed", error)
    return { status: "error" }
  }

  return { status: "success" }
}
