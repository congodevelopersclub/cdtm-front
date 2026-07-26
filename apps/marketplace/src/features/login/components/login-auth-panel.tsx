"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { IconLoader2 } from "@tabler/icons-react"

import { Button } from "@workspace/ui/components/button"

import { useLinkedInAuth } from "../hooks/use-linkedin-auth"

export function LoginAuthPanel() {
  const t = useTranslations("Login")
  const { startLinkedInAuth, isRedirecting } = useLinkedInAuth()

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <div className="space-y-2 text-center lg:text-left hidden lg:block">
        <h1 className="text-2xl font-semibold tracking-tight">{t("cardTitle")}</h1>
        <p className="text-muted-foreground">{t("cardDescription")}</p>
      </div>

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
          <div className="size-5 flex items-center overflow-hidden bg-white">
            <Image
              src="/icons/linkedin.svg"
              width={100}
              height={100}
              alt="LinkedIn"
              aria-hidden
              className="h-full w-full object-cover"
              priority
            />
          </div>
        )}
        {isRedirecting ? t("redirecting") : t("continueWithLinkedIn")}
      </Button>

      <p className="text-center text-sm text-muted-foreground lg:text-left">
        {t("newUserPrompt")}{" "}
        <span className="font-medium text-foreground">{t("newUserAction")}</span>
      </p>
    </div>
  )
}
