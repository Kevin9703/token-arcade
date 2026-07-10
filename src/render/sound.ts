/*
 * sound.ts — a tiny WebAudio bleep kit. Square/triangle/sawtooth tones give the
 * arcade its chiptune voice: coin plinks, capsule pulls, level-up fanfares, and
 * rarity reveals. Ported from the reference Sound object.
 *
 * The AudioContext is created lazily on first use (browsers require a user
 * gesture), and muting is tracked with an internal flag instead of reaching
 * into global game state — the app calls setMuted()/getMuted() to control it.
 */

/** Shape of the (non-standard) prefixed AudioContext constructor. */
interface WebkitWindow {
  webkitAudioContext?: typeof AudioContext;
}

let ac: AudioContext | null = null;
let mutedFlag = false;

/** Lazily create (and memoize) the shared AudioContext, or null if unavailable. */
function ctx(): AudioContext | null {
  if (!ac) {
    try {
      const Ctor: typeof AudioContext | undefined =
        window.AudioContext ?? (window as unknown as WebkitWindow).webkitAudioContext;
      ac = Ctor ? new Ctor() : null;
    } catch {
      ac = null;
    }
  }
  return ac;
}

function muted(): boolean {
  return mutedFlag;
}

/** Play a single decaying tone. */
function tone(freq: number, dur: number, type?: OscillatorType, vol?: number, when?: number): void {
  const c = ctx();
  if (!c || muted()) {
    return;
  }
  const t0 = c.currentTime + (when ?? 0);
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type ?? 'square';
  osc.frequency.setValueAtTime(freq, t0);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol ?? 0.12, t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

/** Play a pitch glide from f1 to f2 (used for the capsule pull whoosh). */
function slide(f1: number, f2: number, dur: number, type?: OscillatorType, vol?: number): void {
  const c = ctx();
  if (!c || muted()) {
    return;
  }
  const t0 = c.currentTime;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type ?? 'square';
  osc.frequency.setValueAtTime(f1, t0);
  osc.frequency.exponentialRampToValueAtTime(f2, t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol ?? 0.1, t0 + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

function resume(): void {
  const c = ctx();
  if (c && c.state === 'suspended') {
    void c.resume();
  }
}

function click(): void {
  tone(440, 0.06, 'square', 0.06);
}

function coin(): void {
  tone(988, 0.05, 'square', 0.08);
  tone(1319, 0.08, 'square', 0.07, 0.04);
}

function coinTick(): void {
  tone(1046 + Math.random() * 200, 0.03, 'square', 0.04);
}

function pull(): void {
  slide(220, 660, 0.35, 'sawtooth', 0.08);
}

function levelUp(): void {
  [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.12, 'square', 0.09, i * 0.08));
}

function error(): void {
  tone(180, 0.15, 'sawtooth', 0.08);
}

function reveal(rarity: string): void {
  const sets: Record<string, number[]> = {
    common: [523],
    uncommon: [523, 659],
    rare: [523, 659, 784],
    epic: [523, 659, 784, 1046],
    legendary: [523, 659, 784, 1046, 1318, 1568],
  };
  const notes = sets[rarity] ?? sets.common;
  notes.forEach((f, i) => tone(f, 0.14, 'triangle', 0.1, i * 0.07));
}

function setMuted(m: boolean): void {
  mutedFlag = m;
}

function getMuted(): boolean {
  return mutedFlag;
}

/** The sound service interface, as handed to screens via ScreenContext. */
export type Sound = typeof sound;

/** The sound singleton. */
export const sound = {
  resume,
  click,
  coin,
  coinTick,
  pull,
  levelUp,
  error,
  reveal,
  setMuted,
  getMuted,
};
