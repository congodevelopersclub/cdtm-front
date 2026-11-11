import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios"

import { ApiError, apiErrorMessage } from "./errors"
import type { ApiClientConfig, UnauthorizedContext } from "./types"

function headerValue(config: InternalAxiosRequestConfig | undefined, name: string) {
  const headers = config?.headers

  if (!headers) {
    return undefined
  }

  if (typeof headers.get === "function") {
    const value = headers.get(name)
    return typeof value === "string" ? value : undefined
  }

  const record = headers as unknown as Record<string, unknown>
  const value = record[name] ?? record[name.toLowerCase()]
  return typeof value === "string" ? value : undefined
}

function hadAuthorization(config: InternalAxiosRequestConfig | undefined) {
  const value = headerValue(config, "Authorization")
  return typeof value === "string" && value.replace(/^Bearer\s+/i, "").trim().length > 0
}

export function setupInterceptors(
  client: AxiosInstance,
  config: ApiClientConfig
) {
  client.interceptors.request.use(async (request: InternalAxiosRequestConfig) => {
    if (config.getToken) {
      const token = await config.getToken()

      if (token) {
        request.headers.Authorization = `Bearer ${token}`
      }
    }

    return request
  })

  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<{ message?: string; code?: string; errors?: Record<string, string | string[]> }>) => {
      const status = error.response?.status ?? 500
      const message = apiErrorMessage(
        error.response?.data,
        error.message || "Request failed"
      )
      const code = error.response?.data?.code

      if (status === 401 && config.onUnauthorized) {
        const context: UnauthorizedContext = {
          message: error.response?.data?.message,
          url: error.config?.url,
          hadAuthorization: hadAuthorization(error.config),
        }
        await config.onUnauthorized(context)
      }

      throw new ApiError(message, status, code, error.response?.data)
    }
  )

  return client
}
