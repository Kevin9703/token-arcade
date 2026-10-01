import test from 'node:test';
import assert from 'node:assert/strict';
import { Raycaster, Vector3 } from 'three';
import { freshTown } from '../../src/town/store';
import { evaluate, makeBuilding } from '../../src/town/world';
import { productionStatus, fishingView } from '../../src/town/production-feedback';
import { buildingModel } from '../../src/town/models';

test('fishing feedback distinguishes actual fishing, walking, waiting, full stock, disconnection and night',()=>{
  const s=freshTown('demo'),b=makeBuilding('fish','fishinghut',12,13);
  s.town.buildings.push(b);s.town.roads.push('6,17','12,16','13,16','13,15');
  const e=evaluate(s.town),worker={name:'林禾',working:true,enRoute:false};
  assert.match(productionStatus(s,e,b,'spring',false),/等待空闲村民/);
  assert.equal(productionStatus(s,e,b,'spring',false,worker),'林禾正在码头钓鱼 · 0%');
  assert.match(productionStatus(s,e,b,'spring',false,{...worker,enRoute:true}),/^林禾正在前往/);
  assert.match(productionStatus(s,e,b,'spring',false,{...worker,working:false}),/^林禾准备返岗/);
  assert.match(productionStatus(s,e,b,'spring',true,worker),/休息中/);
  s.village.stock.fish={fish:24};assert.match(productionStatus(s,e,b,'spring',false,worker),/^鲜鱼库存已满/);
  s.town.roads=s.town.roads.filter(k=>k!=='13,15');assert.match(productionStatus(s,evaluate(s.town),b,'spring',false,worker),/^入口未连/);
});

test('river-side camera view exposes the actual angler instead of occluding them with either rotated hut',()=>{
  for(const rotation of [0,2]){
    const b=makeBuilding('fish','fishinghut',12,rotation===0?13:9,rotation),view=fishingView(b),model=buildingModel('fishinghut');
    model.position.set(b.x+1,.04,b.z+1);model.rotation.y=-rotation*Math.PI/2;model.updateMatrixWorld(true);
    const head=new Vector3(view.target.x,.16+.55,view.target.z),direction=new Vector3(Math.sin(view.azimuth)*Math.cos(view.elevation),Math.sin(view.elevation),Math.cos(view.azimuth)*Math.cos(view.elevation));
    const camera=head.clone().addScaledVector(direction,15),ray=new Raycaster(camera,head.clone().sub(camera).normalize());
    assert.ok(ray.intersectObject(model,true).every(hit=>hit.distance>=15),'the hut does not cover the resident head');
    assert.equal(view.target.z<(b.z+1),rotation===0,'the camera targets the water-facing pier');
  }
});
