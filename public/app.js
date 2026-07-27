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
    start(frame) {
      if (this.rafId !== null) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }
      this.frameFn = frame;
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
      const rect2 = this.canvas.getBoundingClientRect();
      const cssX = clientX - rect2.left;
      const cssY = clientY - rect2.top;
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

  // src/domain/economy.ts
  var CONFIG = {
    TOKENS_PER_COIN: 1e4,
    // 10,000 tokens = 1 coin (Economy V2, MVP audit)
    PULL_COST: 25,
    PULL10_COST: 225,
    COINS_PER_TICKET: 50
    // bonus ticket per N coins minted in one sync
  };
  function playerLevelFor(coinsEarned) {
    let lvl = 1;
    let need = 120;
    let acc = 0;
    while (coinsEarned >= acc + need) {
      acc += need;
      lvl++;
      need = Math.round(need * 1.3);
    }
    return { level: lvl, into: coinsEarned - acc, need };
  }
  function fmtCompact(n) {
    n = Math.floor(n || 0);
    const abs = Math.abs(n);
    if (abs < 1e3) return String(n);
    if (abs < 1e6) return abs < 1e4 ? (n / 1e3).toFixed(1) + "K" : Math.round(n / 1e3) + "K";
    if (abs < 1e9) return abs < 1e7 ? (n / 1e6).toFixed(2) + "M" : Math.round(n / 1e6) + "M";
    return (n / 1e9).toFixed(2) + "B";
  }
  function fmtComma(n) {
    return Math.floor(n || 0).toLocaleString("en-US");
  }
  function baseCoinsFor(tokens) {
    return Math.floor((Number(tokens) || 0) / CONFIG.TOKENS_PER_COIN);
  }
  function tokensToCoins(residue, newTokens) {
    const pool = (residue || 0) + Math.max(0, newTokens || 0);
    const coins2 = Math.floor(pool / CONFIG.TOKENS_PER_COIN);
    return { coins: coins2, residue: pool % CONFIG.TOKENS_PER_COIN };
  }

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
    for (const s of STAGES) if (lvl >= s.loLevel && lvl <= s.hiLevel) return s;
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
    const progress = Math.max(0, Math.min(1, (tokens - base) / (next - base)));
    return { level, stage: stage2, base, next, progress, toNext: Math.max(0, next - tokens), isMax: false, multiplier };
  }

  // src/domain/sync.ts
  function computeSync(slice, totals) {
    const projects = slice.projects.map((p) => ({ ...p }));
    const lastTotals = { ...slice.lastTotals };
    const byId2 = new Map(projects.map((p) => [p.id, p]));
    const perProject = [];
    const levelUps = [];
    let newTokensTotal = 0;
    let effectiveNewTotal = 0;
    for (const t2 of totals) {
      if (t2.legacyId && t2.legacyId !== t2.id && !(t2.id in lastTotals) && t2.legacyId in lastTotals) {
        lastTotals[t2.id] = lastTotals[t2.legacyId];
        delete lastTotals[t2.legacyId];
        const legacyProj = byId2.get(t2.legacyId);
        if (legacyProj && !byId2.has(t2.id)) {
          legacyProj.id = t2.id;
          byId2.delete(t2.legacyId);
          byId2.set(t2.id, legacyProj);
        }
      }
      const prevTotal = lastTotals[t2.id] || 0;
      const gained = Math.max(0, t2.tokens - prevTotal);
      const existing = byId2.get(t2.id);
      const oldLevel = existing ? existing.level : 0;
      const mono = Math.max(existing ? existing.tokens : 0, t2.tokens);
      const newLevel = levelFor(mono);
      const proj = existing || { id: t2.id, name: t2.name, provider: t2.provider, tokens: mono, level: newLevel, coins: 0 };
      proj.name = t2.name;
      proj.provider = t2.provider;
      proj.tokens = mono;
      proj.level = newLevel;
      proj.coins = baseCoinsFor(mono);
      proj.lastGained = gained;
      if (!existing) {
        projects.push(proj);
        byId2.set(t2.id, proj);
      }
      lastTotals[t2.id] = t2.tokens;
      if (gained > 0 || !existing) {
        perProject.push({
          id: t2.id,
          name: t2.name,
          provider: t2.provider,
          gained,
          level: newLevel,
          isNew: !existing,
          leveledTo: newLevel > oldLevel && oldLevel > 0 ? newLevel : null
        });
      }
      if (newLevel > oldLevel && oldLevel > 0) {
        const oldStage = stageForLevel(oldLevel);
        const newStage = stageForLevel(newLevel);
        levelUps.push({
          id: t2.id,
          name: t2.name,
          from: oldLevel,
          to: newLevel,
          stageTo: newStage.index > oldStage.index ? newStage.name : null
        });
      }
      newTokensTotal += gained;
      const multLevel = oldLevel > 0 ? oldLevel : 1;
      effectiveNewTotal += Math.round(gained * coinMultiplier(multLevel));
    }
    for (const id of Object.keys(lastTotals)) {
      if (!byId2.has(id)) delete lastTotals[id];
    }
    const { coins: coins2, residue } = tokensToCoins(slice.coinResidue, effectiveNewTotal);
    projects.sort((a, b) => b.tokens - a.tokens);
    return {
      projects,
      lastTotals,
      coinResidue: residue,
      coinsMinted: coins2,
      ticketsAwarded: Math.floor(coins2 / CONFIG.COINS_PER_TICKET),
      newTokens: newTokensTotal,
      lifetimeTokens: projects.reduce((s, p) => s + p.tokens, 0),
      perProject: perProject.sort((a, b) => b.gained - a.gained),
      levelUps
    };
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

  // src/content/shop.ts
  var SHOP = [
    { id: "pull1", label: "Pull", sub: "Capsule \xD71", cost: 25, kind: "capsule", pulls: 1, sprite: "capsule" },
    { id: "pull10", label: "Pull", sub: "Capsule \xD710", cost: 225, kind: "capsule", pulls: 10, sprite: "capsule" },
    { id: "sign", label: "Neon Sign", sub: "Unlock a sign", cost: 250, kind: "grant", pick: "sign", sprite: "ggSign" },
    { id: "frame", label: "Profile Frame", sub: "Unlock a frame", cost: 600, kind: "grant", pick: "frame", sprite: "frame" },
    { id: "theme", label: "Room Theme", sub: "Unlock a theme", cost: 1500, kind: "grant", pick: "theme", sprite: "sunsetTheme" },
    { id: "trophy", label: "Trophy Card", sub: "Unlock a trophy", cost: 3e3, kind: "grant", pick: "trophy", sprite: "trophy" }
  ];

  // src/content/achievements.ts
  var ACHIEVEMENTS = [
    { id: "first_coin", name: "First Coin", desc: "Mint your first coin", sprite: "goldCoin", check: (s) => s.stats.coinsEarned >= 1 },
    { id: "warm_machine", name: "Warm Machine", desc: "Spend 10K tokens", sprite: "tokenChip", check: (s) => s.stats.lifetimeTokens >= 1e4 },
    { id: "neon_night", name: "Neon Night", desc: "Spend 100K tokens", sprite: "starBadge", check: (s) => s.stats.lifetimeTokens >= 1e5 },
    { id: "million", name: "Million Token Club", desc: "Spend 1M tokens", sprite: "trophy", check: (s) => s.stats.lifetimeTokens >= 1e6 },
    { id: "royalty", name: "Cabinet Royalty", desc: "A cabinet reaches Lv20", sprite: "neonCrown", check: (s) => s.projects.some((p) => p.level >= 20) },
    { id: "first_pull", name: "First Pull", desc: "Use the capsule machine", sprite: "gem", check: (s) => s.stats.pulls >= 1 },
    { id: "wall_starter", name: "Prize Wall Starter", desc: "Unlock 10 collectibles", sprite: "ggSign", check: (s) => Object.keys(s.owned).length >= 10 },
    { id: "dupe_luck", name: "Duplicate Luck", desc: "Receive 5 duplicates", sprite: "luckyCat", check: (s) => s.stats.duplicates >= 5 },
    { id: "legendary_drop", name: "Legendary Drop", desc: "Unlock a legendary", sprite: "legendaryTrophy", check: (s) => COLLECTIBLES.some((c) => c.rarity === "legendary" && Boolean(s.owned[c.id])) }
  ];

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
  function pickGrant(type, owned2, rng = Math.random) {
    const pool = COLLECTIBLES.filter((c) => c.type === type);
    const fresh = pool.filter((c) => !owned2[c.id]);
    const src = fresh.length ? fresh : pool;
    return src[Math.floor(rng() * src.length)];
  }

  // src/domain/collection.ts
  var MISSING_PRIZE_DUST_COST = 120;
  var COLLECTION_MILESTONES = [
    {
      id: "neon-shelf",
      tier: 1,
      threshold: 10,
      nameKey: "collection.milestone.10.name",
      descKey: "collection.milestone.10.desc"
    },
    {
      id: "prize-lights",
      tier: 2,
      threshold: 25,
      nameKey: "collection.milestone.25.name",
      descKey: "collection.milestone.25.desc"
    },
    {
      id: "collector-pedestal",
      tier: 3,
      threshold: 40,
      nameKey: "collection.milestone.40.name",
      descKey: "collection.milestone.40.desc"
    },
    {
      id: "crown-marquee",
      tier: 4,
      threshold: 50,
      nameKey: "collection.milestone.50.name",
      descKey: "collection.milestone.50.desc"
    }
  ];
  var VALID_IDS = new Set(COLLECTIBLES.map((collectible) => collectible.id));
  function validOwnedCount(owned2) {
    let count = 0;
    for (const [id, entry] of Object.entries(owned2)) {
      if (VALID_IDS.has(id) && entry.count > 0) count++;
    }
    return count;
  }
  function missingCollectibles(owned2) {
    return COLLECTIBLES.filter((collectible) => (owned2[collectible.id]?.count ?? 0) <= 0);
  }
  function earnedCollectionMilestones(uniqueCount) {
    return COLLECTION_MILESTONES.filter((milestone) => uniqueCount >= milestone.threshold);
  }
  function collectionMilestoneTier(uniqueCount) {
    const earned = earnedCollectionMilestones(uniqueCount);
    return earned.length ? earned[earned.length - 1].tier : 0;
  }
  function nextCollectionMilestone(uniqueCount) {
    const milestone = COLLECTION_MILESTONES.find((candidate) => candidate.threshold > uniqueCount);
    return milestone ? { milestone, remaining: milestone.threshold - uniqueCount } : null;
  }
  function crossedCollectionMilestones(before, after) {
    if (after <= before) return [];
    return COLLECTION_MILESTONES.filter(
      (milestone) => before < milestone.threshold && after >= milestone.threshold
    );
  }

  // src/domain/cosmetics.ts
  var ROOM_THEME_IDS = ["e_sunset", "l_forest"];
  var PROFILE_FRAME_IDS = ["r_frame"];
  function isRoomThemeId(id) {
    return id === "base" || ROOM_THEME_IDS.includes(id);
  }
  function isProfileFrameId(id) {
    return id === "base" || PROFILE_FRAME_IDS.includes(id);
  }
  function isP1CosmeticType(type) {
    return type === "theme" || type === "frame";
  }

  // src/domain/roomDisplay.ts
  var ROOM_DISPLAY_CATEGORIES = [
    "sign",
    "buddy",
    "decor",
    "trophy",
    "badge"
  ];
  var CATEGORY_SET = new Set(ROOM_DISPLAY_CATEGORIES);
  function isRoomDisplayCategory(type) {
    return CATEGORY_SET.has(type);
  }
  function unlockedAt(firstUnlocked) {
    if (typeof firstUnlocked !== "string" || firstUnlocked.trim() === "") {
      return Number.NEGATIVE_INFINITY;
    }
    const timestamp = Date.parse(firstUnlocked);
    return Number.isFinite(timestamp) ? timestamp : Number.NEGATIVE_INFINITY;
  }
  function selectRoomDisplays(owned2) {
    const selected = /* @__PURE__ */ new Map();
    for (const collectible of COLLECTIBLES) {
      if (!isRoomDisplayCategory(collectible.type)) continue;
      const entry = owned2[collectible.id];
      if (!entry || typeof entry.count !== "number" || !Number.isFinite(entry.count) || entry.count <= 0) {
        continue;
      }
      const candidate = {
        category: collectible.type,
        collectible,
        unlockedAt: unlockedAt(entry.firstUnlocked)
      };
      const current2 = selected.get(collectible.type);
      if (!current2 || candidate.unlockedAt > current2.unlockedAt) {
        selected.set(collectible.type, candidate);
      }
    }
    return ROOM_DISPLAY_CATEGORIES.flatMap((category) => {
      const match = selected.get(category);
      return match ? [{ category: match.category, collectible: match.collectible }] : [];
    });
  }

  // src/domain/roomDecorations.ts
  var TYPE_ZONE = {
    sign: "wall",
    badge: "wall",
    decor: "floor",
    trophy: "floor",
    buddy: "buddy"
  };
  var ROOM_DECORATION_CAPACITY = {
    wall: 4,
    floor: 4,
    buddy: 2
  };
  var AUTO_POSITIONS = {
    sign: { x: 0.3, y: 0.25 },
    badge: { x: 0.7, y: 0.75 },
    decor: { x: 0.25, y: 0.5 },
    trophy: { x: 0.75, y: 0.5 },
    buddy: { x: 0.5, y: 0.5 },
    frame: { x: 0.5, y: 0.5 },
    theme: { x: 0.5, y: 0.5 }
  };
  function owned(ownedMap, id) {
    const count = ownedMap[id]?.count;
    return typeof count === "number" && Number.isFinite(count) && count > 0;
  }
  function clamp01(value) {
    return Math.max(0, Math.min(1, value));
  }
  function alignRoomDecorationCoord(value) {
    return Math.round(clamp01(value) * 40) / 40;
  }
  var align = alignRoomDecorationCoord;
  function roomDecorationZoneFor(type) {
    return TYPE_ZONE[type] ?? null;
  }
  function roomDecorationCollectibles(ownedMap) {
    return COLLECTIBLES.filter((collectible) => roomDecorationZoneFor(collectible.type) && owned(ownedMap, collectible.id));
  }
  function autoArrangeRoomDecorations(ownedMap) {
    return selectRoomDisplays(ownedMap).flatMap(({ collectible }) => {
      const zone = roomDecorationZoneFor(collectible.type);
      if (!zone) return [];
      const point = AUTO_POSITIONS[collectible.type];
      return [{ collectibleId: collectible.id, zone, x: point.x, y: point.y }];
    });
  }
  function sanitizeRoomDecorations(ownedMap, placements) {
    if (placements == null) return null;
    const seen = /* @__PURE__ */ new Set();
    const used = { wall: 0, floor: 0, buddy: 0 };
    const clean = [];
    for (const placement of placements) {
      if (!placement || typeof placement.collectibleId !== "string") continue;
      const collectible = byId[placement.collectibleId];
      if (!collectible || !owned(ownedMap, collectible.id) || seen.has(collectible.id)) continue;
      const zone = roomDecorationZoneFor(collectible.type);
      if (!zone || placement.zone !== zone || used[zone] >= ROOM_DECORATION_CAPACITY[zone]) continue;
      if (!Number.isFinite(placement.x) || !Number.isFinite(placement.y)) continue;
      clean.push({
        collectibleId: collectible.id,
        zone,
        x: align(placement.x),
        y: align(placement.y)
      });
      seen.add(collectible.id);
      used[zone]++;
    }
    return clean;
  }
  function resolveRoomDecorations(ownedMap, placements) {
    return placements == null ? autoArrangeRoomDecorations(ownedMap) : sanitizeRoomDecorations(ownedMap, placements) ?? [];
  }

  // src/data/liveSource.ts
  async function fetchLive() {
    try {
      const res = await fetch("/api/usage", { cache: "no-store" });
      const data = await res.json();
      const projects = (data.projects || []).map((p) => ({
        id: p.id || p.name,
        name: p.name,
        provider: p.provider || "claude",
        tokens: Math.max(0, Math.floor(p.tokens || 0)),
        ...p.legacyId ? { legacyId: p.legacyId } : {}
      }));
      return { source: data.source, projects, totals: data.totals };
    } catch (e) {
      return { source: "error", projects: [], error: String(e) };
    }
  }

  // src/data/mockSource.ts
  var NAME_POOL = ["neon-forge", "byte-bazaar", "quest-engine", "moss-garden", "star-router", "pixel-press", "echo-lab", "tidepool"];
  function seedMock() {
    return {
      projects: [
        { id: "claude-shop", name: "claude-shop", provider: "claude", tokens: 512e3 },
        { id: "pixel-deploy", name: "pixel-deploy", provider: "codex", tokens: 31e4 },
        { id: "codex-lab", name: "codex-lab", provider: "codex", tokens: 245e3 },
        { id: "sidequest", name: "sidequest", provider: "claude", tokens: 18e4 },
        { id: "data-desk", name: "data-desk", provider: "gemini", tokens: 96e3 },
        { id: "story-lab", name: "story-lab", provider: "claude", tokens: 42e3 }
      ]
    };
  }
  function advanceMock(world) {
    if (!world || !world.projects) world = seedMock();
    const ps = world.projects;
    const bumps = 1 + Math.floor(Math.random() * 3);
    for (let i = 0; i < bumps; i++) {
      const p = ps[Math.floor(Math.random() * ps.length)];
      const gain = Math.floor(4e3 + Math.pow(Math.random(), 2) * 14e4);
      p.tokens += gain;
    }
    if (Math.random() < 0.18 && ps.length < 9) {
      const used = new Set(ps.map((p) => p.id));
      const name = NAME_POOL.find((n) => !used.has(n));
      if (name) {
        ps.push({
          id: name,
          name,
          provider: ["claude", "codex", "gemini"][Math.floor(Math.random() * 3)],
          tokens: Math.floor(6e3 + Math.random() * 4e4)
        });
      }
    }
    return world;
  }

  // src/core/types.ts
  var SAVE_VERSION = 2;

  // src/state/persistence.ts
  var STORAGE_KEY = "tokenArcade.v1";
  var SLOT_KEYS = {
    live: "tokenArcade.slot.live.v1",
    demo: "tokenArcade.slot.demo.v1"
  };
  var META_KEY = "tokenArcade.meta.v1";
  function migrateV1toV2(s) {
    const coins2 = Math.floor((s.stats?.lifetimeTokens || 0) / CONFIG.TOKENS_PER_COIN);
    return {
      ...s,
      version: SAVE_VERSION,
      coins: coins2,
      coinResidue: 0,
      stats: { ...s.stats, coinsEarned: coins2 }
    };
  }
  function repairProjectCoins(s) {
    const projects = s.projects;
    if (!Array.isArray(projects)) return s;
    for (const p of projects) {
      if (p && typeof p === "object") {
        const proj = p;
        proj.coins = baseCoinsFor(proj.tokens);
      }
    }
    return s;
  }
  function parseBlob(raw) {
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed.version !== "number") return null;
      if (parsed.version === SAVE_VERSION) return repairProjectCoins(parsed);
      if (parsed.version === 1) return repairProjectCoins(migrateV1toV2(parsed));
      return null;
    } catch {
      return null;
    }
  }
  function getItem(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }
  function peekLegacyMode() {
    const legacy = parseBlob(getItem(STORAGE_KEY));
    return legacy ? legacy.mode === "demo" ? "demo" : "live" : null;
  }
  function loadState(mode) {
    const slot = parseBlob(getItem(SLOT_KEYS[mode]));
    if (slot) return slot;
    const legacy = parseBlob(getItem(STORAGE_KEY));
    if (legacy && (legacy.mode === "demo" ? "demo" : "live") === mode) {
      saveState(mode, legacy);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
      }
      return legacy;
    }
    return null;
  }
  function saveState(mode, state) {
    try {
      localStorage.setItem(SLOT_KEYS[mode], JSON.stringify(state));
    } catch {
    }
  }
  function clearState(mode) {
    try {
      localStorage.removeItem(SLOT_KEYS[mode]);
    } catch {
    }
  }
  function loadMeta() {
    try {
      const raw = localStorage.getItem(META_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || parsed.lastMode !== "live" && parsed.lastMode !== "demo") return null;
      return parsed;
    } catch {
      return null;
    }
  }
  function saveMeta(meta) {
    try {
      localStorage.setItem(META_KEY, JSON.stringify(meta));
    } catch {
    }
  }
  function onExternalSaveChange(cb) {
    if (typeof window === "undefined" || typeof window.addEventListener !== "function") return;
    window.addEventListener("storage", (e) => {
      if (e.key === SLOT_KEYS.live) cb("live");
      else if (e.key === SLOT_KEYS.demo) cb("demo");
    });
  }

  // src/i18n/index.ts
  var current = "en";
  var listeners = /* @__PURE__ */ new Set();
  function getLocale() {
    return current;
  }
  function setLocale(l) {
    if (l !== current) {
      current = l;
      listeners.forEach((cb) => cb());
    }
  }
  function detectLocale() {
    const nav = typeof navigator !== "undefined" ? navigator.language || "" : "";
    return nav.toLowerCase().startsWith("zh") ? "zh-CN" : "en";
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
  var RARITY_ZH = {
    common: "\u666E\u901A",
    uncommon: "\u7A00\u6709",
    rare: "\u7F55\u89C1",
    epic: "\u53F2\u8BD7",
    legendary: "\u4F20\u8BF4"
  };
  var TYPE_ZH = {
    badge: "\u5FBD\u7AE0",
    sign: "\u62DB\u724C",
    decor: "\u88C5\u9970",
    buddy: "\u4F19\u4F34",
    frame: "\u76F8\u6846",
    trophy: "\u5956\u676F",
    theme: "\u4E3B\u9898"
  };
  var ACH_ZH = {
    first_coin: { name: "\u7B2C\u4E00\u679A\u91D1\u5E01", desc: "\u7B2C\u4E00\u679A\u91D1\u5E01\u5165\u888B\uFF0C\u6A21\u578B\u70ED\u91CF\u5F00\u94F8\u3002" },
    warm_machine: { name: "\u673A\u53F0\u9884\u70ED", desc: "10K tokens \u5165\u7089\uFF0C\u673A\u53F0\u5F00\u59CB\u53D1\u5149\u3002" },
    neon_night: { name: "\u9713\u8679\u4E4B\u591C", desc: "100K tokens \u70B9\u4EAE\u6574\u95F4\u8857\u673A\u5385\u3002" },
    million: { name: "\u767E\u4E07 Token \u4FF1\u4E50\u90E8", desc: "1M tokens \u5165\u8D26\uFF0C\u6B63\u5F0F\u52A0\u5165\u5927\u73A9\u5BB6\u5E2D\u4F4D\u3002" },
    royalty: { name: "\u673A\u53F0\u738B\u8005", desc: "\u4EFB\u610F\u673A\u53F0\u51B2\u5230 Lv20\uFF0C\u9547\u5E97\u4E4B\u5B9D\u8BDE\u751F\u3002" },
    first_pull: { name: "\u7B2C\u4E00\u6B21\u62BD\u53D6", desc: "\u7B2C\u4E00\u6B21\u62C9\u4E0B\u626D\u86CB\u673A\u62C9\u6746\uFF0C\u547D\u8FD0\u5F00\u8F6C\u3002" },
    wall_starter: { name: "\u5C55\u793A\u67DC\u5165\u95E8", desc: "10 \u4EF6\u6536\u85CF\u54C1\u4E0A\u5899\uFF0C\u7A7A\u67DC\u5B50\u6709\u6545\u4E8B\u4E86\u3002" },
    dupe_luck: { name: "\u91CD\u590D\u4E5F\u662F\u8FD0\u6C14", desc: "5 \u6B21\u91CD\u590D\u4E5F\u4E0D\u4E8F\uFF0C\u4F59\u6599\u90FD\u662F\u8D44\u6E90\u3002" },
    legendary_drop: { name: "\u4F20\u8BF4\u6389\u843D", desc: "\u4F20\u8BF4\u7269\u54C1\u51FA\u4ED3\uFF0C\u503C\u5F97\u505C\u4E0B\u6765\u770B\u4E00\u773C\u3002" }
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
  function t(key, params2) {
    const entry = UI[key];
    let s = entry ? entry[current] ?? entry.en : key;
    if (params2) {
      for (const k in params2) s = s.split("{" + k + "}").join(String(params2[k]));
    }
    return s;
  }
  function tRarity(key) {
    return current === "zh-CN" ? RARITY_ZH[key] : RARITIES[key].label;
  }
  function tType(type) {
    return current === "zh-CN" ? TYPE_ZH[type] ?? String(type) : String(type).toUpperCase();
  }
  function tCollectibleName(id) {
    const en = byId[id]?.name ?? id;
    return current === "zh-CN" ? COL_ZH[id]?.name ?? en : en;
  }
  function tCollectibleDesc(id) {
    const en = byId[id]?.description ?? "";
    return current === "zh-CN" ? COL_ZH[id]?.desc ?? en : en;
  }
  function tAchName(id) {
    const en = ACHIEVEMENTS.find((a) => a.id === id)?.name ?? id;
    return current === "zh-CN" ? ACH_ZH[id]?.name ?? en : en;
  }
  function tAchDesc(id) {
    const en = ACHIEVEMENTS.find((a) => a.id === id)?.desc ?? "";
    return current === "zh-CN" ? ACH_ZH[id]?.desc ?? en : en;
  }
  function tStageName(key) {
    return t("stage." + key);
  }
  function fmtDate(iso) {
    try {
      const d = new Date(iso);
      return new Intl.DateTimeFormat(current, { year: "numeric", month: "short", day: "numeric" }).format(d);
    } catch {
      return iso.slice(0, 10);
    }
  }

  // src/state/store.ts
  function freshState(mode, settings) {
    return {
      version: SAVE_VERSION,
      firstRunDone: false,
      mode,
      historyScan: "unscanned",
      coins: 0,
      tickets: 0,
      shards: 0,
      // dust from duplicates
      coinResidue: 0,
      // sub-coin token remainder carried forward
      stats: { lifetimeTokens: 0, coinsEarned: 0, pulls: 0, duplicates: 0, syncs: 0 },
      projects: [],
      // { id, name, provider, tokens, coins, level }
      lastTotals: {},
      // id -> last-synced lifetime tokens (diff basis)
      owned: {},
      // collectibleId -> { count, firstUnlocked }
      achievements: {},
      // id -> ISO date unlocked
      mockWorld: null,
      cosmetics: { roomTheme: "base", profileFrame: "base" },
      roomDecorations: null,
      settings: settings ? { ...settings } : { muted: false, language: detectLocale(), fps: "auto", playerName: "" }
    };
  }
  var GameStore = class {
    constructor(opts = {}) {
      /** In-flight sync; concurrent callers share it instead of double-minting. */
      this.syncInFlight = null;
      this.fetchLiveFn = opts.fetchLive ?? fetchLive;
      const bootMode = loadMeta()?.lastMode ?? peekLegacyMode() ?? "live";
      this._state = this.loadSlot(bootMode);
      setLocale(this._state.settings.language);
      onExternalSaveChange((mode) => {
        if (mode !== this._state.mode) return;
        this._state = this.loadSlot(mode);
        setLocale(this._state.settings.language);
      });
    }
    /** Player progress. Read-only outside the store: mutate via methods only. */
    get state() {
      return this._state;
    }
    // ---- persistence ------------------------------------------------------
    /** Load the save slot for `mode`, overlaying fresh defaults so saves written
     * before a field existed still get it (nested objects merged explicitly). */
    loadSlot(mode) {
      const fresh = freshState(mode);
      const saved = loadState(mode);
      if (!saved) return fresh;
      const merged = {
        ...fresh,
        ...saved,
        stats: { ...fresh.stats, ...saved.stats },
        cosmetics: { ...fresh.cosmetics, ...saved.cosmetics || {} },
        settings: { ...fresh.settings, ...saved.settings }
      };
      merged.mode = mode;
      if (!merged.settings.language) merged.settings.language = detectLocale();
      if (!merged.settings.fps) merged.settings.fps = "auto";
      if (merged.settings.playerName == null) merged.settings.playerName = "";
      if (!["unscanned", "no-history", "live-history"].includes(merged.historyScan)) merged.historyScan = "unscanned";
      if (!isRoomThemeId(merged.cosmetics.roomTheme)) merged.cosmetics.roomTheme = "base";
      if (!isProfileFrameId(merged.cosmetics.profileFrame)) merged.cosmetics.profileFrame = "base";
      merged.roomDecorations = sanitizeRoomDecorations(merged.owned, saved.roomDecorations);
      return merged;
    }
    save() {
      saveState(this._state.mode, this._state);
      saveMeta({ lastMode: this._state.mode });
    }
    /** Switch UI language, update the i18n layer live, and persist. */
    setLanguage(language) {
      this._state.settings.language = language;
      setLocale(language);
      this.save();
    }
    /** Set the render frame-rate cap ('auto' | 30 | 60) and persist. Applying it
     * to the Stage is done by the caller (main.ts) since the store is UI-agnostic. */
    setFps(fps) {
      this._state.settings.fps = fps;
      this.save();
    }
    /** The player's custom display name, or '' when unset (callers fall back to
     * the localized default). Lives in settings so it survives resets + slots. */
    playerName() {
      return this._state.settings.playerName || "";
    }
    /** Set (or clear, via empty string) the player's display name and persist.
     * Trimmed and length-capped so it always fits the card's nameplate. */
    setPlayerName(name) {
      this._state.settings.playerName = name.trim().slice(0, 14);
      this.save();
    }
    /** Persist a custom room arrangement. Passing null restores the live
     * automatic layout that always showcases the newest prize in each family. */
    setRoomDecorations(placements) {
      this._state.roomDecorations = sanitizeRoomDecorations(this._state.owned, placements);
      this.save();
    }
    // ---- player level (flavor XP from coins earned) -----------------------
    playerLevel() {
      return playerLevelFor(this._state.stats.coinsEarned);
    }
    // ---- sync: tokens -> coins --------------------------------------------
    advanceDemoWorld() {
      this._state.mockWorld = advanceMock(this._state.mockWorld || seedMock());
      return this._state.mockWorld.projects.map((p) => ({ ...p }));
    }
    hasProgress() {
      const s = this._state;
      return s.stats.syncs > 0 || s.projects.length > 0 || s.coins > 0 || s.stats.lifetimeTokens > 0 || Object.keys(s.owned).length > 0;
    }
    async getTotals() {
      if (this._state.mode === "demo") {
        return { source: "demo", projects: this.advanceDemoWorld() };
      }
      const live = await this.fetchLiveFn();
      if (live.projects && live.projects.length) {
        this._state.historyScan = "live-history";
        return { source: "live", projects: live.projects };
      }
      if (this.hasProgress()) {
        return { source: "live-empty", projects: [] };
      }
      this._state.historyScan = "no-history";
      this.save();
      return { source: "no-history", projects: [] };
    }
    async sync() {
      if (this.syncInFlight) return this.syncInFlight;
      this.syncInFlight = this.doSync().finally(() => {
        this.syncInFlight = null;
      });
      return this.syncInFlight;
    }
    async doSync() {
      const { source, projects: totals } = await this.getTotals();
      if (source === "no-history") {
        return {
          source,
          newTokens: 0,
          coinsMinted: 0,
          residue: this._state.coinResidue,
          tickets: 0,
          perProject: [],
          levelUps: [],
          newProjects: [],
          achievements: []
        };
      }
      const s = this._state;
      const c = computeSync({ projects: s.projects, lastTotals: s.lastTotals, coinResidue: s.coinResidue }, totals);
      s.projects = c.projects;
      s.lastTotals = c.lastTotals;
      s.coinResidue = c.coinResidue;
      s.coins += c.coinsMinted;
      s.tickets += c.ticketsAwarded;
      s.stats.coinsEarned += c.coinsMinted;
      s.stats.lifetimeTokens = c.lifetimeTokens;
      s.stats.syncs++;
      const newlyUnlocked = this.checkAchievements();
      s.firstRunDone = true;
      this.save();
      return {
        source,
        newTokens: c.newTokens,
        coinsMinted: c.coinsMinted,
        residue: c.coinResidue,
        tickets: c.ticketsAwarded,
        perProject: c.perProject,
        levelUps: c.levelUps,
        newProjects: c.perProject.filter((p) => p.isNew),
        achievements: newlyUnlocked
      };
    }
    // ---- collectibles -----------------------------------------------------
    addOwned(collectible) {
      const cur = this._state.owned[collectible.id];
      if (cur) {
        cur.count++;
        this._state.stats.duplicates++;
        this._state.shards += this.shardValue(collectible.rarity);
        return true;
      }
      this._state.owned[collectible.id] = { count: 1, firstUnlocked: (/* @__PURE__ */ new Date()).toISOString() };
      return false;
    }
    shardValue(rarity) {
      return { common: 1, uncommon: 2, rare: 3, epic: 5, legendary: 10 }[rarity] || 1;
    }
    // Pull the capsule machine `count` times. Assumes cost already checked by UI,
    // but re-checks here to stay authoritative.
    pull(count) {
      const cost = count === 10 ? CONFIG.PULL10_COST : CONFIG.PULL_COST * count;
      if (this._state.coins < cost) return null;
      const ownedBefore = this.ownedCount();
      this._state.coins -= cost;
      const results = [];
      for (let i = 0; i < count; i++) {
        const c = rollCapsule();
        const isDup = this.addOwned(c);
        this._state.stats.pulls++;
        results.push({ collectible: c, isDup, count: this._state.owned[c.id].count });
      }
      const achievements = this.checkAchievements();
      const milestones = crossedCollectionMilestones(ownedBefore, this.ownedCount());
      this.save();
      return { cost, results, achievements, milestones };
    }
    buy(item) {
      if (this._state.coins < item.cost) return null;
      if (item.kind === "grant") {
        if (isP1CosmeticType(item.pick) && this.isGrantComplete(item)) return null;
        const ownedBefore = this.ownedCount();
        this._state.coins -= item.cost;
        const c = pickGrant(item.pick, this._state.owned);
        const isDup = this.addOwned(c);
        const achievements = this.checkAchievements();
        const milestones = crossedCollectionMilestones(ownedBefore, this.ownedCount());
        this.save();
        return { collectible: c, isDup, count: this._state.owned[c.id].count, achievements, milestones };
      }
      return null;
    }
    exchangeMissingPrize() {
      if (this._state.shards < MISSING_PRIZE_DUST_COST) return null;
      const missing = missingCollectibles(this._state.owned);
      if (!missing.length) return null;
      const ownedBefore = this.ownedCount();
      const collectible = missing[Math.floor(Math.random() * missing.length)];
      this._state.shards -= MISSING_PRIZE_DUST_COST;
      this._state.owned[collectible.id] = { count: 1, firstUnlocked: (/* @__PURE__ */ new Date()).toISOString() };
      const achievements = this.checkAchievements();
      const milestones = crossedCollectionMilestones(ownedBefore, this.ownedCount());
      this.save();
      return {
        collectible,
        cost: MISSING_PRIZE_DUST_COST,
        shardsRemaining: this._state.shards,
        achievements,
        milestones
      };
    }
    checkAchievements() {
      const unlocked = [];
      for (const a of ACHIEVEMENTS) {
        if (!this._state.achievements[a.id] && a.check(this._state)) {
          this._state.achievements[a.id] = (/* @__PURE__ */ new Date()).toISOString();
          unlocked.push(a);
        }
      }
      return unlocked;
    }
    // ---- misc -------------------------------------------------------------
    ownedCount() {
      return validOwnedCount(this._state.owned);
    }
    totalCollectibles() {
      return COLLECTIBLES.length;
    }
    /** Permanent collection-display upgrades currently earned by this slot. */
    collectionMilestones() {
      return earnedCollectionMilestones(this.ownedCount());
    }
    /** Highest permanent collection-display tier earned by this slot (0..4). */
    collectionMilestoneTier() {
      return collectionMilestoneTier(this.ownedCount());
    }
    /** The next permanent collection goal for the current slot. */
    nextCollectionMilestone() {
      return nextCollectionMilestone(this.ownedCount());
    }
    /** True when a cosmetic shop card has no unowned matching reward left. */
    isGrantComplete(item) {
      if (item.kind !== "grant" || !isP1CosmeticType(item.pick)) return false;
      return !COLLECTIBLES.some((c) => c.type === item.pick && !this._state.owned[c.id]);
    }
    /** Equip the selected P1 room. The base room is always free; a reward room
     * must have been genuinely unlocked in this mode's save slot. */
    equipRoomTheme(id) {
      if (!isRoomThemeId(id) || id !== "base" && !this._state.owned[id]) return false;
      this._state.cosmetics.roomTheme = id;
      this.save();
      return true;
    }
    /** Equip the selected P1 profile frame under the same per-slot ownership
     * rule as room themes. */
    equipProfileFrame(id) {
      if (!isProfileFrameId(id) || id !== "base" && !this._state.owned[id]) return false;
      this._state.cosmetics.profileFrame = id;
      this.save();
      return true;
    }
    /** Begin an intentional fictional arcade. This is only called by the
     * no-history decision panel, never by a scan fallback. */
    async playDemoArcade() {
      this.setMode("demo");
      return this.sync();
    }
    /** Return to the isolated live slot and immediately retry the local scan. */
    async tryLiveScan() {
      this.setMode("live");
      return this.sync();
    }
    /** Switch between the live and demo save slots. The current slot is saved
     * first; settings (sound, language) carry across so they feel global. */
    setMode(mode) {
      if (mode === this._state.mode) return;
      const settings = this._state.settings;
      this.save();
      this._state = this.loadSlot(mode);
      this._state.settings = { ...settings };
      this.save();
    }
    toggleMute() {
      this._state.settings.muted = !this._state.settings.muted;
      this.save();
      return this._state.settings.muted;
    }
    /** Wipe the CURRENT mode's progress only. Settings carry over. */
    reset() {
      const { mode, settings } = this._state;
      clearState(mode);
      this._state = freshState(mode, settings);
      this.save();
    }
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
  function publicUrl(path) {
    return new URL(path.replace(/^\/+/, ""), document.baseURI).toString();
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
  function spriteW(s) {
    let m = 0;
    for (const r of s.d) m = Math.max(m, r.length);
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
  function visibleBounds(sp) {
    const cached = sp._vb;
    if (cached) return cached;
    let x0 = Infinity;
    let y0 = Infinity;
    let x1 = -1;
    let y1 = -1;
    for (let ry = 0; ry < sp.d.length; ry++) {
      const line = sp.d[ry];
      for (let rx = 0; rx < line.length; rx++) {
        const ch = line[rx];
        if (ch === "." || ch === " ") continue;
        if (rx < x0) x0 = rx;
        if (rx > x1) x1 = rx;
        if (ry < y0) y0 = ry;
        if (ry > y1) y1 = ry;
      }
    }
    const vb = x1 < 0 ? { x0: 0, y0: 0, x1: 0, y1: 0 } : { x0, y0, x1, y1 };
    sp._vb = vb;
    return vb;
  }
  function drawSpriteCentered(ctx2, sprite, cx, cy, size, tint) {
    const sp = typeof sprite === "string" ? SPRITES[sprite] : sprite;
    const vb = visibleBounds(sp);
    const vw = vb.x1 - vb.x0 + 1;
    const vh = vb.y1 - vb.y0 + 1;
    const raw = size / Math.max(vw, vh);
    const scale = raw >= 1 ? Math.max(1, Math.floor(raw)) : raw;
    const x = cx - (vb.x0 + vw / 2) * scale;
    const y = cy - (vb.y0 + vh / 2) * scale;
    drawSprite(ctx2, sp, x, y, scale, tint);
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
  function drawPlayer(ctx2, x, y, s) {
    const put = (col, cx, cy, w, h) => {
      if (!col) return;
      ctx2.fillStyle = col;
      ctx2.fillRect(x + cx * s, y + cy * s, w * s, h * s);
    };
    put(PALETTE.R, 3, 0, 8, 2);
    put(PALETTE.r, 3, 2, 10, 1);
    put(PALETTE.O, 10, 2, 4, 1);
    put(PALETTE.S, 3, 3, 8, 4);
    put(PALETTE.K, 4, 4, 1, 1);
    put(PALETTE.K, 8, 4, 1, 1);
    put(PALETTE.s, 5, 6, 4, 1);
    put(PALETTE.B, 2, 7, 10, 7);
    put(PALETTE.b, 2, 7, 2, 7);
    put(PALETTE.C, 5, 8, 4, 4);
    put(PALETTE.O, 9, 7, 1, 6);
    put(PALETTE.B, 0, 8, 2, 5);
    put(PALETTE.B, 12, 8, 2, 5);
    put(PALETTE.S, 0, 13, 2, 1);
    put(PALETTE.S, 12, 13, 2, 1);
    put(PALETTE.k, 3, 14, 3, 5);
    put(PALETTE.k, 8, 14, 3, 5);
    put(PALETTE.W, 3, 19, 3, 1);
    put(PALETTE.W, 8, 19, 3, 1);
  }
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
  function wrapText(text, scale, maxWidth) {
    const str = String(text);
    if (CJK_RE.test(str)) {
      const lines2 = [];
      let line2 = "";
      for (const ch of str) {
        if (ch === "\n") {
          lines2.push(line2);
          line2 = "";
          continue;
        }
        const test = line2 + ch;
        if (line2 && measureText(test, scale) > maxWidth) {
          lines2.push(line2);
          line2 = ch;
        } else {
          line2 = test;
        }
      }
      if (line2) lines2.push(line2);
      return lines2;
    }
    const words = str.split(/\s+/).filter(Boolean);
    const lines = [];
    let line = "";
    for (const w of words) {
      const test = line ? line + " " + w : w;
      if (line && measureText(test, scale) > maxWidth) {
        lines.push(line);
        line = w;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines;
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
  function panel(ctx2, x, y, w, h, opts) {
    const o = opts || {};
    const r = o.radius == null ? 8 : o.radius;
    rrect(ctx2, x, y, w, h, r);
    if (o.fill) {
      ctx2.fillStyle = o.fill;
      ctx2.fill();
    }
    if (o.border) {
      ctx2.lineWidth = o.borderWidth || 3;
      ctx2.strokeStyle = o.border;
      ctx2.stroke();
    }
  }
  function bulb(ctx2, cx, cy, r, color, on) {
    ctx2.beginPath();
    ctx2.arc(cx, cy, r, 0, Math.PI * 2);
    if (on) {
      ctx2.save();
      ctx2.shadowColor = color;
      ctx2.shadowBlur = r * 3;
      ctx2.fillStyle = color;
      ctx2.fill();
      ctx2.restore();
    } else {
      ctx2.fillStyle = "rgba(0,0,0,0.5)";
      ctx2.fill();
      ctx2.strokeStyle = "rgba(255,255,255,0.15)";
      ctx2.lineWidth = 1;
      ctx2.stroke();
    }
  }

  // src/render/widgets.ts
  var EasedNumber = class {
    constructor() {
      this.shown = 0;
    }
    /** Jump straight to `v` (screen enter, no animation). */
    set(v) {
      this.shown = v;
    }
    /** Advance toward `target`; returns the value to display this frame. */
    toward(target, dt) {
      this.shown += (target - this.shown) * Math.min(1, dt * 6);
      if (Math.abs(target - this.shown) < 0.5) this.shown = target;
      return this.shown;
    }
    get value() {
      return this.shown;
    }
  };
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
  function drawImageContain(g, img, cx, cy, maxW, maxH) {
    const nw = img.naturalWidth || maxW;
    const nh = img.naturalHeight || maxH;
    const ar = nw / nh;
    let w = maxW;
    let h = maxW / ar;
    if (h > maxH) {
      h = maxH;
      w = maxH * ar;
    }
    drawImageSmooth(g, img, cx - w / 2, cy - h / 2, w, h);
  }
  function drawCropContain(g, img, crop, x, y, w, h, alignBottom = false) {
    const ar = crop.sw / crop.sh;
    let dw = w;
    let dh = w / ar;
    if (dh > h) {
      dh = h;
      dw = h * ar;
    }
    const dx = x + (w - dw) / 2;
    const dy = alignBottom ? y + (h - dh) : y + (h - dh) / 2;
    drawImageSmooth(g, img, dx, dy, dw, dh, crop);
  }
  function radial(g, cx, cy, r, color) {
    const grad = g.createRadialGradient(cx, cy, 0, cx, cy, r);
    grad.addColorStop(0, color);
    grad.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = grad;
    g.fillRect(cx - r, cy - r, r * 2, r * 2);
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
      const s = sparks[i];
      s.life -= dt;
      s.vy += 300 * dt;
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      if (s.life <= 0) {
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
    for (const s of sparks) {
      ctx2.globalAlpha = Math.max(0, s.life / s.max);
      ctx2.fillStyle = s.color;
      ctx2.fillRect(s.x, s.y, s.size, s.size);
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

  // src/ui/overlays.ts
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }
  var Overlays = class {
    constructor(root, store2, onChange, onOpenAchievements, onTryLiveScan) {
      this.backdrop = null;
      this.root = root;
      this.store = store2;
      this.onChange = onChange;
      this.onOpenAchievements = onOpenAchievements;
      this.onTryLiveScan = onTryLiveScan;
    }
    /** Remove any open modal. */
    close() {
      if (this.backdrop) {
        this.backdrop.remove();
        this.backdrop = null;
      }
    }
    mount(modal) {
      this.close();
      const backdrop = el("div", "ta-modal-backdrop");
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) this.close();
      });
      backdrop.appendChild(modal);
      this.root.appendChild(backdrop);
      this.backdrop = backdrop;
    }
    // ---- help ---------------------------------------------------------------
    openHelp() {
      const modal = el("div", "ta-modal");
      modal.appendChild(el("h2", void 0, t("help.title")));
      const tips = el("ul");
      for (const key of ["help.l1", "help.l2", "help.l3", "help.l4"]) {
        tips.appendChild(el("li", void 0, t(key)));
      }
      if (this.store.state.mode === "demo") tips.appendChild(el("li", void 0, t("help.demo")));
      modal.appendChild(tips);
      const actions = el("div", "ta-actions");
      const closeBtn = el("button", "ta-btn", t("ui.close"));
      closeBtn.addEventListener("click", () => this.close());
      actions.appendChild(closeBtn);
      modal.appendChild(actions);
      this.mount(modal);
    }
    // ---- player name --------------------------------------------------------
    /** Rename dialog: a single text field for the player's display name. Saving
     * an empty value clears back to the localized default. Opened from the card
     * pencil or from Settings. */
    openPlayerName() {
      const modal = el("div", "ta-modal");
      modal.appendChild(el("h2", void 0, t("ui.playerName")));
      const input = el("input", "ta-input");
      input.type = "text";
      input.maxLength = 14;
      input.value = this.store.playerName();
      input.placeholder = t("ui.arcadePlayer");
      modal.appendChild(input);
      const commit = () => {
        this.store.setPlayerName(input.value);
        this.onChange?.();
        this.close();
      };
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") commit();
        else if (e.key === "Escape") this.close();
      });
      const actions = el("div", "ta-actions");
      const cancelBtn = el("button", "ta-btn ghost", t("ui.close"));
      cancelBtn.addEventListener("click", () => this.close());
      const saveBtn = el("button", "ta-btn", t("ui.save"));
      saveBtn.addEventListener("click", commit);
      actions.appendChild(cancelBtn);
      actions.appendChild(saveBtn);
      modal.appendChild(actions);
      this.mount(modal);
      input.focus();
      input.select();
    }
    // ---- settings -----------------------------------------------------------
    openSettings() {
      const modal = el("div", "ta-modal");
      modal.appendChild(el("h2", void 0, t("ui.settings")));
      const nameRow = el("div", "ta-row");
      nameRow.appendChild(el("span", void 0, t("ui.playerName")));
      const nameBtn = el("button", "ta-btn ta-switch ghost");
      nameBtn.textContent = this.store.playerName() || t("ui.editName");
      nameBtn.addEventListener("click", () => this.openPlayerName());
      nameRow.appendChild(nameBtn);
      modal.appendChild(nameRow);
      const langRow = el("div", "ta-row");
      langRow.appendChild(el("span", void 0, t("ui.language")));
      const langBtn = el("button", "ta-btn ta-switch");
      langBtn.textContent = getLocale() === "zh-CN" ? "\u4E2D\u6587" : "English";
      langBtn.addEventListener("click", () => {
        const next = getLocale() === "zh-CN" ? "en" : "zh-CN";
        this.store.setLanguage(next);
        this.onChange?.();
        this.openSettings();
      });
      langRow.appendChild(langBtn);
      modal.appendChild(langRow);
      const soundRow = el("div", "ta-row");
      soundRow.appendChild(el("span", void 0, t("ui.sound")));
      const soundBtn = el("button", "ta-btn ta-switch");
      const paintSound = () => {
        soundBtn.textContent = this.store.state.settings.muted ? t("ui.off") : t("ui.on");
      };
      paintSound();
      soundBtn.addEventListener("click", () => {
        this.store.toggleMute();
        paintSound();
        this.onChange?.();
      });
      soundRow.appendChild(soundBtn);
      modal.appendChild(soundRow);
      const modeRow = el("div", "ta-row");
      modeRow.appendChild(el("span", void 0, t("ui.dataSource")));
      const modeBtn = el("button", "ta-btn ta-switch ghost");
      modeBtn.textContent = this.store.state.mode === "demo" ? this.onTryLiveScan ? t("ui.tryLiveScan") : t("ui.demoArcade") : t("ui.liveHistory");
      if (this.store.state.mode === "demo") {
        if (this.onTryLiveScan) {
          modeBtn.addEventListener("click", () => {
            this.close();
            this.onTryLiveScan?.();
          });
        } else {
          modeBtn.disabled = true;
        }
      } else {
        modeBtn.disabled = true;
      }
      modeRow.appendChild(modeBtn);
      modal.appendChild(modeRow);
      const fpsRow = el("div", "ta-row");
      fpsRow.appendChild(el("span", void 0, t("ui.frameRate")));
      const fpsBtn = el("button", "ta-btn ta-switch ghost");
      const fpsCycle = ["auto", 30, 60];
      const paintFps = () => {
        const cur = this.store.state.settings.fps;
        fpsBtn.textContent = cur === "auto" ? t("ui.fpsAuto") : cur + " FPS";
      };
      paintFps();
      fpsBtn.addEventListener("click", () => {
        const cur = this.store.state.settings.fps;
        const next = fpsCycle[(fpsCycle.indexOf(cur) + 1) % fpsCycle.length];
        this.store.setFps(next);
        paintFps();
        this.onChange?.();
      });
      fpsRow.appendChild(fpsBtn);
      modal.appendChild(fpsRow);
      if (this.onOpenAchievements) {
        const achRow = el("div", "ta-row");
        achRow.appendChild(el("span", void 0, t("ui.achievements")));
        const achBtn = el("button", "ta-btn ta-switch ghost", t("ui.view"));
        achBtn.addEventListener("click", () => this.onOpenAchievements?.());
        achRow.appendChild(achBtn);
        modal.appendChild(achRow);
      }
      const resetRow = el("div", "ta-row");
      resetRow.appendChild(el("span", void 0, t("ui.resetProgress")));
      const resetBtn = el("button", "ta-btn danger", t("ui.reset"));
      resetBtn.addEventListener("click", () => {
        this.store.reset();
        location.reload();
      });
      resetRow.appendChild(resetBtn);
      modal.appendChild(resetRow);
      const actions = el("div", "ta-actions");
      const closeBtn = el("button", "ta-btn", t("ui.close"));
      closeBtn.addEventListener("click", () => this.close());
      actions.appendChild(closeBtn);
      modal.appendChild(actions);
      this.mount(modal);
    }
  };

  // src/screens/router.ts
  var Router = class {
    /** `getContext` is deferred so main.ts can wire the context after the router
     * exists (the context itself holds a reference back to the router). */
    constructor(getContext) {
      this.getContext = getContext;
      this.screens = /* @__PURE__ */ new Map();
      this.stack = [];
      this.activeName = null;
    }
    register(screen) {
      this.screens.set(screen.name, screen);
    }
    /** The currently active screen. Throws if the router has not been started. */
    get current() {
      const s = this.activeName ? this.screens.get(this.activeName) : void 0;
      if (!s) throw new Error("Router: no active screen \u2014 call go() first");
      return s;
    }
    /** Navigate forward to `name`, remembering the current screen for back(). */
    go(name, params2) {
      if (!this.screens.has(name)) return;
      if (this.activeName && this.activeName !== name) this.stack.push(this.activeName);
      this.activate(name, params2);
    }
    /** Pop the history stack, defaulting to the arcade room. */
    back() {
      const prev = this.stack.pop() ?? "room";
      this.activate(prev, void 0);
    }
    activate(name, params2) {
      const next = this.screens.get(name);
      if (!next) return;
      const active = this.activeName ? this.screens.get(this.activeName) : void 0;
      if (active && active !== next) active.leave?.();
      this.activeName = name;
      this.getContext().fx.reset();
      next.enter?.(params2);
    }
    /** Render the active screen, then draw the effects layer above it. */
    render(ctx2, dt, now) {
      const { fx: fx2, stage: stage2 } = this.getContext();
      this.current.render(ctx2, dt, now);
      fx2.draw(ctx2, stage2.width);
    }
  };

  // src/render/cabinet.ts
  var SCENES = {
    lab(ctx2, x, y, w, h) {
      bg(ctx2, x, y, w, h, "#0e1630", "#1b2a52");
      rect(ctx2, x + w * 0.4, y + h * 0.3, w * 0.2, h * 0.5, "#5fe6d6");
      rect(ctx2, x + w * 0.42, y + h * 0.2, w * 0.16, h * 0.14, "#5fd66f");
      rect(ctx2, x + w * 0.2, y + h * 0.55, w * 0.12, h * 0.25, "#ff9a3c");
      star(ctx2, x + w * 0.75, y + h * 0.25, "#ffd23f");
    },
    shop(ctx2, x, y, w, h) {
      bg(ctx2, x, y, w, h, "#241030", "#3a1b48");
      rect(ctx2, x + w * 0.2, y + h * 0.35, w * 0.6, h * 0.45, "#8a5a3c");
      for (let i = 0; i < 5; i++)
        rect(ctx2, x + w * (0.2 + i * 0.12), y + h * 0.3, w * 0.06, h * 0.08, i % 2 ? "#ef5d78" : "#f6f4ff");
      rect(ctx2, x + w * 0.44, y + h * 0.55, w * 0.12, h * 0.25, "#ffd23f");
    },
    forest(ctx2, x, y, w, h) {
      bg(ctx2, x, y, w, h, "#0c1e18", "#123a2a");
      tree(ctx2, x + w * 0.3, y + h * 0.4, w * 0.16, h * 0.4);
      tree(ctx2, x + w * 0.6, y + h * 0.35, w * 0.2, h * 0.5);
      rect(ctx2, x, y + h * 0.82, w, h * 0.18, "#2f8f4b");
    },
    rocket(ctx2, x, y, w, h) {
      bg(ctx2, x, y, w, h, "#0a0a20", "#1a1040");
      star(ctx2, x + w * 0.2, y + h * 0.2, "#f6f4ff");
      star(ctx2, x + w * 0.8, y + h * 0.3, "#5fe6d6");
      rect(ctx2, x + w * 0.46, y + h * 0.2, w * 0.08, h * 0.4, "#f6f4ff");
      tri(ctx2, x + w * 0.5, y + h * 0.12, w * 0.08, h * 0.1, "#ef5d78");
      rect(ctx2, x + w * 0.46, y + h * 0.6, w * 0.03, h * 0.2, "#ff9a3c");
      rect(ctx2, x + w * 0.51, y + h * 0.6, w * 0.03, h * 0.22, "#ffd23f");
    },
    city(ctx2, x, y, w, h) {
      bg(ctx2, x, y, w, h, "#120a28", "#2a184a");
      for (let i = 0; i < 5; i++) {
        const bw = w * 0.16;
        const bh = h * (0.3 + i * 37 % 5 * 0.1);
        rect(ctx2, x + w * 0.06 + i * bw, y + h - bh, bw * 0.82, bh, "#3a2a6a");
        for (let j = 0; j < 3; j++)
          rect(ctx2, x + w * 0.09 + i * bw + j * bw * 0.24, y + h - bh + h * 0.06, bw * 0.12, h * 0.06, "#ffd23f");
      }
    },
    maze(ctx2, x, y, w, h) {
      bg(ctx2, x, y, w, h, "#08081e", "#101038");
      ctx2.strokeStyle = "#4aa3ff";
      ctx2.lineWidth = Math.max(1, w * 0.03);
      ctx2.strokeRect(x + w * 0.15, y + h * 0.2, w * 0.7, h * 0.6);
      ctx2.strokeRect(x + w * 0.3, y + h * 0.35, w * 0.4, h * 0.3);
      dot(ctx2, x + w * 0.22, y + h * 0.27, w * 0.04, "#ffd23f");
      dot(ctx2, x + w * 0.5, y + h * 0.5, w * 0.06, "#ef5d78");
    },
    castle(ctx2, x, y, w, h) {
      bg(ctx2, x, y, w, h, "#1a1030", "#301a4a");
      rect(ctx2, x + w * 0.25, y + h * 0.35, w * 0.5, h * 0.45, "#6a6a86");
      for (let i = 0; i < 4; i++) rect(ctx2, x + w * (0.25 + i * 0.14), y + h * 0.28, w * 0.08, h * 0.1, "#6a6a86");
      rect(ctx2, x + w * 0.44, y + h * 0.55, w * 0.12, h * 0.25, "#160f1f");
      flag(ctx2, x + w * 0.5, y + h * 0.18, "#ef5d78");
    },
    wave(ctx2, x, y, w, h) {
      bg(ctx2, x, y, w, h, "#04121e", "#0a3a4a");
      ctx2.strokeStyle = "#5fe6d6";
      ctx2.lineWidth = Math.max(1, h * 0.04);
      for (let r = 0; r < 3; r++) {
        ctx2.beginPath();
        for (let i = 0; i <= 10; i++) {
          const px = x + w * i / 10;
          const py = y + h * (0.5 + r * 0.16) + Math.sin(i * 0.9 + r) * h * 0.06;
          i === 0 ? ctx2.moveTo(px, py) : ctx2.lineTo(px, py);
        }
        ctx2.stroke();
      }
    }
  };
  var SCENE_KEYS = Object.keys(SCENES);
  function bg(ctx2, x, y, w, h, top, bot) {
    vgrad(ctx2, x, y, w, h, top, bot);
  }
  function rect(ctx2, x, y, w, h, c) {
    ctx2.fillStyle = c;
    ctx2.fillRect(x | 0, y | 0, Math.ceil(w), Math.ceil(h));
  }
  function dot(ctx2, cx, cy, r, c) {
    ctx2.fillStyle = c;
    ctx2.beginPath();
    ctx2.arc(cx, cy, r, 0, Math.PI * 2);
    ctx2.fill();
  }
  function star(ctx2, cx, cy, c) {
    ctx2.fillStyle = c;
    ctx2.fillRect(cx - 1, cy - 3, 2, 6);
    ctx2.fillRect(cx - 3, cy - 1, 6, 2);
  }
  function tri(ctx2, cx, top, w, h, c) {
    ctx2.fillStyle = c;
    ctx2.beginPath();
    ctx2.moveTo(cx, top);
    ctx2.lineTo(cx - w, top + h);
    ctx2.lineTo(cx + w, top + h);
    ctx2.fill();
  }
  function tree(ctx2, cx, top, w, h) {
    ctx2.fillStyle = "#2f8f4b";
    tri(ctx2, cx, top, w, h * 0.6, "#2f8f4b");
    tri(ctx2, cx, top + h * 0.3, w, h * 0.6, "#5fd66f");
    ctx2.fillStyle = "#5c3a26";
    ctx2.fillRect(cx - w * 0.15, top + h * 0.8, w * 0.3, h * 0.2);
  }
  function flag(ctx2, cx, top, c) {
    ctx2.fillStyle = "#160f1f";
    ctx2.fillRect(cx, top, 2, 14);
    ctx2.fillStyle = c;
    ctx2.fillRect(cx + 2, top, 8, 6);
  }
  var SKINS = [
    { neon: "#4aa3ff", dark: "#12233f", mid: "#1c3a63", name: "#8fd0ff" },
    { neon: "#ef5d78", dark: "#3a1220", mid: "#5e1c31", name: "#ff9db0" },
    { neon: "#9a6cff", dark: "#231143", mid: "#38206a", name: "#c3a6ff" },
    { neon: "#5fe6d6", dark: "#0c2e2c", mid: "#12433f", name: "#a6f2e8" },
    { neon: "#5fd66f", dark: "#12331c", mid: "#1c5230", name: "#aef2b4" },
    { neon: "#ffd23f", dark: "#3a2c0a", mid: "#5e4712", name: "#ffe58f" },
    { neon: "#ff8fce", dark: "#3a1230", mid: "#5e1c4c", name: "#ffc3e8" },
    { neon: "#ff9a3c", dark: "#3a2010", mid: "#5e3418", name: "#ffca8f" }
  ];
  function hashStr(s) {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }
  function skinFor(id) {
    return SKINS[hashStr(id) % SKINS.length];
  }
  function sceneFor(id) {
    return SCENE_KEYS[hashStr(id + "x") % SCENE_KEYS.length];
  }
  function drawCabinet(ctx2, x, y, w, h, opts) {
    const skin = opts.skin || skinFor(opts.id || opts.name);
    const scene = SCENES[opts.scene || sceneFor(opts.id || opts.name)];
    const level = Math.max(1, Math.min(5, opts.level || 1));
    const glow = opts.glow == null ? 1 : opts.glow;
    const on = opts.on !== false;
    ctx2.save();
    rrect(ctx2, x, y + h * 0.08, w, h * 0.92, Math.min(10, w * 0.06));
    ctx2.fillStyle = "#0d0a16";
    ctx2.fill();
    ctx2.fillStyle = skin.mid;
    ctx2.fillRect(x + 2, y + h * 0.12, w * 0.1, h * 0.82);
    ctx2.fillRect(x + w - 2 - w * 0.1, y + h * 0.12, w * 0.1, h * 0.82);
    ctx2.save();
    ctx2.shadowColor = skin.neon;
    ctx2.shadowBlur = (6 + level * 3) * glow * (on ? 1 : 0.2);
    ctx2.strokeStyle = on ? skin.neon : "#2a2440";
    ctx2.lineWidth = 2 + Math.round(level / 3);
    rrect(ctx2, x + 1, y + h * 0.09, w - 2, h * 0.9, Math.min(10, w * 0.06));
    ctx2.stroke();
    ctx2.restore();
    const my = y + h * 0.02;
    const mh = h * 0.14;
    rrect(ctx2, x + w * 0.06, my, w * 0.88, mh, 4);
    vgrad(ctx2, x + w * 0.06, my, w * 0.88, mh, skin.mid, skin.dark);
    ctx2.fill();
    ctx2.save();
    ctx2.beginPath();
    rrect(ctx2, x + w * 0.06, my, w * 0.88, mh, 4);
    ctx2.clip();
    const label = String(opts.name || "").slice(0, 12);
    const fs = Math.max(1, Math.floor(w * 0.8 / (label.length * 6)));
    drawText(ctx2, label, x + w / 2, my + mh / 2 - fs * 3.5, fs, on ? skin.name : "#4a4460", {
      align: "center",
      glow: on ? skin.neon : null,
      glowBlur: 3
    });
    ctx2.restore();
    const bulbs = 8;
    const litCount = on ? Math.round(level / 5 * bulbs) : 0;
    for (let i = 0; i < bulbs; i++) {
      const bx = x + w * 0.1 + i * (w * 0.8) / (bulbs - 1);
      bulb(ctx2, bx, my - 2, Math.max(1.5, w * 0.012), skin.neon, i < litCount);
    }
    const sx = x + w * 0.16;
    const sy = y + h * 0.2;
    const sw = w * 0.68;
    const sh = h * 0.34;
    ctx2.fillStyle = "#05060f";
    ctx2.fillRect(sx - 3, sy - 3, sw + 6, sh + 6);
    ctx2.save();
    ctx2.beginPath();
    ctx2.rect(sx, sy, sw, sh);
    ctx2.clip();
    if (on) scene(ctx2, sx, sy, sw, sh);
    else {
      ctx2.fillStyle = "#05060f";
      ctx2.fillRect(sx, sy, sw, sh);
    }
    ctx2.fillStyle = "rgba(255,255,255,0.05)";
    for (let syy = sy; syy < sy + sh; syy += 3) ctx2.fillRect(sx, syy, sw, 1);
    ctx2.restore();
    ctx2.fillStyle = "rgba(255,255,255,0.06)";
    ctx2.beginPath();
    ctx2.moveTo(sx, sy);
    ctx2.lineTo(sx + sw * 0.4, sy);
    ctx2.lineTo(sx, sy + sh * 0.5);
    ctx2.fill();
    const py = y + h * 0.58;
    vgrad(ctx2, x + w * 0.12, py, w * 0.76, h * 0.12, skin.mid, "#0d0a16");
    ctx2.fillStyle = "#160f1f";
    ctx2.fillRect(x + w * 0.24, py + h * 0.05, 3, h * 0.05);
    bulb(ctx2, x + w * 0.245, py + h * 0.04, Math.max(2, w * 0.018), "#ef5d78", true);
    const btnCols = ["#ef5d78", "#ffd23f", "#5fd66f"];
    for (let i = 0; i < 3; i++) bulb(ctx2, x + w * (0.4 + i * 0.08), py + h * 0.06, Math.max(1.5, w * 0.014), btnCols[i], on);
    if (on) drawCoin(ctx2, x + w * 0.72, py + h * 0.06, Math.max(3, w * 0.03), 1);
    const ly = y + h * 0.72;
    rrect(ctx2, x + w * 0.3, ly, w * 0.4, h * 0.08, 3);
    ctx2.fillStyle = "#0d0a16";
    ctx2.fill();
    ctx2.strokeStyle = on ? skin.neon : "#2a2440";
    ctx2.lineWidth = 1.5;
    ctx2.stroke();
    const lvlFs = Math.max(1, Math.floor(w * 0.02));
    drawText(ctx2, "LVL " + level, x + w / 2, ly + h * 0.04 - lvlFs * 3.5, lvlFs, on ? skin.neon : "#4a4460", {
      align: "center"
    });
    if (opts.progress != null) {
      const gy = y + h * 0.84;
      const gx = x + w * 0.16;
      const gw = w * 0.68;
      const gh = h * 0.05;
      ctx2.fillStyle = "#05060f";
      ctx2.fillRect(gx, gy, gw, gh);
      ctx2.fillStyle = on ? "#5fd66f" : "#2a2440";
      ctx2.fillRect(gx + 1, gy + 1, Math.max(0, (gw - 2) * Math.min(1, opts.progress)), gh - 2);
      ctx2.strokeStyle = "#160f1f";
      ctx2.lineWidth = 1;
      ctx2.strokeRect(gx, gy, gw, gh);
    }
    if (level >= 5 && on) {
      for (let i = 0; i < 3; i++) star(ctx2, x + w * (0.3 + i * 0.2), my - 6, "#ffd23f");
    }
    ctx2.restore();
  }

  // src/render/machines.ts
  function dot2(ctx2, cx, cy, r, c) {
    ctx2.fillStyle = c;
    ctx2.beginPath();
    ctx2.arc(cx, cy, r, 0, Math.PI * 2);
    ctx2.fill();
  }
  function drawCapsuleMachine(ctx2, x, y, w, h, opts) {
    const o = opts || {};
    const shake = o.shake || 0;
    ctx2.save();
    ctx2.translate(x + shake, y);
    const baseY = h * 0.55;
    rrect(ctx2, w * 0.12, baseY, w * 0.76, h * 0.42, 8);
    vgrad(ctx2, w * 0.12, baseY, w * 0.76, h * 0.42, "#ef5d78", "#7a1f33");
    ctx2.fill();
    ctx2.fillStyle = "#2a2440";
    ctx2.fillRect(w * 0.2, baseY + h * 0.18, w * 0.6, h * 0.14);
    rrect(ctx2, w * 0.4, baseY + h * 0.2, w * 0.2, h * 0.1, 3);
    ctx2.fillStyle = "#8a8ab0";
    ctx2.fill();
    ctx2.fillStyle = "#160f1f";
    ctx2.fillRect(w * 0.46, baseY + h * 0.05, w * 0.02, h * 0.08);
    const lblFs = Math.max(1, Math.floor(w * 0.02));
    drawText(ctx2, o.label || "INSERT COIN", w / 2, baseY + h * 0.35, lblFs, "#ffd23f", { align: "center" });
    const domeCx = w / 2;
    const domeCy = h * 0.4;
    const domeR = w * 0.36;
    ctx2.beginPath();
    ctx2.arc(domeCx, domeCy, domeR, Math.PI, 0);
    ctx2.lineTo(domeCx + domeR, h * 0.55);
    ctx2.lineTo(domeCx - domeR, h * 0.55);
    ctx2.closePath();
    ctx2.fillStyle = "rgba(180,230,255,0.14)";
    ctx2.fill();
    ctx2.save();
    ctx2.beginPath();
    ctx2.arc(domeCx, domeCy, domeR - 2, Math.PI, 0);
    ctx2.lineTo(domeCx + domeR, h * 0.54);
    ctx2.lineTo(domeCx - domeR, h * 0.54);
    ctx2.closePath();
    ctx2.clip();
    const ballCols = ["#ef5d78", "#ffd23f", "#5fd66f", "#4aa3ff", "#9a6cff", "#5fe6d6", "#ff8fce", "#ff9a3c"];
    const br = domeR * 0.2;
    let bi = 0;
    for (let ry = 0; ry < 4; ry++) {
      for (let rx = -3; rx <= 3; rx++) {
        const cx = domeCx + rx * br * 1.05 + (ry % 2 ? br * 0.5 : 0);
        const cy = h * 0.5 - ry * br * 1.1;
        const col = ballCols[bi++ % ballCols.length];
        dot2(ctx2, cx, cy, br, col);
        ctx2.fillStyle = "rgba(255,255,255,0.5)";
        dot2(ctx2, cx - br * 0.3, cy - br * 0.3, br * 0.28, "rgba(255,255,255,0.6)");
      }
    }
    ctx2.restore();
    ctx2.strokeStyle = "rgba(200,240,255,0.5)";
    ctx2.lineWidth = 2;
    ctx2.beginPath();
    ctx2.arc(domeCx, domeCy, domeR, Math.PI, 0);
    ctx2.stroke();
    ctx2.fillStyle = "rgba(255,255,255,0.25)";
    ctx2.beginPath();
    ctx2.arc(domeCx - domeR * 0.4, domeCy - domeR * 0.2, domeR * 0.18, 0, Math.PI * 2);
    ctx2.fill();
    rrect(ctx2, w * 0.36, h * 0.02, w * 0.28, h * 0.08, 3);
    vgrad(ctx2, w * 0.36, h * 0.02, w * 0.28, h * 0.08, "#9a6cff", "#5a3ab0");
    ctx2.fill();
    ctx2.restore();
  }
  function drawCoinBank(ctx2, x, y, w, h, opts) {
    const o = opts || {};
    const t2 = o.t || 0;
    const fillFrac = Math.max(0, Math.min(1, o.fill == null ? 0.6 : o.fill));
    const label = o.label || "COIN BANK";
    const sublabel = o.sublabel || "1,000 TOKENS = 1 COIN";
    const cx = x + w / 2;
    ctx2.save();
    const baseH = h * 0.17;
    const baseY = y + h - baseH;
    rrect(ctx2, x + w * 0.08, baseY, w * 0.84, baseH, 10);
    vgrad(ctx2, x + w * 0.08, baseY, w * 0.84, baseH, "#241c34", "#0d0a16");
    ctx2.fill();
    rrect(ctx2, x + w * 0.08, baseY, w * 0.84, baseH, 10);
    ctx2.strokeStyle = "#2f9fa0";
    ctx2.lineWidth = 2;
    ctx2.stroke();
    ctx2.fillStyle = "#160f1f";
    ctx2.fillRect(x + w * 0.14, baseY + baseH - 3, w * 0.1, 3);
    ctx2.fillRect(x + w * 0.76, baseY + baseH - 3, w * 0.1, 3);
    const glassX = x + w * 0.14;
    const glassW = w * 0.72;
    const glassTop = y + h * 0.19;
    const glassH = baseY - glassTop + h * 0.03;
    const glassR = w * 0.14;
    rrect(ctx2, glassX, glassTop, glassW, glassH, glassR);
    vgrad(ctx2, glassX, glassTop, glassW, glassH, "rgba(95,230,214,0.12)", "rgba(47,159,160,0.24)");
    ctx2.fill();
    ctx2.save();
    rrect(ctx2, glassX, glassTop, glassW, glassH, glassR);
    ctx2.clip();
    const coinR = w * 0.055;
    const rows = 2 + Math.round(fillFrac * 3);
    const pileBottom = glassTop + glassH - coinR;
    for (let r = 0; r < rows; r++) {
      const inRow = rows - r + 1;
      const rowW = (inRow - 1) * coinR * 1.05;
      const ry = pileBottom - r * coinR * 1.05;
      for (let c = 0; c < inRow; c++) {
        const px = cx - rowW / 2 + c * coinR * 1.05;
        drawCoin(ctx2, px, ry, coinR, 1);
      }
    }
    const bubbleCount = 5;
    const bubbleR = w * 0.05;
    for (let i = 0; i < bubbleCount; i++) {
      const colFrac = i % 3 / 2;
      const bx = glassX + glassW * (0.26 + colFrac * 0.48);
      const rowIdx = Math.floor(i / 3);
      const baseYb = glassTop + glassH * (0.26 + rowIdx * 0.2);
      const by = baseYb + Math.sin(t2 + i) * (h * 0.02);
      dot2(ctx2, bx, by, bubbleR, "#5fe6d6");
      ctx2.strokeStyle = "rgba(20,15,31,0.45)";
      ctx2.lineWidth = 2;
      ctx2.beginPath();
      ctx2.arc(bx, by, bubbleR, 0, Math.PI * 2);
      ctx2.stroke();
      dot2(ctx2, bx - bubbleR * 0.3, by - bubbleR * 0.3, bubbleR * 0.3, "rgba(255,255,255,0.4)");
      const tf = Math.max(1, Math.round(bubbleR * 0.42));
      drawText(ctx2, "T", bx, by - tf * 3.5, tf, "#f6f4ff", { align: "center" });
    }
    ctx2.restore();
    rrect(ctx2, glassX + glassW * 0.12, glassTop + glassH * 0.05, glassW * 0.16, glassH * 0.8, glassW * 0.08);
    ctx2.fillStyle = "rgba(255,255,255,0.10)";
    ctx2.fill();
    ctx2.save();
    ctx2.shadowColor = "#5fe6d6";
    ctx2.shadowBlur = 12;
    rrect(ctx2, glassX, glassTop, glassW, glassH, glassR);
    ctx2.strokeStyle = "#5fe6d6";
    ctx2.lineWidth = 3;
    ctx2.stroke();
    ctx2.restore();
    const my = y + h * 0.015;
    const mh = h * 0.085;
    const chuteTop = my + mh;
    const chuteBot = glassTop + 2;
    const topHalf = w * 0.16;
    const botHalf = w * 0.07;
    ctx2.beginPath();
    ctx2.moveTo(cx - topHalf, chuteTop);
    ctx2.lineTo(cx + topHalf, chuteTop);
    ctx2.lineTo(cx + botHalf, chuteBot);
    ctx2.lineTo(cx - botHalf, chuteBot);
    ctx2.closePath();
    const cg = ctx2.createLinearGradient(0, chuteTop, 0, chuteBot);
    cg.addColorStop(0, "#3a3350");
    cg.addColorStop(1, "#160f1f");
    ctx2.fillStyle = cg;
    ctx2.fill();
    ctx2.strokeStyle = "#2f9fa0";
    ctx2.lineWidth = 1.5;
    ctx2.stroke();
    const arrowCy = (chuteTop + chuteBot) / 2;
    const aw = w * 0.05;
    const ah = h * 0.028;
    ctx2.fillStyle = "#5fe6d6";
    ctx2.fillRect(cx - aw * 0.35, arrowCy - ah, aw * 0.7, ah);
    ctx2.beginPath();
    ctx2.moveTo(cx - aw, arrowCy);
    ctx2.lineTo(cx + aw, arrowCy);
    ctx2.lineTo(cx, arrowCy + ah);
    ctx2.closePath();
    ctx2.fill();
    const mx = x + w * 0.06;
    const mw = w * 0.88;
    rrect(ctx2, mx, my, mw, mh, 6);
    vgrad(ctx2, mx, my, mw, mh, "#241c34", "#0d0a16");
    ctx2.fill();
    rrect(ctx2, mx, my, mw, mh, 6);
    ctx2.strokeStyle = "#c98f24";
    ctx2.lineWidth = 2;
    ctx2.stroke();
    const mfs = Math.max(1, Math.floor(mw * 0.82 / (label.length * 6)));
    drawText(ctx2, label, cx, my + mh / 2 - mfs * 3.5, mfs, "#ffd23f", { align: "center", glow: "#ffd23f", glowBlur: 4 });
    const plateW = w * 0.74;
    const plateH = h * 0.07;
    const plateX = cx - plateW / 2;
    const plateY = baseY + baseH * 0.28;
    rrect(ctx2, plateX, plateY, plateW, plateH, 5);
    ctx2.fillStyle = "#0d0a16";
    ctx2.fill();
    rrect(ctx2, plateX, plateY, plateW, plateH, 5);
    ctx2.strokeStyle = "#2f9fa0";
    ctx2.lineWidth = 1.5;
    ctx2.stroke();
    const sfs = Math.max(1, Math.floor(plateW / (sublabel.length * 6)));
    drawText(ctx2, sublabel, cx, plateY + plateH / 2 - sfs * 3.5, sfs, "#5fe6d6", {
      align: "center",
      glow: "#2f9fa0",
      glowBlur: 3
    });
    ctx2.restore();
  }

  // src/render/atlas.ts
  var CABINET_CROPS = [
    { sx: 83, sy: 108, sw: 316, sh: 563 },
    { sx: 469, sy: 109, sw: 320, sh: 562 },
    { sx: 856, sy: 109, sw: 318, sh: 562 },
    { sx: 1231, sy: 109, sw: 347, sh: 562 },
    { sx: 1625, sy: 108, sw: 325, sh: 563 }
  ];
  function cabinetSkinIndex(id) {
    return hashStr(id) % CABINET_CROPS.length;
  }
  function cabinetCropFor(id) {
    return CABINET_CROPS[cabinetSkinIndex(id)];
  }
  var CAB_WINDOWS = {
    white: {
      marquee: { x: 0.075, y: 0.142, w: 0.901, h: 0.056 },
      screen: { x: 0.099, y: 0.194, w: 0.853, h: 0.303 },
      power: { x: 0.089, y: 0.502, w: 0.874, h: 0.023 }
    },
    blue: {
      marquee: { x: 0.033, y: 0.157, w: 0.895, h: 0.056 },
      screen: { x: 0.043, y: 0.207, w: 0.875, h: 0.302 },
      power: { x: 0.036, y: 0.514, w: 0.895, h: 0.021 }
    },
    magenta: {
      marquee: { x: 0.051, y: 0.206, w: 0.878, h: 0.056 },
      screen: { x: 0.064, y: 0.254, w: 0.849, h: 0.284 },
      power: { x: 0.048, y: 0.543, w: 0.878, h: 0.02 }
    },
    purple: {
      marquee: { x: 0.046, y: 0.211, w: 0.902, h: 0.056 },
      screen: { x: 0.08, y: 0.263, w: 0.834, h: 0.276 },
      power: { x: 0.064, y: 0.543, w: 0.865, h: 0.02 }
    },
    amber: {
      marquee: { x: 0.071, y: 0.249, w: 0.858, h: 0.056 },
      screen: { x: 0.111, y: 0.301, w: 0.776, h: 0.26 },
      power: { x: 0.108, y: 0.563, w: 0.789, h: 0.019 }
    }
  };
  var STAGE_CABINETS = [
    { key: "white", asset: "projCabStage1", accent: "#e8ecf5", glow: "#aab6cf", ...CAB_WINDOWS.white },
    { key: "blue", asset: "projCabStage2", accent: "#5fb4ff", glow: "#4aa3ff", ...CAB_WINDOWS.blue },
    { key: "magenta", asset: "projCabStage3", accent: "#e15ad8", glow: "#c23cc0", ...CAB_WINDOWS.magenta },
    { key: "purple", asset: "projCabStage4", accent: "#b98cff", glow: "#9a6cff", ...CAB_WINDOWS.purple },
    { key: "amber", asset: "projCabStage5", accent: "#ff9a3c", glow: "#ff7a1a", ...CAB_WINDOWS.amber }
  ];
  function stageCabinet(stageIndex) {
    const i = Math.max(0, Math.min(STAGE_CABINETS.length - 1, stageIndex | 0));
    return STAGE_CABINETS[i];
  }
  function stageAccent(stageIndex) {
    return stageCabinet(stageIndex).accent;
  }
  var HOME_LEVEL_CABINET_CROPS = [
    { sx: 35, sy: 141, sw: 299, sh: 637 },
    { sx: 392, sy: 141, sw: 307, sh: 636 },
    { sx: 746, sy: 141, sw: 304, sh: 636 },
    { sx: 1079, sy: 102, sw: 336, sh: 676 },
    { sx: 1426, sy: 102, sw: 315, sh: 676 }
  ];
  function homeLevelCabinetCrop(stageIndex) {
    const i = Math.max(0, Math.min(HOME_LEVEL_CABINET_CROPS.length - 1, stageIndex | 0));
    return HOME_LEVEL_CABINET_CROPS[i];
  }
  var LEVEL_UIKIT_CROPS = [
    [
      { sx: 42, sy: 69, sw: 289, sh: 180 },
      { sx: 389, sy: 71, sw: 281, sh: 178 },
      { sx: 711, sy: 68, sw: 284, sh: 181 },
      { sx: 1036, sy: 46, sw: 330, sh: 203 },
      { sx: 1366, sy: 43, sw: 299, sh: 206 }
    ],
    [
      { sx: 77, sy: 286, sw: 215, sh: 230 },
      { sx: 411, sy: 293, sw: 233, sh: 226 },
      { sx: 727, sy: 279, sw: 246, sh: 255 },
      { sx: 1054, sy: 272, sw: 267, sh: 277 },
      { sx: 1381, sy: 279, sw: 281, sh: 266 }
    ],
    [
      { sx: 41, sy: 566, sw: 277, sh: 99 },
      { sx: 384, sy: 567, sw: 275, sh: 98 },
      { sx: 711, sy: 567, sw: 276, sh: 98 },
      { sx: 1036, sy: 567, sw: 285, sh: 98 },
      { sx: 1372, sy: 570, sw: 279, sh: 93 }
    ],
    [
      { sx: 82, sy: 708, sw: 184, sh: 150 },
      { sx: 422, sy: 712, sw: 193, sh: 146 },
      { sx: 761, sy: 715, sw: 185, sh: 145 },
      { sx: 1078, sy: 714, sw: 185, sh: 148 },
      { sx: 1419, sy: 714, sw: 183, sh: 142 }
    ]
  ];
  var HOME_CABINET_SCREEN = [
    { cx: 0.5, cy: 0.364 },
    { cx: 0.5, cy: 0.364 },
    { cx: 0.502, cy: 0.364 },
    { cx: 0.512, cy: 0.364 },
    { cx: 0.498, cy: 0.364 }
  ];
  function homeCabinetScreen(stageIndex) {
    const i = Math.max(0, Math.min(HOME_CABINET_SCREEN.length - 1, stageIndex | 0));
    return HOME_CABINET_SCREEN[i];
  }
  function uiKitCrop(row, stageIndex) {
    const s = Math.max(0, Math.min(4, stageIndex | 0));
    return LEVEL_UIKIT_CROPS[row][s];
  }
  var uiKitBadge = (stage2) => uiKitCrop(1, stage2);
  var uiKitEndcap = (stage2) => uiKitCrop(2, stage2);
  var PLAYER_PORTRAIT_CROP = { sx: 1065, sy: 128, sw: 478, sh: 532 };
  var PLAYER_BODY_CROP = { sx: 18, sy: 22, sw: 356, sh: 751 };
  var SYNC_STATE_CROPS = {
    default: { sx: 18, sy: 0, sw: 580, sh: 557 },
    hover: { sx: 723, sy: 0, sw: 567, sh: 557 },
    pressed: { sx: 1409, sy: 0, sw: 582, sh: 557 }
  };
  var LOGO_FRAME_ALPHA = {
    homeLogo: { x0: 0.0115, y0: 0.0253, x1: 0.9872, y1: 0.9733 },
    homeLogoDropout: { x0: 0.0217, y0: 0.0309, x1: 0.9764, y1: 0.9677 },
    homeLogoBurst: { x0: 0.0217, y0: 0.0309, x1: 0.977, y1: 0.9677 }
  };
  var REVEAL_FRAME_ASSETS = [
    "revealFrameLegendary",
    "revealFrameEpic",
    "revealFrameRare",
    "revealFrameUncommon",
    "revealFrameCommon"
  ];
  function revealFrameImage(rarityOrderIndex) {
    const i = Math.max(0, Math.min(REVEAL_FRAME_ASSETS.length - 1, rarityOrderIndex | 0));
    return assets.get(REVEAL_FRAME_ASSETS[i]);
  }
  function achIconAsset(id) {
    const map = {
      first_coin: "achFirstCoin",
      warm_machine: "achWarmMachine",
      neon_night: "achNeonNight",
      million: "achMillion",
      royalty: "achRoyalty",
      first_pull: "achFirstPull",
      wall_starter: "achWallStarter",
      dupe_luck: "achDupeLuck",
      legendary_drop: "achLegendaryDrop"
    };
    return map[id] ?? "achFirstCoin";
  }
  function statTileAsset(key) {
    const map = {
      tokensSync: "statTokensSync",
      lifetimeTokens: "statLifetimeTokens",
      coinsMinted: "statCoinsMinted",
      cabinetLevel: "statCabinetLevel",
      provider: "statProvider",
      coinPower: "statCoinPower",
      recentToken: "statRecentToken",
      recentCoin: "statRecentCoin"
    };
    return map[key];
  }
  var FRAME_ANCHORS = {
    // coin_hud_plaque / token_hud_plaque (698x215): baked coin/token medallion on
    // the LEFT; the number sits in the dark recessed window to its right.
    hudPlaque: { aspect: 698 / 215, textWin: { cx: 0.62, cy: 0.52, w: 0.6, h: 0.52 } },
    // price_tag_plaque (377x165): baked coin left, price in the window to its right.
    priceTag: { aspect: 377 / 165, textWin: { cx: 0.63, cy: 0.5, w: 0.56, h: 0.6 } },
    // title_plaque (766x430): title text centered in the dark banner window.
    titlePlaque: { aspect: 766 / 430, textWin: { cx: 0.5, cy: 0.52, w: 0.9, h: 0.4 } },
    // progress_plaque (520x131): unlocked count centered in the thin window.
    progressPlaque: { aspect: 520 / 131, textWin: { cx: 0.5, cy: 0.4, w: 0.86, h: 0.5 } },
    // back_button (185x119): cyan arrow baked left; optional label in right window.
    backButton: { aspect: 185 / 119, textWin: { cx: 0.64, cy: 0.5, w: 0.5, h: 0.6 } },
    // reward_ticket_frame (326x197): icon + label inside the central window.
    rewardTicket: { aspect: 326 / 197, win: { cx: 0.5, cy: 0.5, w: 0.62, h: 0.82 } },
    // card_unlocked (283x450): star topper (top ~16%), inner display window, coin
    // medallion (bottom ~18%). Icon/name/desc/date sit inside the window.
    cardUnlocked: {
      aspect: 283 / 450,
      win: { cx: 0.5, cy: 0.49, w: 0.8, h: 0.62 },
      icon: { cx: 0.5, cy: 0.34 },
      name: { cx: 0.5, cy: 0.55 },
      desc: { cx: 0.5, cy: 0.64 },
      date: { cx: 0.5, cy: 0.75 }
    },
    // card_locked (288x447): gem topper, inner window, baked padlock at bottom.
    cardLocked: {
      aspect: 288 / 447,
      win: { cx: 0.5, cy: 0.49, w: 0.8, h: 0.62 },
      icon: { cx: 0.5, cy: 0.36 },
      name: { cx: 0.5, cy: 0.58 },
      locked: { cx: 0.5, cy: 0.72 }
    }
  };
  var UTIL_COLS = 4;
  var UTIL_ROWS = 3;
  var UTIL_CELL_W = 1536 / UTIL_COLS;
  var UTIL_CELL_H = 1024 / UTIL_ROWS;
  var UTIL_COL = { soundOn: 0, muted: 1, settings: 2, help: 3 };
  var UTIL_ROW = { normal: 0, hover: 1, pressed: 2 };
  function utilityButtonCrop(key, state) {
    return {
      sx: UTIL_COL[key] * UTIL_CELL_W,
      sy: UTIL_ROW[state] * UTIL_CELL_H,
      sw: UTIL_CELL_W,
      sh: UTIL_CELL_H
    };
  }
  var V2_WELLS = { icon: 0.168, name: 0.502, chip: 0.832, nameW: 0.47, cy: 0.5 };
  var LEG_WELLS = { icon: 0.118, name: 0.503, chip: 0.879, nameW: 0.5, cy: 0.5 };
  var V2_ROW_CROPS = {
    common: { sx: 0, sy: 126, sw: 972, sh: 202 },
    uncommon: { sx: 0, sy: 407, sw: 972, sh: 203 },
    rare: { sx: 0, sy: 690, sw: 972, sh: 203 },
    epic: { sx: 0, sy: 971, sw: 972, sh: 202 }
  };
  function resultRowArt(rarity) {
    if (rarity === "legendary") {
      return { asset: "capsuleResultRowLegendary", crop: { sx: 4, sy: 4, sw: 825, sh: 186 }, wells: LEG_WELLS };
    }
    return { asset: "capsuleResultRows", crop: V2_ROW_CROPS[rarity], wells: V2_WELLS };
  }

  // src/render/hud.ts
  var GOLD = "#ffd23f";
  var TOKEN_GLOW = "#9a6cff";
  var INK = "#f6f4ff";
  function hudPlaqueHeight(w) {
    return Math.round(w / FRAME_ANCHORS.hudPlaque.aspect);
  }
  function fitNumber(g, x, y, w, h, value, color, glow) {
    const win = FRAME_ANCHORS.hudPlaque.textWin;
    const maxW = w * win.w * 0.94;
    const maxH = h * win.h * 0.8;
    const w1 = Math.max(1, measureText(value, 1));
    let s = Math.min(maxH / GLYPH_H, maxW / w1);
    s = Math.max(1, Math.min(3.4, s));
    const cx = x + w * win.cx;
    const top = y + h * win.cy - GLYPH_H * s / 2;
    drawText(g, value, cx, top, s, color, { align: "center", glow, glowBlur: 3 });
  }
  function drawCoinHud(g, assets2, x, y, w, value) {
    const h = hudPlaqueHeight(w);
    const img = assets2.get("coinHudPlaque");
    if (img) {
      drawImageSmooth(g, img, x, y, w, h);
      fitNumber(g, x, y, w, h, value, GOLD, GOLD);
    } else {
      rrect(g, x, y, w, h, h * 0.26);
      g.fillStyle = "rgba(12,8,24,0.92)";
      g.fill();
      g.strokeStyle = GOLD;
      g.lineWidth = 3;
      g.stroke();
      drawCoin(g, x + h * 0.52, y + h * 0.5, h * 0.3);
      fitNumber(g, x, y, w, h, value, GOLD, GOLD);
    }
    return h;
  }
  function drawTokenHud(g, assets2, x, y, w, value) {
    const h = hudPlaqueHeight(w);
    const img = assets2.get("tokenHudPlaque");
    if (img) {
      drawImageSmooth(g, img, x, y, w, h);
      fitNumber(g, x, y, w, h, value, INK, TOKEN_GLOW);
    } else {
      rrect(g, x, y, w, h, h * 0.26);
      g.fillStyle = "rgba(12,8,24,0.92)";
      g.fill();
      g.strokeStyle = TOKEN_GLOW;
      g.lineWidth = 3;
      g.stroke();
      drawSprite(g, "tokenChip", x + h * 0.28, y + h * 0.26, h * 0.055);
      fitNumber(g, x, y, w, h, value, INK, TOKEN_GLOW);
    }
    return h;
  }

  // src/render/demoPlaque.ts
  var CYAN = "#5fe6d6";
  var GOLD2 = "#ffd23f";
  var INK2 = "#f6f4ff";
  function drawDemoPlaque(g, ctx2, x, y, w = 156) {
    if (ctx2.store.state.mode !== "demo") return;
    const h = 34;
    const hovered = ctx2.stage.hotspot({
      x,
      y,
      w,
      h,
      cursor: "help",
      id: "demo-identity",
      onClick: () => ctx2.openHelp()
    });
    if (hovered) {
      g.save();
      g.shadowColor = CYAN;
      g.shadowBlur = 14;
      panel(g, x, y, w, h, { radius: 6, fill: "#102337", border: CYAN, borderWidth: 2 });
      g.restore();
    } else {
      panel(g, x, y, w, h, { radius: 6, fill: "#102337", border: "#2f9fa0", borderWidth: 2 });
    }
    for (let i = 0; i < 3; i++) {
      g.fillStyle = i === 1 ? GOLD2 : CYAN;
      g.fillRect(x + 9 + i * 6, y + 13, 3, 8);
    }
    const label = t("ui.demoArcade");
    const maxW = w - 36;
    const scale = Math.max(1.05, Math.min(1.55, maxW / Math.max(1, measureText(label, 1))));
    drawText(g, label, x + 31, y + (h - GLYPH_H * scale) / 2, scale, INK2, { glow: CYAN, glowBlur: 2 });
    if (!hovered) return;
    const message = t("ui.demoDisclosure");
    const lines = wrapText(message, 1.25, 250);
    const tipW = 278;
    const lineH = Math.max(11, GLYPH_H * 1.25);
    const tipH = 18 + lines.length * (lineH + 4);
    const tipX = Math.max(12, Math.min(ctx2.stage.width - tipW - 12, x + w - tipW));
    const tipY = Math.min(ctx2.stage.height - tipH - 12, y + h + 10);
    panel(g, tipX, tipY, tipW, tipH, { radius: 8, fill: "rgba(10,7,20,0.97)", border: CYAN, borderWidth: 2 });
    let ty = tipY + 10;
    for (const line of lines) {
      drawText(g, line, tipX + 12, ty, 1.25, INK2, { shadow: "rgba(0,0,0,0.7)" });
      ty += lineH + 4;
    }
    g.fillStyle = "rgba(255,210,63,0.55)";
    rrect(g, tipX + 10, tipY + tipH - 5, tipW - 20, 2, 1);
    g.fill();
  }

  // src/render/measured.ts
  var DISPLAY_X = [0.2287, 0.2999, 0.3711, 0.4423, 0.5135, 0.5851, 0.6558, 0.727, 0.7982, 0.8694];
  var DISPLAY_Y = [0.2144, 0.3554, 0.4978, 0.6401, 0.7843];
  var DISPLAY_SLOTS = DISPLAY_Y.map(
    (y) => DISPLAY_X.map((x) => ({ x, y }))
  );
  var DISPLAY_RARITY_RAILS = DISPLAY_Y.map((y) => ({ x: 0.1563, y }));
  var PRIZE_WALL_SLOTS = [[{ "x": 0.24, "y": 0.211 }, { "x": 0.4125, "y": 0.211 }, { "x": 0.5775, "y": 0.211 }, { "x": 0.7425, "y": 0.211 }], [{ "x": 0.24, "y": 0.338 }, { "x": 0.4125, "y": 0.338 }, { "x": 0.5775, "y": 0.338 }, { "x": 0.7425, "y": 0.338 }], [{ "x": 0.24, "y": 0.455 }, { "x": 0.4125, "y": 0.455 }, { "x": 0.5775, "y": 0.455 }, { "x": 0.7425, "y": 0.455 }], [{ "x": 0.24, "y": 0.568 }, { "x": 0.4125, "y": 0.568 }, { "x": 0.5775, "y": 0.568 }, { "x": 0.7425, "y": 0.568 }], [{ "x": 0.24, "y": 0.692 }, { "x": 0.4125, "y": 0.692 }, { "x": 0.5775, "y": 0.692 }, { "x": 0.7425, "y": 0.692 }]];
  var ROOM_CENTER_X = 0.5167;

  // src/screens/roomDecor.ts
  var GOLD3 = "#ffd23f";
  var CYAN2 = "#5fe6d6";
  var MAGENTA = "#e15ad8";
  var GREEN = "#5fd66f";
  var INK3 = "#f6f4ff";
  var DECORATION_ZONES = {
    wall: { x: 405, y: 214, w: 198, h: 286 },
    floor: { x: 398, y: 768, w: 214, h: 100 },
    buddy: { x: 1080, y: 700, w: 132, h: 136 }
  };
  var DECOR_INVENTORY = { x: 16, y: 878, w: 1568, h: 112 };
  var DECOR_PAGE_SIZE = 8;
  var DECOR_ENTRY = { x: 1084, y: 838, w: 124, h: 54 };
  var WALL_BOARD_ART = { w: 198, h: 248, rails: [65 / 248, 172 / 248] };
  var FLOOR_RISER_ART = { w: 232, h: 48, surface: 25 / 48 };
  var BUDDY_RUG_ART = { w: 148, h: 70, sit: 0.52 };
  var WALL_ROW_Y = [0.25, 0.75];
  function clamp012(v) {
    return Math.max(0, Math.min(1, v));
  }
  function wallBoardRect() {
    const z = DECORATION_ZONES.wall;
    const h = z.w * (WALL_BOARD_ART.h / WALL_BOARD_ART.w);
    return { x: z.x, y: z.y + (z.h - h) / 2, w: z.w, h };
  }
  function wallRailY(row) {
    const b = wallBoardRect();
    return b.y + b.h * WALL_BOARD_ART.rails[row];
  }
  function floorRiserRect() {
    const z = DECORATION_ZONES.floor;
    const w = z.w + 18;
    const h = w * (FLOOR_RISER_ART.h / FLOOR_RISER_ART.w);
    return { x: z.x - 9, y: z.y + z.h - h, w, h };
  }
  function floorBaselineY() {
    const r = floorRiserRect();
    return r.y + r.h * FLOOR_RISER_ART.surface + 2;
  }
  function buddyRugRect() {
    const z = DECORATION_ZONES.buddy;
    const w = z.w + 16;
    const h = w * (BUDDY_RUG_ART.h / BUDDY_RUG_ART.w);
    return { x: z.x - 8, y: DECOR_ENTRY.y - 2 - h, w, h };
  }
  function buddyBaselineY() {
    const r = buddyRugRect();
    return r.y + r.h * BUDDY_RUG_ART.sit;
  }
  function drawPencil(g, cx, cy, s, color) {
    g.save();
    g.strokeStyle = color;
    g.fillStyle = color;
    g.lineWidth = 2;
    g.lineCap = "round";
    g.beginPath();
    g.moveTo(cx - s * 0.42, cy + s * 0.42);
    g.lineTo(cx + s * 0.42, cy - s * 0.42);
    g.stroke();
    g.beginPath();
    g.moveTo(cx - s * 0.5, cy + s * 0.5);
    g.lineTo(cx - s * 0.5 + 4, cy + s * 0.5 - 1.5);
    g.lineTo(cx - s * 0.5 + 1.5, cy + s * 0.5 - 4);
    g.closePath();
    g.fill();
    g.restore();
  }
  function rarityGlow(rarity) {
    const c = RARITIES[rarity].glow;
    return c.length === 7 ? c + "55" : c;
  }
  var RoomDecorController = class {
    constructor(ctx2) {
      this.ctx = ctx2;
      /** Hovered world prize; rendered last so its tooltip clears machines/UI. */
      this.roomDisplayTip = null;
      this.decorEditing = false;
      this.decorDraft = [];
      this.decorDraftIsAutomatic = false;
      this.decorInitial = [];
      this.decorInitialIsAutomatic = false;
      this.decorFilter = "all";
      this.decorPage = 0;
      this.decorSelectedId = null;
      this.decorDrag = null;
      this.decorNotice = null;
      /** While armed (a deadline), the next CLOSE click discards unsaved changes. */
      this.decorCloseArmedUntil = 0;
    }
    /** Whether decorate mode is open (RoomScreen swaps its frame layout on it). */
    get editing() {
      return this.decorEditing;
    }
    /** Leave decorate mode and drop transient interaction state (screen enter). */
    reset() {
      this.decorEditing = false;
      this.decorDrag = null;
    }
    // ---- resting room view ---------------------------------------------------
    /** Draw the saved arrangement, or a tidy live arrangement of the newest
     * prize in each family until the player saves a custom layout. While the
     * decoration editor is open this draws nothing: the editor redraws the whole
     * working set ABOVE its modal dim so the arrangement is the bright focus. */
    drawDisplays(g, now) {
      this.roomDisplayTip = null;
      if (this.decorEditing) return;
      const placements = resolveRoomDecorations(this.ctx.store.state.owned, this.ctx.store.state.roomDecorations);
      this.drawRoomDisplayInfrastructure(g, false, new Set(placements.map((p) => p.zone)));
      for (const placement of this.sortedPlacements(placements)) {
        const collectible = byId[placement.collectibleId];
        if (!collectible) continue;
        const point = this.decorationPoint(placement, collectible);
        const size = this.decorationSize(collectible);
        const bob = placement.zone === "buddy" ? Math.sin(now / 480 + this.decorBobPhase(collectible.id)) * 3 : 0;
        const hovered = this.ctx.stage.hotspot({
          x: point.x - size / 2,
          y: point.y - size / 2,
          w: size,
          h: size,
          cursor: "help",
          id: "room-display-" + collectible.id
        });
        this.drawRoomCollectible(g, collectible, point.x, point.y + bob, size, hovered, placement.zone !== "wall");
        if (hovered) this.roomDisplayTip = { collectible, cx: point.x, cy: point.y };
      }
    }
    /** Stable draw order: wall behind floor behind buddies, top-down inside a
     * zone, so overlap between neighbouring prizes never flickers frame to frame. */
    sortedPlacements(placements) {
      const zoneOrder = { wall: 0, floor: 1, buddy: 2 };
      return [...placements].sort((a, b) => zoneOrder[a.zone] - zoneOrder[b.zone] || a.y - b.y);
    }
    decorBobPhase(id) {
      let hash = 0;
      for (let i = 0; i < id.length; i++) hash += id.charCodeAt(i);
      return hash;
    }
    /** The zones' furniture. Every display area is a physical object prizes rest
     * ON — a wall pegboard, a floor riser, a buddy rug — so nothing floats over
     * the painted room. Collection milestones upgrade the furniture: the tier-1
     * neon shelf mounts under the pegboard, the tier-3 collector pedestal
     * replaces the plain riser. Each asset has a procedural fallback. */
    drawRoomDisplayInfrastructure(g, editing = false, occupied) {
      const tier = this.ctx.store.collectionMilestoneTier();
      const wants = (zone) => editing || !occupied || occupied.has(zone);
      const board = wallBoardRect();
      if (wants("wall")) {
        const boardImg = this.ctx.assets.get("decorWallBoard");
        if (boardImg) {
          drawImageSmooth(g, boardImg, board.x, board.y, board.w, board.h);
        } else {
          this.drawWallBoardFallback(g, board);
        }
      }
      if (wants("wall") && tier >= 1) {
        const shelf = this.ctx.assets.get("collectionNeonShelf");
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
      if (wants("floor")) {
        const riser = floorRiserRect();
        const pedestal = tier >= 3 ? this.ctx.assets.get("collectionPedestal") : null;
        const riserImg = this.ctx.assets.get("decorFloorRiser");
        if (pedestal) {
          drawImageContain(g, pedestal, riser.x + riser.w / 2, riser.y + riser.h - riser.h / 2, riser.w, riser.h + 12);
        } else if (riserImg) {
          drawImageSmooth(g, riserImg, riser.x, riser.y, riser.w, riser.h);
        } else {
          this.drawFloorRiserFallback(g, riser);
        }
      }
      if (wants("buddy")) {
        const rug = buddyRugRect();
        const rugImg = this.ctx.assets.get("decorBuddyRug");
        if (rugImg) {
          drawImageSmooth(g, rugImg, rug.x, rug.y, rug.w, rug.h);
        } else {
          this.drawBuddyRugFallback(g, rug);
        }
      }
    }
    /** Procedural pegboard: dark panel, peg-hole texture, two magenta rails. */
    drawWallBoardFallback(g, b) {
      g.save();
      rrect(g, b.x, b.y, b.w, b.h, 6);
      g.fillStyle = "#1b1230";
      g.fill();
      g.strokeStyle = "#3a3452";
      g.lineWidth = 3;
      g.stroke();
      g.fillStyle = "rgba(10,7,20,0.85)";
      for (let py = b.y + 12; py < b.y + b.h - 10; py += 14) {
        for (let px = b.x + 10; px < b.x + b.w - 8; px += 14) {
          g.fillRect(px, py, 2, 2);
        }
      }
      for (const row of [0, 1]) {
        const y = b.y + b.h * WALL_BOARD_ART.rails[row];
        g.save();
        g.shadowColor = MAGENTA;
        g.shadowBlur = 6;
        g.fillStyle = MAGENTA;
        g.fillRect(b.x + 8, y, b.w - 16, 2);
        g.restore();
        g.fillStyle = "#8a3a85";
        g.fillRect(b.x + 8, y + 2, b.w - 16, 1);
      }
      g.restore();
    }
    /** Procedural riser: checkered top, dark face, glowing gold lip. */
    drawFloorRiserFallback(g, r) {
      const topH = r.h * FLOOR_RISER_ART.surface;
      g.save();
      g.fillStyle = "#241a38";
      g.fillRect(r.x, r.y, r.w, topH);
      g.fillStyle = "#2c2144";
      const cell = 16;
      for (let i = 0; i < Math.ceil(r.w / cell); i++) {
        if (i % 2 === 0) g.fillRect(r.x + i * cell, r.y, Math.min(cell, r.x + r.w - (r.x + i * cell)), topH);
      }
      g.save();
      g.shadowColor = GOLD3;
      g.shadowBlur = 5;
      g.fillStyle = GOLD3;
      g.fillRect(r.x, r.y + topH, r.w, 2);
      g.restore();
      g.fillStyle = "#171126";
      g.fillRect(r.x, r.y + topH + 2, r.w, r.h - topH - 2);
      g.fillStyle = CYAN2;
      for (let i = 1; i <= 4; i++) {
        g.fillRect(r.x + r.w * i / 5, r.y + topH + (r.h - topH) / 2, 3, 3);
      }
      g.restore();
    }
    /** Procedural rug: cyan-bordered oval with a gold star motif. */
    drawBuddyRugFallback(g, r) {
      const cx = r.x + r.w / 2;
      const cy = r.y + r.h / 2;
      g.save();
      g.beginPath();
      g.ellipse(cx, cy, r.w / 2, r.h / 2, 0, 0, Math.PI * 2);
      g.fillStyle = "#1e1633";
      g.fill();
      g.strokeStyle = CYAN2;
      g.lineWidth = 2.5;
      g.stroke();
      g.beginPath();
      g.ellipse(cx, cy, r.w / 2 - 5, r.h / 2 - 4, 0, 0, Math.PI * 2);
      g.strokeStyle = "#2f8a80";
      g.lineWidth = 1;
      g.stroke();
      g.fillStyle = GOLD3;
      g.fillRect(cx - 1.5, cy - 6, 3, 12);
      g.fillRect(cx - 6, cy - 1.5, 12, 3);
      g.restore();
    }
    /** One scenery zone in the editor. Zones are living UI now: marching-ants
     * borders, corner brackets, a capacity readout, and drag-aware emphasis —
     * the zone that accepts the held prize glows while the others fall back. */
    drawDecorationZone(g, zone, color, now, activeZone) {
      const r = DECORATION_ZONES[zone];
      const engaged = activeZone === zone;
      const benched = activeZone !== null && !engaged;
      const used = this.decorDraft.filter((p) => p.zone === zone).length;
      const cap = ROOM_DECORATION_CAPACITY[zone];
      const full = used >= cap;
      const pulse2 = 0.5 + 0.5 * Math.sin(now / 300);
      g.save();
      if (benched) g.globalAlpha = 0.28;
      g.fillStyle = color + (engaged ? "26" : "14");
      g.fillRect(r.x, r.y, r.w, r.h);
      g.strokeStyle = engaged ? color : color + "b8";
      g.lineWidth = engaged ? 2.5 : 2;
      g.setLineDash([8, 7]);
      g.lineDashOffset = -(now / 45 % 15);
      if (engaged) {
        g.shadowColor = color;
        g.shadowBlur = 10 + 6 * pulse2;
      }
      g.strokeRect(r.x + 1, r.y + 1, r.w - 2, r.h - 2);
      g.setLineDash([]);
      g.shadowBlur = 0;
      const tick = 11;
      g.lineWidth = 2.5;
      g.beginPath();
      for (const [cx, cy, dx, dy] of [
        [r.x + 1, r.y + 1, 1, 1],
        [r.x + r.w - 1, r.y + 1, -1, 1],
        [r.x + 1, r.y + r.h - 1, 1, -1],
        [r.x + r.w - 1, r.y + r.h - 1, -1, -1]
      ]) {
        g.moveTo(cx + dx * tick, cy);
        g.lineTo(cx, cy);
        g.lineTo(cx, cy + dy * tick);
      }
      g.stroke();
      const plateY = zone === "floor" ? r.y - 30 : r.y + 8;
      const label = t("decor.zone." + zone);
      const capText = used + "/" + cap;
      const capW = measureText(capText, 1.2) + 12;
      let labelScale = 1.2;
      const labelMax = r.w - capW - 30;
      while (labelScale > 0.8 && measureText(label, labelScale) > labelMax) labelScale -= 0.05;
      const labelW = Math.min(labelMax, measureText(label, labelScale)) + 16;
      rrect(g, r.x + 8, plateY, labelW, 22, 4);
      g.fillStyle = "rgba(7,5,14,0.88)";
      g.fill();
      drawText(g, label, r.x + 16, plateY + 6 + (1.2 - labelScale) * 3, labelScale, color);
      rrect(g, r.x + r.w - capW - 8, plateY, capW, 22, 4);
      g.fillStyle = "rgba(7,5,14,0.88)";
      g.fill();
      drawText(g, capText, r.x + r.w - 14, plateY + 6, 1.2, full ? "#ff5c6a" : color, { align: "right" });
      g.restore();
    }
    decorationSize(collectible) {
      if (collectible.type === "sign") return 78;
      if (collectible.type === "badge") return 54;
      if (collectible.type === "buddy") return 72;
      return collectible.type === "trophy" ? 70 : 64;
    }
    /** Placement → sprite CENTER on screen. Prizes rest on furniture instead of
     * floating at free points: wall prizes hang centered on one of two hook
     * rails; floor/buddy prizes are bottom-anchored so their FEET sit on the
     * riser surface / rug line regardless of sprite size. x stays free (grid-
     * snapped) along the row. Stored y remains a 0..1 fraction so old saves and
     * sanitize round-trips keep working — it now selects/encodes the row. */
    decorationPoint(placement, collectible) {
      const zone = DECORATION_ZONES[placement.zone];
      const size = this.decorationSize(collectible);
      const padX = Math.min(size * 0.48, zone.w * 0.24);
      const x = zone.x + padX + placement.x * Math.max(0, zone.w - padX * 2);
      if (placement.zone === "wall") {
        const row = placement.y < 0.5 ? 0 : 1;
        return { x, y: wallRailY(row) + size / 2 - 6 };
      }
      const baseline = placement.zone === "floor" ? floorBaselineY() : buddyBaselineY();
      return { x, y: baseline - size / 2 };
    }
    /** Quantize a stored placement onto its zone's row structure so the ghost
     * previews and the final resting spot are byte-identical. */
    snapPlacementToRow(placement) {
      if (placement.zone === "wall") {
        return { ...placement, y: placement.y < 0.5 ? WALL_ROW_Y[0] : WALL_ROW_Y[1] };
      }
      return { ...placement, y: 0.5 };
    }
    drawRoomCollectible(g, collectible, cx, cy, size, hovered, floorItem) {
      if (floorItem) {
        g.save();
        g.fillStyle = "rgba(0,0,0,0.4)";
        g.beginPath();
        g.ellipse(cx, cy + size * 0.39, size * 0.38, size * 0.1, 0, 0, Math.PI * 2);
        g.fill();
        g.restore();
      } else {
        g.save();
        g.fillStyle = "rgba(0,0,0,0.32)";
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
    drawTooltip(g) {
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
        fill: "rgba(12,8,24,0.96)",
        border: rarity.color,
        borderWidth: 2
      });
      let nameScale = 1.7;
      const name = tCollectibleName(c.id);
      while (nameScale > 1 && measureText(name, nameScale) > w - pad * 2) nameScale -= 0.1;
      drawText(g, name, x + pad, y + 12, nameScale, INK3, { glow: rarity.glow, glowBlur: 3 });
      drawText(g, tRarity(c.rarity) + " / " + tType(c.type), x + pad, y + 33, 1.05, rarity.color);
      for (let i = 0; i < lines.length; i++) {
        drawText(g, lines[i], x + pad, y + 53 + i * 13, descScale, "#c8c2dc");
      }
    }
    drawEntry(g, now) {
      const x = 1084;
      const y = 838;
      const w = 124;
      const h = 54;
      const hovered = this.ctx.stage.hotspot({
        x,
        y,
        w,
        h,
        cursor: "pointer",
        id: "decorate-room",
        onClick: () => this.openDecorationEditor()
      });
      const placements = resolveRoomDecorations(this.ctx.store.state.owned, this.ctx.store.state.roomDecorations);
      const placedIds = new Set(placements.map((p) => p.collectibleId));
      const unplaced = roomDecorationCollectibles(this.ctx.store.state.owned).filter((c) => !placedIds.has(c.id)).length;
      const beckoning = unplaced > 0 && !hovered;
      const frame = this.ctx.assets.get("homeShopCard");
      const glow = hovered ? 12 : beckoning ? 7 + 4 * Math.sin(now / 420) : 0;
      if (frame) {
        if (glow > 0) {
          g.save();
          g.shadowColor = CYAN2;
          g.shadowBlur = glow;
          drawImageSmooth(g, frame, x, y, w, h);
          g.restore();
        }
        drawImageSmooth(g, frame, x, y, w, h);
      } else {
        panel(g, x, y, w, h, { radius: 6, fill: "rgba(10,7,20,0.9)", border: CYAN2, borderWidth: 2 });
      }
      drawPencil(g, x + 27, y + h / 2, 17, CYAN2);
      drawText(g, t("decor.edit"), x + 48, y + 21, 1.3, hovered ? "#ffffff" : CYAN2);
      if (unplaced > 0) {
        const pipX = x + w - 8;
        const pipY = y + 6;
        g.save();
        g.beginPath();
        g.arc(pipX, pipY, 9, 0, Math.PI * 2);
        g.fillStyle = GOLD3;
        g.shadowColor = GOLD3;
        g.shadowBlur = 6;
        g.fill();
        g.restore();
        drawText(g, String(Math.min(unplaced, 9)), pipX, pipY - 5, 1.1, "#241a06", { align: "center" });
        if (hovered) {
          const tip = t("decor.newPrizeHint");
          const tw = measureText(tip, 1.2) + 16;
          rrect(g, x + w / 2 - tw / 2, y - 28, tw, 22, 4);
          g.fillStyle = "rgba(7,5,14,0.94)";
          g.fill();
          drawText(g, tip, x + w / 2, y - 22, 1.2, GOLD3, { align: "center" });
        }
      }
    }
    // ---- decorate mode -------------------------------------------------------
    openDecorationEditor() {
      const saved = this.ctx.store.state.roomDecorations;
      this.decorDraft = resolveRoomDecorations(this.ctx.store.state.owned, saved).map((placement) => ({ ...placement }));
      this.decorDraftIsAutomatic = saved == null;
      this.decorInitial = this.decorDraft.map((placement) => ({ ...placement }));
      this.decorInitialIsAutomatic = this.decorDraftIsAutomatic;
      this.decorEditing = true;
      this.decorFilter = "all";
      this.decorPage = 0;
      this.decorSelectedId = null;
      this.decorDrag = null;
      this.decorNotice = null;
      this.decorCloseArmedUntil = 0;
      this.ctx.sound.click();
      this.ctx.stage.wake(900);
    }
    /** Unsaved when the draft differs from what the editor opened with. */
    decorDirty() {
      if (this.decorDraftIsAutomatic !== this.decorInitialIsAutomatic) return true;
      if (this.decorDraft.length !== this.decorInitial.length) return true;
      const key = (p) => p.collectibleId + "@" + p.zone + ":" + p.x + "," + p.y;
      const initial = new Set(this.decorInitial.map(key));
      return this.decorDraft.some((p) => !initial.has(key(p)));
    }
    /** The zone the currently held (drag) or selected prize belongs to; the
     * editor uses it to spotlight the one zone that will accept a drop. */
    decorActiveZone() {
      const id = this.decorDrag?.moved ? this.decorDrag.collectibleId : this.decorSelectedId;
      if (!id) return null;
      const collectible = byId[id];
      return collectible ? roomDecorationZoneFor(collectible.type) : null;
    }
    /** The selected BENCH prize's id if it belongs to `zone` and is still
     * unplaced — i.e. a click inside that zone should place it. */
    pendingBenchSelectionFor(zone) {
      const id = this.decorSelectedId;
      if (!id) return null;
      if (this.decorDraft.some((placement) => placement.collectibleId === id)) return null;
      const collectible = byId[id];
      if (!collectible || roomDecorationZoneFor(collectible.type) !== zone) return null;
      return id;
    }
    closeDecorationEditor() {
      this.decorEditing = false;
      this.decorDrag = null;
      this.decorSelectedId = null;
      this.decorCloseArmedUntil = 0;
      this.ctx.stage.suppressClicks(400);
    }
    drawEditor(g, now) {
      this.ctx.stage.hotspot({
        x: 0,
        y: 0,
        w: this.ctx.stage.width,
        h: this.ctx.stage.height,
        id: "decor-editor-shield",
        // Clicking open room space (outside every zone/bench/button) drops the
        // current selection — the natural "never mind" gesture.
        onClick: () => {
          this.decorSelectedId = null;
        }
      });
      g.fillStyle = "rgba(4,3,12,0.52)";
      g.fillRect(0, 0, this.ctx.stage.width, DECOR_INVENTORY.y);
      const activeZone = this.decorActiveZone();
      this.drawRoomDisplayInfrastructure(g, true);
      for (const zone of ["wall", "floor", "buddy"]) {
        this.drawDecorationZone(g, zone, this.decorZoneColor(zone), now, activeZone);
        const rect2 = DECORATION_ZONES[zone];
        this.ctx.stage.hotspot({
          ...rect2,
          id: "decor-zone-" + zone,
          cursor: this.decorSelectedId ? "crosshair" : "default",
          onClick: () => {
            if (this.decorSelectedId) this.placeDecoration(this.decorSelectedId, zone, { ...this.ctx.stage.mouse });
          }
        });
      }
      this.drawDecorationTitle(g);
      this.drawEditorPlacements(g, now);
      this.drawDecorationInventory(g, now);
      this.drawSelectionGhost(g, now);
      this.drawDecorationDrag(g, now);
      if (this.decorNotice && now < this.decorNotice.until) {
        const border = this.decorNotice.warn ? "#ff5c6a" : MAGENTA;
        panel(g, 580, 830, 440, 38, { radius: 6, fill: "rgba(8,5,18,0.94)", border, borderWidth: 2 });
        drawText(g, t(this.decorNotice.key), 800, 841, 1.55, INK3, { align: "center" });
      }
    }
    decorZoneColor(zone) {
      return zone === "wall" ? MAGENTA : zone === "floor" ? GOLD3 : CYAN2;
    }
    /** Editor headline: a physical mode plate hanging under the marquee. */
    drawDecorationTitle(g) {
      panel(g, 632, 118, 336, 36, {
        radius: 5,
        fill: "rgba(5,7,16,0.9)",
        border: "rgba(95,230,214,0.72)",
        borderWidth: 1
      });
      drawText(g, t("decor.title"), 800, 128, 1.8, CYAN2, { align: "center", glow: CYAN2, glowBlur: 4 });
    }
    /** Placed prizes inside the editor: bright above the dim, hover ring +
     * grab affordance, selection brackets, and a floating × remover so a prize
     * can be sent back to the bench without knowing the drag-down gesture. */
    drawEditorPlacements(g, now) {
      for (const placement of this.sortedPlacements(this.decorDraft)) {
        if (this.decorDrag?.moved && this.decorDrag.collectibleId === placement.collectibleId) continue;
        const collectible = byId[placement.collectibleId];
        if (!collectible) continue;
        const point = this.decorationPoint(placement, collectible);
        const size = this.decorationSize(collectible);
        const selected = this.decorSelectedId === collectible.id;
        const hovered = this.ctx.stage.hotspot({
          x: point.x - size / 2,
          y: point.y - size / 2,
          w: size,
          h: size,
          id: "decor-placed-" + collectible.id,
          cursor: "grab",
          onClick: () => {
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
          onDragEnd: (end) => this.endDecorationDrag(end)
        });
        this.drawRoomCollectible(g, collectible, point.x, point.y, size, hovered || selected, placement.zone !== "wall");
        if (hovered && !selected) {
          g.save();
          g.strokeStyle = "rgba(246,244,255,0.65)";
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
    drawDecorationRemoveButton(g, collectibleId, cx, cy) {
      const r = 11;
      const hovered = this.ctx.stage.hotspot({
        x: cx - r,
        y: cy - r,
        w: r * 2,
        h: r * 2,
        id: "decor-remove-" + collectibleId,
        cursor: "pointer",
        onClick: () => this.removeDecoration(collectibleId)
      });
      g.save();
      g.beginPath();
      g.arc(cx, cy, r, 0, Math.PI * 2);
      g.fillStyle = hovered ? "#ff5c6a" : "rgba(12,8,22,0.95)";
      g.fill();
      g.strokeStyle = hovered ? "#ffffff" : "#ff5c6a";
      g.lineWidth = 2;
      g.stroke();
      const arm = 4;
      g.strokeStyle = hovered ? "#ffffff" : "#ff8d96";
      g.beginPath();
      g.moveTo(cx - arm, cy - arm);
      g.lineTo(cx + arm, cy + arm);
      g.moveTo(cx + arm, cy - arm);
      g.lineTo(cx - arm, cy + arm);
      g.stroke();
      g.restore();
    }
    removeDecoration(collectibleId) {
      const had = this.decorDraft.some((placement) => placement.collectibleId === collectibleId);
      if (!had) return;
      this.decorDraft = this.decorDraft.filter((placement) => placement.collectibleId !== collectibleId);
      this.decorDraftIsAutomatic = false;
      if (this.decorSelectedId === collectibleId) this.decorSelectedId = null;
      this.ctx.sound.unplace();
      this.setDecorNotice("decor.stored");
    }
    /** When a bench prize is selected (click-to-place mode) a translucent ghost
     * follows the cursor over its home zone, snapped to the real resting spot,
     * so the player sees exactly where the prize will land before clicking. */
    drawSelectionGhost(g, now) {
      if (!this.decorSelectedId || this.decorDrag?.moved) return;
      const collectible = byId[this.decorSelectedId];
      if (!collectible) return;
      if (this.decorDraft.some((placement) => placement.collectibleId === collectible.id)) return;
      const zone = roomDecorationZoneFor(collectible.type);
      const mouse = this.ctx.stage.mouse;
      if (!zone || this.decorationZoneAt(mouse) !== zone) return;
      const snapped = this.snappedPlacement(collectible.id, zone, mouse);
      const point = this.decorationPoint(snapped, collectible);
      const size = this.decorationSize(collectible);
      g.save();
      g.globalAlpha = 0.45 + 0.12 * Math.sin(now / 220);
      this.drawRoomCollectible(g, collectible, point.x, point.y, size, false, zone !== "wall");
      g.restore();
    }
    /** The placement a click/drop at `point` would produce: normalized, snapped
     * to the magnetic grid AND onto the zone's row structure — the editor-side
     * mirror of sanitizeRoomDecorations plus the furniture baseline rules. */
    snappedPlacement(collectibleId, zone, point) {
      const raw = this.decorationPlacementAt(collectibleId, zone, point);
      return this.snapPlacementToRow({ ...raw, x: alignRoomDecorationCoord(raw.x), y: alignRoomDecorationCoord(raw.y) });
    }
    drawDecorationInventory(g, now) {
      const r = DECOR_INVENTORY;
      const storingHover = !!this.decorDrag?.moved && this.decorDrag.point.y >= r.y;
      const benchArmed = !!this.decorDrag?.moved && this.decorDrag.origin !== null;
      g.fillStyle = "rgba(6,4,13,0.97)";
      g.fillRect(r.x, r.y, r.w, r.h);
      const lip = g.createLinearGradient(0, r.y, 0, r.y + 12);
      lip.addColorStop(0, "#6e5530");
      lip.addColorStop(0.28, "#ffd23f");
      lip.addColorStop(0.48, "#3b2a24");
      lip.addColorStop(1, "#16101f");
      g.fillStyle = lip;
      g.fillRect(r.x, r.y, r.w, 12);
      g.fillStyle = "rgba(95,230,214,0.6)";
      g.fillRect(r.x + 238, r.y + 10, 774, 2);
      g.fillRect(r.x + 1020, r.y + 10, r.w - 1036, 2);
      if (benchArmed) {
        g.save();
        g.strokeStyle = storingHover ? CYAN2 : "rgba(95,230,214,0.55)";
        g.shadowColor = CYAN2;
        g.shadowBlur = storingHover ? 18 : 8 + 4 * Math.sin(now / 220);
        g.lineWidth = storingHover ? 3 : 2;
        g.strokeRect(r.x + 1, r.y + 1, r.w - 2, r.h - 2);
        g.restore();
      } else {
        g.strokeStyle = "rgba(255,210,63,0.38)";
        g.lineWidth = 2;
        g.strokeRect(r.x + 1, r.y + 1, r.w - 2, r.h - 2);
      }
      for (const x of [r.x + 10, r.x + r.w - 10]) {
        g.fillStyle = "#8c7650";
        g.fillRect(x - 2, r.y + 8, 4, 4);
        g.fillRect(x - 2, r.y + r.h - 12, 4, 4);
      }
      const all = roomDecorationCollectibles(this.ctx.store.state.owned);
      const filtered = this.decorFilter === "all" ? all : all.filter((collectible) => roomDecorationZoneFor(collectible.type) === this.decorFilter);
      const pages = Math.max(1, Math.ceil(filtered.length / DECOR_PAGE_SIZE));
      this.decorPage = Math.max(0, Math.min(pages - 1, this.decorPage));
      const page = filtered.slice(this.decorPage * DECOR_PAGE_SIZE, (this.decorPage + 1) * DECOR_PAGE_SIZE);
      panel(g, 30, 884, 208, 98, { radius: 6, fill: "rgba(8,7,18,0.94)", border: "rgba(255,210,63,0.72)", borderWidth: 2 });
      drawText(g, t("decor.inventory"), 52, 895, 1.5, GOLD3);
      drawText(g, t("decor.ownedCount", { n: this.ctx.store.ownedCount(), total: this.ctx.store.totalCollectibles() }), 52, 925, 1.2, "#bdb5d6");
      drawText(g, t(benchArmed ? "decor.storeHint" : "decor.benchHint"), 52, 953, 0.95, benchArmed ? CYAN2 : "#8f88ad");
      const frame = this.ctx.assets.get("homeIconBtn");
      let hoveredTile = null;
      for (let i = 0; i < DECOR_PAGE_SIZE; i++) {
        const x = 268 + i * 86;
        const y = 886;
        const size = 64;
        const collectible = page[i];
        g.globalAlpha = collectible ? 1 : 0.32;
        if (frame) drawImageSmooth(g, frame, x, y, size, size);
        else panel(g, x, y, size, size, { radius: 5, fill: "#151126", border: "#4f456d", borderWidth: 2 });
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
          id: "decor-inventory-" + collectible.id,
          cursor: "grab",
          onClick: () => {
            this.decorSelectedId = selected ? null : collectible.id;
            this.ctx.sound.click();
          },
          onDragStart: (start) => this.beginDecorationDrag(collectible.id, start),
          onDragMove: (pointNow) => this.moveDecorationDrag(pointNow),
          onDragEnd: (end) => this.endDecorationDrag(end)
        });
        if (selected || hovered) {
          g.save();
          g.strokeStyle = selected ? GOLD3 : CYAN2;
          if (selected) {
            g.shadowColor = GOLD3;
            g.shadowBlur = 8 + 4 * Math.sin(now / 240);
          }
          g.lineWidth = 3;
          g.strokeRect(x + 2, y + 2, size - 4, size - 4);
          g.restore();
        }
        g.save();
        if (placed) g.globalAlpha = 0.42;
        const icon = collectibleIcon(collectible.id);
        if (icon) drawIconCentered(g, icon, x + size / 2, y + size / 2, 50);
        else drawSpriteCentered(g, collectible.sprite, x + size / 2, y + size / 2, 43, collectible.tint);
        g.restore();
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
          g.strokeStyle = "#0b2015";
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
      if (hoveredTile && !this.decorDrag?.moved) {
        const name = tCollectibleName(hoveredTile.collectible.id);
        const zone = roomDecorationZoneFor(hoveredTile.collectible.type);
        const label = zone ? name + " \xB7 " + t("decor.zone." + zone) : name;
        const w = measureText(label, 1.15) + 18;
        const cx = Math.max(r.x + w / 2 + 6, Math.min(r.x + r.w - w / 2 - 6, hoveredTile.cx));
        rrect(g, cx - w / 2, r.y - 27, w, 22, 4);
        g.fillStyle = "rgba(7,5,14,0.94)";
        g.fill();
        g.strokeStyle = "rgba(95,230,214,0.5)";
        g.lineWidth = 1;
        g.stroke();
        drawText(g, label, cx, r.y - 21, 1.15, INK3, { align: "center" });
      }
      this.drawDecorationFilters(g);
      this.drawDecorPageButton(g, 928, 958, "<", this.decorPage > 0, () => {
        this.decorPage--;
      });
      drawText(g, `${this.decorPage + 1}/${pages}`, 981, 968, 1.2, "#bdb5d6", { align: "center" });
      this.drawDecorPageButton(g, 1010, 958, ">", this.decorPage + 1 < pages, () => {
        this.decorPage++;
      });
      const dirty = this.decorDirty();
      this.drawDecorationAction(g, 1040, 888, t("ui.save"), GREEN, () => this.saveDecorationLayout(), dirty ? now : void 0);
      this.drawDecorationAction(g, 1176, 888, t("decor.auto"), CYAN2, () => {
        this.decorDraft = autoArrangeRoomDecorations(this.ctx.store.state.owned).map((placement) => ({ ...placement }));
        this.decorDraftIsAutomatic = true;
        this.decorSelectedId = null;
        this.ctx.sound.place();
        this.setDecorNotice("decor.autoDone");
      });
      this.drawDecorationAction(g, 1312, 888, t("ui.reset"), "#ff6f70", () => {
        this.decorDraft = this.decorInitial.map((placement) => ({ ...placement }));
        this.decorDraftIsAutomatic = this.decorInitialIsAutomatic;
        this.decorSelectedId = null;
        this.ctx.sound.click();
        this.setDecorNotice("decor.restored");
      });
      const closeArmed = now < this.decorCloseArmedUntil;
      this.drawDecorationAction(g, 1448, 888, closeArmed ? t("decor.closeConfirm") : t("ui.close"), closeArmed ? "#ff6f70" : "#b98cff", () => {
        if (this.decorDirty() && performance.now() >= this.decorCloseArmedUntil) {
          this.decorCloseArmedUntil = performance.now() + 2600;
          this.ctx.sound.error();
          this.setDecorNotice("decor.unsavedWarn", true);
          return;
        }
        this.ctx.sound.click();
        this.closeDecorationEditor();
      }, closeArmed ? now : void 0);
    }
    drawDecorationFilters(g) {
      const filters = [
        { key: "all", label: t("decor.filter.all") },
        { key: "wall", label: t("decor.filter.wall") },
        { key: "floor", label: t("decor.filter.floor") },
        { key: "buddy", label: t("decor.filter.buddy") }
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
          id: "decor-filter-" + filter.key,
          cursor: "pointer",
          onClick: () => {
            this.decorFilter = filter.key;
            this.decorPage = 0;
          }
        });
        panel(g, x, y, w, h, {
          radius: 5,
          fill: active ? "rgba(225,90,216,0.32)" : "rgba(13,10,25,0.9)",
          border: active ? MAGENTA : hovered ? CYAN2 : "#4d4568",
          borderWidth: active ? 2 : 1
        });
        drawText(g, filter.label, x + w / 2, y + 9, 1.05, active ? "#ffffff" : "#bbb3d4", { align: "center" });
      }
    }
    drawDecorPageButton(g, x, y, label, enabled, onClick) {
      const hovered = this.ctx.stage.hotspot({ x, y, w: 28, h: 28, id: "decor-page-" + label, cursor: enabled ? "pointer" : "default", onClick: enabled ? onClick : void 0 });
      drawText(g, label, x + 14, y + 6, 1.8, enabled ? hovered ? "#ffffff" : CYAN2 : "#4d4568", { align: "center" });
    }
    /** One bench action card. Passing `pulseNow` makes the card breathe with a
     * glow — SAVE uses it while there are unsaved changes, CLOSE while armed. */
    drawDecorationAction(g, x, y, label, color, onClick, pulseNow) {
      const w = 122;
      const h = 62;
      const hovered = this.ctx.stage.hotspot({ x, y, w, h, id: "decor-action-" + label, cursor: "pointer", onClick });
      const frame = this.ctx.assets.get("homeShopCard");
      const pulsing = pulseNow !== void 0;
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
        panel(g, x, y, w, h, { radius: 6, fill: "#151126", border: color, borderWidth: 2 });
      }
      let scale = 1.45;
      while (scale > 0.9 && measureText(label, scale) > w - 18) scale -= 0.05;
      const bright = hovered || pulsing;
      drawText(g, label, x + w / 2, y + 24, scale, bright ? "#ffffff" : color, { align: "center", glow: color, glowBlur: bright ? 4 : 1 });
    }
    beginDecorationDrag(collectibleId, start) {
      this.decorDrag = {
        collectibleId,
        start: { ...start },
        point: { ...start },
        moved: false,
        origin: this.decorDraft.find((placement) => placement.collectibleId === collectibleId) ?? null
      };
    }
    moveDecorationDrag(point) {
      if (!this.decorDrag) return;
      this.decorDrag.point = { ...point };
      if (Math.hypot(point.x - this.decorDrag.start.x, point.y - this.decorDrag.start.y) > 4) {
        this.decorDrag.moved = true;
      }
    }
    endDecorationDrag(point) {
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
        this.setDecorNotice("decor.invalid", true);
        return;
      }
      this.placeDecoration(drag.collectibleId, zone, point);
    }
    placeDecoration(collectibleId, zone, point) {
      const collectible = byId[collectibleId];
      if (!collectible || roomDecorationZoneFor(collectible.type) !== zone) {
        this.ctx.sound.error();
        this.setDecorNotice("decor.invalidType", true);
        return;
      }
      const without = this.decorDraft.filter((placement) => placement.collectibleId !== collectibleId);
      if (without.filter((placement) => placement.zone === zone).length >= ROOM_DECORATION_CAPACITY[zone]) {
        this.ctx.sound.error();
        this.setDecorNotice("decor.zoneFull", true);
        return;
      }
      const candidate = this.decorationPlacementAt(collectibleId, zone, point);
      const placed = this.findOpenDecorationPosition(candidate, collectible, without);
      const clean = sanitizeRoomDecorations(this.ctx.store.state.owned, [...without, placed]);
      this.decorDraft = clean ?? without;
      this.decorDraftIsAutomatic = false;
      this.decorSelectedId = null;
      const landed = this.decorDraft.find((p) => p.collectibleId === collectibleId);
      if (landed) {
        const at = this.decorationPoint(landed, collectible);
        this.ctx.fx.burst(at.x, at.y, this.decorZoneColor(zone), 10);
      }
      this.ctx.sound.place();
      this.ctx.stage.wake(700);
    }
    decorationPlacementAt(collectibleId, zone, point) {
      const r = DECORATION_ZONES[zone];
      return {
        collectibleId,
        zone,
        x: Math.max(0, Math.min(1, (point.x - r.x) / r.w)),
        y: Math.max(0, Math.min(1, (point.y - r.y) / r.h))
      };
    }
    /** Slide the candidate along its row (and, on the wall, onto the other hook
     * rail) until it stops overlapping neighbours. Row-based placement means the
     * search is one-dimensional per row instead of a 2D scatter. */
    findOpenDecorationPosition(candidate, collectible, existing) {
      const snapped = this.snapPlacementToRow(candidate);
      const xOffsets = [0, 0.1, -0.1, 0.2, -0.2, 0.3, -0.3, 0.4, -0.4];
      const rows = snapped.zone === "wall" ? snapped.y === WALL_ROW_Y[0] ? [WALL_ROW_Y[0], WALL_ROW_Y[1]] : [WALL_ROW_Y[1], WALL_ROW_Y[0]] : [snapped.y];
      const sameZone = existing.filter((placement) => placement.zone === snapped.zone);
      for (const y of rows) {
        for (const dx of xOffsets) {
          const attempt = { ...snapped, x: clamp012(snapped.x + dx), y };
          const point = this.decorationPoint(attempt, collectible);
          const clear = sameZone.every((placement) => {
            const other = byId[placement.collectibleId];
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
    decorationZoneAt(point) {
      for (const zone of ["wall", "floor", "buddy"]) {
        const r = DECORATION_ZONES[zone];
        if (point.x >= r.x && point.x <= r.x + r.w && point.y >= r.y && point.y <= r.y + r.h) return zone;
      }
      return null;
    }
    drawDecorationDrag(g, now) {
      const drag = this.decorDrag;
      if (!drag?.moved) return;
      const collectible = byId[drag.collectibleId];
      if (!collectible) return;
      const zone = this.decorationZoneAt(drag.point);
      const expected = roomDecorationZoneFor(collectible.type);
      const storing = drag.point.y >= DECOR_INVENTORY.y;
      const valid = storing || zone !== null && zone === expected;
      const color = storing ? CYAN2 : valid ? GREEN : "#ff5c6a";
      const size = this.decorationSize(collectible);
      if (!storing && valid && expected) {
        const others = this.decorDraft.filter((placement) => placement.collectibleId !== collectible.id);
        const landing = this.findOpenDecorationPosition(this.snappedPlacement(collectible.id, expected, drag.point), collectible, others);
        const lp = this.decorationPoint(landing, collectible);
        if (Math.hypot(lp.x - drag.point.x, lp.y - drag.point.y) > 3) {
          g.save();
          g.globalAlpha = 0.38;
          this.drawRoomCollectible(g, collectible, lp.x, lp.y, size, false, expected !== "wall");
          g.strokeStyle = GREEN + "99";
          g.lineWidth = 1.5;
          g.setLineDash([4, 4]);
          g.strokeRect(lp.x - size / 2 - 3, lp.y - size / 2 - 3, size + 6, size + 6);
          g.setLineDash([]);
          g.restore();
        }
      }
      const lift = 7;
      if (!storing) {
        g.save();
        g.fillStyle = "rgba(0,0,0,0.35)";
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
      const tag = storing ? t("decor.storeHint") : valid ? t("decor.dropHere") : t("decor.wrongZone");
      const tagW = measureText(tag, 1.05) + 14;
      rrect(g, drag.point.x - tagW / 2, drag.point.y + size / 2 + 10, tagW, 20, 4);
      g.fillStyle = "rgba(7,5,14,0.92)";
      g.fill();
      drawText(g, tag, drag.point.x, drag.point.y + size / 2 + 15, 1.05, color, { align: "center" });
    }
    setDecorNotice(key, warn = false) {
      this.decorNotice = { key, until: performance.now() + 1500, warn };
      this.ctx.stage.wake(1600);
    }
    saveDecorationLayout() {
      this.ctx.store.setRoomDecorations(this.decorDraftIsAutomatic ? null : this.decorDraft);
      this.closeDecorationEditor();
      this.ctx.sound.confirm();
      this.ctx.fx.banner(t("decor.saved"), 800, 174, GREEN, { scale: 2.2, life: 1.4 });
      this.ctx.stage.wake(1200);
    }
  };

  // src/screens/roomScreen.ts
  var GOLD4 = "#ffd23f";
  var CYAN3 = "#5fe6d6";
  var MAGENTA2 = "#e15ad8";
  var GREEN2 = "#5fd66f";
  var INK4 = "#f6f4ff";
  var PANEL = "#1b1230";
  var CARD = { x: 16, y: 12, w: 360, h: 149 };
  var SYNC = { x: 1360, y: 16, w: 224, h: 76 };
  var HUD_W = 252;
  var HUD_X = 1086;
  var HUD_COIN_Y = 14;
  var HUD_TOKEN_Y = HUD_COIN_Y + hudPlaqueHeight(HUD_W) + 8;
  var COINS_TARGET = { x: HUD_X + HUD_W / 2, y: HUD_COIN_Y + hudPlaqueHeight(HUD_W) / 2 };
  var CAB = { x: 16, y: 172, w: 360, h: 728 };
  var BANK_W = 360;
  var BANK = { x: Math.round(ROOM_CENTER_X * 1600 - BANK_W / 2), y: 200, w: BANK_W, h: 520 };
  var WALL = { x: 1224, y: 150, w: 360, h: 750 };
  var RAIL = { x: 16, y: 904, w: 1568, h: 82 };
  function bar(g, x, y, w, h, frac, fill) {
    g.fillStyle = "#05060f";
    g.fillRect(x, y, w, h);
    const f = Math.max(0, Math.min(1, frac));
    g.fillStyle = fill;
    g.fillRect(x + 1, y + 1, Math.max(0, (w - 2) * f), h - 2);
    g.strokeStyle = "rgba(0,0,0,0.5)";
    g.lineWidth = 1;
    g.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
  }
  function clip(s, n) {
    return s.length > n ? s.slice(0, n) : s;
  }
  function drawPowerMeter(g, x, y, w, cells, frac, color) {
    const gap = 3;
    const cw = (w - gap * (cells - 1)) / cells;
    const lit = Math.round(Math.max(0, Math.min(1, frac)) * cells);
    for (let i = 0; i < cells; i++) {
      const cx = x + i * (cw + gap);
      if (i < lit) {
        g.save();
        g.shadowColor = color;
        g.shadowBlur = 5;
        g.fillStyle = color;
        g.fillRect(cx, y, cw, 7);
        g.restore();
      } else {
        g.fillStyle = "rgba(255,255,255,0.12)";
        g.fillRect(cx, y, cw, 7);
      }
    }
  }
  function drawStageProgress(g, x, y, w, stageIndex, frac, accent, kit) {
    if (!kit) {
      drawPowerMeter(g, x, y + 16, w, 9, frac, accent);
      return;
    }
    const ec = uiKitEndcap(stageIndex);
    const h = w * ec.sh / ec.sw;
    drawImageSmooth(g, kit, x, y, w, h, ec);
    const f = Math.max(0, Math.min(1, frac));
    if (f > 0) {
      g.save();
      rrect(g, x + w * 0.03, y + h * 0.32, (w - w * 0.06) * f, h * 0.36, h * 0.18);
      g.clip();
      g.globalAlpha = 0.32;
      g.fillStyle = accent;
      g.fillRect(x, y, w, h);
      g.restore();
      g.globalAlpha = 1;
    }
  }
  function drawLevelPlate(g, cx, cy, level, accent) {
    const label = "LV" + level;
    const s = 1.5;
    const pw = measureText(label, s) + 12;
    const ph = GLYPH_H * s + 8;
    const px = cx - pw / 2;
    const py = cy - ph / 2;
    rrect(g, px, py, pw, ph, 4);
    g.fillStyle = "rgba(6,4,12,0.82)";
    g.fill();
    g.strokeStyle = accent;
    g.lineWidth = 1.5;
    rrect(g, px, py, pw, ph, 4);
    g.stroke();
    drawText(g, label, cx, py + (ph - GLYPH_H * s) / 2, s, accent, {
      align: "center",
      glow: accent,
      glowBlur: 3,
      shadow: "rgba(0,0,0,0.75)"
    });
  }
  function drawStageBadge(g, stageIndex, stageName, accent, x, y, size, kit) {
    if (kit) {
      const bc = uiKitBadge(stageIndex);
      const bw = size;
      const bh = size * bc.sh / bc.sw;
      drawImageSmooth(g, kit, x, y + (size - bh) / 2, bw, bh, bc);
      return;
    }
    const ch = Math.round(size * 0.72);
    const cy = y + (size - ch) / 2;
    rrect(g, x, cy, size, ch, 4);
    g.save();
    g.globalAlpha = 0.85;
    g.fillStyle = accent;
    g.fill();
    g.restore();
    drawText(g, stageName.charAt(0), x + size / 2, cy + ch / 2 - GLYPH_H * 1.5 / 2, 1.5, "#12121f", { align: "center" });
  }
  function drawFloorGlints(g, now) {
    const cx = BANK.x + BANK.w / 2;
    const spots = [
      [cx - 120, 762],
      [cx - 54, 786],
      [cx + 52, 772],
      [cx + 122, 754],
      [cx - 8, 792]
    ];
    for (let i = 0; i < spots.length; i++) {
      const [x, y] = spots[i];
      const a = 0.12 + 0.28 * Math.max(0, Math.sin(now / 500 + i * 1.7));
      g.save();
      g.globalAlpha = a;
      g.fillStyle = "#ffd23f";
      g.fillRect(x - 1, y - 4, 2, 8);
      g.fillRect(x - 4, y - 1, 8, 2);
      g.restore();
    }
  }
  function coinGlow(g, cx, cy, r) {
    const grad = g.createRadialGradient(cx, cy, 0, cx, cy, r);
    grad.addColorStop(0, "rgba(255,210,63,0.35)");
    grad.addColorStop(1, "rgba(255,210,63,0)");
    g.fillStyle = grad;
    g.fillRect(cx - r, cy - r, r * 2, r * 2);
  }
  function drawPadlock(g, cx, cy, color) {
    g.save();
    g.strokeStyle = color;
    g.lineWidth = 3;
    g.beginPath();
    g.arc(cx, cy - 5, 7, Math.PI, 2 * Math.PI);
    g.stroke();
    g.fillStyle = color;
    rrect(g, cx - 11, cy - 4, 22, 18, 3);
    g.fill();
    g.fillStyle = "rgba(0,0,0,0.5)";
    g.fillRect(cx - 1.5, cy + 1, 3, 7);
    g.restore();
  }
  var RoomScreen = class _RoomScreen {
    constructor(ctx2) {
      this.ctx = ctx2;
      this.name = "room";
      /** Coin count shown in the pill; eased toward the real balance each frame. */
      this.displayCoins = new EasedNumber();
      /** Guards re-entrant syncs while a sync promise is in flight. */
      this.syncing = false;
      /** Neon-logo flicker: the current frame and the wall-clock (ms) it holds until.
       * The sign holds a bright, readable NORMAL frame for a long randomized gap
       * (~2.2-5.5s), then does ONE short flick — a dark dropout, or rarely a bright
       * burst — and returns straight to normal, so it reads as an arcade neon tube
       * with occasional electricity fluctuation rather than a constant strobe or a
       * double-blink. */
      this.flickerUntil = -1;
      this.flickerFrame = "homeLogo";
      /** Scroll offset (logical px) of the cabinet wall — the column is a clipped
       * viewport so every project is reachable by wheel even past the ~5 that fit. */
      this.cabScrollY = 0;
      /** Full cyan frame ignition after an equip, then a steady low glow. */
      this.profileFramePulseUntil = 0;
      this.lastProfileFrame = this.ctx.store.state.cosmetics.profileFrame;
      /** Room decorations: resting displays + the decorate-mode editor. */
      this.decor = new RoomDecorController(this.ctx);
      this.displayCoins.set(ctx2.store.state.coins);
    }
    enter() {
      this.displayCoins.set(this.ctx.store.state.coins);
      this.decor.reset();
    }
    render(g, dt, now) {
      this.displayCoins.toward(this.ctx.store.state.coins, dt);
      const equippedFrame = this.ctx.store.state.cosmetics.profileFrame;
      if (equippedFrame !== this.lastProfileFrame) {
        this.lastProfileFrame = equippedFrame;
        this.profileFramePulseUntil = now + 720;
        this.ctx.stage.wake(760);
      }
      const gapCx = Math.round((BANK.x + BANK.w + WALL.x) / 2);
      this.ctx.fx.setToastZone(gapCx, 168, Math.min(232, WALL.x - (BANK.x + BANK.w) - 16));
      this.drawBackground(g);
      this.drawCabinets(g);
      this.decor.drawDisplays(g, now);
      this.drawCenter(g, now);
      this.drawPrizeWall(g);
      this.drawTopBar(g, now);
      if (this.decor.editing) {
        this.decor.drawEditor(g, now);
      } else {
        this.drawSpendRail(g);
        this.decor.drawEntry(g, now);
        this.decor.drawTooltip(g);
        this.drawNoHistoryDecision(g);
      }
    }
    // ---- background ---------------------------------------------------------
    drawBackground(g) {
      const W = this.ctx.stage.width;
      const H = this.ctx.stage.height;
      const theme = this.ctx.store.state.cosmetics.roomTheme;
      const bg2 = theme === "e_sunset" ? this.ctx.assets.get("roomThemeSunset") : theme === "l_forest" ? this.ctx.assets.get("roomThemeForest") : this.ctx.assets.get("roomBg");
      if (bg2) {
        drawImageSmooth(g, bg2, 0, 0, W, H);
        if (theme !== "base") return;
        const grad = g.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, "rgba(6,4,12,0.55)");
        grad.addColorStop(0.28, "rgba(6,4,12,0.12)");
        grad.addColorStop(1, "rgba(6,4,12,0.0)");
        g.fillStyle = grad;
        g.fillRect(0, 0, W, H);
        return;
      }
      vgrad(g, 0, 0, W, H, "#241338", "#07040d");
      vgrad(g, 0, 700, W, H - 700, "#170f2c", "#0a0616");
      g.fillStyle = "rgba(95,230,214,0.10)";
      g.fillRect(0, 700, W, 2);
      radial(g, 800, 120, 540, "rgba(225,90,216,0.10)");
      radial(g, 300, 520, 380, "rgba(95,230,214,0.06)");
      radial(g, 1320, 540, 380, "rgba(255,210,63,0.05)");
    }
    // ---- top bar ------------------------------------------------------------
    drawTopBar(g, now) {
      this.drawPlayerCard(g, now);
      this.drawMarquee(g, now);
      this.drawCoinPlaque(g);
      drawDemoPlaque(g, this.ctx, 930, 15, 146);
      this.drawSyncButton(g);
    }
    /** Player card: generated frame + portrait, with name/level/XP drawn on top.
     * Clicking the card opens the achievement gallery. */
    drawPlayerCard(g, now) {
      const store2 = this.ctx.store;
      const pl = store2.playerLevel();
      const cardHover = this.ctx.stage.hotspot({
        x: CARD.x,
        y: CARD.y,
        w: CARD.w,
        h: CARD.h,
        cursor: "pointer",
        id: "player-card",
        onClick: () => this.ctx.router.go("customize")
      });
      const frame = this.ctx.assets.get("homePlayerCard");
      if (frame) {
        drawImageSmooth(g, frame, CARD.x, CARD.y, CARD.w, CARD.h);
        const fx0 = (fx2) => CARD.x + fx2 * CARD.w;
        const fy0 = (fy) => CARD.y + fy * CARD.h;
        this.drawPlayerPortrait(g, fx0, fy0, now);
        const scrimX = fx0(0.395);
        const scrimY = fy0(0.09);
        g.save();
        rrect(g, scrimX, scrimY, fx0(0.955) - scrimX, fy0(0.69) - scrimY, 7);
        g.fillStyle = "rgba(6,4,14,0.42)";
        g.fill();
        g.restore();
        const tx = fx0(0.41);
        this.drawEditableName(g, tx, fy0(0.15), 2);
        drawText(g, "LV " + pl.level, tx, fy0(0.35), 2.5, GOLD4, { glow: GOLD4, glowBlur: 3 });
        drawText(g, pl.into + " / " + pl.need + " XP", tx, fy0(0.585), 1.3, "#b9b3d6");
        bar(g, tx, fy0(0.73), fx0(0.93) - tx, 0.11 * CARD.h, pl.need > 0 ? pl.into / pl.need : 0, CYAN3);
        this.drawCardAffordance(g, cardHover);
        return;
      }
      panel(g, CARD.x, CARD.y, CARD.w, CARD.h, { radius: 12, fill: PANEL, border: CYAN3, borderWidth: 3 });
      this.drawPlayerPortrait(g, (f) => CARD.x + f * CARD.w, (f) => CARD.y + f * CARD.h, now);
      this.drawEditableName(g, CARD.x + 96, CARD.y + 14, 2);
      drawText(g, "LV " + pl.level, CARD.x + 96, CARD.y + 38, 3, GOLD4, { glow: GOLD4, glowBlur: 3 });
      bar(g, CARD.x + 96, CARD.y + 78, 248, 14, pl.need > 0 ? pl.into / pl.need : 0, CYAN3);
      drawText(g, pl.into + "/" + pl.need + " XP", CARD.x + 96, CARD.y + 62, 1.5, "#9a93bd");
      this.drawCardAffordance(g, cardHover);
    }
    /** Home portrait plus the complete earned Cyan Profile Frame when equipped.
     * The PNG is always drawn whole and above the portrait: its wing tips, lower
     * gem, dark inner window and corner bolts are not recreated in canvas. */
    drawPlayerPortrait(g, fx0, fy0, now) {
      const equipped = this.ctx.store.state.cosmetics.profileFrame === "r_frame";
      const portrait = this.ctx.assets.get("homePlayer");
      const cx = fx0(0.2225);
      const cy = fy0(0.49);
      if (equipped) {
        rrect(g, cx - 34, cy - 37, 68, 79, 9);
        g.fillStyle = "#0a1020";
        g.fill();
        const frame = collectibleIcon("r_frame");
        if (frame) {
          const pulse2 = Math.max(0, (this.profileFramePulseUntil - now) / 720);
          g.save();
          g.shadowColor = CYAN3;
          g.shadowBlur = 7 + 26 * pulse2;
          g.globalAlpha = 0.88 + 0.12 * (0.5 + 0.5 * Math.sin(now / 240));
          drawImageContain(g, frame, cx, cy, 122, 134);
          g.restore();
        }
        g.save();
        rrect(g, cx - 29, cy - 27, 58, 66, 7);
        g.clip();
        if (portrait) drawCropContain(g, portrait, PLAYER_PORTRAIT_CROP, cx - 29, cy - 29, 58, 68);
        else drawSprite(g, AVATAR, cx - 18, cy - 21, 3.6);
        g.restore();
        return;
      }
      if (portrait) drawCropContain(g, portrait, PLAYER_PORTRAIT_CROP, fx0(0.085), fy0(0.14), 0.275 * CARD.w, 0.7 * CARD.h);
      else drawSprite(g, AVATAR, fx0(0.12), fy0(0.28), 5);
    }
    /** A small backstage cue on the player card + a hover ring, so the earned
     * profile frame has a clear, physical route to the dressing room. */
    drawCardAffordance(g, hovered) {
      drawText(g, "\u2726 " + t("ui.customizeArcade"), CARD.x + CARD.w - 12, CARD.y + CARD.h - 20, 1.05, hovered ? GOLD4 : "#8a86a6", {
        align: "right"
      });
      if (hovered) {
        rrect(g, CARD.x + 1, CARD.y + 1, CARD.w - 2, CARD.h - 2, 12);
        g.strokeStyle = "rgba(255,210,63,0.7)";
        g.lineWidth = 2;
        g.stroke();
      }
    }
    /** The player's display name (their custom name, else the localized default)
     *  with a small pencil edit-cue. It registers its OWN click target that opens
     *  the rename dialog; because it's registered after the whole-card hotspot,
     *  clicking the name edits it while clicking elsewhere still opens the gallery. */
    drawEditableName(g, x, y, scale) {
      const name = this.ctx.store.playerName() || t("ui.arcadePlayer");
      const w = measureText(name, scale);
      const hx = x - 4;
      const hy = y - 4;
      const hw = w + 32;
      const hh = GLYPH_H * scale + 8;
      const hovered = this.ctx.stage.hotspot({
        x: hx,
        y: hy,
        w: hw,
        h: hh,
        cursor: "pointer",
        id: "player-name",
        onClick: () => this.ctx.editPlayerName()
      });
      drawText(g, name, x, y, scale, hovered ? GOLD4 : INK4);
      drawPencil(g, x + w + 14, y + GLYPH_H * scale / 2, 12, hovered ? GOLD4 : "#9a93bd");
    }
    /** Top-right counters: the SHARED coin + token HUD plaques (coin balance
     * stacked over lifetime tokens) so the HUD matches the capsule + project-detail
     * screens. Both helpers auto-fit the value into the plaque's dark window and
     * carry their own procedural fallback; the coin plaque is the coin-rain target
     * (its center is COINS_TARGET). */
    drawCoinPlaque(g) {
      const store2 = this.ctx.store;
      const coins2 = fmtComma(Math.round(this.displayCoins.value));
      const tokens = fmtComma(store2.state.stats.lifetimeTokens);
      drawCoinHud(g, this.ctx.assets, HUD_X, HUD_COIN_Y, HUD_W, coins2);
      drawTokenHud(g, this.ctx.assets, HUD_X, HUD_TOKEN_Y, HUD_W, tokens);
    }
    /** SYNC button — the primary action. Its compact physical label always names
     * the action, while demo identity stays on the persistent plaque and in the
     * post-sync feedback below the HUD. */
    drawSyncButton(g) {
      const syncHover = this.ctx.stage.hotspot({
        x: SYNC.x,
        y: SYNC.y,
        w: SYNC.w,
        h: SYNC.h,
        cursor: "pointer",
        id: "sync",
        onClick: () => void this.doSync()
      });
      const label = this.syncing ? t("ui.syncing") : t("ui.sync");
      const states = this.ctx.assets.get("homeSyncStates");
      if (states) {
        const crop = this.syncing ? SYNC_STATE_CROPS.pressed : syncHover ? SYNC_STATE_CROPS.hover : SYNC_STATE_CROPS.default;
        const bh = 88;
        const bw = Math.round(bh * (SYNC_STATE_CROPS.default.sw / SYNC_STATE_CROPS.default.sh));
        const bx = SYNC.x + 6;
        const by = SYNC.y - 8;
        drawImageSmooth(g, states, bx, by, bw, bh, crop);
        const scale = this.syncing ? 1.55 : 3;
        drawText(g, label, bx + bw / 2, by + bh / 2 - GLYPH_H * scale * 0.5, scale, "#0b2015", {
          align: "center",
          shadow: "rgba(255,255,255,0.35)"
        });
        return;
      }
      const syncFill = this.syncing ? "#2f6f45" : syncHover ? "#7be88a" : GREEN2;
      panel(g, SYNC.x, SYNC.y, SYNC.w, SYNC.h, { radius: 14, fill: syncFill, border: "#2f8f4b", borderWidth: 3 });
      drawText(g, label, SYNC.x + SYNC.w / 2, SYNC.y + 22, this.syncing ? 2.6 : 5, "#0b2015", {
        align: "center",
        shadow: "rgba(255,255,255,0.35)"
      });
    }
    drawMarquee(g, now) {
      const cx = 800;
      let frameKey = this.logoFlickerFrame(now);
      let logo = this.ctx.assets.get(frameKey);
      if (!logo) {
        frameKey = "homeLogo";
        logo = this.ctx.assets.get("homeLogo");
      }
      if (logo) {
        const lh = 124;
        const lw = lh * 2.201;
        const x0 = cx - lw / 2;
        const y0 = 6;
        const N = LOGO_FRAME_ALPHA.homeLogo;
        const A = LOGO_FRAME_ALPHA[frameKey];
        const dw = (N.x1 - N.x0) * lw / (A.x1 - A.x0);
        const dh = (N.y1 - N.y0) * lh / (A.y1 - A.y0);
        const dx = x0 + N.x0 * lw - A.x0 * dw;
        const dy = y0 + N.y0 * lh - A.y0 * dh;
        const breath = 0.5 + 0.5 * Math.sin(now / 680);
        g.save();
        g.globalAlpha = 0.93 + 0.07 * breath;
        g.shadowColor = "rgba(95,230,214,0.35)";
        g.shadowBlur = 5 + 6 * breath;
        drawImageSmooth(g, logo, dx, dy, dw, dh);
        g.restore();
        return;
      }
      for (let i = 0; i < 9; i++) {
        const bx = 662 + i * 34;
        const on = (Math.floor(now / 220) + i) % 2 === 0;
        g.beginPath();
        g.arc(bx, 10, 3, 0, Math.PI * 2);
        if (on) {
          g.save();
          g.shadowColor = GOLD4;
          g.shadowBlur = 8;
          g.fillStyle = GOLD4;
          g.fill();
          g.restore();
        } else {
          g.fillStyle = "rgba(255,210,63,0.25)";
          g.fill();
        }
      }
      drawText(g, "TOKEN", cx, 18, 8, MAGENTA2, { align: "center", glow: MAGENTA2, glowBlur: 6, shadow: "rgba(0,0,0,0.5)" });
      drawText(g, "ARCADE", cx, 74, 8, CYAN3, { align: "center", glow: CYAN3, glowBlur: 6, shadow: "rgba(0,0,0,0.5)" });
    }
    static {
      // Neon-logo flicker timing (ms). The sign holds a bright NORMAL frame for a
      // long randomized gap, then does exactly ONE short flick and returns to
      // normal. The long normal gap (>= FLICK_GAP_MIN) is re-rolled after every
      // flick, so two flicks can never merge into a mouse-double-click; the flick is
      // usually a dark dropout and only rarely (~BURST_CHANCE) a bright burst.
      this.FLICK_GAP_MIN = 2200;
    }
    static {
      // min bright/normal time before a flick
      this.FLICK_GAP_RAND = 3300;
    }
    static {
      // + up to this ⇒ 2.2..5.5s gaps
      this.DROPOUT_MIN = 40;
    }
    static {
      // dropout flick length
      this.DROPOUT_RAND = 40;
    }
    static {
      // ⇒ 40..80ms
      this.BURST_MIN = 60;
    }
    static {
      // burst flick length
      this.BURST_RAND = 30;
    }
    static {
      // ⇒ 60..90ms
      this.BURST_CHANCE = 0.2;
    }
    // ~1 in 5 flicks is a burst (rare over-bright pop)
    /** Which logo frame to draw this instant. The sign is a stable, bright NORMAL
     * frame the large majority of the time; every ~2.2-5.5s (randomized) it does a
     * single short flick — usually a dropout dip, rarely a burst pop — then goes
     * straight back to normal. Every gap/duration is re-randomized so no fixed loop
     * is perceptible, and a fresh long gap after each flick guarantees no paired
     * "double-blink". A single frame swap per event — never a sequence. */
    logoFlickerFrame(now) {
      if (this.flickerUntil < 0) {
        this.flickerFrame = "homeLogo";
        this.flickerUntil = now + _RoomScreen.FLICK_GAP_MIN + Math.random() * _RoomScreen.FLICK_GAP_RAND;
        return this.flickerFrame;
      }
      if (now < this.flickerUntil) return this.flickerFrame;
      if (this.flickerFrame === "homeLogo") {
        if (Math.random() < _RoomScreen.BURST_CHANCE) {
          this.flickerFrame = "homeLogoBurst";
          this.flickerUntil = now + _RoomScreen.BURST_MIN + Math.random() * _RoomScreen.BURST_RAND;
        } else {
          this.flickerFrame = "homeLogoDropout";
          this.flickerUntil = now + _RoomScreen.DROPOUT_MIN + Math.random() * _RoomScreen.DROPOUT_RAND;
        }
      } else {
        this.flickerFrame = "homeLogo";
        this.flickerUntil = now + _RoomScreen.FLICK_GAP_MIN + Math.random() * _RoomScreen.FLICK_GAP_RAND;
      }
      return this.flickerFrame;
    }
    static {
      // ---- left column: cabinets ---------------------------------------------
      // Cabinet wall geometry: full-size machine rows at a fixed pitch, stacked in a
      // clipped viewport under the header. ROW_BASE is the first row's y at scroll 0;
      // the window spans ROW_BASE..(ROW_BASE+WINDOW_H), clipped a touch wider so a
      // row's 6px art overhang isn't shaved.
      this.ROW_PITCH = 140;
    }
    static {
      this.ROW_BASE = 200;
    }
    static {
      this.WINDOW_H = 700;
    }
    static {
      this.VIEW = { x: CAB.x, y: 190, w: CAB.w, h: 710 };
    }
    drawCabinets(g) {
      drawText(g, t("ui.cabinets"), CAB.x + 8, CAB.y + 8, 3, CYAN3, { glow: CYAN3, glowBlur: 3 });
      const projects = this.ctx.store.state.projects;
      if (projects.length === 0) {
        this.drawDormantCabinets(g);
        return;
      }
      const view = _RoomScreen.VIEW;
      const contentH = projects.length * _RoomScreen.ROW_PITCH;
      const maxScroll = Math.max(0, contentH - _RoomScreen.WINDOW_H);
      if (maxScroll > 0) this.ctx.stage.scrollRegion(view.x, view.y, view.w, view.h);
      this.cabScrollY = Math.max(0, Math.min(maxScroll, this.cabScrollY + this.ctx.stage.takeScrollDelta()));
      g.save();
      g.beginPath();
      g.rect(view.x, view.y, view.w, view.h);
      g.clip();
      for (let i = 0; i < projects.length; i++) {
        const rowY = _RoomScreen.ROW_BASE + i * _RoomScreen.ROW_PITCH - this.cabScrollY;
        if (rowY + 122 < view.y || rowY - 8 > view.y + view.h) continue;
        this.drawCabinetRow(g, projects[i], rowY, view);
      }
      g.restore();
      this.drawCabinetScrollHints(g, view, contentH, maxScroll);
    }
    /** One full-size machine row (stage cabinet art + code nameplate/stats/
     *  progress) drawn at on-screen `rowY` inside the scrolling cabinet viewport.
     *  Color and ornament derive from the project's LEVEL: the numeric level
     *  (1..50) drives the "LVn" plate + power meter, while the visual STAGE (0..4)
     *  picks the cabinet body art and its neon accent. */
    drawCabinetRow(g, proj, rowY, view) {
      const info = levelInfo(proj.tokens);
      const stage2 = info.stage;
      const accent = stageAccent(stage2.index);
      const rowTop = rowY - 4;
      const hy = Math.max(view.y, rowTop);
      const hh = Math.min(rowTop + 134, view.y + view.h) - hy;
      let hovered = false;
      if (hh > 12) {
        hovered = this.ctx.stage.hotspot({
          x: CAB.x,
          y: hy,
          w: CAB.w,
          h: hh,
          cursor: "pointer",
          id: "cab-" + proj.id,
          onClick: () => this.ctx.router.go("cabinet", { id: proj.id })
        });
      }
      if (hovered) {
        panel(g, CAB.x, rowY - 4, CAB.w, 134, { radius: 10, fill: "rgba(95,230,214,0.08)", border: "rgba(95,230,214,0.4)", borderWidth: 2 });
      }
      const sheet = this.ctx.assets.get("homeLevelCabinets");
      if (sheet) {
        const crop = homeLevelCabinetCrop(stage2.index);
        const ch = 128;
        const cw = ch * (crop.sw / crop.sh);
        const cdx = CAB.x + 4;
        const cdy = rowY - 6;
        g.save();
        g.fillStyle = "rgba(0,0,0,0.35)";
        g.beginPath();
        g.ellipse(cdx + cw / 2, cdy + ch - 4, cw * 0.42, 7, 0, 0, Math.PI * 2);
        g.fill();
        g.restore();
        const pulse2 = this.ctx.fx.pulseAmount(proj.id);
        if (pulse2 > 0) {
          g.save();
          g.shadowColor = GOLD4;
          g.shadowBlur = 26 * pulse2;
          drawImageSmooth(g, sheet, cdx, cdy, cw, ch, crop);
          g.restore();
        }
        drawImageSmooth(g, sheet, cdx, cdy, cw, ch, crop);
        const sc = homeCabinetScreen(stage2.index);
        drawLevelPlate(g, cdx + sc.cx * cw, cdy + sc.cy * ch, info.level, accent);
      } else {
        drawCabinet(g, CAB.x + 8, rowY, 84, 130, {
          name: proj.name,
          level: stage2.index + 1,
          id: proj.id,
          on: true,
          progress: info.progress,
          glow: 1 + this.ctx.fx.pulseAmount(proj.id),
          skin: { neon: accent, dark: "#12121f", mid: "#20203a", name: accent }
        });
      }
      const tx = 112;
      drawText(g, clip(proj.name, 13), tx, rowY + 10, 2, accent, { glow: accent, glowBlur: 3 });
      drawStageBadge(g, stage2.index, stage2.name, accent, CAB.x + CAB.w - 32, rowY - 2, 28, this.ctx.assets.get("levelUiKit"));
      drawSprite(g, "tokenChip", tx, rowY + 38, 1.5);
      drawText(g, fmtCompact(proj.tokens) + " " + t("ui.tokens"), tx + 30, rowY + 40, 1.75, CYAN3);
      coinGlow(g, tx + 10, rowY + 74, 20);
      drawCoin(g, tx + 10, rowY + 74, 10);
      drawText(g, fmtComma(proj.coins) + " " + t("ui.baseCoins"), tx + 28, rowY + 67, 2, GOLD4);
      drawStageProgress(g, tx, rowY + 92, 128, stage2.index, info.progress, accent, this.ctx.assets.get("levelUiKit"));
    }
    /** Scroll affordances for the cabinet wall: a soft dark fade at whichever end
     *  has more machines beyond it (so a half-row reads as "more below/above"), and
     *  a slim glowing position bar in the right gutter. Nothing is drawn when the
     *  whole list already fits. */
    drawCabinetScrollHints(g, view, contentH, maxScroll) {
      if (maxScroll <= 0) return;
      const top = view.y;
      const bottom = view.y + view.h;
      if (this.cabScrollY > 1) {
        const grad = g.createLinearGradient(0, top, 0, top + 26);
        grad.addColorStop(0, "rgba(6,4,12,0.85)");
        grad.addColorStop(1, "rgba(6,4,12,0)");
        g.fillStyle = grad;
        g.fillRect(view.x, top, view.w, 26);
      }
      if (this.cabScrollY < maxScroll - 1) {
        const grad = g.createLinearGradient(0, bottom - 26, 0, bottom);
        grad.addColorStop(0, "rgba(6,4,12,0)");
        grad.addColorStop(1, "rgba(6,4,12,0.85)");
        g.fillStyle = grad;
        g.fillRect(view.x, bottom - 26, view.w, 26);
        g.save();
        g.globalAlpha = 0.7;
        g.strokeStyle = CYAN3;
        g.lineWidth = 2;
        const ccx = view.x + view.w / 2;
        g.beginPath();
        g.moveTo(ccx - 7, bottom - 12);
        g.lineTo(ccx, bottom - 6);
        g.lineTo(ccx + 7, bottom - 12);
        g.stroke();
        g.restore();
      }
      const trackX = view.x + view.w - 4;
      const trackW = 3;
      g.fillStyle = "rgba(255,255,255,0.08)";
      g.fillRect(trackX, top, trackW, view.h);
      const thumbH = Math.max(28, view.h * (_RoomScreen.WINDOW_H / contentH));
      const thumbY = top + (view.h - thumbH) * (this.cabScrollY / maxScroll);
      g.save();
      g.shadowColor = CYAN3;
      g.shadowBlur = 5;
      g.fillStyle = CYAN3;
      g.fillRect(trackX, thumbY, trackW, thumbH);
      g.restore();
    }
    /** First-run: three dormant, powered-off machines waiting for tokens. */
    drawDormantCabinets(g) {
      const skin = this.ctx.assets.get("cabinetSkins");
      for (let i = 0; i < 3; i++) {
        const rowY = 214 + i * 150;
        if (skin) {
          const crop = cabinetCropFor("dormant-" + i);
          const ch = 128;
          const cw = ch * (crop.sw / crop.sh);
          const cdx = CAB.x + 4;
          g.save();
          g.fillStyle = "rgba(0,0,0,0.3)";
          g.beginPath();
          g.ellipse(cdx + cw / 2, rowY + ch - 8, cw * 0.42, 7, 0, 0, Math.PI * 2);
          g.fill();
          g.restore();
          drawImageSmooth(g, skin, cdx, rowY - 6, cw, ch, crop);
          g.save();
          g.globalAlpha = 0.62;
          g.fillStyle = "#07040d";
          g.beginPath();
          g.ellipse(cdx + cw / 2, rowY + ch / 2 - 6, cw * 0.55, ch * 0.55, 0, 0, Math.PI * 2);
          g.fill();
          g.restore();
          drawText(g, "Z Z", cdx + cw / 2, rowY + ch * 0.22, 1.5, "#6a6a86", { align: "center" });
        } else {
          drawCabinet(g, CAB.x + 8, rowY, 84, 130, { name: "???", level: 1, on: false, id: "dormant-" + i });
        }
      }
      drawText(g, t("ui.noCabinets"), 112, 250, 2, INK4);
      drawText(g, t("ui.syncTo"), 112, 300, 3, GOLD4, { glow: GOLD4, glowBlur: 3 });
      drawText(g, t("ui.powerUp"), 112, 336, 3, GOLD4, { glow: GOLD4, glowBlur: 3 });
      drawText(g, t("ui.yourMachines"), 112, 380, 2, "#9a93bd");
    }
    // ---- center stage: coin bank + player ----------------------------------
    drawCenter(g, now) {
      const store2 = this.ctx.store;
      const bankCx = BANK.x + BANK.w / 2;
      this.drawTokenGuideSign(g);
      const bankHover = this.ctx.stage.hotspot({
        x: BANK.x,
        y: BANK.y,
        w: BANK.w,
        h: BANK.h,
        cursor: "pointer",
        id: "bank",
        onClick: () => void this.doSync()
      });
      const bankImg = this.ctx.assets.get("coinBank");
      if (bankImg) {
        drawImageSmooth(g, bankImg, BANK.x, BANK.y, BANK.w, BANK.h);
        const pw = 224;
        const ph = 38;
        const px = bankCx - pw / 2;
        const py = BANK.y + BANK.h * 0.855;
        rrect(g, px, py, pw, ph, 8);
        g.fillStyle = "rgba(9,6,18,0.82)";
        g.fill();
        g.strokeStyle = "rgba(95,230,214,0.6)";
        g.lineWidth = 2;
        g.stroke();
        drawText(g, fmtComma(Math.round(this.displayCoins.value)) + " " + t("ui.coins"), bankCx, py + 11, 2.5, GOLD4, {
          align: "center",
          glow: GOLD4,
          glowBlur: 3
        });
      } else {
        drawCoinBank(g, BANK.x, BANK.y, BANK.w, BANK.h, {
          fill: Math.min(1, store2.state.coinResidue / CONFIG.TOKENS_PER_COIN),
          tokens: store2.state.stats.lifetimeTokens,
          t: now / 1e3,
          label: t("ui.coinBank"),
          sublabel: fmtComma(Math.round(this.displayCoins.value)) + " " + t("ui.coins")
        });
      }
      if (bankHover) {
        panel(g, BANK.x - 6, BANK.y - 6, BANK.w + 12, BANK.h + 12, { radius: 18, border: "rgba(255,210,63,0.35)", borderWidth: 2 });
      }
      drawFloorGlints(g, now);
      const character = this.ctx.assets.get("homePlayer");
      if (character) {
        const ph = 152;
        const pw = ph * (PLAYER_BODY_CROP.sw / PLAYER_BODY_CROP.sh);
        const px = bankCx + 176;
        const floorY = 792;
        const by = floorY - ph + Math.sin(now / 400) * 4;
        g.save();
        g.fillStyle = "rgba(0,0,0,0.3)";
        g.beginPath();
        g.ellipse(px + pw / 2, floorY - 2, pw * 0.52, 8, 0, 0, Math.PI * 2);
        g.fill();
        g.restore();
        drawImageSmooth(g, character, px, by, pw, ph, PLAYER_BODY_CROP);
      } else {
        drawPlayer(g, bankCx + 210, 560 + Math.sin(now / 400) * 6, 7);
      }
      panel(g, bankCx - 160, 736, 320, 60, { radius: 8, fill: PANEL, border: MAGENTA2, borderWidth: 2 });
      drawText(g, t("ui.syncUsage"), bankCx, 744, 2, INK4, { align: "center" });
      drawText(g, t("ui.earnCoins"), bankCx, 768, 2, GOLD4, { align: "center", glow: GOLD4, glowBlur: 3 });
      if (!store2.state.firstRunDone) {
        const slotX = BANK.x + BANK.w * 0.62;
        const slotY = BANK.y + BANK.h * 0.66;
        const bob = (Math.sin(now / 400) + 1) / 2;
        const coinY = slotY - 20 - bob * 10;
        g.save();
        g.globalAlpha = 0.9;
        drawCoin(g, slotX, coinY, 11, Math.cos(now / 200));
        g.strokeStyle = "rgba(255,210,63,0.6)";
        g.lineWidth = 2;
        g.beginPath();
        g.moveTo(slotX, coinY + 12);
        g.lineTo(slotX, slotY - 4);
        g.stroke();
        g.restore();
        const a = 0.55 + 0.45 * Math.sin(now / 260);
        g.globalAlpha = a;
        drawText(g, t("ui.insertCoin"), bankCx, BANK.y + 150, 4, GOLD4, { align: "center", glow: GOLD4, glowBlur: 6, shadow: "rgba(0,0,0,0.7)" });
        drawText(g, t("ui.tapToSync"), bankCx, BANK.y + 192, 4, GOLD4, { align: "center", glow: GOLD4, glowBlur: 6, shadow: "rgba(0,0,0,0.7)" });
        g.globalAlpha = 1;
      }
    }
    /** The Home loop is explained by a localized, authored A-frame planted on
     * the floor. The letters are part of the pixel art, matching the original
     * prototype's sign-painting rather than floating canvas text. */
    drawTokenGuideSign(g) {
      const asset = this.ctx.store.state.settings.language === "zh-CN" ? "homeTokenGuideBoardZh" : "homeTokenGuideBoardEn";
      const sign = this.ctx.assets.get(asset);
      if (!sign) return;
      const x = 390;
      const y = 512;
      const w = 210;
      const h = 272;
      drawImageSmooth(g, sign, x, y, w, h);
    }
    // ---- right column: prize wall preview ----------------------------------
    drawPrizeWall(g) {
      const hovered = this.ctx.stage.hotspot({
        x: WALL.x,
        y: WALL.y,
        w: WALL.w,
        h: WALL.h,
        cursor: "pointer",
        id: "wall",
        onClick: () => this.ctx.router.go("capsule")
      });
      const shelf = this.ctx.assets.get("prizeWall");
      if (shelf) {
        this.drawPrizeWallShelf(g, shelf, hovered);
      } else {
        this.drawPrizeWallProcedural(g, hovered);
      }
      this.drawCollectionMilestones(g);
      this.drawNextCollectionGoal(g);
    }
    /** One unmistakable forward goal, mounted in the prize wall's lower status
     * bay. It stays present after completion instead of leaving a dead gap. */
    drawNextCollectionGoal(g) {
      const store2 = this.ctx.store;
      const next = store2.nextCollectionMilestone();
      const owned2 = store2.ownedCount();
      const centerX = WALL.x + WALL.w / 2;
      const box = { x: WALL.x + 30, y: WALL.y + WALL.h - 184, w: WALL.w - 60, h: 82 };
      panel(g, box.x, box.y, box.w, box.h, {
        radius: 8,
        fill: "rgba(10,7,20,0.93)",
        border: next ? "rgba(225,90,216,0.78)" : "rgba(255,210,63,0.85)",
        borderWidth: 2
      });
      if (!next) {
        drawText(g, t("collection.crowned"), centerX, box.y + 20, 1.75, GOLD4, {
          align: "center",
          glow: GOLD4,
          glowBlur: 4
        });
        drawText(g, owned2 + " / " + store2.totalCollectibles(), centerX, box.y + 46, 1.3, INK4, { align: "center" });
        bar(g, centerX - 116, box.y + box.h - 13, 232, 7, 1, GOLD4);
        return;
      }
      drawText(g, t("collection.nextArcadeUpgrade"), centerX, box.y + 11, 1.65, MAGENTA2, {
        align: "center",
        glow: MAGENTA2,
        glowBlur: 2
      });
      const value = t("collection.nextProgress", {
        n: next.remaining,
        name: t(next.milestone.nameKey)
      });
      let valueScale = 1.45;
      while (valueScale > 0.82 && measureText(value, valueScale) > box.w - 24) valueScale -= 0.05;
      drawText(g, value, centerX, box.y + 39, valueScale, GOLD4, { align: "center" });
      bar(g, centerX - 116, box.y + box.h - 13, 232, 7, owned2 / next.milestone.threshold, CYAN3);
    }
    /** Permanent P1C room upgrades. Each tier is derived from unique valid
     * prizes, so no extra save flag or currency can drift out of sync. */
    drawCollectionMilestones(g) {
      const tier = this.ctx.store.collectionMilestoneTier();
      if (tier >= 2) {
        const lights = this.ctx.assets.get("collectionPrizeLights");
        if (lights) drawImageContain(g, lights, WALL.x + WALL.w / 2, WALL.y + 56, 220, 56);
      }
      if (tier >= 4) {
        const crown = this.ctx.assets.get("collectionCrownMarquee");
        if (crown) drawImageContain(g, crown, WALL.x + WALL.w / 2, WALL.y + 36, WALL.w - 62, 96);
      }
    }
    /** Prize wall rendered on the generated shelf asset. */
    drawPrizeWallShelf(g, shelf, hovered) {
      const store2 = this.ctx.store;
      if (hovered) {
        g.save();
        g.shadowColor = MAGENTA2;
        g.shadowBlur = 24;
        drawImageSmooth(g, shelf, WALL.x, WALL.y, WALL.w, WALL.h);
        g.restore();
      }
      drawImageSmooth(g, shelf, WALL.x, WALL.y, WALL.w, WALL.h);
      drawText(g, t("ui.prizeWall"), WALL.x + WALL.w / 2, WALL.y + 88, 2.5, MAGENTA2, {
        align: "center",
        glow: MAGENTA2,
        glowBlur: 4,
        shadow: "rgba(0,0,0,0.6)"
      });
      const owned2 = COLLECTIBLES.filter((c) => store2.state.owned[c.id]);
      const locked = COLLECTIBLES.filter((c) => !store2.state.owned[c.id]);
      const display = owned2.concat(locked).slice(0, 20);
      for (let i = 0; i < display.length; i++) {
        const c = display[i];
        const slot = PRIZE_WALL_SLOTS[Math.floor(i / 4)][i % 4];
        const cx = WALL.x + slot.x * WALL.w;
        const cy = WALL.y + slot.y * WALL.h;
        const isOwned = !!store2.state.owned[c.id];
        if (isOwned) {
          radial(g, cx, cy, 34, "rgba(255,255,255,0.10)");
          radial(g, cx, cy, 26, rarityGlow(c.rarity));
          const icon = collectibleIcon(c.id);
          if (icon) drawIconCentered(g, icon, cx, cy, 46);
          else drawSpriteCentered(g, c.sprite, cx, cy, 46, c.tint);
        } else {
          drawPadlock(g, cx, cy, "#4a4270");
        }
      }
      drawText(
        g,
        t("ui.collected", { n: store2.ownedCount(), total: store2.totalCollectibles() }),
        WALL.x + WALL.w / 2,
        WALL.y + WALL.h * 0.735,
        2,
        GOLD4,
        { align: "center", glow: GOLD4, glowBlur: 3, shadow: "rgba(0,0,0,0.6)" }
      );
    }
    /** Procedural fallback prize wall (asset missing / still loading). */
    drawPrizeWallProcedural(g, hovered) {
      const store2 = this.ctx.store;
      panel(g, WALL.x, WALL.y, WALL.w, WALL.h, {
        radius: 12,
        fill: "rgba(20,15,36,0.55)",
        border: hovered ? MAGENTA2 : "rgba(225,90,216,0.5)",
        borderWidth: hovered ? 3 : 2
      });
      drawText(g, t("ui.prizeWall"), WALL.x + 12, WALL.y + 10, 3, MAGENTA2, { glow: MAGENTA2, glowBlur: 3 });
      const cols = 4;
      const slot = 78;
      const stride = 86;
      const startX = WALL.x + 12;
      const startY = WALL.y + 52;
      const count = Math.min(COLLECTIBLES.length, 28);
      for (let i = 0; i < count; i++) {
        const c = COLLECTIBLES[i];
        const sx = startX + i % cols * stride;
        const sy = startY + Math.floor(i / cols) * stride;
        const owned2 = !!store2.state.owned[c.id];
        if (owned2) {
          panel(g, sx, sy, slot, slot, { radius: 8, fill: "#241a3f", border: RARITIES[c.rarity].color, borderWidth: 2 });
          const icon = collectibleIcon(c.id);
          if (icon) drawIconCentered(g, icon, sx + slot / 2, sy + slot / 2, slot - 16);
          else drawSprite(g, c.sprite, sx + 7, sy + 7, 4, c.tint);
        } else {
          panel(g, sx, sy, slot, slot, { radius: 8, fill: "#0f0a1c", border: "#2a2440", borderWidth: 2 });
          drawText(g, "?", sx + slot / 2, sy + 24, 4, "#3a3352", { align: "center" });
        }
      }
      const collectedY = startY + Math.ceil(count / cols) * stride + 6;
      drawText(
        g,
        t("ui.collected", { n: store2.ownedCount(), total: store2.totalCollectibles() }),
        WALL.x + WALL.w / 2,
        collectedY,
        2,
        GOLD4,
        { align: "center" }
      );
    }
    // ---- bottom rail: controls + spend --------------------------------------
    /** The spend rail rendered as a physical arcade counter / ticket desk. */
    drawCounter(g) {
      const r = RAIL;
      const topH = 12;
      const sh = g.createLinearGradient(0, r.y + r.h, 0, r.y + r.h + 14);
      sh.addColorStop(0, "rgba(0,0,0,0.5)");
      sh.addColorStop(1, "rgba(0,0,0,0)");
      g.fillStyle = sh;
      g.fillRect(r.x - 6, r.y + r.h, r.w + 12, 14);
      rrect(g, r.x, r.y + topH, r.w, r.h - topH, 6);
      vgrad(g, r.x, r.y + topH, r.w, r.h - topH, "#241a38", "#0c0916");
      g.fill();
      g.strokeStyle = "rgba(0,0,0,0.35)";
      g.lineWidth = 2;
      for (let sx = r.x + 300; sx < r.x + r.w - 40; sx += 244) {
        g.beginPath();
        g.moveTo(sx, r.y + topH + 6);
        g.lineTo(sx, r.y + r.h - 6);
        g.stroke();
      }
      rrect(g, r.x - 4, r.y, r.w + 8, topH + 4, 6);
      vgrad(g, r.x - 4, r.y, r.w + 8, topH + 4, "#4a3a6e", "#2a2040");
      g.fill();
      g.fillStyle = "rgba(255,255,255,0.18)";
      g.fillRect(r.x - 4, r.y + 1, r.w + 8, 2);
      g.save();
      g.shadowColor = MAGENTA2;
      g.shadowBlur = 8;
      g.strokeStyle = "rgba(225,90,216,0.7)";
      g.lineWidth = 2;
      g.beginPath();
      g.moveTo(r.x + 6, r.y + topH + 4);
      g.lineTo(r.x + r.w - 6, r.y + topH + 4);
      g.stroke();
      g.restore();
      g.fillStyle = "#6a6a86";
      for (const [rx, ry] of [
        [r.x + 8, r.y + r.h - 8],
        [r.x + r.w - 8, r.y + r.h - 8]
      ]) {
        g.beginPath();
        g.arc(rx, ry, 3, 0, Math.PI * 2);
        g.fill();
      }
    }
    drawSpendRail(g) {
      const store2 = this.ctx.store;
      this.drawCounter(g);
      const icoY = RAIL.y + 17;
      this.drawUtilityButton(g, RAIL.x + 8, icoY, "mute", store2.state.settings.muted ? "muted" : "soundOn", () => {
        store2.toggleMute();
        this.ctx.sound.setMuted(store2.state.settings.muted);
      });
      this.drawUtilityButton(g, RAIL.x + 62, icoY, "settings", "settings", () => this.ctx.openSettings());
      this.drawUtilityButton(g, RAIL.x + 116, icoY, "help", "help", () => this.ctx.openHelp());
      drawText(g, t("ui.spendCoins"), RAIL.x + 180, RAIL.y + 34, 2, GOLD4, { glow: GOLD4, glowBlur: 3 });
      const count = SHOP.length;
      const cardH = 82;
      const cardW = Math.round(cardH * 2.26);
      const btnY = RAIL.y + 1;
      const startX = 348;
      const endX = 1578;
      const stride = count > 1 ? (endX - startX - cardW) / (count - 1) : 0;
      const cardFrame = this.ctx.assets.get("homeShopCard");
      for (let i = 0; i < count; i++) {
        const item = SHOP[i];
        const bx = Math.round(startX + i * stride);
        const complete = store2.isGrantComplete(item);
        const afford = !complete && store2.state.coins >= item.cost;
        const accent = complete ? "#6a6488" : item.kind === "capsule" ? MAGENTA2 : GOLD4;
        const hovered = this.ctx.stage.hotspot({
          x: bx,
          y: btnY,
          w: cardW,
          h: cardH,
          cursor: "pointer",
          id: "shop-" + item.id,
          onClick: () => this.onShop(item, bx + cardW / 2, btnY + cardH / 2, afford)
        });
        g.globalAlpha = complete ? 0.62 : afford ? 1 : 0.45;
        if (cardFrame) {
          if (hovered && afford) {
            g.save();
            g.shadowColor = accent;
            g.shadowBlur = 14;
            drawImageSmooth(g, cardFrame, bx, btnY, cardW, cardH);
            g.restore();
          }
          drawImageSmooth(g, cardFrame, bx, btnY, cardW, cardH);
        } else {
          panel(g, bx, btnY, cardW, cardH, {
            radius: 8,
            fill: afford ? hovered ? "#2a1f4a" : "#201636" : "#150f22",
            border: afford ? accent : "#33284d",
            borderWidth: hovered ? 3 : 2
          });
        }
        const icoCx = bx + cardW * 0.215;
        const icoCy = btnY + cardH * 0.44;
        const icoSize = cardH * 0.54;
        const repId = item.kind === "grant" && item.pick ? this.repCollectibleId(item.pick) : null;
        const repIcon = repId ? collectibleIcon(repId) : null;
        if (item.kind === "capsule") {
          const bundle = item.id === "pull10";
          const capImg = this.ctx.assets.get(bundle ? "shopCapsuleBundle" : "shopCapsuleSingle");
          if (capImg) {
            const maxH = cardH * 0.66;
            const maxW = cardW * (bundle ? 0.31 : 0.28);
            drawImageContain(g, capImg, icoCx, icoCy, maxW, maxH);
          }
        } else if (repIcon) {
          drawIconCentered(g, repIcon, icoCx, icoCy, icoSize);
        } else {
          drawSpriteCentered(g, item.sprite, icoCx, icoCy, icoSize);
        }
        const txtX = bx + cardW * 0.39;
        drawText(g, complete ? t("ui.complete") : t("shop." + item.id + ".label"), txtX, btnY + cardH * 0.19, 1.5, complete ? "#b9b3d6" : INK4);
        drawText(g, complete ? t("ui.customizeArcade") : t("shop." + item.id + ".sub"), txtX, btnY + cardH * 0.42, 1.2, "#b9b3d6");
        const priceCx = bx + cardW * 0.68;
        const priceCy = btnY + cardH * 0.7;
        if (complete) {
          drawText(g, "\u2713", priceCx, priceCy - 5, 2.3, CYAN3, { align: "center", glow: CYAN3, glowBlur: 3 });
        } else {
          const priceStr = fmtComma(item.cost);
          const pw = measureText(priceStr, 2);
          drawCoin(g, priceCx - pw / 2 - 10, priceCy + 4, 7);
          drawText(g, priceStr, priceCx - pw / 2 + 6, priceCy - 3, 2, GOLD4);
        }
        g.globalAlpha = 1;
      }
    }
    /** A representative collectible id for a grant shop item's type, so the card
     * can show that collectible's generated icon. Null if none / not a grant. */
    repCollectibleId(type) {
      const c = COLLECTIBLES.find((x) => x.type === type);
      return c ? c.id : null;
    }
    /** A bottom-left utility button drawn from the generated utility-button sheet
     * (home-utility-buttons-sheet-v2.png). The hit area is a FIXED 48x48 box; the
     * button art is drawn centered inside it at the sheet cell's own aspect
     * (~384:341 ≈ 1.125), and only the SOURCE crop row changes between normal/hover
     * — the destination rect is identical across states, so hovering never shifts
     * or resizes the button and the hotspot always matches the art. Falls back to a
     * plain neutral panel only while the sheet is still decoding. */
    drawUtilityButton(g, x, y, id, key, onClick) {
      const HIT = 48;
      const hovered = this.ctx.stage.hotspot({ x, y, w: HIT, h: HIT, cursor: "pointer", id: "ico-" + id, onClick });
      const state = hovered ? "hover" : "normal";
      const crop = utilityButtonCrop(key, state);
      const bw = HIT;
      const bh = Math.round(HIT * (crop.sh / crop.sw));
      const bx = x + (HIT - bw) / 2;
      const by = y + (HIT - bh) / 2;
      const sheet = this.ctx.assets.get("homeUtilityButtons");
      if (sheet) {
        drawImageSmooth(g, sheet, bx, by, bw, bh, crop);
      } else {
        panel(g, bx, by, bw, bh, { radius: 8, fill: hovered ? "#2a1f4a" : "#1b1230", border: "#4a4270", borderWidth: 2 });
      }
    }
    // ---- actions ------------------------------------------------------------
    onShop(item, cx, cy, afford) {
      if (item.kind === "capsule") {
        this.ctx.sound.click();
        this.ctx.router.go("capsule");
        return;
      }
      if (!afford || this.ctx.store.isGrantComplete(item)) {
        this.ctx.sound.error();
        return;
      }
      this.doBuy(item, cx, cy);
    }
    doBuy(item, cx, cy) {
      const res = this.ctx.store.buy(item);
      if (!res) {
        this.ctx.sound.error();
        return;
      }
      const r = RARITIES[res.collectible.rarity];
      const isNewCosmetic = !res.isDup && (res.collectible.type === "theme" || res.collectible.type === "frame");
      if (isNewCosmetic) {
        this.ctx.fx.burst(1102, 214, r.glow, 16);
        this.ctx.fx.cosmeticReveal(tCollectibleName(res.collectible.id), res.collectible.sprite, res.collectible.id);
      } else {
        this.ctx.fx.burst(cx, cy - 10, r.glow, 22);
        this.ctx.fx.banner(res.isDup ? t("ui.dup", { n: res.count }) : t("ui.unlockedBang"), cx, cy - 44, r.color, { scale: 4, life: 1.8 });
        this.ctx.fx.banner(tCollectibleName(res.collectible.id), cx, cy - 96, INK4, { scale: 2, life: 2.2, vy: -22 });
      }
      this.ctx.fx.banner(t("ui.minusCoins", { n: item.cost }), COINS_TARGET.x, COINS_TARGET.y + 34, "#ff9a3c", { scale: 3, life: 1.4 });
      this.ctx.sound.reveal(res.collectible.rarity);
      this.ctx.sound.coin();
      for (const a of res.achievements) this.ctx.fx.toast(tAchName(a.id), tAchDesc(a.id), a.sprite);
      for (const milestone of res.milestones) {
        this.ctx.fx.toast(t(milestone.nameKey), t(milestone.descKey), "starBadge");
      }
    }
    async doSync() {
      if (this.syncing) return;
      this.syncing = true;
      this.ctx.sound.click();
      const bankCx = BANK.x + BANK.w / 2;
      const bankCy = BANK.y + BANK.h * 0.45;
      try {
        const result = await this.ctx.store.sync();
        if (result.source === "no-history") return;
        if (result.source === "demo") {
          this.ctx.fx.banner(t("ui.demoSync"), bankCx, BANK.y + 12, CYAN3, { scale: 1.7, life: 1.8, vy: -10 });
        }
        this.ctx.stage.wake(2800);
        if (result.coinsMinted > 0) {
          const n = Math.min(result.coinsMinted, 40);
          this.ctx.fx.coinRain(bankCx, bankCy, n, COINS_TARGET, () => this.ctx.sound.coinTick());
          this.ctx.fx.banner(t("ui.newTokens", { n: fmtCompact(result.newTokens) }), bankCx, BANK.y + 40, CYAN3, { scale: 1.75, life: 2.2, vy: -12 });
          this.ctx.fx.banner(t("ui.coinsPlus", { n: fmtComma(result.coinsMinted) }), bankCx, BANK.y + 74, GOLD4, { scale: 2.75, life: 2.2, vy: -16 });
          this.ctx.sound.coin();
        } else {
          this.ctx.fx.banner(t("ui.allCaughtUp"), bankCx, BANK.y + 150, CYAN3, { scale: 4, life: 1.8 });
        }
        for (let i = 0; i < result.levelUps.length; i++) {
          const lu = result.levelUps[i];
          this.ctx.fx.pulse(lu.id);
          if (i >= 2) continue;
          this.ctx.sound.levelUp();
          const ly = BANK.y + 232 + i * 96;
          this.ctx.fx.banner(t("ui.poweredUp", { name: lu.name }), bankCx, ly, GOLD4, { scale: 2.25, life: 2, vy: -18 });
          this.ctx.fx.banner(t("ui.lvArrow", { from: lu.from, to: lu.to }), bankCx, ly + 32, INK4, { scale: 2, life: 2, vy: -18 });
          if (lu.stageTo) {
            this.ctx.fx.banner(t("ui.becameCabinet", { name: lu.name, stage: lu.stageTo }), bankCx, ly + 60, MAGENTA2, { scale: 2, life: 2, vy: -18 });
          }
        }
        for (const a of result.achievements) this.ctx.fx.toast(tAchName(a.id), tAchDesc(a.id), a.sprite);
      } catch {
        this.ctx.fx.banner(t("ui.syncFailed"), bankCx, bankCy, "#ff9a3c", { scale: 4, life: 1.8 });
        this.ctx.sound.error();
      } finally {
        this.syncing = false;
      }
    }
    /** Start demo only after the player chooses it in the no-history panel. */
    async playDemoArcade() {
      if (this.syncing) return;
      this.ctx.store.setMode("demo");
      this.displayCoins.set(this.ctx.store.state.coins);
      await this.doSync();
    }
    /** Settings' one-click escape hatch from demo back to an isolated live scan. */
    async tryLiveScanFromSettings() {
      if (this.syncing) return;
      this.ctx.store.setMode("live");
      this.displayCoins.set(this.ctx.store.state.coins);
      await this.doSync();
    }
    /** Canvas decision panel for an empty first local scan. It intentionally
     * gates mock projects behind a deliberate player choice. */
    drawNoHistoryDecision(g) {
      const state = this.ctx.store.state;
      if (state.mode !== "live" || state.historyScan !== "no-history") return;
      const x = 442;
      const y = 258;
      const w = 716;
      const h = 476;
      g.save();
      g.fillStyle = "rgba(4,3,10,0.55)";
      g.fillRect(0, 0, this.ctx.stage.width, this.ctx.stage.height);
      g.restore();
      panel(g, x, y, w, h, { radius: 14, fill: "rgba(18,12,34,0.98)", border: GOLD4, borderWidth: 3 });
      g.fillStyle = "rgba(95,230,214,0.32)";
      g.fillRect(x + 26, y + 72, w - 52, 2);
      for (let i = 0; i < 9; i++) {
        g.fillStyle = i % 2 ? CYAN3 : GOLD4;
        g.fillRect(x + 30 + i * ((w - 64) / 8), y + 22, 5, 5);
      }
      drawText(g, t("ui.noHistoryFound"), x + w / 2, y + 35, 3.2, GOLD4, { align: "center", glow: GOLD4, glowBlur: 6 });
      const body = wrapText(t("ui.noHistoryBody"), 2, w - 94);
      let bodyY = y + 104;
      for (const line of body) {
        drawText(g, line, x + w / 2, bodyY, 2, INK4, { align: "center" });
        bodyY += 22;
      }
      this.drawHistoryChoice(g, x + 42, y + 184, w - 84, 98, "demo-choice", t("ui.playDemoArcade"), t("ui.playDemoSub"), GOLD4, () => void this.playDemoArcade());
      this.drawHistoryChoice(g, x + 42, y + 310, w - 84, 98, "scan-choice", t("ui.scanAgain"), t("ui.scanAgainSub"), CYAN3, () => void this.doSync());
    }
    drawHistoryChoice(g, x, y, w, h, id, title, sub, color, onClick) {
      const hovered = this.ctx.stage.hotspot({ x, y, w, h, cursor: "pointer", id, onClick });
      panel(g, x, y, w, h, {
        radius: 10,
        fill: hovered ? "#2a1f4a" : "#120d24",
        border: hovered ? color : "rgba(126,118,168,0.7)",
        borderWidth: hovered ? 3 : 2
      });
      g.fillStyle = color;
      g.fillRect(x + 16, y + 14, 5, h - 28);
      let titleScale = 2.35;
      while (titleScale > 1.25 && measureText(title, titleScale) > w - 72) titleScale -= 0.15;
      drawText(g, title, x + 40, y + 21, titleScale, hovered ? color : INK4, { glow: hovered ? color : void 0, glowBlur: 4 });
      const subLines = wrapText(sub, 1.4, w - 72).slice(0, 2);
      let subY = y + 55;
      for (const line of subLines) {
        drawText(g, line, x + 40, subY, 1.4, "#c9c6e0");
        subY += 15;
      }
    }
  };

  // src/screens/chrome.ts
  var CYAN4 = "#5fe6d6";
  var BACK = { x: 16, y: 16, w: 150 };
  function drawBackButton(g, ctx2, onClick) {
    const h = Math.round(BACK.w / FRAME_ANCHORS.backButton.aspect);
    const hovered = ctx2.stage.hotspot({ x: BACK.x, y: BACK.y, w: BACK.w, h, cursor: "pointer", id: "back", onClick });
    const img = ctx2.assets.get("achBackButton");
    if (img) {
      if (hovered) {
        g.save();
        g.shadowColor = CYAN4;
        g.shadowBlur = 12;
        drawImageSmooth(g, img, BACK.x, BACK.y, BACK.w, h);
        g.restore();
      } else {
        drawImageSmooth(g, img, BACK.x, BACK.y, BACK.w, h);
      }
      const win = FRAME_ANCHORS.backButton.textWin;
      const label = t("ui.back");
      const w1 = Math.max(1, measureText(label, 1));
      const s = Math.max(1, Math.min(1.9, BACK.w * win.w * 0.9 / w1));
      drawText(g, label, BACK.x + BACK.w * win.cx, BACK.y + h * win.cy - GLYPH_H * s / 2, s, CYAN4, { align: "center" });
    } else {
      panel(g, BACK.x, BACK.y, 120, 52, { radius: 10, fill: hovered ? "#2a1f4a" : "#1b1230", border: CYAN4, borderWidth: 2 });
      drawText(g, "< " + t("ui.back"), BACK.x + 60, BACK.y + 16, 2, CYAN4, { align: "center" });
    }
  }

  // src/screens/cabinetScreen.ts
  var GOLD5 = "#ffd23f";
  var CYAN5 = "#5fe6d6";
  var MAGENTA3 = "#e15ad8";
  var GREEN3 = "#5fd66f";
  var INK5 = "#f6f4ff";
  var MUTE = "#9a93bd";
  var PANEL_2 = "#120b22";
  var CAB2 = { x: 150, y: 126, w: 472, h: 660 };
  var STATS = { x: 766, y: 132, w: 800, h: 578 };
  var RAIL2 = { x: 16, y: 410, w: 1568, h: 762 };
  var WALL2 = { x: 760, y: 130, w: 800, h: 560 };
  var SB_ROWS = [0.194, 0.315, 0.431, 0.547, 0.663];
  var SB_ICON_ROWS = [0.208, 0.324, 0.44, 0.555, 0.672];
  var SB_ICON_X = 0.2034;
  var SB_ICON_SIZE = 0.056;
  var SB_LABEL_X = 0.268;
  var SB_VALUE_X = 0.83;
  var SB_LED = { x: 0.363, y: 0.792, w: 0.266, h: 0.03 };
  var RR_SLOTS_X = [0.16, 0.2546, 0.3496, 0.4444, 0.5536, 0.6484, 0.7426, 0.8371];
  var RR_SLOT_Y = 0.6945;
  function bar2(g, x, y, w, h, frac, fill) {
    g.fillStyle = "#05060f";
    g.fillRect(x, y, w, h);
    const f = Math.max(0, Math.min(1, frac));
    g.fillStyle = fill;
    g.fillRect(x + 1, y + 1, Math.max(0, (w - 2) * f), h - 2);
    g.strokeStyle = "rgba(0,0,0,0.5)";
    g.lineWidth = 1;
    g.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
  }
  var CabinetScreen = class {
    constructor(ctx2) {
      this.ctx = ctx2;
      this.name = "cabinet";
      this.projectId = null;
      this.displayCoins = new EasedNumber();
      // The cabinet sprite's fitted draw rect (aspect-preserved within CAB), shared
      // between drawBigCabinet and drawLevelFooter. Defaults to CAB for the
      // procedural fallback.
      this.cabDraw = { x: CAB2.x, y: CAB2.y, w: CAB2.w, h: CAB2.h };
    }
    enter(params2) {
      const id = params2?.id ?? null;
      const proj = id ? this.ctx.store.state.projects.find((p) => p.id === id) : void 0;
      if (!proj) {
        this.ctx.router.go("room");
        return;
      }
      this.projectId = proj.id;
      this.displayCoins.set(this.ctx.store.state.coins);
    }
    render(g, dt, now) {
      const proj = this.projectId ? this.ctx.store.state.projects.find((p) => p.id === this.projectId) : void 0;
      if (!proj) return;
      this.displayCoins.toward(this.ctx.store.state.coins, dt);
      this.drawBackground(g);
      this.drawBigCabinet(g, proj, now);
      this.drawStatsBoard(g, proj);
      this.drawRewardsRail(g, proj);
      this.drawLevelFooter(g, proj);
      this.drawHeader(g, proj);
    }
    // ---- background ---------------------------------------------------------
    drawBackground(g) {
      const W = this.ctx.stage.width;
      const H = this.ctx.stage.height;
      const bg2 = this.ctx.assets.get("projRoomBg");
      if (bg2) {
        drawImageSmooth(g, bg2, 0, 0, W, H);
        const grad = g.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, "rgba(6,4,12,0.55)");
        grad.addColorStop(0.18, "rgba(6,4,12,0.05)");
        grad.addColorStop(1, "rgba(6,4,12,0)");
        g.fillStyle = grad;
        g.fillRect(0, 0, W, H);
        return;
      }
      vgrad(g, 0, 0, W, H, "#221436", "#07040d");
      vgrad(g, 0, 720, W, H - 720, "#170f2c", "#0a0616");
      g.fillStyle = "rgba(95,230,214,0.08)";
      g.fillRect(0, 720, W, 2);
    }
    // ---- header -------------------------------------------------------------
    drawHeader(g, proj) {
      drawBackButton(g, this.ctx, () => this.ctx.router.back());
      drawText(g, proj.name, 800, 24, 4, INK5, { align: "center", glow: MAGENTA3, glowBlur: 4, shadow: "rgba(0,0,0,0.5)" });
      drawText(g, t("ui.projectCabinet"), 800, 66, 1.5, MUTE, { align: "center" });
      const HW = 252;
      const HX = 1600 - HW - 24;
      drawCoinHud(g, this.ctx.assets, HX, 14, HW, fmtComma(Math.round(this.displayCoins.value)));
      drawTokenHud(g, this.ctx.assets, HX, 14 + hudPlaqueHeight(HW) + 8, HW, fmtComma(this.ctx.store.state.stats.lifetimeTokens));
      drawDemoPlaque(g, this.ctx, HX - 170, 18, 160);
    }
    // ---- big project cabinet ------------------------------------------------
    drawBigCabinet(g, proj, now) {
      const info = levelInfo(proj.tokens);
      const variant = stageCabinet(info.stage.index);
      const img = this.ctx.assets.get(variant.asset);
      if (!img) {
        drawCabinet(g, CAB2.x, CAB2.y, CAB2.w, CAB2.h, {
          name: proj.name,
          level: info.stage.index + 1,
          id: proj.id,
          on: true,
          glow: 1,
          progress: info.progress
        });
        drawText(g, t("ui.tokenPower"), CAB2.x, CAB2.y + CAB2.h + 26, 2, CYAN5, { glow: CYAN5, glowBlur: 3 });
        drawText(g, t("ui.coinPower", { x: info.multiplier.toFixed(2) + "x" }), CAB2.x + CAB2.w, CAB2.y + CAB2.h + 26, 1.6, GOLD5, {
          align: "right",
          glow: GOLD5,
          glowBlur: 3
        });
        bar2(g, CAB2.x, CAB2.y + CAB2.h + 54, CAB2.w, 24, info.progress, variant.accent);
        return;
      }
      const nw = img.naturalWidth || CAB2.w;
      const nh = img.naturalHeight || CAB2.h;
      const ar = nw / nh;
      let dw = CAB2.h * ar;
      let dh = CAB2.h;
      if (dw > CAB2.w) {
        dw = CAB2.w;
        dh = CAB2.w / ar;
      }
      const dx = CAB2.x + (CAB2.w - dw) / 2;
      const dy = CAB2.y + (CAB2.h - dh);
      this.cabDraw = { x: dx, y: dy, w: dw, h: dh };
      g.save();
      g.fillStyle = "rgba(0,0,0,0.4)";
      g.beginPath();
      g.ellipse(dx + dw / 2, dy + dh - 8, dw * 0.42, 14, 0, 0, Math.PI * 2);
      g.fill();
      g.restore();
      drawImageSmooth(g, img, dx, dy, dw, dh);
      const rect2 = (a) => ({
        x: dx + a.x * dw,
        y: dy + a.y * dh,
        w: a.w * dw,
        h: a.h * dh
      });
      const m = rect2(variant.marquee);
      const mCx = m.x + m.w / 2;
      let nameScale = 3;
      while (nameScale > 1 && measureText(proj.name, nameScale) > m.w - 16) nameScale -= 0.25;
      const twinkle = 0.75 + 0.25 * ((Math.sin(now / 380) + 1) / 2);
      g.globalAlpha = twinkle;
      drawText(g, proj.name, mCx, m.y + m.h / 2 - nameScale * 3.5, nameScale, INK5, {
        align: "center",
        glow: variant.accent,
        glowBlur: 5,
        shadow: "rgba(0,0,0,0.6)"
      });
      g.globalAlpha = 1;
      const s = rect2(variant.screen);
      const sCx = s.x + s.w / 2;
      const sg = g.createLinearGradient(0, s.y, 0, s.y + s.h);
      sg.addColorStop(0, this.rgba(variant.accent, 0.14));
      sg.addColorStop(1, this.rgba(variant.accent, 0.04));
      g.fillStyle = sg;
      g.fillRect(s.x, s.y, s.w, s.h);
      g.fillStyle = "rgba(0,0,0,0.14)";
      for (let yy = s.y + 2; yy < s.y + s.h; yy += 6) g.fillRect(s.x, yy, s.w, 2);
      drawText(g, "LVL", sCx, s.y + s.h * 0.08, 2, variant.accent, { align: "center", glow: variant.accent, glowBlur: 3 });
      drawText(g, String(info.level), sCx, s.y + s.h * 0.2, 6, INK5, {
        align: "center",
        glow: variant.accent,
        glowBlur: 6,
        shadow: "rgba(0,0,0,0.6)"
      });
      drawText(g, t("ui.stageCabinet", { stage: tStageName(info.stage.key) }), sCx, s.y + s.h * 0.56, 1.3, variant.accent, {
        align: "center",
        glow: variant.accent,
        glowBlur: 3,
        shadow: "rgba(0,0,0,0.6)"
      });
      const pbW = s.w * 0.78;
      const pbX = sCx - pbW / 2;
      const pbY = s.y + s.h * 0.74;
      drawText(g, t("ui.tokenPower"), sCx, pbY - 15, 1.3, MUTE, { align: "center" });
      bar2(g, pbX, pbY, pbW, 15, info.progress, variant.accent);
      if (info.isMax) {
        drawText(g, t("ui.maxLevel"), sCx, pbY + 22, 1.4, GOLD5, {
          align: "center",
          glow: GOLD5,
          glowBlur: 4,
          shadow: "rgba(0,0,0,0.6)"
        });
      } else {
        drawText(g, fmtCompact(proj.tokens) + " / " + fmtCompact(info.next ?? 0), sCx, pbY + 22, 1.3, INK5, {
          align: "center",
          shadow: "rgba(0,0,0,0.6)"
        });
      }
    }
    /** Coin-multiplier plate + near-level-up momentum cue. Called after the
     * rewards rail so the rail image never occludes them. */
    drawLevelFooter(g, proj) {
      const info = levelInfo(proj.tokens);
      const plateW = 250;
      const plateH = 34;
      const plateX = this.cabDraw.x + this.cabDraw.w / 2 - plateW / 2;
      const plateY = CAB2.y + CAB2.h + 6;
      panel(g, plateX, plateY, plateW, plateH, { radius: 17, fill: PANEL_2, border: GOLD5, borderWidth: 2 });
      drawCoin(g, plateX + 22, plateY + plateH / 2, 10);
      drawText(g, t("ui.coinPower", { x: info.multiplier.toFixed(2) + "x" }), plateX + 40, plateY + plateH / 2 - 7, 1.6, GOLD5, {
        glow: GOLD5,
        glowBlur: 3
      });
      if (!info.isMax && info.progress > 0.8) {
        drawText(g, t("ui.levelUpSoon"), plateX + plateW + 96, plateY + plateH / 2 - 6, 1.5, GREEN3, {
          align: "center",
          glow: GREEN3,
          glowBlur: 4,
          shadow: "rgba(0,0,0,0.6)"
        });
      }
    }
    // ---- stats board --------------------------------------------------------
    drawStatsBoard(g, proj) {
      const info = levelInfo(proj.tokens);
      const img = this.ctx.assets.get("projStatsBoard");
      if (!img) {
        this.drawStatsProcedural(g, proj);
        return;
      }
      drawImageSmooth(g, img, STATS.x, STATS.y, STATS.w, STATS.h);
      const rows = [
        { key: "tokensSync", icon: "tokenChip", label: t("ui.tokensThisSync"), value: "+" + fmtComma(proj.lastGained ?? 0), color: GREEN3 },
        { key: "lifetimeTokens", icon: "tokenChip", label: t("ui.lifetimeTokens"), value: fmtComma(proj.tokens), color: INK5 },
        { key: "coinsMinted", icon: "goldCoin", label: t("ui.baseCoins"), value: fmtComma(proj.coins), color: GOLD5 },
        { key: "cabinetLevel", icon: "miniCabinet", label: t("ui.cabinetLevel"), value: "LVL " + info.level, color: CYAN5 },
        { key: "provider", icon: "ggSign", label: t("ui.provider"), value: proj.provider.toUpperCase(), color: INK5 }
      ];
      for (let i = 0; i < rows.length; i++) {
        const r = rows[i];
        const cy = STATS.y + SB_ROWS[i] * STATS.h;
        const iconCx = STATS.x + SB_ICON_X * STATS.w;
        const iconCy = STATS.y + SB_ICON_ROWS[i] * STATS.h;
        const tile = this.ctx.assets.get(statTileAsset(r.key));
        if (tile) drawIconCentered(g, tile, iconCx, iconCy, SB_ICON_SIZE * STATS.w);
        else drawSprite(g, r.icon, iconCx - 16, iconCy - 16, 2);
        drawText(g, r.label, STATS.x + SB_LABEL_X * STATS.w, cy - 7, 2, "#cfc9ea");
        drawText(g, r.value, STATS.x + SB_VALUE_X * STATS.w, cy - 8, 2.25, r.color, {
          align: "right",
          glow: r.color === INK5 ? void 0 : r.color,
          glowBlur: 2
        });
      }
      const led = {
        x: STATS.x + SB_LED.x * STATS.w,
        y: STATS.y + SB_LED.y * STATS.h,
        w: SB_LED.w * STATS.w,
        h: SB_LED.h * STATS.h
      };
      g.save();
      rrect(g, led.x, led.y, led.w, led.h, led.h / 2);
      g.clip();
      g.fillStyle = "rgba(3,4,10,0.5)";
      g.fillRect(led.x, led.y, led.w, led.h);
      g.fillStyle = info.isMax ? GOLD5 : GREEN3;
      g.fillRect(led.x, led.y, led.w * Math.max(0.03, Math.min(1, info.progress)), led.h);
      g.restore();
      const nextLabel = info.isMax ? t("ui.maxLevel") : fmtCompact(proj.tokens) + " / " + fmtCompact(info.next ?? 0);
      drawText(g, t("ui.nextLevel"), led.x - 8, led.y + led.h / 2 - 5, 1.4, MAGENTA3, { align: "right" });
      drawText(g, nextLabel, led.x + led.w + 8, led.y + led.h / 2 - 5, 1.4, INK5);
    }
    /** Procedural fallback stats card (board asset missing / still loading). */
    drawStatsProcedural(g, proj) {
      const info = levelInfo(proj.tokens);
      panel(g, WALL2.x, WALL2.y, WALL2.w, WALL2.h, { radius: 12, fill: "rgba(20,15,36,0.7)", border: "#4a4270", borderWidth: 2 });
      drawText(g, t("ui.projectStats"), WALL2.x + 24, WALL2.y + 24, 3, GOLD5, { glow: GOLD5, glowBlur: 3 });
      const rows = [
        { icon: "tokenChip", label: t("ui.tokensThisSync"), value: "+" + fmtComma(proj.lastGained ?? 0), color: GREEN3 },
        { icon: "tokenChip", label: t("ui.lifetimeTokens"), value: fmtComma(proj.tokens), color: INK5 },
        { icon: "goldCoin", label: t("ui.baseCoins"), value: fmtComma(proj.coins), color: GOLD5 },
        { icon: "miniCabinet", label: t("ui.cabinetLevel"), value: "LVL " + info.level, color: CYAN5 },
        { icon: "ggSign", label: t("ui.provider"), value: proj.provider.toUpperCase(), color: INK5 }
      ];
      let rowY = WALL2.y + 74;
      for (const r of rows) {
        drawSprite(g, r.icon, WALL2.x + 24, rowY, 2);
        drawText(g, r.label, WALL2.x + 70, rowY + 8, 2, "#c9c6e0");
        drawText(g, r.value, WALL2.x + WALL2.w - 24, rowY + 6, 2, r.color, { align: "right" });
        rowY += 66;
      }
      drawText(g, t("ui.nextLevel"), WALL2.x + 24, rowY + 4, 2, MAGENTA3);
      bar2(g, WALL2.x + 24, rowY + 34, WALL2.w - 48, 24, info.progress, GREEN3);
      const nextLabel = info.isMax ? t("ui.maxLevel") : fmtCompact(proj.tokens) + " / " + fmtCompact(info.next ?? 0);
      drawText(g, nextLabel, WALL2.x + WALL2.w / 2, rowY + 40, 2, INK5, { align: "center", shadow: "rgba(0,0,0,0.6)" });
    }
    // ---- recent rewards rail ------------------------------------------------
    drawRewardsRail(g, proj) {
      const tickets = this.recentTickets(proj);
      const img = this.ctx.assets.get("projRewardsRail");
      if (img) {
        drawImageSmooth(g, img, RAIL2.x, RAIL2.y, RAIL2.w, RAIL2.h);
        const slotW = 0.082 * RAIL2.w;
        const slotH = 0.14 * RAIL2.h;
        for (let i = 0; i < RR_SLOTS_X.length; i++) {
          const cx = RAIL2.x + RR_SLOTS_X[i] * RAIL2.w;
          const cy = RAIL2.y + RR_SLOT_Y * RAIL2.h;
          this.drawTicket(g, cx, cy, slotW, slotH, tickets[i] ?? null, true);
        }
        const capX = RAIL2.x + 0.03 * RAIL2.w;
        const capY = RAIL2.y + 0.5 * RAIL2.h;
        const capW = measureText(t("ui.recentRewards"), 1.5) + 22;
        rrect(g, capX, capY - 5, capW, 26, 7);
        g.fillStyle = "rgba(9,6,18,0.72)";
        g.fill();
        drawText(g, t("ui.recentRewards"), capX + 11, capY, 1.5, CYAN5, { glow: "#2f9fa0", glowBlur: 2 });
        return;
      }
      const y = 852;
      panel(g, 40, y, 1520, 120, { radius: 12, fill: "rgba(20,15,36,0.6)", border: "#4a4270", borderWidth: 2 });
      drawText(g, t("ui.recentRewards"), 60, y + 16, 2, MUTE);
      for (let i = 0; i < 8; i++) {
        const cx = 150 + i * 180;
        this.drawTicket(g, cx, y + 66, 120, 60, tickets[i] ?? null, false);
      }
    }
    /** Recent-reward tickets derived from the project's latest sync (no history is
     * stored, so we surface the last-sync gains as prize tickets; empties fill the
     * rest of the rail rather than leaving it blank). */
    recentTickets(proj) {
      const out = [];
      const info = levelInfo(proj.tokens);
      const gained = proj.lastGained ?? 0;
      if (gained > 0) {
        out.push({ big: "+" + fmtCompact(gained), sub: t("ui.tokens"), color: CYAN5 });
        const coins2 = Math.floor(gained / CONFIG.TOKENS_PER_COIN);
        if (coins2 > 0) out.push({ big: "+" + fmtCompact(coins2), sub: t("ui.coins"), color: GOLD5 });
      }
      out.push({ big: "LVL " + info.level, sub: t("ui.cabinet"), color: stageAccent(info.stage.index) });
      out.push({ big: fmtCompact(proj.coins), sub: t("ui.baseCoins"), color: GOLD5 });
      return out;
    }
    /** One reward slot. On the generated rail (`onRail`) we light up the baked
     * ticket recess and center the value + subtitle inside it — the recess IS the
     * ticket frame, so overlaying a separate (wider-aspect) plate looked unseated
     * (PM QA 2026-07-09 #2). The procedural fallback draws its own ticket plate. */
    drawTicket(g, cx, cy, w, h, t2, onRail) {
      if (!t2) {
        if (!onRail) {
          g.strokeStyle = "rgba(120,110,160,0.35)";
          g.lineWidth = 1.5;
          g.setLineDash([5, 5]);
          rrect(g, cx - w / 2 + 4, cy - h / 2 + 4, w - 8, h - 8, 6);
          g.stroke();
          g.setLineDash([]);
        }
        return;
      }
      if (onRail) {
        g.save();
        const gr = g.createRadialGradient(cx, cy, 2, cx, cy, w * 0.55);
        gr.addColorStop(0, this.rgba(t2.color, 0.22));
        gr.addColorStop(1, this.rgba(t2.color, 0));
        g.fillStyle = gr;
        g.fillRect(cx - w * 0.62, cy - h * 0.62, w * 1.24, h * 1.24);
        g.restore();
      } else {
        g.save();
        g.shadowColor = t2.color;
        g.shadowBlur = 8;
        rrect(g, cx - w / 2, cy - h / 2, w, h, 7);
        g.fillStyle = "rgba(16,11,30,0.92)";
        g.fill();
        g.strokeStyle = t2.color;
        g.lineWidth = 2;
        g.stroke();
        g.restore();
      }
      let bs = 2.25;
      while (bs > 1 && measureText(t2.big, bs) > w * 0.84) bs -= 0.25;
      const subScale = 1.3;
      const gap = 6;
      const blockH = GLYPH_H * bs + gap + GLYPH_H * subScale;
      const top = cy - blockH / 2;
      drawText(g, t2.big, cx, top, bs, t2.color, { align: "center", glow: t2.color, glowBlur: 3, shadow: "rgba(0,0,0,0.6)" });
      drawText(g, t2.sub, cx, top + GLYPH_H * bs + gap, subScale, INK5, { align: "center", shadow: "rgba(0,0,0,0.6)" });
    }
    // ---- utils --------------------------------------------------------------
    /** '#rrggbb' + alpha -> 'rgba(...)'. */
    rgba(hex, a) {
      const h = hex.replace("#", "");
      const r = parseInt(h.slice(0, 2), 16);
      const gg = parseInt(h.slice(2, 4), 16);
      const b = parseInt(h.slice(4, 6), 16);
      return `rgba(${r},${gg},${b},${a})`;
    }
  };

  // src/screens/capsuleScreen.ts
  var GOLD6 = "#ffd23f";
  var CYAN6 = "#5fe6d6";
  var MAGENTA4 = "#e15ad8";
  var INK6 = "#f6f4ff";
  var MACHINE = { x: 184, y: 158, w: 452, h: 555 };
  var MACHINE_CX = MACHINE.x + MACHINE.w / 2;
  var MACHINE_MOUTH_Y = MACHINE.y + MACHINE.h * 0.82;
  var CONTROL_DECK = { x: 128, y: 766, w: 564, h: 124 };
  var PULL_CARD = { y: 773, w: 252, h: 111, x1: 148, x10: 420 };
  var CARD_W = 300;
  var CARD_H = 440;
  var CARD_X = MACHINE_CX - CARD_W / 2;
  var CARD_Y = 168;
  var DISPLAY = { x: 836, y: 120, w: 712, h: 696 };
  var DISPLAY_ITEMS = RARITY_ORDER.flatMap((rarity) => byRarity[rarity]);
  var WALL3 = { x: 760, y: 120, w: 800, h: 800 };
  var FEED = { x: 638, w: 166, top: 452, rowH: 36, gap: 6, maxVisible: 4 };
  var FEED_STRIDE = FEED.rowH + FEED.gap;
  var EXCHANGE = { x: 590, y: 630, w: 220, h: 112 };
  function drawLock(g, cx, cy, col) {
    g.strokeStyle = col;
    g.lineWidth = 3;
    g.beginPath();
    g.arc(cx, cy - 4, 6, Math.PI, 0);
    g.stroke();
    g.fillStyle = col;
    g.fillRect(cx - 9, cy - 2, 18, 14);
    g.fillStyle = "#0f0a1c";
    g.fillRect(cx - 1, cy + 2, 2, 5);
  }
  var CapsuleScreen = class {
    constructor(ctx2) {
      this.ctx = ctx2;
      this.name = "capsule";
      this.displayCoins = new EasedNumber();
      this.shakeAmp = 0;
      this.notEnough = 0;
      // Reveal sequencing: pulled outcomes queue up and flip through one at a time.
      this.queue = [];
      this.current = null;
      this.revealTimer = 0;
      this.cardLife = 0;
      // Short gate so the first card of a pull waits for the lever + shake.
      this.revealDelay = 0;
      // Whether the landing effect has fired for the currently-revealed card.
      this.landedFired = false;
      // Lever animation. leverT: seconds since the pull kicked it, -1 = idle.
      this.leverT = -1;
      // Whether this lever pull has already triggered the shake + mouth burst.
      this.leverShook = false;
      // Whether the capsule "pop" flash has fired (a beat between lever and reveal).
      this.popFired = false;
      // Best-rarity glow for the mouth burst, captured at pull time.
      this.pullBurstGlow = MAGENTA4;
      // Per-collectible slot flash (1 -> 0) so a shelf lights up when a prize lands.
      this.slotFlash = {};
      // Cabinet-slot tooltip: hoverTip is recomputed each frame; sticky survives a
      // tap for a couple of seconds (touch has no hover).
      this.hoverTip = null;
      this.sticky = null;
      // Result feed (QA-002/005): every pull outcome — new AND duplicate — is a
      // compact ticker row (newest first). Only NEW items enter the big reveal
      // queue; `feedStart` is the manually controlled row offset for this batch.
      this.feed = [];
      this.feedStart = 0;
      // Short summary pulse shown when a pull produced no new items (all duplicates).
      this.dupPulse = 0;
      this.dupPulseCount = 0;
      this.exchangeSuccess = 0;
    }
    enter() {
      this.displayCoins.set(this.ctx.store.state.coins);
      this.shakeAmp = 0;
      this.notEnough = 0;
      this.queue = [];
      this.current = null;
      this.revealTimer = 0;
      this.cardLife = 0;
      this.revealDelay = 0;
      this.landedFired = false;
      this.leverT = -1;
      this.leverShook = false;
      this.popFired = false;
      this.pullBurstGlow = MAGENTA4;
      this.slotFlash = {};
      this.hoverTip = null;
      this.sticky = null;
      this.feed = [];
      this.feedStart = 0;
      this.dupPulse = 0;
      this.dupPulseCount = 0;
      this.exchangeSuccess = 0;
      this.ctx.fx.setToastZone(726, 200, 184);
    }
    render(g, dt, now) {
      this.tick(dt);
      this.drawBackground(g);
      this.drawDisplayCabinet(g);
      this.drawMachine(g, now);
      this.drawHeader(g);
      this.drawResultFeed(g, now);
      this.drawExchangeControl(g);
      this.drawReveal(g);
      this.drawMessages(g);
      this.drawTooltip(g);
    }
    // ---- per-frame state advance -------------------------------------------
    tick(dt) {
      this.displayCoins.toward(this.ctx.store.state.coins, dt);
      this.shakeAmp = Math.max(0, this.shakeAmp - dt * 34);
      this.notEnough = Math.max(0, this.notEnough - dt);
      this.revealTimer -= dt;
      this.cardLife -= dt;
      this.revealDelay = Math.max(0, this.revealDelay - dt);
      this.dupPulse = Math.max(0, this.dupPulse - dt);
      this.exchangeSuccess = Math.max(0, this.exchangeSuccess - dt);
      if (this.leverT >= 0) {
        this.leverT += dt;
        if (this.leverT >= 0.13 && !this.leverShook) {
          this.shakeAmp = 14;
          this.leverShook = true;
          this.ctx.fx.burst(MACHINE_CX, MACHINE_MOUTH_Y, this.pullBurstGlow, 26);
        }
        if (this.leverT > 0.4) this.leverT = -1;
      }
      for (const k in this.slotFlash) {
        this.slotFlash[k] -= dt * 1.6;
        if (this.slotFlash[k] <= 0) delete this.slotFlash[k];
      }
      if (this.sticky) {
        this.sticky.life -= dt;
        if (this.sticky.life <= 0) this.sticky = null;
      }
      if (!this.popFired && this.current === null && this.queue.length > 0 && this.revealDelay > 0 && this.revealDelay <= 0.16) {
        this.popFired = true;
        this.shakeAmp = Math.max(this.shakeAmp, 10);
        this.ctx.fx.burst(MACHINE_CX, MACHINE_MOUTH_Y, this.pullBurstGlow, 24);
      }
      if (this.revealDelay <= 0 && (this.current === null || this.revealTimer <= 0) && this.queue.length > 0) {
        const next = this.queue.shift();
        if (next) {
          this.current = next;
          this.landedFired = false;
          this.revealTimer = this.queue.length > 0 ? 0.8 : 1.6;
          this.cardLife = 2.4;
          this.ctx.sound.reveal(next.collectible.rarity);
          this.ctx.fx.burst(MACHINE_CX, MACHINE.y + MACHINE.h * 0.42, RARITIES[next.collectible.rarity].glow, 14);
        }
      }
      if (this.current && this.cardLife <= 0.5 && !this.landedFired) {
        this.fireLanding(this.current.collectible);
        this.landedFired = true;
      }
    }
    /** Easing with a slight overshoot past 1 near the end (0 -> ~1.1 -> 1). */
    easeOutBack(p) {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2);
    }
    /** Knob displacement 0 (rest/up) .. 1 (fully down) for the current leverT.
     * A negative return lifts the knob slightly ABOVE rest — the settle bounce. */
    leverDisplacement() {
      const t2 = this.leverT;
      if (t2 < 0) return 0;
      if (t2 < 0.13) {
        const p = t2 / 0.13;
        return p * p * (3 - 2 * p);
      }
      if (t2 < 0.19) return 1;
      if (t2 < 0.4) {
        const p = (t2 - 0.19) / 0.21;
        return 1 - this.easeOutBack(p);
      }
      return 0;
    }
    /** Send a prize "into" its cabinet slot: burst + a spark trail from the card
     * to the destination slot, and light that slot up. */
    fireLanding(c) {
      const slot = this.slotCenterFor(c);
      if (!slot) return;
      const rar = RARITIES[c.rarity];
      this.ctx.fx.burst(slot.x, slot.y, rar.glow, 14);
      const fromX = MACHINE_CX;
      const fromY = CARD_Y + CARD_H * 0.4;
      for (let i = 0; i < 6; i++) {
        const t2 = i / 5;
        const jx = (Math.random() - 0.5) * 22;
        const jy = (Math.random() - 0.5) * 22;
        this.ctx.fx.spark(fromX + (slot.x - fromX) * t2 + jx, fromY + (slot.y - fromY) * t2 + jy, rar.glow);
      }
      this.slotFlash[c.id] = 1;
    }
    /** Center of the cabinet slot a collectible is displayed in. P1C gives each
     * rarity ten real niches; the rarity rail no longer consumes a prize slot. */
    slotCenterFor(c) {
      const index = DISPLAY_ITEMS.findIndex((item) => item.id === c.id);
      if (index < 0) return null;
      const row = Math.floor(index / 10);
      const column = index % 10;
      const slot = DISPLAY_SLOTS[row]?.[column];
      if (slot) {
        return { x: DISPLAY.x + slot.x * DISPLAY.w, y: DISPLAY.y + slot.y * DISPLAY.h };
      }
      return null;
    }
    // ---- background ---------------------------------------------------------
    drawBackground(g) {
      const W = this.ctx.stage.width;
      const H = this.ctx.stage.height;
      const bg2 = this.ctx.assets.get("capsuleRoomBg");
      if (bg2) {
        drawImageSmooth(g, bg2, 0, 0, W, H);
        const grad = g.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, "rgba(6,4,12,0.5)");
        grad.addColorStop(0.2, "rgba(6,4,12,0.05)");
        grad.addColorStop(1, "rgba(6,4,12,0)");
        g.fillStyle = grad;
        g.fillRect(0, 0, W, H);
        return;
      }
      vgrad(g, 0, 0, W, H, "#251540", "#07040d");
      vgrad(g, 0, 720, W, H - 720, "#170f2c", "#0a0616");
      g.fillStyle = "rgba(225,90,216,0.08)";
      g.fillRect(0, 720, W, 2);
    }
    // ---- header -------------------------------------------------------------
    drawHeader(g) {
      drawBackButton(g, this.ctx, () => this.ctx.router.go("room"));
      const HW = 252;
      const HX = 1600 - HW - 24;
      drawCoinHud(g, this.ctx.assets, HX, 14, HW, fmtComma(Math.round(this.displayCoins.value)));
      drawDemoPlaque(g, this.ctx, HX - 170, 18, 160);
      this.drawDustHud(g, HX - 300, 18, 120, 50);
    }
    /** Purpose-specific dust meter beside the existing coin HUD. */
    drawDustHud(g, x, y, w, h) {
      rrect(g, x + 2, y + 3, w, h, 7);
      g.fillStyle = "rgba(0,0,0,0.4)";
      g.fill();
      g.save();
      rrect(g, x, y, w, h, 7);
      g.clip();
      vgrad(g, x, y, w, h, "#25203a", "#100d1b");
      g.restore();
      rrect(g, x, y, w, h, 7);
      g.strokeStyle = "#5f5875";
      g.lineWidth = 2;
      g.stroke();
      const dust = currencyIcon("dust");
      if (dust) drawIconCentered(g, dust, x + 24, y + h / 2, 36);
      const textCx = x + 78;
      const textW = w - 48;
      const label = t("ui.dust");
      let labelScale = 1.05;
      while (labelScale > 0.75 && measureText(label, labelScale) > textW) labelScale -= 0.05;
      drawText(g, label, textCx, y + 7, labelScale, "#9a93bd", { align: "center" });
      const value = fmtComma(this.ctx.store.state.shards);
      let valueScale = 1.9;
      while (valueScale > 1 && measureText(value, valueScale) > textW) valueScale -= 0.1;
      drawText(g, value, textCx, y + 26, valueScale, CYAN6, {
        align: "center",
        glow: CYAN6,
        glowBlur: 3
      });
    }
    // ---- capsule machine ----------------------------------------------------
    drawMachine(g, now) {
      const shake = this.shakeAmp > 0.1 ? Math.sin(now / 22) * this.shakeAmp : 0;
      const img = this.ctx.assets.get("capsuleMachine");
      if (img) {
        g.save();
        g.fillStyle = "rgba(0,0,0,0.4)";
        g.beginPath();
        g.ellipse(MACHINE_CX + shake, MACHINE.y + MACHINE.h - 6, MACHINE.w * 0.36, 12, 0, 0, Math.PI * 2);
        g.fill();
        g.restore();
        drawImageSmooth(g, img, MACHINE.x + shake, MACHINE.y, MACHINE.w, MACHINE.h);
        drawText(g, t("ui.insertCoin"), MACHINE_CX + shake, MACHINE.y + MACHINE.h * 0.6, 1.5, GOLD6, {
          align: "center",
          glow: GOLD6,
          glowBlur: 3,
          shadow: "rgba(0,0,0,0.7)"
        });
      } else {
        drawText(g, t("ui.capsule"), MACHINE_CX, 122, 2, MAGENTA4, { align: "center", glow: MAGENTA4, glowBlur: 3 });
        drawCapsuleMachine(g, MACHINE.x, MACHINE.y, MACHINE.w, MACHINE.h, { shake, label: t("ui.insertCoin") });
      }
      this.drawLever(g, shake);
      this.drawControlDeck(g);
      this.pullButton(g, PULL_CARD.x1, PULL_CARD.y, PULL_CARD.w, PULL_CARD.h, "x1", CONFIG.PULL_COST, () => this.doPull(1));
      this.pullButton(g, PULL_CARD.x10, PULL_CARD.y, PULL_CARD.w, PULL_CARD.h, "x10", CONFIG.PULL10_COST, () => this.doPull(10));
    }
    /** Neon lever housing that occludes the machine's baked crank and animates on
     * a pull. Offset by `shake` so it rides with the machine. */
    drawLever(g, shake) {
      const d = this.leverDisplacement();
      const down = Math.max(0, d);
      const sx = shake * (1 + 0.6 * down);
      const hx = 496 + sx;
      const hy = 448;
      const hw = 86;
      const hh = 132;
      g.save();
      rrect(g, hx, hy, hw, hh, 14);
      g.clip();
      vgrad(g, hx, hy, hw, hh, "#2c2050", "#171029");
      g.restore();
      rrect(g, hx, hy, hw, hh, 14);
      g.strokeStyle = "#c98f24";
      g.lineWidth = 2;
      g.stroke();
      if (down > 0.01) {
        g.save();
        g.shadowColor = MAGENTA4;
        g.shadowBlur = 26 * down;
        rrect(g, hx, hy, hw, hh, 14);
        g.strokeStyle = `rgba(225,90,216,${0.65 * down})`;
        g.lineWidth = 3;
        g.stroke();
        g.restore();
      }
      rrect(g, hx + 4, hy + 4, hw - 8, hh - 8, 11);
      g.strokeStyle = "rgba(225,90,216,0.5)";
      g.lineWidth = 1;
      g.stroke();
      g.fillStyle = "#c98f24";
      const bolts = [
        [hx + 11, hy + 11],
        [hx + hw - 11, hy + 11],
        [hx + 11, hy + hh - 11],
        [hx + hw - 11, hy + hh - 11]
      ];
      for (const [bx, by] of bolts) {
        g.beginPath();
        g.arc(bx, by, 2.5, 0, Math.PI * 2);
        g.fill();
      }
      const trackCx = 539 + sx;
      const trackTop = 470;
      const trackBottom = 566;
      const trackW = 16;
      rrect(g, trackCx - trackW / 2, trackTop, trackW, trackBottom - trackTop, 8);
      g.fillStyle = "#0d0a16";
      g.fill();
      rrect(g, trackCx - trackW / 2 + 1, trackTop + 1, trackW - 2, trackBottom - trackTop - 2, 7);
      g.strokeStyle = "rgba(225,90,216,0.4)";
      g.lineWidth = 1;
      g.stroke();
      const knobRestY = 486;
      const travel = 78;
      const knobY = knobRestY + d * travel;
      const shaftW = 12;
      const shaftH = Math.max(2, trackBottom - knobY);
      rrect(g, trackCx - shaftW / 2, knobY, shaftW, shaftH, 6);
      const shaftGrad = g.createLinearGradient(0, knobY, 0, trackBottom);
      shaftGrad.addColorStop(0, "#ffd23f");
      shaftGrad.addColorStop(1, "#c98f24");
      g.fillStyle = shaftGrad;
      g.fill();
      const knobR = 16;
      g.save();
      g.shadowColor = MAGENTA4;
      g.shadowBlur = 12;
      g.fillStyle = MAGENTA4;
      g.beginPath();
      g.arc(trackCx, knobY, knobR, 0, Math.PI * 2);
      g.fill();
      g.restore();
      g.beginPath();
      g.arc(trackCx, knobY, knobR, 0, Math.PI * 2);
      g.fillStyle = MAGENTA4;
      g.fill();
      g.lineWidth = 2;
      g.strokeStyle = "#8a3aa0";
      g.stroke();
      g.beginPath();
      g.arc(trackCx, knobY, knobR * 0.58, 0, Math.PI * 2);
      g.fillStyle = "#f07fe0";
      g.fill();
      g.beginPath();
      g.arc(trackCx - knobR * 0.34, knobY - knobR * 0.34, knobR * 0.22, 0, Math.PI * 2);
      g.fillStyle = "rgba(255,255,255,0.9)";
      g.fill();
    }
    /** Physical metal base deck that seats the two shop-card pull controls. */
    drawControlDeck(g) {
      const { x: dx, y: dy, w: dw, h: dh } = CONTROL_DECK;
      rrect(g, dx + 3, dy + 5, dw, dh, 16);
      g.fillStyle = "rgba(0,0,0,0.4)";
      g.fill();
      g.save();
      rrect(g, dx, dy, dw, dh, 16);
      g.clip();
      vgrad(g, dx, dy, dw, dh, "#2a2440", "#12101f");
      g.restore();
      rrect(g, dx, dy, dw, dh, 16);
      g.strokeStyle = "rgba(201,143,36,0.9)";
      g.lineWidth = 2;
      g.stroke();
      g.strokeStyle = "rgba(255,210,63,0.5)";
      g.lineWidth = 1;
      g.beginPath();
      g.moveTo(dx + 16, dy + 2.5);
      g.lineTo(dx + dw - 16, dy + 2.5);
      g.stroke();
      g.fillStyle = "rgba(225,90,216,0.28)";
      g.fillRect(dx + 14, dy + dh - 8, dw - 28, 3);
      for (const bx of [dx + 13, dx + dw - 13]) {
        for (const by of [dy + 13, dy + dh - 13]) {
          g.beginPath();
          g.arc(bx, by, 3, 0, Math.PI * 2);
          g.fillStyle = "#0d0a16";
          g.fill();
          g.strokeStyle = "rgba(201,143,36,0.6)";
          g.lineWidth = 1;
          g.stroke();
        }
      }
    }
    pullButton(g, x, y, w, h, label, cost, onClick) {
      const afford = this.ctx.store.state.coins >= cost;
      const hovered = this.ctx.stage.hotspot({ x, y, w, h, cursor: "pointer", id: "pull-" + label, onClick });
      const bundle = label === "x10";
      const frame = this.ctx.assets.get("homeShopCard");
      const icon = this.ctx.assets.get(bundle ? "shopCapsuleBundle" : "shopCapsuleSingle");
      g.globalAlpha = afford ? 1 : 0.6;
      if (frame) {
        if (hovered && afford) {
          g.save();
          g.shadowColor = MAGENTA4;
          g.shadowBlur = 14;
          drawImageSmooth(g, frame, x, y, w, h);
          g.restore();
        }
        drawImageSmooth(g, frame, x, y, w, h);
      } else {
        panel(g, x, y, w, h, { radius: 8, fill: "#1b1328", border: GOLD6, borderWidth: 2 });
      }
      const iconCx = x + w * 0.215;
      const iconCy = y + h * 0.43;
      if (icon) drawImageContain(g, icon, iconCx, iconCy, w * (bundle ? 0.31 : 0.27), h * 0.54);
      else drawCoin(g, iconCx, iconCy, 15);
      const shopKey = bundle ? "pull10" : "pull1";
      const textX = x + w * 0.39;
      const labelText = t("shop." + shopKey + ".label");
      const labelMax = w * 0.46;
      let labelScale = 1.8;
      while (labelScale > 1.1 && measureText(labelText, labelScale) > labelMax) labelScale -= 0.1;
      drawText(g, labelText, textX, y + h * 0.19, labelScale, INK6, { shadow: "rgba(0,0,0,0.6)" });
      drawText(g, t("shop." + shopKey + ".sub"), textX, y + h * 0.42, 1.05, "#b9b3d6");
      const priceCx = x + w * 0.69;
      const priceCy = y + h * 0.72;
      const price = fmtComma(cost);
      const priceW = measureText(price, 2);
      drawCoin(g, priceCx - priceW / 2 - 10, priceCy, 7);
      drawText(g, price, priceCx - priceW / 2 + 6, priceCy - 7, 2, GOLD6);
      g.globalAlpha = 1;
    }
    // ---- trophy cabinet -----------------------------------------------------
    drawDisplayCabinet(g) {
      this.hoverTip = null;
      const store2 = this.ctx.store;
      const img = this.ctx.assets.get("achievementDisplay");
      if (!img) {
        this.drawPrizeWallProcedural(g);
        return;
      }
      drawImageSmooth(g, img, DISPLAY.x, DISPLAY.y, DISPLAY.w, DISPLAY.h);
      for (let r = 0; r < RARITY_ORDER.length; r++) {
        const slots = DISPLAY_SLOTS[r];
        const pl = DISPLAY_RARITY_RAILS[r];
        const plCx = DISPLAY.x + pl.x * DISPLAY.w;
        const plCy = DISPLAY.y + pl.y * DISPLAY.h;
        const plW = 52;
        const plH = 23;
        const rangeLabel = `${r * 10 + 1}-${r * 10 + 10}`;
        const plScale = Math.min(1.02, (plW - 8) / Math.max(1, measureText(rangeLabel, 1)));
        rrect(g, plCx - plW / 2, plCy - plH / 2, plW, plH, 8);
        g.fillStyle = "rgba(9,6,18,0.94)";
        g.fill();
        g.save();
        g.shadowColor = CYAN6;
        g.shadowBlur = 6;
        rrect(g, plCx - plW / 2, plCy - plH / 2, plW, plH, 8);
        g.strokeStyle = CYAN6;
        g.lineWidth = 2;
        g.stroke();
        g.restore();
        rrect(g, plCx - plW / 2 + 3, plCy - plH / 2 + 3, plW - 6, plH - 6, 6);
        g.strokeStyle = "rgba(201,143,36,0.5)";
        g.lineWidth = 1;
        g.stroke();
        drawText(g, rangeLabel, plCx, plCy - 5, plScale, GOLD6, { align: "center", glow: GOLD6, glowBlur: 3 });
        const items = DISPLAY_ITEMS.slice(r * 10, r * 10 + 10);
        for (let i = 0; i < items.length && i < slots.length; i++) {
          const c = items[i];
          const rar = RARITIES[c.rarity];
          const cx = DISPLAY.x + slots[i].x * DISPLAY.w;
          const cy = DISPLAY.y + slots[i].y * DISPLAY.h;
          const entry = store2.state.owned[c.id];
          const flash = this.slotFlash[c.id] || 0;
          if (entry) {
            const grad = g.createRadialGradient(cx, cy, 0, cx, cy, 24);
            grad.addColorStop(0, rar.glow.length === 7 ? rar.glow + "55" : rar.glow);
            grad.addColorStop(1, "rgba(0,0,0,0)");
            g.fillStyle = grad;
            g.fillRect(cx - 24, cy - 24, 48, 48);
            g.save();
            g.fillStyle = "rgba(0,0,0,0.35)";
            g.beginPath();
            g.ellipse(cx, cy + 18, 16, 5, 0, 0, Math.PI * 2);
            g.fill();
            g.restore();
            const icon = collectibleIcon(c.id);
            if (icon) drawIconCentered(g, icon, cx, cy, 42);
            else drawSpriteCentered(g, c.sprite, cx, cy, 40, c.tint);
            if (flash > 0) {
              g.save();
              g.globalAlpha = Math.min(1, flash);
              g.shadowColor = rar.glow;
              g.shadowBlur = 16 * flash;
              g.strokeStyle = rar.color;
              g.lineWidth = 2 + 2 * flash;
              g.beginPath();
              g.arc(cx, cy, 20 + 5 * flash, 0, Math.PI * 2);
              g.stroke();
              g.restore();
              const fg = g.createRadialGradient(cx, cy, 0, cx, cy, 27);
              fg.addColorStop(0, `rgba(255,255,255,${0.35 * flash})`);
              fg.addColorStop(1, "rgba(0,0,0,0)");
              g.fillStyle = fg;
              g.fillRect(cx - 27, cy - 27, 54, 54);
            }
            if (entry.count > 1) {
              rrect(g, cx + 5, cy + 8, 23, 15, 4);
              g.fillStyle = "#0d0a16";
              g.fill();
              g.strokeStyle = rar.color;
              g.lineWidth = 1;
              g.stroke();
              drawText(g, "\xD7" + entry.count, cx + 8, cy + 11, 1.25, INK6);
            }
            const info = { locked: false, c, count: entry.count, cx, cy };
            const hov = this.ctx.stage.hotspot({
              x: cx - 24,
              y: cy - 24,
              w: 48,
              h: 48,
              cursor: "help",
              id: "slot-" + c.id,
              onClick: () => {
                this.sticky = { info, life: 2.4 };
              }
            });
            if (hov) this.hoverTip = info;
          } else {
            drawLock(g, cx, cy, "#4a4270");
            const info = { locked: true, cx, cy };
            const hov = this.ctx.stage.hotspot({
              x: cx - 24,
              y: cy - 24,
              w: 48,
              h: 48,
              cursor: "help",
              id: "slot-" + c.id,
              onClick: () => {
                this.sticky = { info, life: 2.4 };
              }
            });
            if (hov) this.hoverTip = info;
          }
        }
      }
    }
    /** Procedural fallback prize wall (cabinet asset missing / still loading). */
    drawPrizeWallProcedural(g) {
      const store2 = this.ctx.store;
      panel(g, WALL3.x, WALL3.y, WALL3.w, WALL3.h, { radius: 12, fill: "rgba(20,15,36,0.6)", border: "#4a4270", borderWidth: 2 });
      const groupH = 152;
      let gy = WALL3.y + 30;
      for (const rk of RARITY_ORDER) {
        const rar = RARITIES[rk];
        g.fillStyle = rar.color;
        g.fillRect(WALL3.x + 24, gy, 18, 18);
        drawText(g, tRarity(rar.key), WALL3.x + 50, gy + 2, 2, rar.color, { glow: rar.glow, glowBlur: 3 });
        const items = byRarity[rk];
        const slot = 74;
        const stride = 84;
        const rowY = gy + 30;
        for (let i = 0; i < items.length; i++) {
          const c = items[i];
          const sx = WALL3.x + 24 + i * stride;
          const entry = store2.state.owned[c.id];
          if (entry) {
            panel(g, sx, rowY, slot, slot, { radius: 8, fill: "#241a3f", border: rar.color, borderWidth: 2 });
            drawSprite(g, c.sprite, sx + 5, rowY + 5, 4, c.tint);
            if (entry.count > 1) {
              panel(g, sx + slot - 26, rowY + slot - 20, 24, 16, { radius: 4, fill: "#0d0a16", border: rar.color, borderWidth: 1 });
              drawText(g, "\xD7" + entry.count, sx + slot - 22, rowY + slot - 17, 1.5, INK6);
            }
            drawText(g, "*", sx + 4, rowY + 4, 1.5, rar.color);
          } else {
            panel(g, sx, rowY, slot, slot, { radius: 8, fill: "#0f0a1c", border: "#2a2440", borderWidth: 2 });
            drawLock(g, sx + slot / 2, rowY + slot / 2, "#3a3352");
          }
        }
        g.fillStyle = "#5c3a26";
        g.fillRect(WALL3.x + 24, rowY + slot + 4, WALL3.w - 48, 6);
        g.fillStyle = "rgba(0,0,0,0.3)";
        g.fillRect(WALL3.x + 24, rowY + slot + 8, WALL3.w - 48, 2);
        gy += groupH;
      }
    }
    // ---- reveal card --------------------------------------------------------
    drawReveal(g) {
      if (this.current !== null || this.queue.length > 0) {
        this.ctx.stage.hotspot({
          x: CARD_X - 20,
          y: CARD_Y - 20,
          w: CARD_W + 40,
          h: CARD_H + 64,
          cursor: "pointer",
          id: "skip-reveal",
          onClick: () => this.skipReveals()
        });
      }
      if (!this.current || this.cardLife <= 0) return;
      const c = this.current.collectible;
      const rar = RARITIES[c.rarity];
      const cardW = CARD_W;
      const cardH = CARD_H;
      const cardX = CARD_X;
      const cardY = CARD_Y;
      const age = 2.4 - this.cardLife;
      const appear = Math.min(1, age / 0.22);
      const alpha = Math.min(1, this.cardLife / 0.4);
      const scale = 0.7 + 0.3 * this.easeOutBack(appear);
      const pulse2 = 0.85 + 0.15 * Math.sin(age * 8);
      g.save();
      g.globalAlpha = alpha;
      g.translate(cardX + cardW / 2, cardY + cardH / 2);
      g.scale(scale, scale);
      g.translate(-(cardX + cardW / 2), -(cardY + cardH / 2));
      const frame = revealFrameImage(rar.order);
      if (frame) {
        const glow = g.createRadialGradient(MACHINE_CX, cardY + cardH * 0.4, 0, MACHINE_CX, cardY + cardH * 0.4, cardW * 0.7);
        glow.addColorStop(0, rar.glow.length === 7 ? rar.glow + "55" : rar.glow);
        glow.addColorStop(1, "rgba(0,0,0,0)");
        const prevA = g.globalAlpha;
        g.globalAlpha = prevA * pulse2;
        g.fillStyle = glow;
        g.fillRect(cardX - 60, cardY - 40, cardW + 120, cardH + 80);
        g.globalAlpha = prevA;
        drawImageSmooth(g, frame, cardX, cardY, cardW, cardH);
        const iw = { x: cardX + cardW * 0.16, y: cardY + cardH * 0.17, w: cardW * 0.68, h: cardH * 0.6 };
        const cxm = iw.x + iw.w / 2;
        const icon = collectibleIcon(c.id);
        if (icon) drawIconCentered(g, icon, cxm, iw.y + iw.h * 0.08 + 45, 96);
        else drawSprite(g, c.sprite, cxm - 48, iw.y + iw.h * 0.08, 6, c.tint);
        drawText(g, tCollectibleName(c.id), cxm, iw.y + iw.h * 0.66, 2, INK6, { align: "center", glow: rar.glow, glowBlur: 3 });
        drawText(g, tRarity(rar.key), cxm, iw.y + iw.h * 0.83, 1.75, rar.color, { align: "center", glow: rar.glow, glowBlur: 3 });
        drawText(
          g,
          this.current.isDup ? t("ui.dup", { n: this.current.count }) : t("ui.newItem"),
          cxm,
          iw.y + iw.h,
          1.75,
          this.current.isDup ? "#ff9a3c" : GOLD6,
          { align: "center" }
        );
      } else {
        g.save();
        g.shadowColor = rar.glow;
        g.shadowBlur = 22 * pulse2;
        panel(g, cardX, cardY, cardW, cardH - 120, { radius: 16, fill: "#160f28", border: rar.color, borderWidth: 4 });
        g.restore();
        const icon = collectibleIcon(c.id);
        if (icon) drawIconCentered(g, icon, MACHINE_CX, cardY + 78, 90);
        else drawSprite(g, c.sprite, MACHINE_CX - 56, cardY + 26, 7, c.tint);
        drawText(g, tCollectibleName(c.id), MACHINE_CX, cardY + 168, 3, INK6, { align: "center", glow: rar.glow, glowBlur: 4 });
        drawText(g, tRarity(rar.key), MACHINE_CX, cardY + 210, 2, rar.color, { align: "center", glow: rar.glow, glowBlur: 3 });
        drawText(
          g,
          this.current.isDup ? t("ui.dup", { n: this.current.count }) : t("ui.newItem"),
          MACHINE_CX,
          cardY + 250,
          2,
          this.current.isDup ? "#ff9a3c" : GOLD6,
          { align: "center" }
        );
      }
      g.restore();
      if (this.queue.length > 0) {
        drawText(g, t("ui.skip") + " \u25B8", MACHINE_CX, cardY + cardH - 6, 1.4, "#9a93bd", {
          align: "center",
          shadow: "rgba(0,0,0,0.6)"
        });
      }
    }
    // ---- result feed --------------------------------------------------------
    /** Compact code-driven result ticker in the gap between machine and cabinet.
     * Every pull outcome (new + duplicate) stays here as the current pull batch.
     * Rows are generated rarity frames, clipped to the window (no baked panel).
     * Wheel, drag and two compact step controls all drive the same row offset. */
    drawResultFeed(g, now) {
      if (this.feed.length === 0) return;
      const winX = FEED.x;
      const winY = FEED.top;
      const winW = FEED.w;
      const winH = FEED.maxVisible * FEED_STRIDE - FEED.gap;
      const maxStart = Math.max(0, this.feed.length - FEED.maxVisible);
      if (maxStart > 0) {
        this.ctx.stage.scrollRegion(winX - 3, winY - 2, winW + 6, winH + 4);
        const delta = this.ctx.stage.takeScrollDelta();
        if (Math.abs(delta) > 0.5) this.scrollFeed(delta > 0 ? 1 : -1);
      }
      drawText(g, t("ui.recentRewards"), winX + 46, winY - 21, 1.15, "#9a93bd", { align: "center" });
      const first = this.feedStart + 1;
      const last = Math.min(this.feed.length, this.feedStart + FEED.maxVisible);
      drawText(g, first + "-" + last + "/" + this.feed.length, winX + 132, winY - 20, 1, "#d8d3eb", { align: "right" });
      this.drawFeedStep(g, winX + winW - 18, winY - 30, "up", this.feedStart > 0, () => this.scrollFeed(-1));
      this.drawFeedStep(g, winX + winW - 18, winY - 16, "down", this.feedStart < maxStart, () => this.scrollFeed(1));
      g.save();
      g.beginPath();
      g.rect(winX - 4, winY - 2, winW + 8, winH + 4);
      g.clip();
      for (let i = 0; i < this.feed.length; i++) {
        const ry = winY + (i - this.feedStart) * FEED_STRIDE;
        if (ry > winY + winH || ry + FEED.rowH < winY) continue;
        this.drawResultRow(g, this.feed[i], winX, ry, winW, FEED.rowH, now, i);
      }
      g.restore();
    }
    /** A compact service-machine control beneath the result ticker. The recessed
     * lower cap is the only action; status copy stays inside the fixed housing. */
    drawExchangeControl(g) {
      const { x, y, w, h } = EXCHANGE;
      const store2 = this.ctx.store;
      const complete = store2.ownedCount() >= store2.totalCollectibles();
      const affordable = store2.state.shards >= MISSING_PRIZE_DUST_COST;
      const enabled = !complete && affordable && !this.isRevealActive();
      const button = { x: x + 24, y: y + 68, w: w - 48, h: 31 };
      const hovered = enabled && this.ctx.stage.hotspot({
        ...button,
        cursor: "pointer",
        id: "exchange-missing-prize",
        onClick: () => this.doMissingPrizeExchange()
      });
      const frame = this.ctx.assets.get("rewardTicketFrame");
      if (frame) {
        if (hovered) {
          g.save();
          g.shadowColor = GOLD6;
          g.shadowBlur = 14;
          drawImageSmooth(g, frame, x, y, w, h);
          g.restore();
        }
        drawImageSmooth(g, frame, x, y, w, h);
      } else {
        rrect(g, x, y, w, h, 8);
        g.fillStyle = "rgba(18,13,30,0.96)";
        g.fill();
        g.strokeStyle = enabled ? GOLD6 : "#4a4159";
        g.lineWidth = 2;
        g.stroke();
      }
      const title = t("capsule.missingPrize");
      let titleScale = 1.4;
      while (titleScale > 0.85 && measureText(title, titleScale) > w - 40) titleScale -= 0.05;
      drawText(g, title, x + w / 2, y + 12, titleScale, enabled ? INK6 : "#777087", {
        align: "center",
        glow: enabled ? MAGENTA4 : void 0,
        glowBlur: enabled ? 2 : void 0
      });
      let status = t("capsule.missingPrizeSub");
      let statusColor = "#b9b3d6";
      if (this.exchangeSuccess > 0) {
        status = t("capsule.exchangeSuccess");
        statusColor = CYAN6;
      } else if (complete) {
        status = t("capsule.collectionComplete");
        statusColor = GOLD6;
      } else if (!affordable) {
        status = t("capsule.notEnoughDust");
        statusColor = "#ff8b9a";
      }
      let statusScale = 0.9;
      let statusLines = wrapText(status, statusScale, w - 42);
      while (statusScale > 0.65 && statusLines.length > 2) {
        statusScale -= 0.05;
        statusLines = wrapText(status, statusScale, w - 42);
      }
      statusLines = statusLines.slice(0, 2);
      const statusTop = y + 35 + (2 - statusLines.length) * 4;
      for (let i = 0; i < statusLines.length; i++) {
        drawText(g, statusLines[i], x + w / 2, statusTop + i * 9, statusScale, statusColor, { align: "center" });
      }
      rrect(g, button.x, button.y, button.w, button.h, 7);
      g.fillStyle = "#090712";
      g.fill();
      const capY = button.y + (hovered ? 4 : 2);
      if (hovered) {
        g.save();
        g.shadowColor = MAGENTA4;
        g.shadowBlur = 12;
        rrect(g, button.x + 3, capY, button.w - 6, button.h - 7, 6);
        g.fillStyle = "#54224f";
        g.fill();
        g.restore();
      } else {
        rrect(g, button.x + 3, capY, button.w - 6, button.h - 7, 6);
        g.fillStyle = enabled ? "#39203f" : "#211b2a";
        g.fill();
      }
      rrect(g, button.x + 3, capY, button.w - 6, button.h - 7, 6);
      g.strokeStyle = enabled ? MAGENTA4 : "#4a4159";
      g.lineWidth = 2;
      g.stroke();
      const cost = `${fmtComma(MISSING_PRIZE_DUST_COST)} ${t("ui.dust")}`;
      let costScale = 1.25;
      while (costScale > 0.8 && measureText(cost, costScale) > button.w - 20) costScale -= 0.05;
      drawText(g, cost, x + w / 2, capY + 9, costScale, enabled ? GOLD6 : "#746b80", {
        align: "center",
        glow: enabled ? GOLD6 : void 0,
        glowBlur: enabled ? 2 : void 0
      });
    }
    /** Move the compact ticker by rows, always staying within this pull batch. */
    scrollFeed(by) {
      const maxStart = Math.max(0, this.feed.length - FEED.maxVisible);
      this.feedStart = Math.max(0, Math.min(maxStart, this.feedStart + by));
    }
    /** Small mechanical arrow, deliberately compact enough to remain a ticker
     * affordance rather than a web scrollbar. */
    drawFeedStep(g, x, y, dir, enabled, onClick) {
      const w = 16;
      const h = 12;
      const hovered = enabled && this.ctx.stage.hotspot({ x, y, w, h, cursor: "pointer", id: "feed-" + dir, onClick });
      rrect(g, x, y, w, h, 3);
      g.fillStyle = enabled ? hovered ? "#34274d" : "#1b142b" : "#100c19";
      g.fill();
      g.strokeStyle = enabled ? hovered ? GOLD6 : "#74658e" : "#30263f";
      g.lineWidth = 1;
      g.stroke();
      g.beginPath();
      const cx = x + w / 2;
      if (dir === "up") {
        g.moveTo(cx, y + 3);
        g.lineTo(cx - 4, y + 8);
        g.lineTo(cx + 4, y + 8);
      } else {
        g.moveTo(cx, y + 9);
        g.lineTo(cx - 4, y + 4);
        g.lineTo(cx + 4, y + 4);
      }
      g.closePath();
      g.fillStyle = enabled ? hovered ? GOLD6 : "#d8d3eb" : "#4a4159";
      g.fill();
    }
    /** One ticker row: rarity frame + icon (left well) + name (center well) +
     * NEW / ×count chip (right well). Legendary uses its own gold frame. */
    drawResultRow(g, row, rx, ry, rw, rh, now, i) {
      const rar = RARITIES[row.c.rarity];
      const art = resultRowArt(row.c.rarity);
      const img = this.ctx.assets.get(art.asset);
      const freshNew = row.isNew && i === 0 && this.feedStart === 0;
      if (img) {
        if (freshNew) {
          g.save();
          g.shadowColor = rar.glow;
          g.shadowBlur = 8 + 4 * Math.abs(Math.sin(now / 180));
          drawImageSmooth(g, img, rx, ry, rw, rh, art.crop);
          g.restore();
        } else {
          drawImageSmooth(g, img, rx, ry, rw, rh, art.crop);
        }
      } else {
        rrect(g, rx, ry, rw, rh, 6);
        g.fillStyle = "rgba(16,11,30,0.92)";
        g.fill();
        g.strokeStyle = rar.color;
        g.lineWidth = 2;
        g.stroke();
      }
      const w = art.wells;
      const cy = ry + w.cy * rh;
      const icoCx = rx + w.icon * rw;
      const icon = collectibleIcon(row.c.id);
      if (icon) drawIconCentered(g, icon, icoCx, cy, rh * 0.74);
      else drawSpriteCentered(g, row.c.sprite, icoCx, cy, rh * 0.66);
      const nameCx = rx + w.name * rw;
      const maxNameW = w.nameW * rw * 0.96;
      const name = tCollectibleName(row.c.id);
      let ns = 1.4;
      while (ns > 0.8 && measureText(name, ns) > maxNameW) ns -= 0.1;
      drawText(g, name, nameCx, cy - GLYPH_H * ns / 2, ns, INK6, { align: "center" });
      const chipCx = rx + w.chip * rw;
      if (row.isNew) {
        drawText(g, t("ui.feedNew"), chipCx, cy - GLYPH_H / 2, 1, rar.color, { align: "center", glow: rar.glow, glowBlur: 2 });
      } else {
        drawText(g, "\xD7" + row.count, chipCx, cy - GLYPH_H / 2, 1, "#ff9a3c", { align: "center" });
      }
    }
    drawMessages(g) {
      if (this.notEnough > 0) {
        g.globalAlpha = Math.min(1, this.notEnough / 0.4);
        drawText(g, t("ui.notEnoughCoins"), MACHINE_CX, MACHINE.y + MACHINE.h + 30, 3, "#ff5a6b", {
          align: "center",
          glow: "#ff5a6b",
          glowBlur: 5,
          shadow: "rgba(0,0,0,0.6)"
        });
        g.globalAlpha = 1;
      }
      if (this.dupPulse > 0) {
        g.globalAlpha = Math.min(1, this.dupPulse / 0.4);
        drawText(g, t("ui.dup", { n: this.dupPulseCount }), MACHINE_CX, MACHINE.y + MACHINE.h * 0.4, 3, "#ff9a3c", {
          align: "center",
          glow: "#ff9a3c",
          glowBlur: 5,
          shadow: "rgba(0,0,0,0.6)"
        });
        g.globalAlpha = 1;
      }
    }
    // ---- cabinet-slot tooltip ----------------------------------------------
    drawTooltip(g) {
      const info = this.hoverTip ?? (this.sticky && this.sticky.life > 0 ? this.sticky.info : null);
      if (!info) return;
      const rar = info.locked ? null : RARITIES[info.c.rarity];
      const borderCol = info.locked ? "#8a8aa8" : rar.color;
      const tipW = 250;
      const pad = 12;
      const innerW = tipW - pad * 2;
      const descText = info.locked ? t("ui.lockedHint") : tCollectibleDesc(info.c.id);
      const descLines = wrapText(descText, 1.3, innerW);
      const ownedLine = !info.locked && info.count > 1 ? t("ui.owned", { n: info.count }) : null;
      let contentH = 14 + 6;
      if (!info.locked) {
        contentH += 9 + 6;
        contentH += 2 + 8;
      }
      contentH += descLines.length * (9 + 4);
      if (ownedLine) contentH += 4 + 10;
      const tipH = Math.round(pad + contentH + pad - 4);
      const stageW = this.ctx.stage.width;
      const stageH = this.ctx.stage.height;
      let tipX = info.cx + 30;
      if (tipX + tipW > stageW - 8) tipX = info.cx - 30 - tipW;
      let tipY = info.cy - tipH / 2;
      tipX = Math.max(8, Math.min(stageW - 8 - tipW, tipX));
      tipY = Math.max(8, Math.min(stageH - 8 - tipH, tipY));
      rrect(g, tipX, tipY, tipW, tipH, 10);
      g.fillStyle = "rgba(20,14,38,0.96)";
      g.fill();
      g.save();
      g.shadowColor = borderCol;
      g.shadowBlur = 10;
      rrect(g, tipX, tipY, tipW, tipH, 10);
      g.strokeStyle = borderCol;
      g.lineWidth = 2;
      g.stroke();
      g.restore();
      const lx = tipX + pad;
      let ty = tipY + pad;
      if (info.locked) {
        drawText(g, t("ui.lockedPrize"), lx, ty, 2, "#8a8aa8", { glow: "#8a8aa8", glowBlur: 3 });
        ty += 14 + 6;
      } else {
        let nameX = lx;
        const tipIcon = collectibleIcon(info.c.id);
        if (tipIcon) {
          drawIconCentered(g, tipIcon, lx + 12, ty + 7, 24);
          nameX = lx + 30;
        }
        drawText(g, tCollectibleName(info.c.id), nameX, ty, 2, rar.color, { glow: rar.glow, glowBlur: 3 });
        ty += 14 + 6;
        const w1 = drawText(g, tRarity(rar.key), lx, ty, 1.3, rar.color);
        const dotX = lx + w1 + 6;
        g.fillStyle = rar.color;
        g.fillRect(dotX, ty + 3, 3, 3);
        drawText(g, tType(info.c.type), dotX + 3 + 6, ty, 1.3, rar.color);
        ty += 9 + 6;
        g.fillStyle = rar.color;
        g.globalAlpha = 0.55;
        g.fillRect(lx, ty, innerW, 2);
        g.globalAlpha = 1;
        ty += 2 + 8;
      }
      for (const line of descLines) {
        drawText(g, line, lx, ty, 1.3, INK6);
        ty += 9 + 4;
      }
      if (ownedLine) {
        ty += 4;
        drawText(g, ownedLine, lx, ty, 1.4, GOLD6);
      }
    }
    // ---- actions ------------------------------------------------------------
    /** Input lock shared with the blocking NEW-card reveal. A finished card may
     * remain cached for drawing state, so only positive card life is blocking. */
    isRevealActive() {
      return this.revealDelay > 0 || this.queue.length > 0 || this.current !== null && this.cardLife > 0;
    }
    /** Feed a store mutation into the same recent-feed and NEW-card path used by
     * capsule pulls. The returned list is useful to callers with extra staging. */
    presentRewardBatch(results) {
      this.skipReveals();
      this.feed = results.map((r) => ({ c: r.collectible, isNew: !r.isDup, count: r.count })).reverse();
      this.feedStart = 0;
      const newItems = results.filter((r) => !r.isDup);
      for (const r of newItems) this.queue.push(r);
      if (newItems.length === 0) {
        this.dupPulse = 1.3;
        this.dupPulseCount = results.length;
      }
      for (const item of newItems) {
        if (item.collectible.type === "theme" || item.collectible.type === "frame") {
          this.ctx.fx.toast(t("ui.newCosmetic"), t("ui.customizeArcade"), item.collectible.sprite);
        }
      }
      if (results.length > 0) {
        const best = results.reduce(
          (a, b) => RARITIES[b.collectible.rarity].order < RARITIES[a.collectible.rarity].order ? b : a
        );
        this.pullBurstGlow = RARITIES[best.collectible.rarity].glow;
      }
      return newItems;
    }
    celebrateRewardProgress(achievements, milestones) {
      for (const a of achievements) this.ctx.fx.toast(tAchName(a.id), tAchDesc(a.id), a.sprite);
      for (const milestone of milestones) {
        this.ctx.fx.toast(t(milestone.nameKey), t(milestone.descKey), "starBadge");
      }
    }
    doMissingPrizeExchange() {
      const store2 = this.ctx.store;
      if (this.isRevealActive()) return;
      if (store2.ownedCount() >= store2.totalCollectibles() || store2.state.shards < MISSING_PRIZE_DUST_COST) {
        this.ctx.sound.error();
        return;
      }
      const res = store2.exchangeMissingPrize();
      if (!res) {
        this.ctx.sound.error();
        return;
      }
      const outcome = { collectible: res.collectible, isDup: false, count: 1 };
      this.presentRewardBatch([outcome]);
      this.dupPulse = 0;
      this.dupPulseCount = 0;
      this.revealDelay = 0.18;
      this.popFired = true;
      this.exchangeSuccess = 1.8;
      this.ctx.sound.pull();
      this.ctx.fx.burst(EXCHANGE.x + EXCHANGE.w / 2, EXCHANGE.y + EXCHANGE.h * 0.78, this.pullBurstGlow, 14);
      this.celebrateRewardProgress(res.achievements, res.milestones);
    }
    doPull(count) {
      const cost = count === 10 ? CONFIG.PULL10_COST : CONFIG.PULL_COST * count;
      if (this.ctx.store.state.coins < cost) {
        this.ctx.sound.error();
        this.notEnough = 1.6;
        return;
      }
      const res = this.ctx.store.pull(count);
      if (!res) {
        this.ctx.sound.error();
        return;
      }
      this.presentRewardBatch(res.results);
      this.leverT = 0;
      this.leverShook = false;
      this.popFired = false;
      this.revealDelay = 0.58;
      this.ctx.sound.pull();
      this.celebrateRewardProgress(res.achievements, res.milestones);
    }
    /** Fast-forward the big-reveal queue: drop any pending/current cards. The
     * store already applied every outcome, and the feed already logged them, so
     * skipping only removes the blocking card animation (QA-002 skip). */
    skipReveals() {
      this.queue = [];
      this.current = null;
      this.cardLife = 0;
      this.revealTimer = 0;
      this.revealDelay = 0;
      this.popFired = true;
    }
  };

  // src/screens/achievementScreen.ts
  var GOLD7 = "#ffd23f";
  var CYAN7 = "#5fe6d6";
  var INK7 = "#f6f4ff";
  var MUTE2 = "#9a93bd";
  var NAME_SCALE = 1.8;
  var NAME_STEP = 24;
  var META_SCALE = 1.5;
  var COLS = 3;
  var CARD_H2 = 258;
  var CARD_W2 = Math.round(CARD_H2 * (283 / 450));
  var GAP_X = 130;
  var GAP_Y = 14;
  var GRID_W = COLS * CARD_W2 + (COLS - 1) * GAP_X;
  var GRID_X = Math.round((1600 - GRID_W) / 2);
  var GRID_Y = 192;
  var AchievementScreen = class {
    constructor(ctx2) {
      this.ctx = ctx2;
      this.name = "achievements";
    }
    render(g) {
      const store2 = this.ctx.store;
      const W = this.ctx.stage.width;
      const H = this.ctx.stage.height;
      g.fillStyle = "#0a0713";
      g.fillRect(0, 0, W, H);
      const grad = g.createRadialGradient(800, 300, 60, 800, 320, 940);
      grad.addColorStop(0, "rgba(70,48,120,0.4)");
      grad.addColorStop(1, "rgba(6,4,12,0)");
      g.fillStyle = grad;
      g.fillRect(0, 0, W, H);
      drawBackButton(g, this.ctx, () => this.ctx.router.back());
      drawDemoPlaque(g, this.ctx, 1110, 20, 156);
      this.drawTitle(g);
      this.drawProgress(g, store2);
      let tip = null;
      for (let i = 0; i < ACHIEVEMENTS.length; i++) {
        const a = ACHIEVEMENTS[i];
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const x = GRID_X + col * (CARD_W2 + GAP_X);
        const y = GRID_Y + row * (CARD_H2 + GAP_Y);
        const iso = store2.state.achievements[a.id];
        const hovered = this.ctx.stage.hotspot({ x, y, w: CARD_W2, h: CARD_H2, cursor: "default", id: "ach-" + a.id });
        this.drawCard(g, a.id, a.sprite, !!iso, iso ?? null, x, y, hovered);
        if (hovered) tip = { id: a.id, x, y };
      }
      if (tip) this.drawTooltip(g, tip.id, tip.x, tip.y);
    }
    // ---- header -------------------------------------------------------------
    drawTitle(g) {
      const w = 330;
      const h = Math.round(w / FRAME_ANCHORS.titlePlaque.aspect);
      const x = Math.round(800 - w / 2);
      const y = 2;
      const img = this.ctx.assets.get("achTitlePlaque");
      if (img) {
        drawImageSmooth(g, img, x, y, w, h);
        this.frameText(g, t("ui.achievements"), x, y, w, h, FRAME_ANCHORS.titlePlaque.textWin, 3, GOLD7, GOLD7);
      } else {
        drawText(g, t("ui.achievements"), 800, 28, 4.5, GOLD7, { align: "center", glow: GOLD7, glowBlur: 5, shadow: "rgba(0,0,0,0.5)" });
      }
    }
    drawProgress(g, store2) {
      const total = ACHIEVEMENTS.length;
      const unlocked = ACHIEVEMENTS.filter((a) => store2.state.achievements[a.id]).length;
      const label = t("ui.unlockedCount", { n: unlocked, total });
      const w = 300;
      const h = Math.round(w / FRAME_ANCHORS.progressPlaque.aspect);
      const x = 1600 - w - 24;
      const y = 58;
      const img = this.ctx.assets.get("achProgressPlaque");
      if (img) {
        drawImageSmooth(g, img, x, y, w, h);
        this.frameText(g, label, x, y, w, h, FRAME_ANCHORS.progressPlaque.textWin, 2.1, CYAN7, "#2f9fa0");
      } else {
        drawText(g, label, 800, 96, 2.25, CYAN7, { align: "center", glow: "#2f9fa0", glowBlur: 3 });
      }
    }
    // ---- trophy card --------------------------------------------------------
    drawCard(g, id, sprite, unlocked, iso, x, y, hovered) {
      const cardAsset = unlocked ? "achCardUnlocked" : "achCardLocked";
      const img = this.ctx.assets.get(cardAsset);
      if (!img) {
        this.drawCardProcedural(g, id, sprite, unlocked, iso, x, y, hovered);
        return;
      }
      const A = unlocked ? FRAME_ANCHORS.cardUnlocked : FRAME_ANCHORS.cardLocked;
      if (hovered && unlocked) {
        g.save();
        g.shadowColor = GOLD7;
        g.shadowBlur = 26;
        drawImageSmooth(g, img, x, y, CARD_W2, CARD_H2);
        g.restore();
      } else {
        drawImageSmooth(g, img, x, y, CARD_W2, CARD_H2);
      }
      const icon = this.ctx.assets.get(achIconAsset(id));
      const iconCx = x + CARD_W2 * A.icon.cx;
      const iconCy = y + CARD_H2 * A.icon.cy;
      if (icon) {
        if (unlocked) {
          drawIconCentered(g, icon, iconCx, iconCy, CARD_W2 * 0.5);
        } else {
          g.save();
          g.globalAlpha = 0.32;
          drawIconCentered(g, icon, iconCx, iconCy, CARD_W2 * 0.46);
          g.restore();
        }
      } else {
        drawSpriteCentered(g, sprite, iconCx, iconCy, CARD_W2 * 0.44);
      }
      const nameLines = wrapText(tAchName(id), NAME_SCALE, CARD_W2 * 0.82).slice(0, 2);
      let ny = y + CARD_H2 * A.name.cy - (nameLines.length - 1) * (NAME_STEP / 2);
      for (const line of nameLines) {
        drawText(g, line, x + CARD_W2 * 0.5, ny, NAME_SCALE, unlocked ? INK7 : "#8f8ab0", {
          align: "center",
          glow: unlocked ? GOLD7 : void 0,
          glowBlur: 2,
          shadow: "rgba(0,0,0,0.55)"
        });
        ny += NAME_STEP;
      }
      if (unlocked && iso) {
        this.fitLine(g, t("ui.unlockedOn", { date: fmtDate(iso) }), x + CARD_W2 * 0.5, y + CARD_H2 * ("date" in A ? A.date.cy : 0.75), CARD_W2 * 0.86, META_SCALE, GOLD7, GOLD7);
      } else {
        const cy = "locked" in A ? A.locked.cy : 0.72;
        this.fitLine(g, t("ui.lockedAchievement"), x + CARD_W2 * 0.5, y + CARD_H2 * cy, CARD_W2 * 0.86, META_SCALE, MUTE2);
      }
    }
    /** Procedural fallback card (art still loading) — a lit/dim plaque. */
    drawCardProcedural(g, id, sprite, unlocked, iso, x, y, hovered) {
      const accent = unlocked ? GOLD7 : "#4a4270";
      g.save();
      if (unlocked) {
        g.shadowColor = GOLD7;
        g.shadowBlur = hovered ? 20 : 10;
      }
      rrect(g, x, y, CARD_W2, CARD_H2, 14);
      g.fillStyle = unlocked ? "rgba(30,22,10,0.92)" : "rgba(16,12,26,0.9)";
      g.fill();
      g.restore();
      rrect(g, x, y, CARD_W2, CARD_H2, 14);
      g.strokeStyle = accent;
      g.lineWidth = unlocked ? 3 : 2;
      g.stroke();
      const cx = x + CARD_W2 / 2;
      if (unlocked) {
        drawSpriteCentered(g, sprite, cx, y + CARD_H2 * 0.34, CARD_W2 * 0.46);
      } else {
        g.save();
        g.globalAlpha = 0.3;
        drawSpriteCentered(g, sprite, cx, y + CARD_H2 * 0.34, CARD_W2 * 0.42);
        g.restore();
      }
      const nameLines = wrapText(tAchName(id), NAME_SCALE, CARD_W2 * 0.82).slice(0, 2);
      let ny = y + CARD_H2 * 0.56 - (nameLines.length - 1) * (NAME_STEP / 2);
      for (const line of nameLines) {
        drawText(g, line, cx, ny, NAME_SCALE, unlocked ? INK7 : "#8a86a6", { align: "center", glow: unlocked ? GOLD7 : void 0, glowBlur: 2 });
        ny += NAME_STEP;
      }
      if (unlocked && iso) {
        this.fitLine(g, t("ui.unlockedOn", { date: fmtDate(iso) }), cx, y + CARD_H2 * 0.78, CARD_W2 * 0.86, META_SCALE, GOLD7, GOLD7);
      } else {
        this.fitLine(g, t("ui.lockedAchievement"), cx, y + CARD_H2 * 0.78, CARD_W2 * 0.86, META_SCALE, MUTE2);
      }
    }
    // ---- hover tooltip ------------------------------------------------------
    /** Hovered-card tooltip: a compact dark rounded panel holding the wrapped
     * achievement description (CJK-safe via drawText). Shown for locked cards too,
     * so the panel teases the goal. Sits just below the card, flipping above when
     * it would run past the bottom edge, and is clamped inside the viewport. */
    drawTooltip(g, id, cardX, cardY) {
      const desc = tAchDesc(id);
      if (!desc) return;
      const W = this.ctx.stage.width;
      const H = this.ctx.stage.height;
      const scale = 1.5;
      const padX = 14;
      const padY = 12;
      const maxTextW = 300;
      const lines = wrapText(desc, scale, maxTextW);
      const lineH = Math.max(Math.round(GLYPH_H * scale), Math.round(scale * 8));
      const lineStep = lineH + 6;
      let textW = 0;
      for (const line of lines) textW = Math.max(textW, measureText(line, scale));
      const boxW = Math.round(Math.min(maxTextW, textW)) + padX * 2;
      const boxH = padY * 2 + (lines.length - 1) * lineStep + lineH;
      const edge = 12;
      const gap = 12;
      let boxX = Math.round(cardX + CARD_W2 / 2 - boxW / 2);
      boxX = Math.max(edge, Math.min(W - boxW - edge, boxX));
      let boxY = cardY + CARD_H2 + gap;
      if (boxY + boxH > H - edge) boxY = cardY - gap - boxH;
      boxY = Math.max(edge, Math.min(H - boxH - edge, boxY));
      panel(g, boxX, boxY, boxW, boxH, { radius: 10, fill: "rgba(10,7,20,0.96)", border: CYAN7, borderWidth: 2 });
      let ty = boxY + padY;
      for (const line of lines) {
        drawText(g, line, boxX + boxW / 2, ty, scale, INK7, { align: "center", shadow: "rgba(0,0,0,0.6)" });
        ty += lineStep;
      }
    }
    // ---- text helpers -------------------------------------------------------
    /** Draw `text` centered in a frame's content window, auto-fit to both axes. */
    frameText(g, text, x, y, w, h, win, maxScale, color, glow) {
      const maxW = w * win.w * 0.94;
      const maxH = h * win.h * 0.86;
      const w1 = Math.max(1, measureText(text, 1));
      let s = Math.min(maxScale, maxH / GLYPH_H, maxW / w1);
      s = Math.max(1, s);
      drawText(g, text, x + w * win.cx, y + h * win.cy - GLYPH_H * s / 2, s, color, { align: "center", glow, glowBlur: 3 });
    }
    /** Draw one centered line at vertical center `cy`, shrinking to fit `maxW`. */
    fitLine(g, text, cx, cy, maxW, maxScale, color, glow) {
      const w1 = Math.max(1, measureText(text, 1));
      const s = Math.max(0.9, Math.min(maxScale, maxW / w1));
      drawText(g, text, cx, cy - GLYPH_H * s / 2, s, color, { align: "center", glow, glowBlur: glow ? 2 : 0 });
    }
  };

  // src/screens/customizeScreen.ts
  var GOLD8 = "#ffd23f";
  var CYAN8 = "#5fe6d6";
  var MAGENTA5 = "#e15ad8";
  var INK8 = "#f6f4ff";
  var MUTE3 = "#a7a1c3";
  var ROOM_WELLS = {
    base: { x: 118, y: 382, w: 292, h: 182 },
    e_sunset: { x: 473, y: 382, w: 292, h: 182 },
    l_forest: { x: 828, y: 382, w: 292, h: 182 }
  };
  var FRAME_WELLS = {
    base: { x: 1220, y: 216, w: 232, h: 214 },
    r_frame: { x: 1220, y: 494, w: 232, h: 214 }
  };
  var CustomizeScreen = class {
    constructor(ctx2) {
      this.ctx = ctx2;
      this.name = "customize";
    }
    render(g) {
      this.drawWorkshop(g);
      drawBackButton(g, this.ctx, () => this.ctx.router.back());
      this.drawHeader(g);
      drawDemoPlaque(g, this.ctx, 1138, 22, 156);
      this.drawRackLabels(g);
      this.drawThemeRack(g);
      this.drawFrameStation(g);
    }
    /** Draw the supplied 16:10 workshop exactly once. There is deliberately no
     * fallback gradient or global wash: the authored room is the UI shell. */
    drawWorkshop(g) {
      const bg2 = this.ctx.assets.get("customizeWorkshopBackdrop");
      if (bg2) {
        drawImageSmooth(g, bg2, 0, 0, this.ctx.stage.width, this.ctx.stage.height);
        return;
      }
      g.fillStyle = "#08070f";
      g.fillRect(0, 0, this.ctx.stage.width, this.ctx.stage.height);
    }
    drawHeader(g) {
      drawText(g, t("ui.customizeArcade"), 750, 26, 3.15, GOLD8, { align: "center", glow: GOLD8, glowBlur: 5 });
    }
    /** Small fixture labels, mounted near hardware rather than turned into panels. */
    drawRackLabels(g) {
      drawText(g, t("ui.roomThemes"), 134, 201, 1.8, MAGENTA5, { glow: MAGENTA5, glowBlur: 3, shadow: "#08050f" });
      g.fillStyle = "rgba(225,90,216,0.7)";
      g.fillRect(130, 226, 216, 2);
      drawText(g, t("ui.profileFrames"), 1110, 152, 1.6, CYAN8, { glow: CYAN8, glowBlur: 3, shadow: "#08050f" });
      g.fillStyle = "rgba(95,230,214,0.7)";
      g.fillRect(1108, 177, 244, 2);
    }
    drawThemeRack(g) {
      const ids = ["base", ...ROOM_THEME_IDS];
      for (const id of ids) this.drawThemeWell(g, id, ROOM_WELLS[id]);
    }
    drawThemeWell(g, id, well) {
      const state = this.themeState(id);
      if (state === "equipped") this.drawWellSelection(g, well, MAGENTA5, 7);
      if (state === "locked") {
        this.drawLock(g, well.x + well.w / 2, well.y + well.h / 2, MAGENTA5);
      } else {
        this.drawThemePreview(g, id, well);
      }
      const name = this.themeDisplayName(id);
      this.fitCenter(g, name, well.x + well.w / 2, well.y + 202, well.w - 28, 1.6, state === "locked" ? MUTE3 : INK8, state === "equipped" ? MAGENTA5 : void 0, 1.25);
      this.drawThemeActionPlaque(g, id, state, well);
    }
    /** A generated metal plaque makes the room-theme state legible at a glance.
     * An owned theme presents the direct EQUIP command; equipped and locked
     * themes remain clear non-buttons. The preview itself still communicates
     * ownership (real room art vs. lock), so a separate OWNED label is redundant. */
    drawThemeActionPlaque(g, id, state, well) {
      const x = well.x + 48;
      const y = well.y + 225;
      const w = well.w - 96;
      const h = 82;
      const actionable = state === "owned";
      const hovered = actionable ? this.ctx.stage.hotspot({ x, y, w, h, cursor: "pointer", id: "equip-theme-" + id, onClick: () => this.equipTheme(id) }) : false;
      const plaque = this.ctx.assets.get("achSmallPlaque");
      g.save();
      if (state === "locked") g.globalAlpha = 0.42;
      if (hovered || state === "equipped") {
        g.shadowColor = state === "equipped" ? MAGENTA5 : GOLD8;
        g.shadowBlur = hovered ? 16 : 11;
      }
      if (plaque) drawImageSmooth(g, plaque, x, y, w, h);
      g.restore();
      const label = state === "locked" ? t("ui.locked") : state === "equipped" ? t("ui.equipped") : t("ui.equip");
      const color = state === "locked" ? MUTE3 : state === "equipped" ? MAGENTA5 : hovered ? GOLD8 : INK8;
      this.fitCenter(g, label, x + w / 2, y + 29, w - 42, 1.8, color, hovered || state === "equipped" ? color : void 0, 1.4);
    }
    /** Theme scenes occupy the complete 16:10 projector screen edge to edge. */
    drawThemePreview(g, id, rect2) {
      const asset = id === "e_sunset" ? "roomThemeSunset" : id === "l_forest" ? "roomThemeForest" : "roomBg";
      const img = this.ctx.assets.get(asset);
      if (!img) return;
      g.save();
      g.beginPath();
      g.rect(rect2.x, rect2.y, rect2.w, rect2.h);
      g.clip();
      drawImageSmooth(g, img, rect2.x, rect2.y, rect2.w, rect2.h);
      g.restore();
    }
    drawFrameStation(g) {
      const ids = ["base", ...PROFILE_FRAME_IDS];
      for (const id of ids) this.drawFrameWell(g, id, FRAME_WELLS[id]);
    }
    drawFrameWell(g, id, well) {
      const state = this.frameState(id);
      if (state === "equipped") this.drawWellSelection(g, well, CYAN8, 7);
      const cx = well.x + well.w / 2;
      const cy = well.y + 103;
      this.drawFramePreview(g, id, state, cx, cy);
      const name = id === "base" ? t("ui.frameBaseDisplay") : t("ui.frameCyanDisplay");
      this.fitCenter(g, name, well.x + well.w / 2, well.y + 8, well.w - 28, 1.45, state === "locked" ? MUTE3 : INK8, state === "equipped" ? CYAN8 : void 0, 1.2);
      this.drawFrameActionPlaque(g, id, state, well);
    }
    /** Profile frames use the same single, physical state/action language as
     * room themes. This removes the old duplicated OWNED/EQUIPPED line plus a
     * second tiny command beneath it. */
    drawFrameActionPlaque(g, id, state, well) {
      const x = well.x + 46;
      const y = well.y + 184;
      const w = well.w - 92;
      const h = 66;
      const actionable = state === "owned";
      const hovered = actionable ? this.ctx.stage.hotspot({ x, y, w, h, cursor: "pointer", id: "equip-frame-" + id, onClick: () => this.equipFrame(id) }) : false;
      const plaque = this.ctx.assets.get("achSmallPlaque");
      g.save();
      if (state === "locked") g.globalAlpha = 0.42;
      if (hovered || state === "equipped") {
        g.shadowColor = state === "equipped" ? CYAN8 : GOLD8;
        g.shadowBlur = hovered ? 14 : 10;
      }
      if (plaque) drawImageSmooth(g, plaque, x, y, w, h);
      g.restore();
      const label = state === "locked" ? t("ui.locked") : state === "equipped" ? t("ui.equipped") : t("ui.equip");
      const color = state === "locked" ? MUTE3 : state === "equipped" ? CYAN8 : hovered ? GOLD8 : INK8;
      this.fitCenter(g, label, x + w / 2, y + 23, w - 34, 1.55, color, hovered || state === "equipped" ? color : void 0, 1.2);
    }
    /** The Cyan frame stays the real item art. The avatar is restored only in its
     * opaque interior window so the wing tips, gems, rails, and bolts remain whole. */
    drawFramePreview(g, id, state, cx, cy) {
      const player = this.ctx.assets.get("homePlayer");
      if (id === "r_frame") {
        const frame = collectibleIcon("r_frame");
        if (frame) {
          g.save();
          g.globalAlpha = state === "locked" ? 0.24 : 1;
          drawImageContain(g, frame, cx, cy, 136, 160);
          g.restore();
        }
        if (state !== "locked") {
          g.save();
          rrect(g, cx - 33, cy - 35, 66, 74, 7);
          g.clip();
          if (player) drawCropContain(g, player, PLAYER_PORTRAIT_CROP, cx - 33, cy - 37, 66, 77);
          g.restore();
        } else {
          this.drawLock(g, cx, cy + 2, CYAN8);
        }
        return;
      }
      if (player) drawCropContain(g, player, PLAYER_PORTRAIT_CROP, cx - 49, cy - 57, 98, 112);
      g.save();
      g.strokeStyle = state === "equipped" ? CYAN8 : "#668a96";
      g.lineWidth = 2;
      rrect(g, cx - 55, cy - 65, 110, 132, 6);
      g.stroke();
      g.restore();
    }
    /** A thin lit edge follows the hardware bay only for the selected item. */
    drawWellSelection(g, well, color, radius) {
      g.save();
      g.shadowColor = color;
      g.shadowBlur = 16;
      g.strokeStyle = color;
      g.lineWidth = 2;
      rrect(g, well.x - 5, well.y - 5, well.w + 10, well.h + 10, radius);
      g.stroke();
      g.restore();
    }
    drawLock(g, cx, cy, color) {
      g.save();
      g.shadowColor = color;
      g.shadowBlur = 12;
      g.strokeStyle = color;
      g.fillStyle = "#11101b";
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
    fitCenter(g, text, cx, y, maxW, maxScale, color, glow, minScale = 0.82) {
      const scale = Math.max(minScale, Math.min(maxScale, maxW / Math.max(1, measureText(text, 1))));
      drawText(g, text, cx, y, scale, color, { align: "center", glow, glowBlur: glow ? 3 : 0, shadow: "#08050f" });
    }
    themeDisplayName(id) {
      if (id === "e_sunset") return t("ui.themeSunsetDisplay");
      if (id === "l_forest") return t("ui.themeForestDisplay");
      return t("ui.themeBaseDisplay");
    }
    themeState(id) {
      if (this.ctx.store.state.cosmetics.roomTheme === id) return "equipped";
      if (id === "base" || this.ctx.store.state.owned[id]) return "owned";
      return "locked";
    }
    frameState(id) {
      if (this.ctx.store.state.cosmetics.profileFrame === id) return "equipped";
      if (id === "base" || this.ctx.store.state.owned[id]) return "owned";
      return "locked";
    }
    equipTheme(id) {
      if (!this.ctx.store.equipRoomTheme(id)) return;
      this.ctx.sound.click();
      this.ctx.fx.banner(t("ui.equipped"), 800, 112, MAGENTA5, { scale: 2.5, life: 1.2 });
      this.ctx.stage.wake(900);
    }
    equipFrame(id) {
      if (!this.ctx.store.equipProfileFrame(id)) return;
      this.ctx.sound.click();
      this.ctx.fx.banner(t("ui.equipped"), 1310, 112, CYAN8, { scale: 2.2, life: 1.2 });
      this.ctx.stage.wake(900);
    }
  };

  // src/main.ts
  var roomScreen;
  var params = new URLSearchParams(window.location.search);
  var hostedDemo = params.get("demo") === "1" || window.location.hostname.endsWith("github.io");
  var canvas = document.getElementById("stage");
  var overlaysRoot = document.getElementById("overlays");
  if (!(canvas instanceof HTMLCanvasElement) || !overlaysRoot) {
    throw new Error("Token Arcade: missing #stage canvas or #overlays root");
  }
  var stage = new Stage(canvas);
  var store = new GameStore();
  if (hostedDemo) store.setMode("demo");
  var currentRoomAsset = store.state.cosmetics.roomTheme === "e_sunset" ? "roomThemeSunset" : store.state.cosmetics.roomTheme === "l_forest" ? "roomThemeForest" : "roomBg";
  var currentGuideAsset = store.state.settings.language === "zh-CN" ? "homeTokenGuideBoardZh" : "homeTokenGuideBoardEn";
  var HOME_CRITICAL = [
    currentRoomAsset,
    "coinBank",
    "prizeWall",
    "collectionNeonShelf",
    "collectionPrizeLights",
    "collectionPedestal",
    "collectionCrownMarquee",
    "decorWallBoard",
    "decorFloorRiser",
    "decorBuddyRug",
    "cabinetSkins",
    "homeLevelCabinets",
    "levelUiKit",
    "homeLogo",
    "homePlayer",
    "homePlayerCard",
    currentGuideAsset,
    "homeSyncStates",
    "homeShopCard",
    "homeProjectRow",
    "homeIconBtn",
    "homeUtilityButtons",
    "coinHudPlaque",
    "tokenHudPlaque",
    "priceTagPlaque",
    "coinSocket",
    "shopCapsuleSingle",
    "shopCapsuleBundle"
  ];
  var boot = document.getElementById("boot");
  var bootProgress = document.getElementById("boot-progress");
  var bootLabel = document.getElementById("boot-label");
  function paintBoot(fraction) {
    const pct = Math.max(0, Math.min(100, Math.round(fraction * 100)));
    if (bootProgress instanceof HTMLElement) bootProgress.style.width = pct + "%";
    if (bootLabel) {
      bootLabel.textContent = store.state.settings.language === "zh-CN" ? `\u8857\u673A\u5385\u901A\u7535\u4E2D... ${pct}%` : `POWERING UP ARCADE... ${pct}%`;
    }
  }
  var overlays = new Overlays(
    overlaysRoot,
    store,
    () => {
      sound.setMuted(store.state.settings.muted);
      stage.setFrameMode(store.state.settings.fps);
    },
    () => {
      overlays.close();
      router.go("achievements");
    },
    hostedDemo ? void 0 : () => {
      router.go("room");
      void roomScreen.tryLiveScanFromSettings();
    }
  );
  sound.setMuted(store.state.settings.muted);
  stage.setFrameMode(store.state.settings.fps);
  var context;
  var router = new Router(() => context);
  context = {
    stage,
    store,
    router,
    fx,
    sound,
    assets,
    openHelp: () => overlays.openHelp(),
    openSettings: () => overlays.openSettings(),
    editPlayerName: () => overlays.openPlayerName()
  };
  roomScreen = new RoomScreen(context);
  router.register(roomScreen);
  router.register(new CabinetScreen(context));
  router.register(new CapsuleScreen(context));
  router.register(new AchievementScreen(context));
  router.register(new CustomizeScreen(context));
  async function launch() {
    await Promise.all([
      hostedDemo && store.state.projects.length === 0 ? store.sync() : Promise.resolve(),
      assets.waitFor(HOME_CRITICAL, paintBoot)
    ]);
    paintBoot(1);
    router.go("room");
    stage.start((ctx2, dt, now) => {
      fx.update(dt);
      router.render(ctx2, dt, now);
    });
    assets.load();
    requestAnimationFrame(() => {
      boot?.classList.add("ta-boot-ready");
      window.setTimeout(() => boot?.remove(), 260);
    });
  }
  void launch();
  window.addEventListener("pointerdown", () => sound.resume(), { once: true });
  window.arcade = { store, router, stage, hostedDemo };
})();
//# sourceMappingURL=app.js.map
