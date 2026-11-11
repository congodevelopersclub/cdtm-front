"use client"

import type { ComponentProps, ReactNode } from "react"
import { IconCheck, IconLoader2, IconTrash, IconX } from "@tabler/icons-react"

import { Button } from "@workspace/ui/components/button"
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@workspace/ui/components/dialog"
import { cn } from "@workspace/ui/lib/utils"

export const selectControlClassName =
  "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"

export const textareaControlClassName =
  "min-h-24 w-full resize-y rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"

export const mintButtonClassName = ""

export const steelButtonClassName = ""

export const steelOutlineClassName = ""

type ButtonProps = ComponentProps<typeof Button>

export function FormDialogContent({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <DialogContent
      className={cn(
        "flex max-h-[85vh] flex-col gap-4 overflow-hidden sm:max-w-xl",
        className,
      )}
    >
      {children}
    </DialogContent>
  )
}

export function FormDialogHeader({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return <DialogHeader className={cn("shrink-0 pr-8", className)}>{children}</DialogHeader>
}

export function FormDialogBody({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn("flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pb-4", className)}>
      {children}
    </div>
  )
}

export function FormField({
  label,
  htmlFor,
  className,
  children,
}: {
  label: string
  htmlFor: string
  className?: string
  children: ReactNode
}) {
  return (
    <label className={cn("flex flex-col gap-2 text-sm font-medium", className)} htmlFor={htmlFor}>
      <span className="leading-none">{label}</span>
      {children}
    </label>
  )
}

export function FormDialogFooter({ children }: { children: ReactNode }) {
  return <DialogFooter className="shrink-0">{children}</DialogFooter>
}

export function CancelDialogButton({ className, children, ...props }: ButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className={cn(steelOutlineClassName, className)}
      {...props}
    >
      <IconX />
      {children}
    </Button>
  )
}

export function SaveDialogButton({
  pending = false,
  pendingLabel,
  className,
  disabled,
  children,
  ...props
}: ButtonProps & { pending?: boolean; pendingLabel?: ReactNode }) {
  return (
    <Button
      type="submit"
      className={cn(steelButtonClassName, className)}
      disabled={disabled || pending}
      {...props}
    >
      {pending ? <IconLoader2 className="animate-spin" /> : <IconCheck />}
      {pending ? pendingLabel : children}
    </Button>
  )
}

export function DeleteDialogButton({
  pending = false,
  pendingLabel,
  className,
  disabled,
  children,
  ...props
}: ButtonProps & { pending?: boolean; pendingLabel?: ReactNode }) {
  return (
    <Button
      type="button"
      variant="destructive"
      className={className}
      disabled={disabled || pending}
      {...props}
    >
      {pending ? <IconLoader2 className="animate-spin" /> : <IconTrash />}
      {pending ? pendingLabel : children}
    </Button>
  )
}
