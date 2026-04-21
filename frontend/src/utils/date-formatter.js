/**
 * Formats an ISO date string into a human-readable date and time string.
 *
 * @param {string} dateString - The ISO 8601 date string to format
 * @returns {string|null} Formatted date string, or null if input is invalid/missing
 */
export function formatDate(dateString) {
  if (!dateString) return null;
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}
