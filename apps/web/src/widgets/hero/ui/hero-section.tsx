"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowUpRight,
  Globe,
  MoveRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import { useTranslations } from "next-intl"

import { JOIN_URL } from "@/shared/config/site-links"

const TECHNOLOGIES = [
  "TypeScript",
  "Next.js",
  "React",
  "Node.js",
  "GraphQL",
  "Docker",
  "PostgreSQL",
  "Kubernetes",
  "Framer Motion",
  "Tailwind CSS",
  "Firebase",
  "Python",
]

function CloudSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M17.5 19c2.5 0 4.5-2 4.5-4.5S20 10 17.5 10c-.1 0-.2 0-.3.1C16.4 7.2 13.9 5 11 5 7.7 5 5 7.7 5 11c0 .2 0 .5.1.7C2.8 12.1 1 14.3 1 17c0 3.3 2.7 6 6 6h10.5z" />
    </svg>
  )
}

export function HeroSection() {
  const t = useTranslations("hero")

  const stats = [
    { label: t("stats_developers"), value: "10K+", icon: Globe },
    { label: t("stats_projects"), value: "250+", icon: ShieldCheck },
    { label: t("stats_events"), value: "40+", icon: Sparkles },
  ]

  return (
    <section className="border-border bg-background relative min-h-screen overflow-hidden border-b">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgb(60_126_169/0.12),transparent_45%)]" />

      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="bg-brand-steel-blue/20 absolute top-[-15%] left-[-10%] h-180 w-180 rounded-full blur-[140px]" />
      <div className="bg-brand-mint/10 absolute right-[-10%] bottom-[-20%] h-160 w-160 rounded-full blur-[140px]" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ y: [0, -25, 0], x: [0, 25, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[8%] left-[3%] text-white/60 dark:text-white/3"
        >
          <CloudSVG className="w-88 blur-sm" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 35, 0], x: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[18%] right-[5%] text-white dark:text-white/3"
        >
          <CloudSVG className="w-120" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0], x: [0, 12, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/40 dark:text-primary/5 absolute bottom-[10%] left-[18%]"
        >
          <CloudSVG className="w-64 blur-[2px]" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/20 dark:text-primary/3 absolute right-[20%] bottom-[20%]"
        >
          <CloudSVG className="w-44 blur-sm" />
        </motion.div>
      </div>

      <div className="page-container relative z-10 pt-36 pb-24">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="border-primary/20 bg-background/70 mb-8 inline-flex items-center gap-3 rounded-full border px-5 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur-xl">
              <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                <Sparkles className="text-primary h-4 w-4" />
              </div>
              <span className="text-primary text-[10px] font-black tracking-[0.3em] uppercase md:text-xs">
                {t("badge")}
              </span>
            </div>

            <h1 className="text-foreground text-5xl leading-[0.88] font-black tracking-[-0.06em] md:text-7xl lg:text-[7rem]">
              <span className="block">{t("title_1")}</span>
              <span className="from-brand-steel-blue via-brand-mint to-brand-orange block bg-linear-to-r bg-clip-text text-transparent">
                {t("title_2")}
              </span>
            </h1>

            <p className="text-muted-foreground mt-8 max-w-2xl text-lg leading-relaxed font-medium md:text-xl">
              {t("description")}
            </p>

            <div className="mt-10 flex flex-wrap gap-5">
              {stats.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="group border-border bg-card/70 min-w-37.5 rounded-2xl border px-5 py-4 backdrop-blur-xl transition-all hover:border-primary/40"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <item.icon className="text-primary h-4 w-4" />
                    <ArrowUpRight className="text-muted-foreground group-hover:text-primary h-4 w-4 transition-colors" />
                  </div>
                  <div className="text-foreground text-2xl font-black">
                    {item.value}
                  </div>
                  <div className="text-muted-foreground mt-1 text-xs tracking-[0.2em] uppercase">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 flex flex-col gap-5 sm:flex-row">
              <a
                href={JOIN_URL}
                className="group bg-primary text-primary-foreground inline-flex items-center justify-center gap-3 rounded-2xl px-8 py-5 text-xs font-black tracking-[0.2em] uppercase shadow-primary-md transition-all hover:scale-[1.02]"
              >
                <span>{t("cta_join")}</span>
                <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                href="/events"
                className="border-border bg-background/60 inline-flex items-center justify-center rounded-2xl border px-8 py-5 text-xs font-black tracking-[0.2em] uppercase backdrop-blur-xl transition-all hover:border-primary hover:text-primary"
              >
                {t("cta_actions")}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:col-span-5 lg:block"
          >
            <div className="relative">
              <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/60 shadow-[0_25px_80px_rgba(0,0,0,0.12)] backdrop-blur-2xl dark:bg-white/3">
                <div className="from-primary/10 absolute inset-0 bg-linear-to-br via-transparent to-transparent" />
                <div className="border-border flex items-center justify-between border-b px-8 py-6">
                  <div>
                    <div className="text-primary text-xs font-black tracking-[0.3em] uppercase">
                      {t("ecosystem_title")}
                    </div>
                    <div className="text-muted-foreground mt-2 text-sm">
                      {t("ecosystem_description")}
                    </div>
                  </div>
                  <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-2xl">
                    <Sparkles className="text-primary h-5 w-5" />
                  </div>
                </div>
                <div className="relative h-125 overflow-hidden px-8 py-8">
                  <motion.div
                    className="flex flex-col gap-5"
                    animate={{ y: ["0%", "-50%"] }}
                    transition={{
                      duration: 22,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                  >
                    {[...TECHNOLOGIES, ...TECHNOLOGIES].map((tech, index) => (
                      <div
                        key={`${tech}-${index}`}
                        className="group border-border bg-background/40 hover:bg-primary/3 flex items-center justify-between rounded-2xl border px-5 py-4 transition-all hover:border-primary/40"
                      >
                        <span className="text-foreground font-mono text-sm font-bold tracking-[0.25em] uppercase">
                          {tech}
                        </span>
                        <div className="bg-brand-steel-blue h-2 w-2 rounded-full shadow-primary-glow" />
                      </div>
                    ))}
                  </motion.div>
                  <div className="from-background pointer-events-none absolute top-0 right-0 left-0 h-24 bg-linear-to-b to-transparent" />
                  <div className="from-background pointer-events-none absolute right-0 bottom-0 left-0 h-24 bg-linear-to-t to-transparent" />
                </div>
              </div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="border-border bg-card/80 absolute -bottom-8 -left-8 rounded-3xl border p-6 shadow-2xl backdrop-blur-2xl"
              >
                <div className="text-foreground text-3xl font-black">+98%</div>
                <div className="text-muted-foreground mt-2 text-xs tracking-[0.2em] uppercase">
                  {t("growth")}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
