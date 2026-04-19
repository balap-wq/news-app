/**
 * Removes the NewsAPI truncation suffix (e.g. "[+2847 chars]") from content.
 *
 * @param {string} content - Raw article content from NewsAPI
 * @returns {string} Clean content without the truncation suffix
 */
export function stripNewsSuffix(content) {
  return content.replace(/\s*\[\+\d+ chars\]$/, '');
}
