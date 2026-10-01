import { dimensions, water } from './world';
import { walkSurface } from './walk-surface';
import type { Board, Cell } from './types';

export const STREET_EYE_HEIGHT = .68;
export function streetOpen(board: Board, p: Cell): boolean {
  if (p.x < .2 || p.z < .2 || p.x > board.size - .2 || p.z > board.size - .2) return false;
  if (board.buildings.some(b => { const d = dimensions(b); return b.placed && b.kind !== 'bridge' && p.x > b.x - .18 && p.x < b.x + d.w + .18 && p.z > b.z - .18 && p.z < b.z + d.d + .18; })) return false;
  if (!water(board, Math.floor(p.x), Math.floor(p.z))) return true;
  return board.buildings.some(b => b.placed && b.kind === 'bridge' && p.x >= b.x + .24 && p.x <= b.x + dimensions(b).w - .24 && p.z >= b.z && p.z <= b.z + dimensions(b).d);
}
export function streetStart(board: Board, focus: Cell): Cell | null {
  return board.roads.map(k => { const [x,z] = k.split(',').map(Number); return {x:x+.5,z:z+.5}; }).filter(p => streetOpen(board,p)).sort((a,b) => Math.hypot(a.x-focus.x,a.z-focus.z) - Math.hypot(b.x-focus.x,b.z-focus.z) || a.z-b.z || a.x-b.x)[0] || null;
}
export function streetHeading(board:Board,p:Cell,preferred:number):number {
  const roads=new Set(board.roads),angles=[preferred,0,Math.PI/2,Math.PI,-Math.PI/2];
  return angles.map((angle,index)=>{let score=index===0?.05:0;for(let distance=.25;distance<=6;distance+=.25){const q={x:p.x+Math.sin(angle)*distance,z:p.z+Math.cos(angle)*distance};if(!streetOpen(board,q))break;score+=roads.has(`${Math.floor(q.x)},${Math.floor(q.z)}`)?2:1;}return{angle,score};}).sort((a,b)=>b.score-a.score)[0].angle;
}
export function streetMove(board: Board, from: Cell, dx: number, dz: number): Cell {
  const p = {...from}, steps = Math.max(1, Math.ceil(Math.hypot(dx,dz)/.1));
  for (let i=0;i<steps;i++) {
    const next = {x:p.x+dx/steps,z:p.z+dz/steps};
    if(streetOpen(board,next)) Object.assign(p,next);
    else { if(streetOpen(board,{x:next.x,z:p.z}))p.x=next.x; if(streetOpen(board,{x:p.x,z:next.z}))p.z=next.z; }
  }
  return p;
}
export function streetHeight(board: Board, p: Cell): number { return walkSurface(board.buildings,p,board).y + STREET_EYE_HEIGHT; }
