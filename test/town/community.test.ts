import test from 'node:test';
import assert from 'node:assert/strict';
import * as T from 'three';
import { communityFixture } from './community-fixture';
import { freshTown, parseTown, TownStore, TOWN_KEYS } from '../../src/town/store';
import { evaluate, entrance, key, canPlace } from '../../src/town/world';
import { STORIES, FESTIVALS, LANDMARKS, completeStory, storyGoals, prepareFestival, cancelFestival, celebrateFestival, tickRestoration, festivalGoals, restorationStatus } from '../../src/town/community';
import { buildingModel, packModel } from '../../src/town/models';
import { COMMUNITY_KINDS, setLandmarkState } from '../../src/town/community-models';
import { availableGoods, tickVillage } from '../../src/town/village';
import { PedestrianTraffic } from '../../src/town/pedestrians';
import { ResidentLife, homeForBuilding } from '../../src/town/resident-life';
import { farmChains, tickFarm, roadRoute } from '../../src/town/farming';
import { scheduledJobs } from '../../src/town/work-scheduler';
import { installLocalStorage } from '../helpers';
import { PUZZLES } from '../../src/town/puzzles';

test('three stories with nine total steps require real home services and stock, retain instance anchors and never reward coins',()=>{
  const s=communityFixture(),coins=s.coins,e=evaluate(s.town),homes=['home-1','home-2','home-0'];
  for(const [i,t] of STORIES.entries()){
    assert.equal(completeStory(s,e,t.id,0,homes[i]),'');
    const bread=s.farm.bread;assert.equal(completeStory(s,e,t.id,1,homes[i]),'');assert.equal(s.farm.bread,bread-2);
    assert.ok(storyGoals(s,e,t.id).every(g=>g.met),t.id);assert.equal(completeStory(s,e,t.id,2),'');
    const snapshot=JSON.stringify(s);assert.match(completeStory(s,e,t.id,2),/已经记录/);assert.equal(JSON.stringify(s),snapshot);
  }
  assert.equal(s.coins,coins);assert.ok(parseTown(JSON.stringify(s),'demo'));assert.equal(s.farm.bread,34);
  const beginner=freshTown('demo');beginner.town.roads.push('6,17');assert.equal(completeStory(beginner,evaluate(beginner.town),'resident-0',0,'home-1'),'');assert.equal(beginner.coins,0);
});
test('story progress counts actual rotated doors, green distance and a connected nearby footprint, not building quantity',()=>{
  const s=communityFixture();completeStory(s,evaluate(s.town),'resident-4',0,'home-2');completeStory(s,evaluate(s.town),'resident-4',1);
  const home=s.town.buildings.find(b=>b.id==='home-2')!,entry=entrance(home);s.town.roads=s.town.roads.filter(k=>k!==key(entry.x,entry.z));
  assert.ok(storyGoals(s,evaluate(s.town),'resident-4').some(g=>!g.met));assert.match(completeStory(s,evaluate(s.town),'resident-4',2),/小家|食物/);
  s.town.roads.push(key(entry.x,entry.z));home.placed=false;assert.ok(storyGoals(s,evaluate(s.town),'resident-4').some(g=>!g.met));home.placed=true;
  assert.equal(completeStory(s,evaluate(s.town),'resident-4',2),'');
});
test('festival supplies are escrowed once, survive seasons and cancellation returns actual goods exactly once',()=>{
  const s=communityFixture(),e=evaluate(s.town),before=availableGoods(s,e),coins=s.coins;
  assert.equal(prepareFestival(s,e,'summer'),'');const saved=JSON.stringify(s);assert.match(prepareFestival(s,e,'spring'),/已准备/);assert.equal(JSON.stringify(s),saved);
  assert.match(celebrateFestival(s,e,'near-park','winter'),/对应季节/);assert.equal(JSON.stringify(s),saved);assert.ok(parseTown(saved,'demo'));
  cancelFestival(s);assert.deepEqual(availableGoods(s,e),before);const cancelled=JSON.stringify(s);cancelFestival(s);assert.equal(JSON.stringify(s),cancelled);assert.equal(s.coins,coins);
  s.farm.bread=0;s.village.stock={};const empty=JSON.stringify(s);assert.match(prepareFestival(s,e,'spring'),/还缺/);assert.equal(JSON.stringify(s),empty);
});
test('all four festivals have reachable base and better layouts; stars remain permanent and consume a new basket for each event',()=>{
  const s=communityFixture(),e=evaluate(s.town),coins=s.coins;
  assert.ok(festivalGoals(s,e,'far-park').every(g=>g.met));assert.ok(festivalGoals(s,e,'far-park',true).some(g=>!g.met));assert.ok(festivalGoals(s,e,'near-park',true).every(g=>g.met));
  for(const f of FESTIVALS){assert.equal(prepareFestival(s,e,f.id),'');assert.equal(celebrateFestival(s,e,'far-park',f.id),'');assert.equal(s.community.festivalStars[f.id],1);
    assert.equal(prepareFestival(s,e,f.id),'');assert.equal(celebrateFestival(s,e,'near-park',f.id),'');assert.equal(s.community.festivalStars[f.id],2);}
  assert.equal(s.farm.bread,8);assert.equal(s.coins,coins);assert.ok(parseTown(JSON.stringify(s),'demo'));
});
test('relics debit only on pickup, deliver only on arrival, pause at night or outages and finish repair on site',()=>{
  installLocalStorage();const store=new TownStore('demo');store.state=communityFixture();store.commit();const id='relic-well',coins=store.state.coins;assert.equal(store.beginRestoration(id),'');
  let s=store.state,e=evaluate(s.town),jobs=tickRestoration(s,e,.1,false,new Set()),r=s.community.restorations[id];assert.equal(s.farm.bread,40);
  jobs=tickRestoration(s,e,.1,false,new Set(jobs.map(j=>j.fieldId)));assert.equal(s.farm.bread,38);assert.deepEqual(r.cargo,{bread:2});assert.deepEqual(r.delivered,{});
  const carrying=JSON.stringify(r);tickRestoration(s,e,50,true,new Set(jobs.map(j=>j.fieldId)));assert.equal(JSON.stringify(r),carrying);
  const b=s.town.buildings.find(b=>b.id===id)!;s.town.roads=s.town.roads.filter(k=>k!==key(entrance(b).x,entrance(b).z));e=evaluate(s.town);tickRestoration(s,e,50,false,new Set(jobs.map(j=>j.fieldId)));assert.equal(JSON.stringify(r),carrying);
  s.town.roads.push(key(entrance(b).x,entrance(b).z));e=evaluate(s.town);jobs=tickRestoration(s,e,.1,false,new Set(jobs.map(j=>j.fieldId)));assert.deepEqual(r.delivered,{bread:2});assert.deepEqual(r.cargo,{});
  for(let frame=0;frame<1000&&r.phase!=='done';frame++)jobs=tickRestoration(s,e,.1,false,new Set(jobs.map(j=>j.fieldId)));
  assert.equal(r.phase,'done');assert.equal(s.farm.bread,36);assert.equal(s.community.activeRestoration,null);assert.equal(s.coins,coins);store.commit();assert.ok(parseTown(JSON.stringify(s),'demo'));assert.equal(new TownStore('demo').state.community.restorations[id].phase,'done');
});
test('one physical worker carries relic supplies through the bakery door; three-worker budget, actor identity and night sleep are preserved',()=>{
  installLocalStorage();const store=new TownStore('demo');store.state=communityFixture();store.commit();assert.equal(store.beginRestoration('relic-well'),'');
  const s=store.state,e=evaluate(s.town),traffic=new PedestrianTraffic(e.connectedRoads,9),life=new ResidentLife(traffic,s.town.buildings.filter(b=>b.kind==='house').map(homeForBuilding)),actors=[...traffic.people];life.setBuildings(s.town.buildings);life.setPlaces([],e.connectedRoads);
  const nearest=(p:any)=>[...e.connectedRoads].map(k=>{const[x,z]=k.split(',').map(Number);return{x:x+.5,z:z+.5};}).sort((a,b)=>Math.hypot(a.x-p.x,a.z-p.z)-Math.hypot(b.x-p.x,b.z-p.z))[0];let seenCargo=false,opened=false;const workers=new Set<number>();
  for(let frame=0;frame<10000&&s.community.restorations['relic-well'].phase!=='done';frame++){
    const ready=new Set<string>();for(const[i,j]of life.jobs){const p=traffic.people[i],r=life.residents[i];if(r.mode==='working'&&!r.path.length&&Math.hypot(p.x-j.target.x,p.z-j.target.z)<.15)ready.add(j.fieldId);if(j.chainId){workers.add(i);seenCargo ||= Boolean(j.carrying);}}
    const repair=tickRestoration(s,e,.05,false,ready),farm=tickFarm(farmChains(s.town,e,s.farm),s.farm,.05,false,'spring',ready),jobs=scheduledJobs(farm,repair);assert.ok(jobs.length<=3);life.assignJobs(jobs,(p,to)=>roadRoute(e.connectedRoads,nearest(p),to));life.update(.05,false);opened ||= (life.portals.get('bakery')?.open||0)>.5;
  }
  assert.equal(s.community.restorations['relic-well'].phase,'done');assert.ok(seenCargo&&opened);assert.equal(workers.size,1);assert.ok(traffic.people.every((p,i)=>p===actors[i]));
  life.assignJobs([],(p,to)=>roadRoute(e.connectedRoads,nearest(p),to));for(let i=0;i<5000;i++)life.update(.05,true);assert.ok(life.residents.every(r=>r.mode==='sleeping'));
});
test('community migration and malformed stories, escrow, duplicated relics and impossible cargo are validated without resetting saves',()=>{
  const s=communityFixture(),raw=JSON.parse(JSON.stringify(s));delete raw.community;const migrated=parseTown(JSON.stringify(raw),'demo')!;assert.deepEqual(migrated.town,s.town);assert.equal(migrated.coins,s.coins);assert.deepEqual(migrated.village,s.village);
  for(const corrupt of [(c:any)=>c.stories['resident-0']={step:4,homeId:'home-0'},(c:any)=>c.festival={id:'spring',supplies:{bread:999}},(c:any)=>c.festivalStars.winter=3,(c:any)=>c.activeRestoration='missing']){const bad=structuredClone(s);corrupt(bad.community);assert.equal(parseTown(JSON.stringify(bad),'demo'),null);}
  const bad=structuredClone(s);bad.town.buildings.push({...bad.town.buildings.find(b=>b.kind==='oldwell')!,id:'duplicate',placed:false});assert.equal(parseTown(JSON.stringify(bad),'demo'),null);
  const cargo=structuredClone(s);cargo.community.activeRestoration='relic-well';cargo.community.restorations['relic-well']={phase:'deliver',sourceId:'bakery',good:'bread',cargo:{bread:3},delivered:{},elapsed:0};assert.equal(parseTown(JSON.stringify(cargo),'demo'),null);
  cargo.community.activeRestoration=null;cargo.community.restorations['relic-well']={phase:'done',sourceId:'',good:null,cargo:{},delivered:{bread:4},elapsed:0};assert.equal(parseTown(JSON.stringify(cargo),'demo'),null);
});
test('stale windows cannot duplicate story claims or festival stock; production checkpoints merge before material transactions',()=>{
  installLocalStorage();const first=new TownStore('demo');first.state=communityFixture();first.commit();const second=new TownStore('demo');
  assert.equal(first.claimStory('resident-0',0,'home-1'),'');assert.match(second.claimStory('resident-0',0,'home-1'),/记录已更新/);assert.match(second.claimStory('resident-0',0,'home-1'),/已经记录/);
  assert.equal(first.prepareFestival('spring'),'');const disk=JSON.parse(localStorage.getItem(TOWN_KEYS.demo)!);assert.equal(disk.farm.bread,36);assert.match(second.prepareFestival('spring'),/记录已更新/);assert.match(second.prepareFestival('spring'),/已准备/);assert.equal(JSON.parse(localStorage.getItem(TOWN_KEYS.demo)!).farm.bread,36);
  const checkpoint=new TownStore('demo');checkpoint.state.farm.bread=38;checkpoint.state.farm.activeSeconds+=1;checkpoint.commit(false);assert.equal(first.claimStory('resident-0',1),'');assert.equal(first.state.farm.bread,36);
  first.enterPuzzle(PUZZLES[0].id);
  assert.match(first.claimStory('resident-0',2),/主城/);
  assert.match(first.prepareFestival('winter'),/主城/);
  assert.equal(first.state.community.stories['resident-0'].step,2);
});
test('ten distinct full models retain repair states and fan through packing; four variants fit all rotated foundations',()=>{
  const s=communityFixture();for(const kind of COMMUNITY_KINDS)for(let variant=0;variant<4;variant++){
    const model=packModel(buildingModel(kind,variant)),bounds=new T.Box3().setFromObject(model);assert.ok(model.children.length>0&&Number.isFinite(bounds.max.y));assert.ok(bounds.min.y>=0&&bounds.max.y<3,kind);
    if(LANDMARKS.some(d=>d.kind===kind)){assert.ok(model.getObjectByName('landmark-restored')&&model.getObjectByName('landmark-ruin'));setLandmarkState(model,false);assert.equal(model.getObjectByName('landmark-restored')!.visible,false);setLandmarkState(model,true);assert.equal(model.getObjectByName('landmark-ruin')!.visible,false);}
    for(let rotation=0;rotation<4;rotation++)assert.equal(canPlace(s,s.town,{id:'new',kind,x:5,z:32,rotation,placed:true,variant}),null);
  }
  assert.ok(packModel(buildingModel('oldmill')).getObjectByName('landmark-fan'));
  assert.match(restorationStatus(s,evaluate(s.town),'relic-well'),/开始修复/);
});
test('all three relics have connected solutions, consume their exact supplies and remain unique free inventory instances',()=>{
  installLocalStorage();const store=new TownStore('demo');store.state=communityFixture();store.commit();
  const e=evaluate(store.state.town),before=availableGoods(store.state,e),coins=store.state.coins;
  for(const def of LANDMARKS){
    const b=store.state.town.buildings.find(b=>b.kind===def.kind)!;assert.ok(e.buildings[b.id].connected);
    assert.match(store.acquireLandmark(def.kind),/已经/);assert.equal(store.beginRestoration(b.id),'');
    const other=store.state.town.buildings.find(o=>LANDMARKS.some(d=>d.kind===o.kind)&&o.id!==b.id&&!store.state.community.restorations[o.id]);if(other)assert.match(store.beginRestoration(other.id),/当前遗址/);
    let jobs=tickRestoration(store.state,e,.1,false,new Set()),r=store.state.community.restorations[b.id];
    for(let i=0;i<1000&&r.phase!=='done';i++){for(const j of jobs){const hall=store.state.town.buildings.find(b=>b.kind==='hall')!,p=entrance(hall);assert.ok(roadRoute(e.connectedRoads,{x:p.x+.5,z:p.z+.5},j.entrance).length);}jobs=tickRestoration(store.state,e,.1,false,new Set(jobs.map(j=>j.fieldId)));}
    assert.equal(r.phase,'done');assert.deepEqual(r.delivered,def.needs);assert.equal(r.elapsed,def.seconds);assert.ok(parseTown(JSON.stringify(store.state),'demo'));
    const id=b.id;assert.equal(store.stash(id),true);assert.equal(store.state.town.buildings.filter(o=>o.kind===def.kind).length,1);assert.equal(store.place(def.kind,b.x,b.z,b.rotation,id),null);assert.equal(store.state.community.restorations[id].phase,'done');
  }
  const after=availableGoods(store.state,e);assert.equal(after.bread,(before.bread||0)-12);assert.equal(after.milk,(before.milk||0)-2);assert.equal(after.meal,(before.meal||0)-2);assert.equal(store.state.coins,coins);
});
test('relic delivery and repair checkpoints merge across windows without rejecting an unrelated layout action',()=>{
  installLocalStorage();const first=new TownStore('demo');first.state=communityFixture();first.commit();first.beginRestoration('relic-well');const other=new TownStore('demo'),e=evaluate(first.state.town);
  let jobs=tickRestoration(first.state,e,.1,false,new Set());jobs=tickRestoration(first.state,e,.1,false,new Set(jobs.map(j=>j.fieldId)));first.commit(false);
  assert.ok(other.commit(false));assert.deepEqual(other.state.community.restorations['relic-well'].cargo,{bread:2});assert.equal(other.state.farm.bread,38);
  jobs=tickRestoration(first.state,e,.1,false,new Set(jobs.map(j=>j.fieldId)));for(let i=0;i<1000&&first.state.community.activeRestoration;i++)jobs=tickRestoration(first.state,e,.1,false,new Set(jobs.map(j=>j.fieldId)));first.commit(false);
  assert.ok(other.commit(false));assert.equal(other.state.community.restorations['relic-well'].phase,'done');assert.equal(other.state.community.activeRestoration,null);assert.equal(other.state.farm.bread,36);
});
test('all three physical repairs finish while farming, livestock and the restaurant compete for the shared three workers',()=>{
  installLocalStorage();const store=new TownStore('demo');store.state=communityFixture();store.commit();const s=store.state,e=evaluate(s.town);
  const traffic=new PedestrianTraffic(e.connectedRoads,11),life=new ResidentLife(traffic,s.town.buildings.filter(b=>b.kind==='house').map(homeForBuilding));life.setBuildings(s.town.buildings);life.setPlaces([],e.connectedRoads);
  const nearest=(p:any)=>[...e.connectedRoads].map(k=>{const[x,z]=k.split(',').map(Number);return{x:x+.5,z:z+.5};}).sort((a,b)=>Math.hypot(a.x-p.x,a.z-p.z)-Math.hypot(b.x-p.x,b.z-p.z))[0];
  for(const def of LANDMARKS){const b=s.town.buildings.find(b=>b.kind===def.kind)!;assert.equal(store.beginRestoration(b.id),'');const workers=new Set<number>();
    for(let frame=0;frame<20000&&s.community.activeRestoration;frame++){
      const ready=new Set<string>();for(const[i,j]of life.jobs){const p=traffic.people[i],r=life.residents[i];if(r.mode==='working'&&!r.path.length&&Math.hypot(p.x-j.target.x,p.z-j.target.z)<.15)ready.add(j.fieldId);if(j.chainId)workers.add(i);}
      const farm=tickFarm(farmChains(s.town,e,s.farm),s.farm,.05,false,'spring',ready),village=tickVillage(s,e,.05,false,'spring',ready),repair=tickRestoration(s,e,.05,false,ready),jobs=scheduledJobs(farm,[...village,...repair]);assert.ok(jobs.length<=3);life.assignJobs(jobs,(p,to)=>roadRoute(e.connectedRoads,nearest(p),to));life.update(.05,false);
    }
    assert.equal(s.community.restorations[b.id].phase,'done',def.kind);assert.deepEqual(s.community.restorations[b.id].delivered,def.needs);assert.equal(workers.size,1,def.kind+' retains its courier');
  }
});
test('chapter-gated relic acquisition is free, starts in storage and cannot create duplicate instances',()=>{
  installLocalStorage();const store=new TownStore('demo'),original=structuredClone(store.state.town);assert.match(store.acquireLandmark('oldwell'),/完成第/);store.state.chapterStars[0]=1;store.commit();
  assert.equal(store.acquireLandmark('oldwell'),'');const relic=store.state.town.buildings.find(b=>b.kind==='oldwell')!;assert.equal(relic.placed,false);assert.equal(store.state.coins,0);assert.deepEqual(store.state.town.roads,original.roads);assert.deepEqual(store.state.town.buildings.filter(b=>b.id!==relic.id),original.buildings);
  assert.equal(store.place('oldwell',14,18,0,relic.id),null);assert.equal(store.rotate(relic.id),null);assert.ok(store.stash(relic.id));assert.match(store.acquireLandmark('oldwell'),/已经/);assert.equal(store.state.town.buildings.filter(b=>b.kind==='oldwell').length,1);assert.equal(new TownStore('demo').state.town.buildings.find(b=>b.kind==='oldwell')!.id,relic.id);
});
