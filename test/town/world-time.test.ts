import test from 'node:test';
import assert from 'node:assert/strict';
import { worldTime,atHour,DAY_SECONDS,SEASON_DAYS,SEASONS } from '../../src/town/world-time';
import { freshTown,parseTown,TownStore } from '../../src/town/store';
import { installLocalStorage } from '../helpers';
test('continuous time wraps midnight, gradually changes light, and cycles four seasons',()=>{
  const s=freshTown('demo');assert.equal(worldTime(0,s.settings).hour,9);
  for(let n=0;n<8;n++)assert.equal(worldTime(DAY_SECONDS*SEASON_DAYS*n,s.settings).season,SEASONS[n%4]);
  for(const hour of [6,12,19,20,23]){const time=atHour(0,hour),c=worldTime(time,s.settings);assert.ok(Math.abs(c.hour-hour)<.00001);assert.equal(c.sleep,hour>=20||hour<6);}
  const midnight=atHour(0,23)+DAY_SECONDS/24;assert.ok(worldTime(midnight,s.settings).hour<.00001);assert.equal(worldTime(midnight-.01,s.settings).day,1);assert.equal(worldTime(midnight,s.settings).day,2);assert.equal(worldTime(atHour(midnight,6),s.settings).day,2);
  for(let t=0;t<DAY_SECONDS;t+=.05){const a=worldTime(t,s.settings),b=worldTime(t+.05,s.settings);assert.ok(Math.abs(a.daylight-b.daylight)<.003);}
  s.settings.clockMode='fixed';s.settings.lighting='night';assert.equal(worldTime(0,s.settings).sleep,true);s.settings.season='winter';assert.equal(worldTime(0,s.settings).season,'winter');
});
test('old saves acquire clock defaults without changing their inventory or money; invalid clock data is rejected',()=>{
  const s=freshTown('demo'),legacy:any=structuredClone(s);delete legacy.worldSeconds;delete legacy.settings.clockMode;delete legacy.settings.season;
  const parsed=parseTown(JSON.stringify(legacy),'demo')!;assert.equal(parsed.worldSeconds,0);assert.equal(parsed.settings.clockMode,'cycle');assert.deepEqual(parsed.town,s.town);assert.equal(parsed.coins,s.coins);
  for(const update of [{worldSeconds:-1},{settings:{...s.settings,season:'moon'}},{settings:{...s.settings,clockMode:'fast'}}])assert.equal(parseTown(JSON.stringify({...s,...update}),'demo'),null);
});
test('time and season preferences persist in isolated slots without changing the economy',()=>{
  installLocalStorage();const store=new TownStore('demo'),before=store.state.coins;store.clock(371.2,true);store.updateSettings({season:'autumn'});const reloaded=new TownStore('demo');assert.equal(reloaded.state.worldSeconds,371.2);assert.equal(reloaded.state.settings.season,'autumn');assert.equal(reloaded.state.coins,before);assert.equal(new TownStore('live').state.worldSeconds,0);
});
test('clock-only checkpoints do not reject a pending building action in another window',()=>{
  installLocalStorage();const a=new TownStore('demo');a.syncDemo();const b=new TownStore('demo');a.clock(80,true);assert.equal(b.place('house',3,19,0),null);assert.equal(b.conflict,false);assert.equal(b.state.coins,a.state.coins-8);assert.equal(b.state.town.buildings.length,a.state.town.buildings.length+1);
});
