"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import { useTranslations } from "next-intl"

type TestimonialItem = {
  name: string
  role: string
  quote: string
}

export function TestimonialsSection() {
  const t = useTranslations("testimonials")
  const items = t.raw("items") as TestimonialItem[]

  return (
    <section className="bg-background border-border border-t py-24">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-16">
          <div className="text-primary mb-4 font-mono text-[10px] font-bold tracking-[0.3em] uppercase italic">
            /testimonials
          </div>
          <h2 className="text-foreground text-4xl font-black tracking-tighter md:text-5xl">
            {t("title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {items.map((item, index) => (
            <motion.div
              key={`${item.name}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border-border bg-card/50 rounded-3xl border p-8"
            >
              <Quote className="text-primary mb-6 h-8 w-8 opacity-50" />
              <p className="text-foreground mb-8 text-lg leading-relaxed italic">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full text-lg font-black">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-foreground font-bold">{item.name}</h4>
                  <p className="text-muted-foreground text-sm">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
