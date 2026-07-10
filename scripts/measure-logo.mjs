import sharp from 'sharp';
const lum=(r,g,b)=>0.299*r+0.587*g+0.114*b;
async function raw(p){const{data,info}=await sharp(p).ensureAlpha().raw().toBuffer({resolveWithObject:true});return{data,w:info.width,h:info.height};}
const at=(d,w,x,y)=>{const i=(y*w+x)*4;return[d[i],d[i+1],d[i+2],d[i+3]];};
const F=(v,d)=>+(v/d).toFixed(4);
for(const n of ['logo-sign-v1-trimmed','logo-sign-flicker-dropout-v1','logo-sign-flicker-burst-v1']){
  const {data,w,h}=await raw(`public/assets/home-ui/${n}.png`);
  // alpha bbox (any visible)
  let ax0=w,ay0=h,ax1=0,ay1=0;
  // bright-core bbox (strong pixels only — the lit sign, ignoring faint glow)
  let bx0=w,by0=h,bx1=0,by1=0;
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){const[r,g,b,a]=at(data,w,x,y);
    if(a>24){if(x<ax0)ax0=x;if(x>ax1)ax1=x;if(y<ay0)ay0=y;if(y>ay1)ay1=y;}
    if(a>140&&lum(r,g,b)>90){if(x<bx0)bx0=x;if(x>bx1)bx1=x;if(y<by0)by0=y;if(y>by1)by1=y;}
  }
  console.log(n);
  console.log('  alpha  bbox x',F(ax0,w),'..',F(ax1,w),' y',F(ay0,h),'..',F(ay1,h),' (w',F(ax1-ax0,w),'h',F(ay1-ay0,h)+')');
  console.log('  bright bbox x',F(bx0,w),'..',F(bx1,w),' y',F(by0,h),'..',F(by1,h),' (w',F(bx1-bx0,w),'h',F(by1-by0,h)+')');
}
