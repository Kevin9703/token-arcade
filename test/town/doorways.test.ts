import test from 'node:test';
import assert from 'node:assert/strict';
import * as T from 'three';
import { DOOR_SPECS,doorwayForBuilding,interiorSpot,fishingAccess } from '../../src/town/doorways';
import { buildingModel,packModel } from '../../src/town/models';
import { makeBuilding,dimensions,entrance } from '../../src/town/world';
import type { BuildingKind } from '../../src/town/types';
import { ResidentLife } from '../../src/town/resident-life';
import { PedestrianTraffic } from '../../src/town/pedestrians';
import { roadRoute,type FarmJob } from '../../src/town/farming';

test('every enclosed entrance has a real opening and exported articulation at four rotations',()=>{
 for(const kind of Object.keys(DOOR_SPECS) as BuildingKind[])for(let rotation=0;rotation<4;rotation++){
  const b=makeBuilding(kind,kind,5,5,rotation),d=dimensions(b),door=doorwayForBuilding(b)!,s=DOOR_SPECS[kind]!;
  const model=packModel(buildingModel(kind));model.position.set(b.x+d.w/2,.04,b.z+d.d/2);model.rotation.y=-rotation*Math.PI/2;
  const hinge=model.getObjectByName('door-hinge')!;assert.ok(hinge?.children.length,kind);assert.equal(hinge.userData.movingPart,true);
  const from=new T.Vector3(door.outside.x,s.floor+(s.gate?s.height*.35:.30)+.04,door.outside.z),to=new T.Vector3(door.inside.x,from.y,door.inside.z),dir=to.clone().sub(from);
  const ray=new T.Raycaster(from,dir.clone().normalize(),0,dir.length());model.updateMatrixWorld(true);
  assert.ok(ray.intersectObject(hinge,true).length,`${kind}/${rotation}: closed leaf blocks crossing`);
  hinge.rotation.y=Math.PI*.46;model.updateMatrixWorld(true);
  assert.equal(ray.intersectObject(model,true).length,0,`${kind}/${rotation}: open doorway must not retain a wall, glass or fence`);
 }
});
function fixture(rotation=0){
 const b=makeBuilding('glass','greenhouse',5,4,rotation),entry=entrance(b),roads=new Set<string>();
 for(let x=0;x<12;x++)for(let z=0;z<12;z++)if(x<5||x>=5+dimensions(b).w||z<4||z>=4+dimensions(b).d)roads.add(`${x},${z}`);
 const traffic=new PedestrianTraffic(roads,2),life=new ResidentLife(traffic,[]);life.setBuildings([b]);life.setPlaces([],roads);
 const route=(p:any,to:any)=>{const nearest=[...roads].map(k=>{const [x,z]=k.split(',').map(Number);return{x:x+.5,z:z+.5};}).sort((a,c)=>Math.hypot(a.x-p.x,a.z-p.z)-Math.hypot(c.x-p.x,c.z-p.z))[0];return roadRoute(roads,nearest,to);};
 const job:FarmJob={fieldId:'glass-work',phase:'harvesting',target:interiorSpot(b)!,entrance:{x:entry.x+.5,z:entry.z+.5},buildingId:b.id,carrying:null,harvesting:true};
 return {b,roads,traffic,life,route,job};
}
test('greenhouse workers wait for opening, cross on the hinge axis, close it and exit before reassignment',()=>{
 for(let rotation=0;rotation<4;rotation++){
  const {b,life,route,job,traffic}=fixture(rotation),door=life.portals.get(b.id)!,p=traffic.people[0];let opening=false,crossed=false;
  for(let i=0;i<4000;i++){life.assignJobs([job],route);life.update(.05,false);
   if(!crossed&&door.open>0&&door.open<.99){opening=true;assert.ok(Math.hypot(p.x-door.outside.x,p.z-door.outside.z)<.001,'wait outside while opening');}
   if(life.residents[0].insideBuilding===b.id)crossed=true;
   if(crossed&&!life.residents[0].path.length&&door.open===0)break;
  }
  assert.ok(opening&&crossed);assert.equal(life.residents[0].path.length,0);assert.equal(door.open,0);
  const original=p;let exited=false;
  for(let i=0;i<4000;i++){life.assignJobs([],route);life.update(.05,false);if(!life.residents[0].insideBuilding&&door.open>.99)exited=true;if(exited&&life.residents[0].mode==='walking'&&door.open===0)break;}
  assert.ok(exited,'exits through opened door before rejoining pavement');assert.equal(traffic.people[0],original);assert.equal(door.busy,null);assert.equal(door.open,0);
 }
});
test('door reservation and an in-progress crossing survive a road update and bedtime',()=>{
 const {b,life,route,job,traffic,roads}=fixture();const door=life.portals.get(b.id)!;
 for(let i=0;i<4000;i++){life.assignJobs([job,{...job,fieldId:'second',target:interiorSpot(b,.14)!}],route);life.update(.05,false);if(door.open>.99&&door.busy!==null&&life.residents[door.busy].path[0]?.gate?.passing)break;}
 assert.ok(door.busy!==null);const positions=traffic.people.map(p=>({x:p.x,z:p.z}));traffic.retarget(new Set([...roads,'12,0']));life.retarget([],[]);life.setBuildings([b]);
 assert.deepEqual(traffic.people.map(p=>({x:p.x,z:p.z})),positions);
 life.assignJobs([],route);for(let i=0;i<5000;i++)life.update(.05,true);
 assert.ok(life.residents.every(r=>!r.insideBuilding));assert.equal(door.busy,null);assert.equal(door.open,0);
});
test('fishing access skirts the hut and rotates with both banks',()=>{
 for(const rotation of [0,2]){const b=makeBuilding('f','fishinghut',5,5,rotation),path=fishingAccess(b),d=dimensions(b),yaw=rotation*Math.PI/2;
  const local=path.map(p=>({x:(p.x-b.x-d.w/2)*Math.cos(yaw)-(p.z-b.z-d.d/2)*Math.sin(yaw),z:(p.x-b.x-d.w/2)*Math.sin(yaw)+(p.z-b.z-d.d/2)*Math.cos(yaw)}));
  assert.ok(local[0].x<-.50&&local[1].x<-.50);assert.ok(local[1].z<-.60);assert.ok(Math.abs(local[2].z+1.38)<.0001);
 }
});
test('an indoor batch yields the doorway to a waiting worker without recreating either resident',()=>{
 const {b,life,route,job,traffic}=fixture(),actors=[...traffic.people];let cycles=0,secondWorked=false,firstWorked=false;
 for(let i=0;i<6000;i++){
  life.assignJobs([{...job,cycles},{...job,fieldId:'second-work',target:interiorSpot(b,.14)!}],route);life.update(.05,false);
  assert.ok(life.residents.filter(r=>r.insideBuilding===b.id).length<=1,'single indoor work bay cannot overlap residents');
  if(!life.residents[0].path.length&&life.residents[0].insideBuilding===b.id){firstWorked=true;cycles=1;}
  if(!life.residents[1].path.length&&life.residents[1].insideBuilding===b.id){secondWorked=true;break;}
 }
 assert.ok(firstWorked&&secondWorked,'a completed batch lets the waiting worker enter');
 assert.ok(traffic.people.every((p,i)=>p===actors[i]));
});
test('finishing an indoor visit exits before joining patrol and releases its room reservation',()=>{
 const {b,life,route,job,roads}=fixture();life.setPlaces([{id:b.id,buildingId:b.id,position:job.entrance,target:job.target}],roads);life.assignJobs([],route);let visited=false;
 for(let i=0;i<6000;i++){life.update(.05,false);for(const r of life.residents){visited||=r.mode==='lingering';if(r.mode==='walking')assert.equal(r.insideBuilding,undefined,'a completed visit cannot teleport onto patrol');}}
 assert.ok(visited);life.setPlaces([],roads);for(let i=0;i<2000;i++)life.update(.05,false);
 assert.equal(life.portals.get(b.id)!.occupant,undefined);assert.equal(life.portals.get(b.id)!.busy,null);assert.equal(life.portals.get(b.id)!.open,0);
});
