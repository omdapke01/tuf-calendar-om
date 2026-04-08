const DAY_MS = 24 * 60 * 60 * 1000;

export const weekdayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const monthLabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function toDateKey(date) {
  const safeDate = startOfDay(date);
  const year = safeDate.getFullYear();
  const month = String(safeDate.getMonth() + 1).padStart(2, "0");
  const day = String(safeDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function fromDateKey(key) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatDisplayDate(key) {
  if (!key) return "";
  const date = fromDateKey(key);
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

export function formatRange(startKey, endKey) {
  if (!startKey) return "Select a date";
  if (!endKey || startKey === endKey) return formatDisplayDate(startKey);
  return `${formatDisplayDate(startKey)} - ${formatDisplayDate(endKey)}`;
}

export function getRangeKey(startKey, endKey) {
  if (!startKey) return "";
  const safeEnd = endKey || startKey;
  return startKey <= safeEnd ? `${startKey}__${safeEnd}` : `${safeEnd}__${startKey}`;
}

export function parseRangeKey(rangeKey) {
  const [startKey, endKey] = rangeKey.split("__");
  return { startKey, endKey: endKey || startKey };
}

export function isSameDay(a, b) {
  return toDateKey(a) === toDateKey(b);
}

export function isWeekend(date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

export function isWithinRange(dateKey, startKey, endKey) {
  if (!dateKey || !startKey) return false;
  const safeEnd = endKey || startKey;
  const low = startKey <= safeEnd ? startKey : safeEnd;
  const high = startKey <= safeEnd ? safeEnd : startKey;
  return dateKey >= low && dateKey <= high;
}

export function getVisibleMonthDays(monthDate) {
  const firstOfMonth = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const lastOfMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);
  const mondayOffset = (firstOfMonth.getDay() + 6) % 7;
  const start = new Date(firstOfMonth);
  start.setDate(firstOfMonth.getDate() - mondayOffset);

  const days = [];
  const totalCells = Math.ceil((mondayOffset + lastOfMonth.getDate()) / 7) * 7;

  for (let index = 0; index < totalCells; index += 1) {
    const date = new Date(start.getTime() + index * DAY_MS);
    days.push({
      date,
      key: toDateKey(date),
      isCurrentMonth: date.getMonth() === monthDate.getMonth()
    });
  }

  return days;
}

export function shiftMonth(date, offset) {
  return new Date(date.getFullYear(), date.getMonth() + offset, 1);
}

export function getMonthTitle(date) {
  return `${monthLabels[date.getMonth()]} ${date.getFullYear()}`;
}
