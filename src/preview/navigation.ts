export type Point = { x: number; y: number };
/** Small fixed walkable floor. BFS also keeps the player off placed floor prizes. */
export function floorPath(from: Point, to: Point, occupied: Point[]): Point[] {
  const size = 20, left = 350, top = 710, cols = 49, rows = 10;
  const cell = (p: Point) => ({ x: Math.max(0, Math.min(cols - 1, Math.round((p.x - left) / size))), y: Math.max(0, Math.min(rows - 1, Math.round((p.y - top) / size))) });
  const point = (x: number, y: number) => ({ x: left + x * size, y: top + y * size });
  const blocked = (x: number, y: number) => occupied.some(o => Math.hypot(o.x - point(x, y).x, o.y - point(x, y).y) < 50);
  const start = cell(from), target = cell(to), key = (x: number, y: number) => y * cols + x;
  const queue = [start], previous = new Map<number, number | null>([[key(start.x, start.y), null]]);
  let best = start, distance = Infinity;
  for (let i = 0; i < queue.length; i++) {
    const c = queue[i], d = Math.hypot(c.x - target.x, c.y - target.y);
    if (d < distance) { best = c; distance = d; } if (d === 0) break;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const x = c.x + dx, y = c.y + dy, k = key(x, y);
      if (x < 0 || y < 0 || x >= cols || y >= rows || previous.has(k) || blocked(x, y)) continue;
      previous.set(k, key(c.x, c.y)); queue.push({ x, y });
    }
  }
  const result: Point[] = []; let k: number | null = key(best.x, best.y);
  while (k !== null) { result.unshift(point(k % cols, Math.floor(k / cols))); k = previous.get(k) ?? null; }
  return result.slice(1);
}
