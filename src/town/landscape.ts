import * as T from 'three';
import { box, material, packModel, treeModel } from './models';
import { bridgeSlots, unlocked } from './world';
import { groundHeight, groundNormal, landscapeHeight, inLandscape, scenicRiver, sceneryClear, starterWidth } from './terrain';
import { sceneryBatch } from './scenery-batch';
import type { Board, TownState } from './types';

type Point = {x:number;z:number};
type Placement = Point & {matrix:T.Matrix4;clearance:number};

/** A continuous valley, with buildable terraces, soft shoreline and seeded woodland. */
export function landscape(board: Board, state: TownState, assets = new Map<string,T.Group>()) {
  const n = board.size, world = new T.Group(), forest = new T.Group(), details = new T.Group();
  world.name='river-valley-landform';
  let seed=4703+n;
  const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
  const river=board.terrain==='meadow'?-1:board.terrain==='valley'?11:5;
  const edge=(x:number,side:number)=>{const p=scenicRiver(board,x);return p.center+side*p.width/2;};
  const height=(x:number,z:number)=>landscapeHeight(board,x,z);
  const grassPositions:number[]=[],grassColors:number[]=[],soilPositions:number[]=[],soilColors:number[]=[];
  const base=new T.Color(),soil=new T.Color();
  const grassColor=(x:number,z:number)=> {
    const open=unlocked(state,board,Math.max(0,Math.min(n-1,Math.floor(x))),Math.max(0,Math.min(n-1,Math.floor(z))));
    base.set(open?'#849f6a':'#748e66');
    const patch=(Math.sin(x*.27+z*.12)+Math.sin(z*.32-x*.17))*.025;
    const normal=groundNormal(board,x,z),slope=1-normal.y;
    base.lerp(new T.Color('#aeab7f'),Math.min(.4,slope*2));
    return base.multiplyScalar(.97+patch+Math.sin(x*1.7+z*1.3)*.012);
  };
  const triangle=(points:Point[])=>{for(const p of points){grassPositions.push(p.x,height(p.x,p.z)+.026,p.z);const c=grassColor(p.x,p.z);grassColors.push(c.r,c.g,c.b);}};
  // Clip every surface cell to the bank curve, rather than exposing a stair-step shore.
  const clip=(poly:Point[],side:number):Point[]=>{
    const out:Point[]=[];
    for(let i=0;i<poly.length;i++){
      const a=poly[i],b=poly[(i+1)%poly.length],da=side*(a.z-edge(a.x,side)),db=side*(b.z-edge(b.x,side));
      if(da>=0)out.push(a);
      if((da>=0)!==(db>=0)){const t=da/(da-db);out.push({x:a.x+(b.x-a.x)*t,z:a.z+(b.z-a.z)*t});}
    }
    return out;
  };
  const extent=board.terrain==='valley'?{left:-10,right:n+10,top:-14,bottom:n+8}:{left:-2,right:n+2,top:-2,bottom:n+2};
  for(let z=extent.top;z<extent.bottom;z+=.5)for(let x=extent.left;x<extent.right;x+=.5){
    if(!inLandscape(board,x+.25,z+.25))continue;
    const quad=[{x,z},{x,z:z+.5},{x:x+.5,z:z+.5},{x:x+.5,z}];
    for(const poly of river<0?[quad]:[clip(quad,-1),clip(quad,1)])for(let i=1;i<poly.length-1;i++)triangle([poly[0],poly[i],poly[i+1]]);
    for(const [dx,dz,a,b]of [[-.5,0,quad[0],quad[1]],[.5,0,quad[2],quad[3]],[0,-.5,quad[3],quad[0]],[0,.5,quad[1],quad[2]]] as [number,number,Point,Point][]){
      if(inLandscape(board,x+.25+dx,z+.25+dz))continue;
      for(let layer=0;layer<3;layer++){
        const top=(p:Point)=>T.MathUtils.lerp(height(p.x,p.z)+.024,-2.68,layer/3),low=(p:Point)=>T.MathUtils.lerp(height(p.x,p.z)+.024,-2.68,(layer+1)/3);
        for(const [p,y]of [[a,top(a)],[b,top(b)],[b,low(b)],[a,top(a)],[b,low(b)],[a,low(a)]] as [Point,number][]){soilPositions.push(p.x,y,p.z);soil.set(['#a19574','#8f846c','#756e5d'][layer]);soilColors.push(soil.r,soil.g,soil.b);}
      }
    }
  }
  const coloredMesh=(positions:number[],colors:number[],name:string)=>{
    const geo=new T.BufferGeometry().setAttribute('position',new T.Float32BufferAttribute(positions,3)).setAttribute('color',new T.Float32BufferAttribute(colors,3));geo.computeVertexNormals();
    if(name==='sculpted-grass'){
      const normals:number[]=[];for(let i=0;i<positions.length;i+=3){const x=positions[i],z=positions[i+2],d=.025,dx=(height(x+d,z)-height(x-d,z))/(2*d),dz=(height(x,z+d)-height(x,z-d))/(2*d),length=Math.hypot(dx,1,dz);normals.push(-dx/length,1/length,-dz/length);}geo.setAttribute('normal',new T.Float32BufferAttribute(normals,3));
    }
    const mesh=new T.Mesh(geo,new T.MeshStandardMaterial({vertexColors:true,roughness:.96}));mesh.name=name;mesh.receiveShadow=true;world.add(mesh);return mesh;
  };
  const grass=coloredMesh(grassPositions,grassColors,'sculpted-grass');(grass.material as T.Material).userData.seasonRole='ground';
  coloredMesh(soilPositions,soilColors,'natural-soil-edge');
  const floor=new T.Mesh(new T.PlaneGeometry(240,240),material('#cad3bc').clone());(floor.material as T.Material).userData.seasonRole='ground';floor.rotation.x=-Math.PI/2;floor.position.set(n/2,-2.7,n/2);floor.receiveShadow=true;world.add(floor);
  // An invisible terrain surface includes water cells for accurate grid picking at every elevation.
  const pickPositions:number[]=[];
  for(let z=0;z<n;z+=.5)for(let x=0;x<n;x+=.5)for(const [xx,zz]of [[x,z],[x,z+.5],[x+.5,z],[x+.5,z],[x,z+.5],[x+.5,z+.5]])pickPositions.push(xx,groundHeight(board,xx,zz),zz);
  const pick=new T.Mesh(new T.BufferGeometry().setAttribute('position',new T.Float32BufferAttribute(pickPositions,3)),new T.MeshBasicMaterial());pick.visible=false;pick.name='terrain-picking';world.add(pick);
  const props=new Map<string,Placement[]>(),templates=new Map(assets),transform=new T.Object3D();
  const prop=(name:string,x:number,z:number,scale=1,rotation=0,y=height(x,z)+.03,clearance=.55)=>{
    if(!templates.has(name))return;
    transform.position.set(x,y,z);transform.rotation.set(0,rotation,0);transform.scale.setScalar(scale);transform.updateMatrix();
    const points=props.get(name)||[];points.push({x,z,matrix:transform.matrix.clone(),clearance});props.set(name,points);
  };
  for(let i=0;i<3;i++)if(!templates.has(['tree-0','pine','birch'][i]))templates.set(['tree-0','pine','birch'][i],packModel(treeModel(i)));
  if(!templates.has('rock')){const g=new T.Group(),rock=new T.Mesh(new T.DodecahedronGeometry(.26,0),material('#a3ab94'));rock.scale.set(1,.65,.85);rock.position.y=.13;g.add(rock);templates.set('rock',g);}
  if(!templates.has('boulder'))templates.set('boulder',templates.get('rock')!);
  const flower=new T.Group();
  for(let j=0;j<5;j++){
    const a=j*2.4,x=Math.sin(a)*.22,z=Math.cos(a)*.19;
    box(flower,x,.065,z,.016,.13,.016,'#6e8056');
    for(let k=0;k<4;k++){const petal=new T.Mesh(new T.SphereGeometry(.026,5,3),material(j%2?'#ddd3a8':'#cc9b9a'));petal.scale.set(1,.45,1);petal.position.set(x+Math.cos(k*Math.PI/2)*.022,.135,z+Math.sin(k*Math.PI/2)*.022);flower.add(petal);}
    box(flower,x,.145,z,.022,.012,.022,'#bba05d');
  }
  templates.set('wildflowers',packModel(flower));
  const mushroom=new T.Group();
  for(let i=0;i<3;i++){box(mushroom,i*.11,.04,i%2*.1,.025,.08,.025,'#c9bca0');const cap=new T.Mesh(new T.SphereGeometry(.065,7,4,0,Math.PI*2,0,Math.PI/2),material('#ad7860'));cap.position.set(i*.11,.08,i%2*.1);cap.scale.y=.7;mushroom.add(cap);}
  templates.set('mushrooms',packModel(mushroom));
  const log=new T.Group();box(log,0,.18,0,.9,.24,.24,'#7d735b');box(log,-.45,.18,0,.016,.20,.20,'#b39a75');box(log,.45,.18,0,.016,.20,.20,'#b39a75');box(log,-.1,.29,.06,.2,.04,.22,'#829765');templates.set('fallen-log',packModel(log));
  const reeds=new T.Group();for(let j=0;j<5;j++){const stem=box(reeds,j*.045,.10,0,.012,.26+j%2*.07,.012,'#718363');stem.rotation.z=(j-2)*.055;if(j%2===0)box(reeds,j*.045,.28,0,.026,.07,.026,'#8b7756');}templates.set('reeds',packModel(reeds));
  const bridges=bridgeSlots(board),ducks:T.Group[]=[],waterTime={value:0};
  if(river>=0){
    const positions:number[]=[],shore:number[]=[];
    for(let x=-8;x<n+8;x+=.25)for(const t of [0,.25,.5,.75]){
      const point=(xx:number,tt:number)=>{const p=scenicRiver(board,xx);return [xx,-.19,p.center+(tt-.5)*p.width];};
      for(const [xx,tt]of [[x,t],[x,t+.25],[x+.25,t],[x+.25,t],[x,t+.25],[x+.25,t+.25]]){positions.push(...point(xx,tt));shore.push(Math.min(tt,1-tt)*2);}
    }
    const geo=new T.BufferGeometry().setAttribute('position',new T.Float32BufferAttribute(positions,3)).setAttribute('shore',new T.Float32BufferAttribute(shore,1));geo.computeVertexNormals();
    const waterMaterial=new T.MeshStandardMaterial({color:'#4b9696',roughness:.27,metalness:.04,transparent:false});
    waterMaterial.onBeforeCompile=shader=>{
      shader.uniforms.townTime=waterTime;
      shader.vertexShader='uniform float townTime; attribute float shore; varying float bankDistance; varying vec3 riverPosition;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\ntransformed.y += sin(position.x*1.6-townTime*.6)*.002; bankDistance=shore; riverPosition=position;');
      shader.fragmentShader='uniform float townTime; varying float bankDistance; varying vec3 riverPosition;\n'+shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
        float shallow=1.0-smoothstep(0.0,.45,bankDistance);
        float ripple=pow(max(0.0,sin(riverPosition.x*3.0-townTime*.65+sin(riverPosition.z*8.0)*.5)),28.0);
        diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.48,.65,.55),shallow*.46);
        diffuseColor.rgb+=vec3(.13,.18,.15)*ripple*.23;
        diffuseColor.rgb*=.98+sin(riverPosition.x*.7-townTime*.32)*.025;`);
    };
    const surface=new T.Mesh(geo,waterMaterial);surface.name='flowing-river';world.add(surface);
    for(const side of [-1,1]){
      const vertices:number[]=[],colors:number[]=[];
      for(let x=-8;x<n+8;x+=.25){
        const p=(xx:number,inset:number)=>({x:xx,z:edge(xx,side)+side*inset});
        for(const [v,y]of [[p(x,0),-.11],[p(x,.23),.018],[p(x+.25,0),-.11],[p(x+.25,0),-.11],[p(x,.23),.018],[p(x+.25,.23),.018]] as [Point,number][]){vertices.push(v.x,y,v.z);const c=new T.Color('#b1b39a').multiplyScalar(.95+Math.sin(v.x*.8)*.035);colors.push(c.r,c.g,c.b);}
      }
      coloredMesh(vertices,colors,'soft-river-bank');
    }
    for(let x=-6;x<n+6;x+=.65)for(const side of [-1,1]){
      if(x>=0&&x<n&&bridges.some(b=>Math.abs(b+.5-x)<.85))continue;
      const z=edge(x,side),xx=x+(random()-.5)*.3;
      if(random()>.32)prop('rock',xx,z-side*.07,.25+random()*.40,random()*6,-.13,.16);
      if(random()>.52)prop('reeds',xx,z+side*.12,.7+random()*.35,random()*.6,-.02,.25);
    }
    for(const x of bridges){const marker=new T.Mesh(new T.PlaneGeometry(.65,1.65),new T.MeshBasicMaterial({color:'#e2dbc0',transparent:true,opacity:.17,side:T.DoubleSide,depthWrite:false}));marker.rotation.x=-Math.PI/2;marker.position.set(x+.5,-.18,river+1);world.add(marker);}
    // A small landing on the woodland pool and a moored skiff give the river a destination.
    const dockX=-4.7,dockZ=edge(dockX,1)+.10;
    for(let i=0;i<9;i++)box(details,dockX,-.06,dockZ-i*.105,.72,.055,.092,'#aa926c');
    for(const z of [dockZ,dockZ-.84])for(const x of [dockX-.3,dockX+.3])box(details,x,-.18,z,.065,.50,.065,'#8e7c5d');
    const boat=new T.Group();box(boat,0,0,0,.75,.09,.34,'#956e50');for(const x of [-.36,.36])box(boat,x,.06,0,.055,.12,.36,'#b3956b');for(const z of [-.16,.16])box(boat,0,.07,z,.74,.10,.045,'#b18d64');box(boat,0,.085,0,.12,.035,.3,'#c7aa7c');box(boat,.1,.14,0,.46,.026,.025,'#d8c298');boat.position.set(dockX+.9,-.13,dockZ-.72);boat.rotation.y=.35;world.add(packModel(boat));
    for(let i=0;i<4;i++){const duck=new T.Group();const body=new T.Mesh(new T.SphereGeometry(.075,9,6),material('#e8dfc5'));body.scale.set(1.6,.8,1);duck.add(body);const head=new T.Mesh(new T.SphereGeometry(.046,8,5),material('#ece3ca'));head.position.set(.09,.064,0);duck.add(head);box(duck,.14,.062,0,.05,.018,.027,'#c29958');world.add(duck);ducks.push(duck);}
    for(let i=0;i<14;i++){const x=-4+random()*(n+8),p=scenicRiver(board,x),pad=new T.Mesh(new T.CircleGeometry(.055+random()*.04,9),material('#759973'));pad.rotation.x=-Math.PI/2;pad.position.set(x,-.177,p.center+(i%2?1:-1)*(p.width/2-.28));world.add(pad);}
  }
  if(board.terrain==='valley'){
    // Dense peripheral woods frame clear meadows. Interior groves clear only where roads/buildings land.
    for(let z=-12;z<n+6;z+=1.7)for(let x=-6;x<n+6;x+=1.7){
      const xx=x+(random()-.5)*1.45,zz=z+(random()-.5)*1.45;
      if(!inLandscape(board,xx,zz)||height(xx,zz)<-1.1)continue;
      const p=scenicRiver(board,xx);if(Math.abs(zz-p.center)<p.width/2+.75)continue;
      const inside=xx>0&&xx<n&&zz>0&&zz<n;
      const grove=inside?(Math.hypot((xx-7)/7,(zz-3)/4)<1 || Math.hypot((xx-34)/7,(zz-5)/5)<1 || Math.hypot((xx-34)/6,(zz-32)/9)<1 || Math.hypot((xx-5)/5,(zz-35)/4)<1):true;
      if(!grove||random()<(inside?.38:.27))continue;
      const scale=.80+random()*.78,variant=Math.floor(random()*3);
      prop(['tree-0','pine','birch'][variant],xx,zz,scale,random()*6,height(xx,zz)+.03,.75);
      if(random()>.82)prop('mushrooms',xx+.35,zz+.3,.8,random()*6,undefined,.25);
    }
    // Low outcrops pick out the terrace edges; road painting clears them like other scenery.
    for(let x=1;x<n-1;x+=.85)if(random()>.34)prop('rock',x,25.3+Math.sin(x*.5)*.25,.28+random()*.4,random()*6,undefined,.55);
    for(let z=18;z<n-1;z+=1.1)if(random()>.40)prop('rock',27.3+Math.sin(z*.4)*.25,z,.32+random()*.45,random()*6,undefined,.55);
    for(let i=0;i<65;i++){
      const x=-5+random()*(n+10),z=-9+random()*(n+15);
      if(!inLandscape(board,x,z)||x>=0&&x<n&&z>=0&&z<n)continue;
      const p=scenicRiver(board,x);if(Math.abs(z-p.center)<p.width/2+.4)continue;
      prop(i%6===0?'fallen-log':'boulder',x,z,i%6===0?.8:.45+random()*.75,random()*6,undefined,.7);
    }
    // The expansion boundary is a low fence, never an impenetrable scene wall.
    if(!state.chapterStars[1])for(let z=14;z<n-1;z+=2){const x=starterWidth(board)+.05,y=groundHeight(board,x,z);for(const zz of [z,z+1.8])box(details,x,groundHeight(board,x,zz)+.26,zz,.06,.5,.06,'#a28d6b');for(const h of [.21,.40]){const rail=box(details,x,y+h,z+.9,.04,.05,1.8,'#b9a47d');rail.rotation.x=-Math.atan2(groundHeight(board,x,z+1.8)-y,1.8);}}
  }else for(const x of [-1.1,n+1.1])for(let i=0;i<5;i++)prop(['tree-0','pine','birch'][i%3],x,1+i*2.2,.75);
  for(let i=0;i<n*6;i++){
    const x=-2+random()*(n+4),z=-2+random()*(n+4),p=scenicRiver(board,x);
    if(!inLandscape(board,x,z)||river>=0&&Math.abs(z-p.center)<p.width/2+.25)continue;
    prop('wildflowers',x,z,.55+random()*.6,random()*6,undefined,.25);
  }
  // A modest timber lookout tucked beyond the east build boundary, with stone steps and railing.
  if(board.terrain==='valley'){
    const x=n+1.4,z=21,y=height(x,z)+.10;
    for(let i=0;i<9;i++)box(details,x,y,z-.54+i*.13,1.45,.08,.11,'#aa916b');
    for(const xx of [x-.67,x+.67])for(const zz of [z-.56,z+.56])box(details,xx,y+.27,zz,.065,.65,.065,'#887657');
    for(const zz of [z-.56,z+.56])box(details,x,y+.48,zz,1.4,.045,.045,'#baa781');
    box(details,x+.67,y+.48,z,.045,.045,1.15,'#baa781');
    for(let i=0;i<3;i++)box(details,x-.95-i*.18,y-.08-i*.085,z,.24,.095,.55,'#b5ae96');
  }
  const clearing:{batch:T.InstancedMesh;points:Placement[];matrices:T.Matrix4[];shown:boolean[]}[]=[];
  for(const [name,points]of props){
    const batch=sceneryBatch(templates.get(name)!,points.map(p=>p.matrix));
    batch.name=name;
    batch.traverse(o=>{if(!(o instanceof T.InstancedMesh))return;
      const matrices=points.map((_,i)=>{const m=new T.Matrix4();o.getMatrixAt(i,m);return m;});
      if(['wildflowers','reeds'].includes(name))for(const m of Array.isArray(o.material)?o.material:[o.material])m.userData.seasonRole='ground';
      if(['tree-0','pine','birch'].includes(name)){for(const m of Array.isArray(o.material)?o.material:[o.material])m.userData.seasonRole='grove';o.castShadow=true;}
      o.receiveShadow=true;clearing.push({batch:o,points,matrices,shown:points.map(()=>true)});
    });
    (['tree-0','pine','birch'].includes(name)?forest:world).add(batch);
  }
  world.add(packModel(details));
  const hidden=new T.Matrix4().makeScale(0,0,0);
  const sync=(current:Board)=>{
    const visibility=new Map<Placement,boolean>();
    for(const entry of clearing){let changed=false;entry.points.forEach((p,i)=>{const visible=visibility.get(p)??sceneryClear(current,p,p.clearance);visibility.set(p,visible);if(visible!==entry.shown[i]){entry.shown[i]=visible;entry.batch.setMatrixAt(i,visible?entry.matrices[i]:hidden);changed=true;}});if(changed){entry.batch.instanceMatrix.needsUpdate=true;entry.batch.computeBoundingSphere();}}
  };
  sync(board);
  return {world,forest,pick,sync,update(time:number){waterTime.value=time/1000;ducks.forEach((duck,i)=>{const t=time*.000055,x=n*.32+Math.sin(t)*n*.18-i*.23,p=scenicRiver(board,x);duck.position.set(x,-.12+Math.sin(time*.002+i)*.006,p.center+Math.sin(t*1.3)*.25+i*.07);duck.rotation.y=Math.cos(t)>0?0:Math.PI;});}};
}
