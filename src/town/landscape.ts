import * as T from 'three';
import { box, material, packModel, treeModel } from './models';
import { bridgeSlots, unlocked, water } from './world';
import type { Board, TownState } from './types';

// The decorative landscape never occupies gameplay cells. Its seeded groves,
// cliffs and shoreline are authored around the same flat, readable town grid.
export function landscape(board: Board, state: TownState, assets = new Map<string,T.Group>()) {
  const n = board.size, world = new T.Group(), forest = new T.Group(), stonework = new T.Group();
  let seed = 4703 + n; const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  const river = board.terrain === 'meadow' ? -1 : board.terrain === 'valley' ? 11 : 5;
  box(stonework, n / 2, -1.37, n / 2, n + .1, .5, n + .1, '#756b54');
  box(stonework, n / 2, -.91, n / 2, n + .08, .46, n + .08, '#9b8767');
  box(stonework, n / 2, -.61, n / 2, n + .12, .17, n + .12, '#b1a080');
  const bank = (z: number, depth: number) => box(stonework, n / 2, -.29, z, n + .06, .55, depth, '#b8a887');
  if (river < 0) bank(n / 2, n); else { bank(river / 2, river); bank((river + 2 + n) / 2, n - river - 2); }
  for (let x = 0; x < n; x++) for (const z of [0, n]) {
    if (x % 3 === 0) box(stonework, x + .5, -.78, z, .85, .17 + random() * .12, .035, '#88775d');
    if (x % 2 === 0) box(stonework, x + .7, -1.14, z, .48, .11, .04, '#ab9474');
  }
  for (let z = 0; z < n; z++) for (const x of [0, n]) if (!water(board, .5, z)) box(stonework, x, -.83, z + .4, .04, .2, .68 + random() * .2, '#8e7c62');
  const positions: number[] = [], colors: number[] = [], color = new T.Color();
  const grassColor = (x: number, z: number) => {
    const light = .94 + Math.sin(x * .34 + z * .12) * .035 + Math.cos(z * .43 - x * .17) * .025;
    const open = unlocked(state, board, Math.min(n - 1, Math.floor(x)), Math.min(n - 1, Math.floor(z)));
    color.set(open ? '#91b474' : '#729b71');
    if (river >= 0) color.lerp(new T.Color('#8fa581'), Math.max(0, 1 - Math.min(Math.abs(z - river), Math.abs(z - river - 2)) / 1.6) * .3);
    return color.multiplyScalar(light);
  };
  for (let z = 0; z < n; z++) for (let x = 0; x < n; x++) if (!water(board, x, z)) {
    for (const [xx, zz] of [[x, z], [x, z + 1], [x + 1, z], [x + 1, z], [x, z + 1], [x + 1, z + 1]]) { positions.push(xx, .026, zz); const c = grassColor(xx, zz); colors.push(c.r, c.g, c.b); }
  }
  const grassGeometry = new T.BufferGeometry().setAttribute('position', new T.Float32BufferAttribute(positions, 3)).setAttribute('color', new T.Float32BufferAttribute(colors, 3)); grassGeometry.computeVertexNormals();
  const grass = new T.Mesh(grassGeometry, new T.MeshStandardMaterial({ vertexColors: true, roughness: .95 })); grass.material.userData.seasonRole='ground'; grass.receiveShadow = true; world.add(grass);
  const floorMaterial=material('#d6decf').clone();floorMaterial.userData.seasonRole='ground';const floor = new T.Mesh(new T.PlaneGeometry(240, 240), floorMaterial); floor.rotation.x = -Math.PI / 2; floor.position.set(n / 2, -1.65, n / 2); floor.receiveShadow = true; world.add(floor);
  const waterTime = { value: 0 }, ducks: T.Group[] = [];
  const prop = (name: string,x:number,y:number,z:number,scale=1,rotation=0) => {const source=assets.get(name);if(!source)return;const model=source.clone();model.position.set(x,y,z);model.scale.setScalar(scale);model.rotation.y=rotation;world.add(model);return model;};
  const ribbon = (edge:(x:number)=>number,inside:(x:number)=>number,y:number,color:string) => {
    const vertices:number[]=[];for(let i=0;i<n*4;i++){const a=i/4,b=(i+1)/4;for(const [x,z] of [[a,edge(a)],[a,inside(a)],[b,edge(b)],[b,edge(b)],[a,inside(a)],[b,inside(b)]])vertices.push(x,y,z);}
    const geo=new T.BufferGeometry().setAttribute('position',new T.Float32BufferAttribute(vertices,3));geo.computeVertexNormals();const mesh=new T.Mesh(geo,material(color));mesh.receiveShadow=true;world.add(mesh);
  };
  if (river >= 0) {
    box(stonework, n / 2, -.43, river + 1, n + .17, .12, 2.05, '#457b7c');
    const waterMaterial = new T.MeshStandardMaterial({ color: '#499a9e', roughness: .23, metalness: .06, transparent: true, opacity: .94 });
    waterMaterial.onBeforeCompile = shader => {
      shader.uniforms.townTime = waterTime;
      shader.vertexShader = 'uniform float townTime; varying vec3 townPosition;\n' + shader.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\ntransformed.z += sin(position.x * 2.1 - townTime * .65) * .006 + sin(position.x * .72 + position.y * 8.3 - townTime * .38) * .003;').replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\ntownPosition = (modelMatrix * vec4(transformed, 1.0)).xyz;');
      shader.fragmentShader = 'uniform float townTime; varying vec3 townPosition;\n' + shader.fragmentShader.replace('#include <color_fragment>', `#include <color_fragment>
        float depth = min(abs(townPosition.z - ${river.toFixed(1)}), abs(townPosition.z - ${(river+2).toFixed(1)}));
        float flow = sin(townPosition.x * .9 - townTime * .38 + sin(townPosition.z * 5.0)) * .035;
        float ripple = pow(max(0.0, sin(townPosition.x * 3.2 - townTime * .65 + sin(townPosition.z * 12.0) * .4)), 32.0);
        diffuseColor.rgb *= .95 + flow;
        diffuseColor.rgb += vec3(.10,.19,.13) * (1.0 - smoothstep(.1,.48,depth));
        diffuseColor.rgb += vec3(.17,.20,.18) * ripple * .13;`);
    };
    const surface = new T.Mesh(new T.PlaneGeometry(n + .15, 2,n*6,10), waterMaterial); surface.rotation.x = -Math.PI / 2; surface.position.set(n / 2, -.19, river + 1); world.add(surface);
    const bridges = bridgeSlots(board);
    for(const side of [-1,1]) {
      const z=side<0?river:river+2, into=-side;
      ribbon(x=>z+into*(.06+Math.sin(x*.78)*.035),x=>z+into*(.25+Math.sin(x*.78)*.06+Math.sin(x*1.9)*.04),-.16,'#92b6a4');
      ribbon(()=>z,x=>z+into*(.14+Math.sin(x*.78)*.035),-.045,'#b0b29a');
    }
    for (let x = 0; x < n; x++) for (const side of [-1, 1]) {
      const z = side < 0 ? river : river + 2, bend = Math.sin(x * .85) * .05;
      if (!bridges.includes(x) && x % 3 !== 1) {
        for (let j = 0; j < 4; j++) { const xx=x+.08+random()*.82,zz=z-side*(.06+random()*.14)+bend;if(assets.has('rock'))prop('rock',xx,-.15,zz,.35+random()*.35,random()*6);else{const rock=new T.Mesh(new T.DodecahedronGeometry(.12+random()*.06,0),material(j%2?'#a5b2a0':'#bec2ab'));rock.position.set(xx,-.12,zz);rock.scale.y=.55;stonework.add(rock);} }
        for (let j = 0; j < 6; j++) {const reed=box(stonework,x+.18+j*.07,.055+j%2*.025,z-side*.08,.018,.21+random()*.15,.018,'#657f56');reed.rotation.z=(random()-.5)*.3;if(j%2===0)box(stonework,reed.position.x,.22,z-side*.08,.033,.075,.033,'#927b4e');}
      }
    }
    for (const x of bridges) {
      const marker = new T.Mesh(new T.PlaneGeometry(.65, 1.65), new T.MeshBasicMaterial({ color: '#e2dbc0', transparent: true, opacity: .2, side: T.DoubleSide })); marker.rotation.x = -Math.PI / 2; marker.position.set(x + .5, -.18, river + 1); world.add(marker);
    }
    // A quiet landing sits outside the playable grid, leaving every bridge free.
    for (let i = 0; i < 5; i++) box(stonework, -.36, -.1, river + .1 + i * .13, .6, .05, .115, '#a7895c');
    for (const z of [river + .08, river + .69]) box(stonework, -.63, -.21, z, .09, .47, .09, '#806d51');
    const boat = new T.Group(); boat.name = 'river-boat'; boat.position.set(n - 5.4, -.15, river + 1.14);
    box(boat, 0, 0, 0, .68, .1, .34, '#9d7550'); for (const x of [-.33, .33]) box(boat, x, .07, 0, .06, .12, .36, '#b48a5c'); for (const z of [-.16, .16]) box(boat, 0, .08, z, .65, .13, .05, '#ac8055'); box(boat, 0, .09, 0, .12, .045, .3, '#d0ac75'); world.add(packModel(boat));
    for(let i=0;i<3;i++) {const duck=new T.Group();const body=new T.Mesh(new T.SphereGeometry(.08,10,6),material(i?'#e2d7b5':'#eee4c9'));body.scale.set(1.6,.8,1);duck.add(body);const head=new T.Mesh(new T.SphereGeometry(.047,8,6),material('#ece1c2'));head.position.set(.095,.068,0);duck.add(head);box(duck,.14,.064,0,.055,.022,.035,'#c49a56');world.add(duck);ducks.push(duck);}
    for(let i=0;i<8;i++){const pad=new T.Mesh(new T.CircleGeometry(.045+random()*.035,8),material('#6a976d'));pad.rotation.x=-Math.PI/2;pad.position.set(2+random()*(n-4),-.178,river+(i%2?.29:1.7));world.add(pad);}
  }
  const trees: { x: number; y: number; z: number; scale: number; variant: number }[] = [];
  if (board.terrain === 'valley') {
    const hillHeight = (x: number, z: number) => {
      const a = Math.max(0, 1 - Math.hypot((x - 3) / 8, (z + 7) / 7)), b = Math.max(0, 1 - Math.hypot((x - 20) / 10, (z + 8) / 7));
      return -1.64 + Math.max(a * a * 4.2, b * b * 5.5);
    };
    const hillPositions:number[]=[],hillColors:number[]=[];
    for(let z=-14;z<-1;z++)for(let x=-6;x<n+7;x++)for(const [xx,zz] of [[x,z],[x,z+1],[x+1,z],[x+1,z],[x,z+1],[x+1,z+1]]){const h=hillHeight(xx,zz);hillPositions.push(xx,h,zz);const c=new T.Color('#879e75').multiplyScalar(.9+Math.max(0,h+1.64)*.035);hillColors.push(c.r,c.g,c.b);}
    const hillGeometry=new T.BufferGeometry().setAttribute('position',new T.Float32BufferAttribute(hillPositions,3)).setAttribute('color',new T.Float32BufferAttribute(hillColors,3));hillGeometry.computeVertexNormals();const hills=new T.Mesh(hillGeometry,new T.MeshStandardMaterial({vertexColors:true,roughness:.95}));hills.material.userData.seasonRole='ground';hills.receiveShadow=true;world.add(hills);
    for (let z = -13; z < -1; z += 2) for (let x = -5; x < n + 7; x += 2) {
      const h = hillHeight(x + 1, z + 1); if (h <= -1.6) continue;
      if (random() > .39) {const xx=x+.5+random(),zz=z+.4+random();trees.push({ x:xx,y:hillHeight(xx,zz)+.035,z:zz,scale:.75+random()*.65,variant:(x+z+100)%3 });}
      if(random()>.73)prop('boulder',x+.8,hillHeight(x+.8,z+.8),z+.8,.8,random()*6);
    }
    // Grove shapes, a meadow opening, and a clear riverside replace random dots.
    for (const center of [{ x: 5, z: 4 }, { x: 18, z: 4 }, { x: 19, z: 19 }]) for (let i = 0; i < 22; i++) {
      const a = random() * Math.PI * 2, r = Math.sqrt(random()) * 4.3, x = center.x + Math.cos(a) * r, z = center.z + Math.sin(a) * r;
      if (x < .7 || z < .7 || x > n - .7 || z > n - .7 || water(board, Math.floor(x), Math.floor(z)) || Math.abs(z - 12) < 2.5 || unlocked(state, board, x, z)) continue;
      trees.push({ x, y: .03, z, scale: .64 + random() * .65, variant: i % 3 });
    }
  } else for (const x of [-1.1, n + 1.1]) for (let i = 0; i < 5; i++) trees.push({ x, y: -1.62, z: 1 + i * 2.2, scale: .75, variant: i % 3 });
  const transform = new T.Object3D();
  for (let variant = 0; variant < 3; variant++) {
    const curated = assets.get(['tree-0','pine','birch'][variant]); const template = packModel(curated || treeModel(variant)), points = trees.filter(p => p.variant === variant);
    for (const mesh of template.children as T.Mesh[]) {
      const mat=(mesh.material as T.MeshStandardMaterial).clone();mat.userData.seasonRole='grove';const batch = new T.InstancedMesh(mesh.geometry, mat, points.length); batch.name='curated-grove';
      points.forEach((p, i) => { transform.position.set(p.x, p.y, p.z); transform.scale.setScalar(p.scale); transform.rotation.y = i * 1.73; transform.updateMatrix(); batch.setMatrixAt(i, transform.matrix); }); batch.castShadow = true; batch.receiveShadow = true; forest.add(batch);
    }
  }
  // Wildflower patches are small enough to remain scenery when a foundation lands.
  for (let i = 0; i < n * 3; i++) {
    const x = .3 + random() * (n - .6), z = .3 + random() * (n - .6); if (water(board, Math.floor(x), Math.floor(z)) || board.roads.includes(`${Math.floor(x)},${Math.floor(z)}`) || board.buildings.some(b => b.placed && Math.abs(b.x + 1 - x) < 1.6 && Math.abs(b.z + 1 - z) < 1.6)) continue;
    for (let j = 0; j < 3; j++) { const xx = x + (random() - .5) * .35, zz = z + (random() - .5) * .35; box(stonework, xx, .08, zz, .018, .1, .018, '#74865a'); box(stonework, xx, .145, zz, .05, .025, .05, i % 3 ? '#decb91' : '#c894a0'); }
  }
  if (board.terrain === 'valley') {
    // Low rural fences explain the first expansion boundary without a UI overlay.
    if (!state.chapterStars[1]) for (let z = 14; z < 24; z += 2) { for (const zz of [z, z + 1.85]) box(stonework, 12.05, .3, zz, .075, .58, .075, '#9a8767'); for (const y of [.23, .46]) box(stonework, 12.05, y, z + .93, .045, .055, 1.8, '#b4a280'); }
    if (!state.chapterStars[2]) for (let x = 1; x < 24; x += 2) { if (bridgeSlots(board).includes(x) || bridgeSlots(board).includes(x - 1)) continue; for (const xx of [x, x + 1.8]) box(stonework, xx, .29, 10.65, .075, .56, .075, '#9a8767'); for (const y of [.23, .43]) box(stonework, x + .9, y, 10.65, 1.7, .055, .04, '#b4a280'); }
  }
  world.add(packModel(stonework));
  return { world, forest, update(time: number) { waterTime.value = time / 1000; ducks.forEach((duck,i)=>{const t=time*.000065;duck.position.set(n*.28+Math.sin(t)*n*.19-i*.25,-.12+Math.sin(time*.002+i)*.007,river+1+Math.sin(t*1.3)*.28+i*.09);duck.rotation.y=Math.cos(t)>0?0:Math.PI;}); } };
}
