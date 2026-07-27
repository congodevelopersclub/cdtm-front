"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { IconLoader2 } from "@tabler/icons-react"

import { Button } from "@workspace/ui/components/button"

import { useLinkedInAuth } from "../hooks/use-linkedin-auth"

import { LoginAuthToolbar } from "./login-auth-toolbar"
import { LoginBrandHeader } from "./login-brand-header"

export function LoginAuthPanel() {
  const t = useTranslations("Login")
  const { startLinkedInAuth, isRedirecting } = useLinkedInAuth()

  return (
    <div className="relative flex h-full w-full flex-col">
      <div className="absolute top-0 right-0 z-10">
        <LoginAuthToolbar />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center">
        <LoginBrandHeader />

        <div className="flex w-full max-w-md flex-col gap-6">
          <div className="hidden space-y-2 text-center lg:block lg:text-left">
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
              <div className="flex size-5 items-center overflow-hidden bg-white">
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
      </div>
    </div>
  )
}
