// Measure, per frame asset: the recessed inner content WINDOW (where dynamic
// text/icons go) and the baked badge bbox (gold coin disc on plaques), as
// fractions of the FULL png. Window = region whose columns/rows hold a long
// run of very-dark recessed pixels (frame border is colored, so it's excluded).
// Measurement only — no pixels are modified.
import sharp from 'sharp';
const lum=(r,g,b)=>0.299*r+0.587*g+0.114*b;
async function raw(p){const{data,info}=await sharp(p).ensureAlpha().raw().toBuffer({resolveWithObject:true});return{data,w:info.width,h:info.height};}
const at=(data,w,x,y)=>{const i=(y*w+x)*4;return[data[i],data[i+1],data[i+2],data[i+3]];};

// longest vertical dark run in column x
function colDarkRun(data,w,h,x){let best=0,cur=0;for(let y=0;y<h;y++){const[r,g,b,a]=at(data,w,x,y);if(a>160&&lum(r,g,b)<26){cur++;if(cur>best)best=cur;}else cur=0;}return best;}
function rowDarkRun(data,w,h,y){let best=0,cur=0;for(let x=0;x<w;x++){const[r,g,b,a]=at(data,w,x,y);if(a>160&&lum(r,g,b)<26){cur++;if(cur>best)best=cur;}else cur=0;}return best;}

function windowBox(data,w,h){
  // columns whose dark-run covers >45% of height => interior columns
  let x0=-1,x1=-1;for(let x=0;x<w;x++){if(colDarkRun(data,w,h,x)>h*0.45){if(x0<0)x0=x;x1=x;}}
  let y0=-1,y1=-1;for(let y=0;y<h;y++){if(rowDarkRun(data,w,h,y)>w*0.45){if(y0<0)y0=y;y1=y;}}
  if(x0<0||y0<0)return null;
  return {x0,y0,x1,y1};
}
function goldBadge(data,w,h){
  // bright warm gold disc
  let x0=w,y0=h,x1=-1,y1=-1;
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){const[r,g,b,a]=at(data,w,x,y);
    if(a>180&&r>175&&g>120&&b<120&&r>b+55){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y;}}
  return x1<0?null:{x0,y0,x1,y1};
}
const F=(v,d)=>+(v/d).toFixed(4);
async function measure(p,n,opts={}){
  const{data,w,h}=await raw(p);
  const win=windowBox(data,w,h);
  const o={name:n,size:[w,h]};
  if(win)o.window={x:F(win.x0,w),y:F(win.y0,h),w:F(win.x1-win.x0+1,w),h:F(win.y1-win.y0+1,h),cx:F((win.x0+win.x1)/2,w),cy:F((win.y0+win.y1)/2,h)};
  if(opts.badge){const b=goldBadge(data,w,h);if(b)o.badge={cx:F((b.x0+b.x1)/2,w),cy:F((b.y0+b.y1)/2,h),r:F((b.x1-b.x0)/2,w),rightFrac:F(b.x1,w)};}
  console.log(JSON.stringify(o));
}
const HUD='public/assets/hud/items/',ACH='public/assets/achievement-showcase/items/';
await measure(HUD+'coin_hud_plaque.png','coin_hud_plaque',{badge:1});
await measure(HUD+'token_hud_plaque.png','token_hud_plaque',{badge:1});
await measure(HUD+'price_tag_plaque.png','price_tag_plaque',{badge:1});
await measure(HUD+'reward_ticket_frame.png','reward_ticket_frame');
await measure(ACH+'title_plaque.png','title_plaque');
await measure(ACH+'card_unlocked.png','card_unlocked');
await measure(ACH+'card_locked.png','card_locked');
await measure(ACH+'small_plaque.png','small_plaque');
await measure(ACH+'progress_plaque.png','progress_plaque');
await measure(ACH+'back_button.png','back_button');
