"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"

import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

import { LocaleSwitcher } from "@/widgets/locale-switcher"

export function HomePage() {
  const t = useTranslations("HomePage")

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle>{t("title")}</CardTitle>
              <CardDescription>{t("description")}</CardDescription>
            </div>
            <LocaleSwitcher />
          </div>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Button asChild>
            <Link href="/auth">{t("signIn")}</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">{t("dashboard")}</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
