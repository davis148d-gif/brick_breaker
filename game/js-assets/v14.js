(() => {
  var K1 = Object.create;
  var Kf = Object.defineProperty;
  var k1 = Object.getOwnPropertyDescriptor;
  var J1 = Object.getOwnPropertyNames;
  var F1 = Object.getPrototypeOf, $1 = Object.prototype.hasOwnProperty;
  var Be = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports);
  var W1 = (t, e, l, a) => {
    if (e && typeof e == "object" || typeof e == "function")
      for (let n of J1(e))
        !$1.call(t, n) && n !== l && Kf(t, n, { get: () => e[n], enumerable: !(a = k1(e, n)) || a.enumerable });
    return t;
  };
  var be = (t, e, l) => (l = t != null ? K1(F1(t)) : {}, W1(
    e || !t || !t.__esModule ? Kf(l, "default", { value: t, enumerable: !0 }) : l,
    t
  ));
  var lr = Be((it) => {
    "use strict";
    function zc(t, e) {
      var l = t.length;
      t.push(e);
      t: for (; 0 < l; ) {
        var a = l - 1 >>> 1, n = t[a];
        if (0 < Oi(n, e))
          t[a] = e, t[l] = n, l = a;
        else break t;
      }
    }
    function He(t) {
      return t.length === 0 ? null : t[0];
    }
    function Di(t) {
      if (t.length === 0) return null;
      var e = t[0], l = t.pop();
      if (l !== e) {
        t[0] = l;
        t: for (var a = 0, n = t.length, i = n >>> 1; a < i; ) {
          var u = 2 * (a + 1) - 1, c = t[u], s = u + 1, o = t[s];
          if (0 > Oi(c, l))
            s < n && 0 > Oi(o, c) ? (t[a] = o, t[s] = l, a = s) : (t[a] = c, t[u] = l, a = u);
          else if (s < n && 0 > Oi(o, l))
            t[a] = o, t[s] = l, a = s;
          else break t;
        }
      }
      return e;
    }
    function Oi(t, e) {
      var l = t.sortIndex - e.sortIndex;
      return l !== 0 ? l : t.id - e.id;
    }
    it.unstable_now = void 0;
    typeof performance == "object" && typeof performance.now == "function" ? (kf = performance, it.unstable_now = function() {
      return kf.now();
    }) : (Ac = Date, Jf = Ac.now(), it.unstable_now = function() {
      return Ac.now() - Jf;
    });
    var kf, Ac, Jf, Ie = [], bl = [], I1 = 1, ve = null, Ht = 3, Dc = !1, Mn = !1, _n = !1, wc = !1, Wf = typeof setTimeout == "function" ? setTimeout : null, If = typeof clearTimeout == "function" ? clearTimeout : null, Ff = typeof setImmediate < "u" ? setImmediate : null;
    function zi(t) {
      for (var e = He(bl); e !== null; ) {
        if (e.callback === null) Di(bl);
        else if (e.startTime <= t)
          Di(bl), e.sortIndex = e.expirationTime, zc(Ie, e);
        else break;
        e = He(bl);
      }
    }
    function Rc(t) {
      if (_n = !1, zi(t), !Mn)
        if (He(Ie) !== null)
          Mn = !0, Ta || (Ta = !0, Sa());
        else {
          var e = He(bl);
          e !== null && Uc(Rc, e.startTime - t);
        }
    }
    var Ta = !1, En = -1, Pf = 5, tr = -1;
    function er() {
      return wc ? !0 : !(it.unstable_now() - tr < Pf);
    }
    function Cc() {
      if (wc = !1, Ta) {
        var t = it.unstable_now();
        tr = t;
        var e = !0;
        try {
          t: {
            Mn = !1, _n && (_n = !1, If(En), En = -1), Dc = !0;
            var l = Ht;
            try {
              e: {
                for (zi(t), ve = He(Ie); ve !== null && !(ve.expirationTime > t && er()); ) {
                  var a = ve.callback;
                  if (typeof a == "function") {
                    ve.callback = null, Ht = ve.priorityLevel;
                    var n = a(
                      ve.expirationTime <= t
                    );
                    if (t = it.unstable_now(), typeof n == "function") {
                      ve.callback = n, zi(t), e = !0;
                      break e;
                    }
                    ve === He(Ie) && Di(Ie), zi(t);
                  } else Di(Ie);
                  ve = He(Ie);
                }
                if (ve !== null) e = !0;
                else {
                  var i = He(bl);
                  i !== null && Uc(
                    Rc,
                    i.startTime - t
                  ), e = !1;
                }
              }
              break t;
            } finally {
              ve = null, Ht = l, Dc = !1;
            }
            e = void 0;
          }
        } finally {
          e ? Sa() : Ta = !1;
        }
      }
    }
    var Sa;
    typeof Ff == "function" ? Sa = function() {
      Ff(Cc);
    } : typeof MessageChannel < "u" ? (Oc = new MessageChannel(), $f = Oc.port2, Oc.port1.onmessage = Cc, Sa = function() {
      $f.postMessage(null);
    }) : Sa = function() {
      Wf(Cc, 0);
    };
    var Oc, $f;
    function Uc(t, e) {
      En = Wf(function() {
        t(it.unstable_now());
      }, e);
    }
    it.unstable_IdlePriority = 5;
    it.unstable_ImmediatePriority = 1;
    it.unstable_LowPriority = 4;
    it.unstable_NormalPriority = 3;
    it.unstable_Profiling = null;
    it.unstable_UserBlockingPriority = 2;
    it.unstable_cancelCallback = function(t) {
      t.callback = null;
    };
    it.unstable_forceFrameRate = function(t) {
      0 > t || 125 < t ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Pf = 0 < t ? Math.floor(1e3 / t) : 5;
    };
    it.unstable_getCurrentPriorityLevel = function() {
      return Ht;
    };
    it.unstable_next = function(t) {
      switch (Ht) {
        case 1:
        case 2:
        case 3:
          var e = 3;
          break;
        default:
          e = Ht;
      }
      var l = Ht;
      Ht = e;
      try {
        return t();
      } finally {
        Ht = l;
      }
    };
    it.unstable_requestPaint = function() {
      wc = !0;
    };
    it.unstable_runWithPriority = function(t, e) {
      switch (t) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          t = 3;
      }
      var l = Ht;
      Ht = t;
      try {
        return e();
      } finally {
        Ht = l;
      }
    };
    it.unstable_scheduleCallback = function(t, e, l) {
      var a = it.unstable_now();
      switch (typeof l == "object" && l !== null ? (l = l.delay, l = typeof l == "number" && 0 < l ? a + l : a) : l = a, t) {
        case 1:
          var n = -1;
          break;
        case 2:
          n = 250;
          break;
        case 5:
          n = 1073741823;
          break;
        case 4:
          n = 1e4;
          break;
        default:
          n = 5e3;
      }
      return n = l + n, t = {
        id: I1++,
        callback: e,
        priorityLevel: t,
        startTime: l,
        expirationTime: n,
        sortIndex: -1
      }, l > a ? (t.sortIndex = l, zc(bl, t), He(Ie) === null && t === He(bl) && (_n ? (If(En), En = -1) : _n = !0, Uc(Rc, l - a))) : (t.sortIndex = n, zc(Ie, t), Mn || Dc || (Mn = !0, Ta || (Ta = !0, Sa()))), t;
    };
    it.unstable_shouldYield = er;
    it.unstable_wrapCallback = function(t) {
      var e = Ht;
      return function() {
        var l = Ht;
        Ht = e;
        try {
          return t.apply(this, arguments);
        } finally {
          Ht = l;
        }
      };
    };
  });
  var nr = Be((qg, ar) => {
    "use strict";
    ar.exports = lr();
  });
  var yr = Be((U) => {
    "use strict";
    var Gc = Symbol.for("react.transitional.element"), P1 = Symbol.for("react.portal"), tb = Symbol.for("react.fragment"), eb = Symbol.for("react.strict_mode"), lb = Symbol.for("react.profiler"), ab = Symbol.for("react.consumer"), nb = Symbol.for("react.context"), ib = Symbol.for("react.forward_ref"), ub = Symbol.for("react.suspense"), cb = Symbol.for("react.memo"), sr = Symbol.for("react.lazy"), ob = Symbol.for("react.activity"), sb = Symbol.for("react.view_transition"), ir = Symbol.iterator;
    function fb(t) {
      return t === null || typeof t != "object" ? null : (t = ir && t[ir] || t["@@iterator"], typeof t == "function" ? t : null);
    }
    var fr = {
      isMounted: function() {
        return !1;
      },
      enqueueForceUpdate: function() {
      },
      enqueueReplaceState: function() {
      },
      enqueueSetState: function() {
      }
    }, rr = Object.assign, dr = {};
    function Ma(t, e, l) {
      this.props = t, this.context = e, this.refs = dr, this.updater = l || fr;
    }
    Ma.prototype.isReactComponent = {};
    Ma.prototype.setState = function(t, e) {
      if (typeof t != "object" && typeof t != "function" && t != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, t, e, "setState");
    };
    Ma.prototype.forceUpdate = function(t) {
      this.updater.enqueueForceUpdate(this, t, "forceUpdate");
    };
    function mr() {
    }
    mr.prototype = Ma.prototype;
    function Lc(t, e, l) {
      this.props = t, this.context = e, this.refs = dr, this.updater = l || fr;
    }
    var Yc = Lc.prototype = new mr();
    Yc.constructor = Lc;
    rr(Yc, Ma.prototype);
    Yc.isPureReactComponent = !0;
    var ur = Array.isArray;
    function Hc() {
    }
    var et = { H: null, A: null, T: null, S: null }, hr = Object.prototype.hasOwnProperty;
    function qc(t, e, l) {
      var a = l.ref;
      return {
        $$typeof: Gc,
        type: t,
        key: e,
        ref: a !== void 0 ? a : null,
        props: l
      };
    }
    function rb(t, e) {
      return qc(t.type, e, t.props);
    }
    function jc(t) {
      return typeof t == "object" && t !== null && t.$$typeof === Gc;
    }
    function db(t) {
      var e = { "=": "=0", ":": "=2" };
      return "$" + t.replace(/[=:]/g, function(l) {
        return e[l];
      });
    }
    var cr = /\/+/g;
    function Bc(t, e) {
      return typeof t == "object" && t !== null && t.key != null ? db("" + t.key) : e.toString(36);
    }
    function mb(t) {
      switch (t.status) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw t.reason;
        default:
          switch (typeof t.status == "string" ? t.then(Hc, Hc) : (t.status = "pending", t.then(
            function(e) {
              t.status === "pending" && (t.status = "fulfilled", t.value = e);
            },
            function(e) {
              t.status === "pending" && (t.status = "rejected", t.reason = e);
            }
          )), t.status) {
            case "fulfilled":
              return t.value;
            case "rejected":
              throw t.reason;
          }
      }
      throw t;
    }
    function Na(t, e, l, a, n) {
      var i = typeof t;
      (i === "undefined" || i === "boolean") && (t = null);
      var u = !1;
      if (t === null) u = !0;
      else
        switch (i) {
          case "bigint":
          case "string":
          case "number":
            u = !0;
            break;
          case "object":
            switch (t.$$typeof) {
              case Gc:
              case P1:
                u = !0;
                break;
              case sr:
                return u = t._init, Na(
                  u(t._payload),
                  e,
                  l,
                  a,
                  n
                );
            }
        }
      if (u)
        return n = n(t), u = a === "" ? "." + Bc(t, 0) : a, ur(n) ? (l = "", u != null && (l = u.replace(cr, "$&/") + "/"), Na(n, e, l, "", function(o) {
          return o;
        })) : n != null && (jc(n) && (n = rb(
          n,
          l + (n.key == null || t && t.key === n.key ? "" : ("" + n.key).replace(
            cr,
            "$&/"
          ) + "/") + u
        )), e.push(n)), 1;
      u = 0;
      var c = a === "" ? "." : a + ":";
      if (ur(t))
        for (var s = 0; s < t.length; s++)
          a = t[s], i = c + Bc(a, s), u += Na(
            a,
            e,
            l,
            i,
            n
          );
      else if (s = fb(t), typeof s == "function")
        for (t = s.call(t), s = 0; !(a = t.next()).done; )
          a = a.value, i = c + Bc(a, s++), u += Na(
            a,
            e,
            l,
            i,
            n
          );
      else if (i === "object") {
        if (typeof t.then == "function")
          return Na(
            mb(t),
            e,
            l,
            a,
            n
          );
        throw e = String(t), Error(
          "Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead."
        );
      }
      return u;
    }
    function wi(t, e, l) {
      if (t == null) return t;
      var a = [], n = 0;
      return Na(t, a, "", "", function(i) {
        return e.call(l, i, n++);
      }), a;
    }
    function hb(t) {
      if (t._status === -1) {
        var e = t._result, l = e();
        l.then(
          function(a) {
            (t._status === 0 || t._status === -1) && (t._status = 1, t._result = a, l.status === void 0 && (l.status = "fulfilled", l.value = a));
          },
          function(a) {
            (t._status === 0 || t._status === -1) && (t._status = 2, t._result = a, l.status === void 0 && (l.status = "rejected", l.reason = a));
          }
        ), t._status === -1 && (t._status = 0, t._result = l);
      }
      if (t._status === 1) return t._result.default;
      throw t._result;
    }
    var or = typeof reportError == "function" ? reportError : function(t) {
      if (typeof window == "object" && typeof window.ErrorEvent == "function") {
        var e = new window.ErrorEvent("error", {
          bubbles: !0,
          cancelable: !0,
          message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
          error: t
        });
        if (!window.dispatchEvent(e)) return;
      } else if (typeof process == "object" && typeof process.emit == "function") {
        process.emit("uncaughtException", t);
        return;
      }
      console.error(t);
    };
    function br(t) {
      var e = et.T, l = {};
      l.types = e !== null ? e.types : null, et.T = l;
      try {
        var a = t(), n = et.S;
        n !== null && n(l, a), typeof a == "object" && a !== null && typeof a.then == "function" && a.then(Hc, or);
      } catch (i) {
        or(i);
      } finally {
        e !== null && l.types !== null && (e.types = l.types), et.T = e;
      }
    }
    function vr(t) {
      var e = et.T;
      if (e !== null) {
        var l = e.types;
        l === null ? e.types = [t] : l.indexOf(t) === -1 && l.push(t);
      } else br(vr.bind(null, t));
    }
    var bb = {
      map: wi,
      forEach: function(t, e, l) {
        wi(
          t,
          function() {
            e.apply(this, arguments);
          },
          l
        );
      },
      count: function(t) {
        var e = 0;
        return wi(t, function() {
          e++;
        }), e;
      },
      toArray: function(t) {
        return wi(t, function(e) {
          return e;
        }) || [];
      },
      only: function(t) {
        if (!jc(t))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return t;
      }
    };
    U.Activity = ob;
    U.Children = bb;
    U.Component = Ma;
    U.Fragment = tb;
    U.Profiler = lb;
    U.PureComponent = Lc;
    U.StrictMode = eb;
    U.Suspense = ub;
    U.ViewTransition = sb;
    U.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = et;
    U.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function(t) {
        return et.H.useMemoCache(t);
      }
    };
    U.addTransitionType = vr;
    U.cache = function(t) {
      return function() {
        return t.apply(null, arguments);
      };
    };
    U.cacheSignal = function() {
      return null;
    };
    U.cloneElement = function(t, e, l) {
      if (t == null)
        throw Error(
          "The argument must be a React element, but you passed " + t + "."
        );
      var a = rr({}, t.props), n = t.key;
      if (e != null)
        for (i in e.key !== void 0 && (n = "" + e.key), e)
          !hr.call(e, i) || i === "key" || i === "__self" || i === "__source" || i === "ref" && e.ref === void 0 || (a[i] = e[i]);
      var i = arguments.length - 2;
      if (i === 1) a.children = l;
      else if (1 < i) {
        for (var u = Array(i), c = 0; c < i; c++)
          u[c] = arguments[c + 2];
        a.children = u;
      }
      return qc(t.type, n, a);
    };
    U.createContext = function(t) {
      return t = {
        $$typeof: nb,
        _currentValue: t,
        _currentValue2: t,
        _threadCount: 0,
        Provider: null,
        Consumer: null
      }, t.Provider = t, t.Consumer = {
        $$typeof: ab,
        _context: t
      }, t;
    };
    U.createElement = function(t, e, l) {
      var a, n = {}, i = null;
      if (e != null)
        for (a in e.key !== void 0 && (i = "" + e.key), e)
          hr.call(e, a) && a !== "key" && a !== "__self" && a !== "__source" && (n[a] = e[a]);
      var u = arguments.length - 2;
      if (u === 1) n.children = l;
      else if (1 < u) {
        for (var c = Array(u), s = 0; s < u; s++)
          c[s] = arguments[s + 2];
        n.children = c;
      }
      if (t && t.defaultProps)
        for (a in u = t.defaultProps, u)
          n[a] === void 0 && (n[a] = u[a]);
      return qc(t, i, n);
    };
    U.createRef = function() {
      return { current: null };
    };
    U.forwardRef = function(t) {
      return { $$typeof: ib, render: t };
    };
    U.isValidElement = jc;
    U.lazy = function(t) {
      return {
        $$typeof: sr,
        _payload: { _status: -1, _result: t },
        _init: hb
      };
    };
    U.memo = function(t, e) {
      return {
        $$typeof: cb,
        type: t,
        compare: e === void 0 ? null : e
      };
    };
    U.startTransition = br;
    U.unstable_useCacheRefresh = function() {
      return et.H.useCacheRefresh();
    };
    U.use = function(t) {
      return et.H.use(t);
    };
    U.useActionState = function(t, e, l) {
      return et.H.useActionState(t, e, l);
    };
    U.useCallback = function(t, e) {
      return et.H.useCallback(t, e);
    };
    U.useContext = function(t) {
      return et.H.useContext(t);
    };
    U.useDebugValue = function() {
    };
    U.useDeferredValue = function(t, e) {
      return et.H.useDeferredValue(t, e);
    };
    U.useEffect = function(t, e) {
      return et.H.useEffect(t, e);
    };
    U.useEffectEvent = function(t) {
      return et.H.useEffectEvent(t);
    };
    U.useId = function() {
      return et.H.useId();
    };
    U.useImperativeHandle = function(t, e, l) {
      return et.H.useImperativeHandle(t, e, l);
    };
    U.useInsertionEffect = function(t, e) {
      return et.H.useInsertionEffect(t, e);
    };
    U.useLayoutEffect = function(t, e) {
      return et.H.useLayoutEffect(t, e);
    };
    U.useMemo = function(t, e) {
      return et.H.useMemo(t, e);
    };
    U.useOptimistic = function(t, e) {
      return et.H.useOptimistic(t, e);
    };
    U.useReducer = function(t, e, l) {
      return et.H.useReducer(t, e, l);
    };
    U.useRef = function(t) {
      return et.H.useRef(t);
    };
    U.useState = function(t) {
      return et.H.useState(t);
    };
    U.useSyncExternalStore = function(t, e, l) {
      return et.H.useSyncExternalStore(
        t,
        e,
        l
      );
    };
    U.useTransition = function() {
      return et.H.useTransition();
    };
    U.version = "19.3.1";
  });
  var _a = Be((Xg, gr) => {
    "use strict";
    gr.exports = yr();
  });
  var Sr = Be((Gt) => {
    "use strict";
    var vb = _a();
    function xr(t) {
      var e = "https://react.dev/errors/" + t;
      if (1 < arguments.length) {
        e += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var l = 2; l < arguments.length; l++)
          e += "&args[]=" + encodeURIComponent(arguments[l]);
      }
      return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    function vl() {
    }
    var jt = {
      d: {
        f: vl,
        r: function() {
          throw Error(xr(522));
        },
        D: vl,
        C: vl,
        L: vl,
        m: vl,
        X: vl,
        S: vl,
        M: vl
      },
      p: 0,
      findDOMNode: null
    }, yb = Symbol.for("react.portal"), gb = Symbol.for("react.recoverable"), pr = Symbol.for("react.optimistic_key");
    function pb(t, e, l) {
      var a = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: yb,
        key: a == null ? null : a === pr ? pr : "" + a,
        children: t,
        containerInfo: e,
        implementation: l
      };
    }
    var An = vb.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function Ri(t, e) {
      if (t === "font") return "";
      if (typeof e == "string")
        return e === "use-credentials" ? e : "";
    }
    Gt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = jt;
    Gt.browser = function(t) {
      return { $$typeof: gb, _reason: t };
    };
    Gt.createPortal = function(t, e) {
      var l = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
        throw Error(xr(299));
      return pb(t, e, null, l);
    };
    Gt.flushSync = function(t) {
      var e = An.T, l = jt.p;
      try {
        if (An.T = null, jt.p = 2, t) return t();
      } finally {
        An.T = e, jt.p = l, jt.d.f();
      }
    };
    Gt.preconnect = function(t, e) {
      typeof t == "string" && (e ? (e = e.crossOrigin, e = typeof e == "string" ? e === "use-credentials" ? e : "" : void 0) : e = null, jt.d.C(t, e));
    };
    Gt.prefetchDNS = function(t) {
      typeof t == "string" && jt.d.D(t);
    };
    Gt.preinit = function(t, e) {
      if (typeof t == "string" && e && typeof e.as == "string") {
        var l = e.as, a = Ri(l, e.crossOrigin), n = typeof e.integrity == "string" ? e.integrity : void 0, i = typeof e.fetchPriority == "string" ? e.fetchPriority : void 0;
        l === "style" ? jt.d.S(
          t,
          typeof e.precedence == "string" ? e.precedence : void 0,
          {
            crossOrigin: a,
            integrity: n,
            fetchPriority: i
          }
        ) : l === "script" && jt.d.X(t, {
          crossOrigin: a,
          integrity: n,
          fetchPriority: i,
          nonce: typeof e.nonce == "string" ? e.nonce : void 0
        });
      }
    };
    Gt.preinitModule = function(t, e) {
      if (typeof t == "string")
        if (typeof e == "object" && e !== null) {
          if (e.as == null || e.as === "script") {
            var l = Ri(
              e.as,
              e.crossOrigin
            );
            jt.d.M(t, {
              crossOrigin: l,
              integrity: typeof e.integrity == "string" ? e.integrity : void 0,
              nonce: typeof e.nonce == "string" ? e.nonce : void 0,
              fetchPriority: typeof e.fetchPriority == "string" ? e.fetchPriority : void 0
            });
          }
        } else e == null && jt.d.M(t);
    };
    Gt.preload = function(t, e) {
      if (typeof t == "string" && typeof e == "object" && e !== null && typeof e.as == "string") {
        var l = e.as, a = Ri(l, e.crossOrigin);
        jt.d.L(t, l, {
          crossOrigin: a,
          integrity: typeof e.integrity == "string" ? e.integrity : void 0,
          nonce: typeof e.nonce == "string" ? e.nonce : void 0,
          type: typeof e.type == "string" ? e.type : void 0,
          fetchPriority: typeof e.fetchPriority == "string" ? e.fetchPriority : void 0,
          referrerPolicy: typeof e.referrerPolicy == "string" ? e.referrerPolicy : void 0,
          imageSrcSet: typeof e.imageSrcSet == "string" ? e.imageSrcSet : void 0,
          imageSizes: typeof e.imageSizes == "string" ? e.imageSizes : void 0,
          media: typeof e.media == "string" ? e.media : void 0
        });
      }
    };
    Gt.preloadModule = function(t, e) {
      if (typeof t == "string")
        if (e) {
          var l = Ri(e.as, e.crossOrigin);
          jt.d.m(t, {
            as: typeof e.as == "string" && e.as !== "script" ? e.as : void 0,
            crossOrigin: l,
            integrity: typeof e.integrity == "string" ? e.integrity : void 0,
            nonce: typeof e.nonce == "string" ? e.nonce : void 0,
            fetchPriority: typeof e.fetchPriority == "string" ? e.fetchPriority : void 0
          });
        } else jt.d.m(t);
    };
    Gt.requestFormReset = function(t) {
      jt.d.r(t);
    };
    Gt.unstable_batchedUpdates = function(t, e) {
      return t(e);
    };
    Gt.useFormState = function(t, e, l) {
      return An.H.useFormState(t, e, l);
    };
    Gt.useFormStatus = function() {
      return An.H.useHostTransitionStatus();
    };
    Gt.version = "19.3.1";
  });
  var Mr = Be((Qg, Nr) => {
    "use strict";
    function Tr() {
      if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Tr);
        } catch (t) {
          console.error(t);
        }
    }
    Tr(), Nr.exports = Sr();
  });
  var f1 = Be((hc) => {
    "use strict";
    var xt = nr(), s0 = _a(), xb = Mr();
    function S(t) {
      var e = "https://react.dev/errors/" + t;
      if (1 < arguments.length) {
        e += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var l = 2; l < arguments.length; l++)
          e += "&args[]=" + encodeURIComponent(arguments[l]);
      }
      return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    function f0(t) {
      return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
    }
    function hi(t) {
      for (var e = t, l = e; l && !l.alternate; )
        e = l, (e.flags & 4098) !== 0 && (t = e.return), l = e.return;
      for (; e.return; ) e = e.return;
      return e.tag === 3 ? t : null;
    }
    function r0(t) {
      if (t.tag === 13) {
        var e = t.memoizedState;
        if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
      }
      return null;
    }
    function d0(t) {
      if (t.tag === 31) {
        var e = t.memoizedState;
        if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
      }
      return null;
    }
    function _r(t) {
      if (hi(t) !== t)
        throw Error(S(188));
    }
    function Sb(t) {
      var e = t.alternate;
      if (!e) {
        if (e = hi(t), e === null) throw Error(S(188));
        return e !== t ? null : t;
      }
      for (var l = t, a = e; ; ) {
        var n = l.return;
        if (n === null) break;
        var i = n.alternate;
        if (i === null) {
          if (a = n.return, a !== null) {
            l = a;
            continue;
          }
          break;
        }
        if (n.child === i.child) {
          for (i = n.child; i; ) {
            if (i === l) return _r(n), t;
            if (i === a) return _r(n), e;
            i = i.sibling;
          }
          throw Error(S(188));
        }
        if (l.return !== a.return) l = n, a = i;
        else {
          for (var u = !1, c = n.child; c; ) {
            if (c === l) {
              u = !0, l = n, a = i;
              break;
            }
            if (c === a) {
              u = !0, a = n, l = i;
              break;
            }
            c = c.sibling;
          }
          if (!u) {
            for (c = i.child; c; ) {
              if (c === l) {
                u = !0, l = i, a = n;
                break;
              }
              if (c === a) {
                u = !0, a = i, l = n;
                break;
              }
              c = c.sibling;
            }
            if (!u) throw Error(S(189));
          }
        }
        if (l.alternate !== a) throw Error(S(190));
      }
      if (l.tag !== 3) throw Error(S(188));
      return l.stateNode.current === l ? t : e;
    }
    function m0(t) {
      var e = t.tag;
      if (e === 5 || e === 26 || e === 27 || e === 6) return t;
      for (t = t.child; t !== null; ) {
        if (e = m0(t), e !== null) return e;
        t = t.sibling;
      }
      return null;
    }
    function Wt(t, e, l, a, n, i) {
      for (; t !== null; ) {
        if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && l(t, a, n, i) || (t.tag !== 22 || t.memoizedState === null) && (e || t.tag !== 5 && t.tag !== 27) && Wt(
          t.child,
          e,
          l,
          a,
          n,
          i
        ))
          return !0;
        t = t.sibling;
      }
      return !1;
    }
    function ba(t) {
      for (t = t.return; t !== null; ) {
        if (t.tag === 3 || t.tag === 5 || t.tag === 27) return t;
        t = t.return;
      }
      return null;
    }
    function Er(t) {
      var e = !1;
      for (t = t.return; t !== null && (t.tag === 4 && (e = !0), !(t.tag === 3 || t.tag === 5 || t.tag === 27)); )
        t = t.return;
      return e;
    }
    function h0(t) {
      var e = [null, null], l = ba(t);
      return l === null || b0(
        e,
        t,
        l.child,
        { foundSelf: !1 }
      ), e;
    }
    function b0(t, e, l, a) {
      for (; l !== null; ) {
        if (l === e) a.foundSelf = !0;
        else if (l.tag === 5 || l.tag === 27 || l.tag === 6) {
          if (a.foundSelf) return t[1] = l, !0;
          t[0] = l;
        } else if ((l.tag !== 22 || l.memoizedState === null) && b0(
          t,
          e,
          l.child,
          a
        ))
          return !0;
        l = l.sibling;
      }
      return !1;
    }
    function pt(t) {
      switch (t.tag) {
        case 5:
        case 27:
        case 6:
          return t.stateNode;
        case 3:
          return t.stateNode.containerInfo;
        default:
          throw Error(S(559));
      }
    }
    var wa = null, xo = null;
    function Tb(t, e, l) {
      return t === l ? !0 : t === e ? (wa = t, !0) : !1;
    }
    function Nb(t, e, l) {
      return t === l ? (xo = t, !1) : t === e ? (xo !== null && (wa = t), !0) : !1;
    }
    function Ar(t) {
      if (t === null) return null;
      do
        t = t === null ? null : t.return;
      while (t && t.tag !== 5 && t.tag !== 27 && t.tag !== 3);
      return t || null;
    }
    function So(t, e, l) {
      for (var a = 0, n = t; n; n = l(n)) a++;
      n = 0;
      for (var i = e; i; i = l(i)) n++;
      for (; 0 < a - n; ) t = l(t), a--;
      for (; 0 < n - a; ) e = l(e), n--;
      for (; a--; ) {
        if (t === e || e !== null && t === e.alternate)
          return t;
        t = l(t), e = l(e);
      }
      return null;
    }
    var tt = Object.assign, Mb = Symbol.for("react.element"), Ui = Symbol.for("react.transitional.element"), Un = Symbol.for("react.portal"), Ra = Symbol.for("react.fragment"), v0 = Symbol.for("react.strict_mode"), To = Symbol.for("react.profiler"), y0 = Symbol.for("react.consumer"), Xe = Symbol.for("react.context"), Ds = Symbol.for("react.forward_ref"), No = Symbol.for("react.suspense"), Mo = Symbol.for("react.suspense_list"), ws = Symbol.for("react.memo"), xl = Symbol.for("react.lazy");
    Symbol.for("react.scope");
    var _o = Symbol.for("react.activity"), _b = Symbol.for("react.legacy_hidden");
    Symbol.for("react.tracing_marker");
    var Eb = Symbol.for("react.memo_cache_sentinel"), Eo = Symbol.for("react.view_transition"), Ab = Symbol.for("react.recoverable"), Cr = Symbol.iterator;
    function Cn(t) {
      return t === null || typeof t != "object" ? null : (t = Cr && t[Cr] || t["@@iterator"], typeof t == "function" ? t : null);
    }
    var Cb = Symbol.for("react.client.reference");
    function Ao(t) {
      if (t == null) return null;
      if (typeof t == "function")
        return t.$$typeof === Cb ? null : t.displayName || t.name || null;
      if (typeof t == "string") return t;
      switch (t) {
        case Ra:
          return "Fragment";
        case To:
          return "Profiler";
        case v0:
          return "StrictMode";
        case No:
          return "Suspense";
        case Mo:
          return "SuspenseList";
        case _o:
          return "Activity";
        case Eo:
          return "ViewTransition";
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case Un:
            return "Portal";
          case Xe:
            return t.displayName || "Context";
          case y0:
            return (t._context.displayName || "Context") + ".Consumer";
          case Ds:
            var e = t.render;
            return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
          case ws:
            return e = t.displayName || null, e !== null ? e : Ao(t.type) || "Memo";
          case xl:
            e = t._payload, t = t._init;
            try {
              return Ao(t(e));
            } catch {
            }
        }
      return null;
    }
    var Bn = Array.isArray, R = s0.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Z = xb.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, la = {
      pending: !1,
      data: null,
      method: null,
      action: null
    }, Co = [], Ua = -1;
    function Fe(t) {
      return { current: t };
    }
    function wt(t) {
      0 > Ua || (t.current = Co[Ua], Co[Ua] = null, Ua--);
    }
    function nt(t, e) {
      Ua++, Co[Ua] = t.current, t.current = e;
    }
    var Ke = Fe(null), In = Fe(null), Ol = Fe(null), xu = Fe(null);
    function Su(t, e) {
      switch (nt(Ol, e), nt(In, t), nt(Ke, null), e.nodeType) {
        case 9:
        case 11:
          t = (t = e.documentElement) && (t = t.namespaceURI) ? Xd(t) : 0;
          break;
        default:
          if (t = e.tagName, e = e.namespaceURI)
            e = Xd(e), t = Yh(e, t);
          else
            switch (t) {
              case "svg":
                t = 1;
                break;
              case "math":
                t = 2;
                break;
              default:
                t = 0;
            }
      }
      wt(Ke), nt(Ke, t);
    }
    function tn() {
      wt(Ke), wt(In), wt(Ol);
    }
    function Oo(t) {
      var e = t.memoizedState;
      e !== null && (rn._currentValue = e.memoizedState, nt(xu, t)), e = Ke.current;
      var l = Yh(e, t.type);
      e !== l && (nt(In, t), nt(Ke, l));
    }
    function Tu(t) {
      In.current === t && (wt(Ke), wt(In)), xu.current === t && (wt(xu), rn._currentValue = la);
    }
    var Xc, Or;
    function gl(t) {
      if (Xc === void 0)
        try {
          throw Error();
        } catch (l) {
          var e = l.stack.trim().match(/\n( *(at )?)/);
          Xc = e && e[1] || "", Or = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return `
` + Xc + t + Or;
    }
    var Vc = !1;
    function Qc(t, e) {
      if (!t || Vc) return "";
      Vc = !0;
      var l = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        var a = {
          DetermineComponentFrameRoot: function() {
            try {
              if (e) {
                var b = function() {
                  throw Error();
                };
                if (Object.defineProperty(b.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                }), typeof Reflect == "object" && Reflect.construct) {
                  try {
                    Reflect.construct(b, []);
                  } catch (y) {
                    var d = y;
                  }
                  Reflect.construct(t, [], b);
                } else {
                  try {
                    b.call();
                  } catch (y) {
                    d = y;
                  }
                  b = !1;
                  try {
                    var m = Object.getOwnPropertyDescriptor(
                      t.prototype,
                      "props"
                    );
                    Object.defineProperty(t.prototype, "props", {
                      configurable: !0,
                      set: function() {
                        throw Error();
                      }
                    }), b = !0, new t();
                  } finally {
                    b && (m !== void 0 ? Object.defineProperty(t.prototype, "props", m) : delete t.prototype.props);
                  }
                }
              } else {
                try {
                  throw Error();
                } catch (y) {
                  d = y;
                }
                (b = t()) && typeof b.catch == "function" && b.catch(function() {
                });
              }
            } catch (y) {
              if (y && d && typeof y.stack == "string")
                return [y.stack, d.stack];
            }
            return [null, null];
          }
        };
        a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var n = Object.getOwnPropertyDescriptor(
          a.DetermineComponentFrameRoot,
          "name"
        );
        n && n.configurable && Object.defineProperty(
          a.DetermineComponentFrameRoot,
          "name",
          { value: "DetermineComponentFrameRoot" }
        );
        var i = a.DetermineComponentFrameRoot(), u = i[0], c = i[1];
        if (u && c) {
          var s = u.split(`
`), o = c.split(`
`);
          for (n = a = 0; a < s.length && !s[a].includes("DetermineComponentFrameRoot"); )
            a++;
          for (; n < o.length && !o[n].includes(
            "DetermineComponentFrameRoot"
          ); )
            n++;
          if (a === s.length || n === o.length)
            for (a = s.length - 1, n = o.length - 1; 1 <= a && 0 <= n && s[a] !== o[n]; )
              n--;
          for (; 1 <= a && 0 <= n; a--, n--)
            if (s[a] !== o[n]) {
              if (a !== 1 || n !== 1)
                do
                  if (a--, n--, 0 > n || s[a] !== o[n]) {
                    var r = `
` + s[a].replace(" at new ", " at ");
                    return t.displayName && r.includes("<anonymous>") && (r = r.replace("<anonymous>", t.displayName)), r;
                  }
                while (1 <= a && 0 <= n);
              break;
            }
        }
      } finally {
        Vc = !1, Error.prepareStackTrace = l;
      }
      return (l = t ? t.displayName || t.name : "") ? gl(l) : "";
    }
    function Ob(t, e) {
      switch (t.tag) {
        case 26:
        case 27:
        case 5:
          return gl(t.type);
        case 16:
          return gl("Lazy");
        case 13:
          return t.child !== e && e !== null ? gl("Suspense Fallback") : gl("Suspense");
        case 19:
          return gl("SuspenseList");
        case 0:
        case 15:
          return Qc(t.type, !1);
        case 11:
          return Qc(t.type.render, !1);
        case 1:
          return Qc(t.type, !0);
        case 31:
          return gl("Activity");
        case 30:
          return gl("ViewTransition");
        default:
          return "";
      }
    }
    function zr(t) {
      try {
        var e = "", l = null;
        do
          e += Ob(t, l), l = t, t = t.return;
        while (t);
        return e;
      } catch (a) {
        return `
Error generating stack: ` + a.message + `
` + a.stack;
      }
    }
    var zo = Object.prototype.hasOwnProperty, Rs = xt.unstable_scheduleCallback, Zc = xt.unstable_cancelCallback, zb = xt.unstable_shouldYield, Db = xt.unstable_requestPaint, oe = xt.unstable_now, wb = xt.unstable_getCurrentPriorityLevel, g0 = xt.unstable_ImmediatePriority, p0 = xt.unstable_UserBlockingPriority, Nu = xt.unstable_NormalPriority, Rb = xt.unstable_LowPriority, x0 = xt.unstable_IdlePriority, Ub = xt.log, Bb = xt.unstable_setDisableYieldValue, bi = null, se = null;
    function Nl(t) {
      if (typeof Ub == "function" && Bb(t), se && typeof se.setStrictMode == "function")
        try {
          se.setStrictMode(bi, t);
        } catch {
        }
    }
    var fe = Math.clz32 ? Math.clz32 : Lb, Hb = Math.log, Gb = Math.LN2;
    function Lb(t) {
      return t >>>= 0, t === 0 ? 32 : 31 - (Hb(t) / Gb | 0) | 0;
    }
    var Bi = 256, Hi = 262144, Gi = 4194304;
    function Wl(t) {
      var e = t & 42;
      if (e !== 0) return e;
      switch (t & -t) {
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
          return 64;
        case 128:
          return 128;
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
          return t & -t;
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return t & 3932160;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return t & 62914560;
        case 67108864:
          return 67108864;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 0;
        default:
          return t;
      }
    }
    function Fu(t, e, l) {
      var a = t.pendingLanes;
      if (a === 0) return 0;
      var n = 0, i = t.suspendedLanes, u = t.pingedLanes;
      t = t.warmLanes;
      var c = a & 134217727;
      return c !== 0 ? (a = c & ~i, a !== 0 ? n = Wl(a) : (u &= c, u !== 0 ? n = Wl(u) : l || (l = c & ~t, l !== 0 && (n = Wl(l))))) : (c = a & ~i, c !== 0 ? n = Wl(c) : u !== 0 ? n = Wl(u) : l || (l = a & ~t, l !== 0 && (n = Wl(l)))), n === 0 ? 0 : e !== 0 && e !== n && (e & i) === 0 && (i = n & -n, l = e & -e, i >= l || i === 32 && (l & 4194048) !== 0) ? e : n;
    }
    function vi(t, e) {
      return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
    }
    function S0(t, e) {
      (e & 8) !== 0 && (e |= e & 32);
      var l = t.entangledLanes;
      if (l !== 0)
        for (t = t.entanglements, l &= e; 0 < l; ) {
          var a = 31 - fe(l), n = 1 << a;
          e |= t[a], l &= ~n;
        }
      return e;
    }
    function Yb(t, e) {
      switch (t) {
        case 1:
        case 2:
        case 4:
        case 8:
        case 64:
          return e + 250;
        case 16:
        case 32:
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
          return e + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return -1;
        case 67108864:
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return -1;
      }
    }
    function T0() {
      var t = Gi;
      return Gi <<= 1, (Gi & 62914560) === 0 && (Gi = 4194304), t;
    }
    function Kc(t) {
      for (var e = [], l = 0; 31 > l; l++) e.push(t);
      return e;
    }
    function yi(t, e) {
      t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
    }
    function qb(t, e, l, a, n, i) {
      var u = t.pendingLanes;
      t.pendingLanes = l, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= l, t.entangledLanes &= l, t.errorRecoveryDisabledLanes &= l, t.shellSuspendCounter = 0;
      var c = t.entanglements, s = t.expirationTimes, o = t.hiddenUpdates;
      for (l = u & ~l; 0 < l; ) {
        var r = 31 - fe(l), b = 1 << r;
        c[r] = 0, s[r] = -1;
        var d = o[r];
        if (d !== null)
          for (o[r] = null, r = 0; r < d.length; r++) {
            var m = d[r];
            m !== null && (m.lane &= -536870913);
          }
        l &= ~b;
      }
      a !== 0 && N0(t, a, 0), i !== 0 && n === 0 && t.tag !== 0 && (t.suspendedLanes |= i & ~(u & ~e));
    }
    function N0(t, e, l) {
      t.pendingLanes |= e, t.suspendedLanes &= ~e;
      var a = 31 - fe(e);
      t.entangledLanes |= e, t.entanglements[a] = t.entanglements[a] | 1073741824 | l & 261930;
    }
    function M0(t, e) {
      var l = t.entangledLanes |= e;
      for (t = t.entanglements; l; ) {
        var a = 31 - fe(l), n = 1 << a;
        n & e | t[a] & e && (t[a] |= e), l &= ~n;
      }
    }
    function _0(t, e) {
      var l = e & -e;
      return l = (l & 42) !== 0 ? 1 : Us(l), (l & (t.suspendedLanes | e)) !== 0 ? 0 : l;
    }
    function Us(t) {
      switch (t) {
        case 2:
          t = 1;
          break;
        case 8:
          t = 4;
          break;
        case 32:
          t = 16;
          break;
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
          t = 128;
          break;
        case 268435456:
          t = 134217728;
          break;
        default:
          t = 0;
      }
      return t;
    }
    function Bs(t) {
      return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
    }
    function E0() {
      var t = Z.p;
      return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : c1(t.type));
    }
    function Dr(t, e) {
      var l = Z.p;
      try {
        return Z.p = t, e();
      } finally {
        Z.p = l;
      }
    }
    var rl = Math.random().toString(36).slice(2), zt = "__reactFiber$" + rl, It = "__reactProps$" + rl, hn = "__reactContainer$" + rl, wr = "__reactEvents$" + rl, jb = "__reactListeners$" + rl, Xb = "__reactHandles$" + rl, Rr = "__reactResources$" + rl, gi = "__reactMarker$" + rl, Mu = "__reactLoad$" + rl;
    function $u(t) {
      delete t[zt], delete t[It], delete t[jb], delete t[Xb];
    }
    function ta(t) {
      var e;
      if (e = t[zt]) return e;
      for (var l = t.parentNode; l; ) {
        if (e = l[hn] || l[zt]) {
          if (l = e.alternate, e.child !== null || l !== null && l.child !== null)
            for (t = $d(t); t !== null; ) {
              if (l = t[zt]) return l;
              t = $d(t);
            }
          return e;
        }
        t = l, l = t.parentNode;
      }
      return null;
    }
    function bn(t) {
      if (t = t[zt] || t[hn]) {
        var e = t.tag;
        if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3)
          return t;
      }
      return null;
    }
    function Hn(t) {
      var e = t.tag;
      if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
      throw Error(S(33));
    }
    function Qa(t) {
      var e = t[Rr];
      return e || (e = t[Rr] = { hoistableStyles:  new Map(), hoistableScripts:  new Map() }), e;
    }
    function Mt(t) {
      t[gi] = !0;
    }
    function A0(t) {
      t[Mu] = void 0;
    }
    var C0 =  new Set(), O0 = {};
    function va(t, e) {
      en(t, e), en(t + "Capture", e);
    }
    function en(t, e) {
      for (O0[t] = e, t = 0; t < e.length; t++)
        C0.add(e[t]);
    }
    var Vb = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), Ur = {}, Br = {};
    function Qb(t) {
      return zo.call(Br, t) ? !0 : zo.call(Ur, t) ? !1 : Vb.test(t) ? Br[t] = !0 : (Ur[t] = !0, !1);
    }
    var j = !1;
    function Hr() {
      var t = j;
      return j = !1, t;
    }
    function eu(t, e, l) {
      if (Qb(e))
        if (l === null) t.removeAttribute(e);
        else {
          switch (typeof l) {
            case "undefined":
            case "function":
            case "symbol":
              t.removeAttribute(e);
              return;
            case "boolean":
              var a = e.toLowerCase().slice(0, 5);
              if (a !== "data-" && a !== "aria-") {
                t.removeAttribute(e);
                return;
              }
          }
          t.setAttribute(e, l);
        }
    }
    function Li(t, e, l) {
      if (l === null) t.removeAttribute(e);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            t.removeAttribute(e);
            return;
        }
        t.setAttribute(e, l);
      }
    }
    function Pe(t, e, l, a) {
      if (a === null) t.removeAttribute(l);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            t.removeAttribute(l);
            return;
        }
        t.setAttributeNS(e, l, a);
      }
    }
    function ne(t) {
      switch (typeof t) {
        case "bigint":
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return t;
        case "object":
          return t;
        default:
          return "";
      }
    }
    function z0(t) {
      var e = t.type;
      return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
    }
    function Zb(t, e, l) {
      var a = Object.getOwnPropertyDescriptor(
        t.constructor.prototype,
        e
      );
      if (!t.hasOwnProperty(e) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
        var n = a.get, i = a.set;
        return Object.defineProperty(t, e, {
          configurable: !0,
          get: function() {
            return n.call(this);
          },
          set: function(u) {
            l = "" + u, i.call(this, u);
          }
        }), Object.defineProperty(t, e, {
          enumerable: a.enumerable
        }), {
          getValue: function() {
            return l;
          },
          setValue: function(u) {
            l = "" + u;
          },
          stopTracking: function() {
            t._valueTracker = null, delete t[e];
          }
        };
      }
    }
    function Do(t) {
      if (!t._valueTracker) {
        var e = z0(t) ? "checked" : "value";
        t._valueTracker = Zb(
          t,
          e,
          "" + t[e]
        );
      }
    }
    function D0(t) {
      if (!t) return !1;
      var e = t._valueTracker;
      if (!e) return !0;
      var l = e.getValue(), a = "";
      return t && (a = z0(t) ? t.checked ? "true" : "false" : t.value), t = a, t !== l ? (e.setValue(t), !0) : !1;
    }
    var Kb = /[\n"\\]/g;
    function Se(t) {
      return t.replace(
        Kb,
        function(e) {
          return "\\" + e.charCodeAt(0).toString(16) + " ";
        }
      );
    }
    function wo(t, e, l, a, n, i, u, c) {
      t.name = "", u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" ? t.type = u : t.removeAttribute("type"), e != null ? u === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + ne(e)) : t.value !== "" + ne(e) && (t.value = "" + ne(e)) : u !== "submit" && u !== "reset" || t.removeAttribute("value"), e != null ? u === "number" && t.value == e ? kc(t, ne(t.value)) : kc(t, ne(e)) : l != null ? kc(t, ne(l)) : a != null && t.removeAttribute("value"), n == null && i != null && (t.defaultChecked = !!i), n != null && (t.checked = n && typeof n != "function" && typeof n != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? t.name = "" + ne(c) : t.removeAttribute("name");
    }
    function w0(t, e, l, a, n, i, u, c) {
      if (i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.type = i), e != null || l != null) {
        if (!(i !== "submit" && i !== "reset" || e != null)) {
          Do(t);
          return;
        }
        l = l != null ? "" + ne(l) : "", e = e != null ? "" + ne(e) : l, c || e === t.value || (t.value = e), t.defaultValue = e;
      }
      a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, t.checked = c ? t.checked : !!a, t.defaultChecked = !!a, u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.name = u), Do(t);
    }
    function kc(t, e) {
      t.defaultValue !== "" + e && (t.defaultValue = "" + e);
    }
    function Za(t, e, l, a) {
      if (t = t.options, e) {
        e = {};
        for (var n = 0; n < l.length; n++)
          e["$" + l[n]] = !0;
        for (l = 0; l < t.length; l++)
          n = e.hasOwnProperty("$" + t[l].value), t[l].selected !== n && (t[l].selected = n), n && a && (t[l].defaultSelected = !0);
      } else {
        for (l = "" + ne(l), e = null, n = 0; n < t.length; n++) {
          if (t[n].value === l) {
            t[n].selected = !0, a && (t[n].defaultSelected = !0);
            return;
          }
          e !== null || t[n].disabled || (e = t[n]);
        }
        e !== null && (e.selected = !0);
      }
    }
    function R0(t, e, l) {
      if (e != null && (e = "" + ne(e), e !== t.value && (t.value = e), l == null)) {
        t.defaultValue !== e && (t.defaultValue = e);
        return;
      }
      t.defaultValue = l != null ? "" + ne(l) : "";
    }
    function U0(t, e, l, a) {
      if (e == null) {
        if (a != null) {
          if (l != null) throw Error(S(92));
          if (Bn(a)) {
            if (1 < a.length) throw Error(S(93));
            a = a[0];
          }
          l = a;
        }
        l == null && (l = ""), e = l;
      }
      l = ne(e), t.defaultValue = l, a = t.textContent, a === l && a !== "" && a !== null && (t.value = a), Do(t);
    }
    function ln(t, e) {
      if (e) {
        var l = t.firstChild;
        if (l && l === t.lastChild && l.nodeType === 3) {
          l.nodeValue = e;
          return;
        }
      }
      t.textContent = e;
    }
    var kb = new Set(
      "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
        " "
      )
    );
    function Gr(t, e, l) {
      var a = e.indexOf("--") === 0;
      l == null || typeof l == "boolean" || l === "" ? a ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : a ? t.setProperty(e, l) : typeof l != "number" || l === 0 || kb.has(e) ? e === "float" ? t.cssFloat = l : t[e] = ("" + l).trim() : t[e] = l + "px";
    }
    function B0(t, e, l) {
      if (e != null && typeof e != "object")
        throw Error(S(62));
      if (t = t.style, l != null) {
        for (var a in l)
          !l.hasOwnProperty(a) || e != null && e.hasOwnProperty(a) || (a.indexOf("--") === 0 ? t.setProperty(a, "") : a === "float" ? t.cssFloat = "" : t[a] = "", j = !0);
        for (var n in e)
          a = e[n], e.hasOwnProperty(n) && l[n] !== a && (Gr(t, n, a), j = !0);
      } else
        for (var i in e)
          e.hasOwnProperty(i) && Gr(t, i, e[i]);
    }
    function Hs(t) {
      if (t.indexOf("-") === -1) return !1;
      switch (t) {
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
    var Jb =  new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["maskType", "mask-type"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"]
    ]), Fb = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function lu(t) {
      return Fb.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
    }
    function Ve() {
    }
    var Ro = null;
    function Gs(t) {
      return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
    }
    var Ba = null, Ka = null;
    function Lr(t) {
      var e = bn(t);
      if (e && (t = e.stateNode)) {
        var l = t[It] || null;
        t: switch (t = e.stateNode, e.type) {
          case "input":
            if (wo(
              t,
              l.value,
              l.defaultValue,
              l.defaultValue,
              l.checked,
              l.defaultChecked,
              l.type,
              l.name
            ), e = l.name, l.type === "radio" && e != null) {
              for (l = t; l.parentNode; ) l = l.parentNode;
              for (l = l.querySelectorAll(
                'input[name="' + Se(
                  "" + e
                ) + '"][type="radio"]'
              ), e = 0; e < l.length; e++) {
                var a = l[e];
                if (a !== t && a.form === t.form) {
                  var n = a[It] || null;
                  if (!n) throw Error(S(90));
                  wo(
                    a,
                    n.value,
                    n.defaultValue,
                    n.defaultValue,
                    n.checked,
                    n.defaultChecked,
                    n.type,
                    n.name
                  );
                }
              }
              for (e = 0; e < l.length; e++)
                a = l[e], a.form === t.form && D0(a);
            }
            break t;
          case "textarea":
            R0(t, l.value, l.defaultValue);
            break t;
          case "select":
            e = l.value, e != null && Za(t, !!l.multiple, e, !1);
        }
      }
    }
    var Jc = !1;
    function H0(t, e, l) {
      if (Jc) return t(e, l);
      Jc = !0;
      try {
        var a = t(e);
        return a;
      } finally {
        if (Jc = !1, (Ba !== null || Ka !== null) && (fc(), Ba && (e = Ba, t = Ka, Ka = Ba = null, Lr(e), t)))
          for (e = 0; e < t.length; e++) Lr(t[e]);
      }
    }
    function Pn(t, e) {
      var l = t.stateNode;
      if (l === null) return null;
      var a = l[It] || null;
      if (a === null) return null;
      l = a[e];
      t: switch (e) {
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
          (a = !a.disabled) || (t = t.type, a = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !a;
          break t;
        default:
          t = !1;
      }
      if (t) return null;
      if (l && typeof l != "function")
        throw Error(
          S(231, e, typeof l)
        );
      return l;
    }
    var il = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Uo = !1;
    if (il)
      try {
        Ea = {}, Object.defineProperty(Ea, "passive", {
          get: function() {
            Uo = !0;
          }
        }), window.addEventListener("test", Ea, Ea), window.removeEventListener("test", Ea, Ea);
      } catch {
        Uo = !1;
      }
    var Ea, Ml = null, Ls = null, au = null;
    function G0() {
      if (au) return au;
      var t, e = Ls, l = e.length, a, n = "value" in Ml ? Ml.value : Ml.textContent, i = n.length;
      for (t = 0; t < l && e[t] === n[t]; t++) ;
      var u = l - t;
      for (a = 1; a <= u && e[l - a] === n[i - a]; a++) ;
      return au = n.slice(t, 1 < a ? 1 - a : void 0);
    }
    function nu(t) {
      var e = t.keyCode;
      return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
    }
    function Yi() {
      return !0;
    }
    function Yr() {
      return !1;
    }
    function Zt(t) {
      function e(l, a, n, i, u) {
        this._reactName = l, this._targetInst = n, this.type = a, this.nativeEvent = i, this.target = u, this.currentTarget = null;
        for (var c in t)
          t.hasOwnProperty(c) && (l = t[c], this[c] = l ? l(i) : i[c]);
        return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? Yi : Yr, this.isPropagationStopped = Yr, this;
      }
      return tt(e.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var l = this.nativeEvent;
          l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = Yi);
        },
        stopPropagation: function() {
          var l = this.nativeEvent;
          l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = Yi);
        },
        persist: function() {
        },
        isPersistent: Yi
      }), e;
    }
    var Ql = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, Wu = Zt(Ql), pi = tt({}, Ql, { view: 0, detail: 0 }), $b = Zt(pi), Fc, $c, On, Iu = tt({}, pi, {
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
      getModifierState: Ys,
      button: 0,
      buttons: 0,
      relatedTarget: function(t) {
        return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
      },
      movementX: function(t) {
        return "movementX" in t ? t.movementX : (t !== On && (On && t.type === "mousemove" ? (Fc = t.screenX - On.screenX, $c = t.screenY - On.screenY) : $c = Fc = 0, On = t), Fc);
      },
      movementY: function(t) {
        return "movementY" in t ? t.movementY : $c;
      }
    }), qr = Zt(Iu), Wb = tt({}, Iu, { dataTransfer: 0 }), Ib = Zt(Wb), Pb = tt({}, pi, { relatedTarget: 0 }), Wc = Zt(Pb), tv = tt({}, Ql, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), ev = Zt(tv), lv = tt({}, Ql, {
      clipboardData: function(t) {
        return "clipboardData" in t ? t.clipboardData : window.clipboardData;
      }
    }), av = Zt(lv), nv = tt({}, Ql, { data: 0 }), jr = Zt(nv), iv = {
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
      MozPrintableKey: "Unidentified"
    }, uv = {
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
      224: "Meta"
    }, cv = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function ov(t) {
      var e = this.nativeEvent;
      return e.getModifierState ? e.getModifierState(t) : (t = cv[t]) ? !!e[t] : !1;
    }
    function Ys() {
      return ov;
    }
    var sv = tt({}, pi, {
      key: function(t) {
        if (t.key) {
          var e = iv[t.key] || t.key;
          if (e !== "Unidentified") return e;
        }
        return t.type === "keypress" ? (t = nu(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? uv[t.keyCode] || "Unidentified" : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Ys,
      charCode: function(t) {
        return t.type === "keypress" ? nu(t) : 0;
      },
      keyCode: function(t) {
        return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
      },
      which: function(t) {
        return t.type === "keypress" ? nu(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
      }
    }), fv = Zt(sv), rv = tt({}, Iu, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    }), Xr = Zt(rv), dv = tt({}, Ql, { submitter: 0 }), mv = Zt(dv), hv = tt({}, pi, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Ys
    }), bv = Zt(hv), vv = tt({}, Ql, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), yv = Zt(vv), gv = tt({}, Iu, {
      deltaX: function(t) {
        return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
      },
      deltaY: function(t) {
        return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    }), pv = Zt(gv), xv = tt({}, Ql, {
      newState: 0,
      oldState: 0,
      source: 0
    }), Sv = Zt(xv), Tv = [9, 13, 27, 32], qs = il && "CompositionEvent" in window, Yn = null;
    il && "documentMode" in document && (Yn = document.documentMode);
    var Nv = il && "TextEvent" in window && !Yn, L0 = il && (!qs || Yn && 8 < Yn && 11 >= Yn), Vr = " ", Qr = !1;
    function Y0(t, e) {
      switch (t) {
        case "keyup":
          return Tv.indexOf(e.keyCode) !== -1;
        case "keydown":
          return e.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function q0(t) {
      return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
    }
    var Ha = !1;
    function Mv(t, e) {
      switch (t) {
        case "compositionend":
          return q0(e);
        case "keypress":
          return e.which !== 32 ? null : (Qr = !0, Vr);
        case "textInput":
          return t = e.data, t === Vr && Qr ? null : t;
        default:
          return null;
      }
    }
    function _v(t, e) {
      if (Ha)
        return t === "compositionend" || !qs && Y0(t, e) ? (t = G0(), au = Ls = Ml = null, Ha = !1, t) : null;
      switch (t) {
        case "paste":
          return null;
        case "keypress":
          if (!(e.ctrlKey || e.altKey || e.metaKey) || e.ctrlKey && e.altKey) {
            if (e.char && 1 < e.char.length)
              return e.char;
            if (e.which) return String.fromCharCode(e.which);
          }
          return null;
        case "compositionend":
          return L0 && e.locale !== "ko" ? null : e.data;
        default:
          return null;
      }
    }
    var Ev = {
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
      week: !0
    };
    function Zr(t) {
      var e = t && t.nodeName && t.nodeName.toLowerCase();
      return e === "input" ? !!Ev[t.type] : e === "textarea";
    }
    function j0(t, e, l, a) {
      Ba ? Ka ? Ka.push(a) : Ka = [a] : Ba = a, e = Ku(e, "onChange"), 0 < e.length && (l = new Wu(
        "onChange",
        "change",
        null,
        l,
        a
      ), t.push({ event: l, listeners: e }));
    }
    var qn = null, ti = null;
    function Av(t) {
      Hh(t, 0);
    }
    function Pu(t) {
      var e = Hn(t);
      if (D0(e)) return t;
    }
    function Kr(t, e) {
      if (t === "change") return e;
    }
    var X0 = !1;
    il && (il ? (ji = "oninput" in document, ji || (Ic = document.createElement("div"), Ic.setAttribute("oninput", "return;"), ji = typeof Ic.oninput == "function"), qi = ji) : qi = !1, X0 = qi && (!document.documentMode || 9 < document.documentMode));
    var qi, ji, Ic;
    function kr() {
      qn && (qn.detachEvent("onpropertychange", V0), ti = qn = null);
    }
    function V0(t) {
      if (t.propertyName === "value" && Pu(ti)) {
        var e = [];
        j0(
          e,
          ti,
          t,
          Gs(t)
        ), H0(Av, e);
      }
    }
    function Cv(t, e, l) {
      t === "focusin" ? (kr(), qn = e, ti = l, qn.attachEvent("onpropertychange", V0)) : t === "focusout" && kr();
    }
    function Ov(t) {
      if (t === "selectionchange" || t === "keyup" || t === "keydown")
        return Pu(ti);
    }
    function zv(t, e) {
      if (t === "click") return Pu(e);
    }
    function Dv(t, e) {
      if (t === "input" || t === "change")
        return Pu(e);
    }
    function wv(t, e) {
      return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
    }
    var de = typeof Object.is == "function" ? Object.is : wv;
    function ei(t, e) {
      if (de(t, e)) return !0;
      if (typeof t != "object" || t === null || typeof e != "object" || e === null)
        return !1;
      var l = Object.keys(t), a = Object.keys(e);
      if (l.length !== a.length) return !1;
      for (a = 0; a < l.length; a++) {
        var n = l[a];
        if (!zo.call(e, n) || !de(t[n], e[n]))
          return !1;
      }
      return !0;
    }
    function Bo(t) {
      if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
      try {
        return t.activeElement || t.body;
      } catch {
        return t.body;
      }
    }
    function Jr(t) {
      for (; t && t.firstChild; ) t = t.firstChild;
      return t;
    }
    function Fr(t, e) {
      var l = Jr(t);
      t = 0;
      for (var a; l; ) {
        if (l.nodeType === 3) {
          if (a = t + l.textContent.length, t <= e && a >= e)
            return { node: l, offset: e - t };
          t = a;
        }
        t: {
          for (; l; ) {
            if (l.nextSibling) {
              l = l.nextSibling;
              break t;
            }
            l = l.parentNode;
          }
          l = void 0;
        }
        l = Jr(l);
      }
    }
    function Q0(t, e) {
      return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? Q0(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
    }
    function Z0(t) {
      t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
      for (var e = Bo(t.document); e instanceof t.HTMLIFrameElement; ) {
        try {
          var l = typeof e.contentWindow.location.href == "string";
        } catch {
          l = !1;
        }
        if (l) t = e.contentWindow;
        else break;
        e = Bo(t.document);
      }
      return e;
    }
    function js(t) {
      var e = t && t.nodeName && t.nodeName.toLowerCase();
      return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
    }
    var Rv = il && "documentMode" in document && 11 >= document.documentMode, Ga = null, Ho = null, jn = null, Go = !1;
    function $r(t, e, l) {
      var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
      Go || Ga == null || Ga !== Bo(a) || (a = Ga, "selectionStart" in a && js(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
        anchorNode: a.anchorNode,
        anchorOffset: a.anchorOffset,
        focusNode: a.focusNode,
        focusOffset: a.focusOffset
      }), jn && ei(jn, a) || (jn = a, a = Ku(Ho, "onSelect"), 0 < a.length && (e = new Wu(
        "onSelect",
        "select",
        null,
        e,
        l
      ), t.push({ event: e, listeners: a }), e.target = Ga)));
    }
    function Fl(t, e) {
      var l = {};
      return l[t.toLowerCase()] = e.toLowerCase(), l["Webkit" + t] = "webkit" + e, l["Moz" + t] = "moz" + e, l;
    }
    var La = {
      animationend: Fl("Animation", "AnimationEnd"),
      animationiteration: Fl("Animation", "AnimationIteration"),
      animationstart: Fl("Animation", "AnimationStart"),
      transitionrun: Fl("Transition", "TransitionRun"),
      transitionstart: Fl("Transition", "TransitionStart"),
      transitioncancel: Fl("Transition", "TransitionCancel"),
      transitionend: Fl("Transition", "TransitionEnd")
    }, Pc = {}, K0 = {};
    il && (K0 = document.createElement("div").style, "AnimationEvent" in window || (delete La.animationend.animation, delete La.animationiteration.animation, delete La.animationstart.animation), "TransitionEvent" in window || delete La.transitionend.transition);
    function ya(t) {
      if (Pc[t]) return Pc[t];
      if (!La[t]) return t;
      var e = La[t], l;
      for (l in e)
        if (e.hasOwnProperty(l) && l in K0)
          return Pc[t] = e[l];
      return t;
    }
    var k0 = ya("animationend"), J0 = ya("animationiteration"), F0 = ya("animationstart"), Uv = ya("transitionrun"), Bv = ya("transitionstart"), Hv = ya("transitioncancel"), $0 = ya("transitionend"), W0 =  new Map(), Lo = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
    Lo.push("scrollEnd");
    function we(t, e) {
      W0.set(t, e), va(e, [t]);
    }
    var Gv = 0;
    function ul(t, e) {
      if (t.name != null && t.name !== "auto") return t.name;
      if (e.autoName !== null) return e.autoName;
      t = De.identifierPrefix;
      var l = Gv++;
      return t = "_" + t + "t_" + l.toString(32) + "_", e.autoName = t;
    }
    function Wr(t) {
      if (t == null || typeof t == "string")
        return t;
      var e = null, l = Pa;
      if (l !== null)
        for (var a = 0; a < l.length; a++) {
          var n = t[l[a]];
          if (n != null) {
            if (n === "none") return "none";
            e = e == null ? n : e + (" " + n);
          }
        }
      return e ?? t.default;
    }
    function dl(t, e) {
      return t = Wr(t), e = Wr(e), e == null ? t === "auto" ? null : t : e === "auto" ? null : e;
    }
    var _u = typeof reportError == "function" ? reportError : function(t) {
      if (typeof window == "object" && typeof window.ErrorEvent == "function") {
        var e = new window.ErrorEvent("error", {
          bubbles: !0,
          cancelable: !0,
          message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
          error: t
        });
        if (!window.dispatchEvent(e)) return;
      } else if (typeof process == "object" && typeof process.emit == "function") {
        process.emit("uncaughtException", t);
        return;
      }
      console.error(t);
    }, ge = [], Ya = 0, Xs = 0;
    function tc() {
      for (var t = Ya, e = Xs = Ya = 0; e < t; ) {
        var l = ge[e];
        ge[e++] = null;
        var a = ge[e];
        ge[e++] = null;
        var n = ge[e];
        ge[e++] = null;
        var i = ge[e];
        if (ge[e++] = null, a !== null && n !== null) {
          var u = a.pending;
          u === null ? n.next = n : (n.next = u.next, u.next = n), a.pending = n;
        }
        i !== 0 && I0(l, n, i);
      }
    }
    function ec(t, e, l, a) {
      ge[Ya++] = t, ge[Ya++] = e, ge[Ya++] = l, ge[Ya++] = a, Xs |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
    }
    function Vs(t, e, l, a) {
      return ec(t, e, l, a), Eu(t);
    }
    function ga(t, e) {
      return ec(t, null, null, e), Eu(t);
    }
    function I0(t, e, l) {
      t.lanes |= l;
      var a = t.alternate;
      a !== null && (a.lanes |= l);
      for (var n = !1, i = t.return; i !== null; )
        i.childLanes |= l, a = i.alternate, a !== null && (a.childLanes |= l), i.tag === 22 && (t = i.stateNode, t === null || t._visibility & 1 || (n = !0)), t = i, i = i.return;
      return t.tag === 3 ? (i = t.stateNode, n && e !== null && (n = 31 - fe(l), t = i.hiddenUpdates, a = t[n], a === null ? t[n] = [e] : a.push(e), e.lane = l | 536870912), i) : null;
    }
    function Eu(t) {
      if (50 < Wn)
        throw Wn = 0, hu = null, Error(S(185));
      for (var e = t.return; e !== null; )
        t = e, e = t.return;
      return t.tag === 3 ? t.stateNode : null;
    }
    var qa = {};
    function Lv(t, e, l, a) {
      this.tag = t, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
    }
    function Ft(t, e, l, a) {
      return new Lv(t, e, l, a);
    }
    function Qs(t) {
      return t = t.prototype, !(!t || !t.isReactComponent);
    }
    function al(t, e) {
      var l = t.alternate;
      return l === null ? (l = Ft(
        t.tag,
        e,
        t.key,
        t.mode
      ), l.elementType = t.elementType, l.type = t.type, l.stateNode = t.stateNode, l.alternate = t, t.alternate = l) : (l.pendingProps = e, l.type = t.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = t.flags & 1206910976, l.childLanes = t.childLanes, l.lanes = t.lanes, l.child = t.child, l.memoizedProps = t.memoizedProps, l.memoizedState = t.memoizedState, l.updateQueue = t.updateQueue, e = t.dependencies, l.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, l.sibling = t.sibling, l.index = t.index, l.ref = t.ref, l.refCleanup = t.refCleanup, l;
    }
    function P0(t, e) {
      t.flags &= 1206910978;
      var l = t.alternate;
      return l === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = l.childLanes, t.lanes = l.lanes, t.child = l.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = l.memoizedProps, t.memoizedState = l.memoizedState, t.updateQueue = l.updateQueue, t.type = l.type, e = l.dependencies, t.dependencies = e === null ? null : {
        lanes: e.lanes,
        firstContext: e.firstContext
      }), t;
    }
    function iu(t, e, l, a, n, i) {
      var u = 0;
      if (a = t, typeof a == "function") Qs(a) && (u = 1);
      else if (typeof a == "string")
        u = fg(
          t,
          l,
          Ke.current
        ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
      else
        t: switch (a) {
          case _o:
            return t = Ft(31, l, e, n), t.elementType = _o, t.lanes = i, t;
          case Ra:
            return aa(l.children, n, i, e);
          case v0:
            u = 8, n |= 24;
            break;
          case To:
            return t = Ft(12, l, e, n | 2), t.elementType = To, t.lanes = i, t;
          case No:
            return t = Ft(13, l, e, n), t.elementType = No, t.lanes = i, t;
          case Mo:
            return t = Ft(19, l, e, n), t.elementType = Mo, t.lanes = i, t;
          case _b:
          case Eo:
            return t = n | 32, t = Ft(30, l, e, t), t.elementType = Eo, t.lanes = i, t.stateNode = {
              autoName: null,
              paired: null,
              clones: null,
              ref: null
            }, t;
          default:
            if (typeof a == "object" && a !== null)
              switch (a.$$typeof) {
                case Xe:
                  u = 10;
                  break t;
                case y0:
                  u = 9;
                  break t;
                case Ds:
                  u = 11;
                  break t;
                case ws:
                  u = 14;
                  break t;
                case xl:
                  u = 16, a = null;
                  break t;
              }
            u = 29, l = Error(
              S(130, t === null ? "null" : typeof t, "")
            ), a = null;
        }
      return e = Ft(u, l, e, n), e.elementType = t, e.type = a, e.lanes = i, e;
    }
    function aa(t, e, l, a) {
      return t = Ft(7, t, a, e), t.lanes = l, t;
    }
    function to(t, e, l) {
      return t = Ft(6, t, null, e), t.lanes = l, t;
    }
    function tm(t) {
      var e = Ft(18, null, null, 0);
      return e.stateNode = t, e;
    }
    function eo(t, e, l) {
      return e = Ft(
        4,
        t.children !== null ? t.children : [],
        t.key,
        e
      ), e.lanes = l, e.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation
      }, e;
    }
    var Ir =  new WeakMap();
    function Te(t, e) {
      if (typeof t == "object" && t !== null) {
        var l = Ir.get(t);
        return l !== void 0 ? l : (e = {
          value: t,
          source: e,
          stack: zr(e)
        }, Ir.set(t, e), e);
      }
      return {
        value: t,
        source: e,
        stack: zr(e)
      };
    }
    var ja = [], Xa = 0, Au = null, li = 0, pe = [], xe = 0, Yl = null, Qe = 1, Ze = "";
    function el(t, e) {
      ja[Xa++] = li, ja[Xa++] = Au, Au = t, li = e;
    }
    function em(t, e, l) {
      pe[xe++] = Qe, pe[xe++] = Ze, pe[xe++] = Yl, Yl = t;
      var a = Qe;
      t = Ze;
      var n = 32 - fe(a) - 1;
      a &= ~(1 << n), l += 1;
      var i = 32 - fe(e) + n;
      if (30 < i) {
        var u = n - n % 5;
        i = (a & (1 << u) - 1).toString(32), a >>= u, n -= u, Qe = 1 << 32 - fe(e) + n | l << n | a, Ze = i + t;
      } else
        Qe = 1 << i | l << n | a, Ze = t;
    }
    function lc(t) {
      t.return !== null && (el(t, 1), em(t, 1, 0));
    }
    function Zs(t) {
      for (; t === Au; )
        Au = ja[--Xa], ja[Xa] = null, li = ja[--Xa], ja[Xa] = null;
      for (; t === Yl; )
        Yl = pe[--xe], pe[xe] = null, Ze = pe[--xe], pe[xe] = null, Qe = pe[--xe], pe[xe] = null;
    }
    function lm(t, e) {
      pe[xe++] = Qe, pe[xe++] = Ze, pe[xe++] = Yl, Qe = e.id, Ze = e.overflow, Yl = t;
    }
    var _t = null, at = null, G = !1, zl = null, Ne = !1, Yo = Error(S(519));
    function ql(t) {
      var e = Error(
        S(
          418,
          1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
          ""
        )
      );
      throw ai(Te(e, t)), Yo;
    }
    function Pr(t) {
      var e = t.stateNode, l = t.type, a = t.memoizedProps;
      switch (e[zt] = t, e[It] = a, l) {
        case "dialog":
          L("cancel", e), L("close", e);
          break;
        case "iframe":
        case "object":
        case "embed":
          L("load", e);
          break;
        case "video":
        case "audio":
          for (l = 0; l < ci.length; l++)
            L(ci[l], e);
          break;
        case "source":
          L("error", e);
          break;
        case "img":
        case "image":
        case "link":
          L("error", e), L("load", e);
          break;
        case "details":
          L("toggle", e);
          break;
        case "input":
          L("invalid", e), w0(
            e,
            a.value,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name,
            !0
          );
          break;
        case "select":
          L("invalid", e);
          break;
        case "textarea":
          L("invalid", e), U0(e, a.value, a.defaultValue, a.children);
      }
      l = a.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || e.textContent === "" + l || a.suppressHydrationWarning === !0 || Lh(e.textContent, l) ? (a.popover != null && (L("beforetoggle", e), L("toggle", e)), a.onScroll != null && L("scroll", e), a.onScrollEnd != null && L("scrollend", e), a.onClick != null && (e.onclick = Ve), e = !0) : e = !1, e || ql(t, !0);
    }
    function Cu(t) {
      for (_t = t.return; _t; )
        switch (_t.tag) {
          case 5:
          case 31:
          case 13:
            Ne = !1;
            return;
          case 27:
          case 3:
            Ne = !0;
            return;
          default:
            _t = _t.return;
        }
    }
    function Aa(t) {
      if (t !== _t) return !1;
      if (!G) return Cu(t), G = !0, !1;
      var e = t.tag, l;
      if ((l = e !== 3 && e !== 27) && ((l = e === 5) && (l = t.type, l = !(l !== "form" && l !== "button") || Ns(t.type, t.memoizedProps)), l = !l), l && at && ql(t), Cu(t), e === 13) {
        if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(S(317));
        at = Fd(t);
      } else if (e === 31) {
        if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(S(317));
        at = Fd(t);
      } else
        e === 27 ? (e = at, Zl(t.type) ? (t = As, As = null, at = t) : at = e) : at = _t ? Me(t.stateNode.nextSibling) : null;
      return !0;
    }
    function ca() {
      at = _t = null, G = !1;
    }
    function lo() {
      var t = zl;
      return t !== null && (kt === null ? kt = t : kt.push.apply(
        kt,
        t
      ), zl = null), t;
    }
    function ai(t) {
      zl === null ? zl = [t] : zl.push(t);
    }
    var qo = Fe(null), pa = null, ll = null;
    function _l(t, e, l) {
      nt(qo, e._currentValue), e._currentValue = l;
    }
    function nl(t) {
      t._currentValue = qo.current, wt(qo);
    }
    function uu(t, e, l) {
      for (; t !== null; ) {
        var a = t.alternate;
        if ((t.childLanes & e) !== e ? (t.childLanes |= e, a !== null && (a.childLanes |= e)) : a !== null && (a.childLanes & e) !== e && (a.childLanes |= e), t === l) break;
        t = t.return;
      }
    }
    function jo(t, e, l, a) {
      var n = t.child;
      for (n !== null && (n.return = t); n !== null; ) {
        var i = n.dependencies;
        if (i !== null) {
          var u = n.child;
          i = i.firstContext;
          t: for (; i !== null; ) {
            var c = i;
            i = n;
            for (var s = 0; s < e.length; s++)
              if (c.context === e[s]) {
                i.lanes |= l, c = i.alternate, c !== null && (c.lanes |= l), uu(
                  i.return,
                  l,
                  t
                ), a || (u = null);
                break t;
              }
            i = c.next;
          }
        } else if (n.tag === 18) {
          if (u = n.return, u === null) throw Error(S(341));
          u.lanes |= l, i = u.alternate, i !== null && (i.lanes |= l), uu(u, l, t), u = null;
        } else
          n.tag === 13 && n.memoizedState !== null && n.memoizedState.dehydrated === null ? (n.lanes |= l, u = n.alternate, u !== null && (u.lanes |= l), uu(
            n.return,
            l,
            t
          ), u = n.child, u = u !== null ? u.sibling : null) : u = n.child;
        if (u !== null) u.return = n;
        else
          for (u = n; u !== null; ) {
            if (u === t) {
              u = null;
              break;
            }
            if (n = u.sibling, n !== null) {
              n.return = u.return, u = n;
              break;
            }
            u = u.return;
          }
        n = u;
      }
    }
    function oa(t, e, l, a) {
      t = null;
      for (var n = e, i = !1; n !== null; ) {
        if (!i) {
          if ((n.flags & 524288) !== 0) i = !0;
          else if ((n.flags & 262144) !== 0) break;
        }
        if (n.tag === 10) {
          var u = n.alternate;
          if (u === null) throw Error(S(387));
          if (u = u.memoizedProps, u !== null) {
            var c = n.type;
            de(n.pendingProps.value, u.value) || (t !== null ? t.push(c) : t = [c]);
          }
        } else if (n === xu.current) {
          if (u = n.alternate, u === null) throw Error(S(387));
          u.memoizedState.memoizedState !== n.memoizedState.memoizedState && (t !== null ? t.push(rn) : t = [rn]);
        }
        n = n.return;
      }
      return t !== null && jo(
        e,
        t,
        l,
        a
      ), e.flags |= 262144, t !== null;
    }
    function Ou(t) {
      for (t = t.firstContext; t !== null; ) {
        if (!de(
          t.context._currentValue,
          t.memoizedValue
        ))
          return !0;
        t = t.next;
      }
      return !1;
    }
    function sa(t) {
      pa = t, ll = null, t = t.dependencies, t !== null && (t.firstContext = null);
    }
    function Dt(t) {
      return am(pa, t);
    }
    function Xi(t, e) {
      return pa === null && sa(t), am(t, e);
    }
    function am(t, e) {
      var l = e._currentValue;
      if (e = { context: e, memoizedValue: l, next: null }, ll === null) {
        if (t === null) throw Error(S(308));
        ll = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
      } else ll = ll.next = e;
      return l;
    }
    var Yv = typeof AbortController < "u" ? AbortController : function() {
      var t = [], e = this.signal = {
        aborted: !1,
        addEventListener: function(l, a) {
          t.push(a);
        }
      };
      this.abort = function() {
        e.aborted = !0, t.forEach(function(l) {
          return l();
        });
      };
    }, qv = xt.unstable_scheduleCallback, jv = xt.unstable_NormalPriority, bt = {
      $$typeof: Xe,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0
    };
    function Ks() {
      return {
        controller: new Yv(),
        data:  new Map(),
        refCount: 0
      };
    }
    function xi(t) {
      t.refCount--, t.refCount === 0 && qv(jv, function() {
        t.controller.abort();
      });
    }
    function td(t, e) {
      if ((t.pendingLanes & 4194048) !== 0) {
        var l = t.transitionTypes;
        for (l === null && (l = t.transitionTypes = []), t = 0; t < e.length; t++) {
          var a = e[t];
          l.indexOf(a) === -1 && l.push(a);
        }
      }
    }
    var Gn = null;
    function Xv(t) {
      var e = t.transitionTypes;
      return t.transitionTypes = null, e;
    }
    var Xn = null, Xo = 0, fa = 0, ka = null;
    function Vv(t, e) {
      if (Xn === null) {
        var l = Xn = [];
        Xo = 0, fa = Sf(), ka = {
          status: "pending",
          value: void 0,
          then: function(a) {
            l.push(a);
          }
        };
      }
      return Xo++, e.then(ed, ed), e;
    }
    function ed() {
      if (--Xo === 0 && (Gn = null, Xn !== null)) {
        ka !== null && (ka.status = "fulfilled");
        var t = Xn;
        Xn = null, fa = 0, ka = null;
        for (var e = 0; e < t.length; e++) (0, t[e])();
      }
    }
    function Qv(t, e) {
      var l = [], a = {
        status: "pending",
        value: null,
        reason: null,
        then: function(n) {
          l.push(n);
        }
      };
      return t.then(
        function() {
          a.status = "fulfilled", a.value = e;
          for (var n = 0; n < l.length; n++) (0, l[n])(e);
        },
        function(n) {
          for (a.status = "rejected", a.reason = n, n = 0; n < l.length; n++)
            (0, l[n])(void 0);
        }
      ), a;
    }
    var ld = R.S;
    R.S = function(t, e) {
      if (Sh = oe(), typeof e == "object" && e !== null && typeof e.then == "function" && Vv(t, e), Gn !== null)
        for (var l = on; l !== null; )
          td(l, Gn), l = l.next;
      if (l = t.types, l !== null) {
        for (var a = on; a !== null; )
          td(a, l), a = a.next;
        if (fa !== 0) {
          a = Gn, a === null && (a = Gn = []);
          for (var n = 0; n < l.length; n++) {
            var i = l[n];
            a.indexOf(i) === -1 && a.push(i);
          }
        }
      }
      ld !== null && ld(t, e);
    };
    var na = Fe(null);
    function ks() {
      var t = na.current;
      return t !== null ? t : P.pooledCache;
    }
    function cu(t, e) {
      e === null ? nt(na, na.current) : nt(na, e.pool);
    }
    function nm() {
      var t = ks();
      return t === null ? null : { parent: bt._currentValue, pool: t };
    }
    var vn = Error(S(460)), Js = Error(S(474)), ac = Error(S(542)), zu = { then: function() {
    } };
    function ad(t) {
      return t = t.status, t === "fulfilled" || t === "rejected";
    }
    function im(t, e, l) {
      switch (l = t[l], l === void 0 ? t.push(e) : l !== e && (e.then(Ve, Ve), e = l), e.status) {
        case "fulfilled":
          return e.value;
        case "rejected":
          throw t = e.reason, id(t), t === void 0 && !("reason" in e) ? Error(S(600)) : t;
        default:
          if (typeof e.status == "string") e.then(Ve, Ve);
          else {
            if (t = P, t !== null && 100 < t.shellSuspendCounter)
              throw Error(S(482));
            t = e, t.status = "pending", t.then(
              function(a) {
                if (e.status === "pending") {
                  var n = e;
                  n.status = "fulfilled", n.value = a;
                }
              },
              function(a) {
                if (e.status === "pending") {
                  var n = e;
                  n.status = "rejected", n.reason = a;
                }
              }
            );
          }
          switch (e.status) {
            case "fulfilled":
              return e.value;
            case "rejected":
              throw t = e.reason, id(t), t;
          }
          throw ia = e, vn;
      }
    }
    function Il(t) {
      try {
        var e = t._init;
        return e(t._payload);
      } catch (l) {
        throw l !== null && typeof l == "object" && typeof l.then == "function" ? (ia = l, vn) : l;
      }
    }
    var ia = null;
    function nd() {
      if (ia === null) throw Error(S(459));
      var t = ia;
      return ia = null, t;
    }
    function id(t) {
      if (t === vn || t === ac)
        throw Error(S(483));
    }
    var Ja = null, ni = 0;
    function Vi(t) {
      var e = ni;
      return ni += 1, Ja === null && (Ja = []), im(Ja, t, e);
    }
    function yl(t, e) {
      e = e.props.ref, t.ref = e !== void 0 ? e : null;
    }
    function Qi(t, e) {
      throw e.$$typeof === Mb ? Error(S(525)) : (t = Object.prototype.toString.call(e), Error(
        S(
          31,
          t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
        )
      ));
    }
    function um(t) {
      function e(h, f) {
        if (t) {
          var v = h.deletions;
          v === null ? (h.deletions = [f], h.flags |= 16) : v.push(f);
        }
      }
      function l(h, f) {
        if (!t) return null;
        for (; f !== null; )
          e(h, f), f = f.sibling;
        return null;
      }
      function a(h) {
        for (var f =  new Map(); h !== null; )
          h.key === null ? f.set(h.index, h) : f.set(h.key, h), h = h.sibling;
        return f;
      }
      function n(h, f) {
        return h = al(h, f), h.index = 0, h.sibling = null, h;
      }
      function i(h, f, v) {
        return h.index = v, t ? (v = h.alternate, v !== null ? (v = v.index, v < f ? (h.flags |= 2, f) : v) : (h.flags |= 134217730, f)) : (h.flags |= 1048576, f);
      }
      function u(h) {
        return t && h.alternate === null && (h.flags |= 134217730), h;
      }
      function c(h, f, v, x) {
        return f === null || f.tag !== 6 ? (f = to(v, h.mode, x), f.return = h, f) : (f = n(f, v), f.return = h, f);
      }
      function s(h, f, v, x) {
        var M = v.type;
        return M === Ra ? (h = r(
          h,
          f,
          v.props.children,
          x,
          v.key
        ), yl(h, v), h) : f !== null && (f.elementType === M || typeof M == "object" && M !== null && M.$$typeof === xl && Il(M) === f.type) ? (f = n(f, v.props), yl(f, v), f.return = h, f) : (f = iu(
          v.type,
          v.key,
          v.props,
          null,
          h.mode,
          x
        ), yl(f, v), f.return = h, f);
      }
      function o(h, f, v, x) {
        return f === null || f.tag !== 4 || f.stateNode.containerInfo !== v.containerInfo || f.stateNode.implementation !== v.implementation ? (f = eo(v, h.mode, x), f.return = h, f) : (f = n(f, v.children || []), f.return = h, f);
      }
      function r(h, f, v, x, M) {
        return f === null || f.tag !== 7 ? (f = aa(
          v,
          h.mode,
          x,
          M
        ), f.return = h, f) : (f = n(f, v), f.return = h, f);
      }
      function b(h, f, v) {
        if (typeof f == "string" && f !== "" || typeof f == "number" || typeof f == "bigint")
          return f = to(
            "" + f,
            h.mode,
            v
          ), f.return = h, f;
        if (typeof f == "object" && f !== null) {
          switch (f.$$typeof) {
            case Ui:
              return v = iu(
                f.type,
                f.key,
                f.props,
                null,
                h.mode,
                v
              ), yl(v, f), v.return = h, v;
            case Un:
              return f = eo(
                f,
                h.mode,
                v
              ), f.return = h, f;
            case xl:
              return f = Il(f), b(h, f, v);
          }
          if (Bn(f) || Cn(f))
            return f = aa(
              f,
              h.mode,
              v,
              null
            ), f.return = h, f;
          if (typeof f.then == "function")
            return b(h, Vi(f), v);
          if (f.$$typeof === Xe)
            return b(
              h,
              Xi(h, f),
              v
            );
          Qi(h, f);
        }
        return null;
      }
      function d(h, f, v, x) {
        var M = f !== null ? f.key : null;
        if (typeof v == "string" && v !== "" || typeof v == "number" || typeof v == "bigint")
          return M !== null ? null : c(h, f, "" + v, x);
        if (typeof v == "object" && v !== null) {
          switch (v.$$typeof) {
            case Ui:
              return v.key === M ? s(h, f, v, x) : null;
            case Un:
              return v.key === M ? o(h, f, v, x) : null;
            case xl:
              return v = Il(v), d(h, f, v, x);
          }
          if (Bn(v) || Cn(v))
            return M !== null ? null : r(h, f, v, x, null);
          if (typeof v.then == "function")
            return d(
              h,
              f,
              Vi(v),
              x
            );
          if (v.$$typeof === Xe)
            return d(
              h,
              f,
              Xi(h, v),
              x
            );
          Qi(h, v);
        }
        return null;
      }
      function m(h, f, v, x, M) {
        if (typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint")
          return h = h.get(v) || null, c(f, h, "" + x, M);
        if (typeof x == "object" && x !== null) {
          switch (x.$$typeof) {
            case Ui:
              return h = h.get(
                x.key === null ? v : x.key
              ) || null, s(f, h, x, M);
            case Un:
              return h = h.get(
                x.key === null ? v : x.key
              ) || null, o(f, h, x, M);
            case xl:
              return x = Il(x), m(
                h,
                f,
                v,
                x,
                M
              );
          }
          if (Bn(x) || Cn(x))
            return h = h.get(v) || null, r(f, h, x, M, null);
          if (typeof x.then == "function")
            return m(
              h,
              f,
              v,
              Vi(x),
              M
            );
          if (x.$$typeof === Xe)
            return m(
              h,
              f,
              v,
              Xi(f, x),
              M
            );
          Qi(f, x);
        }
        return null;
      }
      function y(h, f, v, x) {
        for (var M = null, A = null, C = f, z = f = 0, K = null; C !== null && z < v.length; z++) {
          C.index > z ? (K = C, C = null) : K = C.sibling;
          var O = d(
            h,
            C,
            v[z],
            x
          );
          if (O === null) {
            C === null && (C = K);
            break;
          }
          t && C && O.alternate === null && e(h, C), f = i(O, f, z), A === null ? M = O : A.sibling = O, A = O, C = K;
        }
        if (z === v.length)
          return l(h, C), G && el(h, z), M;
        if (C === null) {
          for (; z < v.length; z++)
            C = b(h, v[z], x), C !== null && (f = i(
              C,
              f,
              z
            ), A === null ? M = C : A.sibling = C, A = C);
          return G && el(h, z), M;
        }
        for (C = a(C); z < v.length; z++)
          K = m(
            C,
            h,
            z,
            v[z],
            x
          ), K !== null && (t && (O = K.alternate, O !== null && C.delete(O.key === null ? z : O.key)), f = i(
            K,
            f,
            z
          ), A === null ? M = K : A.sibling = K, A = K);
        return t && C.forEach(function(yt) {
          return e(h, yt);
        }), G && el(h, z), M;
      }
      function N(h, f, v, x) {
        if (v == null) throw Error(S(151));
        for (var M = null, A = null, C = f, z = f = 0, K = null, O = v.next(); C !== null && !O.done; z++, O = v.next()) {
          C.index > z ? (K = C, C = null) : K = C.sibling;
          var yt = d(h, C, O.value, x);
          if (yt === null) {
            C === null && (C = K);
            break;
          }
          t && C && yt.alternate === null && e(h, C), f = i(yt, f, z), A === null ? M = yt : A.sibling = yt, A = yt, C = K;
        }
        if (O.done)
          return l(h, C), G && el(h, z), M;
        if (C === null) {
          for (; !O.done; z++, O = v.next())
            O = b(h, O.value, x), O !== null && (f = i(O, f, z), A === null ? M = O : A.sibling = O, A = O);
          return G && el(h, z), M;
        }
        for (C = a(C); !O.done; z++, O = v.next())
          O = m(C, h, z, O.value, x), O !== null && (t && (K = O.alternate, K !== null && C.delete(
            K.key === null ? z : K.key
          )), f = i(O, f, z), A === null ? M = O : A.sibling = O, A = O);
        return t && C.forEach(function(E) {
          return e(h, E);
        }), G && el(h, z), M;
      }
      function _(h, f, v, x) {
        if (typeof v == "object" && v !== null && v.type === Ra && v.key === null && v.props.ref === void 0 && (v = v.props.children), typeof v == "object" && v !== null) {
          switch (v.$$typeof) {
            case Ui:
              t: {
                for (var M = v.key; f !== null; ) {
                  if (f.key === M) {
                    if (M = v.type, M === Ra) {
                      if (f.tag === 7) {
                        l(
                          h,
                          f.sibling
                        ), x = n(
                          f,
                          v.props.children
                        ), yl(x, v), x.return = h, h = x;
                        break t;
                      }
                    } else if (f.elementType === M || typeof M == "object" && M !== null && M.$$typeof === xl && Il(M) === f.type) {
                      l(
                        h,
                        f.sibling
                      ), x = n(f, v.props), yl(x, v), x.return = h, h = x;
                      break t;
                    }
                    l(h, f);
                    break;
                  } else e(h, f);
                  f = f.sibling;
                }
                v.type === Ra ? (x = aa(
                  v.props.children,
                  h.mode,
                  x,
                  v.key
                ), yl(x, v), x.return = h, h = x) : (x = iu(
                  v.type,
                  v.key,
                  v.props,
                  null,
                  h.mode,
                  x
                ), yl(x, v), x.return = h, h = x);
              }
              return u(h);
            case Un:
              t: {
                for (M = v.key; f !== null; ) {
                  if (f.key === M)
                    if (f.tag === 4 && f.stateNode.containerInfo === v.containerInfo && f.stateNode.implementation === v.implementation) {
                      l(
                        h,
                        f.sibling
                      ), x = n(f, v.children || []), x.return = h, h = x;
                      break t;
                    } else {
                      l(h, f);
                      break;
                    }
                  else e(h, f);
                  f = f.sibling;
                }
                x = eo(v, h.mode, x), x.return = h, h = x;
              }
              return u(h);
            case xl:
              return v = Il(v), _(
                h,
                f,
                v,
                x
              );
          }
          if (Bn(v))
            return y(
              h,
              f,
              v,
              x
            );
          if (Cn(v)) {
            if (M = Cn(v), typeof M != "function") throw Error(S(150));
            return v = M.call(v), N(
              h,
              f,
              v,
              x
            );
          }
          if (typeof v.then == "function")
            return _(
              h,
              f,
              Vi(v),
              x
            );
          if (v.$$typeof === Xe)
            return _(
              h,
              f,
              Xi(h, v),
              x
            );
          Qi(h, v);
        }
        return typeof v == "string" && v !== "" || typeof v == "number" || typeof v == "bigint" ? (v = "" + v, f !== null && f.tag === 6 ? (l(h, f.sibling), x = n(f, v), x.return = h, h = x) : (l(h, f), x = to(v, h.mode, x), x.return = h, h = x), u(h)) : l(h, f);
      }
      return function(h, f, v, x) {
        try {
          ni = 0;
          var M = _(
            h,
            f,
            v,
            x
          );
          return Ja = null, M;
        } catch (C) {
          if (C === vn || C === ac) throw C;
          var A = Ft(29, C, null, h.mode);
          return A.lanes = x, A.return = h, A;
        } finally {
        }
      };
    }
    var ra = um(!0), cm = um(!1), Sl = !1;
    function Fs(t) {
      t.updateQueue = {
        baseState: t.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, lanes: 0, hiddenCallbacks: null },
        callbacks: null
      };
    }
    function Vo(t, e) {
      t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
        baseState: t.baseState,
        firstBaseUpdate: t.firstBaseUpdate,
        lastBaseUpdate: t.lastBaseUpdate,
        shared: t.shared,
        callbacks: null
      });
    }
    function Dl(t) {
      return { lane: t, tag: 0, payload: null, callback: null, next: null };
    }
    function wl(t, e, l) {
      var a = t.updateQueue;
      if (a === null) return null;
      if (a = a.shared, (Q & 2) !== 0) {
        var n = a.pending;
        return n === null ? e.next = e : (e.next = n.next, n.next = e), a.pending = e, e = Eu(t), I0(t, null, l), e;
      }
      return ec(t, a, e, l), Eu(t);
    }
    function Vn(t, e, l) {
      if (e = e.updateQueue, e !== null && (e = e.shared, (l & 4194048) !== 0)) {
        var a = e.lanes;
        a &= t.pendingLanes, l |= a, e.lanes = l, M0(t, l);
      }
    }
    function ao(t, e) {
      var l = t.updateQueue, a = t.alternate;
      if (a !== null && (a = a.updateQueue, l === a)) {
        var n = null, i = null;
        if (l = l.firstBaseUpdate, l !== null) {
          do {
            var u = {
              lane: l.lane,
              tag: l.tag,
              payload: l.payload,
              callback: null,
              next: null
            };
            i === null ? n = i = u : i = i.next = u, l = l.next;
          } while (l !== null);
          i === null ? n = i = e : i = i.next = e;
        } else n = i = e;
        l = {
          baseState: a.baseState,
          firstBaseUpdate: n,
          lastBaseUpdate: i,
          shared: a.shared,
          callbacks: a.callbacks
        }, t.updateQueue = l;
        return;
      }
      t = l.lastBaseUpdate, t === null ? l.firstBaseUpdate = e : t.next = e, l.lastBaseUpdate = e;
    }
    var Qo = !1;
    function Qn() {
      if (Qo) {
        var t = ka;
        if (t !== null) throw t;
      }
    }
    function Zn(t, e, l, a) {
      Qo = !1;
      var n = t.updateQueue;
      Sl = !1;
      var i = n.firstBaseUpdate, u = n.lastBaseUpdate, c = n.shared.pending;
      if (c !== null) {
        n.shared.pending = null;
        var s = c, o = s.next;
        s.next = null, u === null ? i = o : u.next = o, u = s;
        var r = t.alternate;
        r !== null && (r = r.updateQueue, c = r.lastBaseUpdate, c !== u && (c === null ? r.firstBaseUpdate = o : c.next = o, r.lastBaseUpdate = s));
      }
      if (i !== null) {
        var b = n.baseState;
        u = 0, r = o = s = null, c = i;
        do {
          var d = c.lane & -536870913, m = d !== c.lane;
          if (m ? (q & d) === d : (a & d) === d) {
            d !== 0 && d === fa && (Qo = !0), r !== null && (r = r.next = {
              lane: 0,
              tag: c.tag,
              payload: c.payload,
              callback: null,
              next: null
            });
            t: {
              var y = t, N = c;
              d = e;
              var _ = l;
              switch (N.tag) {
                case 1:
                  if (y = N.payload, typeof y == "function") {
                    b = y.call(_, b, d);
                    break t;
                  }
                  b = y;
                  break t;
                case 3:
                  y.flags = y.flags & -65537 | 128;
                case 0:
                  if (y = N.payload, d = typeof y == "function" ? y.call(_, b, d) : y, d == null) break t;
                  b = tt({}, b, d);
                  break t;
                case 2:
                  Sl = !0;
              }
            }
            d = c.callback, d !== null && (t.flags |= 64, m && (t.flags |= 8192), m = n.callbacks, m === null ? n.callbacks = [d] : m.push(d));
          } else
            m = {
              lane: d,
              tag: c.tag,
              payload: c.payload,
              callback: c.callback,
              next: null
            }, r === null ? (o = r = m, s = b) : r = r.next = m, u |= d;
          if (c = c.next, c === null) {
            if (c = n.shared.pending, c === null)
              break;
            m = c, c = m.next, m.next = null, n.lastBaseUpdate = m, n.shared.pending = null;
          }
        } while (!0);
        r === null && (s = b), n.baseState = s, n.firstBaseUpdate = o, n.lastBaseUpdate = r, i === null && (n.shared.lanes = 0), Vl |= u, t.lanes = u, t.memoizedState = b;
      }
    }
    function om(t, e) {
      if (typeof t != "function")
        throw Error(S(191, t));
      t.call(e);
    }
    function sm(t, e) {
      var l = t.callbacks;
      if (l !== null)
        for (t.callbacks = null, t = 0; t < l.length; t++)
          om(l[t], e);
    }
    var jl = Fe(null), Du = Fe(0);
    function ud(t, e) {
      t = fl, nt(Du, t), nt(jl, e), fl = t | e.baseLanes;
    }
    function Zo() {
      nt(Du, fl), nt(jl, jl.current);
    }
    function $s() {
      fl = Du.current, wt(jl), wt(Du);
    }
    var Bt = Fe(null), Lt = null;
    function Rl(t) {
      var e = t.alternate;
      nt(Rt, Rt.current & 1), nt(Bt, t), Lt === null && (e === null || jl.current !== null || e.memoizedState !== null) && (Lt = t);
    }
    function Ko(t) {
      nt(Rt, Rt.current), nt(Bt, t), Lt === null && (Lt = t);
    }
    function fm(t) {
      t.tag === 22 ? (nt(Rt, Rt.current), nt(Bt, t), Lt === null && (Lt = t)) : Ul();
    }
    function Ul() {
      nt(Rt, Rt.current), nt(Bt, Bt.current);
    }
    function ie(t) {
      wt(Bt), Lt === t && (Lt = null), wt(Rt);
    }
    var Rt = Fe(0);
    function ii(t, e) {
      nt(Bt, Bt.current), nt(Rt, e);
    }
    function Ws(t) {
      wt(Rt), wt(Bt), Lt === t && (Lt = null);
    }
    function wu(t) {
      for (var e = t; e !== null; ) {
        if (e.tag === 13) {
          var l = e.memoizedState;
          if (l !== null && (l = l.dehydrated, l === null || Es(l) || _f(l)))
            return e;
        } else if (e.tag === 19 && e.memoizedProps.revealOrder !== "independent") {
          if ((e.flags & 128) !== 0) return e;
        } else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return null;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
      return null;
    }
    var cl = 0, B = null, I = null, ht = null, Ru = !1, Fa = !1, da = !1, Uu = 0, ui = 0, $a = null, Zv = 0;
    function ot() {
      throw Error(S(321));
    }
    function Is(t, e) {
      if (e === null) return !1;
      for (var l = 0; l < e.length && l < t.length; l++)
        if (!de(t[l], e[l])) return !1;
      return !0;
    }
    function Ps(t, e, l, a, n, i) {
      return cl = i, B = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, R.H = t === null || t.memoizedState === null ? jm : Xm, da = !1, i = l(a, n), da = !1, Fa && (i = dm(
        e,
        l,
        a,
        n
      )), rm(t), i;
    }
    function rm(t) {
      R.H = Bu;
      var e = I !== null && I.next !== null;
      if (cl = 0, ht = I = B = null, Ru = !1, ui = 0, $a = null, e) throw Error(S(300));
      t === null || vt || (t = t.dependencies, t !== null && Ou(t) && (vt = !0));
    }
    function dm(t, e, l, a) {
      B = t;
      var n = 0;
      do {
        if (Fa && ($a = null), ui = 0, Fa = !1, 25 <= n) throw Error(S(301));
        if (n += 1, ht = I = null, t.updateQueue != null) {
          var i = t.updateQueue;
          i.lastEffect = null, i.events = null, i.stores = null, i.memoCache != null && (i.memoCache.index = 0);
        }
        R.H = Pv, i = e(l, a);
      } while (Fa);
      return i;
    }
    function Kv() {
      var t = R.H, e = t.useState()[0];
      return e = typeof e.then == "function" ? Si(e) : e, t = t.useState()[0], (I !== null ? I.memoizedState : null) !== t && (B.flags |= 1024), e;
    }
    function tf() {
      var t = Uu !== 0;
      return Uu = 0, t;
    }
    function ef(t, e, l) {
      e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~l;
    }
    function lf(t) {
      if (Ru) {
        for (t = t.memoizedState; t !== null; ) {
          var e = t.queue;
          e !== null && (e.pending = null), t = t.next;
        }
        Ru = !1;
      }
      cl = 0, ht = I = B = null, Fa = !1, ui = Uu = 0, $a = null;
    }
    function Qt() {
      var t = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return ht === null ? B.memoizedState = ht = t : ht = ht.next = t, ht;
    }
    function dt() {
      if (I === null) {
        var t = B.alternate;
        t = t !== null ? t.memoizedState : null;
      } else t = I.next;
      var e = ht === null ? B.memoizedState : ht.next;
      if (e !== null)
        ht = e, I = t;
      else {
        if (t === null)
          throw B.alternate === null ? Error(S(467)) : Error(S(310));
        I = t, t = {
          memoizedState: I.memoizedState,
          baseState: I.baseState,
          baseQueue: I.baseQueue,
          queue: I.queue,
          next: null
        }, ht === null ? B.memoizedState = ht = t : ht = ht.next = t;
      }
      return ht;
    }
    function nc() {
      return { lastEffect: null, events: null, stores: null, memoCache: null };
    }
    function Si(t) {
      var e = ui;
      return ui += 1, $a === null && ($a = []), t = im($a, t, e), e = B, (ht === null ? e.memoizedState : ht.next) === null && (e = e.alternate, R.H = e === null || e.memoizedState === null ? jm : Xm), t;
    }
    function ic(t) {
      if (t !== null && typeof t == "object") {
        if (typeof t.then == "function") return Si(t);
        if (t.$$typeof === Ab) return;
        if (t.$$typeof === Xe) return Dt(t);
      }
      throw Error(S(438, String(t)));
    }
    function af(t) {
      var e = null, l = B.updateQueue;
      if (l !== null && (e = l.memoCache), e == null) {
        var a = B.alternate;
        a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (e = {
          data: a.data.map(function(n) {
            return n.slice();
          }),
          index: 0
        })));
      }
      if (e == null && (e = { data: [], index: 0 }), l === null && (l = nc(), B.updateQueue = l), l.memoCache = e, l = e.data[e.index], l === void 0)
        for (l = e.data[e.index] = Array(t), a = 0; a < t; a++)
          l[a] = Eb;
      return e.index++, l;
    }
    function ol(t, e) {
      return typeof e == "function" ? e(t) : e;
    }
    function ou(t) {
      var e = dt();
      return nf(e, I, t);
    }
    function nf(t, e, l) {
      var a = t.queue;
      if (a === null) throw Error(S(311));
      a.lastRenderedReducer = l;
      var n = t.baseQueue, i = a.pending;
      if (i !== null) {
        if (n !== null) {
          var u = n.next;
          n.next = i.next, i.next = u;
        }
        e.baseQueue = n = i, a.pending = null;
      }
      if (i = t.baseState, n === null) t.memoizedState = i;
      else {
        e = n.next;
        var c = u = null, s = null, o = e, r = !1;
        do {
          var b = o.lane & -536870913;
          if (b !== o.lane ? (q & b) === b : (cl & b) === b) {
            var d = o.revertLane;
            if (d === 0)
              s !== null && (s = s.next = {
                lane: 0,
                revertLane: 0,
                gesture: null,
                action: o.action,
                hasEagerState: o.hasEagerState,
                eagerState: o.eagerState,
                next: null
              }), b === fa && (r = !0);
            else if ((cl & d) === d) {
              o = o.next, d === fa && (r = !0);
              continue;
            } else
              b = {
                lane: 0,
                revertLane: o.revertLane,
                gesture: null,
                action: o.action,
                hasEagerState: o.hasEagerState,
                eagerState: o.eagerState,
                next: null
              }, s === null ? (c = s = b, u = i) : s = s.next = b, B.lanes |= d, Vl |= d;
            b = o.action, da && l(i, b), i = o.hasEagerState ? o.eagerState : l(i, b);
          } else
            d = {
              lane: b,
              revertLane: o.revertLane,
              gesture: o.gesture,
              action: o.action,
              hasEagerState: o.hasEagerState,
              eagerState: o.eagerState,
              next: null
            }, s === null ? (c = s = d, u = i) : s = s.next = d, B.lanes |= b, Vl |= b;
          o = o.next;
        } while (o !== null && o !== e);
        if (s === null ? u = i : s.next = c, !de(i, t.memoizedState) && (vt = !0, r && (l = ka, l !== null)))
          throw l;
        t.memoizedState = i, t.baseState = u, t.baseQueue = s, a.lastRenderedState = i;
      }
      return n === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
    }
    function no(t) {
      var e = dt(), l = e.queue;
      if (l === null) throw Error(S(311));
      l.lastRenderedReducer = t;
      var a = l.dispatch, n = l.pending, i = e.memoizedState;
      if (n !== null) {
        l.pending = null;
        var u = n = n.next;
        do
          i = t(i, u.action), u = u.next;
        while (u !== n);
        de(i, e.memoizedState) || (vt = !0), e.memoizedState = i, e.baseQueue === null && (e.baseState = i), l.lastRenderedState = i;
      }
      return [i, a];
    }
    function mm(t, e, l) {
      var a = B, n = dt(), i = G;
      if (i) {
        if (l === void 0) throw Error(S(407));
        l = l();
      } else l = e();
      var u = !de(
        (I || n).memoizedState,
        l
      );
      if (u && (n.memoizedState = l, vt = !0), n = n.queue, uf(vm.bind(null, a, n, t), [
        t
      ]), t = n.getSnapshot !== e || u || ht !== null && (ht.memoizedState.tag & 1) !== 0, an(
        t ? 9 : 8,
        { destroy: void 0 },
        bm.bind(null, a, n, l, e),
        null
      ), t) {
        if (a.flags |= 2048, P === null) throw Error(S(349));
        i || (cl & 127) !== 0 || hm(a, e, l);
      }
      return l;
    }
    function hm(t, e, l) {
      t.flags |= 16384, t = { getSnapshot: e, value: l }, e = B.updateQueue, e === null ? (e = nc(), B.updateQueue = e, e.stores = [t]) : (l = e.stores, l === null ? e.stores = [t] : l.push(t));
    }
    function bm(t, e, l, a) {
      e.value = l, e.getSnapshot = a, ym(e) && gm(t);
    }
    function vm(t, e, l) {
      return l(function() {
        ym(e) && gm(t);
      });
    }
    function ym(t) {
      var e = t.getSnapshot;
      t = t.value;
      try {
        var l = e();
        return !de(t, l);
      } catch {
        return !0;
      }
    }
    function gm(t) {
      var e = ga(t, 2);
      e !== null && $t(e, t, 2);
    }
    function ko(t) {
      var e = Qt();
      if (typeof t == "function") {
        var l = t;
        if (t = l(), da) {
          Nl(!0);
          try {
            l();
          } finally {
            Nl(!1);
          }
        }
      }
      return e.memoizedState = e.baseState = t, e.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ol,
        lastRenderedState: t
      }, e;
    }
    function pm(t, e, l, a) {
      return t.baseState = l, nf(
        t,
        I,
        typeof a == "function" ? a : ol
      );
    }
    function kv(t, e, l, a, n) {
      if (cc(t)) throw Error(S(485));
      if (t = e.action, t !== null) {
        var i = {
          payload: n,
          action: t,
          next: null,
          isTransition: !0,
          status: "pending",
          value: null,
          reason: null,
          listeners: [],
          then: function(u) {
            i.listeners.push(u);
          }
        };
        R.T !== null ? l(!0) : i.isTransition = !1, a(i), l = e.pending, l === null ? (i.next = e.pending = i, xm(e, i)) : (i.next = l.next, e.pending = l.next = i);
      }
    }
    function xm(t, e) {
      var l = e.action, a = e.payload, n = t.state;
      if (e.isTransition) {
        var i = R.T, u = {};
        u.types = i !== null ? i.types : null, R.T = u;
        try {
          var c = l(n, a), s = R.S;
          s !== null && s(u, c), cd(t, e, c);
        } catch (o) {
          Jo(t, e, o);
        } finally {
          i !== null && u.types !== null && (i.types = u.types), R.T = i;
        }
      } else
        try {
          i = l(n, a), cd(t, e, i);
        } catch (o) {
          Jo(t, e, o);
        }
    }
    function cd(t, e, l) {
      l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
        function(a) {
          od(t, e, a);
        },
        function(a) {
          return Jo(t, e, a);
        }
      ) : od(t, e, l);
    }
    function od(t, e, l) {
      e.status = "fulfilled", e.value = l, Sm(e), t.state = l, e = t.pending, e !== null && (l = e.next, l === e ? t.pending = null : (l = l.next, e.next = l, xm(t, l)));
    }
    function Jo(t, e, l) {
      var a = t.pending;
      if (t.pending = null, a !== null) {
        a = a.next;
        do
          e.status = "rejected", e.reason = l, Sm(e), e = e.next;
        while (e !== a);
      }
      t.action = null;
    }
    function Sm(t) {
      t = t.listeners;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
    function Tm(t, e) {
      return e;
    }
    function sd(t, e) {
      if (G) {
        var l = P.formState;
        if (l !== null) {
          t: {
            var a = B;
            if (G) {
              if (at) {
                e: {
                  for (var n = at, i = Ne; n.nodeType !== 8; ) {
                    if (!i) {
                      n = null;
                      break e;
                    }
                    if (n = Me(
                      n.nextSibling
                    ), n === null) {
                      n = null;
                      break e;
                    }
                  }
                  i = n.data, n = i === "F!" || i === "F" ? n : null;
                }
                if (n) {
                  at = Me(
                    n.nextSibling
                  ), a = n.data === "F!";
                  break t;
                }
              }
              ql(a);
            }
            a = !1;
          }
          a && (e = l[0]);
        }
      }
      return l = Qt(), l.memoizedState = l.baseState = e, a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Tm,
        lastRenderedState: e
      }, l.queue = a, l = Lm.bind(
        null,
        B,
        a
      ), a.dispatch = l, a = ko(!1), i = ff.bind(
        null,
        B,
        !1,
        a.queue
      ), a = Qt(), n = {
        state: e,
        dispatch: null,
        action: t,
        pending: null
      }, a.queue = n, l = kv.bind(
        null,
        B,
        n,
        i,
        l
      ), n.dispatch = l, a.memoizedState = t, [e, l, !1];
    }
    function fd(t) {
      var e = dt();
      return Nm(e, I, t);
    }
    function Nm(t, e, l) {
      if (e = nf(
        t,
        e,
        Tm
      )[0], t = ou(ol)[0], typeof e == "object" && e !== null && typeof e.then == "function")
        try {
          var a = Si(e);
        } catch (u) {
          throw u === vn ? ac : u;
        }
      else a = e;
      e = dt();
      var n = e.queue, i = n.dispatch;
      return l !== e.memoizedState && (B.flags |= 2048, an(
        9,
        { destroy: void 0 },
        Jv.bind(null, n, l),
        null
      )), [a, i, t];
    }
    function Jv(t, e) {
      t.action = e;
    }
    function rd(t) {
      var e = dt(), l = I;
      if (l !== null)
        return Nm(e, l, t);
      dt(), e = e.memoizedState, l = dt();
      var a = l.queue.dispatch;
      return l.memoizedState = t, [e, a, !1];
    }
    function an(t, e, l, a) {
      return t = { tag: t, create: l, deps: a, inst: e, next: null }, e = B.updateQueue, e === null && (e = nc(), B.updateQueue = e), l = e.lastEffect, l === null ? e.lastEffect = t.next = t : (a = l.next, l.next = t, t.next = a, e.lastEffect = t), t;
    }
    function Mm() {
      return dt().memoizedState;
    }
    function su(t, e, l, a) {
      var n = Qt();
      B.flags |= t, n.memoizedState = an(
        1 | e,
        { destroy: void 0 },
        l,
        a === void 0 ? null : a
      );
    }
    function uc(t, e, l, a) {
      var n = dt();
      a = a === void 0 ? null : a;
      var i = n.memoizedState.inst;
      I !== null && a !== null && Is(a, I.memoizedState.deps) ? n.memoizedState = an(e, i, l, a) : (B.flags |= t, n.memoizedState = an(
        1 | e,
        i,
        l,
        a
      ));
    }
    function dd(t, e) {
      su(8390656, 8, t, e);
    }
    function uf(t, e) {
      uc(2048, 8, t, e);
    }
    function Fv(t) {
      B.flags |= 4;
      var e = B.updateQueue;
      if (e === null)
        e = nc(), B.updateQueue = e, e.events = [t];
      else {
        var l = e.events;
        l === null ? e.events = [t] : l.push(t);
      }
    }
    function _m(t) {
      var e = dt().memoizedState;
      return Fv({ ref: e, nextImpl: t }), function() {
        if ((Q & 2) !== 0) throw Error(S(440));
        return e.impl.apply(void 0, arguments);
      };
    }
    function Em(t, e) {
      return uc(4, 2, t, e);
    }
    function Am(t, e) {
      return uc(4, 4, t, e);
    }
    function Cm(t, e) {
      if (typeof e == "function") {
        t = t();
        var l = e(t);
        return function() {
          typeof l == "function" ? l() : e(null);
        };
      }
      if (e != null)
        return t = t(), e.current = t, function() {
          e.current = null;
        };
    }
    function Om(t, e, l) {
      l = l != null ? l.concat([t]) : null, uc(4, 4, Cm.bind(null, e, t), l);
    }
    function cf() {
    }
    function zm(t, e) {
      var l = dt();
      e = e === void 0 ? null : e;
      var a = l.memoizedState;
      return e !== null && Is(e, a[1]) ? a[0] : (l.memoizedState = [t, e], t);
    }
    function Dm(t, e) {
      var l = dt();
      e = e === void 0 ? null : e;
      var a = l.memoizedState;
      if (e !== null && Is(e, a[1]))
        return a[0];
      if (a = t(), da) {
        Nl(!0);
        try {
          t();
        } finally {
          Nl(!1);
        }
      }
      return l.memoizedState = [a, e], a;
    }
    function of(t, e, l) {
      return l === void 0 || (cl & 1073741824) !== 0 && (q & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = l, t = Nh(), B.lanes |= t, Vl |= t, l);
    }
    function wm(t, e, l, a) {
      return de(l, e) ? l : jl.current !== null ? (t = of(t, l, a), de(t, e) || (vt = !0), t) : (cl & 106) === 0 || (cl & 1073741824) !== 0 && (q & 261930) === 0 ? (vt = !0, t.memoizedState = l) : (t = Nh(), B.lanes |= t, Vl |= t, e);
    }
    function Rm(t, e, l, a, n) {
      var i = Z.p;
      Z.p = i !== 0 && 8 > i ? i : 8;
      var u = R.T, c = {};
      c.types = u !== null ? u.types : null, R.T = c, ff(t, !1, e, l);
      try {
        var s = n(), o = R.S;
        if (o !== null && o(c, s), s !== null && typeof s == "object" && typeof s.then == "function") {
          var r = Qv(
            s,
            a
          );
          Kn(
            t,
            e,
            r,
            re(t)
          );
        } else
          Kn(
            t,
            e,
            a,
            re(t)
          );
      } catch (b) {
        Kn(
          t,
          e,
          { then: function() {
          }, status: "rejected", reason: b },
          re()
        );
      } finally {
        Z.p = i, u !== null && c.types !== null && (u.types = c.types), R.T = u;
      }
    }
    function $v() {
    }
    function Fo(t, e, l, a) {
      if (t.tag !== 5) throw Error(S(476));
      var n = Um(t).queue;
      Rm(
        t,
        n,
        e,
        la,
        l === null ? $v : function() {
          return Bm(t), l(a);
        }
      );
    }
    function Um(t) {
      var e = t.memoizedState;
      if (e !== null) return e;
      e = {
        memoizedState: la,
        baseState: la,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: ol,
          lastRenderedState: la
        },
        next: null
      };
      var l = {};
      return e.next = {
        memoizedState: l,
        baseState: l,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: ol,
          lastRenderedState: l
        },
        next: null
      }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
    }
    function Bm(t) {
      var e = Um(t);
      e.next === null && (e = t.alternate.memoizedState), Kn(
        t,
        e.next.queue,
        {},
        re()
      );
    }
    function sf() {
      return Dt(rn);
    }
    function Hm() {
      return dt().memoizedState;
    }
    function Gm() {
      return dt().memoizedState;
    }
    function Wv(t) {
      for (var e = t.return; e !== null; ) {
        switch (e.tag) {
          case 24:
          case 3:
            var l = re();
            t = Dl(l);
            var a = wl(e, t, l);
            a !== null && ($t(a, e, l), Vn(a, e, l)), e = { cache: Ks() }, t.payload = e;
            return;
        }
        e = e.return;
      }
    }
    function Iv(t, e, l) {
      var a = re();
      l = {
        lane: a,
        revertLane: 0,
        gesture: null,
        action: l,
        hasEagerState: !1,
        eagerState: null,
        next: null
      }, cc(t) ? Ym(e, l) : (l = Vs(t, e, l, a), l !== null && ($t(l, t, a), qm(l, e, a)));
    }
    function Lm(t, e, l) {
      var a = re();
      Kn(t, e, l, a);
    }
    function Kn(t, e, l, a) {
      var n = {
        lane: a,
        revertLane: 0,
        gesture: null,
        action: l,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (cc(t)) Ym(e, n);
      else {
        var i = t.alternate;
        if (t.lanes === 0 && (i === null || i.lanes === 0) && (i = e.lastRenderedReducer, i !== null))
          try {
            var u = e.lastRenderedState, c = i(u, l);
            if (n.hasEagerState = !0, n.eagerState = c, de(c, u))
              return ec(t, e, n, 0), P === null && tc(), !1;
          } catch {
          } finally {
          }
        if (l = Vs(t, e, n, a), l !== null)
          return $t(l, t, a), qm(l, e, a), !0;
      }
      return !1;
    }
    function ff(t, e, l, a) {
      if (a = {
        lane: 2,
        revertLane: Sf(),
        gesture: null,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      }, cc(t)) {
        if (e) throw Error(S(479));
      } else
        e = Vs(
          t,
          l,
          a,
          2
        ), e !== null && $t(e, t, 2);
    }
    function cc(t) {
      var e = t.alternate;
      return t === B || e !== null && e === B;
    }
    function Ym(t, e) {
      Fa = Ru = !0;
      var l = t.pending;
      l === null ? e.next = e : (e.next = l.next, l.next = e), t.pending = e;
    }
    function qm(t, e, l) {
      if ((l & 4194048) !== 0) {
        var a = e.lanes;
        a &= t.pendingLanes, l |= a, e.lanes = l, M0(t, l);
      }
    }
    var Bu = {
      readContext: Dt,
      use: ic,
      useCallback: ot,
      useContext: ot,
      useEffect: ot,
      useImperativeHandle: ot,
      useLayoutEffect: ot,
      useInsertionEffect: ot,
      useMemo: ot,
      useReducer: ot,
      useRef: ot,
      useState: ot,
      useDebugValue: ot,
      useDeferredValue: ot,
      useTransition: ot,
      useSyncExternalStore: ot,
      useId: ot,
      useHostTransitionStatus: ot,
      useFormState: ot,
      useActionState: ot,
      useOptimistic: ot,
      useMemoCache: ot,
      useCacheRefresh: ot,
      useEffectEvent: ot
    }, jm = {
      readContext: Dt,
      use: ic,
      useCallback: function(t, e) {
        return Qt().memoizedState = [
          t,
          e === void 0 ? null : e
        ], t;
      },
      useContext: Dt,
      useEffect: dd,
      useImperativeHandle: function(t, e, l) {
        l = l != null ? l.concat([t]) : null, su(
          4194308,
          4,
          Cm.bind(null, e, t),
          l
        );
      },
      useLayoutEffect: function(t, e) {
        return su(4194308, 4, t, e);
      },
      useInsertionEffect: function(t, e) {
        su(4, 2, t, e);
      },
      useMemo: function(t, e) {
        var l = Qt();
        e = e === void 0 ? null : e;
        var a = t();
        if (da) {
          Nl(!0);
          try {
            t();
          } finally {
            Nl(!1);
          }
        }
        return l.memoizedState = [a, e], a;
      },
      useReducer: function(t, e, l) {
        var a = Qt();
        if (l !== void 0) {
          var n = l(e);
          if (da) {
            Nl(!0);
            try {
              l(e);
            } finally {
              Nl(!1);
            }
          }
        } else n = e;
        return a.memoizedState = a.baseState = n, t = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: t,
          lastRenderedState: n
        }, a.queue = t, t = t.dispatch = Iv.bind(
          null,
          B,
          t
        ), [a.memoizedState, t];
      },
      useRef: function(t) {
        var e = Qt();
        return t = { current: t }, e.memoizedState = t;
      },
      useState: function(t) {
        t = ko(t);
        var e = t.queue, l = Lm.bind(null, B, e);
        return e.dispatch = l, [t.memoizedState, l];
      },
      useDebugValue: cf,
      useDeferredValue: function(t, e) {
        var l = Qt();
        return of(l, t, e);
      },
      useTransition: function() {
        var t = ko(!1);
        return t = Rm.bind(
          null,
          B,
          t.queue,
          !0,
          !1
        ), Qt().memoizedState = t, [!1, t];
      },
      useSyncExternalStore: function(t, e, l) {
        var a = B, n = Qt();
        if (G) {
          if (l === void 0)
            throw Error(S(407));
          l = l();
        } else {
          if (l = e(), P === null)
            throw Error(S(349));
          (q & 127) !== 0 || hm(a, e, l);
        }
        n.memoizedState = l;
        var i = { value: l, getSnapshot: e };
        return n.queue = i, dd(vm.bind(null, a, i, t), [
          t
        ]), a.flags |= 2048, an(
          9,
          { destroy: void 0 },
          bm.bind(
            null,
            a,
            i,
            l,
            e
          ),
          null
        ), l;
      },
      useId: function() {
        var t = Qt(), e = P.identifierPrefix;
        if (G) {
          var l = Ze, a = Qe;
          l = (a & ~(1 << 32 - fe(a) - 1)).toString(32) + l, e = "_" + e + "R_" + l, l = Uu++, 0 < l && (e += "H" + l.toString(32)), e += "_";
        } else
          l = Zv++, e = "_" + e + "r_" + l.toString(32) + "_";
        return t.memoizedState = e;
      },
      useHostTransitionStatus: sf,
      useFormState: sd,
      useActionState: sd,
      useOptimistic: function(t) {
        var e = Qt();
        e.memoizedState = e.baseState = t;
        var l = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null
        };
        return e.queue = l, e = ff.bind(
          null,
          B,
          !0,
          l
        ), l.dispatch = e, [t, e];
      },
      useMemoCache: af,
      useCacheRefresh: function() {
        return Qt().memoizedState = Wv.bind(
          null,
          B
        );
      },
      useEffectEvent: function(t) {
        var e = Qt(), l = { impl: t };
        return e.memoizedState = l, function() {
          if ((Q & 2) !== 0)
            throw Error(S(440));
          return l.impl.apply(void 0, arguments);
        };
      }
    }, Xm = {
      readContext: Dt,
      use: ic,
      useCallback: zm,
      useContext: Dt,
      useEffect: uf,
      useImperativeHandle: Om,
      useInsertionEffect: Em,
      useLayoutEffect: Am,
      useMemo: Dm,
      useReducer: ou,
      useRef: Mm,
      useState: function() {
        return ou(ol);
      },
      useDebugValue: cf,
      useDeferredValue: function(t, e) {
        var l = dt();
        return wm(
          l,
          I.memoizedState,
          t,
          e
        );
      },
      useTransition: function() {
        var t = ou(ol)[0], e = dt().memoizedState;
        return [
          typeof t == "boolean" ? t : Si(t),
          e
        ];
      },
      useSyncExternalStore: mm,
      useId: Hm,
      useHostTransitionStatus: sf,
      useFormState: fd,
      useActionState: fd,
      useOptimistic: function(t, e) {
        var l = dt();
        return pm(l, I, t, e);
      },
      useMemoCache: af,
      useCacheRefresh: Gm,
      useEffectEvent: _m
    }, Pv = {
      readContext: Dt,
      use: ic,
      useCallback: zm,
      useContext: Dt,
      useEffect: uf,
      useImperativeHandle: Om,
      useInsertionEffect: Em,
      useLayoutEffect: Am,
      useMemo: Dm,
      useReducer: no,
      useRef: Mm,
      useState: function() {
        return no(ol);
      },
      useDebugValue: cf,
      useDeferredValue: function(t, e) {
        var l = dt();
        return I === null ? of(l, t, e) : wm(
          l,
          I.memoizedState,
          t,
          e
        );
      },
      useTransition: function() {
        var t = no(ol)[0], e = dt().memoizedState;
        return [
          typeof t == "boolean" ? t : Si(t),
          e
        ];
      },
      useSyncExternalStore: mm,
      useId: Hm,
      useHostTransitionStatus: sf,
      useFormState: rd,
      useActionState: rd,
      useOptimistic: function(t, e) {
        var l = dt();
        return I !== null ? pm(l, I, t, e) : (l.baseState = t, [t, l.queue.dispatch]);
      },
      useMemoCache: af,
      useCacheRefresh: Gm,
      useEffectEvent: _m
    };
    function io(t, e, l, a) {
      e = t.memoizedState, l = l(a, e), l = l == null ? e : tt({}, e, l), t.memoizedState = l, t.lanes === 0 && (t.updateQueue.baseState = l);
    }
    var $o = {
      enqueueSetState: function(t, e, l) {
        t = t._reactInternals;
        var a = re(), n = Dl(a);
        n.payload = e, l != null && (n.callback = l), e = wl(t, n, a), e !== null && ($t(e, t, a), Vn(e, t, a));
      },
      enqueueReplaceState: function(t, e, l) {
        t = t._reactInternals;
        var a = re(), n = Dl(a);
        n.tag = 1, n.payload = e, l != null && (n.callback = l), e = wl(t, n, a), e !== null && ($t(e, t, a), Vn(e, t, a));
      },
      enqueueForceUpdate: function(t, e) {
        t = t._reactInternals;
        var l = re(), a = Dl(l);
        a.tag = 2, e != null && (a.callback = e), e = wl(t, a, l), e !== null && ($t(e, t, l), Vn(e, t, l));
      }
    };
    function md(t, e, l, a, n, i, u) {
      return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, i, u) : e.prototype && e.prototype.isPureReactComponent ? !ei(l, a) || !ei(n, i) : !0;
    }
    function hd(t, e, l, a) {
      t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(l, a), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(l, a), e.state !== t && $o.enqueueReplaceState(e, e.state, null);
    }
    function ma(t, e) {
      var l = e;
      if ("ref" in e) {
        l = {};
        for (var a in e)
          a !== "ref" && (l[a] = e[a]);
      }
      if (t = t.defaultProps) {
        l === e && (l = tt({}, l));
        for (var n in t)
          l[n] === void 0 && (l[n] = t[n]);
      }
      return l;
    }
    function Vm(t) {
      _u(t);
    }
    function Qm(t) {
      console.error(t);
    }
    function Zm(t) {
      _u(t);
    }
    function Hu(t, e) {
      try {
        var l = t.onUncaughtError;
        l(e.value, { componentStack: e.stack });
      } catch (a) {
        setTimeout(function() {
          throw a;
        });
      }
    }
    function bd(t, e, l) {
      try {
        var a = t.onCaughtError;
        a(l.value, {
          componentStack: l.stack,
          errorBoundary: e.tag === 1 ? e.stateNode : null
        });
      } catch (n) {
        setTimeout(function() {
          throw n;
        });
      }
    }
    function Wo(t, e, l) {
      return l = Dl(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
        Hu(t, e);
      }, l;
    }
    function Km(t) {
      return t = Dl(t), t.tag = 3, t;
    }
    function km(t, e, l, a) {
      var n = l.type.getDerivedStateFromError;
      if (typeof n == "function") {
        var i = a.value;
        t.payload = function() {
          return n(i);
        }, t.callback = function() {
          bd(e, l, a);
        };
      }
      var u = l.stateNode;
      u !== null && typeof u.componentDidCatch == "function" && (t.callback = function() {
        bd(e, l, a), typeof n != "function" && (Bl === null ? Bl =  new Set([this]) : Bl.add(this));
        var c = a.stack;
        this.componentDidCatch(a.value, {
          componentStack: c !== null ? c : ""
        });
      });
    }
    function ty(t, e, l, a, n) {
      if (l.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
        if (e = l.alternate, e !== null && oa(
          e,
          l,
          n,
          !0
        ), l = Bt.current, l !== null) {
          switch (l.tag) {
            case 31:
            case 13:
            case 19:
              return Lt === null ? Qu() : l.alternate === null && st === 0 && (st = 3), l.flags &= -257, l.flags |= 65536, l.lanes = n, a === zu ? l.flags |= 16384 : (e = l.updateQueue, e === null ? l.updateQueue =  new Set([a]) : e.add(a), mo(t, a, n)), !1;
            case 22:
              return l.flags |= 65536, a === zu ? l.flags |= 16384 : (e = l.updateQueue, e === null ? (e = {
                transitions: null,
                markerInstances: null,
                retryQueue:  new Set([a])
              }, l.updateQueue = e) : (l = e.retryQueue, l === null ? e.retryQueue =  new Set([a]) : l.add(a)), mo(t, a, n)), !1;
          }
          throw Error(S(435, l.tag));
        }
        return mo(t, a, n), Qu(), !1;
      }
      if (G)
        return e = Bt.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = n, a !== Yo && (t = Error(S(422), { cause: a }), ai(Te(t, l)))) : (a !== Yo && (e = Error(S(423), {
          cause: a
        }), ai(
          Te(e, l)
        )), t = t.current.alternate, t.flags |= 65536, n &= -n, t.lanes |= n, a = Te(a, l), n = Wo(
          t.stateNode,
          a,
          n
        ), ao(t, n), st !== 4 && (st = 2)), !1;
      var i = Error(S(520), { cause: a });
      if (i = Te(i, l), $n === null ? $n = [i] : $n.push(i), st !== 4 && (st = 2), e === null) return !0;
      a = Te(a, l), l = e;
      do {
        switch (l.tag) {
          case 3:
            return l.flags |= 65536, t = n & -n, l.lanes |= t, t = Wo(l.stateNode, a, t), ao(l, t), !1;
          case 1:
            if (e = l.type, i = l.stateNode, (l.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || i !== null && typeof i.componentDidCatch == "function" && (Bl === null || !Bl.has(i))))
              return l.flags |= 65536, n &= -n, l.lanes |= n, n = Km(n), km(
                n,
                t,
                l,
                a
              ), ao(l, n), !1;
            break;
          case 22:
            if (l.memoizedState !== null)
              return l.flags |= 65536, !1;
        }
        l = l.return;
      } while (l !== null);
      return !1;
    }
    var rf = Error(S(461)), vt = !1;
    function gt(t, e, l, a) {
      e.child = t === null ? cm(e, null, l, a) : ra(
        e,
        t.child,
        l,
        a
      );
    }
    function vd(t, e, l, a, n) {
      l = l.render;
      var i = e.ref;
      if ("ref" in a) {
        var u = {};
        for (var c in a)
          c !== "ref" && (u[c] = a[c]);
      } else u = a;
      return sa(e), a = Ps(
        t,
        e,
        l,
        u,
        i,
        n
      ), c = tf(), t !== null && !vt ? (ef(t, e, n), sl(t, e, n)) : (G && c && lc(e), e.flags |= 1, gt(t, e, a, n), e.child);
    }
    function yd(t, e, l, a, n) {
      if (t === null) {
        var i = l.type;
        return typeof i == "function" && !Qs(i) && i.defaultProps === void 0 && l.compare === null ? (e.tag = 15, e.type = i, Jm(
          t,
          e,
          i,
          a,
          n
        )) : (t = iu(
          l.type,
          null,
          a,
          e,
          e.mode,
          n
        ), t.ref = e.ref, t.return = e, e.child = t);
      }
      if (i = t.child, !mf(t, n)) {
        var u = i.memoizedProps;
        if (l = l.compare, l = l !== null ? l : ei, l(u, a) && t.ref === e.ref)
          return sl(t, e, n);
      }
      return e.flags |= 1, t = al(i, a), t.ref = e.ref, t.return = e, e.child = t;
    }
    function Jm(t, e, l, a, n) {
      if (t !== null) {
        var i = t.memoizedProps;
        if (ei(i, a) && t.ref === e.ref)
          if (vt = !1, e.pendingProps = a = i, mf(t, n))
            (t.flags & 131072) !== 0 && (vt = !0);
          else
            return e.lanes = t.lanes, sl(t, e, n);
      }
      return Io(
        t,
        e,
        l,
        a,
        n
      );
    }
    function Fm(t, e, l, a) {
      var n = a.children, i = t !== null ? t.memoizedState : null;
      if (t === null && e.stateNode === null && (e.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null
      }), a.mode === "hidden") {
        if ((e.flags & 128) !== 0) {
          if (i = i !== null ? i.baseLanes | l : l, t !== null) {
            for (a = e.child = t.child, n = 0; a !== null; )
              n = n | a.lanes | a.childLanes, a = a.sibling;
            a = n & ~i;
          } else a = 0, e.child = null;
          return gd(
            t,
            e,
            i,
            l,
            a
          );
        }
        if ((l & 536870912) !== 0)
          e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && cu(
            e,
            i !== null ? i.cachePool : null
          ), i !== null ? ud(e, i) : Zo(), fm(e);
        else
          return a = e.lanes = 536870912, gd(
            t,
            e,
            i !== null ? i.baseLanes | l : l,
            l,
            a
          );
      } else
        i !== null ? (cu(e, i.cachePool), ud(e, i), Ul(), e.memoizedState = null) : (t !== null && cu(e, null), Zo(), Ul());
      return gt(t, e, n, l), e.child;
    }
    function kn(t, e) {
      return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null
      }), e.sibling;
    }
    function gd(t, e, l, a, n) {
      var i = ks();
      return i = i === null ? null : { parent: bt._currentValue, pool: i }, e.memoizedState = {
        baseLanes: l,
        cachePool: i
      }, t !== null && cu(e, null), Zo(), fm(e), t !== null && oa(t, e, a, !0), e.childLanes = n, null;
    }
    function fu(t, e) {
      return e = oc(
        { mode: e.mode, children: e.children },
        t.mode
      ), e.ref = t.ref, t.child = e, e.return = t, e;
    }
    function pd(t, e, l) {
      return ra(e, t.child, null, l), t = fu(e, e.pendingProps), t.flags |= 2, ie(e), e.memoizedState = null, t;
    }
    function ey(t, e, l) {
      var a = e.pendingProps, n = (e.flags & 128) !== 0;
      if (e.flags &= -129, t === null) {
        if (G) {
          if (a.mode === "hidden")
            return t = fu(e, a), e.lanes = 536870912, t.memoizedState = { baseLanes: 0, cachePool: null }, kn(null, t);
          if (Ko(e), (t = at) ? (t = Fh(
            t,
            Ne
          ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
            dehydrated: t,
            treeContext: Yl !== null ? { id: Qe, overflow: Ze } : null,
            retryLane: 536870912,
            hydrationErrors: null
          }, l = tm(t), l.return = e, e.child = l, _t = e, at = null)) : t = null, t === null) throw ql(e);
          return e.lanes = 536870912, null;
        }
        return fu(e, a);
      }
      var i = t.memoizedState;
      if (i !== null) {
        var u = i.dehydrated;
        if (Ko(e), n)
          if (e.flags & 256)
            e.flags &= -257, e = pd(
              t,
              e,
              l
            );
          else if (e.memoizedState !== null)
            e.child = t.child, e.flags |= 128, e = null;
          else throw Error(S(558));
        else if (vt || oa(t, e, l, !1), n = (l & t.childLanes) !== 0, vt || n) {
          if (jl.current === null) {
            if (a = P, a !== null && (u = _0(a, l), u !== 0 && u !== i.retryLane))
              throw i.retryLane = u, ga(t, u), $t(a, t, u), rf;
            Qu();
          }
          e = pd(
            t,
            e,
            l
          );
        } else
          t = i.treeContext, at = Me(u.nextSibling), _t = e, G = !0, zl = null, Ne = !1, t !== null && lm(e, t), e = fu(e, a), e.flags |= 134221824;
        return e;
      }
      return t = al(t.child, {
        mode: a.mode,
        children: a.children
      }), t.ref = e.ref, e.child = t, t.return = e, t;
    }
    function Oa(t, e) {
      var l = e.ref;
      if (l === null)
        t !== null && t.ref !== null && (e.flags |= 4194816);
      else {
        if (typeof l != "function" && typeof l != "object")
          throw Error(S(284));
        (t === null || t.ref !== l) && (e.flags |= 4194816);
      }
    }
    function Io(t, e, l, a, n) {
      return sa(e), l = Ps(
        t,
        e,
        l,
        a,
        void 0,
        n
      ), a = tf(), t !== null && !vt ? (ef(t, e, n), sl(t, e, n)) : (G && a && lc(e), e.flags |= 1, gt(t, e, l, n), e.child);
    }
    function xd(t, e, l, a, n, i) {
      return sa(e), e.updateQueue = null, l = dm(
        e,
        a,
        l,
        n
      ), rm(t), a = tf(), t !== null && !vt ? (ef(t, e, i), sl(t, e, i)) : (G && a && lc(e), e.flags |= 1, gt(t, e, l, i), e.child);
    }
    function Sd(t, e, l, a, n) {
      if (sa(e), e.stateNode === null) {
        var i = qa, u = l.contextType;
        typeof u == "object" && u !== null && (i = Dt(u)), i = new l(a, i), e.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, i.updater = $o, e.stateNode = i, i._reactInternals = e, i = e.stateNode, i.props = a, i.state = e.memoizedState, i.refs = {}, Fs(e), u = l.contextType, i.context = typeof u == "object" && u !== null ? Dt(u) : qa, i.state = e.memoizedState, u = l.getDerivedStateFromProps, typeof u == "function" && (io(
          e,
          l,
          u,
          a
        ), i.state = e.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (u = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), u !== i.state && $o.enqueueReplaceState(i, i.state, null), Zn(e, a, i, n), Qn(), i.state = e.memoizedState), typeof i.componentDidMount == "function" && (e.flags |= 4194308), a = !0;
      } else if (t === null) {
        i = e.stateNode;
        var c = e.memoizedProps, s = ma(l, c);
        i.props = s;
        var o = i.context, r = l.contextType;
        u = qa, typeof r == "object" && r !== null && (u = Dt(r));
        var b = l.getDerivedStateFromProps;
        r = typeof b == "function" || typeof i.getSnapshotBeforeUpdate == "function", c = e.pendingProps !== c, r || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (c || o !== u) && hd(
          e,
          i,
          a,
          u
        ), Sl = !1;
        var d = e.memoizedState;
        i.state = d, Zn(e, a, i, n), Qn(), o = e.memoizedState, c || d !== o || Sl ? (typeof b == "function" && (io(
          e,
          l,
          b,
          a
        ), o = e.memoizedState), (s = Sl || md(
          e,
          l,
          s,
          a,
          d,
          o,
          u
        )) ? (r || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = a, e.memoizedState = o), i.props = a, i.state = o, i.context = u, a = s) : (typeof i.componentDidMount == "function" && (e.flags |= 4194308), a = !1);
      } else {
        i = e.stateNode, Vo(t, e), u = e.memoizedProps, r = ma(l, u), i.props = r, b = e.pendingProps, d = i.context, o = l.contextType, s = qa, typeof o == "object" && o !== null && (s = Dt(o)), c = l.getDerivedStateFromProps, (o = typeof c == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (u !== b || d !== s) && hd(
          e,
          i,
          a,
          s
        ), Sl = !1, d = e.memoizedState, i.state = d, Zn(e, a, i, n), Qn();
        var m = e.memoizedState;
        u !== b || d !== m || Sl || t !== null && t.dependencies !== null && Ou(t.dependencies) ? (typeof c == "function" && (io(
          e,
          l,
          c,
          a
        ), m = e.memoizedState), (r = Sl || md(
          e,
          l,
          r,
          a,
          d,
          m,
          s
        ) || t !== null && t.dependencies !== null && Ou(t.dependencies)) ? (o || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(a, m, s), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(
          a,
          m,
          s
        )), typeof i.componentDidUpdate == "function" && (e.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || u === t.memoizedProps && d === t.memoizedState || (e.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || u === t.memoizedProps && d === t.memoizedState || (e.flags |= 1024), e.memoizedProps = a, e.memoizedState = m), i.props = a, i.state = m, i.context = s, a = r) : (typeof i.componentDidUpdate != "function" || u === t.memoizedProps && d === t.memoizedState || (e.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || u === t.memoizedProps && d === t.memoizedState || (e.flags |= 1024), a = !1);
      }
      return i = a, Oa(t, e), a = (e.flags & 128) !== 0, i || a ? (i = e.stateNode, l = a && typeof l.getDerivedStateFromError != "function" ? null : i.render(), e.flags |= 1, t !== null && a ? (e.child = ra(
        e,
        t.child,
        null,
        n
      ), e.child = ra(
        e,
        null,
        l,
        n
      )) : gt(t, e, l, n), e.memoizedState = i.state, t = e.child) : t = sl(
        t,
        e,
        n
      ), t;
    }
    function Td(t, e, l, a) {
      return ca(), e.flags |= 256, gt(t, e, l, a), e.child;
    }
    var Po = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0,
      hydrationErrors: null
    };
    function ts(t) {
      return { baseLanes: t, cachePool: nm() };
    }
    function es(t, e, l) {
      return t = t !== null ? t.childLanes & ~l : 0, e && (t |= ce), t;
    }
    function $m(t, e, l) {
      var a = e.pendingProps, n = !1, i = (e.flags & 128) !== 0, u;
      if ((u = i) || (u = t !== null && t.memoizedState === null ? !1 : (Rt.current & 2) !== 0), u && (n = !0, e.flags &= -129), u = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
        if (G) {
          if (n ? Rl(e) : Ul(), (t = at) ? (t = Fh(
            t,
            Ne
          ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
            dehydrated: t,
            treeContext: Yl !== null ? { id: Qe, overflow: Ze } : null,
            retryLane: 536870912,
            hydrationErrors: null
          }, l = tm(t), l.return = e, e.child = l, _t = e, at = null)) : t = null, t === null) throw ql(e);
          return _f(t) ? e.lanes = 32 : e.lanes = 536870912, null;
        }
        return i = a.children, a = a.fallback, n ? (Ul(), n = e.mode, i = oc(
          { mode: "hidden", children: i },
          n
        ), a = aa(
          a,
          n,
          l,
          null
        ), i.return = e, a.return = e, i.sibling = a, e.child = i, a = e.child, a.memoizedState = ts(l), a.childLanes = es(
          t,
          u,
          l
        ), e.memoizedState = Po, kn(null, a)) : (Rl(e), df(e, i));
      }
      var c = t.memoizedState;
      if (c !== null) {
        var s = c.dehydrated;
        if (s !== null)
          return ly(
            t,
            e,
            i,
            u,
            a,
            s,
            c,
            l
          );
      }
      return n ? (Ul(), n = a.fallback, i = e.mode, c = t.child, s = c.sibling, a = al(c, {
        mode: "hidden",
        children: a.children
      }), a.subtreeFlags = c.subtreeFlags & 1206910976, s !== null ? n = al(s, n) : (n = aa(
        n,
        i,
        l,
        null
      ), n.flags |= 2), n.return = e, a.return = e, a.sibling = n, e.child = a, kn(null, a), a = e.child, n = t.child.memoizedState, n === null ? n = ts(l) : (i = n.cachePool, i !== null ? (c = bt._currentValue, i = i.parent !== c ? { parent: c, pool: c } : i) : i = nm(), n = {
        baseLanes: n.baseLanes | l,
        cachePool: i
      }), a.memoizedState = n, a.childLanes = es(
        t,
        u,
        l
      ), e.memoizedState = Po, kn(t.child, a)) : (Rl(e), l = t.child, t = l.sibling, l = al(l, {
        mode: "visible",
        children: a.children
      }), l.return = e, l.sibling = null, t !== null && (u = e.deletions, u === null ? (e.deletions = [t], e.flags |= 16) : u.push(t)), e.child = l, e.memoizedState = null, l);
    }
    function df(t, e) {
      return e = oc(
        { mode: "visible", children: e },
        t.mode
      ), e.return = t, t.child = e;
    }
    function oc(t, e) {
      return t = Ft(22, t, null, e), t.lanes = 0, t;
    }
    function Zi(t, e, l) {
      return ra(e, t.child, null, l), t = df(
        e,
        e.pendingProps.children
      ), t.flags |= 2, e.memoizedState = null, t;
    }
    function ly(t, e, l, a, n, i, u, c) {
      if (l)
        return e.flags & 256 ? (Rl(e), e.flags &= -257, Zi(
          t,
          e,
          c
        )) : e.memoizedState !== null ? (Ul(), e.child = t.child, e.flags |= 128, null) : (Ul(), i = n.fallback, u = e.mode, n = oc(
          { mode: "visible", children: n.children },
          u
        ), i = aa(
          i,
          u,
          c,
          null
        ), i.flags |= 2, n.return = e, i.return = e, n.sibling = i, e.child = n, ra(e, t.child, null, c), n = e.child, n.memoizedState = ts(c), n.childLanes = es(
          t,
          a,
          c
        ), e.memoizedState = Po, kn(null, n));
      if (Rl(e), _f(i)) {
        if (a = i.nextSibling && i.nextSibling.dataset, a) var s = a.dgst;
        return a = s, a !== "" && (n = Error(S(419)), n.stack = "", n.digest = a, ai({ value: n, source: null, stack: null })), Zi(
          t,
          e,
          c
        );
      }
      if (vt || oa(t, e, c, !1), a = (c & t.childLanes) !== 0, vt || a) {
        if (jl.current !== null)
          return Zi(
            t,
            e,
            c
          );
        if (a = P, a !== null && (n = _0(
          a,
          c
        ), n !== 0 && n !== u.retryLane))
          throw u.retryLane = n, ga(t, n), $t(a, t, n), rf;
        return Es(i) || Qu(), Zi(
          t,
          e,
          c
        );
      }
      return Es(i) ? (e.flags |= 192, e.child = t.child, null) : (t = u.treeContext, at = Me(i.nextSibling), _t = e, G = !0, zl = null, Ne = !1, t !== null && lm(e, t), e = df(
        e,
        n.children
      ), e.flags |= 134221824, e);
    }
    function Nd(t, e, l) {
      t.lanes |= e;
      var a = t.alternate;
      a !== null && (a.lanes |= e), uu(t.return, e, l);
    }
    function Md(t) {
      for (var e = null; t !== null; ) {
        var l = t.alternate;
        l !== null && wu(l) === null && (e = t), t = t.sibling;
      }
      return e;
    }
    function Ki(t, e, l, a, n, i) {
      var u = t.memoizedState;
      u === null ? t.memoizedState = {
        isBackwards: e,
        rendering: null,
        renderingStartTime: 0,
        last: a,
        tail: l,
        tailMode: n,
        treeForkCount: i
      } : (u.isBackwards = e, u.rendering = null, u.renderingStartTime = 0, u.last = a, u.tail = l, u.tailMode = n, u.treeForkCount = i);
    }
    function uo(t) {
      var e = t.child;
      for (t.child = null; e !== null; ) {
        var l = e.sibling;
        e.sibling = t.child, t.child = e, e = l;
      }
    }
    function ls(t, e, l) {
      var a = e.pendingProps, n = a.revealOrder, i = a.tail;
      a = a.children;
      var u = Rt.current;
      if (e.flags & 128)
        return ii(e, u), null;
      var c = (u & 2) !== 0;
      if (c ? (u = u & 1 | 2, e.flags |= 128) : u &= 1, ii(e, u), n === "backwards" && t !== null ? (uo(t), gt(t, e, a, l), uo(t)) : gt(t, e, a, l), a = G ? li : 0, !c && t !== null && (t.flags & 128) !== 0)
        t: for (t = e.child; t !== null; ) {
          if (t.tag === 13)
            t.memoizedState !== null && Nd(t, l, e);
          else if (t.tag === 19)
            Nd(t, l, e);
          else if (t.child !== null) {
            t.child.return = t, t = t.child;
            continue;
          }
          if (t === e) break t;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e)
              break t;
            t = t.return;
          }
          t.sibling.return = t.return, t = t.sibling;
        }
      switch (n) {
        case "backwards":
          l = Md(e.child), l === null ? (n = e.child, e.child = null) : (n = l.sibling, l.sibling = null, uo(e)), Ki(
            e,
            !0,
            n,
            null,
            i,
            a
          );
          break;
        case "unstable_legacy-backwards":
          for (l = null, n = e.child, e.child = null; n !== null; ) {
            if (t = n.alternate, t !== null && wu(t) === null) {
              e.child = n;
              break;
            }
            t = n.sibling, n.sibling = l, l = n, n = t;
          }
          Ki(
            e,
            !0,
            l,
            null,
            i,
            a
          );
          break;
        case "together":
          Ki(
            e,
            !1,
            null,
            null,
            void 0,
            a
          );
          break;
        case "independent":
          e.memoizedState = null;
          break;
        default:
          l = Md(e.child), l === null ? (n = e.child, e.child = null) : (n = l.sibling, l.sibling = null), Ki(
            e,
            !1,
            n,
            l,
            i,
            a
          );
      }
      return e.child;
    }
    function _d(t, e, l) {
      var a = e.pendingProps;
      return _l(e, e.type, a.value), gt(t, e, a.children, l), e.child;
    }
    function sl(t, e, l) {
      if (t !== null && (e.dependencies = t.dependencies), Vl |= e.lanes, (l & e.childLanes) === 0)
        if (t !== null) {
          if (oa(
            t,
            e,
            l,
            !1
          ), (l & e.childLanes) === 0)
            return null;
        } else return null;
      if (t !== null && e.child !== t.child)
        throw Error(S(153));
      if (e.child !== null) {
        for (t = e.child, l = al(t, t.pendingProps), e.child = l, l.return = e; t.sibling !== null; )
          t = t.sibling, l = l.sibling = al(t, t.pendingProps), l.return = e;
        l.sibling = null;
      }
      return e.child;
    }
    function mf(t, e) {
      return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Ou(t)));
    }
    function ay(t, e, l) {
      switch (e.tag) {
        case 3:
          Su(e, e.stateNode.containerInfo), _l(e, bt, t.memoizedState.cache), ca();
          break;
        case 27:
        case 5:
          Oo(e);
          break;
        case 4:
          Su(e, e.stateNode.containerInfo);
          break;
        case 10:
          _l(
            e,
            e.type,
            e.memoizedProps.value
          );
          break;
        case 31:
          if (e.memoizedState !== null)
            return e.flags |= 128, Ko(e), null;
          break;
        case 13:
          var a = e.memoizedState;
          if (a !== null) {
            if (a.dehydrated !== null)
              return Rl(e), e.flags |= 128, null;
            a = oa(
              t,
              e,
              l,
              !1
            );
            var n = e.child.childLanes;
            return a || (l & n) !== 0 ? $m(t, e, l) : (Rl(e), t = sl(
              t,
              e,
              l
            ), t !== null ? t.sibling : null);
          }
          Rl(e);
          break;
        case 19:
          if (e.flags & 128)
            return ls(
              t,
              e,
              l
            );
          if (n = (t.flags & 128) !== 0, a = (l & e.childLanes) !== 0, a || (oa(
            t,
            e,
            l,
            !1
          ), a = (l & e.childLanes) !== 0), n) {
            if (a)
              return ls(
                t,
                e,
                l
              );
            e.flags |= 128;
          }
          if (n = e.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), ii(e, Rt.current), a) break;
          return null;
        case 22:
          return e.lanes = 0, Fm(
            t,
            e,
            l,
            e.pendingProps
          );
        case 24:
          _l(e, bt, t.memoizedState.cache);
      }
      return sl(t, e, l);
    }
    function Wm(t, e, l) {
      if (t !== null)
        if (t.memoizedProps !== e.pendingProps)
          vt = !0;
        else {
          if (!mf(t, l) && (e.flags & 128) === 0)
            return vt = !1, ay(
              t,
              e,
              l
            );
          vt = (t.flags & 131072) !== 0;
        }
      else
        vt = !1, G && (e.flags & 1048576) !== 0 && em(e, li, e.index);
      switch (e.lanes = 0, e.tag) {
        case 16:
          t: {
            var a = e.pendingProps;
            if (t = Il(e.elementType), e.type = t, typeof t == "function")
              Qs(t) ? (a = ma(t, a), e.tag = 1, e = Sd(
                null,
                e,
                t,
                a,
                l
              )) : (e.tag = 0, e = Io(
                null,
                e,
                t,
                a,
                l
              ));
            else {
              if (t != null) {
                var n = t.$$typeof;
                if (n === Ds) {
                  e.tag = 11, e = vd(
                    null,
                    e,
                    t,
                    a,
                    l
                  );
                  break t;
                } else if (n === ws) {
                  e.tag = 14, e = yd(
                    null,
                    e,
                    t,
                    a,
                    l
                  );
                  break t;
                } else if (n === Xe) {
                  e.tag = 10, e.type = t, e = _d(
                    null,
                    e,
                    l
                  );
                  break t;
                }
              }
              throw e = Ao(t) || t, Error(S(306, e, ""));
            }
          }
          return e;
        case 0:
          return Io(
            t,
            e,
            e.type,
            e.pendingProps,
            l
          );
        case 1:
          return a = e.type, n = ma(
            a,
            e.pendingProps
          ), Sd(
            t,
            e,
            a,
            n,
            l
          );
        case 3:
          t: {
            if (Su(
              e,
              e.stateNode.containerInfo
            ), t === null) throw Error(S(387));
            a = e.pendingProps;
            var i = e.memoizedState;
            n = i.element, Vo(t, e), Zn(e, a, null, l);
            var u = e.memoizedState;
            if (a = u.cache, _l(e, bt, a), a !== i.cache && jo(
              e,
              [bt],
              l,
              !0
            ), Qn(), a = u.element, i.isDehydrated)
              if (i = {
                element: a,
                isDehydrated: !1,
                cache: u.cache
              }, e.updateQueue.baseState = i, e.memoizedState = i, e.flags & 256) {
                e = Td(
                  t,
                  e,
                  a,
                  l
                );
                break t;
              } else if (a !== n) {
                n = Te(
                  Error(S(424)),
                  e
                ), ai(n), e = Td(
                  t,
                  e,
                  a,
                  l
                );
                break t;
              } else {
                switch (t = e.stateNode.containerInfo, t.nodeType) {
                  case 9:
                    t = t.body;
                    break;
                  default:
                    t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
                }
                for (at = Me(t.firstChild), _t = e, G = !0, zl = null, Ne = !0, l = cm(
                  e,
                  null,
                  a,
                  l
                ), e.child = l; l; )
                  l.flags = l.flags & -3 | 134221824, l = l.sibling;
              }
            else {
              if (ca(), a === n) {
                e = sl(
                  t,
                  e,
                  l
                );
                break t;
              }
              gt(t, e, a, l);
            }
            e = e.child;
          }
          return e;
        case 26:
          return Oa(t, e), t === null ? (l = Id(
            e.type,
            null,
            e.pendingProps,
            null
          )) ? e.memoizedState = l : G || (e.stateNode = qh(
            e.type,
            e.pendingProps,
            Ol.current,
            e
          )) : e.memoizedState = Id(
            e.type,
            t.memoizedProps,
            e.pendingProps,
            t.memoizedState
          ), null;
        case 27:
          return Oo(e), t === null && G && (a = e.stateNode = $h(
            e.type,
            e.pendingProps,
            Ol.current
          ), _t = e, Ne = !0, n = at, Zl(e.type) ? (As = n, at = Me(a.firstChild)) : at = n), gt(
            t,
            e,
            e.pendingProps.children,
            l
          ), Oa(t, e), t === null && (e.flags |= 4194304), e.child;
        case 5:
          return t === null && G && ((n = a = at) && (a = Fy(
            a,
            e.type,
            e.pendingProps,
            Ne
          ), a !== null ? (e.stateNode = a, _t = e, at = Me(a.firstChild), Ne = !1, n = !0) : n = !1), n || ql(e)), Oo(e), n = e.type, i = e.pendingProps, u = t !== null ? t.memoizedProps : null, a = i.children, Ns(n, i) ? a = null : u !== null && Ns(n, u) && (e.flags |= 32), e.memoizedState !== null && (n = Ps(
            t,
            e,
            Kv,
            null,
            null,
            l
          ), rn._currentValue = n), Oa(t, e), gt(t, e, a, l), e.child;
        case 6:
          return t === null && G && ((t = l = at) && (l = $y(
            l,
            e.pendingProps,
            Ne
          ), l !== null ? (e.stateNode = l, _t = e, at = null, t = !0) : t = !1), t || ql(e)), null;
        case 13:
          return $m(t, e, l);
        case 4:
          return Su(
            e,
            e.stateNode.containerInfo
          ), a = e.pendingProps, t === null ? e.child = ra(
            e,
            null,
            a,
            l
          ) : gt(t, e, a, l), e.child;
        case 11:
          return vd(
            t,
            e,
            e.type,
            e.pendingProps,
            l
          );
        case 7:
          return a = e.pendingProps, Oa(t, e), gt(t, e, a, l), e.child;
        case 8:
          return gt(
            t,
            e,
            e.pendingProps.children,
            l
          ), e.child;
        case 12:
          return gt(
            t,
            e,
            e.pendingProps.children,
            l
          ), e.child;
        case 10:
          return _d(t, e, l);
        case 9:
          return n = e.type._context, a = e.pendingProps.children, sa(e), n = Dt(n), a = a(n), e.flags |= 1, gt(t, e, a, l), e.child;
        case 14:
          return yd(
            t,
            e,
            e.type,
            e.pendingProps,
            l
          );
        case 15:
          return Jm(
            t,
            e,
            e.type,
            e.pendingProps,
            l
          );
        case 19:
          return ls(t, e, l);
        case 31:
          return ey(t, e, l);
        case 22:
          return Fm(
            t,
            e,
            l,
            e.pendingProps
          );
        case 24:
          return sa(e), a = Dt(bt), t === null ? (n = ks(), n === null && (n = P, i = Ks(), n.pooledCache = i, i.refCount++, i !== null && (n.pooledCacheLanes |= l), n = i), e.memoizedState = { parent: a, cache: n }, Fs(e), _l(e, bt, n)) : ((t.lanes & l) !== 0 && (Vo(t, e), Zn(e, null, null, l), Qn()), n = t.memoizedState, i = e.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, e.memoizedState = n, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = n), _l(e, bt, a)) : (a = i.cache, _l(e, bt, a), a !== n.cache && jo(
            e,
            [bt],
            l,
            !0
          ))), gt(
            t,
            e,
            e.pendingProps.children,
            l
          ), e.child;
        case 30:
          return e.stateNode === null && (e.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }), a = e.pendingProps, a.name != null && a.name !== "auto" ? e.flags |= t === null ? 18882560 : 18874368 : G && lc(e), t !== null && t.memoizedProps.name !== a.name ? e.flags |= 4194816 : Oa(t, e), gt(t, e, a.children, l), e.child;
        case 29:
          throw e.pendingProps;
      }
      throw Error(S(156, e.tag));
    }
    function tl(t) {
      t.flags |= 4;
    }
    function co(t, e, l, a, n) {
      var i;
      if ((i = (t.mode & 32) !== 0) && (i = l === null ? e0(e, a) : e0(e, a) && (a.src !== l.src || a.srcSet !== l.srcSet)), i) {
        if (t.flags |= 16777216, (n & 335544128) === n)
          if (t.stateNode.complete) t.flags |= 8192;
          else if (Eh()) t.flags |= 8192;
          else
            throw ia = zu, Js;
      } else t.flags &= -16777217;
    }
    function Ed(t, e) {
      if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
        t.flags &= -16777217;
      else if (t.flags |= 16777216, !t1(e))
        if (Eh()) t.flags |= 8192;
        else
          throw ia = zu, Js;
    }
    function ki(t, e) {
      e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? T0() : 536870912, t.lanes |= e, nn |= e);
    }
    function zn(t, e) {
      if (!G)
        switch (t.tailMode) {
          case "visible":
            break;
          case "collapsed":
            for (var l = t.tail, a = null; l !== null; )
              l.alternate !== null && (a = l), l = l.sibling;
            a === null ? e || t.tail === null ? t.tail = null : t.tail.sibling = null : a.sibling = null;
            break;
          default:
            for (e = t.tail, l = null; e !== null; )
              e.alternate !== null && (l = e), e = e.sibling;
            l === null ? t.tail = null : l.sibling = null;
        }
    }
    function lt(t) {
      var e = t.alternate !== null && t.alternate.child === t.child, l = 0, a = 0;
      if (e)
        for (var n = t.child; n !== null; )
          l |= n.lanes | n.childLanes, a |= n.subtreeFlags & 1206910976, a |= n.flags & 1206910976, n.return = t, n = n.sibling;
      else
        for (n = t.child; n !== null; )
          l |= n.lanes | n.childLanes, a |= n.subtreeFlags, a |= n.flags, n.return = t, n = n.sibling;
      return t.subtreeFlags |= a, t.childLanes = l, e;
    }
    function ny(t, e, l) {
      var a = e.pendingProps;
      switch (Zs(e), e.tag) {
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return lt(e), null;
        case 1:
          return lt(e), null;
        case 3:
          return l = e.stateNode, a = null, t !== null && (a = t.memoizedState.cache), e.memoizedState.cache !== a && (e.flags |= 2048), nl(bt), tn(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (t === null || t.child === null) && (Aa(e) ? tl(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, lo())), lt(e), null;
        case 26:
          var n = e.type, i = e.memoizedState;
          return t === null ? (tl(e), i !== null ? (lt(e), Ed(e, i)) : (lt(e), co(
            e,
            n,
            null,
            a,
            l
          ))) : i ? i !== t.memoizedState ? (tl(e), lt(e), Ed(e, i)) : (lt(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== a && tl(e), lt(e), co(
            e,
            n,
            t,
            a,
            l
          )), null;
        case 27:
          if (Tu(e), l = Ol.current, n = e.type, t !== null && e.stateNode != null)
            t.memoizedProps !== a && tl(e);
          else {
            if (!a) {
              if (e.stateNode === null)
                throw Error(S(166));
              return lt(e), e.subtreeFlags &= -33554433, null;
            }
            t = Ke.current, Aa(e) ? Pr(e, t) : (t = $h(n, a, l), e.stateNode = t, tl(e));
          }
          return lt(e), e.subtreeFlags &= -33554433, null;
        case 5:
          if (Tu(e), n = e.type, t !== null && e.stateNode != null)
            t.memoizedProps !== a && tl(e);
          else {
            if (!a) {
              if (e.stateNode === null)
                throw Error(S(166));
              return lt(e), e.subtreeFlags &= -33554433, null;
            }
            if (i = Ke.current, Aa(e))
              Pr(e, i);
            else {
              var u = si(
                Ol.current
              );
              switch (i) {
                case 1:
                  i = u.createElementNS(
                    "http://www.w3.org/2000/svg",
                    n
                  );
                  break;
                case 2:
                  i = u.createElementNS(
                    "http://www.w3.org/1998/Math/MathML",
                    n
                  );
                  break;
                default:
                  switch (n) {
                    case "svg":
                      i = u.createElementNS(
                        "http://www.w3.org/2000/svg",
                        n
                      );
                      break;
                    case "math":
                      i = u.createElementNS(
                        "http://www.w3.org/1998/Math/MathML",
                        n
                      );
                      break;
                    case "script":
                      i = u.createElement("div"), i.innerHTML = "<script><\/script>", i = i.removeChild(
                        i.firstChild
                      );
                      break;
                    case "select":
                      i = typeof a.is == "string" ? u.createElement("select", {
                        is: a.is
                      }) : u.createElement("select"), a.multiple ? i.multiple = !0 : a.size && (i.size = a.size);
                      break;
                    default:
                      i = typeof a.is == "string" ? u.createElement(n, { is: a.is }) : u.createElement(n);
                  }
              }
              i[zt] = e, i[It] = a;
              t: for (u = e.child; u !== null; ) {
                if (u.tag === 5 || u.tag === 6)
                  i.appendChild(u.stateNode);
                else if (u.tag !== 4 && u.tag !== 27 && u.child !== null) {
                  u.child.return = u, u = u.child;
                  continue;
                }
                if (u === e) break t;
                for (; u.sibling === null; ) {
                  if (u.return === null || u.return === e)
                    break t;
                  u = u.return;
                }
                u.sibling.return = u.return, u = u.sibling;
              }
              e.stateNode = i;
              t: switch (Ut(i, n, a), n) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  a = !!a.autoFocus;
                  break t;
                case "img":
                  a = !0;
                  break t;
                default:
                  a = !1;
              }
              a && tl(e);
            }
          }
          return lt(e), e.subtreeFlags &= -33554433, co(
            e,
            e.type,
            t === null ? null : t.memoizedProps,
            e.pendingProps,
            l
          ), null;
        case 6:
          if (t && e.stateNode != null)
            t.memoizedProps !== a && tl(e);
          else {
            if (typeof a != "string" && e.stateNode === null)
              throw Error(S(166));
            if (t = Ol.current, Aa(e)) {
              if (t = e.stateNode, l = e.memoizedProps, a = null, n = _t, n !== null)
                switch (n.tag) {
                  case 27:
                  case 5:
                    a = n.memoizedProps;
                }
              t[zt] = e, t = !!(t.nodeValue === l || a !== null && a.suppressHydrationWarning === !0 || Lh(t.nodeValue, l)), t || ql(e, !0);
            } else
              t = si(t).createTextNode(
                a
              ), t[zt] = e, e.stateNode = t;
          }
          return lt(e), null;
        case 31:
          if (l = e.memoizedState, t === null || t.memoizedState !== null) {
            if (a = Aa(e), l !== null) {
              if (t === null) {
                if (!a) throw Error(S(318));
                if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(S(557));
                t[zt] = e;
              } else
                ca(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
              lt(e), t = !1;
            } else
              l = lo(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = l), t = !0;
            if (!t)
              return e.flags & 256 ? (ie(e), e) : (ie(e), null);
            if ((e.flags & 128) !== 0)
              throw Error(S(558));
          }
          return lt(e), null;
        case 13:
          if (a = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
            if (n = Aa(e), a !== null && a.dehydrated !== null) {
              if (t === null) {
                if (!n) throw Error(S(318));
                if (n = e.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(S(317));
                n[zt] = e;
              } else
                ca(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
              lt(e), n = !1;
            } else
              n = lo(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), n = !0;
            if (!n)
              return e.flags & 256 ? (ie(e), e) : (ie(e), null);
          }
          return ie(e), (e.flags & 128) !== 0 ? (e.lanes = l, e) : (l = a !== null, t = t !== null && t.memoizedState !== null, l && (a = e.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), i = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (i = a.memoizedState.cachePool.pool), i !== n && (a.flags |= 2048)), l !== t && l && (e.child.flags |= 8192), ki(e, e.updateQueue), lt(e), null);
        case 4:
          return tn(), t === null && Tf(e.stateNode.containerInfo), e.flags |= 67108864, lt(e), null;
        case 10:
          return nl(e.type), lt(e), null;
        case 19:
          if (Ws(e), a = e.memoizedState, a === null) return lt(e), null;
          if (n = (e.flags & 128) !== 0, i = a.rendering, i === null)
            if (n) zn(a, !1);
            else {
              if (st !== 0 || t !== null && (t.flags & 128) !== 0)
                for (t = e.child; t !== null; ) {
                  if (i = wu(t), i !== null) {
                    for (e.flags |= 128, zn(a, !1), t = i.updateQueue, e.updateQueue = t, ki(e, t), e.subtreeFlags = 0, t = l, l = e.child; l !== null; )
                      P0(l, t), l = l.sibling;
                    return ii(
                      e,
                      Rt.current & 1 | 2
                    ), G && el(e, a.treeForkCount), e.child;
                  }
                  t = t.sibling;
                }
              a.tail !== null && oe() > Xu && (e.flags |= 128, n = !0, zn(a, !1), e.lanes = 4194304);
            }
          else {
            if (!n)
              if (t = wu(i), t !== null) {
                if (e.flags |= 128, n = !0, t = t.updateQueue, e.updateQueue = t, ki(e, t), zn(a, !0), a.tail === null && a.tailMode !== "collapsed" && a.tailMode !== "visible" && !i.alternate && !G)
                  return lt(e), null;
              } else
                2 * oe() - a.renderingStartTime > Xu && l !== 536870912 && (e.flags |= 128, n = !0, zn(a, !1), e.lanes = 4194304);
            a.isBackwards ? (i.sibling = e.child, e.child = i) : (t = a.last, t !== null ? t.sibling = i : e.child = i, a.last = i);
          }
          if (a.tail !== null) {
            t = a.tail;
            t: {
              for (l = t; l !== null; ) {
                if (l.alternate !== null) {
                  l = !1;
                  break t;
                }
                l = l.sibling;
              }
              l = !0;
            }
            return a.rendering = t, a.tail = t.sibling, a.renderingStartTime = oe(), t.sibling = null, i = Rt.current, i = n ? i & 1 | 2 : i & 1, a.tailMode === "visible" || a.tailMode === "collapsed" || !l || G ? ii(e, i) : (l = i, nt(Bt, e), nt(Rt, l), Lt === null && (Lt = e)), G && el(e, a.treeForkCount), t;
          }
          return lt(e), null;
        case 22:
        case 23:
          return ie(e), $s(), a = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (e.flags |= 8192) : a && (e.flags |= 8192), a ? (l & 536870912) !== 0 && (e.flags & 128) === 0 && (lt(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : lt(e), l = e.updateQueue, l !== null && ki(e, l.retryQueue), l = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), a = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), a !== l && (e.flags |= 2048), t !== null && wt(na), null;
        case 24:
          return l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), nl(bt), lt(e), null;
        case 25:
          return null;
        case 30:
          return e.flags |= 33554432, lt(e), null;
      }
      throw Error(S(156, e.tag));
    }
    function iy(t, e) {
      switch (Zs(e), e.tag) {
        case 1:
          return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
        case 3:
          return nl(bt), tn(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
        case 26:
        case 27:
        case 5:
          return Tu(e), null;
        case 31:
          if (e.memoizedState !== null) {
            if (ie(e), e.alternate === null)
              throw Error(S(340));
            ca();
          }
          return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
        case 13:
          if (ie(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
            if (e.alternate === null)
              throw Error(S(340));
            ca();
          }
          return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
        case 19:
          return Ws(e), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, t = e.memoizedState, t !== null && (t.rendering = null, t.tail = null), e.flags |= 4, e) : null;
        case 4:
          return tn(), null;
        case 10:
          return nl(e.type), null;
        case 22:
        case 23:
          return ie(e), $s(), t !== null && wt(na), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
        case 24:
          return nl(bt), null;
        case 25:
          return null;
        default:
          return null;
      }
    }
    function Im(t, e) {
      switch (Zs(e), e.tag) {
        case 3:
          nl(bt), tn();
          break;
        case 26:
        case 27:
        case 5:
          Tu(e);
          break;
        case 4:
          tn();
          break;
        case 31:
          e.memoizedState !== null && ie(e);
          break;
        case 13:
          ie(e);
          break;
        case 19:
          Ws(e);
          break;
        case 10:
          nl(e.type);
          break;
        case 22:
        case 23:
          ie(e), $s(), t !== null && wt(na);
          break;
        case 24:
          nl(bt);
      }
    }
    function Ti(t, e) {
      try {
        var l = e.updateQueue, a = l !== null ? l.lastEffect : null;
        if (a !== null) {
          var n = a.next;
          l = n;
          do {
            if ((l.tag & t) === t) {
              a = void 0;
              var i = l.create, u = l.inst;
              a = i(), u.destroy = a;
            }
            l = l.next;
          } while (l !== n);
        }
      } catch (c) {
        $(e, e.return, c);
      }
    }
    function Xl(t, e, l) {
      try {
        var a = e.updateQueue, n = a !== null ? a.lastEffect : null;
        if (n !== null) {
          var i = n.next;
          a = i;
          do {
            if ((a.tag & t) === t) {
              var u = a.inst, c = u.destroy;
              if (c !== void 0) {
                u.destroy = void 0, n = e;
                var s = l, o = c;
                try {
                  o();
                } catch (r) {
                  $(
                    n,
                    s,
                    r
                  );
                }
              }
            }
            a = a.next;
          } while (a !== i);
        }
      } catch (r) {
        $(e, e.return, r);
      }
    }
    function Pm(t) {
      var e = t.updateQueue;
      if (e !== null) {
        var l = t.stateNode;
        try {
          sm(e, l);
        } catch (a) {
          $(t, t.return, a);
        }
      }
    }
    function th(t, e, l) {
      l.props = ma(
        t.type,
        t.memoizedProps
      ), l.state = t.memoizedState;
      try {
        l.componentWillUnmount();
      } catch (a) {
        $(t, e, a);
      }
    }
    function qe(t, e) {
      try {
        var l = t.ref;
        if (l !== null) {
          switch (t.tag) {
            case 26:
            case 27:
            case 5:
              var a = t.stateNode;
              break;
            case 30:
              var n = t.stateNode, i = ul(t.memoizedProps, n);
              (n.ref === null || n.ref.name !== i) && (n.ref = Qh(i)), a = n.ref;
              break;
            case 7:
              if (t.stateNode === null) {
                var u = new me(t);
                Wt(
                  t.child,
                  !1,
                  ky,
                  u,
                  void 0,
                  void 0
                ), t.stateNode = u;
              }
              a = t.stateNode;
              break;
            default:
              a = t.stateNode;
          }
          typeof l == "function" ? t.refCleanup = l(a) : l.current = a;
        }
      } catch (c) {
        $(t, e, c);
      }
    }
    function Ot(t, e) {
      var l = t.ref, a = t.refCleanup;
      if (l !== null)
        if (typeof a == "function")
          try {
            a();
          } catch (n) {
            $(t, e, n);
          } finally {
            t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
          }
        else if (typeof l == "function")
          try {
            l(null);
          } catch (n) {
            $(t, e, n);
          }
        else l.current = null;
    }
    function Gu(t, e) {
      if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && t.alternate === null && e !== null)
        for (var l = 0; l < e.length; l++)
          Jh(
            t.stateNode,
            e[l]
          );
    }
    function Ad(t) {
      for (var e = t.return; e !== null && (bf(e) && Jh(t.stateNode, e.stateNode), !hf(e)); )
        e = e.return;
    }
    function Jn(t) {
      for (var e = t.return; e !== null && (bf(e) && Jy(t.stateNode, e.stateNode), !hf(e)); )
        e = e.return;
    }
    function hf(t) {
      return t.tag === 5 || t.tag === 3 || t.tag === 27;
    }
    function bf(t) {
      return t && t.tag === 7 && t.stateNode !== null;
    }
    function as(t) {
      var e = t.type, l = t.memoizedProps, a = t.stateNode;
      try {
        t: switch (e) {
          case "button":
          case "input":
          case "select":
          case "textarea":
            l.autoFocus && a.focus();
            break t;
          case "img":
            l.src ? a.src = l.src : l.srcSet && (a.srcset = l.srcSet);
        }
      } catch (n) {
        $(t, t.return, n);
      }
    }
    function oo(t, e, l) {
      try {
        var a = t.stateNode;
        Oy(a, t.type, l, e), a[It] = e;
      } catch (n) {
        $(t, t.return, n);
      }
    }
    function eh(t) {
      return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Zl(t.type) || t.tag === 4;
    }
    function so(t) {
      t: for (; ; ) {
        for (; t.sibling === null; ) {
          if (t.return === null || eh(t.return)) return null;
          t = t.return;
        }
        for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
          if (t.tag === 27 && Zl(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
          t.child.return = t, t = t.child;
        }
        if (!(t.flags & 2)) return t.stateNode;
      }
    }
    function ns(t, e, l, a) {
      var n = t.tag;
      if (n === 5 || n === 6)
        n = t.stateNode, e ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(n, e) : (e = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, e.appendChild(n), l = l._reactRootContainer, l != null || e.onclick !== null || (e.onclick = Ve)), Gu(t, a), j = !0;
      else if (n !== 4 && (n === 27 && (Gu(t, a), a = null, Zl(t.type) && (l = t.stateNode, e = null)), t = t.child, t !== null))
        for (ns(
          t,
          e,
          l,
          a
        ), t = t.sibling; t !== null; )
          ns(
            t,
            e,
            l,
            a
          ), t = t.sibling;
    }
    function Lu(t, e, l, a) {
      var n = t.tag;
      if (n === 5 || n === 6)
        n = t.stateNode, e ? l.insertBefore(n, e) : l.appendChild(n), Gu(t, a), j = !0;
      else if (n !== 4 && (n === 27 && (Gu(t, a), a = null, Zl(t.type) && (l = t.stateNode)), t = t.child, t !== null))
        for (Lu(
          t,
          e,
          l,
          a
        ), t = t.sibling; t !== null; )
          Lu(
            t,
            e,
            l,
            a
          ), t = t.sibling;
    }
    function lh(t) {
      var e = t.stateNode, l = t.memoizedProps;
      try {
        for (var a = t.type, n = e.attributes; n.length; )
          e.removeAttributeNode(n[0]);
        Ut(e, a, l), e[zt] = t, e[It] = l;
      } catch (i) {
        $(t, t.return, i);
      }
    }
    var Yu = !1, ue = null;
    function Cd(t) {
      (t.tag === 30 || (t.subtreeFlags & 33554432) !== 0) && (Yu = !0);
    }
    var je = null;
    function Od() {
      var t = je;
      return je = null, t;
    }
    var Jt = 0;
    function yn(t, e, l, a, n) {
      return Jt = 0, ah(
        t.child,
        e,
        l,
        a,
        n
      );
    }
    function ah(t, e, l, a, n) {
      for (var i = !1; t !== null; ) {
        if (t.tag === 5) {
          var u = t.stateNode;
          if (a !== null) {
            var c = Ms(u);
            a.push(c), c.view && (i = !0);
          } else
            i || Ms(u).view && (i = !0);
          Yu = !0, jh(
            u,
            Jt === 0 ? e : e + "_" + Jt,
            l
          ), Jt++;
        } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && n || ah(
          t.child,
          e,
          l,
          a,
          n
        ) && (i = !0));
        t = t.sibling;
      }
      return i;
    }
    function Je(t, e) {
      for (; t !== null; )
        t.tag === 5 ? Xh(t.stateNode, t.memoizedProps) : (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && e || Je(
          t.child,
          e
        )), t = t.sibling;
    }
    function ru(t) {
      if ((t.subtreeFlags & 18874368) !== 0)
        for (t = t.child; t !== null; ) {
          if ((t.tag !== 22 || t.memoizedState === null) && (ru(t), t.tag === 30 && (t.flags & 18874368) !== 0 && t.stateNode.paired)) {
            var e = t.memoizedProps;
            if (e.name == null || e.name === "auto")
              throw Error(S(544));
            var l = e.name;
            e = dl(e.default, e.share), e !== "none" && (yn(
              t,
              l,
              e,
              null,
              !1
            ) || Je(t.child, !1));
          }
          t = t.sibling;
        }
    }
    function is(t, e) {
      if (t.tag === 30) {
        var l = t.stateNode, a = t.memoizedProps, n = ul(a, l), i = dl(
          a.default,
          l.paired ? a.share : a.enter
        );
        i !== "none" ? yn(t, n, i, null, !1) ? (ru(t), l.paired || e || un(t, a.onEnter)) : Je(t.child, !1) : ru(t);
      } else if ((t.subtreeFlags & 33554432) !== 0)
        for (t = t.child; t !== null; )
          is(t, e), t = t.sibling;
      else ru(t);
    }
    function us(t) {
      if (ue !== null && ue.size !== 0) {
        var e = ue;
        if ((t.subtreeFlags & 18874368) !== 0)
          for (t = t.child; t !== null; ) {
            if (t.tag !== 22 || t.memoizedState === null) {
              if (t.tag === 30 && (t.flags & 18874368) !== 0) {
                var l = t.memoizedProps, a = l.name;
                if (a != null && a !== "auto") {
                  var n = e.get(a);
                  if (n !== void 0) {
                    var i = dl(
                      l.default,
                      l.share
                    );
                    if (i !== "none" && (yn(
                      t,
                      a,
                      i,
                      null,
                      !1
                    ) ? (i = t.stateNode, n.paired = i, i.paired = n, un(t, l.onShare)) : Je(t.child, !1)), e.delete(a), e.size === 0) break;
                  }
                }
              }
              us(t);
            }
            t = t.sibling;
          }
      }
    }
    function cs(t) {
      if (t.tag === 30) {
        var e = t.memoizedProps, l = ul(e, t.stateNode), a = ue !== null ? ue.get(l) : void 0, n = dl(
          e.default,
          a !== void 0 ? e.share : e.exit
        );
        n !== "none" && (yn(t, l, n, null, !1) ? a !== void 0 ? (n = t.stateNode, a.paired = n, n.paired = a, ue.delete(l), un(t, e.onShare)) : un(t, e.onExit) : Je(t.child, !1)), ue !== null && us(t);
      } else if ((t.subtreeFlags & 33554432) !== 0)
        for (t = t.child; t !== null; )
          cs(t), t = t.sibling;
      else
        ue !== null && us(t);
    }
    function nh(t) {
      for (t = t.child; t !== null; ) {
        if (t.tag === 30) {
          var e = t.memoizedProps, l = ul(e, t.stateNode);
          e = dl(e.default, e.update), t.flags &= -5, e !== "none" && yn(
            t,
            l,
            e,
            t.memoizedState = [],
            !1
          );
        } else
          (t.subtreeFlags & 33554432) !== 0 && nh(t);
        t = t.sibling;
      }
    }
    function os(t) {
      if ((t.subtreeFlags & 18874368) !== 0)
        for (t = t.child; t !== null; ) {
          if (t.tag !== 22 || t.memoizedState === null) {
            if (t.tag === 30 && (t.flags & 18874368) !== 0) {
              var e = t.stateNode;
              e.paired !== null && (e.paired = null, Je(t.child, !1));
            }
            os(t);
          }
          t = t.sibling;
        }
    }
    function du(t) {
      if (t.tag === 30)
        t.stateNode.paired = null, Je(t.child, !1), os(t);
      else if ((t.subtreeFlags & 33554432) !== 0)
        for (t = t.child; t !== null; )
          du(t), t = t.sibling;
      else os(t);
    }
    function ih(t) {
      for (t = t.child; t !== null; )
        t.tag === 30 ? Je(t.child, !1) : (t.subtreeFlags & 33554432) !== 0 && ih(t), t = t.sibling;
    }
    function vf(t, e, l, a, n, i, u) {
      for (var c = !1; e !== null; ) {
        if (e.tag === 5) {
          var s = e.stateNode;
          if (i !== null && Jt < i.length) {
            var o = i[Jt], r = Ms(s);
            (o.view || r.view) && (c = !0);
            var b;
            if (b = (t.flags & 4) === 0)
              if (r.clip) b = !0;
              else {
                b = o.rect;
                var d = r.rect;
                b = b.y !== d.y || b.x !== d.x || b.height !== d.height || b.width !== d.width;
              }
            b && (t.flags |= 4), r.abs ? r = !o.abs : (o = o.rect, r = r.rect, r = o.height !== r.height || o.width !== r.width), r && (t.flags |= 32);
          } else t.flags |= 32;
          (t.flags & 4) !== 0 && jh(
            s,
            Jt === 0 ? l : l + "_" + Jt,
            n
          ), c && (t.flags & 4) !== 0 || (je === null && (je = []), je.push(
            s,
            Jt === 0 ? a : a + "_" + Jt,
            e.memoizedProps
          )), Jt++;
        } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && u ? t.flags |= e.flags & 32 : vf(
          t,
          e.child,
          l,
          a,
          n,
          i,
          u
        ) && (c = !0));
        e = e.sibling;
      }
      return c;
    }
    function uh(t, e) {
      for (t = t.child; t !== null; ) {
        if (t.tag === 30) {
          var l = t.memoizedProps, a = t.stateNode, n = ul(l, a), i = dl(l.default, l.update);
          if (e) {
            a = a.clones;
            var u = a === null ? null : a.map(By);
          } else
            u = t.memoizedState, t.memoizedState = null;
          a = t;
          var c = t.child;
          Jt = 0, n = vf(
            a,
            c,
            n,
            n,
            i,
            u,
            !1
          ), (t.flags & 4) !== 0 && n && (e || un(t, l.onUpdate));
        } else
          (t.subtreeFlags & 33554432) !== 0 && uh(t, e);
        t = t.sibling;
      }
    }
    var Tt = !1, k = !1, Ge = !1, fo = !1, zd = typeof WeakSet == "function" ? WeakSet : Set, Nt = null, Le = !1, Ln = !1, qu = !1, ss = !1;
    function uy(t, e, l) {
      if (t = t.containerInfo, Ss = dn, t = Z0(t), js(t)) {
        if ("selectionStart" in t)
          var a = {
            start: t.selectionStart,
            end: t.selectionEnd
          };
        else
          t: {
            a = (a = t.ownerDocument) && a.defaultView || window;
            var n = a.getSelection && a.getSelection();
            if (n && n.rangeCount !== 0) {
              a = n.anchorNode;
              var i = n.anchorOffset, u = n.focusNode;
              n = n.focusOffset;
              try {
                a.nodeType, u.nodeType;
              } catch {
                a = null;
                break t;
              }
              var c = 0, s = -1, o = -1, r = 0, b = 0, d = t, m = null;
              e: for (; ; ) {
                for (var y; d !== a || i !== 0 && d.nodeType !== 3 || (s = c + i), d !== u || n !== 0 && d.nodeType !== 3 || (o = c + n), d.nodeType === 3 && (c += d.nodeValue.length), (y = d.firstChild) !== null; )
                  m = d, d = y;
                for (; ; ) {
                  if (d === t) break e;
                  if (m === a && ++r === i && (s = c), m === u && ++b === n && (o = c), (y = d.nextSibling) !== null) break;
                  d = m, m = d.parentNode;
                }
                d = y;
              }
              a = s === -1 || o === -1 ? null : { start: s, end: o };
            } else a = null;
          }
        a = a || { start: 0, end: 0 };
      } else a = null;
      for (Ts = { focusedElem: t, selectionRange: a }, dn = !1, l = (l & 335544064) === l, Nt = e, e = l ? 9270 : 1024; Nt !== null; ) {
        if (t = Nt, l && (a = t.deletions, a !== null))
          for (i = 0; i < a.length; i++)
            l && cs(a[i]);
        if (t.alternate === null && (t.flags & 2) !== 0)
          l && Cd(t), Ji(l);
        else {
          if (t.tag === 22) {
            if (a = t.alternate, t.memoizedState !== null) {
              a !== null && a.memoizedState === null && l && cs(a), Ji(l);
              continue;
            } else if (a !== null && a.memoizedState !== null) {
              l && Cd(t), Ji(l);
              continue;
            }
          }
          a = t.child, (t.subtreeFlags & e) !== 0 && a !== null ? (a.return = t, Nt = a) : (l && nh(t), Ji(l));
        }
      }
      ue = null;
    }
    function Ji(t) {
      for (; Nt !== null; ) {
        var e = Nt, l = t, a = e.alternate, n = e.flags;
        switch (e.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if ((n & 1024) !== 0 && a !== null) {
              l = void 0, n = a.memoizedProps, a = a.memoizedState;
              var i = e.stateNode;
              try {
                var u = ma(
                  e.type,
                  n
                );
                l = i.getSnapshotBeforeUpdate(
                  u,
                  a
                ), i.__reactInternalSnapshotBeforeUpdate = l;
              } catch (c) {
                $(e, e.return, c);
              }
            }
            break;
          case 3:
            if ((n & 1024) !== 0) {
              if (a = e.stateNode.containerInfo, l = a.nodeType, l === 9)
                _s(a);
              else if (l === 1)
                switch (a.nodeName) {
                  case "HEAD":
                  case "HTML":
                  case "BODY":
                    _s(a);
                    break;
                  default:
                    a.textContent = "";
                }
            }
            break;
          case 5:
          case 26:
          case 27:
          case 6:
          case 4:
          case 17:
            break;
          case 30:
            l && a !== null && (l = ul(
              a.memoizedProps,
              a.stateNode
            ), n = e.memoizedProps, n = dl(n.default, n.update), n !== "none" && yn(
              a,
              l,
              n,
              a.memoizedState = [],
              !0
            ));
            break;
          default:
            if ((n & 1024) !== 0) throw Error(S(163));
        }
        if (a = e.sibling, a !== null) {
          a.return = e.return, Nt = a;
          break;
        }
        Nt = e.return;
      }
    }
    function ch(t, e, l) {
      var a = l.flags;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          Ye(t, l), a & 4 && Ti(5, l);
          break;
        case 1:
          if (Ye(t, l), a & 4)
            if (t = l.stateNode, e === null)
              try {
                t.componentDidMount();
              } catch (u) {
                $(l, l.return, u);
              }
            else {
              var n = ma(
                l.type,
                e.memoizedProps
              );
              e = e.memoizedState;
              try {
                t.componentDidUpdate(
                  n,
                  e,
                  t.__reactInternalSnapshotBeforeUpdate
                );
              } catch (u) {
                $(
                  l,
                  l.return,
                  u
                );
              }
            }
          a & 64 && Pm(l), a & 512 && qe(l, l.return);
          break;
        case 3:
          if (Ye(t, l), a & 64 && (t = l.updateQueue, t !== null)) {
            if (e = null, l.child !== null)
              switch (l.child.tag) {
                case 27:
                case 5:
                  e = l.child.stateNode;
                  break;
                case 1:
                  e = l.child.stateNode;
              }
            try {
              sm(t, e);
            } catch (u) {
              $(l, l.return, u);
            }
          }
          break;
        case 27:
          e === null && a & 4 && lh(l);
        case 26:
        case 5:
          Ye(t, l), e === null && a & 4 && as(l), a & 512 && qe(l, l.return);
          break;
        case 12:
          Ye(t, l);
          break;
        case 31:
          Ye(t, l), a & 4 && rh(t, l);
          break;
        case 13:
          Ye(t, l), a & 4 && dh(t, l), a & 64 && (t = l.memoizedState, t !== null && (t = t.dehydrated, t !== null && (l = gy.bind(
            null,
            l
          ), Wy(t, l))));
          break;
        case 22:
          if (a = l.memoizedState !== null || Tt, !a) {
            var i = e !== null && e.memoizedState !== null || k;
            e = Tt, n = k, Tt = a, (k = i) && !n ? (a = 2, (l.subtreeFlags & 8772) !== 0 && (a |= 1), Ce(
              t,
              l,
              a
            )) : Ye(t, l), Tt = e, k = n;
          }
          break;
        case 30:
          Ye(t, l), a & 512 && qe(l, l.return);
          break;
        case 7:
          a & 512 && qe(l, l.return);
        default:
          Ye(t, l);
      }
    }
    function fs(t, e) {
      for (t = t.child; t !== null; )
        oh(t, e), t = t.sibling;
    }
    function oh(t, e) {
      switch (t.tag) {
        case 5:
        case 26:
          try {
            var l = t.stateNode;
            if (e) {
              var a = l.style;
              typeof a.setProperty == "function" ? a.setProperty("display", "none", "important") : a.display = "none";
            } else {
              var n = t.stateNode, i = t.memoizedProps.style, u = i != null && i.hasOwnProperty("display") ? i.display : null;
              n.style.display = u == null || typeof u == "boolean" ? "" : ("" + u).trim();
            }
          } catch (s) {
            $(t, t.return, s);
          }
          rs(t, e);
          break;
        case 6:
          try {
            t.stateNode.nodeValue = e ? "" : t.memoizedProps, j = !0;
          } catch (s) {
            $(t, t.return, s);
          }
          break;
        case 18:
          try {
            var c = t.stateNode;
            e ? Kd(c, !0) : Kd(t.stateNode, !1);
          } catch (s) {
            $(t, t.return, s);
          }
          break;
        case 22:
        case 23:
          t.memoizedState === null && fs(t, e);
          break;
        default:
          fs(t, e);
      }
    }
    function rs(t, e) {
      if (t.subtreeFlags & 67108864)
        for (t = t.child; t !== null; ) {
          t: {
            var l = t, a = e;
            switch (l.tag) {
              case 4:
                oh(l, a);
                break t;
              case 22:
                l.memoizedState === null && rs(l, a);
                break t;
              default:
                rs(l, a);
            }
          }
          t = t.sibling;
        }
    }
    function sh(t) {
      var e = t.alternate;
      e !== null && (t.alternate = null, sh(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && $u(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
    }
    var ut = null, Kt = !1;
    function Ae(t, e, l) {
      for (l = l.child; l !== null; )
        fh(t, e, l), l = l.sibling;
    }
    function fh(t, e, l) {
      if (se && typeof se.onCommitFiberUnmount == "function")
        try {
          se.onCommitFiberUnmount(bi, l);
        } catch {
        }
      switch (l.tag) {
        case 26:
          k || Ot(l, e), Ae(
            t,
            e,
            l
          ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && !k && (l = l.stateNode, l.parentNode.removeChild(l));
          break;
        case 27:
          k || Ot(l, e), Jn(l);
          var a = ut, n = Kt;
          Zl(l.type) && (ut = l.stateNode, Kt = !1), Ae(
            t,
            e,
            l
          ), Wh(
            l.stateNode,
            l.type,
            l.memoizedProps
          ), ut = a, Kt = n;
          break;
        case 5:
          k || Ot(l, e), Jn(l);
        case 6:
          if (l.tag === 6 && Jn(l), a = ut, n = Kt, ut = null, Ae(
            t,
            e,
            l
          ), ut = a, Kt = n, ut !== null)
            if (Kt)
              try {
                (ut.nodeType === 9 ? ut.body : ut.nodeName === "HTML" ? ut.ownerDocument.body : ut).removeChild(l.stateNode), j = !0;
              } catch (i) {
                $(
                  l,
                  e,
                  i
                );
              }
            else
              try {
                ut.removeChild(l.stateNode), j = !0;
              } catch (i) {
                $(
                  l,
                  e,
                  i
                );
              }
          break;
        case 18:
          ut !== null && (Kt ? (t = ut, Zd(
            t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
            l.stateNode
          ), mn(t)) : Zd(ut, l.stateNode));
          break;
        case 4:
          a = ut, n = Kt, ut = l.stateNode.containerInfo, Kt = !0, Ae(
            t,
            e,
            l
          ), ut = a, Kt = n;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          Xl(2, l, e), k || Xl(4, l, e), Ae(
            t,
            e,
            l
          );
          break;
        case 1:
          k || (Ot(l, e), a = l.stateNode, typeof a.componentWillUnmount == "function" && th(
            l,
            e,
            a
          )), Ae(
            t,
            e,
            l
          );
          break;
        case 21:
          Ae(
            t,
            e,
            l
          );
          break;
        case 22:
          k = (a = k) || l.memoizedState !== null, Ae(
            t,
            e,
            l
          ), k = a;
          break;
        case 30:
          Ot(l, e), Ae(
            t,
            e,
            l
          );
          break;
        case 7:
          k || Ot(l, e), Ae(
            t,
            e,
            l
          );
          break;
        default:
          Ae(
            t,
            e,
            l
          );
      }
    }
    function rh(t, e) {
      if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null))) {
        t = t.dehydrated;
        try {
          mn(t);
        } catch (l) {
          $(e, e.return, l);
        }
      }
    }
    function dh(t, e) {
      if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
        try {
          mn(t);
        } catch (l) {
          $(e, e.return, l);
        }
    }
    function cy(t) {
      switch (t.tag) {
        case 31:
        case 13:
        case 19:
          var e = t.stateNode;
          return e === null && (e = t.stateNode = new zd()), e;
        case 22:
          return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new zd()), e;
        default:
          throw Error(S(435, t.tag));
      }
    }
    function Fi(t, e) {
      var l = cy(t);
      e.forEach(function(a) {
        if (!l.has(a)) {
          l.add(a);
          var n = py.bind(null, t, a);
          a.then(n, n);
        }
      });
    }
    function Xt(t, e, l) {
      var a = e.deletions;
      if (a !== null)
        for (var n = 0; n < a.length; n++) {
          var i = a[n], u = t, c = e, s = c;
          t: for (; s !== null; ) {
            switch (s.tag) {
              case 27:
                if (Zl(s.type)) {
                  ut = s.stateNode, Kt = !1;
                  break t;
                }
                break;
              case 5:
                ut = s.stateNode, Kt = !1;
                break t;
              case 3:
              case 4:
                ut = s.stateNode.containerInfo, Kt = !0;
                break t;
            }
            s = s.return;
          }
          if (ut === null) throw Error(S(160));
          fh(u, c, i), ut = null, Kt = !1, u = i.alternate, u !== null && (u.return = null), i.return = null;
        }
      if (e.subtreeFlags & 13886)
        for (e = e.child; e !== null; )
          mh(e, t, l), e = e.sibling;
    }
    var Oe = null;
    function mh(t, e, l) {
      var a = t.alternate, n = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          if (n & 4 && (a = t.updateQueue, a = a !== null ? a.events : null, a !== null))
            for (var i = 0; i < a.length; i++) {
              var u = a[i];
              u.ref.impl = u.nextImpl;
            }
          Xt(e, t, l), Vt(t), n & 4 && (Xl(3, t, t.return), Ti(3, t), Xl(5, t, t.return));
          break;
        case 1:
          Xt(e, t, l), Vt(t), n & 512 && (k || a === null || Ot(a, a.return)), n & 64 && Tt && (t = t.updateQueue, t !== null && (e = t.callbacks, e !== null && (l = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = l === null ? e : l.concat(e))));
          break;
        case 26:
          if (i = Oe, Xt(e, t, l), Vt(t), n & 512 && (k || a === null || Ot(a, a.return)), n & 4)
            if (n = a !== null ? a.memoizedState : null, l = t.memoizedState, a === null)
              if (l === null)
                if (t.stateNode === null)
                  if (Tt)
                    t.stateNode = qh(
                      t.type,
                      t.memoizedProps,
                      e.containerInfo,
                      t
                    );
                  else {
                    t: {
                      e = t.type, l = t.memoizedProps, n = i.ownerDocument || i;
                      e: switch (e) {
                        case "title":
                          a = n.getElementsByTagName("title")[0], (!a || a[gi] || a[zt] || a.namespaceURI === "http://www.w3.org/2000/svg" || a.hasAttribute("itemprop")) && (a = n.createElement(e), n.head.insertBefore(
                            a,
                            n.querySelector("head > title")
                          )), Ut(a, e, l), a[zt] = t, Mt(a), e = a;
                          break t;
                        case "link":
                          if (i = t0(
                            "link",
                            "href",
                            n
                          ).get(e + (l.href || ""))) {
                            for (u = 0; u < i.length; u++)
                              if (a = i[u], a.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && a.getAttribute("rel") === (l.rel == null ? null : l.rel) && a.getAttribute("title") === (l.title == null ? null : l.title) && a.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                                i.splice(u, 1);
                                break e;
                              }
                          }
                          a = n.createElement(e), Ut(a, e, l), n.head.appendChild(a);
                          break;
                        case "meta":
                          if (i = t0(
                            "meta",
                            "content",
                            n
                          ).get(e + (l.content || ""))) {
                            for (u = 0; u < i.length; u++)
                              if (a = i[u], a.getAttribute("content") === (l.content == null ? null : "" + l.content) && a.getAttribute("name") === (l.name == null ? null : l.name) && a.getAttribute("property") === (l.property == null ? null : l.property) && a.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && a.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                                i.splice(u, 1);
                                break e;
                              }
                          }
                          a = n.createElement(e), Ut(a, e, l), n.head.appendChild(a);
                          break;
                        default:
                          throw Error(S(468, e));
                      }
                      a[zt] = t, Mt(a), e = a;
                    }
                    t.stateNode = e;
                  }
                else
                  Tt || Cs(i, t.type, t.stateNode);
              else
                t.stateNode = Pd(
                  i,
                  l,
                  t.memoizedProps
                );
            else
              n !== l ? (n === null ? (e = a.stateNode, e === null || k || e.parentNode.removeChild(e)) : n.count--, l === null ? Tt || Cs(i, t.type, t.stateNode) : Pd(i, l, t.memoizedProps)) : l === null && t.stateNode !== null && oo(
                t,
                t.memoizedProps,
                a.memoizedProps
              );
          break;
        case 27:
          Xt(e, t, l), Vt(t), n & 512 && (k || a === null || Ot(a, a.return)), a !== null && n & 4 && oo(
            t,
            t.memoizedProps,
            a.memoizedProps
          );
          break;
        case 5:
          if (i = Ge, Ge = !1, Xt(e, t, l), Ge = i, Vt(t), n & 512 && (k || a === null || Ot(a, a.return)), t.flags & 32) {
            e = t.stateNode;
            try {
              ln(e, ""), j = !0;
            } catch (r) {
              $(t, t.return, r);
            }
          }
          n & 4 && t.stateNode != null && (e = t.memoizedProps, oo(
            t,
            e,
            a !== null ? a.memoizedProps : e
          )), n & 1024 && (fo = !0);
          break;
        case 6:
          if (Xt(e, t, l), Vt(t), n & 4) {
            if (t.stateNode === null)
              throw Error(S(162));
            e = t.memoizedProps, l = t.stateNode;
            try {
              l.nodeValue = e, j = !0;
            } catch (r) {
              $(t, t.return, r);
            }
          }
          break;
        case 3:
          if (j = !1, vu = null, i = Oe, Oe = fi(e.containerInfo), Xt(e, t, l), Oe = i, Vt(t), n & 4 && a !== null && a.memoizedState.isDehydrated)
            try {
              mn(e.containerInfo);
            } catch (r) {
              $(t, t.return, r);
            }
          fo && (fo = !1, hh(t)), j = !1;
          break;
        case 4:
          n = Ge, Ge = Tt, a = Hr(), i = Oe, Oe = fi(
            t.stateNode.containerInfo
          ), Xt(e, t, l), Vt(t), Oe = i, j && Ln && (qu = !0), j = a, Ge = n;
          break;
        case 12:
          Xt(e, t, l), Vt(t);
          break;
        case 31:
          Xt(e, t, l), Vt(t), n & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, Fi(t, e)));
          break;
        case 13:
          Xt(e, t, l), Vt(t), t.child.flags & 8192 && t.memoizedState !== null != (a !== null && a.memoizedState !== null) && (sc = oe()), n & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, Fi(t, e)));
          break;
        case 22:
          i = t.memoizedState !== null, u = a !== null && a.memoizedState !== null;
          var c = Tt, s = k, o = Ge;
          Tt = c || i, Ge = o || i, k = s || u, Xt(e, t, l), k = s, Ge = o, Tt = c, Vt(t), n & 8192 && (e = t.stateNode, e._visibility = i ? e._visibility & -2 : e._visibility | 1, !i || a === null || u || Tt || k || (e = u || k, l = Tt, a = k, Tt = i || Tt, k = e, pl(t, 2), Tt = l, k = a), !i && Ge || fs(t, i)), n & 4 && (e = t.updateQueue, e !== null && (l = e.retryQueue, l !== null && (e.retryQueue = null, Fi(t, l))));
          break;
        case 19:
          Xt(e, t, l), Vt(t), n & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, Fi(t, e)));
          break;
        case 30:
          n & 512 && (k || a === null || Ot(a, a.return)), n = Hr(), i = Ln, u = (l & 335544064) === l, c = t.memoizedProps, Ln = u && dl(
            c.default,
            c.update
          ) !== "none", Xt(e, t, l), Vt(t), u && a !== null && j && (t.flags |= 4), Ln = i, j = n;
          break;
        case 21:
          break;
        case 7:
          n & 512 && (k || a === null || Ot(a, a.return)), a && a.stateNode !== null && (a.stateNode._fragmentFiber = t);
        default:
          Xt(e, t, l), Vt(t);
      }
    }
    function Vt(t) {
      var e = t.flags;
      if (e & 2) {
        try {
          for (var l, a = t.return; a !== null; ) {
            if (eh(a)) {
              l = a;
              break;
            }
            a = a.return;
          }
          a = null;
          for (var n = t.return; n !== null; ) {
            if (bf(n)) {
              var i = n.stateNode;
              a === null ? a = [i] : a.push(i);
            }
            if (hf(n)) break;
            n = n.return;
          }
          var u = a;
          if (l == null) throw Error(S(160));
          switch (l.tag) {
            case 27:
              var c = l.stateNode, s = so(t);
              Lu(
                t,
                s,
                c,
                u
              );
              break;
            case 5:
              var o = l.stateNode;
              l.flags & 32 && (ln(o, ""), l.flags &= -33);
              var r = so(t);
              Lu(
                t,
                r,
                o,
                u
              );
              break;
            case 3:
            case 4:
              var b = l.stateNode.containerInfo, d = so(t);
              ns(
                t,
                d,
                b,
                u
              );
              break;
            default:
              throw Error(S(161));
          }
        } catch (m) {
          $(t, t.return, m);
        }
        t.flags &= -3;
      }
      e & 4096 && (t.flags &= -4097);
    }
    function hh(t) {
      if (t.subtreeFlags & 1024)
        for (t = t.child; t !== null; ) {
          var e = t;
          hh(e), e.tag === 5 && e.flags & 1024 && (e = e.stateNode, dn = !0, e.reset(), dn = !1), t = t.sibling;
        }
    }
    function Ca(t, e) {
      if (e.subtreeFlags & 9270)
        for (e = e.child; e !== null; )
          bh(e, t), e = e.sibling;
      else uh(e, !1);
    }
    function bh(t, e) {
      var l = t.alternate;
      if (l === null) is(t, !1);
      else
        switch (t.tag) {
          case 3:
            if (ss = Le = !1, Od(), Ca(e, t), !Le && !qu) {
              if (t = je, t !== null)
                for (var a = 0; a < t.length; a += 3) {
                  l = t[a];
                  var n = t[a + 1];
                  Xh(l, t[a + 2]), l = l.ownerDocument.documentElement, l !== null && l.animate(
                    { opacity: [0, 0], pointerEvents: ["none", "none"] },
                    {
                      duration: 0,
                      fill: "forwards",
                      pseudoElement: "::view-transition-group(" + n + ")"
                    }
                  );
                }
              t = e.containerInfo, t = t.nodeType === 9 ? t.documentElement : t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "" && (t.style.viewTransitionName = "none", t.animate(
                { opacity: [0, 0], pointerEvents: ["none", "none"] },
                {
                  duration: 0,
                  fill: "forwards",
                  pseudoElement: "::view-transition-group(root)"
                }
              ), t.animate(
                { width: [0, 0], height: [0, 0] },
                {
                  duration: 0,
                  fill: "forwards",
                  pseudoElement: "::view-transition"
                }
              )), ss = !0;
            }
            je = null;
            break;
          case 5:
            Ca(e, t);
            break;
          case 4:
            a = Le, Le = !1, Ca(e, t), Le && (qu = !0), Le = a;
            break;
          case 22:
            t.memoizedState === null && (l.memoizedState !== null ? is(t, !1) : Ca(e, t));
            break;
          case 30:
            a = Le, n = Od(), Le = !1, Ca(e, t), Le && (t.flags |= 4);
            var i = t.memoizedProps, u = t.stateNode;
            e = ul(i, u), u = ul(l.memoizedProps, u);
            var c = dl(i.default, i.update);
            c === "none" ? e = !1 : (i = l.memoizedState, l.memoizedState = null, l = t.child, Jt = 0, e = vf(
              t,
              l,
              e,
              u,
              c,
              i,
              !0
            ), Jt !== (i === null ? 0 : i.length) && (t.flags |= 32)), (t.flags & 4) !== 0 && e ? (un(
              t,
              t.memoizedProps.onUpdate
            ), je = n) : n !== null && (n.push.apply(n, je), je = n), Le = (t.flags & 32) !== 0 ? !0 : a;
            break;
          default:
            Ca(e, t);
        }
    }
    function Ye(t, e) {
      if (e.subtreeFlags & 8772)
        for (e = e.child; e !== null; )
          ch(t, e.alternate, e), e = e.sibling;
    }
    function pl(t, e) {
      for (t = t.child; t !== null; ) {
        var l = t, a = e;
        switch (l.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            Xl(4, l, l.return), pl(
              l,
              a
            );
            break;
          case 1:
            Ot(l, l.return);
            var n = l.stateNode;
            typeof n.componentWillUnmount == "function" && th(
              l,
              l.return,
              n
            ), pl(
              l,
              a
            );
            break;
          case 27:
            (a & 2) !== 0 && Wh(
              l.stateNode,
              l.type,
              l.memoizedProps
            );
          case 5:
            Ot(l, l.return), l.tag !== 5 && l.tag !== 27 || Jn(l), pl(
              l,
              a
            );
            break;
          case 6:
            Jn(l);
            break;
          case 26:
            Ot(l, l.return), n = l.stateNode, l.memoizedState !== null || n === null || k || n.parentNode.removeChild(n), pl(
              l,
              a
            );
            break;
          case 22:
            l.memoizedState === null && pl(
              l,
              a
            );
            break;
          case 30:
            Ot(l, l.return), pl(
              l,
              a
            );
            break;
          case 7:
            Ot(l, l.return);
          default:
            pl(
              l,
              a
            );
        }
        t = t.sibling;
      }
    }
    function Ce(t, e, l) {
      for (l = (e.subtreeFlags & 8772) !== 0 ? l : l & -2, e = e.child; e !== null; ) {
        var a = e.alternate, n = t, i = e, u = i.flags, c = (l & 1) !== 0;
        switch (i.tag) {
          case 0:
          case 11:
          case 15:
            Ce(
              n,
              i,
              l
            ), Ti(4, i);
            break;
          case 1:
            if (Ce(
              n,
              i,
              l
            ), a = i, n = a.stateNode, typeof n.componentDidMount == "function")
              try {
                n.componentDidMount();
              } catch (r) {
                $(a, a.return, r);
              }
            if (a = i, n = a.updateQueue, n !== null) {
              var s = a.stateNode;
              try {
                var o = n.shared.hiddenCallbacks;
                if (o !== null)
                  for (n.shared.hiddenCallbacks = null, n = 0; n < o.length; n++)
                    om(o[n], s);
              } catch (r) {
                $(a, a.return, r);
              }
            }
            c && u & 64 && Pm(i), qe(i, i.return);
            break;
          case 27:
            (l & 2) !== 0 && lh(i);
          case 5:
            i.tag !== 5 && i.tag !== 27 || Ad(i), Ce(
              n,
              i,
              l
            ), c && a === null && u & 4 && as(i), qe(i, i.return);
            break;
          case 6:
            Ad(i);
            break;
          case 26:
            s = i.stateNode, i.memoizedState !== null || s === null || Tt || Cs(
              fi(s.ownerDocument),
              i.type,
              s
            ), Ce(
              n,
              i,
              l
            ), c && a === null && u & 4 && as(i), qe(i, i.return);
            break;
          case 12:
            Ce(
              n,
              i,
              l
            );
            break;
          case 31:
            Ce(
              n,
              i,
              l
            ), c && u & 4 && rh(n, i);
            break;
          case 13:
            Ce(
              n,
              i,
              l
            ), c && u & 4 && dh(n, i);
            break;
          case 22:
            i.memoizedState === null && Ce(
              n,
              i,
              l
            ), qe(i, i.return);
            break;
          case 30:
            Ce(
              n,
              i,
              l
            ), qe(i, i.return);
            break;
          case 7:
            qe(i, i.return);
          default:
            Ce(
              n,
              i,
              l
            );
        }
        e = e.sibling;
      }
    }
    function yf(t, e) {
      var l = null;
      t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== l && (t != null && t.refCount++, l != null && xi(l));
    }
    function gf(t, e) {
      t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && xi(t));
    }
    function ye(t, e, l, a) {
      var n = (l & 335544064) === l;
      if (e.subtreeFlags & (n ? 10262 : 10256))
        for (e = e.child; e !== null; )
          vh(
            t,
            e,
            l,
            a
          ), e = e.sibling;
      else n && ih(e);
    }
    function vh(t, e, l, a) {
      var n = (l & 335544064) === l;
      n && e.alternate === null && e.return !== null && e.return.alternate !== null && du(e);
      var i = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          ye(
            t,
            e,
            l,
            a
          ), i & 2048 && Ti(9, e);
          break;
        case 1:
          ye(
            t,
            e,
            l,
            a
          );
          break;
        case 3:
          ye(
            t,
            e,
            l,
            a
          ), n && ss && (t = t.containerInfo, t = t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, t.style.viewTransitionName === "root" && (t.style.viewTransitionName = ""), t = t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "none" && (t.style.viewTransitionName = "")), i & 2048 && (i = null, e.alternate !== null && (i = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== i && (e.refCount++, i != null && xi(i)));
          break;
        case 12:
          if (i & 2048) {
            ye(
              t,
              e,
              l,
              a
            ), i = e.stateNode;
            try {
              var u = e.memoizedProps, c = u.id, s = u.onPostCommit;
              typeof s == "function" && s(
                c,
                e.alternate === null ? "mount" : "update",
                i.passiveEffectDuration,
                -0
              );
            } catch (o) {
              $(e, e.return, o);
            }
          } else
            ye(
              t,
              e,
              l,
              a
            );
          break;
        case 31:
          ye(
            t,
            e,
            l,
            a
          );
          break;
        case 13:
          ye(
            t,
            e,
            l,
            a
          );
          break;
        case 23:
          break;
        case 22:
          u = e.stateNode, c = e.alternate, e.memoizedState !== null ? (n && c !== null && c.memoizedState === null && du(c), u._visibility & 2 ? ye(
            t,
            e,
            l,
            a
          ) : Fn(
            t,
            e
          )) : (n && c !== null && c.memoizedState !== null && du(e), u._visibility & 2 ? ye(
            t,
            e,
            l,
            a
          ) : (u._visibility |= 2, za(
            t,
            e,
            l,
            a,
            (e.subtreeFlags & 10256) !== 0 || !1
          ))), i & 2048 && yf(c, e);
          break;
        case 24:
          ye(
            t,
            e,
            l,
            a
          ), i & 2048 && gf(e.alternate, e);
          break;
        case 30:
          n && (i = e.alternate, i !== null && (Je(i.child, !0), Je(e.child, !0))), ye(
            t,
            e,
            l,
            a
          );
          break;
        default:
          ye(
            t,
            e,
            l,
            a
          );
      }
    }
    function za(t, e, l, a, n) {
      for (n = n && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
        var i = t, u = e, c = l, s = a, o = u.flags;
        switch (u.tag) {
          case 0:
          case 11:
          case 15:
            za(
              i,
              u,
              c,
              s,
              n
            ), Ti(8, u);
            break;
          case 23:
            break;
          case 22:
            var r = u.stateNode;
            u.memoizedState !== null ? r._visibility & 2 ? za(
              i,
              u,
              c,
              s,
              n
            ) : Fn(
              i,
              u
            ) : (r._visibility |= 2, za(
              i,
              u,
              c,
              s,
              n
            )), n && o & 2048 && yf(
              u.alternate,
              u
            );
            break;
          case 24:
            za(
              i,
              u,
              c,
              s,
              n
            ), n && o & 2048 && gf(u.alternate, u);
            break;
          default:
            za(
              i,
              u,
              c,
              s,
              n
            );
        }
        e = e.sibling;
      }
    }
    function Fn(t, e) {
      if (e.subtreeFlags & 10256)
        for (e = e.child; e !== null; ) {
          var l = t, a = e, n = a.flags;
          switch (a.tag) {
            case 22:
              Fn(l, a), n & 2048 && yf(
                a.alternate,
                a
              );
              break;
            case 24:
              Fn(l, a), n & 2048 && gf(a.alternate, a);
              break;
            default:
              Fn(l, a);
          }
          e = e.sibling;
        }
    }
    var Pl = 8192;
    function $l(t, e, l) {
      if (t.subtreeFlags & Pl)
        for (t = t.child; t !== null; )
          yh(
            t,
            e,
            l
          ), t = t.sibling;
    }
    function yh(t, e, l) {
      switch (t.tag) {
        case 26:
          $l(
            t,
            e,
            l
          ), t.flags & Pl && (t.memoizedState !== null ? rg(
            l,
            Oe,
            t.memoizedState,
            t.memoizedProps
          ) : (t = t.stateNode, (e & 335544128) === e && l0(l, t)));
          break;
        case 5:
          $l(
            t,
            e,
            l
          ), t.flags & Pl && (t = t.stateNode, (e & 335544128) === e && l0(l, t));
          break;
        case 3:
        case 4:
          var a = Oe;
          Oe = fi(t.stateNode.containerInfo), $l(
            t,
            e,
            l
          ), Oe = a;
          break;
        case 22:
          t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = Pl, Pl = 16777216, $l(
            t,
            e,
            l
          ), Pl = a) : $l(
            t,
            e,
            l
          ));
          break;
        case 30:
          if ((t.flags & Pl) !== 0 && (a = t.memoizedProps.name, a != null && a !== "auto")) {
            var n = t.stateNode;
            n.paired = null, ue === null && (ue =  new Map()), ue.set(a, n);
          }
          $l(
            t,
            e,
            l
          );
          break;
        default:
          $l(
            t,
            e,
            l
          );
      }
    }
    function gh(t) {
      var e = t.alternate;
      if (e !== null && (t = e.child, t !== null)) {
        e.child = null;
        do
          e = t.sibling, t.sibling = null, t = e;
        while (t !== null);
      }
    }
    function Dn(t) {
      var e = t.deletions;
      if ((t.flags & 16) !== 0) {
        if (e !== null)
          for (var l = 0; l < e.length; l++) {
            var a = e[l];
            Nt = a, xh(
              a,
              t
            );
          }
        gh(t);
      }
      if (t.subtreeFlags & 10256)
        for (t = t.child; t !== null; )
          ph(t), t = t.sibling;
    }
    function ph(t) {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          Dn(t), t.flags & 2048 && Xl(9, t, t.return);
          break;
        case 3:
          Dn(t);
          break;
        case 12:
          Dn(t);
          break;
        case 22:
          var e = t.stateNode;
          t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, mu(t)) : Dn(t);
          break;
        default:
          Dn(t);
      }
    }
    function mu(t) {
      var e = t.deletions;
      if ((t.flags & 16) !== 0) {
        if (e !== null)
          for (var l = 0; l < e.length; l++) {
            var a = e[l];
            Nt = a, xh(
              a,
              t
            );
          }
        gh(t);
      }
      for (t = t.child; t !== null; ) {
        switch (e = t, e.tag) {
          case 0:
          case 11:
          case 15:
            Xl(8, e, e.return), mu(e);
            break;
          case 22:
            l = e.stateNode, l._visibility & 2 && (l._visibility &= -3, mu(e));
            break;
          default:
            mu(e);
        }
        t = t.sibling;
      }
    }
    function xh(t, e) {
      for (; Nt !== null; ) {
        var l = Nt;
        switch (l.tag) {
          case 0:
          case 11:
          case 15:
            Xl(8, l, e);
            break;
          case 23:
          case 22:
            if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
              var a = l.memoizedState.cachePool.pool;
              a != null && a.refCount++;
            }
            break;
          case 24:
            xi(l.memoizedState.cache);
        }
        if (a = l.child, a !== null) a.return = l, Nt = a;
        else
          t: for (l = t; Nt !== null; ) {
            a = Nt;
            var n = a.sibling, i = a.return;
            if (sh(a), a === l) {
              Nt = null;
              break t;
            }
            if (n !== null) {
              n.return = i, Nt = n;
              break t;
            }
            Nt = i;
          }
      }
    }
    var oy = {
      getCacheForType: function(t) {
        var e = Dt(bt), l = e.data.get(t);
        return l === void 0 && (l = t(), e.data.set(t, l)), l;
      },
      cacheSignal: function() {
        return Dt(bt).controller.signal;
      }
    }, sy = typeof WeakMap == "function" ? WeakMap : Map, Q = 0, P = null, Y = null, q = 0, J = 0, ae = null, El = !1, gn = !1, pf = !1, fl = 0, st = 0, Vl = 0, ua = 0, ju = 0, ce = 0, nn = 0, $n = null, kt = null, ds = !1, sc = 0, Sh = 0, Xu = 1 / 0, Vu = null, Bl = null, ct = 0, De = null, ha = null, ke = 0, ms = 0, hs = null, Th = null, Wa = null, Ia = null, Pa = null, Wn = 0, hu = null;
    function re() {
      return (Q & 2) !== 0 && q !== 0 ? q & -q : R.T !== null ? Sf() : E0();
    }
    function Nh() {
      if (ce === 0)
        if ((q & 536870912) === 0 || G) {
          var t = Hi;
          Hi <<= 1, (Hi & 3932160) === 0 && (Hi = 262144), ce = t;
        } else ce = 536870912;
      return t = Bt.current, t !== null && (t.flags |= 32), ce;
    }
    function un(t, e) {
      if (e != null) {
        var l = t.stateNode, a = l.ref;
        a === null && (a = l.ref = Qh(
          ul(t.memoizedProps, l)
        )), Ia === null && (Ia = []), Ia.push(e.bind(null, a));
      }
    }
    function $t(t, e, l) {
      (t === P && (J === 2 || J === 9) || t.cancelPendingCommit !== null) && (cn(t, 0), Al(
        t,
        q,
        ce,
        !1
      )), yi(t, l), ((Q & 2) === 0 || t !== P) && (t === P && ((Q & 2) === 0 && (ua |= l), st === 4 && Al(
        t,
        q,
        ce,
        !1
      )), $e(t));
    }
    function Mh(t, e, l) {
      if ((Q & 6) !== 0) throw Error(S(327));
      var a = !l && (e & 127) === 0 && (e & t.expiredLanes) === 0 || vi(t, e), n = a ? dy(t, e) : ro(t, e, !0), i = a;
      do {
        if (n === 0) {
          gn && !a && Al(t, e, 0, !1);
          break;
        } else {
          if (l = t.current.alternate, i && !fy(l)) {
            n = ro(t, e, !1), i = !1;
            continue;
          }
          if (n === 2) {
            if (i = e, t.errorRecoveryDisabledLanes & i)
              var u = 0;
            else
              u = t.pendingLanes & -536870913, u = u !== 0 ? u : u & 536870912 ? 536870912 : 0;
            if (u !== 0) {
              e = u;
              t: {
                var c = t;
                n = $n;
                var s = c.current.memoizedState.isDehydrated;
                if (s && (cn(c, u).flags |= 256), u = ro(
                  c,
                  u,
                  !1
                ), u !== 2 && u !== 6) {
                  if (pf && !s) {
                    c.errorRecoveryDisabledLanes |= i, ua |= i, n = 4;
                    break t;
                  }
                  i = kt, kt = n, i !== null && (kt === null ? kt = i : kt.push.apply(
                    kt,
                    i
                  ));
                }
                n = u;
              }
              if (i = !1, n !== 2) continue;
            }
          }
          if (n === 1) {
            cn(t, 0), Al(t, e, 0, !0);
            break;
          }
          t: {
            switch (a = t, i = n, i) {
              case 0:
              case 1:
                throw Error(S(345));
              case 4:
                if ((e & 4194048) !== e && (e & 62914560) !== e)
                  break;
              case 6:
                Al(
                  a,
                  e,
                  ce,
                  !El
                );
                break t;
              case 2:
                kt = null;
                break;
              case 3:
              case 5:
                break;
              default:
                throw Error(S(329));
            }
            if ((e & 62914560) === e && (n = sc + 300 - oe(), 10 < n)) {
              if (Al(
                a,
                e,
                ce,
                !El
              ), Fu(a, 0, !0) !== 0) break t;
              ke = e, a.timeoutHandle = Nf(
                Dd.bind(
                  null,
                  a,
                  l,
                  kt,
                  Vu,
                  ds,
                  e,
                  ce,
                  ua,
                  nn,
                  El,
                  i,
                  "Throttled",
                  -0,
                  0
                ),
                n
              );
              break t;
            }
            Dd(
              a,
              l,
              kt,
              Vu,
              ds,
              e,
              ce,
              ua,
              nn,
              El,
              i,
              null,
              -0,
              0
            );
          }
        }
        break;
      } while (!0);
      $e(t);
    }
    function Dd(t, e, l, a, n, i, u, c, s, o, r, b, d, m) {
      t.timeoutHandle = -1;
      var y = e.subtreeFlags, N = (i & 335544064) === i;
      if (b = null, (N || y & 8192 || (y & 16785408) === 16785408) && (b = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Ve
      }, ue = null, yh(
        e,
        i,
        b
      ), N && (y = b, N = t.containerInfo, N = (N.nodeType === 9 ? N : N.ownerDocument).__reactViewTransition, N != null && (y.count++, y.waitingForViewTransition = !0, y = ri.bind(y), N.finished.then(y, y))), y = (i & 62914560) === i ? sc - oe() : (i & 4194048) === i ? Sh - oe() : 0, y = dg(
        b,
        y
      ), y !== null)) {
        ke = i, t.cancelPendingCommit = y(
          Rd.bind(
            null,
            t,
            e,
            i,
            l,
            a,
            n,
            u,
            c,
            s,
            o,
            r,
            b,
            null,
            d,
            m
          )
        ), Al(t, i, u, !o);
        return;
      }
      Rd(
        t,
        e,
        i,
        l,
        a,
        n,
        u,
        c,
        s,
        o,
        r,
        b
      );
    }
    function fy(t) {
      for (var e = t; ; ) {
        var l = e.tag;
        if ((l === 0 || l === 11 || l === 15) && e.flags & 16384 && (l = e.updateQueue, l !== null && (l = l.stores, l !== null)))
          for (var a = 0; a < l.length; a++) {
            var n = l[a], i = n.getSnapshot;
            n = n.value;
            try {
              if (!de(i(), n)) return !1;
            } catch {
              return !1;
            }
          }
        if (l = e.child, e.subtreeFlags & 16384 && l !== null)
          l.return = e, e = l;
        else {
          if (e === t) break;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) return !0;
            e = e.return;
          }
          e.sibling.return = e.return, e = e.sibling;
        }
      }
      return !0;
    }
    function Al(t, e, l, a) {
      e = S0(t, e), e &= ~ju, e &= ~ua, t.suspendedLanes |= e, t.pingedLanes &= ~e, a && (t.warmLanes |= e), a = t.expirationTimes;
      for (var n = e; 0 < n; ) {
        var i = 31 - fe(n), u = 1 << i;
        a[i] = -1, n &= ~u;
      }
      l !== 0 && N0(t, l, e);
    }
    function fc() {
      return (Q & 6) === 0 ? (Ni(0, !1), !1) : !0;
    }
    function xf() {
      if (Y !== null) {
        if (J === 0)
          var t = Y.return;
        else
          t = Y, ll = pa = null, lf(t), Ja = null, ni = 0, t = Y;
        for (; t !== null; )
          Im(t.alternate, t), t = t.return;
        Y = null;
      }
    }
    function cn(t, e) {
      var l = t.timeoutHandle;
      return l !== -1 && (t.timeoutHandle = -1, wy(l)), l = t.cancelPendingCommit, l !== null && (t.cancelPendingCommit = null, l()), ke = 0, xf(), P = t, Y = l = al(t.current, null), q = e, J = 0, ae = null, El = !1, gn = vi(t, e), pf = !1, nn = ce = ju = ua = Vl = st = 0, kt = $n = null, ds = !1, fl = S0(t, e), tc(), l;
    }
    function _h(t, e) {
      B = null, R.H = Bu, e === vn || e === ac ? (e = nd(), J = 3) : e === Js ? (e = nd(), J = 4) : J = e === rf ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, ae = e, Y === null && (st = 1, Hu(
        t,
        Te(e, t.current)
      ));
    }
    function Eh() {
      var t = Bt.current;
      return t === null ? !0 : (q & 4194048) === q ? Lt === null : (q & 62914560) === q || (q & 536870912) !== 0 ? t === Lt : !1;
    }
    function Ah() {
      var t = R.H;
      return R.H = Bu, t === null ? Bu : t;
    }
    function Ch() {
      var t = R.A;
      return R.A = oy, t;
    }
    function Qu() {
      st = 4, El || (q & 4194048) !== q && Bt.current !== null || (gn = !0), (Vl & 134217727) === 0 && (ua & 134217727) === 0 || P === null || Al(
        P,
        q,
        ce,
        !1
      );
    }
    function ro(t, e, l) {
      var a = Q;
      Q |= 2;
      var n = Ah(), i = Ch();
      (P !== t || q !== e) && (Vu = null, cn(t, e)), e = !1;
      var u = st;
      t: do
        try {
          if (J !== 0 && Y !== null) {
            var c = Y, s = ae;
            switch (J) {
              case 8:
                xf(), u = 6;
                break t;
              case 3:
              case 2:
              case 9:
              case 6:
                Bt.current === null && (e = !0);
                var o = J;
                if (J = 0, ae = null, Va(t, c, s, o), l && gn) {
                  u = 0;
                  break t;
                }
                break;
              default:
                o = J, J = 0, ae = null, Va(t, c, s, o);
            }
          }
          ry(), u = st;
          break;
        } catch (r) {
          _h(t, r);
        }
      while (!0);
      return e && t.shellSuspendCounter++, ll = pa = null, Q = a, R.H = n, R.A = i, Y === null && (P = null, q = 0, tc()), u;
    }
    function ry() {
      for (; Y !== null; ) Oh(Y);
    }
    function dy(t, e) {
      var l = Q;
      Q |= 2;
      var a = Ah(), n = Ch();
      P !== t || q !== e ? (Vu = null, Xu = oe() + 500, cn(t, e)) : gn = vi(
        t,
        e
      );
      t: do
        try {
          if (J !== 0 && Y !== null) {
            e = Y;
            var i = ae;
            e: switch (J) {
              case 1:
                J = 0, ae = null, Va(t, e, i, 1);
                break;
              case 2:
              case 9:
                if (ad(i)) {
                  J = 0, ae = null, wd(e);
                  break;
                }
                e = function() {
                  J !== 2 && J !== 9 || P !== t || (J = 7), $e(t);
                }, i.then(e, e);
                break t;
              case 3:
                J = 7;
                break t;
              case 4:
                J = 5;
                break t;
              case 7:
                ad(i) ? (J = 0, ae = null, wd(e)) : (J = 0, ae = null, Va(t, e, i, 7));
                break;
              case 5:
                var u = null;
                switch (Y.tag) {
                  case 26:
                    u = Y.memoizedState;
                  case 5:
                  case 27:
                    var c = Y;
                    if (u ? t1(u) : c.stateNode.complete) {
                      J = 0, ae = null;
                      var s = c.sibling;
                      if (s !== null) Y = s;
                      else {
                        var o = c.return;
                        o !== null ? (Y = o, rc(o)) : Y = null;
                      }
                      break e;
                    }
                }
                J = 0, ae = null, Va(t, e, i, 5);
                break;
              case 6:
                J = 0, ae = null, Va(t, e, i, 6);
                break;
              case 8:
                xf(), st = 6;
                break t;
              default:
                throw Error(S(462));
            }
          }
          my();
          break;
        } catch (r) {
          _h(t, r);
        }
      while (!0);
      return ll = pa = null, R.H = a, R.A = n, Q = l, Y !== null ? 0 : (P = null, q = 0, tc(), st);
    }
    function my() {
      for (; Y !== null && !zb(); )
        Oh(Y);
    }
    function Oh(t) {
      var e = Wm(t.alternate, t, fl);
      t.memoizedProps = t.pendingProps, e === null ? rc(t) : Y = e;
    }
    function wd(t) {
      var e = t, l = e.alternate;
      switch (e.tag) {
        case 15:
        case 0:
          e = xd(
            l,
            e,
            e.pendingProps,
            e.type,
            void 0,
            q
          );
          break;
        case 11:
          e = xd(
            l,
            e,
            e.pendingProps,
            e.type.render,
            e.ref,
            q
          );
          break;
        case 5:
          lf(e);
          var a = e;
          a === _t && (G ? (Cu(a), a.tag === 5 && a.stateNode != null && (at = a.stateNode)) : (Cu(a), G = !0));
        default:
          Im(l, e), e = Y = P0(e, fl), e = Wm(l, e, fl);
      }
      t.memoizedProps = t.pendingProps, e === null ? rc(t) : Y = e;
    }
    function Va(t, e, l, a) {
      ll = pa = null, lf(e), Ja = null, ni = 0;
      var n = e.return;
      try {
        if (ty(
          t,
          n,
          e,
          l,
          q
        )) {
          st = 1, Hu(
            t,
            Te(l, t.current)
          ), Y = null;
          return;
        }
      } catch (i) {
        if (n !== null) throw Y = n, i;
        st = 1, Hu(
          t,
          Te(l, t.current)
        ), Y = null;
        return;
      }
      e.flags & 32768 ? (G || a === 1 ? t = !0 : gn || (q & 536870912) !== 0 ? t = !1 : (El = t = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = Bt.current, a !== null && a.tag === 13 && (a.flags |= 16384))), zh(e, t)) : rc(e);
    }
    function rc(t) {
      var e = t;
      do {
        if ((e.flags & 32768) !== 0) {
          zh(
            e,
            El
          );
          return;
        }
        t = e.return;
        var l = ny(
          e.alternate,
          e,
          fl
        );
        if (l !== null) {
          Y = l;
          return;
        }
        if (e = e.sibling, e !== null) {
          Y = e;
          return;
        }
        Y = e = t;
      } while (e !== null);
      st === 0 && (st = 5);
    }
    function zh(t, e) {
      do {
        var l = iy(t.alternate, t);
        if (l !== null) {
          l.flags &= 32767, Y = l;
          return;
        }
        if (l = t.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !e && (t = t.sibling, t !== null)) {
          Y = t;
          return;
        }
        Y = t = l;
      } while (t !== null);
      st = 6, Y = null;
    }
    function Rd(t, e, l, a, n, i, u, c, s, o, r, b) {
      t.cancelPendingCommit = null;
      do
        dc();
      while (ct !== 0);
      if ((Q & 6) !== 0) throw Error(S(327));
      if (e !== null) {
        if (e === t.current) throw Error(S(177));
        t === P && (Y = P = null, q = 0), ha = e, De = t, ke = l, hs = n, Th = a, hy(
          t,
          e,
          l,
          u,
          c,
          s,
          b
        );
      }
    }
    function hy(t, e, l, a, n, i, u) {
      var c = e.lanes | e.childLanes;
      if (ms = c, c |= Xs, qb(
        t,
        l,
        c,
        a,
        n,
        i
      ), Ia = null, (l & 335544064) === l ? (Pa = Xv(t), a = 10262) : (Pa = null, a = 10256), (e.subtreeFlags & a) !== 0 || (e.flags & a) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, xy(Nu, function() {
        return gs(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), Yu = !1, a = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || a) {
        a = R.T, R.T = null, n = Z.p, Z.p = 2, i = Q, Q |= 4;
        try {
          uy(t, e, l);
        } finally {
          Q = i, Z.p = n, R.T = a;
        }
      }
      ct = 1, Yu ? Wa = Ly(
        u,
        t.containerInfo,
        Pa,
        bs,
        vs,
        vy,
        ys,
        gs,
        by,
        null,
        null
      ) : (bs(), vs(), ys());
    }
    function by(t) {
      if (ct !== 0) {
        var e = De.onRecoverableError;
        e(t, { componentStack: null });
      }
    }
    function vy() {
      ct === 3 && (ct = 0, bh(ha, De), ct = 4);
    }
    function bs() {
      if (ct === 1) {
        ct = 0;
        var t = De, e = ha, l = ke, a = (e.flags & 13878) !== 0;
        if ((e.subtreeFlags & 13878) !== 0 || a) {
          a = R.T, R.T = null;
          var n = Z.p;
          Z.p = 2;
          var i = Q;
          Q |= 4;
          try {
            Ln = qu = !1, mh(e, t, l), l = Ts;
            var u = Z0(t.containerInfo), c = l.focusedElem, s = l.selectionRange;
            if (u !== c && c && c.ownerDocument && Q0(
              c.ownerDocument.documentElement,
              c
            )) {
              if (s !== null && js(c)) {
                var o = s.start, r = s.end;
                if (r === void 0 && (r = o), "selectionStart" in c)
                  c.selectionStart = o, c.selectionEnd = Math.min(
                    r,
                    c.value.length
                  );
                else {
                  var b = c.ownerDocument || document, d = b && b.defaultView || window;
                  if (d.getSelection) {
                    var m = d.getSelection(), y = c.textContent.length, N = Math.min(s.start, y), _ = s.end === void 0 ? N : Math.min(s.end, y);
                    !m.extend && N > _ && (u = _, _ = N, N = u);
                    var h = Fr(
                      c,
                      N
                    ), f = Fr(
                      c,
                      _
                    );
                    if (h && f && (m.rangeCount !== 1 || m.anchorNode !== h.node || m.anchorOffset !== h.offset || m.focusNode !== f.node || m.focusOffset !== f.offset)) {
                      var v = b.createRange();
                      v.setStart(h.node, h.offset), m.removeAllRanges(), N > _ ? (m.addRange(v), m.extend(f.node, f.offset)) : (v.setEnd(f.node, f.offset), m.addRange(v));
                    }
                  }
                }
              }
              for (b = [], m = c; m = m.parentNode; )
                m.nodeType === 1 && b.push({
                  element: m,
                  left: m.scrollLeft,
                  top: m.scrollTop
                });
              for (typeof c.focus == "function" && c.focus(), c = 0; c < b.length; c++) {
                var x = b[c];
                x.element.scrollLeft = x.left, x.element.scrollTop = x.top;
              }
            }
            dn = !!Ss, Ts = Ss = null;
          } finally {
            Q = i, Z.p = n, R.T = a;
          }
        }
        t.current = e, ct = 2;
      }
    }
    function vs() {
      if (ct === 2) {
        ct = 0;
        var t = De, e = ha, l = (e.flags & 8772) !== 0;
        if ((e.subtreeFlags & 8772) !== 0 || l) {
          l = R.T, R.T = null;
          var a = Z.p;
          Z.p = 2;
          var n = Q;
          Q |= 4;
          try {
            ch(t, e.alternate, e);
          } finally {
            Q = n, Z.p = a, R.T = l;
          }
        }
        ct = 3;
      }
    }
    function ys() {
      if (ct === 4 || ct === 3) {
        ct = 0;
        var t = Wa;
        Wa = null, Db();
        var e = De, l = ha, a = ke, n = Th, i = (a & 335544064) === a ? 10262 : 10256;
        if ((l.subtreeFlags & i) !== 0 || (l.flags & i) !== 0 ? ct = 5 : (ct = 0, ha = De = null, Dh(e, e.pendingLanes)), i = e.pendingLanes, i === 0 && (Bl = null), Bs(a), l = l.stateNode, se && typeof se.onCommitFiberRoot == "function")
          try {
            se.onCommitFiberRoot(
              bi,
              l,
              void 0,
              (l.current.flags & 128) === 128
            );
          } catch {
          }
        if (n !== null) {
          l = R.T, i = Z.p, Z.p = 2, R.T = null;
          try {
            for (var u = e.onRecoverableError, c = 0; c < n.length; c++) {
              var s = n[c];
              u(s.value, {
                componentStack: s.stack
              });
            }
          } finally {
            R.T = l, Z.p = i;
          }
        }
        if (n = Ia, u = Pa, Pa = null, n !== null && (Ia = null, u === null && (u = []), t !== null))
          for (s = 0; s < n.length; s++)
            l = (0, n[s])(
              u
            ), l !== void 0 && t.finished.finally(l);
        (ke & 3) !== 0 && dc(), $e(e), i = e.pendingLanes, (a & 261930) !== 0 && (i & 42) !== 0 ? e === hu ? Wn++ : (Wn = 0, hu = e) : (Wn = 0, hu = null), Ni(0, !1);
      }
    }
    function Dh(t, e) {
      (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, xi(e)));
    }
    function dc() {
      return Wa !== null && (Wa.skipTransition(), Wa = null), bs(), vs(), ys(), gs();
    }
    function gs() {
      if (ct !== 5) return !1;
      var t = De, e = ms;
      ms = 0;
      var l = Bs(ke), a = R.T, n = Z.p;
      try {
        Z.p = 32 > l ? 32 : l, R.T = null, l = hs, hs = null;
        var i = De, u = ke;
        if (ct = 0, ha = De = null, ke = 0, (Q & 6) !== 0) throw Error(S(331));
        var c = Q;
        if (Q |= 4, ph(i.current), vh(
          i,
          i.current,
          u,
          l
        ), Q = c, Ni(0, !1), se && typeof se.onPostCommitFiberRoot == "function")
          try {
            se.onPostCommitFiberRoot(bi, i);
          } catch {
          }
        return !0;
      } finally {
        Z.p = n, R.T = a, Dh(t, e);
      }
    }
    function Ud(t, e, l) {
      e = Te(l, e), e = Wo(t.stateNode, e, 2), t = wl(t, e, 2), t !== null && (yi(t, 2), $e(t));
    }
    function $(t, e, l) {
      if (t.tag === 3)
        Ud(t, t, l);
      else
        for (; e !== null; ) {
          if (e.tag === 3) {
            Ud(
              e,
              t,
              l
            );
            break;
          } else if (e.tag === 1) {
            var a = e.stateNode;
            if (typeof e.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (Bl === null || !Bl.has(a))) {
              t = Te(l, t), l = Km(2), a = wl(e, l, 2), a !== null && (km(
                l,
                a,
                e,
                t
              ), yi(a, 2), $e(a));
              break;
            }
          }
          e = e.return;
        }
    }
    function mo(t, e, l) {
      var a = t.pingCache;
      if (a === null) {
        a = t.pingCache = new sy();
        var n =  new Set();
        a.set(e, n);
      } else
        n = a.get(e), n === void 0 && (n =  new Set(), a.set(e, n));
      n.has(l) || (pf = !0, n.add(l), t = yy.bind(null, t, e, l), e.then(t, t));
    }
    function yy(t, e, l) {
      var a = t.pingCache;
      a !== null && a.delete(e), t.pingedLanes |= t.suspendedLanes & l, t.warmLanes &= ~l, P === t && (q & l) === l && ((st === 4 || st === 3 && (q & 62914560) === q && 300 > oe() - sc) && (Q & 2) === 0 ? cn(t, 0) : ju |= l, nn === q && (nn = 0)), $e(t);
    }
    function wh(t, e) {
      e === 0 && (e = T0()), t = ga(t, e), t !== null && (yi(t, e), $e(t));
    }
    function gy(t) {
      var e = t.memoizedState, l = 0;
      e !== null && (l = e.retryLane), wh(t, l);
    }
    function py(t, e) {
      var l = 0;
      switch (t.tag) {
        case 31:
        case 13:
          var a = t.stateNode, n = t.memoizedState;
          n !== null && (l = n.retryLane);
          break;
        case 19:
          a = t.stateNode;
          break;
        case 22:
          a = t.stateNode._retryCache;
          break;
        default:
          throw Error(S(314));
      }
      a !== null && a.delete(e), wh(t, l);
    }
    function xy(t, e) {
      return Rs(t, e);
    }
    var on = null, Da = null, ps = !1, Zu = !1, ho = !1, Cl = 0;
    function $e(t) {
      t !== Da && t.next === null && (Da === null ? on = Da = t : Da = Da.next = t), Zu = !0, ps || (ps = !0, Ty());
    }
    function Ni(t, e) {
      if (!ho && Zu) {
        ho = !0;
        do
          for (var l = !1, a = on; a !== null; ) {
            if (!e)
              if (t !== 0) {
                var n = a.pendingLanes;
                if (n === 0) var i = 0;
                else {
                  var u = a.suspendedLanes, c = a.pingedLanes;
                  i = (1 << 31 - fe(42 | t) + 1) - 1, i &= n & ~(u & ~c), i = i & 201326741 ? i & 201326741 | 1 : i ? i | 2 : 0;
                }
                i !== 0 && (l = !0, Bd(a, i));
              } else
                i = q, i = Fu(
                  a,
                  a === P ? i : 0,
                  a.cancelPendingCommit !== null || a.timeoutHandle !== -1
                ), (i & 3) === 0 || vi(a, i) || (l = !0, Bd(a, i));
            a = a.next;
          }
        while (l);
        ho = !1;
      }
    }
    function Sy() {
      Rh();
    }
    function Rh() {
      Zu = ps = !1;
      var t = 0;
      Cl !== 0 && Dy() && (t = Cl);
      for (var e = oe(), l = null, a = on; a !== null; ) {
        var n = a.next, i = Uh(a, e);
        i === 0 ? (a.next = null, l === null ? on = n : l.next = n, n === null && (Da = l)) : (l = a, (t !== 0 || (i & 3) !== 0) && (Zu = !0)), a = n;
      }
      ct !== 0 && ct !== 5 || Ni(t, !1), Cl !== 0 && (Cl = 0);
    }
    function Uh(t, e) {
      for (var l = t.suspendedLanes, a = t.pingedLanes, n = t.expirationTimes, i = t.pendingLanes & -62914561; 0 < i; ) {
        var u = 31 - fe(i), c = 1 << u, s = n[u];
        s === -1 ? ((c & l) === 0 || (c & a) !== 0) && (n[u] = Yb(c, e)) : s <= e && (t.expiredLanes |= c), i &= ~c;
      }
      if (e = P, l = q, l = Fu(
        t,
        t === e ? l : 0,
        t.cancelPendingCommit !== null || t.timeoutHandle !== -1
      ), a = t.callbackNode, l === 0 || t === e && (J === 2 || J === 9) || t.cancelPendingCommit !== null)
        return a !== null && a !== null && Zc(a), t.callbackNode = null, t.callbackPriority = 0;
      if ((l & 3) === 0 || vi(t, l)) {
        if (e = l & -l, e === t.callbackPriority) return e;
        switch (a !== null && Zc(a), Bs(l)) {
          case 2:
          case 8:
            l = p0;
            break;
          case 32:
            l = Nu;
            break;
          case 268435456:
            l = x0;
            break;
          default:
            l = Nu;
        }
        return a = Bh.bind(null, t), l = Rs(l, a), t.callbackPriority = e, t.callbackNode = l, e;
      }
      return a !== null && a !== null && Zc(a), t.callbackPriority = 2, t.callbackNode = null, 2;
    }
    function Bh(t, e) {
      if (ct !== 0 && ct !== 5)
        return t.callbackNode = null, t.callbackPriority = 0, null;
      var l = t.callbackNode;
      if (dc() && t.callbackNode !== l)
        return null;
      var a = q;
      return a = Fu(
        t,
        t === P ? a : 0,
        t.cancelPendingCommit !== null || t.timeoutHandle !== -1
      ), a === 0 ? null : (Mh(t, a, e), Uh(t, oe()), t.callbackNode != null && t.callbackNode === l ? Bh.bind(null, t) : null);
    }
    function Bd(t, e) {
      if (dc()) return null;
      Mh(t, e, !0);
    }
    function Ty() {
      Ry(function() {
        (Q & 6) !== 0 ? Rs(
          g0,
          Sy
        ) : Rh();
      });
    }
    function Sf() {
      if (Cl === 0) {
        var t = fa;
        t === 0 && (t = Bi, Bi <<= 1, (Bi & 261888) === 0 && (Bi = 256)), Cl = t;
      }
      return Cl;
    }
    function Hd(t) {
      return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : lu(t);
    }
    function Ny(t, e, l, a, n) {
      if (e === "submit" && l && l.stateNode === n) {
        var i = Hd(
          (n[It] || null).action
        ), u = a.submitter;
        u && (e = (e = u[It] || null) ? Hd(e.formAction) : u.getAttribute("formAction"), e !== null && (i = e, u = null));
        var c = new Wu(
          "action",
          "action",
          null,
          a,
          n
        );
        t.push({
          event: c,
          listeners: [
            {
              instance: null,
              listener: function() {
                if (a.defaultPrevented) {
                  if (Cl !== 0) {
                    var s = new FormData(n, u);
                    Fo(
                      l,
                      {
                        pending: !0,
                        data: s,
                        method: n.method,
                        action: i
                      },
                      null,
                      s
                    );
                  }
                } else
                  typeof i == "function" && (c.preventDefault(), s = new FormData(n, u), Fo(
                    l,
                    {
                      pending: !0,
                      data: s,
                      method: n.method,
                      action: i
                    },
                    i,
                    s
                  ));
              },
              currentTarget: n
            }
          ]
        });
      }
    }
    for ($i = 0; $i < Lo.length; $i++)
      Wi = Lo[$i], Gd = Wi.toLowerCase(), Ld = Wi[0].toUpperCase() + Wi.slice(1), we(
        Gd,
        "on" + Ld
      );
    var Wi, Gd, Ld, $i;
    we(k0, "onAnimationEnd");
    we(J0, "onAnimationIteration");
    we(F0, "onAnimationStart");
    we("dblclick", "onDoubleClick");
    we("focusin", "onFocus");
    we("focusout", "onBlur");
    we(Uv, "onTransitionRun");
    we(Bv, "onTransitionStart");
    we(Hv, "onTransitionCancel");
    we($0, "onTransitionEnd");
    en("onMouseEnter", ["mouseout", "mouseover"]);
    en("onMouseLeave", ["mouseout", "mouseover"]);
    en("onPointerEnter", ["pointerout", "pointerover"]);
    en("onPointerLeave", ["pointerout", "pointerover"]);
    va(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(" ")
    );
    va(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    );
    va("onBeforeInput", [
      "compositionend",
      "keypress",
      "textInput",
      "paste"
    ]);
    va(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    );
    va(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    );
    va(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    );
    var ci = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ), My = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ci)
    );
    function Hh(t, e) {
      e = (e & 4) !== 0;
      for (var l = 0; l < t.length; l++) {
        var a = t[l], n = a.event;
        a = a.listeners;
        t: {
          var i = void 0;
          if (e)
            for (var u = a.length - 1; 0 <= u; u--) {
              var c = a[u], s = c.instance, o = c.currentTarget;
              if (c = c.listener, s !== i && n.isPropagationStopped())
                break t;
              i = c, n.currentTarget = o;
              try {
                i(n);
              } catch (r) {
                _u(r);
              }
              n.currentTarget = null, i = s;
            }
          else
            for (u = 0; u < a.length; u++) {
              if (c = a[u], s = c.instance, o = c.currentTarget, c = c.listener, s !== i && n.isPropagationStopped())
                break t;
              i = c, n.currentTarget = o;
              try {
                i(n);
              } catch (r) {
                _u(r);
              }
              n.currentTarget = null, i = s;
            }
        }
      }
    }
    function L(t, e) {
      var l = e[wr];
      l === void 0 && (l = e[wr] =  new Set());
      var a = t + "__bubble";
      l.has(a) || (Gh(e, t, 2, !1), l.add(a));
    }
    function bo(t, e, l) {
      var a = 0;
      e && (a |= 4), Gh(
        l,
        t,
        a,
        e
      );
    }
    var Ii = "_reactListening" + Math.random().toString(36).slice(2);
    function Tf(t) {
      if (!t[Ii]) {
        t[Ii] = !0, C0.forEach(function(l) {
          l !== "selectionchange" && (My.has(l) || bo(l, !1, t), bo(l, !0, t));
        });
        var e = t.nodeType === 9 ? t : t.ownerDocument;
        e === null || e[Ii] || (e[Ii] = !0, bo("selectionchange", !1, e));
      }
    }
    function Gh(t, e, l, a) {
      switch (c1(e)) {
        case 2:
          var n = vg;
          break;
        case 8:
          n = yg;
          break;
        default:
          n = Of;
      }
      l = n.bind(
        null,
        e,
        l,
        t
      ), n = void 0, !Uo || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (n = !0), a ? n !== void 0 ? t.addEventListener(e, l, {
        capture: !0,
        passive: n
      }) : t.addEventListener(e, l, !0) : n !== void 0 ? t.addEventListener(e, l, {
        passive: n
      }) : t.addEventListener(e, l, !1);
    }
    function vo(t, e, l, a, n) {
      var i = a;
      if ((e & 1) === 0 && (e & 2) === 0 && a !== null)
        t: for (; ; ) {
          if (a === null) return;
          var u = a.tag;
          if (u === 3 || u === 4) {
            var c = a.stateNode.containerInfo;
            if (c === n) break;
            if (u === 4)
              for (u = a.return; u !== null; ) {
                var s = u.tag;
                if ((s === 3 || s === 4) && u.stateNode.containerInfo === n)
                  return;
                u = u.return;
              }
            for (; c !== null; ) {
              if (u = ta(c), u === null) return;
              if (s = u.tag, s === 5 || s === 6 || s === 26 || s === 27) {
                a = i = u;
                continue t;
              }
              c = c.parentNode;
            }
          }
          a = a.return;
        }
      H0(function() {
        var o = i, r = Gs(l), b = [];
        t: {
          var d = W0.get(t);
          if (d !== void 0) {
            var m = Wu, y = t;
            switch (t) {
              case "keypress":
                if (nu(l) === 0) break t;
              case "keydown":
              case "keyup":
                m = fv;
                break;
              case "focusin":
                y = "focus", m = Wc;
                break;
              case "focusout":
                y = "blur", m = Wc;
                break;
              case "beforeblur":
              case "afterblur":
                m = Wc;
                break;
              case "click":
                if (l.button === 2) break t;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                m = qr;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                m = Ib;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                m = bv;
                break;
              case k0:
              case J0:
              case F0:
                m = ev;
                break;
              case $0:
                m = yv;
                break;
              case "scroll":
              case "scrollend":
                m = $b;
                break;
              case "wheel":
                m = pv;
                break;
              case "copy":
              case "cut":
              case "paste":
                m = av;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                m = Xr;
                break;
              case "submit":
                m = mv;
                break;
              case "toggle":
              case "beforetoggle":
                m = Sv;
            }
            var N = (e & 4) !== 0, _ = !N && (t === "scroll" || t === "scrollend"), h = N ? d !== null ? d + "Capture" : null : d;
            N = [];
            for (var f = o, v; f !== null; ) {
              var x = f;
              if (v = x.stateNode, x = x.tag, x !== 5 && x !== 26 && x !== 27 || v === null || h === null || (x = Pn(f, h), x != null && N.push(
                oi(f, x, v)
              )), _) break;
              f = f.return;
            }
            0 < N.length && (d = new m(
              d,
              y,
              null,
              l,
              r
            ), b.push({ event: d, listeners: N }));
          }
        }
        if ((e & 7) === 0) {
          t: {
            if (m = t === "mouseover" || t === "pointerover", d = t === "mouseout" || t === "pointerout", m && l !== Ro && (y = l.relatedTarget || l.fromElement) && (ta(y) || y[hn]))
              break t;
            (d || m) && (y = r.window === r ? r : (m = r.ownerDocument) ? m.defaultView || m.parentWindow : window, d ? (m = l.relatedTarget || l.toElement, d = o, m = m ? ta(m) : null, m !== null && (_ = hi(m), N = m.tag, m !== _ || N !== 5 && N !== 27 && N !== 6) && (m = null)) : (d = null, m = o), d !== m && (N = qr, x = "onMouseLeave", h = "onMouseEnter", f = "mouse", (t === "pointerout" || t === "pointerover") && (N = Xr, x = "onPointerLeave", h = "onPointerEnter", f = "pointer"), _ = d == null ? y : Hn(d), v = m == null ? y : Hn(m), y = new N(
              x,
              f + "leave",
              d,
              l,
              r
            ), y.target = _, y.relatedTarget = v, x = null, ta(r) === o && (N = new N(
              h,
              f + "enter",
              m,
              l,
              r
            ), N.target = v, N.relatedTarget = _, x = N), _ = x, N = d && m ? So(
              d,
              m,
              _y
            ) : null, d !== null && Yd(
              b,
              y,
              d,
              N,
              !1
            ), m !== null && _ !== null && Yd(
              b,
              _,
              m,
              N,
              !0
            )));
          }
          t: {
            if (d = o ? Hn(o) : window, m = d.nodeName && d.nodeName.toLowerCase(), m === "select" || m === "input" && d.type === "file")
              var M = Kr;
            else if (Zr(d))
              if (X0)
                M = Dv;
              else {
                M = Ov;
                var A = Cv;
              }
            else
              m = d.nodeName, !m || m.toLowerCase() !== "input" || d.type !== "checkbox" && d.type !== "radio" ? o && Hs(o.elementType) && (M = Kr) : M = zv;
            if (M && (M = M(t, o))) {
              j0(
                b,
                M,
                l,
                r
              );
              break t;
            }
            A && A(t, d, o);
          }
          switch (A = o ? Hn(o) : window, t) {
            case "focusin":
              (Zr(A) || A.contentEditable === "true") && (Ga = A, Ho = o, jn = null);
              break;
            case "focusout":
              jn = Ho = Ga = null;
              break;
            case "mousedown":
              Go = !0;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              Go = !1, $r(b, l, r);
              break;
            case "selectionchange":
              if (Rv) break;
            case "keydown":
            case "keyup":
              $r(b, l, r);
          }
          var C;
          if (qs)
            t: {
              switch (t) {
                case "compositionstart":
                  var z = "onCompositionStart";
                  break t;
                case "compositionend":
                  z = "onCompositionEnd";
                  break t;
                case "compositionupdate":
                  z = "onCompositionUpdate";
                  break t;
              }
              z = void 0;
            }
          else
            Ha ? Y0(t, l) && (z = "onCompositionEnd") : t === "keydown" && l.keyCode === 229 && (z = "onCompositionStart");
          z && (L0 && l.locale !== "ko" && (Ha || z !== "onCompositionStart" ? z === "onCompositionEnd" && Ha && (C = G0()) : (Ml = r, Ls = "value" in Ml ? Ml.value : Ml.textContent, Ha = !0)), A = Ku(o, z), 0 < A.length && (z = new jr(
            z,
            t,
            null,
            l,
            r
          ), b.push({ event: z, listeners: A }), C ? z.data = C : (C = q0(l), C !== null && (z.data = C)))), (C = Nv ? Mv(t, l) : _v(t, l)) && (z = Ku(o, "onBeforeInput"), 0 < z.length && (A = new jr(
            "onBeforeInput",
            "beforeinput",
            null,
            l,
            r
          ), b.push({
            event: A,
            listeners: z
          }), A.data = C)), Ny(
            b,
            t,
            o,
            l,
            r
          );
        }
        Hh(b, e);
      });
    }
    function oi(t, e, l) {
      return {
        instance: t,
        listener: e,
        currentTarget: l
      };
    }
    function Ku(t, e) {
      for (var l = e + "Capture", a = []; t !== null; ) {
        var n = t, i = n.stateNode;
        if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || i === null || (n = Pn(t, l), n != null && a.unshift(
          oi(t, n, i)
        ), n = Pn(t, e), n != null && a.push(
          oi(t, n, i)
        )), t.tag === 3) return a;
        t = t.return;
      }
      return [];
    }
    function _y(t) {
      if (t === null) return null;
      do
        t = t.return;
      while (t && t.tag !== 5 && t.tag !== 27);
      return t || null;
    }
    function Yd(t, e, l, a, n) {
      for (var i = e._reactName, u = []; l !== null && l !== a; ) {
        var c = l, s = c.alternate, o = c.stateNode;
        if (c = c.tag, s !== null && s === a) break;
        c !== 5 && c !== 26 && c !== 27 || o === null || (s = o, n ? (o = Pn(l, i), o != null && u.unshift(
          oi(l, o, s)
        )) : n || (o = Pn(l, i), o != null && u.push(
          oi(l, o, s)
        ))), l = l.return;
      }
      u.length !== 0 && t.push({ event: e, listeners: u });
    }
    var Ey = /\r\n?/g, Ay = /\u0000|\uFFFD/g;
    function qd(t) {
      return (typeof t == "string" ? t : "" + t).replace(Ey, `
`).replace(Ay, "");
    }
    function Lh(t, e) {
      return e = qd(e), qd(t) === e;
    }
    function F(t, e, l, a, n, i) {
      switch (l) {
        case "children":
          if (typeof a == "string")
            e === "body" || e === "textarea" && a === "" || ln(t, a);
          else if (typeof a == "number" || typeof a == "bigint")
            e !== "body" && ln(t, "" + a);
          else return;
          break;
        case "className":
          Li(t, "class", a);
          break;
        case "tabIndex":
          Li(t, "tabindex", a);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          Li(t, l, a);
          break;
        case "style":
          B0(t, a, i);
          return;
        case "data":
          if (e !== "object") {
            Li(t, "data", a);
            break;
          }
        case "src":
        case "href":
          if (a === "" && (e !== "a" || l !== "href")) {
            t.removeAttribute(l);
            break;
          }
          if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
            t.removeAttribute(l);
            break;
          }
          a = lu(a), t.setAttribute(l, a);
          break;
        case "action":
        case "formAction":
          if (typeof a == "function") {
            t.setAttribute(
              l,
              "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
            );
            break;
          } else
            typeof i == "function" && (l === "formAction" ? (e !== "input" && F(t, e, "name", n.name, n, null), F(
              t,
              e,
              "formEncType",
              n.formEncType,
              n,
              null
            ), F(
              t,
              e,
              "formMethod",
              n.formMethod,
              n,
              null
            ), F(
              t,
              e,
              "formTarget",
              n.formTarget,
              n,
              null
            )) : (F(t, e, "encType", n.encType, n, null), F(t, e, "method", n.method, n, null), F(t, e, "target", n.target, n, null)));
          if (a == null || typeof a == "symbol" || typeof a == "boolean") {
            t.removeAttribute(l);
            break;
          }
          a = lu(a), t.setAttribute(l, a);
          break;
        case "onClick":
          a != null && (t.onclick = Ve);
          return;
        case "onScroll":
          a != null && L("scroll", t);
          return;
        case "onScrollEnd":
          a != null && L("scrollend", t);
          return;
        case "dangerouslySetInnerHTML":
          if (a != null) {
            if (typeof a != "object" || !("__html" in a))
              throw Error(S(61));
            if (l = a.__html, l != null) {
              if (n.children != null) throw Error(S(60));
              i?.__html !== l && (t.innerHTML = l);
            }
          }
          break;
        case "multiple":
          t.multiple = a && typeof a != "function" && typeof a != "symbol";
          break;
        case "muted":
          t.muted = a && typeof a != "function" && typeof a != "symbol";
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "ref":
          break;
        case "autoFocus":
          break;
        case "xlinkHref":
          if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
            t.removeAttribute("xlink:href");
            break;
          }
          l = lu(a), t.setAttributeNS(
            "http://www.w3.org/1999/xlink",
            "xlink:href",
            l
          );
          break;
        case "contentEditable":
        case "spellCheck":
        case "draggable":
        case "value":
        case "autoReverse":
        case "externalResourcesRequired":
        case "focusable":
        case "preserveAlpha":
          a != null && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(l, a) : t.removeAttribute(l);
          break;
        case "inert":
        case "allowFullScreen":
        case "async":
        case "autoPlay":
        case "controls":
        case "credentialless":
        case "default":
        case "defer":
        case "disabled":
        case "disablePictureInPicture":
        case "disableRemotePlayback":
        case "formNoValidate":
        case "hidden":
        case "loop":
        case "noModule":
        case "noValidate":
        case "open":
        case "playsInline":
        case "readOnly":
        case "required":
        case "reversed":
        case "scoped":
        case "seamless":
        case "itemScope":
          a && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(l, "") : t.removeAttribute(l);
          break;
        case "capture":
        case "download":
          a === !0 ? t.setAttribute(l, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(l, a) : t.removeAttribute(l);
          break;
        case "cols":
        case "rows":
        case "size":
        case "span":
          a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? t.setAttribute(l, a) : t.removeAttribute(l);
          break;
        case "rowSpan":
        case "start":
          a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? t.removeAttribute(l) : t.setAttribute(l, a);
          break;
        case "popover":
          L("beforetoggle", t), L("toggle", t), eu(t, "popover", a);
          break;
        case "xlinkActuate":
          Pe(
            t,
            "http://www.w3.org/1999/xlink",
            "xlink:actuate",
            a
          );
          break;
        case "xlinkArcrole":
          Pe(
            t,
            "http://www.w3.org/1999/xlink",
            "xlink:arcrole",
            a
          );
          break;
        case "xlinkRole":
          Pe(
            t,
            "http://www.w3.org/1999/xlink",
            "xlink:role",
            a
          );
          break;
        case "xlinkShow":
          Pe(
            t,
            "http://www.w3.org/1999/xlink",
            "xlink:show",
            a
          );
          break;
        case "xlinkTitle":
          Pe(
            t,
            "http://www.w3.org/1999/xlink",
            "xlink:title",
            a
          );
          break;
        case "xlinkType":
          Pe(
            t,
            "http://www.w3.org/1999/xlink",
            "xlink:type",
            a
          );
          break;
        case "xmlBase":
          Pe(
            t,
            "http://www.w3.org/XML/1998/namespace",
            "xml:base",
            a
          );
          break;
        case "xmlLang":
          Pe(
            t,
            "http://www.w3.org/XML/1998/namespace",
            "xml:lang",
            a
          );
          break;
        case "xmlSpace":
          Pe(
            t,
            "http://www.w3.org/XML/1998/namespace",
            "xml:space",
            a
          );
          break;
        case "is":
          eu(t, "is", a);
          break;
        case "innerText":
        case "textContent":
          return;
        default:
          if (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N")
            l = Jb.get(l) || l, eu(t, l, a);
          else return;
      }
      j = !0;
    }
    function xs(t, e, l, a, n, i) {
      switch (l) {
        case "style":
          B0(t, a, i);
          return;
        case "dangerouslySetInnerHTML":
          if (a != null) {
            if (typeof a != "object" || !("__html" in a))
              throw Error(S(61));
            if (l = a.__html, l != null) {
              if (n.children != null) throw Error(S(60));
              i?.__html !== l && (t.innerHTML = l);
            }
          }
          break;
        case "children":
          if (typeof a == "string") ln(t, a);
          else if (typeof a == "number" || typeof a == "bigint")
            ln(t, "" + a);
          else return;
          break;
        case "onScroll":
          a != null && L("scroll", t);
          return;
        case "onScrollEnd":
          a != null && L("scrollend", t);
          return;
        case "onClick":
          a != null && (t.onclick = Ve);
          return;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "innerHTML":
        case "ref":
          return;
        case "innerText":
        case "textContent":
          return;
        default:
          if (!O0.hasOwnProperty(l))
            t: {
              if (l[0] === "o" && l[1] === "n" && (n = l.endsWith("Capture"), i = l.slice(2, n ? l.length - 7 : void 0), e = t[It] || null, e = e != null ? e[l] : null, typeof e == "function" && t.removeEventListener(i, e, n), typeof a == "function")) {
                typeof e != "function" && e !== null && (l in t ? t[l] = null : t.hasAttribute(l) && t.removeAttribute(l)), t.addEventListener(i, a, n);
                break t;
              }
              j = !0, l in t ? t[l] = a : a === !0 ? t.setAttribute(l, "") : eu(t, l, a);
            }
          return;
      }
      j = !0;
    }
    function Ut(t, e, l) {
      switch (e) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "img":
          L("error", t), L("load", t);
          var a = !1, n = !1, i;
          for (i in l)
            if (l.hasOwnProperty(i)) {
              var u = l[i];
              if (u != null)
                switch (i) {
                  case "src":
                    a = !0;
                    break;
                  case "srcSet":
                    n = !0;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(S(137, e));
                  default:
                    F(t, e, i, u, l, null);
                }
            }
          n && F(t, e, "srcSet", l.srcSet, l, null), a && F(t, e, "src", l.src, l, null);
          return;
        case "input":
          L("invalid", t);
          var c = i = u = n = null, s = null, o = null;
          for (a in l)
            if (l.hasOwnProperty(a)) {
              var r = l[a];
              if (r != null)
                switch (a) {
                  case "name":
                    n = r;
                    break;
                  case "type":
                    u = r;
                    break;
                  case "checked":
                    s = r;
                    break;
                  case "defaultChecked":
                    o = r;
                    break;
                  case "value":
                    i = r;
                    break;
                  case "defaultValue":
                    c = r;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    if (r != null)
                      throw Error(S(137, e));
                    break;
                  default:
                    F(t, e, a, r, l, null);
                }
            }
          w0(
            t,
            i,
            c,
            s,
            o,
            u,
            n,
            !1
          );
          return;
        case "select":
          L("invalid", t), a = u = i = null;
          for (n in l)
            if (l.hasOwnProperty(n) && (c = l[n], c != null))
              switch (n) {
                case "value":
                  i = c;
                  break;
                case "defaultValue":
                  u = c;
                  break;
                case "multiple":
                  a = c;
                default:
                  F(t, e, n, c, l, null);
              }
          e = i, l = u, t.multiple = !!a, e != null ? Za(t, !!a, e, !1) : l != null && Za(t, !!a, l, !0);
          return;
        case "textarea":
          L("invalid", t), i = n = a = null;
          for (u in l)
            if (l.hasOwnProperty(u) && (c = l[u], c != null))
              switch (u) {
                case "value":
                  a = c;
                  break;
                case "defaultValue":
                  n = c;
                  break;
                case "children":
                  i = c;
                  break;
                case "dangerouslySetInnerHTML":
                  if (c != null) throw Error(S(91));
                  break;
                default:
                  F(t, e, u, c, l, null);
              }
          U0(t, a, n, i);
          return;
        case "option":
          for (s in l)
            if (l.hasOwnProperty(s) && (a = l[s], a != null))
              switch (s) {
                case "selected":
                  t.selected = a && typeof a != "function" && typeof a != "symbol";
                  break;
                default:
                  F(t, e, s, a, l, null);
              }
          return;
        case "dialog":
          L("beforetoggle", t), L("toggle", t), L("cancel", t), L("close", t);
          break;
        case "iframe":
        case "object":
          L("load", t);
          break;
        case "video":
        case "audio":
          for (a = 0; a < ci.length; a++)
            L(ci[a], t);
          break;
        case "image":
          L("error", t), L("load", t);
          break;
        case "details":
          L("toggle", t);
          break;
        case "embed":
        case "source":
        case "link":
          L("error", t), L("load", t);
        case "area":
        case "base":
        case "br":
        case "col":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "track":
        case "wbr":
        case "menuitem":
          for (o in l)
            if (l.hasOwnProperty(o) && (a = l[o], a != null))
              switch (o) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(S(137, e));
                default:
                  F(t, e, o, a, l, null);
              }
          return;
        default:
          if (Hs(e)) {
            for (r in l)
              l.hasOwnProperty(r) && (a = l[r], a !== void 0 && xs(
                t,
                e,
                r,
                a,
                l,
                void 0
              ));
            return;
          }
      }
      for (c in l)
        l.hasOwnProperty(c) && (a = l[c], a != null && F(t, e, c, a, l, null));
    }
    var Cy = {};
    function Oy(t, e, l, a) {
      switch (e) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "input":
          var n = null, i = null, u = null, c = null, s = null, o = null, r = null;
          for (m in l) {
            var b = l[m];
            if (l.hasOwnProperty(m) && b != null)
              switch (m) {
                case "checked":
                  break;
                case "value":
                  break;
                case "defaultValue":
                  s = b;
                default:
                  a.hasOwnProperty(m) || F(t, e, m, null, a, b);
              }
          }
          for (var d in a) {
            var m = a[d];
            if (b = l[d], a.hasOwnProperty(d) && (m != null || b != null))
              switch (d) {
                case "type":
                  m !== b && (j = !0), i = m;
                  break;
                case "name":
                  m !== b && (j = !0), n = m;
                  break;
                case "checked":
                  m !== b && (j = !0), o = m;
                  break;
                case "defaultChecked":
                  m !== b && (j = !0), r = m;
                  break;
                case "value":
                  m !== b && (j = !0), u = m;
                  break;
                case "defaultValue":
                  m !== b && (j = !0), c = m;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (m != null)
                    throw Error(S(137, e));
                  break;
                default:
                  m !== b && F(
                    t,
                    e,
                    d,
                    m,
                    a,
                    b
                  );
              }
          }
          wo(
            t,
            u,
            c,
            s,
            o,
            r,
            i,
            n
          );
          return;
        case "select":
          m = u = c = d = null;
          for (i in l)
            if (s = l[i], l.hasOwnProperty(i) && s != null)
              switch (i) {
                case "value":
                  break;
                case "multiple":
                  m = s;
                default:
                  a.hasOwnProperty(i) || F(
                    t,
                    e,
                    i,
                    null,
                    a,
                    s
                  );
              }
          for (n in a)
            if (i = a[n], s = l[n], a.hasOwnProperty(n) && (i != null || s != null))
              switch (n) {
                case "value":
                  i !== s && (j = !0), d = i;
                  break;
                case "defaultValue":
                  i !== s && (j = !0), c = i;
                  break;
                case "multiple":
                  i !== s && (j = !0), u = i;
                default:
                  i !== s && F(
                    t,
                    e,
                    n,
                    i,
                    a,
                    s
                  );
              }
          e = c, l = u, a = m, d != null ? Za(t, !!l, d, !1) : !!a != !!l && (e != null ? Za(t, !!l, e, !0) : Za(t, !!l, l ? [] : "", !1));
          return;
        case "textarea":
          m = d = null;
          for (c in l)
            if (n = l[c], l.hasOwnProperty(c) && n != null && !a.hasOwnProperty(c))
              switch (c) {
                case "value":
                  break;
                case "children":
                  break;
                default:
                  F(t, e, c, null, a, n);
              }
          for (u in a)
            if (n = a[u], i = l[u], a.hasOwnProperty(u) && (n != null || i != null))
              switch (u) {
                case "value":
                  n !== i && (j = !0), d = n;
                  break;
                case "defaultValue":
                  n !== i && (j = !0), m = n;
                  break;
                case "children":
                  break;
                case "dangerouslySetInnerHTML":
                  if (n != null) throw Error(S(91));
                  break;
                default:
                  n !== i && F(t, e, u, n, a, i);
              }
          R0(t, d, m);
          return;
        case "option":
          for (var y in l)
            if (d = l[y], l.hasOwnProperty(y) && d != null && !a.hasOwnProperty(y))
              switch (y) {
                case "selected":
                  t.selected = !1;
                  break;
                default:
                  F(
                    t,
                    e,
                    y,
                    null,
                    a,
                    d
                  );
              }
          for (s in a)
            if (d = a[s], m = l[s], a.hasOwnProperty(s) && d !== m && (d != null || m != null))
              switch (s) {
                case "selected":
                  d !== m && (j = !0), t.selected = d && typeof d != "function" && typeof d != "symbol";
                  break;
                default:
                  F(
                    t,
                    e,
                    s,
                    d,
                    a,
                    m
                  );
              }
          return;
        case "img":
        case "link":
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
        case "menuitem":
          for (var N in l)
            d = l[N], l.hasOwnProperty(N) && d != null && !a.hasOwnProperty(N) && F(t, e, N, null, a, d);
          for (o in a)
            if (d = a[o], m = l[o], a.hasOwnProperty(o) && d !== m && (d != null || m != null))
              switch (o) {
                case "children":
                case "dangerouslySetInnerHTML":
                  if (d != null)
                    throw Error(S(137, e));
                  break;
                default:
                  F(
                    t,
                    e,
                    o,
                    d,
                    a,
                    m
                  );
              }
          return;
        default:
          if (Hs(e)) {
            for (var _ in l)
              d = l[_], l.hasOwnProperty(_) && d !== void 0 && !a.hasOwnProperty(_) && xs(
                t,
                e,
                _,
                void 0,
                a,
                d
              );
            for (r in a)
              d = a[r], m = l[r], !a.hasOwnProperty(r) || d === m || d === void 0 && m === void 0 || xs(
                t,
                e,
                r,
                d,
                a,
                m
              );
            return;
          }
      }
      for (var h in l)
        d = l[h], l.hasOwnProperty(h) && d != null && !a.hasOwnProperty(h) && F(t, e, h, null, a, d);
      for (b in a)
        d = a[b], m = l[b], !a.hasOwnProperty(b) || d === m || d == null && m == null || F(t, e, b, d, a, m);
    }
    function jd(t) {
      switch (t) {
        case "css":
        case "script":
        case "font":
        case "img":
        case "image":
        case "input":
        case "link":
          return !0;
        default:
          return !1;
      }
    }
    function zy() {
      if (typeof performance.getEntriesByType == "function") {
        for (var t = 0, e = 0, l = performance.getEntriesByType("resource"), a = 0; a < l.length; a++) {
          var n = l[a], i = n.transferSize, u = n.initiatorType, c = n.duration;
          if (i && c && jd(u)) {
            for (u = 0, c = n.responseEnd, a += 1; a < l.length; a++) {
              var s = l[a], o = s.startTime;
              if (o > c) break;
              var r = s.transferSize, b = s.initiatorType;
              r && jd(b) && (s = s.responseEnd, u += r * (s < c ? 1 : (c - o) / (s - o)));
            }
            if (--a, e += 8 * (i + u) / (n.duration / 1e3), t++, 10 < t) break;
          }
        }
        if (0 < t) return e / t / 1e6;
      }
      return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
    }
    var Ss = null, Ts = null;
    function si(t) {
      return t.nodeType === 9 ? t : t.ownerDocument;
    }
    function Xd(t) {
      switch (t) {
        case "http://www.w3.org/2000/svg":
          return 1;
        case "http://www.w3.org/1998/Math/MathML":
          return 2;
        default:
          return 0;
      }
    }
    function Yh(t, e) {
      if (t === 0)
        switch (e) {
          case "svg":
            return 1;
          case "math":
            return 2;
          default:
            return 0;
        }
      return t === 1 && e === "foreignObject" ? 0 : t;
    }
    function qh(t, e, l, a) {
      return l = si(
        l
      ).createElement(t), l[zt] = a, l[It] = e, Ut(l, t, e), Mt(l), l;
    }
    function Ns(t, e) {
      return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
    }
    var yo = null;
    function Dy() {
      var t = window.event;
      return t && t.type === "popstate" ? t === yo ? !1 : (yo = t, !0) : (yo = null, !1);
    }
    var Nf = typeof setTimeout == "function" ? setTimeout : void 0, wy = typeof clearTimeout == "function" ? clearTimeout : void 0, Vd = typeof Promise == "function" ? Promise : void 0, Qd = typeof requestAnimationFrame == "function" ? requestAnimationFrame : Nf, Ry = typeof queueMicrotask == "function" ? queueMicrotask : typeof Vd < "u" ? function(t) {
      return Vd.resolve(null).then(t).catch(Uy);
    } : Nf;
    function Uy(t) {
      setTimeout(function() {
        throw t;
      });
    }
    function Zl(t) {
      return t === "head";
    }
    function Zd(t, e) {
      var l = e, a = 0;
      do {
        var n = l.nextSibling;
        if (t.removeChild(l), n && n.nodeType === 8)
          if (l = n.data, l === "/$" || l === "/&") {
            if (a === 0) {
              t.removeChild(n), mn(e);
              return;
            }
            a--;
          } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
            a++;
          else if (l === "html")
            po(
              t.ownerDocument.documentElement
            );
          else if (l === "head") {
            l = t.ownerDocument.head, po(l);
            for (var i = l.firstChild; i; ) {
              var u = i.nextSibling, c = i.nodeName;
              i[gi] || c === "SCRIPT" || c === "STYLE" || c === "LINK" && i.rel.toLowerCase() === "stylesheet" || l.removeChild(i), i = u;
            }
          } else
            l === "body" && po(t.ownerDocument.body);
        l = n;
      } while (l);
      mn(e);
    }
    function Kd(t, e) {
      var l = t;
      t = 0;
      do {
        var a = l.nextSibling;
        if (l.nodeType === 1 ? e ? (l._stashedDisplay = l.style.display, l.style.display = "none") : (l.style.display = l._stashedDisplay || "", l.getAttribute("style") === "" && l.removeAttribute("style")) : l.nodeType === 3 && (e ? (l._stashedText = l.nodeValue, l.nodeValue = "") : l.nodeValue = l._stashedText || ""), a && a.nodeType === 8)
          if (l = a.data, l === "/$") {
            if (t === 0) break;
            t--;
          } else
            l !== "$" && l !== "$?" && l !== "$~" && l !== "$!" || t++;
        l = a;
      } while (l);
    }
    function jh(t, e, l) {
      if (e = CSS.escape(e) !== e ? "r-" + btoa(e).replace(/=/g, "") : e, t.style.viewTransitionName = e, l != null && (t.style.viewTransitionClass = l), l = getComputedStyle(t), l.display === "inline") {
        if (e = t.getClientRects(), e.length === 1) var a = 1;
        else
          for (var n = a = 0; n < e.length; n++) {
            var i = e[n];
            0 < i.width && 0 < i.height && a++;
          }
        a === 1 && (t = t.style, t.display = e.length === 1 ? "inline-block" : "block", t.marginTop = "-" + l.paddingTop, t.marginBottom = "-" + l.paddingBottom);
      }
    }
    function Xh(t, e) {
      t = t.style, e = e.style;
      var l = e != null ? e.hasOwnProperty("viewTransitionName") ? e.viewTransitionName : e.hasOwnProperty("view-transition-name") ? e["view-transition-name"] : null : null;
      t.viewTransitionName = l == null || typeof l == "boolean" ? "" : ("" + l).trim(), l = e != null ? e.hasOwnProperty("viewTransitionClass") ? e.viewTransitionClass : e.hasOwnProperty("view-transition-class") ? e["view-transition-class"] : null : null, t.viewTransitionClass = l == null || typeof l == "boolean" ? "" : ("" + l).trim(), t.display === "inline-block" && (e == null ? t.display = t.margin = "" : (l = e.display, t.display = l == null || typeof l == "boolean" ? "" : l, l = e.margin, l != null ? t.margin = l : (l = e.hasOwnProperty("marginTop") ? e.marginTop : e["margin-top"], t.marginTop = l == null || typeof l == "boolean" ? "" : l, e = e.hasOwnProperty("marginBottom") ? e.marginBottom : e["margin-bottom"], t.marginBottom = e == null || typeof e == "boolean" ? "" : e)));
    }
    function Vh(t, e, l) {
      return l = l.ownerDocument.defaultView, {
        rect: t,
        abs: e.position === "absolute" || e.position === "fixed",
        clip: e.clipPath !== "none" || e.overflow !== "visible" || e.filter !== "none" || e.mask !== "none" || e.mask !== "none" || e.borderRadius !== "0px",
        view: 0 <= t.bottom && 0 <= t.right && t.top <= l.innerHeight && t.left <= l.innerWidth
      };
    }
    function Ms(t) {
      var e = t.getBoundingClientRect(), l = getComputedStyle(t);
      return Vh(e, l, t);
    }
    function By(t) {
      var e = t.getBoundingClientRect();
      e = new DOMRect(
        e.x + 2e4,
        e.y + 2e4,
        e.width,
        e.height
      );
      var l = getComputedStyle(t);
      return Vh(e, l, t);
    }
    function Hy(t) {
      return t.documentElement.clientHeight;
    }
    function Gy(t) {
      this.addEventListener("load", t), this.addEventListener("error", t);
    }
    function Ly(t, e, l, a, n, i, u, c, s) {
      var o = e.nodeType === 9 ? e : e.ownerDocument;
      try {
        var r = o.startViewTransition({
          update: function() {
            var d = o.defaultView, m = d.navigation && d.navigation.transition, y = o.fonts.status;
            a();
            var N = [];
            if (y === "loaded" && (Hy(o), o.fonts.status === "loading" && N.push(o.fonts.ready)), y = N.length, t !== null)
              for (var _ = t.suspenseyImages, h = 0, f = 0; f < _.length; f++) {
                var v = _[f];
                if (!v.complete) {
                  var x = v.getBoundingClientRect();
                  if (0 < x.bottom && 0 < x.right && x.top < d.innerHeight && x.left < d.innerWidth) {
                    if (h += e1(v), h > yu) {
                      N.length = y;
                      break;
                    }
                    v = new Promise(
                      Gy.bind(v)
                    ), N.push(v);
                  }
                }
              }
            if (0 < N.length)
              return d = Promise.race([
                Promise.all(N),
                new Promise(function(M) {
                  return setTimeout(M, 500);
                })
              ]).then(n, n), (m ? Promise.allSettled([m.finished, d]) : d).then(i, i);
            if (n(), m)
              return m.finished.then(
                i,
                i
              );
            i();
          },
          types: l
        });
        o.__reactViewTransition = r;
        var b = [];
        return r.ready.then(
          function() {
            for (var d = o.documentElement.getAnimations({
              subtree: !0
            }), m = 0; m < d.length; m++) {
              var y = d[m], N = y.effect, _ = N.pseudoElement;
              if (_ != null && _.startsWith("::view-transition")) {
                b.push(y), y = N.getKeyframes();
                for (var h = _ = void 0, f = !0, v = 0; v < y.length; v++) {
                  var x = y[v], M = x.width;
                  if (_ === void 0) _ = M;
                  else if (_ !== M) {
                    f = !1;
                    break;
                  }
                  if (M = x.height, h === void 0) h = M;
                  else if (h !== M) {
                    f = !1;
                    break;
                  }
                  delete x.width, delete x.height, x.transform === "none" && delete x.transform;
                }
                f && _ !== void 0 && h !== void 0 && (N.setKeyframes(y), f = getComputedStyle(
                  N.target,
                  N.pseudoElement
                ), f.width !== _ || f.height !== h) && (f = y[0], f.width = _, f.height = h, f = y[y.length - 1], f.width = _, f.height = h, N.setKeyframes(y));
              }
            }
            u();
          },
          function(d) {
            o.__reactViewTransition === r && (o.__reactViewTransition = null);
            try {
              if (typeof d == "object" && d !== null)
                switch (d.name) {
                  case "InvalidStateError":
                    (d.message === "View transition was skipped because document visibility state is hidden." || d.message === "Skipping view transition because document visibility state has become hidden." || d.message === "Skipping view transition because viewport size changed." || d.message === "Transition was aborted because of invalid state") && (d = null);
                }
              d !== null && s(d);
            } finally {
              a(), n(), u();
            }
          }
        ), r.finished.finally(function() {
          for (var d = 0; d < b.length; d++)
            b[d].cancel();
          o.__reactViewTransition === r && (o.__reactViewTransition = null), c();
        }), r;
      } catch {
        return a(), n(), u(), null;
      }
    }
    function ea(t, e) {
      this._scope = document.documentElement, this._selector = "::view-transition-" + t + "(" + e + ")";
    }
    ea.prototype.animate = function(t, e) {
      return e = typeof e == "number" ? { duration: e } : tt({}, e), e.pseudoElement = this._selector, this._scope.animate(t, e);
    };
    ea.prototype.getAnimations = function() {
      for (var t = this._scope, e = this._selector, l = t.getAnimations({ subtree: !0 }), a = [], n = 0; n < l.length; n++) {
        var i = l[n].effect;
        i !== null && i.target === t && i.pseudoElement === e && a.push(l[n]);
      }
      return a;
    };
    ea.prototype.getComputedStyle = function() {
      return getComputedStyle(this._scope, this._selector);
    };
    function Qh(t) {
      return {
        name: t,
        group: new ea("group", t),
        imagePair: new ea("image-pair", t),
        old: new ea("old", t),
        new: new ea("new", t)
      };
    }
    function me(t) {
      this._fragmentFiber = t, this._observers = this._eventListeners = null;
    }
    me.prototype.addEventListener = function(t, e, l) {
      var a = null, n = null;
      if (!(l != null && typeof l != "boolean" && (a = l.signal || null, a !== null && a.aborted))) {
        this._eventListeners === null && (this._eventListeners = []);
        var i = this._eventListeners;
        if (Zh(i, t, e, l) === -1) {
          var u = this, c = e;
          l != null && typeof l != "boolean" && l.once === !0 && (c = function(s) {
            u.removeEventListener(
              t,
              e,
              l
            ), typeof e == "function" ? e.call(this, s) : e.handleEvent(s);
          }), a !== null && (n = u.removeEventListener.bind(
            u,
            t,
            e,
            l
          ), a.addEventListener("abort", n, { once: !0 }), n = a.removeEventListener.bind(a, "abort", n)), a = sn(l), i.push({
            type: t,
            listener: e,
            optionsOrUseCapture: l,
            attachedListener: c,
            cleanup: n
          }), Wt(
            this._fragmentFiber.child,
            !1,
            Yy,
            t,
            c,
            a
          );
        }
        this._eventListeners = i;
      }
    };
    function Yy(t, e, l, a) {
      return pt(t).addEventListener(
        e,
        l,
        a
      ), !1;
    }
    me.prototype.removeEventListener = function(t, e, l) {
      var a = this._eventListeners;
      if (a !== null && (e = Zh(
        a,
        t,
        e,
        l
      ), e !== -1)) {
        var n = a[e];
        l = n.attachedListener;
        var i = n.cleanup;
        n = sn(n.optionsOrUseCapture), Wt(
          this._fragmentFiber.child,
          !1,
          qy,
          t,
          l,
          n
        ), a.splice(e, 1), i !== null && i();
      }
    };
    function qy(t, e, l, a) {
      return pt(t).removeEventListener(
        e,
        l,
        a
      ), !1;
    }
    function sn(t) {
      return t != null && typeof t != "boolean" && (t.once === !0 || t.signal instanceof AbortSignal) ? { capture: t.capture, passive: t.passive } : t;
    }
    function kd(t) {
      return t == null ? "c=0" : typeof t == "boolean" ? "c=" + (t ? "1" : "0") : "c=" + (t.capture ? "1" : "0");
    }
    function Zh(t, e, l, a) {
      if (t.length === 0) return -1;
      a = kd(a);
      for (var n = 0; n < t.length; n++) {
        var i = t[n];
        if (i.type === e && i.listener === l && kd(i.optionsOrUseCapture) === a)
          return n;
      }
      return -1;
    }
    me.prototype.dispatchEvent = function(t) {
      var e = ba(
        this._fragmentFiber
      );
      if (e === null) return !0;
      e = pt(e);
      var l = this._eventListeners;
      if (l !== null && 0 < l.length || !t.bubbles) {
        var a = e.nodeType === 9 ? e.createComment("") : document.createTextNode("");
        if (l)
          for (var n = 0; n < l.length; n++) {
            var i = l[n];
            a.addEventListener(
              i.type,
              i.attachedListener,
              sn(i.optionsOrUseCapture)
            );
          }
        if (e.appendChild(a), t = a.dispatchEvent(t), l)
          for (n = 0; n < l.length; n++)
            i = l[n], a.removeEventListener(
              i.type,
              i.attachedListener,
              sn(i.optionsOrUseCapture)
            );
        return e.removeChild(a), t;
      }
      return e.dispatchEvent(t);
    };
    me.prototype.focus = function(t) {
      Wt(
        this._fragmentFiber.child,
        !0,
        Kh,
        t,
        void 0,
        void 0
      );
    };
    function Kh(t, e) {
      return t.tag === 6 ? !1 : (t = pt(t), Iy(t, e));
    }
    me.prototype.focusLast = function(t) {
      var e = [];
      Wt(
        this._fragmentFiber.child,
        !0,
        Mf,
        e,
        void 0,
        void 0
      );
      for (var l = e.length - 1; 0 <= l && !Kh(e[l], t); l--) ;
    };
    function Mf(t, e) {
      return e.push(t), !1;
    }
    me.prototype.blur = function() {
      var t = ba(
        this._fragmentFiber
      );
      t !== null && (t = pt(t), t = si(t).activeElement, t !== null && Wt(
        this._fragmentFiber.child,
        !1,
        jy,
        t,
        void 0,
        void 0
      ));
    };
    function jy(t, e) {
      return t.tag === 6 ? !1 : (t = pt(t), t === e || t.contains(e) ? (e.blur(), !0) : !1);
    }
    me.prototype.observeUsing = function(t) {
      this._observers === null && (this._observers =  new Set()), this._observers.add(t), Wt(
        this._fragmentFiber.child,
        !1,
        Xy,
        t,
        void 0,
        void 0
      );
    };
    function Xy(t, e) {
      return t.tag === 6 || (t = pt(t), e.observe(t)), !1;
    }
    me.prototype.unobserveUsing = function(t) {
      var e = this._observers;
      if (e !== null && e.has(t)) {
        e.delete(t), Wt(
          this._fragmentFiber.child,
          !1,
          Vy,
          t,
          void 0,
          void 0
        );
        for (var l = e = 0; l < ze.length; l++) {
          var a = ze[l];
          a.fragmentInstance === this && a.observer === t ? t.unobserve(a.instance) : ze[e++] = a;
        }
        ze.length = e;
      }
    };
    function Vy(t, e) {
      return t.tag === 6 || (t = pt(t), e.unobserve(t)), !1;
    }
    var ze = [], go = !1;
    function Qy(t, e, l) {
      ze.push({
        fragmentInstance: t,
        observer: e,
        instance: l
      }), go || (go = !0, Py(function() {
        go = !1;
        var a = ze;
        ze = [];
        for (var n = 0; n < a.length; n++) {
          var i = a[n];
          i.observer.unobserve(i.instance);
        }
      }));
    }
    me.prototype.getClientRects = function() {
      var t = [];
      return Wt(
        this._fragmentFiber.child,
        !1,
        Zy,
        t,
        void 0,
        void 0
      ), t;
    };
    function Zy(t, e) {
      if (t.tag === 6) {
        t = t.stateNode;
        var l = t.ownerDocument.createRange();
        l.selectNodeContents(t), e.push.apply(e, l.getClientRects());
      } else
        t = pt(t), e.push.apply(e, t.getClientRects());
      return !1;
    }
    me.prototype.getRootNode = function(t) {
      var e = ba(
        this._fragmentFiber
      );
      return e === null ? this : pt(e).getRootNode(t);
    };
    me.prototype.compareDocumentPosition = function(t) {
      var e = ba(
        this._fragmentFiber
      );
      if (e === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
      var l = [];
      Wt(
        this._fragmentFiber.child,
        !1,
        Mf,
        l,
        void 0,
        void 0
      );
      var a = pt(e);
      if (l.length === 0) {
        if (l = a, Er(this._fragmentFiber)) {
          t: {
            for (e = this._fragmentFiber.return; e !== null; ) {
              if (e.tag === 4) {
                e = e.stateNode.containerInfo;
                break t;
              }
              if (e.tag === 3 || e.tag === 5 || e.tag === 27)
                break;
              e = e.return;
            }
            e = null;
          }
          e != null && (l = e);
        }
        e = this._fragmentFiber;
        var n = a = l.compareDocumentPosition(t);
        return l === t ? n = Node.DOCUMENT_POSITION_CONTAINS : a & Node.DOCUMENT_POSITION_CONTAINED_BY && (l = h0(e)[1], l === null ? n = Node.DOCUMENT_POSITION_PRECEDING : (t = pt(l).compareDocumentPosition(
          t
        ), n = t === 0 || t & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), n |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
      }
      e = pt(l[0]), n = pt(l[l.length - 1]);
      var i = Er(this._fragmentFiber) ? e.parentElement : a;
      if (i == null)
        return Node.DOCUMENT_POSITION_DISCONNECTED;
      a = i.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY, i = i.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY;
      var u = e.compareDocumentPosition(t), c = n.compareDocumentPosition(t), s = u & Node.DOCUMENT_POSITION_CONTAINED_BY || c & Node.DOCUMENT_POSITION_CONTAINED_BY;
      return c = a && i && u & Node.DOCUMENT_POSITION_FOLLOWING && c & Node.DOCUMENT_POSITION_PRECEDING, e = a && e === t || i && n === t || s || c ? Node.DOCUMENT_POSITION_CONTAINED_BY : !a && e === t || !i && n === t ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : u, e & Node.DOCUMENT_POSITION_DISCONNECTED || e & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || Ky(
        e,
        this._fragmentFiber,
        l[0],
        l[l.length - 1],
        t
      ) ? e : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    };
    function Ky(t, e, l, a, n) {
      var i = ta(n);
      if (t & Node.DOCUMENT_POSITION_CONTAINED_BY) {
        if (l = !!i)
          t: {
            for (; i !== null; ) {
              if (i.tag === 7 && (i === e || i.alternate === e)) {
                l = !0;
                break t;
              }
              i = i.return;
            }
            l = !1;
          }
        return l;
      }
      if (t & Node.DOCUMENT_POSITION_CONTAINS) {
        if (i === null)
          return i = n.ownerDocument, n === i || n === i.documentElement || n === i.body;
        t: {
          for (i = e, e = ba(e); i !== null; ) {
            if (!(i.tag !== 5 && i.tag !== 3 && i.tag !== 27 || i !== e && i.alternate !== e)) {
              i = !0;
              break t;
            }
            i = i.return;
          }
          i = !1;
        }
        return i;
      }
      return t & Node.DOCUMENT_POSITION_PRECEDING ? ((e = !!i) && !(e = i === l) && (e = So(
        l,
        i,
        Ar
      ), e === null ? e = !1 : (Wt(
        e,
        !0,
        Tb,
        i,
        l
      ), i = wa, wa = null, e = i !== null)), e) : t & Node.DOCUMENT_POSITION_FOLLOWING ? ((e = !!i) && !(e = i === a) && (e = So(
        a,
        i,
        Ar
      ), e === null ? e = !1 : (Wt(
        e,
        !0,
        Nb,
        i,
        a
      ), i = wa, xo = wa = null, e = i !== null)), e) : !1;
    }
    function Jd(t, e) {
      var l = t.ownerDocument.createRange();
      l.selectNodeContents(t), t = l.getBoundingClientRect(), window.scrollTo(
        window.scrollX + t.left,
        e ? window.scrollY + t.top : window.scrollY + t.bottom - window.innerHeight
      );
    }
    me.prototype.scrollIntoView = function(t) {
      if (typeof t == "object") throw Error(S(566));
      var e = [];
      Wt(
        this._fragmentFiber.child,
        !1,
        Mf,
        e,
        void 0,
        void 0
      );
      var l = t !== !1;
      if (e.length === 0) {
        var a = h0(
          this._fragmentFiber
        );
        if (a = l ? a[1] || a[0] || ba(this._fragmentFiber) : a[0] || a[1], a === null) return;
        if (a.tag === 6) {
          t = pt(a), Jd(t, l);
          return;
        }
        if (a = pt(a), a.nodeType !== 9) {
          if (a.nodeType === 11) {
            l = "host" in a ? a.host : null, l !== null && l.scrollIntoView(t);
            return;
          }
          a.scrollIntoView(t);
        }
      }
      for (a = l ? e.length - 1 : 0; a !== (l ? -1 : e.length); ) {
        var n = e[a];
        n.tag === 6 ? (n = pt(n), Jd(n, l)) : pt(n).scrollIntoView(t), a += l ? -1 : 1;
      }
    };
    function ky(t, e) {
      return t = pt(t), kh(t, e), !1;
    }
    function kh(t, e) {
      t.reactFragments == null && (t.reactFragments =  new Set()), t.reactFragments.add(e);
    }
    function Jh(t, e) {
      var l = e._eventListeners;
      if (l !== null)
        for (var a = 0; a < l.length; a++) {
          var n = l[a];
          t.addEventListener(
            n.type,
            n.attachedListener,
            sn(n.optionsOrUseCapture)
          );
        }
      t.nodeType !== 3 && (l = e._observers, l !== null && l.forEach(function(i) {
        for (var u = 0, c = 0; c < ze.length; c++) {
          var s = ze[c];
          (s.fragmentInstance !== e || s.observer !== i || s.instance !== t) && (ze[u++] = s);
        }
        ze.length = u, i.observe(t);
      }), kh(t, e));
    }
    function Jy(t, e) {
      var l = e._eventListeners;
      if (l !== null)
        for (var a = 0; a < l.length; a++) {
          var n = l[a];
          t.removeEventListener(
            n.type,
            n.attachedListener,
            sn(n.optionsOrUseCapture)
          );
        }
      t.nodeType !== 3 && (l = e._observers, l !== null && l.forEach(function(i) {
        typeof i.rootMargin == "string" ? Qy(
          e,
          i,
          t
        ) : i.unobserve(t);
      }), t.reactFragments != null && t.reactFragments.delete(e));
    }
    function _s(t) {
      var e = t.firstChild;
      for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
        var l = e;
        switch (e = e.nextSibling, l.nodeName) {
          case "HTML":
          case "HEAD":
          case "BODY":
            _s(l), $u(l);
            continue;
          case "SCRIPT":
          case "STYLE":
            continue;
          case "LINK":
            if (l.rel.toLowerCase() === "stylesheet") continue;
        }
        t.removeChild(l);
      }
    }
    function Fy(t, e, l, a) {
      for (; t.nodeType === 1; ) {
        var n = l;
        if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
          if (!a && (t.nodeName !== "INPUT" || t.type !== "hidden"))
            break;
        } else if (a) {
          if (!t[gi])
            switch (e) {
              case "meta":
                if (!t.hasAttribute("itemprop")) break;
                return t;
              case "link":
                if (i = t.getAttribute("rel"), i === "stylesheet" && t.hasAttribute("data-precedence"))
                  break;
                if (i !== n.rel || t.getAttribute("href") !== (n.href == null || n.href === "" ? null : n.href) || t.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin) || t.getAttribute("title") !== (n.title == null ? null : n.title))
                  break;
                return t;
              case "style":
                if (t.hasAttribute("data-precedence")) break;
                return t;
              case "script":
                if (i = t.getAttribute("src"), (i !== (n.src == null ? null : n.src) || t.getAttribute("type") !== (n.type == null ? null : n.type) || t.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin)) && i && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                  break;
                return t;
              default:
                return t;
            }
        } else if (e === "input" && t.type === "hidden") {
          var i = n.name == null ? null : "" + n.name;
          if (n.type === "hidden" && t.getAttribute("name") === i)
            return t;
        } else return t;
        if (t = Me(t.nextSibling), t === null) break;
      }
      return null;
    }
    function $y(t, e, l) {
      if (e === "") return null;
      for (; t.nodeType !== 3; )
        if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = Me(t.nextSibling), t === null)) return null;
      return t;
    }
    function Fh(t, e) {
      for (; t.nodeType !== 8; )
        if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Me(t.nextSibling), t === null)) return null;
      return t;
    }
    function Es(t) {
      return t.data === "$?" || t.data === "$~";
    }
    function _f(t) {
      return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
    }
    function Wy(t, e) {
      var l = t.ownerDocument;
      if (t.data === "$~") t._reactRetry = e;
      else if (t.data !== "$?" || l.readyState !== "loading")
        e();
      else {
        var a = function() {
          e(), l.removeEventListener("DOMContentLoaded", a);
        };
        l.addEventListener("DOMContentLoaded", a), t._reactRetry = a;
      }
    }
    function Me(t) {
      for (; t != null; t = t.nextSibling) {
        var e = t.nodeType;
        if (e === 1 || e === 3) break;
        if (e === 8) {
          if (e = t.data, e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&" || e === "F!" || e === "F")
            break;
          if (e === "/$" || e === "/&") return null;
        }
      }
      return t;
    }
    var As = null;
    function Fd(t) {
      t = t.nextSibling;
      for (var e = 0; t; ) {
        if (t.nodeType === 8) {
          var l = t.data;
          if (l === "/$" || l === "/&") {
            if (e === 0)
              return Me(t.nextSibling);
            e--;
          } else
            l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || e++;
        }
        t = t.nextSibling;
      }
      return null;
    }
    function $d(t) {
      t = t.previousSibling;
      for (var e = 0; t; ) {
        if (t.nodeType === 8) {
          var l = t.data;
          if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
            if (e === 0) return t;
            e--;
          } else l !== "/$" && l !== "/&" || e++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function Iy(t, e) {
      function l() {
        a = !0;
      }
      if (t.ownerDocument.activeElement === t) return !0;
      var a = !1;
      try {
        t.ownerDocument.addEventListener("focus", l, !0), (t.focus || HTMLElement.prototype.focus).call(t, e);
      } finally {
        t.ownerDocument.removeEventListener("focus", l, !0);
      }
      return a;
    }
    function Py(t) {
      Qd(function() {
        Qd(function(e) {
          return t(e);
        });
      });
    }
    function $h(t, e, l) {
      switch (e = si(l), t) {
        case "html":
          if (t = e.documentElement, !t) throw Error(S(452));
          return t;
        case "head":
          if (t = e.head, !t) throw Error(S(453));
          return t;
        case "body":
          if (t = e.body, !t) throw Error(S(454));
          return t;
        default:
          throw Error(S(451));
      }
    }
    function Wh(t, e, l) {
      for (var a in l) {
        var n = l[a];
        l.hasOwnProperty(a) && n != null && F(t, e, a, null, Cy, n);
      }
      l.dangerouslySetInnerHTML != null && (t.textContent = ""), t.onclick === Ve && (t.onclick = null), $u(t);
    }
    function po(t) {
      for (var e = t.attributes; e.length; )
        t.removeAttributeNode(e[0]);
      $u(t);
    }
    var _e =  new Map(), Wd =  new Set();
    function fi(t) {
      if (typeof t.getRootNode == "function") {
        var e = t.getRootNode();
        if (e.nodeType === 9 || e.nodeType === 11) return e;
      }
      return t.nodeType === 9 ? t : t.ownerDocument;
    }
    var ml = Z.d;
    Z.d = {
      f: tg,
      r: eg,
      D: lg,
      C: ag,
      L: ng,
      m: ig,
      X: cg,
      S: ug,
      M: og
    };
    function tg() {
      var t = ml.f(), e = fc();
      return t || e;
    }
    function eg(t) {
      var e = bn(t);
      e !== null && e.tag === 5 && e.type === "form" ? Bm(e) : ml.r(t);
    }
    var pn = typeof document > "u" ? null : document;
    function Ih(t, e, l) {
      var a = pn;
      if (a && typeof e == "string" && e) {
        var n = Se(e);
        n = 'link[rel="' + t + '"][href="' + n + '"]', typeof l == "string" && (n += '[crossorigin="' + l + '"]'), Wd.has(n) || (Wd.add(n), t = { rel: t, crossOrigin: l, href: e }, a.querySelector(n) === null && (e = a.createElement("link"), Ut(e, "link", t), Mt(e), a.head.appendChild(e)));
      }
    }
    function lg(t) {
      ml.D(t), Ih("dns-prefetch", t, null);
    }
    function ag(t, e) {
      ml.C(t, e), Ih("preconnect", t, e);
    }
    function ng(t, e, l) {
      ml.L(t, e, l);
      var a = pn;
      if (a && t && e) {
        var n = 'link[rel="preload"][as="' + Se(e) + '"]';
        e === "image" && l && l.imageSrcSet ? (n += '[imagesrcset="' + Se(
          l.imageSrcSet
        ) + '"]', typeof l.imageSizes == "string" && (n += '[imagesizes="' + Se(
          l.imageSizes
        ) + '"]')) : n += '[href="' + Se(t) + '"]';
        var i = n;
        switch (e) {
          case "style":
            i = fn(t);
            break;
          case "script":
            i = xn(t);
        }
        if (!(_e.has(i) || (t = tt(
          {
            rel: "preload",
            href: e === "image" && l && l.imageSrcSet ? void 0 : t,
            as: e
          },
          l
        ), _e.set(i, t), a.querySelector(n) !== null || e === "style" && a.querySelector(Mi(i)) || e === "script" && a.querySelector(_i(i))))) {
          var u = a.createElement("link");
          Ut(u, "link", t), e === "style" && (u[Mu] = !0, u.onload = u.onerror = function() {
            A0(u);
          }), Mt(u), a.head.appendChild(u);
        }
      }
    }
    function ig(t, e) {
      ml.m(t, e);
      var l = pn;
      if (l && t) {
        var a = e && typeof e.as == "string" ? e.as : "script", n = 'link[rel="modulepreload"][as="' + Se(a) + '"][href="' + Se(t) + '"]', i = n;
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            i = xn(t);
        }
        if (!_e.has(i) && (t = tt({ rel: "modulepreload", href: t }, e), _e.set(i, t), l.querySelector(n) === null)) {
          switch (a) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
              if (l.querySelector(_i(i)))
                return;
          }
          a = l.createElement("link"), Ut(a, "link", t), Mt(a), l.head.appendChild(a);
        }
      }
    }
    function ug(t, e, l) {
      ml.S(t, e, l);
      var a = pn;
      if (a && t) {
        var n = Qa(a).hoistableStyles, i = fn(t);
        e = e || "default";
        var u = n.get(i);
        if (!u) {
          var c = { loading: 0, preload: null };
          if (u = a.querySelector(
            Mi(i)
          ))
            c.loading = 5;
          else {
            t = tt(
              { rel: "stylesheet", href: t, "data-precedence": e },
              l
            ), (l = _e.get(i)) && Ef(t, l);
            var s = u = a.createElement("link");
            Mt(s), Ut(s, "link", t), s._p = new Promise(function(o, r) {
              s.onload = o, s.onerror = r;
            }), s.addEventListener("load", function() {
              c.loading |= 1;
            }), s.addEventListener("error", function() {
              c.loading |= 2;
            }), c.loading |= 4, bu(u, e, a);
          }
          u = {
            type: "stylesheet",
            instance: u,
            count: 1,
            state: c
          }, n.set(i, u);
        }
      }
    }
    function cg(t, e) {
      ml.X(t, e);
      var l = pn;
      if (l && t) {
        var a = Qa(l).hoistableScripts, n = xn(t), i = a.get(n);
        i || (i = l.querySelector(_i(n)), i || (t = tt({ src: t, async: !0 }, e), (e = _e.get(n)) && Af(t, e), i = l.createElement("script"), Mt(i), Ut(i, "link", t), l.head.appendChild(i)), i = {
          type: "script",
          instance: i,
          count: 1,
          state: null
        }, a.set(n, i));
      }
    }
    function og(t, e) {
      ml.M(t, e);
      var l = pn;
      if (l && t) {
        var a = Qa(l).hoistableScripts, n = xn(t), i = a.get(n);
        i || (i = l.querySelector(_i(n)), i || (t = tt({ src: t, async: !0, type: "module" }, e), (e = _e.get(n)) && Af(t, e), i = l.createElement("script"), Mt(i), Ut(i, "link", t), l.head.appendChild(i)), i = {
          type: "script",
          instance: i,
          count: 1,
          state: null
        }, a.set(n, i));
      }
    }
    function Id(t, e, l, a) {
      var n = (n = Ol.current) ? fi(n) : null;
      if (!n) throw Error(S(446));
      switch (t) {
        case "meta":
        case "title":
          return null;
        case "style":
          return typeof l.precedence == "string" && typeof l.href == "string" ? (l = fn(l.href), e = Qa(
            n
          ).hoistableStyles, a = e.get(l), a || (a = {
            type: "style",
            instance: null,
            count: 0,
            state: null
          }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
        case "link":
          if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
            t = fn(l.href);
            var i = Qa(
              n
            ).hoistableStyles, u = i.get(t);
            if (u || (n = n.ownerDocument || n, u = {
              type: "stylesheet",
              instance: null,
              count: 0,
              state: { loading: 0, preload: null }
            }, i.set(t, u), (i = n.querySelector(
              Mi(t)
            )) ? i._p || (u.instance = i, u.state.loading = 5) : (i = _e.get(t), i || (i = {
              rel: "preload",
              as: "style",
              href: l.href,
              crossOrigin: l.crossOrigin,
              integrity: l.integrity,
              media: l.media,
              hrefLang: l.hrefLang,
              referrerPolicy: l.referrerPolicy
            }, _e.set(t, i)), sg(
              n,
              t,
              i,
              u.state
            ))), e && a === null)
              throw Error(S(528, ""));
            return u;
          }
          if (e && a !== null)
            throw Error(S(529, ""));
          return null;
        case "script":
          return e = l.async, l = l.src, typeof l == "string" && e && typeof e != "function" && typeof e != "symbol" ? (l = xn(l), e = Qa(
            n
          ).hoistableScripts, a = e.get(l), a || (a = {
            type: "script",
            instance: null,
            count: 0,
            state: null
          }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
        default:
          throw Error(S(444, t));
      }
    }
    function fn(t) {
      return 'href="' + Se(t) + '"';
    }
    function Mi(t) {
      return 'link[rel="stylesheet"][' + t + "]";
    }
    function Ph(t) {
      return tt({}, t, {
        "data-precedence": t.precedence,
        precedence: null
      });
    }
    function sg(t, e, l, a) {
      if (e = t.querySelector(
        'link[rel="preload"][as="style"][' + e + "]"
      )) {
        if (e[Mu] !== !0) {
          a.loading = 1;
          return;
        }
      } else
        e = t.createElement("link"), e[Mu] = !0, e.onload = e.onerror = A0.bind(null, e), Ut(e, "link", l), Mt(e), t.head.appendChild(e);
      a.preload = e, e.addEventListener("load", function() {
        return a.loading |= 1;
      }), e.addEventListener("error", function() {
        return a.loading |= 2;
      });
    }
    function xn(t) {
      return '[src="' + Se(t) + '"]';
    }
    function _i(t) {
      return "script[async]" + t;
    }
    function Pd(t, e, l) {
      if (e.count++, e.instance === null)
        switch (e.type) {
          case "style":
            var a = t.querySelector(
              'style[data-href~="' + Se(l.href) + '"]'
            );
            if (a)
              return e.instance = a, Mt(a), a;
            var n = tt({}, l, {
              "data-href": l.href,
              "data-precedence": l.precedence,
              href: null,
              precedence: null
            });
            return a = (t.ownerDocument || t).createElement(
              "style"
            ), Mt(a), Ut(a, "style", n), bu(a, l.precedence, t), e.instance = a;
          case "stylesheet":
            n = fn(l.href);
            var i = t.querySelector(
              Mi(n)
            );
            if (i)
              return e.state.loading |= 4, e.instance = i, Mt(i), i;
            a = Ph(l), (n = _e.get(n)) && Ef(a, n), i = (t.ownerDocument || t).createElement("link"), Mt(i);
            var u = i;
            return u._p = new Promise(function(c, s) {
              u.onload = c, u.onerror = s;
            }), Ut(i, "link", a), e.state.loading |= 4, bu(i, l.precedence, t), e.instance = i;
          case "script":
            return i = xn(l.src), (n = t.querySelector(
              _i(i)
            )) ? (e.instance = n, Mt(n), n) : (a = l, (n = _e.get(i)) && (a = tt({}, l), Af(a, n)), t = t.ownerDocument || t, n = t.createElement("script"), Mt(n), Ut(n, "link", a), t.head.appendChild(n), e.instance = n);
          case "void":
            return null;
          default:
            throw Error(S(443, e.type));
        }
      else
        e.type === "stylesheet" && (e.state.loading & 4) === 0 && (a = e.instance, e.state.loading |= 4, bu(a, l.precedence, t));
      return e.instance;
    }
    function bu(t, e, l) {
      for (var a = l.querySelectorAll(
        'link[rel="stylesheet"][data-precedence],style[data-precedence]'
      ), n = a.length ? a[a.length - 1] : null, i = n, u = 0; u < a.length; u++) {
        var c = a[u];
        if (c.dataset.precedence === e) i = c;
        else if (i !== n) break;
      }
      i ? i.parentNode.insertBefore(t, i.nextSibling) : (e = l.nodeType === 9 ? l.head : l, e.insertBefore(t, e.firstChild));
    }
    function Ef(t, e) {
      t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
    }
    function Af(t, e) {
      t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
    }
    var vu = null;
    function t0(t, e, l) {
      if (vu === null) {
        var a =  new Map(), n = vu =  new Map();
        n.set(l, a);
      } else
        n = vu, a = n.get(l), a || (a =  new Map(), n.set(l, a));
      if (a.has(t)) return a;
      for (a.set(t, null), l = l.getElementsByTagName(t), n = 0; n < l.length; n++) {
        var i = l[n];
        if (!(i[gi] || i[zt] || t === "link" && i.getAttribute("rel") === "stylesheet") && i.namespaceURI !== "http://www.w3.org/2000/svg") {
          var u = i.getAttribute(e) || "";
          u = t + u;
          var c = a.get(u);
          c ? c.push(i) : a.set(u, [i]);
        }
      }
      return a;
    }
    function Cs(t, e, l) {
      t = t.ownerDocument || t, t.head.insertBefore(
        l,
        e === "title" ? t.querySelector("head > title") : null
      );
    }
    function fg(t, e, l) {
      if (l === 1 || e.itemProp != null) return !1;
      switch (t) {
        case "meta":
        case "title":
          return !0;
        case "style":
          if (typeof e.precedence != "string" || typeof e.href != "string" || e.href === "")
            break;
          return !0;
        case "link":
          if (typeof e.rel != "string" || typeof e.href != "string" || e.href === "" || e.onLoad || e.onError)
            break;
          switch (e.rel) {
            case "stylesheet":
              return t = e.disabled, typeof e.precedence == "string" && t == null;
            default:
              return !0;
          }
        case "script":
          if (e.async && typeof e.async != "function" && typeof e.async != "symbol" && !e.onLoad && !e.onError && e.src && typeof e.src == "string")
            return !0;
      }
      return !1;
    }
    function e0(t, e) {
      return t === "img" && e.src != null && e.src !== "" && e.onLoad == null && e.loading !== "lazy";
    }
    function t1(t) {
      return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
    }
    function e1(t) {
      return (t.width || 100) * (t.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
    }
    function l0(t, e) {
      typeof e.decode == "function" && (t.imgCount++, e.complete || (t.imgBytes += e1(e), t.suspenseyImages.push(e)), t = mg.bind(t), e.decode().then(t, t));
    }
    function rg(t, e, l, a) {
      if (l.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (l.state.loading & 4) === 0) {
        if (l.instance === null) {
          var n = fn(a.href), i = e.querySelector(
            Mi(n)
          );
          if (i) {
            e = i._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = ri.bind(t), e.then(t, t)), l.state.loading |= 4, l.instance = i, Mt(i);
            return;
          }
          i = e.ownerDocument || e, a = Ph(a), (n = _e.get(n)) && Ef(a, n), i = i.createElement("link"), Mt(i);
          var u = i;
          u._p = new Promise(function(c, s) {
            u.onload = c, u.onerror = s;
          }), Ut(i, "link", a), l.instance = i;
        }
        t.stylesheets === null && (t.stylesheets =  new Map()), t.stylesheets.set(l, e), (e = l.state.preload) && (l.state.loading & 3) === 0 && (t.count++, l = ri.bind(t), e.addEventListener("load", l), e.addEventListener("error", l));
      }
    }
    var yu = 0;
    function dg(t, e) {
      return t.stylesheets && t.count === 0 && gu(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(l) {
        var a = setTimeout(function() {
          if (t.stylesheets && gu(t, t.stylesheets), t.unsuspend) {
            var i = t.unsuspend;
            t.unsuspend = null, i();
          }
        }, 6e4 + e);
        0 < t.imgBytes && yu === 0 && (yu = 62500 * zy());
        var n = setTimeout(
          function() {
            if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && gu(t, t.stylesheets), t.unsuspend)) {
              var i = t.unsuspend;
              t.unsuspend = null, i();
            }
          },
          (t.imgBytes > yu ? 50 : 800) + e
        );
        return t.unsuspend = l, function() {
          t.unsuspend = null, clearTimeout(a), clearTimeout(n);
        };
      } : null;
    }
    function l1(t) {
      if (t.count === 0 && (t.imgCount === 0 || !t.waitingForImages)) {
        if (t.stylesheets) gu(t, t.stylesheets);
        else if (t.unsuspend) {
          var e = t.unsuspend;
          t.unsuspend = null, e();
        }
      }
    }
    function ri() {
      this.count--, l1(this);
    }
    function mg() {
      this.imgCount--, l1(this);
    }
    var ku = null;
    function gu(t, e) {
      t.stylesheets = null, t.unsuspend !== null && (t.count++, ku =  new Map(), e.forEach(hg, t), ku = null, ri.call(t));
    }
    function hg(t, e) {
      if (!(e.state.loading & 4)) {
        var l = ku.get(t);
        if (l) var a = l.get(null);
        else {
          l =  new Map(), ku.set(t, l);
          for (var n = t.querySelectorAll(
            "link[data-precedence],style[data-precedence]"
          ), i = 0; i < n.length; i++) {
            var u = n[i];
            (u.nodeName === "LINK" || u.getAttribute("media") !== "not all") && (l.set(u.dataset.precedence, u), a = u);
          }
          a && l.set(null, a);
        }
        n = e.instance, u = n.getAttribute("data-precedence"), i = l.get(u) || a, i === a && l.set(null, n), l.set(u, n), this.count++, a = ri.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), i ? i.parentNode.insertBefore(n, i.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(n, t.firstChild)), e.state.loading |= 4;
      }
    }
    var rn = {
      $$typeof: Xe,
      Provider: null,
      Consumer: null,
      _currentValue: la,
      _currentValue2: la,
      _threadCount: 0
    };
    function bg(t, e, l, a, n, i, u, c, s) {
      this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Kc(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Kc(0), this.hiddenUpdates = Kc(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = i, this.onRecoverableError = u, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = s, this.transitionTypes = null, this.incompleteTransitions =  new Map();
    }
    function a1(t, e, l, a, n, i, u, c, s, o, r, b) {
      return t = new bg(
        t,
        e,
        l,
        u,
        s,
        o,
        r,
        b,
        c
      ), e = 1, i === !0 && (e |= 24), i = Ft(3, null, null, e), t.current = i, i.stateNode = t, e = Ks(), e.refCount++, t.pooledCache = e, e.refCount++, i.memoizedState = {
        element: a,
        isDehydrated: l,
        cache: e
      }, Fs(i), t;
    }
    function n1(t) {
      return t ? (t = qa, t) : qa;
    }
    function i1(t, e, l, a, n, i) {
      n = n1(n), a.context === null ? a.context = n : a.pendingContext = n, a = Dl(e), a.payload = { element: l }, i = i === void 0 ? null : i, i !== null && (a.callback = i), l = wl(t, a, e), l !== null && ($t(l, t, e), Vn(l, t, e));
    }
    function a0(t, e) {
      if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
        var l = t.retryLane;
        t.retryLane = l !== 0 && l < e ? l : e;
      }
    }
    function Cf(t, e) {
      a0(t, e), (t = t.alternate) && a0(t, e);
    }
    function u1(t) {
      if (t.tag === 13 || t.tag === 31) {
        var e = ga(t, 67108864);
        e !== null && $t(e, t, 67108864), Cf(t, 67108864);
      }
    }
    function n0(t) {
      if (t.tag === 13 || t.tag === 31) {
        var e = re();
        e = Us(e);
        var l = ga(t, e);
        l !== null && $t(l, t, e), Cf(t, e);
      }
    }
    var dn = !0;
    function vg(t, e, l, a) {
      var n = R.T;
      R.T = null;
      var i = Z.p;
      try {
        Z.p = 2, Of(t, e, l, a);
      } finally {
        Z.p = i, R.T = n;
      }
    }
    function yg(t, e, l, a) {
      var n = R.T;
      R.T = null;
      var i = Z.p;
      try {
        Z.p = 8, Of(t, e, l, a);
      } finally {
        Z.p = i, R.T = n;
      }
    }
    function Of(t, e, l, a) {
      if (dn) {
        var n = Os(a);
        if (n === null)
          vo(
            t,
            e,
            a,
            Ju,
            l
          ), i0(t, a);
        else if (pg(
          n,
          t,
          e,
          l,
          a
        ))
          a.stopPropagation();
        else if (i0(t, a), e & 4 && -1 < gg.indexOf(t)) {
          for (; n !== null; ) {
            var i = bn(n);
            if (i !== null)
              switch (i.tag) {
                case 3:
                  if (i = i.stateNode, i.current.memoizedState.isDehydrated) {
                    var u = Wl(i.pendingLanes);
                    if (u !== 0) {
                      var c = i;
                      for (c.pendingLanes |= 2, c.entangledLanes |= 2; u; ) {
                        var s = 1 << 31 - fe(u);
                        c.entanglements[1] |= s, u &= ~s;
                      }
                      $e(i), (Q & 6) === 0 && (Xu = oe() + 500, Ni(0, !1));
                    }
                  }
                  break;
                case 31:
                case 13:
                  c = ga(i, 2), c !== null && $t(c, i, 2), fc(), Cf(i, 2);
              }
            if (i = Os(a), i === null && vo(
              t,
              e,
              a,
              Ju,
              l
            ), i === n) break;
            n = i;
          }
          n !== null && a.stopPropagation();
        } else
          vo(
            t,
            e,
            a,
            null,
            l
          );
      }
    }
    function Os(t) {
      return t = Gs(t), zf(t);
    }
    var Ju = null;
    function zf(t) {
      if (Ju = null, t = ta(t), t !== null) {
        var e = hi(t);
        if (e === null) t = null;
        else {
          var l = e.tag;
          if (l === 13) {
            if (t = r0(e), t !== null) return t;
            t = null;
          } else if (l === 31) {
            if (t = d0(e), t !== null) return t;
            t = null;
          } else if (l === 3) {
            if (e.stateNode.current.memoizedState.isDehydrated)
              return e.tag === 3 ? e.stateNode.containerInfo : null;
            t = null;
          } else e !== t && (t = null);
        }
      }
      return Ju = t, null;
    }
    function c1(t) {
      switch (t) {
        case "beforetoggle":
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
        case "seeked":
        case "submit":
        case "toggle":
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
        case "fullscreenerror":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return 2;
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
        case "resize":
        case "scroll":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return 8;
        case "message":
          switch (wb()) {
            case g0:
              return 2;
            case p0:
              return 8;
            case Nu:
            case Rb:
              return 32;
            case x0:
              return 268435456;
            default:
              return 32;
          }
        default:
          return 32;
      }
    }
    var zs = !1, Hl = null, Gl = null, Ll = null, di =  new Map(), mi =  new Map(), Tl = [], gg = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
      " "
    );
    function i0(t, e) {
      switch (t) {
        case "focusin":
        case "focusout":
          Hl = null;
          break;
        case "dragenter":
        case "dragleave":
          Gl = null;
          break;
        case "mouseover":
        case "mouseout":
          Ll = null;
          break;
        case "pointerover":
        case "pointerout":
          di.delete(e.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          mi.delete(e.pointerId);
      }
    }
    function wn(t, e, l, a, n, i) {
      return t === null || t.nativeEvent !== i ? (t = {
        blockedOn: e,
        domEventName: l,
        eventSystemFlags: a,
        nativeEvent: i,
        targetContainers: [n]
      }, e !== null && (e = bn(e), e !== null && u1(e)), t) : (t.eventSystemFlags |= a, e = t.targetContainers, n !== null && e.indexOf(n) === -1 && e.push(n), t);
    }
    function pg(t, e, l, a, n) {
      switch (e) {
        case "focusin":
          return Hl = wn(
            Hl,
            t,
            e,
            l,
            a,
            n
          ), !0;
        case "dragenter":
          return Gl = wn(
            Gl,
            t,
            e,
            l,
            a,
            n
          ), !0;
        case "mouseover":
          return Ll = wn(
            Ll,
            t,
            e,
            l,
            a,
            n
          ), !0;
        case "pointerover":
          var i = n.pointerId;
          return di.set(
            i,
            wn(
              di.get(i) || null,
              t,
              e,
              l,
              a,
              n
            )
          ), !0;
        case "gotpointercapture":
          return i = n.pointerId, mi.set(
            i,
            wn(
              mi.get(i) || null,
              t,
              e,
              l,
              a,
              n
            )
          ), !0;
      }
      return !1;
    }
    function o1(t) {
      var e = ta(t.target);
      if (e !== null) {
        var l = hi(e);
        if (l !== null) {
          if (e = l.tag, e === 13) {
            if (e = r0(l), e !== null) {
              t.blockedOn = e, Dr(t.priority, function() {
                n0(l);
              });
              return;
            }
          } else if (e === 31) {
            if (e = d0(l), e !== null) {
              t.blockedOn = e, Dr(t.priority, function() {
                n0(l);
              });
              return;
            }
          } else if (e === 3 && l.stateNode.current.memoizedState.isDehydrated) {
            t.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
            return;
          }
        }
      }
      t.blockedOn = null;
    }
    function pu(t) {
      if (t.blockedOn !== null) return !1;
      for (var e = t.targetContainers; 0 < e.length; ) {
        var l = Os(t.nativeEvent);
        if (l === null) {
          l = t.nativeEvent;
          var a = new l.constructor(
            l.type,
            l
          );
          Ro = a, l.target.dispatchEvent(a), Ro = null;
        } else
          return e = bn(l), e !== null && u1(e), t.blockedOn = l, !1;
        e.shift();
      }
      return !0;
    }
    function u0(t, e, l) {
      pu(t) && l.delete(e);
    }
    function xg() {
      zs = !1, Hl !== null && pu(Hl) && (Hl = null), Gl !== null && pu(Gl) && (Gl = null), Ll !== null && pu(Ll) && (Ll = null), di.forEach(u0), mi.forEach(u0);
    }
    function Pi(t, e) {
      t.blockedOn === e && (t.blockedOn = null, zs || (zs = !0, xt.unstable_scheduleCallback(
        xt.unstable_NormalPriority,
        xg
      )));
    }
    var tu = null;
    function c0(t) {
      tu !== t && (tu = t, xt.unstable_scheduleCallback(
        xt.unstable_NormalPriority,
        function() {
          tu === t && (tu = null);
          for (var e = 0; e < t.length; e += 3) {
            var l = t[e], a = t[e + 1], n = t[e + 2];
            if (typeof a != "function") {
              if (zf(a || l) === null)
                continue;
              break;
            }
            var i = bn(l);
            i !== null && (t.splice(e, 3), e -= 3, Fo(
              i,
              {
                pending: !0,
                data: n,
                method: l.method,
                action: a
              },
              a,
              n
            ));
          }
        }
      ));
    }
    function mn(t) {
      function e(s) {
        return Pi(s, t);
      }
      Hl !== null && Pi(Hl, t), Gl !== null && Pi(Gl, t), Ll !== null && Pi(Ll, t), di.forEach(e), mi.forEach(e);
      for (var l = 0; l < Tl.length; l++) {
        var a = Tl[l];
        a.blockedOn === t && (a.blockedOn = null);
      }
      for (; 0 < Tl.length && (l = Tl[0], l.blockedOn === null); )
        o1(l), l.blockedOn === null && Tl.shift();
      if (l = (t.ownerDocument || t).$$reactFormReplay, l != null)
        for (a = 0; a < l.length; a += 3) {
          var n = l[a], i = l[a + 1], u = n[It] || null;
          if (typeof i == "function")
            u || c0(l);
          else if (u) {
            var c = null;
            if (i && i.hasAttribute("formAction")) {
              if (n = i, u = i[It] || null)
                c = u.formAction;
              else if (zf(n) !== null) continue;
            } else c = u.action;
            typeof c == "function" ? l[a + 1] = c : (l.splice(a, 3), a -= 3), c0(l);
          }
        }
    }
    function s1() {
      function t(i) {
        i.canIntercept && i.info === "react-transition" && i.intercept({
          handler: function() {
            return new Promise(function(u) {
              return n = u;
            });
          },
          focusReset: "manual",
          scroll: "manual"
        });
      }
      function e() {
        n !== null && (n(), n = null), a || setTimeout(l, 20);
      }
      function l() {
        if (!a && !navigation.transition) {
          var i = navigation.currentEntry;
          i && i.url != null && navigation.navigate(i.url, {
            state: i.getState(),
            info: "react-transition",
            history: "replace"
          });
        }
      }
      if (typeof navigation == "object") {
        var a = !1, n = null;
        return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", e), navigation.addEventListener("navigateerror", e), setTimeout(l, 100), function() {
          a = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", e), navigation.removeEventListener("navigateerror", e), n !== null && (n(), n = null);
        };
      }
    }
    function Df(t) {
      this._internalRoot = t;
    }
    mc.prototype.render = Df.prototype.render = function(t) {
      var e = this._internalRoot;
      if (e === null) throw Error(S(409));
      var l = e.current, a = re();
      i1(l, a, t, e, null, null);
    };
    mc.prototype.unmount = Df.prototype.unmount = function() {
      var t = this._internalRoot;
      if (t !== null) {
        this._internalRoot = null;
        var e = t.containerInfo;
        i1(t.current, 2, null, t, null, null), fc(), e[hn] = null;
      }
    };
    function mc(t) {
      this._internalRoot = t;
    }
    mc.prototype.unstable_scheduleHydration = function(t) {
      if (t) {
        var e = E0();
        t = { blockedOn: null, target: t, priority: e };
        for (var l = 0; l < Tl.length && e !== 0 && e < Tl[l].priority; l++) ;
        Tl.splice(l, 0, t), l === 0 && o1(t);
      }
    };
    var o0 = s0.version;
    if (o0 !== "19.3.1")
      throw Error(
        S(
          527,
          o0,
          "19.3.1"
        )
      );
    Z.findDOMNode = function(t) {
      var e = t._reactInternals;
      if (e === void 0)
        throw typeof t.render == "function" ? Error(S(188)) : (t = Object.keys(t).join(","), Error(S(268, t)));
      return t = Sb(e), t = t !== null ? m0(t) : null, t = t === null ? null : t.stateNode, t;
    };
    var Sg = {
      bundleType: 0,
      version: "19.3.1",
      rendererPackageName: "react-dom",
      currentDispatcherRef: R,
      reconcilerVersion: "19.3.1"
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && (Rn = __REACT_DEVTOOLS_GLOBAL_HOOK__, !Rn.isDisabled && Rn.supportsFiber))
      try {
        bi = Rn.inject(
          Sg
        ), se = Rn;
      } catch {
      }
    var Rn;
    hc.createRoot = function(t, e) {
      if (!f0(t)) throw Error(S(299));
      var l = !1, a = "", n = Vm, i = Qm, u = Zm;
      return e != null && (e.unstable_strictMode === !0 && (l = !0), e.identifierPrefix !== void 0 && (a = e.identifierPrefix), e.onUncaughtError !== void 0 && (n = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (u = e.onRecoverableError)), e = a1(
        t,
        1,
        !1,
        null,
        null,
        l,
        a,
        null,
        n,
        i,
        u,
        s1
      ), t[hn] = e.current, Tf(t), new Df(e);
    };
    hc.hydrateRoot = function(t, e, l) {
      if (!f0(t)) throw Error(S(299));
      var a = !1, n = "", i = Vm, u = Qm, c = Zm, s = null;
      return l != null && (l.unstable_strictMode === !0 && (a = !0), l.identifierPrefix !== void 0 && (n = l.identifierPrefix), l.onUncaughtError !== void 0 && (i = l.onUncaughtError), l.onCaughtError !== void 0 && (u = l.onCaughtError), l.onRecoverableError !== void 0 && (c = l.onRecoverableError), l.formState !== void 0 && (s = l.formState)), e = a1(
        t,
        1,
        !0,
        e,
        l ?? null,
        a,
        n,
        s,
        i,
        u,
        c,
        s1
      ), e.context = n1(null), l = e.current, a = re(), a = Us(a), n = Dl(a), n.callback = null, wl(l, n, a), l = a, e.current.lanes = l, yi(e, l), $e(e), t[hn] = e.current, Tf(t), new mc(e);
    };
    hc.version = "19.3.1";
  });
  var m1 = Be((Kg, d1) => {
    "use strict";
    function r1() {
      if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r1);
        } catch (t) {
          console.error(t);
        }
    }
    r1(), d1.exports = f1();
  });
  var y1 = Be((yc) => {
    "use strict";
    var Tg = Symbol.for("react.transitional.element"), Ng = Symbol.for("react.fragment");
    function v1(t, e, l) {
      var a = null;
      if (l !== void 0 && (a = "" + l), e.key !== void 0 && (a = "" + e.key), "key" in e) {
        l = {};
        for (var n in e)
          n !== "key" && (l[n] = e[n]);
      } else l = e;
      return e = l.ref, {
        $$typeof: Tg,
        type: t,
        key: a,
        ref: e !== void 0 ? e : null,
        props: l
      };
    }
    yc.Fragment = Ng;
    yc.jsx = v1;
    yc.jsxs = v1;
  });
  var hl = Be((Fg, g1) => {
    "use strict";
    g1.exports = y1();
  });
  var R1 = be(m1(), 1);
  var Ct = be(_a(), 1);
  var Yt = be(_a(), 1);
  var Et = {
    easy: {
      name: "Easy",
      short: "EASY",
      hpMult: 0.75,
      scoreMult: 0.75,
      minBricks: 2,
      maxBricks: 4,
      speedMult: 0.9,
      color: "#22c55e"
    },
    medium: {
      name: "Medium",
      short: "MED",
      hpMult: 1,
      scoreMult: 1,
      minBricks: 3,
      maxBricks: 4,
      speedMult: 1,
      color: "#3b82f6"
    },
    hard: {
      name: "Hard",
      short: "HARD",
      hpMult: 1.35,
      scoreMult: 1.5,
      minBricks: 3,
      maxBricks: 5,
      speedMult: 1.1,
      color: "#f59e0b"
    },
    insane: {
      name: "Insane",
      short: "INSANE",
      hpMult: 1.85,
      scoreMult: 2.25,
      minBricks: 4,
      maxBricks: 5,
      speedMult: 1.2,
      color: "#ef4444"
    },
    asian: {
      name: "ASIAN",
      short: "ASIAN",
      hpMult: 2.5,
      scoreMult: 3.5,
      minBricks: 4,
      maxBricks: 5,
      speedMult: 1.35,
      color: "#d946ef"
    }
  }, h1 = ["insane", "asian"];
  function Ei(t, e) {
    return t === "tartarus" ? h1.includes(e) : !0;
  }
  function Ee(t, e) {
    return t === "tartarus" && !h1.includes(e) ? "insane" : e;
  }
  var he = {
    infinite: {
      name: "Infinite Mode",
      short: "INFINITE",
      icon: "fa-infinity",
      desc: "Classic endless descent with escalating brick types and powerups.",
      color: "#3b82f6"
    },
    hell: {
      name: "Hell Mode",
      short: "HELL",
      icon: "fa-fire-flame-curved",
      desc: "Scorching HP scaling, armored & healing bricks, and ruthless combos.",
      color: "#ef4444"
    },
    tartarus: {
      name: "Tartarus Mode",
      short: "TARTARUS",
      icon: "fa-skull-crossbones",
      desc: "2x2 Titans, Gravity Wells, Mirrors & Portals. Locked to Insane or ASIAN.",
      color: "#a855f7"
    },
    speedrun_25: {
      name: "Speedrun 25",
      short: "SR 25",
      icon: "fa-stopwatch",
      desc: "Race to clear Level 25 as fast as possible.",
      color: "#10b981",
      targetLevel: 25
    },
    speedrun_50: {
      name: "Speedrun 50",
      short: "SR 50",
      icon: "fa-stopwatch",
      desc: "Race to clear Level 50 as fast as possible.",
      color: "#14b8a6",
      targetLevel: 50
    },
    speedrun_100: {
      name: "Speedrun 100",
      short: "SR 100",
      icon: "fa-stopwatch",
      desc: "Race to clear Level 100 as fast as possible.",
      color: "#06b6d4",
      targetLevel: 100
    },
    speedrun_250: {
      name: "Speedrun 250",
      short: "SR 250",
      icon: "fa-stopwatch",
      desc: "Endurance speedrun to Level 250.",
      color: "#0ea5e9",
      targetLevel: 250
    },
    speedrun_500: {
      name: "Speedrun 500",
      short: "SR 500",
      icon: "fa-stopwatch",
      desc: "Ultimate marathon speedrun to Level 500.",
      color: "#6366f1",
      targetLevel: 500
    }
  }, b1 = [
    { id: "fa-cubes", label: "Cubes" },
    { id: "fa-trophy", label: "Trophy" },
    { id: "fa-crown", label: "Crown" },
    { id: "fa-dragon", label: "Dragon" },
    { id: "fa-fire", label: "Fire" },
    { id: "fa-fire-flame-curved", label: "Inferno Flame" },
    { id: "fa-skull", label: "Skull" },
    { id: "fa-skull-crossbones", label: "Tartarus Skull" },
    { id: "fa-bolt", label: "Bolt Lightning" },
    { id: "fa-gem", label: "Gem Diamond" },
    { id: "fa-shield-halved", label: "Shield Aegis" },
    { id: "fa-bullseye", label: "Bullseye Target" },
    { id: "fa-crosshairs", label: "Crosshairs Aim" },
    { id: "fa-star", label: "Star" },
    { id: "fa-meteor", label: "Meteor" },
    { id: "fa-rocket", label: "Rocket" },
    { id: "fa-shuttle-space", label: "Space Shuttle" },
    { id: "fa-user-astronaut", label: "Astronaut" },
    { id: "fa-satellite", label: "Satellite" },
    { id: "fa-ghost", label: "Ghost Phantom" },
    { id: "fa-gamepad", label: "Gamepad Arcade" },
    { id: "fa-dice", label: "Dice" },
    { id: "fa-dice-d20", label: "D20 Dice" },
    { id: "fa-puzzle-piece", label: "Puzzle" },
    { id: "fa-chess-king", label: "Chess King" },
    { id: "fa-chess-queen", label: "Chess Queen" },
    { id: "fa-chess-knight", label: "Chess Knight" },
    { id: "fa-chess-rook", label: "Chess Rook" },
    { id: "fa-chess-bishop", label: "Chess Bishop" },
    { id: "fa-wand-magic-sparkles", label: "Magic Wand" },
    { id: "fa-hat-wizard", label: "Wizard Hat" },
    { id: "fa-scroll", label: "Scroll" },
    { id: "fa-dungeon", label: "Dungeon" },
    { id: "fa-khanda", label: "Sword Blade" },
    { id: "fa-atom", label: "Atom Quantum" },
    { id: "fa-dna", label: "DNA" },
    { id: "fa-flask", label: "Flask Potion" },
    { id: "fa-microchip", label: "Microchip Cyber" },
    { id: "fa-robot", label: "Robot Mech" },
    { id: "fa-magnet", label: "Magnet" },
    { id: "fa-mask", label: "Mask Rogue" },
    { id: "fa-user-ninja", label: "Ninja" },
    { id: "fa-user-secret", label: "Secret Agent" },
    { id: "fa-hat-cowboy", label: "Cowboy" },
    { id: "fa-glasses", label: "Glasses" },
    { id: "fa-eye", label: "Eye" },
    { id: "fa-hand-fist", label: "Fist Power" },
    { id: "fa-bomb", label: "Bomb Detonator" },
    { id: "fa-explosion", label: "Explosion" },
    { id: "fa-snowflake", label: "Snowflake Frost" },
    { id: "fa-icicles", label: "Icicles Ice" },
    { id: "fa-sun", label: "Sun Solar" },
    { id: "fa-moon", label: "Moon Lunar" },
    { id: "fa-cloud-bolt", label: "Storm Thunder" },
    { id: "fa-hurricane", label: "Hurricane" },
    { id: "fa-volcano", label: "Volcano" },
    { id: "fa-tornado", label: "Tornado" },
    { id: "fa-wind", label: "Wind" },
    { id: "fa-droplet", label: "Water Droplet" },
    { id: "fa-biohazard", label: "Biohazard" },
    { id: "fa-radiation", label: "Radiation" },
    { id: "fa-infinity", label: "Infinity" },
    { id: "fa-heart", label: "Heart" },
    { id: "fa-medal", label: "Medal" },
    { id: "fa-award", label: "Award" },
    { id: "fa-ranking-star", label: "Rank Star" },
    { id: "fa-cat", label: "Cat" },
    { id: "fa-dog", label: "Dog" },
    { id: "fa-crow", label: "Crow Raven" },
    { id: "fa-dove", label: "Dove Bird" },
    { id: "fa-feather-pointed", label: "Feather" },
    { id: "fa-frog", label: "Frog" },
    { id: "fa-hippo", label: "Hippo" },
    { id: "fa-horse", label: "Horse" },
    { id: "fa-otter", label: "Otter" },
    { id: "fa-fish", label: "Fish" },
    { id: "fa-shrimp", label: "Shrimp" },
    { id: "fa-spider", label: "Spider" },
    { id: "fa-bug", label: "Bug Beetle" },
    { id: "fa-paw", label: "Paw" },
    { id: "fa-kiwi-bird", label: "Kiwi Bird" },
    { id: "fa-leaf", label: "Leaf" },
    { id: "fa-tree", label: "Tree" },
    { id: "fa-seedling", label: "Seedling" },
    { id: "fa-clover", label: "Clover Lucky" },
    { id: "fa-mountain", label: "Mountain" },
    { id: "fa-anchor", label: "Anchor" },
    { id: "fa-compass", label: "Compass" },
    { id: "fa-globe", label: "Globe Earth" },
    { id: "fa-campground", label: "Camp" },
    { id: "fa-hammer", label: "Hammer" },
    { id: "fa-wrench", label: "Wrench" },
    { id: "fa-key", label: "Key" },
    { id: "fa-lock", label: "Lock" },
    { id: "fa-vault", label: "Vault" },
    { id: "fa-coins", label: "Coins" },
    { id: "fa-sack-dollar", label: "Money Bag" },
    { id: "fa-piggy-bank", label: "Piggy Bank" },
    { id: "fa-music", label: "Music" },
    { id: "fa-guitar", label: "Guitar" },
    { id: "fa-drum", label: "Drum" },
    { id: "fa-headphones", label: "Headphones" },
    { id: "fa-microphone", label: "Microphone" },
    { id: "fa-bell", label: "Bell" },
    { id: "fa-bullhorn", label: "Bullhorn" },
    { id: "fa-pizza-slice", label: "Pizza" },
    { id: "fa-burger", label: "Burger" },
    { id: "fa-ice-cream", label: "Ice Cream" },
    { id: "fa-mug-hot", label: "Coffee Mug" },
    { id: "fa-cookie", label: "Cookie" },
    { id: "fa-pepper-hot", label: "Hot Pepper" },
    { id: "fa-lemon", label: "Lemon" },
    { id: "fa-apple-whole", label: "Apple" },
    { id: "fa-cake-candles", label: "Cake" },
    { id: "fa-basketball", label: "Basketball" },
    { id: "fa-football", label: "Football" },
    { id: "fa-baseball", label: "Baseball" },
    { id: "fa-futbol", label: "Soccer" },
    { id: "fa-bowling-ball", label: "Bowling" },
    { id: "fa-dumbbell", label: "Dumbbell" },
    { id: "fa-bicycle", label: "Bicycle" },
    { id: "fa-car", label: "Car" },
    { id: "fa-motorcycle", label: "Motorcycle" },
    { id: "fa-plane", label: "Plane Jet" },
    { id: "fa-ship", label: "Ship" },
    { id: "fa-train", label: "Train" },
    { id: "fa-truck-monster", label: "Monster Truck" }
  ], Sn = [
    {
      id: "startBalls",
      name: "Starting Balls",
      desc: "+1 starting ball per level",
      icon: "fa-circle-dot",
      max: 10,
      baseCost: 150,
      costMult: 1.6,
      currency: "coins"
    },
    {
      id: "ballSpeed",
      name: "Ball Speed",
      desc: "+8% ball travel speed per level",
      icon: "fa-gauge-high",
      max: 10,
      baseCost: 160,
      costMult: 1.65,
      currency: "coins"
    },
    {
      id: "critChance",
      name: "Critical Strike",
      desc: "+5% chance for 2x damage",
      icon: "fa-crosshairs",
      max: 10,
      baseCost: 180,
      costMult: 1.65,
      currency: "coins"
    },
    {
      id: "coinGain",
      name: "Coin Magnet",
      desc: "+15% coins earned per level",
      icon: "fa-coins",
      max: 10,
      baseCost: 220,
      costMult: 1.7,
      currency: "coins"
    },
    {
      id: "gemLuck",
      name: "Gem Resonance",
      desc: "+3% chance for bonus gems",
      icon: "fa-gem",
      max: 8,
      baseCost: 12,
      costMult: 1.8,
      currency: "gems"
    },
    {
      id: "rebound",
      name: "Rebound",
      desc: "+3% chance for balls to bounce off the floor",
      icon: "fa-angles-up",
      max: 10,
      baseCost: 240,
      costMult: 1.7,
      currency: "coins"
    }
  ], bc = [
    { id: "first_blood", name: "First Crack", desc: "Destroy your first brick.", icon: "fa-cubes", rewardCoins: 50, rewardGems: 1 },
    { id: "lvl_10", name: "Getting Warmed Up", desc: "Reach Level 10 in any mode.", icon: "fa-fire", rewardCoins: 150, rewardGems: 2 },
    { id: "lvl_25", name: "Quarter Century", desc: "Reach Level 25 in any mode.", icon: "fa-medal", rewardCoins: 350, rewardGems: 5 },
    { id: "lvl_50", name: "Halfway Legend", desc: "Reach Level 50 in any mode.", icon: "fa-trophy", rewardCoins: 800, rewardGems: 10 },
    { id: "lvl_100", name: "Centurion", desc: "Reach Level 100 in any mode.", icon: "fa-crown", rewardCoins: 2500, rewardGems: 25 },
    { id: "hell_survivor", name: "Hell Walker", desc: "Reach Level 20 in Hell Mode.", icon: "fa-fire-flame-curved", rewardCoins: 600, rewardGems: 8 },
    { id: "tartarus_initiate", name: "Abyssal Challenger", desc: "Reach Level 15 in Tartarus Mode.", icon: "fa-skull-crossbones", rewardCoins: 1200, rewardGems: 15 },
    { id: "asian_master", name: "Emotional Damage", desc: "Reach Level 20 on ASIAN difficulty.", icon: "fa-dragon", rewardCoins: 1500, rewardGems: 20 },
    { id: "balls_50", name: "Swarm", desc: "Hold 50 balls in a single run.", icon: "fa-circle-dot", rewardCoins: 400, rewardGems: 5 },
    { id: "bricks_1000", name: "Demolitionist", desc: "Destroy 1,000 total bricks.", icon: "fa-bomb", rewardCoins: 500, rewardGems: 6 },
    { id: "speed_25", name: "Speed Demon", desc: "Complete Speedrun 25.", icon: "fa-stopwatch", rewardCoins: 500, rewardGems: 8 },
    { id: "v13_veteran", name: "Legacy Carrier", desc: "Import a v13 save into v14.", icon: "fa-file-import", rewardCoins: 300, rewardGems: 5 }
  ], vc = [
    { type: "normal", name: "Standard Brick", tier: "Common", symbol: "\u25A0", faIcon: "fa-cube", faGlyph: "\uF1B2", color: "#38a169", desc: "Classic brick whose HP scales with the current level." },
    { type: "slider", name: "Slider Brick", tier: "Common", symbol: "\u21C4", faIcon: "fa-arrows-left-right", faGlyph: "\uF337", color: "#00b5d8", desc: "Glides horizontally across open lanes between turns." },
    { type: "magnet", name: "Magnet Brick", tier: "Common", symbol: "\u{1F9F2}", faIcon: "fa-magnet", faGlyph: "\uF076", color: "#9f7aea", desc: "Bends nearby ball trajectories toward its center." },
    { type: "tnt", name: "TNT Brick", tier: "Uncommon", symbol: "\u{1F4A3}", faIcon: "fa-bomb", faGlyph: "\uF1E2", color: "#e53e3e", desc: "Detonates on shatter, blasting nearby bricks in a 180px radius." },
    { type: "ammo", name: "Ammo Brick", tier: "Uncommon", symbol: "+1", faIcon: "fa-circle-plus", faGlyph: "\uF055", color: "#d69e2e", desc: "Grants +1 permanent extra ball at the end of the turn." },
    { type: "portal", name: "Portal Brick", tier: "Uncommon", symbol: "\u{1F300}", faIcon: "fa-hurricane", faGlyph: "\uF751", color: "#805ad5", desc: "Warps striking balls to a random arena coordinate." },
    { type: "teleport", name: "Teleport Brick", tier: "Uncommon", symbol: "\u2726", faIcon: "fa-shuffle", faGlyph: "\uF074", color: "#2b6cb0", desc: "Shifts to a new horizontal column after each turn." },
    { type: "shock", name: "Shock Brick", tier: "Uncommon", symbol: "\u26A1", faIcon: "fa-bolt", faGlyph: "\uF0E7", color: "#dd6b20", desc: "Electrifies striking balls, slamming them straight downward." },
    { type: "shield", name: "Shield Brick", tier: "Rare", symbol: "\u{1F6E1}", faIcon: "fa-shield-halved", faGlyph: "\uF3ED", color: "#319795", desc: "Projects a 150px barrier making adjacent bricks invulnerable." },
    { type: "parent", name: "Parent Brick", tier: "Rare", symbol: "\u2756", faIcon: "fa-sitemap", faGlyph: "\uF0E8", color: "#b7791f", desc: "Splits into 1\u20133 smaller bricks when destroyed." },
    { type: "healer", name: "Healer Brick", tier: "Rare", symbol: "\u271A", faIcon: "fa-heart-pulse", faGlyph: "\uF21E", color: "#2f855a", desc: "Restores +25% HP to nearby bricks at the end of every turn." },
    { type: "directional", name: "Directional Brick", tier: "Rare", symbol: "\u25C8", faIcon: "fa-compass", faGlyph: "\uF14E", color: "#718096", desc: "Only takes damage from its glowing colored side." },
    { type: "phase", name: "Phase Brick", tier: "Rare", symbol: "\u25D0", faIcon: "fa-circle-half-stroke", faGlyph: "\uF042", color: "#38b2ac", desc: "Alternates between Solid and Liquid (invulnerable) each turn." },
    { type: "tank", name: "Tank Brick", tier: "Legendary", symbol: "\u26E8", faIcon: "fa-shield", faGlyph: "\uF132", color: "#2d3748", desc: "Heavily armored colossus carrying 5x base HP." },
    { type: "angel", name: "Angel Brick", tier: "Legendary", symbol: "\u2727", faIcon: "fa-star", faGlyph: "\uF005", color: "#d53f8c", desc: "Smites nearby bricks for 25% HP damage every turn." },
    { type: "turret", name: "Turret Brick", tier: "Legendary", symbol: "\u2316", faIcon: "fa-crosshairs", faGlyph: "\uF05B", color: "#4a5568", desc: "Fires bolts at up to 3 random bricks each turn for 25% HP." },
    { type: "crawler", name: "Crawler Brick", tier: "Hell / Tartarus", symbol: "\u{1F577}", faIcon: "fa-spider", faGlyph: "\uF717", color: "#ff4500", desc: "Creeps downward slowly between shots in abyssal modes." },
    { type: "devil", name: "Devil Brick", tier: "Hell / Tartarus", symbol: "\u{1F608}", faIcon: "fa-skull", faGlyph: "\uF54C", color: "#8b0000", desc: "Summons armored Tank minions above itself every turn." },
    { type: "titan", name: "Tartarus Titan", tier: "Tartarus Boss", symbol: "\u26D3", faIcon: "fa-link", faGlyph: "\uF0C1", color: "#3b0764", desc: "Colossal 2x2 brick with 30x level HP that resists Shield auras." }
  ];
  var g = be(hl(), 1), wf = ({
    activeModal: t,
    initialAccountTab: e = "profile",
    onClose: l,
    vault: a,
    currentMode: n,
    currentDifficulty: i,
    onStartMode: u,
    onDataChanged: c,
    onImportSuccess: s
  }) => {
    let [o, r] = (0, Yt.useState)(n), [b, d] = (0, Yt.useState)(
      Ee(n, i)
    ), [m, y] = (0, Yt.useState)(e), [N, _] = (0, Yt.useState)(""), h = `${t}:${e}`;
    t && h !== N && (_(h), t === "account" && y(e));
    let [f, v] = (0, Yt.useState)(() => a.getProfile().name), [x, M] = (0, Yt.useState)(() => a.getProfile().title), [A, C] = (0, Yt.useState)(() => a.getProfile().icon), [z, K] = (0, Yt.useState)(""), [O, yt] = (0, Yt.useState)(n), [E, V] = (0, Yt.useState)(Ee(n, i)), [St, We] = (0, Yt.useState)(""), [Ai, B1] = (0, Yt.useState)(""), [Ci, H1] = (0, Yt.useState)(() => a.getSettings()), Qf = (0, Yt.useRef)(null);
    if (!t) return null;
    let Nn = a.getMeta(), xa = a.getStats(), Ec = a.getModeRecords(), G1 = a.getSpeedrunRecords(), Gg = a.getScores(), L1 = a.getAchievements(), Y1 = (T) => {
      r(T), d((D) => Ee(T, D));
    }, q1 = (T) => {
      let D = Sn.find((Jl) => Jl.id === T);
      if (!D) return;
      let H = a.getMeta(), le = H.permUpgrades[T] || 0;
      if (le >= D.max) return;
      let Ue = Math.round(D.baseCost * Math.pow(D.costMult, le));
      if (D.currency === "coins") {
        if (H.coins < Ue) return;
        H.coins -= Ue;
      } else {
        if (H.gems < Ue) return;
        H.gems -= Ue;
      }
      H.permUpgrades[T] = le + 1, a.saveMeta(H), c(`Upgraded ${D.name} to Lv.${le + 1}!`);
    }, j1 = () => {
      let T = a.getProfile();
      a.saveProfile({
        ...T,
        name: f.trim() || "Breaker",
        title: x.trim() || "Arcade Challenger",
        icon: A
      }), c("Profile updated!");
    }, X1 = (T, D) => {
      let H = { ...Ci, [T]: D };
      H1(H), a.saveSettings(H), c();
    }, V1 = (T, D, H = "application/json") => {
      let le = new Blob([D], { type: H }), Ue = URL.createObjectURL(le), Jl = document.createElement("a");
      Jl.href = Ue, Jl.download = T, document.body.appendChild(Jl), Jl.click(), document.body.removeChild(Jl), URL.revokeObjectURL(Ue);
    }, Zf = (T) => {
      let D = a.importSaveText(T, a.getActiveSlot());
      D.ok ? (We(""), s(a.getActiveSlot(), D.message), l()) : c(D.message);
    }, Q1 = (T) => {
      let D = T.target.files?.[0];
      if (!D) return;
      let H = new FileReader();
      H.onload = () => {
        typeof H.result == "string" && Zf(H.result);
      }, H.readAsText(D), T.target.value = "";
    }, Z1 = (T) => {
      if (!T) return "--:--.--";
      let D = T / 1e3, H = Math.floor(D / 60), le = (D % 60).toFixed(2).padStart(5, "0");
      return `${String(H).padStart(2, "0")}:${le}`;
    };
    return  (0, g.jsx)(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm",
        onClick: l,
        children:  (0, g.jsxs)(
          "div",
          {
            className: "w-full max-w-xl max-h-[88vh] flex flex-col rounded-2xl bg-white border-2 border-[#171717] shadow-[0_14px_36px_rgba(15,23,42,0.28)] overflow-hidden text-[#1e293b]",
            onClick: (T) => T.stopPropagation(),
            children: [
               (0, g.jsxs)("div", { className: "flex items-center justify-between px-5 py-3.5 border-b-2 border-slate-200 bg-slate-50", children: [
                 (0, g.jsxs)("h2", { className: "text-base font-extrabold tracking-tight text-[#0f172a] flex items-center gap-2", children: [
                  t === "modeSelect" &&  (0, g.jsxs)(g.Fragment, { children: [
                     (0, g.jsx)("i", { className: "fa-solid fa-gamepad text-[#2b6cb0]" }),
                    "Mode & Difficulty"
                  ] }),
                  t === "shop" &&  (0, g.jsxs)(g.Fragment, { children: [
                     (0, g.jsx)("i", { className: "fa-solid fa-store text-amber-600" }),
                    "Permanent Upgrades (Shared Pool)"
                  ] }),
                  t === "account" &&  (0, g.jsxs)(g.Fragment, { children: [
                     (0, g.jsx)("i", { className: `fa-solid ${A} text-[#2b6cb0]` }),
                    "Player Profile & Records"
                  ] }),
                  t === "settings" &&  (0, g.jsxs)(g.Fragment, { children: [
                     (0, g.jsx)("i", { className: "fa-solid fa-gear text-slate-700" }),
                    "Settings & Save Data"
                  ] }),
                  t === "guide" &&  (0, g.jsxs)(g.Fragment, { children: [
                     (0, g.jsx)("i", { className: "fa-solid fa-book-open text-emerald-600" }),
                    "Brick Guide"
                  ] })
                ] }),
                 (0, g.jsx)(
                  "button",
                  {
                    onClick: l,
                    className: "w-8 h-8 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center cursor-pointer",
                    children:  (0, g.jsx)("i", { className: "fa-solid fa-xmark" })
                  }
                )
              ] }),
               (0, g.jsxs)("div", { className: "p-5 overflow-y-auto space-y-5", children: [
                t === "modeSelect" &&  (0, g.jsxs)(g.Fragment, { children: [
                   (0, g.jsxs)("div", { children: [
                     (0, g.jsx)("div", { className: "text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2.5", children: "Select Game Mode" }),
                     (0, g.jsx)("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5", children: Object.keys(he).map((T) => {
                      let D = he[T];
                      return  (0, g.jsxs)(
                        "button",
                        {
                          onClick: () => Y1(T),
                          className: `text-left p-3 rounded-xl border-2 transition-all cursor-pointer ${o === T ? "bg-sky-50 border-[#171717] shadow-[0_3px_0_#171717]" : "bg-slate-50 border-slate-200 hover:border-slate-400"}`,
                          children: [
                             (0, g.jsxs)("div", { className: "flex items-center gap-2 font-bold text-sm text-[#0f172a]", children: [
                               (0, g.jsx)("i", { className: `fa-solid ${D.icon}`, style: { color: D.color } }),
                               (0, g.jsx)("span", { children: D.name })
                            ] }),
                             (0, g.jsx)("p", { className: "text-[11px] text-slate-600 mt-1 leading-snug", children: D.desc })
                          ]
                        },
                        T
                      );
                    }) })
                  ] }),
                   (0, g.jsxs)("div", { children: [
                     (0, g.jsxs)("div", { className: "flex items-center justify-between mb-2.5", children: [
                       (0, g.jsx)("span", { className: "text-xs font-extrabold uppercase tracking-wider text-slate-500", children: "Select Difficulty" }),
                      o === "tartarus" &&  (0, g.jsxs)("span", { className: "text-[11px] font-bold text-purple-700 flex items-center gap-1", children: [
                         (0, g.jsx)("i", { className: "fa-solid fa-lock" }),
                        "Tartarus requires Insane or ASIAN"
                      ] })
                    ] }),
                     (0, g.jsx)("div", { className: "grid grid-cols-5 gap-2", children: Object.keys(Et).map((T) => {
                      let D = Et[T], H = Ei(o, T);
                      return  (0, g.jsxs)(
                        "button",
                        {
                          disabled: !H,
                          onClick: () => H && d(T),
                          className: `py-2.5 px-1 rounded-xl border-2 text-center transition-all ${H ? b === T ? "bg-white border-[#171717] shadow-[0_2px_0_#171717] cursor-pointer" : "bg-slate-50 border-slate-200 hover:border-slate-400 cursor-pointer" : "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-55"}`,
                          children: [
                             (0, g.jsx)("div", { className: "text-xs font-extrabold", style: { color: H ? D.color : void 0 }, children: D.short }),
                             (0, g.jsx)("div", { className: "text-[10px] mono-num text-slate-500 mt-0.5 font-semibold", children: H ? `${D.hpMult}x HP` :  (0, g.jsx)("i", { className: "fa-solid fa-lock" }) })
                          ]
                        },
                        T
                      );
                    }) })
                  ] }),
                   (0, g.jsxs)(
                    "button",
                    {
                      onClick: () => {
                        u(o, Ee(o, b)), l();
                      },
                      className: "w-full py-3 rounded-xl font-extrabold text-sm bg-[#2b6cb0] hover:bg-[#255c99] active:translate-y-[1px] text-white border-2 border-[#171717] shadow-[0_3px_0_#171717] transition-all cursor-pointer",
                      children: [
                         (0, g.jsx)("i", { className: "fa-solid fa-play mr-2" }),
                        "Start ",
                        he[o].name,
                        " (",
                        Et[b].name,
                        ")"
                      ]
                    }
                  )
                ] }),
                t === "shop" &&  (0, g.jsxs)(g.Fragment, { children: [
                   (0, g.jsxs)("div", { className: "flex items-center justify-between bg-slate-100 border border-slate-300 rounded-xl px-4 py-3", children: [
                     (0, g.jsxs)("div", { className: "flex items-center gap-4 mono-num text-sm font-extrabold", children: [
                       (0, g.jsxs)("span", { className: "text-amber-600", children: [
                         (0, g.jsx)("i", { className: "fa-solid fa-coins mr-1.5" }),
                        Nn.coins.toLocaleString()
                      ] }),
                       (0, g.jsxs)("span", { className: "text-purple-700", children: [
                         (0, g.jsx)("i", { className: "fa-solid fa-gem mr-1.5" }),
                        Nn.gems.toLocaleString()
                      ] })
                    ] }),
                     (0, g.jsx)("span", { className: "text-xs font-semibold text-slate-600", children: "Shared across all 5 slots" })
                  ] }),
                   (0, g.jsx)("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: Sn.map((T) => {
                    let D = Nn.permUpgrades[T.id] || 0, H = D >= T.max, le = Math.round(T.baseCost * Math.pow(T.costMult, D)), Ue = T.currency === "coins" ? Nn.coins >= le : Nn.gems >= le;
                    return  (0, g.jsxs)(
                      "div",
                      {
                        className: "p-3.5 rounded-xl bg-slate-50 border-2 border-slate-200 flex flex-col justify-between gap-3",
                        children: [
                           (0, g.jsxs)("div", { children: [
                             (0, g.jsxs)("div", { className: "flex items-center justify-between", children: [
                               (0, g.jsxs)("span", { className: "font-bold text-sm text-[#0f172a] flex items-center gap-2", children: [
                                 (0, g.jsx)("i", { className: `fa-solid ${T.icon} text-[#2b6cb0]` }),
                                T.name
                              ] }),
                               (0, g.jsxs)("span", { className: "text-xs mono-num font-bold text-slate-500", children: [
                                "Lv.",
                                D,
                                "/",
                                T.max
                              ] })
                            ] }),
                             (0, g.jsx)("p", { className: "text-xs text-slate-600 mt-1", children: T.desc })
                          ] }),
                           (0, g.jsx)(
                            "button",
                            {
                              disabled: H || !Ue,
                              onClick: () => q1(T.id),
                              className: `w-full py-2 rounded-lg text-xs font-bold mono-num transition-all ${H ? "bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default" : Ue ? "bg-[#2b6cb0] hover:bg-[#255c99] text-white border-2 border-[#171717] shadow-[0_2px_0_#171717] cursor-pointer" : "bg-slate-200 text-slate-400 cursor-not-allowed"}`,
                              children: H ? "MAXED" :  (0, g.jsxs)(g.Fragment, { children: [
                                 (0, g.jsx)("i", { className: `fa-solid ${T.currency === "coins" ? "fa-coins" : "fa-gem"} mr-1.5` }),
                                le.toLocaleString()
                              ] })
                            }
                          )
                        ]
                      },
                      T.id
                    );
                  }) })
                ] }),
                t === "account" &&  (0, g.jsxs)(g.Fragment, { children: [
                   (0, g.jsx)("div", { className: "grid grid-cols-4 gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-300", children: [
                    ["profile", "fa-id-badge", "Profile"],
                    ["stats", "fa-chart-simple", "Stats"],
                    ["achievements", "fa-medal", "Badges"],
                    ["scores", "fa-ranking-star", "Scores"]
                  ].map(([T, D, H]) =>  (0, g.jsxs)(
                    "button",
                    {
                      onClick: () => y(T),
                      className: `py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${m === T ? "bg-[#2b6cb0] text-white" : "text-slate-600 hover:text-slate-900"}`,
                      children: [
                         (0, g.jsx)("i", { className: `fa-solid ${D} mr-1.5` }),
                        H
                      ]
                    },
                    T
                  )) }),
                  m === "profile" &&  (0, g.jsxs)("div", { className: "space-y-4", children: [
                     (0, g.jsxs)("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
                       (0, g.jsxs)("div", { children: [
                         (0, g.jsx)("label", { className: "block text-xs font-bold text-slate-600 mb-1", children: "Display Name" }),
                         (0, g.jsx)(
                          "input",
                          {
                            value: f,
                            onChange: (T) => v(T.target.value),
                            maxLength: 20,
                            className: "w-full px-3 py-2 rounded-lg bg-slate-50 border-2 border-slate-300 text-sm text-[#0f172a] font-semibold focus:outline-none focus:border-[#2b6cb0]"
                          }
                        )
                      ] }),
                       (0, g.jsxs)("div", { children: [
                         (0, g.jsx)("label", { className: "block text-xs font-bold text-slate-600 mb-1", children: "Player Title" }),
                         (0, g.jsx)(
                          "input",
                          {
                            value: x,
                            onChange: (T) => M(T.target.value),
                            maxLength: 28,
                            className: "w-full px-3 py-2 rounded-lg bg-slate-50 border-2 border-slate-300 text-sm text-[#0f172a] font-semibold focus:outline-none focus:border-[#2b6cb0]"
                          }
                        )
                      ] })
                    ] }),
                     (0, g.jsxs)("div", { children: [
                       (0, g.jsxs)("div", { className: "flex items-center justify-between gap-2 mb-2", children: [
                         (0, g.jsx)("label", { className: "text-xs font-bold text-slate-600", children: "Profile Icon" }),
                         (0, g.jsxs)("div", { className: "relative w-48", children: [
                           (0, g.jsx)("i", { className: "fa-solid fa-magnifying-glass absolute left-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-400" }),
                           (0, g.jsx)(
                            "input",
                            {
                              value: z,
                              onChange: (T) => K(T.target.value),
                              placeholder: "Search icons (dragon, trophy...)",
                              className: "w-full pl-7 pr-2.5 py-1 rounded-lg bg-slate-50 border border-slate-300 text-xs text-[#0f172a] focus:outline-none focus:border-[#2b6cb0]"
                            }
                          )
                        ] })
                      ] }),
                       (0, g.jsx)("div", { className: "grid grid-cols-8 gap-2 max-h-48 overflow-y-auto pr-1", children: b1.filter((T) => {
                        let D = z.trim().toLowerCase();
                        return D ? T.label.toLowerCase().includes(D) || T.id.toLowerCase().includes(D) : !0;
                      }).map((T) =>  (0, g.jsx)(
                        "button",
                        {
                          onClick: () => C(T.id),
                          title: T.label,
                          className: `aspect-square rounded-lg border-2 flex items-center justify-center text-base transition-all cursor-pointer ${A === T.id ? "bg-[#2b6cb0] border-[#171717] text-white shadow-[0_2px_0_#171717]" : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-400"}`,
                          children:  (0, g.jsx)("i", { className: `fa-solid ${T.id}` })
                        },
                        T.id
                      )) })
                    ] }),
                     (0, g.jsxs)(
                      "button",
                      {
                        onClick: j1,
                        className: "w-full py-2.5 rounded-xl font-bold text-sm bg-[#2b6cb0] hover:bg-[#255c99] text-white border-2 border-[#171717] shadow-[0_3px_0_#171717] cursor-pointer",
                        children: [
                           (0, g.jsx)("i", { className: "fa-solid fa-check mr-2" }),
                          "Save Profile"
                        ]
                      }
                    )
                  ] }),
                  m === "stats" &&  (0, g.jsxs)("div", { className: "space-y-4", children: [
                     (0, g.jsx)("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-2.5", children: [
                      ["Total Bricks", xa.totalBricks.toLocaleString(), "fa-cubes"],
                      ["Total Shots", xa.totalShots.toLocaleString(), "fa-bullseye"],
                      ["Games Played", xa.totalGames.toLocaleString(), "fa-gamepad"],
                      ["Highest Level", `Lv.${xa.highestLevel}`, "fa-arrow-up-right-dots"],
                      ["Highest Score", xa.highestScore.toLocaleString(), "fa-trophy"],
                      ["Best Combo", `${xa.highestCombo}x`, "fa-bolt"]
                    ].map(([T, D, H]) =>  (0, g.jsxs)("div", { className: "p-3 rounded-xl bg-slate-50 border border-slate-200", children: [
                       (0, g.jsxs)("div", { className: "text-[11px] font-semibold text-slate-500 flex items-center gap-1.5", children: [
                         (0, g.jsx)("i", { className: `fa-solid ${H} text-[#2b6cb0]` }),
                        T
                      ] }),
                       (0, g.jsx)("div", { className: "text-base font-extrabold mono-num text-[#0f172a] mt-1", children: D })
                    ] }, T)) }),
                     (0, g.jsxs)("div", { className: "p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2", children: [
                       (0, g.jsx)("div", { className: "text-xs font-extrabold uppercase tracking-wider text-slate-500", children: "Mode Records" }),
                       (0, g.jsxs)("div", { className: "grid grid-cols-3 gap-2 text-center mono-num", children: [
                         (0, g.jsxs)("div", { className: "p-2 rounded-lg bg-white border border-slate-200", children: [
                           (0, g.jsx)("div", { className: "text-[11px] font-bold text-blue-600", children: "Infinite" }),
                           (0, g.jsxs)("div", { className: "font-extrabold text-[#0f172a]", children: [
                            "Lv.",
                            Ec.infinite
                          ] })
                        ] }),
                         (0, g.jsxs)("div", { className: "p-2 rounded-lg bg-white border border-slate-200", children: [
                           (0, g.jsx)("div", { className: "text-[11px] font-bold text-red-600", children: "Hell" }),
                           (0, g.jsxs)("div", { className: "font-extrabold text-[#0f172a]", children: [
                            "Lv.",
                            Ec.hell
                          ] })
                        ] }),
                         (0, g.jsxs)("div", { className: "p-2 rounded-lg bg-white border border-slate-200", children: [
                           (0, g.jsx)("div", { className: "text-[11px] font-bold text-purple-700", children: "Tartarus" }),
                           (0, g.jsxs)("div", { className: "font-extrabold text-[#0f172a]", children: [
                            "Lv.",
                            Ec.tartarus
                          ] })
                        ] })
                      ] })
                    ] }),
                     (0, g.jsxs)("div", { className: "p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2", children: [
                       (0, g.jsx)("div", { className: "text-xs font-extrabold uppercase tracking-wider text-slate-500", children: "Speedrun PBs" }),
                       (0, g.jsx)("div", { className: "grid grid-cols-5 gap-1.5 text-center mono-num text-xs", children: ["speedrun_25", "speedrun_50", "speedrun_100", "speedrun_250", "speedrun_500"].map(
                        (T) =>  (0, g.jsxs)("div", { className: "p-2 rounded-lg bg-white border border-slate-200", children: [
                           (0, g.jsx)("div", { className: "text-[10px] font-bold text-emerald-700", children: T.replace("speedrun_", "SR ") }),
                           (0, g.jsx)("div", { className: "font-bold text-[#0f172a] mt-0.5", children: Z1(G1[T]) })
                        ] }, T)
                      ) })
                    ] })
                  ] }),
                  m === "achievements" &&  (0, g.jsx)("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5", children: bc.map((T) => {
                    let D = L1.includes(T.id);
                    return  (0, g.jsxs)(
                      "div",
                      {
                        className: `p-3 rounded-xl border-2 flex items-start gap-3 ${D ? "bg-emerald-50 border-emerald-500" : "bg-slate-50 border-slate-200 opacity-70"}`,
                        children: [
                           (0, g.jsx)(
                            "div",
                            {
                              className: `w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${D ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-500"}`,
                              children:  (0, g.jsx)("i", { className: `fa-solid ${T.icon}` })
                            }
                          ),
                           (0, g.jsxs)("div", { className: "min-w-0", children: [
                             (0, g.jsx)("div", { className: "text-xs font-bold text-[#0f172a]", children: T.name }),
                             (0, g.jsx)("div", { className: "text-[11px] text-slate-600", children: T.desc }),
                             (0, g.jsxs)("div", { className: "text-[10px] mono-num font-bold text-amber-700 mt-1", children: [
                              "+",
                              T.rewardCoins,
                              "c \xB7 +",
                              T.rewardGems,
                              "g"
                            ] })
                          ] })
                        ]
                      },
                      T.id
                    );
                  }) }),
                  m === "scores" &&  (0, g.jsxs)("div", { className: "space-y-3", children: [
                     (0, g.jsxs)("div", { className: "grid grid-cols-2 gap-2", children: [
                       (0, g.jsx)(
                        "select",
                        {
                          value: O,
                          onChange: (T) => {
                            let D = T.target.value;
                            yt(D), V((H) => Ee(D, H));
                          },
                          className: "px-2.5 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs font-bold text-[#0f172a]",
                          children: Object.keys(he).map((T) =>  (0, g.jsx)("option", { value: T, children: he[T].name }, T))
                        }
                      ),
                       (0, g.jsx)(
                        "select",
                        {
                          value: E,
                          onChange: (T) => V(T.target.value),
                          className: "px-2.5 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs font-bold text-[#0f172a]",
                          children: Object.keys(Et).map((T) =>  (0, g.jsx)("option", { value: T, disabled: !Ei(O, T), children: Et[T].name }, T))
                        }
                      )
                    ] }),
                    (() => {
                      let T = a.getLeaderboard(O, E);
                      return T.length === 0 ?  (0, g.jsxs)("div", { className: "text-center py-8 text-sm text-slate-500", children: [
                        "No Top 100 scores yet for ",
                        he[O].short,
                        " (",
                        Et[E].short,
                        ")."
                      ] }) :  (0, g.jsx)("div", { className: "space-y-1.5 max-h-72 overflow-y-auto pr-1", children: T.map((D, H) =>  (0, g.jsxs)(
                        "div",
                        {
                          className: "flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs",
                          children: [
                             (0, g.jsxs)("div", { className: "flex items-center gap-3", children: [
                               (0, g.jsxs)("span", { className: "mono-num font-extrabold text-slate-400 w-7", children: [
                                "#",
                                H + 1
                              ] }),
                               (0, g.jsxs)("div", { className: "font-bold text-[#0f172a]", children: [
                                "Level ",
                                D.level
                              ] })
                            ] }),
                             (0, g.jsx)("div", { className: "mono-num font-extrabold text-sm text-[#2b6cb0]", children: D.score.toLocaleString() })
                          ]
                        },
                        H
                      )) });
                    })()
                  ] })
                ] }),
                t === "settings" &&  (0, g.jsxs)("div", { className: "space-y-5", children: [
                   (0, g.jsx)(
                    "input",
                    {
                      ref: Qf,
                      type: "file",
                      accept: ".json,.txt,.bb13,.bb14",
                      className: "hidden",
                      onChange: Q1
                    }
                  ),
                   (0, g.jsx)("div", { className: "grid grid-cols-2 gap-2.5", children: [
                    ["sound", "Sound Effects", "fa-volume-high"],
                    ["bgm", "Mode Music", "fa-music"],
                    ["particles", "Particles", "fa-sparkles"],
                    ["screenShake", "Screen Shake", "fa-wave-square"]
                  ].map(([T, D, H]) =>  (0, g.jsxs)(
                    "button",
                    {
                      onClick: () => X1(T, !Ci[T]),
                      className: `flex items-center justify-between px-3.5 py-2.5 rounded-xl border-2 text-xs font-bold cursor-pointer ${Ci[T] ? "bg-sky-50 border-[#171717] text-[#0f172a]" : "bg-slate-50 border-slate-200 text-slate-500"}`,
                      children: [
                         (0, g.jsxs)("span", { children: [
                           (0, g.jsx)("i", { className: `fa-solid ${H} mr-2` }),
                          D
                        ] }),
                         (0, g.jsx)("span", { className: "mono-num", children: Ci[T] ? "ON" : "OFF" })
                      ]
                    },
                    T
                  )) }),
                   (0, g.jsxs)("div", { className: "p-4 rounded-xl bg-slate-50 border-2 border-slate-200 space-y-3", children: [
                     (0, g.jsxs)("div", { className: "text-xs font-extrabold uppercase tracking-wider text-[#0f172a] flex items-center gap-2", children: [
                       (0, g.jsx)("i", { className: "fa-solid fa-shield-halved text-emerald-600" }),
                      "Authenticated v14 & Legacy v13 Save Manager"
                    ] }),
                     (0, g.jsxs)("div", { className: "grid grid-cols-2 gap-2", children: [
                       (0, g.jsxs)(
                        "button",
                        {
                          onClick: () => V1(`brick_breaker_v14_slot${a.getActiveSlot()}.json`, a.exportBackupFile()),
                          className: "py-2 px-3 rounded-lg bg-[#1e293b] hover:bg-[#0f172a] text-xs font-bold text-white cursor-pointer",
                          children: [
                             (0, g.jsx)("i", { className: "fa-solid fa-download mr-1.5" }),
                            "Export v14 File"
                          ]
                        }
                      ),
                       (0, g.jsxs)(
                        "button",
                        {
                          onClick: () => Qf.current?.click(),
                          className: "py-2 px-3 rounded-lg bg-[#2b6cb0] hover:bg-[#255c99] text-xs font-bold text-white border-2 border-[#171717] shadow-[0_2px_0_#171717] cursor-pointer",
                          children: [
                             (0, g.jsx)("i", { className: "fa-solid fa-upload mr-1.5" }),
                            "Import v13 / v14 File"
                          ]
                        }
                      )
                    ] }),
                     (0, g.jsxs)("div", { className: "flex gap-2", children: [
                       (0, g.jsxs)(
                        "button",
                        {
                          onClick: () => B1(a.exportSaveCode()),
                          className: "px-3 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-xs font-bold text-slate-800 cursor-pointer whitespace-nowrap",
                          children: [
                             (0, g.jsx)("i", { className: "fa-solid fa-key mr-1.5" }),
                            "Get v14 Code"
                          ]
                        }
                      ),
                      Ai &&  (0, g.jsx)(
                        "input",
                        {
                          readOnly: !0,
                          value: Ai,
                          onFocus: (T) => T.currentTarget.select(),
                          className: "flex-1 px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 mono-num text-[11px] text-emerald-800"
                        }
                      )
                    ] }),
                     (0, g.jsxs)("div", { className: "flex gap-2", children: [
                       (0, g.jsx)(
                        "input",
                        {
                          value: St,
                          onChange: (T) => We(T.target.value),
                          placeholder: "Paste v14 or v13 save code...",
                          className: "flex-1 px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-[#0f172a] focus:outline-none focus:border-[#2b6cb0]"
                        }
                      ),
                       (0, g.jsx)(
                        "button",
                        {
                          onClick: () => Zf(St),
                          className: "px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white cursor-pointer",
                          children: "Load"
                        }
                      )
                    ] })
                  ] })
                ] }),
                t === "guide" &&  (0, g.jsx)("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5", children: vc.map((T) =>  (0, g.jsxs)("div", { className: "p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3", children: [
                   (0, g.jsx)(
                    "div",
                    {
                      className: "w-11 h-9 rounded-md shrink-0 border border-black/20 flex items-center justify-center text-white text-sm shadow-sm",
                      style: { background: `linear-gradient(180deg, ${T.color}, #1e293b)` },
                      children:  (0, g.jsx)("i", { className: `fa-solid ${T.faIcon}` })
                    }
                  ),
                   (0, g.jsxs)("div", { className: "min-w-0", children: [
                     (0, g.jsxs)("div", { className: "text-xs font-bold text-[#0f172a] flex items-center gap-1.5", children: [
                       (0, g.jsx)("span", { children: T.name }),
                       (0, g.jsx)("span", { className: "text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-200 text-slate-600", children: T.tier })
                    ] }),
                     (0, g.jsx)("div", { className: "text-[11px] text-slate-600 leading-snug mt-0.5", children: T.desc })
                  ] })
                ] }, T.type)) })
              ] })
            ]
          }
        )
      }
    );
  };
  var Rf = be(_a(), 1);
  var w = be(hl(), 1);
  function Mg(t) {
    return t ? t === "tartarus" ? `url("data:image/svg+xml,${encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="150" viewBox="0 0 640 150"><defs><linearGradient id="tb" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#06010d"/><stop offset="50%" stop-color="#1e0533"/><stop offset="100%" stop-color="#090112"/></linearGradient><radialGradient id="tg" cx="76%" cy="46%" r="38%"><stop offset="0%" stop-color="#d946ef" stop-opacity="0.6"/><stop offset="45%" stop-color="#7e22ce" stop-opacity="0.28"/><stop offset="100%" stop-color="#000" stop-opacity="0"/></radialGradient></defs><rect width="640" height="150" fill="url(#tb)"/><rect width="640" height="150" fill="url(#tg)"/><circle cx="488" cy="70" r="54" fill="none" stroke="#e879f9" stroke-width="1.6" stroke-dasharray="10 6" opacity="0.5"/><circle cx="488" cy="70" r="34" fill="none" stroke="#f43f5e" stroke-width="2" opacity="0.6"/><circle cx="488" cy="70" r="14" fill="#c084fc" opacity="0.45"/><path d="M0 120 L70 84 L145 106 L230 62 L310 95 L395 52 L470 88 L555 46 L640 82 L640 150 L0 150 Z" fill="#030008" opacity="0.82"/><path d="M0 135 L110 102 L220 125 L350 92 L490 122 L640 96 L640 150 L0 150 Z" fill="#000" opacity="0.9"/><g fill="#f0abfc"><circle cx="340" cy="24" r="1.8" opacity="0.8"/><circle cx="410" cy="18" r="1.4" opacity="0.6"/><circle cx="560" cy="26" r="2.2" opacity="0.75"/><circle cx="595" cy="48" r="1.5" opacity="0.7"/></g></svg>'
    )}")` : t === "hell" ? `url("data:image/svg+xml,${encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="150" viewBox="0 0 640 150"><defs><linearGradient id="hb" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1f0303"/><stop offset="50%" stop-color="#6b1111"/><stop offset="100%" stop-color="#170202"/></linearGradient><radialGradient id="hg" cx="78%" cy="68%" r="44%"><stop offset="0%" stop-color="#fb923c" stop-opacity="0.7"/><stop offset="45%" stop-color="#ef4444" stop-opacity="0.3"/><stop offset="100%" stop-color="#000" stop-opacity="0"/></radialGradient></defs><rect width="640" height="150" fill="url(#hb)"/><rect width="640" height="150" fill="url(#hg)"/><path d="M0 124 L85 74 L165 104 L265 48 L355 92 L455 34 L545 84 L640 44 L640 150 L0 150 Z" fill="#140202" opacity="0.85"/><path d="M265 48 L284 86 L306 68 M455 34 L472 74 L495 58" fill="none" stroke="#f97316" stroke-width="2.2" opacity="0.75"/><path d="M0 142 Q160 128 320 140 T640 134 L640 150 L0 150 Z" fill="#ea580c" opacity="0.55"/><g fill="#fde047"><circle cx="320" cy="36" r="2" opacity="0.85"/><circle cx="395" cy="22" r="2.4" opacity="0.8"/><circle cx="490" cy="26" r="1.8" opacity="0.9"/><circle cx="555" cy="42" r="2.2" opacity="0.75"/><circle cx="430" cy="56" r="1.6" opacity="0.7"/></g></svg>'
    )}")` : t.startsWith("speedrun_") ? `url("data:image/svg+xml,${encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="150" viewBox="0 0 640 150"><defs><linearGradient id="sb" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#022c22"/><stop offset="55%" stop-color="#0d9488"/><stop offset="100%" stop-color="#042f2e"/></linearGradient></defs><rect width="640" height="150" fill="url(#sb)"/><g stroke="#5eead4" stroke-linecap="round" opacity="0.4"><line x1="280" y1="22" x2="620" y2="22" stroke-width="3.5"/><line x1="350" y1="48" x2="640" y2="48" stroke-width="2"/><line x1="240" y1="75" x2="600" y2="75" stroke-width="4.5"/><line x1="330" y1="102" x2="640" y2="102" stroke-width="2.5"/><line x1="390" y1="126" x2="630" y2="126" stroke-width="2"/></g><polygon points="480,16 530,75 480,134 504,134 554,75 504,16" fill="#6ee7b7" opacity="0.32"/><polygon points="535,16 585,75 535,134 559,134 609,75 559,16" fill="#a7f3d0" opacity="0.22"/></svg>'
    )}")` : `url("data:image/svg+xml,${encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="150" viewBox="0 0 640 150"><defs><linearGradient id="ib" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0f172a"/><stop offset="50%" stop-color="#1d4ed8"/><stop offset="100%" stop-color="#0c1938"/></linearGradient><radialGradient id="ig" cx="78%" cy="48%" r="42%"><stop offset="0%" stop-color="#38bdf8" stop-opacity="0.55"/><stop offset="100%" stop-color="#0f172a" stop-opacity="0"/></radialGradient></defs><rect width="640" height="150" fill="url(#ib)"/><rect width="640" height="150" fill="url(#ig)"/><g opacity="0.34" stroke="#e0f2fe" stroke-width="1.2"><rect x="370" y="16" width="58" height="24" rx="5" fill="#60a5fa"/><rect x="436" y="16" width="58" height="24" rx="5" fill="#38bdf8"/><rect x="502" y="16" width="58" height="24" rx="5" fill="#818cf8"/><rect x="404" y="48" width="58" height="24" rx="5" fill="#3b82f6"/><rect x="470" y="48" width="58" height="24" rx="5" fill="#22d3ee"/><rect x="436" y="80" width="58" height="24" rx="5" fill="#60a5fa"/></g><circle cx="384" cy="108" r="9" fill="#ffffff" opacity="0.85"/><line x1="384" y1="108" x2="452" y2="62" stroke="#ffffff" stroke-width="2.2" stroke-dasharray="5 5" opacity="0.55"/></svg>'
    )}")` : `url("data:image/svg+xml,${encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="150" viewBox="0 0 640 150"><defs><linearGradient id="eb" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff"/><stop offset="100%" stop-color="#e2e8f0"/></linearGradient><pattern id="eg" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0L0 0 0 24" fill="none" stroke="#94a3b8" stroke-width="0.6" opacity="0.35"/></pattern></defs><rect width="640" height="150" fill="url(#eb)"/><rect width="640" height="150" fill="url(#eg)"/><g opacity="0.28"><rect x="440" y="18" width="56" height="24" rx="6" fill="#3b82f6"/><rect x="504" y="18" width="56" height="24" rx="6" fill="#60a5fa"/><rect x="568" y="18" width="56" height="24" rx="6" fill="#93c5fd"/><rect x="472" y="50" width="56" height="24" rx="6" fill="#2563eb"/><rect x="536" y="50" width="56" height="24" rx="6" fill="#3b82f6"/></g><circle cx="425" cy="112" r="9" fill="#2b6cb0" opacity="0.4"/><line x1="425" y1="112" x2="495" y2="62" stroke="#2b6cb0" stroke-width="2" stroke-dasharray="5 5" opacity="0.35"/></svg>'
    )}")`;
  }
  var p1 = ({
    slots: t,
    profile: e,
    meta: l,
    stats: a,
    onBackToMenu: n,
    onOpenShop: i,
    onOpenAchievements: u,
    onOpenProfile: c,
    onOpenSettings: s,
    onSelectSlot: o,
    onClearSlot: r,
    onImportToSlot: b
  }) => {
    let d = (0, Rf.useRef)(null), m = (0, Rf.useRef)(1), y = (_) => {
      m.current = _, d.current?.click();
    };
    return  (0, w.jsxs)("div", { className: "min-h-screen w-full flex flex-col items-center p-3 sm:p-5", children: [
       (0, w.jsx)(
        "input",
        {
          ref: d,
          type: "file",
          accept: ".json,.txt,.bb13,.bb14",
          className: "hidden",
          onChange: (_) => {
            let h = _.target.files?.[0];
            if (!h) return;
            let f = new FileReader();
            f.onload = () => {
              typeof f.result == "string" && b(m.current, f.result);
            }, f.readAsText(h), _.target.value = "";
          }
        }
      ),
       (0, w.jsxs)("div", { className: "w-full max-w-2xl mb-4 rounded-2xl bg-white border-2 border-[#171717] px-3.5 py-2.5 shadow-[0_6px_18px_rgba(15,23,42,0.08)] flex flex-wrap items-center justify-between gap-2", children: [
         (0, w.jsxs)("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
           (0, w.jsxs)(
            "button",
            {
              onClick: n,
              className: "px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs font-bold text-slate-800 cursor-pointer",
              children: [
                 (0, w.jsx)("i", { className: "fa-solid fa-house mr-1.5 text-[#2b6cb0]" }),
                "Home"
              ]
            }
          ),
           (0, w.jsxs)(
            "button",
            {
              onClick: i,
              className: "px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-xs font-bold text-amber-800 cursor-pointer",
              children: [
                 (0, w.jsx)("i", { className: "fa-solid fa-bolt mr-1.5 text-amber-600" }),
                "Upgrades & Buffs"
              ]
            }
          ),
           (0, w.jsxs)(
            "button",
            {
              onClick: u,
              className: "px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs font-bold text-slate-800 cursor-pointer",
              children: [
                 (0, w.jsx)("i", { className: "fa-solid fa-trophy mr-1.5 text-amber-500" }),
                "Badges"
              ]
            }
          ),
           (0, w.jsxs)(
            "button",
            {
              onClick: c,
              className: "px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs font-bold text-slate-800 cursor-pointer",
              children: [
                 (0, w.jsx)("i", { className: `fa-solid ${e.icon} mr-1.5 text-[#2b6cb0]` }),
                e.name
              ]
            }
          ),
           (0, w.jsx)(
            "button",
            {
              onClick: s,
              className: "w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 flex items-center justify-center cursor-pointer",
              title: "Settings & Save Data",
              children:  (0, w.jsx)("i", { className: "fa-solid fa-gear" })
            }
          )
        ] }),
         (0, w.jsxs)("div", { className: "flex items-center gap-2.5 bg-slate-100 border border-slate-300 rounded-xl px-3 py-1.5 shadow-inner mono-num text-xs font-extrabold", children: [
           (0, w.jsxs)("span", { className: "text-amber-600", children: [
             (0, w.jsx)("i", { className: "fa-solid fa-coins mr-1" }),
            l.coins.toLocaleString()
          ] }),
           (0, w.jsx)("span", { className: "text-slate-300", children: "|" }),
           (0, w.jsxs)("span", { className: "text-purple-700", children: [
             (0, w.jsx)("i", { className: "fa-solid fa-gem mr-1" }),
            l.gems.toLocaleString()
          ] }),
           (0, w.jsx)("span", { className: "text-slate-300", children: "|" }),
           (0, w.jsxs)("span", { className: "text-emerald-700", children: [
             (0, w.jsx)("i", { className: "fa-solid fa-trophy mr-1" }),
            "Lv.",
            a.highestLevel
          ] })
        ] })
      ] }),
       (0, w.jsxs)("div", { className: "w-full max-w-2xl rounded-2xl bg-white border-2 border-[#171717] p-5 sm:p-6 shadow-[0_14px_36px_rgba(15,23,42,0.12)] space-y-4", children: [
         (0, w.jsxs)("div", { className: "flex items-center justify-between", children: [
           (0, w.jsx)("h1", { className: "text-xl font-extrabold tracking-tight text-[#0f172a]", children: "Save Slots" }),
           (0, w.jsx)("span", { className: "text-xs font-semibold text-slate-500", children: "Shared coins, gems, upgrades & records" })
        ] }),
         (0, w.jsx)("div", { className: "grid grid-cols-1 gap-3", children: t.map((_) => {
          let h = _.mode ? he[_.mode] : null, f = _.difficulty ? Et[_.difficulty] : null, v = !!(_.hasRun && h && f);
          return  (0, w.jsxs)(
            "div",
            {
              style: {
                backgroundImage: Mg(v ? _.mode : void 0),
                backgroundSize: "cover",
                backgroundPosition: "center"
              },
              className: `relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border-2 transition-all ${v ? "border-[#171717] text-white shadow-[0_4px_0_#171717]" : "border-slate-300 hover:border-[#171717] text-[#0f172a]"}`,
              children: [
                 (0, w.jsxs)("div", { className: "flex items-center gap-3.5 min-w-0 z-10", children: [
                   (0, w.jsxs)(
                    "div",
                    {
                      className: `w-10 h-10 rounded-lg flex items-center justify-center mono-num font-extrabold text-sm shrink-0 border ${v ? "bg-black/45 border-white/25 text-white" : "bg-[#1e293b] border-[#171717] text-white"}`,
                      children: [
                        "#",
                        _.slot
                      ]
                    }
                  ),
                  v && h && f ?  (0, w.jsxs)("div", { className: "min-w-0", children: [
                     (0, w.jsxs)("div", { className: "flex items-center gap-2 flex-wrap", children: [
                       (0, w.jsxs)("span", { className: "font-extrabold text-white flex items-center gap-1.5 text-sm drop-shadow-sm", children: [
                         (0, w.jsx)("i", { className: `fa-solid ${h.icon}` }),
                        h.name
                      ] }),
                       (0, w.jsx)(
                        "span",
                        {
                          className: "text-[11px] mono-num font-extrabold px-1.5 py-0.5 rounded bg-black/55 border border-white/20",
                          style: { color: f.color },
                          children: f.short
                        }
                      )
                    ] }),
                     (0, w.jsxs)("div", { className: "text-xs text-slate-200 mono-num mt-0.5 flex items-center gap-3 font-semibold", children: [
                       (0, w.jsxs)("span", { children: [
                        "Lv.",
                        _.level
                      ] }),
                       (0, w.jsxs)("span", { children: [
                        "Score ",
                        (_.score || 0).toLocaleString()
                      ] }),
                       (0, w.jsxs)("span", { children: [
                        _.ballCount,
                        " Balls"
                      ] })
                    ] })
                  ] }) :  (0, w.jsxs)("div", { children: [
                     (0, w.jsx)("div", { className: "font-bold text-[#0f172a] text-sm", children: "Empty Slot" }),
                     (0, w.jsx)("div", { className: "text-xs text-slate-500", children: "Pick a gamemode & difficulty or import a save" })
                  ] })
                ] }),
                 (0, w.jsxs)("div", { className: "flex items-center gap-2 shrink-0 z-10", children: [
                   (0, w.jsxs)(
                    "button",
                    {
                      onClick: () => y(_.slot),
                      className: `px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${v ? "bg-black/45 hover:bg-black/65 text-white border border-white/20" : "bg-slate-200 hover:bg-slate-300 text-slate-800"}`,
                      title: "Import v13 or v14 save into this slot",
                      children: [
                         (0, w.jsx)("i", { className: "fa-solid fa-file-import mr-1.5" }),
                        "Import"
                      ]
                    }
                  ),
                  v &&  (0, w.jsx)(
                    "button",
                    {
                      onClick: () => r(_.slot),
                      className: "px-2.5 py-2 rounded-lg text-xs font-bold bg-red-600/80 hover:bg-red-600 text-white border border-red-400/40 transition-colors cursor-pointer",
                      title: "Clear this run slot",
                      children:  (0, w.jsx)("i", { className: "fa-solid fa-trash-can" })
                    }
                  ),
                   (0, w.jsxs)(
                    "button",
                    {
                      onClick: () => o(_.slot, !v),
                      className: "px-4 py-2 rounded-xl text-xs font-bold bg-[#2b6cb0] hover:bg-[#255c99] active:translate-y-[1px] text-white border-2 border-[#171717] shadow-[0_3px_0_#171717] transition-all cursor-pointer whitespace-nowrap",
                      children: [
                        v ? "Resume" : "Start New",
                         (0, w.jsx)("i", { className: "fa-solid fa-play ml-1.5" })
                      ]
                    }
                  )
                ] })
              ]
            },
            _.slot
          );
        }) })
      ] })
    ] });
  };
  var gc = class {
    #t = null;
    #a = !0;
    #n = !0;
    #s = null;
    #v = 0;
    setOptions(e, l) {
      this.#a = e, this.#n = l, l || this.stopBgm();
    }
    #m() {
      if (!this.#a) return null;
      if (!this.#t && typeof window < "u") {
        let e = window.AudioContext || window.webkitAudioContext;
        e && (this.#t = new e());
      }
      return this.#t && this.#t.state === "suspended" && this.#t.resume().catch(() => {
      }), this.#t;
    }
    playHit(e = 1, l = "infinite") {
      let a = this.#m();
      if (!a) return;
      let n = a.currentTime, i = a.createOscillator(), u = a.createGain(), s = Math.min(1200, (l === "tartarus" ? 220 : l === "hell" ? 260 : 340) + e * 16);
      i.type = l === "tartarus" ? "sawtooth" : l === "hell" ? "triangle" : "sine", i.frequency.setValueAtTime(s, n), i.frequency.exponentialRampToValueAtTime(s * 1.18, n + 0.045), u.gain.setValueAtTime(0.08, n), u.gain.exponentialRampToValueAtTime(1e-3, n + 0.06), i.connect(u), u.connect(a.destination), i.start(n), i.stop(n + 0.065);
    }
    playBreak(e = !1) {
      let l = this.#m();
      if (!l) return;
      let a = l.currentTime, n = l.createOscillator(), i = l.createGain();
      n.type = e ? "sawtooth" : "triangle", n.frequency.setValueAtTime(e ? 140 : 480, a), n.frequency.exponentialRampToValueAtTime(e ? 45 : 160, a + (e ? 0.2 : 0.09)), i.gain.setValueAtTime(e ? 0.16 : 0.1, a), i.gain.exponentialRampToValueAtTime(1e-3, a + (e ? 0.22 : 0.1)), n.connect(i), i.connect(l.destination), n.start(a), n.stop(a + (e ? 0.23 : 0.11));
    }
    playBonusBall() {
      let e = this.#m();
      if (!e) return;
      let l = e.currentTime, a = e.createOscillator(), n = e.createGain();
      a.type = "sine", a.frequency.setValueAtTime(587.33, l), a.frequency.setValueAtTime(880, l + 0.055), n.gain.setValueAtTime(0.11, l), n.gain.exponentialRampToValueAtTime(1e-3, l + 0.16), a.connect(n), n.connect(e.destination), a.start(l), a.stop(l + 0.17);
    }
    playGameOver() {
      let e = this.#m();
      if (!e) return;
      let l = e.currentTime, a = e.createOscillator(), n = e.createGain();
      a.type = "sawtooth", a.frequency.setValueAtTime(220, l), a.frequency.exponentialRampToValueAtTime(55, l + 0.45), n.gain.setValueAtTime(0.14, l), n.gain.exponentialRampToValueAtTime(1e-3, l + 0.48), a.connect(n), n.connect(e.destination), a.start(l), a.stop(l + 0.5);
    }
    startBgm(e) {
      if (this.stopBgm(), !this.#n || !this.#a || e !== "tartarus" && e !== "hell") return;
      let l = e === "tartarus" ? [110, 130.81, 146.83, 103.83] : [130.81, 155.56, 174.61, 123.47];
      this.#v = 0, this.#s = window.setInterval(() => {
        if (!this.#n || !this.#a) {
          this.stopBgm();
          return;
        }
        let a = this.#m();
        if (!a) return;
        let n = a.currentTime, i = a.createOscillator(), u = a.createGain();
        i.type = "triangle", i.frequency.setValueAtTime(l[this.#v % l.length], n), u.gain.setValueAtTime(0.035, n), u.gain.exponentialRampToValueAtTime(1e-3, n + 0.32), i.connect(u), u.connect(a.destination), i.start(n), i.stop(n + 0.34), this.#v++;
      }, 420);
    }
    stopBgm() {
      this.#s !== null && (clearInterval(this.#s), this.#s = null);
    }
  };
  var _g = [66, 49, 52, 95, 83, 69, 67, 95, 86, 76, 84, 95, 57, 57, 50, 55], Eg = [122, 25, 228, 60, 139, 81, 210, 15, 99, 168, 78, 145, 45, 247, 21, 198], x1 = "BB_V12_SECURE_SALT_99823";
  function Pt(t, e) {
    return (t << e | t >>> 32 - e) >>> 0;
  }
  function Kl(t, e, l, a, n) {
    t[e] = t[e] + t[l] >>> 0, t[n] = Pt(t[n] ^ t[e], 16), t[a] = t[a] + t[n] >>> 0, t[l] = Pt(t[l] ^ t[a], 12), t[e] = t[e] + t[l] >>> 0, t[n] = Pt(t[n] ^ t[e], 8), t[a] = t[a] + t[n] >>> 0, t[l] = Pt(t[l] ^ t[a], 7);
  }
  function Ag(t, e, l) {
    let a = new Uint32Array(16);
    a[0] = 1634760805, a[1] = 857760878, a[2] = 2036477234, a[3] = 1797285236;
    let n = new DataView(t.buffer, t.byteOffset, t.byteLength);
    for (let o = 0; o < 8; o++) a[4 + o] = n.getUint32(o * 4, !0);
    a[12] = e >>> 0;
    let i = new DataView(l.buffer, l.byteOffset, l.byteLength);
    a[13] = i.getUint32(0, !0), a[14] = i.getUint32(4, !0), a[15] = i.getUint32(8, !0);
    let u = new Uint32Array(a);
    for (let o = 0; o < 10; o++)
      Kl(u, 0, 4, 8, 12), Kl(u, 1, 5, 9, 13), Kl(u, 2, 6, 10, 14), Kl(u, 3, 7, 11, 15), Kl(u, 0, 5, 10, 15), Kl(u, 1, 6, 11, 12), Kl(u, 2, 7, 8, 13), Kl(u, 3, 4, 9, 14);
    let c = new Uint8Array(64), s = new DataView(c.buffer);
    for (let o = 0; o < 16; o++) s.setUint32(o * 4, u[o] + a[o] >>> 0, !0);
    return c;
  }
  function S1(t, e, l) {
    let a = new Uint8Array(l.length);
    for (let n = 0, i = 1; n < l.length; n += 64, i++) {
      let u = Ag(t, i, e), c = Math.min(64, l.length - n);
      for (let s = 0; s < c; s++) a[n + s] = l[n + s] ^ u[s];
    }
    return a;
  }
  var Cg = new Uint32Array([
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ]);
  function Uf(t) {
    let e = t.length, l = e * 8, a = e + 9 + 63 >> 6 << 6, n = new Uint8Array(a);
    n.set(t), n[e] = 128;
    let i = new DataView(n.buffer);
    i.setUint32(a - 8, Math.floor(l / 4294967296), !1), i.setUint32(a - 4, l >>> 0, !1);
    let u = 1779033703, c = 3144134277, s = 1013904242, o = 2773480762, r = 1359893119, b = 2600822924, d = 528734635, m = 1541459225, y = new Uint32Array(64);
    for (let h = 0; h < a; h += 64) {
      for (let O = 0; O < 16; O++) y[O] = i.getUint32(h + O * 4, !1);
      for (let O = 16; O < 64; O++) {
        let yt = Pt(y[O - 15], 25) ^ Pt(y[O - 15], 14) ^ y[O - 15] >>> 3, E = Pt(y[O - 2], 15) ^ Pt(y[O - 2], 13) ^ y[O - 2] >>> 10;
        y[O] = y[O - 16] + yt + y[O - 7] + E >>> 0;
      }
      let f = u, v = c, x = s, M = o, A = r, C = b, z = d, K = m;
      for (let O = 0; O < 64; O++) {
        let yt = Pt(A, 26) ^ Pt(A, 21) ^ Pt(A, 7), E = A & C ^ ~A & z, V = K + yt + E + Cg[O] + y[O] >>> 0, St = Pt(f, 30) ^ Pt(f, 19) ^ Pt(f, 10), We = f & v ^ f & x ^ v & x, Ai = St + We >>> 0;
        K = z, z = C, C = A, A = M + V >>> 0, M = x, x = v, v = f, f = V + Ai >>> 0;
      }
      u = u + f >>> 0, c = c + v >>> 0, s = s + x >>> 0, o = o + M >>> 0, r = r + A >>> 0, b = b + C >>> 0, d = d + z >>> 0, m = m + K >>> 0;
    }
    let N = new Uint8Array(32), _ = new DataView(N.buffer);
    return [u, c, s, o, r, b, d, m].forEach((h, f) => _.setUint32(f * 4, h, !1)), N;
  }
  function pc(t, e) {
    let l = t.length > 64 ? Uf(t) : t, a = new Uint8Array(64 + e.length), n = new Uint8Array(96);
    for (let i = 0; i < 64; i++) {
      let u = i < l.length ? l[i] : 0;
      a[i] = u ^ 54, n[i] = u ^ 92;
    }
    return a.set(e, 64), n.set(Uf(a), 64), Uf(n);
  }
  function Og(t, e) {
    if (t.length !== e.length) return !1;
    let l = 0;
    for (let a = 0; a < t.length; a++) l |= t[a] ^ e[a];
    return l === 0;
  }
  function T1(t) {
    let e = new Uint8Array(32);
    for (let i = 0; i < 16; i++)
      e[i] = _g[i] ^ i * 31 + 7 & 255, e[16 + i] = Eg[i] ^ i * 17 + 13 & 255;
    let l = new TextEncoder().encode(t), a = pc(e, new Uint8Array([...l, 1])), n = pc(e, new Uint8Array([...l, 2]));
    return { enc: a, mac: n };
  }
  function zg(t) {
    let e = "";
    for (let l = 0; l < t.length; l += 32768)
      e += String.fromCharCode(...t.subarray(l, l + 32768));
    return btoa(e);
  }
  function Dg(t) {
    let e = atob(t.trim()), l = new Uint8Array(e.length);
    for (let a = 0; a < e.length; a++) l[a] = e.charCodeAt(a);
    return l;
  }
  function wg(t) {
    let e = new Uint8Array(t);
    if (typeof crypto < "u" && crypto.getRandomValues)
      crypto.getRandomValues(e);
    else
      for (let l = 0; l < t; l++) e[l] = Math.random() * 256 | 0;
    return e;
  }
  function Sc(t, e) {
    let { enc: l, mac: a } = T1(t), n = wg(12), i = new TextEncoder().encode(JSON.stringify(e)), u = S1(l, n, i), c = new Uint8Array(12 + u.length);
    c.set(n, 0), c.set(u, 12);
    let s = pc(a, c), o = new Uint8Array(c.length + 32);
    return o.set(c, 0), o.set(s, c.length), zg(o);
  }
  function xc(t, e) {
    try {
      let l = Dg(e);
      if (l.length < 44) return null;
      let a = l.subarray(0, l.length - 32), n = l.subarray(l.length - 32), { enc: i, mac: u } = T1(t), c = pc(u, a);
      if (!Og(n, c)) return null;
      let s = a.subarray(0, 12), o = a.subarray(12), r = S1(i, s, o);
      return JSON.parse(new TextDecoder().decode(r));
    } catch {
      return null;
    }
  }
  function N1(t) {
    return JSON.stringify({
      format: "BB14_ENCRYPTED_BACKUP",
      v: 14,
      payload: Sc("BB14_BACKUP_FILE", t)
    });
  }
  function M1(t) {
    return "BB14E1:" + Sc("BB14_SAVE_CODE", t);
  }
  function Rg(t) {
    try {
      let e = atob(t.trim()), l = "";
      for (let a = 0; a < e.length; a++)
        l += String.fromCharCode(e.charCodeAt(a) ^ x1.charCodeAt(a % x1.length));
      return decodeURIComponent(escape(l));
    } catch {
      return null;
    }
  }
  function Ug(t) {
    try {
      return decodeURIComponent(escape(atob(t.trim())));
    } catch {
      return null;
    }
  }
  function _1(t) {
    let e = t.trim();
    if (!e) return null;
    if (e.startsWith("BB14E1:")) {
      let n = xc("BB14_SAVE_CODE", e.slice(7));
      return n ? { version: 14, data: n } : null;
    }
    if (e.startsWith("{"))
      try {
        let n = JSON.parse(e);
        if (n && n.format === "BB14_ENCRYPTED_BACKUP" && typeof n.payload == "string") {
          let i = xc("BB14_BACKUP_FILE", n.payload);
          return i ? { version: 14, data: i } : null;
        }
        if (n && n.version === 14)
          return null;
        if (n && (n.version === 13 || n.version === 12 || n.meta || n.game))
          return { version: 13, data: n };
      } catch {
        return null;
      }
    let l = Rg(e);
    if (l && l.trim().startsWith("{"))
      try {
        let n = JSON.parse(l);
        if (n && typeof n == "object" && n.version !== 14)
          return { version: 13, data: n };
      } catch {
      }
    let a = Ug(e);
    if (a && a.trim().startsWith("{"))
      try {
        let n = JSON.parse(a);
        if (n && typeof n == "object" && n.version !== 14)
          return { version: 13, data: n };
      } catch {
      }
    return null;
  }
  var kl = class {
    #t;
    #a;
    #n;
    #s;
    constructor(e = 0) {
      this.#t = (Math.random() * 1073741823 | 0) ^ 439041101, this.#a = 0, this.#n = 0, this.#s = 0, this.set(e);
    }
    get() {
      let e = this.#a ^ this.#t | 0, l = (this.#n - 7) / 3 | 0, a = ~this.#s ^ this.#t >>> 1 | 0;
      return e !== l || e !== a ? (this.set(0), 0) : e;
    }
    set(e) {
      let l = Number.isFinite(e) ? Math.floor(e) : 0;
      this.#t = (Math.random() * 1073741823 | 0) ^ 1597463007, this.#a = l ^ this.#t | 0, this.#n = l * 3 + 7, this.#s = ~l ^ this.#t >>> 1 | 0;
    }
    add(e) {
      let l = this.get() + Math.floor(e);
      return this.set(l), l;
    }
  };
  var E1 = {};
  for (let t of vc) E1[t.type] = t.faGlyph;
  function Bf(t, e, l, a, n, i) {
    let u = Math.min(i, a / 2, n / 2);
    t.beginPath(), t.moveTo(e + u, l), t.arcTo(e + a, l, e + a, l + n, u), t.arcTo(e + a, l + n, e, l + n, u), t.arcTo(e, l + n, e, l, u), t.arcTo(e, l, e + a, l, u), t.closePath();
  }
  function Bg(t, e) {
    switch (t.type) {
      case "slider":
        return ["#22d3ee", "#0891b2"];
      case "magnet":
        return ["#c084fc", "#7e22ce"];
      case "tnt":
        return ["#f87171", "#b91c1c"];
      case "ammo":
        return ["#facc15", "#b45309"];
      case "portal":
        return ["#a78bfa", "#5b21b6"];
      case "teleport":
        return ["#60a5fa", "#1e40af"];
      case "shock":
        return ["#fb923c", "#c2410c"];
      case "shield":
        return ["#2dd4bf", "#0f766e"];
      case "parent":
        return ["#fbbf24", "#92400e"];
      case "healer":
        return ["#4ade80", "#15803d"];
      case "directional":
        return ["#94a3b8", "#475569"];
      case "phase":
        return t.phaseLiquid ? ["#99f6e4", "#14b8a6"] : ["#2dd4bf", "#0d9488"];
      case "tank":
        return ["#475569", "#1e293b"];
      case "angel":
        return ["#f472b6", "#be185d"];
      case "turret":
        return ["#64748b", "#334155"];
      case "crawler":
        return ["#fb7185", "#9f1239"];
      case "devil":
        return ["#dc2626", "#450a0a"];
      case "titan":
        return ["#9333ea", "#1e0533"];
      default: {
        let l = Math.min(1, t.hp / Math.max(10, t.maxHp));
        if (e === "tartarus") {
          let n = 265 + l * 45;
          return [`hsl(${n}, 82%, 58%)`, `hsl(${n - 14}, 78%, 38%)`];
        }
        if (e === "hell") {
          let n = 355 + l * 30;
          return [`hsl(${n % 360}, 85%, 56%)`, `hsl(${(n - 12) % 360}, 80%, 36%)`];
        }
        let a = 215 - l * 155;
        return [`hsl(${a}, 82%, 54%)`, `hsl(${a - 10}, 78%, 36%)`];
      }
    }
  }
  function A1(t, e) {
    if (t.save(), e.shake > 0.2) {
      let i = (Math.random() - 0.5) * e.shake * 2, u = (Math.random() - 0.5) * e.shake * 2;
      t.translate(i, u);
    }
    let l = e.mode === "hell" || e.mode === "tartarus", a = t.createLinearGradient(0, 0, 0, 700);
    e.mode === "tartarus" ? (a.addColorStop(0, "#12051c"), a.addColorStop(1, "#040108")) : e.mode === "hell" ? (a.addColorStop(0, "#2a0707"), a.addColorStop(1, "#120303")) : (a.addColorStop(0, "#ffffff"), a.addColorStop(1, "#f8f5eb")), t.fillStyle = a, t.fillRect(0, 0, 480, 700), t.strokeStyle = l ? "rgba(148, 163, 184, 0.08)" : "rgba(15, 23, 42, 0.06)", t.lineWidth = 1;
    for (let i = 1; i < 6; i++) {
      let u = 6 + i * 79 - 3;
      t.beginPath(), t.moveTo(u, 64), t.lineTo(u, 644), t.stroke();
    }
    let n = 594;
    t.strokeStyle = e.mode === "tartarus" ? "rgba(192, 132, 252, 0.35)" : e.mode === "hell" ? "rgba(248, 113, 113, 0.35)" : "rgba(220, 38, 38, 0.32)", t.setLineDash([6, 6]), t.beginPath(), t.moveTo(10, n), t.lineTo(470, n), t.stroke(), t.setLineDash([]), t.strokeStyle = e.shields > 0 ? "#2b6cb0" : l ? "rgba(148, 163, 184, 0.25)" : "rgba(23, 23, 23, 0.2)", t.lineWidth = e.shields > 0 ? 3 : 1.5, t.beginPath(), t.moveTo(0, 644 + 9.5 + 2), t.lineTo(480, 644 + 9.5 + 2), t.stroke();
    for (let i of e.bricks)
      i.type === "shield" && (t.beginPath(), t.arc(i.x + i.w / 2, i.y + i.h / 2, 150, 0, Math.PI * 2), t.strokeStyle = "rgba(45, 212, 191, 0.28)", t.lineWidth = 1.5, t.setLineDash([5, 5]), t.stroke(), t.setLineDash([]));
    for (let i of e.bricks) {
      t.save(), i.type === "phase" && i.phaseLiquid && (t.globalAlpha = 0.42);
      let [u, c] = Bg(i, e.mode), s = t.createLinearGradient(i.x, i.y, i.x, i.y + i.h);
      if (s.addColorStop(0, u), s.addColorStop(1, c), Bf(t, i.x, i.y, i.w, i.h, 7), t.fillStyle = i.flash > 0 ? "#ffffff" : s, t.fill(), Bf(t, i.x + 1.5, i.y + 1.5, i.w - 3, 4, 3), t.fillStyle = "rgba(255, 255, 255, 0.22)", t.fill(), Bf(t, i.x, i.y, i.w, i.h, 7), t.strokeStyle = "rgba(255, 255, 255, 0.2)", t.lineWidth = 1, t.stroke(), i.type === "directional" && i.openSide && (t.strokeStyle = "#4ade80", t.lineWidth = 4, t.beginPath(), i.openSide === "top" ? (t.moveTo(i.x + 4, i.y + 1), t.lineTo(i.x + i.w - 4, i.y + 1)) : i.openSide === "bottom" ? (t.moveTo(i.x + 4, i.y + i.h - 1), t.lineTo(i.x + i.w - 4, i.y + i.h - 1)) : i.openSide === "left" ? (t.moveTo(i.x + 1, i.y + 4), t.lineTo(i.x + 1, i.y + i.h - 4)) : (t.moveTo(i.x + i.w - 1, i.y + 4), t.lineTo(i.x + i.w - 1, i.y + i.h - 4)), t.stroke()), i.type !== "normal") {
        let r = E1[i.type] || "";
        r && (t.fillStyle = "rgba(255,255,255,0.92)", t.font = '900 11px "Font Awesome 6 Free"', t.textAlign = "right", t.textBaseline = "top", t.fillText(r, i.x + i.w - 5, i.y + 4));
      }
      t.fillStyle = i.flash > 0 ? "#0f172a" : "#ffffff", t.font = i.type === "titan" ? '800 20px "JetBrains Mono", monospace' : '700 15px "JetBrains Mono", monospace', t.textAlign = "center", t.textBaseline = "middle";
      let o = i.hp >= 1e3 ? `${(i.hp / 1e3).toFixed(1)}k` : String(Math.ceil(i.hp));
      t.fillText(o, i.x + i.w / 2, i.y + i.h / 2 + 1), t.restore();
    }
    for (let i of e.bonusBalls) {
      let u = i.r + Math.sin(i.pulse) * 2.2;
      t.beginPath(), t.arc(i.x, i.y, u + 3, 0, Math.PI * 2), t.strokeStyle = "rgba(16, 185, 129, 0.55)", t.lineWidth = 2, t.stroke();
      let c = t.createRadialGradient(i.x - 2, i.y - 2, 1, i.x, i.y, i.r);
      c.addColorStop(0, "#6ee7b7"), c.addColorStop(1, "#10b981"), t.beginPath(), t.arc(i.x, i.y, i.r, 0, Math.PI * 2), t.fillStyle = c, t.fill();
      let s = i.r * 0.52;
      t.strokeStyle = "#022c22", t.lineWidth = 2.4, t.lineCap = "round", t.beginPath(), t.moveTo(i.x - s, i.y), t.lineTo(i.x + s, i.y), t.moveTo(i.x, i.y - s), t.lineTo(i.x, i.y + s), t.stroke();
    }
    if (e.aiming && !e.shooting) {
      t.save(), t.strokeStyle = l ? "rgba(248, 250, 252, 0.78)" : "rgba(30, 41, 59, 0.65)", t.lineWidth = 2.2, t.setLineDash([7, 7]), t.beginPath(), t.moveTo(e.launchX, 644);
      let i = 340, u = Math.cos(e.aimAngle), c = Math.sin(e.aimAngle), s = e.launchX + u * i, o = 644 + c * i;
      if (s < 9.5) {
        let r = (9.5 - e.launchX) / u, b = 644 + c * r;
        t.lineTo(9.5, b), t.lineTo(9.5 - u * (i - r), b + c * (i - r));
      } else if (s > 480 - 9.5) {
        let r = (480 - 9.5 - e.launchX) / u, b = 644 + c * r;
        t.lineTo(480 - 9.5, b), t.lineTo(480 - 9.5 - u * (i - r), b + c * (i - r));
      } else
        t.lineTo(s, o);
      t.stroke(), t.setLineDash([]), t.restore();
    }
    e.shooting ? e.ballsToFire > 0 && (t.fillStyle = l ? "#fbbf24" : "#2b6cb0", t.font = '800 12px "JetBrains Mono", monospace', t.textAlign = "center", t.textBaseline = "top", t.fillText(`${e.ballsToFire} left`, e.launchX, 657)) : (t.beginPath(), t.arc(e.launchX, 644, 9.5 + 1, 0, Math.PI * 2), t.fillStyle = e.doubleDamageTurns > 0 ? "#f59e0b" : l ? "#f8fafc" : "#2b6cb0", t.fill(), t.strokeStyle = l ? "#0f172a" : "#171717", t.lineWidth = 1.5, t.stroke(), t.fillStyle = l ? "#e2e8f0" : "#1e293b", t.font = '700 12px "JetBrains Mono", monospace', t.textAlign = "center", t.textBaseline = "top", t.fillText(`x${e.ballCount}`, e.launchX, 657));
    for (let i of e.balls)
      i.active && (t.beginPath(), t.arc(i.x, i.y, 9.5, 0, Math.PI * 2), t.fillStyle = e.doubleDamageTurns > 0 ? "#f59e0b" : l ? "#f8fafc" : "#1e293b", t.fill());
    for (let i of e.particles)
      t.globalAlpha = Math.max(0, i.life / i.maxLife), t.fillStyle = i.color, t.beginPath(), t.arc(i.x, i.y, i.size, 0, Math.PI * 2), t.fill();
    t.globalAlpha = 1, t.restore();
  }
  var Nc = class {
    #t;
    #a;
    #n = null;
    #s = null;
    #v = null;
    #m = 0;
    #g = new kl(0);
    #r = new kl(1);
    #S = new kl(1);
    #T = new kl(0);
    #O = new kl(0);
    #l = "infinite";
    #h = "medium";
    #N = 480 / 2;
    #M = null;
    #A = !1;
    #z = !1;
    #X = -Math.PI / 2;
    #i = !1;
    #b = !1;
    #u = !1;
    #c = !1;
    #p = 0;
    #V = 0;
    #y = 0;
    #D = {
      doubleDamage: 0,
      laserWipe: 0
    };
    #H = 0;
    #w = 0;
    #G = 0;
    #L = 0;
    #Q = 0;
    #Y = [];
    #C = 0;
    #q = 0;
    #Z = -Math.PI / 2;
    #x = 0;
    #e = [];
    #_ = [];
    #o = [];
    #E = [];
    #R = 1;
    #U = 0;
    #K = null;
    #k = null;
    #$;
    #W = 0;
    constructor(e, l, a) {
      this.#t = e, this.#a = l, this.#$ = a, this.#I();
    }
    #I() {
      let e = this.#t.getSettings();
      this.#a.setOptions(e.sound, e.bgm);
    }
    refreshSettings() {
      this.#I();
    }
    attachCanvas(e) {
      this.#n = e, this.#s = e ? e.getContext("2d") : null, e && !this.#v && (this.#m = performance.now(), this.#P(this.#m));
    }
    destroy() {
      this.#v !== null && (cancelAnimationFrame(this.#v), this.#v = null), this.#a.stopBgm();
    }
    showToast(e) {
      this.#K = e, this.#k !== null && clearTimeout(this.#k), this.#k = window.setTimeout(() => {
        this.#K = null, this.#f(!0);
      }, 3e3), this.#f(!0);
    }
    getTempBuffCost(e) {
      let l = this.#D[e] || 0;
      return Math.round(e === "doubleDamage" ? 60 * Math.pow(1.6, l) : 120 * Math.pow(1.75, l));
    }
    buyTempBuff(e) {
      if (this.#u || this.#c) return;
      let l = this.getTempBuffCost(e), a = this.#t.getMeta();
      if (a.coins < l) {
        this.showToast(`Need ${l} coins!`);
        return;
      }
      if (a.coins -= l, this.#t.saveMeta(a), this.#D[e] = (this.#D[e] || 0) + 1, e === "doubleDamage")
        this.#y += 3, this.showToast(`1.5x Damage active (${this.#y} turns left)!`);
      else if (e === "laserWipe" && this.#e.length > 0) {
        let n = 0;
        for (let c of this.#e)
          c.y > n && (n = c.y);
        let i = this.#e.length;
        this.#e = this.#e.filter((c) => c.y >= n - 44 * 0.5 ? (this.#B(c.x + c.w / 2, c.y + c.h / 2, "#ef4444", 10), !1) : !0);
        let u = i - this.#e.length;
        this.#a.playBreak(!0), this.#t.getSettings().screenShake && (this.#U = 8), this.showToast(`Laser Wipe cleared ${u} bottom bricks!`);
      }
      this.#j(), this.#f(!0);
    }
    getHudSnapshot() {
      let e = this.#t.getMeta(), l = Math.max(0.05, this.#p / 6e4);
      return {
        mode: this.#l,
        difficulty: this.#h,
        level: this.#r.get(),
        score: this.#g.get(),
        ballCount: this.#S.get(),
        shields: this.#T.get(),
        coins: e.coins,
        gems: e.gems,
        combo: this.#O.get(),
        shooting: this.#i,
        fastForward: this.#b,
        gameOver: this.#u,
        victory: this.#c,
        elapsedMs: this.#p,
        doubleDamageTurns: this.#y,
        tempCosts: {
          doubleDamage: this.getTempBuffCost("doubleDamage"),
          laserWipe: this.getTempBuffCost("laserWipe")
        },
        analytics: {
          runBricks: this.#H,
          runShots: this.#w,
          runDamage: this.#G,
          bricksPerMin: Math.round(this.#H / l),
          avgDmgPerShot: this.#w > 0 ? Math.round(this.#G / this.#w) : 0,
          bestCombo: this.#L
        },
        splits: this.#Y,
        toast: this.#K
      };
    }
    #f(e = !1) {
      let l = performance.now();
      !e && l - this.#W < 60 || (this.#W = l, this.#$(this.getHudSnapshot()));
    }
    startNewRun(e, l) {
      let a = Ee(e, l);
      this.#l = e, this.#h = a;
      let i = 1 + (this.#t.getMeta().permUpgrades.startBalls || 0);
      this.#g.set(0), this.#r.set(1), this.#S.set(i), this.#T.set(0), this.#O.set(0), this.#y = 0, this.#D = { doubleDamage: 0, laserWipe: 0 }, this.#H = 0, this.#w = 0, this.#G = 0, this.#L = 0, this.#Q = 0, this.#Y = [], this.#N = 480 / 2, this.#M = null, this.#A = !1, this.#i = !1, this.#b = !1, this.#u = !1, this.#c = !1, this.#p = 0, this.#e = [], this.#_ = [], this.#o = [], this.#E = [], this.#x = 0;
      let u = this.#t.getStats();
      u.totalGames += 1, this.#t.saveStats(u), this.#F(1), this.#j(), this.#a.startBgm(this.#l), this.#f(!0);
    }
    loadFromSlot(e) {
      this.#t.setActiveSlot(e);
      let l = this.#t.getRun(e);
      return l ? (this.#l = l.mode, this.#h = Ee(l.mode, l.difficulty), this.#r.set(Math.max(1, l.level)), this.#g.set(Math.max(0, l.score)), this.#S.set(Math.max(1, l.ballCount)), this.#T.set(Math.max(0, l.shields || 0)), this.#O.set(0), this.#y = 0, this.#D = { doubleDamage: 0, laserWipe: 0 }, this.#N = Math.max(24, Math.min(456, l.launchX || 480 / 2)), this.#M = null, this.#A = !1, this.#i = !1, this.#b = !1, this.#u = !1, this.#c = !1, this.#p = l.elapsedMs || 0, this.#_ = [], this.#E = [], this.#x = 0, this.#e = Array.isArray(l.bricks) ? l.bricks.map((a) => ({
        id: this.#R++,
        x: Number(a.x) || 6,
        y: Number(a.y) || 76,
        w: Number(a.w) || 73,
        h: Number(a.h) || 44,
        hp: Math.max(1, Number(a.hp) || 1),
        maxHp: Math.max(1, Number(a.maxHp || a.hp) || 1),
        type: a.type || "normal",
        openSide: a.openSide || a.shieldSide,
        phaseLiquid: !!a.phaseLiquid,
        flash: 0
      })) : [], this.#o = Array.isArray(l.bonusBalls) ? l.bonusBalls.map((a) => ({
        x: Number(a.x) || 480 / 2,
        y: Number(a.y) || 76 + 44 / 2,
        r: 10.5,
        pulse: Math.random() * Math.PI * 2
      })) : [], this.#e.length === 0 && this.#F(this.#r.get()), this.#a.startBgm(this.#l), this.#f(!0), !0) : !1;
    }
    setDifficulty(e) {
      if (!this.#u && !this.#c) {
        this.showToast("Difficulty is locked during an active run!");
        return;
      }
      let l = Ee(this.#l, e);
      l !== e && this.showToast("Tartarus Mode is locked to Insane or ASIAN difficulty!"), this.#h = l, this.#j(), this.#f(!0);
    }
    toggleFastForward() {
      this.#i && (this.#b = !this.#b, this.#f(!0));
    }
    recallBalls() {
      this.#i && (this.#C = 0, this.#_ = [], this.#tt());
    }
    onPointerEnter(e, l) {
      this.#z = !0, !(this.#i || this.#u || this.#c || !this.#n) && this.#J(e, l);
    }
    onPointerLeave() {
      this.#z = !1;
    }
    onPointerDown(e, l) {
      this.#i || this.#u || this.#c || !this.#n || (this.#A = !0, this.#z = !0, this.#J(e, l));
    }
    onPointerMove(e, l) {
      this.#i || this.#u || this.#c || !this.#n || (this.#z = !0, this.#J(e, l));
    }
    onPointerUp() {
      !this.#A || this.#i || this.#u || this.#c || (this.#A = !1, this.#lt());
    }
    #J(e, l) {
      if (!this.#n) return;
      let a = this.#n.getBoundingClientRect(), n = (e - a.left) / a.width * 480, i = (l - a.top) / a.height * 700, u = Math.atan2(i - 644, n - this.#N);
      u > -0.14 && (u = -0.14), u < -Math.PI + 0.14 && (u = -Math.PI + 0.14), this.#X = u;
    }
    #lt() {
      this.#i = !0, this.#b = !1, this.#V = 0, this.#O.set(0), this.#C = this.#S.get(), this.#q = 0, this.#Z = this.#X, this.#M = null, this.#x = 0, this.#w += 1;
      let e = this.#t.getStats();
      e.totalShots += 1, this.#t.saveStats(e), this.#f(!0);
    }
    #F(e) {
      let l = Et[this.#h], a =  new Set();
      for (let s of this.#e)
        if (s.y < 120) {
          let o = Math.max(0, Math.floor((s.x - 6) / 79)), r = Math.min(5, Math.floor((s.x + s.w - 6 - 2) / 79));
          for (let b = o; b <= r; b++) a.add(b);
        }
      let n = [0, 1, 2, 3, 4, 5].filter((s) => !a.has(s)), i = -1;
      if (n.length > 0) {
        let s = Math.floor(Math.random() * n.length);
        i = n.splice(s, 1)[0];
      } else
        i = Math.floor(Math.random() * 6);
      if (this.#o.push({
        x: 6 + i * 79 + 73 / 2,
        y: 76 + 44 / 2,
        r: 10.5,
        pulse: Math.random() * Math.PI * 2
      }), this.#l === "tartarus" && e % 5 === 0 && n.length >= 2) {
        for (let s = 0; s < n.length - 1; s++)
          if (n[s + 1] === n[s] + 1) {
            let o = n[s];
            n.splice(s, 2);
            let r = Math.max(10, Math.round(e * l.hpMult * 8));
            this.#e.push({
              id: this.#R++,
              x: 6 + o * 79,
              y: 76,
              w: 152,
              h: 94,
              hp: r,
              maxHp: r,
              type: "titan",
              flash: 0
            });
            break;
          }
      }
      let u = Math.min(
        n.length,
        l.minBricks + Math.floor(Math.random() * (l.maxBricks - l.minBricks + 1))
      );
      for (let s = n.length - 1; s > 0; s--) {
        let o = Math.floor(Math.random() * (s + 1));
        [n[s], n[o]] = [n[o], n[s]];
      }
      let c = this.#l === "tartarus" ? 1.65 : this.#l === "hell" ? 1.35 : 1;
      for (let s = 0; s < u; s++) {
        let o = n[s], r = Math.max(1, Math.round(e * l.hpMult * c * (0.85 + Math.random() * 0.35))), b = this.#at(e), d = b === "tank" ? r * 5 : r, m = ["top", "bottom", "left", "right"];
        this.#e.push({
          id: this.#R++,
          x: 6 + o * 79,
          y: 76,
          w: 73,
          h: 44,
          hp: d,
          maxHp: d,
          type: b,
          openSide: b === "directional" ? m[Math.floor(Math.random() * m.length)] : void 0,
          phaseLiquid: b === "phase" ? Math.random() < 0.5 : void 0,
          flash: 0
        });
      }
    }
    #at(e) {
      let l = Math.random();
      if (this.#l === "hell" || this.#l === "tartarus")
        return l < 0.05 ? "devil" : l < 0.11 ? "crawler" : l < 0.16 ? "tank" : l < 0.21 ? "shield" : l < 0.26 ? "phase" : l < 0.31 ? "directional" : l < 0.36 ? "healer" : l < 0.41 ? "angel" : l < 0.46 ? "turret" : l < 0.51 ? "parent" : l < 0.56 ? "shock" : l < 0.61 ? "portal" : l < 0.66 ? "teleport" : l < 0.71 ? "tnt" : l < 0.75 ? "ammo" : l < 0.8 ? "magnet" : l < 0.85 ? "slider" : "normal";
      if (e >= 3) {
        if (l < 0.05) return "slider";
        if (l < 0.09) return "magnet";
        if (l < 0.14) return "tnt";
        if (l < 0.18) return "ammo";
        if (l < 0.22 && e >= 5) return "portal";
        if (l < 0.26 && e >= 6) return "teleport";
        if (l < 0.3 && e >= 7) return "shock";
        if (l < 0.34 && e >= 9) return "parent";
        if (l < 0.38 && e >= 10) return "healer";
        if (l < 0.41 && e >= 12) return "directional";
        if (l < 0.44 && e >= 13) return "phase";
        if (l < 0.47 && e >= 15) return "shield";
        if (l < 0.5 && e >= 18) return "tank";
        if (l < 0.53 && e >= 20) return "angel";
        if (l < 0.56 && e >= 22) return "turret";
      }
      return "normal";
    }
    #nt(e) {
      if (e.type === "shield" || e.type === "titan") return !1;
      let l = e.x + e.w / 2, a = e.y + e.h / 2;
      for (let n of this.#e)
        if (n.type === "shield" && Math.hypot(n.x + n.w / 2 - l, n.y + n.h / 2 - a) <= 150)
          return !0;
      return !1;
    }
    #P = (e) => {
      let l = Math.min(34, Math.max(4, e - this.#m));
      this.#m = e, !this.#u && !this.#c && (this.#p += l, this.#it(l)), this.#s && A1(this.#s, {
        mode: this.#l,
        level: this.#r.get(),
        ballCount: this.#S.get(),
        ballsToFire: this.#C,
        launchX: this.#N,
        aiming: (this.#A || this.#z) && !this.#u && !this.#c,
        aimAngle: this.#X,
        shooting: this.#i,
        shields: this.#T.get(),
        doubleDamageTurns: this.#y,
        bricks: this.#e,
        balls: this.#_,
        bonusBalls: this.#o,
        particles: this.#E,
        shake: this.#U
      }), this.#f(!1), this.#v = requestAnimationFrame(this.#P);
    };
    #it(e) {
      let l = this.#t.getSettings(), a = this.#i && this.#b ? l.fastForwardMult : 1;
      this.#U > 0 && (this.#U *= 0.86);
      for (let c of this.#e)
        c.flash > 0 && (c.flash = Math.max(0, c.flash - 0.15));
      for (let c of this.#o)
        c.pulse += 0.08;
      for (let c = this.#E.length - 1; c >= 0; c--) {
        let s = this.#E[c];
        s.x += s.vx, s.y += s.vy, s.life -= e, s.life <= 0 && this.#E.splice(c, 1);
      }
      if (!this.#i) return;
      let n = Et[this.#h], i = 1 + (this.#t.getMeta().permUpgrades.ballSpeed || 0) * 0.08, u = 9.2 * n.speedMult * i;
      for (let c = 0; c < a; c++) {
        this.#V++, this.#V === 480 && !this.#b && (this.#b = !0), this.#C > 0 && (this.#q--, this.#q <= 0 && (this.#_.push({
          x: this.#N,
          y: 644,
          vx: Math.cos(this.#Z) * u,
          vy: Math.sin(this.#Z) * u,
          active: !0
        }), this.#C--, this.#q = 3));
        let s = 0;
        for (let o of this.#_)
          if (o.active) {
            s++;
            for (let r of this.#e)
              if (r.type === "magnet") {
                let b = r.x + r.w / 2, d = r.y + r.h / 2, m = b - o.x, y = d - o.y, N = Math.hypot(m, y);
                if (N > 14 && N < 135) {
                  o.vx += m / N * 0.16, o.vy += y / N * 0.16;
                  let _ = Math.hypot(o.vx, o.vy);
                  _ > 0.1 && (o.vx = o.vx / _ * u, o.vy = o.vy / _ * u);
                }
              }
            if (o.x += o.vx, o.y += o.vy, o.x - 9.5 < 0 ? (o.x = 9.5, o.vx = Math.abs(o.vx)) : o.x + 9.5 > 480 && (o.x = 480 - 9.5, o.vx = -Math.abs(o.vx)), o.y - 9.5 < 54 && (o.y = 54 + 9.5, o.vy = Math.abs(o.vy)), o.y > 644 + 9.5) {
              let r = (this.#t.getMeta().permUpgrades.rebound || 0) * 0.03;
              if (r > 0 && Math.random() < r) {
                o.y = 644 + 9.5 - 1, o.vy = -Math.abs(o.vy), Math.abs(o.vx) < 0.8 && (o.vx = (Math.random() < 0.5 ? -1 : 1) * 1.4), this.#a.playHit(2, this.#l), this.#B(o.x, 644 + 9.5, "#38bdf8", 5);
                continue;
              }
              o.active = !1, this.#M === null && (this.#M = Math.max(24, Math.min(456, o.x)));
              continue;
            }
            Math.abs(o.vy) < 0.35 && (o.vy = o.vy >= 0 ? 0.55 : -0.55);
            for (let r = this.#o.length - 1; r >= 0; r--) {
              let b = this.#o[r];
              Math.hypot(o.x - b.x, o.y - b.y) <= 9.5 + b.r + 2 && (this.#o.splice(r, 1), this.#x++, this.#a.playBonusBall(), this.#B(b.x, b.y, "#34d399", 8));
            }
            for (let r = this.#e.length - 1; r >= 0; r--) {
              let b = this.#e[r], d = Math.max(b.x, Math.min(o.x, b.x + b.w)), m = Math.max(b.y, Math.min(o.y, b.y + b.h)), y = o.x - d, N = o.y - m;
              if (y * y + N * N <= 9.5 * 9.5) {
                let _ = o.x + 9.5 - b.x, h = b.x + b.w - (o.x - 9.5), f = o.y + 9.5 - b.y, v = b.y + b.h - (o.y - 9.5), x = Math.min(_, h), M = Math.min(f, v), A;
                if (x < M ? (o.vx = -o.vx, A = _ < h ? "left" : "right") : (o.vy = -o.vy, A = f < v ? "top" : "bottom"), b.type === "portal" ? (o.x = Math.max(20, Math.min(460, Math.random() * 480)), o.y = Math.max(96, Math.min(564, Math.random() * 488 + 76))) : b.type === "shock" && (o.vx = 0, o.vy = Math.abs(u)), b.type === "phase" && b.phaseLiquid) {
                  this.#a.playHit(1, this.#l);
                  break;
                }
                if (b.type === "directional" && b.openSide && b.openSide !== A) {
                  this.#a.playHit(1, this.#l);
                  break;
                }
                if (this.#nt(b)) {
                  this.#a.playHit(1, this.#l);
                  break;
                }
                this.#ut(b, r);
                break;
              }
            }
          }
        if (this.#C === 0 && s === 0) {
          this.#tt();
          break;
        }
      }
    }
    #ut(e, l) {
      let a = this.#t.getMeta(), n = 1;
      this.#y > 0 && (n = Math.ceil(n * 1.5));
      let i = (a.permUpgrades.critChance || 0) * 0.05;
      Math.random() < i && (n *= 2), e.hp -= n, e.flash = 1, this.#G += n;
      let u = this.#O.add(1);
      u > this.#L && (this.#L = u);
      let c = Et[this.#h];
      if (this.#g.add(Math.max(1, Math.round(n * c.scoreMult * (1 + u * 0.02)))), e.hp <= 0) {
        if (this.#H += 1, this.#e.splice(l, 1), this.#a.playBreak(e.type === "tnt"), this.#B(e.x + e.w / 2, e.y + e.h / 2, e.type === "tnt" ? "#ef4444" : "#60a5fa", 12), e.type === "ammo")
          this.#x++;
        else if (e.type === "tnt") {
          this.#t.getSettings().screenShake && (this.#U = 8);
          for (let d = this.#e.length - 1; d >= 0; d--) {
            let m = this.#e[d];
            Math.hypot(
              m.x + m.w / 2 - (e.x + e.w / 2),
              m.y + m.h / 2 - (e.y + e.h / 2)
            ) <= 180 && (m.hp -= Math.max(2, Math.ceil(this.#r.get() * 1.1)), m.flash = 1, m.hp <= 0 && (this.#e.splice(d, 1), this.#B(m.x + m.w / 2, m.y + m.h / 2, "#f97316", 8)));
          }
        } else if (e.type === "parent") {
          let d = 1 + Math.floor(Math.random() * 2);
          for (let m = 0; m < d; m++) {
            let y = Math.floor(Math.random() * 6), N = Math.max(1, Math.ceil(e.maxHp * 0.3));
            this.#e.push({
              id: this.#R++,
              x: 6 + y * 79,
              y: e.y,
              w: 73,
              h: 44,
              hp: N,
              maxHp: N,
              type: "normal",
              flash: 0.5
            });
          }
        }
        let s = 1 + (a.permUpgrades.coinGain || 0) * 0.15, o = Math.max(1, Math.round((e.type === "titan" ? 20 : e.type === "tank" ? 5 : 2) * s));
        a.coins += o;
        let r = 0.03 + (a.permUpgrades.gemLuck || 0) * 0.03;
        (e.type === "titan" || Math.random() < r) && (a.gems += e.type === "titan" ? 2 : 1), this.#t.saveMeta(a);
        let b = this.#t.getStats();
        b.totalBricks += 1, u > b.highestCombo && (b.highestCombo = u), this.#t.saveStats(b), b.totalBricks >= 1 && this.#d("first_blood"), b.totalBricks >= 1e3 && this.#d("bricks_1000");
      } else
        this.#a.playHit(u, this.#l);
    }
    #tt() {
      if (this.#i = !1, this.#b = !1, this.#_ = [], this.#y > 0 && this.#y--, this.#M !== null && (this.#N = this.#M), this.#x > 0) {
        let o = this.#S.add(this.#x);
        this.#x = 0, o >= 50 && this.#d("balls_50");
      }
      let e = [];
      for (let o of this.#e)
        if (o.type === "phase")
          o.phaseLiquid = !o.phaseLiquid;
        else if (o.type === "slider") {
          let r = Math.random() < 0.5 ? -1 : 1, b = o.x + r * 79;
          b >= 6 && b + o.w <= 474 && (o.x = b);
        } else if (o.type === "teleport") {
          let r = Math.floor(Math.random() * 6);
          o.x = 6 + r * 79;
        } else if (o.type === "healer")
          for (let r of this.#e)
            r !== o && Math.hypot(r.x - o.x, r.y - o.y) < 73 * 1.8 && (r.hp = Math.min(r.maxHp, r.hp + Math.max(1, Math.ceil(r.maxHp * 0.25))));
        else if (o.type === "angel")
          for (let r of this.#e)
            r !== o && Math.hypot(r.x - o.x, r.y - o.y) < 73 * 1.8 && (r.hp = Math.max(1, Math.floor(r.hp * 0.75)));
        else if (o.type === "turret") {
          let r = this.#e.filter((b) => b !== o);
          for (let b = 0; b < Math.min(3, r.length); b++) {
            let d = r[Math.floor(Math.random() * r.length)];
            d.hp = Math.max(1, Math.floor(d.hp * 0.75));
          }
        } else if (o.type === "crawler")
          o.y += 14;
        else if (o.type === "devil" && o.y > 120) {
          let r = Math.max(2, Math.ceil(this.#r.get() * 1.5));
          e.push({
            id: this.#R++,
            x: o.x,
            y: o.y - 50,
            w: 73,
            h: 44,
            hp: r,
            maxHp: r,
            type: "tank",
            flash: 0.4
          });
        }
      e.length && this.#e.push(...e);
      let l = he[this.#l].targetLevel, a = this.#r.get();
      if (this.#l.startsWith("speedrun_") && a % 5 === 0) {
        let o = Math.floor(this.#p), r = Math.max(0, o - this.#Q);
        this.#Q = o;
        let b = this.#t.recordTasSplit(this.#l, a, o, r);
        this.#Y = [...this.#Y, { level: a, timeMs: o, deltaMs: b.deltaMs, isGold: b.isGold }];
      }
      if (l && a >= l) {
        this.#c = !0, this.#t.updateSpeedrunRecord(this.#l, Math.floor(this.#p)), this.#l === "speedrun_25" && this.#d("speed_25"), this.#et(), this.#f(!0);
        return;
      }
      let n = this.#r.add(1), i = 50;
      for (let o of this.#e) o.y += i;
      for (let o = this.#o.length - 1; o >= 0; o--)
        this.#o[o].y += i, this.#o[o].y >= 634 && this.#o.splice(o, 1);
      let u = 594;
      if (this.#e.some((o) => o.y + o.h >= u))
        if (this.#T.get() > 0)
          this.#T.add(-1), this.#e = this.#e.filter((o) => o.y + o.h < u - 44), this.showToast("Floor Shield triggered! Bottom row cleared.");
        else {
          this.#u = !0, this.#a.playGameOver(), this.#et(), this.#f(!0);
          return;
        }
      this.#F(n), this.#t.updateModeRecord(this.#l, n);
      let s = this.#t.getStats();
      n > s.highestLevel && (s.highestLevel = n), this.#g.get() > s.highestScore && (s.highestScore = this.#g.get()), this.#t.saveStats(s), n >= 10 && this.#d("lvl_10"), n >= 25 && this.#d("lvl_25"), n >= 50 && this.#d("lvl_50"), n >= 100 && this.#d("lvl_100"), this.#l === "hell" && n >= 20 && this.#d("hell_survivor"), this.#l === "tartarus" && n >= 15 && this.#d("tartarus_initiate"), this.#h === "asian" && n >= 20 && this.#d("asian_master"), this.#j(), this.#f(!0);
    }
    #et() {
      this.#t.addScore({
        score: this.#g.get(),
        level: this.#r.get(),
        mode: this.#l,
        difficulty: this.#h,
        date: Date.now()
      }), this.#t.clearRun();
    }
    #j() {
      if (this.#u || this.#c) return;
      let e = {
        version: 14,
        mode: this.#l,
        difficulty: this.#h,
        level: this.#r.get(),
        score: this.#g.get(),
        ballCount: this.#S.get(),
        launchX: this.#N,
        shields: this.#T.get(),
        elapsedMs: Math.floor(this.#p),
        bricks: this.#e.map((l) => ({
          x: l.x,
          y: l.y,
          w: l.w,
          h: l.h,
          hp: l.hp,
          maxHp: l.maxHp,
          type: l.type,
          openSide: l.openSide,
          phaseLiquid: l.phaseLiquid
        })),
        bonusBalls: this.#o.map((l) => ({ x: l.x, y: l.y })),
        updatedAt: Date.now()
      };
      this.#t.saveRun(e);
    }
    #d(e) {
      if (this.#t.unlockAchievement(e)) {
        let l = bc.find((a) => a.id === e);
        if (l) {
          let a = this.#t.getMeta();
          a.coins += l.rewardCoins, a.gems += l.rewardGems, this.#t.saveMeta(a), this.showToast(`Achievement Unlocked: ${l.name} (+${l.rewardCoins}c, +${l.rewardGems}g)`);
        }
      }
    }
    #B(e, l, a, n) {
      if (this.#t.getSettings().particles)
        for (let i = 0; i < n; i++) {
          let u = Math.random() * Math.PI * 2, c = 1.2 + Math.random() * 3.5;
          this.#E.push({
            x: e,
            y: l,
            vx: Math.cos(u) * c,
            vy: Math.sin(u) * c,
            life: 320 + Math.random() * 240,
            maxLife: 560,
            color: a,
            size: 2 + Math.random() * 2.5
          });
        }
    }
  };
  var Xf = "BB14LS:", Mc = "bb14_vlt_shared_meta", Gf = "bb14_vlt_shared_scores", Lf = "bb14_vlt_shared_modes", Yf = "bb14_vlt_shared_sr", C1 = "bb14_vlt_shared_stats", O1 = "bb14_vlt_shared_tas", z1 = "bb14_acc_prof", D1 = "bb14_ach_vlt", w1 = "bb14_cfg_vlt", Hg = {
    sound: !0,
    bgm: !0,
    particles: !0,
    screenShake: !0,
    fastForwardMult: 3
  };
  function Re(t, e) {
    try {
      let l = localStorage.getItem(t);
      if (!l || !l.startsWith(Xf)) return e;
      let a = xc("LS:" + t, l.slice(Xf.length));
      return a !== null ? a : e;
    } catch {
      return e;
    }
  }
  function ee(t, e) {
    try {
      let l = Xf + Sc("LS:" + t, e);
      localStorage.setItem(t, l);
    } catch {
    }
  }
  function X(t, e, l, a = 0) {
    let n = typeof t == "number" ? Math.floor(t) : a;
    return Number.isFinite(n) ? Math.max(e, Math.min(l, n)) : a;
  }
  function qf(t) {
    return typeof t == "string" && [
      "infinite",
      "hell",
      "tartarus",
      "speedrun_25",
      "speedrun_50",
      "speedrun_100",
      "speedrun_250",
      "speedrun_500"
    ].includes(t) ? t : "infinite";
  }
  function jf(t, e) {
    let a = typeof t == "string" && ["easy", "medium", "hard", "insane", "asian"].includes(t) ? t : "medium";
    return Ee(e, a);
  }
  var _c = class {
    #t = 1;
    constructor() {
      this.#a();
    }
    #a() {
      if (localStorage.getItem(Mc)) return;
      let l = { coins: 0, gems: 0, permUpgrades: {} };
      for (let a = 1; a <= 5; a++) {
        let n = Re(`bb14_vlt_s${a}_meta`, null);
        if (n) {
          l.coins = Math.max(l.coins, X(n.coins, 0, 9999999)), l.gems = Math.max(l.gems, X(n.gems, 0, 999999));
          for (let i of Sn) {
            let u = l.permUpgrades[i.id] || 0, c = X(n.permUpgrades?.[i.id], 0, i.max);
            l.permUpgrades[i.id] = Math.max(u, c);
          }
        }
      }
      ee(Mc, l);
    }
    getActiveSlot() {
      return this.#t;
    }
    setActiveSlot(e) {
      this.#t = Math.max(1, Math.min(5, Math.floor(e)));
    }
    getMeta() {
      let e = Re(Mc, {
        coins: 0,
        gems: 0,
        permUpgrades: {}
      });
      return {
        coins: X(e.coins, 0, 9999999),
        gems: X(e.gems, 0, 999999),
        permUpgrades: e.permUpgrades && typeof e.permUpgrades == "object" ? e.permUpgrades : {}
      };
    }
    saveMeta(e) {
      ee(Mc, {
        coins: X(e.coins, 0, 9999999),
        gems: X(e.gems, 0, 999999),
        permUpgrades: e.permUpgrades || {}
      });
    }
    getStats() {
      return Re(C1, {
        totalBricks: 0,
        totalShots: 0,
        totalGames: 0,
        highestLevel: 1,
        highestScore: 0,
        highestCombo: 0,
        playTimeSec: 0
      });
    }
    saveStats(e) {
      ee(C1, e);
    }
    getScores() {
      return Re(Gf, []);
    }
    getLeaderboard(e, l) {
      return this.getScores().filter((a) => a.mode === e && a.difficulty === l).sort((a, n) => n.score - a.score).slice(0, 100);
    }
    addScore(e) {
      let l = this.getScores();
      l.push(e);
      let a =  new Map();
      for (let i of l) {
        let u = `${i.mode}:${i.difficulty}`, c = a.get(u) || [];
        c.push(i), a.set(u, c);
      }
      let n = [];
      for (let i of a.values())
        i.sort((u, c) => c.score - u.score), n.push(...i.slice(0, 100));
      ee(Gf, n);
    }
    getModeRecords() {
      return Re(Lf, {
        infinite: 0,
        hell: 0,
        tartarus: 0
      });
    }
    updateModeRecord(e, l) {
      if (e !== "infinite" && e !== "hell" && e !== "tartarus") return;
      let a = this.getModeRecords();
      l > (a[e] || 0) && (a[e] = l, ee(Lf, a));
    }
    getSpeedrunRecords() {
      return Re(Yf, {});
    }
    updateSpeedrunRecord(e, l) {
      if (!e.startsWith("speedrun_")) return;
      let a = this.getSpeedrunRecords(), n = e;
      (!a[n] || l < a[n]) && (a[n] = l, ee(Yf, a));
    }
    getTas() {
      return Re(O1, {});
    }
    saveTas(e) {
      ee(O1, e);
    }
    recordTasSplit(e, l, a, n) {
      let i = this.getTas(), u = i[e] || { pbSplits: {}, goldSplits: {} }, c = u.pbSplits[l], s = typeof c == "number" ? a - c : null;
      (typeof c != "number" || a < c) && (u.pbSplits[l] = a);
      let o = u.goldSplits[l], r = typeof o != "number" || n < o;
      return r && (u.goldSplits[l] = n), i[e] = u, this.saveTas(i), { deltaMs: s, isGold: r };
    }
    getProfile() {
      return Re(z1, {
        name: "Breaker",
        icon: "fa-cubes",
        title: "Arcade Challenger",
        createdAt: Date.now()
      });
    }
    saveProfile(e) {
      ee(z1, {
        name: String(e.name || "Breaker").slice(0, 20),
        icon: String(e.icon || "fa-cubes"),
        title: String(e.title || "Arcade Challenger").slice(0, 28),
        createdAt: e.createdAt || Date.now()
      });
    }
    getAchievements() {
      return Re(D1, []);
    }
    unlockAchievement(e) {
      let l = this.getAchievements();
      return l.includes(e) ? !1 : (l.push(e), ee(D1, l), !0);
    }
    getSettings() {
      return { ...Hg, ...Re(w1, {}) };
    }
    saveSettings(e) {
      ee(w1, e);
    }
    #n(e) {
      return `bb14_vlt_s${e}_run`;
    }
    getRun(e = this.#t) {
      return Re(this.#n(e), null);
    }
    saveRun(e, l = this.#t) {
      ee(this.#n(l), e);
    }
    clearRun(e = this.#t) {
      try {
        localStorage.removeItem(this.#n(e));
      } catch {
      }
    }
    getAllSlotSummaries() {
      let e = [];
      for (let l = 1; l <= 5; l++) {
        let a = this.getRun(l);
        a && a.level >= 1 ? e.push({
          slot: l,
          hasRun: !0,
          mode: a.mode,
          difficulty: a.difficulty,
          level: a.level,
          score: a.score,
          ballCount: a.ballCount,
          updatedAt: a.updatedAt
        }) : e.push({ slot: l, hasRun: !1 });
      }
      return e;
    }
    exportSlotBundle(e = this.#t) {
      return {
        version: 14,
        exportedAt: Date.now(),
        profile: this.getProfile(),
        achievements: this.getAchievements(),
        meta: this.getMeta(),
        stats: this.getStats(),
        scores: this.getScores(),
        modeRecords: this.getModeRecords(),
        speedrunRecords: this.getSpeedrunRecords(),
        run: this.getRun(e)
      };
    }
    exportBackupFile(e = this.#t) {
      return N1(this.exportSlotBundle(e));
    }
    exportSaveCode(e = this.#t) {
      return M1(this.exportSlotBundle(e));
    }
    importSaveText(e, l = this.#t) {
      let a = _1(e);
      if (!a)
        return {
          ok: !1,
          message: "Invalid or tampered save data. v14 saves require valid authentication."
        };
      let n = a.data;
      if (!n || typeof n != "object")
        return { ok: !1, message: "Corrupted save structure." };
      if (n.meta && typeof n.meta == "object") {
        let i = this.getMeta(), u = a.version === 13 ? 25e4 : 9999999, c = a.version === 13 ? 5e3 : 999999;
        if (i.coins = Math.max(i.coins, X(n.meta.coins, 0, u)), i.gems = Math.max(i.gems, X(n.meta.gems, 0, c)), n.meta.permUpgrades && typeof n.meta.permUpgrades == "object")
          for (let s of Sn) {
            let o = X(n.meta.permUpgrades[s.id], 0, s.max);
            i.permUpgrades[s.id] = Math.max(i.permUpgrades[s.id] || 0, o);
          }
        this.saveMeta(i);
      }
      if (n.stats && typeof n.stats == "object") {
        let i = this.getStats();
        i.totalBricks = Math.max(i.totalBricks, X(n.stats.totalBricks, 0, 5e7)), i.totalShots = Math.max(i.totalShots, X(n.stats.totalShots, 0, 5e6)), i.totalGames = Math.max(i.totalGames, X(n.stats.totalGames, 0, 1e5)), i.highestLevel = Math.max(i.highestLevel, X(n.stats.highestLevel, 1, 1e4)), i.highestScore = Math.max(i.highestScore, X(n.stats.highestScore, 0, 999999999)), i.highestCombo = Math.max(i.highestCombo, X(n.stats.highestCombo, 0, 5e4)), i.playTimeSec = Math.max(i.playTimeSec, X(n.stats.playTimeSec, 0, 1e7)), this.saveStats(i);
      }
      if (n.modeRecords && typeof n.modeRecords == "object") {
        let i = this.getModeRecords();
        i.infinite = Math.max(i.infinite, X(n.modeRecords.infinite, 0, 1e4)), i.hell = Math.max(i.hell, X(n.modeRecords.hell, 0, 1e4)), i.tartarus = Math.max(i.tartarus, X(n.modeRecords.tartarus, 0, 1e4)), ee(Lf, i);
      }
      if (n.speedrunRecords && typeof n.speedrunRecords == "object") {
        let i = this.getSpeedrunRecords();
        for (let u of ["speedrun_25", "speedrun_50", "speedrun_100", "speedrun_250", "speedrun_500"]) {
          let c = n.speedrunRecords[u];
          typeof c == "number" && c > 1e3 && c < 864e5 && (!i[u] || c < i[u]) && (i[u] = Math.floor(c));
        }
        ee(Yf, i);
      }
      if (Array.isArray(n.scores)) {
        let i = this.getScores();
        for (let u of n.scores.slice(0, 25))
          if (u && typeof u.score == "number" && u.score > 0) {
            let c = qf(u.mode);
            i.push({
              score: X(u.score, 0, 999999999),
              level: X(u.level, 1, 1e4),
              mode: c,
              difficulty: jf(u.difficulty, c),
              date: typeof u.date == "number" ? u.date : Date.now()
            });
          }
        i.sort((u, c) => c.score - u.score), ee(Gf, i.slice(0, 25));
      }
      if (a.version === 14) {
        if (n.profile && typeof n.profile == "object" && this.saveProfile(n.profile), Array.isArray(n.achievements))
          for (let i of n.achievements)
            typeof i == "string" && this.unlockAchievement(i);
      } else
        this.unlockAchievement("v13_veteran");
      if (a.version === 14 && n.run && typeof n.run == "object") {
        let i = qf(n.run.mode), u = jf(n.run.difficulty, i);
        this.saveRun(
          {
            version: 14,
            mode: i,
            difficulty: u,
            level: X(n.run.level, 1, 1e4, 1),
            score: X(n.run.score, 0, 999999999, 0),
            ballCount: X(n.run.ballCount, 1, 500, 1),
            launchX: typeof n.run.launchX == "number" ? n.run.launchX : 240,
            shields: X(n.run.shields, 0, 5, 0),
            elapsedMs: X(n.run.elapsedMs, 0, 864e5, 0),
            bricks: Array.isArray(n.run.bricks) ? n.run.bricks : [],
            bonusBalls: Array.isArray(n.run.bonusBalls) ? n.run.bonusBalls : [],
            updatedAt: Date.now()
          },
          l
        );
      } else if (a.version === 13 && n.game && typeof n.game == "object") {
        let i = n.game.state || n.game, u = qf(i.mode || i.gameMode), c = jf(i.difficulty, u);
        this.saveRun(
          {
            version: 14,
            mode: u,
            difficulty: c,
            level: X(i.level, 1, 1e4, 1),
            score: X(i.score, 0, 999999999, 0),
            ballCount: X(i.ballCount || i.ballsCount || 1, 1, 500, 1),
            launchX: typeof i.launchX == "number" ? i.launchX : 240,
            shields: X(i.shields, 0, 5, 0),
            elapsedMs: X(i.elapsedMs || 0, 0, 864e5, 0),
            bricks: Array.isArray(n.game.bricks) ? n.game.bricks : [],
            bonusBalls: Array.isArray(n.game.bonusBalls) ? n.game.bonusBalls : [],
            updatedAt: Date.now()
          },
          l
        );
      }
      return {
        ok: !0,
        version: a.version,
        message: a.version === 13 ? `Legacy v13 save converted and loaded into Slot ${l}! Shared stats merged.` : `Authenticated v14 save loaded into Slot ${l}!`
      };
    }
  };
  var p = be(hl(), 1);
  if (typeof window < "u")
    try {
      Object.defineProperty(window, "__BB14_LOCKED__", {
        value: !0,
        writable: !1,
        configurable: !1
      });
    } catch {
    }
  function Vf() {
    let t = (0, Ct.useMemo)(() => new _c(), []), e = (0, Ct.useMemo)(() => new gc(), []), l = (0, Ct.useRef)(null), a = (0, Ct.useRef)(null), [n, i] = (0, Ct.useState)("menu"), [u, c] = (0, Ct.useState)(!1), [s, o] = (0, Ct.useState)(null), [r, b] = (0, Ct.useState)("profile"), [d, m] = (0, Ct.useState)(0), [y, N] = (0, Ct.useState)({
      mode: "infinite",
      difficulty: "medium",
      level: 1,
      score: 0,
      ballCount: 1,
      shields: 0,
      coins: 0,
      gems: 0,
      combo: 0,
      shooting: !1,
      fastForward: !1,
      gameOver: !1,
      victory: !1,
      elapsedMs: 0,
      doubleDamageTurns: 0,
      tempCosts: { doubleDamage: 60, laserWipe: 120 },
      analytics: {
        runBricks: 0,
        runShots: 0,
        runDamage: 0,
        bricksPerMin: 0,
        avgDmgPerShot: 0,
        bestCombo: 0
      },
      splits: [],
      toast: null
    });
    (0, Ct.useEffect)(() => {
      let E = new Nc(t, e, (V) => N(V));
      return l.current = E, () => {
        E.destroy(), l.current = null;
      };
    }, [t, e]), (0, Ct.useEffect)(() => {
      n === "game" && a.current && l.current && l.current.attachCanvas(a.current);
    }, [n]), (0, Ct.useEffect)(() => {
      document.body.classList.remove("hell-mode", "tartarus-mode"), n === "game" && (y.mode === "hell" && document.body.classList.add("hell-mode"), y.mode === "tartarus" && document.body.classList.add("tartarus-mode"));
    }, [n, y.mode]);
    let _ = (E, V = !1) => {
      if (t.setActiveSlot(E), V) {
        o("modeSelect");
        return;
      }
      i("game"), setTimeout(() => {
        let St = l.current;
        if (!St) return;
        St.loadFromSlot(E) || St.startNewRun("infinite", "medium");
      }, 0);
    }, h = (E) => {
      t.clearRun(E), m((V) => V + 1);
    }, f = (E, V) => {
      let St = t.importSaveText(V, E);
      m((We) => We + 1), St.ok ? (_(E, !1), setTimeout(() => l.current?.showToast(St.message), 80)) : l.current?.showToast(St.message);
    }, v = t.getProfile(), x = (0, Ct.useMemo)(() => t.getAllSlotSummaries(), [t, d, n]), M =  (0, p.jsx)(
      wf,
      {
        activeModal: s,
        initialAccountTab: r,
        onClose: () => o(null),
        vault: t,
        currentMode: y.mode,
        currentDifficulty: y.difficulty,
        onStartMode: (E, V) => {
          i("game"), setTimeout(() => l.current?.startNewRun(E, V), 20);
        },
        onDataChanged: (E) => {
          l.current?.refreshSettings(), m((V) => V + 1), E && l.current?.showToast(E);
        },
        onImportSuccess: (E, V) => {
          i("game"), setTimeout(() => {
            l.current?.loadFromSlot(E), l.current?.showToast(V);
          }, 40), m((St) => St + 1);
        }
      }
    );
    if (n === "menu")
      return  (0, p.jsxs)("div", { className: "relative w-full min-h-screen flex flex-col overflow-hidden", children: [
         (0, p.jsx)("div", { className: "tartarus-backdrop", "aria-hidden": "true" }),
         (0, p.jsx)("section", { className: "fixed inset-0 z-30 flex items-center justify-center p-5", children:  (0, p.jsxs)("div", { className: "w-[min(470px,95vw)] rounded-2xl bg-white border-2 border-[#171717] p-7 text-center shadow-[0_14px_36px_rgba(15,23,42,0.12)] flex flex-col items-center gap-4", children: [
           (0, p.jsx)("div", { className: "w-20 h-20 rounded-2xl bg-gradient-to-br from-[#3182ce] to-[#1e4e8c] text-white border-2 border-[#171717] flex items-center justify-center shadow-[0_6px_0_#171717] text-4xl", children:  (0, p.jsx)("i", { className: `fa-solid ${v.icon} drop-shadow` }) }),
           (0, p.jsx)("div", { children:  (0, p.jsx)("h1", { className: "text-3xl font-extrabold tracking-tight text-[#0f172a]", children: "Brick Breaker v14" }) }),
           (0, p.jsxs)("div", { className: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-100 border border-slate-300 text-xs font-bold text-slate-800 shadow-inner", children: [
             (0, p.jsx)("i", { className: `fa-solid ${v.icon} text-[#2b6cb0]` }),
             (0, p.jsx)("span", { children: v.name })
          ] }),
           (0, p.jsxs)("div", { className: "w-full flex flex-col gap-2.5 mt-1", children: [
             (0, p.jsxs)(
              "button",
              {
                type: "button",
                onClick: () => i("slots"),
                className: "w-full py-3 px-5 rounded-xl bg-[#2b6cb0] hover:bg-[#255c99] active:translate-y-[1px] text-white font-bold text-base flex items-center justify-center gap-2.5 border-2 border-[#171717] shadow-[0_3px_0_#171717] cursor-pointer transition-all",
                children: [
                   (0, p.jsx)("i", { className: "fa-solid fa-play" }),
                   (0, p.jsx)("span", { children: "Play" })
                ]
              }
            ),
             (0, p.jsxs)(
              "button",
              {
                type: "button",
                onClick: () => {
                  b("achievements"), o("account");
                },
                className: "w-full py-2.5 px-4 rounded-xl bg-[#1e293b] hover:bg-[#0f172a] active:translate-y-[1px] text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm",
                children: [
                   (0, p.jsx)("i", { className: "fa-solid fa-trophy text-amber-400" }),
                   (0, p.jsx)("span", { children: "Achievements" })
                ]
              }
            ),
             (0, p.jsxs)(
              "button",
              {
                type: "button",
                onClick: () => {
                  b("profile"), o("account");
                },
                className: "w-full py-2.5 px-4 rounded-xl bg-slate-600 hover:bg-slate-700 active:translate-y-[1px] text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm",
                children: [
                   (0, p.jsx)("i", { className: "fa-solid fa-user" }),
                   (0, p.jsx)("span", { children: "Account & Saves" })
                ]
              }
            )
          ] })
        ] }) }),
        M
      ] });
    if (n === "slots")
      return  (0, p.jsxs)(p.Fragment, { children: [
         (0, p.jsx)("div", { className: "tartarus-backdrop", "aria-hidden": "true" }),
         (0, p.jsx)(
          p1,
          {
            slots: x,
            profile: v,
            meta: t.getMeta(),
            stats: t.getStats(),
            onBackToMenu: () => i("menu"),
            onOpenShop: () => o("shop"),
            onOpenAchievements: () => {
              b("achievements"), o("account");
            },
            onOpenProfile: () => {
              b("profile"), o("account");
            },
            onOpenSettings: () => o("settings"),
            onSelectSlot: _,
            onClearSlot: h,
            onImportToSlot: f
          }
        ),
        M
      ] });
    let A = y.mode === "hell" || y.mode === "tartarus", C = he[y.mode], z = y.mode.startsWith("speedrun_"), K = (E) => {
      let V = E / 1e3, St = Math.floor(V / 60), We = (V % 60).toFixed(1).padStart(4, "0");
      return `${String(St).padStart(2, "0")}:${We}`;
    }, O = A ? "bg-slate-900/90 border-2 border-slate-700 text-slate-100 shadow-lg" : "bg-white border-2 border-[#171717] text-[#1e293b] shadow-[0_6px_18px_rgba(15,23,42,0.08)]", yt = A ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700" : "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300";
    return  (0, p.jsxs)("div", { className: "relative z-10 w-full h-[100dvh] max-h-[100dvh] flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-3 p-2 sm:p-3 overflow-y-auto lg:overflow-hidden select-none", children: [
       (0, p.jsx)("div", { className: "tartarus-backdrop", "aria-hidden": "true" }),
       (0, p.jsxs)("aside", { className: `hidden lg:flex lg:w-[270px] flex-col gap-3 p-4 rounded-2xl overflow-y-auto shrink-0 z-10 ${O}`, children: [
         (0, p.jsxs)("div", { className: "flex items-center justify-between border-b border-slate-200/30 pb-2", children: [
           (0, p.jsxs)("span", { className: "text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5", children: [
             (0, p.jsx)("i", { className: "fa-solid fa-chart-line text-[#2b6cb0]" }),
            "Analytics"
          ] }),
           (0, p.jsx)("span", { className: "text-[10px] mono-num font-bold opacity-65", children: "LIVE" })
        ] }),
         (0, p.jsxs)("div", { className: "grid grid-cols-2 gap-2 mono-num", children: [
           (0, p.jsxs)("div", { className: `p-2.5 rounded-xl border ${A ? "bg-slate-800/70 border-slate-700" : "bg-slate-50 border-slate-200"}`, children: [
             (0, p.jsx)("div", { className: "text-[10px] uppercase opacity-65", children: "Bricks / Min" }),
             (0, p.jsx)("div", { className: "text-base font-extrabold", children: y.analytics.bricksPerMin })
          ] }),
           (0, p.jsxs)("div", { className: `p-2.5 rounded-xl border ${A ? "bg-slate-800/70 border-slate-700" : "bg-slate-50 border-slate-200"}`, children: [
             (0, p.jsx)("div", { className: "text-[10px] uppercase opacity-65", children: "Avg Dmg/Shot" }),
             (0, p.jsx)("div", { className: "text-base font-extrabold", children: y.analytics.avgDmgPerShot })
          ] }),
           (0, p.jsxs)("div", { className: `p-2.5 rounded-xl border ${A ? "bg-slate-800/70 border-slate-700" : "bg-slate-50 border-slate-200"}`, children: [
             (0, p.jsx)("div", { className: "text-[10px] uppercase opacity-65", children: "Run Bricks" }),
             (0, p.jsx)("div", { className: "text-base font-extrabold", children: y.analytics.runBricks })
          ] }),
           (0, p.jsxs)("div", { className: `p-2.5 rounded-xl border ${A ? "bg-slate-800/70 border-slate-700" : "bg-slate-50 border-slate-200"}`, children: [
             (0, p.jsx)("div", { className: "text-[10px] uppercase opacity-65", children: "Best Combo" }),
             (0, p.jsxs)("div", { className: "text-base font-extrabold", children: [
              y.analytics.bestCombo,
              "x"
            ] })
          ] }),
           (0, p.jsxs)("div", { className: `p-2.5 rounded-xl border ${A ? "bg-slate-800/70 border-slate-700" : "bg-slate-50 border-slate-200"}`, children: [
             (0, p.jsx)("div", { className: "text-[10px] uppercase opacity-65", children: "Shots Fired" }),
             (0, p.jsx)("div", { className: "text-base font-extrabold", children: y.analytics.runShots })
          ] }),
           (0, p.jsxs)("div", { className: `p-2.5 rounded-xl border ${A ? "bg-slate-800/70 border-slate-700" : "bg-slate-50 border-slate-200"}`, children: [
             (0, p.jsx)("div", { className: "text-[10px] uppercase opacity-65", children: "Rebound %" }),
             (0, p.jsxs)("div", { className: "text-base font-extrabold text-sky-500", children: [
              (t.getMeta().permUpgrades.rebound || 0) * 3,
              "%"
            ] })
          ] })
        ] }),
         (0, p.jsxs)("div", { className: "mt-2 pt-3 border-t border-slate-200/30 flex-1 flex flex-col min-h-0", children: [
           (0, p.jsxs)("div", { className: "flex items-center justify-between mb-2", children: [
             (0, p.jsxs)("span", { className: "text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5", children: [
               (0, p.jsx)("i", { className: "fa-solid fa-stopwatch text-emerald-500" }),
              "TAS Splits"
            ] }),
             (0, p.jsx)("span", { className: "text-[10px] mono-num font-bold opacity-65", children: z ? K(y.elapsedMs) : "SR ONLY" })
          ] }),
          z ?  (0, p.jsx)("div", { className: "space-y-1.5 overflow-y-auto flex-1 pr-1 mono-num text-xs", children: y.splits.length === 0 ?  (0, p.jsx)("div", { className: "text-[11px] opacity-60 py-3 text-center", children: "Splits record every 5 levels" }) : y.splits.map((E) =>  (0, p.jsxs)(
            "div",
            {
              className: `flex items-center justify-between px-2.5 py-1.5 rounded-lg border ${E.isGold ? "bg-amber-500/15 border-amber-500/40 text-amber-500" : A ? "bg-slate-800/60 border-slate-700" : "bg-slate-50 border-slate-200"}`,
              children: [
                 (0, p.jsxs)("span", { className: "font-bold", children: [
                  "Lv.",
                  E.level
                ] }),
                 (0, p.jsxs)("div", { className: "flex items-center gap-2", children: [
                  E.deltaMs !== null &&  (0, p.jsxs)("span", { className: E.deltaMs <= 0 ? "text-emerald-500 font-bold" : "text-red-500 font-bold", children: [
                    E.deltaMs <= 0 ? "" : "+",
                    (E.deltaMs / 1e3).toFixed(1),
                    "s"
                  ] }),
                   (0, p.jsx)("span", { className: "font-extrabold", children: K(E.timeMs) })
                ] })
              ]
            },
            E.level
          )) }) :  (0, p.jsx)("div", { className: "text-[11px] opacity-60 py-2", children: "Start a Speedrun mode to track live TAS splits and Gold segments." })
        ] })
      ] }),
       (0, p.jsxs)("div", { className: "relative z-10 w-full max-w-[500px] h-full flex flex-col gap-2 min-h-0", children: [
         (0, p.jsxs)("header", { className: `flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-2xl ${O}`, children: [
           (0, p.jsxs)("div", { className: "flex items-center gap-2.5 min-w-0", children: [
             (0, p.jsx)(
              "button",
              {
                onClick: () => o("account"),
                className: "w-9 h-9 rounded-xl bg-gradient-to-br from-[#3182ce] to-[#1e4e8c] text-white border-2 border-[#171717] shadow-[0_2px_0_#171717] flex items-center justify-center cursor-pointer shrink-0",
                title: "Player Profile & Stats",
                children:  (0, p.jsx)("i", { className: `fa-solid ${v.icon}` })
              }
            ),
             (0, p.jsxs)("div", { className: "min-w-0", children: [
               (0, p.jsxs)("div", { className: "flex items-center gap-1.5", children: [
                 (0, p.jsx)("span", { className: "text-xs font-extrabold tracking-wide uppercase truncate", children: C.short }),
                 (0, p.jsxs)(
                  "span",
                  {
                    className: `text-[10px] mono-num font-bold px-1.5 py-0.5 rounded ${A ? "bg-slate-800 text-slate-300" : "bg-slate-200 text-slate-700"}`,
                    children: [
                      "S",
                      t.getActiveSlot()
                    ]
                  }
                )
              ] }),
               (0, p.jsxs)("div", { className: "flex items-center gap-2.5 text-[11px] mono-num", children: [
                 (0, p.jsxs)("span", { className: A ? "text-amber-400 font-bold" : "text-amber-600 font-extrabold", children: [
                   (0, p.jsx)("i", { className: "fa-solid fa-coins mr-1" }),
                  y.coins.toLocaleString()
                ] }),
                 (0, p.jsxs)("span", { className: A ? "text-fuchsia-400 font-bold" : "text-purple-700 font-extrabold", children: [
                   (0, p.jsx)("i", { className: "fa-solid fa-gem mr-1" }),
                  y.gems.toLocaleString()
                ] })
              ] })
            ] })
          ] }),
           (0, p.jsxs)("div", { className: "flex items-center gap-1.5", children: [
             (0, p.jsxs)(
              "button",
              {
                disabled: !y.gameOver && !y.victory,
                onClick: () => (y.gameOver || y.victory) && o("modeSelect"),
                className: `px-2.5 py-2 rounded-xl text-xs font-bold border-2 whitespace-nowrap ${!y.gameOver && !y.victory ? "bg-slate-200 border-slate-300 text-slate-500 cursor-not-allowed opacity-75" : "bg-[#2b6cb0] hover:bg-[#255c99] text-white border-[#171717] shadow-[0_2px_0_#171717] cursor-pointer"}`,
                title: !y.gameOver && !y.victory ? "Gamemode is locked during an active run" : "Change Mode & Difficulty",
                children: [
                   (0, p.jsx)("i", { className: `fa-solid ${!y.gameOver && !y.victory ? "fa-lock" : "fa-gamepad"} mr-1.5` }),
                  "Modes"
                ]
              }
            ),
             (0, p.jsx)(
              "button",
              {
                onClick: () => o("shop"),
                className: `w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer ${yt}`,
                title: "Upgrades Shop",
                children:  (0, p.jsx)("i", { className: "fa-solid fa-store text-amber-500" })
              }
            ),
             (0, p.jsx)(
              "button",
              {
                onClick: () => o("guide"),
                className: `w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer ${yt}`,
                title: "Brick Guide",
                children:  (0, p.jsx)("i", { className: "fa-solid fa-book-open text-emerald-600" })
              }
            ),
             (0, p.jsx)(
              "button",
              {
                onClick: () => c((E) => !E),
                className: `w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer ${yt}`,
                title: "Pause",
                children:  (0, p.jsx)("i", { className: `fa-solid ${u ? "fa-play" : "fa-pause"}` })
              }
            ),
             (0, p.jsx)(
              "button",
              {
                onClick: () => o("settings"),
                className: `w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer ${yt}`,
                title: "Settings & Save Data",
                children:  (0, p.jsx)("i", { className: "fa-solid fa-gear" })
              }
            )
          ] })
        ] }),
         (0, p.jsxs)("div", { className: `grid grid-cols-4 gap-2 px-3 py-2 rounded-xl text-center ${O}`, children: [
           (0, p.jsxs)("div", { children: [
             (0, p.jsx)("div", { className: "text-[10px] font-bold uppercase opacity-65", children: "Level" }),
             (0, p.jsxs)("div", { className: "text-sm font-extrabold mono-num", children: [
              y.level,
              C.targetLevel ? `/${C.targetLevel}` : ""
            ] })
          ] }),
           (0, p.jsxs)("div", { children: [
             (0, p.jsx)("div", { className: "text-[10px] font-bold uppercase opacity-65", children: "Score" }),
             (0, p.jsx)("div", { className: `text-sm font-extrabold mono-num ${A ? "text-sky-400" : "text-[#2b6cb0]"}`, children: y.score.toLocaleString() })
          ] }),
           (0, p.jsxs)("div", { children: [
             (0, p.jsx)("div", { className: "text-[10px] font-bold uppercase opacity-65", children: z ? "Timer" : "Balls" }),
             (0, p.jsx)("div", { className: `text-sm font-extrabold mono-num ${A ? "text-emerald-400" : "text-emerald-700"}`, children: z ? K(y.elapsedMs) : y.ballCount })
          ] }),
           (0, p.jsx)("div", { className: "flex flex-col items-center justify-center", children:  (0, p.jsx)(
            "select",
            {
              value: y.difficulty,
              disabled: !y.gameOver && !y.victory,
              onChange: (E) => l.current?.setDifficulty(E.target.value),
              title: !y.gameOver && !y.victory ? "Difficulty is locked during an active run" : "Select Difficulty",
              className: `w-full text-[11px] font-extrabold mono-num rounded-lg px-1.5 py-1 text-center focus:outline-none border ${!y.gameOver && !y.victory ? "cursor-not-allowed opacity-75" : "cursor-pointer"} ${A ? "bg-slate-800 border-slate-600" : "bg-slate-100 border-slate-300"}`,
              style: { color: Et[y.difficulty].color },
              children: Object.keys(Et).map((E) => {
                let V = Ei(y.mode, E);
                return  (0, p.jsxs)("option", { value: E, disabled: !V, children: [
                  Et[E].short,
                  V ? "" : " (Locked)"
                ] }, E);
              })
            }
          ) })
        ] }),
         (0, p.jsxs)(
          "div",
          {
            className: `relative flex-1 min-h-0 w-full flex items-center justify-center rounded-2xl overflow-hidden shadow-xl ${A ? "border-2 border-slate-700 bg-black" : "border-2 border-[#171717] bg-white"}`,
            children: [
               (0, p.jsx)(
                "canvas",
                {
                  ref: a,
                  width: 480,
                  height: 700,
                  className: "max-w-full max-h-full aspect-[480/700] block cursor-crosshair object-contain",
                  onPointerEnter: (E) => l.current?.onPointerEnter(E.clientX, E.clientY),
                  onPointerLeave: () => l.current?.onPointerLeave(),
                  onPointerDown: (E) => {
                    E.currentTarget.setPointerCapture(E.pointerId), l.current?.onPointerDown(E.clientX, E.clientY);
                  },
                  onPointerMove: (E) => l.current?.onPointerMove(E.clientX, E.clientY),
                  onPointerUp: () => l.current?.onPointerUp()
                }
              ),
              y.toast &&  (0, p.jsxs)("div", { className: "absolute top-3 left-1/2 -translate-x-1/2 px-3.5 py-2 rounded-xl bg-[#0f172a] border-2 border-[#2b6cb0] text-xs font-bold text-white shadow-lg whitespace-nowrap max-w-[92%] truncate pointer-events-none", children: [
                 (0, p.jsx)("i", { className: "fa-solid fa-circle-info text-sky-400 mr-1.5" }),
                y.toast
              ] }),
              (y.gameOver || y.victory) &&  (0, p.jsx)("div", { className: "absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center", children:  (0, p.jsxs)("div", { className: "w-full max-w-xs rounded-2xl bg-white border-2 border-[#171717] p-6 shadow-[0_14px_36px_rgba(15,23,42,0.3)] text-[#0f172a]", children: [
                 (0, p.jsx)(
                  "div",
                  {
                    className: `w-14 h-14 mx-auto rounded-2xl border-2 border-[#171717] shadow-[0_4px_0_#171717] flex items-center justify-center text-2xl mb-3 text-white ${y.victory ? "bg-emerald-600" : "bg-red-600"}`,
                    children:  (0, p.jsx)("i", { className: `fa-solid ${y.victory ? "fa-trophy" : "fa-skull"}` })
                  }
                ),
                 (0, p.jsx)("h2", { className: "text-xl font-extrabold", children: y.victory ? "SPEEDRUN COMPLETE!" : "RUN ENDED" }),
                 (0, p.jsxs)("p", { className: "text-xs text-slate-600 mt-0.5 font-medium", children: [
                  C.name,
                  " \xB7 ",
                  Et[y.difficulty].name
                ] }),
                 (0, p.jsxs)("div", { className: "grid grid-cols-2 gap-2.5 my-4 mono-num", children: [
                   (0, p.jsxs)("div", { className: "p-2.5 rounded-xl bg-slate-100 border border-slate-200", children: [
                     (0, p.jsx)("div", { className: "text-[10px] font-bold text-slate-500 uppercase", children: "Level" }),
                     (0, p.jsx)("div", { className: "text-lg font-extrabold text-[#0f172a]", children: y.level })
                  ] }),
                   (0, p.jsxs)("div", { className: "p-2.5 rounded-xl bg-slate-100 border border-slate-200", children: [
                     (0, p.jsx)("div", { className: "text-[10px] font-bold text-slate-500 uppercase", children: "Score" }),
                     (0, p.jsx)("div", { className: "text-lg font-extrabold text-[#2b6cb0]", children: y.score.toLocaleString() })
                  ] })
                ] }),
                 (0, p.jsxs)("div", { className: "flex gap-2", children: [
                   (0, p.jsxs)(
                    "button",
                    {
                      onClick: () => l.current?.startNewRun(y.mode, y.difficulty),
                      className: "flex-1 py-2.5 rounded-xl bg-[#2b6cb0] hover:bg-[#255c99] text-white text-xs font-extrabold border-2 border-[#171717] shadow-[0_3px_0_#171717] cursor-pointer",
                      children: [
                         (0, p.jsx)("i", { className: "fa-solid fa-rotate-right mr-1.5" }),
                        "Play Again"
                      ]
                    }
                  ),
                   (0, p.jsx)(
                    "button",
                    {
                      onClick: () => o("modeSelect"),
                      className: "px-4 py-2.5 rounded-xl bg-[#1e293b] hover:bg-[#0f172a] text-white text-xs font-bold cursor-pointer",
                      children: "Modes"
                    }
                  )
                ] })
              ] }) }),
              u && !y.gameOver && !y.victory &&  (0, p.jsx)("div", { className: "absolute inset-0 bg-slate-950/75 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20", children:  (0, p.jsxs)("div", { className: "w-full max-w-xs rounded-2xl bg-white border-2 border-[#171717] p-6 shadow-[0_14px_36px_rgba(15,23,42,0.3)] text-[#0f172a] space-y-3", children: [
                 (0, p.jsx)("h2", { className: "text-xl font-extrabold", children: "PAUSED" }),
                 (0, p.jsxs)(
                  "button",
                  {
                    onClick: () => c(!1),
                    className: "w-full py-2.5 rounded-xl bg-[#2b6cb0] hover:bg-[#255c99] text-white text-xs font-extrabold border-2 border-[#171717] shadow-[0_3px_0_#171717] cursor-pointer",
                    children: [
                       (0, p.jsx)("i", { className: "fa-solid fa-play mr-1.5" }),
                      "Resume"
                    ]
                  }
                ),
                 (0, p.jsxs)(
                  "button",
                  {
                    onClick: () => {
                      c(!1), l.current?.startNewRun(y.mode, y.difficulty);
                    },
                    className: "w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-bold cursor-pointer",
                    children: [
                       (0, p.jsx)("i", { className: "fa-solid fa-rotate-right mr-1.5" }),
                      "Restart Run"
                    ]
                  }
                ),
                 (0, p.jsxs)("div", { className: "grid grid-cols-2 gap-2", children: [
                   (0, p.jsxs)(
                    "button",
                    {
                      onClick: () => {
                        c(!1), i("slots"), m((E) => E + 1);
                      },
                      className: "py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-bold cursor-pointer",
                      children: [
                         (0, p.jsx)("i", { className: "fa-solid fa-layer-group mr-1" }),
                        "Slots"
                      ]
                    }
                  ),
                   (0, p.jsxs)(
                    "button",
                    {
                      onClick: () => {
                        c(!1), i("menu"), m((E) => E + 1);
                      },
                      className: "py-2 rounded-xl bg-[#1e293b] hover:bg-[#0f172a] text-white text-xs font-bold cursor-pointer",
                      children: [
                         (0, p.jsx)("i", { className: "fa-solid fa-house mr-1" }),
                        "Menu"
                      ]
                    }
                  )
                ] })
              ] }) })
            ]
          }
        ),
         (0, p.jsxs)("div", { className: `grid grid-cols-2 gap-2 px-2.5 py-2 rounded-xl ${O}`, children: [
           (0, p.jsxs)(
            "button",
            {
              onClick: () => l.current?.buyTempBuff("doubleDamage"),
              className: "flex items-center justify-between px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-xs font-bold cursor-pointer",
              title: "1.5x Ball Damage for 3 turns",
              children: [
                 (0, p.jsxs)("span", { className: "truncate", children: [
                   (0, p.jsx)("i", { className: "fa-solid fa-fire text-amber-500 mr-1.5" }),
                  y.doubleDamageTurns > 0 ? `1.5x DMG (${y.doubleDamageTurns}t)` : "1.5x Damage"
                ] }),
                 (0, p.jsxs)("span", { className: "mono-num text-amber-600 font-extrabold ml-1", children: [
                  y.tempCosts.doubleDamage,
                  "c"
                ] })
              ]
            }
          ),
           (0, p.jsxs)(
            "button",
            {
              onClick: () => l.current?.buyTempBuff("laserWipe"),
              className: "flex items-center justify-between px-3 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 border border-red-500/40 text-xs font-bold cursor-pointer",
              title: "Blast the bottom row of bricks",
              children: [
                 (0, p.jsxs)("span", { className: "truncate", children: [
                   (0, p.jsx)("i", { className: "fa-solid fa-bolt text-red-500 mr-1.5" }),
                  "Laser Wipe"
                ] }),
                 (0, p.jsxs)("span", { className: "mono-num text-amber-600 font-extrabold ml-1", children: [
                  y.tempCosts.laserWipe,
                  "c"
                ] })
              ]
            }
          )
        ] }),
         (0, p.jsxs)("div", { className: "flex items-center justify-between gap-2", children: [
           (0, p.jsxs)("div", { className: "flex items-center gap-1.5", children: [
             (0, p.jsxs)(
              "button",
              {
                onClick: () => {
                  c(!1), i("menu"), m((E) => E + 1);
                },
                className: `px-3 py-2 rounded-xl text-xs font-bold cursor-pointer whitespace-nowrap ${O}`,
                children: [
                   (0, p.jsx)("i", { className: "fa-solid fa-house mr-1.5 text-[#2b6cb0]" }),
                  "Menu"
                ]
              }
            ),
             (0, p.jsxs)(
              "button",
              {
                onClick: () => {
                  c(!1), i("slots"), m((E) => E + 1);
                },
                className: `px-3 py-2 rounded-xl text-xs font-bold cursor-pointer whitespace-nowrap ${O}`,
                children: [
                   (0, p.jsx)("i", { className: "fa-solid fa-layer-group mr-1.5" }),
                  "Slots"
                ]
              }
            )
          ] }),
           (0, p.jsx)("div", { className: "flex items-center gap-2", children: y.shooting ?  (0, p.jsxs)(p.Fragment, { children: [
             (0, p.jsxs)(
              "button",
              {
                onClick: () => l.current?.toggleFastForward(),
                className: `px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer whitespace-nowrap border-2 border-[#171717] shadow-[0_2px_0_#171717] ${y.fastForward ? "bg-amber-400 text-[#0f172a]" : "bg-white text-amber-700"}`,
                children: [
                   (0, p.jsx)("i", { className: "fa-solid fa-forward mr-1.5" }),
                  y.fastForward ? "3x ON" : "Fast"
                ]
              }
            ),
             (0, p.jsxs)(
              "button",
              {
                onClick: () => l.current?.recallBalls(),
                className: "px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white border-2 border-[#171717] shadow-[0_2px_0_#171717] cursor-pointer whitespace-nowrap",
                children: [
                   (0, p.jsx)("i", { className: "fa-solid fa-angles-down mr-1.5" }),
                  "Recall"
                ]
              }
            )
          ] }) :  (0, p.jsx)("div", { className: `text-xs font-semibold px-2 ${A ? "text-slate-300" : "text-slate-600"}`, children: "Drag on the board to aim & release to fire" }) })
        ] })
      ] }),
       (0, p.jsx)(
        wf,
        {
          activeModal: s,
          onClose: () => o(null),
          vault: t,
          currentMode: y.mode,
          currentDifficulty: y.difficulty,
          onStartMode: (E, V) => l.current?.startNewRun(E, V),
          onDataChanged: (E) => {
            l.current?.refreshSettings(), m((V) => V + 1), E && l.current?.showToast(E);
          },
          onImportSuccess: (E, V) => {
            l.current?.loadFromSlot(E), l.current?.showToast(V), m((St) => St + 1);
          }
        }
      )
    ] });
  }
  var U1 = be(hl(), 1);
  (0, R1.createRoot)(document.getElementById("root")).render( (0, U1.jsx)(Vf, {}));
})();
