import { availableGoods, GOODS, loadingSpot, type Basket, type Good } from './village';
import { dimensions, edgeDistance, entrance, key, pathDistances } from './world';
import type { Building, BuildingKind, Evaluation, Goal, TownState } from './types';
import type { FarmJob } from './farming';
import type { Season } from './world-time';
import { DOOR_SPECS } from './doorways';

export const STORIES = [
  { id: 'resident-0', index: 0, title: '麦香里的新家', reward: 'herbshelf' as BuildingKind,
    chapters: ['认一认家门', '分享第一炉面包', '田野就在身旁'],
    dialogue: ['先把门前接上路吧，清晨能去买面包，就像有了自己的家。', '镇里的麦子也烤成面包了吗？留两份，我们一起尝尝。', '想在家旁边看着麦苗长大。再留一片绿地，忙完就能歇歇。'],
    thanks: ['沿街闻到面包香了，谢谢你。', '这是属于河谷的麦香。', '窗外有麦苗，也有能歇脚的绿荫。这座小镇越来越像家了。'] },
  { id: 'resident-4', index: 4, title: '树荫下的一页书', reward: 'readingnook' as BuildingKind,
    chapters: ['熟悉这条街', '午后的点心', '找个安静的角落'],
    dialogue: ['想先熟悉门前的街道，再看看哪儿能买到面包。', '读故事时有两份面包作点心，邻居们也会愿意坐下来听吧。', '在家旁边安排一座连路的公园或长椅吧，离家三格内就能走过去。'],
    thanks: ['我已经认得回家的路了。', '点心准备好了，下次讲一个长一点的故事。', '谢谢你为河谷留了一处可以慢慢读书的地方。'] },
  { id: 'resident-8', index: 8, title: '听见河水的地方', reward: 'riverstones' as BuildingKind,
    chapters: ['回家的路', '带上热面包', '河边的绿荫'],
    dialogue: ['散步回来，希望能沿着路走到家，也能买到一份面包。', '带两份面包去河边，坐下来听一听水声吧。', '想在家三格内有一座公园，公园离河不超过四格；也记得接好公园门口的路。'],
    thanks: ['有了熟悉的街道，散步更安心了。', '面包已经装进篮子，等一个晴朗的午后。', '在这里，风声、水声和邻居的笑声都听得见。'] },
];
export const FESTIVALS = [
  { id: 'spring' as Season, name: '春日花会', story: '把春天的新芽和第一炉面包带到公园。', needs: { bread: 4, carrot: 2 } as Basket, reward: 'springarch' as BuildingKind },
  { id: 'summer' as Season, name: '夏日河畔野餐', story: '树荫、热汤和鲜奶，是夏天最舒服的小聚会。', needs: { bread: 4, meal: 2, milk: 1 } as Basket, reward: 'summerparasol' as BuildingKind },
  { id: 'autumn' as Season, name: '秋日丰收节', story: '把田野和牧场的收成摆上同一张餐桌。', needs: { bread: 4, potato: 2, cheese: 1, truffle: 1 } as Basket, reward: 'autumncart' as BuildingKind },
  { id: 'winter' as Season, name: '冬日灯市', story: '温室仍有收成，暖灯下也能分享冬天的料理。', needs: { bread: 4, meal: 2, carrot: 2 } as Basket, reward: 'winterlantern' as BuildingKind },
];
export const LANDMARKS = [
  { kind: 'oldwell' as BuildingKind, title: '河岸旧水井', story: '清理石圈和旧绳索，让老井重新成为街坊歇脚的地方。', needs: { bread: 4 } as Basket, seconds: 15, chapter: 2 },
  { kind: 'woodlookout' as BuildingKind, title: '林间观景台', story: '修好栏杆与平台，让小镇多一处看林山的去处。', needs: { bread: 4, milk: 2 } as Basket, seconds: 20, chapter: 3 },
  { kind: 'oldmill' as BuildingKind, title: '河谷旧风车', story: '把修复补给送到风车前，再装好叶片。它是纪念地标，不生产面粉。', needs: { bread: 4, meal: 2 } as Basket, seconds: 25, chapter: 4 },
];
export interface StoryProgress { step: number; homeId: string }
export interface Restoration { phase: 'pickup' | 'deliver' | 'repair' | 'done'; sourceId: string; good: Good | null; cargo: Basket; delivered: Basket; elapsed: number }
export interface CommunityState {
  stories: Record<string, StoryProgress>; festival: { id: Season; supplies: Basket } | null;
  festivalStars: Partial<Record<Season, number>>; restorations: Record<string, Restoration>;
  activeRestoration: string | null; gathering: { venueId: string; remaining: number } | null; activeSeconds: number;
}
export const freshCommunity = (): CommunityState => ({ stories: {}, festival: null, festivalStars: {}, restorations: {}, activeRestoration: null, gathering: null, activeSeconds: 0 });
const goal = (label: string, current: number, need = 1): Goal => ({ label, current, need, met: current >= need });
const record = (v: unknown): v is Record<string, any> => Boolean(v && typeof v === 'object' && !Array.isArray(v));
const count = (v: unknown): v is number => typeof v === 'number' && Number.isSafeInteger(v) && v >= 0 && v <= 100000;
const basket = (v: unknown): v is Basket => record(v) && Object.entries(v).every(([g,n]) => Object.prototype.hasOwnProperty.call(GOODS,g) && count(n));
const exactBasket = (a: Basket,b: Basket) => Object.keys(GOODS).every(g => (a[g as Good] || 0) === (b[g as Good] || 0));
export function validCommunity(c: CommunityState, s: TownState): boolean {
  if (!record(c) || !record(c.stories) || !record(c.festivalStars) || !record(c.restorations) || !Number.isFinite(c.activeSeconds) || c.activeSeconds < 0) return false;
  if (Object.entries(c.stories).some(([id,p]) => !STORIES.some(t=>t.id===id) || !record(p) || !count(p.step) || p.step > 3 || !s.town.buildings.some(b=>b.id===p.homeId&&b.kind==='house'))) return false;
  if (Object.entries(c.festivalStars).some(([id,n]) => !FESTIVALS.some(f=>f.id===id) || !count(n) || n>2)) return false;
  if (c.festival !== null && (!record(c.festival) || !basket(c.festival.supplies) || !FESTIVALS.some(f=>f.id===c.festival!.id&&exactBasket(f.needs,c.festival!.supplies)))) return false;
  if (c.gathering !== null && (!record(c.gathering) || !s.town.buildings.some(b=>b.id===c.gathering!.venueId&&['park','hall'].includes(b.kind)) || !Number.isFinite(c.gathering.remaining) || c.gathering.remaining<0 || c.gathering.remaining>60)) return false;
  for (const [id,r] of Object.entries(c.restorations)) {
    const b = s.town.buildings.find(b=>b.id===id), def = LANDMARKS.find(d=>d.kind===b?.kind);
    if (!def || !record(r) || !['pickup','deliver','repair','done'].includes(r.phase) || typeof r.sourceId!=='string' || !(r.good===null||Object.prototype.hasOwnProperty.call(GOODS,r.good)) || !basket(r.cargo) || !basket(r.delivered) || !Number.isFinite(r.elapsed) || r.elapsed<0 || r.elapsed>def.seconds) return false;
    if (Object.keys(GOODS).some(g=>(r.delivered[g as Good]||0)+(r.cargo[g as Good]||0)>(def.needs[g as Good]||0))) return false;
    if (r.phase==='deliver' ? !r.good || !r.cargo[r.good] || r.cargo[r.good]!>2 || Object.keys(r.cargo).length!==1 : Object.values(r.cargo).some(n=>n>0)) return false;
    if (['repair','done'].includes(r.phase)&&!exactBasket(r.delivered,def.needs)) return false;
    if (r.phase==='done'&&r.elapsed!==def.seconds) return false;
  }
  return (c.activeRestoration===null || typeof c.activeRestoration==='string'&&Boolean(c.restorations[c.activeRestoration])&&c.restorations[c.activeRestoration].phase!=='done') && Object.entries(c.restorations).every(([id,r])=>r.phase==='done'||id===c.activeRestoration) && LANDMARKS.every(d=>s.town.buildings.filter(b=>b.kind===d.kind).length<=1);
}

/** Validate the complete basket before debiting any reachable stock. */
export function consumeGoods(s: TownState,e: Evaluation,needs: Basket): string {
  const have = availableGoods(s,e), missing = Object.entries(needs).filter(([g,n])=>(have[g as Good]||0)<n);
  if (missing.length) return '还缺 '+missing.map(([g,n])=>`${GOODS[g as Good]} ${n-(have[g as Good]||0)}`).join('、');
  for (const [g,n] of Object.entries(needs)) {
    let left=n; if(g==='bread'){const amount=Math.min(left,s.farm.bread);s.farm.bread-=amount;left-=amount;}
    for(const id of Object.keys(s.village.stock).sort()){if(!e.buildings[id]?.connected)continue;const stock=s.village.stock[id],amount=Math.min(left,stock[g as Good]||0);stock[g as Good]=(stock[g as Good]||0)-amount;left-=amount;if(!left)break;}
  }
  s.farm.activeSeconds+=.001; s.village.activeSeconds+=.001; return '';
}
export function storyGoals(s: TownState,e: Evaluation,id: string,homeId?: string): Goal[] {
  const def=STORIES.find(t=>t.id===id), progress=s.community.stories[id], step=progress?.step||0;
  if(!def||step>=3)return [];
  const home=s.town.buildings.find(b=>b.id===(progress?.homeId||homeId)&&b.kind==='house'&&b.placed), status=home&&e.buildings[home.id];
  const out=[goal('记录的小家接通镇公所',Number(Boolean(status?.connected))),goal('这栋住宅获得食物服务',Number(Boolean(status?.food)))];
  if(step===1)return [...out,goal('分享实际生产的面包',availableGoods(s,e).bread||0,2)];
  if(step===2){
    out.push(goal('这栋住宅邻近绿地',Number(Boolean(status?.green))));
    const nearby=(k:BuildingKind[],distance:number,river=false)=>Boolean(home&&s.town.buildings.some(b=>b.placed&&k.includes(b.kind)&&e.buildings[b.id]?.connected&&edgeDistance(home,b)<=distance&&(!river||Math.min(Math.abs(b.z-12),Math.abs(b.z+dimensions(b).d-1-11))<=4)));
    out.push(goal(id==='resident-0'?'家旁八格内有接路麦田':id==='resident-4'?'家旁三格内有接路公园或长椅':'家旁三格内有接路的河畔公园',Number(nearby(id==='resident-0'?['wheatfield']:id==='resident-4'?['park','bench','gazebo']:['park'],id==='resident-0'?8:3,id==='resident-8'))));
  }
  return out;
}
export function completeStory(s: TownState,e: Evaluation,id: string,expectedStep: number,homeId?: string): string {
  const def=STORIES.find(t=>t.id===id), progress=s.community.stories[id];
  if(!def||(progress?.step||0)!==expectedStep||expectedStep>=3)return '这一段故事已经记录，请查看下一段';
  const home=progress?.homeId||homeId;
  if(!home)return '先接通住宅，让这位邻居搬来，再来认识他';
  const goals=storyGoals(s,e,id,home);if(goals.some(g=>!g.met))return goals.filter(g=>!g.met).map(g=>g.label).join('；');
  if(expectedStep===1){const problem=consumeGoods(s,e,{bread:2});if(problem)return problem;}
  s.community.stories[id]={step:expectedStep+1,homeId:home};
  const hall=s.town.buildings.find(b=>b.kind==='hall')!;s.community.gathering={venueId:hall.id,remaining:30};return '';
}
export function prepareFestival(s:TownState,e:Evaluation,id:Season):string {
  if(s.community.festival)return '已准备的食物保留着，请先完成或取消当前节庆';
  const f=FESTIVALS.find(f=>f.id===id);if(!f)return '没有这个节庆';
  const problem=consumeGoods(s,e,f.needs);if(problem)return problem;
  s.community.festival={id,supplies:{...f.needs}};return '';
}
export function cancelFestival(s:TownState):void {
  const f=s.community.festival;if(!f)return;
  const hall=s.town.buildings.find(b=>b.kind==='hall')!, stock=s.village.stock[hall.id]||={};
  for(const [g,n]of Object.entries(f.supplies))stock[g as Good]=(stock[g as Good]||0)+n;
  s.village.activeSeconds+=.001;s.community.festival=null;
}
export function festivalGoals(s:TownState,e:Evaluation,venueId:string,excellent=false):Goal[] {
  const venue=s.town.buildings.find(b=>b.id===venueId&&b.placed&&b.kind==='park'), p=venue&&entrance(venue), distances=p?pathDistances(e.connectedRoads,key(p.x,p.z)):new Map<string,number>();
  const homes=s.town.buildings.filter(b=>b.placed&&b.kind==='house'&&e.buildings[b.id]?.food&&e.buildings[b.id]?.green&&(distances.get(key(entrance(b).x,entrance(b).z))??Infinity)<=(excellent?8:12));
  return [goal('聚会公园的入口接通镇公所',Number(Boolean(venue&&e.buildings[venue.id]?.connected))),goal(excellent?'四户有食物与绿地的住宅，八格内可步行到场':'两户有食物与绿地的住宅，十二格内可步行到场',homes.length,excellent?4:2)];
}
export function celebrateFestival(s:TownState,e:Evaluation,venueId:string,season:Season):string {
  const f=s.community.festival;if(!f)return '先准备节庆食物';if(f.id!==season)return '等到对应季节再开场，食物已经备好，不会过期';
  const goals=festivalGoals(s,e,venueId);if(goals.some(g=>!g.met))return goals.filter(g=>!g.met).map(g=>g.label).join('；');
  const stars=festivalGoals(s,e,venueId,true).every(g=>g.met)?2:1;s.community.festivalStars[f.id]=Math.max(s.community.festivalStars[f.id]||0,stars);
  s.community.festival=null;s.community.gathering={venueId,remaining:60};return '';
}
export function communityUnlock(s:TownState,kind:BuildingKind):boolean|null {
  const story=STORIES.find(t=>t.reward===kind);if(story)return s.community.stories[story.id]?.step===3;
  const festival=FESTIVALS.find(f=>f.reward===kind);if(festival)return (s.community.festivalStars[festival.id]||0)>0;
  if(LANDMARKS.some(d=>d.kind===kind))return s.town.buildings.some(b=>b.kind===kind);
  return null;
}
export function restorationStatus(s:TownState,e:Evaluation,id:string,sleep=false):string {
  const b=s.town.buildings.find(b=>b.id===id),r=s.community.restorations[id];
  if(!b?.placed)return '先免费摆放遗址，再给入口接路';if(!e.buildings[id]?.connected)return '入口未连到镇公所，补给与修复暂停';
  if(!r)return '接好入口道路后，可以开始修复';if(r.phase==='done')return '已经修复 · 邻居可以来看看';if(sleep)return '邻居回家休息，清晨继续；补给和进度保留';
  if(r.phase==='deliver')return `正在运送${GOODS[r.good!]} ${r.cargo[r.good!]||0}，到场才记入修复补给`;
  if(r.phase==='repair')return `等待邻居到场 / 修复中 · ${Math.round(r.elapsed/LANDMARKS.find(d=>d.kind===b.kind)!.seconds*100)}%`;
  const def=LANDMARKS.find(d=>d.kind===b.kind)!,have=availableGoods(s,e),missing=Object.entries(def.needs).filter(([g,n])=>(have[g as Good]||0)+(r.delivered[g as Good]||0)<n);
  return missing.length?'还需修复补给：'+missing.map(([g,n])=>`${GOODS[g as Good]} ${n-(have[g as Good]||0)-(r.delivered[g as Good]||0)}`).join('、')+'；可以分批送来':'等待邻居领取修复补给';
}
const supplyEntry=(b:Building)=>{const p=entrance(b);return{x:p.x+.5,z:p.z+.5};};
function repairPoint(b:Building){const p=supplyEntry(b),d=dimensions(b),dx=b.x+d.w/2-p.x,dz=b.z+d.d/2-p.z,length=Math.hypot(dx,dz);return{x:p.x+dx/length*.35,z:p.z+dz/length*.35};}
/** At most one restoration uses an existing worker; goods remain cargo until real arrival. */
export function tickRestoration(s:TownState,e:Evaluation,dt:number,sleep:boolean,ready:Set<string>):FarmJob[] {
  if(sleep||!Number.isFinite(dt)||dt<0)return [];
  const c=s.community;dt=Math.min(dt,1);
  if(c.gathering&&e.buildings[c.gathering.venueId]?.connected){c.gathering.remaining=Math.max(0,c.gathering.remaining-dt);c.activeSeconds+=dt;if(!c.gathering.remaining)c.gathering=null;}
  const id=c.activeRestoration, r=id?c.restorations[id]:undefined, b=id?s.town.buildings.find(b=>b.id===id):undefined, def=b?LANDMARKS.find(d=>d.kind===b.kind):undefined;
  if(!id||!r||!b?.placed||!def||!e.buildings[id]?.connected||!e.houses)return [];
  if(r.phase==='pickup'){
    const good=Object.entries(def.needs).find(([g,n])=>(r.delivered[g as Good]||0)<n)?.[0] as Good|undefined;
    if(!good){r.phase='repair';r.sourceId='';r.good=null;c.activeSeconds+=.001;}
    else {
      const bakery=good==='bread'&&s.farm.bread>0?s.town.buildings.find(b=>b.placed&&b.kind==='bakery'&&e.buildings[b.id]?.connected):undefined;
      const source=bakery||s.town.buildings.filter(b=>b.placed&&e.buildings[b.id]?.connected&&(s.village.stock[b.id]?.[good]||0)>0).sort((a,b)=>a.id.localeCompare(b.id))[0];
      if(!source)return [];
      r.sourceId=source.id;r.good=good;
      const jobId=`restoration-${id}-pickup-${source.id}`;
      if(ready.has(jobId)){
        const amount=Math.min(2,(def.needs[good]||0)-(r.delivered[good]||0),bakery?s.farm.bread:s.village.stock[source.id][good]||0);
        if(bakery){s.farm.bread-=amount;s.farm.activeSeconds+=.001;}else{s.village.stock[source.id][good]!-=amount;s.village.activeSeconds+=.001;}
        r.cargo={[good]:amount};r.phase='deliver';c.activeSeconds+=.001;
      }else return [{chainId:`restoration-${id}`,fieldId:jobId,cycles:0,phase:'to-mill',buildingId:DOOR_SPECS[source.kind]?source.id:undefined,target:DOOR_SPECS[source.kind]?loadingSpot(source,id):repairPoint(source),entrance:supplyEntry(source),carrying:null,harvesting:false}];
    }
  }
  if(r.phase==='deliver'){
    if(!r.good||!r.cargo[r.good])return [];
    const jobId=`restoration-${id}-deliver`;
    if(ready.has(jobId)){for(const [g,n]of Object.entries(r.cargo))r.delivered[g as Good]=(r.delivered[g as Good]||0)+n;r.cargo={};r.good=null;r.phase='pickup';c.activeSeconds+=.001;return tickRestoration(s,e,0,false,new Set());}
    return [{chainId:`restoration-${id}`,fieldId:jobId,cycles:0,phase:'to-bakery',target:repairPoint(b),entrance:supplyEntry(b),carrying:r.good,harvesting:false}];
  }
  if(r.phase==='repair'){
    const jobId=`restoration-${id}-repair`;if(ready.has(jobId)){r.elapsed=Math.min(def.seconds,r.elapsed+dt);c.activeSeconds+=dt;if(r.elapsed>=def.seconds){r.phase='done';c.activeRestoration=null;return [];}}
    return [{chainId:`restoration-${id}`,fieldId:jobId,cycles:0,phase:'harvesting',target:repairPoint(b),entrance:supplyEntry(b),carrying:null,harvesting:true}];
  }
  return [];
}
