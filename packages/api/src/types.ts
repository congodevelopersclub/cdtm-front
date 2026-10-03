export type ApiResponse<T> = {
  data: T
  message?: string
}

export type PaginatedResponse<T> = {
  data: T[]
  meta: {
    total: number
    page: number
    perPage: number
    totalPages: number
  }
}

export type ApiClientConfig = {
  baseURL: string
  getToken?: () => string | null | Promise<string | null>
  onUnauthorized?: () => void | Promise<void>
}
