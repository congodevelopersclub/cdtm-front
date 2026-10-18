export function clearBrowserCookies() {
  if (typeof document === "undefined") {
    return
  }

  for (const part of document.cookie.split(";")) {
    const name = part.split("=")[0]?.trim()

    if (!name) {
      continue
    }

    document.cookie = `${name}=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`
  }
}
