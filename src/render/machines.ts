/*
 * machines.ts — the two big procedural machines of the arcade room.
 *
 *   - drawCapsuleMachine: the gumball/capsule dispenser you spend coins at.
 *   - drawCoinBank: the centerpiece glass tank that swallows tokens and rains
 *     coins. It reads as a chunky, glowing arcade machine, not a progress bar.
 *
 * Both are drawn in code because they react to game state (shake, fill, time).
 */

import { rrect, vgrad } from './canvas';
import { drawText } from './pixelFont';
import { drawCoin } from './sprites';

// A filled circle — local helper for the capsule balls and token bubbles.
function dot(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, c: string): void {
  ctx.fillStyle = c;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
}

/*
 * drawCapsuleMachine — gumball/capsule machine. opts:{ shake, label }
 */
export function drawCapsuleMachine(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  opts?: { shake?: number; label?: string },
): void {
  const o = opts || {};
  const shake = o.shake || 0;
  ctx.save();
  // Translate so the origin sits at the machine's top-left (x, y); everything
  // below is authored in LOCAL coordinates (0..w, 0..h). `shake` nudges it.
  ctx.translate(x + shake, y);

  // Base
  const baseY = h * 0.55;
  rrect(ctx, w * 0.12, baseY, w * 0.76, h * 0.42, 8);
  vgrad(ctx, w * 0.12, baseY, w * 0.76, h * 0.42, '#ef5d78', '#7a1f33');
  ctx.fill();
  // chrome dispenser
  ctx.fillStyle = '#2a2440';
  ctx.fillRect(w * 0.2, baseY + h * 0.18, w * 0.6, h * 0.14);
  rrect(ctx, w * 0.4, baseY + h * 0.2, w * 0.2, h * 0.1, 3);
  ctx.fillStyle = '#8a8ab0';
  ctx.fill();
  // coin slot
  ctx.fillStyle = '#160f1f';
  ctx.fillRect(w * 0.46, baseY + h * 0.05, w * 0.02, h * 0.08);
  const lblFs = Math.max(1, Math.floor(w * 0.02));
  drawText(ctx, o.label || 'INSERT COIN', w / 2, baseY + h * 0.35, lblFs, '#ffd23f', { align: 'center' });

  // Glass dome
  const domeCx = w / 2;
  const domeCy = h * 0.4;
  const domeR = w * 0.36;
  // globe back
  ctx.beginPath();
  ctx.arc(domeCx, domeCy, domeR, Math.PI, 0);
  ctx.lineTo(domeCx + domeR, h * 0.55);
  ctx.lineTo(domeCx - domeR, h * 0.55);
  ctx.closePath();
  ctx.fillStyle = 'rgba(180,230,255,0.14)';
  ctx.fill();
  // capsules inside
  ctx.save();
  ctx.beginPath();
  ctx.arc(domeCx, domeCy, domeR - 2, Math.PI, 0);
  ctx.lineTo(domeCx + domeR, h * 0.54);
  ctx.lineTo(domeCx - domeR, h * 0.54);
  ctx.closePath();
  ctx.clip();
  const ballCols = ['#ef5d78', '#ffd23f', '#5fd66f', '#4aa3ff', '#9a6cff', '#5fe6d6', '#ff8fce', '#ff9a3c'];
  const br = domeR * 0.2;
  let bi = 0;
  for (let ry = 0; ry < 4; ry++) {
    for (let rx = -3; rx <= 3; rx++) {
      const cx = domeCx + rx * br * 1.05 + (ry % 2 ? br * 0.5 : 0);
      const cy = h * 0.5 - ry * br * 1.1;
      const col = ballCols[bi++ % ballCols.length];
      dot(ctx, cx, cy, br, col);
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      dot(ctx, cx - br * 0.3, cy - br * 0.3, br * 0.28, 'rgba(255,255,255,0.6)');
    }
  }
  ctx.restore();
  // glass rim + highlight
  ctx.strokeStyle = 'rgba(200,240,255,0.5)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(domeCx, domeCy, domeR, Math.PI, 0);
  ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,0.25)';
  ctx.beginPath();
  ctx.arc(domeCx - domeR * 0.4, domeCy - domeR * 0.2, domeR * 0.18, 0, Math.PI * 2);
  ctx.fill();
  // topper
  rrect(ctx, w * 0.36, h * 0.02, w * 0.28, h * 0.08, 3);
  vgrad(ctx, w * 0.36, h * 0.02, w * 0.28, h * 0.08, '#9a6cff', '#5a3ab0');
  ctx.fill();

  ctx.restore();
}

/*
 * drawCoinBank — the home-screen centerpiece. A tall glass "COIN BANK" tank
 * that tokens drop into (via the chute) and where coins pile up at the bottom.
 * Reads best at roughly 360x520 logical pixels.
 * opts: { fill(0..1 pile height), tokens, t(anim seconds), label, sublabel }
 */
export function drawCoinBank(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  opts?: { fill?: number; tokens?: number; t?: number; label?: string; sublabel?: string },
): void {
  const o = opts || {};
  const t = o.t || 0;
  const fillFrac = Math.max(0, Math.min(1, o.fill == null ? 0.6 : o.fill));
  const label = o.label || 'COIN BANK';
  const sublabel = o.sublabel || '1,000 TOKENS = 1 COIN';
  const cx = x + w / 2;

  ctx.save();

  // ---- Pedestal / base --------------------------------------------------
  const baseH = h * 0.17;
  const baseY = y + h - baseH;
  rrect(ctx, x + w * 0.08, baseY, w * 0.84, baseH, 10);
  vgrad(ctx, x + w * 0.08, baseY, w * 0.84, baseH, '#241c34', '#0d0a16');
  ctx.fill();
  rrect(ctx, x + w * 0.08, baseY, w * 0.84, baseH, 10);
  ctx.strokeStyle = '#2f9fa0';
  ctx.lineWidth = 2;
  ctx.stroke();
  // little feet
  ctx.fillStyle = '#160f1f';
  ctx.fillRect(x + w * 0.14, baseY + baseH - 3, w * 0.1, 3);
  ctx.fillRect(x + w * 0.76, baseY + baseH - 3, w * 0.1, 3);

  // ---- Glass cylinder body ---------------------------------------------
  const glassX = x + w * 0.14;
  const glassW = w * 0.72;
  const glassTop = y + h * 0.19;
  const glassH = baseY - glassTop + h * 0.03;
  const glassR = w * 0.14;

  // translucent cyan fill
  rrect(ctx, glassX, glassTop, glassW, glassH, glassR);
  vgrad(ctx, glassX, glassTop, glassW, glassH, 'rgba(95,230,214,0.12)', 'rgba(47,159,160,0.24)');
  ctx.fill();

  // clip everything that lives inside the tank
  ctx.save();
  rrect(ctx, glassX, glassTop, glassW, glassH, glassR);
  ctx.clip();

  // coin pile resting at the bottom — a pyramid whose height tracks `fill`
  const coinR = w * 0.055;
  const rows = 2 + Math.round(fillFrac * 3); // 2..5 rows
  const pileBottom = glassTop + glassH - coinR;
  for (let r = 0; r < rows; r++) {
    const inRow = rows - r + 1; // wider at the base
    const rowW = (inRow - 1) * coinR * 1.05;
    const ry = pileBottom - r * coinR * 1.05;
    for (let c = 0; c < inRow; c++) {
      const px = cx - rowW / 2 + c * coinR * 1.05;
      drawCoin(ctx, px, ry, coinR, 1);
    }
  }

  // floating "T" token bubbles gently bobbing with time
  const bubbleCount = 5;
  const bubbleR = w * 0.05;
  for (let i = 0; i < bubbleCount; i++) {
    const colFrac = (i % 3) / 2; // 0, 0.5, 1 across three columns
    const bx = glassX + glassW * (0.26 + colFrac * 0.48);
    const rowIdx = Math.floor(i / 3);
    const baseYb = glassTop + glassH * (0.26 + rowIdx * 0.2);
    const by = baseYb + Math.sin(t + i) * (h * 0.02);
    // cyan bubble
    dot(ctx, bx, by, bubbleR, '#5fe6d6');
    ctx.strokeStyle = 'rgba(20,15,31,0.45)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(bx, by, bubbleR, 0, Math.PI * 2);
    ctx.stroke();
    // shine
    dot(ctx, bx - bubbleR * 0.3, by - bubbleR * 0.3, bubbleR * 0.3, 'rgba(255,255,255,0.4)');
    // white T
    const tf = Math.max(1, Math.round(bubbleR * 0.42));
    drawText(ctx, 'T', bx, by - tf * 3.5, tf, '#f6f4ff', { align: 'center' });
  }

  ctx.restore(); // end tank clip

  // soft vertical highlight down the left of the glass
  rrect(ctx, glassX + glassW * 0.12, glassTop + glassH * 0.05, glassW * 0.16, glassH * 0.8, glassW * 0.08);
  ctx.fillStyle = 'rgba(255,255,255,0.10)';
  ctx.fill();

  // bright neon cyan rim
  ctx.save();
  ctx.shadowColor = '#5fe6d6';
  ctx.shadowBlur = 12;
  rrect(ctx, glassX, glassTop, glassW, glassH, glassR);
  ctx.strokeStyle = '#5fe6d6';
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.restore();

  // ---- Chute / funnel feeding into the top of the tank ------------------
  const my = y + h * 0.015;
  const mh = h * 0.085;
  const chuteTop = my + mh;
  const chuteBot = glassTop + 2;
  const topHalf = w * 0.16;
  const botHalf = w * 0.07;
  ctx.beginPath();
  ctx.moveTo(cx - topHalf, chuteTop);
  ctx.lineTo(cx + topHalf, chuteTop);
  ctx.lineTo(cx + botHalf, chuteBot);
  ctx.lineTo(cx - botHalf, chuteBot);
  ctx.closePath();
  const cg = ctx.createLinearGradient(0, chuteTop, 0, chuteBot);
  cg.addColorStop(0, '#3a3350');
  cg.addColorStop(1, '#160f1f');
  ctx.fillStyle = cg;
  ctx.fill();
  ctx.strokeStyle = '#2f9fa0';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  // downward arrow dropping tokens in
  const arrowCy = (chuteTop + chuteBot) / 2;
  const aw = w * 0.05;
  const ah = h * 0.028;
  ctx.fillStyle = '#5fe6d6';
  ctx.fillRect(cx - aw * 0.35, arrowCy - ah, aw * 0.7, ah);
  ctx.beginPath();
  ctx.moveTo(cx - aw, arrowCy);
  ctx.lineTo(cx + aw, arrowCy);
  ctx.lineTo(cx, arrowCy + ah);
  ctx.closePath();
  ctx.fill();

  // ---- Marquee plate ----------------------------------------------------
  const mx = x + w * 0.06;
  const mw = w * 0.88;
  rrect(ctx, mx, my, mw, mh, 6);
  vgrad(ctx, mx, my, mw, mh, '#241c34', '#0d0a16');
  ctx.fill();
  rrect(ctx, mx, my, mw, mh, 6);
  ctx.strokeStyle = '#c98f24';
  ctx.lineWidth = 2;
  ctx.stroke();
  const mfs = Math.max(1, Math.floor((mw * 0.82) / (label.length * 6)));
  drawText(ctx, label, cx, my + mh / 2 - mfs * 3.5, mfs, '#ffd23f', { align: 'center', glow: '#ffd23f', glowBlur: 4 });

  // ---- Front plate with the conversion rate -----------------------------
  const plateW = w * 0.74;
  const plateH = h * 0.07;
  const plateX = cx - plateW / 2;
  const plateY = baseY + baseH * 0.28;
  rrect(ctx, plateX, plateY, plateW, plateH, 5);
  ctx.fillStyle = '#0d0a16';
  ctx.fill();
  rrect(ctx, plateX, plateY, plateW, plateH, 5);
  ctx.strokeStyle = '#2f9fa0';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  const sfs = Math.max(1, Math.floor(plateW / (sublabel.length * 6)));
  drawText(ctx, sublabel, cx, plateY + plateH / 2 - sfs * 3.5, sfs, '#5fe6d6', {
    align: 'center',
    glow: '#2f9fa0',
    glowBlur: 3,
  });

  ctx.restore();
}
