import test from 'node:test';import assert from 'node:assert/strict';
import {freshTown} from '../../src/town/store';import {chapterGoals,evaluate,makeBuilding,parkRange,serviceDefinition,visualVariant} from '../../src/town/world';
import {missingHomeNeeds} from '../../src/town/home-needs';import {buildingCoverage} from '../../src/town/service-feedback';import {farmDuration} from '../../src/town/farming';
test('main town gains park and cafe coverage while fixed-inventory puzzles retain authored balance',()=>{
 const s=freshTown('demo');s.town.roads.push('6,17');const e=evaluate(s.town),park=s.town.buildings.find(b=>b.kind==='park')!;
 assert.equal(parkRange(s.town),6);assert.ok(buildingCoverage(s.town,e,park).homes.some(h=>h.distance>3&&h.served));
 assert.equal(serviceDefinition(s.town,'cafe').range,18);assert.equal(serviceDefinition(s.town,'cafe').capacity,8);
 assert.equal(serviceDefinition({...s.town,terrain:'meadow'},'cafe').range,10);assert.equal(parkRange({...s.town,terrain:'river'}),3);
});
test('need bubbles show connection first and introduce later needs by chapter',()=>{
 const s=freshTown('demo');let e=evaluate(s.town);assert.ok(missingHomeNeeds(s.town,e,1).every(b=>b.needs.join()==='道路'));
 s.town.roads.push('6,17');e=evaluate(s.town);assert.equal(missingHomeNeeds(s.town,e,1).length,0);
 assert.ok(missingHomeNeeds(s.town,e,3).some(b=>b.needs.includes('休闲')));
});
test('chapter five remains completable with arbitrarily long roads and has service-based extra stars',()=>{
 const e=evaluate(freshTown('demo').town);Object.assign(e,{satisfied:14,roadCount:180,northSatisfied:4,southSatisfied:10});
 const g=chapterGoals(5,e);assert.ok([...g.base,...g.bonus].every(g=>g.met));assert.ok(![...g.base,...g.bonus].some(g=>g.label.includes('道路')));
});
test('workshop styles are distinct for four projects without changing owned variant or saves',()=>{
 const s=freshTown('demo');s.projects=Array.from({length:4},(_,i)=>({id:String(i),name:String(i),provider:'kimi',tokens:0,credited:0}));
 const styles=s.projects.map(p=>visualVariant({...makeBuilding(p.id,'workshop',0,0),projectId:p.id},s));assert.equal(new Set(styles).size,4);
 assert.equal(farmDuration({} as any,'baking','spring'),3);
});
