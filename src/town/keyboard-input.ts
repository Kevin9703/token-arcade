export function keyboardIntent(key: string, placing: boolean, repeat = false): 'turn-left' | 'turn-right' | 'camera-turn' | 'pan' | null {
  key = key.toLowerCase();
  if ('wasd'.includes(key) && key.length === 1) return 'pan';
  if (key === 'r' && placing) return repeat ? null : 'turn-right';
  if (key === 'q' || key === 'e') return placing ? repeat ? null : key === 'q' ? 'turn-left' : 'turn-right' : 'camera-turn';
  return null;
}
export function keyboardPan(keys: Set<string>): { x: number; y: number } {
  const x = Number(keys.has('d')) - Number(keys.has('a')), y = Number(keys.has('w')) - Number(keys.has('s'));
  const length = Math.hypot(x, y) || 1; return { x: x / length, y: y / length };
}

// Scale world distance with zoom to keep screen travel consistent.
export function keyboardPanDistance(seconds: number, zoom: number): number {
  return Math.max(0, seconds) * 12 / zoom;
}
