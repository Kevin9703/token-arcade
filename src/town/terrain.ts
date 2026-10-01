import type { Board, Building, Cell } from './types';
import { CATALOG } from './catalog';

export const TOWN_SIZE = 40;
export const LEGACY_TOWN_SIZE = 24;
export const STARTER_WIDTH = 26;
export const expandedValley = (board: Board): boolean => board.terrain === 'valley' && board.size === TOWN_SIZE;
const rise = (v: number, from: number, to: number): number => {
  const t = Math.max(0, Math.min(1, (v - from) / (to - from)));
  return t * t * (3 - 2 * t);
};

/** The original 24×24 town stays exactly at its old elevation and coordinates. */
export function groundHeight(board: Board, x: number, z: number): number {
  if (!expandedValley(board)) return 0;
  const meadow = 2 * rise(z, 24, 30);
  const bank = z >= 13 ? rise(z, 15, 19) : rise(8 - z, 0, 4);
  return meadow + 1.4 * rise(x, 26, 32) * bank;
}
export function groundNormal(board: Board, x: number, z: number): {x:number;y:number;z:number} {
  const d = .025, dx = (groundHeight(board,x+d,z)-groundHeight(board,x-d,z))/(2*d), dz = (groundHeight(board,x,z+d)-groundHeight(board,x,z-d))/(2*d);
  const length = Math.hypot(dx,1,dz); return {x:-dx/length,y:1/length,z:-dz/length};
}
/** Flat plots on either terrace accept buildings; the gentle connecting slopes accept roads. */
export function foundationHeight(board: Board, b: Pick<Building,'x'|'z'|'kind'|'rotation'>): number | null {
  const def = CATALOG[b.kind], w = b.rotation%2 ? def.d : def.w, d = b.rotation%2 ? def.w : def.d;
  const corners = [[b.x,b.z],[b.x+w,b.z],[b.x,b.z+d],[b.x+w,b.z+d]].map(([x,z])=>groundHeight(board,x,z));
  return Math.max(...corners)-Math.min(...corners) < .001 ? corners[0] : null;
}
export const starterWidth = (board: Board): number => expandedValley(board) ? STARTER_WIDTH : 18;
export const westernWidth = (board: Board): number => expandedValley(board) ? 20 : 12;

/** Scenic terrain outside the construction grid: soft banks, ridges and a rounded woodland edge. */
export function landscapeHeight(board: Board, x: number, z: number): number {
  const n = board.size, xx = Math.max(0,Math.min(n,x)), zz = Math.max(0,Math.min(n,z));
  const outside = Math.hypot(x-xx,z-zz);
  if (!outside) return groundHeight(board,x,z);
  const hill = (cx:number,cz:number,rx:number,rz:number,h:number) => h*Math.max(0,1-((x-cx)/rx)**2-((z-cz)/rz)**2)**2;
  const rim = board.terrain==='valley' ? Math.max(hill(4,-5,10,8,4.5),hill(n*.52,-7,13,9,6.4),hill(n-1,-4,10,7,4),hill(n+3,n*.64,7,12,3),hill(-3,n*.8,6,9,1.7)) : 0;
  const edge = groundHeight(board,xx,zz);
  const taper = rise(outside,1.8,8.5);
  const radius=z<0?13:5.5+Math.sin(x*.19+z*.13)*1.1;
  const blend=1-rise(outside,Math.max(1,radius-2),radius-.25);
  const h=-2.6+(edge*(1-taper)-2.6*taper+rim*rise(outside,0,1.8)+2.6)*blend;
  if(board.terrain==='meadow'||x>=0&&x<=n)return h;
  const channel=scenicRiver(board,x),distance=Math.max(0,Math.abs(z-channel.center)-channel.width/2);
  // The woodland pools sit in a supported bank, not a sheet floating off the board.
  const padding=2.5*(1-rise(outside,7,9));
  return Math.max(h,-2.6*rise(distance,0,Math.max(.01,padding)));
}
export function inLandscape(board:Board,x:number,z:number):boolean {
  const n=board.size, xx=Math.max(0,Math.min(n,x)), zz=Math.max(0,Math.min(n,z));
  const radius=z<0?13:5.5+Math.sin(x*.19+z*.13)*1.1;
  const outside=x<0?-x:Math.max(0,x-n),channel=scenicRiver(board,x);
  const poolShore=board.terrain!=='meadow'&&outside>0&&outside<9&&Math.abs(z-channel.center)<channel.width/2+2.5*(1-rise(outside,7,9));
  return Math.hypot(x-xx,z-zz)<radius||poolShore;
}
/** Extended river curves and its small woodland pool are outside all playable cells. */
export function scenicRiver(board:Board,x:number):{center:number;width:number} {
  const river=board.terrain==='valley'?12:6,n=board.size;
  const outside=x<0?-x:Math.max(0,x-n), sign=x<0?-1:1;
  return {center:river+sign*Math.sin(outside*.24)*outside*.20,width:(2+Math.sin(Math.min(outside,8)*Math.PI/8)*(x<0?2.2:.9))*(1-rise(outside,6,8))};
}
export function sceneryClear(board:Board,p:Cell,radius=.55):boolean {
  if(p.x<0||p.z<0||p.x>=board.size||p.z>=board.size)return true;
  if(board.roads.some(k=>{const [x,z]=k.split(',').map(Number);return p.x>x-radius&&p.x<x+1+radius&&p.z>z-radius&&p.z<z+1+radius;}))return false;
  return !board.buildings.some(b=>{if(!b.placed)return false;const def=CATALOG[b.kind],w=b.rotation%2?def.d:def.w,d=b.rotation%2?def.w:def.d;return p.x>b.x-radius&&p.x<b.x+w+radius&&p.z>b.z-radius&&p.z<b.z+d+radius;});
}
