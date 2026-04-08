"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "luma-calendar-notes";

export function useNotes() {
  const [notes, setNotes] = useState({});
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setNotes(JSON.parse(stored));
    } catch {
      setNotes({});
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
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
