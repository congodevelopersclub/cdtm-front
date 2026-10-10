export class ApiError extends Error {
  readonly status: number
  readonly code?: string
  readonly details?: unknown

  constructor(
    message: string,
    status: number,
    code?: string,
    details?: unknown
  ) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.code = code
    this.details = details
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError
}

type ApiErrorBody = {
  message?: string
  errors?: Record<string, string | string[]>
}

export function apiErrorMessage(data: ApiErrorBody | undefined, fallback: string) {
  const fieldErrors = data?.errors

  if (fieldErrors && typeof fieldErrors === "object") {
    const details = Object.entries(fieldErrors).flatMap(([field, messages]) => {
      const list = Array.isArray(messages) ? messages : [messages]

      return list.filter(Boolean).map((message) => `${field}: ${message}`)
    })

    if (details.length > 0) {
      return details.join(" ")
    }
  }

  return data?.message || fallback
}
