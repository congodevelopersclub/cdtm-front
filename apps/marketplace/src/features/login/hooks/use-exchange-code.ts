"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"

import { exchangeCodeAction } from "../actions/exchange-code"

import { userQueryKey } from "@/entities/user"

import { notifyAuthSessionChanged } from "@/shared/auth"
import { setUserId } from "@/shared/auth/user-id"
import { setUserSession } from "@/shared/auth/user-session"

export function useExchangeCode() {
  const t = useTranslations("Login")
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (code: string) => {
      const { user } = await exchangeCodeAction(code)

      return { user }
    },
    onSuccess: ({ user }) => {
      setUserId(user.id)
      setUserSession(user)
      queryClient.setQueryData(userQueryKey(user.id), user)
      notifyAuthSessionChanged()
      toast.success(t("welcomeBack"))

      const redirect = searchParams.get("redirect") ?? "/dashboard"
      router.replace(redirect)
    },
    onError: (error: Error) => {
      toast.error(error.message || t("callbackError"))
    },
  })
}
