/*
 * assets.ts — loads the generated raster art (room background, coin bank, prize
 * wall shelf, cabinet skins) and hands them to the screens.
 *
 * The authored Home scene is decoded behind a boot curtain; secondary rooms
 * load in the background afterward. `get()` still returns null for missing or
 * failed images, so screens retain their resilient procedural fallbacks.
 * Nothing here touches game state — it's pure presentation.
 */

export type AssetName =
  | 'roomBg'
  | 'customizeWorkshopBackdrop'
  | 'roomThemeSunset'
  | 'roomThemeForest'
  | 'coinBank'
  | 'prizeWall'
  | 'collectionNeonShelf'
  | 'collectionPrizeLights'
  | 'collectionPedestal'
  | 'collectionCrownMarquee'
  // Room-decoration furniture: the surfaces player prizes rest on.
  | 'decorWallBoard'
  | 'decorFloorRiser'
  | 'decorBuddyRug'
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
  | 'homeTokenGuideBoardEn'
  | 'homeTokenGuideBoardZh'
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
  roomBg: '/assets/room-bg.webp',
  customizeWorkshopBackdrop: '/assets/customization/customize-workshop-backdrop-v2.png',
  roomThemeSunset: '/assets/customization/sunset-arcade-room-bg-v1.webp',
  roomThemeForest: '/assets/customization/forest-arcade-room-bg-v1.webp',
  coinBank: '/assets/coin-bank.webp',
  prizeWall: '/assets/prize-wall.webp',
  collectionNeonShelf: '/assets/collection/neon-shelf.webp',
  collectionPrizeLights: '/assets/collection/prize-lights.webp',
  collectionPedestal: '/assets/collection/collector-pedestal.webp',
  collectionCrownMarquee: '/assets/collection/crown-marquee.webp',
  decorWallBoard: '/assets/collection/wall-display-board.webp',
  decorFloorRiser: '/assets/collection/floor-display-riser.webp',
  decorBuddyRug: '/assets/collection/buddy-rug.webp',
  cabinetSkins: '/assets/cabinet-skins.webp',
  capsuleRoomBg: '/assets/capsule/room-bg.png',
  capsuleMachine: '/assets/capsule/machine.png',
  achievementDisplay: '/assets/capsule/display-50-v1.png',
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
  homeLevelCabinets: '/assets/level-system/home-level-cabinets.webp',
  levelUiKit: '/assets/level-system/project-level-ui-kit.webp',
  homeLogo: '/assets/home-ui/logo-sign-v1-trimmed.webp',
  homeLogoDropout: '/assets/home-ui/logo-sign-flicker-dropout-v1.png',
  homeLogoBurst: '/assets/home-ui/logo-sign-flicker-burst-v1.png',
  homePlayer: '/assets/home-ui/player-character-v1-trimmed.webp',
  homePlayerCard: '/assets/home-ui/player-card-frame-v1-trimmed.webp',
  // Localized physical A-frames: lettering is authored into the pixel art so
  // it stays crisp at Home's scene scale instead of floating over the board.
  homeTokenGuideBoardEn: '/assets/home-ui/token-guide-board-en-v2.webp',
  homeTokenGuideBoardZh: '/assets/home-ui/token-guide-board-zh-v2.webp',
  homeCoinPlaque: '/assets/home-ui/coin-counter-plaque-v1-trimmed.png',
  homeSyncStates: '/assets/home-ui/sync-button-states-v2-trimmed.webp',
  homeShopCard: '/assets/home-ui/shop-card-frame-v1-trimmed.webp',
  homeProjectRow: '/assets/home-ui/project-row-frame-v1-trimmed.webp',
  homeIconBtn: '/assets/home-ui/icon-button-frame-v1-trimmed.webp',
  coinHudPlaque: '/assets/hud/items/coin_hud_plaque.webp',
  tokenHudPlaque: '/assets/hud/items/token_hud_plaque.webp',
  priceTagPlaque: '/assets/hud/items/price_tag_plaque.webp',
  coinSocket: '/assets/hud/items/coin_socket.webp',
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
  shopCapsuleSingle: '/assets/shop/items/shop_capsule_single.webp',
  shopCapsuleBundle: '/assets/shop/items/shop_capsule_bundle.webp',
  homeUtilityButtons: '/assets/home-ui/home-utility-buttons-sheet-v2.webp',
  capsuleResultRows: '/assets/capsule/capsule-result-item-rows-v2.png',
  capsuleResultRowLegendary: '/assets/capsule/capsule-result-item-row-legendary-v1.png',
};

/**
 * Resolve public files relative to the document instead of the host root.
 * Local play is served from `/`, while the hosted demo lives under
 * `/token-arcade/`; one resolver keeps both builds on the exact same assets.
 */
function publicUrl(path: string): string {
  return new URL(path.replace(/^\/+/, ''), document.baseURI).toString();
}

// ---- lazy per-id collectible + currency icons -----------------------------
// Compatibility assets use one transparent PNG per collectible id.
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
  return loadIcon('c:' + id, publicUrl(`/assets/collectibles/items/${id}.png`));
}

export type CurrencyIconName = 'coin' | 'token_chip' | 'ticket' | 'dust';
/** Generated static currency icon, or null while loading / on error. */
export function currencyIcon(name: CurrencyIconName): HTMLImageElement | null {
  return loadIcon('cur:' + name, publicUrl(`/assets/collectibles/items/currency_${name}.png`));
}

export class AssetStore {
  private imgs: Partial<Record<AssetName, HTMLImageElement>> = {};
  private ready: Partial<Record<AssetName, boolean>> = {};
  private requested = new Set<AssetName>();
  private settled = new Set<AssetName>();
  private pending = new Map<AssetName, Promise<void>>();

  /** Kick off loading selected assets, or every remaining asset when omitted. */
  load(names: readonly AssetName[] = Object.keys(SRC) as AssetName[]): void {
    names.forEach((name) => {
      if (this.requested.has(name)) return;
      this.requested.add(name);
      const img = new Image();
      const pending = new Promise<void>((resolve) => {
        img.onload = () => {
          this.ready[name] = true;
          this.settled.add(name);
          resolve();
        };
        img.onerror = () => {
          // A failed optional asset still settles boot. Screens retain their
          // procedural fallback for genuine network/file failures.
          this.settled.add(name);
          resolve();
        };
      });
      img.src = publicUrl(SRC[name]);
      this.imgs[name] = img;
      this.pending.set(name, pending);
    });
    // The Home new-cosmetic plaque must never introduce Cyan Profile Frame with
    // its generic code-sprite fallback. Start decoding the complete earned item
    // art at boot, before a player can reach the reward purchase.
    collectibleIcon('r_frame');
  }

  /**
   * Hold the first game frame until the authored Home art has settled. A
   * timeout preserves the old resilient fallback behavior on broken networks,
   * while normal visitors see one coherent reveal instead of an asset pop-in.
   */
  async waitFor(
    names: readonly AssetName[],
    onProgress?: (fraction: number) => void,
    timeoutMs = 20_000,
  ): Promise<void> {
    this.load(names);
    const report = (): void => {
      const done = names.filter((name) => this.settled.has(name)).length;
      onProgress?.(names.length ? done / names.length : 1);
    };
    report();
    const timer = window.setInterval(report, 80);
    let timeout: number | undefined;
    try {
      await Promise.race([
        Promise.all(names.map((name) => this.pending.get(name) ?? Promise.resolve())),
        new Promise<void>((resolve) => {
          timeout = window.setTimeout(resolve, timeoutMs);
        }),
      ]);
    } finally {
      window.clearInterval(timer);
      if (timeout != null) window.clearTimeout(timeout);
      report();
    }
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
