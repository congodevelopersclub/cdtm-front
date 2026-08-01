"use client"

import Image from "next/image"
import Link from "next/link"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  CalendarOff,
} from "lucide-react"
import { useTranslations } from "next-intl"

import type { HomeEvent } from "@/shared/config/home-events"

type EventsSectionProps = {
  events?: HomeEvent[]
}

function EmptyState({ message, hint }: { message: string; hint: string }) {
  return (
    <section className="bg-card/50 border-border border-y py-24">
      <div className="page-container text-center">
        <CalendarOff className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
        <p className="text-foreground text-lg font-bold">{message}</p>
        <p className="text-muted-foreground mt-2">{hint}</p>
      </div>
    </section>
  )
}

export function EventsSection({ events = [] }: EventsSectionProps) {
  const t = useTranslations("events")
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000 }),
  ])

  if (events.length === 0) {
    return <EmptyState message={t("no_events")} hint={t("check_back")} />
  }

  const mainEvents = events.slice(0, 2)
  const carouselEvents = events.slice(2)

  return (
    <section className="bg-card/50 border-border border-y py-24">
      <div className="page-container">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <div className="text-primary mb-4 font-mono text-[10px] font-bold tracking-[0.3em] uppercase italic">
              /agenda
            </div>
            <h2 className="text-foreground text-4xl font-black tracking-tighter md:text-5xl">
              {t("title")}
            </h2>
          </div>
          <Link
            href="/events"
            className="text-primary group hidden items-center space-x-2 text-xs font-bold tracking-widest uppercase md:flex"
          >
            <span>{t("view_all")}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {mainEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group border-border bg-background relative overflow-hidden rounded-3xl border"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-brand-orange text-accent-foreground rounded px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
                    {t("category")}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="text-primary mb-3 flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
                  <Calendar className="h-4 w-4" />
                  {event.date}
                </div>
                <h3 className="text-foreground mb-4 text-2xl font-black tracking-tight">
                  {event.title}
                </h3>
                <Link
                  href={`/events/${event.id}`}
                  className="text-primary inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase"
                >
                  {t("register")}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {carouselEvents.length > 0 ? (
          <div>
            <h3 className="text-muted-foreground mb-6 text-xs font-bold tracking-widest uppercase">
              {t("more_events")}
            </h3>
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6">
                {carouselEvents.map((event) => (
                  <div
                    key={event.id}
                    className="border-border bg-background flex-[0_0_85%] overflow-hidden rounded-2xl border sm:flex-[0_0_45%] lg:flex-[0_0_30%]"
                  >
                    <div className="relative h-40 w-full">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 85vw, 30vw"
                      />
                    </div>
                    <div className="p-5">
                      <div className="text-primary mb-2 text-[10px] font-bold tracking-widest uppercase">
                        {event.date}
                      </div>
                      <h4 className="text-foreground mb-3 font-bold">
                        {event.title}
                      </h4>
                      <Link
                        href={`/events/${event.id}`}
                        className="text-primary text-[10px] font-bold tracking-widest uppercase"
                      >
                        {t("register")}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
