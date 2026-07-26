"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { IconLoader2 } from "@tabler/icons-react"

import { Button } from "@workspace/ui/components/button"

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
      <div className="flex min-h-svh flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-muted-foreground">{t("callbackMissingCode")}</p>
        <Button asChild variant="outline">
          <Link href="/auth">{t("backToLogin")}</Link>
        </Button>
      </div>
    )
  }

  const message = isError
    ? t("callbackError")
    : isSuccess
      ? t("welcomeBack")
      : t("callbackLoading")

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 p-6 text-center">
      {(isPending || isSuccess) && !isError ? (
        <IconLoader2 className="size-8 animate-spin text-primary" />
      ) : null}
      <p className="text-muted-foreground">{message}</p>
      {isError ? (
        <Button asChild variant="outline">
          <Link href="/auth">{t("backToLogin")}</Link>
        </Button>
      ) : null}
    </div>
  )
}
