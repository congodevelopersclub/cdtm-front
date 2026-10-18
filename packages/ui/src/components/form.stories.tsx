"use client"

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "./button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form"
import { Input } from "./input"

const schema = z.object({
  email: z.email("Enter a valid email address"),
})

type FormValues = z.infer<typeof schema>

function DemoForm() {
  const form = useForm<FormValues>({
    resolver: standardSchemaResolver(schema),
    defaultValues: { email: "" },
  })

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-sm gap-4"
        onSubmit={form.handleSubmit(() => undefined)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

const meta = {
  title: "Design System/Form",
  component: DemoForm,
  tags: ["autodocs"],
} satisfies Meta<typeof DemoForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <DemoForm />,
}
