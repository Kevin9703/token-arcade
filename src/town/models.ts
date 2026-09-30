import * as T from 'three';
import {villageModel} from './village-models';
import { mergeGeometries, mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import type { BuildingKind } from './types';
import { BRIDGE_STONES } from './walk-surface';

// Original modular 3D prefabs. Shared geometry and materials also back the
// exported GLB library; these are real meshes, never a flattened room image.
export const boxGeometry = new RoundedBoxGeometry(1, 1, 1, 1, .025);
const materials = new Map<string, T.MeshStandardMaterial>();
export const sharedMaterial = (m: T.Material): boolean => Array.from(materials.values()).includes(m as T.MeshStandardMaterial);
export function material(color: string, glow = false): T.MeshStandardMaterial {
  const k = color + glow; if (!materials.has(k)) materials.set(k, new T.MeshStandardMaterial({ color, roughness: .88, metalness: 0, ...(glow ? { emissive: color, emissiveIntensity: .65 } : {}) }));
  return materials.get(k)!;
}
function seasonalMaterial(color:string,role:'roof'|'foliage'|'ground'):T.MeshStandardMaterial {
  const key=`${color}:${role}`;if(!materials.has(key)){const m=material(color).clone();m.userData.seasonRole=role;materials.set(key,m);}return materials.get(key)!;
}
export function box(g: T.Object3D, x: number, y: number, z: number, w: number, h: number, d: number, color: string, glow = false): T.Mesh {
  const m = new T.Mesh(boxGeometry, material(color, glow)); m.position.set(x, y, z); m.scale.set(w, h, d); m.castShadow = true; m.receiveShadow = true; g.add(m); return m;
}
export function cylinder(g: T.Object3D, x: number, y: number, z: number, r: number, h: number, color: string, top = r): T.Mesh {
  const m = new T.Mesh(new T.CylinderGeometry(top, r, h, 8), material(color)); m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; g.add(m); return m;
}
const palette = { wood: '#69543e', beam: '#544536', stone: '#ada58d', cream: '#ead6b0', window: '#f6d590', roof: '#9f533b', green: '#526b51', iron: '#535e55' };
export const BENCH_SEAT_TOP = .2135;
export const RESIDENT_HIP = .235;
export interface SeatAnchor { position: [number, number, number]; yaw: number }
export function buildingSeats(kind: BuildingKind): SeatAnchor[] {
  const height = (base: number, scale = 1) => base + BENCH_SEAT_TOP * scale + .042 - RESIDENT_HIP;
  if (kind === 'bench') return [{ position: [0, height(0), 0], yaw: 0 }];
  if (kind === 'park') return [{ position: [.4, height(.13, .85), .55], yaw: 0 }];
  if (kind === 'gazebo') return [{ position: [0, height(.16), -.55], yaw: 0 }];
  return [];
}
export function windowFrame(g: T.Object3D, x: number, y: number, z: number, side = false): void {
  // Rotate the assembled window so the glass remains outside its frame on side walls.
  const window = new T.Group(); window.position.set(x, y, z);
  if (side) window.rotation.y = Math.PI / 2;
  g.add(window);
  box(window, 0, 0, 0, .48, .56, .08, palette.beam);
  box(window, 0, 0, .045, .37, .44, .05, palette.window, true);
  box(window, 0, 0, .08, .035, .46, .025, palette.cream);
  box(window, 0, 0, .085, .38, .035, .025, palette.cream);
  box(window, 0, -.31, 0, .6, .075, .16, palette.wood);
}
export function roof(g: T.Object3D, width: number, depth: number, height: number, color: string): void {
  const angle = .58, slope = width * .62;
  const shape = new T.Shape(); shape.moveTo(-width * .43, -.12); shape.lineTo(width * .43, -.12); shape.lineTo(0, width * .31); shape.closePath();
  const gable = new T.Mesh(new T.ExtrudeGeometry(shape, { depth: depth * .86, bevelEnabled: false }), material('#dfcba7')); gable.position.set(0, height, -depth * .43); gable.castShadow = true; gable.receiveShadow = true; g.add(gable);
  for (const side of [-1, 1]) {
    const panel = box(g, side * width * .25, height + width * .155, 0, slope, .11, depth + .3, color); panel.material=seasonalMaterial(color,'roof'); panel.rotation.z = -side * angle;
    // Raised seams and rows give the roof the miniature crafted feel.
    for (let i = 0; i < 5; i++) {
      const xx = side * (i + .5) * width / 10;
      const yy = height + width * (.155 + .25 * Math.tan(angle)) - Math.abs(xx) * Math.tan(angle);
      for (let j = 0; j < 5; j++) {
        const tileColor=i % 2 ? color : new T.Color(color).multiplyScalar(1.07).getStyle(); const tile = box(g, xx, yy + .085, (j - 2) * (depth + .28) / 5, width / 10 + .025, .045, (depth + .28) / 5 - .018, tileColor); tile.material=seasonalMaterial(tileColor,'roof'); tile.rotation.z = -side * angle;
      }
    }
  }
  box(g, 0, height + width * .325, 0, .13, .11, depth + .34, palette.beam);
  for (const x of [-width * .49, width * .49]) box(g, x, height + .04, 0, .075, .09, depth + .31, '#74644e');
  // Timber gable struts leave the silhouette readable from all four views.
  for (const z of [-depth / 2, depth / 2]) {
    box(g, 0, height + .15, z, .08, .52, .08, palette.beam);
    for (const side of [-1, 1]) { const strut = box(g, side * width * .21, height + .07, z, width * .53, .055, .06, palette.beam); strut.rotation.z = -side * angle; }
  }
}
function cottage(g: T.Group, variant: number, kind: BuildingKind): void {
  const roofs = ['#a6553c', '#637969', '#637e87', '#ae884d'];
  const walls = ['#ead8b6', '#e5d8c3', '#c6d0b1', '#d9c4a3'];
  const height = 1.2;
  box(g, 0, .08, 0, 1.88, .16, 1.88, '#b1ab91');
  box(g, 0, height / 2 + .15, 0, 1.58, height, 1.5, walls[variant % 4]);
  for (const z of [-.785, .785]) for (let i = 0; i < 7; i++) { box(g, (i - 3) * .22, .23, z, .212, .14, .045, i % 2 ? '#b5a890' : '#c2b59b'); box(g, (i - 3) * .22, .38, z, .212, .13, .045, i % 2 ? '#c2b59b' : '#b5a890'); }
  for (const x of [-.79, .79]) for (const z of [-.76, .76]) box(g, x, .78, z, .075, 1.27, .075, palette.beam);
  for (const y of [.25, 1.27]) box(g, 0, y, .765, 1.65, .07, .065, palette.wood);
  // Hinged door survives material batching and GLB export as an articulated node.
  box(g,.18,.55,.798,.45,.88,.018,'#322f2b');
  const door=new T.Group();door.name='door-hinge';door.userData.movingPart=true;door.position.set(-.03,.55,.85);g.add(door);
  box(door,.21,0,0,.42,.86,.055,palette.wood);for(const y of [-.26,.26])box(door,.21,y,.032,.34,.045,.025,'#8f7655');box(door,.34,0,.047,.045,.045,.032,'#ccb36c');
  box(g, .18, .13, .91, .62, .13, .25, palette.stone);
  windowFrame(g, -.48, .81, .8); windowFrame(g, .8, .81, -.2, true);
  for (const x of [-.76, -.2]) { box(g, x, .83, .84, .1, .52, .06, ['#7b8d70', '#8a9c86', '#829ca2', '#ac9370'][variant % 4]); for (let j = 0; j < 5; j++) box(g, x, .62 + j * .09, .88, .09, .022, .02, '#65725b'); }
  const rear = new T.Group(); rear.rotation.y = Math.PI; g.add(rear); windowFrame(rear, .37, .88, .79); windowFrame(rear, -.36, .88, .79);
  for (const z of [-.6, .43]) { box(g, -.79, .8, z, .035, 1.15, .065, palette.beam); }
  roof(g, 1.72, 1.67, 1.4, roofs[variant % 4]);
  box(g, -.52, 1.7, -.44, .22, .82, .26, '#aa9f85');
  box(g, -.52, 2.14, -.44, .3, .1, .32, '#787864');
  for (let i = 0; i < 5; i++) { box(g, -.52, 1.42 + i * .13, -.577, .24, .017, .035, '#867c69'); box(g, -.66, 1.49 + i * .13, -.44, .035, .017, .26, '#867c69'); }
  if (kind === 'house') {
    const porch = box(g, .18, 1.13, .99, .69, .065, .48, roofs[variant % 4]); porch.rotation.x = .15;
    for (const x of [-.11, .47]) box(g, x, .57, 1.09, .055, 1.02, .055, palette.wood);
    box(g, .18, .08, 1.04, .76, .075, .35, '#c5b89c');
    if (variant === 1 || variant === 3) { const dormer = new T.Group(); dormer.position.set(.34, 1.6, .55); dormer.scale.setScalar(.48); g.add(dormer); box(dormer, 0, .48, 0, .82, .9, .6, '#e9d6b4'); windowFrame(dormer, 0, .53, .33); roof(dormer, 1, .82, .95, roofs[variant % 4]); }
    if (variant === 2) { for (let i = 0; i < 5; i++) { box(g, -.835, .35 + i * .17, -.3 + Math.sin(i) * .17, .085, .14, .12, i % 2 ? '#789366' : '#91a977'); } }
    const lantern = new T.Group(); lantern.position.set(.6, 1.07, .85); lantern.scale.setScalar(.32); g.add(lantern); box(lantern, 0, 0, 0, .27, .38, .27, '#f0c176', true); box(lantern, 0, .22, 0, .37, .07, .37, '#616958'); box(lantern, 0, -.24, 0, .29, .06, .29, '#616958');
  }
  if (kind === 'bakery' || kind === 'cafe') {
    const color = kind === 'bakery' ? '#c78b47' : '#688978';
    const awning = new T.Group(); g.add(awning); awning.position.set(0, 1.05, .92);
    for (let i = 0; i < 8; i++) { const slab = box(awning, (i - 3.5) * .19, 0, .06, .185, .07, .46, i % 2 ? '#f0e4c8' : color); slab.rotation.x = .15; box(awning, (i - 3.5) * .19, -.085, .275, .185, .13, .035, i % 2 ? '#f0e4c8' : color); }
    box(g, 0, .36, .91, 1.42, .14, .24, palette.wood);
    if (kind === 'bakery') for (let i = 0; i < 4; i++) cylinder(g, (i - 1.5) * .24, .49, 1, .1, .11, '#c69051');
    else { cylinder(g, -.52, .5, 1, .1, .12, '#e3ddd0'); box(g, -.32, .55, 1, .12, .03, .12, '#d8b986'); }
    const sign = new T.Group(); sign.position.set(-.83, 1.1, .95); g.add(sign);
    box(sign, 0, .12, 0, .04, .4, .04, palette.iron);
    box(sign, 0, -.15, 0, .36, .24, .07, '#f1e4bc');
    cylinder(sign, 0, -.145, .06, .065, .03, color).rotation.x = Math.PI / 2;
  }
  // Flower boxes are part of the prefab, not UI art.
  box(g, -.48, .42, .88, .5, .14, .17, '#826049');
  for (let i = 0; i < 3; i++) { box(g, -.63 + i * .15, .57, .9, .04, .16, .04, '#748055'); box(g, -.63 + i * .15, .66, .9, .105, .07, .1, variant % 2 ? '#dfb66a' : '#d39889'); }
}
export function treeModel(variant = 0): T.Group {
  const g = new T.Group(); cylinder(g, 0, .49, 0, .09, .98, '#77604a', .06);
  const colors = ['#73915d', '#86a26e', '#58775a', '#b69b5d'];
  for (const [x, y, z, radius] of [[0, 1.33, 0, .49], [-.28, 1.06, .12, .37], [.29, 1.12, -.06, .38], [.03, 1.68, -.07, .32]]) {
    const crown = new T.Mesh(new T.IcosahedronGeometry(radius, 1), seasonalMaterial(colors[variant % 4],'foliage')); crown.position.set(x, y, z); crown.scale.set(1.08, 1.12, 1.04); crown.rotation.y = variant * .23; crown.castShadow = true; crown.receiveShadow = true; g.add(crown);
  }
  return g;
}
function bench(g: T.Object3D, color = '#ab8352'): void {
  for (const x of [-.31, .31]) { box(g, x, .102, 0, .07, .205, .38, palette.iron); box(g, x, .33, -.17, .06, .32, .06, palette.iron); }
  for (const z of [-.13, 0, .13]) box(g, 0, BENCH_SEAT_TOP - .0325, z, .83, .065, .09, color);
  for (const y of [.305, .42]) box(g, 0, y, -.19, .83, .095, .06, color);
}
function lamp(g: T.Object3D, variant: number): void {
  cylinder(g, 0, .05, 0, .16, .1, palette.iron);
  box(g, 0, .65, 0, .06, 1.2, .06, palette.iron);
  box(g, 0, 1.38, 0, .25, .3, .25, ['#f7d391', '#abd3b6', '#acc6da', '#e8b6ab'][variant % 4], true);
  for (const x of [-.13, .13]) for (const z of [-.13, .13]) box(g, x, 1.38, z, .035, .32, .035, palette.iron);
  box(g, 0, 1.58, 0, .35, .08, .35, palette.iron);
}
function flowerPot(g: T.Object3D, x: number, z: number, color: string, size = 1): void {
  const pot = new T.Group(); pot.position.set(x, .14, z); pot.scale.setScalar(size); g.add(pot);
  cylinder(pot, 0, .1, 0, .13, .2, '#ad7357', .17); cylinder(pot, 0, .205, 0, .15, .018, '#62513c');
  for (let j = 0; j < 4; j++) { const a = j * 2.4; box(pot, Math.cos(a) * .08, .31, Math.sin(a) * .08, .022, .23, .022, '#698159'); const bloom = new T.Mesh(new T.IcosahedronGeometry(.068, 1), material(color)); bloom.position.set(Math.cos(a) * .08, .43 + j % 2 * .04, Math.sin(a) * .08); pot.add(bloom); }
}
function archedWindow(g: T.Object3D, x: number, y: number, z: number, w: number, h: number): void {
  const shape = new T.Shape(); shape.moveTo(-w / 2, 0); shape.lineTo(w / 2, 0); shape.lineTo(w / 2, h - w / 2); shape.absarc(0, h - w / 2, w / 2, 0, Math.PI, false); shape.closePath();
  const frame = new T.Mesh(new T.ExtrudeGeometry(shape, { depth: .05, bevelEnabled: false }), material(palette.wood)); frame.position.set(x,y,z); g.add(frame);
  const pane = new T.Mesh(frame.geometry, material(palette.window,true)); pane.position.set(x,y+.055,z+.055); pane.scale.set(.84,.87,.5); g.add(pane);
  box(g,x,y+h*.42,z+.092,.035,h*.72,.024,palette.cream); box(g,x,y+h*.4,z+.09,w*.82,.035,.022,palette.cream);
}
function hipRoof(g: T.Object3D, width: number, depth: number, y: number, rise: number, color: string): void {
  const a=width/2,b=depth/2,r=width*.23;
  const vertices=[-a,0,-b,a,0,-b,-r,rise,0, a,0,-b,r,rise,0,-r,rise,0, a,0,-b,a,0,b,r,rise,0, a,0,b,-a,0,b,r,rise,0, -a,0,b,-r,rise,0,r,rise,0, -a,0,b,-a,0,-b,-r,rise,0];
  for(let i=0;i<vertices.length;i+=9)for(let j=0;j<3;j++){const t=vertices[i+3+j];vertices[i+3+j]=vertices[i+6+j];vertices[i+6+j]=t;}
  const geo=new T.BufferGeometry().setAttribute('position',new T.Float32BufferAttribute(vertices,3));geo.computeVertexNormals(); const m=new T.Mesh(geo,seasonalMaterial(color,'roof'));m.position.y=y;m.castShadow=true;m.receiveShadow=true;g.add(m);
  for(const z of [-b,b])box(g,0,y,z,width+.03,.09,.075,palette.wood);for(const x of [-a,a])box(g,x,y,0,.075,.09,depth,palette.wood);box(g,0,y+rise,0,r*2+.07,.08,.10,palette.wood);
  for(const z of [-1,1])for(let i=1;i<4;i++)box(g,0,y+rise*(1-i/4)+.012,z*b*i/4,width*(.46+.54*i/4),.02,.025,new T.Color(color).multiplyScalar(1.1).getStyle());
}
// Each shop has its own structure, not a cottage with interchangeable props.
function retailBuilding(g:T.Group,kind:'bakery'|'cafe'|'grocer'|'florist',variant:number):void {
  box(g,0,.07,0,1.9,.14,1.9,'#b4ad97');
  if(kind==='bakery') {
    box(g,-.12,.71,-.15,1.47,1.12,1.22,'#cfb798');
    for(let y=.27;y<1.17;y+=.15)for(let i=0;i<6;i++)box(g,-.76+i*.245+(Math.round(y/.15)%2)*.035,y,.47,.224,.12,.035,i%2?'#c49d81':'#d7b89b');
    archedWindow(g,-.48,.41,.51,.63,.64);box(g,.40,.53,.51,.38,.75,.065,palette.wood);box(g,.49,.53,.56,.04,.04,.026,'#c5a25d');
    roof(g,1.62,1.35,1.3,['#ad6448','#967b58','#737f72','#aa8259'][variant%4]);
    // A brick oven wing and broad chimney make the bakery squat and asymmetric.
    box(g,.70,.56,-.26,.37,.82,1.01,'#b68a6b');box(g,.68,1.38,-.46,.28,1.22,.29,'#a78066');for(let y=.9;y<1.9;y+=.14)box(g,.68,y,-.612,.29,.022,.027,'#d6b394');box(g,.68,2.04,-.46,.38,.12,.37,'#7c7062');
    for(let i=0;i<6;i++){const m=box(g,-.22+(i-2.5)*.20,1.06,.79,.194,.07,.53,i%2?'#ede0c0':'#bb874c');m.rotation.x=.17;box(g,-.22+(i-2.5)*.2,.98,1.06,.19,.12,.035,i%2?'#ede0c0':'#bb874c');}
    box(g,-.36,.43,.88,.85,.07,.32,'#95744e');for(let i=0;i<4;i++){const loaf=cylinder(g,-.65+i*.18,.52,.88,.082,.10,'#c99a60');loaf.scale.z=.65;box(g,-.65+i*.18,.576,.88,.018,.012,.08,'#ead2a2');}
    const back=new T.Group();back.rotation.y=Math.PI;g.add(back);archedWindow(back,.28,.43,.775,.55,.52);box(back,-.50,.29,.79,.32,.24,.24,'#927956');for(let i=0;i<3;i++)box(back,-.51+i*.085,.39,.79,.04,.035,.22,'#bea779');
    for(const y of [.25,.40])box(g,-.12,y,-.78,1.48,.025,.04,'#b18d70');
    flowerPot(g,.72,.89,'#d9bc73',.65); return;
  }
  if(kind==='cafe') {
    // Tall corner townhouse with a roof terrace, balcony and outdoor table.
    box(g,-.16,1.14,-.18,1.25,1.98,1.22,['#d9d0b6','#d2c2b1','#c7cdbf','#e1d1b2'][variant%4]);
    for(const x of [-.81,.46])box(g,x,1.16,.44,.075,2.03,.09,palette.beam);
    box(g,-.16,2.17,-.18,1.44,.13,1.39,'#657c75').material=seasonalMaterial('#657c75','roof');box(g,-.16,2.28,-.72,1.40,.21,.07,'#c7bc9f');for(const x of [-.84,.52])box(g,x,2.28,-.18,.07,.21,1.15,'#c7bc9f');
    archedWindow(g,-.47,.35,.47,.48,.70);box(g,.20,.65,.49,.36,1.02,.06,palette.wood);windowFrame(g,-.17,1.65,.47);
    box(g,-.18,1.32,.67,1.21,.07,.45,palette.wood);for(let i=0;i<6;i++)box(g,-.73+i*.22,1.49,.84,.035,.34,.035,'#536b62');box(g,-.18,1.67,.84,1.2,.045,.045,'#536b62');
    const wing=box(g,.70,.53,-.22,.32,.77,1.2,'#d9ccb1');wing.name='coffee-wing';box(g,.70,.96,-.22,.44,.10,1.36,'#657c75');
    cylinder(g,-.64,.41,.99,.21,.045,'#8c7657');cylinder(g,-.64,.23,.99,.025,.33,palette.iron);cylinder(g,-.65,.48,.99,.045,.08,'#eee2c7');box(g,-.77,.25,.97,.11,.04,.21,palette.wood);
    box(g,.61,1.36,.65,.42,.39,.06,'#5d776e');cylinder(g,.60,1.39,.704,.084,.028,'#e7d3ac').rotation.x=Math.PI/2;box(g,.60,1.23,.705,.18,.035,.025,'#e7d3ac');flowerPot(g,.56,.94,'#c29190',.8);const back=new T.Group();back.rotation.y=Math.PI;g.add(back);windowFrame(back,.16,1.62,.82);archedWindow(back,.16,.36,.82,.65,.71);const side=new T.Group();side.rotation.y=-Math.PI/2;g.add(side);windowFrame(side,.25,1.61,.85);box(g,-.17,.30,-.815,1.27,.17,.07,'#b2a38a');return;
  }
  if(kind==='grocer') {
    // Open, low pavilion: deep hipped roof, rear storeroom and two produce aisles.
    box(g,0,.64,-.57,1.66,.99,.43,'#c0ac83');for(let i=0;i<8;i++)box(g,(i-3.5)*.22,.69,-.34,.03,.95,.025,'#957c57');
    for(const x of [-.82,.82])for(const z of [-.73,.67])box(g,x,.73,z,.095,1.23,.095,palette.wood);
    hipRoof(g,1.97,1.83,1.4,.40,['#75816b','#a7804e','#748991','#a28560'][variant%4]);
    for(const x of [-.59,.59]){box(g,x,.39,.18,.42,.50,1.09,'#a07d52');for(let row=0;row<4;row++){box(g,x,.67,-.20+row*.26,.37,.13,.23,'#b99a69');for(let j=0;j<3;j++){const fruit=new T.Mesh(new T.IcosahedronGeometry(.061,1),material(['#cf9c5f','#a8b86c','#bf7860','#d5ba73'][row]));fruit.position.set(x+(j-1)*.095,.77,-.2+row*.26);g.add(fruit);}}}
    for(let y=.27;y<1.17;y+=.15)box(g,0,y,-.795,1.68,.026,.03,'#9f895f');box(g,.3,.56,-.805,.41,.67,.04,'#8d7654');box(g,.43,.57,-.84,.045,.045,.025,'#c4ad73');box(g,0,1.11,.76,.58,.24,.06,'#e8d8b3');for(let i=0;i<3;i++)cylinder(g,(i-1)*.12,1.12,.80,.053,.025,['#cda16b','#a2ae75','#c07d61'][i]).rotation.x=Math.PI/2;
    cylinder(g,-.78,.29,.92,.14,.29,'#c1ae85');box(g,-.78,.47,.92,.15,.07,.16,'#82996f');return;
  }
  // Flower shop: narrow masonry wing beside a bright glass conservatory.
  const frame=['#6f897a','#857989','#758b98','#94906b'][variant%4],brick=['#dabda9','#d4cbb1','#c9d1c7','#e1ceb0'][variant%4];
  box(g,-.58,.89,-.12,.49,1.48,1.42,brick);for(let y=.3;y<1.55;y+=.18)box(g,-.58,y,.60,.51,.022,.026,'#b69382');
  const glass=material('#b9d1c5').clone();Object.assign(glass,{transparent:true,opacity:.62,roughness:.24,depthWrite:false});
  const pane=(x:number,y:number,z:number,w:number,h:number,d:number)=>{const m=box(g,x,y,z,w,h,d,'#b9d1c5');m.material=glass;return m;};
  for(const x of [-.28,.82])pane(x,.87,-.12,.025,1.35,1.44);pane(.27,.87,.60,1.09,1.35,.025);pane(.27,.87,-.83,1.09,1.35,.025);
  for(const x of [-.3,.26,.83])for(const z of [-.85,.62])box(g,x,.90,z,.055,1.54,.055,frame);for(const y of [.25,1.05,1.60])box(g,.27,y,.63,1.17,.04,.05,frame);
  // Unequal slopes and copper ridge differ from the broad greenhouse silhouette.
  const skylight=pane(.26,1.76,-.12,1.25,.04,1.53);skylight.rotation.z=-.20;for(const z of [-.86,-.13,.63]){const rib=box(g,.26,1.79,z,1.28,.06,.05,frame);rib.rotation.z=-.20;}
  box(g,-.59,1.73,-.12,.66,.12,1.61,'#866b58');box(g,-.58,2.00,-.41,.50,.39,.47,'#d3b79d');hipRoof(g,.67,.66,2.23,.23,'#82786d');
  box(g,.18,.59,.66,.37,.91,.038,'#839d8a');pane(.18,.75,.70,.26,.49,.015);box(g,-.52,.44,.83,.68,.05,.28,'#a68661');
  for(const [i,x]of [-.75,-.43,.65].entries())flowerPot(g,x,.85,['#d399aa','#c4b1d2','#e2bf7c'][i],.82);flowerPot(g,.59,-.42,'#d5b875',1.0);flowerPot(g,.12,-.48,'#c69baa',.7);
  box(g,-.59,1.32,.67,.32,.29,.04,'#e7d9bd');for(let i=0;i<5;i++){const a=i*Math.PI*2/5;cylinder(g,-.59+Math.cos(a)*.054,1.33+Math.sin(a)*.054,.706,.038,.022,'#c18e9b').rotation.x=Math.PI/2;}cylinder(g,-.59,1.33,.721,.031,.02,'#d9bc6c').rotation.x=Math.PI/2;
}
function communityBuilding(g: T.Group, kind: BuildingKind, variant: number): void {
  const colors = ['#718477', '#9d6250', '#718894', '#ae925d'], trim = colors[variant % 4];
  const wide = ['library', 'greenhouse', 'boathouse'].includes(kind), width = wide ? 2.8 : 1.9;
  box(g, 0, .07, 0, width, .14, 1.9, '#b4ad97');
  if (kind === 'library') {
    box(g, 0, .86, -.12, 2.48, 1.44, 1.44, '#e3d5b6'); for (const x of [-1.21, -.43, .43, 1.21]) box(g, x, .88, .61, .07, 1.5, .06, palette.beam);
    for (const y of [.3, 1.55]) box(g, 0, y, .63, 2.51, .08, .08, palette.beam);
    windowFrame(g, -.82, .91, .66); windowFrame(g, .83, .91, .66); box(g, 0, .67, .68, .43, 1.0, .09, palette.wood);
    roof(g, 2.62, 1.62, 1.65, trim); box(g, 0, 1.57, .92, .87, .075, .39, trim); for (const x of [-.36, .36]) box(g, x, .88, 1.02, .06, 1.5, .06, palette.wood);
    box(g, -.75, .42, .9, .69, .05, .23, palette.wood); for (let i = 0; i < 6; i++) box(g, -1.0 + i * .09, .54 + i % 2 * .025, .91, .065, .23 + i % 2 * .05, .16, ['#8fa591', '#b28068', '#a9bbbf'][i % 3]);
    const sign = new T.Group(); sign.position.set(.7, 1.5, .72); g.add(sign); box(sign, 0, 0, 0, .49, .31, .04, '#e9dfc1'); for (const x of [-.1, .1]) { const page = box(sign, x, 0, .034, .19, .2, .025, '#b39666'); page.rotation.z = x < 0 ? -.14 : .14; }
    flowerPot(g, 1.05, .87, '#d2b473', .72); const rear=new T.Group();rear.rotation.y=Math.PI;g.add(rear);for(const x of [-.74,.74])windowFrame(rear,x,.98,.87);box(rear,0,.34,.89,2.47,.19,.04,'#baac8f');const side=new T.Group();side.rotation.y=-Math.PI/2;g.add(side);archedWindow(side,.10,.55,1.27,.66,.89);return;
  }
  if (kind === 'greenhouse') {
    const frame=['#698479','#897e6c','#718898','#94916a'][variant%4],glass = material(['#b5d4c4','#d5c8d4','#b6ccd6','#d6d6b2'][variant%4]).clone(); Object.assign(glass, { transparent: true, opacity: .45, roughness: .28, metalness: .08, depthWrite: false, side: T.DoubleSide });
    const pane = (x: number, y: number, z: number, w: number, h: number, d: number) => { const mesh = new T.Mesh(boxGeometry, glass); mesh.position.set(x, y, z); mesh.scale.set(w, h, d); mesh.receiveShadow = true; g.add(mesh); return mesh; };
    for (const x of [-1.26, 1.26]) { pane(x, .80, 0, .035, 1.25, 1.56); for (const z of [-.76, 0, .76]) box(g, x, .80, z, .065, 1.29, .065, frame); }
    for (const z of [-.76, .76]) { pane(0, .80, z, 2.47, 1.25, .035); for (const x of [-1.26, -.63, 0, .63, 1.26]) box(g, x, .80, z, .055, 1.29, .06, frame); box(g, 0, .28, z, 2.55, .06, .07, frame); }
    for (const side of [-1, 1]) { const mesh = pane(side * .64, 1.65, 0, 1.57, .04, 1.64); mesh.rotation.z = -side * .42; for (const z of [-.8, -.4, 0, .4, .8]) { const rail = box(g, side * .64, 1.65, z, 1.61, .045, .045, frame); rail.rotation.z = -side * .42; } }
    box(g, 0, 1.975, 0, .07, .075, 1.66, frame);
    for (const x of [-.83, .83]) { box(g, x, .42, 0, .45, .55, 1.18, '#a28159'); for (let j = 0; j < 4; j++) flowerPot(g, x, -.48 + j * .30, variant % 2 ? '#d2b26b' : '#cf9894', .77); }
    box(g, 0, .64, .79, .46, 1.02, .045, '#7a958a'); pane(0, .78, .82, .37, .58, .026); return;
  }
  if (kind === 'granary') {
    cylinder(g, -.43, .91, -.16, .43, 1.55, '#c2a97e');
    for (let j = 0; j < 12; j++) { const a = j * Math.PI / 6; box(g, -.43 + Math.cos(a) * .432, .9, -.16 + Math.sin(a) * .432, .03, 1.52, .035, '#947958'); }
    for (const y of [.4, 1.17, 1.56]) cylinder(g, -.43, y, -.16, .443, .055, '#747d70');
    const cap = new T.Mesh(new T.ConeGeometry(.54, .48, 12), seasonalMaterial(trim,'roof')); cap.position.set(-.43, 1.92, -.16); cap.castShadow = true; g.add(cap);
    const shed = new T.Group(); shed.position.set(.48, 0, .06); g.add(shed); box(shed, 0, .63, 0, .62, .96, 1.31, '#b69971'); roof(shed, .77, 1.4, 1.17, trim); box(shed, 0, .52, .69, .36, .73, .06, palette.wood);
    for (const x of [-.71, -.38, -.03]) { cylinder(g, x, .31, .74, .135, .33, '#d2be8e', .11); box(g, x, .50, .74, .12, .035, .11, '#a68b58'); } return;
  }
  if (kind === 'boathouse') {
    for (let j = 0; j < 12; j++) box(g, (j - 5.5) * .225, .18, 0, .214, .08, 1.7, j % 2 ? '#b19a71' : '#bea67b');
    for (const x of [-1.16, 1.16]) for (const z of [-.72, .72]) box(g, x, .87, z, .095, 1.54, .095, palette.wood);
    box(g, 0, .79, -.74, 2.38, 1.16, .09, '#a99069'); roof(g, 2.51, 1.7, 1.64, trim);
    const outline = new T.Shape(); outline.moveTo(-1.02, 0); for (const [x, z] of [[-.67, -.29], [.66, -.24], [1.02, 0], [.66, .24], [-.67, .29]]) outline.lineTo(x, z); outline.closePath();
    const hull = new T.Mesh(new T.ExtrudeGeometry(outline, { depth: .22, bevelEnabled: true, bevelSize: .025, bevelThickness: .025, bevelSegments: 1, steps: 1 }), material('#718b89')); hull.rotation.x = Math.PI / 2; hull.position.set(0, .48, .22); hull.castShadow = true; g.add(hull);
    box(g, 0, .49, .22, 1.60, .03, .37, '#a18761'); for (const x of [-.4, .2, .67]) box(g, x, .55, .22, .16, .06, .46, '#d2bd91');
    for (const z of [-.19, .67]) { const oar = box(g, -.03, .65, z, 1.64, .038, .05, '#c6ac7c'); oar.rotation.y = z < 0 ? .15 : -.15; box(g, -.89, .65, z, .23, .04, .13, '#baa074'); }
    cylinder(g, -1.04, .36, .73, .14, .30, '#957750'); return;
  }
}
function farmBuilding(g:T.Group,kind:'wheatfield'|'mill',variant:number):void {
  if(kind==='wheatfield') {
    box(g,0,.045,0,2.9,.09,1.9,'#927554');
    for(const z of [-.88,.88])box(g,0,.10,z,2.85,.085,.055,'#af9872');
    for(const x of [-1.4,1.4])for(const z of [-.88,.88]){box(g,x,.24,z,.065,.46,.065,palette.wood);box(g,x,.46,z,.10,.05,.10,'#b29771');}
    // Leave the central farm lane clear for the worker and wheelbarrow.
    const crop=new T.Group();crop.name='crop-patch';crop.userData.movingPart=true;crop.position.y=.1;g.add(crop);
    for(const side of [-1,1])for(let row=0;row<4;row++)for(let j=0;j<5;j++) {
      const x=side*(.4+row*.23),z=(j-2)*.31;
      box(g,x,.098,z,.028,.018,.22,'#70593f');
      for(const off of [-.04,.035]){box(crop,x+off,.21,z,.017,.4,.017,'#96a55b');
        const ear=box(crop,x+off,.41,z,.060,.15,.048,['#dfbb6c','#d6aa56','#d9bd7a','#e1c78b'][variant%4]);ear.rotation.z=side*.13;
      }
    }
    box(g,1.11,.23,.69,.38,.16,.28,'#987953');for(let i=0;i<3;i++)box(g,1.11,.35+i*.02,.68,.30,.08,.20,'#d6b777');
    const tool=box(g,-1.34,.33,.68,.022,.58,.023,palette.wood);tool.rotation.z=.25;box(g,-1.40,.56,.68,.20,.024,.065,'#7b8272');
    return;
  }
  box(g,0,.09,0,2.86,.18,2.86,'#b9b09a');
  const tower=new T.Mesh(new T.CylinderGeometry(.56,.81,1.90,16),material('#ddccb0'));tower.position.set(-.18,1.03,-.22);tower.castShadow=true;tower.receiveShadow=true;g.add(tower);
  for(let row=0;row<8;row++)for(let j=0;j<16;j++){const a=j*Math.PI/8+(row%2)*Math.PI/16,r=.81-row*.026;const stone=box(g,-.18+Math.sin(a)*r,.25+row*.2,-.22+Math.cos(a)*r,Math.PI*r/8*.87,.17,.055,row%2?'#c6b79d':'#bcae96');stone.rotation.y=a;}
  const cap=new T.Mesh(new T.ConeGeometry(.84,.85,8),seasonalMaterial(['#8f6550','#778771','#6b8290','#a48a62'][variant%4],'roof'));cap.position.set(-.18,2.4,-.22);cap.castShadow=true;g.add(cap);
  box(g,-.18,.57,.55,.40,.81,.065,palette.wood);box(g,-.18,.16,.74,.65,.11,.36,'#a79c87');archedWindow(g,-.18,1.14,.49,.36,.47);
  const fan=new T.Group();fan.name='mill-fan';fan.userData.movingPart=true;fan.position.set(-.18,2.20,.71);g.add(fan);
  for(let k=0;k<4;k++){const blade=new T.Group();blade.rotation.z=k*Math.PI/2;fan.add(blade);box(blade,0,.72,0,.055,1.55,.055,palette.beam);box(blade,.12,.92,.025,.28,.90,.035,'#e0d1ab');for(let j=0;j<5;j++)box(blade,.12,.58+j*.17,.052,.29,.027,.02,'#a89062');}
  cylinder(fan,0,0,.06,.11,.14,'#897358').rotation.x=Math.PI/2;
  const store=new T.Group();store.position.set(.85,0,-.35);g.add(store);box(store,0,.49,0,.68,.82,1.4,'#a58860');roof(store,.80,1.51,.99,'#8c7759');
  for(const z of [.85,1.09]){cylinder(g,.63,.24,z,.14,.39,'#cbbc93',.11);box(g,.63,.44,z,.13,.08,.13,'#a59475');}
  box(g,-1.02,.30,-.99,.47,.47,.42,'#97764c');for(const y of [.14,.30,.46])box(g,-1.02,y,-.76,.50,.055,.055,'#b29870');
}
export function buildingModel(kind: BuildingKind, variant = 0, stage = 0): T.Group {
  const g = new T.Group(); g.name = `${kind}-${variant}-${stage}`;
  if(['vegetablefield','cowshed','pigpen','fishinghut','restaurant','apronstand','harvesttable','wheatbanner'].includes(kind))villageModel(g,kind,variant);
  else if(kind==='wheatfield'||kind==='mill')farmBuilding(g,kind,variant);
  else if (['bakery','cafe','grocer','florist'].includes(kind)) retailBuilding(g,kind as 'bakery'|'cafe'|'grocer'|'florist',variant);
  else if (['library', 'greenhouse', 'granary', 'boathouse'].includes(kind)) communityBuilding(g, kind, variant);
  else if (kind === 'house') cottage(g, variant, kind);
  else if (kind === 'hall') {
    box(g, 0, .1, 0, 2.8, .2, 2.8, '#b3aa90');
    box(g, 0, .96, 0, 2.28, 1.72, 2.02, '#e3d4b1');
    for (const x of [-1.13, 1.13]) box(g, x, 1, 1.02, .09, 1.8, .09, palette.beam);
    windowFrame(g, -.7, 1.12, 1.04); windowFrame(g, .7, 1.12, 1.04);
    const rear = new T.Group(); rear.rotation.y = Math.PI; g.add(rear); windowFrame(rear, -.7, 1.12, 1.04); windowFrame(rear, .7, 1.12, 1.04);
    for (const x of [-1.18, 1.18]) { const wall = new T.Group(); wall.rotation.y = x < 0 ? -Math.PI / 2 : Math.PI / 2; g.add(wall); windowFrame(wall, 0, 1.05, 1.17); }
    box(g,0,.62,1.037,.57,1.06,.02,'#322f2b');const door=new T.Group();door.name='door-hinge';door.userData.movingPart=true;door.position.set(-.275,.62,1.10);g.add(door);box(door,.275,0,0,.55,1.04,.06,palette.wood);box(door,.45,0,.045,.05,.05,.03,'#ccb36c');
    for (let i = 0; i < 3; i++) box(g, 0, .06 + i * .08, 1.24 - i * .1, .94, .12, .38, palette.stone);
    roof(g, 2.55, 2.25, 1.95, '#63745b');
    box(g, 0, 2.36, -.15, .64, .74, .65, '#e6dbb7'); roof(g, .87, .87, 2.76, '#546d54');
    box(g, 0, 2.42, .19, .35, .35, .03, '#f5e9c8');
    box(g, 0, 2.44, .215, .022, .12, .02, palette.beam); box(g, .055, 2.385, .22, .12, .02, .02, palette.beam);
    cylinder(g, -1.29, .85, 1.2, .025, 1.65, palette.iron); box(g, -1.07, 1.4, 1.2, .4, .28, .025, '#c3a36b');
  } else if (kind === 'market') {
    box(g, 0, .06, 0, 2.8, .12, 2.8, '#b1aa90');
    for (const x of [-1.1, 1.1]) for (const z of [-1, 1]) box(g, x, .75, z, .1, 1.5, .1, palette.wood);
    roof(g, 2.52, 2.5, 1.52, '#a77e47');
    for (const x of [-.75, .75]) {
      box(g, x, .43, .25, .7, .66, 1.35, '#9d7951');
      for (let i = 0; i < 6; i++) for (let j = 0; j < 2; j++) box(g, x - .2 + j * .3, .82, -.26 + i * .19, .15, .12, .14, ['#bb7447', '#8d9b58', '#d2b066'][i % 3]);
    }
    box(g, 0, .53, -.85, 2.05, .7, .35, '#b0976a');
  } else if (kind === 'park') {
    box(g, 0, .055, 0, 1.93, .11, 1.93, '#a8ba7f').material=seasonalMaterial('#a8ba7f','ground');
    for (const x of [-.91, .91]) box(g, x, .18, -.1, .065, .25, 1.7, '#e1d2ac');
    const t = treeModel(variant); t.scale.setScalar(.82); t.position.set(-.38, .08, -.36); g.add(t);
    const b = new T.Group(); b.position.set(.4, .13, .55); bench(b); b.scale.setScalar(.85); g.add(b);
    box(g, 0, .12, .42, 1.7, .035, .34, '#cbbc98');
    for (let i = 0; i < 5; i++) box(g, -.6 + i * .27, .19, -.79, .13, .12, .13, i % 2 ? '#d9b674' : '#b4797c');
  } else if (kind === 'bridge') {
    box(g, 0, .08, 0, .97, .18, 2.28, '#b6ab91');
    for (const [i, stone] of BRIDGE_STONES.entries()) box(g, 0, stone.y, stone.z, .9, stone.height, stone.depth, i % 2 ? '#c8bfa5' : '#beb499');
    for (const x of [-.43, .43]) { box(g, x, .38, 0, .13, .29, 2.25, '#ada18a'); for (const z of [-.94, 0, .94]) box(g, x, .48, z, .2, .47, .19, '#b9ad94'); }
    if (variant) for (const x of [-.43, .43]) for (const z of [-.94, .94]) box(g, x, .74, z, .2, .045, .19, ['#b9ad94', '#718879', '#83989e', '#bb9c6c'][variant % 4]);
  } else if (kind === 'workshop') {
    cottage(g, variant % 4, 'house');
    const accents = ['#a8b6ae', '#6eabc0', '#c9978b', '#a296bf', '#d9b362'];
    box(g, 0, 1.17, .84, .7, .16, .07, accents[stage], true);
    if (stage > 0) { box(g, 0, 2.05, 0, 1.06, .75, 1.05, '#e6d5b8'); roof(g, 1.3, 1.3, 2.48, accents[stage]); windowFrame(g, 0, 2.08, .56); }
    if (stage > 1) { const balcony = box(g, 0, 1.7, .88, 1.64, .12, .38, palette.wood); balcony.name = 'balcony'; for (let i = 0; i < 5; i++) box(g, (i - 2) * .33, 1.9, 1.03, .04, .32, .04, accents[stage]); }
    if (stage > 2) { box(g, -.78, 2.17, -.45, .38, 1.8, .38, '#ccbfa7'); roof(g, .55, .55, 3.1, accents[stage]); }
    if (stage === 4) { cylinder(g, 0, 3.0, 0, .11, .7, '#d8b466', .04); for (const x of [-.39, .39]) box(g, x, 2.82, 0, .12, .45, .12, '#d8b466'); box(g, 0, 2.78, 0, .86, .12, .12, '#d8b466'); }
  } else if (kind === 'clock') {
    box(g, 0, .1, 0, 2.65, .2, 2.65, palette.stone);
    for (let i = 0; i < 3; i++) box(g, 0, .23 + i * .12, .1, 2.1 - i * .25, .15, 2.1 - i * .25, '#b9b099');
    box(g, 0, 1.75, 0, 1.17, 2.8, 1.17, '#d4c6a5');
    for (let y = .6; y < 3; y += .28) box(g, 0, y, .592, 1.19, .025, .04, '#c1b495');
    for (let i = 0; i < 4; i++) { const f = new T.Group(); f.rotation.y = i * Math.PI / 2; g.add(f); cylinder(f, 0, 2.64, .64, .37, .07, '#f2e4b9').rotation.x = Math.PI / 2; box(f, 0, 2.72, .7, .035, .2, .035, palette.iron); box(f, .1, 2.64, .7, .23, .035, .03, palette.iron); }
    roof(g, 1.6, 1.5, 3.23, ['#687b63', '#8a6867', '#728999', '#ba965c'][variant % 4]); cylinder(g, 0, 3.94, 0, .045, .5, '#bda262');
  } else if (kind === 'tree') g.add(treeModel(variant));
  else if (kind === 'bench') bench(g, ['#ab8352', '#869b7c', '#99a9b1', '#c5bca4'][variant % 4]);
  else if (kind === 'lamp' || kind === 'gardenlamp') { lamp(g, variant); if (kind === 'gardenlamp') for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; box(g, Math.cos(a) * .28, .08, Math.sin(a) * .28, .18, .12, .18, '#87a36d'); } }
  else if (kind === 'flower') { box(g, 0, .2, 0, .85, .36, .45, '#a57b54'); for (let i = 0; i < 5; i++) { box(g, (i - 2) * .14, .42, 0, .04, .2, .04, '#71835a'); box(g, (i - 2) * .14, .55, 0, .12, .08, .12, variant % 2 ? '#c48da1' : '#e1b65e'); } }
  else if (kind === 'picnic') { box(g, 0, .55, 0, .82, .07, .65, variant % 2 ? '#839981' : '#a58352'); for (const x of [-.33, .33]) { box(g, x, .28, 0, .07, .5, .08, palette.wood); box(g, x * 1.2, .29, 0, .14, .06, .68, variant % 2 ? '#acbaa0' : '#b79763'); } box(g, -.15, .62, .05, .18, .06, .18, '#d6c3a2'); }
  else if (kind === 'birdhouse') { box(g, 0, .6, 0, .08, 1.2, .08, palette.wood); box(g, 0, 1.12, 0, .45, .43, .4, '#d6b273'); roof(g, .61, .51, 1.34, variant % 2 ? '#88a182' : '#ab6952'); cylinder(g, 0, 1.14, .225, .09, .025, palette.beam).rotation.x = Math.PI / 2; }
  else if (kind === 'windmill') { box(g, 0, .6, 0, .39, 1.12, .39, '#d4c2a4'); roof(g, .61, .56, 1.2, variant % 2 ? '#889cac' : '#797e5e'); const fan = new T.Group(); fan.name = 'fan'; fan.position.set(0, 1.05, .3); g.add(fan); for (let i = 0; i < 4; i++) { const blade = box(fan, 0, 0, 0, .11, 1.15, .045, variant % 2 ? '#becbd0' : '#d9bf91'); blade.rotation.z = i * Math.PI / 4; } }
  else if (kind === 'statue') { const stone = variant % 2 ? '#9cbbac' : '#c9c4af'; box(g, 0, .17, 0, .72, .34, .72, '#b0ac96'); box(g, 0, .7, 0, .31, .8, .31, stone); box(g, 0, 1.21, 0, .37, .37, .37, stone); box(g, -.23, .88, 0, .45, .12, .12, stone); }
  else if(kind==='barrel') { cylinder(g,0,.3,0,.23,.58,'#92704c',.21);for(const y of [.1,.46])cylinder(g,0,y,0,.239,.045,'#62675d');box(g,.29,.08,.05,.13,.14,.46,'#b49a72'); }
  else if(kind==='planter') {cylinder(g,0,.14,0,.3,.28,'#b57958',.35);cylinder(g,0,.29,0,.3,.025,'#625541');for(let i=0;i<7;i++){const a=i*2.4;box(g,Math.cos(a)*.17,.4,Math.sin(a)*.17,.025,.23,.025,'#6b8b5a');const flower=new T.Mesh(new T.IcosahedronGeometry(.074,1),material(i%2?'#ddb968':'#c69391'));flower.position.set(Math.cos(a)*.17,.54,Math.sin(a)*.17);g.add(flower);}}
  else if(kind==='hedge') {box(g,0,.25,0,.92,.5,.5,'#65845f');box(g,0,.51,0,.88,.08,.47,'#7b986b');}
  else if(kind==='cart'){box(g,0,.32,0,.6,.15,.7,'#a6885c');for(const x of [-.36,.36])cylinder(g,x,.18,0,.18,.065,'#6d5d46').rotation.z=Math.PI/2;for(const z of [-.32,.32])box(g,0,.49,z,.64,.24,.06,'#b59b74');}
  else if(kind==='fountain'){cylinder(g,0,.12,0,.87,.22,'#b1b4a5');cylinder(g,0,.24,0,.7,.026,'#7aabb0');cylinder(g,0,.43,0,.15,.5,'#c6c6b2');cylinder(g,0,.67,0,.4,.09,'#c6c6b2');}
  else if(kind==='gazebo'){box(g,0,.08,0,1.86,.16,1.86,'#b8b5a5');for(const x of [-.7,.7])for(const z of [-.7,.7])box(g,x,.75,z,.08,1.5,.08,'#967a56');roof(g,1.77,1.77,1.5,'#798c77');const b=new T.Group();b.position.set(0,.16,-.55);bench(b);g.add(b);}
  if(kind==='greenhouse'){
    const crops=new T.Group();crops.name='vegetable-crops';crops.userData.movingPart=true;crops.position.y=.70;g.add(crops);
    for(const x of [-.85,.85])for(const z of [-.45,-.15,.15,.45]){box(crops,x,.12,z,.05,.24,.05,'#7f9e61');box(crops,x+.06,.24,z,.16,.07,.11,'#8ead72');}
  }
  return g;
}
export function residentModel(color: string, variant = 0, seated = false): T.Group {
  const g = new T.Group(), body = new T.Group();
  const skin = ['#d6aa85', '#b88c6a', '#e2b99a'][variant % 3];
  box(body, 0, .35, 0, .19, .25, .14, color); box(body, 0, .54, 0, .18, .18, .17, skin);
  box(body, 0, .635, -.018, .195, .065, .19, variant % 2 ? '#5a493d' : '#a47b50');
  box(body, 0, .56, -.075, .18, .1, .035, variant % 2 ? '#5a493d' : '#a47b50');
  for (const x of [-.04, .04]) box(body, x, .55, .087, .018, .023, .012, '#47443c');
  box(body, 0, .245, 0, .2, .035, .145, '#706650');
  g.add(packModel(body));
  for (const [side, x] of [['left', -.055], ['right', .055]] as const) {
    const leg = new T.Group(); leg.name = `leg-${side}`; leg.position.set(x, .235, 0);
    const pieces = new T.Group();
    if (seated) { box(pieces, 0, -.004, .064, .073, .078, .145, '#53616a'); box(pieces, 0, -.108, .125, .068, .20, .072, '#53616a'); box(pieces, 0, -.218, .149, .084, .055, .12, '#5a483c'); }
    else { box(pieces, 0, -.105, 0, .073, .2, .085, '#53616a'); box(pieces, 0, -.208, .027, .084, .055, .14, '#5a483c'); }
    leg.add(packModel(pieces)); g.add(leg);
    const arm = new T.Group(); arm.name = `arm-${side}`; arm.position.set(x < 0 ? -.137 : .137, .43, 0);
    const sleeve = new T.Group(); box(sleeve, 0, -.073, 0, .065, .15, .085, color); box(sleeve, 0, -.169, 0, .06, .068, .071, skin); arm.add(packModel(sleeve)); if (seated) arm.rotation.x = -.38; g.add(arm);
  }
  return g;
}

export function packModel(source: T.Group): T.Group {
  source.updateMatrixWorld(true);
  const result = new T.Group(); result.name = source.name; result.userData={...source.userData};
  const parts:T.Object3D[]=[];source.traverse(o=>{if(o.userData.movingPart)parts.push(o);});
  const movingAncestor=(o:T.Object3D):T.Object3D|undefined=>{let node:T.Object3D|null=o;while(node&&node!==source){if(node.userData.movingPart)return node;node=node.parent;}return undefined;};
  const merge=(root:T.Object3D,target:T.Group,part?:T.Object3D)=>{
    const inverse=root.matrixWorld.clone().invert(),groups=new Map<T.Material,T.BufferGeometry[]>();
    root.traverse(o=>{if(!(o instanceof T.Mesh)||Array.isArray(o.material)||movingAncestor(o)!==part)return;const geo=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();geo.applyMatrix4(new T.Matrix4().multiplyMatrices(inverse,o.matrixWorld));const list=groups.get(o.material)||[];list.push(geo);groups.set(o.material,list);});
    for(const [mat,geometries]of groups){const merged=mergeGeometries(geometries,false);if(!merged)continue;const mesh=new T.Mesh(mergeVertices(merged),mat);merged.dispose();mesh.castShadow=true;mesh.receiveShadow=true;target.add(mesh);geometries.forEach(geo=>geo.dispose());}
  };
  merge(source,result);
  for(const part of parts){const node=new T.Group();node.name=part.name;node.userData={...part.userData};new T.Matrix4().multiplyMatrices(source.matrixWorld.clone().invert(),part.matrixWorld).decompose(node.position,node.quaternion,node.scale);merge(part,node,part);result.add(node);}
  return result;
}
