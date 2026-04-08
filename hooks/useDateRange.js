"use client";

import { useMemo, useState } from "react";
import { getRangeKey, isWithinRange } from "@/lib/date";

export function useDateRange() {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [modalRangeKey, setModalRangeKey] = useState(null);

  const displayEndDate = selectedEndDate || hoveredDate || selectedStartDate;
  const selectedRangeKey = useMemo(
    () => getRangeKey(selectedStartDate, selectedEndDate),
    [selectedStartDate, selectedEndDate]
  );

  function selectDate(dateKey) {
    if (!selectedStartDate || selectedEndDate) {
      setSelectedStartDate(dateKey);
      setSelectedEndDate(null);
      setHoveredDate(null);
      setModalRangeKey(null);
      return;
    }

    if (dateKey < selectedStartDate) {
      setSelectedEndDate(selectedStartDate);
      setSelectedStartDate(dateKey);
      setModalRangeKey(getRangeKey(dateKey, selectedStartDate));
      return;
    }

    setSelectedEndDate(dateKey);
    setModalRangeKey(getRangeKey(selectedStartDate, dateKey));
  }

  function selectOrOpen(dateKey) {
    if (selectedStartDate && selectedEndDate && isWithinRange(dateKey, selectedStartDate, selectedEndDate)) {
      setModalRangeKey(getRangeKey(selectedStartDate, selectedEndDate));
      return;
    }

    selectDate(dateKey);
  }

  function openSelectedRange() {
    if (selectedStartDate) {
      setModalRangeKey(getRangeKey(selectedStartDate, selectedEndDate));
    }
  }

  return {
    selectedStartDate,
    selectedEndDate,
    hoveredDate,
    displayEndDate,
    selectedRangeKey,
    modalRangeKey,
    setHoveredDate,
    setModalRangeKey,
    selectDate,
    selectOrOpen,
    openSelectedRange
  };
}
