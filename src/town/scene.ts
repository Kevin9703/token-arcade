import * as T from 'three';
import {tickVillage,productionLabel,productionDuration,PRODUCTION_KINDS,stationRun,availableGoods,orderStatus,type Good} from './village';
import {scheduledJobs} from './work-scheduler';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { buildingModel, buildingSeats, packModel, material, residentModel, box, boxGeometry, sharedMaterial } from './models';
import { CATALOG } from './catalog';
import { landscape } from './landscape';
import { canPlace, visualVariant, dimensions, entrance, makeBuilding } from './world';
import { buildingCoverage } from './service-feedback';
import { levelFor, stageForLevel } from '../domain/levels';
import { wheelGesture, smoothFraction, clampElevation, clampZoom, DEFAULT_ELEVATION, MIN_ELEVATION, MAX_ELEVATION } from './camera-input';
import { PedestrianTraffic, walkingPose } from './pedestrians';
import { stoneRoads } from './roads';
import { worldTime } from './world-time';
import { SeasonPalette } from './seasons';
import { ResidentLife, homeForBuilding, type ResidentSeat } from './resident-life';
import { farmChains, farmDuration, tickFarm, roadRoute, FARM_LABELS, bakeryMaterialLabel, type FarmChain } from './farming';
import { SeasonalMusic } from './music';
import { keyboardPanDistance } from './keyboard-input';
import { walkSurface, BUILDING_GROUND_Y } from './walk-surface';
import type { Board, BuildingKind, Cell, Evaluation, TownState } from './types';

export type Tool = 'inspect' | 'road' | 'erase' | 'place' | 'move';
export interface SceneEvents { select(id: string | null): void; cell(x: number, z: number): void; hover(cell: Cell | null): void; strokeEnd(): void; cancel(): void; assetsReady?(): void; clock?(seconds:number,save:boolean):void; rendered?(time:number):void }
type Walker = { group: T.Group; body:T.Group; cargo:T.Group; seated?:T.Group; phase: number; limbs: T.Object3D[] };
const jobFishing=(id:string|undefined,board:Board)=>Boolean(id&&board.buildings.some(b=>b.kind==='fishinghut'&&id.startsWith(`village-${b.id}-`)));
type Particle = { mesh: T.Mesh; velocity: T.Vector3; life: number; duration: number };
const tempObject = new T.Object3D();

export class TownScene {
  readonly renderer: T.WebGLRenderer;
  private scene = new T.Scene();
  private camera = new T.OrthographicCamera(-16, 16, 12, -12, .1, 250);
  private controls: OrbitControls;
  private sun = new T.DirectionalLight('#fff2d6', 3.2);
  private ambient = new T.HemisphereLight('#dbe9eb', '#958c63', 1.9);
  private world = new T.Group(); private buildings = new T.Group(); private roadGroup = new T.Group(); private overlay = new T.Group(); private forest = new T.Group();
  private walkerBoard?: Board; private walkers: Walker[] = []; private traffic?: PedestrianTraffic; private particles: Particle[] = []; private smoke = new T.Group();
  private shoreHints=new T.Group();
  private extras = new T.Group(); private landings = new Map<string, number>(); private pulseUntil = 0;
  private modelCache = new Map<string, T.Group>(); private modelsLoading = new Set<string>(); private buildingMeshes = new Map<string, T.Group>();
  private sceneryModels = new Map<string,T.Group>();
  private life?:ResidentLife; private seasons=new SeasonPalette(); private clockTick=0; private clockSave=0; private snow?:T.Points;
  private porchLights:T.PointLight[]=[];
  private farms:FarmChain[]=[]; private music=new SeasonalMusic();
  private board?: Board; private state?: TownState; private evaluation?: Evaluation;
  private signature = ''; private roadsSignature = ''; private terrainSignature = ''; private selection: string | null = null;
  private raycaster = new T.Raycaster(); private pointer = new T.Vector2(); private plane = new T.Plane(new T.Vector3(0, 1, 0), 0);
  private pointerDown?: { x: number; y: number; button: number }; private painting = false; private lastCell?: Cell;
  private cursor = new T.Group(); private ghost?: T.Group; private cursorCell?: Cell;
  private previewKind: BuildingKind | null = null; private previewRotation = 0; private previewStage=0; private previewVariant=0;
  private tool: Tool = 'inspect'; private grid?: T.LineSegments; private lastTime = 0; private lastFrame = 0;
  private animateLandscape?: (time: number) => void; private orbitDirection = 0; private orbitSpeed = 0; private orbitStep = 0; private focusTarget?: T.Vector3; private initialFocus = true; private reduced = false;
  private pitchStep = 0; private panStep = new T.Vector2(); private zoomTarget = 1;
  private lastPointer?: { clientX: number; clientY: number }; private pointerInside = false;
  private thumbnails = new Map<string, string>(); private sounds?: AudioContext;
  private resizeObserver: ResizeObserver; private running = true; private paused = false;
  fps = 0; private frameCount = 0; private fpsTime = 0;
  constructor(private canvas: HTMLCanvasElement, private events: SceneEvents) {
    this.renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); this.renderer.shadowMap.enabled = true; this.renderer.shadowMap.type = T.PCFShadowMap;
    this.renderer.outputColorSpace = T.SRGBColorSpace; this.renderer.toneMapping = T.ACESFilmicToneMapping; this.renderer.toneMappingExposure = 1.06;
    this.scene.background = new T.Color('#d9e0ce'); this.scene.fog = new T.Fog('#d9e0ce', 80, 160);
    this.sun.position.set(-18, 28, 14); this.sun.castShadow = true; this.sun.shadow.mapSize.set(2048, 2048);
    Object.assign(this.sun.shadow.camera, { left: -24, right: 24, top: 24, bottom: -24, near: 1, far: 90 });
    this.sun.shadow.normalBias = .032; this.sun.shadow.bias = -.0004;
    this.scene.add(this.sun, this.ambient, this.world, this.buildings, this.roadGroup, this.overlay, this.forest, this.smoke, this.cursor, this.extras,this.shoreHints);
    this.camera.position.set(30, 29, 44);
    this.controls = new OrbitControls(this.camera, canvas); this.controls.target.set(9, 0, 17);
    this.controls.enableRotate = false; this.controls.enableDamping = true; this.controls.dampingFactor = .12;
    this.controls.enableZoom = false; // One wheel handler owns orbit, pan and pinch.
    this.controls.minPolarAngle = Math.PI / 2 - MAX_ELEVATION; this.controls.maxPolarAngle = Math.PI / 2 - MIN_ELEVATION;
    this.controls.minZoom = .52; this.controls.maxZoom = 3.2; this.controls.screenSpacePanning = false;
    this.controls.mouseButtons.LEFT = T.MOUSE.PAN; this.controls.mouseButtons.RIGHT = T.MOUSE.PAN;
    this.controls.update();
    this.resizeObserver = new ResizeObserver(() => this.resize()); this.resizeObserver.observe(canvas);
    canvas.addEventListener('contextmenu', e => { e.preventDefault(); if (this.tool !== 'inspect') this.events.cancel(); });
    canvas.addEventListener('pointerdown', e => this.down(e)); canvas.addEventListener('pointermove', e => this.move(e)); canvas.addEventListener('pointerup', e => this.up(e)); canvas.addEventListener('pointercancel', () => this.endStroke());
    canvas.addEventListener('wheel', e => this.wheel(e), { passive: false });
    canvas.addEventListener('pointerleave', () => { this.pointerInside = false; if (!this.painting) { this.cursor.visible = false; this.events.hover(null); } });
    document.addEventListener('visibilitychange', () => { this.paused = document.hidden; this.lastTime = performance.now(); if (this.paused) this.stopGesture(); });
    window.addEventListener('blur', () => this.stopGesture());
    canvas.addEventListener('webglcontextlost', e => { e.preventDefault(); this.running = false; document.getElementById('graphics-error')?.classList.remove('hidden'); });
    canvas.addEventListener('webglcontextrestored', () => { this.running = true; requestAnimationFrame(t => this.frame(t)); document.getElementById('graphics-error')?.classList.add('hidden'); });
    this.resize(); requestAnimationFrame(t => this.frame(t));
    void Promise.allSettled(['tree-0','pine','birch','rock','boulder','cart','hedge','fountain','stall'].map(async name => {const gltf=await new GLTFLoader().loadAsync(`./assets/town/curated/${name}.glb`);gltf.scene.traverse(o=>{if(o instanceof T.Mesh){o.castShadow=true;o.receiveShadow=true;}});this.sceneryModels.set(name,gltf.scene);})).then(()=>{if(this.board && this.state)this.buildTerrain();});
  }
  private resize(): void {
    const r = this.canvas.getBoundingClientRect(), a = r.width / Math.max(1, r.height), span = a < 1 ? 16 : 13;
    this.camera.left = -span * a; this.camera.right = span * a; this.camera.top = span; this.camera.bottom = -span; this.camera.updateProjectionMatrix(); this.renderer.setSize(r.width, r.height, false);
  }
  setTool(tool: Tool, kind: BuildingKind | null, rotation: number, stage = this.previewStage, variant = this.previewVariant): void {
    this.tool = tool; this.previewKind = kind; this.previewRotation = rotation;this.previewStage=stage;this.previewVariant=variant;
    this.canvas.dataset.previewRotation=String(rotation);
    this.clearTransient(this.shoreHints);
    if(kind==='fishinghut'&&this.state&&this.board){for(let x=0;x<this.board.size-1;x++)for(const [z,r]of [[13,0],[9,2]]){if(!canPlace(this.state,this.board,makeBuilding('shore-preview','fishinghut',x,z,r)))this.outline(this.shoreHints,x,z,2,2,'#77b4a2',.13);}}
    this.controls.mouseButtons.LEFT = tool === 'inspect' || tool === 'move' && !kind ? T.MOUSE.PAN : null;
    this.controls.mouseButtons.RIGHT = tool === 'inspect' ? T.MOUSE.PAN : null; this.controls.mouseButtons.MIDDLE = T.MOUSE.PAN;
    this.canvas.style.cursor = tool === 'inspect' ? 'grab' : 'crosshair';
    if (this.grid) this.grid.visible = tool !== 'inspect';
    if (this.ghost) { this.ghost.traverse(o => { if (o instanceof T.Mesh) (o.material as T.Material).dispose(); }); this.cursor.remove(this.ghost); this.ghost = undefined; }
    if (kind) {
      this.ghost = this.model(kind, variant, stage).clone(); this.ghost.traverse(o => { if (o instanceof T.Mesh) { o.material = (o.material as T.MeshStandardMaterial).clone(); Object.assign(o.material, { transparent: true, opacity: .82, depthWrite: true }); o.castShadow = false; } });
      this.cursor.add(this.ghost); this.ghost.rotation.y = -rotation * Math.PI / 2;
    }
    if (this.cursorCell) { this.showCursor(this.cursorCell); this.cursor.visible = kind !== null; }
    else if (kind && this.board) { const center = this.controls.target; this.cursorCell = { x: Math.max(0, Math.floor(center.x)), z: Math.max(0, Math.floor(center.z)) }; this.showCursor(this.cursorCell); this.cursor.visible = true; }
  }
  setPreviewValid(valid: boolean): void { this.cursor.traverse(o => { if (o instanceof T.Line) (o.material as T.LineBasicMaterial).color.set(valid ? '#467b57' : '#d86d55'); }); this.ghost?.traverse(o => { if (o instanceof T.Mesh) { const m = o.material as T.MeshStandardMaterial; m.emissive.set(valid ? '#16371e' : '#ae3020'); m.emissiveIntensity = valid ? .1 : .35; } }); }
  setWorld(state: TownState, board: Board, e: Evaluation): void {
    this.state = state; this.board = board; this.evaluation = e; this.reduced = state.settings.reducedMotion || matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.farms=board===state.town?farmChains(board,e,state.farm):[];
    const terrainSignature = `${board.size}:${board.terrain}:${state.chapterStars.map(v => v > 0).join()}`;
    if (terrainSignature !== this.terrainSignature) { this.terrainSignature = terrainSignature; this.buildTerrain(); }
    const signature = JSON.stringify(board.buildings) + state.chapterStars.join() + state.projects.map(p => `${p.id}:${stageForLevel(levelFor(p.tokens)).index}`).join();
    if (signature !== this.signature) {
      this.signature = signature; this.buildings.clear(); this.buildingMeshes.clear();this.porchLights=[];
      for (const b of board.buildings.filter(b => b.placed)) {
        const project = state.projects.find(p => p.id === b.projectId); const stage = project ? stageForLevel(levelFor(project.tokens)).index : 0;
        const model = this.model(b.kind, visualVariant(b,state), stage).clone(); const dims = dimensions(b);
        model.position.set(b.x + dims.w / 2, BUILDING_GROUND_Y, b.z + dims.d / 2); model.rotation.y = -b.rotation * Math.PI / 2; model.userData.buildingId = b.id;
        model.traverse(o => { o.userData.buildingId = b.id; }); this.buildings.add(model); this.buildingMeshes.set(b.id, model);
        if(b.kind==='house'&&this.porchLights.length<3){const light=new T.PointLight('#ffc47c',0,2.7,2);light.position.set(.52,.87,1.04);model.add(light);this.porchLights.push(light);}
      }
      this.seasons.install(this.buildings); this.buildExtras();
    }
    const roadSignature = state.mode+board.terrain+JSON.stringify(board.buildings.map(b=>[b.id,b.kind,b.x,b.z,b.rotation,b.placed]))+board.roads.join('|') + Array.from(e.connectedRoads).join('|');
    if (roadSignature !== this.roadsSignature) { this.roadsSignature = roadSignature; this.buildRoads(); this.buildWalkers(); }
    this.drawSelection();
    this.renderer.setPixelRatio(state.settings.quality === 'low' ? 1 : Math.min(Math.max(devicePixelRatio, state.settings.quality === 'high' ? 1.5 : 1.25), state.settings.quality === 'high' ? 2.5 : 2)); this.renderer.shadowMap.enabled = state.settings.quality !== 'low';
    if (this.initialFocus) { this.initialFocus = false; this.focus(board.terrain === 'valley' ? { x: 6, z: 17 } : { x: 6, z: 6 }); }
  }
  private model(kind: BuildingKind, variant: number, stage: number): T.Group {
    const name = `${kind}-${kind === 'workshop' ? `${stage}-${variant}` : variant}`;
    if (!this.modelCache.has(name)) this.modelCache.set(name, packModel(buildingModel(kind, variant, stage)));
    if (!this.modelsLoading.has(name)) {
      this.modelsLoading.add(name);
      const curated = null; // Placeable assets use our coherent original prefab library.
      new GLTFLoader().load(`./assets/town/${curated ? 'curated/'+curated : 'models/'+name}.glb`, gltf => {
        gltf.scene.traverse(o => { if (o instanceof T.Mesh) { o.castShadow = true; o.receiveShadow = true; } });
        this.thumbnails.delete(`${kind}-${variant}-${stage}`);
        this.modelCache.set(name, gltf.scene); this.signature = ''; if (this.state && this.board && this.evaluation) this.setWorld(this.state, this.board, this.evaluation);
        if(this.previewKind===kind&&this.previewStage===stage&&this.previewVariant===variant)this.setTool(this.tool,this.previewKind,this.previewRotation,stage,variant);
        this.events.assetsReady?.();
      }, undefined, () => { /* same original native prefab is a complete offline fallback */ });
    }
    return this.modelCache.get(name)!;
  }
  thumbnail(kind: BuildingKind, variant = 0, stage = 0): string {
    const name = `${kind}-${variant}-${stage}`; const cached = this.thumbnails.get(name); if (cached) return cached;
    const scene = new T.Scene(); scene.background = null; scene.add(new T.HemisphereLight('#fff5d9', '#7b805e', 3)); const sun = new T.DirectionalLight('#fff4df', 3); sun.position.set(-3, 6, 5); scene.add(sun);
    const model = this.model(kind, variant, stage).clone(); scene.add(model);
    const height = kind === 'mill' ? 3.8 : kind === 'clock' ? 4.2 : kind === 'workshop' && stage > 0 ? 3.6 : 2.4;
    const size = Math.max(CATALOG[kind].w, CATALOG[kind].d, height) * .7;
    const camera = new T.OrthographicCamera(-size, size, size, -size, .1, 40); camera.position.set(5, 5, 7); camera.lookAt(0, height * .42, 0);
    const resolution = 384;
    const target = new T.WebGLRenderTarget(resolution, resolution); target.samples = 4;
    const oldTarget = this.renderer.getRenderTarget(); this.renderer.setRenderTarget(target); this.renderer.setClearColor('#ffffff', 0); this.renderer.render(scene, camera);
    const pixels = new Uint8Array(resolution * resolution * 4); this.renderer.readRenderTargetPixels(target, 0, 0, resolution, resolution, pixels);
    this.renderer.setRenderTarget(oldTarget); target.dispose();
    const canvas = document.createElement('canvas'); canvas.width = resolution; canvas.height = resolution; const context = canvas.getContext('2d')!; const data = context.createImageData(resolution, resolution);
    for (let y = 0; y < resolution; y++) data.data.set(pixels.subarray((resolution - 1 - y) * resolution * 4, (resolution - y) * resolution * 4), y * resolution * 4);
    context.putImageData(data, 0, 0); const url = canvas.toDataURL(); this.thumbnails.set(name, url); return url;
  }
  private buildTerrain(): void {
    const board = this.board!, n = board.size;
    this.clearTransient(this.world); this.clearTransient(this.forest);
    const terrain = landscape(board, this.state!,this.sceneryModels); this.world.add(terrain.world); this.forest.add(terrain.forest); this.animateLandscape = terrain.update;
    this.seasons.install(this.world); this.seasons.install(this.forest);
    if(this.snow){this.scene.remove(this.snow);this.snow.geometry.dispose();(this.snow.material as T.Material).dispose();}
    const flakes:number[]=[];for(let i=0;i<160;i++)flakes.push((i*7.319)%n,(i*1.771)%8,(i*11.931)%n);
    this.snow=new T.Points(new T.BufferGeometry().setAttribute('position',new T.Float32BufferAttribute(flakes,3)),new T.PointsMaterial({color:'#e6edf1',size:.045,transparent:true,opacity:0,depthWrite:false}));this.scene.add(this.snow);
    const vertices: number[] = [];
    for (let z = 0; z <= n; z++) vertices.push(0, .037, z, n, .037, z);
    for (let x = 0; x <= n; x++) vertices.push(x, .037, 0, x, .037, n);
    this.grid = new T.LineSegments(new T.BufferGeometry().setAttribute('position', new T.Float32BufferAttribute(vertices, 3)), new T.LineBasicMaterial({ color: '#536c51', transparent: true, opacity: .16 })); this.grid.visible = this.tool !== 'inspect'; this.world.add(this.grid);
  }
  private buildRoads(): void {
    this.clearTransient(this.roadGroup); this.roadGroup.add(stoneRoads(this.board!,this.evaluation!));
  }
  private buildWalkers(): void {
    const connected = this.evaluation!.connectedRoads;
    const seats:ResidentSeat[]=[];
    for(const b of this.board!.buildings.filter(b=>b.placed&&this.evaluation!.buildings[b.id]?.connected))for(const [seatIndex, anchor] of buildingSeats(b.kind).entries()){const model=this.buildingMeshes.get(b.id)!;model.updateMatrixWorld(true);const p=model.localToWorld(new T.Vector3(...anchor.position)),entry=entrance(b);seats.push({id:`${b.id}:${seatIndex}`,position:{x:p.x,z:p.z},via:{x:entry.x+.5,z:entry.z+.5},y:p.y,yaw:model.rotation.y+anchor.yaw});}
    const requested=Math.min(12,Math.max(2,this.evaluation!.houses*2)),homes=this.board!.buildings.filter(b=>b.placed&&b.kind==='house'&&this.evaluation!.buildings[b.id]?.connected).map(homeForBuilding);
    if(!homes.length)homes.push(homeForBuilding(this.board!.buildings.find(b=>b.placed&&b.kind==='hall')!));
    if (this.traffic && this.walkerBoard === this.board) { this.traffic.retarget(connected); this.life!.retarget(homes, seats); return; }
    for (const w of this.walkers) { this.scene.remove(w.group); this.clearTransient(w.group); }
    this.walkers = []; this.traffic = undefined; this.life = undefined; this.walkerBoard = this.board;
    if (connected.size < 2) return;
    this.traffic = new PedestrianTraffic(connected, requested+Math.min(seats.length,3));
    const seatMap=new Map<number,ResidentSeat>();seats.slice(0,Math.min(seats.length,3,this.traffic.people.length-2)).forEach((seat,i)=>seatMap.set(this.traffic!.people.length-1-i,seat));
    this.life=new ResidentLife(this.traffic,homes,worldTime(this.state!.worldSeconds,this.state!.settings).sleep,seatMap);
    for (const [i, person] of this.traffic.people.entries()) {
      const body = residentModel(['#748b9c', '#bb976a', '#ba8174', '#819373', '#ac9ab4'][i % 5], i),group=new T.Group();group.add(body);
      const surface = walkSurface(this.board!.buildings, person);
      group.position.set(surface.x, surface.y, surface.z); group.rotation.y = person.angle; this.scene.add(group);
      const limbs = ['leg-left', 'leg-right', 'arm-left', 'arm-right'].map(name => body.getObjectByName(name)!);
      const rod=new T.Group();rod.name='fishing-rod';rod.visible=false;group.add(rod);rod.position.set(.12,.33,.16);box(rod,0,.48,0,.015,.95,.015,'#987751');rod.rotation.x=0;const line=new T.Line(new T.BufferGeometry().setFromPoints([new T.Vector3(0,.94,0),new T.Vector3(.16,-.68,.75)]),new T.LineBasicMaterial({color:'#e1d9ba'}));rod.add(line);box(rod,.16,-.68,.75,.045,.06,.045,'#c68f75');
      const cargo=new T.Group();cargo.visible=false;group.add(cargo);box(cargo,0,.26,.16,.18,.18,.13,'#ceb981');box(cargo,0,.36,.16,.13,.05,.11,'#e0d1ae');
      let seated:T.Group|undefined;if(seatMap.has(i)){seated=packModel(residentModel('#a28273',i,true));group.add(seated);}this.walkers.push({ group,body,cargo,seated, phase: person.phase, limbs });
    }
  }
  select(id: string | null): void { this.selection = id; this.drawSelection(); }
  private drawSelection(): void {
    this.clearTransient(this.overlay); if (!this.board || !this.evaluation) return;
    const b = this.board.buildings.find(b => b.id === this.selection && b.placed); if (!b) return;
    const { w, d } = dimensions(b); this.outline(this.overlay, b.x, b.z, w, d, '#376844', .22, -.035);
    const p = entrance(b); this.outline(this.overlay, p.x, p.z, 1, 1, this.evaluation.buildings[b.id]?.connected ? '#5e9070' : '#bf805c', .13);
    const definition = CATALOG[b.kind];
    if (definition.service || b.kind === 'park') {
      const coverage = buildingCoverage(this.board, this.evaluation, b);
      if (coverage.cells.length) {
        const color = b.kind === 'park' ? '#82b659' : definition.service === 'food' ? '#edce87' : '#81bcb3';
        const squares = new T.InstancedMesh(new T.PlaneGeometry(.88, .88), new T.MeshBasicMaterial({ color, transparent: true, opacity: .38, depthWrite: false }), coverage.cells.length);
        coverage.cells.forEach((c, i) => { tempObject.position.set(c.x + .5, .14, c.z + .5); tempObject.rotation.set(-Math.PI / 2, 0, 0); tempObject.updateMatrix(); squares.setMatrixAt(i, tempObject.matrix); });
        tempObject.rotation.set(0, 0, 0); this.overlay.add(squares);
      }
      const served = new Set(coverage.homes.filter(h => h.served).map(h => h.home.id));
      for (const home of this.board.buildings.filter(h => h.placed && h.kind === 'house')) {
        const status = this.evaluation.buildings[home.id], dims = dimensions(home);
        const met = b.kind === 'park' ? status?.green : status?.[definition.service!];
        if (served.has(home.id) || !met) this.outline(this.overlay, home.x, home.z, dims.w, dims.d, served.has(home.id) ? '#376844' : '#c47c42', .23, -.035);
      }
    }
  }
  private outline(parent: T.Group, x: number, z: number, w: number, d: number, color: string, y = .08, inset = .05): void {
    const points = [new T.Vector3(x + inset, y, z + inset), new T.Vector3(x + w - inset, y, z + inset), new T.Vector3(x + w - inset, y, z + d - inset), new T.Vector3(x + inset, y, z + d - inset)];
    parent.add(new T.LineLoop(new T.BufferGeometry().setFromPoints(points), new T.LineBasicMaterial({ color })));
  }
  private point(e: Pick<PointerEvent, 'clientX' | 'clientY'>): Cell | null {
    const r = this.canvas.getBoundingClientRect(); this.pointer.set((e.clientX - r.left) / r.width * 2 - 1, -(e.clientY - r.top) / r.height * 2 + 1); this.raycaster.setFromCamera(this.pointer, this.camera);
    const p = new T.Vector3(); if (!this.raycaster.ray.intersectPlane(this.plane, p)) return null;
    const x = Math.floor(p.x), z = Math.floor(p.z); return this.board && x >= 0 && z >= 0 && x < this.board.size && z < this.board.size ? { x, z } : null;
  }
  previewAt(clientX: number, clientY: number): void {
    this.lastPointer = { clientX, clientY }; const r = this.canvas.getBoundingClientRect();
    this.pointerInside = clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom;
    const p = this.point({ clientX, clientY }); this.cursor.visible = Boolean(p);
    this.canvas.dataset.previewCell = p ? `${p.x},${p.z}` : '';
    if (p) { if (p.x !== this.cursorCell?.x || p.z !== this.cursorCell?.z) { this.cursorCell = p; this.showCursor(p); } this.events.hover(p); }
  }
  placeAt(clientX: number, clientY: number): void { const p = this.point({ clientX, clientY }); if (p) this.events.cell(p.x, p.z); }
  private down(e: PointerEvent): void {
    this.focusTarget = undefined;
    this.pointerDown = { x: e.clientX, y: e.clientY, button: e.button };
    if (e.button !== 0 || e.shiftKey) return;
    if (this.tool === 'road' || this.tool === 'erase') { this.painting = true; this.canvas.setPointerCapture(e.pointerId); const p = this.point(e); if (p) { this.events.cell(p.x, p.z); this.lastCell = p; } }
  }
  private move(e: PointerEvent): void {
    this.lastPointer = { clientX: e.clientX, clientY: e.clientY }; this.pointerInside = true;
    const p = this.point(e); this.cursor.visible = Boolean(p) && this.tool !== 'inspect' && !(this.tool === 'move' && !this.previewKind);
    if (p) { this.cursorCell = p; this.showCursor(p); }
    this.events.hover(p);
    if (this.painting && p && this.lastCell && (p.x !== this.lastCell.x || p.z !== this.lastCell.z)) {
      let x = this.lastCell.x, z = this.lastCell.z;
      while (x !== p.x) { x += Math.sign(p.x - x); this.events.cell(x, z); }
      while (z !== p.z) { z += Math.sign(p.z - z); this.events.cell(x, z); }
      this.lastCell = p;
    }
  }
  private up(e: PointerEvent): void {
    if (this.painting) { this.endStroke(); return; }
    const down = this.pointerDown; this.pointerDown = undefined;
    if (!down || down.button !== 0 || Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) return;
    if (this.tool === 'place' || this.tool === 'move' && this.previewKind) { const p = this.point(e); if (p) this.events.cell(p.x, p.z); }
    else {
      this.point(e); const hit = this.raycaster.intersectObjects(this.buildings.children, true).find(h => h.object.userData.buildingId); this.events.select(hit?.object.userData.buildingId || null);
    }
  }
  private endStroke(): void { if (this.painting) this.events.strokeEnd(); this.painting = false; this.pointerDown = undefined; this.lastCell = undefined; }
  private showCursor(p: Cell): void {
    for (const child of this.cursor.children.filter(c => c !== this.ghost)) { this.cursor.remove(child); if (child instanceof T.Line) { child.geometry.dispose(); (child.material as T.Material).dispose(); } }
    const dims = this.previewKind ? dimensions({ kind: this.previewKind, rotation: this.previewRotation }) : { w: 1, d: 1 };
    this.cursor.position.set(p.x, .03, p.z); this.outline(this.cursor, 0, 0, dims.w, dims.d, '#4e805e', .1);
    if (this.ghost && this.previewKind) { this.ghost.position.set(dims.w / 2, .03, dims.d / 2); const entry = entrance(makeBuilding('preview', this.previewKind, 0, 0, this.previewRotation)); this.outline(this.cursor, entry.x, entry.z, 1, 1, '#a4874f', .11); }
  }
  focus(p?: Cell): void {
    const c = p || (this.board?.terrain === 'valley' ? { x: 6, z: 17 } : { x: 6, z: 6 }); this.focusTarget = new T.Vector3(c.x, 0, c.z);
    this.zoomTarget = this.board?.terrain !== 'valley' ? 1.15 : 1.45;
    this.pitchStep = DEFAULT_ELEVATION - this.elevation(); this.orbitStep = 0; this.panStep.set(0, 0);
  }
  overview(): void { if (!this.board) return; this.focusTarget = new T.Vector3(this.board.size / 2, 0, this.board.size / 2); this.zoomTarget = this.camera.right / this.camera.top < 1 ? .66 : .92; this.pitchStep = DEFAULT_ELEVATION - this.elevation(); this.orbitStep = 0; this.panStep.set(0, 0); }
  rotate(direction: number): void {
    // A keyboard/screen-reader click gets a small smooth nudge, never a fixed view.
    this.orbitStep += direction * .16;
  }
  holdRotate(direction: number): void { this.orbitDirection = direction; this.orbitStep = 0; if (!direction) this.orbitSpeed = 0; }
  private keyboardMove = new T.Vector2();
  private keyboardApplied=false;
  holdPan(x: number, y: number): void {
    // Very short taps between animation frames still give a small precise move.
    if(!x&&!y&&this.keyboardMove.lengthSq()&&!this.keyboardApplied)this.panKeyboard(keyboardPanDistance(1/120,this.camera.zoom));
    if(this.keyboardMove.x!==x||this.keyboardMove.y!==y)this.keyboardApplied=false;
    this.keyboardMove.set(x, y); if (x || y) this.focusTarget = undefined;
  }
  private panKeyboard(distance:number):void {
    const right=new T.Vector3().setFromMatrixColumn(this.camera.matrix,0);right.y=0;right.normalize();
    const forward=new T.Vector3().crossVectors(this.camera.up,right).normalize(),delta=right.multiplyScalar(this.keyboardMove.x).addScaledVector(forward,this.keyboardMove.y).multiplyScalar(distance);
    this.controls.target.add(delta);this.camera.position.add(delta);this.keyboardApplied=true;
  }
  zoom(factor: number): void { this.zoomTarget = clampZoom(this.zoomTarget * factor); }
  private elevation(): number { const offset = this.camera.position.clone().sub(this.controls.target); return Math.atan2(offset.y, Math.hypot(offset.x, offset.z)); }
  private stopGesture(): void { this.orbitStep = 0; this.pitchStep = 0; this.panStep.set(0, 0); this.zoomTarget = this.camera.zoom; }
  private wheel(e: WheelEvent): void {
    e.preventDefault(); if (this.painting) return;
    this.lastPointer = { clientX: e.clientX, clientY: e.clientY }; this.pointerInside = true; this.focusTarget = undefined;
    const gesture = wheelGesture(e, this.state?.settings.cameraInput || 'trackpad', this.canvas.clientHeight);
    if (gesture.kind === 'zoom') this.zoom(Math.exp(gesture.y));
    else if (gesture.kind === 'pan') this.panStep.add(new T.Vector2(gesture.x, gesture.y));
    else {
      this.orbitStep = T.MathUtils.clamp(this.orbitStep + gesture.x, -.6, .6);
      this.pitchStep = clampElevation(this.elevation() + this.pitchStep + gesture.y) - this.elevation();
    }
  }
  private environment(dt:number,time:number):void {
    if(!this.state)return;const s=this.state;if(s.settings.clockMode==='cycle')s.worldSeconds+=dt;
    const clock=worldTime(s.worldSeconds,s.settings),blend=1-Math.exp(-dt*2);
    this.music.update(clock.season,s.settings,dt);
    this.sun.color.lerp(new T.Color('#9fb9d2').lerp(new T.Color('#fff2d6'),clock.daylight).lerp(new T.Color('#ffb879'),clock.warmth*.65),blend);
    this.sun.intensity+=(.62+clock.daylight*2.88-this.sun.intensity)*blend;this.ambient.intensity+=(.75+clock.daylight*1.15-this.ambient.intensity)*blend;
    this.ambient.color.lerp(new T.Color('#91add3').lerp(new T.Color('#dbe9eb'),clock.daylight),blend);this.ambient.groundColor.lerp(new T.Color('#344358').lerp(new T.Color('#958c63'),clock.daylight),blend);
    this.porchLights.forEach(light=>{light.intensity+=(2.4*(1-clock.daylight)-light.intensity)*blend;});
    document.getElementById('town-ui')?.classList.toggle('night',clock.daylight<.35);
    const color=new T.Color('#34465d').lerp(new T.Color('#d9e0ce'),clock.daylight).lerp(new T.Color('#d8b49a'),clock.warmth*.35);
    (this.scene.background as T.Color).lerp(color,blend);(this.scene.fog as T.Fog).color.copy(this.scene.background as T.Color);
    this.seasons.update(clock.season,dt);
    if(this.snow){this.snow.visible=this.seasons.snow>.02&&!this.reduced;const m=this.snow.material as T.PointsMaterial;m.opacity=this.seasons.snow*.7;const pos=this.snow.geometry.getAttribute('position');for(let i=0;i<pos.count;i++){pos.setY(i,(pos.getY(i)-dt*.35+8)%8);}pos.needsUpdate=true;}
    const ready=new Set<string>();
    for(const [i,job]of this.life?.jobs||[]){const p=this.traffic!.people[i],r=this.life!.residents[i];if(r.mode==='working'&&!r.path.length&&Math.hypot(p.x-job.target.x,p.z-job.target.z)<.15)ready.add(job.fieldId);}
    const farmJobs=tickFarm(this.farms,s.farm,dt,clock.sleep,clock.season,ready);
    const villageJobs=this.board===s.town?tickVillage(s,this.evaluation!,dt,clock.sleep,clock.season,ready):[];
    const jobs=scheduledJobs(farmJobs,villageJobs);
    this.life?.assignJobs(jobs,(from,to)=>{const roads=this.evaluation!.connectedRoads;if(!roads.size)return [];const start=[...roads].map(k=>{const [x,z]=k.split(',').map(Number);return{x:x+.5,z:z+.5};}).sort((a,b)=>Math.hypot(a.x-from.x,a.z-from.z)-Math.hypot(b.x-from.x,b.z-from.z))[0];return roadRoute(roads,start,to);});
    const celebration=s.village.celebration>0;
    const places=this.board!.buildings.filter(b=>b.placed&&this.evaluation!.buildings[b.id]?.connected&&(CATALOG[b.kind].service||b.kind==='park')).map(b=>{const p=entrance(b),d=dimensions(b),position={x:p.x+.5,z:p.z+.5},dx=b.x+d.w/2-position.x,dz=b.z+d.d/2-position.z,l=Math.hypot(dx,dz);return{id:b.id,position,target:{x:position.x+dx/l*.48,z:position.z+dz/l*.48}};});
    if(celebration){const hall=this.board!.buildings.find(b=>b.kind==='hall')!,p=entrance(hall),d=dimensions(hall),position={x:p.x+.5,z:p.z+.5},dx=hall.x+d.w/2-position.x,dz=hall.z+d.d/2-position.z,l=Math.hypot(dx,dz);for(let i=0;i<3;i++)places.push({id:`festival-${i}`,position,target:{x:position.x+dx/l*.45-dz/l*(i-1)*.65,z:position.z+dz/l*.45+dx/l*(i-1)*.65}});}
    this.life?.setPlaces(places,this.evaluation!.connectedRoads);
    this.life?.update(dt,clock.sleep);
    for(const chain of this.farms){const run=s.farm.runs[chain.field.id],crop=this.buildingMeshes.get(chain.field.id)?.getObjectByName('crop-patch');if(crop){const growth=run?.phase==='growing'?Math.min(1,run.elapsed/farmDuration(chain,'growing',clock.season)):run?.phase==='sowing'?.12:run?.phase==='harvesting'?1:.06;crop.scale.y=.12+growth*.88;}if(chain.mill){const fan=this.buildingMeshes.get(chain.mill.id)?.getObjectByName('mill-fan');if(fan&&!this.reduced)fan.rotation.z+=dt*(run?.phase==='milling'&&!clock.sleep?1.2:.13);}}
    for(const b of this.board!.buildings.filter(b=>b.placed&&PRODUCTION_KINDS.includes(b.kind))){
      const model=this.buildingMeshes.get(b.id)!,run=stationRun(s.village,b);
      for(const name of ['cow-0','cow-1','pig-0','pig-1']){const animal=model.getObjectByName(name);if(animal&&!this.reduced){animal.rotation.y=Math.sin(time*.00025+b.x+name.length)*.18;animal.position.y=.15+Math.sin(time*.0015+b.z)*.008;}}
      const crops=model.getObjectByName('vegetable-crops');if(crops)crops.scale.y=.2+Math.min(1,run.elapsed/productionDuration(b,run.choice,clock.season))*.8;
    }
    for(const door of this.life?.doors||[]){const hinge=this.buildingMeshes.get(door.id)?.getObjectByName('door-hinge');if(hinge)hinge.rotation.y=-door.open*Math.PI*.46;}
    for(const [index,w]of this.walkers.entries()){
      const person=this.traffic!.people[index],r=this.life!.residents[index],pose=walkingPose(r.travelled,w.phase,!this.reduced&&r.travelled>.0001);w.phase=pose.phase;
      w.group.visible=r.visible;w.body.visible=!r.seated;if(w.seated)w.seated.visible=r.seated;
      const surface=walkSurface(this.board!.buildings,person);
      let height=surface.y+pose.bob;const h=this.life!.doors[r.home];if(h&&['entering','leaving','opening-out'].includes(r.mode))height+=.12*Math.min(1,Math.hypot(person.x-h.outside.x,person.z-h.outside.z)/.50);
      w.group.position.set(r.seated?person.x:surface.x,r.seated?r.seat!.y:height,r.seated?person.z:surface.z);w.group.rotation.y=person.angle;
      const job=this.life!.jobs.get(index),working=r.mode==='working';const rod=w.group.getObjectByName('fishing-rod')!;rod.visible=working&&job?.phase==='harvesting'&&jobFishing(job?.fieldId,this.board!)&&!r.path.length;if(rod.visible&&!this.reduced)rod.rotation.x=Math.sin(time*.002)*.035;w.cargo.visible=working&&Boolean(job?.carrying);w.cargo.children.forEach(o=>{if(o instanceof T.Mesh)o.material=material(job?.carrying==='flour'?'#e9dfc1':job?.carrying==='fish'?'#87b8b2':job?.carrying==='carrot'?'#cb925d':job?.carrying==='milk'?'#ebe3cb':'#c8a769');});
      w.limbs.forEach((limb,i)=>{const target=i>=2&&working&&job?.carrying?-.85:i>=2&&working&&job?.harvesting&&!r.path.length&&!this.reduced?-.45+Math.sin(time*.004+index)*.3:(i<2?pose.leg:pose.arm)*(i%2?-1:1);limb.rotation.x+=(target-limb.rotation.x)*(1-Math.exp(-dt*16));});
    }
    if(time-this.clockTick>1000){this.clockTick=time;const save=time-this.clockSave>20000;if(save)this.clockSave=time;this.events.clock?.(s.worldSeconds,save);const label=document.getElementById('world-clock');if(label)label.textContent=clock.label;this.updateFarmLabels(clock.sleep);}
    this.canvas.dataset.village=JSON.stringify(s.village);this.canvas.dataset.workers=JSON.stringify([...(this.life?.jobs.entries()||[])].map(([i,j])=>({resident:i,id:j.fieldId,target:j.target,path:this.life!.residents[i].path.length,mode:this.life!.residents[i].mode})));
    this.canvas.dataset.worldHour=clock.hour.toFixed(2);this.canvas.dataset.season=clock.season;this.canvas.dataset.residentActivities=JSON.stringify(this.life?.residents.map(r=>r.mode)||[]);this.canvas.dataset.doorAngles=JSON.stringify(this.life?.doors.map(h=>({id:h.id,open:+h.open.toFixed(2)}))||[]);
    this.canvas.dataset.farm=JSON.stringify(s.farm);this.canvas.dataset.residents=JSON.stringify(this.traffic?.people.map((p,i)=>({id:i,x:+p.x.toFixed(3),z:+p.z.toFixed(3),y:+this.walkers[i].group.position.y.toFixed(3),travelled:+p.totalTravelled.toFixed(3)}))||[]);
  }
  private updateFarmLabels(sleep:boolean):void {
    if(!this.state)return;for(const good of ['wheat','flour','bread'] as const)document.querySelectorAll(`[data-farm-stock="${good}"]`).forEach(el=>el.textContent=String(this.state!.farm[good]));
    for(const chain of this.farms){const run=this.state.farm.runs[chain.field.id];document.querySelectorAll('[data-farm-field]').forEach(el=>{if((el as HTMLElement).dataset.farmField===chain.field.id)el.textContent=chain.problem|| (sleep?'邻居休息中 · 清晨继续':run?FARM_LABELS[run.phase]:'准备播种');});}
    document.querySelectorAll<HTMLElement>('[data-village-station]').forEach(el=>{const b=this.state!.town.buildings.find(b=>b.id===el.dataset.villageStation);if(b){const label=productionLabel(this.state!,this.evaluation!,b,worldTime(this.state!.worldSeconds,this.state!.settings).season,sleep),worker=[...(this.life?.jobs.entries()||[])].find(([,j])=>j.fieldId.startsWith(`village-${b.id}-`));el.textContent=!sleep&&!label.includes('缺少')&&!label.includes('暂停')&&!label.includes('冬季')?(worker?this.life!.residents[worker[0]].path.length?'邻居正在前往 · '+label:label:'等待空闲邻居 · '+label):label;}});
    document.querySelectorAll<HTMLElement>('[data-village-stock]').forEach(el=>{const [id,good]=el.dataset.villageStock!.split('|');el.textContent=String((this.state!.village.stock[id] as any)?.[good]||0);});
    document.querySelectorAll<HTMLElement>('[data-order-stock]').forEach(el=>{const available=availableGoods(this.state!,this.evaluation!);el.textContent=String(available[el.dataset.orderStock as Good]||0);});
    document.querySelectorAll<HTMLElement>('[data-order-status]').forEach(el=>{el.textContent=orderStatus(this.state!,this.evaluation!,el.dataset.orderStatus!,worldTime(this.state!.worldSeconds,this.state!.settings).season)||'材料齐了，可以邀请邻居分享！';});
    document.querySelectorAll<HTMLElement>('[data-bakery-material]').forEach(el=>{
      const id=el.dataset.bakeryMaterial!,worker=[...(this.life?.jobs.entries()||[])].find(([,j])=>j.phase==='baking'&&this.farms.some(c=>c.field.id===j.fieldId&&c.bakery?.id===id));
      const label=bakeryMaterialLabel(id,this.farms,this.state!.farm,sleep);
      el.textContent=!sleep&&label.startsWith('烘焙中')&&(!worker||this.life!.residents[worker[0]].path.length)?'等待邻居到炉边 · 烘焙耗时 3 秒':label;
    });
  }
  // Position freshly rendered HUD bubbles before their first paint as well as during camera motion.
  positionHomeBubbles(root: ParentNode = document): void {
    this.camera.updateMatrixWorld();
    root.querySelectorAll<HTMLElement>('[data-home-need]').forEach(el => {
      const b = this.board?.buildings.find(b => b.id === el.dataset.homeNeed);
      if (!b?.placed) { el.style.visibility = 'hidden'; return; }
      const d = dimensions(b), p = new T.Vector3(b.x + d.w / 2, 2.5, b.z + d.d / 2).project(this.camera);
      const x = (p.x + 1) * this.canvas.clientWidth / 2, y = (1 - p.y) * this.canvas.clientHeight / 2;
      el.style.transform = `translate(${x}px,${y}px) translate(-50%,-100%)`;
      el.style.visibility = p.z > 1 || x < 10 || x > this.canvas.clientWidth - 10 || y < 90 || y > this.canvas.clientHeight - 100 ? 'hidden' : 'visible';
    });
  }
  celebrate(type: 'coin' | 'building' | 'chapter', cell?: Cell): void {
    if (!this.board || this.reduced) return;
    const hall = this.board.buildings.find(b => b.kind === 'hall')!; const p = cell || { x: hall.x + 1.5, z: hall.z + 1.5 };
    if (type === 'coin') this.pulseUntil = performance.now() + 2200;
    if (type === 'building' && cell) for (const b of this.board.buildings.filter(b => b.placed && b.x === Math.floor(cell.x) && b.z === Math.floor(cell.z))) this.landings.set(b.id, performance.now());
    if (type === 'chapter') this.zoom(.88);
    for (let i = 0; i < (type === 'chapter' ? 50 : type === 'coin' ? 24 : 14); i++) {
      const geometry = type === 'coin' ? new T.CylinderGeometry(.09, .09, .04, 8) : new T.BoxGeometry(.065, .065, .065);
      const mesh = new T.Mesh(geometry, material(type === 'coin' ? '#e7be59' : type === 'chapter' ? ['#ddbc77', '#8ca579', '#b98973'][i % 3] : '#c7bd9c')); mesh.position.set(p.x + (Math.random() - .5) * 1.5, type === 'coin' ? 3.5 + Math.random() * 2 : .3, p.z + (Math.random() - .5)); mesh.castShadow = true; this.scene.add(mesh);
      this.particles.push({ mesh, velocity: new T.Vector3((Math.random() - .5) * 1.5, type === 'coin' ? -.8 : 1 + Math.random() * 3, (Math.random() - .5) * 1.5), life: 0, duration: 1.7 + Math.random() * .7 });
    }
    this.sound(type === 'coin' ? 740 : 520);
  }
  sound(frequency: number): void {
    if (this.state?.settings.muted) return;
    try { this.sounds ||= new AudioContext(); void this.sounds.resume(); const oscillator = this.sounds.createOscillator(), gain = this.sounds.createGain(); oscillator.type = 'sine'; oscillator.frequency.setValueAtTime(frequency, this.sounds.currentTime); gain.gain.setValueAtTime(.035, this.sounds.currentTime); gain.gain.exponentialRampToValueAtTime(.0001, this.sounds.currentTime + .25); oscillator.connect(gain).connect(this.sounds.destination); oscillator.start(); oscillator.stop(this.sounds.currentTime + .26); } catch { /* audio optional */ }
  }
  private frame(time: number): void {
    if (!this.running) return; requestAnimationFrame(t => this.frame(t)); if (this.paused || time - this.lastFrame < 1000 / (this.state?.settings.quality === 'low' ? 30 : 60) - 1) return;
    const dt = Math.min(.06, (time - (this.lastTime || time)) / 1000); this.lastTime = time; this.lastFrame = time;
    this.environment(dt,time);
    const oldPosition = this.camera.position.clone(), oldTarget = this.controls.target.clone(), oldZoom = this.camera.zoom;
    const smooth = smoothFraction(dt, this.reduced);
    if (this.keyboardMove.lengthSq()) {
      this.panKeyboard(keyboardPanDistance(dt,this.camera.zoom));
    }
    if (this.focusTarget) { const delta = this.focusTarget.clone().sub(this.controls.target).multiplyScalar(smoothFraction(dt, this.reduced, 10)); this.controls.target.add(delta); this.camera.position.add(delta); if (this.focusTarget.distanceToSquared(this.controls.target) < .00000025) this.focusTarget = undefined; }
    if (this.orbitDirection) this.orbitSpeed = T.MathUtils.lerp(this.orbitSpeed, this.orbitDirection * .85, 1 - Math.exp(-dt * 12));
    let angle = this.orbitSpeed * dt;
    if (Math.abs(this.orbitStep) > .00001) { const step = this.orbitStep * smooth; this.orbitStep -= step; angle += step; } else this.orbitStep = 0;
    const pitch = Math.abs(this.pitchStep) > .00001 ? this.pitchStep * smooth : this.pitchStep; this.pitchStep -= pitch;
    if (angle || pitch) { const offset = this.camera.position.clone().sub(this.controls.target); const elevation = clampElevation(this.elevation() + pitch); const spherical = new T.Spherical(offset.length(), Math.PI / 2 - elevation, Math.atan2(offset.x, offset.z) + angle); this.camera.position.copy(this.controls.target).add(offset.setFromSpherical(spherical)); }
    if (this.panStep.lengthSq() > .0001) {
      const pan = this.panStep.clone().multiplyScalar(smooth); this.panStep.sub(pan);
      const right = new T.Vector3().setFromMatrixColumn(this.camera.matrix, 0), forward = new T.Vector3().crossVectors(this.camera.up, right);
      const delta = right.multiplyScalar(-pan.x * (this.camera.right - this.camera.left) / this.camera.zoom / this.canvas.clientWidth).addScaledVector(forward, pan.y * (this.camera.top - this.camera.bottom) / this.camera.zoom / this.canvas.clientHeight);
      this.controls.target.add(delta); this.camera.position.add(delta);
    } else this.panStep.set(0, 0);
    if (Math.abs(Math.log(this.zoomTarget / this.camera.zoom)) > .00001) this.camera.zoom *= Math.exp(Math.log(this.zoomTarget / this.camera.zoom) * smooth); else this.camera.zoom = this.zoomTarget;
    if (oldZoom !== this.camera.zoom) this.camera.updateProjectionMatrix();
    this.controls.dampingFactor = smoothFraction(dt, this.reduced, 12);
    this.controls.update();
    this.camera.updateMatrixWorld();
    if (this.previewKind && this.pointerInside && this.lastPointer && (oldPosition.distanceToSquared(this.camera.position) > .00000001 || oldTarget.distanceToSquared(this.controls.target) > .00000001 || oldZoom !== this.camera.zoom)) this.previewAt(this.lastPointer.clientX, this.lastPointer.clientY);
    if (!this.reduced) {
      for (const b of this.board?.buildings || []) {
        const mesh = this.buildingMeshes.get(b.id); if (!mesh) continue;
        if (b.kind === 'tree') mesh.rotation.z = Math.sin(time * .0008 + b.x) * .012;
        if (b.kind === 'workshop') mesh.scale.setScalar(time < this.pulseUntil ? 1 + Math.sin((this.pulseUntil - time) * .012) * .025 : 1);
        const start = this.landings.get(b.id); if (start !== undefined) { const t = Math.min(1, (time - start) / 550); mesh.position.y = .04 + .4 * (1 - t) ** 2; mesh.scale.y = 1 - .08 * Math.sin(t * Math.PI); if (t === 1) { this.landings.delete(b.id); mesh.scale.y = 1; } }
      }
      this.animateLandscape?.(time);
      for (const p of this.particles) { p.life += dt; p.velocity.y -= dt * 2.4; p.mesh.position.addScaledVector(p.velocity, dt); p.mesh.rotation.x += dt * 3; p.mesh.rotation.z += dt * 2; p.mesh.scale.setScalar(Math.max(0, 1 - Math.max(0, p.life / p.duration - .6) * 2.5)); }
      this.particles = this.particles.filter(p => { if (p.life < p.duration && p.mesh.position.y > -.1) return true; this.scene.remove(p.mesh); p.mesh.geometry.dispose(); return false; });
      if (Math.random() < dt * 2 && this.board) {
        for(const kitchen of this.board.buildings.filter(b=>b.placed&&['bakery','restaurant'].includes(b.kind))){ const pos = this.buildingMeshes.get(kitchen.id)!.localToWorld(kitchen.kind==='bakery'?new T.Vector3(-.52, 2.16, -.44):new T.Vector3(.92,2.21,-.94)); const puff = new T.Mesh(new T.IcosahedronGeometry(.06, 0), new T.MeshBasicMaterial({ color: '#e7e7d6', transparent: true, opacity: .45, depthWrite: false })); puff.position.copy(pos); this.smoke.add(puff); puff.userData.life = 0; }
      }
      for (const puff of [...this.smoke.children] as T.Mesh[]) { puff.userData.life += dt; puff.position.y += dt * .26; puff.position.x += dt * .12; puff.scale.setScalar(1 + puff.userData.life * .6); (puff.material as T.MeshBasicMaterial).opacity = Math.max(0, .45 - puff.userData.life * .14); if (puff.userData.life > 3.2) { this.smoke.remove(puff); puff.geometry.dispose(); (puff.material as T.Material).dispose(); } }
    }
    this.renderer.render(this.scene, this.camera);
    this.positionHomeBubbles();
    this.events.rendered?.(time);
    this.canvas.dataset.cameraAngle = String(Math.round(Math.atan2(this.camera.position.x - this.controls.target.x, this.camera.position.z - this.controls.target.z) * 1800 / Math.PI) / 10);
    this.canvas.dataset.cameraElevation = String(Math.round(this.elevation() * 1800 / Math.PI) / 10); this.canvas.dataset.cameraZoom = this.camera.zoom.toFixed(4);
    this.canvas.dataset.cameraTarget = `${this.controls.target.x.toFixed(3)},${this.controls.target.z.toFixed(3)}`;
    if (!this.fpsTime) this.fpsTime = time;
    this.frameCount++; if (time - this.fpsTime > 1500) {
      this.fps = Math.round(this.frameCount * 1000 / (time - this.fpsTime)); this.frameCount = 0; this.fpsTime = time; this.canvas.dataset.fps = String(this.fps); this.canvas.dataset.triangles = String(this.renderer.info.render.triangles); this.canvas.dataset.pixelRatio = String(this.renderer.getPixelRatio()); this.canvas.dataset.drawCalls = String(this.renderer.info.render.calls);
      let nearest=Infinity;for(let i=0;i<this.walkers.length;i++)for(let j=i+1;j<this.walkers.length;j++)if(this.walkers[i].group.visible&&this.walkers[j].group.visible)nearest=Math.min(nearest,Math.hypot(this.walkers[i].group.position.x-this.walkers[j].group.position.x,this.walkers[i].group.position.z-this.walkers[j].group.position.z));
      this.canvas.dataset.npcCount=String(this.walkers.length);this.canvas.dataset.npcMinDistance=Number.isFinite(nearest)?nearest.toFixed(3):'none';
      this.canvas.dataset.npcSample=JSON.stringify(this.walkers.slice(0,3).map(w=>({x:+w.group.position.x.toFixed(3),z:+w.group.position.z.toFixed(3),leg:+w.limbs[0].rotation.x.toFixed(3),arm:+w.limbs[2].rotation.x.toFixed(3)})));
      this.canvas.dataset.curatedScenery=String(this.sceneryModels.size);
      this.canvas.dataset.npcTravel=JSON.stringify(this.traffic?.people.map(p=>+p.totalTravelled.toFixed(2)) || []);
    }
  }
  private clearTransient(group: T.Group): void {
    const geometries = new Set<T.BufferGeometry>(), ownedMaterials = new Set<T.Material>();
    group.traverse(o => { if (o instanceof T.Mesh || o instanceof T.Line) { if (o.geometry !== boxGeometry) geometries.add(o.geometry); for (const m of Array.isArray(o.material) ? o.material : [o.material]) if (!sharedMaterial(m)) ownedMaterials.add(m); } });
    group.clear(); for (const g of geometries) g.dispose(); for (const m of ownedMaterials) m.dispose();
  }
  private buildExtras(): void {
    this.clearTransient(this.extras);
    if (this.board!.terrain !== 'valley') return;
    const hall = this.board!.buildings.find(b => b.kind === 'hall')!; const model = this.buildingMeshes.get(hall.id)!;
    const garden = new T.Group(); garden.position.copy(model.position); garden.rotation.copy(model.rotation); this.extras.add(garden);
    for (const [i, stars] of this.state!.chapterStars.entries()) if (stars) {
      const x = i < 3 ? -1.04 + i * .3 : .44 + (i - 3) * .3;
      box(garden, x, .15, 1.31, .25, .3, .2, '#a99e83');
      for (let j = 0; j < stars; j++) {
        const shape = new T.Shape(); for (let v = 0; v < 10; v++) { const a = Math.PI / 2 + v * Math.PI / 5, r = v % 2 ? .05 : .105; if (v === 0) shape.moveTo(Math.cos(a) * r, Math.sin(a) * r); else shape.lineTo(Math.cos(a) * r, Math.sin(a) * r); } shape.closePath();
        const star = new T.Mesh(new T.ExtrudeGeometry(shape, { depth: .03, bevelEnabled: false }), material('#d6b467', true)); star.position.set(x, .4 + j * .19, 1.31); garden.add(star);
      }
    }
  }
}
