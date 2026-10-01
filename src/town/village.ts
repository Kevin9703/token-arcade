import {CATALOG} from './catalog';
import {dimensions,entrance,key,pathDistances} from './world';
import type {Building,BuildingKind,Evaluation,TownState} from './types';
import type {FarmJob} from './farming';
import type {WalkPoint} from './pedestrians';
import type {Season} from './world-time';
export type Good='flour'|'bread'|'carrot'|'potato'|'milk'|'cheese'|'truffle'|'fish'|'meal';
export type Basket=Partial<Record<Good,number>>;
export interface StationRun {phase:'work'|'deliver'|'return';elapsed:number;destination:string;cargo:Basket;cycles:number;choice:string;recipe?:string;nextChoice?:string}
export interface VillageState {stock:Record<string,Basket>;runs:Record<string,StationRun>;completed:Record<string,number>;activeOrder:string|null;choices:Record<string,string>;celebration:number;activeSeconds:number}
export const GOODS:Record<Good,string>={flour:'面粉',bread:'面包',carrot:'胡萝卜',potato:'土豆',milk:'鲜奶',cheese:'奶酪',truffle:'松露',fish:'鲜鱼',meal:'料理'};
export const freshVillage=():VillageState=>({stock:{},runs:{},completed:{},activeOrder:null,choices:{},celebration:0,activeSeconds:0});
export const RECIPES=[
 {id:'soup',name:'土豆浓汤',ingredients:{potato:2,flour:1} as Basket},
 {id:'cheese',name:'田园奶酪拼盘',ingredients:{carrot:2,cheese:1} as Basket},
 {id:'fish',name:'河谷炖鱼',ingredients:{potato:1,fish:1} as Basket},
];
export const ORDERS=[
 {id:'bread',name:'送一篮面包',story:'给刚搬来的邻居送四个热面包。',needs:{bread:4} as Basket,reward:'apronstand' as BuildingKind,season:null},
 {id:'picnic',name:'准备河畔野餐',story:'两份料理、四个面包，再带一瓶鲜奶去河边。',needs:{meal:2,bread:4,milk:1} as Basket,reward:'harvesttable' as BuildingKind,season:null},
 {id:'harvest',name:'秋日丰收会',story:'秋天一起分享种植与养殖的收获。',needs:{bread:8,carrot:2,potato:2,cheese:1,truffle:1} as Basket,reward:'wheatbanner' as BuildingKind,season:'autumn'},
];
export const PRODUCTION_KINDS:BuildingKind[]=['vegetablefield','greenhouse','cowshed','pigpen','fishinghut','restaurant'];
const numeric=(v:unknown)=>typeof v==='number'&&Number.isSafeInteger(v)&&v>=0&&v<=100000;
export function validVillage(v:VillageState):boolean {
 if(v&&!v.choices)v.choices={};
 if(!v||typeof v!=='object'||!v.stock||!v.runs||!v.completed||Array.isArray(v.stock)||Array.isArray(v.runs)||Array.isArray(v.completed))return false;
 const basket=(s:Basket)=>s&&typeof s==='object'&&!Array.isArray(s)&&Object.entries(s).every(([k,n])=>Object.prototype.hasOwnProperty.call(GOODS,k)&&numeric(n));
 return typeof v.choices==='object'&&!Array.isArray(v.choices)&&Object.values(v.choices).every(c=>['milk','cheese','carrot','potato','soup','fish'].includes(c))&&Object.values(v.stock).every(basket)&&Object.values(v.runs).every(r=>r&&['work','deliver','return'].includes(r.phase)&&Number.isFinite(r.elapsed)&&r.elapsed>=0&&typeof r.destination==='string'&&basket(r.cargo)&&numeric(r.cycles)&&['milk','cheese','carrot','potato','soup','fish','flour'].includes(r.choice)&&(r.recipe===undefined||RECIPES.some(p=>p.id===r.recipe))&&(r.nextChoice===undefined||['milk','cheese','carrot','potato','soup','fish'].includes(r.nextChoice)))&&Object.entries(v.completed).every(([id,n])=>ORDERS.some(o=>o.id===id)&&numeric(n))&&(v.activeOrder===null||ORDERS.some(o=>o.id===v.activeOrder))&&Number.isFinite(v.celebration)&&v.celebration>=0&&Number.isFinite(v.activeSeconds)&&v.activeSeconds>=0;
}
export function stationRun(v:VillageState,b:Building):StationRun {
 return v.runs[b.id] ||= {phase:'work',elapsed:0,destination:'',cargo:{},cycles:0,choice:v.choices[b.id]||(b.kind==='cowshed'?'milk':b.kind==='restaurant'?'soup':'carrot')};
}
const entry=(b:Building):WalkPoint=>{const p=entrance(b);return{x:p.x+.5,z:p.z+.5};};
export function stationSpot(b:Building):WalkPoint {
 const d=dimensions(b),yaw=-b.rotation*Math.PI/2;
 if(b.kind==='fishinghut')return{x:b.x+d.w/2-.35*Math.cos(yaw)-1.38*Math.sin(yaw),z:b.z+d.d/2+.35*Math.sin(yaw)-1.38*Math.cos(yaw)};
 if(b.kind==='restaurant'||b.kind==='mill'){const p=entry(b),dx=b.x+d.w/2-p.x,dz=b.z+d.d/2-p.z,l=Math.hypot(dx,dz);return{x:p.x+dx/l*.48,z:p.z+dz/l*.48};}
 return{x:b.x+d.w/2,z:b.z+d.d/2};
}
export function loadingSpot(b:Building,id:string):WalkPoint {
 const p=stationSpot(b),a=entry(b),d=dimensions(b),dx=b.x+d.w/2-a.x,dz=b.z+d.d/2-a.z,l=Math.hypot(dx,dz);let hash=0;for(const c of id)hash=(hash*31+c.charCodeAt(0))>>>0;const side=(hash%2?1:-1)*.56;
 return{x:p.x-dz/l*side,z:p.z+dx/l*side};
}
export function availableGoods(s:TownState,e:Evaluation):Basket {
 const out:Basket={bread:s.town.buildings.some(b=>b.placed&&b.kind==='bakery'&&e.buildings[b.id]?.connected)?s.farm.bread:0};
 for(const [id,basket]of Object.entries(s.village.stock))if(e.buildings[id]?.connected)for(const [good,n]of Object.entries(basket))out[good as Good]=(out[good as Good]||0)+n;
 return out;
}
export function orderStatus(s:TownState,e:Evaluation,id:string,season:Season):string {
 const o=ORDERS.find(o=>o.id===id);if(!o)return '订单不存在';
 if(o.season&&o.season!==season)return '秋天才举办丰收会，材料可以提前准备';
 if(!e.houses)return '需要连路的住宅来邀请邻居';
 const have=availableGoods(s,e),missing=Object.entries(o.needs).filter(([g,n])=>(have[g as Good]||0)<n);
 return missing.length?'还缺 '+missing.map(([g,n])=>`${GOODS[g as Good]} ${n-(have[g as Good]||0)}`).join('、'):'';
}
export function completeOrder(s:TownState,e:Evaluation,id:string,season:Season):string {
 const problem=orderStatus(s,e,id,season);if(problem)return problem;
 const o=ORDERS.find(o=>o.id===id)!;
 for(const [good,n]of Object.entries(o.needs)){let left=n;if(good==='bread'){const take=Math.min(left,s.farm.bread);s.farm.bread-=take;left-=take;}
  for(const station of Object.keys(s.village.stock).sort()){if(!e.buildings[station]?.connected)continue;const basket=s.village.stock[station],take=Math.min(left,basket[good as Good]||0);basket[good as Good]=(basket[good as Good]||0)-take;left-=take;if(!left)break;}}
 s.village.completed[id]=(s.village.completed[id]||0)+1;s.village.activeOrder=null;s.village.celebration=60;return '';
}
function fishReceiver(s:TownState,e:Evaluation,b:Building):Building|undefined {
 const p=entrance(b),dist=pathDistances(e.connectedRoads,key(p.x,p.z));
 return s.town.buildings.filter(d=>d.placed&&d.kind==='restaurant'&&e.buildings[d.id]?.connected&&(s.village.stock[d.id]?.fish||0)<12)
  .sort((a,b)=>(dist.get(key(entrance(a).x,entrance(a).z))??Infinity)-(dist.get(key(entrance(b).x,entrance(b).z))??Infinity)||a.id.localeCompare(b.id))[0];
}
export function stationProblem(s:TownState,e:Evaluation,b:Building,season:Season):string {
 if(!b.placed)return '已收纳，保留库存和运输进度';
 if(!e.buildings[b.id]?.connected)return '入口未连到镇公所，生产与配送暂停';
 if(!e.houses)return '需要连路住宅安排村民';
 const r=stationRun(s.village,b),stock=s.village.stock[b.id]||{};
 if(b.kind==='restaurant'){
  const recipe=RECIPES.find(p=>p.id===(r.recipe||r.choice))||RECIPES[0];
  if(!Object.keys(r.cargo).length){const missing=Object.entries(recipe.ingredients).filter(([g,n])=>(stock[g as Good]||0)<n);if(missing.length)return '缺少原材料：'+missing.map(([g,n])=>`${GOODS[g as Good]} ${n-(stock[g as Good]||0)}`).join('、');}
  if((stock.meal||0)>=30)return '料理库存充足，先完成邻里订单';
 }else{
  if(r.phase==='work'&&b.kind==='vegetablefield'&&season==='winter')return '冬季露地休耕：温室仍可种菜，现有作物进度保留';
  if(r.phase==='work'&&b.kind==='cowshed'&&r.choice==='cheese'&&!Object.keys(r.cargo).length&&(stock.milk||0)<1)return '缺少原材料：鲜奶（先选择鲜奶生产）';
  if(r.phase==='deliver'&&!e.buildings[r.destination]?.connected)return '配送目的地未连路，货物保留在村民手中';
  if(r.phase==='work'&&!(b.kind==='cowshed'&&r.choice==='cheese')&&Object.values(stock).reduce((a,n)=>a+n,0)>=24){
   if(b.kind==='fishinghut'){if(!fishReceiver(s,e,b))return '鲜鱼库存已满：接通饭馆并选择河谷炖鱼，消耗厨房里的鲜鱼';}
   else return '库存已满：接通饭馆或完成邻里订单';
  }
 }
 return '';
}
export function productionDuration(b:Building,choice:string,season:Season):number {
 if(b.kind==='vegetablefield'||b.kind==='greenhouse')return (b.kind==='greenhouse'?14:11)/{spring:choice==='carrot'?1.3:1,summer:choice==='potato'?1.4:1.15,autumn:1,winter:.8}[season];
 return b.kind==='cowshed'?(choice==='cheese'?5:8):b.kind==='pigpen'?10:b.kind==='fishinghut'?(season==='summer'?8:12):4;
}
export function productionLabel(s:TownState,e:Evaluation,b:Building,season:Season,sleep:boolean):string {
 const problem=stationProblem(s,e,b,season);if(problem)return problem;if(sleep)return '邻居休息中 · 清晨继续';const r=stationRun(s.village,b);
 if(r.phase==='deliver')return `配送中：${Object.entries(r.cargo).map(([g,n])=>`${GOODS[g as Good]} ${n}`).join('、')} → ${CATALOG[s.town.buildings.find(b=>b.id===r.destination)!.kind].name}`;
 if(r.phase==='return')return '返回工作地点';
 if(b.kind==='fishinghut'&&(s.village.stock[b.id]?.fish||0)>=24)return '准备把库存鲜鱼送往饭馆';
 const action=b.kind==='fishinghut'?'抛竿等待收鱼':b.kind==='cowshed'?(r.choice==='cheese'?'制作奶酪':'照料奶牛、挤奶'):b.kind==='pigpen'?'小猪寻松露':b.kind==='restaurant'?'烹饪料理':`种植${r.choice==='potato'?'土豆':'胡萝卜'}`;
 return `${action} · ${Math.round(Math.min(1,r.elapsed/productionDuration(b,r.choice,season))*100)}%`;
}
/** All quantities change only after the assigned worker reaches the job. */
export function tickVillage(s:TownState,e:Evaluation,dt:number,sleep:boolean,season:Season,ready:Set<string>):FarmJob[]{
 if(sleep||!Number.isFinite(dt)||dt<0)return [];
 const v=s.village,jobs:FarmJob[]=[];let advanced=v.celebration>0;v.celebration=Math.max(0,v.celebration-dt);
 const stations=s.town.buildings.filter(b=>b.placed&&PRODUCTION_KINDS.includes(b.kind)).sort((a,b)=>a.id.localeCompare(b.id));
 for(const b of stations){const r=stationRun(v,b),stock=v.stock[b.id]||={};if(stationProblem(s,e,b,season))continue;
  const jobId=`village-${b.id}-${r.phase}`;
  const storedFish=b.kind==='fishinghut'&&r.phase==='work'&&(stock.fish||0)>=24,receiver=storedFish?fishReceiver(s,e,b):undefined;
  if(ready.has(jobId)&&storedFish&&receiver){
   const amount=Math.min(2,stock.fish||0,12-(v.stock[receiver.id]?.fish||0));stock.fish!-=amount;
   r.cargo={fish:amount};r.destination=receiver.id;r.phase='deliver';r.elapsed=0;advanced=true;
  }else if(ready.has(jobId)){advanced=true;
   if(b.kind==='restaurant'&&!Object.keys(r.cargo).length){const recipe=RECIPES.find(p=>p.id===r.choice)||RECIPES[0];r.recipe=recipe.id;r.cargo={...recipe.ingredients};for(const [g,n]of Object.entries(r.cargo))stock[g as Good]=(stock[g as Good]||0)-n;}
   if(b.kind==='cowshed'&&r.choice==='cheese'&&!Object.keys(r.cargo).length&&r.phase==='work'){stock.milk=(stock.milk||0)-1;r.cargo={milk:1};}
   r.elapsed+=Math.min(dt,1);
   const duration=r.phase==='work'?productionDuration(b,r.recipe||r.choice,season):1;
   if(r.elapsed>=duration){r.elapsed=0;
    if(r.phase==='deliver'){const dest=v.stock[r.destination]||={};for(const [g,n]of Object.entries(r.cargo))dest[g as Good]=(dest[g as Good]||0)+n;r.cargo={};r.phase='return';}
    else if(r.phase==='return'){r.phase='work';r.destination='';r.cycles++;if(r.nextChoice){r.choice=r.nextChoice;delete r.nextChoice;}}
    else if(b.kind==='restaurant'){stock.meal=(stock.meal||0)+2;r.cargo={};delete r.recipe;r.cycles++;if(r.nextChoice){r.choice=r.nextChoice;delete r.nextChoice;}}
    else {const good:Good=b.kind==='cowshed'?(r.choice==='cheese'?'cheese':'milk'):b.kind==='pigpen'?'truffle':b.kind==='fishinghut'?'fish':r.choice==='potato'?'potato':'carrot';
     const amount=good==='cheese'||good==='truffle'?1:season==='autumn'&&(good==='potato'||good==='carrot')?3:2;stock[good]=(stock[good]||0)+amount;r.cargo={};
     const p=entrance(b),dist=pathDistances(e.connectedRoads,key(p.x,p.z));const dest=stations.filter(d=>d.kind==='restaurant'&&e.buildings[d.id]?.connected&&(v.stock[d.id]?.[good]||0)<12).sort((a,b)=>(dist.get(key(entrance(a).x,entrance(a).z))||0)-(dist.get(key(entrance(b).x,entrance(b).z))||0))[0];
     if(dest){const send=good==='milk'?Math.min(amount,Math.max(0,stock[good]-1)):amount;stock[good]-=send;r.cargo={[good]:send};r.destination=dest.id;r.phase='deliver';}else {r.cycles++;if(r.nextChoice){r.choice=r.nextChoice;delete r.nextChoice;}}
    }
   }
  }
  jobs.push({fieldId:`village-${b.id}-${r.phase}`,cycles:r.cycles,phase:r.phase==='deliver'?'to-bakery':r.phase==='return'?'returning':'harvesting',target:r.phase==='deliver'?loadingSpot(s.town.buildings.find(b=>b.id===r.destination)!,b.id):stationSpot(b),entrance:r.phase==='deliver'?entry(s.town.buildings.find(b=>b.id===r.destination)!):entry(b),carrying:r.phase==='deliver'?Object.keys(r.cargo)[0] as Good:null,harvesting:r.phase==='work'&&!storedFish});
 }
 // Flour left over after the two units reserved for each bakery batch is transported to restaurants.
 for(const restaurant of stations.filter(b=>b.kind==='restaurant'&&e.buildings[b.id]?.connected)){
  const id=`flour-${restaurant.id}`,stock=v.stock[restaurant.id]||={};const r=v.runs[id]||={phase:'work',elapsed:0,destination:restaurant.id,cargo:{},cycles:0,choice:'flour'};
  const mill=s.town.buildings.find(b=>b.placed&&b.kind==='mill'&&e.buildings[b.id]?.connected);if(!mill)continue;
  const reserved=Object.values(s.farm.runs).filter(r=>['to-bakery','baking'].includes(r.phase)).length*2;
  if(r.phase==='work'&&(s.farm.flour<=reserved||(stock.flour||0)>=6))continue;
  const jobId=`village-${id}-${r.phase}`;
  if(ready.has(jobId)){advanced=true;r.elapsed+=Math.min(dt,1);if(r.elapsed>=1){r.elapsed=0;if(r.phase==='work'){s.farm.flour--;s.farm.activeSeconds+=.001;r.cargo={flour:1};r.phase='deliver';}else{stock.flour=(stock.flour||0)+1;r.cargo={};r.phase='work';r.cycles++;if(r.nextChoice){r.choice=r.nextChoice;delete r.nextChoice;}}}}
  jobs.push({fieldId:`village-${id}-${r.phase}`,cycles:r.cycles,phase:r.phase==='deliver'?'to-bakery':'milling',target:loadingSpot(r.phase==='deliver'?restaurant:mill,id),entrance:entry(r.phase==='deliver'?restaurant:mill),carrying:r.phase==='deliver'?'flour':null,harvesting:false});
 }
 if(advanced)v.activeSeconds+=Math.min(dt,1);
 return jobs;
}
