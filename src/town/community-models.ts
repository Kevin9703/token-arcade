import * as T from 'three';
import { box, cylinder, material } from './models';
import type { BuildingKind } from './types';
export const COMMUNITY_KINDS: BuildingKind[] = ['herbshelf','readingnook','riverstones','springarch','summerparasol','autumncart','winterlantern','oldwell','woodlookout','oldmill'];
export function setLandmarkState(model:T.Object3D,restored:boolean):void {
  const complete=model.getObjectByName('landmark-restored'),ruin=model.getObjectByName('landmark-ruin'),fan=model.getObjectByName('landmark-fan');
  if(complete)complete.visible=restored;if(ruin)ruin.visible=!restored;if(fan)fan.visible=restored;
}
const colors=['#ba866a','#709387','#9d93af','#d1af65'];
function flower(g:T.Object3D,x:number,y:number,z:number,color:string){box(g,x,y-.08,z,.025,.16,.025,'#789565');cylinder(g,x,y,z,.07,.05,color);}
function plank(g:T.Object3D,x:number,y:number,z:number,w:number,d:number){box(g,x,y,z,w,.06,d,'#95765b');for(let i=-w/2+.09;i<w/2;i+=.18)box(g,x+i,y+.033,z,.012,.008,d-.04,'#705c49');}
function stateGroup(g:T.Group,name:string){const part=new T.Group();part.name=name;part.userData.movingPart=true;g.add(part);return part;}
function flag(g:T.Object3D,x:number,y:number,z:number,color:string){box(g,x,y,z,.035,.7,.035,'#70543e');box(g,x+.12,y+.24,z,.25,.19,.025,color);}
export function communityModel(g:T.Group,kind:BuildingKind,variant:number):void {
  const accent=colors[variant%4],wood='#775e48',stone='#acaa96';
  if(kind==='herbshelf'){
    for(const x of [-.31,.31])box(g,x,.5,-.13,.055,.86,.07,wood);
    for(const y of [.23,.52,.82]){plank(g,0,y,-.12,.72,.31);for(const x of [-.21,.18]){cylinder(g,x,y+.08,-.12,.095,.12,accent,.11);for(let j=0;j<3;j++)flower(g,x+(j-1)*.06,y+.28,-.12,'#9bab6d');}}
    box(g,0,.065,.07,.8,.08,.65,'#c9c2a6');
  }else if(kind==='readingnook'){
    box(g,-.18,.44,-.21,.4,.73,.28,wood);for(const y of [.15,.42,.75])box(g,-.18,y,-.05,.44,.035,.04,'#c7af89');
    for(let i=0;i<5;i++)box(g,-.33+i*.07,.3,-.035,.045,.22,.12,[accent,'#d3b278','#809b85'][i%3]);
    cylinder(g,.24,.13,.16,.21,.19,accent);plank(g,.22,.38,-.17,.37,.25);cylinder(g,.26,.44,-.16,.045,.08,'#e5d7b7');box(g,0,.06,0,.85,.05,.8,'#b3b99a');
  }else if(kind==='riverstones'){
    cylinder(g,0,.09,0,.37,.12,stone);cylinder(g,0,.16,0,.26,.025,'#82b5b0');
    for(let i=0;i<6;i++){const a=i*1.02,rock=new T.Mesh(new T.DodecahedronGeometry(.13),material(i%2?accent:'#9d9f90'));rock.position.set(Math.cos(a)*.29,.21,Math.sin(a)*.29);rock.scale.y=.65;g.add(rock);}for(let i=0;i<4;i++)flower(g,.31-i*.045,.46,-.22,'#c7b27e');
  }else if(kind==='springarch'){
    for(const x of [-.73,.73]){box(g,x,.67,0,.085,1.2,.09,wood);cylinder(g,x,.14,0,.18,.25,accent,.22);}
    const arch=new T.Mesh(new T.TorusGeometry(.73,.055,6,18,Math.PI),material(wood));arch.position.y=.82;g.add(arch);
    for(let i=0;i<12;i++){const a=i/11*Math.PI;flower(g,Math.cos(a)*.73,.85+Math.sin(a)*.73,.04,[accent,'#efe0ae','#b999b6'][i%3]);}
  }else if(kind==='summerparasol'){
    box(g,-.25,.07,0,.95,.05,.77,accent);for(const x of [-.57,-.05])cylinder(g,x,.16,.05,.17,.14,'#ddc896');
    cylinder(g,.43,.67,-.09,.035,1.2,wood);const canopy=new T.Mesh(new T.ConeGeometry(.64,.24,8),material(accent));canopy.position.set(.43,1.32,-.09);g.add(canopy);
    cylinder(g,-.24,.16,-.24,.12,.16,'#987452');box(g,-.24,.27,-.24,.18,.06,.15,'#e2c598');
  }else if(kind==='autumncart'){
    plank(g,0,.3,0,.66,.57);for(const x of [-.35,.35]){const wheel=new T.Mesh(new T.CylinderGeometry(.17,.17,.075,10),material(wood));wheel.rotation.z=Math.PI/2;wheel.position.set(x,.2,.06);g.add(wheel);}
    box(g,0,.49,-.24,.64,.28,.035,wood);box(g,0,.37,.4,.035,.055,.52,wood);
    for(const [x,z,r]of [[-.16,.06,.17],[.16,-.06,.15],[.12,.19,.1]]){const pumpkin=new T.Mesh(new T.SphereGeometry(r,8,6),material(accent));pumpkin.position.set(x,.38+r,z);pumpkin.scale.y=.8;g.add(pumpkin);box(g,x,.39+r*1.8,z,.035,.06,.035,'#638159');}
  }else if(kind==='winterlantern'){
    for(const x of [-.31,.31])box(g,x,.6,0,.065,1.13,.07,wood);box(g,0,1.14,0,.76,.06,.09,wood);
    for(const [i,x]of [-.23,0,.23].entries()){box(g,x,.92-i%2*.1,0,.02,.27,.02,wood);box(g,x,.77-i%2*.1,0,.17,.2,.17,['#f3cd8b','#d1dcbb','#e3b5a1'][variant%3],true);box(g,x,.89-i%2*.1,0,.21,.04,.2,accent);}box(g,0,.06,0,.82,.06,.53,'#c9c2ae');
  }else{
    const restored=stateGroup(g,'landmark-restored'),ruin=stateGroup(g,'landmark-ruin');
    if(kind==='oldwell'){
      cylinder(g,0,.1,0,.79,.13,'#b8b7a4');for(let i=0;i<14;i++){const a=i/14*Math.PI*2;const block=box(g,Math.cos(a)*.48,.32,Math.sin(a)*.48,.22,.32,.19,stone);block.rotation.y=-a;}
      cylinder(g,0,.2,0,.36,.02,'#6b9e9b');for(const x of [-.58,.58])box(restored,x,.95,0,.065,1.1,.07,wood);box(restored,0,1.46,0,1.37,.08,.64,accent);
      cylinder(restored,0,.72,0,.03,.43,'#bda273');cylinder(restored,0,.5,0,.11,.13,'#876a50',.14);plank(ruin,0,.58,0,1.06,.19);box(ruin,.35,.68,.25,.15,.33,.12,'#85725d');flag(restored,.64,.48,.55,accent);
    }else if(kind==='woodlookout'){
      box(g,0,.13,0,2.6,.15,1.55,'#bab69e');plank(g,0,.26,0,2.4,1.4);for(const x of [-1.06,1.06])for(const z of [-.54,.54])box(restored,x,.65,z,.065,.78,.065,wood);
      for(const z of [-.56,.56])box(restored,0,.95,z,2.22,.065,.06,wood);for(const x of [-1.08,1.08])box(restored,x,.95,0,.06,.065,1.2,wood);
      for(let i=0;i<3;i++)box(restored,.46,.37+i*.12,-.12,.9,.08,.3,wood);box(ruin,-.63,.45,.12,1.24,.08,.07,wood).rotation.z=.23;box(ruin,.65,.55,-.38,.07,.55,.065,wood);flag(restored,-.95,.61,-.5,accent);
    }else{
      cylinder(g,0,.13,0,1.08,.16,'#bab7a2');for(let i=0;i<7;i++)cylinder(g,0,.32+i*.19,0,.58-i*.028,.18,i%2?stone:'#b7b19e');
      const roof=new T.Mesh(new T.ConeGeometry(.62,.48,12),material(accent));roof.position.y=1.91;restored.add(roof);
      const fan=stateGroup(g,'landmark-fan');fan.position.set(0,1.42,.58);for(let i=0;i<4;i++){const wing=new T.Group();wing.rotation.z=i*Math.PI/2;fan.add(wing);box(wing,0,.53,0,.07,1.1,.08,wood);for(const x of [-.14,.14])box(wing,x,.63,0,.025,.62,.035,wood);for(let j=0;j<5;j++)box(wing,0,.34+j*.135,0,.32,.022,.025,'#b99d77');}
      box(ruin,.27,1.47,.2,.065,.96,.05,wood).rotation.z=.6;box(ruin,-.3,.34,.77,.45,.18,.4,'#c8b58d');flag(restored,-.74,.62,.35,accent);
    }
  }
}
