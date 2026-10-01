import {ORDERS,GOODS,RECIPES,PRODUCTION_KINDS,stationRun,availableGoods,orderStatus,productionLabel,type Good} from './village';
import {missingHomeNeeds} from './home-needs';
import { farmChains, FARM_LABELS, bakeryMaterialLabel } from './farming';
import { keyboardIntent, keyboardPan } from './keyboard-input';
import { worldTime } from './world-time';
import { createElement, Coins, RefreshCw, House, Route, Move, ClipboardList, Puzzle, BookOpen, Settings, X, ArrowLeft, ArrowRight, RotateCw, ZoomIn, ZoomOut, Focus, Check, Lock, Star, TreeDeciduous, Coffee, Wheat, ArrowUpRight, Volume2, VolumeX, Sun, Moon, Sunset, Sunrise, Download, Upload, Archive, MousePointer2, Eraser, Flag, Hammer, ChevronRight, Sparkles, MapPin, Info } from 'lucide';
import type { IconNode } from 'lucide';
import { levelInfo, stageForLevel } from '../domain/levels';
import { fmtCompact } from '../domain/economy';
import { fetchLive } from '../data/liveSource';
import { CATALOG, CHAPTERS, CHAPTER_COSMETICS, STAGE_NAMES, STAGE_COLORS } from './catalog';
import { TownStore } from './store';
import { visualVariant, parkRange, serviceDefinition, activeChapter, canPlace, chapterGoals, dimensions, evaluate, starsForChapter, subsidyEntitlement } from './world';
import { buildingCoverage, buildingLabel, needFeedback, progressHint } from './service-feedback';
import type { Need } from './service-feedback';
import { PUZZLES, puzzleGoals, puzzleBonusGoals, puzzleStars } from './puzzles';
import type { Building, BuildingKind, Cell, Evaluation, Goal } from './types';
import { TownScene } from './scene';
import type { Tool } from './scene';

type Panel = 'build' | 'inventory' | 'quests' | 'puzzles' | 'book' | 'settings' | 'detail' | 'history' | 'production' | 'orders' | null;
const iconNodes: Record<string, IconNode> = { Coins, RefreshCw, House, Route, Move, ClipboardList, Puzzle, BookOpen, Settings, X, ArrowLeft, ArrowRight, RotateCw, ZoomIn, ZoomOut, Focus, Check, Lock, Star, TreeDeciduous, Coffee, Wheat, ArrowUpRight, Volume2, VolumeX, Sun, Moon, Sunset, Sunrise, Download, Upload, Archive, MousePointer2, Eraser, Flag, Hammer, ChevronRight, Sparkles, MapPin, Info };
const iconCache = new Map<string, string>();
function icon(name: string): string { if (!iconCache.has(name)) iconCache.set(name, createElement(iconNodes[name], { width: 20, height: 20, 'stroke-width': 1.65, 'aria-hidden': 'true' }).outerHTML); return iconCache.get(name)!; }
export const escapeHTML = (v: string): string => String(v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const stars = (n: number) => `<span class="stars" aria-label="${n} 颗星">${[0, 1, 2].map(i => `<span class="${i < n ? 'earned' : ''}">${icon('Star')}</span>`).join('')}</span>`;
const button = (action: string, label: string, symbol = '', cls = '', attrs = '') => `<button type="button" data-action="${action}" class="${cls}" ${cls.includes('icon-only') ? `aria-label="${escapeHTML(label)}"` : ''} ${attrs}>${symbol ? icon(symbol) : ''}<span>${label}</span></button>`;
export class TownUI {
  readonly scene: TownScene;
  private panel: Panel = null; private category = 'homes'; private selectedId: string | null = null;
  private tool: Tool = 'inspect'; private pendingKind: BuildingKind | null = null; private pendingId: string | undefined; private rotation = 0;
  private hoverCell: Cell = { x: 6, z: 17 }; private busy = false; private toastTimer = 0; private coordinateOpen = false;
  private toastMessage = ''; private toastUntil = 0;
  private e: Evaluation; private progressPanel = 0; private notice = ''; private modeChanged = false;
  private heldKeys = new Set<string>(); private heldCameraButton = false; private ignoreCameraClickUntil = 0;
  constructor(private root: HTMLElement, readonly store: TownStore, canvas: HTMLCanvasElement) {
    this.e = evaluate(store.board);
    this.scene = new TownScene(canvas, { select: id => this.select(id), cell: (x, z) => this.onCell(x, z), hover: p => this.onHover(p), strokeEnd: () => this.scene.sound(390), cancel: () => { this.resetTool(); this.panel = null; this.render(); }, assetsReady: () => this.render(), clock: (seconds,save) => this.store.clock(seconds,save) });
    store.subscribe(() => { this.e = evaluate(store.board); if (store.conflict) { this.notice = '已载入另一个窗口保存的最新进度，请重新选择操作'; store.conflict = false; this.resetTool(); } this.render(); });
    root.addEventListener('click', e => { const el = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-action]'); if (el && !el.disabled) void this.action(el.dataset.action!, el); });
    root.addEventListener('focusin', e=>{if((e.target as HTMLElement).closest('input,select,textarea,[contenteditable]')){this.heldKeys.clear();this.syncCameraKeys();}});
    root.addEventListener('change', e => this.change(e));
    root.addEventListener('pointerdown', e => { const el = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-action]'); if (e.button === 0 && /^camera-(left|right)$/.test(el?.dataset.action || '')) { e.preventDefault(); this.heldCameraButton = true; this.scene.holdRotate(el!.dataset.action === 'camera-left' ? -1 : 1); } });
    const stopCameraButton = () => { if (this.heldCameraButton) { this.heldCameraButton = false; this.ignoreCameraClickUntil = Date.now() + 400; this.syncCameraKeys(); } };
    window.addEventListener('pointerup', stopCameraButton); window.addEventListener('pointercancel', stopCameraButton);
    let drag: { x: number; y: number; action: string; started: boolean } | null = null;
    root.addEventListener('pointerdown', e => { const el = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-action]'); if (e.button === 0 && el && !el.disabled && /^(buy|place-owned):/.test(el.dataset.action!)) drag = { x: e.clientX, y: e.clientY, action: el.dataset.action!, started: false }; });
    window.addEventListener('pointermove', e => {
      if (!drag) return;
      if (!drag.started && Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 8) { drag.started = true; void this.action(drag.action, document.createElement('button')); }
      if (drag.started) { e.preventDefault(); this.scene.previewAt(e.clientX, e.clientY); }
    });
    window.addEventListener('pointerup', e => { const completed = drag; drag = null; if (completed?.started) { e.preventDefault(); this.scene.placeAt(e.clientX, e.clientY); } });
    window.addEventListener('pointercancel', () => { drag = null; });
    window.addEventListener('keydown', e => this.keydown(e));
    window.addEventListener('keyup', e => { this.heldKeys.delete(e.key.toLowerCase()); this.syncCameraKeys(); });
    window.addEventListener('blur', () => { this.heldKeys.clear(); this.heldCameraButton = false; this.scene.holdRotate(0); this.scene.holdPan(0, 0); });
    document.addEventListener('visibilitychange', () => { if (document.hidden) { this.heldKeys.clear(); this.heldCameraButton = false; this.scene.holdRotate(0); this.scene.holdPan(0, 0); } });
    window.addEventListener('pagehide',()=>this.store.commit(false));
    this.render();
  }
  private thumbnail(b: BuildingKind, variant = 0, stage = 0): string { return `<img class="model-preview" src="${this.scene.thumbnail(b, variant, stage)}" alt="${CATALOG[b].name}" draggable="false"/>`; }
  private resetTool(): void { this.tool = 'inspect'; this.pendingKind = null; this.pendingId = undefined; this.rotation = 0; this.coordinateOpen = false; this.syncCameraKeys(); this.scene.setTool('inspect', null, 0); }
  private setTool(tool: Tool, kind: BuildingKind | null = null, id?: string): void {
    this.tool = tool; this.pendingKind = kind; this.pendingId = id; this.syncCameraKeys();
    const b = id ? this.store.board.buildings.find(b => b.id === id) : undefined; this.rotation = b?.rotation || 0;
    const project = b?.projectId ? this.store.state.projects.find(p => p.id === b.projectId) : undefined;
    this.scene.setTool(tool, kind, this.rotation, project ? stageForLevel(levelInfo(project.tokens).level).index : 0,b?visualVariant(b,this.store.state):0);
    if (tool === 'road' || tool === 'erase') this.panel = null;
    this.render();
  }
  private select(id: string | null): void {
    if (!id) { this.selectedId = null; this.scene.select(null); if (this.panel === 'detail') this.panel = null; this.render(); return; }
    this.selectedId = id; this.scene.select(id);
    if (this.tool === 'move') { const b = this.store.board.buildings.find(b => b.id === id)!; this.setTool('move', b.kind, id); this.panel = null; }
    else { this.resetTool(); this.panel = 'detail'; }
    this.render();
  }
  private onHover(cell: Cell | null): void {
    if (cell) this.hoverCell = cell;
    const label = document.getElementById('placement-status');
    if (!label || !cell) return;
    const candidate = this.pendingKind ? { id: this.pendingId || 'preview', kind: this.pendingKind, x: cell.x, z: cell.z, rotation: this.rotation, placed: true, variant: 0 } as Building : null;
    const invalid = candidate ? canPlace(this.store.state, this.store.board, candidate) : null;
    label.textContent = invalid || `横 ${cell.x + 1} · 纵 ${cell.z + 1}${candidate ? ' · 点击放置' : ' · 拖动铺路'}`;
    label.classList.toggle('invalid', Boolean(invalid)); this.scene.setPreviewValid(!invalid);
  }
  private onCell(x: number, z: number): void {
    if (this.tool === 'road' || this.tool === 'erase') {
      const error = this.store.road(x, z, this.tool === 'erase'); if (error) this.toast(error); else if (x === 6 && z === 17 && this.store.board.terrain === 'valley' && this.e.food >= 4) this.toast('道路接通了，面包已经送到四户邻居家');
    } else if (this.pendingKind) {
      const placedId = this.pendingId; const error = this.store.place(this.pendingKind, x, z, this.rotation, placedId);
      if (error) { this.toast(error); return; }
      this.scene.celebrate('building', { x: x + .5, z: z + .5 });
      if (placedId) { const next = this.store.activePuzzle && this.store.board.buildings.find(b => b.kind === this.pendingKind && !b.placed); this.resetTool(); this.panel = null; if (next) this.setTool('move', next.kind, next.id); }
      this.selectedId = null; this.scene.select(null); this.render(); this.toast('落成了。接上门前的道路，让生活开始');
    }
  }
  private toolbar(): string {
    return `<nav class="town-toolbar" aria-label="城镇工具">${button('inspect', '浏览', 'MousePointer2', this.tool === 'inspect' && !this.panel ? 'active' : '')}${button('build', this.store.activePuzzle ? '建筑' : '建设', 'House', this.panel === 'build' || this.panel === 'inventory' ? 'active' : '')}${button('road', '铺路', 'Route', this.tool === 'road' ? 'active' : '')}${button('move', '搬迁', 'Move', this.tool === 'move' ? 'active' : '')}<i class="toolbar-divider"></i>${button('quests', '委托', 'ClipboardList', this.panel === 'quests' ? 'active' : '')}${button('puzzles', '规划关', 'Puzzle', this.panel === 'puzzles' ? 'active' : '')}${!this.store.activePuzzle ? button('production', '农事', 'Wheat', this.panel === 'production' ? 'active' : '') : ''}${!this.store.activePuzzle?button('orders','邻里','ClipboardList',this.panel==='orders'?'active':''):''}${button('book', '图鉴', 'BookOpen', this.panel === 'book' ? 'active' : '')}</nav>`;
  }
  private goalHTML(goals: Goal[]): string { return `<ul class="goal-list">${goals.map(g => `<li class="${g.met ? 'met' : ''}"><span class="goal-check">${icon(g.met ? 'Check' : 'Flag')}</span><span>${g.label}</span><small>${g.need > 1 ? `${Math.min(g.current, g.need)}/${g.need}` : g.met ? '完成' : '待完成'}</small></li>`).join('')}</ul>`; }
  private currentGoal(): string {
    const p = this.store.puzzle;
    if (p) return `<aside class="goal-card puzzle-goal"><span class="small-label">${icon('Puzzle')} 免费规划关</span><h2>${p.title}</h2>${this.goalHTML(puzzleGoals(p, this.e))}<div class="goal-meta"><span>道路 <b>${this.e.roadCount}/${p.roadBudget}</b></span>${stars(puzzleStars(p, this.e))}</div>${button('claim-puzzle', '评定这个方案', 'Check', 'primary small', puzzleStars(p, this.e) <= (this.store.state.puzzleStars[p.id] || 0) ? 'disabled' : '')}<p class="quiet-note">使用固定库存，不消耗主城金币</p></aside>`;
    const completed = this.store.state.chapterStars.every(n => n > 0), ch = activeChapter(this.store.state), c = CHAPTERS[ch - 1], goals = chapterGoals(ch, this.e);
    return `<aside class="goal-card"><div class="chapter-row"><span class="small-label">${icon('Flag')} ${completed ? '自由发展' : `第 ${ch} 章 / 6`}</span>${button('quests', '查看委托', 'ArrowUpRight', 'icon-only')}</div><h2>${completed ? '这就是我们的河谷' : c.title}</h2>${completed ? '<p>继续建造、挑战三星，给每个项目留一个好位置。</p>' : this.goalHTML(goals.base)}<div class="chapter-progress">${[1, 2, 3, 4, 5, 6].map(i => `<span class="${this.store.state.chapterStars[i - 1] ? 'done' : i === ch ? 'current' : ''}"></span>`).join('')}</div>${!completed && starsForChapter(ch, this.e) > this.store.state.chapterStars[ch - 1] ? button('claim-current', '完成委托', 'Check', 'primary small') : `<p class="quiet-note">${this.e.population} 位邻居 · ${this.e.food} 栋住宅获得食物</p><p class="goal-hint">${completed?'':progressHint(ch, this.store.board, this.e)}</p>`}</aside>`;
  }
  private onboarding(): string {
    if (this.store.state.tutorialDone || this.store.activePuzzle) return '';
    return `<aside class="welcome-card"><button class="welcome-close icon-only" data-action="dismiss-tutorial" aria-label="关闭引导">${icon('X')}</button><span class="small-label">第一次来到河谷</span><h3>一段工作，一点小镇的变化。</h3><p>token 换成金币，金币买来建筑。接好道路、照顾邻居，再把河谷慢慢变成你的样子。</p><div class="welcome-steps"><span>${icon('RefreshCw')} 同步</span>${icon('ChevronRight')}<span>${icon('House')} 建设</span>${icon('ChevronRight')}<span>${icon('Flag')} 解锁</span></div><div class="welcome-actions">${button('connect-start', this.e.food >= 4 ? '看看第一份委托' : '接通门前最后一格路', 'Route', 'primary small')}${this.store.state.mode === 'live' ? button('demo', '先玩演示', '', 'text-button') : ''}</div><small>可随时离开，进度会自动保存。</small></aside>`;
  }
  private toolRibbon(): string {
    if (this.tool === 'inspect') return '';
    const names = { inspect: '浏览', road: '铺设道路', erase: '擦除道路', place: '放置建筑', move: '搬迁建筑' };
    return `<section class="tool-ribbon"><div><b>${this.pendingKind ? `${this.pendingId ? '摆放' : '建设'}${CATALOG[this.pendingKind].name}` : names[this.tool]}</b><span id="placement-status">${this.tool === 'move' && !this.pendingKind ? '先点击你想搬迁的建筑' : '移动鼠标预览 · 左键落地 · 右键取消'}</span></div>${this.pendingKind ? `<small class="rotation-hint">Q / E · 朝${['南','西','北','东'][this.rotation]}</small>` : ''}${this.pendingKind ? button('rotate-preview', '旋转', 'RotateCw', 'ribbon-button') : this.tool === 'road' || this.tool === 'erase' ? button('toggle-erase', this.tool === 'erase' ? '铺路' : '擦除', this.tool === 'erase' ? 'Route' : 'Eraser', 'ribbon-button') : ''}${button('coordinates', '精确定位', 'MapPin', 'ribbon-button')}${button('inspect', '完成', 'Check', 'ribbon-button')} ${this.coordinateOpen ? `<form id="placement-form"><label>横格<input name="x" aria-label="横格" type="number" min="1" max="${this.store.board.size}" value="${this.hoverCell.x + 1}" /></label><label>纵格<input name="z" aria-label="纵格" type="number" min="1" max="${this.store.board.size}" value="${this.hoverCell.z + 1}" /></label>${button('place-coordinates', this.pendingKind ? '在此放置' : this.tool === 'erase' ? '擦除此格' : '铺设此格', '', 'primary small')}<small>建筑左上角的格子；Q / E 旋转，Esc 结束</small></form>` : ''}</section>`;
  }
  private header(): string {
    const s = this.store.state;
    return `<header class="town-header"><div class="brand">${icon('House')}<div><h1>Token Town</h1><span>${this.store.activePuzzle ? '河谷规划桌' : '你的河谷小镇'}</span></div></div><div class="header-actions">${this.store.activePuzzle ? button('leave-puzzle', '回到小镇', 'ArrowLeft', 'back-town') : ''}<div class="coin-wallet" aria-label="金币余额">${icon('Coins')}<strong data-testid="coin-balance">${s.coins.toLocaleString('zh-CN')}</strong><span>金币</span></div>${button('sync', this.busy ? '读取中' : s.mode === 'demo' ? '收集演示 token' : '同步 token', 'RefreshCw', 'sync-button', `aria-label="${this.busy ? '读取中' : s.mode === 'demo' ? '收集演示 token' : '同步 token'}" ${this.busy ? 'disabled' : ''}`)}${button('settings', '设置', 'Settings', 'icon-only settings-button')}</div></header><div class="mode-indicator">${s.mode === 'demo' ? '<span class="mode-dot demo-dot"></span>演示城镇' : '<span class="mode-dot"></span>本地城镇'}${button(s.mode === 'demo' ? 'live' : 'demo', s.mode === 'demo' ? '切换真实记录' : '试试演示', '', 'text-button')}${s.history === 'ready' ? `<span class="last-sync">${s.projects.length} 个项目为这里供能</span>` : ''}<span id="world-clock" class="world-clock">${worldTime(s.worldSeconds,s.settings).label}</span></div>`;
  }
  private cameraControls(): string {
    return `<div class="camera-controls" aria-label="镜头控制">${button('camera-left', '左转镜头', 'ArrowLeft', 'icon-only')}${button('camera-right', '右转镜头', 'ArrowRight', 'icon-only')}<i></i>${button('zoom-in', '放大', 'ZoomIn', 'icon-only')}${button('zoom-out', '缩小', 'ZoomOut', 'icon-only')}${button('overview', '俯瞰河谷', 'MapPin', 'icon-only')}${button('focus', '回到小镇', 'Focus', 'icon-only')}</div><span class="camera-hint">${this.store.state.settings.cameraInput === 'trackpad' ? 'WASD 移动 · 两指转动 · 捏合缩放' : 'WASD 移动 · 滚轮缩放 · Q / E 转镜头'}</span>`;
  }
  render(): void {
    const previousPanel=this.root.querySelector('.town-panel'),panelName=previousPanel?.getAttribute('aria-label'),scroll=previousPanel?.querySelector('.panel-content')?.scrollTop||0;
    const focusSetting=(document.activeElement as HTMLElement|null)?.dataset.setting;
    const board = this.store.board; this.scene.setWorld(this.store.state, board, this.e);
    this.root.innerHTML = `${this.header()}${this.homeBubbles()}${this.currentGoal()}${this.onboarding()}${this.toolbar()}${this.toolRibbon()}${this.cameraControls()}${this.panel ? this.panelHTML() : ''}<div id="town-toast" class="${Date.now() < this.toastUntil ? 'visible' : ''}" role="status" aria-live="polite">${Date.now() < this.toastUntil ? `${icon('Sparkles')}<span>${escapeHTML(this.toastMessage)}</span>` : ''}</div>${this.store.persistenceError || this.notice ? `<div class="save-notice" role="alert">${escapeHTML(this.store.persistenceError || this.notice)}</div>` : ''}`;
    this.scene.positionHomeBubbles(this.root);
    this.scene.select(this.selectedId); this.onHover(this.hoverCell);
    const nextPanel=this.root.querySelector('.town-panel');if(nextPanel&&nextPanel.getAttribute('aria-label')===panelName){const content=nextPanel.querySelector('.panel-content');if(content)content.scrollTop=scroll;if(focusSetting)this.root.querySelector<HTMLElement>(`[data-setting="${focusSetting}"]`)?.focus({preventScroll:true});}
  }
  private homeBubbles():string {
    const symbols:Record<string,string>={道路:'Route',食物:'Wheat',绿地:'TreeDeciduous',休闲:'Coffee'};
    const chapter=this.store.puzzle?3:activeChapter(this.store.state);
    return `<div class="home-needs-layer" aria-label="住宅缺失需求">${missingHomeNeeds(this.store.board,this.e,chapter,!this.store.puzzle||this.store.puzzle.leisureGoal>0).map(({home,needs})=>`<button class="home-need-bubble" data-home-need="${escapeHTML(home.id)}" data-action="find:${escapeHTML(home.id)}" title="${escapeHTML(buildingLabel(home))}：缺少${needs.join('、')}" aria-label="${escapeHTML(buildingLabel(home))}：缺少${needs.join('、')}">${needs.map(n=>icon(symbols[n])).join('')}</button>`).join('')}</div>`;
  }
  private panelHTML(): string {
    const titles: Record<Exclude<Panel, null>, string> = { build: '建一点新生活', inventory: '已经属于你的', quests: '河谷委托', puzzles: '河谷规划桌', book: '小镇图鉴', production: '从田野到餐桌', orders:'邻里心愿', settings: '小镇设置', detail: '建筑详情', history: '让工作点亮河谷' };
    let content = '';
    if (this.panel === 'build') content = this.buildPanel();
    else if (this.panel === 'inventory') content = this.inventoryPanel();
    else if (this.panel === 'quests') content = this.questPanel();
    else if (this.panel === 'puzzles') content = this.puzzlePanel();
    else if (this.panel === 'book') content = this.bookPanel();
    else if (this.panel === 'production') content = this.productionPanel()+this.villagePanel();
    else if(this.panel==='orders')content=this.orderPanel();
    else if (this.panel === 'settings') content = this.settingsPanel();
    else if (this.panel === 'detail') content = this.detailPanel();
    else content = `<div class="empty-records">${icon('RefreshCw')}<h3>${this.notice ? '这次还没有读到记录' : '还没找到本地 token 历史'}</h3><p>起步建筑和规划关都能继续玩。有 Claude Code、Codex、Kimi Code 或 DeepSeek Harness 的本地使用记录时，再同步到这座城镇。</p>${button('sync', '重新读取本地记录', 'RefreshCw', 'primary')}${button('demo', '进入独立演示城镇', 'Puzzle', 'secondary')}<small>演示金币与真实存档分开保存。</small></div>`;
    return `<aside class="town-panel ${this.panel === 'settings' ? 'settings-panel' : ''}" aria-label="${titles[this.panel!]}"><div class="panel-heading"><div><span class="small-label">${this.store.activePuzzle ? '规划关' : '河谷小镇'}</span><h2>${titles[this.panel!]}</h2></div>${button('close-panel', '关闭面板', 'X', 'icon-only')}</div><div class="panel-content">${content}</div></aside>`;
  }
  private buildPanel(): string {
    return `<div class="panel-tabs">${[['homes', '住宅'], ['production', '农事'], ['services', '服务'], ['landmarks', '地标'], ['decor', '装饰']].map(([id, name]) => button(`category:${id}`, name, '', this.category === id ? 'active' : '')).join('')}</div><p class="panel-note">点击建筑，模型会跟随鼠标；也可以直接拖到空地。左键放置，Q / E 旋转，右键取消。</p><div class="catalog-grid">${Object.values(CATALOG).filter(d => d.category === this.category && d.kind !== 'hall' && d.kind !== 'workshop').map(d => {
      const available = this.store.unlockedKind(d.kind), p = PUZZLES.find(p => p.reward === d.kind),order=ORDERS.find(o=>o.reward===d.kind);
      return `<button data-action="buy:${d.kind}" class="catalog-item ${available ? '' : 'locked'} ${this.pendingKind === d.kind && !this.pendingId ? 'selected' : ''}" ${available ? '' : 'disabled'}>${this.thumbnail(d.kind)}<b>${d.name}</b><span class="catalog-price">${icon(available ? 'Coins' : 'Lock')}${available ? d.cost : order?`邻里心愿` : p ? `规划关 ${PUZZLES.indexOf(p) + 1}` : `第 ${d.chapter} 章`}</span><small>${d.w} × ${d.d} 格${d.service ? ` · ${serviceDefinition(this.store.board,d.kind).capacity} 户` : ''}</small></button>`;
    }).join('')}</div>${button('inventory', `已收纳 ${this.store.board.buildings.filter(b => !b.placed).length} 栋 · 免费摆放`, 'Archive', 'inventory-link')}`;
  }
  private inventoryPanel(): string {
    const board = this.store.board, stash = board.buildings.filter(b => !b.placed);
    const kinds = Array.from(new Set(stash.map(b => b.kind)));
    return `<p class="panel-note">${this.store.activePuzzle ? '本关所有建筑已经准备好。自由摆放、搬迁；铺路也免费。' : '收纳只是把建筑暂时放回仓库。已有建筑可以免费再次摆放。'}</p>${kinds.length ? `<div class="inventory-list">${kinds.map(kind => {
      const items = stash.filter(b => b.kind === kind), b = items[0], project = b.projectId ? this.store.state.projects.find(p => p.id === b.projectId) : undefined;
      return `<button data-action="place-owned:${b.id}" class="inventory-row">${this.thumbnail(kind, visualVariant(b,this.store.state), project ? stageForLevel(levelInfo(project.tokens).level).index : 0)}<span><b>${project ? escapeHTML(project.name) : CATALOG[kind].name}</b><small>${items.length} 栋可摆放 · 免费</small></span>${icon('ArrowUpRight')}</button>`;
    }).join('')}</div>` : `<div class="empty-state">${icon('Archive')}<p>现在没有收纳的建筑。</p><small>点击城镇中的建筑，即可免费搬迁或收纳。</small></div>`}${!this.store.activePuzzle ? button('build', '看看新的建筑', 'House', 'secondary') : `<div class="puzzle-help"><h3>再争取两颗星</h3>${this.goalHTML(puzzleBonusGoals(this.store.puzzle!, this.e))}<h3>规划提示</h3><p>建筑门口的高亮格要接上道路。镇公所是道路起点，食物与休闲服务沿道路传递。</p>${button('puzzle-hint', '给我一点提示', 'Info', 'secondary')}${button('restart-puzzle', '重新布置这一关', 'RotateCw', 'text-button')}</div>`}`;
  }
  private questPanel(): string {
    const current = activeChapter(this.store.state), index = this.progressPanel || current, c = CHAPTERS[index - 1], goals = chapterGoals(index, this.e), possible = starsForChapter(index, this.e), earned = this.store.state.chapterStars[index - 1];
    if (this.store.activePuzzle) return this.puzzlePanel();
    return `<div class="chapter-selector">${CHAPTERS.map(ch => button(`chapter:${ch.id}`, String(ch.id), '', ch.id === index ? 'active' : '', ch.id > current ? 'disabled' : '')).join('')}</div><div class="chapter-title"><h3>${c.title}</h3>${stars(earned)}</div><p class="story">${c.story}</p><h4>这一章的目标</h4>${this.goalHTML(goals.base)}${this.coverageAudit(index)}<h4>再好一点</h4>${this.goalHTML(goals.bonus)}<div class="reward-line">${icon('Sparkles')}<span>${c.reward}<small>首次完成补贴 ${c.subsidy} 金币</small><small>额外星级：解锁${CATALOG[CHAPTER_COSMETICS[index - 1]].name}配色，荣誉花园亮起纪念星</small></span></div>${button(`claim-chapter:${index - 1}`, possible > earned ? '完成目标并领取奖励' : earned ? '已记录这份成果' : '先让目标亮起来', 'Check', 'primary', possible <= earned ? 'disabled' : '')}<p class="panel-note">已获得的星级不会消失。金币补贴最多为 token 金币的 20%，未结算部分会在后续同步时补发。</p>`;
  }
  private puzzlePanel(): string {
    return `<p class="panel-note">三五分钟，一道小小的规划题。固定库存，不消耗金币，也不用等待 token。</p><div class="puzzle-list">${PUZZLES.map((p, i) => `<button data-action="puzzle:${p.id}" class="puzzle-row"><span class="puzzle-number">${i + 1}</span><span class="puzzle-copy"><small>${p.family}</small><b>${p.title}</b><span>${p.description}</span>${stars(this.store.state.puzzleStars[p.id] || 0)}</span>${icon('ChevronRight')}</button>`).join('')}</div><div class="reward-explanation">${icon('Sparkles')}<p>首次通关解锁装饰蓝图，三星解锁新配色。蓝图带回主城，用金币建造。</p></div>`;
  }
  private bookPanel(): string {
    const s = this.store.state;
    return `<section class="book-section"><h3>项目工坊 <span>${s.projects.length}</span></h3><p class="panel-note">下面这些是 AI 项目工坊，不是住宅或商店。每个名称来自你的项目文件夹，点击可定位或摆放。工坊随项目 token 升级，共 50 级、五个外观阶段；不提供住宅服务或金币倍率。</p>${s.projects.length ? s.projects.map(p => {
      const info = levelInfo(p.tokens), b = s.town.buildings.find(b => b.projectId === p.id)!;
      return `<article class="project-row">${this.thumbnail('workshop', visualVariant(b,s), info.stage.index)}<div><b>${escapeHTML(p.name)}</b><span class="project-level" style="color:${STAGE_COLORS[info.stage.index]}">项目工坊 · Lv.${info.level} · ${STAGE_NAMES[info.stage.index]}</span><small>${fmtCompact(p.tokens)} token · ${escapeHTML(p.provider)}</small><div class="level-progress"><span style="width:${info.progress * 100}%"></span></div>${button(b.placed ? `find:${b.id}` : `place-owned:${b.id}`, b.placed ? '去看看' : '免费摆放', 'ArrowUpRight', 'text-button')}</div></article>`;
    }).join('') : `<div class="empty-state">${icon('House')}<p>同步 token 后，项目工坊会来到这里。</p>${button('sync', s.mode === 'demo' ? '收集演示 token' : '同步 token', 'RefreshCw', 'secondary')}</div>`}</section><section class="book-section"><h3>规划收藏</h3><div class="collection-grid">${PUZZLES.map(p => `<div class="collection-item ${(s.puzzleStars[p.id] || 0) ? '' : 'locked'}">${this.thumbnail(p.reward)}<b>${CATALOG[p.reward].name}</b><small>${(s.puzzleStars[p.id] || 0) > 0 ? (s.puzzleStars[p.id] || 0) === 3 ? '原色与三星配色已解锁' : '蓝图已解锁' : `通关「${p.title}」`}</small></div>`).join('')}</div></section><section class="book-section"><h3>邻里回忆</h3><div class="collection-grid">${ORDERS.map(o=>`<div class="collection-item ${(s.village.completed[o.id]||0)?'':'locked'}">${this.thumbnail(o.reward)}<b>${o.name}</b><small>${s.village.completed[o.id]||0} 次分享 · ${(s.village.completed[o.id]||0)>0?CATALOG[o.reward].name+'已解锁':'首次分享解锁蓝图'}</small></div>`).join('')}</div></section><section class="book-section"><h3>河谷荣誉</h3><div class="honor-list">${CHAPTERS.map((c, i) => `<div><span>${c.title}<small class="honor-reward">${CATALOG[CHAPTER_COSMETICS[i]].name} · ${s.chapterStars[i] >= 2 ? s.chapterStars[i] === 3 ? "全部纪念配色已解锁" : "首款纪念配色已解锁" : "额外星级解锁配色"}</small></span>${stars(s.chapterStars[i])}</div>`).join('')}</div></section>`;
  }
  private coverageAudit(chapter: number): string {
    const board = this.store.board, homes = board.buildings.filter(b => b.placed && b.kind === 'house');
    const needs: Need[] = chapter >= 3 ? ['food', 'green', 'leisure'] : chapter >= 2 ? ['food', 'green'] : ['food'];
    const labels = { food: '食物', green: '绿地', leisure: '休闲' };
    return `<section class="coverage-audit" aria-label="服务与目标计算"><h4>进度为什么没增加？</h4><p class="panel-note">${progressHint(chapter, board, this.e)}</p><div class="coverage-totals"><span>已摆住宅 <b>${homes.length}</b></span><span>接通道路 <b>${this.e.houses}</b></span><span>食物满足 <b>${this.e.food}</b></span><span>绿地满足 <b>${this.e.green}</b></span></div><p class="panel-note">进度数的是获得服务的住宅。同一栋住宅被多家店或多个公园覆盖，同一项需求也只计一次。项目工坊、商店都不算住宅。</p>${button('build-homes', '建住宅', 'House', 'secondary small')}<details><summary>逐栋查看住宅需求 · 点击定位</summary><div class="coverage-homes">${homes.map(home => `<button data-action="find:${escapeHTML(home.id)}" class="coverage-home"><b>${buildingLabel(home)}</b>${needs.map(need => `<span class="${this.e.buildings[home.id]?.[need] ? 'met' : 'missing'}">${labels[need]}：${needFeedback(board, this.e, home, need)}</span>`).join('')}</button>`).join('')}</div></details><details><summary>查看每个服务设施 · 点击看范围</summary><div class="coverage-homes">${board.buildings.filter(b => b.placed && (CATALOG[b.kind].service || b.kind === 'park')).map(b => {
      const def = serviceDefinition(this.store.board,b.kind), coverage = buildingCoverage(board, this.e, b), used = coverage.homes.filter(h => h.served).length;
      return `<button data-action="find:${escapeHTML(b.id)}" class="coverage-home"><b>${buildingLabel(b)}</b><span class="${coverage.active ? 'met' : 'missing'}">${coverage.active ? `已服务 ${used}${def.capacity ? `/${def.capacity}` : ''} 栋 · ${b.kind === 'park' ? `边缘 ${parkRange(board)} 格` : `步行 ${def.range} 格`}` : '入口未连路，服务未生效'}</span></button>`;
    }).join('')}</div></details></section>`;
  }
  private coveragePanel(b: Building): string {
    const def = serviceDefinition(this.store.board,b.kind), coverage = buildingCoverage(this.store.board, this.e, b), used = coverage.homes.filter(h => h.served).length;
    const count = coverage.active ? coverage.homes.filter(h => h.connected).length : 0;
    return `<div class="service-summary"><span>已服务住宅 <b>${used}${def.capacity ? `/${def.capacity}` : ''} 栋</b></span><span>范围内连路住宅 <b>${count} 栋</b></span><span>${b.kind === 'park' ? '最近占地边缘' : '最远道路步行'} <b>${b.kind === 'park' ? parkRange(this.store.board) : def.range} 格</b></span></div><p class="panel-note">${!coverage.active ? '入口未连到镇公所，当前服务没有生效。门口橙框需要接上道路。' : b.kind === 'park' ? '浅绿格是公园覆盖范围。绿框住宅已获得绿地；橙框住宅仍缺绿地。公园没有容量上限，多座覆盖同一栋只计一次。' : '亮起的道路是实际步行范围。绿框由本店服务；橙框仍缺这项服务。多家店服务同一栋只计一次。'}${coverage.active && used === 0 ? '<br>尚未服务新住宅：附近没有符合条件的住宅，或它们已由其他商店满足。' : ''}</p>${coverage.homes.length ? `<div class="coverage-homes">${coverage.homes.map(h => `<button data-action="find:${escapeHTML(h.home.id)}" class="coverage-home"><b>${buildingLabel(h.home)}</b><span class="${h.served ? 'met' : 'missing'}">${h.distance} 格 · ${h.served ? '已由本设施服务' : !h.connected ? '住宅入口未连路' : !coverage.active ? '本设施入口未连路' : this.e.buildings[h.home.id][def.service!] ? '已由其他商店服务，不重复增加进度' : '本店容量已满'}</span></button>`).join('')}</div>` : ''}`;
  }
  private detailPanel(): string {
    const b = this.store.board.buildings.find(b => b.id === this.selectedId); if (!b) return '<p>点击一栋建筑，看看它的生活。</p>';
    const d = CATALOG[b.kind], status = this.e.buildings[b.id], project = this.store.state.projects.find(p => p.id === b.projectId), info = project ? levelInfo(project.tokens) : null;
    return `<div class="detail-model">${this.thumbnail(b.kind, visualVariant(b,this.store.state), info?.stage.index || 0)}</div><h3 class="detail-name">${project ? escapeHTML(project.name) : d.name}</h3><p class="story">${project ? `${STAGE_NAMES[info!.stage.index]} · Lv.${info!.level} / 50` : d.description}</p>${status ? `<div class="connection-status ${status.connected ? 'connected' : ''}">${icon(status.connected ? 'Check' : 'Route')}${status.connected ? '门前道路已接通' : '门口需要连接到镇公所的道路'}</div>` : ''}${b.kind === 'house' && status ? `<h4>邻居们的生活</h4><div class="needs-list">${[['food', 'Wheat', '食物'], ['green', 'TreeDeciduous', '绿地'], ['leisure', 'Coffee', '休闲']].filter(([need]) => need === 'food' || need === 'green' && (this.store.activePuzzle || activeChapter(this.store.state) >= 2) || need === 'leisure' && (this.store.puzzle ? this.store.puzzle.leisureGoal > 0 : activeChapter(this.store.state) >= 3)).map(([need, symbol, label]) => `<div class="${status[need as 'food' | 'green' | 'leisure'] ? 'met' : ''}">${icon(symbol as string)}<span><b>${label}</b><small>${needFeedback(this.store.board, this.e, b, need as Need)}</small></span>${icon(status[need as 'food' | 'green' | 'leisure'] ? 'Check' : 'Info')}</div>`).join('')}</div>` : ''}${PRODUCTION_KINDS.includes(b.kind)&&!this.store.activePuzzle?this.villageDetail(b):''}${['wheatfield','mill','bakery'].includes(b.kind)&&!this.store.activePuzzle ? this.productionDetail(b) : ''}${d.service || b.kind === 'park' ? this.coveragePanel(b) : ''}${project ? `<div class="project-detail"><div><span>累计 token</span><b>${fmtCompact(project.tokens)}</b></div><div class="level-progress"><span style="width:${info!.progress * 100}%"></span></div><p>${info!.isMax ? '这栋工坊已经成为河谷地标。' : `距离 Lv.${info!.level + 1} 还有 ${fmtCompact(info!.toNext)} token`}</p></div>` : ''}<div class="detail-actions">${button(`move-building:${b.id}`, '免费搬迁', 'Move', 'secondary')}${b.kind !== 'bridge' ? button(`rotate-building:${b.id}`, '旋转', 'RotateCw', 'secondary') : ''}${b.kind !== 'hall' ? button(`stash:${b.id}`, '收纳', 'Archive', 'secondary') : ''}${button(`recolor:${b.id}`, '换个配色', 'Sparkles', 'text-button')}</div>`;
  }
  private productionPanel():string {
    const s=this.store.state,chains=farmChains(s.town,this.e,s.farm),sleep=worldTime(s.worldSeconds,s.settings).sleep;
    return `<p class="story">麦田、风车磨坊和面包店都接上道路，邻居就会从播种忙到烘焙。</p><div class="farm-flow"><span>麦田</span><b>→</b><span>风车磨坊</span><b>→</b><span>面包店</span></div><div class="farm-stocks">${[['wheat','小麦'],['flour','面粉'],['bread','面包']].map(([id,name])=>`<div><span>${name}</span><b data-farm-stock="${id}">${s.farm[id as 'wheat'|'flour'|'bread']}</b></div>`).join('')}</div>${chains.length?`<div class="farm-list">${chains.map(chain=>`<button class="farm-row" data-action="find:${escapeHTML(chain.field.id)}">${this.thumbnail('wheatfield')}<span><b>河岸麦田</b><small data-farm-field="${escapeHTML(chain.field.id)}">${chain.problem||(sleep?'邻居休息中 · 清晨继续':s.farm.runs[chain.field.id]?FARM_LABELS[s.farm.runs[chain.field.id].phase]:'准备播种')}</small></span>${icon('ArrowUpRight')}</button>`).join('')}</div>`:'<div class="empty-state"><p>第一块麦田，还等着你播种。</p><small>麦田 6 金币，风车磨坊 32 金币；现有面包店可以直接使用。</small></div>'}<p class="panel-note">每轮收获 2 份麦子，磨成 3 份面粉，2 份用于烤出 4 个面包，1 份可送往饭馆。最多三位邻居轮流务农与配送；夜间暂停，清晨接着干。夏天麦苗长得更快，冬天更慢。</p>${button('orders','看看邻里心愿','ClipboardList','secondary')}${button('build-farms','布置麦田与磨坊','Wheat','primary')}<p class="panel-note">农事收获保存在本地，不消耗金币，不产生额外金币。面包店原有的住宅服务继续有效。</p>`;
  }
  private productionDetail(b:Building):string {
    const farm=this.store.state.farm,chains=farmChains(this.store.state.town,this.e,farm),chain=chains.find(c=>c.field.id===b.id||c.mill?.id===b.id||c.bakery?.id===b.id),run=chain&&farm.runs[chain.field.id];
    const label=chain?.problem|| (worldTime(this.store.state.worldSeconds,this.store.state.settings).sleep?'邻居休息中 · 清晨继续':run?FARM_LABELS[run.phase]:'准备播种');
    return `<h4>麦田到餐桌</h4><div class="production-status">${b.kind==='bakery'?`<span data-bakery-material="${escapeHTML(b.id)}">${bakeryMaterialLabel(b.id,chains,farm,worldTime(this.store.state.worldSeconds,this.store.state.settings).sleep)}</span>`:''}${chain?`<small data-farm-field="${escapeHTML(chain.field.id)}">${label}</small>`:'<small>布置麦田与风车磨坊，接通它们门前的道路。</small>'}</div>${button('production','查看农事流程','Wheat','text-button')}`;
  }
  private villageDetail(b:Building):string {
    const s=this.store.state,r=stationRun(s.village,b),time=worldTime(s.worldSeconds,s.settings);
    const options=b.kind==='restaurant'?RECIPES.map(p=>[p.id,p.name]):b.kind==='cowshed'?[['milk','鲜奶'],['cheese','奶酪（消耗 1 鲜奶）']]:['vegetablefield','greenhouse'].includes(b.kind)?[['carrot','胡萝卜 · 春季更快'],['potato','土豆 · 夏季更快']]:[];
    return `<section class="village-detail"><p class="farm-status" data-village-station="${escapeHTML(b.id)}">${productionLabel(s,this.e,b,time.season,time.sleep)}</p>${options.length?`<label class="setting-row"><span>${b.kind==='restaurant'?'菜谱':'本次生产'}</span><select aria-label="${CATALOG[b.kind].name}生产选择" data-production="${escapeHTML(b.id)}">${options.map(([id,name])=>`<option value="${id}" ${(r.nextChoice||r.choice)===id?'selected':''}>${name}</option>`).join('')}</select></label>${r.nextChoice?'<small>当前批次完成后切换，原料不会浪费。</small>':''}`:''}${b.kind==='restaurant'?`<p class="panel-note">${RECIPES.map(p=>`${p.name}：${Object.entries(p.ingredients).map(([g,n])=>`${GOODS[g as Good]} ${n}`).join(' + ')} → 料理 2`).join('<br>')}</p>`:''}<div class="village-stocks">${Object.entries(GOODS).filter(([g])=>b.kind==='restaurant'?g!=='bread':b.kind==='cowshed'?['milk','cheese'].includes(g):b.kind==='pigpen'?g==='truffle':b.kind==='fishinghut'?g==='fish':['carrot','potato'].includes(g)).map(([g,name])=>`<span>${name} <b data-village-stock="${escapeHTML(b.id)}|${g}">${s.village.stock[b.id]?.[g as Good]||0}</b></span>`).join('')}</div><p class="panel-note">库存保存在这处设施；运输中的材料由村民携带。断路或夜晚会暂停，恢复后继续。</p></section>`;
  }
  private villagePanel():string {
    return `<h3>种植、养殖与钓鱼</h3><p class="story">至多三位邻居轮流工作。面包与料理用来完成邻里心愿；不消耗金币来生产，也没有离线惩罚。</p><p class="panel-note">春天胡萝卜、夏天土豆生长更快，秋天收获更多，冬天温室照常种菜。牛棚可在鲜奶与奶酪间选择，小猪寻找松露，钓鱼小屋夏天收鱼更快。</p>${this.store.state.town.buildings.filter(b=>b.placed&&PRODUCTION_KINDS.includes(b.kind)).map(b=>`<article class="village-card"><h4>${button('find:'+b.id,CATALOG[b.kind].name,'MapPin','text-button')}</h4>${this.villageDetail(b)}</article>`).join('')}${button('orders','去准备一份邻里心愿','ClipboardList','primary')}`;
  }
  private orderPanel():string {
    if(this.store.activePuzzle)return '<p class="story">邻里订单属于主城。规划关的库存与金币保持独立。</p>';
    const s=this.store.state,time=worldTime(s.worldSeconds,s.settings),have=availableGoods(s,this.e);
    return `<p class="story">没有期限，缺材料就慢慢准备。选择心愿后在田野与饭馆安排生产，完成时分享实际库存。</p>${ORDERS.map(o=>`<article class="order-card ${s.village.activeOrder===o.id?'active':''}"><h3>${o.name}</h3><p>${o.story}</p><div class="village-stocks">${Object.entries(o.needs).map(([g,n])=>`<span>${GOODS[g as Good]} <b data-order-stock="${g}">${have[g as Good]||0}</b> / ${n}</span>`).join('')}</div><p class="farm-status" data-order-status="${o.id}">${orderStatus(s,this.e,o.id,time.season)||'材料齐了，可以邀请邻居分享！'}</p><small>首次奖励：${CATALOG[o.reward].name}蓝图 · 已分享 ${s.village.completed[o.id]||0} 次</small><div class="order-actions">${button('order:'+o.id,s.village.activeOrder===o.id?'正在准备':'准备这份心愿','Flag','secondary')}${button('fulfill-order:'+o.id,'邀请邻居分享','Check','primary')}</div></article>`).join('')}${s.village.activeOrder?button('cancel-order','取消当前心愿，保留材料','X','text-button'):''}<p class="panel-note">蓝图解锁后，在建设 → 装饰中购买。每次分享都消耗材料，重复完成不增加金币。</p>`;
  }
  private settingsPanel(): string {
    const s = this.store.state;
    return `<h3>河谷的时光</h3><label class="setting-row"><span>昼夜自动变化</span><input type="checkbox" aria-label="昼夜自动变化" data-setting="clock" ${s.settings.clockMode === 'cycle' ? 'checked' : ''} /></label><p class="panel-note">六分钟过一天，每三天换一季。晚上邻居会回家睡觉，清晨再出门。离开游戏时，时间会暂停。</p><div class="lighting-buttons">${[['day', 'Sun', '白昼'], ['sunset', 'Sunset', '傍晚'], ['night', 'Moon', '夜晚']].map(([id, symbol, name]) => button(`lighting:${id}`, name, symbol, s.settings.clockMode === 'fixed' && s.settings.lighting === id ? 'active' : '')).join('')}</div><div class="lighting-buttons">${button('visit-hour:20', '看邻居回家', 'Moon')}${button('visit-hour:6', '迎接清晨', 'Sunrise')}</div><label class="setting-row"><span>季节</span><select aria-label="季节" data-setting="season">${[['cycle','随时间变化'],['spring','春 · 新芽'],['summer','夏 · 浓绿'],['autumn','秋 · 金叶'],['winter','冬 · 落雪']].map(([id,name])=>`<option value="${id}" ${s.settings.season===id?'selected':''}>${name}</option>`).join('')}</select></label><h3>四季轻音乐</h3><label class="setting-row"><span>背景音乐</span><input type="checkbox" aria-label="背景音乐" data-setting="music" ${s.settings.music ? 'checked' : ''} /></label><label class="setting-row"><span>音乐音量</span><input type="range" aria-label="音乐音量" data-setting="music-volume" min="0" max="100" step="1" value="${Math.round(s.settings.musicVolume*100)}" /></label><p id="music-status" class="panel-note">点击城镇开启音乐</p><p class="panel-note">春日钢琴、夏日民谣、秋日慢旋律、冬日轻钢琴。换季会渐变切换。</p><p class="music-credit">音乐：Kevin MacLeod (incompetech.com) · <a href="./assets/town/audio/credits.html" target="_blank" rel="noopener">曲目与 CC BY 4.0 授权</a></p><label class="setting-row"><span>全部声音</span><input type="checkbox" data-setting="sound" ${s.settings.muted ? '' : 'checked'} /></label><label class="setting-row"><span>减少动态效果</span><input type="checkbox" data-setting="motion" ${s.settings.reducedMotion ? 'checked' : ''} /></label><label class="setting-row"><span>画面质量</span><select aria-label="画面质量" data-setting="quality"><option value="high" ${s.settings.quality === 'high' ? 'selected' : ''}>精细 · Retina 清晰画面</option><option value="medium" ${s.settings.quality === 'medium' ? 'selected' : ''}>中等 · 柔和阴影</option><option value="low" ${s.settings.quality === 'low' ? 'selected' : ''}>轻量 · 省电</option></select></label><h3>镜头操作</h3><label class="setting-row"><span>控制方式</span><select aria-label="镜头控制方式" data-setting="camera"><option value="trackpad" ${s.settings.cameraInput === 'trackpad' ? 'selected' : ''}>触控板</option><option value="mouse" ${s.settings.cameraInput === 'mouse' ? 'selected' : ''}>鼠标</option></select></label><p class="panel-note">${s.settings.cameraInput === 'trackpad' ? '两指上下滑改变俯仰，左右滑旋转；捏合缩放，Shift + 两指滑动平移。' : '拖动平移，滚轮缩放；按住 Q / E 或镜头箭头连续旋转。'} 点击「回到小镇」可恢复舒适视角。</p><h3>你的记录</h3><p class="panel-note">${s.mode === 'live' ? '本地城镇' : '演示城镇'}。读取只在这台电脑上进行，无需账号。</p>${button(s.mode === 'live' ? 'demo' : 'live', s.mode === 'live' ? '进入独立演示城镇' : '回到真实记录城镇', 'RefreshCw', 'secondary')}<div class="ledger-summary"><div><span>token 铸币</span><b>${s.tokenCoins}</b></div><div><span>经营补贴</span><b>${s.subsidyPaid} / ${subsidyEntitlement(s)}</b></div><div><span>下一枚金币</span><b>${s.residue.toLocaleString()} / 10,000</b></div></div><h3>存档与备份</h3><p class="panel-note">进度自动保存在当前浏览器。换浏览器或设备前，可以导出备份。旧街机版存档保留。</p><div class="save-actions">${button('export', '导出存档', 'Download', 'secondary')}${button('import', '导入存档', 'Upload', 'secondary')}<input id="save-file" type="file" accept="application/json,.json" hidden /></div><h3>怎么玩</h3><p class="panel-note">点击建筑查看需求；建设后为门口接路。铺路、搬迁与收纳都免费。按住 Q / E 或镜头按钮持续旋转，松开停止，摆放时 Q / E 旋转建筑，WASD 移动镜头，Esc 结束操作。</p>${button('show-tutorial', '再看一次起步引导', 'Info', 'text-button')}`;
  }
  private async action(action: string, _button: HTMLButtonElement): Promise<void> {
    const [command, value] = action.split(':');
    switch (command) {
      case 'inspect': this.resetTool(); this.panel = null; break;
      case 'build': this.panel = this.store.activePuzzle ? 'inventory' : 'build'; break;
      case 'build-homes': this.category = 'homes'; this.panel = 'build'; break;
      case 'inventory': this.panel = 'inventory'; break;
      case 'road': this.setTool('road'); return;
      case 'move': this.selectedId = null; this.panel = null; this.setTool('move'); return;
      case 'toggle-erase': this.setTool(this.tool === 'erase' ? 'road' : 'erase'); return;
      case 'quests': this.panel = 'quests'; this.progressPanel = activeChapter(this.store.state); break;
      case 'puzzles': this.panel = 'puzzles'; break;
      case 'book': this.panel = 'book'; break;
      case 'settings': this.panel = 'settings'; break;
      case 'orders': this.panel='orders';break;
      case 'order': this.store.selectOrder(value);this.panel='orders';break;
      case 'cancel-order': this.store.selectOrder(null);this.toast('订单已取消，库存全部保留');return;
      case 'fulfill-order': {const problem=this.store.fulfillOrder(value);if(problem)this.toast(problem);else {this.scene.celebrate('chapter');this.toast('邻居来分享收获了！首次完成会解锁新的装饰蓝图',5500);}return;}
      case 'production': this.panel = 'production'; break;
      case 'build-farms': this.category = 'production'; this.panel = 'build'; break;
      case 'close-panel': this.panel = null; break;
      case 'category': this.category = value; break;
      case 'buy': this.selectedId = null; this.panel = null; this.setTool('place', value as BuildingKind); return;
      case 'place-owned': case 'move-building': {
        const b = this.store.board.buildings.find(b => b.id === value); if (!b) { this.toast('请先回到主城摆放项目工坊'); return; }
        this.selectedId = null; this.panel = null; this.setTool('move', b.kind, b.id); return;
      }
      case 'stash': this.store.stash(value); this.selectedId = null; this.panel = 'inventory'; this.toast('已放回库存，随时可以免费摆回来'); break;
      case 'rotate-building': { const error = this.store.rotate(value); if (error) this.toast(error); break; }
      case 'recolor': if (!this.store.recolor(value)) this.toast('纪念配色需要对应委托的额外星级，规划装饰需要对应关卡三星'); break;
      case 'rotate-preview': if (this.pendingKind !== 'bridge') { this.rotation = (this.rotation + 1) % 4; this.scene.setTool(this.tool, this.pendingKind, this.rotation); } break;
      case 'coordinates': this.coordinateOpen = !this.coordinateOpen; break;
      case 'place-coordinates': {
        const form = document.getElementById('placement-form') as HTMLFormElement; const data = new FormData(form); const x = Number(data.get('x')) - 1, z = Number(data.get('z')) - 1;
        if (!Number.isInteger(x) || !Number.isInteger(z) || x < 0 || z < 0 || x >= this.store.board.size || z >= this.store.board.size) { this.toast('请选择地图内的格子'); return; }
        this.hoverCell = { x, z }; this.onCell(x, z); return;
      }
      case 'chapter': this.progressPanel = Number(value); break;
      case 'claim-current': this.claimChapter(activeChapter(this.store.state) - 1); return;
      case 'claim-chapter': this.claimChapter(Number(value)); return;
      case 'puzzle': this.resetTool(); this.selectedId = null; this.hoverCell = { x: 1, z: 1 }; this.store.enterPuzzle(value); this.panel = 'inventory'; this.scene.focus({ x: 6, z: 6 }); break;
      case 'leave-puzzle': this.resetTool(); this.selectedId = null; this.store.leavePuzzle(); this.panel = null; this.scene.focus(); break;
      case 'restart-puzzle': this.resetTool(); this.selectedId = null; this.store.restartPuzzle(); this.panel = 'inventory'; break;
      case 'puzzle-hint': this.toast(this.store.puzzle?.solution.terrain === 'river' ? '桥位在横第 7 格。沿两岸铺一条街，把镇公所门口接过来。' : '试试把住宅门口朝向同一条街，商店靠近街道中间。公园也要接上路。', 6500); return;
      case 'claim-puzzle': {
        const p = this.store.puzzle, result = this.store.claimPuzzle(); if (!result || !p) return;
        this.scene.celebrate('chapter'); this.toast(result.first ? `${result.stars} 星方案！「${CATALOG[p.reward].name}」蓝图已带回主城` : `${result.stars} 星方案已记录${result.stars === 3 ? '，新配色也解锁了' : ''}`, 5000); this.render(); return;
      }
      case 'find': { const b = this.store.board.buildings.find(b => b.id === value); if (b) { const dims = dimensions(b); this.scene.focus({ x: b.x + dims.w / 2, z: b.z + dims.d / 2 }); this.select(value); } return; }
      case 'connect-start': if (this.e.food >= 4) { this.panel = 'quests'; } else { this.store.road(6, 17); this.scene.celebrate('building', { x: 6.5, z: 17.5 }); this.toast('第一条街接通了！四户邻居都能买到面包'); } break;
      case 'dismiss-tutorial': this.store.state.tutorialDone = true; this.store.commit(); return;
      case 'show-tutorial': this.store.state.tutorialDone = false; this.panel = null; this.store.commit(); return;
      case 'demo': case 'live': this.resetTool(); this.panel = null; this.selectedId = null; this.modeChanged = true; this.store.setMode(command); this.scene.focus(); this.toast(command === 'demo' ? '进入独立演示城镇，点击收集演示 token 获得建设资金' : '回到你的本地城镇'); break;
      case 'sync': await this.sync(); return;
      case 'camera-left': if (Date.now() >= this.ignoreCameraClickUntil) this.scene.rotate(-1); return;
      case 'camera-right': if (Date.now() >= this.ignoreCameraClickUntil) this.scene.rotate(1); return;
      case 'zoom-in': this.scene.zoom(1.2); return;
      case 'zoom-out': this.scene.zoom(1 / 1.2); return;
      case 'focus': this.scene.focus(); return;
      case 'overview': this.scene.overview(); return;
      case 'visit-hour': this.store.visitHour(Number(value)); return;
      case 'lighting': this.store.updateSettings({ clockMode:'fixed', lighting: value as 'day' | 'sunset' | 'night' }); return;
      case 'export': {
        const url = URL.createObjectURL(new Blob([JSON.stringify(this.store.state, null, 2)], { type: 'application/json' })); const link = document.createElement('a'); link.href = url; link.download = `token-town-${this.store.state.mode}.json`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); this.toast('当前城镇存档已导出'); return;
      }
      case 'import': document.getElementById('save-file')?.click(); return;
    }
    this.render();
  }
  private claimChapter(index: number): void {
    const result = this.store.claimChapter(index); if (!result) return;
    this.progressPanel = Math.min(6, index + 2); this.scene.celebrate('chapter'); this.toast(`${CHAPTERS[index].title} · ${result.stars} 星成果已记录${result.subsidy ? `，补贴 +${result.subsidy} 金币` : '，经营补贴将在 token 额度足够时到账'}`, 5000); this.render();
  }
  private async sync(): Promise<void> {
    if (this.busy) return; this.busy = true; this.modeChanged = false; const mode = this.store.state.mode; this.render();
    try {
      const response = mode === 'demo' ? null : await fetchLive(); if (this.modeChanged || this.store.state.mode !== mode) return;
      if (response && (response.error || response.source === 'error')) { this.notice = '读取本地记录失败，请确认本地服务正在运行后重试'; this.panel = 'history'; return; }
      if (response && response.projects.length === 0) { this.store.state.history = 'empty'; this.store.commit(); this.panel = 'history'; this.notice = response.warnings?.join('；') || ''; return; }
      const result = mode === 'demo' ? this.store.syncDemo() : this.store.sync(response!.projects); this.notice = response?.warnings?.join('；') || '';
      if (result.coins || result.subsidy) this.scene.celebrate('coin');
      this.toast(result.newTokens ? `发现 ${fmtCompact(result.newTokens)} 新 token · +${result.coins} 金币${result.subsidy ? ` · 补贴 +${result.subsidy}` : ''}${result.newProjects ? ` · ${result.newProjects} 栋项目工坊已入库` : ''}` : '记录已经同步过了，没有重复发放金币', 5500);
    } finally { this.busy = false; this.render(); }
  }
  private change(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.dataset.setting === 'clock') this.store.updateSettings({clockMode:input.checked?'cycle':'fixed'});
    if(input.dataset.production){this.store.chooseProduction(input.dataset.production,input.value);return;}
    if (input.dataset.setting === 'season') this.store.updateSettings({season:input.value as typeof this.store.state.settings.season});
    if (input.dataset.setting === 'music') this.store.updateSettings({music:input.checked});
    if (input.dataset.setting === 'music-volume') this.store.updateSettings({musicVolume:Number(input.value)/100});
    if (input.dataset.setting === 'sound') this.store.updateSettings({ muted: !input.checked });
    if (input.dataset.setting === 'motion') this.store.updateSettings({ reducedMotion: input.checked });
    if (input.dataset.setting === 'camera') this.store.updateSettings({ cameraInput: input.value as 'trackpad' | 'mouse' });
    if (input.dataset.setting === 'quality') this.store.updateSettings({ quality: input.value as 'high' | 'medium' | 'low' });
    if (input.id === 'save-file' && input.files?.[0]) { void input.files[0].text().then(raw => { this.resetTool(); this.selectedId = null; if (this.store.importSave(raw)) this.toast('存档已导入'); else this.toast('文件不是当前模式的有效河谷小镇存档，原进度已保留'); }); }
  }
  private syncCameraKeys(): void {
    if (!this.heldCameraButton) this.scene.holdRotate(this.pendingKind ? 0 : this.heldKeys.has('q') ? -1 : this.heldKeys.has('e') ? 1 : 0);
    const pan = keyboardPan(this.heldKeys); this.scene.holdPan(pan.x, pan.y);
  }
  private keydown(event: KeyboardEvent): void {
    if ((event.target as HTMLElement).closest('input, select, textarea, [contenteditable="true"]') || event.isComposing || event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.key === 'Escape') { this.resetTool(); this.panel = null; this.render(); return; }
    const key = event.key.toLowerCase(), intent = keyboardIntent(key, Boolean(this.pendingKind), event.repeat);
    if (!intent) return; event.preventDefault();
    if (intent === 'turn-left' || intent === 'turn-right') {
      if (this.pendingKind === 'bridge') return;
      this.rotation = (this.rotation + (intent === 'turn-left' ? 3 : 1)) % 4;
      this.scene.setTool(this.tool, this.pendingKind, this.rotation); this.render(); return;
    }
    this.heldKeys.add(key); this.syncCameraKeys();
  }
  toast(message: string, duration = 3800): void {
    this.toastMessage = message; this.toastUntil = Date.now() + duration;
    clearTimeout(this.toastTimer); const el = document.getElementById('town-toast'); if (!el) return; el.innerHTML = `${icon('Sparkles')}<span>${escapeHTML(message)}</span>`; el.classList.add('visible');
    this.toastTimer = window.setTimeout(() => document.getElementById('town-toast')?.classList.remove('visible'), duration);
  }
}
