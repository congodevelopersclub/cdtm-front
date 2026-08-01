import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios"

import { ApiError } from "./errors"
import type { ApiClientConfig } from "./types"

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
    async (error: AxiosError<{ message?: string; code?: string }>) => {
      const status = error.response?.status ?? 500
      const message =
        error.response?.data?.message ?? error.message ?? "Request failed"
      const code = error.response?.data?.code

      if (status === 401 && config.onUnauthorized) {
        await config.onUnauthorized()
      }

      throw new ApiError(message, status, code, error.response?.data)
    }
  )

  return client
}
