"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import { useTranslations } from "next-intl"

import { LOGIN_SLIDES } from "../config/login-slides"

export function LoginMarketingPanel() {
  const t = useTranslations("Login")
  const [selectedIndex, setSelectedIndex] = useState(0)

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true }),
  ])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)

    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, onSelect])

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index)
    },
    [emblaApi],
  )

  const activeSlide = LOGIN_SLIDES[selectedIndex] ?? LOGIN_SLIDES[0]

  return (
    <div
      aria-roledescription="carousel"
      className="relative hidden h-full min-h-0 overflow-hidden lg:flex"
    >
      <div className="absolute inset-0" ref={emblaRef}>
        <div className="flex h-full">
          {LOGIN_SLIDES.map((slide, index) => (
            <div
              key={slide.image}
              aria-hidden={index !== selectedIndex}
              className="relative h-full min-w-0 flex-[0_0_100%]"
            >
              <Image
                src={slide.image}
                alt=""
                fill
                priority={index === 0}
                sizes="50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/80 via-black/40 to-black/80"
      />

      <div className="relative z-10 flex h-full min-h-0 w-full flex-col justify-between p-8 xl:p-12">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center overflow-hidden">
            <Image
              src="/images/logo.svg"
              alt=""
              width={32}
              height={32}
              className="size-full object-contain"
              priority
            />
          </div>
          <span className="text-sm font-semibold text-white">{t("platformName")}</span>
        </div>

        <div className="space-y-6">
          <div className="flex gap-2" role="tablist" aria-label={t("platformName")}>
            {LOGIN_SLIDES.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                role="tab"
                aria-selected={index === selectedIndex}
                aria-label={t("goToSlide", { number: index + 1 })}
                onClick={() => scrollTo(index)}
                className={`h-1 rounded-full transition-all ${index === selectedIndex ? "w-8 bg-white" : "w-4 bg-white/40 hover:bg-white/60"
                  }`}
              />
            ))}
          </div>

          <div aria-live="polite" className="max-w-lg space-y-3">
            <h2 className="text-3xl leading-tight font-semibold tracking-tight text-white xl:text-4xl">
              {t(activeSlide.titleKey)}
            </h2>
            <p className="text-base leading-relaxed text-white/80">{t(activeSlide.subtitleKey)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
