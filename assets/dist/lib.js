var Vt = Object.defineProperty;
var Ut = (e, t, n) => t in e ? Vt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var E = (e, t, n) => (Ut(e, typeof t != "symbol" ? t + "" : t, n), n);
function R() {
}
function L(e, t) {
  for (const n in t)
    e[n] = t[n];
  return (
    /** @type {T & S} */
    e
  );
}
function At(e) {
  return e();
}
function $t() {
  return /* @__PURE__ */ Object.create(null);
}
function G(e) {
  e.forEach(At);
}
function Nt(e) {
  return typeof e == "function";
}
function Tt(e, t) {
  return e != e ? t == t : e !== t || e && typeof e == "object" || typeof e == "function";
}
function qt(e) {
  return Object.keys(e).length === 0;
}
function Dt(e) {
  const t = {};
  for (const n in e)
    n[0] !== "$" && (t[n] = e[n]);
  return t;
}
function _t(e, t) {
  const n = {};
  t = new Set(t);
  for (const l in e)
    !t.has(l) && l[0] !== "$" && (n[l] = e[l]);
  return n;
}
const Ft = typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : (
  // @ts-ignore Node typings have this
  global
);
function S(e, t) {
  e.appendChild(t);
}
function C(e, t, n) {
  e.insertBefore(t, n || null);
}
function k(e) {
  e.parentNode && e.parentNode.removeChild(e);
}
function z(e, t) {
  for (let n = 0; n < e.length; n += 1)
    e[n] && e[n].d(t);
}
function W(e) {
  return document.createElement(e);
}
function O(e) {
  return document.createElementNS("http://www.w3.org/2000/svg", e);
}
function Z(e) {
  return document.createTextNode(e);
}
function Gt() {
  return Z(" ");
}
function M() {
  return Z("");
}
function Kt(e, t, n, l) {
  return e.addEventListener(t, n, l), () => e.removeEventListener(t, n, l);
}
function V(e, t, n) {
  n == null ? e.removeAttribute(t) : e.getAttribute(t) !== n && e.setAttribute(t, n);
}
function v(e, t) {
  for (const n in t)
    V(e, n, t[n]);
}
function Qt(e) {
  return Array.from(e.childNodes);
}
function Wt(e, t) {
  t = "" + t, e.data !== t && (e.data = /** @type {string} */
  t);
}
function Xt(e) {
  const t = {};
  return e.childNodes.forEach(
    /** @param {Element} node */
    (n) => {
      t[n.slot || "default"] = !0;
    }
  ), t;
}
let tt;
function U(e) {
  tt = e;
}
const H = [], gt = [];
let J = [];
const mt = [], Yt = /* @__PURE__ */ Promise.resolve();
let X = !1;
function Zt() {
  X || (X = !0, Yt.then(I));
}
function Y(e) {
  J.push(e);
}
const Q = /* @__PURE__ */ new Set();
let B = 0;
function I() {
  if (B !== 0)
    return;
  const e = tt;
  do {
    try {
      for (; B < H.length; ) {
        const t = H[B];
        B++, U(t), te(t.$$);
      }
    } catch (t) {
      throw H.length = 0, B = 0, t;
    }
    for (U(null), H.length = 0, B = 0; gt.length; )
      gt.pop()();
    for (let t = 0; t < J.length; t += 1) {
      const n = J[t];
      Q.has(n) || (Q.add(n), n());
    }
    J.length = 0;
  } while (H.length);
  for (; mt.length; )
    mt.pop()();
  X = !1, Q.clear(), U(e);
}
function te(e) {
  if (e.fragment !== null) {
    e.update(), G(e.before_update);
    const t = e.dirty;
    e.dirty = [-1], e.fragment && e.fragment.p(e.ctx, t), e.after_update.forEach(Y);
  }
}
function ee(e) {
  const t = [], n = [];
  J.forEach((l) => e.indexOf(l) === -1 ? t.push(l) : n.push(l)), n.forEach((l) => l()), J = t;
}
const D = /* @__PURE__ */ new Set();
let ne;
function Pt(e, t) {
  e && e.i && (D.delete(e), e.i(t));
}
function le(e, t, n, l) {
  if (e && e.o) {
    if (D.has(e))
      return;
    D.add(e), ne.c.push(() => {
      D.delete(e), l && (n && e.d(1), l());
    }), e.o(t);
  } else
    l && l();
}
function x(e) {
  return (e == null ? void 0 : e.length) !== void 0 ? e : Array.from(e);
}
function A(e, t) {
  const n = {}, l = {}, i = { $$scope: 1 };
  let r = e.length;
  for (; r--; ) {
    const o = e[r], u = t[r];
    if (u) {
      for (const f in o)
        f in u || (l[f] = 1);
      for (const f in u)
        i[f] || (n[f] = u[f], i[f] = 1);
      e[r] = u;
    } else
      for (const f in o)
        i[f] = 1;
  }
  for (const o in l)
    o in n || (n[o] = void 0);
  return n;
}
function ie(e) {
  e && e.c();
}
function zt(e, t, n) {
  const { fragment: l, after_update: i } = e.$$;
  l && l.m(t, n), Y(() => {
    const r = e.$$.on_mount.map(At).filter(Nt);
    e.$$.on_destroy ? e.$$.on_destroy.push(...r) : G(r), e.$$.on_mount = [];
  }), i.forEach(Y);
}
function Mt(e, t) {
  const n = e.$$;
  n.fragment !== null && (ee(n.after_update), G(n.on_destroy), n.fragment && n.fragment.d(t), n.on_destroy = n.fragment = null, n.ctx = []);
}
function se(e, t) {
  e.$$.dirty[0] === -1 && (H.push(e), Zt(), e.$$.dirty.fill(0)), e.$$.dirty[t / 31 | 0] |= 1 << t % 31;
}
function Bt(e, t, n, l, i, r, o = null, u = [-1]) {
  const f = tt;
  U(e);
  const h = e.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: r,
    update: R,
    not_equal: i,
    bound: $t(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(t.context || (f ? f.$$.context : [])),
    // everything else
    callbacks: $t(),
    dirty: u,
    skip_bound: !1,
    root: t.target || f.$$.root
  };
  o && o(h.root);
  let a = !1;
  if (h.ctx = n ? n(e, t.props || {}, (m, _, ...j) => {
    const g = j.length ? j[0] : _;
    return h.ctx && i(h.ctx[m], h.ctx[m] = g) && (!h.skip_bound && h.bound[m] && h.bound[m](g), a && se(e, m)), _;
  }) : [], h.update(), a = !0, G(h.before_update), h.fragment = l ? l(h.ctx) : !1, t.target) {
    if (t.hydrate) {
      const m = Qt(t.target);
      h.fragment && h.fragment.l(m), m.forEach(k);
    } else
      h.fragment && h.fragment.c();
    t.intro && Pt(e.$$.fragment), zt(e, t.target, t.anchor), I();
  }
  U(f);
}
let Ht;
typeof HTMLElement == "function" && (Ht = class extends HTMLElement {
  constructor(t, n, l) {
    super();
    /** The Svelte component constructor */
    E(this, "$$ctor");
    /** Slots */
    E(this, "$$s");
    /** The Svelte component instance */
    E(this, "$$c");
    /** Whether or not the custom element is connected */
    E(this, "$$cn", !1);
    /** Component props data */
    E(this, "$$d", {});
    /** `true` if currently in the process of reflecting component props back to attributes */
    E(this, "$$r", !1);
    /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
    E(this, "$$p_d", {});
    /** @type {Record<string, Function[]>} Event listeners */
    E(this, "$$l", {});
    /** @type {Map<Function, Function>} Event listener unsubscribe functions */
    E(this, "$$l_u", /* @__PURE__ */ new Map());
    this.$$ctor = t, this.$$s = n, l && this.attachShadow({ mode: "open" });
  }
  addEventListener(t, n, l) {
    if (this.$$l[t] = this.$$l[t] || [], this.$$l[t].push(n), this.$$c) {
      const i = this.$$c.$on(t, n);
      this.$$l_u.set(n, i);
    }
    super.addEventListener(t, n, l);
  }
  removeEventListener(t, n, l) {
    if (super.removeEventListener(t, n, l), this.$$c) {
      const i = this.$$l_u.get(n);
      i && (i(), this.$$l_u.delete(n));
    }
  }
  async connectedCallback() {
    if (this.$$cn = !0, !this.$$c) {
      let n = function(o) {
        return () => {
          let u;
          return {
            c: function() {
              u = W("slot"), o !== "default" && V(u, "name", o);
            },
            /**
             * @param {HTMLElement} target
             * @param {HTMLElement} [anchor]
             */
            m: function(a, m) {
              C(a, u, m);
            },
            d: function(a) {
              a && k(u);
            }
          };
        };
      };
      var t = n;
      if (await Promise.resolve(), !this.$$cn)
        return;
      const l = {}, i = Xt(this);
      for (const o of this.$$s)
        o in i && (l[o] = [n(o)]);
      for (const o of this.attributes) {
        const u = this.$$g_p(o.name);
        u in this.$$d || (this.$$d[u] = F(u, o.value, this.$$p_d, "toProp"));
      }
      this.$$c = new this.$$ctor({
        target: this.shadowRoot || this,
        props: {
          ...this.$$d,
          $$slots: l,
          $$scope: {
            ctx: []
          }
        }
      });
      const r = () => {
        this.$$r = !0;
        for (const o in this.$$p_d)
          if (this.$$d[o] = this.$$c.$$.ctx[this.$$c.$$.props[o]], this.$$p_d[o].reflect) {
            const u = F(
              o,
              this.$$d[o],
              this.$$p_d,
              "toAttribute"
            );
            u == null ? this.removeAttribute(this.$$p_d[o].attribute || o) : this.setAttribute(this.$$p_d[o].attribute || o, u);
          }
        this.$$r = !1;
      };
      this.$$c.$$.after_update.push(r), r();
      for (const o in this.$$l)
        for (const u of this.$$l[o]) {
          const f = this.$$c.$on(o, u);
          this.$$l_u.set(u, f);
        }
      this.$$l = {};
    }
  }
  // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
  // and setting attributes through setAttribute etc, this is helpful
  attributeChangedCallback(t, n, l) {
    var i;
    this.$$r || (t = this.$$g_p(t), this.$$d[t] = F(t, l, this.$$p_d, "toProp"), (i = this.$$c) == null || i.$set({ [t]: this.$$d[t] }));
  }
  disconnectedCallback() {
    this.$$cn = !1, Promise.resolve().then(() => {
      this.$$cn || (this.$$c.$destroy(), this.$$c = void 0);
    });
  }
  $$g_p(t) {
    return Object.keys(this.$$p_d).find(
      (n) => this.$$p_d[n].attribute === t || !this.$$p_d[n].attribute && n.toLowerCase() === t
    ) || t;
  }
});
function F(e, t, n, l) {
  var r;
  const i = (r = n[e]) == null ? void 0 : r.type;
  if (t = i === "Boolean" && typeof t != "boolean" ? t != null : t, !l || !n[e])
    return t;
  if (l === "toAttribute")
    switch (i) {
      case "Object":
      case "Array":
        return t == null ? null : JSON.stringify(t);
      case "Boolean":
        return t ? "" : null;
      case "Number":
        return t ?? null;
      default:
        return t;
    }
  else
    switch (i) {
      case "Object":
      case "Array":
        return t && JSON.parse(t);
      case "Boolean":
        return t;
      case "Number":
        return t != null ? +t : t;
      default:
        return t;
    }
}
function It(e, t, n, l, i, r) {
  let o = class extends Ht {
    constructor() {
      super(e, n, i), this.$$p_d = t;
    }
    static get observedAttributes() {
      return Object.keys(t).map(
        (u) => (t[u].attribute || u).toLowerCase()
      );
    }
  };
  return Object.keys(t).forEach((u) => {
    Object.defineProperty(o.prototype, u, {
      get() {
        return this.$$c && u in this.$$c ? this.$$c[u] : this.$$d[u];
      },
      set(f) {
        var h;
        f = F(u, f, t), this.$$d[u] = f, (h = this.$$c) == null || h.$set({ [u]: f });
      }
    });
  }), l.forEach((u) => {
    Object.defineProperty(o.prototype, u, {
      get() {
        var f;
        return (f = this.$$c) == null ? void 0 : f[u];
      }
    });
  }), r && (o = r(o)), e.element = /** @type {any} */
  o, o;
}
class Jt {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    E(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    E(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    Mt(this, 1), this.$destroy = R;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(t, n) {
    if (!Nt(n))
      return R;
    const l = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
    return l.push(n), () => {
      const i = l.indexOf(n);
      i !== -1 && l.splice(i, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(t) {
    this.$$set && !qt(t) && (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1);
  }
}
const ce = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(ce);
function pt(e, t, n) {
  const l = e.slice();
  return l[6] = t[n], l;
}
function bt(e, t, n) {
  const l = e.slice();
  return l[6] = t[n], l;
}
function wt(e, t, n) {
  const l = e.slice();
  return l[6] = t[n], l;
}
function yt(e, t, n) {
  const l = e.slice();
  return l[6] = t[n], l;
}
function vt(e, t, n) {
  const l = e.slice();
  return l[6] = t[n], l;
}
function kt(e, t, n) {
  const l = e.slice();
  return l[6] = t[n], l;
}
function Et(e) {
  let t, n;
  return {
    c() {
      t = O("title"), n = Z(
        /*title*/
        e[1]
      );
    },
    m(l, i) {
      C(l, t, i), S(t, n);
    },
    p(l, i) {
      i & /*title*/
      2 && Wt(
        n,
        /*title*/
        l[1]
      );
    },
    d(l) {
      l && k(t);
    }
  };
}
function xt(e) {
  let t, n = [
    /*a*/
    e[6]
  ], l = {};
  for (let i = 0; i < n.length; i += 1)
    l = L(l, n[i]);
  return {
    c() {
      t = O("path"), v(t, l);
    },
    m(i, r) {
      C(i, t, r);
    },
    p(i, r) {
      v(t, l = A(n, [r & /*icon*/
      4 && /*a*/
      i[6]]));
    },
    d(i) {
      i && k(t);
    }
  };
}
function Ct(e) {
  let t, n = [
    /*a*/
    e[6]
  ], l = {};
  for (let i = 0; i < n.length; i += 1)
    l = L(l, n[i]);
  return {
    c() {
      t = O("rect"), v(t, l);
    },
    m(i, r) {
      C(i, t, r);
    },
    p(i, r) {
      v(t, l = A(n, [r & /*icon*/
      4 && /*a*/
      i[6]]));
    },
    d(i) {
      i && k(t);
    }
  };
}
function jt(e) {
  let t, n = [
    /*a*/
    e[6]
  ], l = {};
  for (let i = 0; i < n.length; i += 1)
    l = L(l, n[i]);
  return {
    c() {
      t = O("circle"), v(t, l);
    },
    m(i, r) {
      C(i, t, r);
    },
    p(i, r) {
      v(t, l = A(n, [r & /*icon*/
      4 && /*a*/
      i[6]]));
    },
    d(i) {
      i && k(t);
    }
  };
}
function Lt(e) {
  let t, n = [
    /*a*/
    e[6]
  ], l = {};
  for (let i = 0; i < n.length; i += 1)
    l = L(l, n[i]);
  return {
    c() {
      t = O("polygon"), v(t, l);
    },
    m(i, r) {
      C(i, t, r);
    },
    p(i, r) {
      v(t, l = A(n, [r & /*icon*/
      4 && /*a*/
      i[6]]));
    },
    d(i) {
      i && k(t);
    }
  };
}
function Ot(e) {
  let t, n = [
    /*a*/
    e[6]
  ], l = {};
  for (let i = 0; i < n.length; i += 1)
    l = L(l, n[i]);
  return {
    c() {
      t = O("polyline"), v(t, l);
    },
    m(i, r) {
      C(i, t, r);
    },
    p(i, r) {
      v(t, l = A(n, [r & /*icon*/
      4 && /*a*/
      i[6]]));
    },
    d(i) {
      i && k(t);
    }
  };
}
function St(e) {
  let t, n = [
    /*a*/
    e[6]
  ], l = {};
  for (let i = 0; i < n.length; i += 1)
    l = L(l, n[i]);
  return {
    c() {
      t = O("line"), v(t, l);
    },
    m(i, r) {
      C(i, t, r);
    },
    p(i, r) {
      v(t, l = A(n, [r & /*icon*/
      4 && /*a*/
      i[6]]));
    },
    d(i) {
      i && k(t);
    }
  };
}
function oe(e) {
  var et, nt, lt, it, st, ct, ot;
  let t, n, l, i, r, o, u, f = (
    /*title*/
    e[1] && Et(e)
  ), h = x(
    /*icon*/
    ((et = e[2]) == null ? void 0 : et.path) ?? []
  ), a = [];
  for (let s = 0; s < h.length; s += 1)
    a[s] = xt(kt(e, h, s));
  let m = x(
    /*icon*/
    ((nt = e[2]) == null ? void 0 : nt.rect) ?? []
  ), _ = [];
  for (let s = 0; s < m.length; s += 1)
    _[s] = Ct(vt(e, m, s));
  let j = x(
    /*icon*/
    ((lt = e[2]) == null ? void 0 : lt.circle) ?? []
  ), g = [];
  for (let s = 0; s < j.length; s += 1)
    g[s] = jt(yt(e, j, s));
  let N = x(
    /*icon*/
    ((it = e[2]) == null ? void 0 : it.polygon) ?? []
  ), b = [];
  for (let s = 0; s < N.length; s += 1)
    b[s] = Lt(wt(e, N, s));
  let T = x(
    /*icon*/
    ((st = e[2]) == null ? void 0 : st.polyline) ?? []
  ), w = [];
  for (let s = 0; s < T.length; s += 1)
    w[s] = Ot(bt(e, T, s));
  let P = x(
    /*icon*/
    ((ct = e[2]) == null ? void 0 : ct.line) ?? []
  ), y = [];
  for (let s = 0; s < P.length; s += 1)
    y[s] = St(pt(e, P, s));
  let K = [
    /*icon*/
    (ot = e[2]) == null ? void 0 : ot.a,
    { xmlns: "http://www.w3.org/2000/svg" },
    { width: (
      /*size*/
      e[0]
    ) },
    { height: (
      /*size*/
      e[0]
    ) },
    /*$$restProps*/
    e[3]
  ], q = {};
  for (let s = 0; s < K.length; s += 1)
    q = L(q, K[s]);
  return {
    c() {
      t = O("svg"), f && f.c(), n = M();
      for (let s = 0; s < a.length; s += 1)
        a[s].c();
      l = M();
      for (let s = 0; s < _.length; s += 1)
        _[s].c();
      i = M();
      for (let s = 0; s < g.length; s += 1)
        g[s].c();
      r = M();
      for (let s = 0; s < b.length; s += 1)
        b[s].c();
      o = M();
      for (let s = 0; s < w.length; s += 1)
        w[s].c();
      u = M();
      for (let s = 0; s < y.length; s += 1)
        y[s].c();
      v(t, q);
    },
    m(s, $) {
      C(s, t, $), f && f.m(t, null), S(t, n);
      for (let d = 0; d < a.length; d += 1)
        a[d] && a[d].m(t, null);
      S(t, l);
      for (let d = 0; d < _.length; d += 1)
        _[d] && _[d].m(t, null);
      S(t, i);
      for (let d = 0; d < g.length; d += 1)
        g[d] && g[d].m(t, null);
      S(t, r);
      for (let d = 0; d < b.length; d += 1)
        b[d] && b[d].m(t, null);
      S(t, o);
      for (let d = 0; d < w.length; d += 1)
        w[d] && w[d].m(t, null);
      S(t, u);
      for (let d = 0; d < y.length; d += 1)
        y[d] && y[d].m(t, null);
    },
    p(s, [$]) {
      var d, rt, ft, ut, ht, at, dt;
      if (/*title*/
      s[1] ? f ? f.p(s, $) : (f = Et(s), f.c(), f.m(t, n)) : f && (f.d(1), f = null), $ & /*icon*/
      4) {
        h = x(
          /*icon*/
          ((d = s[2]) == null ? void 0 : d.path) ?? []
        );
        let c;
        for (c = 0; c < h.length; c += 1) {
          const p = kt(s, h, c);
          a[c] ? a[c].p(p, $) : (a[c] = xt(p), a[c].c(), a[c].m(t, l));
        }
        for (; c < a.length; c += 1)
          a[c].d(1);
        a.length = h.length;
      }
      if ($ & /*icon*/
      4) {
        m = x(
          /*icon*/
          ((rt = s[2]) == null ? void 0 : rt.rect) ?? []
        );
        let c;
        for (c = 0; c < m.length; c += 1) {
          const p = vt(s, m, c);
          _[c] ? _[c].p(p, $) : (_[c] = Ct(p), _[c].c(), _[c].m(t, i));
        }
        for (; c < _.length; c += 1)
          _[c].d(1);
        _.length = m.length;
      }
      if ($ & /*icon*/
      4) {
        j = x(
          /*icon*/
          ((ft = s[2]) == null ? void 0 : ft.circle) ?? []
        );
        let c;
        for (c = 0; c < j.length; c += 1) {
          const p = yt(s, j, c);
          g[c] ? g[c].p(p, $) : (g[c] = jt(p), g[c].c(), g[c].m(t, r));
        }
        for (; c < g.length; c += 1)
          g[c].d(1);
        g.length = j.length;
      }
      if ($ & /*icon*/
      4) {
        N = x(
          /*icon*/
          ((ut = s[2]) == null ? void 0 : ut.polygon) ?? []
        );
        let c;
        for (c = 0; c < N.length; c += 1) {
          const p = wt(s, N, c);
          b[c] ? b[c].p(p, $) : (b[c] = Lt(p), b[c].c(), b[c].m(t, o));
        }
        for (; c < b.length; c += 1)
          b[c].d(1);
        b.length = N.length;
      }
      if ($ & /*icon*/
      4) {
        T = x(
          /*icon*/
          ((ht = s[2]) == null ? void 0 : ht.polyline) ?? []
        );
        let c;
        for (c = 0; c < T.length; c += 1) {
          const p = bt(s, T, c);
          w[c] ? w[c].p(p, $) : (w[c] = Ot(p), w[c].c(), w[c].m(t, u));
        }
        for (; c < w.length; c += 1)
          w[c].d(1);
        w.length = T.length;
      }
      if ($ & /*icon*/
      4) {
        P = x(
          /*icon*/
          ((at = s[2]) == null ? void 0 : at.line) ?? []
        );
        let c;
        for (c = 0; c < P.length; c += 1) {
          const p = pt(s, P, c);
          y[c] ? y[c].p(p, $) : (y[c] = St(p), y[c].c(), y[c].m(t, null));
        }
        for (; c < y.length; c += 1)
          y[c].d(1);
        y.length = P.length;
      }
      v(t, q = A(K, [
        $ & /*icon*/
        4 && /*icon*/
        ((dt = s[2]) == null ? void 0 : dt.a),
        { xmlns: "http://www.w3.org/2000/svg" },
        $ & /*size*/
        1 && { width: (
          /*size*/
          s[0]
        ) },
        $ & /*size*/
        1 && { height: (
          /*size*/
          s[0]
        ) },
        $ & /*$$restProps*/
        8 && /*$$restProps*/
        s[3]
      ]));
    },
    i: R,
    o: R,
    d(s) {
      s && k(t), f && f.d(), z(a, s), z(_, s), z(g, s), z(b, s), z(w, s), z(y, s);
    }
  };
}
function re(e, t, n) {
  let l;
  const i = ["src", "size", "theme", "title"];
  let r = _t(t, i), { src: o } = t, { size: u = "100%" } = t, { theme: f = "default" } = t, { title: h = void 0 } = t;
  if (u !== "100%" && u.slice(-1) != "x" && u.slice(-1) != "m" && u.slice(-1) != "%")
    try {
      u = parseInt(u) + "px";
    } catch {
      u = "100%";
    }
  return e.$$set = (a) => {
    t = L(L({}, t), Dt(a)), n(3, r = _t(t, i)), "src" in a && n(4, o = a.src), "size" in a && n(0, u = a.size), "theme" in a && n(5, f = a.theme), "title" in a && n(1, h = a.title);
  }, e.$$.update = () => {
    e.$$.dirty & /*src, theme*/
    48 && n(2, l = (o == null ? void 0 : o[f]) ?? (o == null ? void 0 : o.default));
  }, [u, h, l, r, o, f];
}
class Rt extends Jt {
  constructor(t) {
    super(), Bt(this, t, re, oe, Tt, { src: 4, size: 0, theme: 5, title: 1 });
  }
  get src() {
    return this.$$.ctx[4];
  }
  set src(t) {
    this.$$set({ src: t }), I();
  }
  get size() {
    return this.$$.ctx[0];
  }
  set size(t) {
    this.$$set({ size: t }), I();
  }
  get theme() {
    return this.$$.ctx[5];
  }
  set theme(t) {
    this.$$set({ theme: t }), I();
  }
  get title() {
    return this.$$.ctx[1];
  }
  set title(t) {
    this.$$set({ title: t }), I();
  }
}
It(Rt, { src: {}, size: {}, theme: {}, title: {} }, [], [], !0);
const fe = { default: { a: { class: "icon icon-tabler icon-tabler-clipboard", width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, path: [{ stroke: "none", d: "M0 0h24v24H0z", fill: "none" }, { d: "M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" }, { d: "M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" }] } }, { customElements: ue } = Ft;
function he(e) {
  let t, n, l, i, r, o, u;
  return i = new Rt({ props: { src: fe, class: "w-4" } }), {
    c() {
      t = W("link"), n = Gt(), l = W("button"), ie(i.$$.fragment), V(t, "href", "./assets/dist/style.css"), V(t, "rel", "stylesheet"), V(l, "class", "bg-transparent border-0 text-success-200 hover:text-success-400 active:text-success-500 hover:scale-105 active:scale-110 transform font-sans absolute top-2 right-2");
    },
    m(f, h) {
      C(f, t, h), C(f, n, h), C(f, l, h), zt(i, l, null), r = !0, o || (u = Kt(l, "click", ae), o = !0);
    },
    p: R,
    i(f) {
      r || (Pt(i.$$.fragment, f), r = !0);
    },
    o(f) {
      le(i.$$.fragment, f), r = !1;
    },
    d(f) {
      f && (k(t), k(n), k(l)), Mt(i), o = !1, u();
    }
  };
}
function ae(e) {
  const { currentTarget: t } = e;
  if (e.composed) {
    const n = e.composedPath().findIndex((i) => i instanceof HTMLElement && customElements.get(i == null ? void 0 : i.localName)), l = e.composedPath()[n + 1];
    if (!(l instanceof HTMLElement))
      return;
    l.textContent && navigator.clipboard.writeText(l.textContent);
  } else {
    if (!(t instanceof HTMLElement))
      return;
    const { previousElementSibling: n, nextElementSibling: l } = t;
    if (!n && !l)
      return;
    n != null && n.textContent ? navigator.clipboard.writeText(n.textContent) : l != null && l.textContent && navigator.clipboard.writeText(l.textContent);
  }
}
class de extends Jt {
  constructor(t) {
    super(), Bt(this, t, null, he, Tt, {});
  }
}
ue.define("spr-copy-button", It(de, {}, [], [], !0));
