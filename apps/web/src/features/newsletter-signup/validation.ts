import { z } from "zod"

export function createNewsletterSchema(t: (key: string) => string) {
  return z.object({
    email: z.email(t("invalidEmail")),
  })
}

export type NewsletterFormValues = z.infer<
  ReturnType<typeof createNewsletterSchema>
>
