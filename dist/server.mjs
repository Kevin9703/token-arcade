#!/usr/bin/env node

// server/index.ts
import http from "node:http";
import fs3 from "node:fs";
import path2 from "node:path";

// server/usage.ts
import fs2 from "node:fs";
import path from "node:path";
import os from "node:os";
import { createHash } from "node:crypto";

// server/agent-usage.ts
import fs from "node:fs";
import { StringDecoder } from "node:string_decoder";
import * as zlib from "node:zlib";

// node_modules/fzstd/esm/index.mjs
var ab = ArrayBuffer;
var u8 = Uint8Array;
var u16 = Uint16Array;
var i16 = Int16Array;
var i32 = Int32Array;
var slc = function(v, s, e) {
  if (u8.prototype.slice)
    return u8.prototype.slice.call(v, s, e);
  if (s == null || s < 0)
    s = 0;
  if (e == null || e > v.length)
    e = v.length;
  var n = new u8(e - s);
  n.set(v.subarray(s, e));
  return n;
};
var fill = function(v, n, s, e) {
  if (u8.prototype.fill)
    return u8.prototype.fill.call(v, n, s, e);
  if (s == null || s < 0)
    s = 0;
  if (e == null || e > v.length)
    e = v.length;
  for (; s < e; ++s)
    v[s] = n;
  return v;
};
var cpw = function(v, t, s, e) {
  if (u8.prototype.copyWithin)
    return u8.prototype.copyWithin.call(v, t, s, e);
  if (s == null || s < 0)
    s = 0;
  if (e == null || e > v.length)
    e = v.length;
  while (s < e) {
    v[t++] = v[s++];
  }
};
var ec = [
  "invalid zstd data",
  "window size too large (>2046MB)",
  "invalid block type",
  "FSE accuracy too high",
  "match distance too far back",
  "unexpected EOF"
];
var err = function(ind, msg, nt) {
  var e = new Error(msg || ec[ind]);
  e.code = ind;
  if (Error.captureStackTrace)
    Error.captureStackTrace(e, err);
  if (!nt)
    throw e;
  return e;
};
var rb = function(d, b, n) {
  var i = 0, o = 0;
  for (; i < n; ++i)
    o |= d[b++] << (i << 3);
  return o;
};
var b4 = function(d, b) {
  return (d[b] | d[b + 1] << 8 | d[b + 2] << 16 | d[b + 3] << 24) >>> 0;
};
var rzfh = function(dat, w) {
  var n3 = dat[0] | dat[1] << 8 | dat[2] << 16;
  if (n3 == 3126568 && dat[3] == 253) {
    var flg = dat[4];
    var ss = flg >> 5 & 1, cc = flg >> 2 & 1, df = flg & 3, fcf = flg >> 6;
    if (flg & 8)
      err(0);
    var bt = 6 - ss;
    var db = df == 3 ? 4 : df;
    var di = rb(dat, bt, db);
    bt += db;
    var fsb = fcf ? 1 << fcf : ss;
    var fss = rb(dat, bt, fsb) + (fcf == 1 && 256);
    var ws = fss;
    if (!ss) {
      var wb = 1 << 10 + (dat[5] >> 3);
      ws = wb + (wb >> 3) * (dat[5] & 7);
    }
    if (ws > 2145386496)
      err(1);
    var buf = new u8((w == 1 ? fss || ws : w ? 0 : ws) + 12);
    buf[0] = 1, buf[4] = 4, buf[8] = 8;
    return {
      b: bt + fsb,
      y: 0,
      l: 0,
      d: di,
      w: w && w != 1 ? w : buf.subarray(12),
      e: ws,
      o: new i32(buf.buffer, 0, 3),
      u: fss,
      c: cc,
      m: Math.min(131072, ws)
    };
  } else if ((n3 >> 4 | dat[3] << 20) == 25481893) {
    return b4(dat, 4) + 8;
  }
  err(0);
};
var msb = function(val) {
  var bits = 0;
  for (; 1 << bits <= val; ++bits)
    ;
  return bits - 1;
};
var rfse = function(dat, bt, mal) {
  var tpos = (bt << 3) + 4;
  var al = (dat[bt] & 15) + 5;
  if (al > mal)
    err(3);
  var sz = 1 << al;
  var probs = sz, sym = -1, re = -1, i = -1, ht = sz;
  var buf = new ab(512 + (sz << 2));
  var freq = new i16(buf, 0, 256);
  var dstate = new u16(buf, 0, 256);
  var nstate = new u16(buf, 512, sz);
  var bb1 = 512 + (sz << 1);
  var syms = new u8(buf, bb1, sz);
  var nbits = new u8(buf, bb1 + sz);
  while (sym < 255 && probs > 0) {
    var bits = msb(probs + 1);
    var cbt = tpos >> 3;
    var msk = (1 << bits + 1) - 1;
    var val = (dat[cbt] | dat[cbt + 1] << 8 | dat[cbt + 2] << 16) >> (tpos & 7) & msk;
    var msk1fb = (1 << bits) - 1;
    var msv = msk - probs - 1;
    var sval = val & msk1fb;
    if (sval < msv)
      tpos += bits, val = sval;
    else {
      tpos += bits + 1;
      if (val > msk1fb)
        val -= msv;
    }
    freq[++sym] = --val;
    if (val == -1) {
      probs += val;
      syms[--ht] = sym;
    } else
      probs -= val;
    if (!val) {
      do {
        var rbt = tpos >> 3;
        re = (dat[rbt] | dat[rbt + 1] << 8) >> (tpos & 7) & 3;
        tpos += 2;
        sym += re;
      } while (re == 3);
    }
  }
  if (sym > 255 || probs)
    err(0);
  var sympos = 0;
  var sstep = (sz >> 1) + (sz >> 3) + 3;
  var smask = sz - 1;
  for (var s = 0; s <= sym; ++s) {
    var sf = freq[s];
    if (sf < 1) {
      dstate[s] = -sf;
      continue;
    }
    for (i = 0; i < sf; ++i) {
      syms[sympos] = s;
      do {
        sympos = sympos + sstep & smask;
      } while (sympos >= ht);
    }
  }
  if (sympos)
    err(0);
  for (i = 0; i < sz; ++i) {
    var ns = dstate[syms[i]]++;
    var nb = nbits[i] = al - msb(ns);
    nstate[i] = (ns << nb) - sz;
  }
  return [tpos + 7 >> 3, {
    b: al,
    s: syms,
    n: nbits,
    t: nstate
  }];
};
var rhu = function(dat, bt) {
  var i = 0, wc = -1;
  var buf = new u8(292), hb = dat[bt];
  var hw = buf.subarray(0, 256);
  var rc = buf.subarray(256, 268);
  var ri = new u16(buf.buffer, 268);
  if (hb < 128) {
    var _a = rfse(dat, bt + 1, 6), ebt = _a[0], fdt = _a[1];
    bt += hb;
    var epos = ebt << 3;
    var lb = dat[bt];
    if (!lb)
      err(0);
    var st1 = 0, st2 = 0, btr1 = fdt.b, btr2 = btr1;
    var fpos = (++bt << 3) - 8 + msb(lb);
    for (; ; ) {
      fpos -= btr1;
      if (fpos < epos)
        break;
      var cbt = fpos >> 3;
      st1 += (dat[cbt] | dat[cbt + 1] << 8) >> (fpos & 7) & (1 << btr1) - 1;
      hw[++wc] = fdt.s[st1];
      fpos -= btr2;
      if (fpos < epos)
        break;
      cbt = fpos >> 3;
      st2 += (dat[cbt] | dat[cbt + 1] << 8) >> (fpos & 7) & (1 << btr2) - 1;
      hw[++wc] = fdt.s[st2];
      btr1 = fdt.n[st1];
      st1 = fdt.t[st1];
      btr2 = fdt.n[st2];
      st2 = fdt.t[st2];
    }
    if (++wc > 255)
      err(0);
  } else {
    wc = hb - 127;
    for (; i < wc; i += 2) {
      var byte = dat[++bt];
      hw[i] = byte >> 4;
      hw[i + 1] = byte & 15;
    }
    ++bt;
  }
  var wes = 0;
  for (i = 0; i < wc; ++i) {
    var wt = hw[i];
    if (wt > 11)
      err(0);
    wes += wt && 1 << wt - 1;
  }
  var mb = msb(wes) + 1;
  var ts = 1 << mb;
  var rem = ts - wes;
  if (rem & rem - 1)
    err(0);
  hw[wc++] = msb(rem) + 1;
  for (i = 0; i < wc; ++i) {
    var wt = hw[i];
    ++rc[hw[i] = wt && mb + 1 - wt];
  }
  var hbuf = new u8(ts << 1);
  var syms = hbuf.subarray(0, ts), nb = hbuf.subarray(ts);
  ri[mb] = 0;
  for (i = mb; i > 0; --i) {
    var pv = ri[i];
    fill(nb, i, pv, ri[i - 1] = pv + rc[i] * (1 << mb - i));
  }
  if (ri[0] != ts)
    err(0);
  for (i = 0; i < wc; ++i) {
    var bits = hw[i];
    if (bits) {
      var code = ri[bits];
      fill(syms, i, code, ri[bits] = code + (1 << mb - bits));
    }
  }
  return [bt, {
    n: nb,
    b: mb,
    s: syms
  }];
};
var dllt = rfse(/* @__PURE__ */ new u8([
  81,
  16,
  99,
  140,
  49,
  198,
  24,
  99,
  12,
  33,
  196,
  24,
  99,
  102,
  102,
  134,
  70,
  146,
  4
]), 0, 6)[1];
var dmlt = rfse(/* @__PURE__ */ new u8([
  33,
  20,
  196,
  24,
  99,
  140,
  33,
  132,
  16,
  66,
  8,
  33,
  132,
  16,
  66,
  8,
  33,
  68,
  68,
  68,
  68,
  68,
  68,
  68,
  68,
  36,
  9
]), 0, 6)[1];
var doct = rfse(/* @__PURE__ */ new u8([
  32,
  132,
  16,
  66,
  102,
  70,
  68,
  68,
  68,
  68,
  36,
  73,
  2
]), 0, 5)[1];
var b2bl = function(b, s) {
  var len = b.length, bl = new i32(len);
  for (var i = 0; i < len; ++i) {
    bl[i] = s;
    s += 1 << b[i];
  }
  return bl;
};
var llb = /* @__PURE__ */ new u8((/* @__PURE__ */ new i32([
  0,
  0,
  0,
  0,
  16843009,
  50528770,
  134678020,
  202050057,
  269422093
])).buffer, 0, 36);
var llbl = /* @__PURE__ */ b2bl(llb, 0);
var mlb = /* @__PURE__ */ new u8((/* @__PURE__ */ new i32([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  16843009,
  50528770,
  117769220,
  185207048,
  252579084,
  16
])).buffer, 0, 53);
var mlbl = /* @__PURE__ */ b2bl(mlb, 3);
var dhu = function(dat, out, hu) {
  var len = dat.length, ss = out.length, lb = dat[len - 1], msk = (1 << hu.b) - 1, eb = -hu.b;
  if (!lb)
    err(0);
  var st = 0, btr = hu.b, pos = (len << 3) - 8 + msb(lb) - btr, i = -1;
  for (; pos > eb && i < ss; ) {
    var cbt = pos >> 3;
    var val = (dat[cbt] | dat[cbt + 1] << 8 | dat[cbt + 2] << 16) >> (pos & 7);
    st = (st << btr | val) & msk;
    out[++i] = hu.s[st];
    pos -= btr = hu.n[st];
  }
  if (pos != eb || i + 1 != ss)
    err(0);
};
var dhu4 = function(dat, out, hu) {
  var bt = 6;
  var ss = out.length, sz1 = ss + 3 >> 2, sz2 = sz1 << 1, sz3 = sz1 + sz2;
  dhu(dat.subarray(bt, bt += dat[0] | dat[1] << 8), out.subarray(0, sz1), hu);
  dhu(dat.subarray(bt, bt += dat[2] | dat[3] << 8), out.subarray(sz1, sz2), hu);
  dhu(dat.subarray(bt, bt += dat[4] | dat[5] << 8), out.subarray(sz2, sz3), hu);
  dhu(dat.subarray(bt), out.subarray(sz3), hu);
};
var rzb = function(dat, st, out) {
  var _a;
  var bt = st.b;
  var b0 = dat[bt], btype = b0 >> 1 & 3;
  st.l = b0 & 1;
  var sz = b0 >> 3 | dat[bt + 1] << 5 | dat[bt + 2] << 13;
  var ebt = (bt += 3) + sz;
  if (btype == 1) {
    if (bt >= dat.length)
      return;
    st.b = bt + 1;
    if (out) {
      fill(out, dat[bt], st.y, st.y += sz);
      return out;
    }
    return fill(new u8(sz), dat[bt]);
  }
  if (ebt > dat.length)
    return;
  if (btype == 0) {
    st.b = ebt;
    if (out) {
      out.set(dat.subarray(bt, ebt), st.y);
      st.y += sz;
      return out;
    }
    return slc(dat, bt, ebt);
  }
  if (btype == 2) {
    var b3 = dat[bt], lbt = b3 & 3, sf = b3 >> 2 & 3;
    var lss = b3 >> 4, lcs = 0, s4 = 0;
    if (lbt < 2) {
      if (sf & 1)
        lss |= dat[++bt] << 4 | (sf & 2 && dat[++bt] << 12);
      else
        lss = b3 >> 3;
    } else {
      s4 = sf;
      if (sf < 2)
        lss |= (dat[++bt] & 63) << 4, lcs = dat[bt] >> 6 | dat[++bt] << 2;
      else if (sf == 2)
        lss |= dat[++bt] << 4 | (dat[++bt] & 3) << 12, lcs = dat[bt] >> 2 | dat[++bt] << 6;
      else
        lss |= dat[++bt] << 4 | (dat[++bt] & 63) << 12, lcs = dat[bt] >> 6 | dat[++bt] << 2 | dat[++bt] << 10;
    }
    ++bt;
    var buf = out ? out.subarray(st.y, st.y + st.m) : new u8(st.m);
    var spl = buf.length - lss;
    if (lbt == 0)
      buf.set(dat.subarray(bt, bt += lss), spl);
    else if (lbt == 1)
      fill(buf, dat[bt++], spl);
    else {
      var hu = st.h;
      if (lbt == 2) {
        var hud = rhu(dat, bt);
        lcs += bt - (bt = hud[0]);
        st.h = hu = hud[1];
      } else if (!hu)
        err(0);
      (s4 ? dhu4 : dhu)(dat.subarray(bt, bt += lcs), buf.subarray(spl), hu);
    }
    var ns = dat[bt++];
    if (ns) {
      if (ns == 255)
        ns = (dat[bt++] | dat[bt++] << 8) + 32512;
      else if (ns > 127)
        ns = ns - 128 << 8 | dat[bt++];
      var scm = dat[bt++];
      if (scm & 3)
        err(0);
      var dts = [dmlt, doct, dllt];
      for (var i = 2; i > -1; --i) {
        var md = scm >> (i << 1) + 2 & 3;
        if (md == 1) {
          var rbuf = new u8([0, 0, dat[bt++]]);
          dts[i] = {
            s: rbuf.subarray(2, 3),
            n: rbuf.subarray(0, 1),
            t: new u16(rbuf.buffer, 0, 1),
            b: 0
          };
        } else if (md == 2) {
          _a = rfse(dat, bt, 9 - (i & 1)), bt = _a[0], dts[i] = _a[1];
        } else if (md == 3) {
          if (!st.t)
            err(0);
          dts[i] = st.t[i];
        }
      }
      var _b = st.t = dts, mlt = _b[0], oct = _b[1], llt = _b[2];
      var lb = dat[ebt - 1];
      if (!lb)
        err(0);
      var spos = (ebt << 3) - 8 + msb(lb) - llt.b, cbt = spos >> 3, oubt = 0;
      var lst = (dat[cbt] | dat[cbt + 1] << 8) >> (spos & 7) & (1 << llt.b) - 1;
      cbt = (spos -= oct.b) >> 3;
      var ost = (dat[cbt] | dat[cbt + 1] << 8) >> (spos & 7) & (1 << oct.b) - 1;
      cbt = (spos -= mlt.b) >> 3;
      var mst = (dat[cbt] | dat[cbt + 1] << 8) >> (spos & 7) & (1 << mlt.b) - 1;
      for (++ns; --ns; ) {
        var llc = llt.s[lst];
        var lbtr = llt.n[lst];
        var mlc = mlt.s[mst];
        var mbtr = mlt.n[mst];
        var ofc = oct.s[ost];
        var obtr = oct.n[ost];
        cbt = (spos -= ofc) >> 3;
        var ofp = 1 << ofc;
        var off = ofp + ((dat[cbt] | dat[cbt + 1] << 8 | dat[cbt + 2] << 16 | dat[cbt + 3] << 24) >>> (spos & 7) & ofp - 1);
        cbt = (spos -= mlb[mlc]) >> 3;
        var ml = mlbl[mlc] + ((dat[cbt] | dat[cbt + 1] << 8 | dat[cbt + 2] << 16) >> (spos & 7) & (1 << mlb[mlc]) - 1);
        cbt = (spos -= llb[llc]) >> 3;
        var ll = llbl[llc] + ((dat[cbt] | dat[cbt + 1] << 8 | dat[cbt + 2] << 16) >> (spos & 7) & (1 << llb[llc]) - 1);
        cbt = (spos -= lbtr) >> 3;
        lst = llt.t[lst] + ((dat[cbt] | dat[cbt + 1] << 8) >> (spos & 7) & (1 << lbtr) - 1);
        cbt = (spos -= mbtr) >> 3;
        mst = mlt.t[mst] + ((dat[cbt] | dat[cbt + 1] << 8) >> (spos & 7) & (1 << mbtr) - 1);
        cbt = (spos -= obtr) >> 3;
        ost = oct.t[ost] + ((dat[cbt] | dat[cbt + 1] << 8) >> (spos & 7) & (1 << obtr) - 1);
        if (off > 3) {
          st.o[2] = st.o[1];
          st.o[1] = st.o[0];
          st.o[0] = off -= 3;
        } else {
          var idx = off - (ll != 0);
          if (idx) {
            off = idx == 3 ? st.o[0] - 1 : st.o[idx];
            if (idx > 1)
              st.o[2] = st.o[1];
            st.o[1] = st.o[0];
            st.o[0] = off;
          } else
            off = st.o[0];
        }
        for (var i = 0; i < ll; ++i) {
          buf[oubt + i] = buf[spl + i];
        }
        oubt += ll, spl += ll;
        var stin = oubt - off;
        if (stin < 0) {
          var len = -stin;
          var bs = st.e + stin;
          if (len > ml)
            len = ml;
          for (var i = 0; i < len; ++i) {
            buf[oubt + i] = st.w[bs + i];
          }
          oubt += len, ml -= len, stin = 0;
        }
        for (var i = 0; i < ml; ++i) {
          buf[oubt + i] = buf[stin + i];
        }
        oubt += ml;
      }
      if (oubt != spl) {
        while (spl < buf.length) {
          buf[oubt++] = buf[spl++];
        }
      } else
        oubt = buf.length;
      if (out)
        st.y += oubt;
      else
        buf = slc(buf, 0, oubt);
    } else if (out) {
      st.y += lss;
      if (spl) {
        for (var i = 0; i < lss; ++i) {
          buf[i] = buf[spl + i];
        }
      }
    } else if (spl)
      buf = slc(buf, spl);
    st.b = ebt;
    return buf;
  }
  err(2);
};
var cct = function(bufs, ol) {
  if (bufs.length == 1)
    return bufs[0];
  var buf = new u8(ol);
  for (var i = 0, b = 0; i < bufs.length; ++i) {
    var chk = bufs[i];
    buf.set(chk, b);
    b += chk.length;
  }
  return buf;
};
function decompress(dat, buf) {
  var bufs = [], nb = +!buf;
  var bt = 0, ol = 0;
  for (; dat.length; ) {
    var st = rzfh(dat, nb || buf);
    if (typeof st == "object") {
      if (nb) {
        buf = null;
        if (st.w.length == st.u) {
          bufs.push(buf = st.w);
          ol += st.u;
        }
      } else {
        bufs.push(buf);
        st.e = 0;
      }
      for (; !st.l; ) {
        var blk = rzb(dat, st, buf);
        if (!blk)
          err(5);
        if (buf)
          st.e = st.y;
        else {
          bufs.push(blk);
          ol += blk.length;
          cpw(st.w, 0, blk.length);
          st.w.set(blk, st.w.length - blk.length);
        }
      }
      bt = st.b + st.c * 4;
    } else
      bt = st;
    dat = dat.subarray(bt);
  }
  return cct(bufs, ol);
}

// server/agent-usage.ts
var count = (v) => typeof v === "number" && Number.isSafeInteger(v) && v > 0 ? v : 0;
var kimiTokens = (u) => count(u.inputOther ?? u.input_other) + count(u.output) + count(u.inputCacheCreation ?? u.input_cache_creation);
var dshTokens = (u) => count(u.inputTokens) + count(u.outputTokens) + count(u.cacheWriteTokens);
function json(line) {
  try {
    const v = JSON.parse(line);
    return v && typeof v === "object" && !Array.isArray(v) ? v : null;
  } catch {
    return null;
  }
}
function* zstdFrames(bytes) {
  let offset = 0;
  while (offset + 4 <= bytes.length) {
    const start = offset, magic = bytes.readUInt32LE(offset);
    offset += 4;
    if (magic >>> 4 === 407710288 >>> 4) {
      if (offset + 4 > bytes.length) return;
      offset += 4 + bytes.readUInt32LE(offset);
      if (offset > bytes.length) return;
      continue;
    }
    if (magic !== 4247762216) throw new Error("Invalid Zstandard frame");
    if (offset >= bytes.length) return;
    const descriptor = bytes[offset++], single = Boolean(descriptor & 32), flag = descriptor >>> 6;
    if (descriptor & 8) throw new Error("Reserved Zstandard header");
    const dictSize = [0, 1, 2, 4][descriptor & 3];
    offset += (single ? 0 : 1) + dictSize + (flag ? [0, 2, 4, 8][flag] : single ? 1 : 0);
    let last = false;
    while (!last) {
      if (offset + 3 > bytes.length) return;
      const block = bytes.readUIntLE(offset, 3), type = block >>> 1 & 3;
      if (type === 3) throw new Error("Reserved Zstandard block");
      offset += 3 + (type === 1 ? 1 : block >>> 3);
      if (offset > bytes.length) return;
      last = Boolean(block & 1);
    }
    if (descriptor & 4) offset += 4;
    if (offset > bytes.length) return;
    yield bytes.subarray(start, offset);
  }
}
function readAgentLines(file) {
  const rows = [], decoder = new StringDecoder("utf8");
  let pending = "";
  const consume = (chunk) => {
    pending += decoder.write(chunk);
    let end;
    while ((end = pending.indexOf("\n")) >= 0) {
      const line = pending.slice(0, end);
      pending = pending.slice(end + 1);
      if (!/usage|StatusUpdate|"session"|session\/end-seed|llm\/retry-started|"forked"/.test(line)) continue;
      const obj = json(line);
      if (!obj) continue;
      const type = obj.type || obj.message?.type;
      if (["usage.record", "StatusUpdate", "agent.status.updated", "forked", "session", "session/end-seed", "llm/retry-started", "assistant/message", "assistant/attempt", "llm/stream"].includes(type)) {
        if (type === "assistant/message" || type === "assistant/attempt") {
          const data = obj.data || {};
          obj.data = {
            turn: data.turn,
            step: data.step,
            usage: data.usage,
            stream: (Array.isArray(data.stream) ? data.stream : []).filter((v) => v.type === "chunk" && v.chunk?.type === "usage")
          };
        }
        if (type === "StatusUpdate") obj.message = { type, payload: { token_usage: obj.message?.payload?.token_usage, message_id: obj.message?.payload?.message_id } };
        rows.push(JSON.stringify(obj));
      }
    }
  };
  if (file.endsWith(".zstd")) {
    const native = zlib.zstdDecompressSync;
    for (const frame of zstdFrames(fs.readFileSync(file))) consume(native ? native(frame) : Buffer.from(decompress(frame)));
  } else {
    const fd = fs.openSync(file, "r"), buffer = Buffer.alloc(256 * 1024);
    try {
      let n;
      while ((n = fs.readSync(fd, buffer)) > 0) consume(buffer.subarray(0, n));
    } finally {
      fs.closeSync(fd);
    }
  }
  return rows;
}
function parseKimiFile(lines, identity = "kimi-session") {
  const events = /* @__PURE__ */ new Map();
  let fork = -1, cumulative = 0;
  for (let i = 0; i < lines.length; i++) if (json(lines[i])?.type === "forked") fork = i;
  for (let i = fork + 1; i < lines.length; i++) {
    const row = json(lines[i]);
    if (!row) continue;
    if (row.type === "usage.record" && row.usage && typeof row.usage === "object") {
      const u = row.usage, tokens = kimiTokens(u), time = row.time;
      const key = typeof time === "number" || typeof time === "string" ? `kimi:call:${JSON.stringify([time, row.model, u.inputOther, u.output, u.inputCacheRead, u.inputCacheCreation])}` : `kimi:${identity}:${i}`;
      events.set(key, Math.max(events.get(key) || 0, tokens));
    } else {
      const message = row.message || row, data = message.payload || message;
      if (message.type === "StatusUpdate" && data.token_usage) {
        const key = data.message_id ? `kimi:message:${data.message_id}` : `kimi:${identity}:${row.timestamp ?? i}`;
        events.set(key, Math.max(events.get(key) || 0, kimiTokens(data.token_usage)));
      } else if (row.type === "agent.status.updated" && row.usage?.total) {
        cumulative = Math.max(cumulative, kimiTokens(row.usage.total));
      }
    }
  }
  if (!events.size && cumulative) events.set(`kimi:${identity}:total`, cumulative);
  return { cwd: null, tokens: [...events.values()].reduce((a, b) => a + b, 0), events: [...events].map(([key, tokens]) => ({ key, tokens })) };
}
function parseDeepSeekFile(lines) {
  const rows = lines.map(json).filter((x) => Boolean(x)), header = rows.find((x) => x.type === "session");
  if (!header || typeof header.id !== "string" || !Number.isInteger(header.version) || header.version < 0 || header.version > 4) throw new Error("Unsupported DeepSeek session version");
  let seed = count(header.seedLength), marker = -1;
  if (header.isSeeded) {
    for (let i = 0; i < rows.length; i++) if (rows[i].type === "session/end-seed" && rows[i].data?.inherited === true) marker = i;
  }
  if (header.isSeeded && marker < 0) return { cwd: header.cwd || null, tokens: 0, events: [] };
  const events = /* @__PURE__ */ new Map(), slots = /* @__PURE__ */ new Map();
  let attempt = 0;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i], data = row.data || {};
    if (i <= marker || row.type === "session" || seed && typeof row.seq === "number" && row.seq < seed) continue;
    const slot = `${data.turn}:${data.step}`;
    if (row.type === "llm/retry-started") {
      slots.delete(slot);
      attempt++;
      continue;
    }
    if (row.type !== "assistant/message" && row.type !== "assistant/attempt" && row.type !== "llm/stream") continue;
    let usage = data.usage;
    if (!usage && Array.isArray(data.stream)) {
      for (const v of data.stream) if (v.type === "chunk" && v.chunk?.type === "usage") usage = v.chunk.usage;
    }
    if (row.type === "llm/stream") usage = data.chunk?.type === "usage" ? data.chunk.usage : void 0;
    if (!usage || typeof usage !== "object") continue;
    const key = slots.get(slot) || `deepseek:${header.id}:${data.turn}:${data.step}:${attempt}`;
    slots.set(slot, key);
    events.set(key, dshTokens(usage));
  }
  const result = [...events].map(([key, tokens]) => ({ key, tokens }));
  return { cwd: typeof header.cwd === "string" ? header.cwd : null, events: result, tokens: result.reduce((n, e) => n + e.tokens, 0) };
}

// server/usage.ts
function createUsageScanner(options = { env: process.env }) {
  const HOME = options.home || os.homedir();
  let warnings = [];
  function hashId(basis) {
    let h = 2166136261;
    for (let i = 0; i < basis.length; i++) {
      h ^= basis.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return "p" + (h >>> 0).toString(36);
  }
  function baseName(p) {
    if (!p) return null;
    const parts = String(p).split(/[\\/]/).filter(Boolean);
    return parts.length ? parts[parts.length - 1] : null;
  }
  function decodeClaudeDir(dir) {
    const parts = dir.replace(/^-/, "").split("-").filter(Boolean);
    return parts.length ? parts[parts.length - 1] : dir;
  }
  const scanCache = /* @__PURE__ */ new Map();
  function safeReadLines(file, maxBytes) {
    try {
      const stat = fs2.statSync(file);
      if (stat.size > maxBytes) {
        const fd = fs2.openSync(file, "r");
        const buf = Buffer.alloc(maxBytes);
        fs2.readSync(fd, buf, 0, maxBytes, stat.size - maxBytes);
        fs2.closeSync(fd);
        return buf.toString("utf8").split("\n");
      }
      return fs2.readFileSync(file, "utf8").split("\n");
    } catch {
      return [];
    }
  }
  function scanFileCached(file, seen, parse, full = false) {
    let stat;
    try {
      stat = fs2.statSync(file);
    } catch {
      return null;
    }
    seen.add(file);
    const cached = scanCache.get(file);
    if (cached && cached.mtimeMs === stat.mtimeMs && cached.size === stat.size) return cached;
    const maxBytes = 8 * 1024 * 1024;
    const parsed = parse(full ? readAgentLines(file) : safeReadLines(file, maxBytes));
    const entry = { mtimeMs: stat.mtimeMs, size: stat.size, tokens: parsed.tokens, cwd: parsed.cwd, events: parsed.events };
    scanCache.set(file, entry);
    return entry;
  }
  function pruneScanCache(seen) {
    for (const key of scanCache.keys()) {
      if (!seen.has(key)) scanCache.delete(key);
    }
  }
  function addProject(map, basis, name, provider, tokens) {
    const id = hashId(basis);
    if (!map[id]) map[id] = { id, name, legacyId: name.toLowerCase(), provider, providers: {}, tokens: 0 };
    const p = map[id];
    p.tokens += tokens;
    p.providers[provider] = (p.providers[provider] || 0) + tokens;
    let best = null;
    let bestT = -1;
    for (const k in p.providers) {
      if (p.providers[k] > bestT) {
        bestT = p.providers[k];
        best = k;
      }
    }
    p.provider = Object.keys(p.providers).length > 1 ? "mixed" : best || provider;
  }
  function parseClaudeFile(lines) {
    let tokens = 0;
    let cwd = null;
    for (const line of lines) {
      if (!line || line.charCodeAt(0) !== 123) continue;
      let obj;
      try {
        obj = JSON.parse(line);
      } catch {
        continue;
      }
      if (!cwd && obj.cwd) cwd = String(obj.cwd);
      const u = obj.message && obj.message.usage;
      if (u) {
        tokens += (u.input_tokens || 0) + (u.output_tokens || 0) + (u.cache_creation_input_tokens || 0);
      }
    }
    return { tokens, cwd };
  }
  function scanClaude(projects, seen) {
    const root = path.join(HOME, ".claude", "projects");
    let dirs;
    try {
      dirs = fs2.readdirSync(root, { withFileTypes: true });
    } catch {
      return;
    }
    for (const d of dirs) {
      if (!d.isDirectory()) continue;
      const dirPath = path.join(root, d.name);
      let files;
      try {
        files = fs2.readdirSync(dirPath).filter((f) => f.endsWith(".jsonl"));
      } catch {
        continue;
      }
      let tokens = 0;
      let cwdPath = null;
      for (const f of files) {
        const scan = scanFileCached(path.join(dirPath, f), seen, parseClaudeFile);
        if (!scan) continue;
        tokens += scan.tokens;
        if (!cwdPath && scan.cwd) cwdPath = scan.cwd;
      }
      if (tokens <= 0) continue;
      const basis = cwdPath || "claude:" + d.name;
      const name = cwdPath && baseName(cwdPath) || decodeClaudeDir(d.name);
      addProject(projects, basis, name, "claude", tokens);
    }
  }
  function walkJsonl(dir, out, depth) {
    if (depth > 6) return;
    let entries2;
    try {
      entries2 = fs2.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries2) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walkJsonl(full, out, depth + 1);
      else if (e.name.endsWith(".jsonl")) out.push(full);
    }
  }
  function parseCodexFile(lines) {
    let cwd = null;
    let lastTotal = 0;
    for (const line of lines) {
      if (!line || line.charCodeAt(0) !== 123) continue;
      let obj;
      try {
        obj = JSON.parse(line);
      } catch {
        continue;
      }
      const payload = obj.payload || obj;
      if (!cwd && payload.cwd) cwd = String(payload.cwd);
      const info = payload.info || payload;
      const tu = info.total_token_usage || obj.total_token_usage || null;
      if (tu) {
        const fresh = Math.max(0, (tu.input_tokens || 0) - (tu.cached_input_tokens || 0)) + (tu.output_tokens || 0) + (tu.reasoning_output_tokens || 0);
        if (fresh > lastTotal) lastTotal = fresh;
      }
    }
    return { tokens: lastTotal, cwd };
  }
  function scanCodex(projects, seen) {
    const root = path.join(options.env?.CODEX_HOME || path.join(HOME, ".codex"), "sessions");
    const files = [];
    walkJsonl(root, files, 0);
    for (const file of files) {
      const scan = scanFileCached(file, seen, parseCodexFile);
      if (!scan || scan.tokens <= 0) continue;
      const basis = scan.cwd || "codex-session";
      const name = scan.cwd && baseName(scan.cwd) || "codex-session";
      addProject(projects, basis, name, "codex", scan.tokens);
    }
  }
  function scanUsage() {
    warnings = [];
    const map = {};
    const seen = /* @__PURE__ */ new Set();
    try {
      scanClaude(map, seen);
    } catch {
    }
    try {
      scanCodex(map, seen);
    } catch {
    }
    scanAdditionalAgents(map, seen);
    pruneScanCache(seen);
    return Object.values(map).map((p) => ({ id: p.id, name: p.name, legacyId: p.legacyId, provider: p.provider, tokens: p.tokens })).filter((p) => p.tokens > 0).sort((a, b) => b.tokens - a.tokens);
  }
  function scanAdditionalAgents(map, seen) {
    scanNewAgents(map, seen);
  }
  function entries(dir) {
    try {
      return fs2.readdirSync(dir, { withFileTypes: true });
    } catch {
      return [];
    }
  }
  function readObject(file) {
    try {
      return JSON.parse(fs2.readFileSync(file, "utf8"));
    } catch {
      return {};
    }
  }
  function scanNewAgents(map, seen) {
    const credits = /* @__PURE__ */ new Map();
    const collect = (scan, basis, provider) => {
      for (const event of scan.events || []) {
        const previous = credits.get(event.key);
        if (!previous || event.tokens > previous.tokens) credits.set(event.key, { basis, provider, tokens: event.tokens });
      }
    };
    const scanAgent = (file, provider, parse) => {
      try {
        return scanFileCached(file, seen, parse, true);
      } catch {
        warnings.push(`${provider === "kimi" ? "Kimi Code" : "DeepSeek Harness"}\uFF1A\u4E00\u4EFD\u8BB0\u5F55\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\uFF0C\u5DF2\u4FDD\u7559\u4E0A\u6B21\u6709\u6548\u7EDF\u8BA1`);
        return scanCache.get(file) || null;
      }
    };
    const kimiRoots = [...new Set([
      options.env?.KIMI_CODE_HOME || path.join(HOME, ".kimi-code"),
      options.env?.KIMI_SHARE_DIR || path.join(HOME, ".kimi")
    ].map((p) => path.resolve(p)))];
    for (const root of kimiRoots) {
      const index = /* @__PURE__ */ new Map();
      try {
        for (const line of fs2.readFileSync(path.join(root, "session_index.jsonl"), "utf8").split("\n")) {
          try {
            const v = JSON.parse(line);
            if (typeof v.sessionDir === "string" && typeof v.workDir === "string") index.set(path.resolve(v.sessionDir), v.workDir);
          } catch {
          }
        }
      } catch {
      }
      const old = readObject(path.join(root, "kimi.json")).work_dirs;
      const legacy = /* @__PURE__ */ new Map();
      if (Array.isArray(old)) {
        for (const v of old) if (typeof v.path === "string") legacy.set(createHash("md5").update(v.path).digest("hex"), v.path);
      }
      const sessions = path.join(root, "sessions");
      for (const bucket of entries(sessions).filter((v) => v.isDirectory())) {
        const dir = path.join(sessions, bucket.name);
        for (const entry of entries(dir).filter((v) => v.isDirectory())) {
          const session = path.join(dir, entry.name), metadata = readObject(path.join(session, "state.json"));
          const cwd = index.get(session) || (typeof metadata.cwd === "string" ? metadata.cwd : null) || legacy.get(bucket.name);
          const basis = cwd || `kimi:${bucket.name}`;
          const wire = path.join(session, "wire.jsonl");
          if (fs2.existsSync(wire)) {
            const scan = scanAgent(wire, "kimi", (lines) => parseKimiFile(lines, `${entry.name}:main`));
            if (scan) collect(scan, basis, "kimi");
          }
          for (const agent of entries(path.join(session, "agents")).filter((v) => v.isDirectory())) {
            const file = path.join(session, "agents", agent.name, "wire.jsonl");
            if (!fs2.existsSync(file)) continue;
            const scan = scanAgent(file, "kimi", (lines) => parseKimiFile(lines, `${entry.name}:${agent.name}`));
            if (scan) collect(scan, basis, "kimi");
          }
        }
      }
    }
    const dshRoot = options.env?.TOKEN_TOWN_DSH_SESSIONS || path.join(options.env?.DSH_HOME || path.join(HOME, ".dsh"), "sessions");
    for (const project of entries(dshRoot).filter((v) => v.isDirectory())) {
      const dir = path.join(dshRoot, project.name);
      for (const session of entries(dir).filter((v) => v.isDirectory())) {
        const directory = path.join(dir, session.name);
        const candidates = entries(directory).filter((v) => v.isFile() && /^session(?:\.v[1-9]\d*)?\.jsonl(?:\.zstd)?$/.test(v.name)).sort((a, b) => Number(b.name.match(/\.v(\d+)/)?.[1] || 0) - Number(a.name.match(/\.v(\d+)/)?.[1] || 0) || Number(b.name.endsWith(".zstd")) - Number(a.name.endsWith(".zstd")));
        for (const candidate of candidates) {
          const scan = scanAgent(path.join(directory, candidate.name), "deepseek", parseDeepSeekFile);
          if (scan) {
            collect(scan, scan.cwd || `deepseek:${project.name}`, "deepseek");
            break;
          }
        }
      }
    }
    for (const { basis, provider, tokens } of credits.values()) if (tokens > 0) addProject(map, basis, baseName(basis) || provider, provider, tokens);
    warnings = [...new Set(warnings)];
  }
  return { scan: scanUsage, get warnings() {
    return warnings;
  } };
}

// server/index.ts
import { fileURLToPath } from "node:url";
var __dirname = path2.dirname(fileURLToPath(import.meta.url));
var PORT = Number(process.env.PORT) || 4173;
var HOST = "127.0.0.1";
var PUBLIC_DIR = path2.join(__dirname, "..", "public");
var scanner = createUsageScanner();
var MIME = {
  ".mp3": "audio/mpeg",
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".glb": "model/gltf-binary",
  ".gltf": "model/gltf+json",
  ".webp": "image/webp"
};
function sendJson(res, code, obj) {
  res.writeHead(code, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(JSON.stringify(obj));
}
function serveStatic(req, res) {
  let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";
  const filePath = path2.join(PUBLIC_DIR, path2.normalize(urlPath));
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  fs3.readFile(filePath, (err2, data) => {
    if (err2) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
      return;
    }
    const ext = path2.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream", "Cache-Control": "no-store" });
    res.end(data);
  });
}
var server = http.createServer((req, res) => {
  if ((req.url || "").split("?")[0] === "/api/usage") {
    const t0 = Date.now();
    let projects = [];
    let error = null;
    try {
      projects = scanner.scan();
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
    }
    const totalTokens = projects.reduce((s, p) => s + p.tokens, 0);
    sendJson(res, 200, {
      ok: true,
      source: projects.length ? "local" : error ? "error" : "empty",
      error,
      warnings: scanner.warnings,
      scannedAt: (/* @__PURE__ */ new Date()).toISOString(),
      scanMs: Date.now() - t0,
      totals: { projects: projects.length, tokens: totalTokens },
      projects
    });
    return;
  }
  serveStatic(req, res);
});
server.listen(PORT, HOST, () => {
  console.log(`
  Token Town running at  http://${HOST}:${PORT}
`);
});
