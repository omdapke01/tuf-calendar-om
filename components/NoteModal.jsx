"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Trash2, X } from "lucide-react";
import { formatRange, parseRangeKey } from "@/lib/date";

export default function NoteModal({ rangeKey, value, onClose, onSave, onDelete }) {
  const [draft, setDraft] = useState(value || "");
  const isOpen = Boolean(rangeKey);
  const range = rangeKey ? parseRangeKey(rangeKey) : null;

  useEffect(() => {
    setDraft(value || "");
  }, [value, rangeKey]);

  function saveNote() {
    if (!rangeKey) return;
    onSave(rangeKey, draft.trim());
    onClose();
  }

  function deleteNote() {
    if (!rangeKey) return;
    onDelete(rangeKey);
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/[0.62] px-4 py-6 backdrop-blur-xl"
          onMouseDown={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-xl rounded-2xl border border-white/[0.14] bg-neutral-950/[0.92] p-5 text-white shadow-premium backdrop-blur-2xl"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">Calendar note</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">{range ? formatRange(range.startKey, range.endKey) : ""}</h2>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="rounded-lg border border-white/[0.12] bg-white/[0.06] p-2 text-white/70 transition hover:bg-white/[0.12] hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <label className="mt-5 block">
              <span className="text-sm font-medium text-white/[0.72]">What should this time hold?</span>
              <textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                autoFocus
                rows={7}
                placeholder="Write the plan, reminder, ritual, or tiny next step..."
                className="mt-3 w-full resize-none rounded-xl border border-white/[0.12] bg-white/[0.06] p-4 text-sm leading-6 text-white outline-none transition placeholder:text-white/[0.28] focus:border-[color:var(--accent)] focus:bg-white/[0.09]"
              />
            </label>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={deleteNote}
                className="inline-flex items-center gap-2 rounded-lg border border-white/[0.12] bg-white/[0.06] px-4 py-2 text-sm font-medium text-white/70 transition hover:border-rose-300/50 hover:bg-rose-500/10 hover:text-rose-100"
              >
                <Trash2 size={16} />
                Delete
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-white/[0.12] bg-white/[0.06] px-4 py-2 text-sm font-medium text-white/[0.72] transition hover:bg-white/[0.12] hover:text-white"
                >
                  Cancel
                </button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={saveNote}
                  className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-neutral-950 shadow-soft"
                >
                  Save note
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
