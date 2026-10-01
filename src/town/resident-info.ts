import { CATALOG } from './catalog';
import { buildingLabel } from './service-feedback';
import { GOODS, RECIPES } from './village';
import type { Board, Building, TownState } from './types';
import type { ResidentLife } from './resident-life';
import type { FarmJob } from './farming';
import { entrance } from './world';
import { worldTime } from './world-time';

export const RESIDENT_COLORS = ['#748b9c', '#bb976a', '#ba8174', '#819373', '#ac9ab4'];
const PROFILES = [
  ['林禾', '喜欢田野', '搬来河谷后，最喜欢清晨的麦香。闲下来会沿着田埂看看新长出的麦苗。'],
  ['许麦', '热爱烘焙', '喜欢热面包和慢悠悠的早晨，常把新学到的食谱分享给街坊。'],
  ['沈溪', '亲近河水', '总能认出河边的鸟鸣。喜欢沿岸散步，收集好看的小石头。'],
  ['苏木', '爱护花草', '窗台上总有一盆绿植，喜欢看小镇一季一季换颜色。'],
  ['温书', '爱读故事', '喜欢书屋的安静角落，也爱坐在长椅上听邻居讲河谷的旧故事。'],
  ['陈悠', '慢生活爱好者', '喜欢在门前歇歇脚，观察来往的街坊。觉得平常的日子也很有意思。'],
  ['夏晴', '喜欢阳光', '晴天最爱出门走走，雨后会留意公园里新冒出来的小花。'],
  ['顾桃', '爱逛小店', '喜欢热闹的集市和街角小店，常向邻居推荐新发现的好去处。'],
  ['江沐', '享受安静', '喜欢听风吹树叶的声音。有空就在长椅上坐一会儿，看河水慢慢流过。'],
  ['陆苇', '喜欢户外', '爱走河岸的小路，熟悉每座桥边的风景，期待小镇变得更热闹。'],
  ['唐栗', '喜欢分享', '喜欢和街坊交换种植心得，最期待大家一起准备的河畔野餐。'],
  ['叶岚', '观察四季', '喜欢给每个季节记一笔：春芽、夏荫、秋叶，还有冬天屋顶上的雪。'],
  ['程舟', '河谷新邻居', '刚搬来时就爱上了这条河，正在慢慢认识小镇里的每一位邻居。'],
  ['白露', '喜欢清晨', '习惯早起看看小镇醒来的样子，喜欢窗灯熄灭后第一缕阳光。'],
  ['周宁', '珍惜日常', '喜欢熟悉的街道和温暖的窗灯。忙完一天，回家就是最舒服的事。'],
] as const;

export function residentProfile(index: number) {
  if (!Number.isInteger(index) || index < 0 || index >= PROFILES.length) return null;
  const [name, trait, bio] = PROFILES[index];
  return { id: `resident-${index}`, index, name, trait, bio, color: RESIDENT_COLORS[index % RESIDENT_COLORS.length] };
}

export interface ResidentInfo extends NonNullable<ReturnType<typeof residentProfile>> {
  status: string; intention: string; destination: string; homeId?: string; home: string; visible: boolean;
}

function workInfo(job: FarmJob, s: TownState, board: Board): { action: string; destination?: Building } {
  const field = board.buildings.find(b => b.id === job.fieldId);
  if (field) {
    const run = s.farm.runs[field.id];
    const destination = board.buildings.find(b => b.id === (['milling', 'to-mill'].includes(job.phase) ? run?.millId : ['baking', 'to-bakery'].includes(job.phase) ? run?.bakeryId : field.id));
    const action = { sowing: '播种小麦', growing: '照看麦苗', harvesting: '收割小麦', 'to-mill': '把小麦送到磨坊', milling: '把小麦磨成面粉', 'to-bakery': '把面粉送到面包店', baking: '烘焙面包', returning: '回到麦田准备下一轮' }[job.phase];
    return { action, destination };
  }
  const station = board.buildings.find(b => job.fieldId.startsWith(`village-${b.id}-`));
  const flourKitchen = !station && board.buildings.find(b => job.fieldId.startsWith(`village-flour-${b.id}-`));
  if (flourKitchen) {
    const mills = board.buildings.filter(b => b.kind === 'mill' && b.placed);
    const distance = (b: Building) => { const p=entrance(b); return Math.hypot(p.x+.5-job.entrance.x,p.z+.5-job.entrance.z); };
    return { action: job.carrying ? '把面粉送到饭馆' : '到磨坊领取面粉', destination: job.carrying ? flourKitchen : mills.sort((a,b)=>distance(a)-distance(b))[0] };
  }
  if (station) {
    const run = s.village.runs[station.id];
    if (job.carrying) return { action: `配送${GOODS[job.carrying as keyof typeof GOODS] || '小麦'}`, destination: board.buildings.find(b => b.id === run?.destination) };
    if (job.phase === 'returning') return { action: '返回工作地点', destination: station };
    const choice = run?.recipe || run?.choice || s.village.choices[station.id];
    const action = station.kind === 'fishinghut' ? '在河边钓鱼' : station.kind === 'cowshed' ? choice === 'cheese' ? '制作奶酪' : '照料奶牛、挤奶' : station.kind === 'pigpen' ? '陪小猪寻找松露' : station.kind === 'restaurant' ? `烹饪${RECIPES.find(r => r.id === choice)?.name || '料理'}` : `照料${choice === 'potato' ? '土豆' : '胡萝卜'}`;
    return { action, destination: station };
  }
  return { action: '准备下一项工作' };
}

/** Presentation only: reflects the current simulation without assigning jobs or changing a save. */
export function describeResident(index: number, s: TownState, board: Board, life: Pick<ResidentLife, 'residents' | 'doors' | 'jobs'>): ResidentInfo | null {
  const profile = residentProfile(index), r = life.residents[index];
  if (!profile || !r) return null;
  const home = board.buildings.find(b => b.id === life.doors[r.home]?.id && b.placed);
  let status = '沿街散步', intention = '在街坊间走走，看看小镇的变化', destination = '小镇街道';
  const job = life.jobs.get(index);
  if (r.mode === 'working' && job) {
    const task = workInfo(job, s, board);
    status = r.path.length ? `前往${task.destination ? CATALOG[task.destination.kind].name : '工作地点'}` : task.action;
    intention = task.action; destination = task.destination ? buildingLabel(task.destination) : '正在安排工作地点';
  } else if (['going-home', 'approaching', 'entering', 'sleeping'].includes(r.mode)) {
    status = r.mode === 'sleeping' ? '在家睡觉' : r.mode === 'entering' ? '走进家门' : r.mode === 'approaching' ? '走向家门，等门打开' : '回家路上';
    intention = r.mode === 'sleeping' ? '好好休息，清晨再出门' : '回家睡觉'; destination = home ? buildingLabel(home) : '住处';
  } else if (['opening-out', 'leaving'].includes(r.mode)) {
    status = r.mode === 'opening-out' ? '开门迎接清晨' : '走出家门'; intention = '回到街道，开始新的一天'; destination = '家门前的街道';
  } else if (['visiting', 'lingering'].includes(r.mode)) {
    const doorstep = r.visitId?.startsWith('doorstep-'), festival = r.visitId?.startsWith('festival-');
    const place = board.buildings.find(b => b.id === (doorstep ? r.visitId!.slice('doorstep-'.length) : r.visitId));
    const where = festival ? '镇公所' : doorstep ? '住宅门前' : place ? CATALOG[place.kind].name : '街角';
    status = r.mode === 'visiting' ? `前往${where}` : festival ? '和邻居分享收获' : doorstep ? '在门前歇脚' : `在${where}停留`;
    intention = festival ? '参加邻里小聚会' : doorstep ? '在门旁停一会儿，看看街坊' : place?.kind === 'park' ? '去公园散散步' : '逛逛街坊的小店';
    destination = place ? buildingLabel(place) : festival ? '镇公所前的庭院' : '街角';
  } else if (['seated', 'sitting', 'going-seat', 'standing'].includes(r.mode)) {
    const place = board.buildings.find(b => b.id === r.seat?.id?.split(':')[0]);
    status = r.mode === 'seated' ? '坐着休息' : r.mode === 'standing' ? '起身准备回家' : '去长椅坐坐';
    intention = r.mode === 'standing' ? '回家休息' : '坐一会儿，看看小镇的风景'; destination = r.mode === 'standing' && home ? buildingLabel(home) : place ? buildingLabel(place) : '街边长椅';
  } else if (r.mode === 'joining') {
    if (worldTime(s.worldSeconds,s.settings).sleep && home) { status = '准备回家睡觉'; intention = '等道路安全后回家休息'; destination = buildingLabel(home); }
    else if (r.seat) { const place=board.buildings.find(b=>b.id===r.seat?.id?.split(':')[0]); status='回到街道'; intention='等道路安全后回到长椅'; destination=place?buildingLabel(place):'街边长椅'; }
    else { status = '回到街道'; intention = '等路面空出来，再继续走'; destination = '附近的步行道'; }
  }
  return { ...profile, status, intention, destination, homeId: home?.id, home: home ? buildingLabel(home) : '暂住镇公所', visible: r.visible };
}
