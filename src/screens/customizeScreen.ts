/*
 * customizeScreen.ts — the physical backstage workshop for P1 cosmetics.
 *
 * The authored workshop backdrop supplies the actual projector rack and
 * calibration fixtures. This screen only projects live art, localized labels,
 * ownership state, and equip hit areas into those wells; it intentionally has
 * no web-card shells or generic section panels.
 */

import { rrect } from '../render/canvas';
import { drawText, measureText } from '../render/pixelFont';
import { drawImageSmooth, collectibleIcon } from '../render/assets';
import { drawCropContain, drawImageContain } from '../render/widgets';
import { PLAYER_PORTRAIT_CROP } from '../render/atlas';
import { ROOM_THEME_IDS, PROFILE_FRAME_IDS } from '../domain/cosmetics';
import type { ProfileFrameId, RoomThemeId } from '../core/types';
import type { Screen, ScreenContext } from './screen';
import { drawBackButton } from './chrome';
import { drawDemoPlaque } from '../render/demoPlaque';
import { t } from '../i18n';

const GOLD = '#ffd23f';
const CYAN = '#5fe6d6';
const MAGENTA = '#e15ad8';
const INK = '#f6f4ff';
const MUTE = '#a7a1c3';

/** Exact V2 authored hardware safety bounds at the 1600×1000 logical size.
 * Room themes live in true 16:10 projector monitors; only the profile-frame
 * calibration bays retain their compact vertical orientation. */
const ROOM_WELLS: Record<RoomThemeId, { x: number; y: number; w: number; h: number }> = {
  base: { x: 118, y: 382, w: 292, h: 182 },
  e_sunset: { x: 473, y: 382, w: 292, h: 182 },
  l_forest: { x: 828, y: 382, w: 292, h: 182 },
};

const FRAME_WELLS: Record<ProfileFrameId, { x: number; y: number; w: number; h: number }> = {
  base: { x: 1220, y: 216, w: 232, h: 214 },
  r_frame: { x: 1220, y: 494, w: 232, h: 214 },
};

type CardState = 'locked' | 'owned' | 'equipped';

export class CustomizeScreen implements Screen {
  readonly name = 'customize';

  constructor(private readonly ctx: ScreenContext) {}

  render(g: CanvasRenderingContext2D): void {
    this.drawWorkshop(g);
    drawBackButton(g, this.ctx, () => this.ctx.router.back());
    // The top-center header is intentionally left clear by the backdrop.
    this.drawHeader(g);
    drawDemoPlaque(g, this.ctx, 1138, 22, 156);
    this.drawRackLabels(g);
    this.drawThemeRack(g);
    this.drawFrameStation(g);
  }

  /** Draw the supplied 16:10 workshop exactly once. There is deliberately no
   * fallback gradient or global wash: the authored room is the UI shell. */
  private drawWorkshop(g: CanvasRenderingContext2D): void {
    const bg = this.ctx.assets.get('customizeWorkshopBackdrop');
    if (bg) {
      drawImageSmooth(g, bg, 0, 0, this.ctx.stage.width, this.ctx.stage.height);
      return;
    }
    // Keep a neutral loading fallback only until the packaged backdrop decodes;
    // never revive the old purple settings-page gradient.
    g.fillStyle = '#08070f';
    g.fillRect(0, 0, this.ctx.stage.width, this.ctx.stage.height);
  }

  private drawHeader(g: CanvasRenderingContext2D): void {
    drawText(g, t('ui.customizeArcade'), 750, 26, 3.15, GOLD, { align: 'center', glow: GOLD, glowBlur: 5 });
  }

  /** Small fixture labels, mounted near hardware rather than turned into panels. */
  private drawRackLabels(g: CanvasRenderingContext2D): void {
    drawText(g, t('ui.roomThemes'), 134, 201, 1.8, MAGENTA, { glow: MAGENTA, glowBlur: 3, shadow: '#08050f' });
    g.fillStyle = 'rgba(225,90,216,0.7)';
    g.fillRect(130, 226, 216, 2);
    drawText(g, t('ui.profileFrames'), 1110, 152, 1.6, CYAN, { glow: CYAN, glowBlur: 3, shadow: '#08050f' });
    g.fillStyle = 'rgba(95,230,214,0.7)';
    g.fillRect(1108, 177, 244, 2);
  }

  private drawThemeRack(g: CanvasRenderingContext2D): void {
    const ids: RoomThemeId[] = ['base', ...ROOM_THEME_IDS];
    for (const id of ids) this.drawThemeWell(g, id, ROOM_WELLS[id]);
  }

  private drawThemeWell(g: CanvasRenderingContext2D, id: RoomThemeId, well: { x: number; y: number; w: number; h: number }): void {
    const state = this.themeState(id);
    if (state === 'equipped') this.drawWellSelection(g, well, MAGENTA, 7);

    if (state === 'locked') {
      // The authored dark monitor stays visible for a locked reward: no fake
      // preview, tint, or thumbnail — just one centered lock in the screen.
      this.drawLock(g, well.x + well.w / 2, well.y + well.h / 2, MAGENTA);
    } else {
      this.drawThemePreview(g, id, well);
    }

    const name = this.themeDisplayName(id);
    // The monitor image remains dominant; one large physical plaque carries
    // the complete state/action instead of several faint labels on the console.
    this.fitCenter(g, name, well.x + well.w / 2, well.y + 202, well.w - 28, 1.6, state === 'locked' ? MUTE : INK, state === 'equipped' ? MAGENTA : undefined, 1.25);
    this.drawThemeActionPlaque(g, id, state, well);
  }

  /** A generated metal plaque makes the room-theme state legible at a glance.
   * An owned theme presents the direct EQUIP command; equipped and locked
   * themes remain clear non-buttons. The preview itself still communicates
   * ownership (real room art vs. lock), so a separate OWNED label is redundant. */
  private drawThemeActionPlaque(
    g: CanvasRenderingContext2D,
    id: RoomThemeId,
    state: CardState,
    well: { x: number; y: number; w: number; h: number },
  ): void {
    const x = well.x + 48;
    const y = well.y + 225;
    const w = well.w - 96;
    const h = 82;
    const actionable = state === 'owned';
    const hovered = actionable
      ? this.ctx.stage.hotspot({ x, y, w, h, cursor: 'pointer', id: 'equip-theme-' + id, onClick: () => this.equipTheme(id) })
      : false;
    const plaque = this.ctx.assets.get('achSmallPlaque');

    g.save();
    if (state === 'locked') g.globalAlpha = 0.42;
    if (hovered || state === 'equipped') {
      g.shadowColor = state === 'equipped' ? MAGENTA : GOLD;
      g.shadowBlur = hovered ? 16 : 11;
    }
    if (plaque) drawImageSmooth(g, plaque, x, y, w, h);
    g.restore();

    const label = state === 'locked' ? t('ui.locked') : state === 'equipped' ? t('ui.equipped') : t('ui.equip');
    const color = state === 'locked' ? MUTE : state === 'equipped' ? MAGENTA : hovered ? GOLD : INK;
    this.fitCenter(g, label, x + w / 2, y + 29, w - 42, 1.8, color, hovered || state === 'equipped' ? color : undefined, 1.4);
  }

  /** Theme scenes occupy the complete 16:10 projector screen edge to edge. */
  private drawThemePreview(g: CanvasRenderingContext2D, id: RoomThemeId, rect: { x: number; y: number; w: number; h: number }): void {
    const asset = id === 'e_sunset' ? 'roomThemeSunset' : id === 'l_forest' ? 'roomThemeForest' : 'roomBg';
    const img = this.ctx.assets.get(asset);
    if (!img) return;
    g.save();
    g.beginPath();
    g.rect(rect.x, rect.y, rect.w, rect.h);
    g.clip();
    // All room sources are authored wide scenes, matched to the monitor rather
    // than contained as a thumbnail inside any portrait enclosure.
    drawImageSmooth(g, img, rect.x, rect.y, rect.w, rect.h);
    g.restore();
  }

  private drawFrameStation(g: CanvasRenderingContext2D): void {
    const ids: ProfileFrameId[] = ['base', ...PROFILE_FRAME_IDS];
    for (const id of ids) this.drawFrameWell(g, id, FRAME_WELLS[id]);
  }

  private drawFrameWell(g: CanvasRenderingContext2D, id: ProfileFrameId, well: { x: number; y: number; w: number; h: number }): void {
    const state = this.frameState(id);
    if (state === 'equipped') this.drawWellSelection(g, well, CYAN, 7);

    // One centered calibration composition replaces the rejected 78px sidebar.
    const cx = well.x + well.w / 2;
    const cy = well.y + 103;
    this.drawFramePreview(g, id, state, cx, cy);

    const name = id === 'base' ? t('ui.frameBaseDisplay') : t('ui.frameCyanDisplay');
    this.fitCenter(g, name, well.x + well.w / 2, well.y + 8, well.w - 28, 1.45, state === 'locked' ? MUTE : INK, state === 'equipped' ? CYAN : undefined, 1.2);
    this.drawFrameActionPlaque(g, id, state, well);
  }

  /** Profile frames use the same single, physical state/action language as
   * room themes. This removes the old duplicated OWNED/EQUIPPED line plus a
   * second tiny command beneath it. */
  private drawFrameActionPlaque(
    g: CanvasRenderingContext2D,
    id: ProfileFrameId,
    state: CardState,
    well: { x: number; y: number; w: number; h: number },
  ): void {
    const x = well.x + 46;
    const y = well.y + 184;
    const w = well.w - 92;
    const h = 66;
    const actionable = state === 'owned';
    const hovered = actionable
      ? this.ctx.stage.hotspot({ x, y, w, h, cursor: 'pointer', id: 'equip-frame-' + id, onClick: () => this.equipFrame(id) })
      : false;
    const plaque = this.ctx.assets.get('achSmallPlaque');

    g.save();
    if (state === 'locked') g.globalAlpha = 0.42;
    if (hovered || state === 'equipped') {
      g.shadowColor = state === 'equipped' ? CYAN : GOLD;
      g.shadowBlur = hovered ? 14 : 10;
    }
    if (plaque) drawImageSmooth(g, plaque, x, y, w, h);
    g.restore();

    const label = state === 'locked' ? t('ui.locked') : state === 'equipped' ? t('ui.equipped') : t('ui.equip');
    const color = state === 'locked' ? MUTE : state === 'equipped' ? CYAN : hovered ? GOLD : INK;
    this.fitCenter(g, label, x + w / 2, y + 23, w - 34, 1.55, color, hovered || state === 'equipped' ? color : undefined, 1.2);
  }

  /** The Cyan frame stays the real item art. The avatar is restored only in its
   * opaque interior window so the wing tips, gems, rails, and bolts remain whole. */
  private drawFramePreview(g: CanvasRenderingContext2D, id: ProfileFrameId, state: CardState, cx: number, cy: number): void {
    const player = this.ctx.assets.get('homePlayer');
    if (id === 'r_frame') {
      const frame = collectibleIcon('r_frame');
      if (frame) {
        g.save();
        g.globalAlpha = state === 'locked' ? 0.24 : 1;
        drawImageContain(g, frame, cx, cy, 136, 160);
        g.restore();
      }
      if (state !== 'locked') {
        g.save();
        rrect(g, cx - 33, cy - 35, 66, 74, 7);
        g.clip();
        if (player) drawCropContain(g, player, PLAYER_PORTRAIT_CROP, cx - 33, cy - 37, 66, 77);
        g.restore();
      } else {
        this.drawLock(g, cx, cy + 2, CYAN);
      }
      return;
    }

    if (player) drawCropContain(g, player, PLAYER_PORTRAIT_CROP, cx - 49, cy - 57, 98, 112);
    // This is a small calibration reticle inside the authored cyan well, not a
    // card or replacement frame. It gives the free base frame a visible role.
    g.save();
    g.strokeStyle = state === 'equipped' ? CYAN : '#668a96';
    g.lineWidth = 2;
    rrect(g, cx - 55, cy - 65, 110, 132, 6);
    g.stroke();
    g.restore();
  }

  /** A thin lit edge follows the hardware bay only for the selected item. */
  private drawWellSelection(g: CanvasRenderingContext2D, well: { x: number; y: number; w: number; h: number }, color: string, radius: number): void {
    g.save();
    g.shadowColor = color;
    g.shadowBlur = 16;
    g.strokeStyle = color;
    g.lineWidth = 2;
    rrect(g, well.x - 5, well.y - 5, well.w + 10, well.h + 10, radius);
    g.stroke();
    g.restore();
  }

  private drawLock(g: CanvasRenderingContext2D, cx: number, cy: number, color: string): void {
    g.save();
    g.shadowColor = color;
    g.shadowBlur = 12;
    g.strokeStyle = color;
    g.fillStyle = '#11101b';
    g.lineWidth = 3;
    g.beginPath();
    g.arc(cx, cy - 8, 15, Math.PI, 0);
    g.stroke();
    rrect(g, cx - 22, cy - 8, 44, 35, 5);
    g.fill();
    g.stroke();
    g.fillStyle = color;
    g.fillRect(cx - 2, cy + 4, 4, 13);
    g.restore();
  }

  private fitCenter(g: CanvasRenderingContext2D, text: string, cx: number, y: number, maxW: number, maxScale: number, color: string, glow?: string, minScale = 0.82): void {
    const scale = Math.max(minScale, Math.min(maxScale, maxW / Math.max(1, measureText(text, 1))));
    drawText(g, text, cx, y, scale, color, { align: 'center', glow, glowBlur: glow ? 3 : 0, shadow: '#08050f' });
  }

  private themeDisplayName(id: RoomThemeId): string {
    if (id === 'e_sunset') return t('ui.themeSunsetDisplay');
    if (id === 'l_forest') return t('ui.themeForestDisplay');
    return t('ui.themeBaseDisplay');
  }

  private themeState(id: RoomThemeId): CardState {
    if (this.ctx.store.state.cosmetics.roomTheme === id) return 'equipped';
    if (id === 'base' || this.ctx.store.state.owned[id]) return 'owned';
    return 'locked';
  }

  private frameState(id: ProfileFrameId): CardState {
    if (this.ctx.store.state.cosmetics.profileFrame === id) return 'equipped';
    if (id === 'base' || this.ctx.store.state.owned[id]) return 'owned';
    return 'locked';
  }

  private equipTheme(id: RoomThemeId): void {
    if (!this.ctx.store.equipRoomTheme(id)) return;
    this.ctx.sound.click();
    this.ctx.fx.banner(t('ui.equipped'), 800, 112, MAGENTA, { scale: 2.5, life: 1.2 });
    this.ctx.stage.wake(900);
  }

  private equipFrame(id: ProfileFrameId): void {
    if (!this.ctx.store.equipProfileFrame(id)) return;
    this.ctx.sound.click();
    this.ctx.fx.banner(t('ui.equipped'), 1310, 112, CYAN, { scale: 2.2, life: 1.2 });
    this.ctx.stage.wake(900);
  }
}
