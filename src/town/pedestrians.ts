export interface WalkPoint { x: number; z: number }
export const PERSONAL_SPACE = .35;
const LANE_INSET = .24;
const FOLLOWING_GAP = .82;
const key = (p: WalkPoint) => `${p.x},${p.z}`;
const mod = (n: number, total: number) => ((n % total) + total) % total;
const right = (d: WalkPoint) => ({ x: -d.z, z: d.x });
const direction = (a: WalkPoint, b: WalkPoint) => { const length = Math.hypot(b.x - a.x, b.z - a.z); return { x: (b.x - a.x) / length, z: (b.z - a.z) / length }; };

export function canWalkTo(candidate: WalkPoint, others: WalkPoint[], self: number): boolean {
  return others.every((p, i) => i === self || Math.hypot(p.x - candidate.x, p.z - candidate.z) >= PERSONAL_SPACE);
}
export function walkingPose(distance: number, phase: number, moving: boolean) {
  const next = phase + distance / .32 * Math.PI * 2;
  const swing = moving ? Math.sin(next) : 0;
  return { phase: next, leg: swing * .58, arm: moving ? -swing * .35 : 0, bob: moving ? Math.abs(Math.sin(next * 2)) * .009 : 0 };
}

export interface PatrolTrack { points: WalkPoint[]; lengths: number[]; length: number }
// Trace the boundary of connected pavement, then inset and round its corners.
// This creates a closed sidewalk circuit with separate lanes on narrow streets,
// including branch ends. Residents never fight over a new steering direction.
export function pavementPatrol(roads: Set<string>): PatrolTrack {
  const edges: { a: WalkPoint; b: WalkPoint }[] = [];
  for (const cell of roads) {
    const [x, z] = cell.split(',').map(Number);
    for (const [dx, dz, a, b] of [
      [0, -1, { x, z }, { x: x + 1, z }], [1, 0, { x: x + 1, z }, { x: x + 1, z: z + 1 }],
      [0, 1, { x: x + 1, z: z + 1 }, { x, z: z + 1 }], [-1, 0, { x, z: z + 1 }, { x, z }],
    ] as const) if (!roads.has(`${x + dx},${z + dz}`)) edges.push({ a, b });
  }
  const outgoing = new Map<string, number[]>();
  edges.forEach((e, i) => { const list = outgoing.get(key(e.a)) || []; list.push(i); outgoing.set(key(e.a), list); });
  const seen = new Set<number>(), rings: WalkPoint[][] = [];
  for (let start = 0; start < edges.length; start++) {
    if (seen.has(start)) continue;
    const ring: WalkPoint[] = []; let current = start;
    while (!seen.has(current)) {
      seen.add(current); const edge = edges[current]; ring.push(edge.a);
      const d = direction(edge.a, edge.b);
      const choices = (outgoing.get(key(edge.b)) || []).filter(i => !seen.has(i) || i === start);
      // At a diagonally touching vertex, turn toward the pavement on our right.
      choices.sort((a, b) => {
        const score = (i: number) => { const v = direction(edges[i].a, edges[i].b); return d.x * v.z - d.z * v.x === 1 ? 0 : d.x * v.x + d.z * v.z === 1 ? 1 : 2; };
        return score(a) - score(b) || a - b;
      });
      if (!choices.length) break; current = choices[0];
    }
    if (current === start && ring.length >= 4) rings.push(ring);
  }
  // The outer clockwise ring has positive area; hole rings face the other way.
  const area = (ring: WalkPoint[]) => ring.reduce((sum, p, i) => { const next = ring[(i + 1) % ring.length]; return sum + p.x * next.z - next.x * p.z; }, 0);
  const ring = rings.sort((a, b) => area(b) - area(a))[0];
  if (!ring) return { points: [], lengths: [], length: 0 };
  const vertices = ring.filter((p, i) => { const before = ring[(i + ring.length - 1) % ring.length], after = ring[(i + 1) % ring.length]; return (p.x - before.x) * (after.z - p.z) !== (p.z - before.z) * (after.x - p.x); });
  const points: WalkPoint[] = [];
  vertices.forEach((p, i) => {
    const previous = vertices[(i + vertices.length - 1) % vertices.length], next = vertices[(i + 1) % vertices.length];
    const incoming = direction(previous, p), exit = direction(p, next), a = right(incoming), b = right(exit);
    const centre = { x: p.x + (a.x + b.x) * LANE_INSET, z: p.z + (a.z + b.z) * LANE_INSET };
    const start = { x: centre.x - incoming.x * .12, z: centre.z - incoming.z * .12 }, end = { x: centre.x + exit.x * .12, z: centre.z + exit.z * .12 };
    for (let j = 0; j <= 8; j++) { const t = j / 8, u = 1 - t; points.push({ x: u * u * start.x + 2 * u * t * centre.x + t * t * end.x, z: u * u * start.z + 2 * u * t * centre.z + t * t * end.z }); }
  });
  const lengths = [0];
  points.forEach((p, i) => { const next = points[(i + 1) % points.length]; lengths.push(lengths[i] + Math.hypot(next.x - p.x, next.z - p.z)); });
  return { points, lengths, length: lengths.at(-1)! };
}
export function samplePatrol(track: PatrolTrack, distance: number): WalkPoint & { angle: number } {
  if (!track.length) return { x: 0, z: 0, angle: 0 };
  const d = mod(distance, track.length); let low = 0, high = track.points.length - 1;
  while (low < high) { const mid = (low + high + 1) >> 1; if (track.lengths[mid] <= d) low = mid; else high = mid - 1; }
  const a = track.points[low], b = track.points[(low + 1) % track.points.length], t = (d - track.lengths[low]) / (track.lengths[low + 1] - track.lengths[low]);
  return { x: a.x + (b.x - a.x) * t, z: a.z + (b.z - a.z) * t, angle: Math.atan2(b.x - a.x, b.z - a.z) };
}
export interface Pedestrian extends WalkPoint { active:boolean; distance: number; speed: number; cruiseSpeed: number; angle: number; travelled: number; totalTravelled: number; pause: number; untilPause: number; phase: number }
export class PedestrianTraffic {
  readonly track: PatrolTrack;
  readonly people: Pedestrian[] = [];
  blockers:number[]=[];
  private random: () => number;
  constructor(roads: Set<string>, requested: number, seed = 32) {
    this.track = pavementPatrol(roads);
    this.random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
    const count = Math.min(requested, Math.floor(this.track.length / 2.5));
    for (let i = 0; i < count; i++) {
      const distance = (i + .37) / count * this.track.length, p = samplePatrol(this.track, distance);
      this.people.push({ ...p, active:true, distance, speed: 0, cruiseSpeed: .44 + this.random() * .12, travelled: 0, totalTravelled: 0, pause: this.random(), untilPause: 12 + this.random() * 16, phase: this.random() * 6 });
    }
  }
  update(dt: number): void {
    if (!this.track.length) return;
    const active=this.people.filter(p=>p.active).sort((a,b)=>a.distance-b.distance),before=active.map(p=>p.distance);
    this.people.forEach(p=>{p.travelled=0;});
    active.forEach((p, i) => {
      p.pause = Math.max(0, p.pause - dt); p.untilPause -= dt;
      if (p.untilPause <= 0 && p.pause === 0) { p.pause = .6 + this.random() * 1.1; p.untilPause = 14 + this.random() * 18; }
      const gap = Math.min(active.length > 1 ? mod(before[(i + 1) % before.length] - before[i], this.track.length) : Infinity,...this.blockers.map(d=>mod(d-before[i],this.track.length)));
      const free = Math.max(0, gap - FOLLOWING_GAP), target = p.pause ? 0 : Math.min(p.cruiseSpeed, free * 1.5);
      p.speed += Math.max(-dt * 1.2, Math.min(dt * 1.2, target - p.speed));
      p.travelled = Math.min(free, p.speed * dt); p.totalTravelled += p.travelled; p.distance = mod(p.distance + p.travelled, this.track.length);
      const position = samplePatrol(this.track, p.distance);
      p.x = position.x; p.z = position.z;
      const turn = Math.atan2(Math.sin(position.angle - p.angle), Math.cos(position.angle - p.angle));
      p.angle += Math.max(-dt * 4, Math.min(dt * 4, turn * (1 - Math.exp(-dt * 12))));
    });
  }
  canJoin(distance:number,gap=.72):boolean {return this.people.filter(p=>p.active).every(p=>Math.min(mod(p.distance-distance,this.track.length),mod(distance-p.distance,this.track.length))>=gap);}
  join(index:number,distance:number):void {const p=this.people[index];Object.assign(p,samplePatrol(this.track,distance),{distance,active:true,speed:0,pause:0,untilPause:20});}
}
