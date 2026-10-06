import { NextResponse } from "next/server"
import { sendContactEmail } from "@/shared/lib/email"

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json()
    const { name, phone, subject, email, message } =
      (body as Record<string, unknown> | null) ?? {}

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      )
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "A valid email is required" },
        { status: 400 }
      )
    }

    if (!subject || typeof subject !== "string" || !subject.trim()) {
      return NextResponse.json(
        { error: "Subject is required" },
        { status: 400 }
      )
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      )
    }

    const result = await sendContactEmail({
      name: name.trim(),
      phone: typeof phone === "string" ? phone.trim() : "",
      subject: subject.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    })

    return NextResponse.json({ success: true, messageId: result.messageId })
  } catch (error) {
    console.error("[Contact API Error]:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred while sending the email" },
      { status: 500 }
    )
  }
}
