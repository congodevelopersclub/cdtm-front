"use client"

import { useTranslations } from "next-intl"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

import { useAuth } from "@/shared/providers/auth-provider"

export function DashboardPage() {
  const t = useTranslations("Dashboard")
  const { session } = useAuth()

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          {session ? (
            <p className="text-sm">
              {t("signedInAs", { email: session.email })}
            </p>
          ) : (
            <p className="text-muted-foreground text-sm">
              {t("sessionLoading")}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
