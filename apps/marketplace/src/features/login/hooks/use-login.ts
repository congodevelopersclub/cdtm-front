"use client"

import { useMutation } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"

import { loginRequest } from "../api/login.api"
import type { LoginFormValues } from "../validation"

import { setToken } from "@/shared/auth"
import { useAuth } from "@/shared/providers/auth-provider"

export function useLogin() {
  const t = useTranslations("Login")
  const router = useRouter()
  const searchParams = useSearchParams()
  const { refreshSession } = useAuth()

  return useMutation({
    mutationFn: (values: LoginFormValues) => loginRequest(values),
    onSuccess: (response) => {
      setToken(response.tokens.accessToken)
      refreshSession()
      toast.success(t("welcomeBack"))

      const redirect = searchParams.get("redirect") ?? "/dashboard"
      router.push(redirect)
    },
    onError: (error: Error) => {
      toast.error(error.message || t("error"))
    },
  })
}
