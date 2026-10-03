import nodemailer from "nodemailer"

type SendContactEmailParams = {
  name: string
  phone: string
  subject: string
  email: string
  message: string
}

export async function sendContactEmail(params: SendContactEmailParams) {
  const { name, phone, subject, email, message } = params

  const toEmail = process.env.CONTACT_TO_EMAIL || "hello@congodevelopers.club"
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT) || 587
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const secure = process.env.SMTP_SECURE === "true" || port === 465

  if (!host || !user || !pass) {
    console.warn(
      "[Nodemailer] SMTP credentials missing (SMTP_HOST, SMTP_USER, SMTP_PASS). Using JSON transport / preview for development."
    )
    const testAccount = await nodemailer.createTestAccount().catch(() => null)
    
    const transporter = nodemailer.createTransport({
      host: testAccount?.smtp.host || "smtp.ethereal.email",
      port: testAccount?.smtp.port || 587,
      secure: testAccount?.smtp.secure || false,
      auth: {
        user: testAccount?.user || "preview@example.com",
        pass: testAccount?.pass || "preview-secret",
      },
    })

    const info = await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: toEmail,
      replyTo: email,
      subject: `[Contact Form] ${subject}`,
      text: `Nom: ${name}\nTéléphone: ${phone}\nEmail: ${email}\nSujet: ${subject}\n\nMessage:\n${message}`,
      html: `
        <h3>Nouveau message de contact</h3>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Téléphone:</strong> ${phone || "Non renseigné"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Sujet:</strong> ${subject}</p>
        <br />
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
    })

    if (testAccount) {
      console.log("[Nodemailer] Preview URL: %s", nodemailer.getTestMessageUrl(info))
    }

    return { success: true, messageId: info.messageId }
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  })

  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM || `"Congo Developers Club" <hello@congodevelopers.club>`,
    to: toEmail,
    replyTo: `"${name}" <${email}>`,
    subject: `[CDC Contact] ${subject}`,
    text: `Nom: ${name}\nTéléphone: ${phone}\nEmail: ${email}\nSujet: ${subject}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family: sans-serif; font-size: 15px; color: #333; line-height: 1.6;">
        <h2 style="color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Nouveau message depuis la page Contact</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Téléphone :</strong> ${phone || "Non renseigné"}</p>
        <p><strong>Sujet :</strong> ${subject}</p>
        <div style="margin-top: 16px; padding: 12px; background: #f8fafc; border-left: 4px solid #0284c7; border-radius: 4px;">
          <strong>Message :</strong>
          <p style="white-space: pre-wrap; margin-top: 8px;">${message}</p>
        </div>
      </div>
    `,
  })

  return { success: true, messageId: info.messageId }
}
