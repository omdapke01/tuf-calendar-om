"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import DayCell from "@/components/DayCell";
import { getMonthTitle, getVisibleMonthDays, isWithinRange, parseRangeKey, toDateKey, weekdayLabels } from "@/lib/date";

export default function CalendarGrid({ currentMonth, range, noteKeys, onPreviousMonth, onNextMonth, onToday }) {
  const days = getVisibleMonthDays(currentMonth);
  const todayKey = toDateKey(new Date());

  function hasNoteForDay(dateKey) {
    for (const rangeKey of noteKeys) {
      const noteRange = parseRangeKey(rangeKey);
      if (isWithinRange(dateKey, noteRange.startKey, noteRange.endKey)) return true;
    }
    return false;
  }

  return (
    <section className="h-full rounded-2xl border border-white/[0.12] bg-neutral-900/[0.72] p-4 shadow-premium backdrop-blur-2xl sm:p-5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/[0.45]">Month view</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white">{getMonthTitle(currentMonth)}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToday}
            className="rounded-lg border border-white/[0.12] bg-white/[0.08] px-3 py-2 text-sm font-medium text-white/[0.82] transition hover:bg-white/[0.14]"
          >
            Today
          </button>
          <button
            type="button"
            aria-label="Previous month"
            onClick={onPreviousMonth}
            className="rounded-lg border border-white/[0.12] bg-white/[0.08] p-2 text-white/[0.82] transition hover:bg-white/[0.14]"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next month"
            onClick={onNextMonth}
            className="rounded-lg border border-white/[0.12] bg-white/[0.08] p-2 text-white/[0.82] transition hover:bg-white/[0.14]"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {weekdayLabels.map((label) => (
          <div key={label} className="pb-2 text-center text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/[0.38]">
            {label}
          </div>
        ))}

        {days.map((day) => {
          const isInRange = isWithinRange(day.key, range.selectedStartDate, range.displayEndDate);
          return (
            <DayCell
              key={day.key}
              day={day}
              isToday={day.key === todayKey}
              isStart={day.key === range.selectedStartDate}
              isEnd={day.key === range.selectedEndDate}
              isInRange={isInRange}
              hasNote={hasNoteForDay(day.key)}
              onClick={() => range.selectOrOpen(day.key)}
              onMouseEnter={() => range.setHoveredDate(day.key)}
              onMouseLeave={() => range.setHoveredDate(null)}
            />
          );
        })}
      </div>
    </section>
  );
}
