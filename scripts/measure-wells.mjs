import sharp from 'sharp';
const lum=(r,g,b)=>0.299*r+0.587*g+0.114*b;
async function raw(p){const{data,info}=await sharp(p).ensureAlpha().raw().toBuffer({resolveWithObject:true});return{data,w:info.width,h:info.height};}
const at=(d,w,x,y)=>{const i=(y*w+x)*4;return[d[i],d[i+1],d[i+2],d[i+3]];};
const F=(v,d)=>+(v/d).toFixed(4);
const {data,w,h}=await raw('public/assets/project-detail/stats-board.png');
const dark=(x,y)=>{const[r,g,b,a]=at(data,w,x,y);return a>200&&lum(r,g,b)<26;};
// 1) find the 5 well Y-centers with a narrow central scan (clean separation)
const xC0=Math.round(w*0.16),xC1=Math.round(w*0.22);
const row=new Array(h).fill(0);
for(let y=0;y<h;y++){let c=0;for(let x=xC0;x<=xC1;x++)if(dark(x,y))c++;row[y]=c;}
const bands=[];let s=-1;for(let y=0;y<=h;y++){const on=y<h&&row[y]>(xC1-xC0)*0.5;if(on&&s<0)s=y;else if(!on&&s>=0){if(y-s>=25)bands.push({cy:Math.round((s+y-1)/2)});s=-1;}}
console.log('wells:',bands.length);
// 2) at each well cy, find the dark run in x[0.05,0.33] that contains x~0.19
const probe=Math.round(w*0.19);
for(const b of bands){
  // average over a few rows around cy for stability
  const isDarkCol=(x)=>{let c=0;for(let dy=-4;dy<=4;dy++)if(dark(x,b.cy+dy))c++;return c>=6;};
  let x0=probe,x1=probe;
  while(x0>Math.round(w*0.05)&&isDarkCol(x0-1))x0--;
  while(x1<Math.round(w*0.33)&&isDarkCol(x1+1))x1++;
  console.log(` well cy=${F(b.cy,h)} interior x ${F(x0,w)}..${F(x1,w)} cx=${F((x0+x1)/2,w)} wf=${F(x1-x0,w)} (px ${x1-x0})`);
}
