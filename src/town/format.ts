/** Compact token counts for the town HUD and workshop details. */
export function fmtCompact(n: number): string {
  n = Math.floor(n || 0);
  const abs = Math.abs(n);
  if (abs < 1000) return String(n);
  if (abs < 1e6) return abs < 1e4 ? (n / 1e3).toFixed(1) + 'K' : Math.round(n / 1e3) + 'K';
  if (abs < 1e9) return abs < 1e7 ? (n / 1e6).toFixed(2) + 'M' : Math.round(n / 1e6) + 'M';
  return (n / 1e9).toFixed(2) + 'B';
}
