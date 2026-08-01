import axios from "axios"

import { setupInterceptors } from "./interceptors"
import type { ApiClientConfig } from "./types"

export function createApiClient(config: ApiClientConfig) {
  const client = axios.create({
    baseURL: config.baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  })

  return setupInterceptors(client, config)
}

export { ApiError, isApiError } from "./errors"
export type { ApiClientConfig, ApiResponse, PaginatedResponse } from "./types"
