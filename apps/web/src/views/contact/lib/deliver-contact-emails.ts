import { defaultLocale, isLocale, type Locale } from "@workspace/i18n"

import en from "@/shared/i18n/messages/en.json"
import fr from "@/shared/i18n/messages/fr.json"

const MAILTRAP_SEND_URL = "https://send.api.mailtrap.io/api/send"
export const DEFAULT_CONTACT_INBOX = "hello@congodevelopers.club"

type ContactCopy = {
  confirmationEmailSubject: string
  confirmationEmailText: string
}

const contactCopyByLocale: Record<Locale, ContactCopy> = {
  en: {
    confirmationEmailSubject: en.contact.confirmationEmailSubject,
    confirmationEmailText: en.contact.confirmationEmailText,
  },
  fr: {
    confirmationEmailSubject: fr.contact.confirmationEmailSubject,
    confirmationEmailText: fr.contact.confirmationEmailText,
  },
}

export type ContactMessageInput = {
  name: string
  email: string
  subject: string
  message: string
  locale?: string
}

type MailtrapSendPayload = {
  to: string
  subject: string
  text: string
  replyTo?: { email: string; name: string }
  category: string
}

function getSender() {
  return {
    email: process.env.MAILTRAP_FROM_EMAIL ?? DEFAULT_CONTACT_INBOX,
    name: process.env.MAILTRAP_FROM_NAME ?? "Congo Developers Club",
  }
}

function resolveContactLocale(locale?: string): Locale {
  return isLocale(locale) ? locale : defaultLocale
}

function formatConfirmationText(template: string, name: string) {
  return template.replaceAll("{name}", name)
}

async function sendMailtrapEmail(
  apiToken: string,
  payload: MailtrapSendPayload
) {
  const response = await fetch(MAILTRAP_SEND_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: getSender(),
      to: [{ email: payload.to }],
      ...(payload.replyTo ? { reply_to: payload.replyTo } : {}),
      subject: payload.subject,
      text: payload.text,
      category: payload.category,
    }),
  })

  if (!response.ok) {
    throw new Error(`Mailtrap rejected the message (${response.status})`)
  }
}

export async function deliverContactEmails(input: ContactMessageInput) {
  const apiToken = process.env.MAILTRAP_API_TOKEN
  const inbox = process.env.MAILTRAP_TO ?? DEFAULT_CONTACT_INBOX

  if (!apiToken) {
    throw new Error("Mailtrap credentials are not configured")
  }

  await sendMailtrapEmail(apiToken, {
    to: inbox,
    replyTo: { email: input.email, name: input.name },
    subject: `[Contact] ${input.subject}`,
    text: [
      "New message from the website contact form",
      "",
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      `Subject: ${input.subject}`,
      "",
      "Message:",
      input.message,
    ].join("\n"),
    category: "Contact Form",
  })

  const copy = contactCopyByLocale[resolveContactLocale(input.locale)]

  try {
    await sendMailtrapEmail(apiToken, {
      to: input.email,
      subject: copy.confirmationEmailSubject,
      text: formatConfirmationText(copy.confirmationEmailText, input.name),
      category: "Contact Confirmation",
    })
  } catch (error) {
    // Staff already received the message; do not fail for auto-reply issues.
    console.error("Mailtrap confirmation delivery failed", error)
  }
}
