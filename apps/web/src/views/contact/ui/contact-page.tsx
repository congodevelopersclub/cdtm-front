"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { Mail, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"
import { Label } from "@workspace/ui/components/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@workspace/ui/components/card"

export function ContactPage() {
  const t = useTranslations("contact")

  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  })

  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = (await response.json()) as { error?: string; success?: boolean }

      if (!response.ok) {
        throw new Error(data.error || t("alerts.errorDescription"))
      }

      setStatus("success")
      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (err: unknown) {
      console.error(err)
      setStatus("error")
      setErrorMessage(
        err instanceof Error ? err.message : t("alerts.errorDescription")
      )
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {t("badge")}
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {t("title")}
          </h1>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Info side card */}
          <div className="space-y-6 md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>{t("infoTitle")}</CardTitle>
                <CardDescription>{t("infoDescription")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">{t("emailLabel")}</p>
                    <a
                      href={`mailto:${t("emailValue")}`}
                      className="font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {t("emailValue")}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{t("title")}</CardTitle>
              <CardDescription>{t("formSubtitle")}</CardDescription>
            </CardHeader>
            <CardContent>
              {status === "success" && (
                <div className="mb-6 flex items-start gap-3 rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-green-700 dark:text-green-400">
                  <CheckCircle2 className="size-5 shrink-0" />
                  <div>
                    <h4 className="font-medium">{t("alerts.successTitle")}</h4>
                    <p className="text-sm mt-0.5">{t("alerts.successDescription")}</p>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="mb-6 flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-destructive">
                  <AlertCircle className="size-5 shrink-0" />
                  <div>
                    <h4 className="font-medium">{t("alerts.errorTitle")}</h4>
                    <p className="text-sm mt-0.5">
                      {errorMessage || t("alerts.errorDescription")}
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("fields.name")} *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t("fields.namePlaceholder")}
                      required
                      disabled={status === "loading"}
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("fields.phone")}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t("fields.phonePlaceholder")}
                      disabled={status === "loading"}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("fields.email")} *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t("fields.emailPlaceholder")}
                      required
                      disabled={status === "loading"}
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">{t("fields.subject")} *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={t("fields.subjectPlaceholder")}
                      required
                      disabled={status === "loading"}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">{t("fields.message")} *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t("fields.messagePlaceholder")}
                    required
                    disabled={status === "loading"}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      {t("fields.submitting")}
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 size-4" />
                      {t("fields.submit")}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
