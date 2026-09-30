import { PedestrianTraffic, samplePatrol, type WalkPoint, type PatrolTrack } from './pedestrians';
import type { Building } from './types';
import { dimensions } from './world';
import type { FarmJob } from './farming';
export interface Home {id:string; outside:WalkPoint; inside:WalkPoint; yaw:number}
export function homeForBuilding(b:Building):Home {
  const dims=dimensions(b),yaw=-b.rotation*Math.PI/2,hall=b.kind==='hall';
  const point=(x:number,z:number)=>({x:b.x+dims.w/2+x*Math.cos(yaw)+z*Math.sin(yaw),z:b.z+dims.d/2-x*Math.sin(yaw)+z*Math.cos(yaw)});
  return {id:b.id,outside:point(hall?0:.18,hall?1.78:1.32),inside:point(hall?0:.18,hall?.91:.65),yaw};
}
export interface ResidentSeat {id?:string; position:WalkPoint; via:WalkPoint; yaw:number; y:number}
export interface VisitPlace {id:string; position:WalkPoint; target?:WalkPoint}
type Activity='visiting'|'lingering'|'walking'|'working'|'going-home'|'approaching'|'entering'|'sleeping'|'opening-out'|'leaving'|'joining'|'seated'|'standing'|'going-seat'|'sitting';
export interface ResidentActivity {mode:Activity; visible:boolean; home:number; seat?:ResidentSeat; path:WalkPoint[]; wait:number; travelled:number; seated:boolean; joinArc?:number; nextVisit:number; visitId?:string}
interface HouseDoor extends Home {exit:number; open:number; busy:number|null}
const distance=(a:WalkPoint,b:WalkPoint)=>Math.hypot(a.x-b.x,a.z-b.z);
const mod=(n:number,l:number)=>((n%l)+l)%l;
export function nearestPatrol(track:PatrolTrack,p:WalkPoint):number {
  let best=Infinity,arc=0;track.points.forEach((a,i)=>{const b=track.points[(i+1)%track.points.length],dx=b.x-a.x,dz=b.z-a.z,length=Math.hypot(dx,dz);const t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(length*length)));const d=Math.hypot(a.x+dx*t-p.x,a.z+dz*t-p.z);if(d<best){best=d;arc=track.lengths[i]+t*length;}});return arc;
}
// A home owns its doorway while one resident enters/exits. Others keep strolling
// on the separated sidewalk lanes, instead of piling up against a closed door.
export class ResidentLife {
  readonly doors:HouseDoor[];
  readonly residents:ResidentActivity[];
  jobs = new Map<number, FarmJob>();
  private routesDirty=false;
  private places:VisitPlace[]=[];
  private pavement=new Set<string>();
  private randomSeed=479;
  private random():number {this.randomSeed=(Math.imul(this.randomSeed,1664525)+1013904223)>>>0;return this.randomSeed/4294967296;}
  setPlaces(places:VisitPlace[],pavement:Set<string>):void {
    const roadsChanged=this.pavement.size!==pavement.size||[...this.pavement].some(p=>!pavement.has(p));
    const festival=places.filter(p=>p.id.startsWith('festival-'));if(festival.length&&!this.places.some(p=>p.id.startsWith('festival-')))for(const r of this.residents)r.nextVisit=Math.min(r.nextVisit,3);this.places=festival.length?festival:places;this.pavement=pavement;
    for(const r of this.residents)if(r.visitId&&(roadsChanged||!places.some(p=>p.id===r.visitId))){r.mode='joining';r.path=[];r.joinArc=undefined;r.visitId=undefined;}
  }
  private workRoute?: (from:WalkPoint,to:WalkPoint)=>WalkPoint[];
  assignJobs(jobs:FarmJob[], route:(from:WalkPoint,to:WalkPoint)=>WalkPoint[]):void {
    this.workRoute=route;
    const workers=this.residents.map((r,i)=>({r,i})).filter(({r})=>!r.seat);
    const next=new Map<number,FarmJob>();
    jobs.forEach((job,index)=>{const worker=workers[index];if(!worker)return;const {r,i}=worker,p=this.traffic.people[i];next.set(i,job);
      if(['walking','visiting','lingering'].includes(r.mode)||r.mode==='working'&&(this.routesDirty||this.jobs.get(i)?.fieldId!==job.fieldId)) {r.visitId=undefined;r.mode='working';p.active=false;p.speed=0;r.path=[...route(p,job.entrance),job.target];}
    });
    this.residents.forEach((r,i)=>{if(r.mode==='working'&&!next.has(i)){r.mode='joining';r.path=[];r.joinArc=undefined;}});
    this.jobs=next;
    this.routesDirty=false;
  }
  constructor(readonly traffic:PedestrianTraffic,homes:Home[],sleep=false,seats:Map<number,ResidentSeat>=new Map()) {
    this.doors=homes.map(h=>({...h,exit:nearestPatrol(traffic.track,h.outside),open:0,busy:null}));
    this.residents=traffic.people.map((p,i)=>{const seat=seats.get(i),home=this.doors.length?i%this.doors.length:-1;const mode=sleep&&home>=0?'sleeping':seat?'seated':'walking';p.active=mode==='walking';if(mode==='sleeping')Object.assign(p,this.doors[home].inside);else if(seat)Object.assign(p,seat.position,{angle:seat.yaw});return {mode,visible:mode!=='sleeping',home,seat,path:[],wait:0,travelled:0,seated:mode==='seated',nextVisit:4+i*1.7};});
  }
  retarget(homes: Home[], seats: ResidentSeat[]): void {
    this.routesDirty=true;
    const oldHomes = this.residents.map(r => this.doors[r.home]?.id);
    const doors = homes.map(h => { const old = this.doors.find(d => d.id === h.id); return old ? Object.assign(old, h, { exit: nearestPatrol(this.traffic.track, h.outside) }) : { ...h, exit: nearestPatrol(this.traffic.track, h.outside), open: 0, busy: null }; });
    this.doors.splice(0, this.doors.length, ...doors);
    this.residents.forEach((r, i) => {
      const home = this.doors.findIndex(h => h.id === oldHomes[i]); r.home = home >= 0 ? home : this.doors.length ? i % this.doors.length : -1;
      if(r.mode==='joining'){r.joinArc=undefined;r.path=[];}
      else if (r.joinArc !== undefined) r.joinArc = nearestPatrol(this.traffic.track, this.traffic.people[i]);
      if (r.seat?.id) {
        const seat = seats.find(s => s.id === r.seat!.id);
        if (seat) r.seat = seat;
        else if (r.seated) { r.seated = false; r.mode = 'joining'; r.path = [samplePatrol(this.traffic.track, nearestPatrol(this.traffic.track, this.traffic.people[i]))]; r.seat = undefined; }
        else r.seat = undefined;
      }
    });
  }
  update(dt:number,sleep:boolean):void {
    this.traffic.blockers=[];
    this.residents.forEach((r,i)=>{const p=this.traffic.people[i];if(p.active)return;if(r.joinArc!==undefined)this.traffic.blockers.push(r.joinArc);if(!r.visible||r.seated)return;
      const arc=nearestPatrol(this.traffic.track,p);if(distance(p,samplePatrol(this.traffic.track,arc))<(['visiting','lingering'].includes(r.mode)?.22:.46))this.traffic.blockers.push(arc);
    });
    this.traffic.update(dt);
    this.doors.forEach(h=>{const wanted=h.busy!==null?1:0;h.open+=Math.max(-dt*1.8,Math.min(dt*1.8,wanted-h.open));});
    this.residents.forEach((r,i)=>{
      const p=this.traffic.people[i],h=this.doors[r.home];r.travelled=p.travelled;r.wait=Math.max(0,r.wait-dt);r.nextVisit=Math.max(0,r.nextVisit-dt);
      if(['visiting','lingering'].includes(r.mode)&&sleep){r.mode='joining';r.path=[];r.joinArc=undefined;r.visitId=undefined;}
      if(r.mode==='walking'&&!sleep&&!r.seat&&!this.jobs.has(i)&&!r.nextVisit&&this.workRoute){
        const taken=new Set(this.residents.map(v=>v.visitId).filter(Boolean));
        const candidates=this.places.filter(v=>!taken.has(v.id)&&distance(p,v.position)>.8);
        if(candidates.length&&taken.size<3&&!this.residents.some(v=>v.mode==='visiting')){const place=candidates[Math.floor(this.random()*candidates.length)],path=this.workRoute(p,place.position);
          if(path.length){r.visitId=place.id;r.mode='visiting';r.path=[...path,place.target||place.position];p.active=false;p.speed=0;}}
        r.nextVisit=20+this.random()*35;
      }
      if(r.mode==='joining'&&r.joinArc===undefined&&this.traffic.track.length){
        const start=sleep&&h?mod(h.exit-.30,this.traffic.track.length):nearestPatrol(this.traffic.track,p);
        for(let step=0;step<this.traffic.track.length;step+=.5){const arc=mod(start+step,this.traffic.track.length);if(!this.joinAvailable(arc,1.5,i))continue;
          r.joinArc=arc;const point=samplePatrol(this.traffic.track,arc);r.path=[...(this.workRoute?.(p,point)||[]),point];break;}
        if(r.joinArc===undefined)return;
      }
      if(r.mode==='working'&&!r.path.length){const job=this.jobs.get(i);if(job&&distance(p,job.target)>.015)r.path=[job.target];}
      if(r.mode==='seated'&&sleep&&h){r.mode='standing';r.wait=.45;}
      if(r.mode==='standing'&&r.wait===0){const arc=nearestPatrol(this.traffic.track,r.seat!.via);if(this.joinAvailable(arc,1.5,i)){r.joinArc=arc;r.seated=false;r.mode='joining';r.path=[r.seat!.via,samplePatrol(this.traffic.track,arc)];}}
      if(r.mode==='walking'&&sleep&&h){r.mode='going-home';p.pause=0;p.untilPause=999;}
      if(r.mode==='walking'&&!sleep&&r.seat)r.mode='going-seat';
      if(r.mode==='going-home'&&!sleep)r.mode='walking';
      if(r.mode==='going-seat'&&sleep)r.mode='going-home';
      if(r.mode==='going-home'&&h&&h.busy===null){
        const route=this.workRoute?.(p,h.outside)||[];
        // Extended neighborhoods must take the short road home instead of
        // completing an entire clockwise town circuit before bedtime.
        if(route.length||this.atExit(p.distance,h.exit,p.travelled)){h.busy=i;p.active=false;p.speed=0;r.mode='approaching';r.path=[...route,h.outside];}
      }
      if(r.mode==='going-seat'&&r.seat&&this.atExit(p.distance,nearestPatrol(this.traffic.track,r.seat.via),p.travelled)){p.active=false;r.mode='sitting';r.path=[r.seat.via,r.seat.position];}
      if(r.mode==='sleeping'&&!sleep&&h&&h.busy===null&&this.joinAvailable(h.exit,1.5,i)){h.busy=i;r.joinArc=h.exit;r.mode='opening-out';Object.assign(p,h.inside,{angle:h.yaw});}
      if(r.mode==='opening-out'&&h.open>=.99){r.visible=true;r.mode='leaving';r.path=[h.outside];}
      if(r.path.length){
        const target=r.path[0],length=distance(p,target),step=Math.min(length,dt*.54);
        if(length>.0001){const next={x:p.x+(target.x-p.x)*step/length,z:p.z+(target.z-p.z)*step/length};
          // Farmers use the centre freight lane; strolling residents keep the
          // two sidewalk lanes. Their .18-wide bodies need .23 passing space.
          if(['working','visiting'].includes(r.mode)||r.mode==='approaching'&&r.path.length>1){
            const others=this.traffic.people.filter((_,j)=>j!==i&&this.residents[j].visible&&!this.residents[j].seated);
            const clearance=(point:WalkPoint)=>Math.min(Infinity,...others.map(other=>distance(point,other)));
            if(clearance(next)<.28){
              const dx=(target.x-p.x)/length,dz=(target.z-p.z)/length,current=clearance(p);
              // Look on both sides of the freight lane. A fixed left sidestep
              // can trap three workers against one another at a shop entrance.
              const candidates=[0,.65,-.65,1.15,-1.15,1.65,-1.65].map(turn=>({
                x:p.x+(dx*Math.cos(turn)-dz*Math.sin(turn))*step,
                z:p.z+(dx*Math.sin(turn)+dz*Math.cos(turn))*step,
              })).filter(point=>this.pavement.has(`${Math.floor(point.x)},${Math.floor(point.z)}`)&&clearance(point)>=Math.min(.235,current+.002));
              candidates.sort((a,b)=>(distance(a,target)-Math.min(.30,clearance(a))*.8)-(distance(b,target)-Math.min(.30,clearance(b))*.8));
              if(candidates.length){next.x=candidates[0].x;next.z=candidates[0].z;}
              else if(clearance(next)<.23)return;
            }
            if(clearance(next)<Math.min(.23,clearance(p)))return;
          }
          const angle=Math.atan2(target.x-p.x,target.z-p.z),turn=Math.atan2(Math.sin(angle-p.angle),Math.cos(angle-p.angle));p.angle+=Math.max(-dt*4,Math.min(dt*4,turn));p.x=next.x;p.z=next.z;r.travelled=step;p.totalTravelled+=step;}
        if(distance(p,target)<=((r.mode==='working'||r.mode==='visiting'||r.mode==='approaching'&&r.path.length>1)?(r.path.length>1?.20:.12):.00011))r.path.shift();
      }
      if(r.path.length)return;
      if(r.mode==='visiting'){r.mode='lingering';r.wait=r.visitId?.startsWith('festival-')?20+this.random()*8:4+this.random()*8;}
      else if(r.mode==='lingering'&&!r.wait){r.mode='joining';r.visitId=undefined;r.joinArc=undefined;}

      if(r.mode==='approaching'&&h.open>=.99){r.mode='entering';r.path=[h.inside];}
      else if(r.mode==='entering'){r.mode='sleeping';r.visible=false;h.busy=null;}
      else if(r.mode==='leaving'){r.mode='joining';r.path=[samplePatrol(this.traffic.track,h.exit)];}
      else if(r.mode==='joining'){
        const arc=nearestPatrol(this.traffic.track,p);if(this.joinAvailable(arc,.72,i)){this.traffic.join(i,arc);r.joinArc=undefined;if(h?.busy===i)h.busy=null;r.mode=sleep?'going-home':r.seat?'going-seat':'walking';}
      } else if(r.mode==='sitting'){r.mode='seated';r.seated=true;p.angle=r.seat!.yaw;}
    });
  }
  private joinAvailable(arc:number,gap:number,self:number):boolean {
    const length=this.traffic.track.length;
    return this.traffic.canJoin(arc,gap)&&this.residents.every((r,i)=>i===self||r.joinArc===undefined||Math.min(mod(r.joinArc-arc,length),mod(arc-r.joinArc,length))>=gap);
  }
  private atExit(position:number,exit:number,step:number):boolean {const l=this.traffic.track.length;return Math.min(mod(exit-position,l),mod(position-exit,l))<Math.max(.045,step*1.5);}
}
