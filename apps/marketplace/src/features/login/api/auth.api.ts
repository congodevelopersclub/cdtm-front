import type { ExchangeCodeResponse } from "@/entities/user"
import { apiClient } from "@/shared/axios/client"
import { env } from "@/shared/config/env"

export function getLinkedInAuthUrl() {
  return `${env.NEXT_PUBLIC_API_URL}/auth`
}

export async function exchangeCodeRequest(
  code: string
): Promise<ExchangeCodeResponse> {
  const { data } = await apiClient.post<ExchangeCodeResponse>(
    "/auth/exchange-code",
    { code }
  )

  return data
}
