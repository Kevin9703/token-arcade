/** Interaction revision of the cozy playtest. Production GameStore stays separate. */
import { Stage } from './render/stage';
import { sound } from './render/sound';
import { fx } from './render/fx';
import { drawText } from './render/pixelFont';
import { drawCoin } from './render/sprites';
import { levelInfo } from './domain/levels';
import { companionGrowth } from './domain/growth';
import { fmtCompact } from './domain/economy';
import { COLLECTIBLES, byId } from './content/collectibles';
import { RARITIES } from './content/rarities';
import { setLocale, tCollectibleName } from './i18n';
import { CHAPTERS, PLAYTEST_KEY, freshPlaytest, readPlaytest, totalTokens, collectSession, claimChapter, pullCapsules, placePrize, displaySlots, exchangeMissing } from './preview/progress';
import { floorPath, type Point } from './preview/navigation';

const canvas = document.querySelector<HTMLCanvasElement>('#stage')!;
const stage = new Stage(canvas);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const art = new Map<string, HTMLImageElement>();
const root = './assets/cozy-preview/';
const files: Record<string, string> = { room: root+'room.webp', journal: root+'journal.png', dialogue: root+'dialogue.png', hud: root+'hud.png', book: root+'book.png', bank: './assets/coin-bank.webp', capsule: './assets/capsule/machine.png', ball: './assets/shop/items/shop_capsule_single.webp' };
for (let i = 0; i < 5; i++) files['cab'+i] = root+`cabinet-${i+1}.png`;
for (let i = 0; i < 4; i++) { files['keeper'+i] = root+`keeper-${i}.png`; files['lumi'+i] = root+`lumi-${i}.png`; }
for (const c of COLLECTIBLES) files[c.id] = `./assets/collectibles/items/${c.id}.png`;
const GOLD = '#f4d793', MINT = '#9fddc6', INK = '#f6e6c7', DARK = '#382333';
let s = freshPlaytest(), saveIssue = false;
try { const raw = sessionStorage.getItem(PLAYTEST_KEY); s = readPlaytest(raw) ?? s; saveIssue = !!raw && !readPlaytest(raw); } catch { saveIssue = true; }
function save() { try { sessionStorage.setItem(PLAYTEST_KEY, JSON.stringify(s)); saveIssue = false; } catch { saveIssue = true; } }
let locale: 'zh' | 'en' = 'zh'; setLocale('zh-CN');
const say = (zh: string, en: string) => locale === 'zh' ? zh : en;
const cname = (id: string) => locale === 'zh' ? tCollectibleName(id) : byId[id].name;
let active: 'book' | 'cabinet' | 'capsule' | 'collection' | 'menu' | null = s.pending.length ? 'capsule' : null;
let chapter = 0, selected = 0, collectionPage = 0, selectedPrize = 'c_sprout', placing: string | null = null;
let revealAt = s.pending.length ? -10000 : Infinity, revealIndex = 0, rewardAt = -10000, helloAt = -10000;
let toast = '', toastUntil = 0, muted = false;
const player = { x: 790, y: 830 }, pet = { x: 875, y: 845 };
let path: Point[] = [], arrival: (() => void) | null = null, going = '';
const keys = new Set<string>();
const projects = [{ zh: '蘑菇花园', en: 'Moss Garden' }, { zh: '像素电台', en: 'Pixel Radio' }, { zh: '小小工具', en: 'Little Tools' }];
const slots = [{x:1480,y:390,w:68,h:76}, {x:1470,y:475,w:68,h:66}, {x:1480,y:555,w:76,h:65}, {x:405,y:804,w:76,h:86}, {x:1260,y:856,w:94,h:97}, {x:1125,y:353,w:72,h:90}];
const obstacles = () => [3,4].filter(i => !!s.slots[i]).map(i => slots[i]);
type Action = { id: string; label: string; x: number; y: number; w: number; h: number; run: () => void };
let actions: Action[] = [], focusIndex = -1, hoverLabel = '', hoverX = 800, hoverY = 700;
const semantic = document.querySelector<HTMLElement>('#controls')!, status = document.querySelector<HTMLElement>('#status')!;
function announce(text: string) { status.textContent = text; }
function message(zh: string, en: string, duration = 2600) { toast = say(zh,en); toastUntil = performance.now()+duration; announce(toast); }
function open(dialog: typeof active) { active = dialog; keys.clear(); path = []; arrival = null; going = ''; focusIndex = -1; sound.click(); }
function walk(to: Point, after: (() => void) | null = null, label = '') {
  path = floorPath(player,to,obstacles()); arrival = after; going = label; focusIndex = -1;
  if (!path.length && arrival) { const fn = arrival; arrival = null; fn(); going = ''; }
}
function approach(to: Point, after: () => void, label: string) { walk(to,after,label); announce(say('走近：','Approaching: ')+label); }
function paint(g: CanvasRenderingContext2D, id: string, cx: number, bottom: number, maxW: number, maxH: number, alpha=1) {
  const img = art.get(id); if (!img) return;
  const scale = Math.min(maxW/img.naturalWidth,maxH/img.naturalHeight), w = Math.round(img.naturalWidth*scale), h = Math.round(img.naturalHeight*scale);
  g.save(); g.globalAlpha = alpha; g.imageSmoothingEnabled = false; g.drawImage(img,Math.round(cx-w/2),Math.round(bottom-h),w,h); g.restore();
}
function frame(g: CanvasRenderingContext2D,x:number,y:number,w:number,h:number) {
  const img=art.get('dialogue'); if(!img)return;
  const sw=img.naturalWidth,sh=img.naturalHeight,cap=112,dw=Math.round(cap*h/sh);
  g.drawImage(img,0,0,cap,sh,x,y,dw,h); g.drawImage(img,cap,0,sw-cap*2,sh,x+dw,y,w-dw*2,h); g.drawImage(img,sw-cap,0,cap,sh,x+w-dw,y,dw,h);
}
function label(g: CanvasRenderingContext2D, text: string, x: number, y: number, size=24, color=INK, paper=false, maxWidth?: number) {
  g.save(); g.font=`${size}px "Fusion Pixel",monospace`; g.textAlign='center'; g.textBaseline='middle';
  if(maxWidth)while(g.measureText(text).width>maxWidth&&size>12){size-=2;g.font=`${size}px "Fusion Pixel",monospace`;}
  if(!paper){g.fillStyle='#190e20';g.fillText(text,Math.round(x+2),Math.round(y+3));}g.fillStyle=color;g.fillText(text,Math.round(x),Math.round(y));g.restore();
}
function hot(a: Action) {
  actions.push(a); const hover=stage.hotspot({...a,cursor:'pointer',onClick:()=>{a.run();}})||focusIndex===actions.length-1;
  if(hover&&!active){hoverLabel=a.label;hoverX=a.x+a.w/2;hoverY=Math.max(265,a.y-27);}return hover;
}
function choice(g: CanvasRenderingContext2D,id:string,text:string,x:number,y:number,w:number,run:()=>void,enabled=true,paper=false) {
  const hover=enabled&&hot({id,label:text,x:x-w/2,y:y-23,w,h:46,run});
  label(g,(hover?'› ':'')+text+(hover?' ‹':''),x,y,24,enabled?(paper?'#39736a':hover?GOLD:INK):paper?'#98745f':'#a19aab',paper,w-16);
}
function shadow(g: CanvasRenderingContext2D,x:number,y:number,w:number) {g.save();g.globalAlpha=.3;g.fillStyle='#190f22';g.beginPath();g.ellipse(x,y,w,10,0,0,Math.PI*2);g.fill();g.restore();}
function sparkle(g: CanvasRenderingContext2D,x:number,y:number,color=GOLD) {g.fillStyle=color;g.fillRect(x-2,y-7,4,14);g.fillRect(x-7,y-2,14,4);}
function progress(g:CanvasRenderingContext2D,x:number,y:number,w:number,value:number,color=MINT) {g.fillStyle='#291e31';g.fillRect(x,y,w,6);g.fillStyle=color;g.fillRect(x,y,Math.round(w*Math.max(0,Math.min(1,value))),6);}
function collect() {
  if(performance.now()-rewardAt<1800)return;
  const result=collectSession(s);save();rewardAt=performance.now();
  if(!reduced)fx.coinRain(920,450,18,{x:1450,y:65});sound.levelUp();
  message(`+${result.coins} 金币 · ${projects[result.project].zh} 长大了` ,`+${result.coins} coins · ${projects[result.project].en} grew`,3000);
}
function startPlacement(id:string) { placing=id;open(null);message('选择一个发光的位置，摆好新宝物。','Choose a lit spot for your treasure.',4000); }
function placeAt(id:string,index:number) {
  if(!placePrize(s,id,index))return;
  const spot=slots[index];
  if((index===3||index===4)&&Math.hypot(player.x-spot.x,player.y-spot.y)<70){player.x=spot.x+(index===3?80:-80);player.y=spot.y;}
  save();placing=null;sound.place();message('宝物摆好了。随时可以从收藏册换个位置。','Placed! You can move it again from the collection.');
}
function pull(count:number) { if(!pullCapsules(s,count))return; save();revealIndex=0;revealAt=performance.now();sound.pull(); }
function finishReveal() { s.pending=[];save();revealIndex=0; }
function drawActors(g:CanvasRenderingContext2D,dt:number,now:number) {
  const dx=Number(keys.has('d')||keys.has('ArrowRight'))-Number(keys.has('a')||keys.has('ArrowLeft'));
  const dy=Number(keys.has('s')||keys.has('ArrowDown'))-Number(keys.has('w')||keys.has('ArrowUp'));
  let moving=false;
  if(!active&&!placing){
    if(dx||dy){path=[];arrival=null;going='';const div=Math.hypot(dx,dy);const nx=Math.max(350,Math.min(1310,player.x+dx/div*300*dt)),ny=Math.max(710,Math.min(890,player.y+dy/div*300*dt));if(!obstacles().some(o=>Math.hypot(o.x-nx,o.y-ny)<50)){player.x=nx;player.y=ny;moving=true;}}
    else if(path.length){const target=path[0],dist=Math.hypot(target.x-player.x,target.y-player.y),step=Math.min(dist,400*dt);moving=true;if(dist<1)path.shift();else{player.x+=(target.x-player.x)/dist*step;player.y+=(target.y-player.y)/dist*step;}}
    else if(arrival){const fn=arrival;arrival=null;going='';fn();}
  }
  if(!active){pet.x+=(player.x+75-pet.x)*Math.min(1,dt*3);pet.y+=(Math.min(920,player.y+16)-pet.y)*Math.min(1,dt*3);}
  const actors=[{y:player.y,run:()=>{shadow(g,player.x,player.y,29);paint(g,'keeper'+(moving&&!reduced?Math.floor(now/140)%4:0),player.x,player.y,93,140);}}, {y:pet.y,run:()=>{shadow(g,pet.x,pet.y,24);paint(g,'lumi'+companionGrowth(totalTokens(s)).stage,pet.x,pet.y-(reduced?0:Math.sin(now/440)*2),86,80);}}];
  actors.sort((a,b)=>a.y-b.y).forEach(a=>a.run());
  if(!active&&!placing)hot({id:'lumi',label:say('和小光打招呼','Say hello to Lumi'),x:pet.x-45,y:pet.y-80,w:90,h:93,run:()=>{helloAt=now;sound.confirm();message('小光：我也想看看新宝物！','Lumi: Let us find something lovely!');}});
  if(now-helloAt<1600)sparkle(g,pet.x,pet.y-102,MINT);
}
function drawRoom(g:CanvasRenderingContext2D,dt:number,now:number) {
  g.drawImage(art.get('room')!,0,0,1600,1000);
  drawText(g,'TOKEN ARCADE',819,107,5,GOLD,{align:'center',shadow:'#251124'});
  label(g,say('灵感不散场','A little world of your own'),819,173,24,MINT);
  paint(g,'hud',1422,111,278,90);label(g,String(s.coins),1460,68,36,GOLD);drawCoin(g,1328,66,21);
  label(g,say('演示小屋 · 本标签页保留','Playtest · saved in this tab'),1390,128,18);
  paint(g,'dialogue',206,115,352,102);paint(g,'keeper0',82,94,57,75);
  label(g,say('雨夜街机小屋','Rainy arcade'),233,55,24,GOLD);label(g,`${fmtCompact(totalTokens(s))} token`,228,88,18);
  if(!active&&!placing)hot({id:'menu',label:say('菜单','Menu'),x:25,y:20,w:350,h:100,run:()=>open('menu')});
  if(!active&&!placing)stage.hotspot({id:'floor',x:340,y:690,w:990,h:215,cursor:'crosshair',onClick:()=>walk(stage.mouse)});
  for(let i=0;i<3;i++){
    const x=138+i*151,info=levelInfo(s.tokens[i]);shadow(g,x,600,54);paint(g,'cab'+info.stage.index,x,596,140,220+info.stage.index*17);
    if(!active){label(g,locale==='zh'?projects[i].zh:projects[i].en,x,625,18);label(g,`Lv.${info.level}`,x,649,18,info.stage.index?MINT:INK);
    progress(g,x-46,666,92,info.progress);if(s.favorite===i)sparkle(g,x+61,623,GOLD);}
    if(!active&&!placing)hot({id:'project-'+i,label:say('查看 '+projects[i].zh,'Inspect '+projects[i].en),x:x-67,y:348,w:138,h:325,run:()=>approach({x:370+i*95,y:710},()=>{selected=i;open('cabinet');},projects[i].zh)});
  }
  // The book sits on the end of the existing cabinet platform, leaving the floor clear.
  paint(g,'book',558,599,69,82);if(!active)label(g,say('成长手册','Journal'),565,633,18,GOLD);
  const ready=CHAPTERS.filter(c=>totalTokens(s)>=c.tokens&&!s.claims.includes(c.id)).length;
  if(ready)sparkle(g,598,510);
  if(!active&&!placing)hot({id:'journal',label:ready?say(`成长手册 · ${ready} 份礼物`,`Journal · ${ready} gifts`):say('成长手册 [J]','Journal [J]'),x:516,y:506,w:99,h:147,run:()=>approach({x:580,y:710},()=>{chapter=Math.max(0,CHAPTERS.findIndex(c=>!s.claims.includes(c.id)));open('book');},say('手册','journal'))});
  shadow(g,920,659,79);paint(g,'bank',920,655,218,320);
  const bankHover=!active&&!placing&&hot({id:'sync',label:say('同步演示用量 · 收获金币 [R]','Collect a fictional session [R]'),x:815,y:333,w:210,h:332,run:()=>approach({x:920,y:715},collect,say('收集灵感','collect ideas'))});
  if(!active&&!bankHover)label(g,say('收集灵感','Collect ideas'),920,312,24,GOLD);
  shadow(g,1216,664,82);paint(g,'capsule',1216,659,217,310);
  if(!active)label(g,say('扭蛋 · 25 金币','Capsule · 25 coins'),1216,698,18,GOLD);
  if(!active&&!placing)hot({id:'capsule',label:say('扭蛋机 [G]','Capsule machine [G]'),x:1108,y:356,w:217,h:315,run:()=>approach({x:1205,y:720},()=>open('capsule'),say('扭蛋机','capsules'))});
  for(let i=0;i<slots.length;i++) {const slot=slots[i],id=s.slots[i];if(id){if(i===3||i===4)shadow(g,slot.x,slot.y,30);paint(g,id,slot.x,slot.y,slot.w,slot.h);}}
  if(!active)label(g,say(`宝物 ${Object.keys(s.owned).length} / 50`,`Treasures ${Object.keys(s.owned).length} / 50`),1465,638,18,GOLD);
  if(!active&&!placing)hot({id:'prizes',label:say('查看收藏与布置 [C]','Collection & display [C]'),x:1390,y:311,w:195,h:350,run:()=>approach({x:1310,y:720},()=>open('collection'),say('收藏架','treasures'))});
  drawActors(g,dt,now);
  if(placing){
    slots.forEach((slot,i)=>{if(!displaySlots(placing!).includes(i))return;const hover=hot({id:'slot-'+i,label:say(`摆在位置 ${i+1}`,`Display spot ${i+1}`),x:slot.x-44,y:slot.y-60,w:88,h:85,run:()=>placeAt(placing!,i)});
      paint(g,placing!,slot.x,slot.y,slot.w,slot.h,hover?.9:.3);sparkle(g,slot.x,slot.y-slot.h-15,MINT);label(g,String(i+1),slot.x,slot.y+17,18,MINT);
    });
    choice(g,'cancel-place',say('取消摆放 [Esc]','Cancel placement [Esc]'),800,949,360,()=>{placing=null;});
  }else if(!active){
    const next=CHAPTERS.find(c=>!s.claims.includes(c.id));
    let cue=going?say('正在走近：','Walking to: ')+going:next?(totalTokens(s)>=next.tokens?say(`手册里有一份${cname(next.reward)}，可以摆进小屋 [J]`,`A ${cname(next.reward)} is ready in your journal [J]`):say(`下一份礼物：${cname(next.reward)} · 还需 ${fmtCompact(next.tokens-totalTokens(s))} token`,`Next gift: ${cname(next.reward)} · ${fmtCompact(next.tokens-totalTokens(s))} tokens away`)):say('下一步：抽一份惊喜，选择喜欢的位置展示 [G / C]','Next: find a surprise and choose where to display it [G / C]');
    if(now<toastUntil)cue=toast;
    label(g,cue,800,939,24,now<toastUntil?GOLD:INK,false,1270);
    label(g,say('点物件走近互动 · WASD 移动 · J 手册 · G 扭蛋 · C 收藏 · R 收获','Click objects to approach · WASD move · J journal · G capsules · C collection · R collect'),800,976,18,'#c1a994',false,1420);
  }
  if(saveIssue)label(g,say('试玩暂未保存，本页仍可继续。','Playtest could not save; this page remains playable.'),800,213,18,GOLD);
}
function drawBook(g:CanvasRenderingContext2D,collection=false) {
  paint(g,'journal',800,818,1140,660);
  if(collection){
    const item=byId[selectedPrize],owned=!!s.owned[item.id];
    label(g,say('我的收藏','My treasures'),548,277,30,DARK,true);
    paint(g,item.id,548,501,185,185,owned?1:.22);label(g,cname(item.id),548,543,28,DARK,true,370);
    label(g,owned?say(`已拥有 ×${s.owned[item.id]}`,`Owned ×${s.owned[item.id]}`):say('还没遇见的小惊喜','A surprise still to discover'),548,585,24,'#8d543e',true,370);
    choice(g,'display-prize',owned?say('选择展示位置','Choose a display spot'):say('去扭蛋机找惊喜','Find a surprise at the machine'),548,628,365,()=>owned?startPlacement(item.id):open('capsule'),true,true);
    label(g,say(`宝物 ${Object.keys(s.owned).length} / 50`,`Treasures ${Object.keys(s.owned).length} / 50`),1040,278,30,DARK,true);
    COLLECTIBLES.slice(collectionPage*6,collectionPage*6+6).forEach((c,i)=>{const x=904+(i%3)*128,y=427+Math.floor(i/3)*175;const own=!!s.owned[c.id];paint(g,c.id,x,y,92,105,own?1:.2);if(c.id===selectedPrize)sparkle(g,x,y-112,'#8d543e');label(g,own?cname(c.id):'???',x,y+25,18,DARK,true,115);hot({id:'collection-'+c.id,label:say('查看：','Inspect: ')+cname(c.id),x:x-55,y:y-108,w:110,h:143,run:()=>{selectedPrize=c.id;}});});
    choice(g,'prev-page','<',456,804,75,()=>{collectionPage--;},collectionPage>0);choice(g,'next-page','>',1158,804,75,()=>{collectionPage++;},collectionPage<Math.ceil(COLLECTIBLES.length/6)-1);
    label(g,`${collectionPage+1} / ${Math.ceil(COLLECTIBLES.length/6)}`,800,835,24,GOLD);
  }else{
    const c=CHAPTERS[chapter],ready=totalTokens(s)>=c.tokens,claimed=s.claims.includes(c.id);
    label(g,say('小屋成长手册','The arcade journal'),548,278,30,DARK,true);
    label(g,locale==='zh'?c.zh:c.en,548,330,24,'#8d543e',true);
    paint(g,c.reward,548,536,170,180,ready?1:.4);label(g,cname(c.reward),548,580,30,DARK,true,365);
    label(g,locale==='zh'?c.storyZh:c.storyEn,548,623,24,DARK,true,370);
    label(g,say('和小光一起长大','Grow a little, together'),1040,284,30,DARK,true);
    paint(g,'lumi'+companionGrowth(totalTokens(s)).stage,1040,458,155,145);
    label(g,`${fmtCompact(totalTokens(s))} / ${fmtCompact(c.tokens)} token`,1040,503,24,DARK,true);
    label(g,claimed?say('礼物已经收好，可随时重新摆放。','Yours to keep. Move it whenever you like.'):ready?say('礼物到了，给它找个位置吧。','A gift is ready. Find it a home.'):say('同步新的灵感，慢慢点亮这一页。','New ideas will light up this page.'),1040,552,24,DARK,true,365);
    choice(g,'claim-gift',claimed?say('重新摆放礼物','Move your gift'):ready?say('领取礼物并摆放','Unwrap & find a spot'):say('回去收集灵感','Back to collect ideas'),1040,617,365,()=>{if(!ready){open(null);approach({x:920,y:715},collect,say('收集灵感','collect ideas'));return;}if(!claimed){claimChapter(s,chapter);save();sound.confirm();}startPlacement(c.reward);},true,true);
    choice(g,'prev-page','<',456,804,75,()=>{chapter--;},chapter>0);choice(g,'next-page','>',1158,804,75,()=>{chapter++;},chapter<2);label(g,`${chapter+1} / 3`,800,835,24,GOLD);
  }
  choice(g,'close',say('收好册子 [Esc]','Close book [Esc]'),800,897,380,()=>open(null));
}
function drawCapsule(g:CanvasRenderingContext2D,now:number) {
  const pending=s.pending.length>0,age=now-revealAt,ready=pending&&(revealAt<0||reduced),r=s.pending[revealIndex];
  const shake=pending&&!ready&&age<650&&!reduced?Math.sin(now/34)*5:0;
  const unwrap=()=>{revealAt=-10000;sound.reveal(byId[r.id].rarity);if(!reduced)fx.burst(1040,475,RARITIES[byId[r.id].rarity].color,25);};
  paint(g,'capsule',548+shake,748,340,500);
  if(!pending&&s.coins>=25)hot({id:'machine-lever',label:say('扳动拉杆 · 25 金币','Pull the lever · 25 coins'),x:637,y:542,w:65,h:130,run:()=>pull(1)});
  label(g,say('小小惊喜，慢慢收藏','Little surprises to keep'),1040,314,30,GOLD);
  if(ready){
    paint(g,r.id,1040,577,205,200);label(g,cname(r.id),1040,620,30,RARITIES[byId[r.id].rarity].color,false,500);
    label(g,r.duplicate?say(`又遇见了 · +${r.dust} 星尘`,`A familiar friend · +${r.dust} dust`):say('新收藏！','A new treasure!'),1040,670,24,r.duplicate?INK:MINT);
  }else{
    paint(g,'ball',1040,566,180,185);label(g,pending?say('点开胶囊，小光也在等！','Open the capsule. Lumi is waiting!'):say('扳动拉杆，看看会遇见谁。','Pull the lever. Who will you meet?'),1040,631,24,INK,false,500);
    if(pending)hot({id:'open-capsule',label:say('点开胶囊','Open the capsule'),x:950,y:365,w:180,h:210,run:unwrap});
    label(g,say(`已收集 ${Object.keys(s.owned).length} / 50`,`Collected ${Object.keys(s.owned).length} / 50`),1040,678,24,MINT);
  }
  frame(g,190,758,1220,205);
  if(pending){
    if(!ready)choice(g,'skip-reveal',say('打开胶囊','Open capsule'),800,856,360,unwrap);
    else{
      choice(g,'display-result',say('摆进小屋','Display it'),455,851,270,()=>{const id=r.id;finishReveal();startPlacement(id);});
      if(revealIndex<s.pending.length-1)choice(g,'next-result',say(`下一件 ${revealIndex+1}/${s.pending.length}`,`Next ${revealIndex+1}/${s.pending.length}`),800,851,300,()=>{revealIndex++;sound.confirm();});
      else choice(g,'again',say('再抽一次 · 25','Another pull · 25'),800,851,310,()=>{finishReveal();pull(1);},s.coins>=25);
      choice(g,'keep-result',say('收好全部','Keep them all'),1150,851,250,()=>{selectedPrize=r.id;finishReveal();});
      label(g,saveIssue?say('奖励已留在本页，暂时无法保存。','Rewards are on this page, but saving is unavailable.'):say('奖品已收好，关闭界面或刷新也不会丢失。','Rewards are saved when you close this view or refresh.'),800,910,18,MINT);
    }
  }else{
    choice(g,'pull-one',say('扭一次 · 25','Pull one · 25'),455,825,300,()=>pull(1),s.coins>=25);
    choice(g,'pull-ten',say('扭十次 · 225','Pull ten · 225'),800,825,310,()=>pull(10),s.coins>=225);
    choice(g,'close',say('回小屋 [Esc]','Back [Esc]'),1150,825,260,()=>open(null));
    if(s.coins<25)choice(g,'more-coins',say(`还差 ${25-s.coins} 币 · 回去收集灵感`,`Need ${25-s.coins} coins · collect ideas`),800,900,650,()=>{open(null);approach({x:920,y:715},collect,say('收集灵感','collect ideas'));});
    else label(g,say(`星尘 ${s.dust} / 120 · 重复奖励可换未拥有的宝物`,`Dust ${s.dust} / 120 · duplicates help find a missing prize`),800,900,18,INK);
    if(s.dust>=120)choice(g,'exchange',say('120 星尘换未拥有宝物','120 dust for a missing prize'),800,943,600,()=>{if(exchangeMissing(s)){save();revealIndex=0;revealAt=now;}});
  }
}
function drawDialog(g:CanvasRenderingContext2D,now:number) {
  if(!active)return;g.fillStyle='rgba(16,9,26,.7)';g.fillRect(0,0,1600,1000);
  if(active==='book'||active==='collection')drawBook(g,active==='collection');
  else if(active==='capsule')drawCapsule(g,now);
  else if(active==='cabinet'){
    const info=levelInfo(s.tokens[selected]);paint(g,'cab'+info.stage.index,556,753,335,495);frame(g,760,350,650,290);
    label(g,locale==='zh'?projects[selected].zh:projects[selected].en,1080,420,36,GOLD);label(g,`Lv.${info.level} · ${fmtCompact(s.tokens[selected])} token`,1080,478,24,MINT);
    label(g,say(`下一级还需 ${fmtCompact(info.toNext)} token`,`Next level in ${fmtCompact(info.toNext)} tokens`),1080,530,24);
    choice(g,'favorite',s.favorite===selected?say('这是我的心爱机台','Your favorite cabinet'):say('设为心爱机台','Make this my favorite'),1080,585,470,()=>{s.favorite=selected;save();sound.confirm();});
    frame(g,190,758,1220,205);label(g,say('下一次收获，会继续点亮这里。','The next harvest brings more light here.'),800,832,24);choice(g,'close',say('回到小屋 [Esc]','Back to the room [Esc]'),800,901,450,()=>open(null));
  }else{
    frame(g,285,365,1030,410);label(g,say('雨夜小屋 · 互动试玩','Rainy arcade · interaction playtest'),800,439,30,GOLD);
    label(g,say('虚构用量与奖励，仅保留在当前标签页。','Fictional usage and rewards, kept in this browser tab.'),800,494,24,INK,false,850);
    choice(g,'lang',locale==='zh'?'English / 中文':'中文 / English',800,550,500,()=>{locale=locale==='zh'?'en':'zh';setLocale(locale==='zh'?'zh-CN':'en');});
    choice(g,'mute',muted?say('声音：关','Sound: off'):say('声音：开','Sound: on'),800,602,400,()=>{muted=!muted;sound.setMuted(muted);});
    choice(g,'close',say('回到小屋 [Esc]','Back to the room [Esc]'),800,673,450,()=>open(null));
  }
}
let signature='';
function updateSemantic() {
  const summary=say(`雨夜小屋。${s.coins} 金币，${Object.keys(s.owned).length} 件收藏。`,`Rainy arcade. ${s.coins} coins, ${Object.keys(s.owned).length} treasures.`);
  if(canvas.getAttribute('aria-label')!==summary)canvas.setAttribute('aria-label',summary);
  const next=actions.map(a=>a.id+':'+a.label).join('|');if(next===signature)return;signature=next;
  semantic.replaceChildren(...actions.map(a=>{const b=document.createElement('button');b.textContent=a.label;b.dataset.action=a.id;b.onclick=()=>a.run();return b;}));
}
window.addEventListener('keydown',e=>{
  if(e.key==='Escape'){e.preventDefault();placing=null;open(null);return;}
  if(e.key==='Tab'&&document.activeElement===canvas){const next=focusIndex+(e.shiftKey?-1:1);if(next<0||next>=actions.length){focusIndex=-1;return;}e.preventDefault();focusIndex=next;announce(actions[focusIndex]?.label??'');return;}
  if(e.target instanceof HTMLElement&&e.target.tagName==='BUTTON')return;
  if(e.key==='Enter'||e.key.toLowerCase()==='e'){if(focusIndex>=0){e.preventDefault();actions[focusIndex]?.run();focusIndex=-1;}return;}
  if(active||placing)return;
  const k=e.key.toLowerCase();
  if(['j','g','c','r'].includes(k)){e.preventDefault();sound.resume();if(k==='j')open('book');else if(k==='g')open('capsule');else if(k==='c')open('collection');else{open(null);collect();}return;}
  if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','w','a','s','d'].includes(e.key)){e.preventDefault();keys.add(e.key);}
});
window.addEventListener('keyup',e=>keys.delete(e.key));window.addEventListener('blur',()=>keys.clear());
canvas.addEventListener('pointerdown',()=>{canvas.focus({preventScroll:true});sound.resume();});
async function launch() {
  const boot=document.querySelector<HTMLElement>('#preview-boot')!;let done=0;
  const results=await Promise.allSettled(Object.entries(files).map(([id,url])=>new Promise<void>((resolve,reject)=>{const img=new Image();img.onload=()=>{art.set(id,img);boot.textContent=`小屋点灯中 ${++done}/${Object.keys(files).length}`;resolve();};img.onerror=()=>reject(new Error(url));img.src=url;})));
  const font=new FontFace('Fusion Pixel','url(./assets/fonts/fusion-pixel-12px-zh_hans.woff2)');try{await font.load();document.fonts.add(font);}catch{announce('Pixel font unavailable');}
  if(!art.has('room')){boot.textContent='小屋加载失败，请刷新重试。';return;}
  if(results.some(r=>r.status==='rejected'))announce('部分试玩素材未加载');
  let ready=false;
  stage.start((g,dt,now)=>{actions=[];hoverLabel='';fx.update(dt);drawRoom(g,dt,now);
    if(active){actions=[];stage.hotspot({id:'modal-block',x:0,y:0,w:1600,h:1000,onClick:()=>{}});drawDialog(g,now);}
    else if(hoverLabel&&!placing)label(g,hoverLabel,Math.min(1380,Math.max(220,hoverX)),hoverY,24,GOLD,false,560);
    if(focusIndex>=actions.length)focusIndex=-1;updateSemantic();fx.draw(g,1600);
    if(!ready){ready=true;boot.remove();canvas.focus({preventScroll:true});}
  });
}
Object.defineProperty(window,'cozyPreview',{value:Object.freeze({snapshot:()=>({coins:s.coins,petStage:companionGrowth(totalTokens(s)).stage,collectionCount:Object.keys(s.owned).length,dialog:active,locale,player:{...player},pet:{...pet},placing,going,progress:JSON.parse(JSON.stringify(s))})})});
void launch();
