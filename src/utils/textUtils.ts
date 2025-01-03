/**
 * Truncates text to a specified length while preserving word boundaries
 * @param text The text to truncate
 * @param maxLength Maximum length of the resulting string
 * @returns Truncated text with ellipsis if needed
 */
export function truncateSummary(text: string, maxLength: number = 255): string {
  if (text.length <= maxLength) return text;
  
  const truncated = text.slice(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 ? 
    `${truncated.slice(0, lastSpace)}...` : 
    `${truncated}...`;
}