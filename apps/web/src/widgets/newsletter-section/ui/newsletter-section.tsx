"use client"

import { useTranslations } from "next-intl"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

import { NewsletterSignupForm } from "@/features/newsletter-signup"

export function NewsletterSection() {
  const t = useTranslations("Newsletter")

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <NewsletterSignupForm />
      </CardContent>
    </Card>
  )
}
