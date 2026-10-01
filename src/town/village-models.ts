import * as T from 'three';
import {box,roof,windowFrame,cylinder} from './models';
import type {BuildingKind} from './types';
const wood='#77593d',stone='#b4ab91';
function fence(g:T.Group,w:number,d:number){for(const x of [-w/2,w/2])for(const z of [-d/2,d/2]){box(g,x,.29,z,.055,.55,.055,wood);}for(const z of [-d/2,d/2])for(const y of [.2,.43])box(g,0,y,z,w,.04,.04,wood);for(const x of [-w/2,w/2])for(const y of [.2,.43])box(g,x,y,0,.04,.04,d,wood);}
function animal(g:T.Group,pig:boolean,index:number){const a=new T.Group();a.name=`${pig?'pig':'cow'}-${index}`;a.userData.movingPart=true;a.position.set(index?.65:-.65,.15,.15);g.add(a);const color=pig?'#d9a693':'#ece2cb';box(a,0,.25,0,pig?.45:.57,pig?.28:.42,pig?.27:.36,color);box(a,0,.29,.22,.25,.25,.24,color);box(a,0,.24,.36,.20,.12,.08,pig?'#bd8878':'#897c6b');for(const x of [-.10,.10])box(a,x,.43,.24,.08,.08,.06,pig?'#c58d7d':'#b8a380');for(const x of [-.16,.16])for(const z of [-.08,.08]){box(a,x,.08,z,.05,.17,.06,pig?'#b48170':'#605447');}if(!pig){box(a,.18,.32,-.08,.22,.23,.38,'#726553');box(a,-.21,.40,.03,.12,.19,.31,'#796b58');}box(a,0,.24,-.19,.025,.10,.08,wood);}
export function villageModel(g:T.Group,kind:BuildingKind,variant:number):void {
 const colors=['#98734d','#789779','#708d9b','#ad8565'],color=colors[variant%4];
 if(kind==='vegetablefield'){
  box(g,0,.035,0,2.88,.07,1.86,'#866849');fence(g,2.8,1.8);
  const crops=new T.Group();crops.name='vegetable-crops';crops.userData.movingPart=true;g.add(crops);
  for(const x of [-1.13,-.82,.82,1.13])for(let z=-.65;z<=.66;z+=.26){box(g,x,.09,z,.08,.06,.19,'#a18a5e');cylinder(crops,x,.16,z,.045,.16,'#c58449',.03);for(const side of [-1,1]){const leaf=box(crops,x+side*.045,.26,z,.025,.17,.06,'#709157');leaf.rotation.z=side*.38;}}
 }else if(kind==='cowshed'||kind==='pigpen'){
  box(g,0,.055,0,2.9,.11,1.9,kind==='cowshed'?'#a2a077':'#a6906d');fence(g,2.8,1.8);
  box(g,0,.45,-.58,2.12,.78,.52,kind==='cowshed'?'#ddcaa3':'#a88a60');roof(g,2.35,.86,.86,color);
  for(const x of [-1.05,0,1.05])box(g,x,.42,-.28,.06,.70,.06,wood);
  animal(g,kind==='pigpen',0);animal(g,kind==='pigpen',1);
  box(g,1.10,.13,.63,.4,.16,.23,wood);box(g,1.10,.22,.63,.32,.03,.18,'#bfc59b');
  for(let i=0;i<3;i++)box(g,-1.1,.20+i*.1,-.67,.35,.10,.31,'#d2b565');
 }else if(kind==='restaurant'){
  box(g,0,.06,0,2.9,.12,2.9,stone);box(g,0,.75,-.45,2.35,1.35,1.75,'#dfc6a0');
  for(const x of [-1.15,1.15])box(g,x,.81,-.45,.085,1.47,1.76,wood);
  roof(g,2.65,2.1,1.47,['#a06b49','#7e8261','#7f9091','#9b6c5f'][variant%4]);windowFrame(g,-.64,.90,.48);windowFrame(g,.67,.90,.48);
  const back=new T.Group();back.rotation.y=Math.PI;back.position.z=-1.33;g.add(back);windowFrame(back,0,.89,0);
  windowFrame(g,1.20,.89,-.40,true);const left=new T.Group();left.rotation.y=-Math.PI/2;left.position.x=-1.20;g.add(left);windowFrame(left,0,.89,0);
  for(let z=-1.1;z<.35;z+=.27)box(g,1.18,.20,z,.08,.11,.23,'#b6a08a');
  box(g,0,.59,.5,.47,.90,.07,wood);box(g,0,1.2,.56,.85,.16,.05,color);cylinder(g,.92,1.8,-.94,.12,.80,'#a39982');
  const smoke = new T.Group(); smoke.name = 'smoke-emitter'; smoke.userData.movingPart = true; smoke.position.set(.92,2.22,-.94); g.add(smoke);
  for(const x of [-.78,.78]){cylinder(g,x,.32,1.03,.27,.06,'#ab8861');for(const z of [.73,1.3])box(g,x,.14,z,.3,.22,.21,wood);cylinder(g,x,.38,1.03,.08,.025,'#ede2bb');}
  box(g,-1.18,.26,1.04,.20,.31,.23,'#a6825f');for(const z of [.90,1.13])cylinder(g,-1.18,.51,z,.09,.15,'#879e66');
  box(g,1.04,.41,-.58,.20,.45,.65,'#a79f8b');
 }else if(kind==='fishinghut'){
  box(g,0,.045,0,1.85,.09,1.85,'#ae9a75');box(g,.26,.57,.20,1.15,.97,1.22,'#a38762');
  for(let y=.19;y<1.08;y+=.13)box(g,.26,y,.84,1.19,.027,.04,'#7e644b');roof(g,1.40,1.45,1.07,color);windowFrame(g,.40,.64,.84);box(g,-.12,.46,.85,.27,.74,.06,wood);
  for(let i=0;i<9;i++)box(g,-.35,.09,-.6-i*.14,.75,.055,.12,'#b29366');
  for(const x of [-.68,.02])for(const z of [-.75,-1.7])box(g,x,-.10,z,.055,.50,.055,wood);
  cylinder(g,.78,.24,-.66,.16,.36,'#997b55');box(g,.74,.43,-.69,.24,.03,.13,'#c6c9b1');
  const net=new T.Group();net.rotation.z=.24;g.add(net);for(let i=0;i<6;i++){box(net,-.72+i*.08,.58,.42,.013,.62,.014,'#a4a68d');box(net,-.52,.28+i*.11,.42,.44,.012,.012,'#a4a68d');}
 }else if(kind==='apronstand'){
  for(const x of [-.38,.38])box(g,x,.57,0,.055,1.1,.055,wood);box(g,0,1.08,0,.84,.04,.045,wood);
  for(const [i,c]of ['#c99979','#819d86','#7593a5'].entries()){box(g,(i-1)*.23,.77,0,.15,.29,.02,c);box(g,(i-1)*.23,.94,0,.08,.10,.02,c);}
 }else if(kind==='harvesttable'){
  box(g,0,.38,0,1.8,.08,.74,wood);for(const x of [-.65,.65])for(const z of [-.24,.24])box(g,x,.18,z,.08,.35,.08,wood);box(g,0,.43,0,.84,.017,.76,color);
  for(const x of [-.52,.52]){box(g,x,.49,0,.33,.10,.25,'#b0905c');for(let i=0;i<3;i++)box(g,x-.1+i*.1,.58,0,.09,.10,.13,['#bd8c53','#adac6b','#cd865d'][i]);}
 }else if(kind==='wheatbanner'){
  cylinder(g,0,.72,0,.035,1.4,wood);box(g,.25,1.14,0,.48,.40,.025,color);for(let i=0;i<3;i++){const grain=box(g,.14+i*.09,1.14, .022,.022,.25,.025,'#e1c480');grain.rotation.z=-.22;for(const y of [1.08,1.17])box(g,.14+i*.09,y,.025,.065,.06,.027,'#d6b266');}
 }
}
