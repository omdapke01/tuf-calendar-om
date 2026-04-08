"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import CalendarGrid from "@/components/CalendarGrid";
import HeroImagePanel from "@/components/HeroImagePanel";
import NoteModal from "@/components/NoteModal";
import NotesSection from "@/components/NotesSection";
import { useDateRange } from "@/hooks/useDateRange";
import { useNotes } from "@/hooks/useNotes";
import { getHeroForMonth } from "@/lib/hero";
import { getRangeKey, shiftMonth } from "@/lib/date";

export default function CalendarApp() {
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [direction, setDirection] = useState(1);
  const [isLightMode, setIsLightMode] = useState(false);
  const range = useDateRange();
  const notes = useNotes();
  const hero = useMemo(() => getHeroForMonth(currentMonth), [currentMonth]);

  const selectedRangeKey = range.selectedRangeKey || getRangeKey(range.selectedStartDate, range.selectedEndDate);
  const activeNote = range.modalRangeKey ? notes.notes[range.modalRangeKey] || "" : "";

  function moveMonth(offset) {
    setDirection(offset);
    setCurrentMonth((month) => shiftMonth(month, offset));
  }

  function goToToday() {
    const today = new Date();
    setDirection(today > currentMonth ? 1 : -1);
    setCurrentMonth(today);
  }

  function focusDate(date) {
    setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
  }

  const themeStyle = {
    "--accent": hero.accent,
    "--accent-soft": hero.accentSoft,
    "--hero-image": `url("${hero.image}")`
  };

  return (
    <main
      style={themeStyle}
      className={isLightMode ? "min-h-screen bg-stone-100 text-stone-950" : "min-h-screen bg-neutral-950 text-white"}
    >
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-12%] top-[-18%] h-[38rem] w-[38rem] rounded-full bg-[var(--accent-soft)] blur-3xl" />
        <div className="absolute bottom-[-24%] right-[-12%] h-[34rem] w-[34rem] rounded-full bg-black/30 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_42%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-5 px-4 py-4 sm:px-6 lg:px-8 lg:py-7">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent)]">Luma Calendar</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Shape your time with a lighter touch.</h1>
          </div>
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsLightMode((value) => !value)}
            className="inline-flex items-center gap-2 rounded-lg border border-white/[0.12] bg-white/10 px-4 py-2 text-sm font-medium text-current shadow-soft backdrop-blur-xl transition hover:bg-white/[0.15]"
          >
            {isLightMode ? <Moon size={16} /> : <Sun size={16} />}
            {isLightMode ? "Dark" : "Light"}
          </motion.button>
        </header>

        <section className="grid flex-1 gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <HeroImagePanel hero={hero} selectedStartDate={range.selectedStartDate} selectedEndDate={range.selectedEndDate} />
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${currentMonth.getFullYear()}-${currentMonth.getMonth()}`}
              custom={direction}
              initial={{ opacity: 0, x: direction * 34, rotateY: direction * -4 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: direction * -34, rotateY: direction * 4 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="min-w-0 [transform-style:preserve-3d]"
            >
              <CalendarGrid
                currentMonth={currentMonth}
                range={range}
                noteKeys={notes.noteKeys}
                onPreviousMonth={() => moveMonth(-1)}
                onNextMonth={() => moveMonth(1)}
                onToday={goToToday}
                onFocusDate={focusDate}
              />
            </motion.div>
          </AnimatePresence>
        </section>

        <NotesSection
          selectedRangeKey={selectedRangeKey}
          selectedStartDate={range.selectedStartDate}
          selectedEndDate={range.selectedEndDate}
          notes={notes.notes}
          onOpenSelected={range.openSelectedRange}
          onOpenRange={range.setModalRangeKey}
        />
      </div>

      <NoteModal
        rangeKey={range.modalRangeKey}
        value={activeNote}
        onClose={() => range.setModalRangeKey(null)}
        onSave={notes.saveNote}
        onDelete={notes.deleteNote}
      />
    </main>
  );
}
