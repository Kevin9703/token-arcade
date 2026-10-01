import { freshTown, mockTotals, syncTown } from '../../src/town/store';
import { makeBuilding, key, canPlace } from '../../src/town/world';
import type { BuildingKind } from '../../src/town/types';
export function communityFixture() {
  const s=freshTown('demo');syncTown(s,mockTotals(5));s.chapterStars=[3,3,3,3,3,3];s.tutorialDone=true;s.settings.clockMode='fixed';s.settings.lighting='day';s.settings.season='spring';
  s.town.buildings=s.town.buildings.filter(b=>b.kind==='workshop');s.town.roads=[];
  const add=(id:string,kind:BuildingKind,x:number,z:number,rotation=0)=>{const b=makeBuilding(id,kind,x,z,rotation);if(canPlace(s,s.town,b))throw new Error(`${id}: ${canPlace(s,s.town,b)}`);s.town.buildings.push(b);};
  add('hall','hall',0,18,2);for(let i=0;i<4;i++)add('home-'+i,'house',4+i*2,15);
  add('bakery','bakery',12,15);add('near-park','park',8,18,2);add('river-park','park',2,13);add('far-park','park',14,18,2);
  add('field','wheatfield',10,18,2);add('mill','mill',15,21,2);add('food','restaurant',18,21,2);add('garden','vegetablefield',4,18,2);add('cow','cowshed',20,15);add('pig','pigpen',23,15);
  add('relic-well','oldwell',18,18,2);add('relic-lookout','woodlookout',20,18,2);add('relic-mill','oldmill',21,21,2);
  for(let x=0;x<=26;x++)s.town.roads.push(key(x,17));s.town.roads.push('3,15','3,16');for(let x=15;x<=24;x++)s.town.roads.push(key(x,20));s.town.roads.push('24,18','24,19');
  s.farm.bread=40;s.village.stock.food={meal:12,milk:10,carrot:16,potato:16,cheese:8,truffle:4};return s;
}
