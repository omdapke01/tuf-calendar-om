"use client";

import { motion } from "framer-motion";
import { CalendarDays, Sparkles } from "lucide-react";
import { formatRange } from "@/lib/date";

export default function HeroImagePanel({ hero, selectedStartDate, selectedEndDate }) {
  return (
    <motion.aside
      layout
      className="relative min-h-[26rem] overflow-hidden rounded-2xl border border-white/[0.12] bg-white/10 shadow-premium backdrop-blur-xl lg:min-h-full"
    >
      <motion.div
        key={hero.image}
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-[image:var(--hero-image)] bg-cover bg-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/[0.18] via-black/[0.28] to-black/[0.78]" />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, ease: "easeOut" }}
          className="max-w-md"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.18] bg-black/25 px-3 py-1.5 text-xs font-medium text-white/[0.85] backdrop-blur-xl">
            <Sparkles size={14} />
            Adaptive palette
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{hero.title}</h2>
          <p className="mt-3 text-base leading-7 text-white/[0.76]">{hero.caption}</p>
          <div className="mt-6 rounded-xl border border-white/[0.14] bg-white/[0.12] p-4 text-white shadow-soft backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)] text-neutral-950">
                <CalendarDays size={18} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/[0.55]">Selected window</p>
                <p className="mt-1 text-sm font-medium">{formatRange(selectedStartDate, selectedEndDate)}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.aside>
  );
}
