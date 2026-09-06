/** A room first: physical cabinets, a walkable floor, and a persistent growth goal. */
import type { Screen, ScreenContext } from './screen';
import type { AssetName } from '../render/assets';
import { drawImageSmooth, collectibleIcon } from '../render/assets';
import { drawImageContain, drawCropContain, drawIconCentered, radial, EasedNumber } from '../render/widgets';
import { PLAYER_BODY_CROP, stageAccent } from '../render/atlas';
import { drawCabinet } from '../render/cabinet';
import { drawCoin, drawPlayer, drawSpriteCentered } from '../render/sprites';
import { levelInfo } from '../domain/levels';
import { growthStatus, companionGrowth } from '../domain/growth';
import { fmtCompact, fmtComma } from '../domain/economy';
import { COLLECTIBLES } from '../content';
import { tCollectibleName } from '../i18n';
import { RoomDecorController } from './roomDecor';
import { GrowthJournal } from '../ui/growthJournal';

const C = { base:'#121726', panel:'#202b3d', ink:'#f5eddb', muted:'#a5b1bc', mint:'#88ddc6', gold:'#ffda8a', pink:'#de99bd', edge:'#3c4e61' };
function text(g: CanvasRenderingContext2D, s: string, x: number, y: number, size=20, color=C.ink, align: CanvasTextAlign='left') {
  g.font = `${size >= 28 ? 600 : 500} ${size}px "PingFang SC", "Microsoft YaHei", system-ui, sans-serif`;
  g.fillStyle=color; g.textAlign=align; g.textBaseline='middle'; g.fillText(s,x,y); g.textAlign='left';
}
function box(g: CanvasRenderingContext2D,x:number,y:number,w:number,h:number,fill=C.panel,edge=C.edge) {
  g.fillStyle='#090d16';g.fillRect(x,y+5,w,h);g.fillStyle=fill;g.fillRect(x,y,w,h);g.strokeStyle=edge;g.lineWidth=2;g.strokeRect(x+1,y+1,w-2,h-2);
}
function meter(g: CanvasRenderingContext2D,x:number,y:number,w:number,p:number,color=C.mint) {
  g.fillStyle='#101622';g.fillRect(x,y,w,7);g.fillStyle=color;g.fillRect(x,y,w*Math.max(0,Math.min(1,p)),7);
}

export class RoomScreen implements Screen {
  readonly name='room';
  private syncing=false;
  private displayCoins=new EasedNumber();
  private page=0;
  private actor={x:780,y:765};
  private destination={x:780,y:765};
  private keys=new Set<string>();
  private journal: GrowthJournal;
  private decor: RoomDecorController;
  private accessible: HTMLElement;
  private reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  private message='';
  private messageUntil=0;
  private receipt: {tokens:number; coins:number; levels:number} | null=null;
  private active=false;
  constructor(private ctx:ScreenContext) {
    this.journal=new GrowthJournal(ctx);
    this.decor=new RoomDecorController(ctx);
    this.accessible=document.createElement('nav');
    this.accessible.className='room-access';
    this.accessible.setAttribute('aria-label','Arcade controls');
    document.body.append(this.accessible);
    window.addEventListener('keydown',e=>{
      if(!this.active || this.journal.isOpen || document.querySelector('#overlays .ta-modal') || (e.target instanceof HTMLElement && /INPUT|TEXTAREA|BUTTON/.test(e.target.tagName))) return;
      if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','w','a','s','d'].includes(e.key)) {e.preventDefault();this.keys.add(e.key);}
      if(e.key.toLowerCase()==='j')this.journal.open();
      if(e.key==='Escape')this.keys.clear();
    });
    window.addEventListener('keyup',e=>this.keys.delete(e.key));
    window.addEventListener('blur',()=>this.keys.clear());
  }
  private say(zh:string,en:string) {return this.ctx.store.state.settings.language==='zh-CN'?zh:en;}
  enter() {this.active=true;this.displayCoins.set(this.ctx.store.state.coins);this.decor.reset();this.accessible.hidden=false;this.updateAccess();}
  leave() {this.active=false;this.keys.clear();this.journal.close();this.accessible.hidden=true;}
  private updateAccess() {
    const actions:[string,()=>void][]=[
      [this.say('同步领币','Sync tokens'),()=>void this.doSync()],
      [this.say('成长手册','Growth journal'),()=>this.journal.open()],
      [this.say('我的机台','My cabinets'),()=>this.journal.open('projects')],
      [this.say('扭蛋收藏','Capsules'),()=>this.ctx.router.go('capsule')],
      [this.say('布置小店','Decorate'),()=>this.decor.openDecorationEditor()],
      [this.say('设置','Settings'),()=>this.ctx.openSettings()],
    ];
    this.accessible.replaceChildren(...actions.map(([label,action])=>{const b=document.createElement('button');b.textContent=label;b.onclick=action;return b;}));
  }
  private button(g:CanvasRenderingContext2D,label:string,x:number,y:number,w:number,h:number,action:()=>void,primary=false,id=label) {
    const hover=this.ctx.stage.hotspot({x,y,w,h,id,onClick:action,cursor:'pointer'});
    box(g,x,y,w,h,primary?(hover?'#ffdfa0':C.gold):hover?'#34465a':C.panel,primary?C.gold:C.edge);
    text(g,label,x+w/2,y+h/2,20,primary?'#302818':C.ink,'center');
  }
  render(g:CanvasRenderingContext2D,dt:number,now:number) {
    const state=this.ctx.store.state;
    this.displayCoins.toward(state.coins,dt);
    this.ctx.fx.setToastZone(800,175,380);
    g.fillStyle=C.base;g.fillRect(0,0,1600,1000);
    if(!this.decor.editing)this.ctx.stage.hotspot({x:62,y:675,w:1476,h:151,id:'walk-floor',onClick:()=>{this.destination={x:Math.max(120,Math.min(1480,this.ctx.stage.mouse.x)),y:Math.max(710,Math.min(810,this.ctx.stage.mouse.y))};},cursor:'crosshair'});
    this.drawHeader(g);
    this.drawRoom(g,now);
    this.drawCabinets(g);
    this.drawRewardCorner(g);
    this.decor.drawDisplays(g,this.reduced?0:now);
    this.drawActors(g,dt,now);
    if(this.decor.editing) {this.decor.drawEditor(g,now);return;}
    this.drawGoal(g);
    this.drawNavigation(g);
    this.decor.drawTooltip(g);
    if(this.messageUntil>now) {
      box(g,500,688,600,55,'#263b42',C.mint);text(g,this.message,800,716,19,C.ink,'center');
    }
    this.drawNoHistory(g);
  }
  private drawHeader(g:CanvasRenderingContext2D) {
    const s=this.ctx.store.state,player=this.ctx.store.playerLevel();
    text(g,'TOKEN ARCADE',44,43,28,C.ink);
    text(g,this.say('把每一点灵感，养成自己的小世界。','A little world, grown from your ideas.'),44,80,18,C.muted);
    const name=this.ctx.store.playerName()||this.say('街机店长','Arcade keeper');
    this.ctx.stage.hotspot({x:510,y:22,w:360,h:80,id:'player-name',onClick:()=>this.ctx.editPlayerName(),cursor:'pointer'});
    text(g,`${name}  /  Lv.${player.level}`,530,42,21,C.mint);meter(g,530,65,205,player.into/player.need);
    text(g,this.say('小店和你一起长大','A place that grows with you'),530,89,15,C.muted);
    drawCoin(g,1128,44,16);text(g,fmtComma(this.displayCoins.value),1157,44,29,C.gold);
    text(g,`${fmtCompact(s.stats.lifetimeTokens)} tokens`,1110,82,17,C.muted);
    this.button(g,this.syncing?this.say('接通电力中…','Powering up…'):this.say('同步 · 收集金币','Sync & collect'),1340,25,216,66,()=>void this.doSync(),true,'sync');
    g.fillStyle=C.edge;g.fillRect(44,119,1512,1);
    text(g,this.say('我的街机小屋','My arcade hideaway'),48,145,18,C.ink);
    text(g,s.mode==='demo'?this.say('演示小屋 · 模拟 token · 独立存档','Demo arcade · simulated tokens · separate save'):this.say('本地小屋 · 进度自动保存','Local arcade · progress saved on this device'),1552,145,15,C.muted,'right');
  }
  private drawRoom(g:CanvasRenderingContext2D,now:number) {
    const s=this.ctx.store.state;
    const theme=s.cosmetics.roomTheme;
    const bg=this.ctx.assets.get(theme==='e_sunset'?'roomThemeSunset':theme==='l_forest'?'roomThemeForest':'roomBg');
    box(g,40,170,1520,664,'#212736','#485362');
    g.save();g.beginPath();g.rect(48,178,1504,648);g.clip();
    if(bg) {drawImageSmooth(g,bg,48,178,1504,648);g.fillStyle='rgba(17,26,39,.35)';g.fillRect(48,178,1504,440);}
    else {g.fillStyle='#283344';g.fillRect(48,178,1504,648);}
    // A quieter wall and warm plank floor provide depth around the generated objects.
    const wall=g.createLinearGradient(0,180,0,615);wall.addColorStop(0,'rgba(26,35,48,.94)');wall.addColorStop(1,'rgba(26,35,48,.32)');
    if(theme==='base'){g.fillStyle=wall;g.fillRect(48,178,1504,430);}
    g.fillStyle=theme==='l_forest'?'#34463e':theme==='e_sunset'?'#715046':'#514044';g.fillRect(48,614,1504,212);
    for(let row=0;row<8;row++) {const y=614+row*30;g.fillStyle=row%2?'rgba(255,211,160,.04)':'rgba(0,0,0,.05)';g.fillRect(48,y,1504,30);g.fillStyle='#322b35';g.fillRect(48,y,1504,2);for(let x=48+(row%2)*135;x<1552;x+=270)g.fillRect(x,y,2,30);}
    g.fillStyle='#222a37';g.fillRect(48,596,1504,18);g.fillStyle='#927563';g.fillRect(48,613,1504,3);
    // Lamps are earned from lifetime token thresholds, permanently.
    const lit=growthStatus(s).filter(c=>c.ready).length;
    for(let i=0;i<9;i++){const x=150+i*162;g.fillStyle='#51616a';g.fillRect(x,178,2,40+(i%2)*17);g.fillStyle=i<lit+2?C.gold:'#57606a';g.fillRect(x-5,216+(i%2)*17,12,9);if(i<lit+2)radial(g,x,227+(i%2)*17,42,'rgba(255,218,138,.10)');}
    g.strokeStyle='#53616c';g.lineWidth=1;g.beginPath();g.moveTo(150,218);for(let i=1;i<9;i++)g.lineTo(150+i*162,218+(i%2)*17);g.stroke();
    g.restore();
    // Small mounted room sign; always steady, never flashing.
    box(g,668,208,265,83,'#192330','#536071');
    text(g,'little token club',800,241,25,C.gold,'center');
    text(g,this.say('慢慢来，也会闪闪发光','Small steps. Brighter days.'),800,271,14,C.muted,'center');
    text(g,this.say('点击地板散散步 · 方向键 / WASD 移动','Click the floor to wander · Arrow keys / WASD'),800,810,14,'#c7b8b0','center');
  }
  private drawCabinets(g:CanvasRenderingContext2D) {
    const s=this.ctx.store.state;
    const projects=[...s.projects];
    const favorite=projects.findIndex(p=>p.id===s.featuredProjectId);
    if(favorite>0)projects.unshift(...projects.splice(favorite,1));
    const pages=Math.max(1,Math.ceil(projects.length/4));this.page=Math.min(this.page,pages-1);
    text(g,this.say('项目游乐区','Project corner'),111,295,19,C.mint);
    this.button(g,this.say('全部机台','All cabinets'),598,277,143,35,()=>this.journal.open('projects'),false,'all-projects');
    if(pages>1){this.button(g,'‹',111,671,42,34,()=>{this.page=(this.page+pages-1)%pages;},false,'prev-projects');text(g,`${this.page+1} / ${pages}`,200,688,15,C.muted,'center');this.button(g,'›',246,671,42,34,()=>{this.page=(this.page+1)%pages;},false,'next-projects');}
    const shown=projects.slice(this.page*4,this.page*4+4);
    for(let i=0;i<4;i++) {
      const p=shown[i], x=103+i*167;
      const info=levelInfo(p?.tokens??0),accent=stageAccent(info.stage.index);
      const hover=!!p&&this.ctx.stage.hotspot({x,y:330,w:157,h:334,id:`cabinet-${p.id}`,cursor:'pointer',onClick:()=>this.ctx.router.go('cabinet',{id:p.id})});
      g.fillStyle='rgba(10,12,19,.45)';g.beginPath();g.ellipse(x+78,605,70,14,0,0,Math.PI*2);g.fill();
      if(p){radial(g,x+78,532,108,hover?'rgba(136,221,198,.2)':'rgba(136,221,198,.045)');}
      const art=this.ctx.assets.get(`projCabStage${info.stage.index+1}` as AssetName);
      g.save();if(!p)g.globalAlpha=.24;
      if(art)drawImageContain(g,art,x+78,464-(hover?5:0),156,280);
      else drawCabinet(g,x+8,348,140,255,{name:p?.name??'?',level:p?.level??1,on:!!p,progress:info.progress});
      g.restore();
      box(g,x+7,609,143,51,'#1a2533',p?accent:'#46525b');
      const label=p?p.name:this.say('等待新项目','A new beginning');
      let size=17;while(size>11){g.font=`500 ${size}px system-ui`;if(g.measureText(label).width<128)break;size--;}
      g.save();g.beginPath();g.rect(x+10,610,136,47);g.clip();text(g,label,x+78,625,size,p?C.ink:C.muted,'center');g.restore();
      text(g,p?`Lv.${p.level}  ${p.id===s.featuredProjectId?'♥':info.stage.name.toLowerCase()}`:this.say('同步后亮起','Sync to power up'),x+78,647,12,p?accent:C.muted,'center');
      if(p)meter(g,x+12,656,132,info.progress,accent);
    }
  }
  private object(g:CanvasRenderingContext2D,id:AssetName,cx:number,cy:number,w:number,h:number,label:string,action:()=>void) {
    const hover=this.ctx.stage.hotspot({x:cx-w/2,y:cy-h/2,w,h:h+52,id,onClick:action,cursor:'pointer'});
    g.fillStyle='rgba(10,12,19,.4)';g.beginPath();g.ellipse(cx,cy+h/2-6,w*.43,15,0,0,Math.PI*2);g.fill();
    if(hover)radial(g,cx,cy,Math.max(w,h)*.5,'rgba(255,218,138,.13)');
    const art=this.ctx.assets.get(id);if(art)drawImageContain(g,art,cx,cy-(hover?3:0),w,h);else {box(g,cx-w*.4,cy-h*.4,w*.8,h*.8);drawSpriteCentered(g,'goldCoin',cx,cy,70);}
    box(g,cx-w/2,cy+h/2+10,w,36,'#1c2835',hover?C.gold:C.edge);text(g,label,cx,cy+h/2+28,17,hover?C.gold:C.ink,'center');
  }
  private drawRewardCorner(g:CanvasRenderingContext2D) {
    const s=this.ctx.store.state;
    this.object(g,'coinBank',902,456,214,306,this.say('灵感储蓄罐','Token bank'),()=>void this.doSync());
    text(g,this.say('同步，让小店充满电','A little power for your arcade'),902,636,15,C.gold,'center');
    this.object(g,'capsuleMachine',1190,469,190,278,this.say('惊喜扭蛋 · 25 币','Capsules · 25 coins'),()=>this.ctx.router.go('capsule'));
    this.object(g,'prizeWall',1410,443,188,330,this.say('我的宝物','My treasures'),()=>this.ctx.router.go('capsule'));
    const owned=COLLECTIBLES.filter(c=>s.owned[c.id]?.count>0).slice(0,9);
    owned.forEach((c,i)=>{const icon=collectibleIcon(c.id);if(icon)drawIconCentered(g,icon,1353+(i%3)*56,353+Math.floor(i/3)*73,40);});
    if(!owned.length)text(g,this.say('等一份小惊喜','Room for little wonders'),1410,431,13,C.muted,'center');
    text(g,`${this.ctx.store.ownedCount()} / ${COLLECTIBLES.length}`,1410,649,15,C.pink,'center');
  }
  private drawActors(g:CanvasRenderingContext2D,dt:number,now:number) {
    const blocked=this.journal.isOpen||this.decor.editing||!!document.querySelector('#overlays .ta-modal');
    let dx=0,dy=0;
    if(!blocked){dx=Number(this.keys.has('ArrowRight')||this.keys.has('d'))-Number(this.keys.has('ArrowLeft')||this.keys.has('a'));dy=Number(this.keys.has('ArrowDown')||this.keys.has('s'))-Number(this.keys.has('ArrowUp')||this.keys.has('w'));}
    if(dx||dy)this.destination={x:Math.max(120,Math.min(1480,this.actor.x+dx*240*dt)),y:Math.max(712,Math.min(802,this.actor.y+dy*240*dt))};
    const distance=Math.hypot(this.destination.x-this.actor.x,this.destination.y-this.actor.y);
    const movement=blocked?0:Math.min(1,dt*6);this.actor.x+=(this.destination.x-this.actor.x)*movement;this.actor.y+=(this.destination.y-this.actor.y)*movement;
    const {x,y}=this.actor;const bob=!this.reduced&&distance>2?Math.sin(now/85)*3:0;
    g.fillStyle='#372f3b';g.beginPath();g.ellipse(x,y,34,10,0,0,Math.PI*2);g.fill();
    const player=this.ctx.assets.get('homePlayer');
    if(player)drawCropContain(g,player,PLAYER_BODY_CROP,x-41,y-130+bob,82,130,true);else drawPlayer(g,x-24,y-90,3);
    const pet=companionGrowth(this.ctx.store.state.stats.lifetimeTokens);
    const px=x+75,py=y-27+(this.reduced?0:Math.sin(now/500)*2);
    g.save();g.translate(Math.round(px),Math.round(py));g.scale(3,3);
    g.fillStyle='#332c38';g.fillRect(-10,9,21,3);g.fillStyle=C.mint;
    g.fillRect(-9,-7,18,15);g.fillRect(-6,-11,12,21);g.fillRect(-12,-3,24,8);
    if(pet.stage>0){g.fillRect(-8,-16,5,9);g.fillRect(4,-16,5,9);}
    if(pet.stage>1){g.fillStyle=C.pink;g.fillRect(-17,-5,7,4);g.fillRect(11,-5,7,4);}
    g.fillStyle='#213949';g.fillRect(-5,-3,2,4);g.fillRect(4,-3,2,4);g.fillRect(-1,4,3,1);
    g.fillStyle='#e0b9b8';g.fillRect(-8,3,3,2);g.fillRect(6,3,3,2);
    if(pet.stage>2){g.fillStyle=C.gold;g.fillRect(-5,-16,11,3);g.fillRect(-5,-20,2,4);g.fillRect(0,-21,2,5);g.fillRect(4,-20,2,4);}
    g.restore();
    const hover=this.ctx.stage.hotspot({x:px-42,y:py-58,w:84,h:82,id:'lumi',cursor:'pointer',onClick:()=>{this.ctx.sound.confirm();this.message=this.say('小光：今天也有好好长大。','Lumi: a little brighter, together.');this.messageUntil=performance.now()+2200;this.journal.open();}});
    if(hover){text(g,this.say('小光 · 查看成长','Lumi · see growth'),px,py-76,16,C.mint,'center');}
  }
  private drawGoal(g:CanvasRenderingContext2D) {
    const statuses=growthStatus(this.ctx.store.state),goal=statuses.find(c=>!c.claimed),ready=statuses.filter(c=>c.ready&&!c.claimed).length;
    box(g,40,855,765,107,'#27313e','#596477');
    const img=goal?collectibleIcon(goal.reward):null;
    if(img)drawIconCentered(g,img,91,907,60);else drawSpriteCentered(g,'starBadge',91,907,42);
    text(g,ready?this.say(`${ready} 份成长礼物等你拆开`,`${ready} growth gifts are waiting`):this.say('小店的下一步','A little something to grow toward'),139,880,16,C.gold);
    text(g,goal?(this.ctx.store.state.settings.language==='zh-CN'?goal.zh:goal.en):this.say('你的小店，已经长成了传说','Your little arcade is a legend'),139,909,24,C.ink);
    text(g,goal?(goal.ready?this.say('已经达成，快打开成长手册吧','Ready! Open your journal to collect it.'):this.say('还需 ','')+fmtCompact(goal.tokens-this.ctx.store.state.stats.lifetimeTokens)+' tokens · '+tCollectibleName(goal.reward)):this.say('接下来，继续收集你的心头好','Keep collecting the things you love'),139,941,15,C.muted);
    this.button(g,this.say('成长手册','Journal'),638,878,144,55,()=>this.journal.open(),ready>0,'journal');
    if(goal)meter(g,139,954,465,goal.progress,C.gold);
  }
  private drawNavigation(g:CanvasRenderingContext2D) {
    const y=861;
    this.button(g,this.say('扭蛋与收藏','Capsules'),828,y,220,55,()=>this.ctx.router.go('capsule'),false,'capsules');
    this.button(g,this.say('布置小店','Decorate'),1062,y,220,55,()=>this.decor.openDecorationEditor(),false,'decorate');
    this.button(g,this.say('礼物商店','Gift shop'),1296,y,260,55,()=>this.journal.open('shop'),false,'shop');
    const controls=[{label:this.say('房间主题','Room themes'),fn:()=>this.ctx.router.go('customize')},{label:this.say('成就','Achievements'),fn:()=>this.ctx.router.go('achievements')},{label:this.say('设置','Settings'),fn:()=>this.ctx.openSettings()},{label:this.ctx.store.state.settings.muted?this.say('声音：关','Sound off'):this.say('声音：开','Sound on'),fn:()=>this.ctx.sound.setMuted(this.ctx.store.toggleMute())}];
    controls.forEach((c,i)=>{const x=844+i*182;const h=this.ctx.stage.hotspot({x:x-10,y:926,w:172,h:35,id:'utility-'+i,onClick:c.fn,cursor:'pointer'});text(g,c.label,x,945,16,h?C.ink:C.muted);});
    text(g,this.receipt?this.say(`刚刚收获 ${fmtCompact(this.receipt.tokens)} tokens · +${this.receipt.coins} 金币 · ${this.receipt.levels} 台升级`,`Just collected ${fmtCompact(this.receipt.tokens)} tokens · +${this.receipt.coins} coins · ${this.receipt.levels} level-ups`):this.say('同步灵感 → 机台长大 → 拆开礼物 → 把小店布置成喜欢的样子','Sync ideas → grow cabinets → unwrap gifts → make this place yours'),800,986,14,C.muted,'center');
  }
  private async doSync() {
    if(this.syncing)return;this.syncing=true;
    try {
      const before=companionGrowth(this.ctx.store.state.stats.lifetimeTokens).stage;
      const result=await this.ctx.store.sync();
      this.receipt={tokens:result.newTokens,coins:result.coinsMinted,levels:result.levelUps.length};
      if(result.newTokens>0){
        if(!this.reduced)this.ctx.fx.coinRain(902,470,Math.min(36,Math.max(6,result.coinsMinted)),{x:1190,y:44});
        this.ctx.fx.banner('+'+result.coinsMinted,902,355,C.gold,{scale:4,life:2});this.ctx.sound.coin();
        this.message=this.say('灵感已存好，小店又长大了一点。','Ideas saved. Your little arcade grew a little.');
        if(companionGrowth(this.ctx.store.state.stats.lifetimeTokens).stage>before){this.message=this.say('小光进化了！打开成长手册看看吧。','Lumi evolved! Take a look in your journal.');this.ctx.sound.levelUp();}
        result.levelUps.forEach(p=>this.ctx.fx.pulse(p.id));
      }else this.message=this.say('已经同步好了，新的灵感到来时再来吧。','All caught up. Come back when new ideas arrive.');
      this.messageUntil=performance.now()+3500;
    }catch{this.message=this.say('同步失败，请稍后重试。','Sync failed. Please try again.');this.messageUntil=performance.now()+3500;this.ctx.sound.error();}
    finally{this.syncing=false;}
  }
  async tryLiveScanFromSettings(){if(this.syncing)return;this.ctx.store.setMode('live');this.displayCoins.set(this.ctx.store.state.coins);await this.doSync();}
  private drawNoHistory(g:CanvasRenderingContext2D) {
    const s=this.ctx.store.state;if(s.mode!=='live'||s.historyScan!=='no-history')return;
    this.ctx.stage.hotspot({x:0,y:0,w:1600,h:1000,id:'no-history-shield',onClick:()=>{}});
    g.fillStyle='rgba(9,14,24,.8)';g.fillRect(0,0,1600,1000);box(g,415,330,770,325,C.panel,C.mint);
    text(g,this.say('你的小店，准备开张。','Your arcade is ready to open.'),800,387,32,C.ink,'center');
    text(g,this.say('暂时没找到本地 token 记录。先到演示小屋玩一会儿？','No local token history yet. Try a separate demo arcade.'),800,451,20,C.muted,'center');
    text(g,this.say('演示与真实进度分别保存。','Demo progress is saved separately from real progress.'),800,486,17,C.muted,'center');
    this.button(g,this.say('进入演示小屋','Enter demo arcade'),457,545,330,64,()=>{if(this.syncing)return;this.ctx.store.setMode('demo');this.displayCoins.set(this.ctx.store.state.coins);void this.doSync();},true,'demo-choice');
    this.button(g,this.say('再找一次','Scan again'),811,545,330,64,()=>void this.doSync(),false,'scan-choice');
  }
}
