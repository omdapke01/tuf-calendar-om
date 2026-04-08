"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "luma-calendar-notes";
const STORAGE_VERSION = 1;
const RANGE_KEY_PATTERN = /^\d{4}-\d{2}-\d{2}__\d{4}-\d{2}-\d{2}$/;

function sanitizeNotesRecord(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  return Object.fromEntries(
    Object.entries(value).filter(([key, note]) => RANGE_KEY_PATTERN.test(key) && typeof note === "string")
  );
}

export function useNotes() {
  const [notes, setNotes] = useState({});
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const safeNotes = parsed?.version === STORAGE_VERSION
          ? sanitizeNotesRecord(parsed.notes)
          : sanitizeNotesRecord(parsed);
        setNotes(safeNotes);
      }
    } catch {
      setNotes({});
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ version: STORAGE_VERSION, notes: sanitizeNotesRecord(notes) })
      );
    } catch {
      // Ignore storage write failures so the UI remains usable.
    }
  }, [isHydrated, notes]);

  const noteKeys = useMemo(
    () => new Set(Object.keys(notes).filter((key) => notes[key]?.trim())),
    [notes]
  );

  function saveNote(rangeKey, note) {
    setNotes((current) => ({
      ...current,
      [rangeKey]: note
    }));
  }

  function deleteNote(rangeKey) {
    setNotes((current) => {
      const next = { ...current };
      delete next[rangeKey];
      return next;
    });
  }

  return { notes, noteKeys, saveNote, deleteNote };
}
