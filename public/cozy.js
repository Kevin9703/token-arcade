"use strict";
(() => {
  // src/render/stage.ts
  var Stage = class {
    constructor(canvas2, opts = {}) {
      /** Pointer position in LOGICAL coordinates (updated on every pointermove). */
      this.mouse = { x: 0, y: 0 };
      this.frameFn = null;
      this.rafId = null;
      this.lastNow = 0;
      // Frame pacing. This is a pixel-art app, so capping the device-pixel-ratio
      // and frame rate looks effectively identical while cutting GPU/CPU work
      // several-fold (a retina 2x, 60fps full-scene redraw is what spins the fan).
      // But continuous motion — scrolling, dragging, hover — reads as stutter at
      // 30fps, so the loop ADAPTS: it renders at 60fps for a short window after any
      // interaction (or an explicit wake()), then settles back to the quiet 30fps
      // baseline once things go still. Idle bobs/flicker never needed 60.
      this.maxDpr = 1.5;
      this.idleFrameMs = 1e3 / 30;
      // ~30fps at rest
      this.activeFrameMs = 1e3 / 60;
      // ~60fps while interacting
      this.activeWindowMs = 600;
      // hold 60fps this long after activity
      this.activeUntil = 0;
      // performance.now() deadline for the 60fps window
      this.lastPaint = 0;
      // User-selectable cap: 'auto' = adaptive (30 idle / 60 active), or a flat
      // 30/60. Set via setFrameMode(); defaults to the adaptive baseline.
      this.frameMode = "auto";
      // Backing-store size we last configured; used to only resize when needed.
      this.backingW = -1;
      this.backingH = -1;
      // Current logical->CSS mapping, cached so pointer events can invert it.
      this.scale = 1;
      this.offsetX = 0;
      this.offsetY = 0;
      // Hotspots registered during the frame currently being rendered.
      this.frameHotspots = [];
      // Hotspots from the last completed frame; the basis for click hit-testing.
      this.activeHotspots = [];
      // Scrollable regions declared this frame (logical rects); the last frame's
      // set is what wheel events hit-test against. A screen registers a region with
      // scrollRegion() and reads the accumulated wheel delta with takeScrollDelta().
      this.frameScrollRegions = [];
      this.activeScrollRegions = [];
      // Vertical wheel/drag delta (in logical px) accumulated over a scroll region
      // since the last takeScrollDelta(); lets multiple events between frames sum.
      this.wheelAccumY = 0;
      this.dragPointerId = null;
      this.dragLastY = 0;
      this.dragDistance = 0;
      this.dragHotspot = null;
      this.dragHotspotPointerId = null;
      this.dragHotspotDistance = 0;
      this.dragHotspotLast = { x: 0, y: 0 };
      this.suppressClicksUntil = 0;
      this.canvas = canvas2;
      const ctx2 = canvas2.getContext("2d");
      if (!ctx2) {
        throw new Error("Stage: 2D canvas context is unavailable");
      }
      this.ctx = ctx2;
      this.width = opts.width ?? 1600;
      this.height = opts.height ?? 1e3;
      this.background = opts.background ?? "#050308";
      this.onPointerMove = (e) => {
        this.updateMouse(e.clientX, e.clientY);
        if (this.dragHotspotPointerId === e.pointerId && this.dragHotspot) {
          const dx = this.mouse.x - this.dragHotspotLast.x;
          const dy = this.mouse.y - this.dragHotspotLast.y;
          this.dragHotspotDistance += Math.hypot(dx, dy);
          this.dragHotspotLast = { ...this.mouse };
          this.dragHotspot.onDragMove?.({ ...this.mouse });
        }
        if (this.dragPointerId === e.pointerId) {
          const dy = this.dragLastY - this.mouse.y;
          this.dragLastY = this.mouse.y;
          this.dragDistance += Math.abs(dy);
          this.wheelAccumY += dy;
        }
        this.wake();
      };
      this.onPointerDown = (e) => {
        this.updateMouse(e.clientX, e.clientY);
        for (let i = this.activeHotspots.length - 1; i >= 0; i--) {
          const hotspot = this.activeHotspots[i];
          if (!hotspot.onDragStart || !this.isHover(hotspot.x, hotspot.y, hotspot.w, hotspot.h)) continue;
          this.dragHotspot = hotspot;
          this.dragHotspotPointerId = e.pointerId;
          this.dragHotspotDistance = 0;
          this.dragHotspotLast = { ...this.mouse };
          this.canvas.setPointerCapture(e.pointerId);
          hotspot.onDragStart({ ...this.mouse });
          this.wake();
          return;
        }
        if (!this.pointerInScrollRegion()) return;
        this.dragPointerId = e.pointerId;
        this.dragLastY = this.mouse.y;
        this.dragDistance = 0;
        this.canvas.setPointerCapture(e.pointerId);
        this.wake();
      };
      this.onPointerUp = (e) => {
        this.updateMouse(e.clientX, e.clientY);
        if (this.dragHotspotPointerId === e.pointerId && this.dragHotspot) {
          if (this.dragHotspotDistance > 3) this.suppressClicksUntil = performance.now() + 180;
          this.dragHotspot.onDragEnd?.({ ...this.mouse });
          this.dragHotspot = null;
          this.dragHotspotPointerId = null;
          if (this.canvas.hasPointerCapture(e.pointerId)) this.canvas.releasePointerCapture(e.pointerId);
          this.wake();
          return;
        }
        if (this.dragPointerId !== e.pointerId) return;
        if (this.dragDistance > 3) this.suppressClicksUntil = performance.now() + 180;
        this.dragPointerId = null;
        if (this.canvas.hasPointerCapture(e.pointerId)) this.canvas.releasePointerCapture(e.pointerId);
        this.wake();
      };
      this.onClick = (e) => {
        this.wake();
        if (performance.now() < this.suppressClicksUntil) {
          return;
        }
        this.handleClick(e.clientX, e.clientY);
      };
      this.onWheel = (e) => {
        this.updateMouse(e.clientX, e.clientY);
        if (!this.pointerInScrollRegion()) return;
        e.preventDefault();
        this.wake();
        const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? this.height : 1;
        this.wheelAccumY += e.deltaY * unit / (this.scale || 1);
      };
      this.onResize = () => {
        this.backingW = -1;
        this.backingH = -1;
      };
      this.canvas.addEventListener("pointermove", this.onPointerMove);
      this.canvas.addEventListener("pointerdown", this.onPointerDown);
      this.canvas.addEventListener("pointerup", this.onPointerUp);
      this.canvas.addEventListener("pointercancel", this.onPointerUp);
      this.canvas.addEventListener("click", this.onClick);
      this.canvas.addEventListener("wheel", this.onWheel, { passive: false });
      window.addEventListener("resize", this.onResize);
    }
    /** Begin the render loop. Safe to call again; a running loop is replaced. */
    start(frame2) {
      if (this.rafId !== null) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }
      this.frameFn = frame2;
      this.lastNow = performance.now();
      const loop = (now) => {
        this.rafId = requestAnimationFrame(loop);
        const minFrameMs = this.frameMode === 60 ? this.activeFrameMs : this.frameMode === 30 ? this.idleFrameMs : now < this.activeUntil ? this.activeFrameMs : this.idleFrameMs;
        if (now - this.lastPaint < minFrameMs) return;
        this.lastPaint = now;
        this.renderFrame(now);
      };
      this.rafId = requestAnimationFrame(loop);
    }
    /**
     * Request a burst of 60fps rendering. Input handlers call this automatically,
     * but screens can call it too when they kick off a self-driven animation that
     * isn't tied to an input event (e.g. a multi-second coin rain after sync) so
     * it stays smooth instead of falling back to the 30fps idle cap.
     */
    wake(ms = this.activeWindowMs) {
      const until = performance.now() + ms;
      if (until > this.activeUntil) this.activeUntil = until;
    }
    /**
     * Ignore click events for the next `ms` milliseconds. A screen calls this
     * when dismissing a modal layer (e.g. decorate mode) so that a rapid second
     * click on the same spot cannot fall through onto whatever hotspot reappears
     * underneath — without this, double-clicking CLOSE could buy the shop card
     * that occupies those coordinates on the screen below.
     */
    suppressClicks(ms) {
      const until = performance.now() + ms;
      if (until > this.suppressClicksUntil) this.suppressClicksUntil = until;
    }
    /** Set the frame-rate cap: 'auto' (30fps idle, 60fps while interacting), or a
     * flat 30 / 60. Applied on the very next frame. */
    setFrameMode(mode) {
      this.frameMode = mode;
    }
    /** Cancel the render loop. Pointer listeners remain so start() can resume. */
    stop() {
      if (this.rafId !== null) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }
      this.frameFn = null;
    }
    /**
     * Register a clickable region for THIS frame and report hover immediately.
     * Call once per interactive element every frame. Returns true when the
     * pointer is currently over the region; also fires `h.onHover` if present.
     */
    hotspot(h) {
      this.frameHotspots.push(h);
      const hovering = this.isHover(h.x, h.y, h.w, h.h);
      if (h.onHover) {
        h.onHover(hovering);
      }
      return hovering;
    }
    /** Whether the logical pointer is inside the given logical rect. */
    isHover(x, y, w, h) {
      const m = this.mouse;
      return m.x >= x && m.x <= x + w && m.y >= y && m.y <= y + h;
    }
    /**
     * Declare a scrollable region for THIS frame. While the pointer is over it,
     * wheel events pan the region (and are kept off the page) instead of scrolling
     * the document. Read the accumulated motion with takeScrollDelta().
     */
    scrollRegion(x, y, w, h) {
      this.frameScrollRegions.push({ x, y, w, h });
    }
    /** Consume the vertical wheel delta (logical px) collected over scroll
     * regions since the last call, resetting the accumulator. Positive = down. */
    takeScrollDelta() {
      const v = this.wheelAccumY;
      this.wheelAccumY = 0;
      return v;
    }
    /** Whether the logical pointer is inside any of the last frame's scroll
     * regions (used by the wheel handler to decide whether to intercept). */
    pointerInScrollRegion() {
      for (const r of this.activeScrollRegions) {
        if (this.isHover(r.x, r.y, r.w, r.h)) return true;
      }
      return false;
    }
    // ---- internals ----------------------------------------------------------
    /** Render a single frame: fit, clear, transform, draw, then settle hotspots. */
    renderFrame(now) {
      const fn = this.frameFn;
      if (!fn) {
        return;
      }
      let dt = (now - this.lastNow) / 1e3;
      if (dt > 0.05) {
        dt = 0.05;
      } else if (dt < 0) {
        dt = 0;
      }
      this.lastNow = now;
      const ctx2 = this.ctx;
      const canvas2 = this.canvas;
      const dpr = Math.min(window.devicePixelRatio || 1, this.maxDpr);
      const clientW = canvas2.clientWidth || this.width;
      const clientH = canvas2.clientHeight || this.height;
      const bw = Math.max(1, Math.round(clientW * dpr));
      const bh = Math.max(1, Math.round(clientH * dpr));
      if (bw !== this.backingW || bh !== this.backingH) {
        canvas2.width = bw;
        canvas2.height = bh;
        this.backingW = bw;
        this.backingH = bh;
      }
      const scale = Math.min(clientW / this.width, clientH / this.height);
      const offsetX = (clientW - this.width * scale) / 2;
      const offsetY = (clientH - this.height * scale) / 2;
      this.scale = scale;
      this.offsetX = offsetX;
      this.offsetY = offsetY;
      ctx2.setTransform(1, 0, 0, 1, 0, 0);
      ctx2.imageSmoothingEnabled = false;
      ctx2.fillStyle = this.background;
      ctx2.fillRect(0, 0, bw, bh);
      ctx2.setTransform(scale * dpr, 0, 0, scale * dpr, offsetX * dpr, offsetY * dpr);
      ctx2.imageSmoothingEnabled = false;
      this.frameHotspots = [];
      this.frameScrollRegions = [];
      fn(ctx2, dt, now);
      this.activeHotspots = this.frameHotspots;
      this.activeScrollRegions = this.frameScrollRegions;
      let cursor = "default";
      for (let i = this.activeHotspots.length - 1; i >= 0; i--) {
        const h = this.activeHotspots[i];
        if ((h.onClick || h.onDragStart) && this.isHover(h.x, h.y, h.w, h.h)) {
          cursor = h.cursor ?? "pointer";
          break;
        }
      }
      if (canvas2.style.cursor !== cursor) {
        canvas2.style.cursor = cursor;
      }
    }
    /** Convert client (viewport) coordinates into logical coordinates. */
    updateMouse(clientX, clientY) {
      const rect = this.canvas.getBoundingClientRect();
      const cssX = clientX - rect.left;
      const cssY = clientY - rect.top;
      this.mouse.x = (cssX - this.offsetX) / this.scale;
      this.mouse.y = (cssY - this.offsetY) / this.scale;
    }
    /** Route a click to the topmost matching hotspot from the last frame. */
    handleClick(clientX, clientY) {
      this.updateMouse(clientX, clientY);
      for (let i = this.activeHotspots.length - 1; i >= 0; i--) {
        const h = this.activeHotspots[i];
        if (h.onClick && this.isHover(h.x, h.y, h.w, h.h)) {
          h.onClick();
          return;
        }
      }
    }
  };

  // src/render/sound.ts
  var ac = null;
  var mutedFlag = false;
  function ctx() {
    if (!ac) {
      try {
        const Ctor = window.AudioContext ?? window.webkitAudioContext;
        ac = Ctor ? new Ctor() : null;
      } catch {
        ac = null;
      }
    }
    return ac;
  }
  function muted() {
    return mutedFlag;
  }
  function tone(freq, dur, type, vol, when) {
    const c = ctx();
    if (!c || muted()) {
      return;
    }
    const t0 = c.currentTime + (when ?? 0);
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = type ?? "square";
    osc.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(1e-4, t0);
    g.gain.exponentialRampToValueAtTime(vol ?? 0.12, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(1e-4, t0 + dur);
    osc.connect(g).connect(c.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }
  function slide(f1, f2, dur, type, vol) {
    const c = ctx();
    if (!c || muted()) {
      return;
    }
    const t0 = c.currentTime;
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = type ?? "square";
    osc.frequency.setValueAtTime(f1, t0);
    osc.frequency.exponentialRampToValueAtTime(f2, t0 + dur);
    g.gain.setValueAtTime(1e-4, t0);
    g.gain.exponentialRampToValueAtTime(vol ?? 0.1, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(1e-4, t0 + dur);
    osc.connect(g).connect(c.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }
  function resume() {
    const c = ctx();
    if (c && c.state === "suspended") {
      void c.resume();
    }
  }
  function click() {
    tone(440, 0.06, "square", 0.06);
  }
  function coin() {
    tone(988, 0.05, "square", 0.08);
    tone(1319, 0.08, "square", 0.07, 0.04);
  }
  function coinTick() {
    tone(1046 + Math.random() * 200, 0.03, "square", 0.04);
  }
  function pull() {
    slide(220, 660, 0.35, "sawtooth", 0.08);
  }
  function levelUp() {
    [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.12, "square", 0.09, i * 0.08));
  }
  function error() {
    tone(180, 0.15, "sawtooth", 0.08);
  }
  function place() {
    tone(587, 0.05, "triangle", 0.09);
    tone(880, 0.09, "triangle", 0.08, 0.04);
  }
  function unplace() {
    tone(494, 0.05, "triangle", 0.07);
    tone(330, 0.09, "triangle", 0.06, 0.045);
  }
  function confirm() {
    tone(587, 0.07, "square", 0.07);
    tone(784, 0.12, "square", 0.08, 0.06);
  }
  function reveal(rarity) {
    const sets = {
      common: [523],
      uncommon: [523, 659],
      rare: [523, 659, 784],
      epic: [523, 659, 784, 1046],
      legendary: [523, 659, 784, 1046, 1318, 1568]
    };
    const notes = sets[rarity] ?? sets.common;
    notes.forEach((f, i) => tone(f, 0.14, "triangle", 0.1, i * 0.07));
  }
  function setMuted(m) {
    mutedFlag = m;
  }
  function getMuted() {
    return mutedFlag;
  }
  var sound = {
    resume,
    click,
    coin,
    coinTick,
    pull,
    levelUp,
    error,
    place,
    unplace,
    confirm,
    reveal,
    setMuted,
    getMuted
  };

  // src/render/assets.ts
  var SRC = {
    roomBg: "/assets/room-bg.webp",
    customizeWorkshopBackdrop: "/assets/customization/customize-workshop-backdrop-v2.png",
    roomThemeSunset: "/assets/customization/sunset-arcade-room-bg-v1.webp",
    roomThemeForest: "/assets/customization/forest-arcade-room-bg-v1.webp",
    coinBank: "/assets/coin-bank.webp",
    prizeWall: "/assets/prize-wall.webp",
    collectionNeonShelf: "/assets/collection/neon-shelf.webp",
    collectionPrizeLights: "/assets/collection/prize-lights.webp",
    collectionPedestal: "/assets/collection/collector-pedestal.webp",
    collectionCrownMarquee: "/assets/collection/crown-marquee.webp",
    decorWallBoard: "/assets/collection/wall-display-board.webp",
    decorFloorRiser: "/assets/collection/floor-display-riser.webp",
    decorBuddyRug: "/assets/collection/buddy-rug.webp",
    cabinetSkins: "/assets/cabinet-skins.webp",
    capsuleRoomBg: "/assets/capsule/room-bg.png",
    capsuleMachine: "/assets/capsule/machine.png",
    achievementDisplay: "/assets/capsule/display-50-v1.png",
    revealFrames: "/assets/capsule/reveal-frames.png",
    revealFrameLegendary: "/assets/capsule/reveal-frame-legendary.png",
    revealFrameEpic: "/assets/capsule/reveal-frame-epic.png",
    revealFrameRare: "/assets/capsule/reveal-frame-rare.png",
    revealFrameUncommon: "/assets/capsule/reveal-frame-uncommon.png",
    revealFrameCommon: "/assets/capsule/reveal-frame-common.png",
    projRoomBg: "/assets/project-detail/room-bg.png",
    projCabStage1: "/assets/project-detail/cabinet-stage-1.png",
    projCabStage2: "/assets/project-detail/cabinet-stage-2.png",
    projCabStage3: "/assets/project-detail/cabinet-stage-3.png",
    projCabStage4: "/assets/project-detail/cabinet-stage-4.png",
    projCabStage5: "/assets/project-detail/cabinet-stage-5.png",
    projStatsBoard: "/assets/project-detail/stats-board.png",
    projRewardsRail: "/assets/project-detail/recent-rewards-rail.png",
    homeLevelCabinets: "/assets/level-system/home-level-cabinets.webp",
    levelUiKit: "/assets/level-system/project-level-ui-kit.webp",
    homeLogo: "/assets/home-ui/logo-sign-v1-trimmed.webp",
    homeLogoDropout: "/assets/home-ui/logo-sign-flicker-dropout-v1.png",
    homeLogoBurst: "/assets/home-ui/logo-sign-flicker-burst-v1.png",
    homePlayer: "/assets/home-ui/player-character-v1-trimmed.webp",
    homePlayerCard: "/assets/home-ui/player-card-frame-v1-trimmed.webp",
    // Localized physical A-frames: lettering is authored into the pixel art so
    // it stays crisp at Home's scene scale instead of floating over the board.
    homeTokenGuideBoardEn: "/assets/home-ui/token-guide-board-en-v2.webp",
    homeTokenGuideBoardZh: "/assets/home-ui/token-guide-board-zh-v2.webp",
    homeCoinPlaque: "/assets/home-ui/coin-counter-plaque-v1-trimmed.png",
    homeSyncStates: "/assets/home-ui/sync-button-states-v2-trimmed.webp",
    homeShopCard: "/assets/home-ui/shop-card-frame-v1-trimmed.webp",
    homeProjectRow: "/assets/home-ui/project-row-frame-v1-trimmed.webp",
    homeIconBtn: "/assets/home-ui/icon-button-frame-v1-trimmed.webp",
    coinHudPlaque: "/assets/hud/items/coin_hud_plaque.webp",
    tokenHudPlaque: "/assets/hud/items/token_hud_plaque.webp",
    priceTagPlaque: "/assets/hud/items/price_tag_plaque.webp",
    coinSocket: "/assets/hud/items/coin_socket.webp",
    rewardTicketFrame: "/assets/hud/items/reward_ticket_frame.png",
    statTokensSync: "/assets/hud/items/stat_tokens_sync.png",
    statLifetimeTokens: "/assets/hud/items/stat_lifetime_tokens.png",
    statCoinsMinted: "/assets/hud/items/stat_coins_minted.png",
    statCabinetLevel: "/assets/hud/items/stat_cabinet_level.png",
    statProvider: "/assets/hud/items/stat_provider.png",
    statCoinPower: "/assets/hud/items/stat_coin_power.png",
    statRecentToken: "/assets/hud/items/stat_recent_token.png",
    statRecentCoin: "/assets/hud/items/stat_recent_coin.png",
    achTitlePlaque: "/assets/achievement-showcase/items/title_plaque.png",
    achCardUnlocked: "/assets/achievement-showcase/items/card_unlocked.png",
    achCardLocked: "/assets/achievement-showcase/items/card_locked.png",
    achIconNiche: "/assets/achievement-showcase/items/icon_niche.png",
    achSmallPlaque: "/assets/achievement-showcase/items/small_plaque.png",
    achBackButton: "/assets/achievement-showcase/items/back_button.png",
    achProgressPlaque: "/assets/achievement-showcase/items/progress_plaque.png",
    achFirstCoin: "/assets/achievement-showcase/items/ach_first_coin.png",
    achWarmMachine: "/assets/achievement-showcase/items/ach_warm_machine.png",
    achNeonNight: "/assets/achievement-showcase/items/ach_neon_night.png",
    achMillion: "/assets/achievement-showcase/items/ach_million.png",
    achRoyalty: "/assets/achievement-showcase/items/ach_royalty.png",
    achFirstPull: "/assets/achievement-showcase/items/ach_first_pull.png",
    achWallStarter: "/assets/achievement-showcase/items/ach_wall_starter.png",
    achDupeLuck: "/assets/achievement-showcase/items/ach_dupe_luck.png",
    achLegendaryDrop: "/assets/achievement-showcase/items/ach_legendary_drop.png",
    shopCapsuleSingle: "/assets/shop/items/shop_capsule_single.webp",
    shopCapsuleBundle: "/assets/shop/items/shop_capsule_bundle.webp",
    homeUtilityButtons: "/assets/home-ui/home-utility-buttons-sheet-v2.webp",
    capsuleResultRows: "/assets/capsule/capsule-result-item-rows-v2.png",
    capsuleResultRowLegendary: "/assets/capsule/capsule-result-item-row-legendary-v1.png"
  };
  function publicUrl(path2) {
    return new URL(path2.replace(/^\/+/, ""), document.baseURI).toString();
  }
  var iconCache = /* @__PURE__ */ new Map();
  var iconReady = /* @__PURE__ */ new Set();
  function loadIcon(key, url) {
    let img = iconCache.get(key);
    if (!img) {
      img = new Image();
      img.onload = () => iconReady.add(key);
      img.onerror = () => {
      };
      img.src = url;
      iconCache.set(key, img);
    }
    return iconReady.has(key) ? img : null;
  }
  function collectibleIcon(id) {
    return loadIcon("c:" + id, publicUrl(`/assets/collectibles/items/${id}.png`));
  }
  function currencyIcon(name) {
    return loadIcon("cur:" + name, publicUrl(`/assets/collectibles/items/currency_${name}.png`));
  }
  var AssetStore = class {
    constructor() {
      this.imgs = {};
      this.ready = {};
      this.requested = /* @__PURE__ */ new Set();
      this.settled = /* @__PURE__ */ new Set();
      this.pending = /* @__PURE__ */ new Map();
    }
    /** Kick off loading selected assets, or every remaining asset when omitted. */
    load(names = Object.keys(SRC)) {
      names.forEach((name) => {
        if (this.requested.has(name)) return;
        this.requested.add(name);
        const img = new Image();
        const pending = new Promise((resolve) => {
          img.onload = () => {
            this.ready[name] = true;
            this.settled.add(name);
            resolve();
          };
          img.onerror = () => {
            this.settled.add(name);
            resolve();
          };
        });
        img.src = publicUrl(SRC[name]);
        this.imgs[name] = img;
        this.pending.set(name, pending);
      });
      collectibleIcon("r_frame");
    }
    /**
     * Hold the first game frame until the authored Home art has settled. A
     * timeout preserves the old resilient fallback behavior on broken networks,
     * while normal visitors see one coherent reveal instead of an asset pop-in.
     */
    async waitFor(names, onProgress, timeoutMs = 2e4) {
      this.load(names);
      const report = () => {
        const done = names.filter((name) => this.settled.has(name)).length;
        onProgress?.(names.length ? done / names.length : 1);
      };
      report();
      const timer = window.setInterval(report, 80);
      let timeout;
      try {
        await Promise.race([
          Promise.all(names.map((name) => this.pending.get(name) ?? Promise.resolve())),
          new Promise((resolve) => {
            timeout = window.setTimeout(resolve, timeoutMs);
          })
        ]);
      } finally {
        window.clearInterval(timer);
        if (timeout != null) window.clearTimeout(timeout);
        report();
      }
    }
    /** The decoded image, or null while it's still loading / on error. */
    get(name) {
      return this.ready[name] ? this.imgs[name] ?? null : null;
    }
  };
  var assets = new AssetStore();
  function drawImageSmooth(g, img, dx, dy, dw, dh, crop) {
    const prev = g.imageSmoothingEnabled;
    g.imageSmoothingEnabled = true;
    if (crop) g.drawImage(img, crop.sx, crop.sy, crop.sw, crop.sh, dx, dy, dw, dh);
    else g.drawImage(img, dx, dy, dw, dh);
    g.imageSmoothingEnabled = prev;
  }

  // src/render/sprites.ts
  var PALETTE = {
    ".": null,
    // transparent
    K: "#160f1f",
    // outline / near-black
    k: "#2a2036",
    // dark shade
    W: "#f6f4ff",
    w: "#c9c6e0",
    Y: "#ffd23f",
    // gold
    y: "#c98f24",
    // gold shade
    O: "#ff9a3c",
    // orange
    o: "#c85f2a",
    R: "#ef5d78",
    // red/pink
    r: "#a8324c",
    G: "#5fd66f",
    // green
    g: "#2f8f4b",
    B: "#4aa3ff",
    // blue
    b: "#2757ad",
    C: "#5fe6d6",
    // cyan
    c: "#2f9fa0",
    M: "#e15ad8",
    // magenta
    m: "#8a3aa0",
    U: "#9a6cff",
    // purple
    u: "#5a3ab0",
    P: "#ff8fce",
    // pink
    p: "#c85f9a",
    N: "#8a5a3c",
    // brown
    n: "#5c3a26",
    S: "#f0c090",
    // skin
    s: "#c8905f",
    L: "#bfe9ff",
    // glass light
    d: "#3a3350",
    // panel gray
    e: "#514a68"
  };
  function spriteW(s2) {
    let m = 0;
    for (const r of s2.d) m = Math.max(m, r.length);
    return m;
  }
  var SPRITES = {
    smiley: {
      d: [
        "....KKKKKKKK....",
        "..KKYYYYYYYYKK..",
        ".KYYYYYYYYYYYYK.",
        ".KYYYYYYYYYYYYK.",
        "KYYKKYYYYKKYYYYK",
        "KYYKKYYYYKKYYYYK",
        "KYYYYYYYYYYYYYYK",
        "KYYYYYYYYYYYYYYK",
        "KYYKYYYYYYYYKYYK",
        "KYYKKYYYYYYKKYYK",
        "KYYYKKKKKKKKYYYK",
        ".KYYYYYYYYYYYYK.",
        ".KYYYYYYYYYYYYK.",
        "..KKYYYYYYYYKK..",
        "....KKKKKKKK...."
      ]
    },
    heart: {
      d: [
        "................",
        "..RRRR..RRRR....",
        ".RRRRRR.RRRRRR..",
        "RRRRRRRRRRRRRRR.",
        "RRRRRRRRRRRRRRR.",
        "RRRRRRRRRRRRRRR.",
        "WRRRRRRRRRRRRRR.",
        "WWRRRRRRRRRRRR..",
        ".WRRRRRRRRRRR...",
        "..RRRRRRRRRR....",
        "...RRRRRRRR.....",
        "....RRRRRR......",
        ".....RRRR.......",
        "......RR........",
        "................"
      ]
    },
    tokenChip: {
      d: [
        "....KKKKKKKK....",
        "..KKUUUUUUUUKK..",
        ".KUUUUUUUUUUUUK.",
        ".KUUUWWWWWWUUUK.",
        "KUUUUUUUWWUUUUUK",
        "KUUUUUUUWWUUUUUK",
        "KUUUUUUUWWUUUUUK",
        "KUUUUUUUWWUUUUUK",
        "KUUUUUUUWWUUUUUK",
        "KUUUUUUUWWUUUUUK",
        "KUUUUWWWWWWWUUUK",
        ".KUUUUUUUUUUUUK.",
        ".KUUUUUUUUUUUUK.",
        "..KKUUUUUUUUKK..",
        "....KKKKKKKK...."
      ]
    },
    ggSign: {
      d: [
        "................",
        "KKKKKKKKKKKKKKKK",
        "KBBBBBBBBBBBBBBK",
        "KBWWBBWWWBBWWBBK",
        "KBWBBBWBBBBWBBBK",
        "KBWBWWWWBBWBWWBK",
        "KBWBBWBWBBWBBWBK",
        "KBWWWWBWWBWWWWBK",
        "KBBBBBBBBBBBBBBK",
        "KKKKKKKKKKKKKKKK",
        ".....K....K.....",
        ".....K....K.....",
        "....KKK..KKK....",
        "................"
      ]
    },
    starBadge: {
      d: [
        ".......KK.......",
        ".......YY.......",
        "......KYYK......",
        "......YYYY......",
        "KKKKKYYYYYKKKKK.",
        ".YYYYYYYYYYYYYY.",
        "..YYYYYYYYYYYY..",
        "...YYYYYYYYYY...",
        "...YYYYYYYYYY...",
        "..YYYYKKYYYYYY..",
        ".YYYYK..KYYYYYY.",
        ".YYYK....KYYYYY.",
        ".YK........KYYY.",
        "................"
      ]
    },
    luckyCat: {
      d: [
        "..K........K....",
        ".KWK......KWK...",
        ".KWWK....KWWK...",
        ".KWWWKKKKWWWK...",
        ".KWWWWWWWWWWK...",
        "KWWKWWWWWWKWWK..",
        "KWWWWWWWWWWWWK..",
        "KWWKWWWWWWKWWK..",
        "KWWWWRRRRWWWWK..",
        "KWWWWWWWWWWWWK..",
        ".KWWWWWWWWWWK.KY",
        ".KWWWWWWWWWWKKYY",
        ".KWWWWWWWWWWKKY.",
        "..KWWWWWWWWK....",
        "...KKKKKKKK....."
      ]
    },
    goldCoin: {
      d: [
        "....KKKKKKKK....",
        "..KKYYYYYYYYKK..",
        ".KYYYYYYYYYYYYK.",
        ".KYYWYYYYYYyYYK.",
        "KYYYWYYYYYYyYYYK",
        "KYYYWWYYYYyyYYYK",
        "KYYYYWYYYYyYYYYK",
        "KYYYYWYYYYyYYYYK",
        "KYYYYWYYYYyYYYYK",
        "KYYYWWWYYyyyYYYK",
        "KYYYYYYYYYYYYYYK",
        ".KYYYYYYYYYYYYK.",
        ".KyyyyyyyyyyyyK.",
        "..KKyyyyyyyyKK..",
        "....KKKKKKKK...."
      ]
    },
    bookShelf: {
      d: [
        "................",
        "NNNNNNNNNNNNNNNN",
        "NRRBBGGYYRRBBGGN",
        "NRRBBGGYYRRBBGGN",
        "NRRBBGGYYRRBBGGN",
        "NRRBBGGYYRRBBGGN",
        "NNNNNNNNNNNNNNNN",
        "NGGYYRRBBGGYYRRN",
        "NGGYYRRBBGGYYRRN",
        "NGGYYRRBBGGYYRRN",
        "NGGYYRRBBGG.GGRN",
        "NGGYYRRBBGGGGGRN",
        "NNNNNNNNNNNNNNNN",
        "................"
      ]
    },
    oneupFlag: {
      d: [
        "..K.............",
        "..KGGGGGGGGGK...",
        "..KGWWKWWKWWGK..",
        "..KGWKGWKGWKGK..",
        "..KGWKGWKGWKGK..",
        "..KGWWGWWGWWGK..",
        "..KGGGGGGGGGGK..",
        "..KGWKWWKWWGK..",
        "..KK.KKKKKKK....",
        "..K.............",
        "..K.............",
        "..K.............",
        "KKKKK...........",
        "................"
      ]
    },
    gem: {
      d: [
        "................",
        "...CCCCCCCCCC...",
        "..CWWCCCCCCCCC..",
        ".CWCCCCCCCCCCCC.",
        "CWCCCCCCCCCCCCCC",
        ".CCCCCCCCCCCCCC.",
        "..CCCCCCCCCCCC..",
        "...CCCCCCCCCC...",
        "....CCCCCCCC....",
        ".....CCCCCC.....",
        "......CCCC......",
        ".......CC.......",
        "................"
      ]
    },
    palm: {
      d: [
        "....GG..GG......",
        "..GGGGGGGGGG....",
        ".GGGKGGGGKGGG...",
        "GGGGGGGGGGGGGG..",
        ".GGGGGGGGGGGG...",
        "....GGGGGG......",
        "......NN........",
        "......NN........",
        "......NN........",
        ".....NNNN.......",
        "....kkkkkk......",
        "...kOOOOOOk.....",
        "...kOOOOOOk.....",
        "...kkkkkkkk.....",
        "................"
      ]
    },
    gameoverSign: {
      d: [
        "................",
        "KKKKKKKKKKKKKKKK",
        "KkkkkkkkkkkkkkkK",
        "KkRRkRRkRkRRkkkK",
        "KkRkkRkRkRkRkkkK",
        "KkRkRRRkRkRRkkkK",
        "KkRRkRkRkRkkkkkK",
        "KkkkkkkkkkkkkkkK",
        "KkOOkOkOkOOkkkkK",
        "KkOkkOkOkOkOkkkK",
        "KkOkkOOOkOOkkkkK",
        "KkOOkOkOkOkkkkkK",
        "KkkkkkkkkkkkkkkK",
        "KKKKKKKKKKKKKKKK",
        "................"
      ]
    },
    starRug: {
      d: [
        "................",
        ".UUUUUUUUUUUUUU.",
        ".UMUUUUYYUUUUMU.",
        ".UUUUUYYYYUUUUU.",
        ".UUYYUUYYUUYYUU.",
        ".UUUYYYYYYYYUUU.",
        ".UMUUYYYYYYUUMU.",
        ".UUUYYYYYYYYUUU.",
        ".UUYYUUYYUUYYUU.",
        ".UUUUUYYYYUUUUU.",
        ".UMUUUUYYUUUUMU.",
        ".UUUUUUUUUUUUUU.",
        "................"
      ]
    },
    stool: {
      d: [
        "................",
        "....RRRRRRRR....",
        "..RRRRRRRRRRRR..",
        "..RRRRRRRRRRRR..",
        "..RRrrrrrrrrRR..",
        "....dddddddd....",
        ".....d....d.....",
        ".....d....d.....",
        "....d......d....",
        "....d......d....",
        "...d........d...",
        "...d........d...",
        "..ee........ee..",
        "................"
      ]
    },
    rainbowCat: {
      d: [
        ".RK........KO...",
        "RRWK......KWYO..",
        "RWWWKKKKKKWWWY..",
        "GWWCWWWWWWCWWG..",
        "GWWWWWWWWWWWWB..",
        "BWWKWWWWWWKWWB..",
        "BWWWWMMMMWWWWU..",
        "UWWWWWWWWWWWWU..",
        ".MWWWWWWWWWWM...",
        ".MRRGGBBUUMMM..",
        ".MRRGGBBUUMMM..",
        "..KWWWWWWWWK....",
        "...KKKKKKKK.....",
        "................"
      ]
    },
    astronaut: {
      d: [
        "....KKKKKK......",
        "..KKWWWWWWKK....",
        ".KWWWWWWWWWWK...",
        "KWWKKKKKKKKWWK..",
        "KWKLLLLLLLLKWK..",
        "KWKLLLCCLLLLKWK.",
        "KWKLLLCCLLLLKWK.",
        "KWKLLLLLLLLKWK..",
        "KWWKKKKKKKKWWK..",
        ".KWWWWWWWWWWK...",
        "..KWWRRRRWWK....",
        "..KWWWWWWWWK....",
        "..KWWK..KWWK....",
        "..KKK....KKK....",
        "................"
      ]
    },
    miniCabinet: {
      d: [
        "..KKKKKKKKKK....",
        "..KMMMMMMMMK....",
        "..KMYYYYYYMK....",
        "..KKKKKKKKKK....",
        "..KBLLLLLLBK....",
        "..KBLCCGGLBK....",
        "..KBLLLLLLBK....",
        "..KBLLLLLLBK....",
        "..KKKKKKKKKK....",
        "..KMRoYoGBMK....",
        "..KMMMMMMMMK....",
        "..KMMMMMMMMK....",
        "..KKMMMMMMKK....",
        "...KK....KK.....",
        "................"
      ]
    },
    trophy: {
      d: [
        ".YYYYYYYYYYYY...",
        ".YKKKKKKKKKKY...",
        "YKYYYYYYYYYYKY..",
        "YKYYYYYYYYYYKY..",
        "YKYYYYYYYYYYKY..",
        "YKYYYYYYYYYYKY..",
        ".KYYYYYYYYYYK...",
        "..KYYYYYYYYK....",
        "...KYYYYYYK.....",
        ".....KYYK.......",
        "......YY........",
        "....YYYYYY......",
        "...YYYYYYYY.....",
        "..KKKKKKKKKK....",
        "................"
      ]
    },
    sunsetTheme: {
      d: [
        "UUUUUUUUUUUUUUUU",
        "UUUUUUUUUUUUUUUU",
        "MUUUUUUUUUUUUUUM",
        "MMUUUOOOOOUUUUMM",
        "MMMUOOOOOOOUUMMM",
        "RMMOOOOYOOOOMMR.",
        "RRMOOOYYYOOOMRR.",
        "RRROOOYYYOOORR..",
        "PPRRRRRRRRRRRPP.",
        "PPPPPRRRRRPPPPP.",
        "PPPPPPPPPPPPPPPP",
        "kkkkkkkkkkkkkkkk",
        "................"
      ]
    },
    neonCrown: {
      d: [
        "................",
        ".Y....Y....Y....",
        "YRY..YRY..YRY...",
        "YYY..YYY..YYY...",
        "YYYYYYYYYYYYYY..",
        "YCYYYMYYYMYYCY..",
        "YYYYYYYYYYYYYY..",
        "YYCYYYYCYYYYCY..",
        "YYYYYYYYYYYYYY..",
        "KKKKKKKKKKKKKK..",
        "................"
      ]
    },
    legendaryTrophy: {
      d: [
        "M.M.M.M.M.M.M.M.",
        ".YYYYYYYYYYYYYY.",
        "MYKKKKKKKKKKKKYM",
        "YKYWYYYYYYYYWYKY",
        "YKYYYYYYYYYYYYKY",
        "YKYWYYYYYYYYWYKY",
        "MYKYYYYYYYYYYKYM",
        ".MKYYYYYYYYYYKM.",
        "..MKYYYYYYYYKM..",
        "....MKYYYYKM....",
        "......YYYY......",
        "....UUUUUUUU....",
        "...UUUUUUUUUU...",
        "..MKKKKKKKKKKM..",
        "................"
      ]
    },
    dragonEgg: {
      d: [
        "......KKKK......",
        "....KKGGGGKK....",
        "...KGGCCGGCGK...",
        "..KGCCGGGGCCGK..",
        "..KGGGGCCGGGGK..",
        ".KGGCCGGGGCCGGK.",
        ".KGGGGGGCCGGGGK.",
        ".KGCCGGGGGGCCGK.",
        ".KGGGGGCCGGGGGK.",
        "..KGGCCGGGGCGK..",
        "..KGGGGGGGGGGK..",
        "...KGGGGGGGGK...",
        "....KKGGGGKK....",
        "......KKKK......",
        "................"
      ]
    },
    forestTheme: {
      d: [
        "kkkkkkkkkkkkkkkk",
        "kkYkkkkkkkYkkkkk",
        "kkkkkkYkkkkkkkkk",
        "k..GG....GG....k",
        "k.GGGG..GGGG...k",
        "kGGGGGGGGGGGG..k",
        "k.GGGG..GGGG...k",
        "k..NN....NN....k",
        "kGGNNGGGGNNGGG.k",
        "kGGGGGGGGGGGGG.k",
        "kNNNNNNNNNNNNNNk",
        "kgggggggggggggk",
        "................"
      ]
    },
    frame: {
      d: [
        "YYYYYYYYYYYYYY..",
        "YKKKKKKKKKKKKY..",
        "YK..........KY..",
        "YK..........KY..",
        "YK..........KY..",
        "YK..........KY..",
        "YK..........KY..",
        "YK..........KY..",
        "YK..........KY..",
        "YK..........KY..",
        "YKKKKKKKKKKKKY..",
        "YYYYYYYYYYYYYY..",
        "................"
      ]
    },
    plantSmall: {
      d: [
        "................",
        ".....G..G.......",
        "...G.GG.G.G.....",
        "...GGGGGGGG.....",
        "....GGGGGG......",
        ".....GGGG.......",
        "......NN........",
        ".....OOOO.......",
        "....OOOOOO......",
        "....OkkkkO......",
        "....OOOOOO......",
        ".....kkkk.......",
        "................"
      ]
    },
    mug: {
      d: [
        "................",
        "..WWWWWWWWW.....",
        "..WCCCCCCCW.WW..",
        "..WCWWWWCCWW..W.",
        "..WCWTTWCCW...W.",
        "..WCWTTWCCW..W..",
        "..WCWWWWCCWWW...",
        "..WCCCCCCCW.....",
        "..WCCCCCCCW.....",
        "..WWWWWWWWW.....",
        "...WWWWWWW......",
        "................"
      ]
    }
  };
  for (const k in SPRITES) {
    const sp = SPRITES[k];
    sp.w = spriteW(sp);
  }
  function drawSprite(ctx2, sprite, x, y, scale, tint) {
    const sp = typeof sprite === "string" ? SPRITES[sprite] : sprite;
    const rows = sp.d;
    for (let ry = 0; ry < rows.length; ry++) {
      const line = rows[ry];
      for (let rx = 0; rx < line.length; rx++) {
        const ch = line[rx];
        if (ch === "." || ch === " ") continue;
        const col = tint && tint[ch] || PALETTE[ch];
        if (!col) continue;
        ctx2.fillStyle = col;
        ctx2.fillRect(x + rx * scale, y + ry * scale, scale, scale);
      }
    }
  }
  var AVATAR = {
    d: [
      "....KKKKKK....",
      "..KKRRRRRRKK..",
      ".KRRRRRRRRRRK.",
      ".KRRRRRRRRRRK.",
      "KKKKKKKKKKKKKK",
      "KSSSSSSSSSSSSK",
      "KSSKKSSSSKKSSK",
      "KSSKKSSSSKKSSK",
      "KSSSSSSSSSSSSK",
      "KSSSSSKKSSSSS K",
      "KSSSSSSSSSSSSK",
      ".KSSSKKKKSSSK.",
      "..KSSSSSSSSK..",
      ".KBBBBBBBBBBK.",
      "KBBBWBBBBWBBBK",
      "KBBBBBBBBBBBBK"
    ]
  };
  AVATAR.w = spriteW(AVATAR);
  function drawCoin(ctx2, cx, cy, r, squash) {
    const sq = squash == null ? 1 : squash;
    const img = currencyIcon("coin");
    if (img) {
      const h = r * 2;
      const w = Math.max(2, h * Math.abs(sq));
      drawImageSmooth(ctx2, img, cx - w / 2, cy - h / 2, w, h);
      return;
    }
    const rx = Math.max(1, Math.abs(r * sq));
    ctx2.save();
    ctx2.translate(cx, cy);
    ctx2.beginPath();
    ctx2.ellipse(0, 0, rx, r, 0, 0, Math.PI * 2);
    ctx2.fillStyle = sq < 0 ? "#c98f24" : "#e8b12a";
    ctx2.fill();
    ctx2.beginPath();
    ctx2.ellipse(0, 0, rx * 0.74, r * 0.78, 0, 0, Math.PI * 2);
    ctx2.fillStyle = "#ffd23f";
    ctx2.fill();
    if (rx > r * 0.45) {
      ctx2.fillStyle = "#c98f24";
      const u = r * 0.28;
      ctx2.fillRect(-u * sq, -u, u * 2 * Math.abs(sq), u * 0.7);
      ctx2.fillRect(-u * 0.35 * sq, -u, u * 0.7 * Math.abs(sq), u * 2);
    }
    ctx2.fillStyle = "rgba(255,255,255,0.7)";
    ctx2.fillRect(-rx * 0.5, -r * 0.5, Math.max(1, rx * 0.22), Math.max(1, r * 0.3));
    ctx2.restore();
  }

  // src/render/pixelFont.ts
  var FONT = {
    A: [".###.", "#...#", "#...#", "#####", "#...#", "#...#", "#...#"],
    B: ["####.", "#...#", "#...#", "####.", "#...#", "#...#", "####."],
    C: [".####", "#....", "#....", "#....", "#....", "#....", ".####"],
    D: ["####.", "#...#", "#...#", "#...#", "#...#", "#...#", "####."],
    E: ["#####", "#....", "#....", "####.", "#....", "#....", "#####"],
    F: ["#####", "#....", "#....", "####.", "#....", "#....", "#...."],
    G: [".####", "#....", "#....", "#.###", "#...#", "#...#", ".####"],
    H: ["#...#", "#...#", "#...#", "#####", "#...#", "#...#", "#...#"],
    I: ["#####", "..#..", "..#..", "..#..", "..#..", "..#..", "#####"],
    J: ["..###", "...#.", "...#.", "...#.", "#..#.", "#..#.", ".##.."],
    K: ["#...#", "#..#.", "#.#..", "##...", "#.#..", "#..#.", "#...#"],
    L: ["#....", "#....", "#....", "#....", "#....", "#....", "#####"],
    M: ["#...#", "##.##", "#.#.#", "#.#.#", "#...#", "#...#", "#...#"],
    N: ["#...#", "#...#", "##..#", "#.#.#", "#..##", "#...#", "#...#"],
    O: [".###.", "#...#", "#...#", "#...#", "#...#", "#...#", ".###."],
    P: ["####.", "#...#", "#...#", "####.", "#....", "#....", "#...."],
    Q: [".###.", "#...#", "#...#", "#...#", "#.#.#", "#..#.", ".##.#"],
    R: ["####.", "#...#", "#...#", "####.", "#.#..", "#..#.", "#...#"],
    S: [".####", "#....", "#....", ".###.", "....#", "....#", "####."],
    T: ["#####", "..#..", "..#..", "..#..", "..#..", "..#..", "..#.."],
    U: ["#...#", "#...#", "#...#", "#...#", "#...#", "#...#", ".###."],
    V: ["#...#", "#...#", "#...#", "#...#", "#...#", ".#.#.", "..#.."],
    W: ["#...#", "#...#", "#...#", "#.#.#", "#.#.#", "#.#.#", ".#.#."],
    X: ["#...#", "#...#", ".#.#.", "..#..", ".#.#.", "#...#", "#...#"],
    Y: ["#...#", "#...#", ".#.#.", "..#..", "..#..", "..#..", "..#.."],
    Z: ["#####", "....#", "...#.", "..#..", ".#...", "#....", "#####"],
    "0": [".###.", "#..##", "#.#.#", "#.#.#", "#.#.#", "##..#", ".###."],
    "1": ["..#..", ".##..", "..#..", "..#..", "..#..", "..#..", ".###."],
    "2": [".###.", "#...#", "....#", "..##.", ".#...", "#....", "#####"],
    "3": ["####.", "....#", "....#", ".###.", "....#", "....#", "####."],
    "4": ["...#.", "..##.", ".#.#.", "#..#.", "#####", "...#.", "...#."],
    "5": ["#####", "#....", "#....", "####.", "....#", "....#", "####."],
    "6": [".###.", "#....", "#....", "####.", "#...#", "#...#", ".###."],
    "7": ["#####", "....#", "...#.", "..#..", ".#...", ".#...", ".#..."],
    "8": [".###.", "#...#", "#...#", ".###.", "#...#", "#...#", ".###."],
    "9": [".###.", "#...#", "#...#", ".####", "....#", "....#", ".###."],
    " ": [".....", ".....", ".....", ".....", ".....", ".....", "....."],
    ".": [".....", ".....", ".....", ".....", ".....", ".##..", ".##.."],
    ",": [".....", ".....", ".....", ".....", ".##..", ".##..", ".#..."],
    ":": [".....", ".##..", ".##..", ".....", ".##..", ".##..", "....."],
    "!": ["..#..", "..#..", "..#..", "..#..", "..#..", ".....", "..#.."],
    "?": [".###.", "#...#", "....#", "..##.", "..#..", ".....", "..#.."],
    "+": [".....", "..#..", "..#..", "#####", "..#..", "..#..", "....."],
    "-": [".....", ".....", ".....", "#####", ".....", ".....", "....."],
    "/": ["....#", "....#", "...#.", "..#..", ".#...", "#....", "#...."],
    "%": ["##..#", "##.#.", "..#..", ".#...", "#.#..", "#..##", "...##"],
    "'": ["..#..", "..#..", "..#..", ".....", ".....", ".....", "....."],
    '"': [".#.#.", ".#.#.", ".....", ".....", ".....", ".....", "....."],
    "(": ["..##.", ".#...", ".#...", ".#...", ".#...", ".#...", "..##."],
    ")": [".##..", "...#.", "...#.", "...#.", "...#.", "...#.", ".##.."],
    "<": ["...#.", "..#..", ".#...", "#....", ".#...", "..#..", "...#."],
    ">": [".#...", "..#..", "...#.", "....#", "...#.", "..#..", ".#..."],
    "#": [".#.#.", "#####", ".#.#.", ".#.#.", ".#.#.", "#####", ".#.#."],
    "*": [".....", "#.#.#", ".###.", "#####", ".###.", "#.#.#", "....."],
    "=": [".....", ".....", "#####", ".....", "#####", ".....", "....."],
    "\xD7": [".....", "#...#", ".#.#.", "..#..", ".#.#.", "#...#", "....."]
  };
  var GLYPH_W = 5;
  var GLYPH_H = 7;
  var CJK_RE = /[^ -ÿ]/;
  var CJK_STACK = '"PingFang SC","Microsoft YaHei","Noto Sans CJK SC","Hiragino Sans GB",sans-serif';
  function cjkPx(scale) {
    return Math.max(8, Math.round(scale * 8));
  }
  function cjkFont(scale) {
    return cjkPx(scale) + "px " + CJK_STACK;
  }
  var _measCtx;
  function measCtx() {
    if (_measCtx === void 0) {
      _measCtx = typeof document !== "undefined" ? document.createElement("canvas").getContext("2d") : null;
    }
    return _measCtx ?? null;
  }
  function advance(scale) {
    return (GLYPH_W + 1) * scale;
  }
  function measureText(text, scale) {
    const str = String(text);
    if (CJK_RE.test(str)) {
      const c = measCtx();
      if (c) {
        c.font = cjkFont(scale);
        return c.measureText(str).width;
      }
      return str.length * cjkPx(scale);
    }
    return str.length * advance(scale) - scale;
  }
  function drawText(ctx2, text, x, y, scale, color, opts) {
    const o = opts || {};
    const raw = String(text);
    if (CJK_RE.test(raw)) return drawCJK(ctx2, raw, x, y, scale, color, o);
    const str = raw.toUpperCase();
    let startX = x;
    const w = measureText(str, scale);
    if (o.align === "center") startX = Math.round(x - w / 2);
    else if (o.align === "right") startX = Math.round(x - w);
    if (o.shadow) {
      blit(ctx2, str, startX + scale, y + scale, scale, o.shadow);
    }
    if (o.glow) {
      ctx2.save();
      ctx2.shadowColor = o.glow;
      ctx2.shadowBlur = (o.glowBlur || 6) * scale;
      blit(ctx2, str, startX, y, scale, color);
      ctx2.restore();
    } else {
      blit(ctx2, str, startX, y, scale, color);
    }
    return w;
  }
  function drawCJK(ctx2, str, x, y, scale, color, o) {
    const px = cjkPx(scale);
    const w = measureText(str, scale);
    ctx2.save();
    ctx2.font = cjkFont(scale);
    ctx2.textBaseline = "top";
    ctx2.textAlign = o.align === "center" ? "center" : o.align === "right" ? "right" : "left";
    const drawY = y + (GLYPH_H * scale - px) / 2;
    if (o.shadow) {
      ctx2.fillStyle = o.shadow;
      ctx2.fillText(str, x + scale, drawY + scale);
    }
    ctx2.fillStyle = color;
    if (o.glow) {
      ctx2.shadowColor = o.glow;
      ctx2.shadowBlur = (o.glowBlur || 6) * scale;
    }
    ctx2.fillText(str, x, drawY);
    ctx2.restore();
    return w;
  }
  function blit(ctx2, text, x, y, scale, color) {
    ctx2.fillStyle = color;
    let cx = x;
    for (let i = 0; i < text.length; i++) {
      const glyph = FONT[text[i]] || FONT["?"];
      for (let row = 0; row < GLYPH_H; row++) {
        const line = glyph[row];
        for (let col = 0; col < GLYPH_W; col++) {
          if (line[col] === "#") {
            ctx2.fillRect(cx + col * scale, y + row * scale, scale, scale);
          }
        }
      }
      cx += advance(scale);
    }
  }

  // src/render/canvas.ts
  function rrect(ctx2, x, y, w, h, r) {
    const rad = Math.min(r, w / 2, h / 2);
    ctx2.beginPath();
    ctx2.moveTo(x + rad, y);
    ctx2.arcTo(x + w, y, x + w, y + h, rad);
    ctx2.arcTo(x + w, y + h, x, y + h, rad);
    ctx2.arcTo(x, y + h, x, y, rad);
    ctx2.arcTo(x, y, x + w, y, rad);
    ctx2.closePath();
  }
  function vgrad(ctx2, x, y, w, h, top, bottom) {
    const g = ctx2.createLinearGradient(0, y, 0, y + h);
    g.addColorStop(0, top);
    g.addColorStop(1, bottom);
    ctx2.fillStyle = g;
    ctx2.fillRect(x, y, w, h);
  }

  // src/content/rarities.ts
  var RARITIES = {
    legendary: { key: "legendary", label: "Legendary", color: "#ffd23f", glow: "#ffb300", weight: 1, order: 0 },
    epic: { key: "epic", label: "Epic", color: "#b98cff", glow: "#9a6cff", weight: 6, order: 1 },
    rare: { key: "rare", label: "Rare", color: "#5fb4ff", glow: "#4aa3ff", weight: 13, order: 2 },
    uncommon: { key: "uncommon", label: "Uncommon", color: "#6fe07f", glow: "#5fd66f", weight: 26, order: 3 },
    common: { key: "common", label: "Common", color: "#c2c2d6", glow: "#8a8aa8", weight: 54, order: 4 }
  };
  var RARITY_ORDER = ["legendary", "epic", "rare", "uncommon", "common"];

  // src/content/collectibles.ts
  var gemTint = (main, hi) => ({ C: main, W: hi || "#ffffff" });
  var frameTint = (c) => ({ Y: c });
  var COLLECTIBLES = [
    // --- Common ---
    { id: "c_smiley", name: "Smiley Chip", rarity: "common", type: "badge", description: "A tiny grin soldered onto the day. It still believes the build will pass.", sprite: "smiley" },
    { id: "c_token", name: "Token Chip", rarity: "common", type: "badge", description: "One bright coin-shaped thought, rescued from the model stream.", sprite: "tokenChip" },
    { id: "c_heart", name: "Pixel Heart", rarity: "common", type: "badge", description: "Beats at 30 FPS. Somehow still sincere.", sprite: "heart" },
    { id: "c_gg", name: "GG Banner", rarity: "common", type: "sign", description: "Hung after small wins, large wins, and suspiciously lucky fixes.", sprite: "ggSign" },
    { id: "c_mug", name: "Arcade Mug", rarity: "common", type: "decor", description: "Contains coffee, tea, or the remains of one more late-night idea.", sprite: "mug" },
    { id: "c_sprout", name: "Little Sprout", rarity: "common", type: "decor", description: "Grew from leftover tokens. Needs light, water, and fewer tabs.", sprite: "plantSmall" },
    // --- Uncommon ---
    { id: "u_star", name: "Debug Star", rarity: "uncommon", type: "badge", description: "Awarded for finding the problem five minutes after complaining about it.", sprite: "starBadge" },
    { id: "u_luckycoin", name: "Lucky Coin", rarity: "uncommon", type: "badge", description: 'Flip it before a risky prompt. It always lands on "ship it."', sprite: "goldCoin" },
    { id: "u_shelf", name: "Code Shelf", rarity: "uncommon", type: "decor", description: "Stores tiny manuals for systems nobody fully remembers.", sprite: "bookShelf" },
    { id: "u_1up", name: "1UP Flag", rarity: "uncommon", type: "sign", description: "Grants emotional recovery after deleting the wrong line.", sprite: "oneupFlag" },
    { id: "u_gemc", name: "Cyan Cache Gem", rarity: "uncommon", type: "badge", description: "A cool little shard of context that survived compression.", sprite: "gem" },
    // --- Rare ---
    { id: "r_cat", name: "Waving Desk Cat", rarity: "rare", type: "buddy", description: "Waves at every fresh idea like it personally funded the sprint.", sprite: "luckyCat" },
    { id: "r_palm", name: "Focus Palm", rarity: "rare", type: "decor", description: "Makes any corner feel 12 percent more like deep work.", sprite: "palm" },
    { id: "r_gameover", name: "Game Over Sign", rarity: "rare", type: "sign", description: "A dramatic sign for bugs that were already fixed ten minutes ago.", sprite: "gameoverSign" },
    { id: "r_stool", name: "Cabinet Stool", rarity: "rare", type: "decor", description: "Perfect height for staring at a loading spinner with dignity.", sprite: "stool" },
    { id: "r_rug", name: "Star Rug", rarity: "rare", type: "decor", description: "Marks the exact place where good pulls and bad estimates happen.", sprite: "starRug" },
    { id: "r_frame", name: "Cyan Profile Frame", rarity: "rare", type: "frame", description: "Adds a clean neon edge to your arcade legend.", sprite: "frame", tint: frameTint("#5fe6d6") },
    // --- Epic ---
    { id: "e_rainbowcat", name: "Rainbow Arcade Cat", rarity: "epic", type: "buddy", description: "Appears when the code works and nobody knows why.", sprite: "rainbowCat" },
    { id: "e_astro", name: "Space Ranger", rarity: "epic", type: "buddy", description: "Patrols the outer orbit of unfinished side quests.", sprite: "astronaut" },
    { id: "e_minicab", name: "Mini Cabinet", rarity: "epic", type: "decor", description: "A cabinet for your cabinet. Very efficient, very unnecessary.", sprite: "miniCabinet" },
    { id: "e_trophy", name: "Gold Trophy", rarity: "epic", type: "trophy", description: "Proof that spending tokens can, occasionally, become glory.", sprite: "trophy" },
    { id: "e_sunset", name: "Sunset Room Theme", rarity: "epic", type: "theme", description: "Turns the arcade golden enough to forgive one more refactor.", sprite: "sunsetTheme" },
    { id: "e_gemu", name: "Amethyst Cache Gem", rarity: "epic", type: "badge", description: "A rare purple chunk of context, still humming with remembered intent.", sprite: "gem", tint: gemTint("#b98cff", "#e6d6ff") },
    // --- Legendary ---
    { id: "l_crown", name: "Neon Crown", rarity: "legendary", type: "badge", description: "For the player who turned pure model heat into arcade royalty.", sprite: "neonCrown" },
    { id: "l_trophy", name: "Champion Trophy", rarity: "legendary", type: "trophy", description: "Heavy, shiny, and almost certainly paid for in tokens.", sprite: "legendaryTrophy" },
    { id: "l_egg", name: "Dragon Egg", rarity: "legendary", type: "buddy", description: "Warm to the touch. Do not ask what it was trained on.", sprite: "dragonEgg" },
    { id: "l_forest", name: "Forest Room Theme", rarity: "legendary", type: "theme", description: "A quiet grove grown from a suspicious amount of computation.", sprite: "forestTheme" },
    // --- P1C collection expansion (appended to preserve the original 27 IDs/order) ---
    // Common
    { id: "c_keyboard", name: "Tiny Mech Keyboard", rarity: "common", type: "decor", description: "Clicky enough to sound productive, tiny enough to lose beneath one normal keycap.", sprite: "miniCabinet" },
    { id: "c_cursor", name: "Blinking Cursor", rarity: "common", type: "badge", description: "Patiently waiting at the end of the line, convinced the next thought will be the good one.", sprite: "smiley" },
    { id: "c_floppy", name: "Save Point Disk", rarity: "common", type: "decor", description: "Stores one brave checkpoint and the comforting lie that you can always roll back.", sprite: "tokenChip" },
    { id: "c_duck", name: "Desk Duck", rarity: "common", type: "buddy", description: "Listens to the whole explanation, judges none of it, and somehow spots the missing semicolon.", sprite: "luckyCat" },
    { id: "c_patch", name: "Patch Note", rarity: "common", type: "sign", description: "A tiny notice announcing three fixes, two surprises, and one bug now promoted to feature.", sprite: "ggSign" },
    { id: "c_noodle", name: "Midnight Noodles", rarity: "common", type: "decor", description: "Still warm at 2 AM, when every shortcut looks elegant and every estimate looks optional.", sprite: "mug" },
    { id: "c_terminal", name: "Pocket Terminal", rarity: "common", type: "decor", description: "A command line for emergencies, side quests, and checking one last thing away from the desk.", sprite: "miniCabinet" },
    { id: "c_shipit", name: "Ship It Sticker", rarity: "common", type: "badge", description: "Peel, stick, deploy. Reading the diff again is tomorrow's problem.", sprite: "starBadge" },
    // Uncommon
    { id: "u_lavalamp", name: "Token Lava Lamp", rarity: "uncommon", type: "decor", description: "Slow bubbles of spent context rise, merge, and become a surprisingly decent idea.", sprite: "plantSmall" },
    { id: "u_lintbot", name: "Lint Bot", rarity: "uncommon", type: "buddy", description: "Polishes rough edges while muttering about trailing spaces nobody else could see.", sprite: "astronaut" },
    { id: "u_bonsai", name: "Pixel Bonsai", rarity: "uncommon", type: "decor", description: "Carefully pruned one branch at a time, much like a refactor that actually stayed in scope.", sprite: "plantSmall" },
    { id: "u_prompt", name: "One More Prompt Sign", rarity: "uncommon", type: "sign", description: "The official closing sign of an arcade that has never once closed on time.", sprite: "gameoverSign" },
    { id: "u_enter", name: "Golden Enter Key", rarity: "uncommon", type: "badge", description: "For the precise moment hesitation ends and the expensive part begins.", sprite: "goldCoin" },
    { id: "u_headphones", name: "Focus Headphones", rarity: "uncommon", type: "decor", description: "Cancels chatter, alerts, and most reasonable objections to starting another side project.", sprite: "mug" },
    { id: "u_inbox", name: "Inbox Zero Capsule", rarity: "uncommon", type: "badge", description: "A sealed specimen containing the mythical state of having absolutely nothing unread.", sprite: "gem" },
    // Rare
    { id: "r_drone", name: "Context Courier Drone", rarity: "rare", type: "buddy", description: "Carries the important bits across long sessions and only drops the embarrassing TODOs.", sprite: "astronaut" },
    { id: "r_clock", name: "Deadline Clock", rarity: "rare", type: "decor", description: "Runs normally until launch day, when every minute becomes approximately seven seconds.", sprite: "trophy" },
    { id: "r_vending", name: "Bug Fix Vending Machine", rarity: "rare", type: "decor", description: "Insert one reproducible case. Receive a fix, a workaround, or a very confident shrug.", sprite: "miniCabinet" },
    { id: "r_hologram", name: "Hologram Commit", rarity: "rare", type: "sign", description: "Projects the one perfect commit message everyone remembers writing differently.", sprite: "oneupFlag" },
    // Epic
    { id: "e_whale", name: "Cloud Whale", rarity: "epic", type: "buddy", description: "Drifts above the cabinets carrying impossible scale with the calm of a passing thought.", sprite: "rainbowCat" },
    { id: "e_portal", name: "Refactor Portal", rarity: "epic", type: "decor", description: "Step through with tangled code. Step back out three hours later with cleaner code and new questions.", sprite: "starRug" },
    // Legendary
    { id: "l_pair", name: "Golden Pair Programmer", rarity: "legendary", type: "buddy", description: "Always has the missing question, the second keyboard, and impeccable timing with the snacks.", sprite: "astronaut" },
    { id: "l_infinite", name: "Infinite Token Marquee", rarity: "legendary", type: "sign", description: "Its counter rolls forever, celebrating every wild idea that survived long enough to ship.", sprite: "ggSign" }
  ];
  var byId = {};
  COLLECTIBLES.forEach((c) => byId[c.id] = c);
  var byRarity = {
    legendary: [],
    epic: [],
    rare: [],
    uncommon: [],
    common: []
  };
  RARITY_ORDER.forEach((r) => {
    byRarity[r] = COLLECTIBLES.filter((c) => c.rarity === r);
  });

  // src/i18n/index.ts
  var current = "en";
  var listeners = /* @__PURE__ */ new Set();
  function setLocale(l) {
    if (l !== current) {
      current = l;
      listeners.forEach((cb) => cb());
    }
  }
  var UI = {
    "ui.arcadePlayer": { en: "ARCADE PLAYER", "zh-CN": "\u8857\u673A\u73A9\u5BB6" },
    "ui.lifetimeTokens": { en: "LIFETIME TOKENS", "zh-CN": "\u7D2F\u8BA1 TOKENS" },
    "ui.lifetime": { en: "LIFETIME", "zh-CN": "\u7D2F\u8BA1" },
    "ui.sync": { en: "SYNC", "zh-CN": "\u540C\u6B65" },
    "ui.syncing": { en: "SYNCING", "zh-CN": "\u540C\u6B65\u4E2D" },
    "ui.demoSync": { en: "DEMO SYNC", "zh-CN": "\u6F14\u793A\u540C\u6B65" },
    "ui.demoSyncing": { en: "DEMO SYNCING", "zh-CN": "\u6F14\u793A\u540C\u6B65\u4E2D" },
    "ui.demoArcade": { en: "DEMO ARCADE", "zh-CN": "\u6F14\u793A\u8857\u673A\u5385" },
    "ui.demoDisclosure": { en: "Demo arcade: projects, tokens, coins, and collectibles are fictional.", "zh-CN": "\u6F14\u793A\u8857\u673A\u5385\u4E2D\u7684\u9879\u76EE\u3001\u7528\u91CF\u3001\u91D1\u5E01\u548C\u6536\u85CF\u54C1\u5747\u4E3A\u865A\u6784\u5185\u5BB9\u3002" },
    "ui.noHistoryFound": { en: "NO HISTORY FOUND", "zh-CN": "\u672A\u627E\u5230\u5386\u53F2\u8BB0\u5F55" },
    "ui.noHistoryBody": { en: "No local Claude Code or Codex usage was found.", "zh-CN": "\u6CA1\u6709\u53D1\u73B0\u672C\u5730 Claude Code \u6216 Codex \u7528\u91CF\u8BB0\u5F55\u3002" },
    "ui.playDemoArcade": { en: "PLAY DEMO ARCADE", "zh-CN": "\u8FDB\u5165\u6F14\u793A\u8857\u673A\u5385" },
    "ui.playDemoSub": { en: "Explore a fictional arcade with sample projects and prizes.", "zh-CN": "\u4F7F\u7528\u865A\u6784\u9879\u76EE\u548C\u5956\u52B1\u4F53\u9A8C\u5B8C\u6574\u73A9\u6CD5\u3002" },
    "ui.scanAgain": { en: "SCAN AGAIN", "zh-CN": "\u91CD\u65B0\u626B\u63CF" },
    "ui.scanAgainSub": { en: "Retry the local history scan.", "zh-CN": "\u518D\u6B21\u68C0\u67E5\u672C\u5730\u5386\u53F2\u8BB0\u5F55\u3002" },
    "ui.tryLiveScan": { en: "TRY LIVE SCAN", "zh-CN": "\u5C1D\u8BD5\u626B\u63CF\u771F\u5B9E\u8BB0\u5F55" },
    "ui.liveHistory": { en: "LIVE HISTORY", "zh-CN": "\u771F\u5B9E\u8BB0\u5F55" },
    "ui.cabinets": { en: "CABINETS", "zh-CN": "\u6211\u7684\u673A\u53F0" },
    "ui.prizeWall": { en: "PRIZE WALL", "zh-CN": "\u5956\u54C1\u5899" },
    "ui.coinBank": { en: "COIN BANK", "zh-CN": "\u91D1\u5E01\u94F6\u884C" },
    "ui.pull": { en: "PULL", "zh-CN": "\u62BD\u53D6" },
    "ui.capsule": { en: "CAPSULE", "zh-CN": "\u626D\u86CB" },
    "ui.notEnoughCoins": { en: "NOT ENOUGH COINS", "zh-CN": "\u91D1\u5E01\u4E0D\u8DB3" },
    "ui.lockedPrize": { en: "LOCKED PRIZE", "zh-CN": "\u672A\u89E3\u9501\u5956\u54C1" },
    "ui.lockedHint": { en: "Keep pulling capsules to discover this slot.", "zh-CN": "\u7EE7\u7EED\u6295\u5E01\u62BD\u626D\u86CB\uFF0C\u70B9\u4EAE\u8FD9\u4E2A\u683C\u5B50\u3002" },
    "ui.settings": { en: "SETTINGS", "zh-CN": "\u8BBE\u7F6E" },
    "ui.help": { en: "HELP", "zh-CN": "\u5E2E\u52A9" },
    "ui.sound": { en: "Sound", "zh-CN": "\u58F0\u97F3" },
    "ui.dataSource": { en: "Data source", "zh-CN": "\u6570\u636E\u6765\u6E90" },
    "ui.frameRate": { en: "Frame rate", "zh-CN": "\u5E27\u7387" },
    "ui.fpsAuto": { en: "AUTO", "zh-CN": "\u81EA\u52A8" },
    "ui.resetProgress": { en: "Reset progress", "zh-CN": "\u91CD\u7F6E\u8FDB\u5EA6" },
    "ui.reset": { en: "RESET", "zh-CN": "\u91CD\u7F6E" },
    "ui.on": { en: "ON", "zh-CN": "\u5F00" },
    "ui.off": { en: "OFF", "zh-CN": "\u5173" },
    "ui.close": { en: "CLOSE", "zh-CN": "\u5173\u95ED" },
    "ui.save": { en: "SAVE", "zh-CN": "\u4FDD\u5B58" },
    "ui.view": { en: "VIEW", "zh-CN": "\u67E5\u770B" },
    "ui.customizeArcade": { en: "CUSTOMIZE ARCADE", "zh-CN": "\u88C5\u626E\u8857\u673A\u5385" },
    "ui.customizeHint": { en: "Choose the room and frame that carry your arcade identity.", "zh-CN": "\u9009\u62E9\u80FD\u4EE3\u8868\u4F60\u7684\u8857\u673A\u5385\u7684\u623F\u95F4\u4E3B\u9898\u548C\u5934\u50CF\u6846\u3002" },
    "decor.edit": { en: "DECOR", "zh-CN": "\u5E03\u7F6E" },
    "decor.title": { en: "EDIT ARCADE / DECORATE MODE", "zh-CN": "\u7F16\u8F91\u8857\u673A\u5385 / \u5E03\u7F6E\u6A21\u5F0F" },
    "decor.inventory": { en: "DECOR INVENTORY", "zh-CN": "\u88C5\u9970\u5E93\u5B58" },
    "decor.ownedCount": { en: "OWNED {n} / {total}", "zh-CN": "\u5DF2\u62E5\u6709 {n} / {total}" },
    "decor.storeHint": { en: "DRAG HERE TO STORE", "zh-CN": "\u62D6\u56DE\u8FD9\u91CC\u6536\u8D77" },
    "decor.zone.wall": { en: "WALL DISPLAY", "zh-CN": "\u5899\u9762\u9648\u5217\u533A" },
    "decor.zone.floor": { en: "FLOOR DISPLAY", "zh-CN": "\u5730\u9762\u9648\u5217\u533A" },
    "decor.zone.buddy": { en: "BUDDY CORNER", "zh-CN": "\u4F19\u4F34\u89D2" },
    "decor.filter.all": { en: "ALL", "zh-CN": "\u5168\u90E8" },
    "decor.filter.wall": { en: "WALL", "zh-CN": "\u5899\u9970" },
    "decor.filter.floor": { en: "FLOOR", "zh-CN": "\u6446\u4EF6" },
    "decor.filter.buddy": { en: "BUDDIES", "zh-CN": "\u4F19\u4F34" },
    "decor.auto": { en: "AUTO", "zh-CN": "\u81EA\u52A8\u5E03\u7F6E" },
    "decor.saved": { en: "ARCADE LAYOUT SAVED", "zh-CN": "\u8857\u673A\u5385\u5E03\u7F6E\u5DF2\u4FDD\u5B58" },
    "decor.autoDone": { en: "NEWEST PRIZES AUTO-ARRANGED", "zh-CN": "\u6700\u65B0\u85CF\u54C1\u5DF2\u81EA\u52A8\u5E03\u7F6E" },
    "decor.restored": { en: "UNSAVED CHANGES RESTORED", "zh-CN": "\u5DF2\u6062\u590D\u672C\u6B21\u4FEE\u6539" },
    "decor.stored": { en: "PRIZE RETURNED TO INVENTORY", "zh-CN": "\u85CF\u54C1\u5DF2\u6536\u56DE\u5E93\u5B58" },
    "decor.invalid": { en: "KEEP PRIZES INSIDE A DISPLAY ZONE", "zh-CN": "\u8BF7\u628A\u85CF\u54C1\u653E\u8FDB\u9648\u5217\u533A\u57DF" },
    "decor.invalidType": { en: "THAT PRIZE BELONGS IN ANOTHER ZONE", "zh-CN": "\u8FD9\u4EF6\u85CF\u54C1\u5E94\u8BE5\u653E\u5728\u53E6\u4E00\u4E2A\u533A\u57DF" },
    "decor.zoneFull": { en: "THIS DISPLAY ZONE IS FULL", "zh-CN": "\u8FD9\u4E2A\u9648\u5217\u533A\u57DF\u5DF2\u7ECF\u653E\u6EE1\u4E86" },
    "decor.benchHint": { en: "CLICK OR DRAG TO PLACE", "zh-CN": "\u70B9\u51FB\u6216\u62D6\u62FD\u5373\u53EF\u6446\u653E" },
    "decor.dropHere": { en: "DROP HERE", "zh-CN": "\u653E\u5728\u8FD9\u91CC" },
    "decor.wrongZone": { en: "WRONG ZONE", "zh-CN": "\u533A\u57DF\u4E0D\u7B26" },
    "decor.closeConfirm": { en: "DISCARD?", "zh-CN": "\u4E0D\u4FDD\u5B58?" },
    "decor.unsavedWarn": { en: "UNSAVED CHANGES / CLICK AGAIN TO DISCARD", "zh-CN": "\u6709\u672A\u4FDD\u5B58\u4FEE\u6539 / \u518D\u70B9\u4E00\u6B21\u653E\u5F03" },
    "decor.newPrizeHint": { en: "NEW PRIZES TO PLACE!", "zh-CN": "\u6709\u65B0\u85CF\u54C1\u53EF\u4EE5\u6446\u653E\uFF01" },
    "ui.themeEquipHint": { en: "Theme: Equip this scene in your arcade room.", "zh-CN": "\u4E3B\u9898\uFF1A\u88C5\u5907\u540E\u66FF\u6362\u8857\u673A\u5385\u573A\u666F\u3002" },
    "ui.frameEquipHint": { en: "Frame: Equip around your player portrait.", "zh-CN": "\u5934\u50CF\u6846\uFF1A\u88C5\u5907\u5230\u73A9\u5BB6\u5934\u50CF\u5468\u56F4\u3002" },
    "ui.roomThemes": { en: "ROOM THEMES", "zh-CN": "\u623F\u95F4\u4E3B\u9898" },
    "ui.profileFrames": { en: "PROFILE FRAMES", "zh-CN": "\u5934\u50CF\u6846" },
    "ui.defaultRoom": { en: "BASE ARCADE", "zh-CN": "\u57FA\u7840\u8857\u673A\u5385" },
    "ui.defaultFrame": { en: "BASE PLAYER FRAME", "zh-CN": "\u57FA\u7840\u73A9\u5BB6\u76F8\u6846" },
    "ui.themeBaseDisplay": { en: "BASE ARCADE", "zh-CN": "\u57FA\u7840\u8857\u673A\u5385" },
    "ui.themeSunsetDisplay": { en: "SUNSET THEME", "zh-CN": "\u65E5\u843D\u4E3B\u9898" },
    "ui.themeForestDisplay": { en: "FOREST THEME", "zh-CN": "\u68EE\u6797\u4E3B\u9898" },
    "ui.frameBaseDisplay": { en: "BASE FRAME", "zh-CN": "\u57FA\u7840\u5934\u50CF\u6846" },
    "ui.frameCyanDisplay": { en: "CYAN FRAME", "zh-CN": "\u9752\u8272\u5934\u50CF\u6846" },
    "ui.locked": { en: "LOCKED", "zh-CN": "\u672A\u89E3\u9501" },
    "ui.ownedState": { en: "OWNED", "zh-CN": "\u5DF2\u62E5\u6709" },
    "ui.equipped": { en: "EQUIPPED", "zh-CN": "\u5DF2\u88C5\u5907" },
    "ui.equip": { en: "EQUIP", "zh-CN": "\u88C5\u5907" },
    "ui.obtainTheme": { en: "Pull capsules or buy the Room Theme reward.", "zh-CN": "\u901A\u8FC7\u626D\u86CB\u6216\u8D2D\u4E70\u623F\u95F4\u4E3B\u9898\u5956\u52B1\u83B7\u5F97\u3002" },
    "ui.obtainFrame": { en: "Pull capsules or buy the Profile Frame reward.", "zh-CN": "\u901A\u8FC7\u626D\u86CB\u6216\u8D2D\u4E70\u5934\u50CF\u76F8\u6846\u5956\u52B1\u83B7\u5F97\u3002" },
    "ui.newCosmetic": { en: "NEW COSMETIC", "zh-CN": "\u65B0\u88C5\u626E" },
    "ui.complete": { en: "COMPLETE", "zh-CN": "\u5DF2\u96C6\u9F50" },
    "ui.dust": { en: "DUST", "zh-CN": "\u788E\u7247" },
    "capsule.missingPrize": { en: "MISSING PRIZE", "zh-CN": "\u8865\u9F50\u7F3A\u5931\u85CF\u54C1" },
    "capsule.missingPrizeSub": { en: "DUPLICATES BECOME A NEW PRIZE", "zh-CN": "\u91CD\u590D\u85CF\u54C1\u53EF\u6362\u4E00\u4EF6\u65B0\u85CF\u54C1" },
    "capsule.collectionComplete": { en: "EVERY PRIZE FOUND", "zh-CN": "\u5168\u90E8\u85CF\u54C1\u5DF2\u96C6\u9F50" },
    "capsule.notEnoughDust": { en: "MORE DUPLICATES NEEDED", "zh-CN": "\u8FD8\u9700\u8981\u66F4\u591A\u91CD\u590D\u85CF\u54C1" },
    "capsule.exchangeSuccess": { en: "MISSING PRIZE FOUND!", "zh-CN": "\u7F3A\u5931\u85CF\u54C1\u5230\u624B\uFF01" },
    "collection.milestoneUnlocked": { en: "COLLECTION UPGRADE UNLOCKED", "zh-CN": "\u6536\u85CF\u5347\u7EA7\u5DF2\u89E3\u9501" },
    "collection.nextArcadeUpgrade": { en: "NEXT ARCADE UPGRADE", "zh-CN": "\u4E0B\u4E00\u6B21\u8857\u673A\u5385\u5347\u7EA7" },
    "collection.nextProgress": { en: "{n} MORE -> {name}", "zh-CN": "\u518D\u6536\u96C6 {n} \u4EF6 \u2192 {name}" },
    "collection.crowned": { en: "COLLECTION CROWNED", "zh-CN": "\u6536\u85CF\u5DF2\u52A0\u5195" },
    "collection.milestone.10.name": { en: "NEON SHELF ONLINE", "zh-CN": "\u9713\u8679\u5C55\u67B6\u70B9\u4EAE" },
    "collection.milestone.10.desc": { en: "10 unique prizes wake the first permanent display tier.", "zh-CN": "\u96C6\u9F50 10 \u4EF6\u4E0D\u540C\u85CF\u54C1\uFF0C\u7B2C\u4E00\u5C42\u6C38\u4E45\u9713\u8679\u5C55\u67B6\u6B63\u5F0F\u901A\u7535\u3002" },
    "collection.milestone.25.name": { en: "PRIZE WALL AFTERGLOW", "zh-CN": "\u5956\u54C1\u5899\u706F\u9635\u5347\u7EA7" },
    "collection.milestone.25.desc": { en: "25 unique prizes bring a richer bank of prize-wall lights online.", "zh-CN": "\u96C6\u9F50 25 \u4EF6\u4E0D\u540C\u85CF\u54C1\uFF0C\u5956\u54C1\u5899\u4EAE\u8D77\u66F4\u76DB\u5927\u7684\u5E38\u9A7B\u706F\u9635\u3002" },
    "collection.milestone.40.name": { en: "COLLECTOR PEDESTAL", "zh-CN": "\u6536\u85CF\u57FA\u5EA7\u5347\u8D77" },
    "collection.milestone.40.desc": { en: "40 unique prizes raise a permanent pedestal beneath the collection.", "zh-CN": "\u96C6\u9F50 40 \u4EF6\u4E0D\u540C\u85CF\u54C1\uFF0C\u4E13\u5C5E\u6536\u85CF\u57FA\u5EA7\u4ECE\u8857\u673A\u5385\u5730\u9762\u5347\u8D77\u3002" },
    "collection.milestone.50.name": { en: "CROWN MARQUEE", "zh-CN": "\u7687\u51A0\u706F\u724C\u52A0\u5195" },
    "collection.milestone.50.desc": { en: "All 50 prizes crown the arcade with its final permanent marquee.", "zh-CN": "50 \u4EF6\u85CF\u54C1\u5168\u90E8\u53D1\u73B0\uFF0C\u6700\u7EC8\u7687\u51A0\u706F\u724C\u6C38\u4E45\u7167\u4EAE\u6574\u95F4\u8857\u673A\u5385\u3002" },
    "ui.playerName": { en: "Player name", "zh-CN": "\u73A9\u5BB6\u540D\u79F0" },
    "ui.editName": { en: "EDIT NAME", "zh-CN": "\u6539\u540D" },
    "ui.back": { en: "BACK", "zh-CN": "\u8FD4\u56DE" },
    "ui.language": { en: "Language", "zh-CN": "\u8BED\u8A00" },
    "ui.achievement": { en: "ACHIEVEMENT", "zh-CN": "\u6210\u5C31" },
    "ui.achievements": { en: "ACHIEVEMENTS", "zh-CN": "\u6210\u5C31\u5C55\u793A\u67DC" },
    "ui.lockedAchievement": { en: "LOCKED ACHIEVEMENT", "zh-CN": "\u672A\u89E3\u9501\u6210\u5C31" },
    "ui.unlockedOn": { en: "UNLOCKED {date}", "zh-CN": "\u89E3\u9501\u4E8E {date}" },
    "ui.unlockedCount": { en: "{n} / {total} UNLOCKED", "zh-CN": "\u5DF2\u89E3\u9501 {n} / {total}" },
    "ui.spendCoins": { en: "SPEND COINS!", "zh-CN": "\u6295\u5E01\u6362\u5956\u52B1\uFF01" },
    "ui.earnCoins": { en: "EARN COINS", "zh-CN": "\u9886\u53D6\u91D1\u5E01" },
    "ui.syncUsage": { en: "SYNC USAGE", "zh-CN": "\u540C\u6B65\u7528\u91CF" },
    "ui.insertCoin": { en: "INSERT COIN", "zh-CN": "\u6295\u5165\u91D1\u5E01" },
    "ui.tapToSync": { en: "TAP TO SYNC", "zh-CN": "\u70B9\u51FB\u540C\u6B65" },
    "ui.allCaughtUp": { en: "ALL CAUGHT UP", "zh-CN": "\u5DF2\u5168\u90E8\u540C\u6B65" },
    "ui.syncFailed": { en: "SYNC FAILED", "zh-CN": "\u540C\u6B65\u5931\u8D25" },
    "ui.noCabinets": { en: "NO CABINETS YET", "zh-CN": "\u8FD8\u6CA1\u6709\u673A\u53F0" },
    "ui.syncTo": { en: "SYNC TO", "zh-CN": "\u540C\u6B65\u4EE5" },
    "ui.powerUp": { en: "POWER UP", "zh-CN": "\u70B9\u4EAE\u4F60\u7684" },
    "ui.yourMachines": { en: "YOUR MACHINES", "zh-CN": "\u6211\u7684\u673A\u53F0" },
    // Semantic full loop description plus dedicated physical-sign rows. These
    // remain code-rendered so locale switching never depends on baked art.
    "ui.tagline": { en: "TURN TOKENS INTO COINS. UNLOCK ARCADE PRIZES!", "zh-CN": "\u628A TOKENS \u53D8\u91D1\u5E01\uFF0C\u89E3\u9501\u8857\u673A\u597D\u7269\uFF01" },
    "ui.guideLine1": { en: "TOKENS -> COINS", "zh-CN": "\u4EE3\u5E01\u6362\u91D1\u5E01" },
    "ui.guideLine2": { en: "UNLOCK ARCADE", "zh-CN": "\u89E3\u9501\u8857\u673A\u597D\u7269" },
    "ui.guideLine3": { en: "PRIZES", "zh-CN": "" },
    "ui.guideRate": { en: "{n} : 1", "zh-CN": "{n} : 1" },
    "ui.tokensPerCoin": { en: "{n} TOKENS = 1 COIN", "zh-CN": "{n} TOKENS = 1 \u91D1\u5E01" },
    "ui.newTokens": { en: "NEW TOKENS +{n}", "zh-CN": "\u65B0\u589E TOKENS +{n}" },
    "ui.coinsPlus": { en: "+{n} COINS", "zh-CN": "+{n} \u91D1\u5E01" },
    "ui.minusCoins": { en: "-{n}", "zh-CN": "-{n}" },
    "ui.collected": { en: "{n} / {total} COLLECTED", "zh-CN": "\u5DF2\u6536\u96C6 {n} / {total}" },
    "ui.projectCabinet": { en: "PROJECT CABINET", "zh-CN": "\u9879\u76EE\u673A\u53F0" },
    "ui.projectStats": { en: "PROJECT STATS", "zh-CN": "\u9879\u76EE\u6570\u636E" },
    "ui.tokenPower": { en: "TOKEN POWER", "zh-CN": "TOKEN \u80FD\u91CF" },
    "ui.coinPower": { en: "COIN POWER {x}", "zh-CN": "\u91D1\u5E01\u52A0\u6210 {x}" },
    "ui.nextLevel": { en: "NEXT LEVEL", "zh-CN": "\u4E0B\u4E00\u7EA7" },
    "ui.maxLevel": { en: "MAX LEVEL", "zh-CN": "\u6EE1\u7EA7" },
    "ui.levelUpSoon": { en: "LEVEL UP SOON", "zh-CN": "\u5373\u5C06\u5347\u7EA7" },
    "ui.recentRewards": { en: "RECENT REWARDS", "zh-CN": "\u6700\u8FD1\u5956\u52B1" },
    "ui.tokensThisSync": { en: "TOKENS THIS SYNC", "zh-CN": "\u672C\u6B21\u540C\u6B65" },
    "ui.coinsMinted": { en: "COINS MINTED", "zh-CN": "\u5DF2\u94F8\u91D1\u5E01" },
    // Per-project derived value = floor(project.tokens / TOKENS_PER_COIN). Labeled
    // "BASE COINS" so it can't be read as the player's spendable wallet balance
    // (which is `ui.coins`); it does not include level-multiplier bonuses.
    "ui.baseCoins": { en: "BASE COINS", "zh-CN": "\u57FA\u7840\u91D1\u5E01" },
    "ui.cabinetLevel": { en: "CABINET LEVEL", "zh-CN": "\u673A\u53F0\u7B49\u7EA7" },
    "ui.provider": { en: "PROVIDER", "zh-CN": "\u6765\u6E90" },
    "ui.tokens": { en: "TOKENS", "zh-CN": "TOKENS" },
    "ui.coins": { en: "COINS", "zh-CN": "\u91D1\u5E01" },
    "ui.newItem": { en: "NEW!", "zh-CN": "\u65B0\u83B7\u5F97\uFF01" },
    "ui.feedNew": { en: "NEW", "zh-CN": "\u65B0" },
    "ui.skip": { en: "SKIP", "zh-CN": "\u8DF3\u8FC7" },
    "ui.dup": { en: "DUPLICATE \xD7{n}", "zh-CN": "\u91CD\u590D \xD7{n}" },
    "ui.dupShort": { en: "DUPLICATE X{n}", "zh-CN": "\u91CD\u590D \xD7{n}" },
    "ui.owned": { en: "OWNED \xD7{n}", "zh-CN": "\u5DF2\u62E5\u6709 \xD7{n}" },
    "ui.unlockedBang": { en: "UNLOCKED!", "zh-CN": "\u5DF2\u89E3\u9501\uFF01" },
    "ui.poweredUp": { en: "{name} POWERED UP", "zh-CN": "{name} \u5347\u7EA7\u4E86" },
    "ui.lvArrow": { en: "LV {from} > LV {to}", "zh-CN": "LV {from} \u2192 LV {to}" },
    "ui.becameCabinet": { en: "{name} BECAME A {stage} CABINET", "zh-CN": "{name} \u8FDB\u5316\u4E3A {stage} \u673A\u53F0" },
    "ui.cabinet": { en: "CABINET", "zh-CN": "\u673A\u53F0" },
    "ui.stageCabinet": { en: "{stage} CABINET", "zh-CN": "{stage} \u673A\u53F0" },
    // stage names (used with " CABINET")
    "stage.starter": { en: "STARTER", "zh-CN": "\u5165\u95E8" },
    "stage.powered": { en: "POWERED", "zh-CN": "\u901A\u7535" },
    "stage.deluxe": { en: "DELUXE", "zh-CN": "\u8C6A\u534E" },
    "stage.neon": { en: "NEON", "zh-CN": "\u9713\u8679" },
    "stage.legendary": { en: "LEGENDARY", "zh-CN": "\u4F20\u8BF4" },
    // shop
    "shop.pull1.label": { en: "PULL", "zh-CN": "\u62BD\u53D6" },
    "shop.pull1.sub": { en: "CAPSULE \xD71", "zh-CN": "\u626D\u86CB \xD71" },
    "shop.pull10.label": { en: "PULL", "zh-CN": "\u62BD\u53D6" },
    "shop.pull10.sub": { en: "CAPSULE \xD710", "zh-CN": "\u626D\u86CB \xD710" },
    "shop.sign.label": { en: "NEON SIGN", "zh-CN": "\u9713\u8679\u62DB\u724C" },
    "shop.sign.sub": { en: "UNLOCK A SIGN", "zh-CN": "\u89E3\u9501\u4E00\u4E2A\u62DB\u724C" },
    "shop.frame.label": { en: "PROFILE FRAME", "zh-CN": "\u5934\u50CF\u76F8\u6846" },
    "shop.frame.sub": { en: "UNLOCK A FRAME", "zh-CN": "\u89E3\u9501\u4E00\u4E2A\u76F8\u6846" },
    "shop.theme.label": { en: "ROOM THEME", "zh-CN": "\u623F\u95F4\u4E3B\u9898" },
    "shop.theme.sub": { en: "UNLOCK A THEME", "zh-CN": "\u89E3\u9501\u4E00\u4E2A\u4E3B\u9898" },
    "shop.trophy.label": { en: "TROPHY CARD", "zh-CN": "\u5956\u676F\u5361" },
    "shop.trophy.sub": { en: "UNLOCK A TROPHY", "zh-CN": "\u89E3\u9501\u4E00\u4E2A\u5956\u676F" },
    // help modal
    "help.title": { en: "HOW TO PLAY", "zh-CN": "\u73A9\u6CD5\u8BF4\u660E" },
    "help.l1": { en: "SYNC to turn your AI coding tokens into coins.", "zh-CN": "\u70B9\u51FB\u540C\u6B65\uFF0C\u628A\u4F60\u7684 AI \u7F16\u7801 tokens \u53D8\u6210\u91D1\u5E01\u3002" },
    "help.l2": { en: "Each project grows into its own arcade cabinet.", "zh-CN": "\u6BCF\u4E2A\u9879\u76EE\u90FD\u4F1A\u957F\u6210\u4E00\u53F0\u4E13\u5C5E\u8857\u673A\u3002" },
    "help.l3": { en: "Spend coins at the capsule machine for collectibles.", "zh-CN": "\u5728\u626D\u86CB\u673A\u6295\u5E01\uFF0C\u62BD\u6536\u85CF\u54C1\u3002" },
    "help.l4": { en: "Fill the prize wall and unlock achievements.", "zh-CN": "\u586B\u6EE1\u5956\u54C1\u5899\uFF0C\u89E3\u9501\u6210\u5C31\u3002" },
    "help.demo": { en: "DEMO ARCADE uses fictional projects, tokens, coins, and collectibles. Choose TRY LIVE SCAN in Settings to check your local history again.", "zh-CN": "\u6F14\u793A\u8857\u673A\u5385\u4E2D\u7684\u9879\u76EE\u3001\u7528\u91CF\u3001\u91D1\u5E01\u548C\u6536\u85CF\u54C1\u5747\u4E3A\u865A\u6784\u5185\u5BB9\u3002\u53EF\u5728\u8BBE\u7F6E\u4E2D\u9009\u62E9\u300C\u5C1D\u8BD5\u626B\u63CF\u771F\u5B9E\u8BB0\u5F55\u300D\u91CD\u65B0\u68C0\u67E5\u672C\u5730\u8BB0\u5F55\u3002" }
  };
  var COL_ZH = {
    c_smiley: { name: "\u7B11\u8138\u82AF\u7247", desc: "\u4E00\u679A\u61A8\u7B11\u7684\u5C0F\u82AF\u7247\uFF0C\u59CB\u7EC8\u575A\u4FE1\u4E0B\u4E00\u6B21\u6784\u5EFA\u4EAE\u7684\u662F\u7EFF\u706F\u3002" },
    c_token: { name: "Token \u82AF\u7247", desc: "\u4ECE token \u6D41\u91CC\u6E9C\u51FA\u6765\u7684\u4E00\u70B9\u5C0F\u706B\u82B1\uFF0C\u88AB\u4F60\u987A\u624B\u6536\u8FDB\u4E86\u53E3\u888B\u3002" },
    c_heart: { name: "\u50CF\u7D20\u4E4B\u5FC3", desc: "\u4E00\u9897\u50CF\u7D20\u5FC3\u810F\uFF0C\u4E00\u79D2\u53EA\u8DF3 30 \u4E0B\uFF0C\u53EF\u6BCF\u4E00\u4E0B\u90FD\u5F88\u8D70\u5FC3\u3002" },
    c_gg: { name: "GG \u6A2A\u5E45", desc: "\u9669\u80DC\u3001\u5927\u80DC\uFF0C\u8FD8\u662F\u7A00\u91CC\u7CCA\u6D82\u5C31\u901A\u5173\u2014\u2014\u90FD\u503C\u5F97\u6302\u5B83\u5E86\u795D\u4E00\u4E0B\u3002" },
    c_mug: { name: "\u8857\u673A\u9A6C\u514B\u676F", desc: "\u676F\u5E95\u6C89\u7740\u51C9\u900F\u7684\u5496\u5561\uFF0C\u548C\u4E00\u4E2A\u786C\u6491\u5230\u51CC\u6668\u7684\u70B9\u5B50\u3002" },
    c_sprout: { name: "\u5C0F\u6811\u82D7", desc: "\u7528\u6CA1\u70E7\u5B8C\u7684 token \u6D47\u51FA\u6765\u7684\u5C0F\u82D7\uFF0C\u60F3\u8BA9\u5B83\u6D3B\uFF0C\u5C31\u5C11\u5F00\u51E0\u4E2A\u6807\u7B7E\u9875\u3002" },
    u_star: { name: "Debug \u4E4B\u661F", desc: "\u9881\u7ED9\u90A3\u4E9B\u521A\u5410\u69FD\u5B8C\uFF0C\u4E00\u8F6C\u5934\u5C31\u628A bug \u63EA\u51FA\u6765\u7684\u4EBA\u3002" },
    u_luckycoin: { name: "\u5E78\u8FD0\u5E01", desc: "\u5199\u9AD8\u98CE\u9669 prompt \u524D\u629B\u4E00\u4E0B\uFF0C\u5B83\u4E24\u9762\u90FD\u5199\u7740\u300C\u53D1\u5C31\u5B8C\u4E8B\u4E86\u300D\u3002" },
    u_shelf: { name: "\u4EE3\u7801\u4E66\u67B6", desc: "\u585E\u6EE1\u4E86\u5404\u79CD\u8BF4\u660E\u4E66\uFF0C\u8BB2\u7684\u5168\u662F\u6CA1\u4EBA\u518D\u6562\u52A8\u7684\u8001\u7CFB\u7EDF\u3002" },
    u_1up: { name: "1UP \u65D7", desc: "\u5220\u9519\u4E00\u884C\u4EE3\u7801\u7684\u90A3\u4E00\u523B\uFF0C\u5E2E\u4F60\u539F\u5730\u6EE1\u8840\u590D\u6D3B\u3002" },
    u_gemc: { name: "\u9752\u8272\u7F13\u5B58\u5B9D\u77F3", desc: "\u4E00\u5C0F\u5757\u5728\u4E0A\u4E0B\u6587\u538B\u7F29\u91CC\u6B7B\u91CC\u9003\u751F\u7684\u6E05\u51C9\u8BB0\u5FC6\u3002" },
    r_cat: { name: "\u62DB\u624B\u684C\u732B", desc: "\u5BF9\u4F60\u6BCF\u4E2A\u65B0\u70B9\u5B50\u62FC\u547D\u62DB\u624B\uFF0C\u597D\u50CF\u8FD9\u4E2A\u8FED\u4EE3\u662F\u5B83\u81EA\u638F\u8170\u5305\u8D5E\u52A9\u7684\u3002" },
    r_palm: { name: "\u4E13\u6CE8\u68D5\u6988", desc: "\u5F80\u89D2\u843D\u4E00\u6446\uFF0C\u6574\u4E2A\u5DE5\u4F4D\u77AC\u95F4\u591A\u4E86\u51E0\u5206\u5FC3\u65E0\u65C1\u9A9B\u7684\u6C14\u8D28\u3002" },
    r_gameover: { name: "Game Over \u724C", desc: "\u4E13\u4E3A\u5341\u5206\u949F\u524D\u5C31\u4FEE\u597D\u7684 bug \u51C6\u5907\uFF0C\u4EEA\u5F0F\u611F\u76F4\u63A5\u62C9\u6EE1\u3002" },
    r_stool: { name: "\u673A\u53F0\u51F3", desc: "\u9AD8\u5EA6\u521A\u597D\uFF0C\u8BA9\u4F60\u80FD\u4F53\u9762\u5730\u5750\u7740\uFF0C\u76EF\u7740\u8F6C\u5708\u7684\u8FDB\u5EA6\u6761\u51FA\u795E\u3002" },
    r_rug: { name: "\u661F\u661F\u5730\u6BEF", desc: "\u624B\u6C14\u7206\u68DA\u7684\u62BD\u5361\u548C\u79BB\u8C31\u5230\u5BB6\u7684\u5DE5\u671F\uFF0C\u90FD\u662F\u5728\u8FD9\u5757\u6BEF\u5B50\u4E0A\u53D1\u751F\u7684\u3002" },
    r_frame: { name: "\u9752\u8272\u5934\u50CF\u6846", desc: "\u7ED9\u4F60\u7684\u8857\u673A\u6218\u7EE9\uFF0C\u9576\u4E0A\u4E00\u5708\u5E72\u51C0\u5229\u843D\u7684\u9752\u8272\u9713\u8679\u8FB9\u3002" },
    e_rainbowcat: { name: "\u5F69\u8679\u8857\u673A\u732B", desc: "\u6BCF\u5F53\u4EE3\u7801\u83AB\u540D\u5176\u5999\u5C31\u8DD1\u901A\u4E86\uFF0C\u5B83\u5C31\u4F1A\u6084\u6084\u73B0\u8EAB\u3002" },
    e_astro: { name: "\u592A\u7A7A\u5DE1\u8B66", desc: "\u5728\u4F60\u90A3\u4E00\u5806\u6CA1\u5199\u5B8C\u7684\u652F\u7EBF\u4EFB\u52A1\u5916\u56F4\uFF0C\u65E5\u591C\u5DE1\u903B\u3002" },
    e_minicab: { name: "\u8FF7\u4F60\u673A\u53F0", desc: "\u4E00\u53F0\u4E13\u95E8\u6446\u5728\u673A\u53F0\u4E0A\u7684\u8FF7\u4F60\u673A\u53F0\u3002\u6BEB\u65E0\u5FC5\u8981\uFF0C\u4F46\u5C31\u662F\u4E0A\u5934\u3002" },
    e_trophy: { name: "\u91D1\u5956\u676F", desc: "\u8BC1\u660E\u90A3\u4E9B\u70E7\u6389\u7684 token\uFF0C\u5076\u5C14\u771F\u80FD\u6362\u56DE\u4E00\u70B9\u70B9\u8363\u5149\u3002" },
    e_sunset: { name: "\u65E5\u843D\u623F\u95F4\u4E3B\u9898", desc: "\u628A\u6574\u95F4\u8857\u673A\u5385\u67D3\u6210\u6696\u91D1\u8272\uFF0C\u8FDE\u300C\u518D\u91CD\u6784\u4E00\u6B21\u300D\u90FD\u7A81\u7136\u80FD\u5FCD\u4E86\u3002" },
    e_gemu: { name: "\u7D2B\u6C34\u6676\u7F13\u5B58\u5B9D\u77F3", desc: "\u4E00\u5757\u96BE\u5F97\u7684\u7D2B\u8272\u8BB0\u5FC6\uFF0C\u91CC\u9762\u8FD8\u9690\u7EA6\u7559\u7740\u5F53\u521D\u90A3\u4E2A\u601D\u8DEF\u3002" },
    l_crown: { name: "\u9713\u8679\u7687\u51A0", desc: "\u732E\u7ED9\u628A\u6EE1\u5C4F token \u4E00\u8DEF\u70E7\u6210\u8857\u673A\u4E4B\u738B\u7684\u90A3\u4E2A\u4EBA\u3002" },
    l_trophy: { name: "\u51A0\u519B\u5956\u676F", desc: "\u6C89\u7538\u7538\u3001\u4EAE\u95EA\u95EA\u2014\u2014\u4E00\u770B\u5C31\u77E5\u9053\uFF0C\u80CC\u540E\u70E7\u6389\u4E86\u591A\u5C11 token\u3002" },
    l_egg: { name: "\u9F99\u86CB", desc: "\u6478\u4E0A\u53BB\u6696\u6696\u7684\u3002\u81F3\u4E8E\u62FF\u4EC0\u4E48\u5582\u5927\u7684\uFF0C\u8FD8\u662F\u522B\u95EE\u4E86\u3002" },
    l_forest: { name: "\u68EE\u6797\u623F\u95F4\u4E3B\u9898", desc: "\u4E00\u7247\u5E7D\u9759\u7684\u6811\u6797\uFF0C\u80CC\u540E\u662F\u4E00\u7B14\u8C01\u90FD\u4E0D\u6562\u7EC6\u7B97\u7684\u7B97\u529B\u3002" },
    c_keyboard: { name: "\u8FF7\u4F60\u673A\u68B0\u952E\u76D8", desc: "\u6572\u8D77\u6765\u5F88\u50CF\u5728\u8BA4\u771F\u5DE5\u4F5C\uFF0C\u5C0F\u5230\u53C8\u80FD\u8F7B\u6613\u6D88\u5931\u5728\u4E00\u9897\u666E\u901A\u952E\u5E3D\u4E0B\u9762\u3002" },
    c_cursor: { name: "\u95EA\u70C1\u5149\u6807", desc: "\u8010\u5FC3\u5B88\u5728\u884C\u5C3E\uFF0C\u59CB\u7EC8\u76F8\u4FE1\u4F60\u7684\u4E0B\u4E00\u4E2A\u5FF5\u5934\u5C31\u662F\u90A3\u4E2A\u597D\u70B9\u5B50\u3002" },
    c_floppy: { name: "\u5B58\u6863\u70B9\u8F6F\u76D8", desc: "\u88C5\u7740\u4E00\u6B21\u52C7\u6562\u7684\u5B58\u6863\uFF0C\u4EE5\u53CA\u90A3\u53E5\u4EE4\u4EBA\u5B89\u5FC3\u7684\u8C0E\u8BDD\uFF1A\u300C\u968F\u65F6\u90FD\u80FD\u56DE\u6EDA\u300D\u3002" },
    c_duck: { name: "\u684C\u9762\u5C0F\u9EC4\u9E2D", desc: "\u4ECE\u5934\u542C\u5B8C\uFF0C\u4E0D\u505A\u8BC4\u5224\uFF0C\u6700\u540E\u5374\u603B\u80FD\u770B\u89C1\u4F60\u6F0F\u6389\u7684\u90A3\u4E2A\u5206\u53F7\u3002" },
    c_patch: { name: "\u8865\u4E01\u8BF4\u660E\u724C", desc: "\u90D1\u91CD\u5BA3\u5E03\u4E09\u9879\u4FEE\u590D\u3001\u4E24\u4E2A\u60CA\u559C\uFF0C\u4EE5\u53CA\u4E00\u4E2A\u521A\u88AB\u6276\u6B63\u6210\u7279\u6027\u7684 bug\u3002" },
    c_noodle: { name: "\u5348\u591C\u6CE1\u9762", desc: "\u51CC\u6668\u4E24\u70B9\u4F9D\u7136\u5192\u7740\u70ED\u6C14\uFF0C\u90A3\u65F6\u6BCF\u6761\u6377\u5F84\u90FD\u5F88\u4F18\u96C5\uFF0C\u6BCF\u4E2A\u5DE5\u671F\u90FD\u53EF\u5546\u91CF\u3002" },
    c_terminal: { name: "\u638C\u4E0A\u7EC8\u7AEF", desc: "\u4E13\u6CBB\u7A81\u53D1\u72B6\u51B5\u3001\u4E34\u65F6\u652F\u7EBF\uFF0C\u4EE5\u53CA\u79BB\u5F00\u5DE5\u4F4D\u540E\u90A3\u53E5\u300C\u6211\u518D\u67E5\u6700\u540E\u4E00\u4E0B\u300D\u3002" },
    c_shipit: { name: "\u53D1\u7248\u5427\u8D34\u7EB8", desc: "\u6495\u5F00\u3001\u8D34\u4E0A\u3001\u53D1\u5E03\u3002\u81F3\u4E8E\u8981\u4E0D\u8981\u518D\u770B\u4E00\u904D diff\uFF0C\u90A3\u662F\u660E\u5929\u7684\u70E6\u607C\u3002" },
    u_lavalamp: { name: "Token \u7194\u5CA9\u706F", desc: "\u70E7\u8FC7\u7684\u4E0A\u4E0B\u6587\u7F13\u7F13\u5347\u8D77\u3001\u4EA4\u6C47\uFF0C\u6700\u540E\u7ADF\u51DD\u6210\u4E86\u4E00\u4E2A\u8FD8\u4E0D\u9519\u7684\u70B9\u5B50\u3002" },
    u_lintbot: { name: "Lint \u5C0F\u673A\u5668\u4EBA", desc: "\u4E00\u8FB9\u6253\u78E8\u6BDB\u8FB9\uFF0C\u4E00\u8FB9\u5FF5\u53E8\u90A3\u4E9B\u53EA\u6709\u5B83\u770B\u5F97\u89C1\u7684\u884C\u5C3E\u7A7A\u683C\u3002" },
    u_bonsai: { name: "\u50CF\u7D20\u76C6\u666F", desc: "\u4E00\u679D\u4E00\u53F6\u6162\u6162\u4FEE\u526A\uFF0C\u50CF\u6781\u4E86\u90A3\u6B21\u771F\u7684\u6CA1\u6709\u8D8A\u6539\u8D8A\u5927\u7684\u91CD\u6784\u3002" },
    u_prompt: { name: "\u518D\u95EE\u4E00\u53E5\u706F\u724C", desc: "\u672C\u5385\u552F\u4E00\u7684\u6253\u70CA\u544A\u793A\uFF0C\u53EF\u60DC\u4ECE\u6765\u6CA1\u4EBA\u771F\u7684\u6309\u65F6\u6253\u70CA\u3002" },
    u_enter: { name: "\u9EC4\u91D1\u56DE\u8F66\u952E", desc: "\u7EAA\u5FF5\u72B9\u8C6B\u7ED3\u675F\u3001\u771F\u6B63\u5F00\u59CB\u70E7 token \u7684\u90A3\u4E00\u77AC\u95F4\u3002" },
    u_headphones: { name: "\u4E13\u6CE8\u8033\u673A", desc: "\u9694\u7EDD\u95F2\u804A\u3001\u63D0\u9192\uFF0C\u4EE5\u53CA\u6240\u6709\u529D\u4F60\u522B\u518D\u5F00\u4E00\u4E2A\u65B0\u9879\u76EE\u7684\u7406\u6027\u58F0\u97F3\u3002" },
    u_inbox: { name: "\u6536\u4EF6\u7BB1\u6E05\u96F6\u80F6\u56CA", desc: "\u5BC6\u5C01\u4FDD\u5B58\u7740\u300C\u4E00\u6761\u672A\u8BFB\u90FD\u6CA1\u6709\u300D\u8FD9\u79CD\u53EA\u5728\u4F20\u8BF4\u4E2D\u51FA\u73B0\u7684\u72B6\u6001\u3002" },
    r_drone: { name: "\u4E0A\u4E0B\u6587\u4FE1\u4F7F\u65E0\u4EBA\u673A", desc: "\u628A\u5173\u952E\u7EBF\u7D22\u9001\u8FC7\u6F2B\u957F\u4F1A\u8BDD\uFF0C\u53EA\u4F1A\u5076\u5C14\u6389\u4E0B\u51E0\u6761\u5C34\u5C2C\u7684 TODO\u3002" },
    r_clock: { name: "\u6B7B\u7EBF\u65F6\u949F", desc: "\u5E73\u65F6\u8D70\u5F97\u56DB\u5E73\u516B\u7A33\uFF0C\u4E00\u5230\u53D1\u5E03\u65E5\uFF0C\u6BCF\u4E00\u5206\u949F\u5C31\u53EA\u5269\u5927\u7EA6\u4E03\u79D2\u3002" },
    r_vending: { name: "Bug \u4FEE\u590D\u8D29\u5356\u673A", desc: "\u6295\u5165\u4E00\u4E2A\u7A33\u5B9A\u590D\u73B0\u6848\u4F8B\uFF0C\u6389\u51FA\u4FEE\u590D\u3001\u7ED5\u884C\u65B9\u6848\uFF0C\u6216\u4E00\u58F0\u975E\u5E38\u81EA\u4FE1\u7684\u6C89\u9ED8\u3002" },
    r_hologram: { name: "\u5168\u606F Commit", desc: "\u6295\u5C04\u51FA\u90A3\u6761\u5B8C\u7F8E\u63D0\u4EA4\u8BB0\u5F55\uFF0C\u53EA\u662F\u6BCF\u4E2A\u4EBA\u8BB0\u5F97\u7684\u5185\u5BB9\u90FD\u4E0D\u592A\u4E00\u6837\u3002" },
    e_whale: { name: "\u4E91\u7AEF\u9CB8", desc: "\u9A6E\u7740\u96BE\u4EE5\u60F3\u8C61\u7684\u89C4\u6A21\u4ECE\u673A\u53F0\u4E0A\u7A7A\u6E38\u8FC7\uFF0C\u5E73\u9759\u5F97\u50CF\u4E00\u4E2A\u5076\u7136\u63A0\u8FC7\u7684\u5FF5\u5934\u3002" },
    e_portal: { name: "\u91CD\u6784\u4F20\u9001\u95E8", desc: "\u5E26\u7740\u4E71\u4EE3\u7801\u8FDB\u53BB\uFF0C\u4E09\u5C0F\u65F6\u540E\u5E26\u7740\u6574\u6D01\u4EE3\u7801\u548C\u4E00\u6279\u65B0\u95EE\u9898\u56DE\u6765\u3002" },
    l_pair: { name: "\u9EC4\u91D1\u7ED3\u5BF9\u7A0B\u5E8F\u5458", desc: "\u603B\u80FD\u95EE\u51FA\u7F3A\u7684\u90A3\u53E5\u8BDD\uFF0C\u9012\u6765\u7B2C\u4E8C\u628A\u952E\u76D8\uFF0C\u8FDE\u96F6\u98DF\u51FA\u73B0\u7684\u65F6\u673A\u90FD\u65E0\u53EF\u6311\u5254\u3002" },
    l_infinite: { name: "\u65E0\u9650 Token \u8DD1\u9A6C\u706F", desc: "\u6570\u5B57\u6C38\u4E0D\u505C\u8F6C\uFF0C\u4E3A\u6BCF\u4E2A\u8DB3\u591F\u75AF\u72C2\u3001\u53C8\u771F\u7684\u6D3B\u5230\u4E0A\u7EBF\u7684\u70B9\u5B50\u4EAE\u706F\u3002" }
  };
  function t(key, params) {
    const entry = UI[key];
    let s2 = entry ? entry[current] ?? entry.en : key;
    if (params) {
      for (const k in params) s2 = s2.split("{" + k + "}").join(String(params[k]));
    }
    return s2;
  }
  function tCollectibleName(id) {
    const en = byId[id]?.name ?? id;
    return current === "zh-CN" ? COL_ZH[id]?.name ?? en : en;
  }

  // src/render/widgets.ts
  function drawIconCentered(g, img, cx, cy, size) {
    const nw = img.naturalWidth || size;
    const nh = img.naturalHeight || size;
    const ar = nw / nh;
    let w = size;
    let h = size;
    if (ar >= 1) h = size / ar;
    else w = size * ar;
    drawImageSmooth(g, img, cx - w / 2, cy - h / 2, w, h);
  }

  // src/render/fx.ts
  var coins = [];
  var sparks = [];
  var banners = [];
  var pulses = {};
  var toasts = [];
  var cosmeticRevealState = null;
  var DEFAULT_TOAST_ZONE = { cx: 800, top: 150, w: 360 };
  var toastZone = { ...DEFAULT_TOAST_ZONE };
  function setToastZone(cx, top, w) {
    toastZone = { cx, top, w };
  }
  function reset() {
    coins = [];
    sparks = [];
    banners = [];
    pulses = {};
    toasts = [];
    cosmeticRevealState = null;
    toastZone = { ...DEFAULT_TOAST_ZONE };
  }
  function coinRain(x, y, count, target, onArrive) {
    for (let i = 0; i < count; i++) {
      const delay = Math.random() * 0.5;
      coins.push({
        x: x + (Math.random() - 0.5) * 80,
        y: y + (Math.random() - 0.5) * 30,
        vx: (Math.random() - 0.5) * 120,
        vy: -220 - Math.random() * 180,
        r: 9 + Math.random() * 5,
        spin: Math.random() * Math.PI,
        spinV: 6 + Math.random() * 6,
        t: -delay,
        phase: "rise",
        target,
        onArrive,
        arrived: false
      });
    }
    for (let i = 0; i < count * 1.4; i++) {
      spark(x + (Math.random() - 0.5) * 120, y + (Math.random() - 0.5) * 60, "#ffd23f");
    }
  }
  function spark(x, y, color) {
    sparks.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 160,
      vy: -Math.random() * 160,
      life: 0.5 + Math.random() * 0.5,
      max: 1,
      color: color ?? "#fff",
      size: 1 + Math.random() * 2
    });
  }
  function burst(x, y, color, n) {
    const count = n ?? 16;
    for (let i = 0; i < count; i++) {
      spark(x, y, color);
    }
  }
  function banner(text, x, y, color, opts = {}) {
    const life = opts.life ?? 1.8;
    banners.push({
      text,
      x,
      y,
      color,
      life,
      max: life,
      scale: opts.scale ?? 5,
      vy: opts.vy == null ? -40 : opts.vy,
      glow: opts.glow
    });
  }
  function pulse(projectId) {
    pulses[projectId] = 1;
  }
  function toast(title, sub, sprite) {
    const delay = -0.35 * toasts.length;
    toasts.push({ title, sub, sprite, life: 3.4 - delay, max: 3.4, t: delay });
  }
  function cosmeticReveal(name, sprite, collectibleId) {
    cosmeticRevealState = { name, sprite, collectibleId, life: 3.2, max: 3.2 };
  }
  function pulseAmount(projectId) {
    return pulses[projectId] || 0;
  }
  function update(dt) {
    for (let i = coins.length - 1; i >= 0; i--) {
      const c = coins[i];
      c.t += dt;
      if (c.t < 0) {
        continue;
      }
      c.spin += c.spinV * dt;
      if (c.phase === "rise") {
        c.vy += 620 * dt;
        c.x += c.vx * dt;
        c.y += c.vy * dt;
        if (c.t > 0.55 && c.target) {
          c.phase = "seek";
        }
      } else {
        const dx = c.target.x - c.x;
        const dy = c.target.y - c.y;
        const d = Math.hypot(dx, dy) || 1;
        const sp = 900;
        c.x += dx / d * sp * dt;
        c.y += dy / d * sp * dt;
        if (d < 26) {
          if (!c.arrived && c.onArrive) {
            c.onArrive();
          }
          coins.splice(i, 1);
        }
      }
    }
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s2 = sparks[i];
      s2.life -= dt;
      s2.vy += 300 * dt;
      s2.x += s2.vx * dt;
      s2.y += s2.vy * dt;
      if (s2.life <= 0) {
        sparks.splice(i, 1);
      }
    }
    for (let i = banners.length - 1; i >= 0; i--) {
      const b = banners[i];
      b.life -= dt;
      b.y += b.vy * dt;
      if (b.life <= 0) {
        banners.splice(i, 1);
      }
    }
    for (const k in pulses) {
      pulses[k] -= dt * 1.4;
      if (pulses[k] <= 0) {
        delete pulses[k];
      }
    }
    for (let i = toasts.length - 1; i >= 0; i--) {
      const t2 = toasts[i];
      t2.life -= dt;
      t2.t += dt;
      if (t2.life <= 0) {
        toasts.splice(i, 1);
      }
    }
    if (cosmeticRevealState) {
      cosmeticRevealState.life -= dt;
      if (cosmeticRevealState.life <= 0) cosmeticRevealState = null;
    }
  }
  function draw(ctx2, W) {
    for (const s2 of sparks) {
      ctx2.globalAlpha = Math.max(0, s2.life / s2.max);
      ctx2.fillStyle = s2.color;
      ctx2.fillRect(s2.x, s2.y, s2.size, s2.size);
    }
    ctx2.globalAlpha = 1;
    for (const c of coins) {
      if (c.t < 0) {
        continue;
      }
      drawCoin(ctx2, c.x, c.y, c.r, Math.cos(c.spin));
    }
    for (const b of banners) {
      const a = Math.min(1, b.life / 0.5);
      ctx2.globalAlpha = a;
      drawText(ctx2, b.text, b.x, b.y, b.scale, b.color, {
        align: "center",
        glow: b.glow ?? b.color,
        glowBlur: 5,
        shadow: "rgba(0,0,0,0.6)"
      });
      ctx2.globalAlpha = 1;
    }
    const tw = toastZone.w;
    const tx = toastZone.cx - tw / 2;
    const th = 54;
    let ty = toastZone.top;
    for (const to of toasts) {
      if (to.t < 0) continue;
      const inA = Math.min(1, to.t / 0.3);
      const outA = Math.min(1, to.life / 0.4);
      ctx2.globalAlpha = Math.min(inA, outA);
      rrect(ctx2, tx + 3, ty + 4, tw, th, 8);
      ctx2.fillStyle = "rgba(0,0,0,0.35)";
      ctx2.fill();
      rrect(ctx2, tx, ty, tw, th, 8);
      vgrad(ctx2, tx, ty, tw, th, "#2a1e4a", "#160f28");
      ctx2.fill();
      ctx2.strokeStyle = "#ffd23f";
      ctx2.lineWidth = 2;
      rrect(ctx2, tx, ty, tw, th, 8);
      ctx2.stroke();
      const spr = SPRITES[to.sprite];
      if (to.sprite && spr) {
        drawSprite(ctx2, spr, tx + 11, ty + 11, 2);
      }
      drawText(ctx2, t("ui.achievement"), tx + 44, ty + 11, 1.4, "#ffd23f");
      drawText(ctx2, to.title, tx + 44, ty + 29, 1.75, "#f6f4ff");
      ctx2.globalAlpha = 1;
      ty += th + 8;
    }
    if (cosmeticRevealState) {
      const reveal2 = cosmeticRevealState;
      const x = 990;
      const y = 166;
      const w = 224;
      const h = 96;
      const fade = Math.min(1, reveal2.life / 0.35);
      ctx2.save();
      ctx2.globalAlpha = fade;
      ctx2.shadowColor = "#ffd23f";
      ctx2.shadowBlur = 12;
      rrect(ctx2, x, y, w, h, 9);
      vgrad(ctx2, x, y, w, h, "#332154", "#120d25");
      ctx2.fill();
      ctx2.strokeStyle = "#ffd23f";
      ctx2.lineWidth = 2;
      rrect(ctx2, x, y, w, h, 9);
      ctx2.stroke();
      ctx2.shadowBlur = 0;
      ctx2.fillStyle = "rgba(95,230,214,0.68)";
      ctx2.fillRect(x + 10, y + 8, w - 20, 2);
      const itemIcon = reveal2.collectibleId ? collectibleIcon(reveal2.collectibleId) : null;
      if (itemIcon) {
        drawIconCentered(ctx2, itemIcon, x + 35, y + 50, 42);
      } else if (reveal2.collectibleId !== "r_frame") {
        const spr = SPRITES[reveal2.sprite];
        if (reveal2.sprite && spr) drawSprite(ctx2, spr, x + 14, y + 33, 2.15);
      }
      const textX = x + 62;
      drawText(ctx2, t("ui.newCosmetic"), textX, y + 17, 1.3, "#ffd23f", { glow: "#ffd23f", glowBlur: 3 });
      const nameScale = Math.max(1.1, Math.min(1.65, (w - 74) / Math.max(1, measureText(reveal2.name, 1))));
      drawText(ctx2, reveal2.name, textX, y + 35, nameScale, "#f6f4ff");
      drawText(ctx2, t("ui.unlockedBang"), textX, y + 57, 1.25, "#5fe6d6", { glow: "#5fe6d6", glowBlur: 2 });
      drawText(ctx2, "\u2192 " + t("ui.customizeArcade"), textX, y + 75, 1.05, "#c9c6e0");
      ctx2.restore();
    }
  }
  function busy() {
    return coins.length > 0;
  }
  var fx = {
    reset,
    coinRain,
    spark,
    burst,
    banner,
    pulse,
    pulseAmount,
    toast,
    cosmeticReveal,
    setToastZone,
    update,
    draw,
    busy
  };

  // src/domain/levels.ts
  var MAX_LEVEL = 50;
  var ANCHORS = [
    [1, 0],
    [2, 8e3],
    [5, 1e5],
    [10, 1e6],
    [20, 1e7],
    [35, 5e7],
    [50, 5e8]
  ];
  function buildThresholds() {
    const th = [];
    for (let lvl = 1; lvl <= MAX_LEVEL; lvl++) {
      let a = ANCHORS[0];
      let b = ANCHORS[ANCHORS.length - 1];
      for (let i = 0; i < ANCHORS.length - 1; i++) {
        if (lvl >= ANCHORS[i][0] && lvl <= ANCHORS[i + 1][0]) {
          a = ANCHORS[i];
          b = ANCHORS[i + 1];
          break;
        }
      }
      const [la, ta] = a;
      const [lb, tb] = b;
      const f = (lvl - la) / (lb - la);
      const tok = ta <= 0 ? Math.round(tb * f) : Math.round(ta * Math.pow(tb / ta, f));
      th.push(tok);
    }
    th[0] = 0;
    return th;
  }
  var LEVEL_THRESHOLDS = buildThresholds();
  var STAGES = [
    { index: 0, key: "starter", name: "STARTER", loLevel: 1, hiLevel: 4 },
    { index: 1, key: "powered", name: "POWERED", loLevel: 5, hiLevel: 9 },
    { index: 2, key: "deluxe", name: "DELUXE", loLevel: 10, hiLevel: 19 },
    { index: 3, key: "neon", name: "NEON", loLevel: 20, hiLevel: 34 },
    { index: 4, key: "legendary", name: "LEGENDARY", loLevel: 35, hiLevel: 50 }
  ];
  function stageForLevel(level) {
    const lvl = Math.max(1, Math.min(MAX_LEVEL, level));
    for (const s2 of STAGES) if (lvl >= s2.loLevel && lvl <= s2.hiLevel) return s2;
    return STAGES[STAGES.length - 1];
  }
  function levelFor(tokens) {
    let lvl = 1;
    for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) if (tokens >= LEVEL_THRESHOLDS[i]) lvl = i + 1;
    return lvl;
  }
  function coinMultiplier(level) {
    const lvl = Math.max(1, Math.min(MAX_LEVEL, level));
    return 1 + (lvl - 1) / (MAX_LEVEL - 1) * 0.5;
  }
  function levelInfo(tokens) {
    const level = levelFor(tokens);
    const base = LEVEL_THRESHOLDS[level - 1];
    const next = level < LEVEL_THRESHOLDS.length ? LEVEL_THRESHOLDS[level] : null;
    const stage2 = stageForLevel(level);
    const multiplier = coinMultiplier(level);
    if (next == null) {
      return { level, stage: stage2, base, next: null, progress: 1, toNext: 0, isMax: true, multiplier };
    }
    const progress2 = Math.max(0, Math.min(1, (tokens - base) / (next - base)));
    return { level, stage: stage2, base, next, progress: progress2, toNext: Math.max(0, next - tokens), isMax: false, multiplier };
  }

  // src/domain/growth.ts
  var GROWTH_CHAPTERS = [
    { id: "first-light", tokens: 1e4, reward: "c_sprout", zh: "\u7B2C\u4E00\u76CF\u706F", en: "The first light", storyZh: "\u7ED9\u521A\u5F00\u5F20\u7684\u5C0F\u5E97\u6DFB\u4E00\u70B9\u7EFF\u3002", storyEn: "A little green for your new corner." },
    { id: "settle-in", tokens: 1e5, reward: "c_mug", zh: "\u5728\u8FD9\u91CC\u5B89\u5BB6", en: "Make yourself at home", storyZh: "\u653E\u597D\u676F\u5B50\uFF0C\u6162\u6162\u6765\u5C31\u597D\u3002", storyEn: "Set down your mug. Take your time." },
    { id: "new-friend", tokens: 25e4, reward: "r_cat", zh: "\u8FCE\u63A5\u65B0\u670B\u53CB", en: "A friend moves in", storyZh: "\u4F60\u7684\u8857\u673A\u5385\uFF0C\u6709\u732B\u4E86\u3002", storyEn: "Your arcade now has a cat." },
    { id: "neon-bloom", tokens: 1e6, reward: "r_rug", zh: "\u661F\u5149\u5C0F\u5929\u5730", en: "A place among the stars", storyZh: "\u94FA\u4E0A\u661F\u661F\u5730\u6BEF\uFF0C\u8BA9\u5C0F\u5E97\u66F4\u50CF\u5BB6\u3002", storyEn: "A starry rug makes this place yours." },
    { id: "golden-hour", tokens: 5e6, reward: "e_sunset", zh: "\u628A\u9EC4\u660F\u7559\u4E0B", en: "Keep the golden hour", storyZh: "\u89E3\u9501\u6574\u95F4\u8857\u673A\u5385\u7684\u843D\u65E5\u4E3B\u9898\u3002", storyEn: "Unlock a sunset for your whole arcade." },
    { id: "space-friend", tokens: 1e7, reward: "e_astro", zh: "\u6765\u81EA\u661F\u7A7A\u7684\u5BA2\u4EBA", en: "A visitor from space", storyZh: "\u65B0\u7684\u4F19\u4F34\uFF0C\u65B0\u7684\u5192\u9669\u3002", storyEn: "A new companion for the next adventure." },
    { id: "forest-home", tokens: 5e7, reward: "l_forest", zh: "\u68EE\u6797\u91CC\u7684\u4F20\u8BF4", en: "A little forest legend", storyZh: "\u8BA9\u4F60\u7684\u8857\u673A\u5385\u751F\u957F\u6210\u4E00\u5EA7\u68EE\u6797\u3002", storyEn: "Let your arcade grow into a forest." }
  ];
  function companionGrowth(tokens) {
    const thresholds = [0, 1e5, 1e6, 1e7];
    const stage2 = thresholds.reduce((current2, value, index) => tokens >= value ? index : current2, 0);
    const next = thresholds[stage2 + 1] ?? null;
    return { stage: stage2, next, progress: next === null ? 1 : Math.max(0, (tokens - thresholds[stage2]) / (next - thresholds[stage2])) };
  }

  // src/domain/economy.ts
  var CONFIG = {
    TOKENS_PER_COIN: 1e4,
    // 10,000 tokens = 1 coin (Economy V2, MVP audit)
    PULL_COST: 25,
    PULL10_COST: 225,
    COINS_PER_TICKET: 50
    // bonus ticket per N coins minted in one sync
  };
  function fmtCompact(n) {
    n = Math.floor(n || 0);
    const abs = Math.abs(n);
    if (abs < 1e3) return String(n);
    if (abs < 1e6) return abs < 1e4 ? (n / 1e3).toFixed(1) + "K" : Math.round(n / 1e3) + "K";
    if (abs < 1e9) return abs < 1e7 ? (n / 1e6).toFixed(2) + "M" : Math.round(n / 1e6) + "M";
    return (n / 1e9).toFixed(2) + "B";
  }
  function tokensToCoins(residue, newTokens) {
    const pool = (residue || 0) + Math.max(0, newTokens || 0);
    const coins2 = Math.floor(pool / CONFIG.TOKENS_PER_COIN);
    return { coins: coins2, residue: pool % CONFIG.TOKENS_PER_COIN };
  }

  // src/domain/capsule.ts
  function rollRarity(rng = Math.random) {
    const r = rng();
    let total = 0;
    for (const k of RARITY_ORDER) total += RARITIES[k].weight;
    let acc = 0;
    const target = r * total;
    for (const k of RARITY_ORDER) {
      acc += RARITIES[k].weight;
      if (target < acc) return k;
    }
    return "common";
  }
  function rollCapsule(rng = Math.random) {
    const rarity = rollRarity(rng);
    const pool = byRarity[rarity];
    return pool[Math.floor(rng() * pool.length)];
  }

  // src/preview/progress.ts
  var PLAYTEST_KEY = "token-arcade:cozy-playtest:v2";
  var CHAPTERS = GROWTH_CHAPTERS.slice(0, 3);
  function freshPlaytest() {
    return {
      version: 2,
      coins: 9,
      residue: 0,
      syncs: 0,
      tokens: [39e3, 45e3, 6e3],
      owned: {},
      claims: [],
      dust: 0,
      slots: [null, null, null, null, null, null],
      pending: [],
      favorite: 0
    };
  }
  function totalTokens(s2) {
    return s2.tokens.reduce((a, b) => a + b, 0);
  }
  function collectSession(s2) {
    const amount = [16e4, 25e4, 5e5, 1e6][Math.min(s2.syncs, 3)];
    const project = s2.syncs % 3;
    const mint = tokensToCoins(s2.residue, amount);
    s2.tokens[project] += amount;
    s2.coins += mint.coins;
    s2.residue = mint.residue;
    s2.syncs++;
    return { amount, coins: mint.coins, project };
  }
  function grant(s2, id) {
    const duplicate = !!s2.owned[id];
    const dust = duplicate ? { common: 1, uncommon: 2, rare: 3, epic: 5, legendary: 10 }[byId[id].rarity] : 0;
    s2.owned[id] = (s2.owned[id] || 0) + 1;
    s2.dust += dust;
    return { id, duplicate, dust };
  }
  function claimChapter(s2, index) {
    const c = CHAPTERS[index];
    if (!c || s2.claims.includes(c.id) || totalTokens(s2) < c.tokens) return null;
    s2.claims.push(c.id);
    return grant(s2, c.reward);
  }
  function pullCapsules(s2, count, rng = Math.random) {
    if (count !== 1 && count !== 10 || s2.pending.length) return false;
    const cost = count === 10 ? CONFIG.PULL10_COST : CONFIG.PULL_COST;
    if (s2.coins < cost) return false;
    s2.coins -= cost;
    s2.pending = Array.from({ length: count }, () => grant(s2, rollCapsule(rng).id));
    return true;
  }
  function exchangeMissing(s2, rng = Math.random) {
    const missing = COLLECTIBLES.filter((c) => !s2.owned[c.id]);
    if (s2.dust < 120 || !missing.length || s2.pending.length) return false;
    s2.dust -= 120;
    s2.pending = [grant(s2, missing[Math.floor(rng() * missing.length)].id)];
    return true;
  }
  function displaySlots(id) {
    const item = byId[id];
    if (!item) return [];
    if (item.type === "buddy" || ["r_palm", "r_stool", "r_rug", "u_shelf", "e_minicab", "r_vending", "e_portal"].includes(id)) return [3, 4];
    if (item.type === "sign" || item.type === "badge" || item.type === "frame") return [0, 1, 2, 5];
    if (["c_sprout", "u_bonsai", "u_lavalamp"].includes(id)) return [0, 1, 2, 3, 4];
    return [0, 1, 2];
  }
  function placePrize(s2, id, slot) {
    if (!byId[id] || !s2.owned[id] || !Number.isInteger(slot) || !displaySlots(id).includes(slot)) return false;
    s2.slots = s2.slots.map((v) => v === id ? null : v);
    s2.slots[slot] = id;
    return true;
  }
  function readPlaytest(raw) {
    if (!raw) return null;
    try {
      const s2 = JSON.parse(raw);
      const integer = (n) => Number.isSafeInteger(n) && Number(n) >= 0;
      if (s2.version !== 2 || ![s2.coins, s2.residue, s2.syncs, s2.dust, s2.favorite].every(integer) || s2.residue >= 1e4 || s2.favorite > 2) return null;
      if (!Array.isArray(s2.tokens) || s2.tokens.length !== 3 || !s2.tokens.every(integer) || !Number.isSafeInteger(totalTokens(s2))) return null;
      if (!s2.owned || typeof s2.owned !== "object" || Array.isArray(s2.owned) || !Object.entries(s2.owned).every(([id, n]) => !!byId[id] && integer(n) && n > 0)) return null;
      if (!Array.isArray(s2.claims) || !s2.claims.every((id) => CHAPTERS.some((c) => c.id === id)) || new Set(s2.claims).size !== s2.claims.length) return null;
      if (!Array.isArray(s2.slots) || s2.slots.length !== 6 || !s2.slots.every((id) => id === null || !!s2.owned[id])) return null;
      if (new Set(s2.slots.filter(Boolean)).size !== s2.slots.filter(Boolean).length) return null;
      if (!Array.isArray(s2.pending) || s2.pending.length > 10 || !s2.pending.every((r) => r && !!s2.owned[r.id] && typeof r.duplicate === "boolean" && integer(r.dust))) return null;
      return s2;
    } catch {
      return null;
    }
  }

  // src/preview/navigation.ts
  function floorPath(from, to, occupied) {
    const size = 20, left = 350, top = 710, cols = 49, rows = 10;
    const cell = (p) => ({ x: Math.max(0, Math.min(cols - 1, Math.round((p.x - left) / size))), y: Math.max(0, Math.min(rows - 1, Math.round((p.y - top) / size))) });
    const point = (x, y) => ({ x: left + x * size, y: top + y * size });
    const blocked = (x, y) => occupied.some((o) => Math.hypot(o.x - point(x, y).x, o.y - point(x, y).y) < 50);
    const start = cell(from), target = cell(to), key = (x, y) => y * cols + x;
    const queue = [start], previous = /* @__PURE__ */ new Map([[key(start.x, start.y), null]]);
    let best = start, distance = Infinity;
    for (let i = 0; i < queue.length; i++) {
      const c = queue[i], d = Math.hypot(c.x - target.x, c.y - target.y);
      if (d < distance) {
        best = c;
        distance = d;
      }
      if (d === 0) break;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const x = c.x + dx, y = c.y + dy, k2 = key(x, y);
        if (x < 0 || y < 0 || x >= cols || y >= rows || previous.has(k2) || blocked(x, y)) continue;
        previous.set(k2, key(c.x, c.y));
        queue.push({ x, y });
      }
    }
    const result = [];
    let k = key(best.x, best.y);
    while (k !== null) {
      result.unshift(point(k % cols, Math.floor(k / cols)));
      k = previous.get(k) ?? null;
    }
    return result.slice(1);
  }

  // src/preview.ts
  var canvas = document.querySelector("#stage");
  var stage = new Stage(canvas);
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var art = /* @__PURE__ */ new Map();
  var root = "./assets/cozy-preview/";
  var files = { room: root + "room.webp", journal: root + "journal.png", dialogue: root + "dialogue.png", hud: root + "hud.png", book: root + "book.png", bank: "./assets/coin-bank.webp", capsule: "./assets/capsule/machine.png", ball: "./assets/shop/items/shop_capsule_single.webp" };
  for (let i = 0; i < 5; i++) files["cab" + i] = root + `cabinet-${i + 1}.png`;
  for (let i = 0; i < 4; i++) {
    files["keeper" + i] = root + `keeper-${i}.png`;
    files["lumi" + i] = root + `lumi-${i}.png`;
  }
  for (const c of COLLECTIBLES) files[c.id] = `./assets/collectibles/items/${c.id}.png`;
  var GOLD = "#f4d793";
  var MINT = "#9fddc6";
  var INK = "#f6e6c7";
  var DARK = "#382333";
  var s = freshPlaytest();
  var saveIssue = false;
  try {
    const raw = sessionStorage.getItem(PLAYTEST_KEY);
    s = readPlaytest(raw) ?? s;
    saveIssue = !!raw && !readPlaytest(raw);
  } catch {
    saveIssue = true;
  }
  function save() {
    try {
      sessionStorage.setItem(PLAYTEST_KEY, JSON.stringify(s));
      saveIssue = false;
    } catch {
      saveIssue = true;
    }
  }
  var locale = "zh";
  setLocale("zh-CN");
  var say = (zh, en) => locale === "zh" ? zh : en;
  var cname = (id) => locale === "zh" ? tCollectibleName(id) : byId[id].name;
  var active = s.pending.length ? "capsule" : null;
  var chapter = 0;
  var selected = 0;
  var collectionPage = 0;
  var selectedPrize = "c_sprout";
  var placing = null;
  var revealAt = s.pending.length ? -1e4 : Infinity;
  var revealIndex = 0;
  var rewardAt = -1e4;
  var helloAt = -1e4;
  var toast2 = "";
  var toastUntil = 0;
  var muted2 = false;
  var player = { x: 790, y: 830 };
  var pet = { x: 875, y: 845 };
  var path = [];
  var arrival = null;
  var going = "";
  var keys = /* @__PURE__ */ new Set();
  var projects = [{ zh: "\u8611\u83C7\u82B1\u56ED", en: "Moss Garden" }, { zh: "\u50CF\u7D20\u7535\u53F0", en: "Pixel Radio" }, { zh: "\u5C0F\u5C0F\u5DE5\u5177", en: "Little Tools" }];
  var slots = [{ x: 1480, y: 390, w: 68, h: 76 }, { x: 1470, y: 475, w: 68, h: 66 }, { x: 1480, y: 555, w: 76, h: 65 }, { x: 405, y: 804, w: 76, h: 86 }, { x: 1260, y: 856, w: 94, h: 97 }, { x: 1125, y: 353, w: 72, h: 90 }];
  var obstacles = () => [3, 4].filter((i) => !!s.slots[i]).map((i) => slots[i]);
  var actions = [];
  var focusIndex = -1;
  var hoverLabel = "";
  var hoverX = 800;
  var hoverY = 700;
  var semantic = document.querySelector("#controls");
  var status = document.querySelector("#status");
  function announce(text) {
    status.textContent = text;
  }
  function message(zh, en, duration = 2600) {
    toast2 = say(zh, en);
    toastUntil = performance.now() + duration;
    announce(toast2);
  }
  function open(dialog) {
    active = dialog;
    keys.clear();
    path = [];
    arrival = null;
    going = "";
    focusIndex = -1;
    sound.click();
  }
  function walk(to, after = null, label2 = "") {
    path = floorPath(player, to, obstacles());
    arrival = after;
    going = label2;
    focusIndex = -1;
    if (!path.length && arrival) {
      const fn = arrival;
      arrival = null;
      fn();
      going = "";
    }
  }
  function approach(to, after, label2) {
    walk(to, after, label2);
    announce(say("\u8D70\u8FD1\uFF1A", "Approaching: ") + label2);
  }
  function paint(g, id, cx, bottom, maxW, maxH, alpha = 1) {
    const img = art.get(id);
    if (!img) return;
    const scale = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight), w = Math.round(img.naturalWidth * scale), h = Math.round(img.naturalHeight * scale);
    g.save();
    g.globalAlpha = alpha;
    g.imageSmoothingEnabled = false;
    g.drawImage(img, Math.round(cx - w / 2), Math.round(bottom - h), w, h);
    g.restore();
  }
  function frame(g, x, y, w, h) {
    const img = art.get("dialogue");
    if (!img) return;
    const sw = img.naturalWidth, sh = img.naturalHeight, cap = 112, dw = Math.round(cap * h / sh);
    g.drawImage(img, 0, 0, cap, sh, x, y, dw, h);
    g.drawImage(img, cap, 0, sw - cap * 2, sh, x + dw, y, w - dw * 2, h);
    g.drawImage(img, sw - cap, 0, cap, sh, x + w - dw, y, dw, h);
  }
  function label(g, text, x, y, size = 24, color = INK, paper = false, maxWidth) {
    g.save();
    g.font = `${size}px "Fusion Pixel",monospace`;
    g.textAlign = "center";
    g.textBaseline = "middle";
    if (maxWidth) while (g.measureText(text).width > maxWidth && size > 12) {
      size -= 2;
      g.font = `${size}px "Fusion Pixel",monospace`;
    }
    if (!paper) {
      g.fillStyle = "#190e20";
      g.fillText(text, Math.round(x + 2), Math.round(y + 3));
    }
    g.fillStyle = color;
    g.fillText(text, Math.round(x), Math.round(y));
    g.restore();
  }
  function hot(a) {
    actions.push(a);
    const hover = stage.hotspot({ ...a, cursor: "pointer", onClick: () => {
      a.run();
    } }) || focusIndex === actions.length - 1;
    if (hover && !active) {
      hoverLabel = a.label;
      hoverX = a.x + a.w / 2;
      hoverY = Math.max(265, a.y - 27);
    }
    return hover;
  }
  function choice(g, id, text, x, y, w, run, enabled = true, paper = false) {
    const hover = enabled && hot({ id, label: text, x: x - w / 2, y: y - 23, w, h: 46, run });
    label(g, (hover ? "\u203A " : "") + text + (hover ? " \u2039" : ""), x, y, 24, enabled ? paper ? "#39736a" : hover ? GOLD : INK : paper ? "#98745f" : "#a19aab", paper, w - 16);
  }
  function shadow(g, x, y, w) {
    g.save();
    g.globalAlpha = 0.3;
    g.fillStyle = "#190f22";
    g.beginPath();
    g.ellipse(x, y, w, 10, 0, 0, Math.PI * 2);
    g.fill();
    g.restore();
  }
  function sparkle(g, x, y, color = GOLD) {
    g.fillStyle = color;
    g.fillRect(x - 2, y - 7, 4, 14);
    g.fillRect(x - 7, y - 2, 14, 4);
  }
  function progress(g, x, y, w, value, color = MINT) {
    g.fillStyle = "#291e31";
    g.fillRect(x, y, w, 6);
    g.fillStyle = color;
    g.fillRect(x, y, Math.round(w * Math.max(0, Math.min(1, value))), 6);
  }
  function collect() {
    if (performance.now() - rewardAt < 1800) return;
    const result = collectSession(s);
    save();
    rewardAt = performance.now();
    if (!reduced) fx.coinRain(920, 450, 18, { x: 1450, y: 65 });
    sound.levelUp();
    message(`+${result.coins} \u91D1\u5E01 \xB7 ${projects[result.project].zh} \u957F\u5927\u4E86`, `+${result.coins} coins \xB7 ${projects[result.project].en} grew`, 3e3);
  }
  function startPlacement(id) {
    placing = id;
    open(null);
    message("\u9009\u62E9\u4E00\u4E2A\u53D1\u5149\u7684\u4F4D\u7F6E\uFF0C\u6446\u597D\u65B0\u5B9D\u7269\u3002", "Choose a lit spot for your treasure.", 4e3);
  }
  function placeAt(id, index) {
    if (!placePrize(s, id, index)) return;
    const spot = slots[index];
    if ((index === 3 || index === 4) && Math.hypot(player.x - spot.x, player.y - spot.y) < 70) {
      player.x = spot.x + (index === 3 ? 80 : -80);
      player.y = spot.y;
    }
    save();
    placing = null;
    sound.place();
    message("\u5B9D\u7269\u6446\u597D\u4E86\u3002\u968F\u65F6\u53EF\u4EE5\u4ECE\u6536\u85CF\u518C\u6362\u4E2A\u4F4D\u7F6E\u3002", "Placed! You can move it again from the collection.");
  }
  function pull2(count) {
    if (!pullCapsules(s, count)) return;
    save();
    revealIndex = 0;
    revealAt = performance.now();
    sound.pull();
  }
  function finishReveal() {
    s.pending = [];
    save();
    revealIndex = 0;
  }
  function drawActors(g, dt, now) {
    const dx = Number(keys.has("d") || keys.has("ArrowRight")) - Number(keys.has("a") || keys.has("ArrowLeft"));
    const dy = Number(keys.has("s") || keys.has("ArrowDown")) - Number(keys.has("w") || keys.has("ArrowUp"));
    let moving = false;
    if (!active && !placing) {
      if (dx || dy) {
        path = [];
        arrival = null;
        going = "";
        const div = Math.hypot(dx, dy);
        const nx = Math.max(350, Math.min(1310, player.x + dx / div * 300 * dt)), ny = Math.max(710, Math.min(890, player.y + dy / div * 300 * dt));
        if (!obstacles().some((o) => Math.hypot(o.x - nx, o.y - ny) < 50)) {
          player.x = nx;
          player.y = ny;
          moving = true;
        }
      } else if (path.length) {
        const target = path[0], dist = Math.hypot(target.x - player.x, target.y - player.y), step = Math.min(dist, 400 * dt);
        moving = true;
        if (dist < 1) path.shift();
        else {
          player.x += (target.x - player.x) / dist * step;
          player.y += (target.y - player.y) / dist * step;
        }
      } else if (arrival) {
        const fn = arrival;
        arrival = null;
        going = "";
        fn();
      }
    }
    if (!active) {
      pet.x += (player.x + 75 - pet.x) * Math.min(1, dt * 3);
      pet.y += (Math.min(920, player.y + 16) - pet.y) * Math.min(1, dt * 3);
    }
    const actors = [{ y: player.y, run: () => {
      shadow(g, player.x, player.y, 29);
      paint(g, "keeper" + (moving && !reduced ? Math.floor(now / 140) % 4 : 0), player.x, player.y, 93, 140);
    } }, { y: pet.y, run: () => {
      shadow(g, pet.x, pet.y, 24);
      paint(g, "lumi" + companionGrowth(totalTokens(s)).stage, pet.x, pet.y - (reduced ? 0 : Math.sin(now / 440) * 2), 86, 80);
    } }];
    actors.sort((a, b) => a.y - b.y).forEach((a) => a.run());
    if (!active && !placing) hot({ id: "lumi", label: say("\u548C\u5C0F\u5149\u6253\u62DB\u547C", "Say hello to Lumi"), x: pet.x - 45, y: pet.y - 80, w: 90, h: 93, run: () => {
      helloAt = now;
      sound.confirm();
      message("\u5C0F\u5149\uFF1A\u6211\u4E5F\u60F3\u770B\u770B\u65B0\u5B9D\u7269\uFF01", "Lumi: Let us find something lovely!");
    } });
    if (now - helloAt < 1600) sparkle(g, pet.x, pet.y - 102, MINT);
  }
  function drawRoom(g, dt, now) {
    g.drawImage(art.get("room"), 0, 0, 1600, 1e3);
    drawText(g, "TOKEN ARCADE", 819, 107, 5, GOLD, { align: "center", shadow: "#251124" });
    label(g, say("\u7075\u611F\u4E0D\u6563\u573A", "A little world of your own"), 819, 173, 24, MINT);
    paint(g, "hud", 1422, 111, 278, 90);
    label(g, String(s.coins), 1460, 68, 36, GOLD);
    drawCoin(g, 1328, 66, 21);
    label(g, say("\u6F14\u793A\u5C0F\u5C4B \xB7 \u672C\u6807\u7B7E\u9875\u4FDD\u7559", "Playtest \xB7 saved in this tab"), 1390, 128, 18);
    paint(g, "dialogue", 206, 115, 352, 102);
    paint(g, "keeper0", 82, 94, 57, 75);
    label(g, say("\u96E8\u591C\u8857\u673A\u5C0F\u5C4B", "Rainy arcade"), 233, 55, 24, GOLD);
    label(g, `${fmtCompact(totalTokens(s))} token`, 228, 88, 18);
    if (!active && !placing) hot({ id: "menu", label: say("\u83DC\u5355", "Menu"), x: 25, y: 20, w: 350, h: 100, run: () => open("menu") });
    if (!active && !placing) stage.hotspot({ id: "floor", x: 340, y: 690, w: 990, h: 215, cursor: "crosshair", onClick: () => walk(stage.mouse) });
    for (let i = 0; i < 3; i++) {
      const x = 138 + i * 151, info = levelInfo(s.tokens[i]);
      shadow(g, x, 600, 54);
      paint(g, "cab" + info.stage.index, x, 596, 140, 220 + info.stage.index * 17);
      if (!active) {
        label(g, locale === "zh" ? projects[i].zh : projects[i].en, x, 625, 18);
        label(g, `Lv.${info.level}`, x, 649, 18, info.stage.index ? MINT : INK);
        progress(g, x - 46, 666, 92, info.progress);
        if (s.favorite === i) sparkle(g, x + 61, 623, GOLD);
      }
      if (!active && !placing) hot({ id: "project-" + i, label: say("\u67E5\u770B " + projects[i].zh, "Inspect " + projects[i].en), x: x - 67, y: 348, w: 138, h: 325, run: () => approach({ x: 370 + i * 95, y: 710 }, () => {
        selected = i;
        open("cabinet");
      }, projects[i].zh) });
    }
    paint(g, "book", 558, 599, 69, 82);
    if (!active) label(g, say("\u6210\u957F\u624B\u518C", "Journal"), 565, 633, 18, GOLD);
    const ready = CHAPTERS.filter((c) => totalTokens(s) >= c.tokens && !s.claims.includes(c.id)).length;
    if (ready) sparkle(g, 598, 510);
    if (!active && !placing) hot({ id: "journal", label: ready ? say(`\u6210\u957F\u624B\u518C \xB7 ${ready} \u4EFD\u793C\u7269`, `Journal \xB7 ${ready} gifts`) : say("\u6210\u957F\u624B\u518C [J]", "Journal [J]"), x: 516, y: 506, w: 99, h: 147, run: () => approach({ x: 580, y: 710 }, () => {
      chapter = Math.max(0, CHAPTERS.findIndex((c) => !s.claims.includes(c.id)));
      open("book");
    }, say("\u624B\u518C", "journal")) });
    shadow(g, 920, 659, 79);
    paint(g, "bank", 920, 655, 218, 320);
    const bankHover = !active && !placing && hot({ id: "sync", label: say("\u540C\u6B65\u6F14\u793A\u7528\u91CF \xB7 \u6536\u83B7\u91D1\u5E01 [R]", "Collect a fictional session [R]"), x: 815, y: 333, w: 210, h: 332, run: () => approach({ x: 920, y: 715 }, collect, say("\u6536\u96C6\u7075\u611F", "collect ideas")) });
    if (!active && !bankHover) label(g, say("\u6536\u96C6\u7075\u611F", "Collect ideas"), 920, 312, 24, GOLD);
    shadow(g, 1216, 664, 82);
    paint(g, "capsule", 1216, 659, 217, 310);
    if (!active) label(g, say("\u626D\u86CB \xB7 25 \u91D1\u5E01", "Capsule \xB7 25 coins"), 1216, 698, 18, GOLD);
    if (!active && !placing) hot({ id: "capsule", label: say("\u626D\u86CB\u673A [G]", "Capsule machine [G]"), x: 1108, y: 356, w: 217, h: 315, run: () => approach({ x: 1205, y: 720 }, () => open("capsule"), say("\u626D\u86CB\u673A", "capsules")) });
    for (let i = 0; i < slots.length; i++) {
      const slot = slots[i], id = s.slots[i];
      if (id) {
        if (i === 3 || i === 4) shadow(g, slot.x, slot.y, 30);
        paint(g, id, slot.x, slot.y, slot.w, slot.h);
      }
    }
    if (!active) label(g, say(`\u5B9D\u7269 ${Object.keys(s.owned).length} / 50`, `Treasures ${Object.keys(s.owned).length} / 50`), 1465, 638, 18, GOLD);
    if (!active && !placing) hot({ id: "prizes", label: say("\u67E5\u770B\u6536\u85CF\u4E0E\u5E03\u7F6E [C]", "Collection & display [C]"), x: 1390, y: 311, w: 195, h: 350, run: () => approach({ x: 1310, y: 720 }, () => open("collection"), say("\u6536\u85CF\u67B6", "treasures")) });
    drawActors(g, dt, now);
    if (placing) {
      slots.forEach((slot, i) => {
        if (!displaySlots(placing).includes(i)) return;
        const hover = hot({ id: "slot-" + i, label: say(`\u6446\u5728\u4F4D\u7F6E ${i + 1}`, `Display spot ${i + 1}`), x: slot.x - 44, y: slot.y - 60, w: 88, h: 85, run: () => placeAt(placing, i) });
        paint(g, placing, slot.x, slot.y, slot.w, slot.h, hover ? 0.9 : 0.3);
        sparkle(g, slot.x, slot.y - slot.h - 15, MINT);
        label(g, String(i + 1), slot.x, slot.y + 17, 18, MINT);
      });
      choice(g, "cancel-place", say("\u53D6\u6D88\u6446\u653E [Esc]", "Cancel placement [Esc]"), 800, 949, 360, () => {
        placing = null;
      });
    } else if (!active) {
      const next = CHAPTERS.find((c) => !s.claims.includes(c.id));
      let cue = going ? say("\u6B63\u5728\u8D70\u8FD1\uFF1A", "Walking to: ") + going : next ? totalTokens(s) >= next.tokens ? say(`\u624B\u518C\u91CC\u6709\u4E00\u4EFD${cname(next.reward)}\uFF0C\u53EF\u4EE5\u6446\u8FDB\u5C0F\u5C4B [J]`, `A ${cname(next.reward)} is ready in your journal [J]`) : say(`\u4E0B\u4E00\u4EFD\u793C\u7269\uFF1A${cname(next.reward)} \xB7 \u8FD8\u9700 ${fmtCompact(next.tokens - totalTokens(s))} token`, `Next gift: ${cname(next.reward)} \xB7 ${fmtCompact(next.tokens - totalTokens(s))} tokens away`) : say("\u4E0B\u4E00\u6B65\uFF1A\u62BD\u4E00\u4EFD\u60CA\u559C\uFF0C\u9009\u62E9\u559C\u6B22\u7684\u4F4D\u7F6E\u5C55\u793A [G / C]", "Next: find a surprise and choose where to display it [G / C]");
      if (now < toastUntil) cue = toast2;
      label(g, cue, 800, 939, 24, now < toastUntil ? GOLD : INK, false, 1270);
      label(g, say("\u70B9\u7269\u4EF6\u8D70\u8FD1\u4E92\u52A8 \xB7 WASD \u79FB\u52A8 \xB7 J \u624B\u518C \xB7 G \u626D\u86CB \xB7 C \u6536\u85CF \xB7 R \u6536\u83B7", "Click objects to approach \xB7 WASD move \xB7 J journal \xB7 G capsules \xB7 C collection \xB7 R collect"), 800, 976, 18, "#c1a994", false, 1420);
    }
    if (saveIssue) label(g, say("\u8BD5\u73A9\u6682\u672A\u4FDD\u5B58\uFF0C\u672C\u9875\u4ECD\u53EF\u7EE7\u7EED\u3002", "Playtest could not save; this page remains playable."), 800, 213, 18, GOLD);
  }
  function drawBook(g, collection = false) {
    paint(g, "journal", 800, 818, 1140, 660);
    if (collection) {
      const item = byId[selectedPrize], owned = !!s.owned[item.id];
      label(g, say("\u6211\u7684\u6536\u85CF", "My treasures"), 548, 277, 30, DARK, true);
      paint(g, item.id, 548, 501, 185, 185, owned ? 1 : 0.22);
      label(g, cname(item.id), 548, 543, 28, DARK, true, 370);
      label(g, owned ? say(`\u5DF2\u62E5\u6709 \xD7${s.owned[item.id]}`, `Owned \xD7${s.owned[item.id]}`) : say("\u8FD8\u6CA1\u9047\u89C1\u7684\u5C0F\u60CA\u559C", "A surprise still to discover"), 548, 585, 24, "#8d543e", true, 370);
      choice(g, "display-prize", owned ? say("\u9009\u62E9\u5C55\u793A\u4F4D\u7F6E", "Choose a display spot") : say("\u53BB\u626D\u86CB\u673A\u627E\u60CA\u559C", "Find a surprise at the machine"), 548, 628, 365, () => owned ? startPlacement(item.id) : open("capsule"), true, true);
      label(g, say(`\u5B9D\u7269 ${Object.keys(s.owned).length} / 50`, `Treasures ${Object.keys(s.owned).length} / 50`), 1040, 278, 30, DARK, true);
      COLLECTIBLES.slice(collectionPage * 6, collectionPage * 6 + 6).forEach((c, i) => {
        const x = 904 + i % 3 * 128, y = 427 + Math.floor(i / 3) * 175;
        const own = !!s.owned[c.id];
        paint(g, c.id, x, y, 92, 105, own ? 1 : 0.2);
        if (c.id === selectedPrize) sparkle(g, x, y - 112, "#8d543e");
        label(g, own ? cname(c.id) : "???", x, y + 25, 18, DARK, true, 115);
        hot({ id: "collection-" + c.id, label: say("\u67E5\u770B\uFF1A", "Inspect: ") + cname(c.id), x: x - 55, y: y - 108, w: 110, h: 143, run: () => {
          selectedPrize = c.id;
        } });
      });
      choice(g, "prev-page", "<", 456, 804, 75, () => {
        collectionPage--;
      }, collectionPage > 0);
      choice(g, "next-page", ">", 1158, 804, 75, () => {
        collectionPage++;
      }, collectionPage < Math.ceil(COLLECTIBLES.length / 6) - 1);
      label(g, `${collectionPage + 1} / ${Math.ceil(COLLECTIBLES.length / 6)}`, 800, 835, 24, GOLD);
    } else {
      const c = CHAPTERS[chapter], ready = totalTokens(s) >= c.tokens, claimed = s.claims.includes(c.id);
      label(g, say("\u5C0F\u5C4B\u6210\u957F\u624B\u518C", "The arcade journal"), 548, 278, 30, DARK, true);
      label(g, locale === "zh" ? c.zh : c.en, 548, 330, 24, "#8d543e", true);
      paint(g, c.reward, 548, 536, 170, 180, ready ? 1 : 0.4);
      label(g, cname(c.reward), 548, 580, 30, DARK, true, 365);
      label(g, locale === "zh" ? c.storyZh : c.storyEn, 548, 623, 24, DARK, true, 370);
      label(g, say("\u548C\u5C0F\u5149\u4E00\u8D77\u957F\u5927", "Grow a little, together"), 1040, 284, 30, DARK, true);
      paint(g, "lumi" + companionGrowth(totalTokens(s)).stage, 1040, 458, 155, 145);
      label(g, `${fmtCompact(totalTokens(s))} / ${fmtCompact(c.tokens)} token`, 1040, 503, 24, DARK, true);
      label(g, claimed ? say("\u793C\u7269\u5DF2\u7ECF\u6536\u597D\uFF0C\u53EF\u968F\u65F6\u91CD\u65B0\u6446\u653E\u3002", "Yours to keep. Move it whenever you like.") : ready ? say("\u793C\u7269\u5230\u4E86\uFF0C\u7ED9\u5B83\u627E\u4E2A\u4F4D\u7F6E\u5427\u3002", "A gift is ready. Find it a home.") : say("\u540C\u6B65\u65B0\u7684\u7075\u611F\uFF0C\u6162\u6162\u70B9\u4EAE\u8FD9\u4E00\u9875\u3002", "New ideas will light up this page."), 1040, 552, 24, DARK, true, 365);
      choice(g, "claim-gift", claimed ? say("\u91CD\u65B0\u6446\u653E\u793C\u7269", "Move your gift") : ready ? say("\u9886\u53D6\u793C\u7269\u5E76\u6446\u653E", "Unwrap & find a spot") : say("\u56DE\u53BB\u6536\u96C6\u7075\u611F", "Back to collect ideas"), 1040, 617, 365, () => {
        if (!ready) {
          open(null);
          approach({ x: 920, y: 715 }, collect, say("\u6536\u96C6\u7075\u611F", "collect ideas"));
          return;
        }
        if (!claimed) {
          claimChapter(s, chapter);
          save();
          sound.confirm();
        }
        startPlacement(c.reward);
      }, true, true);
      choice(g, "prev-page", "<", 456, 804, 75, () => {
        chapter--;
      }, chapter > 0);
      choice(g, "next-page", ">", 1158, 804, 75, () => {
        chapter++;
      }, chapter < 2);
      label(g, `${chapter + 1} / 3`, 800, 835, 24, GOLD);
    }
    choice(g, "close", say("\u6536\u597D\u518C\u5B50 [Esc]", "Close book [Esc]"), 800, 897, 380, () => open(null));
  }
  function drawCapsule(g, now) {
    const pending = s.pending.length > 0, age = now - revealAt, ready = pending && (revealAt < 0 || reduced), r = s.pending[revealIndex];
    const shake = pending && !ready && age < 650 && !reduced ? Math.sin(now / 34) * 5 : 0;
    const unwrap = () => {
      revealAt = -1e4;
      sound.reveal(byId[r.id].rarity);
      if (!reduced) fx.burst(1040, 475, RARITIES[byId[r.id].rarity].color, 25);
    };
    paint(g, "capsule", 548 + shake, 748, 340, 500);
    if (!pending && s.coins >= 25) hot({ id: "machine-lever", label: say("\u6273\u52A8\u62C9\u6746 \xB7 25 \u91D1\u5E01", "Pull the lever \xB7 25 coins"), x: 637, y: 542, w: 65, h: 130, run: () => pull2(1) });
    label(g, say("\u5C0F\u5C0F\u60CA\u559C\uFF0C\u6162\u6162\u6536\u85CF", "Little surprises to keep"), 1040, 314, 30, GOLD);
    if (ready) {
      paint(g, r.id, 1040, 577, 205, 200);
      label(g, cname(r.id), 1040, 620, 30, RARITIES[byId[r.id].rarity].color, false, 500);
      label(g, r.duplicate ? say(`\u53C8\u9047\u89C1\u4E86 \xB7 +${r.dust} \u661F\u5C18`, `A familiar friend \xB7 +${r.dust} dust`) : say("\u65B0\u6536\u85CF\uFF01", "A new treasure!"), 1040, 670, 24, r.duplicate ? INK : MINT);
    } else {
      paint(g, "ball", 1040, 566, 180, 185);
      label(g, pending ? say("\u70B9\u5F00\u80F6\u56CA\uFF0C\u5C0F\u5149\u4E5F\u5728\u7B49\uFF01", "Open the capsule. Lumi is waiting!") : say("\u6273\u52A8\u62C9\u6746\uFF0C\u770B\u770B\u4F1A\u9047\u89C1\u8C01\u3002", "Pull the lever. Who will you meet?"), 1040, 631, 24, INK, false, 500);
      if (pending) hot({ id: "open-capsule", label: say("\u70B9\u5F00\u80F6\u56CA", "Open the capsule"), x: 950, y: 365, w: 180, h: 210, run: unwrap });
      label(g, say(`\u5DF2\u6536\u96C6 ${Object.keys(s.owned).length} / 50`, `Collected ${Object.keys(s.owned).length} / 50`), 1040, 678, 24, MINT);
    }
    frame(g, 190, 758, 1220, 205);
    if (pending) {
      if (!ready) choice(g, "skip-reveal", say("\u6253\u5F00\u80F6\u56CA", "Open capsule"), 800, 856, 360, unwrap);
      else {
        choice(g, "display-result", say("\u6446\u8FDB\u5C0F\u5C4B", "Display it"), 455, 851, 270, () => {
          const id = r.id;
          finishReveal();
          startPlacement(id);
        });
        if (revealIndex < s.pending.length - 1) choice(g, "next-result", say(`\u4E0B\u4E00\u4EF6 ${revealIndex + 1}/${s.pending.length}`, `Next ${revealIndex + 1}/${s.pending.length}`), 800, 851, 300, () => {
          revealIndex++;
          sound.confirm();
        });
        else choice(g, "again", say("\u518D\u62BD\u4E00\u6B21 \xB7 25", "Another pull \xB7 25"), 800, 851, 310, () => {
          finishReveal();
          pull2(1);
        }, s.coins >= 25);
        choice(g, "keep-result", say("\u6536\u597D\u5168\u90E8", "Keep them all"), 1150, 851, 250, () => {
          selectedPrize = r.id;
          finishReveal();
        });
        label(g, saveIssue ? say("\u5956\u52B1\u5DF2\u7559\u5728\u672C\u9875\uFF0C\u6682\u65F6\u65E0\u6CD5\u4FDD\u5B58\u3002", "Rewards are on this page, but saving is unavailable.") : say("\u5956\u54C1\u5DF2\u6536\u597D\uFF0C\u5173\u95ED\u754C\u9762\u6216\u5237\u65B0\u4E5F\u4E0D\u4F1A\u4E22\u5931\u3002", "Rewards are saved when you close this view or refresh."), 800, 910, 18, MINT);
      }
    } else {
      choice(g, "pull-one", say("\u626D\u4E00\u6B21 \xB7 25", "Pull one \xB7 25"), 455, 825, 300, () => pull2(1), s.coins >= 25);
      choice(g, "pull-ten", say("\u626D\u5341\u6B21 \xB7 225", "Pull ten \xB7 225"), 800, 825, 310, () => pull2(10), s.coins >= 225);
      choice(g, "close", say("\u56DE\u5C0F\u5C4B [Esc]", "Back [Esc]"), 1150, 825, 260, () => open(null));
      if (s.coins < 25) choice(g, "more-coins", say(`\u8FD8\u5DEE ${25 - s.coins} \u5E01 \xB7 \u56DE\u53BB\u6536\u96C6\u7075\u611F`, `Need ${25 - s.coins} coins \xB7 collect ideas`), 800, 900, 650, () => {
        open(null);
        approach({ x: 920, y: 715 }, collect, say("\u6536\u96C6\u7075\u611F", "collect ideas"));
      });
      else label(g, say(`\u661F\u5C18 ${s.dust} / 120 \xB7 \u91CD\u590D\u5956\u52B1\u53EF\u6362\u672A\u62E5\u6709\u7684\u5B9D\u7269`, `Dust ${s.dust} / 120 \xB7 duplicates help find a missing prize`), 800, 900, 18, INK);
      if (s.dust >= 120) choice(g, "exchange", say("120 \u661F\u5C18\u6362\u672A\u62E5\u6709\u5B9D\u7269", "120 dust for a missing prize"), 800, 943, 600, () => {
        if (exchangeMissing(s)) {
          save();
          revealIndex = 0;
          revealAt = now;
        }
      });
    }
  }
  function drawDialog(g, now) {
    if (!active) return;
    g.fillStyle = "rgba(16,9,26,.7)";
    g.fillRect(0, 0, 1600, 1e3);
    if (active === "book" || active === "collection") drawBook(g, active === "collection");
    else if (active === "capsule") drawCapsule(g, now);
    else if (active === "cabinet") {
      const info = levelInfo(s.tokens[selected]);
      paint(g, "cab" + info.stage.index, 556, 753, 335, 495);
      frame(g, 760, 350, 650, 290);
      label(g, locale === "zh" ? projects[selected].zh : projects[selected].en, 1080, 420, 36, GOLD);
      label(g, `Lv.${info.level} \xB7 ${fmtCompact(s.tokens[selected])} token`, 1080, 478, 24, MINT);
      label(g, say(`\u4E0B\u4E00\u7EA7\u8FD8\u9700 ${fmtCompact(info.toNext)} token`, `Next level in ${fmtCompact(info.toNext)} tokens`), 1080, 530, 24);
      choice(g, "favorite", s.favorite === selected ? say("\u8FD9\u662F\u6211\u7684\u5FC3\u7231\u673A\u53F0", "Your favorite cabinet") : say("\u8BBE\u4E3A\u5FC3\u7231\u673A\u53F0", "Make this my favorite"), 1080, 585, 470, () => {
        s.favorite = selected;
        save();
        sound.confirm();
      });
      frame(g, 190, 758, 1220, 205);
      label(g, say("\u4E0B\u4E00\u6B21\u6536\u83B7\uFF0C\u4F1A\u7EE7\u7EED\u70B9\u4EAE\u8FD9\u91CC\u3002", "The next harvest brings more light here."), 800, 832, 24);
      choice(g, "close", say("\u56DE\u5230\u5C0F\u5C4B [Esc]", "Back to the room [Esc]"), 800, 901, 450, () => open(null));
    } else {
      frame(g, 285, 365, 1030, 410);
      label(g, say("\u96E8\u591C\u5C0F\u5C4B \xB7 \u4E92\u52A8\u8BD5\u73A9", "Rainy arcade \xB7 interaction playtest"), 800, 439, 30, GOLD);
      label(g, say("\u865A\u6784\u7528\u91CF\u4E0E\u5956\u52B1\uFF0C\u4EC5\u4FDD\u7559\u5728\u5F53\u524D\u6807\u7B7E\u9875\u3002", "Fictional usage and rewards, kept in this browser tab."), 800, 494, 24, INK, false, 850);
      choice(g, "lang", locale === "zh" ? "English / \u4E2D\u6587" : "\u4E2D\u6587 / English", 800, 550, 500, () => {
        locale = locale === "zh" ? "en" : "zh";
        setLocale(locale === "zh" ? "zh-CN" : "en");
      });
      choice(g, "mute", muted2 ? say("\u58F0\u97F3\uFF1A\u5173", "Sound: off") : say("\u58F0\u97F3\uFF1A\u5F00", "Sound: on"), 800, 602, 400, () => {
        muted2 = !muted2;
        sound.setMuted(muted2);
      });
      choice(g, "close", say("\u56DE\u5230\u5C0F\u5C4B [Esc]", "Back to the room [Esc]"), 800, 673, 450, () => open(null));
    }
  }
  var signature = "";
  function updateSemantic() {
    const summary = say(`\u96E8\u591C\u5C0F\u5C4B\u3002${s.coins} \u91D1\u5E01\uFF0C${Object.keys(s.owned).length} \u4EF6\u6536\u85CF\u3002`, `Rainy arcade. ${s.coins} coins, ${Object.keys(s.owned).length} treasures.`);
    if (canvas.getAttribute("aria-label") !== summary) canvas.setAttribute("aria-label", summary);
    const next = actions.map((a) => a.id + ":" + a.label).join("|");
    if (next === signature) return;
    signature = next;
    semantic.replaceChildren(...actions.map((a) => {
      const b = document.createElement("button");
      b.textContent = a.label;
      b.dataset.action = a.id;
      b.onclick = () => a.run();
      return b;
    }));
  }
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      placing = null;
      open(null);
      return;
    }
    if (e.key === "Tab" && document.activeElement === canvas) {
      const next = focusIndex + (e.shiftKey ? -1 : 1);
      if (next < 0 || next >= actions.length) {
        focusIndex = -1;
        return;
      }
      e.preventDefault();
      focusIndex = next;
      announce(actions[focusIndex]?.label ?? "");
      return;
    }
    if (e.target instanceof HTMLElement && e.target.tagName === "BUTTON") return;
    if (e.key === "Enter" || e.key.toLowerCase() === "e") {
      if (focusIndex >= 0) {
        e.preventDefault();
        actions[focusIndex]?.run();
        focusIndex = -1;
      }
      return;
    }
    if (active || placing) return;
    const k = e.key.toLowerCase();
    if (["j", "g", "c", "r"].includes(k)) {
      e.preventDefault();
      sound.resume();
      if (k === "j") open("book");
      else if (k === "g") open("capsule");
      else if (k === "c") open("collection");
      else {
        open(null);
        collect();
      }
      return;
    }
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "w", "a", "s", "d"].includes(e.key)) {
      e.preventDefault();
      keys.add(e.key);
    }
  });
  window.addEventListener("keyup", (e) => keys.delete(e.key));
  window.addEventListener("blur", () => keys.clear());
  canvas.addEventListener("pointerdown", () => {
    canvas.focus({ preventScroll: true });
    sound.resume();
  });
  async function launch() {
    const boot = document.querySelector("#preview-boot");
    let done = 0;
    const results = await Promise.allSettled(Object.entries(files).map(([id, url]) => new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        art.set(id, img);
        boot.textContent = `\u5C0F\u5C4B\u70B9\u706F\u4E2D ${++done}/${Object.keys(files).length}`;
        resolve();
      };
      img.onerror = () => reject(new Error(url));
      img.src = url;
    })));
    const font = new FontFace("Fusion Pixel", "url(./assets/fonts/fusion-pixel-12px-zh_hans.woff2)");
    try {
      await font.load();
      document.fonts.add(font);
    } catch {
      announce("Pixel font unavailable");
    }
    if (!art.has("room")) {
      boot.textContent = "\u5C0F\u5C4B\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5\u3002";
      return;
    }
    if (results.some((r) => r.status === "rejected")) announce("\u90E8\u5206\u8BD5\u73A9\u7D20\u6750\u672A\u52A0\u8F7D");
    let ready = false;
    stage.start((g, dt, now) => {
      actions = [];
      hoverLabel = "";
      fx.update(dt);
      drawRoom(g, dt, now);
      if (active) {
        actions = [];
        stage.hotspot({ id: "modal-block", x: 0, y: 0, w: 1600, h: 1e3, onClick: () => {
        } });
        drawDialog(g, now);
      } else if (hoverLabel && !placing) label(g, hoverLabel, Math.min(1380, Math.max(220, hoverX)), hoverY, 24, GOLD, false, 560);
      if (focusIndex >= actions.length) focusIndex = -1;
      updateSemantic();
      fx.draw(g, 1600);
      if (!ready) {
        ready = true;
        boot.remove();
        canvas.focus({ preventScroll: true });
      }
    });
  }
  Object.defineProperty(window, "cozyPreview", { value: Object.freeze({ snapshot: () => ({ coins: s.coins, petStage: companionGrowth(totalTokens(s)).stage, collectionCount: Object.keys(s.owned).length, dialog: active, locale, player: { ...player }, pet: { ...pet }, placing, going, progress: JSON.parse(JSON.stringify(s)) }) }) });
  void launch();
})();
//# sourceMappingURL=cozy.js.map
