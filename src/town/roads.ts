import * as T from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { groundHeight, groundNormal } from './terrain';
import { material } from './models';
import { cells, fromKey, key } from './world';
import type { Board, Evaluation } from './types';

export function stoneRoads(board: Board, evaluation: Evaluation): T.Group {
  const group = new T.Group(), roadSet = new Set(board.roads), occupied = new Set(board.buildings.filter(b => b.placed).flatMap(b => cells(b).map(p => key(p.x,p.z))));
  const tile = new T.Object3D(), tones = ['#b9b6a9','#aaa99d','#c6c1b1','#a9b2a9','#b6ae9e'];
  const stone = new T.InstancedMesh(new RoundedBoxGeometry(1,1,1,1,.09), material('#ffffff'), board.roads.length * 16);
  const bed = new T.InstancedMesh(new T.BoxGeometry(.99,.035,.99), material('#898e7f'), board.roads.length);
  const align=(x:number,z:number,yaw=0)=>{const normal=groundNormal(board,x,z);tile.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),new T.Vector3(normal.x,normal.y,normal.z));tile.rotateY(yaw);};
  const borders: {x:number;z:number;horizontal:boolean}[] = []; let index = 0;
  for (const [i,k] of board.roads.entries()) {
    const p = fromKey(k); tile.position.set(p.x+.5,groundHeight(board,p.x+.5,p.z+.5)+.046,p.z+.5);tile.scale.setScalar(1);align(p.x+.5,p.z+.5);tile.updateMatrix();bed.setMatrixAt(i,tile.matrix);
    for(let row=0;row<4;row++) for(let col=0;col<4;col++) {
      const hash = Math.abs(Math.imul(p.x*19+p.z*43+row*7+col*13,2654435761))>>>0;
      const x=p.x+.125+col*.25+(hash%5-2)*.004,z=p.z+.125+row*.25;tile.position.set(x,groundHeight(board,x,z)+.07+(hash%3)*.002,z);
      tile.scale.set(.226+(hash%4)*.002,.055,.221+(hash%3)*.003);align(x,z,(hash%5-2)*.018);tile.updateMatrix();stone.setMatrixAt(index,tile.matrix);
      const color = new T.Color(tones[hash%tones.length]); if(!evaluation.connectedRoads.has(k))color.multiplyScalar(.77);stone.setColorAt(index++,color);
    }
    for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]) if(!roadSet.has(key(p.x+dx,p.z+dz)) && !occupied.has(key(p.x+dx,p.z+dz))) for(let part=0;part<4;part++) borders.push({x:p.x+.5+dx*.47+(dz ? (part-1.5)*.245 : 0),z:p.z+.5+dz*.47+(dx ? (part-1.5)*.245 : 0),horizontal:dz!==0});
  }
  const curb = new T.InstancedMesh(new RoundedBoxGeometry(1,1,1,1,.08),material('#cfcbba'),borders.length);
  borders.forEach((p,i)=>{tile.position.set(p.x,groundHeight(board,p.x,p.z)+.085,p.z);align(p.x,p.z);tile.scale.set(p.horizontal ? .235 : .075,.09,p.horizontal ? .075 : .235);tile.updateMatrix();curb.setMatrixAt(i,tile.matrix);});
  for(const mesh of [bed,stone,curb]) {mesh.receiveShadow=true;group.add(mesh);}
  group.name='connected-stone-streets'; return group;
}
