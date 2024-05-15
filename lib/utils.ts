import { clsx, type ClassValue } from "clsx";
import { DateTime } from "luxon";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTimeRelativeToNow(dateTime: DateTime) {
  const now = DateTime.local();
  const diff = now.diff(dateTime, ["days", "hours", "minutes", "seconds"]);
  if (diff.days >= 1) {
    return dateTime.toLocaleString(DateTime.DATETIME_SHORT);
  } else if (diff.hours >= 1) {
    const hours = Math.floor(diff.hours);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (diff.minutes >= 1) {
    const minutes = Math.floor(diff.minutes);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diff.minutes >= 1) {
    const seconds = Math.floor(diff.seconds);
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  } else {
    return "just now";
  }
}
