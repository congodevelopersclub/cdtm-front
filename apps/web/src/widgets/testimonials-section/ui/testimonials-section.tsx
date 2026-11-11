"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import { useTranslations } from "next-intl"

type TestimonialItem = {
  name: string
  role: string
  quote: string
  image: string
}

export function TestimonialsSection() {
  const t = useTranslations("testimonials")

  // Read the localized testimonial collection while keeping the item shape explicit.
  const items = t.raw("items") as TestimonialItem[]

  return (
    // Testimonials section with a responsive three-column layout.
    <section className="bg-background py-24">
      <div className="page-container">
        {/* Section label and localized heading. */}
        <div className="mb-16">
          <div className="text-primary mb-4 font-mono text-[10px] font-bold tracking-[0.3em] uppercase italic">
            /testimonials
          </div>
          <h2 className="text-foreground text-4xl font-black tracking-tighter md:text-5xl">
            {t("title")}
          </h2>
        </div>

        {/* Animated testimonial cards. */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {items.map((item, index) => (
            // Reveal each card with a small staggered delay.
            <motion.div
              key={`${item.name}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border-border bg-card/50 rounded-3xl border p-8"
            >
              {/* Quotation and testimonial text. */}
              <Quote className="text-primary mb-6 h-8 w-8 opacity-50" />
              <p className="text-foreground mb-8 text-lg leading-relaxed italic">
                &ldquo;{item.quote}&rdquo;
              </p>

              {/* Contributor identity and role. */}
              <div className="flex items-center gap-4">
                <div className="size-16 rounded-full bg-primary/10 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
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
