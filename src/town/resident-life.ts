import { PedestrianTraffic, samplePatrol, type WalkPoint, type PatrolTrack } from './pedestrians';
import type { Building } from './types';
import { dimensions, entrance } from './world';
import type { FarmJob } from './farming';
import { doorwayForBuilding, type Doorway } from './doorways';
export interface Home {id:string; outside:WalkPoint; inside:WalkPoint; yaw:number}
export function homeForBuilding(b:Building):Home {
  const dims=dimensions(b),yaw=-b.rotation*Math.PI/2,hall=b.kind==='hall';
  const point=(x:number,z:number)=>({x:b.x+dims.w/2+x*Math.cos(yaw)+z*Math.sin(yaw),z:b.z+dims.d/2-x*Math.sin(yaw)+z*Math.cos(yaw)});
  return {id:b.id,outside:point(hall?0:.18,hall?1.78:1.32),inside:point(hall?0:.18,hall?.91:.65),yaw};
}
export interface ResidentSeat {id?:string; position:WalkPoint; via:WalkPoint; yaw:number; y:number}
export interface VisitPlace {id:string; position:WalkPoint; target?:WalkPoint; homeId?:string; buildingId?:string}
export function doorstepPlace(b: Building): VisitPlace {
  const h = homeForBuilding(b), p = entrance(b), yaw = h.yaw;
  // Stand beside the doorway, off the walking lane and the overnight entrance.
  return { id:`doorstep-${b.id}`, homeId:b.id, position:{x:p.x+.5,z:p.z+.5},
    target:{x:h.outside.x-.80*Math.cos(yaw)-.24*Math.sin(yaw),z:h.outside.z+.80*Math.sin(yaw)-.24*Math.cos(yaw)} };
}
type Activity='visiting'|'lingering'|'walking'|'working'|'going-home'|'approaching'|'entering'|'sleeping'|'opening-out'|'leaving'|'joining'|'seated'|'standing'|'going-seat'|'sitting';
interface DoorPoint extends WalkPoint { gate?:{id:string; direction:'in'|'out'; passing:boolean}; accessGate?:{id:string;release:boolean}; narrow?:boolean }
export interface ResidentActivity {mode:Activity; visible:boolean; home:number; seat?:ResidentSeat; path:DoorPoint[]; wait:number; travelled:number; seated:boolean; joinArc?:number; nextVisit:number; visitId?:string; insideBuilding?:string; jobKey?:string; access?:WalkPoint[]; accessId?:string}
interface HouseDoor extends Home {exit:number; open:number; busy:number|null}
interface WorkDoor extends Doorway {open:number; busy:number|null; occupant?:number}
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
  readonly portals=new Map<string,WorkDoor>();
  private accessOwners=new Map<string,number>();
  get allDoors(): (HouseDoor|WorkDoor)[] {return [...this.doors,...this.portals.values()];}
  setBuildings(buildings:readonly Building[]):void {
    const next=new Set<string>();
    for(const b of buildings){if(!b.placed||b.kind==='house'||b.kind==='hall')continue;const spec=doorwayForBuilding(b);if(!spec)continue;next.add(b.id);const old=this.portals.get(b.id);
      if(old&&distance(old.outside,spec.outside)>.01){for(const r of this.residents)if(r.insideBuilding===b.id)r.insideBuilding=undefined;old.busy=null;old.occupant=undefined;}
      this.portals.set(b.id,Object.assign(old||{open:0,busy:null},spec));
    }
    for(const id of this.portals.keys())if(!next.has(id))this.portals.delete(id);
    for(const r of this.residents){if(r.insideBuilding&&!this.portals.has(r.insideBuilding))r.insideBuilding=undefined;r.path=r.path.filter(p=>!p.gate||this.portals.has(p.gate.id));}
  }
  private pathTo(i:number,to:WalkPoint,target:WalkPoint,buildingId?:string,access?:WalkPoint[],accessId?:string,yieldDoor=false):DoorPoint[] {
    const r=this.residents[i],p=this.traffic.people[i],path:DoorPoint[]=[];
    if(accessId&&r.accessId===accessId&&this.accessOwners.get(accessId)===i)return r.path.length?[...r.path.slice(0,-1),target]:[target];
    let from:WalkPoint=p,inside=r.insideBuilding;
    // Finish an already-open crossing before a new job, road edit or bedtime.
    const pass=r.path.findIndex(v=>v.gate?.passing&&this.portals.get(v.gate.id)?.busy===i||v.accessGate?.release&&this.accessOwners.get(v.accessGate.id)===i);
    if(pass>=0){path.push(...r.path.slice(0,pass+1));const end=path[path.length-1];from=end;inside=end.gate?.direction==='in'?end.gate.id:undefined;}
    const crossing=(door:WorkDoor,direction:'in'|'out')=>{
      const wait=direction==='in'?door.outside:door.inside,through=direction==='in'?door.inside:door.outside;
      path.push({...wait,gate:{id:door.id,direction,passing:false}},{...through,gate:{id:door.id,direction,passing:true}});from=through;
      if(direction==='out'){path.push({...door.departure,narrow:true});from=door.departure;}
    };
    if(inside&&(inside!==buildingId||yieldDoor)){const door=this.portals.get(inside);if(door)crossing(door,'out');inside=undefined;}
    // A pier's external access path must also be reversed on departure.
    if(r.access&&r.accessId!==accessId&&this.accessOwners.get(r.accessId!)===i){const oldId=r.accessId!;path.push(...[...r.access].reverse().map((p,j)=>({...p,narrow:true,...j===r.access!.length-1?{accessGate:{id:oldId,release:true}}:{}})));from=r.access[0];}
    if(inside!==buildingId||!inside){path.push(...(this.workRoute?.(from,to)||[]),to);const door=buildingId&&this.portals.get(buildingId);if(door){path.push({...door.approach,narrow:true});crossing(door,'in');}}
    if(access){path.push(...access.map((p,j)=>({...p,narrow:true,...j===0?{accessGate:{id:accessId!,release:false}}:{}})));r.access=access;r.accessId=accessId;}else{r.access=undefined;r.accessId=undefined;}
    path.push(target);return path;
  }
  private returnToRoad(r:ResidentActivity):void {r.mode='joining';r.joinArc=undefined;r.visitId=undefined;r.jobKey=undefined;}
  jobs = new Map<number, FarmJob>();
  private routesDirty=false;
  private places:VisitPlace[]=[];
  private pavement=new Set<string>();
  private randomSeed=479;
  private random():number {this.randomSeed=(Math.imul(this.randomSeed,1664525)+1013904223)>>>0;return this.randomSeed/4294967296;}
  setPlaces(places:VisitPlace[],pavement:Set<string>):void {
    const roadsChanged=this.pavement.size!==pavement.size||[...this.pavement].some(p=>!pavement.has(p));
    const moved = new Set(places.filter(p=>{const old=this.places.find(v=>v.id===p.id);return old&&(distance(old.position,p.position)>.01||distance(old.target||old.position,p.target||p.position)>.01);}).map(p=>p.id));
    const festival=places.filter(p=>p.id.startsWith('festival-'));if(festival.length&&!this.places.some(p=>p.id.startsWith('festival-')))for(const r of this.residents)r.nextVisit=Math.min(r.nextVisit,3);this.places=festival.length?festival:places;this.pavement=pavement;
    for(const r of this.residents)if(r.visitId&&(roadsChanged||moved.has(r.visitId)||!places.some(p=>p.id===r.visitId)))this.returnToRoad(r);
  }
  private workRoute?: (from:WalkPoint,to:WalkPoint)=>WalkPoint[];
  assignJobs(jobs:FarmJob[], route:(from:WalkPoint,to:WalkPoint)=>WalkPoint[]):void {
    this.workRoute=route;
    const workers=this.residents.map((r,i)=>({r,i})).filter(({r})=>!r.seat);
    const next=new Map<number,FarmJob>();
    const chain=(job:FarmJob)=>job.fieldId.replace(/-(work|deliver|return)$/,'');
    const claimed=new Set<number>(),assignments=jobs.map(job=>({job,worker:workers.find(w=>!claimed.has(w.i)&&this.jobs.get(w.i)&&chain(this.jobs.get(w.i)!)===chain(job))}));
    for(const a of assignments)if(a.worker)claimed.add(a.worker.i);
    for(const a of assignments){if(!a.worker){a.worker=workers.find(w=>!claimed.has(w.i));if(a.worker)claimed.add(a.worker.i);}}
    assignments.forEach(({job,worker})=>{if(!worker)return;const {r,i}=worker,p=this.traffic.people[i];next.set(i,job);
      const jobKey=`${job.fieldId}:${job.phase}:${job.buildingId||''}:${job.cycles||0}`;
      const yieldDoor=Boolean(r.insideBuilding&&r.insideBuilding===job.buildingId&&r.jobKey!==jobKey&&this.residents.some((other,j)=>j!==i&&other.path.some(p=>p.gate&&p.gate.id===job.buildingId&&p.gate.direction==='in')));
      const previous=this.jobs.get(i);
      if(r.mode==='working'&&!r.path.length&&!this.routesDirty&&!yieldDoor&&previous?.fieldId===job.fieldId&&previous.buildingId===job.buildingId&&distance(p,job.target)<.12)r.jobKey=jobKey;
      if(['walking','visiting','lingering'].includes(r.mode)||r.mode==='working'&&(this.routesDirty||r.jobKey!==jobKey)) {r.visitId=undefined;r.mode='working';p.active=false;p.speed=0;r.path=this.pathTo(i,job.entrance,job.target,job.buildingId,job.access,job.accessId,yieldDoor);r.jobKey=jobKey;}
    });
    this.residents.forEach((r,i)=>{if(r.mode==='working'&&!next.has(i))this.returnToRoad(r);});
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
      const arc=nearestPatrol(this.traffic.track,p);if(distance(p,samplePatrol(this.traffic.track,arc))<(['working','visiting','lingering'].includes(r.mode)?.22:.46))this.traffic.blockers.push(arc);
    });
    this.traffic.update(dt);
    this.doors.forEach(h=>{const wanted=h.busy!==null?1:0;h.open+=Math.max(-dt*1.8,Math.min(dt*1.8,wanted-h.open));});
    this.portals.forEach(h=>{const wanted=h.busy!==null?1:0;h.open+=Math.max(-dt*1.8,Math.min(dt*1.8,wanted-h.open));});
    this.residents.forEach((r,i)=>{
      const p=this.traffic.people[i],h=this.doors[r.home];r.travelled=p.travelled;r.wait=Math.max(0,r.wait-dt);r.nextVisit=Math.max(0,r.nextVisit-dt);
      if(['visiting','lingering'].includes(r.mode)&&sleep)this.returnToRoad(r);
      if(r.mode==='walking'&&!sleep&&!r.seat&&!this.jobs.has(i)&&!r.nextVisit&&this.workRoute){
        const taken=new Set(this.residents.map(v=>v.visitId).filter(Boolean));
        const candidates=this.places.filter(v=>!taken.has(v.id)&&distance(p,v.position)>.8&&(!v.homeId||this.doors.find(d=>d.id===v.homeId)?.busy===null));
        const ownPorch = h ? candidates.find(v=>v.homeId===h.id) : undefined;
        if(candidates.length&&taken.size<3&&!this.residents.some(v=>v.mode==='visiting')){const place=ownPorch&&this.random()<.65?ownPorch:candidates[Math.floor(this.random()*candidates.length)],path=this.workRoute(p,place.position);
          if(path.length){r.visitId=place.id;r.mode='visiting';r.path=this.pathTo(i,place.position,place.target||place.position,place.buildingId);p.active=false;p.speed=0;}}
        r.nextVisit=20+this.random()*35;
      }
      if(r.mode==='joining'&&r.joinArc===undefined&&this.traffic.track.length){
        const start=sleep&&h?mod(h.exit-.30,this.traffic.track.length):nearestPatrol(this.traffic.track,p);
        for(let step=0;step<this.traffic.track.length;step+=.5){const arc=mod(start+step,this.traffic.track.length);if(!this.joinAvailable(arc,1.5,i))continue;
          r.joinArc=arc;const point=samplePatrol(this.traffic.track,arc);r.path=this.pathTo(i,point,point);break;}
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
        if(target.accessGate&&!target.accessGate.release){const owner=this.accessOwners.get(target.accessGate.id);if(owner!==undefined&&owner!==i&&length<.60)return;}
        if(target.gate&&!target.gate.passing){const door=this.portals.get(target.gate.id);if(door&&(door.busy!==null&&door.busy!==i||target.gate.direction==='in'&&door.occupant!==undefined&&door.occupant!==i)&&length<.60)return;}
        if(length>.0001){const next={x:p.x+(target.x-p.x)*step/length,z:p.z+(target.z-p.z)*step/length};
          if(target.gate&&!target.gate.passing&&length<=.30&&this.traffic.people.some((other,j)=>j!==i&&this.residents[j].visible&&distance(next,other)<.23&&distance(next,other)<distance(p,other)))return;
          // Farmers use the centre freight lane; strolling residents keep the
          // two sidewalk lanes. Their .18-wide bodies need .23 passing space.
          if((!target.gate||!target.gate.passing&&length>.30)&&!target.narrow&&(['working','visiting'].includes(r.mode)||r.mode==='approaching'&&r.path.length>1)){
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
        if(distance(p,target)<=(target.gate||target.accessGate ? .00011 : (r.mode==='working'||r.mode==='visiting'||r.mode==='approaching'&&r.path.length>1)?(r.path.length>1?.20:.12):.00011)){
          const gate=target.gate,door=gate&&this.portals.get(gate.id);
          if(door&&gate){if(!gate.passing){if(door.busy!==null&&door.busy!==i||gate.direction==='in'&&door.occupant!==undefined&&door.occupant!==i)return;door.busy=i;if(door.open<.99)return;}
            else{r.insideBuilding=gate.direction==='in'?door.id:undefined;door.occupant=gate.direction==='in'?i:undefined;if(door.busy===i)door.busy=null;}}
          if(target.accessGate){const {id,release}=target.accessGate,owner=this.accessOwners.get(id);if(release){if(owner===i)this.accessOwners.delete(id);}else{if(owner!==undefined&&owner!==i)return;this.accessOwners.set(id,i);}}
          r.path.shift();
        }
      }
      if(r.path.length)return;
      if(r.mode==='visiting'){r.mode='lingering';r.wait=r.visitId?.startsWith('festival-')?20+this.random()*8:r.visitId?.startsWith('doorstep-')?10+this.random()*14:4+this.random()*8;}
      else if(r.mode==='lingering'&&!r.wait)this.returnToRoad(r);

      if(r.mode==='approaching'&&h.open>=.99){r.mode='entering';r.path=[h.inside];}
      else if(r.mode==='entering'){r.mode='sleeping';r.visible=false;h.busy=null;}
      else if(r.mode==='leaving'){r.mode='joining';r.path=[samplePatrol(this.traffic.track,h.exit)];}
      else if(r.mode==='joining'){
        // A finished indoor visit must plan its exit on the next update, not
        // jump straight from the work bay onto the nearest patrol segment.
        if(r.joinArc===undefined||r.insideBuilding)return;
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
