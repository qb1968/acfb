export function formatTime(time) {
  if (!time) return "";

  // Already formatted
  if (time.includes("AM") || time.includes("PM")) {
    return time;
  }

  const [hour, minute] = time.split(":");

  const date = new Date();

  date.setHours(hour);
  date.setMinutes(minute);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatTimeRange(start, end) {
  if (!start) return "";

  if (!end) {
    return formatTime(start);
  }

  return `${formatTime(start)} - ${formatTime(end)}`;
}
