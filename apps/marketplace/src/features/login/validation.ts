import { z } from "zod"

export function createLoginSchema(t: (key: string) => string) {
  return z.object({
    email: z.email(t("invalidEmail")),
    password: z.string().min(8, t("passwordMin")),
  })
}

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>
