import type { TownState } from './types';
export const DAY_SECONDS = 360;
export const SEASON_DAYS = 3;
export const SEASONS = ['spring','summer','autumn','winter'] as const;
export type Season = typeof SEASONS[number];
export const seasonNames = { spring:'春', summer:'夏', autumn:'秋', winter:'冬' };
const smooth = (a:number,b:number,x:number) => {const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t);};
export function worldTime(seconds:number,settings:TownState['settings']) {
  const elapsed=Math.max(0,seconds),days=elapsed/DAY_SECONDS;
  const hour=settings.clockMode==='fixed'?{day:12,sunset:19,night:23}[settings.lighting]:((days+.375)%1)*24;
  const season:Season=settings.season==='cycle'?SEASONS[Math.floor(days/SEASON_DAYS)%4]:settings.season;
  const daylight=smooth(5.5,8,hour)*(1-smooth(18,21,hour));
  const warmth=Math.max(smooth(16,18.5,hour)*(1-smooth(19.5,21,hour)),smooth(5,6.5,hour)*(1-smooth(7,8.5,hour)));
  const day=Math.floor(days+.375)+1;
  return {hour,day,season,daylight,warmth,sleep:hour>=20||hour<6, label:`${seasonNames[season]} · 第 ${day} 天 · ${String(Math.floor(hour)).padStart(2,'0')}:${String(Math.floor(hour%1*60)).padStart(2,'0')}`};
}
export function atHour(seconds:number,hour:number):number {
  let day=Math.floor(seconds/DAY_SECONDS+.375);if(day+hour/24<.375)day++;return (day+hour/24-.375)*DAY_SECONDS;
}
