export type CameraInput = 'trackpad' | 'mouse';
export interface WheelInput {
  deltaX: number; deltaY: number; deltaMode: number;
  ctrlKey: boolean; metaKey: boolean; shiftKey: boolean;
}
export type CameraGesture = { kind: 'orbit' | 'pan' | 'zoom'; x: number; y: number };
export const MIN_ELEVATION = Math.PI * 12 / 180;
export const MAX_ELEVATION = Math.PI * 72 / 180;
export const DEFAULT_ELEVATION = Math.PI * 40 / 180;
export const clampElevation = (angle: number) => Math.max(MIN_ELEVATION, Math.min(MAX_ELEVATION, angle));
export const clampZoom = (zoom: number) => Math.max(.28, Math.min(5.5, zoom));

// WheelEvent cannot reliably distinguish a precision mouse from a trackpad.
// Use an explicit preference; Ctrl-wheel is also the browser's pinch signal.
export function wheelGesture(input: WheelInput, mode: CameraInput, height: number): CameraGesture {
  const unit = input.deltaMode === 1 ? 16 : input.deltaMode === 2 ? Math.max(1, height) : 1;
  let x = Number.isFinite(input.deltaX) ? input.deltaX * unit : 0;
  let y = Number.isFinite(input.deltaY) ? input.deltaY * unit : 0;
  const length = Math.hypot(x, y);
  if (length > 120) { x *= 120 / length; y *= 120 / length; }
  if (input.ctrlKey || input.metaKey) return { kind: 'zoom', x: 0, y: -y * .01 };
  if (input.shiftKey) return { kind: 'pan', x, y };
  if (mode === 'mouse') return { kind: 'zoom', x: 0, y: -y * .0025 };
  return { kind: 'orbit', x: -x * .0035, y: -y * .0028 };
}

// Exponential response keeps a gesture equally smooth at 30 / 60 / 120 FPS.
// A short settling tail follows input without adding free-running momentum.
export function smoothFraction(dt: number, reduced = false, rate = 18): number {
  return reduced ? 1 : 1 - Math.exp(-Math.max(0, dt) * rate);
}

/** Fit the complete valley at any aspect ratio / azimuth without shrinking the town view. */
export function overviewZoom(size:number,halfWidth:number,halfHeight:number,azimuth:number,elevation:number):number {
  const diagonal=Math.abs(Math.sin(azimuth))+Math.abs(Math.cos(azimuth));
  const horizontal=(size+12)*.5*diagonal,vertical=(size+12)*.5*diagonal*Math.sin(elevation)+5*Math.cos(elevation);
  return clampZoom(.88*Math.min(halfWidth/horizontal,halfHeight/vertical));
}
