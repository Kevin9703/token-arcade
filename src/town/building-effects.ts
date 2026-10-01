import * as T from 'three';

export function clockHandAngles(hour: number) {
  const h = ((hour % 24) + 24) % 24;
  return { hour: -(h % 12) / 12 * Math.PI * 2, minute: -(h % 1) * Math.PI * 2 };
}

export function updateClockHands(model: T.Object3D, hour: number): void {
  const angles = clockHandAngles(hour);
  for (let side = 0; side < 4; side++) for (const hand of ['hour', 'minute'] as const) {
    model.getObjectByName(`clock-${hand}-${side}`)?.rotation.set(0, side * Math.PI / 2, angles[hand], 'YXZ');
  }
}

export function smokeOrigin(model: T.Object3D): T.Vector3 | null {
  const anchor = model.getObjectByName('smoke-emitter');
  return anchor ? anchor.getWorldPosition(new T.Vector3()) : null;
}
