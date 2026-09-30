import test from 'node:test';
import assert from 'node:assert/strict';
import * as T from 'three';
import { buildingModel, buildingSeats, residentModel, RESIDENT_HIP, BENCH_SEAT_TOP } from '../../src/town/models';
import { CATALOG } from '../../src/town/catalog';
import { evaluate, starterBoard } from '../../src/town/world';

test('original homes and eight distinct community buildings retain valid footprints',()=>{
  for(const kind of ['house','bakery','cafe','grocer','florist','library','greenhouse','granary','boathouse'] as const)for(let variant=0;variant<4;variant++){
    const model=buildingModel(kind,variant),bb=new T.Box3().setFromObject(model),d=CATALOG[kind];assert.ok(!bb.isEmpty());assert.ok(bb.min.x>=-d.w/2-.04&&bb.max.x<=d.w/2+.04,kind);assert.ok(bb.min.z>=-d.d/2-.04&&bb.max.z<=d.d/2+.3,kind);assert.ok(bb.min.y>=-.015&&bb.max.y<3.1,kind);
  }
});
test('seated residents use bent knees and contact the actual seat surface at every rotation',()=>{
  const actor=residentModel('#a28273',1,true),leg=actor.getObjectByName('leg-left')!,bb=new T.Box3().setFromObject(leg);assert.ok(bb.max.z>.20);assert.ok(bb.min.y>-.015);assert.equal(leg.rotation.x,0);
  for(const kind of ['bench','park','gazebo'] as const){const seat=buildingSeats(kind)[0],top=kind==='bench'?BENCH_SEAT_TOP:kind==='park'?.13+BENCH_SEAT_TOP*.85:.16+BENCH_SEAT_TOP;
    assert.ok(Math.abs(seat.position[1]+RESIDENT_HIP-.004-.039-top)<.002,'thigh underside meets seat');
    for(let r=0;r<4;r++){const model=buildingModel(kind);model.position.set(6,.04,12);model.rotation.y=-r*Math.PI/2;model.updateMatrixWorld(true);const p=model.localToWorld(new T.Vector3(...seat.position));assert.ok(Math.abs(p.y-(.04+seat.position[1]))<.00001);}
  }
});
test('new food and leisure shops use road-based service rules while resource props remain decorative',()=>{
  const board=starterBoard();board.roads.push('6,17');board.buildings.find(b=>b.kind==='bakery')!.kind='grocer';assert.equal(evaluate(board).food,4);
  for(const kind of ['greenhouse','granary','boathouse'] as const)assert.equal(CATALOG[kind].service,undefined);
  assert.equal(CATALOG.florist.service,'leisure');assert.equal(CATALOG.library.service,'leisure');
});
