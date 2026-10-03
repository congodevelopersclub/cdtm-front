"use client"

import { useState } from "react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"

import { getInitials } from "../lib/get-initials"

const LOGO_FALLBACK = "/images/logo.svg"

type TalentAvatarProps = {
  name: string
  avatar?: string
  className?: string
  fallbackClassName?: string
}

export function TalentAvatar({
  name,
  avatar,
  className,
  fallbackClassName,
}: TalentAvatarProps) {
  const [useLogoFallback, setUseLogoFallback] = useState(false)
  const imageSrc = useLogoFallback ? LOGO_FALLBACK : avatar

  return (
    <Avatar className={className}>
      {imageSrc ? (
        <AvatarImage
          src={imageSrc}
          alt={name}
          onError={() => setUseLogoFallback(true)}
        />
      ) : null}
      <AvatarFallback className={fallbackClassName}>{getInitials(name)}</AvatarFallback>
    </Avatar>
  )
}
