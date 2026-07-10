import sharp from 'sharp';
const lum=(r,g,b)=>0.299*r+0.587*g+0.114*b;
async function raw(p){const{data,info}=await sharp(p).ensureAlpha().raw().toBuffer({resolveWithObject:true});return{data,w:info.width,h:info.height};}
const at=(d,w,x,y)=>{const i=(y*w+x)*4;return[d[i],d[i+1],d[i+2],d[i+3]];};
const F=(v,d)=>+(v/d).toFixed(4);

// ---- stats board -----------------------------------------------------------
{
  const {data,w,h}=await raw('public/assets/project-detail/stats-board.png');
  const isDark=(x,y)=>{const[r,g,b,a]=at(data,w,x,y);return a>200&&lum(r,g,b)<46;};
  // row bars: dark spans in x[0.36,0.80]
  const xL=Math.round(w*0.36),xR=Math.round(w*0.80),need=(xR-xL)*0.85;
  const row=new Array(h).fill(0);
  for(let y=0;y<h;y++){let c=0;for(let x=xL;x<=xR;x++)if(isDark(x,y))c++;row[y]=c;}
  const bands=[];let s=-1;for(let y=0;y<=h;y++){const on=y<h&&row[y]>need;if(on&&s<0)s=y;else if(!on&&s>=0){if(y-s>=30)bands.push({cy:(s+y-1)/2});s=-1;}}
  const rowsY=bands.map(b=>F(b.cy,h));
  // icon slot square: at row0 center, scan x[0.12,0.30] for the dark recess run
  const scanRow=(cy)=>{const yy=Math.round(cy*h);let runs=[],s2=-1;for(let x=Math.round(w*0.12);x<=Math.round(w*0.30);x++){const on=isDark(x,yy);if(on&&s2<0)s2=x;else if(!on&&s2>=0){if(x-s2>w*0.02)runs.push([s2,x-1]);s2=-1;}}return runs;};
  const r0=scanRow(rowsY[0]);
  console.log('BOARD rowsY:',rowsY.join(', '));
  console.log('BOARD icon-slot run(s) at row0:',JSON.stringify(r0.map(([a,b])=>[F(a,w),F(b,w)])));
  if(r0.length){const[a,b]=r0[0];console.log(` icon slot cx=${F((a+b)/2,w)} size=${F(b-a,w)} (px ${b-a})`);}
}

// ---- recent rewards rail: 8 slots via brightness valleys -------------------
{
  const {data,w,h}=await raw('public/assets/project-detail/recent-rewards-rail.png');
  // slot band: use y ~ 0.72 (mid of the ticket recesses). Profile brightness across x.
  const yBand=Math.round(h*0.72);
  const colL=(x)=>{let s=0,n=0;for(let dy=-Math.round(h*0.06);dy<=Math.round(h*0.06);dy++){const[r,g,b,a]=at(data,w,x,yBand+dy);s+=(a>150?lum(r,g,b):0);n++;}return s/n;};
  const x0=Math.round(w*0.075),x1=Math.round(w*0.925);
  const prof=[];for(let x=x0;x<=x1;x++)prof.push(colL(x));
  const sm=prof.map((_,i)=>{let s=0,n=0;for(let k=-7;k<=7;k++){const j=i+k;if(j>=0&&j<prof.length){s+=prof[j];n++;}}return s/n;});
  // dividers = bright local maxima; find ~9 of them (borders between 8 slots + ends)
  const peaks=[];for(let i=10;i<sm.length-10;i++){if(sm[i]>=sm[i-8]&&sm[i]>=sm[i+8]&&sm[i]>28)peaks.push({i,v:sm[i]});}
  peaks.sort((a,b)=>b.v-a.v);
  const div=[];for(const p of peaks){if(div.every(d=>Math.abs(d-p.i)>(x1-x0)*0.06))div.push(p.i);if(div.length>=9)break;}
  div.sort((a,b)=>a-b);
  console.log('RAIL dividers(px x):',div.map(d=>F(d+x0,w)).join(', '));
  const centers=[];for(let i=0;i<div.length-1;i++)centers.push(F((div[i]+div[i+1])/2+x0,w));
  console.log('RAIL slot centers(x):',centers.join(', '));
  console.log('RAIL slot band cy≈',F(yBand,h),'slot width≈',div.length>1?F((div[1]-div[0]),w):'?');
}
