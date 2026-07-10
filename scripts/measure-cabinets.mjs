// Per-stage cabinet recessed windows (marquee band / monitor screen / power LED
// strip) as fractions of the FULL png. The screen is the largest dark band with
// its centre in the upper-middle; marquee is the dark inset just above it; the
// power strip is the first dark band just below it. Measurement only.
import sharp from 'sharp';
const lum=(r,g,b)=>0.299*r+0.587*g+0.114*b;
async function raw(p){const{data,info}=await sharp(p).ensureAlpha().raw().toBuffer({resolveWithObject:true});return{data,w:info.width,h:info.height};}
const at=(d,w,x,y)=>{const i=(y*w+x)*4;return[d[i],d[i+1],d[i+2],d[i+3]];};
function abbox(d,w,h){let x0=w,y0=h,x1=0,y1=0;for(let y=0;y<h;y++)for(let x=0;x<w;x++){if(at(d,w,x,y)[3]>40){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y;}}return{x0,y0,x1,y1};}
function bands(d,w,h,bb){
  const xL=Math.round(bb.x0+(bb.x1-bb.x0)*0.14),xR=Math.round(bb.x0+(bb.x1-bb.x0)*0.86);
  const need=(xR-xL)*0.45; const row=new Array(h).fill(0);
  for(let y=bb.y0;y<=bb.y1;y++){let c=0;for(let x=xL;x<=xR;x++){const[r,g,b,a]=at(d,w,x,y);if(a>200&&lum(r,g,b)<36)c++;}row[y]=c;}
  const out=[];let s=-1;for(let y=bb.y0;y<=bb.y1+1;y++){const on=y<=bb.y1&&row[y]>need;if(on&&s<0)s=y;else if(!on&&s>=0){if(y-s>=4)out.push({y0:s,y1:y-1,ht:y-s});s=-1;}}
  return out;
}
function xext(d,w,y0,y1,bb){let x0=w,x1=0;for(let y=y0;y<=y1;y++)for(let x=bb.x0;x<=bb.x1;x++){const[r,g,b,a]=at(d,w,x,y);if(a>200&&lum(r,g,b)<40){if(x<x0)x0=x;if(x>x1)x1=x;}}return[x0,x1];}
for(let i=1;i<=5;i++){
  const {data,w,h}=await raw(`public/assets/project-detail/cabinet-stage-${i}.png`);
  const bb=abbox(data,w,h);
  const bh=bb.y1-bb.y0;
  const bs=bands(data,w,h,bb);
  // screen: largest band whose centre y (fraction of png) in [0.2,0.58]
  const cand=bs.filter(b=>{const cy=((b.y0+b.y1)/2)/h;return cy>=0.2&&cy<=0.58;}).sort((a,b)=>b.ht-a.ht);
  const screen=cand[0];
  if(!screen){console.log('stage'+i,'NO SCREEN', JSON.stringify(bs.map(b=>[+(b.y0/h).toFixed(2),+(b.y1/h).toFixed(2)])));continue;}
  const above=bs.filter(b=>b.y1<screen.y0);
  const marquee=above.length?above[above.length-1]:null;
  const below=bs.filter(b=>b.y0>screen.y1 && ((b.y0)/h)<0.80);
  const power=below.length?below[0]:null;
  const mk=(b)=>{if(!b)return null;const[x0,x1]=xext(data,w,b.y0,b.y1,bb);return{x:+(x0/w).toFixed(3),y:+(b.y0/h).toFixed(3),w:+((x1-x0)/w).toFixed(3),h:+((b.y1-b.y0)/h).toFixed(3)};};
  console.log('stage'+i, JSON.stringify({marquee:mk(marquee),screen:mk(screen),power:mk(power)}));
}
