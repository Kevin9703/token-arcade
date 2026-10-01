import test from 'node:test';
import assert from 'node:assert/strict';
import { Ray, Vector3 } from 'three';
import { describeResident, residentProfile } from '../../src/town/resident-info';
import { pickResident } from '../../src/town/resident-picking';
import { ResidentLife, homeForBuilding } from '../../src/town/resident-life';
import { PedestrianTraffic } from '../../src/town/pedestrians';
import { freshTown } from '../../src/town/store';
import { evaluate, makeBuilding, entrance } from '../../src/town/world';
import type { FarmJob } from '../../src/town/farming';
import type { FarmPhase } from '../../src/town/types';
import { buildingLabel } from '../../src/town/service-feedback';

function fixture() {
  const s=freshTown('demo');s.town.roads.push('6,17');
  const life=new ResidentLife(new PedestrianTraffic(evaluate(s.town).connectedRoads,9),s.town.buildings.filter(b=>b.kind==='house').map(homeForBuilding));
  const info=()=>describeResident(0,s,s.town,life)!;
  return {s,life,r:life.residents[0],info};
}
const job=(fieldId:string,phase:FarmPhase='harvesting',carrying:FarmJob['carrying']=null):FarmJob=>({fieldId,phase,carrying,target:{x:13,z:18},entrance:{x:13,z:18},harvesting:true});

test('all rendered neighbors have unique stable names and biographies, independent of jobs and saves',()=>{
  const profiles=Array.from({length:15},(_,i)=>residentProfile(i)!);
  assert.equal(new Set(profiles.map(p=>p.name)).size,15);assert.ok(profiles.every(p=>p.bio&&p.trait));
  assert.equal(residentProfile(-1),null);assert.equal(residentProfile(15),null);assert.equal(residentProfile(.5),null);
  const {s,life,r,info}=fixture(),before=JSON.stringify(s),identity=info();
  r.mode='working';life.jobs.set(0,job('unassigned'));const next=info();assert.equal(next.name,identity.name);assert.equal(next.bio,identity.bio);assert.equal(next.id,identity.id);assert.equal(JSON.stringify(s),before);
  assert.equal(describeResident(14,s,s.town,life),null);assert.equal(info().homeId,life.doors[r.home].id);
});

test('wheat workers report the actual mill, bakery and field for each production stage',()=>{
  const {s,life,r,info}=fixture(),field=makeBuilding('field','wheatfield',12,17),mill=makeBuilding('mill','mill',15,18),bakery=s.town.buildings.find(b=>b.kind==='bakery')!;
  s.town.buildings.push(field,mill);s.farm.runs.field={phase:'sowing',elapsed:0,millId:mill.id,bakeryId:bakery.id,batches:0};r.mode='working';
  const cases:[FarmPhase,string,string][]=[['sowing',field.id,'播种'],['growing',field.id,'麦苗'],['harvesting',field.id,'收割'],['to-mill',mill.id,'小麦'],['milling',mill.id,'面粉'],['to-bakery',bakery.id,'面粉'],['baking',bakery.id,'烘焙'],['returning',field.id,'麦田']];
  for(const [phase,id,action]of cases){life.jobs.set(0,job(field.id,phase));r.path=[];assert.equal(info().destination,buildingLabel(s.town.buildings.find(b=>b.id===id)!));assert.ok(info().intention.includes(action));}
  r.path=[{x:14,z:18}];life.jobs.set(0,job(field.id,'milling'));assert.equal(info().status,'前往风车磨坊');r.path=[];assert.equal(info().status,'把小麦磨成面粉');
});

test('production and deliveries identify real crops, recipes and destinations rather than a permanent profession',()=>{
  const {s,life,r,info}=fixture(),crop=makeBuilding('veggie','vegetablefield',12,17),kitchen=makeBuilding('kitchen','restaurant',18,19),mill=makeBuilding('mill','mill',15,18);
  s.town.buildings.push(crop,kitchen,mill);r.mode='working';s.village.runs.veggie={phase:'work',choice:'potato',elapsed:0,destination:kitchen.id,cargo:{},cycles:0};
  life.jobs.set(0,job('village-veggie-work'));assert.equal(info().status,'照料土豆');
  s.village.runs.veggie.phase='deliver';life.jobs.set(0,job('village-veggie-deliver','to-bakery','potato'));assert.equal(info().intention,'配送土豆');assert.equal(info().destination,buildingLabel(kitchen));
  s.village.runs.kitchen={phase:'work',choice:'soup',recipe:'fish',elapsed:0,destination:'',cargo:{},cycles:0};life.jobs.set(0,job('village-kitchen-work'));assert.equal(info().intention,'烹饪河谷炖鱼');
  life.jobs.set(0,job('village-flour-kitchen-deliver','to-bakery','flour'));assert.equal(info().destination,buildingLabel(kitchen));
  s.town.buildings.unshift(makeBuilding('other-mill','mill',2,4));const p=entrance(mill);life.jobs.set(0,{...job('village-flour-kitchen-work','milling'),entrance:{x:p.x+.5,z:p.z+.5}});assert.equal(info().destination,buildingLabel(mill));
  s.town.buildings.push(makeBuilding('fish','fishinghut',12,13));life.jobs.set(0,{...job('village-fish-work'),harvesting:false});assert.equal(info().intention,'到码头领取库存鲜鱼');
});

test('a selected neighbor follows doorstep, shop, seat and bedtime transitions without changing identity',()=>{
  const {s,life,r,info}=fixture(),name=info().name,home=s.town.buildings.find(b=>b.id===life.doors[r.home].id)!,bakery=s.town.buildings.find(b=>b.kind==='bakery')!;
  r.mode='visiting';r.visitId=`doorstep-${home.id}`;assert.equal(info().status,'前往住宅门前');assert.equal(info().destination,buildingLabel(home));
  r.mode='lingering';assert.equal(info().status,'在门前歇脚');r.visitId=bakery.id;assert.equal(info().status,'在晨光面包店停留');
  r.visitId='festival-1';assert.equal(info().destination,'镇公所前的庭院');
  const park=s.town.buildings.find(b=>b.kind==='park')!;r.visitId=`festival-${park.id}:1`;assert.equal(info().destination,buildingLabel(park));r.mode='visiting';assert.equal(info().status,'前往绿荫小公园');
  r.mode='seated';r.seat={id:'park-1:0',position:{x:0,z:0},via:{x:0,z:0},yaw:0,y:0};assert.equal(info().status,'坐着休息');
  r.mode='going-home';assert.equal(info().intention,'回家睡觉');r.mode='sleeping';r.visible=false;assert.equal(info().status,'在家睡觉');assert.equal(info().visible,false);assert.equal(info().name,name);
  r.mode='opening-out';assert.equal(info().status,'开门迎接清晨');
  r.mode='joining';s.settings.clockMode='fixed';s.settings.lighting='night';assert.equal(info().intention,'等道路安全后回家休息');assert.equal(info().destination,buildingLabel(home));
});

test('resident clicks choose the nearest visible person, accept resident zero and respect building occlusion',()=>{
  const ray=new Ray(new Vector3(0,.4,5),new Vector3(0,0,-1)),targets=[{id:0,position:new Vector3(0,0,1),visible:true},{id:1,position:new Vector3(0,0,0),visible:true}];
  assert.equal(pickResident(ray,targets),0);assert.equal(pickResident(ray,targets,3),null);targets[0].visible=false;assert.equal(pickResident(ray,targets),1);targets[1].visible=false;assert.equal(pickResident(ray,targets),null);
  assert.equal(pickResident(new Ray(new Vector3(2,.4,5),new Vector3(0,0,-1)),targets),null);
});
