export function formatYear(date?: string) {
  if (!date) return 'Unknown';
  return new Date(date).getFullYear().toString();
}

export function formatRating(vote: number) {
  return vote?.toFixed(1) || '0.0';
}

export function truncate(text: string, max = 180) {
  if (!text) return '';
  return text.length > max ? `${text.slice(0, max)}...` : text;
}
