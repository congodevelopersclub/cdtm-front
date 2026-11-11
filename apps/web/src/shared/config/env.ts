const DEFAULT_API_URL = "https://staging-cdc.duckdns.org/api/v1"

export function getApiUrl() {
  const configured = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL

  return (configured ?? DEFAULT_API_URL).replace(/\/$/, "")
}
