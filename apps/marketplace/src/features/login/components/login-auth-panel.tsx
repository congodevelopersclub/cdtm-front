"use client"

import { useTranslations } from "next-intl"
import { IconBrandLinkedin, IconLoader2 } from "@tabler/icons-react"

import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

import { useLinkedInAuth } from "../hooks/use-linkedin-auth"

export function LoginAuthPanel() {
  const t = useTranslations("Login")
  const { startLinkedInAuth, isRedirecting } = useLinkedInAuth()

  return (
    <Card className="w-full max-w-md rounded-3xl border-border bg-card shadow-sm">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl">{t("cardTitle")}</CardTitle>
        <CardDescription>{t("cardDescription")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button
          variant="outline"
          className="h-12 w-full rounded-xl text-base font-medium"
          disabled={isRedirecting}
          onClick={startLinkedInAuth}
          type="button"
        >
          {isRedirecting ? (
            <IconLoader2 className="size-5 animate-spin" />
          ) : (
            <IconBrandLinkedin className="size-5" />
          )}
          {isRedirecting ? t("redirecting") : t("continueWithLinkedIn")}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          {t("newUserPrompt")}{" "}
          <span className="font-medium text-foreground">{t("newUserAction")}</span>
        </p>
      </CardContent>
    </Card>
  )
}
