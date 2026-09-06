/** Technical atlas extraction only: preserve original artwork and alpha. */
import sharp from 'sharp';
import {mkdirSync,writeFileSync} from 'node:fs';
const dest='public/assets/cozy-preview';mkdirSync(dest,{recursive:true});
await sharp('assets/concepts/v2/room-study.png').webp({quality:95}).toFile(`${dest}/room.webp`);
const manifest={source:'assets/concepts/v2',status:'P1-A sample; not approved production art',sprites:{}};
async function extract(file,name,left,top,width,height){
 const source=sharp(`assets/concepts/v2/${file}`);
 const {data,info}=await source.clone().extract({left,top,width,height}).ensureAlpha().raw().toBuffer({resolveWithObject:true});
 let x0=width,y0=height,x1=0,y1=0;
 for(let y=0;y<height;y++)for(let x=0;x<width;x++)if(data[(y*width+x)*info.channels+3]>20){x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y);}
 const rect={left:left+x0,top:top+y0,width:x1-x0+1,height:y1-y0+1};
 await source.extract(rect).png().toFile(`${dest}/${name}.png`);
 manifest.sprites[name]={source:file,crop:rect,pivot:[.5,1]};
}
for(let i=0;i<5;i++){let l=Math.floor(i*1983/5),r=Math.floor((i+1)*1983/5);await extract('cabinet-study.png',`cabinet-${i+1}`,l,0,r-l,793);}
for(let i=0;i<4;i++){let l=Math.floor(i*1774/4),r=Math.floor((i+1)*1774/4);await extract('character-study.png',`keeper-${i}`,l,0,r-l,476);await extract('character-study.png',`lumi-${i}`,l,476,r-l,411);}
for(const [name,l,t,w,h] of [['journal',0,0,793,520],['dialogue',793,0,793,496],['hud',0,520,793,472],['book',793,496,793,496]])await extract('ui-study.png',name,l,t,w,h);
writeFileSync(`${dest}/atlas.json`,JSON.stringify(manifest,null,2)+'\n');
console.log('Prepared scene + 17 alpha-preserving sprite crops.');
