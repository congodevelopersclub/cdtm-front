"use client"

import { useMemo } from "react"
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"

import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form"
import { Input } from "@workspace/ui/components/input"

import { useLogin } from "../hooks/use-login"
import { createLoginSchema, type LoginFormValues } from "../validation"

export function LoginForm() {
  const t = useTranslations("Login")
  const tValidation = useTranslations("Validation")
  const { mutate, isPending } = useLogin()

  const schema = useMemo(
    () => createLoginSchema((key) => tValidation(key)),
    [tValidation]
  )

  const form = useForm<LoginFormValues>({
    resolver: standardSchemaResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: LoginFormValues) {
    mutate(values)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("emailLabel")}</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="email"
                      placeholder={t("emailPlaceholder")}
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("passwordLabel")}</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="current-password"
                      placeholder={t("passwordPlaceholder")}
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" disabled={isPending} type="submit">
              {isPending ? t("submitting") : t("submit")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
