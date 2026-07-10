/*
 * i18n — English / Simplified Chinese localization.
 *
 * Stable game IDs, rarity/type KEYS, sprite names, and storage keys are NEVER
 * localized — only display text. The dictionary is keyed by stable keys, not by
 * display strings. English content (collectible/achievement/rarity text) is
 * sourced from the content catalogs; Chinese lives in override maps here so the
 * English source stays single-authored.
 *
 * Canvas rendering: pixelFont.drawText auto-detects CJK and routes it to a
 * system CJK font via fillText, so screens can pass a localized string to the
 * same drawText call and Chinese never becomes `?`.
 */

import type { Locale, RarityKey, CollectibleType } from '../core/types';
import { RARITIES } from '../content/rarities';
import { byId as collectibleById } from '../content/collectibles';
import { ACHIEVEMENTS } from '../content/achievements';

export type { Locale };

// ---- active locale --------------------------------------------------------

let current: Locale = 'en';
const listeners = new Set<() => void>();

export function getLocale(): Locale {
  return current;
}
export function setLocale(l: Locale): void {
  if (l !== current) {
    current = l;
    listeners.forEach((cb) => cb());
  }
}
/** Subscribe to locale changes (DOM overlays re-render; canvas re-reads live). */
export function onLocaleChange(cb: () => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
/** Default locale from the browser: zh* -> zh-CN, else en. */
export function detectLocale(): Locale {
  const nav = typeof navigator !== 'undefined' ? navigator.language || '' : '';
  return nav.toLowerCase().startsWith('zh') ? 'zh-CN' : 'en';
}

// ---- UI dictionary --------------------------------------------------------

const UI: Record<string, { en: string; 'zh-CN': string }> = {
  'ui.arcadePlayer': { en: 'ARCADE PLAYER', 'zh-CN': '街机玩家' },
  'ui.lifetimeTokens': { en: 'LIFETIME TOKENS', 'zh-CN': '累计 TOKENS' },
  'ui.lifetime': { en: 'LIFETIME', 'zh-CN': '累计' },
  'ui.sync': { en: 'SYNC', 'zh-CN': '同步' },
  'ui.syncing': { en: 'SYNCING', 'zh-CN': '同步中' },
  'ui.cabinets': { en: 'CABINETS', 'zh-CN': '我的机台' },
  'ui.prizeWall': { en: 'PRIZE WALL', 'zh-CN': '奖品墙' },
  'ui.coinBank': { en: 'COIN BANK', 'zh-CN': '金币银行' },
  'ui.pull': { en: 'PULL', 'zh-CN': '抽取' },
  'ui.capsule': { en: 'CAPSULE', 'zh-CN': '扭蛋' },
  'ui.notEnoughCoins': { en: 'NOT ENOUGH COINS', 'zh-CN': '金币不足' },
  'ui.lockedPrize': { en: 'LOCKED PRIZE', 'zh-CN': '未解锁奖品' },
  'ui.lockedHint': { en: 'Keep pulling capsules to discover this slot.', 'zh-CN': '继续投币抽扭蛋，点亮这个格子。' },
  'ui.settings': { en: 'SETTINGS', 'zh-CN': '设置' },
  'ui.help': { en: 'HELP', 'zh-CN': '帮助' },
  'ui.sound': { en: 'Sound', 'zh-CN': '声音' },
  'ui.dataSource': { en: 'Data source', 'zh-CN': '数据来源' },
  'ui.frameRate': { en: 'Frame rate', 'zh-CN': '帧率' },
  'ui.fpsAuto': { en: 'AUTO', 'zh-CN': '自动' },
  'ui.resetProgress': { en: 'Reset progress', 'zh-CN': '重置进度' },
  'ui.reset': { en: 'RESET', 'zh-CN': '重置' },
  'ui.on': { en: 'ON', 'zh-CN': '开' },
  'ui.off': { en: 'OFF', 'zh-CN': '关' },
  'ui.close': { en: 'CLOSE', 'zh-CN': '关闭' },
  'ui.save': { en: 'SAVE', 'zh-CN': '保存' },
  'ui.view': { en: 'VIEW', 'zh-CN': '查看' },
  'ui.playerName': { en: 'Player name', 'zh-CN': '玩家名称' },
  'ui.editName': { en: 'EDIT NAME', 'zh-CN': '改名' },
  'ui.back': { en: 'BACK', 'zh-CN': '返回' },
  'ui.language': { en: 'Language', 'zh-CN': '语言' },
  'ui.achievement': { en: 'ACHIEVEMENT', 'zh-CN': '成就' },
  'ui.achievements': { en: 'ACHIEVEMENTS', 'zh-CN': '成就展示柜' },
  'ui.lockedAchievement': { en: 'LOCKED ACHIEVEMENT', 'zh-CN': '未解锁成就' },
  'ui.unlockedOn': { en: 'UNLOCKED {date}', 'zh-CN': '解锁于 {date}' },
  'ui.unlockedCount': { en: '{n} / {total} UNLOCKED', 'zh-CN': '已解锁 {n} / {total}' },
  'ui.spendCoins': { en: 'SPEND COINS!', 'zh-CN': '投币换奖励！' },
  'ui.earnCoins': { en: 'EARN COINS', 'zh-CN': '领取金币' },
  'ui.syncUsage': { en: 'SYNC USAGE', 'zh-CN': '同步用量' },
  'ui.insertCoin': { en: 'INSERT COIN', 'zh-CN': '投入金币' },
  'ui.tapToSync': { en: 'TAP TO SYNC', 'zh-CN': '点击同步' },
  'ui.allCaughtUp': { en: 'ALL CAUGHT UP', 'zh-CN': '已全部同步' },
  'ui.syncFailed': { en: 'SYNC FAILED', 'zh-CN': '同步失败' },
  'ui.noCabinets': { en: 'NO CABINETS YET', 'zh-CN': '还没有机台' },
  'ui.syncTo': { en: 'SYNC TO', 'zh-CN': '同步以' },
  'ui.powerUp': { en: 'POWER UP', 'zh-CN': '点亮你的' },
  'ui.yourMachines': { en: 'YOUR MACHINES', 'zh-CN': '我的机台' },
  'ui.tagline': { en: 'TURN TOKENS INTO COINS. UNLOCK COOL STUFF!', 'zh-CN': '把 TOKENS 变金币，解锁街机好物！' },
  'ui.tokensPerCoin': { en: '{n} TOKENS = 1 COIN', 'zh-CN': '{n} TOKENS = 1 金币' },
  'ui.newTokens': { en: 'NEW TOKENS +{n}', 'zh-CN': '新增 TOKENS +{n}' },
  'ui.coinsPlus': { en: '+{n} COINS', 'zh-CN': '+{n} 金币' },
  'ui.minusCoins': { en: '-{n}', 'zh-CN': '-{n}' },
  'ui.collected': { en: '{n} / {total} COLLECTED', 'zh-CN': '已收集 {n} / {total}' },
  'ui.projectCabinet': { en: 'PROJECT CABINET', 'zh-CN': '项目机台' },
  'ui.projectStats': { en: 'PROJECT STATS', 'zh-CN': '项目数据' },
  'ui.tokenPower': { en: 'TOKEN POWER', 'zh-CN': 'TOKEN 能量' },
  'ui.coinPower': { en: 'COIN POWER {x}', 'zh-CN': '金币加成 {x}' },
  'ui.nextLevel': { en: 'NEXT LEVEL', 'zh-CN': '下一级' },
  'ui.maxLevel': { en: 'MAX LEVEL', 'zh-CN': '满级' },
  'ui.levelUpSoon': { en: 'LEVEL UP SOON', 'zh-CN': '即将升级' },
  'ui.recentRewards': { en: 'RECENT REWARDS', 'zh-CN': '最近奖励' },
  'ui.tokensThisSync': { en: 'TOKENS THIS SYNC', 'zh-CN': '本次同步' },
  'ui.coinsMinted': { en: 'COINS MINTED', 'zh-CN': '已铸金币' },
  // Per-project derived value = floor(project.tokens / TOKENS_PER_COIN). Labeled
  // "BASE COINS" so it can't be read as the player's spendable wallet balance
  // (which is `ui.coins`); it does not include level-multiplier bonuses.
  'ui.baseCoins': { en: 'BASE COINS', 'zh-CN': '基础金币' },
  'ui.cabinetLevel': { en: 'CABINET LEVEL', 'zh-CN': '机台等级' },
  'ui.provider': { en: 'PROVIDER', 'zh-CN': '来源' },
  'ui.tokens': { en: 'TOKENS', 'zh-CN': 'TOKENS' },
  'ui.coins': { en: 'COINS', 'zh-CN': '金币' },
  'ui.newItem': { en: 'NEW!', 'zh-CN': '新获得！' },
  'ui.feedNew': { en: 'NEW', 'zh-CN': '新' },
  'ui.skip': { en: 'SKIP', 'zh-CN': '跳过' },
  'ui.dup': { en: 'DUPLICATE ×{n}', 'zh-CN': '重复 ×{n}' },
  'ui.dupShort': { en: 'DUPLICATE X{n}', 'zh-CN': '重复 ×{n}' },
  'ui.owned': { en: 'OWNED ×{n}', 'zh-CN': '已拥有 ×{n}' },
  'ui.unlockedBang': { en: 'UNLOCKED!', 'zh-CN': '已解锁！' },
  'ui.poweredUp': { en: '{name} POWERED UP', 'zh-CN': '{name} 升级了' },
  'ui.lvArrow': { en: 'LV {from} > LV {to}', 'zh-CN': 'LV {from} → LV {to}' },
  'ui.becameCabinet': { en: '{name} BECAME A {stage} CABINET', 'zh-CN': '{name} 进化为 {stage} 机台' },
  'ui.cabinet': { en: 'CABINET', 'zh-CN': '机台' },
  'ui.stageCabinet': { en: '{stage} CABINET', 'zh-CN': '{stage} 机台' },
  // stage names (used with " CABINET")
  'stage.starter': { en: 'STARTER', 'zh-CN': '入门' },
  'stage.powered': { en: 'POWERED', 'zh-CN': '通电' },
  'stage.deluxe': { en: 'DELUXE', 'zh-CN': '豪华' },
  'stage.neon': { en: 'NEON', 'zh-CN': '霓虹' },
  'stage.legendary': { en: 'LEGENDARY', 'zh-CN': '传说' },
  // shop
  'shop.pull1.label': { en: 'PULL', 'zh-CN': '抽取' },
  'shop.pull1.sub': { en: 'CAPSULE ×1', 'zh-CN': '扭蛋 ×1' },
  'shop.pull10.label': { en: 'PULL', 'zh-CN': '抽取' },
  'shop.pull10.sub': { en: 'CAPSULE ×10', 'zh-CN': '扭蛋 ×10' },
  'shop.sign.label': { en: 'NEON SIGN', 'zh-CN': '霓虹招牌' },
  'shop.sign.sub': { en: 'UNLOCK A SIGN', 'zh-CN': '解锁一个招牌' },
  'shop.frame.label': { en: 'PROFILE FRAME', 'zh-CN': '头像相框' },
  'shop.frame.sub': { en: 'UNLOCK A FRAME', 'zh-CN': '解锁一个相框' },
  'shop.theme.label': { en: 'ROOM THEME', 'zh-CN': '房间主题' },
  'shop.theme.sub': { en: 'UNLOCK A THEME', 'zh-CN': '解锁一个主题' },
  'shop.trophy.label': { en: 'TROPHY CARD', 'zh-CN': '奖杯卡' },
  'shop.trophy.sub': { en: 'UNLOCK A TROPHY', 'zh-CN': '解锁一个奖杯' },
  // help modal
  'help.title': { en: 'HOW TO PLAY', 'zh-CN': '玩法说明' },
  'help.l1': { en: 'SYNC to turn your AI coding tokens into coins.', 'zh-CN': '点击同步，把你的 AI 编码 tokens 变成金币。' },
  'help.l2': { en: 'Each project grows into its own arcade cabinet.', 'zh-CN': '每个项目都会长成一台专属街机。' },
  'help.l3': { en: 'Spend coins at the capsule machine for collectibles.', 'zh-CN': '在扭蛋机投币，抽收藏品。' },
  'help.l4': { en: 'Fill the prize wall and unlock achievements.', 'zh-CN': '填满奖品墙，解锁成就。' },
};

// ---- Chinese content overrides (English comes from the content catalogs) ---

const RARITY_ZH: Record<RarityKey, string> = {
  common: '普通',
  uncommon: '稀有',
  rare: '罕见',
  epic: '史诗',
  legendary: '传说',
};

const TYPE_ZH: Record<CollectibleType, string> = {
  badge: '徽章',
  sign: '招牌',
  decor: '装饰',
  buddy: '伙伴',
  frame: '相框',
  trophy: '奖杯',
  theme: '主题',
};

const ACH_ZH: Record<string, { name: string; desc: string }> = {
  first_coin: { name: '第一枚金币', desc: '第一枚金币入袋，模型热量开铸。' },
  warm_machine: { name: '机台预热', desc: '10K tokens 入炉，机台开始发光。' },
  neon_night: { name: '霓虹之夜', desc: '100K tokens 点亮整间街机厅。' },
  million: { name: '百万 Token 俱乐部', desc: '1M tokens 入账，正式加入大玩家席位。' },
  royalty: { name: '机台王者', desc: '任意机台冲到 Lv20，镇店之宝诞生。' },
  first_pull: { name: '第一次抽取', desc: '第一次拉下扭蛋机拉杆，命运开转。' },
  wall_starter: { name: '展示柜入门', desc: '10 件收藏品上墙，空柜子有故事了。' },
  dupe_luck: { name: '重复也是运气', desc: '5 次重复也不亏，余料都是资源。' },
  legendary_drop: { name: '传说掉落', desc: '传说物品出仓，值得停下来看一眼。' },
};

const COL_ZH: Record<string, { name: string; desc: string }> = {
  c_smiley: { name: '笑脸芯片', desc: '一枚憨笑的小芯片，始终坚信下一次构建亮的是绿灯。' },
  c_token: { name: 'Token 芯片', desc: '从 token 流里溜出来的一点小火花，被你顺手收进了口袋。' },
  c_heart: { name: '像素之心', desc: '一颗像素心脏，一秒只跳 30 下，可每一下都很走心。' },
  c_gg: { name: 'GG 横幅', desc: '险胜、大胜，还是稀里糊涂就通关——都值得挂它庆祝一下。' },
  c_mug: { name: '街机马克杯', desc: '杯底沉着凉透的咖啡，和一个硬撑到凌晨的点子。' },
  c_sprout: { name: '小树苗', desc: '用没烧完的 token 浇出来的小苗，想让它活，就少开几个标签页。' },
  u_star: { name: 'Debug 之星', desc: '颁给那些刚吐槽完，一转头就把 bug 揪出来的人。' },
  u_luckycoin: { name: '幸运币', desc: '写高风险 prompt 前抛一下，它两面都写着「发就完事了」。' },
  u_shelf: { name: '代码书架', desc: '塞满了各种说明书，讲的全是没人再敢动的老系统。' },
  u_1up: { name: '1UP 旗', desc: '删错一行代码的那一刻，帮你原地满血复活。' },
  u_gemc: { name: '青色缓存宝石', desc: '一小块在上下文压缩里死里逃生的清凉记忆。' },
  r_cat: { name: '招手桌猫', desc: '对你每个新点子拼命招手，好像这个迭代是它自掏腰包赞助的。' },
  r_palm: { name: '专注棕榈', desc: '往角落一摆，整个工位瞬间多了几分心无旁骛的气质。' },
  r_gameover: { name: 'Game Over 牌', desc: '专为十分钟前就修好的 bug 准备，仪式感直接拉满。' },
  r_stool: { name: '机台凳', desc: '高度刚好，让你能体面地坐着，盯着转圈的进度条出神。' },
  r_rug: { name: '星星地毯', desc: '手气爆棚的抽卡和离谱到家的工期，都是在这块毯子上发生的。' },
  r_frame: { name: '青色头像框', desc: '给你的街机战绩，镶上一圈干净利落的青色霓虹边。' },
  e_rainbowcat: { name: '彩虹街机猫', desc: '每当代码莫名其妙就跑通了，它就会悄悄现身。' },
  e_astro: { name: '太空巡警', desc: '在你那一堆没写完的支线任务外围，日夜巡逻。' },
  e_minicab: { name: '迷你机台', desc: '一台专门摆在机台上的迷你机台。毫无必要，但就是上头。' },
  e_trophy: { name: '金奖杯', desc: '证明那些烧掉的 token，偶尔真能换回一点点荣光。' },
  e_sunset: { name: '日落房间主题', desc: '把整间街机厅染成暖金色，连「再重构一次」都突然能忍了。' },
  e_gemu: { name: '紫水晶缓存宝石', desc: '一块难得的紫色记忆，里面还隐约留着当初那个思路。' },
  l_crown: { name: '霓虹皇冠', desc: '献给把满屏 token 一路烧成街机之王的那个人。' },
  l_trophy: { name: '冠军奖杯', desc: '沉甸甸、亮闪闪——一看就知道，背后烧掉了多少 token。' },
  l_egg: { name: '龙蛋', desc: '摸上去暖暖的。至于拿什么喂大的，还是别问了。' },
  l_forest: { name: '森林房间主题', desc: '一片幽静的树林，背后是一笔谁都不敢细算的算力。' },
};

// ---- lookups --------------------------------------------------------------

/** Translate a UI key, filling {param} placeholders. Falls back to en / key. */
export function t(key: string, params?: Record<string, string | number>): string {
  const entry = UI[key];
  let s = entry ? entry[current] ?? entry.en : key;
  if (params) {
    for (const k in params) s = s.split('{' + k + '}').join(String(params[k]));
  }
  return s;
}

export function tRarity(key: RarityKey): string {
  return current === 'zh-CN' ? RARITY_ZH[key] : RARITIES[key].label;
}
export function tType(type: CollectibleType): string {
  return current === 'zh-CN' ? TYPE_ZH[type] ?? String(type) : String(type).toUpperCase();
}
export function tCollectibleName(id: string): string {
  const en = collectibleById[id]?.name ?? id;
  return current === 'zh-CN' ? COL_ZH[id]?.name ?? en : en;
}
export function tCollectibleDesc(id: string): string {
  const en = collectibleById[id]?.description ?? '';
  return current === 'zh-CN' ? COL_ZH[id]?.desc ?? en : en;
}
export function tAchName(id: string): string {
  const en = ACHIEVEMENTS.find((a) => a.id === id)?.name ?? id;
  return current === 'zh-CN' ? ACH_ZH[id]?.name ?? en : en;
}
export function tAchDesc(id: string): string {
  const en = ACHIEVEMENTS.find((a) => a.id === id)?.desc ?? '';
  return current === 'zh-CN' ? ACH_ZH[id]?.desc ?? en : en;
}
export function tStageName(key: string): string {
  return t('stage.' + key);
}

/** Localized date (unlock dates). ISO string -> short local date. */
export function fmtDate(iso: string): string {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat(current, { year: 'numeric', month: 'short', day: 'numeric' }).format(d);
  } catch {
    return iso.slice(0, 10);
  }
}
