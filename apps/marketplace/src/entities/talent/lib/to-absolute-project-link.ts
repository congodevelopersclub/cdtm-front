export function toAbsoluteProjectLink(link: string) {
  const trimmed = link.trim()

  if (!trimmed) {
    return ""
  }

  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) {
    return trimmed
  }

  if (trimmed.startsWith("//")) {
    return `https:${trimmed}`
  }

  return `https://${trimmed.replace(/^\/+/, "")}`
}
