/*
 * overlays.ts — the only HTML in the game. Everything else is canvas, but the
 * help and settings dialogs are plain DOM modals because they are text-heavy
 * and benefit from real accessibility/scroll. They reuse the .ta-* classes in
 * public/styles.css.
 *
 * The #overlays root has pointer-events:none, so each backdrop sets its own
 * pointer-events:auto (the .ta-modal-backdrop class already does this).
 */

import type { GameStore } from '../state/store';
import { t, getLocale } from '../i18n';
import type { FrameMode, Locale } from '../core/types';

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

export class Overlays {
  private readonly root: HTMLElement;
  private readonly store: GameStore;
  private readonly onChange?: () => void;
  private readonly onOpenAchievements?: () => void;
  private backdrop: HTMLElement | null = null;

  constructor(root: HTMLElement, store: GameStore, onChange?: () => void, onOpenAchievements?: () => void) {
    this.root = root;
    this.store = store;
    this.onChange = onChange;
    this.onOpenAchievements = onOpenAchievements;
  }

  /** Remove any open modal. */
  close(): void {
    if (this.backdrop) {
      this.backdrop.remove();
      this.backdrop = null;
    }
  }

  private mount(modal: HTMLElement): void {
    this.close();
    const backdrop = el('div', 'ta-modal-backdrop');
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) this.close();
    });
    backdrop.appendChild(modal);
    this.root.appendChild(backdrop);
    this.backdrop = backdrop;
  }

  // ---- help ---------------------------------------------------------------

  openHelp(): void {
    const modal = el('div', 'ta-modal');
    modal.appendChild(el('h2', undefined, t('help.title')));

    const tips = el('ul');
    for (const key of ['help.l1', 'help.l2', 'help.l3', 'help.l4']) {
      tips.appendChild(el('li', undefined, t(key)));
    }
    modal.appendChild(tips);

    const actions = el('div', 'ta-actions');
    const closeBtn = el('button', 'ta-btn', t('ui.close'));
    closeBtn.addEventListener('click', () => this.close());
    actions.appendChild(closeBtn);
    modal.appendChild(actions);

    this.mount(modal);
  }

  // ---- player name --------------------------------------------------------

  /** Rename dialog: a single text field for the player's display name. Saving
   * an empty value clears back to the localized default. Opened from the card
   * pencil or from Settings. */
  openPlayerName(): void {
    const modal = el('div', 'ta-modal');
    modal.appendChild(el('h2', undefined, t('ui.playerName')));

    const input = el('input', 'ta-input');
    input.type = 'text';
    input.maxLength = 14;
    input.value = this.store.playerName();
    input.placeholder = t('ui.arcadePlayer');
    modal.appendChild(input);

    const commit = (): void => {
      this.store.setPlayerName(input.value);
      this.onChange?.();
      this.close();
    };
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') commit();
      else if (e.key === 'Escape') this.close();
    });

    const actions = el('div', 'ta-actions');
    const cancelBtn = el('button', 'ta-btn ghost', t('ui.close'));
    cancelBtn.addEventListener('click', () => this.close());
    const saveBtn = el('button', 'ta-btn', t('ui.save'));
    saveBtn.addEventListener('click', commit);
    actions.appendChild(cancelBtn);
    actions.appendChild(saveBtn);
    modal.appendChild(actions);

    this.mount(modal);
    input.focus();
    input.select();
  }

  // ---- settings -----------------------------------------------------------

  openSettings(): void {
    const modal = el('div', 'ta-modal');
    modal.appendChild(el('h2', undefined, t('ui.settings')));

    // Player name (identity first) — opens the rename dialog.
    const nameRow = el('div', 'ta-row');
    nameRow.appendChild(el('span', undefined, t('ui.playerName')));
    const nameBtn = el('button', 'ta-btn ta-switch ghost');
    nameBtn.textContent = this.store.playerName() || t('ui.editName');
    nameBtn.addEventListener('click', () => this.openPlayerName());
    nameRow.appendChild(nameBtn);
    modal.appendChild(nameRow);

    // Language English / 中文 — switching rebuilds this modal in the new
    // language immediately and persists the choice.
    const langRow = el('div', 'ta-row');
    langRow.appendChild(el('span', undefined, t('ui.language')));
    const langBtn = el('button', 'ta-btn ta-switch');
    langBtn.textContent = getLocale() === 'zh-CN' ? '中文' : 'English';
    langBtn.addEventListener('click', () => {
      const next: Locale = getLocale() === 'zh-CN' ? 'en' : 'zh-CN';
      this.store.setLanguage(next);
      this.onChange?.();
      this.openSettings(); // rebuild in the new language (canvas updates live)
    });
    langRow.appendChild(langBtn);
    modal.appendChild(langRow);

    // Sound on/off
    const soundRow = el('div', 'ta-row');
    soundRow.appendChild(el('span', undefined, t('ui.sound')));
    const soundBtn = el('button', 'ta-btn ta-switch');
    const paintSound = (): void => {
      soundBtn.textContent = this.store.state.settings.muted ? t('ui.off') : t('ui.on');
    };
    paintSound();
    soundBtn.addEventListener('click', () => {
      this.store.toggleMute();
      paintSound();
      this.onChange?.(); // main.ts syncs the audio engine's mute flag
    });
    soundRow.appendChild(soundBtn);
    modal.appendChild(soundRow);

    // Data source Live/Demo (LIVE/DEMO are stable mode keys, not translated)
    const modeRow = el('div', 'ta-row');
    modeRow.appendChild(el('span', undefined, t('ui.dataSource')));
    const modeBtn = el('button', 'ta-btn ta-switch ghost');
    const paintMode = (): void => {
      modeBtn.textContent = this.store.state.mode === 'demo' ? 'DEMO' : 'LIVE';
    };
    paintMode();
    modeBtn.addEventListener('click', () => {
      this.store.setMode(this.store.state.mode === 'demo' ? 'live' : 'demo');
      paintMode();
      this.onChange?.();
    });
    modeRow.appendChild(modeBtn);
    modal.appendChild(modeRow);

    // Frame rate: AUTO (30fps idle, 60fps while scrolling) / flat 30 / flat 60.
    // A cycle button matching the other switches; applied live via onChange.
    const fpsRow = el('div', 'ta-row');
    fpsRow.appendChild(el('span', undefined, t('ui.frameRate')));
    const fpsBtn = el('button', 'ta-btn ta-switch ghost');
    const fpsCycle: FrameMode[] = ['auto', 30, 60];
    const paintFps = (): void => {
      const cur = this.store.state.settings.fps;
      fpsBtn.textContent = cur === 'auto' ? t('ui.fpsAuto') : cur + ' FPS';
    };
    paintFps();
    fpsBtn.addEventListener('click', () => {
      const cur = this.store.state.settings.fps;
      const next = fpsCycle[(fpsCycle.indexOf(cur) + 1) % fpsCycle.length];
      this.store.setFps(next);
      paintFps();
      this.onChange?.(); // main.ts applies it to the Stage
    });
    fpsRow.appendChild(fpsBtn);
    modal.appendChild(fpsRow);

    // Achievements gallery (secondary entry point)
    if (this.onOpenAchievements) {
      const achRow = el('div', 'ta-row');
      achRow.appendChild(el('span', undefined, t('ui.achievements')));
      const achBtn = el('button', 'ta-btn ta-switch ghost', t('ui.view'));
      achBtn.addEventListener('click', () => this.onOpenAchievements?.());
      achRow.appendChild(achBtn);
      modal.appendChild(achRow);
    }

    // Reset progress
    const resetRow = el('div', 'ta-row');
    resetRow.appendChild(el('span', undefined, t('ui.resetProgress')));
    const resetBtn = el('button', 'ta-btn danger', t('ui.reset'));
    resetBtn.addEventListener('click', () => {
      this.store.reset();
      location.reload();
    });
    resetRow.appendChild(resetBtn);
    modal.appendChild(resetRow);

    const actions = el('div', 'ta-actions');
    const closeBtn = el('button', 'ta-btn', t('ui.close'));
    closeBtn.addEventListener('click', () => this.close());
    actions.appendChild(closeBtn);
    modal.appendChild(actions);

    this.mount(modal);
  }
}
