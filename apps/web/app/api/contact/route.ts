import { NextResponse } from "next/server"

import { deliverContactEmails } from "@/views/contact/lib/deliver-contact-emails"

export const runtime = "nodejs"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function json(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  })
}

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return json({ status: "invalid" }, 400)
  }

  if (!body || typeof body !== "object") {
    return json({ status: "invalid" }, 400)
  }

  const { name, email, subject, message, website, locale } = body as Record<
    string,
    unknown
  >

  // Honeypot: quietly accept without sending.
  if (typeof website === "string" && website.trim()) {
    return json({ status: "success" }, 200)
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof subject !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !EMAIL_PATTERN.test(email.trim()) ||
    !subject.trim() ||
    !message.trim() ||
    name.length > 120 ||
    email.length > 254 ||
    subject.length > 200 ||
    message.length > 5000
  ) {
    return json({ status: "invalid" }, 400)
  }

  try {
    await deliverContactEmails({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      locale: typeof locale === "string" ? locale : undefined,
    })
  } catch (error) {
    console.error("Mailtrap contact delivery failed", error)
    return json({ status: "error" }, 502)
  }

  return json({ status: "success" }, 200)
}
