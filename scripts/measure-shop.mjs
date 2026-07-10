import sharp from 'sharp';
async function raw(p){const{data,info}=await sharp(p).ensureAlpha().raw().toBuffer({resolveWithObject:true});return{data,w:info.width,h:info.height};}
const at=(d,w,x,y)=>d[(y*w+x)*4+3];
const F=(v,d)=>+(v/d).toFixed(4);
for(const n of ['shop_capsule_single','shop_capsule_bundle']){
  const {data,w,h}=await raw(`public/assets/shop/items/${n}.png`);
  let x0=w,y0=h,x1=0,y1=0,sx=0,sy=0,c=0;
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){const a=at(data,w,x,y);if(a>32){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y;sx+=x;sy+=y;c++;}}
  console.log(n,`size ${w}x${h}`,`bbox x ${F(x0,w)}..${F(x1,w)} y ${F(y0,h)}..${F(y1,h)}`,
    `bboxCtr ${F((x0+x1)/2,w)},${F((y0+y1)/2,h)}`,`visAspect ${((x1-x0)/(y1-y0)).toFixed(3)}`);
}
