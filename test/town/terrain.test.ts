import test from 'node:test';
import assert from 'node:assert/strict';
import * as T from 'three';
import { freshTown, parseTown, syncTown, TownStore } from '../../src/town/store';
import { TOWN_SIZE, groundHeight, foundationHeight, groundNormal, sceneryClear, landscapeHeight } from '../../src/town/terrain';
import { canPlace, canRoad, evaluate, makeBuilding, key, bridgeSlots, unlocked } from '../../src/town/world';
import { landscape } from '../../src/town/landscape';
import { stoneRoads } from '../../src/town/roads';
import { walkSurface, ROAD_WALK_Y } from '../../src/town/walk-surface';
import { streetHeight, STREET_EYE_HEIGHT, streetMove } from '../../src/town/street-camera';
import { overviewZoom } from '../../src/town/camera-input';
import { doorwayForBuilding } from '../../src/town/doorways';
import { installLocalStorage } from '../helpers';

const close=(a:number,b:number,e=.00001)=>assert.ok(Math.abs(a-b)<e,`${a} != ${b}`);
test('24-cell saves expand additively, retaining ledgers, crops, inventory, layout and puzzle boards',()=>{
  for(const mode of ['live','demo'] as const){
    const old=freshTown(mode);old.town.size=24;syncTown(old,[{id:'project',name:'Existing workshop',provider:'codex',tokens:17501}]);
    old.farm.wheat=3;old.village.stock['bakery-1']={flour:2};old.chapterStars[0]=3;
    const snapshot=structuredClone(old),loaded=parseTown(JSON.stringify(old),mode)!;
    assert.ok(loaded);assert.equal(loaded.town.size,TOWN_SIZE);snapshot.town.size=TOWN_SIZE;assert.deepEqual(loaded,snapshot);
    assert.deepEqual(parseTown(JSON.stringify(loaded),mode),loaded);assert.equal(syncTown(loaded,[{id:'project',name:'Existing workshop',provider:'codex',tokens:17501}]).coins,0);
    for(let z=0;z<=24;z++)for(let x=0;x<=24;x++)assert.equal(groundHeight(loaded.town,x,z),0);
  }
  const malformed=freshTown('demo');malformed.town.size=39;assert.equal(parseTown(JSON.stringify(malformed),'demo'),null);
});
test('new terraces increase real land, retain chapter unlocks and keep every existing bridge usable',()=>{
  const s=freshTown('demo');assert.equal(s.town.size,40);assert.ok(unlocked(s,s.town,25,39));assert.ok(!unlocked(s,s.town,26,39));
  s.chapterStars=[3,3,3,0,0,0];assert.ok(unlocked(s,s.town,19,4));assert.ok(!unlocked(s,s.town,20,4));
  for(const x of bridgeSlots(s.town)){
    assert.equal(canPlace(s,s.town,makeBuilding(`bridge-${x}`,'bridge',x,11)),null);
    assert.equal(groundHeight(s.town,x+.5,13),0);
    const fish=makeBuilding(`fish-${x}`,'fishinghut',x,13);assert.equal(foundationHeight(s.town,fish),0);
  }
  assert.equal(canPlace(s,s.town,makeBuilding('north-east','house',35,2)), '这片土地还没有开放，先完成当前委托');
  s.chapterStars.fill(3);assert.equal(canPlace(s,s.town,makeBuilding('north-east','house',35,2)),null);
});
test('building foundations stay level; ramps accept free roads and rotated placement validates the whole plot',()=>{
  const s=freshTown('demo');s.chapterStars.fill(3);
  for(const kind of ['house','mill','greenhouse','restaurant'] as const)for(let rotation=0;rotation<4;rotation++){
    const b=makeBuilding('new',kind,7,30,rotation);assert.equal(foundationHeight(s.town,b),2);assert.equal(canPlace(s,s.town,b),null);
    b.z=25;assert.equal(foundationHeight(s.town,b),null);assert.match(canPlace(s,s.town,b)!,/缓坡/);
  }
  assert.ok(canRoad(s,s.town,7,25));
  const invalid=structuredClone(s);invalid.town.buildings.push(makeBuilding('ramp','house',7,25));assert.equal(parseTown(JSON.stringify(invalid),'demo'),null);
  installLocalStorage();const store=new TownStore('demo');store.syncDemo();const coins=store.state.coins;
  assert.match(store.place('house',7,25,0)!,/缓坡/);assert.equal(store.state.coins,coins);
  assert.equal(store.place('house',7,30,0),null);const id=store.board.buildings.at(-1)!.id;
  assert.equal(store.state.coins,coins-8);assert.equal(store.stash(id),true);assert.equal(store.place('house',8,31,1,id),null);
  const restored=new TownStore('demo');assert.equal(restored.board.buildings.filter(b=>b.id===id).length,1);assert.equal(restored.state.coins,coins-8);
});
test('roads, articulated entrances, residents and street cameras share the actual ramp / terrace height',()=>{
  const s=freshTown('demo'),b=s.town;b.roads.push(key(6,17),key(7,18),key(8,18),...[19,20,21,22,23,24,25,26,27,28,29,30,31].map(z=>key(8,z)));
  const house=makeBuilding('upland','house',8,32,2);b.buildings.push(house);
  assert.ok(evaluate(b).buildings.upland.connected);close(foundationHeight(b,house)!,2);
  const door=doorwayForBuilding(house)!;close(groundHeight(b,door.inside.x,door.inside.z),2);
  for(let z=23.5;z<30;z+=.125){const p={x:6.5,z},foot=walkSurface(b.buildings,p,b);close(foot.y,groundHeight(b,p.x,p.z)+ROAD_WALK_Y);close(streetHeight(b,p),foot.y+STREET_EYE_HEIGHT);}
  const from={x:6.5,z:23.5},to=streetMove(b,from,0,5);assert.ok(to.z>28);assert.ok(streetHeight(b,to)>1.9);
  const mesh=stoneRoads(b,evaluate(b)).children[1] as T.InstancedMesh,m=new T.Matrix4(),p=new T.Vector3();
  for(let i=0;i<mesh.count;i++){mesh.getMatrixAt(i,m);p.setFromMatrixPosition(m);assert.ok(p.y-groundHeight(b,p.x,p.z)>.069);const up=new T.Vector3(0,1,0).transformDirection(m),normal=groundNormal(b,p.x,p.z);close(up.dot(new T.Vector3(normal.x,normal.y,normal.z)),1,.0001);}
});
test('terrain ray picking hits the visible raised plot instead of the old ground plane',()=>{
  const s=freshTown('demo'),terrain=landscape(s.town,s);terrain.world.updateMatrixWorld(true);
  for(const p of [{x:6.5,z:17.5},{x:6.5,z:30.5},{x:33.5,z:32.5},{x:28.5,z:20.5},{x:34.5,z:11.5}]){
    const ray=new T.Raycaster(new T.Vector3(p.x,10,p.z),new T.Vector3(0,-1,0));
    const hit=ray.intersectObject(terrain.pick)[0];assert.ok(hit);close(hit.point.y,groundHeight(s.town,p.x,p.z));
  }
  assert.ok(landscapeHeight(s.town,20,-6)>3);assert.ok(landscapeHeight(s.town,41,26)>groundHeight(s.town,40,26));
});
test('woodland scenery clears for actual road / building footprints and restores on storage without replacing terrain',()=>{
  const s=freshTown('demo'),terrain=landscape(s.town,s),forest=terrain.forest;
  const tree=forest.children[0].children[0] as T.InstancedMesh,m=new T.Matrix4();
  let index=-1,p={x:0,z:0};for(let i=0;i<tree.count;i++){tree.getMatrixAt(i,m);const v=new T.Vector3().setFromMatrixPosition(m);if(v.x>1&&v.x<18&&v.z>1&&v.z<8){index=i;p={x:v.x,z:v.z};break;}}
  assert.ok(index>=0);const original=new T.Matrix4();tree.getMatrixAt(index,original);
  s.town.roads.push(key(Math.floor(p.x),Math.floor(p.z)));terrain.sync(s.town);tree.getMatrixAt(index,m);assert.equal(m.determinant(),0);assert.equal(terrain.forest,forest);
  s.town.roads.pop();terrain.sync(s.town);tree.getMatrixAt(index,m);assert.deepEqual(m.elements,original.elements);
  const home=makeBuilding('forest-house','house',Math.floor(p.x),Math.floor(p.z));s.town.buildings.push(home);assert.equal(sceneryClear(s.town,p),false);
  terrain.sync(s.town);tree.getMatrixAt(index,m);assert.equal(m.determinant(),0);home.placed=false;terrain.sync(s.town);tree.getMatrixAt(index,m);assert.deepEqual(m.elements,original.elements);
});
test('valley overview fits a 40-cell map on the normal portrait and landscape viewports',()=>{
  for(const [w,h]of [[849,853],[1280,720]])for(const azimuth of [0,.58,Math.PI/4,Math.PI/2]){
    const span=w<h?16:13,halfWidth=span*w/h,zoom=overviewZoom(40,halfWidth,span,azimuth,40*Math.PI/180);
    const width=52*.5*(Math.abs(Math.sin(azimuth))+Math.abs(Math.cos(azimuth)));
    assert.ok(width*zoom<=halfWidth*.9);assert.ok(zoom>=.28&&zoom<.7);
  }
});
