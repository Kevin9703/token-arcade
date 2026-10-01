import type { Season } from './world-time';
import type { TownState } from './types';

export const SEASON_TRACKS: Record<Season, { title:string; source:string }> = {
  spring: { title:'Heartwarming', source:'./assets/town/audio/spring.mp3' },
  summer: { title:'Clear Air', source:'./assets/town/audio/summer-clear-air.mp3' },
  autumn: { title:'At Rest', source:'./assets/town/audio/autumn.mp3' },
  winter: { title:'Relaxing Piano Music', source:'./assets/town/audio/winter.mp3' },
};
type Channel = {audio:HTMLAudioElement; season:Season; gain:number; failed:boolean; blocked:boolean; pending:boolean};
// Local recordings only. A trusted click/key starts playback; subsequent seasons
// and loop boundaries blend over three seconds, without downloading all seasons.
export class SeasonalMusic {
  private current?:Channel;
  private incoming?:Channel;
  private unlocked=false;
  private latest?:{season:Season; settings:TownState['settings']};
  constructor() {
    const unlock=()=>{this.unlocked=true; for(const c of [this.current,this.incoming])if(c)c.blocked=false; if(this.latest)this.update(this.latest.season,this.latest.settings,0);};
    document.addEventListener('pointerdown',unlock,{passive:true});
    document.addEventListener('keydown',unlock);
    document.addEventListener('visibilitychange',()=>{if(document.hidden){this.current?.audio.pause();this.incoming?.audio.pause();}});
  }
  private channel(season:Season,gain:number):Channel {
    const audio=document.createElement('audio'); audio.src=SEASON_TRACKS[season].source;audio.preload='auto';audio.volume=0;
    audio.dataset.season=season;audio.setAttribute('aria-label',`季节音乐 ${SEASON_TRACKS[season].title}`);document.body.append(audio);
    const channel={audio,season,gain,failed:false,blocked:false,pending:false};audio.addEventListener('error',()=>{channel.failed=true;});
    return channel;
  }
  update(season:Season,settings:TownState['settings'],dt:number):void {
    this.latest={season,settings};
    const enabled=this.unlocked&&settings.music&&!settings.muted&&!document.hidden;
    if(!enabled){this.current?.audio.pause();this.incoming?.audio.pause();this.status(!settings.music||settings.muted?'音乐已关闭':this.unlocked?'音乐已暂停':'点击城镇开启音乐');return;}
    if(!this.current)this.current=this.channel(season,1);
    if(this.incoming&&this.incoming.season!==season){this.incoming.audio.remove();this.incoming.audio.pause();this.incoming=undefined;}
    const a=this.current;
    if(!this.incoming&&(a.season!==season||a.audio.ended||Number.isFinite(a.audio.duration)&&a.audio.duration-a.audio.currentTime<3))this.incoming=this.channel(season,0);
    for(const c of [this.current,this.incoming])if(c&&!c.failed&&!c.blocked&&!c.pending&&c.audio.paused&&!(c===this.current&&c.audio.ended&&this.incoming)){c.pending=true;void c.audio.play().catch(()=>{c.blocked=true;}).finally(()=>{c.pending=false;});}
    if(this.incoming&&!this.incoming.audio.paused&&this.incoming.audio.readyState>=2){const step=dt/3;this.incoming.gain=Math.min(1,this.incoming.gain+step);a.gain=Math.max(0,1-this.incoming.gain);if(this.incoming.gain>=1){a.audio.pause();a.audio.remove();this.current=this.incoming;this.incoming=undefined;}}
    for(const c of [this.current,this.incoming])if(c)c.audio.volume=Math.max(0,Math.min(1,settings.musicVolume*c.gain));
    const playing=this.incoming||this.current;
    this.status(playing.failed?'音乐暂时无法播放':playing.audio.paused?'点击城镇开启音乐':`正在播放 · ${SEASON_TRACKS[playing.season].title}`);
  }
  private status(label:string):void {const el=document.getElementById('music-status');if(el&&el.textContent!==label)el.textContent=label;}
}
