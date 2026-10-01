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

export const DEFAULT_CAMERA_SPEED = 24;
export const STREET_WALK_SPEED = 3.6;
// Scale world distance with zoom to keep screen travel consistent.
export function keyboardPanDistance(seconds: number, zoom: number, speed = DEFAULT_CAMERA_SPEED, boost = false): number {
  return Math.max(0, seconds) * speed * (boost ? 2 : 1) / zoom;
}
