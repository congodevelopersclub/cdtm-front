import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Button } from "./button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"

const meta = {
  title: "Design System/Card",
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardDescription>Card description for supporting text.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here.</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Continue</Button>
      </CardFooter>
    </Card>
  ),
}

export const Small: Story = {
  render: () => (
    <Card className="w-full max-w-sm" size="sm">
      <CardHeader>
        <CardTitle>Small card</CardTitle>
        <CardDescription>Compact spacing variant.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Smaller card padding.</p>
      </CardContent>
    </Card>
  ),
}
