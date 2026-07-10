import sharp from 'sharp';
async function raw(p){const{data,info}=await sharp(p).ensureAlpha().raw().toBuffer({resolveWithObject:true});return{data,w:info.width,h:info.height};}
const at=(d,w,x,y)=>{const i=(y*w+x)*4;return[d[i],d[i+1],d[i+2],d[i+3]];};
const lum=(r,g,b)=>0.299*r+0.587*g+0.114*b;
const F=(v,d)=>+(v/d).toFixed(4);
const {data,w,h}=await raw('public/assets/project-detail/recent-rewards-rail.png');
const gold=(x,y)=>{const[r,g,b,a]=at(data,w,x,y);return a>180&&r>170&&g>110&&b<110&&r>b+60;};
const dark=(x,y)=>{const[r,g,b,a]=at(data,w,x,y);return a>200&&lum(r,g,b)<45;};
// slot band vertical extent: rows in y[0.55,0.85] that contain wide dark ticket interiors
let y0b=h,y1b=0;
for(let y=Math.round(h*0.55);y<Math.round(h*0.85);y++){let c=0;for(let x=Math.round(w*0.12);x<Math.round(w*0.88);x++)if(dark(x,y))c++;if(c>(w*0.76)*0.35){if(y<y0b)y0b=y;if(y>y1b)y1b=y;}}
const bandCy=(y0b+y1b)/2;
console.log('slot band y',F(y0b,h),'..',F(y1b,h),' cy',F(bandCy,h),'(px',Math.round(bandCy),')');
// gold vertical borders: columns with many gold px in the band
const yb0=Math.round(y0b),yb1=Math.round(y1b);
const gc=new Array(w).fill(0);
for(let x=0;x<w;x++){let c=0;for(let y=yb0;y<=yb1;y++)if(gold(x,y))c++;gc[x]=c;}
const thr=(yb1-yb0)*0.35;
const cols=[];let s=-1;for(let x=0;x<=w;x++){const on=x<w&&gc[x]>thr;if(on&&s<0)s=x;else if(!on&&s>=0){cols.push(Math.round((s+x-1)/2));s=-1;}}
console.log('gold border columns:',cols.map(c=>F(c,w)).join(', '));
// slot interiors = dark runs at bandCy between gold borders
const my=Math.round(bandCy);const runs=[];s=-1;
for(let x=0;x<=w;x++){const on=x<w&&dark(x,my)&&!gold(x,my);if(on&&s<0)s=x;else if(!on&&s>=0){if(x-s>w*0.04)runs.push([s,x-1]);s=-1;}}
console.log('interiors:',runs.length,'centers:',runs.map(([a,b])=>F((a+b)/2,w)).join(', '));
