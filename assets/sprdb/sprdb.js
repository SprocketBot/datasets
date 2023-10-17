function p(i, t, e, n) {
  function s(r) {
    return r instanceof e ? r : new e(function(o) {
      o(r);
    });
  }
  return new (e || (e = Promise))(function(r, o) {
    function a(d) {
      try {
        u(n.next(d));
      } catch (h) {
        o(h);
      }
    }
    function c(d) {
      try {
        u(n.throw(d));
      } catch (h) {
        o(h);
      }
    }
    function u(d) {
      d.done ? r(d.value) : s(d.value).then(a, c);
    }
    u((n = n.apply(i, t || [])).next());
  });
}
function Pn(i) {
  var t = typeof Symbol == "function" && Symbol.iterator, e = t && i[t], n = 0;
  if (e)
    return e.call(i);
  if (i && typeof i.length == "number")
    return {
      next: function() {
        return i && n >= i.length && (i = void 0), { value: i && i[n++], done: !i };
      }
    };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function E(i) {
  return this instanceof E ? (this.v = i, this) : new E(i);
}
function At(i, t, e) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var n = e.apply(i, t || []), s, r = [];
  return s = {}, o("next"), o("throw"), o("return"), s[Symbol.asyncIterator] = function() {
    return this;
  }, s;
  function o(f) {
    n[f] && (s[f] = function(T) {
      return new Promise(function(j, Vt) {
        r.push([f, T, j, Vt]) > 1 || a(f, T);
      });
    });
  }
  function a(f, T) {
    try {
      c(n[f](T));
    } catch (j) {
      h(r[0][3], j);
    }
  }
  function c(f) {
    f.value instanceof E ? Promise.resolve(f.value.v).then(u, d) : h(r[0][2], f);
  }
  function u(f) {
    a("next", f);
  }
  function d(f) {
    a("throw", f);
  }
  function h(f, T) {
    f(T), r.shift(), r.length && a(r[0][0], r[0][1]);
  }
}
function Ke(i) {
  var t, e;
  return t = {}, n("next"), n("throw", function(s) {
    throw s;
  }), n("return"), t[Symbol.iterator] = function() {
    return this;
  }, t;
  function n(s, r) {
    t[s] = i[s] ? function(o) {
      return (e = !e) ? { value: E(i[s](o)), done: !1 } : r ? r(o) : o;
    } : r;
  }
}
function oe(i) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = i[Symbol.asyncIterator], e;
  return t ? t.call(i) : (i = typeof Pn == "function" ? Pn(i) : i[Symbol.iterator](), e = {}, n("next"), n("throw"), n("return"), e[Symbol.asyncIterator] = function() {
    return this;
  }, e);
  function n(r) {
    e[r] = i[r] && function(o) {
      return new Promise(function(a, c) {
        o = i[r](o), s(a, c, o.done, o.value);
      });
    };
  }
  function s(r, o, a, c) {
    Promise.resolve(c).then(function(u) {
      r({ value: u, done: a });
    }, o);
  }
}
const Kr = new TextDecoder("utf-8"), Hi = (i) => Kr.decode(i), Jr = new TextEncoder(), cn = (i) => Jr.encode(i), Zr = (i) => typeof i == "number", ss = (i) => typeof i == "boolean", Y = (i) => typeof i == "function", tt = (i) => i != null && Object(i) === i, ae = (i) => tt(i) && Y(i.then), ze = (i) => tt(i) && Y(i[Symbol.iterator]), Oe = (i) => tt(i) && Y(i[Symbol.asyncIterator]), Qi = (i) => tt(i) && tt(i.schema), rs = (i) => tt(i) && "done" in i && "value" in i, os = (i) => tt(i) && Y(i.stat) && Zr(i.fd), as = (i) => tt(i) && ln(i.body), Li = (i) => "_getDOMStream" in i && "_getNodeStream" in i, Xr = (i) => tt(i) && Y(i.abort) && Y(i.getWriter) && !Li(i), ln = (i) => tt(i) && Y(i.cancel) && Y(i.getReader) && !Li(i), to = (i) => tt(i) && Y(i.end) && Y(i.write) && ss(i.writable) && !Li(i), cs = (i) => tt(i) && Y(i.read) && Y(i.pipe) && ss(i.readable) && !Li(i), eo = (i) => tt(i) && Y(i.clear) && Y(i.bytes) && Y(i.position) && Y(i.setPosition) && Y(i.capacity) && Y(i.getBufferIdentifier) && Y(i.createLong), un = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : ArrayBuffer;
function io(i) {
  const t = i[0] ? [i[0]] : [];
  let e, n, s, r;
  for (let o, a, c = 0, u = 0, d = i.length; ++c < d; ) {
    if (o = t[u], a = i[c], !o || !a || o.buffer !== a.buffer || a.byteOffset < o.byteOffset) {
      a && (t[++u] = a);
      continue;
    }
    if ({ byteOffset: e, byteLength: s } = o, { byteOffset: n, byteLength: r } = a, e + s < n || n + r < e) {
      a && (t[++u] = a);
      continue;
    }
    t[u] = new Uint8Array(o.buffer, e, n - e + r);
  }
  return t;
}
function xn(i, t, e = 0, n = t.byteLength) {
  const s = i.byteLength, r = new Uint8Array(i.buffer, i.byteOffset, s), o = new Uint8Array(t.buffer, t.byteOffset, Math.min(n, s));
  return r.set(o, e), i;
}
function Ot(i, t) {
  const e = io(i), n = e.reduce((d, h) => d + h.byteLength, 0);
  let s, r, o, a = 0, c = -1;
  const u = Math.min(t || Number.POSITIVE_INFINITY, n);
  for (const d = e.length; ++c < d; ) {
    if (s = e[c], r = s.subarray(0, Math.min(s.length, u - a)), u <= a + r.length) {
      r.length < s.length ? e[c] = s.subarray(r.length) : r.length === s.length && c++, o ? xn(o, r, a) : o = r;
      break;
    }
    xn(o || (o = new Uint8Array(u)), r, a), a += r.length;
  }
  return [o || new Uint8Array(0), e.slice(c), n - (o ? o.byteLength : 0)];
}
function k(i, t) {
  let e = rs(t) ? t.value : t;
  return e instanceof i ? i === Uint8Array ? new i(e.buffer, e.byteOffset, e.byteLength) : e : e ? (typeof e == "string" && (e = cn(e)), e instanceof ArrayBuffer ? new i(e) : e instanceof un ? new i(e) : eo(e) ? k(i, e.bytes()) : ArrayBuffer.isView(e) ? e.byteLength <= 0 ? new i(0) : new i(e.buffer, e.byteOffset, e.byteLength / i.BYTES_PER_ELEMENT) : i.from(e)) : new i(0);
}
const Re = (i) => k(Int32Array, i), N = (i) => k(Uint8Array, i), Ki = (i) => (i.next(), i);
function* no(i, t) {
  const e = function* (s) {
    yield s;
  }, n = typeof t == "string" || ArrayBuffer.isView(t) || t instanceof ArrayBuffer || t instanceof un ? e(t) : ze(t) ? t : e(t);
  return yield* Ki(function* (s) {
    let r = null;
    do
      r = s.next(yield k(i, r));
    while (!r.done);
  }(n[Symbol.iterator]())), new i();
}
const so = (i) => no(Uint8Array, i);
function ls(i, t) {
  return At(this, arguments, function* () {
    if (ae(t))
      return yield E(yield E(yield* Ke(oe(ls(i, yield E(t))))));
    const n = function(o) {
      return At(this, arguments, function* () {
        yield yield E(yield E(o));
      });
    }, s = function(o) {
      return At(this, arguments, function* () {
        yield E(yield* Ke(oe(Ki(function* (a) {
          let c = null;
          do
            c = a.next(yield c == null ? void 0 : c.value);
          while (!c.done);
        }(o[Symbol.iterator]())))));
      });
    }, r = typeof t == "string" || ArrayBuffer.isView(t) || t instanceof ArrayBuffer || t instanceof un ? n(t) : ze(t) ? s(t) : Oe(t) ? t : n(t);
    return yield E(
      // otherwise if AsyncIterable, use it
      yield* Ke(oe(Ki(function(o) {
        return At(this, arguments, function* () {
          let a = null;
          do
            a = yield E(o.next(yield yield E(k(i, a))));
          while (!a.done);
        });
      }(r[Symbol.asyncIterator]()))))
    ), yield E(new i());
  });
}
const ro = (i) => ls(Uint8Array, i);
function dn(i, t, e) {
  if (i !== 0) {
    e = e.slice(0, t + 1);
    for (let n = -1; ++n <= t; )
      e[n] += i;
  }
  return e;
}
function oo(i, t) {
  let e = 0;
  const n = i.length;
  if (n !== t.length)
    return !1;
  if (n > 0)
    do
      if (i[e] !== t[e])
        return !1;
    while (++e < n);
  return !0;
}
const lt = {
  fromIterable(i) {
    return qe(ao(i));
  },
  fromAsyncIterable(i) {
    return qe(co(i));
  },
  fromDOMStream(i) {
    return qe(lo(i));
  },
  fromNodeStream(i) {
    return qe(ho(i));
  },
  // @ts-ignore
  toDOMStream(i, t) {
    throw new Error('"toDOMStream" not available in this environment');
  },
  // @ts-ignore
  toNodeStream(i, t) {
    throw new Error('"toNodeStream" not available in this environment');
  }
}, qe = (i) => (i.next(), i);
function* ao(i) {
  let t, e = !1, n = [], s, r, o, a = 0;
  function c() {
    return r === "peek" ? Ot(n, o)[0] : ([s, n, a] = Ot(n, o), s);
  }
  ({ cmd: r, size: o } = yield null);
  const u = so(i)[Symbol.iterator]();
  try {
    do
      if ({ done: t, value: s } = Number.isNaN(o - a) ? u.next() : u.next(o - a), !t && s.byteLength > 0 && (n.push(s), a += s.byteLength), t || o <= a)
        do
          ({ cmd: r, size: o } = yield c());
        while (o < a);
    while (!t);
  } catch (d) {
    (e = !0) && typeof u.throw == "function" && u.throw(d);
  } finally {
    e === !1 && typeof u.return == "function" && u.return(null);
  }
  return null;
}
function co(i) {
  return At(this, arguments, function* () {
    let e, n = !1, s = [], r, o, a, c = 0;
    function u() {
      return o === "peek" ? Ot(s, a)[0] : ([r, s, c] = Ot(s, a), r);
    }
    ({ cmd: o, size: a } = yield yield E(null));
    const d = ro(i)[Symbol.asyncIterator]();
    try {
      do
        if ({ done: e, value: r } = Number.isNaN(a - c) ? yield E(d.next()) : yield E(d.next(a - c)), !e && r.byteLength > 0 && (s.push(r), c += r.byteLength), e || a <= c)
          do
            ({ cmd: o, size: a } = yield yield E(u()));
          while (a < c);
      while (!e);
    } catch (h) {
      (n = !0) && typeof d.throw == "function" && (yield E(d.throw(h)));
    } finally {
      n === !1 && typeof d.return == "function" && (yield E(d.return(new Uint8Array(0))));
    }
    return yield E(null);
  });
}
function lo(i) {
  return At(this, arguments, function* () {
    let e = !1, n = !1, s = [], r, o, a, c = 0;
    function u() {
      return o === "peek" ? Ot(s, a)[0] : ([r, s, c] = Ot(s, a), r);
    }
    ({ cmd: o, size: a } = yield yield E(null));
    const d = new uo(i);
    try {
      do
        if ({ done: e, value: r } = Number.isNaN(a - c) ? yield E(d.read()) : yield E(d.read(a - c)), !e && r.byteLength > 0 && (s.push(N(r)), c += r.byteLength), e || a <= c)
          do
            ({ cmd: o, size: a } = yield yield E(u()));
          while (a < c);
      while (!e);
    } catch (h) {
      (n = !0) && (yield E(d.cancel(h)));
    } finally {
      n === !1 ? yield E(d.cancel()) : i.locked && d.releaseLock();
    }
    return yield E(null);
  });
}
class uo {
  constructor(t) {
    this.source = t, this.reader = null, this.reader = this.source.getReader(), this.reader.closed.catch(() => {
    });
  }
  get closed() {
    return this.reader ? this.reader.closed.catch(() => {
    }) : Promise.resolve();
  }
  releaseLock() {
    this.reader && this.reader.releaseLock(), this.reader = null;
  }
  cancel(t) {
    return p(this, void 0, void 0, function* () {
      const { reader: e, source: n } = this;
      e && (yield e.cancel(t).catch(() => {
      })), n && n.locked && this.releaseLock();
    });
  }
  read(t) {
    return p(this, void 0, void 0, function* () {
      if (t === 0)
        return { done: this.reader == null, value: new Uint8Array(0) };
      const e = yield this.reader.read();
      return !e.done && (e.value = N(e)), e;
    });
  }
}
const Ci = (i, t) => {
  const e = (s) => n([t, s]);
  let n;
  return [t, e, new Promise((s) => (n = s) && i.once(t, e))];
};
function ho(i) {
  return At(this, arguments, function* () {
    const e = [];
    let n = "error", s = !1, r = null, o, a, c = 0, u = [], d;
    function h() {
      return o === "peek" ? Ot(u, a)[0] : ([d, u, c] = Ot(u, a), d);
    }
    if ({ cmd: o, size: a } = yield yield E(null), i.isTTY)
      return yield yield E(new Uint8Array(0)), yield E(null);
    try {
      e[0] = Ci(i, "end"), e[1] = Ci(i, "error");
      do {
        if (e[2] = Ci(i, "readable"), [n, r] = yield E(Promise.race(e.map((T) => T[2]))), n === "error")
          break;
        if ((s = n === "end") || (Number.isFinite(a - c) ? (d = N(i.read(a - c)), d.byteLength < a - c && (d = N(i.read()))) : d = N(i.read()), d.byteLength > 0 && (u.push(d), c += d.byteLength)), s || a <= c)
          do
            ({ cmd: o, size: a } = yield yield E(h()));
          while (a < c);
      } while (!s);
    } finally {
      yield E(f(e, n === "error" ? r : null));
    }
    return yield E(null);
    function f(T, j) {
      return d = u = null, new Promise((Vt, le) => {
        for (const [ue, Qr] of T)
          i.off(ue, Qr);
        try {
          const ue = i.destroy;
          ue && ue.call(i, j), j = void 0;
        } catch (ue) {
          j = ue || j;
        } finally {
          j != null ? le(j) : Vt();
        }
      });
    }
  });
}
var rt;
(function(i) {
  i[i.V1 = 0] = "V1", i[i.V2 = 1] = "V2", i[i.V3 = 2] = "V3", i[i.V4 = 3] = "V4", i[i.V5 = 4] = "V5";
})(rt || (rt = {}));
var ot;
(function(i) {
  i[i.Sparse = 0] = "Sparse", i[i.Dense = 1] = "Dense";
})(ot || (ot = {}));
var X;
(function(i) {
  i[i.HALF = 0] = "HALF", i[i.SINGLE = 1] = "SINGLE", i[i.DOUBLE = 2] = "DOUBLE";
})(X || (X = {}));
var Pt;
(function(i) {
  i[i.DAY = 0] = "DAY", i[i.MILLISECOND = 1] = "MILLISECOND";
})(Pt || (Pt = {}));
var R;
(function(i) {
  i[i.SECOND = 0] = "SECOND", i[i.MILLISECOND = 1] = "MILLISECOND", i[i.MICROSECOND = 2] = "MICROSECOND", i[i.NANOSECOND = 3] = "NANOSECOND";
})(R || (R = {}));
var Wt;
(function(i) {
  i[i.YEAR_MONTH = 0] = "YEAR_MONTH", i[i.DAY_TIME = 1] = "DAY_TIME", i[i.MONTH_DAY_NANO = 2] = "MONTH_DAY_NANO";
})(Wt || (Wt = {}));
var D;
(function(i) {
  i[i.NONE = 0] = "NONE", i[i.Schema = 1] = "Schema", i[i.DictionaryBatch = 2] = "DictionaryBatch", i[i.RecordBatch = 3] = "RecordBatch", i[i.Tensor = 4] = "Tensor", i[i.SparseTensor = 5] = "SparseTensor";
})(D || (D = {}));
var l;
(function(i) {
  i[i.NONE = 0] = "NONE", i[i.Null = 1] = "Null", i[i.Int = 2] = "Int", i[i.Float = 3] = "Float", i[i.Binary = 4] = "Binary", i[i.Utf8 = 5] = "Utf8", i[i.Bool = 6] = "Bool", i[i.Decimal = 7] = "Decimal", i[i.Date = 8] = "Date", i[i.Time = 9] = "Time", i[i.Timestamp = 10] = "Timestamp", i[i.Interval = 11] = "Interval", i[i.List = 12] = "List", i[i.Struct = 13] = "Struct", i[i.Union = 14] = "Union", i[i.FixedSizeBinary = 15] = "FixedSizeBinary", i[i.FixedSizeList = 16] = "FixedSizeList", i[i.Map = 17] = "Map", i[i.Dictionary = -1] = "Dictionary", i[i.Int8 = -2] = "Int8", i[i.Int16 = -3] = "Int16", i[i.Int32 = -4] = "Int32", i[i.Int64 = -5] = "Int64", i[i.Uint8 = -6] = "Uint8", i[i.Uint16 = -7] = "Uint16", i[i.Uint32 = -8] = "Uint32", i[i.Uint64 = -9] = "Uint64", i[i.Float16 = -10] = "Float16", i[i.Float32 = -11] = "Float32", i[i.Float64 = -12] = "Float64", i[i.DateDay = -13] = "DateDay", i[i.DateMillisecond = -14] = "DateMillisecond", i[i.TimestampSecond = -15] = "TimestampSecond", i[i.TimestampMillisecond = -16] = "TimestampMillisecond", i[i.TimestampMicrosecond = -17] = "TimestampMicrosecond", i[i.TimestampNanosecond = -18] = "TimestampNanosecond", i[i.TimeSecond = -19] = "TimeSecond", i[i.TimeMillisecond = -20] = "TimeMillisecond", i[i.TimeMicrosecond = -21] = "TimeMicrosecond", i[i.TimeNanosecond = -22] = "TimeNanosecond", i[i.DenseUnion = -23] = "DenseUnion", i[i.SparseUnion = -24] = "SparseUnion", i[i.IntervalDayTime = -25] = "IntervalDayTime", i[i.IntervalYearMonth = -26] = "IntervalYearMonth";
})(l || (l = {}));
var Lt;
(function(i) {
  i[i.OFFSET = 0] = "OFFSET", i[i.DATA = 1] = "DATA", i[i.VALIDITY = 2] = "VALIDITY", i[i.TYPE = 3] = "TYPE";
})(Lt || (Lt = {}));
const fo = void 0;
function Me(i) {
  if (i === null)
    return "null";
  if (i === fo)
    return "undefined";
  switch (typeof i) {
    case "number":
      return `${i}`;
    case "bigint":
      return `${i}`;
    case "string":
      return `"${i}"`;
  }
  return typeof i[Symbol.toPrimitive] == "function" ? i[Symbol.toPrimitive]("string") : ArrayBuffer.isView(i) ? i instanceof BigInt64Array || i instanceof BigUint64Array ? `[${[...i].map((t) => Me(t))}]` : `[${i}]` : ArrayBuffer.isView(i) ? `[${i}]` : JSON.stringify(i, (t, e) => typeof e == "bigint" ? `${e}` : e);
}
const po = Symbol.for("isArrowBigNum");
function bt(i, ...t) {
  return t.length === 0 ? Object.setPrototypeOf(k(this.TypedArray, i), this.constructor.prototype) : Object.setPrototypeOf(new this.TypedArray(i, ...t), this.constructor.prototype);
}
bt.prototype[po] = !0;
bt.prototype.toJSON = function() {
  return `"${ke(this)}"`;
};
bt.prototype.valueOf = function() {
  return us(this);
};
bt.prototype.toString = function() {
  return ke(this);
};
bt.prototype[Symbol.toPrimitive] = function(i = "default") {
  switch (i) {
    case "number":
      return us(this);
    case "string":
      return ke(this);
    case "default":
      return yo(this);
  }
  return ke(this);
};
function be(...i) {
  return bt.apply(this, i);
}
function _e(...i) {
  return bt.apply(this, i);
}
function Ue(...i) {
  return bt.apply(this, i);
}
Object.setPrototypeOf(be.prototype, Object.create(Int32Array.prototype));
Object.setPrototypeOf(_e.prototype, Object.create(Uint32Array.prototype));
Object.setPrototypeOf(Ue.prototype, Object.create(Uint32Array.prototype));
Object.assign(be.prototype, bt.prototype, { constructor: be, signed: !0, TypedArray: Int32Array, BigIntArray: BigInt64Array });
Object.assign(_e.prototype, bt.prototype, { constructor: _e, signed: !1, TypedArray: Uint32Array, BigIntArray: BigUint64Array });
Object.assign(Ue.prototype, bt.prototype, { constructor: Ue, signed: !0, TypedArray: Uint32Array, BigIntArray: BigUint64Array });
function us(i) {
  const { buffer: t, byteOffset: e, length: n, signed: s } = i, r = new BigUint64Array(t, e, n), o = s && r.at(-1) & BigInt(1) << BigInt(63);
  let a = BigInt(o ? 1 : 0), c = BigInt(0);
  if (o) {
    for (const u of r)
      a += ~u * (BigInt(1) << BigInt(32) * c++);
    a *= BigInt(-1);
  } else
    for (const u of r)
      a += u * (BigInt(1) << BigInt(32) * c++);
  return a;
}
const ke = (i) => {
  if (i.byteLength === 8)
    return `${new i.BigIntArray(i.buffer, i.byteOffset, 1)[0]}`;
  if (!i.signed)
    return Pi(i);
  let t = new Uint16Array(i.buffer, i.byteOffset, i.byteLength / 2);
  if (new Int16Array([t.at(-1)])[0] >= 0)
    return Pi(i);
  t = t.slice();
  let n = 1;
  for (let r = 0; r < t.length; r++) {
    const o = t[r], a = ~o + n;
    t[r] = a, n &= o === 0 ? 1 : 0;
  }
  return `-${Pi(t)}`;
}, yo = (i) => i.byteLength === 8 ? new i.BigIntArray(i.buffer, i.byteOffset, 1)[0] : ke(i);
function Pi(i) {
  let t = "";
  const e = new Uint32Array(2);
  let n = new Uint16Array(i.buffer, i.byteOffset, i.byteLength / 2);
  const s = new Uint32Array((n = new Uint16Array(n).reverse()).buffer);
  let r = -1;
  const o = n.length - 1;
  do {
    for (e[0] = n[r = 0]; r < o; )
      n[r++] = e[1] = e[0] / 10, e[0] = (e[0] - e[1] * 10 << 16) + n[r];
    n[r] = e[1] = e[0] / 10, e[0] = e[0] - e[1] * 10, t = `${e[0]}${t}`;
  } while (s[0] || s[1] || s[2] || s[3]);
  return t ?? "0";
}
class hn {
  /** @nocollapse */
  static new(t, e) {
    switch (e) {
      case !0:
        return new be(t);
      case !1:
        return new _e(t);
    }
    switch (t.constructor) {
      case Int8Array:
      case Int16Array:
      case Int32Array:
      case BigInt64Array:
        return new be(t);
    }
    return t.byteLength === 16 ? new Ue(t) : new _e(t);
  }
  /** @nocollapse */
  static signed(t) {
    return new be(t);
  }
  /** @nocollapse */
  static unsigned(t) {
    return new _e(t);
  }
  /** @nocollapse */
  static decimal(t) {
    return new Ue(t);
  }
  constructor(t, e) {
    return hn.new(t, e);
  }
}
function mt(i) {
  if (typeof i == "bigint" && (i < Number.MIN_SAFE_INTEGER || i > Number.MAX_SAFE_INTEGER))
    throw new TypeError(`${i} is not safe to convert to a number.`);
  return Number(i);
}
var ds, hs, fs, ps, ys, ms, bs, _s, gs, ws, Is, vs, Ss, Ts, Es, Bs, As, Fs, Os;
class y {
  /** @nocollapse */
  static isNull(t) {
    return (t == null ? void 0 : t.typeId) === l.Null;
  }
  /** @nocollapse */
  static isInt(t) {
    return (t == null ? void 0 : t.typeId) === l.Int;
  }
  /** @nocollapse */
  static isFloat(t) {
    return (t == null ? void 0 : t.typeId) === l.Float;
  }
  /** @nocollapse */
  static isBinary(t) {
    return (t == null ? void 0 : t.typeId) === l.Binary;
  }
  /** @nocollapse */
  static isUtf8(t) {
    return (t == null ? void 0 : t.typeId) === l.Utf8;
  }
  /** @nocollapse */
  static isBool(t) {
    return (t == null ? void 0 : t.typeId) === l.Bool;
  }
  /** @nocollapse */
  static isDecimal(t) {
    return (t == null ? void 0 : t.typeId) === l.Decimal;
  }
  /** @nocollapse */
  static isDate(t) {
    return (t == null ? void 0 : t.typeId) === l.Date;
  }
  /** @nocollapse */
  static isTime(t) {
    return (t == null ? void 0 : t.typeId) === l.Time;
  }
  /** @nocollapse */
  static isTimestamp(t) {
    return (t == null ? void 0 : t.typeId) === l.Timestamp;
  }
  /** @nocollapse */
  static isInterval(t) {
    return (t == null ? void 0 : t.typeId) === l.Interval;
  }
  /** @nocollapse */
  static isList(t) {
    return (t == null ? void 0 : t.typeId) === l.List;
  }
  /** @nocollapse */
  static isStruct(t) {
    return (t == null ? void 0 : t.typeId) === l.Struct;
  }
  /** @nocollapse */
  static isUnion(t) {
    return (t == null ? void 0 : t.typeId) === l.Union;
  }
  /** @nocollapse */
  static isFixedSizeBinary(t) {
    return (t == null ? void 0 : t.typeId) === l.FixedSizeBinary;
  }
  /** @nocollapse */
  static isFixedSizeList(t) {
    return (t == null ? void 0 : t.typeId) === l.FixedSizeList;
  }
  /** @nocollapse */
  static isMap(t) {
    return (t == null ? void 0 : t.typeId) === l.Map;
  }
  /** @nocollapse */
  static isDictionary(t) {
    return (t == null ? void 0 : t.typeId) === l.Dictionary;
  }
  /** @nocollapse */
  static isDenseUnion(t) {
    return y.isUnion(t) && t.mode === ot.Dense;
  }
  /** @nocollapse */
  static isSparseUnion(t) {
    return y.isUnion(t) && t.mode === ot.Sparse;
  }
  get typeId() {
    return l.NONE;
  }
}
ds = Symbol.toStringTag;
y[ds] = ((i) => (i.children = null, i.ArrayType = Array, i[Symbol.toStringTag] = "DataType"))(y.prototype);
let Gt = class extends y {
  toString() {
    return "Null";
  }
  get typeId() {
    return l.Null;
  }
};
hs = Symbol.toStringTag;
Gt[hs] = ((i) => i[Symbol.toStringTag] = "Null")(Gt.prototype);
class qt extends y {
  constructor(t, e) {
    super(), this.isSigned = t, this.bitWidth = e;
  }
  get typeId() {
    return l.Int;
  }
  get ArrayType() {
    switch (this.bitWidth) {
      case 8:
        return this.isSigned ? Int8Array : Uint8Array;
      case 16:
        return this.isSigned ? Int16Array : Uint16Array;
      case 32:
        return this.isSigned ? Int32Array : Uint32Array;
      case 64:
        return this.isSigned ? BigInt64Array : BigUint64Array;
    }
    throw new Error(`Unrecognized ${this[Symbol.toStringTag]} type`);
  }
  toString() {
    return `${this.isSigned ? "I" : "Ui"}nt${this.bitWidth}`;
  }
}
fs = Symbol.toStringTag;
qt[fs] = ((i) => (i.isSigned = null, i.bitWidth = null, i[Symbol.toStringTag] = "Int"))(qt.prototype);
class Ce extends qt {
  constructor() {
    super(!0, 32);
  }
  get ArrayType() {
    return Int32Array;
  }
}
Object.defineProperty(Ce.prototype, "ArrayType", { value: Int32Array });
class Pe extends y {
  constructor(t) {
    super(), this.precision = t;
  }
  get typeId() {
    return l.Float;
  }
  get ArrayType() {
    switch (this.precision) {
      case X.HALF:
        return Uint16Array;
      case X.SINGLE:
        return Float32Array;
      case X.DOUBLE:
        return Float64Array;
    }
    throw new Error(`Unrecognized ${this[Symbol.toStringTag]} type`);
  }
  toString() {
    return `Float${this.precision << 5 || 16}`;
  }
}
ps = Symbol.toStringTag;
Pe[ps] = ((i) => (i.precision = null, i[Symbol.toStringTag] = "Float"))(Pe.prototype);
let si = class extends y {
  constructor() {
    super();
  }
  get typeId() {
    return l.Binary;
  }
  toString() {
    return "Binary";
  }
};
ys = Symbol.toStringTag;
si[ys] = ((i) => (i.ArrayType = Uint8Array, i[Symbol.toStringTag] = "Binary"))(si.prototype);
let ri = class extends y {
  constructor() {
    super();
  }
  get typeId() {
    return l.Utf8;
  }
  toString() {
    return "Utf8";
  }
};
ms = Symbol.toStringTag;
ri[ms] = ((i) => (i.ArrayType = Uint8Array, i[Symbol.toStringTag] = "Utf8"))(ri.prototype);
let oi = class extends y {
  constructor() {
    super();
  }
  get typeId() {
    return l.Bool;
  }
  toString() {
    return "Bool";
  }
};
bs = Symbol.toStringTag;
oi[bs] = ((i) => (i.ArrayType = Uint8Array, i[Symbol.toStringTag] = "Bool"))(oi.prototype);
let ai = class extends y {
  constructor(t, e, n = 128) {
    super(), this.scale = t, this.precision = e, this.bitWidth = n;
  }
  get typeId() {
    return l.Decimal;
  }
  toString() {
    return `Decimal[${this.precision}e${this.scale > 0 ? "+" : ""}${this.scale}]`;
  }
};
_s = Symbol.toStringTag;
ai[_s] = ((i) => (i.scale = null, i.precision = null, i.ArrayType = Uint32Array, i[Symbol.toStringTag] = "Decimal"))(ai.prototype);
class ci extends y {
  constructor(t) {
    super(), this.unit = t;
  }
  get typeId() {
    return l.Date;
  }
  toString() {
    return `Date${(this.unit + 1) * 32}<${Pt[this.unit]}>`;
  }
}
gs = Symbol.toStringTag;
ci[gs] = ((i) => (i.unit = null, i.ArrayType = Int32Array, i[Symbol.toStringTag] = "Date"))(ci.prototype);
class xe extends y {
  constructor(t, e) {
    super(), this.unit = t, this.bitWidth = e;
  }
  get typeId() {
    return l.Time;
  }
  toString() {
    return `Time${this.bitWidth}<${R[this.unit]}>`;
  }
  get ArrayType() {
    switch (this.bitWidth) {
      case 32:
        return Int32Array;
      case 64:
        return BigInt64Array;
    }
    throw new Error(`Unrecognized ${this[Symbol.toStringTag]} type`);
  }
}
ws = Symbol.toStringTag;
xe[ws] = ((i) => (i.unit = null, i.bitWidth = null, i[Symbol.toStringTag] = "Time"))(xe.prototype);
class li extends y {
  constructor(t, e) {
    super(), this.unit = t, this.timezone = e;
  }
  get typeId() {
    return l.Timestamp;
  }
  toString() {
    return `Timestamp<${R[this.unit]}${this.timezone ? `, ${this.timezone}` : ""}>`;
  }
}
Is = Symbol.toStringTag;
li[Is] = ((i) => (i.unit = null, i.timezone = null, i.ArrayType = Int32Array, i[Symbol.toStringTag] = "Timestamp"))(li.prototype);
class ui extends y {
  constructor(t) {
    super(), this.unit = t;
  }
  get typeId() {
    return l.Interval;
  }
  toString() {
    return `Interval<${Wt[this.unit]}>`;
  }
}
vs = Symbol.toStringTag;
ui[vs] = ((i) => (i.unit = null, i.ArrayType = Int32Array, i[Symbol.toStringTag] = "Interval"))(ui.prototype);
let di = class extends y {
  constructor(t) {
    super(), this.children = [t];
  }
  get typeId() {
    return l.List;
  }
  toString() {
    return `List<${this.valueType}>`;
  }
  get valueType() {
    return this.children[0].type;
  }
  get valueField() {
    return this.children[0];
  }
  get ArrayType() {
    return this.valueType.ArrayType;
  }
};
Ss = Symbol.toStringTag;
di[Ss] = ((i) => (i.children = null, i[Symbol.toStringTag] = "List"))(di.prototype);
class q extends y {
  constructor(t) {
    super(), this.children = t;
  }
  get typeId() {
    return l.Struct;
  }
  toString() {
    return `Struct<{${this.children.map((t) => `${t.name}:${t.type}`).join(", ")}}>`;
  }
}
Ts = Symbol.toStringTag;
q[Ts] = ((i) => (i.children = null, i[Symbol.toStringTag] = "Struct"))(q.prototype);
class hi extends y {
  constructor(t, e, n) {
    super(), this.mode = t, this.children = n, this.typeIds = e = Int32Array.from(e), this.typeIdToChildIndex = e.reduce((s, r, o) => (s[r] = o) && s || s, /* @__PURE__ */ Object.create(null));
  }
  get typeId() {
    return l.Union;
  }
  toString() {
    return `${this[Symbol.toStringTag]}<${this.children.map((t) => `${t.type}`).join(" | ")}>`;
  }
}
Es = Symbol.toStringTag;
hi[Es] = ((i) => (i.mode = null, i.typeIds = null, i.children = null, i.typeIdToChildIndex = null, i.ArrayType = Int8Array, i[Symbol.toStringTag] = "Union"))(hi.prototype);
let fi = class extends y {
  constructor(t) {
    super(), this.byteWidth = t;
  }
  get typeId() {
    return l.FixedSizeBinary;
  }
  toString() {
    return `FixedSizeBinary[${this.byteWidth}]`;
  }
};
Bs = Symbol.toStringTag;
fi[Bs] = ((i) => (i.byteWidth = null, i.ArrayType = Uint8Array, i[Symbol.toStringTag] = "FixedSizeBinary"))(fi.prototype);
let pi = class extends y {
  constructor(t, e) {
    super(), this.listSize = t, this.children = [e];
  }
  get typeId() {
    return l.FixedSizeList;
  }
  get valueType() {
    return this.children[0].type;
  }
  get valueField() {
    return this.children[0];
  }
  get ArrayType() {
    return this.valueType.ArrayType;
  }
  toString() {
    return `FixedSizeList[${this.listSize}]<${this.valueType}>`;
  }
};
As = Symbol.toStringTag;
pi[As] = ((i) => (i.children = null, i.listSize = null, i[Symbol.toStringTag] = "FixedSizeList"))(pi.prototype);
class yi extends y {
  constructor(t, e = !1) {
    super(), this.children = [t], this.keysSorted = e;
  }
  get typeId() {
    return l.Map;
  }
  get keyType() {
    return this.children[0].type.children[0].type;
  }
  get valueType() {
    return this.children[0].type.children[1].type;
  }
  get childType() {
    return this.children[0].type;
  }
  toString() {
    return `Map<{${this.children[0].type.children.map((t) => `${t.name}:${t.type}`).join(", ")}}>`;
  }
}
Fs = Symbol.toStringTag;
yi[Fs] = ((i) => (i.children = null, i.keysSorted = null, i[Symbol.toStringTag] = "Map_"))(yi.prototype);
const mo = ((i) => () => ++i)(-1);
class ve extends y {
  constructor(t, e, n, s) {
    super(), this.indices = e, this.dictionary = t, this.isOrdered = s || !1, this.id = n == null ? mo() : mt(n);
  }
  get typeId() {
    return l.Dictionary;
  }
  get children() {
    return this.dictionary.children;
  }
  get valueType() {
    return this.dictionary;
  }
  get ArrayType() {
    return this.dictionary.ArrayType;
  }
  toString() {
    return `Dictionary<${this.indices}, ${this.dictionary}>`;
  }
}
Os = Symbol.toStringTag;
ve[Os] = ((i) => (i.id = null, i.indices = null, i.isOrdered = null, i.dictionary = null, i[Symbol.toStringTag] = "Dictionary"))(ve.prototype);
function Mt(i) {
  const t = i;
  switch (i.typeId) {
    case l.Decimal:
      return i.bitWidth / 32;
    case l.Timestamp:
      return 2;
    case l.Date:
      return 1 + t.unit;
    case l.Interval:
      return 1 + t.unit;
    case l.FixedSizeList:
      return t.listSize;
    case l.FixedSizeBinary:
      return t.byteWidth;
    default:
      return 1;
  }
}
class F {
  visitMany(t, ...e) {
    return t.map((n, s) => this.visit(n, ...e.map((r) => r[s])));
  }
  visit(...t) {
    return this.getVisitFn(t[0], !1).apply(this, t);
  }
  getVisitFn(t, e = !0) {
    return bo(this, t, e);
  }
  getVisitFnByTypeId(t, e = !0) {
    return he(this, t, e);
  }
  visitNull(t, ...e) {
    return null;
  }
  visitBool(t, ...e) {
    return null;
  }
  visitInt(t, ...e) {
    return null;
  }
  visitFloat(t, ...e) {
    return null;
  }
  visitUtf8(t, ...e) {
    return null;
  }
  visitBinary(t, ...e) {
    return null;
  }
  visitFixedSizeBinary(t, ...e) {
    return null;
  }
  visitDate(t, ...e) {
    return null;
  }
  visitTimestamp(t, ...e) {
    return null;
  }
  visitTime(t, ...e) {
    return null;
  }
  visitDecimal(t, ...e) {
    return null;
  }
  visitList(t, ...e) {
    return null;
  }
  visitStruct(t, ...e) {
    return null;
  }
  visitUnion(t, ...e) {
    return null;
  }
  visitDictionary(t, ...e) {
    return null;
  }
  visitInterval(t, ...e) {
    return null;
  }
  visitFixedSizeList(t, ...e) {
    return null;
  }
  visitMap(t, ...e) {
    return null;
  }
}
function bo(i, t, e = !0) {
  return typeof t == "number" ? he(i, t, e) : typeof t == "string" && t in l ? he(i, l[t], e) : t && t instanceof y ? he(i, jn(t), e) : t != null && t.type && t.type instanceof y ? he(i, jn(t.type), e) : he(i, l.NONE, e);
}
function he(i, t, e = !0) {
  let n = null;
  switch (t) {
    case l.Null:
      n = i.visitNull;
      break;
    case l.Bool:
      n = i.visitBool;
      break;
    case l.Int:
      n = i.visitInt;
      break;
    case l.Int8:
      n = i.visitInt8 || i.visitInt;
      break;
    case l.Int16:
      n = i.visitInt16 || i.visitInt;
      break;
    case l.Int32:
      n = i.visitInt32 || i.visitInt;
      break;
    case l.Int64:
      n = i.visitInt64 || i.visitInt;
      break;
    case l.Uint8:
      n = i.visitUint8 || i.visitInt;
      break;
    case l.Uint16:
      n = i.visitUint16 || i.visitInt;
      break;
    case l.Uint32:
      n = i.visitUint32 || i.visitInt;
      break;
    case l.Uint64:
      n = i.visitUint64 || i.visitInt;
      break;
    case l.Float:
      n = i.visitFloat;
      break;
    case l.Float16:
      n = i.visitFloat16 || i.visitFloat;
      break;
    case l.Float32:
      n = i.visitFloat32 || i.visitFloat;
      break;
    case l.Float64:
      n = i.visitFloat64 || i.visitFloat;
      break;
    case l.Utf8:
      n = i.visitUtf8;
      break;
    case l.Binary:
      n = i.visitBinary;
      break;
    case l.FixedSizeBinary:
      n = i.visitFixedSizeBinary;
      break;
    case l.Date:
      n = i.visitDate;
      break;
    case l.DateDay:
      n = i.visitDateDay || i.visitDate;
      break;
    case l.DateMillisecond:
      n = i.visitDateMillisecond || i.visitDate;
      break;
    case l.Timestamp:
      n = i.visitTimestamp;
      break;
    case l.TimestampSecond:
      n = i.visitTimestampSecond || i.visitTimestamp;
      break;
    case l.TimestampMillisecond:
      n = i.visitTimestampMillisecond || i.visitTimestamp;
      break;
    case l.TimestampMicrosecond:
      n = i.visitTimestampMicrosecond || i.visitTimestamp;
      break;
    case l.TimestampNanosecond:
      n = i.visitTimestampNanosecond || i.visitTimestamp;
      break;
    case l.Time:
      n = i.visitTime;
      break;
    case l.TimeSecond:
      n = i.visitTimeSecond || i.visitTime;
      break;
    case l.TimeMillisecond:
      n = i.visitTimeMillisecond || i.visitTime;
      break;
    case l.TimeMicrosecond:
      n = i.visitTimeMicrosecond || i.visitTime;
      break;
    case l.TimeNanosecond:
      n = i.visitTimeNanosecond || i.visitTime;
      break;
    case l.Decimal:
      n = i.visitDecimal;
      break;
    case l.List:
      n = i.visitList;
      break;
    case l.Struct:
      n = i.visitStruct;
      break;
    case l.Union:
      n = i.visitUnion;
      break;
    case l.DenseUnion:
      n = i.visitDenseUnion || i.visitUnion;
      break;
    case l.SparseUnion:
      n = i.visitSparseUnion || i.visitUnion;
      break;
    case l.Dictionary:
      n = i.visitDictionary;
      break;
    case l.Interval:
      n = i.visitInterval;
      break;
    case l.IntervalDayTime:
      n = i.visitIntervalDayTime || i.visitInterval;
      break;
    case l.IntervalYearMonth:
      n = i.visitIntervalYearMonth || i.visitInterval;
      break;
    case l.FixedSizeList:
      n = i.visitFixedSizeList;
      break;
    case l.Map:
      n = i.visitMap;
      break;
  }
  if (typeof n == "function")
    return n;
  if (!e)
    return () => null;
  throw new Error(`Unrecognized type '${l[t]}'`);
}
function jn(i) {
  switch (i.typeId) {
    case l.Null:
      return l.Null;
    case l.Int: {
      const { bitWidth: t, isSigned: e } = i;
      switch (t) {
        case 8:
          return e ? l.Int8 : l.Uint8;
        case 16:
          return e ? l.Int16 : l.Uint16;
        case 32:
          return e ? l.Int32 : l.Uint32;
        case 64:
          return e ? l.Int64 : l.Uint64;
      }
      return l.Int;
    }
    case l.Float:
      switch (i.precision) {
        case X.HALF:
          return l.Float16;
        case X.SINGLE:
          return l.Float32;
        case X.DOUBLE:
          return l.Float64;
      }
      return l.Float;
    case l.Binary:
      return l.Binary;
    case l.Utf8:
      return l.Utf8;
    case l.Bool:
      return l.Bool;
    case l.Decimal:
      return l.Decimal;
    case l.Time:
      switch (i.unit) {
        case R.SECOND:
          return l.TimeSecond;
        case R.MILLISECOND:
          return l.TimeMillisecond;
        case R.MICROSECOND:
          return l.TimeMicrosecond;
        case R.NANOSECOND:
          return l.TimeNanosecond;
      }
      return l.Time;
    case l.Timestamp:
      switch (i.unit) {
        case R.SECOND:
          return l.TimestampSecond;
        case R.MILLISECOND:
          return l.TimestampMillisecond;
        case R.MICROSECOND:
          return l.TimestampMicrosecond;
        case R.NANOSECOND:
          return l.TimestampNanosecond;
      }
      return l.Timestamp;
    case l.Date:
      switch (i.unit) {
        case Pt.DAY:
          return l.DateDay;
        case Pt.MILLISECOND:
          return l.DateMillisecond;
      }
      return l.Date;
    case l.Interval:
      switch (i.unit) {
        case Wt.DAY_TIME:
          return l.IntervalDayTime;
        case Wt.YEAR_MONTH:
          return l.IntervalYearMonth;
      }
      return l.Interval;
    case l.Map:
      return l.Map;
    case l.List:
      return l.List;
    case l.Struct:
      return l.Struct;
    case l.Union:
      switch (i.mode) {
        case ot.Dense:
          return l.DenseUnion;
        case ot.Sparse:
          return l.SparseUnion;
      }
      return l.Union;
    case l.FixedSizeBinary:
      return l.FixedSizeBinary;
    case l.FixedSizeList:
      return l.FixedSizeList;
    case l.Dictionary:
      return l.Dictionary;
  }
  throw new Error(`Unrecognized type '${l[i.typeId]}'`);
}
F.prototype.visitInt8 = null;
F.prototype.visitInt16 = null;
F.prototype.visitInt32 = null;
F.prototype.visitInt64 = null;
F.prototype.visitUint8 = null;
F.prototype.visitUint16 = null;
F.prototype.visitUint32 = null;
F.prototype.visitUint64 = null;
F.prototype.visitFloat16 = null;
F.prototype.visitFloat32 = null;
F.prototype.visitFloat64 = null;
F.prototype.visitDateDay = null;
F.prototype.visitDateMillisecond = null;
F.prototype.visitTimestampSecond = null;
F.prototype.visitTimestampMillisecond = null;
F.prototype.visitTimestampMicrosecond = null;
F.prototype.visitTimestampNanosecond = null;
F.prototype.visitTimeSecond = null;
F.prototype.visitTimeMillisecond = null;
F.prototype.visitTimeMicrosecond = null;
F.prototype.visitTimeNanosecond = null;
F.prototype.visitDenseUnion = null;
F.prototype.visitSparseUnion = null;
F.prototype.visitIntervalDayTime = null;
F.prototype.visitIntervalYearMonth = null;
const Ns = new Float64Array(1), de = new Uint32Array(Ns.buffer);
function Rs(i) {
  const t = (i & 31744) >> 10, e = (i & 1023) / 1024, n = Math.pow(-1, (i & 32768) >> 15);
  switch (t) {
    case 31:
      return n * (e ? Number.NaN : 1 / 0);
    case 0:
      return n * (e ? 6103515625e-14 * e : 0);
  }
  return n * Math.pow(2, t - 15) * (1 + e);
}
function _o(i) {
  if (i !== i)
    return 32256;
  Ns[0] = i;
  const t = (de[1] & 2147483648) >> 16 & 65535;
  let e = de[1] & 2146435072, n = 0;
  return e >= 1089470464 ? de[0] > 0 ? e = 31744 : (e = (e & 2080374784) >> 16, n = (de[1] & 1048575) >> 10) : e <= 1056964608 ? (n = 1048576 + (de[1] & 1048575), n = 1048576 + (n << (e >> 20) - 998) >> 21, e = 0) : (e = e - 1056964608 >> 10, n = (de[1] & 1048575) + 512 >> 10), t | e | n & 65535;
}
class w extends F {
}
function S(i) {
  return (t, e, n) => {
    if (t.setValid(e, n != null))
      return i(t, e, n);
  };
}
const go = (i, t, e) => {
  i[t] = Math.trunc(e / 864e5);
}, fn = (i, t, e) => {
  i[t] = Math.trunc(e % 4294967296), i[t + 1] = Math.trunc(e / 4294967296);
}, wo = (i, t, e) => {
  i[t] = Math.trunc(e * 1e3 % 4294967296), i[t + 1] = Math.trunc(e * 1e3 / 4294967296);
}, Io = (i, t, e) => {
  i[t] = Math.trunc(e * 1e6 % 4294967296), i[t + 1] = Math.trunc(e * 1e6 / 4294967296);
}, Ds = (i, t, e, n) => {
  if (e + 1 < t.length) {
    const { [e]: s, [e + 1]: r } = t;
    i.set(n.subarray(0, r - s), s);
  }
}, vo = ({ offset: i, values: t }, e, n) => {
  const s = i + e;
  n ? t[s >> 3] |= 1 << s % 8 : t[s >> 3] &= ~(1 << s % 8);
}, xt = ({ values: i }, t, e) => {
  i[t] = e;
}, pn = ({ values: i }, t, e) => {
  i[t] = e;
}, Ls = ({ values: i }, t, e) => {
  i[t] = _o(e);
}, So = (i, t, e) => {
  switch (i.type.precision) {
    case X.HALF:
      return Ls(i, t, e);
    case X.SINGLE:
    case X.DOUBLE:
      return pn(i, t, e);
  }
}, Ms = ({ values: i }, t, e) => {
  go(i, t, e.valueOf());
}, Us = ({ values: i }, t, e) => {
  fn(i, t * 2, e.valueOf());
}, To = ({ stride: i, values: t }, e, n) => {
  t.set(n.subarray(0, i), i * e);
}, Eo = ({ values: i, valueOffsets: t }, e, n) => Ds(i, t, e, n), Bo = ({ values: i, valueOffsets: t }, e, n) => {
  Ds(i, t, e, cn(n));
}, Ao = (i, t, e) => {
  i.type.unit === Pt.DAY ? Ms(i, t, e) : Us(i, t, e);
}, ks = ({ values: i }, t, e) => fn(i, t * 2, e / 1e3), Cs = ({ values: i }, t, e) => fn(i, t * 2, e), Ps = ({ values: i }, t, e) => wo(i, t * 2, e), xs = ({ values: i }, t, e) => Io(i, t * 2, e), Fo = (i, t, e) => {
  switch (i.type.unit) {
    case R.SECOND:
      return ks(i, t, e);
    case R.MILLISECOND:
      return Cs(i, t, e);
    case R.MICROSECOND:
      return Ps(i, t, e);
    case R.NANOSECOND:
      return xs(i, t, e);
  }
}, js = ({ values: i }, t, e) => {
  i[t] = e;
}, Vs = ({ values: i }, t, e) => {
  i[t] = e;
}, zs = ({ values: i }, t, e) => {
  i[t] = e;
}, $s = ({ values: i }, t, e) => {
  i[t] = e;
}, Oo = (i, t, e) => {
  switch (i.type.unit) {
    case R.SECOND:
      return js(i, t, e);
    case R.MILLISECOND:
      return Vs(i, t, e);
    case R.MICROSECOND:
      return zs(i, t, e);
    case R.NANOSECOND:
      return $s(i, t, e);
  }
}, No = ({ values: i, stride: t }, e, n) => {
  i.set(n.subarray(0, t), t * e);
}, Ro = (i, t, e) => {
  const n = i.children[0], s = i.valueOffsets, r = ft.getVisitFn(n);
  if (Array.isArray(e))
    for (let o = -1, a = s[t], c = s[t + 1]; a < c; )
      r(n, a++, e[++o]);
  else
    for (let o = -1, a = s[t], c = s[t + 1]; a < c; )
      r(n, a++, e.get(++o));
}, Do = (i, t, e) => {
  const n = i.children[0], { valueOffsets: s } = i, r = ft.getVisitFn(n);
  let { [t]: o, [t + 1]: a } = s;
  const c = e instanceof Map ? e.entries() : Object.entries(e);
  for (const u of c)
    if (r(n, o, u), ++o >= a)
      break;
}, Lo = (i, t) => (e, n, s, r) => n && e(n, i, t[r]), Mo = (i, t) => (e, n, s, r) => n && e(n, i, t.get(r)), Uo = (i, t) => (e, n, s, r) => n && e(n, i, t.get(s.name)), ko = (i, t) => (e, n, s, r) => n && e(n, i, t[s.name]), Co = (i, t, e) => {
  const n = i.type.children.map((r) => ft.getVisitFn(r.type)), s = e instanceof Map ? Uo(t, e) : e instanceof L ? Mo(t, e) : Array.isArray(e) ? Lo(t, e) : ko(t, e);
  i.type.children.forEach((r, o) => s(n[o], i.children[o], r, o));
}, Po = (i, t, e) => {
  i.type.mode === ot.Dense ? Ys(i, t, e) : Ws(i, t, e);
}, Ys = (i, t, e) => {
  const n = i.type.typeIdToChildIndex[i.typeIds[t]], s = i.children[n];
  ft.visit(s, i.valueOffsets[t], e);
}, Ws = (i, t, e) => {
  const n = i.type.typeIdToChildIndex[i.typeIds[t]], s = i.children[n];
  ft.visit(s, t, e);
}, xo = (i, t, e) => {
  var n;
  (n = i.dictionary) === null || n === void 0 || n.set(i.values[t], e);
}, jo = (i, t, e) => {
  i.type.unit === Wt.DAY_TIME ? Gs(i, t, e) : qs(i, t, e);
}, Gs = ({ values: i }, t, e) => {
  i.set(e.subarray(0, 2), 2 * t);
}, qs = ({ values: i }, t, e) => {
  i[t] = e[0] * 12 + e[1] % 12;
}, Vo = (i, t, e) => {
  const { stride: n } = i, s = i.children[0], r = ft.getVisitFn(s);
  if (Array.isArray(e))
    for (let o = -1, a = t * n; ++o < n; )
      r(s, a + o, e[o]);
  else
    for (let o = -1, a = t * n; ++o < n; )
      r(s, a + o, e.get(o));
};
w.prototype.visitBool = S(vo);
w.prototype.visitInt = S(xt);
w.prototype.visitInt8 = S(xt);
w.prototype.visitInt16 = S(xt);
w.prototype.visitInt32 = S(xt);
w.prototype.visitInt64 = S(xt);
w.prototype.visitUint8 = S(xt);
w.prototype.visitUint16 = S(xt);
w.prototype.visitUint32 = S(xt);
w.prototype.visitUint64 = S(xt);
w.prototype.visitFloat = S(So);
w.prototype.visitFloat16 = S(Ls);
w.prototype.visitFloat32 = S(pn);
w.prototype.visitFloat64 = S(pn);
w.prototype.visitUtf8 = S(Bo);
w.prototype.visitBinary = S(Eo);
w.prototype.visitFixedSizeBinary = S(To);
w.prototype.visitDate = S(Ao);
w.prototype.visitDateDay = S(Ms);
w.prototype.visitDateMillisecond = S(Us);
w.prototype.visitTimestamp = S(Fo);
w.prototype.visitTimestampSecond = S(ks);
w.prototype.visitTimestampMillisecond = S(Cs);
w.prototype.visitTimestampMicrosecond = S(Ps);
w.prototype.visitTimestampNanosecond = S(xs);
w.prototype.visitTime = S(Oo);
w.prototype.visitTimeSecond = S(js);
w.prototype.visitTimeMillisecond = S(Vs);
w.prototype.visitTimeMicrosecond = S(zs);
w.prototype.visitTimeNanosecond = S($s);
w.prototype.visitDecimal = S(No);
w.prototype.visitList = S(Ro);
w.prototype.visitStruct = S(Co);
w.prototype.visitUnion = S(Po);
w.prototype.visitDenseUnion = S(Ys);
w.prototype.visitSparseUnion = S(Ws);
w.prototype.visitDictionary = S(xo);
w.prototype.visitInterval = S(jo);
w.prototype.visitIntervalDayTime = S(Gs);
w.prototype.visitIntervalYearMonth = S(qs);
w.prototype.visitFixedSizeList = S(Vo);
w.prototype.visitMap = S(Do);
const ft = new w(), pt = Symbol.for("parent"), ge = Symbol.for("rowIndex");
class yn {
  constructor(t, e) {
    return this[pt] = t, this[ge] = e, new Proxy(this, new $o());
  }
  toArray() {
    return Object.values(this.toJSON());
  }
  toJSON() {
    const t = this[ge], e = this[pt], n = e.type.children, s = {};
    for (let r = -1, o = n.length; ++r < o; )
      s[n[r].name] = et.visit(e.children[r], t);
    return s;
  }
  toString() {
    return `{${[...this].map(([t, e]) => `${Me(t)}: ${Me(e)}`).join(", ")}}`;
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toString();
  }
  [Symbol.iterator]() {
    return new zo(this[pt], this[ge]);
  }
}
class zo {
  constructor(t, e) {
    this.childIndex = 0, this.children = t.children, this.rowIndex = e, this.childFields = t.type.children, this.numChildren = this.childFields.length;
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    const t = this.childIndex;
    return t < this.numChildren ? (this.childIndex = t + 1, {
      done: !1,
      value: [
        this.childFields[t].name,
        et.visit(this.children[t], this.rowIndex)
      ]
    }) : { done: !0, value: null };
  }
}
Object.defineProperties(yn.prototype, {
  [Symbol.toStringTag]: { enumerable: !1, configurable: !1, value: "Row" },
  [pt]: { writable: !0, enumerable: !1, configurable: !1, value: null },
  [ge]: { writable: !0, enumerable: !1, configurable: !1, value: -1 }
});
class $o {
  isExtensible() {
    return !1;
  }
  deleteProperty() {
    return !1;
  }
  preventExtensions() {
    return !0;
  }
  ownKeys(t) {
    return t[pt].type.children.map((e) => e.name);
  }
  has(t, e) {
    return t[pt].type.children.findIndex((n) => n.name === e) !== -1;
  }
  getOwnPropertyDescriptor(t, e) {
    if (t[pt].type.children.findIndex((n) => n.name === e) !== -1)
      return { writable: !0, enumerable: !0, configurable: !0 };
  }
  get(t, e) {
    if (Reflect.has(t, e))
      return t[e];
    const n = t[pt].type.children.findIndex((s) => s.name === e);
    if (n !== -1) {
      const s = et.visit(t[pt].children[n], t[ge]);
      return Reflect.set(t, e, s), s;
    }
  }
  set(t, e, n) {
    const s = t[pt].type.children.findIndex((r) => r.name === e);
    return s !== -1 ? (ft.visit(t[pt].children[s], t[ge], n), Reflect.set(t, e, n)) : Reflect.has(t, e) || typeof e == "symbol" ? Reflect.set(t, e, n) : !1;
  }
}
class m extends F {
}
function I(i) {
  return (t, e) => t.getValid(e) ? i(t, e) : null;
}
const Yo = (i, t) => 864e5 * i[t], mn = (i, t) => 4294967296 * i[t + 1] + (i[t] >>> 0), Wo = (i, t) => 4294967296 * (i[t + 1] / 1e3) + (i[t] >>> 0) / 1e3, Go = (i, t) => 4294967296 * (i[t + 1] / 1e6) + (i[t] >>> 0) / 1e6, Hs = (i) => new Date(i), qo = (i, t) => Hs(Yo(i, t)), Ho = (i, t) => Hs(mn(i, t)), Qo = (i, t) => null, Qs = (i, t, e) => {
  if (e + 1 >= t.length)
    return null;
  const n = t[e], s = t[e + 1];
  return i.subarray(n, s);
}, Ko = ({ offset: i, values: t }, e) => {
  const n = i + e;
  return (t[n >> 3] & 1 << n % 8) !== 0;
}, Ks = ({ values: i }, t) => qo(i, t), Js = ({ values: i }, t) => Ho(i, t * 2), Kt = ({ stride: i, values: t }, e) => t[i * e], Jo = ({ stride: i, values: t }, e) => Rs(t[i * e]), Zs = ({ values: i }, t) => i[t], Zo = ({ stride: i, values: t }, e) => t.subarray(i * e, i * (e + 1)), Xo = ({ values: i, valueOffsets: t }, e) => Qs(i, t, e), ta = ({ values: i, valueOffsets: t }, e) => {
  const n = Qs(i, t, e);
  return n !== null ? Hi(n) : null;
}, ea = ({ values: i }, t) => i[t], ia = ({ type: i, values: t }, e) => i.precision !== X.HALF ? t[e] : Rs(t[e]), na = (i, t) => i.type.unit === Pt.DAY ? Ks(i, t) : Js(i, t), Xs = ({ values: i }, t) => 1e3 * mn(i, t * 2), tr = ({ values: i }, t) => mn(i, t * 2), er = ({ values: i }, t) => Wo(i, t * 2), ir = ({ values: i }, t) => Go(i, t * 2), sa = (i, t) => {
  switch (i.type.unit) {
    case R.SECOND:
      return Xs(i, t);
    case R.MILLISECOND:
      return tr(i, t);
    case R.MICROSECOND:
      return er(i, t);
    case R.NANOSECOND:
      return ir(i, t);
  }
}, nr = ({ values: i }, t) => i[t], sr = ({ values: i }, t) => i[t], rr = ({ values: i }, t) => i[t], or = ({ values: i }, t) => i[t], ra = (i, t) => {
  switch (i.type.unit) {
    case R.SECOND:
      return nr(i, t);
    case R.MILLISECOND:
      return sr(i, t);
    case R.MICROSECOND:
      return rr(i, t);
    case R.NANOSECOND:
      return or(i, t);
  }
}, oa = ({ values: i, stride: t }, e) => hn.decimal(i.subarray(t * e, t * (e + 1))), aa = (i, t) => {
  const { valueOffsets: e, stride: n, children: s } = i, { [t * n]: r, [t * n + 1]: o } = e, c = s[0].slice(r, o - r);
  return new L([c]);
}, ca = (i, t) => {
  const { valueOffsets: e, children: n } = i, { [t]: s, [t + 1]: r } = e, o = n[0];
  return new bn(o.slice(s, r - s));
}, la = (i, t) => new yn(i, t), ua = (i, t) => i.type.mode === ot.Dense ? ar(i, t) : cr(i, t), ar = (i, t) => {
  const e = i.type.typeIdToChildIndex[i.typeIds[t]], n = i.children[e];
  return et.visit(n, i.valueOffsets[t]);
}, cr = (i, t) => {
  const e = i.type.typeIdToChildIndex[i.typeIds[t]], n = i.children[e];
  return et.visit(n, t);
}, da = (i, t) => {
  var e;
  return (e = i.dictionary) === null || e === void 0 ? void 0 : e.get(i.values[t]);
}, ha = (i, t) => i.type.unit === Wt.DAY_TIME ? lr(i, t) : ur(i, t), lr = ({ values: i }, t) => i.subarray(2 * t, 2 * (t + 1)), ur = ({ values: i }, t) => {
  const e = i[t], n = new Int32Array(2);
  return n[0] = Math.trunc(e / 12), n[1] = Math.trunc(e % 12), n;
}, fa = (i, t) => {
  const { stride: e, children: n } = i, r = n[0].slice(t * e, e);
  return new L([r]);
};
m.prototype.visitNull = I(Qo);
m.prototype.visitBool = I(Ko);
m.prototype.visitInt = I(ea);
m.prototype.visitInt8 = I(Kt);
m.prototype.visitInt16 = I(Kt);
m.prototype.visitInt32 = I(Kt);
m.prototype.visitInt64 = I(Zs);
m.prototype.visitUint8 = I(Kt);
m.prototype.visitUint16 = I(Kt);
m.prototype.visitUint32 = I(Kt);
m.prototype.visitUint64 = I(Zs);
m.prototype.visitFloat = I(ia);
m.prototype.visitFloat16 = I(Jo);
m.prototype.visitFloat32 = I(Kt);
m.prototype.visitFloat64 = I(Kt);
m.prototype.visitUtf8 = I(ta);
m.prototype.visitBinary = I(Xo);
m.prototype.visitFixedSizeBinary = I(Zo);
m.prototype.visitDate = I(na);
m.prototype.visitDateDay = I(Ks);
m.prototype.visitDateMillisecond = I(Js);
m.prototype.visitTimestamp = I(sa);
m.prototype.visitTimestampSecond = I(Xs);
m.prototype.visitTimestampMillisecond = I(tr);
m.prototype.visitTimestampMicrosecond = I(er);
m.prototype.visitTimestampNanosecond = I(ir);
m.prototype.visitTime = I(ra);
m.prototype.visitTimeSecond = I(nr);
m.prototype.visitTimeMillisecond = I(sr);
m.prototype.visitTimeMicrosecond = I(rr);
m.prototype.visitTimeNanosecond = I(or);
m.prototype.visitDecimal = I(oa);
m.prototype.visitList = I(aa);
m.prototype.visitStruct = I(la);
m.prototype.visitUnion = I(ua);
m.prototype.visitDenseUnion = I(ar);
m.prototype.visitSparseUnion = I(cr);
m.prototype.visitDictionary = I(da);
m.prototype.visitInterval = I(ha);
m.prototype.visitIntervalDayTime = I(lr);
m.prototype.visitIntervalYearMonth = I(ur);
m.prototype.visitFixedSizeList = I(fa);
m.prototype.visitMap = I(ca);
const et = new m(), It = Symbol.for("keys"), we = Symbol.for("vals");
class bn {
  constructor(t) {
    return this[It] = new L([t.children[0]]).memoize(), this[we] = t.children[1], new Proxy(this, new ya());
  }
  [Symbol.iterator]() {
    return new pa(this[It], this[we]);
  }
  get size() {
    return this[It].length;
  }
  toArray() {
    return Object.values(this.toJSON());
  }
  toJSON() {
    const t = this[It], e = this[we], n = {};
    for (let s = -1, r = t.length; ++s < r; )
      n[t.get(s)] = et.visit(e, s);
    return n;
  }
  toString() {
    return `{${[...this].map(([t, e]) => `${Me(t)}: ${Me(e)}`).join(", ")}}`;
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toString();
  }
}
class pa {
  constructor(t, e) {
    this.keys = t, this.vals = e, this.keyIndex = 0, this.numKeys = t.length;
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    const t = this.keyIndex;
    return t === this.numKeys ? { done: !0, value: null } : (this.keyIndex++, {
      done: !1,
      value: [
        this.keys.get(t),
        et.visit(this.vals, t)
      ]
    });
  }
}
class ya {
  isExtensible() {
    return !1;
  }
  deleteProperty() {
    return !1;
  }
  preventExtensions() {
    return !0;
  }
  ownKeys(t) {
    return t[It].toArray().map(String);
  }
  has(t, e) {
    return t[It].includes(e);
  }
  getOwnPropertyDescriptor(t, e) {
    if (t[It].indexOf(e) !== -1)
      return { writable: !0, enumerable: !0, configurable: !0 };
  }
  get(t, e) {
    if (Reflect.has(t, e))
      return t[e];
    const n = t[It].indexOf(e);
    if (n !== -1) {
      const s = et.visit(Reflect.get(t, we), n);
      return Reflect.set(t, e, s), s;
    }
  }
  set(t, e, n) {
    const s = t[It].indexOf(e);
    return s !== -1 ? (ft.visit(Reflect.get(t, we), s, n), Reflect.set(t, e, n)) : Reflect.has(t, e) ? Reflect.set(t, e, n) : !1;
  }
}
Object.defineProperties(bn.prototype, {
  [Symbol.toStringTag]: { enumerable: !1, configurable: !1, value: "Row" },
  [It]: { writable: !0, enumerable: !1, configurable: !1, value: null },
  [we]: { writable: !0, enumerable: !1, configurable: !1, value: null }
});
let Vn;
function dr(i, t, e, n) {
  const { length: s = 0 } = i;
  let r = typeof t != "number" ? 0 : t, o = typeof e != "number" ? s : e;
  return r < 0 && (r = (r % s + s) % s), o < 0 && (o = (o % s + s) % s), o < r && (Vn = r, r = o, o = Vn), o > s && (o = s), n ? n(i, r, o) : [r, o];
}
const zn = (i) => i !== i;
function Ne(i) {
  if (typeof i !== "object" || i === null)
    return zn(i) ? zn : (e) => e === i;
  if (i instanceof Date) {
    const e = i.valueOf();
    return (n) => n instanceof Date ? n.valueOf() === e : !1;
  }
  return ArrayBuffer.isView(i) ? (e) => e ? oo(i, e) : !1 : i instanceof Map ? ba(i) : Array.isArray(i) ? ma(i) : i instanceof L ? _a(i) : ga(i, !0);
}
function ma(i) {
  const t = [];
  for (let e = -1, n = i.length; ++e < n; )
    t[e] = Ne(i[e]);
  return Mi(t);
}
function ba(i) {
  let t = -1;
  const e = [];
  for (const n of i.values())
    e[++t] = Ne(n);
  return Mi(e);
}
function _a(i) {
  const t = [];
  for (let e = -1, n = i.length; ++e < n; )
    t[e] = Ne(i.get(e));
  return Mi(t);
}
function ga(i, t = !1) {
  const e = Object.keys(i);
  if (!t && e.length === 0)
    return () => !1;
  const n = [];
  for (let s = -1, r = e.length; ++s < r; )
    n[s] = Ne(i[e[s]]);
  return Mi(n, e);
}
function Mi(i, t) {
  return (e) => {
    if (!e || typeof e != "object")
      return !1;
    switch (e.constructor) {
      case Array:
        return wa(i, e);
      case Map:
        return $n(i, e, e.keys());
      case bn:
      case yn:
      case Object:
      case void 0:
        return $n(i, e, t || Object.keys(e));
    }
    return e instanceof L ? Ia(i, e) : !1;
  };
}
function wa(i, t) {
  const e = i.length;
  if (t.length !== e)
    return !1;
  for (let n = -1; ++n < e; )
    if (!i[n](t[n]))
      return !1;
  return !0;
}
function Ia(i, t) {
  const e = i.length;
  if (t.length !== e)
    return !1;
  for (let n = -1; ++n < e; )
    if (!i[n](t.get(n)))
      return !1;
  return !0;
}
function $n(i, t, e) {
  const n = e[Symbol.iterator](), s = t instanceof Map ? t.keys() : Object.keys(t)[Symbol.iterator](), r = t instanceof Map ? t.values() : Object.values(t)[Symbol.iterator]();
  let o = 0;
  const a = i.length;
  let c = r.next(), u = n.next(), d = s.next();
  for (; o < a && !u.done && !d.done && !c.done && !(u.value !== d.value || !i[o](c.value)); ++o, u = n.next(), d = s.next(), c = r.next())
    ;
  return o === a && u.done && d.done && c.done ? !0 : (n.return && n.return(), s.return && s.return(), r.return && r.return(), !1);
}
function hr(i, t, e, n) {
  return (e & 1 << n) !== 0;
}
function va(i, t, e, n) {
  return (e & 1 << n) >> n;
}
function _n(i, t, e) {
  const n = e.byteLength + 7 & -8;
  if (i > 0 || e.byteLength < n) {
    const s = new Uint8Array(n);
    return s.set(i % 8 === 0 ? e.subarray(i >> 3) : (
      // Otherwise iterate each bit from the offset and return a new one
      mi(new gn(e, i, t, null, hr)).subarray(0, n)
    )), s;
  }
  return e;
}
function mi(i) {
  const t = [];
  let e = 0, n = 0, s = 0;
  for (const o of i)
    o && (s |= 1 << n), ++n === 8 && (t[e++] = s, s = n = 0);
  (e === 0 || n > 0) && (t[e++] = s);
  const r = new Uint8Array(t.length + 7 & -8);
  return r.set(t), r;
}
class gn {
  constructor(t, e, n, s, r) {
    this.bytes = t, this.length = n, this.context = s, this.get = r, this.bit = e % 8, this.byteIndex = e >> 3, this.byte = t[this.byteIndex++], this.index = 0;
  }
  next() {
    return this.index < this.length ? (this.bit === 8 && (this.bit = 0, this.byte = this.bytes[this.byteIndex++]), {
      value: this.get(this.context, this.index++, this.byte, this.bit++)
    }) : { done: !0, value: null };
  }
  [Symbol.iterator]() {
    return this;
  }
}
function Ji(i, t, e) {
  if (e - t <= 0)
    return 0;
  if (e - t < 8) {
    let r = 0;
    for (const o of new gn(i, t, e - t, i, va))
      r += o;
    return r;
  }
  const n = e >> 3 << 3, s = t + (t % 8 === 0 ? 0 : 8 - t % 8);
  return (
    // Get the popcnt of bits between the left hand side, and the next highest multiple of 8
    Ji(i, t, s) + // Get the popcnt of bits between the right hand side, and the next lowest multiple of 8
    Ji(i, n, e) + // Get the popcnt of all bits between the left and right hand sides' multiples of 8
    Sa(i, s >> 3, n - s >> 3)
  );
}
function Sa(i, t, e) {
  let n = 0, s = Math.trunc(t);
  const r = new DataView(i.buffer, i.byteOffset, i.byteLength), o = e === void 0 ? i.byteLength : s + e;
  for (; o - s >= 4; )
    n += xi(r.getUint32(s)), s += 4;
  for (; o - s >= 2; )
    n += xi(r.getUint16(s)), s += 2;
  for (; o - s >= 1; )
    n += xi(r.getUint8(s)), s += 1;
  return n;
}
function xi(i) {
  let t = Math.trunc(i);
  return t = t - (t >>> 1 & 1431655765), t = (t & 858993459) + (t >>> 2 & 858993459), (t + (t >>> 4) & 252645135) * 16843009 >>> 24;
}
const Ta = -1;
class P {
  get typeId() {
    return this.type.typeId;
  }
  get ArrayType() {
    return this.type.ArrayType;
  }
  get buffers() {
    return [this.valueOffsets, this.values, this.nullBitmap, this.typeIds];
  }
  get byteLength() {
    let t = 0;
    const { valueOffsets: e, values: n, nullBitmap: s, typeIds: r } = this;
    return e && (t += e.byteLength), n && (t += n.byteLength), s && (t += s.byteLength), r && (t += r.byteLength), this.children.reduce((o, a) => o + a.byteLength, t);
  }
  get nullCount() {
    let t = this._nullCount, e;
    return t <= Ta && (e = this.nullBitmap) && (this._nullCount = t = this.length - Ji(e, this.offset, this.offset + this.length)), t;
  }
  constructor(t, e, n, s, r, o = [], a) {
    this.type = t, this.children = o, this.dictionary = a, this.offset = Math.floor(Math.max(e || 0, 0)), this.length = Math.floor(Math.max(n || 0, 0)), this._nullCount = Math.floor(Math.max(s || 0, -1));
    let c;
    r instanceof P ? (this.stride = r.stride, this.values = r.values, this.typeIds = r.typeIds, this.nullBitmap = r.nullBitmap, this.valueOffsets = r.valueOffsets) : (this.stride = Mt(t), r && ((c = r[0]) && (this.valueOffsets = c), (c = r[1]) && (this.values = c), (c = r[2]) && (this.nullBitmap = c), (c = r[3]) && (this.typeIds = c))), this.nullable = this._nullCount !== 0 && this.nullBitmap && this.nullBitmap.byteLength > 0;
  }
  getValid(t) {
    if (this.nullable && this.nullCount > 0) {
      const e = this.offset + t;
      return (this.nullBitmap[e >> 3] & 1 << e % 8) !== 0;
    }
    return !0;
  }
  setValid(t, e) {
    if (!this.nullable)
      return e;
    if (!this.nullBitmap || this.nullBitmap.byteLength <= t >> 3) {
      const { nullBitmap: c } = this._changeLengthAndBackfillNullBitmap(this.length);
      Object.assign(this, { nullBitmap: c, _nullCount: 0 });
    }
    const { nullBitmap: n, offset: s } = this, r = s + t >> 3, o = (s + t) % 8, a = n[r] >> o & 1;
    return e ? a === 0 && (n[r] |= 1 << o, this._nullCount = this.nullCount + 1) : a === 1 && (n[r] &= ~(1 << o), this._nullCount = this.nullCount - 1), e;
  }
  clone(t = this.type, e = this.offset, n = this.length, s = this._nullCount, r = this, o = this.children) {
    return new P(t, e, n, s, r, o, this.dictionary);
  }
  slice(t, e) {
    const { stride: n, typeId: s, children: r } = this, o = +(this._nullCount === 0) - 1, a = s === 16 ? n : 1, c = this._sliceBuffers(t, e, n, s);
    return this.clone(
      this.type,
      this.offset + t,
      e,
      o,
      c,
      // Don't slice children if we have value offsets (the variable-width types)
      r.length === 0 || this.valueOffsets ? r : this._sliceChildren(r, a * t, a * e)
    );
  }
  _changeLengthAndBackfillNullBitmap(t) {
    if (this.typeId === l.Null)
      return this.clone(this.type, 0, t, 0);
    const { length: e, nullCount: n } = this, s = new Uint8Array((t + 63 & -64) >> 3).fill(255, 0, e >> 3);
    s[e >> 3] = (1 << e - (e & -8)) - 1, n > 0 && s.set(_n(this.offset, e, this.nullBitmap), 0);
    const r = this.buffers;
    return r[Lt.VALIDITY] = s, this.clone(this.type, 0, t, n + (t - e), r);
  }
  _sliceBuffers(t, e, n, s) {
    let r;
    const { buffers: o } = this;
    return (r = o[Lt.TYPE]) && (o[Lt.TYPE] = r.subarray(t, t + e)), (r = o[Lt.OFFSET]) && (o[Lt.OFFSET] = r.subarray(t, t + e + 1)) || // Otherwise if no offsets, slice the data buffer. Don't slice the data vector for Booleans, since the offset goes by bits not bytes
    (r = o[Lt.DATA]) && (o[Lt.DATA] = s === 6 ? r : r.subarray(n * t, n * (t + e))), o;
  }
  _sliceChildren(t, e, n) {
    return t.map((s) => s.slice(e, n));
  }
}
P.prototype.children = Object.freeze([]);
class Le extends F {
  visit(t) {
    return this.getVisitFn(t.type).call(this, t);
  }
  visitNull(t) {
    const { ["type"]: e, ["offset"]: n = 0, ["length"]: s = 0 } = t;
    return new P(e, n, s, 0);
  }
  visitBool(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, s = N(t.nullBitmap), r = k(e.ArrayType, t.data), { ["length"]: o = r.length >> 3, ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new P(e, n, o, a, [void 0, r, s]);
  }
  visitInt(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, s = N(t.nullBitmap), r = k(e.ArrayType, t.data), { ["length"]: o = r.length, ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new P(e, n, o, a, [void 0, r, s]);
  }
  visitFloat(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, s = N(t.nullBitmap), r = k(e.ArrayType, t.data), { ["length"]: o = r.length, ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new P(e, n, o, a, [void 0, r, s]);
  }
  visitUtf8(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, s = N(t.data), r = N(t.nullBitmap), o = Re(t.valueOffsets), { ["length"]: a = o.length - 1, ["nullCount"]: c = t.nullBitmap ? -1 : 0 } = t;
    return new P(e, n, a, c, [o, s, r]);
  }
  visitBinary(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, s = N(t.data), r = N(t.nullBitmap), o = Re(t.valueOffsets), { ["length"]: a = o.length - 1, ["nullCount"]: c = t.nullBitmap ? -1 : 0 } = t;
    return new P(e, n, a, c, [o, s, r]);
  }
  visitFixedSizeBinary(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, s = N(t.nullBitmap), r = k(e.ArrayType, t.data), { ["length"]: o = r.length / Mt(e), ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new P(e, n, o, a, [void 0, r, s]);
  }
  visitDate(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, s = N(t.nullBitmap), r = k(e.ArrayType, t.data), { ["length"]: o = r.length / Mt(e), ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new P(e, n, o, a, [void 0, r, s]);
  }
  visitTimestamp(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, s = N(t.nullBitmap), r = k(e.ArrayType, t.data), { ["length"]: o = r.length / Mt(e), ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new P(e, n, o, a, [void 0, r, s]);
  }
  visitTime(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, s = N(t.nullBitmap), r = k(e.ArrayType, t.data), { ["length"]: o = r.length / Mt(e), ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new P(e, n, o, a, [void 0, r, s]);
  }
  visitDecimal(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, s = N(t.nullBitmap), r = k(e.ArrayType, t.data), { ["length"]: o = r.length / Mt(e), ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new P(e, n, o, a, [void 0, r, s]);
  }
  visitList(t) {
    const { ["type"]: e, ["offset"]: n = 0, ["child"]: s } = t, r = N(t.nullBitmap), o = Re(t.valueOffsets), { ["length"]: a = o.length - 1, ["nullCount"]: c = t.nullBitmap ? -1 : 0 } = t;
    return new P(e, n, a, c, [o, void 0, r], [s]);
  }
  visitStruct(t) {
    const { ["type"]: e, ["offset"]: n = 0, ["children"]: s = [] } = t, r = N(t.nullBitmap), { length: o = s.reduce((c, { length: u }) => Math.max(c, u), 0), nullCount: a = t.nullBitmap ? -1 : 0 } = t;
    return new P(e, n, o, a, [void 0, void 0, r], s);
  }
  visitUnion(t) {
    const { ["type"]: e, ["offset"]: n = 0, ["children"]: s = [] } = t, r = N(t.nullBitmap), o = k(e.ArrayType, t.typeIds), { ["length"]: a = o.length, ["nullCount"]: c = t.nullBitmap ? -1 : 0 } = t;
    if (y.isSparseUnion(e))
      return new P(e, n, a, c, [void 0, void 0, r, o], s);
    const u = Re(t.valueOffsets);
    return new P(e, n, a, c, [u, void 0, r, o], s);
  }
  visitDictionary(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, s = N(t.nullBitmap), r = k(e.indices.ArrayType, t.data), { ["dictionary"]: o = new L([new Le().visit({ type: e.dictionary })]) } = t, { ["length"]: a = r.length, ["nullCount"]: c = t.nullBitmap ? -1 : 0 } = t;
    return new P(e, n, a, c, [void 0, r, s], [], o);
  }
  visitInterval(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, s = N(t.nullBitmap), r = k(e.ArrayType, t.data), { ["length"]: o = r.length / Mt(e), ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new P(e, n, o, a, [void 0, r, s]);
  }
  visitFixedSizeList(t) {
    const { ["type"]: e, ["offset"]: n = 0, ["child"]: s = new Le().visit({ type: e.valueType }) } = t, r = N(t.nullBitmap), { ["length"]: o = s.length / Mt(e), ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new P(e, n, o, a, [void 0, void 0, r], [s]);
  }
  visitMap(t) {
    const { ["type"]: e, ["offset"]: n = 0, ["child"]: s = new Le().visit({ type: e.childType }) } = t, r = N(t.nullBitmap), o = Re(t.valueOffsets), { ["length"]: a = o.length - 1, ["nullCount"]: c = t.nullBitmap ? -1 : 0 } = t;
    return new P(e, n, a, c, [o, void 0, r], [s]);
  }
}
function A(i) {
  return new Le().visit(i);
}
class Yn {
  constructor(t = 0, e) {
    this.numChunks = t, this.getChunkIterator = e, this.chunkIndex = 0, this.chunkIterator = this.getChunkIterator(0);
  }
  next() {
    for (; this.chunkIndex < this.numChunks; ) {
      const t = this.chunkIterator.next();
      if (!t.done)
        return t;
      ++this.chunkIndex < this.numChunks && (this.chunkIterator = this.getChunkIterator(this.chunkIndex));
    }
    return { done: !0, value: null };
  }
  [Symbol.iterator]() {
    return this;
  }
}
function fr(i) {
  return i.reduce((t, e) => t + e.nullCount, 0);
}
function pr(i) {
  return i.reduce((t, e, n) => (t[n + 1] = t[n] + e.length, t), new Uint32Array(i.length + 1));
}
function yr(i, t, e, n) {
  const s = [];
  for (let r = -1, o = i.length; ++r < o; ) {
    const a = i[r], c = t[r], { length: u } = a;
    if (c >= n)
      break;
    if (e >= c + u)
      continue;
    if (c >= e && c + u <= n) {
      s.push(a);
      continue;
    }
    const d = Math.max(0, e - c), h = Math.min(n - c, u);
    s.push(a.slice(d, h - d));
  }
  return s.length === 0 && s.push(i[0].slice(0, 0)), s;
}
function wn(i, t, e, n) {
  let s = 0, r = 0, o = t.length - 1;
  do {
    if (s >= o - 1)
      return e < t[o] ? n(i, s, e - t[s]) : null;
    r = s + Math.trunc((o - s) * 0.5), e < t[r] ? o = r : s = r;
  } while (s < o);
}
function In(i, t) {
  return i.getValid(t);
}
function Ie(i) {
  function t(e, n, s) {
    return i(e[n], s);
  }
  return function(e) {
    const n = this.data;
    return wn(n, this._offsets, e, t);
  };
}
function mr(i) {
  let t;
  function e(n, s, r) {
    return i(n[s], r, t);
  }
  return function(n, s) {
    const r = this.data;
    t = s;
    const o = wn(r, this._offsets, n, e);
    return t = void 0, o;
  };
}
function br(i) {
  let t;
  function e(n, s, r) {
    let o = r, a = 0, c = 0;
    for (let u = s - 1, d = n.length; ++u < d; ) {
      const h = n[u];
      if (~(a = i(h, t, o)))
        return c + a;
      o = 0, c += h.length;
    }
    return -1;
  }
  return function(n, s) {
    t = n;
    const r = this.data, o = typeof s != "number" ? e(r, 0, 0) : wn(r, this._offsets, s, e);
    return t = void 0, o;
  };
}
class b extends F {
}
function Ea(i, t) {
  return t === null && i.length > 0 ? 0 : -1;
}
function Ba(i, t) {
  const { nullBitmap: e } = i;
  if (!e || i.nullCount <= 0)
    return -1;
  let n = 0;
  for (const s of new gn(e, i.offset + (t || 0), i.length, e, hr)) {
    if (!s)
      return n;
    ++n;
  }
  return -1;
}
function B(i, t, e) {
  if (t === void 0)
    return -1;
  if (t === null)
    return Ba(i, e);
  const n = et.getVisitFn(i), s = Ne(t);
  for (let r = (e || 0) - 1, o = i.length; ++r < o; )
    if (s(n(i, r)))
      return r;
  return -1;
}
function _r(i, t, e) {
  const n = et.getVisitFn(i), s = Ne(t);
  for (let r = (e || 0) - 1, o = i.length; ++r < o; )
    if (s(n(i, r)))
      return r;
  return -1;
}
b.prototype.visitNull = Ea;
b.prototype.visitBool = B;
b.prototype.visitInt = B;
b.prototype.visitInt8 = B;
b.prototype.visitInt16 = B;
b.prototype.visitInt32 = B;
b.prototype.visitInt64 = B;
b.prototype.visitUint8 = B;
b.prototype.visitUint16 = B;
b.prototype.visitUint32 = B;
b.prototype.visitUint64 = B;
b.prototype.visitFloat = B;
b.prototype.visitFloat16 = B;
b.prototype.visitFloat32 = B;
b.prototype.visitFloat64 = B;
b.prototype.visitUtf8 = B;
b.prototype.visitBinary = B;
b.prototype.visitFixedSizeBinary = B;
b.prototype.visitDate = B;
b.prototype.visitDateDay = B;
b.prototype.visitDateMillisecond = B;
b.prototype.visitTimestamp = B;
b.prototype.visitTimestampSecond = B;
b.prototype.visitTimestampMillisecond = B;
b.prototype.visitTimestampMicrosecond = B;
b.prototype.visitTimestampNanosecond = B;
b.prototype.visitTime = B;
b.prototype.visitTimeSecond = B;
b.prototype.visitTimeMillisecond = B;
b.prototype.visitTimeMicrosecond = B;
b.prototype.visitTimeNanosecond = B;
b.prototype.visitDecimal = B;
b.prototype.visitList = B;
b.prototype.visitStruct = B;
b.prototype.visitUnion = B;
b.prototype.visitDenseUnion = _r;
b.prototype.visitSparseUnion = _r;
b.prototype.visitDictionary = B;
b.prototype.visitInterval = B;
b.prototype.visitIntervalDayTime = B;
b.prototype.visitIntervalYearMonth = B;
b.prototype.visitFixedSizeList = B;
b.prototype.visitMap = B;
const bi = new b();
class _ extends F {
}
function v(i) {
  const { type: t } = i;
  if (i.nullCount === 0 && i.stride === 1 && (t.typeId === l.Timestamp || t instanceof qt && t.bitWidth !== 64 || t instanceof xe && t.bitWidth !== 64 || t instanceof Pe && t.precision !== X.HALF))
    return new Yn(i.data.length, (n) => {
      const s = i.data[n];
      return s.values.subarray(0, s.length)[Symbol.iterator]();
    });
  let e = 0;
  return new Yn(i.data.length, (n) => {
    const r = i.data[n].length, o = i.slice(e, e + r);
    return e += r, new Aa(o);
  });
}
class Aa {
  constructor(t) {
    this.vector = t, this.index = 0;
  }
  next() {
    return this.index < this.vector.length ? {
      value: this.vector.get(this.index++)
    } : { done: !0, value: null };
  }
  [Symbol.iterator]() {
    return this;
  }
}
_.prototype.visitNull = v;
_.prototype.visitBool = v;
_.prototype.visitInt = v;
_.prototype.visitInt8 = v;
_.prototype.visitInt16 = v;
_.prototype.visitInt32 = v;
_.prototype.visitInt64 = v;
_.prototype.visitUint8 = v;
_.prototype.visitUint16 = v;
_.prototype.visitUint32 = v;
_.prototype.visitUint64 = v;
_.prototype.visitFloat = v;
_.prototype.visitFloat16 = v;
_.prototype.visitFloat32 = v;
_.prototype.visitFloat64 = v;
_.prototype.visitUtf8 = v;
_.prototype.visitBinary = v;
_.prototype.visitFixedSizeBinary = v;
_.prototype.visitDate = v;
_.prototype.visitDateDay = v;
_.prototype.visitDateMillisecond = v;
_.prototype.visitTimestamp = v;
_.prototype.visitTimestampSecond = v;
_.prototype.visitTimestampMillisecond = v;
_.prototype.visitTimestampMicrosecond = v;
_.prototype.visitTimestampNanosecond = v;
_.prototype.visitTime = v;
_.prototype.visitTimeSecond = v;
_.prototype.visitTimeMillisecond = v;
_.prototype.visitTimeMicrosecond = v;
_.prototype.visitTimeNanosecond = v;
_.prototype.visitDecimal = v;
_.prototype.visitList = v;
_.prototype.visitStruct = v;
_.prototype.visitUnion = v;
_.prototype.visitDenseUnion = v;
_.prototype.visitSparseUnion = v;
_.prototype.visitDictionary = v;
_.prototype.visitInterval = v;
_.prototype.visitIntervalDayTime = v;
_.prototype.visitIntervalYearMonth = v;
_.prototype.visitFixedSizeList = v;
_.prototype.visitMap = v;
const vn = new _(), Fa = (i, t) => i + t;
class Jt extends F {
  visitNull(t, e) {
    return 0;
  }
  visitInt(t, e) {
    return t.type.bitWidth / 8;
  }
  visitFloat(t, e) {
    return t.type.ArrayType.BYTES_PER_ELEMENT;
  }
  visitBool(t, e) {
    return 1 / 8;
  }
  visitDecimal(t, e) {
    return t.type.bitWidth / 8;
  }
  visitDate(t, e) {
    return (t.type.unit + 1) * 4;
  }
  visitTime(t, e) {
    return t.type.bitWidth / 8;
  }
  visitTimestamp(t, e) {
    return t.type.unit === R.SECOND ? 4 : 8;
  }
  visitInterval(t, e) {
    return (t.type.unit + 1) * 4;
  }
  visitStruct(t, e) {
    return t.children.reduce((n, s) => n + Nt.visit(s, e), 0);
  }
  visitFixedSizeBinary(t, e) {
    return t.type.byteWidth;
  }
  visitMap(t, e) {
    return 8 + t.children.reduce((n, s) => n + Nt.visit(s, e), 0);
  }
  visitDictionary(t, e) {
    var n;
    return t.type.indices.bitWidth / 8 + (((n = t.dictionary) === null || n === void 0 ? void 0 : n.getByteLength(t.values[e])) || 0);
  }
}
const Oa = ({ valueOffsets: i }, t) => 8 + (i[t + 1] - i[t]), Na = ({ valueOffsets: i }, t) => 8 + (i[t + 1] - i[t]), Ra = ({ valueOffsets: i, stride: t, children: e }, n) => {
  const s = e[0], { [n * t]: r } = i, { [n * t + 1]: o } = i, a = Nt.getVisitFn(s.type), c = s.slice(r, o - r);
  let u = 8;
  for (let d = -1, h = o - r; ++d < h; )
    u += a(c, d);
  return u;
}, Da = ({ stride: i, children: t }, e) => {
  const n = t[0], s = n.slice(e * i, i), r = Nt.getVisitFn(n.type);
  let o = 0;
  for (let a = -1, c = s.length; ++a < c; )
    o += r(s, a);
  return o;
}, La = (i, t) => i.type.mode === ot.Dense ? gr(i, t) : wr(i, t), gr = ({ type: i, children: t, typeIds: e, valueOffsets: n }, s) => {
  const r = i.typeIdToChildIndex[e[s]];
  return 8 + Nt.visit(t[r], n[s]);
}, wr = ({ children: i }, t) => 4 + Nt.visitMany(i, i.map(() => t)).reduce(Fa, 0);
Jt.prototype.visitUtf8 = Oa;
Jt.prototype.visitBinary = Na;
Jt.prototype.visitList = Ra;
Jt.prototype.visitFixedSizeList = Da;
Jt.prototype.visitUnion = La;
Jt.prototype.visitDenseUnion = gr;
Jt.prototype.visitSparseUnion = wr;
const Nt = new Jt();
var Ir;
const vr = {}, Sr = {};
class L {
  constructor(t) {
    var e, n, s;
    const r = t[0] instanceof L ? t.flatMap((a) => a.data) : t;
    if (r.length === 0 || r.some((a) => !(a instanceof P)))
      throw new TypeError("Vector constructor expects an Array of Data instances.");
    const o = (e = r[0]) === null || e === void 0 ? void 0 : e.type;
    switch (r.length) {
      case 0:
        this._offsets = [0];
        break;
      case 1: {
        const { get: a, set: c, indexOf: u, byteLength: d } = vr[o.typeId], h = r[0];
        this.isValid = (f) => In(h, f), this.get = (f) => a(h, f), this.set = (f, T) => c(h, f, T), this.indexOf = (f) => u(h, f), this.getByteLength = (f) => d(h, f), this._offsets = [0, h.length];
        break;
      }
      default:
        Object.setPrototypeOf(this, Sr[o.typeId]), this._offsets = pr(r);
        break;
    }
    this.data = r, this.type = o, this.stride = Mt(o), this.numChildren = (s = (n = o.children) === null || n === void 0 ? void 0 : n.length) !== null && s !== void 0 ? s : 0, this.length = this._offsets.at(-1);
  }
  /**
   * The aggregate size (in bytes) of this Vector's buffers and/or child Vectors.
   */
  get byteLength() {
    return this._byteLength === -1 && (this._byteLength = this.data.reduce((t, e) => t + e.byteLength, 0)), this._byteLength;
  }
  /**
   * The number of null elements in this Vector.
   */
  get nullCount() {
    return this._nullCount === -1 && (this._nullCount = fr(this.data)), this._nullCount;
  }
  /**
   * The Array or TypedArray constructor used for the JS representation
   *  of the element's values in {@link Vector.prototype.toArray `toArray()`}.
   */
  get ArrayType() {
    return this.type.ArrayType;
  }
  /**
   * The name that should be printed when the Vector is logged in a message.
   */
  get [Symbol.toStringTag]() {
    return `${this.VectorName}<${this.type[Symbol.toStringTag]}>`;
  }
  /**
   * The name of this Vector.
   */
  get VectorName() {
    return `${l[this.type.typeId]}Vector`;
  }
  /**
   * Check whether an element is null.
   * @param index The index at which to read the validity bitmap.
   */
  // @ts-ignore
  isValid(t) {
    return !1;
  }
  /**
   * Get an element value by position.
   * @param index The index of the element to read.
   */
  // @ts-ignore
  get(t) {
    return null;
  }
  /**
   * Set an element value by position.
   * @param index The index of the element to write.
   * @param value The value to set.
   */
  // @ts-ignore
  set(t, e) {
  }
  /**
   * Retrieve the index of the first occurrence of a value in an Vector.
   * @param element The value to locate in the Vector.
   * @param offset The index at which to begin the search. If offset is omitted, the search starts at index 0.
   */
  // @ts-ignore
  indexOf(t, e) {
    return -1;
  }
  includes(t, e) {
    return this.indexOf(t, e) > 0;
  }
  /**
   * Get the size in bytes of an element by index.
   * @param index The index at which to get the byteLength.
   */
  // @ts-ignore
  getByteLength(t) {
    return 0;
  }
  /**
   * Iterator for the Vector's elements.
   */
  [Symbol.iterator]() {
    return vn.visit(this);
  }
  /**
   * Combines two or more Vectors of the same type.
   * @param others Additional Vectors to add to the end of this Vector.
   */
  concat(...t) {
    return new L(this.data.concat(t.flatMap((e) => e.data).flat(Number.POSITIVE_INFINITY)));
  }
  /**
   * Return a zero-copy sub-section of this Vector.
   * @param start The beginning of the specified portion of the Vector.
   * @param end The end of the specified portion of the Vector. This is exclusive of the element at the index 'end'.
   */
  slice(t, e) {
    return new L(dr(this, t, e, ({ data: n, _offsets: s }, r, o) => yr(n, s, r, o)));
  }
  toJSON() {
    return [...this];
  }
  /**
   * Return a JavaScript Array or TypedArray of the Vector's elements.
   *
   * @note If this Vector contains a single Data chunk and the Vector's type is a
   *  primitive numeric type corresponding to one of the JavaScript TypedArrays, this
   *  method returns a zero-copy slice of the underlying TypedArray values. If there's
   *  more than one chunk, the resulting TypedArray will be a copy of the data from each
   *  chunk's underlying TypedArray values.
   *
   * @returns An Array or TypedArray of the Vector's elements, based on the Vector's DataType.
   */
  toArray() {
    const { type: t, data: e, length: n, stride: s, ArrayType: r } = this;
    switch (t.typeId) {
      case l.Int:
      case l.Float:
      case l.Decimal:
      case l.Time:
      case l.Timestamp:
        switch (e.length) {
          case 0:
            return new r();
          case 1:
            return e[0].values.subarray(0, n * s);
          default:
            return e.reduce((o, { values: a, length: c }) => (o.array.set(a.subarray(0, c * s), o.offset), o.offset += c * s, o), { array: new r(n * s), offset: 0 }).array;
        }
    }
    return [...this];
  }
  /**
   * Returns a string representation of the Vector.
   *
   * @returns A string representation of the Vector.
   */
  toString() {
    return `[${[...this].join(",")}]`;
  }
  /**
   * Returns a child Vector by name, or null if this Vector has no child with the given name.
   * @param name The name of the child to retrieve.
   */
  getChild(t) {
    var e;
    return this.getChildAt((e = this.type.children) === null || e === void 0 ? void 0 : e.findIndex((n) => n.name === t));
  }
  /**
   * Returns a child Vector by index, or null if this Vector has no child at the supplied index.
   * @param index The index of the child to retrieve.
   */
  getChildAt(t) {
    return t > -1 && t < this.numChildren ? new L(this.data.map(({ children: e }) => e[t])) : null;
  }
  get isMemoized() {
    return y.isDictionary(this.type) ? this.data[0].dictionary.isMemoized : !1;
  }
  /**
   * Adds memoization to the Vector's {@link get} method. For dictionary
   * vectors, this method return a vector that memoizes only the dictionary
   * values.
   *
   * Memoization is very useful when decoding a value is expensive such as
   * Uft8. The memoization creates a cache of the size of the Vector and
   * therfore increases memory usage.
   *
   * @returns A new vector that memoizes calls to {@link get}.
   */
  memoize() {
    if (y.isDictionary(this.type)) {
      const t = new _i(this.data[0].dictionary), e = this.data.map((n) => {
        const s = n.clone();
        return s.dictionary = t, s;
      });
      return new L(e);
    }
    return new _i(this);
  }
  /**
   * Returns a vector without memoization of the {@link get} method. If this
   * vector is not memoized, this method returns this vector.
   *
   * @returns A a vector without memoization.
   */
  unmemoize() {
    if (y.isDictionary(this.type) && this.isMemoized) {
      const t = this.data[0].dictionary.unmemoize(), e = this.data.map((n) => {
        const s = n.clone();
        return s.dictionary = t, s;
      });
      return new L(e);
    }
    return this;
  }
}
Ir = Symbol.toStringTag;
L[Ir] = ((i) => {
  i.type = y.prototype, i.data = [], i.length = 0, i.stride = 1, i.numChildren = 0, i._nullCount = -1, i._byteLength = -1, i._offsets = new Uint32Array([0]), i[Symbol.isConcatSpreadable] = !0;
  const t = Object.keys(l).map((e) => l[e]).filter((e) => typeof e == "number" && e !== l.NONE);
  for (const e of t) {
    const n = et.getVisitFnByTypeId(e), s = ft.getVisitFnByTypeId(e), r = bi.getVisitFnByTypeId(e), o = Nt.getVisitFnByTypeId(e);
    vr[e] = { get: n, set: s, indexOf: r, byteLength: o }, Sr[e] = Object.create(i, {
      isValid: { value: Ie(In) },
      get: { value: Ie(et.getVisitFnByTypeId(e)) },
      set: { value: mr(ft.getVisitFnByTypeId(e)) },
      indexOf: { value: br(bi.getVisitFnByTypeId(e)) },
      getByteLength: { value: Ie(Nt.getVisitFnByTypeId(e)) }
    });
  }
  return "Vector";
})(L.prototype);
class _i extends L {
  constructor(t) {
    super(t.data);
    const e = this.get, n = this.set, s = this.slice, r = new Array(this.length);
    Object.defineProperty(this, "get", {
      value(o) {
        const a = r[o];
        if (a !== void 0)
          return a;
        const c = e.call(this, o);
        return r[o] = c, c;
      }
    }), Object.defineProperty(this, "set", {
      value(o, a) {
        n.call(this, o, a), r[o] = a;
      }
    }), Object.defineProperty(this, "slice", {
      value: (o, a) => new _i(s.call(this, o, a))
    }), Object.defineProperty(this, "isMemoized", { value: !0 }), Object.defineProperty(this, "unmemoize", {
      value: () => new L(this.data)
    }), Object.defineProperty(this, "memoize", {
      value: () => this
    });
  }
}
class Zi {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  /**
   * Index to the start of the RecordBlock (note this is past the Message header)
   */
  offset() {
    return this.bb.readInt64(this.bb_pos);
  }
  /**
   * Length of the metadata
   */
  metaDataLength() {
    return this.bb.readInt32(this.bb_pos + 8);
  }
  /**
   * Length of the data (this is aligned so there can be a gap between this and
   * the metadata).
   */
  bodyLength() {
    return this.bb.readInt64(this.bb_pos + 16);
  }
  static sizeOf() {
    return 24;
  }
  static createBlock(t, e, n, s) {
    return t.prep(8, 24), t.writeInt64(BigInt(s ?? 0)), t.pad(4), t.writeInt32(n), t.writeInt64(BigInt(e ?? 0)), t.offset();
  }
}
const ji = 2, vt = 4, kt = 4, C = 4, $t = new Int32Array(2), Wn = new Float32Array($t.buffer), Gn = new Float64Array($t.buffer), He = new Uint16Array(new Uint8Array([1, 0]).buffer)[0] === 1;
var Xi;
(function(i) {
  i[i.UTF8_BYTES = 1] = "UTF8_BYTES", i[i.UTF16_STRING = 2] = "UTF16_STRING";
})(Xi || (Xi = {}));
let Se = class Tr {
  /**
   * Create a new ByteBuffer with a given array of bytes (`Uint8Array`)
   */
  constructor(t) {
    this.bytes_ = t, this.position_ = 0, this.text_decoder_ = new TextDecoder();
  }
  /**
   * Create and allocate a new ByteBuffer with a given size.
   */
  static allocate(t) {
    return new Tr(new Uint8Array(t));
  }
  clear() {
    this.position_ = 0;
  }
  /**
   * Get the underlying `Uint8Array`.
   */
  bytes() {
    return this.bytes_;
  }
  /**
   * Get the buffer's position.
   */
  position() {
    return this.position_;
  }
  /**
   * Set the buffer's position.
   */
  setPosition(t) {
    this.position_ = t;
  }
  /**
   * Get the buffer's capacity.
   */
  capacity() {
    return this.bytes_.length;
  }
  readInt8(t) {
    return this.readUint8(t) << 24 >> 24;
  }
  readUint8(t) {
    return this.bytes_[t];
  }
  readInt16(t) {
    return this.readUint16(t) << 16 >> 16;
  }
  readUint16(t) {
    return this.bytes_[t] | this.bytes_[t + 1] << 8;
  }
  readInt32(t) {
    return this.bytes_[t] | this.bytes_[t + 1] << 8 | this.bytes_[t + 2] << 16 | this.bytes_[t + 3] << 24;
  }
  readUint32(t) {
    return this.readInt32(t) >>> 0;
  }
  readInt64(t) {
    return BigInt.asIntN(64, BigInt(this.readUint32(t)) + (BigInt(this.readUint32(t + 4)) << BigInt(32)));
  }
  readUint64(t) {
    return BigInt.asUintN(64, BigInt(this.readUint32(t)) + (BigInt(this.readUint32(t + 4)) << BigInt(32)));
  }
  readFloat32(t) {
    return $t[0] = this.readInt32(t), Wn[0];
  }
  readFloat64(t) {
    return $t[He ? 0 : 1] = this.readInt32(t), $t[He ? 1 : 0] = this.readInt32(t + 4), Gn[0];
  }
  writeInt8(t, e) {
    this.bytes_[t] = e;
  }
  writeUint8(t, e) {
    this.bytes_[t] = e;
  }
  writeInt16(t, e) {
    this.bytes_[t] = e, this.bytes_[t + 1] = e >> 8;
  }
  writeUint16(t, e) {
    this.bytes_[t] = e, this.bytes_[t + 1] = e >> 8;
  }
  writeInt32(t, e) {
    this.bytes_[t] = e, this.bytes_[t + 1] = e >> 8, this.bytes_[t + 2] = e >> 16, this.bytes_[t + 3] = e >> 24;
  }
  writeUint32(t, e) {
    this.bytes_[t] = e, this.bytes_[t + 1] = e >> 8, this.bytes_[t + 2] = e >> 16, this.bytes_[t + 3] = e >> 24;
  }
  writeInt64(t, e) {
    this.writeInt32(t, Number(BigInt.asIntN(32, e))), this.writeInt32(t + 4, Number(BigInt.asIntN(32, e >> BigInt(32))));
  }
  writeUint64(t, e) {
    this.writeUint32(t, Number(BigInt.asUintN(32, e))), this.writeUint32(t + 4, Number(BigInt.asUintN(32, e >> BigInt(32))));
  }
  writeFloat32(t, e) {
    Wn[0] = e, this.writeInt32(t, $t[0]);
  }
  writeFloat64(t, e) {
    Gn[0] = e, this.writeInt32(t, $t[He ? 0 : 1]), this.writeInt32(t + 4, $t[He ? 1 : 0]);
  }
  /**
   * Return the file identifier.   Behavior is undefined for FlatBuffers whose
   * schema does not include a file_identifier (likely points at padding or the
   * start of a the root vtable).
   */
  getBufferIdentifier() {
    if (this.bytes_.length < this.position_ + vt + kt)
      throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");
    let t = "";
    for (let e = 0; e < kt; e++)
      t += String.fromCharCode(this.readInt8(this.position_ + vt + e));
    return t;
  }
  /**
   * Look up a field in the vtable, return an offset into the object, or 0 if the
   * field is not present.
   */
  __offset(t, e) {
    const n = t - this.readInt32(t);
    return e < this.readInt16(n) ? this.readInt16(n + e) : 0;
  }
  /**
   * Initialize any Table-derived type to point to the union at the given offset.
   */
  __union(t, e) {
    return t.bb_pos = e + this.readInt32(e), t.bb = this, t;
  }
  /**
   * Create a JavaScript string from UTF-8 data stored inside the FlatBuffer.
   * This allocates a new string and converts to wide chars upon each access.
   *
   * To avoid the conversion to string, pass Encoding.UTF8_BYTES as the
   * "optionalEncoding" argument. This is useful for avoiding conversion when
   * the data will just be packaged back up in another FlatBuffer later on.
   *
   * @param offset
   * @param opt_encoding Defaults to UTF16_STRING
   */
  __string(t, e) {
    t += this.readInt32(t);
    const n = this.readInt32(t);
    t += vt;
    const s = this.bytes_.subarray(t, t + n);
    return e === Xi.UTF8_BYTES ? s : this.text_decoder_.decode(s);
  }
  /**
   * Handle unions that can contain string as its member, if a Table-derived type then initialize it,
   * if a string then return a new one
   *
   * WARNING: strings are immutable in JS so we can't change the string that the user gave us, this
   * makes the behaviour of __union_with_string different compared to __union
   */
  __union_with_string(t, e) {
    return typeof t == "string" ? this.__string(e) : this.__union(t, e);
  }
  /**
   * Retrieve the relative offset stored at "offset"
   */
  __indirect(t) {
    return t + this.readInt32(t);
  }
  /**
   * Get the start of data of a vector whose offset is stored at "offset" in this object.
   */
  __vector(t) {
    return t + this.readInt32(t) + vt;
  }
  /**
   * Get the length of a vector whose offset is stored at "offset" in this object.
   */
  __vector_len(t) {
    return this.readInt32(t + this.readInt32(t));
  }
  __has_identifier(t) {
    if (t.length != kt)
      throw new Error("FlatBuffers: file identifier must be length " + kt);
    for (let e = 0; e < kt; e++)
      if (t.charCodeAt(e) != this.readInt8(this.position() + vt + e))
        return !1;
    return !0;
  }
  /**
   * A helper function for generating list for obj api
   */
  createScalarList(t, e) {
    const n = [];
    for (let s = 0; s < e; ++s) {
      const r = t(s);
      r !== null && n.push(r);
    }
    return n;
  }
  /**
   * A helper function for generating list for obj api
   * @param listAccessor function that accepts an index and return data at that index
   * @param listLength listLength
   * @param res result list
   */
  createObjList(t, e) {
    const n = [];
    for (let s = 0; s < e; ++s) {
      const r = t(s);
      r !== null && n.push(r.unpack());
    }
    return n;
  }
}, Er = class Br {
  /**
   * Create a FlatBufferBuilder.
   */
  constructor(t) {
    this.minalign = 1, this.vtable = null, this.vtable_in_use = 0, this.isNested = !1, this.object_start = 0, this.vtables = [], this.vector_num_elems = 0, this.force_defaults = !1, this.string_maps = null, this.text_encoder = new TextEncoder();
    let e;
    t ? e = t : e = 1024, this.bb = Se.allocate(e), this.space = e;
  }
  clear() {
    this.bb.clear(), this.space = this.bb.capacity(), this.minalign = 1, this.vtable = null, this.vtable_in_use = 0, this.isNested = !1, this.object_start = 0, this.vtables = [], this.vector_num_elems = 0, this.force_defaults = !1, this.string_maps = null;
  }
  /**
   * In order to save space, fields that are set to their default value
   * don't get serialized into the buffer. Forcing defaults provides a
   * way to manually disable this optimization.
   *
   * @param forceDefaults true always serializes default values
   */
  forceDefaults(t) {
    this.force_defaults = t;
  }
  /**
   * Get the ByteBuffer representing the FlatBuffer. Only call this after you've
   * called finish(). The actual data starts at the ByteBuffer's current position,
   * not necessarily at 0.
   */
  dataBuffer() {
    return this.bb;
  }
  /**
   * Get the bytes representing the FlatBuffer. Only call this after you've
   * called finish().
   */
  asUint8Array() {
    return this.bb.bytes().subarray(this.bb.position(), this.bb.position() + this.offset());
  }
  /**
   * Prepare to write an element of `size` after `additional_bytes` have been
   * written, e.g. if you write a string, you need to align such the int length
   * field is aligned to 4 bytes, and the string data follows it directly. If all
   * you need to do is alignment, `additional_bytes` will be 0.
   *
   * @param size This is the of the new element to write
   * @param additional_bytes The padding size
   */
  prep(t, e) {
    t > this.minalign && (this.minalign = t);
    const n = ~(this.bb.capacity() - this.space + e) + 1 & t - 1;
    for (; this.space < n + t + e; ) {
      const s = this.bb.capacity();
      this.bb = Br.growByteBuffer(this.bb), this.space += this.bb.capacity() - s;
    }
    this.pad(n);
  }
  pad(t) {
    for (let e = 0; e < t; e++)
      this.bb.writeInt8(--this.space, 0);
  }
  writeInt8(t) {
    this.bb.writeInt8(this.space -= 1, t);
  }
  writeInt16(t) {
    this.bb.writeInt16(this.space -= 2, t);
  }
  writeInt32(t) {
    this.bb.writeInt32(this.space -= 4, t);
  }
  writeInt64(t) {
    this.bb.writeInt64(this.space -= 8, t);
  }
  writeFloat32(t) {
    this.bb.writeFloat32(this.space -= 4, t);
  }
  writeFloat64(t) {
    this.bb.writeFloat64(this.space -= 8, t);
  }
  /**
   * Add an `int8` to the buffer, properly aligned, and grows the buffer (if necessary).
   * @param value The `int8` to add the buffer.
   */
  addInt8(t) {
    this.prep(1, 0), this.writeInt8(t);
  }
  /**
   * Add an `int16` to the buffer, properly aligned, and grows the buffer (if necessary).
   * @param value The `int16` to add the buffer.
   */
  addInt16(t) {
    this.prep(2, 0), this.writeInt16(t);
  }
  /**
   * Add an `int32` to the buffer, properly aligned, and grows the buffer (if necessary).
   * @param value The `int32` to add the buffer.
   */
  addInt32(t) {
    this.prep(4, 0), this.writeInt32(t);
  }
  /**
   * Add an `int64` to the buffer, properly aligned, and grows the buffer (if necessary).
   * @param value The `int64` to add the buffer.
   */
  addInt64(t) {
    this.prep(8, 0), this.writeInt64(t);
  }
  /**
   * Add a `float32` to the buffer, properly aligned, and grows the buffer (if necessary).
   * @param value The `float32` to add the buffer.
   */
  addFloat32(t) {
    this.prep(4, 0), this.writeFloat32(t);
  }
  /**
   * Add a `float64` to the buffer, properly aligned, and grows the buffer (if necessary).
   * @param value The `float64` to add the buffer.
   */
  addFloat64(t) {
    this.prep(8, 0), this.writeFloat64(t);
  }
  addFieldInt8(t, e, n) {
    (this.force_defaults || e != n) && (this.addInt8(e), this.slot(t));
  }
  addFieldInt16(t, e, n) {
    (this.force_defaults || e != n) && (this.addInt16(e), this.slot(t));
  }
  addFieldInt32(t, e, n) {
    (this.force_defaults || e != n) && (this.addInt32(e), this.slot(t));
  }
  addFieldInt64(t, e, n) {
    (this.force_defaults || e !== n) && (this.addInt64(e), this.slot(t));
  }
  addFieldFloat32(t, e, n) {
    (this.force_defaults || e != n) && (this.addFloat32(e), this.slot(t));
  }
  addFieldFloat64(t, e, n) {
    (this.force_defaults || e != n) && (this.addFloat64(e), this.slot(t));
  }
  addFieldOffset(t, e, n) {
    (this.force_defaults || e != n) && (this.addOffset(e), this.slot(t));
  }
  /**
   * Structs are stored inline, so nothing additional is being added. `d` is always 0.
   */
  addFieldStruct(t, e, n) {
    e != n && (this.nested(e), this.slot(t));
  }
  /**
   * Structures are always stored inline, they need to be created right
   * where they're used.  You'll get this assertion failure if you
   * created it elsewhere.
   */
  nested(t) {
    if (t != this.offset())
      throw new TypeError("FlatBuffers: struct must be serialized inline.");
  }
  /**
   * Should not be creating any other object, string or vector
   * while an object is being constructed
   */
  notNested() {
    if (this.isNested)
      throw new TypeError("FlatBuffers: object serialization must not be nested.");
  }
  /**
   * Set the current vtable at `voffset` to the current location in the buffer.
   */
  slot(t) {
    this.vtable !== null && (this.vtable[t] = this.offset());
  }
  /**
   * @returns Offset relative to the end of the buffer.
   */
  offset() {
    return this.bb.capacity() - this.space;
  }
  /**
   * Doubles the size of the backing ByteBuffer and copies the old data towards
   * the end of the new buffer (since we build the buffer backwards).
   *
   * @param bb The current buffer with the existing data
   * @returns A new byte buffer with the old data copied
   * to it. The data is located at the end of the buffer.
   *
   * uint8Array.set() formally takes {Array<number>|ArrayBufferView}, so to pass
   * it a uint8Array we need to suppress the type check:
   * @suppress {checkTypes}
   */
  static growByteBuffer(t) {
    const e = t.capacity();
    if (e & 3221225472)
      throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");
    const n = e << 1, s = Se.allocate(n);
    return s.setPosition(n - e), s.bytes().set(t.bytes(), n - e), s;
  }
  /**
   * Adds on offset, relative to where it will be written.
   *
   * @param offset The offset to add.
   */
  addOffset(t) {
    this.prep(vt, 0), this.writeInt32(this.offset() - t + vt);
  }
  /**
   * Start encoding a new object in the buffer.  Users will not usually need to
   * call this directly. The FlatBuffers compiler will generate helper methods
   * that call this method internally.
   */
  startObject(t) {
    this.notNested(), this.vtable == null && (this.vtable = []), this.vtable_in_use = t;
    for (let e = 0; e < t; e++)
      this.vtable[e] = 0;
    this.isNested = !0, this.object_start = this.offset();
  }
  /**
   * Finish off writing the object that is under construction.
   *
   * @returns The offset to the object inside `dataBuffer`
   */
  endObject() {
    if (this.vtable == null || !this.isNested)
      throw new Error("FlatBuffers: endObject called without startObject");
    this.addInt32(0);
    const t = this.offset();
    let e = this.vtable_in_use - 1;
    for (; e >= 0 && this.vtable[e] == 0; e--)
      ;
    const n = e + 1;
    for (; e >= 0; e--)
      this.addInt16(this.vtable[e] != 0 ? t - this.vtable[e] : 0);
    const s = 2;
    this.addInt16(t - this.object_start);
    const r = (n + s) * ji;
    this.addInt16(r);
    let o = 0;
    const a = this.space;
    t:
      for (e = 0; e < this.vtables.length; e++) {
        const c = this.bb.capacity() - this.vtables[e];
        if (r == this.bb.readInt16(c)) {
          for (let u = ji; u < r; u += ji)
            if (this.bb.readInt16(a + u) != this.bb.readInt16(c + u))
              continue t;
          o = this.vtables[e];
          break;
        }
      }
    return o ? (this.space = this.bb.capacity() - t, this.bb.writeInt32(this.space, o - t)) : (this.vtables.push(this.offset()), this.bb.writeInt32(this.bb.capacity() - t, this.offset() - t)), this.isNested = !1, t;
  }
  /**
   * Finalize a buffer, poiting to the given `root_table`.
   */
  finish(t, e, n) {
    const s = n ? C : 0;
    if (e) {
      const r = e;
      if (this.prep(this.minalign, vt + kt + s), r.length != kt)
        throw new TypeError("FlatBuffers: file identifier must be length " + kt);
      for (let o = kt - 1; o >= 0; o--)
        this.writeInt8(r.charCodeAt(o));
    }
    this.prep(this.minalign, vt + s), this.addOffset(t), s && this.addInt32(this.bb.capacity() - this.space), this.bb.setPosition(this.space);
  }
  /**
   * Finalize a size prefixed buffer, pointing to the given `root_table`.
   */
  finishSizePrefixed(t, e) {
    this.finish(t, e, !0);
  }
  /**
   * This checks a required field has been set in a given table that has
   * just been constructed.
   */
  requiredField(t, e) {
    const n = this.bb.capacity() - t, s = n - this.bb.readInt32(n);
    if (!(e < this.bb.readInt16(s) && this.bb.readInt16(s + e) != 0))
      throw new TypeError("FlatBuffers: field " + e + " must be set");
  }
  /**
   * Start a new array/vector of objects.  Users usually will not call
   * this directly. The FlatBuffers compiler will create a start/end
   * method for vector types in generated code.
   *
   * @param elem_size The size of each element in the array
   * @param num_elems The number of elements in the array
   * @param alignment The alignment of the array
   */
  startVector(t, e, n) {
    this.notNested(), this.vector_num_elems = e, this.prep(vt, t * e), this.prep(n, t * e);
  }
  /**
   * Finish off the creation of an array and all its elements. The array must be
   * created with `startVector`.
   *
   * @returns The offset at which the newly created array
   * starts.
   */
  endVector() {
    return this.writeInt32(this.vector_num_elems), this.offset();
  }
  /**
   * Encode the string `s` in the buffer using UTF-8. If the string passed has
   * already been seen, we return the offset of the already written string
   *
   * @param s The string to encode
   * @return The offset in the buffer where the encoded string starts
   */
  createSharedString(t) {
    if (!t)
      return 0;
    if (this.string_maps || (this.string_maps = /* @__PURE__ */ new Map()), this.string_maps.has(t))
      return this.string_maps.get(t);
    const e = this.createString(t);
    return this.string_maps.set(t, e), e;
  }
  /**
   * Encode the string `s` in the buffer using UTF-8. If a Uint8Array is passed
   * instead of a string, it is assumed to contain valid UTF-8 encoded data.
   *
   * @param s The string to encode
   * @return The offset in the buffer where the encoded string starts
   */
  createString(t) {
    if (t == null)
      return 0;
    let e;
    t instanceof Uint8Array ? e = t : e = this.text_encoder.encode(t), this.addInt8(0), this.startVector(1, e.length, 1), this.bb.setPosition(this.space -= e.length);
    for (let n = 0, s = this.space, r = this.bb.bytes(); n < e.length; n++)
      r[s++] = e[n];
    return this.endVector();
  }
  /**
   * A helper function to pack an object
   *
   * @returns offset of obj
   */
  createObjectOffset(t) {
    return t === null ? 0 : typeof t == "string" ? this.createString(t) : t.pack(this);
  }
  /**
   * A helper function to pack a list of object
   *
   * @returns list of offsets of each non null object
   */
  createObjectOffsetList(t) {
    const e = [];
    for (let n = 0; n < t.length; ++n) {
      const s = t[n];
      if (s !== null)
        e.push(this.createObjectOffset(s));
      else
        throw new TypeError("FlatBuffers: Argument for createObjectOffsetList cannot contain null.");
    }
    return e;
  }
  createStructOffsetList(t, e) {
    return e(this, t.length), this.createObjectOffsetList(t.slice().reverse()), this.endVector();
  }
};
class W {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsKeyValue(t, e) {
    return (e || new W()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsKeyValue(t, e) {
    return t.setPosition(t.position() + C), (e || new W()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  key(t) {
    const e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : null;
  }
  value(t) {
    const e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : null;
  }
  static startKeyValue(t) {
    t.startObject(2);
  }
  static addKey(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addValue(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endKeyValue(t) {
    return t.endObject();
  }
  static createKeyValue(t, e, n) {
    return W.startKeyValue(t), W.addKey(t, e), W.addValue(t, n), W.endKeyValue(t);
  }
}
var Te;
(function(i) {
  i[i.V1 = 0] = "V1", i[i.V2 = 1] = "V2", i[i.V3 = 2] = "V3", i[i.V4 = 3] = "V4", i[i.V5 = 4] = "V5";
})(Te || (Te = {}));
var Ee;
(function(i) {
  i[i.Little = 0] = "Little", i[i.Big = 1] = "Big";
})(Ee || (Ee = {}));
var gi;
(function(i) {
  i[i.DenseArray = 0] = "DenseArray";
})(gi || (gi = {}));
class st {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsInt(t, e) {
    return (e || new st()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsInt(t, e) {
    return t.setPosition(t.position() + C), (e || new st()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  bitWidth() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  isSigned() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? !!this.bb.readInt8(this.bb_pos + t) : !1;
  }
  static startInt(t) {
    t.startObject(2);
  }
  static addBitWidth(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addIsSigned(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static endInt(t) {
    return t.endObject();
  }
  static createInt(t, e, n) {
    return st.startInt(t), st.addBitWidth(t, e), st.addIsSigned(t, n), st.endInt(t);
  }
}
class Ct {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsDictionaryEncoding(t, e) {
    return (e || new Ct()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDictionaryEncoding(t, e) {
    return t.setPosition(t.position() + C), (e || new Ct()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  /**
   * The known dictionary id in the application where this data is used. In
   * the file or streaming formats, the dictionary ids are found in the
   * DictionaryBatch messages
   */
  id() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt64(this.bb_pos + t) : BigInt("0");
  }
  /**
   * The dictionary indices are constrained to be non-negative integers. If
   * this field is null, the indices must be signed int32. To maximize
   * cross-language compatibility and performance, implementations are
   * recommended to prefer signed integer types over unsigned integer types
   * and to avoid uint64 indices unless they are required by an application.
   */
  indexType(t) {
    const e = this.bb.__offset(this.bb_pos, 6);
    return e ? (t || new st()).__init(this.bb.__indirect(this.bb_pos + e), this.bb) : null;
  }
  /**
   * By default, dictionaries are not ordered, or the order does not have
   * semantic meaning. In some statistical, applications, dictionary-encoding
   * is used to represent ordered categorical data, and we provide a way to
   * preserve that metadata here
   */
  isOrdered() {
    const t = this.bb.__offset(this.bb_pos, 8);
    return t ? !!this.bb.readInt8(this.bb_pos + t) : !1;
  }
  dictionaryKind() {
    const t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt16(this.bb_pos + t) : gi.DenseArray;
  }
  static startDictionaryEncoding(t) {
    t.startObject(4);
  }
  static addId(t, e) {
    t.addFieldInt64(0, e, BigInt("0"));
  }
  static addIndexType(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addIsOrdered(t, e) {
    t.addFieldInt8(2, +e, 0);
  }
  static addDictionaryKind(t, e) {
    t.addFieldInt16(3, e, gi.DenseArray);
  }
  static endDictionaryEncoding(t) {
    return t.endObject();
  }
}
class te {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsBinary(t, e) {
    return (e || new te()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBinary(t, e) {
    return t.setPosition(t.position() + C), (e || new te()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startBinary(t) {
    t.startObject(0);
  }
  static endBinary(t) {
    return t.endObject();
  }
  static createBinary(t) {
    return te.startBinary(t), te.endBinary(t);
  }
}
class ee {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsBool(t, e) {
    return (e || new ee()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBool(t, e) {
    return t.setPosition(t.position() + C), (e || new ee()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startBool(t) {
    t.startObject(0);
  }
  static endBool(t) {
    return t.endObject();
  }
  static createBool(t) {
    return ee.startBool(t), ee.endBool(t);
  }
}
var wi;
(function(i) {
  i[i.DAY = 0] = "DAY", i[i.MILLISECOND = 1] = "MILLISECOND";
})(wi || (wi = {}));
let Je = class fe {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsDate(t, e) {
    return (e || new fe()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDate(t, e) {
    return t.setPosition(t.position() + C), (e || new fe()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  unit() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : wi.MILLISECOND;
  }
  static startDate(t) {
    t.startObject(1);
  }
  static addUnit(t, e) {
    t.addFieldInt16(0, e, wi.MILLISECOND);
  }
  static endDate(t) {
    return t.endObject();
  }
  static createDate(t, e) {
    return fe.startDate(t), fe.addUnit(t, e), fe.endDate(t);
  }
};
class K {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsDecimal(t, e) {
    return (e || new K()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDecimal(t, e) {
    return t.setPosition(t.position() + C), (e || new K()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  /**
   * Total number of decimal digits
   */
  precision() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  /**
   * Number of digits after the decimal point "."
   */
  scale() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  /**
   * Number of bits per value. The only accepted widths are 128 and 256.
   * We use bitWidth for consistency with Int::bitWidth.
   */
  bitWidth() {
    const t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 128;
  }
  static startDecimal(t) {
    t.startObject(3);
  }
  static addPrecision(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addScale(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addBitWidth(t, e) {
    t.addFieldInt32(2, e, 128);
  }
  static endDecimal(t) {
    return t.endObject();
  }
  static createDecimal(t, e, n, s) {
    return K.startDecimal(t), K.addPrecision(t, e), K.addScale(t, n), K.addBitWidth(t, s), K.endDecimal(t);
  }
}
var Be;
(function(i) {
  i[i.SECOND = 0] = "SECOND", i[i.MILLISECOND = 1] = "MILLISECOND", i[i.MICROSECOND = 2] = "MICROSECOND", i[i.NANOSECOND = 3] = "NANOSECOND";
})(Be || (Be = {}));
class St {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsFixedSizeBinary(t, e) {
    return (e || new St()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFixedSizeBinary(t, e) {
    return t.setPosition(t.position() + C), (e || new St()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  /**
   * Number of bytes per value
   */
  byteWidth() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startFixedSizeBinary(t) {
    t.startObject(1);
  }
  static addByteWidth(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static endFixedSizeBinary(t) {
    return t.endObject();
  }
  static createFixedSizeBinary(t, e) {
    return St.startFixedSizeBinary(t), St.addByteWidth(t, e), St.endFixedSizeBinary(t);
  }
}
class Tt {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsFixedSizeList(t, e) {
    return (e || new Tt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFixedSizeList(t, e) {
    return t.setPosition(t.position() + C), (e || new Tt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  /**
   * Number of list items per value
   */
  listSize() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startFixedSizeList(t) {
    t.startObject(1);
  }
  static addListSize(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static endFixedSizeList(t) {
    return t.endObject();
  }
  static createFixedSizeList(t, e) {
    return Tt.startFixedSizeList(t), Tt.addListSize(t, e), Tt.endFixedSizeList(t);
  }
}
var Ii;
(function(i) {
  i[i.HALF = 0] = "HALF", i[i.SINGLE = 1] = "SINGLE", i[i.DOUBLE = 2] = "DOUBLE";
})(Ii || (Ii = {}));
class Et {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsFloatingPoint(t, e) {
    return (e || new Et()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFloatingPoint(t, e) {
    return t.setPosition(t.position() + C), (e || new Et()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  precision() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : Ii.HALF;
  }
  static startFloatingPoint(t) {
    t.startObject(1);
  }
  static addPrecision(t, e) {
    t.addFieldInt16(0, e, Ii.HALF);
  }
  static endFloatingPoint(t) {
    return t.endObject();
  }
  static createFloatingPoint(t, e) {
    return Et.startFloatingPoint(t), Et.addPrecision(t, e), Et.endFloatingPoint(t);
  }
}
var vi;
(function(i) {
  i[i.YEAR_MONTH = 0] = "YEAR_MONTH", i[i.DAY_TIME = 1] = "DAY_TIME", i[i.MONTH_DAY_NANO = 2] = "MONTH_DAY_NANO";
})(vi || (vi = {}));
class Bt {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsInterval(t, e) {
    return (e || new Bt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsInterval(t, e) {
    return t.setPosition(t.position() + C), (e || new Bt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  unit() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : vi.YEAR_MONTH;
  }
  static startInterval(t) {
    t.startObject(1);
  }
  static addUnit(t, e) {
    t.addFieldInt16(0, e, vi.YEAR_MONTH);
  }
  static endInterval(t) {
    return t.endObject();
  }
  static createInterval(t, e) {
    return Bt.startInterval(t), Bt.addUnit(t, e), Bt.endInterval(t);
  }
}
class ie {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsList(t, e) {
    return (e || new ie()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsList(t, e) {
    return t.setPosition(t.position() + C), (e || new ie()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startList(t) {
    t.startObject(0);
  }
  static endList(t) {
    return t.endObject();
  }
  static createList(t) {
    return ie.startList(t), ie.endList(t);
  }
}
let Ze = class pe {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsMap(t, e) {
    return (e || new pe()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsMap(t, e) {
    return t.setPosition(t.position() + C), (e || new pe()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  /**
   * Set to true if the keys within each value are sorted
   */
  keysSorted() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? !!this.bb.readInt8(this.bb_pos + t) : !1;
  }
  static startMap(t) {
    t.startObject(1);
  }
  static addKeysSorted(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static endMap(t) {
    return t.endObject();
  }
  static createMap(t, e) {
    return pe.startMap(t), pe.addKeysSorted(t, e), pe.endMap(t);
  }
};
class ne {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsNull(t, e) {
    return (e || new ne()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsNull(t, e) {
    return t.setPosition(t.position() + C), (e || new ne()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startNull(t) {
    t.startObject(0);
  }
  static endNull(t) {
    return t.endObject();
  }
  static createNull(t) {
    return ne.startNull(t), ne.endNull(t);
  }
}
class se {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsStruct_(t, e) {
    return (e || new se()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsStruct_(t, e) {
    return t.setPosition(t.position() + C), (e || new se()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startStruct_(t) {
    t.startObject(0);
  }
  static endStruct_(t) {
    return t.endObject();
  }
  static createStruct_(t) {
    return se.startStruct_(t), se.endStruct_(t);
  }
}
class ut {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsTime(t, e) {
    return (e || new ut()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTime(t, e) {
    return t.setPosition(t.position() + C), (e || new ut()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  unit() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : Be.MILLISECOND;
  }
  bitWidth() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 32;
  }
  static startTime(t) {
    t.startObject(2);
  }
  static addUnit(t, e) {
    t.addFieldInt16(0, e, Be.MILLISECOND);
  }
  static addBitWidth(t, e) {
    t.addFieldInt32(1, e, 32);
  }
  static endTime(t) {
    return t.endObject();
  }
  static createTime(t, e, n) {
    return ut.startTime(t), ut.addUnit(t, e), ut.addBitWidth(t, n), ut.endTime(t);
  }
}
class dt {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsTimestamp(t, e) {
    return (e || new dt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTimestamp(t, e) {
    return t.setPosition(t.position() + C), (e || new dt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  unit() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : Be.SECOND;
  }
  timezone(t) {
    const e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : null;
  }
  static startTimestamp(t) {
    t.startObject(2);
  }
  static addUnit(t, e) {
    t.addFieldInt16(0, e, Be.SECOND);
  }
  static addTimezone(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endTimestamp(t) {
    return t.endObject();
  }
  static createTimestamp(t, e, n) {
    return dt.startTimestamp(t), dt.addUnit(t, e), dt.addTimezone(t, n), dt.endTimestamp(t);
  }
}
var Si;
(function(i) {
  i[i.Sparse = 0] = "Sparse", i[i.Dense = 1] = "Dense";
})(Si || (Si = {}));
class J {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsUnion(t, e) {
    return (e || new J()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsUnion(t, e) {
    return t.setPosition(t.position() + C), (e || new J()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  mode() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : Si.Sparse;
  }
  typeIds(t) {
    const e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + t * 4) : 0;
  }
  typeIdsLength() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  typeIdsArray() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t)) : null;
  }
  static startUnion(t) {
    t.startObject(2);
  }
  static addMode(t, e) {
    t.addFieldInt16(0, e, Si.Sparse);
  }
  static addTypeIds(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createTypeIdsVector(t, e) {
    t.startVector(4, e.length, 4);
    for (let n = e.length - 1; n >= 0; n--)
      t.addInt32(e[n]);
    return t.endVector();
  }
  static startTypeIdsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endUnion(t) {
    return t.endObject();
  }
  static createUnion(t, e, n) {
    return J.startUnion(t), J.addMode(t, e), J.addTypeIds(t, n), J.endUnion(t);
  }
}
class re {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsUtf8(t, e) {
    return (e || new re()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsUtf8(t, e) {
    return t.setPosition(t.position() + C), (e || new re()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startUtf8(t) {
    t.startObject(0);
  }
  static endUtf8(t) {
    return t.endObject();
  }
  static createUtf8(t) {
    return re.startUtf8(t), re.endUtf8(t);
  }
}
var V;
(function(i) {
  i[i.NONE = 0] = "NONE", i[i.Null = 1] = "Null", i[i.Int = 2] = "Int", i[i.FloatingPoint = 3] = "FloatingPoint", i[i.Binary = 4] = "Binary", i[i.Utf8 = 5] = "Utf8", i[i.Bool = 6] = "Bool", i[i.Decimal = 7] = "Decimal", i[i.Date = 8] = "Date", i[i.Time = 9] = "Time", i[i.Timestamp = 10] = "Timestamp", i[i.Interval = 11] = "Interval", i[i.List = 12] = "List", i[i.Struct_ = 13] = "Struct_", i[i.Union = 14] = "Union", i[i.FixedSizeBinary = 15] = "FixedSizeBinary", i[i.FixedSizeList = 16] = "FixedSizeList", i[i.Map = 17] = "Map", i[i.Duration = 18] = "Duration", i[i.LargeBinary = 19] = "LargeBinary", i[i.LargeUtf8 = 20] = "LargeUtf8", i[i.LargeList = 21] = "LargeList", i[i.RunEndEncoded = 22] = "RunEndEncoded";
})(V || (V = {}));
let ct = class Xe {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsField(t, e) {
    return (e || new Xe()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsField(t, e) {
    return t.setPosition(t.position() + C), (e || new Xe()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  name(t) {
    const e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : null;
  }
  /**
   * Whether or not this field can contain nulls. Should be true in general.
   */
  nullable() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? !!this.bb.readInt8(this.bb_pos + t) : !1;
  }
  typeType() {
    const t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readUint8(this.bb_pos + t) : V.NONE;
  }
  /**
   * This is the type of the decoded value if the field is dictionary encoded.
   */
  type(t) {
    const e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.__union(t, this.bb_pos + e) : null;
  }
  /**
   * Present only if the field is dictionary encoded.
   */
  dictionary(t) {
    const e = this.bb.__offset(this.bb_pos, 12);
    return e ? (t || new Ct()).__init(this.bb.__indirect(this.bb_pos + e), this.bb) : null;
  }
  /**
   * children apply only to nested data types like Struct, List and Union. For
   * primitive types children will have length 0.
   */
  children(t, e) {
    const n = this.bb.__offset(this.bb_pos, 14);
    return n ? (e || new Xe()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + t * 4), this.bb) : null;
  }
  childrenLength() {
    const t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  /**
   * User-defined metadata
   */
  customMetadata(t, e) {
    const n = this.bb.__offset(this.bb_pos, 16);
    return n ? (e || new W()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + t * 4), this.bb) : null;
  }
  customMetadataLength() {
    const t = this.bb.__offset(this.bb_pos, 16);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startField(t) {
    t.startObject(7);
  }
  static addName(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addNullable(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static addTypeType(t, e) {
    t.addFieldInt8(2, e, V.NONE);
  }
  static addType(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static addDictionary(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static addChildren(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static createChildrenVector(t, e) {
    t.startVector(4, e.length, 4);
    for (let n = e.length - 1; n >= 0; n--)
      t.addOffset(e[n]);
    return t.endVector();
  }
  static startChildrenVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addCustomMetadata(t, e) {
    t.addFieldOffset(6, e, 0);
  }
  static createCustomMetadataVector(t, e) {
    t.startVector(4, e.length, 4);
    for (let n = e.length - 1; n >= 0; n--)
      t.addOffset(e[n]);
    return t.endVector();
  }
  static startCustomMetadataVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endField(t) {
    return t.endObject();
  }
}, gt = class Dt {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsSchema(t, e) {
    return (e || new Dt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSchema(t, e) {
    return t.setPosition(t.position() + C), (e || new Dt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  /**
   * endianness of the buffer
   * it is Little Endian by default
   * if endianness doesn't match the underlying system then the vectors need to be converted
   */
  endianness() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : Ee.Little;
  }
  fields(t, e) {
    const n = this.bb.__offset(this.bb_pos, 6);
    return n ? (e || new ct()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + t * 4), this.bb) : null;
  }
  fieldsLength() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  customMetadata(t, e) {
    const n = this.bb.__offset(this.bb_pos, 8);
    return n ? (e || new W()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + t * 4), this.bb) : null;
  }
  customMetadataLength() {
    const t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  /**
   * Features used in the stream/file.
   */
  features(t) {
    const e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.readInt64(this.bb.__vector(this.bb_pos + e) + t * 8) : BigInt(0);
  }
  featuresLength() {
    const t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startSchema(t) {
    t.startObject(4);
  }
  static addEndianness(t, e) {
    t.addFieldInt16(0, e, Ee.Little);
  }
  static addFields(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createFieldsVector(t, e) {
    t.startVector(4, e.length, 4);
    for (let n = e.length - 1; n >= 0; n--)
      t.addOffset(e[n]);
    return t.endVector();
  }
  static startFieldsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addCustomMetadata(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createCustomMetadataVector(t, e) {
    t.startVector(4, e.length, 4);
    for (let n = e.length - 1; n >= 0; n--)
      t.addOffset(e[n]);
    return t.endVector();
  }
  static startCustomMetadataVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addFeatures(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static createFeaturesVector(t, e) {
    t.startVector(8, e.length, 8);
    for (let n = e.length - 1; n >= 0; n--)
      t.addInt64(e[n]);
    return t.endVector();
  }
  static startFeaturesVector(t, e) {
    t.startVector(8, e, 8);
  }
  static endSchema(t) {
    return t.endObject();
  }
  static finishSchemaBuffer(t, e) {
    t.finish(e);
  }
  static finishSizePrefixedSchemaBuffer(t, e) {
    t.finish(e, void 0, !0);
  }
  static createSchema(t, e, n, s, r) {
    return Dt.startSchema(t), Dt.addEndianness(t, e), Dt.addFields(t, n), Dt.addCustomMetadata(t, s), Dt.addFeatures(t, r), Dt.endSchema(t);
  }
};
class nt {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsFooter(t, e) {
    return (e || new nt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFooter(t, e) {
    return t.setPosition(t.position() + C), (e || new nt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  version() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : Te.V1;
  }
  schema(t) {
    const e = this.bb.__offset(this.bb_pos, 6);
    return e ? (t || new gt()).__init(this.bb.__indirect(this.bb_pos + e), this.bb) : null;
  }
  dictionaries(t, e) {
    const n = this.bb.__offset(this.bb_pos, 8);
    return n ? (e || new Zi()).__init(this.bb.__vector(this.bb_pos + n) + t * 24, this.bb) : null;
  }
  dictionariesLength() {
    const t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  recordBatches(t, e) {
    const n = this.bb.__offset(this.bb_pos, 10);
    return n ? (e || new Zi()).__init(this.bb.__vector(this.bb_pos + n) + t * 24, this.bb) : null;
  }
  recordBatchesLength() {
    const t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  /**
   * User-defined metadata
   */
  customMetadata(t, e) {
    const n = this.bb.__offset(this.bb_pos, 12);
    return n ? (e || new W()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + t * 4), this.bb) : null;
  }
  customMetadataLength() {
    const t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startFooter(t) {
    t.startObject(5);
  }
  static addVersion(t, e) {
    t.addFieldInt16(0, e, Te.V1);
  }
  static addSchema(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addDictionaries(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static startDictionariesVector(t, e) {
    t.startVector(24, e, 8);
  }
  static addRecordBatches(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static startRecordBatchesVector(t, e) {
    t.startVector(24, e, 8);
  }
  static addCustomMetadata(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static createCustomMetadataVector(t, e) {
    t.startVector(4, e.length, 4);
    for (let n = e.length - 1; n >= 0; n--)
      t.addOffset(e[n]);
    return t.endVector();
  }
  static startCustomMetadataVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endFooter(t) {
    return t.endObject();
  }
  static finishFooterBuffer(t, e) {
    t.finish(e);
  }
  static finishSizePrefixedFooterBuffer(t, e) {
    t.finish(e, void 0, !0);
  }
}
class M {
  constructor(t = [], e, n) {
    this.fields = t || [], this.metadata = e || /* @__PURE__ */ new Map(), n || (n = tn(t)), this.dictionaries = n;
  }
  get [Symbol.toStringTag]() {
    return "Schema";
  }
  get names() {
    return this.fields.map((t) => t.name);
  }
  toString() {
    return `Schema<{ ${this.fields.map((t, e) => `${e}: ${t}`).join(", ")} }>`;
  }
  /**
   * Construct a new Schema containing only specified fields.
   *
   * @param fieldNames Names of fields to keep.
   * @returns A new Schema of fields matching the specified names.
   */
  select(t) {
    const e = new Set(t), n = this.fields.filter((s) => e.has(s.name));
    return new M(n, this.metadata);
  }
  /**
   * Construct a new Schema containing only fields at the specified indices.
   *
   * @param fieldIndices Indices of fields to keep.
   * @returns A new Schema of fields at the specified indices.
   */
  selectAt(t) {
    const e = t.map((n) => this.fields[n]).filter(Boolean);
    return new M(e, this.metadata);
  }
  assign(...t) {
    const e = t[0] instanceof M ? t[0] : Array.isArray(t[0]) ? new M(t[0]) : new M(t), n = [...this.fields], s = Qe(Qe(/* @__PURE__ */ new Map(), this.metadata), e.metadata), r = e.fields.filter((a) => {
      const c = n.findIndex((u) => u.name === a.name);
      return ~c ? (n[c] = a.clone({
        metadata: Qe(Qe(/* @__PURE__ */ new Map(), n[c].metadata), a.metadata)
      })) && !1 : !0;
    }), o = tn(r, /* @__PURE__ */ new Map());
    return new M([...n, ...r], s, new Map([...this.dictionaries, ...o]));
  }
}
M.prototype.fields = null;
M.prototype.metadata = null;
M.prototype.dictionaries = null;
class x {
  /** @nocollapse */
  static new(...t) {
    let [e, n, s, r] = t;
    return t[0] && typeof t[0] == "object" && ({ name: e } = t[0], n === void 0 && (n = t[0].type), s === void 0 && (s = t[0].nullable), r === void 0 && (r = t[0].metadata)), new x(`${e}`, n, s, r);
  }
  constructor(t, e, n = !1, s) {
    this.name = t, this.type = e, this.nullable = n, this.metadata = s || /* @__PURE__ */ new Map();
  }
  get typeId() {
    return this.type.typeId;
  }
  get [Symbol.toStringTag]() {
    return "Field";
  }
  toString() {
    return `${this.name}: ${this.type}`;
  }
  clone(...t) {
    let [e, n, s, r] = t;
    return !t[0] || typeof t[0] != "object" ? [e = this.name, n = this.type, s = this.nullable, r = this.metadata] = t : { name: e = this.name, type: n = this.type, nullable: s = this.nullable, metadata: r = this.metadata } = t[0], x.new(e, n, s, r);
  }
}
x.prototype.type = null;
x.prototype.name = null;
x.prototype.nullable = null;
x.prototype.metadata = null;
function Qe(i, t) {
  return new Map([...i || /* @__PURE__ */ new Map(), ...t || /* @__PURE__ */ new Map()]);
}
function tn(i, t = /* @__PURE__ */ new Map()) {
  for (let e = -1, n = i.length; ++e < n; ) {
    const r = i[e].type;
    if (y.isDictionary(r)) {
      if (!t.has(r.id))
        t.set(r.id, r.dictionary);
      else if (t.get(r.id) !== r.dictionary)
        throw new Error("Cannot create Schema containing two different dictionaries with the same Id");
    }
    r.children && r.children.length > 0 && tn(r.children, t);
  }
  return t;
}
var Ma = Er, Ua = Se;
class je {
  /** @nocollapse */
  static decode(t) {
    t = new Ua(N(t));
    const e = nt.getRootAsFooter(t), n = M.decode(e.schema());
    return new ka(n, e);
  }
  /** @nocollapse */
  static encode(t) {
    const e = new Ma(), n = M.encode(e, t.schema);
    nt.startRecordBatchesVector(e, t.numRecordBatches);
    for (const o of [...t.recordBatches()].slice().reverse())
      Ht.encode(e, o);
    const s = e.endVector();
    nt.startDictionariesVector(e, t.numDictionaries);
    for (const o of [...t.dictionaryBatches()].slice().reverse())
      Ht.encode(e, o);
    const r = e.endVector();
    return nt.startFooter(e), nt.addSchema(e, n), nt.addVersion(e, rt.V4), nt.addRecordBatches(e, s), nt.addDictionaries(e, r), nt.finishFooterBuffer(e, nt.endFooter(e)), e.asUint8Array();
  }
  get numRecordBatches() {
    return this._recordBatches.length;
  }
  get numDictionaries() {
    return this._dictionaryBatches.length;
  }
  constructor(t, e = rt.V4, n, s) {
    this.schema = t, this.version = e, n && (this._recordBatches = n), s && (this._dictionaryBatches = s);
  }
  *recordBatches() {
    for (let t, e = -1, n = this.numRecordBatches; ++e < n; )
      (t = this.getRecordBatch(e)) && (yield t);
  }
  *dictionaryBatches() {
    for (let t, e = -1, n = this.numDictionaries; ++e < n; )
      (t = this.getDictionaryBatch(e)) && (yield t);
  }
  getRecordBatch(t) {
    return t >= 0 && t < this.numRecordBatches && this._recordBatches[t] || null;
  }
  getDictionaryBatch(t) {
    return t >= 0 && t < this.numDictionaries && this._dictionaryBatches[t] || null;
  }
}
class ka extends je {
  get numRecordBatches() {
    return this._footer.recordBatchesLength();
  }
  get numDictionaries() {
    return this._footer.dictionariesLength();
  }
  constructor(t, e) {
    super(t, e.version()), this._footer = e;
  }
  getRecordBatch(t) {
    if (t >= 0 && t < this.numRecordBatches) {
      const e = this._footer.recordBatches(t);
      if (e)
        return Ht.decode(e);
    }
    return null;
  }
  getDictionaryBatch(t) {
    if (t >= 0 && t < this.numDictionaries) {
      const e = this._footer.dictionaries(t);
      if (e)
        return Ht.decode(e);
    }
    return null;
  }
}
class Ht {
  /** @nocollapse */
  static decode(t) {
    return new Ht(t.metaDataLength(), t.bodyLength(), t.offset());
  }
  /** @nocollapse */
  static encode(t, e) {
    const { metaDataLength: n } = e, s = BigInt(e.offset), r = BigInt(e.bodyLength);
    return Zi.createBlock(t, s, n, r);
  }
  constructor(t, e, n) {
    this.metaDataLength = t, this.offset = mt(n), this.bodyLength = mt(e);
  }
}
const z = Object.freeze({ done: !0, value: void 0 });
class qn {
  constructor(t) {
    this._json = t;
  }
  get schema() {
    return this._json.schema;
  }
  get batches() {
    return this._json.batches || [];
  }
  get dictionaries() {
    return this._json.dictionaries || [];
  }
}
class Sn {
  tee() {
    return this._getDOMStream().tee();
  }
  pipe(t, e) {
    return this._getNodeStream().pipe(t, e);
  }
  pipeTo(t, e) {
    return this._getDOMStream().pipeTo(t, e);
  }
  pipeThrough(t, e) {
    return this._getDOMStream().pipeThrough(t, e);
  }
  _getDOMStream() {
    return this._DOMStream || (this._DOMStream = this.toDOMStream());
  }
  _getNodeStream() {
    return this._nodeStream || (this._nodeStream = this.toNodeStream());
  }
}
class Ca extends Sn {
  constructor() {
    super(), this._values = [], this.resolvers = [], this._closedPromise = new Promise((t) => this._closedPromiseResolve = t);
  }
  get closed() {
    return this._closedPromise;
  }
  cancel(t) {
    return p(this, void 0, void 0, function* () {
      yield this.return(t);
    });
  }
  write(t) {
    this._ensureOpen() && (this.resolvers.length <= 0 ? this._values.push(t) : this.resolvers.shift().resolve({ done: !1, value: t }));
  }
  abort(t) {
    this._closedPromiseResolve && (this.resolvers.length <= 0 ? this._error = { error: t } : this.resolvers.shift().reject({ done: !0, value: t }));
  }
  close() {
    if (this._closedPromiseResolve) {
      const { resolvers: t } = this;
      for (; t.length > 0; )
        t.shift().resolve(z);
      this._closedPromiseResolve(), this._closedPromiseResolve = void 0;
    }
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  toDOMStream(t) {
    return lt.toDOMStream(this._closedPromiseResolve || this._error ? this : this._values, t);
  }
  toNodeStream(t) {
    return lt.toNodeStream(this._closedPromiseResolve || this._error ? this : this._values, t);
  }
  throw(t) {
    return p(this, void 0, void 0, function* () {
      return yield this.abort(t), z;
    });
  }
  return(t) {
    return p(this, void 0, void 0, function* () {
      return yield this.close(), z;
    });
  }
  read(t) {
    return p(this, void 0, void 0, function* () {
      return (yield this.next(t, "read")).value;
    });
  }
  peek(t) {
    return p(this, void 0, void 0, function* () {
      return (yield this.next(t, "peek")).value;
    });
  }
  next(...t) {
    return this._values.length > 0 ? Promise.resolve({ done: !1, value: this._values.shift() }) : this._error ? Promise.reject({ done: !0, value: this._error.error }) : this._closedPromiseResolve ? new Promise((e, n) => {
      this.resolvers.push({ resolve: e, reject: n });
    }) : Promise.resolve(z);
  }
  _ensureOpen() {
    if (this._closedPromiseResolve)
      return !0;
    throw new Error("AsyncQueue is closed");
  }
}
class ti extends Ca {
  write(t) {
    if ((t = N(t)).byteLength > 0)
      return super.write(t);
  }
  toString(t = !1) {
    return t ? Hi(this.toUint8Array(!0)) : this.toUint8Array(!1).then(Hi);
  }
  toUint8Array(t = !1) {
    return t ? Ot(this._values)[0] : (() => p(this, void 0, void 0, function* () {
      var e, n, s, r;
      const o = [];
      let a = 0;
      try {
        for (var c = !0, u = oe(this), d; d = yield u.next(), e = d.done, !e; c = !0) {
          r = d.value, c = !1;
          const h = r;
          o.push(h), a += h.byteLength;
        }
      } catch (h) {
        n = { error: h };
      } finally {
        try {
          !c && !e && (s = u.return) && (yield s.call(u));
        } finally {
          if (n)
            throw n.error;
        }
      }
      return Ot(o, a)[0];
    }))();
  }
}
class Ti {
  constructor(t) {
    t && (this.source = new Pa(lt.fromIterable(t)));
  }
  [Symbol.iterator]() {
    return this;
  }
  next(t) {
    return this.source.next(t);
  }
  throw(t) {
    return this.source.throw(t);
  }
  return(t) {
    return this.source.return(t);
  }
  peek(t) {
    return this.source.peek(t);
  }
  read(t) {
    return this.source.read(t);
  }
}
class Ae {
  constructor(t) {
    t instanceof Ae ? this.source = t.source : t instanceof ti ? this.source = new Xt(lt.fromAsyncIterable(t)) : cs(t) ? this.source = new Xt(lt.fromNodeStream(t)) : ln(t) ? this.source = new Xt(lt.fromDOMStream(t)) : as(t) ? this.source = new Xt(lt.fromDOMStream(t.body)) : ze(t) ? this.source = new Xt(lt.fromIterable(t)) : ae(t) ? this.source = new Xt(lt.fromAsyncIterable(t)) : Oe(t) && (this.source = new Xt(lt.fromAsyncIterable(t)));
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  next(t) {
    return this.source.next(t);
  }
  throw(t) {
    return this.source.throw(t);
  }
  return(t) {
    return this.source.return(t);
  }
  get closed() {
    return this.source.closed;
  }
  cancel(t) {
    return this.source.cancel(t);
  }
  peek(t) {
    return this.source.peek(t);
  }
  read(t) {
    return this.source.read(t);
  }
}
class Pa {
  constructor(t) {
    this.source = t;
  }
  cancel(t) {
    this.return(t);
  }
  peek(t) {
    return this.next(t, "peek").value;
  }
  read(t) {
    return this.next(t, "read").value;
  }
  next(t, e = "read") {
    return this.source.next({ cmd: e, size: t });
  }
  throw(t) {
    return Object.create(this.source.throw && this.source.throw(t) || z);
  }
  return(t) {
    return Object.create(this.source.return && this.source.return(t) || z);
  }
}
class Xt {
  constructor(t) {
    this.source = t, this._closedPromise = new Promise((e) => this._closedPromiseResolve = e);
  }
  cancel(t) {
    return p(this, void 0, void 0, function* () {
      yield this.return(t);
    });
  }
  get closed() {
    return this._closedPromise;
  }
  read(t) {
    return p(this, void 0, void 0, function* () {
      return (yield this.next(t, "read")).value;
    });
  }
  peek(t) {
    return p(this, void 0, void 0, function* () {
      return (yield this.next(t, "peek")).value;
    });
  }
  next(t, e = "read") {
    return p(this, void 0, void 0, function* () {
      return yield this.source.next({ cmd: e, size: t });
    });
  }
  throw(t) {
    return p(this, void 0, void 0, function* () {
      const e = this.source.throw && (yield this.source.throw(t)) || z;
      return this._closedPromiseResolve && this._closedPromiseResolve(), this._closedPromiseResolve = void 0, Object.create(e);
    });
  }
  return(t) {
    return p(this, void 0, void 0, function* () {
      const e = this.source.return && (yield this.source.return(t)) || z;
      return this._closedPromiseResolve && this._closedPromiseResolve(), this._closedPromiseResolve = void 0, Object.create(e);
    });
  }
}
class Hn extends Ti {
  constructor(t, e) {
    super(), this.position = 0, this.buffer = N(t), this.size = e === void 0 ? this.buffer.byteLength : e;
  }
  readInt32(t) {
    const { buffer: e, byteOffset: n } = this.readAt(t, 4);
    return new DataView(e, n).getInt32(0, !0);
  }
  seek(t) {
    return this.position = Math.min(t, this.size), t < this.size;
  }
  read(t) {
    const { buffer: e, size: n, position: s } = this;
    return e && s < n ? (typeof t != "number" && (t = Number.POSITIVE_INFINITY), this.position = Math.min(n, s + Math.min(n - s, t)), e.subarray(s, this.position)) : null;
  }
  readAt(t, e) {
    const n = this.buffer, s = Math.min(this.size, t + e);
    return n ? n.subarray(t, s) : new Uint8Array(e);
  }
  close() {
    this.buffer && (this.buffer = null);
  }
  throw(t) {
    return this.close(), { done: !0, value: t };
  }
  return(t) {
    return this.close(), { done: !0, value: t };
  }
}
class Ei extends Ae {
  constructor(t, e) {
    super(), this.position = 0, this._handle = t, typeof e == "number" ? this.size = e : this._pending = (() => p(this, void 0, void 0, function* () {
      this.size = (yield t.stat()).size, delete this._pending;
    }))();
  }
  readInt32(t) {
    return p(this, void 0, void 0, function* () {
      const { buffer: e, byteOffset: n } = yield this.readAt(t, 4);
      return new DataView(e, n).getInt32(0, !0);
    });
  }
  seek(t) {
    return p(this, void 0, void 0, function* () {
      return this._pending && (yield this._pending), this.position = Math.min(t, this.size), t < this.size;
    });
  }
  read(t) {
    return p(this, void 0, void 0, function* () {
      this._pending && (yield this._pending);
      const { _handle: e, size: n, position: s } = this;
      if (e && s < n) {
        typeof t != "number" && (t = Number.POSITIVE_INFINITY);
        let r = s, o = 0, a = 0;
        const c = Math.min(n, r + Math.min(n - r, t)), u = new Uint8Array(Math.max(0, (this.position = c) - r));
        for (; (r += a) < c && (o += a) < u.byteLength; )
          ({ bytesRead: a } = yield e.read(u, o, u.byteLength - o, r));
        return u;
      }
      return null;
    });
  }
  readAt(t, e) {
    return p(this, void 0, void 0, function* () {
      this._pending && (yield this._pending);
      const { _handle: n, size: s } = this;
      if (n && t + e < s) {
        const r = Math.min(s, t + e), o = new Uint8Array(r - t);
        return (yield n.read(o, 0, e, t)).buffer;
      }
      return new Uint8Array(e);
    });
  }
  close() {
    return p(this, void 0, void 0, function* () {
      const t = this._handle;
      this._handle = null, t && (yield t.close());
    });
  }
  throw(t) {
    return p(this, void 0, void 0, function* () {
      return yield this.close(), { done: !0, value: t };
    });
  }
  return(t) {
    return p(this, void 0, void 0, function* () {
      return yield this.close(), { done: !0, value: t };
    });
  }
}
const xa = 65536;
function me(i) {
  return i < 0 && (i = 4294967295 + i + 1), `0x${i.toString(16)}`;
}
const Fe = 8, Tn = [
  1,
  10,
  100,
  1e3,
  1e4,
  1e5,
  1e6,
  1e7,
  1e8
];
class Ar {
  constructor(t) {
    this.buffer = t;
  }
  high() {
    return this.buffer[1];
  }
  low() {
    return this.buffer[0];
  }
  _times(t) {
    const e = new Uint32Array([
      this.buffer[1] >>> 16,
      this.buffer[1] & 65535,
      this.buffer[0] >>> 16,
      this.buffer[0] & 65535
    ]), n = new Uint32Array([
      t.buffer[1] >>> 16,
      t.buffer[1] & 65535,
      t.buffer[0] >>> 16,
      t.buffer[0] & 65535
    ]);
    let s = e[3] * n[3];
    this.buffer[0] = s & 65535;
    let r = s >>> 16;
    return s = e[2] * n[3], r += s, s = e[3] * n[2] >>> 0, r += s, this.buffer[0] += r << 16, this.buffer[1] = r >>> 0 < s ? xa : 0, this.buffer[1] += r >>> 16, this.buffer[1] += e[1] * n[3] + e[2] * n[2] + e[3] * n[1], this.buffer[1] += e[0] * n[3] + e[1] * n[2] + e[2] * n[1] + e[3] * n[0] << 16, this;
  }
  _plus(t) {
    const e = this.buffer[0] + t.buffer[0] >>> 0;
    this.buffer[1] += t.buffer[1], e < this.buffer[0] >>> 0 && ++this.buffer[1], this.buffer[0] = e;
  }
  lessThan(t) {
    return this.buffer[1] < t.buffer[1] || this.buffer[1] === t.buffer[1] && this.buffer[0] < t.buffer[0];
  }
  equals(t) {
    return this.buffer[1] === t.buffer[1] && this.buffer[0] == t.buffer[0];
  }
  greaterThan(t) {
    return t.lessThan(this);
  }
  hex() {
    return `${me(this.buffer[1])} ${me(this.buffer[0])}`;
  }
}
class U extends Ar {
  times(t) {
    return this._times(t), this;
  }
  plus(t) {
    return this._plus(t), this;
  }
  /** @nocollapse */
  static from(t, e = new Uint32Array(2)) {
    return U.fromString(typeof t == "string" ? t : t.toString(), e);
  }
  /** @nocollapse */
  static fromNumber(t, e = new Uint32Array(2)) {
    return U.fromString(t.toString(), e);
  }
  /** @nocollapse */
  static fromString(t, e = new Uint32Array(2)) {
    const n = t.length, s = new U(e);
    for (let r = 0; r < n; ) {
      const o = Fe < n - r ? Fe : n - r, a = new U(new Uint32Array([Number.parseInt(t.slice(r, r + o), 10), 0])), c = new U(new Uint32Array([Tn[o], 0]));
      s.times(c), s.plus(a), r += o;
    }
    return s;
  }
  /** @nocollapse */
  static convertArray(t) {
    const e = new Uint32Array(t.length * 2);
    for (let n = -1, s = t.length; ++n < s; )
      U.from(t[n], new Uint32Array(e.buffer, e.byteOffset + 2 * n * 4, 2));
    return e;
  }
  /** @nocollapse */
  static multiply(t, e) {
    return new U(new Uint32Array(t.buffer)).times(e);
  }
  /** @nocollapse */
  static add(t, e) {
    return new U(new Uint32Array(t.buffer)).plus(e);
  }
}
class Q extends Ar {
  negate() {
    return this.buffer[0] = ~this.buffer[0] + 1, this.buffer[1] = ~this.buffer[1], this.buffer[0] == 0 && ++this.buffer[1], this;
  }
  times(t) {
    return this._times(t), this;
  }
  plus(t) {
    return this._plus(t), this;
  }
  lessThan(t) {
    const e = this.buffer[1] << 0, n = t.buffer[1] << 0;
    return e < n || e === n && this.buffer[0] < t.buffer[0];
  }
  /** @nocollapse */
  static from(t, e = new Uint32Array(2)) {
    return Q.fromString(typeof t == "string" ? t : t.toString(), e);
  }
  /** @nocollapse */
  static fromNumber(t, e = new Uint32Array(2)) {
    return Q.fromString(t.toString(), e);
  }
  /** @nocollapse */
  static fromString(t, e = new Uint32Array(2)) {
    const n = t.startsWith("-"), s = t.length, r = new Q(e);
    for (let o = n ? 1 : 0; o < s; ) {
      const a = Fe < s - o ? Fe : s - o, c = new Q(new Uint32Array([Number.parseInt(t.slice(o, o + a), 10), 0])), u = new Q(new Uint32Array([Tn[a], 0]));
      r.times(u), r.plus(c), o += a;
    }
    return n ? r.negate() : r;
  }
  /** @nocollapse */
  static convertArray(t) {
    const e = new Uint32Array(t.length * 2);
    for (let n = -1, s = t.length; ++n < s; )
      Q.from(t[n], new Uint32Array(e.buffer, e.byteOffset + 2 * n * 4, 2));
    return e;
  }
  /** @nocollapse */
  static multiply(t, e) {
    return new Q(new Uint32Array(t.buffer)).times(e);
  }
  /** @nocollapse */
  static add(t, e) {
    return new Q(new Uint32Array(t.buffer)).plus(e);
  }
}
class wt {
  constructor(t) {
    this.buffer = t;
  }
  high() {
    return new Q(new Uint32Array(this.buffer.buffer, this.buffer.byteOffset + 8, 2));
  }
  low() {
    return new Q(new Uint32Array(this.buffer.buffer, this.buffer.byteOffset, 2));
  }
  negate() {
    return this.buffer[0] = ~this.buffer[0] + 1, this.buffer[1] = ~this.buffer[1], this.buffer[2] = ~this.buffer[2], this.buffer[3] = ~this.buffer[3], this.buffer[0] == 0 && ++this.buffer[1], this.buffer[1] == 0 && ++this.buffer[2], this.buffer[2] == 0 && ++this.buffer[3], this;
  }
  times(t) {
    const e = new U(new Uint32Array([this.buffer[3], 0])), n = new U(new Uint32Array([this.buffer[2], 0])), s = new U(new Uint32Array([this.buffer[1], 0])), r = new U(new Uint32Array([this.buffer[0], 0])), o = new U(new Uint32Array([t.buffer[3], 0])), a = new U(new Uint32Array([t.buffer[2], 0])), c = new U(new Uint32Array([t.buffer[1], 0])), u = new U(new Uint32Array([t.buffer[0], 0]));
    let d = U.multiply(r, u);
    this.buffer[0] = d.low();
    const h = new U(new Uint32Array([d.high(), 0]));
    return d = U.multiply(s, u), h.plus(d), d = U.multiply(r, c), h.plus(d), this.buffer[1] = h.low(), this.buffer[3] = h.lessThan(d) ? 1 : 0, this.buffer[2] = h.high(), new U(new Uint32Array(this.buffer.buffer, this.buffer.byteOffset + 8, 2)).plus(U.multiply(n, u)).plus(U.multiply(s, c)).plus(U.multiply(r, a)), this.buffer[3] += U.multiply(e, u).plus(U.multiply(n, c)).plus(U.multiply(s, a)).plus(U.multiply(r, o)).low(), this;
  }
  plus(t) {
    const e = new Uint32Array(4);
    return e[3] = this.buffer[3] + t.buffer[3] >>> 0, e[2] = this.buffer[2] + t.buffer[2] >>> 0, e[1] = this.buffer[1] + t.buffer[1] >>> 0, e[0] = this.buffer[0] + t.buffer[0] >>> 0, e[0] < this.buffer[0] >>> 0 && ++e[1], e[1] < this.buffer[1] >>> 0 && ++e[2], e[2] < this.buffer[2] >>> 0 && ++e[3], this.buffer[3] = e[3], this.buffer[2] = e[2], this.buffer[1] = e[1], this.buffer[0] = e[0], this;
  }
  hex() {
    return `${me(this.buffer[3])} ${me(this.buffer[2])} ${me(this.buffer[1])} ${me(this.buffer[0])}`;
  }
  /** @nocollapse */
  static multiply(t, e) {
    return new wt(new Uint32Array(t.buffer)).times(e);
  }
  /** @nocollapse */
  static add(t, e) {
    return new wt(new Uint32Array(t.buffer)).plus(e);
  }
  /** @nocollapse */
  static from(t, e = new Uint32Array(4)) {
    return wt.fromString(typeof t == "string" ? t : t.toString(), e);
  }
  /** @nocollapse */
  static fromNumber(t, e = new Uint32Array(4)) {
    return wt.fromString(t.toString(), e);
  }
  /** @nocollapse */
  static fromString(t, e = new Uint32Array(4)) {
    const n = t.startsWith("-"), s = t.length, r = new wt(e);
    for (let o = n ? 1 : 0; o < s; ) {
      const a = Fe < s - o ? Fe : s - o, c = new wt(new Uint32Array([Number.parseInt(t.slice(o, o + a), 10), 0, 0, 0])), u = new wt(new Uint32Array([Tn[a], 0, 0, 0]));
      r.times(u), r.plus(c), o += a;
    }
    return n ? r.negate() : r;
  }
  /** @nocollapse */
  static convertArray(t) {
    const e = new Uint32Array(t.length * 4);
    for (let n = -1, s = t.length; ++n < s; )
      wt.from(t[n], new Uint32Array(e.buffer, e.byteOffset + 4 * 4 * n, 4));
    return e;
  }
}
class Fr extends F {
  constructor(t, e, n, s) {
    super(), this.nodesIndex = -1, this.buffersIndex = -1, this.bytes = t, this.nodes = e, this.buffers = n, this.dictionaries = s;
  }
  visit(t) {
    return super.visit(t instanceof x ? t.type : t);
  }
  visitNull(t, { length: e } = this.nextFieldNode()) {
    return A({ type: t, length: e });
  }
  visitBool(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), data: this.readData(t) });
  }
  visitInt(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), data: this.readData(t) });
  }
  visitFloat(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), data: this.readData(t) });
  }
  visitUtf8(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), valueOffsets: this.readOffsets(t), data: this.readData(t) });
  }
  visitBinary(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), valueOffsets: this.readOffsets(t), data: this.readData(t) });
  }
  visitFixedSizeBinary(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), data: this.readData(t) });
  }
  visitDate(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), data: this.readData(t) });
  }
  visitTimestamp(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), data: this.readData(t) });
  }
  visitTime(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), data: this.readData(t) });
  }
  visitDecimal(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), data: this.readData(t) });
  }
  visitList(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), valueOffsets: this.readOffsets(t), child: this.visit(t.children[0]) });
  }
  visitStruct(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), children: this.visitMany(t.children) });
  }
  visitUnion(t) {
    return t.mode === ot.Sparse ? this.visitSparseUnion(t) : this.visitDenseUnion(t);
  }
  visitDenseUnion(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), typeIds: this.readTypeIds(t), valueOffsets: this.readOffsets(t), children: this.visitMany(t.children) });
  }
  visitSparseUnion(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), typeIds: this.readTypeIds(t), children: this.visitMany(t.children) });
  }
  visitDictionary(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), data: this.readData(t.indices), dictionary: this.readDictionary(t) });
  }
  visitInterval(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), data: this.readData(t) });
  }
  visitFixedSizeList(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), child: this.visit(t.children[0]) });
  }
  visitMap(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), valueOffsets: this.readOffsets(t), child: this.visit(t.children[0]) });
  }
  nextFieldNode() {
    return this.nodes[++this.nodesIndex];
  }
  nextBufferRange() {
    return this.buffers[++this.buffersIndex];
  }
  readNullBitmap(t, e, n = this.nextBufferRange()) {
    return e > 0 && this.readData(t, n) || new Uint8Array(0);
  }
  readOffsets(t, e) {
    return this.readData(t, e);
  }
  readTypeIds(t, e) {
    return this.readData(t, e);
  }
  readData(t, { length: e, offset: n } = this.nextBufferRange()) {
    return this.bytes.subarray(n, n + e);
  }
  readDictionary(t) {
    return this.dictionaries.get(t.id);
  }
}
class ja extends Fr {
  constructor(t, e, n, s) {
    super(new Uint8Array(0), e, n, s), this.sources = t;
  }
  readNullBitmap(t, e, { offset: n } = this.nextBufferRange()) {
    return e <= 0 ? new Uint8Array(0) : mi(this.sources[n]);
  }
  readOffsets(t, { offset: e } = this.nextBufferRange()) {
    return k(Uint8Array, k(Int32Array, this.sources[e]));
  }
  readTypeIds(t, { offset: e } = this.nextBufferRange()) {
    return k(Uint8Array, k(t.ArrayType, this.sources[e]));
  }
  readData(t, { offset: e } = this.nextBufferRange()) {
    const { sources: n } = this;
    return y.isTimestamp(t) || (y.isInt(t) || y.isTime(t)) && t.bitWidth === 64 || y.isDate(t) && t.unit === Pt.MILLISECOND ? k(Uint8Array, Q.convertArray(n[e])) : y.isDecimal(t) ? k(Uint8Array, wt.convertArray(n[e])) : y.isBinary(t) || y.isFixedSizeBinary(t) ? Va(n[e]) : y.isBool(t) ? mi(n[e]) : y.isUtf8(t) ? cn(n[e].join("")) : k(Uint8Array, k(t.ArrayType, n[e].map((s) => +s)));
  }
}
function Va(i) {
  const t = i.join(""), e = new Uint8Array(t.length / 2);
  for (let n = 0; n < t.length; n += 2)
    e[n >> 1] = Number.parseInt(t.slice(n, n + 2), 16);
  return e;
}
class g extends F {
  compareSchemas(t, e) {
    return t === e || e instanceof t.constructor && this.compareManyFields(t.fields, e.fields);
  }
  compareManyFields(t, e) {
    return t === e || Array.isArray(t) && Array.isArray(e) && t.length === e.length && t.every((n, s) => this.compareFields(n, e[s]));
  }
  compareFields(t, e) {
    return t === e || e instanceof t.constructor && t.name === e.name && t.nullable === e.nullable && this.visit(t.type, e.type);
  }
}
function it(i, t) {
  return t instanceof i.constructor;
}
function $e(i, t) {
  return i === t || it(i, t);
}
function jt(i, t) {
  return i === t || it(i, t) && i.bitWidth === t.bitWidth && i.isSigned === t.isSigned;
}
function Ui(i, t) {
  return i === t || it(i, t) && i.precision === t.precision;
}
function za(i, t) {
  return i === t || it(i, t) && i.byteWidth === t.byteWidth;
}
function En(i, t) {
  return i === t || it(i, t) && i.unit === t.unit;
}
function Ye(i, t) {
  return i === t || it(i, t) && i.unit === t.unit && i.timezone === t.timezone;
}
function We(i, t) {
  return i === t || it(i, t) && i.unit === t.unit && i.bitWidth === t.bitWidth;
}
function $a(i, t) {
  return i === t || it(i, t) && i.children.length === t.children.length && Qt.compareManyFields(i.children, t.children);
}
function Ya(i, t) {
  return i === t || it(i, t) && i.children.length === t.children.length && Qt.compareManyFields(i.children, t.children);
}
function Bn(i, t) {
  return i === t || it(i, t) && i.mode === t.mode && i.typeIds.every((e, n) => e === t.typeIds[n]) && Qt.compareManyFields(i.children, t.children);
}
function Wa(i, t) {
  return i === t || it(i, t) && i.id === t.id && i.isOrdered === t.isOrdered && Qt.visit(i.indices, t.indices) && Qt.visit(i.dictionary, t.dictionary);
}
function An(i, t) {
  return i === t || it(i, t) && i.unit === t.unit;
}
function Ga(i, t) {
  return i === t || it(i, t) && i.listSize === t.listSize && i.children.length === t.children.length && Qt.compareManyFields(i.children, t.children);
}
function qa(i, t) {
  return i === t || it(i, t) && i.keysSorted === t.keysSorted && i.children.length === t.children.length && Qt.compareManyFields(i.children, t.children);
}
g.prototype.visitNull = $e;
g.prototype.visitBool = $e;
g.prototype.visitInt = jt;
g.prototype.visitInt8 = jt;
g.prototype.visitInt16 = jt;
g.prototype.visitInt32 = jt;
g.prototype.visitInt64 = jt;
g.prototype.visitUint8 = jt;
g.prototype.visitUint16 = jt;
g.prototype.visitUint32 = jt;
g.prototype.visitUint64 = jt;
g.prototype.visitFloat = Ui;
g.prototype.visitFloat16 = Ui;
g.prototype.visitFloat32 = Ui;
g.prototype.visitFloat64 = Ui;
g.prototype.visitUtf8 = $e;
g.prototype.visitBinary = $e;
g.prototype.visitFixedSizeBinary = za;
g.prototype.visitDate = En;
g.prototype.visitDateDay = En;
g.prototype.visitDateMillisecond = En;
g.prototype.visitTimestamp = Ye;
g.prototype.visitTimestampSecond = Ye;
g.prototype.visitTimestampMillisecond = Ye;
g.prototype.visitTimestampMicrosecond = Ye;
g.prototype.visitTimestampNanosecond = Ye;
g.prototype.visitTime = We;
g.prototype.visitTimeSecond = We;
g.prototype.visitTimeMillisecond = We;
g.prototype.visitTimeMicrosecond = We;
g.prototype.visitTimeNanosecond = We;
g.prototype.visitDecimal = $e;
g.prototype.visitList = $a;
g.prototype.visitStruct = Ya;
g.prototype.visitUnion = Bn;
g.prototype.visitDenseUnion = Bn;
g.prototype.visitSparseUnion = Bn;
g.prototype.visitDictionary = Wa;
g.prototype.visitInterval = An;
g.prototype.visitIntervalDayTime = An;
g.prototype.visitIntervalYearMonth = An;
g.prototype.visitFixedSizeList = Ga;
g.prototype.visitMap = qa;
const Qt = new g();
function en(i, t) {
  return Qt.compareSchemas(i, t);
}
function Vi(i, t) {
  return Ha(i, t.map((e) => e.data.concat()));
}
function Ha(i, t) {
  const e = [...i.fields], n = [], s = { numBatches: t.reduce((h, f) => Math.max(h, f.length), 0) };
  let r = 0, o = 0, a = -1;
  const c = t.length;
  let u, d = [];
  for (; s.numBatches-- > 0; ) {
    for (o = Number.POSITIVE_INFINITY, a = -1; ++a < c; )
      d[a] = u = t[a].shift(), o = Math.min(o, u ? u.length : o);
    Number.isFinite(o) && (d = Qa(e, o, d, t, s), o > 0 && (n[r++] = A({
      type: new q(e),
      length: o,
      nullCount: 0,
      children: d.slice()
    })));
  }
  return [
    i = i.assign(e),
    n.map((h) => new Z(i, h))
  ];
}
function Qa(i, t, e, n, s) {
  var r;
  const o = (t + 63 & -64) >> 3;
  for (let a = -1, c = n.length; ++a < c; ) {
    const u = e[a], d = u == null ? void 0 : u.length;
    if (d >= t)
      d === t ? e[a] = u : (e[a] = u.slice(0, t), s.numBatches = Math.max(s.numBatches, n[a].unshift(u.slice(t, d - t))));
    else {
      const h = i[a];
      i[a] = h.clone({ nullable: !0 }), e[a] = (r = u == null ? void 0 : u._changeLengthAndBackfillNullBitmap(t)) !== null && r !== void 0 ? r : A({
        type: h.type,
        length: t,
        nullCount: t,
        nullBitmap: new Uint8Array(o)
      });
    }
  }
  return e;
}
var Or;
class G {
  constructor(...t) {
    var e, n;
    if (t.length === 0)
      return this.batches = [], this.schema = new M([]), this._offsets = [0], this;
    let s, r;
    t[0] instanceof M && (s = t.shift()), t.at(-1) instanceof Uint32Array && (r = t.pop());
    const o = (c) => {
      if (c) {
        if (c instanceof Z)
          return [c];
        if (c instanceof G)
          return c.batches;
        if (c instanceof P) {
          if (c.type instanceof q)
            return [new Z(new M(c.type.children), c)];
        } else {
          if (Array.isArray(c))
            return c.flatMap((u) => o(u));
          if (typeof c[Symbol.iterator] == "function")
            return [...c].flatMap((u) => o(u));
          if (typeof c == "object") {
            const u = Object.keys(c), d = u.map((T) => new L([c[T]])), h = new M(u.map((T, j) => new x(String(T), d[j].type))), [, f] = Vi(h, d);
            return f.length === 0 ? [new Z(c)] : f;
          }
        }
      }
      return [];
    }, a = t.flatMap((c) => o(c));
    if (s = (n = s ?? ((e = a[0]) === null || e === void 0 ? void 0 : e.schema)) !== null && n !== void 0 ? n : new M([]), !(s instanceof M))
      throw new TypeError("Table constructor expects a [Schema, RecordBatch[]] pair.");
    for (const c of a) {
      if (!(c instanceof Z))
        throw new TypeError("Table constructor expects a [Schema, RecordBatch[]] pair.");
      if (!en(s, c.schema))
        throw new TypeError("Table and inner RecordBatch schemas must be equivalent.");
    }
    this.schema = s, this.batches = a, this._offsets = r ?? pr(this.data);
  }
  /**
   * The contiguous {@link RecordBatch `RecordBatch`} chunks of the Table rows.
   */
  get data() {
    return this.batches.map(({ data: t }) => t);
  }
  /**
   * The number of columns in this Table.
   */
  get numCols() {
    return this.schema.fields.length;
  }
  /**
   * The number of rows in this Table.
   */
  get numRows() {
    return this.data.reduce((t, e) => t + e.length, 0);
  }
  /**
   * The number of null rows in this Table.
   */
  get nullCount() {
    return this._nullCount === -1 && (this._nullCount = fr(this.data)), this._nullCount;
  }
  /**
   * Check whether an element is null.
   *
   * @param index The index at which to read the validity bitmap.
   */
  // @ts-ignore
  isValid(t) {
    return !1;
  }
  /**
   * Get an element value by position.
   *
   * @param index The index of the element to read.
   */
  // @ts-ignore
  get(t) {
    return null;
  }
  /**
   * Set an element value by position.
   *
   * @param index The index of the element to write.
   * @param value The value to set.
   */
  // @ts-ignore
  set(t, e) {
  }
  /**
   * Retrieve the index of the first occurrence of a value in an Vector.
   *
   * @param element The value to locate in the Vector.
   * @param offset The index at which to begin the search. If offset is omitted, the search starts at index 0.
   */
  // @ts-ignore
  indexOf(t, e) {
    return -1;
  }
  /**
   * Get the size in bytes of an element by index.
   * @param index The index at which to get the byteLength.
   */
  // @ts-ignore
  getByteLength(t) {
    return 0;
  }
  /**
   * Iterator for rows in this Table.
   */
  [Symbol.iterator]() {
    return this.batches.length > 0 ? vn.visit(new L(this.data)) : new Array(0)[Symbol.iterator]();
  }
  /**
   * Return a JavaScript Array of the Table rows.
   *
   * @returns An Array of Table rows.
   */
  toArray() {
    return [...this];
  }
  /**
   * Returns a string representation of the Table rows.
   *
   * @returns A string representation of the Table rows.
   */
  toString() {
    return `[
  ${this.toArray().join(`,
  `)}
]`;
  }
  /**
   * Combines two or more Tables of the same schema.
   *
   * @param others Additional Tables to add to the end of this Tables.
   */
  concat(...t) {
    const e = this.schema, n = this.data.concat(t.flatMap(({ data: s }) => s));
    return new G(e, n.map((s) => new Z(e, s)));
  }
  /**
   * Return a zero-copy sub-section of this Table.
   *
   * @param begin The beginning of the specified portion of the Table.
   * @param end The end of the specified portion of the Table. This is exclusive of the element at the index 'end'.
   */
  slice(t, e) {
    const n = this.schema;
    [t, e] = dr({ length: this.numRows }, t, e);
    const s = yr(this.data, this._offsets, t, e);
    return new G(n, s.map((r) => new Z(n, r)));
  }
  /**
   * Returns a child Vector by name, or null if this Vector has no child with the given name.
   *
   * @param name The name of the child to retrieve.
   */
  getChild(t) {
    return this.getChildAt(this.schema.fields.findIndex((e) => e.name === t));
  }
  /**
   * Returns a child Vector by index, or null if this Vector has no child at the supplied index.
   *
   * @param index The index of the child to retrieve.
   */
  getChildAt(t) {
    if (t > -1 && t < this.schema.fields.length) {
      const e = this.data.map((n) => n.children[t]);
      if (e.length === 0) {
        const { type: n } = this.schema.fields[t], s = A({ type: n, length: 0, nullCount: 0 });
        e.push(s._changeLengthAndBackfillNullBitmap(this.numRows));
      }
      return new L(e);
    }
    return null;
  }
  /**
   * Sets a child Vector by name.
   *
   * @param name The name of the child to overwrite.
   * @returns A new Table with the supplied child for the specified name.
   */
  setChild(t, e) {
    var n;
    return this.setChildAt((n = this.schema.fields) === null || n === void 0 ? void 0 : n.findIndex((s) => s.name === t), e);
  }
  setChildAt(t, e) {
    let n = this.schema, s = [...this.batches];
    if (t > -1 && t < this.numCols) {
      e || (e = new L([A({ type: new Gt(), length: this.numRows })]));
      const r = n.fields.slice(), o = r[t].clone({ type: e.type }), a = this.schema.fields.map((c, u) => this.getChildAt(u));
      [r[t], a[t]] = [o, e], [n, s] = Vi(n, a);
    }
    return new G(n, s);
  }
  /**
   * Construct a new Table containing only specified columns.
   *
   * @param columnNames Names of columns to keep.
   * @returns A new Table of columns matching the specified names.
   */
  select(t) {
    const e = this.schema.fields.reduce((n, s, r) => n.set(s.name, r), /* @__PURE__ */ new Map());
    return this.selectAt(t.map((n) => e.get(n)).filter((n) => n > -1));
  }
  /**
   * Construct a new Table containing only columns at the specified indices.
   *
   * @param columnIndices Indices of columns to keep.
   * @returns A new Table of columns at the specified indices.
   */
  selectAt(t) {
    const e = this.schema.selectAt(t), n = this.batches.map((s) => s.selectAt(t));
    return new G(e, n);
  }
  assign(t) {
    const e = this.schema.fields, [n, s] = t.schema.fields.reduce((a, c, u) => {
      const [d, h] = a, f = e.findIndex((T) => T.name === c.name);
      return ~f ? h[f] = u : d.push(u), a;
    }, [[], []]), r = this.schema.assign(t.schema), o = [
      ...e.map((a, c) => [c, s[c]]).map(([a, c]) => c === void 0 ? this.getChildAt(a) : t.getChildAt(c)),
      ...n.map((a) => t.getChildAt(a))
    ].filter(Boolean);
    return new G(...Vi(r, o));
  }
}
Or = Symbol.toStringTag;
G[Or] = ((i) => (i.schema = null, i.batches = [], i._offsets = new Uint32Array([0]), i._nullCount = -1, i[Symbol.isConcatSpreadable] = !0, i.isValid = Ie(In), i.get = Ie(et.getVisitFn(l.Struct)), i.set = mr(ft.getVisitFn(l.Struct)), i.indexOf = br(bi.getVisitFn(l.Struct)), i.getByteLength = Ie(Nt.getVisitFn(l.Struct)), "Table"))(G.prototype);
var Nr;
let Z = class De {
  constructor(...t) {
    switch (t.length) {
      case 2: {
        if ([this.schema] = t, !(this.schema instanceof M))
          throw new TypeError("RecordBatch constructor expects a [Schema, Data] pair.");
        if ([
          ,
          this.data = A({
            nullCount: 0,
            type: new q(this.schema.fields),
            children: this.schema.fields.map((e) => A({ type: e.type, nullCount: 0 }))
          })
        ] = t, !(this.data instanceof P))
          throw new TypeError("RecordBatch constructor expects a [Schema, Data] pair.");
        [this.schema, this.data] = Qn(this.schema, this.data.children);
        break;
      }
      case 1: {
        const [e] = t, { fields: n, children: s, length: r } = Object.keys(e).reduce((c, u, d) => (c.children[d] = e[u], c.length = Math.max(c.length, e[u].length), c.fields[d] = x.new({ name: u, type: e[u].type, nullable: !0 }), c), {
          length: 0,
          fields: new Array(),
          children: new Array()
        }), o = new M(n), a = A({ type: new q(n), length: r, children: s, nullCount: 0 });
        [this.schema, this.data] = Qn(o, a.children, r);
        break;
      }
      default:
        throw new TypeError("RecordBatch constructor expects an Object mapping names to child Data, or a [Schema, Data] pair.");
    }
  }
  get dictionaries() {
    return this._dictionaries || (this._dictionaries = Rr(this.schema.fields, this.data.children));
  }
  /**
   * The number of columns in this RecordBatch.
   */
  get numCols() {
    return this.schema.fields.length;
  }
  /**
   * The number of rows in this RecordBatch.
   */
  get numRows() {
    return this.data.length;
  }
  /**
   * The number of null rows in this RecordBatch.
   */
  get nullCount() {
    return this.data.nullCount;
  }
  /**
   * Check whether an element is null.
   * @param index The index at which to read the validity bitmap.
   */
  isValid(t) {
    return this.data.getValid(t);
  }
  /**
   * Get a row by position.
   * @param index The index of the element to read.
   */
  get(t) {
    return et.visit(this.data, t);
  }
  /**
   * Set a row by position.
   * @param index The index of the element to write.
   * @param value The value to set.
   */
  set(t, e) {
    return ft.visit(this.data, t, e);
  }
  /**
   * Retrieve the index of the first occurrence of a row in an RecordBatch.
   * @param element The row to locate in the RecordBatch.
   * @param offset The index at which to begin the search. If offset is omitted, the search starts at index 0.
   */
  indexOf(t, e) {
    return bi.visit(this.data, t, e);
  }
  /**
   * Get the size (in bytes) of a row by index.
   * @param index The row index for which to compute the byteLength.
   */
  getByteLength(t) {
    return Nt.visit(this.data, t);
  }
  /**
   * Iterator for rows in this RecordBatch.
   */
  [Symbol.iterator]() {
    return vn.visit(new L([this.data]));
  }
  /**
   * Return a JavaScript Array of the RecordBatch rows.
   * @returns An Array of RecordBatch rows.
   */
  toArray() {
    return [...this];
  }
  /**
   * Combines two or more RecordBatch of the same schema.
   * @param others Additional RecordBatch to add to the end of this RecordBatch.
   */
  concat(...t) {
    return new G(this.schema, [this, ...t]);
  }
  /**
   * Return a zero-copy sub-section of this RecordBatch.
   * @param start The beginning of the specified portion of the RecordBatch.
   * @param end The end of the specified portion of the RecordBatch. This is exclusive of the element at the index 'end'.
   */
  slice(t, e) {
    const [n] = new L([this.data]).slice(t, e).data;
    return new De(this.schema, n);
  }
  /**
   * Returns a child Vector by name, or null if this Vector has no child with the given name.
   * @param name The name of the child to retrieve.
   */
  getChild(t) {
    var e;
    return this.getChildAt((e = this.schema.fields) === null || e === void 0 ? void 0 : e.findIndex((n) => n.name === t));
  }
  /**
   * Returns a child Vector by index, or null if this Vector has no child at the supplied index.
   * @param index The index of the child to retrieve.
   */
  getChildAt(t) {
    return t > -1 && t < this.schema.fields.length ? new L([this.data.children[t]]) : null;
  }
  /**
   * Sets a child Vector by name.
   * @param name The name of the child to overwrite.
   * @returns A new RecordBatch with the new child for the specified name.
   */
  setChild(t, e) {
    var n;
    return this.setChildAt((n = this.schema.fields) === null || n === void 0 ? void 0 : n.findIndex((s) => s.name === t), e);
  }
  setChildAt(t, e) {
    let n = this.schema, s = this.data;
    if (t > -1 && t < this.numCols) {
      e || (e = new L([A({ type: new Gt(), length: this.numRows })]));
      const r = n.fields.slice(), o = s.children.slice(), a = r[t].clone({ type: e.type });
      [r[t], o[t]] = [a, e.data[0]], n = new M(r, new Map(this.schema.metadata)), s = A({ type: new q(r), children: o });
    }
    return new De(n, s);
  }
  /**
   * Construct a new RecordBatch containing only specified columns.
   *
   * @param columnNames Names of columns to keep.
   * @returns A new RecordBatch of columns matching the specified names.
   */
  select(t) {
    const e = this.schema.select(t), n = new q(e.fields), s = [];
    for (const r of t) {
      const o = this.schema.fields.findIndex((a) => a.name === r);
      ~o && (s[o] = this.data.children[o]);
    }
    return new De(e, A({ type: n, length: this.numRows, children: s }));
  }
  /**
   * Construct a new RecordBatch containing only columns at the specified indices.
   *
   * @param columnIndices Indices of columns to keep.
   * @returns A new RecordBatch of columns matching at the specified indices.
   */
  selectAt(t) {
    const e = this.schema.selectAt(t), n = t.map((r) => this.data.children[r]).filter(Boolean), s = A({ type: new q(e.fields), length: this.numRows, children: n });
    return new De(e, s);
  }
};
Nr = Symbol.toStringTag;
Z[Nr] = ((i) => (i._nullCount = -1, i[Symbol.isConcatSpreadable] = !0, "RecordBatch"))(Z.prototype);
function Qn(i, t, e = t.reduce((n, s) => Math.max(n, s.length), 0)) {
  var n;
  const s = [...i.fields], r = [...t], o = (e + 63 & -64) >> 3;
  for (const [a, c] of i.fields.entries()) {
    const u = t[a];
    (!u || u.length !== e) && (s[a] = c.clone({ nullable: !0 }), r[a] = (n = u == null ? void 0 : u._changeLengthAndBackfillNullBitmap(e)) !== null && n !== void 0 ? n : A({
      type: c.type,
      length: e,
      nullCount: e,
      nullBitmap: new Uint8Array(o)
    }));
  }
  return [
    i.assign(s),
    A({ type: new q(s), length: e, children: r })
  ];
}
function Rr(i, t, e = /* @__PURE__ */ new Map()) {
  for (let n = -1, s = i.length; ++n < s; ) {
    const o = i[n].type, a = t[n];
    if (y.isDictionary(o)) {
      if (!e.has(o.id))
        a.dictionary && e.set(o.id, a.dictionary);
      else if (e.get(o.id) !== a.dictionary)
        throw new Error("Cannot create Schema containing two different dictionaries with the same Id");
    }
    o.children && o.children.length > 0 && Rr(o.children, a.children, e);
  }
  return e;
}
class Fn extends Z {
  constructor(t) {
    const e = t.fields.map((s) => A({ type: s.type })), n = A({ type: new q(t.fields), nullCount: 0, children: e });
    super(t, n);
  }
}
var Bi;
(function(i) {
  i[i.BUFFER = 0] = "BUFFER";
})(Bi || (Bi = {}));
var Ai;
(function(i) {
  i[i.LZ4_FRAME = 0] = "LZ4_FRAME", i[i.ZSTD = 1] = "ZSTD";
})(Ai || (Ai = {}));
class Yt {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsBodyCompression(t, e) {
    return (e || new Yt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBodyCompression(t, e) {
    return t.setPosition(t.position() + C), (e || new Yt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  /**
   * Compressor library.
   * For LZ4_FRAME, each compressed buffer must consist of a single frame.
   */
  codec() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt8(this.bb_pos + t) : Ai.LZ4_FRAME;
  }
  /**
   * Indicates the way the record batch body was compressed
   */
  method() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt8(this.bb_pos + t) : Bi.BUFFER;
  }
  static startBodyCompression(t) {
    t.startObject(2);
  }
  static addCodec(t, e) {
    t.addFieldInt8(0, e, Ai.LZ4_FRAME);
  }
  static addMethod(t, e) {
    t.addFieldInt8(1, e, Bi.BUFFER);
  }
  static endBodyCompression(t) {
    return t.endObject();
  }
  static createBodyCompression(t, e, n) {
    return Yt.startBodyCompression(t), Yt.addCodec(t, e), Yt.addMethod(t, n), Yt.endBodyCompression(t);
  }
}
class Dr {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  /**
   * The relative offset into the shared memory page where the bytes for this
   * buffer starts
   */
  offset() {
    return this.bb.readInt64(this.bb_pos);
  }
  /**
   * The absolute length (in bytes) of the memory buffer. The memory is found
   * from offset (inclusive) to offset + length (non-inclusive). When building
   * messages using the encapsulated IPC message, padding bytes may be written
   * after a buffer, but such padding bytes do not need to be accounted for in
   * the size here.
   */
  length() {
    return this.bb.readInt64(this.bb_pos + 8);
  }
  static sizeOf() {
    return 16;
  }
  static createBuffer(t, e, n) {
    return t.prep(8, 16), t.writeInt64(BigInt(n ?? 0)), t.writeInt64(BigInt(e ?? 0)), t.offset();
  }
}
let Lr = class {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  /**
   * The number of value slots in the Arrow array at this level of a nested
   * tree
   */
  length() {
    return this.bb.readInt64(this.bb_pos);
  }
  /**
   * The number of observed nulls. Fields with null_count == 0 may choose not
   * to write their physical validity bitmap out as a materialized buffer,
   * instead setting the length of the bitmap buffer to 0.
   */
  nullCount() {
    return this.bb.readInt64(this.bb_pos + 8);
  }
  static sizeOf() {
    return 16;
  }
  static createFieldNode(t, e, n) {
    return t.prep(8, 16), t.writeInt64(BigInt(n ?? 0)), t.writeInt64(BigInt(e ?? 0)), t.offset();
  }
}, Ut = class nn {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsRecordBatch(t, e) {
    return (e || new nn()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsRecordBatch(t, e) {
    return t.setPosition(t.position() + C), (e || new nn()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  /**
   * number of records / rows. The arrays in the batch should all have this
   * length
   */
  length() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt64(this.bb_pos + t) : BigInt("0");
  }
  /**
   * Nodes correspond to the pre-ordered flattened logical schema
   */
  nodes(t, e) {
    const n = this.bb.__offset(this.bb_pos, 6);
    return n ? (e || new Lr()).__init(this.bb.__vector(this.bb_pos + n) + t * 16, this.bb) : null;
  }
  nodesLength() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  /**
   * Buffers correspond to the pre-ordered flattened buffer tree
   *
   * The number of buffers appended to this list depends on the schema. For
   * example, most primitive arrays will have 2 buffers, 1 for the validity
   * bitmap and 1 for the values. For struct arrays, there will only be a
   * single buffer for the validity (nulls) bitmap
   */
  buffers(t, e) {
    const n = this.bb.__offset(this.bb_pos, 8);
    return n ? (e || new Dr()).__init(this.bb.__vector(this.bb_pos + n) + t * 16, this.bb) : null;
  }
  buffersLength() {
    const t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  /**
   * Optional compression of the message body
   */
  compression(t) {
    const e = this.bb.__offset(this.bb_pos, 10);
    return e ? (t || new Yt()).__init(this.bb.__indirect(this.bb_pos + e), this.bb) : null;
  }
  static startRecordBatch(t) {
    t.startObject(4);
  }
  static addLength(t, e) {
    t.addFieldInt64(0, e, BigInt("0"));
  }
  static addNodes(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static startNodesVector(t, e) {
    t.startVector(16, e, 8);
  }
  static addBuffers(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static startBuffersVector(t, e) {
    t.startVector(16, e, 8);
  }
  static addCompression(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static endRecordBatch(t) {
    return t.endObject();
  }
}, ye = class sn {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsDictionaryBatch(t, e) {
    return (e || new sn()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDictionaryBatch(t, e) {
    return t.setPosition(t.position() + C), (e || new sn()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt64(this.bb_pos + t) : BigInt("0");
  }
  data(t) {
    const e = this.bb.__offset(this.bb_pos, 6);
    return e ? (t || new Ut()).__init(this.bb.__indirect(this.bb_pos + e), this.bb) : null;
  }
  /**
   * If isDelta is true the values in the dictionary are to be appended to a
   * dictionary with the indicated id. If isDelta is false this dictionary
   * should replace the existing dictionary.
   */
  isDelta() {
    const t = this.bb.__offset(this.bb_pos, 8);
    return t ? !!this.bb.readInt8(this.bb_pos + t) : !1;
  }
  static startDictionaryBatch(t) {
    t.startObject(3);
  }
  static addId(t, e) {
    t.addFieldInt64(0, e, BigInt("0"));
  }
  static addData(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addIsDelta(t, e) {
    t.addFieldInt8(2, +e, 0);
  }
  static endDictionaryBatch(t) {
    return t.endObject();
  }
};
var Fi;
(function(i) {
  i[i.NONE = 0] = "NONE", i[i.Schema = 1] = "Schema", i[i.DictionaryBatch = 2] = "DictionaryBatch", i[i.RecordBatch = 3] = "RecordBatch", i[i.Tensor = 4] = "Tensor", i[i.SparseTensor = 5] = "SparseTensor";
})(Fi || (Fi = {}));
let zt = class _t {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsMessage(t, e) {
    return (e || new _t()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsMessage(t, e) {
    return t.setPosition(t.position() + C), (e || new _t()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  version() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : Te.V1;
  }
  headerType() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readUint8(this.bb_pos + t) : Fi.NONE;
  }
  header(t) {
    const e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__union(t, this.bb_pos + e) : null;
  }
  bodyLength() {
    const t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt64(this.bb_pos + t) : BigInt("0");
  }
  customMetadata(t, e) {
    const n = this.bb.__offset(this.bb_pos, 12);
    return n ? (e || new W()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + t * 4), this.bb) : null;
  }
  customMetadataLength() {
    const t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startMessage(t) {
    t.startObject(5);
  }
  static addVersion(t, e) {
    t.addFieldInt16(0, e, Te.V1);
  }
  static addHeaderType(t, e) {
    t.addFieldInt8(1, e, Fi.NONE);
  }
  static addHeader(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addBodyLength(t, e) {
    t.addFieldInt64(3, e, BigInt("0"));
  }
  static addCustomMetadata(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static createCustomMetadataVector(t, e) {
    t.startVector(4, e.length, 4);
    for (let n = e.length - 1; n >= 0; n--)
      t.addOffset(e[n]);
    return t.endVector();
  }
  static startCustomMetadataVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endMessage(t) {
    return t.endObject();
  }
  static finishMessageBuffer(t, e) {
    t.finish(e);
  }
  static finishSizePrefixedMessageBuffer(t, e) {
    t.finish(e, void 0, !0);
  }
  static createMessage(t, e, n, s, r, o) {
    return _t.startMessage(t), _t.addVersion(t, e), _t.addHeaderType(t, n), _t.addHeader(t, s), _t.addBodyLength(t, r), _t.addCustomMetadata(t, o), _t.endMessage(t);
  }
};
class Ka extends F {
  visit(t, e) {
    return t == null || e == null ? void 0 : super.visit(t, e);
  }
  visitNull(t, e) {
    return ne.startNull(e), ne.endNull(e);
  }
  visitInt(t, e) {
    return st.startInt(e), st.addBitWidth(e, t.bitWidth), st.addIsSigned(e, t.isSigned), st.endInt(e);
  }
  visitFloat(t, e) {
    return Et.startFloatingPoint(e), Et.addPrecision(e, t.precision), Et.endFloatingPoint(e);
  }
  visitBinary(t, e) {
    return te.startBinary(e), te.endBinary(e);
  }
  visitBool(t, e) {
    return ee.startBool(e), ee.endBool(e);
  }
  visitUtf8(t, e) {
    return re.startUtf8(e), re.endUtf8(e);
  }
  visitDecimal(t, e) {
    return K.startDecimal(e), K.addScale(e, t.scale), K.addPrecision(e, t.precision), K.addBitWidth(e, t.bitWidth), K.endDecimal(e);
  }
  visitDate(t, e) {
    return Je.startDate(e), Je.addUnit(e, t.unit), Je.endDate(e);
  }
  visitTime(t, e) {
    return ut.startTime(e), ut.addUnit(e, t.unit), ut.addBitWidth(e, t.bitWidth), ut.endTime(e);
  }
  visitTimestamp(t, e) {
    const n = t.timezone && e.createString(t.timezone) || void 0;
    return dt.startTimestamp(e), dt.addUnit(e, t.unit), n !== void 0 && dt.addTimezone(e, n), dt.endTimestamp(e);
  }
  visitInterval(t, e) {
    return Bt.startInterval(e), Bt.addUnit(e, t.unit), Bt.endInterval(e);
  }
  visitList(t, e) {
    return ie.startList(e), ie.endList(e);
  }
  visitStruct(t, e) {
    return se.startStruct_(e), se.endStruct_(e);
  }
  visitUnion(t, e) {
    J.startTypeIdsVector(e, t.typeIds.length);
    const n = J.createTypeIdsVector(e, t.typeIds);
    return J.startUnion(e), J.addMode(e, t.mode), J.addTypeIds(e, n), J.endUnion(e);
  }
  visitDictionary(t, e) {
    const n = this.visit(t.indices, e);
    return Ct.startDictionaryEncoding(e), Ct.addId(e, BigInt(t.id)), Ct.addIsOrdered(e, t.isOrdered), n !== void 0 && Ct.addIndexType(e, n), Ct.endDictionaryEncoding(e);
  }
  visitFixedSizeBinary(t, e) {
    return St.startFixedSizeBinary(e), St.addByteWidth(e, t.byteWidth), St.endFixedSizeBinary(e);
  }
  visitFixedSizeList(t, e) {
    return Tt.startFixedSizeList(e), Tt.addListSize(e, t.listSize), Tt.endFixedSizeList(e);
  }
  visitMap(t, e) {
    return Ze.startMap(e), Ze.addKeysSorted(e, t.keysSorted), Ze.endMap(e);
  }
}
const zi = new Ka();
function Ja(i, t = /* @__PURE__ */ new Map()) {
  return new M(Xa(i, t), ei(i.customMetadata), t);
}
function Mr(i) {
  return new at(i.count, Ur(i.columns), kr(i.columns));
}
function Za(i) {
  return new Rt(Mr(i.data), i.id, i.isDelta);
}
function Xa(i, t) {
  return (i.fields || []).filter(Boolean).map((e) => x.fromJSON(e, t));
}
function Kn(i, t) {
  return (i.children || []).filter(Boolean).map((e) => x.fromJSON(e, t));
}
function Ur(i) {
  return (i || []).reduce((t, e) => [
    ...t,
    new ce(e.count, tc(e.VALIDITY)),
    ...Ur(e.children)
  ], []);
}
function kr(i, t = []) {
  for (let e = -1, n = (i || []).length; ++e < n; ) {
    const s = i[e];
    s.VALIDITY && t.push(new Ft(t.length, s.VALIDITY.length)), s.TYPE && t.push(new Ft(t.length, s.TYPE.length)), s.OFFSET && t.push(new Ft(t.length, s.OFFSET.length)), s.DATA && t.push(new Ft(t.length, s.DATA.length)), t = kr(s.children, t);
  }
  return t;
}
function tc(i) {
  return (i || []).reduce((t, e) => t + +(e === 0), 0);
}
function ec(i, t) {
  let e, n, s, r, o, a;
  return !t || !(r = i.dictionary) ? (o = Zn(i, Kn(i, t)), s = new x(i.name, o, i.nullable, ei(i.customMetadata))) : t.has(e = r.id) ? (n = (n = r.indexType) ? Jn(n) : new Ce(), a = new ve(t.get(e), n, e, r.isOrdered), s = new x(i.name, a, i.nullable, ei(i.customMetadata))) : (n = (n = r.indexType) ? Jn(n) : new Ce(), t.set(e, o = Zn(i, Kn(i, t))), a = new ve(o, n, e, r.isOrdered), s = new x(i.name, a, i.nullable, ei(i.customMetadata))), s || null;
}
function ei(i) {
  return new Map(Object.entries(i || {}));
}
function Jn(i) {
  return new qt(i.isSigned, i.bitWidth);
}
function Zn(i, t) {
  const e = i.type.name;
  switch (e) {
    case "NONE":
      return new Gt();
    case "null":
      return new Gt();
    case "binary":
      return new si();
    case "utf8":
      return new ri();
    case "bool":
      return new oi();
    case "list":
      return new di((t || [])[0]);
    case "struct":
      return new q(t || []);
    case "struct_":
      return new q(t || []);
  }
  switch (e) {
    case "int": {
      const n = i.type;
      return new qt(n.isSigned, n.bitWidth);
    }
    case "floatingpoint": {
      const n = i.type;
      return new Pe(X[n.precision]);
    }
    case "decimal": {
      const n = i.type;
      return new ai(n.scale, n.precision, n.bitWidth);
    }
    case "date": {
      const n = i.type;
      return new ci(Pt[n.unit]);
    }
    case "time": {
      const n = i.type;
      return new xe(R[n.unit], n.bitWidth);
    }
    case "timestamp": {
      const n = i.type;
      return new li(R[n.unit], n.timezone);
    }
    case "interval": {
      const n = i.type;
      return new ui(Wt[n.unit]);
    }
    case "union": {
      const n = i.type;
      return new hi(ot[n.mode], n.typeIds || [], t || []);
    }
    case "fixedsizebinary": {
      const n = i.type;
      return new fi(n.byteWidth);
    }
    case "fixedsizelist": {
      const n = i.type;
      return new pi(n.listSize, (t || [])[0]);
    }
    case "map": {
      const n = i.type;
      return new yi((t || [])[0], n.keysSorted);
    }
  }
  throw new Error(`Unrecognized type: "${e}"`);
}
var ic = Er, nc = Se;
class H {
  /** @nocollapse */
  static fromJSON(t, e) {
    const n = new H(0, rt.V4, e);
    return n._createHeader = sc(t, e), n;
  }
  /** @nocollapse */
  static decode(t) {
    t = new nc(N(t));
    const e = zt.getRootAsMessage(t), n = e.bodyLength(), s = e.version(), r = e.headerType(), o = new H(n, s, r);
    return o._createHeader = rc(e, r), o;
  }
  /** @nocollapse */
  static encode(t) {
    const e = new ic();
    let n = -1;
    return t.isSchema() ? n = M.encode(e, t.header()) : t.isRecordBatch() ? n = at.encode(e, t.header()) : t.isDictionaryBatch() && (n = Rt.encode(e, t.header())), zt.startMessage(e), zt.addVersion(e, rt.V4), zt.addHeader(e, n), zt.addHeaderType(e, t.headerType), zt.addBodyLength(e, BigInt(t.bodyLength)), zt.finishMessageBuffer(e, zt.endMessage(e)), e.asUint8Array();
  }
  /** @nocollapse */
  static from(t, e = 0) {
    if (t instanceof M)
      return new H(0, rt.V4, D.Schema, t);
    if (t instanceof at)
      return new H(e, rt.V4, D.RecordBatch, t);
    if (t instanceof Rt)
      return new H(e, rt.V4, D.DictionaryBatch, t);
    throw new Error(`Unrecognized Message header: ${t}`);
  }
  get type() {
    return this.headerType;
  }
  get version() {
    return this._version;
  }
  get headerType() {
    return this._headerType;
  }
  get bodyLength() {
    return this._bodyLength;
  }
  header() {
    return this._createHeader();
  }
  isSchema() {
    return this.headerType === D.Schema;
  }
  isRecordBatch() {
    return this.headerType === D.RecordBatch;
  }
  isDictionaryBatch() {
    return this.headerType === D.DictionaryBatch;
  }
  constructor(t, e, n, s) {
    this._version = e, this._headerType = n, this.body = new Uint8Array(0), s && (this._createHeader = () => s), this._bodyLength = mt(t);
  }
}
class at {
  get nodes() {
    return this._nodes;
  }
  get length() {
    return this._length;
  }
  get buffers() {
    return this._buffers;
  }
  constructor(t, e, n) {
    this._nodes = e, this._buffers = n, this._length = mt(t);
  }
}
class Rt {
  get id() {
    return this._id;
  }
  get data() {
    return this._data;
  }
  get isDelta() {
    return this._isDelta;
  }
  get length() {
    return this.data.length;
  }
  get nodes() {
    return this.data.nodes;
  }
  get buffers() {
    return this.data.buffers;
  }
  constructor(t, e, n = !1) {
    this._data = t, this._isDelta = n, this._id = mt(e);
  }
}
class Ft {
  constructor(t, e) {
    this.offset = mt(t), this.length = mt(e);
  }
}
class ce {
  constructor(t, e) {
    this.length = mt(t), this.nullCount = mt(e);
  }
}
function sc(i, t) {
  return () => {
    switch (t) {
      case D.Schema:
        return M.fromJSON(i);
      case D.RecordBatch:
        return at.fromJSON(i);
      case D.DictionaryBatch:
        return Rt.fromJSON(i);
    }
    throw new Error(`Unrecognized Message type: { name: ${D[t]}, type: ${t} }`);
  };
}
function rc(i, t) {
  return () => {
    switch (t) {
      case D.Schema:
        return M.decode(i.header(new gt()));
      case D.RecordBatch:
        return at.decode(i.header(new Ut()), i.version());
      case D.DictionaryBatch:
        return Rt.decode(i.header(new ye()), i.version());
    }
    throw new Error(`Unrecognized Message type: { name: ${D[t]}, type: ${t} }`);
  };
}
x.encode = mc;
x.decode = pc;
x.fromJSON = ec;
M.encode = yc;
M.decode = oc;
M.fromJSON = Ja;
at.encode = bc;
at.decode = ac;
at.fromJSON = Mr;
Rt.encode = _c;
Rt.decode = cc;
Rt.fromJSON = Za;
ce.encode = gc;
ce.decode = uc;
Ft.encode = wc;
Ft.decode = lc;
function oc(i, t = /* @__PURE__ */ new Map()) {
  const e = fc(i, t);
  return new M(e, ii(i), t);
}
function ac(i, t = rt.V4) {
  if (i.compression() !== null)
    throw new Error("Record batch compression not implemented");
  return new at(i.length(), dc(i), hc(i, t));
}
function cc(i, t = rt.V4) {
  return new Rt(at.decode(i.data(), t), i.id(), i.isDelta());
}
function lc(i) {
  return new Ft(i.offset(), i.length());
}
function uc(i) {
  return new ce(i.length(), i.nullCount());
}
function dc(i) {
  const t = [];
  for (let e, n = -1, s = -1, r = i.nodesLength(); ++n < r; )
    (e = i.nodes(n)) && (t[++s] = ce.decode(e));
  return t;
}
function hc(i, t) {
  const e = [];
  for (let n, s = -1, r = -1, o = i.buffersLength(); ++s < o; )
    (n = i.buffers(s)) && (t < rt.V4 && (n.bb_pos += 8 * (s + 1)), e[++r] = Ft.decode(n));
  return e;
}
function fc(i, t) {
  const e = [];
  for (let n, s = -1, r = -1, o = i.fieldsLength(); ++s < o; )
    (n = i.fields(s)) && (e[++r] = x.decode(n, t));
  return e;
}
function Xn(i, t) {
  const e = [];
  for (let n, s = -1, r = -1, o = i.childrenLength(); ++s < o; )
    (n = i.children(s)) && (e[++r] = x.decode(n, t));
  return e;
}
function pc(i, t) {
  let e, n, s, r, o, a;
  return !t || !(a = i.dictionary()) ? (s = es(i, Xn(i, t)), n = new x(i.name(), s, i.nullable(), ii(i))) : t.has(e = mt(a.id())) ? (r = (r = a.indexType()) ? ts(r) : new Ce(), o = new ve(t.get(e), r, e, a.isOrdered()), n = new x(i.name(), o, i.nullable(), ii(i))) : (r = (r = a.indexType()) ? ts(r) : new Ce(), t.set(e, s = es(i, Xn(i, t))), o = new ve(s, r, e, a.isOrdered()), n = new x(i.name(), o, i.nullable(), ii(i))), n || null;
}
function ii(i) {
  const t = /* @__PURE__ */ new Map();
  if (i)
    for (let e, n, s = -1, r = Math.trunc(i.customMetadataLength()); ++s < r; )
      (e = i.customMetadata(s)) && (n = e.key()) != null && t.set(n, e.value());
  return t;
}
function ts(i) {
  return new qt(i.isSigned(), i.bitWidth());
}
function es(i, t) {
  const e = i.typeType();
  switch (e) {
    case V.NONE:
      return new Gt();
    case V.Null:
      return new Gt();
    case V.Binary:
      return new si();
    case V.Utf8:
      return new ri();
    case V.Bool:
      return new oi();
    case V.List:
      return new di((t || [])[0]);
    case V.Struct_:
      return new q(t || []);
  }
  switch (e) {
    case V.Int: {
      const n = i.type(new st());
      return new qt(n.isSigned(), n.bitWidth());
    }
    case V.FloatingPoint: {
      const n = i.type(new Et());
      return new Pe(n.precision());
    }
    case V.Decimal: {
      const n = i.type(new K());
      return new ai(n.scale(), n.precision(), n.bitWidth());
    }
    case V.Date: {
      const n = i.type(new Je());
      return new ci(n.unit());
    }
    case V.Time: {
      const n = i.type(new ut());
      return new xe(n.unit(), n.bitWidth());
    }
    case V.Timestamp: {
      const n = i.type(new dt());
      return new li(n.unit(), n.timezone());
    }
    case V.Interval: {
      const n = i.type(new Bt());
      return new ui(n.unit());
    }
    case V.Union: {
      const n = i.type(new J());
      return new hi(n.mode(), n.typeIdsArray() || [], t || []);
    }
    case V.FixedSizeBinary: {
      const n = i.type(new St());
      return new fi(n.byteWidth());
    }
    case V.FixedSizeList: {
      const n = i.type(new Tt());
      return new pi(n.listSize(), (t || [])[0]);
    }
    case V.Map: {
      const n = i.type(new Ze());
      return new yi((t || [])[0], n.keysSorted());
    }
  }
  throw new Error(`Unrecognized type: "${V[e]}" (${e})`);
}
function yc(i, t) {
  const e = t.fields.map((r) => x.encode(i, r));
  gt.startFieldsVector(i, e.length);
  const n = gt.createFieldsVector(i, e), s = t.metadata && t.metadata.size > 0 ? gt.createCustomMetadataVector(i, [...t.metadata].map(([r, o]) => {
    const a = i.createString(`${r}`), c = i.createString(`${o}`);
    return W.startKeyValue(i), W.addKey(i, a), W.addValue(i, c), W.endKeyValue(i);
  })) : -1;
  return gt.startSchema(i), gt.addFields(i, n), gt.addEndianness(i, Ic ? Ee.Little : Ee.Big), s !== -1 && gt.addCustomMetadata(i, s), gt.endSchema(i);
}
function mc(i, t) {
  let e = -1, n = -1, s = -1;
  const r = t.type;
  let o = t.typeId;
  y.isDictionary(r) ? (o = r.dictionary.typeId, s = zi.visit(r, i), n = zi.visit(r.dictionary, i)) : n = zi.visit(r, i);
  const a = (r.children || []).map((d) => x.encode(i, d)), c = ct.createChildrenVector(i, a), u = t.metadata && t.metadata.size > 0 ? ct.createCustomMetadataVector(i, [...t.metadata].map(([d, h]) => {
    const f = i.createString(`${d}`), T = i.createString(`${h}`);
    return W.startKeyValue(i), W.addKey(i, f), W.addValue(i, T), W.endKeyValue(i);
  })) : -1;
  return t.name && (e = i.createString(t.name)), ct.startField(i), ct.addType(i, n), ct.addTypeType(i, o), ct.addChildren(i, c), ct.addNullable(i, !!t.nullable), e !== -1 && ct.addName(i, e), s !== -1 && ct.addDictionary(i, s), u !== -1 && ct.addCustomMetadata(i, u), ct.endField(i);
}
function bc(i, t) {
  const e = t.nodes || [], n = t.buffers || [];
  Ut.startNodesVector(i, e.length);
  for (const o of e.slice().reverse())
    ce.encode(i, o);
  const s = i.endVector();
  Ut.startBuffersVector(i, n.length);
  for (const o of n.slice().reverse())
    Ft.encode(i, o);
  const r = i.endVector();
  return Ut.startRecordBatch(i), Ut.addLength(i, BigInt(t.length)), Ut.addNodes(i, s), Ut.addBuffers(i, r), Ut.endRecordBatch(i);
}
function _c(i, t) {
  const e = at.encode(i, t.data);
  return ye.startDictionaryBatch(i), ye.addId(i, BigInt(t.id)), ye.addIsDelta(i, t.isDelta), ye.addData(i, e), ye.endDictionaryBatch(i);
}
function gc(i, t) {
  return Lr.createFieldNode(i, BigInt(t.length), BigInt(t.nullCount));
}
function wc(i, t) {
  return Dr.createBuffer(i, BigInt(t.offset), BigInt(t.length));
}
const Ic = (() => {
  const i = new ArrayBuffer(2);
  return new DataView(i).setInt16(
    0,
    256,
    !0
    /* littleEndian */
  ), new Int16Array(i)[0] === 256;
})(), On = (i) => `Expected ${D[i]} Message in stream, but was null or length 0.`, Nn = (i) => `Header pointer of flatbuffer-encoded ${D[i]} Message is null or length 0.`, Cr = (i, t) => `Expected to read ${i} metadata bytes, but only read ${t}.`, Pr = (i, t) => `Expected to read ${i} bytes for message body, but only read ${t}.`;
class xr {
  constructor(t) {
    this.source = t instanceof Ti ? t : new Ti(t);
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    let t;
    return (t = this.readMetadataLength()).done || t.value === -1 && (t = this.readMetadataLength()).done || (t = this.readMetadata(t.value)).done ? z : t;
  }
  throw(t) {
    return this.source.throw(t);
  }
  return(t) {
    return this.source.return(t);
  }
  readMessage(t) {
    let e;
    if ((e = this.next()).done)
      return null;
    if (t != null && e.value.headerType !== t)
      throw new Error(On(t));
    return e.value;
  }
  readMessageBody(t) {
    if (t <= 0)
      return new Uint8Array(0);
    const e = N(this.source.read(t));
    if (e.byteLength < t)
      throw new Error(Pr(t, e.byteLength));
    return (
      /* 1. */
      e.byteOffset % 8 === 0 && /* 2. */
      e.byteOffset + e.byteLength <= e.buffer.byteLength ? e : e.slice()
    );
  }
  readSchema(t = !1) {
    const e = D.Schema, n = this.readMessage(e), s = n == null ? void 0 : n.header();
    if (t && !s)
      throw new Error(Nn(e));
    return s;
  }
  readMetadataLength() {
    const t = this.source.read(ki), e = t && new Se(t), n = (e == null ? void 0 : e.readInt32(0)) || 0;
    return { done: n === 0, value: n };
  }
  readMetadata(t) {
    const e = this.source.read(t);
    if (!e)
      return z;
    if (e.byteLength < t)
      throw new Error(Cr(t, e.byteLength));
    return { done: !1, value: H.decode(e) };
  }
}
class vc {
  constructor(t, e) {
    this.source = t instanceof Ae ? t : os(t) ? new Ei(t, e) : new Ae(t);
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  next() {
    return p(this, void 0, void 0, function* () {
      let t;
      return (t = yield this.readMetadataLength()).done || t.value === -1 && (t = yield this.readMetadataLength()).done || (t = yield this.readMetadata(t.value)).done ? z : t;
    });
  }
  throw(t) {
    return p(this, void 0, void 0, function* () {
      return yield this.source.throw(t);
    });
  }
  return(t) {
    return p(this, void 0, void 0, function* () {
      return yield this.source.return(t);
    });
  }
  readMessage(t) {
    return p(this, void 0, void 0, function* () {
      let e;
      if ((e = yield this.next()).done)
        return null;
      if (t != null && e.value.headerType !== t)
        throw new Error(On(t));
      return e.value;
    });
  }
  readMessageBody(t) {
    return p(this, void 0, void 0, function* () {
      if (t <= 0)
        return new Uint8Array(0);
      const e = N(yield this.source.read(t));
      if (e.byteLength < t)
        throw new Error(Pr(t, e.byteLength));
      return (
        /* 1. */
        e.byteOffset % 8 === 0 && /* 2. */
        e.byteOffset + e.byteLength <= e.buffer.byteLength ? e : e.slice()
      );
    });
  }
  readSchema(t = !1) {
    return p(this, void 0, void 0, function* () {
      const e = D.Schema, n = yield this.readMessage(e), s = n == null ? void 0 : n.header();
      if (t && !s)
        throw new Error(Nn(e));
      return s;
    });
  }
  readMetadataLength() {
    return p(this, void 0, void 0, function* () {
      const t = yield this.source.read(ki), e = t && new Se(t), n = (e == null ? void 0 : e.readInt32(0)) || 0;
      return { done: n === 0, value: n };
    });
  }
  readMetadata(t) {
    return p(this, void 0, void 0, function* () {
      const e = yield this.source.read(t);
      if (!e)
        return z;
      if (e.byteLength < t)
        throw new Error(Cr(t, e.byteLength));
      return { done: !1, value: H.decode(e) };
    });
  }
}
class Sc extends xr {
  constructor(t) {
    super(new Uint8Array(0)), this._schema = !1, this._body = [], this._batchIndex = 0, this._dictionaryIndex = 0, this._json = t instanceof qn ? t : new qn(t);
  }
  next() {
    const { _json: t } = this;
    if (!this._schema)
      return this._schema = !0, { done: !1, value: H.fromJSON(t.schema, D.Schema) };
    if (this._dictionaryIndex < t.dictionaries.length) {
      const e = t.dictionaries[this._dictionaryIndex++];
      return this._body = e.data.columns, { done: !1, value: H.fromJSON(e, D.DictionaryBatch) };
    }
    if (this._batchIndex < t.batches.length) {
      const e = t.batches[this._batchIndex++];
      return this._body = e.columns, { done: !1, value: H.fromJSON(e, D.RecordBatch) };
    }
    return this._body = [], z;
  }
  readMessageBody(t) {
    return e(this._body);
    function e(n) {
      return (n || []).reduce((s, r) => [
        ...s,
        ...r.VALIDITY && [r.VALIDITY] || [],
        ...r.TYPE && [r.TYPE] || [],
        ...r.OFFSET && [r.OFFSET] || [],
        ...r.DATA && [r.DATA] || [],
        ...e(r.children)
      ], []);
    }
  }
  readMessage(t) {
    let e;
    if ((e = this.next()).done)
      return null;
    if (t != null && e.value.headerType !== t)
      throw new Error(On(t));
    return e.value;
  }
  readSchema() {
    const t = D.Schema, e = this.readMessage(t), n = e == null ? void 0 : e.header();
    if (!e || !n)
      throw new Error(Nn(t));
    return n;
  }
}
const ki = 4, rn = "ARROW1", Ve = new Uint8Array(rn.length);
for (let i = 0; i < rn.length; i += 1)
  Ve[i] = rn.codePointAt(i);
function Rn(i, t = 0) {
  for (let e = -1, n = Ve.length; ++e < n; )
    if (Ve[e] !== i[t + e])
      return !1;
  return !0;
}
const Ge = Ve.length, jr = Ge + ki, Tc = Ge * 2 + ki;
class ht extends Sn {
  constructor(t) {
    super(), this._impl = t;
  }
  get closed() {
    return this._impl.closed;
  }
  get schema() {
    return this._impl.schema;
  }
  get autoDestroy() {
    return this._impl.autoDestroy;
  }
  get dictionaries() {
    return this._impl.dictionaries;
  }
  get numDictionaries() {
    return this._impl.numDictionaries;
  }
  get numRecordBatches() {
    return this._impl.numRecordBatches;
  }
  get footer() {
    return this._impl.isFile() ? this._impl.footer : null;
  }
  isSync() {
    return this._impl.isSync();
  }
  isAsync() {
    return this._impl.isAsync();
  }
  isFile() {
    return this._impl.isFile();
  }
  isStream() {
    return this._impl.isStream();
  }
  next() {
    return this._impl.next();
  }
  throw(t) {
    return this._impl.throw(t);
  }
  return(t) {
    return this._impl.return(t);
  }
  cancel() {
    return this._impl.cancel();
  }
  reset(t) {
    return this._impl.reset(t), this._DOMStream = void 0, this._nodeStream = void 0, this;
  }
  open(t) {
    const e = this._impl.open(t);
    return ae(e) ? e.then(() => this) : this;
  }
  readRecordBatch(t) {
    return this._impl.isFile() ? this._impl.readRecordBatch(t) : null;
  }
  [Symbol.iterator]() {
    return this._impl[Symbol.iterator]();
  }
  [Symbol.asyncIterator]() {
    return this._impl[Symbol.asyncIterator]();
  }
  toDOMStream() {
    return lt.toDOMStream(this.isSync() ? { [Symbol.iterator]: () => this } : { [Symbol.asyncIterator]: () => this });
  }
  toNodeStream() {
    return lt.toNodeStream(this.isSync() ? { [Symbol.iterator]: () => this } : { [Symbol.asyncIterator]: () => this }, { objectMode: !0 });
  }
  /** @nocollapse */
  // @ts-ignore
  static throughNode(t) {
    throw new Error('"throughNode" not available in this environment');
  }
  /** @nocollapse */
  static throughDOM(t, e) {
    throw new Error('"throughDOM" not available in this environment');
  }
  /** @nocollapse */
  static from(t) {
    return t instanceof ht ? t : Qi(t) ? Fc(t) : os(t) ? Rc(t) : ae(t) ? (() => p(this, void 0, void 0, function* () {
      return yield ht.from(yield t);
    }))() : as(t) || ln(t) || cs(t) || Oe(t) ? Nc(new Ae(t)) : Oc(new Ti(t));
  }
  /** @nocollapse */
  static readAll(t) {
    return t instanceof ht ? t.isSync() ? is(t) : ns(t) : Qi(t) || ArrayBuffer.isView(t) || ze(t) || rs(t) ? is(t) : ns(t);
  }
}
class Oi extends ht {
  constructor(t) {
    super(t), this._impl = t;
  }
  readAll() {
    return [...this];
  }
  [Symbol.iterator]() {
    return this._impl[Symbol.iterator]();
  }
  [Symbol.asyncIterator]() {
    return At(this, arguments, function* () {
      yield E(yield* Ke(oe(this[Symbol.iterator]())));
    });
  }
}
class Ni extends ht {
  constructor(t) {
    super(t), this._impl = t;
  }
  readAll() {
    var t, e, n, s;
    return p(this, void 0, void 0, function* () {
      const r = new Array();
      try {
        for (var o = !0, a = oe(this), c; c = yield a.next(), t = c.done, !t; o = !0) {
          s = c.value, o = !1;
          const u = s;
          r.push(u);
        }
      } catch (u) {
        e = { error: u };
      } finally {
        try {
          !o && !t && (n = a.return) && (yield n.call(a));
        } finally {
          if (e)
            throw e.error;
        }
      }
      return r;
    });
  }
  [Symbol.iterator]() {
    throw new Error("AsyncRecordBatchStreamReader is not Iterable");
  }
  [Symbol.asyncIterator]() {
    return this._impl[Symbol.asyncIterator]();
  }
}
class Vr extends Oi {
  constructor(t) {
    super(t), this._impl = t;
  }
}
class Ec extends Ni {
  constructor(t) {
    super(t), this._impl = t;
  }
}
class zr {
  get numDictionaries() {
    return this._dictionaryIndex;
  }
  get numRecordBatches() {
    return this._recordBatchIndex;
  }
  constructor(t = /* @__PURE__ */ new Map()) {
    this.closed = !1, this.autoDestroy = !0, this._dictionaryIndex = 0, this._recordBatchIndex = 0, this.dictionaries = t;
  }
  isSync() {
    return !1;
  }
  isAsync() {
    return !1;
  }
  isFile() {
    return !1;
  }
  isStream() {
    return !1;
  }
  reset(t) {
    return this._dictionaryIndex = 0, this._recordBatchIndex = 0, this.schema = t, this.dictionaries = /* @__PURE__ */ new Map(), this;
  }
  _loadRecordBatch(t, e) {
    const n = this._loadVectors(t, e, this.schema.fields), s = A({ type: new q(this.schema.fields), length: t.length, children: n });
    return new Z(this.schema, s);
  }
  _loadDictionaryBatch(t, e) {
    const { id: n, isDelta: s } = t, { dictionaries: r, schema: o } = this, a = r.get(n);
    if (s || !a) {
      const c = o.dictionaries.get(n), u = this._loadVectors(t.data, e, [c]);
      return (a && s ? a.concat(new L(u)) : new L(u)).memoize();
    }
    return a.memoize();
  }
  _loadVectors(t, e, n) {
    return new Fr(e, t.nodes, t.buffers, this.dictionaries).visitMany(n);
  }
}
class Ri extends zr {
  constructor(t, e) {
    super(e), this._reader = Qi(t) ? new Sc(this._handle = t) : new xr(this._handle = t);
  }
  isSync() {
    return !0;
  }
  isStream() {
    return !0;
  }
  [Symbol.iterator]() {
    return this;
  }
  cancel() {
    !this.closed && (this.closed = !0) && (this.reset()._reader.return(), this._reader = null, this.dictionaries = null);
  }
  open(t) {
    return this.closed || (this.autoDestroy = Yr(this, t), this.schema || (this.schema = this._reader.readSchema()) || this.cancel()), this;
  }
  throw(t) {
    return !this.closed && this.autoDestroy && (this.closed = !0) ? this.reset()._reader.throw(t) : z;
  }
  return(t) {
    return !this.closed && this.autoDestroy && (this.closed = !0) ? this.reset()._reader.return(t) : z;
  }
  next() {
    if (this.closed)
      return z;
    let t;
    const { _reader: e } = this;
    for (; t = this._readNextMessageAndValidate(); )
      if (t.isSchema())
        this.reset(t.header());
      else if (t.isRecordBatch()) {
        this._recordBatchIndex++;
        const n = t.header(), s = e.readMessageBody(t.bodyLength);
        return { done: !1, value: this._loadRecordBatch(n, s) };
      } else if (t.isDictionaryBatch()) {
        this._dictionaryIndex++;
        const n = t.header(), s = e.readMessageBody(t.bodyLength), r = this._loadDictionaryBatch(n, s);
        this.dictionaries.set(n.id, r);
      }
    return this.schema && this._recordBatchIndex === 0 ? (this._recordBatchIndex++, { done: !1, value: new Fn(this.schema) }) : this.return();
  }
  _readNextMessageAndValidate(t) {
    return this._reader.readMessage(t);
  }
}
class Di extends zr {
  constructor(t, e) {
    super(e), this._reader = new vc(this._handle = t);
  }
  isAsync() {
    return !0;
  }
  isStream() {
    return !0;
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  cancel() {
    return p(this, void 0, void 0, function* () {
      !this.closed && (this.closed = !0) && (yield this.reset()._reader.return(), this._reader = null, this.dictionaries = null);
    });
  }
  open(t) {
    return p(this, void 0, void 0, function* () {
      return this.closed || (this.autoDestroy = Yr(this, t), this.schema || (this.schema = yield this._reader.readSchema()) || (yield this.cancel())), this;
    });
  }
  throw(t) {
    return p(this, void 0, void 0, function* () {
      return !this.closed && this.autoDestroy && (this.closed = !0) ? yield this.reset()._reader.throw(t) : z;
    });
  }
  return(t) {
    return p(this, void 0, void 0, function* () {
      return !this.closed && this.autoDestroy && (this.closed = !0) ? yield this.reset()._reader.return(t) : z;
    });
  }
  next() {
    return p(this, void 0, void 0, function* () {
      if (this.closed)
        return z;
      let t;
      const { _reader: e } = this;
      for (; t = yield this._readNextMessageAndValidate(); )
        if (t.isSchema())
          yield this.reset(t.header());
        else if (t.isRecordBatch()) {
          this._recordBatchIndex++;
          const n = t.header(), s = yield e.readMessageBody(t.bodyLength);
          return { done: !1, value: this._loadRecordBatch(n, s) };
        } else if (t.isDictionaryBatch()) {
          this._dictionaryIndex++;
          const n = t.header(), s = yield e.readMessageBody(t.bodyLength), r = this._loadDictionaryBatch(n, s);
          this.dictionaries.set(n.id, r);
        }
      return this.schema && this._recordBatchIndex === 0 ? (this._recordBatchIndex++, { done: !1, value: new Fn(this.schema) }) : yield this.return();
    });
  }
  _readNextMessageAndValidate(t) {
    return p(this, void 0, void 0, function* () {
      return yield this._reader.readMessage(t);
    });
  }
}
class $r extends Ri {
  get footer() {
    return this._footer;
  }
  get numDictionaries() {
    return this._footer ? this._footer.numDictionaries : 0;
  }
  get numRecordBatches() {
    return this._footer ? this._footer.numRecordBatches : 0;
  }
  constructor(t, e) {
    super(t instanceof Hn ? t : new Hn(t), e);
  }
  isSync() {
    return !0;
  }
  isFile() {
    return !0;
  }
  open(t) {
    if (!this.closed && !this._footer) {
      this.schema = (this._footer = this._readFooter()).schema;
      for (const e of this._footer.dictionaryBatches())
        e && this._readDictionaryBatch(this._dictionaryIndex++);
    }
    return super.open(t);
  }
  readRecordBatch(t) {
    var e;
    if (this.closed)
      return null;
    this._footer || this.open();
    const n = (e = this._footer) === null || e === void 0 ? void 0 : e.getRecordBatch(t);
    if (n && this._handle.seek(n.offset)) {
      const s = this._reader.readMessage(D.RecordBatch);
      if (s != null && s.isRecordBatch()) {
        const r = s.header(), o = this._reader.readMessageBody(s.bodyLength);
        return this._loadRecordBatch(r, o);
      }
    }
    return null;
  }
  _readDictionaryBatch(t) {
    var e;
    const n = (e = this._footer) === null || e === void 0 ? void 0 : e.getDictionaryBatch(t);
    if (n && this._handle.seek(n.offset)) {
      const s = this._reader.readMessage(D.DictionaryBatch);
      if (s != null && s.isDictionaryBatch()) {
        const r = s.header(), o = this._reader.readMessageBody(s.bodyLength), a = this._loadDictionaryBatch(r, o);
        this.dictionaries.set(r.id, a);
      }
    }
  }
  _readFooter() {
    const { _handle: t } = this, e = t.size - jr, n = t.readInt32(e), s = t.readAt(e - n, n);
    return je.decode(s);
  }
  _readNextMessageAndValidate(t) {
    var e;
    if (this._footer || this.open(), this._footer && this._recordBatchIndex < this.numRecordBatches) {
      const n = (e = this._footer) === null || e === void 0 ? void 0 : e.getRecordBatch(this._recordBatchIndex);
      if (n && this._handle.seek(n.offset))
        return this._reader.readMessage(t);
    }
    return null;
  }
}
class Bc extends Di {
  get footer() {
    return this._footer;
  }
  get numDictionaries() {
    return this._footer ? this._footer.numDictionaries : 0;
  }
  get numRecordBatches() {
    return this._footer ? this._footer.numRecordBatches : 0;
  }
  constructor(t, ...e) {
    const n = typeof e[0] != "number" ? e.shift() : void 0, s = e[0] instanceof Map ? e.shift() : void 0;
    super(t instanceof Ei ? t : new Ei(t, n), s);
  }
  isFile() {
    return !0;
  }
  isAsync() {
    return !0;
  }
  open(t) {
    const e = Object.create(null, {
      open: { get: () => super.open }
    });
    return p(this, void 0, void 0, function* () {
      if (!this.closed && !this._footer) {
        this.schema = (this._footer = yield this._readFooter()).schema;
        for (const n of this._footer.dictionaryBatches())
          n && (yield this._readDictionaryBatch(this._dictionaryIndex++));
      }
      return yield e.open.call(this, t);
    });
  }
  readRecordBatch(t) {
    var e;
    return p(this, void 0, void 0, function* () {
      if (this.closed)
        return null;
      this._footer || (yield this.open());
      const n = (e = this._footer) === null || e === void 0 ? void 0 : e.getRecordBatch(t);
      if (n && (yield this._handle.seek(n.offset))) {
        const s = yield this._reader.readMessage(D.RecordBatch);
        if (s != null && s.isRecordBatch()) {
          const r = s.header(), o = yield this._reader.readMessageBody(s.bodyLength);
          return this._loadRecordBatch(r, o);
        }
      }
      return null;
    });
  }
  _readDictionaryBatch(t) {
    var e;
    return p(this, void 0, void 0, function* () {
      const n = (e = this._footer) === null || e === void 0 ? void 0 : e.getDictionaryBatch(t);
      if (n && (yield this._handle.seek(n.offset))) {
        const s = yield this._reader.readMessage(D.DictionaryBatch);
        if (s != null && s.isDictionaryBatch()) {
          const r = s.header(), o = yield this._reader.readMessageBody(s.bodyLength), a = this._loadDictionaryBatch(r, o);
          this.dictionaries.set(r.id, a);
        }
      }
    });
  }
  _readFooter() {
    return p(this, void 0, void 0, function* () {
      const { _handle: t } = this;
      t._pending && (yield t._pending);
      const e = t.size - jr, n = yield t.readInt32(e), s = yield t.readAt(e - n, n);
      return je.decode(s);
    });
  }
  _readNextMessageAndValidate(t) {
    return p(this, void 0, void 0, function* () {
      if (this._footer || (yield this.open()), this._footer && this._recordBatchIndex < this.numRecordBatches) {
        const e = this._footer.getRecordBatch(this._recordBatchIndex);
        if (e && (yield this._handle.seek(e.offset)))
          return yield this._reader.readMessage(t);
      }
      return null;
    });
  }
}
class Ac extends Ri {
  constructor(t, e) {
    super(t, e);
  }
  _loadVectors(t, e, n) {
    return new ja(e, t.nodes, t.buffers, this.dictionaries).visitMany(n);
  }
}
function Yr(i, t) {
  return t && typeof t.autoDestroy == "boolean" ? t.autoDestroy : i.autoDestroy;
}
function* is(i) {
  const t = ht.from(i);
  try {
    if (!t.open({ autoDestroy: !1 }).closed)
      do
        yield t;
      while (!t.reset().open().closed);
  } finally {
    t.cancel();
  }
}
function ns(i) {
  return At(this, arguments, function* () {
    const e = yield E(ht.from(i));
    try {
      if (!(yield E(e.open({ autoDestroy: !1 }))).closed)
        do
          yield yield E(e);
        while (!(yield E(e.reset().open())).closed);
    } finally {
      yield E(e.cancel());
    }
  });
}
function Fc(i) {
  return new Oi(new Ac(i));
}
function Oc(i) {
  const t = i.peek(Ge + 7 & -8);
  return t && t.byteLength >= 4 ? Rn(t) ? new Vr(new $r(i.read())) : new Oi(new Ri(i)) : new Oi(new Ri(/* @__PURE__ */ function* () {
  }()));
}
function Nc(i) {
  return p(this, void 0, void 0, function* () {
    const t = yield i.peek(Ge + 7 & -8);
    return t && t.byteLength >= 4 ? Rn(t) ? new Vr(new $r(yield i.read())) : new Ni(new Di(i)) : new Ni(new Di(function() {
      return At(this, arguments, function* () {
      });
    }()));
  });
}
function Rc(i) {
  return p(this, void 0, void 0, function* () {
    const { size: t } = yield i.stat(), e = new Ei(i, t);
    return t >= Tc && Rn(yield e.readAt(0, Ge + 7 & -8)) ? new Ec(new Bc(e)) : new Ni(new Di(e));
  });
}
class $ extends F {
  /** @nocollapse */
  static assemble(...t) {
    const e = (s) => s.flatMap((r) => Array.isArray(r) ? e(r) : r instanceof Z ? r.data.children : r.data), n = new $();
    return n.visitMany(e(t)), n;
  }
  constructor() {
    super(), this._byteLength = 0, this._nodes = [], this._buffers = [], this._bufferRegions = [];
  }
  visit(t) {
    if (t instanceof L)
      return this.visitMany(t.data), this;
    const { type: e } = t;
    if (!y.isDictionary(e)) {
      const { length: n, nullCount: s } = t;
      if (n > 2147483647)
        throw new RangeError("Cannot write arrays larger than 2^31 - 1 in length");
      y.isNull(e) || yt.call(this, s <= 0 ? new Uint8Array(0) : _n(t.offset, n, t.nullBitmap)), this.nodes.push(new ce(n, s));
    }
    return super.visit(t);
  }
  visitNull(t) {
    return this;
  }
  visitDictionary(t) {
    return this.visit(t.clone(t.type.indices));
  }
  get nodes() {
    return this._nodes;
  }
  get buffers() {
    return this._buffers;
  }
  get byteLength() {
    return this._byteLength;
  }
  get bufferRegions() {
    return this._bufferRegions;
  }
}
function yt(i) {
  const t = i.byteLength + 7 & -8;
  return this.buffers.push(i), this.bufferRegions.push(new Ft(this._byteLength, t)), this._byteLength += t, this;
}
function Dc(i) {
  const { type: t, length: e, typeIds: n, valueOffsets: s } = i;
  if (yt.call(this, n), t.mode === ot.Sparse)
    return on.call(this, i);
  if (t.mode === ot.Dense) {
    if (i.offset <= 0)
      return yt.call(this, s), on.call(this, i);
    {
      const r = n.reduce((d, h) => Math.max(d, h), n[0]), o = new Int32Array(r + 1), a = new Int32Array(r + 1).fill(-1), c = new Int32Array(e), u = dn(-s[0], e, s);
      for (let d, h, f = -1; ++f < e; )
        (h = a[d = n[f]]) === -1 && (h = a[d] = u[d]), c[f] = u[f] - h, ++o[d];
      yt.call(this, c);
      for (let d, h = -1, f = t.children.length; ++h < f; )
        if (d = i.children[h]) {
          const T = t.typeIds[h], j = Math.min(e, o[T]);
          this.visit(d.slice(a[T], j));
        }
    }
  }
  return this;
}
function Lc(i) {
  let t;
  return i.nullCount >= i.length ? yt.call(this, new Uint8Array(0)) : (t = i.values) instanceof Uint8Array ? yt.call(this, _n(i.offset, i.length, t)) : yt.call(this, mi(i.values));
}
function Zt(i) {
  return yt.call(this, i.values.subarray(0, i.length * i.stride));
}
function Wr(i) {
  const { length: t, values: e, valueOffsets: n } = i, s = n[0], r = n[t], o = Math.min(r - s, e.byteLength - s);
  return yt.call(this, dn(-n[0], t, n)), yt.call(this, e.subarray(s, s + o)), this;
}
function Dn(i) {
  const { length: t, valueOffsets: e } = i;
  return e && yt.call(this, dn(e[0], t, e)), this.visit(i.children[0]);
}
function on(i) {
  return this.visitMany(i.type.children.map((t, e) => i.children[e]).filter(Boolean))[0];
}
$.prototype.visitBool = Lc;
$.prototype.visitInt = Zt;
$.prototype.visitFloat = Zt;
$.prototype.visitUtf8 = Wr;
$.prototype.visitBinary = Wr;
$.prototype.visitFixedSizeBinary = Zt;
$.prototype.visitDate = Zt;
$.prototype.visitTimestamp = Zt;
$.prototype.visitTime = Zt;
$.prototype.visitDecimal = Zt;
$.prototype.visitList = Dn;
$.prototype.visitStruct = on;
$.prototype.visitUnion = Dc;
$.prototype.visitInterval = Zt;
$.prototype.visitFixedSizeList = Dn;
$.prototype.visitMap = Dn;
class Gr extends Sn {
  /** @nocollapse */
  // @ts-ignore
  static throughNode(t) {
    throw new Error('"throughNode" not available in this environment');
  }
  /** @nocollapse */
  static throughDOM(t, e) {
    throw new Error('"throughDOM" not available in this environment');
  }
  constructor(t) {
    super(), this._position = 0, this._started = !1, this._sink = new ti(), this._schema = null, this._dictionaryBlocks = [], this._recordBatchBlocks = [], this._dictionaryDeltaOffsets = /* @__PURE__ */ new Map(), tt(t) || (t = { autoDestroy: !0, writeLegacyIpcFormat: !1 }), this._autoDestroy = typeof t.autoDestroy == "boolean" ? t.autoDestroy : !0, this._writeLegacyIpcFormat = typeof t.writeLegacyIpcFormat == "boolean" ? t.writeLegacyIpcFormat : !1;
  }
  toString(t = !1) {
    return this._sink.toString(t);
  }
  toUint8Array(t = !1) {
    return this._sink.toUint8Array(t);
  }
  writeAll(t) {
    return ae(t) ? t.then((e) => this.writeAll(e)) : Oe(t) ? kn(this, t) : Un(this, t);
  }
  get closed() {
    return this._sink.closed;
  }
  [Symbol.asyncIterator]() {
    return this._sink[Symbol.asyncIterator]();
  }
  toDOMStream(t) {
    return this._sink.toDOMStream(t);
  }
  toNodeStream(t) {
    return this._sink.toNodeStream(t);
  }
  close() {
    return this.reset()._sink.close();
  }
  abort(t) {
    return this.reset()._sink.abort(t);
  }
  finish() {
    return this._autoDestroy ? this.close() : this.reset(this._sink, this._schema), this;
  }
  reset(t = this._sink, e = null) {
    return t === this._sink || t instanceof ti ? this._sink = t : (this._sink = new ti(), t && Xr(t) ? this.toDOMStream({ type: "bytes" }).pipeTo(t) : t && to(t) && this.toNodeStream({ objectMode: !1 }).pipe(t)), this._started && this._schema && this._writeFooter(this._schema), this._started = !1, this._dictionaryBlocks = [], this._recordBatchBlocks = [], this._dictionaryDeltaOffsets = /* @__PURE__ */ new Map(), (!e || !en(e, this._schema)) && (e == null ? (this._position = 0, this._schema = null) : (this._started = !0, this._schema = e, this._writeSchema(e))), this;
  }
  write(t) {
    let e = null;
    if (this._sink) {
      if (t == null)
        return this.finish() && void 0;
      if (t instanceof G && !(e = t.schema))
        return this.finish() && void 0;
      if (t instanceof Z && !(e = t.schema))
        return this.finish() && void 0;
    } else
      throw new Error("RecordBatchWriter is closed");
    if (e && !en(e, this._schema)) {
      if (this._started && this._autoDestroy)
        return this.close();
      this.reset(this._sink, e);
    }
    t instanceof Z ? t instanceof Fn || this._writeRecordBatch(t) : t instanceof G ? this.writeAll(t.batches) : ze(t) && this.writeAll(t);
  }
  _writeMessage(t, e = 8) {
    const n = e - 1, s = H.encode(t), r = s.byteLength, o = this._writeLegacyIpcFormat ? 4 : 8, a = r + o + n & ~n, c = a - r - o;
    return t.headerType === D.RecordBatch ? this._recordBatchBlocks.push(new Ht(a, t.bodyLength, this._position)) : t.headerType === D.DictionaryBatch && this._dictionaryBlocks.push(new Ht(a, t.bodyLength, this._position)), this._writeLegacyIpcFormat || this._write(Int32Array.of(-1)), this._write(Int32Array.of(a - o)), r > 0 && this._write(s), this._writePadding(c);
  }
  _write(t) {
    if (this._started) {
      const e = N(t);
      e && e.byteLength > 0 && (this._sink.write(e), this._position += e.byteLength);
    }
    return this;
  }
  _writeSchema(t) {
    return this._writeMessage(H.from(t));
  }
  // @ts-ignore
  _writeFooter(t) {
    return this._writeLegacyIpcFormat ? this._write(Int32Array.of(0)) : this._write(Int32Array.of(-1, 0));
  }
  _writeMagic() {
    return this._write(Ve);
  }
  _writePadding(t) {
    return t > 0 ? this._write(new Uint8Array(t)) : this;
  }
  _writeRecordBatch(t) {
    const { byteLength: e, nodes: n, bufferRegions: s, buffers: r } = $.assemble(t), o = new at(t.numRows, n, s), a = H.from(o, e);
    return this._writeDictionaries(t)._writeMessage(a)._writeBodyBuffers(r);
  }
  _writeDictionaryBatch(t, e, n = !1) {
    this._dictionaryDeltaOffsets.set(e, t.length + (this._dictionaryDeltaOffsets.get(e) || 0));
    const { byteLength: s, nodes: r, bufferRegions: o, buffers: a } = $.assemble(new L([t])), c = new at(t.length, r, o), u = new Rt(c, e, n), d = H.from(u, s);
    return this._writeMessage(d)._writeBodyBuffers(a);
  }
  _writeBodyBuffers(t) {
    let e, n, s;
    for (let r = -1, o = t.length; ++r < o; )
      (e = t[r]) && (n = e.byteLength) > 0 && (this._write(e), (s = (n + 7 & -8) - n) > 0 && this._writePadding(s));
    return this;
  }
  _writeDictionaries(t) {
    for (let [e, n] of t.dictionaries) {
      let s = this._dictionaryDeltaOffsets.get(e) || 0;
      if (s === 0 || (n = n == null ? void 0 : n.slice(s)).length > 0)
        for (const r of n.data)
          this._writeDictionaryBatch(r, e, s > 0), s += r.length;
    }
    return this;
  }
}
class Ln extends Gr {
  /** @nocollapse */
  static writeAll(t, e) {
    const n = new Ln(e);
    return ae(t) ? t.then((s) => n.writeAll(s)) : Oe(t) ? kn(n, t) : Un(n, t);
  }
}
class Mn extends Gr {
  /** @nocollapse */
  static writeAll(t) {
    const e = new Mn();
    return ae(t) ? t.then((n) => e.writeAll(n)) : Oe(t) ? kn(e, t) : Un(e, t);
  }
  constructor() {
    super(), this._autoDestroy = !0;
  }
  // @ts-ignore
  _writeSchema(t) {
    return this._writeMagic()._writePadding(2);
  }
  _writeFooter(t) {
    const e = je.encode(new je(t, rt.V4, this._recordBatchBlocks, this._dictionaryBlocks));
    return super._writeFooter(t)._write(e)._write(Int32Array.of(e.byteLength))._writeMagic();
  }
}
function Un(i, t) {
  let e = t;
  t instanceof G && (e = t.batches, i.reset(void 0, t.schema));
  for (const n of e)
    i.write(n);
  return i.finish();
}
function kn(i, t) {
  var e, n, s, r, o, a, c;
  return p(this, void 0, void 0, function* () {
    try {
      for (e = !0, n = oe(t); s = yield n.next(), r = s.done, !r; e = !0) {
        c = s.value, e = !1;
        const u = c;
        i.write(u);
      }
    } catch (u) {
      o = { error: u };
    } finally {
      try {
        !e && !r && (a = n.return) && (yield a.call(n));
      } finally {
        if (o)
          throw o.error;
      }
    }
    return i.finish();
  });
}
function Mc(i, t = "stream") {
  return (t === "stream" ? Ln : Mn).writeAll(i).toUint8Array(!0);
}
var Uc = Object.create, qr = Object.defineProperty, kc = Object.getOwnPropertyDescriptor, Cc = Object.getOwnPropertyNames, Pc = Object.getPrototypeOf, xc = Object.prototype.hasOwnProperty, jc = (i, t) => () => (t || i((t = { exports: {} }).exports, t), t.exports), Vc = (i, t, e, n) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let s of Cc(t))
      !xc.call(i, s) && s !== e && qr(i, s, { get: () => t[s], enumerable: !(n = kc(t, s)) || n.enumerable });
  return i;
}, zc = (i, t, e) => (e = i != null ? Uc(Pc(i)) : {}, Vc(t || !i || !i.__esModule ? qr(e, "default", { value: i, enumerable: !0 }) : e, i)), $c = jc((i, t) => {
  t.exports = Worker;
}), Yc = ((i) => (i[i.UNDEFINED = 0] = "UNDEFINED", i[i.AUTOMATIC = 1] = "AUTOMATIC", i[i.READ_ONLY = 2] = "READ_ONLY", i[i.READ_WRITE = 3] = "READ_WRITE", i))(Yc || {}), Wc = ((i) => (i[i.IDENTIFIER = 0] = "IDENTIFIER", i[i.NUMERIC_CONSTANT = 1] = "NUMERIC_CONSTANT", i[i.STRING_CONSTANT = 2] = "STRING_CONSTANT", i[i.OPERATOR = 3] = "OPERATOR", i[i.KEYWORD = 4] = "KEYWORD", i[i.COMMENT = 5] = "COMMENT", i))(Wc || {}), Gc = ((i) => (i[i.NONE = 0] = "NONE", i[i.DEBUG = 1] = "DEBUG", i[i.INFO = 2] = "INFO", i[i.WARNING = 3] = "WARNING", i[i.ERROR = 4] = "ERROR", i))(Gc || {}), qc = ((i) => (i[i.NONE = 0] = "NONE", i[i.CONNECT = 1] = "CONNECT", i[i.DISCONNECT = 2] = "DISCONNECT", i[i.OPEN = 3] = "OPEN", i[i.QUERY = 4] = "QUERY", i[i.INSTANTIATE = 5] = "INSTANTIATE", i))(qc || {}), Hc = ((i) => (i[i.NONE = 0] = "NONE", i[i.OK = 1] = "OK", i[i.ERROR = 2] = "ERROR", i[i.START = 3] = "START", i[i.RUN = 4] = "RUN", i[i.CAPTURE = 5] = "CAPTURE", i))(Hc || {}), Qc = ((i) => (i[i.NONE = 0] = "NONE", i[i.WEB_WORKER = 1] = "WEB_WORKER", i[i.NODE_WORKER = 2] = "NODE_WORKER", i[i.BINDINGS = 3] = "BINDINGS", i[i.ASYNC_DUCKDB = 4] = "ASYNC_DUCKDB", i))(Qc || {}), Kc = class {
  log(i) {
  }
}, Jc = ((i) => (i[i.SUCCESS = 0] = "SUCCESS", i))(Jc || {}), Zc = class {
  constructor(i, t) {
    this._bindings = i, this._conn = t;
  }
  get bindings() {
    return this._bindings;
  }
  async close() {
    return this._bindings.disconnect(this._conn);
  }
  useUnsafe(i) {
    return i(this._bindings, this._conn);
  }
  async query(i) {
    this._bindings.logger.log({ timestamp: /* @__PURE__ */ new Date(), level: 2, origin: 4, topic: 4, event: 4, value: i });
    let t = await this._bindings.runQuery(this._conn, i), e = ht.from(t);
    return console.assert(e.isSync(), "Reader is not sync"), console.assert(e.isFile(), "Reader is not file"), new G(e);
  }
  async send(i) {
    this._bindings.logger.log({ timestamp: /* @__PURE__ */ new Date(), level: 2, origin: 4, topic: 4, event: 4, value: i });
    let t = await this._bindings.startPendingQuery(this._conn, i);
    for (; t == null; )
      t = await this._bindings.pollPendingQuery(this._conn);
    let e = new Hr(this._bindings, this._conn, t), n = await ht.from(e);
    return console.assert(n.isAsync()), console.assert(n.isStream()), n;
  }
  async cancelSent() {
    return await this._bindings.cancelPendingQuery(this._conn);
  }
  async getTableNames(i) {
    return await this._bindings.getTableNames(this._conn, i);
  }
  async prepare(i) {
    let t = await this._bindings.createPrepared(this._conn, i);
    return new Xc(this._bindings, this._conn, t);
  }
  async insertArrowTable(i, t) {
    let e = Mc(i, "stream");
    await this.insertArrowFromIPCStream(e, t);
  }
  async insertArrowFromIPCStream(i, t) {
    await this._bindings.insertArrowFromIPCStream(this._conn, i, t);
  }
  async insertCSVFromPath(i, t) {
    await this._bindings.insertCSVFromPath(this._conn, i, t);
  }
  async insertJSONFromPath(i, t) {
    await this._bindings.insertJSONFromPath(this._conn, i, t);
  }
}, Hr = class {
  constructor(i, t, e) {
    this.db = i, this.conn = t, this.header = e, this._first = !0, this._depleted = !1, this._inFlight = null;
  }
  async next() {
    if (this._first)
      return this._first = !1, { done: !1, value: this.header };
    if (this._depleted)
      return { done: !0, value: null };
    let i;
    return this._inFlight != null ? (i = await this._inFlight, this._inFlight = null) : i = await this.db.fetchQueryResults(this.conn), this._depleted = i.length == 0, this._depleted || (this._inFlight = this.db.fetchQueryResults(this.conn)), { done: this._depleted, value: i };
  }
  [Symbol.asyncIterator]() {
    return this;
  }
}, Xc = class {
  constructor(i, t, e) {
    this.bindings = i, this.connectionId = t, this.statementId = e;
  }
  async close() {
    await this.bindings.closePrepared(this.connectionId, this.statementId);
  }
  async query(...i) {
    let t = await this.bindings.runPrepared(this.connectionId, this.statementId, i), e = ht.from(t);
    return console.assert(e.isSync()), console.assert(e.isFile()), new G(e);
  }
  async send(...i) {
    let t = await this.bindings.sendPrepared(this.connectionId, this.statementId, i), e = new Hr(this.bindings, this.connectionId, t), n = await ht.from(e);
    return console.assert(n.isAsync()), console.assert(n.isStream()), n;
  }
}, tl = ((i) => (i.CANCEL_PENDING_QUERY = "CANCEL_PENDING_QUERY", i.CLOSE_PREPARED = "CLOSE_PREPARED", i.COLLECT_FILE_STATISTICS = "COLLECT_FILE_STATISTICS", i.CONNECT = "CONNECT", i.COPY_FILE_TO_BUFFER = "COPY_FILE_TO_BUFFER", i.COPY_FILE_TO_PATH = "COPY_FILE_TO_PATH", i.CREATE_PREPARED = "CREATE_PREPARED", i.DISCONNECT = "DISCONNECT", i.DROP_FILE = "DROP_FILE", i.DROP_FILES = "DROP_FILES", i.EXPORT_FILE_STATISTICS = "EXPORT_FILE_STATISTICS", i.FETCH_QUERY_RESULTS = "FETCH_QUERY_RESULTS", i.FLUSH_FILES = "FLUSH_FILES", i.GET_FEATURE_FLAGS = "GET_FEATURE_FLAGS", i.GET_TABLE_NAMES = "GET_TABLE_NAMES", i.GET_VERSION = "GET_VERSION", i.GLOB_FILE_INFOS = "GLOB_FILE_INFOS", i.INSERT_ARROW_FROM_IPC_STREAM = "INSERT_ARROW_FROM_IPC_STREAM", i.INSERT_CSV_FROM_PATH = "IMPORT_CSV_FROM_PATH", i.INSERT_JSON_FROM_PATH = "IMPORT_JSON_FROM_PATH", i.INSTANTIATE = "INSTANTIATE", i.OPEN = "OPEN", i.PING = "PING", i.POLL_PENDING_QUERY = "POLL_PENDING_QUERY", i.REGISTER_FILE_BUFFER = "REGISTER_FILE_BUFFER", i.REGISTER_FILE_HANDLE = "REGISTER_FILE_HANDLE", i.REGISTER_FILE_URL = "REGISTER_FILE_URL", i.RESET = "RESET", i.RUN_PREPARED = "RUN_PREPARED", i.RUN_QUERY = "RUN_QUERY", i.SEND_PREPARED = "SEND_PREPARED", i.START_PENDING_QUERY = "START_PENDING_QUERY", i.TOKENIZE = "TOKENIZE", i))(tl || {}), el = ((i) => (i.CONNECTION_INFO = "CONNECTION_INFO", i.ERROR = "ERROR", i.FEATURE_FLAGS = "FEATURE_FLAGS", i.FILE_BUFFER = "FILE_BUFFER", i.FILE_INFOS = "FILE_INFOS", i.FILE_SIZE = "FILE_SIZE", i.FILE_STATISTICS = "FILE_STATISTICS", i.INSTANTIATE_PROGRESS = "INSTANTIATE_PROGRESS", i.LOG = "LOG", i.OK = "OK", i.PREPARED_STATEMENT_ID = "PREPARED_STATEMENT_ID", i.QUERY_PLAN = "QUERY_PLAN", i.QUERY_RESULT = "QUERY_RESULT", i.QUERY_RESULT_CHUNK = "QUERY_RESULT_CHUNK", i.QUERY_RESULT_HEADER = "QUERY_RESULT_HEADER", i.QUERY_RESULT_HEADER_OR_NULL = "QUERY_RESULT_HEADER_OR_NULL", i.REGISTERED_FILE = "REGISTERED_FILE", i.SCRIPT_TOKENS = "SCRIPT_TOKENS", i.SUCCESS = "SUCCESS", i.TABLE_NAMES = "TABLE_NAMES", i.VERSION_STRING = "VERSION_STRING", i))(el || {}), O = class {
  constructor(i, t) {
    this.promiseResolver = () => {
    }, this.promiseRejecter = () => {
    }, this.type = i, this.data = t, this.promise = new Promise((e, n) => {
      this.promiseResolver = e, this.promiseRejecter = n;
    });
  }
};
function ni(i) {
  switch (i.typeId) {
    case l.Binary:
      return { sqlType: "binary" };
    case l.Bool:
      return { sqlType: "bool" };
    case l.Date:
      return { sqlType: "date" };
    case l.DateDay:
      return { sqlType: "date32[d]" };
    case l.DateMillisecond:
      return { sqlType: "date64[ms]" };
    case l.Decimal: {
      let t = i;
      return { sqlType: "decimal", precision: t.precision, scale: t.scale };
    }
    case l.Float:
      return { sqlType: "float" };
    case l.Float16:
      return { sqlType: "float16" };
    case l.Float32:
      return { sqlType: "float32" };
    case l.Float64:
      return { sqlType: "float64" };
    case l.Int:
      return { sqlType: "int32" };
    case l.Int16:
      return { sqlType: "int16" };
    case l.Int32:
      return { sqlType: "int32" };
    case l.Int64:
      return { sqlType: "int64" };
    case l.Uint16:
      return { sqlType: "uint16" };
    case l.Uint32:
      return { sqlType: "uint32" };
    case l.Uint64:
      return { sqlType: "uint64" };
    case l.Uint8:
      return { sqlType: "uint8" };
    case l.IntervalDayTime:
      return { sqlType: "interval[dt]" };
    case l.IntervalYearMonth:
      return { sqlType: "interval[m]" };
    case l.List:
      return { sqlType: "list", valueType: ni(i.valueType) };
    case l.FixedSizeBinary:
      return { sqlType: "fixedsizebinary", byteWidth: i.byteWidth };
    case l.Null:
      return { sqlType: "null" };
    case l.Utf8:
      return { sqlType: "utf8" };
    case l.Struct:
      return { sqlType: "struct", fields: i.children.map((t) => an(t.name, t.type)) };
    case l.Map: {
      let t = i;
      return { sqlType: "map", keyType: ni(t.keyType), valueType: ni(t.valueType) };
    }
    case l.Time:
      return { sqlType: "time[s]" };
    case l.TimeMicrosecond:
      return { sqlType: "time[us]" };
    case l.TimeMillisecond:
      return { sqlType: "time[ms]" };
    case l.TimeNanosecond:
      return { sqlType: "time[ns]" };
    case l.TimeSecond:
      return { sqlType: "time[s]" };
    case l.Timestamp:
      return { sqlType: "timestamp", timezone: i.timezone || void 0 };
    case l.TimestampSecond:
      return { sqlType: "timestamp[s]", timezone: i.timezone || void 0 };
    case l.TimestampMicrosecond:
      return { sqlType: "timestamp[us]", timezone: i.timezone || void 0 };
    case l.TimestampNanosecond:
      return { sqlType: "timestamp[ns]", timezone: i.timezone || void 0 };
    case l.TimestampMillisecond:
      return { sqlType: "timestamp[ms]", timezone: i.timezone || void 0 };
  }
  throw new Error("unsupported arrow type: ".concat(i.toString()));
}
function an(i, t) {
  let e = ni(t);
  return e.name = i, e;
}
var il = new TextEncoder(), nl = class {
  constructor(i, t = null) {
    this._onInstantiationProgress = [], this._worker = null, this._workerShutdownPromise = null, this._workerShutdownResolver = () => {
    }, this._nextMessageId = 0, this._pendingRequests = /* @__PURE__ */ new Map(), this._logger = i, this._onMessageHandler = this.onMessage.bind(this), this._onErrorHandler = this.onError.bind(this), this._onCloseHandler = this.onClose.bind(this), t != null && this.attach(t);
  }
  get logger() {
    return this._logger;
  }
  attach(i) {
    this._worker = i, this._worker.addEventListener("message", this._onMessageHandler), this._worker.addEventListener("error", this._onErrorHandler), this._worker.addEventListener("close", this._onCloseHandler), this._workerShutdownPromise = new Promise((t, e) => {
      this._workerShutdownResolver = t;
    });
  }
  detach() {
    this._worker && (this._worker.removeEventListener("message", this._onMessageHandler), this._worker.removeEventListener("error", this._onErrorHandler), this._worker.removeEventListener("close", this._onCloseHandler), this._worker = null, this._workerShutdownResolver(null), this._workerShutdownPromise = null, this._workerShutdownResolver = () => {
    });
  }
  async terminate() {
    this._worker && (this._worker.terminate(), this._worker = null, this._workerShutdownPromise = null, this._workerShutdownResolver = () => {
    });
  }
  async postTask(i, t = []) {
    if (!this._worker) {
      console.error("cannot send a message since the worker is not set!");
      return;
    }
    let e = this._nextMessageId++;
    return this._pendingRequests.set(e, i), this._worker.postMessage({ messageId: e, type: i.type, data: i.data }, t), await i.promise;
  }
  onMessage(i) {
    var t;
    let e = i.data;
    switch (e.type) {
      case "LOG": {
        this._logger.log(e.data);
        return;
      }
      case "INSTANTIATE_PROGRESS": {
        for (let s of this._onInstantiationProgress)
          s(e.data);
        return;
      }
    }
    let n = this._pendingRequests.get(e.requestId);
    if (!n) {
      console.warn("unassociated response: [".concat(e.requestId, ", ").concat(e.type.toString(), "]"));
      return;
    }
    if (this._pendingRequests.delete(e.requestId), e.type == "ERROR") {
      let s = new Error(e.data.message);
      s.name = e.data.name, (t = Object.getOwnPropertyDescriptor(s, "stack")) != null && t.writable && (s.stack = e.data.stack), n.promiseRejecter(s);
      return;
    }
    switch (n.type) {
      case "CLOSE_PREPARED":
      case "COLLECT_FILE_STATISTICS":
      case "COPY_FILE_TO_PATH":
      case "DISCONNECT":
      case "DROP_FILE":
      case "DROP_FILES":
      case "FLUSH_FILES":
      case "INSERT_ARROW_FROM_IPC_STREAM":
      case "IMPORT_CSV_FROM_PATH":
      case "IMPORT_JSON_FROM_PATH":
      case "OPEN":
      case "PING":
      case "REGISTER_FILE_BUFFER":
      case "REGISTER_FILE_HANDLE":
      case "REGISTER_FILE_URL":
      case "RESET":
        if (e.type == "OK") {
          n.promiseResolver(e.data);
          return;
        }
        break;
      case "INSTANTIATE":
        if (this._onInstantiationProgress = [], e.type == "OK") {
          n.promiseResolver(e.data);
          return;
        }
        break;
      case "GLOB_FILE_INFOS":
        if (e.type == "FILE_INFOS") {
          n.promiseResolver(e.data);
          return;
        }
        break;
      case "GET_VERSION":
        if (e.type == "VERSION_STRING") {
          n.promiseResolver(e.data);
          return;
        }
        break;
      case "GET_FEATURE_FLAGS":
        if (e.type == "FEATURE_FLAGS") {
          n.promiseResolver(e.data);
          return;
        }
        break;
      case "GET_TABLE_NAMES":
        if (e.type == "TABLE_NAMES") {
          n.promiseResolver(e.data);
          return;
        }
        break;
      case "TOKENIZE":
        if (e.type == "SCRIPT_TOKENS") {
          n.promiseResolver(e.data);
          return;
        }
        break;
      case "COPY_FILE_TO_BUFFER":
        if (e.type == "FILE_BUFFER") {
          n.promiseResolver(e.data);
          return;
        }
        break;
      case "EXPORT_FILE_STATISTICS":
        if (e.type == "FILE_STATISTICS") {
          n.promiseResolver(e.data);
          return;
        }
        break;
      case "CONNECT":
        if (e.type == "CONNECTION_INFO") {
          n.promiseResolver(e.data);
          return;
        }
        break;
      case "RUN_PREPARED":
      case "RUN_QUERY":
        if (e.type == "QUERY_RESULT") {
          n.promiseResolver(e.data);
          return;
        }
        break;
      case "SEND_PREPARED":
        if (e.type == "QUERY_RESULT_HEADER") {
          n.promiseResolver(e.data);
          return;
        }
        break;
      case "START_PENDING_QUERY":
        if (e.type == "QUERY_RESULT_HEADER_OR_NULL") {
          n.promiseResolver(e.data);
          return;
        }
        break;
      case "POLL_PENDING_QUERY":
        if (e.type == "QUERY_RESULT_HEADER_OR_NULL") {
          n.promiseResolver(e.data);
          return;
        }
        break;
      case "CANCEL_PENDING_QUERY":
        if (this._onInstantiationProgress = [], e.type == "SUCCESS") {
          n.promiseResolver(e.data);
          return;
        }
        break;
      case "FETCH_QUERY_RESULTS":
        if (e.type == "QUERY_RESULT_CHUNK") {
          n.promiseResolver(e.data);
          return;
        }
        break;
      case "CREATE_PREPARED":
        if (e.type == "PREPARED_STATEMENT_ID") {
          n.promiseResolver(e.data);
          return;
        }
        break;
    }
    n.promiseRejecter(new Error("unexpected response type: ".concat(e.type.toString())));
  }
  onError(i) {
    console.error(i), console.error("error in duckdb worker: ".concat(i.message)), this._pendingRequests.clear();
  }
  onClose() {
    if (this._workerShutdownResolver(null), this._pendingRequests.size != 0) {
      console.warn("worker terminated with ".concat(this._pendingRequests.size, " pending requests"));
      return;
    }
    this._pendingRequests.clear();
  }
  async reset() {
    let i = new O("RESET", null);
    return await this.postTask(i);
  }
  async ping() {
    let i = new O("PING", null);
    await this.postTask(i);
  }
  async dropFile(i) {
    let t = new O("DROP_FILE", i);
    return await this.postTask(t);
  }
  async dropFiles() {
    let i = new O("DROP_FILES", null);
    return await this.postTask(i);
  }
  async flushFiles() {
    let i = new O("FLUSH_FILES", null);
    return await this.postTask(i);
  }
  async instantiate(i, t = null, e = (n) => {
  }) {
    this._onInstantiationProgress.push(e);
    let n = new O("INSTANTIATE", [i, t]);
    return await this.postTask(n);
  }
  async getVersion() {
    let i = new O("GET_VERSION", null);
    return await this.postTask(i);
  }
  async getFeatureFlags() {
    let i = new O("GET_FEATURE_FLAGS", null);
    return await this.postTask(i);
  }
  async open(i) {
    let t = new O("OPEN", i);
    await this.postTask(t);
  }
  async tokenize(i) {
    let t = new O("TOKENIZE", i);
    return await this.postTask(t);
  }
  async connectInternal() {
    let i = new O("CONNECT", null);
    return await this.postTask(i);
  }
  async connect() {
    let i = await this.connectInternal();
    return new Zc(this, i);
  }
  async disconnect(i) {
    let t = new O("DISCONNECT", i);
    await this.postTask(t);
  }
  async runQuery(i, t) {
    let e = new O("RUN_QUERY", [i, t]);
    return await this.postTask(e);
  }
  async startPendingQuery(i, t) {
    let e = new O("START_PENDING_QUERY", [i, t]);
    return await this.postTask(e);
  }
  async pollPendingQuery(i) {
    let t = new O("POLL_PENDING_QUERY", i);
    return await this.postTask(t);
  }
  async cancelPendingQuery(i) {
    let t = new O("CANCEL_PENDING_QUERY", i);
    return await this.postTask(t);
  }
  async fetchQueryResults(i) {
    let t = new O("FETCH_QUERY_RESULTS", i);
    return await this.postTask(t);
  }
  async getTableNames(i, t) {
    let e = new O("GET_TABLE_NAMES", [i, t]);
    return await this.postTask(e);
  }
  async createPrepared(i, t) {
    let e = new O("CREATE_PREPARED", [i, t]);
    return await this.postTask(e);
  }
  async closePrepared(i, t) {
    let e = new O("CLOSE_PREPARED", [i, t]);
    await this.postTask(e);
  }
  async runPrepared(i, t, e) {
    let n = new O("RUN_PREPARED", [i, t, e]);
    return await this.postTask(n);
  }
  async sendPrepared(i, t, e) {
    let n = new O("SEND_PREPARED", [i, t, e]);
    return await this.postTask(n);
  }
  async globFiles(i) {
    let t = new O("GLOB_FILE_INFOS", i);
    return await this.postTask(t);
  }
  async registerFileText(i, t) {
    let e = il.encode(t);
    await this.registerFileBuffer(i, e);
  }
  async registerFileURL(i, t, e, n) {
    t === void 0 && (t = i);
    let s = new O("REGISTER_FILE_URL", [i, t, e, n]);
    await this.postTask(s);
  }
  async registerEmptyFileBuffer(i) {
    let t = new O("REGISTER_FILE_BUFFER", [i, new Uint8Array()]);
    await this.postTask(t);
  }
  async registerFileBuffer(i, t) {
    let e = new O("REGISTER_FILE_BUFFER", [i, t]);
    await this.postTask(e, [t.buffer]);
  }
  async registerFileHandle(i, t, e, n) {
    let s = new O("REGISTER_FILE_HANDLE", [i, t, e, n]);
    await this.postTask(s, []);
  }
  async collectFileStatistics(i, t) {
    let e = new O("COLLECT_FILE_STATISTICS", [i, t]);
    await this.postTask(e, []);
  }
  async exportFileStatistics(i) {
    let t = new O("EXPORT_FILE_STATISTICS", i);
    return await this.postTask(t, []);
  }
  async copyFileToBuffer(i) {
    let t = new O("COPY_FILE_TO_BUFFER", i);
    return await this.postTask(t);
  }
  async copyFileToPath(i, t) {
    let e = new O("COPY_FILE_TO_PATH", [i, t]);
    await this.postTask(e);
  }
  async insertArrowFromIPCStream(i, t, e) {
    if (t.length == 0)
      return;
    let n = new O("INSERT_ARROW_FROM_IPC_STREAM", [i, t, e]);
    await this.postTask(n, [t.buffer]);
  }
  async insertCSVFromPath(i, t, e) {
    if (e.columns !== void 0) {
      let s = [];
      for (let r in e.columns) {
        let o = e.columns[r];
        s.push(an(r, o));
      }
      e.columnsFlat = s, delete e.columns;
    }
    let n = new O("IMPORT_CSV_FROM_PATH", [i, t, e]);
    await this.postTask(n);
  }
  async insertJSONFromPath(i, t, e) {
    if (e.columns !== void 0) {
      let s = [];
      for (let r in e.columns) {
        let o = e.columns[r];
        s.push(an(r, o));
      }
      e.columnsFlat = s, delete e.columns;
    }
    let n = new O("IMPORT_JSON_FROM_PATH", [i, t, e]);
    await this.postTask(n);
  }
}, sl = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 3, 1, 0, 1, 10, 14, 1, 12, 0, 65, 0, 65, 0, 65, 0, 252, 10, 0, 0, 11])), rl = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 8, 1, 6, 0, 6, 64, 25, 11, 11])), ol = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11])), al = () => (async (i) => {
  try {
    return typeof MessageChannel < "u" && new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)), WebAssembly.validate(i);
  } catch {
    return !1;
  }
})(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 4, 1, 3, 1, 1, 10, 11, 1, 9, 0, 65, 0, 254, 16, 2, 0, 26, 11])), cl = { name: "@duckdb/duckdb-wasm", version: "1.27.1-dev125.0", description: "DuckDB powered by WebAssembly", license: "MIT", repository: { type: "git", url: "https://github.com/duckdb/duckdb-wasm.git" }, keywords: ["sql", "duckdb", "relational", "database", "data", "query", "wasm", "analytics", "olap", "arrow", "parquet", "json", "csv"], dependencies: { "apache-arrow": "^13.0.0" }, devDependencies: { "@types/emscripten": "^1.39.7", "@types/jasmine": "^4.3.1", "@typescript-eslint/eslint-plugin": "^6.5.0", "@typescript-eslint/parser": "^6.7.2", esbuild: "^0.18.13", eslint: "^8.50.0", "eslint-plugin-jasmine": "^4.1.3", "eslint-plugin-react": "^7.33.2", "fast-glob": "^3.3.1", jasmine: "^5.1.0", "jasmine-core": "^5.0.0", "jasmine-spec-reporter": "^7.0.0", "js-sha256": "^0.9.0", karma: "^6.4.2", "karma-chrome-launcher": "^3.2.0", "karma-coverage": "^2.2.1", "karma-firefox-launcher": "^2.1.2", "karma-jasmine": "^5.1.0", "karma-jasmine-html-reporter": "^2.1.0", "karma-sourcemap-loader": "^0.4.0", "karma-spec-reporter": "^0.0.36", "make-dir": "^4.0.0", nyc: "^15.1.0", prettier: "^3.0.2", puppeteer: "^21.1.1", rimraf: "^5.0.1", s3rver: "^3.7.1", typedoc: "^0.25.0", typescript: "^5.1.6", "wasm-feature-detect": "^1.5.1", "web-worker": "^1.2.0" }, scripts: { "build:debug": "node bundle.mjs debug && tsc --emitDeclarationOnly", "build:release": "node bundle.mjs release && tsc --emitDeclarationOnly", docs: "typedoc", report: "node ./coverage.mjs", "test:node": "node --enable-source-maps ../../node_modules/jasmine/bin/jasmine ./dist/tests-node.cjs", "test:node:debug": "node --inspect-brk --enable-source-maps ../../node_modules/jasmine/bin/jasmine ./dist/tests-node.cjs", "test:node:coverage": "nyc -r json --report-dir ./coverage/node node ../../node_modules/jasmine/bin/jasmine ./dist/tests-node.cjs", "test:firefox": "karma start ./karma/tests-firefox.cjs", "test:chrome": "karma start ./karma/tests-chrome.cjs", "test:chrome:eh": "karma start ./karma/tests-chrome-eh.cjs", "test:chrome:coverage": "karma start ./karma/tests-chrome-coverage.cjs", "test:browser": "karma start ./karma/tests-all.cjs", "test:browser:debug": "karma start ./karma/tests-debug.cjs", test: "npm run test:chrome && npm run test:node", "test:coverage": "npm run test:chrome:coverage && npm run test:node:coverage && npm run report", lint: "eslint src test" }, files: ["dist", "!dist/types/test"], main: "dist/duckdb-browser.cjs", module: "dist/duckdb-browser.mjs", types: "dist/duckdb-browser.d.ts", jsdelivr: "dist/duckdb-browser.cjs", unpkg: "dist/duckdb-browser.mjs", sideEffects: !1, browser: { fs: !1, path: !1, perf_hooks: !1, os: !1, worker_threads: !1 }, exports: { "./dist/duckdb-mvp.wasm": "./dist/duckdb-mvp.wasm", "./dist/duckdb-eh.wasm": "./dist/duckdb-eh.wasm", "./dist/duckdb-coi.wasm": "./dist/duckdb-coi.wasm", "./dist/duckdb-browser": "./dist/duckdb-browser.mjs", "./dist/duckdb-browser.cjs": "./dist/duckdb-browser.cjs", "./dist/duckdb-browser.mjs": "./dist/duckdb-browser.mjs", "./dist/duckdb-browser-blocking": "./dist/duckdb-browser-blocking.mjs", "./dist/duckdb-browser-blocking.mjs": "./dist/duckdb-browser-blocking.mjs", "./dist/duckdb-browser-blocking.cjs": "./dist/duckdb-browser-blocking.cjs", "./dist/duckdb-browser-coi.pthread.worker.js": "./dist/duckdb-browser-coi.pthread.worker.js", "./dist/duckdb-browser-coi.worker.js": "./dist/duckdb-browser-coi.worker.js", "./dist/duckdb-browser-eh.worker.js": "./dist/duckdb-browser-eh.worker.js", "./dist/duckdb-browser-mvp.worker.js": "./dist/duckdb-browser-mvp.worker.js", "./dist/duckdb-node": "./dist/duckdb-node.cjs", "./dist/duckdb-node.cjs": "./dist/duckdb-node.cjs", "./dist/duckdb-node-blocking": "./dist/duckdb-node-blocking.cjs", "./dist/duckdb-node-blocking.cjs": "./dist/duckdb-node-blocking.cjs", "./dist/duckdb-node-eh.worker.cjs": "./dist/duckdb-node-eh.worker.cjs", "./dist/duckdb-node-mvp.worker.cjs": "./dist/duckdb-node-mvp.worker.cjs", "./blocking": { browser: { types: "./dist/duckdb-browser-blocking.d.ts", import: "./dist/duckdb-browser-blocking.mjs", require: "./dist/duckdb-browser-blocking.cjs" }, node: { types: "./dist/duckdb-node-blocking.d.ts", require: "./dist/duckdb-node-blocking.cjs", import: "./dist/duckdb-node-blocking.cjs" }, types: "./dist/duckdb-browser-blocking.d.ts", import: "./dist/duckdb-browser-blocking.mjs", require: "./dist/duckdb-browser-blocking.cjs" }, ".": { browser: { types: "./dist/duckdb-browser.d.ts", import: "./dist/duckdb-browser.mjs", require: "./dist/duckdb-browser.cjs" }, node: { types: "./dist/duckdb-node.d.ts", import: "./dist/duckdb-node.cjs", require: "./dist/duckdb-node.cjs" }, types: "./dist/duckdb-browser.d.ts", import: "./dist/duckdb-browser.mjs", require: "./dist/duckdb-browser.cjs" } } }, Cn = cl.version.split(".");
Cn[0];
Cn[1];
Cn[2];
var ll = () => typeof navigator > "u", $i = null, Yi = null, Wi = null, Gi = null, qi = null;
async function ul() {
  return $i == null && ($i = typeof BigInt64Array < "u"), Yi == null && (Yi = await rl()), Wi == null && (Wi = await al()), Gi == null && (Gi = await ol()), qi == null && (qi = await sl()), { bigInt64Array: $i, crossOriginIsolated: ll() || globalThis.crossOriginIsolated || !1, wasmExceptions: Yi, wasmSIMD: Gi, wasmThreads: Wi, wasmBulkMemory: qi };
}
zc($c());
function dl() {
  let i = new TextDecoder();
  return (t) => (typeof SharedArrayBuffer < "u" && t.buffer instanceof SharedArrayBuffer && (t = new Uint8Array(t)), i.decode(t));
}
dl();
var hl = ((i) => (i[i.BUFFER = 0] = "BUFFER", i[i.NODE_FS = 1] = "NODE_FS", i[i.BROWSER_FILEREADER = 2] = "BROWSER_FILEREADER", i[i.BROWSER_FSACCESS = 3] = "BROWSER_FSACCESS", i[i.HTTP = 4] = "HTTP", i[i.S3 = 5] = "S3", i))(hl || {});
(async () => {
  var f;
  const i = await ul().then((T) => T.wasmExceptions);
  window.spr || (window.spr = {});
  let t = (
    // @ts-ignore
    ((f = window.spr) == null ? void 0 : f.manifest_url) ?? "https://f004.backblazeb2.com/file/sprocket-artifacts/public/pages/assets/manifest.json"
  ), e = () => {
  };
  window.spr.ready = new Promise((T) => e = T);
  const n = i ? {
    mainModule: (await import("./duckdb-eh-0d3e0feb.js")).default,
    mainWorker: (await import("./duckdb-browser-eh.worker-753c388e.js")).default
  } : {
    mainModule: (await import("./duckdb-mvp-4447d8d2.js")).default,
    mainWorker: (await import("./duckdb-browser-mvp.worker-8844c23b.js")).default
  }, s = new Kc(), r = new n.mainWorker(), o = new nl(s, r);
  await o.instantiate(n.mainModule);
  const a = await o.connect(), c = await fetch(t).then((T) => T.json());
  let u = 0;
  for (; !Object.values(c).every((T) => typeof T == "string") && u++ < 1e4; )
    for (const [T, j] of Object.entries(c))
      if (typeof j == "object")
        for (const [Vt, le] of Object.entries(j))
          c[[T, Vt].join("_")] = le, delete j[Vt];
  const d = {};
  for (const [T, j] of Object.entries(c)) {
    if (typeof j == "object") {
      delete c[T];
      continue;
    }
    await a.query(
      `CREATE VIEW ${T} AS (SELECT * FROM read_parquet('${j}'));`
    ), d[T] = Object.fromEntries(
      await a.query(`DESCRIBE ${T}`).then(
        (Vt) => Vt.toArray().map((le) => [
          le.column_name,
          le.column_type
        ])
      )
    ), console.debug(`Created ddb view "${T}"`);
  }
  const h = {
    query: (T) => a.query(T).then((j) => JSON.parse(j.toString())),
    schema: d
  };
  window.spr.query = h.query, window.spr.schema = h.schema, e();
})();
