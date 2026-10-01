import type { TownState } from './types';

export function renderPolicy(quality: TownState['settings']['quality'], ratio: number, width: number, height: number) {
  const maximum = quality === 'high' ? 2 : quality === 'medium' ? 1.5 : 1;
  // Bound the Retina framebuffer on large external displays, not the CSS viewport.
  const pixelRatio = Math.min(Math.max(1, ratio), maximum, Math.sqrt(8_000_000 / Math.max(1, width * height)));
  return { fps: quality === 'high' ? 60 : 30, pixelRatio, shadowSize: quality === 'high' ? 2048 : 1024, shadowInterval: quality === 'high' ? 1000 / 30 : 1000 / 12, shadows: quality !== 'low' };
}

/** No catch-up simulation for hidden tabs; accumulated sub-frame time stays bounded. */
export function frameDue(time: number, previous: number, fps: number): boolean {
  return time - previous >= 1000 / fps - .5;
}
