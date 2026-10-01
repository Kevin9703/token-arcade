import type { Building, BuildingKind } from './types';
import type { WalkPoint } from './pedestrians';
import { dimensions } from './world';

/** One source for the model opening, hinge and resident crossing, in model space. */
export interface DoorSpec { x:number; z:number; width:number; height:number; floor:number; glass?:boolean; gate?:boolean }
export const DOOR_SPECS: Partial<Record<BuildingKind,DoorSpec>> = {
  house:{x:.18,z:.85,width:.50,height:.88,floor:.16},
  workshop:{x:.18,z:.85,width:.50,height:.88,floor:.16},
  hall:{x:0,z:1.10,width:.62,height:1.04,floor:.20},
  bakery:{x:.40,z:.53,width:.60,height:.91,floor:.14},
  cafe:{x:.20,z:.49,width:.54,height:1.02,floor:.14},
  florist:{x:.18,z:.66,width:.55,height:1.14,floor:.14,glass:true},
  library:{x:0,z:.68,width:.62,height:1.13,floor:.14},
  greenhouse:{x:0,z:.82,width:.64,height:1.20,floor:.14,glass:true},
  granary:{x:.48,z:.75,width:.45,height:.77,floor:.15},
  mill:{x:-.18,z:.59,width:.62,height:.95,floor:.18},
  restaurant:{x:0,z:.50,width:.62,height:1.08,floor:.12},
  fishinghut:{x:-.12,z:.87,width:.47,height:.86,floor:.09},
  vegetablefield:{x:0,z:.90,width:.64,height:.48,floor:.07,gate:true},
  cowshed:{x:0,z:.90,width:.64,height:.48,floor:.11,gate:true},
  pigpen:{x:0,z:.90,width:.64,height:.48,floor:.11,gate:true},
};
export interface Doorway {id:string; outside:WalkPoint; inside:WalkPoint; approach:WalkPoint; departure:WalkPoint; yaw:number; floor:number}
export function buildingPoint(b:Building,x:number,z:number):WalkPoint {
  const d=dimensions(b),yaw=-b.rotation*Math.PI/2;
  return {x:b.x+d.w/2+x*Math.cos(yaw)+z*Math.sin(yaw),z:b.z+d.d/2-x*Math.sin(yaw)+z*Math.cos(yaw)};
}
export function doorwayForBuilding(b:Building):Doorway|undefined {
  const s=DOOR_SPECS[b.kind];
  return s&&{id:b.id,outside:buildingPoint(b,s.x,s.z+.36),inside:buildingPoint(b,s.x,s.z-.74),approach:buildingPoint(b,s.x+.28,s.z+.72),departure:buildingPoint(b,s.x-.28,s.z+.72),yaw:-b.rotation*Math.PI/2,floor:s.floor+.04};
}
export function interiorSpot(b:Building,offset=0):WalkPoint|undefined {
  const s=DOOR_SPECS[b.kind];return s&&buildingPoint(b,s.x+offset,s.z-1.04);
}
/** The fishing pier is reached around the hut, never through its walls. */
export function fishingAccess(b:Building):WalkPoint[] {
  return [[-.60,1.17],[-.60,-.65],[-.35,-1.38]].map(([x,z])=>buildingPoint(b,x,z));
}
