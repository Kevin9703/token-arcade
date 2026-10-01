import test from 'node:test';
import assert from 'node:assert/strict';
import { wheelGesture, smoothFraction, clampElevation, clampZoom, MIN_ELEVATION, MAX_ELEVATION } from '../../src/town/camera-input';
import { freshTown, parseTown } from '../../src/town/store';
import { keyboardPan, keyboardPanDistance } from '../../src/town/keyboard-input';

test('WASD covers twelve tiles per second independent of frame rate, zoom and diagonal input', () => {
  for (const fps of [30, 60, 120]) {
    for (const zoom of [.52, 1, 1.45, 3.2]) {
      const pan = keyboardPan(new Set(['w', 'd']));
      let distance = 0;
      for (let frame = 0; frame < fps; frame++) distance += Math.hypot(pan.x, pan.y) * keyboardPanDistance(1 / fps, zoom);
      assert.ok(Math.abs(distance * zoom - 12) < 1e-10);
    }
  }
  assert.equal(keyboardPanDistance(-1, 1), 0);
  assert.equal(keyboardPanDistance(1 / 120, 1), .1, 'a short tap stays precise');
});

const wheel = (extra = {}) => ({ deltaX: 0, deltaY: 0, deltaMode: 0, ctrlKey: false, metaKey: false, shiftKey: false, ...extra });
test('two-finger vertical input tilts without zoom; horizontal input orbits without roll', () => {
  assert.deepEqual(wheelGesture(wheel({ deltaY: -30 }), 'trackpad', 800), { kind: 'orbit', x: -0, y: .084 });
  assert.deepEqual(wheelGesture(wheel({ deltaX: 40 }), 'trackpad', 800), { kind: 'orbit', x: -.14, y: -0 });
});
test('pinch wins over modifiers and remains a single zoom gesture in either mode', () => {
  for (const mode of ['trackpad', 'mouse'] as const) {
    assert.deepEqual(wheelGesture(wheel({ deltaY: -10, ctrlKey: true, shiftKey: true }), mode, 800), { kind: 'zoom', x: 0, y: .1 });
    assert.equal(wheelGesture(wheel({ deltaY: -10, metaKey: true }), mode, 800).kind, 'zoom');
  }
  assert.equal(wheelGesture(wheel({ deltaY: 30 }), 'mouse', 800).y, -.075);
});
test('Shift scroll pans; line and page deltas normalize without sudden full turns', () => {
  assert.deepEqual(wheelGesture(wheel({ deltaX: 8, deltaY: -12, shiftKey: true }), 'trackpad', 800), { kind: 'pan', x: 8, y: -12 });
  assert.deepEqual(wheelGesture(wheel({ deltaY: 2, deltaMode: 1 }), 'trackpad', 800), wheelGesture(wheel({ deltaY: 32 }), 'trackpad', 800));
  const page = wheelGesture(wheel({ deltaX: 1, deltaY: 1, deltaMode: 2, shiftKey: true }), 'trackpad', 800);
  assert.ok(Math.abs(Math.hypot(page.x, page.y) - 120) < 1e-8); assert.equal(page.x, page.y);
  assert.deepEqual(wheelGesture(wheel({ deltaY: NaN }), 'mouse', 800), { kind: 'zoom', x: 0, y: -0 });
});
test('pitch and zoom stay inside usable town views, including extreme gestures', () => {
  assert.equal(clampElevation(-100), MIN_ELEVATION); assert.equal(clampElevation(100), MAX_ELEVATION);
  assert.equal(clampZoom(.001), .28); assert.equal(clampZoom(100), 5.5);
  // Clamping the pending target removes overscroll; reversing responds immediately.
  const current = MAX_ELEVATION, pending = clampElevation(current + 10) - current;
  assert.equal(pending, 0); assert.ok(clampElevation(current + pending - .1) < current);
});
test('gesture smoothing settles promptly and has the same response across frame rates', () => {
  const remaining = (fps: number, seconds: number) => {
    let delta = 1; for (let i = 0; i < fps * seconds; i++) delta *= 1 - smoothFraction(1 / fps); return delta;
  };
  assert.ok(Math.abs(remaining(30, 1) - remaining(120, 1)) < 1e-12);
  assert.ok(remaining(60, .5) < .0002); assert.equal(smoothFraction(1 / 60, true), 1);
  assert.equal(smoothFraction(-1), 0);
});
test('camera preferences migrate existing saves without changing coins, inventory or layout', () => {
  const old = freshTown('demo'); const raw = JSON.parse(JSON.stringify(old)); delete raw.settings.cameraInput;
  const parsed = parseTown(JSON.stringify(raw), 'demo')!;
  assert.equal(parsed.settings.cameraInput, 'trackpad'); assert.deepEqual(parsed.town, old.town); assert.equal(parsed.coins, old.coins);
  parsed.settings.cameraInput = 'mouse'; assert.equal(parseTown(JSON.stringify(parsed), 'demo')!.settings.cameraInput, 'mouse');
  raw.settings.cameraInput = 'auto-guess'; assert.equal(parseTown(JSON.stringify(raw), 'demo'), null);
});
