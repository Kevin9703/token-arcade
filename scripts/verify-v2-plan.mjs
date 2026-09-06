/** P0: verify the proposal against actual rules without changing any game save. */
import { build } from 'esbuild';
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import assert from 'node:assert/strict';
const { outputFiles } = await build({
  stdin: { contents: `export { computeSync } from './src/domain/sync';
export { rollCapsule } from './src/domain/capsule';
export { mulberry32 } from './test/helpers';
export { levelInfo } from './src/domain/levels';
export { CONFIG } from './src/domain/economy';
export { GROWTH_CHAPTERS, companionGrowth } from './src/domain/growth';
export { COLLECTIBLES, RARITIES } from './src/content';
export { MISSING_PRIZE_DUST_COST } from './src/domain/collection';`, resolveDir: process.cwd(), loader:'ts' },
  bundle:true, platform:'node', format:'esm', write:false,
});
const rules = await import('data:text/javascript;base64,'+Buffer.from(outputFiles[0].text).toString('base64'));
const { computeSync, rollCapsule, mulberry32, levelInfo, CONFIG, GROWTH_CHAPTERS, companionGrowth, COLLECTIBLES, RARITIES, MISSING_PRIZE_DUST_COST } = rules;
assert.equal(CONFIG.TOKENS_PER_COIN, 10000);
assert.equal(CONFIG.PULL_COST, 25); assert.equal(CONFIG.PULL10_COST, 225);
assert.equal(MISSING_PRIZE_DUST_COST,120);
assert.equal(Object.values(RARITIES).reduce((sum,r)=>sum+r.weight,0),100);
assert.equal(COLLECTIBLES.length,50);
const chapterThresholds=[10000,100000,250000,1000000,5000000,10000000,50000000];
assert.deepEqual(GROWTH_CHAPTERS.map(c=>c.tokens),chapterThresholds);
for(const c of GROWTH_CHAPTERS) assert.ok(COLLECTIBLES.find(item=>item.id===c.reward),c.reward);
assert.deepEqual([0,100000,1000000,10000000].map(t=>companionGrowth(t).stage),[0,1,2,3]);
assert.deepEqual([0,8000,100000,1000000,10000000,50000000,500000000].map(t=>levelInfo(t).level),[1,2,5,10,20,35,50]);
let slice={projects:[],lastTotals:{},coinResidue:0},coins=0;
const tutorial=[];
for(const tokens of [10000,100000,250000]) {
  const next=computeSync(slice,[{id:'tutorial',name:'tutorial',provider:'demo',tokens}]);
  coins+=next.coinsMinted;
  slice={projects:next.projects,lastTotals:next.lastTotals,coinResidue:next.coinResidue};
  const replay=computeSync(slice,[{id:'tutorial',name:'tutorial',provider:'demo',tokens}]);
  assert.equal(replay.coinsMinted,0);
  tutorial.push(`| ${tokens.toLocaleString('en-US')} | ${next.coinsMinted} | ${coins} | ${levelInfo(tokens).level} | ${companionGrowth(tokens).stage+1} | ${GROWTH_CHAPTERS.filter(c=>tokens>=c.tokens).length} |`);
}
assert.ok(coins>=25);
assert.equal(rollCapsule(mulberry32(22)).id,'c_gg');
const samples=128;
const goals=[10,25,40,50];
const milestones=new Map(goals.map(n=>[n,[]]));
const dupAt100=[],dupAt1000=[],drawCounts=[];
for(let seed=1;seed<=samples;seed++) {
  const rng=mulberry32(seed), owned=new Set();
  let draws=0;
  while((owned.size<50 || draws<1000)&&draws<50000) {
    const prize=rollCapsule(rng);draws++;
    const isNew=!owned.has(prize.id);owned.add(prize.id);
    if(isNew&&milestones.has(owned.size))milestones.get(owned.size).push(draws);
    if(draws===100)dupAt100.push((draws-owned.size)/draws);
    if(draws===1000)dupAt1000.push((draws-owned.size)/draws);
  }
  assert.equal(owned.size,50);drawCounts.push(draws);
}
const percentile=(a,p)=>[...a].sort((x,y)=>x-y)[Math.floor((a.length-1)*p)];
const distribution=goals.map(n=>{const a=milestones.get(n);return `| ${n} | ${percentile(a,.1)} | ${percentile(a,.5)} | ${percentile(a,.9)} |`;}).join('\n');
const average=a=>a.reduce((x,y)=>x+y,0)/a.length;
const simText=`## 抽奖与重复的固定种子模拟\n\n使用当前稀有度和 50 件目录、mulberry32 种子 1–128，128 次独立模拟；每次至少抽 1,000 次并继续到全收藏，最多 50,000 次（本次所有样本均完成）。未使用章节礼物、星尘兑换、金币限制或额外保底。因此只是纯随机奖池的基线，不能当作真实玩家完成周期。\n\n| 唯一收藏目标 | P10 所需抽数 | P50 所需抽数 | P90 所需抽数 |\n| ---: | ---: | ---: | ---: |\n${distribution}\n\n前 100 抽重复占比平均 ${(average(dupAt100)*100).toFixed(1)}%；前 1,000 抽平均 ${(average(dupAt1000)*100).toFixed(1)}%。这支持“扭蛋不能单独承担长期养成”的设计判断；确定礼物、星尘补缺和空间表达需要一起发挥作用。没有模拟用户回访率或好玩程度。\n\n演示专用种子 22 的首抽已验证为 c_gg，和前 3 章奖励不冲突；真实抽奖未使用该剧情种子。\n\n`;

let input={projects:[],lastTotals:{},coinResidue:0};
const replayRows=[];
for(const tokens of [100000,50000,100000]) {
 const next=computeSync(input,[{id:'restore',name:'restore',provider:'demo',tokens}]);
 replayRows.push(`| ${tokens.toLocaleString('en-US')} | ${next.coinsMinted} |`);
 input={projects:next.projects,lastTotals:next.lastTotals,coinResidue:next.coinResidue};
}
const broken=[];
for(const name of readdirSync('docs/v2').filter(f=>f.endsWith('.md'))) {
 const path=resolve('docs/v2',name);
 const body=readFileSync(path,'utf8');
 for(const m of body.matchAll(/\]\(([^)]+)\)/g)) {
  const link=m[1].split('#')[0];
  if(!link||/^(https?:|data:)/.test(link))continue;
  if(!existsSync(resolve(dirname(path),link)))broken.push(`${name}: ${link}`);
 }
}
assert.deepEqual(broken,[]);
const report=`# P0 静态规则验证记录\n\n运行命令：\`node scripts/verify-v2-plan.mjs\`。本记录由当前代码的纯规则计算生成，不读取、修改任何用户存档。\n\n## 已核对\n\n- 当前经济：10,000 token/币；25/225 抽；120 星尘兑换；稀有度权重合计 100。\n- 当前目录 50 件；七章的奖励 ID 全部存在。\n- 七章门槛、小光四阶段和机台七个曲线锚点与提案一致。\n- 文档相对文件链接存在。\n- 本轮新增 growth 模块仍是实验实现；本项仅证明数据对齐，不代表领奖流程验收。\n\n## 三次固定演示的计算结果\n\n| 累计 token | 本次新增金币 | 累计金币 | 机台等级 | 小光阶段 | 可领取章数 |\n| ---: | ---: | ---: | ---: | ---: | ---: |\n${tutorial.join('\n')}\n\n每一步同报告重放均产生 0 金币。第三次累计金币足够完成一次 25 币单抽。这只是脚本数值核对，尚未将当前随机演示程序替换为固定脚本。\n\n## 已复现的现实现差异：历史减少再恢复\n\n| 项目源累计 token | 此次现代码铸币 |\n| ---: | ---: |\n${replayRows.join('\n')}\n\n当前代码在源总量恢复时会再次对已结算区间铸币。V2 要求最后一步为 0；应在交易/高水位工作项修复，不能把本报告当成 V2 防重结算已通过。\n\n${simText}## 未完成的验证\n\n- 章节领取、批量领取、双标签交易、存储失败和模式切换中异步同步。\n- 真实点击闭环、同屏美术样板、移动端、用户试玩。\n\n静态规则核对通过不等于画面好看或游戏好玩。\n`;
writeFileSync('docs/v2/VALIDATION_REPORT.md',report);
console.log('P0 numeric checks and links passed; known history-restore double-credit reproduced.');
