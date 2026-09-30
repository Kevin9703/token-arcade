import type {Board,Evaluation} from './types';
export function missingHomeNeeds(board:Board,e:Evaluation,chapter:number,leisure=true){
  return board.buildings.filter(b=>b.placed&&b.kind==='house').map(home=>{
    const s=e.buildings[home.id];const needs:string[]=[];
    if(!s?.connected)needs.push('道路');else {if(!s.food)needs.push('食物');if(chapter>=2&&!s.green)needs.push('绿地');if(chapter>=3&&leisure&&!s.leisure)needs.push('休闲');}
    return {home,needs};
  }).filter(b=>b.needs.length);
}
