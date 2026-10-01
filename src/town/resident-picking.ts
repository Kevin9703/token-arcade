import { Box3, Ray, Vector3 } from 'three';

export interface ResidentPickTarget { id: number; position: Vector3; visible: boolean }
/** A small forgiving hit area; a closer building still occludes the resident. */
export function pickResident(ray: Ray, targets: ResidentPickTarget[], buildingDistance = Infinity): number | null {
  let selected: number | null = null, nearest = buildingDistance;
  const point = new Vector3(), bounds = new Box3();
  for (const p of targets) {
    if (!p.visible) continue;
    bounds.set(new Vector3(p.position.x - .22, p.position.y - .04, p.position.z - .22), new Vector3(p.position.x + .22, p.position.y + .72, p.position.z + .22));
    const hit = ray.intersectBox(bounds, point), distance = hit ? hit.distanceTo(ray.origin) : Infinity;
    if (distance < nearest) { nearest = distance; selected = p.id; }
  }
  return selected;
}
