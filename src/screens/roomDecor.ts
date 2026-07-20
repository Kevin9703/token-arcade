/*
 * roomDecor.ts — the Home room's decoration system, split out of roomScreen.
 *
 * Owns BOTH faces of player-arranged prizes:
 *   1. The resting room view: saved (or auto-arranged) collectibles standing in
 *      the arcade — wall shelf, floor line, buddy corner — with hover tooltips
 *      and the DECOR entry card that opens the editor.
 *   2. Decorate mode: a modal editor with a dimmed room, marching-ants scenery
 *      zones, a bench inventory, drag/click placement with snap ghosts, and
 *      save/close (with a discard confirm) around a draft layout.
 *
 * RoomScreen composes this as `this.decor` and calls exactly five methods:
 * reset() on enter, drawDisplays/drawEntry/drawTooltip in the normal frame, and
 * drawEditor while `editing`. All placement math shared with persistence lives
 * in domain/roomDecorations; this file is only presentation + editor state.
 */

import { panel, rrect } from '../render/canvas';
import { drawText, measureText, wrapText } from '../render/pixelFont';
import { drawSpriteCentered } from '../render/sprites';
import { drawImageSmooth, collectibleIcon } from '../render/assets';
import { drawIconCentered, drawImageContain, radial } from '../render/widgets';
import {
  alignRoomDecorationCoord,
  autoArrangeRoomDecorations,
  resolveRoomDecorations,
  roomDecorationCollectibles,
  roomDecorationZoneFor,
  ROOM_DECORATION_CAPACITY,
  sanitizeRoomDecorations,
} from '../domain/roomDecorations';
import { RARITIES } from '../content';
import { byId as collectibleById } from '../content/collectibles';
import type {
  Collectible,
  Point,
  RoomDecorationPlacement,
  RoomDecorationZone,
} from '../core/types';
import type { ScreenContext } from './screen';
import { t, tCollectibleDesc, tCollectibleName, tRarity, tType } from '../i18n';

// ---- palette (matches roomScreen) -----------------------------------------
const GOLD = '#ffd23f';
const CYAN = '#5fe6d6';
const MAGENTA = '#e15ad8';
const GREEN = '#5fd66f';
const INK = '#f6f4ff';

type Rect = { x: number; y: number; w: number; h: number };
type DecorationFilter = RoomDecorationZone | 'all';

/** Scenery zones — each is the bounding box of a piece of display furniture
 * (pegboard / riser / rug) rather than an abstract rectangle. They protect
 * machines and UI; x is free (grid-snapped) while y quantizes to the
 * furniture's rows/baseline. Floor bottom edge = riser feet at y868; buddy
 * ends above the DECOR entry card so the rug never slides under the button. */
const DECORATION_ZONES: Readonly<Record<RoomDecorationZone, Rect>> = {
  wall: { x: 405, y: 214, w: 198, h: 286 },
  floor: { x: 398, y: 768, w: 214, h: 100 },
  buddy: { x: 1080, y: 700, w: 132, h: 136 },
};

const DECOR_INVENTORY = { x: 16, y: 878, w: 1568, h: 112 };
const DECOR_PAGE_SIZE = 8;

/** The DECOR entry card on the Home screen; the buddy rug also keys off it so
 * the rug never slides under the button. */
const DECOR_ENTRY = { x: 1084, y: 838, w: 124, h: 54 };

// ---- furniture geometry ---------------------------------------------------
// Prizes no longer float at arbitrary points inside a rectangle. Each zone has
// a piece of furniture (generated art with a procedural fallback) that defines
// WHERE things rest, the way Animal Crossing furniture defines surfaces:
//   wall  -> a pegboard display with two hook rails; prizes hang from a rail
//   floor -> a low display riser; prizes stand on its top surface
//   buddy -> a cozy rug; buddies sit on it
// Fractions are MEASURED off the production sprites (see docs/
// ROOM_DISPLAY_INFRASTRUCTURE_ASSETS.md): the pegboard's magenta rails sit at
// y=65/172 of 248, the riser's gold lip at y=25 of 48, the rug fills its box.
const WALL_BOARD_ART = { w: 198, h: 248, rails: [65 / 248, 172 / 248] as const };
const FLOOR_RISER_ART = { w: 232, h: 48, surface: 25 / 48 };
const BUDDY_RUG_ART = { w: 148, h: 70, sit: 0.52 };

/** Stored y values for the two wall rails — exact 40-grid steps (10/40, 30/40)
 * so sanitizeRoomDecorations round-trips them unchanged. */
const WALL_ROW_Y = [0.25, 0.75] as const;

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

/** The wall board, contain-fit by width and vertically centered in its zone. */
function wallBoardRect(): Rect {
  const z = DECORATION_ZONES.wall;
  const h = z.w * (WALL_BOARD_ART.h / WALL_BOARD_ART.w);
  return { x: z.x, y: z.y + (z.h - h) / 2, w: z.w, h };
}

/** Screen y of a wall hook rail (row 0 = upper, 1 = lower). */
function wallRailY(row: 0 | 1): number {
  const b = wallBoardRect();
  return b.y + b.h * WALL_BOARD_ART.rails[row];
}

/** The floor riser, slightly wider than its zone, feet on the zone bottom. */
function floorRiserRect(): Rect {
  const z = DECORATION_ZONES.floor;
  const w = z.w + 18;
  const h = w * (FLOOR_RISER_ART.h / FLOOR_RISER_ART.w);
  return { x: z.x - 9, y: z.y + z.h - h, w, h };
}

/** Screen y where floor prizes' feet rest (on the riser's top surface). */
function floorBaselineY(): number {
  const r = floorRiserRect();
  return r.y + r.h * FLOOR_RISER_ART.surface + 2;
}

/** The buddy rug, kept fully clear of the DECOR entry card below it. */
function buddyRugRect(): Rect {
  const z = DECORATION_ZONES.buddy;
  const w = z.w + 16;
  const h = w * (BUDDY_RUG_ART.h / BUDDY_RUG_ART.w);
  return { x: z.x - 8, y: DECOR_ENTRY.y - 2 - h, w, h };
}

/** Screen y where buddies' feet rest on the rug. */
function buddyBaselineY(): number {
  const r = buddyRugRect();
  return r.y + r.h * BUDDY_RUG_ART.sit;
}

/** A tiny pencil glyph (edit affordance), centered on (cx, cy). A diagonal
 *  shaft with a nib at the lower-left, sized by `s`. Shared with the player
 *  card's name-edit cue on the Home screen. */
export function drawPencil(g: CanvasRenderingContext2D, cx: number, cy: number, s: number, color: string): void {
  g.save();
  g.strokeStyle = color;
  g.fillStyle = color;
  g.lineWidth = 2;
  g.lineCap = 'round';
  // shaft, lower-left -> upper-right
  g.beginPath();
  g.moveTo(cx - s * 0.42, cy + s * 0.42);
  g.lineTo(cx + s * 0.42, cy - s * 0.42);
  g.stroke();
  // nib triangle at the writing end
  g.beginPath();
  g.moveTo(cx - s * 0.5, cy + s * 0.5);
  g.lineTo(cx - s * 0.5 + 4, cy + s * 0.5 - 1.5);
  g.lineTo(cx - s * 0.5 + 1.5, cy + s * 0.5 - 4);
  g.closePath();
  g.fill();
  g.restore();
}

/** A rarity's glow color with soft alpha, for radial halos behind prize art.
 * Shared with the Home prize wall. */
export function rarityGlow(rarity: keyof typeof RARITIES): string {
  const c = RARITIES[rarity].glow;
  return c.length === 7 ? c + '55' : c;
}

export class RoomDecorController {
  /** Hovered world prize; rendered last so its tooltip clears machines/UI. */
  private roomDisplayTip: { collectible: Collectible; cx: number; cy: number } | null = null;
  private decorEditing = false;
  private decorDraft: RoomDecorationPlacement[] = [];
  private decorDraftIsAutomatic = false;
  private decorInitial: RoomDecorationPlacement[] = [];
  private decorInitialIsAutomatic = false;
  private decorFilter: DecorationFilter = 'all';
  private decorPage = 0;
  private decorSelectedId: string | null = null;
  private decorDrag: {
    collectibleId: string;
    start: Point;
    point: Point;
    moved: boolean;
    origin: RoomDecorationPlacement | null;
  } | null = null;
  private decorNotice: { key: string; until: number; warn: boolean } | null = null;
  /** While armed (a deadline), the next CLOSE click discards unsaved changes. */
  private decorCloseArmedUntil = 0;

  constructor(private readonly ctx: ScreenContext) {}

  /** Whether decorate mode is open (RoomScreen swaps its frame layout on it). */
  get editing(): boolean {
    return this.decorEditing;
  }

  /** Leave decorate mode and drop transient interaction state (screen enter). */
  reset(): void {
    this.decorEditing = false;
    this.decorDrag = null;
  }

  // ---- resting room view ---------------------------------------------------

  /** Draw the saved arrangement, or a tidy live arrangement of the newest
   * prize in each family until the player saves a custom layout. While the
   * decoration editor is open this draws nothing: the editor redraws the whole
   * working set ABOVE its modal dim so the arrangement is the bright focus. */
  drawDisplays(g: CanvasRenderingContext2D, now: number): void {
    this.roomDisplayTip = null;
    if (this.decorEditing) return;
    const placements = resolveRoomDecorations(this.ctx.store.state.owned, this.ctx.store.state.roomDecorations);
    // Only furnish zones that hold at least one prize: a fresh room stays the
    // clean painted arcade, and furniture appears the moment it has a job.
    this.drawRoomDisplayInfrastructure(g, false, new Set(placements.map((p) => p.zone)));

    for (const placement of this.sortedPlacements(placements)) {
      const collectible = collectibleById[placement.collectibleId];
      if (!collectible) continue;
      const point = this.decorationPoint(placement, collectible);
      const size = this.decorationSize(collectible);
      // Buddies are companions, not furniture: give them a gentle idle bob so
      // the corner reads as alive. Phase comes from the id so two buddies never
      // move in lockstep. Wall/floor prizes stay put.
      const bob = placement.zone === 'buddy' ? Math.sin(now / 480 + this.decorBobPhase(collectible.id)) * 3 : 0;
      const hovered = this.ctx.stage.hotspot({
        x: point.x - size / 2,
        y: point.y - size / 2,
        w: size,
        h: size,
        cursor: 'help',
        id: 'room-display-' + collectible.id,
      });
      this.drawRoomCollectible(g, collectible, point.x, point.y + bob, size, hovered, placement.zone !== 'wall');
      if (hovered) this.roomDisplayTip = { collectible, cx: point.x, cy: point.y };
    }
  }

  /** Stable draw order: wall behind floor behind buddies, top-down inside a
   * zone, so overlap between neighbouring prizes never flickers frame to frame. */
  private sortedPlacements(placements: readonly RoomDecorationPlacement[]): RoomDecorationPlacement[] {
    const zoneOrder = { wall: 0, floor: 1, buddy: 2 } as const;
    return [...placements].sort((a, b) => zoneOrder[a.zone] - zoneOrder[b.zone] || a.y - b.y);
  }

  private decorBobPhase(id: string): number {
    let hash = 0;
    for (let i = 0; i < id.length; i++) hash += id.charCodeAt(i);
    return hash;
  }

  /** The zones' furniture. Every display area is a physical object prizes rest
   * ON — a wall pegboard, a floor riser, a buddy rug — so nothing floats over
   * the painted room. Collection milestones upgrade the furniture: the tier-1
   * neon shelf mounts under the pegboard, the tier-3 collector pedestal
   * replaces the plain riser. Each asset has a procedural fallback. */
  private drawRoomDisplayInfrastructure(
    g: CanvasRenderingContext2D,
    editing = false,
    occupied?: ReadonlySet<RoomDecorationZone>,
  ): void {
    const tier = this.ctx.store.collectionMilestoneTier();
    const wants = (zone: RoomDecorationZone): boolean => editing || !occupied || occupied.has(zone);

    // Wall pegboard.
    const board = wallBoardRect();
    if (wants('wall')) {
      const boardImg = this.ctx.assets.get('decorWallBoard');
      if (boardImg) {
        drawImageSmooth(g, boardImg, board.x, board.y, board.w, board.h);
      } else {
        this.drawWallBoardFallback(g, board);
      }
    }
    if (wants('wall') && tier >= 1) {
      const shelf = this.ctx.assets.get('collectionNeonShelf');
      if (shelf) {
        const cx = board.x + board.w / 2;
        const cy = board.y + board.h + 8;
        g.save();
        g.shadowColor = MAGENTA;
        g.shadowBlur = editing ? 14 : 7;
        drawImageContain(g, shelf, cx, cy, board.w + 8, 25);
        g.restore();
        drawImageContain(g, shelf, cx, cy, board.w + 8, 25);
      }
    }

    // Floor riser — upgraded to the collector pedestal art at tier 3.
    if (wants('floor')) {
      const riser = floorRiserRect();
      const pedestal = tier >= 3 ? this.ctx.assets.get('collectionPedestal') : null;
      const riserImg = this.ctx.assets.get('decorFloorRiser');
      if (pedestal) {
        drawImageContain(g, pedestal, riser.x + riser.w / 2, riser.y + riser.h - riser.h / 2, riser.w, riser.h + 12);
      } else if (riserImg) {
        drawImageSmooth(g, riserImg, riser.x, riser.y, riser.w, riser.h);
      } else {
        this.drawFloorRiserFallback(g, riser);
      }
    }

    // Buddy rug.
    if (wants('buddy')) {
      const rug = buddyRugRect();
      const rugImg = this.ctx.assets.get('decorBuddyRug');
      if (rugImg) {
        drawImageSmooth(g, rugImg, rug.x, rug.y, rug.w, rug.h);
      } else {
        this.drawBuddyRugFallback(g, rug);
      }
    }
  }

  /** Procedural pegboard: dark panel, peg-hole texture, two magenta rails. */
  private drawWallBoardFallback(g: CanvasRenderingContext2D, b: Rect): void {
    g.save();
    rrect(g, b.x, b.y, b.w, b.h, 6);
    g.fillStyle = '#1b1230';
    g.fill();
    g.strokeStyle = '#3a3452';
    g.lineWidth = 3;
    g.stroke();
    g.fillStyle = 'rgba(10,7,20,0.85)';
    for (let py = b.y + 12; py < b.y + b.h - 10; py += 14) {
      for (let px = b.x + 10; px < b.x + b.w - 8; px += 14) {
        g.fillRect(px, py, 2, 2);
      }
    }
    for (const row of [0, 1] as const) {
      const y = b.y + b.h * WALL_BOARD_ART.rails[row];
      g.save();
      g.shadowColor = MAGENTA;
      g.shadowBlur = 6;
      g.fillStyle = MAGENTA;
      g.fillRect(b.x + 8, y, b.w - 16, 2);
      g.restore();
      g.fillStyle = '#8a3a85';
      g.fillRect(b.x + 8, y + 2, b.w - 16, 1);
    }
    g.restore();
  }

  /** Procedural riser: checkered top, dark face, glowing gold lip. */
  private drawFloorRiserFallback(g: CanvasRenderingContext2D, r: Rect): void {
    const topH = r.h * FLOOR_RISER_ART.surface;
    g.save();
    g.fillStyle = '#241a38';
    g.fillRect(r.x, r.y, r.w, topH);
    g.fillStyle = '#2c2144';
    const cell = 16;
    for (let i = 0; i < Math.ceil(r.w / cell); i++) {
      if (i % 2 === 0) g.fillRect(r.x + i * cell, r.y, Math.min(cell, r.x + r.w - (r.x + i * cell)), topH);
    }
    g.save();
    g.shadowColor = GOLD;
    g.shadowBlur = 5;
    g.fillStyle = GOLD;
    g.fillRect(r.x, r.y + topH, r.w, 2);
    g.restore();
    g.fillStyle = '#171126';
    g.fillRect(r.x, r.y + topH + 2, r.w, r.h - topH - 2);
    g.fillStyle = CYAN;
    for (let i = 1; i <= 4; i++) {
      g.fillRect(r.x + (r.w * i) / 5, r.y + topH + (r.h - topH) / 2, 3, 3);
    }
    g.restore();
  }

  /** Procedural rug: cyan-bordered oval with a gold star motif. */
  private drawBuddyRugFallback(g: CanvasRenderingContext2D, r: Rect): void {
    const cx = r.x + r.w / 2;
    const cy = r.y + r.h / 2;
    g.save();
    g.beginPath();
    g.ellipse(cx, cy, r.w / 2, r.h / 2, 0, 0, Math.PI * 2);
    g.fillStyle = '#1e1633';
    g.fill();
    g.strokeStyle = CYAN;
    g.lineWidth = 2.5;
    g.stroke();
    g.beginPath();
    g.ellipse(cx, cy, r.w / 2 - 5, r.h / 2 - 4, 0, 0, Math.PI * 2);
    g.strokeStyle = '#2f8a80';
    g.lineWidth = 1;
    g.stroke();
    g.fillStyle = GOLD;
    g.fillRect(cx - 1.5, cy - 6, 3, 12);
    g.fillRect(cx - 6, cy - 1.5, 12, 3);
    g.restore();
  }

  /** One scenery zone in the editor. Zones are living UI now: marching-ants
   * borders, corner brackets, a capacity readout, and drag-aware emphasis —
   * the zone that accepts the held prize glows while the others fall back. */
  private drawDecorationZone(
    g: CanvasRenderingContext2D,
    zone: RoomDecorationZone,
    color: string,
    now: number,
    activeZone: RoomDecorationZone | null,
  ): void {
    const r = DECORATION_ZONES[zone];
    const engaged = activeZone === zone; // the held/selected prize belongs here
    const benched = activeZone !== null && !engaged; // ...or belongs elsewhere
    const used = this.decorDraft.filter((p) => p.zone === zone).length;
    const cap = ROOM_DECORATION_CAPACITY[zone];
    const full = used >= cap;
    const pulse = 0.5 + 0.5 * Math.sin(now / 300);

    g.save();
    if (benched) g.globalAlpha = 0.28;

    // Interior wash — a touch stronger when this zone wants the held prize.
    g.fillStyle = color + (engaged ? '26' : '14');
    g.fillRect(r.x, r.y, r.w, r.h);

    // Marching-ants border: the dash offset walks with time, the classic
    // "this region is editable" signal.
    g.strokeStyle = engaged ? color : color + 'b8';
    g.lineWidth = engaged ? 2.5 : 2;
    g.setLineDash([8, 7]);
    g.lineDashOffset = -((now / 45) % 15);
    if (engaged) {
      g.shadowColor = color;
      g.shadowBlur = 10 + 6 * pulse;
    }
    g.strokeRect(r.x + 1, r.y + 1, r.w - 2, r.h - 2);
    g.setLineDash([]);
    g.shadowBlur = 0;

    // Solid corner brackets keep the bounds crisp even mid-dash.
    const tick = 11;
    g.lineWidth = 2.5;
    g.beginPath();
    for (const [cx, cy, dx, dy] of [
      [r.x + 1, r.y + 1, 1, 1],
      [r.x + r.w - 1, r.y + 1, -1, 1],
      [r.x + 1, r.y + r.h - 1, 1, -1],
      [r.x + r.w - 1, r.y + r.h - 1, -1, -1],
    ] as const) {
      g.moveTo(cx + dx * tick, cy);
      g.lineTo(cx, cy);
      g.lineTo(cx, cy + dy * tick);
    }
    g.stroke();

    // Name plate + capacity readout mounted on the zone's top edge. The name
    // shrinks to fit beside the capacity plate so narrow zones (buddy corner)
    // never clip or overlap the two.
    const label = t('decor.zone.' + zone);
    const capText = used + '/' + cap;
    const capW = measureText(capText, 1.2) + 12;
    let labelScale = 1.2;
    const labelMax = r.w - capW - 30;
    while (labelScale > 0.8 && measureText(label, labelScale) > labelMax) labelScale -= 0.05;
    const labelW = Math.min(labelMax, measureText(label, labelScale)) + 16;
    rrect(g, r.x + 8, r.y + 8, labelW, 22, 4);
    g.fillStyle = 'rgba(7,5,14,0.88)';
    g.fill();
    drawText(g, label, r.x + 16, r.y + 14 + (1.2 - labelScale) * 3, labelScale, color);
    rrect(g, r.x + r.w - capW - 8, r.y + 8, capW, 22, 4);
    g.fillStyle = 'rgba(7,5,14,0.88)';
    g.fill();
    drawText(g, capText, r.x + r.w - 14, r.y + 14, 1.2, full ? '#ff5c6a' : color, { align: 'right' });
    g.restore();
  }

  private decorationSize(collectible: Collectible): number {
    if (collectible.type === 'sign') return 78;
    if (collectible.type === 'badge') return 54;
    if (collectible.type === 'buddy') return 72;
    return collectible.type === 'trophy' ? 70 : 64;
  }

  /** Placement → sprite CENTER on screen. Prizes rest on furniture instead of
   * floating at free points: wall prizes hang centered on one of two hook
   * rails; floor/buddy prizes are bottom-anchored so their FEET sit on the
   * riser surface / rug line regardless of sprite size. x stays free (grid-
   * snapped) along the row. Stored y remains a 0..1 fraction so old saves and
   * sanitize round-trips keep working — it now selects/encodes the row. */
  private decorationPoint(placement: RoomDecorationPlacement, collectible: Collectible): Point {
    const zone = DECORATION_ZONES[placement.zone];
    const size = this.decorationSize(collectible);
    const padX = Math.min(size * 0.48, zone.w * 0.24);
    const x = zone.x + padX + placement.x * Math.max(0, zone.w - padX * 2);
    if (placement.zone === 'wall') {
      // Nearer stored row wins; the sprite HANGS from the rail — its top edge
      // tucks 6px behind the hooks, like a real pegboard item.
      const row = placement.y < 0.5 ? 0 : 1;
      return { x, y: wallRailY(row) + size / 2 - 6 };
    }
    const baseline = placement.zone === 'floor' ? floorBaselineY() : buddyBaselineY();
    return { x, y: baseline - size / 2 };
  }

  /** Quantize a stored placement onto its zone's row structure so the ghost
   * previews and the final resting spot are byte-identical. */
  private snapPlacementToRow(placement: RoomDecorationPlacement): RoomDecorationPlacement {
    if (placement.zone === 'wall') {
      return { ...placement, y: placement.y < 0.5 ? WALL_ROW_Y[0] : WALL_ROW_Y[1] };
    }
    // Floor/buddy y is ignored by rendering (baseline-anchored); store the
    // grid-aligned midpoint so saves stay stable and sanitize-safe.
    return { ...placement, y: 0.5 };
  }

  private drawRoomCollectible(
    g: CanvasRenderingContext2D,
    collectible: Collectible,
    cx: number,
    cy: number,
    size: number,
    hovered: boolean,
    floorItem: boolean,
  ): void {
    if (floorItem) {
      g.save();
      g.fillStyle = 'rgba(0,0,0,0.4)';
      g.beginPath();
      g.ellipse(cx, cy + size * 0.39, size * 0.38, size * 0.1, 0, 0, Math.PI * 2);
      g.fill();
      g.restore();
    } else {
      // Wall-mounted prizes get a soft offset drop shadow so they read as
      // hanging on the wall instead of floating in front of it.
      g.save();
      g.fillStyle = 'rgba(0,0,0,0.32)';
      g.beginPath();
      g.ellipse(cx + size * 0.07, cy + size * 0.1, size * 0.4, size * 0.4, 0, 0, Math.PI * 2);
      g.fill();
      g.restore();
    }
    const rarity = RARITIES[collectible.rarity];
    radial(g, cx, cy, size * 0.66, rarityGlow(collectible.rarity));
    const icon = collectibleIcon(collectible.id);
    g.save();
    g.shadowColor = rarity.glow;
    g.shadowBlur = hovered ? 18 : 8;
    if (icon) drawIconCentered(g, icon, cx, cy, size);
    else drawSpriteCentered(g, collectible.sprite, cx, cy, size * 0.82, collectible.tint);
    g.restore();
  }

  drawTooltip(g: CanvasRenderingContext2D): void {
    const tip = this.roomDisplayTip;
    if (!tip) return;

    const c = tip.collectible;
    const rarity = RARITIES[c.rarity];
    const w = 270;
    const pad = 14;
    const descScale = 1.2;
    const lines = wrapText(tCollectibleDesc(c.id), descScale, w - pad * 2).slice(0, 4);
    const h = 66 + lines.length * 13;
    let x = tip.cx < 800 ? tip.cx + 54 : tip.cx - w - 54;
    let y = tip.cy - h / 2;
    x = Math.max(10, Math.min(this.ctx.stage.width - w - 10, x));
    y = Math.max(10, Math.min(this.ctx.stage.height - h - 10, y));

    panel(g, x, y, w, h, {
      radius: 8,
      fill: 'rgba(12,8,24,0.96)',
      border: rarity.color,
      borderWidth: 2,
    });
    let nameScale = 1.7;
    const name = tCollectibleName(c.id);
    while (nameScale > 1 && measureText(name, nameScale) > w - pad * 2) nameScale -= 0.1;
    drawText(g, name, x + pad, y + 12, nameScale, INK, { glow: rarity.glow, glowBlur: 3 });
    drawText(g, tRarity(c.rarity) + ' / ' + tType(c.type), x + pad, y + 33, 1.05, rarity.color);
    for (let i = 0; i < lines.length; i++) {
      drawText(g, lines[i], x + pad, y + 53 + i * 13, descScale, '#c8c2dc');
    }
  }

  drawEntry(g: CanvasRenderingContext2D, now: number): void {
    const x = 1084;
    const y = 838;
    const w = 124;
    const h = 54;
    const hovered = this.ctx.stage.hotspot({
      x,
      y,
      w,
      h,
      cursor: 'pointer',
      id: 'decorate-room',
      onClick: () => this.openDecorationEditor(),
    });
    // Nudge the player toward the editor when prizes are waiting on the bench:
    // any owned decorable not currently standing in the room lights this up.
    const placements = resolveRoomDecorations(this.ctx.store.state.owned, this.ctx.store.state.roomDecorations);
    const placedIds = new Set(placements.map((p) => p.collectibleId));
    const unplaced = roomDecorationCollectibles(this.ctx.store.state.owned).filter((c) => !placedIds.has(c.id)).length;
    const beckoning = unplaced > 0 && !hovered;

    const frame = this.ctx.assets.get('homeShopCard');
    const glow = hovered ? 12 : beckoning ? 7 + 4 * Math.sin(now / 420) : 0;
    if (frame) {
      if (glow > 0) {
        g.save();
        g.shadowColor = CYAN;
        g.shadowBlur = glow;
        drawImageSmooth(g, frame, x, y, w, h);
        g.restore();
      }
      drawImageSmooth(g, frame, x, y, w, h);
    } else {
      panel(g, x, y, w, h, { radius: 6, fill: 'rgba(10,7,20,0.9)', border: CYAN, borderWidth: 2 });
    }
    drawPencil(g, x + 27, y + h / 2, 17, CYAN);
    drawText(g, t('decor.edit'), x + 48, y + 21, 1.3, hovered ? '#ffffff' : CYAN);
    if (unplaced > 0) {
      // A gold count pip, arcade-token style, on the card's corner.
      const pipX = x + w - 8;
      const pipY = y + 6;
      g.save();
      g.beginPath();
      g.arc(pipX, pipY, 9, 0, Math.PI * 2);
      g.fillStyle = GOLD;
      g.shadowColor = GOLD;
      g.shadowBlur = 6;
      g.fill();
      g.restore();
      drawText(g, String(Math.min(unplaced, 9)), pipX, pipY - 5, 1.1, '#241a06', { align: 'center' });
      if (hovered) {
        const tip = t('decor.newPrizeHint');
        const tw = measureText(tip, 1.2) + 16;
        rrect(g, x + w / 2 - tw / 2, y - 28, tw, 22, 4);
        g.fillStyle = 'rgba(7,5,14,0.94)';
        g.fill();
        drawText(g, tip, x + w / 2, y - 22, 1.2, GOLD, { align: 'center' });
      }
    }
  }

  // ---- decorate mode -------------------------------------------------------

  private openDecorationEditor(): void {
    const saved = this.ctx.store.state.roomDecorations;
    this.decorDraft = resolveRoomDecorations(this.ctx.store.state.owned, saved).map((placement) => ({ ...placement }));
    this.decorDraftIsAutomatic = saved == null;
    this.decorInitial = this.decorDraft.map((placement) => ({ ...placement }));
    this.decorInitialIsAutomatic = this.decorDraftIsAutomatic;
    this.decorEditing = true;
    this.decorFilter = 'all';
    this.decorPage = 0;
    this.decorSelectedId = null;
    this.decorDrag = null;
    this.decorNotice = null;
    this.decorCloseArmedUntil = 0;
    this.ctx.sound.click();
    this.ctx.stage.wake(900);
  }

  /** Unsaved when the draft differs from what the editor opened with. */
  private decorDirty(): boolean {
    if (this.decorDraftIsAutomatic !== this.decorInitialIsAutomatic) return true;
    if (this.decorDraft.length !== this.decorInitial.length) return true;
    const key = (p: RoomDecorationPlacement): string => p.collectibleId + '@' + p.zone + ':' + p.x + ',' + p.y;
    const initial = new Set(this.decorInitial.map(key));
    return this.decorDraft.some((p) => !initial.has(key(p)));
  }

  /** The zone the currently held (drag) or selected prize belongs to; the
   * editor uses it to spotlight the one zone that will accept a drop. */
  private decorActiveZone(): RoomDecorationZone | null {
    const id = this.decorDrag?.moved ? this.decorDrag.collectibleId : this.decorSelectedId;
    if (!id) return null;
    const collectible = collectibleById[id];
    return collectible ? roomDecorationZoneFor(collectible.type) : null;
  }

  /** The selected BENCH prize's id if it belongs to `zone` and is still
   * unplaced — i.e. a click inside that zone should place it. */
  private pendingBenchSelectionFor(zone: RoomDecorationZone): string | null {
    const id = this.decorSelectedId;
    if (!id) return null;
    if (this.decorDraft.some((placement) => placement.collectibleId === id)) return null;
    const collectible = collectibleById[id];
    if (!collectible || roomDecorationZoneFor(collectible.type) !== zone) return null;
    return id;
  }

  private closeDecorationEditor(): void {
    this.decorEditing = false;
    this.decorDrag = null;
    this.decorSelectedId = null;
    this.decorCloseArmedUntil = 0;
    // The frame after closing, Home's hotspots (shop cards, bank, prize wall)
    // reoccupy these coordinates. Swallow clicks briefly so a rapid second
    // CLOSE/SAVE click can't fall through and, e.g., buy the trophy card.
    this.ctx.stage.suppressClicks(400);
  }

  drawEditor(g: CanvasRenderingContext2D, now: number): void {
    // This late, full-screen hotspot shields the editor from the room's bank,
    // cabinet and prize-wall hotspots. Editor controls registered below it win.
    this.ctx.stage.hotspot({
      x: 0,
      y: 0,
      w: this.ctx.stage.width,
      h: this.ctx.stage.height,
      id: 'decor-editor-shield',
      // Clicking open room space (outside every zone/bench/button) drops the
      // current selection — the natural "never mind" gesture.
      onClick: () => { this.decorSelectedId = null; },
    });

    // A real modal dim. The room recedes; everything editable is then redrawn
    // ABOVE this veil (zones, prizes, ghosts), so the editable world is the
    // one brightly lit thing on screen instead of a faint dashed overlay.
    g.fillStyle = 'rgba(4,3,12,0.52)';
    g.fillRect(0, 0, this.ctx.stage.width, DECOR_INVENTORY.y);

    const activeZone = this.decorActiveZone();
    this.drawRoomDisplayInfrastructure(g, true);
    for (const zone of ['wall', 'floor', 'buddy'] as const) {
      this.drawDecorationZone(g, zone, this.decorZoneColor(zone), now, activeZone);
      const rect = DECORATION_ZONES[zone];
      this.ctx.stage.hotspot({
        ...rect,
        id: 'decor-zone-' + zone,
        cursor: this.decorSelectedId ? 'crosshair' : 'default',
        onClick: () => {
          if (this.decorSelectedId) this.placeDecoration(this.decorSelectedId, zone, { ...this.ctx.stage.mouse });
        },
      });
    }

    this.drawDecorationTitle(g);
    this.drawEditorPlacements(g, now);
    this.drawDecorationInventory(g, now);
    this.drawSelectionGhost(g, now);
    this.drawDecorationDrag(g, now);
    if (this.decorNotice && now < this.decorNotice.until) {
      const border = this.decorNotice.warn ? '#ff5c6a' : MAGENTA;
      panel(g, 580, 830, 440, 38, { radius: 6, fill: 'rgba(8,5,18,0.94)', border, borderWidth: 2 });
      drawText(g, t(this.decorNotice.key), 800, 841, 1.55, INK, { align: 'center' });
    }
  }

  private decorZoneColor(zone: RoomDecorationZone): string {
    return zone === 'wall' ? MAGENTA : zone === 'floor' ? GOLD : CYAN;
  }

  /** Editor headline: a physical mode plate hanging under the marquee. */
  private drawDecorationTitle(g: CanvasRenderingContext2D): void {
    panel(g, 632, 118, 336, 36, {
      radius: 5,
      fill: 'rgba(5,7,16,0.9)',
      border: 'rgba(95,230,214,0.72)',
      borderWidth: 1,
    });
    drawText(g, t('decor.title'), 800, 128, 1.8, CYAN, { align: 'center', glow: CYAN, glowBlur: 4 });
  }

  /** Placed prizes inside the editor: bright above the dim, hover ring +
   * grab affordance, selection brackets, and a floating × remover so a prize
   * can be sent back to the bench without knowing the drag-down gesture. */
  private drawEditorPlacements(g: CanvasRenderingContext2D, now: number): void {
    for (const placement of this.sortedPlacements(this.decorDraft)) {
      if (this.decorDrag?.moved && this.decorDrag.collectibleId === placement.collectibleId) continue;
      const collectible = collectibleById[placement.collectibleId];
      if (!collectible) continue;
      const point = this.decorationPoint(placement, collectible);
      const size = this.decorationSize(collectible);
      const selected = this.decorSelectedId === collectible.id;
      const hovered = this.ctx.stage.hotspot({
        x: point.x - size / 2,
        y: point.y - size / 2,
        w: size,
        h: size,
        id: 'decor-placed-' + collectible.id,
        cursor: 'grab',
        onClick: () => {
          // Click-to-place wins over select: if a bench prize is armed for this
          // zone, standing prizes must not steal its landing click.
          const pending = this.pendingBenchSelectionFor(placement.zone);
          if (pending) {
            this.placeDecoration(pending, placement.zone, { ...this.ctx.stage.mouse });
            return;
          }
          this.decorSelectedId = selected ? null : collectible.id;
          this.ctx.sound.click();
        },
        onDragStart: (start) => this.beginDecorationDrag(collectible.id, start),
        onDragMove: (pointNow) => this.moveDecorationDrag(pointNow),
        onDragEnd: (end) => this.endDecorationDrag(end),
      });
      this.drawRoomCollectible(g, collectible, point.x, point.y, size, hovered || selected, placement.zone !== 'wall');

      if (hovered && !selected) {
        g.save();
        g.strokeStyle = 'rgba(246,244,255,0.65)';
        g.lineWidth = 1.5;
        g.setLineDash([4, 4]);
        g.strokeRect(point.x - size / 2 - 3, point.y - size / 2 - 3, size + 6, size + 6);
        g.setLineDash([]);
        g.restore();
      }
      if (selected) {
        const zoneColor = this.decorZoneColor(placement.zone);
        const breathe = 2 + Math.sin(now / 260) * 1.5;
        g.save();
        g.strokeStyle = zoneColor;
        g.shadowColor = zoneColor;
        g.shadowBlur = 9;
        g.lineWidth = 2;
        g.strokeRect(point.x - size / 2 - breathe - 2, point.y - size / 2 - breathe - 2, size + (breathe + 2) * 2, size + (breathe + 2) * 2);
        g.restore();
        this.drawDecorationRemoveButton(g, collectible.id, point.x + size / 2 + 4, point.y - size / 2 - 4);
      }
    }
  }

  /** A small round × that returns the selected prize to the inventory. */
  private drawDecorationRemoveButton(g: CanvasRenderingContext2D, collectibleId: string, cx: number, cy: number): void {
    const r = 11;
    const hovered = this.ctx.stage.hotspot({
      x: cx - r,
      y: cy - r,
      w: r * 2,
      h: r * 2,
      id: 'decor-remove-' + collectibleId,
      cursor: 'pointer',
      onClick: () => this.removeDecoration(collectibleId),
    });
    g.save();
    g.beginPath();
    g.arc(cx, cy, r, 0, Math.PI * 2);
    g.fillStyle = hovered ? '#ff5c6a' : 'rgba(12,8,22,0.95)';
    g.fill();
    g.strokeStyle = hovered ? '#ffffff' : '#ff5c6a';
    g.lineWidth = 2;
    g.stroke();
    const arm = 4;
    g.strokeStyle = hovered ? '#ffffff' : '#ff8d96';
    g.beginPath();
    g.moveTo(cx - arm, cy - arm);
    g.lineTo(cx + arm, cy + arm);
    g.moveTo(cx + arm, cy - arm);
    g.lineTo(cx - arm, cy + arm);
    g.stroke();
    g.restore();
  }

  private removeDecoration(collectibleId: string): void {
    const had = this.decorDraft.some((placement) => placement.collectibleId === collectibleId);
    if (!had) return;
    this.decorDraft = this.decorDraft.filter((placement) => placement.collectibleId !== collectibleId);
    this.decorDraftIsAutomatic = false;
    if (this.decorSelectedId === collectibleId) this.decorSelectedId = null;
    this.ctx.sound.unplace();
    this.setDecorNotice('decor.stored');
  }

  /** When a bench prize is selected (click-to-place mode) a translucent ghost
   * follows the cursor over its home zone, snapped to the real resting spot,
   * so the player sees exactly where the prize will land before clicking. */
  private drawSelectionGhost(g: CanvasRenderingContext2D, now: number): void {
    if (!this.decorSelectedId || this.decorDrag?.moved) return;
    const collectible = collectibleById[this.decorSelectedId];
    if (!collectible) return;
    // Only for prizes still on the bench — a selected placed prize already
    // shows its brackets in the room; a second ghost would read as a duplicate.
    if (this.decorDraft.some((placement) => placement.collectibleId === collectible.id)) return;
    const zone = roomDecorationZoneFor(collectible.type);
    const mouse = this.ctx.stage.mouse;
    if (!zone || this.decorationZoneAt(mouse) !== zone) return;

    const snapped = this.snappedPlacement(collectible.id, zone, mouse);
    const point = this.decorationPoint(snapped, collectible);
    const size = this.decorationSize(collectible);
    g.save();
    g.globalAlpha = 0.45 + 0.12 * Math.sin(now / 220);
    this.drawRoomCollectible(g, collectible, point.x, point.y, size, false, zone !== 'wall');
    g.restore();
  }

  /** The placement a click/drop at `point` would produce: normalized, snapped
   * to the magnetic grid AND onto the zone's row structure — the editor-side
   * mirror of sanitizeRoomDecorations plus the furniture baseline rules. */
  private snappedPlacement(collectibleId: string, zone: RoomDecorationZone, point: Point): RoomDecorationPlacement {
    const raw = this.decorationPlacementAt(collectibleId, zone, point);
    return this.snapPlacementToRow({ ...raw, x: alignRoomDecorationCoord(raw.x), y: alignRoomDecorationCoord(raw.y) });
  }

  private drawDecorationInventory(g: CanvasRenderingContext2D, now: number): void {
    const r = DECOR_INVENTORY;
    // While a placed prize is being dragged, the bench is a live drop target
    // ("drag here to store") — let the whole counter glow cyan to say so.
    const storingHover = !!this.decorDrag?.moved && this.decorDrag.point.y >= r.y;
    const benchArmed = !!this.decorDrag?.moved && this.decorDrag.origin !== null;

    g.fillStyle = 'rgba(6,4,13,0.97)';
    g.fillRect(r.x, r.y, r.w, r.h);
    const lip = g.createLinearGradient(0, r.y, 0, r.y + 12);
    lip.addColorStop(0, '#6e5530');
    lip.addColorStop(0.28, '#ffd23f');
    lip.addColorStop(0.48, '#3b2a24');
    lip.addColorStop(1, '#16101f');
    g.fillStyle = lip;
    g.fillRect(r.x, r.y, r.w, 12);
    g.fillStyle = 'rgba(95,230,214,0.6)';
    g.fillRect(r.x + 238, r.y + 10, 774, 2);
    g.fillRect(r.x + 1020, r.y + 10, r.w - 1036, 2);
    if (benchArmed) {
      g.save();
      g.strokeStyle = storingHover ? CYAN : 'rgba(95,230,214,0.55)';
      g.shadowColor = CYAN;
      g.shadowBlur = storingHover ? 18 : 8 + 4 * Math.sin(now / 220);
      g.lineWidth = storingHover ? 3 : 2;
      g.strokeRect(r.x + 1, r.y + 1, r.w - 2, r.h - 2);
      g.restore();
    } else {
      g.strokeStyle = 'rgba(255,210,63,0.38)';
      g.lineWidth = 2;
      g.strokeRect(r.x + 1, r.y + 1, r.w - 2, r.h - 2);
    }
    for (const x of [r.x + 10, r.x + r.w - 10]) {
      g.fillStyle = '#8c7650';
      g.fillRect(x - 2, r.y + 8, 4, 4);
      g.fillRect(x - 2, r.y + r.h - 12, 4, 4);
    }

    const all = roomDecorationCollectibles(this.ctx.store.state.owned);
    const filtered = this.decorFilter === 'all'
      ? all
      : all.filter((collectible) => roomDecorationZoneFor(collectible.type) === this.decorFilter);
    const pages = Math.max(1, Math.ceil(filtered.length / DECOR_PAGE_SIZE));
    this.decorPage = Math.max(0, Math.min(pages - 1, this.decorPage));
    const page = filtered.slice(this.decorPage * DECOR_PAGE_SIZE, (this.decorPage + 1) * DECOR_PAGE_SIZE);

    panel(g, 30, 884, 208, 98, { radius: 6, fill: 'rgba(8,7,18,0.94)', border: 'rgba(255,210,63,0.72)', borderWidth: 2 });
    drawText(g, t('decor.inventory'), 52, 895, 1.5, GOLD);
    drawText(g, t('decor.ownedCount', { n: this.ctx.store.ownedCount(), total: this.ctx.store.totalCollectibles() }), 52, 925, 1.2, '#bdb5d6');
    drawText(g, t(benchArmed ? 'decor.storeHint' : 'decor.benchHint'), 52, 953, 0.95, benchArmed ? CYAN : '#8f88ad');

    const frame = this.ctx.assets.get('homeIconBtn');
    let hoveredTile: { collectible: Collectible; cx: number } | null = null;
    for (let i = 0; i < DECOR_PAGE_SIZE; i++) {
      const x = 268 + i * 86;
      const y = 886;
      const size = 64;
      const collectible = page[i];
      g.globalAlpha = collectible ? 1 : 0.32;
      if (frame) drawImageSmooth(g, frame, x, y, size, size);
      else panel(g, x, y, size, size, { radius: 5, fill: '#151126', border: '#4f456d', borderWidth: 2 });
      g.globalAlpha = 1;
      if (!collectible) continue;

      const selected = this.decorSelectedId === collectible.id;
      const placed = this.decorDraft.some((placement) => placement.collectibleId === collectible.id);
      const zone = roomDecorationZoneFor(collectible.type);
      const hovered = this.ctx.stage.hotspot({
        x,
        y,
        w: size,
        h: size,
        id: 'decor-inventory-' + collectible.id,
        cursor: 'grab',
        onClick: () => {
          this.decorSelectedId = selected ? null : collectible.id;
          this.ctx.sound.click();
        },
        onDragStart: (start) => this.beginDecorationDrag(collectible.id, start),
        onDragMove: (pointNow) => this.moveDecorationDrag(pointNow),
        onDragEnd: (end) => this.endDecorationDrag(end),
      });
      if (selected || hovered) {
        g.save();
        g.strokeStyle = selected ? GOLD : CYAN;
        if (selected) {
          g.shadowColor = GOLD;
          g.shadowBlur = 8 + 4 * Math.sin(now / 240);
        }
        g.lineWidth = 3;
        g.strokeRect(x + 2, y + 2, size - 4, size - 4);
        g.restore();
      }
      // Prizes already in the room sit dimmer on the bench — the bright copies
      // are the ones standing in the arcade.
      g.save();
      if (placed) g.globalAlpha = 0.42;
      const icon = collectibleIcon(collectible.id);
      if (icon) drawIconCentered(g, icon, x + size / 2, y + size / 2, 50);
      else drawSpriteCentered(g, collectible.sprite, x + size / 2, y + size / 2, 43, collectible.tint);
      g.restore();
      // Zone chip: a small color tab on the tile's bottom edge tells at a
      // glance which display area this prize belongs to.
      if (zone) {
        g.fillStyle = this.decorZoneColor(zone);
        g.fillRect(x + 6, y + size - 7, size - 12, 3);
      }
      if (placed) {
        g.save();
        g.fillStyle = GREEN;
        g.beginPath();
        g.arc(x + size - 10, y + 10, 6, 0, Math.PI * 2);
        g.fill();
        g.strokeStyle = '#0b2015';
        g.lineWidth = 2;
        g.beginPath();
        g.moveTo(x + size - 13, y + 10);
        g.lineTo(x + size - 11, y + 13);
        g.lineTo(x + size - 7, y + 7);
        g.stroke();
        g.restore();
      }
      if (hovered) hoveredTile = { collectible, cx: x + size / 2 };
    }

    // Hovered tile name plate floating above the bench (never clipped by it).
    if (hoveredTile && !this.decorDrag?.moved) {
      const name = tCollectibleName(hoveredTile.collectible.id);
      const zone = roomDecorationZoneFor(hoveredTile.collectible.type);
      const label = zone ? name + ' · ' + t('decor.zone.' + zone) : name;
      const w = measureText(label, 1.15) + 18;
      const cx = Math.max(r.x + w / 2 + 6, Math.min(r.x + r.w - w / 2 - 6, hoveredTile.cx));
      rrect(g, cx - w / 2, r.y - 27, w, 22, 4);
      g.fillStyle = 'rgba(7,5,14,0.94)';
      g.fill();
      g.strokeStyle = 'rgba(95,230,214,0.5)';
      g.lineWidth = 1;
      g.stroke();
      drawText(g, label, cx, r.y - 21, 1.15, INK, { align: 'center' });
    }

    this.drawDecorationFilters(g);
    this.drawDecorPageButton(g, 928, 958, '<', this.decorPage > 0, () => { this.decorPage--; });
    drawText(g, `${this.decorPage + 1}/${pages}`, 981, 968, 1.2, '#bdb5d6', { align: 'center' });
    this.drawDecorPageButton(g, 1010, 958, '>', this.decorPage + 1 < pages, () => { this.decorPage++; });

    const dirty = this.decorDirty();
    this.drawDecorationAction(g, 1040, 888, t('ui.save'), GREEN, () => this.saveDecorationLayout(), dirty ? now : undefined);
    this.drawDecorationAction(g, 1176, 888, t('decor.auto'), CYAN, () => {
      this.decorDraft = autoArrangeRoomDecorations(this.ctx.store.state.owned).map((placement) => ({ ...placement }));
      this.decorDraftIsAutomatic = true;
      this.decorSelectedId = null;
      this.ctx.sound.place();
      this.setDecorNotice('decor.autoDone');
    });
    this.drawDecorationAction(g, 1312, 888, t('ui.reset'), '#ff6f70', () => {
      this.decorDraft = this.decorInitial.map((placement) => ({ ...placement }));
      this.decorDraftIsAutomatic = this.decorInitialIsAutomatic;
      this.decorSelectedId = null;
      this.ctx.sound.click();
      this.setDecorNotice('decor.restored');
    });
    const closeArmed = now < this.decorCloseArmedUntil;
    this.drawDecorationAction(g, 1448, 888, closeArmed ? t('decor.closeConfirm') : t('ui.close'), closeArmed ? '#ff6f70' : '#b98cff', () => {
      // Guard against losing work: with unsaved changes the first click arms a
      // brief DISCARD? confirmation; only the second click actually closes.
      if (this.decorDirty() && performance.now() >= this.decorCloseArmedUntil) {
        this.decorCloseArmedUntil = performance.now() + 2600;
        this.ctx.sound.error();
        this.setDecorNotice('decor.unsavedWarn', true);
        return;
      }
      this.ctx.sound.click();
      this.closeDecorationEditor();
    }, closeArmed ? now : undefined);
  }

  private drawDecorationFilters(g: CanvasRenderingContext2D): void {
    const filters: Array<{ key: DecorationFilter; label: string }> = [
      { key: 'all', label: t('decor.filter.all') },
      { key: 'wall', label: t('decor.filter.wall') },
      { key: 'floor', label: t('decor.filter.floor') },
      { key: 'buddy', label: t('decor.filter.buddy') },
    ];
    for (let i = 0; i < filters.length; i++) {
      const filter = filters[i];
      const x = 268 + i * 128;
      const y = 954;
      const w = 116;
      const h = 30;
      const active = this.decorFilter === filter.key;
      const hovered = this.ctx.stage.hotspot({
        x,
        y,
        w,
        h,
        id: 'decor-filter-' + filter.key,
        cursor: 'pointer',
        onClick: () => {
          this.decorFilter = filter.key;
          this.decorPage = 0;
        },
      });
      panel(g, x, y, w, h, {
        radius: 5,
        fill: active ? 'rgba(225,90,216,0.32)' : 'rgba(13,10,25,0.9)',
        border: active ? MAGENTA : hovered ? CYAN : '#4d4568',
        borderWidth: active ? 2 : 1,
      });
      drawText(g, filter.label, x + w / 2, y + 9, 1.05, active ? '#ffffff' : '#bbb3d4', { align: 'center' });
    }
  }

  private drawDecorPageButton(g: CanvasRenderingContext2D, x: number, y: number, label: string, enabled: boolean, onClick: () => void): void {
    const hovered = this.ctx.stage.hotspot({ x, y, w: 28, h: 28, id: 'decor-page-' + label, cursor: enabled ? 'pointer' : 'default', onClick: enabled ? onClick : undefined });
    drawText(g, label, x + 14, y + 6, 1.8, enabled ? (hovered ? '#ffffff' : CYAN) : '#4d4568', { align: 'center' });
  }

  /** One bench action card. Passing `pulseNow` makes the card breathe with a
   * glow — SAVE uses it while there are unsaved changes, CLOSE while armed. */
  private drawDecorationAction(g: CanvasRenderingContext2D, x: number, y: number, label: string, color: string, onClick: () => void, pulseNow?: number): void {
    const w = 122;
    const h = 62;
    const hovered = this.ctx.stage.hotspot({ x, y, w, h, id: 'decor-action-' + label, cursor: 'pointer', onClick });
    const frame = this.ctx.assets.get('homeShopCard');
    const pulsing = pulseNow !== undefined;
    const glowStrength = hovered ? 12 : pulsing ? 8 + 5 * Math.sin(pulseNow / 260) : 0;
    if (frame) {
      if (glowStrength > 0) {
        g.save();
        g.shadowColor = color;
        g.shadowBlur = glowStrength;
        drawImageSmooth(g, frame, x, y, w, h);
        g.restore();
      }
      drawImageSmooth(g, frame, x, y, w, h);
    } else {
      panel(g, x, y, w, h, { radius: 6, fill: '#151126', border: color, borderWidth: 2 });
    }
    let scale = 1.45;
    while (scale > 0.9 && measureText(label, scale) > w - 18) scale -= 0.05;
    const bright = hovered || pulsing;
    drawText(g, label, x + w / 2, y + 24, scale, bright ? '#ffffff' : color, { align: 'center', glow: color, glowBlur: bright ? 4 : 1 });
  }

  private beginDecorationDrag(collectibleId: string, start: Point): void {
    this.decorDrag = {
      collectibleId,
      start: { ...start },
      point: { ...start },
      moved: false,
      origin: this.decorDraft.find((placement) => placement.collectibleId === collectibleId) ?? null,
    };
  }

  private moveDecorationDrag(point: Point): void {
    if (!this.decorDrag) return;
    this.decorDrag.point = { ...point };
    if (Math.hypot(point.x - this.decorDrag.start.x, point.y - this.decorDrag.start.y) > 4) {
      this.decorDrag.moved = true;
    }
  }

  private endDecorationDrag(point: Point): void {
    const drag = this.decorDrag;
    if (!drag) return;
    this.decorDrag = null;
    if (!drag.moved) return;
    if (point.y >= DECOR_INVENTORY.y) {
      if (drag.origin) this.removeDecoration(drag.collectibleId);
      return;
    }
    const zone = this.decorationZoneAt(point);
    if (!zone) {
      this.ctx.sound.error();
      this.setDecorNotice('decor.invalid', true);
      return;
    }
    this.placeDecoration(drag.collectibleId, zone, point);
  }

  private placeDecoration(collectibleId: string, zone: RoomDecorationZone, point: Point): void {
    const collectible = collectibleById[collectibleId];
    if (!collectible || roomDecorationZoneFor(collectible.type) !== zone) {
      this.ctx.sound.error();
      this.setDecorNotice('decor.invalidType', true);
      return;
    }
    const without = this.decorDraft.filter((placement) => placement.collectibleId !== collectibleId);
    if (without.filter((placement) => placement.zone === zone).length >= ROOM_DECORATION_CAPACITY[zone]) {
      this.ctx.sound.error();
      this.setDecorNotice('decor.zoneFull', true);
      return;
    }
    const candidate = this.decorationPlacementAt(collectibleId, zone, point);
    const placed = this.findOpenDecorationPosition(candidate, collectible, without);
    const clean = sanitizeRoomDecorations(this.ctx.store.state.owned, [...without, placed]);
    this.decorDraft = clean ?? without;
    this.decorDraftIsAutomatic = false;
    this.decorSelectedId = null;
    // A settle pop where the prize lands makes placement feel physical.
    const landed = this.decorDraft.find((p) => p.collectibleId === collectibleId);
    if (landed) {
      const at = this.decorationPoint(landed, collectible);
      this.ctx.fx.burst(at.x, at.y, this.decorZoneColor(zone), 10);
    }
    this.ctx.sound.place();
    this.ctx.stage.wake(700);
  }

  private decorationPlacementAt(collectibleId: string, zone: RoomDecorationZone, point: Point): RoomDecorationPlacement {
    const r = DECORATION_ZONES[zone];
    return {
      collectibleId,
      zone,
      x: Math.max(0, Math.min(1, (point.x - r.x) / r.w)),
      y: Math.max(0, Math.min(1, (point.y - r.y) / r.h)),
    };
  }

  /** Slide the candidate along its row (and, on the wall, onto the other hook
   * rail) until it stops overlapping neighbours. Row-based placement means the
   * search is one-dimensional per row instead of a 2D scatter. */
  private findOpenDecorationPosition(
    candidate: RoomDecorationPlacement,
    collectible: Collectible,
    existing: readonly RoomDecorationPlacement[],
  ): RoomDecorationPlacement {
    const snapped = this.snapPlacementToRow(candidate);
    const xOffsets = [0, 0.1, -0.1, 0.2, -0.2, 0.3, -0.3, 0.4, -0.4];
    // Wall prizes may hop to the other rail once the preferred one is packed.
    const rows: number[] = snapped.zone === 'wall'
      ? (snapped.y === WALL_ROW_Y[0] ? [WALL_ROW_Y[0], WALL_ROW_Y[1]] : [WALL_ROW_Y[1], WALL_ROW_Y[0]])
      : [snapped.y];
    const sameZone = existing.filter((placement) => placement.zone === snapped.zone);
    for (const y of rows) {
      for (const dx of xOffsets) {
        const attempt = { ...snapped, x: clamp01(snapped.x + dx), y };
        const point = this.decorationPoint(attempt, collectible);
        const clear = sameZone.every((placement) => {
          const other = collectibleById[placement.collectibleId];
          if (!other) return true;
          const otherPoint = this.decorationPoint(placement, other);
          const minimum = (this.decorationSize(collectible) + this.decorationSize(other)) * 0.38;
          return Math.hypot(point.x - otherPoint.x, point.y - otherPoint.y) >= minimum;
        });
        if (clear) return attempt;
      }
    }
    return snapped;
  }

  private decorationZoneAt(point: Point): RoomDecorationZone | null {
    for (const zone of ['wall', 'floor', 'buddy'] as const) {
      const r = DECORATION_ZONES[zone];
      if (point.x >= r.x && point.x <= r.x + r.w && point.y >= r.y && point.y <= r.y + r.h) return zone;
    }
    return null;
  }

  private drawDecorationDrag(g: CanvasRenderingContext2D, now: number): void {
    const drag = this.decorDrag;
    if (!drag?.moved) return;
    const collectible = collectibleById[drag.collectibleId];
    if (!collectible) return;
    const zone = this.decorationZoneAt(drag.point);
    const expected = roomDecorationZoneFor(collectible.type);
    const storing = drag.point.y >= DECOR_INVENTORY.y;
    const valid = storing || (zone !== null && zone === expected);
    const color = storing ? CYAN : valid ? GREEN : '#ff5c6a';
    const size = this.decorationSize(collectible);

    // Landing ghost: while the drop would be accepted, show the prize's actual
    // snapped resting spot (grid + overlap nudge) under the free-floating one.
    if (!storing && valid && expected) {
      const others = this.decorDraft.filter((placement) => placement.collectibleId !== collectible.id);
      const landing = this.findOpenDecorationPosition(this.snappedPlacement(collectible.id, expected, drag.point), collectible, others);
      const lp = this.decorationPoint(landing, collectible);
      if (Math.hypot(lp.x - drag.point.x, lp.y - drag.point.y) > 3) {
        g.save();
        g.globalAlpha = 0.38;
        this.drawRoomCollectible(g, collectible, lp.x, lp.y, size, false, expected !== 'wall');
        g.strokeStyle = GREEN + '99';
        g.lineWidth = 1.5;
        g.setLineDash([4, 4]);
        g.strokeRect(lp.x - size / 2 - 3, lp.y - size / 2 - 3, size + 6, size + 6);
        g.setLineDash([]);
        g.restore();
      }
    }

    // The held prize rides slightly above its shadow, like it's been picked up.
    const lift = 7;
    if (!storing) {
      g.save();
      g.fillStyle = 'rgba(0,0,0,0.35)';
      g.beginPath();
      g.ellipse(drag.point.x, drag.point.y + size * 0.42, size * 0.4, size * 0.11, 0, 0, Math.PI * 2);
      g.fill();
      g.restore();
    }
    g.save();
    g.globalAlpha = 0.86;
    g.shadowColor = color;
    g.shadowBlur = 16 + 5 * Math.sin(now / 180);
    this.drawRoomCollectible(g, collectible, drag.point.x, drag.point.y - lift, size, false, false);
    g.restore();
    g.strokeStyle = color;
    g.lineWidth = 3;
    g.strokeRect(drag.point.x - size / 2 - 5, drag.point.y - lift - size / 2 - 5, size + 10, size + 10);
    // A compact verdict tag under the held prize beats color alone.
    const tag = storing ? t('decor.storeHint') : valid ? t('decor.dropHere') : t('decor.wrongZone');
    const tagW = measureText(tag, 1.05) + 14;
    rrect(g, drag.point.x - tagW / 2, drag.point.y + size / 2 + 10, tagW, 20, 4);
    g.fillStyle = 'rgba(7,5,14,0.92)';
    g.fill();
    drawText(g, tag, drag.point.x, drag.point.y + size / 2 + 15, 1.05, color, { align: 'center' });
  }

  private setDecorNotice(key: string, warn = false): void {
    this.decorNotice = { key, until: performance.now() + 1500, warn };
    this.ctx.stage.wake(1600);
  }

  private saveDecorationLayout(): void {
    this.ctx.store.setRoomDecorations(this.decorDraftIsAutomatic ? null : this.decorDraft);
    this.closeDecorationEditor();
    this.ctx.sound.confirm();
    this.ctx.fx.banner(t('decor.saved'), 800, 174, GREEN, { scale: 2.2, life: 1.4 });
    this.ctx.stage.wake(1200);
  }
}
