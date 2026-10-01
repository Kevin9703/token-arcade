import test from 'node:test';
import assert from 'node:assert/strict';
import * as T from 'three';
import {buildingModel,packModel} from '../../src/town/models';
import {clockHandAngles,updateClockHands,smokeOrigin} from '../../src/town/building-effects';
import {freshTown,parseTown,TownStore} from '../../src/town/store';
import {installLocalStorage} from '../helpers';

test('smoke emerges just above the actual chimney cap after packing and all building rotations',()=>{
 for(const kind of ['bakery','restaurant'] as const)for(let rotation=0;rotation<4;rotation++){
  const model=packModel(buildingModel(kind,rotation));model.position.set(5,.04,7);model.rotation.y=-rotation*Math.PI/2;model.updateMatrixWorld(true);
  const origin=smokeOrigin(model)!;assert.ok(origin,kind);const ray=new T.Raycaster(origin.clone().add(new T.Vector3(0,.05,0)),new T.Vector3(0,-1,0));
  const hit=ray.intersectObject(model,true)[0];assert.ok(hit,kind);assert.ok(origin.y-hit.point.y>0&&origin.y-hit.point.y<.035,`${kind}: ${origin.y-hit.point.y}`);
 }
});

test('all four clock faces show fractional hours correctly and retain animated pivots after packing',()=>{
 assert.ok(Math.abs(clockHandAngles(0).minute)<1e-10);assert.deepEqual(clockHandAngles(24),clockHandAngles(0));
 assert.ok(Math.abs(clockHandAngles(3.25).hour+Math.PI*3.25/6)<1e-10);
 for(let rotation=0;rotation<4;rotation++){
  const model=packModel(buildingModel('clock'));model.rotation.y=-rotation*Math.PI/2;updateClockHands(model,3.25);model.updateMatrixWorld(true);
  for(let side=0;side<4;side++){
   const minute=model.getObjectByName(`clock-minute-${side}`)!;assert.ok(minute.children.length);assert.ok(model.getObjectByName(`clock-hour-${side}`)?.children.length);
   const center=minute.getWorldPosition(new T.Vector3()),direction=minute.localToWorld(new T.Vector3(0,.31,0)).sub(center).normalize();
   const right=new T.Vector3(1,0,0).applyAxisAngle(new T.Vector3(0,1,0),(side-rotation)*Math.PI/2);assert.ok(direction.dot(right)>.9999);
  }
  const before=model.getObjectByName('clock-hour-0')!.quaternion.clone();updateClockHands(model,3.5);assert.ok(!before.equals(model.getObjectByName('clock-hour-0')!.quaternion));
 }
});

test('goal card preference migrates and persists without altering money or buildings',()=>{
 installLocalStorage();const old=freshTown('demo');delete old.settings.goalCollapsed;const migrated=parseTown(JSON.stringify(old),'demo')!;
 assert.equal(migrated.settings.goalCollapsed,false);assert.equal(migrated.coins,old.coins);assert.deepEqual(migrated.town,old.town);
 const store=new TownStore('demo');store.updateSettings({goalCollapsed:true});const restored=new TownStore('demo');assert.equal(restored.state.settings.goalCollapsed,true);assert.deepEqual(restored.state.town,store.state.town);assert.equal(restored.state.coins,store.state.coins);
 const invalid=JSON.parse(JSON.stringify(old));invalid.settings.goalCollapsed='false';assert.equal(parseTown(JSON.stringify(invalid),'demo'),null);
});
