"use client";

import { motion } from "framer-motion";
import { NotebookPen, Plus } from "lucide-react";
import { formatRange, parseRangeKey } from "@/lib/date";

export default function NotesSection({ selectedRangeKey, selectedStartDate, selectedEndDate, notes, onOpenSelected, onOpenRange }) {
  const savedNotes = Object.entries(notes).filter(([, note]) => note?.trim());
  const selectedNote = selectedRangeKey ? notes[selectedRangeKey] : "";

  return (
    <section className="rounded-2xl border border-white/[0.12] bg-white/10 p-4 shadow-premium backdrop-blur-2xl sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">Notes</p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight">Plans for {formatRange(selectedStartDate, selectedEndDate)}</h2>
        </div>
        <motion.button
          type="button"
          whileHover={{ scale: selectedStartDate ? 1.03 : 1 }}
          whileTap={{ scale: selectedStartDate ? 0.97 : 1 }}
          disabled={!selectedStartDate}
          onClick={onOpenSelected}
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-neutral-950 shadow-soft transition disabled:cursor-not-allowed disabled:bg-white/[0.12] disabled:text-white/[0.35]"
        >
          <Plus size={16} />
          {selectedNote ? "Edit note" : "Add note"}
        </motion.button>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_1.2fr]">
        <div className="rounded-xl border border-white/10 bg-black/[0.18] p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white/[0.78]">
            <NotebookPen size={16} />
            Active range
          </div>
          {selectedStartDate ? (
            <p className="min-h-16 text-sm leading-6 text-white/[0.64]">
              {selectedNote?.trim() || "No plans yet. Select a date to start ✨"}
            </p>
          ) : (
            <p className="min-h-16 text-sm leading-6 text-white/[0.48]">No plans yet. Select a date to start ✨</p>
          )}
        </div>

        <div className="rounded-xl border border-white/10 bg-black/[0.18] p-4">
          <p className="mb-3 text-sm font-medium text-white/[0.78]">Saved notes</p>
          {savedNotes.length ? (
            <div className="grid gap-2 sm:grid-cols-2">
              {savedNotes.map(([rangeKey, note]) => {
                const range = parseRangeKey(rangeKey);
                return (
                  <button
                    key={rangeKey}
                    type="button"
                    onClick={() => onOpenRange(rangeKey)}
                    className="rounded-lg border border-white/10 bg-white/[0.06] p-3 text-left transition hover:border-[color:var(--accent)] hover:bg-white/[0.1]"
                  >
                    <p className="text-xs font-semibold text-[var(--accent)]">{formatRange(range.startKey, range.endKey)}</p>
                    <p className="mt-2 line-clamp-2 text-sm leading-5 text-white/[0.62]">{note}</p>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex min-h-24 items-center rounded-lg border border-dashed border-white/[0.14] px-4 text-sm text-white/[0.46]">
              No saved notes yet. Your selected dates will stay here after you add a plan.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
