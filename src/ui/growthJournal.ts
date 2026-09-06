import type { ScreenContext } from '../screens/screen';
import { growthStatus, companionGrowth } from '../domain/growth';
import { levelInfo, STAGES } from '../domain/levels';
import { fmtCompact } from '../domain/economy';
import { byId } from '../content/collectibles';
import { SHOP } from '../content';
import { collectibleIcon } from '../render/assets';
import { tCollectibleName } from '../i18n';

export type JournalTab = 'growth' | 'projects' | 'shop';
const esc = (s: string) => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));

/** Native dialog gives the journal focus trapping, Escape, and readable mobile text. */
export class GrowthJournal {
  private dialog = document.createElement('dialog');
  private tab: JournalTab = 'growth';
  private notice = '';
  constructor(private ctx: ScreenContext) {
    this.dialog.className = 'growth-journal';
    this.dialog.setAttribute('aria-labelledby', 'journal-title');
    document.body.append(this.dialog);
    this.dialog.addEventListener('click', e => {
      const button = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-action]');
      if (!button) return;
      const { action, id } = button.dataset;
      if (action === 'close') return this.close();
      if (action === 'tab') { this.tab = id as JournalTab; this.notice = ''; }
      if (action === 'claim' && id) {
        const reward = this.ctx.store.claimGrowth(id);
        if (reward) {
          this.notice = this.say('已领取：', 'Received: ') + tCollectibleName(reward.collectible.id) + (reward.isDup ? this.say(' · 已拥有，转为星尘', ' · Already owned; converted to dust') : '');
          this.ctx.sound.levelUp();
          this.ctx.fx.burst(800, 690, '#ffda8a', 32);
        }
      }
      if (action === 'feature' && id) this.ctx.store.featureProject(id);
      if (action === 'inspect' && id) { this.close(); this.ctx.router.go('cabinet', { id }); return; }
      if (action === 'customize') { this.close(); this.ctx.router.go('customize'); return; }
      if (action === 'buy' && id) {
        const item = SHOP.find(s => s.id === id);
        if (item?.kind === 'capsule') { this.close(); this.ctx.router.go('capsule'); return; }
        if (item) {
          const result = this.ctx.store.buy(item);
          if (result) { this.notice = this.say('已获得：', 'Unlocked: ') + tCollectibleName(result.collectible.id); this.ctx.sound.confirm(); }
        }
      }
      this.render();
      const next = Array.from(this.dialog.querySelectorAll<HTMLButtonElement>('button')).find(b => b.dataset.action === action && b.dataset.id === id && !b.disabled);
      (next ?? this.dialog.querySelector<HTMLButtonElement>('[data-action="close"]'))?.focus();
    });
    this.dialog.addEventListener('click', e => { if (e.target === this.dialog) { const r = this.dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) this.close(); } });
  }
  private say(zh: string, en: string) { return this.ctx.store.state.settings.language === 'zh-CN' ? zh : en; }
  get isOpen() { return this.dialog.open; }
  open(tab: JournalTab = 'growth') { this.tab = tab; this.notice = ''; this.render(); if (!this.dialog.open) this.dialog.showModal(); }
  close() { this.dialog.close(); }
  private icon(id: string) {
    const img = collectibleIcon(id);
    return img ? `<img src="${esc(img.src)}" alt="" />` : '<span class="gift-fallback">✦</span>';
  }
  private render() {
    const s = this.ctx.store.state;
    const zh = s.settings.language === 'zh-CN';
    let body = '';
    if (this.tab === 'growth') {
      const pet = companionGrowth(s.stats.lifetimeTokens);
      body = `<div class="journal-intro"><span class="journal-pet">✦</span><div><h2>${this.say('和小光一起，慢慢长大', 'Grow a little, together')}</h2><p>${this.say('每一点 token 都留在这里。礼物永久有效，随时回来领取。', 'Every token stays with you. Gifts never expire. Come back whenever you like.')}</p><p>${this.say('小光', 'Lumi')} · ${['Ⅰ','Ⅱ','Ⅲ','Ⅳ'][pet.stage]} / Ⅳ ${pet.next ? ' · ' + this.say('下次进化还需 ', 'Next evolution in ') + fmtCompact(pet.next - s.stats.lifetimeTokens) + ' tokens' : ' · ' + this.say('已完全进化', 'Fully grown')}</p></div></div>`;
      body += '<div class="chapter-list">' + growthStatus(s).map((c, i) => `<article class="chapter ${c.claimed ? 'claimed' : c.ready ? 'ready' : ''}"><span class="chapter-index">${c.claimed ? '✓' : String(i + 1).padStart(2, '0')}</span><div class="chapter-gift">${this.icon(c.reward)}</div><div class="chapter-copy"><h3>${esc(zh ? c.zh : c.en)}</h3><p>${esc(zh ? c.storyZh : c.storyEn)}</p><span>${esc(tCollectibleName(c.reward))} · ${fmtCompact(c.tokens)} tokens</span><progress value="${c.progress}" max="1" aria-label="${esc(zh ? c.zh : c.en)}"></progress></div><button data-action="claim" data-id="${c.id}" ${c.claimed || !c.ready ? 'disabled' : ''}>${c.claimed ? this.say('已收藏', 'Collected') : c.ready ? this.say('领取礼物', 'Claim gift') : this.say('还差 ', '') + fmtCompact(c.tokens - s.stats.lifetimeTokens) + this.say('', ' to go')}</button></article>`).join('') + '</div>';
      body += `<p class="journal-note">${this.say('已拥有的礼物会转为星尘。房间主题领取后可在「布置小店」中使用。', 'Already owned gifts become dust. Equip room themes in Make it yours.')}</p><button data-action="customize">${this.say('布置小店', 'Make it yours')}</button>`;
    } else if (this.tab === 'projects') {
      body = `<div class="journal-intro"><div><h2>${this.say('每个项目，都有自己的成长故事', 'Every project has a story')}</h2><p>${this.say('选一台作为心爱机台。50 级、5 次外观进化，后续 token 最多享受 1.5 倍铸币。', 'Choose a favorite cabinet. 50 levels, 5 visual stages, and up to 1.5× coins from future tokens.')}</p></div></div><div class="evolution-strip">${STAGES.map((stage, i) => `<div><img src="./assets/project-detail/cabinet-stage-${i+1}.png" alt=""/><span>Lv.${stage.loLevel}–${stage.hiLevel}</span></div>`).join('')}</div><div class="project-journal-list">`;
      body += s.projects.length ? s.projects.map(p => {
        const info = levelInfo(p.tokens);
        return `<article class="project-entry"><div><h3>${esc(p.name)} <span>Lv.${p.level}</span></h3><p>${info.isMax ? this.say('已成为传奇机台', 'A legendary cabinet') : this.say('下一级还需 ', 'Next level in ') + fmtCompact(info.toNext) + ' tokens'} · ${info.multiplier.toFixed(2)}×</p><progress value="${info.progress}" max="1" aria-label="${esc(p.name)}"></progress></div><button data-action="feature" data-id="${esc(p.id)}" aria-pressed="${s.featuredProjectId === p.id}">${s.featuredProjectId === p.id ? this.say('♥ 心爱机台', '♥ Favorite') : this.say('设为心爱', 'Favorite')}</button><button data-action="inspect" data-id="${esc(p.id)}">${this.say('走近看看', 'Inspect')}</button></article>`;
      }).join('') : `<p>${this.say('同步 token，让第一台街机亮起来。', 'Sync tokens to switch on your first cabinet.')}</p>`;
      body += '</div>';
    } else {
      body = `<div class="journal-intro"><div><h2>${this.say('给小店挑一份礼物', 'Something lovely for your arcade')}</h2><p>${this.say('扭蛋带来惊喜，主题和相框带来确定的新变化。', 'Capsules bring surprises. Themes and frames bring a change you can choose.')}</p><strong>${fmtCompact(s.coins)} ${this.say('金币', 'coins')}</strong></div></div><div class="journal-shop">`;
      body += SHOP.map(item => {
        const representative = Object.values(byId).find(c => c.type === item.pick);
        const complete = this.ctx.store.isGrantComplete(item);
        return `<article>${representative ? this.icon(representative.id) : '<span class="gift-fallback">◒</span>'}<h3>${esc(this.say(({pull1:'惊喜扭蛋',pull10:'十连扭蛋',sign:'霓虹招牌',frame:'头像相框',theme:'房间主题',trophy:'奖杯'} as Record<string,string>)[item.id] ?? item.label, item.label))}</h3><p>${item.cost} ${this.say('金币', 'coins')}</p><button data-action="buy" data-id="${item.id}" ${s.coins < item.cost || complete ? 'disabled' : ''}>${complete ? this.say('已集齐', 'Complete') : s.coins < item.cost ? this.say('还差 ', 'Need ') + fmtCompact(item.cost - s.coins) : item.kind === 'capsule' ? this.say('前往扭蛋机', 'Visit machine') : this.say('兑换礼物', 'Get gift')}</button></article>`;
      }).join('') + '</div>';
    }
    this.dialog.innerHTML = `<header><div><span class="journal-kicker">TOKEN ARCADE</span><h1 id="journal-title">${this.say('小店成长手册', 'Your arcade journal')}</h1></div><button data-action="close" aria-label="${this.say('关闭', 'Close')}">✕</button></header><nav aria-label="${this.say('手册分类', 'Journal sections')}">${(['growth','projects','shop'] as JournalTab[]).map((tab,i) => `<button data-action="tab" data-id="${tab}" aria-pressed="${this.tab === tab}">${this.say(['成长礼物','我的机台','小店补给'][i],['Growth gifts','My cabinets','Gift shop'][i])}</button>`).join('')}</nav><div class="journal-body">${this.notice ? `<p class="journal-notice" role="status">${esc(this.notice)}</p>` : ''}${body}</div>`;
  }
}
