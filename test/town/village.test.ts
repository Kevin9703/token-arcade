import test from 'node:test';import assert from 'node:assert/strict';import * as T from 'three';
import {freshTown,syncTown,mockTotals,parseTown,TownStore} from '../../src/town/store';
import {evaluate,canPlace,entrance,makeBuilding,key} from '../../src/town/world';
import {tickVillage,stationRun,availableGoods,completeOrder,productionDuration,stationProblem,ORDERS,PRODUCTION_KINDS} from '../../src/town/village';
import {farmChains,tickFarm,roadRoute} from '../../src/town/farming';
import {scheduledJobs} from '../../src/town/work-scheduler';
import {PedestrianTraffic} from '../../src/town/pedestrians';import {ResidentLife,homeForBuilding} from '../../src/town/resident-life';
import {buildingModel,packModel} from '../../src/town/models';import {installLocalStorage} from '../helpers';
export function villageFixture(){const s=freshTown('demo');syncTown(s,mockTotals(5));s.chapterStars=[3,3,3,3,3,3];s.tutorialDone=true;
 const add=(id:string,kind:any,x:number,z:number,r=0)=>{const b=makeBuilding(id,kind,x,z,r);assert.equal(canPlace(s,s.town,b),null,id);s.town.buildings.push(b);return b;};
 s.town.roads.push('6,17');for(let x=12;x<=23;x++)s.town.roads.push(key(x,16));for(let x=10;x<=23;x++)s.town.roads.push(key(x,17));
 add('field','wheatfield',12,14);add('mill','mill',15,18,2);add('garden','vegetablefield',18,14);add('cow','cowshed',18,18,2);add('pig','pigpen',21,18,2);add('food','restaurant',12,18,2);add('fish','fishinghut',22,13);s.town.roads.push('23,15','11,18','11,19','11,20','10,20');add('green','greenhouse',9,21,2);
 stationRun(s.village,s.town.buildings.find(b=>b.id==='garden')!).choice='potato';assert.ok(parseTown(JSON.stringify(s),'demo'));return s;}
const step=(s:ReturnType<typeof freshTown>,n:number,season:'spring'|'winter'|'autumn'='spring')=>{let jobs=tickVillage(s,evaluate(s.town),0,false,season,new Set());for(let i=0;i<n;i++)jobs=tickVillage(s,evaluate(s.town),.5,false,season,new Set(jobs.map(j=>j.fieldId)));return jobs;};
test('seasonal vegetables, animal goods, fishing and all recipes create delivered real inventory',()=>{
 const s=villageFixture();s.farm.flour=20;step(s,1200);assert.ok(s.village.stock.food.potato!>0);assert.ok(s.village.stock.food.fish!>0);assert.ok(s.village.stock.food.meal!>0);assert.ok(s.village.stock.cow.milk!>=1);
 const cow=s.town.buildings.find(b=>b.id==='cow')!;stationRun(s.village,cow).choice='cheese';step(s,100);assert.ok((s.village.stock.food.cheese||s.village.stock.cow.cheese||0)>0);
 for(const recipe of ['cheese','fish']){const run=s.village.runs.food;run.elapsed=0;run.cargo={};run.choice=recipe;step(s,100);assert.ok((s.village.stock.food.meal||0)>=2);}
 assert.ok(availableGoods(s,evaluate(s.town)).truffle!>0);assert.equal(s.coins,s.tokenCoins);assert.ok(parseTown(JSON.stringify(s),'demo'));
});
test('production requires arrival, preserves goods at night, through road breaks and reload',()=>{
 const s=villageFixture(),e=evaluate(s.town);const before=JSON.stringify(s.village);tickVillage(s,e,100,false,'spring',new Set());assert.equal(s.village.runs.garden.elapsed,0);assert.equal(s.village.stock.garden.potato,undefined);
 step(s,24);const saved=JSON.stringify(s.village);tickVillage(s,e,100,true,'spring',new Set(Object.keys(s.village.runs)));assert.equal(JSON.stringify(s.village),saved);
 s.town.roads=s.town.roads.filter(k=>k!=='19,16');const paused=JSON.stringify(s.village.runs.garden);step(s,50);assert.equal(JSON.stringify(s.village.runs.garden),paused);assert.ok(stationProblem(s,evaluate(s.town),s.town.buildings.find(b=>b.id==='garden')!,'spring').includes('连'));
 const restored=parseTown(JSON.stringify(s),'demo')!;assert.deepEqual(restored.village,s.village);s.town.roads.push('19,16');step(s,50);assert.notEqual(JSON.stringify(s.village.runs.garden),paused);assert.notEqual(JSON.stringify(s.village),before);
});
test('winter pauses only outdoor growth, greenhouse continues and seasonal choices matter',()=>{
 const s=villageFixture();step(s,100,'winter');assert.equal(s.village.runs.garden.elapsed,0);assert.ok((s.village.stock.food.carrot||0)>0);
 const garden=s.town.buildings.find(b=>b.id==='garden')!;assert.ok(productionDuration(garden,'carrot','spring')<productionDuration(garden,'potato','spring'));assert.ok(productionDuration(garden,'potato','spring')>productionDuration(garden,'potato','summer'));
});
test('three authored orders consume actual reachable stock, repeat rewards never mint money, cancellation costs nothing',()=>{
 installLocalStorage();const store=new TownStore('demo');store.state=villageFixture();store.state.farm.bread=32;store.state.village.stock.food={meal:2,milk:1,carrot:4,potato:4,cheese:2,truffle:2};
 const coins=store.state.coins;store.selectOrder('picnic');const before=JSON.stringify(store.state.village.stock);store.selectOrder(null);assert.equal(JSON.stringify(store.state.village.stock),before);
 assert.equal(store.fulfillOrder('bread'),'');assert.equal(store.fulfillOrder('bread'),'');assert.equal(store.state.farm.bread,24);assert.equal(store.unlockedKind('apronstand'),true);assert.equal(store.state.coins,coins);
 assert.equal(store.fulfillOrder('picnic'),'');assert.equal(store.unlockedKind('harvesttable'),true);
 assert.match(completeOrder(store.state,evaluate(store.state.town),'harvest','spring'),/秋天/);assert.equal(completeOrder(store.state,evaluate(store.state.town),'harvest','autumn'),'');assert.ok(ORDERS.every(o=>store.unlockedKind(o.reward)));
 const old=JSON.stringify(store.state);assert.match(completeOrder(store.state,evaluate(store.state.town),'picnic','spring'),/还缺/);assert.equal(JSON.stringify(store.state),old);
 assert.ok(parseTown(JSON.stringify(store.state),'demo'));assert.equal(new TownStore('demo').state.village.completed.bread,2);
});
test('fishing huts validate both banks, actual rotated land entrance and shoreline placement',()=>{
 const s=freshTown('demo');s.chapterStars=[1,1,1,1,1,1];
 assert.equal(canPlace(s,s.town,makeBuilding('f','fishinghut',18,13,0)),null);assert.equal(canPlace(s,s.town,makeBuilding('f','fishinghut',18,9,2)),null);
 assert.match(canPlace(s,s.town,makeBuilding('f','fishinghut',18,17,0))!,/靠河/);assert.match(canPlace(s,s.town,makeBuilding('f','fishinghut',18,13,2))!,/门朝陆地/);
});
test('new optional state migrates without changing money/layout; corrupt commodity ledgers are rejected',()=>{
 const s=villageFixture(),old=JSON.parse(JSON.stringify(s));delete old.village;const migrated=parseTown(JSON.stringify(old),'demo')!;assert.equal(migrated.coins,s.coins);assert.deepEqual(migrated.town,s.town);assert.equal(migrated.farm.bread,s.farm.bread);
 s.village.stock.garden={potato:-1};assert.equal(parseTown(JSON.stringify(s),'demo'),null);
});
test('distinct full models retain animated livestock, crops, piers and bounded footprints on all sides',()=>{
 for(const kind of [...PRODUCTION_KINDS,'apronstand','harvesttable','wheatbanner'] as const){const model=packModel(buildingModel(kind));assert.ok(model.children.length,kind);const bounds=new T.Box3().setFromObject(model);assert.ok(bounds.min.y>=-.5&&bounds.max.y<3,kind);assert.ok(Number.isFinite(bounds.max.x));if(kind==='cowshed')assert.ok(model.getObjectByName('cow-0')?.children.length);if(kind==='pigpen')assert.ok(model.getObjectByName('pig-0')?.children.length);if(kind==='vegetablefield')assert.ok(model.getObjectByName('vegetable-crops')?.children.length);}
});
test('three physical workers complete a farm and delivered meal cycle, retain actors, and go home at night',()=>{
 const s=villageFixture(),e=evaluate(s.town),traffic=new PedestrianTraffic(e.connectedRoads,9),life=new ResidentLife(traffic,s.town.buildings.filter(b=>b.kind==='house').map(homeForBuilding));life.setPlaces([],e.connectedRoads);const actors=[...traffic.people],chains=farmChains(s.town,e,s.farm);
 const nearest=(p:any)=>[...e.connectedRoads].map(k=>{const [x,z]=k.split(',').map(Number);return {x:x+.5,z:z+.5};}).sort((a,b)=>Math.hypot(a.x-p.x,a.z-p.z)-Math.hypot(b.x-p.x,b.z-p.z))[0];
 for(let frame=0;frame<20*1200;frame++){const ready=new Set<string>();for(const [i,j]of life.jobs){const p=traffic.people[i];if(life.residents[i].mode==='working'&&!life.residents[i].path.length&&Math.hypot(p.x-j.target.x,p.z-j.target.z)<.15)ready.add(j.fieldId);}
  const jobs=scheduledJobs(tickFarm(chains,s.farm,.05,false,'spring',ready),tickVillage(s,e,.05,false,'spring',ready));assert.ok(jobs.length<=3);life.assignJobs(jobs,(p,to)=>roadRoute(e.connectedRoads,nearest(p),to));life.update(.05,false);
 }
 assert.ok(s.farm.bread>=4,JSON.stringify({farm:s.farm,jobs:[...life.jobs],residents:life.residents.map((r,i)=>({mode:r.mode,path:r.path,p:traffic.people[i]}))}));assert.ok((s.village.stock.food.meal||0)>=2,JSON.stringify({village:s.village,jobs:[...life.jobs],residents:life.residents.map((r,i)=>({mode:r.mode,path:r.path,p:traffic.people[i]}))}));assert.ok(traffic.people.every((p,i)=>p===actors[i]));
 life.assignJobs([],()=>[]);for(let frame=0;frame<20*150;frame++)life.update(.05,true);assert.ok(life.residents.every(r=>r.mode==='sleeping'),JSON.stringify(life.residents.map((r,i)=>({r,p:traffic.people[i]}))));
});

test('recipe batches debit their own ingredients exactly once, including a queued recipe change',()=>{
 installLocalStorage();const store=new TownStore('demo');store.state=villageFixture();const food=store.state.town.buildings.find(b=>b.id==='food')!;
 for(const b of store.state.town.buildings)if(PRODUCTION_KINDS.includes(b.kind)&&b.id!=='food')b.placed=false;
 const s=store.state,e=evaluate(s.town);s.village.stock.food={potato:3,flour:1,carrot:2,cheese:1,fish:1};stationRun(s.village,food);
 tickVillage(s,e,1,false,'spring',new Set(['village-food-work']));assert.deepEqual(s.village.runs.food.cargo,{potato:2,flour:1});store.chooseProduction('food','cheese');assert.equal(s.village.runs.food.choice,'soup');assert.equal(s.village.runs.food.nextChoice,'cheese');
 for(let n=0;n<3;n++)tickVillage(s,e,1,false,'spring',new Set(['village-food-work']));assert.equal(s.village.stock.food.meal,2);assert.equal(s.village.runs.food.choice,'cheese');
 for(let n=0;n<4;n++)tickVillage(s,e,1,false,'spring',new Set(['village-food-work']));assert.equal(s.village.stock.food.meal,4);assert.equal(s.village.stock.food.carrot,0);assert.equal(s.village.stock.food.cheese,0);
 store.chooseProduction('food','fish');for(let n=0;n<4;n++)tickVillage(s,e,1,false,'spring',new Set(['village-food-work']));assert.equal(s.village.stock.food.meal,6);assert.equal(s.village.stock.food.potato,0);assert.equal(s.village.stock.food.fish,0);assert.equal(s.village.stock.food.flour,0);
});
test('village-only checkpoints merge goods during placement, while deliberate production choices remain user progress',()=>{
 installLocalStorage();const first=new TownStore('demo');first.importSave(JSON.stringify(villageFixture()));const second=new TownStore('demo');
 first.state.village.stock.food={potato:2};first.state.village.activeSeconds=20;first.commit(false);assert.equal(second.place('tree',0,13),null);assert.equal(second.conflict,false);assert.equal(second.state.village.stock.food.potato,2);
 const third=new TownStore('demo'),fourth=new TownStore('demo');stationRun(third.state.village,third.state.town.buildings.find(b=>b.id==='food')!);third.chooseProduction('food','fish');assert.equal(fourth.place('tree',0,14),null);assert.equal(fourth.conflict,true);assert.equal(fourth.state.village.choices.food,'fish');assert.ok(!fourth.state.town.buildings.some(b=>b.kind==='tree'&&b.z===14));
});
test('an order adopts a newer production checkpoint before consuming stock and cannot duplicate its reward',()=>{
 installLocalStorage();const first=new TownStore('demo');first.importSave(JSON.stringify(villageFixture()));const second=new TownStore('demo');first.state.farm.bread=4;first.state.farm.activeSeconds=10;first.commit(false);
 assert.equal(second.fulfillOrder('bread'),'');assert.equal(second.state.farm.bread,0);assert.equal(second.state.village.completed.bread,1);assert.match(first.fulfillOrder('bread'),/更新/);assert.equal(first.state.village.completed.bread,1);assert.equal(first.state.farm.bread,0);
});
test('import rejects fishing huts moved inland or pointed through the water',()=>{
 const s=villageFixture(),hut=s.town.buildings.find(b=>b.id==='fish')!;hut.rotation=2;assert.equal(parseTown(JSON.stringify(s),'demo'),null);hut.rotation=0;hut.x=0;hut.z=22;assert.equal(parseTown(JSON.stringify(s),'demo'),null);
});

test('delivery completion and surplus flour pickup advance their checkpoint even on a phase boundary',()=>{
 const s=villageFixture(),e=evaluate(s.town);s.village.runs['flour-food']={phase:'work',elapsed:0,destination:'food',cargo:{},cycles:0,choice:'flour'};s.farm.flour=1;
 const before=s.farm.activeSeconds;tickVillage(s,e,1,false,'spring',new Set(['village-flour-food-work']));assert.equal(s.farm.flour,0);assert.ok(s.farm.activeSeconds>before);assert.equal(s.village.activeSeconds,1);
 tickVillage(s,e,1,false,'spring',new Set(['village-flour-food-deliver']));assert.equal(s.village.stock.food.flour,1);assert.equal(s.village.activeSeconds,2);
});
