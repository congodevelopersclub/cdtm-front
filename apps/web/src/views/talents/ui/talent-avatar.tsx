"use client"

import { useState } from "react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

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
  const [useFallback, setUseFallback] = useState(false)
  const imageSrc = useFallback ? undefined : avatar

  return (
    <Avatar className={className}>
      {imageSrc ? (
        <AvatarImage
          src={imageSrc}
          alt={name}
          onError={() => setUseFallback(true)}
        />
      ) : null}
      <AvatarFallback className={fallbackClassName}>
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  )
}
