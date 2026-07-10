/*
 * assets.ts — loads the generated raster art (room background, coin bank, prize
 * wall shelf, cabinet skins) and hands them to the screens.
 *
 * Loading is async and non-blocking: `get()` returns null until an image is
 * fully decoded, so every screen keeps a procedural fallback and the game stays
 * fully playable if an asset is missing or slow to load. Nothing here touches
 * game state — it's pure presentation.
 */

export type AssetName =
  | 'roomBg'
  | 'coinBank'
  | 'prizeWall'
  | 'cabinetSkins'
  | 'capsuleRoomBg'
  | 'capsuleMachine'
  | 'achievementDisplay'
  | 'revealFrames'
  | 'revealFrameLegendary'
  | 'revealFrameEpic'
  | 'revealFrameRare'
  | 'revealFrameUncommon'
  | 'revealFrameCommon'
  | 'projRoomBg'
  | 'projCabStage1'
  | 'projCabStage2'
  | 'projCabStage3'
  | 'projCabStage4'
  | 'projCabStage5'
  | 'projStatsBoard'
  | 'projRewardsRail'
  | 'homeLevelCabinets'
  | 'levelUiKit'
  | 'homeLogo'
  | 'homeLogoDropout'
  | 'homeLogoBurst'
  | 'homePlayer'
  | 'homePlayerCard'
  | 'homeCoinPlaque'
  | 'homeSyncStates'
  | 'homeShopCard'
  | 'homeProjectRow'
  | 'homeIconBtn'
  // HUD kit (hud/items) — consistent coin/token counters + project-detail stats.
  | 'coinHudPlaque'
  | 'tokenHudPlaque'
  | 'priceTagPlaque'
  | 'coinSocket'
  | 'rewardTicketFrame'
  | 'statTokensSync'
  | 'statLifetimeTokens'
  | 'statCoinsMinted'
  | 'statCabinetLevel'
  | 'statProvider'
  | 'statCoinPower'
  | 'statRecentToken'
  | 'statRecentCoin'
  // Achievement showcase kit (achievement-showcase/items) — trophy-wall frames.
  | 'achTitlePlaque'
  | 'achCardUnlocked'
  | 'achCardLocked'
  | 'achIconNiche'
  | 'achSmallPlaque'
  | 'achBackButton'
  | 'achProgressPlaque'
  | 'achFirstCoin'
  | 'achWarmMachine'
  | 'achNeonNight'
  | 'achMillion'
  | 'achRoyalty'
  | 'achFirstPull'
  | 'achWallStarter'
  | 'achDupeLuck'
  | 'achLegendaryDrop'
  // Shop capsule icons (shop/items) — the bottom-rail pull buttons.
  | 'shopCapsuleSingle'
  | 'shopCapsuleBundle'
  // QA-004 home utility buttons sheet (4 col x 3 row) + capsule result rows.
  | 'homeUtilityButtons'
  | 'capsuleResultRows'
  | 'capsuleResultRowLegendary';

const SRC: Record<AssetName, string> = {
  roomBg: '/assets/room-bg.png',
  coinBank: '/assets/coin-bank.png',
  prizeWall: '/assets/prize-wall.png',
  cabinetSkins: '/assets/cabinet-skins.png',
  capsuleRoomBg: '/assets/capsule/room-bg.png',
  capsuleMachine: '/assets/capsule/machine.png',
  achievementDisplay: '/assets/capsule/display.png',
  revealFrames: '/assets/capsule/reveal-frames.png',
  revealFrameLegendary: '/assets/capsule/reveal-frame-legendary.png',
  revealFrameEpic: '/assets/capsule/reveal-frame-epic.png',
  revealFrameRare: '/assets/capsule/reveal-frame-rare.png',
  revealFrameUncommon: '/assets/capsule/reveal-frame-uncommon.png',
  revealFrameCommon: '/assets/capsule/reveal-frame-common.png',
  projRoomBg: '/assets/project-detail/room-bg.png',
  projCabStage1: '/assets/project-detail/cabinet-stage-1.png',
  projCabStage2: '/assets/project-detail/cabinet-stage-2.png',
  projCabStage3: '/assets/project-detail/cabinet-stage-3.png',
  projCabStage4: '/assets/project-detail/cabinet-stage-4.png',
  projCabStage5: '/assets/project-detail/cabinet-stage-5.png',
  projStatsBoard: '/assets/project-detail/stats-board.png',
  projRewardsRail: '/assets/project-detail/recent-rewards-rail.png',
  homeLevelCabinets: '/assets/level-system/home-level-cabinets.png',
  levelUiKit: '/assets/level-system/project-level-ui-kit.png',
  homeLogo: '/assets/home-ui/logo-sign-v1-trimmed.png',
  homeLogoDropout: '/assets/home-ui/logo-sign-flicker-dropout-v1.png',
  homeLogoBurst: '/assets/home-ui/logo-sign-flicker-burst-v1.png',
  homePlayer: '/assets/home-ui/player-character-v1-trimmed.png',
  homePlayerCard: '/assets/home-ui/player-card-frame-v1-trimmed.png',
  homeCoinPlaque: '/assets/home-ui/coin-counter-plaque-v1-trimmed.png',
  homeSyncStates: '/assets/home-ui/sync-button-states-v2-trimmed.png',
  homeShopCard: '/assets/home-ui/shop-card-frame-v1-trimmed.png',
  homeProjectRow: '/assets/home-ui/project-row-frame-v1-trimmed.png',
  homeIconBtn: '/assets/home-ui/icon-button-frame-v1-trimmed.png',
  coinHudPlaque: '/assets/hud/items/coin_hud_plaque.png',
  tokenHudPlaque: '/assets/hud/items/token_hud_plaque.png',
  priceTagPlaque: '/assets/hud/items/price_tag_plaque.png',
  coinSocket: '/assets/hud/items/coin_socket.png',
  rewardTicketFrame: '/assets/hud/items/reward_ticket_frame.png',
  statTokensSync: '/assets/hud/items/stat_tokens_sync.png',
  statLifetimeTokens: '/assets/hud/items/stat_lifetime_tokens.png',
  statCoinsMinted: '/assets/hud/items/stat_coins_minted.png',
  statCabinetLevel: '/assets/hud/items/stat_cabinet_level.png',
  statProvider: '/assets/hud/items/stat_provider.png',
  statCoinPower: '/assets/hud/items/stat_coin_power.png',
  statRecentToken: '/assets/hud/items/stat_recent_token.png',
  statRecentCoin: '/assets/hud/items/stat_recent_coin.png',
  achTitlePlaque: '/assets/achievement-showcase/items/title_plaque.png',
  achCardUnlocked: '/assets/achievement-showcase/items/card_unlocked.png',
  achCardLocked: '/assets/achievement-showcase/items/card_locked.png',
  achIconNiche: '/assets/achievement-showcase/items/icon_niche.png',
  achSmallPlaque: '/assets/achievement-showcase/items/small_plaque.png',
  achBackButton: '/assets/achievement-showcase/items/back_button.png',
  achProgressPlaque: '/assets/achievement-showcase/items/progress_plaque.png',
  achFirstCoin: '/assets/achievement-showcase/items/ach_first_coin.png',
  achWarmMachine: '/assets/achievement-showcase/items/ach_warm_machine.png',
  achNeonNight: '/assets/achievement-showcase/items/ach_neon_night.png',
  achMillion: '/assets/achievement-showcase/items/ach_million.png',
  achRoyalty: '/assets/achievement-showcase/items/ach_royalty.png',
  achFirstPull: '/assets/achievement-showcase/items/ach_first_pull.png',
  achWallStarter: '/assets/achievement-showcase/items/ach_wall_starter.png',
  achDupeLuck: '/assets/achievement-showcase/items/ach_dupe_luck.png',
  achLegendaryDrop: '/assets/achievement-showcase/items/ach_legendary_drop.png',
  shopCapsuleSingle: '/assets/shop/items/shop_capsule_single.png',
  shopCapsuleBundle: '/assets/shop/items/shop_capsule_bundle.png',
  homeUtilityButtons: '/assets/home-ui/home-utility-buttons-sheet-v2.png',
  capsuleResultRows: '/assets/capsule/capsule-result-item-rows-v2.png',
  capsuleResultRowLegendary: '/assets/capsule/capsule-result-item-row-legendary-v1.png',
};

// ---- lazy per-id collectible + currency icons -----------------------------
// One transparent PNG per collectible id (docs/COLLECTIBLE_GENERATED_ASSETS.md).
// Loaded on first request so we don't balloon the boot SRC map; returns null
// until decoded so callers keep their code-sprite fallback. Never recolored.
const iconCache = new Map<string, HTMLImageElement>();
const iconReady = new Set<string>();

function loadIcon(key: string, url: string): HTMLImageElement | null {
  let img = iconCache.get(key);
  if (!img) {
    img = new Image();
    img.onload = () => iconReady.add(key);
    img.onerror = () => {
      /* leave un-ready -> caller falls back to the code sprite */
    };
    img.src = url;
    iconCache.set(key, img);
  }
  return iconReady.has(key) ? img : null;
}

/** Generated icon for a collectible id, or null while loading / on error. */
export function collectibleIcon(id: string): HTMLImageElement | null {
  return loadIcon('c:' + id, `/assets/collectibles/items/${id}.png`);
}

export type CurrencyIconName = 'coin' | 'token_chip' | 'ticket' | 'dust';
/** Generated static currency icon, or null while loading / on error. */
export function currencyIcon(name: CurrencyIconName): HTMLImageElement | null {
  return loadIcon('cur:' + name, `/assets/collectibles/items/currency_${name}.png`);
}

export class AssetStore {
  private imgs: Partial<Record<AssetName, HTMLImageElement>> = {};
  private ready: Partial<Record<AssetName, boolean>> = {};
  private started = false;

  /** Kick off loading every asset. Safe to call once at boot. */
  load(): void {
    if (this.started) return;
    this.started = true;
    (Object.keys(SRC) as AssetName[]).forEach((name) => {
      const img = new Image();
      img.onload = () => {
        this.ready[name] = true;
      };
      img.onerror = () => {
        /* leave un-ready -> screens fall back to procedural art */
      };
      img.src = SRC[name];
      this.imgs[name] = img;
    });
  }

  /** The decoded image, or null while it's still loading / on error. */
  get(name: AssetName): HTMLImageElement | null {
    return this.ready[name] ? this.imgs[name] ?? null : null;
  }
}

export const assets = new AssetStore();

/** A source rectangle within a sprite sheet. */
export interface CropRect {
  sx: number;
  sy: number;
  sw: number;
  sh: number;
}

/**
 * drawImage with smoothing temporarily ON. The Stage keeps
 * imageSmoothingEnabled=false for crisp bitmap text/sprites, but the generated
 * art is detailed illustration that must be scaled with interpolation to avoid
 * jagged downscaling. Restores the previous setting afterward.
 */
export function drawImageSmooth(
  g: CanvasRenderingContext2D,
  img: CanvasImageSource,
  dx: number,
  dy: number,
  dw: number,
  dh: number,
  crop?: CropRect,
): void {
  const prev = g.imageSmoothingEnabled;
  g.imageSmoothingEnabled = true;
  if (crop) g.drawImage(img, crop.sx, crop.sy, crop.sw, crop.sh, dx, dy, dw, dh);
  else g.drawImage(img, dx, dy, dw, dh);
  g.imageSmoothingEnabled = prev;
}
