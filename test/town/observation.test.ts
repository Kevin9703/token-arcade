import test from 'node:test';
import assert from 'node:assert/strict';
import * as T from 'three';
import { freshTown, parseTown } from '../../src/town/store';
import { makeBuilding } from '../../src/town/world';
import { renderPolicy, frameDue } from '../../src/town/render-policy';
import { streetStart, streetMove, streetOpen, streetHeight, STREET_EYE_HEIGHT } from '../../src/town/street-camera';
import { sceneryBatch } from '../../src/town/scenery-batch';

test('balanced rendering limits Retina cost while quality stays explicit and large screens stay bounded', () => {
  const medium=renderPolicy('medium',2,1512,982),high=renderPolicy('high',2,1512,982),low=renderPolicy('low',2,1512,982);
  assert.equal(medium.fps,30);assert.equal(medium.pixelRatio,1.5);assert.equal(medium.shadows,true);
  assert.equal(high.fps,60);assert.equal(high.pixelRatio,2);assert.equal(low.shadows,false);
  assert.equal(renderPolicy('medium',1,1280,720).pixelRatio,1);
  const huge=renderPolicy('high',3,7680,4320);assert.ok(huge.pixelRatio**2*7680*4320<=8_000_001);
  assert.ok(medium.shadowInterval>=2*1000/medium.fps);
  assert.equal(frameDue(16.7,0,30),false);assert.equal(frameDue(33.4,0,30),true);assert.equal(frameDue(16.7,0,60),true);
});
test('street entry selects actual clear roads, never a building or river; movement cannot tunnel through walls', () => {
  const s=freshTown('demo'),b=s.town,start=streetStart(b,{x:6,z:17})!;assert.ok(streetOpen(b,start));
  const house=b.buildings.find(v=>v.kind==='house')!;assert.equal(streetOpen(b,{x:house.x+1,z:house.z+1}),false);
  assert.deepEqual(parseTown(JSON.stringify(s),'demo')?.settings,s.settings);
  b.buildings=[];
  const wall=makeBuilding('wall','house',10,15);b.buildings.push(wall);
  const end=streetMove(b,{x:9,z:16},8,0);assert.ok(end.x<9.83);assert.equal(end.z,16);
  const slide=streetMove(b,{x:9.5,z:16},2,1);assert.ok(slide.x<9.83);assert.ok(slide.z>16);
  assert.equal(streetOpen(b,{x:10.5,z:11.5}),false);
  b.buildings.push(makeBuilding('bridge','bridge',10,11));assert.equal(streetOpen(b,{x:10.5,z:11.5}),true);
  assert.ok(streetHeight(b,{x:10.5,z:11.5})>STREET_EYE_HEIGHT);
  assert.ok(streetMove(b,{x:.3,z:23},-20,0).x>=.2);
  assert.equal(streetStart({...b,roads:[]},{x:5,z:5}),null);
});
test('scenery instances preserve all source transforms, geometry, materials and shadows with one draw per mesh', () => {
  const source=new T.Group(),child=new T.Group();child.position.set(.2,.4,.6);child.rotation.y=.3;source.add(child);
  const geometry=new T.BoxGeometry(1,2,3),mat=new T.MeshStandardMaterial({color:'#998877'}),mesh=new T.Mesh(geometry,mat);mesh.position.x=.8;mesh.castShadow=true;child.add(mesh);
  const placements=[new T.Matrix4().makeTranslation(3,4,5),new T.Matrix4().makeScale(2,2,2)];
  const batch=sceneryBatch(source,placements),out=batch.children[0] as T.InstancedMesh;assert.equal(batch.children.length,1);assert.equal(out.count,2);assert.notEqual(out.material,mat);assert.ok((out.material as T.MeshStandardMaterial).color.equals(mat.color));assert.equal(out.castShadow,true);
  const actual=new T.Matrix4();out.getMatrixAt(0,actual);assert.ok(actual.elements.every((v,i)=>Math.abs(v-placements[0].clone().multiply(mesh.matrixWorld).elements[i])<1e-6));
  assert.notEqual(out.geometry,geometry);out.geometry.dispose();assert.equal(geometry.getAttribute('position').count,24);
});
