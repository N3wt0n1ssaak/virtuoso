import { jsxs as en, jsx as y, Fragment as po } from "react/jsx-runtime";
import g from "react";
import { Cell as u, Signal as S, throttleTime as Ht, map as f, mapTo as V, debounceTime as be, filter as d, scan as te, withLatestFrom as k, delayWithMicrotask as Vt, onNext as tn, Action as Ft, useRealm as _t, useCellValue as H, Realm as fo, RealmContext as ho, useCellValues as go } from "@mdxeditor/gurx";
function ke(e, t) {
  const n = u(e, (o) => {
    o.link(t(o), n);
  });
  return n;
}
const ye = { lvl: 0 };
function nn(e, t, n, o = ye, s = ye) {
  return { k: e, l: o, lvl: n, r: s, v: t };
}
function I(e) {
  return e === ye;
}
function Re() {
  return ye;
}
function St(e, t) {
  if (I(e))
    return ye;
  const { k: n, l: o, r: s } = e;
  if (t === n) {
    if (I(o))
      return s;
    if (I(s))
      return o;
    {
      const [i, r] = on(o);
      return tt(L(e, { k: i, l: sn(o), v: r }));
    }
  } else
    return t < n ? tt(L(e, { l: St(o, t) })) : tt(L(e, { r: St(s, t) }));
}
function ce(e, t, n = "k") {
  if (I(e))
    return [-1 / 0, void 0];
  if (e[n] === t)
    return [e.k, e.v];
  if (e[n] < t) {
    const o = ce(e.r, t, n);
    return o[0] === -1 / 0 ? [e.k, e.v] : o;
  }
  return ce(e.l, t, n);
}
function F(e, t, n) {
  return I(e) ? nn(t, n, 1) : t === e.k ? L(e, { k: t, v: n }) : t < e.k ? qt(L(e, { l: F(e.l, t, n) })) : qt(L(e, { r: F(e.r, t, n) }));
}
function yt(e, t, n) {
  if (I(e))
    return [];
  const { k: o, v: s, l: i, r } = e;
  let l = [];
  return o > t && (l = l.concat(yt(i, t, n))), o >= t && o <= n && l.push({ k: o, v: s }), o <= n && (l = l.concat(yt(r, t, n))), l;
}
function vo(e, t, n, o) {
  if (I(e))
    return ye;
  let s = Re();
  for (const { k: i, v: r } of me(e))
    i > t && i <= n ? s = F(s, ...o(i, r)) : s = F(s, i, r);
  return s;
}
function bo(e, t, n) {
  let o = Re(), s = -1;
  for (const { start: i, end: r, value: l } of mo(e))
    i < t ? (o = F(o, i, l), s = l) : i > t + n ? o = F(o, i - n, l) : r >= t + n && s !== l && (o = F(o, t, l));
  return o;
}
function me(e) {
  return I(e) ? [] : [...me(e.l), { k: e.k, v: e.v }, ...me(e.r)];
}
function on(e) {
  return I(e.r) ? [e.k, e.v] : on(e.r);
}
function sn(e) {
  return I(e.r) ? e.l : tt(L(e, { r: sn(e.r) }));
}
function L(e, t) {
  return nn(t.k ?? e.k, t.v ?? e.v, t.lvl ?? e.lvl, t.l ?? e.l, t.r ?? e.r);
}
function kt(e) {
  return I(e) || e.lvl > e.r.lvl;
}
function qt(e) {
  return Tt(cn(e));
}
function tt(e) {
  const { l: t, r: n, lvl: o } = e;
  if (n.lvl >= o - 1 && t.lvl >= o - 1)
    return e;
  if (o > n.lvl + 1) {
    if (kt(t))
      return cn(L(e, { lvl: o - 1 }));
    if (!I(t) && !I(t.r))
      return L(t.r, {
        l: L(t, { r: t.r.l }),
        lvl: o,
        r: L(e, {
          l: t.r.r,
          lvl: o - 1
        })
      });
    throw new Error("Unexpected empty nodes");
  } else {
    if (kt(e))
      return Tt(L(e, { lvl: o - 1 }));
    if (!I(n) && !I(n.l)) {
      const s = n.l, i = kt(s) ? n.lvl - 1 : n.lvl;
      return L(s, {
        l: L(e, {
          lvl: o - 1,
          r: s.l
        }),
        lvl: s.lvl + 1,
        r: Tt(L(n, { l: s.r, lvl: i }))
      });
    } else
      throw new Error("Unexpected empty nodes");
  }
}
function mo(e) {
  return un(me(e));
}
function rn(e, t, n) {
  if (I(e))
    return [];
  const o = ce(e, t)[0];
  return un(yt(e, o, n));
}
function ln(e, t) {
  const n = e.length;
  if (n === 0)
    return [];
  let { index: o, value: s } = t(e[0]);
  const i = [];
  for (let r = 1; r < n; r++) {
    const { index: l, value: c } = t(e[r]);
    i.push({ end: l - 1, start: o, value: s }), o = l, s = c;
  }
  return i.push({ end: 1 / 0, start: o, value: s }), i;
}
function un(e) {
  return ln(e, ({ k: t, v: n }) => ({ index: t, value: n }));
}
function Tt(e) {
  const { r: t, lvl: n } = e;
  return !I(t) && !I(t.r) && t.lvl === n && t.r.lvl === n ? L(t, { l: L(e, { r: t.l }), lvl: n + 1 }) : e;
}
function cn(e) {
  const { l: t } = e;
  return !I(t) && t.lvl === e.lvl ? L(t, { r: L(e, { l: t.r }) }) : e;
}
function ko(e) {
  const { size: t, startIndex: n, endIndex: o } = e;
  return (s) => s.start === n && (s.end === o || s.end === 1 / 0) && s.value === t;
}
function Io(e, t) {
  let n = I(e) ? 0 : 1 / 0;
  for (const o of t) {
    const { size: s, startIndex: i, endIndex: r } = o;
    if (n = Math.min(n, i), I(e)) {
      e = F(e, 0, s);
      continue;
    }
    const l = rn(e, i - 1, r + 1);
    if (l.some(ko(o)))
      continue;
    let c = !1, a = !1;
    for (const { start: p, end: v, value: m } of l)
      c ? (r >= p || s === m) && (e = St(e, p)) : (a = m !== s, c = !0), v > r && r >= p && m !== s && (e = F(e, r + 1, m));
    a && (e = F(e, i, s));
  }
  return [e, n];
}
const pt = [Re(), 0];
function xo(e, [t, n]) {
  if (n.length > 0 && I(e) && t.length === 2) {
    const o = t[0].size, s = t[1].size;
    return [
      n.reduce((i, r) => F(F(i, r, o), r + 1, s), Re()),
      0
    ];
  } else
    return Io(e, t);
}
function ut(e, t, n, o = 0) {
  let s = e.length - 1;
  for (; o <= s; ) {
    const i = Math.floor((o + s) / 2), r = e[i], l = n(r, t);
    if (l === 0)
      return i;
    if (l === -1) {
      if (s - o < 2)
        return i - 1;
      s = i - 1;
    } else {
      if (s === o)
        return i;
      o = i + 1;
    }
  }
  throw new Error(`Failed binary finding record in array - ${e.join(",")}, searched for ${t}`);
}
function an(e, t, n) {
  return e[ut(e, t, n)];
}
function So(e, t, n, o) {
  const s = ut(e, t, o), i = ut(e, n, o, s);
  return e.slice(s, i + 1);
}
function Wt({ index: e }, t) {
  return t === e ? 0 : t < e ? -1 : 1;
}
function yo({ offset: e }, t) {
  return t === e ? 0 : t < e ? -1 : 1;
}
function To(e) {
  return { index: e.index, value: e };
}
function $o(e, t, n, o = 0) {
  return o > 0 && (t = Math.max(t, an(e, o, Wt).offset)), t = Math.max(0, t), ln(So(e, t, n, yo), To);
}
const Te = [[], 0, 0, 0];
function Eo(e, [t, n]) {
  let o = 0, s = 0, i = 0, r = 0;
  if (n !== 0) {
    r = ut(e, n - 1, Wt), i = e[r].offset;
    const c = ce(t, n - 1);
    o = c[0], s = c[1], e.length && e[r].height === ce(t, n)[1] && (r -= 1), e = e.slice(0, r + 1);
  } else
    e = [];
  for (const { start: l, value: c } of rn(t, n, 1 / 0)) {
    const a = (l - o) * s + i;
    e.push({ height: c, index: l, offset: a }), o = l, i = a, s = c;
  }
  return [e, s, i, o];
}
function pn(e, t) {
  if (t.length === 0)
    return [0, 0];
  const { offset: n, index: o, height: s } = an(t, e, Wt);
  return [s * (e - o) + n, s];
}
function $t(e, t) {
  return pn(e, t)[0];
}
function fn(e, t) {
  return Math.abs(e - t) < 1.01;
}
function wo() {
  return typeof navigator > "u" ? !1 : /Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints && navigator.maxTouchPoints > 1 || /iP(ad|od|hone)/i.test(navigator.userAgent) && /WebKit/i.test(navigator.userAgent);
}
function hn(e) {
  return !e;
}
function Lo(e) {
  return e === 1 ? 1 : 1 - Math.pow(2, -10 * e);
}
function gn(e = 1) {
  return (t, n) => {
    const o = n.signalInstance();
    return n.sub(t, (s) => {
      let i = e;
      function r() {
        i > 0 ? (i--, requestAnimationFrame(r)) : n.pub(o, s);
      }
      r();
    }), o;
  };
}
const dn = "up", It = "down", Ro = "none", Mo = {
  atBottom: !1,
  notAtBottomBecause: "NOT_SHOWING_LAST_ITEM",
  state: {
    offsetBottom: 0,
    scrollTop: 0,
    viewportHeight: 0,
    viewportWidth: 0,
    scrollHeight: 0
  }
}, Ao = 0, Co = 4;
function Gt(e) {
  return (t, n) => {
    const o = n.signalInstance();
    return n.sub(t, (s) => {
      e > 0 ? e-- : n.pub(o, s);
    }), o;
  };
}
u(!1);
const vn = u(!0);
S();
const ge = u(!1), Do = S((e) => {
  e.link(e.pipe(vn, Ht(50)), Do);
}), bn = u(Co), Oo = u(Ao, (e) => {
  e.link(
    e.pipe(
      e.combine(T, Oo),
      f(([t, n]) => t <= n)
    ),
    vn
  );
}), Ne = u(!1, (e) => {
  e.link(e.pipe(T, Gt(1), V(!0)), Ne), e.link(e.pipe(T, Gt(1), V(!1), be(100)), Ne);
}), Et = u(!1, (e) => {
  e.link(e.pipe(se, V(!0)), Et), e.link(e.pipe(se, V(!1), be(200)), Et);
}), mn = u(!1), nt = u(
  null,
  (e) => {
    e.link(
      e.pipe(
        e.combine(U, T, G, En, bn, gt, q),
        d(([, , , , , , t]) => !I(t)),
        te((t, [n, o, s, i, r]) => {
          const c = o + s - n > -r, a = {
            viewportWidth: i,
            viewportHeight: s,
            scrollTop: o,
            scrollHeight: n
          };
          if (c) {
            let v, m;
            return o > t.state.scrollTop ? (v = "SCROLLED_DOWN", m = t.state.scrollTop - o) : (v = n === s ? "LIST_TOO_SHORT" : "SIZE_DECREASED", m = t.state.scrollTop - o || t.scrollTopDelta), {
              atBottom: !0,
              state: a,
              atBottomBecause: v,
              scrollTopDelta: m
            };
          }
          let p;
          return s < t.state.viewportHeight ? p = "VIEWPORT_HEIGHT_DECREASING" : i < t.state.viewportWidth ? p = "VIEWPORT_WIDTH_DECREASING" : o < t.state.scrollTop ? p = "SCROLLING_UPWARDS" : a.scrollHeight > t.state.scrollHeight ? t.atBottom ? p = "SIZE_INCREASED" : p = t.notAtBottomBecause : t.atBottom ? p = "NOT_FULLY_SCROLLED_TO_LAST_ITEM_BOTTOM" : p = t.notAtBottomBecause, {
            atBottom: !1,
            notAtBottomBecause: p,
            state: a
          };
        }, Mo)
      ),
      nt
    ), e.link(
      e.pipe(
        nt,
        te(
          ({ prev: t }, n) => {
            const o = !!(t && n && t.atBottom && !n.atBottom && n.notAtBottomBecause === "SIZE_INCREASED");
            return {
              prev: n,
              shouldScroll: o
            };
          },
          { prev: null, shouldScroll: !1 }
        ),
        f(({ shouldScroll: t }) => t)
      ),
      mn
    ), e.sub(
      e.pipe(
        G,
        k(nt),
        te(
          (t, [n, o]) => {
            let s = 0;
            return t.viewportHeight > n && o && !o.atBottom && o.notAtBottomBecause === "VIEWPORT_HEIGHT_DECREASING" && (s = t.viewportHeight - n), { viewportHeight: n, delta: s };
          },
          { viewportHeight: 0, delta: 0 }
        )
      ),
      (t) => {
        t.delta && e.pub(se, t.delta);
      }
    );
  },
  (e, t) => !e || e.atBottom !== (t == null ? void 0 : t.atBottom) ? !1 : !e.atBottom && !t.atBottom ? e.notAtBottomBecause === t.notAtBottomBecause : !0
), kn = u(0, (e) => {
  e.link(
    e.pipe(
      e.combine(T, U, G),
      te(
        (t, [n, o, s]) => {
          if (fn(t.scrollHeight, o))
            return {
              scrollTop: n,
              scrollHeight: o,
              jump: 0,
              changed: !1
            };
          {
            const i = o - (n + s) < 1;
            return t.scrollTop !== n && i ? {
              scrollHeight: o,
              scrollTop: n,
              jump: t.scrollTop - n,
              changed: !0
            } : {
              scrollHeight: o,
              scrollTop: n,
              jump: 0,
              changed: !0
            };
          }
        },
        { scrollHeight: 0, jump: 0, scrollTop: 0, changed: !1 }
      ),
      d((t) => t.changed),
      f((t) => t.jump)
    ),
    kn
  );
}), wt = u(It, (e) => {
  e.link(
    e.pipe(
      T,
      te(
        (t, n) => e.getValue(Et) ? { direction: t.direction, prevScrollTop: n } : { direction: n < t.prevScrollTop ? dn : It, prevScrollTop: n },
        { direction: It, prevScrollTop: 0 }
      ),
      f((t) => t.direction)
    ),
    wt
  ), e.link(e.pipe(T, be(100), V(Ro)), wt);
}), Zt = u(0, (e) => {
  e.link(e.pipe(Ne, d(hn), V(0)), Zt), e.link(
    e.pipe(
      T,
      Ht(100),
      k(Ne),
      d(([, t]) => !!t),
      te(([, t], [n]) => [t, n], [0, 0]),
      f(([t, n]) => n - t)
    ),
    Zt
  );
});
function Pt(e, t) {
  if (typeof e == "number")
    return {
      index: e,
      offset: 0,
      behavior: "auto",
      align: "start-no-overflow"
    };
  const n = {
    index: NaN,
    align: e.align ?? "start-no-overflow",
    behavior: e.behavior ?? "auto",
    offset: e.offset ?? 0
  };
  return e.index === "LAST" ? n.index = t : e.index < 0 ? n.index = t + e.index : n.index = e.index, n;
}
function In({
  location: e,
  sizeTree: t,
  offsetTree: n,
  totalHeight: o,
  totalCount: s,
  viewportHeight: i,
  headerHeight: r,
  stickyHeaderHeight: l,
  stickyFooterHeight: c
}) {
  const { align: a, behavior: p, offset: v, index: m } = Pt(e, s - 1);
  function R() {
    const P = ce(t, m)[1];
    if (P === void 0)
      throw new Error(`Item at index ${m} not found`);
    return P;
  }
  i -= l + c;
  let x = $t(m, n) + r - l;
  a === "end" ? x = x - i + R() : a === "center" && (x = x - i / 2 + R() / 2), v && (x += v);
  let b = 0;
  return a === "start" && (b = Math.max(0, Math.min(x - (o - i)))), x = Math.max(0, x), { top: x, behavior: p, align: a, forceBottomSpace: b };
}
const He = u(null), Bo = u(!1), ot = u(!0), Lt = S((e) => {
  e.link(
    e.pipe(
      Lt,
      f(() => !0)
    ),
    ot
  ), e.link(
    e.pipe(
      Lt,
      f(() => null)
    ),
    He
  );
}), xn = S((e) => {
  e.link(
    e.pipe(
      xn,
      k(Ie, we, Ge),
      f(([t, n, o, s]) => {
        let { align: i, behavior: r, offset: l, index: c } = Pt(t, n - 1);
        const a = typeof t != "number" ? t.done : void 0, [p, v] = pn(c, o);
        return p < -s.listOffset ? ((typeof t == "number" || t.align === void 0) && (i = "start-no-overflow"), { index: c, align: i, behavior: r, offset: l, done: a }) : p + v > -s.listOffset + s.visibleListHeight ? ((typeof t == "number" || t.align === void 0) && (i = "end"), { index: c, align: i, behavior: r, offset: l, done: a }) : null;
      }),
      d((t) => t !== null)
    ),
    // @ts-expect-error contra variance
    ee
  );
}), ee = S((e) => {
  const t = e.pipe(
    ee,
    k(
      q,
      we,
      Ie,
      G,
      ht,
      je,
      qe,
      Ae
    ),
    f(
      ([n, o, s, i, r, l, c, a, p]) => {
        try {
          return In({
            location: n,
            totalHeight: p,
            sizeTree: o,
            offsetTree: s,
            totalCount: i,
            viewportHeight: r,
            headerHeight: l,
            stickyHeaderHeight: c,
            stickyFooterHeight: a
          });
        } catch {
          return null;
        }
      }
    ),
    d((n) => n !== null)
  );
  e.link(ee, He), e.link(t, Le), e.link(
    e.pipe(
      ee,
      d((n) => typeof n != "number" && n.index === "LAST"),
      V(!0)
    ),
    ge
  ), e.link(e.pipe(t, V(!1)), ot), e.link(e.pipe(t, V(!1)), Bo), e.link(
    e.pipe(
      q,
      // wait for the list to render with the specified sizeTree, so that enough space is available to scroll by
      be(0),
      k(ot, He),
      d(([, n, o]) => !n && o !== null),
      f(([, , n]) => n)
    ),
    ee
  ), e.sub(e.pipe(Ke, be(10)), () => {
    const n = e.getValue(He);
    n !== null && typeof n != "number" && n.done !== void 0 && n.done(), e.pubIn({
      [He]: null,
      [ot]: !0
    });
  }), e.link(
    e.pipe(
      rt,
      // wait for the list to render with the specified scrollOffset, so that enough space is available to scroll by
      Vt(),
      d((n) => n !== 0)
    ),
    se
  ), e.link(
    e.pipe(
      rt,
      tn(T),
      f(() => 0)
    ),
    rt
  );
}), Fe = u(null), $e = u(null, (e) => {
  e.link(
    e.pipe(
      $e,
      d((n) => n !== null)
    ),
    Fe
  );
  const t = e.pipe(
    e.combine($e, q),
    k(Fe),
    d(([[n, o], s]) => n !== null && !I(o) && s !== null),
    f(([[n]]) => n)
  );
  e.link(e.pipe(t, Vt()), ee), e.link(
    e.pipe(
      t,
      tn(e.pipe(Ye, d(hn))),
      V(null)
      // unset the location after the scroll completes
    ),
    Fe
  );
});
function Ho(e, t) {
  const n = t.slice();
  let o = 0;
  const s = [];
  me(e).forEach(({ k: r, v: l }) => {
    var p, v;
    for (; n.length && n[0] < r; )
      n.shift(), o++;
    const c = Math.max(0, r - o), a = ((p = s.at(-1)) == null ? void 0 : p.k) ?? -1;
    c === a ? (((v = s.at(-2)) == null ? void 0 : v.v) ?? -1) === l ? s.pop() : s[s.length - 1].v = l : s.push({ k: c, v: l });
  });
  let i = Re();
  return s.forEach(({ k: r, v: l }) => {
    i = F(i, r, l);
  }), i;
}
function Vo(e, t) {
  return [
    {
      data: t == null ? void 0 : t[e],
      prevData: (t == null ? void 0 : t[e - 1]) ?? null,
      nextData: (t == null ? void 0 : t[e + 1]) ?? null,
      height: 0,
      index: e,
      offset: 0,
      type: "flat"
    }
  ];
}
const Fo = [], Ve = {
  items: Fo,
  listBottom: 0,
  listTop: 0,
  offsetTree: [],
  paddingBottom: 0,
  paddingTop: 0,
  totalCount: 0,
  data: null
}, Me = u(Ve, (e) => {
  e.link(
    e.pipe(
      e.combine(
        _o,
        Rn,
        q,
        we,
        Ie,
        Ae,
        $,
        rt,
        $e,
        Fe,
        Ue,
        je,
        qe,
        W,
        ve,
        j
      ),
      d((t) => {
        const n = t[t.length - 2], o = t[t.length - 1];
        return !n && !o;
      }),
      te(
        (t, [
          n,
          o,
          s,
          i,
          r,
          l,
          c,
          a,
          p,
          v,
          m,
          R,
          x,
          b
        ]) => {
          var Je;
          if ((c == null ? void 0 : c.length) === 0)
            return Ve;
          if (I(s)) {
            let z = 0;
            return p !== null && (z = Pt(p, r - 1).index), { ...Ve, items: Vo(z, c), offsetTree: i, totalCount: r, data: c };
          }
          let P = 0;
          v !== null && n === 0 && (P = In({
            totalHeight: l,
            location: v,
            sizeTree: s,
            offsetTree: i,
            totalCount: r,
            viewportHeight: e.getValue(G),
            headerHeight: e.getValue(ht),
            stickyHeaderHeight: R,
            stickyFooterHeight: x
          }).top ?? 0);
          const K = Math.min(
            Math.max(n + P + a - b - m, 0),
            l - o
          ), Z = K + o;
          if (t.offsetTree === i && t.totalCount === r && t.data === c && K >= t.listTop && Z <= t.listBottom)
            return t;
          const J = [], X = r - 1, N = 0, M = $o(i, K, Z, N);
          let A = 0, pe = 0, Ze = !1;
          for (const z of M) {
            const {
              value: { offset: xe, height: ie }
            } = z;
            let Q = z.start;
            A = xe, xe < K && (Q += Math.floor((K - xe) / ie), A += (Q - z.start) * ie), Q < N && (A += (N - Q) * ie, Q = N);
            const Ce = Math.min(z.end, X);
            for (let re = Q; re <= Ce && !(A >= Z); re++) {
              const De = {
                data: c == null ? void 0 : c[re],
                prevData: (c == null ? void 0 : c[re - 1]) ?? null,
                nextData: (c == null ? void 0 : c[re + 1]) ?? null,
                height: ie,
                index: re,
                offset: A,
                type: "flat"
              };
              Ze || (Ze = !0, pe = A), J.push(De), A += ie;
            }
          }
          const E = l - A, ne = ((Je = J[0]) == null ? void 0 : Je.offset) || 0;
          return { items: J, listBottom: A, listTop: pe, offsetTree: i, paddingBottom: E, paddingTop: ne, totalCount: r, data: c };
        },
        Ve
      )
    ),
    Me
  );
}), ct = ke([], (e) => e.pipe(
  e.combine(Me, T),
  f(([t]) => t.items.slice().map((o) => o.data))
)), j = u(!1), _e = u(!1), st = S((e) => {
  e.link(
    e.pipe(
      Me,
      k(kn, ve),
      d(([, , t]) => !t),
      te(
        ([, t, n, o], [{ items: s, totalCount: i, listBottom: r, paddingBottom: l }, c]) => {
          const a = r + l;
          let p = 0;
          return n === i && t.length > 0 && s.length > 0 && t[0].index !== s[0].index && (p = a - o, p !== 0 && (p += c)), [p, s, i, a];
        },
        [0, [], 0, 0]
      ),
      d(([t]) => t !== 0),
      k(T, wt, Ye),
      d(([, t, n, o]) => !o && t !== 0 && n === dn),
      f(([[t]]) => t)
    ),
    st
  ), wo() ? (e.sub(e.pipe(st, k(W, T)), ([t, n]) => {
    e.pub(W, n - t);
  }), e.sub(
    e.pipe(e.combine(T, W, ve, _e)),
    ([t, n, o, s]) => {
      o || s || (n > 0 && t < n ? (e.pub(j, !0), e.pub(Le, { top: 0, behavior: "instant" }), setTimeout(() => {
        e.pubIn({
          [j]: !1,
          [W]: 0
        });
      })) : n < 0 && t <= 0 && (e.pubIn({
        [j]: !0,
        [W]: 0
      }), setTimeout(() => {
        e.pub(Le, { top: 0, behavior: "instant" }), e.pub(j, !1);
      })));
    }
  ), e.sub(
    e.pipe(
      e.combine(Ne, W, j, ve, _e),
      d(
        ([t, n, o, s, i]) => !t && n !== 0 && !o && !s && !i
      ),
      Ht(100)
    ),
    ([, t]) => {
      e.pub(j, !0), t < 0 ? requestAnimationFrame(() => {
        e.pub(se, -t), e.pub(W, 0), requestAnimationFrame(() => {
          e.pub(j, !1);
        });
      }) : requestAnimationFrame(() => {
        e.pub(se, -t), e.pub(W, 0), requestAnimationFrame(() => {
          e.pub(j, !1);
        });
      });
    }
  )) : e.link(st, se);
}), Ie = u(0), ze = u(null), $ = u(null, (e) => {
  e.link(
    e.pipe(
      $,
      d((t) => t !== null),
      f((t) => t.length)
    ),
    Ie
  );
}), Be = u(null), le = S((e) => {
  e.link(
    e.pipe(
      le,
      k(Ee),
      f(([n, o]) => -(o * n.length))
    ),
    W
  ), e.link(e.pipe(le, V(!0)), _e), e.link(e.pipe(le, Vt()), Be);
  function t(n, o) {
    e.pubIn({
      [se]: n,
      [lt]: n
    }), o ? requestAnimationFrame(() => {
      e.pubIn({
        [W]: 0,
        [lt]: 0,
        [Be]: null,
        [_e]: !1
      });
    }) : e.pubIn({
      [W]: 0,
      [lt]: 0,
      [Be]: null,
      [_e]: !1
    });
  }
  e.sub(
    e.pipe(
      we,
      k(Be),
      d(([, n]) => n !== null),
      f(([n, o]) => {
        if (o === null)
          throw new Error("Unexpected null items");
        return $t(o.length, n);
      })
    ),
    (n) => {
      t(n, !1);
    }
  ), e.sub(
    e.pipe(
      le,
      gn(2),
      k(we, Be),
      d(([, , n]) => n !== null),
      f(([n, o]) => $t(n.length, o))
    ),
    (n) => {
      t(n, !0);
    }
  ), e.changeWith($, le, (n, o) => n ? [...o, ...n] : o.slice()), e.link(
    e.pipe(
      le,
      k(q, Ee),
      f(([n, o, s]) => {
        const i = n.length, r = s;
        return me(o).reduce(
          (c, { k: a, v: p }) => ({
            ranges: [...c.ranges, { startIndex: c.prevIndex, endIndex: a + i - 1, size: c.prevSize }],
            prevIndex: a + i,
            prevSize: p
          }),
          {
            ranges: [],
            prevIndex: 0,
            prevSize: r
          }
        ).ranges;
      })
    ),
    de
  );
}), ft = S((e) => {
  const t = e.pipe(
    ft,
    k(Ge, Nt, ze, q),
    d(([, , , , o]) => !I(o)),
    f(([{ data: o, scrollToBottom: s }, i, r, l]) => {
      if (s === !1 || s === void 0)
        return null;
      let c = "auto";
      const a = i.isAtBottom;
      if (typeof s == "function") {
        const p = s({ data: o, scrollLocation: i, scrollInProgress: r, context: l, atBottom: a });
        if (!p)
          return null;
        if (typeof p == "object")
          return p;
        if (typeof p == "number")
          return { index: p, align: "end", behavior: "auto" };
        c = p;
      } else {
        if (!a)
          return null;
        c = s;
      }
      return c === !0 && (c = "auto"), { index: "LAST", align: "end", behavior: c };
    })
  );
  e.link(
    e.pipe(
      t,
      d((o) => o !== null),
      f(() => !0)
    ),
    ge
  ), e.link(
    e.pipe(
      Ke,
      k(ge),
      d(([o, s]) => s),
      f(() => !1)
    ),
    ge
  );
  const n = e.pipe(
    Yt,
    k(ge),
    d(([o, s]) => o === "up" && s)
  );
  e.link(
    e.pipe(
      n,
      f(() => !1)
    ),
    ge
  ), e.link(e.pipe(n, V(!0)), Lt), e.link(
    e.pipe(
      t,
      d((o) => o !== null),
      be(20)
    ),
    ee
  );
}), at = S((e) => {
  e.changeWith($, at, (t, n) => t ? [...t, ...n.data] : n.data.slice()), e.link(at, ft);
}), it = S((e) => {
  e.changeWith($, it, (t, n) => t ? [...t.slice(0, n.offset), ...n.data, ...t.slice(n.offset)] : n.data.slice()), e.changeWith(ae, it, ([t], n) => {
    const s = ce(t, n.offset, "k")[0], i = n.data.length;
    return [vo(t, s, 1 / 0, (l, c) => [l + i, c]), s];
  }), e.link(it, ft);
}), Rt = S((e) => {
  e.changeWith($, Rt, (t, { offset: n, count: o }) => t ? t.slice(0, n).concat(t.slice(n + o)) : []), e.changeWith(ae, Rt, ([t], { offset: n, count: o }) => [bo(t, n, o), n]);
}), xt = u(null), We = S((e) => {
  e.sub(
    e.pipe(
      We,
      k($),
      d(([{ purgeItemSizes: t }, n]) => !!t || n === null || n.length === 0)
    ),
    ([t, n]) => {
      n === null || n.length === 0 ? e.pubIn({
        ...t.initialLocation ? { [$e]: t.initialLocation } : {},
        [$]: t.data.slice()
      }) : e.pubIn({
        ...t.initialLocation ? { [$e]: t.initialLocation } : {},
        [ae]: pt,
        [Me]: Ve,
        [xt]: t.data.slice()
      });
    }
  ), e.sub(
    e.pipe(
      Dn,
      k(xt),
      d(([, t]) => t !== null)
    ),
    ([, t]) => {
      e.pubIn({
        [$]: t,
        [xt]: null
      });
    }
  ), e.link(
    e.pipe(
      We,
      d(({ purgeItemSizes: t }) => !t),
      k(Ee),
      d(([, t]) => t > 0),
      f(([{ data: t }, n]) => [
        {
          size: n,
          startIndex: t.length,
          endIndex: 1 / 0
        }
      ])
    ),
    de
  ), e.sub(
    e.pipe(
      We,
      d(({ purgeItemSizes: t }) => !t)
    ),
    ({ data: t, initialLocation: n, suppressItemMeasure: o }) => {
      requestAnimationFrame(() => {
        o || e.pub(Cn), requestAnimationFrame(() => {
          n && e.pubIn({
            [ee]: n
          });
        });
      }), e.pubIn({
        [$]: t.slice()
      });
    }
  );
}), Jt = S((e) => {
  e.changeWith($, Jt, (t, n) => t ? t.slice(n) : []), e.changeWith(ae, Jt, ([t], n) => [me(t).reduce((s, { k: i, v: r }) => F(s, Math.max(0, i - n), r), Re()), 0]);
}), Xt = S((e) => {
  e.changeWith($, Xt, (t, n) => t ? t.slice(0, t.length - n) : []), e.link(
    e.pipe(
      Xt,
      k(Ie, Ee),
      f(([, t, n]) => [
        {
          size: n,
          startIndex: t,
          endIndex: 1 / 0
        }
      ])
    ),
    de
  );
}), Sn = S((e) => {
  const t = e.pipe(
    Sn,
    k($),
    f(([n, o]) => {
      if (!o)
        return [];
      const s = [];
      return o.forEach((i, r) => {
        n(i, r) && s.push(r);
      }), s;
    })
  );
  e.changeWith($, t, (n, o) => n ? n.filter((s, i) => !o.includes(i)) : []), e.changeWith(ae, t, ([n], o) => [Ho(n, o), 0]);
}), Mt = S((e) => {
  e.changeWith($, Mt, (t, { mapper: n }) => t ? t.map(n) : []), e.link(
    e.pipe(
      Mt,
      gn(3),
      k(mn),
      d(([{ autoscrollToBottomBehavior: t }, n]) => n && !!t),
      f(([{ autoscrollToBottomBehavior: t }]) => typeof t == "object" ? t.location() : { index: "LAST", align: "end", behavior: t }),
      d((t) => !!t)
    ),
    ee
  );
}), de = S();
u([]);
u([]);
u(0);
u(null);
u(NaN);
const ve = u(!1), ae = u(pt, (e) => {
  e.link(
    e.pipe(
      de,
      d((t) => t.length > 0),
      k(q),
      f(([t, n]) => xo(n, [t, []]))
    ),
    ae
  );
}), q = u(pt[0], (e) => {
  e.link(
    e.pipe(
      ae,
      f(([t]) => t)
    ),
    q
  );
}), yn = u(pt[1], (e) => {
  e.link(
    e.pipe(
      ae,
      f(([, t]) => t)
    ),
    yn
  );
}), Ee = u(Te[1]), we = u(Te[0]), Pe = u(Te, (e) => {
  e.link(
    e.pipe(
      q,
      k(yn),
      te(([t], [n, o]) => Eo(t, [n, o]), Te)
    ),
    Pe
  ), e.link(
    e.pipe(
      Pe,
      f(([, t]) => t)
    ),
    Ee
  ), e.link(
    e.pipe(
      Pe,
      f(([t]) => t)
    ),
    we
  );
}), Tn = u(Te[2], (e) => {
  e.link(
    e.pipe(
      Pe,
      f(([, , t]) => t)
    ),
    Tn
  );
}), $n = u(Te[3], (e) => {
  e.link(
    e.pipe(
      Pe,
      f(([, , , t]) => t)
    ),
    $n
  );
}), Ae = u(0, (e) => {
  e.link(
    e.pipe(
      e.combine(Ie, $n, Tn, Ee),
      f(([t, n, o, s]) => o + (t - n) * s)
    ),
    Ae
  );
}), Ye = S(), Nt = u(!1), Ke = S((e) => {
  e.link(e.pipe(Ke, V(!1)), Ye);
}, !1), T = u(0), G = u(0), En = u(0), U = u(0), _o = T, rt = u(0), je = u(0), Ue = u(0), qe = u(0), zt = u(0), At = u(null), wn = Ft(), Wo = Lo, Po = 50, ht = ke(0, (e) => e.pipe(
  e.combine(je, Ue),
  f(([t, n]) => t + n)
)), Ln = ke(0, (e) => e.pipe(
  e.combine(qe, zt),
  f(([t, n]) => t + n)
)), No = ke(0, (e) => e.pipe(
  e.combine(je, Ue, T),
  f(([t, n, o]) => t + Math.max(n - o, 0))
)), zo = ke(0, (e) => e.pipe(
  e.combine(qe, zt, T, G, U),
  f(([t, n, o, s, i]) => {
    o = Math.min(o, i - s);
    const r = Math.max(n - (i - (o + s)), 0);
    return t + r;
  })
)), Rn = ke(0, (e) => e.pipe(
  e.combine(G, No, zo),
  f(([t, n, o]) => t - n - o)
)), gt = u(0), Mn = u(0, (e) => {
  e.link(
    e.pipe(
      e.combine(Mn, Ae, G),
      f(([t, n, o]) => t === 0 ? 0 : Math.max(0, Math.min(t - (n - o))))
    ),
    gt
  );
}), Le = S((e) => {
  e.link(
    e.pipe(
      Le,
      f((t) => t.align === "start" ? t.top ?? 0 : 0)
    ),
    Mn
  ), e.link(
    e.pipe(
      Le,
      k(T),
      d(([t, n]) => t.top !== n),
      V(!0)
    ),
    Ye
  );
}), Ge = ke(
  {
    listOffset: 0,
    visibleListHeight: 0,
    scrollHeight: 0,
    bottomOffset: 0,
    isAtBottom: !1
  },
  (e) => e.pipe(
    e.combine(
      T,
      ht,
      Ln,
      Ue,
      Rn,
      U,
      gt,
      ve,
      Fe,
      j,
      ge
    ),
    d(([, , , , , , , t, n, o]) => !t && n === null && !o),
    f(
      ([
        t,
        n,
        o,
        s,
        i,
        r,
        l,
        c,
        a,
        p,
        v
      ]) => {
        const m = e.getValue(bn), R = r - n - o, x = -t + s, b = l === 0 ? R + Math.min(0, x) - i : -l;
        return {
          scrollHeight: R,
          listOffset: x,
          visibleListHeight: i,
          bottomOffset: b,
          isAtBottom: v || b <= m
        };
      }
    )
  )
), Ct = S((e) => {
  e.link(
    e.pipe(
      T,
      be(0),
      k(Ge),
      d(([, t]) => t.scrollHeight > 0),
      f(([, t]) => t)
    ),
    Ct
  );
}), se = S(), W = u(0), lt = u(0), Dt = u(0), An = u(""), Yt = S(), Cn = Ft(), Dn = Ft(), On = ({ index: e }) => /* @__PURE__ */ en("div", { children: [
  "Item ",
  e
] }), Bn = ({ index: e }) => e, Ot = u(On), Hn = u(Bn), Vn = u(null), Fn = u(null), _n = u(null), Wn = u(null), Pn = u(null), Nn = u("div"), Yo = {
  position: "sticky",
  top: 0,
  zIndex: 1
}, Qe = {
  overflowAnchor: "none"
}, Ko = {
  position: "sticky",
  bottom: 0
}, zn = g.forwardRef((e, t) => /* @__PURE__ */ y("div", { style: { zIndex: 1 }, ...e, ref: t })), Yn = g.forwardRef((e, t) => /* @__PURE__ */ y("div", { ...e, ref: t })), Kn = g.forwardRef(
  ({ style: e, ...t }, n) => /* @__PURE__ */ y("div", { ...t, style: { ...Yo, ...e }, ref: n })
), jn = g.forwardRef(
  ({ style: e, ...t }, n) => /* @__PURE__ */ y("div", { ...t, style: { ...Ko, ...e }, ref: n })
), Un = u(zn), qn = u(Kn), Gn = u(Yn), Zn = u(jn), Bt = u("top", (e) => {
  e.link(
    e.pipe(
      e.combine(Bt, Ae, G, ht, Ln),
      d(([t]) => t === "bottom" || t === "bottom-smooth"),
      f(([, t, n, o, s]) => Math.max(0, n - t - o - s))
    ),
    Dt
  ), e.link(
    e.pipe(
      e.combine(Dt, Bt),
      d(([, t]) => t === "bottom-smooth"),
      te(
        (t, [n]) => [t[1], n],
        [0, 0]
      ),
      f(([t, n]) => t > 0 && n > 0 ? "margin-top 0.2s ease-out" : "")
    ),
    An
  );
});
function jo(e) {
  return Uo(Go(Zo(qo(e), 8 * e.length))).toLowerCase();
}
function Uo(e) {
  for (var t, n = "0123456789ABCDEF", o = "", s = 0; s < e.length; s++)
    t = e.charCodeAt(s), o += n.charAt(t >>> 4 & 15) + n.charAt(15 & t);
  return o;
}
function qo(e) {
  for (var t = Array(e.length >> 2), n = 0; n < t.length; n++)
    t[n] = 0;
  for (n = 0; n < 8 * e.length; n += 8)
    t[n >> 5] |= (255 & e.charCodeAt(n / 8)) << n % 32;
  return t;
}
function Go(e) {
  for (var t = "", n = 0; n < 32 * e.length; n += 8)
    t += String.fromCharCode(e[n >> 5] >>> n % 32 & 255);
  return t;
}
function Zo(e, t) {
  e[t >> 5] |= 128 << t % 32, e[14 + (t + 64 >>> 9 << 4)] = t;
  for (var n = 1732584193, o = -271733879, s = -1732584194, i = 271733878, r = 0; r < e.length; r += 16) {
    const l = n, c = o, a = s, p = i;
    o = B(
      o = B(
        o = B(
          o = B(
            o = O(
              o = O(
                o = O(
                  o = O(
                    o = D(
                      o = D(
                        o = D(
                          o = D(
                            o = C(
                              o = C(
                                o = C(
                                  o = C(
                                    o,
                                    s = C(
                                      s,
                                      i = C(i, n = C(n, o, s, i, e[r + 0], 7, -680876936), o, s, e[r + 1], 12, -389564586),
                                      n,
                                      o,
                                      e[r + 2],
                                      17,
                                      606105819
                                    ),
                                    i,
                                    n,
                                    e[r + 3],
                                    22,
                                    -1044525330
                                  ),
                                  s = C(
                                    s,
                                    i = C(i, n = C(n, o, s, i, e[r + 4], 7, -176418897), o, s, e[r + 5], 12, 1200080426),
                                    n,
                                    o,
                                    e[r + 6],
                                    17,
                                    -1473231341
                                  ),
                                  i,
                                  n,
                                  e[r + 7],
                                  22,
                                  -45705983
                                ),
                                s = C(
                                  s,
                                  i = C(i, n = C(n, o, s, i, e[r + 8], 7, 1770035416), o, s, e[r + 9], 12, -1958414417),
                                  n,
                                  o,
                                  e[r + 10],
                                  17,
                                  -42063
                                ),
                                i,
                                n,
                                e[r + 11],
                                22,
                                -1990404162
                              ),
                              s = C(
                                s,
                                i = C(i, n = C(n, o, s, i, e[r + 12], 7, 1804603682), o, s, e[r + 13], 12, -40341101),
                                n,
                                o,
                                e[r + 14],
                                17,
                                -1502002290
                              ),
                              i,
                              n,
                              e[r + 15],
                              22,
                              1236535329
                            ),
                            s = D(
                              s,
                              i = D(i, n = D(n, o, s, i, e[r + 1], 5, -165796510), o, s, e[r + 6], 9, -1069501632),
                              n,
                              o,
                              e[r + 11],
                              14,
                              643717713
                            ),
                            i,
                            n,
                            e[r + 0],
                            20,
                            -373897302
                          ),
                          s = D(
                            s,
                            i = D(i, n = D(n, o, s, i, e[r + 5], 5, -701558691), o, s, e[r + 10], 9, 38016083),
                            n,
                            o,
                            e[r + 15],
                            14,
                            -660478335
                          ),
                          i,
                          n,
                          e[r + 4],
                          20,
                          -405537848
                        ),
                        s = D(
                          s,
                          i = D(i, n = D(n, o, s, i, e[r + 9], 5, 568446438), o, s, e[r + 14], 9, -1019803690),
                          n,
                          o,
                          e[r + 3],
                          14,
                          -187363961
                        ),
                        i,
                        n,
                        e[r + 8],
                        20,
                        1163531501
                      ),
                      s = D(
                        s,
                        i = D(i, n = D(n, o, s, i, e[r + 13], 5, -1444681467), o, s, e[r + 2], 9, -51403784),
                        n,
                        o,
                        e[r + 7],
                        14,
                        1735328473
                      ),
                      i,
                      n,
                      e[r + 12],
                      20,
                      -1926607734
                    ),
                    s = O(
                      s,
                      i = O(i, n = O(n, o, s, i, e[r + 5], 4, -378558), o, s, e[r + 8], 11, -2022574463),
                      n,
                      o,
                      e[r + 11],
                      16,
                      1839030562
                    ),
                    i,
                    n,
                    e[r + 14],
                    23,
                    -35309556
                  ),
                  s = O(
                    s,
                    i = O(i, n = O(n, o, s, i, e[r + 1], 4, -1530992060), o, s, e[r + 4], 11, 1272893353),
                    n,
                    o,
                    e[r + 7],
                    16,
                    -155497632
                  ),
                  i,
                  n,
                  e[r + 10],
                  23,
                  -1094730640
                ),
                s = O(
                  s,
                  i = O(i, n = O(n, o, s, i, e[r + 13], 4, 681279174), o, s, e[r + 0], 11, -358537222),
                  n,
                  o,
                  e[r + 3],
                  16,
                  -722521979
                ),
                i,
                n,
                e[r + 6],
                23,
                76029189
              ),
              s = O(
                s,
                i = O(i, n = O(n, o, s, i, e[r + 9], 4, -640364487), o, s, e[r + 12], 11, -421815835),
                n,
                o,
                e[r + 15],
                16,
                530742520
              ),
              i,
              n,
              e[r + 2],
              23,
              -995338651
            ),
            s = B(
              s,
              i = B(i, n = B(n, o, s, i, e[r + 0], 6, -198630844), o, s, e[r + 7], 10, 1126891415),
              n,
              o,
              e[r + 14],
              15,
              -1416354905
            ),
            i,
            n,
            e[r + 5],
            21,
            -57434055
          ),
          s = B(
            s,
            i = B(i, n = B(n, o, s, i, e[r + 12], 6, 1700485571), o, s, e[r + 3], 10, -1894986606),
            n,
            o,
            e[r + 10],
            15,
            -1051523
          ),
          i,
          n,
          e[r + 1],
          21,
          -2054922799
        ),
        s = B(
          s,
          i = B(i, n = B(n, o, s, i, e[r + 8], 6, 1873313359), o, s, e[r + 15], 10, -30611744),
          n,
          o,
          e[r + 6],
          15,
          -1560198380
        ),
        i,
        n,
        e[r + 13],
        21,
        1309151649
      ),
      s = B(
        s,
        i = B(i, n = B(n, o, s, i, e[r + 4], 6, -145523070), o, s, e[r + 11], 10, -1120210379),
        n,
        o,
        e[r + 2],
        15,
        718787259
      ),
      i,
      n,
      e[r + 9],
      21,
      -343485551
    ), n = ue(n, l), o = ue(o, c), s = ue(s, a), i = ue(i, p);
  }
  return [n, o, s, i];
}
function dt(e, t, n, o, s, i) {
  return ue(Jo(ue(ue(t, e), ue(o, i)), s), n);
}
function C(e, t, n, o, s, i, r) {
  return dt(t & n | ~t & o, e, t, s, i, r);
}
function D(e, t, n, o, s, i, r) {
  return dt(t & o | n & ~o, e, t, s, i, r);
}
function O(e, t, n, o, s, i, r) {
  return dt(t ^ n ^ o, e, t, s, i, r);
}
function B(e, t, n, o, s, i, r) {
  return dt(n ^ (t | ~o), e, t, s, i, r);
}
function ue(e, t) {
  const n = (65535 & e) + (65535 & t);
  return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n;
}
function Jo(e, t) {
  return e << t | e >>> 32 - t;
}
const Jn = Symbol("INVALID_KEY");
function Xo(e) {
  const t = e.slice(0, 32), n = e.slice(32), o = atob(n);
  if (t !== jo(n))
    return Jn;
  const [s, i] = o.split(";"), r = s.slice(2), l = new Date(Number(i.slice(2)));
  return { orderNumber: r, expiryDate: l };
}
const Qo = {
  valid: !1,
  consoleMessage: "The VirtuosoMessageList license wrapper component is missing. Enclose the VirtuosoMessageList with VirtuosoMessageListLicense and add your key at the lisenceKey property.",
  watermarkMessage: "The VirtuosoMessageList license wrapper component is missing. Enclose the VirtuosoMessageList with VirtuosoMessageListLicense and add your key at the lisenceKey property."
}, es = {
  valid: !1,
  consoleMessage: "Your VirtuosoMessageListLicense is missing a license key. Purchase one from https://virtuoso.dev/pricing/",
  watermarkMessage: "Your VirtuosoMessageListLicense is missing a license key. Purchase one from https://virtuoso.dev/pricing/"
}, ts = {
  valid: !1,
  consoleMessage: "Your VirtuosoMessageListLicense component is missing a license key - this component will not work if deployed in production. Purchase a key from https://virtuoso.dev/pricing/ before you deploy to production."
}, Xn = {
  valid: !0
}, ns = {
  valid: !1,
  consoleMessage: "Your Virtuoso Message List license key is invalid. Ensure that you have copy-pasted the key from the purchase email correctly.",
  watermarkMessage: "Your Virtuoso Message List license key is invalid"
}, os = {
  valid: !1,
  consoleMessage: "Your annual license key to use Virtuoso Message List in non-production environments has expired. You can still use it in production. To keep using it in development, purchase a new key from https://virtuoso.dev/pricing/",
  watermarkMessage: "Your annual license key to use Virtuoso Message List in non-production environments has expired. You can still use it in production. To keep using it in development, purchase a new key from https://virtuoso.dev/pricing/"
}, ss = {
  valid: !1,
  consoleMessage: "You have installed a version of `@virtuoso.dev/message-list` that is newer than the period of your license key. Either downgrade to a supported version, or purchase a new license from https://virtuoso.dev/pricing/",
  watermarkMessage: "You have installed a version of `@virtuoso.dev/message-list` that is newer than the period of your license key. Either downgrade to a supported version, or purchase a new license from https://virtuoso.dev/pricing/"
}, is = Xn, rs = /^(?:127\.0\.0\.1|localhost|0\.0\.0\.0)$/, ls = ["virtuoso.dev", "csb.app", "codesandbox.io"];
function us({ licenseKey: e, now: t, hostname: n, packageTimestamp: o }) {
  const s = n.match(rs), i = ls.some((r) => n.endsWith(r));
  if (e) {
    const r = Xo(e);
    if (r === Jn)
      return ns;
    if (r.expiryDate.getTime() < t.getTime()) {
      if (s)
        return os;
      if (r.expiryDate.getTime() < o)
        return ss;
    }
  } else
    return i ? is : s ? ts : es;
  return Xn;
}
const Qn = g.createContext(Qo), cs = ({
  licenseKey: e,
  children: t
}) => {
  const n = us({
    licenseKey: e,
    hostname: typeof window < "u" ? window.location.hostname : "localhost",
    now: /* @__PURE__ */ new Date(),
    packageTimestamp: 1723626170013
  });
  return /* @__PURE__ */ y(Qn.Provider, { value: n, children: t });
};
cs.displayName = Math.random().toString(36).slice(2, 8);
const as = g.createContext(void 0);
function ps(e, t, n) {
  const o = _t(), s = g.useRef(null), i = g.useRef(null);
  function r() {
    s.current && (cancelAnimationFrame(s.current), s.current = null, i.current = null);
  }
  g.useEffect(() => o.sub(Yt, (a) => {
    a !== i.current && r();
  }), [o]), g.useEffect(() => o.sub(wn, r), [o]);
  const l = g.useCallback(
    (a, p, v) => {
      var P;
      s.current && r();
      const m = ((P = e.current) == null ? void 0 : P.scrollTop) ?? 0;
      i.current = m < a ? "down" : "up";
      let R = 0, x = 0;
      function b() {
        var Z, J;
        const K = m + (a - m) * p(R);
        (Z = e.current) == null || Z.scrollTo({ top: K, behavior: "instant" }), R += 1 / v, x += 1, x < v ? s.current = requestAnimationFrame(b) : ((J = e.current) == null || J.scrollTo({ top: a, behavior: "instant" }), s.current = null, i.current = null);
      }
      b();
    },
    [e]
  );
  return g.useCallback(
    (a) => {
      var p, v, m, R;
      if (a.top === ((p = e.current) == null ? void 0 : p.scrollTop)) {
        o.pub(Ke, (v = e.current) == null ? void 0 : v.scrollTop);
        return;
      }
      if (a.top !== void 0 && (n.current = a.top, o.pub(Nt, !0)), a.forceBottomSpace !== void 0 && t.current && (t.current.style.paddingBottom = `${a.forceBottomSpace}px`), a.behavior === "smooth")
        l(a.top ?? 0, Wo, Po);
      else if (a.behavior === "auto" || a.behavior === "instant" || a.behavior === void 0)
        r(), (m = e.current) == null || m.scrollTo(a);
      else {
        const { easing: x, animationFrameCount: b } = a.behavior(((R = e.current) == null ? void 0 : R.scrollTop) ?? 0, a.top ?? 0);
        l(a.top ?? 0, x, b);
      }
    },
    [o, l, t, e, n]
  );
}
function eo(e) {
  return {
    data: {
      prepend: (t) => {
        e.pub(le, t);
      },
      append: (t, n) => {
        e.pub(at, {
          data: t,
          scrollToBottom: n
        });
      },
      replace: (t, n) => {
        e.pub(We, {
          ...n,
          data: t
        });
      },
      map: (t, n) => {
        e.pub(Mt, {
          mapper: t,
          autoscrollToBottomBehavior: n
        });
      },
      findAndDelete: (t) => {
        e.pub(Sn, t);
      },
      findIndex: (t) => e.getValue($).findIndex(t),
      find: (t) => e.getValue($).find(t),
      insert: function(t, n, o) {
        e.pub(it, {
          data: t,
          offset: n,
          scrollToBottom: o
        });
      },
      deleteRange: function(t, n) {
        e.pub(Rt, {
          offset: t,
          count: n
        });
      },
      batch: (t, n) => {
        e.pub(ve, !0), t(), e.pub(ve, !1), e.pub(ft, { data: [], scrollToBottom: n });
      },
      get: () => e.getValue($).slice(),
      getCurrentlyRendered: () => e.getValue(ct)
    },
    scrollToItem: (t) => {
      e.pub(ee, t);
    },
    scrollIntoView: (t) => {
      e.pub(xn, t);
    },
    scrollerElement: () => e.getValue(At),
    getScrollLocation() {
      return e.getValue(Ge);
    },
    cancelSmoothScroll() {
      e.pub(wn);
    },
    height: (t) => {
      var s;
      const n = ((s = e.getValue($)) == null ? void 0 : s.indexOf(t)) ?? -1;
      if (n === -1)
        return 0;
      const o = e.getValue(q);
      return ce(o, n)[1] ?? 0;
    }
  };
}
const fs = ({ item: e, ItemContent: t, mount: n, unmount: o }) => {
  const s = H(ze), i = g.useRef(null), r = g.useCallback(
    (l) => {
      l ? (i.current = l, n(l)) : i.current && (o(i.current), i.current = null);
    },
    [n, o]
  );
  return /* @__PURE__ */ y(
    "div",
    {
      ref: r,
      "data-index": e.index,
      "data-known-size": e.height,
      style: {
        overflowAnchor: "none",
        position: "absolute",
        width: "100%",
        top: e.offset
      },
      children: /* @__PURE__ */ y(t, { index: e.index, prevData: e.prevData, nextData: e.nextData, data: e.data, context: s })
    }
  );
};
function et(e) {
  const t = g.useRef(null);
  return [g.useCallback(
    (o) => {
      o ? (t.current = o, e == null || e.observe(o, { box: "border-box" })) : t.current && (e == null || e.unobserve(t.current), t.current = null);
    },
    [e]
  ), t];
}
let Qt = !1;
const hs = g.forwardRef(
  ({
    initialData: e = [],
    computeItemKey: t = Bn,
    context: n = null,
    initialLocation: o = null,
    shortSizeAlign: s = "top",
    onScroll: i,
    onRenderedDataChange: r,
    ItemContent: l = On,
    Header: c = null,
    StickyHeader: a = null,
    Footer: p = null,
    StickyFooter: v = null,
    EmptyPlaceholder: m = null,
    HeaderWrapper: R = zn,
    StickyHeaderWrapper: x = Kn,
    FooterWrapper: b = Yn,
    StickyFooterWrapper: P = jn,
    ScrollElement: K = "div",
    ...Z
  }, J) => {
    const X = g.useMemo(() => {
      const M = new fo();
      return M.register(Me), M.register(Ye), M.register(st), M.register(nt), M.register(at), M.register(le), M.register(We), M.pubIn({
        [$]: e.slice(),
        [ze]: n,
        [Hn]: t,
        [$e]: o,
        [Ot]: l,
        [Vn]: c,
        [_n]: p,
        [Fn]: a,
        [Wn]: v,
        [Pn]: m,
        [Nn]: K,
        [Zn]: P,
        [qn]: x,
        [Gn]: b,
        [Un]: R,
        [Bt]: s
      }), M.singletonSub(Ct, i), M.singletonSub(ct, r), M;
    }, []);
    g.useImperativeHandle(J, () => eo(X), [X]), g.useEffect(() => {
      X.pubIn({
        [ze]: n,
        [Ot]: l
      }), X.singletonSub(Ct, i), X.singletonSub(ct, r);
    });
    const N = g.useContext(Qn);
    return g.useEffect(() => {
      N.consoleMessage && (Qt || (Qt = !0, console.error(N.consoleMessage)));
    }, [N]), g.useEffect(() => {
      const M = (A) => {
        var pe;
        (pe = A.message) != null && pe.includes("ResizeObserver loop") && (A.preventDefault(), A.stopPropagation(), A.stopImmediatePropagation());
      };
      return window.addEventListener("error", M, { capture: !0 }), () => {
        window.removeEventListener("error", M);
      };
    }, []), typeof window < "u" && N.watermarkMessage ? /* @__PURE__ */ y(
      "div",
      {
        style: {
          color: "red",
          pointerEvents: "none"
        },
        children: N.watermarkMessage
      }
    ) : /* @__PURE__ */ y(ho.Provider, { value: X, children: /* @__PURE__ */ y(gs, { ...Z }) });
  }
);
hs.displayName = "VirtuosoMessageList";
const gs = ({ style: e, ...t }) => {
  const n = _t(), o = g.useContext(as), [
    s,
    i,
    r,
    l,
    c,
    a,
    p,
    v,
    m,
    R,
    x
  ] = go(
    Vn,
    Fn,
    Un,
    qn,
    _n,
    Wn,
    Gn,
    Zn,
    Ot,
    Pn,
    Nn
  ), [b] = g.useState(() => {
    if (typeof ResizeObserver > "u")
      throw new Error("ResizeObserver not found. Please ensure that you have a polyfill installed.");
    return new ResizeObserver((h) => {
      var Xe, Se, Oe, jt;
      const oe = h.length, _ = [];
      let w = {};
      for (let vt = 0; vt < oe; vt++) {
        const he = h[vt], Y = he.target;
        if (Y === N.current) {
          w = {
            ...w,
            [Ue]: he.contentRect.height,
            [U]: (Xe = E.current) == null ? void 0 : Xe.scrollHeight
          };
          continue;
        } else if (Y === A.current) {
          w = {
            ...w,
            [je]: he.contentRect.height,
            [U]: (Se = E.current) == null ? void 0 : Se.scrollHeight
          };
          continue;
        } else if (Y === K.current) {
          w = {
            ...w,
            [zt]: he.contentRect.height,
            [U]: (Oe = E.current) == null ? void 0 : Oe.scrollHeight
          };
          continue;
        } else if (Y === J.current) {
          w = {
            ...w,
            [qe]: he.contentRect.height,
            [U]: (jt = E.current) == null ? void 0 : jt.scrollHeight
          };
          continue;
        } else if (Y === E.current) {
          w = {
            ...w,
            [T]: Y.scrollTop,
            [U]: Y.scrollHeight,
            [G]: he.contentRect.height,
            [En]: Y.clientWidth
          };
          continue;
        } else if (Y === ne.current) {
          E.current && (w = {
            ...w,
            [U]: E.current.scrollHeight
          });
          continue;
        }
        if (Y.dataset.index === void 0)
          continue;
        const bt = parseInt(Y.dataset.index), ao = parseFloat(Y.dataset.knownSize ?? ""), mt = he.contentRect.height;
        if (mt === ao)
          continue;
        const Ut = _[_.length - 1];
        _.length === 0 || Ut.size !== mt || Ut.endIndex !== bt - 1 ? _.push({ endIndex: bt, size: mt, startIndex: bt }) : _[_.length - 1].endIndex++;
      }
      _.length > 0 && (w = {
        ...w,
        [de]: _
      }), n.pubIn(w);
    });
  }), [P, K] = et(b), [Z, J] = et(b), [X, N] = et(b), [M, A] = et(b), pe = g.useCallback(
    (h) => {
      if (o) {
        const oe = parseInt(h.dataset.index ?? "");
        n.pub(de, [
          {
            startIndex: oe,
            endIndex: oe,
            size: o.itemHeight
          }
        ]);
      }
      b.observe(h);
    },
    [b, n, o]
  ), Ze = g.useCallback(
    (h) => {
      b.unobserve(h);
    },
    [b]
  ), E = g.useRef(null), ne = g.useRef(null), Je = g.useCallback(
    (h) => {
      h ? (ne.current = h, b.observe(h, { box: "border-box" })) : ne.current && (b.unobserve(ne.current), ne.current = null);
    },
    [b]
  ), z = g.useRef(null), xe = ps(E, ne, z), ie = g.useCallback((h) => {
    E.current && (E.current.scrollTop += h);
  }, []), Q = g.useCallback(() => {
    const h = E.current;
    if (h !== null) {
      if (z.current !== null) {
        const oe = h.scrollHeight - h.clientHeight;
        fn(h.scrollTop, Math.min(oe, z.current)) && (z.current = null, n.pub(Nt, !1), n.pub(Ke, h.scrollTop));
      }
      n.pub(T, h.scrollTop);
    }
  }, [n]), Ce = g.useCallback(
    (h) => {
      n.pub(Yt, h.deltaY > 0 ? "down" : "up");
    },
    [n]
  ), re = g.useCallback(
    (h) => {
      h ? (n.pub(At, h), E.current = h, h.addEventListener("scroll", Q), h.addEventListener("wheel", Ce), o && n.pubIn({
        [G]: o.viewportHeight,
        [U]: o.viewportHeight,
        [T]: 0
      }), b.observe(h, { box: "border-box" })) : E.current && (E.current.removeEventListener("scroll", Q), E.current.removeEventListener("wheel", Ce), n.pub(At, null), b.unobserve(E.current), E.current = null);
    },
    [b, n, Q, Ce, o]
  ), { items: De } = H(Me);
  g.useLayoutEffect(() => n.sub(Le, xe), [xe, n]), g.useLayoutEffect(() => n.sub(se, ie), [ie, n]);
  const Kt = g.useCallback(() => {
    var oe;
    const h = [];
    for (const _ of ((oe = ne.current) == null ? void 0 : oe.children) ?? []) {
      if (_.dataset.index === void 0)
        continue;
      const w = parseInt(_.dataset.index), Xe = parseFloat(_.dataset.knownSize ?? ""), Se = _.getBoundingClientRect().height;
      if (Se === Xe)
        continue;
      const Oe = h[h.length - 1];
      h.length === 0 || Oe.size !== Se || Oe.endIndex !== w - 1 ? h.push({ endIndex: w, size: Se, startIndex: w }) : h[h.length - 1].endIndex++;
    }
    n.pub(de, h);
  }, [n]);
  g.useLayoutEffect(() => n.sub(Cn, Kt), [Kt, n]);
  const to = H(W), no = H(lt), oo = H(j), so = H(Dt), io = H(gt), ro = H(An), fe = H(ze), lo = H(Hn), uo = H(Ie), co = H(Ae);
  return g.useLayoutEffect(() => {
    De.length === 0 && n.pub(Dn);
  }, [De, n]), /* @__PURE__ */ y(po, { children: /* @__PURE__ */ en(
    x,
    {
      ...t,
      ref: re,
      "data-testid": "virtuoso-scroller",
      style: {
        overflowY: oo ? "hidden" : "scroll",
        boxSizing: "border-box",
        ...e
      },
      ...x === "div" ? { context: fe } : {},
      children: [
        i && /* @__PURE__ */ y(l, { ref: M, style: Qe, children: /* @__PURE__ */ y(i, { context: fe }) }),
        s && /* @__PURE__ */ y(r, { ref: X, style: Qe, children: /* @__PURE__ */ y(s, { context: fe }) }),
        uo > 0 ? /* @__PURE__ */ y(
          "div",
          {
            ref: Je,
            "data-testid": "virtuoso-list",
            style: {
              boxSizing: "content-box",
              height: co,
              paddingBottom: io,
              overflowAnchor: "none",
              marginTop: so,
              transition: ro,
              position: "relative",
              transform: `translateY(${to + no}px)`
            },
            children: De.map((h) => /* @__PURE__ */ y(
              fs,
              {
                mount: pe,
                unmount: Ze,
                item: h,
                ItemContent: m
              },
              lo({ index: h.index, data: h.data, context: fe })
            ))
          }
        ) : R ? /* @__PURE__ */ y(R, { context: fe }) : null,
        c && /* @__PURE__ */ y(p, { ref: P, style: Qe, children: /* @__PURE__ */ y(c, { context: fe }) }),
        a && /* @__PURE__ */ y(v, { ref: Z, style: Qe, children: /* @__PURE__ */ y(a, { context: fe }) })
      ]
    }
  ) });
};
function ms() {
  return H(Ge);
}
function ks() {
  return H(ct);
}
function Is() {
  const e = _t();
  return g.useMemo(() => eo(e), [e]);
}
export {
  hs as VirtuosoMessageList,
  cs as VirtuosoMessageListLicense,
  as as VirtuosoMessageListTestingContext,
  ks as useCurrentlyRenderedData,
  ms as useVirtuosoLocation,
  Is as useVirtuosoMethods
};
