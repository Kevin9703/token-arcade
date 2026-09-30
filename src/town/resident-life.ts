import { PedestrianTraffic, samplePatrol, type WalkPoint, type PatrolTrack } from './pedestrians';
import type { Building } from './types';
import { dimensions } from './world';
export interface Home {id:string; outside:WalkPoint; inside:WalkPoint; yaw:number}
export function homeForBuilding(b:Building):Home {
  const dims=dimensions(b),yaw=-b.rotation*Math.PI/2,hall=b.kind==='hall';
  const point=(x:number,z:number)=>({x:b.x+dims.w/2+x*Math.cos(yaw)+z*Math.sin(yaw),z:b.z+dims.d/2-x*Math.sin(yaw)+z*Math.cos(yaw)});
  return {id:b.id,outside:point(hall?0:.18,hall?1.78:1.32),inside:point(hall?0:.18,hall?.91:.65),yaw};
}
export interface ResidentSeat {position:WalkPoint; via:WalkPoint; yaw:number; y:number}
type Activity='walking'|'going-home'|'approaching'|'entering'|'sleeping'|'opening-out'|'leaving'|'joining'|'seated'|'standing'|'going-seat'|'sitting';
export interface ResidentActivity {mode:Activity; visible:boolean; home:number; seat?:ResidentSeat; path:WalkPoint[]; wait:number; travelled:number; seated:boolean; joinArc?:number}
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
  constructor(readonly traffic:PedestrianTraffic,homes:Home[],sleep=false,seats:Map<number,ResidentSeat>=new Map()) {
    this.doors=homes.map(h=>({...h,exit:nearestPatrol(traffic.track,h.outside),open:0,busy:null}));
    this.residents=traffic.people.map((p,i)=>{const seat=seats.get(i),home=this.doors.length?i%this.doors.length:-1;const mode=sleep&&home>=0?'sleeping':seat?'seated':'walking';p.active=mode==='walking';if(mode==='sleeping')Object.assign(p,this.doors[home].inside);else if(seat)Object.assign(p,seat.position,{angle:seat.yaw});return {mode,visible:mode!=='sleeping',home,seat,path:[],wait:0,travelled:0,seated:mode==='seated'};});
  }
  update(dt:number,sleep:boolean):void {
    this.traffic.blockers=[];
    this.residents.forEach((r,i)=>{const p=this.traffic.people[i];if(p.active)return;if(r.joinArc!==undefined)this.traffic.blockers.push(r.joinArc);if(!r.visible||r.seated)return;
      const arc=nearestPatrol(this.traffic.track,p);if(distance(p,samplePatrol(this.traffic.track,arc))<.46)this.traffic.blockers.push(arc);
    });
    this.traffic.update(dt);
    this.doors.forEach(h=>{const wanted=h.busy!==null?1:0;h.open+=Math.max(-dt*1.8,Math.min(dt*1.8,wanted-h.open));});
    this.residents.forEach((r,i)=>{
      const p=this.traffic.people[i],h=this.doors[r.home];r.travelled=p.travelled;r.wait=Math.max(0,r.wait-dt);
      if(r.mode==='seated'&&sleep&&h){r.mode='standing';r.wait=.45;}
      if(r.mode==='standing'&&r.wait===0){const arc=nearestPatrol(this.traffic.track,r.seat!.via);if(this.traffic.canJoin(arc,1.5)){r.joinArc=arc;r.seated=false;r.mode='joining';r.path=[r.seat!.via,samplePatrol(this.traffic.track,arc)];}}
      if(r.mode==='walking'&&sleep&&h){r.mode='going-home';p.pause=0;p.untilPause=999;}
      if(r.mode==='walking'&&!sleep&&r.seat)r.mode='going-seat';
      if(r.mode==='going-home'&&!sleep)r.mode='walking';
      if(r.mode==='going-seat'&&sleep)r.mode='going-home';
      if(r.mode==='going-home'&&h&&h.busy===null&&this.atExit(p.distance,h.exit,p.travelled)) {h.busy=i;p.active=false;p.speed=0;r.mode='approaching';r.path=[h.outside];}
      if(r.mode==='going-seat'&&r.seat&&this.atExit(p.distance,nearestPatrol(this.traffic.track,r.seat.via),p.travelled)){p.active=false;r.mode='sitting';r.path=[r.seat.via,r.seat.position];}
      if(r.mode==='sleeping'&&!sleep&&h&&h.busy===null&&this.traffic.canJoin(h.exit,1.5)){h.busy=i;r.joinArc=h.exit;r.mode='opening-out';Object.assign(p,h.inside,{angle:h.yaw});}
      if(r.mode==='opening-out'&&h.open>=.99){r.visible=true;r.mode='leaving';r.path=[h.outside];}
      if(r.path.length){
        const target=r.path[0],length=distance(p,target),step=Math.min(length,dt*.54);if(length>.0001){const angle=Math.atan2(target.x-p.x,target.z-p.z),turn=Math.atan2(Math.sin(angle-p.angle),Math.cos(angle-p.angle));p.angle+=Math.max(-dt*4,Math.min(dt*4,turn));p.x+=(target.x-p.x)*step/length;p.z+=(target.z-p.z)*step/length;r.travelled=step;p.totalTravelled+=step;}
        if(length<=step+.00001)r.path.shift();
      }
      if(r.path.length)return;
      if(r.mode==='approaching'&&h.open>=.99){r.mode='entering';r.path=[h.inside];}
      else if(r.mode==='entering'){r.mode='sleeping';r.visible=false;h.busy=null;}
      else if(r.mode==='leaving'){r.mode='joining';r.path=[samplePatrol(this.traffic.track,h.exit)];}
      else if(r.mode==='joining'){
        const arc=nearestPatrol(this.traffic.track,p);if(this.traffic.canJoin(arc)){this.traffic.join(i,arc);r.joinArc=undefined;if(h?.busy===i)h.busy=null;r.mode=sleep?'going-home':r.seat?'going-seat':'walking';}
      } else if(r.mode==='sitting'){r.mode='seated';r.seated=true;p.angle=r.seat!.yaw;}
    });
  }
  private atExit(position:number,exit:number,step:number):boolean {const l=this.traffic.track.length;return Math.min(mod(exit-position,l),mod(position-exit,l))<Math.max(.045,step*1.5);}
}
