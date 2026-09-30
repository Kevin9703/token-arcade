import test from 'node:test';
import assert from 'node:assert/strict';
import { walkSurface, ROAD_WALK_Y, BUILDING_GROUND_Y, BRIDGE_STONES } from '../../src/town/walk-surface';
import type { Building } from '../../src/town/types';

test('bridge foot contact matches stone tops and keeps shoulders between parapets in every rotation', () => {
  for (let rotation = 0; rotation < 4; rotation++) {
    const bridge = { id: 'bridge', kind: 'bridge', placed: true, x: 9, z: 10, rotation } as Building;
    const angle = rotation * Math.PI / 2, c = Math.cos(angle), s = Math.sin(angle);
    const center = { x: bridge.x + (rotation % 2 ? 1 : .5), z: bridge.z + (rotation % 2 ? .5 : 1) };
    for (const stone of BRIDGE_STONES) for (const lane of [-.26, .26]) {
      const foot = walkSurface([bridge], { x: center.x + lane * c + stone.z * s, z: center.z - lane * s + stone.z * c });
      assert.ok(foot.y >= BUILDING_GROUND_Y + stone.y + stone.height / 2);
      const side = (foot.x - center.x) * c - (foot.z - center.z) * s;
      assert.ok(Math.abs(side) <= .19 + 1e-10);
      assert.ok(Math.sign(side) === Math.sign(lane));
    }
    let previous = ROAD_WALK_Y;
    for (let z = -1.6; z < 1.6; z += .005) {
      const foot = walkSurface([bridge], { x: center.x + z * s, z: center.z + z * c });
      assert.ok(Math.abs(foot.y - previous) < .008, 'approach and arch have no height jump'); previous = foot.y;
    }
  }
});
test('ordinary pavement and stored bridges do not change walking position', () => {
  const point = { x: 3, z: 4 };
  assert.deepEqual(walkSurface([], point), { ...point, y: ROAD_WALK_Y });
  assert.deepEqual(walkSurface([{ kind: 'bridge', placed: false, x: 3, z: 4 } as Building], point), { ...point, y: ROAD_WALK_Y });
});

test('fishing pier supports arriving and departing feet in either shore orientation',()=>{
 for(const rotation of [0,2]){const b={id:'f',kind:'fishinghut',placed:true,x:4,z:13,rotation} as Building,c=Math.cos(rotation*Math.PI/2),s=Math.sin(rotation*Math.PI/2);
  for(let z=-1.7;z<=-.7;z+=.1){const p={x:5-.35*c+z*s,z:14+.35*s+z*c};assert.ok(walkSurface([b],p).y>=.1575);}
 }
});
