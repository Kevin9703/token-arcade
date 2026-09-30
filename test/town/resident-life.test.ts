import test from 'node:test';
import assert from 'node:assert/strict';
import * as T from 'three';
import { ResidentLife,homeForBuilding } from '../../src/town/resident-life';
import { PedestrianTraffic,PERSONAL_SPACE } from '../../src/town/pedestrians';
import { starterBoard,evaluate,dimensions,makeBuilding,entrance } from '../../src/town/world';
import { buildingModel,packModel } from '../../src/town/models';
function fixture(sleep=false){const board=starterBoard();board.roads.push('6,17');const traffic=new PedestrianTraffic(evaluate(board).connectedRoads,9),homes=board.buildings.filter(b=>b.kind==='house').map(homeForBuilding);const park=board.buildings.find(b=>b.kind==='park')!,entry=entrance(park);return new ResidentLife(traffic,homes,sleep,new Map([[traffic.people.length-1,{position:{x:park.x+1.4,z:park.z+1.55},via:{x:entry.x+.5,z:entry.z+.5},yaw:0,y:.05}]]));}
test('residents return through animated doors, sleep indoors and wake without a doorway crowd',()=>{
  const life=fixture();let opened=false,min=Infinity;
  for(let cycle=0;cycle<2;cycle++){
    for(let frame=0;frame<60*150;frame++){
      life.update(1/60,true);opened||=life.doors.some(h=>h.open>0&&h.open<1);
      const visible=life.residents.map((r,i)=>r.visible?life.traffic.people[i]:null).filter(Boolean) as any[];
      for(let i=0;i<visible.length;i++)for(let j=i+1;j<visible.length;j++)min=Math.min(min,Math.hypot(visible[i].x-visible[j].x,visible[i].z-visible[j].z));
    }
    assert.ok(life.residents.every(r=>r.mode==='sleeping'&&!r.visible),JSON.stringify(life.residents.map(r=>r.mode)));assert.ok(life.doors.every(h=>h.open===0&&h.busy===null));
    for(let frame=0;frame<60*150;frame++){life.update(1/60,false);const visible=life.residents.map((r,i)=>r.visible?life.traffic.people[i]:null).filter(Boolean) as any[];for(let i=0;i<visible.length;i++)for(let j=i+1;j<visible.length;j++)min=Math.min(min,Math.hypot(visible[i].x-visible[j].x,visible[i].z-visible[j].z));}
    assert.ok(life.residents.every(r=>r.visible&&(r.mode==='walking'||r.mode==='seated')),JSON.stringify(life.residents.map(r=>r.mode)));assert.ok(life.doors.every(h=>h.open===0));
  }
  assert.ok(opened,'door animates rather than jumping');assert.ok(min>=PERSONAL_SPACE,`nearest resident gap ${min}`);
});
test('reopening a nighttime town starts residents indoors and closes their doors',()=>{const life=fixture(true);assert.ok(life.residents.every(r=>!r.visible));assert.ok(life.traffic.people.every(p=>!p.active));assert.ok(life.doors.every(h=>h.open===0));for(let i=0;i<120;i++)life.update(1/60,true);assert.ok(life.residents.every(r=>r.mode==='sleeping'));});
test('door articulation survives mesh packing at all four building rotations',()=>{
  for(let rotation=0;rotation<4;rotation++){
    const b=makeBuilding('h','house',6,10,rotation),home=homeForBuilding(b),model=packModel(buildingModel('house')),dims=dimensions(b);model.position.set(b.x+dims.w/2,.04,b.z+dims.d/2);model.rotation.y=-rotation*Math.PI/2;model.updateMatrixWorld(true);
    const outer=model.localToWorld(new T.Vector3(.18,0,1.32));assert.ok(Math.hypot(home.outside.x-outer.x,home.outside.z-outer.z)<.00001);
    const hinge=model.getObjectByName('door-hinge')!;assert.ok(hinge?.children.length);const closed=new T.Box3().setFromObject(hinge);hinge.rotation.y=-1.4;const opened=new T.Box3().setFromObject(hinge);assert.ok(!opened.equals(closed));
  }
});
