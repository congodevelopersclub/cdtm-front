"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { IconLoader2 } from "@tabler/icons-react"

import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

import { useExchangeCode } from "@/features/login"

export function AuthCallbackPage() {
  const t = useTranslations("Login")
  const searchParams = useSearchParams()
  const code = searchParams.get("code")
  const { mutate, isPending, isError, isSuccess } = useExchangeCode()
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!code || hasStarted.current) {
      return
    }

    hasStarted.current = true
    mutate(code)
  }, [code, mutate])

  if (!code) {
    return (
      <div className="flex min-h-svh items-center justify-center p-6">
        <Card className="w-full max-w-md rounded-3xl">
          <CardHeader>
            <CardTitle>{t("cardTitle")}</CardTitle>
            <CardDescription>{t("callbackMissingCode")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/auth">{t("backToLogin")}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-md rounded-3xl">
        <CardHeader className="items-center text-center">
          <CardTitle>{t("cardTitle")}</CardTitle>
          <CardDescription>
            {isError
              ? t("callbackError")
              : isSuccess
                ? t("welcomeBack")
                : t("callbackLoading")}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          {isPending ? (
            <IconLoader2 className="size-8 animate-spin text-primary" />
          ) : null}
          {isError ? (
            <Button asChild className="w-full">
              <Link href="/auth">{t("backToLogin")}</Link>
            </Button>
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}
