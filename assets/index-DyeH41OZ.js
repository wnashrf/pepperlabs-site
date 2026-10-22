function cf(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const i in r)
        if (i !== "default" && !(i in e)) {
          const l = Object.getOwnPropertyDescriptor(r, i);
          l &&
            Object.defineProperty(
              e,
              i,
              l.get ? l : { enumerable: !0, get: () => r[i] },
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
  );
}
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver((i) => {
    for (const l of i)
      if (l.type === "childList")
        for (const a of l.addedNodes)
          a.tagName === "LINK" && a.rel === "modulepreload" && r(a);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(i) {
    const l = {};
    return (
      i.integrity && (l.integrity = i.integrity),
      i.referrerPolicy && (l.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (l.credentials = "include")
        : i.crossOrigin === "anonymous"
          ? (l.credentials = "omit")
          : (l.credentials = "same-origin"),
      l
    );
  }
  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const l = n(i);
    fetch(i.href, l);
  }
})();
function Vo(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var df = { exports: {} },
  Sa = {},
  ff = { exports: {} },
  re = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Fi = Symbol.for("react.element"),
  Oh = Symbol.for("react.portal"),
  Ih = Symbol.for("react.fragment"),
  Ah = Symbol.for("react.strict_mode"),
  zh = Symbol.for("react.profiler"),
  Fh = Symbol.for("react.provider"),
  Bh = Symbol.for("react.context"),
  Uh = Symbol.for("react.forward_ref"),
  Hh = Symbol.for("react.suspense"),
  Vh = Symbol.for("react.memo"),
  Wh = Symbol.for("react.lazy"),
  hc = Symbol.iterator;
function $h(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (hc && e[hc]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var pf = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  mf = Object.assign,
  hf = {};
function Or(e, t, n) {
  ((this.props = e),
    (this.context = t),
    (this.refs = hf),
    (this.updater = n || pf));
}
Or.prototype.isReactComponent = {};
Or.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
Or.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function gf() {}
gf.prototype = Or.prototype;
function Wo(e, t, n) {
  ((this.props = e),
    (this.context = t),
    (this.refs = hf),
    (this.updater = n || pf));
}
var $o = (Wo.prototype = new gf());
$o.constructor = Wo;
mf($o, Or.prototype);
$o.isPureReactComponent = !0;
var gc = Array.isArray,
  vf = Object.prototype.hasOwnProperty,
  Go = { current: null },
  xf = { key: !0, ref: !0, __self: !0, __source: !0 };
function yf(e, t, n) {
  var r,
    i = {},
    l = null,
    a = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (a = t.ref),
    t.key !== void 0 && (l = "" + t.key),
    t))
      vf.call(t, r) && !xf.hasOwnProperty(r) && (i[r] = t[r]);
  var s = arguments.length - 2;
  if (s === 1) i.children = n;
  else if (1 < s) {
    for (var o = Array(s), c = 0; c < s; c++) o[c] = arguments[c + 2];
    i.children = o;
  }
  if (e && e.defaultProps)
    for (r in ((s = e.defaultProps), s)) i[r] === void 0 && (i[r] = s[r]);
  return {
    $$typeof: Fi,
    type: e,
    key: l,
    ref: a,
    props: i,
    _owner: Go.current,
  };
}
function Gh(e, t) {
  return {
    $$typeof: Fi,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function Ko(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Fi;
}
function Kh(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var vc = /\/+/g;
function Ka(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? Kh("" + e.key)
    : t.toString(36);
}
function Tl(e, t, n, r, i) {
  var l = typeof e;
  (l === "undefined" || l === "boolean") && (e = null);
  var a = !1;
  if (e === null) a = !0;
  else
    switch (l) {
      case "string":
      case "number":
        a = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case Fi:
          case Oh:
            a = !0;
        }
    }
  if (a)
    return (
      (a = e),
      (i = i(a)),
      (e = r === "" ? "." + Ka(a, 0) : r),
      gc(i)
        ? ((n = ""),
          e != null && (n = e.replace(vc, "$&/") + "/"),
          Tl(i, t, n, "", function (c) {
            return c;
          }))
        : i != null &&
          (Ko(i) &&
            (i = Gh(
              i,
              n +
                (!i.key || (a && a.key === i.key)
                  ? ""
                  : ("" + i.key).replace(vc, "$&/") + "/") +
                e,
            )),
          t.push(i)),
      1
    );
  if (((a = 0), (r = r === "" ? "." : r + ":"), gc(e)))
    for (var s = 0; s < e.length; s++) {
      l = e[s];
      var o = r + Ka(l, s);
      a += Tl(l, t, n, o, i);
    }
  else if (((o = $h(e)), typeof o == "function"))
    for (e = o.call(e), s = 0; !(l = e.next()).done; )
      ((l = l.value), (o = r + Ka(l, s++)), (a += Tl(l, t, n, o, i)));
  else if (l === "object")
    throw (
      (t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead.",
      )
    );
  return a;
}
function tl(e, t, n) {
  if (e == null) return e;
  var r = [],
    i = 0;
  return (
    Tl(e, r, "", "", function (l) {
      return t.call(n, l, i++);
    }),
    r
  );
}
function Yh(e) {
  if (e._status === -1) {
    var t = e._result;
    ((t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        },
      ),
      e._status === -1 && ((e._status = 0), (e._result = t)));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Xe = { current: null },
  El = { transition: null },
  Qh = {
    ReactCurrentDispatcher: Xe,
    ReactCurrentBatchConfig: El,
    ReactCurrentOwner: Go,
  };
function wf() {
  throw Error("act(...) is not supported in production builds of React.");
}
re.Children = {
  map: tl,
  forEach: function (e, t, n) {
    tl(
      e,
      function () {
        t.apply(this, arguments);
      },
      n,
    );
  },
  count: function (e) {
    var t = 0;
    return (
      tl(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      tl(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!Ko(e))
      throw Error(
        "React.Children.only expected to receive a single React element child.",
      );
    return e;
  },
};
re.Component = Or;
re.Fragment = Ih;
re.Profiler = zh;
re.PureComponent = Wo;
re.StrictMode = Ah;
re.Suspense = Hh;
re.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Qh;
re.act = wf;
re.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        ".",
    );
  var r = mf({}, e.props),
    i = e.key,
    l = e.ref,
    a = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((l = t.ref), (a = Go.current)),
      t.key !== void 0 && (i = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var s = e.type.defaultProps;
    for (o in t)
      vf.call(t, o) &&
        !xf.hasOwnProperty(o) &&
        (r[o] = t[o] === void 0 && s !== void 0 ? s[o] : t[o]);
  }
  var o = arguments.length - 2;
  if (o === 1) r.children = n;
  else if (1 < o) {
    s = Array(o);
    for (var c = 0; c < o; c++) s[c] = arguments[c + 2];
    r.children = s;
  }
  return { $$typeof: Fi, type: e.type, key: i, ref: l, props: r, _owner: a };
};
re.createContext = function (e) {
  return (
    (e = {
      $$typeof: Bh,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: Fh, _context: e }),
    (e.Consumer = e)
  );
};
re.createElement = yf;
re.createFactory = function (e) {
  var t = yf.bind(null, e);
  return ((t.type = e), t);
};
re.createRef = function () {
  return { current: null };
};
re.forwardRef = function (e) {
  return { $$typeof: Uh, render: e };
};
re.isValidElement = Ko;
re.lazy = function (e) {
  return { $$typeof: Wh, _payload: { _status: -1, _result: e }, _init: Yh };
};
re.memo = function (e, t) {
  return { $$typeof: Vh, type: e, compare: t === void 0 ? null : t };
};
re.startTransition = function (e) {
  var t = El.transition;
  El.transition = {};
  try {
    e();
  } finally {
    El.transition = t;
  }
};
re.unstable_act = wf;
re.useCallback = function (e, t) {
  return Xe.current.useCallback(e, t);
};
re.useContext = function (e) {
  return Xe.current.useContext(e);
};
re.useDebugValue = function () {};
re.useDeferredValue = function (e) {
  return Xe.current.useDeferredValue(e);
};
re.useEffect = function (e, t) {
  return Xe.current.useEffect(e, t);
};
re.useId = function () {
  return Xe.current.useId();
};
re.useImperativeHandle = function (e, t, n) {
  return Xe.current.useImperativeHandle(e, t, n);
};
re.useInsertionEffect = function (e, t) {
  return Xe.current.useInsertionEffect(e, t);
};
re.useLayoutEffect = function (e, t) {
  return Xe.current.useLayoutEffect(e, t);
};
re.useMemo = function (e, t) {
  return Xe.current.useMemo(e, t);
};
re.useReducer = function (e, t, n) {
  return Xe.current.useReducer(e, t, n);
};
re.useRef = function (e) {
  return Xe.current.useRef(e);
};
re.useState = function (e) {
  return Xe.current.useState(e);
};
re.useSyncExternalStore = function (e, t, n) {
  return Xe.current.useSyncExternalStore(e, t, n);
};
re.useTransition = function () {
  return Xe.current.useTransition();
};
re.version = "18.3.1";
ff.exports = re;
var j = ff.exports;
const le = Vo(j),
  Xh = cf({ __proto__: null, default: le }, [j]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var qh = j,
  Jh = Symbol.for("react.element"),
  Zh = Symbol.for("react.fragment"),
  eg = Object.prototype.hasOwnProperty,
  tg = qh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  ng = { key: !0, ref: !0, __self: !0, __source: !0 };
function bf(e, t, n) {
  var r,
    i = {},
    l = null,
    a = null;
  (n !== void 0 && (l = "" + n),
    t.key !== void 0 && (l = "" + t.key),
    t.ref !== void 0 && (a = t.ref));
  for (r in t) eg.call(t, r) && !ng.hasOwnProperty(r) && (i[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) i[r] === void 0 && (i[r] = t[r]);
  return {
    $$typeof: Jh,
    type: e,
    key: l,
    ref: a,
    props: i,
    _owner: tg.current,
  };
}
Sa.Fragment = Zh;
Sa.jsx = bf;
Sa.jsxs = bf;
df.exports = Sa;
var u = df.exports,
  Bs = {},
  Sf = { exports: {} },
  dt = {},
  Tf = { exports: {} },
  Ef = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(R, z) {
    var $ = R.length;
    R.push(z);
    e: for (; 0 < $; ) {
      var q = ($ - 1) >>> 1,
        ie = R[q];
      if (0 < i(ie, z)) ((R[q] = z), (R[$] = ie), ($ = q));
      else break e;
    }
  }
  function n(R) {
    return R.length === 0 ? null : R[0];
  }
  function r(R) {
    if (R.length === 0) return null;
    var z = R[0],
      $ = R.pop();
    if ($ !== z) {
      R[0] = $;
      e: for (var q = 0, ie = R.length, Pe = ie >>> 1; q < Pe; ) {
        var ce = 2 * (q + 1) - 1,
          De = R[ce],
          ve = ce + 1,
          Ke = R[ve];
        if (0 > i(De, $))
          ve < ie && 0 > i(Ke, De)
            ? ((R[q] = Ke), (R[ve] = $), (q = ve))
            : ((R[q] = De), (R[ce] = $), (q = ce));
        else if (ve < ie && 0 > i(Ke, $)) ((R[q] = Ke), (R[ve] = $), (q = ve));
        else break e;
      }
    }
    return z;
  }
  function i(R, z) {
    var $ = R.sortIndex - z.sortIndex;
    return $ !== 0 ? $ : R.id - z.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var l = performance;
    e.unstable_now = function () {
      return l.now();
    };
  } else {
    var a = Date,
      s = a.now();
    e.unstable_now = function () {
      return a.now() - s;
    };
  }
  var o = [],
    c = [],
    d = 1,
    p = null,
    h = 3,
    v = !1,
    x = !1,
    b = !1,
    N = typeof setTimeout == "function" ? setTimeout : null,
    g = typeof clearTimeout == "function" ? clearTimeout : null,
    f = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function m(R) {
    for (var z = n(c); z !== null; ) {
      if (z.callback === null) r(c);
      else if (z.startTime <= R)
        (r(c), (z.sortIndex = z.expirationTime), t(o, z));
      else break;
      z = n(c);
    }
  }
  function w(R) {
    if (((b = !1), m(R), !x))
      if (n(o) !== null) ((x = !0), K(T));
      else {
        var z = n(c);
        z !== null && Z(w, z.startTime - R);
      }
  }
  function T(R, z) {
    ((x = !1), b && ((b = !1), g(C), (C = -1)), (v = !0));
    var $ = h;
    try {
      for (
        m(z), p = n(o);
        p !== null && (!(p.expirationTime > z) || (R && !_()));
      ) {
        var q = p.callback;
        if (typeof q == "function") {
          ((p.callback = null), (h = p.priorityLevel));
          var ie = q(p.expirationTime <= z);
          ((z = e.unstable_now()),
            typeof ie == "function" ? (p.callback = ie) : p === n(o) && r(o),
            m(z));
        } else r(o);
        p = n(o);
      }
      if (p !== null) var Pe = !0;
      else {
        var ce = n(c);
        (ce !== null && Z(w, ce.startTime - z), (Pe = !1));
      }
      return Pe;
    } finally {
      ((p = null), (h = $), (v = !1));
    }
  }
  var L = !1,
    y = null,
    C = -1,
    M = 5,
    P = -1;
  function _() {
    return !(e.unstable_now() - P < M);
  }
  function F() {
    if (y !== null) {
      var R = e.unstable_now();
      P = R;
      var z = !0;
      try {
        z = y(!0, R);
      } finally {
        z ? D() : ((L = !1), (y = null));
      }
    } else L = !1;
  }
  var D;
  if (typeof f == "function")
    D = function () {
      f(F);
    };
  else if (typeof MessageChannel < "u") {
    var A = new MessageChannel(),
      W = A.port2;
    ((A.port1.onmessage = F),
      (D = function () {
        W.postMessage(null);
      }));
  } else
    D = function () {
      N(F, 0);
    };
  function K(R) {
    ((y = R), L || ((L = !0), D()));
  }
  function Z(R, z) {
    C = N(function () {
      R(e.unstable_now());
    }, z);
  }
  ((e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (R) {
      R.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      x || v || ((x = !0), K(T));
    }),
    (e.unstable_forceFrameRate = function (R) {
      0 > R || 125 < R
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
          )
        : (M = 0 < R ? Math.floor(1e3 / R) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return h;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(o);
    }),
    (e.unstable_next = function (R) {
      switch (h) {
        case 1:
        case 2:
        case 3:
          var z = 3;
          break;
        default:
          z = h;
      }
      var $ = h;
      h = z;
      try {
        return R();
      } finally {
        h = $;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (R, z) {
      switch (R) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          R = 3;
      }
      var $ = h;
      h = R;
      try {
        return z();
      } finally {
        h = $;
      }
    }),
    (e.unstable_scheduleCallback = function (R, z, $) {
      var q = e.unstable_now();
      switch (
        (typeof $ == "object" && $ !== null
          ? (($ = $.delay), ($ = typeof $ == "number" && 0 < $ ? q + $ : q))
          : ($ = q),
        R)
      ) {
        case 1:
          var ie = -1;
          break;
        case 2:
          ie = 250;
          break;
        case 5:
          ie = 1073741823;
          break;
        case 4:
          ie = 1e4;
          break;
        default:
          ie = 5e3;
      }
      return (
        (ie = $ + ie),
        (R = {
          id: d++,
          callback: z,
          priorityLevel: R,
          startTime: $,
          expirationTime: ie,
          sortIndex: -1,
        }),
        $ > q
          ? ((R.sortIndex = $),
            t(c, R),
            n(o) === null &&
              R === n(c) &&
              (b ? (g(C), (C = -1)) : (b = !0), Z(w, $ - q)))
          : ((R.sortIndex = ie), t(o, R), x || v || ((x = !0), K(T))),
        R
      );
    }),
    (e.unstable_shouldYield = _),
    (e.unstable_wrapCallback = function (R) {
      var z = h;
      return function () {
        var $ = h;
        h = z;
        try {
          return R.apply(this, arguments);
        } finally {
          h = $;
        }
      };
    }));
})(Ef);
Tf.exports = Ef;
var rg = Tf.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ig = j,
  ct = rg;
function I(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var jf = new Set(),
  wi = {};
function Zn(e, t) {
  (Pr(e, t), Pr(e + "Capture", t));
}
function Pr(e, t) {
  for (wi[e] = t, e = 0; e < t.length; e++) jf.add(t[e]);
}
var $t = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  Us = Object.prototype.hasOwnProperty,
  lg =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  xc = {},
  yc = {};
function ag(e) {
  return Us.call(yc, e)
    ? !0
    : Us.call(xc, e)
      ? !1
      : lg.test(e)
        ? (yc[e] = !0)
        : ((xc[e] = !0), !1);
}
function sg(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
          ? !n.acceptsBooleans
          : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function og(e, t, n, r) {
  if (t === null || typeof t > "u" || sg(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function qe(e, t, n, r, i, l, a) {
  ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = i),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = l),
    (this.removeEmptyString = a));
}
var He = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    He[e] = new qe(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  He[t] = new qe(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  He[e] = new qe(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  He[e] = new qe(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    He[e] = new qe(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  He[e] = new qe(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  He[e] = new qe(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  He[e] = new qe(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  He[e] = new qe(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Yo = /[\-:]([a-z])/g;
function Qo(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Yo, Qo);
    He[t] = new qe(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Yo, Qo);
    He[t] = new qe(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(Yo, Qo);
  He[t] = new qe(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  He[e] = new qe(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
He.xlinkHref = new qe(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1,
);
["src", "href", "action", "formAction"].forEach(function (e) {
  He[e] = new qe(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Xo(e, t, n, r) {
  var i = He.hasOwnProperty(t) ? He[t] : null;
  (i !== null
    ? i.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (og(t, n, i, r) && (n = null),
    r || i === null
      ? ag(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : i.mustUseProperty
        ? (e[i.propertyName] = n === null ? (i.type === 3 ? !1 : "") : n)
        : ((t = i.attributeName),
          (r = i.attributeNamespace),
          n === null
            ? e.removeAttribute(t)
            : ((i = i.type),
              (n = i === 3 || (i === 4 && n === !0) ? "" : "" + n),
              r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Xt = ig.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  nl = Symbol.for("react.element"),
  sr = Symbol.for("react.portal"),
  or = Symbol.for("react.fragment"),
  qo = Symbol.for("react.strict_mode"),
  Hs = Symbol.for("react.profiler"),
  Cf = Symbol.for("react.provider"),
  Pf = Symbol.for("react.context"),
  Jo = Symbol.for("react.forward_ref"),
  Vs = Symbol.for("react.suspense"),
  Ws = Symbol.for("react.suspense_list"),
  Zo = Symbol.for("react.memo"),
  ln = Symbol.for("react.lazy"),
  kf = Symbol.for("react.offscreen"),
  wc = Symbol.iterator;
function $r(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (wc && e[wc]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Se = Object.assign,
  Ya;
function ri(e) {
  if (Ya === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Ya = (t && t[1]) || "";
    }
  return (
    `
` +
    Ya +
    e
  );
}
var Qa = !1;
function Xa(e, t) {
  if (!e || Qa) return "";
  Qa = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (c) {
          var r = c;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (c) {
          r = c;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (c) {
        r = c;
      }
      e();
    }
  } catch (c) {
    if (c && r && typeof c.stack == "string") {
      for (
        var i = c.stack.split(`
`),
          l = r.stack.split(`
`),
          a = i.length - 1,
          s = l.length - 1;
        1 <= a && 0 <= s && i[a] !== l[s];
      )
        s--;
      for (; 1 <= a && 0 <= s; a--, s--)
        if (i[a] !== l[s]) {
          if (a !== 1 || s !== 1)
            do
              if ((a--, s--, 0 > s || i[a] !== l[s])) {
                var o =
                  `
` + i[a].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    o.includes("<anonymous>") &&
                    (o = o.replace("<anonymous>", e.displayName)),
                  o
                );
              }
            while (1 <= a && 0 <= s);
          break;
        }
    }
  } finally {
    ((Qa = !1), (Error.prepareStackTrace = n));
  }
  return (e = e ? e.displayName || e.name : "") ? ri(e) : "";
}
function ug(e) {
  switch (e.tag) {
    case 5:
      return ri(e.type);
    case 16:
      return ri("Lazy");
    case 13:
      return ri("Suspense");
    case 19:
      return ri("SuspenseList");
    case 0:
    case 2:
    case 15:
      return ((e = Xa(e.type, !1)), e);
    case 11:
      return ((e = Xa(e.type.render, !1)), e);
    case 1:
      return ((e = Xa(e.type, !0)), e);
    default:
      return "";
  }
}
function $s(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case or:
      return "Fragment";
    case sr:
      return "Portal";
    case Hs:
      return "Profiler";
    case qo:
      return "StrictMode";
    case Vs:
      return "Suspense";
    case Ws:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case Pf:
        return (e.displayName || "Context") + ".Consumer";
      case Cf:
        return (e._context.displayName || "Context") + ".Provider";
      case Jo:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case Zo:
        return (
          (t = e.displayName || null),
          t !== null ? t : $s(e.type) || "Memo"
        );
      case ln:
        ((t = e._payload), (e = e._init));
        try {
          return $s(e(t));
        } catch {}
    }
  return null;
}
function cg(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return $s(t);
    case 8:
      return t === qo ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function bn(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Nf(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function dg(e) {
  var t = Nf(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var i = n.get,
      l = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return i.call(this);
        },
        set: function (a) {
          ((r = "" + a), l.call(this, a));
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (a) {
          r = "" + a;
        },
        stopTracking: function () {
          ((e._valueTracker = null), delete e[t]);
        },
      }
    );
  }
}
function rl(e) {
  e._valueTracker || (e._valueTracker = dg(e));
}
function Mf(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = Nf(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function Fl(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Gs(e, t) {
  var n = t.checked;
  return Se({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function bc(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  ((n = bn(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    }));
}
function Lf(e, t) {
  ((t = t.checked), t != null && Xo(e, "checked", t, !1));
}
function Ks(e, t) {
  Lf(e, t);
  var n = bn(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  (t.hasOwnProperty("value")
    ? Ys(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && Ys(e, t.type, bn(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked));
}
function Sc(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    ((t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t));
  }
  ((n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n));
}
function Ys(e, t, n) {
  (t !== "number" || Fl(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var ii = Array.isArray;
function yr(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
    for (n = 0; n < e.length; n++)
      ((i = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== i && (e[n].selected = i),
        i && r && (e[n].defaultSelected = !0));
  } else {
    for (n = "" + bn(n), t = null, i = 0; i < e.length; i++) {
      if (e[i].value === n) {
        ((e[i].selected = !0), r && (e[i].defaultSelected = !0));
        return;
      }
      t !== null || e[i].disabled || (t = e[i]);
    }
    t !== null && (t.selected = !0);
  }
}
function Qs(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(I(91));
  return Se({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function Tc(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(I(92));
      if (ii(n)) {
        if (1 < n.length) throw Error(I(93));
        n = n[0];
      }
      t = n;
    }
    (t == null && (t = ""), (n = t));
  }
  e._wrapperState = { initialValue: bn(n) };
}
function Df(e, t) {
  var n = bn(t.value),
    r = bn(t.defaultValue);
  (n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r));
}
function Ec(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Rf(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Xs(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? Rf(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
      ? "http://www.w3.org/1999/xhtml"
      : e;
}
var il,
  _f = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, i) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, i);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        il = il || document.createElement("div"),
          il.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = il.firstChild;
        e.firstChild;
      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function bi(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var oi = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  fg = ["Webkit", "ms", "Moz", "O"];
Object.keys(oi).forEach(function (e) {
  fg.forEach(function (t) {
    ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (oi[t] = oi[e]));
  });
});
function Of(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (oi.hasOwnProperty(e) && oi[e])
      ? ("" + t).trim()
      : t + "px";
}
function If(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        i = Of(n, t[n], r);
      (n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : (e[n] = i));
    }
}
var pg = Se(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  },
);
function qs(e, t) {
  if (t) {
    if (pg[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(I(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(I(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(I(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(I(62));
  }
}
function Js(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var Zs = null;
function eu(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var eo = null,
  wr = null,
  br = null;
function jc(e) {
  if ((e = Hi(e))) {
    if (typeof eo != "function") throw Error(I(280));
    var t = e.stateNode;
    t && ((t = Pa(t)), eo(e.stateNode, e.type, t));
  }
}
function Af(e) {
  wr ? (br ? br.push(e) : (br = [e])) : (wr = e);
}
function zf() {
  if (wr) {
    var e = wr,
      t = br;
    if (((br = wr = null), jc(e), t)) for (e = 0; e < t.length; e++) jc(t[e]);
  }
}
function Ff(e, t) {
  return e(t);
}
function Bf() {}
var qa = !1;
function Uf(e, t, n) {
  if (qa) return e(t, n);
  qa = !0;
  try {
    return Ff(e, t, n);
  } finally {
    ((qa = !1), (wr !== null || br !== null) && (Bf(), zf()));
  }
}
function Si(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Pa(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      ((r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r));
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(I(231, t, typeof n));
  return n;
}
var to = !1;
if ($t)
  try {
    var Gr = {};
    (Object.defineProperty(Gr, "passive", {
      get: function () {
        to = !0;
      },
    }),
      window.addEventListener("test", Gr, Gr),
      window.removeEventListener("test", Gr, Gr));
  } catch {
    to = !1;
  }
function mg(e, t, n, r, i, l, a, s, o) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (d) {
    this.onError(d);
  }
}
var ui = !1,
  Bl = null,
  Ul = !1,
  no = null,
  hg = {
    onError: function (e) {
      ((ui = !0), (Bl = e));
    },
  };
function gg(e, t, n, r, i, l, a, s, o) {
  ((ui = !1), (Bl = null), mg.apply(hg, arguments));
}
function vg(e, t, n, r, i, l, a, s, o) {
  if ((gg.apply(this, arguments), ui)) {
    if (ui) {
      var c = Bl;
      ((ui = !1), (Bl = null));
    } else throw Error(I(198));
    Ul || ((Ul = !0), (no = c));
  }
}
function er(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do ((t = e), t.flags & 4098 && (n = t.return), (e = t.return));
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function Hf(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function Cc(e) {
  if (er(e) !== e) throw Error(I(188));
}
function xg(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = er(e)), t === null)) throw Error(I(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var i = n.return;
    if (i === null) break;
    var l = i.alternate;
    if (l === null) {
      if (((r = i.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (i.child === l.child) {
      for (l = i.child; l; ) {
        if (l === n) return (Cc(i), e);
        if (l === r) return (Cc(i), t);
        l = l.sibling;
      }
      throw Error(I(188));
    }
    if (n.return !== r.return) ((n = i), (r = l));
    else {
      for (var a = !1, s = i.child; s; ) {
        if (s === n) {
          ((a = !0), (n = i), (r = l));
          break;
        }
        if (s === r) {
          ((a = !0), (r = i), (n = l));
          break;
        }
        s = s.sibling;
      }
      if (!a) {
        for (s = l.child; s; ) {
          if (s === n) {
            ((a = !0), (n = l), (r = i));
            break;
          }
          if (s === r) {
            ((a = !0), (r = l), (n = i));
            break;
          }
          s = s.sibling;
        }
        if (!a) throw Error(I(189));
      }
    }
    if (n.alternate !== r) throw Error(I(190));
  }
  if (n.tag !== 3) throw Error(I(188));
  return n.stateNode.current === n ? e : t;
}
function Vf(e) {
  return ((e = xg(e)), e !== null ? Wf(e) : null);
}
function Wf(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Wf(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var $f = ct.unstable_scheduleCallback,
  Pc = ct.unstable_cancelCallback,
  yg = ct.unstable_shouldYield,
  wg = ct.unstable_requestPaint,
  ke = ct.unstable_now,
  bg = ct.unstable_getCurrentPriorityLevel,
  tu = ct.unstable_ImmediatePriority,
  Gf = ct.unstable_UserBlockingPriority,
  Hl = ct.unstable_NormalPriority,
  Sg = ct.unstable_LowPriority,
  Kf = ct.unstable_IdlePriority,
  Ta = null,
  Rt = null;
function Tg(e) {
  if (Rt && typeof Rt.onCommitFiberRoot == "function")
    try {
      Rt.onCommitFiberRoot(Ta, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var Et = Math.clz32 ? Math.clz32 : Cg,
  Eg = Math.log,
  jg = Math.LN2;
function Cg(e) {
  return ((e >>>= 0), e === 0 ? 32 : (31 - ((Eg(e) / jg) | 0)) | 0);
}
var ll = 64,
  al = 4194304;
function li(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Vl(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    i = e.suspendedLanes,
    l = e.pingedLanes,
    a = n & 268435455;
  if (a !== 0) {
    var s = a & ~i;
    s !== 0 ? (r = li(s)) : ((l &= a), l !== 0 && (r = li(l)));
  } else ((a = n & ~i), a !== 0 ? (r = li(a)) : l !== 0 && (r = li(l)));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & i) &&
    ((i = r & -r), (l = t & -t), i >= l || (i === 16 && (l & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      ((n = 31 - Et(t)), (i = 1 << n), (r |= e[n]), (t &= ~i));
  return r;
}
function Pg(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function kg(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      i = e.expirationTimes,
      l = e.pendingLanes;
    0 < l;
  ) {
    var a = 31 - Et(l),
      s = 1 << a,
      o = i[a];
    (o === -1
      ? (!(s & n) || s & r) && (i[a] = Pg(s, t))
      : o <= t && (e.expiredLanes |= s),
      (l &= ~s));
  }
}
function ro(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function Yf() {
  var e = ll;
  return ((ll <<= 1), !(ll & 4194240) && (ll = 64), e);
}
function Ja(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Bi(e, t, n) {
  ((e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - Et(t)),
    (e[t] = n));
}
function Ng(e, t) {
  var n = e.pendingLanes & ~t;
  ((e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements));
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var i = 31 - Et(n),
      l = 1 << i;
    ((t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~l));
  }
}
function nu(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - Et(n),
      i = 1 << r;
    ((i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i));
  }
}
var fe = 0;
function Qf(e) {
  return (
    (e &= -e),
    1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
  );
}
var Xf,
  ru,
  qf,
  Jf,
  Zf,
  io = !1,
  sl = [],
  pn = null,
  mn = null,
  hn = null,
  Ti = new Map(),
  Ei = new Map(),
  sn = [],
  Mg =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " ",
    );
function kc(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      pn = null;
      break;
    case "dragenter":
    case "dragleave":
      mn = null;
      break;
    case "mouseover":
    case "mouseout":
      hn = null;
      break;
    case "pointerover":
    case "pointerout":
      Ti.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Ei.delete(t.pointerId);
  }
}
function Kr(e, t, n, r, i, l) {
  return e === null || e.nativeEvent !== l
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: l,
        targetContainers: [i],
      }),
      t !== null && ((t = Hi(t)), t !== null && ru(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      i !== null && t.indexOf(i) === -1 && t.push(i),
      e);
}
function Lg(e, t, n, r, i) {
  switch (t) {
    case "focusin":
      return ((pn = Kr(pn, e, t, n, r, i)), !0);
    case "dragenter":
      return ((mn = Kr(mn, e, t, n, r, i)), !0);
    case "mouseover":
      return ((hn = Kr(hn, e, t, n, r, i)), !0);
    case "pointerover":
      var l = i.pointerId;
      return (Ti.set(l, Kr(Ti.get(l) || null, e, t, n, r, i)), !0);
    case "gotpointercapture":
      return (
        (l = i.pointerId),
        Ei.set(l, Kr(Ei.get(l) || null, e, t, n, r, i)),
        !0
      );
  }
  return !1;
}
function ep(e) {
  var t = zn(e.target);
  if (t !== null) {
    var n = er(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = Hf(n)), t !== null)) {
          ((e.blockedOn = t),
            Zf(e.priority, function () {
              qf(n);
            }));
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function jl(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = lo(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      ((Zs = r), n.target.dispatchEvent(r), (Zs = null));
    } else return ((t = Hi(n)), t !== null && ru(t), (e.blockedOn = n), !1);
    t.shift();
  }
  return !0;
}
function Nc(e, t, n) {
  jl(e) && n.delete(t);
}
function Dg() {
  ((io = !1),
    pn !== null && jl(pn) && (pn = null),
    mn !== null && jl(mn) && (mn = null),
    hn !== null && jl(hn) && (hn = null),
    Ti.forEach(Nc),
    Ei.forEach(Nc));
}
function Yr(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    io ||
      ((io = !0),
      ct.unstable_scheduleCallback(ct.unstable_NormalPriority, Dg)));
}
function ji(e) {
  function t(i) {
    return Yr(i, e);
  }
  if (0 < sl.length) {
    Yr(sl[0], e);
    for (var n = 1; n < sl.length; n++) {
      var r = sl[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    pn !== null && Yr(pn, e),
      mn !== null && Yr(mn, e),
      hn !== null && Yr(hn, e),
      Ti.forEach(t),
      Ei.forEach(t),
      n = 0;
    n < sn.length;
    n++
  )
    ((r = sn[n]), r.blockedOn === e && (r.blockedOn = null));
  for (; 0 < sn.length && ((n = sn[0]), n.blockedOn === null); )
    (ep(n), n.blockedOn === null && sn.shift());
}
var Sr = Xt.ReactCurrentBatchConfig,
  Wl = !0;
function Rg(e, t, n, r) {
  var i = fe,
    l = Sr.transition;
  Sr.transition = null;
  try {
    ((fe = 1), iu(e, t, n, r));
  } finally {
    ((fe = i), (Sr.transition = l));
  }
}
function _g(e, t, n, r) {
  var i = fe,
    l = Sr.transition;
  Sr.transition = null;
  try {
    ((fe = 4), iu(e, t, n, r));
  } finally {
    ((fe = i), (Sr.transition = l));
  }
}
function iu(e, t, n, r) {
  if (Wl) {
    var i = lo(e, t, n, r);
    if (i === null) (os(e, t, r, $l, n), kc(e, r));
    else if (Lg(i, e, t, n, r)) r.stopPropagation();
    else if ((kc(e, r), t & 4 && -1 < Mg.indexOf(e))) {
      for (; i !== null; ) {
        var l = Hi(i);
        if (
          (l !== null && Xf(l),
          (l = lo(e, t, n, r)),
          l === null && os(e, t, r, $l, n),
          l === i)
        )
          break;
        i = l;
      }
      i !== null && r.stopPropagation();
    } else os(e, t, r, null, n);
  }
}
var $l = null;
function lo(e, t, n, r) {
  if ((($l = null), (e = eu(r)), (e = zn(e)), e !== null))
    if (((t = er(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = Hf(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (($l = e), null);
}
function tp(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (bg()) {
        case tu:
          return 1;
        case Gf:
          return 4;
        case Hl:
        case Sg:
          return 16;
        case Kf:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var un = null,
  lu = null,
  Cl = null;
function np() {
  if (Cl) return Cl;
  var e,
    t = lu,
    n = t.length,
    r,
    i = "value" in un ? un.value : un.textContent,
    l = i.length;
  for (e = 0; e < n && t[e] === i[e]; e++);
  var a = n - e;
  for (r = 1; r <= a && t[n - r] === i[l - r]; r++);
  return (Cl = i.slice(e, 1 < r ? 1 - r : void 0));
}
function Pl(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function ol() {
  return !0;
}
function Mc() {
  return !1;
}
function ft(e) {
  function t(n, r, i, l, a) {
    ((this._reactName = n),
      (this._targetInst = i),
      (this.type = r),
      (this.nativeEvent = l),
      (this.target = a),
      (this.currentTarget = null));
    for (var s in e)
      e.hasOwnProperty(s) && ((n = e[s]), (this[s] = n ? n(l) : l[s]));
    return (
      (this.isDefaultPrevented = (
        l.defaultPrevented != null ? l.defaultPrevented : l.returnValue === !1
      )
        ? ol
        : Mc),
      (this.isPropagationStopped = Mc),
      this
    );
  }
  return (
    Se(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = ol));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = ol));
      },
      persist: function () {},
      isPersistent: ol,
    }),
    t
  );
}
var Ir = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  au = ft(Ir),
  Ui = Se({}, Ir, { view: 0, detail: 0 }),
  Og = ft(Ui),
  Za,
  es,
  Qr,
  Ea = Se({}, Ui, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: su,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== Qr &&
            (Qr && e.type === "mousemove"
              ? ((Za = e.screenX - Qr.screenX), (es = e.screenY - Qr.screenY))
              : (es = Za = 0),
            (Qr = e)),
          Za);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : es;
    },
  }),
  Lc = ft(Ea),
  Ig = Se({}, Ea, { dataTransfer: 0 }),
  Ag = ft(Ig),
  zg = Se({}, Ui, { relatedTarget: 0 }),
  ts = ft(zg),
  Fg = Se({}, Ir, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Bg = ft(Fg),
  Ug = Se({}, Ir, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  Hg = ft(Ug),
  Vg = Se({}, Ir, { data: 0 }),
  Dc = ft(Vg),
  Wg = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  $g = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  Gg = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function Kg(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Gg[e]) ? !!t[e] : !1;
}
function su() {
  return Kg;
}
var Yg = Se({}, Ui, {
    key: function (e) {
      if (e.key) {
        var t = Wg[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = Pl(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
          ? $g[e.keyCode] || "Unidentified"
          : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: su,
    charCode: function (e) {
      return e.type === "keypress" ? Pl(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? Pl(e)
        : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
    },
  }),
  Qg = ft(Yg),
  Xg = Se({}, Ea, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  Rc = ft(Xg),
  qg = Se({}, Ui, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: su,
  }),
  Jg = ft(qg),
  Zg = Se({}, Ir, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  ev = ft(Zg),
  tv = Se({}, Ea, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
            ? -e.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  nv = ft(tv),
  rv = [9, 13, 27, 32],
  ou = $t && "CompositionEvent" in window,
  ci = null;
$t && "documentMode" in document && (ci = document.documentMode);
var iv = $t && "TextEvent" in window && !ci,
  rp = $t && (!ou || (ci && 8 < ci && 11 >= ci)),
  _c = " ",
  Oc = !1;
function ip(e, t) {
  switch (e) {
    case "keyup":
      return rv.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function lp(e) {
  return ((e = e.detail), typeof e == "object" && "data" in e ? e.data : null);
}
var ur = !1;
function lv(e, t) {
  switch (e) {
    case "compositionend":
      return lp(t);
    case "keypress":
      return t.which !== 32 ? null : ((Oc = !0), _c);
    case "textInput":
      return ((e = t.data), e === _c && Oc ? null : e);
    default:
      return null;
  }
}
function av(e, t) {
  if (ur)
    return e === "compositionend" || (!ou && ip(e, t))
      ? ((e = np()), (Cl = lu = un = null), (ur = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return rp && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var sv = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function Ic(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!sv[e.type] : t === "textarea";
}
function ap(e, t, n, r) {
  (Af(r),
    (t = Gl(t, "onChange")),
    0 < t.length &&
      ((n = new au("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t })));
}
var di = null,
  Ci = null;
function ov(e) {
  vp(e, 0);
}
function ja(e) {
  var t = fr(e);
  if (Mf(t)) return e;
}
function uv(e, t) {
  if (e === "change") return t;
}
var sp = !1;
if ($t) {
  var ns;
  if ($t) {
    var rs = "oninput" in document;
    if (!rs) {
      var Ac = document.createElement("div");
      (Ac.setAttribute("oninput", "return;"),
        (rs = typeof Ac.oninput == "function"));
    }
    ns = rs;
  } else ns = !1;
  sp = ns && (!document.documentMode || 9 < document.documentMode);
}
function zc() {
  di && (di.detachEvent("onpropertychange", op), (Ci = di = null));
}
function op(e) {
  if (e.propertyName === "value" && ja(Ci)) {
    var t = [];
    (ap(t, Ci, e, eu(e)), Uf(ov, t));
  }
}
function cv(e, t, n) {
  e === "focusin"
    ? (zc(), (di = t), (Ci = n), di.attachEvent("onpropertychange", op))
    : e === "focusout" && zc();
}
function dv(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return ja(Ci);
}
function fv(e, t) {
  if (e === "click") return ja(t);
}
function pv(e, t) {
  if (e === "input" || e === "change") return ja(t);
}
function mv(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Ct = typeof Object.is == "function" ? Object.is : mv;
function Pi(e, t) {
  if (Ct(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var i = n[r];
    if (!Us.call(t, i) || !Ct(e[i], t[i])) return !1;
  }
  return !0;
}
function Fc(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Bc(e, t) {
  var n = Fc(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = Fc(n);
  }
}
function up(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? up(e, t.parentNode)
          : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function cp() {
  for (var e = window, t = Fl(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Fl(e.document);
  }
  return t;
}
function uu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function hv(e) {
  var t = cp(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    up(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && uu(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        ((n.selectionStart = t),
          (n.selectionEnd = Math.min(e, n.value.length)));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var i = n.textContent.length,
          l = Math.min(r.start, i);
        ((r = r.end === void 0 ? l : Math.min(r.end, i)),
          !e.extend && l > r && ((i = r), (r = l), (l = i)),
          (i = Bc(n, l)));
        var a = Bc(n, r);
        i &&
          a &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== i.node ||
            e.anchorOffset !== i.offset ||
            e.focusNode !== a.node ||
            e.focusOffset !== a.offset) &&
          ((t = t.createRange()),
          t.setStart(i.node, i.offset),
          e.removeAllRanges(),
          l > r
            ? (e.addRange(t), e.extend(a.node, a.offset))
            : (t.setEnd(a.node, a.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      ((e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top));
  }
}
var gv = $t && "documentMode" in document && 11 >= document.documentMode,
  cr = null,
  ao = null,
  fi = null,
  so = !1;
function Uc(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  so ||
    cr == null ||
    cr !== Fl(r) ||
    ((r = cr),
    "selectionStart" in r && uu(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (fi && Pi(fi, r)) ||
      ((fi = r),
      (r = Gl(ao, "onSelect")),
      0 < r.length &&
        ((t = new au("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = cr))));
}
function ul(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var dr = {
    animationend: ul("Animation", "AnimationEnd"),
    animationiteration: ul("Animation", "AnimationIteration"),
    animationstart: ul("Animation", "AnimationStart"),
    transitionend: ul("Transition", "TransitionEnd"),
  },
  is = {},
  dp = {};
$t &&
  ((dp = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete dr.animationend.animation,
    delete dr.animationiteration.animation,
    delete dr.animationstart.animation),
  "TransitionEvent" in window || delete dr.transitionend.transition);
function Ca(e) {
  if (is[e]) return is[e];
  if (!dr[e]) return e;
  var t = dr[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in dp) return (is[e] = t[n]);
  return e;
}
var fp = Ca("animationend"),
  pp = Ca("animationiteration"),
  mp = Ca("animationstart"),
  hp = Ca("transitionend"),
  gp = new Map(),
  Hc =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " ",
    );
function Tn(e, t) {
  (gp.set(e, t), Zn(t, [e]));
}
for (var ls = 0; ls < Hc.length; ls++) {
  var as = Hc[ls],
    vv = as.toLowerCase(),
    xv = as[0].toUpperCase() + as.slice(1);
  Tn(vv, "on" + xv);
}
Tn(fp, "onAnimationEnd");
Tn(pp, "onAnimationIteration");
Tn(mp, "onAnimationStart");
Tn("dblclick", "onDoubleClick");
Tn("focusin", "onFocus");
Tn("focusout", "onBlur");
Tn(hp, "onTransitionEnd");
Pr("onMouseEnter", ["mouseout", "mouseover"]);
Pr("onMouseLeave", ["mouseout", "mouseover"]);
Pr("onPointerEnter", ["pointerout", "pointerover"]);
Pr("onPointerLeave", ["pointerout", "pointerover"]);
Zn(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(
    " ",
  ),
);
Zn(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " ",
  ),
);
Zn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Zn(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" "),
);
Zn(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" "),
);
Zn(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
);
var ai =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " ",
    ),
  yv = new Set("cancel close invalid load scroll toggle".split(" ").concat(ai));
function Vc(e, t, n) {
  var r = e.type || "unknown-event";
  ((e.currentTarget = n), vg(r, t, void 0, e), (e.currentTarget = null));
}
function vp(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      i = r.event;
    r = r.listeners;
    e: {
      var l = void 0;
      if (t)
        for (var a = r.length - 1; 0 <= a; a--) {
          var s = r[a],
            o = s.instance,
            c = s.currentTarget;
          if (((s = s.listener), o !== l && i.isPropagationStopped())) break e;
          (Vc(i, s, c), (l = o));
        }
      else
        for (a = 0; a < r.length; a++) {
          if (
            ((s = r[a]),
            (o = s.instance),
            (c = s.currentTarget),
            (s = s.listener),
            o !== l && i.isPropagationStopped())
          )
            break e;
          (Vc(i, s, c), (l = o));
        }
    }
  }
  if (Ul) throw ((e = no), (Ul = !1), (no = null), e);
}
function he(e, t) {
  var n = t[po];
  n === void 0 && (n = t[po] = new Set());
  var r = e + "__bubble";
  n.has(r) || (xp(t, e, 2, !1), n.add(r));
}
function ss(e, t, n) {
  var r = 0;
  (t && (r |= 4), xp(n, e, r, t));
}
var cl = "_reactListening" + Math.random().toString(36).slice(2);
function ki(e) {
  if (!e[cl]) {
    ((e[cl] = !0),
      jf.forEach(function (n) {
        n !== "selectionchange" && (yv.has(n) || ss(n, !1, e), ss(n, !0, e));
      }));
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[cl] || ((t[cl] = !0), ss("selectionchange", !1, t));
  }
}
function xp(e, t, n, r) {
  switch (tp(t)) {
    case 1:
      var i = Rg;
      break;
    case 4:
      i = _g;
      break;
    default:
      i = iu;
  }
  ((n = i.bind(null, t, n, e)),
    (i = void 0),
    !to ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (i = !0),
    r
      ? i !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: i })
        : e.addEventListener(t, n, !0)
      : i !== void 0
        ? e.addEventListener(t, n, { passive: i })
        : e.addEventListener(t, n, !1));
}
function os(e, t, n, r, i) {
  var l = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var a = r.tag;
      if (a === 3 || a === 4) {
        var s = r.stateNode.containerInfo;
        if (s === i || (s.nodeType === 8 && s.parentNode === i)) break;
        if (a === 4)
          for (a = r.return; a !== null; ) {
            var o = a.tag;
            if (
              (o === 3 || o === 4) &&
              ((o = a.stateNode.containerInfo),
              o === i || (o.nodeType === 8 && o.parentNode === i))
            )
              return;
            a = a.return;
          }
        for (; s !== null; ) {
          if (((a = zn(s)), a === null)) return;
          if (((o = a.tag), o === 5 || o === 6)) {
            r = l = a;
            continue e;
          }
          s = s.parentNode;
        }
      }
      r = r.return;
    }
  Uf(function () {
    var c = l,
      d = eu(n),
      p = [];
    e: {
      var h = gp.get(e);
      if (h !== void 0) {
        var v = au,
          x = e;
        switch (e) {
          case "keypress":
            if (Pl(n) === 0) break e;
          case "keydown":
          case "keyup":
            v = Qg;
            break;
          case "focusin":
            ((x = "focus"), (v = ts));
            break;
          case "focusout":
            ((x = "blur"), (v = ts));
            break;
          case "beforeblur":
          case "afterblur":
            v = ts;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            v = Lc;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = Ag;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = Jg;
            break;
          case fp:
          case pp:
          case mp:
            v = Bg;
            break;
          case hp:
            v = ev;
            break;
          case "scroll":
            v = Og;
            break;
          case "wheel":
            v = nv;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = Hg;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = Rc;
        }
        var b = (t & 4) !== 0,
          N = !b && e === "scroll",
          g = b ? (h !== null ? h + "Capture" : null) : h;
        b = [];
        for (var f = c, m; f !== null; ) {
          m = f;
          var w = m.stateNode;
          if (
            (m.tag === 5 &&
              w !== null &&
              ((m = w),
              g !== null && ((w = Si(f, g)), w != null && b.push(Ni(f, w, m)))),
            N)
          )
            break;
          f = f.return;
        }
        0 < b.length &&
          ((h = new v(h, x, null, n, d)), p.push({ event: h, listeners: b }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((h = e === "mouseover" || e === "pointerover"),
          (v = e === "mouseout" || e === "pointerout"),
          h &&
            n !== Zs &&
            (x = n.relatedTarget || n.fromElement) &&
            (zn(x) || x[Gt]))
        )
          break e;
        if (
          (v || h) &&
          ((h =
            d.window === d
              ? d
              : (h = d.ownerDocument)
                ? h.defaultView || h.parentWindow
                : window),
          v
            ? ((x = n.relatedTarget || n.toElement),
              (v = c),
              (x = x ? zn(x) : null),
              x !== null &&
                ((N = er(x)), x !== N || (x.tag !== 5 && x.tag !== 6)) &&
                (x = null))
            : ((v = null), (x = c)),
          v !== x)
        ) {
          if (
            ((b = Lc),
            (w = "onMouseLeave"),
            (g = "onMouseEnter"),
            (f = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((b = Rc),
              (w = "onPointerLeave"),
              (g = "onPointerEnter"),
              (f = "pointer")),
            (N = v == null ? h : fr(v)),
            (m = x == null ? h : fr(x)),
            (h = new b(w, f + "leave", v, n, d)),
            (h.target = N),
            (h.relatedTarget = m),
            (w = null),
            zn(d) === c &&
              ((b = new b(g, f + "enter", x, n, d)),
              (b.target = m),
              (b.relatedTarget = N),
              (w = b)),
            (N = w),
            v && x)
          )
            t: {
              for (b = v, g = x, f = 0, m = b; m; m = lr(m)) f++;
              for (m = 0, w = g; w; w = lr(w)) m++;
              for (; 0 < f - m; ) ((b = lr(b)), f--);
              for (; 0 < m - f; ) ((g = lr(g)), m--);
              for (; f--; ) {
                if (b === g || (g !== null && b === g.alternate)) break t;
                ((b = lr(b)), (g = lr(g)));
              }
              b = null;
            }
          else b = null;
          (v !== null && Wc(p, h, v, b, !1),
            x !== null && N !== null && Wc(p, N, x, b, !0));
        }
      }
      e: {
        if (
          ((h = c ? fr(c) : window),
          (v = h.nodeName && h.nodeName.toLowerCase()),
          v === "select" || (v === "input" && h.type === "file"))
        )
          var T = uv;
        else if (Ic(h))
          if (sp) T = pv;
          else {
            T = dv;
            var L = cv;
          }
        else
          (v = h.nodeName) &&
            v.toLowerCase() === "input" &&
            (h.type === "checkbox" || h.type === "radio") &&
            (T = fv);
        if (T && (T = T(e, c))) {
          ap(p, T, n, d);
          break e;
        }
        (L && L(e, h, c),
          e === "focusout" &&
            (L = h._wrapperState) &&
            L.controlled &&
            h.type === "number" &&
            Ys(h, "number", h.value));
      }
      switch (((L = c ? fr(c) : window), e)) {
        case "focusin":
          (Ic(L) || L.contentEditable === "true") &&
            ((cr = L), (ao = c), (fi = null));
          break;
        case "focusout":
          fi = ao = cr = null;
          break;
        case "mousedown":
          so = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ((so = !1), Uc(p, n, d));
          break;
        case "selectionchange":
          if (gv) break;
        case "keydown":
        case "keyup":
          Uc(p, n, d);
      }
      var y;
      if (ou)
        e: {
          switch (e) {
            case "compositionstart":
              var C = "onCompositionStart";
              break e;
            case "compositionend":
              C = "onCompositionEnd";
              break e;
            case "compositionupdate":
              C = "onCompositionUpdate";
              break e;
          }
          C = void 0;
        }
      else
        ur
          ? ip(e, n) && (C = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (C = "onCompositionStart");
      (C &&
        (rp &&
          n.locale !== "ko" &&
          (ur || C !== "onCompositionStart"
            ? C === "onCompositionEnd" && ur && (y = np())
            : ((un = d),
              (lu = "value" in un ? un.value : un.textContent),
              (ur = !0))),
        (L = Gl(c, C)),
        0 < L.length &&
          ((C = new Dc(C, e, null, n, d)),
          p.push({ event: C, listeners: L }),
          y ? (C.data = y) : ((y = lp(n)), y !== null && (C.data = y)))),
        (y = iv ? lv(e, n) : av(e, n)) &&
          ((c = Gl(c, "onBeforeInput")),
          0 < c.length &&
            ((d = new Dc("onBeforeInput", "beforeinput", null, n, d)),
            p.push({ event: d, listeners: c }),
            (d.data = y))));
    }
    vp(p, t);
  });
}
function Ni(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Gl(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var i = e,
      l = i.stateNode;
    (i.tag === 5 &&
      l !== null &&
      ((i = l),
      (l = Si(e, n)),
      l != null && r.unshift(Ni(e, l, i)),
      (l = Si(e, t)),
      l != null && r.push(Ni(e, l, i))),
      (e = e.return));
  }
  return r;
}
function lr(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Wc(e, t, n, r, i) {
  for (var l = t._reactName, a = []; n !== null && n !== r; ) {
    var s = n,
      o = s.alternate,
      c = s.stateNode;
    if (o !== null && o === r) break;
    (s.tag === 5 &&
      c !== null &&
      ((s = c),
      i
        ? ((o = Si(n, l)), o != null && a.unshift(Ni(n, o, s)))
        : i || ((o = Si(n, l)), o != null && a.push(Ni(n, o, s)))),
      (n = n.return));
  }
  a.length !== 0 && e.push({ event: t, listeners: a });
}
var wv = /\r\n?/g,
  bv = /\u0000|\uFFFD/g;
function $c(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      wv,
      `
`,
    )
    .replace(bv, "");
}
function dl(e, t, n) {
  if (((t = $c(t)), $c(e) !== t && n)) throw Error(I(425));
}
function Kl() {}
var oo = null,
  uo = null;
function co(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var fo = typeof setTimeout == "function" ? setTimeout : void 0,
  Sv = typeof clearTimeout == "function" ? clearTimeout : void 0,
  Gc = typeof Promise == "function" ? Promise : void 0,
  Tv =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof Gc < "u"
        ? function (e) {
            return Gc.resolve(null).then(e).catch(Ev);
          }
        : fo;
function Ev(e) {
  setTimeout(function () {
    throw e;
  });
}
function us(e, t) {
  var n = t,
    r = 0;
  do {
    var i = n.nextSibling;
    if ((e.removeChild(n), i && i.nodeType === 8))
      if (((n = i.data), n === "/$")) {
        if (r === 0) {
          (e.removeChild(i), ji(t));
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = i;
  } while (n);
  ji(t);
}
function gn(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function Kc(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Ar = Math.random().toString(36).slice(2),
  Lt = "__reactFiber$" + Ar,
  Mi = "__reactProps$" + Ar,
  Gt = "__reactContainer$" + Ar,
  po = "__reactEvents$" + Ar,
  jv = "__reactListeners$" + Ar,
  Cv = "__reactHandles$" + Ar;
function zn(e) {
  var t = e[Lt];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[Gt] || n[Lt])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = Kc(e); e !== null; ) {
          if ((n = e[Lt])) return n;
          e = Kc(e);
        }
      return t;
    }
    ((e = n), (n = e.parentNode));
  }
  return null;
}
function Hi(e) {
  return (
    (e = e[Lt] || e[Gt]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function fr(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(I(33));
}
function Pa(e) {
  return e[Mi] || null;
}
var mo = [],
  pr = -1;
function En(e) {
  return { current: e };
}
function ge(e) {
  0 > pr || ((e.current = mo[pr]), (mo[pr] = null), pr--);
}
function me(e, t) {
  (pr++, (mo[pr] = e.current), (e.current = t));
}
var Sn = {},
  Ge = En(Sn),
  nt = En(!1),
  $n = Sn;
function kr(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Sn;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var i = {},
    l;
  for (l in n) i[l] = t[l];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    i
  );
}
function rt(e) {
  return ((e = e.childContextTypes), e != null);
}
function Yl() {
  (ge(nt), ge(Ge));
}
function Yc(e, t, n) {
  if (Ge.current !== Sn) throw Error(I(168));
  (me(Ge, t), me(nt, n));
}
function yp(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var i in r) if (!(i in t)) throw Error(I(108, cg(e) || "Unknown", i));
  return Se({}, n, r);
}
function Ql(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Sn),
    ($n = Ge.current),
    me(Ge, e),
    me(nt, nt.current),
    !0
  );
}
function Qc(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(I(169));
  (n
    ? ((e = yp(e, t, $n)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      ge(nt),
      ge(Ge),
      me(Ge, e))
    : ge(nt),
    me(nt, n));
}
var Bt = null,
  ka = !1,
  cs = !1;
function wp(e) {
  Bt === null ? (Bt = [e]) : Bt.push(e);
}
function Pv(e) {
  ((ka = !0), wp(e));
}
function jn() {
  if (!cs && Bt !== null) {
    cs = !0;
    var e = 0,
      t = fe;
    try {
      var n = Bt;
      for (fe = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      ((Bt = null), (ka = !1));
    } catch (i) {
      throw (Bt !== null && (Bt = Bt.slice(e + 1)), $f(tu, jn), i);
    } finally {
      ((fe = t), (cs = !1));
    }
  }
  return null;
}
var mr = [],
  hr = 0,
  Xl = null,
  ql = 0,
  pt = [],
  mt = 0,
  Gn = null,
  Ut = 1,
  Ht = "";
function _n(e, t) {
  ((mr[hr++] = ql), (mr[hr++] = Xl), (Xl = e), (ql = t));
}
function bp(e, t, n) {
  ((pt[mt++] = Ut), (pt[mt++] = Ht), (pt[mt++] = Gn), (Gn = e));
  var r = Ut;
  e = Ht;
  var i = 32 - Et(r) - 1;
  ((r &= ~(1 << i)), (n += 1));
  var l = 32 - Et(t) + i;
  if (30 < l) {
    var a = i - (i % 5);
    ((l = (r & ((1 << a) - 1)).toString(32)),
      (r >>= a),
      (i -= a),
      (Ut = (1 << (32 - Et(t) + i)) | (n << i) | r),
      (Ht = l + e));
  } else ((Ut = (1 << l) | (n << i) | r), (Ht = e));
}
function cu(e) {
  e.return !== null && (_n(e, 1), bp(e, 1, 0));
}
function du(e) {
  for (; e === Xl; )
    ((Xl = mr[--hr]), (mr[hr] = null), (ql = mr[--hr]), (mr[hr] = null));
  for (; e === Gn; )
    ((Gn = pt[--mt]),
      (pt[mt] = null),
      (Ht = pt[--mt]),
      (pt[mt] = null),
      (Ut = pt[--mt]),
      (pt[mt] = null));
}
var ut = null,
  ot = null,
  ye = !1,
  Tt = null;
function Sp(e, t) {
  var n = ht(5, null, null, 0);
  ((n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
}
function Xc(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (ut = e), (ot = gn(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (ut = e), (ot = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Gn !== null ? { id: Ut, overflow: Ht } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = ht(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (ut = e),
            (ot = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function ho(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function go(e) {
  if (ye) {
    var t = ot;
    if (t) {
      var n = t;
      if (!Xc(e, t)) {
        if (ho(e)) throw Error(I(418));
        t = gn(n.nextSibling);
        var r = ut;
        t && Xc(e, t)
          ? Sp(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (ye = !1), (ut = e));
      }
    } else {
      if (ho(e)) throw Error(I(418));
      ((e.flags = (e.flags & -4097) | 2), (ye = !1), (ut = e));
    }
  }
}
function qc(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  ut = e;
}
function fl(e) {
  if (e !== ut) return !1;
  if (!ye) return (qc(e), (ye = !0), !1);
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !co(e.type, e.memoizedProps))),
    t && (t = ot))
  ) {
    if (ho(e)) throw (Tp(), Error(I(418)));
    for (; t; ) (Sp(e, t), (t = gn(t.nextSibling)));
  }
  if ((qc(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(I(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              ot = gn(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      ot = null;
    }
  } else ot = ut ? gn(e.stateNode.nextSibling) : null;
  return !0;
}
function Tp() {
  for (var e = ot; e; ) e = gn(e.nextSibling);
}
function Nr() {
  ((ot = ut = null), (ye = !1));
}
function fu(e) {
  Tt === null ? (Tt = [e]) : Tt.push(e);
}
var kv = Xt.ReactCurrentBatchConfig;
function Xr(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(I(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(I(147, e));
      var i = r,
        l = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === l
        ? t.ref
        : ((t = function (a) {
            var s = i.refs;
            a === null ? delete s[l] : (s[l] = a);
          }),
          (t._stringRef = l),
          t);
    }
    if (typeof e != "string") throw Error(I(284));
    if (!n._owner) throw Error(I(290, e));
  }
  return e;
}
function pl(e, t) {
  throw (
    (e = Object.prototype.toString.call(t)),
    Error(
      I(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e,
      ),
    )
  );
}
function Jc(e) {
  var t = e._init;
  return t(e._payload);
}
function Ep(e) {
  function t(g, f) {
    if (e) {
      var m = g.deletions;
      m === null ? ((g.deletions = [f]), (g.flags |= 16)) : m.push(f);
    }
  }
  function n(g, f) {
    if (!e) return null;
    for (; f !== null; ) (t(g, f), (f = f.sibling));
    return null;
  }
  function r(g, f) {
    for (g = new Map(); f !== null; )
      (f.key !== null ? g.set(f.key, f) : g.set(f.index, f), (f = f.sibling));
    return g;
  }
  function i(g, f) {
    return ((g = wn(g, f)), (g.index = 0), (g.sibling = null), g);
  }
  function l(g, f, m) {
    return (
      (g.index = m),
      e
        ? ((m = g.alternate),
          m !== null
            ? ((m = m.index), m < f ? ((g.flags |= 2), f) : m)
            : ((g.flags |= 2), f))
        : ((g.flags |= 1048576), f)
    );
  }
  function a(g) {
    return (e && g.alternate === null && (g.flags |= 2), g);
  }
  function s(g, f, m, w) {
    return f === null || f.tag !== 6
      ? ((f = vs(m, g.mode, w)), (f.return = g), f)
      : ((f = i(f, m)), (f.return = g), f);
  }
  function o(g, f, m, w) {
    var T = m.type;
    return T === or
      ? d(g, f, m.props.children, w, m.key)
      : f !== null &&
          (f.elementType === T ||
            (typeof T == "object" &&
              T !== null &&
              T.$$typeof === ln &&
              Jc(T) === f.type))
        ? ((w = i(f, m.props)), (w.ref = Xr(g, f, m)), (w.return = g), w)
        : ((w = _l(m.type, m.key, m.props, null, g.mode, w)),
          (w.ref = Xr(g, f, m)),
          (w.return = g),
          w);
  }
  function c(g, f, m, w) {
    return f === null ||
      f.tag !== 4 ||
      f.stateNode.containerInfo !== m.containerInfo ||
      f.stateNode.implementation !== m.implementation
      ? ((f = xs(m, g.mode, w)), (f.return = g), f)
      : ((f = i(f, m.children || [])), (f.return = g), f);
  }
  function d(g, f, m, w, T) {
    return f === null || f.tag !== 7
      ? ((f = Vn(m, g.mode, w, T)), (f.return = g), f)
      : ((f = i(f, m)), (f.return = g), f);
  }
  function p(g, f, m) {
    if ((typeof f == "string" && f !== "") || typeof f == "number")
      return ((f = vs("" + f, g.mode, m)), (f.return = g), f);
    if (typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case nl:
          return (
            (m = _l(f.type, f.key, f.props, null, g.mode, m)),
            (m.ref = Xr(g, null, f)),
            (m.return = g),
            m
          );
        case sr:
          return ((f = xs(f, g.mode, m)), (f.return = g), f);
        case ln:
          var w = f._init;
          return p(g, w(f._payload), m);
      }
      if (ii(f) || $r(f))
        return ((f = Vn(f, g.mode, m, null)), (f.return = g), f);
      pl(g, f);
    }
    return null;
  }
  function h(g, f, m, w) {
    var T = f !== null ? f.key : null;
    if ((typeof m == "string" && m !== "") || typeof m == "number")
      return T !== null ? null : s(g, f, "" + m, w);
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case nl:
          return m.key === T ? o(g, f, m, w) : null;
        case sr:
          return m.key === T ? c(g, f, m, w) : null;
        case ln:
          return ((T = m._init), h(g, f, T(m._payload), w));
      }
      if (ii(m) || $r(m)) return T !== null ? null : d(g, f, m, w, null);
      pl(g, m);
    }
    return null;
  }
  function v(g, f, m, w, T) {
    if ((typeof w == "string" && w !== "") || typeof w == "number")
      return ((g = g.get(m) || null), s(f, g, "" + w, T));
    if (typeof w == "object" && w !== null) {
      switch (w.$$typeof) {
        case nl:
          return (
            (g = g.get(w.key === null ? m : w.key) || null),
            o(f, g, w, T)
          );
        case sr:
          return (
            (g = g.get(w.key === null ? m : w.key) || null),
            c(f, g, w, T)
          );
        case ln:
          var L = w._init;
          return v(g, f, m, L(w._payload), T);
      }
      if (ii(w) || $r(w)) return ((g = g.get(m) || null), d(f, g, w, T, null));
      pl(f, w);
    }
    return null;
  }
  function x(g, f, m, w) {
    for (
      var T = null, L = null, y = f, C = (f = 0), M = null;
      y !== null && C < m.length;
      C++
    ) {
      y.index > C ? ((M = y), (y = null)) : (M = y.sibling);
      var P = h(g, y, m[C], w);
      if (P === null) {
        y === null && (y = M);
        break;
      }
      (e && y && P.alternate === null && t(g, y),
        (f = l(P, f, C)),
        L === null ? (T = P) : (L.sibling = P),
        (L = P),
        (y = M));
    }
    if (C === m.length) return (n(g, y), ye && _n(g, C), T);
    if (y === null) {
      for (; C < m.length; C++)
        ((y = p(g, m[C], w)),
          y !== null &&
            ((f = l(y, f, C)),
            L === null ? (T = y) : (L.sibling = y),
            (L = y)));
      return (ye && _n(g, C), T);
    }
    for (y = r(g, y); C < m.length; C++)
      ((M = v(y, g, C, m[C], w)),
        M !== null &&
          (e && M.alternate !== null && y.delete(M.key === null ? C : M.key),
          (f = l(M, f, C)),
          L === null ? (T = M) : (L.sibling = M),
          (L = M)));
    return (
      e &&
        y.forEach(function (_) {
          return t(g, _);
        }),
      ye && _n(g, C),
      T
    );
  }
  function b(g, f, m, w) {
    var T = $r(m);
    if (typeof T != "function") throw Error(I(150));
    if (((m = T.call(m)), m == null)) throw Error(I(151));
    for (
      var L = (T = null), y = f, C = (f = 0), M = null, P = m.next();
      y !== null && !P.done;
      C++, P = m.next()
    ) {
      y.index > C ? ((M = y), (y = null)) : (M = y.sibling);
      var _ = h(g, y, P.value, w);
      if (_ === null) {
        y === null && (y = M);
        break;
      }
      (e && y && _.alternate === null && t(g, y),
        (f = l(_, f, C)),
        L === null ? (T = _) : (L.sibling = _),
        (L = _),
        (y = M));
    }
    if (P.done) return (n(g, y), ye && _n(g, C), T);
    if (y === null) {
      for (; !P.done; C++, P = m.next())
        ((P = p(g, P.value, w)),
          P !== null &&
            ((f = l(P, f, C)),
            L === null ? (T = P) : (L.sibling = P),
            (L = P)));
      return (ye && _n(g, C), T);
    }
    for (y = r(g, y); !P.done; C++, P = m.next())
      ((P = v(y, g, C, P.value, w)),
        P !== null &&
          (e && P.alternate !== null && y.delete(P.key === null ? C : P.key),
          (f = l(P, f, C)),
          L === null ? (T = P) : (L.sibling = P),
          (L = P)));
    return (
      e &&
        y.forEach(function (F) {
          return t(g, F);
        }),
      ye && _n(g, C),
      T
    );
  }
  function N(g, f, m, w) {
    if (
      (typeof m == "object" &&
        m !== null &&
        m.type === or &&
        m.key === null &&
        (m = m.props.children),
      typeof m == "object" && m !== null)
    ) {
      switch (m.$$typeof) {
        case nl:
          e: {
            for (var T = m.key, L = f; L !== null; ) {
              if (L.key === T) {
                if (((T = m.type), T === or)) {
                  if (L.tag === 7) {
                    (n(g, L.sibling),
                      (f = i(L, m.props.children)),
                      (f.return = g),
                      (g = f));
                    break e;
                  }
                } else if (
                  L.elementType === T ||
                  (typeof T == "object" &&
                    T !== null &&
                    T.$$typeof === ln &&
                    Jc(T) === L.type)
                ) {
                  (n(g, L.sibling),
                    (f = i(L, m.props)),
                    (f.ref = Xr(g, L, m)),
                    (f.return = g),
                    (g = f));
                  break e;
                }
                n(g, L);
                break;
              } else t(g, L);
              L = L.sibling;
            }
            m.type === or
              ? ((f = Vn(m.props.children, g.mode, w, m.key)),
                (f.return = g),
                (g = f))
              : ((w = _l(m.type, m.key, m.props, null, g.mode, w)),
                (w.ref = Xr(g, f, m)),
                (w.return = g),
                (g = w));
          }
          return a(g);
        case sr:
          e: {
            for (L = m.key; f !== null; ) {
              if (f.key === L)
                if (
                  f.tag === 4 &&
                  f.stateNode.containerInfo === m.containerInfo &&
                  f.stateNode.implementation === m.implementation
                ) {
                  (n(g, f.sibling),
                    (f = i(f, m.children || [])),
                    (f.return = g),
                    (g = f));
                  break e;
                } else {
                  n(g, f);
                  break;
                }
              else t(g, f);
              f = f.sibling;
            }
            ((f = xs(m, g.mode, w)), (f.return = g), (g = f));
          }
          return a(g);
        case ln:
          return ((L = m._init), N(g, f, L(m._payload), w));
      }
      if (ii(m)) return x(g, f, m, w);
      if ($r(m)) return b(g, f, m, w);
      pl(g, m);
    }
    return (typeof m == "string" && m !== "") || typeof m == "number"
      ? ((m = "" + m),
        f !== null && f.tag === 6
          ? (n(g, f.sibling), (f = i(f, m)), (f.return = g), (g = f))
          : (n(g, f), (f = vs(m, g.mode, w)), (f.return = g), (g = f)),
        a(g))
      : n(g, f);
  }
  return N;
}
var Mr = Ep(!0),
  jp = Ep(!1),
  Jl = En(null),
  Zl = null,
  gr = null,
  pu = null;
function mu() {
  pu = gr = Zl = null;
}
function hu(e) {
  var t = Jl.current;
  (ge(Jl), (e._currentValue = t));
}
function vo(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function Tr(e, t) {
  ((Zl = e),
    (pu = gr = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (tt = !0), (e.firstContext = null)));
}
function vt(e) {
  var t = e._currentValue;
  if (pu !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), gr === null)) {
      if (Zl === null) throw Error(I(308));
      ((gr = e), (Zl.dependencies = { lanes: 0, firstContext: e }));
    } else gr = gr.next = e;
  return t;
}
var Fn = null;
function gu(e) {
  Fn === null ? (Fn = [e]) : Fn.push(e);
}
function Cp(e, t, n, r) {
  var i = t.interleaved;
  return (
    i === null ? ((n.next = n), gu(t)) : ((n.next = i.next), (i.next = n)),
    (t.interleaved = n),
    Kt(e, r)
  );
}
function Kt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    ((e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return));
  return n.tag === 3 ? n.stateNode : null;
}
var an = !1;
function vu(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Pp(e, t) {
  ((e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      }));
}
function Vt(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function vn(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), se & 2)) {
    var i = r.pending;
    return (
      i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
      (r.pending = t),
      Kt(e, n)
    );
  }
  return (
    (i = r.interleaved),
    i === null ? ((t.next = t), gu(r)) : ((t.next = i.next), (i.next = t)),
    (r.interleaved = t),
    Kt(e, n)
  );
}
function kl(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), nu(e, n));
  }
}
function Zc(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var i = null,
      l = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var a = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        (l === null ? (i = l = a) : (l = l.next = a), (n = n.next));
      } while (n !== null);
      l === null ? (i = l = t) : (l = l.next = t);
    } else i = l = t;
    ((n = {
      baseState: r.baseState,
      firstBaseUpdate: i,
      lastBaseUpdate: l,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n));
    return;
  }
  ((e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t));
}
function ea(e, t, n, r) {
  var i = e.updateQueue;
  an = !1;
  var l = i.firstBaseUpdate,
    a = i.lastBaseUpdate,
    s = i.shared.pending;
  if (s !== null) {
    i.shared.pending = null;
    var o = s,
      c = o.next;
    ((o.next = null), a === null ? (l = c) : (a.next = c), (a = o));
    var d = e.alternate;
    d !== null &&
      ((d = d.updateQueue),
      (s = d.lastBaseUpdate),
      s !== a &&
        (s === null ? (d.firstBaseUpdate = c) : (s.next = c),
        (d.lastBaseUpdate = o)));
  }
  if (l !== null) {
    var p = i.baseState;
    ((a = 0), (d = c = o = null), (s = l));
    do {
      var h = s.lane,
        v = s.eventTime;
      if ((r & h) === h) {
        d !== null &&
          (d = d.next =
            {
              eventTime: v,
              lane: 0,
              tag: s.tag,
              payload: s.payload,
              callback: s.callback,
              next: null,
            });
        e: {
          var x = e,
            b = s;
          switch (((h = t), (v = n), b.tag)) {
            case 1:
              if (((x = b.payload), typeof x == "function")) {
                p = x.call(v, p, h);
                break e;
              }
              p = x;
              break e;
            case 3:
              x.flags = (x.flags & -65537) | 128;
            case 0:
              if (
                ((x = b.payload),
                (h = typeof x == "function" ? x.call(v, p, h) : x),
                h == null)
              )
                break e;
              p = Se({}, p, h);
              break e;
            case 2:
              an = !0;
          }
        }
        s.callback !== null &&
          s.lane !== 0 &&
          ((e.flags |= 64),
          (h = i.effects),
          h === null ? (i.effects = [s]) : h.push(s));
      } else
        ((v = {
          eventTime: v,
          lane: h,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null,
        }),
          d === null ? ((c = d = v), (o = p)) : (d = d.next = v),
          (a |= h));
      if (((s = s.next), s === null)) {
        if (((s = i.shared.pending), s === null)) break;
        ((h = s),
          (s = h.next),
          (h.next = null),
          (i.lastBaseUpdate = h),
          (i.shared.pending = null));
      }
    } while (!0);
    if (
      (d === null && (o = p),
      (i.baseState = o),
      (i.firstBaseUpdate = c),
      (i.lastBaseUpdate = d),
      (t = i.shared.interleaved),
      t !== null)
    ) {
      i = t;
      do ((a |= i.lane), (i = i.next));
      while (i !== t);
    } else l === null && (i.shared.lanes = 0);
    ((Yn |= a), (e.lanes = a), (e.memoizedState = p));
  }
}
function ed(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        i = r.callback;
      if (i !== null) {
        if (((r.callback = null), (r = n), typeof i != "function"))
          throw Error(I(191, i));
        i.call(r);
      }
    }
}
var Vi = {},
  _t = En(Vi),
  Li = En(Vi),
  Di = En(Vi);
function Bn(e) {
  if (e === Vi) throw Error(I(174));
  return e;
}
function xu(e, t) {
  switch ((me(Di, t), me(Li, e), me(_t, Vi), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Xs(null, "");
      break;
    default:
      ((e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = Xs(t, e)));
  }
  (ge(_t), me(_t, t));
}
function Lr() {
  (ge(_t), ge(Li), ge(Di));
}
function kp(e) {
  Bn(Di.current);
  var t = Bn(_t.current),
    n = Xs(t, e.type);
  t !== n && (me(Li, e), me(_t, n));
}
function yu(e) {
  Li.current === e && (ge(_t), ge(Li));
}
var we = En(0);
function ta(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      ((t.child.return = t), (t = t.child));
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    ((t.sibling.return = t.return), (t = t.sibling));
  }
  return null;
}
var ds = [];
function wu() {
  for (var e = 0; e < ds.length; e++)
    ds[e]._workInProgressVersionPrimary = null;
  ds.length = 0;
}
var Nl = Xt.ReactCurrentDispatcher,
  fs = Xt.ReactCurrentBatchConfig,
  Kn = 0,
  be = null,
  _e = null,
  Ie = null,
  na = !1,
  pi = !1,
  Ri = 0,
  Nv = 0;
function Ve() {
  throw Error(I(321));
}
function bu(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!Ct(e[n], t[n])) return !1;
  return !0;
}
function Su(e, t, n, r, i, l) {
  if (
    ((Kn = l),
    (be = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Nl.current = e === null || e.memoizedState === null ? Rv : _v),
    (e = n(r, i)),
    pi)
  ) {
    l = 0;
    do {
      if (((pi = !1), (Ri = 0), 25 <= l)) throw Error(I(301));
      ((l += 1),
        (Ie = _e = null),
        (t.updateQueue = null),
        (Nl.current = Ov),
        (e = n(r, i)));
    } while (pi);
  }
  if (
    ((Nl.current = ra),
    (t = _e !== null && _e.next !== null),
    (Kn = 0),
    (Ie = _e = be = null),
    (na = !1),
    t)
  )
    throw Error(I(300));
  return e;
}
function Tu() {
  var e = Ri !== 0;
  return ((Ri = 0), e);
}
function Mt() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return (Ie === null ? (be.memoizedState = Ie = e) : (Ie = Ie.next = e), Ie);
}
function xt() {
  if (_e === null) {
    var e = be.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = _e.next;
  var t = Ie === null ? be.memoizedState : Ie.next;
  if (t !== null) ((Ie = t), (_e = e));
  else {
    if (e === null) throw Error(I(310));
    ((_e = e),
      (e = {
        memoizedState: _e.memoizedState,
        baseState: _e.baseState,
        baseQueue: _e.baseQueue,
        queue: _e.queue,
        next: null,
      }),
      Ie === null ? (be.memoizedState = Ie = e) : (Ie = Ie.next = e));
  }
  return Ie;
}
function _i(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function ps(e) {
  var t = xt(),
    n = t.queue;
  if (n === null) throw Error(I(311));
  n.lastRenderedReducer = e;
  var r = _e,
    i = r.baseQueue,
    l = n.pending;
  if (l !== null) {
    if (i !== null) {
      var a = i.next;
      ((i.next = l.next), (l.next = a));
    }
    ((r.baseQueue = i = l), (n.pending = null));
  }
  if (i !== null) {
    ((l = i.next), (r = r.baseState));
    var s = (a = null),
      o = null,
      c = l;
    do {
      var d = c.lane;
      if ((Kn & d) === d)
        (o !== null &&
          (o = o.next =
            {
              lane: 0,
              action: c.action,
              hasEagerState: c.hasEagerState,
              eagerState: c.eagerState,
              next: null,
            }),
          (r = c.hasEagerState ? c.eagerState : e(r, c.action)));
      else {
        var p = {
          lane: d,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null,
        };
        (o === null ? ((s = o = p), (a = r)) : (o = o.next = p),
          (be.lanes |= d),
          (Yn |= d));
      }
      c = c.next;
    } while (c !== null && c !== l);
    (o === null ? (a = r) : (o.next = s),
      Ct(r, t.memoizedState) || (tt = !0),
      (t.memoizedState = r),
      (t.baseState = a),
      (t.baseQueue = o),
      (n.lastRenderedState = r));
  }
  if (((e = n.interleaved), e !== null)) {
    i = e;
    do ((l = i.lane), (be.lanes |= l), (Yn |= l), (i = i.next));
    while (i !== e);
  } else i === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function ms(e) {
  var t = xt(),
    n = t.queue;
  if (n === null) throw Error(I(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    i = n.pending,
    l = t.memoizedState;
  if (i !== null) {
    n.pending = null;
    var a = (i = i.next);
    do ((l = e(l, a.action)), (a = a.next));
    while (a !== i);
    (Ct(l, t.memoizedState) || (tt = !0),
      (t.memoizedState = l),
      t.baseQueue === null && (t.baseState = l),
      (n.lastRenderedState = l));
  }
  return [l, r];
}
function Np() {}
function Mp(e, t) {
  var n = be,
    r = xt(),
    i = t(),
    l = !Ct(r.memoizedState, i);
  if (
    (l && ((r.memoizedState = i), (tt = !0)),
    (r = r.queue),
    Eu(Rp.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || l || (Ie !== null && Ie.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      Oi(9, Dp.bind(null, n, r, i, t), void 0, null),
      Ae === null)
    )
      throw Error(I(349));
    Kn & 30 || Lp(n, t, i);
  }
  return i;
}
function Lp(e, t, n) {
  ((e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = be.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (be.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
}
function Dp(e, t, n, r) {
  ((t.value = n), (t.getSnapshot = r), _p(t) && Op(e));
}
function Rp(e, t, n) {
  return n(function () {
    _p(t) && Op(e);
  });
}
function _p(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Ct(e, n);
  } catch {
    return !0;
  }
}
function Op(e) {
  var t = Kt(e, 1);
  t !== null && jt(t, e, 1, -1);
}
function td(e) {
  var t = Mt();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: _i,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = Dv.bind(null, be, e)),
    [t.memoizedState, e]
  );
}
function Oi(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = be.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (be.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function Ip() {
  return xt().memoizedState;
}
function Ml(e, t, n, r) {
  var i = Mt();
  ((be.flags |= e),
    (i.memoizedState = Oi(1 | t, n, void 0, r === void 0 ? null : r)));
}
function Na(e, t, n, r) {
  var i = xt();
  r = r === void 0 ? null : r;
  var l = void 0;
  if (_e !== null) {
    var a = _e.memoizedState;
    if (((l = a.destroy), r !== null && bu(r, a.deps))) {
      i.memoizedState = Oi(t, n, l, r);
      return;
    }
  }
  ((be.flags |= e), (i.memoizedState = Oi(1 | t, n, l, r)));
}
function nd(e, t) {
  return Ml(8390656, 8, e, t);
}
function Eu(e, t) {
  return Na(2048, 8, e, t);
}
function Ap(e, t) {
  return Na(4, 2, e, t);
}
function zp(e, t) {
  return Na(4, 4, e, t);
}
function Fp(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function Bp(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null),
    Na(4, 4, Fp.bind(null, t, e), n)
  );
}
function ju() {}
function Up(e, t) {
  var n = xt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && bu(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function Hp(e, t) {
  var n = xt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && bu(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function Vp(e, t, n) {
  return Kn & 21
    ? (Ct(n, t) || ((n = Yf()), (be.lanes |= n), (Yn |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (tt = !0)), (e.memoizedState = n));
}
function Mv(e, t) {
  var n = fe;
  ((fe = n !== 0 && 4 > n ? n : 4), e(!0));
  var r = fs.transition;
  fs.transition = {};
  try {
    (e(!1), t());
  } finally {
    ((fe = n), (fs.transition = r));
  }
}
function Wp() {
  return xt().memoizedState;
}
function Lv(e, t, n) {
  var r = yn(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    $p(e))
  )
    Gp(t, n);
  else if (((n = Cp(e, t, n, r)), n !== null)) {
    var i = Qe();
    (jt(n, e, r, i), Kp(n, t, r));
  }
}
function Dv(e, t, n) {
  var r = yn(e),
    i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if ($p(e)) Gp(t, i);
  else {
    var l = e.alternate;
    if (
      e.lanes === 0 &&
      (l === null || l.lanes === 0) &&
      ((l = t.lastRenderedReducer), l !== null)
    )
      try {
        var a = t.lastRenderedState,
          s = l(a, n);
        if (((i.hasEagerState = !0), (i.eagerState = s), Ct(s, a))) {
          var o = t.interleaved;
          (o === null
            ? ((i.next = i), gu(t))
            : ((i.next = o.next), (o.next = i)),
            (t.interleaved = i));
          return;
        }
      } catch {
      } finally {
      }
    ((n = Cp(e, t, i, r)),
      n !== null && ((i = Qe()), jt(n, e, r, i), Kp(n, t, r)));
  }
}
function $p(e) {
  var t = e.alternate;
  return e === be || (t !== null && t === be);
}
function Gp(e, t) {
  pi = na = !0;
  var n = e.pending;
  (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t));
}
function Kp(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), nu(e, n));
  }
}
var ra = {
    readContext: vt,
    useCallback: Ve,
    useContext: Ve,
    useEffect: Ve,
    useImperativeHandle: Ve,
    useInsertionEffect: Ve,
    useLayoutEffect: Ve,
    useMemo: Ve,
    useReducer: Ve,
    useRef: Ve,
    useState: Ve,
    useDebugValue: Ve,
    useDeferredValue: Ve,
    useTransition: Ve,
    useMutableSource: Ve,
    useSyncExternalStore: Ve,
    useId: Ve,
    unstable_isNewReconciler: !1,
  },
  Rv = {
    readContext: vt,
    useCallback: function (e, t) {
      return ((Mt().memoizedState = [e, t === void 0 ? null : t]), e);
    },
    useContext: vt,
    useEffect: nd,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        Ml(4194308, 4, Fp.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return Ml(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Ml(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = Mt();
      return (
        (t = t === void 0 ? null : t),
        (e = e()),
        (n.memoizedState = [e, t]),
        e
      );
    },
    useReducer: function (e, t, n) {
      var r = Mt();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = Lv.bind(null, be, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = Mt();
      return ((e = { current: e }), (t.memoizedState = e));
    },
    useState: td,
    useDebugValue: ju,
    useDeferredValue: function (e) {
      return (Mt().memoizedState = e);
    },
    useTransition: function () {
      var e = td(!1),
        t = e[0];
      return ((e = Mv.bind(null, e[1])), (Mt().memoizedState = e), [t, e]);
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = be,
        i = Mt();
      if (ye) {
        if (n === void 0) throw Error(I(407));
        n = n();
      } else {
        if (((n = t()), Ae === null)) throw Error(I(349));
        Kn & 30 || Lp(r, t, n);
      }
      i.memoizedState = n;
      var l = { value: n, getSnapshot: t };
      return (
        (i.queue = l),
        nd(Rp.bind(null, r, l, e), [e]),
        (r.flags |= 2048),
        Oi(9, Dp.bind(null, r, l, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = Mt(),
        t = Ae.identifierPrefix;
      if (ye) {
        var n = Ht,
          r = Ut;
        ((n = (r & ~(1 << (32 - Et(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = Ri++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":"));
      } else ((n = Nv++), (t = ":" + t + "r" + n.toString(32) + ":"));
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  _v = {
    readContext: vt,
    useCallback: Up,
    useContext: vt,
    useEffect: Eu,
    useImperativeHandle: Bp,
    useInsertionEffect: Ap,
    useLayoutEffect: zp,
    useMemo: Hp,
    useReducer: ps,
    useRef: Ip,
    useState: function () {
      return ps(_i);
    },
    useDebugValue: ju,
    useDeferredValue: function (e) {
      var t = xt();
      return Vp(t, _e.memoizedState, e);
    },
    useTransition: function () {
      var e = ps(_i)[0],
        t = xt().memoizedState;
      return [e, t];
    },
    useMutableSource: Np,
    useSyncExternalStore: Mp,
    useId: Wp,
    unstable_isNewReconciler: !1,
  },
  Ov = {
    readContext: vt,
    useCallback: Up,
    useContext: vt,
    useEffect: Eu,
    useImperativeHandle: Bp,
    useInsertionEffect: Ap,
    useLayoutEffect: zp,
    useMemo: Hp,
    useReducer: ms,
    useRef: Ip,
    useState: function () {
      return ms(_i);
    },
    useDebugValue: ju,
    useDeferredValue: function (e) {
      var t = xt();
      return _e === null ? (t.memoizedState = e) : Vp(t, _e.memoizedState, e);
    },
    useTransition: function () {
      var e = ms(_i)[0],
        t = xt().memoizedState;
      return [e, t];
    },
    useMutableSource: Np,
    useSyncExternalStore: Mp,
    useId: Wp,
    unstable_isNewReconciler: !1,
  };
function wt(e, t) {
  if (e && e.defaultProps) {
    ((t = Se({}, t)), (e = e.defaultProps));
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function xo(e, t, n, r) {
  ((t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : Se({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n));
}
var Ma = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? er(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = Qe(),
      i = yn(e),
      l = Vt(r, i);
    ((l.payload = t),
      n != null && (l.callback = n),
      (t = vn(e, l, i)),
      t !== null && (jt(t, e, i, r), kl(t, e, i)));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = Qe(),
      i = yn(e),
      l = Vt(r, i);
    ((l.tag = 1),
      (l.payload = t),
      n != null && (l.callback = n),
      (t = vn(e, l, i)),
      t !== null && (jt(t, e, i, r), kl(t, e, i)));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = Qe(),
      r = yn(e),
      i = Vt(n, r);
    ((i.tag = 2),
      t != null && (i.callback = t),
      (t = vn(e, i, r)),
      t !== null && (jt(t, e, r, n), kl(t, e, r)));
  },
};
function rd(e, t, n, r, i, l, a) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, l, a)
      : t.prototype && t.prototype.isPureReactComponent
        ? !Pi(n, r) || !Pi(i, l)
        : !0
  );
}
function Yp(e, t, n) {
  var r = !1,
    i = Sn,
    l = t.contextType;
  return (
    typeof l == "object" && l !== null
      ? (l = vt(l))
      : ((i = rt(t) ? $n : Ge.current),
        (r = t.contextTypes),
        (l = (r = r != null) ? kr(e, i) : Sn)),
    (t = new t(n, l)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Ma),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = i),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    t
  );
}
function id(e, t, n, r) {
  ((e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Ma.enqueueReplaceState(t, t.state, null));
}
function yo(e, t, n, r) {
  var i = e.stateNode;
  ((i.props = n), (i.state = e.memoizedState), (i.refs = {}), vu(e));
  var l = t.contextType;
  (typeof l == "object" && l !== null
    ? (i.context = vt(l))
    : ((l = rt(t) ? $n : Ge.current), (i.context = kr(e, l))),
    (i.state = e.memoizedState),
    (l = t.getDerivedStateFromProps),
    typeof l == "function" && (xo(e, t, l, n), (i.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function" ||
      (typeof i.UNSAFE_componentWillMount != "function" &&
        typeof i.componentWillMount != "function") ||
      ((t = i.state),
      typeof i.componentWillMount == "function" && i.componentWillMount(),
      typeof i.UNSAFE_componentWillMount == "function" &&
        i.UNSAFE_componentWillMount(),
      t !== i.state && Ma.enqueueReplaceState(i, i.state, null),
      ea(e, n, i, r),
      (i.state = e.memoizedState)),
    typeof i.componentDidMount == "function" && (e.flags |= 4194308));
}
function Dr(e, t) {
  try {
    var n = "",
      r = t;
    do ((n += ug(r)), (r = r.return));
    while (r);
    var i = n;
  } catch (l) {
    i =
      `
Error generating stack: ` +
      l.message +
      `
` +
      l.stack;
  }
  return { value: e, source: t, stack: i, digest: null };
}
function hs(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function wo(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var Iv = typeof WeakMap == "function" ? WeakMap : Map;
function Qp(e, t, n) {
  ((n = Vt(-1, n)), (n.tag = 3), (n.payload = { element: null }));
  var r = t.value;
  return (
    (n.callback = function () {
      (la || ((la = !0), (Mo = r)), wo(e, t));
    }),
    n
  );
}
function Xp(e, t, n) {
  ((n = Vt(-1, n)), (n.tag = 3));
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var i = t.value;
    ((n.payload = function () {
      return r(i);
    }),
      (n.callback = function () {
        wo(e, t);
      }));
  }
  var l = e.stateNode;
  return (
    l !== null &&
      typeof l.componentDidCatch == "function" &&
      (n.callback = function () {
        (wo(e, t),
          typeof r != "function" &&
            (xn === null ? (xn = new Set([this])) : xn.add(this)));
        var a = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: a !== null ? a : "",
        });
      }),
    n
  );
}
function ld(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Iv();
    var i = new Set();
    r.set(t, i);
  } else ((i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i)));
  i.has(n) || (i.add(n), (e = Xv.bind(null, e, t, n)), t.then(e, e));
}
function ad(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function sd(e, t, n, r, i) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = i), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = Vt(-1, 1)), (t.tag = 2), vn(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var Av = Xt.ReactCurrentOwner,
  tt = !1;
function Ye(e, t, n, r) {
  t.child = e === null ? jp(t, null, n, r) : Mr(t, e.child, n, r);
}
function od(e, t, n, r, i) {
  n = n.render;
  var l = t.ref;
  return (
    Tr(t, i),
    (r = Su(e, t, n, r, l, i)),
    (n = Tu()),
    e !== null && !tt
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        Yt(e, t, i))
      : (ye && n && cu(t), (t.flags |= 1), Ye(e, t, r, i), t.child)
  );
}
function ud(e, t, n, r, i) {
  if (e === null) {
    var l = n.type;
    return typeof l == "function" &&
      !Ru(l) &&
      l.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = l), qp(e, t, l, r, i))
      : ((e = _l(n.type, null, r, t, t.mode, i)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((l = e.child), !(e.lanes & i))) {
    var a = l.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : Pi), n(a, r) && e.ref === t.ref)
    )
      return Yt(e, t, i);
  }
  return (
    (t.flags |= 1),
    (e = wn(l, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function qp(e, t, n, r, i) {
  if (e !== null) {
    var l = e.memoizedProps;
    if (Pi(l, r) && e.ref === t.ref)
      if (((tt = !1), (t.pendingProps = r = l), (e.lanes & i) !== 0))
        e.flags & 131072 && (tt = !0);
      else return ((t.lanes = e.lanes), Yt(e, t, i));
  }
  return bo(e, t, n, r, i);
}
function Jp(e, t, n) {
  var r = t.pendingProps,
    i = r.children,
    l = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        me(xr, lt),
        (lt |= n));
    else {
      if (!(n & 1073741824))
        return (
          (e = l !== null ? l.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          me(xr, lt),
          (lt |= e),
          null
        );
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = l !== null ? l.baseLanes : n),
        me(xr, lt),
        (lt |= r));
    }
  else
    (l !== null ? ((r = l.baseLanes | n), (t.memoizedState = null)) : (r = n),
      me(xr, lt),
      (lt |= r));
  return (Ye(e, t, i, n), t.child);
}
function Zp(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function bo(e, t, n, r, i) {
  var l = rt(n) ? $n : Ge.current;
  return (
    (l = kr(t, l)),
    Tr(t, i),
    (n = Su(e, t, n, r, l, i)),
    (r = Tu()),
    e !== null && !tt
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        Yt(e, t, i))
      : (ye && r && cu(t), (t.flags |= 1), Ye(e, t, n, i), t.child)
  );
}
function cd(e, t, n, r, i) {
  if (rt(n)) {
    var l = !0;
    Ql(t);
  } else l = !1;
  if ((Tr(t, i), t.stateNode === null))
    (Ll(e, t), Yp(t, n, r), yo(t, n, r, i), (r = !0));
  else if (e === null) {
    var a = t.stateNode,
      s = t.memoizedProps;
    a.props = s;
    var o = a.context,
      c = n.contextType;
    typeof c == "object" && c !== null
      ? (c = vt(c))
      : ((c = rt(n) ? $n : Ge.current), (c = kr(t, c)));
    var d = n.getDerivedStateFromProps,
      p =
        typeof d == "function" ||
        typeof a.getSnapshotBeforeUpdate == "function";
    (p ||
      (typeof a.UNSAFE_componentWillReceiveProps != "function" &&
        typeof a.componentWillReceiveProps != "function") ||
      ((s !== r || o !== c) && id(t, a, r, c)),
      (an = !1));
    var h = t.memoizedState;
    ((a.state = h),
      ea(t, r, a, i),
      (o = t.memoizedState),
      s !== r || h !== o || nt.current || an
        ? (typeof d == "function" && (xo(t, n, d, r), (o = t.memoizedState)),
          (s = an || rd(t, n, s, r, h, o, c))
            ? (p ||
                (typeof a.UNSAFE_componentWillMount != "function" &&
                  typeof a.componentWillMount != "function") ||
                (typeof a.componentWillMount == "function" &&
                  a.componentWillMount(),
                typeof a.UNSAFE_componentWillMount == "function" &&
                  a.UNSAFE_componentWillMount()),
              typeof a.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof a.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = o)),
          (a.props = r),
          (a.state = o),
          (a.context = c),
          (r = s))
        : (typeof a.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1)));
  } else {
    ((a = t.stateNode),
      Pp(e, t),
      (s = t.memoizedProps),
      (c = t.type === t.elementType ? s : wt(t.type, s)),
      (a.props = c),
      (p = t.pendingProps),
      (h = a.context),
      (o = n.contextType),
      typeof o == "object" && o !== null
        ? (o = vt(o))
        : ((o = rt(n) ? $n : Ge.current), (o = kr(t, o))));
    var v = n.getDerivedStateFromProps;
    ((d =
      typeof v == "function" ||
      typeof a.getSnapshotBeforeUpdate == "function") ||
      (typeof a.UNSAFE_componentWillReceiveProps != "function" &&
        typeof a.componentWillReceiveProps != "function") ||
      ((s !== p || h !== o) && id(t, a, r, o)),
      (an = !1),
      (h = t.memoizedState),
      (a.state = h),
      ea(t, r, a, i));
    var x = t.memoizedState;
    s !== p || h !== x || nt.current || an
      ? (typeof v == "function" && (xo(t, n, v, r), (x = t.memoizedState)),
        (c = an || rd(t, n, c, r, h, x, o) || !1)
          ? (d ||
              (typeof a.UNSAFE_componentWillUpdate != "function" &&
                typeof a.componentWillUpdate != "function") ||
              (typeof a.componentWillUpdate == "function" &&
                a.componentWillUpdate(r, x, o),
              typeof a.UNSAFE_componentWillUpdate == "function" &&
                a.UNSAFE_componentWillUpdate(r, x, o)),
            typeof a.componentDidUpdate == "function" && (t.flags |= 4),
            typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof a.componentDidUpdate != "function" ||
              (s === e.memoizedProps && h === e.memoizedState) ||
              (t.flags |= 4),
            typeof a.getSnapshotBeforeUpdate != "function" ||
              (s === e.memoizedProps && h === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = x)),
        (a.props = r),
        (a.state = x),
        (a.context = o),
        (r = c))
      : (typeof a.componentDidUpdate != "function" ||
          (s === e.memoizedProps && h === e.memoizedState) ||
          (t.flags |= 4),
        typeof a.getSnapshotBeforeUpdate != "function" ||
          (s === e.memoizedProps && h === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return So(e, t, n, r, l, i);
}
function So(e, t, n, r, i, l) {
  Zp(e, t);
  var a = (t.flags & 128) !== 0;
  if (!r && !a) return (i && Qc(t, n, !1), Yt(e, t, l));
  ((r = t.stateNode), (Av.current = t));
  var s =
    a && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && a
      ? ((t.child = Mr(t, e.child, null, l)), (t.child = Mr(t, null, s, l)))
      : Ye(e, t, s, l),
    (t.memoizedState = r.state),
    i && Qc(t, n, !0),
    t.child
  );
}
function em(e) {
  var t = e.stateNode;
  (t.pendingContext
    ? Yc(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && Yc(e, t.context, !1),
    xu(e, t.containerInfo));
}
function dd(e, t, n, r, i) {
  return (Nr(), fu(i), (t.flags |= 256), Ye(e, t, n, r), t.child);
}
var To = { dehydrated: null, treeContext: null, retryLane: 0 };
function Eo(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function tm(e, t, n) {
  var r = t.pendingProps,
    i = we.current,
    l = !1,
    a = (t.flags & 128) !== 0,
    s;
  if (
    ((s = a) ||
      (s = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
    s
      ? ((l = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (i |= 1),
    me(we, i & 1),
    e === null)
  )
    return (
      go(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((a = r.children),
          (e = r.fallback),
          l
            ? ((r = t.mode),
              (l = t.child),
              (a = { mode: "hidden", children: a }),
              !(r & 1) && l !== null
                ? ((l.childLanes = 0), (l.pendingProps = a))
                : (l = Ra(a, r, 0, null)),
              (e = Vn(e, r, n, null)),
              (l.return = t),
              (e.return = t),
              (l.sibling = e),
              (t.child = l),
              (t.child.memoizedState = Eo(n)),
              (t.memoizedState = To),
              e)
            : Cu(t, a))
    );
  if (((i = e.memoizedState), i !== null && ((s = i.dehydrated), s !== null)))
    return zv(e, t, a, r, s, i, n);
  if (l) {
    ((l = r.fallback), (a = t.mode), (i = e.child), (s = i.sibling));
    var o = { mode: "hidden", children: r.children };
    return (
      !(a & 1) && t.child !== i
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = o),
          (t.deletions = null))
        : ((r = wn(i, o)), (r.subtreeFlags = i.subtreeFlags & 14680064)),
      s !== null ? (l = wn(s, l)) : ((l = Vn(l, a, n, null)), (l.flags |= 2)),
      (l.return = t),
      (r.return = t),
      (r.sibling = l),
      (t.child = r),
      (r = l),
      (l = t.child),
      (a = e.child.memoizedState),
      (a =
        a === null
          ? Eo(n)
          : {
              baseLanes: a.baseLanes | n,
              cachePool: null,
              transitions: a.transitions,
            }),
      (l.memoizedState = a),
      (l.childLanes = e.childLanes & ~n),
      (t.memoizedState = To),
      r
    );
  }
  return (
    (l = e.child),
    (e = l.sibling),
    (r = wn(l, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function Cu(e, t) {
  return (
    (t = Ra({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function ml(e, t, n, r) {
  return (
    r !== null && fu(r),
    Mr(t, e.child, null, n),
    (e = Cu(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function zv(e, t, n, r, i, l, a) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = hs(Error(I(422)))), ml(e, t, a, r))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((l = r.fallback),
          (i = t.mode),
          (r = Ra({ mode: "visible", children: r.children }, i, 0, null)),
          (l = Vn(l, i, a, null)),
          (l.flags |= 2),
          (r.return = t),
          (l.return = t),
          (r.sibling = l),
          (t.child = r),
          t.mode & 1 && Mr(t, e.child, null, a),
          (t.child.memoizedState = Eo(a)),
          (t.memoizedState = To),
          l);
  if (!(t.mode & 1)) return ml(e, t, a, null);
  if (i.data === "$!") {
    if (((r = i.nextSibling && i.nextSibling.dataset), r)) var s = r.dgst;
    return (
      (r = s),
      (l = Error(I(419))),
      (r = hs(l, r, void 0)),
      ml(e, t, a, r)
    );
  }
  if (((s = (a & e.childLanes) !== 0), tt || s)) {
    if (((r = Ae), r !== null)) {
      switch (a & -a) {
        case 4:
          i = 2;
          break;
        case 16:
          i = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          i = 32;
          break;
        case 536870912:
          i = 268435456;
          break;
        default:
          i = 0;
      }
      ((i = i & (r.suspendedLanes | a) ? 0 : i),
        i !== 0 &&
          i !== l.retryLane &&
          ((l.retryLane = i), Kt(e, i), jt(r, e, i, -1)));
    }
    return (Du(), (r = hs(Error(I(421)))), ml(e, t, a, r));
  }
  return i.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = qv.bind(null, e)),
      (i._reactRetry = t),
      null)
    : ((e = l.treeContext),
      (ot = gn(i.nextSibling)),
      (ut = t),
      (ye = !0),
      (Tt = null),
      e !== null &&
        ((pt[mt++] = Ut),
        (pt[mt++] = Ht),
        (pt[mt++] = Gn),
        (Ut = e.id),
        (Ht = e.overflow),
        (Gn = t)),
      (t = Cu(t, r.children)),
      (t.flags |= 4096),
      t);
}
function fd(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  (r !== null && (r.lanes |= t), vo(e.return, t, n));
}
function gs(e, t, n, r, i) {
  var l = e.memoizedState;
  l === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: i,
      })
    : ((l.isBackwards = t),
      (l.rendering = null),
      (l.renderingStartTime = 0),
      (l.last = r),
      (l.tail = n),
      (l.tailMode = i));
}
function nm(e, t, n) {
  var r = t.pendingProps,
    i = r.revealOrder,
    l = r.tail;
  if ((Ye(e, t, r.children, n), (r = we.current), r & 2))
    ((r = (r & 1) | 2), (t.flags |= 128));
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && fd(e, n, t);
        else if (e.tag === 19) fd(e, n, t);
        else if (e.child !== null) {
          ((e.child.return = e), (e = e.child));
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    r &= 1;
  }
  if ((me(we, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (i) {
      case "forwards":
        for (n = t.child, i = null; n !== null; )
          ((e = n.alternate),
            e !== null && ta(e) === null && (i = n),
            (n = n.sibling));
        ((n = i),
          n === null
            ? ((i = t.child), (t.child = null))
            : ((i = n.sibling), (n.sibling = null)),
          gs(t, !1, i, n, l));
        break;
      case "backwards":
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (((e = i.alternate), e !== null && ta(e) === null)) {
            t.child = i;
            break;
          }
          ((e = i.sibling), (i.sibling = n), (n = i), (i = e));
        }
        gs(t, !0, n, null, l);
        break;
      case "together":
        gs(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Ll(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function Yt(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (Yn |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(I(153));
  if (t.child !== null) {
    for (
      e = t.child, n = wn(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;
    )
      ((e = e.sibling),
        (n = n.sibling = wn(e, e.pendingProps)),
        (n.return = t));
    n.sibling = null;
  }
  return t.child;
}
function Fv(e, t, n) {
  switch (t.tag) {
    case 3:
      (em(t), Nr());
      break;
    case 5:
      kp(t);
      break;
    case 1:
      rt(t.type) && Ql(t);
      break;
    case 4:
      xu(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        i = t.memoizedProps.value;
      (me(Jl, r._currentValue), (r._currentValue = i));
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (me(we, we.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? tm(e, t, n)
            : (me(we, we.current & 1),
              (e = Yt(e, t, n)),
              e !== null ? e.sibling : null);
      me(we, we.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return nm(e, t, n);
        t.flags |= 128;
      }
      if (
        ((i = t.memoizedState),
        i !== null &&
          ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
        me(we, we.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return ((t.lanes = 0), Jp(e, t, n));
  }
  return Yt(e, t, n);
}
var rm, jo, im, lm;
rm = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      ((n.child.return = n), (n = n.child));
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    ((n.sibling.return = n.return), (n = n.sibling));
  }
};
jo = function () {};
im = function (e, t, n, r) {
  var i = e.memoizedProps;
  if (i !== r) {
    ((e = t.stateNode), Bn(_t.current));
    var l = null;
    switch (n) {
      case "input":
        ((i = Gs(e, i)), (r = Gs(e, r)), (l = []));
        break;
      case "select":
        ((i = Se({}, i, { value: void 0 })),
          (r = Se({}, r, { value: void 0 })),
          (l = []));
        break;
      case "textarea":
        ((i = Qs(e, i)), (r = Qs(e, r)), (l = []));
        break;
      default:
        typeof i.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = Kl);
    }
    qs(n, r);
    var a;
    n = null;
    for (c in i)
      if (!r.hasOwnProperty(c) && i.hasOwnProperty(c) && i[c] != null)
        if (c === "style") {
          var s = i[c];
          for (a in s) s.hasOwnProperty(a) && (n || (n = {}), (n[a] = ""));
        } else
          c !== "dangerouslySetInnerHTML" &&
            c !== "children" &&
            c !== "suppressContentEditableWarning" &&
            c !== "suppressHydrationWarning" &&
            c !== "autoFocus" &&
            (wi.hasOwnProperty(c)
              ? l || (l = [])
              : (l = l || []).push(c, null));
    for (c in r) {
      var o = r[c];
      if (
        ((s = i != null ? i[c] : void 0),
        r.hasOwnProperty(c) && o !== s && (o != null || s != null))
      )
        if (c === "style")
          if (s) {
            for (a in s)
              !s.hasOwnProperty(a) ||
                (o && o.hasOwnProperty(a)) ||
                (n || (n = {}), (n[a] = ""));
            for (a in o)
              o.hasOwnProperty(a) &&
                s[a] !== o[a] &&
                (n || (n = {}), (n[a] = o[a]));
          } else (n || (l || (l = []), l.push(c, n)), (n = o));
        else
          c === "dangerouslySetInnerHTML"
            ? ((o = o ? o.__html : void 0),
              (s = s ? s.__html : void 0),
              o != null && s !== o && (l = l || []).push(c, o))
            : c === "children"
              ? (typeof o != "string" && typeof o != "number") ||
                (l = l || []).push(c, "" + o)
              : c !== "suppressContentEditableWarning" &&
                c !== "suppressHydrationWarning" &&
                (wi.hasOwnProperty(c)
                  ? (o != null && c === "onScroll" && he("scroll", e),
                    l || s === o || (l = []))
                  : (l = l || []).push(c, o));
    }
    n && (l = l || []).push("style", n);
    var c = l;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
lm = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function qr(e, t) {
  if (!ye)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          (t.alternate !== null && (n = t), (t = t.sibling));
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          (n.alternate !== null && (r = n), (n = n.sibling));
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function We(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var i = e.child; i !== null; )
      ((n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags & 14680064),
        (r |= i.flags & 14680064),
        (i.return = e),
        (i = i.sibling));
  else
    for (i = e.child; i !== null; )
      ((n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags),
        (r |= i.flags),
        (i.return = e),
        (i = i.sibling));
  return ((e.subtreeFlags |= r), (e.childLanes = n), t);
}
function Bv(e, t, n) {
  var r = t.pendingProps;
  switch ((du(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return (We(t), null);
    case 1:
      return (rt(t.type) && Yl(), We(t), null);
    case 3:
      return (
        (r = t.stateNode),
        Lr(),
        ge(nt),
        ge(Ge),
        wu(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (fl(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), Tt !== null && (Ro(Tt), (Tt = null)))),
        jo(e, t),
        We(t),
        null
      );
    case 5:
      yu(t);
      var i = Bn(Di.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        (im(e, t, n, r, i),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(I(166));
          return (We(t), null);
        }
        if (((e = Bn(_t.current)), fl(t))) {
          ((r = t.stateNode), (n = t.type));
          var l = t.memoizedProps;
          switch (((r[Lt] = t), (r[Mi] = l), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              (he("cancel", r), he("close", r));
              break;
            case "iframe":
            case "object":
            case "embed":
              he("load", r);
              break;
            case "video":
            case "audio":
              for (i = 0; i < ai.length; i++) he(ai[i], r);
              break;
            case "source":
              he("error", r);
              break;
            case "img":
            case "image":
            case "link":
              (he("error", r), he("load", r));
              break;
            case "details":
              he("toggle", r);
              break;
            case "input":
              (bc(r, l), he("invalid", r));
              break;
            case "select":
              ((r._wrapperState = { wasMultiple: !!l.multiple }),
                he("invalid", r));
              break;
            case "textarea":
              (Tc(r, l), he("invalid", r));
          }
          (qs(n, l), (i = null));
          for (var a in l)
            if (l.hasOwnProperty(a)) {
              var s = l[a];
              a === "children"
                ? typeof s == "string"
                  ? r.textContent !== s &&
                    (l.suppressHydrationWarning !== !0 &&
                      dl(r.textContent, s, e),
                    (i = ["children", s]))
                  : typeof s == "number" &&
                    r.textContent !== "" + s &&
                    (l.suppressHydrationWarning !== !0 &&
                      dl(r.textContent, s, e),
                    (i = ["children", "" + s]))
                : wi.hasOwnProperty(a) &&
                  s != null &&
                  a === "onScroll" &&
                  he("scroll", r);
            }
          switch (n) {
            case "input":
              (rl(r), Sc(r, l, !0));
              break;
            case "textarea":
              (rl(r), Ec(r));
              break;
            case "select":
            case "option":
              break;
            default:
              typeof l.onClick == "function" && (r.onclick = Kl);
          }
          ((r = i), (t.updateQueue = r), r !== null && (t.flags |= 4));
        } else {
          ((a = i.nodeType === 9 ? i : i.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = Rf(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = a.createElement("div")),
                  (e.innerHTML = "<script><\/script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                  ? (e = a.createElement(n, { is: r.is }))
                  : ((e = a.createElement(n)),
                    n === "select" &&
                      ((a = e),
                      r.multiple
                        ? (a.multiple = !0)
                        : r.size && (a.size = r.size)))
              : (e = a.createElementNS(e, n)),
            (e[Lt] = t),
            (e[Mi] = r),
            rm(e, t, !1, !1),
            (t.stateNode = e));
          e: {
            switch (((a = Js(n, r)), n)) {
              case "dialog":
                (he("cancel", e), he("close", e), (i = r));
                break;
              case "iframe":
              case "object":
              case "embed":
                (he("load", e), (i = r));
                break;
              case "video":
              case "audio":
                for (i = 0; i < ai.length; i++) he(ai[i], e);
                i = r;
                break;
              case "source":
                (he("error", e), (i = r));
                break;
              case "img":
              case "image":
              case "link":
                (he("error", e), he("load", e), (i = r));
                break;
              case "details":
                (he("toggle", e), (i = r));
                break;
              case "input":
                (bc(e, r), (i = Gs(e, r)), he("invalid", e));
                break;
              case "option":
                i = r;
                break;
              case "select":
                ((e._wrapperState = { wasMultiple: !!r.multiple }),
                  (i = Se({}, r, { value: void 0 })),
                  he("invalid", e));
                break;
              case "textarea":
                (Tc(e, r), (i = Qs(e, r)), he("invalid", e));
                break;
              default:
                i = r;
            }
            (qs(n, i), (s = i));
            for (l in s)
              if (s.hasOwnProperty(l)) {
                var o = s[l];
                l === "style"
                  ? If(e, o)
                  : l === "dangerouslySetInnerHTML"
                    ? ((o = o ? o.__html : void 0), o != null && _f(e, o))
                    : l === "children"
                      ? typeof o == "string"
                        ? (n !== "textarea" || o !== "") && bi(e, o)
                        : typeof o == "number" && bi(e, "" + o)
                      : l !== "suppressContentEditableWarning" &&
                        l !== "suppressHydrationWarning" &&
                        l !== "autoFocus" &&
                        (wi.hasOwnProperty(l)
                          ? o != null && l === "onScroll" && he("scroll", e)
                          : o != null && Xo(e, l, o, a));
              }
            switch (n) {
              case "input":
                (rl(e), Sc(e, r, !1));
                break;
              case "textarea":
                (rl(e), Ec(e));
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + bn(r.value));
                break;
              case "select":
                ((e.multiple = !!r.multiple),
                  (l = r.value),
                  l != null
                    ? yr(e, !!r.multiple, l, !1)
                    : r.defaultValue != null &&
                      yr(e, !!r.multiple, r.defaultValue, !0));
                break;
              default:
                typeof i.onClick == "function" && (e.onclick = Kl);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return (We(t), null);
    case 6:
      if (e && t.stateNode != null) lm(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(I(166));
        if (((n = Bn(Di.current)), Bn(_t.current), fl(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[Lt] = t),
            (l = r.nodeValue !== n) && ((e = ut), e !== null))
          )
            switch (e.tag) {
              case 3:
                dl(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  dl(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          l && (t.flags |= 4);
        } else
          ((r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[Lt] = t),
            (t.stateNode = r));
      }
      return (We(t), null);
    case 13:
      if (
        (ge(we),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (ye && ot !== null && t.mode & 1 && !(t.flags & 128))
          (Tp(), Nr(), (t.flags |= 98560), (l = !1));
        else if (((l = fl(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!l) throw Error(I(318));
            if (
              ((l = t.memoizedState),
              (l = l !== null ? l.dehydrated : null),
              !l)
            )
              throw Error(I(317));
            l[Lt] = t;
          } else
            (Nr(),
              !(t.flags & 128) && (t.memoizedState = null),
              (t.flags |= 4));
          (We(t), (l = !1));
        } else (Tt !== null && (Ro(Tt), (Tt = null)), (l = !0));
        if (!l) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || we.current & 1 ? Oe === 0 && (Oe = 3) : Du())),
          t.updateQueue !== null && (t.flags |= 4),
          We(t),
          null);
    case 4:
      return (
        Lr(),
        jo(e, t),
        e === null && ki(t.stateNode.containerInfo),
        We(t),
        null
      );
    case 10:
      return (hu(t.type._context), We(t), null);
    case 17:
      return (rt(t.type) && Yl(), We(t), null);
    case 19:
      if ((ge(we), (l = t.memoizedState), l === null)) return (We(t), null);
      if (((r = (t.flags & 128) !== 0), (a = l.rendering), a === null))
        if (r) qr(l, !1);
        else {
          if (Oe !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((a = ta(e)), a !== null)) {
                for (
                  t.flags |= 128,
                    qr(l, !1),
                    r = a.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;
                )
                  ((l = n),
                    (e = r),
                    (l.flags &= 14680066),
                    (a = l.alternate),
                    a === null
                      ? ((l.childLanes = 0),
                        (l.lanes = e),
                        (l.child = null),
                        (l.subtreeFlags = 0),
                        (l.memoizedProps = null),
                        (l.memoizedState = null),
                        (l.updateQueue = null),
                        (l.dependencies = null),
                        (l.stateNode = null))
                      : ((l.childLanes = a.childLanes),
                        (l.lanes = a.lanes),
                        (l.child = a.child),
                        (l.subtreeFlags = 0),
                        (l.deletions = null),
                        (l.memoizedProps = a.memoizedProps),
                        (l.memoizedState = a.memoizedState),
                        (l.updateQueue = a.updateQueue),
                        (l.type = a.type),
                        (e = a.dependencies),
                        (l.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling));
                return (me(we, (we.current & 1) | 2), t.child);
              }
              e = e.sibling;
            }
          l.tail !== null &&
            ke() > Rr &&
            ((t.flags |= 128), (r = !0), qr(l, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = ta(a)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              qr(l, !0),
              l.tail === null && l.tailMode === "hidden" && !a.alternate && !ye)
            )
              return (We(t), null);
          } else
            2 * ke() - l.renderingStartTime > Rr &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), qr(l, !1), (t.lanes = 4194304));
        l.isBackwards
          ? ((a.sibling = t.child), (t.child = a))
          : ((n = l.last),
            n !== null ? (n.sibling = a) : (t.child = a),
            (l.last = a));
      }
      return l.tail !== null
        ? ((t = l.tail),
          (l.rendering = t),
          (l.tail = t.sibling),
          (l.renderingStartTime = ke()),
          (t.sibling = null),
          (n = we.current),
          me(we, r ? (n & 1) | 2 : n & 1),
          t)
        : (We(t), null);
    case 22:
    case 23:
      return (
        Lu(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? lt & 1073741824 && (We(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : We(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(I(156, t.tag));
}
function Uv(e, t) {
  switch ((du(t), t.tag)) {
    case 1:
      return (
        rt(t.type) && Yl(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Lr(),
        ge(nt),
        ge(Ge),
        wu(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return (yu(t), null);
    case 13:
      if (
        (ge(we), (e = t.memoizedState), e !== null && e.dehydrated !== null)
      ) {
        if (t.alternate === null) throw Error(I(340));
        Nr();
      }
      return (
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return (ge(we), null);
    case 4:
      return (Lr(), null);
    case 10:
      return (hu(t.type._context), null);
    case 22:
    case 23:
      return (Lu(), null);
    case 24:
      return null;
    default:
      return null;
  }
}
var hl = !1,
  $e = !1,
  Hv = typeof WeakSet == "function" ? WeakSet : Set,
  U = null;
function vr(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        Ce(e, t, r);
      }
    else n.current = null;
}
function Co(e, t, n) {
  try {
    n();
  } catch (r) {
    Ce(e, t, r);
  }
}
var pd = !1;
function Vv(e, t) {
  if (((oo = Wl), (e = cp()), uu(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var i = r.anchorOffset,
            l = r.focusNode;
          r = r.focusOffset;
          try {
            (n.nodeType, l.nodeType);
          } catch {
            n = null;
            break e;
          }
          var a = 0,
            s = -1,
            o = -1,
            c = 0,
            d = 0,
            p = e,
            h = null;
          t: for (;;) {
            for (
              var v;
              p !== n || (i !== 0 && p.nodeType !== 3) || (s = a + i),
                p !== l || (r !== 0 && p.nodeType !== 3) || (o = a + r),
                p.nodeType === 3 && (a += p.nodeValue.length),
                (v = p.firstChild) !== null;
            )
              ((h = p), (p = v));
            for (;;) {
              if (p === e) break t;
              if (
                (h === n && ++c === i && (s = a),
                h === l && ++d === r && (o = a),
                (v = p.nextSibling) !== null)
              )
                break;
              ((p = h), (h = p.parentNode));
            }
            p = v;
          }
          n = s === -1 || o === -1 ? null : { start: s, end: o };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (uo = { focusedElem: e, selectionRange: n }, Wl = !1, U = t; U !== null; )
    if (((t = U), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      ((e.return = t), (U = e));
    else
      for (; U !== null; ) {
        t = U;
        try {
          var x = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (x !== null) {
                  var b = x.memoizedProps,
                    N = x.memoizedState,
                    g = t.stateNode,
                    f = g.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? b : wt(t.type, b),
                      N,
                    );
                  g.__reactInternalSnapshotBeforeUpdate = f;
                }
                break;
              case 3:
                var m = t.stateNode.containerInfo;
                m.nodeType === 1
                  ? (m.textContent = "")
                  : m.nodeType === 9 &&
                    m.documentElement &&
                    m.removeChild(m.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(I(163));
            }
        } catch (w) {
          Ce(t, t.return, w);
        }
        if (((e = t.sibling), e !== null)) {
          ((e.return = t.return), (U = e));
          break;
        }
        U = t.return;
      }
  return ((x = pd), (pd = !1), x);
}
function mi(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var i = (r = r.next);
    do {
      if ((i.tag & e) === e) {
        var l = i.destroy;
        ((i.destroy = void 0), l !== void 0 && Co(t, n, l));
      }
      i = i.next;
    } while (i !== r);
  }
}
function La(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Po(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function am(e) {
  var t = e.alternate;
  (t !== null && ((e.alternate = null), am(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[Lt], delete t[Mi], delete t[po], delete t[jv], delete t[Cv])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null));
}
function sm(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function md(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || sm(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      ((e.child.return = e), (e = e.child));
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function ko(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    ((e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = Kl)));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (ko(e, t, n), e = e.sibling; e !== null; )
      (ko(e, t, n), (e = e.sibling));
}
function No(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (No(e, t, n), e = e.sibling; e !== null; )
      (No(e, t, n), (e = e.sibling));
}
var Fe = null,
  bt = !1;
function en(e, t, n) {
  for (n = n.child; n !== null; ) (om(e, t, n), (n = n.sibling));
}
function om(e, t, n) {
  if (Rt && typeof Rt.onCommitFiberUnmount == "function")
    try {
      Rt.onCommitFiberUnmount(Ta, n);
    } catch {}
  switch (n.tag) {
    case 5:
      $e || vr(n, t);
    case 6:
      var r = Fe,
        i = bt;
      ((Fe = null),
        en(e, t, n),
        (Fe = r),
        (bt = i),
        Fe !== null &&
          (bt
            ? ((e = Fe),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : Fe.removeChild(n.stateNode)));
      break;
    case 18:
      Fe !== null &&
        (bt
          ? ((e = Fe),
            (n = n.stateNode),
            e.nodeType === 8
              ? us(e.parentNode, n)
              : e.nodeType === 1 && us(e, n),
            ji(e))
          : us(Fe, n.stateNode));
      break;
    case 4:
      ((r = Fe),
        (i = bt),
        (Fe = n.stateNode.containerInfo),
        (bt = !0),
        en(e, t, n),
        (Fe = r),
        (bt = i));
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !$e &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        i = r = r.next;
        do {
          var l = i,
            a = l.destroy;
          ((l = l.tag),
            a !== void 0 && (l & 2 || l & 4) && Co(n, t, a),
            (i = i.next));
        } while (i !== r);
      }
      en(e, t, n);
      break;
    case 1:
      if (
        !$e &&
        (vr(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          ((r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount());
        } catch (s) {
          Ce(n, t, s);
        }
      en(e, t, n);
      break;
    case 21:
      en(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? (($e = (r = $e) || n.memoizedState !== null), en(e, t, n), ($e = r))
        : en(e, t, n);
      break;
    default:
      en(e, t, n);
  }
}
function hd(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    (n === null && (n = e.stateNode = new Hv()),
      t.forEach(function (r) {
        var i = Jv.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(i, i));
      }));
  }
}
function yt(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      try {
        var l = e,
          a = t,
          s = a;
        e: for (; s !== null; ) {
          switch (s.tag) {
            case 5:
              ((Fe = s.stateNode), (bt = !1));
              break e;
            case 3:
              ((Fe = s.stateNode.containerInfo), (bt = !0));
              break e;
            case 4:
              ((Fe = s.stateNode.containerInfo), (bt = !0));
              break e;
          }
          s = s.return;
        }
        if (Fe === null) throw Error(I(160));
        (om(l, a, i), (Fe = null), (bt = !1));
        var o = i.alternate;
        (o !== null && (o.return = null), (i.return = null));
      } catch (c) {
        Ce(i, t, c);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) (um(t, e), (t = t.sibling));
}
function um(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((yt(t, e), Nt(e), r & 4)) {
        try {
          (mi(3, e, e.return), La(3, e));
        } catch (b) {
          Ce(e, e.return, b);
        }
        try {
          mi(5, e, e.return);
        } catch (b) {
          Ce(e, e.return, b);
        }
      }
      break;
    case 1:
      (yt(t, e), Nt(e), r & 512 && n !== null && vr(n, n.return));
      break;
    case 5:
      if (
        (yt(t, e),
        Nt(e),
        r & 512 && n !== null && vr(n, n.return),
        e.flags & 32)
      ) {
        var i = e.stateNode;
        try {
          bi(i, "");
        } catch (b) {
          Ce(e, e.return, b);
        }
      }
      if (r & 4 && ((i = e.stateNode), i != null)) {
        var l = e.memoizedProps,
          a = n !== null ? n.memoizedProps : l,
          s = e.type,
          o = e.updateQueue;
        if (((e.updateQueue = null), o !== null))
          try {
            (s === "input" && l.type === "radio" && l.name != null && Lf(i, l),
              Js(s, a));
            var c = Js(s, l);
            for (a = 0; a < o.length; a += 2) {
              var d = o[a],
                p = o[a + 1];
              d === "style"
                ? If(i, p)
                : d === "dangerouslySetInnerHTML"
                  ? _f(i, p)
                  : d === "children"
                    ? bi(i, p)
                    : Xo(i, d, p, c);
            }
            switch (s) {
              case "input":
                Ks(i, l);
                break;
              case "textarea":
                Df(i, l);
                break;
              case "select":
                var h = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!l.multiple;
                var v = l.value;
                v != null
                  ? yr(i, !!l.multiple, v, !1)
                  : h !== !!l.multiple &&
                    (l.defaultValue != null
                      ? yr(i, !!l.multiple, l.defaultValue, !0)
                      : yr(i, !!l.multiple, l.multiple ? [] : "", !1));
            }
            i[Mi] = l;
          } catch (b) {
            Ce(e, e.return, b);
          }
      }
      break;
    case 6:
      if ((yt(t, e), Nt(e), r & 4)) {
        if (e.stateNode === null) throw Error(I(162));
        ((i = e.stateNode), (l = e.memoizedProps));
        try {
          i.nodeValue = l;
        } catch (b) {
          Ce(e, e.return, b);
        }
      }
      break;
    case 3:
      if (
        (yt(t, e), Nt(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          ji(t.containerInfo);
        } catch (b) {
          Ce(e, e.return, b);
        }
      break;
    case 4:
      (yt(t, e), Nt(e));
      break;
    case 13:
      (yt(t, e),
        Nt(e),
        (i = e.child),
        i.flags & 8192 &&
          ((l = i.memoizedState !== null),
          (i.stateNode.isHidden = l),
          !l ||
            (i.alternate !== null && i.alternate.memoizedState !== null) ||
            (Nu = ke())),
        r & 4 && hd(e));
      break;
    case 22:
      if (
        ((d = n !== null && n.memoizedState !== null),
        e.mode & 1 ? (($e = (c = $e) || d), yt(t, e), ($e = c)) : yt(t, e),
        Nt(e),
        r & 8192)
      ) {
        if (
          ((c = e.memoizedState !== null),
          (e.stateNode.isHidden = c) && !d && e.mode & 1)
        )
          for (U = e, d = e.child; d !== null; ) {
            for (p = U = d; U !== null; ) {
              switch (((h = U), (v = h.child), h.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  mi(4, h, h.return);
                  break;
                case 1:
                  vr(h, h.return);
                  var x = h.stateNode;
                  if (typeof x.componentWillUnmount == "function") {
                    ((r = h), (n = h.return));
                    try {
                      ((t = r),
                        (x.props = t.memoizedProps),
                        (x.state = t.memoizedState),
                        x.componentWillUnmount());
                    } catch (b) {
                      Ce(r, n, b);
                    }
                  }
                  break;
                case 5:
                  vr(h, h.return);
                  break;
                case 22:
                  if (h.memoizedState !== null) {
                    vd(p);
                    continue;
                  }
              }
              v !== null ? ((v.return = h), (U = v)) : vd(p);
            }
            d = d.sibling;
          }
        e: for (d = null, p = e; ; ) {
          if (p.tag === 5) {
            if (d === null) {
              d = p;
              try {
                ((i = p.stateNode),
                  c
                    ? ((l = i.style),
                      typeof l.setProperty == "function"
                        ? l.setProperty("display", "none", "important")
                        : (l.display = "none"))
                    : ((s = p.stateNode),
                      (o = p.memoizedProps.style),
                      (a =
                        o != null && o.hasOwnProperty("display")
                          ? o.display
                          : null),
                      (s.style.display = Of("display", a))));
              } catch (b) {
                Ce(e, e.return, b);
              }
            }
          } else if (p.tag === 6) {
            if (d === null)
              try {
                p.stateNode.nodeValue = c ? "" : p.memoizedProps;
              } catch (b) {
                Ce(e, e.return, b);
              }
          } else if (
            ((p.tag !== 22 && p.tag !== 23) ||
              p.memoizedState === null ||
              p === e) &&
            p.child !== null
          ) {
            ((p.child.return = p), (p = p.child));
            continue;
          }
          if (p === e) break e;
          for (; p.sibling === null; ) {
            if (p.return === null || p.return === e) break e;
            (d === p && (d = null), (p = p.return));
          }
          (d === p && (d = null),
            (p.sibling.return = p.return),
            (p = p.sibling));
        }
      }
      break;
    case 19:
      (yt(t, e), Nt(e), r & 4 && hd(e));
      break;
    case 21:
      break;
    default:
      (yt(t, e), Nt(e));
  }
}
function Nt(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (sm(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(I(160));
      }
      switch (r.tag) {
        case 5:
          var i = r.stateNode;
          r.flags & 32 && (bi(i, ""), (r.flags &= -33));
          var l = md(e);
          No(e, l, i);
          break;
        case 3:
        case 4:
          var a = r.stateNode.containerInfo,
            s = md(e);
          ko(e, s, a);
          break;
        default:
          throw Error(I(161));
      }
    } catch (o) {
      Ce(e, e.return, o);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Wv(e, t, n) {
  ((U = e), cm(e));
}
function cm(e, t, n) {
  for (var r = (e.mode & 1) !== 0; U !== null; ) {
    var i = U,
      l = i.child;
    if (i.tag === 22 && r) {
      var a = i.memoizedState !== null || hl;
      if (!a) {
        var s = i.alternate,
          o = (s !== null && s.memoizedState !== null) || $e;
        s = hl;
        var c = $e;
        if (((hl = a), ($e = o) && !c))
          for (U = i; U !== null; )
            ((a = U),
              (o = a.child),
              a.tag === 22 && a.memoizedState !== null
                ? xd(i)
                : o !== null
                  ? ((o.return = a), (U = o))
                  : xd(i));
        for (; l !== null; ) ((U = l), cm(l), (l = l.sibling));
        ((U = i), (hl = s), ($e = c));
      }
      gd(e);
    } else
      i.subtreeFlags & 8772 && l !== null ? ((l.return = i), (U = l)) : gd(e);
  }
}
function gd(e) {
  for (; U !== null; ) {
    var t = U;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              $e || La(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !$e)
                if (n === null) r.componentDidMount();
                else {
                  var i =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : wt(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    i,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate,
                  );
                }
              var l = t.updateQueue;
              l !== null && ed(t, l, r);
              break;
            case 3:
              var a = t.updateQueue;
              if (a !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                ed(t, a, n);
              }
              break;
            case 5:
              var s = t.stateNode;
              if (n === null && t.flags & 4) {
                n = s;
                var o = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    o.autoFocus && n.focus();
                    break;
                  case "img":
                    o.src && (n.src = o.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var c = t.alternate;
                if (c !== null) {
                  var d = c.memoizedState;
                  if (d !== null) {
                    var p = d.dehydrated;
                    p !== null && ji(p);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(I(163));
          }
        $e || (t.flags & 512 && Po(t));
      } catch (h) {
        Ce(t, t.return, h);
      }
    }
    if (t === e) {
      U = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      ((n.return = t.return), (U = n));
      break;
    }
    U = t.return;
  }
}
function vd(e) {
  for (; U !== null; ) {
    var t = U;
    if (t === e) {
      U = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      ((n.return = t.return), (U = n));
      break;
    }
    U = t.return;
  }
}
function xd(e) {
  for (; U !== null; ) {
    var t = U;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            La(4, t);
          } catch (o) {
            Ce(t, n, o);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var i = t.return;
            try {
              r.componentDidMount();
            } catch (o) {
              Ce(t, i, o);
            }
          }
          var l = t.return;
          try {
            Po(t);
          } catch (o) {
            Ce(t, l, o);
          }
          break;
        case 5:
          var a = t.return;
          try {
            Po(t);
          } catch (o) {
            Ce(t, a, o);
          }
      }
    } catch (o) {
      Ce(t, t.return, o);
    }
    if (t === e) {
      U = null;
      break;
    }
    var s = t.sibling;
    if (s !== null) {
      ((s.return = t.return), (U = s));
      break;
    }
    U = t.return;
  }
}
var $v = Math.ceil,
  ia = Xt.ReactCurrentDispatcher,
  Pu = Xt.ReactCurrentOwner,
  gt = Xt.ReactCurrentBatchConfig,
  se = 0,
  Ae = null,
  Le = null,
  Ue = 0,
  lt = 0,
  xr = En(0),
  Oe = 0,
  Ii = null,
  Yn = 0,
  Da = 0,
  ku = 0,
  hi = null,
  et = null,
  Nu = 0,
  Rr = 1 / 0,
  Ft = null,
  la = !1,
  Mo = null,
  xn = null,
  gl = !1,
  cn = null,
  aa = 0,
  gi = 0,
  Lo = null,
  Dl = -1,
  Rl = 0;
function Qe() {
  return se & 6 ? ke() : Dl !== -1 ? Dl : (Dl = ke());
}
function yn(e) {
  return e.mode & 1
    ? se & 2 && Ue !== 0
      ? Ue & -Ue
      : kv.transition !== null
        ? (Rl === 0 && (Rl = Yf()), Rl)
        : ((e = fe),
          e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : tp(e.type))),
          e)
    : 1;
}
function jt(e, t, n, r) {
  if (50 < gi) throw ((gi = 0), (Lo = null), Error(I(185)));
  (Bi(e, n, r),
    (!(se & 2) || e !== Ae) &&
      (e === Ae && (!(se & 2) && (Da |= n), Oe === 4 && on(e, Ue)),
      it(e, r),
      n === 1 && se === 0 && !(t.mode & 1) && ((Rr = ke() + 500), ka && jn())));
}
function it(e, t) {
  var n = e.callbackNode;
  kg(e, t);
  var r = Vl(e, e === Ae ? Ue : 0);
  if (r === 0)
    (n !== null && Pc(n), (e.callbackNode = null), (e.callbackPriority = 0));
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && Pc(n), t === 1))
      (e.tag === 0 ? Pv(yd.bind(null, e)) : wp(yd.bind(null, e)),
        Tv(function () {
          !(se & 6) && jn();
        }),
        (n = null));
    else {
      switch (Qf(r)) {
        case 1:
          n = tu;
          break;
        case 4:
          n = Gf;
          break;
        case 16:
          n = Hl;
          break;
        case 536870912:
          n = Kf;
          break;
        default:
          n = Hl;
      }
      n = xm(n, dm.bind(null, e));
    }
    ((e.callbackPriority = t), (e.callbackNode = n));
  }
}
function dm(e, t) {
  if (((Dl = -1), (Rl = 0), se & 6)) throw Error(I(327));
  var n = e.callbackNode;
  if (Er() && e.callbackNode !== n) return null;
  var r = Vl(e, e === Ae ? Ue : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = sa(e, r);
  else {
    t = r;
    var i = se;
    se |= 2;
    var l = pm();
    (Ae !== e || Ue !== t) && ((Ft = null), (Rr = ke() + 500), Hn(e, t));
    do
      try {
        Yv();
        break;
      } catch (s) {
        fm(e, s);
      }
    while (!0);
    (mu(),
      (ia.current = l),
      (se = i),
      Le !== null ? (t = 0) : ((Ae = null), (Ue = 0), (t = Oe)));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((i = ro(e)), i !== 0 && ((r = i), (t = Do(e, i)))), t === 1)
    )
      throw ((n = Ii), Hn(e, 0), on(e, r), it(e, ke()), n);
    if (t === 6) on(e, r);
    else {
      if (
        ((i = e.current.alternate),
        !(r & 30) &&
          !Gv(i) &&
          ((t = sa(e, r)),
          t === 2 && ((l = ro(e)), l !== 0 && ((r = l), (t = Do(e, l)))),
          t === 1))
      )
        throw ((n = Ii), Hn(e, 0), on(e, r), it(e, ke()), n);
      switch (((e.finishedWork = i), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(I(345));
        case 2:
          On(e, et, Ft);
          break;
        case 3:
          if (
            (on(e, r), (r & 130023424) === r && ((t = Nu + 500 - ke()), 10 < t))
          ) {
            if (Vl(e, 0) !== 0) break;
            if (((i = e.suspendedLanes), (i & r) !== r)) {
              (Qe(), (e.pingedLanes |= e.suspendedLanes & i));
              break;
            }
            e.timeoutHandle = fo(On.bind(null, e, et, Ft), t);
            break;
          }
          On(e, et, Ft);
          break;
        case 4:
          if ((on(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, i = -1; 0 < r; ) {
            var a = 31 - Et(r);
            ((l = 1 << a), (a = t[a]), a > i && (i = a), (r &= ~l));
          }
          if (
            ((r = i),
            (r = ke() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                  ? 480
                  : 1080 > r
                    ? 1080
                    : 1920 > r
                      ? 1920
                      : 3e3 > r
                        ? 3e3
                        : 4320 > r
                          ? 4320
                          : 1960 * $v(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = fo(On.bind(null, e, et, Ft), r);
            break;
          }
          On(e, et, Ft);
          break;
        case 5:
          On(e, et, Ft);
          break;
        default:
          throw Error(I(329));
      }
    }
  }
  return (it(e, ke()), e.callbackNode === n ? dm.bind(null, e) : null);
}
function Do(e, t) {
  var n = hi;
  return (
    e.current.memoizedState.isDehydrated && (Hn(e, t).flags |= 256),
    (e = sa(e, t)),
    e !== 2 && ((t = et), (et = n), t !== null && Ro(t)),
    e
  );
}
function Ro(e) {
  et === null ? (et = e) : et.push.apply(et, e);
}
function Gv(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var i = n[r],
            l = i.getSnapshot;
          i = i.value;
          try {
            if (!Ct(l(), i)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      ((n.return = t), (t = n));
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
  }
  return !0;
}
function on(e, t) {
  for (
    t &= ~ku,
      t &= ~Da,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;
  ) {
    var n = 31 - Et(t),
      r = 1 << n;
    ((e[n] = -1), (t &= ~r));
  }
}
function yd(e) {
  if (se & 6) throw Error(I(327));
  Er();
  var t = Vl(e, 0);
  if (!(t & 1)) return (it(e, ke()), null);
  var n = sa(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = ro(e);
    r !== 0 && ((t = r), (n = Do(e, r)));
  }
  if (n === 1) throw ((n = Ii), Hn(e, 0), on(e, t), it(e, ke()), n);
  if (n === 6) throw Error(I(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    On(e, et, Ft),
    it(e, ke()),
    null
  );
}
function Mu(e, t) {
  var n = se;
  se |= 1;
  try {
    return e(t);
  } finally {
    ((se = n), se === 0 && ((Rr = ke() + 500), ka && jn()));
  }
}
function Qn(e) {
  cn !== null && cn.tag === 0 && !(se & 6) && Er();
  var t = se;
  se |= 1;
  var n = gt.transition,
    r = fe;
  try {
    if (((gt.transition = null), (fe = 1), e)) return e();
  } finally {
    ((fe = r), (gt.transition = n), (se = t), !(se & 6) && jn());
  }
}
function Lu() {
  ((lt = xr.current), ge(xr));
}
function Hn(e, t) {
  ((e.finishedWork = null), (e.finishedLanes = 0));
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), Sv(n)), Le !== null))
    for (n = Le.return; n !== null; ) {
      var r = n;
      switch ((du(r), r.tag)) {
        case 1:
          ((r = r.type.childContextTypes), r != null && Yl());
          break;
        case 3:
          (Lr(), ge(nt), ge(Ge), wu());
          break;
        case 5:
          yu(r);
          break;
        case 4:
          Lr();
          break;
        case 13:
          ge(we);
          break;
        case 19:
          ge(we);
          break;
        case 10:
          hu(r.type._context);
          break;
        case 22:
        case 23:
          Lu();
      }
      n = n.return;
    }
  if (
    ((Ae = e),
    (Le = e = wn(e.current, null)),
    (Ue = lt = t),
    (Oe = 0),
    (Ii = null),
    (ku = Da = Yn = 0),
    (et = hi = null),
    Fn !== null)
  ) {
    for (t = 0; t < Fn.length; t++)
      if (((n = Fn[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var i = r.next,
          l = n.pending;
        if (l !== null) {
          var a = l.next;
          ((l.next = i), (r.next = a));
        }
        n.pending = r;
      }
    Fn = null;
  }
  return e;
}
function fm(e, t) {
  do {
    var n = Le;
    try {
      if ((mu(), (Nl.current = ra), na)) {
        for (var r = be.memoizedState; r !== null; ) {
          var i = r.queue;
          (i !== null && (i.pending = null), (r = r.next));
        }
        na = !1;
      }
      if (
        ((Kn = 0),
        (Ie = _e = be = null),
        (pi = !1),
        (Ri = 0),
        (Pu.current = null),
        n === null || n.return === null)
      ) {
        ((Oe = 1), (Ii = t), (Le = null));
        break;
      }
      e: {
        var l = e,
          a = n.return,
          s = n,
          o = t;
        if (
          ((t = Ue),
          (s.flags |= 32768),
          o !== null && typeof o == "object" && typeof o.then == "function")
        ) {
          var c = o,
            d = s,
            p = d.tag;
          if (!(d.mode & 1) && (p === 0 || p === 11 || p === 15)) {
            var h = d.alternate;
            h
              ? ((d.updateQueue = h.updateQueue),
                (d.memoizedState = h.memoizedState),
                (d.lanes = h.lanes))
              : ((d.updateQueue = null), (d.memoizedState = null));
          }
          var v = ad(a);
          if (v !== null) {
            ((v.flags &= -257),
              sd(v, a, s, l, t),
              v.mode & 1 && ld(l, c, t),
              (t = v),
              (o = c));
            var x = t.updateQueue;
            if (x === null) {
              var b = new Set();
              (b.add(o), (t.updateQueue = b));
            } else x.add(o);
            break e;
          } else {
            if (!(t & 1)) {
              (ld(l, c, t), Du());
              break e;
            }
            o = Error(I(426));
          }
        } else if (ye && s.mode & 1) {
          var N = ad(a);
          if (N !== null) {
            (!(N.flags & 65536) && (N.flags |= 256),
              sd(N, a, s, l, t),
              fu(Dr(o, s)));
            break e;
          }
        }
        ((l = o = Dr(o, s)),
          Oe !== 4 && (Oe = 2),
          hi === null ? (hi = [l]) : hi.push(l),
          (l = a));
        do {
          switch (l.tag) {
            case 3:
              ((l.flags |= 65536), (t &= -t), (l.lanes |= t));
              var g = Qp(l, o, t);
              Zc(l, g);
              break e;
            case 1:
              s = o;
              var f = l.type,
                m = l.stateNode;
              if (
                !(l.flags & 128) &&
                (typeof f.getDerivedStateFromError == "function" ||
                  (m !== null &&
                    typeof m.componentDidCatch == "function" &&
                    (xn === null || !xn.has(m))))
              ) {
                ((l.flags |= 65536), (t &= -t), (l.lanes |= t));
                var w = Xp(l, s, t);
                Zc(l, w);
                break e;
              }
          }
          l = l.return;
        } while (l !== null);
      }
      hm(n);
    } catch (T) {
      ((t = T), Le === n && n !== null && (Le = n = n.return));
      continue;
    }
    break;
  } while (!0);
}
function pm() {
  var e = ia.current;
  return ((ia.current = ra), e === null ? ra : e);
}
function Du() {
  ((Oe === 0 || Oe === 3 || Oe === 2) && (Oe = 4),
    Ae === null || (!(Yn & 268435455) && !(Da & 268435455)) || on(Ae, Ue));
}
function sa(e, t) {
  var n = se;
  se |= 2;
  var r = pm();
  (Ae !== e || Ue !== t) && ((Ft = null), Hn(e, t));
  do
    try {
      Kv();
      break;
    } catch (i) {
      fm(e, i);
    }
  while (!0);
  if ((mu(), (se = n), (ia.current = r), Le !== null)) throw Error(I(261));
  return ((Ae = null), (Ue = 0), Oe);
}
function Kv() {
  for (; Le !== null; ) mm(Le);
}
function Yv() {
  for (; Le !== null && !yg(); ) mm(Le);
}
function mm(e) {
  var t = vm(e.alternate, e, lt);
  ((e.memoizedProps = e.pendingProps),
    t === null ? hm(e) : (Le = t),
    (Pu.current = null));
}
function hm(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = Uv(n, t)), n !== null)) {
        ((n.flags &= 32767), (Le = n));
        return;
      }
      if (e !== null)
        ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
      else {
        ((Oe = 6), (Le = null));
        return;
      }
    } else if (((n = Bv(n, t, lt)), n !== null)) {
      Le = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      Le = t;
      return;
    }
    Le = t = e;
  } while (t !== null);
  Oe === 0 && (Oe = 5);
}
function On(e, t, n) {
  var r = fe,
    i = gt.transition;
  try {
    ((gt.transition = null), (fe = 1), Qv(e, t, n, r));
  } finally {
    ((gt.transition = i), (fe = r));
  }
  return null;
}
function Qv(e, t, n, r) {
  do Er();
  while (cn !== null);
  if (se & 6) throw Error(I(327));
  n = e.finishedWork;
  var i = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(I(177));
  ((e.callbackNode = null), (e.callbackPriority = 0));
  var l = n.lanes | n.childLanes;
  if (
    (Ng(e, l),
    e === Ae && ((Le = Ae = null), (Ue = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      gl ||
      ((gl = !0),
      xm(Hl, function () {
        return (Er(), null);
      })),
    (l = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || l)
  ) {
    ((l = gt.transition), (gt.transition = null));
    var a = fe;
    fe = 1;
    var s = se;
    ((se |= 4),
      (Pu.current = null),
      Vv(e, n),
      um(n, e),
      hv(uo),
      (Wl = !!oo),
      (uo = oo = null),
      (e.current = n),
      Wv(n),
      wg(),
      (se = s),
      (fe = a),
      (gt.transition = l));
  } else e.current = n;
  if (
    (gl && ((gl = !1), (cn = e), (aa = i)),
    (l = e.pendingLanes),
    l === 0 && (xn = null),
    Tg(n.stateNode),
    it(e, ke()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      ((i = t[n]), r(i.value, { componentStack: i.stack, digest: i.digest }));
  if (la) throw ((la = !1), (e = Mo), (Mo = null), e);
  return (
    aa & 1 && e.tag !== 0 && Er(),
    (l = e.pendingLanes),
    l & 1 ? (e === Lo ? gi++ : ((gi = 0), (Lo = e))) : (gi = 0),
    jn(),
    null
  );
}
function Er() {
  if (cn !== null) {
    var e = Qf(aa),
      t = gt.transition,
      n = fe;
    try {
      if (((gt.transition = null), (fe = 16 > e ? 16 : e), cn === null))
        var r = !1;
      else {
        if (((e = cn), (cn = null), (aa = 0), se & 6)) throw Error(I(331));
        var i = se;
        for (se |= 4, U = e.current; U !== null; ) {
          var l = U,
            a = l.child;
          if (U.flags & 16) {
            var s = l.deletions;
            if (s !== null) {
              for (var o = 0; o < s.length; o++) {
                var c = s[o];
                for (U = c; U !== null; ) {
                  var d = U;
                  switch (d.tag) {
                    case 0:
                    case 11:
                    case 15:
                      mi(8, d, l);
                  }
                  var p = d.child;
                  if (p !== null) ((p.return = d), (U = p));
                  else
                    for (; U !== null; ) {
                      d = U;
                      var h = d.sibling,
                        v = d.return;
                      if ((am(d), d === c)) {
                        U = null;
                        break;
                      }
                      if (h !== null) {
                        ((h.return = v), (U = h));
                        break;
                      }
                      U = v;
                    }
                }
              }
              var x = l.alternate;
              if (x !== null) {
                var b = x.child;
                if (b !== null) {
                  x.child = null;
                  do {
                    var N = b.sibling;
                    ((b.sibling = null), (b = N));
                  } while (b !== null);
                }
              }
              U = l;
            }
          }
          if (l.subtreeFlags & 2064 && a !== null) ((a.return = l), (U = a));
          else
            e: for (; U !== null; ) {
              if (((l = U), l.flags & 2048))
                switch (l.tag) {
                  case 0:
                  case 11:
                  case 15:
                    mi(9, l, l.return);
                }
              var g = l.sibling;
              if (g !== null) {
                ((g.return = l.return), (U = g));
                break e;
              }
              U = l.return;
            }
        }
        var f = e.current;
        for (U = f; U !== null; ) {
          a = U;
          var m = a.child;
          if (a.subtreeFlags & 2064 && m !== null) ((m.return = a), (U = m));
          else
            e: for (a = f; U !== null; ) {
              if (((s = U), s.flags & 2048))
                try {
                  switch (s.tag) {
                    case 0:
                    case 11:
                    case 15:
                      La(9, s);
                  }
                } catch (T) {
                  Ce(s, s.return, T);
                }
              if (s === a) {
                U = null;
                break e;
              }
              var w = s.sibling;
              if (w !== null) {
                ((w.return = s.return), (U = w));
                break e;
              }
              U = s.return;
            }
        }
        if (
          ((se = i), jn(), Rt && typeof Rt.onPostCommitFiberRoot == "function")
        )
          try {
            Rt.onPostCommitFiberRoot(Ta, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      ((fe = n), (gt.transition = t));
    }
  }
  return !1;
}
function wd(e, t, n) {
  ((t = Dr(n, t)),
    (t = Qp(e, t, 1)),
    (e = vn(e, t, 1)),
    (t = Qe()),
    e !== null && (Bi(e, 1, t), it(e, t)));
}
function Ce(e, t, n) {
  if (e.tag === 3) wd(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        wd(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (xn === null || !xn.has(r)))
        ) {
          ((e = Dr(n, e)),
            (e = Xp(t, e, 1)),
            (t = vn(t, e, 1)),
            (e = Qe()),
            t !== null && (Bi(t, 1, e), it(t, e)));
          break;
        }
      }
      t = t.return;
    }
}
function Xv(e, t, n) {
  var r = e.pingCache;
  (r !== null && r.delete(t),
    (t = Qe()),
    (e.pingedLanes |= e.suspendedLanes & n),
    Ae === e &&
      (Ue & n) === n &&
      (Oe === 4 || (Oe === 3 && (Ue & 130023424) === Ue && 500 > ke() - Nu)
        ? Hn(e, 0)
        : (ku |= n)),
    it(e, t));
}
function gm(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = al), (al <<= 1), !(al & 130023424) && (al = 4194304))
      : (t = 1));
  var n = Qe();
  ((e = Kt(e, t)), e !== null && (Bi(e, t, n), it(e, n)));
}
function qv(e) {
  var t = e.memoizedState,
    n = 0;
  (t !== null && (n = t.retryLane), gm(e, n));
}
function Jv(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        i = e.memoizedState;
      i !== null && (n = i.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(I(314));
  }
  (r !== null && r.delete(t), gm(e, n));
}
var vm;
vm = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || nt.current) tt = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return ((tt = !1), Fv(e, t, n));
      tt = !!(e.flags & 131072);
    }
  else ((tt = !1), ye && t.flags & 1048576 && bp(t, ql, t.index));
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      (Ll(e, t), (e = t.pendingProps));
      var i = kr(t, Ge.current);
      (Tr(t, n), (i = Su(null, t, r, e, i, n)));
      var l = Tu();
      return (
        (t.flags |= 1),
        typeof i == "object" &&
        i !== null &&
        typeof i.render == "function" &&
        i.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            rt(r) ? ((l = !0), Ql(t)) : (l = !1),
            (t.memoizedState =
              i.state !== null && i.state !== void 0 ? i.state : null),
            vu(t),
            (i.updater = Ma),
            (t.stateNode = i),
            (i._reactInternals = t),
            yo(t, r, e, n),
            (t = So(null, t, r, !0, l, n)))
          : ((t.tag = 0), ye && l && cu(t), Ye(null, t, i, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (Ll(e, t),
          (e = t.pendingProps),
          (i = r._init),
          (r = i(r._payload)),
          (t.type = r),
          (i = t.tag = e0(r)),
          (e = wt(r, e)),
          i)
        ) {
          case 0:
            t = bo(null, t, r, e, n);
            break e;
          case 1:
            t = cd(null, t, r, e, n);
            break e;
          case 11:
            t = od(null, t, r, e, n);
            break e;
          case 14:
            t = ud(null, t, r, wt(r.type, e), n);
            break e;
        }
        throw Error(I(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : wt(r, i)),
        bo(e, t, r, i, n)
      );
    case 1:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : wt(r, i)),
        cd(e, t, r, i, n)
      );
    case 3:
      e: {
        if ((em(t), e === null)) throw Error(I(387));
        ((r = t.pendingProps),
          (l = t.memoizedState),
          (i = l.element),
          Pp(e, t),
          ea(t, r, null, n));
        var a = t.memoizedState;
        if (((r = a.element), l.isDehydrated))
          if (
            ((l = {
              element: r,
              isDehydrated: !1,
              cache: a.cache,
              pendingSuspenseBoundaries: a.pendingSuspenseBoundaries,
              transitions: a.transitions,
            }),
            (t.updateQueue.baseState = l),
            (t.memoizedState = l),
            t.flags & 256)
          ) {
            ((i = Dr(Error(I(423)), t)), (t = dd(e, t, r, n, i)));
            break e;
          } else if (r !== i) {
            ((i = Dr(Error(I(424)), t)), (t = dd(e, t, r, n, i)));
            break e;
          } else
            for (
              ot = gn(t.stateNode.containerInfo.firstChild),
                ut = t,
                ye = !0,
                Tt = null,
                n = jp(t, null, r, n),
                t.child = n;
              n;
            )
              ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
        else {
          if ((Nr(), r === i)) {
            t = Yt(e, t, n);
            break e;
          }
          Ye(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        kp(t),
        e === null && go(t),
        (r = t.type),
        (i = t.pendingProps),
        (l = e !== null ? e.memoizedProps : null),
        (a = i.children),
        co(r, i) ? (a = null) : l !== null && co(r, l) && (t.flags |= 32),
        Zp(e, t),
        Ye(e, t, a, n),
        t.child
      );
    case 6:
      return (e === null && go(t), null);
    case 13:
      return tm(e, t, n);
    case 4:
      return (
        xu(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = Mr(t, null, r, n)) : Ye(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : wt(r, i)),
        od(e, t, r, i, n)
      );
    case 7:
      return (Ye(e, t, t.pendingProps, n), t.child);
    case 8:
      return (Ye(e, t, t.pendingProps.children, n), t.child);
    case 12:
      return (Ye(e, t, t.pendingProps.children, n), t.child);
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (i = t.pendingProps),
          (l = t.memoizedProps),
          (a = i.value),
          me(Jl, r._currentValue),
          (r._currentValue = a),
          l !== null)
        )
          if (Ct(l.value, a)) {
            if (l.children === i.children && !nt.current) {
              t = Yt(e, t, n);
              break e;
            }
          } else
            for (l = t.child, l !== null && (l.return = t); l !== null; ) {
              var s = l.dependencies;
              if (s !== null) {
                a = l.child;
                for (var o = s.firstContext; o !== null; ) {
                  if (o.context === r) {
                    if (l.tag === 1) {
                      ((o = Vt(-1, n & -n)), (o.tag = 2));
                      var c = l.updateQueue;
                      if (c !== null) {
                        c = c.shared;
                        var d = c.pending;
                        (d === null
                          ? (o.next = o)
                          : ((o.next = d.next), (d.next = o)),
                          (c.pending = o));
                      }
                    }
                    ((l.lanes |= n),
                      (o = l.alternate),
                      o !== null && (o.lanes |= n),
                      vo(l.return, n, t),
                      (s.lanes |= n));
                    break;
                  }
                  o = o.next;
                }
              } else if (l.tag === 10) a = l.type === t.type ? null : l.child;
              else if (l.tag === 18) {
                if (((a = l.return), a === null)) throw Error(I(341));
                ((a.lanes |= n),
                  (s = a.alternate),
                  s !== null && (s.lanes |= n),
                  vo(a, n, t),
                  (a = l.sibling));
              } else a = l.child;
              if (a !== null) a.return = l;
              else
                for (a = l; a !== null; ) {
                  if (a === t) {
                    a = null;
                    break;
                  }
                  if (((l = a.sibling), l !== null)) {
                    ((l.return = a.return), (a = l));
                    break;
                  }
                  a = a.return;
                }
              l = a;
            }
        (Ye(e, t, i.children, n), (t = t.child));
      }
      return t;
    case 9:
      return (
        (i = t.type),
        (r = t.pendingProps.children),
        Tr(t, n),
        (i = vt(i)),
        (r = r(i)),
        (t.flags |= 1),
        Ye(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (i = wt(r, t.pendingProps)),
        (i = wt(r.type, i)),
        ud(e, t, r, i, n)
      );
    case 15:
      return qp(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : wt(r, i)),
        Ll(e, t),
        (t.tag = 1),
        rt(r) ? ((e = !0), Ql(t)) : (e = !1),
        Tr(t, n),
        Yp(t, r, i),
        yo(t, r, i, n),
        So(null, t, r, !0, e, n)
      );
    case 19:
      return nm(e, t, n);
    case 22:
      return Jp(e, t, n);
  }
  throw Error(I(156, t.tag));
};
function xm(e, t) {
  return $f(e, t);
}
function Zv(e, t, n, r) {
  ((this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null));
}
function ht(e, t, n, r) {
  return new Zv(e, t, n, r);
}
function Ru(e) {
  return ((e = e.prototype), !(!e || !e.isReactComponent));
}
function e0(e) {
  if (typeof e == "function") return Ru(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === Jo)) return 11;
    if (e === Zo) return 14;
  }
  return 2;
}
function wn(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = ht(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function _l(e, t, n, r, i, l) {
  var a = 2;
  if (((r = e), typeof e == "function")) Ru(e) && (a = 1);
  else if (typeof e == "string") a = 5;
  else
    e: switch (e) {
      case or:
        return Vn(n.children, i, l, t);
      case qo:
        ((a = 8), (i |= 8));
        break;
      case Hs:
        return (
          (e = ht(12, n, t, i | 2)),
          (e.elementType = Hs),
          (e.lanes = l),
          e
        );
      case Vs:
        return ((e = ht(13, n, t, i)), (e.elementType = Vs), (e.lanes = l), e);
      case Ws:
        return ((e = ht(19, n, t, i)), (e.elementType = Ws), (e.lanes = l), e);
      case kf:
        return Ra(n, i, l, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case Cf:
              a = 10;
              break e;
            case Pf:
              a = 9;
              break e;
            case Jo:
              a = 11;
              break e;
            case Zo:
              a = 14;
              break e;
            case ln:
              ((a = 16), (r = null));
              break e;
          }
        throw Error(I(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = ht(a, n, t, i)),
    (t.elementType = e),
    (t.type = r),
    (t.lanes = l),
    t
  );
}
function Vn(e, t, n, r) {
  return ((e = ht(7, e, r, t)), (e.lanes = n), e);
}
function Ra(e, t, n, r) {
  return (
    (e = ht(22, e, r, t)),
    (e.elementType = kf),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function vs(e, t, n) {
  return ((e = ht(6, e, null, t)), (e.lanes = n), e);
}
function xs(e, t, n) {
  return (
    (t = ht(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function t0(e, t, n, r, i) {
  ((this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Ja(0)),
    (this.expirationTimes = Ja(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Ja(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = i),
    (this.mutableSourceEagerHydrationData = null));
}
function _u(e, t, n, r, i, l, a, s, o) {
  return (
    (e = new t0(e, t, n, s, o)),
    t === 1 ? ((t = 1), l === !0 && (t |= 8)) : (t = 0),
    (l = ht(3, null, null, t)),
    (e.current = l),
    (l.stateNode = e),
    (l.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    vu(l),
    e
  );
}
function n0(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: sr,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function ym(e) {
  if (!e) return Sn;
  e = e._reactInternals;
  e: {
    if (er(e) !== e || e.tag !== 1) throw Error(I(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (rt(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(I(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (rt(n)) return yp(e, n, t);
  }
  return t;
}
function wm(e, t, n, r, i, l, a, s, o) {
  return (
    (e = _u(n, r, !0, e, i, l, a, s, o)),
    (e.context = ym(null)),
    (n = e.current),
    (r = Qe()),
    (i = yn(n)),
    (l = Vt(r, i)),
    (l.callback = t ?? null),
    vn(n, l, i),
    (e.current.lanes = i),
    Bi(e, i, r),
    it(e, r),
    e
  );
}
function _a(e, t, n, r) {
  var i = t.current,
    l = Qe(),
    a = yn(i);
  return (
    (n = ym(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = Vt(l, a)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = vn(i, t, a)),
    e !== null && (jt(e, i, a, l), kl(e, i, a)),
    a
  );
}
function oa(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function bd(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Ou(e, t) {
  (bd(e, t), (e = e.alternate) && bd(e, t));
}
function r0() {
  return null;
}
var bm =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function Iu(e) {
  this._internalRoot = e;
}
Oa.prototype.render = Iu.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(I(409));
  _a(e, t, null, null);
};
Oa.prototype.unmount = Iu.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    (Qn(function () {
      _a(null, e, null, null);
    }),
      (t[Gt] = null));
  }
};
function Oa(e) {
  this._internalRoot = e;
}
Oa.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Jf();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < sn.length && t !== 0 && t < sn[n].priority; n++);
    (sn.splice(n, 0, e), n === 0 && ep(e));
  }
};
function Au(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Ia(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function Sd() {}
function i0(e, t, n, r, i) {
  if (i) {
    if (typeof r == "function") {
      var l = r;
      r = function () {
        var c = oa(a);
        l.call(c);
      };
    }
    var a = wm(t, r, e, 0, null, !1, !1, "", Sd);
    return (
      (e._reactRootContainer = a),
      (e[Gt] = a.current),
      ki(e.nodeType === 8 ? e.parentNode : e),
      Qn(),
      a
    );
  }
  for (; (i = e.lastChild); ) e.removeChild(i);
  if (typeof r == "function") {
    var s = r;
    r = function () {
      var c = oa(o);
      s.call(c);
    };
  }
  var o = _u(e, 0, !1, null, null, !1, !1, "", Sd);
  return (
    (e._reactRootContainer = o),
    (e[Gt] = o.current),
    ki(e.nodeType === 8 ? e.parentNode : e),
    Qn(function () {
      _a(t, o, n, r);
    }),
    o
  );
}
function Aa(e, t, n, r, i) {
  var l = n._reactRootContainer;
  if (l) {
    var a = l;
    if (typeof i == "function") {
      var s = i;
      i = function () {
        var o = oa(a);
        s.call(o);
      };
    }
    _a(t, a, e, i);
  } else a = i0(n, t, e, i, r);
  return oa(a);
}
Xf = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = li(t.pendingLanes);
        n !== 0 &&
          (nu(t, n | 1), it(t, ke()), !(se & 6) && ((Rr = ke() + 500), jn()));
      }
      break;
    case 13:
      (Qn(function () {
        var r = Kt(e, 1);
        if (r !== null) {
          var i = Qe();
          jt(r, e, 1, i);
        }
      }),
        Ou(e, 1));
  }
};
ru = function (e) {
  if (e.tag === 13) {
    var t = Kt(e, 134217728);
    if (t !== null) {
      var n = Qe();
      jt(t, e, 134217728, n);
    }
    Ou(e, 134217728);
  }
};
qf = function (e) {
  if (e.tag === 13) {
    var t = yn(e),
      n = Kt(e, t);
    if (n !== null) {
      var r = Qe();
      jt(n, e, t, r);
    }
    Ou(e, t);
  }
};
Jf = function () {
  return fe;
};
Zf = function (e, t) {
  var n = fe;
  try {
    return ((fe = e), t());
  } finally {
    fe = n;
  }
};
eo = function (e, t, n) {
  switch (t) {
    case "input":
      if ((Ks(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]',
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var i = Pa(r);
            if (!i) throw Error(I(90));
            (Mf(r), Ks(r, i));
          }
        }
      }
      break;
    case "textarea":
      Df(e, n);
      break;
    case "select":
      ((t = n.value), t != null && yr(e, !!n.multiple, t, !1));
  }
};
Ff = Mu;
Bf = Qn;
var l0 = { usingClientEntryPoint: !1, Events: [Hi, fr, Pa, Af, zf, Mu] },
  Jr = {
    findFiberByHostInstance: zn,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  a0 = {
    bundleType: Jr.bundleType,
    version: Jr.version,
    rendererPackageName: Jr.rendererPackageName,
    rendererConfig: Jr.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Xt.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return ((e = Vf(e)), e === null ? null : e.stateNode);
    },
    findFiberByHostInstance: Jr.findFiberByHostInstance || r0,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!vl.isDisabled && vl.supportsFiber)
    try {
      ((Ta = vl.inject(a0)), (Rt = vl));
    } catch {}
}
dt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = l0;
dt.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Au(t)) throw Error(I(200));
  return n0(e, t, null, n);
};
dt.createRoot = function (e, t) {
  if (!Au(e)) throw Error(I(299));
  var n = !1,
    r = "",
    i = bm;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
    (t = _u(e, 1, !1, null, null, n, !1, r, i)),
    (e[Gt] = t.current),
    ki(e.nodeType === 8 ? e.parentNode : e),
    new Iu(t)
  );
};
dt.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(I(188))
      : ((e = Object.keys(e).join(",")), Error(I(268, e)));
  return ((e = Vf(t)), (e = e === null ? null : e.stateNode), e);
};
dt.flushSync = function (e) {
  return Qn(e);
};
dt.hydrate = function (e, t, n) {
  if (!Ia(t)) throw Error(I(200));
  return Aa(null, e, t, !0, n);
};
dt.hydrateRoot = function (e, t, n) {
  if (!Au(e)) throw Error(I(405));
  var r = (n != null && n.hydratedSources) || null,
    i = !1,
    l = "",
    a = bm;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (i = !0),
      n.identifierPrefix !== void 0 && (l = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (a = n.onRecoverableError)),
    (t = wm(t, null, e, 1, n ?? null, i, !1, l, a)),
    (e[Gt] = t.current),
    ki(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      ((n = r[e]),
        (i = n._getVersion),
        (i = i(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, i])
          : t.mutableSourceEagerHydrationData.push(n, i));
  return new Oa(t);
};
dt.render = function (e, t, n) {
  if (!Ia(t)) throw Error(I(200));
  return Aa(null, e, t, !1, n);
};
dt.unmountComponentAtNode = function (e) {
  if (!Ia(e)) throw Error(I(40));
  return e._reactRootContainer
    ? (Qn(function () {
        Aa(null, null, e, !1, function () {
          ((e._reactRootContainer = null), (e[Gt] = null));
        });
      }),
      !0)
    : !1;
};
dt.unstable_batchedUpdates = Mu;
dt.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!Ia(n)) throw Error(I(200));
  if (e == null || e._reactInternals === void 0) throw Error(I(38));
  return Aa(e, t, n, !1, r);
};
dt.version = "18.3.1-next-f1338f8080-20240426";
function Sm() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Sm);
    } catch (e) {
      console.error(e);
    }
}
(Sm(), (Sf.exports = dt));
var zu = Sf.exports;
const s0 = Vo(zu),
  o0 = cf({ __proto__: null, default: s0 }, [zu]);
var Td = zu;
((Bs.createRoot = Td.createRoot), (Bs.hydrateRoot = Td.hydrateRoot));
/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function xe() {
  return (
    (xe = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    xe.apply(this, arguments)
  );
}
var Me;
(function (e) {
  ((e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE"));
})(Me || (Me = {}));
const Ed = "popstate";
function u0(e) {
  e === void 0 && (e = {});
  function t(r, i) {
    let { pathname: l, search: a, hash: s } = r.location;
    return Ai(
      "",
      { pathname: l, search: a, hash: s },
      (i.state && i.state.usr) || null,
      (i.state && i.state.key) || "default",
    );
  }
  function n(r, i) {
    return typeof i == "string" ? i : qn(i);
  }
  return d0(t, n, null, e);
}
function ne(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function Xn(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function c0() {
  return Math.random().toString(36).substr(2, 8);
}
function jd(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function Ai(e, t, n, r) {
  return (
    n === void 0 && (n = null),
    xe(
      { pathname: typeof e == "string" ? e : e.pathname, search: "", hash: "" },
      typeof t == "string" ? Cn(t) : t,
      { state: n, key: (t && t.key) || r || c0() },
    )
  );
}
function qn(e) {
  let { pathname: t = "/", search: n = "", hash: r = "" } = e;
  return (
    n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
    r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r),
    t
  );
}
function Cn(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    let r = e.indexOf("?");
    (r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
      e && (t.pathname = e));
  }
  return t;
}
function d0(e, t, n, r) {
  r === void 0 && (r = {});
  let { window: i = document.defaultView, v5Compat: l = !1 } = r,
    a = i.history,
    s = Me.Pop,
    o = null,
    c = d();
  c == null && ((c = 0), a.replaceState(xe({}, a.state, { idx: c }), ""));
  function d() {
    return (a.state || { idx: null }).idx;
  }
  function p() {
    s = Me.Pop;
    let N = d(),
      g = N == null ? null : N - c;
    ((c = N), o && o({ action: s, location: b.location, delta: g }));
  }
  function h(N, g) {
    s = Me.Push;
    let f = Ai(b.location, N, g);
    c = d() + 1;
    let m = jd(f, c),
      w = b.createHref(f);
    try {
      a.pushState(m, "", w);
    } catch (T) {
      if (T instanceof DOMException && T.name === "DataCloneError") throw T;
      i.location.assign(w);
    }
    l && o && o({ action: s, location: b.location, delta: 1 });
  }
  function v(N, g) {
    s = Me.Replace;
    let f = Ai(b.location, N, g);
    c = d();
    let m = jd(f, c),
      w = b.createHref(f);
    (a.replaceState(m, "", w),
      l && o && o({ action: s, location: b.location, delta: 0 }));
  }
  function x(N) {
    let g = i.location.origin !== "null" ? i.location.origin : i.location.href,
      f = typeof N == "string" ? N : qn(N);
    return (
      (f = f.replace(/ $/, "%20")),
      ne(
        g,
        "No window.location.(origin|href) available to create URL for href: " +
          f,
      ),
      new URL(f, g)
    );
  }
  let b = {
    get action() {
      return s;
    },
    get location() {
      return e(i, a);
    },
    listen(N) {
      if (o) throw new Error("A history only accepts one active listener");
      return (
        i.addEventListener(Ed, p),
        (o = N),
        () => {
          (i.removeEventListener(Ed, p), (o = null));
        }
      );
    },
    createHref(N) {
      return t(i, N);
    },
    createURL: x,
    encodeLocation(N) {
      let g = x(N);
      return { pathname: g.pathname, search: g.search, hash: g.hash };
    },
    push: h,
    replace: v,
    go(N) {
      return a.go(N);
    },
  };
  return b;
}
var de;
(function (e) {
  ((e.data = "data"),
    (e.deferred = "deferred"),
    (e.redirect = "redirect"),
    (e.error = "error"));
})(de || (de = {}));
const f0 = new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children",
]);
function p0(e) {
  return e.index === !0;
}
function ua(e, t, n, r) {
  return (
    n === void 0 && (n = []),
    r === void 0 && (r = {}),
    e.map((i, l) => {
      let a = [...n, String(l)],
        s = typeof i.id == "string" ? i.id : a.join("-");
      if (
        (ne(
          i.index !== !0 || !i.children,
          "Cannot specify children on an index route",
        ),
        ne(
          !r[s],
          'Found a route id collision on id "' +
            s +
            `".  Route id's must be globally unique within Data Router usages`,
        ),
        p0(i))
      ) {
        let o = xe({}, i, t(i), { id: s });
        return ((r[s] = o), o);
      } else {
        let o = xe({}, i, t(i), { id: s, children: void 0 });
        return (
          (r[s] = o),
          i.children && (o.children = ua(i.children, t, a, r)),
          o
        );
      }
    })
  );
}
function In(e, t, n) {
  return (n === void 0 && (n = "/"), Ol(e, t, n, !1));
}
function Ol(e, t, n, r) {
  let i = typeof t == "string" ? Cn(t) : t,
    l = Qt(i.pathname || "/", n);
  if (l == null) return null;
  let a = Tm(e);
  h0(a);
  let s = null;
  for (let o = 0; s == null && o < a.length; ++o) {
    let c = C0(l);
    s = E0(a[o], c, r);
  }
  return s;
}
function m0(e, t) {
  let { route: n, pathname: r, params: i } = e;
  return { id: n.id, pathname: r, params: i, data: t[n.id], handle: n.handle };
}
function Tm(e, t, n, r) {
  (t === void 0 && (t = []),
    n === void 0 && (n = []),
    r === void 0 && (r = ""));
  let i = (l, a, s) => {
    let o = {
      relativePath: s === void 0 ? l.path || "" : s,
      caseSensitive: l.caseSensitive === !0,
      childrenIndex: a,
      route: l,
    };
    o.relativePath.startsWith("/") &&
      (ne(
        o.relativePath.startsWith(r),
        'Absolute route path "' +
          o.relativePath +
          '" nested under path ' +
          ('"' + r + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes.",
      ),
      (o.relativePath = o.relativePath.slice(r.length)));
    let c = Wt([r, o.relativePath]),
      d = n.concat(o);
    (l.children &&
      l.children.length > 0 &&
      (ne(
        l.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + c + '".'),
      ),
      Tm(l.children, t, d, c)),
      !(l.path == null && !l.index) &&
        t.push({ path: c, score: S0(c, l.index), routesMeta: d }));
  };
  return (
    e.forEach((l, a) => {
      var s;
      if (l.path === "" || !((s = l.path) != null && s.includes("?"))) i(l, a);
      else for (let o of Em(l.path)) i(l, a, o);
    }),
    t
  );
}
function Em(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...r] = t,
    i = n.endsWith("?"),
    l = n.replace(/\?$/, "");
  if (r.length === 0) return i ? [l, ""] : [l];
  let a = Em(r.join("/")),
    s = [];
  return (
    s.push(...a.map((o) => (o === "" ? l : [l, o].join("/")))),
    i && s.push(...a),
    s.map((o) => (e.startsWith("/") && o === "" ? "/" : o))
  );
}
function h0(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : T0(
          t.routesMeta.map((r) => r.childrenIndex),
          n.routesMeta.map((r) => r.childrenIndex),
        ),
  );
}
const g0 = /^:[\w-]+$/,
  v0 = 3,
  x0 = 2,
  y0 = 1,
  w0 = 10,
  b0 = -2,
  Cd = (e) => e === "*";
function S0(e, t) {
  let n = e.split("/"),
    r = n.length;
  return (
    n.some(Cd) && (r += b0),
    t && (r += x0),
    n
      .filter((i) => !Cd(i))
      .reduce((i, l) => i + (g0.test(l) ? v0 : l === "" ? y0 : w0), r)
  );
}
function T0(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, i) => r === t[i])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function E0(e, t, n) {
  n === void 0 && (n = !1);
  let { routesMeta: r } = e,
    i = {},
    l = "/",
    a = [];
  for (let s = 0; s < r.length; ++s) {
    let o = r[s],
      c = s === r.length - 1,
      d = l === "/" ? t : t.slice(l.length) || "/",
      p = ca(
        { path: o.relativePath, caseSensitive: o.caseSensitive, end: c },
        d,
      ),
      h = o.route;
    if (
      (!p &&
        c &&
        n &&
        !r[r.length - 1].route.index &&
        (p = ca(
          { path: o.relativePath, caseSensitive: o.caseSensitive, end: !1 },
          d,
        )),
      !p)
    )
      return null;
    (Object.assign(i, p.params),
      a.push({
        params: i,
        pathname: Wt([l, p.pathname]),
        pathnameBase: M0(Wt([l, p.pathnameBase])),
        route: h,
      }),
      p.pathnameBase !== "/" && (l = Wt([l, p.pathnameBase])));
  }
  return a;
}
function ca(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = j0(e.path, e.caseSensitive, e.end),
    i = t.match(n);
  if (!i) return null;
  let l = i[0],
    a = l.replace(/(.)\/+$/, "$1"),
    s = i.slice(1);
  return {
    params: r.reduce((c, d, p) => {
      let { paramName: h, isOptional: v } = d;
      if (h === "*") {
        let b = s[p] || "";
        a = l.slice(0, l.length - b.length).replace(/(.)\/+$/, "$1");
      }
      const x = s[p];
      return (
        v && !x ? (c[h] = void 0) : (c[h] = (x || "").replace(/%2F/g, "/")),
        c
      );
    }, {}),
    pathname: l,
    pathnameBase: a,
    pattern: e,
  };
}
function j0(e, t, n) {
  (t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    Xn(
      e === "*" || !e.endsWith("*") || e.endsWith("/*"),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'),
    ));
  let r = [],
    i =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (a, s, o) => (
            r.push({ paramName: s, isOptional: o != null }),
            o ? "/?([^\\/]+)?" : "/([^\\/]+)"
          ),
        );
  return (
    e.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (i += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : n
        ? (i += "\\/*$")
        : e !== "" && e !== "/" && (i += "(?:(?=\\/|$))"),
    [new RegExp(i, t ? void 0 : "i"), r]
  );
}
function C0(e) {
  try {
    return e
      .split("/")
      .map((t) => decodeURIComponent(t).replace(/\//g, "%2F"))
      .join("/");
  } catch (t) {
    return (
      Xn(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ("encoding (" + t + ")."),
      ),
      e
    );
  }
}
function Qt(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
const P0 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  k0 = (e) => P0.test(e);
function N0(e, t) {
  t === void 0 && (t = "/");
  let {
      pathname: n,
      search: r = "",
      hash: i = "",
    } = typeof e == "string" ? Cn(e) : e,
    l;
  if (n)
    if (k0(n)) l = n;
    else {
      if (n.includes("//")) {
        let a = n;
        ((n = n.replace(/\/\/+/g, "/")),
          Xn(
            !1,
            "Pathnames cannot have embedded double slashes - normalizing " +
              (a + " -> " + n),
          ));
      }
      n.startsWith("/") ? (l = Pd(n.substring(1), "/")) : (l = Pd(n, t));
    }
  else l = t;
  return { pathname: l, search: L0(r), hash: D0(i) };
}
function Pd(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((i) => {
      i === ".." ? n.length > 1 && n.pop() : i !== "." && n.push(i);
    }),
    n.length > 1 ? n.join("/") : "/"
  );
}
function ys(e, t, n, r) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ("`to." +
      t +
      "` field [" +
      JSON.stringify(r) +
      "].  Please separate it out to the ") +
    ("`to." + n + "` field. Alternatively you may provide the full path as ") +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function jm(e) {
  return e.filter(
    (t, n) => n === 0 || (t.route.path && t.route.path.length > 0),
  );
}
function Fu(e, t) {
  let n = jm(e);
  return t
    ? n.map((r, i) => (i === n.length - 1 ? r.pathname : r.pathnameBase))
    : n.map((r) => r.pathnameBase);
}
function Bu(e, t, n, r) {
  r === void 0 && (r = !1);
  let i;
  typeof e == "string"
    ? (i = Cn(e))
    : ((i = xe({}, e)),
      ne(
        !i.pathname || !i.pathname.includes("?"),
        ys("?", "pathname", "search", i),
      ),
      ne(
        !i.pathname || !i.pathname.includes("#"),
        ys("#", "pathname", "hash", i),
      ),
      ne(!i.search || !i.search.includes("#"), ys("#", "search", "hash", i)));
  let l = e === "" || i.pathname === "",
    a = l ? "/" : i.pathname,
    s;
  if (a == null) s = n;
  else {
    let p = t.length - 1;
    if (!r && a.startsWith("..")) {
      let h = a.split("/");
      for (; h[0] === ".."; ) (h.shift(), (p -= 1));
      i.pathname = h.join("/");
    }
    s = p >= 0 ? t[p] : "/";
  }
  let o = N0(i, s),
    c = a && a !== "/" && a.endsWith("/"),
    d = (l || a === ".") && n.endsWith("/");
  return (!o.pathname.endsWith("/") && (c || d) && (o.pathname += "/"), o);
}
const Wt = (e) => e.join("/").replace(/\/\/+/g, "/"),
  M0 = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  L0 = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  D0 = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
class da {
  constructor(t, n, r, i) {
    (i === void 0 && (i = !1),
      (this.status = t),
      (this.statusText = n || ""),
      (this.internal = i),
      r instanceof Error
        ? ((this.data = r.toString()), (this.error = r))
        : (this.data = r));
  }
}
function zi(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
const Cm = ["post", "put", "patch", "delete"],
  R0 = new Set(Cm),
  _0 = ["get", ...Cm],
  O0 = new Set(_0),
  I0 = new Set([301, 302, 303, 307, 308]),
  A0 = new Set([307, 308]),
  ws = {
    state: "idle",
    location: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  z0 = {
    state: "idle",
    data: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  Zr = { state: "unblocked", proceed: void 0, reset: void 0, location: void 0 },
  Uu = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  F0 = (e) => ({ hasErrorBoundary: !!e.hasErrorBoundary }),
  Pm = "remix-router-transitions";
function B0(e) {
  const t = e.window ? e.window : typeof window < "u" ? window : void 0,
    n =
      typeof t < "u" &&
      typeof t.document < "u" &&
      typeof t.document.createElement < "u",
    r = !n;
  ne(
    e.routes.length > 0,
    "You must provide a non-empty routes array to createRouter",
  );
  let i;
  if (e.mapRouteProperties) i = e.mapRouteProperties;
  else if (e.detectErrorBoundary) {
    let S = e.detectErrorBoundary;
    i = (E) => ({ hasErrorBoundary: S(E) });
  } else i = F0;
  let l = {},
    a = ua(e.routes, i, void 0, l),
    s,
    o = e.basename || "/",
    c = e.dataStrategy || W0,
    d = e.patchRoutesOnNavigation,
    p = xe(
      {
        v7_fetcherPersist: !1,
        v7_normalizeFormMethod: !1,
        v7_partialHydration: !1,
        v7_prependBasename: !1,
        v7_relativeSplatPath: !1,
        v7_skipActionErrorRevalidation: !1,
      },
      e.future,
    ),
    h = null,
    v = new Set(),
    x = null,
    b = null,
    N = null,
    g = e.hydrationData != null,
    f = In(a, e.history.location, o),
    m = !1,
    w = null;
  if (f == null && !d) {
    let S = Ze(404, { pathname: e.history.location.pathname }),
      { matches: E, route: k } = zd(a);
    ((f = E), (w = { [k.id]: S }));
  }
  f &&
    !e.hydrationData &&
    qi(f, a, e.history.location.pathname).active &&
    (f = null);
  let T;
  if (f)
    if (f.some((S) => S.route.lazy)) T = !1;
    else if (!f.some((S) => S.route.loader)) T = !0;
    else if (p.v7_partialHydration) {
      let S = e.hydrationData ? e.hydrationData.loaderData : null,
        E = e.hydrationData ? e.hydrationData.errors : null;
      if (E) {
        let k = f.findIndex((O) => E[O.route.id] !== void 0);
        T = f.slice(0, k + 1).every((O) => !Oo(O.route, S, E));
      } else T = f.every((k) => !Oo(k.route, S, E));
    } else T = e.hydrationData != null;
  else if (((T = !1), (f = []), p.v7_partialHydration)) {
    let S = qi(null, a, e.history.location.pathname);
    S.active && S.matches && ((m = !0), (f = S.matches));
  }
  let L,
    y = {
      historyAction: e.history.action,
      location: e.history.location,
      matches: f,
      initialized: T,
      navigation: ws,
      restoreScrollPosition: e.hydrationData != null ? !1 : null,
      preventScrollReset: !1,
      revalidation: "idle",
      loaderData: (e.hydrationData && e.hydrationData.loaderData) || {},
      actionData: (e.hydrationData && e.hydrationData.actionData) || null,
      errors: (e.hydrationData && e.hydrationData.errors) || w,
      fetchers: new Map(),
      blockers: new Map(),
    },
    C = Me.Pop,
    M = !1,
    P,
    _ = !1,
    F = new Map(),
    D = null,
    A = !1,
    W = !1,
    K = [],
    Z = new Set(),
    R = new Map(),
    z = 0,
    $ = -1,
    q = new Map(),
    ie = new Set(),
    Pe = new Map(),
    ce = new Map(),
    De = new Set(),
    ve = new Map(),
    Ke = new Map(),
    Nn;
  function Ki() {
    if (
      ((h = e.history.listen((S) => {
        let { action: E, location: k, delta: O } = S;
        if (Nn) {
          (Nn(), (Nn = void 0));
          return;
        }
        Xn(
          Ke.size === 0 || O != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.",
        );
        let B = dc({
          currentLocation: y.location,
          nextLocation: k,
          historyAction: E,
        });
        if (B && O != null) {
          let X = new Promise((J) => {
            Nn = J;
          });
          (e.history.go(O * -1),
            Xi(B, {
              state: "blocked",
              location: k,
              proceed() {
                (Xi(B, {
                  state: "proceeding",
                  proceed: void 0,
                  reset: void 0,
                  location: k,
                }),
                  X.then(() => e.history.go(O)));
              },
              reset() {
                let J = new Map(y.blockers);
                (J.set(B, Zr), Re({ blockers: J }));
              },
            }));
          return;
        }
        return Mn(E, k);
      })),
      n)
    ) {
      ix(t, F);
      let S = () => lx(t, F);
      (t.addEventListener("pagehide", S),
        (D = () => t.removeEventListener("pagehide", S)));
    }
    return (
      y.initialized || Mn(Me.Pop, y.location, { initialHydration: !0 }),
      L
    );
  }
  function Br() {
    (h && h(),
      D && D(),
      v.clear(),
      P && P.abort(),
      y.fetchers.forEach((S, E) => Qi(E)),
      y.blockers.forEach((S, E) => cc(E)));
  }
  function Yi(S) {
    return (v.add(S), () => v.delete(S));
  }
  function Re(S, E) {
    (E === void 0 && (E = {}), (y = xe({}, y, S)));
    let k = [],
      O = [];
    (p.v7_fetcherPersist &&
      y.fetchers.forEach((B, X) => {
        B.state === "idle" && (De.has(X) ? O.push(X) : k.push(X));
      }),
      De.forEach((B) => {
        !y.fetchers.has(B) && !R.has(B) && O.push(B);
      }),
      [...v].forEach((B) =>
        B(y, {
          deletedFetchers: O,
          viewTransitionOpts: E.viewTransitionOpts,
          flushSync: E.flushSync === !0,
        }),
      ),
      p.v7_fetcherPersist
        ? (k.forEach((B) => y.fetchers.delete(B)), O.forEach((B) => Qi(B)))
        : O.forEach((B) => De.delete(B)));
  }
  function qt(S, E, k) {
    var O, B;
    let { flushSync: X } = k === void 0 ? {} : k,
      J =
        y.actionData != null &&
        y.navigation.formMethod != null &&
        St(y.navigation.formMethod) &&
        y.navigation.state === "loading" &&
        ((O = S.state) == null ? void 0 : O._isRedirect) !== !0,
      G;
    E.actionData
      ? Object.keys(E.actionData).length > 0
        ? (G = E.actionData)
        : (G = null)
      : J
        ? (G = y.actionData)
        : (G = null);
    let Y = E.loaderData
        ? Id(y.loaderData, E.loaderData, E.matches || [], E.errors)
        : y.loaderData,
      H = y.blockers;
    H.size > 0 && ((H = new Map(H)), H.forEach((ae, ze) => H.set(ze, Zr)));
    let Q =
      M === !0 ||
      (y.navigation.formMethod != null &&
        St(y.navigation.formMethod) &&
        ((B = S.state) == null ? void 0 : B._isRedirect) !== !0);
    (s && ((a = s), (s = void 0)),
      A ||
        C === Me.Pop ||
        (C === Me.Push
          ? e.history.push(S, S.state)
          : C === Me.Replace && e.history.replace(S, S.state)));
    let te;
    if (C === Me.Pop) {
      let ae = F.get(y.location.pathname);
      ae && ae.has(S.pathname)
        ? (te = { currentLocation: y.location, nextLocation: S })
        : F.has(S.pathname) &&
          (te = { currentLocation: S, nextLocation: y.location });
    } else if (_) {
      let ae = F.get(y.location.pathname);
      (ae
        ? ae.add(S.pathname)
        : ((ae = new Set([S.pathname])), F.set(y.location.pathname, ae)),
        (te = { currentLocation: y.location, nextLocation: S }));
    }
    (Re(
      xe({}, E, {
        actionData: G,
        loaderData: Y,
        historyAction: C,
        location: S,
        initialized: !0,
        navigation: ws,
        revalidation: "idle",
        restoreScrollPosition: pc(S, E.matches || y.matches),
        preventScrollReset: Q,
        blockers: H,
      }),
      { viewTransitionOpts: te, flushSync: X === !0 },
    ),
      (C = Me.Pop),
      (M = !1),
      (_ = !1),
      (A = !1),
      (W = !1),
      (K = []));
  }
  async function rc(S, E) {
    if (typeof S == "number") {
      e.history.go(S);
      return;
    }
    let k = _o(
        y.location,
        y.matches,
        o,
        p.v7_prependBasename,
        S,
        p.v7_relativeSplatPath,
        E == null ? void 0 : E.fromRouteId,
        E == null ? void 0 : E.relative,
      ),
      {
        path: O,
        submission: B,
        error: X,
      } = kd(p.v7_normalizeFormMethod, !1, k, E),
      J = y.location,
      G = Ai(y.location, O, E && E.state);
    G = xe({}, G, e.history.encodeLocation(G));
    let Y = E && E.replace != null ? E.replace : void 0,
      H = Me.Push;
    Y === !0
      ? (H = Me.Replace)
      : Y === !1 ||
        (B != null &&
          St(B.formMethod) &&
          B.formAction === y.location.pathname + y.location.search &&
          (H = Me.Replace));
    let Q =
        E && "preventScrollReset" in E ? E.preventScrollReset === !0 : void 0,
      te = (E && E.flushSync) === !0,
      ae = dc({ currentLocation: J, nextLocation: G, historyAction: H });
    if (ae) {
      Xi(ae, {
        state: "blocked",
        location: G,
        proceed() {
          (Xi(ae, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: G,
          }),
            rc(S, E));
        },
        reset() {
          let ze = new Map(y.blockers);
          (ze.set(ae, Zr), Re({ blockers: ze }));
        },
      });
      return;
    }
    return await Mn(H, G, {
      submission: B,
      pendingError: X,
      preventScrollReset: Q,
      replace: E && E.replace,
      enableViewTransition: E && E.viewTransition,
      flushSync: te,
    });
  }
  function bh() {
    if (
      (Va(),
      Re({ revalidation: "loading" }),
      y.navigation.state !== "submitting")
    ) {
      if (y.navigation.state === "idle") {
        Mn(y.historyAction, y.location, { startUninterruptedRevalidation: !0 });
        return;
      }
      Mn(C || y.historyAction, y.navigation.location, {
        overrideNavigation: y.navigation,
        enableViewTransition: _ === !0,
      });
    }
  }
  async function Mn(S, E, k) {
    (P && P.abort(),
      (P = null),
      (C = S),
      (A = (k && k.startUninterruptedRevalidation) === !0),
      Lh(y.location, y.matches),
      (M = (k && k.preventScrollReset) === !0),
      (_ = (k && k.enableViewTransition) === !0));
    let O = s || a,
      B = k && k.overrideNavigation,
      X =
        k != null &&
        k.initialHydration &&
        y.matches &&
        y.matches.length > 0 &&
        !m
          ? y.matches
          : In(O, E, o),
      J = (k && k.flushSync) === !0;
    if (
      X &&
      y.initialized &&
      !W &&
      X0(y.location, E) &&
      !(k && k.submission && St(k.submission.formMethod))
    ) {
      qt(E, { matches: X }, { flushSync: J });
      return;
    }
    let G = qi(X, O, E.pathname);
    if ((G.active && G.matches && (X = G.matches), !X)) {
      let { error: pe, notFoundMatches: ue, route: Te } = Wa(E.pathname);
      qt(
        E,
        { matches: ue, loaderData: {}, errors: { [Te.id]: pe } },
        { flushSync: J },
      );
      return;
    }
    P = new AbortController();
    let Y = ar(e.history, E, P.signal, k && k.submission),
      H;
    if (k && k.pendingError)
      H = [An(X).route.id, { type: de.error, error: k.pendingError }];
    else if (k && k.submission && St(k.submission.formMethod)) {
      let pe = await Sh(Y, E, k.submission, X, G.active, {
        replace: k.replace,
        flushSync: J,
      });
      if (pe.shortCircuited) return;
      if (pe.pendingActionResult) {
        let [ue, Te] = pe.pendingActionResult;
        if (at(Te) && zi(Te.error) && Te.error.status === 404) {
          ((P = null),
            qt(E, {
              matches: pe.matches,
              loaderData: {},
              errors: { [ue]: Te.error },
            }));
          return;
        }
      }
      ((X = pe.matches || X),
        (H = pe.pendingActionResult),
        (B = bs(E, k.submission)),
        (J = !1),
        (G.active = !1),
        (Y = ar(e.history, Y.url, Y.signal)));
    }
    let {
      shortCircuited: Q,
      matches: te,
      loaderData: ae,
      errors: ze,
    } = await Th(
      Y,
      E,
      X,
      G.active,
      B,
      k && k.submission,
      k && k.fetcherSubmission,
      k && k.replace,
      k && k.initialHydration === !0,
      J,
      H,
    );
    Q ||
      ((P = null),
      qt(E, xe({ matches: te || X }, Ad(H), { loaderData: ae, errors: ze })));
  }
  async function Sh(S, E, k, O, B, X) {
    (X === void 0 && (X = {}), Va());
    let J = nx(E, k);
    if ((Re({ navigation: J }, { flushSync: X.flushSync === !0 }), B)) {
      let H = await Ji(O, E.pathname, S.signal);
      if (H.type === "aborted") return { shortCircuited: !0 };
      if (H.type === "error") {
        let Q = An(H.partialMatches).route.id;
        return {
          matches: H.partialMatches,
          pendingActionResult: [Q, { type: de.error, error: H.error }],
        };
      } else if (H.matches) O = H.matches;
      else {
        let { notFoundMatches: Q, error: te, route: ae } = Wa(E.pathname);
        return {
          matches: Q,
          pendingActionResult: [ae.id, { type: de.error, error: te }],
        };
      }
    }
    let G,
      Y = si(O, E);
    if (!Y.route.action && !Y.route.lazy)
      G = {
        type: de.error,
        error: Ze(405, {
          method: S.method,
          pathname: E.pathname,
          routeId: Y.route.id,
        }),
      };
    else if (
      ((G = (await Ur("action", y, S, [Y], O, null))[Y.route.id]),
      S.signal.aborted)
    )
      return { shortCircuited: !0 };
    if (Un(G)) {
      let H;
      return (
        X && X.replace != null
          ? (H = X.replace)
          : (H =
              Rd(
                G.response.headers.get("Location"),
                new URL(S.url),
                o,
                e.history,
              ) ===
              y.location.pathname + y.location.search),
        await Ln(S, G, !0, { submission: k, replace: H }),
        { shortCircuited: !0 }
      );
    }
    if (dn(G)) throw Ze(400, { type: "defer-action" });
    if (at(G)) {
      let H = An(O, Y.route.id);
      return (
        (X && X.replace) !== !0 && (C = Me.Push),
        { matches: O, pendingActionResult: [H.route.id, G] }
      );
    }
    return { matches: O, pendingActionResult: [Y.route.id, G] };
  }
  async function Th(S, E, k, O, B, X, J, G, Y, H, Q) {
    let te = B || bs(E, X),
      ae = X || J || Bd(te),
      ze = !A && (!p.v7_partialHydration || !Y);
    if (O) {
      if (ze) {
        let Ee = ic(Q);
        Re(xe({ navigation: te }, Ee !== void 0 ? { actionData: Ee } : {}), {
          flushSync: H,
        });
      }
      let oe = await Ji(k, E.pathname, S.signal);
      if (oe.type === "aborted") return { shortCircuited: !0 };
      if (oe.type === "error") {
        let Ee = An(oe.partialMatches).route.id;
        return {
          matches: oe.partialMatches,
          loaderData: {},
          errors: { [Ee]: oe.error },
        };
      } else if (oe.matches) k = oe.matches;
      else {
        let { error: Ee, notFoundMatches: rr, route: Wr } = Wa(E.pathname);
        return { matches: rr, loaderData: {}, errors: { [Wr.id]: Ee } };
      }
    }
    let pe = s || a,
      [ue, Te] = Md(
        e.history,
        y,
        k,
        ae,
        E,
        p.v7_partialHydration && Y === !0,
        p.v7_skipActionErrorRevalidation,
        W,
        K,
        Z,
        De,
        Pe,
        ie,
        pe,
        o,
        Q,
      );
    if (
      ($a(
        (oe) =>
          !(k && k.some((Ee) => Ee.route.id === oe)) ||
          (ue && ue.some((Ee) => Ee.route.id === oe)),
      ),
      ($ = ++z),
      ue.length === 0 && Te.length === 0)
    ) {
      let oe = oc();
      return (
        qt(
          E,
          xe(
            {
              matches: k,
              loaderData: {},
              errors: Q && at(Q[1]) ? { [Q[0]]: Q[1].error } : null,
            },
            Ad(Q),
            oe ? { fetchers: new Map(y.fetchers) } : {},
          ),
          { flushSync: H },
        ),
        { shortCircuited: !0 }
      );
    }
    if (ze) {
      let oe = {};
      if (!O) {
        oe.navigation = te;
        let Ee = ic(Q);
        Ee !== void 0 && (oe.actionData = Ee);
      }
      (Te.length > 0 && (oe.fetchers = Eh(Te)), Re(oe, { flushSync: H }));
    }
    Te.forEach((oe) => {
      (Zt(oe.key), oe.controller && R.set(oe.key, oe.controller));
    });
    let nr = () => Te.forEach((oe) => Zt(oe.key));
    P && P.signal.addEventListener("abort", nr);
    let { loaderResults: Hr, fetcherResults: It } = await lc(y, k, ue, Te, S);
    if (S.signal.aborted) return { shortCircuited: !0 };
    (P && P.signal.removeEventListener("abort", nr),
      Te.forEach((oe) => R.delete(oe.key)));
    let kt = xl(Hr);
    if (kt)
      return (
        await Ln(S, kt.result, !0, { replace: G }),
        { shortCircuited: !0 }
      );
    if (((kt = xl(It)), kt))
      return (
        ie.add(kt.key),
        await Ln(S, kt.result, !0, { replace: G }),
        { shortCircuited: !0 }
      );
    let { loaderData: Ga, errors: Vr } = Od(y, k, Hr, Q, Te, It, ve);
    (ve.forEach((oe, Ee) => {
      oe.subscribe((rr) => {
        (rr || oe.done) && ve.delete(Ee);
      });
    }),
      p.v7_partialHydration && Y && y.errors && (Vr = xe({}, y.errors, Vr)));
    let Dn = oc(),
      Zi = uc($),
      el = Dn || Zi || Te.length > 0;
    return xe(
      { matches: k, loaderData: Ga, errors: Vr },
      el ? { fetchers: new Map(y.fetchers) } : {},
    );
  }
  function ic(S) {
    if (S && !at(S[1])) return { [S[0]]: S[1].data };
    if (y.actionData)
      return Object.keys(y.actionData).length === 0 ? null : y.actionData;
  }
  function Eh(S) {
    return (
      S.forEach((E) => {
        let k = y.fetchers.get(E.key),
          O = ei(void 0, k ? k.data : void 0);
        y.fetchers.set(E.key, O);
      }),
      new Map(y.fetchers)
    );
  }
  function jh(S, E, k, O) {
    if (r)
      throw new Error(
        "router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.",
      );
    Zt(S);
    let B = (O && O.flushSync) === !0,
      X = s || a,
      J = _o(
        y.location,
        y.matches,
        o,
        p.v7_prependBasename,
        k,
        p.v7_relativeSplatPath,
        E,
        O == null ? void 0 : O.relative,
      ),
      G = In(X, J, o),
      Y = qi(G, X, J);
    if ((Y.active && Y.matches && (G = Y.matches), !G)) {
      Ot(S, E, Ze(404, { pathname: J }), { flushSync: B });
      return;
    }
    let {
      path: H,
      submission: Q,
      error: te,
    } = kd(p.v7_normalizeFormMethod, !0, J, O);
    if (te) {
      Ot(S, E, te, { flushSync: B });
      return;
    }
    let ae = si(G, H),
      ze = (O && O.preventScrollReset) === !0;
    if (Q && St(Q.formMethod)) {
      Ch(S, E, H, ae, G, Y.active, B, ze, Q);
      return;
    }
    (Pe.set(S, { routeId: E, path: H }),
      Ph(S, E, H, ae, G, Y.active, B, ze, Q));
  }
  async function Ch(S, E, k, O, B, X, J, G, Y) {
    (Va(), Pe.delete(S));
    function H(Ne) {
      if (!Ne.route.action && !Ne.route.lazy) {
        let ir = Ze(405, { method: Y.formMethod, pathname: k, routeId: E });
        return (Ot(S, E, ir, { flushSync: J }), !0);
      }
      return !1;
    }
    if (!X && H(O)) return;
    let Q = y.fetchers.get(S);
    Jt(S, rx(Y, Q), { flushSync: J });
    let te = new AbortController(),
      ae = ar(e.history, k, te.signal, Y);
    if (X) {
      let Ne = await Ji(B, new URL(ae.url).pathname, ae.signal, S);
      if (Ne.type === "aborted") return;
      if (Ne.type === "error") {
        Ot(S, E, Ne.error, { flushSync: J });
        return;
      } else if (Ne.matches) {
        if (((B = Ne.matches), (O = si(B, k)), H(O))) return;
      } else {
        Ot(S, E, Ze(404, { pathname: k }), { flushSync: J });
        return;
      }
    }
    R.set(S, te);
    let ze = z,
      ue = (await Ur("action", y, ae, [O], B, S))[O.route.id];
    if (ae.signal.aborted) {
      R.get(S) === te && R.delete(S);
      return;
    }
    if (p.v7_fetcherPersist && De.has(S)) {
      if (Un(ue) || at(ue)) {
        Jt(S, rn(void 0));
        return;
      }
    } else {
      if (Un(ue))
        if ((R.delete(S), $ > ze)) {
          Jt(S, rn(void 0));
          return;
        } else
          return (
            ie.add(S),
            Jt(S, ei(Y)),
            Ln(ae, ue, !1, { fetcherSubmission: Y, preventScrollReset: G })
          );
      if (at(ue)) {
        Ot(S, E, ue.error);
        return;
      }
    }
    if (dn(ue)) throw Ze(400, { type: "defer-action" });
    let Te = y.navigation.location || y.location,
      nr = ar(e.history, Te, te.signal),
      Hr = s || a,
      It =
        y.navigation.state !== "idle"
          ? In(Hr, y.navigation.location, o)
          : y.matches;
    ne(It, "Didn't find any matches after fetcher action");
    let kt = ++z;
    q.set(S, kt);
    let Ga = ei(Y, ue.data);
    y.fetchers.set(S, Ga);
    let [Vr, Dn] = Md(
      e.history,
      y,
      It,
      Y,
      Te,
      !1,
      p.v7_skipActionErrorRevalidation,
      W,
      K,
      Z,
      De,
      Pe,
      ie,
      Hr,
      o,
      [O.route.id, ue],
    );
    (Dn.filter((Ne) => Ne.key !== S).forEach((Ne) => {
      let ir = Ne.key,
        mc = y.fetchers.get(ir),
        _h = ei(void 0, mc ? mc.data : void 0);
      (y.fetchers.set(ir, _h),
        Zt(ir),
        Ne.controller && R.set(ir, Ne.controller));
    }),
      Re({ fetchers: new Map(y.fetchers) }));
    let Zi = () => Dn.forEach((Ne) => Zt(Ne.key));
    te.signal.addEventListener("abort", Zi);
    let { loaderResults: el, fetcherResults: oe } = await lc(y, It, Vr, Dn, nr);
    if (te.signal.aborted) return;
    (te.signal.removeEventListener("abort", Zi),
      q.delete(S),
      R.delete(S),
      Dn.forEach((Ne) => R.delete(Ne.key)));
    let Ee = xl(el);
    if (Ee) return Ln(nr, Ee.result, !1, { preventScrollReset: G });
    if (((Ee = xl(oe)), Ee))
      return (ie.add(Ee.key), Ln(nr, Ee.result, !1, { preventScrollReset: G }));
    let { loaderData: rr, errors: Wr } = Od(y, It, el, void 0, Dn, oe, ve);
    if (y.fetchers.has(S)) {
      let Ne = rn(ue.data);
      y.fetchers.set(S, Ne);
    }
    (uc(kt),
      y.navigation.state === "loading" && kt > $
        ? (ne(C, "Expected pending action"),
          P && P.abort(),
          qt(y.navigation.location, {
            matches: It,
            loaderData: rr,
            errors: Wr,
            fetchers: new Map(y.fetchers),
          }))
        : (Re({
            errors: Wr,
            loaderData: Id(y.loaderData, rr, It, Wr),
            fetchers: new Map(y.fetchers),
          }),
          (W = !1)));
  }
  async function Ph(S, E, k, O, B, X, J, G, Y) {
    let H = y.fetchers.get(S);
    Jt(S, ei(Y, H ? H.data : void 0), { flushSync: J });
    let Q = new AbortController(),
      te = ar(e.history, k, Q.signal);
    if (X) {
      let ue = await Ji(B, new URL(te.url).pathname, te.signal, S);
      if (ue.type === "aborted") return;
      if (ue.type === "error") {
        Ot(S, E, ue.error, { flushSync: J });
        return;
      } else if (ue.matches) ((B = ue.matches), (O = si(B, k)));
      else {
        Ot(S, E, Ze(404, { pathname: k }), { flushSync: J });
        return;
      }
    }
    R.set(S, Q);
    let ae = z,
      pe = (await Ur("loader", y, te, [O], B, S))[O.route.id];
    if (
      (dn(pe) && (pe = (await Hu(pe, te.signal, !0)) || pe),
      R.get(S) === Q && R.delete(S),
      !te.signal.aborted)
    ) {
      if (De.has(S)) {
        Jt(S, rn(void 0));
        return;
      }
      if (Un(pe))
        if ($ > ae) {
          Jt(S, rn(void 0));
          return;
        } else {
          (ie.add(S), await Ln(te, pe, !1, { preventScrollReset: G }));
          return;
        }
      if (at(pe)) {
        Ot(S, E, pe.error);
        return;
      }
      (ne(!dn(pe), "Unhandled fetcher deferred data"), Jt(S, rn(pe.data)));
    }
  }
  async function Ln(S, E, k, O) {
    let {
      submission: B,
      fetcherSubmission: X,
      preventScrollReset: J,
      replace: G,
    } = O === void 0 ? {} : O;
    E.response.headers.has("X-Remix-Revalidate") && (W = !0);
    let Y = E.response.headers.get("Location");
    (ne(Y, "Expected a Location header on the redirect Response"),
      (Y = Rd(Y, new URL(S.url), o, e.history)));
    let H = Ai(y.location, Y, { _isRedirect: !0 });
    if (n) {
      let ue = !1;
      if (E.response.headers.has("X-Remix-Reload-Document")) ue = !0;
      else if (Uu.test(Y)) {
        const Te = e.history.createURL(Y);
        ue = Te.origin !== t.location.origin || Qt(Te.pathname, o) == null;
      }
      if (ue) {
        G ? t.location.replace(Y) : t.location.assign(Y);
        return;
      }
    }
    P = null;
    let Q =
        G === !0 || E.response.headers.has("X-Remix-Replace")
          ? Me.Replace
          : Me.Push,
      { formMethod: te, formAction: ae, formEncType: ze } = y.navigation;
    !B && !X && te && ae && ze && (B = Bd(y.navigation));
    let pe = B || X;
    if (A0.has(E.response.status) && pe && St(pe.formMethod))
      await Mn(Q, H, {
        submission: xe({}, pe, { formAction: Y }),
        preventScrollReset: J || M,
        enableViewTransition: k ? _ : void 0,
      });
    else {
      let ue = bs(H, B);
      await Mn(Q, H, {
        overrideNavigation: ue,
        fetcherSubmission: X,
        preventScrollReset: J || M,
        enableViewTransition: k ? _ : void 0,
      });
    }
  }
  async function Ur(S, E, k, O, B, X) {
    let J,
      G = {};
    try {
      J = await $0(c, S, E, k, O, B, X, l, i);
    } catch (Y) {
      return (
        O.forEach((H) => {
          G[H.route.id] = { type: de.error, error: Y };
        }),
        G
      );
    }
    for (let [Y, H] of Object.entries(J))
      if (q0(H)) {
        let Q = H.result;
        G[Y] = {
          type: de.redirect,
          response: Y0(Q, k, Y, B, o, p.v7_relativeSplatPath),
        };
      } else G[Y] = await K0(H);
    return G;
  }
  async function lc(S, E, k, O, B) {
    let X = S.matches,
      J = Ur("loader", S, B, k, E, null),
      G = Promise.all(
        O.map(async (Q) => {
          if (Q.matches && Q.match && Q.controller) {
            let ae = (
              await Ur(
                "loader",
                S,
                ar(e.history, Q.path, Q.controller.signal),
                [Q.match],
                Q.matches,
                Q.key,
              )
            )[Q.match.route.id];
            return { [Q.key]: ae };
          } else
            return Promise.resolve({
              [Q.key]: { type: de.error, error: Ze(404, { pathname: Q.path }) },
            });
        }),
      ),
      Y = await J,
      H = (await G).reduce((Q, te) => Object.assign(Q, te), {});
    return (
      await Promise.all([ex(E, Y, B.signal, X, S.loaderData), tx(E, H, O)]),
      { loaderResults: Y, fetcherResults: H }
    );
  }
  function Va() {
    ((W = !0),
      K.push(...$a()),
      Pe.forEach((S, E) => {
        (R.has(E) && Z.add(E), Zt(E));
      }));
  }
  function Jt(S, E, k) {
    (k === void 0 && (k = {}),
      y.fetchers.set(S, E),
      Re(
        { fetchers: new Map(y.fetchers) },
        { flushSync: (k && k.flushSync) === !0 },
      ));
  }
  function Ot(S, E, k, O) {
    O === void 0 && (O = {});
    let B = An(y.matches, E);
    (Qi(S),
      Re(
        { errors: { [B.route.id]: k }, fetchers: new Map(y.fetchers) },
        { flushSync: (O && O.flushSync) === !0 },
      ));
  }
  function ac(S) {
    return (
      ce.set(S, (ce.get(S) || 0) + 1),
      De.has(S) && De.delete(S),
      y.fetchers.get(S) || z0
    );
  }
  function Qi(S) {
    let E = y.fetchers.get(S);
    (R.has(S) && !(E && E.state === "loading" && q.has(S)) && Zt(S),
      Pe.delete(S),
      q.delete(S),
      ie.delete(S),
      p.v7_fetcherPersist && De.delete(S),
      Z.delete(S),
      y.fetchers.delete(S));
  }
  function kh(S) {
    let E = (ce.get(S) || 0) - 1;
    (E <= 0
      ? (ce.delete(S), De.add(S), p.v7_fetcherPersist || Qi(S))
      : ce.set(S, E),
      Re({ fetchers: new Map(y.fetchers) }));
  }
  function Zt(S) {
    let E = R.get(S);
    E && (E.abort(), R.delete(S));
  }
  function sc(S) {
    for (let E of S) {
      let k = ac(E),
        O = rn(k.data);
      y.fetchers.set(E, O);
    }
  }
  function oc() {
    let S = [],
      E = !1;
    for (let k of ie) {
      let O = y.fetchers.get(k);
      (ne(O, "Expected fetcher: " + k),
        O.state === "loading" && (ie.delete(k), S.push(k), (E = !0)));
    }
    return (sc(S), E);
  }
  function uc(S) {
    let E = [];
    for (let [k, O] of q)
      if (O < S) {
        let B = y.fetchers.get(k);
        (ne(B, "Expected fetcher: " + k),
          B.state === "loading" && (Zt(k), q.delete(k), E.push(k)));
      }
    return (sc(E), E.length > 0);
  }
  function Nh(S, E) {
    let k = y.blockers.get(S) || Zr;
    return (Ke.get(S) !== E && Ke.set(S, E), k);
  }
  function cc(S) {
    (y.blockers.delete(S), Ke.delete(S));
  }
  function Xi(S, E) {
    let k = y.blockers.get(S) || Zr;
    ne(
      (k.state === "unblocked" && E.state === "blocked") ||
        (k.state === "blocked" && E.state === "blocked") ||
        (k.state === "blocked" && E.state === "proceeding") ||
        (k.state === "blocked" && E.state === "unblocked") ||
        (k.state === "proceeding" && E.state === "unblocked"),
      "Invalid blocker state transition: " + k.state + " -> " + E.state,
    );
    let O = new Map(y.blockers);
    (O.set(S, E), Re({ blockers: O }));
  }
  function dc(S) {
    let { currentLocation: E, nextLocation: k, historyAction: O } = S;
    if (Ke.size === 0) return;
    Ke.size > 1 && Xn(!1, "A router only supports one blocker at a time");
    let B = Array.from(Ke.entries()),
      [X, J] = B[B.length - 1],
      G = y.blockers.get(X);
    if (
      !(G && G.state === "proceeding") &&
      J({ currentLocation: E, nextLocation: k, historyAction: O })
    )
      return X;
  }
  function Wa(S) {
    let E = Ze(404, { pathname: S }),
      k = s || a,
      { matches: O, route: B } = zd(k);
    return ($a(), { notFoundMatches: O, route: B, error: E });
  }
  function $a(S) {
    let E = [];
    return (
      ve.forEach((k, O) => {
        (!S || S(O)) && (k.cancel(), E.push(O), ve.delete(O));
      }),
      E
    );
  }
  function Mh(S, E, k) {
    if (((x = S), (N = E), (b = k || null), !g && y.navigation === ws)) {
      g = !0;
      let O = pc(y.location, y.matches);
      O != null && Re({ restoreScrollPosition: O });
    }
    return () => {
      ((x = null), (N = null), (b = null));
    };
  }
  function fc(S, E) {
    return (
      (b &&
        b(
          S,
          E.map((O) => m0(O, y.loaderData)),
        )) ||
      S.key
    );
  }
  function Lh(S, E) {
    if (x && N) {
      let k = fc(S, E);
      x[k] = N();
    }
  }
  function pc(S, E) {
    if (x) {
      let k = fc(S, E),
        O = x[k];
      if (typeof O == "number") return O;
    }
    return null;
  }
  function qi(S, E, k) {
    if (d)
      if (S) {
        if (Object.keys(S[0].params).length > 0)
          return { active: !0, matches: Ol(E, k, o, !0) };
      } else return { active: !0, matches: Ol(E, k, o, !0) || [] };
    return { active: !1, matches: null };
  }
  async function Ji(S, E, k, O) {
    if (!d) return { type: "success", matches: S };
    let B = S;
    for (;;) {
      let X = s == null,
        J = s || a,
        G = l;
      try {
        await d({
          signal: k,
          path: E,
          matches: B,
          fetcherKey: O,
          patch: (Q, te) => {
            k.aborted || Dd(Q, te, J, G, i);
          },
        });
      } catch (Q) {
        return { type: "error", error: Q, partialMatches: B };
      } finally {
        X && !k.aborted && (a = [...a]);
      }
      if (k.aborted) return { type: "aborted" };
      let Y = In(J, E, o);
      if (Y) return { type: "success", matches: Y };
      let H = Ol(J, E, o, !0);
      if (
        !H ||
        (B.length === H.length &&
          B.every((Q, te) => Q.route.id === H[te].route.id))
      )
        return { type: "success", matches: null };
      B = H;
    }
  }
  function Dh(S) {
    ((l = {}), (s = ua(S, i, void 0, l)));
  }
  function Rh(S, E) {
    let k = s == null;
    (Dd(S, E, s || a, l, i), k && ((a = [...a]), Re({})));
  }
  return (
    (L = {
      get basename() {
        return o;
      },
      get future() {
        return p;
      },
      get state() {
        return y;
      },
      get routes() {
        return a;
      },
      get window() {
        return t;
      },
      initialize: Ki,
      subscribe: Yi,
      enableScrollRestoration: Mh,
      navigate: rc,
      fetch: jh,
      revalidate: bh,
      createHref: (S) => e.history.createHref(S),
      encodeLocation: (S) => e.history.encodeLocation(S),
      getFetcher: ac,
      deleteFetcher: kh,
      dispose: Br,
      getBlocker: Nh,
      deleteBlocker: cc,
      patchRoutes: Rh,
      _internalFetchControllers: R,
      _internalActiveDeferreds: ve,
      _internalSetRoutes: Dh,
    }),
    L
  );
}
function U0(e) {
  return (
    e != null &&
    (("formData" in e && e.formData != null) ||
      ("body" in e && e.body !== void 0))
  );
}
function _o(e, t, n, r, i, l, a, s) {
  let o, c;
  if (a) {
    o = [];
    for (let p of t)
      if ((o.push(p), p.route.id === a)) {
        c = p;
        break;
      }
  } else ((o = t), (c = t[t.length - 1]));
  let d = Bu(i || ".", Fu(o, l), Qt(e.pathname, n) || e.pathname, s === "path");
  if (
    (i == null && ((d.search = e.search), (d.hash = e.hash)),
    (i == null || i === "" || i === ".") && c)
  ) {
    let p = Vu(d.search);
    if (c.route.index && !p)
      d.search = d.search ? d.search.replace(/^\?/, "?index&") : "?index";
    else if (!c.route.index && p) {
      let h = new URLSearchParams(d.search),
        v = h.getAll("index");
      (h.delete("index"),
        v.filter((b) => b).forEach((b) => h.append("index", b)));
      let x = h.toString();
      d.search = x ? "?" + x : "";
    }
  }
  return (
    r &&
      n !== "/" &&
      (d.pathname = d.pathname === "/" ? n : Wt([n, d.pathname])),
    qn(d)
  );
}
function kd(e, t, n, r) {
  if (!r || !U0(r)) return { path: n };
  if (r.formMethod && !Z0(r.formMethod))
    return { path: n, error: Ze(405, { method: r.formMethod }) };
  let i = () => ({ path: n, error: Ze(400, { type: "invalid-body" }) }),
    l = r.formMethod || "get",
    a = e ? l.toUpperCase() : l.toLowerCase(),
    s = Mm(n);
  if (r.body !== void 0) {
    if (r.formEncType === "text/plain") {
      if (!St(a)) return i();
      let h =
        typeof r.body == "string"
          ? r.body
          : r.body instanceof FormData || r.body instanceof URLSearchParams
            ? Array.from(r.body.entries()).reduce((v, x) => {
                let [b, N] = x;
                return (
                  "" +
                  v +
                  b +
                  "=" +
                  N +
                  `
`
                );
              }, "")
            : String(r.body);
      return {
        path: n,
        submission: {
          formMethod: a,
          formAction: s,
          formEncType: r.formEncType,
          formData: void 0,
          json: void 0,
          text: h,
        },
      };
    } else if (r.formEncType === "application/json") {
      if (!St(a)) return i();
      try {
        let h = typeof r.body == "string" ? JSON.parse(r.body) : r.body;
        return {
          path: n,
          submission: {
            formMethod: a,
            formAction: s,
            formEncType: r.formEncType,
            formData: void 0,
            json: h,
            text: void 0,
          },
        };
      } catch {
        return i();
      }
    }
  }
  ne(
    typeof FormData == "function",
    "FormData is not available in this environment",
  );
  let o, c;
  if (r.formData) ((o = Io(r.formData)), (c = r.formData));
  else if (r.body instanceof FormData) ((o = Io(r.body)), (c = r.body));
  else if (r.body instanceof URLSearchParams) ((o = r.body), (c = _d(o)));
  else if (r.body == null) ((o = new URLSearchParams()), (c = new FormData()));
  else
    try {
      ((o = new URLSearchParams(r.body)), (c = _d(o)));
    } catch {
      return i();
    }
  let d = {
    formMethod: a,
    formAction: s,
    formEncType: (r && r.formEncType) || "application/x-www-form-urlencoded",
    formData: c,
    json: void 0,
    text: void 0,
  };
  if (St(d.formMethod)) return { path: n, submission: d };
  let p = Cn(n);
  return (
    t && p.search && Vu(p.search) && o.append("index", ""),
    (p.search = "?" + o),
    { path: qn(p), submission: d }
  );
}
function Nd(e, t, n) {
  n === void 0 && (n = !1);
  let r = e.findIndex((i) => i.route.id === t);
  return r >= 0 ? e.slice(0, n ? r + 1 : r) : e;
}
function Md(e, t, n, r, i, l, a, s, o, c, d, p, h, v, x, b) {
  let N = b ? (at(b[1]) ? b[1].error : b[1].data) : void 0,
    g = e.createURL(t.location),
    f = e.createURL(i),
    m = n;
  l && t.errors
    ? (m = Nd(n, Object.keys(t.errors)[0], !0))
    : b && at(b[1]) && (m = Nd(n, b[0]));
  let w = b ? b[1].statusCode : void 0,
    T = a && w && w >= 400,
    L = m.filter((C, M) => {
      let { route: P } = C;
      if (P.lazy) return !0;
      if (P.loader == null) return !1;
      if (l) return Oo(P, t.loaderData, t.errors);
      if (H0(t.loaderData, t.matches[M], C) || o.some((D) => D === C.route.id))
        return !0;
      let _ = t.matches[M],
        F = C;
      return Ld(
        C,
        xe(
          {
            currentUrl: g,
            currentParams: _.params,
            nextUrl: f,
            nextParams: F.params,
          },
          r,
          {
            actionResult: N,
            actionStatus: w,
            defaultShouldRevalidate: T
              ? !1
              : s ||
                g.pathname + g.search === f.pathname + f.search ||
                g.search !== f.search ||
                km(_, F),
          },
        ),
      );
    }),
    y = [];
  return (
    p.forEach((C, M) => {
      if (l || !n.some((A) => A.route.id === C.routeId) || d.has(M)) return;
      let P = In(v, C.path, x);
      if (!P) {
        y.push({
          key: M,
          routeId: C.routeId,
          path: C.path,
          matches: null,
          match: null,
          controller: null,
        });
        return;
      }
      let _ = t.fetchers.get(M),
        F = si(P, C.path),
        D = !1;
      (h.has(M)
        ? (D = !1)
        : c.has(M)
          ? (c.delete(M), (D = !0))
          : _ && _.state !== "idle" && _.data === void 0
            ? (D = s)
            : (D = Ld(
                F,
                xe(
                  {
                    currentUrl: g,
                    currentParams: t.matches[t.matches.length - 1].params,
                    nextUrl: f,
                    nextParams: n[n.length - 1].params,
                  },
                  r,
                  {
                    actionResult: N,
                    actionStatus: w,
                    defaultShouldRevalidate: T ? !1 : s,
                  },
                ),
              )),
        D &&
          y.push({
            key: M,
            routeId: C.routeId,
            path: C.path,
            matches: P,
            match: F,
            controller: new AbortController(),
          }));
    }),
    [L, y]
  );
}
function Oo(e, t, n) {
  if (e.lazy) return !0;
  if (!e.loader) return !1;
  let r = t != null && t[e.id] !== void 0,
    i = n != null && n[e.id] !== void 0;
  return !r && i
    ? !1
    : typeof e.loader == "function" && e.loader.hydrate === !0
      ? !0
      : !r && !i;
}
function H0(e, t, n) {
  let r = !t || n.route.id !== t.route.id,
    i = e[n.route.id] === void 0;
  return r || i;
}
function km(e, t) {
  let n = e.route.path;
  return (
    e.pathname !== t.pathname ||
    (n != null && n.endsWith("*") && e.params["*"] !== t.params["*"])
  );
}
function Ld(e, t) {
  if (e.route.shouldRevalidate) {
    let n = e.route.shouldRevalidate(t);
    if (typeof n == "boolean") return n;
  }
  return t.defaultShouldRevalidate;
}
function Dd(e, t, n, r, i) {
  var l;
  let a;
  if (e) {
    let c = r[e];
    (ne(c, "No route found to patch children into: routeId = " + e),
      c.children || (c.children = []),
      (a = c.children));
  } else a = n;
  let s = t.filter((c) => !a.some((d) => Nm(c, d))),
    o = ua(
      s,
      i,
      [e || "_", "patch", String(((l = a) == null ? void 0 : l.length) || "0")],
      r,
    );
  a.push(...o);
}
function Nm(e, t) {
  return "id" in e && "id" in t && e.id === t.id
    ? !0
    : e.index === t.index &&
        e.path === t.path &&
        e.caseSensitive === t.caseSensitive
      ? (!e.children || e.children.length === 0) &&
        (!t.children || t.children.length === 0)
        ? !0
        : e.children.every((n, r) => {
            var i;
            return (i = t.children) == null ? void 0 : i.some((l) => Nm(n, l));
          })
      : !1;
}
async function V0(e, t, n) {
  if (!e.lazy) return;
  let r = await e.lazy();
  if (!e.lazy) return;
  let i = n[e.id];
  ne(i, "No route found in manifest");
  let l = {};
  for (let a in r) {
    let o = i[a] !== void 0 && a !== "hasErrorBoundary";
    (Xn(
      !o,
      'Route "' +
        i.id +
        '" has a static property "' +
        a +
        '" defined but its lazy function is also returning a value for this property. ' +
        ('The lazy route property "' + a + '" will be ignored.'),
    ),
      !o && !f0.has(a) && (l[a] = r[a]));
  }
  (Object.assign(i, l), Object.assign(i, xe({}, t(i), { lazy: void 0 })));
}
async function W0(e) {
  let { matches: t } = e,
    n = t.filter((i) => i.shouldLoad);
  return (await Promise.all(n.map((i) => i.resolve()))).reduce(
    (i, l, a) => Object.assign(i, { [n[a].route.id]: l }),
    {},
  );
}
async function $0(e, t, n, r, i, l, a, s, o, c) {
  let d = l.map((v) => (v.route.lazy ? V0(v.route, o, s) : void 0)),
    p = l.map((v, x) => {
      let b = d[x],
        N = i.some((f) => f.route.id === v.route.id);
      return xe({}, v, {
        shouldLoad: N,
        resolve: async (f) => (
          f &&
            r.method === "GET" &&
            (v.route.lazy || v.route.loader) &&
            (N = !0),
          N
            ? G0(t, r, v, b, f, c)
            : Promise.resolve({ type: de.data, result: void 0 })
        ),
      });
    }),
    h = await e({
      matches: p,
      request: r,
      params: l[0].params,
      fetcherKey: a,
      context: c,
    });
  try {
    await Promise.all(d);
  } catch {}
  return h;
}
async function G0(e, t, n, r, i, l) {
  let a,
    s,
    o = (c) => {
      let d,
        p = new Promise((x, b) => (d = b));
      ((s = () => d()), t.signal.addEventListener("abort", s));
      let h = (x) =>
          typeof c != "function"
            ? Promise.reject(
                new Error(
                  "You cannot call the handler for a route which defines a boolean " +
                    ('"' + e + '" [routeId: ' + n.route.id + "]"),
                ),
              )
            : c(
                { request: t, params: n.params, context: l },
                ...(x !== void 0 ? [x] : []),
              ),
        v = (async () => {
          try {
            return { type: "data", result: await (i ? i((b) => h(b)) : h()) };
          } catch (x) {
            return { type: "error", result: x };
          }
        })();
      return Promise.race([v, p]);
    };
  try {
    let c = n.route[e];
    if (r)
      if (c) {
        let d,
          [p] = await Promise.all([
            o(c).catch((h) => {
              d = h;
            }),
            r,
          ]);
        if (d !== void 0) throw d;
        a = p;
      } else if ((await r, (c = n.route[e]), c)) a = await o(c);
      else if (e === "action") {
        let d = new URL(t.url),
          p = d.pathname + d.search;
        throw Ze(405, { method: t.method, pathname: p, routeId: n.route.id });
      } else return { type: de.data, result: void 0 };
    else if (c) a = await o(c);
    else {
      let d = new URL(t.url),
        p = d.pathname + d.search;
      throw Ze(404, { pathname: p });
    }
    ne(
      a.result !== void 0,
      "You defined " +
        (e === "action" ? "an action" : "a loader") +
        " for route " +
        ('"' +
          n.route.id +
          "\" but didn't return anything from your `" +
          e +
          "` ") +
        "function. Please return a value or `null`.",
    );
  } catch (c) {
    return { type: de.error, result: c };
  } finally {
    s && t.signal.removeEventListener("abort", s);
  }
  return a;
}
async function K0(e) {
  let { result: t, type: n } = e;
  if (Lm(t)) {
    let p;
    try {
      let h = t.headers.get("Content-Type");
      h && /\bapplication\/json\b/.test(h)
        ? t.body == null
          ? (p = null)
          : (p = await t.json())
        : (p = await t.text());
    } catch (h) {
      return { type: de.error, error: h };
    }
    return n === de.error
      ? {
          type: de.error,
          error: new da(t.status, t.statusText, p),
          statusCode: t.status,
          headers: t.headers,
        }
      : { type: de.data, data: p, statusCode: t.status, headers: t.headers };
  }
  if (n === de.error) {
    if (Fd(t)) {
      var r, i;
      if (t.data instanceof Error) {
        var l, a;
        return {
          type: de.error,
          error: t.data,
          statusCode: (l = t.init) == null ? void 0 : l.status,
          headers:
            (a = t.init) != null && a.headers
              ? new Headers(t.init.headers)
              : void 0,
        };
      }
      return {
        type: de.error,
        error: new da(
          ((r = t.init) == null ? void 0 : r.status) || 500,
          void 0,
          t.data,
        ),
        statusCode: zi(t) ? t.status : void 0,
        headers:
          (i = t.init) != null && i.headers
            ? new Headers(t.init.headers)
            : void 0,
      };
    }
    return { type: de.error, error: t, statusCode: zi(t) ? t.status : void 0 };
  }
  if (J0(t)) {
    var s, o;
    return {
      type: de.deferred,
      deferredData: t,
      statusCode: (s = t.init) == null ? void 0 : s.status,
      headers:
        ((o = t.init) == null ? void 0 : o.headers) &&
        new Headers(t.init.headers),
    };
  }
  if (Fd(t)) {
    var c, d;
    return {
      type: de.data,
      data: t.data,
      statusCode: (c = t.init) == null ? void 0 : c.status,
      headers:
        (d = t.init) != null && d.headers
          ? new Headers(t.init.headers)
          : void 0,
    };
  }
  return { type: de.data, data: t };
}
function Y0(e, t, n, r, i, l) {
  let a = e.headers.get("Location");
  if (
    (ne(
      a,
      "Redirects returned/thrown from loaders/actions must have a Location header",
    ),
    !Uu.test(a))
  ) {
    let s = r.slice(0, r.findIndex((o) => o.route.id === n) + 1);
    ((a = _o(new URL(t.url), s, i, !0, a, l)), e.headers.set("Location", a));
  }
  return e;
}
function Rd(e, t, n, r) {
  let i = [
    "about:",
    "blob:",
    "chrome:",
    "chrome-untrusted:",
    "content:",
    "data:",
    "devtools:",
    "file:",
    "filesystem:",
    "javascript:",
  ];
  if (Uu.test(e)) {
    let l = e,
      a = l.startsWith("//") ? new URL(t.protocol + l) : new URL(l);
    if (i.includes(a.protocol)) throw new Error("Invalid redirect location");
    let s = Qt(a.pathname, n) != null;
    if (a.origin === t.origin && s) return a.pathname + a.search + a.hash;
  }
  try {
    let l = r.createURL(e);
    if (i.includes(l.protocol)) throw new Error("Invalid redirect location");
  } catch {}
  return e;
}
function ar(e, t, n, r) {
  let i = e.createURL(Mm(t)).toString(),
    l = { signal: n };
  if (r && St(r.formMethod)) {
    let { formMethod: a, formEncType: s } = r;
    ((l.method = a.toUpperCase()),
      s === "application/json"
        ? ((l.headers = new Headers({ "Content-Type": s })),
          (l.body = JSON.stringify(r.json)))
        : s === "text/plain"
          ? (l.body = r.text)
          : s === "application/x-www-form-urlencoded" && r.formData
            ? (l.body = Io(r.formData))
            : (l.body = r.formData));
  }
  return new Request(i, l);
}
function Io(e) {
  let t = new URLSearchParams();
  for (let [n, r] of e.entries())
    t.append(n, typeof r == "string" ? r : r.name);
  return t;
}
function _d(e) {
  let t = new FormData();
  for (let [n, r] of e.entries()) t.append(n, r);
  return t;
}
function Q0(e, t, n, r, i) {
  let l = {},
    a = null,
    s,
    o = !1,
    c = {},
    d = n && at(n[1]) ? n[1].error : void 0;
  return (
    e.forEach((p) => {
      if (!(p.route.id in t)) return;
      let h = p.route.id,
        v = t[h];
      if (
        (ne(!Un(v), "Cannot handle redirect results in processLoaderData"),
        at(v))
      ) {
        let x = v.error;
        (d !== void 0 && ((x = d), (d = void 0)), (a = a || {}));
        {
          let b = An(e, h);
          a[b.route.id] == null && (a[b.route.id] = x);
        }
        ((l[h] = void 0),
          o || ((o = !0), (s = zi(v.error) ? v.error.status : 500)),
          v.headers && (c[h] = v.headers));
      } else
        dn(v)
          ? (r.set(h, v.deferredData),
            (l[h] = v.deferredData.data),
            v.statusCode != null &&
              v.statusCode !== 200 &&
              !o &&
              (s = v.statusCode),
            v.headers && (c[h] = v.headers))
          : ((l[h] = v.data),
            v.statusCode && v.statusCode !== 200 && !o && (s = v.statusCode),
            v.headers && (c[h] = v.headers));
    }),
    d !== void 0 && n && ((a = { [n[0]]: d }), (l[n[0]] = void 0)),
    { loaderData: l, errors: a, statusCode: s || 200, loaderHeaders: c }
  );
}
function Od(e, t, n, r, i, l, a) {
  let { loaderData: s, errors: o } = Q0(t, n, r, a);
  return (
    i.forEach((c) => {
      let { key: d, match: p, controller: h } = c,
        v = l[d];
      if (
        (ne(v, "Did not find corresponding fetcher result"),
        !(h && h.signal.aborted))
      )
        if (at(v)) {
          let x = An(e.matches, p == null ? void 0 : p.route.id);
          ((o && o[x.route.id]) || (o = xe({}, o, { [x.route.id]: v.error })),
            e.fetchers.delete(d));
        } else if (Un(v)) ne(!1, "Unhandled fetcher revalidation redirect");
        else if (dn(v)) ne(!1, "Unhandled fetcher deferred data");
        else {
          let x = rn(v.data);
          e.fetchers.set(d, x);
        }
    }),
    { loaderData: s, errors: o }
  );
}
function Id(e, t, n, r) {
  let i = xe({}, t);
  for (let l of n) {
    let a = l.route.id;
    if (
      (t.hasOwnProperty(a)
        ? t[a] !== void 0 && (i[a] = t[a])
        : e[a] !== void 0 && l.route.loader && (i[a] = e[a]),
      r && r.hasOwnProperty(a))
    )
      break;
  }
  return i;
}
function Ad(e) {
  return e
    ? at(e[1])
      ? { actionData: {} }
      : { actionData: { [e[0]]: e[1].data } }
    : {};
}
function An(e, t) {
  return (
    (t ? e.slice(0, e.findIndex((r) => r.route.id === t) + 1) : [...e])
      .reverse()
      .find((r) => r.route.hasErrorBoundary === !0) || e[0]
  );
}
function zd(e) {
  let t =
    e.length === 1
      ? e[0]
      : e.find((n) => n.index || !n.path || n.path === "/") || {
          id: "__shim-error-route__",
        };
  return {
    matches: [{ params: {}, pathname: "", pathnameBase: "", route: t }],
    route: t,
  };
}
function Ze(e, t) {
  let {
      pathname: n,
      routeId: r,
      method: i,
      type: l,
      message: a,
    } = t === void 0 ? {} : t,
    s = "Unknown Server Error",
    o = "Unknown @remix-run/router error";
  return (
    e === 400
      ? ((s = "Bad Request"),
        i && n && r
          ? (o =
              "You made a " +
              i +
              ' request to "' +
              n +
              '" but ' +
              ('did not provide a `loader` for route "' + r + '", ') +
              "so there is no way to handle the request.")
          : l === "defer-action"
            ? (o = "defer() is not supported in actions")
            : l === "invalid-body" && (o = "Unable to encode submission body"))
      : e === 403
        ? ((s = "Forbidden"),
          (o = 'Route "' + r + '" does not match URL "' + n + '"'))
        : e === 404
          ? ((s = "Not Found"), (o = 'No route matches URL "' + n + '"'))
          : e === 405 &&
            ((s = "Method Not Allowed"),
            i && n && r
              ? (o =
                  "You made a " +
                  i.toUpperCase() +
                  ' request to "' +
                  n +
                  '" but ' +
                  ('did not provide an `action` for route "' + r + '", ') +
                  "so there is no way to handle the request.")
              : i && (o = 'Invalid request method "' + i.toUpperCase() + '"')),
    new da(e || 500, s, new Error(o), !0)
  );
}
function xl(e) {
  let t = Object.entries(e);
  for (let n = t.length - 1; n >= 0; n--) {
    let [r, i] = t[n];
    if (Un(i)) return { key: r, result: i };
  }
}
function Mm(e) {
  let t = typeof e == "string" ? Cn(e) : e;
  return qn(xe({}, t, { hash: "" }));
}
function X0(e, t) {
  return e.pathname !== t.pathname || e.search !== t.search
    ? !1
    : e.hash === ""
      ? t.hash !== ""
      : e.hash === t.hash
        ? !0
        : t.hash !== "";
}
function q0(e) {
  return Lm(e.result) && I0.has(e.result.status);
}
function dn(e) {
  return e.type === de.deferred;
}
function at(e) {
  return e.type === de.error;
}
function Un(e) {
  return (e && e.type) === de.redirect;
}
function Fd(e) {
  return (
    typeof e == "object" &&
    e != null &&
    "type" in e &&
    "data" in e &&
    "init" in e &&
    e.type === "DataWithResponseInit"
  );
}
function J0(e) {
  let t = e;
  return (
    t &&
    typeof t == "object" &&
    typeof t.data == "object" &&
    typeof t.subscribe == "function" &&
    typeof t.cancel == "function" &&
    typeof t.resolveData == "function"
  );
}
function Lm(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.headers == "object" &&
    typeof e.body < "u"
  );
}
function Z0(e) {
  return O0.has(e.toLowerCase());
}
function St(e) {
  return R0.has(e.toLowerCase());
}
async function ex(e, t, n, r, i) {
  let l = Object.entries(t);
  for (let a = 0; a < l.length; a++) {
    let [s, o] = l[a],
      c = e.find((h) => (h == null ? void 0 : h.route.id) === s);
    if (!c) continue;
    let d = r.find((h) => h.route.id === c.route.id),
      p = d != null && !km(d, c) && (i && i[c.route.id]) !== void 0;
    dn(o) &&
      p &&
      (await Hu(o, n, !1).then((h) => {
        h && (t[s] = h);
      }));
  }
}
async function tx(e, t, n) {
  for (let r = 0; r < n.length; r++) {
    let { key: i, routeId: l, controller: a } = n[r],
      s = t[i];
    e.find((c) => (c == null ? void 0 : c.route.id) === l) &&
      dn(s) &&
      (ne(
        a,
        "Expected an AbortController for revalidating fetcher deferred result",
      ),
      await Hu(s, a.signal, !0).then((c) => {
        c && (t[i] = c);
      }));
  }
}
async function Hu(e, t, n) {
  if ((n === void 0 && (n = !1), !(await e.deferredData.resolveData(t)))) {
    if (n)
      try {
        return { type: de.data, data: e.deferredData.unwrappedData };
      } catch (i) {
        return { type: de.error, error: i };
      }
    return { type: de.data, data: e.deferredData.data };
  }
}
function Vu(e) {
  return new URLSearchParams(e).getAll("index").some((t) => t === "");
}
function si(e, t) {
  let n = typeof t == "string" ? Cn(t).search : t.search;
  if (e[e.length - 1].route.index && Vu(n || "")) return e[e.length - 1];
  let r = jm(e);
  return r[r.length - 1];
}
function Bd(e) {
  let {
    formMethod: t,
    formAction: n,
    formEncType: r,
    text: i,
    formData: l,
    json: a,
  } = e;
  if (!(!t || !n || !r)) {
    if (i != null)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: void 0,
        json: void 0,
        text: i,
      };
    if (l != null)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: l,
        json: void 0,
        text: void 0,
      };
    if (a !== void 0)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: void 0,
        json: a,
        text: void 0,
      };
  }
}
function bs(e, t) {
  return t
    ? {
        state: "loading",
        location: e,
        formMethod: t.formMethod,
        formAction: t.formAction,
        formEncType: t.formEncType,
        formData: t.formData,
        json: t.json,
        text: t.text,
      }
    : {
        state: "loading",
        location: e,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
      };
}
function nx(e, t) {
  return {
    state: "submitting",
    location: e,
    formMethod: t.formMethod,
    formAction: t.formAction,
    formEncType: t.formEncType,
    formData: t.formData,
    json: t.json,
    text: t.text,
  };
}
function ei(e, t) {
  return e
    ? {
        state: "loading",
        formMethod: e.formMethod,
        formAction: e.formAction,
        formEncType: e.formEncType,
        formData: e.formData,
        json: e.json,
        text: e.text,
        data: t,
      }
    : {
        state: "loading",
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
        data: t,
      };
}
function rx(e, t) {
  return {
    state: "submitting",
    formMethod: e.formMethod,
    formAction: e.formAction,
    formEncType: e.formEncType,
    formData: e.formData,
    json: e.json,
    text: e.text,
    data: t ? t.data : void 0,
  };
}
function rn(e) {
  return {
    state: "idle",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: e,
  };
}
function ix(e, t) {
  try {
    let n = e.sessionStorage.getItem(Pm);
    if (n) {
      let r = JSON.parse(n);
      for (let [i, l] of Object.entries(r || {}))
        l && Array.isArray(l) && t.set(i, new Set(l || []));
    }
  } catch {}
}
function lx(e, t) {
  if (t.size > 0) {
    let n = {};
    for (let [r, i] of t) n[r] = [...i];
    try {
      e.sessionStorage.setItem(Pm, JSON.stringify(n));
    } catch (r) {
      Xn(
        !1,
        "Failed to save applied view transitions in sessionStorage (" +
          r +
          ").",
      );
    }
  }
}
/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function fa() {
  return (
    (fa = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    fa.apply(this, arguments)
  );
}
const Wi = j.createContext(null),
  Wu = j.createContext(null),
  Pn = j.createContext(null),
  $u = j.createContext(null),
  kn = j.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  Dm = j.createContext(null);
function ax(e, t) {
  let { relative: n } = t === void 0 ? {} : t;
  $i() || ne(!1);
  let { basename: r, navigator: i } = j.useContext(Pn),
    { hash: l, pathname: a, search: s } = za(e, { relative: n }),
    o = a;
  return (
    r !== "/" && (o = a === "/" ? r : Wt([r, a])),
    i.createHref({ pathname: o, search: s, hash: l })
  );
}
function $i() {
  return j.useContext($u) != null;
}
function zr() {
  return ($i() || ne(!1), j.useContext($u).location);
}
function Rm(e) {
  j.useContext(Pn).static || j.useLayoutEffect(e);
}
function sx() {
  let { isDataRoute: e } = j.useContext(kn);
  return e ? bx() : ox();
}
function ox() {
  $i() || ne(!1);
  let e = j.useContext(Wi),
    { basename: t, future: n, navigator: r } = j.useContext(Pn),
    { matches: i } = j.useContext(kn),
    { pathname: l } = zr(),
    a = JSON.stringify(Fu(i, n.v7_relativeSplatPath)),
    s = j.useRef(!1);
  return (
    Rm(() => {
      s.current = !0;
    }),
    j.useCallback(
      function (c, d) {
        if ((d === void 0 && (d = {}), !s.current)) return;
        if (typeof c == "number") {
          r.go(c);
          return;
        }
        let p = Bu(c, JSON.parse(a), l, d.relative === "path");
        (e == null &&
          t !== "/" &&
          (p.pathname = p.pathname === "/" ? t : Wt([t, p.pathname])),
          (d.replace ? r.replace : r.push)(p, d.state, d));
      },
      [t, r, a, l, e],
    )
  );
}
const ux = j.createContext(null);
function cx(e) {
  let t = j.useContext(kn).outlet;
  return t && j.createElement(ux.Provider, { value: e }, t);
}
function za(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { future: r } = j.useContext(Pn),
    { matches: i } = j.useContext(kn),
    { pathname: l } = zr(),
    a = JSON.stringify(Fu(i, r.v7_relativeSplatPath));
  return j.useMemo(() => Bu(e, JSON.parse(a), l, n === "path"), [e, a, l, n]);
}
function dx(e, t, n, r) {
  $i() || ne(!1);
  let { navigator: i } = j.useContext(Pn),
    { matches: l } = j.useContext(kn),
    a = l[l.length - 1],
    s = a ? a.params : {};
  a && a.pathname;
  let o = a ? a.pathnameBase : "/";
  a && a.route;
  let c = zr(),
    d;
  d = c;
  let p = d.pathname || "/",
    h = p;
  if (o !== "/") {
    let b = o.replace(/^\//, "").split("/");
    h = "/" + p.replace(/^\//, "").split("/").slice(b.length).join("/");
  }
  let v = In(e, { pathname: h });
  return gx(
    v &&
      v.map((b) =>
        Object.assign({}, b, {
          params: Object.assign({}, s, b.params),
          pathname: Wt([
            o,
            i.encodeLocation
              ? i.encodeLocation(b.pathname).pathname
              : b.pathname,
          ]),
          pathnameBase:
            b.pathnameBase === "/"
              ? o
              : Wt([
                  o,
                  i.encodeLocation
                    ? i.encodeLocation(b.pathnameBase).pathname
                    : b.pathnameBase,
                ]),
        }),
      ),
    l,
    n,
    r,
  );
}
function fx() {
  let e = wx(),
    t = zi(e)
      ? e.status + " " + e.statusText
      : e instanceof Error
        ? e.message
        : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    i = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" };
  return j.createElement(
    j.Fragment,
    null,
    j.createElement("h2", null, "Unexpected Application Error!"),
    j.createElement("h3", { style: { fontStyle: "italic" } }, t),
    n ? j.createElement("pre", { style: i }, n) : null,
    null,
  );
}
const px = j.createElement(fx, null);
class mx extends j.Component {
  constructor(t) {
    (super(t),
      (this.state = {
        location: t.location,
        revalidation: t.revalidation,
        error: t.error,
      }));
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location ||
      (n.revalidation !== "idle" && t.revalidation === "idle")
      ? { error: t.error, location: t.location, revalidation: t.revalidation }
      : {
          error: t.error !== void 0 ? t.error : n.error,
          location: n.location,
          revalidation: t.revalidation || n.revalidation,
        };
  }
  componentDidCatch(t, n) {
    console.error(
      "React Router caught the following error during render",
      t,
      n,
    );
  }
  render() {
    return this.state.error !== void 0
      ? j.createElement(
          kn.Provider,
          { value: this.props.routeContext },
          j.createElement(Dm.Provider, {
            value: this.state.error,
            children: this.props.component,
          }),
        )
      : this.props.children;
  }
}
function hx(e) {
  let { routeContext: t, match: n, children: r } = e,
    i = j.useContext(Wi);
  return (
    i &&
      i.static &&
      i.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (i.staticContext._deepestRenderedBoundaryId = n.route.id),
    j.createElement(kn.Provider, { value: t }, r)
  );
}
function gx(e, t, n, r) {
  var i;
  if (
    (t === void 0 && (t = []),
    n === void 0 && (n = null),
    r === void 0 && (r = null),
    e == null)
  ) {
    var l;
    if (!n) return null;
    if (n.errors) e = n.matches;
    else if (
      (l = r) != null &&
      l.v7_partialHydration &&
      t.length === 0 &&
      !n.initialized &&
      n.matches.length > 0
    )
      e = n.matches;
    else return null;
  }
  let a = e,
    s = (i = n) == null ? void 0 : i.errors;
  if (s != null) {
    let d = a.findIndex(
      (p) => p.route.id && (s == null ? void 0 : s[p.route.id]) !== void 0,
    );
    (d >= 0 || ne(!1), (a = a.slice(0, Math.min(a.length, d + 1))));
  }
  let o = !1,
    c = -1;
  if (n && r && r.v7_partialHydration)
    for (let d = 0; d < a.length; d++) {
      let p = a[d];
      if (
        ((p.route.HydrateFallback || p.route.hydrateFallbackElement) && (c = d),
        p.route.id)
      ) {
        let { loaderData: h, errors: v } = n,
          x =
            p.route.loader &&
            h[p.route.id] === void 0 &&
            (!v || v[p.route.id] === void 0);
        if (p.route.lazy || x) {
          ((o = !0), c >= 0 ? (a = a.slice(0, c + 1)) : (a = [a[0]]));
          break;
        }
      }
    }
  return a.reduceRight((d, p, h) => {
    let v,
      x = !1,
      b = null,
      N = null;
    n &&
      ((v = s && p.route.id ? s[p.route.id] : void 0),
      (b = p.route.errorElement || px),
      o &&
        (c < 0 && h === 0
          ? (Sx("route-fallback"), (x = !0), (N = null))
          : c === h &&
            ((x = !0), (N = p.route.hydrateFallbackElement || null))));
    let g = t.concat(a.slice(0, h + 1)),
      f = () => {
        let m;
        return (
          v
            ? (m = b)
            : x
              ? (m = N)
              : p.route.Component
                ? (m = j.createElement(p.route.Component, null))
                : p.route.element
                  ? (m = p.route.element)
                  : (m = d),
          j.createElement(hx, {
            match: p,
            routeContext: { outlet: d, matches: g, isDataRoute: n != null },
            children: m,
          })
        );
      };
    return n && (p.route.ErrorBoundary || p.route.errorElement || h === 0)
      ? j.createElement(mx, {
          location: n.location,
          revalidation: n.revalidation,
          component: b,
          error: v,
          children: f(),
          routeContext: { outlet: null, matches: g, isDataRoute: !0 },
        })
      : f();
  }, null);
}
var _m = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      e
    );
  })(_m || {}),
  Om = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseLoaderData = "useLoaderData"),
      (e.UseActionData = "useActionData"),
      (e.UseRouteError = "useRouteError"),
      (e.UseNavigation = "useNavigation"),
      (e.UseRouteLoaderData = "useRouteLoaderData"),
      (e.UseMatches = "useMatches"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      (e.UseRouteId = "useRouteId"),
      e
    );
  })(Om || {});
function vx(e) {
  let t = j.useContext(Wi);
  return (t || ne(!1), t);
}
function xx(e) {
  let t = j.useContext(Wu);
  return (t || ne(!1), t);
}
function yx(e) {
  let t = j.useContext(kn);
  return (t || ne(!1), t);
}
function Im(e) {
  let t = yx(),
    n = t.matches[t.matches.length - 1];
  return (n.route.id || ne(!1), n.route.id);
}
function wx() {
  var e;
  let t = j.useContext(Dm),
    n = xx(Om.UseRouteError),
    r = Im();
  return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r];
}
function bx() {
  let { router: e } = vx(_m.UseNavigateStable),
    t = Im(),
    n = j.useRef(!1);
  return (
    Rm(() => {
      n.current = !0;
    }),
    j.useCallback(
      function (i, l) {
        (l === void 0 && (l = {}),
          n.current &&
            (typeof i == "number"
              ? e.navigate(i)
              : e.navigate(i, fa({ fromRouteId: t }, l))));
      },
      [e, t],
    )
  );
}
const Ud = {};
function Sx(e, t, n) {
  Ud[e] || (Ud[e] = !0);
}
function Tx(e, t) {
  (e == null || e.v7_startTransition,
    (e == null ? void 0 : e.v7_relativeSplatPath) === void 0 &&
      (!t || t.v7_relativeSplatPath),
    t &&
      (t.v7_fetcherPersist,
      t.v7_normalizeFormMethod,
      t.v7_partialHydration,
      t.v7_skipActionErrorRevalidation));
}
function Ex(e) {
  return cx(e.context);
}
function jx(e) {
  let {
    basename: t = "/",
    children: n = null,
    location: r,
    navigationType: i = Me.Pop,
    navigator: l,
    static: a = !1,
    future: s,
  } = e;
  $i() && ne(!1);
  let o = t.replace(/^\/*/, "/"),
    c = j.useMemo(
      () => ({
        basename: o,
        navigator: l,
        static: a,
        future: fa({ v7_relativeSplatPath: !1 }, s),
      }),
      [o, s, l, a],
    );
  typeof r == "string" && (r = Cn(r));
  let {
      pathname: d = "/",
      search: p = "",
      hash: h = "",
      state: v = null,
      key: x = "default",
    } = r,
    b = j.useMemo(() => {
      let N = Qt(d, o);
      return N == null
        ? null
        : {
            location: { pathname: N, search: p, hash: h, state: v, key: x },
            navigationType: i,
          };
    }, [o, d, p, h, v, x, i]);
  return b == null
    ? null
    : j.createElement(
        Pn.Provider,
        { value: c },
        j.createElement($u.Provider, { children: n, value: b }),
      );
}
new Promise(() => {});
function Cx(e) {
  let t = {
    hasErrorBoundary: e.ErrorBoundary != null || e.errorElement != null,
  };
  return (
    e.Component &&
      Object.assign(t, {
        element: j.createElement(e.Component),
        Component: void 0,
      }),
    e.HydrateFallback &&
      Object.assign(t, {
        hydrateFallbackElement: j.createElement(e.HydrateFallback),
        HydrateFallback: void 0,
      }),
    e.ErrorBoundary &&
      Object.assign(t, {
        errorElement: j.createElement(e.ErrorBoundary),
        ErrorBoundary: void 0,
      }),
    t
  );
}
/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function _r() {
  return (
    (_r = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    _r.apply(this, arguments)
  );
}
function Am(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    l;
  for (l = 0; l < r.length; l++)
    ((i = r[l]), !(t.indexOf(i) >= 0) && (n[i] = e[i]));
  return n;
}
function Px(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function kx(e, t) {
  return e.button === 0 && (!t || t === "_self") && !Px(e);
}
const Nx = [
    "onClick",
    "relative",
    "reloadDocument",
    "replace",
    "state",
    "target",
    "to",
    "preventScrollReset",
    "viewTransition",
  ],
  Mx = [
    "aria-current",
    "caseSensitive",
    "className",
    "end",
    "style",
    "to",
    "viewTransition",
    "children",
  ],
  Lx = "6";
try {
  window.__reactRouterVersion = Lx;
} catch {}
function Dx(e, t) {
  return B0({
    basename: void 0,
    future: _r({}, void 0, { v7_prependBasename: !0 }),
    history: u0({ window: void 0 }),
    hydrationData: Rx(),
    routes: e,
    mapRouteProperties: Cx,
    dataStrategy: void 0,
    patchRoutesOnNavigation: void 0,
    window: void 0,
  }).initialize();
}
function Rx() {
  var e;
  let t = (e = window) == null ? void 0 : e.__staticRouterHydrationData;
  return (t && t.errors && (t = _r({}, t, { errors: _x(t.errors) })), t);
}
function _x(e) {
  if (!e) return null;
  let t = Object.entries(e),
    n = {};
  for (let [r, i] of t)
    if (i && i.__type === "RouteErrorResponse")
      n[r] = new da(i.status, i.statusText, i.data, i.internal === !0);
    else if (i && i.__type === "Error") {
      if (i.__subType) {
        let l = window[i.__subType];
        if (typeof l == "function")
          try {
            let a = new l(i.message);
            ((a.stack = ""), (n[r] = a));
          } catch {}
      }
      if (n[r] == null) {
        let l = new Error(i.message);
        ((l.stack = ""), (n[r] = l));
      }
    } else n[r] = i;
  return n;
}
const zm = j.createContext({ isTransitioning: !1 }),
  Ox = j.createContext(new Map()),
  Ix = "startTransition",
  Hd = Xh[Ix],
  Ax = "flushSync",
  Vd = o0[Ax];
function zx(e) {
  Hd ? Hd(e) : e();
}
function ti(e) {
  Vd ? Vd(e) : e();
}
class Fx {
  constructor() {
    ((this.status = "pending"),
      (this.promise = new Promise((t, n) => {
        ((this.resolve = (r) => {
          this.status === "pending" && ((this.status = "resolved"), t(r));
        }),
          (this.reject = (r) => {
            this.status === "pending" && ((this.status = "rejected"), n(r));
          }));
      })));
  }
}
function Bx(e) {
  let { fallbackElement: t, router: n, future: r } = e,
    [i, l] = j.useState(n.state),
    [a, s] = j.useState(),
    [o, c] = j.useState({ isTransitioning: !1 }),
    [d, p] = j.useState(),
    [h, v] = j.useState(),
    [x, b] = j.useState(),
    N = j.useRef(new Map()),
    { v7_startTransition: g } = r || {},
    f = j.useCallback(
      (C) => {
        g ? zx(C) : C();
      },
      [g],
    ),
    m = j.useCallback(
      (C, M) => {
        let { deletedFetchers: P, flushSync: _, viewTransitionOpts: F } = M;
        (C.fetchers.forEach((A, W) => {
          A.data !== void 0 && N.current.set(W, A.data);
        }),
          P.forEach((A) => N.current.delete(A)));
        let D =
          n.window == null ||
          n.window.document == null ||
          typeof n.window.document.startViewTransition != "function";
        if (!F || D) {
          _ ? ti(() => l(C)) : f(() => l(C));
          return;
        }
        if (_) {
          ti(() => {
            (h && (d && d.resolve(), h.skipTransition()),
              c({
                isTransitioning: !0,
                flushSync: !0,
                currentLocation: F.currentLocation,
                nextLocation: F.nextLocation,
              }));
          });
          let A = n.window.document.startViewTransition(() => {
            ti(() => l(C));
          });
          (A.finished.finally(() => {
            ti(() => {
              (p(void 0), v(void 0), s(void 0), c({ isTransitioning: !1 }));
            });
          }),
            ti(() => v(A)));
          return;
        }
        h
          ? (d && d.resolve(),
            h.skipTransition(),
            b({
              state: C,
              currentLocation: F.currentLocation,
              nextLocation: F.nextLocation,
            }))
          : (s(C),
            c({
              isTransitioning: !0,
              flushSync: !1,
              currentLocation: F.currentLocation,
              nextLocation: F.nextLocation,
            }));
      },
      [n.window, h, d, N, f],
    );
  (j.useLayoutEffect(() => n.subscribe(m), [n, m]),
    j.useEffect(() => {
      o.isTransitioning && !o.flushSync && p(new Fx());
    }, [o]),
    j.useEffect(() => {
      if (d && a && n.window) {
        let C = a,
          M = d.promise,
          P = n.window.document.startViewTransition(async () => {
            (f(() => l(C)), await M);
          });
        (P.finished.finally(() => {
          (p(void 0), v(void 0), s(void 0), c({ isTransitioning: !1 }));
        }),
          v(P));
      }
    }, [f, a, d, n.window]),
    j.useEffect(() => {
      d && a && i.location.key === a.location.key && d.resolve();
    }, [d, h, i.location, a]),
    j.useEffect(() => {
      !o.isTransitioning &&
        x &&
        (s(x.state),
        c({
          isTransitioning: !0,
          flushSync: !1,
          currentLocation: x.currentLocation,
          nextLocation: x.nextLocation,
        }),
        b(void 0));
    }, [o.isTransitioning, x]),
    j.useEffect(() => {}, []));
  let w = j.useMemo(
      () => ({
        createHref: n.createHref,
        encodeLocation: n.encodeLocation,
        go: (C) => n.navigate(C),
        push: (C, M, P) =>
          n.navigate(C, {
            state: M,
            preventScrollReset: P == null ? void 0 : P.preventScrollReset,
          }),
        replace: (C, M, P) =>
          n.navigate(C, {
            replace: !0,
            state: M,
            preventScrollReset: P == null ? void 0 : P.preventScrollReset,
          }),
      }),
      [n],
    ),
    T = n.basename || "/",
    L = j.useMemo(
      () => ({ router: n, navigator: w, static: !1, basename: T }),
      [n, w, T],
    ),
    y = j.useMemo(
      () => ({ v7_relativeSplatPath: n.future.v7_relativeSplatPath }),
      [n.future.v7_relativeSplatPath],
    );
  return (
    j.useEffect(() => Tx(r, n.future), [r, n.future]),
    j.createElement(
      j.Fragment,
      null,
      j.createElement(
        Wi.Provider,
        { value: L },
        j.createElement(
          Wu.Provider,
          { value: i },
          j.createElement(
            Ox.Provider,
            { value: N.current },
            j.createElement(
              zm.Provider,
              { value: o },
              j.createElement(
                jx,
                {
                  basename: T,
                  location: i.location,
                  navigationType: i.historyAction,
                  navigator: w,
                  future: y,
                },
                i.initialized || n.future.v7_partialHydration
                  ? j.createElement(Ux, {
                      routes: n.routes,
                      future: n.future,
                      state: i,
                    })
                  : t,
              ),
            ),
          ),
        ),
      ),
      null,
    )
  );
}
const Ux = j.memo(Hx);
function Hx(e) {
  let { routes: t, future: n, state: r } = e;
  return dx(t, void 0, r, n);
}
const Vx =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  Wx = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  ee = j.forwardRef(function (t, n) {
    let {
        onClick: r,
        relative: i,
        reloadDocument: l,
        replace: a,
        state: s,
        target: o,
        to: c,
        preventScrollReset: d,
        viewTransition: p,
      } = t,
      h = Am(t, Nx),
      { basename: v } = j.useContext(Pn),
      x,
      b = !1;
    if (typeof c == "string" && Wx.test(c) && ((x = c), Vx))
      try {
        let m = new URL(window.location.href),
          w = c.startsWith("//") ? new URL(m.protocol + c) : new URL(c),
          T = Qt(w.pathname, v);
        w.origin === m.origin && T != null
          ? (c = T + w.search + w.hash)
          : (b = !0);
      } catch {}
    let N = ax(c, { relative: i }),
      g = Gx(c, {
        replace: a,
        state: s,
        target: o,
        preventScrollReset: d,
        relative: i,
        viewTransition: p,
      });
    function f(m) {
      (r && r(m), m.defaultPrevented || g(m));
    }
    return j.createElement(
      "a",
      _r({}, h, { href: x || N, onClick: b || l ? r : f, ref: n, target: o }),
    );
  }),
  tn = j.forwardRef(function (t, n) {
    let {
        "aria-current": r = "page",
        caseSensitive: i = !1,
        className: l = "",
        end: a = !1,
        style: s,
        to: o,
        viewTransition: c,
        children: d,
      } = t,
      p = Am(t, Mx),
      h = za(o, { relative: p.relative }),
      v = zr(),
      x = j.useContext(Wu),
      { navigator: b, basename: N } = j.useContext(Pn),
      g = x != null && Kx(h) && c === !0,
      f = b.encodeLocation ? b.encodeLocation(h).pathname : h.pathname,
      m = v.pathname,
      w =
        x && x.navigation && x.navigation.location
          ? x.navigation.location.pathname
          : null;
    (i ||
      ((m = m.toLowerCase()),
      (w = w ? w.toLowerCase() : null),
      (f = f.toLowerCase())),
      w && N && (w = Qt(w, N) || w));
    const T = f !== "/" && f.endsWith("/") ? f.length - 1 : f.length;
    let L = m === f || (!a && m.startsWith(f) && m.charAt(T) === "/"),
      y =
        w != null &&
        (w === f || (!a && w.startsWith(f) && w.charAt(f.length) === "/")),
      C = { isActive: L, isPending: y, isTransitioning: g },
      M = L ? r : void 0,
      P;
    typeof l == "function"
      ? (P = l(C))
      : (P = [
          l,
          L ? "active" : null,
          y ? "pending" : null,
          g ? "transitioning" : null,
        ]
          .filter(Boolean)
          .join(" "));
    let _ = typeof s == "function" ? s(C) : s;
    return j.createElement(
      ee,
      _r({}, p, {
        "aria-current": M,
        className: P,
        ref: n,
        style: _,
        to: o,
        viewTransition: c,
      }),
      typeof d == "function" ? d(C) : d,
    );
  });
var Ao;
(function (e) {
  ((e.UseScrollRestoration = "useScrollRestoration"),
    (e.UseSubmit = "useSubmit"),
    (e.UseSubmitFetcher = "useSubmitFetcher"),
    (e.UseFetcher = "useFetcher"),
    (e.useViewTransitionState = "useViewTransitionState"));
})(Ao || (Ao = {}));
var Wd;
(function (e) {
  ((e.UseFetcher = "useFetcher"),
    (e.UseFetchers = "useFetchers"),
    (e.UseScrollRestoration = "useScrollRestoration"));
})(Wd || (Wd = {}));
function $x(e) {
  let t = j.useContext(Wi);
  return (t || ne(!1), t);
}
function Gx(e, t) {
  let {
      target: n,
      replace: r,
      state: i,
      preventScrollReset: l,
      relative: a,
      viewTransition: s,
    } = t === void 0 ? {} : t,
    o = sx(),
    c = zr(),
    d = za(e, { relative: a });
  return j.useCallback(
    (p) => {
      if (kx(p, n)) {
        p.preventDefault();
        let h = r !== void 0 ? r : qn(c) === qn(d);
        o(e, {
          replace: h,
          state: i,
          preventScrollReset: l,
          relative: a,
          viewTransition: s,
        });
      }
    },
    [c, o, d, r, i, n, e, l, a, s],
  );
}
function Kx(e, t) {
  t === void 0 && (t = {});
  let n = j.useContext(zm);
  n == null && ne(!1);
  let { basename: r } = $x(Ao.useViewTransitionState),
    i = za(e, { relative: t.relative });
  if (!n.isTransitioning) return !1;
  let l = Qt(n.currentLocation.pathname, r) || n.currentLocation.pathname,
    a = Qt(n.nextLocation.pathname, r) || n.nextLocation.pathname;
  return ca(i.pathname, a) != null || ca(i.pathname, l) != null;
}
var Fm = {
    color: void 0,
    size: void 0,
    className: void 0,
    style: void 0,
    attr: void 0,
  },
  $d = le.createContext && le.createContext(Fm),
  Yx = ["attr", "size", "title"];
function Qx(e, t) {
  if (e == null) return {};
  var n = Xx(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(e);
    for (i = 0; i < l.length; i++)
      ((r = l[i]),
        !(t.indexOf(r) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, r) &&
          (n[r] = e[r]));
  }
  return n;
}
function Xx(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function pa() {
  return (
    (pa = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    pa.apply(this, arguments)
  );
}
function Gd(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function ma(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Gd(Object(n), !0).forEach(function (r) {
          qx(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Gd(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function qx(e, t, n) {
  return (
    (t = Jx(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function Jx(e) {
  var t = Zx(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Zx(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (typeof r != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Bm(e) {
  return (
    e &&
    e.map((t, n) =>
      le.createElement(t.tag, ma({ key: n }, t.attr), Bm(t.child)),
    )
  );
}
function Pt(e) {
  return (t) =>
    le.createElement(ey, pa({ attr: ma({}, e.attr) }, t), Bm(e.child));
}
function ey(e) {
  var t = (n) => {
    var { attr: r, size: i, title: l } = e,
      a = Qx(e, Yx),
      s = i || n.size || "1em",
      o;
    return (
      n.className && (o = n.className),
      e.className && (o = (o ? o + " " : "") + e.className),
      le.createElement(
        "svg",
        pa(
          { stroke: "currentColor", fill: "currentColor", strokeWidth: "0" },
          n.attr,
          r,
          a,
          {
            className: o,
            style: ma(ma({ color: e.color || n.color }, n.style), e.style),
            height: s,
            width: s,
            xmlns: "http://www.w3.org/2000/svg",
          },
        ),
        l && le.createElement("title", null, l),
        e.children,
      )
    );
  };
  return $d !== void 0
    ? le.createElement($d.Consumer, null, (n) => t(n))
    : t(Fm);
}
function ty(e) {
  return Pt({
    attr: { viewBox: "0 0 1024 1024" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3 645.3 585.4 645.3 512 585.4 378.7 512 378.7zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9 717.1 398.5 717.1 512 625.5 717.1 512 717.1zm213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9 47.9 21.4 47.9 47.9a47.84 47.84 0 0 1-47.9 47.9z",
        },
        child: [],
      },
    ],
  })(e);
}
function ny(e) {
  return Pt({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z",
        },
        child: [],
      },
    ],
  })(e);
}
function ry(e) {
  return Pt({
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z",
        },
        child: [],
      },
    ],
  })(e);
}
function iy(e) {
  return Pt({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z",
        },
        child: [],
      },
    ],
  })(e);
}
function ly(e) {
  return Pt({
    attr: { viewBox: "0 0 384 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M214.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 109.3V480c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128z",
        },
        child: [],
      },
    ],
  })(e);
}
function ay(e) {
  return Pt({
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z",
        },
        child: [],
      },
    ],
  })(e);
}
function Il(e) {
  return Pt({
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z",
        },
        child: [],
      },
    ],
  })(e);
}
var Um = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/ (function (e) {
  (function () {
    var t = {}.hasOwnProperty;
    function n() {
      for (var l = "", a = 0; a < arguments.length; a++) {
        var s = arguments[a];
        s && (l = i(l, r(s)));
      }
      return l;
    }
    function r(l) {
      if (typeof l == "string" || typeof l == "number") return l;
      if (typeof l != "object") return "";
      if (Array.isArray(l)) return n.apply(null, l);
      if (
        l.toString !== Object.prototype.toString &&
        !l.toString.toString().includes("[native code]")
      )
        return l.toString();
      var a = "";
      for (var s in l) t.call(l, s) && l[s] && (a = i(a, s));
      return a;
    }
    function i(l, a) {
      return a ? (l ? l + " " + a : l + a) : l;
    }
    e.exports ? ((n.default = n), (e.exports = n)) : (window.classNames = n);
  })();
})(Um);
var sy = Um.exports;
const Wn = Vo(sy),
  V = ({ src: e, alt: t, ...n }) => {
    const [r, i] = j.useState(!1),
      l = () => {
        i(!0);
      };
    return u.jsx("img", {
      ...n,
      src: e,
      alt: t,
      onLoad: l,
      className: Wn("fade-in-image", { "fade-in": r }, n.className),
    });
  },
  oy = () => (
    j.useCallback((e, t = -200) => {
      var r;
      const n = document.getElementById(e);
      if (n) {
        const i =
          ((r = n == null ? void 0 : n.getBoundingClientRect()) == null
            ? void 0
            : r.top) +
          window.scrollY +
          t;
        window.scrollTo({ top: i, behavior: "smooth" });
      }
    }, []),
    u.jsxs("footer", {
      className:
        "bg-white bg-no-repeat bg-center bg-cover relative pt-16 overflow-hidden",
      children: [
        u.jsx("div", {
          className: "Container",
          children: u.jsxs("div", {
            className: "grid gap-y-7 grid-cols-12 gap-3",
            children: [
              u.jsxs("div", {
                className: "col-span-12 md:col-span-6 lg:col-span-7",
                children: [
                  u.jsx(ee, {
                    to: "/",
                    children: u.jsx(V, {
                      className: "w-28",
                      src: "/assets/logos/pepperlabs.png",
                      draggable: !1,
                    }),
                  }),
                  u.jsxs("div", {
                    className:
                      "flex flex-col gap-[10px] pt-[30px] text-SecondaryText text-[14px]",
                    children: [
                      u.jsx("p", {
                        className: "",
                        children:
                          "A-3-7, Viva Residency (Commercial), Off Jalan Ipoh, 51200, Kuala Lumpur.",
                      }),
                      u.jsx(ee, {
                        to: "mailto:info@pepperlabs.my",
                        className: "w-fit",
                        children: "info@pepperlabs.my",
                      }),
                      u.jsx(ee, {
                        to: "https://api.whatsapp.com/send?phone=60163504840",
                        target: "_blank",
                        className: "font-bold w-fit",
                        children: "(+60)16-350 4840",
                      }),
                    ],
                  }),
                ],
              }),
              u.jsxs("div", {
                className: "col-span-12 md:col-span-6 lg:col-span-2",
                children: [
                  u.jsx("h4", {
                    className:
                      "font-primary text-[18px] text-PrimaryText font-bold mb-[20px]",
                    children: "Company",
                  }),
                  u.jsxs("ul", {
                    className: "flex flex-col gap-[10px] text-[14px]",
                    children: [
                      u.jsx("li", {
                        children: u.jsx(ee, {
                          to: "/our-expertise",
                          children: u.jsx("button", {
                            className:
                              "flex items-center gap-2 text-SecondaryText transition-all duration-500 hover:text-primary-500 hover:gap-1",
                            children: "Who We Are",
                          }),
                        }),
                      }),
                      u.jsx("li", {
                        children: u.jsx(ee, {
                          to: "/our-expertise",
                          children: u.jsx("button", {
                            className:
                              "flex items-center gap-2 text-SecondaryText transition-all duration-500 hover:text-primary-500 hover:gap-1",
                            children: "Our Expertise",
                          }),
                        }),
                      }),
                      u.jsx("li", {
                        children: u.jsx(ee, {
                          to: "https://microsoft.pepperlabs.my/",
                          target: "_blank",
                          children: u.jsx("button", {
                            className:
                              "flex items-center gap-2 text-SecondaryText transition-all duration-500 hover:text-primary-500 hover:gap-1",
                            children: "Microsoft",
                          }),
                        }),
                      }),
                      u.jsx("li", {
                        children: u.jsx("a", {
                          href: "https://aireadymalaysia.pepperlabs.my/",
                          target: "_blank",
                          children: u.jsx("button", {
                            className:
                              "flex items-center gap-2 text-SecondaryText transition-all duration-500 hover:text-primary-500 hover:gap-1",
                            children: "AI Campaign",
                          }),
                        }),
                      }),
                      u.jsx("li", {
                        children: u.jsx("a", {
                          href: "https://dapurdigital.pepperlabs.my/",
                          target: "_blank",
                          children: u.jsx("button", {
                            className:
                              "flex items-center gap-2 text-SecondaryText transition-all duration-500 hover:text-primary-500 hover:gap-1",
                            children: "Dapur Digital",
                          }),
                        }),
                      }),
                      u.jsx("li", {
                        children: u.jsx(ee, {
                          to: "/our-impact",
                          children: u.jsx("button", {
                            className:
                              "flex items-center gap-2 text-SecondaryText transition-all duration-500 hover:text-primary-500 hover:gap-1",
                            children: "Our Impact",
                          }),
                        }),
                      }),
                      u.jsx("li", {
                        children: u.jsx("a", {
                          href: "/blog",
                          className:
                            "flex items-center gap-2 text-SecondaryText transition-all duration-500 hover:text-primary-500 hover:gap-1",
                          children: "Blog",
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              u.jsxs("div", {
                className: "col-span-12 md:col-span-12 lg:col-span-3",
                children: [
                  u.jsx("h4", {
                    className:
                      "font-primary text-[18px] text-PrimaryText font-bold mb-[20px]",
                    children: "Support",
                  }),
                  u.jsxs("ul", {
                    className:
                      "flex flex-col gap-[10px] text-[14px] mr-9 2xl:mr-[90px] text-SecondaryText",
                    children: [
                      u.jsx("li", {
                        children: u.jsx(ee, {
                          to: "#",
                          target: "_blank",
                          className:
                            "flex items-center gap-2 text-SecondaryText transition-all duration-500 hover:text-primary-500 hover:gap-1",
                          children: "FAQ",
                        }),
                      }),
                      u.jsx("li", {
                        children: u.jsx(ee, {
                          to: "/work-with-us",
                          className:
                            "flex items-center gap-2 text-SecondaryText transition-all duration-500 hover:text-primary-500 hover:gap-1",
                          children: "Work With Us",
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
        u.jsx("div", {
          className: "border-t border-PrimaryBorder mt-8 md:mt-[108px]",
          children: u.jsxs("div", {
            className:
              "Container flex flex-col md:flex-row gap-y-4 md: md:col-span-6 justify-between items-center py-6",
            children: [
              u.jsx("p", {
                className: "text-SecondaryText text-sm text-center",
                children: "© 2024 Pepper Labs. All Rights Reserved.",
              }),
              u.jsxs("div", {
                className: "flex gap-5",
                children: [
                  u.jsx(ee, {
                    to: "https://x.com/pepperlabs/",
                    target: "_blank",
                    children: u.jsx("button", {
                      className:
                        "size-9 rounded-full bg-[#F8F8F8] flex items-center justify-center text-SecondaryText hover:text-primary-500 overflow-hidden transition-all duration-500 relative z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:-z-10 before:bg-primary-100 before:transition-all before:duration-500 before:scale-0 hover:before:scale-100",
                      children: u.jsx(iy, {}),
                    }),
                  }),
                  u.jsx(ee, {
                    to: "https://www.facebook.com/pepperlabssocialenterprise/",
                    target: "_blank",
                    children: u.jsx("button", {
                      className:
                        "size-9 rounded-full bg-[#F8F8F8] flex items-center justify-center text-SecondaryText hover:text-primary-500 overflow-hidden transition-all duration-500 relative z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:-z-10 before:bg-primary-100 before:transition-all before:duration-500 before:scale-0 hover:before:scale-100",
                      children: u.jsx(ny, {}),
                    }),
                  }),
                  u.jsx(ee, {
                    to: "https://www.instagram.com/pepperlabsmy/",
                    target: "_blank",
                    children: u.jsx("button", {
                      className:
                        "size-9 rounded-full bg-[#F8F8F8] flex items-center justify-center text-SecondaryText hover:text-primary-500 overflow-hidden transition-all duration-500 relative z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:-z-10 before:bg-primary-100 before:transition-all before:duration-500 before:scale-0 hover:before:scale-100",
                      children: u.jsx(ty, {}),
                    }),
                  }),
                  u.jsx(ee, {
                    to: "https://www.linkedin.com/company/pepper-labs-social-enterprise/",
                    target: "_blank",
                    children: u.jsx("button", {
                      className:
                        "size-9 rounded-full bg-[#F8F8F8] flex items-center justify-center text-SecondaryText hover:text-primary-500 overflow-hidden transition-all duration-500 relative z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:-z-10 before:bg-primary-100 before:transition-all before:duration-500 before:scale-0 hover:before:scale-100",
                      children: u.jsx(ry, {}),
                    }),
                  }),
                ],
              }),
            ],
          }),
        }),
      ],
    })
  );
function uy(e, t) {
  try {
    return (
      e.addEventListener("change", t),
      () => e.removeEventListener("change", t)
    );
  } catch {
    return (e.addListener(t), () => e.removeListener(t));
  }
}
function cy(e, t) {
  return typeof window < "u" && "matchMedia" in window
    ? window.matchMedia(e).matches
    : !1;
}
function jr(
  e,
  t,
  { getInitialValueInEffect: n } = { getInitialValueInEffect: !0 },
) {
  const [r, i] = j.useState(n ? t : cy(e)),
    l = j.useRef(null);
  return (
    j.useEffect(() => {
      if ("matchMedia" in window)
        return (
          (l.current = window.matchMedia(e)),
          i(l.current.matches),
          uy(l.current, (a) => i(a.matches))
        );
    }, [e]),
    r
  );
}
function dy(e) {
  return Pt({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z",
        },
        child: [],
      },
    ],
  })(e);
}
const fy = () => {
    (jr("(min-width: 576px)"), jr("(min-width: 768px)"));
    const e = jr("(min-width: 992px)");
    j.useEffect(
      () => (
        window.addEventListener("scroll", t),
        () => {
          window.removeEventListener("scroll", t);
        }
      ),
    );
    const t = (s) => {
        const o = document.querySelector(".header-section");
        window.scrollY >= 250 && e
          ? (o.classList.add("is-sticky"), l(!0))
          : (o.classList.remove("is-sticky"), l(!1));
      },
      [n, r] = j.useState(!1),
      [i, l] = j.useState(!1),
      a = () => {
        r(!n);
      };
    return (
      j.useCallback((s, o = -200) => {
        var d;
        const c = document.getElementById(s);
        if (c) {
          const p =
            ((d = c == null ? void 0 : c.getBoundingClientRect()) == null
              ? void 0
              : d.top) +
            window.scrollY +
            o;
          window.scrollTo({ top: p, behavior: "smooth" });
        }
      }, []),
      u.jsx("nav", {
        className:
          "w-full transition-all duration-300 bg-transparent relative z-[99999]",
        children: u.jsx("header", {
          className:
            "header-section navbar2 bg-white text-primary-500 w-full border-b border-PrimaryBorder",
          "data-aos": "zoom-in",
          "data-aos-duration": "1000",
          children: u.jsx("div", {
            className: "Container",
            children: u.jsxs("div", {
              className:
                "flex flex-col lg:flex-row items-center justify-between lg:h-[70px]",
              children: [
                u.jsx("div", {
                  className: "w-32 hidden lg:block",
                  children: u.jsx(ee, {
                    to: "/",
                    children: u.jsx(V, {
                      draggable: "false",
                      src: "/assets/logos/pepperlabs.png",
                      alt: "website_logo",
                    }),
                  }),
                }),
                u.jsxs("div", {
                  className:
                    "w-full lg:hidden flex justify-between h-[80px] sm:h-[70px] items-center py-3",
                  children: [
                    u.jsx("div", {
                      className: "w-32",
                      children: u.jsx(ee, {
                        to: "/",
                        children: u.jsx(V, {
                          draggable: "false",
                          src: "/assets/logos/pepperlabs.png",
                          className: "block lg:hidden w-32 h-full",
                          alt: "constre_website_logo",
                        }),
                      }),
                    }),
                    u.jsx("button", {
                      className: "lg:hidden block focus:outline-none ",
                      onClick: a,
                      children: n
                        ? u.jsx(dy, { className: "w-6 h-6 text-primary-500" })
                        : u.jsx(ay, { className: "w-6 h-6 text-primary-500" }),
                    }),
                  ],
                }),
                u.jsx("div", {
                  className:
                    "flex gap-14 w-full lg:w-auto items-center z-[99999]",
                  children: u.jsxs("ul", {
                    className: `${n ? "block" : "hidden"} text-right w-full lg:w-fit ease-in-out flex-1 lg:flex space-x-0 flex flex-col lg:flex-row capitalize text-sm lg:bg-transparent py-3 sm:py-0 font-secondary sm:text-base text-HeadingColor-0 font-bold transition-all duration-500
                `,
                    children: [
                      u.jsx(tn, {
                        className:
                          "text-center flex items-center justify-center md:text-left pb-3 lg:py-0 px-3 lg:px-2 xl:px-5 w-full transition-all duration-300 hover:text-primary-500",
                        to: "/who-we-are",
                        children: u.jsx("span", {
                          className:
                            "flex items-center whitespace-nowrap text-[12px] xl:text-[14px]",
                          children: "Who We Are",
                        }),
                      }),
                      u.jsx(tn, {
                        className:
                          "text-center flex items-center justify-center md:text-left pb-3 lg:py-0 px-3 lg:px-2 xl:px-5 w-full transition-all duration-300 hover:text-primary-500",
                        to: "/our-expertise",
                        children: u.jsx("span", {
                          className:
                            "flex items-center whitespace-nowrap text-[12px] xl:text-[14px]",
                          children: "Our Expertise",
                        }),
                      }),
                      u.jsx(tn, {
                        className:
                          "text-center flex items-center justify-center md:text-left pb-3 lg:py-0 px-3 lg:px-2 xl:px-5 w-full transition-all duration-300 hover:text-primary-500",
                        to: "https://pepperlabs.my/k-youth/",
                        target: "_blank",
                        children: u.jsx("span", {
                          className:
                            "flex items-center whitespace-nowrap text-[12px] xl:text-[14px]",
                          children: "K-Youth",
                        }),
                      }),
                      u.jsx(tn, {
                        className:
                          "text-center flex items-center justify-center md:text-left pb-3 lg:py-0 px-3 lg:px-2 xl:px-5 w-full transition-all duration-300 hover:text-primary-500",
                        to: "https://microsoft.pepperlabs.my/",
                        target: "_blank",
                        children: u.jsx("span", {
                          className:
                            "flex items-center whitespace-nowrap text-[12px] xl:text-[14px]",
                          children: "Microsoft",
                        }),
                      }),
                      u.jsx("a", {
                        className:
                          "text-center flex items-center justify-center md:text-left pb-3 lg:py-0 px-3 lg:px-2 xl:px-5 w-full transition-all duration-300 hover:text-primary-500",
                        href: "https://aireadymalaysia.pepperlabs.my/",
                        target: "_blank",
                        children: u.jsx("span", {
                          className:
                            "flex items-center whitespace-nowrap text-[12px] xl:text-[14px]",
                          children: "AI Campaign",
                        }),
                      }),
                      u.jsx("a", {
                        className:
                          "text-center flex items-center justify-center md:text-left pb-3 lg:py-0 px-3 lg:px-2 xl:px-5 w-full transition-all duration-300 hover:text-primary-500",
                        href: "https://dapurdigital.pepperlabs.my/",
                        target: "_blank",
                        children: u.jsx("span", {
                          className:
                            "flex items-center whitespace-nowrap text-[12px] xl:text-[14px]",
                          children: "Dapur Digital",
                        }),
                      }),
                      u.jsx("a", {
                        className:
                          "text-center flex items-center justify-center md:text-left pb-3 lg:py-0 px-3 lg:px-2 xl:px-5 w-full transition-all duration-300 hover:text-primary-500",
                        href: "/blog",
                        "data-pl-ai-label": "Our Blog",
                        children: u.jsx("span", {
                          className:
                            "flex items-center whitespace-nowrap text-[12px] xl:text-[14px]",
                          children: "Our Blog",
                        }),
                      }),
                      u.jsx(tn, {
                        className:
                          "text-center flex items-center justify-center md:text-left pb-3 lg:py-0 px-3 lg:px-2 xl:px-5 w-full transition-all duration-300 hover:text-primary-500",
                        to: "/our-impact",
                        children: u.jsx("span", {
                          className:
                            "flex items-center whitespace-nowrap text-[12px] xl:text-[14px]",
                          children: "Our Impact",
                        }),
                      }),
                      u.jsx(tn, {
                        className:
                          "text-center flex items-center justify-center md:text-left pb-3 lg:py-0 px-3 lg:px-2 xl:px-5 w-full transition-all duration-300 hover:text-primary-500",
                        to: "/work-with-us",
                        children: u.jsx("span", {
                          className:
                            "flex items-center whitespace-nowrap text-[12px] xl:text-[14px]",
                          children: "Work With Us",
                        }),
                      }),
                    ],
                  }),
                }),
              ],
            }),
          }),
        }),
      })
    );
  },
  py = () => {
    const [e, t] = j.useState(!1);
    j.useEffect(() => {
      const r = () => {
        window.scrollY > 300 ? t(!0) : t(!1);
      };
      return (
        window.addEventListener("scroll", r),
        () => {
          window.removeEventListener("scroll", r);
        }
      );
    }, []);
    const n = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return u.jsx("div", {
      className: "relative",
      children:
        e &&
        u.jsx("div", {
          className:
            "fixed bottom-10 text-white right-6 z-50 bg-primary-500 border-2 border-white rounded-full h-12 w-12 cursor-pointer animate-movebtn flex justify-center items-center hover:border-primary-500 hover:bg-white hover:text-primary-500 hover:animate-none",
          onClick: n,
          children: u.jsx(ly, { size: "24" }),
        }),
    });
  },
  my = () => {
    const { pathname: e } = zr();
    return (
      j.useEffect(() => {
        window.scrollTo(0, 0);
      }, [e]),
      u.jsxs(j.Fragment, {
        children: [
          u.jsx(fy, {}),
          u.jsx(py, {}),
          u.jsx("div", { className: "bg-white", children: u.jsx(Ex, {}) }),
          u.jsx(oy, {}),
        ],
      })
    );
  };
function hy(e) {
  return Pt({
    attr: { viewBox: "0 0 24 24" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M13.22 19.03a.75.75 0 0 1 0-1.06L18.19 13H3.75a.75.75 0 0 1 0-1.5h14.44l-4.97-4.97a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l6.25 6.25a.75.75 0 0 1 0 1.06l-6.25 6.25a.75.75 0 0 1-1.06 0Z",
        },
        child: [],
      },
    ],
  })(e);
}
function vi(e) {
  return Pt({
    attr: { viewBox: "0 0 24 24" },
    child: [
      { tag: "path", attr: { fill: "none", d: "M0 0h24v24H0z" }, child: [] },
      {
        tag: "path",
        attr: { d: "m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" },
        child: [],
      },
    ],
  })(e);
}
const gy = () => {
    const e = j.useCallback((t, n = -200) => {
      var i;
      const r = document.getElementById(t);
      if (r) {
        const l =
          ((i = r == null ? void 0 : r.getBoundingClientRect()) == null
            ? void 0
            : i.top) +
          window.scrollY +
          n;
        window.scrollTo({ top: l, behavior: "smooth" });
      }
    }, []);
    return u.jsxs("section", {
      id: "who-we-are",
      className:
        "py-[60px] sm:py-[100px] xl:py-[60px] bg-white bg-no-repeat bg-center bg-cover relative",
      children: [
        u.jsx(V, {
          src: "/assets/figma/Section1_Asset0.png",
          draggable: "false",
          className:
            "absolute object-cover block sm:hidden -translate-x-[33%] translate-y-16 xs:translate-y-0",
        }),
        u.jsxs("div", {
          className:
            "relative Container flex flex-col h-full justify-center items-center",
          children: [
            u.jsxs(Fr, {
              subtitle: "WHO WE ARE",
              children: [
                "We Advocate for",
                " ",
                u.jsx("span", {
                  className: "text-AccentText",
                  children: "Sustainability",
                }),
              ],
            }),
            u.jsx(V, {
              src: "/assets/figma/Section1_Asset0.png",
              draggable: "false",
              className:
                "absolute object-cover hidden sm:block h-full top-0 left-0 sm:!-translate-x-[35%] lg:!-translate-x-[50%] lg:h-[750px] lg:-translate-y-10 2xl:!-translate-x-[38%]",
            }),
            u.jsxs("div", {
              className:
                "w-full justify-center flex flex-col lg:flex-row gap-6 sm:gap-[40px] lg:gap-[80px] xl:gap-[120px] pt-[40px] sm:pt-[80px] md:pt-[100px] pl-0 lg:pl-16 xl:pl-0",
              children: [
                u.jsx("div", {
                  className: "relative",
                  children: u.jsxs("div", {
                    className:
                      "flex flex-col gap-[30px] items-start w-full lg:w-[376px]",
                    children: [
                      u.jsxs("div", {
                        className: "text-AccentText flex gap-5 items-end",
                        children: [
                          u.jsx("span", {
                            className:
                              "text-[120px] leading-[5rem] md:text-[180px] md:leading-[6.5rem] md:pt-10 font-bold",
                            children: "11",
                          }),
                          u.jsxs("div", {
                            className:
                              "text-xs font-bold leading-6 tracking-[2px]",
                            children: [
                              "YEARS",
                              u.jsx("br", {}),
                              " EXPERIENCE IN",
                              u.jsx("br", {}),
                              " SOCIAL IMPACT",
                              u.jsx("br", {}),
                              " STRATEGIES",
                            ],
                          }),
                        ],
                      }),
                      u.jsx("span", {
                        className:
                          "font-bold text-PrimaryText text-[14px] md:text-[18px] hidden xs:block",
                        children: "Learn more about our Success Stories",
                      }),
                    ],
                  }),
                }),
                u.jsxs("div", {
                  className: "relative w-full lg:w-[500px]",
                  children: [
                    u.jsx("p", {
                      className:
                        "text-[14px] md:text-[18px] text-SecondaryText pb-3 md:pb-7",
                      children:
                        "We bring people, skills and technology together to help communities thrive. From practical AI learning to inclusive enterprise, our work turns local needs into lasting opportunities.",
                    }),
                    u.jsx(ee, {
                      to: "#our-expertise",
                      className: "mt-7 inline-block",
                      onClick: () => e("our-expertise", -100),
                      children: u.jsx(Fa, { children: "Discover more" }),
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    });
  },
  Fr = ({ subtitle: e, children: t }) =>
    u.jsxs("div", {
      className: "text-center",
      children: [
        u.jsx("h5", {
          className:
            "font-primary text-[14px] tracking-[3px] font-semibold text-SubtitleText",
          children: e,
        }),
        u.jsx("div", {
          className:
            "font-primary font-bold text-[32px] md:text-[40px] md:leading-[52px] text-HeadingColor-0 mt-[20px]",
          children: t,
        }),
      ],
    }),
  Fa = ({ children: e }) =>
    u.jsxs("div", {
      className:
        "flex font-bold items-center justify-center text-[14px] text-AccentText gap-2 pb-0.5 border-b border-AccentText hover:text-secondary-500 hover:border-secondary-500",
      children: [e, u.jsx(vi, { className: "font-bold", size: "16" })],
    }),
  vy = ({
    blogThumb: e,
    blogDateIcon: t,
    blogDate: n,
    blogUrl: r,
    blogTitle: i,
    blogDesc: l,
    blogBtn: a,
  }) =>
    u.jsxs("div", {
      className: "group transition-all duration-500 rounded h-full",
      children: [
        u.jsx("div", {
          className: "relative rounded overflow-hidden",
          children: u.jsx("img", {
            src: e,
            className:
              "transition-all duration-500 scale-100 group-hover:scale-110 w-full object-cover",
          }),
        }),
        u.jsx("div", {
          className:
            "rounded relative z-20 flex justify-center bg-white transition-all duration-500 pt-5",
          children: u.jsxs("div", {
            className: "flex flex-col gap-2.5 items-start",
            children: [
              u.jsx("div", {
                className:
                  "flex flex-col sm:flex-row md:flex-col xl:flex-row gap-6",
                children: u.jsxs("div", {
                  className:
                    "text-SecondaryText text-[14px] flex gap-2 justify-center items-center leading-none",
                  children: [
                    u.jsx("div", { className: "mb-1", children: t }),
                    n,
                  ],
                }),
              }),
              u.jsxs(ee, {
                to: r,
                className: "flex flex-col gap-2.5 items-start",
                children: [
                  u.jsx("button", {
                    className:
                      "font-primary text-left font-semibold text-[20px] xl:text-[24px] xl:leading-[36px] text-HeadingColor-0 transition-all duration-500 group-hover:text-primary-500 mt-2 line-clamp-2",
                    children: i,
                  }),
                  u.jsx("div", {
                    className: "text-[14px] leading-[24.4px] line-clamp-3",
                    children: l,
                  }),
                ],
              }),
              u.jsx(ee, {
                to: r,
                target: "_blank",
                className: "inline-block",
                children: u.jsx(Fa, { children: a }),
              }),
            ],
          }),
        }),
      ],
    }),
  xy = "/assets/news/news-1.webp",
  yy = "/assets/news/news-2.jpg",
  wy = "/assets/news/news-3.jpg",
  by = [
    {
      id: 1,
      blogThumb: xy,
      blogDateIcon: u.jsx(Il, {}),
      blogDate: "October 25, 2024",
      blogUrl:
        "https://www.nst.com.my/business/corporate/2024/10/1125301/pepper-labs-unveils-dapur-digital-empower-b40-woman-entrepreneurs",
      blogTitle:
        "Pepper Labs unveils Dapur Digital to empower B40 woman entrepreneurs",
      blogDesc:
        "Pepper Labs, a local social enterprise, has launched Dapur Digital to empower B40 women entrepreneurs with cloud kitchens. Dapur Digital is a cloud-kitchen initiative aimed at empowering B40 women micro-entrepreneurs from People's Housing Programme (PPR) areas with culinary skills and business training.",
      blogBtn: "Read More",
    },
    {
      id: 2,
      blogThumb: yy,
      blogDateIcon: u.jsx(Il, {}),
      blogDate: "December 5, 2024",
      blogUrl:
        "https://www.malaysiakini.com/announcement/728071#google_vignette",
      blogTitle:
        "Pepper Labs join forces with Khazanah Nasional to Address Youth Unemployment in Malaysia",
      blogDesc:
        "Pepper Labs has partnered with Khazanah Nasional Berhad (“Khazanah”) to implement the K-Youth Development Programme 2024. This groundbreaking initiative aims to address youth unemployment in Malaysia.",
      blogBtn: "Read More",
      blogBtnIcon: u.jsx(hy, {}),
    },
    {
      id: 3,
      blogThumb: wy,
      blogDateIcon: u.jsx(Il, {}),
      blogDate: "December 3, 2021",
      blogUrl:
        "https://thesun.my/malaysia-news/pepper-labs-to-set-up-20-more-dapur-digital-nationwide-with-budget-2025-funding-PF13166854",
      blogTitle:
        "Pepper Labs to set up 20 more Dapur Digital nationwide with Budget 2025 funding",
      blogDesc:
        "Pepper Labs, a social enterprise that has received RM5 million funding under Budget 2025, plans to set up 20 Dapur Digital nationwide within the next few years to equip more participants from underserved communities across the country, uplifting them into a better economic bracket.",
      blogBtn: "Read More",
    },
  ],
  Sy = () =>
    u.jsx("section", {
      id: "our-impact",
      className: "py-[60px] lg:py-[120px]",
      children: u.jsxs("div", {
        className: "Container",
        children: [
          u.jsx(Fr, { subtitle: "INSIGHTS", children: "Our Latest News" }),
          u.jsx("div", {
            className: "mt-[30px] lg:mt-[60px]",
            children: u.jsx("div", {
              className:
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[60px] md:gap-[30px]",
              children: by.map(
                ({
                  id: e,
                  blogThumb: t,
                  blogDateIcon: n,
                  blogDate: r,
                  blogUrl: i,
                  blogTitle: l,
                  blogDesc: a,
                  blogBtn: s,
                }) =>
                  u.jsx(
                    "div",
                    {
                      children: u.jsx(vy, {
                        blogThumb: t,
                        blogDateIcon: n,
                        blogDate: r,
                        blogUrl: i,
                        blogTitle: l,
                        blogDesc: a,
                        blogBtn: s,
                      }),
                    },
                    e,
                  ),
              ),
            }),
          }),
        ],
      }),
    });
var Hm = {};
function Ty(e) {
  if (typeof window > "u") return;
  const t = document.createElement("style");
  return (
    t.setAttribute("type", "text/css"),
    (t.innerHTML = e),
    document.head.appendChild(t),
    e
  );
}
Object.defineProperty(Hm, "__esModule", { value: !0 });
var je = j;
function Ey(e) {
  return e && typeof e == "object" && "default" in e ? e : { default: e };
}
var nn = Ey(je);
Ty(`.rfm-marquee-container {
  overflow-x: hidden;
  display: flex;
  flex-direction: row;
  position: relative;
  width: var(--width);
  transform: var(--transform);
}
.rfm-marquee-container:hover div {
  animation-play-state: var(--pause-on-hover);
}
.rfm-marquee-container:active div {
  animation-play-state: var(--pause-on-click);
}

.rfm-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
}
.rfm-overlay::before, .rfm-overlay::after {
  background: linear-gradient(to right, var(--gradient-color), rgba(255, 255, 255, 0));
  content: "";
  height: 100%;
  position: absolute;
  width: var(--gradient-width);
  z-index: 2;
  pointer-events: none;
  touch-action: none;
}
.rfm-overlay::after {
  right: 0;
  top: 0;
  transform: rotateZ(180deg);
}
.rfm-overlay::before {
  left: 0;
  top: 0;
}

.rfm-marquee {
  flex: 0 0 auto;
  min-width: var(--min-width);
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  animation: scroll var(--duration) linear var(--delay) var(--iteration-count);
  animation-play-state: var(--play);
  animation-delay: var(--delay);
  animation-direction: var(--direction);
}
@keyframes scroll {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.rfm-initial-child-container {
  flex: 0 0 auto;
  display: flex;
  min-width: auto;
  flex-direction: row;
  align-items: center;
}

.rfm-child {
  transform: var(--transform);
}`);
const jy = je.forwardRef(function (
  {
    style: t = {},
    className: n = "",
    autoFill: r = !1,
    play: i = !0,
    pauseOnHover: l = !1,
    pauseOnClick: a = !1,
    direction: s = "left",
    speed: o = 50,
    delay: c = 0,
    loop: d = 0,
    gradient: p = !1,
    gradientColor: h = "white",
    gradientWidth: v = 200,
    onFinish: x,
    onCycleComplete: b,
    onMount: N,
    children: g,
  },
  f,
) {
  const [m, w] = je.useState(0),
    [T, L] = je.useState(0),
    [y, C] = je.useState(1),
    [M, P] = je.useState(!1),
    _ = je.useRef(null),
    F = f || _,
    D = je.useRef(null),
    A = je.useCallback(() => {
      if (D.current && F.current) {
        const q = F.current.getBoundingClientRect(),
          ie = D.current.getBoundingClientRect();
        let Pe = q.width,
          ce = ie.width;
        ((s === "up" || s === "down") && ((Pe = q.height), (ce = ie.height)),
          C(r && Pe && ce && ce < Pe ? Math.ceil(Pe / ce) : 1),
          w(Pe),
          L(ce));
      }
    }, [r, F, s]);
  (je.useEffect(() => {
    if (M && (A(), D.current && F.current)) {
      const q = new ResizeObserver(() => A());
      return (
        q.observe(F.current),
        q.observe(D.current),
        () => {
          q && q.disconnect();
        }
      );
    }
  }, [A, F, M]),
    je.useEffect(() => {
      A();
    }, [A, g]),
    je.useEffect(() => {
      P(!0);
    }, []),
    je.useEffect(() => {
      typeof N == "function" && N();
    }, []));
  const W = je.useMemo(
      () => (r ? (T * y) / o : T < m ? m / o : T / o),
      [r, m, T, y, o],
    ),
    K = je.useMemo(
      () =>
        Object.assign(Object.assign({}, t), {
          "--pause-on-hover": !i || l ? "paused" : "running",
          "--pause-on-click": !i || (l && !a) || a ? "paused" : "running",
          "--width": s === "up" || s === "down" ? "100vh" : "100%",
          "--transform":
            s === "up"
              ? "rotate(-90deg)"
              : s === "down"
                ? "rotate(90deg)"
                : "none",
        }),
      [t, i, l, a, s],
    ),
    Z = je.useMemo(
      () => ({
        "--gradient-color": h,
        "--gradient-width": typeof v == "number" ? `${v}px` : v,
      }),
      [h, v],
    ),
    R = je.useMemo(
      () => ({
        "--play": i ? "running" : "paused",
        "--direction": s === "left" ? "normal" : "reverse",
        "--duration": `${W}s`,
        "--delay": `${c}s`,
        "--iteration-count": d ? `${d}` : "infinite",
        "--min-width": r ? "auto" : "100%",
      }),
      [i, s, W, c, d, r],
    ),
    z = je.useMemo(
      () => ({
        "--transform":
          s === "up"
            ? "rotate(90deg)"
            : s === "down"
              ? "rotate(-90deg)"
              : "none",
      }),
      [s],
    ),
    $ = je.useCallback(
      (q) =>
        [...Array(Number.isFinite(q) && q >= 0 ? q : 0)].map((ie, Pe) =>
          nn.default.createElement(
            je.Fragment,
            { key: Pe },
            je.Children.map(g, (ce) =>
              nn.default.createElement(
                "div",
                { style: z, className: "rfm-child" },
                ce,
              ),
            ),
          ),
        ),
      [z, g],
    );
  return M
    ? nn.default.createElement(
        "div",
        { ref: F, style: K, className: "rfm-marquee-container " + n },
        p &&
          nn.default.createElement("div", {
            style: Z,
            className: "rfm-overlay",
          }),
        nn.default.createElement(
          "div",
          {
            className: "rfm-marquee",
            style: R,
            onAnimationIteration: b,
            onAnimationEnd: x,
          },
          nn.default.createElement(
            "div",
            { className: "rfm-initial-child-container", ref: D },
            je.Children.map(g, (q) =>
              nn.default.createElement(
                "div",
                { style: z, className: "rfm-child" },
                q,
              ),
            ),
          ),
          $(y - 1),
        ),
        nn.default.createElement(
          "div",
          { className: "rfm-marquee", style: R },
          $(y),
        ),
      )
    : null;
});
var Ss = (Hm.default = jy);
function Kd(e) {
  return (
    e !== null &&
    typeof e == "object" &&
    "constructor" in e &&
    e.constructor === Object
  );
}
function Gu(e, t) {
  (e === void 0 && (e = {}), t === void 0 && (t = {}));
  const n = ["__proto__", "constructor", "prototype"];
  Object.keys(t)
    .filter((r) => n.indexOf(r) < 0)
    .forEach((r) => {
      typeof e[r] > "u"
        ? (e[r] = t[r])
        : Kd(t[r]) &&
          Kd(e[r]) &&
          Object.keys(t[r]).length > 0 &&
          Gu(e[r], t[r]);
    });
}
const Vm = {
  body: {},
  addEventListener() {},
  removeEventListener() {},
  activeElement: { blur() {}, nodeName: "" },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return { initEvent() {} };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName() {
        return [];
      },
    };
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: "",
  },
};
function tr() {
  const e = typeof document < "u" ? document : {};
  return (Gu(e, Vm), e);
}
const Cy = {
  document: Vm,
  navigator: { userAgent: "" },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: "",
  },
  history: { replaceState() {}, pushState() {}, go() {}, back() {} },
  CustomEvent: function () {
    return this;
  },
  addEventListener() {},
  removeEventListener() {},
  getComputedStyle() {
    return {
      getPropertyValue() {
        return "";
      },
    };
  },
  Image() {},
  Date() {},
  screen: {},
  setTimeout() {},
  clearTimeout() {},
  matchMedia() {
    return {};
  },
  requestAnimationFrame(e) {
    return typeof setTimeout > "u" ? (e(), null) : setTimeout(e, 0);
  },
  cancelAnimationFrame(e) {
    typeof setTimeout > "u" || clearTimeout(e);
  },
};
function Je() {
  const e = typeof window < "u" ? window : {};
  return (Gu(e, Cy), e);
}
function Py(e) {
  return (
    e === void 0 && (e = ""),
    e
      .trim()
      .split(" ")
      .filter((t) => !!t.trim())
  );
}
function ky(e) {
  const t = e;
  Object.keys(t).forEach((n) => {
    try {
      t[n] = null;
    } catch {}
    try {
      delete t[n];
    } catch {}
  });
}
function Wm(e, t) {
  return (t === void 0 && (t = 0), setTimeout(e, t));
}
function ha() {
  return Date.now();
}
function Ny(e) {
  const t = Je();
  let n;
  return (
    t.getComputedStyle && (n = t.getComputedStyle(e, null)),
    !n && e.currentStyle && (n = e.currentStyle),
    n || (n = e.style),
    n
  );
}
function My(e, t) {
  t === void 0 && (t = "x");
  const n = Je();
  let r, i, l;
  const a = Ny(e);
  return (
    n.WebKitCSSMatrix
      ? ((i = a.transform || a.webkitTransform),
        i.split(",").length > 6 &&
          (i = i
            .split(", ")
            .map((s) => s.replace(",", "."))
            .join(", ")),
        (l = new n.WebKitCSSMatrix(i === "none" ? "" : i)))
      : ((l =
          a.MozTransform ||
          a.OTransform ||
          a.MsTransform ||
          a.msTransform ||
          a.transform ||
          a
            .getPropertyValue("transform")
            .replace("translate(", "matrix(1, 0, 0, 1,")),
        (r = l.toString().split(","))),
    t === "x" &&
      (n.WebKitCSSMatrix
        ? (i = l.m41)
        : r.length === 16
          ? (i = parseFloat(r[12]))
          : (i = parseFloat(r[4]))),
    t === "y" &&
      (n.WebKitCSSMatrix
        ? (i = l.m42)
        : r.length === 16
          ? (i = parseFloat(r[13]))
          : (i = parseFloat(r[5]))),
    i || 0
  );
}
function yl(e) {
  return (
    typeof e == "object" &&
    e !== null &&
    e.constructor &&
    Object.prototype.toString.call(e).slice(8, -1) === "Object"
  );
}
function Ly(e) {
  return typeof window < "u" && typeof window.HTMLElement < "u"
    ? e instanceof HTMLElement
    : e && (e.nodeType === 1 || e.nodeType === 11);
}
function st() {
  const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
    t = ["__proto__", "constructor", "prototype"];
  for (let n = 1; n < arguments.length; n += 1) {
    const r = n < 0 || arguments.length <= n ? void 0 : arguments[n];
    if (r != null && !Ly(r)) {
      const i = Object.keys(Object(r)).filter((l) => t.indexOf(l) < 0);
      for (let l = 0, a = i.length; l < a; l += 1) {
        const s = i[l],
          o = Object.getOwnPropertyDescriptor(r, s);
        o !== void 0 &&
          o.enumerable &&
          (yl(e[s]) && yl(r[s])
            ? r[s].__swiper__
              ? (e[s] = r[s])
              : st(e[s], r[s])
            : !yl(e[s]) && yl(r[s])
              ? ((e[s] = {}), r[s].__swiper__ ? (e[s] = r[s]) : st(e[s], r[s]))
              : (e[s] = r[s]));
      }
    }
  }
  return e;
}
function wl(e, t, n) {
  e.style.setProperty(t, n);
}
function $m(e) {
  let { swiper: t, targetPosition: n, side: r } = e;
  const i = Je(),
    l = -t.translate;
  let a = null,
    s;
  const o = t.params.speed;
  ((t.wrapperEl.style.scrollSnapType = "none"),
    i.cancelAnimationFrame(t.cssModeFrameID));
  const c = n > l ? "next" : "prev",
    d = (h, v) => (c === "next" && h >= v) || (c === "prev" && h <= v),
    p = () => {
      ((s = new Date().getTime()), a === null && (a = s));
      const h = Math.max(Math.min((s - a) / o, 1), 0),
        v = 0.5 - Math.cos(h * Math.PI) / 2;
      let x = l + v * (n - l);
      if ((d(x, n) && (x = n), t.wrapperEl.scrollTo({ [r]: x }), d(x, n))) {
        ((t.wrapperEl.style.overflow = "hidden"),
          (t.wrapperEl.style.scrollSnapType = ""),
          setTimeout(() => {
            ((t.wrapperEl.style.overflow = ""),
              t.wrapperEl.scrollTo({ [r]: x }));
          }),
          i.cancelAnimationFrame(t.cssModeFrameID));
        return;
      }
      t.cssModeFrameID = i.requestAnimationFrame(p);
    };
  p();
}
function Dt(e, t) {
  t === void 0 && (t = "");
  const n = Je(),
    r = [...e.children];
  return (
    n.HTMLSlotElement &&
      e instanceof HTMLSlotElement &&
      r.push(...e.assignedElements()),
    t ? r.filter((i) => i.matches(t)) : r
  );
}
function Dy(e, t) {
  const n = [t];
  for (; n.length > 0; ) {
    const r = n.shift();
    if (e === r) return !0;
    n.push(
      ...r.children,
      ...(r.shadowRoot ? r.shadowRoot.children : []),
      ...(r.assignedElements ? r.assignedElements() : []),
    );
  }
}
function Ry(e, t) {
  const n = Je();
  let r = t.contains(e);
  return (
    !r &&
      n.HTMLSlotElement &&
      t instanceof HTMLSlotElement &&
      ((r = [...t.assignedElements()].includes(e)), r || (r = Dy(e, t))),
    r
  );
}
function ga(e) {
  try {
    console.warn(e);
    return;
  } catch {}
}
function va(e, t) {
  t === void 0 && (t = []);
  const n = document.createElement(e);
  return (n.classList.add(...(Array.isArray(t) ? t : Py(t))), n);
}
function _y(e, t) {
  const n = [];
  for (; e.previousElementSibling; ) {
    const r = e.previousElementSibling;
    (t ? r.matches(t) && n.push(r) : n.push(r), (e = r));
  }
  return n;
}
function Oy(e, t) {
  const n = [];
  for (; e.nextElementSibling; ) {
    const r = e.nextElementSibling;
    (t ? r.matches(t) && n.push(r) : n.push(r), (e = r));
  }
  return n;
}
function fn(e, t) {
  return Je().getComputedStyle(e, null).getPropertyValue(t);
}
function xa(e) {
  let t = e,
    n;
  if (t) {
    for (n = 0; (t = t.previousSibling) !== null; )
      t.nodeType === 1 && (n += 1);
    return n;
  }
}
function Gm(e, t) {
  const n = [];
  let r = e.parentElement;
  for (; r; )
    (t ? r.matches(t) && n.push(r) : n.push(r), (r = r.parentElement));
  return n;
}
function zo(e, t, n) {
  const r = Je();
  return (
    e[t === "width" ? "offsetWidth" : "offsetHeight"] +
    parseFloat(
      r
        .getComputedStyle(e, null)
        .getPropertyValue(t === "width" ? "margin-right" : "margin-top"),
    ) +
    parseFloat(
      r
        .getComputedStyle(e, null)
        .getPropertyValue(t === "width" ? "margin-left" : "margin-bottom"),
    )
  );
}
function At(e) {
  return (Array.isArray(e) ? e : [e]).filter((t) => !!t);
}
function ya(e, t) {
  (t === void 0 && (t = ""),
    typeof trustedTypes < "u"
      ? (e.innerHTML = trustedTypes
          .createPolicy("html", { createHTML: (n) => n })
          .createHTML(t))
      : (e.innerHTML = t));
}
function Iy(e, t, n, r) {
  return (
    e.params.createElements &&
      Object.keys(r).forEach((i) => {
        if (!n[i] && n.auto === !0) {
          let l = Dt(e.el, `.${r[i]}`)[0];
          (l || ((l = va("div", r[i])), (l.className = r[i]), e.el.append(l)),
            (n[i] = l),
            (t[i] = l));
        }
      }),
    n
  );
}
function ni(e) {
  return (
    e === void 0 && (e = ""),
    `.${e
      .trim()
      .replace(/([\.:!+\/()[\]])/g, "\\$1")
      .replace(/ /g, ".")}`
  );
}
function Ay(e) {
  let { swiper: t, extendParams: n, on: r, emit: i } = e;
  const l = "swiper-pagination";
  (n({
    pagination: {
      el: null,
      bulletElement: "span",
      clickable: !1,
      hideOnClick: !1,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: !1,
      type: "bullets",
      dynamicBullets: !1,
      dynamicMainBullets: 1,
      formatFractionCurrent: (f) => f,
      formatFractionTotal: (f) => f,
      bulletClass: `${l}-bullet`,
      bulletActiveClass: `${l}-bullet-active`,
      modifierClass: `${l}-`,
      currentClass: `${l}-current`,
      totalClass: `${l}-total`,
      hiddenClass: `${l}-hidden`,
      progressbarFillClass: `${l}-progressbar-fill`,
      progressbarOppositeClass: `${l}-progressbar-opposite`,
      clickableClass: `${l}-clickable`,
      lockClass: `${l}-lock`,
      horizontalClass: `${l}-horizontal`,
      verticalClass: `${l}-vertical`,
      paginationDisabledClass: `${l}-disabled`,
    },
  }),
    (t.pagination = { el: null, bullets: [] }));
  let a,
    s = 0;
  function o() {
    return (
      !t.params.pagination.el ||
      !t.pagination.el ||
      (Array.isArray(t.pagination.el) && t.pagination.el.length === 0)
    );
  }
  function c(f, m) {
    const { bulletActiveClass: w } = t.params.pagination;
    f &&
      ((f = f[`${m === "prev" ? "previous" : "next"}ElementSibling`]),
      f &&
        (f.classList.add(`${w}-${m}`),
        (f = f[`${m === "prev" ? "previous" : "next"}ElementSibling`]),
        f && f.classList.add(`${w}-${m}-${m}`)));
  }
  function d(f, m, w) {
    if (((f = f % w), (m = m % w), m === f + 1)) return "next";
    if (m === f - 1) return "previous";
  }
  function p(f) {
    const m = f.target.closest(ni(t.params.pagination.bulletClass));
    if (!m) return;
    f.preventDefault();
    const w = xa(m) * t.params.slidesPerGroup;
    if (t.params.loop) {
      if (t.realIndex === w) return;
      const T = d(t.realIndex, w, t.slides.length);
      T === "next"
        ? t.slideNext()
        : T === "previous"
          ? t.slidePrev()
          : t.slideToLoop(w);
    } else t.slideTo(w);
  }
  function h() {
    const f = t.rtl,
      m = t.params.pagination;
    if (o()) return;
    let w = t.pagination.el;
    w = At(w);
    let T, L;
    const y =
        t.virtual && t.params.virtual.enabled
          ? t.virtual.slides.length
          : t.slides.length,
      C = t.params.loop
        ? Math.ceil(y / t.params.slidesPerGroup)
        : t.snapGrid.length;
    if (
      (t.params.loop
        ? ((L = t.previousRealIndex || 0),
          (T =
            t.params.slidesPerGroup > 1
              ? Math.floor(t.realIndex / t.params.slidesPerGroup)
              : t.realIndex))
        : typeof t.snapIndex < "u"
          ? ((T = t.snapIndex), (L = t.previousSnapIndex))
          : ((L = t.previousIndex || 0), (T = t.activeIndex || 0)),
      m.type === "bullets" &&
        t.pagination.bullets &&
        t.pagination.bullets.length > 0)
    ) {
      const M = t.pagination.bullets;
      let P, _, F;
      if (
        (m.dynamicBullets &&
          ((a = zo(M[0], t.isHorizontal() ? "width" : "height")),
          w.forEach((D) => {
            D.style[t.isHorizontal() ? "width" : "height"] =
              `${a * (m.dynamicMainBullets + 4)}px`;
          }),
          m.dynamicMainBullets > 1 &&
            L !== void 0 &&
            ((s += T - (L || 0)),
            s > m.dynamicMainBullets - 1
              ? (s = m.dynamicMainBullets - 1)
              : s < 0 && (s = 0)),
          (P = Math.max(T - s, 0)),
          (_ = P + (Math.min(M.length, m.dynamicMainBullets) - 1)),
          (F = (_ + P) / 2)),
        M.forEach((D) => {
          const A = [
            ...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map(
              (W) => `${m.bulletActiveClass}${W}`,
            ),
          ]
            .map((W) =>
              typeof W == "string" && W.includes(" ") ? W.split(" ") : W,
            )
            .flat();
          D.classList.remove(...A);
        }),
        w.length > 1)
      )
        M.forEach((D) => {
          const A = xa(D);
          (A === T
            ? D.classList.add(...m.bulletActiveClass.split(" "))
            : t.isElement && D.setAttribute("part", "bullet"),
            m.dynamicBullets &&
              (A >= P &&
                A <= _ &&
                D.classList.add(...`${m.bulletActiveClass}-main`.split(" ")),
              A === P && c(D, "prev"),
              A === _ && c(D, "next")));
        });
      else {
        const D = M[T];
        if (
          (D && D.classList.add(...m.bulletActiveClass.split(" ")),
          t.isElement &&
            M.forEach((A, W) => {
              A.setAttribute("part", W === T ? "bullet-active" : "bullet");
            }),
          m.dynamicBullets)
        ) {
          const A = M[P],
            W = M[_];
          for (let K = P; K <= _; K += 1)
            M[K] &&
              M[K].classList.add(...`${m.bulletActiveClass}-main`.split(" "));
          (c(A, "prev"), c(W, "next"));
        }
      }
      if (m.dynamicBullets) {
        const D = Math.min(M.length, m.dynamicMainBullets + 4),
          A = (a * D - a) / 2 - F * a,
          W = f ? "right" : "left";
        M.forEach((K) => {
          K.style[t.isHorizontal() ? W : "top"] = `${A}px`;
        });
      }
    }
    w.forEach((M, P) => {
      if (
        (m.type === "fraction" &&
          (M.querySelectorAll(ni(m.currentClass)).forEach((_) => {
            _.textContent = m.formatFractionCurrent(T + 1);
          }),
          M.querySelectorAll(ni(m.totalClass)).forEach((_) => {
            _.textContent = m.formatFractionTotal(C);
          })),
        m.type === "progressbar")
      ) {
        let _;
        m.progressbarOpposite
          ? (_ = t.isHorizontal() ? "vertical" : "horizontal")
          : (_ = t.isHorizontal() ? "horizontal" : "vertical");
        const F = (T + 1) / C;
        let D = 1,
          A = 1;
        (_ === "horizontal" ? (D = F) : (A = F),
          M.querySelectorAll(ni(m.progressbarFillClass)).forEach((W) => {
            ((W.style.transform = `translate3d(0,0,0) scaleX(${D}) scaleY(${A})`),
              (W.style.transitionDuration = `${t.params.speed}ms`));
          }));
      }
      (m.type === "custom" && m.renderCustom
        ? (ya(M, m.renderCustom(t, T + 1, C)),
          P === 0 && i("paginationRender", M))
        : (P === 0 && i("paginationRender", M), i("paginationUpdate", M)),
        t.params.watchOverflow &&
          t.enabled &&
          M.classList[t.isLocked ? "add" : "remove"](m.lockClass));
    });
  }
  function v() {
    const f = t.params.pagination;
    if (o()) return;
    const m =
      t.virtual && t.params.virtual.enabled
        ? t.virtual.slides.length
        : t.grid && t.params.grid.rows > 1
          ? t.slides.length / Math.ceil(t.params.grid.rows)
          : t.slides.length;
    let w = t.pagination.el;
    w = At(w);
    let T = "";
    if (f.type === "bullets") {
      let L = t.params.loop
        ? Math.ceil(m / t.params.slidesPerGroup)
        : t.snapGrid.length;
      t.params.freeMode && t.params.freeMode.enabled && L > m && (L = m);
      for (let y = 0; y < L; y += 1)
        f.renderBullet
          ? (T += f.renderBullet.call(t, y, f.bulletClass))
          : (T += `<${f.bulletElement} ${t.isElement ? 'part="bullet"' : ""} class="${f.bulletClass}"></${f.bulletElement}>`);
    }
    (f.type === "fraction" &&
      (f.renderFraction
        ? (T = f.renderFraction.call(t, f.currentClass, f.totalClass))
        : (T = `<span class="${f.currentClass}"></span> / <span class="${f.totalClass}"></span>`)),
      f.type === "progressbar" &&
        (f.renderProgressbar
          ? (T = f.renderProgressbar.call(t, f.progressbarFillClass))
          : (T = `<span class="${f.progressbarFillClass}"></span>`)),
      (t.pagination.bullets = []),
      w.forEach((L) => {
        (f.type !== "custom" && ya(L, T || ""),
          f.type === "bullets" &&
            t.pagination.bullets.push(
              ...L.querySelectorAll(ni(f.bulletClass)),
            ));
      }),
      f.type !== "custom" && i("paginationRender", w[0]));
  }
  function x() {
    t.params.pagination = Iy(
      t,
      t.originalParams.pagination,
      t.params.pagination,
      { el: "swiper-pagination" },
    );
    const f = t.params.pagination;
    if (!f.el) return;
    let m;
    (typeof f.el == "string" && t.isElement && (m = t.el.querySelector(f.el)),
      !m &&
        typeof f.el == "string" &&
        (m = [...document.querySelectorAll(f.el)]),
      m || (m = f.el),
      !(!m || m.length === 0) &&
        (t.params.uniqueNavElements &&
          typeof f.el == "string" &&
          Array.isArray(m) &&
          m.length > 1 &&
          ((m = [...t.el.querySelectorAll(f.el)]),
          m.length > 1 && (m = m.find((w) => Gm(w, ".swiper")[0] === t.el))),
        Array.isArray(m) && m.length === 1 && (m = m[0]),
        Object.assign(t.pagination, { el: m }),
        (m = At(m)),
        m.forEach((w) => {
          (f.type === "bullets" &&
            f.clickable &&
            w.classList.add(...(f.clickableClass || "").split(" ")),
            w.classList.add(f.modifierClass + f.type),
            w.classList.add(
              t.isHorizontal() ? f.horizontalClass : f.verticalClass,
            ),
            f.type === "bullets" &&
              f.dynamicBullets &&
              (w.classList.add(`${f.modifierClass}${f.type}-dynamic`),
              (s = 0),
              f.dynamicMainBullets < 1 && (f.dynamicMainBullets = 1)),
            f.type === "progressbar" &&
              f.progressbarOpposite &&
              w.classList.add(f.progressbarOppositeClass),
            f.clickable && w.addEventListener("click", p),
            t.enabled || w.classList.add(f.lockClass));
        })));
  }
  function b() {
    const f = t.params.pagination;
    if (o()) return;
    let m = t.pagination.el;
    (m &&
      ((m = At(m)),
      m.forEach((w) => {
        (w.classList.remove(f.hiddenClass),
          w.classList.remove(f.modifierClass + f.type),
          w.classList.remove(
            t.isHorizontal() ? f.horizontalClass : f.verticalClass,
          ),
          f.clickable &&
            (w.classList.remove(...(f.clickableClass || "").split(" ")),
            w.removeEventListener("click", p)));
      })),
      t.pagination.bullets &&
        t.pagination.bullets.forEach((w) =>
          w.classList.remove(...f.bulletActiveClass.split(" ")),
        ));
  }
  (r("changeDirection", () => {
    if (!t.pagination || !t.pagination.el) return;
    const f = t.params.pagination;
    let { el: m } = t.pagination;
    ((m = At(m)),
      m.forEach((w) => {
        (w.classList.remove(f.horizontalClass, f.verticalClass),
          w.classList.add(
            t.isHorizontal() ? f.horizontalClass : f.verticalClass,
          ));
      }));
  }),
    r("init", () => {
      t.params.pagination.enabled === !1 ? g() : (x(), v(), h());
    }),
    r("activeIndexChange", () => {
      typeof t.snapIndex > "u" && h();
    }),
    r("snapIndexChange", () => {
      h();
    }),
    r("snapGridLengthChange", () => {
      (v(), h());
    }),
    r("destroy", () => {
      b();
    }),
    r("enable disable", () => {
      let { el: f } = t.pagination;
      f &&
        ((f = At(f)),
        f.forEach((m) =>
          m.classList[t.enabled ? "remove" : "add"](
            t.params.pagination.lockClass,
          ),
        ));
    }),
    r("lock unlock", () => {
      h();
    }),
    r("click", (f, m) => {
      const w = m.target,
        T = At(t.pagination.el);
      if (
        t.params.pagination.el &&
        t.params.pagination.hideOnClick &&
        T &&
        T.length > 0 &&
        !w.classList.contains(t.params.pagination.bulletClass)
      ) {
        if (
          t.navigation &&
          ((t.navigation.nextEl && w === t.navigation.nextEl) ||
            (t.navigation.prevEl && w === t.navigation.prevEl))
        )
          return;
        const L = T[0].classList.contains(t.params.pagination.hiddenClass);
        (i(L === !0 ? "paginationShow" : "paginationHide"),
          T.forEach((y) =>
            y.classList.toggle(t.params.pagination.hiddenClass),
          ));
      }
    }));
  const N = () => {
      t.el.classList.remove(t.params.pagination.paginationDisabledClass);
      let { el: f } = t.pagination;
      (f &&
        ((f = At(f)),
        f.forEach((m) =>
          m.classList.remove(t.params.pagination.paginationDisabledClass),
        )),
        x(),
        v(),
        h());
    },
    g = () => {
      t.el.classList.add(t.params.pagination.paginationDisabledClass);
      let { el: f } = t.pagination;
      (f &&
        ((f = At(f)),
        f.forEach((m) =>
          m.classList.add(t.params.pagination.paginationDisabledClass),
        )),
        b());
    };
  Object.assign(t.pagination, {
    enable: N,
    disable: g,
    render: v,
    update: h,
    init: x,
    destroy: b,
  });
}
const Ts = "/assets/figma/Section6_Asset0.png",
  Es = "/assets/figma/Section6_Asset1.png",
  zy = "/assets/figma/Section6_Asset10.png",
  Fy = "/assets/figma/Section6_Asset11.png",
  By = "/assets/figma/Section6_Asset12.png",
  Uy = "/assets/figma/Section6_Asset13.png",
  Hy = "/assets/figma/Section6_Asset14.png",
  Vy = "/assets/figma/Section6_Asset15.png",
  Wy = "/assets/figma/Section6_Asset16.png",
  Yd = "/assets/figma/Section6_Asset17.png",
  Qd = "/assets/figma/Section6_Asset18.png",
  Xd = "/assets/figma/Section6_Asset19.png",
  js = "/assets/figma/Section6_Asset2.png",
  qd = "/assets/figma/Section6_Asset20.png",
  Jd = "/assets/figma/Section6_Asset21.png",
  Zd = "/assets/figma/Section6_Asset22.png",
  ef = "/assets/figma/Section6_Asset23.png",
  tf = "/assets/figma/Section6_Asset24.png",
  Cs = "/assets/figma/Section6_Asset3.png",
  Ps = "/assets/figma/Section6_Asset4.png",
  ks = "/assets/figma/Section6_Asset5.png",
  Ns = "/assets/figma/Section6_Asset6.png",
  Ms = "/assets/figma/Section6_Asset7.png",
  $y = "/assets/figma/Section6_Asset8.png",
  Gy = "/assets/figma/Section6_Asset9.png",
  Ku = () =>
    u.jsx("div", {
      className: "py-[60px] pb-[120px]",
      children: u.jsxs("div", {
        className: "Container flex flex-col gap-[60px] relative z-10",
        children: [
          u.jsx(Fr, { subtitle: "", children: "Our Impact Partners" }),
          u.jsxs("div", {
            className: "",
            children: [
              u.jsxs(Ss, {
                gradient: !0,
                pauseOnClick: !0,
                children: [
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[56px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: Ts,
                      draggable: "false",
                      className: "h-[56px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: Es,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: js,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: Cs,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: Ps,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: ks,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[110px] mx-[15px]",
                    children: u.jsx(V, {
                      src: Ns,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: Ms,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[56px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: Ts,
                      draggable: "false",
                      className: "h-[56px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: Es,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: js,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: Cs,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: Ps,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: ks,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[110px] mx-[15px]",
                    children: u.jsx(V, {
                      src: Ns,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: Ms,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[56px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: Ts,
                      draggable: "false",
                      className: "h-[56px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: Es,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: js,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: Cs,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: Ps,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: ks,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[110px] mx-[15px]",
                    children: u.jsx(V, {
                      src: Ns,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: Ms,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                ],
              }),
              u.jsxs(Ss, {
                className: "mt-[30px]",
                direction: "right",
                gradient: !0,
                pauseOnClick: !0,
                children: [
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: $y,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: Gy,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[110px] mx-[15px]",
                    children: u.jsx(V, {
                      src: zy,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: Fy,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: By,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: Uy,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[130px] mx-[15px]",
                    children: u.jsx(V, {
                      src: Hy,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[130px] mx-[15px]",
                    children: u.jsx(V, {
                      src: Vy,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[100px] mx-[15px]",
                    children: u.jsx(V, {
                      src: Wy,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                ],
              }),
              u.jsxs(Ss, {
                className: "mt-[30px]",
                gradient: !0,
                pauseOnClick: !0,
                children: [
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: Yd,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[100px] mx-[15px]",
                    children: u.jsx(V, {
                      src: Qd,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: Xd,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: qd,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: Jd,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: Zd,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: ef,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[100px] mx-[15px]",
                    children: u.jsx(V, {
                      src: tf,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: Yd,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[100px] mx-[15px]",
                    children: u.jsx(V, {
                      src: Qd,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: Xd,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: qd,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: Jd,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: Zd,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[180px] mx-[15px]",
                    children: u.jsx(V, {
                      src: ef,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                  u.jsx("div", {
                    className:
                      "flex justify-center items-center h-[100px] max-w-[100px] mx-[15px]",
                    children: u.jsx(V, {
                      src: tf,
                      draggable: "false",
                      className: "h-[100px]",
                    }),
                  }),
                ],
              }),
            ],
          }),
          u.jsx("div", {
            className:
              "text-SecondaryText text-center text-[14px] md:text-[18px] md:leading-[32px]",
            children:
              "and many more impact partners from accreditation, academia, public and private sectors.",
          }),
        ],
      }),
    }),
  Yu = () =>
    u.jsxs("section", {
      id: "cta-1",
      className: "cta1 relative lg:h-[358px] bg-[#FFF5E2]",
      children: [
        u.jsx("div", {
          className:
            "hidden sm:flex absolute z-0 w-full h-full justify-center items-center px-8",
          children: u.jsx(V, {
            src: "/assets/figma/Section4_Asset1.svg",
            draggable: "false",
          }),
        }),
        u.jsx("div", {
          className: "relative Container",
          children: u.jsxs("div", {
            className:
              "flex flex-col justify-center items-center gap-10 py-[40px] sm:py-[80px]",
            children: [
              u.jsx("h1", {
                className:
                  "z-10 font-primary font-bold text-PrimaryText text-center px-4 text-[18px] xs:text-[24px] md:text-[32px] xl:text-[40px] xl:leading-[52px]",
                children:
                  "Contact us to learn about our programs or to discuss partnership opportunities.",
              }),
              u.jsxs("div", {
                className: "flex flex-row gap-3",
                children: [
                  u.jsx(ee, {
                    to: "/work-with-us",
                    children: u.jsx("button", {
                      className: "primary-btn2 xs:h-14",
                      children: "Join Partnership",
                    }),
                  }),
                  u.jsx(ee, {
                    to: "/work-with-us",
                    children: u.jsx("button", {
                      className:
                        "contact-us-btn xs:h-14 xs:w-40 justify-center",
                      children: "Contact Us",
                    }),
                  }),
                ],
              }),
            ],
          }),
        }),
      ],
    });
class Gi {
  constructor(t = 0, n = "Network Error") {
    ((this.status = t), (this.text = n));
  }
}
const Ky = () => {
    if (!(typeof localStorage > "u"))
      return {
        get: (e) => Promise.resolve(localStorage.getItem(e)),
        set: (e, t) => Promise.resolve(localStorage.setItem(e, t)),
        remove: (e) => Promise.resolve(localStorage.removeItem(e)),
      };
  },
  Be = {
    origin: "https://api.emailjs.com",
    blockHeadless: !1,
    storageProvider: Ky(),
  },
  Qu = (e) =>
    e
      ? typeof e == "string"
        ? { publicKey: e }
        : e.toString() === "[object Object]"
          ? e
          : {}
      : {},
  Yy = (e, t = "https://api.emailjs.com") => {
    if (!e) return;
    const n = Qu(e);
    ((Be.publicKey = n.publicKey),
      (Be.blockHeadless = n.blockHeadless),
      (Be.storageProvider = n.storageProvider),
      (Be.blockList = n.blockList),
      (Be.limitRate = n.limitRate),
      (Be.origin = n.origin || t));
  },
  Km = async (e, t, n = {}) => {
    const r = await fetch(Be.origin + e, {
        method: "POST",
        headers: n,
        body: t,
      }),
      i = await r.text(),
      l = new Gi(r.status, i);
    if (r.ok) return l;
    throw l;
  },
  Ym = (e, t, n) => {
    if (!e || typeof e != "string")
      throw "The public key is required. Visit https://dashboard.emailjs.com/admin/account";
    if (!t || typeof t != "string")
      throw "The service ID is required. Visit https://dashboard.emailjs.com/admin";
    if (!n || typeof n != "string")
      throw "The template ID is required. Visit https://dashboard.emailjs.com/admin/templates";
  },
  Qy = (e) => {
    if (e && e.toString() !== "[object Object]")
      throw "The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/";
  },
  Qm = (e) => e.webdriver || !e.languages || e.languages.length === 0,
  Xm = () => new Gi(451, "Unavailable For Headless Browser"),
  Xy = (e, t) => {
    if (!Array.isArray(e)) throw "The BlockList list has to be an array";
    if (typeof t != "string")
      throw "The BlockList watchVariable has to be a string";
  },
  qy = (e) => {
    var t;
    return !((t = e.list) != null && t.length) || !e.watchVariable;
  },
  Jy = (e, t) => (e instanceof FormData ? e.get(t) : e[t]),
  qm = (e, t) => {
    if (qy(e)) return !1;
    Xy(e.list, e.watchVariable);
    const n = Jy(t, e.watchVariable);
    return typeof n != "string" ? !1 : e.list.includes(n);
  },
  Jm = () => new Gi(403, "Forbidden"),
  Zy = (e, t) => {
    if (typeof e != "number" || e < 0)
      throw "The LimitRate throttle has to be a positive number";
    if (t && typeof t != "string")
      throw "The LimitRate ID has to be a non-empty string";
  },
  e1 = async (e, t, n) => {
    const r = Number((await n.get(e)) || 0);
    return t - Date.now() + r;
  },
  Zm = async (e, t, n) => {
    if (!t.throttle || !n) return !1;
    Zy(t.throttle, t.id);
    const r = t.id || e;
    return (await e1(r, t.throttle, n)) > 0
      ? !0
      : (await n.set(r, Date.now().toString()), !1);
  },
  eh = () => new Gi(429, "Too Many Requests"),
  t1 = async (e, t, n, r) => {
    const i = Qu(r),
      l = i.publicKey || Be.publicKey,
      a = i.blockHeadless || Be.blockHeadless,
      s = i.storageProvider || Be.storageProvider,
      o = { ...Be.blockList, ...i.blockList },
      c = { ...Be.limitRate, ...i.limitRate };
    return a && Qm(navigator)
      ? Promise.reject(Xm())
      : (Ym(l, e, t),
        Qy(n),
        n && qm(o, n)
          ? Promise.reject(Jm())
          : (await Zm(location.pathname, c, s))
            ? Promise.reject(eh())
            : Km(
                "/api/v1.0/email/send",
                JSON.stringify({
                  lib_version: "4.4.1",
                  user_id: l,
                  service_id: e,
                  template_id: t,
                  template_params: n,
                }),
                { "Content-type": "application/json" },
              ));
  },
  n1 = (e) => {
    if (!e || e.nodeName !== "FORM")
      throw "The 3rd parameter is expected to be the HTML form element or the style selector of the form";
  },
  r1 = (e) => (typeof e == "string" ? document.querySelector(e) : e),
  i1 = async (e, t, n, r) => {
    const i = Qu(r),
      l = i.publicKey || Be.publicKey,
      a = i.blockHeadless || Be.blockHeadless,
      s = Be.storageProvider || i.storageProvider,
      o = { ...Be.blockList, ...i.blockList },
      c = { ...Be.limitRate, ...i.limitRate };
    if (a && Qm(navigator)) return Promise.reject(Xm());
    const d = r1(n);
    (Ym(l, e, t), n1(d));
    const p = new FormData(d);
    return qm(o, p)
      ? Promise.reject(Jm())
      : (await Zm(location.pathname, c, s))
        ? Promise.reject(eh())
        : (p.append("lib_version", "4.4.1"),
          p.append("service_id", e),
          p.append("template_id", t),
          p.append("user_id", l),
          Km("/api/v1.0/email/send-form", p));
  },
  l1 = { init: Yy, send: t1, sendForm: i1, EmailJSResponseStatus: Gi };
function a1(e) {
  return Pt({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z",
        },
        child: [],
      },
    ],
  })(e);
}
const Ba = () => {
    const [e, t] = j.useState(!1);
    return u.jsxs("section", {
      id: "cta-2",
      className: "cta2 relative lg:h-[400px] bg-AccentText overflow-hidden",
      children: [
        u.jsx("div", {
          className:
            "hidden lg:flex absolute z-0 top-0 right-0 justify-center items-center mix-blend-plus-lighter",
          children: u.jsx(V, {
            src: "/assets/figma/Section7_Asset1.svg",
            draggable: "false",
          }),
        }),
        u.jsx("div", {
          className: "Container",
          children: u.jsxs("div", {
            className:
              "grid lg:grid-cols-12 items-center gap-8 lg:gap-16 py-[40px] md:py-[80px]",
            children: [
              u.jsxs("div", {
                className: "relative lg:col-span-8",
                children: [
                  u.jsxs("h1", {
                    className:
                      "font-primary font-bold text-white text-[24px] md:text-[32px] xl:text-[40px] xl:leading-[52px] pl-[20px] md:pl-[30px] border-l-4 border-white",
                    children: [
                      "Be Part of the Change.",
                      u.jsx("br", {}),
                      " Collaborate for Impact.",
                    ],
                  }),
                  u.jsxs("p", {
                    className:
                      "text-[14px] xl:text-[18px] xl:leading-[32px] font-normal text-white mt-5",
                    children: [
                      "We",
                      "'",
                      "re available for 8 hours a day! ",
                      u.jsx("br", {}),
                      "Contact us to learn about our programs or to discuss partnership opportunities.",
                    ],
                  }),
                ],
              }),
              u.jsxs("div", {
                className:
                  "relative lg:col-span-4 flex flex-col justify-center items-center",
                children: [
                  u.jsx(a1, {
                    className: "w-8 h-8 md:w-12 md:h-12 text-white",
                  }),
                  u.jsx("div", {
                    className:
                      "text-[14px] font-bold tracking-[3px] text-white mt-4",
                    children: "REACH OUT NOW",
                  }),
                  u.jsx("h1", {
                    className:
                      "font-primary font-bold text-white text-[32px] md:text-[40px] xl:text-[48px] xl:leading-[56.2px] whitespace-nowrap pt-1 md:pt-3",
                    children: "(+60)16-350 4840",
                  }),
                  u.jsx(ee, {
                    to: "/work-with-us",
                    children: u.jsx("button", {
                      className: "contact-us-btn xs:h-14 xs:w-40 mt-2 md:mt-6",
                      children: "Contact Us",
                    }),
                  }),
                ],
              }),
            ],
          }),
        }),
      ],
    });
  },
  s1 = () => (
    j.useCallback((e, t = -200) => {
      var r;
      const n = document.getElementById(e);
      if (n) {
        const i =
          ((r = n == null ? void 0 : n.getBoundingClientRect()) == null
            ? void 0
            : r.top) +
          window.scrollY +
          t;
        window.scrollTo({ top: i, behavior: "smooth" });
      }
    }, []),
    u.jsxs("section", {
      className: Wn(
        "relative bg-cover bg-center bg-no-repeat flex items-center z-10 overflow-hidden",
        {
          "py-12 pb-20 xs:pb-24 xs:pt-12 sm:!pt-16 sm:!pb-28 md:!pt-16 md:!pb-32 lg:!py-0":
            !0,
          "lg:h-[500px] xl:h-[700px]": !0,
        },
      ),
      children: [
        u.jsxs("div", {
          className:
            "relative Container flex h-full justify-center items-center",
          children: [
            u.jsx("div", {
              className:
                "grid lg:grid-cols-12 items-center gap-0 sm:gap-16 lg:gap-0 xs:pt-[30px] lg:pt-[60px]",
              children: u.jsxs("div", {
                className:
                  "relative lg:col-span-8 xl:col-span-6 flex flex-col gap-[10px]",
                children: [
                  u.jsx("h1", {
                    className:
                      "font-primary font-bold text-HeadingColor-0 text-[32px] 2xs:text-[40px] sm:!text-[56px] sm:!leading-[72.8px]",
                    children: "Impact Strategist",
                  }),
                  u.jsx("p", {
                    className:
                      "sm:text-lg font-normal text-SecondaryColor-0 mb-[36px] xs:mb-[30px] mt-1",
                    children:
                      "A dynamic innovator addressing critical societal challenges through comprehensive value creation and end-to-end solutions.",
                  }),
                  u.jsx("div", {
                    className: "flex flex-col sm:flex-row gap-5",
                    children: u.jsx(ee, {
                      to: "/who-we-are",
                      children: u.jsxs("button", {
                        className: "primary-btn2",
                        children: ["Explore our work", u.jsx(vi, { size: "20" })],
                      }),
                    }),
                  }),
                  u.jsxs("div", {
                    className:
                      "mt-5 grid grid-cols-3 gap-3 max-w-[620px] border-t border-PrimaryBorder pt-5",
                    "aria-label": "Pepper Labs impact at a glance",
                    children: [
                      u.jsxs("div", {
                        children: [
                          u.jsx("strong", {
                            className:
                              "block text-2xl md:text-3xl font-bold text-AccentText",
                            children: "350,000+",
                          }),
                          u.jsx("span", {
                            className: "text-xs md:text-sm text-SecondaryText",
                            children: "learners engaged",
                          }),
                        ],
                      }),
                      u.jsxs("div", {
                        children: [
                          u.jsx("strong", {
                            className:
                              "block text-2xl md:text-3xl font-bold text-AccentText",
                            children: "49,500+",
                          }),
                          u.jsx("span", {
                            className: "text-xs md:text-sm text-SecondaryText",
                            children: "AI certified",
                          }),
                        ],
                      }),
                      u.jsxs("div", {
                        children: [
                          u.jsx("strong", {
                            className:
                              "block text-2xl md:text-3xl font-bold text-AccentText",
                            children: "167",
                          }),
                          u.jsx("span", {
                            className: "text-xs md:text-sm text-SecondaryText",
                            children: "NADI centres targeted",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
            u.jsx("div", {
              className: "absolute top-0 right-0 -z-10 hidden lg:block",
              children: u.jsx(V, {
                src: "/assets/figma/Section0_Asset0.svg",
                draggable: "false",
                className:
                  "max-h-[700px] rotate-0 xl:-rotate-6 translate-x-44 xl:translate-x-48 -translate-y-12 xl:translate-y-0",
              }),
            }),
            u.jsx("div", {
              className:
                "absolute top-0 right-0 -z-10 w-[800px] hidden md:block lg:hidden",
              children: u.jsx(V, {
                src: "/assets/figma/Section0_Asset0.svg",
                draggable: "false",
                className: "rotate-[16deg] -translate-y-12 translate-x-40",
              }),
            }),
          ],
        }),
        u.jsx("div", {
          className:
            "absolute bottom-0 w-[420px] 2xs:w-[600px] sm:!w-[800px] -z-10 block md:hidden",
          children: u.jsx(V, {
            src: "/assets/figma/Section0_Asset0.svg",
            draggable: "false",
            className:
              "rotate-[16deg] xs:rotate-[28deg] -translate-x-6 translate-y-20 2xs:translate-y-32 xs:translate-x-0 xs:translate-y-32 sm:!translate-x-0 sm:!translate-y-52",
          }),
        }),
      ],
    })
  );
let Ls;
function o1() {
  const e = Je(),
    t = tr();
  return {
    smoothScroll:
      t.documentElement &&
      t.documentElement.style &&
      "scrollBehavior" in t.documentElement.style,
    touch: !!(
      "ontouchstart" in e ||
      (e.DocumentTouch && t instanceof e.DocumentTouch)
    ),
  };
}
function th() {
  return (Ls || (Ls = o1()), Ls);
}
let Ds;
function u1(e) {
  let { userAgent: t } = e === void 0 ? {} : e;
  const n = th(),
    r = Je(),
    i = r.navigator.platform,
    l = t || r.navigator.userAgent,
    a = { ios: !1, android: !1 },
    s = r.screen.width,
    o = r.screen.height,
    c = l.match(/(Android);?[\s\/]+([\d.]+)?/);
  let d = l.match(/(iPad).*OS\s([\d_]+)/);
  const p = l.match(/(iPod)(.*OS\s([\d_]+))?/),
    h = !d && l.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
    v = i === "Win32";
  let x = i === "MacIntel";
  const b = [
    "1024x1366",
    "1366x1024",
    "834x1194",
    "1194x834",
    "834x1112",
    "1112x834",
    "768x1024",
    "1024x768",
    "820x1180",
    "1180x820",
    "810x1080",
    "1080x810",
  ];
  return (
    !d &&
      x &&
      n.touch &&
      b.indexOf(`${s}x${o}`) >= 0 &&
      ((d = l.match(/(Version)\/([\d.]+)/)),
      d || (d = [0, 1, "13_0_0"]),
      (x = !1)),
    c && !v && ((a.os = "android"), (a.android = !0)),
    (d || h || p) && ((a.os = "ios"), (a.ios = !0)),
    a
  );
}
function nh(e) {
  return (e === void 0 && (e = {}), Ds || (Ds = u1(e)), Ds);
}
let Rs;
function c1() {
  const e = Je(),
    t = nh();
  let n = !1;
  function r() {
    const s = e.navigator.userAgent.toLowerCase();
    return (
      s.indexOf("safari") >= 0 &&
      s.indexOf("chrome") < 0 &&
      s.indexOf("android") < 0
    );
  }
  if (r()) {
    const s = String(e.navigator.userAgent);
    if (s.includes("Version/")) {
      const [o, c] = s
        .split("Version/")[1]
        .split(" ")[0]
        .split(".")
        .map((d) => Number(d));
      n = o < 16 || (o === 16 && c < 2);
    }
  }
  const i = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
      e.navigator.userAgent,
    ),
    l = r(),
    a = l || (i && t.ios);
  return {
    isSafari: n || l,
    needPerspectiveFix: n,
    need3dFix: a,
    isWebView: i,
  };
}
function rh() {
  return (Rs || (Rs = c1()), Rs);
}
function d1(e) {
  let { swiper: t, on: n, emit: r } = e;
  const i = Je();
  let l = null,
    a = null;
  const s = () => {
      !t || t.destroyed || !t.initialized || (r("beforeResize"), r("resize"));
    },
    o = () => {
      !t ||
        t.destroyed ||
        !t.initialized ||
        ((l = new ResizeObserver((p) => {
          a = i.requestAnimationFrame(() => {
            const { width: h, height: v } = t;
            let x = h,
              b = v;
            (p.forEach((N) => {
              let { contentBoxSize: g, contentRect: f, target: m } = N;
              (m && m !== t.el) ||
                ((x = f ? f.width : (g[0] || g).inlineSize),
                (b = f ? f.height : (g[0] || g).blockSize));
            }),
              (x !== h || b !== v) && s());
          });
        })),
        l.observe(t.el));
    },
    c = () => {
      (a && i.cancelAnimationFrame(a),
        l && l.unobserve && t.el && (l.unobserve(t.el), (l = null)));
    },
    d = () => {
      !t || t.destroyed || !t.initialized || r("orientationchange");
    };
  (n("init", () => {
    if (t.params.resizeObserver && typeof i.ResizeObserver < "u") {
      o();
      return;
    }
    (i.addEventListener("resize", s),
      i.addEventListener("orientationchange", d));
  }),
    n("destroy", () => {
      (c(),
        i.removeEventListener("resize", s),
        i.removeEventListener("orientationchange", d));
    }));
}
function f1(e) {
  let { swiper: t, extendParams: n, on: r, emit: i } = e;
  const l = [],
    a = Je(),
    s = function (d, p) {
      p === void 0 && (p = {});
      const h = a.MutationObserver || a.WebkitMutationObserver,
        v = new h((x) => {
          if (t.__preventObserver__) return;
          if (x.length === 1) {
            i("observerUpdate", x[0]);
            return;
          }
          const b = function () {
            i("observerUpdate", x[0]);
          };
          a.requestAnimationFrame
            ? a.requestAnimationFrame(b)
            : a.setTimeout(b, 0);
        });
      (v.observe(d, {
        attributes: typeof p.attributes > "u" ? !0 : p.attributes,
        childList: t.isElement || (typeof p.childList > "u" ? !0 : p).childList,
        characterData: typeof p.characterData > "u" ? !0 : p.characterData,
      }),
        l.push(v));
    },
    o = () => {
      if (t.params.observer) {
        if (t.params.observeParents) {
          const d = Gm(t.hostEl);
          for (let p = 0; p < d.length; p += 1) s(d[p]);
        }
        (s(t.hostEl, { childList: t.params.observeSlideChildren }),
          s(t.wrapperEl, { attributes: !1 }));
      }
    },
    c = () => {
      (l.forEach((d) => {
        d.disconnect();
      }),
        l.splice(0, l.length));
    };
  (n({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
    r("init", o),
    r("destroy", c));
}
var p1 = {
  on(e, t, n) {
    const r = this;
    if (!r.eventsListeners || r.destroyed || typeof t != "function") return r;
    const i = n ? "unshift" : "push";
    return (
      e.split(" ").forEach((l) => {
        (r.eventsListeners[l] || (r.eventsListeners[l] = []),
          r.eventsListeners[l][i](t));
      }),
      r
    );
  },
  once(e, t, n) {
    const r = this;
    if (!r.eventsListeners || r.destroyed || typeof t != "function") return r;
    function i() {
      (r.off(e, i), i.__emitterProxy && delete i.__emitterProxy);
      for (var l = arguments.length, a = new Array(l), s = 0; s < l; s++)
        a[s] = arguments[s];
      t.apply(r, a);
    }
    return ((i.__emitterProxy = t), r.on(e, i, n));
  },
  onAny(e, t) {
    const n = this;
    if (!n.eventsListeners || n.destroyed || typeof e != "function") return n;
    const r = t ? "unshift" : "push";
    return (
      n.eventsAnyListeners.indexOf(e) < 0 && n.eventsAnyListeners[r](e),
      n
    );
  },
  offAny(e) {
    const t = this;
    if (!t.eventsListeners || t.destroyed || !t.eventsAnyListeners) return t;
    const n = t.eventsAnyListeners.indexOf(e);
    return (n >= 0 && t.eventsAnyListeners.splice(n, 1), t);
  },
  off(e, t) {
    const n = this;
    return (
      !n.eventsListeners ||
        n.destroyed ||
        !n.eventsListeners ||
        e.split(" ").forEach((r) => {
          typeof t > "u"
            ? (n.eventsListeners[r] = [])
            : n.eventsListeners[r] &&
              n.eventsListeners[r].forEach((i, l) => {
                (i === t || (i.__emitterProxy && i.__emitterProxy === t)) &&
                  n.eventsListeners[r].splice(l, 1);
              });
        }),
      n
    );
  },
  emit() {
    const e = this;
    if (!e.eventsListeners || e.destroyed || !e.eventsListeners) return e;
    let t, n, r;
    for (var i = arguments.length, l = new Array(i), a = 0; a < i; a++)
      l[a] = arguments[a];
    return (
      typeof l[0] == "string" || Array.isArray(l[0])
        ? ((t = l[0]), (n = l.slice(1, l.length)), (r = e))
        : ((t = l[0].events), (n = l[0].data), (r = l[0].context || e)),
      n.unshift(r),
      (Array.isArray(t) ? t : t.split(" ")).forEach((o) => {
        (e.eventsAnyListeners &&
          e.eventsAnyListeners.length &&
          e.eventsAnyListeners.forEach((c) => {
            c.apply(r, [o, ...n]);
          }),
          e.eventsListeners &&
            e.eventsListeners[o] &&
            e.eventsListeners[o].forEach((c) => {
              c.apply(r, n);
            }));
      }),
      e
    );
  },
};
function m1() {
  const e = this;
  let t, n;
  const r = e.el;
  (typeof e.params.width < "u" && e.params.width !== null
    ? (t = e.params.width)
    : (t = r.clientWidth),
    typeof e.params.height < "u" && e.params.height !== null
      ? (n = e.params.height)
      : (n = r.clientHeight),
    !((t === 0 && e.isHorizontal()) || (n === 0 && e.isVertical())) &&
      ((t =
        t -
        parseInt(fn(r, "padding-left") || 0, 10) -
        parseInt(fn(r, "padding-right") || 0, 10)),
      (n =
        n -
        parseInt(fn(r, "padding-top") || 0, 10) -
        parseInt(fn(r, "padding-bottom") || 0, 10)),
      Number.isNaN(t) && (t = 0),
      Number.isNaN(n) && (n = 0),
      Object.assign(e, {
        width: t,
        height: n,
        size: e.isHorizontal() ? t : n,
      })));
}
function h1() {
  const e = this;
  function t(P, _) {
    return parseFloat(P.getPropertyValue(e.getDirectionLabel(_)) || 0);
  }
  const n = e.params,
    { wrapperEl: r, slidesEl: i, size: l, rtlTranslate: a, wrongRTL: s } = e,
    o = e.virtual && n.virtual.enabled,
    c = o ? e.virtual.slides.length : e.slides.length,
    d = Dt(i, `.${e.params.slideClass}, swiper-slide`),
    p = o ? e.virtual.slides.length : d.length;
  let h = [];
  const v = [],
    x = [];
  let b = n.slidesOffsetBefore;
  typeof b == "function" && (b = n.slidesOffsetBefore.call(e));
  let N = n.slidesOffsetAfter;
  typeof N == "function" && (N = n.slidesOffsetAfter.call(e));
  const g = e.snapGrid.length,
    f = e.slidesGrid.length;
  let m = n.spaceBetween,
    w = -b,
    T = 0,
    L = 0;
  if (typeof l > "u") return;
  (typeof m == "string" && m.indexOf("%") >= 0
    ? (m = (parseFloat(m.replace("%", "")) / 100) * l)
    : typeof m == "string" && (m = parseFloat(m)),
    (e.virtualSize = -m),
    d.forEach((P) => {
      (a ? (P.style.marginLeft = "") : (P.style.marginRight = ""),
        (P.style.marginBottom = ""),
        (P.style.marginTop = ""));
    }),
    n.centeredSlides &&
      n.cssMode &&
      (wl(r, "--swiper-centered-offset-before", ""),
      wl(r, "--swiper-centered-offset-after", "")));
  const y = n.grid && n.grid.rows > 1 && e.grid;
  y ? e.grid.initSlides(d) : e.grid && e.grid.unsetSlides();
  let C;
  const M =
    n.slidesPerView === "auto" &&
    n.breakpoints &&
    Object.keys(n.breakpoints).filter(
      (P) => typeof n.breakpoints[P].slidesPerView < "u",
    ).length > 0;
  for (let P = 0; P < p; P += 1) {
    C = 0;
    let _;
    if (
      (d[P] && (_ = d[P]),
      y && e.grid.updateSlide(P, _, d),
      !(d[P] && fn(_, "display") === "none"))
    ) {
      if (n.slidesPerView === "auto") {
        M && (d[P].style[e.getDirectionLabel("width")] = "");
        const F = getComputedStyle(_),
          D = _.style.transform,
          A = _.style.webkitTransform;
        if (
          (D && (_.style.transform = "none"),
          A && (_.style.webkitTransform = "none"),
          n.roundLengths)
        )
          C = e.isHorizontal() ? zo(_, "width") : zo(_, "height");
        else {
          const W = t(F, "width"),
            K = t(F, "padding-left"),
            Z = t(F, "padding-right"),
            R = t(F, "margin-left"),
            z = t(F, "margin-right"),
            $ = F.getPropertyValue("box-sizing");
          if ($ && $ === "border-box") C = W + R + z;
          else {
            const { clientWidth: q, offsetWidth: ie } = _;
            C = W + K + Z + R + z + (ie - q);
          }
        }
        (D && (_.style.transform = D),
          A && (_.style.webkitTransform = A),
          n.roundLengths && (C = Math.floor(C)));
      } else
        ((C = (l - (n.slidesPerView - 1) * m) / n.slidesPerView),
          n.roundLengths && (C = Math.floor(C)),
          d[P] && (d[P].style[e.getDirectionLabel("width")] = `${C}px`));
      (d[P] && (d[P].swiperSlideSize = C),
        x.push(C),
        n.centeredSlides
          ? ((w = w + C / 2 + T / 2 + m),
            T === 0 && P !== 0 && (w = w - l / 2 - m),
            P === 0 && (w = w - l / 2 - m),
            Math.abs(w) < 1 / 1e3 && (w = 0),
            n.roundLengths && (w = Math.floor(w)),
            L % n.slidesPerGroup === 0 && h.push(w),
            v.push(w))
          : (n.roundLengths && (w = Math.floor(w)),
            (L - Math.min(e.params.slidesPerGroupSkip, L)) %
              e.params.slidesPerGroup ===
              0 && h.push(w),
            v.push(w),
            (w = w + C + m)),
        (e.virtualSize += C + m),
        (T = C),
        (L += 1));
    }
  }
  if (
    ((e.virtualSize = Math.max(e.virtualSize, l) + N),
    a &&
      s &&
      (n.effect === "slide" || n.effect === "coverflow") &&
      (r.style.width = `${e.virtualSize + m}px`),
    n.setWrapperSize &&
      (r.style[e.getDirectionLabel("width")] = `${e.virtualSize + m}px`),
    y && e.grid.updateWrapperSize(C, h),
    !n.centeredSlides)
  ) {
    const P = [];
    for (let _ = 0; _ < h.length; _ += 1) {
      let F = h[_];
      (n.roundLengths && (F = Math.floor(F)),
        h[_] <= e.virtualSize - l && P.push(F));
    }
    ((h = P),
      Math.floor(e.virtualSize - l) - Math.floor(h[h.length - 1]) > 1 &&
        h.push(e.virtualSize - l));
  }
  if (o && n.loop) {
    const P = x[0] + m;
    if (n.slidesPerGroup > 1) {
      const _ = Math.ceil(
          (e.virtual.slidesBefore + e.virtual.slidesAfter) / n.slidesPerGroup,
        ),
        F = P * n.slidesPerGroup;
      for (let D = 0; D < _; D += 1) h.push(h[h.length - 1] + F);
    }
    for (let _ = 0; _ < e.virtual.slidesBefore + e.virtual.slidesAfter; _ += 1)
      (n.slidesPerGroup === 1 && h.push(h[h.length - 1] + P),
        v.push(v[v.length - 1] + P),
        (e.virtualSize += P));
  }
  if ((h.length === 0 && (h = [0]), m !== 0)) {
    const P =
      e.isHorizontal() && a ? "marginLeft" : e.getDirectionLabel("marginRight");
    d.filter((_, F) =>
      !n.cssMode || n.loop ? !0 : F !== d.length - 1,
    ).forEach((_) => {
      _.style[P] = `${m}px`;
    });
  }
  if (n.centeredSlides && n.centeredSlidesBounds) {
    let P = 0;
    (x.forEach((F) => {
      P += F + (m || 0);
    }),
      (P -= m));
    const _ = P > l ? P - l : 0;
    h = h.map((F) => (F <= 0 ? -b : F > _ ? _ + N : F));
  }
  if (n.centerInsufficientSlides) {
    let P = 0;
    (x.forEach((F) => {
      P += F + (m || 0);
    }),
      (P -= m));
    const _ = (n.slidesOffsetBefore || 0) + (n.slidesOffsetAfter || 0);
    if (P + _ < l) {
      const F = (l - P - _) / 2;
      (h.forEach((D, A) => {
        h[A] = D - F;
      }),
        v.forEach((D, A) => {
          v[A] = D + F;
        }));
    }
  }
  if (
    (Object.assign(e, {
      slides: d,
      snapGrid: h,
      slidesGrid: v,
      slidesSizesGrid: x,
    }),
    n.centeredSlides && n.cssMode && !n.centeredSlidesBounds)
  ) {
    (wl(r, "--swiper-centered-offset-before", `${-h[0]}px`),
      wl(
        r,
        "--swiper-centered-offset-after",
        `${e.size / 2 - x[x.length - 1] / 2}px`,
      ));
    const P = -e.snapGrid[0],
      _ = -e.slidesGrid[0];
    ((e.snapGrid = e.snapGrid.map((F) => F + P)),
      (e.slidesGrid = e.slidesGrid.map((F) => F + _)));
  }
  if (
    (p !== c && e.emit("slidesLengthChange"),
    h.length !== g &&
      (e.params.watchOverflow && e.checkOverflow(),
      e.emit("snapGridLengthChange")),
    v.length !== f && e.emit("slidesGridLengthChange"),
    n.watchSlidesProgress && e.updateSlidesOffset(),
    e.emit("slidesUpdated"),
    !o && !n.cssMode && (n.effect === "slide" || n.effect === "fade"))
  ) {
    const P = `${n.containerModifierClass}backface-hidden`,
      _ = e.el.classList.contains(P);
    p <= n.maxBackfaceHiddenSlides
      ? _ || e.el.classList.add(P)
      : _ && e.el.classList.remove(P);
  }
}
function g1(e) {
  const t = this,
    n = [],
    r = t.virtual && t.params.virtual.enabled;
  let i = 0,
    l;
  typeof e == "number"
    ? t.setTransition(e)
    : e === !0 && t.setTransition(t.params.speed);
  const a = (s) => (r ? t.slides[t.getSlideIndexByData(s)] : t.slides[s]);
  if (t.params.slidesPerView !== "auto" && t.params.slidesPerView > 1)
    if (t.params.centeredSlides)
      (t.visibleSlides || []).forEach((s) => {
        n.push(s);
      });
    else
      for (l = 0; l < Math.ceil(t.params.slidesPerView); l += 1) {
        const s = t.activeIndex + l;
        if (s > t.slides.length && !r) break;
        n.push(a(s));
      }
  else n.push(a(t.activeIndex));
  for (l = 0; l < n.length; l += 1)
    if (typeof n[l] < "u") {
      const s = n[l].offsetHeight;
      i = s > i ? s : i;
    }
  (i || i === 0) && (t.wrapperEl.style.height = `${i}px`);
}
function v1() {
  const e = this,
    t = e.slides,
    n = e.isElement
      ? e.isHorizontal()
        ? e.wrapperEl.offsetLeft
        : e.wrapperEl.offsetTop
      : 0;
  for (let r = 0; r < t.length; r += 1)
    t[r].swiperSlideOffset =
      (e.isHorizontal() ? t[r].offsetLeft : t[r].offsetTop) -
      n -
      e.cssOverflowAdjustment();
}
const nf = (e, t, n) => {
  t && !e.classList.contains(n)
    ? e.classList.add(n)
    : !t && e.classList.contains(n) && e.classList.remove(n);
};
function x1(e) {
  e === void 0 && (e = (this && this.translate) || 0);
  const t = this,
    n = t.params,
    { slides: r, rtlTranslate: i, snapGrid: l } = t;
  if (r.length === 0) return;
  typeof r[0].swiperSlideOffset > "u" && t.updateSlidesOffset();
  let a = -e;
  (i && (a = e), (t.visibleSlidesIndexes = []), (t.visibleSlides = []));
  let s = n.spaceBetween;
  typeof s == "string" && s.indexOf("%") >= 0
    ? (s = (parseFloat(s.replace("%", "")) / 100) * t.size)
    : typeof s == "string" && (s = parseFloat(s));
  for (let o = 0; o < r.length; o += 1) {
    const c = r[o];
    let d = c.swiperSlideOffset;
    n.cssMode && n.centeredSlides && (d -= r[0].swiperSlideOffset);
    const p =
        (a + (n.centeredSlides ? t.minTranslate() : 0) - d) /
        (c.swiperSlideSize + s),
      h =
        (a - l[0] + (n.centeredSlides ? t.minTranslate() : 0) - d) /
        (c.swiperSlideSize + s),
      v = -(a - d),
      x = v + t.slidesSizesGrid[o],
      b = v >= 0 && v <= t.size - t.slidesSizesGrid[o],
      N =
        (v >= 0 && v < t.size - 1) ||
        (x > 1 && x <= t.size) ||
        (v <= 0 && x >= t.size);
    (N && (t.visibleSlides.push(c), t.visibleSlidesIndexes.push(o)),
      nf(c, N, n.slideVisibleClass),
      nf(c, b, n.slideFullyVisibleClass),
      (c.progress = i ? -p : p),
      (c.originalProgress = i ? -h : h));
  }
}
function y1(e) {
  const t = this;
  if (typeof e > "u") {
    const d = t.rtlTranslate ? -1 : 1;
    e = (t && t.translate && t.translate * d) || 0;
  }
  const n = t.params,
    r = t.maxTranslate() - t.minTranslate();
  let { progress: i, isBeginning: l, isEnd: a, progressLoop: s } = t;
  const o = l,
    c = a;
  if (r === 0) ((i = 0), (l = !0), (a = !0));
  else {
    i = (e - t.minTranslate()) / r;
    const d = Math.abs(e - t.minTranslate()) < 1,
      p = Math.abs(e - t.maxTranslate()) < 1;
    ((l = d || i <= 0), (a = p || i >= 1), d && (i = 0), p && (i = 1));
  }
  if (n.loop) {
    const d = t.getSlideIndexByData(0),
      p = t.getSlideIndexByData(t.slides.length - 1),
      h = t.slidesGrid[d],
      v = t.slidesGrid[p],
      x = t.slidesGrid[t.slidesGrid.length - 1],
      b = Math.abs(e);
    (b >= h ? (s = (b - h) / x) : (s = (b + x - v) / x), s > 1 && (s -= 1));
  }
  (Object.assign(t, { progress: i, progressLoop: s, isBeginning: l, isEnd: a }),
    (n.watchSlidesProgress || (n.centeredSlides && n.autoHeight)) &&
      t.updateSlidesProgress(e),
    l && !o && t.emit("reachBeginning toEdge"),
    a && !c && t.emit("reachEnd toEdge"),
    ((o && !l) || (c && !a)) && t.emit("fromEdge"),
    t.emit("progress", i));
}
const _s = (e, t, n) => {
  t && !e.classList.contains(n)
    ? e.classList.add(n)
    : !t && e.classList.contains(n) && e.classList.remove(n);
};
function w1() {
  const e = this,
    { slides: t, params: n, slidesEl: r, activeIndex: i } = e,
    l = e.virtual && n.virtual.enabled,
    a = e.grid && n.grid && n.grid.rows > 1,
    s = (p) => Dt(r, `.${n.slideClass}${p}, swiper-slide${p}`)[0];
  let o, c, d;
  if (l)
    if (n.loop) {
      let p = i - e.virtual.slidesBefore;
      (p < 0 && (p = e.virtual.slides.length + p),
        p >= e.virtual.slides.length && (p -= e.virtual.slides.length),
        (o = s(`[data-swiper-slide-index="${p}"]`)));
    } else o = s(`[data-swiper-slide-index="${i}"]`);
  else
    a
      ? ((o = t.find((p) => p.column === i)),
        (d = t.find((p) => p.column === i + 1)),
        (c = t.find((p) => p.column === i - 1)))
      : (o = t[i]);
  (o &&
    (a ||
      ((d = Oy(o, `.${n.slideClass}, swiper-slide`)[0]),
      n.loop && !d && (d = t[0]),
      (c = _y(o, `.${n.slideClass}, swiper-slide`)[0]),
      n.loop && !c === 0 && (c = t[t.length - 1]))),
    t.forEach((p) => {
      (_s(p, p === o, n.slideActiveClass),
        _s(p, p === d, n.slideNextClass),
        _s(p, p === c, n.slidePrevClass));
    }),
    e.emitSlidesClasses());
}
const Al = (e, t) => {
    if (!e || e.destroyed || !e.params) return;
    const n = () => (e.isElement ? "swiper-slide" : `.${e.params.slideClass}`),
      r = t.closest(n());
    if (r) {
      let i = r.querySelector(`.${e.params.lazyPreloaderClass}`);
      (!i &&
        e.isElement &&
        (r.shadowRoot
          ? (i = r.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`))
          : requestAnimationFrame(() => {
              r.shadowRoot &&
                ((i = r.shadowRoot.querySelector(
                  `.${e.params.lazyPreloaderClass}`,
                )),
                i && i.remove());
            })),
        i && i.remove());
    }
  },
  Os = (e, t) => {
    if (!e.slides[t]) return;
    const n = e.slides[t].querySelector('[loading="lazy"]');
    n && n.removeAttribute("loading");
  },
  Fo = (e) => {
    if (!e || e.destroyed || !e.params) return;
    let t = e.params.lazyPreloadPrevNext;
    const n = e.slides.length;
    if (!n || !t || t < 0) return;
    t = Math.min(t, n);
    const r =
        e.params.slidesPerView === "auto"
          ? e.slidesPerViewDynamic()
          : Math.ceil(e.params.slidesPerView),
      i = e.activeIndex;
    if (e.params.grid && e.params.grid.rows > 1) {
      const a = i,
        s = [a - t];
      (s.push(...Array.from({ length: t }).map((o, c) => a + r + c)),
        e.slides.forEach((o, c) => {
          s.includes(o.column) && Os(e, c);
        }));
      return;
    }
    const l = i + r - 1;
    if (e.params.rewind || e.params.loop)
      for (let a = i - t; a <= l + t; a += 1) {
        const s = ((a % n) + n) % n;
        (s < i || s > l) && Os(e, s);
      }
    else
      for (let a = Math.max(i - t, 0); a <= Math.min(l + t, n - 1); a += 1)
        a !== i && (a > l || a < i) && Os(e, a);
  };
function b1(e) {
  const { slidesGrid: t, params: n } = e,
    r = e.rtlTranslate ? e.translate : -e.translate;
  let i;
  for (let l = 0; l < t.length; l += 1)
    typeof t[l + 1] < "u"
      ? r >= t[l] && r < t[l + 1] - (t[l + 1] - t[l]) / 2
        ? (i = l)
        : r >= t[l] && r < t[l + 1] && (i = l + 1)
      : r >= t[l] && (i = l);
  return (n.normalizeSlideIndex && (i < 0 || typeof i > "u") && (i = 0), i);
}
function S1(e) {
  const t = this,
    n = t.rtlTranslate ? t.translate : -t.translate,
    { snapGrid: r, params: i, activeIndex: l, realIndex: a, snapIndex: s } = t;
  let o = e,
    c;
  const d = (v) => {
    let x = v - t.virtual.slidesBefore;
    return (
      x < 0 && (x = t.virtual.slides.length + x),
      x >= t.virtual.slides.length && (x -= t.virtual.slides.length),
      x
    );
  };
  if ((typeof o > "u" && (o = b1(t)), r.indexOf(n) >= 0)) c = r.indexOf(n);
  else {
    const v = Math.min(i.slidesPerGroupSkip, o);
    c = v + Math.floor((o - v) / i.slidesPerGroup);
  }
  if ((c >= r.length && (c = r.length - 1), o === l && !t.params.loop)) {
    c !== s && ((t.snapIndex = c), t.emit("snapIndexChange"));
    return;
  }
  if (o === l && t.params.loop && t.virtual && t.params.virtual.enabled) {
    t.realIndex = d(o);
    return;
  }
  const p = t.grid && i.grid && i.grid.rows > 1;
  let h;
  if (t.virtual && i.virtual.enabled && i.loop) h = d(o);
  else if (p) {
    const v = t.slides.find((b) => b.column === o);
    let x = parseInt(v.getAttribute("data-swiper-slide-index"), 10);
    (Number.isNaN(x) && (x = Math.max(t.slides.indexOf(v), 0)),
      (h = Math.floor(x / i.grid.rows)));
  } else if (t.slides[o]) {
    const v = t.slides[o].getAttribute("data-swiper-slide-index");
    v ? (h = parseInt(v, 10)) : (h = o);
  } else h = o;
  (Object.assign(t, {
    previousSnapIndex: s,
    snapIndex: c,
    previousRealIndex: a,
    realIndex: h,
    previousIndex: l,
    activeIndex: o,
  }),
    t.initialized && Fo(t),
    t.emit("activeIndexChange"),
    t.emit("snapIndexChange"),
    (t.initialized || t.params.runCallbacksOnInit) &&
      (a !== h && t.emit("realIndexChange"), t.emit("slideChange")));
}
function T1(e, t) {
  const n = this,
    r = n.params;
  let i = e.closest(`.${r.slideClass}, swiper-slide`);
  !i &&
    n.isElement &&
    t &&
    t.length > 1 &&
    t.includes(e) &&
    [...t.slice(t.indexOf(e) + 1, t.length)].forEach((s) => {
      !i && s.matches && s.matches(`.${r.slideClass}, swiper-slide`) && (i = s);
    });
  let l = !1,
    a;
  if (i) {
    for (let s = 0; s < n.slides.length; s += 1)
      if (n.slides[s] === i) {
        ((l = !0), (a = s));
        break;
      }
  }
  if (i && l)
    ((n.clickedSlide = i),
      n.virtual && n.params.virtual.enabled
        ? (n.clickedIndex = parseInt(
            i.getAttribute("data-swiper-slide-index"),
            10,
          ))
        : (n.clickedIndex = a));
  else {
    ((n.clickedSlide = void 0), (n.clickedIndex = void 0));
    return;
  }
  r.slideToClickedSlide &&
    n.clickedIndex !== void 0 &&
    n.clickedIndex !== n.activeIndex &&
    n.slideToClickedSlide();
}
var E1 = {
  updateSize: m1,
  updateSlides: h1,
  updateAutoHeight: g1,
  updateSlidesOffset: v1,
  updateSlidesProgress: x1,
  updateProgress: y1,
  updateSlidesClasses: w1,
  updateActiveIndex: S1,
  updateClickedSlide: T1,
};
function j1(e) {
  e === void 0 && (e = this.isHorizontal() ? "x" : "y");
  const t = this,
    { params: n, rtlTranslate: r, translate: i, wrapperEl: l } = t;
  if (n.virtualTranslate) return r ? -i : i;
  if (n.cssMode) return i;
  let a = My(l, e);
  return ((a += t.cssOverflowAdjustment()), r && (a = -a), a || 0);
}
function C1(e, t) {
  const n = this,
    { rtlTranslate: r, params: i, wrapperEl: l, progress: a } = n;
  let s = 0,
    o = 0;
  const c = 0;
  (n.isHorizontal() ? (s = r ? -e : e) : (o = e),
    i.roundLengths && ((s = Math.floor(s)), (o = Math.floor(o))),
    (n.previousTranslate = n.translate),
    (n.translate = n.isHorizontal() ? s : o),
    i.cssMode
      ? (l[n.isHorizontal() ? "scrollLeft" : "scrollTop"] = n.isHorizontal()
          ? -s
          : -o)
      : i.virtualTranslate ||
        (n.isHorizontal()
          ? (s -= n.cssOverflowAdjustment())
          : (o -= n.cssOverflowAdjustment()),
        (l.style.transform = `translate3d(${s}px, ${o}px, ${c}px)`)));
  let d;
  const p = n.maxTranslate() - n.minTranslate();
  (p === 0 ? (d = 0) : (d = (e - n.minTranslate()) / p),
    d !== a && n.updateProgress(e),
    n.emit("setTranslate", n.translate, t));
}
function P1() {
  return -this.snapGrid[0];
}
function k1() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function N1(e, t, n, r, i) {
  (e === void 0 && (e = 0),
    t === void 0 && (t = this.params.speed),
    n === void 0 && (n = !0),
    r === void 0 && (r = !0));
  const l = this,
    { params: a, wrapperEl: s } = l;
  if (l.animating && a.preventInteractionOnTransition) return !1;
  const o = l.minTranslate(),
    c = l.maxTranslate();
  let d;
  if (
    (r && e > o ? (d = o) : r && e < c ? (d = c) : (d = e),
    l.updateProgress(d),
    a.cssMode)
  ) {
    const p = l.isHorizontal();
    if (t === 0) s[p ? "scrollLeft" : "scrollTop"] = -d;
    else {
      if (!l.support.smoothScroll)
        return (
          $m({ swiper: l, targetPosition: -d, side: p ? "left" : "top" }),
          !0
        );
      s.scrollTo({ [p ? "left" : "top"]: -d, behavior: "smooth" });
    }
    return !0;
  }
  return (
    t === 0
      ? (l.setTransition(0),
        l.setTranslate(d),
        n && (l.emit("beforeTransitionStart", t, i), l.emit("transitionEnd")))
      : (l.setTransition(t),
        l.setTranslate(d),
        n && (l.emit("beforeTransitionStart", t, i), l.emit("transitionStart")),
        l.animating ||
          ((l.animating = !0),
          l.onTranslateToWrapperTransitionEnd ||
            (l.onTranslateToWrapperTransitionEnd = function (h) {
              !l ||
                l.destroyed ||
                (h.target === this &&
                  (l.wrapperEl.removeEventListener(
                    "transitionend",
                    l.onTranslateToWrapperTransitionEnd,
                  ),
                  (l.onTranslateToWrapperTransitionEnd = null),
                  delete l.onTranslateToWrapperTransitionEnd,
                  (l.animating = !1),
                  n && l.emit("transitionEnd")));
            }),
          l.wrapperEl.addEventListener(
            "transitionend",
            l.onTranslateToWrapperTransitionEnd,
          ))),
    !0
  );
}
var M1 = {
  getTranslate: j1,
  setTranslate: C1,
  minTranslate: P1,
  maxTranslate: k1,
  translateTo: N1,
};
function L1(e, t) {
  const n = this;
  (n.params.cssMode ||
    ((n.wrapperEl.style.transitionDuration = `${e}ms`),
    (n.wrapperEl.style.transitionDelay = e === 0 ? "0ms" : "")),
    n.emit("setTransition", e, t));
}
function ih(e) {
  let { swiper: t, runCallbacks: n, direction: r, step: i } = e;
  const { activeIndex: l, previousIndex: a } = t;
  let s = r;
  (s || (l > a ? (s = "next") : l < a ? (s = "prev") : (s = "reset")),
    t.emit(`transition${i}`),
    n && s === "reset"
      ? t.emit(`slideResetTransition${i}`)
      : n &&
        l !== a &&
        (t.emit(`slideChangeTransition${i}`),
        s === "next"
          ? t.emit(`slideNextTransition${i}`)
          : t.emit(`slidePrevTransition${i}`)));
}
function D1(e, t) {
  e === void 0 && (e = !0);
  const n = this,
    { params: r } = n;
  r.cssMode ||
    (r.autoHeight && n.updateAutoHeight(),
    ih({ swiper: n, runCallbacks: e, direction: t, step: "Start" }));
}
function R1(e, t) {
  e === void 0 && (e = !0);
  const n = this,
    { params: r } = n;
  ((n.animating = !1),
    !r.cssMode &&
      (n.setTransition(0),
      ih({ swiper: n, runCallbacks: e, direction: t, step: "End" })));
}
var _1 = { setTransition: L1, transitionStart: D1, transitionEnd: R1 };
function O1(e, t, n, r, i) {
  (e === void 0 && (e = 0),
    n === void 0 && (n = !0),
    typeof e == "string" && (e = parseInt(e, 10)));
  const l = this;
  let a = e;
  a < 0 && (a = 0);
  const {
    params: s,
    snapGrid: o,
    slidesGrid: c,
    previousIndex: d,
    activeIndex: p,
    rtlTranslate: h,
    wrapperEl: v,
    enabled: x,
  } = l;
  if (
    (!x && !r && !i) ||
    l.destroyed ||
    (l.animating && s.preventInteractionOnTransition)
  )
    return !1;
  typeof t > "u" && (t = l.params.speed);
  const b = Math.min(l.params.slidesPerGroupSkip, a);
  let N = b + Math.floor((a - b) / l.params.slidesPerGroup);
  N >= o.length && (N = o.length - 1);
  const g = -o[N];
  if (s.normalizeSlideIndex)
    for (let y = 0; y < c.length; y += 1) {
      const C = -Math.floor(g * 100),
        M = Math.floor(c[y] * 100),
        P = Math.floor(c[y + 1] * 100);
      typeof c[y + 1] < "u"
        ? C >= M && C < P - (P - M) / 2
          ? (a = y)
          : C >= M && C < P && (a = y + 1)
        : C >= M && (a = y);
    }
  if (
    l.initialized &&
    a !== p &&
    ((!l.allowSlideNext &&
      (h
        ? g > l.translate && g > l.minTranslate()
        : g < l.translate && g < l.minTranslate())) ||
      (!l.allowSlidePrev &&
        g > l.translate &&
        g > l.maxTranslate() &&
        (p || 0) !== a))
  )
    return !1;
  (a !== (d || 0) && n && l.emit("beforeSlideChangeStart"),
    l.updateProgress(g));
  let f;
  a > p ? (f = "next") : a < p ? (f = "prev") : (f = "reset");
  const m = l.virtual && l.params.virtual.enabled;
  if (!(m && i) && ((h && -g === l.translate) || (!h && g === l.translate)))
    return (
      l.updateActiveIndex(a),
      s.autoHeight && l.updateAutoHeight(),
      l.updateSlidesClasses(),
      s.effect !== "slide" && l.setTranslate(g),
      f !== "reset" && (l.transitionStart(n, f), l.transitionEnd(n, f)),
      !1
    );
  if (s.cssMode) {
    const y = l.isHorizontal(),
      C = h ? g : -g;
    if (t === 0)
      (m &&
        ((l.wrapperEl.style.scrollSnapType = "none"),
        (l._immediateVirtual = !0)),
        m && !l._cssModeVirtualInitialSet && l.params.initialSlide > 0
          ? ((l._cssModeVirtualInitialSet = !0),
            requestAnimationFrame(() => {
              v[y ? "scrollLeft" : "scrollTop"] = C;
            }))
          : (v[y ? "scrollLeft" : "scrollTop"] = C),
        m &&
          requestAnimationFrame(() => {
            ((l.wrapperEl.style.scrollSnapType = ""),
              (l._immediateVirtual = !1));
          }));
    else {
      if (!l.support.smoothScroll)
        return (
          $m({ swiper: l, targetPosition: C, side: y ? "left" : "top" }),
          !0
        );
      v.scrollTo({ [y ? "left" : "top"]: C, behavior: "smooth" });
    }
    return !0;
  }
  const L = rh().isSafari;
  return (
    m && !i && L && l.isElement && l.virtual.update(!1, !1, a),
    l.setTransition(t),
    l.setTranslate(g),
    l.updateActiveIndex(a),
    l.updateSlidesClasses(),
    l.emit("beforeTransitionStart", t, r),
    l.transitionStart(n, f),
    t === 0
      ? l.transitionEnd(n, f)
      : l.animating ||
        ((l.animating = !0),
        l.onSlideToWrapperTransitionEnd ||
          (l.onSlideToWrapperTransitionEnd = function (C) {
            !l ||
              l.destroyed ||
              (C.target === this &&
                (l.wrapperEl.removeEventListener(
                  "transitionend",
                  l.onSlideToWrapperTransitionEnd,
                ),
                (l.onSlideToWrapperTransitionEnd = null),
                delete l.onSlideToWrapperTransitionEnd,
                l.transitionEnd(n, f)));
          }),
        l.wrapperEl.addEventListener(
          "transitionend",
          l.onSlideToWrapperTransitionEnd,
        )),
    !0
  );
}
function I1(e, t, n, r) {
  (e === void 0 && (e = 0),
    n === void 0 && (n = !0),
    typeof e == "string" && (e = parseInt(e, 10)));
  const i = this;
  if (i.destroyed) return;
  typeof t > "u" && (t = i.params.speed);
  const l = i.grid && i.params.grid && i.params.grid.rows > 1;
  let a = e;
  if (i.params.loop)
    if (i.virtual && i.params.virtual.enabled) a = a + i.virtual.slidesBefore;
    else {
      let s;
      if (l) {
        const h = a * i.params.grid.rows;
        s = i.slides.find(
          (v) => v.getAttribute("data-swiper-slide-index") * 1 === h,
        ).column;
      } else s = i.getSlideIndexByData(a);
      const o = l
          ? Math.ceil(i.slides.length / i.params.grid.rows)
          : i.slides.length,
        { centeredSlides: c } = i.params;
      let d = i.params.slidesPerView;
      d === "auto"
        ? (d = i.slidesPerViewDynamic())
        : ((d = Math.ceil(parseFloat(i.params.slidesPerView, 10))),
          c && d % 2 === 0 && (d = d + 1));
      let p = o - s < d;
      if (
        (c && (p = p || s < Math.ceil(d / 2)),
        r && c && i.params.slidesPerView !== "auto" && !l && (p = !1),
        p)
      ) {
        const h = c
          ? s < i.activeIndex
            ? "prev"
            : "next"
          : s - i.activeIndex - 1 < i.params.slidesPerView
            ? "next"
            : "prev";
        i.loopFix({
          direction: h,
          slideTo: !0,
          activeSlideIndex: h === "next" ? s + 1 : s - o + 1,
          slideRealIndex: h === "next" ? i.realIndex : void 0,
        });
      }
      if (l) {
        const h = a * i.params.grid.rows;
        a = i.slides.find(
          (v) => v.getAttribute("data-swiper-slide-index") * 1 === h,
        ).column;
      } else a = i.getSlideIndexByData(a);
    }
  return (
    requestAnimationFrame(() => {
      i.slideTo(a, t, n, r);
    }),
    i
  );
}
function A1(e, t, n) {
  t === void 0 && (t = !0);
  const r = this,
    { enabled: i, params: l, animating: a } = r;
  if (!i || r.destroyed) return r;
  typeof e > "u" && (e = r.params.speed);
  let s = l.slidesPerGroup;
  l.slidesPerView === "auto" &&
    l.slidesPerGroup === 1 &&
    l.slidesPerGroupAuto &&
    (s = Math.max(r.slidesPerViewDynamic("current", !0), 1));
  const o = r.activeIndex < l.slidesPerGroupSkip ? 1 : s,
    c = r.virtual && l.virtual.enabled;
  if (l.loop) {
    if (a && !c && l.loopPreventsSliding) return !1;
    if (
      (r.loopFix({ direction: "next" }),
      (r._clientLeft = r.wrapperEl.clientLeft),
      r.activeIndex === r.slides.length - 1 && l.cssMode)
    )
      return (
        requestAnimationFrame(() => {
          r.slideTo(r.activeIndex + o, e, t, n);
        }),
        !0
      );
  }
  return l.rewind && r.isEnd
    ? r.slideTo(0, e, t, n)
    : r.slideTo(r.activeIndex + o, e, t, n);
}
function z1(e, t, n) {
  t === void 0 && (t = !0);
  const r = this,
    {
      params: i,
      snapGrid: l,
      slidesGrid: a,
      rtlTranslate: s,
      enabled: o,
      animating: c,
    } = r;
  if (!o || r.destroyed) return r;
  typeof e > "u" && (e = r.params.speed);
  const d = r.virtual && i.virtual.enabled;
  if (i.loop) {
    if (c && !d && i.loopPreventsSliding) return !1;
    (r.loopFix({ direction: "prev" }),
      (r._clientLeft = r.wrapperEl.clientLeft));
  }
  const p = s ? r.translate : -r.translate;
  function h(f) {
    return f < 0 ? -Math.floor(Math.abs(f)) : Math.floor(f);
  }
  const v = h(p),
    x = l.map((f) => h(f)),
    b = i.freeMode && i.freeMode.enabled;
  let N = l[x.indexOf(v) - 1];
  if (typeof N > "u" && (i.cssMode || b)) {
    let f;
    (l.forEach((m, w) => {
      v >= m && (f = w);
    }),
      typeof f < "u" && (N = b ? l[f] : l[f > 0 ? f - 1 : f]));
  }
  let g = 0;
  if (
    (typeof N < "u" &&
      ((g = a.indexOf(N)),
      g < 0 && (g = r.activeIndex - 1),
      i.slidesPerView === "auto" &&
        i.slidesPerGroup === 1 &&
        i.slidesPerGroupAuto &&
        ((g = g - r.slidesPerViewDynamic("previous", !0) + 1),
        (g = Math.max(g, 0)))),
    i.rewind && r.isBeginning)
  ) {
    const f =
      r.params.virtual && r.params.virtual.enabled && r.virtual
        ? r.virtual.slides.length - 1
        : r.slides.length - 1;
    return r.slideTo(f, e, t, n);
  } else if (i.loop && r.activeIndex === 0 && i.cssMode)
    return (
      requestAnimationFrame(() => {
        r.slideTo(g, e, t, n);
      }),
      !0
    );
  return r.slideTo(g, e, t, n);
}
function F1(e, t, n) {
  t === void 0 && (t = !0);
  const r = this;
  if (!r.destroyed)
    return (
      typeof e > "u" && (e = r.params.speed),
      r.slideTo(r.activeIndex, e, t, n)
    );
}
function B1(e, t, n, r) {
  (t === void 0 && (t = !0), r === void 0 && (r = 0.5));
  const i = this;
  if (i.destroyed) return;
  typeof e > "u" && (e = i.params.speed);
  let l = i.activeIndex;
  const a = Math.min(i.params.slidesPerGroupSkip, l),
    s = a + Math.floor((l - a) / i.params.slidesPerGroup),
    o = i.rtlTranslate ? i.translate : -i.translate;
  if (o >= i.snapGrid[s]) {
    const c = i.snapGrid[s],
      d = i.snapGrid[s + 1];
    o - c > (d - c) * r && (l += i.params.slidesPerGroup);
  } else {
    const c = i.snapGrid[s - 1],
      d = i.snapGrid[s];
    o - c <= (d - c) * r && (l -= i.params.slidesPerGroup);
  }
  return (
    (l = Math.max(l, 0)),
    (l = Math.min(l, i.slidesGrid.length - 1)),
    i.slideTo(l, e, t, n)
  );
}
function U1() {
  const e = this;
  if (e.destroyed) return;
  const { params: t, slidesEl: n } = e,
    r = t.slidesPerView === "auto" ? e.slidesPerViewDynamic() : t.slidesPerView;
  let i = e.getSlideIndexWhenGrid(e.clickedIndex),
    l;
  const a = e.isElement ? "swiper-slide" : `.${t.slideClass}`,
    s = e.grid && e.params.grid && e.params.grid.rows > 1;
  if (t.loop) {
    if (e.animating) return;
    ((l = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10)),
      t.centeredSlides
        ? e.slideToLoop(l)
        : i >
            (s
              ? (e.slides.length - r) / 2 - (e.params.grid.rows - 1)
              : e.slides.length - r)
          ? (e.loopFix(),
            (i = e.getSlideIndex(
              Dt(n, `${a}[data-swiper-slide-index="${l}"]`)[0],
            )),
            Wm(() => {
              e.slideTo(i);
            }))
          : e.slideTo(i));
  } else e.slideTo(i);
}
var H1 = {
  slideTo: O1,
  slideToLoop: I1,
  slideNext: A1,
  slidePrev: z1,
  slideReset: F1,
  slideToClosest: B1,
  slideToClickedSlide: U1,
};
function V1(e, t) {
  const n = this,
    { params: r, slidesEl: i } = n;
  if (!r.loop || (n.virtual && n.params.virtual.enabled)) return;
  const l = () => {
      Dt(i, `.${r.slideClass}, swiper-slide`).forEach((v, x) => {
        v.setAttribute("data-swiper-slide-index", x);
      });
    },
    a = () => {
      const h = Dt(i, `.${r.slideBlankClass}`);
      (h.forEach((v) => {
        v.remove();
      }),
        h.length > 0 && (n.recalcSlides(), n.updateSlides()));
    },
    s = n.grid && r.grid && r.grid.rows > 1;
  r.loopAddBlankSlides && (r.slidesPerGroup > 1 || s) && a();
  const o = r.slidesPerGroup * (s ? r.grid.rows : 1),
    c = n.slides.length % o !== 0,
    d = s && n.slides.length % r.grid.rows !== 0,
    p = (h) => {
      for (let v = 0; v < h; v += 1) {
        const x = n.isElement
          ? va("swiper-slide", [r.slideBlankClass])
          : va("div", [r.slideClass, r.slideBlankClass]);
        n.slidesEl.append(x);
      }
    };
  if (c) {
    if (r.loopAddBlankSlides) {
      const h = o - (n.slides.length % o);
      (p(h), n.recalcSlides(), n.updateSlides());
    } else
      ga(
        "Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)",
      );
    l();
  } else if (d) {
    if (r.loopAddBlankSlides) {
      const h = r.grid.rows - (n.slides.length % r.grid.rows);
      (p(h), n.recalcSlides(), n.updateSlides());
    } else
      ga(
        "Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)",
      );
    l();
  } else l();
  n.loopFix({
    slideRealIndex: e,
    direction: r.centeredSlides ? void 0 : "next",
    initial: t,
  });
}
function W1(e) {
  let {
    slideRealIndex: t,
    slideTo: n = !0,
    direction: r,
    setTranslate: i,
    activeSlideIndex: l,
    initial: a,
    byController: s,
    byMousewheel: o,
  } = e === void 0 ? {} : e;
  const c = this;
  if (!c.params.loop) return;
  c.emit("beforeLoopFix");
  const {
      slides: d,
      allowSlidePrev: p,
      allowSlideNext: h,
      slidesEl: v,
      params: x,
    } = c,
    { centeredSlides: b, initialSlide: N } = x;
  if (
    ((c.allowSlidePrev = !0),
    (c.allowSlideNext = !0),
    c.virtual && x.virtual.enabled)
  ) {
    (n &&
      (!x.centeredSlides && c.snapIndex === 0
        ? c.slideTo(c.virtual.slides.length, 0, !1, !0)
        : x.centeredSlides && c.snapIndex < x.slidesPerView
          ? c.slideTo(c.virtual.slides.length + c.snapIndex, 0, !1, !0)
          : c.snapIndex === c.snapGrid.length - 1 &&
            c.slideTo(c.virtual.slidesBefore, 0, !1, !0)),
      (c.allowSlidePrev = p),
      (c.allowSlideNext = h),
      c.emit("loopFix"));
    return;
  }
  let g = x.slidesPerView;
  g === "auto"
    ? (g = c.slidesPerViewDynamic())
    : ((g = Math.ceil(parseFloat(x.slidesPerView, 10))),
      b && g % 2 === 0 && (g = g + 1));
  const f = x.slidesPerGroupAuto ? g : x.slidesPerGroup;
  let m = b ? Math.max(f, Math.ceil(g / 2)) : f;
  (m % f !== 0 && (m += f - (m % f)),
    (m += x.loopAdditionalSlides),
    (c.loopedSlides = m));
  const w = c.grid && x.grid && x.grid.rows > 1;
  d.length < g + m || (c.params.effect === "cards" && d.length < g + m * 2)
    ? ga(
        "Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters",
      )
    : w &&
      x.grid.fill === "row" &&
      ga(
        "Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`",
      );
  const T = [],
    L = [],
    y = w ? Math.ceil(d.length / x.grid.rows) : d.length,
    C = a && y - N < g && !b;
  let M = C ? N : c.activeIndex;
  typeof l > "u"
    ? (l = c.getSlideIndex(
        d.find((K) => K.classList.contains(x.slideActiveClass)),
      ))
    : (M = l);
  const P = r === "next" || !r,
    _ = r === "prev" || !r;
  let F = 0,
    D = 0;
  const W = (w ? d[l].column : l) + (b && typeof i > "u" ? -g / 2 + 0.5 : 0);
  if (W < m) {
    F = Math.max(m - W, f);
    for (let K = 0; K < m - W; K += 1) {
      const Z = K - Math.floor(K / y) * y;
      if (w) {
        const R = y - Z - 1;
        for (let z = d.length - 1; z >= 0; z -= 1)
          d[z].column === R && T.push(z);
      } else T.push(y - Z - 1);
    }
  } else if (W + g > y - m) {
    ((D = Math.max(W - (y - m * 2), f)), C && (D = Math.max(D, g - y + N + 1)));
    for (let K = 0; K < D; K += 1) {
      const Z = K - Math.floor(K / y) * y;
      w
        ? d.forEach((R, z) => {
            R.column === Z && L.push(z);
          })
        : L.push(Z);
    }
  }
  if (
    ((c.__preventObserver__ = !0),
    requestAnimationFrame(() => {
      c.__preventObserver__ = !1;
    }),
    c.params.effect === "cards" &&
      d.length < g + m * 2 &&
      (L.includes(l) && L.splice(L.indexOf(l), 1),
      T.includes(l) && T.splice(T.indexOf(l), 1)),
    _ &&
      T.forEach((K) => {
        ((d[K].swiperLoopMoveDOM = !0),
          v.prepend(d[K]),
          (d[K].swiperLoopMoveDOM = !1));
      }),
    P &&
      L.forEach((K) => {
        ((d[K].swiperLoopMoveDOM = !0),
          v.append(d[K]),
          (d[K].swiperLoopMoveDOM = !1));
      }),
    c.recalcSlides(),
    x.slidesPerView === "auto"
      ? c.updateSlides()
      : w &&
        ((T.length > 0 && _) || (L.length > 0 && P)) &&
        c.slides.forEach((K, Z) => {
          c.grid.updateSlide(Z, K, c.slides);
        }),
    x.watchSlidesProgress && c.updateSlidesOffset(),
    n)
  ) {
    if (T.length > 0 && _) {
      if (typeof t > "u") {
        const K = c.slidesGrid[M],
          R = c.slidesGrid[M + F] - K;
        o
          ? c.setTranslate(c.translate - R)
          : (c.slideTo(M + Math.ceil(F), 0, !1, !0),
            i &&
              ((c.touchEventsData.startTranslate =
                c.touchEventsData.startTranslate - R),
              (c.touchEventsData.currentTranslate =
                c.touchEventsData.currentTranslate - R)));
      } else if (i) {
        const K = w ? T.length / x.grid.rows : T.length;
        (c.slideTo(c.activeIndex + K, 0, !1, !0),
          (c.touchEventsData.currentTranslate = c.translate));
      }
    } else if (L.length > 0 && P)
      if (typeof t > "u") {
        const K = c.slidesGrid[M],
          R = c.slidesGrid[M - D] - K;
        o
          ? c.setTranslate(c.translate - R)
          : (c.slideTo(M - D, 0, !1, !0),
            i &&
              ((c.touchEventsData.startTranslate =
                c.touchEventsData.startTranslate - R),
              (c.touchEventsData.currentTranslate =
                c.touchEventsData.currentTranslate - R)));
      } else {
        const K = w ? L.length / x.grid.rows : L.length;
        c.slideTo(c.activeIndex - K, 0, !1, !0);
      }
  }
  if (
    ((c.allowSlidePrev = p),
    (c.allowSlideNext = h),
    c.controller && c.controller.control && !s)
  ) {
    const K = {
      slideRealIndex: t,
      direction: r,
      setTranslate: i,
      activeSlideIndex: l,
      byController: !0,
    };
    Array.isArray(c.controller.control)
      ? c.controller.control.forEach((Z) => {
          !Z.destroyed &&
            Z.params.loop &&
            Z.loopFix({
              ...K,
              slideTo: Z.params.slidesPerView === x.slidesPerView ? n : !1,
            });
        })
      : c.controller.control instanceof c.constructor &&
        c.controller.control.params.loop &&
        c.controller.control.loopFix({
          ...K,
          slideTo:
            c.controller.control.params.slidesPerView === x.slidesPerView
              ? n
              : !1,
        });
  }
  c.emit("loopFix");
}
function $1() {
  const e = this,
    { params: t, slidesEl: n } = e;
  if (!t.loop || !n || (e.virtual && e.params.virtual.enabled)) return;
  e.recalcSlides();
  const r = [];
  (e.slides.forEach((i) => {
    const l =
      typeof i.swiperSlideIndex > "u"
        ? i.getAttribute("data-swiper-slide-index") * 1
        : i.swiperSlideIndex;
    r[l] = i;
  }),
    e.slides.forEach((i) => {
      i.removeAttribute("data-swiper-slide-index");
    }),
    r.forEach((i) => {
      n.append(i);
    }),
    e.recalcSlides(),
    e.slideTo(e.realIndex, 0));
}
var G1 = { loopCreate: V1, loopFix: W1, loopDestroy: $1 };
function K1(e) {
  const t = this;
  if (
    !t.params.simulateTouch ||
    (t.params.watchOverflow && t.isLocked) ||
    t.params.cssMode
  )
    return;
  const n = t.params.touchEventsTarget === "container" ? t.el : t.wrapperEl;
  (t.isElement && (t.__preventObserver__ = !0),
    (n.style.cursor = "move"),
    (n.style.cursor = e ? "grabbing" : "grab"),
    t.isElement &&
      requestAnimationFrame(() => {
        t.__preventObserver__ = !1;
      }));
}
function Y1() {
  const e = this;
  (e.params.watchOverflow && e.isLocked) ||
    e.params.cssMode ||
    (e.isElement && (e.__preventObserver__ = !0),
    (e[
      e.params.touchEventsTarget === "container" ? "el" : "wrapperEl"
    ].style.cursor = ""),
    e.isElement &&
      requestAnimationFrame(() => {
        e.__preventObserver__ = !1;
      }));
}
var Q1 = { setGrabCursor: K1, unsetGrabCursor: Y1 };
function X1(e, t) {
  t === void 0 && (t = this);
  function n(r) {
    if (!r || r === tr() || r === Je()) return null;
    r.assignedSlot && (r = r.assignedSlot);
    const i = r.closest(e);
    return !i && !r.getRootNode ? null : i || n(r.getRootNode().host);
  }
  return n(t);
}
function rf(e, t, n) {
  const r = Je(),
    { params: i } = e,
    l = i.edgeSwipeDetection,
    a = i.edgeSwipeThreshold;
  return l && (n <= a || n >= r.innerWidth - a)
    ? l === "prevent"
      ? (t.preventDefault(), !0)
      : !1
    : !0;
}
function q1(e) {
  const t = this,
    n = tr();
  let r = e;
  r.originalEvent && (r = r.originalEvent);
  const i = t.touchEventsData;
  if (r.type === "pointerdown") {
    if (i.pointerId !== null && i.pointerId !== r.pointerId) return;
    i.pointerId = r.pointerId;
  } else
    r.type === "touchstart" &&
      r.targetTouches.length === 1 &&
      (i.touchId = r.targetTouches[0].identifier);
  if (r.type === "touchstart") {
    rf(t, r, r.targetTouches[0].pageX);
    return;
  }
  const { params: l, touches: a, enabled: s } = t;
  if (
    !s ||
    (!l.simulateTouch && r.pointerType === "mouse") ||
    (t.animating && l.preventInteractionOnTransition)
  )
    return;
  !t.animating && l.cssMode && l.loop && t.loopFix();
  let o = r.target;
  if (
    (l.touchEventsTarget === "wrapper" && !Ry(o, t.wrapperEl)) ||
    ("which" in r && r.which === 3) ||
    ("button" in r && r.button > 0) ||
    (i.isTouched && i.isMoved)
  )
    return;
  const c = !!l.noSwipingClass && l.noSwipingClass !== "",
    d = r.composedPath ? r.composedPath() : r.path;
  c && r.target && r.target.shadowRoot && d && (o = d[0]);
  const p = l.noSwipingSelector ? l.noSwipingSelector : `.${l.noSwipingClass}`,
    h = !!(r.target && r.target.shadowRoot);
  if (l.noSwiping && (h ? X1(p, o) : o.closest(p))) {
    t.allowClick = !0;
    return;
  }
  if (l.swipeHandler && !o.closest(l.swipeHandler)) return;
  ((a.currentX = r.pageX), (a.currentY = r.pageY));
  const v = a.currentX,
    x = a.currentY;
  if (!rf(t, r, v)) return;
  (Object.assign(i, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0,
  }),
    (a.startX = v),
    (a.startY = x),
    (i.touchStartTime = ha()),
    (t.allowClick = !0),
    t.updateSize(),
    (t.swipeDirection = void 0),
    l.threshold > 0 && (i.allowThresholdMove = !1));
  let b = !0;
  (o.matches(i.focusableElements) &&
    ((b = !1), o.nodeName === "SELECT" && (i.isTouched = !1)),
    n.activeElement &&
      n.activeElement.matches(i.focusableElements) &&
      n.activeElement !== o &&
      (r.pointerType === "mouse" ||
        (r.pointerType !== "mouse" && !o.matches(i.focusableElements))) &&
      n.activeElement.blur());
  const N = b && t.allowTouchMove && l.touchStartPreventDefault;
  ((l.touchStartForcePreventDefault || N) &&
    !o.isContentEditable &&
    r.preventDefault(),
    l.freeMode &&
      l.freeMode.enabled &&
      t.freeMode &&
      t.animating &&
      !l.cssMode &&
      t.freeMode.onTouchStart(),
    t.emit("touchStart", r));
}
function J1(e) {
  const t = tr(),
    n = this,
    r = n.touchEventsData,
    { params: i, touches: l, rtlTranslate: a, enabled: s } = n;
  if (!s || (!i.simulateTouch && e.pointerType === "mouse")) return;
  let o = e;
  if (
    (o.originalEvent && (o = o.originalEvent),
    o.type === "pointermove" &&
      (r.touchId !== null || o.pointerId !== r.pointerId))
  )
    return;
  let c;
  if (o.type === "touchmove") {
    if (
      ((c = [...o.changedTouches].find((T) => T.identifier === r.touchId)),
      !c || c.identifier !== r.touchId)
    )
      return;
  } else c = o;
  if (!r.isTouched) {
    r.startMoving && r.isScrolling && n.emit("touchMoveOpposite", o);
    return;
  }
  const d = c.pageX,
    p = c.pageY;
  if (o.preventedByNestedSwiper) {
    ((l.startX = d), (l.startY = p));
    return;
  }
  if (!n.allowTouchMove) {
    (o.target.matches(r.focusableElements) || (n.allowClick = !1),
      r.isTouched &&
        (Object.assign(l, { startX: d, startY: p, currentX: d, currentY: p }),
        (r.touchStartTime = ha())));
    return;
  }
  if (i.touchReleaseOnEdges && !i.loop)
    if (n.isVertical()) {
      if (
        (p < l.startY && n.translate <= n.maxTranslate()) ||
        (p > l.startY && n.translate >= n.minTranslate())
      ) {
        ((r.isTouched = !1), (r.isMoved = !1));
        return;
      }
    } else {
      if (
        a &&
        ((d > l.startX && -n.translate <= n.maxTranslate()) ||
          (d < l.startX && -n.translate >= n.minTranslate()))
      )
        return;
      if (
        !a &&
        ((d < l.startX && n.translate <= n.maxTranslate()) ||
          (d > l.startX && n.translate >= n.minTranslate()))
      )
        return;
    }
  if (
    (t.activeElement &&
      t.activeElement.matches(r.focusableElements) &&
      t.activeElement !== o.target &&
      o.pointerType !== "mouse" &&
      t.activeElement.blur(),
    t.activeElement &&
      o.target === t.activeElement &&
      o.target.matches(r.focusableElements))
  ) {
    ((r.isMoved = !0), (n.allowClick = !1));
    return;
  }
  (r.allowTouchCallbacks && n.emit("touchMove", o),
    (l.previousX = l.currentX),
    (l.previousY = l.currentY),
    (l.currentX = d),
    (l.currentY = p));
  const h = l.currentX - l.startX,
    v = l.currentY - l.startY;
  if (n.params.threshold && Math.sqrt(h ** 2 + v ** 2) < n.params.threshold)
    return;
  if (typeof r.isScrolling > "u") {
    let T;
    (n.isHorizontal() && l.currentY === l.startY) ||
    (n.isVertical() && l.currentX === l.startX)
      ? (r.isScrolling = !1)
      : h * h + v * v >= 25 &&
        ((T = (Math.atan2(Math.abs(v), Math.abs(h)) * 180) / Math.PI),
        (r.isScrolling = n.isHorizontal()
          ? T > i.touchAngle
          : 90 - T > i.touchAngle));
  }
  if (
    (r.isScrolling && n.emit("touchMoveOpposite", o),
    typeof r.startMoving > "u" &&
      (l.currentX !== l.startX || l.currentY !== l.startY) &&
      (r.startMoving = !0),
    r.isScrolling ||
      (o.type === "touchmove" && r.preventTouchMoveFromPointerMove))
  ) {
    r.isTouched = !1;
    return;
  }
  if (!r.startMoving) return;
  ((n.allowClick = !1),
    !i.cssMode && o.cancelable && o.preventDefault(),
    i.touchMoveStopPropagation && !i.nested && o.stopPropagation());
  let x = n.isHorizontal() ? h : v,
    b = n.isHorizontal() ? l.currentX - l.previousX : l.currentY - l.previousY;
  (i.oneWayMovement &&
    ((x = Math.abs(x) * (a ? 1 : -1)), (b = Math.abs(b) * (a ? 1 : -1))),
    (l.diff = x),
    (x *= i.touchRatio),
    a && ((x = -x), (b = -b)));
  const N = n.touchesDirection;
  ((n.swipeDirection = x > 0 ? "prev" : "next"),
    (n.touchesDirection = b > 0 ? "prev" : "next"));
  const g = n.params.loop && !i.cssMode,
    f =
      (n.touchesDirection === "next" && n.allowSlideNext) ||
      (n.touchesDirection === "prev" && n.allowSlidePrev);
  if (!r.isMoved) {
    if (
      (g && f && n.loopFix({ direction: n.swipeDirection }),
      (r.startTranslate = n.getTranslate()),
      n.setTransition(0),
      n.animating)
    ) {
      const T = new window.CustomEvent("transitionend", {
        bubbles: !0,
        cancelable: !0,
        detail: { bySwiperTouchMove: !0 },
      });
      n.wrapperEl.dispatchEvent(T);
    }
    ((r.allowMomentumBounce = !1),
      i.grabCursor &&
        (n.allowSlideNext === !0 || n.allowSlidePrev === !0) &&
        n.setGrabCursor(!0),
      n.emit("sliderFirstMove", o));
  }
  if (
    (new Date().getTime(),
    i._loopSwapReset !== !1 &&
      r.isMoved &&
      r.allowThresholdMove &&
      N !== n.touchesDirection &&
      g &&
      f &&
      Math.abs(x) >= 1)
  ) {
    (Object.assign(l, {
      startX: d,
      startY: p,
      currentX: d,
      currentY: p,
      startTranslate: r.currentTranslate,
    }),
      (r.loopSwapReset = !0),
      (r.startTranslate = r.currentTranslate));
    return;
  }
  (n.emit("sliderMove", o),
    (r.isMoved = !0),
    (r.currentTranslate = x + r.startTranslate));
  let m = !0,
    w = i.resistanceRatio;
  if (
    (i.touchReleaseOnEdges && (w = 0),
    x > 0
      ? (g &&
          f &&
          r.allowThresholdMove &&
          r.currentTranslate >
            (i.centeredSlides
              ? n.minTranslate() -
                n.slidesSizesGrid[n.activeIndex + 1] -
                (i.slidesPerView !== "auto" &&
                n.slides.length - i.slidesPerView >= 2
                  ? n.slidesSizesGrid[n.activeIndex + 1] + n.params.spaceBetween
                  : 0) -
                n.params.spaceBetween
              : n.minTranslate()) &&
          n.loopFix({
            direction: "prev",
            setTranslate: !0,
            activeSlideIndex: 0,
          }),
        r.currentTranslate > n.minTranslate() &&
          ((m = !1),
          i.resistance &&
            (r.currentTranslate =
              n.minTranslate() -
              1 +
              (-n.minTranslate() + r.startTranslate + x) ** w)))
      : x < 0 &&
        (g &&
          f &&
          r.allowThresholdMove &&
          r.currentTranslate <
            (i.centeredSlides
              ? n.maxTranslate() +
                n.slidesSizesGrid[n.slidesSizesGrid.length - 1] +
                n.params.spaceBetween +
                (i.slidesPerView !== "auto" &&
                n.slides.length - i.slidesPerView >= 2
                  ? n.slidesSizesGrid[n.slidesSizesGrid.length - 1] +
                    n.params.spaceBetween
                  : 0)
              : n.maxTranslate()) &&
          n.loopFix({
            direction: "next",
            setTranslate: !0,
            activeSlideIndex:
              n.slides.length -
              (i.slidesPerView === "auto"
                ? n.slidesPerViewDynamic()
                : Math.ceil(parseFloat(i.slidesPerView, 10))),
          }),
        r.currentTranslate < n.maxTranslate() &&
          ((m = !1),
          i.resistance &&
            (r.currentTranslate =
              n.maxTranslate() +
              1 -
              (n.maxTranslate() - r.startTranslate - x) ** w))),
    m && (o.preventedByNestedSwiper = !0),
    !n.allowSlideNext &&
      n.swipeDirection === "next" &&
      r.currentTranslate < r.startTranslate &&
      (r.currentTranslate = r.startTranslate),
    !n.allowSlidePrev &&
      n.swipeDirection === "prev" &&
      r.currentTranslate > r.startTranslate &&
      (r.currentTranslate = r.startTranslate),
    !n.allowSlidePrev &&
      !n.allowSlideNext &&
      (r.currentTranslate = r.startTranslate),
    i.threshold > 0)
  )
    if (Math.abs(x) > i.threshold || r.allowThresholdMove) {
      if (!r.allowThresholdMove) {
        ((r.allowThresholdMove = !0),
          (l.startX = l.currentX),
          (l.startY = l.currentY),
          (r.currentTranslate = r.startTranslate),
          (l.diff = n.isHorizontal()
            ? l.currentX - l.startX
            : l.currentY - l.startY));
        return;
      }
    } else {
      r.currentTranslate = r.startTranslate;
      return;
    }
  !i.followFinger ||
    i.cssMode ||
    (((i.freeMode && i.freeMode.enabled && n.freeMode) ||
      i.watchSlidesProgress) &&
      (n.updateActiveIndex(), n.updateSlidesClasses()),
    i.freeMode && i.freeMode.enabled && n.freeMode && n.freeMode.onTouchMove(),
    n.updateProgress(r.currentTranslate),
    n.setTranslate(r.currentTranslate));
}
function Z1(e) {
  const t = this,
    n = t.touchEventsData;
  let r = e;
  r.originalEvent && (r = r.originalEvent);
  let i;
  if (r.type === "touchend" || r.type === "touchcancel") {
    if (
      ((i = [...r.changedTouches].find((T) => T.identifier === n.touchId)),
      !i || i.identifier !== n.touchId)
    )
      return;
  } else {
    if (n.touchId !== null || r.pointerId !== n.pointerId) return;
    i = r;
  }
  if (
    ["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(
      r.type,
    ) &&
    !(
      ["pointercancel", "contextmenu"].includes(r.type) &&
      (t.browser.isSafari || t.browser.isWebView)
    )
  )
    return;
  ((n.pointerId = null), (n.touchId = null));
  const {
    params: a,
    touches: s,
    rtlTranslate: o,
    slidesGrid: c,
    enabled: d,
  } = t;
  if (!d || (!a.simulateTouch && r.pointerType === "mouse")) return;
  if (
    (n.allowTouchCallbacks && t.emit("touchEnd", r),
    (n.allowTouchCallbacks = !1),
    !n.isTouched)
  ) {
    (n.isMoved && a.grabCursor && t.setGrabCursor(!1),
      (n.isMoved = !1),
      (n.startMoving = !1));
    return;
  }
  a.grabCursor &&
    n.isMoved &&
    n.isTouched &&
    (t.allowSlideNext === !0 || t.allowSlidePrev === !0) &&
    t.setGrabCursor(!1);
  const p = ha(),
    h = p - n.touchStartTime;
  if (t.allowClick) {
    const T = r.path || (r.composedPath && r.composedPath());
    (t.updateClickedSlide((T && T[0]) || r.target, T),
      t.emit("tap click", r),
      h < 300 &&
        p - n.lastClickTime < 300 &&
        t.emit("doubleTap doubleClick", r));
  }
  if (
    ((n.lastClickTime = ha()),
    Wm(() => {
      t.destroyed || (t.allowClick = !0);
    }),
    !n.isTouched ||
      !n.isMoved ||
      !t.swipeDirection ||
      (s.diff === 0 && !n.loopSwapReset) ||
      (n.currentTranslate === n.startTranslate && !n.loopSwapReset))
  ) {
    ((n.isTouched = !1), (n.isMoved = !1), (n.startMoving = !1));
    return;
  }
  ((n.isTouched = !1), (n.isMoved = !1), (n.startMoving = !1));
  let v;
  if (
    (a.followFinger
      ? (v = o ? t.translate : -t.translate)
      : (v = -n.currentTranslate),
    a.cssMode)
  )
    return;
  if (a.freeMode && a.freeMode.enabled) {
    t.freeMode.onTouchEnd({ currentPos: v });
    return;
  }
  const x = v >= -t.maxTranslate() && !t.params.loop;
  let b = 0,
    N = t.slidesSizesGrid[0];
  for (
    let T = 0;
    T < c.length;
    T += T < a.slidesPerGroupSkip ? 1 : a.slidesPerGroup
  ) {
    const L = T < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
    typeof c[T + L] < "u"
      ? (x || (v >= c[T] && v < c[T + L])) && ((b = T), (N = c[T + L] - c[T]))
      : (x || v >= c[T]) && ((b = T), (N = c[c.length - 1] - c[c.length - 2]));
  }
  let g = null,
    f = null;
  a.rewind &&
    (t.isBeginning
      ? (f =
          a.virtual && a.virtual.enabled && t.virtual
            ? t.virtual.slides.length - 1
            : t.slides.length - 1)
      : t.isEnd && (g = 0));
  const m = (v - c[b]) / N,
    w = b < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
  if (h > a.longSwipesMs) {
    if (!a.longSwipes) {
      t.slideTo(t.activeIndex);
      return;
    }
    (t.swipeDirection === "next" &&
      (m >= a.longSwipesRatio
        ? t.slideTo(a.rewind && t.isEnd ? g : b + w)
        : t.slideTo(b)),
      t.swipeDirection === "prev" &&
        (m > 1 - a.longSwipesRatio
          ? t.slideTo(b + w)
          : f !== null && m < 0 && Math.abs(m) > a.longSwipesRatio
            ? t.slideTo(f)
            : t.slideTo(b)));
  } else {
    if (!a.shortSwipes) {
      t.slideTo(t.activeIndex);
      return;
    }
    t.navigation &&
    (r.target === t.navigation.nextEl || r.target === t.navigation.prevEl)
      ? r.target === t.navigation.nextEl
        ? t.slideTo(b + w)
        : t.slideTo(b)
      : (t.swipeDirection === "next" && t.slideTo(g !== null ? g : b + w),
        t.swipeDirection === "prev" && t.slideTo(f !== null ? f : b));
  }
}
function lf() {
  const e = this,
    { params: t, el: n } = e;
  if (n && n.offsetWidth === 0) return;
  t.breakpoints && e.setBreakpoint();
  const { allowSlideNext: r, allowSlidePrev: i, snapGrid: l } = e,
    a = e.virtual && e.params.virtual.enabled;
  ((e.allowSlideNext = !0),
    (e.allowSlidePrev = !0),
    e.updateSize(),
    e.updateSlides(),
    e.updateSlidesClasses());
  const s = a && t.loop;
  ((t.slidesPerView === "auto" || t.slidesPerView > 1) &&
  e.isEnd &&
  !e.isBeginning &&
  !e.params.centeredSlides &&
  !s
    ? e.slideTo(e.slides.length - 1, 0, !1, !0)
    : e.params.loop && !a
      ? e.slideToLoop(e.realIndex, 0, !1, !0)
      : e.slideTo(e.activeIndex, 0, !1, !0),
    e.autoplay &&
      e.autoplay.running &&
      e.autoplay.paused &&
      (clearTimeout(e.autoplay.resizeTimeout),
      (e.autoplay.resizeTimeout = setTimeout(() => {
        e.autoplay &&
          e.autoplay.running &&
          e.autoplay.paused &&
          e.autoplay.resume();
      }, 500))),
    (e.allowSlidePrev = i),
    (e.allowSlideNext = r),
    e.params.watchOverflow && l !== e.snapGrid && e.checkOverflow());
}
function ew(e) {
  const t = this;
  t.enabled &&
    (t.allowClick ||
      (t.params.preventClicks && e.preventDefault(),
      t.params.preventClicksPropagation &&
        t.animating &&
        (e.stopPropagation(), e.stopImmediatePropagation())));
}
function tw() {
  const e = this,
    { wrapperEl: t, rtlTranslate: n, enabled: r } = e;
  if (!r) return;
  ((e.previousTranslate = e.translate),
    e.isHorizontal()
      ? (e.translate = -t.scrollLeft)
      : (e.translate = -t.scrollTop),
    e.translate === 0 && (e.translate = 0),
    e.updateActiveIndex(),
    e.updateSlidesClasses());
  let i;
  const l = e.maxTranslate() - e.minTranslate();
  (l === 0 ? (i = 0) : (i = (e.translate - e.minTranslate()) / l),
    i !== e.progress && e.updateProgress(n ? -e.translate : e.translate),
    e.emit("setTranslate", e.translate, !1));
}
function nw(e) {
  const t = this;
  (Al(t, e.target),
    !(
      t.params.cssMode ||
      (t.params.slidesPerView !== "auto" && !t.params.autoHeight)
    ) && t.update());
}
function rw() {
  const e = this;
  e.documentTouchHandlerProceeded ||
    ((e.documentTouchHandlerProceeded = !0),
    e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
}
const lh = (e, t) => {
  const n = tr(),
    { params: r, el: i, wrapperEl: l, device: a } = e,
    s = !!r.nested,
    o = t === "on" ? "addEventListener" : "removeEventListener",
    c = t;
  !i ||
    typeof i == "string" ||
    (n[o]("touchstart", e.onDocumentTouchStart, { passive: !1, capture: s }),
    i[o]("touchstart", e.onTouchStart, { passive: !1 }),
    i[o]("pointerdown", e.onTouchStart, { passive: !1 }),
    n[o]("touchmove", e.onTouchMove, { passive: !1, capture: s }),
    n[o]("pointermove", e.onTouchMove, { passive: !1, capture: s }),
    n[o]("touchend", e.onTouchEnd, { passive: !0 }),
    n[o]("pointerup", e.onTouchEnd, { passive: !0 }),
    n[o]("pointercancel", e.onTouchEnd, { passive: !0 }),
    n[o]("touchcancel", e.onTouchEnd, { passive: !0 }),
    n[o]("pointerout", e.onTouchEnd, { passive: !0 }),
    n[o]("pointerleave", e.onTouchEnd, { passive: !0 }),
    n[o]("contextmenu", e.onTouchEnd, { passive: !0 }),
    (r.preventClicks || r.preventClicksPropagation) &&
      i[o]("click", e.onClick, !0),
    r.cssMode && l[o]("scroll", e.onScroll),
    r.updateOnWindowResize
      ? e[c](
          a.ios || a.android
            ? "resize orientationchange observerUpdate"
            : "resize observerUpdate",
          lf,
          !0,
        )
      : e[c]("observerUpdate", lf, !0),
    i[o]("load", e.onLoad, { capture: !0 }));
};
function iw() {
  const e = this,
    { params: t } = e;
  ((e.onTouchStart = q1.bind(e)),
    (e.onTouchMove = J1.bind(e)),
    (e.onTouchEnd = Z1.bind(e)),
    (e.onDocumentTouchStart = rw.bind(e)),
    t.cssMode && (e.onScroll = tw.bind(e)),
    (e.onClick = ew.bind(e)),
    (e.onLoad = nw.bind(e)),
    lh(e, "on"));
}
function lw() {
  lh(this, "off");
}
var aw = { attachEvents: iw, detachEvents: lw };
const af = (e, t) => e.grid && t.grid && t.grid.rows > 1;
function sw() {
  const e = this,
    { realIndex: t, initialized: n, params: r, el: i } = e,
    l = r.breakpoints;
  if (!l || (l && Object.keys(l).length === 0)) return;
  const a = tr(),
    s =
      r.breakpointsBase === "window" || !r.breakpointsBase
        ? r.breakpointsBase
        : "container",
    o =
      ["window", "container"].includes(r.breakpointsBase) || !r.breakpointsBase
        ? e.el
        : a.querySelector(r.breakpointsBase),
    c = e.getBreakpoint(l, s, o);
  if (!c || e.currentBreakpoint === c) return;
  const p = (c in l ? l[c] : void 0) || e.originalParams,
    h = af(e, r),
    v = af(e, p),
    x = e.params.grabCursor,
    b = p.grabCursor,
    N = r.enabled;
  (h && !v
    ? (i.classList.remove(
        `${r.containerModifierClass}grid`,
        `${r.containerModifierClass}grid-column`,
      ),
      e.emitContainerClasses())
    : !h &&
      v &&
      (i.classList.add(`${r.containerModifierClass}grid`),
      ((p.grid.fill && p.grid.fill === "column") ||
        (!p.grid.fill && r.grid.fill === "column")) &&
        i.classList.add(`${r.containerModifierClass}grid-column`),
      e.emitContainerClasses()),
    x && !b ? e.unsetGrabCursor() : !x && b && e.setGrabCursor(),
    ["navigation", "pagination", "scrollbar"].forEach((L) => {
      if (typeof p[L] > "u") return;
      const y = r[L] && r[L].enabled,
        C = p[L] && p[L].enabled;
      (y && !C && e[L].disable(), !y && C && e[L].enable());
    }));
  const g = p.direction && p.direction !== r.direction,
    f = r.loop && (p.slidesPerView !== r.slidesPerView || g),
    m = r.loop;
  (g && n && e.changeDirection(), st(e.params, p));
  const w = e.params.enabled,
    T = e.params.loop;
  (Object.assign(e, {
    allowTouchMove: e.params.allowTouchMove,
    allowSlideNext: e.params.allowSlideNext,
    allowSlidePrev: e.params.allowSlidePrev,
  }),
    N && !w ? e.disable() : !N && w && e.enable(),
    (e.currentBreakpoint = c),
    e.emit("_beforeBreakpoint", p),
    n &&
      (f
        ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides())
        : !m && T
          ? (e.loopCreate(t), e.updateSlides())
          : m && !T && e.loopDestroy()),
    e.emit("breakpoint", p));
}
function ow(e, t, n) {
  if ((t === void 0 && (t = "window"), !e || (t === "container" && !n))) return;
  let r = !1;
  const i = Je(),
    l = t === "window" ? i.innerHeight : n.clientHeight,
    a = Object.keys(e).map((s) => {
      if (typeof s == "string" && s.indexOf("@") === 0) {
        const o = parseFloat(s.substr(1));
        return { value: l * o, point: s };
      }
      return { value: s, point: s };
    });
  a.sort((s, o) => parseInt(s.value, 10) - parseInt(o.value, 10));
  for (let s = 0; s < a.length; s += 1) {
    const { point: o, value: c } = a[s];
    t === "window"
      ? i.matchMedia(`(min-width: ${c}px)`).matches && (r = o)
      : c <= n.clientWidth && (r = o);
  }
  return r || "max";
}
var uw = { setBreakpoint: sw, getBreakpoint: ow };
function cw(e, t) {
  const n = [];
  return (
    e.forEach((r) => {
      typeof r == "object"
        ? Object.keys(r).forEach((i) => {
            r[i] && n.push(t + i);
          })
        : typeof r == "string" && n.push(t + r);
    }),
    n
  );
}
function dw() {
  const e = this,
    { classNames: t, params: n, rtl: r, el: i, device: l } = e,
    a = cw(
      [
        "initialized",
        n.direction,
        { "free-mode": e.params.freeMode && n.freeMode.enabled },
        { autoheight: n.autoHeight },
        { rtl: r },
        { grid: n.grid && n.grid.rows > 1 },
        {
          "grid-column": n.grid && n.grid.rows > 1 && n.grid.fill === "column",
        },
        { android: l.android },
        { ios: l.ios },
        { "css-mode": n.cssMode },
        { centered: n.cssMode && n.centeredSlides },
        { "watch-progress": n.watchSlidesProgress },
      ],
      n.containerModifierClass,
    );
  (t.push(...a), i.classList.add(...t), e.emitContainerClasses());
}
function fw() {
  const e = this,
    { el: t, classNames: n } = e;
  !t ||
    typeof t == "string" ||
    (t.classList.remove(...n), e.emitContainerClasses());
}
var pw = { addClasses: dw, removeClasses: fw };
function mw() {
  const e = this,
    { isLocked: t, params: n } = e,
    { slidesOffsetBefore: r } = n;
  if (r) {
    const i = e.slides.length - 1,
      l = e.slidesGrid[i] + e.slidesSizesGrid[i] + r * 2;
    e.isLocked = e.size > l;
  } else e.isLocked = e.snapGrid.length === 1;
  (n.allowSlideNext === !0 && (e.allowSlideNext = !e.isLocked),
    n.allowSlidePrev === !0 && (e.allowSlidePrev = !e.isLocked),
    t && t !== e.isLocked && (e.isEnd = !1),
    t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock"));
}
var hw = { checkOverflow: mw },
  Bo = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    swiperElementNodeName: "SWIPER-CONTAINER",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    eventsPrefix: "swiper",
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopAddBlankSlides: !0,
    loopAdditionalSlides: 0,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-blank",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideFullyVisibleClass: "swiper-slide-fully-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
function gw(e, t) {
  return function (r) {
    r === void 0 && (r = {});
    const i = Object.keys(r)[0],
      l = r[i];
    if (typeof l != "object" || l === null) {
      st(t, r);
      return;
    }
    if (
      (e[i] === !0 && (e[i] = { enabled: !0 }),
      i === "navigation" &&
        e[i] &&
        e[i].enabled &&
        !e[i].prevEl &&
        !e[i].nextEl &&
        (e[i].auto = !0),
      ["pagination", "scrollbar"].indexOf(i) >= 0 &&
        e[i] &&
        e[i].enabled &&
        !e[i].el &&
        (e[i].auto = !0),
      !(i in e && "enabled" in l))
    ) {
      st(t, r);
      return;
    }
    (typeof e[i] == "object" && !("enabled" in e[i]) && (e[i].enabled = !0),
      e[i] || (e[i] = { enabled: !1 }),
      st(t, r));
  };
}
const Is = {
    eventsEmitter: p1,
    update: E1,
    translate: M1,
    transition: _1,
    slide: H1,
    loop: G1,
    grabCursor: Q1,
    events: aw,
    breakpoints: uw,
    checkOverflow: hw,
    classes: pw,
  },
  As = {};
let Xu = class zt {
  constructor() {
    let t, n;
    for (var r = arguments.length, i = new Array(r), l = 0; l < r; l++)
      i[l] = arguments[l];
    (i.length === 1 &&
    i[0].constructor &&
    Object.prototype.toString.call(i[0]).slice(8, -1) === "Object"
      ? (n = i[0])
      : ([t, n] = i),
      n || (n = {}),
      (n = st({}, n)),
      t && !n.el && (n.el = t));
    const a = tr();
    if (
      n.el &&
      typeof n.el == "string" &&
      a.querySelectorAll(n.el).length > 1
    ) {
      const d = [];
      return (
        a.querySelectorAll(n.el).forEach((p) => {
          const h = st({}, n, { el: p });
          d.push(new zt(h));
        }),
        d
      );
    }
    const s = this;
    ((s.__swiper__ = !0),
      (s.support = th()),
      (s.device = nh({ userAgent: n.userAgent })),
      (s.browser = rh()),
      (s.eventsListeners = {}),
      (s.eventsAnyListeners = []),
      (s.modules = [...s.__modules__]),
      n.modules && Array.isArray(n.modules) && s.modules.push(...n.modules));
    const o = {};
    s.modules.forEach((d) => {
      d({
        params: n,
        swiper: s,
        extendParams: gw(n, o),
        on: s.on.bind(s),
        once: s.once.bind(s),
        off: s.off.bind(s),
        emit: s.emit.bind(s),
      });
    });
    const c = st({}, Bo, o);
    return (
      (s.params = st({}, c, As, n)),
      (s.originalParams = st({}, s.params)),
      (s.passedParams = st({}, n)),
      s.params &&
        s.params.on &&
        Object.keys(s.params.on).forEach((d) => {
          s.on(d, s.params.on[d]);
        }),
      s.params && s.params.onAny && s.onAny(s.params.onAny),
      Object.assign(s, {
        enabled: s.params.enabled,
        el: t,
        classNames: [],
        slides: [],
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        isHorizontal() {
          return s.params.direction === "horizontal";
        },
        isVertical() {
          return s.params.direction === "vertical";
        },
        activeIndex: 0,
        realIndex: 0,
        isBeginning: !0,
        isEnd: !1,
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: !1,
        cssOverflowAdjustment() {
          return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
        },
        allowSlideNext: s.params.allowSlideNext,
        allowSlidePrev: s.params.allowSlidePrev,
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          focusableElements: s.params.focusableElements,
          lastClickTime: 0,
          clickTimeout: void 0,
          velocities: [],
          allowMomentumBounce: void 0,
          startMoving: void 0,
          pointerId: null,
          touchId: null,
        },
        allowClick: !0,
        allowTouchMove: s.params.allowTouchMove,
        touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
        imagesToLoad: [],
        imagesLoaded: 0,
      }),
      s.emit("_swiper"),
      s.params.init && s.init(),
      s
    );
  }
  getDirectionLabel(t) {
    return this.isHorizontal()
      ? t
      : {
          width: "height",
          "margin-top": "margin-left",
          "margin-bottom ": "margin-right",
          "margin-left": "margin-top",
          "margin-right": "margin-bottom",
          "padding-left": "padding-top",
          "padding-right": "padding-bottom",
          marginRight: "marginBottom",
        }[t];
  }
  getSlideIndex(t) {
    const { slidesEl: n, params: r } = this,
      i = Dt(n, `.${r.slideClass}, swiper-slide`),
      l = xa(i[0]);
    return xa(t) - l;
  }
  getSlideIndexByData(t) {
    return this.getSlideIndex(
      this.slides.find(
        (n) => n.getAttribute("data-swiper-slide-index") * 1 === t,
      ),
    );
  }
  getSlideIndexWhenGrid(t) {
    return (
      this.grid &&
        this.params.grid &&
        this.params.grid.rows > 1 &&
        (this.params.grid.fill === "column"
          ? (t = Math.floor(t / this.params.grid.rows))
          : this.params.grid.fill === "row" &&
            (t = t % Math.ceil(this.slides.length / this.params.grid.rows))),
      t
    );
  }
  recalcSlides() {
    const t = this,
      { slidesEl: n, params: r } = t;
    t.slides = Dt(n, `.${r.slideClass}, swiper-slide`);
  }
  enable() {
    const t = this;
    t.enabled ||
      ((t.enabled = !0),
      t.params.grabCursor && t.setGrabCursor(),
      t.emit("enable"));
  }
  disable() {
    const t = this;
    t.enabled &&
      ((t.enabled = !1),
      t.params.grabCursor && t.unsetGrabCursor(),
      t.emit("disable"));
  }
  setProgress(t, n) {
    const r = this;
    t = Math.min(Math.max(t, 0), 1);
    const i = r.minTranslate(),
      a = (r.maxTranslate() - i) * t + i;
    (r.translateTo(a, typeof n > "u" ? 0 : n),
      r.updateActiveIndex(),
      r.updateSlidesClasses());
  }
  emitContainerClasses() {
    const t = this;
    if (!t.params._emitClasses || !t.el) return;
    const n = t.el.className
      .split(" ")
      .filter(
        (r) =>
          r.indexOf("swiper") === 0 ||
          r.indexOf(t.params.containerModifierClass) === 0,
      );
    t.emit("_containerClasses", n.join(" "));
  }
  getSlideClasses(t) {
    const n = this;
    return n.destroyed
      ? ""
      : t.className
          .split(" ")
          .filter(
            (r) =>
              r.indexOf("swiper-slide") === 0 ||
              r.indexOf(n.params.slideClass) === 0,
          )
          .join(" ");
  }
  emitSlidesClasses() {
    const t = this;
    if (!t.params._emitClasses || !t.el) return;
    const n = [];
    (t.slides.forEach((r) => {
      const i = t.getSlideClasses(r);
      (n.push({ slideEl: r, classNames: i }), t.emit("_slideClass", r, i));
    }),
      t.emit("_slideClasses", n));
  }
  slidesPerViewDynamic(t, n) {
    (t === void 0 && (t = "current"), n === void 0 && (n = !1));
    const r = this,
      {
        params: i,
        slides: l,
        slidesGrid: a,
        slidesSizesGrid: s,
        size: o,
        activeIndex: c,
      } = r;
    let d = 1;
    if (typeof i.slidesPerView == "number") return i.slidesPerView;
    if (i.centeredSlides) {
      let p = l[c] ? Math.ceil(l[c].swiperSlideSize) : 0,
        h;
      for (let v = c + 1; v < l.length; v += 1)
        l[v] &&
          !h &&
          ((p += Math.ceil(l[v].swiperSlideSize)), (d += 1), p > o && (h = !0));
      for (let v = c - 1; v >= 0; v -= 1)
        l[v] &&
          !h &&
          ((p += l[v].swiperSlideSize), (d += 1), p > o && (h = !0));
    } else if (t === "current")
      for (let p = c + 1; p < l.length; p += 1)
        (n ? a[p] + s[p] - a[c] < o : a[p] - a[c] < o) && (d += 1);
    else for (let p = c - 1; p >= 0; p -= 1) a[c] - a[p] < o && (d += 1);
    return d;
  }
  update() {
    const t = this;
    if (!t || t.destroyed) return;
    const { snapGrid: n, params: r } = t;
    (r.breakpoints && t.setBreakpoint(),
      [...t.el.querySelectorAll('[loading="lazy"]')].forEach((a) => {
        a.complete && Al(t, a);
      }),
      t.updateSize(),
      t.updateSlides(),
      t.updateProgress(),
      t.updateSlidesClasses());
    function i() {
      const a = t.rtlTranslate ? t.translate * -1 : t.translate,
        s = Math.min(Math.max(a, t.maxTranslate()), t.minTranslate());
      (t.setTranslate(s), t.updateActiveIndex(), t.updateSlidesClasses());
    }
    let l;
    if (r.freeMode && r.freeMode.enabled && !r.cssMode)
      (i(), r.autoHeight && t.updateAutoHeight());
    else {
      if (
        (r.slidesPerView === "auto" || r.slidesPerView > 1) &&
        t.isEnd &&
        !r.centeredSlides
      ) {
        const a = t.virtual && r.virtual.enabled ? t.virtual.slides : t.slides;
        l = t.slideTo(a.length - 1, 0, !1, !0);
      } else l = t.slideTo(t.activeIndex, 0, !1, !0);
      l || i();
    }
    (r.watchOverflow && n !== t.snapGrid && t.checkOverflow(),
      t.emit("update"));
  }
  changeDirection(t, n) {
    n === void 0 && (n = !0);
    const r = this,
      i = r.params.direction;
    return (
      t || (t = i === "horizontal" ? "vertical" : "horizontal"),
      t === i ||
        (t !== "horizontal" && t !== "vertical") ||
        (r.el.classList.remove(`${r.params.containerModifierClass}${i}`),
        r.el.classList.add(`${r.params.containerModifierClass}${t}`),
        r.emitContainerClasses(),
        (r.params.direction = t),
        r.slides.forEach((l) => {
          t === "vertical" ? (l.style.width = "") : (l.style.height = "");
        }),
        r.emit("changeDirection"),
        n && r.update()),
      r
    );
  }
  changeLanguageDirection(t) {
    const n = this;
    (n.rtl && t === "rtl") ||
      (!n.rtl && t === "ltr") ||
      ((n.rtl = t === "rtl"),
      (n.rtlTranslate = n.params.direction === "horizontal" && n.rtl),
      n.rtl
        ? (n.el.classList.add(`${n.params.containerModifierClass}rtl`),
          (n.el.dir = "rtl"))
        : (n.el.classList.remove(`${n.params.containerModifierClass}rtl`),
          (n.el.dir = "ltr")),
      n.update());
  }
  mount(t) {
    const n = this;
    if (n.mounted) return !0;
    let r = t || n.params.el;
    if ((typeof r == "string" && (r = document.querySelector(r)), !r))
      return !1;
    ((r.swiper = n),
      r.parentNode &&
        r.parentNode.host &&
        r.parentNode.host.nodeName ===
          n.params.swiperElementNodeName.toUpperCase() &&
        (n.isElement = !0));
    const i = () =>
      `.${(n.params.wrapperClass || "").trim().split(" ").join(".")}`;
    let a =
      r && r.shadowRoot && r.shadowRoot.querySelector
        ? r.shadowRoot.querySelector(i())
        : Dt(r, i())[0];
    return (
      !a &&
        n.params.createElements &&
        ((a = va("div", n.params.wrapperClass)),
        r.append(a),
        Dt(r, `.${n.params.slideClass}`).forEach((s) => {
          a.append(s);
        })),
      Object.assign(n, {
        el: r,
        wrapperEl: a,
        slidesEl:
          n.isElement && !r.parentNode.host.slideSlots ? r.parentNode.host : a,
        hostEl: n.isElement ? r.parentNode.host : r,
        mounted: !0,
        rtl: r.dir.toLowerCase() === "rtl" || fn(r, "direction") === "rtl",
        rtlTranslate:
          n.params.direction === "horizontal" &&
          (r.dir.toLowerCase() === "rtl" || fn(r, "direction") === "rtl"),
        wrongRTL: fn(a, "display") === "-webkit-box",
      }),
      !0
    );
  }
  init(t) {
    const n = this;
    if (n.initialized || n.mount(t) === !1) return n;
    (n.emit("beforeInit"),
      n.params.breakpoints && n.setBreakpoint(),
      n.addClasses(),
      n.updateSize(),
      n.updateSlides(),
      n.params.watchOverflow && n.checkOverflow(),
      n.params.grabCursor && n.enabled && n.setGrabCursor(),
      n.params.loop && n.virtual && n.params.virtual.enabled
        ? n.slideTo(
            n.params.initialSlide + n.virtual.slidesBefore,
            0,
            n.params.runCallbacksOnInit,
            !1,
            !0,
          )
        : n.slideTo(
            n.params.initialSlide,
            0,
            n.params.runCallbacksOnInit,
            !1,
            !0,
          ),
      n.params.loop && n.loopCreate(void 0, !0),
      n.attachEvents());
    const i = [...n.el.querySelectorAll('[loading="lazy"]')];
    return (
      n.isElement && i.push(...n.hostEl.querySelectorAll('[loading="lazy"]')),
      i.forEach((l) => {
        l.complete
          ? Al(n, l)
          : l.addEventListener("load", (a) => {
              Al(n, a.target);
            });
      }),
      Fo(n),
      (n.initialized = !0),
      Fo(n),
      n.emit("init"),
      n.emit("afterInit"),
      n
    );
  }
  destroy(t, n) {
    (t === void 0 && (t = !0), n === void 0 && (n = !0));
    const r = this,
      { params: i, el: l, wrapperEl: a, slides: s } = r;
    return (
      typeof r.params > "u" ||
        r.destroyed ||
        (r.emit("beforeDestroy"),
        (r.initialized = !1),
        r.detachEvents(),
        i.loop && r.loopDestroy(),
        n &&
          (r.removeClasses(),
          l && typeof l != "string" && l.removeAttribute("style"),
          a && a.removeAttribute("style"),
          s &&
            s.length &&
            s.forEach((o) => {
              (o.classList.remove(
                i.slideVisibleClass,
                i.slideFullyVisibleClass,
                i.slideActiveClass,
                i.slideNextClass,
                i.slidePrevClass,
              ),
                o.removeAttribute("style"),
                o.removeAttribute("data-swiper-slide-index"));
            })),
        r.emit("destroy"),
        Object.keys(r.eventsListeners).forEach((o) => {
          r.off(o);
        }),
        t !== !1 &&
          (r.el && typeof r.el != "string" && (r.el.swiper = null), ky(r)),
        (r.destroyed = !0)),
      null
    );
  }
  static extendDefaults(t) {
    st(As, t);
  }
  static get extendedDefaults() {
    return As;
  }
  static get defaults() {
    return Bo;
  }
  static installModule(t) {
    zt.prototype.__modules__ || (zt.prototype.__modules__ = []);
    const n = zt.prototype.__modules__;
    typeof t == "function" && n.indexOf(t) < 0 && n.push(t);
  }
  static use(t) {
    return Array.isArray(t)
      ? (t.forEach((n) => zt.installModule(n)), zt)
      : (zt.installModule(t), zt);
  }
};
Object.keys(Is).forEach((e) => {
  Object.keys(Is[e]).forEach((t) => {
    Xu.prototype[t] = Is[e][t];
  });
});
Xu.use([d1, f1]);
const ah = [
  "eventsPrefix",
  "injectStyles",
  "injectStylesUrls",
  "modules",
  "init",
  "_direction",
  "oneWayMovement",
  "swiperElementNodeName",
  "touchEventsTarget",
  "initialSlide",
  "_speed",
  "cssMode",
  "updateOnWindowResize",
  "resizeObserver",
  "nested",
  "focusableElements",
  "_enabled",
  "_width",
  "_height",
  "preventInteractionOnTransition",
  "userAgent",
  "url",
  "_edgeSwipeDetection",
  "_edgeSwipeThreshold",
  "_freeMode",
  "_autoHeight",
  "setWrapperSize",
  "virtualTranslate",
  "_effect",
  "breakpoints",
  "breakpointsBase",
  "_spaceBetween",
  "_slidesPerView",
  "maxBackfaceHiddenSlides",
  "_grid",
  "_slidesPerGroup",
  "_slidesPerGroupSkip",
  "_slidesPerGroupAuto",
  "_centeredSlides",
  "_centeredSlidesBounds",
  "_slidesOffsetBefore",
  "_slidesOffsetAfter",
  "normalizeSlideIndex",
  "_centerInsufficientSlides",
  "_watchOverflow",
  "roundLengths",
  "touchRatio",
  "touchAngle",
  "simulateTouch",
  "_shortSwipes",
  "_longSwipes",
  "longSwipesRatio",
  "longSwipesMs",
  "_followFinger",
  "allowTouchMove",
  "_threshold",
  "touchMoveStopPropagation",
  "touchStartPreventDefault",
  "touchStartForcePreventDefault",
  "touchReleaseOnEdges",
  "uniqueNavElements",
  "_resistance",
  "_resistanceRatio",
  "_watchSlidesProgress",
  "_grabCursor",
  "preventClicks",
  "preventClicksPropagation",
  "_slideToClickedSlide",
  "_loop",
  "loopAdditionalSlides",
  "loopAddBlankSlides",
  "loopPreventsSliding",
  "_rewind",
  "_allowSlidePrev",
  "_allowSlideNext",
  "_swipeHandler",
  "_noSwiping",
  "noSwipingClass",
  "noSwipingSelector",
  "passiveListeners",
  "containerModifierClass",
  "slideClass",
  "slideActiveClass",
  "slideVisibleClass",
  "slideFullyVisibleClass",
  "slideNextClass",
  "slidePrevClass",
  "slideBlankClass",
  "wrapperClass",
  "lazyPreloaderClass",
  "lazyPreloadPrevNext",
  "runCallbacksOnInit",
  "observer",
  "observeParents",
  "observeSlideChildren",
  "a11y",
  "_autoplay",
  "_controller",
  "coverflowEffect",
  "cubeEffect",
  "fadeEffect",
  "flipEffect",
  "creativeEffect",
  "cardsEffect",
  "hashNavigation",
  "history",
  "keyboard",
  "mousewheel",
  "_navigation",
  "_pagination",
  "parallax",
  "_scrollbar",
  "_thumbs",
  "virtual",
  "zoom",
  "control",
];
function Jn(e) {
  return (
    typeof e == "object" &&
    e !== null &&
    e.constructor &&
    Object.prototype.toString.call(e).slice(8, -1) === "Object" &&
    !e.__swiper__
  );
}
function Cr(e, t) {
  const n = ["__proto__", "constructor", "prototype"];
  Object.keys(t)
    .filter((r) => n.indexOf(r) < 0)
    .forEach((r) => {
      typeof e[r] > "u"
        ? (e[r] = t[r])
        : Jn(t[r]) && Jn(e[r]) && Object.keys(t[r]).length > 0
          ? t[r].__swiper__
            ? (e[r] = t[r])
            : Cr(e[r], t[r])
          : (e[r] = t[r]);
    });
}
function sh(e) {
  return (
    e === void 0 && (e = {}),
    e.navigation &&
      typeof e.navigation.nextEl > "u" &&
      typeof e.navigation.prevEl > "u"
  );
}
function oh(e) {
  return (
    e === void 0 && (e = {}),
    e.pagination && typeof e.pagination.el > "u"
  );
}
function uh(e) {
  return (e === void 0 && (e = {}), e.scrollbar && typeof e.scrollbar.el > "u");
}
function ch(e) {
  e === void 0 && (e = "");
  const t = e
      .split(" ")
      .map((r) => r.trim())
      .filter((r) => !!r),
    n = [];
  return (
    t.forEach((r) => {
      n.indexOf(r) < 0 && n.push(r);
    }),
    n.join(" ")
  );
}
function vw(e) {
  return (
    e === void 0 && (e = ""),
    e
      ? e.includes("swiper-wrapper")
        ? e
        : `swiper-wrapper ${e}`
      : "swiper-wrapper"
  );
}
function xw(e) {
  let {
    swiper: t,
    slides: n,
    passedParams: r,
    changedParams: i,
    nextEl: l,
    prevEl: a,
    scrollbarEl: s,
    paginationEl: o,
  } = e;
  const c = i.filter(
      (M) => M !== "children" && M !== "direction" && M !== "wrapperClass",
    ),
    {
      params: d,
      pagination: p,
      navigation: h,
      scrollbar: v,
      virtual: x,
      thumbs: b,
    } = t;
  let N, g, f, m, w, T, L, y;
  (i.includes("thumbs") &&
    r.thumbs &&
    r.thumbs.swiper &&
    !r.thumbs.swiper.destroyed &&
    d.thumbs &&
    (!d.thumbs.swiper || d.thumbs.swiper.destroyed) &&
    (N = !0),
    i.includes("controller") &&
      r.controller &&
      r.controller.control &&
      d.controller &&
      !d.controller.control &&
      (g = !0),
    i.includes("pagination") &&
      r.pagination &&
      (r.pagination.el || o) &&
      (d.pagination || d.pagination === !1) &&
      p &&
      !p.el &&
      (f = !0),
    i.includes("scrollbar") &&
      r.scrollbar &&
      (r.scrollbar.el || s) &&
      (d.scrollbar || d.scrollbar === !1) &&
      v &&
      !v.el &&
      (m = !0),
    i.includes("navigation") &&
      r.navigation &&
      (r.navigation.prevEl || a) &&
      (r.navigation.nextEl || l) &&
      (d.navigation || d.navigation === !1) &&
      h &&
      !h.prevEl &&
      !h.nextEl &&
      (w = !0));
  const C = (M) => {
    t[M] &&
      (t[M].destroy(),
      M === "navigation"
        ? (t.isElement && (t[M].prevEl.remove(), t[M].nextEl.remove()),
          (d[M].prevEl = void 0),
          (d[M].nextEl = void 0),
          (t[M].prevEl = void 0),
          (t[M].nextEl = void 0))
        : (t.isElement && t[M].el.remove(),
          (d[M].el = void 0),
          (t[M].el = void 0)));
  };
  (i.includes("loop") &&
    t.isElement &&
    (d.loop && !r.loop ? (T = !0) : !d.loop && r.loop ? (L = !0) : (y = !0)),
    c.forEach((M) => {
      if (Jn(d[M]) && Jn(r[M]))
        (Object.assign(d[M], r[M]),
          (M === "navigation" || M === "pagination" || M === "scrollbar") &&
            "enabled" in r[M] &&
            !r[M].enabled &&
            C(M));
      else {
        const P = r[M];
        (P === !0 || P === !1) &&
        (M === "navigation" || M === "pagination" || M === "scrollbar")
          ? P === !1 && C(M)
          : (d[M] = r[M]);
      }
    }),
    c.includes("controller") &&
      !g &&
      t.controller &&
      t.controller.control &&
      d.controller &&
      d.controller.control &&
      (t.controller.control = d.controller.control),
    i.includes("children") && n && x && d.virtual.enabled
      ? ((x.slides = n), x.update(!0))
      : i.includes("virtual") &&
        x &&
        d.virtual.enabled &&
        (n && (x.slides = n), x.update(!0)),
    i.includes("children") && n && d.loop && (y = !0),
    N && b.init() && b.update(!0),
    g && (t.controller.control = d.controller.control),
    f &&
      (t.isElement &&
        (!o || typeof o == "string") &&
        ((o = document.createElement("div")),
        o.classList.add("swiper-pagination"),
        o.part.add("pagination"),
        t.el.appendChild(o)),
      o && (d.pagination.el = o),
      p.init(),
      p.render(),
      p.update()),
    m &&
      (t.isElement &&
        (!s || typeof s == "string") &&
        ((s = document.createElement("div")),
        s.classList.add("swiper-scrollbar"),
        s.part.add("scrollbar"),
        t.el.appendChild(s)),
      s && (d.scrollbar.el = s),
      v.init(),
      v.updateSize(),
      v.setTranslate()),
    w &&
      (t.isElement &&
        ((!l || typeof l == "string") &&
          ((l = document.createElement("div")),
          l.classList.add("swiper-button-next"),
          ya(l, t.hostEl.constructor.nextButtonSvg),
          l.part.add("button-next"),
          t.el.appendChild(l)),
        (!a || typeof a == "string") &&
          ((a = document.createElement("div")),
          a.classList.add("swiper-button-prev"),
          ya(a, t.hostEl.constructor.prevButtonSvg),
          a.part.add("button-prev"),
          t.el.appendChild(a))),
      l && (d.navigation.nextEl = l),
      a && (d.navigation.prevEl = a),
      h.init(),
      h.update()),
    i.includes("allowSlideNext") && (t.allowSlideNext = r.allowSlideNext),
    i.includes("allowSlidePrev") && (t.allowSlidePrev = r.allowSlidePrev),
    i.includes("direction") && t.changeDirection(r.direction, !1),
    (T || y) && t.loopDestroy(),
    (L || y) && t.loopCreate(),
    t.update());
}
function yw(e, t) {
  (e === void 0 && (e = {}), t === void 0 && (t = !0));
  const n = { on: {} },
    r = {},
    i = {};
  (Cr(n, Bo), (n._emitClasses = !0), (n.init = !1));
  const l = {},
    a = ah.map((o) => o.replace(/_/, "")),
    s = Object.assign({}, e);
  return (
    Object.keys(s).forEach((o) => {
      typeof e[o] > "u" ||
        (a.indexOf(o) >= 0
          ? Jn(e[o])
            ? ((n[o] = {}), (i[o] = {}), Cr(n[o], e[o]), Cr(i[o], e[o]))
            : ((n[o] = e[o]), (i[o] = e[o]))
          : o.search(/on[A-Z]/) === 0 && typeof e[o] == "function"
            ? t
              ? (r[`${o[2].toLowerCase()}${o.substr(3)}`] = e[o])
              : (n.on[`${o[2].toLowerCase()}${o.substr(3)}`] = e[o])
            : (l[o] = e[o]));
    }),
    ["navigation", "pagination", "scrollbar"].forEach((o) => {
      (n[o] === !0 && (n[o] = {}), n[o] === !1 && delete n[o]);
    }),
    { params: n, passedParams: i, rest: l, events: r }
  );
}
function ww(e, t) {
  let {
    el: n,
    nextEl: r,
    prevEl: i,
    paginationEl: l,
    scrollbarEl: a,
    swiper: s,
  } = e;
  (sh(t) &&
    r &&
    i &&
    ((s.params.navigation.nextEl = r),
    (s.originalParams.navigation.nextEl = r),
    (s.params.navigation.prevEl = i),
    (s.originalParams.navigation.prevEl = i)),
    oh(t) &&
      l &&
      ((s.params.pagination.el = l), (s.originalParams.pagination.el = l)),
    uh(t) &&
      a &&
      ((s.params.scrollbar.el = a), (s.originalParams.scrollbar.el = a)),
    s.init(n));
}
function bw(e, t, n, r, i) {
  const l = [];
  if (!t) return l;
  const a = (o) => {
    l.indexOf(o) < 0 && l.push(o);
  };
  if (n && r) {
    const o = r.map(i),
      c = n.map(i);
    (o.join("") !== c.join("") && a("children"),
      r.length !== n.length && a("children"));
  }
  return (
    ah
      .filter((o) => o[0] === "_")
      .map((o) => o.replace(/_/, ""))
      .forEach((o) => {
        if (o in e && o in t)
          if (Jn(e[o]) && Jn(t[o])) {
            const c = Object.keys(e[o]),
              d = Object.keys(t[o]);
            c.length !== d.length
              ? a(o)
              : (c.forEach((p) => {
                  e[o][p] !== t[o][p] && a(o);
                }),
                d.forEach((p) => {
                  e[o][p] !== t[o][p] && a(o);
                }));
          } else e[o] !== t[o] && a(o);
      }),
    l
  );
}
const Sw = (e) => {
  !e ||
    e.destroyed ||
    !e.params.virtual ||
    (e.params.virtual && !e.params.virtual.enabled) ||
    (e.updateSlides(),
    e.updateProgress(),
    e.updateSlidesClasses(),
    e.emit("_virtualUpdated"),
    e.parallax &&
      e.params.parallax &&
      e.params.parallax.enabled &&
      e.parallax.setTranslate());
};
function wa() {
  return (
    (wa = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    wa.apply(this, arguments)
  );
}
function dh(e) {
  return (
    e.type && e.type.displayName && e.type.displayName.includes("SwiperSlide")
  );
}
function fh(e) {
  const t = [];
  return (
    le.Children.toArray(e).forEach((n) => {
      dh(n)
        ? t.push(n)
        : n.props &&
          n.props.children &&
          fh(n.props.children).forEach((r) => t.push(r));
    }),
    t
  );
}
function Tw(e) {
  const t = [],
    n = {
      "container-start": [],
      "container-end": [],
      "wrapper-start": [],
      "wrapper-end": [],
    };
  return (
    le.Children.toArray(e).forEach((r) => {
      if (dh(r)) t.push(r);
      else if (r.props && r.props.slot && n[r.props.slot])
        n[r.props.slot].push(r);
      else if (r.props && r.props.children) {
        const i = fh(r.props.children);
        i.length > 0 ? i.forEach((l) => t.push(l)) : n["container-end"].push(r);
      } else n["container-end"].push(r);
    }),
    { slides: t, slots: n }
  );
}
function Ew(e, t, n) {
  if (!n) return null;
  const r = (d) => {
      let p = d;
      return (
        d < 0 ? (p = t.length + d) : p >= t.length && (p = p - t.length),
        p
      );
    },
    i = e.isHorizontal()
      ? { [e.rtlTranslate ? "right" : "left"]: `${n.offset}px` }
      : { top: `${n.offset}px` },
    { from: l, to: a } = n,
    s = e.params.loop ? -t.length : 0,
    o = e.params.loop ? t.length * 2 : t.length,
    c = [];
  for (let d = s; d < o; d += 1) d >= l && d <= a && c.push(t[r(d)]);
  return c.map((d, p) =>
    le.cloneElement(d, {
      swiper: e,
      style: i,
      key: d.props.virtualIndex || d.key || `slide-${p}`,
    }),
  );
}
function xi(e, t) {
  return typeof window > "u" ? j.useEffect(e, t) : j.useLayoutEffect(e, t);
}
const sf = j.createContext(null),
  jw = j.createContext(null),
  ph = j.forwardRef(function (e, t) {
    let {
        className: n,
        tag: r = "div",
        wrapperTag: i = "div",
        children: l,
        onSwiper: a,
        ...s
      } = e === void 0 ? {} : e,
      o = !1;
    const [c, d] = j.useState("swiper"),
      [p, h] = j.useState(null),
      [v, x] = j.useState(!1),
      b = j.useRef(!1),
      N = j.useRef(null),
      g = j.useRef(null),
      f = j.useRef(null),
      m = j.useRef(null),
      w = j.useRef(null),
      T = j.useRef(null),
      L = j.useRef(null),
      y = j.useRef(null),
      { params: C, passedParams: M, rest: P, events: _ } = yw(s),
      { slides: F, slots: D } = Tw(l),
      A = () => {
        x(!v);
      };
    Object.assign(C.on, {
      _containerClasses(z, $) {
        d($);
      },
    });
    const W = () => {
      (Object.assign(C.on, _), (o = !0));
      const z = { ...C };
      if (
        (delete z.wrapperClass,
        (g.current = new Xu(z)),
        g.current.virtual && g.current.params.virtual.enabled)
      ) {
        g.current.virtual.slides = F;
        const $ = {
          cache: !1,
          slides: F,
          renderExternal: h,
          renderExternalUpdate: !1,
        };
        (Cr(g.current.params.virtual, $),
          Cr(g.current.originalParams.virtual, $));
      }
    };
    (N.current || W(), g.current && g.current.on("_beforeBreakpoint", A));
    const K = () => {
        o ||
          !_ ||
          !g.current ||
          Object.keys(_).forEach((z) => {
            g.current.on(z, _[z]);
          });
      },
      Z = () => {
        !_ ||
          !g.current ||
          Object.keys(_).forEach((z) => {
            g.current.off(z, _[z]);
          });
      };
    (j.useEffect(() => () => {
      g.current && g.current.off("_beforeBreakpoint", A);
    }),
      j.useEffect(() => {
        !b.current &&
          g.current &&
          (g.current.emitSlidesClasses(), (b.current = !0));
      }),
      xi(() => {
        if ((t && (t.current = N.current), !!N.current))
          return (
            g.current.destroyed && W(),
            ww(
              {
                el: N.current,
                nextEl: w.current,
                prevEl: T.current,
                paginationEl: L.current,
                scrollbarEl: y.current,
                swiper: g.current,
              },
              C,
            ),
            a && !g.current.destroyed && a(g.current),
            () => {
              g.current && !g.current.destroyed && g.current.destroy(!0, !1);
            }
          );
      }, []),
      xi(() => {
        K();
        const z = bw(M, f.current, F, m.current, ($) => $.key);
        return (
          (f.current = M),
          (m.current = F),
          z.length &&
            g.current &&
            !g.current.destroyed &&
            xw({
              swiper: g.current,
              slides: F,
              passedParams: M,
              changedParams: z,
              nextEl: w.current,
              prevEl: T.current,
              scrollbarEl: y.current,
              paginationEl: L.current,
            }),
          () => {
            Z();
          }
        );
      }),
      xi(() => {
        Sw(g.current);
      }, [p]));
    function R() {
      return C.virtual
        ? Ew(g.current, F, p)
        : F.map((z, $) =>
            le.cloneElement(z, { swiper: g.current, swiperSlideIndex: $ }),
          );
    }
    return le.createElement(
      r,
      wa({ ref: N, className: ch(`${c}${n ? ` ${n}` : ""}`) }, P),
      le.createElement(
        jw.Provider,
        { value: g.current },
        D["container-start"],
        le.createElement(
          i,
          { className: vw(C.wrapperClass) },
          D["wrapper-start"],
          R(),
          D["wrapper-end"],
        ),
        sh(C) &&
          le.createElement(
            le.Fragment,
            null,
            le.createElement("div", {
              ref: T,
              className: "swiper-button-prev",
            }),
            le.createElement("div", {
              ref: w,
              className: "swiper-button-next",
            }),
          ),
        uh(C) &&
          le.createElement("div", { ref: y, className: "swiper-scrollbar" }),
        oh(C) &&
          le.createElement("div", { ref: L, className: "swiper-pagination" }),
        D["container-end"],
      ),
    );
  });
ph.displayName = "Swiper";
const mh = j.forwardRef(function (e, t) {
  let {
    tag: n = "div",
    children: r,
    className: i = "",
    swiper: l,
    zoom: a,
    lazy: s,
    virtualIndex: o,
    swiperSlideIndex: c,
    ...d
  } = e === void 0 ? {} : e;
  const p = j.useRef(null),
    [h, v] = j.useState("swiper-slide"),
    [x, b] = j.useState(!1);
  function N(w, T, L) {
    T === p.current && v(L);
  }
  (xi(() => {
    if (
      (typeof c < "u" && (p.current.swiperSlideIndex = c),
      t && (t.current = p.current),
      !(!p.current || !l))
    ) {
      if (l.destroyed) {
        h !== "swiper-slide" && v("swiper-slide");
        return;
      }
      return (
        l.on("_slideClass", N),
        () => {
          l && l.off("_slideClass", N);
        }
      );
    }
  }),
    xi(() => {
      l && p.current && !l.destroyed && v(l.getSlideClasses(p.current));
    }, [l]));
  const g = {
      isActive: h.indexOf("swiper-slide-active") >= 0,
      isVisible: h.indexOf("swiper-slide-visible") >= 0,
      isPrev: h.indexOf("swiper-slide-prev") >= 0,
      isNext: h.indexOf("swiper-slide-next") >= 0,
    },
    f = () => (typeof r == "function" ? r(g) : r),
    m = () => {
      b(!0);
    };
  return le.createElement(
    n,
    wa(
      {
        ref: p,
        className: ch(`${h}${i ? ` ${i}` : ""}`),
        "data-swiper-slide-index": o,
        onLoad: m,
      },
      d,
    ),
    a &&
      le.createElement(
        sf.Provider,
        { value: g },
        le.createElement(
          "div",
          {
            className: "swiper-zoom-container",
            "data-swiper-zoom": typeof a == "number" ? a : void 0,
          },
          f(),
          s &&
            !x &&
            le.createElement("div", { className: "swiper-lazy-preloader" }),
        ),
      ),
    !a &&
      le.createElement(
        sf.Provider,
        { value: g },
        f(),
        s &&
          !x &&
          le.createElement("div", { className: "swiper-lazy-preloader" }),
      ),
  );
});
mh.displayName = "SwiperSlide";
const Cw = [
    {
      id: 1,
      projectThumb: "/assets/figma/testi-1.png",
      projectSubTilte:
        "Many organizations talk about youth development, but Pepper Labs makes it happen. Their programs provide real opportunities for young people to thrive in the gig economy. Their influence is truly remarkable.",
      projectTitle: "Azman Khalid",
      projectPosition: "Youth Program Coordinator",
    },
    {
      id: 2,
      projectThumb: "/assets/figma/testi-2.png",
      projectSubTilte:
        "There are many social enterprises in Malaysia, but none like Pepper Labs. Their commitment to supporting local entrepreneurs is unparalleled, and their positive impact on the community is clear.",
      projectTitle: "Ahmad Syafiq",
      projectPosition: "Community Development Manager",
    },
    {
      id: 3,
      projectThumb: "/assets/figma/testi-3.png",
      projectSubTilte:
        "Pepper Labs is unlike any other social enterprise. Their innovative approach to social entrepreneurship and sustainable economic empowerment sets them apart. It's no wonder they're multi-award winning.",
      projectTitle: "Nurul Huda",
      projectPosition: "CEO, Green Impact Initiatives",
    },
  ],
  hh = ({ forWho = false } = {}) => {
    const e = {
        spaceBetween: 50,
        speed: 1e3,
        centeredSlides: !0,
        initialSlide: 1,
        autoplay: !1,
        slidesPerView: "auto",
      },
      t = {
        clickable: !0,
        renderBullet: function (n, r) {
          return '<span class="' + r + ' pagination-bullet"></span>';
        },
      };
    return u.jsxs("section", {
      id: "past-projects",
      className: `project relative z-10 sm:pt-[60px] pb-[120px] bg-white${forWho ? " pl-who-voices" : ""}`,
      children: [
        u.jsx("div", {
          className: "Container",
          children: u.jsxs(Fr, {
            subtitle: forWho ? "COMMUNITY VOICES" : "TESTIMONIALS",
            children: forWho
              ? [
                  "People behind the ",
                  u.jsx("span", {
                    className: "text-AccentText",
                    children: "impact",
                  }),
                ]
              : [
                  "What makes ",
                  u.jsx("span", {
                    className: "text-AccentText",
                    children: "Pepper Labs",
                  }),
                  " stand out?",
                ],
          }),
        }),
        u.jsx("div", {
          className: "md:px-0 md:Container",
          children: u.jsx("div", {
            className: "mt-[30px] sm:mt-[60px]",
            children: u.jsx(ph, {
              ...e,
              pagination: t,
              modules: [Ay],
              className: "md:blur-swiper",
              children: u.jsx("div", {
                children: Cw.map(
                  ({
                    id: n,
                    projectThumb: r,
                    projectSubTilte: i,
                    projectTitle: l,
                    projectPosition: a,
                  }) =>
                    u.jsx(
                      mh,
                      {
                        className: "px-2 md:px-0 md:w-[655px]",
                        children: u.jsx("div", {
                          className: "pb-[52px] w-full",
                          children: u.jsx("div", {
                            className: "relative z-10 group w-full h-full",
                            children: u.jsxs("div", {
                              className:
                                "flex flex-col gap-6 sm:gap-[30px] rounded card-shadow bg-white border-secondary-500 px-[30px] sm:min-h-[318px] py-[40px] w-full",
                              children: [
                                u.jsxs("div", {
                                  className:
                                    "flex gap-6 sm:gap-[30px] h-[60px] sm:h-[80px]",
                                  children: [
                                    u.jsx("div", {
                                      className:
                                        "rounded-full w-[60px] h-[60px] sm:w-[80px] sm:h-[80px]",
                                      children: u.jsx(V, {
                                        src: r,
                                        draggable: !1,
                                        className: "",
                                      }),
                                    }),
                                    u.jsxs("div", {
                                      className:
                                        "flex flex-col h-full justify-between",
                                      children: [
                                        u.jsx("div", {
                                          className: "flex",
                                          children: Array(5)
                                            .fill(0)
                                            .map((s, o) =>
                                              u.jsx(
                                                V,
                                                {
                                                  src: "/assets/figma/Star_filled.png",
                                                  draggable: !1,
                                                  className:
                                                    "w-[18px] h-[18px]",
                                                },
                                                o,
                                              ),
                                            ),
                                        }),
                                        u.jsx("div", {
                                          className:
                                            "font-bold text-[14px] sm:text-[18px] leading-[23.4px] text-PrimaryText",
                                          children: l,
                                        }),
                                        u.jsx("div", {
                                          className:
                                            "text-[12px] sm:text-[14px] md:leading-[24.4px] text-SecondaryText",
                                          children: a,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                u.jsx("div", {
                                  className: "relative",
                                  children: u.jsx("h6", {
                                    className:
                                      "font-primary text-[14px] sm:text-[18px] md:leading-[32px] text-SecondaryText",
                                    children: i,
                                  }),
                                }),
                              ],
                            }),
                          }),
                        }),
                      },
                      n,
                    ),
                ),
              }),
            }),
          }),
        }),
      ],
    });
  },
  Pw = "/assets/figma/Section3_Asset0.png",
  kw = "/assets/figma/Section3_Asset1.png",
  Nw = "/assets/figma/Section3_Asset2.png",
  Mw = "/assets/figma/Section3_Asset3.png",
  Lw = [
    {
      id: 1,
      brandTitle: "AI for MY Future",
      category: "Community",
      brandDesc:
        "Bridges the digital gap for underserved communities with AI education and digital skills training, opening pathways to employment and entrepreneurship.",
    },
    {
      id: 2,
      brandTitle: "Google Gemilang",
      category: "Workforce",
      brandDesc:
        "Google's digital upskilling initiative equips Malaysians with in-demand technology skills and certifications for the digital workforce.",
    },
    {
      id: 3,
      brandTitle: "K-Youth Development Programme",
      category: "Youth",
      brandDesc:
        "Prepares unemployed youth with future-ready AI and digital skills through AI Design Labs and capstone projects focused on MSME transformation.",
    },
    {
      id: 4,
      brandTitle: "AI Future Skills Accelerator",
      category: "Workforce",
      brandDesc:
        "With Yayasan Peneraju, practical AI and digital skills training strengthens employability and readiness for the evolving workforce.",
    },
    {
      id: 5,
      brandTitle: "AI Opportunity Fund",
      category: "Education",
      brandDesc:
        "With AVPN, the programme builds practical AI knowledge and digital skills for students, teachers and MSMEs.",
    },
    {
      id: 6,
      brandTitle: "AI for Community @ NADI",
      category: "Community",
      brandDesc:
        "With AWS and MCMC, participants gain practical AI skills, learn ethical use and explore pathways to income through community learning.",
    },
    {
      id: 7,
      brandMark: "Dapur Digital",
      brandTitle: "Dapur Digital",
      category: "Enterprise",
      brandDesc:
        "A cloud kitchen initiative supporting B40 women with shared kitchens, digital tools and business training to grow food businesses and build financial independence.",
    },
    {
      id: 8,
      brandMark: "Yayasan Sime Darby",
      brandTitle: "YSD Sepakat",
      category: "Community",
      brandDesc:
        "A community development programme building leadership, project management and social entrepreneurship skills, with guidance for community-led initiatives.",
    },
    {
      id: 9,
      brandMark: "SME Corp Malaysia",
      brandTitle: "Skala IB",
      category: "Enterprise",
      brandDesc:
        "A community empowerment initiative supporting Malaysian micro-entrepreneurs with digital skills, business development and Bisnes.AI tools to improve productivity.",
    },
    {
      id: 10,
      brandMark: "APPGM-SDG",
      brandTitle: "Social Enterprise Accelerator Programme",
      category: "Enterprise",
      brandDesc:
        "The 2024 programme supported 10 CSOs with training, mentorship and business development to strengthen sustainability, digital presence, impact measurement and partnerships.",
    },
  ],
  Dw = () => {
    const [e, t] = j.useState("All");
    const n = ["All", "Community", "Youth", "Workforce", "Enterprise", "Education"];
    const r = e === "All" ? Lw.slice(1) : Lw.filter((i) => i.category === e);
    const o = e === "All" ? Lw[0] : null;
    return u.jsx("section", {
      id: "our-brands",
      className: "pl-impact-section relative",
      children: u.jsxs("div", {
        className: "Container",
        children: [
          u.jsxs("header", {
            className: "pl-impact-heading",
            children: [
              u.jsx("p", {
                className: "pl-impact-eyebrow",
                children: "OUR HIGH IMPACT PROJECTS",
              }),
              u.jsxs("h2", {
                children: [
                  "Programmes creating ",
                  u.jsx("span", {
                    className: "text-AccentText",
                    children: "lasting",
                  }),
                  " opportunity",
                ],
              }),
              u.jsx("p", {
                className: "pl-impact-intro",
                children:
                  "From AI skills to community enterprise, our programmes connect people with pathways to employment, growth and opportunity.",
              }),
            ],
          }),
          u.jsxs("div", {
            className: "pl-impact-filterbar",
            children: [
              u.jsx("div", {
                className: "pl-impact-filters",
                role: "group",
                "aria-label": "Filter projects by focus area",
                children: n.map((i) =>
                  u.jsx(
                    "button",
                    {
                      type: "button",
                      "aria-pressed": e === i,
                      className: `pl-impact-filter${e === i ? " is-active" : ""}`,
                      onClick: () => t(i),
                      children: i,
                    },
                    i,
                  ),
                ),
              }),
              u.jsx("p", {
                className: "pl-impact-count",
                "aria-live": "polite",
                children: `${e === "All" ? Lw.length : r.length} ${e === "All" ? "programmes" : r.length === 1 ? "programme" : "programmes"}`,
              }),
            ],
          }),
          o &&
            u.jsxs("article", {
              className: "pl-impact-feature",
              children: [
                u.jsxs("div", {
                  className: "pl-impact-feature-art",
                  "aria-hidden": "true",
                  children: [
                    u.jsx("span", {
                      className: "pl-impact-feature-orbit pl-impact-feature-orbit-one",
                    }),
                    u.jsx("span", {
                      className: "pl-impact-feature-orbit pl-impact-feature-orbit-two",
                    }),
                    u.jsx("span", {
                      className: "pl-impact-feature-mark",
                      children: "AI",
                    }),
                    u.jsx("span", {
                      className: "pl-impact-feature-caption",
                      children: "FOR MY FUTURE",
                    }),
                  ],
                }),
                u.jsxs("div", {
                  className: "pl-impact-feature-copy",
                  children: [
                    u.jsxs("div", {
                      className: "pl-impact-feature-labels",
                      children: [
                        u.jsx("span", {
                          className: "pl-impact-badge pl-impact-badge-featured",
                          children: "Flagship",
                        }),
                        u.jsx("span", {
                          className: "pl-impact-category",
                          children: o.category,
                        }),
                      ],
                    }),
                    u.jsx("h3", { children: o.brandTitle }),
                    u.jsx("p", { children: o.brandDesc }),
                  ],
                }),
              ],
            }),
          u.jsx("div", {
            className: "pl-impact-grid",
            children: r.map(
              ({ id: i, brandTitle: l, brandDesc: a, category: s, brandMark: c }) =>
                u.jsx(
                  "article",
                  {
                    className: "pl-impact-card",
                    children: [
                      u.jsxs("div", {
                        className: "pl-impact-card-top",
                        children: [
                          u.jsx("span", {
                            className: "pl-impact-card-mark",
                            "aria-hidden": "true",
                            children: l
                              .split(/\s+/)
                              .filter(Boolean)
                              .slice(0, 2)
                              .map((d) => d[0])
                              .join(""),
                          }),
                          u.jsx("span", {
                            className: "pl-impact-category",
                            children: s,
                          }),
                        ],
                      }),
                      u.jsx("h3", {
                        className: "pl-impact-card-title",
                        children: l,
                      }),
                      u.jsx("p", {
                        className: "pl-impact-card-description",
                        children: a,
                      }),
                      c &&
                        u.jsx("p", {
                          className: "pl-impact-partner",
                          children: c,
                        }),
                    ],
                  },
                  `brand-${i}`,
                ),
            ),
          }),
        ],
      }),
    });
  },
  Rw = ({ serviceIcon: e, serviceTitle: t, serviceDesc: n, serviceUrl: r }) => {
    const i = j.useCallback((l, a = -200) => {
      var o;
      const s = document.getElementById(l);
      if (s) {
        const c =
          ((o = s == null ? void 0 : s.getBoundingClientRect()) == null
            ? void 0
            : o.top) +
          window.scrollY +
          a;
        window.scrollTo({ top: c, behavior: "smooth" });
      }
    }, []);
    return u.jsxs("div", {
      className:
        "card-shadow flex flex-col h-full gap-[10px] justify-center items-center px-[30px] py-[50px] rounded-[5px] bg-white group relative z-10 overflow-hidden",
      children: [
        u.jsx("div", {
          className: "relative z-10",
          children: u.jsx(V, { src: e, draggable: "false" }),
        }),
        u.jsx(ee, {
          to: r,
          children: u.jsx("button", {
            className:
              "font-primary font-bold text-[20px] xl:text-[20px] 2xl:text-[24px] 2xl:leading-[36px] text-PrimaryText transition-all duration-500",
            children: t,
          }),
        }),
        u.jsx("p", {
          className:
            "text-[14px] text-SecondaryText transition-all duration-500 pb-2 text-center",
          children: n,
        }),
        u.jsx(ee, {
          to: "#our-brands",
          className: "mt-7 inline-block",
          onClick: () => i("our-brands", -100),
          children: u.jsx(Fa, { children: "Learn more" }),
        }),
      ],
    });
  },
  _w = "/assets/figma/Section2_Asset0.png",
  Ow = "/assets/figma/Section2_Asset1.png",
  Iw = "/assets/figma/Section2_Asset2.png",
  Aw = [
    {
      id: 1,
      serviceIcon: _w,
      serviceTitle: "Policy, Research and Innovations",
      serviceDesc:
        "We partner across sectors to empower beneficiaries, leveraging grassroots strengths and strategic networks for policy design and advocacy.",
    },
    {
      id: 2,
      serviceIcon: Ow,
      serviceTitle: "Transformative Skills and Pedagogy Design",
      serviceDesc:
        "We empower micro-entrepreneurs and job seekers with practical insights and experience, helping them succeed in business or competitive job markets.",
    },
    {
      id: 3,
      serviceIcon: Iw,
      serviceTitle: "Community Engagement and Impact Nexus",
      serviceDesc:
        "We support micro-entrepreneurs in accessing markets and thriving by providing capacity-building initiatives and leveraging digital tools for their growth.",
    },
  ],
  zw = () =>
    u.jsx("section", {
      id: "our-expertise",
      className: "relative pb-[60px] lg:pt-[120px]",
      children: u.jsxs("div", {
        className: "Container",
        children: [
          u.jsxs(Fr, {
            subtitle: "WHAT WE DO",
            children: [
              "Pepper Labs ",
              u.jsx("span", {
                className: "text-AccentText",
                children: "Pillars",
              }),
            ],
          }),
          u.jsx("div", {
            className:
              "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[15px] mt-[60px] md:mt-[80px]",
            children: Aw.map(
              ({ id: e, serviceIcon: t, serviceTitle: n, serviceDesc: r }) =>
                u.jsx(
                  "div",
                  {
                    children: u.jsx(Rw, {
                      serviceIcon: t,
                      serviceTitle: n,
                      serviceDesc: r,
                      serviceUrl: "#",
                    }),
                  },
                  `service-${e}`,
                ),
            ),
          }),
        ],
      }),
    }),
  PepperHistoryJourney = ({ forWho = false } = {}) => {
    const [e, t] = j.useState(0);
    const [pf, setPf] = j.useState({});
    const n = [
      {
        period: "Pre-2017",
        image: "/images/2332.jpg",
        imageAlt: "Masala Wheels social enterprise truck outside its restaurant",
        title: "Masala Wheels",
        description:
          "Pepper Labs began as Masala Wheels, a social enterprise creating employment and growth pathways for at-risk youth.",
        source: "Pepper Labs",
      },
      {
        period: "10 March 2017",
        image: "/images/pepperlabs%20(1).png",
        imageAlt: "Pepper Labs logo",
        title: "Pepper Labs is incorporated",
        description:
          "Pepper Labs Sdn. Bhd. was incorporated in Malaysia.",
        source: "Business Report / CTOS Credit",
      },
      {
        period: "2019",
        image: "/images/timeline/2019-capacity-building.jpg",
        imageAlt: "A trainer presenting to a seated group in a Masala Wheels training room",
        imageCredit: "Vulcan Post",
        title: "Structured capacity-building",
        description:
          "The work expanded to include a Social Entrepreneurship Accelerator for Youths with Jabatan Perdana Menteri and MEDAC, alongside a Business & Digital Accelerator for micro-enterprises.",
        source: "Pepper Labs",
      },
      {
        period: "2020–2021",
        image: "/images/timeline/2020-2021-social-enterprise.jpg",
        imageAlt: "A man holding a sign that reads “Bisnes sosial melangkaui keuntungan, demi kelestarian”",
        imageCredit: "Tatler Asia",
        title: "Growing youth and business pathways",
        description:
          "Pepper Labs ran the Fellowship for Youth Social Entrepreneurs and continued digital-business acceleration for micro-enterprises.",
        source: "Pepper Labs",
      },
      {
        period: "2021–2022",
        image: "/images/timeline/2021-2022-cloud-kitchen-launch.jpg",
        imageAlt: "A certificate presentation at the launch of a cloud kitchen training programme",
        imageCredit: "Malaysiakini",
        title: "Programmes broaden",
        description:
          "Programmes grew to include the Changemaker Youth Accelerator, youth employment through MyStep, and cloud-kitchen training and placement for B40 communities.",
        source: "Pepper Labs",
      },
      {
        period: "Post-pandemic",
        image: "/images/timeline/post-pandemic-shared-kitchen.jpg",
        imageAlt: "Participants cooking together in a shared community kitchen",
        imageCredit: "Vulcan Post",
        title: "Dapur Digital takes shape",
        description:
          "Conceived in response to lost informal incomes during COVID-19 lockdowns, Dapur Digital turns underused spaces in low-cost housing into shared cloud kitchens and learning hubs.",
        source: "DisruptR",
      },
      {
        period: "2023–2024",
        image: "/images/timeline/2023-2024-economic-resilience.jpg",
        imageAlt: "A trainer presenting on a screen to a group of women at a training session",
        imageCredit: "Malaysiakini",
        title: "Building economic resilience",
        description:
          "Pepper Labs delivered financial-literacy programming, continuing its shift from direct youth employment towards broader systems for economic resilience.",
        source: "Pepper Labs",
      },
      {
        period: "2024",
        image: "/images/timeline/2024-first-dapur-digital-kitchens.jpg",
        imageAlt: "A handover ceremony with symbolic keys for the first Dapur Digital kitchens",
        imageCredit: "Bernama",
        title: "First Dapur Digital kitchens",
        description:
          "The first five kitchens were activated. Over roughly 15 months, they generated about RM2 million in sales.",
        source: "DisruptR",
      },
      {
        period: "2025",
        image: "/images/timeline/2025-dapur-digital-expands.jpg",
        imageAlt: "Dapur Digital participants gathered in front of a Dapur Digital mural",
        imageCredit: "Malaysia SME",
        title: "Dapur Digital expands",
        description:
          "Prime Minister Anwar Ibrahim announced funding for 25 additional kitchens in the national budget. Ten more began operating, bringing the total to 15 in Kuala Lumpur, with further state expansion planned for 2026.",
        source: "DisruptR",
      },
      {
        period: "Early 2026",
        image: "/images/timeline/early-2026-training-partnerships.jpg",
        imageAlt: "Programme partners holding certificates beside Pepper Labs banners",
        imageCredit: "Malaysiakini",
        title: "A hybrid impact organisation",
        description:
          "Pepper Labs was positioned as a training provider, technology advocate, and builder of community-based digital cooperatives.",
        source: "DisruptR",
      },
      {
        period: "April 2026",
        image: "/images/timeline/2026-04-ai-opportunity-fund.jpg",
        imageAlt: "Learners at an AI skills training session",
        imageCredit: "Digital News Asia",
        title: "AI Opportunity Fund: Asia-Pacific",
        description:
          "Selected as one of 18 local training providers for Phase 2, backed by AVPN, Google.org, and the Asian Development Bank, to provide free AI upskilling to 50,000 Malaysians. Pepper Labs reported having reached more than 350,000 learners.",
        source: "Digital News Asia",
      },
      {
        period: "14 August 2026",
        image: "/images/timeline/2026-08-rakyat-digital-mou.jpg",
        imageAlt: "Signing of the Rakyat Digital MoU between Pepper Labs and MyDIGITAL Corporation",
        imageCredit: "MyDIGITAL Corporation",
        title: "Rakyat Digital partnership",
        description:
          "At the AI-Ready Malaysia Summit, Pepper Labs and MyDIGITAL Corporation signed an MoU for Rakyat Digital, linking the national Digital Learning Hub with Dapur Digital community hubs.",
        source: "MREM / Bernama",
      },
      {
        period: "19 August 2026",
        image: "/images/timeline/2026-08-ai-ready-malaysia.jpg",
        imageAlt: "A speaker at the AI-Ready Malaysia launch, beside Pepper Labs and AI-Ready Malaysia banners",
        imageCredit: "Pokde.net",
        title: "11 years and 50,000 AI learning opportunities",
        description:
          "Pepper Labs marked its 11th anniversary and launched 50,000 AI learning opportunities under AI-Ready Malaysia. It also showcased Bisnes.ai and more than 40 agentic-AI solutions for government use.",
        source: "Tech-Critter",
      },
      {
        period: "13 October 2026",
        image: "/images/timeline/2026-10-agentic-ai.jpg",
        imageAlt: "The Bisnes.ai assistant home screen",
        imageCredit: "Bisnes.ai (screenshot)",
        title: "Expanding into AI solutioning",
        description:
          "Pepper Labs formally announced Malaysian-built agentic AI for the public sector and bespoke sovereign AI platforms for enterprises and MSMEs.",
        source: "Focus Malaysia",
      },
    ];
    const r = n[e];
    const hasImg = !!r.image && !pf[r.image];
    return u.jsxs("section", {
      id: "pepper-labs-journey",
      className: `pl-history-section${forWho ? " pl-history-section--who" : ""}`,
      children: [
        u.jsxs("div", {
          className: "Container",
          children: [
            u.jsxs("header", {
              className: "pl-history-heading",
              children: [
                u.jsx("p", {
                  className: "pl-history-eyebrow",
                  children: "OUR ROOTS",
                }),
                u.jsx("h2", {
                  children: forWho
                    ? "Our story, over time."
                    : "A journey shaped by people and possibility.",
                }),
              ],
            }),
            u.jsxs("div", {
              className: "pl-history-stage",
              children: [
                u.jsx("div", {
                  className: "pl-history-stage-glow",
                  "aria-hidden": "true",
                }),
                u.jsxs("div", {
                  key: e,
                  className: `pl-history-feature${hasImg ? " has-media" : ""}`,
                  "aria-live": "polite",
                  role: "tabpanel",
                  id: "pepper-history-panel",
                  "aria-labelledby": `pepper-history-point-${e}`,
                  children: [
                    hasImg &&
                      u.jsxs("figure", {
                        className: "pl-history-media",
                        children: [
                          u.jsx("img", {
                            src: r.image,
                            alt: r.imageAlt || "",
                            loading: "lazy",
                            decoding: "async",
                            onError: () =>
                              setPf((x) => ({ ...x, [r.image]: true })),
                          }),
                          r.imageCredit &&
                            u.jsx("figcaption", {
                              className: "pl-history-photo-credit",
                              children: `Photo: ${r.imageCredit}`,
                            }),
                        ],
                      }),
                    u.jsxs("div", {
                      className: "pl-history-copy",
                      children: [
                        u.jsx("p", {
                          className: "pl-history-period",
                          children: r.period,
                        }),
                        u.jsx("h3", { children: r.title }),
                        u.jsx("p", {
                          className: "pl-history-description",
                          children: r.description,
                        }),
                        u.jsx("p", {
                          className: "pl-history-source",
                          children: r.source,
                        }),
                      ],
                    }),
                  ],
                }),
                u.jsxs("div", {
                  className: "pl-history-navigation",
                  children: [
                    u.jsxs("div", {
                      className: "pl-history-active-label",
                      children: [
                        u.jsx("span", {
                          children: String(e + 1).padStart(2, "0"),
                        }),
                        u.jsx("span", { children: r.period }),
                      ],
                    }),
                    u.jsx("div", {
                      className: "pl-history-track",
                      role: "tablist",
                      "aria-label": "Pepper Labs chronology",
                      children: n.map((i, l) =>
                        u.jsx(
                          "button",
                          {
                            type: "button",
                            id: `pepper-history-point-${l}`,
                            role: "tab",
                            "aria-label": `${i.period}: ${i.title}`,
                            "aria-selected": e === l,
                            "aria-controls": "pepper-history-panel",
                            className: `pl-history-point${e === l ? " is-active" : ""}`,
                            onClick: () => {
                              t(l);
                              const a = document.getElementById(
                                `pepper-history-point-${l}`,
                              );
                              if (a)
                                a.scrollIntoView({
                                  behavior: "smooth",
                                  block: "nearest",
                                  inline: "center",
                                });
                            },
                            children: u.jsx("span", {
                              className: "pl-history-dot",
                            }),
                          },
                          i.period,
                        ),
                      ),
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    });
  },
  Fw = () =>
    u.jsxs(j.Fragment, {
      children: [
        u.jsx(s1, {}),
        u.jsx(gy, {}),
        u.jsx(zw, {}),
        u.jsx(Dw, {}),
        u.jsx(hh, {}),
        u.jsx(PepperHistoryJourney, {}),
        u.jsx(Yu, {}),
        u.jsx(Ku, {}),
        u.jsx(Ba, {}),
      ],
    }),
  Bw = () =>
    u.jsx("section", {
      id: "our-community",
      className: "project relative z-10 pb-[60px] sm:pb-[120px] bg-white",
      children: u.jsxs("div", {
        className:
          "Container flex flex-col lg:flex-row-reverse gap-5 sm:gap-10",
        children: [
          u.jsx("div", {
            className: "flex-1 basis-0",
            children: u.jsx("img", {
              src: "/assets/figma/about-us-2.webp",
              className: "h-full w-full object-cover",
            }),
          }),
          u.jsxs("div", {
            className: "flex-1 basis-0",
            children: [
              u.jsxs("div", {
                className: "text-left",
                children: [
                  u.jsx("h5", {
                    className:
                      "font-primary text-[12px] md:text-[14px] tracking-[3px] font-semibold text-SubtitleText",
                    children: "OUR JOURNEY",
                  }),
                  u.jsx("div", {
                    className:
                      "font-primary font-bold text-[24px] md:text-[32px] text-HeadingColor-0 mt-[5px]",
                    children: "From Vision to Reality",
                  }),
                ],
              }),
              u.jsxs("div", {
                className:
                  "mt-[10px] text-left text-sm md:text-base font-normal font-primary",
                children: [
                  "Founded with the mission to uplift underserved communities, we began as Masala Wheels, a social enterprise dedicated to creating opportunities for at-risk youth by providing employment and a platform for growth. Over time, we built a connected F&B ecosystem and expanded into capacity-building initiatives that empower communities through skills training and enhanced physical and digital infrastructure.",
                  u.jsx("br", {}),
                  u.jsx("br", {}),
                  "Today, we lead initiatives across Malaysia and the region, beyond individual interventions to create scalable systems that address the interconnected challenges faced by underserved communities. We are focusing on bridging gaps between policy, technology, and people to create long-lasting impact.",
                ],
              }),
            ],
          }),
        ],
      }),
    }),
  Uw = () =>
    u.jsx("section", {
      id: "our-purpose",
      className:
        "project relative z-10 pt-[10px] sm:pt-[60px] pb-[60px] sm:pb-[120px] bg-white",
      children: u.jsxs("div", {
        className: "Container flex flex-col lg:flex-row gap-5 sm:gap-10",
        children: [
          u.jsx("div", {
            className: "flex-1 basis-0",
            children: u.jsx("img", {
              src: "/assets/figma/about-us.webp",
              className: "h-full w-full object-cover",
            }),
          }),
          u.jsxs("div", {
            className: "flex-1 basis-0",
            children: [
              u.jsxs("div", {
                className: "text-left",
                children: [
                  u.jsx("h5", {
                    className:
                      "font-primary text-[12px] md:text-[14px] tracking-[3px] font-semibold text-SubtitleText",
                    children: "ABOUT US",
                  }),
                  u.jsx("div", {
                    className:
                      "font-primary font-bold text-[24px] md:text-[32px] text-HeadingColor-0 mt-[5px]",
                    children: "Our Purpose and Principles",
                  }),
                ],
              }),
              u.jsxs("div", {
                className:
                  "mt-[10px] text-left text-sm md:text-base font-normal font-primary",
                children: [
                  "Pepper Labs is committed to transforming lives and building resilient communities through innovative and sustainable solutions. Starting as an accredited social enterprise in F&B capacity development, we have grown into a dynamic Impact Strategist that addresses critical societal challenges through comprehensive value creation and end-to-end solutions. Our work aligns with the principles of the United Nations Sustainable Development Goals (SDGs), which are integrated into every facet of our programs.",
                  u.jsx("br", {}),
                  u.jsx("br", {}),
                  "We mobilise public, private, philanthropic, and grassroots partnerships to design and implement impactful interventions that uplift underserved and underemployed communities, foster entrepreneurship and advance sustainable development. By aligning our efforts with Environmental, Social, and Governance (ESG) principles, Pepper Labs ensures that our initiatives are not only impactful but also equitable, ethical and environmentally conscious.",
                ],
              }),
            ],
          }),
        ],
      }),
    });
function qu(e) {
  return (t) => !!t.type && t.type.tabsRole === e;
}
const Ua = qu("Tab"),
  Ju = qu("TabList"),
  Zu = qu("TabPanel");
function Hw(e) {
  return Ua(e) || Ju(e) || Zu(e);
}
function Uo(e, t) {
  return j.Children.map(e, (n) =>
    n === null
      ? null
      : Hw(n)
        ? t(n)
        : n.props && n.props.children && typeof n.props.children == "object"
          ? j.cloneElement(n, { ...n.props, children: Uo(n.props.children, t) })
          : n,
  );
}
function gh(e, t) {
  return j.Children.forEach(e, (n) => {
    n !== null &&
      (Ua(n) || Zu(n)
        ? t(n)
        : n.props &&
          n.props.children &&
          typeof n.props.children == "object" &&
          (Ju(n) && t(n), gh(n.props.children, t)));
  });
}
function vh(e) {
  var t,
    n,
    r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var i = e.length;
      for (t = 0; t < i; t++)
        e[t] && (n = vh(e[t])) && (r && (r += " "), (r += n));
    } else for (n in e) e[n] && (r && (r += " "), (r += n));
  return r;
}
function Ha() {
  for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++)
    (e = arguments[n]) && (t = vh(e)) && (r && (r += " "), (r += t));
  return r;
}
function xh(e) {
  let t = 0;
  return (
    gh(e, (n) => {
      Ua(n) && t++;
    }),
    t
  );
}
function yh(e) {
  return e && "getAttribute" in e;
}
function of(e) {
  return yh(e) && e.getAttribute("data-rttab");
}
function Rn(e) {
  return yh(e) && e.getAttribute("aria-disabled") === "true";
}
let ba;
function Vw(e) {
  const t = e || (typeof window < "u" ? window : void 0);
  try {
    ba = !!(typeof t < "u" && t.document && t.document.activeElement);
  } catch {
    ba = !1;
  }
}
const Ww = { className: "react-tabs", focus: !1 },
  wh = (e) => {
    let t = j.useRef([]),
      n = j.useRef([]);
    const r = j.useRef();
    function i(D, A) {
      if (D < 0 || D >= c()) return;
      const { onSelect: W, selectedIndex: K } = e;
      W(D, K, A);
    }
    function l(D) {
      const A = c();
      for (let W = D + 1; W < A; W++) if (!Rn(d(W))) return W;
      for (let W = 0; W < D; W++) if (!Rn(d(W))) return W;
      return D;
    }
    function a(D) {
      let A = D;
      for (; A--; ) if (!Rn(d(A))) return A;
      for (A = c(); A-- > D; ) if (!Rn(d(A))) return A;
      return D;
    }
    function s() {
      const D = c();
      for (let A = 0; A < D; A++) if (!Rn(d(A))) return A;
      return null;
    }
    function o() {
      let D = c();
      for (; D--; ) if (!Rn(d(D))) return D;
      return null;
    }
    function c() {
      const { children: D } = e;
      return xh(D);
    }
    function d(D) {
      return t.current[`tabs-${D}`];
    }
    function p() {
      let D = 0;
      const {
        children: A,
        disabledTabClassName: W,
        focus: K,
        forceRenderTabPanel: Z,
        selectedIndex: R,
        selectedTabClassName: z,
        selectedTabPanelClassName: $,
        environment: q,
      } = e;
      n.current = n.current || [];
      let ie = n.current.length - c();
      const Pe = j.useId();
      for (; ie++ < 0; ) n.current.push(`${Pe}${n.current.length}`);
      return Uo(A, (ce) => {
        let De = ce;
        if (Ju(ce)) {
          let ve = 0,
            Ke = !1;
          ba == null && Vw(q);
          const Nn = q || (typeof window < "u" ? window : void 0);
          (ba &&
            Nn &&
            (Ke = le.Children.toArray(ce.props.children)
              .filter(Ua)
              .some((Ki, Br) => Nn.document.activeElement === d(Br))),
            (De = j.cloneElement(ce, {
              children: Uo(ce.props.children, (Ki) => {
                const Br = `tabs-${ve}`,
                  Yi = R === ve,
                  Re = {
                    tabRef: (qt) => {
                      t.current[Br] = qt;
                    },
                    id: n.current[ve],
                    selected: Yi,
                    focus: Yi && (K || Ke),
                  };
                return (
                  z && (Re.selectedClassName = z),
                  W && (Re.disabledClassName = W),
                  ve++,
                  j.cloneElement(Ki, Re)
                );
              }),
            })));
        } else if (Zu(ce)) {
          const ve = { id: n.current[D], selected: R === D };
          (Z && (ve.forceRender = Z),
            $ && (ve.selectedClassName = $),
            D++,
            (De = j.cloneElement(ce, ve)));
        }
        return De;
      });
    }
    function h(D) {
      const { direction: A, disableUpDownKeys: W, disableLeftRightKeys: K } = e;
      if (x(D.target)) {
        let { selectedIndex: Z } = e,
          R = !1,
          z = !1;
        ((D.code === "Space" ||
          D.keyCode === 32 ||
          D.code === "Enter" ||
          D.keyCode === 13) &&
          ((R = !0), (z = !1), v(D)),
          (!K && (D.keyCode === 37 || D.code === "ArrowLeft")) ||
          (!W && (D.keyCode === 38 || D.code === "ArrowUp"))
            ? (A === "rtl" ? (Z = l(Z)) : (Z = a(Z)), (R = !0), (z = !0))
            : (!K && (D.keyCode === 39 || D.code === "ArrowRight")) ||
                (!W && (D.keyCode === 40 || D.code === "ArrowDown"))
              ? (A === "rtl" ? (Z = a(Z)) : (Z = l(Z)), (R = !0), (z = !0))
              : D.keyCode === 35 || D.code === "End"
                ? ((Z = o()), (R = !0), (z = !0))
                : (D.keyCode === 36 || D.code === "Home") &&
                  ((Z = s()), (R = !0), (z = !0)),
          R && D.preventDefault(),
          z && i(Z, D));
      }
    }
    function v(D) {
      let A = D.target;
      do
        if (x(A)) {
          if (Rn(A)) return;
          const W = [].slice.call(A.parentNode.children).filter(of).indexOf(A);
          i(W, D);
          return;
        }
      while ((A = A.parentNode) != null);
    }
    function x(D) {
      if (!of(D)) return !1;
      let A = D.parentElement;
      do {
        if (A === r.current) return !0;
        if (A.getAttribute("data-rttabs")) break;
        A = A.parentElement;
      } while (A);
      return !1;
    }
    const {
      children: b,
      className: N,
      disabledTabClassName: g,
      domRef: f,
      focus: m,
      forceRenderTabPanel: w,
      onSelect: T,
      selectedIndex: L,
      selectedTabClassName: y,
      selectedTabPanelClassName: C,
      environment: M,
      disableUpDownKeys: P,
      disableLeftRightKeys: _,
      ...F
    } = { ...Ww, ...e };
    return le.createElement(
      "div",
      Object.assign({}, F, {
        className: Ha(N),
        onClick: v,
        onKeyDown: h,
        ref: (D) => {
          ((r.current = D), f && f(D));
        },
        "data-rttabs": !0,
      }),
      p(),
    );
  };
wh.propTypes = {};
const $w = 0,
  zl = 1,
  Gw = {
    defaultFocus: !1,
    focusTabOnClick: !0,
    forceRenderTabPanel: !1,
    selectedIndex: null,
    defaultIndex: null,
    environment: null,
    disableUpDownKeys: !1,
    disableLeftRightKeys: !1,
  },
  Kw = (e) => (e.selectedIndex === null ? zl : $w),
  ec = (e) => {
    const {
        children: t,
        defaultFocus: n,
        defaultIndex: r,
        focusTabOnClick: i,
        onSelect: l,
        ...a
      } = { ...Gw, ...e },
      [s, o] = j.useState(n),
      [c] = j.useState(Kw(a)),
      [d, p] = j.useState(c === zl ? r || 0 : null);
    if (
      (j.useEffect(() => {
        o(!1);
      }, []),
      c === zl)
    ) {
      const x = xh(t);
      j.useEffect(() => {
        if (d != null) {
          const b = Math.max(0, x - 1);
          p(Math.min(d, b));
        }
      }, [x]);
    }
    const h = (x, b, N) => {
      (typeof l == "function" && l(x, b, N) === !1) ||
        (i && o(!0), c === zl && p(x));
    };
    let v = { ...e, ...a };
    return (
      (v.focus = s),
      (v.onSelect = h),
      d != null && (v.selectedIndex = d),
      delete v.defaultFocus,
      delete v.defaultIndex,
      delete v.focusTabOnClick,
      le.createElement(wh, v, t)
    );
  };
ec.propTypes = {};
ec.tabsRole = "Tabs";
const Yw = { className: "react-tabs__tab-list" },
  tc = (e) => {
    const { children: t, className: n, ...r } = { ...Yw, ...e };
    return le.createElement(
      "ul",
      Object.assign({}, r, { className: Ha(n), role: "tablist" }),
      t,
    );
  };
tc.tabsRole = "TabList";
tc.propTypes = {};
const zs = "react-tabs__tab",
  Qw = {
    className: zs,
    disabledClassName: `${zs}--disabled`,
    focus: !1,
    id: null,
    selected: !1,
    selectedClassName: `${zs}--selected`,
  },
  nc = (e) => {
    let t = j.useRef();
    const {
      children: n,
      className: r,
      disabled: i,
      disabledClassName: l,
      focus: a,
      id: s,
      selected: o,
      selectedClassName: c,
      tabIndex: d,
      tabRef: p,
      ...h
    } = { ...Qw, ...e };
    return (
      j.useEffect(() => {
        o && a && t.current.focus();
      }, [o, a]),
      le.createElement(
        "li",
        Object.assign({}, h, {
          className: Ha(r, { [c]: o, [l]: i }),
          ref: (v) => {
            ((t.current = v), p && p(v));
          },
          role: "tab",
          id: `tab${s}`,
          "aria-selected": o ? "true" : "false",
          "aria-disabled": i ? "true" : "false",
          "aria-controls": `panel${s}`,
          tabIndex: d || (o ? "0" : null),
          "data-rttab": !0,
        }),
        n,
      )
    );
  };
nc.propTypes = {};
nc.tabsRole = "Tab";
const uf = "react-tabs__tab-panel",
  Xw = { className: uf, forceRender: !1, selectedClassName: `${uf}--selected` },
  yi = (e) => {
    const {
      children: t,
      className: n,
      forceRender: r,
      id: i,
      selected: l,
      selectedClassName: a,
      ...s
    } = { ...Xw, ...e };
    return le.createElement(
      "div",
      Object.assign({}, s, {
        className: Ha(n, { [a]: l }),
        role: "tabpanel",
        id: `panel${i}`,
        "aria-labelledby": `tab${i}`,
      }),
      r || l ? t : null,
    );
  };
yi.tabsRole = "TabPanel";
yi.propTypes = {};
const qw = () => {
    const [e, t] = j.useState(0);
    return u.jsx("section", {
      id: "our-solutions",
      className:
        "project relative z-10 pt-[30px] sm:pt-[60px] pb-[60px] sm:pb-[120px] mb-[30px] sm:mb-0 bg-[#F8F8F8]",
      children: u.jsxs("div", {
        className: "Container",
        children: [
          u.jsxs("div", {
            className: "text-center",
            children: [
              u.jsx("h5", {
                className:
                  "font-primary text-[12px] md:text-[14px] tracking-[3px] font-semibold text-SubtitleText",
                children: "OUR APPROACH",
              }),
              u.jsx("div", {
                className:
                  "font-primary font-bold text-[24px] md:text-[32px] text-HeadingColor-0 mt-[5px]",
                children: "How we work",
              }),
            ],
          }),
          u.jsx("div", {
            className: "mt-[30px] sm:mt-[60px]",
            children: u.jsxs(ec, {
              selectedIndex: e,
              children: [
                u.jsxs(tc, {
                  className: "flex flex-wrap gap-5 justify-between",
                  children: [
                    u.jsx(Fs, {
                      active: e === 0,
                      index: 0,
                      setSelectedTab: t,
                      children: "Shaping policy",
                    }),
                    u.jsx(Fs, {
                      active: e === 1,
                      index: 1,
                      setSelectedTab: t,
                      children: "Building skills",
                    }),
                    u.jsx(Fs, {
                      active: e === 2,
                      index: 2,
                      setSelectedTab: t,
                      children: "Community impact",
                    }),
                  ],
                }),
                u.jsxs(yi, {
                  className: "flex flex-col gap-5 justify-center items-center",
                  children: [
                    u.jsxs("div", {
                      className:
                        "mt-[30px] sm:mt-[60px] text-left text-sm md:text-base font-normal font-primary",
                      children: [
                        "We drive systemic change by working with the public, private, and third sectors to co-create policies and programs that empower communities. Our contributions to national frameworks, including the Social Enterprise Accreditation System, Dasar Keusahawanan Negara, and Rancangan Malaysia Kedua Belas (RMK-12), reflect our expertise in influencing inclusive policymaking.",
                        u.jsx("br", {}),
                        u.jsx("br", {}),
                        "Our work includes pivotal roles in multiple round table discussions with the Government of Malaysia, shaping many socio-economic development policies and annual national budget input that catalyse change at scale. As a preferred social enterprise with systems-change knowledge, we have become a trusted partner for advancing economic equity and sustainable growth.",
                        u.jsx("br", {}),
                        u.jsx("br", {}),
                        "Our co-founder",
                        "'",
                        "s participation in the Obama Foundation Leadership Program underscores our commitment to fostering inclusive capitalism. By engaging with our partners, we continue to build skills, scale work, and create pathways for impactful solutions that drive systemic change. We are actively advancing SDG 1 and promoting sustainable governance by addressing economic disparity and social inequities.",
                      ],
                    }),
                    u.jsx(ee, {
                      to: "/our-expertise",
                      children: u.jsxs("button", {
                        className: "primary-btn2",
                        children: ["Read More", u.jsx(vi, { size: "20" })],
                      }),
                    }),
                  ],
                }),
                u.jsxs(yi, {
                  className: "flex flex-col gap-5 justify-center items-center",
                  children: [
                    u.jsxs("div", {
                      className:
                        "mt-[30px] sm:mt-[60px] text-left text-sm md:text-base font-normal font-primary",
                      children: [
                        "We bring a wealth of experience and practical insights to empower micro-entrepreneurs and individuals seeking to enhance their employability with a foundation built on overcoming the challenges of growing a business from the ground up. We enable them to excel in entrepreneurial ventures or thrive in dynamic and competitive employment markets.",
                        u.jsx("br", {}),
                        u.jsx("br", {}),
                        "Our skills development initiatives focus on equipping individuals with tools to excel in entrepreneurial ventures and emerging career paths. By enhancing employability and readiness for modern industries, we foster upskilling, reskilling, and cross-skilling opportunities. Professional certifications, central to our model, ensure participants gain industry-recognized credentials, opening doors to credibility and growth in competitive markets.",
                        u.jsx("br", {}),
                        u.jsx("br", {}),
                        "Through experiential learning, professional apprenticeships, and tailored mentorship, we align with SDG 4 by advancing education and SDG 8 by driving economic growth, fostering entrepreneurship, and creating decent work opportunities.",
                      ],
                    }),
                    u.jsx(ee, {
                      to: "/our-expertise",
                      children: u.jsxs("button", {
                        className: "primary-btn2",
                        children: ["Read More", u.jsx(vi, { size: "20" })],
                      }),
                    }),
                  ],
                }),
                u.jsxs(yi, {
                  className: "flex flex-col gap-5 justify-center items-center",
                  children: [
                    u.jsxs("div", {
                      className:
                        "mt-[30px] sm:mt-[60px] text-left text-sm md:text-base font-normal font-primary",
                      children: [
                        "We catalyse entrepreneurship to eradicate poverty and create equitable opportunities, addressing diverse community needs with a holistic approach. We empower micro-entrepreneurs by equipping them with essential skills, knowledge, and resources for success in competitive markets. Focusing on sustainable income generation, particularly for underserved populations, creates pathways out of poverty and toward self-reliance.",
                        u.jsx("br", {}),
                        u.jsx("br", {}),
                        "Expanding our vision, we are venturing into the design and construction of physical and digital infrastructure, creating smart community spaces aligned with SDG 11 (Sustainable Cities and Communities). These hubs are strategically planned to form connected impact ecosystems that integrate skills development, entrepreneurship, and innovation across Malaysia.",
                        u.jsx("br", {}),
                        u.jsx("br", {}),
                        "In this approach, we emphasise inclusive growth, equipping participants with digital tools to foster economic resilience. By connecting communities and resources, we contribute to SDG 1 (No Poverty) and SDG 5 (Gender Equality), ensuring access to opportunities for all.",
                      ],
                    }),
                    u.jsx(ee, {
                      to: "/our-expertise",
                      children: u.jsxs("button", {
                        className: "primary-btn2",
                        children: ["Read More", u.jsx(vi, { size: "20" })],
                      }),
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
    });
  },
  Fs = ({ active: e, index: t, setSelectedTab: n, children: r }) =>
    u.jsx(nc, {
      onClick: () => n(t),
      className: Wn(
        "cursor-pointer w-full md:w-auto md:flex-1 md:basis-0 flex justify-center items-center p-5 text-sm font-bold rounded card-shadow text-center",
        {
          "bg-primary-500 text-white": e,
          "bg-white text-PrimaryText about-tab-btn": !e,
        },
      ),
      children: r,
    }),
  PepperWhoStoryHero = () =>
    u.jsxs("section", {
      className: "pl-who-hero",
      children: [
        u.jsxs("div", {
          className: "Container pl-who-hero-inner",
          children: [
            u.jsxs("div", {
              className: "pl-who-hero-copy",
              children: [
                u.jsx("p", {
                  className: "pl-who-eyebrow",
                  children: "WHO WE ARE",
                }),
                u.jsxs("h1", {
                  children: [
                    "From Masala Wheels to ",
                    u.jsx("span", { children: "impact strategists." }),
                  ],
                }),
                u.jsx("p", {
                  className: "pl-who-lede",
                  children:
                    "Pepper Labs began with a simple belief: people facing barriers deserve pathways to build skills, earn a living, and shape their own futures. Today, we work across sectors to turn that belief into lasting, community-led change.",
                }),
                u.jsx("p", {
                  className: "pl-who-summary",
                  children:
                    "We are a Malaysian social enterprise and impact strategist, bringing communities, government, and businesses together to build more inclusive systems.",
                }),
              ],
            }),
            u.jsxs("div", {
              className: "pl-who-hero-art",
              "aria-hidden": "true",
              children: [
                u.jsx("div", { className: "pl-who-art-orbit" }),
                u.jsx("div", { className: "pl-who-art-mark", children: "P" }),
                u.jsxs("div", {
                  className: "pl-who-art-caption",
                  children: [
                    u.jsx("span", { children: "ROOTED IN COMMUNITY" }),
                    u.jsx("strong", { children: "Built for lasting impact." }),
                  ],
                }),
              ],
            }),
          ],
        }),
        u.jsx("div", {
          className: "pl-who-ribbon",
          children: u.jsx("div", {
            className: "Container",
            children: u.jsxs("p", {
              children: [
                u.jsx("strong", { children: "11 years" }),
                " of building pathways to inclusive growth",
              ],
            }),
          }),
        }),
      ],
    }),
  Jw = () =>
    u.jsxs("main", {
      className: "pl-who-page",
      children: [
        u.jsx(PepperWhoStoryHero, {}),
        u.jsx(PepperHistoryJourney, { forWho: !0 }),
        u.jsx(hh, { forWho: !0 }),
        u.jsx(qw, {}),
        u.jsx(Yu, {}),
        u.jsx(Ku, {}),
        u.jsx(Ba, {}),
      ],
    }),
  Zw = ({ breadCrumbTitle: e, url: t, breadCrumbLink: n }) =>
    u.jsx("div", {
      className:
        "bg-primary-500 flex items-center justify-center h-[300px] sm:h-[300px]",
      children: u.jsxs("div", {
        className: "Container flex flex-col justify-center items-center gap-5",
        children: [
          u.jsx("h1", {
            className:
              "font-primary font-bold text-4xl sm:text-[44px] md:text-[48px] leading-[56.2px] text-white capitalize",
            children: e,
          }),
          u.jsx("div", {
            className: "inline-block px-8",
            children: u.jsxs("ul", {
              className:
                "flex flex-row gap-2 sm:gap-4 sm:items-center justify-center",
              children: [
                u.jsx("li", {
                  children: u.jsx(ee, {
                    to: "/",
                    children: u.jsx("button", {
                      className:
                        "font-primary text-[16px] text-white flex items-center gap-2 transition-all duration-500 hover:text-primary-500",
                      children: "Home",
                    }),
                  }),
                }),
                u.jsx("li", {
                  children: u.jsx("div", {
                    className: "text-white block",
                    children: "/",
                  }),
                }),
                u.jsx("li", {
                  children: u.jsx(ee, {
                    to: t,
                    children: u.jsx("button", {
                      className:
                        "font-primary text-[16px] capitalize text-white",
                      children: n,
                    }),
                  }),
                }),
              ],
            }),
          }),
        ],
      }),
    }),
  e2 = ({ breadCrumbTitle: e, url: t, breadCrumbLink: n }) =>
    u.jsx("div", {
      className:
        "bg-[url('/assets/figma/contact-banner.png')] bg-no-repeat bg-cover bg-center flex items-center justify-center h-[400px] sm:h-[361px]",
      children: u.jsxs("div", {
        className: "Container flex flex-col justify-center items-center gap-5",
        children: [
          u.jsx("h1", {
            className:
              "font-primary font-bold text-4xl sm:text-[44px] md:text-[48px] leading-[56.2px] text-white capitalize",
            children: e,
          }),
          u.jsx("div", {
            className: "inline-block px-8",
            children: u.jsxs("ul", {
              className:
                "flex flex-row gap-2 sm:gap-4 sm:items-center justify-center",
              children: [
                u.jsx("li", {
                  children: u.jsx(ee, {
                    to: "/",
                    children: u.jsx("button", {
                      className:
                        "font-primary text-[16px] text-white flex items-center gap-2 transition-all duration-500 hover:text-primary-500",
                      children: "Home",
                    }),
                  }),
                }),
                u.jsx("li", {
                  children: u.jsx("div", {
                    className: "text-white block",
                    children: "/",
                  }),
                }),
                u.jsx("li", {
                  children: u.jsx(ee, {
                    to: t,
                    children: u.jsx("button", {
                      className:
                        "font-primary text-[16px] capitalize text-white",
                      children: n,
                    }),
                  }),
                }),
              ],
            }),
          }),
        ],
      }),
    }),
  t2 = () => {
    const [e, t] = j.useState(!1),
      n = (r) => {
        (r.preventDefault(),
          e ||
            (l1
              .sendForm(
                "service_gvp8jj7",
                "template_jmei4eu",
                r.target,
                "bmIoyvdrr__EB4dW3",
              )
              .then(
                (i) => {
                  console.log(i.text);
                },
                (i) => {
                  console.log(i.text);
                },
              ),
            r.target.reset(),
            t(!0)));
      };
    return u.jsx("div", {
      className: "Container py-[100px]",
      children: u.jsxs("div", {
        className: "grid grid-cols-2 lg:grid-cols-8 gap-10",
        children: [
          u.jsxs("div", {
            className: "col-span-2 lg:col-span-4 overflow-hidden inline-block",
            children: [
              u.jsx("h1", {
                className:
                  "font-primary font-bold text-PrimaryText text-[24px] md:text-[32px] xl:text-[40px] xl:leading-[52px] pl-[20px] md:pl-[30px] border-l-4 border-[#EA9B00]",
                children:
                  "Obtaining further information by make a contact with our staffs.",
              }),
              u.jsxs("p", {
                className:
                  "text-[14px] xl:text-[18px] xl:leading-[32px] font-normal text-PrimaryText mt-5",
                children: [
                  "We",
                  "'",
                  "re available for 8 hours a day!",
                  u.jsx("br", {}),
                  "Contact us for any inquiries.",
                ],
              }),
            ],
          }),
          u.jsx("div", {
            className: "col-span-4",
            children: u.jsxs("form", {
              action: "",
              onSubmit: n,
              onKeyDown: (r) => {
                r.key === "Enter" && r.preventDefault();
              },
              className: "flex flex-col gap-5",
              children: [
                u.jsxs("div", {
                  className: "flex flex-col md:flex-row gap-5",
                  children: [
                    u.jsx("input", {
                      type: "text",
                      name: "name",
                      id: "name",
                      placeholder: "Your Name *",
                      required: !0,
                      className:
                        "bg-[#F8F8F8] rounded-[5px] py-[15px] px-5 outline-none h-[56px] w-full",
                    }),
                    u.jsx("input", {
                      type: "email",
                      name: "email",
                      id: "email",
                      placeholder: "Your E-Mail *",
                      required: !0,
                      className:
                        "bg-[#F8F8F8] rounded-[5px] py-[15px] px-5 outline-none h-[56px] w-full",
                    }),
                  ],
                }),
                u.jsx("div", {
                  className: "flex flex-col md:flex-row gap-5",
                  children: u.jsx("input", {
                    type: "text",
                    name: "subject",
                    id: "subject",
                    placeholder: "Subject *",
                    required: !0,
                    className:
                      "bg-[#F8F8F8] rounded-[5px] py-[15px] px-5 outline-none h-[56px] w-full",
                  }),
                }),
                u.jsx("textarea", {
                  name: "message",
                  id: "message",
                  placeholder: "Write A Message...",
                  className:
                    "bg-[#F8F8F8] rounded-[5px] py-[15px] px-5 outline-none resize-none h-[140px] w-full",
                }),
                u.jsxs("div", {
                  className: "inline-block",
                  children: [
                    u.jsx("button", {
                      type: "submit",
                      className: Wn("primary-btn2", {
                        "!bg-neutral-500 hover:!border-neutral-500 !border-neutral-500 before:!bg-neutral-500 cursor-not-allowed":
                          e,
                        "!bg-primary-500 hover:!border-secondary-500 !border-primary-500 before:!bg-secondary-500":
                          !e,
                      }),
                      disabled: e,
                      children: "Send Message",
                    }),
                    e &&
                      u.jsxs("div", {
                        className: "mt-3 text-[14px] text-SecondaryText",
                        children: [
                          "Message sent successfully! ",
                          u.jsx("br", {}),
                          "Thanks for your message, we will reach out to you soon.",
                        ],
                      }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
    });
  },
  n2 = () =>
    u.jsx("section", {
      children: u.jsx("div", {
        className: "relative",
        children: u.jsx("iframe", {
          src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15934.730370215644!2d101.66676127417747!3d3.1779699355036506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc48133ce4fd41%3A0x677bd9b8743624f2!2sViva%20Residency%2C%20Jalan%20Ipoh%2C%2051200%20Kuala%20Lumpur%2C%20Wilayah%20Persekutuan%20Kuala%20Lumpur!5e0!3m2!1sen!2smy!4v1737830654175!5m2!1sen!2smy",
          width: "100%",
          height: "552",
          allowFullScreen: "",
          loading: "lazy",
          referrerPolicy: "no-referrer-when-downgrade",
          className: "rounded-lg w-full",
        }),
      }),
    }),
  r2 = () =>
    u.jsxs(u.Fragment, {
      children: [
        u.jsx(e2, {
          breadCrumbTitle: "Work With Us",
          breadCrumbLink: "Work With Us",
          url: "/work-with-us",
        }),
        u.jsx(t2, {}),
        u.jsx(n2, {}),
      ],
    }),
  bl = [
    {
      title: "National Partnerships:",
      links: [
        { title: "Round Table Dialogues for EAC Policy Input / RMKe-12" },
        {
          title:
            "Member of the Poverty Circle (EPU) since 2021 - Contributing to the RMKe12 Mid-Term Review",
        },
        {
          title:
            "Contributors to Dasar Keusahawanan Negara (DKN 2030) & SEMy 2030",
        },
        {
          title:
            "Contributors to the Social Enterprise Accreditation System since 2019",
        },
        {
          title:
            "Co-founded the Malaysian Chamber for Social Entrepreneur Development (MCSED) and the Social Entrepreneur Development Association with credible council members",
        },
        {
          title:
            "Contributors to National Budgets (2019-2023) for Social Enterprises (SEs)",
        },
        { title: "Contributors to PRIHATIN/ PENJANA 2020" },
        {
          title:
            "Strategic Cloud Kitchen Program 2023, announced in Parliament",
        },
      ],
    },
    {
      title: "Global Partnerships:",
      links: [
        {
          title:
            "Sole Asian Member of President Obama's Inclusive Capitalism Working Group",
        },
        {
          title:
            "Incubation Board Member of Catalyst 2030 (World Economic Forum)",
        },
        {
          title: "Founding Member of ASEAN & Malaysia Chapter (Catalyst 2030)",
        },
      ],
    },
  ],
  i2 = [
    {
      title: "Social Entrepreneurship Accelerator for Youths (2019)",
      desc: ["(Jabatan Perdana Menteri & MEDAC)"],
    },
    {
      title: "Fellowship for Youth Social Entrepreneurs (2020-2021)",
      desc: [
        `This mentorship-driven initiative empowered youth social
  entrepreneurs to build impactful, sustainable businesses and scale
  their ventures effectively.`,
        "(MAGIC and Kementerian Perpaduan Negara)",
      ],
    },
    {
      title: "The Changemaker Youth Accelerator (2021-2022)",
      desc: ["(APPGM-SDG & Parliament Malaysia)"],
    },
    {
      title:
        "Short-Term Employment Accelerator for Youths (MyStep) (2022-2023)",
      desc: ["(Khazanah Nasional Berhad - Sustainability Talents)"],
    },
    {
      title: "K-Youth Development Programme (K-Youth) (2024)",
      desc: [
        `A youth employability initiative by Khazanah Nasional Berhad
  that combines real-world exposure through match-and-placement
  programs with industry partners, alongside technical certifications
  and soft skills development delivered through in-person and virtual
  sessions.`,
      ],
    },
  ],
  l2 = [
    {
      title: "Program Pemangkin Usahawan Sosial Hebat (2019)",
      desc: ["(MAGIC & EPU)"],
    },
    {
      title: "Business & Digital Accelerator for Micro-Enterprises (2019-2020)",
      desc: ["(Yayasan Hasanah)"],
    },
    {
      title: "Business & Digital Accelerator for Micro-Enterprises (2021-2022)",
      desc: ["(SME Corporation Malaysia)"],
    },
    {
      title: "Cloud Kitchen for B40: Train & Place (2021-2022)",
      desc: [
        `A targeted initiative for B40 communities to develop culinary
skills and adopt food-tech solutions for sustainable business
growth.`,
        "(MAGIC)",
      ],
    },
    {
      title: "Inclusive Business Accelerator - Pilot Program (2022)",
      desc: ["(SME Corporation Malaysia)"],
    },
    {
      title: "Dapur Digital Program (2022 - 2024)",
      desc: [
        `Pepper Labs is currently managing the Dapur Digital Project,
supported by the Ministry of Finance and Yayasan Hasanah, which aims
to address poverty and uplift communities. This transformative
initiative aims to convert five (5) units within low-cost Government
housing facilities into economic empowerment centres. With key
partnerships, the project helps onboard micro-entrepreneurs onto
food-tech platforms, boosting their visibility and traffic to
generate more sales and enhance their culinary skills including
cloud kitchen management.`,
        "(Yayasan Hasanah & Ministry of Finance)",
      ],
    },
    {
      title: "Financial Literacy Program (2023-2024)",
      desc: [
        `A collaborative initiative aimed at improving financial
management skills and teaching scam identification to underserved
communities. This program focuses on providing an understanding of
false investment schemes.`,
        "(Securities Commission)",
      ],
    },
    {
      title: "NGO to Social Enterprise Accelerator (2024)",
      desc: [
        `NGOs and CSOs are guided in transitioning into sustainable social
enterprises, gaining tools and strategies to become self-sufficient
and independent of external funding.`,
        "(APPGM-SDG & Parliament Malaysia)",
      ],
    },
  ],
  a2 = () => {
    const n = [
      {
        title: "Policy, Research and Innovations",
        description:
          "We work alongside the public, private, philanthropic, and grassroots sectors to influence interventions that economically empower our beneficiaries. By leveraging our grassroot strengths in addition to our national and international strategic networks, we contribute to holistic policy design and advocacy. Our past engagements nationally and internationally showcase our valuable insights.",
      },
      {
        title: "Transformative Skills and Pedagogy Design",
        description:
          "This pillar is designed for participants who aim to thrive in an entrepreneurial or competitive employment market career path. We deliver experiential learning, on-the-job training, professional apprenticeships, industry-recognised certifications, and mentorship opportunities to ensure participants gain technical skills, and the confidence and adaptability needed to thrive.",
      },
      {
        title: "Community Impact Nexus",
        description:
          "We intend to address the limited market access for micro-entrepreneurs through entrepreneurial capacity-building and enhance their digital capacities with the tools needed for long-term self-sufficiency. The initiatives under this pillar help ensure that underserved communities can break free from poverty and prosper in competitive markets.",
      },
    ];
    return u.jsxs("section", {
      id: "our-purpose",
      className: "pl-expertise-section",
      children: [
        u.jsxs("div", {
          className: "Container",
          children: [
            u.jsx("div", {
              className: "pl-expertise-index",
              children: n.map((i, a) =>
                u.jsxs(
                  "a",
                  {
                    href: `#expertise-discipline-${a + 1}`,
                    className: "pl-expertise-index-item",
                    children: [
                      u.jsx("strong", { children: i.title }),
                      u.jsx("span", {
                        children: [
                          "Policy design, research and advocacy with public, private and grassroots partners.",
                          "Learning journeys that strengthen practical skills and career pathways.",
                          "Building community capacity and opening access to markets.",
                        ][a],
                      }),
                    ],
                  },
                  i.title,
                ),
              ),
            }),
            u.jsx("div", {
              className: "pl-expertise-disciplines",
              children: n.map((i, a) => {
                const projects = a === 1 ? i2 : a === 2 ? l2 : [];
                const partners = Array.from(
                  new Set(
                    projects.flatMap((project) =>
                      project.desc.filter((description) =>
                        description.startsWith("("),
                      ),
                    ),
                  ),
                );
                return u.jsxs(
                  "section",
                  {
                    id: `expertise-discipline-${a + 1}`,
                    className: "pl-expertise-discipline",
                    children: [
                      u.jsxs("div", {
                        className: "pl-expertise-discipline-copy",
                        children: [
                          u.jsx("p", {
                            className: "pl-expertise-number",
                            children: `0${a + 1}`,
                          }),
                          u.jsx("h2", { children: i.title }),
                          u.jsx("p", { children: i.description }),
                          a === 0 &&
                            u.jsxs("div", {
                              className: "pl-expertise-stats",
                              children: [
                                u.jsxs("div", {
                                  children: [
                                    u.jsx("strong", { children: "8" }),
                                    u.jsx("span", {
                                      children: "National engagements",
                                    }),
                                  ],
                                }),
                                u.jsxs("div", {
                                  children: [
                                    u.jsx("strong", { children: "3" }),
                                    u.jsx("span", {
                                      children: "Global networks",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                        ],
                      }),
                      a === 0
                        ? u.jsxs("div", {
                            className: "pl-expertise-policy-content",
                            children: [
                              u.jsxs("div", {
                                className: "pl-expertise-policy-national",
                                children: [
                                  u.jsx("h3", {
                                    children: "National partnerships",
                                  }),
                                  u.jsx("p", {
                                    className: "pl-expertise-list-label",
                                    children: "Shaping national policy",
                                  }),
                                  u.jsx("ul", {
                                    children: bl[0].links.map((partner) =>
                                      u.jsx(
                                        "li",
                                        { children: partner.title },
                                        partner.title,
                                      ),
                                    ),
                                  }),
                                ],
                              }),
                              u.jsxs("div", {
                                className: "pl-expertise-policy-global",
                                children: [
                                  u.jsx("h3", {
                                    children: "Global partnerships",
                                  }),
                                  u.jsx("ul", {
                                    children: bl[1].links.map((partner) =>
                                      u.jsx(
                                        "li",
                                        { children: partner.title },
                                        partner.title,
                                      ),
                                    ),
                                  }),
                                ],
                              }),
                            ],
                          })
                        : u.jsxs("div", {
                            className: "pl-expertise-cards",
                            children: [
                              u.jsxs("div", {
                                className: "pl-expertise-card",
                                children: [
                                  u.jsx("h3", {
                                    children: "Programmes and engagements",
                                  }),
                                  u.jsx("div", {
                                    children: projects.map((project) =>
                                      u.jsxs(
                                        "details",
                                        {
                                          className: "pl-expertise-project",
                                          children: [
                                            u.jsx("summary", {
                                              children: project.title,
                                            }),
                                            u.jsx("div", {
                                              className:
                                                "pl-expertise-project-details",
                                              children: project.desc.map(
                                                (description) =>
                                                  u.jsx(
                                                    "p",
                                                    { children: description },
                                                    description,
                                                  ),
                                              ),
                                            }),
                                          ],
                                        },
                                        project.title,
                                      ),
                                    ),
                                  }),
                                ],
                              }),
                              u.jsxs("div", {
                                className: "pl-expertise-card",
                                children: [
                                  u.jsx("h3", {
                                    children: "Partners and recognition",
                                  }),
                                  u.jsx("ul", {
                                    children: partners.map((partner) =>
                                      u.jsx("li", { children: partner }, partner),
                                    ),
                                  }),
                                ],
                              }),
                            ],
                          }),
                    ],
                  },
                  i.title,
                );
              }),
            }),
          ],
        }),
      ],
    });
    return u.jsxs("section", {
      id: "our-purpose",
      className:
        "project relative z-10 pt-[10px] sm:pt-[60px] pb-[60px] sm:pb-[120px] bg-white",
      children: [
        u.jsx("div", {
          className: "Container",
          children: u.jsxs("div", {
            className:
              "mt-[30px] sm:mt-[0px] flex flex-col lg:flex-row gap:10 lg:gap-20",
            children: [
              u.jsxs("div", {
                className: "flex-1 basis-0",
                children: [
                  u.jsxs("div", {
                    className: "",
                    children: [
                      u.jsx("h5", {
                        className:
                          "font-primary text-[12px] md:text-[14px] tracking-[3px] font-semibold text-SubtitleText",
                        children: "Our Expertise #1",
                      }),
                      u.jsx("div", {
                        className:
                          "font-primary font-bold text-[24px] md:text-[32px] text-HeadingColor-0",
                        children: "Policy, Research and Innovations",
                      }),
                    ],
                  }),
                  u.jsxs("p", {
                    className:
                      "mt-5 text-left text-sm md:text-base font-normal font-primary leading-[24.4px] text-SecondaryText",
                    children: [
                      "We work alongside the public, private, philanthropic, and grassroots sectors to influence interventions that economically empower our beneficiaries. By leveraging our grassroot strengths in addition to our national and international strategic networks, we contribute to holistic policy design and advocacy.",
                      u.jsx("br", {}),
                      u.jsx("br", {}),
                      "Our past engagements nationally and internationally showcase our valuable insights.",
                    ],
                  }),
                ],
              }),
              u.jsxs("div", {
                className: "flex flex-col flex-1 basis-0 gap-5 mt-8",
                children: [
                  u.jsxs("div", {
                    className: "flex flex-col gap-5",
                    children: [
                      u.jsx("b", {
                        className: "text-xl",
                        children: bl[0].title,
                      }),
                      u.jsx("div", {
                        className: "flex flex-col gap-3",
                        children: bl[0].links.map((n) =>
                          u.jsxs(
                            "div",
                            {
                              className:
                                "flex items-start gap-3 text-[#666666] hover:text-PrimaryText cursor-pointer",
                              children: [
                                u.jsx("div", {
                                  className: "",
                                  children: u.jsx(Sl, {}),
                                }),
                                u.jsx("div", {
                                  className: "text-sm md:text-base leading-8",
                                  children: n.title,
                                }),
                              ],
                            },
                            n.title,
                          ),
                        ),
                      }),
                    ],
                  }),
                  u.jsxs("div", {
                    className: "flex flex-col gap-5",
                    children: [
                      u.jsx("b", {
                        className: "text-xl",
                        children: bl[1].title,
                      }),
                      u.jsx("div", {
                        className: "flex flex-col gap-2",
                        children: bl[1].links.map((n) =>
                          u.jsxs(
                            "div",
                            {
                              className:
                                "flex items-start gap-3 text-[#666666] hover:text-PrimaryText cursor-pointer",
                              children: [
                                u.jsx("div", { children: u.jsx(Sl, {}) }),
                                u.jsx("div", {
                                  className: "text-sm md:text-base leading-8",
                                  children: n.title,
                                }),
                              ],
                            },
                            n.title,
                          ),
                        ),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
        u.jsx("div", {
          className: "bg-[#F8F8F8]",
          children: u.jsxs("div", {
            className:
              "Container py-[30px] sm:py-[60px] mt-[30px] sm:mt-[60px] flex flex-col lg:flex-row gap:10 lg:gap-20",
            children: [
              u.jsxs("div", {
                className: "flex-1 basis-0",
                children: [
                  u.jsxs("div", {
                    className: "",
                    children: [
                      u.jsx("h5", {
                        className:
                          "font-primary text-[12px] md:text-[14px] tracking-[3px] font-semibold text-SubtitleText",
                        children: "Our Expertise #2",
                      }),
                      u.jsx("div", {
                        className:
                          "font-primary font-bold text-[24px] md:text-[32px] text-HeadingColor-0",
                        children: "Transformative Skills and Pedagogy Design",
                      }),
                    ],
                  }),
                  u.jsx("p", {
                    className:
                      "mt-5 text-left text-sm md:text-base font-normal font-primary leading-[24.4px] text-SecondaryText",
                    children:
                      "This pillar is designed for participants who aim to thrive in an entrepreneurial or competitive employment market career path. We deliver experiential learning, on-the-job training, professional apprenticeships, industry-recognised certifications, and mentorship opportunities to ensure participants gain technical skills, and the confidence and adaptability needed to thrive.",
                  }),
                ],
              }),
              u.jsx("div", {
                className: "flex-1 basis-0",
                children: u.jsx("div", {
                  className: "flex flex-col gap-3 mt-8",
                  children: i2.map((n) =>
                    u.jsxs(
                      "div",
                      {
                        className:
                          "flex items-start gap-5 text-[#666666] hover:text-PrimaryText cursor-pointer",
                        children: [
                          u.jsx("div", {
                            className: "",
                            children: u.jsx(Sl, {}),
                          }),
                          u.jsxs("div", {
                            className: "text-sm md:text-base leading-8",
                            children: [
                              u.jsx("div", {
                                className: "font-bold text-PrimaryText",
                                children: n.title,
                              }),
                              n.desc.map((r) =>
                                u.jsx(
                                  "div",
                                  {
                                    className: "leading-[24.4px]",
                                    children: r,
                                  },
                                  r,
                                ),
                              ),
                            ],
                          }),
                        ],
                      },
                      n.title,
                    ),
                  ),
                }),
              }),
            ],
          }),
        }),
        u.jsx("div", {
          className: "Container",
          children: u.jsxs("div", {
            className:
              "mt-[30px] sm:mt-[60px] flex flex-col lg:flex-row gap:10 lg:gap-20",
            children: [
              u.jsxs("div", {
                className: "flex-1 basis-0",
                children: [
                  u.jsxs("div", {
                    className: "",
                    children: [
                      u.jsx("h5", {
                        className:
                          "font-primary text-[12px] md:text-[14px] tracking-[3px] font-semibold text-SubtitleText",
                        children: "Our Expertise #3",
                      }),
                      u.jsx("div", {
                        className:
                          "font-primary font-bold text-[24px] md:text-[32px] text-HeadingColor-0",
                        children: "Community Impact Nexus",
                      }),
                    ],
                  }),
                  u.jsx("p", {
                    className:
                      "mt-5 text-left text-sm md:text-base font-normal font-primary leading-[24.4px] text-SecondaryText",
                    children:
                      "We intend to address the limited market access for micro-entrepreneurs through entrepreneurial capacity-building and enhance their digital capacities with the tools needed for long-term self-sufficiency. The initiatives under this pillar help ensure that underserved communities can break free from poverty and prosper in competitive markets.",
                  }),
                ],
              }),
              u.jsx("div", {
                className: "flex-1 basis-0 mt-8",
                children: u.jsx("div", {
                  className: "flex flex-col gap-3",
                  children: l2.map((n) =>
                    u.jsxs(
                      "div",
                      {
                        className:
                          "flex items-start gap-5 text-[#666666] hover:text-PrimaryText cursor-pointer",
                        children: [
                          u.jsx("div", {
                            className: "",
                            children: u.jsx(Sl, {}),
                          }),
                          u.jsxs("div", {
                            className: "text-sm md:text-base leading-8",
                            children: [
                              u.jsx("div", {
                                className: "font-bold text-PrimaryText",
                                children: n.title,
                              }),
                              n.desc.map((r) =>
                                u.jsx(
                                  "div",
                                  {
                                    className: "leading-[24.4px]",
                                    children: r,
                                  },
                                  r,
                                ),
                              ),
                            ],
                          }),
                        ],
                      },
                      n.title,
                    ),
                  ),
                }),
              }),
            ],
          }),
        }),
      ],
    });
  },
  Sl = () =>
    u.jsxs("svg", {
      width: "18",
      height: "28",
      viewBox: "0 0 18 28",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        u.jsx("path", {
          d: "M14.0577 18.3779C13.6537 18.5989 13.1976 18.7073 12.7373 18.6915C12.6181 18.6915 12.499 18.6915 12.386 18.6915L10.04 24.1488L11.3761 27.2633C11.3926 27.3016 11.4199 27.3343 11.4548 27.3573C11.4896 27.3803 11.5304 27.3925 11.5722 27.3925C11.6139 27.3925 11.6547 27.3803 11.6896 27.3573C11.7244 27.3343 11.7517 27.3016 11.7682 27.2633L13.4367 22.9539L17.7085 24.7134C17.7474 24.7288 17.7899 24.7325 17.8309 24.7239C17.8719 24.7153 17.9094 24.6949 17.9388 24.6651C17.9682 24.6353 17.9882 24.5976 17.9964 24.5565C18.0045 24.5155 18.0003 24.473 17.9845 24.4342L14.9767 17.415C14.7608 17.8115 14.4437 18.1437 14.0577 18.3779Z",
          fill: "#EC6C0C",
        }),
        u.jsx("path", {
          d: "M8.98275 19.7353C8.1767 19.7353 7.57452 19.3087 7.10093 18.9669C6.93621 18.8433 6.75847 18.7381 6.57088 18.6532C6.50798 18.6402 6.44373 18.635 6.37956 18.6375C6.22588 18.6375 6.06592 18.6375 5.9091 18.6658C5.69583 18.6846 5.47628 18.7034 5.24106 18.7034C4.78074 18.7193 4.32465 18.6109 3.92064 18.3898C3.79054 18.3136 3.66862 18.2243 3.55682 18.1232L0.846995 24.4273C0.831122 24.466 0.826989 24.5085 0.835111 24.5496C0.843232 24.5906 0.86325 24.6284 0.892672 24.6581C0.922093 24.6879 0.959617 24.7083 1.00057 24.7169C1.04153 24.7255 1.0841 24.7219 1.123 24.7064L5.39474 22.9469L7.06329 27.2563C7.07973 27.2947 7.10707 27.3273 7.14191 27.3503C7.17676 27.3733 7.21758 27.3855 7.25931 27.3855C7.30105 27.3855 7.34187 27.3733 7.37671 27.3503C7.41156 27.3273 7.43889 27.2947 7.45534 27.2563L11.0559 18.8445L10.8834 18.9825C10.391 19.2962 9.7888 19.7353 8.98275 19.7353Z",
          fill: "#EC6C0C",
        }),
        u.jsx("path", {
          d: "M16.9113 11.7194C17.1026 11.0105 17.9652 10.3644 17.9652 9.59289C17.9652 8.82134 17.0995 8.17839 16.9113 7.46643C16.7231 6.75447 17.134 5.74142 16.7639 5.09847C16.3938 4.45551 15.3149 4.31751 14.788 3.78746C14.2611 3.25741 14.1294 2.18791 13.477 1.80841C12.8246 1.42891 11.8429 1.85545 11.109 1.661C10.3751 1.46654 9.75412 0.607178 8.98571 0.607178C8.2173 0.607178 7.57121 1.46968 6.85925 1.661C6.14729 1.85232 5.13424 1.43832 4.49129 1.80841C3.84833 2.1785 3.71033 3.25741 3.18028 3.78746C2.65024 4.31751 1.58073 4.4461 1.20437 5.09847C0.828003 5.75083 1.25141 6.73252 1.05382 7.46643C0.85623 8.20034 0 8.82134 0 9.59289C0 10.3644 0.862503 11.0074 1.05382 11.7162C1.24514 12.425 0.831139 13.4412 1.20437 14.0842C1.5776 14.7271 2.65024 14.8651 3.18028 15.3952C3.71033 15.9252 3.83892 16.9947 4.49129 17.3711C5.14365 17.7475 6.12534 17.3241 6.85925 17.5216C7.59316 17.7192 8.21416 18.5755 8.98571 18.5755C9.75726 18.5755 10.4002 17.7098 11.109 17.5216C11.8179 17.3335 12.834 17.7443 13.477 17.3742C14.12 17.0041 14.258 15.9252 14.788 15.3983C15.318 14.8714 16.3876 14.7397 16.7671 14.0873C17.1466 13.4349 16.7169 12.4533 16.9113 11.7194Z",
          fill: "#EC6C0C",
        }),
        u.jsx("path", {
          d: "M5.67501 14.68L6.54551 10.9168L3.62598 8.38562L7.48298 8.05081L8.98292 4.50183L10.4829 8.05081L14.3399 8.38562L11.4203 10.9168L12.2908 14.68L8.98292 12.6846L5.67501 14.68Z",
          fill: "white",
        }),
      ],
    }),
  s2 = () =>
    u.jsxs(u.Fragment, {
      children: [
        u.jsx(o2, {
          url: "/our-expertise",
          breadCrumbTitle: "Our Expertise",
          breadCrumbLink: "Our Expertise",
        }),
        u.jsx(a2, {}),
        u.jsx(Yu, {}),
        u.jsx(Ku, {}),
        u.jsx(Ba, {}),
      ],
    }),
  o2 = ({ breadCrumbTitle: e, url: t, breadCrumbLink: n }) =>
    u.jsx("div", {
      className: `bg-primary-500 flex items-center justify-center h-[300px] sm:h-[300px]${e === "Our Expertise" ? " pl-expertise-hero" : ""}`,
      children: u.jsxs("div", {
        className: "Container flex flex-col justify-center items-center gap-5",
        children: [
          u.jsx("h1", {
            className:
              "font-primary font-bold text-4xl sm:text-[44px] md:text-[48px] leading-[56.2px] text-white capitalize",
            children:
              e === "Our Expertise"
                ? "Three disciplines. One connected system."
                : e,
          }),
          u.jsx("div", {
            className:
              e === "Our Expertise"
                ? "pl-expertise-breadcrumb"
                : "inline-block px-8",
            children: u.jsxs("ul", {
              className:
                "flex flex-row gap-2 sm:gap-4 sm:items-center justify-center",
              children: [
                u.jsx("li", {
                  children: u.jsx(ee, {
                    to: "/",
                    children: u.jsx("button", {
                      className:
                        "font-primary text-[16px] text-white flex items-center gap-2 transition-all duration-500 hover:text-primary-500",
                      children: "Home",
                    }),
                  }),
                }),
                u.jsx("li", {
                  children: u.jsx("div", {
                    className: "text-white block",
                    children: "/",
                  }),
                }),
                u.jsx("li", {
                  children: u.jsx(ee, {
                    to: t,
                    children: u.jsx("button", {
                      className:
                        "font-primary text-[16px] capitalize text-white",
                      children: n,
                    }),
                  }),
                }),
              ],
            }),
          }),
          e === "Our Expertise" &&
            u.jsxs(u.Fragment, {
              children: [
                u.jsx("p", {
                  className: "pl-expertise-hero-copy",
                  children:
                    "We work alongside public, private, philanthropic and grassroots partners to design interventions that economically empower the people we serve.",
                }),
              ],
            }),
        ],
      }),
    }),
  u2 = ({
    blogThumb: e,
    blogDateIcon: t,
    blogDate: n,
    blogUrl: r,
    blogTitle: i,
    blogDesc: l,
    blogBtn: a,
  }) =>
    u.jsxs("div", {
      className:
        "flex group transition-all duration-500 rounded card-shadow px-5 h-fit",
      children: [
        u.jsx("div", { className: "relative rounded overflow-hidden" }),
        u.jsx("div", {
          className:
            "rounded relative z-20 flex items-start bg-white transition-all duration-500 py-5",
          children: u.jsxs("div", {
            className: "flex flex-col gap-2.5 items-start",
            children: [
              u.jsx("div", {
                className:
                  "flex flex-col sm:flex-row md:flex-col xl:flex-row gap-6",
                children: u.jsxs("div", {
                  className:
                    "text-SecondaryText text-[14px] flex gap-2 justify-center items-center leading-none",
                  children: [
                    u.jsx("div", { className: "mb-1", children: t }),
                    n,
                  ],
                }),
              }),
              u.jsx(ee, {
                to: r,
                target: "_blank",
                className: "flex flex-col gap-2.5 items-start",
                children: u.jsx("button", {
                  className:
                    "font-primary h-[48px] justify-start items-start flex text-left font-semibold text-[18px] leading-[24px] text-HeadingColor-0 transition-all duration-500 group-hover:text-primary-500 mt-2 line-clamp-2",
                  children: i,
                }),
              }),
              u.jsx(ee, {
                to: r,
                target: "_blank",
                className: "inline-block pt-3",
                children: u.jsx(Fa, { children: a }),
              }),
            ],
          }),
        }),
      ],
    }),
  Ho = [
    {
      blogDate: "January 25 2016",
      blogTitle: "Masala Wheels promotes spirit of volunteerism",
      blogUrl: "https://thesun.my/archive/347621-ESARCH347621",
    },
    {
      blogDate: "April 5 2016",
      blogTitle:
        "This Food Truck Dishes Meals At RM5, With A Dash Of Social Entrepreneurship On The Side",
      blogUrl:
        "https://vulcanpost.com/563931/masala-wheels-malaysian-food-truck/",
    },
    {
      blogDate: "December 19 2016",
      blogTitle: "Masala Wheels: Giving free food and making entrepreneurs",
      blogUrl:
        "https://www.freemalaysiatoday.com/category/nation/2016/12/19/masala-wheels-giving-free-food-and-making-entrepreneurs-2/",
    },
    {
      blogDate: "December 31 2016",
      blogTitle: "New look for food truck with a mission",
      blogUrl:
        "https://www.thestar.com.my/metro/community/2016/12/31/new-look-for-food-truck-with-a-mission-social-enterprise-aims-to-empower-underprivileged-groups-by-t/",
    },
    {
      blogDate: "May 14 2017",
      blogTitle: "Paying it forward with flavours",
      blogUrl:
        "https://www.nst.com.my/lifestyle/sunday-vibes/2017/05/239076/paying-it-forward-flavours",
    },
    {
      blogDate: "December 14 2017",
      blogTitle: "A game changer in F&B industry",
      blogUrl:
        "https://www.thestar.com.my/metro/metro-news/2017/12/14/a-game-changer-in-fb-industry-social-enterprise-celebrates-launch-of-food-truck-portal-and-success-o",
    },
    {
      blogDate: "September 5 2018",
      blogTitle: "Absolutely No Problem At Masala Wheels Restaurant",
      blogUrl:
        "https://www.2cents.my/2018/09/05/absolutely-no-problems-at-masala-wheels-restaurant/",
    },
    {
      blogDate: "December 12 2018",
      blogTitle: "Golden Hearts Award 2018: Masala Wheels",
      blogUrl:
        "https://www.thestartv.com/v/golden-hearts-award-2018-masala-wheels",
    },
    {
      blogDate: "December 19 2018",
      blogTitle: "No 'masalah' too big for Masala Wheels",
      blogUrl:
        "https://www.thestar.com.my/news/nation/2018/12/19/no-masalah-too-big-for-masala-wheels-food-venture-founders-find-niche-in-helping-youths/",
    },
    {
      blogDate: "December 19 2018",
      blogTitle:
        "2019 Social Entrepreneur of the Year Makes Real Imprints in Malaysia's Social Entrepreneurship Space",
      blogUrl:
        "https://www.utp.edu.my/Pages/Students/Student%20Development%20and%20Services/Stories/2019-Social-Entrepreneur-of-the-Year-Makes-RealImprints-in-Malaysia%E2%80%99s-Social-Entrepreneurship-Space.aspx",
    },
    {
      blogDate: "December 19 2018",
      blogTitle: "Profile - Kuhan Pathy ,Co-Founder of Masala Wheels",
      blogUrl: "https://www.augustman.com/my/profiles/kuhan-pathy-2/",
    },
    {
      blogDate: "January 4 2019",
      blogTitle: "Masala Wheels	EdgeProp",
      blogUrl: "https://www.edgeprop.my/content/1458579/masala-wheels",
    },
    {
      blogDate: "February 9 2019",
      blogTitle: "Partnership inked to upskill the marginalised",
      blogUrl:
        "https://www.thestar.com.my/metro/metro-news/2019/02/09/partnership-inked-toupskill-the-marginalised/",
    },
    {
      blogDate: "February 13 2019",
      blogTitle:
        "How Does A M'sian Social Enterprise Get Robots And AI Onto Its Food Truck Fleet?",
      blogUrl:
        "https://vulcanpost.com/656515/masala-wheels-kcom-group-social-entrepreneurship-malaysia/",
    },
    {
      blogDate: "June 24 2019",
      blogTitle: "Heroes do not take a break",
      blogUrl:
        "https://www.thestar.com.my/news/nation/2019/06/24/heroes-do-not-take-a-break/",
    },
    {
      blogDate: "July 7 2019",
      blogTitle: "Building impactful businesses",
      blogUrl:
        "https://www.thestar.com.my/business/business-news/2019/07/08/building-impactful-businesses/",
    },
    {
      blogDate: "September 1 2019",
      blogTitle:
        "Masala Wheels: From food truck to cafe, this Malaysian social enterprise helps troubled youths get back on track",
      blogUrl:
        "https://goingplaces.malaysiaairlines.com/masala-wheels-from-food-truck-to-cafe-this-malaysian-social-enterprise-helps-troubled-youths-get-back-on-track/",
    },
    {
      blogDate: "September 29 2019",
      blogTitle: "Masala Wheels @ PJ Old Town -Yummy. Burp!",
      blogUrl:
        "https://thefoodbunny.com/2019/09/29/masala-wheels-pj-old-town-yummy-burp/",
    },
    {
      blogDate: "October 18 2019",
      blogTitle:
        "How Masala Wheels is changing the lives of at-risk and marginalised youths in Malaysia",
      blogUrl:
        "https://www.augustman.com/my/people/masala-wheels-set-wheels-in-motion-for-targeted-at-risk-and-marginalised-youths/",
    },
    {
      blogDate: "October 18 2019",
      blogTitle: "Kuhan Pathy Makes a Difference with the Path Least Taken",
      blogUrl:
        "https://www.utp.edu.my/Pages/Students/Student%20Development%20and%20Services/Stories/Kuhan-Pathy-Makes-a-Difference-with-the-Path-Least-Taken.aspx",
    },
    {
      blogDate: "October 18 2019",
      blogTitle:
        "LAPORAN PROGRAM PEMBERIAN BANTUAN eKASIH SEPANJANG PELAKSANAAN PERINTAH KAWALAN PERGERAKAN (PKP) COVID-19 Unit Penyelarasan Pelaksanaan, Jabatan Perdana Menteri (ICU JPM)",
      blogUrl:
        "https://www.icu.gov.my/pdf/laporan/Laporan%20Bantuan%20eKasih%20PKP.pdf",
    },
    {
      blogDate: "March 17 2020",
      blogTitle: "A leg up for wayward youth The Sun",
      blogUrl:
        "https://thesun.my/malaysia-news/a-leg-up-for-wayward-youth-XD2137347",
    },
    {
      blogDate: "March 23 2020",
      blogTitle:
        "With help from caring Malaysians, social enterprise Masala Wheels sponsors meals for the needy during Covid-19 shutdown	Malay Mail",
      blogUrl:
        "https://www.malaymail.com/news/life/2020/03/23/with-help-from-caring-malaysians-social-enterprise-masala-wheels-sponsors-m/1849221",
    },
    {
      blogDate: "March 26 2020",
      blogTitle: "Powering Through The Pandemic: Masala Wheels",
      blogUrl:
        "https://www.bfm.my/podcast/enterprise/open-for-business/ent-ofb-pttp-masala-wheels",
    },
    {
      blogDate: "April 6 2020",
      blogTitle:
        "Covid-19: How businesses like Masala Wheels and China Pottery are pivoting",
      blogUrl:
        "https://www.prestigeonline.com/my/people/covid-19-masala-wheels-china-pottery-pivoting/",
    },
    {
      blogDate: "April 8 2020",
      blogTitle: "Paying it forward with packed meals",
      blogUrl:
        "https://www.thestar.com.my/metro/metro-news/2020/04/08/paying-it-forward-with-packed-meals#cxrecs_s",
    },
    {
      blogDate: "April 10 2020",
      blogTitle: "Food truck turns saviour",
      blogUrl:
        "https://themalaysianreserve.com/2020/04/10/food-truck-turns-saviour/#google_vignette",
    },
    {
      blogDate: "April 13 2020",
      blogTitle:
        "Social enterprises come together to battle the Covid-19 disruptions",
      blogUrl:
        "https://www.businesstoday.com.my/2020/04/13/social-enterprises-come-together-to-battle-the-covid-19-disruptions/",
    },
    {
      blogDate: "13 Apr 2020",
      blogTitle:
        "6 eateries donate meals to Covid-19 frontliners and the needy",
      blogUrl:
        "https://www.freemalaysiatoday.com/category/leisure/2020/04/13/6-eateries-donate-meals-to-covid-19-frontliners-and-the-needy/",
    },
    {
      blogDate: "October 14 2020",
      blogTitle:
        "Support these restaurants that are still giving back to society during Covid-19",
      blogUrl:
        "https://www.optionstheedge.com/topic/food/support-these-restaurants-are-still-giving-back-society-during-covid-19",
    },
    {
      blogDate: "October 24 2020",
      blogTitle:
        "MASALA WHEELS in PJ: Banana Leaf Rice under the trees	Pure Glutton",
      blogUrl:
        "https://pureglutton.com/masala-wheels-in-pj-banana-leaf-rice-under-the-trees",
    },
    {
      blogDate: "December 11 2020",
      blogTitle:
        "Belanjawan 2021: Peruntukan perusahaan sosial ringankan beban golongan miskin bandar",
      blogUrl:
        "https://www.astroawani.com/berita-malaysia/belanjawan-2021-peruntukan-perusahaan-sosial-ringankan-beban-golongan-miskin-bandar-267934",
    },
    {
      blogDate: "August 16 2021",
      blogTitle:
        "They've helped B40 microentrepreneurs make RM100K in total revenue & that's just the start",
      blogUrl:
        "https://vulcanpost.com/756714/masala-wheels-social-enterprise-training-b40-microentrepreneurs/",
    },
    {
      blogDate: "10 Nov 2021",
      blogTitle:
        "Masala Wheels Expands With 'Tech For Good' & Launches 3 Cloud Kitchens For B40 Individuals",
      blogUrl:
        "https://says.com/my/lifestyle/four-things-you-dont-know-about-masala-wheels",
    },
    {
      blogDate: "November 11 2021",
      blogTitle: "News in Brief - 11/11/2021",
      blogUrl: "https://www.bernama.com/en/news.php?id=2022261",
    },
    {
      blogDate: "November 16 2021",
      blogTitle:
        "Pepper Labs Tampil Dengan Inisiatif Memperkasakan Masyarakat Terpinggir Menerusi Program Keusahawanan Mikro dan Pemerkasaan Digital",
      blogUrl: "https://tajria.com/20213073",
    },
    {
      blogDate: "November 29 2021",
      blogTitle:
        "Cloud kitchen initiative aims to create jobs, future business owners",
      blogUrl:
        "https://www.freemalaysiatoday.com/category/leisure/food/2021/11/29/cloud-kitchen-initiative-aims-to-create-jobs-future-business-owners/",
    },
    {
      blogDate: "December 3 2021",
      blogTitle:
        "Social Enterprise Pepper Labs bags ASEAN Business Awards 2021, makes Malaysia proud",
      blogUrl: "https://www.malaysiakini.com/announcement/601654",
    },
    {
      blogDate: "December 3 2021",
      blogTitle:
        "Pepper Labs to empower, sustain B40 communities The Malaysian Reserve",
      blogUrl:
        "https://themalaysianreserve.com/2022/05/11/pepper-labs-to-empower-sustain-b40-communities/",
    },
    {
      blogDate: "Feb 28 2022",
      blogTitle:
        "Datuk Seri Saravanan Launches Masala Wheels Social Enterprise Initiative, Empowering B40 Community With Jobs",
      blogUrl: "https://www.malaysiakini.com/announcement/612402",
    },
    {
      blogDate: "October 4 2024",
      blogTitle: "Digital Kitchen Cooking Smart Tech Integration",
      blogUrl:
        "https://www.businesstoday.com.my/2024/10/04/digital-kitchen-cooking-smart-tech-integration/ ",
    },
    {
      blogDate: "October 4 2024",
      blogTitle:
        "Social Enterprises' Empowerment Effective As Poverty Rate Drops From 8.2% To 6.2%",
      blogUrl:
        "https://www.businesstoday.com.my/2024/10/04/social-enterprises-lower-dire-poverty-rate-from-8-2-to-6-2/",
    },
    {
      blogDate: "October 4 2024",
      blogTitle:
        "Social Enterprises: Proven, Effective Poverty Eradication Partners, Ready for Nationwide Rollout	The Smart Investor",
      blogUrl:
        "https://smartinvestor.com.my/social-enterprises-proven-effective-poverty-eradication-partners-ready-for-nationwide-rollout/",
    },
    {
      blogDate: "October 15 2024",
      blogTitle: "Budget 2025: Fueling Social Enterprises’ Growth? 89.9",
      blogUrl:
        "https://www.bfm.my/podcast/enterprise/enterprise-biz-bytes/budget-2025-fueling-social-enterprises-growth",
    },
    {
      blogDate: "October 15 2024",
      blogTitle:
        "M’sian team turns PPR spaces into cloud kitchens for women to become foodpreneurs",
      blogUrl:
        "https://vulcanpost.com/873502/dapur-digital-cloud-kitchen-pepper-labs-social-enterprise-malaysia/",
    },
    {
      blogDate: "October 15 2024",
      blogTitle:
        "Projek Dapur Digital dilancar, perkasa usahawan PPR di Wilayah Persekutuan",
      blogUrl:
        "https://www.astroawani.com/berita-malaysia/projek-dapur-digital-dilancar-perkasa-usahawan-ppr-di-wilayah-persekutuan-491868 ",
    },
    {
      blogDate: "October 15 2024",
      blogTitle:
        "PROJEK DAPUR DIGITAL, PERKASA EKONOMI KOMUNITI B40, IBU TUNGGAL DAN BELIA	Berita Al-Hijrah",
      blogUrl: "https://youtu.be/ySAbXsMklXU?si=1edFcfy7Yy-ZQFoD",
    },
    {
      blogDate: "October 15 2024",
      blogTitle:
        "Projek Dapur Digital dilancar, perkasa usahawan PPR di Wilayah Persekutuan",
      blogUrl:
        "https://www.astroawani.com/berita-malaysia/projek-dapur-digital-dilancar-perkasa-usahawan-ppr-di-wilayah-persekutuan-491868",
    },
    {
      blogDate: "October 16 2024",
      blogTitle:
        "BERITA PAGI - PROJEK DAPUR DIGITAL: PERLUAS PASARAN MELALUI PLATFORM DIGITAL",
      blogUrl:
        "https://www.youtube.com/watch?si=dtC26uB8RZ5gcxHV&v=N0atIG03VUc&feature=youtu.be ",
    },
    {
      blogDate: "October 18 2024",
      blogTitle:
        "Projek Dapur Digital bantu memperkasakan ekonomi ibu tunggal dan belia wanita B40",
      blogUrl:
        "https://www.wilayahku.com.my/projek-dapur-digital-bantu-memperkasakan-ekonomi-ibu-tunggal-dan-belia-wanita-b40/",
    },
    {
      blogDate: "October 18 2024",
      blogTitle:
        "Belanjawan 2025: Kerajaan peruntuk RM84 juta naik taraf Kampung Baru Cina	Sinar Harian",
      blogUrl:
        "https://www.sinarharian.com.my/article/691788/khas/belanjawan/belanjawan-2025-kerajaan-peruntuk-rm84-juta-naik-taraf-kampung-baru-cina",
    },
    {
      blogDate: "October 18 2024",
      blogTitle:
        "Intipati Bajet 2025: Pembentangan ketiga Kerajaan Madani, ini manfaat rakyat bakal terima",
      blogUrl:
        "https://www.mstar.com.my/lokal/semasa/2024/10/18/intipati-bajet-2025-pembentangan-ketiga-kerajaan-madani-ini-manfaat-rakyat-bakal-terima",
    },
    {
      blogDate: "October 18 2024",
      blogTitle: "Economic Empowerment via F&B Social Entrepreneurship (Live)",
      blogUrl:
        "https://www.instagram.com/p/DBOXbEXMqHT/?igsh=MWU3dXVnaXJka3l3eQ%3D%3D ",
    },
    {
      blogDate: "October 18 2024",
      blogTitle: "Government Pledges RM900 Million For PRR Projects",
      blogUrl:
        "https://www.businesstoday.com.my/2024/10/18/government-pledges-rm900-million-for-prr-projects/",
    },
    {
      blogDate: "October 19 2024",
      blogTitle:
        "Pepper Labs to set up 20 more Dapur Digital nationwide with Budget 2025 funding",
      blogUrl:
        "https://thesun.my/malaysia-news/pepper-labs-to-set-up-20-more-dapur-digital-nationwide-with-budget-2025-funding-PF13166854",
    },
    {
      blogDate: "October 19 2024",
      blogTitle:
        "Pepper Labs to set up 20 more Dapur Digital nationwide with Budget 2025 funding	Lumi News",
      blogUrl: "https://staging.luminews.my/news/2608785",
    },
    {
      blogDate: "October 19 2024",
      blogTitle:
        "Pepper Labs to set up 20 more Dapur Digital nationwide with Budget 2025 funding",
      blogUrl:
        "https://newswav.com/article/pepper-labs-to-set-up-20-more-dapur-digital-nationwide-with-budget-2025-fun-A2410_u5ejMe",
    },
    {
      blogDate: "October 19 2024",
      blogTitle:
        "20 lagi 'Dapur Digital' dirancang dibuka guna dana RM5j daripada Belanjawan 2025",
      blogUrl:
        "https://www.bharian.com.my/berita/nasional/2024/10/1313135/20-lagi-dapur-digital-dirancang-dibuka-guna-dana-rm5j-daripada",
    },
    {
      blogDate: "October 21 2024",
      blogTitle:
        "Major Boost for Social Enterprise: Budget 2025 Strengthens Social Procurement and Economic Empowerment Initiatives",
      blogUrl:
        "https://malaysiakini.com/announcement/723412?fbclid=IwY2xjawGr38RleHRuA2FlbQIxMQABHeUH9rM3Df-YRWZ4n1FyY0F3ltrIA_gdCll8wyzpPNUZ7pRYD7ursib5wg_aem_1cN12V2IXWgl1EN_k7yvEw ",
    },
    {
      blogDate: "October 24 2024",
      blogTitle:
        "Transforming PPR Spaces into 5-Star Cloud Kitchens: A Breakthrough in Sustainable Community Entrepreneurship",
      blogUrl:
        "https://latestmalaysia.com/2024/10/24/transforming-ppr-spaces-5-star/amp/ ",
    },
    {
      blogDate: "October 24 2024",
      blogTitle:
        "Pepper Labs Launches Cloud Kitchens to Empower B40 Women Entrepreneurs in PPR Communities",
      blogUrl:
        "https://www.malaysiasme.com.my/pepper-labs-launches-cloud-kitchens-to-empower-b40-women-entrepreneurs-in-ppr-communities/#:~:text=Pepper%20Labs%20CEO%20Gevi%20Ananda,them%20with%20sustainable%20income%20opportunities. ",
    },
    {
      blogDate: "October 24 2024",
      blogTitle:
        "Pepper Labs Breakthrough in Transforming PPR Spaces into 5-Star Cloud Kitchens",
      blogUrl:
        "https://businessnews.com.my/2024/10/24/pepper-labs-ppr-cloud-kitchens/#google_vignette",
    },
    {
      blogDate: "October 25 2024",
      blogTitle:
        "What is the role of social enterprises in reducing the poverty gap in Malaysia? Listen to the #Budget2025 Radio Interview at 5.30 pm today.",
      blogUrl:
        "https://www.facebook.com/share/p/8sTHsLgXvU5oeJnq/?mibextid=WC7FNe",
    },
    {
      blogDate: "October 25 2024",
      blogTitle:
        "Pepper Labs unveils Dapur Digital to empower B40 woman entrepreneurs",
      blogUrl:
        "https://www.nst.com.my/business/corporate/2024/10/1125301/pepper-labs-unveils-dapur-digital-empower-b40-woman-entrepreneurs",
    },
    {
      blogDate: "October 25 2024",
      blogTitle:
        "Transforming PPR Spaces Into 5-Star Cloud Kitchens: A Breakthrough In Sustainable Community Entrepreneurship",
      blogUrl:
        "https://weirdkaya.com/ppr-5-star-cloud-kitchens-community-entrepreneurship/",
    },
    {
      blogDate: "October 25 2024",
      blogTitle:
        "Transforming PPR Spaces into 5-Star Cloud Kitchens: A Breakthrough in Sustainable Community Entrepreneurship",
      blogUrl:
        "https://www.malaysian-business.com/index.php/wordpress/item/9959-transforming-ppr-spaces-into-5-star-cloud-kitchens-a-breakthrough-in-sustainable-community-entrepreneurship",
    },
    {
      blogDate: "October 28 2024",
      blogTitle:
        "Transforming PPR Spaces into 5-Star Cloud Kitchens: A Breakthrough in Sustainable Community Entrepreneurship",
      blogUrl:
        "https://sme.asia/transforming-ppr-spaces-into-5-star-cloud-kitchens-a-breakthrough-in-sustainable-community-entrepreneurship/",
    },
    {
      blogDate: "October 28 2024",
      blogTitle:
        "Transforming PPR Spaces into 5-Star Cloud Kitchens: A Breakthrough in Sustainable Community Entrepreneurship",
      blogUrl:
        "https://newstreamasia.com/community/transforming-ppr-spaces-into-5-star-cloud-kitchens-a-breakthrough-in-sustainable-community-entrepreneurship/",
    },
    {
      blogDate: "October 28 2024",
      blogTitle:
        "Transforming PPR Spaces into 5-Star Cloud Kitchens: A Breakthrough in Sustainable Community Entrepreneurship",
      blogUrl:
        "https://cilisos.my/transforming-ppr-spaces-into-5-star-cloud-kitchens/",
    },
    {
      blogDate: "October 28 2024",
      blogTitle:
        "Transforming PPR Spaces into 5-Star Cloud Kitchens: A Breakthrough in Sustainable Community Entrepreneurship",
      blogUrl:
        "https://www.topcommunitygrants.com/NewsItem/558482/913/Transforming+Ppr+Spaces+into+5-Star+Cloud+Kitchens%3A+A+Breakthrough+in+Sustainable+...+",
    },
    {
      blogDate: "November 4 2024",
      blogTitle:
        "Pepper Labs Launches Dapur Digital Initiative To Train Women Micro-Entrepreneurs",
      blogUrl:
        "https://www.businesstoday.com.my/2024/11/04/dapur-digital-launches-to-train-women-micro-entrepreneurs/",
    },
    {
      blogDate: "November 6 2024",
      blogTitle:
        "Dari PPR Ke Dapur Digital Bertaraf 5 Bintang: Revolusi Keusahawanan Wanita PPR Malaysia",
      blogUrl:
        "https://medialahmy.com/dari-ppr-ke-dapur-digital-bertaraf-5-bintang-revolusi-keusahawanan-wanita-ppr-malaysia/",
    },
    {
      blogDate: "November 6 2024",
      blogTitle:
        "Dari PPR ke Dapur Digital bertaraf 5 bintang: Revolusi keusahawanan wanita PPR Malaysia",
      blogUrl:
        "https://mymntnews.com/2024/11/06/dari-ppr-ke-dapur-digital-bertaraf-5-bintang-revolusi-keusahawanan-wanita-ppr-malaysia/",
    },
    {
      blogDate: "November 6 2024",
      blogTitle:
        "Pepper Labs lancar dapur digital sasar sokong usahawan mikro wanita B40",
      blogUrl:
        "https://www.dagangnews.com/article/terkini/pepper-labs-lancar-dapur-digital-sasar-sokong-usahawan-mikro-wanita-b40-44302",
    },
    {
      blogDate: "November 6 2024",
      blogTitle: "Pepper Labs lancar Dapur Digital pacu ekonomi penduduk PPR",
      blogUrl:
        "https://www.edisi9.com.my/2024/11/pepper-labs-lancar-dapur-digital-pacu-ekonomi-penduduk-ppr/",
    },
    {
      blogDate: "November 6 2024",
      blogTitle:
        "Dari PPR ke Dapur Digital Bertaraf 5 Bintang: Revolusi Keusahawanan Wanita PPR Malaysia	Suara Merdeka",
      blogUrl:
        "https://suaramerdeka.com.my/dari-ppr-ke-dapur-digital-bertaraf-5-bintang-revolusi-keusahawanan-wanita-ppr-malaysia/#google_vignette",
    },
    {
      blogDate: "November 6 2024",
      blogTitle:
        "Dari PPR Ke Dapur Digital Bertaraf 5 Bintang: Revolusi Keusahawanan Wanita PPR Malaysia",
      blogUrl:
        "https://medialahmy.com/dari-ppr-ke-dapur-digital-bertaraf-5-bintang-revolusi-keusahawanan-wanita-ppr-malaysia/ ",
    },
    {
      blogDate: "November 6 2024",
      blogTitle:
        "Dari PPR ke Dapur Digital bertaraf 5 bintang: Revolusi keusahawanan wanita PPR Malaysia",
      blogUrl:
        "https://mymntnews.com/2024/11/06/dari-ppr-ke-dapur-digital-bertaraf-5-bintang-revolusi-keusahawanan-wanita-ppr-malaysia/ ",
    },
    {
      blogDate: "November 6 2024",
      blogTitle:
        "Pepper Labs lancar dapur digital sasar sokong usahawan mikro wanita B40",
      blogUrl:
        "https://www.dagangnews.com/article/terkini/pepper-labs-lancar-dapur-digital-sasar-sokong-usahawan-mikro-wanita-b40-44302 ",
    },
    {
      blogDate: "November 6 2024",
      blogTitle: "Pepper Labs lancar Dapur Digital pacu ekonomi penduduk PPR",
      blogUrl:
        "https://www.edisi9.com.my/2024/11/pepper-labs-lancar-dapur-digital-pacu-ekonomi-penduduk-ppr/ ",
    },
    {
      blogDate: "November 6 2024",
      blogTitle:
        "Dari PPR ke Dapur Digital Bertaraf 5 Bintang: Revolusi Keusahawanan Wanita PPR Malaysia	Suara Merdeka	",
      blogUrl:
        "https://suaramerdeka.com.my/dari-ppr-ke-dapur-digital-bertaraf-5-bintang-revolusi-keusahawanan-wanita-ppr-malaysia/#google_vignette ",
    },
    {
      blogDate: "November 7 2024",
      blogTitle:
        "Dari PPR ke Dapur Digital Bertaraf 5 Bintang: Revolusi Keusahawanan Wanita PPR Malaysia	Bacalah Malaysia",
      blogUrl:
        "https://www.bacalahmalaysia.my/dari-ppr-ke-dapur-digital-bertaraf-5-bintang-revolusi-keusahawanan-wanita-ppr-malaysia/ ",
    },
    {
      blogDate: "November 7 2024",
      blogTitle:
        "Dari PPR ke Dapur Digital bertaraf 5 bintang: Revolusi keusahawanan wanita PPR Malaysia	Akses Malaysia",
      blogUrl:
        "https://www.aksesmalaysia.my/dari-ppr-ke-dapur-digital-bertaraf-5-bintang-revolusi-keusahawanan-wanita-ppr-malaysia/",
    },
    {
      blogDate: "November 8 2024",
      blogTitle:
        "Dari PPR ke Dapur Digital Bertaraf 5 Bintang: Revolusi Keusahawanan Wanita PPR Malaysia",
      blogUrl:
        "https://soscili.my/dari-ppr-ke-dapur-digital-bertaraf-5-bintang-revolusi-keusahawanan-wanita-ppr-malaysia/?amp=1 ",
    },
    {
      blogDate: "November 9 2024",
      blogTitle: "Projek' Dapur Digital, bantu ekonomi wanita PPR	H Metro	",
      blogUrl:
        "https://www.hmetro.com.my/mutakhir/2024/11/1153219/projek-dapur-digital-bantu-ekonomi-wanita-ppr",
    },
    {
      blogDate: "November 18 2024",
      blogTitle: "Beefing up food sales via cloud kitchen initiative",
      blogUrl:
        "https://www.thestar.com.my/metro/metro-news/2024/11/18/beefing-up-food-sales-via-cloud-kitchen-initiative ",
    },
    {
      blogDate: "November 22 2024",
      blogTitle: "PPR women serve up success at Dapur Digital",
      blogUrl:
        "https://www.freemalaysiatoday.com/category/leisure/2024/11/22/ppr-women-serve-up-success-at-dapur-digital/ ",
    },
    {
      blogDate: "December 5 2024",
      blogTitle:
        "Pepper Labs join forces with Khazanah Nasional to Address Youth Unemployment in Malaysia",
      blogUrl:
        "https://www.malaysiakini.com/announcement/728071#google_vignette",
    },
    {
      blogDate: "December 5 2024",
      blogTitle: "Celebrating Malaysian Changemaker	Wiki Impact",
      blogUrl:
        "http://www.wikiimpact.com/impact100/2024/?sfnsn=wa#welfare-services",
    },
    {
      blogDate: "December 5 2024",
      blogTitle: "MARI TOPUP SAMBAL	Jabatan Wilayah Perseketuan",
      blogUrl: "https://www.facebook.com/reel/538237265843821",
    },
    {
      blogDate: "December 29 2024",
      blogTitle:
        "A desperate mum's cry set this man and his friends on a mission to transform lives",
      blogUrl:
        "https://www.nst.com.my/lifestyle/sunday-vibes/2024/12/1154014/desperate-mums-cry-set-man-and-his-friends-mission-transform",
    },
    {
      blogDate: "January 3 2025",
      blogTitle: "Dapur Digital angkat martabat B40",
      blogUrl:
        "https://www.wilayahku.com.my/canon/uploads/2025/01/Edisi-295-3-9-Januari-2025.pdf",
    },
    {
      blogDate: "January 3 2025",
      blogTitle:
        "DAPUR DIGITAL: KEMAHIRAN KEUSAHAWANAN, PENDAPATAN BERJAYA DIPERTINGKAT",
      blogUrl: "https://youtu.be/O07o8ZBOp6E?si=6xHPfr-_ZY5KRad0",
    },
    {
      blogDate: "January 12 2025",
      blogTitle: "Inisiatif Dapur Digital diperluas ke 20 lokasi PPR tahun ini",
      blogUrl:
        "https://berita.rtm.gov.my/nasional/senarai-berita-nasional/senarai-artikel/inisiatif-dapur-digital-diperluas-ke-20-lokasi-ppr-tahun-ini",
    },
    {
      blogDate: "January 20 2025",
      blogTitle: "Building A Digital Malaysia Through Youth Innovation",
      blogUrl:
        "https://www.businesstoday.com.my/2025/01/20/building-a-digital-malaysia-through-youth-innovation/",
    },
    {
      blogDate: "January 22 2025",
      blogTitle: "Powering a digital generation",
      blogUrl:
        "https://thesun.my/opinion-news/powering-a-digital-generation-GB13562589",
    },
  ],
  c2 = Ho.reverse(),
  d2 = () => {
    (jr("(min-width: 576px)"), jr("(min-width: 768px)"));
    const e = jr("(min-width: 992px)"),
      t = Math.ceil(Ho.length / 9),
      [n, r] = j.useState(1),
      i = (n - 1) * 9,
      l = n * 9;
    return u.jsxs(u.Fragment, {
      children: [
        u.jsx(f2, {
          url: "/our-impact",
          breadCrumbTitle: "Our Impact",
          breadCrumbLink: "Our Impact",
        }),
        u.jsx("div", {
          className: "Container",
          children: u.jsxs("div", {
            className: "mt-[30px] lg:mt-[60px]",
            children: [
              u.jsx("div", {
                className:
                  "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] md:gap-[30px]",
                children: c2
                  .slice(i, l)
                  .map((a, s) => ({
                    ...a,
                    id: s,
                    blogThumb: "/assets/news/news-1.webp",
                    blogDateIcon: u.jsx(Il, {}),
                    blogDesc:
                      "Pepper Labs, a local social enterprise, has launched Dapur Digital to empower B40 women entrepreneurs with cloud kitchens. Dapur Digital is a cloud-kitchen initiative aimed at empowering B40 women micro-entrepreneurs from People's Housing Programme (PPR) areas with culinary skills and business training.",
                    blogBtn: "Read More",
                  }))
                  .map(
                    ({
                      id: a,
                      blogThumb: s,
                      blogDateIcon: o,
                      blogDate: c,
                      blogUrl: d,
                      blogTitle: p,
                      blogDesc: h,
                      blogBtn: v,
                    }) =>
                      u.jsx(
                        u2,
                        {
                          blogThumb: s,
                          blogDateIcon: o,
                          blogDate: c,
                          blogUrl: d,
                          blogTitle: p,
                          blogDesc: h,
                          blogBtn: v,
                        },
                        a,
                      ),
                  ),
              }),
              u.jsxs("div", {
                className:
                  "flex py-8 gap-[30px] my-[30px] justify-center items-center",
                children: [
                  u.jsx("button", {
                    className: Wn("font-bold tracking-[1px]", {
                      "text-[#979595] opacity-50": n === 1,
                      "text-SecondaryText": n !== 1,
                    }),
                    onClick: () => {
                      n > 1 ? r(n - 1) : r(1);
                    },
                    children: "PREV",
                  }),
                  !e && u.jsxs("div", { children: [n, " of ", t] }),
                  e &&
                    Array(t)
                      .fill(0)
                      .map((a, s) =>
                        u.jsx("button", {
                          onClick: () => r(s + 1),
                          className: Wn(
                            "p-2.5 min-w-10 h-10 rounded font-semibold",
                            {
                              "bg-primary-500 text-white": n === s + 1,
                              "bg-[#EDEDED] text-SecondaryText": n !== s + 1,
                            },
                          ),
                          children: s + 1,
                        }),
                      ),
                  u.jsx("button", {
                    className: Wn(
                      "font-bold text-SecondaryText tracking-[1px]",
                      {
                        "text-[#979595] opacity-50": n === t,
                        "text-SecondaryText": n !== t,
                      },
                    ),
                    onClick: () => {
                      l < Ho.length && r(n + 1);
                    },
                    children: "NEXT",
                  }),
                ],
              }),
            ],
          }),
        }),
        u.jsx(Ba, {}),
      ],
    });
  },
  f2 = ({ breadCrumbTitle: e, url: t, breadCrumbLink: n }) =>
    u.jsx("div", {
      className:
        "bg-primary-500 flex items-center justify-center h-[300px] sm:h-[300px]",
      children: u.jsxs("div", {
        className: "Container flex flex-col justify-center items-center gap-5",
        children: [
          u.jsx("h1", {
            className:
              "font-primary font-bold text-4xl sm:text-[44px] md:text-[48px] leading-[56.2px] text-white capitalize",
            children: e,
          }),
          u.jsx("div", {
            className: "inline-block px-8",
            children: u.jsxs("ul", {
              className:
                "flex flex-row gap-2 sm:gap-4 sm:items-center justify-center",
              children: [
                u.jsx("li", {
                  children: u.jsx(ee, {
                    to: "/",
                    children: u.jsx("button", {
                      className:
                        "font-primary text-[16px] text-white flex items-center gap-2 transition-all duration-500 hover:text-primary-500",
                      children: "Home",
                    }),
                  }),
                }),
                u.jsx("li", {
                  children: u.jsx("div", {
                    className: "text-white block",
                    children: "/",
                  }),
                }),
                u.jsx("li", {
                  children: u.jsx(ee, {
                    to: t,
                    children: u.jsx("button", {
                      className:
                        "font-primary text-[16px] capitalize text-white",
                      children: n,
                    }),
                  }),
                }),
              ],
            }),
          }),
        ],
      }),
    }),
  p2 = () =>
    u.jsxs("main", {
      className:
        "h-screen w-full flex flex-col justify-center items-center bg-HeadingColor-0",
      children: [
        u.jsx("h1", {
          className:
            "text-8xl sm:text-9xl font-extrabold text-white tracking-widest",
          children: "404",
        }),
        u.jsx("div", {
          className:
            "bg-PrimaryColor-0 px-2 text-sm rounded rotate-12 absolute",
          children: "Page Not Found",
        }),
        u.jsx("button", {
          className: "mt-5",
          children: u.jsxs("a", {
            className:
              "relative inline-block text-sm font-medium text-PrimaryColor-0 group active:text-PrimaryColor-0 focus:outline-none focus:ring",
            children: [
              u.jsx("span", {
                className:
                  "absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-PrimaryColor-0 group-hover:translate-y-0 group-hover:translate-x-0",
              }),
              u.jsx("span", {
                className:
                  "relative block px-8 py-3 bg-HeadingColor-0 border border-current",
                children: u.jsx(ee, { to: "/", children: "Go Home" }),
              }),
            ],
          }),
        }),
      ],
    }),
  m2 = Dx([
    {
      path: "/",
      errorElement: u.jsx(p2, {}),
      element: u.jsx(my, {}),
      children: [
        { index: !0, path: "/", element: u.jsx(Fw, {}) },
        { path: "/who-we-are", element: u.jsx(Jw, {}) },
        { path: "/our-expertise", element: u.jsx(s2, {}) },
        { path: "/our-impact", element: u.jsx(d2, {}) },
        { path: "/work-with-us", element: u.jsx(r2, {}) },
      ],
    },
  ]);
Bs.createRoot(document.getElementById("root")).render(
  u.jsx(le.StrictMode, {
    children: u.jsx(le.StrictMode, { children: u.jsx(Bx, { router: m2 }) }),
  }),
);
