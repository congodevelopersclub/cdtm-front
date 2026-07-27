import Image from "next/image"

import { cn } from "@workspace/ui/lib/utils"

type CdcLogoProps = {
  size?: number
  className?: string
  priority?: boolean
}

export function CdcLogo({ size = 40, className, priority = false }: CdcLogoProps) {
  return (
    <Image
      alt="Congo Developers Club"
      className={cn("shrink-0", className)}
      height={size}
      priority={priority}
      src="/images/logo.svg"
      width={size}
    />
  )
}
