"use client";

import { motion } from "framer-motion";
import { formatAriaDate, isWeekend } from "@/lib/date";

export default function DayCell({
  day,
  isToday,
  isStart,
  isEnd,
  isInRange,
  hasNote,
  isFocused,
  onClick,
  onFocus,
  onMouseEnter,
  onMouseLeave
}) {
  const isBoundary = isStart || isEnd;
  const weekend = isWeekend(day.date);
  const ariaParts = [formatAriaDate(day.key)];

  if (isToday) ariaParts.push("today");
  if (isStart && isEnd) ariaParts.push("selected date");
  else if (isStart) ariaParts.push("range start");
  else if (isEnd) ariaParts.push("range end");
  else if (isInRange) ariaParts.push("within selected range");
  if (hasNote) ariaParts.push("has note");

  return (
    <motion.button
      type="button"
      layout
      whileHover={{ y: -2, scale: 1.015 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      onFocus={onFocus}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label={ariaParts.join(", ")}
      aria-pressed={isInRange}
      tabIndex={isFocused ? 0 : -1}
      className={[
        "group relative min-h-[4.75rem] overflow-hidden rounded-xl border p-2 text-left transition focus-visible:outline-none sm:min-h-20",
        day.isCurrentMonth ? "border-white/[0.08] bg-white/[0.045] text-white" : "border-white/5 bg-white/[0.025] text-white/[0.28]",
        weekend && day.isCurrentMonth ? "bg-white/[0.07]" : "",
        isToday ? "ring-1 ring-[var(--accent)]" : "",
        isFocused ? "ring-2 ring-white/50 ring-offset-2 ring-offset-neutral-950" : "",
        isInRange && !isBoundary ? "border-[color:var(--accent)]/30" : "",
        isBoundary ? "border-[color:var(--accent)] text-neutral-950" : "hover:border-white/[0.18] hover:bg-white/[0.085]"
      ].join(" ")}
    >
      {isInRange && (
        <motion.span
          layoutId={`range-${day.key}`}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className={[
            "absolute inset-0",
            isBoundary ? "bg-[var(--accent)]" : "bg-[var(--accent-soft)]"
          ].join(" ")}
        />
      )}

      <span className="relative z-10 flex h-full flex-col justify-between">
        <span className="flex items-start justify-between">
          <span className={isBoundary ? "font-semibold text-neutral-950" : "font-medium"}>{day.date.getDate()}</span>
          {isToday && <span className={isBoundary ? "text-[0.62rem] font-semibold text-neutral-950/[0.65]" : "text-[0.62rem] font-semibold text-[var(--accent)]"}>Today</span>}
        </span>
        <span className="flex items-center justify-between">
          {weekend && day.isCurrentMonth ? (
            <span className={isBoundary ? "hidden text-[0.62rem] font-medium text-neutral-950/[0.58] sm:block" : "hidden text-[0.62rem] font-medium text-white/[0.32] sm:block"}>
              Weekend
            </span>
          ) : (
            <span />
          )}
          {hasNote && <span className={isBoundary ? "h-1.5 w-1.5 rounded-full bg-neutral-950/[0.7]" : "h-1.5 w-1.5 rounded-full bg-[var(--accent)]"} />}
        </span>
      </span>
    </motion.button>
  );
}
