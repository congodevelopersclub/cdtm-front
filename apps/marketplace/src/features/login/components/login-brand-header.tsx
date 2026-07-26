"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"

export function LoginBrandHeader() {
  const t = useTranslations("Login")

  return (
    <div className="mb-6 flex shrink-0 flex-col items-center gap-2 text-center lg:hidden">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center overflow-hidden">
          <Image
            src="/images/logo.svg"
            alt=""
            width={40}
            height={40}
            className="size-full object-contain"
            priority
          />
        </div>
        <span className="text-xl font-semibold tracking-tight">{t("platformName")}</span>
      </div>
      <p className="text-muted-foreground max-w-xs text-sm">{t("platformTagline")}</p>
    </div>
  )
}
