"use server"

export type ContactFormState = {
  status: "idle" | "success" | "invalid" | "error"
}

export async function sendContactMessage(
  _previousState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name")
  const email = formData.get("email")
  const subject = formData.get("subject")
  const message = formData.get("message")
  const website = formData.get("website")

  if (typeof website === "string" && website.trim()) {
    return { status: "success" }
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof subject !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
    !subject.trim() ||
    !message.trim() ||
    name.length > 120 ||
    email.length > 254 ||
    subject.length > 200 ||
    message.length > 5000
  ) {
    return { status: "invalid" }
  }

  const apiToken = process.env.MAILTRAP_API_TOKEN
  const recipient = process.env.MAILTRAP_TO

  if (!apiToken || !recipient) {
    console.error("Mailtrap credentials or recipient are not configured")
    return { status: "error" }
  }

  try {
    const response = await fetch("https://send.api.mailtrap.io/api/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: {
          email:
            process.env.MAILTRAP_FROM_EMAIL ?? "hello@congodevelopers.club",
          name: process.env.MAILTRAP_FROM_NAME ?? "Congo Developers Club",
        },
        to: [{ email: recipient }],
        subject: `[Contact] ${subject.trim()}`,
        text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
        category: "Integration Test",
      }),
    })

    if (!response.ok) {
      console.error(`Mailtrap API rejected the contact message (${response.status})`)
      return { status: "error" }
    }
  } catch (error) {
    console.error("Mailtrap API request failed", error)
    return { status: "error" }
  }

  return { status: "success" }
}