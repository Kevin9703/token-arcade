import { chromium } from 'playwright-core';
const URL='http://localhost:4173', OUT='/tmp/ta-visual';
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
const b=await chromium.launch({channel:'chrome',headless:true});
const p=await b.newPage({viewport:{width:1600,height:1000},deviceScaleFactor:1});
try{
  await p.goto(URL,{waitUntil:'networkidle'});
  await p.evaluate(()=>localStorage.clear());
  await p.reload({waitUntil:'networkidle'}); await sleep(400);
  await p.evaluate(()=>{window.arcade.store.state.firstRunDone=true;window.arcade.store.setMode('demo');});
  for(let i=0;i<4;i++){await p.mouse.click(1472,54);await sleep(600);}
  // force the first project through each stage threshold and shoot its detail
  const tokensByStage={1:60_000,2:520_000,3:4_000_000,4:40_000_000,5:480_000_000};
  const id=await p.evaluate(()=>window.arcade.store.state.projects[0].id);
  for(const [stage,tok] of Object.entries(tokensByStage)){
    await p.evaluate((a)=>{const pr=window.arcade.store.state.projects.find(x=>x.id===a.id);pr.tokens=a.tok;window.arcade.store.setLanguage('en');window.arcade.router.go('room');window.arcade.router.go('cabinet',{id:a.id});},{id,tok});
    await sleep(450); await p.screenshot({path:`${OUT}/stage${stage}-en.png`});
  }
  console.log('done');
}catch(e){console.log('ERR',e.message);}finally{await b.close();}
