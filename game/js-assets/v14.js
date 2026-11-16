(function() {
  var Wp = Object.create, _u = Object.defineProperty, Qp = Object.getOwnPropertyDescriptor, Gp = Object.getOwnPropertyNames, Yp = Object.getPrototypeOf, $u = Object.prototype.hasOwnProperty, un = (l, o) => () => (o || (l((o = { exports: {} }).exports, o, o.exports), l = null), o.exports), Jp = (l, o, u, f) => {
    if (o && typeof o == "object" || typeof o == "function") for (var c = Gp(o), h = 0, m = c.length, x; h < m; h++) x = c[h], !$u.call(l, x) && x !== u && _u(l, x, { get: ((k) => o[k]).bind(null, x), enumerable: !(f = Qp(o, x)) || f.enumerable });
    return l;
  }, Kp = (l, o, u) => (u = l != null ? Wp(Yp(l)) : {}, Jp(o || !l || !l.__esModule || !$u.call(l, "default") ? _u(u, "default", { value: l, enumerable: !0 }) : u, l)), Zp = un(((l) => {
    function o(D, ne) {
      var M = D.length;
      D.push(ne);
      e: for (; 0 < M; ) {
        var _ = M - 1 >>> 1, X = D[_];
        if (0 < c(X, ne)) D[_] = ne, D[M] = X, M = _;
        else break e;
      }
    }
    function u(D) {
      return D.length === 0 ? null : D[0];
    }
    function f(D) {
      if (D.length === 0) return null;
      var ne = D[0], M = D.pop();
      if (M !== ne) {
        D[0] = M;
        e: for (var _ = 0, X = D.length, je = X >>> 1; _ < je; ) {
          var Pe = 2 * (_ + 1) - 1, Ve = D[Pe], dt = Pe + 1, b = D[dt];
          if (0 > c(Ve, M)) dt < X && 0 > c(b, Ve) ? (D[_] = b, D[dt] = M, _ = dt) : (D[_] = Ve, D[Pe] = M, _ = Pe);
          else if (dt < X && 0 > c(b, M)) D[_] = b, D[dt] = M, _ = dt;
          else break e;
        }
      }
      return ne;
    }
    function c(D, ne) {
      var M = D.sortIndex - ne.sortIndex;
      return M !== 0 ? M : D.id - ne.id;
    }
    if (l.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var h = performance;
      l.unstable_now = function() {
        return h.now();
      };
    } else {
      var m = Date, x = m.now();
      l.unstable_now = function() {
        return m.now() - x;
      };
    }
    var k = [], P = [], F = 1, j = null, y = 3, I = !1, q = !1, te = !1, ae = !1, Y = typeof setTimeout == "function" ? setTimeout : null, Se = typeof clearTimeout == "function" ? clearTimeout : null, ze = typeof setImmediate < "u" ? setImmediate : null;
    function tt(D) {
      for (var ne = u(P); ne !== null; ) {
        if (ne.callback === null) f(P);
        else if (ne.startTime <= D) f(P), ne.sortIndex = ne.expirationTime, o(k, ne);
        else break;
        ne = u(P);
      }
    }
    function lt(D) {
      if (te = !1, tt(D), !q) if (u(k) !== null) q = !0, Ue || (Ue = !0, Fe());
      else {
        var ne = u(P);
        ne !== null && Ne(lt, ne.startTime - D);
      }
    }
    var Ue = !1, He = -1, se = 5, de = -1;
    function he() {
      return ae ? !0 : !(l.unstable_now() - de < se);
    }
    function qe() {
      if (ae = !1, Ue) {
        var D = l.unstable_now();
        de = D;
        var ne = !0;
        try {
          e: {
            q = !1, te && (te = !1, Se(He), He = -1), I = !0;
            var M = y;
            try {
              t: {
                for (tt(D), j = u(k); j !== null && !(j.expirationTime > D && he()); ) {
                  var _ = j.callback;
                  if (typeof _ == "function") {
                    j.callback = null, y = j.priorityLevel;
                    var X = _(j.expirationTime <= D);
                    if (D = l.unstable_now(), typeof X == "function") {
                      j.callback = X, tt(D), ne = !0;
                      break t;
                    }
                    j === u(k) && f(k), tt(D);
                  } else f(k);
                  j = u(k);
                }
                if (j !== null) ne = !0;
                else {
                  var je = u(P);
                  je !== null && Ne(lt, je.startTime - D), ne = !1;
                }
              }
              break e;
            } finally {
              j = null, y = M, I = !1;
            }
            ne = void 0;
          }
        } finally {
          ne ? Fe() : Ue = !1;
        }
      }
    }
    var Fe;
    if (typeof ze == "function") Fe = function() {
      ze(qe);
    };
    else if (typeof MessageChannel < "u") {
      var nt = new MessageChannel(), vt = nt.port2;
      nt.port1.onmessage = qe, Fe = function() {
        vt.postMessage(null);
      };
    } else Fe = function() {
      Y(qe, 0);
    };
    function Ne(D, ne) {
      He = Y(function() {
        D(l.unstable_now());
      }, ne);
    }
    l.unstable_IdlePriority = 5, l.unstable_ImmediatePriority = 1, l.unstable_LowPriority = 4, l.unstable_NormalPriority = 3, l.unstable_Profiling = null, l.unstable_UserBlockingPriority = 2, l.unstable_cancelCallback = function(D) {
      D.callback = null;
    }, l.unstable_forceFrameRate = function(D) {
      0 > D || 125 < D ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : se = 0 < D ? Math.floor(1e3 / D) : 5;
    }, l.unstable_getCurrentPriorityLevel = function() {
      return y;
    }, l.unstable_next = function(D) {
      switch (y) {
        case 1:
        case 2:
        case 3:
          var ne = 3;
          break;
        default:
          ne = y;
      }
      var M = y;
      y = ne;
      try {
        return D();
      } finally {
        y = M;
      }
    }, l.unstable_requestPaint = function() {
      ae = !0;
    }, l.unstable_runWithPriority = function(D, ne) {
      switch (D) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          D = 3;
      }
      var M = y;
      y = D;
      try {
        return ne();
      } finally {
        y = M;
      }
    }, l.unstable_scheduleCallback = function(D, ne, M) {
      var _ = l.unstable_now();
      switch (typeof M == "object" && M !== null ? (M = M.delay, M = typeof M == "number" && 0 < M ? _ + M : _) : M = _, D) {
        case 1:
          var X = -1;
          break;
        case 2:
          X = 250;
          break;
        case 5:
          X = 1073741823;
          break;
        case 4:
          X = 1e4;
          break;
        default:
          X = 5e3;
      }
      return X = M + X, D = { id: F++, callback: ne, priorityLevel: D, startTime: M, expirationTime: X, sortIndex: -1 }, M > _ ? (D.sortIndex = M, o(P, D), u(k) === null && D === u(P) && (te ? (Se(He), He = -1) : te = !0, Ne(lt, M - _))) : (D.sortIndex = X, o(k, D), q || I || (q = !0, Ue || (Ue = !0, Fe()))), D;
    }, l.unstable_shouldYield = he, l.unstable_wrapCallback = function(D) {
      var ne = y;
      return function() {
        var M = y;
        y = ne;
        try {
          return D.apply(this, arguments);
        } finally {
          y = M;
        }
      };
    };
  })), Xp = un(((l, o) => {
    o.exports = Zp();
  })), _p = un(((l) => {
    var o = Symbol.for("react.transitional.element"), u = Symbol.for("react.portal"), f = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), h = Symbol.for("react.profiler"), m = Symbol.for("react.consumer"), x = Symbol.for("react.context"), k = Symbol.for("react.forward_ref"), P = Symbol.for("react.suspense"), F = Symbol.for("react.memo"), j = Symbol.for("react.lazy"), y = Symbol.for("react.activity"), I = Symbol.for("react.view_transition"), q = Symbol.iterator;
    function te(b) {
      return b === null || typeof b != "object" ? null : (b = q && b[q] || b["@@iterator"], typeof b == "function" ? b : null);
    }
    var ae = { isMounted: function() {
      return !1;
    }, enqueueForceUpdate: function() {
    }, enqueueReplaceState: function() {
    }, enqueueSetState: function() {
    } }, Y = Object.assign, Se = {};
    function ze(b, U, Q) {
      this.props = b, this.context = U, this.refs = Se, this.updater = Q || ae;
    }
    ze.prototype.isReactComponent = {}, ze.prototype.setState = function(b, U) {
      if (typeof b != "object" && typeof b != "function" && b != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, b, U, "setState");
    }, ze.prototype.forceUpdate = function(b) {
      this.updater.enqueueForceUpdate(this, b, "forceUpdate");
    };
    function tt() {
    }
    tt.prototype = ze.prototype;
    function lt(b, U, Q) {
      this.props = b, this.context = U, this.refs = Se, this.updater = Q || ae;
    }
    var Ue = lt.prototype = new tt();
    Ue.constructor = lt, Y(Ue, ze.prototype), Ue.isPureReactComponent = !0;
    var He = Array.isArray;
    function se() {
    }
    var de = { H: null, A: null, T: null, S: null }, he = Object.prototype.hasOwnProperty;
    function qe(b, U, Q) {
      var z = Q.ref;
      return { $$typeof: o, type: b, key: U, ref: z !== void 0 ? z : null, props: Q };
    }
    function Fe(b, U) {
      return qe(b.type, U, b.props);
    }
    function nt(b) {
      return typeof b == "object" && b !== null && b.$$typeof === o;
    }
    function vt(b) {
      var U = { "=": "=0", ":": "=2" };
      return "$" + b.replace(/[=:]/g, function(Q) {
        return U[Q];
      });
    }
    var Ne = /\/+/g;
    function D(b, U) {
      return typeof b == "object" && b !== null && b.key != null ? vt("" + b.key) : U.toString(36);
    }
    function ne(b) {
      switch (b.status) {
        case "fulfilled":
          return b.value;
        case "rejected":
          throw b.reason;
        default:
          switch (typeof b.status == "string" ? b.then(se, se) : (b.status = "pending", b.then(function(U) {
            b.status === "pending" && (b.status = "fulfilled", b.value = U);
          }, function(U) {
            b.status === "pending" && (b.status = "rejected", b.reason = U);
          })), b.status) {
            case "fulfilled":
              return b.value;
            case "rejected":
              throw b.reason;
          }
      }
      throw b;
    }
    function M(b, U, Q, z, K) {
      var $ = typeof b;
      ($ === "undefined" || $ === "boolean") && (b = null);
      var re = !1;
      if (b === null) re = !0;
      else switch ($) {
        case "bigint":
        case "string":
        case "number":
          re = !0;
          break;
        case "object":
          switch (b.$$typeof) {
            case o:
            case u:
              re = !0;
              break;
            case j:
              return re = b._init, M(re(b._payload), U, Q, z, K);
          }
      }
      if (re) return K = K(b), re = z === "" ? "." + D(b, 0) : z, He(K) ? (Q = "", re != null && (Q = re.replace(Ne, "$&/") + "/"), M(K, U, Q, "", function(le) {
        return le;
      })) : K != null && (nt(K) && (K = Fe(K, Q + (K.key == null || b && b.key === K.key ? "" : ("" + K.key).replace(Ne, "$&/") + "/") + re)), U.push(K)), 1;
      re = 0;
      var H = z === "" ? "." : z + ":";
      if (He(b)) for (var O = 0; O < b.length; O++) z = b[O], $ = H + D(z, O), re += M(z, U, Q, $, K);
      else if (O = te(b), typeof O == "function") for (b = O.call(b), O = 0; !(z = b.next()).done; ) z = z.value, $ = H + D(z, O++), re += M(z, U, Q, $, K);
      else if ($ === "object") {
        if (typeof b.then == "function") return M(ne(b), U, Q, z, K);
        throw U = String(b), Error("Objects are not valid as a React child (found: " + (U === "[object Object]" ? "object with keys {" + Object.keys(b).join(", ") + "}" : U) + "). If you meant to render a collection of children, use an array instead.");
      }
      return re;
    }
    function _(b, U, Q) {
      if (b == null) return b;
      var z = [], K = 0;
      return M(b, z, "", "", function($) {
        return U.call(Q, $, K++);
      }), z;
    }
    function X(b) {
      if (b._status === -1) {
        var U = b._result, Q = U();
        Q.then(function(z) {
          (b._status === 0 || b._status === -1) && (b._status = 1, b._result = z, Q.status === void 0 && (Q.status = "fulfilled", Q.value = z));
        }, function(z) {
          (b._status === 0 || b._status === -1) && (b._status = 2, b._result = z, Q.status === void 0 && (Q.status = "rejected", Q.reason = z));
        }), b._status === -1 && (b._status = 0, b._result = Q);
      }
      if (b._status === 1) return b._result.default;
      throw b._result;
    }
    var je = typeof reportError == "function" ? reportError : function(b) {
      if (typeof window == "object" && typeof window.ErrorEvent == "function") {
        var U = new window.ErrorEvent("error", { bubbles: !0, cancelable: !0, message: typeof b == "object" && b !== null && typeof b.message == "string" ? String(b.message) : String(b), error: b });
        if (!window.dispatchEvent(U)) return;
      } else if (typeof process == "object" && typeof process.emit == "function") {
        process.emit("uncaughtException", b);
        return;
      }
      console.error(b);
    };
    function Pe(b) {
      var U = de.T, Q = {};
      Q.types = U !== null ? U.types : null, de.T = Q;
      try {
        var z = b(), K = de.S;
        K !== null && K(Q, z), typeof z == "object" && z !== null && typeof z.then == "function" && z.then(se, je);
      } catch ($) {
        je($);
      } finally {
        U !== null && Q.types !== null && (U.types = Q.types), de.T = U;
      }
    }
    function Ve(b) {
      var U = de.T;
      if (U !== null) {
        var Q = U.types;
        Q === null ? U.types = [b] : Q.indexOf(b) === -1 && Q.push(b);
      } else Pe(Ve.bind(null, b));
    }
    var dt = { map: _, forEach: function(b, U, Q) {
      _(b, function() {
        U.apply(this, arguments);
      }, Q);
    }, count: function(b) {
      var U = 0;
      return _(b, function() {
        U++;
      }), U;
    }, toArray: function(b) {
      return _(b, function(U) {
        return U;
      }) || [];
    }, only: function(b) {
      if (!nt(b)) throw Error("React.Children.only expected to receive a single React element child.");
      return b;
    } };
    l.Activity = y, l.Children = dt, l.Component = ze, l.Fragment = f, l.Profiler = h, l.PureComponent = lt, l.StrictMode = c, l.Suspense = P, l.ViewTransition = I, l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = de, l.__COMPILER_RUNTIME = { __proto__: null, c: function(b) {
      return de.H.useMemoCache(b);
    } }, l.addTransitionType = Ve, l.cache = function(b) {
      return function() {
        return b.apply(null, arguments);
      };
    }, l.cacheSignal = function() {
      return null;
    }, l.cloneElement = function(b, U, Q) {
      if (b == null) throw Error("The argument must be a React element, but you passed " + b + ".");
      var z = Y({}, b.props), K = b.key;
      if (U != null) for ($ in U.key !== void 0 && (K = "" + U.key), U) !he.call(U, $) || $ === "key" || $ === "__self" || $ === "__source" || $ === "ref" && U.ref === void 0 || (z[$] = U[$]);
      var $ = arguments.length - 2;
      if ($ === 1) z.children = Q;
      else if (1 < $) {
        for (var re = Array($), H = 0; H < $; H++) re[H] = arguments[H + 2];
        z.children = re;
      }
      return qe(b.type, K, z);
    }, l.createContext = function(b) {
      return b = { $$typeof: x, _currentValue: b, _currentValue2: b, _threadCount: 0, Provider: null, Consumer: null }, b.Provider = b, b.Consumer = { $$typeof: m, _context: b }, b;
    }, l.createElement = function(b, U, Q) {
      var z, K = {}, $ = null;
      if (U != null) for (z in U.key !== void 0 && ($ = "" + U.key), U) he.call(U, z) && z !== "key" && z !== "__self" && z !== "__source" && (K[z] = U[z]);
      var re = arguments.length - 2;
      if (re === 1) K.children = Q;
      else if (1 < re) {
        for (var H = Array(re), O = 0; O < re; O++) H[O] = arguments[O + 2];
        K.children = H;
      }
      if (b && b.defaultProps) for (z in re = b.defaultProps, re) K[z] === void 0 && (K[z] = re[z]);
      return qe(b, $, K);
    }, l.createRef = function() {
      return { current: null };
    }, l.forwardRef = function(b) {
      return { $$typeof: k, render: b };
    }, l.isValidElement = nt, l.lazy = function(b) {
      return { $$typeof: j, _payload: { _status: -1, _result: b }, _init: X };
    }, l.memo = function(b, U) {
      return { $$typeof: F, type: b, compare: U === void 0 ? null : U };
    }, l.startTransition = Pe, l.unstable_useCacheRefresh = function() {
      return de.H.useCacheRefresh();
    }, l.use = function(b) {
      return de.H.use(b);
    }, l.useActionState = function(b, U, Q) {
      return de.H.useActionState(b, U, Q);
    }, l.useCallback = function(b, U) {
      return de.H.useCallback(b, U);
    }, l.useContext = function(b) {
      return de.H.useContext(b);
    }, l.useDebugValue = function() {
    }, l.useDeferredValue = function(b, U) {
      return de.H.useDeferredValue(b, U);
    }, l.useEffect = function(b, U) {
      return de.H.useEffect(b, U);
    }, l.useEffectEvent = function(b) {
      return de.H.useEffectEvent(b);
    }, l.useId = function() {
      return de.H.useId();
    }, l.useImperativeHandle = function(b, U, Q) {
      return de.H.useImperativeHandle(b, U, Q);
    }, l.useInsertionEffect = function(b, U) {
      return de.H.useInsertionEffect(b, U);
    }, l.useLayoutEffect = function(b, U) {
      return de.H.useLayoutEffect(b, U);
    }, l.useMemo = function(b, U) {
      return de.H.useMemo(b, U);
    }, l.useOptimistic = function(b, U) {
      return de.H.useOptimistic(b, U);
    }, l.useReducer = function(b, U, Q) {
      return de.H.useReducer(b, U, Q);
    }, l.useRef = function(b) {
      return de.H.useRef(b);
    }, l.useState = function(b) {
      return de.H.useState(b);
    }, l.useSyncExternalStore = function(b, U, Q) {
      return de.H.useSyncExternalStore(b, U, Q);
    }, l.useTransition = function() {
      return de.H.useTransition();
    }, l.version = "19.3.1";
  })), po = un(((l, o) => {
    o.exports = _p();
  })), $p = un(((l) => {
    var o = po();
    function u(j) {
      var y = "https://react.dev/errors/" + j;
      if (1 < arguments.length) {
        y += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var I = 2; I < arguments.length; I++) y += "&args[]=" + encodeURIComponent(arguments[I]);
      }
      return "Minified React error #" + j + "; visit " + y + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    function f() {
    }
    var c = { d: { f, r: function() {
      throw Error(u(522));
    }, D: f, C: f, L: f, m: f, X: f, S: f, M: f }, p: 0, findDOMNode: null }, h = Symbol.for("react.portal"), m = Symbol.for("react.recoverable"), x = Symbol.for("react.optimistic_key");
    function k(j, y, I) {
      var q = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return { $$typeof: h, key: q == null ? null : q === x ? x : "" + q, children: j, containerInfo: y, implementation: I };
    }
    var P = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function F(j, y) {
      if (j === "font") return "";
      if (typeof y == "string") return y === "use-credentials" ? y : "";
    }
    l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = c, l.browser = function(j) {
      return { $$typeof: m, _reason: j };
    }, l.createPortal = function(j, y) {
      var I = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!y || y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11) throw Error(u(299));
      return k(j, y, null, I);
    }, l.flushSync = function(j) {
      var y = P.T, I = c.p;
      try {
        if (P.T = null, c.p = 2, j) return j();
      } finally {
        P.T = y, c.p = I, c.d.f();
      }
    }, l.preconnect = function(j, y) {
      typeof j == "string" && (y ? (y = y.crossOrigin, y = typeof y == "string" ? y === "use-credentials" ? y : "" : void 0) : y = null, c.d.C(j, y));
    }, l.prefetchDNS = function(j) {
      typeof j == "string" && c.d.D(j);
    }, l.preinit = function(j, y) {
      if (typeof j == "string" && y && typeof y.as == "string") {
        var I = y.as, q = F(I, y.crossOrigin), te = typeof y.integrity == "string" ? y.integrity : void 0, ae = typeof y.fetchPriority == "string" ? y.fetchPriority : void 0;
        I === "style" ? c.d.S(j, typeof y.precedence == "string" ? y.precedence : void 0, { crossOrigin: q, integrity: te, fetchPriority: ae }) : I === "script" && c.d.X(j, { crossOrigin: q, integrity: te, fetchPriority: ae, nonce: typeof y.nonce == "string" ? y.nonce : void 0 });
      }
    }, l.preinitModule = function(j, y) {
      if (typeof j == "string") if (typeof y == "object" && y !== null) {
        if (y.as == null || y.as === "script") {
          var I = F(y.as, y.crossOrigin);
          c.d.M(j, { crossOrigin: I, integrity: typeof y.integrity == "string" ? y.integrity : void 0, nonce: typeof y.nonce == "string" ? y.nonce : void 0, fetchPriority: typeof y.fetchPriority == "string" ? y.fetchPriority : void 0 });
        }
      } else y ?? c.d.M(j);
    }, l.preload = function(j, y) {
      if (typeof j == "string" && typeof y == "object" && y !== null && typeof y.as == "string") {
        var I = y.as, q = F(I, y.crossOrigin);
        c.d.L(j, I, { crossOrigin: q, integrity: typeof y.integrity == "string" ? y.integrity : void 0, nonce: typeof y.nonce == "string" ? y.nonce : void 0, type: typeof y.type == "string" ? y.type : void 0, fetchPriority: typeof y.fetchPriority == "string" ? y.fetchPriority : void 0, referrerPolicy: typeof y.referrerPolicy == "string" ? y.referrerPolicy : void 0, imageSrcSet: typeof y.imageSrcSet == "string" ? y.imageSrcSet : void 0, imageSizes: typeof y.imageSizes == "string" ? y.imageSizes : void 0, media: typeof y.media == "string" ? y.media : void 0 });
      }
    }, l.preloadModule = function(j, y) {
      if (typeof j == "string") if (y) {
        var I = F(y.as, y.crossOrigin);
        c.d.m(j, { as: typeof y.as == "string" && y.as !== "script" ? y.as : void 0, crossOrigin: I, integrity: typeof y.integrity == "string" ? y.integrity : void 0, nonce: typeof y.nonce == "string" ? y.nonce : void 0, fetchPriority: typeof y.fetchPriority == "string" ? y.fetchPriority : void 0 });
      } else c.d.m(j);
    }, l.requestFormReset = function(j) {
      c.d.r(j);
    }, l.unstable_batchedUpdates = function(j, y) {
      return j(y);
    }, l.useFormState = function(j, y, I) {
      return P.H.useFormState(j, y, I);
    }, l.useFormStatus = function() {
      return P.H.useHostTransitionStatus();
    }, l.version = "19.3.1";
  })), eh = un(((l, o) => {
    function u() {
      if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u);
      } catch (f) {
        console.error(f);
      }
    }
    u(), o.exports = $p();
  })), th = un(((l) => {
    var o = Xp(), u = po(), f = eh();
    function c(e) {
      var t = "https://react.dev/errors/" + e;
      if (1 < arguments.length) {
        t += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
      }
      return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    function h(e) {
      return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
    }
    function m(e) {
      for (var t = e, n = t; n && !n.alternate; ) t = n, (t.flags & 4098) !== 0 && (e = t.return), n = t.return;
      for (; t.return; ) t = t.return;
      return t.tag === 3 ? e : null;
    }
    function x(e) {
      if (e.tag === 13) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
      }
      return null;
    }
    function k(e) {
      if (e.tag === 31) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
      }
      return null;
    }
    function P(e) {
      if (m(e) !== e) throw Error(c(188));
    }
    function F(e) {
      var t = e.alternate;
      if (!t) {
        if (t = m(e), t === null) throw Error(c(188));
        return t !== e ? null : e;
      }
      for (var n = e, r = t; ; ) {
        var a = n.return;
        if (a === null) break;
        var s = a.alternate;
        if (s === null) {
          if (r = a.return, r !== null) {
            n = r;
            continue;
          }
          break;
        }
        if (a.child === s.child) {
          for (s = a.child; s; ) {
            if (s === n) return P(a), e;
            if (s === r) return P(a), t;
            s = s.sibling;
          }
          throw Error(c(188));
        }
        if (n.return !== r.return) n = a, r = s;
        else {
          for (var i = !1, p = a.child; p; ) {
            if (p === n) {
              i = !0, n = a, r = s;
              break;
            }
            if (p === r) {
              i = !0, r = a, n = s;
              break;
            }
            p = p.sibling;
          }
          if (!i) {
            for (p = s.child; p; ) {
              if (p === n) {
                i = !0, n = s, r = a;
                break;
              }
              if (p === r) {
                i = !0, r = s, n = a;
                break;
              }
              p = p.sibling;
            }
            if (!i) throw Error(c(189));
          }
        }
        if (n.alternate !== r) throw Error(c(190));
      }
      if (n.tag !== 3) throw Error(c(188));
      return n.stateNode.current === n ? e : t;
    }
    function j(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6) return e;
      for (e = e.child; e !== null; ) {
        if (t = j(e), t !== null) return t;
        e = e.sibling;
      }
      return null;
    }
    function y(e, t, n, r, a, s) {
      for (; e !== null; ) {
        if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && n(e, r, a, s) || (e.tag !== 22 || e.memoizedState === null) && (t || e.tag !== 5 && e.tag !== 27) && y(e.child, t, n, r, a, s)) return !0;
        e = e.sibling;
      }
      return !1;
    }
    function I(e) {
      for (e = e.return; e !== null; ) {
        if (e.tag === 3 || e.tag === 5 || e.tag === 27) return e;
        e = e.return;
      }
      return null;
    }
    function q(e) {
      var t = !1;
      for (e = e.return; e !== null && (e.tag === 4 && (t = !0), !(e.tag === 3 || e.tag === 5 || e.tag === 27)); ) e = e.return;
      return t;
    }
    function te(e) {
      var t = [null, null], n = I(e);
      return n === null || ae(t, e, n.child, { foundSelf: !1 }), t;
    }
    function ae(e, t, n, r) {
      for (; n !== null; ) {
        if (n === t) r.foundSelf = !0;
        else if (n.tag === 5 || n.tag === 27 || n.tag === 6) {
          if (r.foundSelf) return e[1] = n, !0;
          e[0] = n;
        } else if ((n.tag !== 22 || n.memoizedState === null) && ae(e, t, n.child, r)) return !0;
        n = n.sibling;
      }
      return !1;
    }
    function Y(e) {
      switch (e.tag) {
        case 5:
        case 27:
        case 6:
          return e.stateNode;
        case 3:
          return e.stateNode.containerInfo;
        default:
          throw Error(c(559));
      }
    }
    var Se = null, ze = null;
    function tt(e, t, n) {
      return e === n ? !0 : e === t ? (Se = e, !0) : !1;
    }
    function lt(e, t, n) {
      return e === n ? (ze = e, !1) : e === t ? (ze !== null && (Se = e), !0) : !1;
    }
    function Ue(e) {
      if (e === null) return null;
      do
        e = e === null ? null : e.return;
      while (e && e.tag !== 5 && e.tag !== 27 && e.tag !== 3);
      return e || null;
    }
    function He(e, t, n) {
      for (var r = 0, a = e; a; a = n(a)) r++;
      a = 0;
      for (var s = t; s; s = n(s)) a++;
      for (; 0 < r - a; ) e = n(e), r--;
      for (; 0 < a - r; ) t = n(t), a--;
      for (; r--; ) {
        if (e === t || t !== null && e === t.alternate) return e;
        e = n(e), t = n(t);
      }
      return null;
    }
    var se = Object.assign, de = Symbol.for("react.element"), he = Symbol.for("react.transitional.element"), qe = Symbol.for("react.portal"), Fe = Symbol.for("react.fragment"), nt = Symbol.for("react.strict_mode"), vt = Symbol.for("react.profiler"), Ne = Symbol.for("react.consumer"), D = Symbol.for("react.context"), ne = Symbol.for("react.forward_ref"), M = Symbol.for("react.suspense"), _ = Symbol.for("react.suspense_list"), X = Symbol.for("react.memo"), je = Symbol.for("react.lazy"), Pe = Symbol.for("react.activity"), Ve = Symbol.for("react.legacy_hidden"), dt = Symbol.for("react.memo_cache_sentinel"), b = Symbol.for("react.view_transition"), U = Symbol.for("react.recoverable"), Q = Symbol.iterator;
    function z(e) {
      return e === null || typeof e != "object" ? null : (e = Q && e[Q] || e["@@iterator"], typeof e == "function" ? e : null);
    }
    var K = Symbol.for("react.client.reference");
    function $(e) {
      if (e == null) return null;
      if (typeof e == "function") return e.$$typeof === K ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case Fe:
          return "Fragment";
        case vt:
          return "Profiler";
        case nt:
          return "StrictMode";
        case M:
          return "Suspense";
        case _:
          return "SuspenseList";
        case Pe:
          return "Activity";
        case b:
          return "ViewTransition";
      }
      if (typeof e == "object") switch (e.$$typeof) {
        case qe:
          return "Portal";
        case D:
          return e.displayName || "Context";
        case Ne:
          return (e._context.displayName || "Context") + ".Consumer";
        case ne:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case X:
          return t = e.displayName || null, t !== null ? t : $(e.type) || "Memo";
        case je:
          t = e._payload, e = e._init;
          try {
            return $(e(t));
          } catch {
          }
      }
      return null;
    }
    var re = Array.isArray, H = u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, O = f.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, le = { pending: !1, data: null, method: null, action: null }, st = [], xe = -1;
    function Ze(e) {
      return { current: e };
    }
    function Ge(e) {
      0 > xe || (e.current = st[xe], st[xe] = null, xe--);
    }
    function ke(e, t) {
      xe++, st[xe] = e.current, e.current = t;
    }
    var qt = Ze(null), mr = Ze(null), fn = Ze(null), Gr = Ze(null);
    function Yr(e, t) {
      switch (ke(fn, t), ke(mr, e), ke(qt, null), t.nodeType) {
        case 9:
        case 11:
          e = (e = t.documentElement) && (e = e.namespaceURI) ? tp(e) : 0;
          break;
        default:
          if (e = t.tagName, t = t.namespaceURI) t = tp(t), e = np(t, e);
          else switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
      }
      Ge(qt), ke(qt, e);
    }
    function An() {
      Ge(qt), Ge(mr), Ge(fn);
    }
    function gr(e) {
      var t = e.memoizedState;
      t !== null && (Ba._currentValue = t.memoizedState, ke(Gr, e)), t = qt.current;
      var n = np(t, e.type);
      t !== n && (ke(mr, e), ke(qt, n));
    }
    function Jr(e) {
      mr.current === e && (Ge(qt), Ge(mr)), Gr.current === e && (Ge(Gr), Ba._currentValue = le);
    }
    var en, Fa;
    function E(e) {
      if (en === void 0) try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        en = t && t[1] || "", Fa = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
      return `
` + en + e + Fa;
    }
    var Z = !1;
    function Ce(e, t) {
      if (!e || Z) return "";
      Z = !0;
      var n = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        var r = { DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var R = function() {
                throw Error();
              };
              if (Object.defineProperty(R.prototype, "props", { set: function() {
                throw Error();
              } }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(R, []);
                } catch (V) {
                  var w = V;
                }
                Reflect.construct(e, [], R);
              } else {
                try {
                  R.call();
                } catch (V) {
                  w = V;
                }
                R = !1;
                try {
                  var C = Object.getOwnPropertyDescriptor(e.prototype, "props");
                  Object.defineProperty(e.prototype, "props", { configurable: !0, set: function() {
                    throw Error();
                  } }), R = !0, new e();
                } finally {
                  R && (C !== void 0 ? Object.defineProperty(e.prototype, "props", C) : delete e.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (V) {
                w = V;
              }
              (R = e()) && typeof R.catch == "function" && R.catch(function() {
              });
            }
          } catch (V) {
            if (V && w && typeof V.stack == "string") return [V.stack, w.stack];
          }
          return [null, null];
        } };
        r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var a = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
        a && a.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
        var s = r.DetermineComponentFrameRoot(), i = s[0], p = s[1];
        if (i && p) {
          var g = i.split(`
`), N = p.split(`
`);
          for (a = r = 0; r < g.length && !g[r].includes("DetermineComponentFrameRoot"); ) r++;
          for (; a < N.length && !N[a].includes("DetermineComponentFrameRoot"); ) a++;
          if (r === g.length || a === N.length) for (r = g.length - 1, a = N.length - 1; 1 <= r && 0 <= a && g[r] !== N[a]; ) a--;
          for (; 1 <= r && 0 <= a; r--, a--) if (g[r] !== N[a]) {
            if (r !== 1 || a !== 1) do
              if (r--, a--, 0 > a || g[r] !== N[a]) {
                var T = `
` + g[r].replace(" at new ", " at ");
                return e.displayName && T.includes("<anonymous>") && (T = T.replace("<anonymous>", e.displayName)), T;
              }
            while (1 <= r && 0 <= a);
            break;
          }
        }
      } finally {
        Z = !1, Error.prepareStackTrace = n;
      }
      return (n = e ? e.displayName || e.name : "") ? E(n) : "";
    }
    function fe(e, t) {
      switch (e.tag) {
        case 26:
        case 27:
        case 5:
          return E(e.type);
        case 16:
          return E("Lazy");
        case 13:
          return e.child !== t && t !== null ? E("Suspense Fallback") : E("Suspense");
        case 19:
          return E("SuspenseList");
        case 0:
        case 15:
          return Ce(e.type, !1);
        case 11:
          return Ce(e.type.render, !1);
        case 1:
          return Ce(e.type, !0);
        case 31:
          return E("Activity");
        case 30:
          return E("ViewTransition");
        default:
          return "";
      }
    }
    function We(e) {
      try {
        var t = "", n = null;
        do
          t += fe(e, n), n = e, e = e.return;
        while (e);
        return t;
      } catch (r) {
        return `
Error generating stack: ` + r.message + `
` + r.stack;
      }
    }
    var xt = Object.prototype.hasOwnProperty, Va = o.unstable_scheduleCallback, No = o.unstable_cancelCallback, Qm = o.unstable_shouldYield, Gm = o.unstable_requestPaint, Pt = o.unstable_now, Ym = o.unstable_getCurrentPriorityLevel, Nc = o.unstable_ImmediatePriority, Ac = o.unstable_UserBlockingPriority, Vl = o.unstable_NormalPriority, Jm = o.unstable_LowPriority, Cc = o.unstable_IdlePriority, Km = o.log, Zm = o.unstable_setDisableYieldValue, Oa = null, Rt = null;
    function Wn(e) {
      if (typeof Km == "function" && Zm(e), Rt && typeof Rt.setStrictMode == "function") try {
        Rt.setStrictMode(Oa, e);
      } catch {
      }
    }
    var Bt = Math.clz32 ? Math.clz32 : $m, Xm = Math.log, _m = Math.LN2;
    function $m(e) {
      return e >>>= 0, e === 0 ? 32 : 31 - (Xm(e) / _m | 0) | 0;
    }
    var Ol = 256, Hl = 262144, ql = 4194304;
    function yr(e) {
      var t = e & 42;
      if (t !== 0) return t;
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
          return e & -e;
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return e & 3932160;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return e & 62914560;
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
          return e;
      }
    }
    function Wl(e, t, n) {
      var r = e.pendingLanes;
      if (r === 0) return 0;
      var a = 0, s = e.suspendedLanes, i = e.pingedLanes;
      e = e.warmLanes;
      var p = r & 134217727;
      return p !== 0 ? (r = p & ~s, r !== 0 ? a = yr(r) : (i &= p, i !== 0 ? a = yr(i) : n || (n = p & ~e, n !== 0 && (a = yr(n))))) : (p = r & ~s, p !== 0 ? a = yr(p) : i !== 0 ? a = yr(i) : n || (n = r & ~e, n !== 0 && (a = yr(n)))), a === 0 ? 0 : t !== 0 && t !== a && (t & s) === 0 && (s = a & -a, n = t & -t, s >= n || s === 32 && (n & 4194048) !== 0) ? t : a;
    }
    function Ha(e, t) {
      return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
    }
    function Tc(e, t) {
      (t & 8) !== 0 && (t |= t & 32);
      var n = e.entangledLanes;
      if (n !== 0) for (e = e.entanglements, n &= t; 0 < n; ) {
        var r = 31 - Bt(n), a = 1 << r;
        t |= e[r], n &= ~a;
      }
      return t;
    }
    function e1(e, t) {
      switch (e) {
        case 1:
        case 2:
        case 4:
        case 8:
        case 64:
          return t + 250;
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
          return t + 5e3;
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
    function jc() {
      var e = ql;
      return ql <<= 1, (ql & 62914560) === 0 && (ql = 4194304), e;
    }
    function Ao(e) {
      for (var t = [], n = 0; 31 > n; n++) t.push(e);
      return t;
    }
    function Ql(e, t) {
      e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
    }
    function t1(e, t, n, r, a, s) {
      var i = e.pendingLanes;
      e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
      var p = e.entanglements, g = e.expirationTimes, N = e.hiddenUpdates;
      for (n = i & ~n; 0 < n; ) {
        var T = 31 - Bt(n), R = 1 << T;
        p[T] = 0, g[T] = -1;
        var w = N[T];
        if (w !== null) for (N[T] = null, T = 0; T < w.length; T++) {
          var C = w[T];
          C !== null && (C.lane &= -536870913);
        }
        n &= ~R;
      }
      r !== 0 && Ec(e, r, 0), s !== 0 && a === 0 && e.tag !== 0 && (e.suspendedLanes |= s & ~(i & ~t));
    }
    function Ec(e, t, n) {
      e.pendingLanes |= t, e.suspendedLanes &= ~t;
      var r = 31 - Bt(t);
      e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
    }
    function Mc(e, t) {
      var n = e.entangledLanes |= t;
      for (e = e.entanglements; n; ) {
        var r = 31 - Bt(n), a = 1 << r;
        a & t | e[r] & t && (e[r] |= t), n &= ~a;
      }
    }
    function Lc(e, t) {
      var n = t & -t;
      return n = (n & 42) !== 0 ? 1 : Pc(n), (n & (e.suspendedLanes | t)) !== 0 ? 0 : n;
    }
    function Pc(e) {
      switch (e) {
        case 2:
          e = 1;
          break;
        case 8:
          e = 4;
          break;
        case 32:
          e = 16;
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
          e = 128;
          break;
        case 268435456:
          e = 134217728;
          break;
        default:
          e = 0;
      }
      return e;
    }
    function Co(e) {
      return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
    }
    function Rc() {
      var e = O.p;
      return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Dp(e.type));
    }
    function Bc(e, t) {
      var n = O.p;
      try {
        return O.p = e, t();
      } finally {
        O.p = n;
      }
    }
    var Cn = Math.random().toString(36).slice(2), ft = "__reactFiber$" + Cn, Ct = "__reactProps$" + Cn, qa = "__reactContainer$" + Cn, zc = "__reactEvents$" + Cn, n1 = "__reactListeners$" + Cn, r1 = "__reactHandles$" + Cn, Uc = "__reactResources$" + Cn, Wa = "__reactMarker$" + Cn, Gl = "__reactLoad$" + Cn;
    function Yl(e) {
      delete e[ft], delete e[Ct], delete e[n1], delete e[r1];
    }
    function br(e) {
      var t;
      if (t = e[ft]) return t;
      for (var n = e.parentNode; n; ) {
        if (t = n[qa] || n[ft]) {
          if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = xp(e); e !== null; ) {
            if (n = e[ft]) return n;
            e = xp(e);
          }
          return t;
        }
        e = n, n = e.parentNode;
      }
      return null;
    }
    function Kr(e) {
      if (e = e[ft] || e[qa]) {
        var t = e.tag;
        if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
      }
      return null;
    }
    function Qa(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
      throw Error(c(33));
    }
    function Zr(e) {
      var t = e[Uc];
      return t || (t = e[Uc] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
    }
    function ot(e) {
      e[Wa] = !0;
    }
    function Ic(e) {
      e[Gl] = void 0;
    }
    var Dc = /* @__PURE__ */ new Set(), Fc = {};
    function vr(e, t) {
      Xr(e, t), Xr(e + "Capture", t);
    }
    function Xr(e, t) {
      for (Fc[e] = t, e = 0; e < t.length; e++) Dc.add(t[e]);
    }
    var a1 = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Vc = {}, Oc = {};
    function l1(e) {
      return xt.call(Oc, e) ? !0 : xt.call(Vc, e) ? !1 : a1.test(e) ? Oc[e] = !0 : (Vc[e] = !0, !1);
    }
    var we = !1;
    function Hc() {
      var e = we;
      return we = !1, e;
    }
    function Jl(e, t, n) {
      if (l1(t)) if (n === null) e.removeAttribute(t);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var r = t.toLowerCase().slice(0, 5);
            if (r !== "data-" && r !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, n);
      }
    }
    function Kl(e, t, n) {
      if (n === null) e.removeAttribute(t);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            e.removeAttribute(t);
            return;
        }
        e.setAttribute(t, n);
      }
    }
    function Tn(e, t, n, r) {
      if (r === null) e.removeAttribute(n);
      else {
        switch (typeof r) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            e.removeAttribute(n);
            return;
        }
        e.setAttributeNS(t, n, r);
      }
    }
    function zt(e) {
      switch (typeof e) {
        case "bigint":
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
    function qc(e) {
      var t = e.type;
      return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function s1(e, t, n) {
      var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
      if (!e.hasOwnProperty(t) && typeof r < "u" && typeof r.get == "function" && typeof r.set == "function") {
        var a = r.get, s = r.set;
        return Object.defineProperty(e, t, { configurable: !0, get: function() {
          return a.call(this);
        }, set: function(i) {
          n = "" + i, s.call(this, i);
        } }), Object.defineProperty(e, t, { enumerable: r.enumerable }), { getValue: function() {
          return n;
        }, setValue: function(i) {
          n = "" + i;
        }, stopTracking: function() {
          e._valueTracker = null, delete e[t];
        } };
      }
    }
    function To(e) {
      if (!e._valueTracker) {
        var t = qc(e) ? "checked" : "value";
        e._valueTracker = s1(e, t, "" + e[t]);
      }
    }
    function Wc(e) {
      if (!e) return !1;
      var t = e._valueTracker;
      if (!t) return !0;
      var n = t.getValue(), r = "";
      return e && (r = qc(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
    }
    var o1 = /[\n"\\]/g;
    function tn(e) {
      return e.replace(o1, function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      });
    }
    function jo(e, t, n, r, a, s, i, p) {
      e.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? e.type = i : e.removeAttribute("type"), t != null ? i === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + zt(t)) : e.value !== "" + zt(t) && (e.value = "" + zt(t)) : i !== "submit" && i !== "reset" || e.removeAttribute("value"), t != null ? i === "number" && e.value == t ? Eo(e, zt(e.value)) : Eo(e, zt(t)) : n != null ? Eo(e, zt(n)) : r != null && e.removeAttribute("value"), a == null && s != null && (e.defaultChecked = !!s), a != null && (e.checked = a && typeof a != "function" && typeof a != "symbol"), p != null && typeof p != "function" && typeof p != "symbol" && typeof p != "boolean" ? e.name = "" + zt(p) : e.removeAttribute("name");
    }
    function Qc(e, t, n, r, a, s, i, p) {
      if (s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (e.type = s), t != null || n != null) {
        if (!(s !== "submit" && s !== "reset" || t != null)) {
          To(e);
          return;
        }
        n = n != null ? "" + zt(n) : "", t = t != null ? "" + zt(t) : n, p || t === e.value || (e.value = t), e.defaultValue = t;
      }
      r = r ?? a, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = p ? e.checked : !!r, e.defaultChecked = !!r, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (e.name = i), To(e);
    }
    function Eo(e, t) {
      e.defaultValue !== "" + t && (e.defaultValue = "" + t);
    }
    function _r(e, t, n, r) {
      if (e = e.options, t) {
        t = {};
        for (var a = 0; a < n.length; a++) t["$" + n[a]] = !0;
        for (n = 0; n < e.length; n++) a = t.hasOwnProperty("$" + e[n].value), e[n].selected !== a && (e[n].selected = a), a && r && (e[n].defaultSelected = !0);
      } else {
        for (n = "" + zt(n), t = null, a = 0; a < e.length; a++) {
          if (e[a].value === n) {
            e[a].selected = !0, r && (e[a].defaultSelected = !0);
            return;
          }
          t !== null || e[a].disabled || (t = e[a]);
        }
        t !== null && (t.selected = !0);
      }
    }
    function Gc(e, t, n) {
      if (t != null && (t = "" + zt(t), t !== e.value && (e.value = t), n == null)) {
        e.defaultValue !== t && (e.defaultValue = t);
        return;
      }
      e.defaultValue = n != null ? "" + zt(n) : "";
    }
    function Yc(e, t, n, r) {
      if (t == null) {
        if (r != null) {
          if (n != null) throw Error(c(92));
          if (re(r)) {
            if (1 < r.length) throw Error(c(93));
            r = r[0];
          }
          n = r;
        }
        n ??= "", t = n;
      }
      n = zt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), To(e);
    }
    function $r(e, t) {
      if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
          n.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }
    var i1 = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
    function Jc(e, t, n) {
      var r = t.indexOf("--") === 0;
      n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || i1.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
    }
    function Kc(e, t, n) {
      if (t != null && typeof t != "object") throw Error(c(62));
      if (e = e.style, n != null) {
        for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "", we = !0);
        for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && (Jc(e, a, r), we = !0);
      } else for (var s in t) t.hasOwnProperty(s) && Jc(e, s, t[s]);
    }
    function Mo(e) {
      if (e.indexOf("-") === -1) return !1;
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
    var u1 = /* @__PURE__ */ new Map([["acceptCharset", "accept-charset"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"], ["crossOrigin", "crossorigin"], ["accentHeight", "accent-height"], ["alignmentBaseline", "alignment-baseline"], ["arabicForm", "arabic-form"], ["baselineShift", "baseline-shift"], ["capHeight", "cap-height"], ["clipPath", "clip-path"], ["clipRule", "clip-rule"], ["colorInterpolation", "color-interpolation"], ["colorInterpolationFilters", "color-interpolation-filters"], ["colorProfile", "color-profile"], ["colorRendering", "color-rendering"], ["dominantBaseline", "dominant-baseline"], ["enableBackground", "enable-background"], ["fillOpacity", "fill-opacity"], ["fillRule", "fill-rule"], ["floodColor", "flood-color"], ["floodOpacity", "flood-opacity"], ["fontFamily", "font-family"], ["fontSize", "font-size"], ["fontSizeAdjust", "font-size-adjust"], ["fontStretch", "font-stretch"], ["fontStyle", "font-style"], ["fontVariant", "font-variant"], ["fontWeight", "font-weight"], ["glyphName", "glyph-name"], ["glyphOrientationHorizontal", "glyph-orientation-horizontal"], ["glyphOrientationVertical", "glyph-orientation-vertical"], ["horizAdvX", "horiz-adv-x"], ["horizOriginX", "horiz-origin-x"], ["imageRendering", "image-rendering"], ["letterSpacing", "letter-spacing"], ["lightingColor", "lighting-color"], ["markerEnd", "marker-end"], ["markerMid", "marker-mid"], ["markerStart", "marker-start"], ["maskType", "mask-type"], ["overlinePosition", "overline-position"], ["overlineThickness", "overline-thickness"], ["paintOrder", "paint-order"], ["panose-1", "panose-1"], ["pointerEvents", "pointer-events"], ["renderingIntent", "rendering-intent"], ["shapeRendering", "shape-rendering"], ["stopColor", "stop-color"], ["stopOpacity", "stop-opacity"], ["strikethroughPosition", "strikethrough-position"], ["strikethroughThickness", "strikethrough-thickness"], ["strokeDasharray", "stroke-dasharray"], ["strokeDashoffset", "stroke-dashoffset"], ["strokeLinecap", "stroke-linecap"], ["strokeLinejoin", "stroke-linejoin"], ["strokeMiterlimit", "stroke-miterlimit"], ["strokeOpacity", "stroke-opacity"], ["strokeWidth", "stroke-width"], ["textAnchor", "text-anchor"], ["textDecoration", "text-decoration"], ["textRendering", "text-rendering"], ["transformOrigin", "transform-origin"], ["underlinePosition", "underline-position"], ["underlineThickness", "underline-thickness"], ["unicodeBidi", "unicode-bidi"], ["unicodeRange", "unicode-range"], ["unitsPerEm", "units-per-em"], ["vAlphabetic", "v-alphabetic"], ["vHanging", "v-hanging"], ["vIdeographic", "v-ideographic"], ["vMathematical", "v-mathematical"], ["vectorEffect", "vector-effect"], ["vertAdvY", "vert-adv-y"], ["vertOriginX", "vert-origin-x"], ["vertOriginY", "vert-origin-y"], ["wordSpacing", "word-spacing"], ["writingMode", "writing-mode"], ["xmlnsXlink", "xmlns:xlink"], ["xHeight", "x-height"]]), c1 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function Zl(e) {
      return c1.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
    }
    function pn() {
    }
    var Lo = null;
    function Po(e) {
      return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
    }
    var ea = null, ta = null;
    function Zc(e) {
      var t = Kr(e);
      if (t && (e = t.stateNode)) {
        var n = e[Ct] || null;
        e: switch (e = t.stateNode, t.type) {
          case "input":
            if (jo(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
              for (n = e; n.parentNode; ) n = n.parentNode;
              for (n = n.querySelectorAll('input[name="' + tn("" + t) + '"][type="radio"]'), t = 0; t < n.length; t++) {
                var r = n[t];
                if (r !== e && r.form === e.form) {
                  var a = r[Ct] || null;
                  if (!a) throw Error(c(90));
                  jo(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
                }
              }
              for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Wc(r);
            }
            break e;
          case "textarea":
            Gc(e, n.value, n.defaultValue);
            break e;
          case "select":
            t = n.value, t != null && _r(e, !!n.multiple, t, !1);
        }
      }
    }
    var Ro = !1;
    function Xc(e, t, n) {
      if (Ro) return e(t, n);
      Ro = !0;
      try {
        return e(t);
      } finally {
        if (Ro = !1, (ea !== null || ta !== null) && (Ks(), ea && (t = ea, e = ta, ta = ea = null, Zc(t), e))) for (t = 0; t < e.length; t++) Zc(e[t]);
      }
    }
    function Ga(e, t) {
      var n = e.stateNode;
      if (n === null) return null;
      var r = n[Ct] || null;
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
          (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
          break e;
        default:
          e = !1;
      }
      if (e) return null;
      if (n && typeof n != "function") throw Error(c(231, t, typeof n));
      return n;
    }
    var jn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Bo = !1;
    if (jn) try {
      var Ya = {};
      Object.defineProperty(Ya, "passive", { get: function() {
        Bo = !0;
      } }), window.addEventListener("test", Ya, Ya), window.removeEventListener("test", Ya, Ya);
    } catch {
      Bo = !1;
    }
    var Qn = null, zo = null, Xl = null;
    function _c() {
      if (Xl) return Xl;
      var e, t = zo, n = t.length, r, a = "value" in Qn ? Qn.value : Qn.textContent, s = a.length;
      for (e = 0; e < n && t[e] === a[e]; e++) ;
      var i = n - e;
      for (r = 1; r <= i && t[n - r] === a[s - r]; r++) ;
      return Xl = a.slice(e, 1 < r ? 1 - r : void 0);
    }
    function _l(e) {
      var t = e.keyCode;
      return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
    }
    function $l() {
      return !0;
    }
    function $c() {
      return !1;
    }
    function kt(e) {
      function t(n, r, a, s, i) {
        this._reactName = n, this._targetInst = a, this.type = r, this.nativeEvent = s, this.target = i, this.currentTarget = null;
        for (var p in e) e.hasOwnProperty(p) && (n = e[p], this[p] = n ? n(s) : s[p]);
        return this.isDefaultPrevented = (s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1) ? $l : $c, this.isPropagationStopped = $c, this;
      }
      return se(t.prototype, { preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = $l);
      }, stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = $l);
      }, persist: function() {
      }, isPersistent: $l }), t;
    }
    var Gn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
      return e.timeStamp || Date.now();
    }, defaultPrevented: 0, isTrusted: 0 }, es = kt(Gn), Ja = se({}, Gn, { view: 0, detail: 0 }), d1 = kt(Ja), Uo, Io, Ka, ts = se({}, Ja, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Fo, button: 0, buttons: 0, relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    }, movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Ka && (Ka && e.type === "mousemove" ? (Uo = e.screenX - Ka.screenX, Io = e.screenY - Ka.screenY) : Io = Uo = 0, Ka = e), Uo);
    }, movementY: function(e) {
      return "movementY" in e ? e.movementY : Io;
    } }), ed = kt(ts), f1 = kt(se({}, ts, { dataTransfer: 0 })), Do = kt(se({}, Ja, { relatedTarget: 0 })), p1 = kt(se({}, Gn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })), h1 = kt(se({}, Gn, { clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    } })), td = kt(se({}, Gn, { data: 0 })), m1 = { Esc: "Escape", Spacebar: " ", Left: "ArrowLeft", Up: "ArrowUp", Right: "ArrowRight", Down: "ArrowDown", Del: "Delete", Win: "OS", Menu: "ContextMenu", Apps: "ContextMenu", Scroll: "ScrollLock", MozPrintableKey: "Unidentified" }, g1 = { 8: "Backspace", 9: "Tab", 12: "Clear", 13: "Enter", 16: "Shift", 17: "Control", 18: "Alt", 19: "Pause", 20: "CapsLock", 27: "Escape", 32: " ", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "ArrowLeft", 38: "ArrowUp", 39: "ArrowRight", 40: "ArrowDown", 45: "Insert", 46: "Delete", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "NumLock", 145: "ScrollLock", 224: "Meta" }, y1 = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
    function b1(e) {
      var t = this.nativeEvent;
      return t.getModifierState ? t.getModifierState(e) : (e = y1[e]) ? !!t[e] : !1;
    }
    function Fo() {
      return b1;
    }
    var v1 = kt(se({}, Ja, { key: function(e) {
      if (e.key) {
        var t = m1[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = _l(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? g1[e.keyCode] || "Unidentified" : "";
    }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Fo, charCode: function(e) {
      return e.type === "keypress" ? _l(e) : 0;
    }, keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }, which: function(e) {
      return e.type === "keypress" ? _l(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    } })), nd = kt(se({}, ts, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 })), x1 = kt(se({}, Gn, { submitter: 0 })), k1 = kt(se({}, Ja, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Fo })), w1 = kt(se({}, Gn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })), S1 = kt(se({}, ts, { deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    }, deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    }, deltaZ: 0, deltaMode: 0 })), N1 = kt(se({}, Gn, { newState: 0, oldState: 0, source: 0 })), A1 = [9, 13, 27, 32], Vo = jn && "CompositionEvent" in window, Za = null;
    jn && "documentMode" in document && (Za = document.documentMode);
    var C1 = jn && "TextEvent" in window && !Za, rd = jn && (!Vo || Za && 8 < Za && 11 >= Za), ad = " ", ld = !1;
    function sd(e, t) {
      switch (e) {
        case "keyup":
          return A1.indexOf(t.keyCode) !== -1;
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
    function od(e) {
      return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
    }
    var na = !1;
    function T1(e, t) {
      switch (e) {
        case "compositionend":
          return od(t);
        case "keypress":
          return t.which !== 32 ? null : (ld = !0, ad);
        case "textInput":
          return e = t.data, e === ad && ld ? null : e;
        default:
          return null;
      }
    }
    function j1(e, t) {
      if (na) return e === "compositionend" || !Vo && sd(e, t) ? (e = _c(), Xl = zo = Qn = null, na = !1, e) : null;
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
            if (t.char && 1 < t.char.length) return t.char;
            if (t.which) return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return rd && t.locale !== "ko" ? null : t.data;
        default:
          return null;
      }
    }
    var E1 = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
    function id(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!E1[e.type] : t === "textarea";
    }
    function ud(e, t, n, r) {
      ea ? ta ? ta.push(r) : ta = [r] : ea = r, t = to(t, "onChange"), 0 < t.length && (n = new es("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
    }
    var Xa = null, _a = null;
    function M1(e) {
      J0(e, 0);
    }
    function ns(e) {
      if (Wc(Qa(e))) return e;
    }
    function cd(e, t) {
      if (e === "change") return t;
    }
    var dd = !1;
    if (jn) {
      var Oo;
      if (jn) {
        var Ho = "oninput" in document;
        if (!Ho) {
          var fd = document.createElement("div");
          fd.setAttribute("oninput", "return;"), Ho = typeof fd.oninput == "function";
        }
        Oo = Ho;
      } else Oo = !1;
      dd = Oo && (!document.documentMode || 9 < document.documentMode);
    }
    function pd() {
      Xa && (Xa.detachEvent("onpropertychange", hd), _a = Xa = null);
    }
    function hd(e) {
      if (e.propertyName === "value" && ns(_a)) {
        var t = [];
        ud(t, _a, e, Po(e)), Xc(M1, t);
      }
    }
    function L1(e, t, n) {
      e === "focusin" ? (pd(), Xa = t, _a = n, Xa.attachEvent("onpropertychange", hd)) : e === "focusout" && pd();
    }
    function P1(e) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown") return ns(_a);
    }
    function R1(e, t) {
      if (e === "click") return ns(t);
    }
    function B1(e, t) {
      if (e === "input" || e === "change") return ns(t);
    }
    function z1(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var Ut = typeof Object.is == "function" ? Object.is : z1;
    function $a(e, t) {
      if (Ut(e, t)) return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
      var n = Object.keys(e), r = Object.keys(t);
      if (n.length !== r.length) return !1;
      for (r = 0; r < n.length; r++) {
        var a = n[r];
        if (!xt.call(t, a) || !Ut(e[a], t[a])) return !1;
      }
      return !0;
    }
    function qo(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    function md(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function gd(e, t) {
      var n = md(e);
      e = 0;
      for (var r; n; ) {
        if (n.nodeType === 3) {
          if (r = e + n.textContent.length, e <= t && r >= t) return { node: n, offset: t - e };
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
        n = md(n);
      }
    }
    function yd(e, t) {
      return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? yd(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
    }
    function bd(e) {
      e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
      for (var t = qo(e.document); t instanceof e.HTMLIFrameElement; ) {
        try {
          var n = typeof t.contentWindow.location.href == "string";
        } catch {
          n = !1;
        }
        if (n) e = t.contentWindow;
        else break;
        t = qo(e.document);
      }
      return t;
    }
    function Wo(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    var U1 = jn && "documentMode" in document && 11 >= document.documentMode, ra = null, Qo = null, el = null, Go = !1;
    function vd(e, t, n) {
      var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
      Go || ra == null || ra !== qo(r) || (r = ra, "selectionStart" in r && Wo(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), el && $a(el, r) || (el = r, r = to(Qo, "onSelect"), 0 < r.length && (t = new es("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = ra)));
    }
    function xr(e, t) {
      var n = {};
      return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
    }
    var aa = { animationend: xr("Animation", "AnimationEnd"), animationiteration: xr("Animation", "AnimationIteration"), animationstart: xr("Animation", "AnimationStart"), transitionrun: xr("Transition", "TransitionRun"), transitionstart: xr("Transition", "TransitionStart"), transitioncancel: xr("Transition", "TransitionCancel"), transitionend: xr("Transition", "TransitionEnd") }, Yo = {}, xd = {};
    jn && (xd = document.createElement("div").style, "AnimationEvent" in window || (delete aa.animationend.animation, delete aa.animationiteration.animation, delete aa.animationstart.animation), "TransitionEvent" in window || delete aa.transitionend.transition);
    function kr(e) {
      if (Yo[e]) return Yo[e];
      if (!aa[e]) return e;
      var t = aa[e], n;
      for (n in t) if (t.hasOwnProperty(n) && n in xd) return Yo[e] = t[n];
      return e;
    }
    var kd = kr("animationend"), wd = kr("animationiteration"), Sd = kr("animationstart"), I1 = kr("transitionrun"), D1 = kr("transitionstart"), F1 = kr("transitioncancel"), Nd = kr("transitionend"), Ad = /* @__PURE__ */ new Map(), Jo = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
    Jo.push("scrollEnd");
    function nn(e, t) {
      Ad.set(e, t), vr(t, [e]);
    }
    var V1 = 0;
    function En(e, t) {
      if (e.name != null && e.name !== "auto") return e.name;
      if (t.autoName !== null) return t.autoName;
      e = sn.identifierPrefix;
      var n = V1++;
      return e = "_" + e + "t_" + n.toString(32) + "_", t.autoName = e;
    }
    function Cd(e) {
      if (e == null || typeof e == "string") return e;
      var t = null, n = Na;
      if (n !== null) for (var r = 0; r < n.length; r++) {
        var a = e[n[r]];
        if (a != null) {
          if (a === "none") return "none";
          t = t == null ? a : t + (" " + a);
        }
      }
      return t ?? e.default;
    }
    function Mn(e, t) {
      return e = Cd(e), t = Cd(t), t == null ? e === "auto" ? null : e : t === "auto" ? null : t;
    }
    var rs = typeof reportError == "function" ? reportError : function(e) {
      if (typeof window == "object" && typeof window.ErrorEvent == "function") {
        var t = new window.ErrorEvent("error", { bubbles: !0, cancelable: !0, message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e), error: e });
        if (!window.dispatchEvent(t)) return;
      } else if (typeof process == "object" && typeof process.emit == "function") {
        process.emit("uncaughtException", e);
        return;
      }
      console.error(e);
    }, Wt = [], la = 0, Ko = 0;
    function as() {
      for (var e = la, t = Ko = la = 0; t < e; ) {
        var n = Wt[t];
        Wt[t++] = null;
        var r = Wt[t];
        Wt[t++] = null;
        var a = Wt[t];
        Wt[t++] = null;
        var s = Wt[t];
        if (Wt[t++] = null, r !== null && a !== null) {
          var i = r.pending;
          i === null ? a.next = a : (a.next = i.next, i.next = a), r.pending = a;
        }
        s !== 0 && Td(n, a, s);
      }
    }
    function ls(e, t, n, r) {
      Wt[la++] = e, Wt[la++] = t, Wt[la++] = n, Wt[la++] = r, Ko |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
    }
    function Zo(e, t, n, r) {
      return ls(e, t, n, r), ss(e);
    }
    function wr(e, t) {
      return ls(e, null, null, t), ss(e);
    }
    function Td(e, t, n) {
      e.lanes |= n;
      var r = e.alternate;
      r !== null && (r.lanes |= n);
      for (var a = !1, s = e.return; s !== null; ) s.childLanes |= n, r = s.alternate, r !== null && (r.childLanes |= n), s.tag === 22 && (e = s.stateNode, e === null || e._visibility & 1 || (a = !0)), e = s, s = s.return;
      return e.tag === 3 ? (s = e.stateNode, a && t !== null && (a = 31 - Bt(n), e = s.hiddenUpdates, r = e[a], r === null ? e[a] = [t] : r.push(t), t.lane = n | 536870912), s) : null;
    }
    function ss(e) {
      if (50 < wl) throw wl = 0, Js = null, Error(c(185));
      for (var t = e.return; t !== null; ) e = t, t = e.return;
      return e.tag === 3 ? e.stateNode : null;
    }
    var sa = {};
    function O1(e, t, n, r) {
      this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
    }
    function Tt(e, t, n, r) {
      return new O1(e, t, n, r);
    }
    function Xo(e) {
      return e = e.prototype, !(!e || !e.isReactComponent);
    }
    function Ln(e, t) {
      var n = e.alternate;
      return n === null ? (n = Tt(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 1206910976, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
    }
    function jd(e, t) {
      e.flags &= 1206910978;
      var n = e.alternate;
      return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }), e;
    }
    function os(e, t, n, r, a, s) {
      var i = 0;
      if (r = e, typeof r == "function") Xo(r) && (i = 1);
      else if (typeof r == "string") i = gy(e, n, qt.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
      else e: switch (r) {
        case Pe:
          return e = Tt(31, n, t, a), e.elementType = Pe, e.lanes = s, e;
        case Fe:
          return Sr(n.children, a, s, t);
        case nt:
          i = 8, a |= 24;
          break;
        case vt:
          return e = Tt(12, n, t, a | 2), e.elementType = vt, e.lanes = s, e;
        case M:
          return e = Tt(13, n, t, a), e.elementType = M, e.lanes = s, e;
        case _:
          return e = Tt(19, n, t, a), e.elementType = _, e.lanes = s, e;
        case Ve:
        case b:
          return e = a | 32, e = Tt(30, n, t, e), e.elementType = b, e.lanes = s, e.stateNode = { autoName: null, paired: null, clones: null, ref: null }, e;
        default:
          if (typeof r == "object" && r !== null) switch (r.$$typeof) {
            case D:
              i = 10;
              break e;
            case Ne:
              i = 9;
              break e;
            case ne:
              i = 11;
              break e;
            case X:
              i = 14;
              break e;
            case je:
              i = 16, r = null;
              break e;
          }
          i = 29, n = Error(c(130, e === null ? "null" : typeof e, "")), r = null;
      }
      return t = Tt(i, n, t, a), t.elementType = e, t.type = r, t.lanes = s, t;
    }
    function Sr(e, t, n, r) {
      return e = Tt(7, e, r, t), e.lanes = n, e;
    }
    function _o(e, t, n) {
      return e = Tt(6, e, null, t), e.lanes = n, e;
    }
    function Ed(e) {
      var t = Tt(18, null, null, 0);
      return t.stateNode = e, t;
    }
    function $o(e, t, n) {
      return t = Tt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
    }
    var Md = /* @__PURE__ */ new WeakMap();
    function Qt(e, t) {
      if (typeof e == "object" && e !== null) {
        var n = Md.get(e);
        return n !== void 0 ? n : (t = { value: e, source: t, stack: We(t) }, Md.set(e, t), t);
      }
      return { value: e, source: t, stack: We(t) };
    }
    var oa = [], ia = 0, is = null, tl = 0, Gt = [], Yt = 0, Yn = null, hn = 1, mn = "";
    function Pn(e, t) {
      oa[ia++] = tl, oa[ia++] = is, is = e, tl = t;
    }
    function Ld(e, t, n) {
      Gt[Yt++] = hn, Gt[Yt++] = mn, Gt[Yt++] = Yn, Yn = e;
      var r = hn;
      e = mn;
      var a = 32 - Bt(r) - 1;
      r &= ~(1 << a), n += 1;
      var s = 32 - Bt(t) + a;
      if (30 < s) {
        var i = a - a % 5;
        s = (r & (1 << i) - 1).toString(32), r >>= i, a -= i, hn = 1 << 32 - Bt(t) + a | n << a | r, mn = s + e;
      } else hn = 1 << s | n << a | r, mn = e;
    }
    function us(e) {
      e.return !== null && (Pn(e, 1), Ld(e, 1, 0));
    }
    function ei(e) {
      for (; e === is; ) is = oa[--ia], oa[ia] = null, tl = oa[--ia], oa[ia] = null;
      for (; e === Yn; ) Yn = Gt[--Yt], Gt[Yt] = null, mn = Gt[--Yt], Gt[Yt] = null, hn = Gt[--Yt], Gt[Yt] = null;
    }
    function Pd(e, t) {
      Gt[Yt++] = hn, Gt[Yt++] = mn, Gt[Yt++] = Yn, hn = t.id, mn = t.overflow, Yn = e;
    }
    var it = null, Ie = null, pe = !1, Jn = null, Jt = !1, ti = Error(c(519));
    function Kn(e) {
      throw nl(Qt(Error(c(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), ti;
    }
    function Rd(e) {
      var t = e.stateNode, n = e.type, r = e.memoizedProps;
      switch (t[ft] = e, t[Ct] = r, n) {
        case "dialog":
          ge("cancel", t), ge("close", t);
          break;
        case "iframe":
        case "object":
        case "embed":
          ge("load", t);
          break;
        case "video":
        case "audio":
          for (n = 0; n < Nl.length; n++) ge(Nl[n], t);
          break;
        case "source":
          ge("error", t);
          break;
        case "img":
        case "image":
        case "link":
          ge("error", t), ge("load", t);
          break;
        case "details":
          ge("toggle", t);
          break;
        case "input":
          ge("invalid", t), Qc(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
          break;
        case "select":
          ge("invalid", t);
          break;
        case "textarea":
          ge("invalid", t), Yc(t, r.value, r.defaultValue, r.children);
      }
      n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || r.suppressHydrationWarning === !0 || $0(t.textContent, n) ? (r.popover != null && (ge("beforetoggle", t), ge("toggle", t)), r.onScroll != null && ge("scroll", t), r.onScrollEnd != null && ge("scrollend", t), r.onClick != null && (t.onclick = pn), t = !0) : t = !1, t || Kn(e, !0);
    }
    function cs(e) {
      for (it = e.return; it; ) switch (it.tag) {
        case 5:
        case 31:
        case 13:
          Jt = !1;
          return;
        case 27:
        case 3:
          Jt = !0;
          return;
        default:
          it = it.return;
      }
    }
    function ua(e) {
      if (e !== it) return !1;
      if (!pe) return cs(e), pe = !0, !1;
      var t = e.tag, n;
      if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Lu(e.type, e.memoizedProps)), n = !n), n && Ie && Kn(e), cs(e), t === 13) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(317));
        Ie = vp(e);
      } else if (t === 31) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(317));
        Ie = vp(e);
      } else t === 27 ? (t = Ie, ur(e.type) ? (e = Vu, Vu = null, Ie = e) : Ie = t) : Ie = it ? Xt(e.stateNode.nextSibling) : null;
      return !0;
    }
    function Nr() {
      Ie = it = null, pe = !1;
    }
    function ni() {
      var e = Jn;
      return e !== null && (Mt === null ? Mt = e : Mt.push.apply(Mt, e), Jn = null), e;
    }
    function nl(e) {
      Jn === null ? Jn = [e] : Jn.push(e);
    }
    var ri = Ze(null), Ar = null, Rn = null;
    function Zn(e, t, n) {
      ke(ri, t._currentValue), t._currentValue = n;
    }
    function Bn(e) {
      e._currentValue = ri.current, Ge(ri);
    }
    function ds(e, t, n) {
      for (; e !== null; ) {
        var r = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
        e = e.return;
      }
    }
    function ai(e, t, n, r) {
      var a = e.child;
      for (a !== null && (a.return = e); a !== null; ) {
        var s = a.dependencies;
        if (s !== null) {
          var i = a.child;
          s = s.firstContext;
          e: for (; s !== null; ) {
            var p = s;
            s = a;
            for (var g = 0; g < t.length; g++) if (p.context === t[g]) {
              s.lanes |= n, p = s.alternate, p !== null && (p.lanes |= n), ds(s.return, n, e), r || (i = null);
              break e;
            }
            s = p.next;
          }
        } else if (a.tag === 18) {
          if (i = a.return, i === null) throw Error(c(341));
          i.lanes |= n, s = i.alternate, s !== null && (s.lanes |= n), ds(i, n, e), i = null;
        } else a.tag === 13 && a.memoizedState !== null && a.memoizedState.dehydrated === null ? (a.lanes |= n, i = a.alternate, i !== null && (i.lanes |= n), ds(a.return, n, e), i = a.child, i = i !== null ? i.sibling : null) : i = a.child;
        if (i !== null) i.return = a;
        else for (i = a; i !== null; ) {
          if (i === e) {
            i = null;
            break;
          }
          if (a = i.sibling, a !== null) {
            a.return = i.return, i = a;
            break;
          }
          i = i.return;
        }
        a = i;
      }
    }
    function Cr(e, t, n, r) {
      e = null;
      for (var a = t, s = !1; a !== null; ) {
        if (!s) {
          if ((a.flags & 524288) !== 0) s = !0;
          else if ((a.flags & 262144) !== 0) break;
        }
        if (a.tag === 10) {
          var i = a.alternate;
          if (i === null) throw Error(c(387));
          if (i = i.memoizedProps, i !== null) {
            var p = a.type;
            Ut(a.pendingProps.value, i.value) || (e !== null ? e.push(p) : e = [p]);
          }
        } else if (a === Gr.current) {
          if (i = a.alternate, i === null) throw Error(c(387));
          i.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e !== null ? e.push(Ba) : e = [Ba]);
        }
        a = a.return;
      }
      return e !== null && ai(t, e, n, r), t.flags |= 262144, e !== null;
    }
    function fs(e) {
      for (e = e.firstContext; e !== null; ) {
        if (!Ut(e.context._currentValue, e.memoizedValue)) return !0;
        e = e.next;
      }
      return !1;
    }
    function Tr(e) {
      Ar = e, Rn = null, e = e.dependencies, e !== null && (e.firstContext = null);
    }
    function pt(e) {
      return Bd(Ar, e);
    }
    function ps(e, t) {
      return Ar === null && Tr(e), Bd(e, t);
    }
    function Bd(e, t) {
      var n = t._currentValue;
      if (t = { context: t, memoizedValue: n, next: null }, Rn === null) {
        if (e === null) throw Error(c(308));
        Rn = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
      } else Rn = Rn.next = t;
      return n;
    }
    var H1 = typeof AbortController < "u" ? AbortController : function() {
      var e = [], t = this.signal = { aborted: !1, addEventListener: function(n, r) {
        e.push(r);
      } };
      this.abort = function() {
        t.aborted = !0, e.forEach(function(n) {
          return n();
        });
      };
    }, q1 = o.unstable_scheduleCallback, W1 = o.unstable_NormalPriority, Xe = { $$typeof: D, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 };
    function li() {
      return { controller: new H1(), data: /* @__PURE__ */ new Map(), refCount: 0 };
    }
    function rl(e) {
      e.refCount--, e.refCount === 0 && q1(W1, function() {
        e.controller.abort();
      });
    }
    function zd(e, t) {
      if ((e.pendingLanes & 4194048) !== 0) {
        var n = e.transitionTypes;
        for (n === null && (n = e.transitionTypes = []), e = 0; e < t.length; e++) {
          var r = t[e];
          n.indexOf(r) === -1 && n.push(r);
        }
      }
    }
    var al = null;
    function Q1(e) {
      var t = e.transitionTypes;
      return e.transitionTypes = null, t;
    }
    var ll = null, si = 0, jr = 0, ca = null;
    function G1(e, t) {
      if (ll === null) {
        var n = ll = [];
        si = 0, jr = Su(), ca = { status: "pending", value: void 0, then: function(r) {
          n.push(r);
        } };
      }
      return si++, t.then(Ud, Ud), t;
    }
    function Ud() {
      if (--si === 0 && (al = null, ll !== null)) {
        ca !== null && (ca.status = "fulfilled");
        var e = ll;
        ll = null, jr = 0, ca = null;
        for (var t = 0; t < e.length; t++) (0, e[t])();
      }
    }
    function Y1(e, t) {
      var n = [], r = { status: "pending", value: null, reason: null, then: function(a) {
        n.push(a);
      } };
      return e.then(function() {
        r.status = "fulfilled", r.value = t;
        for (var a = 0; a < n.length; a++) (0, n[a])(t);
      }, function(a) {
        for (r.status = "rejected", r.reason = a, a = 0; a < n.length; a++) (0, n[a])(void 0);
      }), r;
    }
    var Id = H.S;
    H.S = function(e, t) {
      if (T0 = Pt(), typeof t == "object" && t !== null && typeof t.then == "function" && G1(e, t), al !== null) for (var n = ja; n !== null; ) zd(n, al), n = n.next;
      if (n = e.types, n !== null) {
        for (var r = ja; r !== null; ) zd(r, n), r = r.next;
        if (jr !== 0) {
          r = al, r === null && (r = al = []);
          for (var a = 0; a < n.length; a++) {
            var s = n[a];
            r.indexOf(s) === -1 && r.push(s);
          }
        }
      }
      Id !== null && Id(e, t);
    };
    var Er = Ze(null);
    function oi() {
      var e = Er.current;
      return e !== null ? e : Be.pooledCache;
    }
    function hs(e, t) {
      t === null ? ke(Er, Er.current) : ke(Er, t.pool);
    }
    function Dd() {
      var e = oi();
      return e === null ? null : { parent: Xe._currentValue, pool: e };
    }
    var da = Error(c(460)), ii = Error(c(474)), ms = Error(c(542)), gs = { then: function() {
    } };
    function Fd(e) {
      return e = e.status, e === "fulfilled" || e === "rejected";
    }
    function Vd(e, t, n) {
      switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(pn, pn), t = n), t.status) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw e = t.reason, Hd(e), e === void 0 && !("reason" in t) ? Error(c(600)) : e;
        default:
          if (typeof t.status == "string") t.then(pn, pn);
          else {
            if (e = Be, e !== null && 100 < e.shellSuspendCounter) throw Error(c(482));
            e = t, e.status = "pending", e.then(function(r) {
              if (t.status === "pending") {
                var a = t;
                a.status = "fulfilled", a.value = r;
              }
            }, function(r) {
              if (t.status === "pending") {
                var a = t;
                a.status = "rejected", a.reason = r;
              }
            });
          }
          switch (t.status) {
            case "fulfilled":
              return t.value;
            case "rejected":
              throw e = t.reason, Hd(e), e;
          }
          throw Lr = t, da;
      }
    }
    function Mr(e) {
      try {
        var t = e._init;
        return t(e._payload);
      } catch (n) {
        throw n !== null && typeof n == "object" && typeof n.then == "function" ? (Lr = n, da) : n;
      }
    }
    var Lr = null;
    function Od() {
      if (Lr === null) throw Error(c(459));
      var e = Lr;
      return Lr = null, e;
    }
    function Hd(e) {
      if (e === da || e === ms) throw Error(c(483));
    }
    var fa = null, sl = 0;
    function ys(e) {
      var t = sl;
      return sl += 1, fa === null && (fa = []), Vd(fa, e, t);
    }
    function Xn(e, t) {
      t = t.props.ref, e.ref = t !== void 0 ? t : null;
    }
    function bs(e, t) {
      throw t.$$typeof === de ? Error(c(525)) : (e = Object.prototype.toString.call(t), Error(c(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
    }
    function qd(e) {
      function t(S, v) {
        if (e) {
          var A = S.deletions;
          A === null ? (S.deletions = [v], S.flags |= 16) : A.push(v);
        }
      }
      function n(S, v) {
        if (!e) return null;
        for (; v !== null; ) t(S, v), v = v.sibling;
        return null;
      }
      function r(S) {
        for (var v = /* @__PURE__ */ new Map(); S !== null; ) S.key === null ? v.set(S.index, S) : v.set(S.key, S), S = S.sibling;
        return v;
      }
      function a(S, v) {
        return S = Ln(S, v), S.index = 0, S.sibling = null, S;
      }
      function s(S, v, A) {
        return S.index = A, e ? (A = S.alternate, A !== null ? (A = A.index, A < v ? (S.flags |= 2, v) : A) : (S.flags |= 134217730, v)) : (S.flags |= 1048576, v);
      }
      function i(S) {
        return e && S.alternate === null && (S.flags |= 134217730), S;
      }
      function p(S, v, A, L) {
        return v === null || v.tag !== 6 ? (v = _o(A, S.mode, L), v.return = S, v) : (v = a(v, A), v.return = S, v);
      }
      function g(S, v, A, L) {
        var W = A.type;
        return W === Fe ? (S = T(S, v, A.props.children, L, A.key), Xn(S, A), S) : v !== null && (v.elementType === W || typeof W == "object" && W !== null && W.$$typeof === je && Mr(W) === v.type) ? (v = a(v, A.props), Xn(v, A), v.return = S, v) : (v = os(A.type, A.key, A.props, null, S.mode, L), Xn(v, A), v.return = S, v);
      }
      function N(S, v, A, L) {
        return v === null || v.tag !== 4 || v.stateNode.containerInfo !== A.containerInfo || v.stateNode.implementation !== A.implementation ? (v = $o(A, S.mode, L), v.return = S, v) : (v = a(v, A.children || []), v.return = S, v);
      }
      function T(S, v, A, L, W) {
        return v === null || v.tag !== 7 ? (v = Sr(A, S.mode, L, W), v.return = S, v) : (v = a(v, A), v.return = S, v);
      }
      function R(S, v, A) {
        if (typeof v == "string" && v !== "" || typeof v == "number" || typeof v == "bigint") return v = _o("" + v, S.mode, A), v.return = S, v;
        if (typeof v == "object" && v !== null) {
          switch (v.$$typeof) {
            case he:
              return A = os(v.type, v.key, v.props, null, S.mode, A), Xn(A, v), A.return = S, A;
            case qe:
              return v = $o(v, S.mode, A), v.return = S, v;
            case je:
              return v = Mr(v), R(S, v, A);
          }
          if (re(v) || z(v)) return v = Sr(v, S.mode, A, null), v.return = S, v;
          if (typeof v.then == "function") return R(S, ys(v), A);
          if (v.$$typeof === D) return R(S, ps(S, v), A);
          bs(S, v);
        }
        return null;
      }
      function w(S, v, A, L) {
        var W = v !== null ? v.key : null;
        if (typeof A == "string" && A !== "" || typeof A == "number" || typeof A == "bigint") return W !== null ? null : p(S, v, "" + A, L);
        if (typeof A == "object" && A !== null) {
          switch (A.$$typeof) {
            case he:
              return A.key === W ? g(S, v, A, L) : null;
            case qe:
              return A.key === W ? N(S, v, A, L) : null;
            case je:
              return A = Mr(A), w(S, v, A, L);
          }
          if (re(A) || z(A)) return W !== null ? null : T(S, v, A, L, null);
          if (typeof A.then == "function") return w(S, v, ys(A), L);
          if (A.$$typeof === D) return w(S, v, ps(S, A), L);
          bs(S, A);
        }
        return null;
      }
      function C(S, v, A, L, W) {
        if (typeof L == "string" && L !== "" || typeof L == "number" || typeof L == "bigint") return S = S.get(A) || null, p(v, S, "" + L, W);
        if (typeof L == "object" && L !== null) {
          switch (L.$$typeof) {
            case he:
              return S = S.get(L.key === null ? A : L.key) || null, g(v, S, L, W);
            case qe:
              return S = S.get(L.key === null ? A : L.key) || null, N(v, S, L, W);
            case je:
              return L = Mr(L), C(S, v, A, L, W);
          }
          if (re(L) || z(L)) return S = S.get(A) || null, T(v, S, L, W, null);
          if (typeof L.then == "function") return C(S, v, A, ys(L), W);
          if (L.$$typeof === D) return C(S, v, A, ps(v, L), W);
          bs(v, L);
        }
        return null;
      }
      function V(S, v, A, L) {
        for (var W = null, be = null, J = v, ee = v = 0, et = null; J !== null && ee < A.length; ee++) {
          J.index > ee ? (et = J, J = null) : et = J.sibling;
          var ve = w(S, J, A[ee], L);
          if (ve === null) {
            J === null && (J = et);
            break;
          }
          e && J && ve.alternate === null && t(S, J), v = s(ve, v, ee), be === null ? W = ve : be.sibling = ve, be = ve, J = et;
        }
        if (ee === A.length) return n(S, J), pe && Pn(S, ee), W;
        if (J === null) {
          for (; ee < A.length; ee++) J = R(S, A[ee], L), J !== null && (v = s(J, v, ee), be === null ? W = J : be.sibling = J, be = J);
          return pe && Pn(S, ee), W;
        }
        for (J = r(J); ee < A.length; ee++) et = C(J, S, ee, A[ee], L), et !== null && (e && (ve = et.alternate, ve !== null && J.delete(ve.key === null ? ee : ve.key)), v = s(et, v, ee), be === null ? W = et : be.sibling = et, be = et);
        return e && J.forEach(function(hr) {
          return t(S, hr);
        }), pe && Pn(S, ee), W;
      }
      function G(S, v, A, L) {
        if (A == null) throw Error(c(151));
        for (var W = null, be = null, J = v, ee = v = 0, et = null, ve = A.next(); J !== null && !ve.done; ee++, ve = A.next()) {
          J.index > ee ? (et = J, J = null) : et = J.sibling;
          var hr = w(S, J, ve.value, L);
          if (hr === null) {
            J === null && (J = et);
            break;
          }
          e && J && hr.alternate === null && t(S, J), v = s(hr, v, ee), be === null ? W = hr : be.sibling = hr, be = hr, J = et;
        }
        if (ve.done) return n(S, J), pe && Pn(S, ee), W;
        if (J === null) {
          for (; !ve.done; ee++, ve = A.next()) ve = R(S, ve.value, L), ve !== null && (v = s(ve, v, ee), be === null ? W = ve : be.sibling = ve, be = ve);
          return pe && Pn(S, ee), W;
        }
        for (J = r(J); !ve.done; ee++, ve = A.next()) ve = C(J, S, ee, ve.value, L), ve !== null && (e && (et = ve.alternate, et !== null && J.delete(et.key === null ? ee : et.key)), v = s(ve, v, ee), be === null ? W = ve : be.sibling = ve, be = ve);
        return e && J.forEach(function(Ly) {
          return t(S, Ly);
        }), pe && Pn(S, ee), W;
      }
      function ce(S, v, A, L) {
        if (typeof A == "object" && A !== null && A.type === Fe && A.key === null && A.props.ref === void 0 && (A = A.props.children), typeof A == "object" && A !== null) {
          switch (A.$$typeof) {
            case he:
              e: {
                for (var W = A.key; v !== null; ) {
                  if (v.key === W) {
                    if (W = A.type, W === Fe) {
                      if (v.tag === 7) {
                        n(S, v.sibling), L = a(v, A.props.children), Xn(L, A), L.return = S, S = L;
                        break e;
                      }
                    } else if (v.elementType === W || typeof W == "object" && W !== null && W.$$typeof === je && Mr(W) === v.type) {
                      n(S, v.sibling), L = a(v, A.props), Xn(L, A), L.return = S, S = L;
                      break e;
                    }
                    n(S, v);
                    break;
                  } else t(S, v);
                  v = v.sibling;
                }
                A.type === Fe ? (L = Sr(A.props.children, S.mode, L, A.key), Xn(L, A), L.return = S, S = L) : (L = os(A.type, A.key, A.props, null, S.mode, L), Xn(L, A), L.return = S, S = L);
              }
              return i(S);
            case qe:
              e: {
                for (W = A.key; v !== null; ) {
                  if (v.key === W) if (v.tag === 4 && v.stateNode.containerInfo === A.containerInfo && v.stateNode.implementation === A.implementation) {
                    n(S, v.sibling), L = a(v, A.children || []), L.return = S, S = L;
                    break e;
                  } else {
                    n(S, v);
                    break;
                  }
                  else t(S, v);
                  v = v.sibling;
                }
                L = $o(A, S.mode, L), L.return = S, S = L;
              }
              return i(S);
            case je:
              return A = Mr(A), ce(S, v, A, L);
          }
          if (re(A)) return V(S, v, A, L);
          if (z(A)) {
            if (W = z(A), typeof W != "function") throw Error(c(150));
            return A = W.call(A), G(S, v, A, L);
          }
          if (typeof A.then == "function") return ce(S, v, ys(A), L);
          if (A.$$typeof === D) return ce(S, v, ps(S, A), L);
          bs(S, A);
        }
        return typeof A == "string" && A !== "" || typeof A == "number" || typeof A == "bigint" ? (A = "" + A, v !== null && v.tag === 6 ? (n(S, v.sibling), L = a(v, A), L.return = S, S = L) : (n(S, v), L = _o(A, S.mode, L), L.return = S, S = L), i(S)) : n(S, v);
      }
      return function(S, v, A, L) {
        try {
          sl = 0;
          var W = ce(S, v, A, L);
          return fa = null, W;
        } catch (J) {
          if (J === da || J === ms) throw J;
          var be = Tt(29, J, null, S.mode);
          return be.lanes = L, be.return = S, be;
        }
      };
    }
    var Pr = qd(!0), Wd = qd(!1), _n = !1;
    function ui(e) {
      e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, lanes: 0, hiddenCallbacks: null }, callbacks: null };
    }
    function ci(e, t) {
      e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, callbacks: null });
    }
    function Rr(e) {
      return { lane: e, tag: 0, payload: null, callback: null, next: null };
    }
    function Br(e, t, n) {
      var r = e.updateQueue;
      if (r === null) return null;
      if (r = r.shared, (Ae & 2) !== 0) {
        var a = r.pending;
        return a === null ? t.next = t : (t.next = a.next, a.next = t), r.pending = t, t = ss(e), Td(e, null, n), t;
      }
      return ls(e, r, t, n), ss(e);
    }
    function ol(e, t, n) {
      if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194048) !== 0)) {
        var r = t.lanes;
        r &= e.pendingLanes, n |= r, t.lanes = n, Mc(e, n);
      }
    }
    function di(e, t) {
      var n = e.updateQueue, r = e.alternate;
      if (r !== null && (r = r.updateQueue, n === r)) {
        var a = null, s = null;
        if (n = n.firstBaseUpdate, n !== null) {
          do {
            var i = { lane: n.lane, tag: n.tag, payload: n.payload, callback: null, next: null };
            s === null ? a = s = i : s = s.next = i, n = n.next;
          } while (n !== null);
          s === null ? a = s = t : s = s.next = t;
        } else a = s = t;
        n = { baseState: r.baseState, firstBaseUpdate: a, lastBaseUpdate: s, shared: r.shared, callbacks: r.callbacks }, e.updateQueue = n;
        return;
      }
      e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
    }
    var fi = !1;
    function il() {
      if (fi) {
        var e = ca;
        if (e !== null) throw e;
      }
    }
    function ul(e, t, n, r) {
      fi = !1;
      var a = e.updateQueue;
      _n = !1;
      var s = a.firstBaseUpdate, i = a.lastBaseUpdate, p = a.shared.pending;
      if (p !== null) {
        a.shared.pending = null;
        var g = p, N = g.next;
        g.next = null, i === null ? s = N : i.next = N, i = g;
        var T = e.alternate;
        T !== null && (T = T.updateQueue, p = T.lastBaseUpdate, p !== i && (p === null ? T.firstBaseUpdate = N : p.next = N, T.lastBaseUpdate = g));
      }
      if (s !== null) {
        var R = a.baseState;
        i = 0, T = N = g = null, p = s;
        do {
          var w = p.lane & -536870913, C = w !== p.lane;
          if (C ? (ye & w) === w : (r & w) === w) {
            w !== 0 && w === jr && (fi = !0), T !== null && (T = T.next = { lane: 0, tag: p.tag, payload: p.payload, callback: null, next: null });
            e: {
              var V = e, G = p;
              w = t;
              var ce = n;
              switch (G.tag) {
                case 1:
                  if (V = G.payload, typeof V == "function") {
                    R = V.call(ce, R, w);
                    break e;
                  }
                  R = V;
                  break e;
                case 3:
                  V.flags = V.flags & -65537 | 128;
                case 0:
                  if (V = G.payload, w = typeof V == "function" ? V.call(ce, R, w) : V, w == null) break e;
                  R = se({}, R, w);
                  break e;
                case 2:
                  _n = !0;
              }
            }
            w = p.callback, w !== null && (e.flags |= 64, C && (e.flags |= 8192), C = a.callbacks, C === null ? a.callbacks = [w] : C.push(w));
          } else C = { lane: w, tag: p.tag, payload: p.payload, callback: p.callback, next: null }, T === null ? (N = T = C, g = R) : T = T.next = C, i |= w;
          if (p = p.next, p === null) {
            if (p = a.shared.pending, p === null) break;
            C = p, p = C.next, C.next = null, a.lastBaseUpdate = C, a.shared.pending = null;
          }
        } while (!0);
        T === null && (g = R), a.baseState = g, a.firstBaseUpdate = N, a.lastBaseUpdate = T, s === null && (a.shared.lanes = 0), lr |= i, e.lanes = i, e.memoizedState = R;
      }
    }
    function Qd(e, t) {
      if (typeof e != "function") throw Error(c(191, e));
      e.call(t);
    }
    function Gd(e, t) {
      var n = e.callbacks;
      if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) Qd(n[e], t);
    }
    var $n = Ze(null), vs = Ze(0);
    function Yd(e, t) {
      e = Fn, ke(vs, e), ke($n, t), Fn = e | t.baseLanes;
    }
    function pi() {
      ke(vs, Fn), ke($n, $n.current);
    }
    function hi() {
      Fn = vs.current, Ge($n), Ge(vs);
    }
    var ht = Ze(null), wt = null;
    function er(e) {
      var t = e.alternate;
      ke(mt, mt.current & 1), ke(ht, e), wt === null && (t === null || $n.current !== null || t.memoizedState !== null) && (wt = e);
    }
    function mi(e) {
      ke(mt, mt.current), ke(ht, e), wt === null && (wt = e);
    }
    function Jd(e) {
      e.tag === 22 ? (ke(mt, mt.current), ke(ht, e), wt === null && (wt = e)) : tr();
    }
    function tr() {
      ke(mt, mt.current), ke(ht, ht.current);
    }
    function It(e) {
      Ge(ht), wt === e && (wt = null), Ge(mt);
    }
    var mt = Ze(0);
    function cl(e, t) {
      ke(ht, ht.current), ke(mt, t);
    }
    function gi(e) {
      Ge(mt), Ge(ht), wt === e && (wt = null);
    }
    function xs(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === 13) {
          var n = t.memoizedState;
          if (n !== null && (n = n.dehydrated, n === null || Du(n) || Fu(n))) return t;
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== "independent") {
          if ((t.flags & 128) !== 0) return t;
        } else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return null;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return null;
    }
    var zn = 0, ue = null, Re = null, _e = null, ks = !1, pa = !1, zr = !1, ws = 0, dl = 0, ha = null, J1 = 0;
    function Ye() {
      throw Error(c(321));
    }
    function yi(e, t) {
      if (t === null) return !1;
      for (var n = 0; n < t.length && n < e.length; n++) if (!Ut(e[n], t[n])) return !1;
      return !0;
    }
    function bi(e, t, n, r, a, s) {
      return zn = s, ue = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, H.H = e === null || e.memoizedState === null ? Pf : Rf, zr = !1, s = n(r, a), zr = !1, pa && (s = Zd(t, n, r, a)), Kd(e), s;
    }
    function Kd(e) {
      H.H = Es;
      var t = Re !== null && Re.next !== null;
      if (zn = 0, _e = Re = ue = null, ks = !1, dl = 0, ha = null, t) throw Error(c(300));
      e === null || $e || (e = e.dependencies, e !== null && fs(e) && ($e = !0));
    }
    function Zd(e, t, n, r) {
      ue = e;
      var a = 0;
      do {
        if (pa && (ha = null), dl = 0, pa = !1, 25 <= a) throw Error(c(301));
        if (a += 1, _e = Re = null, e.updateQueue != null) {
          var s = e.updateQueue;
          s.lastEffect = null, s.events = null, s.stores = null, s.memoCache != null && (s.memoCache.index = 0);
        }
        H.H = ng, s = t(n, r);
      } while (pa);
      return s;
    }
    function K1() {
      var e = H.H, t = e.useState()[0];
      return t = typeof t.then == "function" ? fl(t) : t, e = e.useState()[0], (Re !== null ? Re.memoizedState : null) !== e && (ue.flags |= 1024), t;
    }
    function vi() {
      var e = ws !== 0;
      return ws = 0, e;
    }
    function xi(e, t, n) {
      t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
    }
    function ki(e) {
      if (ks) {
        for (e = e.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        ks = !1;
      }
      zn = 0, _e = Re = ue = null, pa = !1, dl = ws = 0, ha = null;
    }
    function St() {
      var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
      return _e === null ? ue.memoizedState = _e = e : _e = _e.next = e, _e;
    }
    function Ke() {
      if (Re === null) {
        var e = ue.alternate;
        e = e !== null ? e.memoizedState : null;
      } else e = Re.next;
      var t = _e === null ? ue.memoizedState : _e.next;
      if (t !== null) _e = t, Re = e;
      else {
        if (e === null) throw ue.alternate === null ? Error(c(467)) : Error(c(310));
        Re = e, e = { memoizedState: Re.memoizedState, baseState: Re.baseState, baseQueue: Re.baseQueue, queue: Re.queue, next: null }, _e === null ? ue.memoizedState = _e = e : _e = _e.next = e;
      }
      return _e;
    }
    function Ss() {
      return { lastEffect: null, events: null, stores: null, memoCache: null };
    }
    function fl(e) {
      var t = dl;
      return dl += 1, ha === null && (ha = []), e = Vd(ha, e, t), t = ue, (_e === null ? t.memoizedState : _e.next) === null && (t = t.alternate, H.H = t === null || t.memoizedState === null ? Pf : Rf), e;
    }
    function Ns(e) {
      if (e !== null && typeof e == "object") {
        if (typeof e.then == "function") return fl(e);
        if (e.$$typeof === U) return;
        if (e.$$typeof === D) return pt(e);
      }
      throw Error(c(438, String(e)));
    }
    function wi(e) {
      var t = null, n = ue.updateQueue;
      if (n !== null && (t = n.memoCache), t == null) {
        var r = ue.alternate;
        r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = { data: r.data.map(function(a) {
          return a.slice();
        }), index: 0 })));
      }
      if (t ??= { data: [], index: 0 }, n === null && (n = Ss(), ue.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = dt;
      return t.index++, n;
    }
    function Un(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function As(e) {
      return Si(Ke(), Re, e);
    }
    function Si(e, t, n) {
      var r = e.queue;
      if (r === null) throw Error(c(311));
      r.lastRenderedReducer = n;
      var a = e.baseQueue, s = r.pending;
      if (s !== null) {
        if (a !== null) {
          var i = a.next;
          a.next = s.next, s.next = i;
        }
        t.baseQueue = a = s, r.pending = null;
      }
      if (s = e.baseState, a === null) e.memoizedState = s;
      else {
        t = a.next;
        var p = i = null, g = null, N = t, T = !1;
        do {
          var R = N.lane & -536870913;
          if (R !== N.lane ? (ye & R) === R : (zn & R) === R) {
            var w = N.revertLane;
            if (w === 0) g !== null && (g = g.next = { lane: 0, revertLane: 0, gesture: null, action: N.action, hasEagerState: N.hasEagerState, eagerState: N.eagerState, next: null }), R === jr && (T = !0);
            else if ((zn & w) === w) {
              N = N.next, w === jr && (T = !0);
              continue;
            } else R = { lane: 0, revertLane: N.revertLane, gesture: null, action: N.action, hasEagerState: N.hasEagerState, eagerState: N.eagerState, next: null }, g === null ? (p = g = R, i = s) : g = g.next = R, ue.lanes |= w, lr |= w;
            R = N.action, zr && n(s, R), s = N.hasEagerState ? N.eagerState : n(s, R);
          } else w = { lane: R, revertLane: N.revertLane, gesture: N.gesture, action: N.action, hasEagerState: N.hasEagerState, eagerState: N.eagerState, next: null }, g === null ? (p = g = w, i = s) : g = g.next = w, ue.lanes |= R, lr |= R;
          N = N.next;
        } while (N !== null && N !== t);
        if (g === null ? i = s : g.next = p, !Ut(s, e.memoizedState) && ($e = !0, T && (n = ca, n !== null))) throw n;
        e.memoizedState = s, e.baseState = i, e.baseQueue = g, r.lastRenderedState = s;
      }
      return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
    }
    function Ni(e) {
      var t = Ke(), n = t.queue;
      if (n === null) throw Error(c(311));
      n.lastRenderedReducer = e;
      var r = n.dispatch, a = n.pending, s = t.memoizedState;
      if (a !== null) {
        n.pending = null;
        var i = a = a.next;
        do
          s = e(s, i.action), i = i.next;
        while (i !== a);
        Ut(s, t.memoizedState) || ($e = !0), t.memoizedState = s, t.baseQueue === null && (t.baseState = s), n.lastRenderedState = s;
      }
      return [s, r];
    }
    function Xd(e, t, n) {
      var r = ue, a = Ke(), s = pe;
      if (s) {
        if (n === void 0) throw Error(c(407));
        n = n();
      } else n = t();
      var i = !Ut((Re || a).memoizedState, n);
      if (i && (a.memoizedState = n, $e = !0), a = a.queue, Ti(ef.bind(null, r, a, e), [e]), e = a.getSnapshot !== t || i || _e !== null && (_e.memoizedState.tag & 1) !== 0, ma(e ? 9 : 8, { destroy: void 0 }, $d.bind(null, r, a, n, t), null), e) {
        if (r.flags |= 2048, Be === null) throw Error(c(349));
        s || (zn & 127) !== 0 || _d(r, t, n);
      }
      return n;
    }
    function _d(e, t, n) {
      e.flags |= 16384, e = { getSnapshot: t, value: n }, t = ue.updateQueue, t === null ? (t = Ss(), ue.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
    }
    function $d(e, t, n, r) {
      t.value = n, t.getSnapshot = r, tf(t) && nf(e);
    }
    function ef(e, t, n) {
      return n(function() {
        tf(t) && nf(e);
      });
    }
    function tf(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var n = t();
        return !Ut(e, n);
      } catch {
        return !0;
      }
    }
    function nf(e) {
      var t = wr(e, 2);
      t !== null && Lt(t, e, 2);
    }
    function Ai(e) {
      var t = St();
      if (typeof e == "function") {
        var n = e;
        if (e = n(), zr) {
          Wn(!0);
          try {
            n();
          } finally {
            Wn(!1);
          }
        }
      }
      return t.memoizedState = t.baseState = e, t.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Un, lastRenderedState: e }, t;
    }
    function rf(e, t, n, r) {
      return e.baseState = n, Si(e, Re, typeof r == "function" ? r : Un);
    }
    function Z1(e, t, n, r, a) {
      if (js(e)) throw Error(c(485));
      if (e = t.action, e !== null) {
        var s = { payload: a, action: e, next: null, isTransition: !0, status: "pending", value: null, reason: null, listeners: [], then: function(i) {
          s.listeners.push(i);
        } };
        H.T !== null ? n(!0) : s.isTransition = !1, r(s), n = t.pending, n === null ? (s.next = t.pending = s, af(t, s)) : (s.next = n.next, t.pending = n.next = s);
      }
    }
    function af(e, t) {
      var n = t.action, r = t.payload, a = e.state;
      if (t.isTransition) {
        var s = H.T, i = {};
        i.types = s !== null ? s.types : null, H.T = i;
        try {
          var p = n(a, r), g = H.S;
          g !== null && g(i, p), lf(e, t, p);
        } catch (N) {
          Ci(e, t, N);
        } finally {
          s !== null && i.types !== null && (s.types = i.types), H.T = s;
        }
      } else try {
        s = n(a, r), lf(e, t, s);
      } catch (N) {
        Ci(e, t, N);
      }
    }
    function lf(e, t, n) {
      n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(function(r) {
        sf(e, t, r);
      }, function(r) {
        return Ci(e, t, r);
      }) : sf(e, t, n);
    }
    function sf(e, t, n) {
      t.status = "fulfilled", t.value = n, of(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, af(e, n)));
    }
    function Ci(e, t, n) {
      var r = e.pending;
      if (e.pending = null, r !== null) {
        r = r.next;
        do
          t.status = "rejected", t.reason = n, of(t), t = t.next;
        while (t !== r);
      }
      e.action = null;
    }
    function of(e) {
      e = e.listeners;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
    function uf(e, t) {
      return t;
    }
    function cf(e, t) {
      if (pe) {
        var n = Be.formState;
        if (n !== null) {
          e: {
            var r = ue;
            if (pe) {
              if (Ie) {
                t: {
                  for (var a = Ie, s = Jt; a.nodeType !== 8; ) {
                    if (!s) {
                      a = null;
                      break t;
                    }
                    if (a = Xt(a.nextSibling), a === null) {
                      a = null;
                      break t;
                    }
                  }
                  s = a.data, a = s === "F!" || s === "F" ? a : null;
                }
                if (a) {
                  Ie = Xt(a.nextSibling), r = a.data === "F!";
                  break e;
                }
              }
              Kn(r);
            }
            r = !1;
          }
          r && (t = n[0]);
        }
      }
      return n = St(), n.memoizedState = n.baseState = t, r = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: uf, lastRenderedState: t }, n.queue = r, n = Ef.bind(null, ue, r), r.dispatch = n, r = Ai(!1), s = Pi.bind(null, ue, !1, r.queue), r = St(), a = { state: t, dispatch: null, action: e, pending: null }, r.queue = a, n = Z1.bind(null, ue, a, s, n), a.dispatch = n, r.memoizedState = e, [t, n, !1];
    }
    function df(e) {
      return ff(Ke(), Re, e);
    }
    function ff(e, t, n) {
      if (t = Si(e, t, uf)[0], e = As(Un)[0], typeof t == "object" && t !== null && typeof t.then == "function") try {
        var r = fl(t);
      } catch (i) {
        throw i === da ? ms : i;
      }
      else r = t;
      t = Ke();
      var a = t.queue, s = a.dispatch;
      return n !== t.memoizedState && (ue.flags |= 2048, ma(9, { destroy: void 0 }, X1.bind(null, a, n), null)), [r, s, e];
    }
    function X1(e, t) {
      e.action = t;
    }
    function pf(e) {
      var t = Ke(), n = Re;
      if (n !== null) return ff(t, n, e);
      Ke(), t = t.memoizedState, n = Ke();
      var r = n.queue.dispatch;
      return n.memoizedState = e, [t, r, !1];
    }
    function ma(e, t, n, r) {
      return e = { tag: e, create: n, deps: r, inst: t, next: null }, t = ue.updateQueue, t === null && (t = Ss(), ue.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
    }
    function hf() {
      return Ke().memoizedState;
    }
    function Cs(e, t, n, r) {
      var a = St();
      ue.flags |= e, a.memoizedState = ma(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
    }
    function Ts(e, t, n, r) {
      var a = Ke();
      r = r === void 0 ? null : r;
      var s = a.memoizedState.inst;
      Re !== null && r !== null && yi(r, Re.memoizedState.deps) ? a.memoizedState = ma(t, s, n, r) : (ue.flags |= e, a.memoizedState = ma(1 | t, s, n, r));
    }
    function mf(e, t) {
      Cs(8390656, 8, e, t);
    }
    function Ti(e, t) {
      Ts(2048, 8, e, t);
    }
    function _1(e) {
      ue.flags |= 4;
      var t = ue.updateQueue;
      if (t === null) t = Ss(), ue.updateQueue = t, t.events = [e];
      else {
        var n = t.events;
        n === null ? t.events = [e] : n.push(e);
      }
    }
    function gf(e) {
      var t = Ke().memoizedState;
      return _1({ ref: t, nextImpl: e }), function() {
        if ((Ae & 2) !== 0) throw Error(c(440));
        return t.impl.apply(void 0, arguments);
      };
    }
    function yf(e, t) {
      return Ts(4, 2, e, t);
    }
    function bf(e, t) {
      return Ts(4, 4, e, t);
    }
    function vf(e, t) {
      if (typeof t == "function") {
        e = e();
        var n = t(e);
        return function() {
          typeof n == "function" ? n() : t(null);
        };
      }
      if (t != null) return e = e(), t.current = e, function() {
        t.current = null;
      };
    }
    function xf(e, t, n) {
      n = n != null ? n.concat([e]) : null, Ts(4, 4, vf.bind(null, t, e), n);
    }
    function ji() {
    }
    function kf(e, t) {
      var n = Ke();
      t = t === void 0 ? null : t;
      var r = n.memoizedState;
      return t !== null && yi(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
    }
    function wf(e, t) {
      var n = Ke();
      t = t === void 0 ? null : t;
      var r = n.memoizedState;
      if (t !== null && yi(t, r[1])) return r[0];
      if (r = e(), zr) {
        Wn(!0);
        try {
          e();
        } finally {
          Wn(!1);
        }
      }
      return n.memoizedState = [r, t], r;
    }
    function Ei(e, t, n) {
      return n === void 0 || (zn & 1073741824) !== 0 && (ye & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = n, e = E0(), ue.lanes |= e, lr |= e, n);
    }
    function Sf(e, t, n, r) {
      return Ut(n, t) ? n : $n.current !== null ? (e = Ei(e, n, r), Ut(e, t) || ($e = !0), e) : (zn & 106) === 0 || (zn & 1073741824) !== 0 && (ye & 261930) === 0 ? ($e = !0, e.memoizedState = n) : (e = E0(), ue.lanes |= e, lr |= e, t);
    }
    function Nf(e, t, n, r, a) {
      var s = O.p;
      O.p = s !== 0 && 8 > s ? s : 8;
      var i = H.T, p = {};
      p.types = i !== null ? i.types : null, H.T = p, Pi(e, !1, t, n);
      try {
        var g = a(), N = H.S;
        N !== null && N(p, g), g !== null && typeof g == "object" && typeof g.then == "function" ? pl(e, t, Y1(g, r), Zt(e)) : pl(e, t, r, Zt(e));
      } catch (T) {
        pl(e, t, { then: function() {
        }, status: "rejected", reason: T }, Zt());
      } finally {
        O.p = s, i !== null && p.types !== null && (i.types = p.types), H.T = i;
      }
    }
    function $1() {
    }
    function Mi(e, t, n, r) {
      if (e.tag !== 5) throw Error(c(476));
      var a = Af(e).queue;
      Nf(e, a, t, le, n === null ? $1 : function() {
        return Cf(e), n(r);
      });
    }
    function Af(e) {
      var t = e.memoizedState;
      if (t !== null) return t;
      t = { memoizedState: le, baseState: le, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Un, lastRenderedState: le }, next: null };
      var n = {};
      return t.next = { memoizedState: n, baseState: n, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Un, lastRenderedState: n }, next: null }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
    }
    function Cf(e) {
      var t = Af(e);
      t.next === null && (t = e.alternate.memoizedState), pl(e, t.next.queue, {}, Zt());
    }
    function Li() {
      return pt(Ba);
    }
    function Tf() {
      return Ke().memoizedState;
    }
    function jf() {
      return Ke().memoizedState;
    }
    function eg(e) {
      for (var t = e.return; t !== null; ) {
        switch (t.tag) {
          case 24:
          case 3:
            var n = Zt();
            e = Rr(n);
            var r = Br(t, e, n);
            r !== null && (Lt(r, t, n), ol(r, t, n)), t = { cache: li() }, e.payload = t;
            return;
        }
        t = t.return;
      }
    }
    function tg(e, t, n) {
      var r = Zt();
      n = { lane: r, revertLane: 0, gesture: null, action: n, hasEagerState: !1, eagerState: null, next: null }, js(e) ? Mf(t, n) : (n = Zo(e, t, n, r), n !== null && (Lt(n, e, r), Lf(n, t, r)));
    }
    function Ef(e, t, n) {
      pl(e, t, n, Zt());
    }
    function pl(e, t, n, r) {
      var a = { lane: r, revertLane: 0, gesture: null, action: n, hasEagerState: !1, eagerState: null, next: null };
      if (js(e)) Mf(t, a);
      else {
        var s = e.alternate;
        if (e.lanes === 0 && (s === null || s.lanes === 0) && (s = t.lastRenderedReducer, s !== null)) try {
          var i = t.lastRenderedState, p = s(i, n);
          if (a.hasEagerState = !0, a.eagerState = p, Ut(p, i)) return ls(e, t, a, 0), Be === null && as(), !1;
        } catch {
        }
        if (n = Zo(e, t, a, r), n !== null) return Lt(n, e, r), Lf(n, t, r), !0;
      }
      return !1;
    }
    function Pi(e, t, n, r) {
      if (r = { lane: 2, revertLane: Su(), gesture: null, action: r, hasEagerState: !1, eagerState: null, next: null }, js(e)) {
        if (t) throw Error(c(479));
      } else t = Zo(e, n, r, 2), t !== null && Lt(t, e, 2);
    }
    function js(e) {
      var t = e.alternate;
      return e === ue || t !== null && t === ue;
    }
    function Mf(e, t) {
      pa = ks = !0;
      var n = e.pending;
      n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
    }
    function Lf(e, t, n) {
      if ((n & 4194048) !== 0) {
        var r = t.lanes;
        r &= e.pendingLanes, n |= r, t.lanes = n, Mc(e, n);
      }
    }
    var Es = { readContext: pt, use: Ns, useCallback: Ye, useContext: Ye, useEffect: Ye, useImperativeHandle: Ye, useLayoutEffect: Ye, useInsertionEffect: Ye, useMemo: Ye, useReducer: Ye, useRef: Ye, useState: Ye, useDebugValue: Ye, useDeferredValue: Ye, useTransition: Ye, useSyncExternalStore: Ye, useId: Ye, useHostTransitionStatus: Ye, useFormState: Ye, useActionState: Ye, useOptimistic: Ye, useMemoCache: Ye, useCacheRefresh: Ye, useEffectEvent: Ye }, Pf = { readContext: pt, use: Ns, useCallback: function(e, t) {
      return St().memoizedState = [e, t === void 0 ? null : t], e;
    }, useContext: pt, useEffect: mf, useImperativeHandle: function(e, t, n) {
      n = n != null ? n.concat([e]) : null, Cs(4194308, 4, vf.bind(null, t, e), n);
    }, useLayoutEffect: function(e, t) {
      return Cs(4194308, 4, e, t);
    }, useInsertionEffect: function(e, t) {
      Cs(4, 2, e, t);
    }, useMemo: function(e, t) {
      var n = St();
      t = t === void 0 ? null : t;
      var r = e();
      if (zr) {
        Wn(!0);
        try {
          e();
        } finally {
          Wn(!1);
        }
      }
      return n.memoizedState = [r, t], r;
    }, useReducer: function(e, t, n) {
      var r = St();
      if (n !== void 0) {
        var a = n(t);
        if (zr) {
          Wn(!0);
          try {
            n(t);
          } finally {
            Wn(!1);
          }
        }
      } else a = t;
      return r.memoizedState = r.baseState = a, e = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: a }, r.queue = e, e = e.dispatch = tg.bind(null, ue, e), [r.memoizedState, e];
    }, useRef: function(e) {
      var t = St();
      return e = { current: e }, t.memoizedState = e;
    }, useState: function(e) {
      e = Ai(e);
      var t = e.queue, n = Ef.bind(null, ue, t);
      return t.dispatch = n, [e.memoizedState, n];
    }, useDebugValue: ji, useDeferredValue: function(e, t) {
      return Ei(St(), e, t);
    }, useTransition: function() {
      var e = Ai(!1);
      return e = Nf.bind(null, ue, e.queue, !0, !1), St().memoizedState = e, [!1, e];
    }, useSyncExternalStore: function(e, t, n) {
      var r = ue, a = St();
      if (pe) {
        if (n === void 0) throw Error(c(407));
        n = n();
      } else {
        if (n = t(), Be === null) throw Error(c(349));
        (ye & 127) !== 0 || _d(r, t, n);
      }
      a.memoizedState = n;
      var s = { value: n, getSnapshot: t };
      return a.queue = s, mf(ef.bind(null, r, s, e), [e]), r.flags |= 2048, ma(9, { destroy: void 0 }, $d.bind(null, r, s, n, t), null), n;
    }, useId: function() {
      var e = St(), t = Be.identifierPrefix;
      if (pe) {
        var n = mn, r = hn;
        n = (r & ~(1 << 32 - Bt(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = ws++, 0 < n && (t += "H" + n.toString(32)), t += "_";
      } else n = J1++, t = "_" + t + "r_" + n.toString(32) + "_";
      return e.memoizedState = t;
    }, useHostTransitionStatus: Li, useFormState: cf, useActionState: cf, useOptimistic: function(e) {
      var t = St();
      t.memoizedState = t.baseState = e;
      var n = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null };
      return t.queue = n, t = Pi.bind(null, ue, !0, n), n.dispatch = t, [e, t];
    }, useMemoCache: wi, useCacheRefresh: function() {
      return St().memoizedState = eg.bind(null, ue);
    }, useEffectEvent: function(e) {
      var t = St(), n = { impl: e };
      return t.memoizedState = n, function() {
        if ((Ae & 2) !== 0) throw Error(c(440));
        return n.impl.apply(void 0, arguments);
      };
    } }, Rf = { readContext: pt, use: Ns, useCallback: kf, useContext: pt, useEffect: Ti, useImperativeHandle: xf, useInsertionEffect: yf, useLayoutEffect: bf, useMemo: wf, useReducer: As, useRef: hf, useState: function() {
      return As(Un);
    }, useDebugValue: ji, useDeferredValue: function(e, t) {
      return Sf(Ke(), Re.memoizedState, e, t);
    }, useTransition: function() {
      var e = As(Un)[0], t = Ke().memoizedState;
      return [typeof e == "boolean" ? e : fl(e), t];
    }, useSyncExternalStore: Xd, useId: Tf, useHostTransitionStatus: Li, useFormState: df, useActionState: df, useOptimistic: function(e, t) {
      return rf(Ke(), Re, e, t);
    }, useMemoCache: wi, useCacheRefresh: jf, useEffectEvent: gf }, ng = { readContext: pt, use: Ns, useCallback: kf, useContext: pt, useEffect: Ti, useImperativeHandle: xf, useInsertionEffect: yf, useLayoutEffect: bf, useMemo: wf, useReducer: Ni, useRef: hf, useState: function() {
      return Ni(Un);
    }, useDebugValue: ji, useDeferredValue: function(e, t) {
      var n = Ke();
      return Re === null ? Ei(n, e, t) : Sf(n, Re.memoizedState, e, t);
    }, useTransition: function() {
      var e = Ni(Un)[0], t = Ke().memoizedState;
      return [typeof e == "boolean" ? e : fl(e), t];
    }, useSyncExternalStore: Xd, useId: Tf, useHostTransitionStatus: Li, useFormState: pf, useActionState: pf, useOptimistic: function(e, t) {
      var n = Ke();
      return Re !== null ? rf(n, Re, e, t) : (n.baseState = e, [e, n.queue.dispatch]);
    }, useMemoCache: wi, useCacheRefresh: jf, useEffectEvent: gf };
    function Ri(e, t, n, r) {
      t = e.memoizedState, n = n(r, t), n = n == null ? t : se({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
    }
    var Bi = { enqueueSetState: function(e, t, n) {
      e = e._reactInternals;
      var r = Zt(), a = Rr(r);
      a.payload = t, n != null && (a.callback = n), t = Br(e, a, r), t !== null && (Lt(t, e, r), ol(t, e, r));
    }, enqueueReplaceState: function(e, t, n) {
      e = e._reactInternals;
      var r = Zt(), a = Rr(r);
      a.tag = 1, a.payload = t, n != null && (a.callback = n), t = Br(e, a, r), t !== null && (Lt(t, e, r), ol(t, e, r));
    }, enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var n = Zt(), r = Rr(n);
      r.tag = 2, t != null && (r.callback = t), t = Br(e, r, n), t !== null && (Lt(t, e, n), ol(t, e, n));
    } };
    function Bf(e, t, n, r, a, s, i) {
      return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, s, i) : t.prototype && t.prototype.isPureReactComponent ? !$a(n, r) || !$a(a, s) : !0;
    }
    function zf(e, t, n, r) {
      e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Bi.enqueueReplaceState(t, t.state, null);
    }
    function Ur(e, t) {
      var n = t;
      if ("ref" in t) {
        n = {};
        for (var r in t) r !== "ref" && (n[r] = t[r]);
      }
      if (e = e.defaultProps) {
        n === t && (n = se({}, n));
        for (var a in e) n[a] === void 0 && (n[a] = e[a]);
      }
      return n;
    }
    function rg(e) {
      rs(e);
    }
    function ag(e) {
      console.error(e);
    }
    function lg(e) {
      rs(e);
    }
    function Ms(e, t) {
      try {
        var n = e.onUncaughtError;
        n(t.value, { componentStack: t.stack });
      } catch (r) {
        setTimeout(function() {
          throw r;
        });
      }
    }
    function Uf(e, t, n) {
      try {
        var r = e.onCaughtError;
        r(n.value, { componentStack: n.stack, errorBoundary: t.tag === 1 ? t.stateNode : null });
      } catch (a) {
        setTimeout(function() {
          throw a;
        });
      }
    }
    function zi(e, t, n) {
      return n = Rr(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
        Ms(e, t);
      }, n;
    }
    function If(e) {
      return e = Rr(e), e.tag = 3, e;
    }
    function Df(e, t, n, r) {
      var a = n.type.getDerivedStateFromError;
      if (typeof a == "function") {
        var s = r.value;
        e.payload = function() {
          return a(s);
        }, e.callback = function() {
          Uf(t, n, r);
        };
      }
      var i = n.stateNode;
      i !== null && typeof i.componentDidCatch == "function" && (e.callback = function() {
        Uf(t, n, r), typeof a != "function" && (sr === null ? sr = /* @__PURE__ */ new Set([this]) : sr.add(this));
        var p = r.stack;
        this.componentDidCatch(r.value, { componentStack: p !== null ? p : "" });
      });
    }
    function sg(e, t, n, r, a) {
      if (n.flags |= 32768, r !== null && typeof r == "object" && typeof r.then == "function") {
        if (t = n.alternate, t !== null && Cr(t, n, a, !0), n = ht.current, n !== null) {
          switch (n.tag) {
            case 31:
            case 13:
            case 19:
              return wt === null ? Zs() : n.alternate === null && Je === 0 && (Je = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === gs ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), xu(e, r, a)), !1;
            case 22:
              return n.flags |= 65536, r === gs ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = { transitions: null, markerInstances: null, retryQueue: /* @__PURE__ */ new Set([r]) }, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), xu(e, r, a)), !1;
          }
          throw Error(c(435, n.tag));
        }
        return xu(e, r, a), Zs(), !1;
      }
      if (pe) return t = ht.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== ti && (e = Error(c(422), { cause: r }), nl(Qt(e, n)))) : (r !== ti && (t = Error(c(423), { cause: r }), nl(Qt(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = Qt(r, n), a = zi(e.stateNode, r, a), di(e, a), Je !== 4 && (Je = 2)), !1;
      var s = Error(c(520), { cause: r });
      if (s = Qt(s, n), kl === null ? kl = [s] : kl.push(s), Je !== 4 && (Je = 2), t === null) return !0;
      r = Qt(r, n), n = t;
      do {
        switch (n.tag) {
          case 3:
            return n.flags |= 65536, e = a & -a, n.lanes |= e, e = zi(n.stateNode, r, e), di(n, e), !1;
          case 1:
            if (t = n.type, s = n.stateNode, (n.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || s !== null && typeof s.componentDidCatch == "function" && (sr === null || !sr.has(s)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = If(a), Df(a, e, n, r), di(n, a), !1;
            break;
          case 22:
            if (n.memoizedState !== null) return n.flags |= 65536, !1;
        }
        n = n.return;
      } while (n !== null);
      return !1;
    }
    var Ui = Error(c(461)), $e = !1;
    function rt(e, t, n, r) {
      t.child = e === null ? Wd(t, null, n, r) : Pr(t, e.child, n, r);
    }
    function Ff(e, t, n, r, a) {
      n = n.render;
      var s = t.ref;
      if ("ref" in r) {
        var i = {};
        for (var p in r) p !== "ref" && (i[p] = r[p]);
      } else i = r;
      return Tr(t), r = bi(e, t, n, i, s, a), p = vi(), e !== null && !$e ? (xi(e, t, a), In(e, t, a)) : (pe && p && us(t), t.flags |= 1, rt(e, t, r, a), t.child);
    }
    function Vf(e, t, n, r, a) {
      if (e === null) {
        var s = n.type;
        return typeof s == "function" && !Xo(s) && s.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = s, Of(e, t, s, r, a)) : (e = os(n.type, null, r, t, t.mode, a), e.ref = t.ref, e.return = t, t.child = e);
      }
      if (s = e.child, !Wi(e, a)) {
        var i = s.memoizedProps;
        if (n = n.compare, n = n !== null ? n : $a, n(i, r) && e.ref === t.ref) return In(e, t, a);
      }
      return t.flags |= 1, e = Ln(s, r), e.ref = t.ref, e.return = t, t.child = e;
    }
    function Of(e, t, n, r, a) {
      if (e !== null) {
        var s = e.memoizedProps;
        if ($a(s, r) && e.ref === t.ref) if ($e = !1, t.pendingProps = r = s, Wi(e, a)) (e.flags & 131072) !== 0 && ($e = !0);
        else return t.lanes = e.lanes, In(e, t, a);
      }
      return Ii(e, t, n, r, a);
    }
    function Hf(e, t, n, r) {
      var a = r.children, s = e !== null ? e.memoizedState : null;
      if (e === null && t.stateNode === null && (t.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }), r.mode === "hidden") {
        if ((t.flags & 128) !== 0) {
          if (s = s !== null ? s.baseLanes | n : n, e !== null) {
            for (r = t.child = e.child, a = 0; r !== null; ) a = a | r.lanes | r.childLanes, r = r.sibling;
            r = a & ~s;
          } else r = 0, t.child = null;
          return qf(e, t, s, n, r);
        }
        if ((n & 536870912) !== 0) t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && hs(t, s !== null ? s.cachePool : null), s !== null ? Yd(t, s) : pi(), Jd(t);
        else return r = t.lanes = 536870912, qf(e, t, s !== null ? s.baseLanes | n : n, n, r);
      } else s !== null ? (hs(t, s.cachePool), Yd(t, s), tr(), t.memoizedState = null) : (e !== null && hs(t, null), pi(), tr());
      return rt(e, t, a, n), t.child;
    }
    function hl(e, t) {
      return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }), t.sibling;
    }
    function qf(e, t, n, r, a) {
      var s = oi();
      return s = s === null ? null : { parent: Xe._currentValue, pool: s }, t.memoizedState = { baseLanes: n, cachePool: s }, e !== null && hs(t, null), pi(), Jd(t), e !== null && Cr(e, t, r, !0), t.childLanes = a, null;
    }
    function Ls(e, t) {
      return t = Ps({ mode: t.mode, children: t.children }, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
    }
    function Wf(e, t, n) {
      return Pr(t, e.child, null, n), e = Ls(t, t.pendingProps), e.flags |= 2, It(t), t.memoizedState = null, e;
    }
    function og(e, t, n) {
      var r = t.pendingProps, a = (t.flags & 128) !== 0;
      if (t.flags &= -129, e === null) {
        if (pe) {
          if (r.mode === "hidden") return e = Ls(t, r), t.lanes = 536870912, e.memoizedState = { baseLanes: 0, cachePool: null }, hl(null, e);
          if (mi(t), (e = Ie) ? (e = bp(e, Jt), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = { dehydrated: e, treeContext: Yn !== null ? { id: hn, overflow: mn } : null, retryLane: 536870912, hydrationErrors: null }, n = Ed(e), n.return = t, t.child = n, it = t, Ie = null)) : e = null, e === null) throw Kn(t);
          return t.lanes = 536870912, null;
        }
        return Ls(t, r);
      }
      var s = e.memoizedState;
      if (s !== null) {
        var i = s.dehydrated;
        if (mi(t), a) if (t.flags & 256) t.flags &= -257, t = Wf(e, t, n);
        else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
        else throw Error(c(558));
        else if ($e || Cr(e, t, n, !1), a = (n & e.childLanes) !== 0, $e || a) {
          if ($n.current === null) {
            if (r = Be, r !== null && (i = Lc(r, n), i !== 0 && i !== s.retryLane)) throw s.retryLane = i, wr(e, i), Lt(r, e, i), Ui;
            Zs();
          }
          t = Wf(e, t, n);
        } else e = s.treeContext, Ie = Xt(i.nextSibling), it = t, pe = !0, Jn = null, Jt = !1, e !== null && Pd(t, e), t = Ls(t, r), t.flags |= 134221824;
        return t;
      }
      return e = Ln(e.child, { mode: r.mode, children: r.children }), e.ref = t.ref, t.child = e, e.return = t, e;
    }
    function ga(e, t) {
      var n = t.ref;
      if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
      else {
        if (typeof n != "function" && typeof n != "object") throw Error(c(284));
        (e === null || e.ref !== n) && (t.flags |= 4194816);
      }
    }
    function Ii(e, t, n, r, a) {
      return Tr(t), n = bi(e, t, n, r, void 0, a), r = vi(), e !== null && !$e ? (xi(e, t, a), In(e, t, a)) : (pe && r && us(t), t.flags |= 1, rt(e, t, n, a), t.child);
    }
    function Qf(e, t, n, r, a, s) {
      return Tr(t), t.updateQueue = null, n = Zd(t, r, n, a), Kd(e), r = vi(), e !== null && !$e ? (xi(e, t, s), In(e, t, s)) : (pe && r && us(t), t.flags |= 1, rt(e, t, n, s), t.child);
    }
    function Gf(e, t, n, r, a) {
      if (Tr(t), t.stateNode === null) {
        var s = sa, i = n.contextType;
        typeof i == "object" && i !== null && (s = pt(i)), s = new n(r, s), t.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null, s.updater = Bi, t.stateNode = s, s._reactInternals = t, s = t.stateNode, s.props = r, s.state = t.memoizedState, s.refs = {}, ui(t), i = n.contextType, s.context = typeof i == "object" && i !== null ? pt(i) : sa, s.state = t.memoizedState, i = n.getDerivedStateFromProps, typeof i == "function" && (Ri(t, n, i, r), s.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof s.getSnapshotBeforeUpdate == "function" || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (i = s.state, typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount(), i !== s.state && Bi.enqueueReplaceState(s, s.state, null), ul(t, r, s, a), il(), s.state = t.memoizedState), typeof s.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
      } else if (e === null) {
        s = t.stateNode;
        var p = t.memoizedProps, g = Ur(n, p);
        s.props = g;
        var N = s.context, T = n.contextType;
        i = sa, typeof T == "object" && T !== null && (i = pt(T));
        var R = n.getDerivedStateFromProps;
        T = typeof R == "function" || typeof s.getSnapshotBeforeUpdate == "function", p = t.pendingProps !== p, T || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (p || N !== i) && zf(t, s, r, i), _n = !1;
        var w = t.memoizedState;
        s.state = w, ul(t, r, s, a), il(), N = t.memoizedState, p || w !== N || _n ? (typeof R == "function" && (Ri(t, n, R, r), N = t.memoizedState), (g = _n || Bf(t, n, g, r, w, N, i)) ? (T || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = N), s.props = r, s.state = N, s.context = i, r = g) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
      } else {
        s = t.stateNode, ci(e, t), i = t.memoizedProps, T = Ur(n, i), s.props = T, R = t.pendingProps, w = s.context, N = n.contextType, g = sa, typeof N == "object" && N !== null && (g = pt(N)), p = n.getDerivedStateFromProps, (N = typeof p == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (i !== R || w !== g) && zf(t, s, r, g), _n = !1, w = t.memoizedState, s.state = w, ul(t, r, s, a), il();
        var C = t.memoizedState;
        i !== R || w !== C || _n || e !== null && e.dependencies !== null && fs(e.dependencies) ? (typeof p == "function" && (Ri(t, n, p, r), C = t.memoizedState), (T = _n || Bf(t, n, T, r, w, C, g) || e !== null && e.dependencies !== null && fs(e.dependencies)) ? (N || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(r, C, g), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(r, C, g)), typeof s.componentDidUpdate == "function" && (t.flags |= 4), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || i === e.memoizedProps && w === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && w === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = C), s.props = r, s.state = C, s.context = g, r = T) : (typeof s.componentDidUpdate != "function" || i === e.memoizedProps && w === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && w === e.memoizedState || (t.flags |= 1024), r = !1);
      }
      return s = r, ga(e, t), r = (t.flags & 128) !== 0, s || r ? (s = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : s.render(), t.flags |= 1, e !== null && r ? (t.child = Pr(t, e.child, null, a), t.child = Pr(t, null, n, a)) : rt(e, t, n, a), t.memoizedState = s.state, e = t.child) : e = In(e, t, a), e;
    }
    function Yf(e, t, n, r) {
      return Nr(), t.flags |= 256, rt(e, t, n, r), t.child;
    }
    var Di = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
    function Fi(e) {
      return { baseLanes: e, cachePool: Dd() };
    }
    function Vi(e, t, n) {
      return e = e !== null ? e.childLanes & ~n : 0, t && (e |= Vt), e;
    }
    function Jf(e, t, n) {
      var r = t.pendingProps, a = !1, s = (t.flags & 128) !== 0, i;
      if ((i = s) || (i = e !== null && e.memoizedState === null ? !1 : (mt.current & 2) !== 0), i && (a = !0, t.flags &= -129), i = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
        if (pe) {
          if (a ? er(t) : tr(), (e = Ie) ? (e = bp(e, Jt), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = { dehydrated: e, treeContext: Yn !== null ? { id: hn, overflow: mn } : null, retryLane: 536870912, hydrationErrors: null }, n = Ed(e), n.return = t, t.child = n, it = t, Ie = null)) : e = null, e === null) throw Kn(t);
          return Fu(e) ? t.lanes = 32 : t.lanes = 536870912, null;
        }
        return s = r.children, r = r.fallback, a ? (tr(), a = t.mode, s = Ps({ mode: "hidden", children: s }, a), r = Sr(r, a, n, null), s.return = t, r.return = t, s.sibling = r, t.child = s, r = t.child, r.memoizedState = Fi(n), r.childLanes = Vi(e, i, n), t.memoizedState = Di, hl(null, r)) : (er(t), Oi(t, s));
      }
      var p = e.memoizedState;
      if (p !== null) {
        var g = p.dehydrated;
        if (g !== null) return ig(e, t, s, i, r, g, p, n);
      }
      return a ? (tr(), a = r.fallback, s = t.mode, p = e.child, g = p.sibling, r = Ln(p, { mode: "hidden", children: r.children }), r.subtreeFlags = p.subtreeFlags & 1206910976, g !== null ? a = Ln(g, a) : (a = Sr(a, s, n, null), a.flags |= 2), a.return = t, r.return = t, r.sibling = a, t.child = r, hl(null, r), r = t.child, a = e.child.memoizedState, a === null ? a = Fi(n) : (s = a.cachePool, s !== null ? (p = Xe._currentValue, s = s.parent !== p ? { parent: p, pool: p } : s) : s = Dd(), a = { baseLanes: a.baseLanes | n, cachePool: s }), r.memoizedState = a, r.childLanes = Vi(e, i, n), t.memoizedState = Di, hl(e.child, r)) : (er(t), n = e.child, e = n.sibling, n = Ln(n, { mode: "visible", children: r.children }), n.return = t, n.sibling = null, e !== null && (i = t.deletions, i === null ? (t.deletions = [e], t.flags |= 16) : i.push(e)), t.child = n, t.memoizedState = null, n);
    }
    function Oi(e, t) {
      return t = Ps({ mode: "visible", children: t }, e.mode), t.return = e, e.child = t;
    }
    function Ps(e, t) {
      return e = Tt(22, e, null, t), e.lanes = 0, e;
    }
    function Rs(e, t, n) {
      return Pr(t, e.child, null, n), e = Oi(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
    }
    function ig(e, t, n, r, a, s, i, p) {
      if (n) return t.flags & 256 ? (er(t), t.flags &= -257, Rs(e, t, p)) : t.memoizedState !== null ? (tr(), t.child = e.child, t.flags |= 128, null) : (tr(), s = a.fallback, i = t.mode, a = Ps({ mode: "visible", children: a.children }, i), s = Sr(s, i, p, null), s.flags |= 2, a.return = t, s.return = t, a.sibling = s, t.child = a, Pr(t, e.child, null, p), a = t.child, a.memoizedState = Fi(p), a.childLanes = Vi(e, r, p), t.memoizedState = Di, hl(null, a));
      if (er(t), Fu(s)) {
        if (r = s.nextSibling && s.nextSibling.dataset, r) var g = r.dgst;
        return r = g, r !== "" && (a = Error(c(419)), a.stack = "", a.digest = r, nl({ value: a, source: null, stack: null })), Rs(e, t, p);
      }
      if ($e || Cr(e, t, p, !1), r = (p & e.childLanes) !== 0, $e || r) {
        if ($n.current !== null) return Rs(e, t, p);
        if (r = Be, r !== null && (a = Lc(r, p), a !== 0 && a !== i.retryLane)) throw i.retryLane = a, wr(e, a), Lt(r, e, a), Ui;
        return Du(s) || Zs(), Rs(e, t, p);
      }
      return Du(s) ? (t.flags |= 192, t.child = e.child, null) : (e = i.treeContext, Ie = Xt(s.nextSibling), it = t, pe = !0, Jn = null, Jt = !1, e !== null && Pd(t, e), t = Oi(t, a.children), t.flags |= 134221824, t);
    }
    function Kf(e, t, n) {
      e.lanes |= t;
      var r = e.alternate;
      r !== null && (r.lanes |= t), ds(e.return, t, n);
    }
    function Zf(e) {
      for (var t = null; e !== null; ) {
        var n = e.alternate;
        n !== null && xs(n) === null && (t = e), e = e.sibling;
      }
      return t;
    }
    function Bs(e, t, n, r, a, s) {
      var i = e.memoizedState;
      i === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: a, treeForkCount: s } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = r, i.tail = n, i.tailMode = a, i.treeForkCount = s);
    }
    function Hi(e) {
      var t = e.child;
      for (e.child = null; t !== null; ) {
        var n = t.sibling;
        t.sibling = e.child, e.child = t, t = n;
      }
    }
    function qi(e, t, n) {
      var r = t.pendingProps, a = r.revealOrder, s = r.tail;
      r = r.children;
      var i = mt.current;
      if (t.flags & 128) return cl(t, i), null;
      var p = (i & 2) !== 0;
      if (p ? (i = i & 1 | 2, t.flags |= 128) : i &= 1, cl(t, i), a === "backwards" && e !== null ? (Hi(e), rt(e, t, r, n), Hi(e)) : rt(e, t, r, n), r = pe ? tl : 0, !p && e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Kf(e, n, t);
        else if (e.tag === 19) Kf(e, n, t);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
      switch (a) {
        case "backwards":
          n = Zf(t.child), n === null ? (a = t.child, t.child = null) : (a = n.sibling, n.sibling = null, Hi(t)), Bs(t, !0, a, null, s, r);
          break;
        case "unstable_legacy-backwards":
          for (n = null, a = t.child, t.child = null; a !== null; ) {
            if (e = a.alternate, e !== null && xs(e) === null) {
              t.child = a;
              break;
            }
            e = a.sibling, a.sibling = n, n = a, a = e;
          }
          Bs(t, !0, n, null, s, r);
          break;
        case "together":
          Bs(t, !1, null, null, void 0, r);
          break;
        case "independent":
          t.memoizedState = null;
          break;
        default:
          n = Zf(t.child), n === null ? (a = t.child, t.child = null) : (a = n.sibling, n.sibling = null), Bs(t, !1, a, n, s, r);
      }
      return t.child;
    }
    function Xf(e, t, n) {
      var r = t.pendingProps;
      return Zn(t, t.type, r.value), rt(e, t, r.children, n), t.child;
    }
    function In(e, t, n) {
      if (e !== null && (t.dependencies = e.dependencies), lr |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
        if (Cr(e, t, n, !1), (n & t.childLanes) === 0) return null;
      } else return null;
      if (e !== null && t.child !== e.child) throw Error(c(153));
      if (t.child !== null) {
        for (e = t.child, n = Ln(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = Ln(e, e.pendingProps), n.return = t;
        n.sibling = null;
      }
      return t.child;
    }
    function Wi(e, t) {
      return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && fs(e)));
    }
    function ug(e, t, n) {
      switch (t.tag) {
        case 3:
          Yr(t, t.stateNode.containerInfo), Zn(t, Xe, e.memoizedState.cache), Nr();
          break;
        case 27:
        case 5:
          gr(t);
          break;
        case 4:
          Yr(t, t.stateNode.containerInfo);
          break;
        case 10:
          Zn(t, t.type, t.memoizedProps.value);
          break;
        case 31:
          if (t.memoizedState !== null) return t.flags |= 128, mi(t), null;
          break;
        case 13:
          var r = t.memoizedState;
          if (r !== null) {
            if (r.dehydrated !== null) return er(t), t.flags |= 128, null;
            r = Cr(e, t, n, !1);
            var a = t.child.childLanes;
            return r || (n & a) !== 0 ? Jf(e, t, n) : (er(t), e = In(e, t, n), e !== null ? e.sibling : null);
          }
          er(t);
          break;
        case 19:
          if (t.flags & 128) return qi(e, t, n);
          if (a = (e.flags & 128) !== 0, r = (n & t.childLanes) !== 0, r || (Cr(e, t, n, !1), r = (n & t.childLanes) !== 0), a) {
            if (r) return qi(e, t, n);
            t.flags |= 128;
          }
          if (a = t.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), cl(t, mt.current), r) break;
          return null;
        case 22:
          return t.lanes = 0, Hf(e, t, n, t.pendingProps);
        case 24:
          Zn(t, Xe, e.memoizedState.cache);
      }
      return In(e, t, n);
    }
    function _f(e, t, n) {
      if (e !== null) if (e.memoizedProps !== t.pendingProps) $e = !0;
      else {
        if (!Wi(e, n) && (t.flags & 128) === 0) return $e = !1, ug(e, t, n);
        $e = (e.flags & 131072) !== 0;
      }
      else $e = !1, pe && (t.flags & 1048576) !== 0 && Ld(t, tl, t.index);
      switch (t.lanes = 0, t.tag) {
        case 16:
          e: {
            var r = t.pendingProps;
            if (e = Mr(t.elementType), t.type = e, typeof e == "function") Xo(e) ? (r = Ur(e, r), t.tag = 1, t = Gf(null, t, e, r, n)) : (t.tag = 0, t = Ii(null, t, e, r, n));
            else {
              if (e != null) {
                var a = e.$$typeof;
                if (a === ne) {
                  t.tag = 11, t = Ff(null, t, e, r, n);
                  break e;
                } else if (a === X) {
                  t.tag = 14, t = Vf(null, t, e, r, n);
                  break e;
                } else if (a === D) {
                  t.tag = 10, t.type = e, t = Xf(null, t, n);
                  break e;
                }
              }
              throw t = $(e) || e, Error(c(306, t, ""));
            }
          }
          return t;
        case 0:
          return Ii(e, t, t.type, t.pendingProps, n);
        case 1:
          return r = t.type, a = Ur(r, t.pendingProps), Gf(e, t, r, a, n);
        case 3:
          e: {
            if (Yr(t, t.stateNode.containerInfo), e === null) throw Error(c(387));
            r = t.pendingProps;
            var s = t.memoizedState;
            a = s.element, ci(e, t), ul(t, r, null, n);
            var i = t.memoizedState;
            if (r = i.cache, Zn(t, Xe, r), r !== s.cache && ai(t, [Xe], n, !0), il(), r = i.element, s.isDehydrated) if (s = { element: r, isDehydrated: !1, cache: i.cache }, t.updateQueue.baseState = s, t.memoizedState = s, t.flags & 256) {
              t = Yf(e, t, r, n);
              break e;
            } else if (r !== a) {
              a = Qt(Error(c(424)), t), nl(a), t = Yf(e, t, r, n);
              break e;
            } else {
              switch (e = t.stateNode.containerInfo, e.nodeType) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for (Ie = Xt(e.firstChild), it = t, pe = !0, Jn = null, Jt = !0, n = Wd(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 134221824, n = n.sibling;
            }
            else {
              if (Nr(), r === a) {
                t = In(e, t, n);
                break e;
              }
              rt(e, t, r, n);
            }
            t = t.child;
          }
          return t;
        case 26:
          return ga(e, t), e === null ? (n = Ap(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : pe || (t.stateNode = rp(t.type, t.pendingProps, fn.current, t)) : t.memoizedState = Ap(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
        case 27:
          return gr(t), e === null && pe && (r = t.stateNode = kp(t.type, t.pendingProps, fn.current), it = t, Jt = !0, a = Ie, ur(t.type) ? (Vu = a, Ie = Xt(r.firstChild)) : Ie = a), rt(e, t, t.pendingProps.children, n), ga(e, t), e === null && (t.flags |= 4194304), t.child;
        case 5:
          return e === null && pe && ((a = r = Ie) && (r = ty(r, t.type, t.pendingProps, Jt), r !== null ? (t.stateNode = r, it = t, Ie = Xt(r.firstChild), Jt = !1, a = !0) : a = !1), a || Kn(t)), gr(t), a = t.type, s = t.pendingProps, i = e !== null ? e.memoizedProps : null, r = s.children, Lu(a, s) ? r = null : i !== null && Lu(a, i) && (t.flags |= 32), t.memoizedState !== null && (a = bi(e, t, K1, null, null, n), Ba._currentValue = a), ga(e, t), rt(e, t, r, n), t.child;
        case 6:
          return e === null && pe && ((e = n = Ie) && (n = ny(n, t.pendingProps, Jt), n !== null ? (t.stateNode = n, it = t, Ie = null, e = !0) : e = !1), e || Kn(t)), null;
        case 13:
          return Jf(e, t, n);
        case 4:
          return Yr(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Pr(t, null, r, n) : rt(e, t, r, n), t.child;
        case 11:
          return Ff(e, t, t.type, t.pendingProps, n);
        case 7:
          return r = t.pendingProps, ga(e, t), rt(e, t, r, n), t.child;
        case 8:
          return rt(e, t, t.pendingProps.children, n), t.child;
        case 12:
          return rt(e, t, t.pendingProps.children, n), t.child;
        case 10:
          return Xf(e, t, n);
        case 9:
          return a = t.type._context, r = t.pendingProps.children, Tr(t), a = pt(a), r = r(a), t.flags |= 1, rt(e, t, r, n), t.child;
        case 14:
          return Vf(e, t, t.type, t.pendingProps, n);
        case 15:
          return Of(e, t, t.type, t.pendingProps, n);
        case 19:
          return qi(e, t, n);
        case 31:
          return og(e, t, n);
        case 22:
          return Hf(e, t, n, t.pendingProps);
        case 24:
          return Tr(t), r = pt(Xe), e === null ? (a = oi(), a === null && (a = Be, s = li(), a.pooledCache = s, s.refCount++, s !== null && (a.pooledCacheLanes |= n), a = s), t.memoizedState = { parent: r, cache: a }, ui(t), Zn(t, Xe, a)) : ((e.lanes & n) !== 0 && (ci(e, t), ul(t, null, null, n), il()), a = e.memoizedState, s = t.memoizedState, a.parent !== r ? (a = { parent: r, cache: r }, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), Zn(t, Xe, r)) : (r = s.cache, Zn(t, Xe, r), r !== a.cache && ai(t, [Xe], n, !0))), rt(e, t, t.pendingProps.children, n), t.child;
        case 30:
          return t.stateNode === null && (t.stateNode = { autoName: null, paired: null, clones: null, ref: null }), r = t.pendingProps, r.name != null && r.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : pe && us(t), e !== null && e.memoizedProps.name !== r.name ? t.flags |= 4194816 : ga(e, t), rt(e, t, r.children, n), t.child;
        case 29:
          throw t.pendingProps;
      }
      throw Error(c(156, t.tag));
    }
    function Dn(e) {
      e.flags |= 4;
    }
    function Qi(e, t, n, r, a) {
      var s;
      if ((s = (e.mode & 32) !== 0) && (s = n === null ? Ep(t, r) : Ep(t, r) && (r.src !== n.src || r.srcSet !== n.srcSet)), s) {
        if (e.flags |= 16777216, (a & 335544128) === a) if (e.stateNode.complete) e.flags |= 8192;
        else if (R0()) e.flags |= 8192;
        else throw Lr = gs, ii;
      } else e.flags &= -16777217;
    }
    function $f(e, t) {
      if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0) e.flags &= -16777217;
      else if (e.flags |= 16777216, !Mp(t)) if (R0()) e.flags |= 8192;
      else throw Lr = gs, ii;
    }
    function zs(e, t) {
      t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? jc() : 536870912, e.lanes |= t, ka |= t);
    }
    function ml(e, t) {
      if (!pe) switch (e.tailMode) {
        case "visible":
          break;
        case "collapsed":
          for (var n = e.tail, r = null; n !== null; ) n.alternate !== null && (r = n), n = n.sibling;
          r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
          break;
        default:
          for (t = e.tail, n = null; t !== null; ) t.alternate !== null && (n = t), t = t.sibling;
          n === null ? e.tail = null : n.sibling = null;
      }
    }
    function De(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
      if (t) for (var a = e.child; a !== null; ) n |= a.lanes | a.childLanes, r |= a.subtreeFlags & 1206910976, r |= a.flags & 1206910976, a.return = e, a = a.sibling;
      else for (a = e.child; a !== null; ) n |= a.lanes | a.childLanes, r |= a.subtreeFlags, r |= a.flags, a.return = e, a = a.sibling;
      return e.subtreeFlags |= r, e.childLanes = n, t;
    }
    function cg(e, t, n) {
      var r = t.pendingProps;
      switch (ei(t), t.tag) {
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return De(t), null;
        case 1:
          return De(t), null;
        case 3:
          return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Bn(Xe), An(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (ua(t) ? Dn(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, ni())), De(t), null;
        case 26:
          var a = t.type, s = t.memoizedState;
          return e === null ? (Dn(t), s !== null ? (De(t), $f(t, s)) : (De(t), Qi(t, a, null, r, n))) : s ? s !== e.memoizedState ? (Dn(t), De(t), $f(t, s)) : (De(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== r && Dn(t), De(t), Qi(t, a, e, r, n)), null;
        case 27:
          if (Jr(t), n = fn.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Dn(t);
          else {
            if (!r) {
              if (t.stateNode === null) throw Error(c(166));
              return De(t), t.subtreeFlags &= -33554433, null;
            }
            e = qt.current, ua(t) ? Rd(t, e) : (e = kp(a, r, n), t.stateNode = e, Dn(t));
          }
          return De(t), t.subtreeFlags &= -33554433, null;
        case 5:
          if (Jr(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Dn(t);
          else {
            if (!r) {
              if (t.stateNode === null) throw Error(c(166));
              return De(t), t.subtreeFlags &= -33554433, null;
            }
            if (s = qt.current, ua(t)) Rd(t, s);
            else {
              var i = Cl(fn.current);
              switch (s) {
                case 1:
                  s = i.createElementNS("http://www.w3.org/2000/svg", a);
                  break;
                case 2:
                  s = i.createElementNS("http://www.w3.org/1998/Math/MathML", a);
                  break;
                default:
                  switch (a) {
                    case "svg":
                      s = i.createElementNS("http://www.w3.org/2000/svg", a);
                      break;
                    case "math":
                      s = i.createElementNS("http://www.w3.org/1998/Math/MathML", a);
                      break;
                    case "script":
                      s = i.createElement("div"), s.innerHTML = "<script><\/script>", s = s.removeChild(s.firstChild);
                      break;
                    case "select":
                      s = typeof r.is == "string" ? i.createElement("select", { is: r.is }) : i.createElement("select"), r.multiple ? s.multiple = !0 : r.size && (s.size = r.size);
                      break;
                    default:
                      s = typeof r.is == "string" ? i.createElement(a, { is: r.is }) : i.createElement(a);
                  }
              }
              s[ft] = t, s[Ct] = r;
              e: for (i = t.child; i !== null; ) {
                if (i.tag === 5 || i.tag === 6) s.appendChild(i.stateNode);
                else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
                  i.child.return = i, i = i.child;
                  continue;
                }
                if (i === t) break e;
                for (; i.sibling === null; ) {
                  if (i.return === null || i.return === t) break e;
                  i = i.return;
                }
                i.sibling.return = i.return, i = i.sibling;
              }
              t.stateNode = s;
              e: switch (yt(s, a, r), a) {
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
              r && Dn(t);
            }
          }
          return De(t), t.subtreeFlags &= -33554433, Qi(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
        case 6:
          if (e && t.stateNode != null) e.memoizedProps !== r && Dn(t);
          else {
            if (typeof r != "string" && t.stateNode === null) throw Error(c(166));
            if (e = fn.current, ua(t)) {
              if (e = t.stateNode, n = t.memoizedProps, r = null, a = it, a !== null) switch (a.tag) {
                case 27:
                case 5:
                  r = a.memoizedProps;
              }
              e[ft] = t, e = !!(e.nodeValue === n || r !== null && r.suppressHydrationWarning === !0 || $0(e.nodeValue, n)), e || Kn(t, !0);
            } else e = Cl(e).createTextNode(r), e[ft] = t, t.stateNode = e;
          }
          return De(t), null;
        case 31:
          if (n = t.memoizedState, e === null || e.memoizedState !== null) {
            if (r = ua(t), n !== null) {
              if (e === null) {
                if (!r) throw Error(c(318));
                if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(557));
                e[ft] = t;
              } else Nr(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
              De(t), e = !1;
            } else n = ni(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
            if (!e) return t.flags & 256 ? (It(t), t) : (It(t), null);
            if ((t.flags & 128) !== 0) throw Error(c(558));
          }
          return De(t), null;
        case 13:
          if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            if (a = ua(t), r !== null && r.dehydrated !== null) {
              if (e === null) {
                if (!a) throw Error(c(318));
                if (a = t.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(c(317));
                a[ft] = t;
              } else Nr(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
              De(t), a = !1;
            } else a = ni(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
            if (!a) return t.flags & 256 ? (It(t), t) : (It(t), null);
          }
          return It(t), (t.flags & 128) !== 0 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), s = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (s = r.memoizedState.cachePool.pool), s !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), zs(t, t.updateQueue), De(t), null);
        case 4:
          return An(), e === null && K0(t.stateNode.containerInfo), t.flags |= 67108864, De(t), null;
        case 10:
          return Bn(t.type), De(t), null;
        case 19:
          if (gi(t), r = t.memoizedState, r === null) return De(t), null;
          if (a = (t.flags & 128) !== 0, s = r.rendering, s === null) if (a) ml(r, !1);
          else {
            if (Je !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
              if (s = xs(e), s !== null) {
                for (t.flags |= 128, ml(r, !1), e = s.updateQueue, t.updateQueue = e, zs(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null; ) jd(n, e), n = n.sibling;
                return cl(t, mt.current & 1 | 2), pe && Pn(t, r.treeForkCount), t.child;
              }
              e = e.sibling;
            }
            r.tail !== null && Pt() > Gs && (t.flags |= 128, a = !0, ml(r, !1), t.lanes = 4194304);
          }
          else {
            if (!a) if (e = xs(s), e !== null) {
              if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, zs(t, e), ml(r, !0), r.tail === null && r.tailMode !== "collapsed" && r.tailMode !== "visible" && !s.alternate && !pe) return De(t), null;
            } else 2 * Pt() - r.renderingStartTime > Gs && n !== 536870912 && (t.flags |= 128, a = !0, ml(r, !1), t.lanes = 4194304);
            r.isBackwards ? (s.sibling = t.child, t.child = s) : (e = r.last, e !== null ? e.sibling = s : t.child = s, r.last = s);
          }
          if (r.tail !== null) {
            e = r.tail;
            e: {
              for (n = e; n !== null; ) {
                if (n.alternate !== null) {
                  n = !1;
                  break e;
                }
                n = n.sibling;
              }
              n = !0;
            }
            return r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Pt(), e.sibling = null, s = mt.current, s = a ? s & 1 | 2 : s & 1, r.tailMode === "visible" || r.tailMode === "collapsed" || !n || pe ? cl(t, s) : (n = s, ke(ht, t), ke(mt, n), wt === null && (wt = t)), pe && Pn(t, r.treeForkCount), e;
          }
          return De(t), null;
        case 22:
        case 23:
          return It(t), hi(), r = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== r && (t.flags |= 8192) : r && (t.flags |= 8192), r ? (n & 536870912) !== 0 && (t.flags & 128) === 0 && (De(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : De(t), n = t.updateQueue, n !== null && zs(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && Ge(Er), null;
        case 24:
          return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Bn(Xe), De(t), null;
        case 25:
          return null;
        case 30:
          return t.flags |= 33554432, De(t), null;
      }
      throw Error(c(156, t.tag));
    }
    function dg(e, t) {
      switch (ei(t), t.tag) {
        case 1:
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 3:
          return Bn(Xe), An(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
        case 26:
        case 27:
        case 5:
          return Jr(t), null;
        case 31:
          if (t.memoizedState !== null) {
            if (It(t), t.alternate === null) throw Error(c(340));
            Nr();
          }
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 13:
          if (It(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
            if (t.alternate === null) throw Error(c(340));
            Nr();
          }
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 19:
          return gi(t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null), t.flags |= 4, t) : null;
        case 4:
          return An(), null;
        case 10:
          return Bn(t.type), null;
        case 22:
        case 23:
          return It(t), hi(), e !== null && Ge(Er), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 24:
          return Bn(Xe), null;
        case 25:
          return null;
        default:
          return null;
      }
    }
    function e0(e, t) {
      switch (ei(t), t.tag) {
        case 3:
          Bn(Xe), An();
          break;
        case 26:
        case 27:
        case 5:
          Jr(t);
          break;
        case 4:
          An();
          break;
        case 31:
          t.memoizedState !== null && It(t);
          break;
        case 13:
          It(t);
          break;
        case 19:
          gi(t);
          break;
        case 10:
          Bn(t.type);
          break;
        case 22:
        case 23:
          It(t), hi(), e !== null && Ge(Er);
          break;
        case 24:
          Bn(Xe);
      }
    }
    function gl(e, t) {
      try {
        var n = t.updateQueue, r = n !== null ? n.lastEffect : null;
        if (r !== null) {
          var a = r.next;
          n = a;
          do {
            if ((n.tag & e) === e) {
              r = void 0;
              var s = n.create, i = n.inst;
              r = s(), i.destroy = r;
            }
            n = n.next;
          } while (n !== a);
        }
      } catch (p) {
        Me(t, t.return, p);
      }
    }
    function nr(e, t, n) {
      try {
        var r = t.updateQueue, a = r !== null ? r.lastEffect : null;
        if (a !== null) {
          var s = a.next;
          r = s;
          do {
            if ((r.tag & e) === e) {
              var i = r.inst, p = i.destroy;
              if (p !== void 0) {
                i.destroy = void 0, a = t;
                var g = n, N = p;
                try {
                  N();
                } catch (T) {
                  Me(a, g, T);
                }
              }
            }
            r = r.next;
          } while (r !== s);
        }
      } catch (T) {
        Me(t, t.return, T);
      }
    }
    function t0(e) {
      var t = e.updateQueue;
      if (t !== null) {
        var n = e.stateNode;
        try {
          Gd(t, n);
        } catch (r) {
          Me(e, e.return, r);
        }
      }
    }
    function n0(e, t, n) {
      n.props = Ur(e.type, e.memoizedProps), n.state = e.memoizedState;
      try {
        n.componentWillUnmount();
      } catch (r) {
        Me(e, t, r);
      }
    }
    function gn(e, t) {
      try {
        var n = e.ref;
        if (n !== null) {
          switch (e.tag) {
            case 26:
            case 27:
            case 5:
              var r = e.stateNode;
              break;
            case 30:
              var a = e.stateNode, s = En(e.memoizedProps, a);
              (a.ref === null || a.ref.name !== s) && (a.ref = dp(s)), r = a.ref;
              break;
            case 7:
              if (e.stateNode === null) {
                var i = new Ot(e);
                y(e.child, !1, $g, i, void 0, void 0), e.stateNode = i;
              }
              r = e.stateNode;
              break;
            default:
              r = e.stateNode;
          }
          typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
        }
      } catch (p) {
        Me(e, t, p);
      }
    }
    function gt(e, t) {
      var n = e.ref, r = e.refCleanup;
      if (n !== null) if (typeof r == "function") try {
        r();
      } catch (a) {
        Me(e, t, a);
      } finally {
        e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
      }
      else if (typeof n == "function") try {
        n(null);
      } catch (a) {
        Me(e, t, a);
      }
      else n.current = null;
    }
    function Us(e, t) {
      if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && t !== null) for (var n = 0; n < t.length; n++) yp(e.stateNode, t[n]);
    }
    function r0(e) {
      for (var t = e.return; t !== null && (Yi(t) && yp(e.stateNode, t.stateNode), !Gi(t)); ) t = t.return;
    }
    function yl(e) {
      for (var t = e.return; t !== null && (Yi(t) && ey(e.stateNode, t.stateNode), !Gi(t)); ) t = t.return;
    }
    function Gi(e) {
      return e.tag === 5 || e.tag === 3 || e.tag === 27;
    }
    function Yi(e) {
      return e && e.tag === 7 && e.stateNode !== null;
    }
    function Ji(e) {
      var t = e.type, n = e.memoizedProps, r = e.stateNode;
      try {
        e: switch (t) {
          case "button":
          case "input":
          case "select":
          case "textarea":
            n.autoFocus && r.focus();
            break e;
          case "img":
            n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
        }
      } catch (a) {
        Me(e, e.return, a);
      }
    }
    function Ki(e, t, n) {
      try {
        var r = e.stateNode;
        zg(r, e.type, n, t), r[Ct] = t;
      } catch (a) {
        Me(e, e.return, a);
      }
    }
    function a0(e) {
      return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && ur(e.type) || e.tag === 4;
    }
    function Zi(e) {
      e: for (; ; ) {
        for (; e.sibling === null; ) {
          if (e.return === null || a0(e.return)) return null;
          e = e.return;
        }
        for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
          if (e.tag === 27 && ur(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
          e.child.return = e, e = e.child;
        }
        if (!(e.flags & 2)) return e.stateNode;
      }
    }
    function Xi(e, t, n, r) {
      var a = e.tag;
      if (a === 5 || a === 6) a = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(a, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(a), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = pn)), Us(e, r), we = !0;
      else if (a !== 4 && (a === 27 && (Us(e, r), r = null, ur(e.type) && (n = e.stateNode, t = null)), e = e.child, e !== null)) for (Xi(e, t, n, r), e = e.sibling; e !== null; ) Xi(e, t, n, r), e = e.sibling;
    }
    function Is(e, t, n, r) {
      var a = e.tag;
      if (a === 5 || a === 6) a = e.stateNode, t ? n.insertBefore(a, t) : n.appendChild(a), Us(e, r), we = !0;
      else if (a !== 4 && (a === 27 && (Us(e, r), r = null, ur(e.type) && (n = e.stateNode)), e = e.child, e !== null)) for (Is(e, t, n, r), e = e.sibling; e !== null; ) Is(e, t, n, r), e = e.sibling;
    }
    function l0(e) {
      var t = e.stateNode, n = e.memoizedProps;
      try {
        for (var r = e.type, a = t.attributes; a.length; ) t.removeAttributeNode(a[0]);
        yt(t, r, n), t[ft] = e, t[Ct] = n;
      } catch (s) {
        Me(e, e.return, s);
      }
    }
    var Ds = !1, Dt = null;
    function s0(e) {
      (e.tag === 30 || (e.subtreeFlags & 33554432) !== 0) && (Ds = !0);
    }
    var yn = null;
    function o0() {
      var e = yn;
      return yn = null, e;
    }
    var jt = 0;
    function ya(e, t, n, r, a) {
      return jt = 0, i0(e.child, t, n, r, a);
    }
    function i0(e, t, n, r, a) {
      for (var s = !1; e !== null; ) {
        if (e.tag === 5) {
          var i = e.stateNode;
          if (r !== null) {
            var p = Bu(i);
            r.push(p), p.view && (s = !0);
          } else s || Bu(i).view && (s = !0);
          Ds = !0, ip(i, jt === 0 ? t : t + "_" + jt, n), jt++;
        } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && a || i0(e.child, t, n, r, a) && (s = !0));
        e = e.sibling;
      }
      return s;
    }
    function bn(e, t) {
      for (; e !== null; ) e.tag === 5 ? up(e.stateNode, e.memoizedProps) : (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && t || bn(e.child, t)), e = e.sibling;
    }
    function Fs(e) {
      if ((e.subtreeFlags & 18874368) !== 0) for (e = e.child; e !== null; ) {
        if ((e.tag !== 22 || e.memoizedState === null) && (Fs(e), e.tag === 30 && (e.flags & 18874368) !== 0 && e.stateNode.paired)) {
          var t = e.memoizedProps;
          if (t.name == null || t.name === "auto") throw Error(c(544));
          var n = t.name;
          t = Mn(t.default, t.share), t !== "none" && (ya(e, n, t, null, !1) || bn(e.child, !1));
        }
        e = e.sibling;
      }
    }
    function _i(e, t) {
      if (e.tag === 30) {
        var n = e.stateNode, r = e.memoizedProps, a = En(r, n), s = Mn(r.default, n.paired ? r.share : r.enter);
        s !== "none" ? ya(e, a, s, null, !1) ? (Fs(e), n.paired || t || Aa(e, r.onEnter)) : bn(e.child, !1) : Fs(e);
      } else if ((e.subtreeFlags & 33554432) !== 0) for (e = e.child; e !== null; ) _i(e, t), e = e.sibling;
      else Fs(e);
    }
    function $i(e) {
      if (Dt !== null && Dt.size !== 0) {
        var t = Dt;
        if ((e.subtreeFlags & 18874368) !== 0) for (e = e.child; e !== null; ) {
          if (e.tag !== 22 || e.memoizedState === null) {
            if (e.tag === 30 && (e.flags & 18874368) !== 0) {
              var n = e.memoizedProps, r = n.name;
              if (r != null && r !== "auto") {
                var a = t.get(r);
                if (a !== void 0) {
                  var s = Mn(n.default, n.share);
                  if (s !== "none" && (ya(e, r, s, null, !1) ? (s = e.stateNode, a.paired = s, s.paired = a, Aa(e, n.onShare)) : bn(e.child, !1)), t.delete(r), t.size === 0) break;
                }
              }
            }
            $i(e);
          }
          e = e.sibling;
        }
      }
    }
    function eu(e) {
      if (e.tag === 30) {
        var t = e.memoizedProps, n = En(t, e.stateNode), r = Dt !== null ? Dt.get(n) : void 0, a = Mn(t.default, r !== void 0 ? t.share : t.exit);
        a !== "none" && (ya(e, n, a, null, !1) ? r !== void 0 ? (a = e.stateNode, r.paired = a, a.paired = r, Dt.delete(n), Aa(e, t.onShare)) : Aa(e, t.onExit) : bn(e.child, !1)), Dt !== null && $i(e);
      } else if ((e.subtreeFlags & 33554432) !== 0) for (e = e.child; e !== null; ) eu(e), e = e.sibling;
      else Dt !== null && $i(e);
    }
    function u0(e) {
      for (e = e.child; e !== null; ) {
        if (e.tag === 30) {
          var t = e.memoizedProps, n = En(t, e.stateNode);
          t = Mn(t.default, t.update), e.flags &= -5, t !== "none" && ya(e, n, t, e.memoizedState = [], !1);
        } else (e.subtreeFlags & 33554432) !== 0 && u0(e);
        e = e.sibling;
      }
    }
    function tu(e) {
      if ((e.subtreeFlags & 18874368) !== 0) for (e = e.child; e !== null; ) {
        if (e.tag !== 22 || e.memoizedState === null) {
          if (e.tag === 30 && (e.flags & 18874368) !== 0) {
            var t = e.stateNode;
            t.paired !== null && (t.paired = null, bn(e.child, !1));
          }
          tu(e);
        }
        e = e.sibling;
      }
    }
    function Vs(e) {
      if (e.tag === 30) e.stateNode.paired = null, bn(e.child, !1), tu(e);
      else if ((e.subtreeFlags & 33554432) !== 0) for (e = e.child; e !== null; ) Vs(e), e = e.sibling;
      else tu(e);
    }
    function c0(e) {
      for (e = e.child; e !== null; ) e.tag === 30 ? bn(e.child, !1) : (e.subtreeFlags & 33554432) !== 0 && c0(e), e = e.sibling;
    }
    function nu(e, t, n, r, a, s, i) {
      for (var p = !1; t !== null; ) {
        if (t.tag === 5) {
          var g = t.stateNode;
          if (s !== null && jt < s.length) {
            var N = s[jt], T = Bu(g);
            (N.view || T.view) && (p = !0);
            var R;
            if (R = (e.flags & 4) === 0) if (T.clip) R = !0;
            else {
              R = N.rect;
              var w = T.rect;
              R = R.y !== w.y || R.x !== w.x || R.height !== w.height || R.width !== w.width;
            }
            R && (e.flags |= 4), T.abs ? T = !N.abs : (N = N.rect, T = T.rect, T = N.height !== T.height || N.width !== T.width), T && (e.flags |= 32);
          } else e.flags |= 32;
          (e.flags & 4) !== 0 && ip(g, jt === 0 ? n : n + "_" + jt, a), p && (e.flags & 4) !== 0 || (yn === null && (yn = []), yn.push(g, jt === 0 ? r : r + "_" + jt, t.memoizedProps)), jt++;
        } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && i ? e.flags |= t.flags & 32 : nu(e, t.child, n, r, a, s, i) && (p = !0));
        t = t.sibling;
      }
      return p;
    }
    function d0(e, t) {
      for (e = e.child; e !== null; ) {
        if (e.tag === 30) {
          var n = e.memoizedProps, r = e.stateNode, a = En(n, r), s = Mn(n.default, n.update);
          if (t) {
            r = r.clones;
            var i = r === null ? null : r.map(Og);
          } else i = e.memoizedState, e.memoizedState = null;
          r = e;
          var p = e.child;
          jt = 0, a = nu(r, p, a, a, s, i, !1), (e.flags & 4) !== 0 && a && (t || Aa(e, n.onUpdate));
        } else (e.subtreeFlags & 33554432) !== 0 && d0(e, t);
        e = e.sibling;
      }
    }
    var ut = !1, Te = !1, vn = !1, ru = !1, f0 = typeof WeakSet == "function" ? WeakSet : Set, ct = null, xn = !1, bl = !1, Os = !1, au = !1;
    function fg(e, t, n) {
      if (e = e.containerInfo, Eu = za, e = bd(e), Wo(e)) {
        if ("selectionStart" in e) var r = { start: e.selectionStart, end: e.selectionEnd };
        else e: {
          r = (r = e.ownerDocument) && r.defaultView || window;
          var a = r.getSelection && r.getSelection();
          if (a && a.rangeCount !== 0) {
            r = a.anchorNode;
            var s = a.anchorOffset, i = a.focusNode;
            a = a.focusOffset;
            try {
              r.nodeType, i.nodeType;
            } catch {
              r = null;
              break e;
            }
            var p = 0, g = -1, N = -1, T = 0, R = 0, w = e, C = null;
            t: for (; ; ) {
              for (var V; w !== r || s !== 0 && w.nodeType !== 3 || (g = p + s), w !== i || a !== 0 && w.nodeType !== 3 || (N = p + a), w.nodeType === 3 && (p += w.nodeValue.length), (V = w.firstChild) !== null; ) C = w, w = V;
              for (; ; ) {
                if (w === e) break t;
                if (C === r && ++T === s && (g = p), C === i && ++R === a && (N = p), (V = w.nextSibling) !== null) break;
                w = C, C = w.parentNode;
              }
              w = V;
            }
            r = g === -1 || N === -1 ? null : { start: g, end: N };
          } else r = null;
        }
        r = r || { start: 0, end: 0 };
      } else r = null;
      for (Mu = { focusedElem: e, selectionRange: r }, za = !1, n = (n & 335544064) === n, ct = t, t = n ? 9270 : 1024; ct !== null; ) {
        if (e = ct, n && (r = e.deletions, r !== null)) for (s = 0; s < r.length; s++) n && eu(r[s]);
        if (e.alternate === null && (e.flags & 2) !== 0) n && s0(e), Hs(n);
        else {
          if (e.tag === 22) {
            if (r = e.alternate, e.memoizedState !== null) {
              r !== null && r.memoizedState === null && n && eu(r), Hs(n);
              continue;
            } else if (r !== null && r.memoizedState !== null) {
              n && s0(e), Hs(n);
              continue;
            }
          }
          r = e.child, (e.subtreeFlags & t) !== 0 && r !== null ? (r.return = e, ct = r) : (n && u0(e), Hs(n));
        }
      }
      Dt = null;
    }
    function Hs(e) {
      for (; ct !== null; ) {
        var t = ct, n = e, r = t.alternate, a = t.flags;
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if ((a & 1024) !== 0 && r !== null) {
              n = void 0, a = r.memoizedProps, r = r.memoizedState;
              var s = t.stateNode;
              try {
                var i = Ur(t.type, a);
                n = s.getSnapshotBeforeUpdate(i, r), s.__reactInternalSnapshotBeforeUpdate = n;
              } catch (p) {
                Me(t, t.return, p);
              }
            }
            break;
          case 3:
            if ((a & 1024) !== 0) {
              if (r = t.stateNode.containerInfo, n = r.nodeType, n === 9) Iu(r);
              else if (n === 1) switch (r.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  Iu(r);
                  break;
                default:
                  r.textContent = "";
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
            n && r !== null && (n = En(r.memoizedProps, r.stateNode), a = t.memoizedProps, a = Mn(a.default, a.update), a !== "none" && ya(r, n, a, r.memoizedState = [], !0));
            break;
          default:
            if ((a & 1024) !== 0) throw Error(c(163));
        }
        if (r = t.sibling, r !== null) {
          r.return = t.return, ct = r;
          break;
        }
        ct = t.return;
      }
    }
    function p0(e, t, n) {
      var r = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          kn(e, n), r & 4 && gl(5, n);
          break;
        case 1:
          if (kn(e, n), r & 4) if (e = n.stateNode, t === null) try {
            e.componentDidMount();
          } catch (i) {
            Me(n, n.return, i);
          }
          else {
            var a = Ur(n.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(a, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (i) {
              Me(n, n.return, i);
            }
          }
          r & 64 && t0(n), r & 512 && gn(n, n.return);
          break;
        case 3:
          if (kn(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
            if (t = null, n.child !== null) switch (n.child.tag) {
              case 27:
              case 5:
                t = n.child.stateNode;
                break;
              case 1:
                t = n.child.stateNode;
            }
            try {
              Gd(e, t);
            } catch (i) {
              Me(n, n.return, i);
            }
          }
          break;
        case 27:
          t === null && r & 4 && l0(n);
        case 26:
        case 5:
          kn(e, n), t === null && r & 4 && Ji(n), r & 512 && gn(n, n.return);
          break;
        case 12:
          kn(e, n);
          break;
        case 31:
          kn(e, n), r & 4 && y0(e, n);
          break;
        case 13:
          kn(e, n), r & 4 && b0(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = Ng.bind(null, n), ry(e, n))));
          break;
        case 22:
          if (r = n.memoizedState !== null || ut, !r) {
            var s = t !== null && t.memoizedState !== null || Te;
            t = ut, a = Te, ut = r, (Te = s) && !a ? (r = 2, (n.subtreeFlags & 8772) !== 0 && (r |= 1), ln(e, n, r)) : kn(e, n), ut = t, Te = a;
          }
          break;
        case 30:
          kn(e, n), r & 512 && gn(n, n.return);
          break;
        case 7:
          r & 512 && gn(n, n.return);
        default:
          kn(e, n);
      }
    }
    function lu(e, t) {
      for (e = e.child; e !== null; ) h0(e, t), e = e.sibling;
    }
    function h0(e, t) {
      switch (e.tag) {
        case 5:
        case 26:
          try {
            var n = e.stateNode;
            if (t) {
              var r = n.style;
              typeof r.setProperty == "function" ? r.setProperty("display", "none", "important") : r.display = "none";
            } else {
              var a = e.stateNode, s = e.memoizedProps.style, i = s != null && s.hasOwnProperty("display") ? s.display : null;
              a.style.display = i == null || typeof i == "boolean" ? "" : ("" + i).trim();
            }
          } catch (g) {
            Me(e, e.return, g);
          }
          su(e, t);
          break;
        case 6:
          try {
            e.stateNode.nodeValue = t ? "" : e.memoizedProps, we = !0;
          } catch (g) {
            Me(e, e.return, g);
          }
          break;
        case 18:
          try {
            var p = e.stateNode;
            t ? op(p, !0) : op(e.stateNode, !1);
          } catch (g) {
            Me(e, e.return, g);
          }
          break;
        case 22:
        case 23:
          e.memoizedState === null && lu(e, t);
          break;
        default:
          lu(e, t);
      }
    }
    function su(e, t) {
      if (e.subtreeFlags & 67108864) for (e = e.child; e !== null; ) {
        e: {
          var n = e, r = t;
          switch (n.tag) {
            case 4:
              h0(n, r);
              break e;
            case 22:
              n.memoizedState === null && su(n, r);
              break e;
            default:
              su(n, r);
          }
        }
        e = e.sibling;
      }
    }
    function m0(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, m0(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Yl(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
    var Oe = null, Et = !1;
    function rn(e, t, n) {
      for (n = n.child; n !== null; ) g0(e, t, n), n = n.sibling;
    }
    function g0(e, t, n) {
      if (Rt && typeof Rt.onCommitFiberUnmount == "function") try {
        Rt.onCommitFiberUnmount(Oa, n);
      } catch {
      }
      switch (n.tag) {
        case 26:
          Te || gt(n, t), rn(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !Te && (n = n.stateNode, n.parentNode.removeChild(n));
          break;
        case 27:
          Te || gt(n, t), yl(n);
          var r = Oe, a = Et;
          ur(n.type) && (Oe = n.stateNode, Et = !1), rn(e, t, n), wp(n.stateNode, n.type, n.memoizedProps), Oe = r, Et = a;
          break;
        case 5:
          Te || gt(n, t), yl(n);
        case 6:
          if (n.tag === 6 && yl(n), r = Oe, a = Et, Oe = null, rn(e, t, n), Oe = r, Et = a, Oe !== null) if (Et) try {
            (Oe.nodeType === 9 ? Oe.body : Oe.nodeName === "HTML" ? Oe.ownerDocument.body : Oe).removeChild(n.stateNode), we = !0;
          } catch (s) {
            Me(n, t, s);
          }
          else try {
            Oe.removeChild(n.stateNode), we = !0;
          } catch (s) {
            Me(n, t, s);
          }
          break;
        case 18:
          Oe !== null && (Et ? (e = Oe, sp(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Ua(e)) : sp(Oe, n.stateNode));
          break;
        case 4:
          r = Oe, a = Et, Oe = n.stateNode.containerInfo, Et = !0, rn(e, t, n), Oe = r, Et = a;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          nr(2, n, t), Te || nr(4, n, t), rn(e, t, n);
          break;
        case 1:
          Te || (gt(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && n0(n, t, r)), rn(e, t, n);
          break;
        case 21:
          rn(e, t, n);
          break;
        case 22:
          Te = (r = Te) || n.memoizedState !== null, rn(e, t, n), Te = r;
          break;
        case 30:
          gt(n, t), rn(e, t, n);
          break;
        case 7:
          Te || gt(n, t), rn(e, t, n);
          break;
        default:
          rn(e, t, n);
      }
    }
    function y0(e, t) {
      if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
        e = e.dehydrated;
        try {
          Ua(e);
        } catch (n) {
          Me(t, t.return, n);
        }
      }
    }
    function b0(e, t) {
      if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
        Ua(e);
      } catch (n) {
        Me(t, t.return, n);
      }
    }
    function pg(e) {
      switch (e.tag) {
        case 31:
        case 13:
        case 19:
          var t = e.stateNode;
          return t === null && (t = e.stateNode = new f0()), t;
        case 22:
          return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new f0()), t;
        default:
          throw Error(c(435, e.tag));
      }
    }
    function qs(e, t) {
      var n = pg(e);
      t.forEach(function(r) {
        if (!n.has(r)) {
          n.add(r);
          var a = Ag.bind(null, e, r);
          r.then(a, a);
        }
      });
    }
    function Nt(e, t, n) {
      var r = t.deletions;
      if (r !== null) for (var a = 0; a < r.length; a++) {
        var s = r[a], i = e, p = t, g = p;
        e: for (; g !== null; ) {
          switch (g.tag) {
            case 27:
              if (ur(g.type)) {
                Oe = g.stateNode, Et = !1;
                break e;
              }
              break;
            case 5:
              Oe = g.stateNode, Et = !1;
              break e;
            case 3:
            case 4:
              Oe = g.stateNode.containerInfo, Et = !0;
              break e;
          }
          g = g.return;
        }
        if (Oe === null) throw Error(c(160));
        g0(i, p, s), Oe = null, Et = !1, i = s.alternate, i !== null && (i.return = null), s.return = null;
      }
      if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) v0(t, e, n), t = t.sibling;
    }
    var an = null;
    function v0(e, t, n) {
      var r = e.alternate, a = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          if (a & 4 && (r = e.updateQueue, r = r !== null ? r.events : null, r !== null)) for (var s = 0; s < r.length; s++) {
            var i = r[s];
            i.ref.impl = i.nextImpl;
          }
          Nt(t, e, n), At(e), a & 4 && (nr(3, e, e.return), gl(3, e), nr(5, e, e.return));
          break;
        case 1:
          Nt(t, e, n), At(e), a & 512 && (Te || r === null || gt(r, r.return)), a & 64 && ut && (e = e.updateQueue, e !== null && (t = e.callbacks, t !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? t : n.concat(t))));
          break;
        case 26:
          if (s = an, Nt(t, e, n), At(e), a & 512 && (Te || r === null || gt(r, r.return)), a & 4) if (a = r !== null ? r.memoizedState : null, n = e.memoizedState, r === null) if (n === null) if (e.stateNode === null) if (ut) e.stateNode = rp(e.type, e.memoizedProps, t.containerInfo, e);
          else {
            e: {
              t = e.type, n = e.memoizedProps, a = s.ownerDocument || s;
              t: switch (t) {
                case "title":
                  r = a.getElementsByTagName("title")[0], (!r || r[Wa] || r[ft] || r.namespaceURI === "http://www.w3.org/2000/svg" || r.hasAttribute("itemprop")) && (r = a.createElement(t), a.head.insertBefore(r, a.querySelector("head > title"))), yt(r, t, n), r[ft] = e, ot(r), t = r;
                  break e;
                case "link":
                  if (s = jp("link", "href", a).get(t + (n.href || ""))) {
                    for (i = 0; i < s.length; i++) if (r = s[i], r.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && r.getAttribute("rel") === (n.rel == null ? null : n.rel) && r.getAttribute("title") === (n.title == null ? null : n.title) && r.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                      s.splice(i, 1);
                      break t;
                    }
                  }
                  r = a.createElement(t), yt(r, t, n), a.head.appendChild(r);
                  break;
                case "meta":
                  if (s = jp("meta", "content", a).get(t + (n.content || ""))) {
                    for (i = 0; i < s.length; i++) if (r = s[i], r.getAttribute("content") === (n.content == null ? null : "" + n.content) && r.getAttribute("name") === (n.name == null ? null : n.name) && r.getAttribute("property") === (n.property == null ? null : n.property) && r.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && r.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                      s.splice(i, 1);
                      break t;
                    }
                  }
                  r = a.createElement(t), yt(r, t, n), a.head.appendChild(r);
                  break;
                default:
                  throw Error(c(468, t));
              }
              r[ft] = e, ot(r), t = r;
            }
            e.stateNode = t;
          }
          else ut || Wu(s, e.type, e.stateNode);
          else e.stateNode = Tp(s, n, e.memoizedProps);
          else a !== n ? (a === null ? (t = r.stateNode, t === null || Te || t.parentNode.removeChild(t)) : a.count--, n === null ? ut || Wu(s, e.type, e.stateNode) : Tp(s, n, e.memoizedProps)) : n === null && e.stateNode !== null && Ki(e, e.memoizedProps, r.memoizedProps);
          break;
        case 27:
          Nt(t, e, n), At(e), a & 512 && (Te || r === null || gt(r, r.return)), r !== null && a & 4 && Ki(e, e.memoizedProps, r.memoizedProps);
          break;
        case 5:
          if (s = vn, vn = !1, Nt(t, e, n), vn = s, At(e), a & 512 && (Te || r === null || gt(r, r.return)), e.flags & 32) {
            t = e.stateNode;
            try {
              $r(t, ""), we = !0;
            } catch (T) {
              Me(e, e.return, T);
            }
          }
          a & 4 && e.stateNode != null && (t = e.memoizedProps, Ki(e, t, r !== null ? r.memoizedProps : t)), a & 1024 && (ru = !0);
          break;
        case 6:
          if (Nt(t, e, n), At(e), a & 4) {
            if (e.stateNode === null) throw Error(c(162));
            t = e.memoizedProps, n = e.stateNode;
            try {
              n.nodeValue = t, we = !0;
            } catch (T) {
              Me(e, e.return, T);
            }
          }
          break;
        case 3:
          if (we = !1, ro = null, s = an, an = Tl(t.containerInfo), Nt(t, e, n), an = s, At(e), a & 4 && r !== null && r.memoizedState.isDehydrated) try {
            Ua(t.containerInfo);
          } catch (T) {
            Me(e, e.return, T);
          }
          ru && (ru = !1, x0(e)), we = !1;
          break;
        case 4:
          a = vn, vn = ut, r = Hc(), s = an, an = Tl(e.stateNode.containerInfo), Nt(t, e, n), At(e), an = s, we && bl && (Os = !0), we = r, vn = a;
          break;
        case 12:
          Nt(t, e, n), At(e);
          break;
        case 31:
          Nt(t, e, n), At(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, qs(e, t)));
          break;
        case 13:
          Nt(t, e, n), At(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (Qs = Pt()), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, qs(e, t)));
          break;
        case 22:
          s = e.memoizedState !== null, i = r !== null && r.memoizedState !== null;
          var p = ut, g = Te, N = vn;
          ut = p || s, vn = N || s, Te = g || i, Nt(t, e, n), Te = g, vn = N, ut = p, At(e), a & 8192 && (t = e.stateNode, t._visibility = s ? t._visibility & -2 : t._visibility | 1, !s || r === null || i || ut || Te || (t = i || Te, n = ut, r = Te, ut = s || ut, Te = t, rr(e, 2), ut = n, Te = r), !s && vn || lu(e, s)), a & 4 && (t = e.updateQueue, t !== null && (n = t.retryQueue, n !== null && (t.retryQueue = null, qs(e, n))));
          break;
        case 19:
          Nt(t, e, n), At(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, qs(e, t)));
          break;
        case 30:
          a & 512 && (Te || r === null || gt(r, r.return)), a = Hc(), s = bl, i = (n & 335544064) === n, p = e.memoizedProps, bl = i && Mn(p.default, p.update) !== "none", Nt(t, e, n), At(e), i && r !== null && we && (e.flags |= 4), bl = s, we = a;
          break;
        case 21:
          break;
        case 7:
          a & 512 && (Te || r === null || gt(r, r.return)), r && r.stateNode !== null && (r.stateNode._fragmentFiber = e);
        default:
          Nt(t, e, n), At(e);
      }
    }
    function At(e) {
      var t = e.flags;
      if (t & 2) {
        try {
          for (var n, r = e.return; r !== null; ) {
            if (a0(r)) {
              n = r;
              break;
            }
            r = r.return;
          }
          r = null;
          for (var a = e.return; a !== null; ) {
            if (Yi(a)) {
              var s = a.stateNode;
              r === null ? r = [s] : r.push(s);
            }
            if (Gi(a)) break;
            a = a.return;
          }
          var i = r;
          if (n == null) throw Error(c(160));
          switch (n.tag) {
            case 27:
              var p = n.stateNode;
              Is(e, Zi(e), p, i);
              break;
            case 5:
              var g = n.stateNode;
              n.flags & 32 && ($r(g, ""), n.flags &= -33), Is(e, Zi(e), g, i);
              break;
            case 3:
            case 4:
              var N = n.stateNode.containerInfo;
              Xi(e, Zi(e), N, i);
              break;
            default:
              throw Error(c(161));
          }
        } catch (T) {
          Me(e, e.return, T);
        }
        e.flags &= -3;
      }
      t & 4096 && (e.flags &= -4097);
    }
    function x0(e) {
      if (e.subtreeFlags & 1024) for (e = e.child; e !== null; ) {
        var t = e;
        x0(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, za = !0, t.reset(), za = !1), e = e.sibling;
      }
    }
    function ba(e, t) {
      if (t.subtreeFlags & 9270) for (t = t.child; t !== null; ) k0(t, e), t = t.sibling;
      else d0(t, !1);
    }
    function k0(e, t) {
      var n = e.alternate;
      if (n === null) _i(e, !1);
      else switch (e.tag) {
        case 3:
          if (au = xn = !1, o0(), ba(t, e), !xn && !Os) {
            if (e = yn, e !== null) for (var r = 0; r < e.length; r += 3) {
              n = e[r];
              var a = e[r + 1];
              up(n, e[r + 2]), n = n.ownerDocument.documentElement, n !== null && n.animate({ opacity: [0, 0], pointerEvents: ["none", "none"] }, { duration: 0, fill: "forwards", pseudoElement: "::view-transition-group(" + a + ")" });
            }
            e = t.containerInfo, e = e.nodeType === 9 ? e.documentElement : e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "" && (e.style.viewTransitionName = "none", e.animate({ opacity: [0, 0], pointerEvents: ["none", "none"] }, { duration: 0, fill: "forwards", pseudoElement: "::view-transition-group(root)" }), e.animate({ width: [0, 0], height: [0, 0] }, { duration: 0, fill: "forwards", pseudoElement: "::view-transition" })), au = !0;
          }
          yn = null;
          break;
        case 5:
          ba(t, e);
          break;
        case 4:
          r = xn, xn = !1, ba(t, e), xn && (Os = !0), xn = r;
          break;
        case 22:
          e.memoizedState === null && (n.memoizedState !== null ? _i(e, !1) : ba(t, e));
          break;
        case 30:
          r = xn, a = o0(), xn = !1, ba(t, e), xn && (e.flags |= 4);
          var s = e.memoizedProps, i = e.stateNode;
          t = En(s, i), i = En(n.memoizedProps, i);
          var p = Mn(s.default, s.update);
          p === "none" ? t = !1 : (s = n.memoizedState, n.memoizedState = null, n = e.child, jt = 0, t = nu(e, n, t, i, p, s, !0), jt !== (s === null ? 0 : s.length) && (e.flags |= 32)), (e.flags & 4) !== 0 && t ? (Aa(e, e.memoizedProps.onUpdate), yn = a) : a !== null && (a.push.apply(a, yn), yn = a), xn = (e.flags & 32) !== 0 ? !0 : r;
          break;
        default:
          ba(t, e);
      }
    }
    function kn(e, t) {
      if (t.subtreeFlags & 8772) for (t = t.child; t !== null; ) p0(e, t.alternate, t), t = t.sibling;
    }
    function rr(e, t) {
      for (e = e.child; e !== null; ) {
        var n = e, r = t;
        switch (n.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            nr(4, n, n.return), rr(n, r);
            break;
          case 1:
            gt(n, n.return);
            var a = n.stateNode;
            typeof a.componentWillUnmount == "function" && n0(n, n.return, a), rr(n, r);
            break;
          case 27:
            (r & 2) !== 0 && wp(n.stateNode, n.type, n.memoizedProps);
          case 5:
            gt(n, n.return), n.tag !== 5 && n.tag !== 27 || yl(n), rr(n, r);
            break;
          case 6:
            yl(n);
            break;
          case 26:
            gt(n, n.return), a = n.stateNode, n.memoizedState !== null || a === null || Te || a.parentNode.removeChild(a), rr(n, r);
            break;
          case 22:
            n.memoizedState === null && rr(n, r);
            break;
          case 30:
            gt(n, n.return), rr(n, r);
            break;
          case 7:
            gt(n, n.return);
          default:
            rr(n, r);
        }
        e = e.sibling;
      }
    }
    function ln(e, t, n) {
      for (n = (t.subtreeFlags & 8772) !== 0 ? n : n & -2, t = t.child; t !== null; ) {
        var r = t.alternate, a = e, s = t, i = s.flags, p = (n & 1) !== 0;
        switch (s.tag) {
          case 0:
          case 11:
          case 15:
            ln(a, s, n), gl(4, s);
            break;
          case 1:
            if (ln(a, s, n), r = s, a = r.stateNode, typeof a.componentDidMount == "function") try {
              a.componentDidMount();
            } catch (T) {
              Me(r, r.return, T);
            }
            if (r = s, a = r.updateQueue, a !== null) {
              var g = r.stateNode;
              try {
                var N = a.shared.hiddenCallbacks;
                if (N !== null) for (a.shared.hiddenCallbacks = null, a = 0; a < N.length; a++) Qd(N[a], g);
              } catch (T) {
                Me(r, r.return, T);
              }
            }
            p && i & 64 && t0(s), gn(s, s.return);
            break;
          case 27:
            (n & 2) !== 0 && l0(s);
          case 5:
            s.tag !== 5 && s.tag !== 27 || r0(s), ln(a, s, n), p && r === null && i & 4 && Ji(s), gn(s, s.return);
            break;
          case 6:
            r0(s);
            break;
          case 26:
            g = s.stateNode, s.memoizedState !== null || g === null || ut || Wu(Tl(g.ownerDocument), s.type, g), ln(a, s, n), p && r === null && i & 4 && Ji(s), gn(s, s.return);
            break;
          case 12:
            ln(a, s, n);
            break;
          case 31:
            ln(a, s, n), p && i & 4 && y0(a, s);
            break;
          case 13:
            ln(a, s, n), p && i & 4 && b0(a, s);
            break;
          case 22:
            s.memoizedState === null && ln(a, s, n), gn(s, s.return);
            break;
          case 30:
            ln(a, s, n), gn(s, s.return);
            break;
          case 7:
            gn(s, s.return);
          default:
            ln(a, s, n);
        }
        t = t.sibling;
      }
    }
    function ou(e, t) {
      var n = null;
      e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && rl(n));
    }
    function iu(e, t) {
      e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && rl(e));
    }
    function Kt(e, t, n, r) {
      var a = (n & 335544064) === n;
      if (t.subtreeFlags & (a ? 10262 : 10256)) for (t = t.child; t !== null; ) w0(e, t, n, r), t = t.sibling;
      else a && c0(t);
    }
    function w0(e, t, n, r) {
      var a = (n & 335544064) === n;
      a && t.alternate === null && t.return !== null && t.return.alternate !== null && Vs(t);
      var s = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          Kt(e, t, n, r), s & 2048 && gl(9, t);
          break;
        case 1:
          Kt(e, t, n, r);
          break;
        case 3:
          Kt(e, t, n, r), a && au && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), s & 2048 && (s = null, t.alternate !== null && (s = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== s && (t.refCount++, s != null && rl(s)));
          break;
        case 12:
          if (s & 2048) {
            Kt(e, t, n, r), s = t.stateNode;
            try {
              var i = t.memoizedProps, p = i.id, g = i.onPostCommit;
              typeof g == "function" && g(p, t.alternate === null ? "mount" : "update", s.passiveEffectDuration, -0);
            } catch (N) {
              Me(t, t.return, N);
            }
          } else Kt(e, t, n, r);
          break;
        case 31:
          Kt(e, t, n, r);
          break;
        case 13:
          Kt(e, t, n, r);
          break;
        case 23:
          break;
        case 22:
          i = t.stateNode, p = t.alternate, t.memoizedState !== null ? (a && p !== null && p.memoizedState === null && Vs(p), i._visibility & 2 ? Kt(e, t, n, r) : vl(e, t)) : (a && p !== null && p.memoizedState !== null && Vs(t), i._visibility & 2 ? Kt(e, t, n, r) : (i._visibility |= 2, va(e, t, n, r, (t.subtreeFlags & 10256) !== 0 || !1))), s & 2048 && ou(p, t);
          break;
        case 24:
          Kt(e, t, n, r), s & 2048 && iu(t.alternate, t);
          break;
        case 30:
          a && (s = t.alternate, s !== null && (bn(s.child, !0), bn(t.child, !0))), Kt(e, t, n, r);
          break;
        default:
          Kt(e, t, n, r);
      }
    }
    function va(e, t, n, r, a) {
      for (a = a && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
        var s = e, i = t, p = n, g = r, N = i.flags;
        switch (i.tag) {
          case 0:
          case 11:
          case 15:
            va(s, i, p, g, a), gl(8, i);
            break;
          case 23:
            break;
          case 22:
            var T = i.stateNode;
            i.memoizedState !== null ? T._visibility & 2 ? va(s, i, p, g, a) : vl(s, i) : (T._visibility |= 2, va(s, i, p, g, a)), a && N & 2048 && ou(i.alternate, i);
            break;
          case 24:
            va(s, i, p, g, a), a && N & 2048 && iu(i.alternate, i);
            break;
          default:
            va(s, i, p, g, a);
        }
        t = t.sibling;
      }
    }
    function vl(e, t) {
      if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) {
        var n = e, r = t, a = r.flags;
        switch (r.tag) {
          case 22:
            vl(n, r), a & 2048 && ou(r.alternate, r);
            break;
          case 24:
            vl(n, r), a & 2048 && iu(r.alternate, r);
            break;
          default:
            vl(n, r);
        }
        t = t.sibling;
      }
    }
    var Ir = 8192;
    function Dr(e, t, n) {
      if (e.subtreeFlags & Ir) for (e = e.child; e !== null; ) S0(e, t, n), e = e.sibling;
    }
    function S0(e, t, n) {
      switch (e.tag) {
        case 26:
          Dr(e, t, n), e.flags & Ir && (e.memoizedState !== null ? yy(n, an, e.memoizedState, e.memoizedProps) : (e = e.stateNode, (t & 335544128) === t && Pp(n, e)));
          break;
        case 5:
          Dr(e, t, n), e.flags & Ir && (e = e.stateNode, (t & 335544128) === t && Pp(n, e));
          break;
        case 3:
        case 4:
          var r = an;
          an = Tl(e.stateNode.containerInfo), Dr(e, t, n), an = r;
          break;
        case 22:
          e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Ir, Ir = 16777216, Dr(e, t, n), Ir = r) : Dr(e, t, n));
          break;
        case 30:
          if ((e.flags & Ir) !== 0 && (r = e.memoizedProps.name, r != null && r !== "auto")) {
            var a = e.stateNode;
            a.paired = null, Dt === null && (Dt = /* @__PURE__ */ new Map()), Dt.set(r, a);
          }
          Dr(e, t, n);
          break;
        default:
          Dr(e, t, n);
      }
    }
    function N0(e) {
      var t = e.alternate;
      if (t !== null && (e = t.child, e !== null)) {
        t.child = null;
        do
          t = e.sibling, e.sibling = null, e = t;
        while (e !== null);
      }
    }
    function xl(e) {
      var t = e.deletions;
      if ((e.flags & 16) !== 0) {
        if (t !== null) for (var n = 0; n < t.length; n++) {
          var r = t[n];
          ct = r, C0(r, e);
        }
        N0(e);
      }
      if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) A0(e), e = e.sibling;
    }
    function A0(e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          xl(e), e.flags & 2048 && nr(9, e, e.return);
          break;
        case 3:
          xl(e);
          break;
        case 12:
          xl(e);
          break;
        case 22:
          var t = e.stateNode;
          e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Ws(e)) : xl(e);
          break;
        default:
          xl(e);
      }
    }
    function Ws(e) {
      var t = e.deletions;
      if ((e.flags & 16) !== 0) {
        if (t !== null) for (var n = 0; n < t.length; n++) {
          var r = t[n];
          ct = r, C0(r, e);
        }
        N0(e);
      }
      for (e = e.child; e !== null; ) {
        switch (t = e, t.tag) {
          case 0:
          case 11:
          case 15:
            nr(8, t, t.return), Ws(t);
            break;
          case 22:
            n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Ws(t));
            break;
          default:
            Ws(t);
        }
        e = e.sibling;
      }
    }
    function C0(e, t) {
      for (; ct !== null; ) {
        var n = ct;
        switch (n.tag) {
          case 0:
          case 11:
          case 15:
            nr(8, n, t);
            break;
          case 23:
          case 22:
            if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
              var r = n.memoizedState.cachePool.pool;
              r != null && r.refCount++;
            }
            break;
          case 24:
            rl(n.memoizedState.cache);
        }
        if (r = n.child, r !== null) r.return = n, ct = r;
        else e: for (n = e; ct !== null; ) {
          r = ct;
          var a = r.sibling, s = r.return;
          if (m0(r), r === n) {
            ct = null;
            break e;
          }
          if (a !== null) {
            a.return = s, ct = a;
            break e;
          }
          ct = s;
        }
      }
    }
    var hg = { getCacheForType: function(e) {
      var t = pt(Xe), n = t.data.get(e);
      return n === void 0 && (n = e(), t.data.set(e, n)), n;
    }, cacheSignal: function() {
      return pt(Xe).controller.signal;
    } }, mg = typeof WeakMap == "function" ? WeakMap : Map, Ae = 0, Be = null, me = null, ye = 0, Ee = 0, Ft = null, ar = !1, xa = !1, uu = !1, Fn = 0, Je = 0, lr = 0, Fr = 0, cu = 0, Vt = 0, ka = 0, kl = null, Mt = null, du = !1, Qs = 0, T0 = 0, Gs = 1 / 0, Ys = null, sr = null, Qe = 0, sn = null, Vr = null, wn = 0, fu = 0, pu = null, j0 = null, wa = null, Sa = null, Na = null, wl = 0, Js = null;
    function Zt() {
      return (Ae & 2) !== 0 && ye !== 0 ? ye & -ye : H.T !== null ? Su() : Rc();
    }
    function E0() {
      if (Vt === 0) if ((ye & 536870912) === 0 || pe) {
        var e = Hl;
        Hl <<= 1, (Hl & 3932160) === 0 && (Hl = 262144), Vt = e;
      } else Vt = 536870912;
      return e = ht.current, e !== null && (e.flags |= 32), Vt;
    }
    function Aa(e, t) {
      if (t != null) {
        var n = e.stateNode, r = n.ref;
        r === null && (r = n.ref = dp(En(e.memoizedProps, n))), Sa === null && (Sa = []), Sa.push(t.bind(null, r));
      }
    }
    function Lt(e, t, n) {
      (e === Be && (Ee === 2 || Ee === 9) || e.cancelPendingCommit !== null) && (Ca(e, 0), or(e, ye, Vt, !1)), Ql(e, n), ((Ae & 2) === 0 || e !== Be) && (e === Be && ((Ae & 2) === 0 && (Fr |= n), Je === 4 && or(e, ye, Vt, !1)), Vn(e));
    }
    function M0(e, t, n) {
      if ((Ae & 6) !== 0) throw Error(c(327));
      var r = !n && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Ha(e, t), a = r ? bg(e, t) : mu(e, t, !0), s = r;
      do {
        if (a === 0) {
          xa && !r && or(e, t, 0, !1);
          break;
        } else {
          if (n = e.current.alternate, s && !gg(n)) {
            a = mu(e, t, !1), s = !1;
            continue;
          }
          if (a === 2) {
            if (s = t, e.errorRecoveryDisabledLanes & s) var i = 0;
            else i = e.pendingLanes & -536870913, i = i !== 0 ? i : i & 536870912 ? 536870912 : 0;
            if (i !== 0) {
              t = i;
              e: {
                var p = e;
                a = kl;
                var g = p.current.memoizedState.isDehydrated;
                if (g && (Ca(p, i).flags |= 256), i = mu(p, i, !1), i !== 2 && i !== 6) {
                  if (uu && !g) {
                    p.errorRecoveryDisabledLanes |= s, Fr |= s, a = 4;
                    break e;
                  }
                  s = Mt, Mt = a, s !== null && (Mt === null ? Mt = s : Mt.push.apply(Mt, s));
                }
                a = i;
              }
              if (s = !1, a !== 2) continue;
            }
          }
          if (a === 1) {
            Ca(e, 0), or(e, t, 0, !0);
            break;
          }
          e: {
            switch (r = e, s = a, s) {
              case 0:
              case 1:
                throw Error(c(345));
              case 4:
                if ((t & 4194048) !== t && (t & 62914560) !== t) break;
              case 6:
                or(r, t, Vt, !ar);
                break e;
              case 2:
                Mt = null;
                break;
              case 3:
              case 5:
                break;
              default:
                throw Error(c(329));
            }
            if ((t & 62914560) === t && (a = Qs + 300 - Pt(), 10 < a)) {
              if (or(r, t, Vt, !ar), Wl(r, 0, !0) !== 0) break e;
              wn = t, r.timeoutHandle = Ru(L0.bind(null, r, n, Mt, Ys, du, t, Vt, Fr, ka, ar, s, "Throttled", -0, 0), a);
              break e;
            }
            L0(r, n, Mt, Ys, du, t, Vt, Fr, ka, ar, s, null, -0, 0);
          }
        }
        break;
      } while (!0);
      Vn(e);
    }
    function L0(e, t, n, r, a, s, i, p, g, N, T, R, w, C) {
      e.timeoutHandle = -1;
      var V = t.subtreeFlags, G = (s & 335544064) === s;
      if (R = null, (G || V & 8192 || (V & 16785408) === 16785408) && (R = { stylesheets: null, count: 0, imgCount: 0, imgBytes: 0, suspenseyImages: [], waitingForImages: !0, waitingForViewTransition: !1, unsuspend: pn }, Dt = null, S0(t, s, R), G && (V = R, G = e.containerInfo, G = (G.nodeType === 9 ? G : G.ownerDocument).__reactViewTransition, G != null && (V.count++, V.waitingForViewTransition = !0, V = Ml.bind(V), G.finished.then(V, V))), V = (s & 62914560) === s ? Qs - Pt() : (s & 4194048) === s ? T0 - Pt() : 0, V = by(R, V), V !== null)) {
        wn = s, e.cancelPendingCommit = V(F0.bind(null, e, t, s, n, r, a, i, p, g, N, T, R, null, w, C)), or(e, s, i, !N);
        return;
      }
      F0(e, t, s, n, r, a, i, p, g, N, T, R);
    }
    function gg(e) {
      for (var t = e; ; ) {
        var n = t.tag;
        if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
          var a = n[r], s = a.getSnapshot;
          a = a.value;
          try {
            if (!Ut(s(), a)) return !1;
          } catch {
            return !1;
          }
        }
        if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
        else {
          if (t === e) break;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) return !0;
            t = t.return;
          }
          t.sibling.return = t.return, t = t.sibling;
        }
      }
      return !0;
    }
    function or(e, t, n, r) {
      t = Tc(e, t), t &= ~cu, t &= ~Fr, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
      for (var a = t; 0 < a; ) {
        var s = 31 - Bt(a), i = 1 << s;
        r[s] = -1, a &= ~i;
      }
      n !== 0 && Ec(e, n, t);
    }
    function Ks() {
      return (Ae & 6) === 0 ? (Sl(0, !1), !1) : !0;
    }
    function hu() {
      if (me !== null) {
        if (Ee === 0) var e = me.return;
        else e = me, Rn = Ar = null, ki(e), fa = null, sl = 0, e = me;
        for (; e !== null; ) e0(e.alternate, e), e = e.return;
        me = null;
      }
    }
    function Ca(e, t) {
      var n = e.timeoutHandle;
      return n !== -1 && (e.timeoutHandle = -1, Dg(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), wn = 0, hu(), Be = e, me = n = Ln(e.current, null), ye = t, Ee = 0, Ft = null, ar = !1, xa = Ha(e, t), uu = !1, ka = Vt = cu = Fr = lr = Je = 0, Mt = kl = null, du = !1, Fn = Tc(e, t), as(), n;
    }
    function P0(e, t) {
      ue = null, H.H = Es, t === da || t === ms ? (t = Od(), Ee = 3) : t === ii ? (t = Od(), Ee = 4) : Ee = t === Ui ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Ft = t, me === null && (Je = 1, Ms(e, Qt(t, e.current)));
    }
    function R0() {
      var e = ht.current;
      return e === null ? !0 : (ye & 4194048) === ye ? wt === null : (ye & 62914560) === ye || (ye & 536870912) !== 0 ? e === wt : !1;
    }
    function B0() {
      var e = H.H;
      return H.H = Es, e === null ? Es : e;
    }
    function z0() {
      var e = H.A;
      return H.A = hg, e;
    }
    function Zs() {
      Je = 4, ar || (ye & 4194048) !== ye && ht.current !== null || (xa = !0), (lr & 134217727) === 0 && (Fr & 134217727) === 0 || Be === null || or(Be, ye, Vt, !1);
    }
    function mu(e, t, n) {
      var r = Ae;
      Ae |= 2;
      var a = B0(), s = z0();
      (Be !== e || ye !== t) && (Ys = null, Ca(e, t)), t = !1;
      var i = Je;
      e: do
        try {
          if (Ee !== 0 && me !== null) {
            var p = me, g = Ft;
            switch (Ee) {
              case 8:
                hu(), i = 6;
                break e;
              case 3:
              case 2:
              case 9:
              case 6:
                ht.current === null && (t = !0);
                var N = Ee;
                if (Ee = 0, Ft = null, Ta(e, p, g, N), n && xa) {
                  i = 0;
                  break e;
                }
                break;
              default:
                N = Ee, Ee = 0, Ft = null, Ta(e, p, g, N);
            }
          }
          yg(), i = Je;
          break;
        } catch (T) {
          P0(e, T);
        }
      while (!0);
      return t && e.shellSuspendCounter++, Rn = Ar = null, Ae = r, H.H = a, H.A = s, me === null && (Be = null, ye = 0, as()), i;
    }
    function yg() {
      for (; me !== null; ) U0(me);
    }
    function bg(e, t) {
      var n = Ae;
      Ae |= 2;
      var r = B0(), a = z0();
      Be !== e || ye !== t ? (Ys = null, Gs = Pt() + 500, Ca(e, t)) : xa = Ha(e, t);
      e: do
        try {
          if (Ee !== 0 && me !== null) {
            t = me;
            var s = Ft;
            t: switch (Ee) {
              case 1:
                Ee = 0, Ft = null, Ta(e, t, s, 1);
                break;
              case 2:
              case 9:
                if (Fd(s)) {
                  Ee = 0, Ft = null, I0(t);
                  break;
                }
                t = function() {
                  Ee !== 2 && Ee !== 9 || Be !== e || (Ee = 7), Vn(e);
                }, s.then(t, t);
                break e;
              case 3:
                Ee = 7;
                break e;
              case 4:
                Ee = 5;
                break e;
              case 7:
                Fd(s) ? (Ee = 0, Ft = null, I0(t)) : (Ee = 0, Ft = null, Ta(e, t, s, 7));
                break;
              case 5:
                var i = null;
                switch (me.tag) {
                  case 26:
                    i = me.memoizedState;
                  case 5:
                  case 27:
                    var p = me;
                    if (i ? Mp(i) : p.stateNode.complete) {
                      Ee = 0, Ft = null;
                      var g = p.sibling;
                      if (g !== null) me = g;
                      else {
                        var N = p.return;
                        N !== null ? (me = N, Xs(N)) : me = null;
                      }
                      break t;
                    }
                }
                Ee = 0, Ft = null, Ta(e, t, s, 5);
                break;
              case 6:
                Ee = 0, Ft = null, Ta(e, t, s, 6);
                break;
              case 8:
                hu(), Je = 6;
                break e;
              default:
                throw Error(c(462));
            }
          }
          vg();
          break;
        } catch (T) {
          P0(e, T);
        }
      while (!0);
      return Rn = Ar = null, H.H = r, H.A = a, Ae = n, me !== null ? 0 : (Be = null, ye = 0, as(), Je);
    }
    function vg() {
      for (; me !== null && !Qm(); ) U0(me);
    }
    function U0(e) {
      var t = _f(e.alternate, e, Fn);
      e.memoizedProps = e.pendingProps, t === null ? Xs(e) : me = t;
    }
    function I0(e) {
      var t = e, n = t.alternate;
      switch (t.tag) {
        case 15:
        case 0:
          t = Qf(n, t, t.pendingProps, t.type, void 0, ye);
          break;
        case 11:
          t = Qf(n, t, t.pendingProps, t.type.render, t.ref, ye);
          break;
        case 5:
          ki(t);
          var r = t;
          r === it && (pe ? (cs(r), r.tag === 5 && r.stateNode != null && (Ie = r.stateNode)) : (cs(r), pe = !0));
        default:
          e0(n, t), t = me = jd(t, Fn), t = _f(n, t, Fn);
      }
      e.memoizedProps = e.pendingProps, t === null ? Xs(e) : me = t;
    }
    function Ta(e, t, n, r) {
      Rn = Ar = null, ki(t), fa = null, sl = 0;
      var a = t.return;
      try {
        if (sg(e, a, t, n, ye)) {
          Je = 1, Ms(e, Qt(n, e.current)), me = null;
          return;
        }
      } catch (s) {
        if (a !== null) throw me = a, s;
        Je = 1, Ms(e, Qt(n, e.current)), me = null;
        return;
      }
      t.flags & 32768 ? (pe || r === 1 ? e = !0 : xa || (ye & 536870912) !== 0 ? e = !1 : (ar = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = ht.current, r !== null && r.tag === 13 && (r.flags |= 16384))), D0(t, e)) : Xs(t);
    }
    function Xs(e) {
      var t = e;
      do {
        if ((t.flags & 32768) !== 0) {
          D0(t, ar);
          return;
        }
        e = t.return;
        var n = cg(t.alternate, t, Fn);
        if (n !== null) {
          me = n;
          return;
        }
        if (t = t.sibling, t !== null) {
          me = t;
          return;
        }
        me = t = e;
      } while (t !== null);
      Je === 0 && (Je = 5);
    }
    function D0(e, t) {
      do {
        var n = dg(e.alternate, e);
        if (n !== null) {
          n.flags &= 32767, me = n;
          return;
        }
        if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
          me = e;
          return;
        }
        me = e = n;
      } while (e !== null);
      Je = 6, me = null;
    }
    function F0(e, t, n, r, a, s, i, p, g, N, T, R) {
      e.cancelPendingCommit = null;
      do
        _s();
      while (Qe !== 0);
      if ((Ae & 6) !== 0) throw Error(c(327));
      if (t !== null) {
        if (t === e.current) throw Error(c(177));
        e === Be && (me = Be = null, ye = 0), Vr = t, sn = e, wn = n, pu = a, j0 = r, xg(e, t, n, i, p, g, R);
      }
    }
    function xg(e, t, n, r, a, s, i) {
      var p = t.lanes | t.childLanes;
      if (fu = p, p |= Ko, t1(e, n, p, r, a, s), Sa = null, (n & 335544064) === n ? (Na = Q1(e), r = 10262) : (Na = null, r = 10256), (t.subtreeFlags & r) !== 0 || (t.flags & r) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Cg(Vl, function() {
        return vu(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), Ds = !1, r = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || r) {
        r = H.T, H.T = null, a = O.p, O.p = 2, s = Ae, Ae |= 4;
        try {
          fg(e, t, n);
        } finally {
          Ae = s, O.p = a, H.T = r;
        }
      }
      Qe = 1, Ds ? wa = Wg(i, e.containerInfo, Na, gu, yu, wg, bu, vu, kg, null, null) : (gu(), yu(), bu());
    }
    function kg(e) {
      if (Qe !== 0) {
        var t = sn.onRecoverableError;
        t(e, { componentStack: null });
      }
    }
    function wg() {
      Qe === 3 && (Qe = 0, k0(Vr, sn), Qe = 4);
    }
    function gu() {
      if (Qe === 1) {
        Qe = 0;
        var e = sn, t = Vr, n = wn, r = (t.flags & 13878) !== 0;
        if ((t.subtreeFlags & 13878) !== 0 || r) {
          r = H.T, H.T = null;
          var a = O.p;
          O.p = 2;
          var s = Ae;
          Ae |= 4;
          try {
            bl = Os = !1, v0(t, e, n), n = Mu;
            var i = bd(e.containerInfo), p = n.focusedElem, g = n.selectionRange;
            if (i !== p && p && p.ownerDocument && yd(p.ownerDocument.documentElement, p)) {
              if (g !== null && Wo(p)) {
                var N = g.start, T = g.end;
                if (T === void 0 && (T = N), "selectionStart" in p) p.selectionStart = N, p.selectionEnd = Math.min(T, p.value.length);
                else {
                  var R = p.ownerDocument || document, w = R && R.defaultView || window;
                  if (w.getSelection) {
                    var C = w.getSelection(), V = p.textContent.length, G = Math.min(g.start, V), ce = g.end === void 0 ? G : Math.min(g.end, V);
                    !C.extend && G > ce && (i = ce, ce = G, G = i);
                    var S = gd(p, G), v = gd(p, ce);
                    if (S && v && (C.rangeCount !== 1 || C.anchorNode !== S.node || C.anchorOffset !== S.offset || C.focusNode !== v.node || C.focusOffset !== v.offset)) {
                      var A = R.createRange();
                      A.setStart(S.node, S.offset), C.removeAllRanges(), G > ce ? (C.addRange(A), C.extend(v.node, v.offset)) : (A.setEnd(v.node, v.offset), C.addRange(A));
                    }
                  }
                }
              }
              for (R = [], C = p; C = C.parentNode; ) C.nodeType === 1 && R.push({ element: C, left: C.scrollLeft, top: C.scrollTop });
              for (typeof p.focus == "function" && p.focus(), p = 0; p < R.length; p++) {
                var L = R[p];
                L.element.scrollLeft = L.left, L.element.scrollTop = L.top;
              }
            }
            za = !!Eu, Mu = Eu = null;
          } finally {
            Ae = s, O.p = a, H.T = r;
          }
        }
        e.current = t, Qe = 2;
      }
    }
    function yu() {
      if (Qe === 2) {
        Qe = 0;
        var e = sn, t = Vr, n = (t.flags & 8772) !== 0;
        if ((t.subtreeFlags & 8772) !== 0 || n) {
          n = H.T, H.T = null;
          var r = O.p;
          O.p = 2;
          var a = Ae;
          Ae |= 4;
          try {
            p0(e, t.alternate, t);
          } finally {
            Ae = a, O.p = r, H.T = n;
          }
        }
        Qe = 3;
      }
    }
    function bu() {
      if (Qe === 4 || Qe === 3) {
        Qe = 0;
        var e = wa;
        wa = null, Gm();
        var t = sn, n = Vr, r = wn, a = j0, s = (r & 335544064) === r ? 10262 : 10256;
        if ((n.subtreeFlags & s) !== 0 || (n.flags & s) !== 0 ? Qe = 5 : (Qe = 0, Vr = sn = null, V0(t, t.pendingLanes)), s = t.pendingLanes, s === 0 && (sr = null), Co(r), n = n.stateNode, Rt && typeof Rt.onCommitFiberRoot == "function") try {
          Rt.onCommitFiberRoot(Oa, n, void 0, (n.current.flags & 128) === 128);
        } catch {
        }
        if (a !== null) {
          n = H.T, s = O.p, O.p = 2, H.T = null;
          try {
            for (var i = t.onRecoverableError, p = 0; p < a.length; p++) {
              var g = a[p];
              i(g.value, { componentStack: g.stack });
            }
          } finally {
            H.T = n, O.p = s;
          }
        }
        if (a = Sa, i = Na, Na = null, a !== null && (Sa = null, i === null && (i = []), e !== null)) for (g = 0; g < a.length; g++) n = (0, a[g])(i), n !== void 0 && e.finished.finally(n);
        (wn & 3) !== 0 && _s(), Vn(t), s = t.pendingLanes, (r & 261930) !== 0 && (s & 42) !== 0 ? t === Js ? wl++ : (wl = 0, Js = t) : (wl = 0, Js = null), Sl(0, !1);
      }
    }
    function V0(e, t) {
      (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, rl(t)));
    }
    function _s() {
      return wa !== null && (wa.skipTransition(), wa = null), gu(), yu(), bu(), vu();
    }
    function vu() {
      if (Qe !== 5) return !1;
      var e = sn, t = fu;
      fu = 0;
      var n = Co(wn), r = H.T, a = O.p;
      try {
        O.p = 32 > n ? 32 : n, H.T = null, n = pu, pu = null;
        var s = sn, i = wn;
        if (Qe = 0, Vr = sn = null, wn = 0, (Ae & 6) !== 0) throw Error(c(331));
        var p = Ae;
        if (Ae |= 4, A0(s.current), w0(s, s.current, i, n), Ae = p, Sl(0, !1), Rt && typeof Rt.onPostCommitFiberRoot == "function") try {
          Rt.onPostCommitFiberRoot(Oa, s);
        } catch {
        }
        return !0;
      } finally {
        O.p = a, H.T = r, V0(e, t);
      }
    }
    function O0(e, t, n) {
      t = Qt(n, t), t = zi(e.stateNode, t, 2), e = Br(e, t, 2), e !== null && (Ql(e, 2), Vn(e));
    }
    function Me(e, t, n) {
      if (e.tag === 3) O0(e, e, n);
      else for (; t !== null; ) {
        if (t.tag === 3) {
          O0(t, e, n);
          break;
        } else if (t.tag === 1) {
          var r = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (sr === null || !sr.has(r))) {
            e = Qt(n, e), n = If(2), r = Br(t, n, 2), r !== null && (Df(n, r, t, e), Ql(r, 2), Vn(r));
            break;
          }
        }
        t = t.return;
      }
    }
    function xu(e, t, n) {
      var r = e.pingCache;
      if (r === null) {
        r = e.pingCache = new mg();
        var a = /* @__PURE__ */ new Set();
        r.set(t, a);
      } else a = r.get(t), a === void 0 && (a = /* @__PURE__ */ new Set(), r.set(t, a));
      a.has(n) || (uu = !0, a.add(n), e = Sg.bind(null, e, t, n), t.then(e, e));
    }
    function Sg(e, t, n) {
      var r = e.pingCache;
      r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Be === e && (ye & n) === n && ((Je === 4 || Je === 3 && (ye & 62914560) === ye && 300 > Pt() - Qs) && (Ae & 2) === 0 ? Ca(e, 0) : cu |= n, ka === ye && (ka = 0)), Vn(e);
    }
    function H0(e, t) {
      t === 0 && (t = jc()), e = wr(e, t), e !== null && (Ql(e, t), Vn(e));
    }
    function Ng(e) {
      var t = e.memoizedState, n = 0;
      t !== null && (n = t.retryLane), H0(e, n);
    }
    function Ag(e, t) {
      var n = 0;
      switch (e.tag) {
        case 31:
        case 13:
          var r = e.stateNode, a = e.memoizedState;
          a !== null && (n = a.retryLane);
          break;
        case 19:
          r = e.stateNode;
          break;
        case 22:
          r = e.stateNode._retryCache;
          break;
        default:
          throw Error(c(314));
      }
      r !== null && r.delete(t), H0(e, n);
    }
    function Cg(e, t) {
      return Va(e, t);
    }
    var ja = null, Ea = null, ku = !1, $s = !1, wu = !1, ir = 0;
    function Vn(e) {
      e !== Ea && e.next === null && (Ea === null ? ja = Ea = e : Ea = Ea.next = e), $s = !0, ku || (ku = !0, jg());
    }
    function Sl(e, t) {
      if (!wu && $s) {
        wu = !0;
        do
          for (var n = !1, r = ja; r !== null; ) {
            if (!t) if (e !== 0) {
              var a = r.pendingLanes;
              if (a === 0) var s = 0;
              else {
                var i = r.suspendedLanes, p = r.pingedLanes;
                s = (1 << 31 - Bt(42 | e) + 1) - 1, s &= a & ~(i & ~p), s = s & 201326741 ? s & 201326741 | 1 : s ? s | 2 : 0;
              }
              s !== 0 && (n = !0, G0(r, s));
            } else s = ye, s = Wl(r, r === Be ? s : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), (s & 3) === 0 || Ha(r, s) || (n = !0, G0(r, s));
            r = r.next;
          }
        while (n);
        wu = !1;
      }
    }
    function Tg() {
      q0();
    }
    function q0() {
      $s = ku = !1;
      var e = 0;
      ir !== 0 && Ig() && (e = ir);
      for (var t = Pt(), n = null, r = ja; r !== null; ) {
        var a = r.next, s = W0(r, t);
        s === 0 ? (r.next = null, n === null ? ja = a : n.next = a, a === null && (Ea = n)) : (n = r, (e !== 0 || (s & 3) !== 0) && ($s = !0)), r = a;
      }
      Qe !== 0 && Qe !== 5 || Sl(e, !1), ir !== 0 && (ir = 0);
    }
    function W0(e, t) {
      for (var n = e.suspendedLanes, r = e.pingedLanes, a = e.expirationTimes, s = e.pendingLanes & -62914561; 0 < s; ) {
        var i = 31 - Bt(s), p = 1 << i, g = a[i];
        g === -1 ? ((p & n) === 0 || (p & r) !== 0) && (a[i] = e1(p, t)) : g <= t && (e.expiredLanes |= p), s &= ~p;
      }
      if (t = Be, n = ye, n = Wl(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (Ee === 2 || Ee === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && No(r), e.callbackNode = null, e.callbackPriority = 0;
      if ((n & 3) === 0 || Ha(e, n)) {
        if (t = n & -n, t === e.callbackPriority) return t;
        switch (r !== null && No(r), Co(n)) {
          case 2:
          case 8:
            n = Ac;
            break;
          case 32:
            n = Vl;
            break;
          case 268435456:
            n = Cc;
            break;
          default:
            n = Vl;
        }
        return r = Q0.bind(null, e), n = Va(n, r), e.callbackPriority = t, e.callbackNode = n, t;
      }
      return r !== null && r !== null && No(r), e.callbackPriority = 2, e.callbackNode = null, 2;
    }
    function Q0(e, t) {
      if (Qe !== 0 && Qe !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
      var n = e.callbackNode;
      if (_s() && e.callbackNode !== n) return null;
      var r = ye;
      return r = Wl(e, e === Be ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (M0(e, r, t), W0(e, Pt()), e.callbackNode != null && e.callbackNode === n ? Q0.bind(null, e) : null);
    }
    function G0(e, t) {
      if (_s()) return null;
      M0(e, t, !0);
    }
    function jg() {
      Fg(function() {
        (Ae & 6) !== 0 ? Va(Nc, Tg) : q0();
      });
    }
    function Su() {
      if (ir === 0) {
        var e = jr;
        e === 0 && (e = Ol, Ol <<= 1, (Ol & 261888) === 0 && (Ol = 256)), ir = e;
      }
      return ir;
    }
    function Y0(e) {
      return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Zl(e);
    }
    function Eg(e, t, n, r, a) {
      if (t === "submit" && n && n.stateNode === a) {
        var s = Y0((a[Ct] || null).action), i = r.submitter;
        i && (t = (t = i[Ct] || null) ? Y0(t.formAction) : i.getAttribute("formAction"), t !== null && (s = t, i = null));
        var p = new es("action", "action", null, r, a);
        e.push({ event: p, listeners: [{ instance: null, listener: function() {
          if (r.defaultPrevented) {
            if (ir !== 0) {
              var g = new FormData(a, i);
              Mi(n, { pending: !0, data: g, method: a.method, action: s }, null, g);
            }
          } else typeof s == "function" && (p.preventDefault(), g = new FormData(a, i), Mi(n, { pending: !0, data: g, method: a.method, action: s }, s, g));
        }, currentTarget: a }] });
      }
    }
    for (var Nu = 0; Nu < Jo.length; Nu++) {
      var Au = Jo[Nu];
      nn(Au.toLowerCase(), "on" + (Au[0].toUpperCase() + Au.slice(1)));
    }
    nn(kd, "onAnimationEnd"), nn(wd, "onAnimationIteration"), nn(Sd, "onAnimationStart"), nn("dblclick", "onDoubleClick"), nn("focusin", "onFocus"), nn("focusout", "onBlur"), nn(I1, "onTransitionRun"), nn(D1, "onTransitionStart"), nn(F1, "onTransitionCancel"), nn(Nd, "onTransitionEnd"), Xr("onMouseEnter", ["mouseout", "mouseover"]), Xr("onMouseLeave", ["mouseout", "mouseover"]), Xr("onPointerEnter", ["pointerout", "pointerover"]), Xr("onPointerLeave", ["pointerout", "pointerover"]), vr("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), vr("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), vr("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), vr("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), vr("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), vr("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
    var Nl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Mg = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Nl));
    function J0(e, t) {
      t = (t & 4) !== 0;
      for (var n = 0; n < e.length; n++) {
        var r = e[n], a = r.event;
        r = r.listeners;
        e: {
          var s = void 0;
          if (t) for (var i = r.length - 1; 0 <= i; i--) {
            var p = r[i], g = p.instance, N = p.currentTarget;
            if (p = p.listener, g !== s && a.isPropagationStopped()) break e;
            s = p, a.currentTarget = N;
            try {
              s(a);
            } catch (T) {
              rs(T);
            }
            a.currentTarget = null, s = g;
          }
          else for (i = 0; i < r.length; i++) {
            if (p = r[i], g = p.instance, N = p.currentTarget, p = p.listener, g !== s && a.isPropagationStopped()) break e;
            s = p, a.currentTarget = N;
            try {
              s(a);
            } catch (T) {
              rs(T);
            }
            a.currentTarget = null, s = g;
          }
        }
      }
    }
    function ge(e, t) {
      var n = t[zc];
      n === void 0 && (n = t[zc] = /* @__PURE__ */ new Set());
      var r = e + "__bubble";
      n.has(r) || (Z0(t, e, 2, !1), n.add(r));
    }
    function Cu(e, t, n) {
      var r = 0;
      t && (r |= 4), Z0(n, e, r, t);
    }
    var eo = "_reactListening" + Math.random().toString(36).slice(2);
    function K0(e) {
      if (!e[eo]) {
        e[eo] = !0, Dc.forEach(function(n) {
          n !== "selectionchange" && (Mg.has(n) || Cu(n, !1, e), Cu(n, !0, e));
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[eo] || (t[eo] = !0, Cu("selectionchange", !1, t));
      }
    }
    function Z0(e, t, n, r) {
      switch (Dp(t)) {
        case 2:
          var a = Ny;
          break;
        case 8:
          a = Ay;
          break;
        default:
          a = Gu;
      }
      n = a.bind(null, t, n, e), a = void 0, !Bo || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (a = !0), r ? a !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: a }) : e.addEventListener(t, n, !0) : a !== void 0 ? e.addEventListener(t, n, { passive: a }) : e.addEventListener(t, n, !1);
    }
    function Tu(e, t, n, r, a) {
      var s = r;
      if ((t & 1) === 0 && (t & 2) === 0 && r !== null) e: for (; ; ) {
        if (r === null) return;
        var i = r.tag;
        if (i === 3 || i === 4) {
          var p = r.stateNode.containerInfo;
          if (p === a) break;
          if (i === 4) for (i = r.return; i !== null; ) {
            var g = i.tag;
            if ((g === 3 || g === 4) && i.stateNode.containerInfo === a) return;
            i = i.return;
          }
          for (; p !== null; ) {
            if (i = br(p), i === null) return;
            if (g = i.tag, g === 5 || g === 6 || g === 26 || g === 27) {
              r = s = i;
              continue e;
            }
            p = p.parentNode;
          }
        }
        r = r.return;
      }
      Xc(function() {
        var N = s, T = Po(n), R = [];
        e: {
          var w = Ad.get(e);
          if (w !== void 0) {
            var C = es, V = e;
            switch (e) {
              case "keypress":
                if (_l(n) === 0) break e;
              case "keydown":
              case "keyup":
                C = v1;
                break;
              case "focusin":
                V = "focus", C = Do;
                break;
              case "focusout":
                V = "blur", C = Do;
                break;
              case "beforeblur":
              case "afterblur":
                C = Do;
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
                C = ed;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                C = f1;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                C = k1;
                break;
              case kd:
              case wd:
              case Sd:
                C = p1;
                break;
              case Nd:
                C = w1;
                break;
              case "scroll":
              case "scrollend":
                C = d1;
                break;
              case "wheel":
                C = S1;
                break;
              case "copy":
              case "cut":
              case "paste":
                C = h1;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                C = nd;
                break;
              case "submit":
                C = x1;
                break;
              case "toggle":
              case "beforetoggle":
                C = N1;
            }
            var G = (t & 4) !== 0, ce = !G && (e === "scroll" || e === "scrollend"), S = G ? w !== null ? w + "Capture" : null : w;
            G = [];
            for (var v = N, A; v !== null; ) {
              var L = v;
              if (A = L.stateNode, L = L.tag, L !== 5 && L !== 26 && L !== 27 || A === null || S === null || (L = Ga(v, S), L != null && G.push(Al(v, L, A))), ce) break;
              v = v.return;
            }
            0 < G.length && (w = new C(w, V, null, n, T), R.push({ event: w, listeners: G }));
          }
        }
        if ((t & 7) === 0) {
          e: {
            if (C = e === "mouseover" || e === "pointerover", w = e === "mouseout" || e === "pointerout", C && n !== Lo && (V = n.relatedTarget || n.fromElement) && (br(V) || V[qa])) break e;
            (w || C) && (V = T.window === T ? T : (C = T.ownerDocument) ? C.defaultView || C.parentWindow : window, w ? (C = n.relatedTarget || n.toElement, w = N, C = C ? br(C) : null, C !== null && (ce = m(C), G = C.tag, C !== ce || G !== 5 && G !== 27 && G !== 6) && (C = null)) : (w = null, C = N), w !== C && (G = ed, L = "onMouseLeave", S = "onMouseEnter", v = "mouse", (e === "pointerout" || e === "pointerover") && (G = nd, L = "onPointerLeave", S = "onPointerEnter", v = "pointer"), ce = w == null ? V : Qa(w), A = C == null ? V : Qa(C), V = new G(L, v + "leave", w, n, T), V.target = ce, V.relatedTarget = A, L = null, br(T) === N && (G = new G(S, v + "enter", C, n, T), G.target = A, G.relatedTarget = ce, L = G), ce = L, G = w && C ? He(w, C, Lg) : null, w !== null && X0(R, V, w, G, !1), C !== null && ce !== null && X0(R, ce, C, G, !0)));
          }
          e: {
            if (w = N ? Qa(N) : window, C = w.nodeName && w.nodeName.toLowerCase(), C === "select" || C === "input" && w.type === "file") var W = cd;
            else if (id(w)) if (dd) W = B1;
            else {
              W = P1;
              var be = L1;
            }
            else C = w.nodeName, !C || C.toLowerCase() !== "input" || w.type !== "checkbox" && w.type !== "radio" ? N && Mo(N.elementType) && (W = cd) : W = R1;
            if (W && (W = W(e, N))) {
              ud(R, W, n, T);
              break e;
            }
            be && be(e, w, N);
          }
          switch (be = N ? Qa(N) : window, e) {
            case "focusin":
              (id(be) || be.contentEditable === "true") && (ra = be, Qo = N, el = null);
              break;
            case "focusout":
              el = Qo = ra = null;
              break;
            case "mousedown":
              Go = !0;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              Go = !1, vd(R, n, T);
              break;
            case "selectionchange":
              if (U1) break;
            case "keydown":
            case "keyup":
              vd(R, n, T);
          }
          var J;
          if (Vo) e: {
            switch (e) {
              case "compositionstart":
                var ee = "onCompositionStart";
                break e;
              case "compositionend":
                ee = "onCompositionEnd";
                break e;
              case "compositionupdate":
                ee = "onCompositionUpdate";
                break e;
            }
            ee = void 0;
          }
          else na ? sd(e, n) && (ee = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (ee = "onCompositionStart");
          ee && (rd && n.locale !== "ko" && (na || ee !== "onCompositionStart" ? ee === "onCompositionEnd" && na && (J = _c()) : (Qn = T, zo = "value" in Qn ? Qn.value : Qn.textContent, na = !0)), be = to(N, ee), 0 < be.length && (ee = new td(ee, e, null, n, T), R.push({ event: ee, listeners: be }), J ? ee.data = J : (J = od(n), J !== null && (ee.data = J)))), (J = C1 ? T1(e, n) : j1(e, n)) && (ee = to(N, "onBeforeInput"), 0 < ee.length && (be = new td("onBeforeInput", "beforeinput", null, n, T), R.push({ event: be, listeners: ee }), be.data = J)), Eg(R, e, N, n, T);
        }
        J0(R, t);
      });
    }
    function Al(e, t, n) {
      return { instance: e, listener: t, currentTarget: n };
    }
    function to(e, t) {
      for (var n = t + "Capture", r = []; e !== null; ) {
        var a = e, s = a.stateNode;
        if (a = a.tag, a !== 5 && a !== 26 && a !== 27 || s === null || (a = Ga(e, n), a != null && r.unshift(Al(e, a, s)), a = Ga(e, t), a != null && r.push(Al(e, a, s))), e.tag === 3) return r;
        e = e.return;
      }
      return [];
    }
    function Lg(e) {
      if (e === null) return null;
      do
        e = e.return;
      while (e && e.tag !== 5 && e.tag !== 27);
      return e || null;
    }
    function X0(e, t, n, r, a) {
      for (var s = t._reactName, i = []; n !== null && n !== r; ) {
        var p = n, g = p.alternate, N = p.stateNode;
        if (p = p.tag, g !== null && g === r) break;
        p !== 5 && p !== 26 && p !== 27 || N === null || (g = N, a ? (N = Ga(n, s), N != null && i.unshift(Al(n, N, g))) : a || (N = Ga(n, s), N != null && i.push(Al(n, N, g)))), n = n.return;
      }
      i.length !== 0 && e.push({ event: t, listeners: i });
    }
    var Pg = /\r\n?/g, Rg = /\u0000|\uFFFD/g;
    function _0(e) {
      return (typeof e == "string" ? e : "" + e).replace(Pg, `
`).replace(Rg, "");
    }
    function $0(e, t) {
      return t = _0(t), _0(e) === t;
    }
    function Le(e, t, n, r, a, s) {
      switch (n) {
        case "children":
          if (typeof r == "string") t === "body" || t === "textarea" && r === "" || $r(e, r);
          else if (typeof r == "number" || typeof r == "bigint") t !== "body" && $r(e, "" + r);
          else return;
          break;
        case "className":
          Kl(e, "class", r);
          break;
        case "tabIndex":
          Kl(e, "tabindex", r);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          Kl(e, n, r);
          break;
        case "style":
          Kc(e, r, s);
          return;
        case "data":
          if (t !== "object") {
            Kl(e, "data", r);
            break;
          }
        case "src":
        case "href":
          if (r === "" && (t !== "a" || n !== "href")) {
            e.removeAttribute(n);
            break;
          }
          if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
            e.removeAttribute(n);
            break;
          }
          r = Zl(r), e.setAttribute(n, r);
          break;
        case "action":
        case "formAction":
          if (typeof r == "function") {
            e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
            break;
          } else typeof s == "function" && (n === "formAction" ? (t !== "input" && Le(e, t, "name", a.name, a, null), Le(e, t, "formEncType", a.formEncType, a, null), Le(e, t, "formMethod", a.formMethod, a, null), Le(e, t, "formTarget", a.formTarget, a, null)) : (Le(e, t, "encType", a.encType, a, null), Le(e, t, "method", a.method, a, null), Le(e, t, "target", a.target, a, null)));
          if (r == null || typeof r == "symbol" || typeof r == "boolean") {
            e.removeAttribute(n);
            break;
          }
          r = Zl(r), e.setAttribute(n, r);
          break;
        case "onClick":
          r != null && (e.onclick = pn);
          return;
        case "onScroll":
          r != null && ge("scroll", e);
          return;
        case "onScrollEnd":
          r != null && ge("scrollend", e);
          return;
        case "dangerouslySetInnerHTML":
          if (r != null) {
            if (typeof r != "object" || !("__html" in r)) throw Error(c(61));
            if (n = r.__html, n != null) {
              if (a.children != null) throw Error(c(60));
              s?.__html !== n && (e.innerHTML = n);
            }
          }
          break;
        case "multiple":
          e.multiple = r && typeof r != "function" && typeof r != "symbol";
          break;
        case "muted":
          e.muted = r && typeof r != "function" && typeof r != "symbol";
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
          if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
            e.removeAttribute("xlink:href");
            break;
          }
          n = Zl(r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
          break;
        case "contentEditable":
        case "spellCheck":
        case "draggable":
        case "value":
        case "autoReverse":
        case "externalResourcesRequired":
        case "focusable":
        case "preserveAlpha":
          r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
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
          r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
          break;
        case "capture":
        case "download":
          r === !0 ? e.setAttribute(n, "") : r !== !1 && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
          break;
        case "cols":
        case "rows":
        case "size":
        case "span":
          r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
          break;
        case "rowSpan":
        case "start":
          r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
          break;
        case "popover":
          ge("beforetoggle", e), ge("toggle", e), Jl(e, "popover", r);
          break;
        case "xlinkActuate":
          Tn(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
          break;
        case "xlinkArcrole":
          Tn(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
          break;
        case "xlinkRole":
          Tn(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
          break;
        case "xlinkShow":
          Tn(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
          break;
        case "xlinkTitle":
          Tn(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
          break;
        case "xlinkType":
          Tn(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
          break;
        case "xmlBase":
          Tn(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
          break;
        case "xmlLang":
          Tn(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
          break;
        case "xmlSpace":
          Tn(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
          break;
        case "is":
          Jl(e, "is", r);
          break;
        case "innerText":
        case "textContent":
          return;
        default:
          if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") n = u1.get(n) || n, Jl(e, n, r);
          else return;
      }
      we = !0;
    }
    function ju(e, t, n, r, a, s) {
      switch (n) {
        case "style":
          Kc(e, r, s);
          return;
        case "dangerouslySetInnerHTML":
          if (r != null) {
            if (typeof r != "object" || !("__html" in r)) throw Error(c(61));
            if (n = r.__html, n != null) {
              if (a.children != null) throw Error(c(60));
              s?.__html !== n && (e.innerHTML = n);
            }
          }
          break;
        case "children":
          if (typeof r == "string") $r(e, r);
          else if (typeof r == "number" || typeof r == "bigint") $r(e, "" + r);
          else return;
          break;
        case "onScroll":
          r != null && ge("scroll", e);
          return;
        case "onScrollEnd":
          r != null && ge("scrollend", e);
          return;
        case "onClick":
          r != null && (e.onclick = pn);
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
          if (!Fc.hasOwnProperty(n)) e: {
            if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), s = n.slice(2, a ? n.length - 7 : void 0), t = e[Ct] || null, t = t != null ? t[n] : null, typeof t == "function" && e.removeEventListener(s, t, a), typeof r == "function")) {
              typeof t != "function" && t !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(s, r, a);
              break e;
            }
            we = !0, n in e ? e[n] = r : r === !0 ? e.setAttribute(n, "") : Jl(e, n, r);
          }
          return;
      }
      we = !0;
    }
    function yt(e, t, n) {
      switch (t) {
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
          ge("error", e), ge("load", e);
          var r = !1, a = !1, s;
          for (s in n) if (n.hasOwnProperty(s)) {
            var i = n[s];
            if (i != null) switch (s) {
              case "src":
                r = !0;
                break;
              case "srcSet":
                a = !0;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(c(137, t));
              default:
                Le(e, t, s, i, n, null);
            }
          }
          a && Le(e, t, "srcSet", n.srcSet, n, null), r && Le(e, t, "src", n.src, n, null);
          return;
        case "input":
          ge("invalid", e);
          var p = s = i = a = null, g = null, N = null;
          for (r in n) if (n.hasOwnProperty(r)) {
            var T = n[r];
            if (T != null) switch (r) {
              case "name":
                a = T;
                break;
              case "type":
                i = T;
                break;
              case "checked":
                g = T;
                break;
              case "defaultChecked":
                N = T;
                break;
              case "value":
                s = T;
                break;
              case "defaultValue":
                p = T;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (T != null) throw Error(c(137, t));
                break;
              default:
                Le(e, t, r, T, n, null);
            }
          }
          Qc(e, s, p, g, N, i, a, !1);
          return;
        case "select":
          ge("invalid", e), r = i = s = null;
          for (a in n) if (n.hasOwnProperty(a) && (p = n[a], p != null)) switch (a) {
            case "value":
              s = p;
              break;
            case "defaultValue":
              i = p;
              break;
            case "multiple":
              r = p;
            default:
              Le(e, t, a, p, n, null);
          }
          t = s, n = i, e.multiple = !!r, t != null ? _r(e, !!r, t, !1) : n != null && _r(e, !!r, n, !0);
          return;
        case "textarea":
          ge("invalid", e), s = a = r = null;
          for (i in n) if (n.hasOwnProperty(i) && (p = n[i], p != null)) switch (i) {
            case "value":
              r = p;
              break;
            case "defaultValue":
              a = p;
              break;
            case "children":
              s = p;
              break;
            case "dangerouslySetInnerHTML":
              if (p != null) throw Error(c(91));
              break;
            default:
              Le(e, t, i, p, n, null);
          }
          Yc(e, r, a, s);
          return;
        case "option":
          for (g in n) if (n.hasOwnProperty(g) && (r = n[g], r != null)) switch (g) {
            case "selected":
              e.selected = r && typeof r != "function" && typeof r != "symbol";
              break;
            default:
              Le(e, t, g, r, n, null);
          }
          return;
        case "dialog":
          ge("beforetoggle", e), ge("toggle", e), ge("cancel", e), ge("close", e);
          break;
        case "iframe":
        case "object":
          ge("load", e);
          break;
        case "video":
        case "audio":
          for (r = 0; r < Nl.length; r++) ge(Nl[r], e);
          break;
        case "image":
          ge("error", e), ge("load", e);
          break;
        case "details":
          ge("toggle", e);
          break;
        case "embed":
        case "source":
        case "link":
          ge("error", e), ge("load", e);
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
          for (N in n) if (n.hasOwnProperty(N) && (r = n[N], r != null)) switch (N) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(c(137, t));
            default:
              Le(e, t, N, r, n, null);
          }
          return;
        default:
          if (Mo(t)) {
            for (T in n) n.hasOwnProperty(T) && (r = n[T], r !== void 0 && ju(e, t, T, r, n, void 0));
            return;
          }
      }
      for (p in n) n.hasOwnProperty(p) && (r = n[p], r != null && Le(e, t, p, r, n, null));
    }
    var Bg = {};
    function zg(e, t, n, r) {
      switch (t) {
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
          var a = null, s = null, i = null, p = null, g = null, N = null, T = null;
          for (C in n) {
            var R = n[C];
            if (n.hasOwnProperty(C) && R != null) switch (C) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                g = R;
              default:
                r.hasOwnProperty(C) || Le(e, t, C, null, r, R);
            }
          }
          for (var w in r) {
            var C = r[w];
            if (R = n[w], r.hasOwnProperty(w) && (C != null || R != null)) switch (w) {
              case "type":
                C !== R && (we = !0), s = C;
                break;
              case "name":
                C !== R && (we = !0), a = C;
                break;
              case "checked":
                C !== R && (we = !0), N = C;
                break;
              case "defaultChecked":
                C !== R && (we = !0), T = C;
                break;
              case "value":
                C !== R && (we = !0), i = C;
                break;
              case "defaultValue":
                C !== R && (we = !0), p = C;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (C != null) throw Error(c(137, t));
                break;
              default:
                C !== R && Le(e, t, w, C, r, R);
            }
          }
          jo(e, i, p, g, N, T, s, a);
          return;
        case "select":
          C = i = p = w = null;
          for (s in n) if (g = n[s], n.hasOwnProperty(s) && g != null) switch (s) {
            case "value":
              break;
            case "multiple":
              C = g;
            default:
              r.hasOwnProperty(s) || Le(e, t, s, null, r, g);
          }
          for (a in r) if (s = r[a], g = n[a], r.hasOwnProperty(a) && (s != null || g != null)) switch (a) {
            case "value":
              s !== g && (we = !0), w = s;
              break;
            case "defaultValue":
              s !== g && (we = !0), p = s;
              break;
            case "multiple":
              s !== g && (we = !0), i = s;
            default:
              s !== g && Le(e, t, a, s, r, g);
          }
          t = p, n = i, r = C, w != null ? _r(e, !!n, w, !1) : !!r != !!n && (t != null ? _r(e, !!n, t, !0) : _r(e, !!n, n ? [] : "", !1));
          return;
        case "textarea":
          C = w = null;
          for (p in n) if (a = n[p], n.hasOwnProperty(p) && a != null && !r.hasOwnProperty(p)) switch (p) {
            case "value":
              break;
            case "children":
              break;
            default:
              Le(e, t, p, null, r, a);
          }
          for (i in r) if (a = r[i], s = n[i], r.hasOwnProperty(i) && (a != null || s != null)) switch (i) {
            case "value":
              a !== s && (we = !0), w = a;
              break;
            case "defaultValue":
              a !== s && (we = !0), C = a;
              break;
            case "children":
              break;
            case "dangerouslySetInnerHTML":
              if (a != null) throw Error(c(91));
              break;
            default:
              a !== s && Le(e, t, i, a, r, s);
          }
          Gc(e, w, C);
          return;
        case "option":
          for (var V in n) if (w = n[V], n.hasOwnProperty(V) && w != null && !r.hasOwnProperty(V)) switch (V) {
            case "selected":
              e.selected = !1;
              break;
            default:
              Le(e, t, V, null, r, w);
          }
          for (g in r) if (w = r[g], C = n[g], r.hasOwnProperty(g) && w !== C && (w != null || C != null)) switch (g) {
            case "selected":
              w !== C && (we = !0), e.selected = w && typeof w != "function" && typeof w != "symbol";
              break;
            default:
              Le(e, t, g, w, r, C);
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
          for (var G in n) w = n[G], n.hasOwnProperty(G) && w != null && !r.hasOwnProperty(G) && Le(e, t, G, null, r, w);
          for (N in r) if (w = r[N], C = n[N], r.hasOwnProperty(N) && w !== C && (w != null || C != null)) switch (N) {
            case "children":
            case "dangerouslySetInnerHTML":
              if (w != null) throw Error(c(137, t));
              break;
            default:
              Le(e, t, N, w, r, C);
          }
          return;
        default:
          if (Mo(t)) {
            for (var ce in n) w = n[ce], n.hasOwnProperty(ce) && w !== void 0 && !r.hasOwnProperty(ce) && ju(e, t, ce, void 0, r, w);
            for (T in r) w = r[T], C = n[T], !r.hasOwnProperty(T) || w === C || w === void 0 && C === void 0 || ju(e, t, T, w, r, C);
            return;
          }
      }
      for (var S in n) w = n[S], n.hasOwnProperty(S) && w != null && !r.hasOwnProperty(S) && Le(e, t, S, null, r, w);
      for (R in r) w = r[R], C = n[R], !r.hasOwnProperty(R) || w === C || w == null && C == null || Le(e, t, R, w, r, C);
    }
    function ep(e) {
      switch (e) {
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
    function Ug() {
      if (typeof performance.getEntriesByType == "function") {
        for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
          var a = n[r], s = a.transferSize, i = a.initiatorType, p = a.duration;
          if (s && p && ep(i)) {
            for (i = 0, p = a.responseEnd, r += 1; r < n.length; r++) {
              var g = n[r], N = g.startTime;
              if (N > p) break;
              var T = g.transferSize, R = g.initiatorType;
              T && ep(R) && (g = g.responseEnd, i += T * (g < p ? 1 : (p - N) / (g - N)));
            }
            if (--r, t += 8 * (s + i) / (a.duration / 1e3), e++, 10 < e) break;
          }
        }
        if (0 < e) return t / e / 1e6;
      }
      return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
    }
    var Eu = null, Mu = null;
    function Cl(e) {
      return e.nodeType === 9 ? e : e.ownerDocument;
    }
    function tp(e) {
      switch (e) {
        case "http://www.w3.org/2000/svg":
          return 1;
        case "http://www.w3.org/1998/Math/MathML":
          return 2;
        default:
          return 0;
      }
    }
    function np(e, t) {
      if (e === 0) switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
      return e === 1 && t === "foreignObject" ? 0 : e;
    }
    function rp(e, t, n, r) {
      return n = Cl(n).createElement(e), n[ft] = r, n[Ct] = t, yt(n, e, t), ot(n), n;
    }
    function Lu(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    var Pu = null;
    function Ig() {
      var e = window.event;
      return e && e.type === "popstate" ? e === Pu ? !1 : (Pu = e, !0) : (Pu = null, !1);
    }
    var Ru = typeof setTimeout == "function" ? setTimeout : void 0, Dg = typeof clearTimeout == "function" ? clearTimeout : void 0, ap = typeof Promise == "function" ? Promise : void 0, lp = typeof requestAnimationFrame == "function" ? requestAnimationFrame : Ru, Fg = typeof queueMicrotask == "function" ? queueMicrotask : typeof ap < "u" ? function(e) {
      return ap.resolve(null).then(e).catch(Vg);
    } : Ru;
    function Vg(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function ur(e) {
      return e === "head";
    }
    function sp(e, t) {
      var n = t, r = 0;
      do {
        var a = n.nextSibling;
        if (e.removeChild(n), a && a.nodeType === 8) if (n = a.data, n === "/$" || n === "/&") {
          if (r === 0) {
            e.removeChild(a), Ua(t);
            return;
          }
          r--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
        else if (n === "html") Ou(e.ownerDocument.documentElement);
        else if (n === "head") {
          n = e.ownerDocument.head, Ou(n);
          for (var s = n.firstChild; s; ) {
            var i = s.nextSibling, p = s.nodeName;
            s[Wa] || p === "SCRIPT" || p === "STYLE" || p === "LINK" && s.rel.toLowerCase() === "stylesheet" || n.removeChild(s), s = i;
          }
        } else n === "body" && Ou(e.ownerDocument.body);
        n = a;
      } while (n);
      Ua(t);
    }
    function op(e, t) {
      var n = e;
      e = 0;
      do {
        var r = n.nextSibling;
        if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) if (n = r.data, n === "/$") {
          if (e === 0) break;
          e--;
        } else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
        n = r;
      } while (n);
    }
    function ip(e, t, n) {
      if (t = CSS.escape(t) !== t ? "r-" + btoa(t).replace(/=/g, "") : t, e.style.viewTransitionName = t, n != null && (e.style.viewTransitionClass = n), n = getComputedStyle(e), n.display === "inline") {
        if (t = e.getClientRects(), t.length === 1) var r = 1;
        else for (var a = r = 0; a < t.length; a++) {
          var s = t[a];
          0 < s.width && 0 < s.height && r++;
        }
        r === 1 && (e = e.style, e.display = t.length === 1 ? "inline-block" : "block", e.marginTop = "-" + n.paddingTop, e.marginBottom = "-" + n.paddingBottom);
      }
    }
    function up(e, t) {
      e = e.style, t = t.style;
      var n = t != null ? t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null : null;
      e.viewTransitionName = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), n = t != null ? t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null : null, e.viewTransitionClass = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), e.display === "inline-block" && (t == null ? e.display = e.margin = "" : (n = t.display, e.display = n == null || typeof n == "boolean" ? "" : n, n = t.margin, n != null ? e.margin = n : (n = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], e.marginTop = n == null || typeof n == "boolean" ? "" : n, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], e.marginBottom = t == null || typeof t == "boolean" ? "" : t)));
    }
    function cp(e, t, n) {
      return n = n.ownerDocument.defaultView, { rect: e, abs: t.position === "absolute" || t.position === "fixed", clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px", view: 0 <= e.bottom && 0 <= e.right && e.top <= n.innerHeight && e.left <= n.innerWidth };
    }
    function Bu(e) {
      return cp(e.getBoundingClientRect(), getComputedStyle(e), e);
    }
    function Og(e) {
      var t = e.getBoundingClientRect();
      t = new DOMRect(t.x + 2e4, t.y + 2e4, t.width, t.height);
      var n = getComputedStyle(e);
      return cp(t, n, e);
    }
    function Hg(e) {
      return e.documentElement.clientHeight;
    }
    function qg(e) {
      this.addEventListener("load", e), this.addEventListener("error", e);
    }
    function Wg(e, t, n, r, a, s, i, p, g) {
      var N = t.nodeType === 9 ? t : t.ownerDocument;
      try {
        var T = N.startViewTransition({ update: function() {
          var w = N.defaultView, C = w.navigation && w.navigation.transition, V = N.fonts.status;
          r();
          var G = [];
          if (V === "loaded" && (Hg(N), N.fonts.status === "loading" && G.push(N.fonts.ready)), V = G.length, e !== null) for (var ce = e.suspenseyImages, S = 0, v = 0; v < ce.length; v++) {
            var A = ce[v];
            if (!A.complete) {
              var L = A.getBoundingClientRect();
              if (0 < L.bottom && 0 < L.right && L.top < w.innerHeight && L.left < w.innerWidth) {
                if (S += Lp(A), S > ao) {
                  G.length = V;
                  break;
                }
                A = new Promise(qg.bind(A)), G.push(A);
              }
            }
          }
          if (0 < G.length) return w = Promise.race([Promise.all(G), new Promise(function(W) {
            return setTimeout(W, 500);
          })]).then(a, a), (C ? Promise.allSettled([C.finished, w]) : w).then(s, s);
          if (a(), C) return C.finished.then(s, s);
          s();
        }, types: n });
        N.__reactViewTransition = T;
        var R = [];
        return T.ready.then(function() {
          for (var w = N.documentElement.getAnimations({ subtree: !0 }), C = 0; C < w.length; C++) {
            var V = w[C], G = V.effect, ce = G.pseudoElement;
            if (ce != null && ce.startsWith("::view-transition")) {
              R.push(V), V = G.getKeyframes();
              for (var S = ce = void 0, v = !0, A = 0; A < V.length; A++) {
                var L = V[A], W = L.width;
                if (ce === void 0) ce = W;
                else if (ce !== W) {
                  v = !1;
                  break;
                }
                if (W = L.height, S === void 0) S = W;
                else if (S !== W) {
                  v = !1;
                  break;
                }
                delete L.width, delete L.height, L.transform === "none" && delete L.transform;
              }
              v && ce !== void 0 && S !== void 0 && (G.setKeyframes(V), v = getComputedStyle(G.target, G.pseudoElement), v.width !== ce || v.height !== S) && (v = V[0], v.width = ce, v.height = S, v = V[V.length - 1], v.width = ce, v.height = S, G.setKeyframes(V));
            }
          }
          i();
        }, function(w) {
          N.__reactViewTransition === T && (N.__reactViewTransition = null);
          try {
            if (typeof w == "object" && w !== null) switch (w.name) {
              case "InvalidStateError":
                (w.message === "View transition was skipped because document visibility state is hidden." || w.message === "Skipping view transition because document visibility state has become hidden." || w.message === "Skipping view transition because viewport size changed." || w.message === "Transition was aborted because of invalid state") && (w = null);
            }
            w !== null && g(w);
          } finally {
            r(), a(), i();
          }
        }), T.finished.finally(function() {
          for (var w = 0; w < R.length; w++) R[w].cancel();
          N.__reactViewTransition === T && (N.__reactViewTransition = null), p();
        }), T;
      } catch {
        return r(), a(), i(), null;
      }
    }
    function Or(e, t) {
      this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + t + ")";
    }
    Or.prototype.animate = function(e, t) {
      return t = typeof t == "number" ? { duration: t } : se({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
    }, Or.prototype.getAnimations = function() {
      for (var e = this._scope, t = this._selector, n = e.getAnimations({ subtree: !0 }), r = [], a = 0; a < n.length; a++) {
        var s = n[a].effect;
        s !== null && s.target === e && s.pseudoElement === t && r.push(n[a]);
      }
      return r;
    }, Or.prototype.getComputedStyle = function() {
      return getComputedStyle(this._scope, this._selector);
    };
    function dp(e) {
      return { name: e, group: new Or("group", e), imagePair: new Or("image-pair", e), old: new Or("old", e), new: new Or("new", e) };
    }
    function Ot(e) {
      this._fragmentFiber = e, this._observers = this._eventListeners = null;
    }
    Ot.prototype.addEventListener = function(e, t, n) {
      var r = null, a = null;
      if (!(n != null && typeof n != "boolean" && (r = n.signal || null, r !== null && r.aborted))) {
        this._eventListeners === null && (this._eventListeners = []);
        var s = this._eventListeners;
        if (pp(s, e, t, n) === -1) {
          var i = this, p = t;
          n != null && typeof n != "boolean" && n.once === !0 && (p = function(g) {
            i.removeEventListener(e, t, n), typeof t == "function" ? t.call(this, g) : t.handleEvent(g);
          }), r !== null && (a = i.removeEventListener.bind(i, e, t, n), r.addEventListener("abort", a, { once: !0 }), a = r.removeEventListener.bind(r, "abort", a)), r = Ma(n), s.push({ type: e, listener: t, optionsOrUseCapture: n, attachedListener: p, cleanup: a }), y(this._fragmentFiber.child, !1, Qg, e, p, r);
        }
        this._eventListeners = s;
      }
    };
    function Qg(e, t, n, r) {
      return Y(e).addEventListener(t, n, r), !1;
    }
    Ot.prototype.removeEventListener = function(e, t, n) {
      var r = this._eventListeners;
      if (r !== null && (t = pp(r, e, t, n), t !== -1)) {
        var a = r[t];
        n = a.attachedListener;
        var s = a.cleanup;
        a = Ma(a.optionsOrUseCapture), y(this._fragmentFiber.child, !1, Gg, e, n, a), r.splice(t, 1), s !== null && s();
      }
    };
    function Gg(e, t, n, r) {
      return Y(e).removeEventListener(t, n, r), !1;
    }
    function Ma(e) {
      return e != null && typeof e != "boolean" && (e.once === !0 || e.signal instanceof AbortSignal) ? { capture: e.capture, passive: e.passive } : e;
    }
    function fp(e) {
      return e == null ? "c=0" : typeof e == "boolean" ? "c=" + (e ? "1" : "0") : "c=" + (e.capture ? "1" : "0");
    }
    function pp(e, t, n, r) {
      if (e.length === 0) return -1;
      r = fp(r);
      for (var a = 0; a < e.length; a++) {
        var s = e[a];
        if (s.type === t && s.listener === n && fp(s.optionsOrUseCapture) === r) return a;
      }
      return -1;
    }
    Ot.prototype.dispatchEvent = function(e) {
      var t = I(this._fragmentFiber);
      if (t === null) return !0;
      t = Y(t);
      var n = this._eventListeners;
      if (n !== null && 0 < n.length || !e.bubbles) {
        var r = t.nodeType === 9 ? t.createComment("") : document.createTextNode("");
        if (n) for (var a = 0; a < n.length; a++) {
          var s = n[a];
          r.addEventListener(s.type, s.attachedListener, Ma(s.optionsOrUseCapture));
        }
        if (t.appendChild(r), e = r.dispatchEvent(e), n) for (a = 0; a < n.length; a++) s = n[a], r.removeEventListener(s.type, s.attachedListener, Ma(s.optionsOrUseCapture));
        return t.removeChild(r), e;
      }
      return t.dispatchEvent(e);
    }, Ot.prototype.focus = function(e) {
      y(this._fragmentFiber.child, !0, hp, e, void 0, void 0);
    };
    function hp(e, t) {
      return e.tag === 6 ? !1 : (e = Y(e), ay(e, t));
    }
    Ot.prototype.focusLast = function(e) {
      var t = [];
      y(this._fragmentFiber.child, !0, zu, t, void 0, void 0);
      for (var n = t.length - 1; 0 <= n && !hp(t[n], e); n--) ;
    };
    function zu(e, t) {
      return t.push(e), !1;
    }
    Ot.prototype.blur = function() {
      var e = I(this._fragmentFiber);
      e !== null && (e = Y(e), e = Cl(e).activeElement, e !== null && y(this._fragmentFiber.child, !1, Yg, e, void 0, void 0));
    };
    function Yg(e, t) {
      return e.tag === 6 ? !1 : (e = Y(e), e === t || e.contains(t) ? (t.blur(), !0) : !1);
    }
    Ot.prototype.observeUsing = function(e) {
      this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), y(this._fragmentFiber.child, !1, Jg, e, void 0, void 0);
    };
    function Jg(e, t) {
      return e.tag === 6 || (e = Y(e), t.observe(e)), !1;
    }
    Ot.prototype.unobserveUsing = function(e) {
      var t = this._observers;
      if (t !== null && t.has(e)) {
        t.delete(e), y(this._fragmentFiber.child, !1, Kg, e, void 0, void 0);
        for (var n = t = 0; n < on.length; n++) {
          var r = on[n];
          r.fragmentInstance === this && r.observer === e ? e.unobserve(r.instance) : on[t++] = r;
        }
        on.length = t;
      }
    };
    function Kg(e, t) {
      return e.tag === 6 || (e = Y(e), t.unobserve(e)), !1;
    }
    var on = [], Uu = !1;
    function Zg(e, t, n) {
      on.push({ fragmentInstance: e, observer: t, instance: n }), Uu || (Uu = !0, ly(function() {
        Uu = !1;
        var r = on;
        on = [];
        for (var a = 0; a < r.length; a++) {
          var s = r[a];
          s.observer.unobserve(s.instance);
        }
      }));
    }
    Ot.prototype.getClientRects = function() {
      var e = [];
      return y(this._fragmentFiber.child, !1, Xg, e, void 0, void 0), e;
    };
    function Xg(e, t) {
      if (e.tag === 6) {
        e = e.stateNode;
        var n = e.ownerDocument.createRange();
        n.selectNodeContents(e), t.push.apply(t, n.getClientRects());
      } else e = Y(e), t.push.apply(t, e.getClientRects());
      return !1;
    }
    Ot.prototype.getRootNode = function(e) {
      var t = I(this._fragmentFiber);
      return t === null ? this : Y(t).getRootNode(e);
    }, Ot.prototype.compareDocumentPosition = function(e) {
      var t = I(this._fragmentFiber);
      if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
      var n = [];
      y(this._fragmentFiber.child, !1, zu, n, void 0, void 0);
      var r = Y(t);
      if (n.length === 0) {
        if (n = r, q(this._fragmentFiber)) {
          e: {
            for (t = this._fragmentFiber.return; t !== null; ) {
              if (t.tag === 4) {
                t = t.stateNode.containerInfo;
                break e;
              }
              if (t.tag === 3 || t.tag === 5 || t.tag === 27) break;
              t = t.return;
            }
            t = null;
          }
          t != null && (n = t);
        }
        t = this._fragmentFiber;
        var a = r = n.compareDocumentPosition(e);
        return n === e ? a = Node.DOCUMENT_POSITION_CONTAINS : r & Node.DOCUMENT_POSITION_CONTAINED_BY && (n = te(t)[1], n === null ? a = Node.DOCUMENT_POSITION_PRECEDING : (e = Y(n).compareDocumentPosition(e), a = e === 0 || e & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), a |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
      }
      t = Y(n[0]), a = Y(n[n.length - 1]);
      var s = q(this._fragmentFiber) ? t.parentElement : r;
      if (s == null) return Node.DOCUMENT_POSITION_DISCONNECTED;
      r = s.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY, s = s.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_CONTAINED_BY;
      var i = t.compareDocumentPosition(e), p = a.compareDocumentPosition(e), g = i & Node.DOCUMENT_POSITION_CONTAINED_BY || p & Node.DOCUMENT_POSITION_CONTAINED_BY;
      return p = r && s && i & Node.DOCUMENT_POSITION_FOLLOWING && p & Node.DOCUMENT_POSITION_PRECEDING, t = r && t === e || s && a === e || g || p ? Node.DOCUMENT_POSITION_CONTAINED_BY : !r && t === e || !s && a === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : i, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || _g(t, this._fragmentFiber, n[0], n[n.length - 1], e) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    };
    function _g(e, t, n, r, a) {
      var s = br(a);
      if (e & Node.DOCUMENT_POSITION_CONTAINED_BY) {
        if (n = !!s) e: {
          for (; s !== null; ) {
            if (s.tag === 7 && (s === t || s.alternate === t)) {
              n = !0;
              break e;
            }
            s = s.return;
          }
          n = !1;
        }
        return n;
      }
      if (e & Node.DOCUMENT_POSITION_CONTAINS) {
        if (s === null) return s = a.ownerDocument, a === s || a === s.documentElement || a === s.body;
        e: {
          for (s = t, t = I(t); s !== null; ) {
            if (!(s.tag !== 5 && s.tag !== 3 && s.tag !== 27 || s !== t && s.alternate !== t)) {
              s = !0;
              break e;
            }
            s = s.return;
          }
          s = !1;
        }
        return s;
      }
      return e & Node.DOCUMENT_POSITION_PRECEDING ? ((t = !!s) && !(t = s === n) && (t = He(n, s, Ue), t === null ? t = !1 : (y(t, !0, tt, s, n), s = Se, Se = null, t = s !== null)), t) : e & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!s) && !(t = s === r) && (t = He(r, s, Ue), t === null ? t = !1 : (y(t, !0, lt, s, r), s = Se, ze = Se = null, t = s !== null)), t) : !1;
    }
    function mp(e, t) {
      var n = e.ownerDocument.createRange();
      n.selectNodeContents(e), e = n.getBoundingClientRect(), window.scrollTo(window.scrollX + e.left, t ? window.scrollY + e.top : window.scrollY + e.bottom - window.innerHeight);
    }
    Ot.prototype.scrollIntoView = function(e) {
      if (typeof e == "object") throw Error(c(566));
      var t = [];
      y(this._fragmentFiber.child, !1, zu, t, void 0, void 0);
      var n = e !== !1;
      if (t.length === 0) {
        var r = te(this._fragmentFiber);
        if (r = n ? r[1] || r[0] || I(this._fragmentFiber) : r[0] || r[1], r === null) return;
        if (r.tag === 6) {
          e = Y(r), mp(e, n);
          return;
        }
        if (r = Y(r), r.nodeType !== 9) {
          if (r.nodeType === 11) {
            n = "host" in r ? r.host : null, n !== null && n.scrollIntoView(e);
            return;
          }
          r.scrollIntoView(e);
        }
      }
      for (r = n ? t.length - 1 : 0; r !== (n ? -1 : t.length); ) {
        var a = t[r];
        a.tag === 6 ? (a = Y(a), mp(a, n)) : Y(a).scrollIntoView(e), r += n ? -1 : 1;
      }
    };
    function $g(e, t) {
      return e = Y(e), gp(e, t), !1;
    }
    function gp(e, t) {
      e.reactFragments ??= /* @__PURE__ */ new Set(), e.reactFragments.add(t);
    }
    function yp(e, t) {
      var n = t._eventListeners;
      if (n !== null) for (var r = 0; r < n.length; r++) {
        var a = n[r];
        e.addEventListener(a.type, a.attachedListener, Ma(a.optionsOrUseCapture));
      }
      e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(s) {
        for (var i = 0, p = 0; p < on.length; p++) {
          var g = on[p];
          (g.fragmentInstance !== t || g.observer !== s || g.instance !== e) && (on[i++] = g);
        }
        on.length = i, s.observe(e);
      }), gp(e, t));
    }
    function ey(e, t) {
      var n = t._eventListeners;
      if (n !== null) for (var r = 0; r < n.length; r++) {
        var a = n[r];
        e.removeEventListener(a.type, a.attachedListener, Ma(a.optionsOrUseCapture));
      }
      e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(s) {
        typeof s.rootMargin == "string" ? Zg(t, s, e) : s.unobserve(e);
      }), e.reactFragments != null && e.reactFragments.delete(t));
    }
    function Iu(e) {
      var t = e.firstChild;
      for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
        var n = t;
        switch (t = t.nextSibling, n.nodeName) {
          case "HTML":
          case "HEAD":
          case "BODY":
            Iu(n), Yl(n);
            continue;
          case "SCRIPT":
          case "STYLE":
            continue;
          case "LINK":
            if (n.rel.toLowerCase() === "stylesheet") continue;
        }
        e.removeChild(n);
      }
    }
    function ty(e, t, n, r) {
      for (; e.nodeType === 1; ) {
        var a = n;
        if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
          if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
        } else if (r) {
          if (!e[Wa]) switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (s = e.getAttribute("rel"), s === "stylesheet" && e.hasAttribute("data-precedence") || s !== a.rel || e.getAttribute("href") !== (a.href == null || a.href === "" ? null : a.href) || e.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin) || e.getAttribute("title") !== (a.title == null ? null : a.title)) break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (s = e.getAttribute("src"), (s !== (a.src == null ? null : a.src) || e.getAttribute("type") !== (a.type == null ? null : a.type) || e.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin)) && s && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
              return e;
            default:
              return e;
          }
        } else if (t === "input" && e.type === "hidden") {
          var s = a.name == null ? null : "" + a.name;
          if (a.type === "hidden" && e.getAttribute("name") === s) return e;
        } else return e;
        if (e = Xt(e.nextSibling), e === null) break;
      }
      return null;
    }
    function ny(e, t, n) {
      if (t === "") return null;
      for (; e.nodeType !== 3; ) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Xt(e.nextSibling), e === null)) return null;
      return e;
    }
    function bp(e, t) {
      for (; e.nodeType !== 8; ) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Xt(e.nextSibling), e === null)) return null;
      return e;
    }
    function Du(e) {
      return e.data === "$?" || e.data === "$~";
    }
    function Fu(e) {
      return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
    }
    function ry(e, t) {
      var n = e.ownerDocument;
      if (e.data === "$~") e._reactRetry = t;
      else if (e.data !== "$?" || n.readyState !== "loading") t();
      else {
        var r = function() {
          t(), n.removeEventListener("DOMContentLoaded", r);
        };
        n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
      }
    }
    function Xt(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
          if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
          if (t === "/$" || t === "/&") return null;
        }
      }
      return e;
    }
    var Vu = null;
    function vp(e) {
      e = e.nextSibling;
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$" || n === "/&") {
            if (t === 0) return Xt(e.nextSibling);
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
        }
        e = e.nextSibling;
      }
      return null;
    }
    function xp(e) {
      e = e.previousSibling;
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
            if (t === 0) return e;
            t--;
          } else n !== "/$" && n !== "/&" || t++;
        }
        e = e.previousSibling;
      }
      return null;
    }
    function ay(e, t) {
      function n() {
        r = !0;
      }
      if (e.ownerDocument.activeElement === e) return !0;
      var r = !1;
      try {
        e.ownerDocument.addEventListener("focus", n, !0), (e.focus || HTMLElement.prototype.focus).call(e, t);
      } finally {
        e.ownerDocument.removeEventListener("focus", n, !0);
      }
      return r;
    }
    function ly(e) {
      lp(function() {
        lp(function(t) {
          return e(t);
        });
      });
    }
    function kp(e, t, n) {
      switch (t = Cl(n), e) {
        case "html":
          if (e = t.documentElement, !e) throw Error(c(452));
          return e;
        case "head":
          if (e = t.head, !e) throw Error(c(453));
          return e;
        case "body":
          if (e = t.body, !e) throw Error(c(454));
          return e;
        default:
          throw Error(c(451));
      }
    }
    function wp(e, t, n) {
      for (var r in n) {
        var a = n[r];
        n.hasOwnProperty(r) && a != null && Le(e, t, r, null, Bg, a);
      }
      n.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === pn && (e.onclick = null), Yl(e);
    }
    function Ou(e) {
      for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
      Yl(e);
    }
    var _t = /* @__PURE__ */ new Map(), Sp = /* @__PURE__ */ new Set();
    function Tl(e) {
      if (typeof e.getRootNode == "function") {
        var t = e.getRootNode();
        if (t.nodeType === 9 || t.nodeType === 11) return t;
      }
      return e.nodeType === 9 ? e : e.ownerDocument;
    }
    var On = O.d;
    O.d = { f: sy, r: oy, D: iy, C: uy, L: cy, m: dy, X: py, S: fy, M: hy };
    function sy() {
      var e = On.f(), t = Ks();
      return e || t;
    }
    function oy(e) {
      var t = Kr(e);
      t !== null && t.tag === 5 && t.type === "form" ? Cf(t) : On.r(e);
    }
    var La = typeof document > "u" ? null : document;
    function Np(e, t, n) {
      var r = La;
      if (r && typeof t == "string" && t) {
        var a = tn(t);
        a = 'link[rel="' + e + '"][href="' + a + '"]', typeof n == "string" && (a += '[crossorigin="' + n + '"]'), Sp.has(a) || (Sp.add(a), e = { rel: e, crossOrigin: n, href: t }, r.querySelector(a) === null && (t = r.createElement("link"), yt(t, "link", e), ot(t), r.head.appendChild(t)));
      }
    }
    function iy(e) {
      On.D(e), Np("dns-prefetch", e, null);
    }
    function uy(e, t) {
      On.C(e, t), Np("preconnect", e, t);
    }
    function cy(e, t, n) {
      On.L(e, t, n);
      var r = La;
      if (r && e && t) {
        var a = 'link[rel="preload"][as="' + tn(t) + '"]';
        t === "image" && n && n.imageSrcSet ? (a += '[imagesrcset="' + tn(n.imageSrcSet) + '"]', typeof n.imageSizes == "string" && (a += '[imagesizes="' + tn(n.imageSizes) + '"]')) : a += '[href="' + tn(e) + '"]';
        var s = a;
        switch (t) {
          case "style":
            s = Pa(e);
            break;
          case "script":
            s = Ra(e);
        }
        if (!(_t.has(s) || (e = se({ rel: "preload", href: t === "image" && n && n.imageSrcSet ? void 0 : e, as: t }, n), _t.set(s, e), r.querySelector(a) !== null || t === "style" && r.querySelector(jl(s)) || t === "script" && r.querySelector(El(s))))) {
          var i = r.createElement("link");
          yt(i, "link", e), t === "style" && (i[Gl] = !0, i.onload = i.onerror = function() {
            Ic(i);
          }), ot(i), r.head.appendChild(i);
        }
      }
    }
    function dy(e, t) {
      On.m(e, t);
      var n = La;
      if (n && e) {
        var r = t && typeof t.as == "string" ? t.as : "script", a = 'link[rel="modulepreload"][as="' + tn(r) + '"][href="' + tn(e) + '"]', s = a;
        switch (r) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            s = Ra(e);
        }
        if (!_t.has(s) && (e = se({ rel: "modulepreload", href: e }, t), _t.set(s, e), n.querySelector(a) === null)) {
          switch (r) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
              if (n.querySelector(El(s))) return;
          }
          r = n.createElement("link"), yt(r, "link", e), ot(r), n.head.appendChild(r);
        }
      }
    }
    function fy(e, t, n) {
      On.S(e, t, n);
      var r = La;
      if (r && e) {
        var a = Zr(r).hoistableStyles, s = Pa(e);
        t = t || "default";
        var i = a.get(s);
        if (!i) {
          var p = { loading: 0, preload: null };
          if (i = r.querySelector(jl(s))) p.loading = 5;
          else {
            e = se({ rel: "stylesheet", href: e, "data-precedence": t }, n), (n = _t.get(s)) && Hu(e, n);
            var g = i = r.createElement("link");
            ot(g), yt(g, "link", e), g._p = new Promise(function(N, T) {
              g.onload = N, g.onerror = T;
            }), g.addEventListener("load", function() {
              p.loading |= 1;
            }), g.addEventListener("error", function() {
              p.loading |= 2;
            }), p.loading |= 4, no(i, t, r);
          }
          i = { type: "stylesheet", instance: i, count: 1, state: p }, a.set(s, i);
        }
      }
    }
    function py(e, t) {
      On.X(e, t);
      var n = La;
      if (n && e) {
        var r = Zr(n).hoistableScripts, a = Ra(e), s = r.get(a);
        s || (s = n.querySelector(El(a)), s || (e = se({ src: e, async: !0 }, t), (t = _t.get(a)) && qu(e, t), s = n.createElement("script"), ot(s), yt(s, "link", e), n.head.appendChild(s)), s = { type: "script", instance: s, count: 1, state: null }, r.set(a, s));
      }
    }
    function hy(e, t) {
      On.M(e, t);
      var n = La;
      if (n && e) {
        var r = Zr(n).hoistableScripts, a = Ra(e), s = r.get(a);
        s || (s = n.querySelector(El(a)), s || (e = se({ src: e, async: !0, type: "module" }, t), (t = _t.get(a)) && qu(e, t), s = n.createElement("script"), ot(s), yt(s, "link", e), n.head.appendChild(s)), s = { type: "script", instance: s, count: 1, state: null }, r.set(a, s));
      }
    }
    function Ap(e, t, n, r) {
      var a = (a = fn.current) ? Tl(a) : null;
      if (!a) throw Error(c(446));
      switch (e) {
        case "meta":
        case "title":
          return null;
        case "style":
          return typeof n.precedence == "string" && typeof n.href == "string" ? (n = Pa(n.href), t = Zr(a).hoistableStyles, r = t.get(n), r || (r = { type: "style", instance: null, count: 0, state: null }, t.set(n, r)), r) : { type: "void", instance: null, count: 0, state: null };
        case "link":
          if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
            e = Pa(n.href);
            var s = Zr(a).hoistableStyles, i = s.get(e);
            if (i || (a = a.ownerDocument || a, i = { type: "stylesheet", instance: null, count: 0, state: { loading: 0, preload: null } }, s.set(e, i), (s = a.querySelector(jl(e))) ? s._p || (i.instance = s, i.state.loading = 5) : (s = _t.get(e), s || (s = { rel: "preload", as: "style", href: n.href, crossOrigin: n.crossOrigin, integrity: n.integrity, media: n.media, hrefLang: n.hrefLang, referrerPolicy: n.referrerPolicy }, _t.set(e, s)), my(a, e, s, i.state))), t && r === null) throw Error(c(528, ""));
            return i;
          }
          if (t && r !== null) throw Error(c(529, ""));
          return null;
        case "script":
          return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = Ra(n), t = Zr(a).hoistableScripts, r = t.get(n), r || (r = { type: "script", instance: null, count: 0, state: null }, t.set(n, r)), r) : { type: "void", instance: null, count: 0, state: null };
        default:
          throw Error(c(444, e));
      }
    }
    function Pa(e) {
      return 'href="' + tn(e) + '"';
    }
    function jl(e) {
      return 'link[rel="stylesheet"][' + e + "]";
    }
    function Cp(e) {
      return se({}, e, { "data-precedence": e.precedence, precedence: null });
    }
    function my(e, t, n, r) {
      if (t = e.querySelector('link[rel="preload"][as="style"][' + t + "]")) {
        if (t[Gl] !== !0) {
          r.loading = 1;
          return;
        }
      } else t = e.createElement("link"), t[Gl] = !0, t.onload = t.onerror = Ic.bind(null, t), yt(t, "link", n), ot(t), e.head.appendChild(t);
      r.preload = t, t.addEventListener("load", function() {
        return r.loading |= 1;
      }), t.addEventListener("error", function() {
        return r.loading |= 2;
      });
    }
    function Ra(e) {
      return '[src="' + tn(e) + '"]';
    }
    function El(e) {
      return "script[async]" + e;
    }
    function Tp(e, t, n) {
      if (t.count++, t.instance === null) switch (t.type) {
        case "style":
          var r = e.querySelector('style[data-href~="' + tn(n.href) + '"]');
          if (r) return t.instance = r, ot(r), r;
          var a = se({}, n, { "data-href": n.href, "data-precedence": n.precedence, href: null, precedence: null });
          return r = (e.ownerDocument || e).createElement("style"), ot(r), yt(r, "style", a), no(r, n.precedence, e), t.instance = r;
        case "stylesheet":
          a = Pa(n.href);
          var s = e.querySelector(jl(a));
          if (s) return t.state.loading |= 4, t.instance = s, ot(s), s;
          r = Cp(n), (a = _t.get(a)) && Hu(r, a), s = (e.ownerDocument || e).createElement("link"), ot(s);
          var i = s;
          return i._p = new Promise(function(p, g) {
            i.onload = p, i.onerror = g;
          }), yt(s, "link", r), t.state.loading |= 4, no(s, n.precedence, e), t.instance = s;
        case "script":
          return s = Ra(n.src), (a = e.querySelector(El(s))) ? (t.instance = a, ot(a), a) : (r = n, (a = _t.get(s)) && (r = se({}, n), qu(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), ot(a), yt(a, "link", r), e.head.appendChild(a), t.instance = a);
        case "void":
          return null;
        default:
          throw Error(c(443, t.type));
      }
      else t.type === "stylesheet" && (t.state.loading & 4) === 0 && (r = t.instance, t.state.loading |= 4, no(r, n.precedence, e));
      return t.instance;
    }
    function no(e, t, n) {
      for (var r = n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), a = r.length ? r[r.length - 1] : null, s = a, i = 0; i < r.length; i++) {
        var p = r[i];
        if (p.dataset.precedence === t) s = p;
        else if (s !== a) break;
      }
      s ? s.parentNode.insertBefore(e, s.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
    }
    function Hu(e, t) {
      e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
    }
    function qu(e, t) {
      e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
    }
    var ro = null;
    function jp(e, t, n) {
      if (ro === null) {
        var r = /* @__PURE__ */ new Map(), a = ro = /* @__PURE__ */ new Map();
        a.set(n, r);
      } else a = ro, r = a.get(n), r || (r = /* @__PURE__ */ new Map(), a.set(n, r));
      if (r.has(e)) return r;
      for (r.set(e, null), n = n.getElementsByTagName(e), a = 0; a < n.length; a++) {
        var s = n[a];
        if (!(s[Wa] || s[ft] || e === "link" && s.getAttribute("rel") === "stylesheet") && s.namespaceURI !== "http://www.w3.org/2000/svg") {
          var i = s.getAttribute(t) || "";
          i = e + i;
          var p = r.get(i);
          p ? p.push(s) : r.set(i, [s]);
        }
      }
      return r;
    }
    function Wu(e, t, n) {
      e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
    }
    function gy(e, t, n) {
      if (n === 1 || t.itemProp != null) return !1;
      switch (e) {
        case "meta":
        case "title":
          return !0;
        case "style":
          if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
          return !0;
        case "link":
          if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
          switch (t.rel) {
            case "stylesheet":
              return e = t.disabled, typeof t.precedence == "string" && e == null;
            default:
              return !0;
          }
        case "script":
          if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
      }
      return !1;
    }
    function Ep(e, t) {
      return e === "img" && t.src != null && t.src !== "" && t.onLoad == null && t.loading !== "lazy";
    }
    function Mp(e) {
      return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
    }
    function Lp(e) {
      return (e.width || 100) * (e.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
    }
    function Pp(e, t) {
      typeof t.decode == "function" && (e.imgCount++, t.complete || (e.imgBytes += Lp(t), e.suspenseyImages.push(t)), e = vy.bind(e), t.decode().then(e, e));
    }
    function yy(e, t, n, r) {
      if (n.type === "stylesheet" && (typeof r.media != "string" || matchMedia(r.media).matches !== !1) && (n.state.loading & 4) === 0) {
        if (n.instance === null) {
          var a = Pa(r.href), s = t.querySelector(jl(a));
          if (s) {
            t = s._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Ml.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = s, ot(s);
            return;
          }
          s = t.ownerDocument || t, r = Cp(r), (a = _t.get(a)) && Hu(r, a), s = s.createElement("link"), ot(s);
          var i = s;
          i._p = new Promise(function(p, g) {
            i.onload = p, i.onerror = g;
          }), yt(s, "link", r), n.instance = s;
        }
        e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && (n.state.loading & 3) === 0 && (e.count++, n = Ml.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
      }
    }
    var ao = 0;
    function by(e, t) {
      return e.stylesheets && e.count === 0 && so(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
        var r = setTimeout(function() {
          if (e.stylesheets && so(e, e.stylesheets), e.unsuspend) {
            var s = e.unsuspend;
            e.unsuspend = null, s();
          }
        }, 6e4 + t);
        0 < e.imgBytes && ao === 0 && (ao = 62500 * Ug());
        var a = setTimeout(function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && so(e, e.stylesheets), e.unsuspend)) {
            var s = e.unsuspend;
            e.unsuspend = null, s();
          }
        }, (e.imgBytes > ao ? 50 : 800) + t);
        return e.unsuspend = n, function() {
          e.unsuspend = null, clearTimeout(r), clearTimeout(a);
        };
      } : null;
    }
    function Rp(e) {
      if (e.count === 0 && (e.imgCount === 0 || !e.waitingForImages)) {
        if (e.stylesheets) so(e, e.stylesheets);
        else if (e.unsuspend) {
          var t = e.unsuspend;
          e.unsuspend = null, t();
        }
      }
    }
    function Ml() {
      this.count--, Rp(this);
    }
    function vy() {
      this.imgCount--, Rp(this);
    }
    var lo = null;
    function so(e, t) {
      e.stylesheets = null, e.unsuspend !== null && (e.count++, lo = /* @__PURE__ */ new Map(), t.forEach(xy, e), lo = null, Ml.call(e));
    }
    function xy(e, t) {
      if (!(t.state.loading & 4)) {
        var n = lo.get(e);
        if (n) var r = n.get(null);
        else {
          n = /* @__PURE__ */ new Map(), lo.set(e, n);
          for (var a = e.querySelectorAll("link[data-precedence],style[data-precedence]"), s = 0; s < a.length; s++) {
            var i = a[s];
            (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (n.set(i.dataset.precedence, i), r = i);
          }
          r && n.set(null, r);
        }
        a = t.instance, i = a.getAttribute("data-precedence"), s = n.get(i) || r, s === r && n.set(null, a), n.set(i, a), this.count++, r = Ml.bind(this), a.addEventListener("load", r), a.addEventListener("error", r), s ? s.parentNode.insertBefore(a, s.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(a, e.firstChild)), t.state.loading |= 4;
      }
    }
    var Ba = { $$typeof: D, Provider: null, Consumer: null, _currentValue: le, _currentValue2: le, _threadCount: 0 };
    function ky(e, t, n, r, a, s, i, p, g) {
      this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ao(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ao(0), this.hiddenUpdates = Ao(null), this.identifierPrefix = r, this.onUncaughtError = a, this.onCaughtError = s, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = g, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
    }
    function wy(e, t, n, r, a, s, i, p, g, N, T, R) {
      return e = new ky(e, t, n, i, g, N, T, R, p), t = 1, s === !0 && (t |= 24), s = Tt(3, null, null, t), e.current = s, s.stateNode = e, t = li(), t.refCount++, e.pooledCache = t, t.refCount++, s.memoizedState = { element: r, isDehydrated: n, cache: t }, ui(s), e;
    }
    function Sy(e) {
      return e ? (e = sa, e) : sa;
    }
    function Bp(e, t, n, r, a, s) {
      a = Sy(a), r.context === null ? r.context = a : r.pendingContext = a, r = Rr(t), r.payload = { element: n }, s = s === void 0 ? null : s, s !== null && (r.callback = s), n = Br(e, r, t), n !== null && (Lt(n, e, t), ol(n, e, t));
    }
    function zp(e, t) {
      if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t;
      }
    }
    function Qu(e, t) {
      zp(e, t), (e = e.alternate) && zp(e, t);
    }
    function Up(e) {
      if (e.tag === 13 || e.tag === 31) {
        var t = wr(e, 67108864);
        t !== null && Lt(t, e, 67108864), Qu(e, 67108864);
      }
    }
    function Ip(e) {
      if (e.tag === 13 || e.tag === 31) {
        var t = Zt();
        t = Pc(t);
        var n = wr(e, t);
        n !== null && Lt(n, e, t), Qu(e, t);
      }
    }
    var za = !0;
    function Ny(e, t, n, r) {
      var a = H.T;
      H.T = null;
      var s = O.p;
      try {
        O.p = 2, Gu(e, t, n, r);
      } finally {
        O.p = s, H.T = a;
      }
    }
    function Ay(e, t, n, r) {
      var a = H.T;
      H.T = null;
      var s = O.p;
      try {
        O.p = 8, Gu(e, t, n, r);
      } finally {
        O.p = s, H.T = a;
      }
    }
    function Gu(e, t, n, r) {
      if (za) {
        var a = Yu(r);
        if (a === null) Tu(e, t, r, oo, n), Fp(e, r);
        else if (Ty(a, e, t, n, r)) r.stopPropagation();
        else if (Fp(e, r), t & 4 && -1 < Cy.indexOf(e)) {
          for (; a !== null; ) {
            var s = Kr(a);
            if (s !== null) switch (s.tag) {
              case 3:
                if (s = s.stateNode, s.current.memoizedState.isDehydrated) {
                  var i = yr(s.pendingLanes);
                  if (i !== 0) {
                    var p = s;
                    for (p.pendingLanes |= 2, p.entangledLanes |= 2; i; ) {
                      var g = 1 << 31 - Bt(i);
                      p.entanglements[1] |= g, i &= ~g;
                    }
                    Vn(s), (Ae & 6) === 0 && (Gs = Pt() + 500, Sl(0, !1));
                  }
                }
                break;
              case 31:
              case 13:
                p = wr(s, 2), p !== null && Lt(p, s, 2), Ks(), Qu(s, 2);
            }
            if (s = Yu(r), s === null && Tu(e, t, r, oo, n), s === a) break;
            a = s;
          }
          a !== null && r.stopPropagation();
        } else Tu(e, t, r, null, n);
      }
    }
    function Yu(e) {
      return e = Po(e), Ju(e);
    }
    var oo = null;
    function Ju(e) {
      if (oo = null, e = br(e), e !== null) {
        var t = m(e);
        if (t === null) e = null;
        else {
          var n = t.tag;
          if (n === 13) {
            if (e = x(t), e !== null) return e;
            e = null;
          } else if (n === 31) {
            if (e = k(t), e !== null) return e;
            e = null;
          } else if (n === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null;
          } else t !== e && (e = null);
        }
      }
      return oo = e, null;
    }
    function Dp(e) {
      switch (e) {
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
          switch (Ym()) {
            case Nc:
              return 2;
            case Ac:
              return 8;
            case Vl:
            case Jm:
              return 32;
            case Cc:
              return 268435456;
            default:
              return 32;
          }
        default:
          return 32;
      }
    }
    var Ku = !1, cr = null, dr = null, fr = null, Ll = /* @__PURE__ */ new Map(), Pl = /* @__PURE__ */ new Map(), pr = [], Cy = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
    function Fp(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          cr = null;
          break;
        case "dragenter":
        case "dragleave":
          dr = null;
          break;
        case "mouseover":
        case "mouseout":
          fr = null;
          break;
        case "pointerover":
        case "pointerout":
          Ll.delete(t.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          Pl.delete(t.pointerId);
      }
    }
    function Rl(e, t, n, r, a, s) {
      return e === null || e.nativeEvent !== s ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: s, targetContainers: [a] }, t !== null && (t = Kr(t), t !== null && Up(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, a !== null && t.indexOf(a) === -1 && t.push(a), e);
    }
    function Ty(e, t, n, r, a) {
      switch (t) {
        case "focusin":
          return cr = Rl(cr, e, t, n, r, a), !0;
        case "dragenter":
          return dr = Rl(dr, e, t, n, r, a), !0;
        case "mouseover":
          return fr = Rl(fr, e, t, n, r, a), !0;
        case "pointerover":
          var s = a.pointerId;
          return Ll.set(s, Rl(Ll.get(s) || null, e, t, n, r, a)), !0;
        case "gotpointercapture":
          return s = a.pointerId, Pl.set(s, Rl(Pl.get(s) || null, e, t, n, r, a)), !0;
      }
      return !1;
    }
    function Vp(e) {
      var t = br(e.target);
      if (t !== null) {
        var n = m(t);
        if (n !== null) {
          if (t = n.tag, t === 13) {
            if (t = x(n), t !== null) {
              e.blockedOn = t, Bc(e.priority, function() {
                Ip(n);
              });
              return;
            }
          } else if (t === 31) {
            if (t = k(n), t !== null) {
              e.blockedOn = t, Bc(e.priority, function() {
                Ip(n);
              });
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
    function io(e) {
      if (e.blockedOn !== null) return !1;
      for (var t = e.targetContainers; 0 < t.length; ) {
        var n = Yu(e.nativeEvent);
        if (n === null) {
          n = e.nativeEvent;
          var r = new n.constructor(n.type, n);
          Lo = r, n.target.dispatchEvent(r), Lo = null;
        } else return t = Kr(n), t !== null && Up(t), e.blockedOn = n, !1;
        t.shift();
      }
      return !0;
    }
    function Op(e, t, n) {
      io(e) && n.delete(t);
    }
    function jy() {
      Ku = !1, cr !== null && io(cr) && (cr = null), dr !== null && io(dr) && (dr = null), fr !== null && io(fr) && (fr = null), Ll.forEach(Op), Pl.forEach(Op);
    }
    function uo(e, t) {
      e.blockedOn === t && (e.blockedOn = null, Ku || (Ku = !0, o.unstable_scheduleCallback(o.unstable_NormalPriority, jy)));
    }
    var co = null;
    function Hp(e) {
      co !== e && (co = e, o.unstable_scheduleCallback(o.unstable_NormalPriority, function() {
        co === e && (co = null);
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t], r = e[t + 1], a = e[t + 2];
          if (typeof r != "function") {
            if (Ju(r || n) === null) continue;
            break;
          }
          var s = Kr(n);
          s !== null && (e.splice(t, 3), t -= 3, Mi(s, { pending: !0, data: a, method: n.method, action: r }, r, a));
        }
      }));
    }
    function Ua(e) {
      function t(g) {
        return uo(g, e);
      }
      cr !== null && uo(cr, e), dr !== null && uo(dr, e), fr !== null && uo(fr, e), Ll.forEach(t), Pl.forEach(t);
      for (var n = 0; n < pr.length; n++) {
        var r = pr[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
      for (; 0 < pr.length && (n = pr[0], n.blockedOn === null); ) Vp(n), n.blockedOn === null && pr.shift();
      if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
        var a = n[r], s = n[r + 1], i = a[Ct] || null;
        if (typeof s == "function") i || Hp(n);
        else if (i) {
          var p = null;
          if (s && s.hasAttribute("formAction")) {
            if (a = s, i = s[Ct] || null) p = i.formAction;
            else if (Ju(a) !== null) continue;
          } else p = i.action;
          typeof p == "function" ? n[r + 1] = p : (n.splice(r, 3), r -= 3), Hp(n);
        }
      }
    }
    function Ey() {
      function e(s) {
        s.canIntercept && s.info === "react-transition" && s.intercept({ handler: function() {
          return new Promise(function(i) {
            return a = i;
          });
        }, focusReset: "manual", scroll: "manual" });
      }
      function t() {
        a !== null && (a(), a = null), r || setTimeout(n, 20);
      }
      function n() {
        if (!r && !navigation.transition) {
          var s = navigation.currentEntry;
          s && s.url != null && navigation.navigate(s.url, { state: s.getState(), info: "react-transition", history: "replace" });
        }
      }
      if (typeof navigation == "object") {
        var r = !1, a = null;
        return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
          r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), a !== null && (a(), a = null);
        };
      }
    }
    function Zu(e) {
      this._internalRoot = e;
    }
    Xu.prototype.render = Zu.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null) throw Error(c(409));
      var n = t.current;
      Bp(n, Zt(), e, t, null, null);
    }, Xu.prototype.unmount = Zu.prototype.unmount = function() {
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        Bp(e.current, 2, null, e, null, null), Ks(), t[qa] = null;
      }
    };
    function Xu(e) {
      this._internalRoot = e;
    }
    Xu.prototype.unstable_scheduleHydration = function(e) {
      if (e) {
        var t = Rc();
        e = { blockedOn: null, target: e, priority: t };
        for (var n = 0; n < pr.length && t !== 0 && t < pr[n].priority; n++) ;
        pr.splice(n, 0, e), n === 0 && Vp(e);
      }
    };
    var qp = u.version;
    if (qp !== "19.3.1") throw Error(c(527, qp, "19.3.1"));
    O.findDOMNode = function(e) {
      var t = e._reactInternals;
      if (t === void 0) throw typeof e.render == "function" ? Error(c(188)) : (e = Object.keys(e).join(","), Error(c(268, e)));
      return e = F(t), e = e !== null ? j(e) : null, e = e === null ? null : e.stateNode, e;
    };
    var My = { bundleType: 0, version: "19.3.1", rendererPackageName: "react-dom", currentDispatcherRef: H, reconcilerVersion: "19.3.1" };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
      var fo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!fo.isDisabled && fo.supportsFiber) try {
        Oa = fo.inject(My), Rt = fo;
      } catch {
      }
    }
    l.createRoot = function(e, t) {
      if (!h(e)) throw Error(c(299));
      var n = !1, r = "", a = rg, s = ag, i = lg;
      return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (a = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = wy(e, 1, !1, null, null, n, r, null, a, s, i, Ey), e[qa] = t.current, K0(e), new Zu(t);
    };
  })), nh = un(((l, o) => {
    function u() {
      if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u);
      } catch (f) {
        console.error(f);
      }
    }
    u(), o.exports = th();
  })), rh = (l) => l.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), ah = (l) => l.replace(/^([A-Z])|[\s-_]+(\w)/g, (o, u, f) => f ? f.toUpperCase() : u.toLowerCase()), ec = (l) => {
    const o = ah(l);
    return o.charAt(0).toUpperCase() + o.slice(1);
  }, tc = (...l) => l.filter((o, u, f) => !!o && o.trim() !== "" && f.indexOf(o) === u).join(" ").trim(), lh = (l) => {
    for (const o in l) if (o.startsWith("aria-") || o === "role" || o === "title") return !0;
  }, sh = { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }, oe = Kp(po()), oh = (0, oe.forwardRef)(({ color: l = "currentColor", size: o = 24, strokeWidth: u = 2, absoluteStrokeWidth: f, className: c = "", children: h, iconNode: m, ...x }, k) => (0, oe.createElement)("svg", { ref: k, ...sh, width: o, height: o, stroke: l, strokeWidth: f ? Number(u) * 24 / Number(o) : u, className: tc("lucide", c), ...!h && !lh(x) && { "aria-hidden": "true" }, ...x }, [...m.map(([P, F]) => (0, oe.createElement)(P, F)), ...Array.isArray(h) ? h : [h]])), ie = (l, o) => {
    const u = (0, oe.forwardRef)(({ className: f, ...c }, h) => (0, oe.createElement)(oh, { ref: h, iconNode: o, className: tc(`lucide-${rh(ec(l))}`, `lucide-${l}`, f), ...c }));
    return u.displayName = ec(l), u;
  }, ih = [["rect", { width: "20", height: "5", x: "2", y: "3", rx: "1", key: "1wp1u1" }], ["path", { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8", key: "1s80jp" }], ["path", { d: "M10 12h4", key: "a56b0p" }]], uh = ie("archive", ih), ch = [["path", { d: "m12 19-7-7 7-7", key: "1l729n" }], ["path", { d: "M19 12H5", key: "x3x0zl" }]], dh = ie("arrow-left", ch), fh = [["path", { d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526", key: "1yiouv" }], ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]], ho = ie("award", fh), ph = [["path", { d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z", key: "yt0hxn" }], ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }]], nc = ie("bolt", ph), hh = [["circle", { cx: "11", cy: "13", r: "9", key: "hd149" }], ["path", { d: "M14.35 4.65 16.3 2.7a2.41 2.41 0 0 1 3.4 0l1.6 1.6a2.4 2.4 0 0 1 0 3.4l-1.95 1.95", key: "jp4j1b" }], ["path", { d: "m22 2-1.5 1.5", key: "ay92ug" }]], rc = ie("bomb", hh), mh = [["path", { d: "M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z", key: "lc1i9w" }], ["path", { d: "m7 16.5-4.74-2.85", key: "1o9zyk" }], ["path", { d: "m7 16.5 5-3", key: "va8pkn" }], ["path", { d: "M7 16.5v5.17", key: "jnp8gn" }], ["path", { d: "M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z", key: "8zsnat" }], ["path", { d: "m17 16.5-5-3", key: "8arw3v" }], ["path", { d: "m17 16.5 4.74-2.85", key: "8rfmw" }], ["path", { d: "M17 16.5v5.17", key: "k6z78m" }], ["path", { d: "M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z", key: "1xygjf" }], ["path", { d: "M12 8 7.26 5.15", key: "1vbdud" }], ["path", { d: "m12 8 4.74-2.85", key: "3rx089" }], ["path", { d: "M12 13.5V8", key: "1io7kd" }]], ac = ie("boxes", mh), gh = [["path", { d: "M5 21v-6", key: "1hz6c0" }], ["path", { d: "M12 21V3", key: "1lcnhd" }], ["path", { d: "M19 21V9", key: "unv183" }]], yh = ie("chart-no-axes-column", gh), bh = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], vh = ie("check", bh), xh = [["circle", { cx: "8", cy: "8", r: "6", key: "3yglwk" }], ["path", { d: "M18.09 10.37A6 6 0 1 1 10.34 18", key: "t5s6rm" }], ["path", { d: "M7 6h1v4", key: "1obek4" }], ["path", { d: "m16.71 13.88.7.71-2.82 2.82", key: "1rbuyh" }]], kh = ie("coins", xh), wh = [["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }], ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]], Sh = ie("copy", wh), Nh = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }], ["line", { x1: "22", x2: "18", y1: "12", y2: "12", key: "l9bcsi" }], ["line", { x1: "6", x2: "2", y1: "12", y2: "12", key: "13hhkx" }], ["line", { x1: "12", x2: "12", y1: "6", y2: "2", key: "10w3f3" }], ["line", { x1: "12", x2: "12", y1: "22", y2: "18", key: "15g9kq" }]], Ah = ie("crosshair", Nh), Ch = [["path", { d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z", key: "1vdc57" }], ["path", { d: "M5 21h14", key: "11awu3" }]], lc = ie("crown", Ch), Th = [["path", { d: "M12 15V3", key: "m9g1x1" }], ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }], ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]], jh = ie("download", Th), Eh = [["path", { d: "M10 12.5 8 15l2 2.5", key: "1tg20x" }], ["path", { d: "m14 12.5 2 2.5-2 2.5", key: "yinavb" }], ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }], ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z", key: "1mlx9k" }]], Mh = ie("file-code", Eh), Lh = [["path", { d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4", key: "1slcih" }]], Ia = ie("flame", Lh), Ph = [["line", { x1: "6", x2: "10", y1: "11", y2: "11", key: "1gktln" }], ["line", { x1: "8", x2: "8", y1: "9", y2: "13", key: "qnk9ow" }], ["line", { x1: "15", x2: "15.01", y1: "12", y2: "12", key: "krot7o" }], ["line", { x1: "18", x2: "18.01", y1: "10", y2: "10", key: "1lcuu1" }], ["path", { d: "M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z", key: "mfqc10" }]], Rh = ie("gamepad-2", Ph), Bh = [["path", { d: "M10.5 3 8 9l4 13 4-13-2.5-6", key: "b3dvk1" }], ["path", { d: "M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z", key: "7w4byz" }], ["path", { d: "M2 9h20", key: "16fsjt" }]], sc = ie("gem", Bh), zh = [["path", { d: "m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9", key: "1hayfq" }], ["path", { d: "m18 15 4-4", key: "16gjal" }], ["path", { d: "m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5", key: "15ts47" }]], Uh = ie("hammer", zh), Ih = [["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }], ["path", { d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", key: "r6nss1" }]], oc = ie("house", Ih), Dh = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }], ["path", { d: "M12 16v-4", key: "1dtifu" }], ["path", { d: "M12 8h.01", key: "e9boi3" }]], Fh = ie("info", Dh), Vh = [["path", { d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z", key: "1s6t7t" }], ["circle", { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor", key: "w0ekpg" }]], Oh = ie("key-round", Vh), Hh = [["path", { d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z", key: "zw3jo" }], ["path", { d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12", key: "1wduqc" }], ["path", { d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17", key: "kqbvx6" }]], ic = ie("layers", Hh), qh = [["path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", key: "1cjeqo" }], ["path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71", key: "19qd67" }]], Wh = ie("link", qh), Qh = [["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1", key: "kaeet6" }], ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1", key: "1wsw3u" }]], uc = ie("pause", Qh), Gh = [["path", { d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z", key: "10ikf1" }]], cc = ie("play", Gh), Yh = [["path", { d: "M5 12h14", key: "1ays0h" }], ["path", { d: "M12 5v14", key: "s699le" }]], Jh = ie("plus", Yh), Kh = [["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }], ["path", { d: "M3 3v5h5", key: "1xhq8a" }]], mo = ie("rotate-ccw", Kh), Zh = [["path", { d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915", key: "1i5ecw" }], ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]], Xh = ie("settings", Zh), _h = [["path", { d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z", key: "oel41y" }]], dc = ie("shield", _h), $h = [["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }], ["path", { d: "M3.103 6.034h17.794", key: "awc11p" }], ["path", { d: "M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z", key: "o988cm" }]], em = ie("shopping-bag", $h), tm = [["path", { d: "m12.5 17-.5-1-.5 1h1z", key: "3me087" }], ["path", { d: "M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z", key: "1o5pge" }], ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }], ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }]], go = ie("skull", tm), nm = [["path", { d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z", key: "r04s7s" }]], rm = ie("star", nm), am = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }], ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }], ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]], lm = ie("target", am), sm = [["line", { x1: "10", x2: "14", y1: "2", y2: "2", key: "14vaq8" }], ["line", { x1: "12", x2: "15", y1: "14", y2: "11", key: "17fdiu" }], ["circle", { cx: "12", cy: "14", r: "8", key: "1e1u0o" }]], om = ie("timer", sm), im = [["path", { d: "M10 11v6", key: "nco0om" }], ["path", { d: "M14 11v6", key: "outv1u" }], ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }], ["path", { d: "M3 6h18", key: "d0wm0j" }], ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]], Bl = ie("trash-2", im), um = [["path", { d: "M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978", key: "1n3hpd" }], ["path", { d: "M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978", key: "rfe1zi" }], ["path", { d: "M18 9h1.5a1 1 0 0 0 0-5H18", key: "7xy6bh" }], ["path", { d: "M4 22h16", key: "57wxv0" }], ["path", { d: "M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z", key: "1mhfuq" }], ["path", { d: "M6 9H4.5a1 1 0 0 1 0-5H6", key: "tex48p" }]], fc = ie("trophy", um), cm = [["path", { d: "M12 3v12", key: "1x0j5s" }], ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }], ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]], yo = ie("upload", cm), dm = [["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }], ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]], pc = ie("user", dm), fm = [["path", { d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z", key: "uqj9uw" }], ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }], ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728", key: "ijwkga" }]], hc = ie("volume-2", fm), pm = [["path", { d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z", key: "uqj9uw" }], ["line", { x1: "22", x2: "16", y1: "9", y2: "15", key: "1ewh16" }], ["line", { x1: "16", x2: "22", y1: "9", y2: "15", key: "5ykzw1" }]], mc = ie("volume-x", pm), hm = [["path", { d: "M18 6 6 18", key: "1bl5f8" }], ["path", { d: "m6 6 12 12", key: "d8bk6v" }]], mm = ie("x", hm), gm = [["path", { d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z", key: "1xq2db" }]], ym = ie("zap", gm), bm = nh(), B = { W: 710, H: 880, TL: 80, BT: 100, BSY: 150, BL: 800, SLOTS: 5, TURN_LIMIT_SEC: 8, NS: "bb14_vlt_", ACC: "bb14_acc_prof", ACH: "bb14_ach_vlt", SR: [25, 50, 100, 250, 500], DF: ["easy", "medium", "hard", "insane", "asian"], TC: { common: 0.62, uncommon: 0.2, rare: 0.12, legendary: 0.06 }, BTI: { common: ["normal", "slider", "magnet"], uncommon: ["tnt", "ammo", "portal", "teleport", "shock"], rare: ["shield", "parent", "healer", "directional", "phase"], legendary: ["tank", "angel", "turret"] }, BTP: ["normal", "slider", "magnet", "tnt", "ammo", "portal", "teleport", "shock", "shield", "parent", "healer", "directional", "phase", "tank", "angel", "turret", "crawler", "devil", "titan"] }, Hn = { infinite: { label: "Infinite", target: null }, hell: { label: "Hell Mode", target: null }, tartarus: { label: "Tartarus", target: null }, speedrun_25: { label: "Speedrun 25", target: 25 }, speedrun_50: { label: "Speedrun 50", target: 50 }, speedrun_100: { label: "Speedrun 100", target: 100 }, speedrun_250: { label: "Speedrun 250", target: 250 }, speedrun_500: { label: "Speedrun 500", target: 500 } }, gc = [{ value: "easy", label: "Easy (1\u20133 Bricks)" }, { value: "medium", label: "Medium (1\u20134 Bricks)" }, { value: "hard", label: "Hard (1\u20135 Bricks)" }, { value: "insane", label: "Insane (3\u20135 Bricks)" }, { value: "asian", label: "ASIAN (4\u20135 Bricks)" }], bo = ["cubes", "trophy", "dragon", "crown", "flame", "shield", "bolt", "gem", "target", "star"], yc = [{ type: "normal", name: "Standard Brick", tier: "Common", symbol: "\u25A0", color: "#38a169", desc: "Classic brick whose HP scales with the current level." }, { type: "slider", name: "Slider Brick", tier: "Common", symbol: "\u21C4", color: "#00b5d8", desc: "Glides horizontally across open lanes between turns." }, { type: "magnet", name: "Magnet Brick", tier: "Common", symbol: "\u{1F9F2}", color: "#d6bcfa", desc: "Bends nearby ball trajectories toward its center." }, { type: "tnt", name: "TNT Brick", tier: "Uncommon", symbol: "\u{1F4A3}", color: "#e53e3e", desc: "Detonates on shatter, blasting nearby bricks in a 180px radius." }, { type: "ammo", name: "Ammo Brick", tier: "Uncommon", symbol: "+1", color: "#d69e2e", desc: "Grants +1 permanent extra ball at the end of the turn." }, { type: "portal", name: "Portal Brick", tier: "Uncommon", symbol: "\u{1F300}", color: "#805ad5", desc: "Warps striking balls to a random arena coordinate." }, { type: "teleport", name: "Teleport Brick", tier: "Uncommon", symbol: "\u2726", color: "#2b6cb0", desc: "Shifts to a new horizontal column after each turn." }, { type: "shock", name: "Shock Brick", tier: "Uncommon", symbol: "\u26A1", color: "#dd6b20", desc: "Electrifies striking balls, slamming them straight downward." }, { type: "shield", name: "Shield Brick", tier: "Rare", symbol: "\u{1F6E1}", color: "#319795", desc: "Projects a 150px barrier making adjacent bricks invulnerable." }, { type: "parent", name: "Parent Brick", tier: "Rare", symbol: "\u2756", color: "#b7791f", desc: "Splits into 1\u20133 smaller bricks when destroyed." }, { type: "healer", name: "Healer Brick", tier: "Rare", symbol: "\u271A", color: "#38a169", desc: "Restores +25% HP to nearby bricks at the end of every turn." }, { type: "directional", name: "Directional Brick", tier: "Rare", symbol: "\u25C8", color: "#718096", desc: "Only takes damage from its glowing colored sides." }, { type: "phase", name: "Phase Brick", tier: "Rare", symbol: "\u25D0", color: "#4fd1c5", desc: "Alternates between Solid and Liquid (invulnerable) each turn." }, { type: "tank", name: "Tank Brick", tier: "Legendary", symbol: "\u26E8", color: "#2d3748", desc: "Heavily armored colossus carrying 5x base HP." }, { type: "angel", name: "Angel Brick", tier: "Legendary", symbol: "\u2727", color: "#d53f8c", desc: "Smites nearby bricks for 25% HP damage every turn." }, { type: "turret", name: "Turret Brick", tier: "Legendary", symbol: "\u2316", color: "#4a5568", desc: "Fires bolts at up to 3 random bricks each turn for 25% HP." }, { type: "crawler", name: "Crawler Brick", tier: "Hell / Tartarus", symbol: "\u{1F577}", color: "#ff4500", desc: "Creeps downward slowly between shots in abyssal modes." }, { type: "devil", name: "Devil Brick", tier: "Hell / Tartarus", symbol: "\u{1F608}", color: "#8b0000", desc: "Summons armored Tank minions above itself every turn." }, { type: "titan", name: "Tartarus Titan", tier: "Tartarus Boss", symbol: "\u26D3", color: "#14091f", desc: "Colossal 2x2 brick with 30x level HP that resists Shield auras." }], zl = [{ id: "first_shatter", name: "First Shatter", desc: "Break your very first brick.", icon: "hammer", target: 1, get: (l) => l.bricksBroken }, { id: "brick_crusher", name: "Brick Crusher", desc: "Break 250 bricks.", icon: "cubes", target: 250, get: (l) => l.bricksBroken }, { id: "demolitionist", name: "Demolitionist", desc: "Break 2,500 bricks.", icon: "explosion", target: 2500, get: (l) => l.bricksBroken }, { id: "survivor_10", name: "Getting Warmed Up", desc: "Reach Level 10 in any mode.", icon: "stairs", target: 10, get: (l, o) => Math.max(o.infinite || 1, o.hell || 1, o.tartarus || 1, l.maxLevel || 1) }, { id: "survivor_50", name: "Half-Century", desc: "Reach Level 50 in any mode.", icon: "shield", target: 50, get: (l, o) => Math.max(o.infinite || 1, o.hell || 1, o.tartarus || 1, l.maxLevel || 1) }, { id: "century_club", name: "Century Club", desc: "Reach Level 100 in any mode.", icon: "crown", target: 100, get: (l, o) => Math.max(o.infinite || 1, o.hell || 1, o.tartarus || 1, l.maxLevel || 1) }, { id: "hell_walker", name: "Hell Walker", desc: "Reach Level 15 in Hell Mode.", icon: "fire", target: 15, get: (l, o) => o.hell || 1 }, { id: "overlord_bane", name: "Overlord's Bane", desc: "Survive to Level 35 in Hell Mode.", icon: "skull", target: 35, get: (l, o) => o.hell || 1 }, { id: "tartarus_survivor", name: "Abyssal Prisoner", desc: "Survive to Level 10 in Tartarus Mode.", icon: "link", target: 10, get: (l, o) => o.tartarus || 1 }, { id: "titan_slayer", name: "Titan Slayer", desc: "Shatter 5 colossal 2x2 Titan bricks.", icon: "monument", target: 5, get: (l) => l.bricksByType?.titan || 0 }, { id: "speed_demon", name: "Speed Demon", desc: "Complete any Speedrun category.", icon: "stopwatch", target: 1, get: (l, o, u) => Object.values(u).some((f) => Object.values(f).some((c) => c.clears > 0)) ? 1 : 0 }, { id: "century_runner", name: "Century Runner", desc: "Complete Speedrun 100 or higher.", icon: "bolt", target: 1, get: (l, o, u) => ["speedrun_100", "speedrun_250", "speedrun_500"].some((f) => Object.values(u[f] || {}).some((c) => c.clears > 0)) ? 1 : 0 }, { id: "tnt_expert", name: "Volatile Chemistry", desc: "Destroy 30 TNT bricks.", icon: "bomb", target: 30, get: (l) => l.bricksByType?.tnt || 0 }, { id: "tank_buster", name: "Armor Piercer", desc: "Destroy 15 Tank bricks.", icon: "truck", target: 15, get: (l) => l.bricksByType?.tank || 0 }, { id: "devil_slayer", name: "Abyssal Hunter", desc: "Destroy 10 Devil bricks.", icon: "dragon", target: 10, get: (l) => l.bricksByType?.devil || 0 }, { id: "coin_hoarder", name: "Gilded Treasury", desc: "Earn 5,000 lifetime coins.", icon: "coins", target: 5e3, get: (l) => l.coinsEarned }, { id: "gem_collector", name: "Soul Crystal", desc: "Earn 100 lifetime gems.", icon: "gem", target: 100, get: (l) => l.gemsEarned }, { id: "heavy_artillery", name: "Barrage Master", desc: "Fire 10,000 total balls.", icon: "meteor", target: 1e4, get: (l) => l.ballsFired }];
  function vo() {
    const l = {};
    for (const o of B.BTP) l[o] = 0;
    return { ballsFired: 0, turnsSurvived: 0, gemsEarned: 0, coinsEarned: 0, damageDealt: 0, bricksBroken: 0, maxLevel: 1, bricksByType: l };
  }
  function bc() {
    return { coins: 0, gems: 0, permUpgrades: { startAmmo: 0, critChance: 0, ballSpeed: 0, luck: 0 } };
  }
  function vm(l, o) {
    const u = { tnt: "#e53e3e", ammo: "#d69e2e", portal: "#805ad5", teleport: "#2b6cb0", slider: "#00b5d8", shock: "#dd6b20", shield: "#319795", parent: "#b7791f", healer: "#38a169", tank: "#2d3748", angel: "#d53f8c", turret: "#4a5568", directional: "#718096", phase: "#4fd1c5", magnet: "#d6bcfa", crawler: "#ff4500", devil: "#8b0000", titan: "#14091f" };
    return u[l] ? u[l] : `hsl(${Math.max(0, 120 - (o - 1) * 3)}, 85%, 55%)`;
  }
  function at(l) {
    return l === "hell" || l === "tartarus";
  }
  function cn(l) {
    const o = Math.floor(Math.max(0, l) / 10), u = Math.floor(o / 6e3), f = Math.floor(o % 6e3 / 100), c = o % 100;
    return `${String(u).padStart(2, "0")}:${String(f).padStart(2, "0")}.${String(c).padStart(2, "0")}`;
  }
  var xm = un(((l) => {
    var o = Symbol.for("react.transitional.element"), u = Symbol.for("react.fragment");
    function f(c, h, m) {
      var x = null;
      if (m !== void 0 && (x = "" + m), h.key !== void 0 && (x = "" + h.key), "key" in h) {
        m = {};
        for (var k in h) k !== "key" && (m[k] = h[k]);
      } else m = h;
      return h = m.ref, { $$typeof: o, type: c, key: x, ref: h !== void 0 ? h : null, props: m };
    }
    l.Fragment = u, l.jsx = f, l.jsxs = f;
  })), km = un(((l, o) => {
    o.exports = xm();
  })), d = km();
  function vc({ emblem: l, className: o = "w-5 h-5" }) {
    switch (l) {
      case "trophy":
        return (0, d.jsx)(fc, { className: o });
      case "dragon":
        return (0, d.jsx)(Ia, { className: o });
      case "crown":
        return (0, d.jsx)(lc, { className: o });
      case "flame":
        return (0, d.jsx)(Ia, { className: o });
      case "shield":
        return (0, d.jsx)(dc, { className: o });
      case "bolt":
        return (0, d.jsx)(nc, { className: o });
      case "gem":
        return (0, d.jsx)(sc, { className: o });
      case "target":
        return (0, d.jsx)(lm, { className: o });
      case "star":
        return (0, d.jsx)(rm, { className: o });
      default:
        return (0, d.jsx)(ac, { className: o });
    }
  }
  function wm({ icon: l }) {
    switch (l) {
      case "hammer":
        return (0, d.jsx)(Uh, { className: "w-4 h-4" });
      case "cubes":
        return (0, d.jsx)(ac, { className: "w-4 h-4" });
      case "explosion":
        return (0, d.jsx)(rc, { className: "w-4 h-4" });
      case "shield":
        return (0, d.jsx)(dc, { className: "w-4 h-4" });
      case "crown":
        return (0, d.jsx)(lc, { className: "w-4 h-4" });
      case "fire":
        return (0, d.jsx)(Ia, { className: "w-4 h-4" });
      case "skull":
        return (0, d.jsx)(go, { className: "w-4 h-4" });
      case "link":
        return (0, d.jsx)(Wh, { className: "w-4 h-4" });
      case "bolt":
        return (0, d.jsx)(nc, { className: "w-4 h-4" });
      case "bomb":
        return (0, d.jsx)(rc, { className: "w-4 h-4" });
      case "coins":
        return (0, d.jsx)(kh, { className: "w-4 h-4" });
      case "gem":
        return (0, d.jsx)(sc, { className: "w-4 h-4" });
      default:
        return (0, d.jsx)(ho, { className: "w-4 h-4" });
    }
  }
  var $t = ({ title: l, maxWidth: o = "580px", onClose: u, isHell: f, isTartarus: c, children: h }) => {
    const m = c ? "bg-[#07070a]/95 border-[#3a1016] text-slate-200" : f ? "bg-[#240a0a] border-[#631c1c] text-slate-50" : "bg-white border-[#171717] text-[#222]", x = c ? "border-[#290c11] text-slate-50" : f ? "border-[#4a1515] text-white" : "border-slate-200 text-[#171717]";
    return (0, d.jsx)("div", { className: "fixed inset-0 z-60 flex items-center justify-center p-3 bg-black/70 backdrop-blur-sm", role: "dialog", "aria-modal": "true", onClick: (k) => {
      k.target === k.currentTarget && u && u();
    }, children: (0, d.jsxs)("div", { className: `relative w-full max-h-[90vh] overflow-y-auto rounded-lg border-2 p-4 shadow-xl ${m}`, style: { maxWidth: o }, children: [u && (0, d.jsx)("button", { type: "button", onClick: u, "aria-label": "Close", className: "absolute top-2 right-2 p-1.5 rounded-md hover:bg-black/10 cursor-pointer", children: (0, d.jsx)(mm, { className: "w-5 h-5" }) }), (0, d.jsx)("h2", { className: `text-lg font-bold text-center pb-2 mb-3 border-b-2 ${x}`, children: l }), h] }) });
  }, Sm = ({ activeModal: l, engine: o, isHell: u, isTartarus: f, muted: c, modeSelectState: h, exportedCode: m, confirmDialog: x, onCloseConfirm: k, onCloseModal: P, onResumeGame: F, onToggleAudio: j, onRestartRun: y, onSwitchSlot: I, onReturnHome: q, onStartSelectedMode: te, onCancelModeSelect: ae, onExportSlotFile: Y, onImportSlotFile: Se, onExportCode: ze, onOpenImportCode: tt, onApplyImportCode: lt, onWipeCurrentSlot: Ue, onSaveAccountName: He, onSelectEmblem: se, onExportAllSlots: de, onImportAllSlots: he, onDownloadSingleHtml: qe, onClearAllAccountData: Fe }) => {
    const [nt, vt] = (0, oe.useState)(h.mode), [Ne, D] = (0, oe.useState)(h.difficulty), [ne, M] = (0, oe.useState)(""), [_, X] = (0, oe.useState)("scores"), [je, Pe] = (0, oe.useState)(() => o.vault.getAccount().name), [Ve, dt] = (0, oe.useState)(!1);
    oe.useEffect(() => {
      l === "modeSelect" ? (vt(h.mode), D(h.difficulty)) : l === "account" ? Pe(o.vault.getAccount().name) : l === "importCode" && M("");
    }, [l, h, o]);
    const b = o.getState(), U = at(b?.runMode), Q = b && ["hard", "insane", "asian"].includes(b.difficulty) || U;
    return (0, d.jsxs)(d.Fragment, { children: [l === "pause" && (0, d.jsx)("div", { className: "fixed inset-0 z-75 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md", role: "dialog", "aria-modal": "true", children: (0, d.jsxs)("div", { className: `w-full max-w-[410px] rounded-lg border-2 p-5 text-center shadow-2xl ${f ? "bg-[#07070a]/95 border-[#3a1016] text-slate-100" : u ? "bg-[#240a0a] border-[#631c1c] text-white" : "bg-white border-[#171717] text-[#222]"}`, children: [(0, d.jsxs)("h2", { className: "text-lg font-bold flex items-center justify-center gap-2 pb-2 mb-2 border-b border-current/15", children: [(0, d.jsx)(uc, { className: "w-5 h-5" }), (0, d.jsx)("span", { children: "Game Paused" })] }), (0, d.jsxs)("p", { className: "text-xs opacity-75 mb-4", children: [b ? `${Hn[b.runMode]?.label || "Infinite"} \xB7 Level ${b.level}` : "Run paused", " \u2014 Timers and hazards suspended."] }), (0, d.jsxs)("div", { className: "flex flex-col gap-2.5", children: [(0, d.jsxs)("button", { type: "button", onClick: F, className: "w-full py-2.5 px-4 rounded-lg bg-[#2b6cb0] hover:bg-[#2c5282] text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer", children: [(0, d.jsx)(cc, { className: "w-4 h-4" }), (0, d.jsx)("span", { children: "Resume Game" })] }), (0, d.jsxs)("button", { type: "button", onClick: j, className: "w-full py-2.5 px-4 rounded-lg bg-slate-600 hover:bg-slate-700 text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer", children: [c ? (0, d.jsx)(mc, { className: "w-4 h-4" }) : (0, d.jsx)(hc, { className: "w-4 h-4" }), (0, d.jsx)("span", { children: c ? "Unmute Audio" : "Mute Audio" })] }), (0, d.jsxs)("button", { type: "button", onClick: y, className: "w-full py-2.5 px-4 rounded-lg bg-slate-600 hover:bg-slate-700 text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer", children: [(0, d.jsx)(mo, { className: "w-4 h-4" }), (0, d.jsx)("span", { children: "Start New Run (This File)" })] }), (0, d.jsxs)("button", { type: "button", onClick: I, className: "w-full py-2.5 px-4 rounded-lg bg-slate-600 hover:bg-slate-700 text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer", children: [(0, d.jsx)(ic, { className: "w-4 h-4" }), (0, d.jsx)("span", { children: "Switch Save File" })] }), (0, d.jsxs)("button", { type: "button", onClick: q, className: "w-full py-2.5 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer", children: [(0, d.jsx)(oc, { className: "w-4 h-4" }), (0, d.jsx)("span", { children: "Return to Home" })] })] })] }) }), l === "settings" && (0, d.jsx)($t, { title: "Game Settings", maxWidth: "420px", onClose: P, isHell: u, isTartarus: f, children: (0, d.jsxs)("div", { className: "flex flex-col gap-2.5", children: [(0, d.jsxs)("button", { type: "button", onClick: y, className: "w-full py-2.5 px-4 rounded-lg bg-[#222] hover:bg-[#333] text-white font-semibold text-sm flex items-center gap-2.5 cursor-pointer", children: [(0, d.jsx)(mo, { className: "w-4 h-4" }), (0, d.jsx)("span", { children: "Start New Run (This File)" })] }), (0, d.jsxs)("button", { type: "button", onClick: I, className: "w-full py-2.5 px-4 rounded-lg bg-slate-600 hover:bg-slate-700 text-white font-semibold text-sm flex items-center gap-2.5 cursor-pointer", children: [(0, d.jsx)(ic, { className: "w-4 h-4" }), (0, d.jsx)("span", { children: "Switch Save File" })] }), (0, d.jsxs)("button", { type: "button", onClick: Y, className: "w-full py-2.5 px-4 rounded-lg bg-slate-600 hover:bg-slate-700 text-white font-semibold text-sm flex items-center gap-2.5 cursor-pointer", children: [(0, d.jsx)(jh, { className: "w-4 h-4" }), (0, d.jsx)("span", { children: "Download Save Backup" })] }), (0, d.jsxs)("label", { className: "w-full py-2.5 px-4 rounded-lg bg-slate-600 hover:bg-slate-700 text-white font-semibold text-sm flex items-center gap-2.5 cursor-pointer", children: [(0, d.jsx)(yo, { className: "w-4 h-4" }), (0, d.jsx)("span", { children: "Load Save Backup" }), (0, d.jsx)("input", { type: "file", accept: ".json,application/json", className: "hidden", onChange: (z) => {
      const K = z.target.files?.[0];
      K && Se(K), z.target.value = "";
    } })] }), (0, d.jsxs)("div", { className: "flex justify-center gap-2.5 mt-4", children: [(0, d.jsx)("button", { type: "button", onClick: () => te(nt, Ne), className: "px-4 py-2 rounded-lg bg-[#2b6cb0] hover:bg-[#2c5282] text-white text-sm font-semibold cursor-pointer", children: "Start Selected Mode" }), (0, d.jsx)("button", { type: "button", onClick: ae, className: "px-4 py-2 rounded-lg bg-slate-600 hover:bg-slate-700 text-white text-sm font-semibold cursor-pointer", children: "Cancel" })] })] }), l === "exportCode" && (0, d.jsxs)($t, { title: "Save Code", maxWidth: "580px", onClose: P, isHell: u, isTartarus: f, children: [(0, d.jsxs)("p", { className: "text-xs opacity-75 mb-2", children: ["Copy this save code to back up File ", o.vault.getSlot() + 1, "."] }), (0, d.jsx)("textarea", { readOnly: !0, rows: 7, value: m, className: "w-full p-2.5 rounded-lg border border-slate-300 text-xs font-mono bg-slate-50 text-slate-900" }), (0, d.jsx)("div", { className: "flex justify-center mt-3", children: (0, d.jsxs)("button", { type: "button", onClick: () => {
      navigator.clipboard?.writeText(m).catch(() => {
      }), dt(!0), setTimeout(() => dt(!1), 1800);
    }, className: "px-4 py-2 rounded-lg bg-[#2b6cb0] hover:bg-[#2c5282] text-white text-sm font-semibold flex items-center gap-2 cursor-pointer", children: [Ve ? (0, d.jsx)(vh, { className: "w-4 h-4" }) : (0, d.jsx)(Sh, { className: "w-4 h-4" }), (0, d.jsx)("span", { children: Ve ? "Copied" : "Copy Code" })] }) })] }), l === "importCode" && (0, d.jsxs)($t, { title: "Import Save Code", maxWidth: "520px", onClose: P, isHell: u, isTartarus: f, children: [(0, d.jsx)("p", { className: "text-xs opacity-75 mb-2", children: "Paste your Brick Breaker v14 save code below:" }), (0, d.jsx)("textarea", { rows: 7, value: ne, onChange: (z) => M(z.target.value), placeholder: "Paste code here...", className: "w-full p-2.5 rounded-lg border border-slate-300 text-xs font-mono bg-white text-slate-900" }), (0, d.jsxs)("div", { className: "flex justify-center gap-2.5 mt-3", children: [(0, d.jsx)("button", { type: "button", onClick: () => lt(ne), className: "px-4 py-2 rounded-lg bg-[#2b6cb0] hover:bg-[#2c5282] text-white text-sm font-semibold cursor-pointer", children: "Load Save Code" }), (0, d.jsx)("button", { type: "button", onClick: P, className: "px-4 py-2 rounded-lg bg-slate-600 hover:bg-slate-700 text-white text-sm font-semibold cursor-pointer", children: "Cancel" })] })] }), l === "achievements" && (() => {
      const z = o.vault.getUnlockedAchievements(), K = o.vault.getModeRecords(), $ = o.vault.getSpeedrunRecords(), re = o.getStats();
      let H = 0;
      const O = zl.map((le) => {
        const st = !!z[le.id];
        st && H++;
        const xe = Math.min(le.target, le.get(re, K, $)), Ze = Math.min(100, Math.round(xe / le.target * 100));
        return { ...le, isUnl: st, cur: xe, pct: Ze, unlockedAt: z[le.id] };
      });
      return (0, d.jsxs)($t, { title: "Achievements", maxWidth: "680px", onClose: P, isHell: u, isTartarus: f, children: [(0, d.jsxs)("div", { className: "flex items-center justify-between px-3 py-2 mb-3 rounded-lg bg-slate-100 text-slate-800 text-xs font-bold tabular-nums", children: [(0, d.jsxs)("span", { children: ["File ", o.vault.getSlot() + 1] }), (0, d.jsxs)("span", { children: [H, " / ", zl.length, " Unlocked"] })] }), (0, d.jsx)("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: O.map((le) => (0, d.jsxs)("div", { className: `flex items-start gap-2.5 p-2.5 rounded-lg border ${le.isUnl ? "bg-emerald-50 border-emerald-500 text-slate-900 opacity-100" : "bg-slate-50 border-slate-300 text-slate-700 opacity-75"}`, children: [(0, d.jsx)("div", { className: `w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${le.isUnl ? "bg-emerald-600 text-white" : "bg-slate-300 text-slate-700"}`, children: (0, d.jsx)(wm, { icon: le.icon }) }), (0, d.jsxs)("div", { className: "flex-1 min-w-0", children: [(0, d.jsx)("div", { className: "text-xs font-bold", children: le.name }), (0, d.jsx)("div", { className: "text-[11px] opacity-80", children: le.desc }), (0, d.jsx)("div", { className: "w-full h-1.5 bg-slate-200 rounded-full mt-1.5 overflow-hidden", children: (0, d.jsx)("div", { className: `h-full rounded-full ${le.isUnl ? "bg-emerald-600" : "bg-blue-600"}`, style: { width: `${le.isUnl ? 100 : le.pct}%` } }) }), (0, d.jsx)("div", { className: "text-[10px] font-bold uppercase tracking-wide mt-1 opacity-75 tabular-nums", children: le.isUnl ? `Unlocked \xB7 ${new Date(le.unlockedAt).toLocaleDateString()}` : `${le.cur} / ${le.target}` })] })] }, le.id)) })] });
    })(), l === "account" && (() => {
      const z = o.vault.getAccount();
      let K = 0, $ = 0, re = 0, H = 0, O = 1, le = 1, st = 1;
      for (let xe = 0; xe < B.SLOTS; xe++) {
        const Ze = o.vault.getMeta(xe), Ge = o.vault.getStats(xe), ke = o.vault.getModeRecords(xe);
        K += Ze.coins, $ += Ze.gems, re += Ge.bricksBroken, H += Ge.ballsFired, O = Math.max(O, ke.infinite || 1), le = Math.max(le, ke.hell || 1), st = Math.max(st, ke.tartarus || 1);
      }
      return (0, d.jsxs)($t, { title: "Account & Saves", maxWidth: "540px", onClose: P, isHell: u, isTartarus: f, children: [(0, d.jsxs)("div", { className: "mb-3", children: [(0, d.jsx)("label", { className: "block text-xs font-bold mb-1", htmlFor: "accNameInput", children: "Player Name" }), (0, d.jsxs)("div", { className: "flex gap-2", children: [(0, d.jsx)("input", { id: "accNameInput", maxLength: 24, value: je, onChange: (xe) => Pe(xe.target.value), className: "flex-1 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm" }), (0, d.jsx)("button", { type: "button", onClick: () => He(je), className: "px-4 py-1.5 rounded-lg bg-[#2b6cb0] hover:bg-[#2c5282] text-white text-sm font-semibold cursor-pointer", children: "Save" })] })] }), (0, d.jsxs)("div", { className: "mb-4", children: [(0, d.jsx)("span", { className: "block text-xs font-bold mb-1.5", children: "Profile Icon" }), (0, d.jsx)("div", { className: "flex flex-wrap gap-2", children: bo.map((xe) => (0, d.jsx)("button", { type: "button", onClick: () => se(xe), className: `w-9 h-9 rounded-lg border-2 flex items-center justify-center cursor-pointer ${xe === z.emblem ? "border-[#2b6cb0] bg-[#2b6cb0] text-white" : "border-slate-300 bg-slate-100 text-slate-800"}`, children: (0, d.jsx)(vc, { emblem: xe, className: "w-4 h-4" }) }, xe)) })] }), (0, d.jsx)("h3", { className: "text-sm font-bold mb-2", children: "All Save Files Summary" }), (0, d.jsxs)("div", { className: "flex flex-col gap-1.5 text-xs tabular-nums", children: [(0, d.jsxs)("div", { className: "flex justify-between p-2 rounded bg-slate-100 text-slate-800", children: [(0, d.jsx)("strong", { children: "Total Coins (All Files)" }), (0, d.jsx)("span", { children: K })] }), (0, d.jsxs)("div", { className: "flex justify-between p-2 rounded bg-slate-100 text-slate-800", children: [(0, d.jsx)("strong", { children: "Total Gems (All Files)" }), (0, d.jsx)("span", { children: $ })] }), (0, d.jsxs)("div", { className: "flex justify-between p-2 rounded bg-slate-100 text-slate-800", children: [(0, d.jsx)("strong", { children: "Highest Infinite Level" }), (0, d.jsxs)("span", { children: ["Level ", O] })] }), (0, d.jsxs)("div", { className: "flex justify-between p-2 rounded bg-slate-100 text-slate-800", children: [(0, d.jsx)("strong", { children: "Highest Hell Level" }), (0, d.jsxs)("span", { children: ["Level ", le] })] }), (0, d.jsxs)("div", { className: "flex justify-between p-2 rounded bg-slate-100 text-slate-800", children: [(0, d.jsx)("strong", { children: "Highest Tartarus Level" }), (0, d.jsxs)("span", { children: ["Level ", st] })] }), (0, d.jsxs)("div", { className: "flex justify-between p-2 rounded bg-slate-100 text-slate-800", children: [(0, d.jsx)("strong", { children: "Total Bricks Broken" }), (0, d.jsx)("span", { children: re })] }), (0, d.jsxs)("div", { className: "flex justify-between p-2 rounded bg-slate-100 text-slate-800", children: [(0, d.jsx)("strong", { children: "Total Balls Fired" }), (0, d.jsx)("span", { children: H })] })] }), (0, d.jsxs)("div", { className: "flex flex-wrap justify-center gap-2.5 mt-4", children: [(0, d.jsxs)("button", { type: "button", onClick: de, className: "px-3.5 py-2 rounded-lg bg-slate-600 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer", children: [(0, d.jsx)(uh, { className: "w-4 h-4" }), (0, d.jsx)("span", { children: "Export All Saves (JSON)" })] }), (0, d.jsxs)("label", { className: "px-3.5 py-2 rounded-lg bg-slate-600 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer", children: [(0, d.jsx)(yo, { className: "w-4 h-4" }), (0, d.jsx)("span", { children: "Import All Saves (JSON)" }), (0, d.jsx)("input", { type: "file", accept: ".json,application/json", className: "hidden", onChange: (xe) => {
        const Ze = xe.target.files?.[0];
        Ze && he(Ze), xe.target.value = "";
      } })] }), (0, d.jsxs)("button", { type: "button", onClick: Fe, className: "px-3.5 py-2 rounded-lg bg-red-700 hover:bg-red-800 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer", children: [(0, d.jsx)(Bl, { className: "w-4 h-4" }), (0, d.jsx)("span", { children: "Clear All Account Data" })] })] })] });
    })(), l === "gameInfo" && (0, d.jsxs)($t, { title: "Game Info & Guide", maxWidth: "700px", onClose: P, isHell: u, isTartarus: f, children: [(0, d.jsx)("h3", { className: "text-sm font-bold text-[#2b6cb0] mb-2", children: "Game Modes" }), (0, d.jsxs)("div", { className: "flex flex-col gap-2 mb-4 text-xs", children: [(0, d.jsxs)("div", { className: "flex items-center gap-3 p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800", children: [(0, d.jsx)("div", { className: "w-9 h-9 rounded-md bg-[#2b6cb0] text-white font-bold flex items-center justify-center shrink-0", children: "\u221E" }), (0, d.jsxs)("div", { children: [(0, d.jsx)("strong", { children: "Infinite Mode" }), (0, d.jsx)("p", { className: "m-0 text-slate-600", children: "Endless waves. Crisp harmonic arcade sound effects." })] })] }), (0, d.jsxs)("div", { className: "flex items-center gap-3 p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800", children: [(0, d.jsx)("div", { className: "w-9 h-9 rounded-md bg-[#9b2c2c] text-white font-bold flex items-center justify-center shrink-0", children: "\u{1F525}" }), (0, d.jsxs)("div", { children: [(0, d.jsx)("strong", { children: "Hell Mode" }), (0, d.jsx)("p", { className: "m-0 text-slate-600", children: "Dark volcanic theme, 2.5x brick HP, crawler/devil spawns, Overlord spells, and fiery SFX." })] })] }), (0, d.jsxs)("div", { className: "flex items-center gap-3 p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800", children: [(0, d.jsx)("div", { className: "w-9 h-9 rounded-md bg-[#09090d] text-red-400 border border-red-500 font-bold flex items-center justify-center shrink-0", children: "\u26D3" }), (0, d.jsxs)("div", { children: [(0, d.jsx)("strong", { children: "Tartarus Mode" }), (0, d.jsx)("p", { className: "m-0 text-slate-600", children: "Pitch-black void, creepy music & apparitions, 2x2 Titan bricks, 3x HP, 8s turn timer, and abyssal SFX." })] })] }), (0, d.jsxs)("div", { className: "flex items-center gap-3 p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800", children: [(0, d.jsx)("div", { className: "w-9 h-9 rounded-md bg-slate-600 text-white font-bold flex items-center justify-center shrink-0", children: "\u23F1" }), (0, d.jsxs)("div", { children: [(0, d.jsx)("strong", { children: "Speedrun Modes" }), (0, d.jsx)("p", { className: "m-0 text-slate-600", children: "Clear target level as fast as possible with live TAS split tracking below Analysis and snappy telemetry SFX." })] })] })] }), (0, d.jsx)("h3", { className: "text-sm font-bold text-[#2b6cb0] mb-1", children: "Brick Types & Rarities" }), (0, d.jsx)("p", { className: "text-xs opacity-75 mb-2", children: "Icons appear on each brick in the game. The number on a brick is its remaining HP." }), (0, d.jsx)("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: yc.map((z) => (0, d.jsxs)("div", { className: "flex items-start gap-2.5 p-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800", children: [(0, d.jsx)("div", { className: `w-8 h-8 rounded-md flex items-center justify-center font-bold shrink-0 border border-[#171717] shadow-[inset_0_2px_0_rgba(255,255,255,0.28)] ${z.type === "magnet" ? "text-[#4c1d95]" : "text-white"}`, style: { background: z.color }, children: z.symbol }), (0, d.jsxs)("div", { className: "min-w-0", children: [(0, d.jsx)("div", { className: "text-xs font-bold", children: z.name }), (0, d.jsx)("div", { className: "text-[11px] text-slate-600 leading-snug", children: z.desc }), (0, d.jsx)("div", { className: "text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-0.5", children: z.tier })] })] }, z.type)) })] }), l === "perm" && b && (0, d.jsxs)($t, { title: "Permanent Upgrades", maxWidth: "500px", onClose: P, isHell: u, isTartarus: f, children: [(0, d.jsxs)("div", { className: "mb-3 p-2 rounded-md text-center font-bold text-sm bg-purple-100 text-purple-800 border border-purple-300 tabular-nums", children: ["Gems: ", b.gems] }), [{ key: "startAmmo", title: "Start Ammo", desc: "+1 starting ball per level", max: 10, base: 5 }, { key: "critChance", title: "Crit Chance", desc: "+5% chance for 3x damage per level", max: 10, base: 6 }, { key: "ballSpeed", title: "Ball Speed", desc: "+10% shot velocity per level", max: 5, base: 8 }, { key: "luck", title: "Luck", desc: "+20% coin rewards per level", max: 5, base: 10 }].map((z) => {
      const K = U ? 0 : Number(b.permUpgrades[z.key]) || 0, $ = Math.round(z.base * Math.pow(1.5, K)), re = K >= z.max;
      return (0, d.jsxs)("div", { className: "flex items-center justify-between gap-3 p-2.5 my-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800", children: [(0, d.jsxs)("div", { children: [(0, d.jsx)("div", { className: "text-sm font-bold", children: z.title }), (0, d.jsx)("div", { className: "text-xs text-slate-500", children: z.desc }), (0, d.jsx)("div", { className: "text-xs font-bold text-emerald-700 mt-0.5", children: U ? f ? "SEALED IN TARTARUS" : "NULLIFIED IN HELL" : re ? `MAXED (${z.max})` : `Lvl ${K}/${z.max} \u2014 ${$} Gems` })] }), (0, d.jsx)("button", { type: "button", disabled: U || re || b.gems < $, onClick: () => o.buyPermUpgrade(z.key), className: "px-3 py-1.5 rounded-md bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:text-slate-500 text-white text-xs font-bold shrink-0 cursor-pointer disabled:cursor-not-allowed", children: U ? "LOCKED" : re ? "MAX" : `Upgrade (${$})` })] }, z.key);
    })] }), l === "temp" && b && (0, d.jsxs)($t, { title: "Temporary Shop", maxWidth: "480px", onClose: P, isHell: u, isTartarus: f, children: [(0, d.jsxs)("div", { className: "mb-3 p-2 rounded-md text-center font-bold text-sm bg-amber-100 text-amber-800 border border-amber-300 tabular-nums", children: ["Coins: ", b.coins] }), (() => {
      const z = o.getTempBuffCost("doubleDamage"), K = o.getTempBuffCost("laserWipe");
      return (0, d.jsxs)(d.Fragment, { children: [(0, d.jsxs)("div", { className: "flex items-center justify-between gap-3 p-2.5 my-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800", children: [(0, d.jsxs)("div", { children: [(0, d.jsx)("div", { className: "text-sm font-bold", children: "1.5x Damage" }), (0, d.jsx)("div", { className: "text-xs text-slate-500", children: "Lasts 3 turns (Scales per buy)" }), (0, d.jsx)("div", { className: "text-xs font-bold text-emerald-700 mt-0.5", children: Q ? "Disabled" : b.buffs.doubleDamageTurns > 0 ? `${b.buffs.doubleDamageTurns} turns left` : "Inactive" })] }), (0, d.jsxs)("button", { type: "button", disabled: Q || b.coins < z || b.over || b.complete, onClick: () => o.buyTempBuff("doubleDamage"), className: "px-3 py-1.5 rounded-md bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:text-slate-500 text-white text-xs font-bold shrink-0 cursor-pointer disabled:cursor-not-allowed", children: ["Buy (", z, " C)"] })] }), (0, d.jsxs)("div", { className: "flex items-center justify-between gap-3 p-2.5 my-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800", children: [(0, d.jsxs)("div", { children: [(0, d.jsx)("div", { className: "text-sm font-bold", children: "Laser Wipe" }), (0, d.jsx)("div", { className: "text-xs text-slate-500", children: "Clears bottom row (Scales per buy)" })] }), (0, d.jsxs)("button", { type: "button", disabled: Q || b.coins < K || !b.bricks.length || b.over || b.complete, onClick: () => o.buyTempBuff("laserWipe"), className: "px-3 py-1.5 rounded-md bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:text-slate-500 text-white text-xs font-bold shrink-0 cursor-pointer disabled:cursor-not-allowed", children: ["Buy (", K, " C)"] })] })] });
    })()] }), l === "leaderboard" && (() => {
      const z = o.vault.getScores(), K = o.vault.getSpeedrunRecords(), $ = o.getStats(), re = [];
      for (const O of B.SR) {
        const le = `speedrun_${O}`;
        for (const st of B.DF) {
          const xe = K[le]?.[st];
          xe?.bestMs !== null && xe?.bestMs !== void 0 && re.push({ label: `${O} \xB7 ${st.toUpperCase()}`, value: `${cn(xe.bestMs)} (${xe.clears} clears)` });
        }
      }
      const H = [["Balls fired", String($.ballsFired)], ["Turns survived", String($.turnsSurvived)], ["Gems earned", String($.gemsEarned)], ["Coins earned", String($.coinsEarned)], ["Damage dealt", Number($.damageDealt).toFixed(1)], ["Bricks broken", String($.bricksBroken)], ...B.BTP.map((O) => [`${O[0].toUpperCase()}${O.slice(1)} bricks broken`, String($.bricksByType[O] || 0)])];
      return (0, d.jsxs)($t, { title: "Records & Lifetime Stats", maxWidth: "560px", onClose: P, isHell: u, isTartarus: f, children: [(0, d.jsx)("div", { className: "flex gap-1.5 mb-3", children: ["scores", "speedruns", "stats"].map((O) => (0, d.jsx)("button", { type: "button", onClick: () => X(O), className: `flex-1 py-1.5 px-2 rounded-md text-xs font-semibold cursor-pointer ${_ === O ? "bg-[#2b6cb0] text-white" : "bg-slate-200 text-slate-800"}`, children: O === "scores" ? "High Scores" : O === "speedruns" ? "Speedruns" : "Lifetime Stats" }, O)) }), _ === "scores" && (0, d.jsx)("div", { className: "max-h-[55vh] overflow-y-auto", children: (0, d.jsxs)("table", { className: "w-full text-xs border-collapse tabular-nums", children: [(0, d.jsx)("thead", { children: (0, d.jsxs)("tr", { className: "border-b border-slate-200 text-left", children: [(0, d.jsx)("th", { className: "p-2", children: "Rank" }), (0, d.jsx)("th", { className: "p-2", children: "Level/Mode" }), (0, d.jsx)("th", { className: "p-2", children: "Date" })] }) }), (0, d.jsx)("tbody", { children: z.length ? z.map((O, le) => (0, d.jsxs)("tr", { className: "border-b border-slate-200/40", children: [(0, d.jsx)("td", { className: "p-2", children: le + 1 }), (0, d.jsxs)("td", { className: "p-2", children: [O.mode || "Infinite", ": Level ", O.score] }), (0, d.jsx)("td", { className: "p-2", children: O.date })] }, le)) : (0, d.jsx)("tr", { children: (0, d.jsx)("td", { colSpan: 3, className: "p-3 opacity-70", children: "No high scores yet." }) }) })] }) }), _ === "speedruns" && (0, d.jsx)("div", { className: "flex flex-col gap-1.5 max-h-[55vh] overflow-y-auto text-xs tabular-nums", children: re.length ? re.map((O, le) => (0, d.jsxs)("div", { className: "flex justify-between p-2 rounded bg-slate-100 text-slate-800", children: [(0, d.jsx)("strong", { children: O.label }), (0, d.jsx)("span", { children: O.value })] }, le)) : (0, d.jsx)("p", { className: "opacity-75", children: "No speedrun clears yet." }) }), _ === "stats" && (0, d.jsx)("div", { className: "flex flex-col gap-1.5 max-h-[55vh] overflow-y-auto text-xs tabular-nums", children: H.map(([O, le], st) => (0, d.jsxs)("div", { className: "flex justify-between p-2 rounded bg-slate-100 text-slate-800", children: [(0, d.jsx)("strong", { children: O }), (0, d.jsx)("span", { children: le })] }, st)) })] });
    })(), x && (0, d.jsxs)($t, { title: x.title, maxWidth: "420px", onClose: k, isHell: u, isTartarus: f, children: [(0, d.jsx)("p", { className: "text-sm opacity-80 leading-relaxed mb-4", children: x.message }), (0, d.jsxs)("div", { className: "flex justify-center gap-2.5", children: [(0, d.jsx)("button", { type: "button", onClick: () => {
      x.onConfirm(), k();
    }, className: "px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold cursor-pointer", children: "Confirm" }), (0, d.jsx)("button", { type: "button", onClick: k, className: "px-4 py-2 rounded-lg bg-slate-600 hover:bg-slate-700 text-white text-sm font-semibold cursor-pointer", children: "Cancel" })] })] })] });
  }, Nm = "data:image/jpeg;base64,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", Am = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAYEBAUEBAYFBQUGBgYHCQ4JCQgICRINDQoOFRIWFhUSFBQXGiEcFxgfGRQUHScdHyIjJSUlFhwpLCgkKyEkJST/2wBDAQYGBgkICREJCREkGBQYJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCT/wAARCACzAPADASIAAhEBAxEB/8QAHQAAAQQDAQEAAAAAAAAAAAAABAMFBgcAAggBCf/EAEsQAAIBAgQDBAgDBQQIAwkAAAECAwQRAAUSIQYxQRNRYXEHCBQiMoGRoSOxwTNCUmLRFSRygkNjkqKywuHwFhjSJic0U2WDw9Pi/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAQCAwUBBv/EADQRAAEEAQMBBgYCAQMFAAAAAAEAAgMRBBIhMUEFE1FhcfCBkaGxweEi0fEGMkIUFSMkYv/aAAwDAQACEQMRAD8Asz08em2t9Fj5XRZVltNWVtcskrPVFuzjRSBsFIJJJ7xa3jiraL1w+KIwRW8N5NUdxilli/Mtg71yHhOa8LoF/GEFSSb/ALuqOwt53xzpgQr0zD1veMpyPYsmyOjUG51iSYnwvqX8sHD1ws9jy1Yk4coZK796eWZhHfwjUXt/mxz7jx3WNSzGwHXAhXRJ62fpBcsVp8gQE7AUrm31kw21vrcekJLxrNlCP/q6G5H1c4puonlnk7GEEN1ufh8/H8sa+xLTpf4m6scC6Batj/zV+k8tf+1IAO4UEFvywtF61vpOU/8AxVHJ/ioI/wBCMVHTwmViB0w6xUqsgZtmH3xy1IMtWdTetn6SI51af2CaO9zGKVEv4XufyxJ19cXi0oCODsrItuTVOL4oj2TU9xYAYUqJREoUH5DHLUtA6q66j1x+Myp7HhfI4j3vLI9vowxGq31svSbUVHaRVGX0af8AyoKRGX6uSfviqnkZrrbf8sJLCWuSyjzxJRLQrib1vvSKeVPlA8qM/wD7MDy+tx6SXJUSZdEf5aFf1Y4qfsbKdILDvItf+mB50Bkkcb+/pBHkccJQGWrqyz1vfSFQyM1VT5XmCnkk1L2dvIow++DpfXM44kvoyLIov/tyN/8AkxR5pjIBItipAG3Q2x57PY2Nwe44EaVeo9c7jPswv/h3Iy9t20yC58u0wLP643H0gPZ5VkcXiIHb85MUstMSbY2FKdx4/XBaNCtdfW19JbVFwcuIOwj9iXSPnqv98PFD65HHUYC1HD+SVP8ANaSMn6OR9sUi1MVVHVQRJcXJ2BBtgqKljRwFYv3va1/Id2I6/BW9wevu1fcfrm8Qqo7Tgihcnqlew/5Tgeb1y+K2BMHB2VR+MlQ7/kRilnprBB3tbArFAClxe5xwPtSMAAsq3Kr1vvSFM14suyOmF72WnZvuZMLUvri8eQgCbJshn8TFIn5SYpOUrGdgDhDtNTaj34mFTpCv3/zncXLJ2UnD2RRMeRbtbH568PWW+uJmHYaM14YhMt/2lDUaQR/hcH88c7mnhrKaze8D9VOG8NJQyezzPYf6OQ8iO44AVFza3XS1f64+atcZdwlRxi1g1TWM58yFUD74aR63vHGu5yjh3Tf4eym/PtMUVFKJARazKbMvdjfHVFdD0/rj5utNpqOEaB6i/wAcdY6p/slSfvi2PQd6YJ/SxQZq9XlUeX1OXSRq3ZSF45FcMQRcXBGk3+WOIMdB+pzUVC8ScR0ysfZmooZHXoXEhCn6FsCF564sbDijhyT91qGZR5iQf1GOfcdKeuW0HacJqLe0AVZP+D8P9cc14ELCQASTYDAFZMUIJ/aN+zT+H+Y+OFqurSAEHcgXA7z0whBTm3bVGppH8baRgXQLWUgENhzJO+Hw0OuEObWO3PDM0aowYMWQ8rW1Dzw701dE8Y1bEd+IlXsrgrKSkCNIFsAevdhGqllVmQnl3YMopNcrp7oBPTG9dQJoaVtQZtgRiF77qwMJGyaVnVU+J9XcOuB3qwz6TdF/eYbtbHs0FpacGTQJ1B5X0XJH5jC8/s8b9nFDE8ae6GdN2PU4kCDwoOaW7FDmqgUaY42Kjpew/qcYK4gECJLeF8LNBGd3p4j0sotjxBTodqSIjxY3x1QSLySTLpELgXueZvjeGkmkp5EEZ13Dgd9r3Hngmq/s+npUl9kCSv7wGq4tfmdhhf8As+jp0iaY1D1DLqkSFlREvuF5cwOfjipzimomNFk8evj8EDDWiKwaO5A0sBtqHS+NmzJSNPs6nwZjguMZasl2opnW+5M1z9xhWOKmjzKGEASxTMBZl20nr4HEnOoXShFGHvDL5NIGGvjA/FFv5EUbeRvfBFNFLm9bT5dlySPPUuEXULc8OFAslZA8okpqWIe6AsIAtc23tvywVT8U1OSH+41Uayj/AEsFPGG/2iPyxS98padAF+v6TccWM13/AJHGvIftNmbCkpq7+zqVZJVoh2JYWHaOD77b/wA18KUWppPxFZUI2A3I+mNVK5vVzVxpdTSPqZlX4j1OncD64kOU0NPWwusAbtorExspBse62x5fbFD5TEwBwT8GKzKlLoyL6DyH6TaaW06Nr90AnfpYHEemplklkaOpRhclbBj18sSHPZuzZqOBAqg2djzc/wBPDAVLVxZLV9v2KVMphICP8COR7rEdSBc277YtjLi3WPklMoRsf3J6Hc7pjYVJ2MTm3XScex07NG+pJtdxpsu1ut/thRppZCSZHse9jg/KdEwYM5YjoThvosocpHLoZELbEL449zGnimhaNyL8weoOCq6okpI1SI7W3Jwxy1E0jXZr3PdiNqZG1LSkkdH7N/2ie6D/ABr3f0w5AhgCDcHCEFH7TFM5uGQXB8b49pptYKuNLr8Qx1rwSQoy4742hx4KWx016m2Xxim4ozE7ytLT0w8FCs/3LfbHMuOgvU6r504o4hy8OfZ5aGKdlvtrWTSD9HOJpdN/reVMz+kLLKdmPZRZWjIvQFpZNR/3R9MUYzhBc9TYYvf1va2CbjrKKVFtNT5deRrcw8h0j5aT9cc818x1PY2CLoHizc/oPzwIWsKe21TTsPwlNlB64NJFibbcsI0o7OFVtYWwuEZmsBt3d+IWr2tPAQ7JucYuxN77YK7IEqkf4jk2CruScJyxjW68ypsT4ju8OeOaxwrWwu5KdsmhWoZbmzAfUYkLUglpZNr/AAgfU/0xHsmkWlfU1y1t/wCUYl9JULUwWjfXHGl7E/BduXzOEMiQg7LewMZrxR5UI4gy80wopF3PZC9uhDEj7EYCGqUsVDBvitaxF8WHnvDyz5blACveZpGkNr2VBc2/y2xD5qZl0sL3tq1W+H/pjuHkCRvz+6q7Wwe6fYGxA+yDSUR3BBLd3S+FZtkLsQEAuSBzx7FAKp39njEpQ+/IxKxJ5nmfIY0lpCst5pu1Isfh0qPIYdDgTQWM6FwbqPC9pI5I5u3cgSkWFxfQOW3jb6YWWHQmg7stwDfcjp9sIl2Y6UNh1ONYZJXkeTWVjZrAAC5A2vfpyxKgN1CyRROyXMKopeW4VefefAeOG6SaaGqV2Oh1ItY8hbYfQ4dFo1qJWeMqpsSO1kJPkCeZ8sM2aTRzSExsbWUBrcyBa48Mc2Oy6AWnUEdVM7rDRxOdKrdlXlq8vK2MFCqp77f5R+p/phOnjnWk7RDYvYseRJthaCplSxZVa3LUAwv4g46duENGo7rzXNC14ndU5WQkAfTEx9Hz1EdRX1SqGtSyFSx/eUEj/mxHIkMKaibONwR39PPE54FgaNc/y8x6ZqcPIFIsQhiNhbp1+uMntSSoSPfK9N/p/H/9gOJqr+xUSzhZTJHIiBWm1HUeYsSLeHf88Rmdz2l25E2ue/E74no5KfK6SdIyYmkkQyBSQuym1+l98RSTLpZoGq1S9OkyJrtsL3sD9B9sNYswMYKQ7TxHidwbv1+iDoYI55+yqKhaaJVLF2BPIXsB3nkPPG9JTzpKJUuq23OHOjybVKRJey7gX5nDrT5aVR3YgiNbkcuv/XFzpQDykY8Rzmjak3CFGift1J1rYW6HDfHkz1lSkFMjPK7AKii5O+9sG1dTPrZKaIEqLktsqDvJOF+GJ3pKo5j+0ZY5FiYghXkI0gr1IW5N++wxRM9waXN5T+JC10gY8bdSnH+waLLMprYqioCZipQ9jzAF9xf+Icz3YhNaNCxzqLkoNQ/iGHrM6iTtuwkdlKnTJv0I5HptzwzkFo2ifaSEEW7xiOLE9hJcbJ3V3ac8UrQyNtAbJSml7RCL3K9e8dDi/wD1PY3PG2eSj4FyxVPmZVt/wnHO2WEgyITfQbfI7/8Afnjpn1NqQtm/FFXtZKemi+rSH/lxpLy6Y/W7g7H0j0E52WXKYzf/AAyyg455qGD1AXoDrN+8/wDSwx0p65iRjibh6S41NQSh/wDCJAf1OObaN765WiWRna+5P2xw8KbBZ3R9M87BezT3TuNTAA/XDhFldZVxmaOiaZF+Jqdw1vkL4BSqjuCtLBbxBa/3w6RzxR0CVFOvZuJtDFWIZbrfT4ja4wpIHDj39VsYpiNh3Qe+i8oTWKDBl9FomBu0ujU6juu2y4Ojy2up71FXkYkC+9rWNgC38wRrWvz2woMzjaCB6mNKxZLiUTMzOCD0ubDaxBth7yqpkp66lbL5JFjlnhhdNykiuwsbE+61r36bYRmfI0FwHv1/S3cSPHeQ17j5cbX/APNfPdAZfwZnebyL2VKKMzgkmWY/ib3+Hc/XEuyb0f5hFURZe9RlgfUGaKKqBklUfy3vtc8h1xEOL83lmzabMOyo5YKd3pIqeRtRAVmGrSCCBcHwNsNOWcW5gs4/EhIU7J2CqqnwAAsfvhfuMqePUHAeVfm1N2ZiYk2lrb8/0KV0cZ8HV9bS0K5SezqKLU6ktoOq97AnqbX+WKw4g4Z4gWlqp6/2WBIkE3s8KBdd297YAcrk8z4Ylp4ii4l4ZbLa6V3qYImmo2BJdWQajE38SlQbNz2tvit4c9n0hkp4QSPjjLRk+djb7Yp7Nx522yxsfD831U+0MyDS10wJsHcH3fI8E7ZtnOQTCGChqJ2jgjCAR03u7dwuLXxHXr6IqzypWFg1/hGlh3eB8d8GPm1U6kRuI5D0d2F/EG9vlhdz2lDpI1OebLKzKSOoB5d+NmKExANH3/wsLKymZTjI6gfQ/DqU3iqyd8lmmmnmeudykVEg0RxD+Itzc+BtgV66jUAQmRtIsFKhbD64QzGlSWVSsAWSR2TQDp3ABN+4b3thWgyyhhp5Ja2MyHUoBF+ZvsBcd3PDEbas3ys6dxdTaGw6fdJjNbCS+lZGBUNrvpXqB3XG31wNVVslTTwwIiFYtVtCW5m5ueuDZYcrZwIaBjv1cqfkATjdEpaeUyRRSiwCohYr5klTc9wttsT3Yka5VbS7cXsVlI81ZpfTPdB8MdOzC3XkLYUhqaOaULBISx5K/U+QBxuzU86rankiYEfiCdyR/hvyO2HWgzSqkhlWJ6hHQLZlnYEkmwuRY4pe5wBI9/ROQRsNAg/K7+opKU1LUUqNNJoDr7xJVwQtvhQFQVubXPO23XFm8CcPNV5fLPCxNXLljQlzzJKmxbxFwPC2EcgyPMKrh6GomftknnkVJZZeSiwFy3TUGtiWV2aLwZlT0lGVbNKlBGi2FkA527u8sceSzcx0zu6bza97i4kePCDGbJ6Hpvuq+q0zKKSpeXI6+aJofZXpWIjgK6bfGPi33uADc72xGRSZrIY42yn2WmiBQQq7lCCd9Qv7xPUnu6Yk1dxq0aQpm2Z5vU1EjEKkdSEBQc3O3ug8gN74XnzXNTw5FmUNRNHQvq7SR3vKCWIC7WvYAWt1ucNNfPFQLRvt1VOnGm1GySOeP6/KY6OiMPvezEdNTBj8hfG0mW1FV+DR0zvI7bHoD58hhuqeLJpLJ2srsW0hma7HuHnhCvzM0zmGrzGZplNpI0d9CnuuvMjr49+HhHP8fiUhJPh8C6HoEdFwSy1hbiGso6eCMFuxWoBeVhyX3bhb95O2I3xDHXS1ck0KaYDsEgb3IwNgo8AP1wtVV1PMhKNEDbmqyFif8Tb4ZaKvkY1RjtpaNdumrWADhmKGYHvHm/KqCzpcrFcO4YDvvYNnYeiHkkqGskqG6gC7EXt0BwtXIHip5RUR9sY9Mm/UX5nvtbD1mbx5XTQmKNC8us2OwWxsCe++/wBMMD1s8hJlVZD0vcAfIYfa0uo+CxXvbHqbzdf2h9EtJUxSEgq50Nbl4Y6T9TavI4h4jow20tHDLbxSRlP/AB45nrp3kjs7jY3VQLW+WL69UeoeL0kTFb6KjLpEa3K5Kv8A8hxe3zWbJV7Jb1z63Vxtl1Op/ZZUu3i8z/ooxQUC6FA7hi+vXTiWLjnJnUbzZcuo256ZXGKGQG5wFDEvCkRYE6k1H3iNx52wvHU+z09RE9ikiixB+F1N1YeX5E4ER1uVU6iOZ6DCiL2hckalRb8/+72GIECt1fG4g/xRdHHUVTGwUa/eSHV73kOl/DEi4czeGERAPdoayGW3I7HTYjpzOI6gUqAhvta+HGMRrXU1TKtwskMswW2tja/PuJUYXyGBzCCtDs+Z0cjXN5se/gkuJoXOeVUaPuJpWv3XkJ/XDZDHon31B2Gk6Tte+x38DywbPUGorquZgxZppT5XkY7/AGwOhZp+1URsEOpowfetbmOht3YthbUYB8ErlSB873N4JP3UjyivfK6qnrlqTUtC4dqZotJIHMB725Xw018UEOYzJRSs9M95Ii62ZATupHW1xvjKaZlBKvqV1K6u+45Y1eAvPE4dEYC34hIUjz6YoEYZIXpwzmaARVv7+/8AhenS0YK3EiEll5h1t07iPvhSCZoYpJUj7QKhfRzDDqCPmPpjeooJqOQRzL2cjKHUXDB1/iVhsRgzKaNZXQC+7BARva9wduotjr5W6dQNhdx8V/eBjhR4UaJYZhHM47Qs7Ei/MkAfrg2RmqAisoVUFgqjl4+Zx5U0clLJQCRDqkmcjxAKr+anD1JlaLUuZJI44dbi4Nw5BNluL2Hefl34O/AAQ3Cc5xA8vqE3QxNTQ3RU1EWL/wBMewwvUSKiIXc7BQLk4cBTxrN+NVUkX8ryX/4b2GHDOclTJBTwwTrUSzwrPI0QPuKwuq38Rufpil+UAQ3qU1D2Y4gvI/iOfFNWbZbFl1JRL7TBNI5kecRvcRG4AQnvsL92+FMvakMMkk0Uk0Mri0UTFO2I/dDdFF928QB1OHXJcuingeoraaGZYXYRJIPceVgPi7woA28cAZjmklFK7Q9nPORYzMPdUAWARRsAOnTw76I3mS4745P1WhkRNx6yCOQKHwqz9fVO1ZxLLWrBSVlW1O6KBT0lOSkdOo5ADv5W1XJ/N14qzpZ4MjzCGRjMsawzuOUgDqDt4rsRitGQEPUVUkodmuzN+8T9ycO9VWSQ8L5TIHFRJUvOSA19NioUHxst/mMcnw42vjLRwfwVThdoyPjla89L+oH5Q1bJJU5xXzSq0k0tQ9r8x7xsNvAAeGJhV8QQ03DlFkj0ySwRJ2soLlWaUk73HQbbYizR09LIzKxqa0kmaRx7qseaqvLY9TvgGqmeqZkdmDkbW2v88WvgbMWk8BVsyDise3lx+nl6reXM0Sqp543LPBKjqFA0LZr2AwlN2bzSsCWGs/mcZHRxrYtzBJFuRYAH/v54woUsXYRxJ8THkP8Arhxgbeyyp+8LP5eqFnd+UKmMgbuw5eWEMsdYEnUgkEJ71thZ+uCVp5syZ3VlggchVLHcqNtsKUdPD22ZRQt+FHA5uwuHCje/mTicpptlU4TSZQB5/YrzNqn2mrLhtUYUKlj0A5fW+G6QKASWbYXJHL5YLNAyMkdOhkLJqYX5G5FyTywjW0hgiUSSq0rn4EGwHn1xY2q2S0lhxBSTBIacQJGvaut5ZCLsSegPQDF8epmsM/GmYGT9pDlpZPMSBT9m++KGf3mLE7nF0+pxU9j6Ta2C/wC0y6cfR4z+mOtFKuR2op09deTVxjw5Ft7tAzH5yt/THPsl2cqPcTq3U+WOhfXVpyvFvDlRf9rQtGP8spP/AD4oZIImjOuQ37wNsccaKlE2wULHLCCEUMpva3fheCanjZg0umysRbck2Nh9cIVlD2IDg6kbrblhOmpA6h3k7NDyNr3xzldBLSio54Y4w1yNQuUB+HyP6Y3mr+2EhjciSYBVAO97i3ysMIigptVnrHA7xETbBM2XCljUpUt2TWImhIIIvzI2IN8BHRSa48rSsrVpczrIGU6RO2/UHkdvlhQGNveMkKAbgs4Bxu1PSOixVtRWSdlsoVlIHkT0xvR5bRiSTTV04gI+GpG/+0LWPzGIiw2lN1PkJ6EoOVuxkR6WYOTu6rfRz8Rz8sO9LU0k0Wt5uyubBXViw79gLY3joIfejpKGhkMi3E0ryOgF/wB27Wv87jDnlWS0NZNEmYUNJTxAyAtTvMjgqha/vMQdh3dcLTS6WlxB29FpYeMXyBjCCT619lshjqsqijij9pNPNrEqggorEDQARex94+G3jh4ipqWGiWslqFUqBoBQmZmFjoYcttrG5vfbwCymfJsrjY1kOaqJoygppJYjYN+8SvvC3S4wrmmTUFI1JUUxqZRVlVgiebUCWJW9+4bm/cemMuRx1aDYs+/fC9JjBhZrYQS0b+6/NpjLU+acRZclYsi07aUZAb6WZmNj4XO/nbErk4crDNMkwiV1JTU0iRpccrEkC1uVumGumyuXM0WhpKCoqomcBpIE0EgHnZNzbpc92JLkfD/DOV5en9q0lXmeYg6ZUgqRojJJsvaX0tJa3upffEcmbRWk+VDf48iv8KGLFqLtQu97O3lXW/L4prXhQlitQsLQCEVMrhvw2vcCz8iNtyPEYViy9syeMUSTVHayCNGWJgpbkBci2LIyTgfJeIbQQ11c9BE3aRRVD6lLdwW/MdeeHatzFODWSghghNS+6rb4gP4QN/yAxjydoucaaLK14mRxnumC3eHCq/iPKxlFMtDAffpNSs4+C6m7Nflu+3jpxB8yqaeoDzItJTwk3t24aS/UBb7C9/G2JrmsWTZo+qppK6kqASeyMrMG6mxOpfG4INsN02T5HSUUc1TS0SCYkRmaRiWIte4seVxudr408OfuhRBJ9+aXz8I5LdZeAPPy+G3oq3ravtwTvfcIo/dHefHEoy+nC8F0dZHAZ5aWokkWOx6uPeAHMC24x7WZVl8P97p8so5IFYGWVZXkWNb/ABGMMLjn0HLEgp+NqXI6oUssMU8MbqpWOn0IY7izL+IQPdII2xoTyvlaBE2yDf6+qxcHHhxHvdkP2IoEDqeDvXh4FQiGrp+0b2iSONnYnWzbbm5vbe+E4aykM6oa9U1NYuEYhQeZJte2JJxrU5Y2f1CJllCSHI7d1YpJ030kFT474DyzNsnpw8YymiCEhnEk8hQH+Us1/scXtkc6MPDDuPEJF0MTZjG6UUD4Ov38UE9XTVFXTU1CxWmjLF2lhP4zEWuQN7EEgAcufPHmYQUhkZoqOqOjlHUOp0+N9vuMS3KePKSOsgMmURy0UbhZl1OSU66TqG9tx5Yk3FUPD9u2ywQZlR1CB6PtAC7tchkuwv7u9+vhjPflywyAOYRfna248HEymODJLrf/AGkDwrkn6bqlpKiqeQapuxW/KPoP1xIuFchqqiDN5Fgd4xRvFq72LArbvJI2798Oy5m+T06VklBk1KrSaImFADJJ3kAndR395wBmXF9dmVVDEmZCU6x2SiARKjHqBy+fPDb5JpRpa0AeN/r8rOhx8TGfre4k+Ff2VG2zqGFpYuwlJLDWbAEMLjkfPDfPVS1ExnaFwpFl2NgMPNbVSFnlkrFdidzHCNz52GBFJ9nFRJVTx69wvUi+3PbfnjQYXVx7+SwZmxFxOon4D+033dkaQXKra5C8vPFx+p8f/e3L45bUH/eTFRySxNrsJ3121EvYH5AYuH1O4O09LNVINhFlk5+roP1xa2+qSk0/8U/+uhXhuJuH6RwNVPE0q/4HIH5ocUYULIQFuLbWxePrr0oHFGQVVt2oGQnwWX/+zikaapgNPEqhhJb3iTsfLEZNldiC7BKHrwfYk8CL/LDbGjgaWBBBtv0xIxQtVUs4AGiw3PRulvvgbM6J4quVnTT2vvgeHL9MViYatKadhP0d50/ygI0k2LMSvjvhYqBGwdb33AXc4UhMrzAKGlmZhpFgS7dBbrgqGWeneWFezk7X3GAW4bwHhf8AQ4DJS4zGv0QMMKs4I91T9sE9jGiFbbk3u223lh3GVOxSRaCrAfYJTJ2tzsDcnrfoMZNlE6StB/Z2ZRzA/wCmjC/UW/XC5ymHqtBvZcrRxz5JpSndQdIYMxAGgm5+Q54l+RxPNTUtNUwyLODLFz30GMgMe6wa3lbAmW5JWZhO1NQxvC/LSCTJL8+QHlt54kWT5bBwVI8uezpNMqs0OX0xDyFjzLHko8TthDLyg8d23/d4dVsdn4Bxnd7Js3x+KiuQcK12YxrJUTpTUUahp6uXYBfC/M4uCj4UyniTL6SmgrozJSKFikiYarWtf+vniqM44xNXUvNKqTIDaKmp30wQE9xt77W5se/bGDiP2CRF/vEEpVJO0j20Nztbmw8ftivLwsnIDXF+l3QBU4ufiY4eyIfx2sn+vD/JKkXFfEbZPLJkmWxwpTwHQxtcSf4h+8Tz3uOmIxNnctZX9vUSa1ChUjAASMWGyqNl+WEM9mmrKiqzXtUmp53ea6C3YkknRfl325Hww2xSsUAXSLjn33w7jYbGRgVv1/KQyu0pXTE3te3h5eSt/hbiEe0UuYxVIjqNYRnmPurLa17/AMw+9+/AfHme1AzrN5Yn0PNUCN5B8RjESkIp6LcnYYgmVZkwqynaHsIkKIjfC12HMdSef07sO3HGYl66v0nVqaKW9uVwy/koxlswQzLHgR+Qt9+b3uE6eqLdr+Z/BTdlmZwy5nAkshMcYmYi++kQvt/QYDzmtNfV9o0uiN7FWI+FSLgADDHl8RgzGidtg0rX8bry+mDZX7Wnp2ub9lblbbUbY2xAGyWPD+15o5r3waT4/gJWkr6iGZGhb372AtfV00kdQeVsEtFltZ+FUxS0s9tKWPujuUk7gdOtu/DSNUNySFLD3e8jvGNhOWWxb3QbnvOJOh3tuyriyyBofv5FOOdaqiKKolhkp3V1hqO197crYSAjmCF3t1HjhmnplTUsShirfHuLjyP178HrW2oZ6J3Ps8ttrX7JwbhgPz88DQSiYaCNDpue5h3+HzwRamCjwF3KDJiHM5PPr7o+toRZqqBG7NtIPx256cTKtunCXD8KSe+zzHT1F2v+owwLTPNOXp6dyY0BnNvdB5H6i18SswVCZNkgghlfthLEqJbVL+ILc9uag74VzJAXM9fwVp9kYzhFNZ6fkcKDVVVPmFW71U0k0l9LO7FjttzOPAqwVdPJEPh1E38rYWlhWOdrLpXdjc3sb9/1wpBAXJmCmyDSnmev2xotLdK87Ix5eT1Qc0YK2kGw5IDy8z+mE3dZpkMwZkX91DY27hh/p4Msjy2pNSHarOkRAGwHeT9tvHDWkMSEk2OONlDrFcLrsYsDSSN/e6AWOx3G2Lp9TSZE9JeZX5y5bIi+faIx+wxULNGbkgCwxcfqYZWarjvMa8g6aTL5N/5nkRR9lbFjDaWmFAKx/XG4VTMeD8vz+Jb1GXTGGS3Mwy7X+ThP9rHJuXRPLCjokhBG5C7X88d7+m/K1zL0e5mHW8KxkTm1ysTbM/8AkOmT/JjgqhJpppqSUkFTqUA7eI+uCS62XcXTrpyfqCjrZFIVB2KtpLlhZSe84LzqkavqFlgQyhbroU2Ztybjww00uXVVRTTVlPHM0FMw7RlewQnl9bY2qcxWFAsdRPE5G5Vz+YxmmNzn20iwvTxZULICyRpo19PBHxUzZcrvmMxo10lOzhpdb2PMXNtPmTvhXLIMrrq2CKmWvLuf2YVI9Sjn745C3dhop6+Zo3f+05X0/FE8rC48CdjibcL5xUPmlNQzdpLTzyLTuk9meK5ADI2xuOfcRijIZLGwu/X49+KewMnFmeGjjwIs/O6+nwQNVxC1W5pcudaOnUtFGsR0vIq2AseYHgN8b0GeZzRxNTx1wa5BArl7YC1rAatxiGZwuiRUj3SJdIPebkk/U/bBmRVsk0gp55NSyD3GkYnQwubXPQ/nbDMeFCYtOlZeX2tkty9Zcdtq6fBT7OONMrocugOTUJos3zKnElVKHLR0seohtF997Gw8fLEAqMxiqnaGUyGGRrEk2AHQt1cjnubdwx5nNassdO6FNJpVUG3MdoxO/nhrglRk16xY8sSwcVkLDQ3KV7WzXzSaS6xQ+yVhgaFnVzuhIG9xfvGDMye9ZI/INpYWOwBUHDckjSyPEt9IY3cd1+mPJVbtFgjN9reQw7W9rLDiGlnmPpf9okzaoJYI5LvNpVkUclBvdj05DDhBl1XT0jmJYKsQKO1KsdcQ57qQD4XFxhshKrpjj+FRYt1OLP8ARx2VFnsmZV0SzU0GVGaqQx6iQFFwB3kafrhDNndCwvHyWz2ZisnJD+g/v3/SiOTZNmGcyLHRU5Z1YFuzBcgXH0/PC/HxbL+JpaaXbXTxxtvte5IxParjHNo4CuX1WV5ZBICDEqKrx272LDUbdRfFeZxRDiLOGhrngWqkj1w1sTFUqkUbkEta4sQR4YQxppJJu9kFAA+Z97LazIWxYrsaI7uI+l/Ln92mOdVl0K79iC6+9a5XcDlhCCuFJTyQztrdGtH328Tg98hyygnjb25nnX3v3ZV8L2BHyOPFyqmqKwJSS009S4L9kafUGtz22GNrUHDV0XlBG5h0dfmsWWNoFnM0fZsP3nAsR0N8DtUwyNpWeMi97m4v5XxrNwwoYypWUsYH7gJJB8BcnHuW8OyV9FWVc1WEhpGCuof37nkSDsF8ftjuoAWSohjnGg1b9pA5I+JehUbDHqR65kjp2Jk5hhsVHX+m+NZKGny0RSKaesEht2El2I7iSLc+m98SGhybKqaqC/3ztCVUokgZSTzUG19sKTzaOi2ez8AzbkgAVdmuVplNHG80RnEUNIxLuHk0pFIB7wseQawIt32xYHE2VLQcDcM1YqVgqHpS7obLtI1z5bnDRlNXkNLrMOW0dYRv/eZg2lRuQqk8+e+H/PuLqUv2MtFTSQ9kjRtUuyjSygqoVRzFxyx5/IllfK3S07b+/mvVxYzIRWoEb8enwVTZrWULV9SYO0dNdlkI+Ow3a3ibnG0UkcVKgMihnbWFvvptsT54fc4qcpqtUEcW6mzxJJdbjuO22IzJHHTSe5QwBf8AWMWJ/wB7G9A8vaAQQvL5cLInEh4N/T5X91q8b11ZFTo6BnYKLsB/2MBZv2VJmE0FHOaqBG0rKBpD+I8O7wwlWEe1a4ohCCNgrE+e53xpLS06MRLIS9h0Nvth1jTd9PBYMrxRA5vlIPOFDFmANjtfHRnqUl4s9z6EA6HoIZGNuvam32JxzfNTxMUihLl3a242tjtP1TuB/wCwOB5uIZ1Anztw0Q6rTx3VPqdTeRGLwknnorsqqWGtpZqWpjWWCZGjkjYbOpFiD5gnHzt9KvBVT6O+Na/J5NTR0cv4Ln/S07bxt9Nj4g4+i+KC9bT0drnnDMPFtJFqqcpHZVQA3emY8/8AIxv5M2OqINGwuSYqmSNToZgrDcA88eMQzkte5G4whRs8YemcXeI/Ud+CkRpHHLzxQQAtBji8BIiJ5LAISBiW8O5i+V1WXV04aVYJo3YcyVUkW+gthOLIVgpYqpqiF+0B/DVrsoH8Q6YRV0gHs6HUqG5Y9Seg8BhKWVszSwcLXw8U47xI7ZKcWZG+VZjcC9DXr7RSP0IO+2IwzSIksMdzI40qB0vzP0xP+LJnfhfhuleUnsIC8T2uwBZrL5XbriES0ZijIDgMd3cm1/n3YOz5C6L+XSx8jS523jhk38eu/pa3lLPNCj6HjpIViC9Cbk/MY8de3lkkWIvK/IAXufIYSaaSV3MRCjSDI7C1zc7geNxhahiq2Yx07yhpOYVjdjhvUGt2WaIjJJbt0pKJzmM9BTKJHM3ZKRtc8vl1++E2gSFnihYSNcq8g/et3eF74k0lJQZHQRV1QsgzF4WjgAJIY7r2p7lAO3U2wwR0z0biORdNwGV7jSR3g922F4Z9e/QfUrTy8ER7f8ibPkDwPX9JbKaGOSqi7fV2bSrHpTnufyGLCyrLa+k4aznMozZjGKWRb7t2ki8/CwbEcyDLHzV44qUosUep6qukNooQTv73UgW8r9+LAzCsyXLuDM9y/h+ll1J7NUS10zG9ZZ9OyndVBYW8DjJz8gueGDxH3W12diiCLVXP2/PvzVVZzWLNmJDgqsX4ai/ibk+ZucCOWrIljEgjCS649PONjsWAPNTYXsegwvnWg1krmK92a6kkaTfflgKSqMlhoRQFChUFgLdfEnqcbETLaCF57Lm0SuDt90RURU6QSGHWs9PcTQtYhQNrqw5i/QgEY9E7wUopo1SEyRqKhlX33bmQW525bctsJwGqmJrRH2i6ti5CLMbWKgnmTvy64QE8bO6L2mpTusgs48/HxxaxnQ7pSWba2ir+3760vXZYyhQ9BcjvxtNMsyllVRIB75U27RRvuOVxz8r401Xsb2/l6YFkYrICh3Xe/di6kmHkJasmBoNak60sPIg7HDsK+Smyt54SFkdhEZL7qGBJ0917EE93nhgpEMs8dG5BjklWxPQdQcLtM0uWwJq2Juf8twPPmcUPYHGin4Z3sjJB5/H+UZDmRjFvctz173GxFvvgjNcyepr2gd2EkKiJbmxIUWuO/DZRh6WUTFQZF3QH9w/xHx7u7zwqtS2vsS7Or/ukarm/TuPiMVuhAdqATEWY50fdk8lC1KlJXGoHSdj349pIJKypighQmRyFC3tc4duIKWjWpNoZIpmAkNNTsCkQtexvcg94+tsMPaIshYGQ/wAuwH2xZE/vGWEtkxdxKWuNi0XNTGWoazAgGwPfhXMKHQqm6t7gNx08MBpVkv7u3TC1fXN2LQrvK50qO7Hf5BwCjcRYSUpwRw3XcZ8UUeU5dGz1FZMtPFbkgPxOfBVBY+WPo7kOT03D2SUGUUYIpqGnjp4r89KKFF/HbHM3qfcCt7RXcUSR2jp70kUrL8TEAsFP0ufIdTjqfDQWSsGB8xy+mzXL6nL6yJZqaqiaGWNuTowII+hwRjMCF8//AEx+iXOPRVn0DOTUUExf2Wpt+0VTurdzAWPiDfvxG6N4apVljvvvttbHfnpI9H+WekjhWqyHMhoL/iU9QBdqeYA6XH1sR1BI644QrcvzL0W8W1eV55lymSAmKRG3UEg6ZF/iFveXvHPcYonaS0lo3T2BM1kgbIaafojzMBCFYdLWHPDTGGNW0UcZYyfCq/u2N/pbC9TXxMFeJldSLqeYIwMa+oCkRzCMHmqKFv8AMDCUbHadgt2WaPWLOw8E+53SGoy6jpqaojaeKkCSoz/A2q4APeAFuByJOIh2NXLUhZUaRoiAV03APy54XknWFVYtVAk81YbeO+DaOtQBddTLKxGpSEHL/EdwcEcb4mkDdE+TBlSN1WD8+PkiqHI56hSywPcqRp0m7fLztiUcH8F1s1YokoakxXBldoyulO4X6k2HlfvxH4c4emkFmnFyLsJjf9Bid8NcbZgS9A9dNUU9TGY1RpCSj2JVlb4huLW5b4zM1+QGHSFt4EeLrBj3cPFMPFGQ5kubTPVZfVIikdneK6LHbYc+n6YaI+FpKyWKvq9SZIq6Y2DgPNY/CBzGtiTe3LB9FxfPUZmaerkkk7V2MmrbTa/Ig36dcJZznz1sh9u0Swg3WImyL3eOrxx2FuSKjocc+Xl5qzIdguaZ3O68V18+dvqh6riilERgipyY4rCKG4WFSDz0j4rdL+eBsuzqevoM2o9LvI9O0qlWJ96689/5R9MBSNlushY6aPSb/sbm/cTvfGxz2GHSsVQ8ZY/idnCEFuXMHx7sO/8ATgNprVl/9w7yXVNJtxsOnHlwm6rzGKR2YS6+097YdTvY9xwFDVRyE9q6ooP7Pv8AM/phwqsqoo1jaZhFqHJLg+ek7/1wFUZdShb09WWVfiJ2a38qm1/rfwxpR1Wy83OXF5LuVvLWLpDBoyoFgS3LAFZXNVBGZCHTbWDuw7r4KbLadY1kjlMy3sW1WI+VvvhGjpFnqjFJcolybbE4ml91stRHoISQ6f4W5r5HGrTRA2VrjwN74Pjyelq+0MGsmJDI+kGyqOZP1H1wLHR08k3ZxhtO5LsbWA64NQXQwovh6FarM4ZZCsdLTN2k8sjAKqcvr4c8ef2VX0FW8HZSAX9xgupWW+xBHQjuwXluVVGb3pKRaiaKBTKQZLRxjqx6AeJ78aswo0Xs55GCPpIDmw2uCPvhR7zrNHfwWvBHG6JrXtNXd/Kx6bD2dkZYJVBQoVYbEEWIPlhNIauAErTTjozhTf8AriSx54KiieqMUaVcQCPKB+1HQkd+2I7JVyCZ6g1EqNLudBIJ88VxSSPJBHCazMbGha1zHE34eCQeeahMvvFGkUo6H4rHmD3YbhMvOxOHB3i0EiLUT/Gb3xoJqdKSQy04MoYHWNgq91upOHGGlhSguO3CBEvZoWvuSdjiYejHgOt4+zr2SlGuplIigDXspb4pn/kRQWPedC/vYYuGOF8140z6lyzLaJ56mqcJBAu2rrcnooG5Y8hjvj0T+inKvRhkEdJTLHPmUqA1lbp3lbnZe5AeQ+u+LQOqTc8kV0Uh4Q4Wy/gzhygyHLI9FLRxCNSfic82dv5mNyfE4d8ZjMSUFgxmMGMwIWYrP03ehnL/AEoZG80MUcef0kLCjnLaVk3v2UhsbqTy/hJuOt7MxmBC+avFXCef8B5s9Bm+X1NBOu5hmFww/iUjZlPeCcC0tbHUkWNj1B54+jnE/CGR8YZe9BnmXQVsLKVGtfeQHnpbmOnLuHdjkn0seqvnfDE0+ZcMRz5xlIu4EQvVU47mQftAP4l37x1xAsBV0czmKpgVkTSbbYUijjhCNEjCQE6gxBUjpbuPO/yw1RT1VEzK+mX9072PkRbBQzdorB6Zt+qsDih0buAtCPIjO5O6NYNIdLe7vyPTDzQROEjkRykkZBDKe69vzxHUzqFbM8T6h0PI/S+Ck4thjH7Bj/hcfqMLyxPcKAT2NlQsdrLk5LQvFmEs8o3ZWII8RscNlQhhIdgWlsArE/s7KBcDv8emC4+MqSQIJKWo9wMAQFOx+ffgafNqOquwp6oE98d/yOIxMkB/kFbk5GO9tMeOSfmkqOhVwdR2OFKimipgG0XIFwO/zwkmdU8II7OcW74jhOTNoJ47ETEd/ZnF9SEpESQBtWLQ1dVNNUyykbuxY4EFQxuFsf5u7C0jwS3CM5B7xY4RDqNkil26aDhhooUkJHguJJRFGJp6qGGEgMzBFBICi/eTtbvvjxhGldVpBITFchXewJAPhgZmZv8ARS/NbY9QlpmPZyMCTsoF/wA8do3a53jdNIn2h0V44piFkADhTswvcA+FwDjbUEQxpY3+J/4vDywg2tiAYJlUcgExjuRqKxzBRy1KL28ccpdDxXKIWokgRlWRlWQWYA/F4HGiVB3DAMrcweuATVgkjQ5OFY53Fj7LMw8sRLPJTZMByU+ZcwNLVIx1ElSFJ/dF9/vbC2ZrR10iGkplpI1QKVD6rnqfnhoTN5E2WgOoC27AYQetrJ20iFYz/EW2GKBA7Vq4Tzs+IMDOfgi6kU9CmqVxq6KOZwpkfDOb8UVMQosvnqO0mSnghQX1ytyXxNrnwAJNhieeij1d+JvSLLHmMymgykm5zCpU/iD/AFSHdz/MbKPHljrv0e+ifh70eUqLl8BmqlVlFTMdTqGN2C917C55tYX2AAaZHp55WVNka9gKCZ/Qp6GKD0YZR7RUiOq4gq0AqqobiMc+yj7lHU82O56AWZjMZixLrMZjMZgQsxmMxmBCzGYzGYELMZjMZgQmWs4M4ZzSRnr+HcnqmLFy01HG5LHmbleZ78DQejvg2iDezcJ5DFq56aCIX/3cZjMCEVDwpw9TA9hkOUxatzopI1v9BgXNuD8gq6Vu0ymkUjrEnZn6rbGYzAhVlJ6POGqzMSk9BI693tUw/J8Sei9Ano1qEE9RwtTzynm0s8z/AJucZjMCE6U/oU9HFN+z4LyXb+OnD/nfBaeijgGNw68GcPhl3B9gj/8ATjMZgQjX4I4WnjEMvDWSyRjkjUMRA+WnAFT6JPR/Vtqm4MyBj3iijH5DGYzAhJ1Hox4Go6Zuw4P4fQgEg+wRE/dcR/J/Rtwnn1RWR5hk0MkQGgRRu8SW320oQPtjMZgQnOD0C+jKnN04Nyxj/rAz/wDEThxj9Evo/itp4MyAW76GM/pjMZgQlz6MeBipQ8H8P2P/ANPi/wDTgM+hv0dG/wD7FZDvz/uaf0xmMwITjTejzhCjpvZafhrKYoP4FpkA/LBVBwvkOURtT5fkuW0kT3LJDTIgY95sN8ZjMCE6IqoiqoCqAAABYAY2xmMwIWYzGYzAhZjMZjMCF//Z", Cm = "data:image/jpeg;base64,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", Tm = "data:image/jpeg;base64,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", jm = ({ vault: l, onBack: o, onSelectOccupiedSlot: u, onSelectEmptySlot: f, onWipeSlot: c }) => {
    const h = Array.from({ length: B.SLOTS }, (m, x) => {
      const k = l.isSlotOccupied(x), P = l.getRun(x), F = l.getMeta(x), j = l.getModeRecords(x), y = l.getStats(x), I = P?.state?.runMode, q = I === "hell", te = I === "tartarus";
      return { idx: x, occupied: k, run: P, meta: F, mods: j, stats: y, runMode: I, isHell: q, isTartarus: te, isActiveRun: !!(P && P.state && !P.state.over && !P.state.complete), bgImg: k ? te ? Tm : q ? Am : Cm : Nm, fallbackGradient: k ? te ? "radial-gradient(circle at center, #450a0a 0%, #050508 100%)" : q ? "radial-gradient(circle at bottom, #f6ad55 0%, #c53030 48%, #3b0707 100%)" : "linear-gradient(135deg, #3182ce 0%, #1a365d 100%)" : "linear-gradient(135deg, #edf2f7 0%, #cbd5e0 100%)" };
    });
    return (0, d.jsx)("section", { className: "fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#faf8ef] p-5 text-[#222] overflow-y-auto", "aria-label": "Save Profile Select", children: (0, d.jsxs)("div", { className: "relative z-10 w-[min(840px,96vw)] max-h-[92vh] flex flex-col gap-3.5 p-5 rounded-xl bg-white border-2 border-[#171717] shadow-[0_6px_20px_rgba(0,0,0,0.08)]", children: [(0, d.jsxs)("div", { className: "flex items-center justify-between border-b-2 border-slate-100 pb-3", children: [(0, d.jsx)("h2", { className: "m-0 text-xl font-bold text-[#171717]", children: "Choose a Save File" }), (0, d.jsxs)("button", { type: "button", onClick: o, className: "inline-flex items-center gap-2 rounded-lg bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 text-sm font-semibold cursor-pointer transition-colors", children: [(0, d.jsx)(dh, { className: "w-4 h-4" }), (0, d.jsx)("span", { children: "Back" })] })] }), (0, d.jsx)("div", { className: "flex flex-col gap-2.5 overflow-y-auto pr-1", children: h.map((m) => {
      const x = m.occupied ? m.isTartarus ? "bg-[#0d0d12] border-[#7f1d1d] text-slate-100 hover:bg-[#17121c] hover:border-red-500" : m.isHell ? "bg-[#fff5f5] border-[#9b2c2c] hover:bg-[#fed7d7]" : "bg-slate-50 border-[#171717] hover:bg-sky-50 hover:border-[#2b6cb0]" : "bg-slate-50 border-[#171717] hover:bg-sky-50 hover:border-[#2b6cb0]", k = m.occupied ? m.isActiveRun && m.runMode ? `File ${m.idx + 1}: ${Hn[m.runMode]?.label || "Infinite"}` : `File ${m.idx + 1}: Career Save` : `File ${m.idx + 1} \u2014 Empty`, P = m.isActiveRun ? (m.run?.state.difficulty || "medium").toUpperCase() : "IDLE", F = m.isActiveRun ? `Level ${m.run?.state.level}` : `Best \u221E ${m.mods.infinite} / Hell ${m.mods.hell} / Tartarus ${m.mods.tartarus}`, j = m.isActiveRun ? cn(m.run?.state.elapsedMs || 0) : `${m.stats.bricksBroken} Bricks`;
      return (0, d.jsxs)("div", { role: "button", tabIndex: 0, onClick: () => m.occupied ? u(m.idx) : f(m.idx), onKeyDown: (y) => {
        (y.key === "Enter" || y.key === " ") && (y.preventDefault(), m.occupied ? u(m.idx) : f(m.idx));
      }, className: `relative flex items-center justify-between gap-3.5 px-4 py-3 rounded-[9px] border-2 cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm ${x}`, children: [(0, d.jsxs)("div", { className: "flex items-center gap-3.5 min-w-0", children: [(0, d.jsxs)("div", { className: `relative w-[76px] h-[56px] rounded-[10px] shrink-0 overflow-hidden flex items-center justify-center border-2 ${m.occupied ? m.isTartarus ? "border-red-500 text-red-200" : "border-[#171717] text-white" : "border-dashed border-slate-500 text-slate-700"}`, style: { background: m.fallbackGradient }, children: [(0, d.jsx)("img", { src: m.bgImg, alt: "", referrerPolicy: "no-referrer", className: "absolute inset-0 w-full h-full object-cover" }), (0, d.jsx)("div", { className: `absolute inset-0 ${m.occupied ? m.isTartarus ? "bg-black/45" : m.isHell ? "bg-gradient-to-t from-black/65 via-black/30 to-black/20" : "bg-gradient-to-t from-slate-950/65 via-slate-900/30 to-slate-900/15" : "bg-white/35"}` }), (0, d.jsx)("span", { className: "relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]", children: m.occupied ? m.isTartarus ? (0, d.jsx)(go, { className: "w-5 h-5" }) : m.isHell ? (0, d.jsx)(Ia, { className: "w-5 h-5" }) : (0, d.jsx)(Rh, { className: "w-5 h-5" }) : (0, d.jsx)(Jh, { className: "w-5 h-5" }) })] }), (0, d.jsxs)("div", { className: "flex flex-col gap-1 min-w-0", children: [(0, d.jsxs)("div", { className: "flex items-center flex-wrap gap-2", children: [(0, d.jsx)("span", { className: `text-base font-bold ${m.isTartarus ? "text-slate-50" : "text-[#171717]"}`, children: k }), m.occupied && (0, d.jsxs)("span", { className: `text-xs font-semibold ${m.isTartarus ? "text-red-300" : m.isHell ? "text-red-700" : "text-[#2b6cb0]"}`, children: ["\xB7 ", P] })] }), m.occupied ? (0, d.jsxs)("div", { className: `flex flex-wrap items-center gap-x-3 gap-y-1 text-xs tabular-nums ${m.isTartarus ? "text-slate-300" : "text-slate-600"}`, children: [(0, d.jsx)("strong", { className: "font-bold", children: F }), (0, d.jsx)("span", { "aria-hidden": "true", children: "\xB7" }), (0, d.jsxs)("span", { children: [m.meta.coins, " Coins"] }), (0, d.jsx)("span", { "aria-hidden": "true", children: "\xB7" }), (0, d.jsxs)("span", { children: [m.meta.gems, " Gems"] }), (0, d.jsx)("span", { "aria-hidden": "true", children: "\xB7" }), (0, d.jsx)("span", { children: j })] }) : (0, d.jsx)("span", { className: "text-xs font-semibold text-slate-500", children: "Click to choose a mode and start playing" })] })] }), (0, d.jsxs)("div", { className: "flex items-center gap-2 shrink-0", children: [(0, d.jsx)("span", { className: `px-3 py-1 rounded-md text-xs font-bold ${m.occupied ? m.isTartarus ? "bg-red-950/90 text-red-200 border border-red-700" : m.isHell ? "bg-red-100 text-red-800 border border-red-300" : "bg-sky-100 text-[#2b6cb0] border border-sky-300" : "bg-slate-200 text-slate-700"}`, children: m.occupied ? m.isActiveRun ? "Continue" : "Play" : "New Game" }), m.occupied && (0, d.jsx)("button", { type: "button", title: `Delete File ${m.idx + 1}`, onClick: (y) => {
        y.stopPropagation(), c(m.idx);
      }, className: "p-2 rounded-md bg-red-600 hover:bg-red-700 text-white cursor-pointer transition-colors", children: (0, d.jsx)(Bl, { className: "w-4 h-4" }) })] })] }, m.idx);
    }) })] }) });
  };
  function Sn(l) {
    return l === "tartarus" ? "tartarus" : l === "hell" ? "hell" : l.startsWith("speedrun_") ? "speedrun" : "infinite";
  }
  var Em = class {
    #e = null;
    #n = null;
    #t = null;
    #r = !1;
    #a = !1;
    #o = null;
    #i = 0;
    #u = 0;
    #h = 0;
    #m = 0;
    isMuted() {
      return this.#a;
    }
    toggleMute() {
      return this.#a = !this.#a, this.#n && this.#e && this.#n.gain.setTargetAtTime(this.#a ? 0 : 0.28, this.#e.currentTime, 0.06), this.#a;
    }
    #s() {
      if (!this.#e) {
        const l = window.AudioContext || window.webkitAudioContext;
        if (!l) return !1;
        this.#e = new l(), this.#n = this.#e.createGain(), this.#n.gain.value = this.#a ? 0 : 0.28, this.#n.connect(this.#e.destination), this.#t = this.#y(this.#e);
      }
      return this.#e.state === "suspended" && this.#e.resume().catch(() => {
      }), !0;
    }
    #y(l) {
      const o = l.sampleRate * 0.6, u = l.createBuffer(1, o, l.sampleRate), f = u.getChannelData(0);
      for (let c = 0; c < o; c++) f[c] = Math.random() * 2 - 1;
      return u;
    }
    startBgm() {
      this.#s() && (this.#r || (this.#r = !0, this.#i = 0, this.#c(), this.#o = setInterval(() => this.#c(), 1450)));
    }
    stopBgm() {
      this.#r = !1, this.#o && (clearInterval(this.#o), this.#o = null);
    }
    #c() {
      if (!this.#r || !this.#e || !this.#n || this.#a) return;
      const l = this.#e.currentTime, o = this.#e.createOscillator(), u = this.#e.createGain();
      o.type = "sine";
      const f = this.#i % 4 === 3 ? 41.2 : 36.71;
      o.frequency.setValueAtTime(f, l), o.frequency.exponentialRampToValueAtTime(f * 0.72, l + 1.35), u.gain.setValueAtTime(1e-3, l), u.gain.linearRampToValueAtTime(0.42, l + 0.14), u.gain.exponentialRampToValueAtTime(1e-3, l + 1.4), o.connect(u).connect(this.#n), o.start(l), o.stop(l + 1.42);
      const c = [73.42, 77.78, 103.83, 110, 146.83, 155.56];
      if ([c[this.#i % c.length], c[(this.#i + 2) % c.length]].forEach((h, m) => {
        if (!this.#e || !this.#n) return;
        const x = this.#e.createOscillator(), k = this.#e.createBiquadFilter(), P = this.#e.createGain();
        x.type = m === 0 ? "sawtooth" : "triangle", x.frequency.setValueAtTime(h, l), x.detune.setValueAtTime((Math.random() - 0.5) * 18, l), k.type = "lowpass", k.frequency.setValueAtTime(340, l), k.frequency.linearRampToValueAtTime(160, l + 1.4), P.gain.setValueAtTime(1e-3, l), P.gain.linearRampToValueAtTime(0.1, l + 0.35), P.gain.exponentialRampToValueAtTime(1e-3, l + 1.44), x.connect(k).connect(P).connect(this.#n), x.start(l), x.stop(l + 1.45);
      }), this.#i % 3 === 1) {
        const h = this.#e.createOscillator(), m = this.#e.createGain();
        h.type = "sine";
        const x = [587.33, 622.25, 830.61, 880][this.#i % 4];
        h.frequency.setValueAtTime(x, l + 0.2), h.frequency.exponentialRampToValueAtTime(x * 0.94, l + 1.3), m.gain.setValueAtTime(1e-4, l + 0.2), m.gain.linearRampToValueAtTime(0.05, l + 0.32), m.gain.exponentialRampToValueAtTime(1e-4, l + 1.35), h.connect(m).connect(this.#n), h.start(l + 0.2), h.stop(l + 1.38);
      }
      this.#i++;
    }
    playShoot(l = "infinite", o = !1) {
      if (!this.#s() || !this.#e || !this.#n || this.#a) return;
      const u = this.#e.currentTime, f = Sn(l), c = this.#e.createOscillator(), h = this.#e.createGain();
      if (f === "tartarus") {
        c.type = "sawtooth", c.frequency.setValueAtTime(o ? 165 : 135, u), c.frequency.exponentialRampToValueAtTime(46, u + 0.16);
        const m = this.#e.createBiquadFilter();
        m.type = "lowpass", m.frequency.setValueAtTime(580, u), h.gain.setValueAtTime(o ? 0.26 : 0.17, u), h.gain.exponentialRampToValueAtTime(1e-3, u + 0.17), c.connect(m).connect(h).connect(this.#n), c.start(u), c.stop(u + 0.18);
      } else if (f === "hell") c.type = "triangle", c.frequency.setValueAtTime(o ? 310 : 250, u), c.frequency.exponentialRampToValueAtTime(88, u + 0.14), h.gain.setValueAtTime(o ? 0.24 : 0.16, u), h.gain.exponentialRampToValueAtTime(1e-3, u + 0.15), c.connect(h).connect(this.#n), c.start(u), c.stop(u + 0.16);
      else if (f === "speedrun") {
        c.type = "square";
        const m = this.#e.createBiquadFilter();
        m.type = "bandpass", m.frequency.setValueAtTime(1400, u), c.frequency.setValueAtTime(720, u), c.frequency.exponentialRampToValueAtTime(1280, u + 0.06), h.gain.setValueAtTime(o ? 0.16 : 0.1, u), h.gain.exponentialRampToValueAtTime(1e-3, u + 0.065), c.connect(m).connect(h).connect(this.#n), c.start(u), c.stop(u + 0.07);
      } else c.type = "sine", c.frequency.setValueAtTime(440, u), c.frequency.exponentialRampToValueAtTime(820, u + 0.085), h.gain.setValueAtTime(o ? 0.2 : 0.13, u), h.gain.exponentialRampToValueAtTime(1e-3, u + 0.095), c.connect(h).connect(this.#n), c.start(u), c.stop(u + 0.1);
    }
    playBrickHit(l = "infinite", o = !1, u = "normal") {
      if (!this.#s() || !this.#e || !this.#n || this.#a) return;
      const f = performance.now();
      if (f - this.#u < 24) return;
      this.#u = f;
      const c = this.#e.currentTime, h = Sn(l), m = 0.93 + Math.random() * 0.15, x = u === "tank" || u === "titan" ? 0.72 : 1, k = this.#e.createOscillator(), P = this.#e.createGain();
      if (h === "tartarus") {
        k.type = "square", k.frequency.setValueAtTime((o ? 340 : 185) * m * x, c), k.frequency.exponentialRampToValueAtTime(64, c + 0.075);
        const F = this.#e.createBiquadFilter();
        F.type = "lowpass", F.frequency.setValueAtTime(o ? 1500 : 750, c), P.gain.setValueAtTime(o ? 0.22 : 0.12, c), P.gain.exponentialRampToValueAtTime(1e-3, c + 0.08), k.connect(F).connect(P).connect(this.#n), k.start(c), k.stop(c + 0.085);
      } else h === "hell" ? (k.type = "sawtooth", k.frequency.setValueAtTime((o ? 520 : 285) * m * x, c), k.frequency.exponentialRampToValueAtTime(98, c + 0.065), P.gain.setValueAtTime(o ? 0.21 : 0.12, c), P.gain.exponentialRampToValueAtTime(1e-3, c + 0.07), k.connect(P).connect(this.#n), k.start(c), k.stop(c + 0.075)) : h === "speedrun" ? (k.type = "triangle", k.frequency.setValueAtTime((o ? 1420 : 880) * m * x, c), k.frequency.exponentialRampToValueAtTime(o ? 1980 : 660, c + 0.045), P.gain.setValueAtTime(o ? 0.2 : 0.12, c), P.gain.exponentialRampToValueAtTime(1e-3, c + 0.05), k.connect(P).connect(this.#n), k.start(c), k.stop(c + 0.055)) : (k.type = "triangle", k.frequency.setValueAtTime((o ? 980 : 610) * m * x, c), k.frequency.exponentialRampToValueAtTime(o ? 1360 : 450, c + 0.06), P.gain.setValueAtTime(o ? 0.2 : 0.13, c), P.gain.exponentialRampToValueAtTime(1e-3, c + 0.065), k.connect(P).connect(this.#n), k.start(c), k.stop(c + 0.07));
    }
    playBrickBreak(l = "infinite", o = "normal") {
      if (!this.#s() || !this.#e || !this.#n || this.#a) return;
      const u = this.#e.currentTime, f = Sn(l), c = o === "titan" || o === "tnt" || o === "tank" || o === "devil";
      if (f === "tartarus") {
        const h = this.#e.createOscillator(), m = this.#e.createGain();
        h.type = "sawtooth", h.frequency.setValueAtTime(c ? 112 : 168, u), h.frequency.exponentialRampToValueAtTime(26, u + (c ? 0.44 : 0.24)), m.gain.setValueAtTime(c ? 0.36 : 0.24, u), m.gain.exponentialRampToValueAtTime(1e-3, u + (c ? 0.46 : 0.26)), h.connect(m).connect(this.#n), h.start(u), h.stop(u + 0.47);
        const x = this.#e.createOscillator(), k = this.#e.createGain();
        x.type = "sine", x.frequency.setValueAtTime(780, u), x.frequency.exponentialRampToValueAtTime(295, u + 0.21), k.gain.setValueAtTime(0.11, u), k.gain.exponentialRampToValueAtTime(1e-3, u + 0.23), x.connect(k).connect(this.#n), x.start(u), x.stop(u + 0.24);
      } else f === "hell" ? ([148, 212].forEach((h, m) => {
        if (!this.#e || !this.#n) return;
        const x = this.#e.createOscillator(), k = this.#e.createGain();
        x.type = m === 0 ? "sawtooth" : "square", x.frequency.setValueAtTime(h, u), x.frequency.exponentialRampToValueAtTime(40, u + (c ? 0.34 : 0.24)), k.gain.setValueAtTime(0.18, u), k.gain.exponentialRampToValueAtTime(1e-3, u + (c ? 0.36 : 0.25)), x.connect(k).connect(this.#n), x.start(u), x.stop(u + 0.37);
      }), this.#d(0.16, 950, 0.12)) : f === "speedrun" ? [659.25, 880, 1318.5].forEach((h, m) => {
        if (!this.#e || !this.#n) return;
        const x = this.#e.createOscillator(), k = this.#e.createGain();
        x.type = "square";
        const P = this.#e.createBiquadFilter();
        P.type = "lowpass", P.frequency.setValueAtTime(2600, u), x.frequency.setValueAtTime(h, u + m * 0.015), x.frequency.exponentialRampToValueAtTime(h * 1.12, u + 0.11), k.gain.setValueAtTime(0.1, u + m * 0.015), k.gain.exponentialRampToValueAtTime(1e-3, u + 0.125), x.connect(P).connect(k).connect(this.#n), x.start(u + m * 0.015), x.stop(u + 0.135);
      }) : [523.25, 659.25, 1046.5].forEach((h, m) => {
        if (!this.#e || !this.#n) return;
        const x = this.#e.createOscillator(), k = this.#e.createGain();
        x.type = "triangle", x.frequency.setValueAtTime(h, u + m * 0.018), x.frequency.exponentialRampToValueAtTime(h * 1.18, u + 0.16), k.gain.setValueAtTime(0.14, u + m * 0.018), k.gain.exponentialRampToValueAtTime(1e-3, u + 0.18), x.connect(k).connect(this.#n), x.start(u + m * 0.018), x.stop(u + m * 0.018 + 0.19);
      });
    }
    #d(l, o, u) {
      if (!this.#e || !this.#n || !this.#t) return;
      const f = this.#e.currentTime, c = this.#e.createBufferSource();
      c.buffer = this.#t;
      const h = this.#e.createBiquadFilter();
      h.type = "lowpass", h.frequency.setValueAtTime(o, f), h.frequency.exponentialRampToValueAtTime(120, f + l);
      const m = this.#e.createGain();
      m.gain.setValueAtTime(u, f), m.gain.exponentialRampToValueAtTime(1e-3, f + l), c.connect(h).connect(m).connect(this.#n), c.start(f), c.stop(f + l + 0.02);
    }
    playWallBounce(l = "infinite") {
      if (!this.#s() || !this.#e || !this.#n || this.#a) return;
      const o = performance.now();
      if (o - this.#h < 35) return;
      this.#h = o;
      const u = this.#e.currentTime, f = Sn(l), c = this.#e.createOscillator(), h = this.#e.createGain();
      f === "tartarus" ? (c.type = "triangle", c.frequency.setValueAtTime(135, u), c.frequency.exponentialRampToValueAtTime(72, u + 0.05)) : f === "hell" ? (c.type = "sawtooth", c.frequency.setValueAtTime(215, u), c.frequency.exponentialRampToValueAtTime(125, u + 0.045)) : f === "speedrun" ? (c.type = "sine", c.frequency.setValueAtTime(520, u), c.frequency.exponentialRampToValueAtTime(410, u + 0.032)) : (c.type = "sine", c.frequency.setValueAtTime(340, u), c.frequency.exponentialRampToValueAtTime(240, u + 0.04)), h.gain.setValueAtTime(0.065, u), h.gain.exponentialRampToValueAtTime(1e-3, u + 0.05), c.connect(h).connect(this.#n), c.start(u), c.stop(u + 0.055);
    }
    playBonusPickup(l = "infinite") {
      if (!this.#s() || !this.#e || !this.#n || this.#a) return;
      const o = this.#e.currentTime, u = Sn(l);
      (u === "tartarus" ? [311.13, 466.16] : u === "hell" ? [392, 587.33] : u === "speedrun" ? [783.99, 1046.5, 1318.5] : [587.33, 880]).forEach((f, c) => {
        if (!this.#e || !this.#n) return;
        const h = this.#e.createOscillator(), m = this.#e.createGain();
        h.type = u === "tartarus" ? "triangle" : "sine", h.frequency.setValueAtTime(f, o + c * 0.05), m.gain.setValueAtTime(0.14, o + c * 0.05), m.gain.exponentialRampToValueAtTime(1e-3, o + c * 0.05 + 0.12), h.connect(m).connect(this.#n), h.start(o + c * 0.05), h.stop(o + c * 0.05 + 0.13);
      });
    }
    playExplosion(l = "infinite") {
      if (!this.#s() || !this.#e || !this.#n || this.#a) return;
      const o = this.#e.currentTime, u = Sn(l), f = this.#e.createOscillator(), c = this.#e.createGain();
      f.type = u === "tartarus" || u === "hell" ? "sawtooth" : "triangle", f.frequency.setValueAtTime(u === "tartarus" ? 95 : 140, o), f.frequency.exponentialRampToValueAtTime(24, o + 0.36), c.gain.setValueAtTime(0.32, o), c.gain.exponentialRampToValueAtTime(1e-3, o + 0.38), f.connect(c).connect(this.#n), f.start(o), f.stop(o + 0.39), this.#d(0.32, u === "tartarus" ? 600 : 1200, 0.25);
    }
    playPortalWarp(l = "infinite") {
      if (!this.#s() || !this.#e || !this.#n || this.#a) return;
      const o = this.#e.currentTime, u = Sn(l), f = this.#e.createOscillator(), c = this.#e.createGain();
      f.type = "sine";
      const h = u === "tartarus" ? 280 : u === "hell" ? 360 : 520, m = u === "tartarus" ? 760 : u === "hell" ? 920 : 1240;
      f.frequency.setValueAtTime(h, o), f.frequency.exponentialRampToValueAtTime(m, o + 0.16), c.gain.setValueAtTime(0.14, o), c.gain.exponentialRampToValueAtTime(1e-3, o + 0.18), f.connect(c).connect(this.#n), f.start(o), f.stop(o + 0.19);
    }
    playDeflect(l = "infinite") {
      if (!this.#s() || !this.#e || !this.#n || this.#a) return;
      const o = performance.now();
      if (o - this.#m < 45) return;
      this.#m = o;
      const u = this.#e.currentTime, f = Sn(l), c = this.#e.createOscillator(), h = this.#e.createGain();
      c.type = "sine";
      const m = f === "tartarus" ? 240 : f === "hell" ? 320 : 720;
      c.frequency.setValueAtTime(m, u), c.frequency.exponentialRampToValueAtTime(m * 0.55, u + 0.06), h.gain.setValueAtTime(0.08, u), h.gain.exponentialRampToValueAtTime(1e-3, u + 0.065), c.connect(h).connect(this.#n), c.start(u), c.stop(u + 0.07);
    }
    playOverlordSpell(l = "hell") {
      if (!this.#s() || !this.#e || !this.#n || this.#a) return;
      const o = this.#e.currentTime, u = l === "tartarus" ? 92.5 : 116.54;
      [u, u * 1.414].forEach((f) => {
        if (!this.#e || !this.#n) return;
        const c = this.#e.createOscillator(), h = this.#e.createGain();
        c.type = "sawtooth", c.frequency.setValueAtTime(f, o), c.frequency.linearRampToValueAtTime(f * 0.85, o + 0.45), h.gain.setValueAtTime(0.12, o), h.gain.exponentialRampToValueAtTime(1e-3, o + 0.48), c.connect(h).connect(this.#n), c.start(o), c.stop(o + 0.5);
      });
    }
    playPurchase() {
      if (!this.#s() || !this.#e || !this.#n || this.#a) return;
      const l = this.#e.currentTime;
      [523.25, 783.99, 1046.5].forEach((o, u) => {
        if (!this.#e || !this.#n) return;
        const f = this.#e.createOscillator(), c = this.#e.createGain();
        f.type = "triangle", f.frequency.setValueAtTime(o, l + u * 0.045), c.gain.setValueAtTime(0.14, l + u * 0.045), c.gain.exponentialRampToValueAtTime(1e-3, l + u * 0.045 + 0.14), f.connect(c).connect(this.#n), f.start(l + u * 0.045), f.stop(l + u * 0.045 + 0.15);
      });
    }
    playTurnSkipStinger() {
      if (!this.#s() || !this.#e || !this.#n || this.#a) return;
      const l = this.#e.currentTime, o = this.#e.createOscillator(), u = this.#e.createGain();
      o.type = "sawtooth", o.frequency.setValueAtTime(190, l), o.frequency.exponentialRampToValueAtTime(42, l + 0.55), u.gain.setValueAtTime(0.32, l), u.gain.exponentialRampToValueAtTime(1e-3, l + 0.58), o.connect(u).connect(this.#n), o.start(l), o.stop(l + 0.6);
    }
    playGameOver(l = "infinite") {
      if (!this.#s() || !this.#e || !this.#n || this.#a) return;
      const o = this.#e.currentTime, u = Sn(l);
      (u === "tartarus" ? [146.83, 138.59, 110, 73.42] : u === "hell" ? [196, 174.61, 146.83, 98] : [392, 349.23, 329.63, 261.63]).forEach((f, c) => {
        if (!this.#e || !this.#n) return;
        const h = this.#e.createOscillator(), m = this.#e.createGain();
        h.type = u === "tartarus" || u === "hell" ? "sawtooth" : "triangle", h.frequency.setValueAtTime(f, o + c * 0.13), m.gain.setValueAtTime(0.16, o + c * 0.13), m.gain.exponentialRampToValueAtTime(1e-3, o + c * 0.13 + 0.24), h.connect(m).connect(this.#n), h.start(o + c * 0.13), h.stop(o + c * 0.13 + 0.26);
      });
    }
    playVictory() {
      if (!this.#s() || !this.#e || !this.#n || this.#a) return;
      const l = this.#e.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((o, u) => {
        if (!this.#e || !this.#n) return;
        const f = this.#e.createOscillator(), c = this.#e.createGain();
        f.type = "triangle", f.frequency.setValueAtTime(o, l + u * 0.08), c.gain.setValueAtTime(0.18, l + u * 0.08), c.gain.exponentialRampToValueAtTime(1e-3, l + u * 0.08 + 0.28), f.connect(c).connect(this.#n), f.start(l + u * 0.08), f.stop(l + u * 0.08 + 0.3);
      });
    }
    playApparitionWhisper() {
      if (!this.#s() || !this.#e || !this.#n || this.#a) return;
      const l = this.#e.currentTime, o = this.#e.createOscillator(), u = this.#e.createGain();
      o.type = "triangle", o.frequency.setValueAtTime(466.16, l), o.frequency.linearRampToValueAtTime(440, l + 0.7), u.gain.setValueAtTime(1e-3, l), u.gain.linearRampToValueAtTime(0.055, l + 0.2), u.gain.exponentialRampToValueAtTime(1e-3, l + 0.75), o.connect(u).connect(this.#n), o.start(l), o.stop(l + 0.78);
    }
  };
  function xc(l, o, u) {
    return Math.max(o, Math.min(u, l));
  }
  var Mm = new Map(yc.map((l) => [l.type, l.symbol]));
  function Lm(l, o) {
    const { state: u, fx: f, skipFlashAlpha: c, aimPath: h, shownAngleDeg: m } = o;
    l.clearRect(0, 0, B.W, B.H);
    const x = u.runMode === "hell", k = u.runMode === "tartarus", P = at(u.runMode);
    l.save(), l.fillStyle = k ? "rgba(18, 4, 8, 0.85)" : x ? "rgba(42, 8, 8, 0.85)" : "rgba(255, 255, 255, 0.72)", l.fillRect(0, 0, B.W, B.TL), l.restore(), l.strokeStyle = k ? "#7f1d1d" : x ? "#741d1d" : "#171717", l.lineWidth = 2.5, l.beginPath(), l.moveTo(0, B.TL), l.lineTo(B.W, B.TL), l.moveTo(0, B.BL), l.lineTo(B.W, B.BL), l.stroke(), l.fillStyle = k ? "#f8fafc" : x ? "#fed7d7" : "#171717", l.font = "800 20px Poppins, system-ui, sans-serif", l.textAlign = "left", l.textBaseline = "middle", l.fillText(`Level ${u.level}`, 18, 41), l.textAlign = "center", l.fillStyle = k ? "#f87171" : x ? "#fc8181" : "#2b6cb0", l.font = "700 15px Poppins, system-ui, sans-serif";
    const F = Hn[u.runMode]?.label || "Infinite";
    if (l.fillText(`${F.toUpperCase()} \xB7 ${u.difficulty.toUpperCase()}`, B.W / 2, 41), l.textAlign = "right", l.fillStyle = k ? "#fbbf24" : x ? "#f6e05e" : "#b7791f", l.font = "800 20px Poppins, system-ui, sans-serif", l.fillText(`Balls ${u.ballCount}`, B.W - 18, 41), k && !u.turnInProgress && !u.brickMoving && !u.paused && !u.over && !u.complete) {
      const y = Math.max(0, Number(u.turnTimeRemaining) || 0), I = xc(y / B.TURN_LIMIT_SEC, 0, 1);
      l.save(), l.fillStyle = "rgba(20, 5, 10, 0.85)", l.fillRect(0, B.TL + 2, B.W, 10), l.fillStyle = y < 2.5 ? "#ef4444" : "#991b1b", l.fillRect(0, B.TL + 2, B.W * I, 10), l.font = "800 14px Poppins, system-ui, sans-serif", l.textAlign = "right", l.fillStyle = y < 2.5 ? "#ef4444" : "#fca5a5", l.fillText(`SHOOT IN: ${y.toFixed(1)}s`, B.W - 18, B.BL + 22), l.restore();
    }
    const j = u.bricks.filter((y) => y.type === "shield");
    for (const y of j) l.save(), l.beginPath(), l.arc(y.x + y.w / 2, y.y + y.h / 2, 150, 0, Math.PI * 2), l.fillStyle = P ? "rgba(155, 44, 44, 0.15)" : "rgba(49, 151, 149, 0.12)", l.fill(), l.strokeStyle = P ? "rgba(252, 129, 129, 0.4)" : "rgba(49, 151, 149, 0.4)", l.setLineDash([4, 4]), l.stroke(), l.restore();
    for (const y of u.bricks) Pm(l, y, j);
    for (const y of u.bonusBalls) y.hit || (l.save(), l.beginPath(), l.fillStyle = k ? "#a855f7" : x ? "#ff6b6b" : "#22c55e", l.arc(y.x, y.y, y.r, 0, Math.PI * 2), l.fill(), l.lineWidth = 2.5, l.strokeStyle = "#ffffff", l.stroke(), l.fillStyle = "#ffffff", l.font = "800 13px Poppins, system-ui, sans-serif", l.textAlign = "center", l.textBaseline = "middle", l.fillText("+", y.x, y.y + 0.5), l.restore());
    for (const y of u.balls) y.moving && y.delay > 0 || (l.save(), l.beginPath(), l.fillStyle = y.shocking ? "#dd6b20" : k ? "#f1f5f9" : x ? "#fc8181" : u.buffs.doubleDamageTurns > 0 ? "#e53e3e" : "#3b82f6", l.arc(y.x, y.y, y.radius || 16, 0, Math.PI * 2), l.fill(), l.lineWidth = 1.5, l.strokeStyle = P ? "rgba(255,255,255,0.45)" : "rgba(15,23,42,0.35)", l.stroke(), l.beginPath(), l.fillStyle = "rgba(255,255,255,0.42)", l.arc(y.x - 4.5, y.y - 4.5, Math.max(3, (y.radius || 16) * 0.28), 0, Math.PI * 2), l.fill(), l.restore());
    if (!u.turnInProgress && !u.brickMoving && !u.paused && !u.over && !u.complete) {
      if (l.save(), l.strokeStyle = k ? "#ef4444" : x ? "#feb2b2" : "#475569", l.lineWidth = 2.2, l.setLineDash([5, 7]), l.beginPath(), h.length > 0) {
        l.moveTo(h[0].x, h[0].y);
        for (let y = 1; y < h.length; y++) l.lineTo(h[y].x, h[y].y);
      }
      l.stroke(), l.setLineDash([]), l.fillStyle = P ? "#f8fafc" : "#1e293b", l.font = '700 14px "JetBrains Mono", monospace', l.textAlign = "left", l.textBaseline = "middle", l.fillText(`Aim: ${m.toFixed(1)}\xB0`, 18, B.BL + 22), l.restore();
    }
    if (!u.over && !u.complete) {
      const y = u.turnInProgress ? u.balls.filter((Se) => Se.moving && Se.delay > 0).length : u.ballCount, I = u.turnInProgress ? `Balls Left to Fire: ${y} / ${u.ballCount}` : `Balls Left to Fire: ${y}`, q = xc(u.anchorX, 135, B.W - 135), te = B.H - 22;
      l.save(), l.font = "700 14px Poppins, system-ui, sans-serif";
      const ae = l.measureText(I).width + 28, Y = 30;
      l.fillStyle = k ? "rgba(30, 8, 12, 0.94)" : x ? "rgba(58, 12, 12, 0.92)" : "rgba(239, 246, 255, 0.96)", l.strokeStyle = k ? "#991b1b" : x ? "#b91c1c" : "#60a5fa", l.lineWidth = 1.8, l.beginPath(), l.roundRect ? l.roundRect(q - ae / 2, te - Y / 2, ae, Y, 8) : l.rect(q - ae / 2, te - Y / 2, ae, Y), l.fill(), l.stroke(), l.textAlign = "center", l.textBaseline = "middle", l.fillStyle = k ? "#fecaca" : x ? "#fee2e2" : "#1e3a8a", l.fillText(I, q, te + 0.5), l.restore();
    }
    if (c > 0 && (l.save(), l.fillStyle = `rgba(220, 38, 38, ${c})`, l.fillRect(0, 0, B.W, B.H), l.fillStyle = "#ffffff", l.font = "800 32px Poppins, system-ui, sans-serif", l.textAlign = "center", l.textBaseline = "middle", l.fillText("TURN SKIPPED!", B.W / 2, B.H / 2), l.restore()), u.paused && !u.over && !u.complete && (l.fillStyle = k ? "rgba(0, 0, 0, 0.85)" : x ? "rgba(45, 10, 10, 0.9)" : "rgba(0, 0, 0, 0.35)", l.fillRect(0, 0, B.W, B.H), l.fillStyle = "#ffffff", l.textAlign = "center", l.textBaseline = "middle", l.font = "800 30px Poppins, system-ui, sans-serif", l.fillText("PAUSED", B.W / 2, B.H / 2)), u.over || u.complete) {
      l.fillStyle = k ? "rgba(5, 0, 2, 0.94)" : x ? "rgba(45, 10, 10, 0.95)" : "rgba(0, 0, 0, 0.68)", l.fillRect(0, B.H / 2 - 100, B.W, 200), l.fillStyle = k ? "#ef4444" : "#ffffff", l.textAlign = "center", l.textBaseline = "middle", l.font = "800 34px Poppins, system-ui, sans-serif";
      const y = u.complete ? `SPEEDRUN ${u.target} CLEAR!` : k ? "CLAIMED BY TARTARUS" : x ? "HELL CONSUMED YOU" : "GAME OVER";
      l.fillText(y, B.W / 2, B.H / 2 - 18), l.fillStyle = "#ffffff", l.font = '600 20px "JetBrains Mono", monospace', l.fillText(u.complete ? `${cn(u.elapsedMs)} [${u.difficulty.toUpperCase()}]` : `Level ${u.level}`, B.W / 2, B.H / 2 + 32);
    }
    for (const y of f) l.save(), y.type === "particle" ? (l.globalAlpha = Math.min(1, y.life / 50), l.fillStyle = y.color, l.fillRect(y.x, y.y, y.size, y.size)) : (l.globalAlpha = Math.min(1, y.life / 18), l.beginPath(), l.arc(y.x, y.y, y.radius, 0, Math.PI * 2), l.fillStyle = "rgba(255, 69, 0, 0.25)", l.strokeStyle = "#ffd700", l.lineWidth = 4, l.fill(), l.stroke()), l.restore();
  }
  function Pm(l, o, u) {
    l.save();
    const f = (Math.sin(Date.now() / 120) + 1) / 2;
    (o.type !== "shield" && o.type !== "titan" && u.some((j) => Math.hypot(j.x + j.w / 2 - (o.x + o.w / 2), j.y + j.h / 2 - (o.y + o.h / 2)) <= 150) || o.type === "phase" && o.phase === "liquid") && (l.globalAlpha = 0.45);
    const c = o.type === "titan" ? 14 : 10;
    l.fillStyle = vm(o.type, o.value), l.beginPath(), l.roundRect ? l.roundRect(o.x, o.y, o.w, o.h, c) : l.rect(o.x, o.y, o.w, o.h), l.fill(), l.save(), l.clip();
    const h = l.createLinearGradient(o.x, o.y, o.x, o.y + o.h);
    if (h.addColorStop(0, "rgba(255, 255, 255, 0.24)"), h.addColorStop(0.35, "rgba(255, 255, 255, 0.03)"), h.addColorStop(1, "rgba(0, 0, 0, 0.18)"), l.fillStyle = h, l.fillRect(o.x, o.y, o.w, o.h), l.fillStyle = "rgba(255, 255, 255, 0.22)", l.fillRect(o.x + 6, o.y + 3, o.w - 12, 3), o.type === "magnet") {
      l.strokeStyle = "rgba(107, 70, 193, 0.35)", l.lineWidth = 1.6;
      const j = o.x + o.w / 2, y = o.y + o.h / 2;
      for (const I of [16, 28, 40]) l.beginPath(), l.arc(j, y, I, 0, Math.PI * 2), l.stroke();
    } else if (o.type === "tnt") {
      l.strokeStyle = "rgba(0, 0, 0, 0.18)", l.lineWidth = 6;
      for (let j = -o.h; j < o.w + o.h; j += 22) l.beginPath(), l.moveTo(o.x + j, o.y + o.h), l.lineTo(o.x + j + o.h, o.y), l.stroke();
    } else if (o.type === "tank") {
      l.fillStyle = "rgba(255, 255, 255, 0.22)";
      for (const [j, y] of [[o.x + 9, o.y + o.h - 9], [o.x + o.w - 9, o.y + 9], [o.x + o.w - 9, o.y + o.h - 9]]) l.beginPath(), l.arc(j, y, 2.5, 0, Math.PI * 2), l.fill();
    }
    l.restore(), l.lineWidth = 2, l.setLineDash([]);
    const m = { ammo: ["#ffffff", 2.2, []], portal: ["#e9d8fd", 3.5, [3, 5]], teleport: ["#90cdf4", 3, []], slider: ["#e0fbfc", 3, []], shock: ["#ffc078", 3.5, [6, 4]], shield: ["#81e6d9", 3.5, []], parent: ["#f6ad55", 3, []], healer: ["#68d391", 3, []], tank: ["#1a202c", 4, []], angel: ["#fbb6ce", 3, [2, 2]], turret: ["#cbd5e0", 3, []], phase: ["#9edebe", 3, []], magnet: ["#805ad5", 3, [4, 4]], devil: ["#ff4d4d", 4, []] };
    if (l.beginPath(), l.roundRect ? l.roundRect(o.x, o.y, o.w, o.h, c) : l.rect(o.x, o.y, o.w, o.h), o.type === "titan") l.lineWidth = 4 + f * 2, l.strokeStyle = "#ef4444", l.stroke(), l.lineWidth = 1.5, l.strokeStyle = "rgba(251, 191, 36, 0.55)", l.strokeRect(o.x + 8, o.y + 8, o.w - 16, o.h - 16);
    else if (o.type === "tnt") l.lineWidth = 3 + f * 2.5, l.strokeStyle = `rgb(255, ${Math.floor(100 + f * 155)}, 100)`, l.setLineDash([8, 6]), l.stroke();
    else if (o.type === "crawler") l.strokeStyle = "#ff8533", l.lineWidth = 3 + f * 2, l.setLineDash([4, 2]), l.stroke();
    else if (o.type === "directional") {
      l.strokeStyle = "#e2e8f0", l.lineWidth = 3, l.stroke();
      const j = { top: "#ffd166", bottom: "#38bdf8", left: "#c084fc", right: "#f472b6" };
      for (const y of o.allowedDirs || ["top", "bottom"]) l.strokeStyle = j[y] || "#ffd166", l.lineWidth = 5, l.beginPath(), y === "top" ? (l.moveTo(o.x + 6, o.y + 2), l.lineTo(o.x + o.w - 6, o.y + 2)) : y === "bottom" ? (l.moveTo(o.x + 6, o.y + o.h - 2), l.lineTo(o.x + o.w - 6, o.y + o.h - 2)) : y === "left" ? (l.moveTo(o.x + 2, o.y + 6), l.lineTo(o.x + 2, o.y + o.h - 6)) : y === "right" && (l.moveTo(o.x + o.w - 2, o.y + 6), l.lineTo(o.x + o.w - 2, o.y + o.h - 6)), l.stroke();
    } else if (m[o.type]) {
      const [j, y, I] = m[o.type];
      l.strokeStyle = j, l.lineWidth = y, l.setLineDash(I), l.stroke();
    } else l.strokeStyle = "#171717", l.lineWidth = 2, l.stroke();
    l.setLineDash([]);
    const x = o.x + o.w / 2, k = o.y + o.h / 2;
    if (o.type !== "normal") {
      const j = Mm.get(o.type) || "";
      j && (l.fillStyle = o.type === "magnet" ? "#4c1d95" : "rgba(255,255,255,0.94)", l.font = o.type === "titan" ? "700 18px Poppins, system-ui, sans-serif" : "700 13px Poppins, system-ui, sans-serif", l.textAlign = "left", l.textBaseline = "top", l.fillText(j, o.x + 8, o.y + 6));
    }
    const P = Math.ceil(o.value).toString(), F = k + (o.type !== "normal" ? 4 : 0);
    l.font = o.type === "titan" ? "800 32px Poppins, system-ui, sans-serif" : "800 22px Poppins, system-ui, sans-serif", l.textAlign = "center", l.textBaseline = "middle", l.lineJoin = "round", l.lineWidth = o.type === "titan" ? 4.5 : 3.5, l.strokeStyle = o.type === "magnet" ? "rgba(67, 29, 130, 0.85)" : "rgba(0, 0, 0, 0.45)", l.strokeText(P, x, F), l.shadowColor = "rgba(0,0,0,0.45)", l.shadowBlur = 4, l.fillStyle = "#ffffff", l.fillText(P, x, F), l.restore();
  }
  function Rm(l = 0) {
    const o = [66, 114, 105, 99, 107, 66, 49, 52];
    let u = (3477846030 ^ (l + 27) * 73244475) >>> 0;
    const f = new Uint8Array(32);
    for (let c = 0; c < 32; c++) u = Math.imul(u ^ u >>> 15, 739982445) >>> 0, u = Math.imul(u ^ u >>> 12, 695872825) >>> 0, u = (u ^ u >>> 15) >>> 0, f[c] = u & 255 ^ o[c & 7] ^ c * 17 & 255;
    return f;
  }
  function Bm(l, o = 2166136261) {
    let u = o >>> 0;
    for (let f = 0; f < l.length; f++) u ^= l.charCodeAt(f), u = Math.imul(u, 16777619) >>> 0;
    return u.toString(16).padStart(8, "0");
  }
  function kc(l, o = 0) {
    try {
      if (!l || typeof l != "string") return null;
      const u = atob(l), f = new Uint8Array(u.length);
      for (let k = 0; k < u.length; k++) f[k] = u.charCodeAt(k);
      const c = Rm(o), h = new Uint8Array(f.length);
      let m = (o ^ 165) & 255;
      for (let k = 0; k < f.length; k++) {
        const P = c[k & 31] ^ m;
        h[k] = f[k] ^ P, m = f[k] + m + 13 & 255;
      }
      const x = JSON.parse(new TextDecoder().decode(h));
      return !x || typeof x.p != "string" || typeof x.s != "string" || Bm(`${x.p}:${o}`) !== x.s ? null : JSON.parse(x.p);
    } catch {
      return null;
    }
  }
  var zm = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]);
  function dn(l, o) {
    return l >>> o | l << 32 - o;
  }
  function Ul(l, o) {
    return l << o | l >>> 32 - o;
  }
  function Hr(l) {
    const o = Math.floor(l.length * 8 / 4294967296), u = l.length * 8 >>> 0, f = Math.ceil((l.length + 9) / 64) * 64, c = new Uint8Array(f);
    c.set(l), c[l.length] = 128;
    const h = new DataView(c.buffer);
    h.setUint32(f - 8, o, !1), h.setUint32(f - 4, u, !1);
    let m = 1779033703, x = 3144134277, k = 1013904242, P = 2773480762, F = 1359893119, j = 2600822924, y = 528734635, I = 1541459225;
    const q = new Uint32Array(64);
    for (let Y = 0; Y < f; Y += 64) {
      for (let he = 0; he < 16; he++) q[he] = h.getUint32(Y + he * 4, !1);
      for (let he = 16; he < 64; he++) {
        const qe = dn(q[he - 15], 7) ^ dn(q[he - 15], 18) ^ q[he - 15] >>> 3, Fe = dn(q[he - 2], 17) ^ dn(q[he - 2], 19) ^ q[he - 2] >>> 10;
        q[he] = q[he - 16] + qe + q[he - 7] + Fe >>> 0;
      }
      let Se = m, ze = x, tt = k, lt = P, Ue = F, He = j, se = y, de = I;
      for (let he = 0; he < 64; he++) {
        const qe = dn(Ue, 6) ^ dn(Ue, 11) ^ dn(Ue, 25), Fe = Ue & He ^ ~Ue & se, nt = de + qe + Fe + zm[he] + q[he] >>> 0, vt = (dn(Se, 2) ^ dn(Se, 13) ^ dn(Se, 22)) + (Se & ze ^ Se & tt ^ ze & tt) >>> 0;
        de = se, se = He, He = Ue, Ue = lt + nt >>> 0, lt = tt, tt = ze, ze = Se, Se = nt + vt >>> 0;
      }
      m = m + Se >>> 0, x = x + ze >>> 0, k = k + tt >>> 0, P = P + lt >>> 0, F = F + Ue >>> 0, j = j + He >>> 0, y = y + se >>> 0, I = I + de >>> 0;
    }
    const te = new Uint8Array(32), ae = new DataView(te.buffer);
    return ae.setUint32(0, m, !1), ae.setUint32(4, x, !1), ae.setUint32(8, k, !1), ae.setUint32(12, P, !1), ae.setUint32(16, F, !1), ae.setUint32(20, j, !1), ae.setUint32(24, y, !1), ae.setUint32(28, I, !1), te;
  }
  function Ht(...l) {
    let o = 0;
    for (const c of l) o += c.length;
    const u = new Uint8Array(o);
    let f = 0;
    for (const c of l) u.set(c, f), f += c.length;
    return u;
  }
  function qr(l, o) {
    const u = l.length > 64 ? Hr(l) : l, f = new Uint8Array(64), c = new Uint8Array(64);
    for (let h = 0; h < 64; h++) {
      const m = h < u.length ? u[h] : 0;
      f[h] = m ^ 54, c[h] = m ^ 92;
    }
    return Hr(Ht(c, Hr(Ht(f, o))));
  }
  function qn(l, o, u, f, c) {
    l[o] = l[o] + l[u] >>> 0, l[c] = Ul(l[c] ^ l[o], 16), l[f] = l[f] + l[c] >>> 0, l[u] = Ul(l[u] ^ l[f], 12), l[o] = l[o] + l[u] >>> 0, l[c] = Ul(l[c] ^ l[o], 8), l[f] = l[f] + l[c] >>> 0, l[u] = Ul(l[u] ^ l[f], 7);
  }
  function Wr(l, o, u) {
    const f = new DataView(l.buffer, l.byteOffset, 32), c = new DataView(o.buffer, o.byteOffset, 12), h = new Uint8Array(u.length), m = new Uint32Array(16);
    m[0] = 1634760805, m[1] = 857760878, m[2] = 2036477234, m[3] = 1797285236;
    for (let F = 0; F < 8; F++) m[4 + F] = f.getUint32(F * 4, !0);
    m[13] = c.getUint32(0, !0), m[14] = c.getUint32(4, !0), m[15] = c.getUint32(8, !0);
    const x = new Uint32Array(16), k = new Uint8Array(64), P = new DataView(k.buffer);
    for (let F = 0; F * 64 < u.length; F++) {
      m[12] = F + 1 >>> 0, x.set(m);
      for (let I = 0; I < 10; I++) qn(x, 0, 4, 8, 12), qn(x, 1, 5, 9, 13), qn(x, 2, 6, 10, 14), qn(x, 3, 7, 11, 15), qn(x, 0, 5, 10, 15), qn(x, 1, 6, 11, 12), qn(x, 2, 7, 8, 13), qn(x, 3, 4, 9, 14);
      for (let I = 0; I < 16; I++) P.setUint32(I * 4, x[I] + m[I] >>> 0, !0);
      const j = F * 64, y = Math.min(64, u.length - j);
      for (let I = 0; I < y; I++) h[j + I] = u[j + I] ^ k[I];
    }
    return h;
  }
  function xo(l) {
    const o = new Uint8Array(l);
    if (typeof crypto < "u" && typeof crypto.getRandomValues == "function") return crypto.getRandomValues(o), o;
    let u = (Date.now() ^ Math.floor(Math.random() * 4294967295)) >>> 0;
    for (let f = 0; f < l; f++) u = Math.imul(u ^ u >>> 15, 2246822507) >>> 0, o[f] = (u ^ Math.floor(Math.random() * 256)) & 255;
    return o;
  }
  function Il(l) {
    let o = "";
    for (let u = 0; u < l.length; u += 16384) o += String.fromCharCode(...l.subarray(u, Math.min(u + 16384, l.length)));
    return btoa(o);
  }
  function Dl(l) {
    try {
      const o = atob(l), u = new Uint8Array(o.length);
      for (let f = 0; f < o.length; f++) u[f] = o.charCodeAt(f);
      return u;
    } catch {
      return null;
    }
  }
  function Um(l) {
    let o = "";
    for (let u = 0; u < l.length; u++) o += l[u].toString(16).padStart(2, "0");
    return o;
  }
  function Im(l) {
    if (!l || l.length % 2 !== 0 || !/^[0-9a-fA-F]+$/.test(l)) return null;
    const o = new Uint8Array(l.length / 2);
    for (let u = 0; u < o.length; u++) o[u] = parseInt(l.slice(u * 2, u * 2 + 2), 16);
    return o;
  }
  function Dm() {
    const l = [66, 49, 52, 95, 84, 97, 114, 116], o = [97, 114, 117, 115, 95, 86, 97, 117], u = [108, 116, 95, 75, 101, 121, 33, 57], f = new Uint8Array([...l, ...o, ...u]);
    for (let c = 0; c < f.length; c++) f[c] ^= c * 29 + 90 & 255;
    return Hr(f);
  }
  function Qr(l, o) {
    const u = Dm(), f = new TextEncoder();
    return { encKey: Hr(Ht(f.encode(`bb14:enc:${l}:`), u, o)), macKey: Hr(Ht(f.encode(`bb14:mac:${l}:`), u, o)) };
  }
  function ko(l, o) {
    if (l.length !== o.length) return !1;
    let u = 0;
    for (let f = 0; f < l.length; f++) u |= l[f] ^ o[f];
    return u === 0;
  }
  function wc(l, o) {
    const u = new TextEncoder(), f = u.encode(JSON.stringify(l)), c = xo(16), { encKey: h, macKey: m } = Qr(o, c), x = Wr(h, c.subarray(0, 12), f), k = qr(m, Ht(u.encode(`BB14|${o}|14|`), c, x));
    return { format: "BB14_ENCRYPTED_BACKUP", version: 14, scope: o, cipher: "ChaCha20-HMAC-SHA256", nonce: Il(c), payload: Il(x), mac: Um(k) };
  }
  function Sc(l, o) {
    try {
      if (!l || typeof l != "object") return null;
      const u = l;
      if (u.format !== "BB14_ENCRYPTED_BACKUP" || u.version !== 14 || u.scope !== o || u.cipher !== "ChaCha20-HMAC-SHA256" || typeof u.nonce != "string" || typeof u.payload != "string" || typeof u.mac != "string") return null;
      const f = Dl(u.nonce), c = Dl(u.payload), h = Im(u.mac);
      if (!f || f.length !== 16 || !c || !h || h.length !== 32) return null;
      const m = new TextEncoder(), { encKey: x, macKey: k } = Qr(o, f);
      if (!ko(h, qr(k, Ht(m.encode(`BB14|${o}|14|`), f, c)))) return null;
      const P = Wr(x, f.subarray(0, 12), c);
      return JSON.parse(new TextDecoder().decode(P));
    } catch {
      return null;
    }
  }
  function Fm(l) {
    const o = new TextEncoder(), u = o.encode(JSON.stringify(l)), f = xo(16), { encKey: c, macKey: h } = Qr("save_code", f), m = Wr(c, f.subarray(0, 12), u);
    return `BB14E1:${Il(Ht(f, qr(h, Ht(o.encode("BB14|save_code|14|"), f, m)), m))}`;
  }
  function Vm(l) {
    try {
      const o = (l || "").trim();
      if (!o) return null;
      if (o.startsWith("BB14E1:")) {
        const u = Dl(o.slice(7));
        if (!u || u.length < 49) return null;
        const f = u.subarray(0, 16), c = u.subarray(16, 48), h = u.subarray(48), m = new TextEncoder(), { encKey: x, macKey: k } = Qr("save_code", f);
        if (!ko(c, qr(k, Ht(m.encode("BB14|save_code|14|"), f, h)))) return null;
        const P = Wr(x, f.subarray(0, 12), h);
        return JSON.parse(new TextDecoder().decode(P));
      }
      return kc(o, 777);
    } catch {
      return null;
    }
  }
  var Fl = class {
    #e = 0;
    #n = 0;
    #t = 0;
    #r;
    #a;
    #o;
    constructor(l = 0) {
      this.#r = (Math.random() * 8388607 | 4951) >>> 0, this.#a = (Math.random() * 5 | 0) + 3, this.#o = (Math.random() * 8e3 | 0) + 1337, this.set(l);
    }
    set(l) {
      const o = Number(l), u = Number.isFinite(o) ? Math.max(0, Math.min(2147483647, Math.trunc(o))) : 0;
      this.#e = u, this.#n = (u ^ this.#r) >>> 0, this.#t = u * this.#a + this.#o;
    }
    get() {
      const l = this.#e, o = (this.#n ^ this.#r) >>> 0, u = (this.#t - this.#o) / this.#a;
      if (l === o && o === u && Number.isInteger(l) && l >= 0) return l;
      const f = Math.min(Number.isFinite(l) ? Math.max(0, Math.trunc(l)) : 0, Number.isFinite(o) ? Math.max(0, Math.trunc(o)) : 0, Number.isFinite(u) ? Math.max(0, Math.trunc(u)) : 0);
      return this.set(f), f;
    }
  }, Om = class {
    #e = 0;
    setSlot(l) {
      this.#e = Math.max(0, Math.min(B.SLOTS - 1, Math.trunc(Number(l) || 0)));
    }
    getSlot() {
      return this.#e;
    }
    #n(l, o = this.#e) {
      return `${B.NS}s${o}_${l}`;
    }
    #t(l, o, u = 1) {
      try {
        const f = localStorage.getItem(l);
        if (!f) return o;
        if (f.startsWith("BB14LS:")) {
          const h = Dl(f.slice(7));
          if (!h || h.length < 49) return o;
          const m = h.subarray(0, 16), x = h.subarray(16, 48), k = h.subarray(48), P = `ls:${l}:${u}`, F = new TextEncoder(), { encKey: j, macKey: y } = Qr(P, m);
          if (!ko(x, qr(y, Ht(F.encode(`BB14LS|${l}|${u}|`), m, k)))) return o;
          const I = Wr(j, m.subarray(0, 12), k);
          return JSON.parse(new TextDecoder().decode(I));
        }
        const c = kc(f, u);
        return c !== null ? c : o;
      } catch {
        return o;
      }
    }
    #r(l, o, u = 1) {
      try {
        const f = new TextEncoder(), c = f.encode(JSON.stringify(o)), h = xo(16), { encKey: m, macKey: x } = Qr(`ls:${l}:${u}`, h), k = Wr(m, h.subarray(0, 12), c), P = qr(x, Ht(f.encode(`BB14LS|${l}|${u}|`), h, k));
        return localStorage.setItem(l, `BB14LS:${Il(Ht(h, P, k))}`), !0;
      } catch {
        return !1;
      }
    }
    getAccount() {
      const l = this.#t(B.ACC, null, 99), o = l?.emblem && bo.includes(l.emblem) ? l.emblem : "cubes";
      return { name: l?.name && typeof l.name == "string" && l.name.trim() ? l.name.trim().slice(0, 24) : "Player 1", emblem: o };
    }
    saveAccount(l) {
      this.#r(B.ACC, { name: (l.name || "Player 1").trim().slice(0, 24) || "Player 1", emblem: bo.includes(l.emblem) ? l.emblem : "cubes" }, 99);
    }
    getUnlockedAchievements() {
      const l = this.#t(B.ACH, {}, 77);
      return l && typeof l == "object" ? l : {};
    }
    unlockAchievement(l) {
      const o = this.getUnlockedAchievements();
      return o[l] ? !1 : (o[l] = Date.now(), this.#r(B.ACH, o, 77), !0);
    }
    replaceAchievements(l) {
      const o = new Set(zl.map((f) => f.id)), u = {};
      for (const [f, c] of Object.entries(l || {})) o.has(f) && Number.isFinite(Number(c)) && Number(c) > 0 && (u[f] = Math.trunc(Number(c)));
      this.#r(B.ACH, u, 77);
    }
    #a(l) {
      const o = bc(), u = l?.permUpgrades || o.permUpgrades;
      return { coins: Math.max(0, Math.trunc(Number(l?.coins) || 0)), gems: Math.max(0, Math.trunc(Number(l?.gems) || 0)), permUpgrades: { startAmmo: Math.max(0, Math.min(10, Math.trunc(Number(u.startAmmo) || 0))), critChance: Math.max(0, Math.min(10, Math.trunc(Number(u.critChance) || 0))), ballSpeed: Math.max(0, Math.min(5, Math.trunc(Number(u.ballSpeed) || 0))), luck: Math.max(0, Math.min(5, Math.trunc(Number(u.luck) || 0))) } };
    }
    getMeta(l = this.#e) {
      const o = this.#t(this.#n("meta", l), bc(), l + 10);
      return this.#a(o);
    }
    saveMeta(l, o = this.#e) {
      this.#r(this.#n("meta", o), this.#a(l), o + 10);
    }
    getRun(l = this.#e) {
      return this.#t(this.#n("run", l), null, l + 20);
    }
    saveRun(l, o = this.#e) {
      this.#r(this.#n("run", o), l, o + 20);
    }
    clearRun(l = this.#e) {
      try {
        localStorage.removeItem(this.#n("run", l));
      } catch {
      }
    }
    getScores(l = this.#e) {
      const o = this.#t(this.#n("scores", l), [], l + 30);
      return Array.isArray(o) ? o : [];
    }
    saveScores(l, o = this.#e) {
      this.#r(this.#n("scores", o), l, o + 30);
    }
    addScore(l, o = "Infinite") {
      if (!Number.isFinite(l) || l < 1) return;
      const u = this.getScores();
      u.push({ score: Math.floor(l), mode: o, date: (/* @__PURE__ */ new Date()).toLocaleDateString(void 0, { month: "short", day: "numeric", year: "2-digit" }) }), u.sort((f, c) => c.score - f.score), this.saveScores(u.slice(0, 100));
    }
    getModeRecords(l = this.#e) {
      const o = this.#t(this.#n("modes", l), { infinite: 1, hell: 1, tartarus: 1 }, l + 40);
      return { infinite: Number(o.infinite) || 1, hell: Number(o.hell) || 1, tartarus: Number(o.tartarus) || 1 };
    }
    saveModeRecords(l, o = this.#e) {
      this.#r(this.#n("modes", o), l, o + 40);
    }
    recordInfinite(l, o = "infinite") {
      const u = this.getModeRecords();
      u[o] = Math.max(Number(u[o]) || 1, l), this.saveModeRecords(u);
    }
    getSpeedrunRecords(l = this.#e) {
      const o = this.#t(this.#n("sr", l), {}, l + 50);
      for (const u of B.SR) {
        const f = `speedrun_${u}`;
        o[f] || (o[f] = {});
        for (const c of B.DF) o[f][c] || (o[f][c] = { bestMs: null, clears: 0 }), Number.isFinite(o[f][c].bestMs) || (o[f][c].bestMs = null), o[f][c].clears = Number(o[f][c].clears) || 0;
      }
      return o;
    }
    saveSpeedrunRecords(l, o = this.#e) {
      this.#r(this.#n("sr", o), l, o + 50);
    }
    recordSpeedrun(l, o, u) {
      const f = this.getSpeedrunRecords();
      if (!f[l]) return;
      f[l][o] || (f[l][o] = { bestMs: null, clears: 0 });
      const c = Math.max(0, Math.round(u)), h = f[l][o].bestMs;
      f[l][o].bestMs = h === null ? c : Math.min(h, c), f[l][o].clears++, this.saveSpeedrunRecords(f);
    }
    getStats(l = this.#e) {
      const o = this.#t(this.#n("stats", l), null, l + 60);
      if (o && typeof o == "object") {
        const u = vo();
        return { ...u, ...o, bricksByType: { ...u.bricksByType, ...o.bricksByType || {} } };
      }
      return vo();
    }
    saveStats(l, o = this.#e) {
      this.#r(this.#n("stats", o), l, o + 60);
    }
    getTas(l = this.#e) {
      const o = this.#t(this.#n("tas", l), {}, l + 70);
      return o && typeof o == "object" ? o : {};
    }
    saveTas(l, o = this.#e) {
      this.#r(this.#n("tas", o), l, o + 70);
    }
    isSlotOccupied(l) {
      const o = this.getRun(l), u = this.getMeta(l), f = this.getStats(l), c = this.getModeRecords(l);
      return !!(o && o.state || u.coins > 0 || u.gems > 0 || Object.values(u.permUpgrades).some((h) => h > 0) || f.bricksBroken > 0 || c.infinite > 1 || c.hell > 1 || c.tartarus > 1);
    }
    wipeSlot(l) {
      ["meta", "run", "scores", "modes", "sr", "stats", "tas"].forEach((o) => {
        try {
          localStorage.removeItem(this.#n(o, l));
        } catch {
        }
      });
    }
    wipeAllAccountData() {
      for (let l = 0; l < B.SLOTS; l++) this.wipeSlot(l);
      try {
        localStorage.removeItem(B.ACC), localStorage.removeItem(B.ACH);
      } catch {
      }
      this.#e = 0;
    }
    exportSlotBundle(l = this.#e) {
      return { version: 14, slot: l, meta: this.getMeta(l), scores: this.getScores(l), modeRecords: this.getModeRecords(l), speedrunRecords: this.getSpeedrunRecords(l), stats: this.getStats(l), tas: this.getTas(l), game: this.getRun(l) };
    }
    importSlotBundle(l, o = this.#e) {
      if (!l || !l.meta && !l.game && !l.state) throw new Error("Invalid slot payload");
      if (this.wipeSlot(o), l.meta && this.saveMeta(this.#a(l.meta), o), Array.isArray(l.scores)) {
        const f = l.scores.filter((c) => c && Number.isFinite(Number(c.score)) && Number(c.score) >= 1).slice(0, 100).map((c) => ({ score: Math.trunc(Number(c.score)), mode: String(c.mode || "Infinite").slice(0, 32), date: String(c.date || "").slice(0, 24) }));
        this.saveScores(f, o);
      }
      if (l.modeRecords && this.saveModeRecords({ infinite: Math.max(1, Math.trunc(Number(l.modeRecords.infinite) || 1)), hell: Math.max(1, Math.trunc(Number(l.modeRecords.hell) || 1)), tartarus: Math.max(1, Math.trunc(Number(l.modeRecords.tartarus) || 1)) }, o), l.speedrunRecords && this.saveSpeedrunRecords(l.speedrunRecords, o), l.stats && typeof l.stats == "object") {
        const f = vo(), c = { ballsFired: Math.max(0, Math.trunc(Number(l.stats.ballsFired) || 0)), turnsSurvived: Math.max(0, Math.trunc(Number(l.stats.turnsSurvived) || 0)), gemsEarned: Math.max(0, Math.trunc(Number(l.stats.gemsEarned) || 0)), coinsEarned: Math.max(0, Math.trunc(Number(l.stats.coinsEarned) || 0)), damageDealt: Math.max(0, Number(l.stats.damageDealt) || 0), bricksBroken: Math.max(0, Math.trunc(Number(l.stats.bricksBroken) || 0)), maxLevel: Math.max(1, Math.trunc(Number(l.stats.maxLevel) || 1)), bricksByType: { ...f.bricksByType } };
        for (const h of B.BTP) c.bricksByType[h] = Math.max(0, Math.trunc(Number(l.stats.bricksByType?.[h]) || 0));
        this.saveStats(c, o);
      }
      l.tas && typeof l.tas == "object" && this.saveTas(l.tas, o);
      const u = l.game || (l.state ? l : null);
      u && u.state && Array.isArray(u.bricks) && this.saveRun(u, o);
    }
    evaluateAchievements(l) {
      const o = this.getModeRecords(), u = this.getSpeedrunRecords(), f = [];
      for (const c of zl) c.get(l, o, u) >= c.target && this.unlockAchievement(c.id) && f.push(c.name);
      return f;
    }
  }, bt = (l, o) => Math.floor(Math.random() * (o - l + 1)) + l, Nn = (l, o, u) => Math.max(o, Math.min(u, l));
  function wo(l) {
    const o = l.slice();
    for (let u = o.length - 1; u > 0; u--) {
      const f = Math.floor(Math.random() * (u + 1));
      [o[u], o[f]] = [o[f], o[u]];
    }
    return o;
  }
  function So(l, o) {
    return l !== o && l.x < o.x + o.w && l.x + l.w > o.x && l.y < o.y + o.h && l.y + l.h > o.y;
  }
  function Da(l, o) {
    return { x: l, y: o, vx: 0, vy: 0, moving: !1, downing: !1, shocking: !1, delay: 0, radius: 16 };
  }
  var Hm = class {
    #e = null;
    #n = null;
    #t = null;
    #r;
    #a;
    #o = [];
    #i = { x: B.W / 2, y: 400 };
    #u = null;
    #h = !1;
    #m = 0;
    #s = 0;
    #y = 0;
    #c = 0;
    #d = 0;
    #C = !1;
    #f = { lastElapsed: 0, segment: 0 };
    #S = new Fl(1);
    #b = new Fl(0);
    #v = new Fl(0);
    #x = new Fl(1);
    #l;
    constructor(l) {
      this.vault = new Om(), this.audio = new Em(), this.#l = l, this.#r = this.vault.getStats(0), this.#a = this.vault.getTas(0);
    }
    attachCanvas(l) {
      this.#e = l, this.#n = l ? l.getContext("2d") : null;
    }
    startLoop() {
      if (this.#d) return;
      const l = (o) => {
        this.#K(o), this.#d = requestAnimationFrame(l);
      };
      this.#d = requestAnimationFrame(l);
    }
    stopLoop() {
      this.#d && (cancelAnimationFrame(this.#d), this.#d = 0), this.audio.stopBgm();
    }
    setGameScreenVisible(l) {
      this.#C = l;
    }
    getState() {
      return this.#t;
    }
    getStats() {
      return this.#r;
    }
    getTas() {
      return this.#a;
    }
    setPointerPosition(l, o) {
      if (!this.#e) return;
      const u = this.#e.getBoundingClientRect();
      !u.width || !u.height || (this.#i.x = (l - u.left) * B.W / u.width, this.#i.y = (o - u.top) * B.H / u.height);
    }
    setManualAngle(l, o) {
      this.#u = l, this.#h = o;
    }
    elapsedMs() {
      if (!this.#t) return 0;
      let l = Number(this.#t.elapsedMs) || 0;
      return !this.#t.paused && this.#t.runStartedAt && (l += Date.now() - this.#t.runStartedAt), Math.max(0, l);
    }
    getAnalysis() {
      const l = this.#t;
      if (!l) return null;
      const o = this.#L() * 180 / Math.PI, u = this.#h && this.#u !== null && Number.isFinite(this.#u) ? this.#u : o, f = u * Math.PI / 180, c = Math.cos(f), h = Math.sin(f), m = 11 * (at(l.runMode) ? 1 : 1 + (Number(l.permUpgrades.ballSpeed) || 0) * 0.1), x = Math.abs(h) < 1e-3 ? 1e-3 : h, k = B.BL - 20, P = Math.max(0, (B.BT - k) / (x * m));
      return { mouseAngleDeg: o, selectedAngleDeg: u, vx: c, vy: h, speed: m, framesToTop: P, horizontalTravel: c * m * P, anchorX: l.anchorX, anchorY: k };
    }
    getTasSummary() {
      const l = this.#t;
      if (!l || !l.runMode.startsWith("speedrun_")) return { visible: !1, currentTotalMs: 0, bestSegmentTotalMs: 0, rows: [] };
      const o = this.#z(), u = this.elapsedMs(), f = [];
      let c = 0;
      for (let h = 0; h < Math.max(o.splits.length, o.bestSegments.length); h++) {
        const m = Number(o.splits[h]) || 0, x = Number(o.bestSegments[h]) || 0;
        if (x > 0 && (c += x), !m && !x) continue;
        const k = m - x, P = Math.abs(k) ? `${k > 0 ? "+" : k < 0 ? "-" : "\xB1"}${cn(Math.abs(k))}` : "\xB10.00";
        f.push({ turn: h + 1, splitMs: m, deltaMs: k, deltaLabel: P, faster: k < 0, slower: k > 0 });
      }
      return { visible: !0, currentTotalMs: u, bestSegmentTotalMs: c, rows: f };
    }
    activateSlot(l) {
      this.vault.setSlot(l), this.#r = this.vault.getStats(l), this.#a = this.vault.getTas(l);
      const o = this.vault.getRun(l);
      return o && o.state && !o.state.over && !o.state.complete ? (this.#D(o), this.#t && (this.#t.paused = !1, this.#t.runStartedAt = Date.now(), this.#f.lastElapsed = this.#t.elapsedMs || 0, this.#f.segment = 0, this.#t.runMode === "tartarus" ? this.audio.startBgm() : this.audio.stopBgm()), this.#p(), this.#l.onUiSync(), "restored") : "needs_mode";
    }
    startNewRun(l, o, u) {
      this.vault.setSlot(l), this.#r = this.vault.getStats(l), this.#a = this.vault.getTas(l), this.vault.clearRun(l), this.#o = [], this.#l.onClearApparitions();
      const f = this.vault.getMeta(l), c = at(o) ? 1 : 1 + (Number(f.permUpgrades.startAmmo) || 0);
      this.#t = { runMode: o, target: Hn[o].target, level: 1, coins: f.coins, gems: f.gems, permUpgrades: { ...f.permUpgrades }, difficulty: u, ballCount: c, anchorX: B.W / 2, balls: Array.from({ length: c }, () => Da(B.W / 2, B.BL - 20)), bricks: [], bonusBalls: [], buffs: { doubleDamageTurns: 0 }, shopPurchases: { doubleDamage: 0, laserWipe: 0 }, pendingAmmo: 0, paused: !1, turnInProgress: !1, brickMoving: !1, over: !1, complete: !1, elapsedMs: 0, runStartedAt: Date.now(), turnTimeRemaining: B.TURN_LIMIT_SEC, bestLevel: 1, overlordTimer: 0, overlordDialogue: o === "tartarus" ? '"Abandon hope. Hesitate for 8 seconds and your turn is forfeit..."' : '"Mortal, your defiance amuses me..."' }, this.#S.set(1), this.#b.set(f.coins), this.#v.set(f.gems), this.#x.set(c), this.#f = { lastElapsed: 0, segment: 0 }, o === "tartarus" ? (this.audio.startBgm(), this.#l.onApparition()) : this.audio.stopBgm(), this.#P(!1), this.saveNow(), this.#l.onUiSync();
    }
    pauseRun() {
      !this.#t || this.#t.over || this.#t.complete || (this.#t.elapsedMs = this.elapsedMs(), this.#t.runStartedAt = null, this.#t.paused = !0, this.audio.stopBgm(), this.saveNow(), this.#l.onUiSync());
    }
    resumeRun() {
      !this.#t || this.#t.over || this.#t.complete || (this.#t.paused = !1, this.#t.runStartedAt = Date.now(), this.#t.runMode === "tartarus" && this.audio.startBgm(), this.saveNow(), this.#l.onUiSync());
    }
    resetAllAccountData() {
      this.audio.stopBgm(), this.vault.wipeAllAccountData(), this.#t = null, this.#o = [], this.#c = 0, this.#r = this.vault.getStats(0), this.#a = this.vault.getTas(0), this.#l.onClearApparitions(), this.#l.onUiSync();
    }
    setDifficulty(l) {
      !this.#t || this.#t.level > 1 || this.#t.over || this.#t.complete || (this.#t.difficulty = l, this.saveNow(), this.#l.onUiSync());
    }
    shoot(l = null) {
      const o = this.#t;
      if (!o || o.paused || o.brickMoving || o.over || o.complete || !this.#C || o.turnInProgress || o.balls.some((c) => c.moving)) return;
      o.turnInProgress = !0, this.audio.playShoot(o.runMode, !0);
      const u = this.#T(l), f = 11 * (at(o.runMode) ? 1 : 1 + (Number(o.permUpgrades.ballSpeed) || 0) * 0.1);
      o.balls = o.balls.slice(0, Math.max(1, o.ballCount)), o.balls.forEach((c, h) => {
        c.x = o.anchorX, c.y = B.BL - 20, c.vx = u.x * f, c.vy = u.y * f, c.moving = !0, c.downing = !1, c.shocking = !1, c.delay = h;
      }), this.#r.ballsFired += o.balls.length, this.vault.saveStats(this.#r), this.#p(), this.saveNow(), this.#l.onUiSync();
    }
    recallBalls() {
      const l = this.#t;
      if (!l || l.paused || l.over || l.complete) return;
      let o = !1;
      for (const u of l.balls) if (u.moving) {
        if (u.delay > 0) {
          u.moving = !1, u.downing = !1, u.shocking = !1, u.vx = 0, u.vy = 0, u.delay = 0, u.x = l.anchorX, u.y = B.BL - 20;
          continue;
        }
        u.downing = !0, u.vx = 0, u.vy = 12, o = !0;
      }
      !o && l.turnInProgress && l.balls.every((u) => !u.moving) && this.#j();
    }
    buyPermUpgrade(l) {
      const o = this.#t;
      if (!o || at(o.runMode)) return;
      const u = { startAmmo: { max: 10, base: 5 }, critChance: { max: 10, base: 6 }, ballSpeed: { max: 5, base: 8 }, luck: { max: 5, base: 10 } }[l], f = Number(o.permUpgrades[l]) || 0;
      if (f >= u.max) return;
      const c = Math.round(u.base * Math.pow(1.5, f));
      if (!(o.gems < c)) {
        if (this.#R(-c), o.permUpgrades[l] = f + 1, this.audio.playPurchase(), l === "startAmmo" && o.level === 1 && !o.balls.some((h) => h.moving)) {
          const h = o.ballCount, m = 1 + o.permUpgrades.startAmmo;
          o.ballCount = m, this.#x.set(m);
          for (let x = h; x < m; x++) o.balls.push(Da(o.anchorX, B.BL - 20));
        }
        this.#N(), this.saveNow(), this.#l.onUiSync();
      }
    }
    getTempBuffCost(l) {
      const o = this.#t?.shopPurchases?.[l] || 0;
      return Math.round(l === "doubleDamage" ? 30 * Math.pow(1.25, o) : 40 * Math.pow(1.3, o));
    }
    buyTempBuff(l) {
      const o = this.#t;
      if (!o || o.over || o.complete || at(o.runMode) || ["hard", "insane", "asian"].includes(o.difficulty)) return;
      const u = this.getTempBuffCost(l);
      if (l === "doubleDamage" && o.coins >= u) this.#k(-u), o.buffs.doubleDamageTurns += 3, o.shopPurchases.doubleDamage = (o.shopPurchases.doubleDamage || 0) + 1, this.audio.playPurchase();
      else if (l === "laserWipe" && o.coins >= u && o.bricks.length) {
        this.#k(-u), o.shopPurchases.laserWipe = (o.shopPurchases.laserWipe || 0) + 1, this.audio.playExplosion(o.runMode);
        const f = Math.max(...o.bricks.map((h) => h.y + h.h)), c = o.bricks.filter((h) => Math.abs(h.y + h.h - f) < 10);
        for (const h of c) this.#w(h);
      } else return;
      this.#N(), this.saveNow(), this.#l.onUiSync();
    }
    saveNow() {
      const l = this.#t;
      if (!l || l.over || l.complete) return;
      this.#M();
      const o = !l.paused;
      l.elapsedMs = this.elapsedMs();
      const u = { version: 14, savedAt: Date.now(), state: { runMode: l.runMode, level: l.level, coins: l.coins, gems: l.gems, permUpgrades: l.permUpgrades, difficulty: l.difficulty, ballCount: l.ballCount, anchorX: l.anchorX, buffs: l.buffs, shopPurchases: l.shopPurchases, pendingAmmo: l.pendingAmmo, paused: l.paused, turnInProgress: l.turnInProgress, brickMoving: l.brickMoving, over: l.over, complete: l.complete, elapsedMs: l.elapsedMs, turnTimeRemaining: l.turnTimeRemaining, bestLevel: l.bestLevel, overlordTimer: l.overlordTimer, overlordDialogue: l.overlordDialogue }, balls: l.balls.map((f) => ({ ...f })), bricks: l.bricks.map((f) => ({ ...f })), bonusBalls: l.bonusBalls.map((f) => ({ ...f })) };
      this.vault.saveRun(u), o && !document.hidden && (l.runStartedAt = Date.now());
    }
    #D(l) {
      const o = this.vault.getMeta(), u = l.state, f = Hn[u.runMode] ? u.runMode : "infinite", c = at(f), h = Math.max(1, Number(u.level) || 1), m = Math.max(0, Number(u.coins) || 0), x = Math.max(0, Number(u.gems) || 0), k = Math.max(1, Number(u.ballCount) || 1), P = Nn(Number(u.anchorX) || B.W / 2, 20, B.W - 20), F = (l.balls || []).map((j) => ({ ...Da(P, B.BL - 20), ...j }));
      this.#t = { runMode: f, target: Hn[f].target, level: h, coins: m, gems: x, permUpgrades: c ? { startAmmo: 0, critChance: 0, ballSpeed: 0, luck: 0 } : { startAmmo: Nn(Math.trunc(Number(u.permUpgrades?.startAmmo ?? o.permUpgrades.startAmmo) || 0), 0, 10), critChance: Nn(Math.trunc(Number(u.permUpgrades?.critChance ?? o.permUpgrades.critChance) || 0), 0, 10), ballSpeed: Nn(Math.trunc(Number(u.permUpgrades?.ballSpeed ?? o.permUpgrades.ballSpeed) || 0), 0, 5), luck: Nn(Math.trunc(Number(u.permUpgrades?.luck ?? o.permUpgrades.luck) || 0), 0, 5) }, difficulty: u.difficulty || "medium", ballCount: k, anchorX: P, balls: F.length ? F : Array.from({ length: k }, () => Da(P, B.BL - 20)), bricks: (l.bricks || []).map((j) => ({ ...j, targetY: Number.isFinite(j.targetY) ? j.targetY : j.y })), bonusBalls: (l.bonusBalls || []).map((j) => ({ ...j })), buffs: { doubleDamageTurns: Number(u.buffs?.doubleDamageTurns) || 0 }, shopPurchases: { doubleDamage: Number(u.shopPurchases?.doubleDamage) || 0, laserWipe: Number(u.shopPurchases?.laserWipe) || 0 }, pendingAmmo: Number(u.pendingAmmo) || 0, paused: !1, turnInProgress: !!u.turnInProgress || F.some((j) => j.moving), brickMoving: !!u.brickMoving, over: !1, complete: !1, elapsedMs: Math.max(0, Number(u.elapsedMs) || 0), runStartedAt: Date.now(), turnTimeRemaining: Number.isFinite(Number(u.turnTimeRemaining)) ? Nn(Number(u.turnTimeRemaining), 0.5, B.TURN_LIMIT_SEC) : B.TURN_LIMIT_SEC, bestLevel: Math.max(1, Number(u.bestLevel) || 1), overlordTimer: Number(u.overlordTimer) || 0, overlordDialogue: u.overlordDialogue || '"Mortal, your defiance amuses me..."' }, this.#S.set(h), this.#b.set(m), this.#v.set(x), this.#x.set(k);
    }
    #M() {
      this.#t && (this.#t.level = this.#S.get(), this.#t.coins = this.#b.get(), this.#t.gems = this.#v.get(), this.#t.ballCount = this.#x.get());
    }
    #T(l = null) {
      const o = this.#t, u = o ? o.anchorX : B.W / 2;
      let f, c;
      if (l !== null && Number.isFinite(l)) {
        const m = l * Math.PI / 180;
        f = Math.cos(m), c = Math.sin(m), c > -0.05 && (c = -0.05);
      } else {
        const m = Math.min(this.#i.y, B.BL - 80);
        f = this.#i.x - u, c = m - (B.BL - 20), c > -40 && (c = -40);
      }
      const h = Math.hypot(f, c) || 1;
      return { x: f / h, y: c / h };
    }
    #L() {
      const l = this.#T();
      return Math.atan2(l.y, l.x);
    }
    #F(l, o, u, f, c, h) {
      const m = c.x - h, x = c.x + c.w + h, k = c.y - h, P = c.y + c.h + h;
      let F = -1 / 0, j = 1 / 0, y = 0, I = 0;
      if (Math.abs(u) < 1e-9) {
        if (l < m || l > x) return null;
      } else {
        const q = (m - l) / u, te = (x - l) / u, ae = Math.min(q, te), Y = Math.max(q, te);
        ae > F && (F = ae, y = u > 0 ? -1 : 1, I = 0), j = Math.min(j, Y);
      }
      if (Math.abs(f) < 1e-9) {
        if (o < k || o > P) return null;
      } else {
        const q = (k - o) / f, te = (P - o) / f, ae = Math.min(q, te), Y = Math.max(q, te);
        ae > F && (F = ae, y = 0, I = f > 0 ? -1 : 1), j = Math.min(j, Y);
      }
      return j < F || j < 0 ? null : F < 0 ? { distance: j, normalX: -y, normalY: -I } : { distance: F, normalX: y, normalY: I };
    }
    #V(l = null) {
      if (!this.#t) return [];
      const o = 16;
      let u = this.#t.anchorX, f = B.BL - 20;
      const c = this.#T(l);
      let h = c.x, m = c.y;
      const x = [{ x: u, y: f }];
      for (let k = 0; k < 32; k++) {
        let P = 1 / 0, F = null, j = 0, y = 0;
        const I = [];
        h > 1e-9 ? I.push({ distance: (B.W - o - u) / h, normalX: -1, normalY: 0, type: "wall" }) : h < -1e-9 && I.push({ distance: (o - u) / h, normalX: 1, normalY: 0, type: "wall" }), m < -1e-9 && I.push({ distance: (B.BT + o - f) / m, normalX: 0, normalY: 1, type: "wall" });
        for (const q of I) q.distance > 0 && q.distance < P && (P = q.distance, F = q.type, j = q.normalX, y = q.normalY);
        for (const q of this.#t.bricks) {
          const te = this.#F(u, f, h, m, q, o);
          te && te.distance > 0 && te.distance < P && (P = te.distance, F = "brick", j = te.normalX, y = te.normalY);
        }
        if (!Number.isFinite(P) || P <= 0 || (u += h * P, f += m * P, x.push({ x: u, y: f }), F === "brick")) break;
        j !== 0 && (h *= -1), y !== 0 && (m *= -1), u += h * 0.05, f += m * 0.05;
      }
      return x;
    }
    #O() {
      switch (this.#t?.difficulty) {
        case "easy":
          return bt(1, 3);
        case "hard":
          return bt(1, 5);
        case "insane":
          return bt(3, 5);
        case "asian":
          return bt(4, 5);
        default:
          return bt(1, 4);
      }
    }
    #P(l) {
      const o = this.#t;
      if (!o) return;
      const u = this.#O(), f = wo([0, 1, 2, 3, 4, 5]).slice(0, u), c = B.BSY, h = l ? c - 80 : c, m = o.runMode === "hell", x = o.runMode === "tartarus", k = /* @__PURE__ */ new Set();
      if (x && o.level >= 2 && !o.bricks.some((F) => F.y < B.BSY + 155) && Math.random() < 0.34) {
        const F = bt(0, 4);
        k.add(F), k.add(F + 1);
        const j = Math.max(30, Math.round(o.level * 10 * 3));
        o.bricks.push({ x: F * 120 + 5, y: h, targetY: c, w: 230, h: 150, value: j, type: "titan", slideDir: 1, slideSpeed: 1 });
      }
      for (const F of f) {
        if (k.has(F)) continue;
        let j = "normal";
        if ((m || x) && Math.random() < 0.3) j = Math.random() < 0.62 ? "crawler" : "devil";
        else {
          const q = Math.random();
          let te = "common", ae = 0;
          for (const [Se, ze] of Object.entries(B.TC)) if (ae += ze, q <= ae) {
            te = Se;
            break;
          }
          const Y = B.BTI[te] || B.BTI.common;
          j = Y[Math.floor(Math.random() * Y.length)];
        }
        let y = o.level;
        j === "ammo" ? y = Math.round(y * 1.5) : j === "tank" ? y = Math.max(5, y * 5) : j === "angel" || j === "turret" ? y = 1 : ["crawler", "devil", "shield", "shock", "portal", "teleport", "parent", "healer", "directional", "phase", "magnet"].includes(j) && (y = Math.max(1, Math.round(y * 0.8))), m && (y = Math.max(1, Math.round(y * 2.5))), x && (y = Math.max(3, Math.round(y * 3)));
        const I = { x: F * 120 + 5, y: h, targetY: c, w: 110, h: 70, value: y, type: j, slideDir: Math.random() < 0.5 ? -1 : 1, slideSpeed: 1.5 + Math.random() };
        j === "directional" && (I.allowedDirs = wo(["top", "bottom", "left", "right"]).slice(0, 2)), j === "phase" && (I.phase = Math.random() < 0.5 ? "solid" : "liquid"), o.bricks.push(I);
      }
      const P = [0, 1, 2, 3, 4, 5].filter((F) => !f.includes(F) && !k.has(F));
      if (P.length && Math.random() < 0.75) {
        const F = P[Math.floor(Math.random() * P.length)];
        o.bonusBalls.push({ x: F * 120 + 60, y: h + 35, targetY: c + 35, r: 14, hit: !1 });
      }
      this.#g();
    }
    #g() {
      const l = this.#t;
      if (!l) return;
      const o = [];
      for (const u of l.bricks) {
        if (!o.some((h) => So(u, h))) {
          o.push(u);
          continue;
        }
        let f = !1;
        const c = u.w > 120 ? 4 : 5;
        for (let h = 0; h < 8 && !f; h++) for (let m = 0; m <= c && !f; m++) {
          const x = { ...u, x: m * 120 + 5, y: B.BSY + h * 80, targetY: B.BSY + h * 80 };
          o.some((k) => So(x, k)) || (u.x = x.x, u.y = x.y, u.targetY = x.targetY, o.push(u), f = !0);
        }
      }
      l.bricks = o;
    }
    #k(l) {
      const o = this.#t;
      if (!o) return;
      const u = Number(o.permUpgrades.luck) || 0, f = l > 0 ? Math.round(l * (1 + u * 0.2)) : l;
      l > 0 && (this.#r.coinsEarned += f);
      const c = Math.max(0, this.#b.get() + f);
      o.coins = c, this.#b.set(c), this.#N(), this.vault.saveStats(this.#r), this.#p();
    }
    #R(l) {
      const o = this.#t;
      if (!o || at(o.runMode)) return;
      l > 0 && (this.#r.gemsEarned += l);
      const u = Math.max(0, this.#v.get() + l);
      o.gems = u, this.#v.set(u), this.#N(), this.vault.saveStats(this.#r), this.#p();
    }
    #N() {
      const l = this.#t;
      !l || at(l.runMode) || this.vault.saveMeta({ coins: l.coins, gems: l.gems, permUpgrades: l.permUpgrades });
    }
    #p() {
      this.#t && (this.#r.maxLevel = Math.max(this.#r.maxLevel || 1, this.#t.level || 1));
      const l = this.vault.evaluateAchievements(this.#r);
      for (const o of l) this.#l.onToast(`Achievement Unlocked: ${o}!`, "medal");
    }
    #H() {
      const l = this.#t;
      !l || l.paused || l.over || l.complete || (this.audio.playTurnSkipStinger(), this.#c = 0.65, l.overlordDialogue = '"Too slow, mortal! Your hesitation costs you a turn!"', this.#l.onToast("TIME EXPIRED! Turn skipped!", "warn"), l.turnInProgress = !0, this.#j());
    }
    #q(l) {
      const o = this.#t;
      if (!o) return;
      let u = !1;
      for (const f of o.bricks) f.y < f.targetY ? f.y = Math.min(f.y + 10 * l, f.targetY) : f.y > f.targetY && (f.y = Math.max(f.y - 10 * l, f.targetY)), Math.abs(f.y - f.targetY) > 0.01 && (u = !0);
      if (at(o.runMode) && !o.turnInProgress && !o.brickMoving) for (const f of o.bricks) {
        if (f.type !== "crawler") continue;
        const c = f.y + 0.25 * l;
        o.bricks.some((h) => h !== f && f.x < h.x + h.w && f.x + f.w > h.x && c + f.h > h.y && f.y + f.h <= h.y + 5) || (f.y = c, f.targetY = c);
      }
      if (!o.brickMoving) for (const f of o.bricks) {
        if (f.type !== "slider") continue;
        const c = 5, h = B.W - 5 - f.w, m = f.x + f.slideDir * f.slideSpeed * l;
        if (m <= c) {
          f.x = c, f.slideDir = 1;
          continue;
        }
        if (m >= h) {
          f.x = h, f.slideDir = -1;
          continue;
        }
        let x = null;
        for (const k of o.bricks) if (k !== f && f.y < k.y + k.h && f.y + f.h > k.y && m < k.x + k.w && m + f.w > k.x) {
          x = k;
          break;
        }
        x ? f.slideDir > 0 ? (f.x = Math.max(c, x.x - f.w), f.slideDir = -1) : (f.x = Math.min(h, x.x + x.w), f.slideDir = 1) : f.x = m;
      }
      o.brickMoving && !u && (o.brickMoving = !1, o.bonusBalls = o.bonusBalls.filter((f) => !f.hit), this.#g(), this.saveNow(), this.#l.onUiSync());
    }
    #W(l) {
      const o = this.#t;
      if (o) for (const u of o.bonusBalls) Number.isFinite(u.targetY) || (u.targetY = u.y), u.y < u.targetY ? u.y = Math.min(u.y + 10 * l, u.targetY) : u.y > u.targetY && (u.y = Math.max(u.y - 10 * l, u.targetY));
    }
    #Q(l) {
      const o = this.#t;
      if (!o) return;
      const u = at(o.runMode) ? 1 : 1 + (Number(o.permUpgrades.ballSpeed) || 0) * 0.1, f = Math.max(1, Math.ceil(11 * u / 8)), c = o.bricks.filter((h) => h.type === "magnet");
      for (const h of o.balls) {
        if (!h.moving) continue;
        if (h.delay > 0) {
          const x = h.delay;
          h.delay -= l, x > 0 && h.delay <= 0 && this.audio.playShoot(o.runMode, !1);
          continue;
        }
        const m = l / f;
        for (let x = 0; x < f && h.moving; x++) {
          for (const k of c) {
            if (h.x >= k.x && h.x <= k.x + k.w && h.y >= k.y && h.y <= k.y + k.h) continue;
            const P = k.x + k.w / 2, F = k.y + k.h / 2, j = Math.hypot(P - h.x, F - h.y);
            j < 180 && j > 2 && (h.vx += (P - h.x) / j * 0.15 * m, h.vy += (F - h.y) / j * 0.15 * m);
          }
          h.x += h.vx * m, h.y += h.vy * m, h.x < h.radius ? (h.x = h.radius, h.vx = Math.abs(h.vx), this.audio.playWallBounce(o.runMode)) : h.x > B.W - h.radius && (h.x = B.W - h.radius, h.vx = -Math.abs(h.vx), this.audio.playWallBounce(o.runMode)), h.y < B.BT && (h.y = B.BT, h.vy = Math.abs(h.vy), this.audio.playWallBounce(o.runMode)), h.shocking ? (h.vx = 0, h.vy = 16) : h.downing || this.#G(h);
          for (const k of o.bonusBalls) !k.hit && Math.hypot(h.x - k.x, h.y - k.y) < h.radius + k.r && (k.hit = !0, this.audio.playBonusPickup(o.runMode));
          h.y >= B.BL - 20 && (h.y = B.BL - 20, h.moving = !1, h.downing = !1, h.shocking = !1, h.vx = 0, h.vy = 0, o.anchorX = h.x);
        }
      }
      o.turnInProgress && o.balls.length && o.balls.every((h) => !h.moving) && this.#j();
    }
    #G(l) {
      const o = this.#t;
      if (!o) return;
      const u = o.bricks.filter((f) => f.type === "shield");
      for (const f of [...o.bricks]) {
        if (!o.bricks.includes(f)) continue;
        const c = Nn(l.x, f.x, f.x + f.w), h = Nn(l.y, f.y, f.y + f.h), m = l.x - c, x = l.y - h, k = m * m + x * x;
        if (k > l.radius * l.radius || k < 1e-6) continue;
        const P = Math.sqrt(k), F = m / P, j = x / P, y = l.vx * F + l.vy * j;
        if (y >= 0) continue;
        const I = () => {
          const Y = l.radius - P + 0.25;
          l.x = Nn(l.x + F * Y, l.radius, B.W - l.radius), l.y = Math.max(B.BT, l.y + j * Y), Math.abs(m) > Math.abs(x) ? l.vx = Math.abs(l.vx) * (m >= 0 ? 1 : -1) : Math.abs(x) > Math.abs(m) ? l.vy = Math.abs(l.vy) * (x >= 0 ? 1 : -1) : (l.vx -= 2 * y * F, l.vy -= 2 * y * j);
        };
        if (f.type === "phase" && f.phase === "liquid") {
          I(), this.audio.playDeflect(o.runMode);
          break;
        }
        if (f.type !== "shield" && f.type !== "titan" && u.some((Y) => Math.hypot(Y.x + Y.w / 2 - (f.x + f.w / 2), Y.y + Y.h / 2 - (f.y + f.h / 2)) <= 150)) {
          I(), this.audio.playDeflect(o.runMode);
          break;
        }
        if (f.type === "directional" && f.allowedDirs) {
          const Y = Math.abs(m) > Math.abs(x) ? m > 0 ? "right" : "left" : x > 0 ? "bottom" : "top";
          if (!f.allowedDirs.includes(Y)) {
            I(), this.audio.playDeflect(o.runMode);
            break;
          }
        }
        let q = 1, te = !1;
        !at(o.runMode) && !["hard", "insane", "asian"].includes(o.difficulty) && o.buffs.doubleDamageTurns > 0 && (q = 1.5);
        const ae = at(o.runMode) ? 0 : Number(o.permUpgrades.critChance) || 0;
        ae && Math.random() < ae * 0.05 && (q *= 3, te = !0), f.value = Math.max(0, f.value - q), this.#r.damageDealt += q, f.type === "shock" ? (l.shocking = !0, l.vx = 0, l.vy = 16, this.audio.playPortalWarp(o.runMode), this.#A(l.x, l.y, "#dd6b20", 12, 8)) : f.type === "portal" ? (this.audio.playPortalWarp(o.runMode), this.#A(l.x, l.y, "#805ad5", 12, 6), l.x = bt(40, B.W - 40), l.y = bt(B.BSY + 120, B.BL - 120), this.#A(l.x, l.y, "#805ad5", 12, 6)) : I(), this.#k(1), f.value <= 0 ? this.#w(f) : this.audio.playBrickHit(o.runMode, te, f.type), this.vault.saveStats(this.#r);
        break;
      }
    }
    #w(l) {
      const o = this.#t;
      if (!o) return;
      const u = o.bricks.indexOf(l);
      if (u === -1) return;
      o.bricks.splice(u, 1), this.audio.playBrickBreak(o.runMode, l.type);
      const f = l.type === "titan" ? "#14091f" : l.type === "tnt" ? "#e53e3e" : "#38a169", c = l.type === "titan" ? 32 : 16;
      for (let h = 0; h < c; h++) this.#o.push({ type: "particle", x: l.x + Math.random() * l.w, y: l.y + Math.random() * l.h, vx: (Math.random() - 0.5) * 6, vy: Math.random() * -5 - 1, life: 45 + Math.random() * 25, color: l.type === "titan" && h % 2 === 0 ? "#ef4444" : f, size: 4 + Math.random() * 6 });
      if (this.#r.bricksBroken++, this.#r.bricksByType[l.type] = (this.#r.bricksByType[l.type] || 0) + 1, this.#k(l.type === "titan" ? 25 : 5), !at(o.runMode) && Math.random() < 0.25 && this.#R(1), l.type === "ammo" && o.pendingAmmo++, l.type === "parent") {
        const h = bt(1, 3), m = o.runMode === "tartarus" ? 3 : 1, x = Math.max(1, Math.round(o.level / 3 * m));
        for (let k = 0; k < h; k++) o.bricks.push({ x: bt(0, 5) * 120 + 5, y: l.y, targetY: l.targetY, w: 110, h: 70, value: x, type: "normal", slideDir: 1, slideSpeed: 1.5 });
        this.#g();
      }
      if (l.type === "tnt") {
        this.audio.playExplosion(o.runMode), this.#o.push({ type: "explosion", x: l.x + l.w / 2, y: l.y + l.h / 2, radius: 12, life: 18 });
        const h = [...o.bricks].filter((m) => Math.hypot(m.x + m.w / 2 - (l.x + l.w / 2), m.y + m.h / 2 - (l.y + l.h / 2)) <= 180);
        for (const m of h) {
          if (!o.bricks.includes(m)) continue;
          const x = Math.ceil(o.level * 0.8);
          m.value = Math.max(0, m.value - x), this.#r.damageDealt += x, m.value <= 0 && this.#w(m);
        }
      }
      this.vault.saveStats(this.#r), this.#p(), this.#l.onUiSync();
    }
    #Y() {
      const l = this.#t;
      if (!l) return;
      const o = l.runMode === "tartarus" ? 3 : 2.5;
      this.audio.playOverlordSpell(l.runMode);
      const u = [{ dialogue: '"Feel the scorching heat! Your bricks shall heal and harden!"', action: () => {
        for (const c of l.bricks) c.value = Math.round(c.value * 1.2 + 2);
      } }, { dialogue: '"Darkness multiplies! A Devil spawns from the abyss!"', action: () => {
        const c = Math.round(Math.max(1, Math.round(l.level * 0.8)) * o);
        l.bricks.push({ x: bt(0, 5) * 120 + 5, y: B.BSY, targetY: B.BSY, w: 110, h: 70, value: c, type: "devil", slideDir: 1, slideSpeed: 1.5 }), this.#g();
      } }, { dialogue: '"A crawler shall press upon your doom!"', action: () => {
        const c = Math.round(Math.max(1, Math.round(l.level * 0.8)) * o);
        l.bricks.push({ x: bt(0, 5) * 120 + 5, y: B.BSY, targetY: B.BSY, w: 110, h: 70, value: c, type: "crawler", slideDir: 1, slideSpeed: 1.5 }), this.#g();
      } }, { dialogue: '"Perish in sulfur! Your balls shall falter and slow!"', action: () => {
        for (const c of l.balls) {
          const h = Math.hypot(c.vx, c.vy);
          if (h > 4.2) {
            const m = Math.max(0.8, 4.2 / h);
            c.vx *= m, c.vy *= m;
          }
        }
      } }], f = u[Math.floor(Math.random() * u.length)];
      l.overlordDialogue = f.dialogue, f.action();
    }
    #J(l) {
      const o = this.#t;
      if (!o || o.bricks.filter((m) => m.type === "tank").length >= 3) return;
      const u = Math.max(1, Math.floor((l.y - B.BSY) / 80)), f = l.y - bt(1, u) * 80;
      if (f < B.BSY) return;
      const c = o.runMode === "tartarus" ? 15 : 12.5, h = { x: bt(0, 5) * 120 + 5, y: f, targetY: f, w: 110, h: 70, value: Math.max(5, Math.round(o.level * c)), type: "tank", slideDir: 1, slideSpeed: 1.5 };
      o.bricks.some((m) => So(h, m)) || o.bricks.push(h);
    }
    #j() {
      const l = this.#t;
      if (!l || !l.turnInProgress || l.paused || l.over || l.complete) return;
      if (l.turnInProgress = !1, l.brickMoving = !0, l.turnTimeRemaining = B.TURN_LIMIT_SEC, at(l.runMode)) {
        l.overlordTimer++, l.overlordTimer >= 2 && (l.overlordTimer = 0, this.#Y());
        for (const h of l.bricks.filter((m) => m.type === "devil")) this.#J(h);
      }
      !at(l.runMode) && !["hard", "insane", "asian"].includes(l.difficulty) && l.buffs.doubleDamageTurns > 0 && l.buffs.doubleDamageTurns--;
      const o = l.level + 1;
      l.level = o, this.#S.set(o), l.bestLevel = Math.max(Number(l.bestLevel) || 1, o), this.#r.turnsSurvived++, this.#r.maxLevel = Math.max(this.#r.maxLevel || 1, o), this.vault.saveStats(this.#r), this.#k(10);
      for (const h of l.bricks) h.targetY += 80, h.type === "phase" && (h.phase = h.phase === "solid" ? "liquid" : "solid");
      for (const h of l.bricks.filter((m) => m.type === "healer")) for (const m of l.bricks) m !== h && Math.hypot(h.x + h.w / 2 - (m.x + m.w / 2), h.y + h.h / 2 - (m.y + m.h / 2)) <= 180 && (m.value = Math.round(m.value * 1.25));
      for (const h of l.bricks.filter((m) => m.type === "angel")) {
        h.value = 1;
        for (const m of l.bricks) if (m !== h && Math.hypot(h.x + h.w / 2 - (m.x + m.w / 2), h.y + h.h / 2 - (m.y + m.h / 2)) <= 180) {
          const x = Math.max(1, Math.round(m.value * 0.25));
          m.value = Math.max(0, m.value - x), this.#r.damageDealt += x, m.value <= 0 && this.#w(m);
        }
      }
      for (const h of l.bricks.filter((m) => m.type === "turret")) {
        h.value = 1;
        for (const m of wo(l.bricks.filter((x) => x !== h)).slice(0, 3)) {
          const x = Math.max(1, Math.round(m.value * 0.25));
          m.value = Math.max(0, m.value - x), this.#r.damageDealt += x, m.value <= 0 && this.#w(m);
        }
      }
      for (const h of l.bricks.filter((m) => m.type === "teleport")) h.x = bt(0, 5) * 120 + 5, this.#A(h.x + h.w / 2, h.targetY + h.h / 2, "#805ad5", 12, 6);
      for (const h of l.bonusBalls) h.hit || (h.targetY = (Number.isFinite(h.targetY) ? h.targetY : h.y) + 80);
      const u = B.BL - 20;
      if (l.bricks.some((h) => h.targetY + h.h >= u || h.y + h.h >= u)) {
        this.#E(!1);
        return;
      }
      if (l.runMode === "infinite") this.vault.recordInfinite(l.level, "infinite");
      else if (l.runMode === "hell") this.vault.recordInfinite(l.level, "hell");
      else if (l.runMode === "tartarus") this.vault.recordInfinite(l.level, "tartarus");
      else if (l.target && l.level >= l.target) {
        this.#U(), this.#E(!0);
        return;
      }
      this.#U(), this.#p();
      const f = l.bonusBalls.filter((h) => h.hit).length;
      l.bonusBalls = l.bonusBalls.filter((h) => !h.hit);
      const c = f + l.pendingAmmo;
      if (l.pendingAmmo = 0, c > 0) {
        const h = l.ballCount + c;
        l.ballCount = h, this.#x.set(h);
      }
      l.balls = Array.from({ length: l.ballCount }, () => Da(l.anchorX, B.BL - 20)), this.#P(!0), this.#g(), this.saveNow(), this.#l.onUiSync();
    }
    #B() {
      return `${this.#t?.runMode || "infinite"}_${this.#t?.difficulty || "medium"}`;
    }
    #z() {
      const l = this.#B();
      return this.#a[l] || (this.#a[l] = { bestSegments: [], splits: [] }), Array.isArray(this.#a[l].bestSegments) || (this.#a[l].bestSegments = []), Array.isArray(this.#a[l].splits) || (this.#a[l].splits = []), this.#a[l];
    }
    #U() {
      const l = this.#t;
      if (!l || !l.runMode.startsWith("speedrun_")) return;
      const o = this.#z(), u = this.elapsedMs(), f = this.#f.segment || 0, c = Math.max(0, u - (this.#f.lastElapsed || 0));
      o.splits[f] = c, (!Number.isFinite(o.bestSegments[f]) || c < o.bestSegments[f]) && (o.bestSegments[f] = c), this.#a[this.#B()] = o, this.#f.segment = f + 1, this.#f.lastElapsed = u, this.vault.saveTas(this.#a);
    }
    #A(l, o, u, f, c) {
      for (let h = 0; h < f; h++) this.#o.push({ type: "particle", x: l, y: o, vx: (Math.random() - 0.5) * c, vy: (Math.random() - 0.5) * c, life: 22 + Math.random() * 15, color: u, size: 5 });
    }
    #I(l) {
      this.#c > 0 && (this.#c = Math.max(0, this.#c - 0.025 * l));
      for (const o of this.#o) o.life -= l, o.type === "particle" ? (o.x += o.vx * l, o.y += o.vy * l, o.vy += 0.15 * l) : o.radius += 7 * l;
      this.#o = this.#o.filter((o) => o.life > 0);
    }
    #E(l) {
      const o = this.#t;
      !o || o.over || o.complete || (o.elapsedMs = this.elapsedMs(), o.runStartedAt = null, o.paused = !0, o.turnInProgress = !1, o.brickMoving = !1, this.audio.stopBgm(), l ? (o.complete = !0, this.audio.playVictory(), this.vault.recordSpeedrun(o.runMode, o.difficulty, o.elapsedMs), this.vault.clearRun()) : (o.over = !0, this.audio.playGameOver(o.runMode), o.runMode === "infinite" ? this.vault.addScore(o.level, "Infinite") : o.runMode === "hell" ? this.vault.addScore(o.level, "Hell Mode") : o.runMode === "tartarus" && this.vault.addScore(o.level, "Tartarus"), this.vault.clearRun()), this.#p(), this.#l.onUiSync());
    }
    #K(l) {
      const o = this.#m ? Math.min((l - this.#m) / 16.67, 2) : 1;
      this.#m = l;
      const u = this.#t;
      if (u) {
        if (this.#n) {
          const f = this.#h && this.#u !== null && Number.isFinite(this.#u) ? this.#u : null, c = f !== null ? f : this.#L() * 180 / Math.PI;
          Lm(this.#n, { state: u, fx: this.#o, skipFlashAlpha: this.#c, aimPath: this.#V(f), shownAngleDeg: c });
        }
        !u.paused && !u.over && !u.complete && this.#C ? (this.#M(), this.#q(o), this.#W(o), this.#Q(o), this.#I(o), u.runMode === "tartarus" && (this.#y += o, this.#y >= 165 && (this.#y = 0, Math.random() < 0.85 && (this.audio.playApparitionWhisper(), this.#l.onApparition())), !u.turnInProgress && !u.brickMoving && (u.turnTimeRemaining = Math.max(0, (Number(u.turnTimeRemaining) || 0) - o / 60), u.turnTimeRemaining <= 0 && this.#H())), u.bricks.some((f) => Math.max(f.y, f.targetY) + f.h >= B.BL - 20) && this.#E(!1), this.#s += o, this.#s >= 60 && (this.#s = 0, this.saveNow()), this.#l.onUiSync()) : this.#I(o);
      }
    }
  }, qm = ({ variant: l }) => l === 0 ? (0, d.jsxs)("svg", { viewBox: "0 0 120 140", className: "w-full h-auto", children: [(0, d.jsx)("path", { d: "M60 10 C32 10 18 34 18 65 C18 96 12 124 22 132 C34 122 44 134 60 126 C76 134 86 122 98 132 C108 124 102 96 102 65 C102 34 88 10 60 10 Z", fill: "rgba(22, 4, 9, 0.92)", stroke: "rgba(220, 38, 38, 0.65)", strokeWidth: "2.5" }), (0, d.jsx)("ellipse", { cx: "44", cy: "56", rx: "7", ry: "10", fill: "#ef4444" }), (0, d.jsx)("ellipse", { cx: "76", cy: "56", rx: "7", ry: "10", fill: "#ef4444" }), (0, d.jsx)("path", { d: "M44 88 Q60 102 76 88 Q60 76 44 88 Z", fill: "#991b1b" })] }) : l === 1 ? (0, d.jsxs)("svg", { viewBox: "0 0 120 120", className: "w-full h-auto", children: [(0, d.jsx)("circle", { cx: "60", cy: "60", r: "46", fill: "rgba(12, 2, 6, 0.92)", stroke: "#b91c1c", strokeWidth: "2.5" }), (0, d.jsx)("path", { d: "M26 30 L48 48 M94 30 L72 48", stroke: "#ef4444", strokeWidth: "4", strokeLinecap: "round" }), (0, d.jsx)("circle", { cx: "44", cy: "58", r: "6", fill: "#fca5a5" }), (0, d.jsx)("circle", { cx: "76", cy: "58", r: "6", fill: "#fca5a5" }), (0, d.jsx)("path", { d: "M36 82 L48 74 L60 84 L72 74 L84 82", stroke: "#dc2626", strokeWidth: "3.5", fill: "none" })] }) : (0, d.jsxs)("svg", { viewBox: "0 0 120 140", className: "w-full h-auto", children: [(0, d.jsx)("path", { d: "M30 22 L44 6 L60 20 L76 6 L90 22 L98 78 L80 128 L60 112 L40 128 L22 78 Z", fill: "rgba(18, 3, 7, 0.9)", stroke: "#ef4444", strokeWidth: "2" }), (0, d.jsx)("polygon", { points: "40,56 54,62 42,68", fill: "#ef4444" }), (0, d.jsx)("polygon", { points: "80,56 66,62 78,68", fill: "#ef4444" }), (0, d.jsx)("line", { x1: "42", y1: "92", x2: "78", y2: "92", stroke: "#fca5a5", strokeWidth: "3" })] });
  function Wm() {
    const [, l] = (0, oe.useState)(0), [o, u] = (0, oe.useState)("home"), [f, c] = (0, oe.useState)(null), [h, m] = (0, oe.useState)(!1), [x, k] = (0, oe.useState)(null), [P, F] = (0, oe.useState)([]), [j, y] = (0, oe.useState)(""), [I, q] = (0, oe.useState)(null), [te, ae] = (0, oe.useState)({ slot: 0, mode: "infinite", difficulty: "medium", message: "Select a mode and difficulty for this save file:" }), [Y, Se] = (0, oe.useState)("general"), [ze, tt] = (0, oe.useState)("speedrun_25"), [lt, Ue] = (0, oe.useState)("easy"), [He, se] = (0, oe.useState)("-90.0"), [de, he] = (0, oe.useState)(!1), qe = (0, oe.useRef)(null), Fe = (0, oe.useRef)(0), nt = (0, oe.useRef)(null), vt = (0, oe.useRef)(1), Ne = (0, oe.useCallback)((E, Z = "info") => {
      const Ce = vt.current++;
      k({ id: Ce, msg: E, kind: Z }), nt.current && clearTimeout(nt.current), nt.current = setTimeout(() => {
        k((fe) => fe && fe.id === Ce ? null : fe);
      }, 3400);
    }, []), D = (0, oe.useCallback)(() => {
      const E = vt.current++, Z = 3.8 + Math.random() * 2.2, Ce = { id: E, topPct: 6 + Math.random() * 76, leftPct: 4 + Math.random() * 82, width: 90 + Math.round(Math.random() * 70), rot: Math.round((Math.random() - 0.5) * 24), dur: Z, peak: 0.45 + Math.random() * 0.35, variant: E % 3 };
      F((fe) => [...fe.slice(-5), Ce]), setTimeout(() => {
        F((fe) => fe.filter((We) => We.id !== E));
      }, Z * 1e3 + 200);
    }, []), ne = (0, oe.useCallback)(() => {
      F([]);
    }, []), [M] = (0, oe.useState)(() => new Hm({ onUiSync: () => {
      const E = performance.now();
      E - Fe.current >= 45 && (Fe.current = E, l((Z) => (Z + 1) % 1e6));
    }, onToast: (E, Z = "info") => Ne(E, Z), onApparition: () => D(), onClearApparitions: () => ne() })), _ = (0, oe.useCallback)(() => {
      l((E) => (E + 1) % 1e6);
    }, []), X = M.getState(), je = o === "game" && X?.runMode === "hell", Pe = o === "game" && X?.runMode === "tartarus", Ve = at(X?.runMode), dt = o === "game" && (f === "pause" || !!(X?.paused && !X?.over && !X?.complete));
    (0, oe.useEffect)(() => (M.startLoop(), () => {
      M.stopLoop();
    }), [M]), (0, oe.useEffect)(() => {
      M.setGameScreenVisible(o === "game"), o === "game" && qe.current ? M.attachCanvas(qe.current) : M.attachCanvas(null);
    }, [o, M]), (0, oe.useEffect)(() => (document.body.classList.toggle("hell-mode", je), document.body.classList.toggle("tartarus-mode", Pe), document.body.classList.toggle("game-paused", dt), () => {
      document.body.classList.remove("hell-mode", "tartarus-mode", "game-paused");
    }), [je, Pe, dt]);
    const b = M.getAnalysis();
    (0, oe.useEffect)(() => {
      !de && b && se(b.mouseAngleDeg.toFixed(1));
    }, [b?.mouseAngleDeg, de]);
    const U = (0, oe.useCallback)(() => {
      if (o !== "game") return;
      const E = M.getState();
      !E || E.over || E.complete || (M.pauseRun(), c("pause"), _());
    }, [o, M, _]), Q = (0, oe.useCallback)(() => {
      M.resumeRun(), c(null), _();
    }, [M, _]);
    (0, oe.useEffect)(() => {
      const E = (Z) => {
        if (o !== "game") return;
        const Ce = Z.target?.tagName;
        if (!(Ce === "INPUT" || Ce === "TEXTAREA" || Ce === "SELECT") && (Z.key === "Escape" || Z.key === "p" || Z.key === "P")) {
          if (I) {
            q(null);
            return;
          }
          if (f === "pause") Z.preventDefault(), Q();
          else if (f) Z.preventDefault(), c(null);
          else {
            const fe = M.getState();
            fe && !fe.over && !fe.complete && (Z.preventDefault(), U());
          }
        }
      };
      return window.addEventListener("keydown", E), () => window.removeEventListener("keydown", E);
    }, [o, f, I, M, U, Q]), (0, oe.useEffect)(() => {
      const E = () => {
        o === "game" && M.saveNow();
      }, Z = () => {
        document.hidden && o === "game" && M.saveNow();
      };
      return window.addEventListener("beforeunload", E), document.addEventListener("visibilitychange", Z), () => {
        window.removeEventListener("beforeunload", E), document.removeEventListener("visibilitychange", Z);
      };
    }, [o, M]);
    const z = () => {
      const E = M.audio.toggleMute();
      m(E);
    }, K = (E) => {
      if (M.activateSlot(E) === "restored") u("game"), c(null), _();
      else {
        const Z = M.getState();
        ae({ slot: E, mode: Z?.runMode || "infinite", difficulty: Z?.difficulty || "medium", message: `File ${E + 1} is ready for a new run. Pick a mode & difficulty:` }), c("modeSelect");
      }
    }, $ = (E) => {
      ae({ slot: E, mode: "infinite", difficulty: "medium", message: `Starting File ${E + 1}. Choose a mode & difficulty:` }), c("modeSelect");
    }, re = (E, Z) => {
      const Ce = o === "game" ? M.vault.getSlot() : te.slot;
      M.startNewRun(Ce, E, Z), c(null), u("game"), _();
    }, H = (E) => {
      q({ title: `Delete File ${E + 1}?`, message: `This will permanently delete all saved runs, coins, gems, and records in File ${E + 1}.`, onConfirm: () => {
        M.vault.wipeSlot(E), o === "game" && M.vault.getSlot() === E && (M.audio.stopBgm(), c(null), u("saveSelect")), Ne(`File ${E + 1} deleted.`, "info"), _();
      } });
    }, O = () => {
      const E = M.vault.getSlot(), Z = M.getState();
      c("modeSelect"), ae({ slot: E, mode: Z?.runMode || "infinite", difficulty: Z?.difficulty || "medium", message: `Choose a mode & difficulty to start a fresh run in File ${E + 1}:` });
    }, le = () => {
      M.saveNow(), M.audio.stopBgm(), c(null), u("saveSelect"), _();
    }, st = () => {
      o === "game" && M.saveNow(), M.audio.stopBgm(), c(null), u("home"), _();
    }, xe = () => {
      const E = M.vault.getSlot(), Z = M.vault.exportSlotBundle(E), Ce = wc(Z, "single_slot"), fe = new Blob([JSON.stringify(Ce, null, 2)], { type: "application/json" }), We = URL.createObjectURL(fe), xt = document.createElement("a");
      xt.href = We, xt.download = `brick-breaker-v14-file-${E + 1}.json`, document.body.appendChild(xt), xt.click(), xt.remove(), setTimeout(() => URL.revokeObjectURL(We), 1500), Ne(`Exported backup for File ${E + 1}.`, "info");
    }, Ze = (E) => {
      const Z = new FileReader();
      Z.onload = () => {
        try {
          const Ce = JSON.parse(String(Z.result || "{}")), fe = Sc(Ce, "single_slot");
          if (!fe) {
            Ne("Invalid or corrupted save backup file.", "warn");
            return;
          }
          const We = M.vault.getSlot();
          M.vault.importSlotBundle(fe, We);
          const xt = M.activateSlot(We);
          c(null), xt === "restored" ? u("game") : K(We), Ne(`Loaded backup into File ${We + 1}.`, "info"), _();
        } catch {
          Ne("Failed to read backup file.", "warn");
        }
      }, Z.readAsText(E);
    }, Ge = () => {
      const E = M.vault.getSlot(), Z = M.vault.exportSlotBundle(E), Ce = Fm(Z);
      y(Ce), c("exportCode");
    }, ke = (E) => {
      const Z = E.trim(), Ce = Vm(Z);
      if (!Ce) {
        Ne("Invalid or corrupted save code.", "warn");
        return;
      }
      try {
        const fe = M.vault.getSlot();
        M.vault.importSlotBundle(Ce, fe);
        const We = M.activateSlot(fe);
        c(null), We === "restored" && u("game"), Ne(`Loaded save code into File ${fe + 1}.`, "info"), _();
      } catch {
        Ne("Failed to load save code.", "warn");
      }
    }, qt = () => {
      const E = { version: 14, exportedAt: Date.now(), account: M.vault.getAccount(), achievements: M.vault.getUnlockedAchievements(), slots: Array.from({ length: B.SLOTS }, (xt, Va) => M.vault.exportSlotBundle(Va)) }, Z = wc(E, "all_slots"), Ce = new Blob([JSON.stringify(Z, null, 2)], { type: "application/json" }), fe = URL.createObjectURL(Ce), We = document.createElement("a");
      We.href = fe, We.download = "brick-breaker-v14-all-saves.json", document.body.appendChild(We), We.click(), We.remove(), setTimeout(() => URL.revokeObjectURL(fe), 1500), Ne("Exported backup for all 5 save files.", "info");
    }, mr = (E) => {
      const Z = new FileReader();
      Z.onload = () => {
        try {
          const Ce = JSON.parse(String(Z.result || "{}")), fe = Sc(Ce, "all_slots");
          if (!fe || !Array.isArray(fe.slots)) {
            Ne("Invalid or corrupted backup file.", "warn");
            return;
          }
          fe.slots.forEach((We, xt) => {
            if (xt < B.SLOTS && We) try {
              M.vault.importSlotBundle(We, xt);
            } catch {
            }
          }), fe.account && M.vault.saveAccount(fe.account), fe.achievements && typeof fe.achievements == "object" && M.vault.replaceAchievements(fe.achievements), Ne("Restored all save files from backup.", "info"), _();
        } catch {
          Ne("Failed to read backup file.", "warn");
        }
      }, Z.readAsText(E);
    }, fn = () => {
      q({ title: "Clear All Account Data?", message: "This will permanently erase your player profile, icon, achievements, and all 5 save files (runs, coins, gems, upgrades, and records). This cannot be undone.", onConfirm: () => {
        M.resetAllAccountData(), c(null), u("home"), Ne("All account data and save files cleared.", "info"), _();
      } });
    }, Gr = () => {
      const E = parseFloat(He);
      if (!Number.isFinite(E)) {
        Ne("Enter a valid firing angle in degrees.", "warn");
        return;
      }
      M.shoot(E);
    }, Yr = async () => {
      try {
        const E = await fetch("/brick_breaker_v14.html");
        if (!E.ok) throw new Error("Failed to fetch single HTML file");
        const Z = await E.blob(), Ce = URL.createObjectURL(Z), fe = document.createElement("a");
        fe.href = Ce, fe.download = "brick_breaker_v14.html", document.body.appendChild(fe), fe.click(), fe.remove(), setTimeout(() => URL.revokeObjectURL(Ce), 1500), Ne("Downloaded standalone brick_breaker_v14.html!", "info");
      } catch {
        Ne("Single HTML file is unavailable in this mode.", "warn");
      }
    }, An = M.vault.getAccount(), gr = M.vault.getModeRecords(), Jr = M.vault.getSpeedrunRecords(), en = M.getTasSummary(), Fa = M.elapsedMs();
    return (0, d.jsxs)("div", { className: "relative w-full h-full flex flex-col overflow-hidden", children: [(0, d.jsx)("div", { className: "tartarus-backdrop", "aria-hidden": "true", children: P.map((E) => (0, d.jsx)("div", { className: "tartarus-apparition", style: { top: `${E.topPct}%`, left: `${E.leftPct}%`, width: `${E.width}px`, "--rot": `${E.rot}deg`, "--dur": `${E.dur}s`, "--peak": E.peak }, children: (0, d.jsx)(qm, { variant: E.variant }) }, E.id)) }), x && (0, d.jsxs)("div", { className: `fixed bottom-5 right-5 z-90 px-4 py-2.5 rounded-lg border-2 font-semibold text-xs shadow-lg flex items-center gap-2 transition-all ${x.kind === "warn" ? "bg-red-700 border-red-950 text-white" : x.kind === "medal" ? "bg-emerald-700 border-emerald-950 text-white" : "bg-[#171717] border-slate-700 text-white"}`, role: "status", children: [x.kind === "medal" && (0, d.jsx)(ho, { className: "w-4 h-4 text-amber-300" }), (0, d.jsx)("span", { children: x.msg })] }), o === "home" && (0, d.jsx)("section", { className: "fixed inset-0 z-30 flex items-center justify-center p-5", children: (0, d.jsxs)("div", { className: "w-[min(470px,95vw)] rounded-2xl bg-white border-2 border-[#171717] p-7 text-center shadow-[0_14px_36px_rgba(15,23,42,0.12)] flex flex-col items-center gap-4", children: [(0, d.jsx)("div", { className: "w-20 h-20 rounded-2xl bg-gradient-to-br from-[#3182ce] to-[#1e4e8c] text-white border-2 border-[#171717] flex items-center justify-center shadow-[0_6px_0_#171717]", children: (0, d.jsx)(vc, { emblem: An.emblem, className: "w-10 h-10 drop-shadow" }) }), (0, d.jsx)("div", { children: (0, d.jsx)("h1", { className: "text-3xl font-extrabold tracking-tight text-[#0f172a]", children: "Brick Breaker v14" }) }), (0, d.jsxs)("div", { className: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-100 border border-slate-300 text-xs font-bold text-slate-800 shadow-inner", children: [(0, d.jsx)(pc, { className: "w-3.5 h-3.5 text-[#2b6cb0]" }), (0, d.jsx)("span", { children: An.name })] }), (0, d.jsxs)("div", { className: "w-full flex flex-col gap-2.5 mt-1", children: [(0, d.jsxs)("button", { type: "button", onClick: () => u("saveSelect"), className: "w-full py-3 px-5 rounded-xl bg-[#2b6cb0] hover:bg-[#255c99] active:translate-y-[1px] text-white font-bold text-base flex items-center justify-center gap-2.5 border-2 border-[#171717] shadow-[0_3px_0_#171717] cursor-pointer transition-all", children: [(0, d.jsx)(cc, { className: "w-5 h-5" }), (0, d.jsx)("span", { children: "Play" })] }), (0, d.jsxs)("button", { type: "button", onClick: () => c("achievements"), className: "w-full py-2.5 px-4 rounded-xl bg-[#1e293b] hover:bg-[#0f172a] active:translate-y-[1px] text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm", children: [(0, d.jsx)(fc, { className: "w-4 h-4 text-amber-400" }), (0, d.jsx)("span", { children: "Achievements" })] }), (0, d.jsxs)("button", { type: "button", onClick: () => c("account"), className: "w-full py-2.5 px-4 rounded-xl bg-slate-600 hover:bg-slate-700 active:translate-y-[1px] text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm", children: [(0, d.jsx)(pc, { className: "w-4 h-4" }), (0, d.jsx)("span", { children: "Account & Saves" })] })] })] }) }), o === "saveSelect" && (0, d.jsx)(jm, { vault: M.vault, refreshTick: 0, onBack: () => u("home"), onSelectOccupiedSlot: K, onSelectEmptySlot: $, onWipeSlot: H }), o === "game" && (0, d.jsxs)("div", { className: "relative z-10 flex flex-col w-full h-full", children: [(0, d.jsxs)("header", { className: `game-shell-nav flex flex-wrap items-center justify-between gap-2 px-3.5 py-2 border-b-2 shadow-sm transition-colors ${Pe ? "bg-[#07070a]/95 border-[#3a1016] text-slate-100" : je ? "bg-[#2b0909]/95 border-[#631c1c] text-red-100" : "bg-white/95 border-[#171717] text-[#1e293b]"}`, children: [(0, d.jsxs)("div", { className: "flex flex-wrap items-center gap-1.5", children: [(0, d.jsxs)("button", { type: "button", onClick: st, className: "px-2.5 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-800 active:translate-y-[1px] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all", children: [(0, d.jsx)(oc, { className: "w-3.5 h-3.5" }), (0, d.jsx)("span", { children: "Home" })] }), (0, d.jsxs)("button", { type: "button", onClick: U, className: "px-2.5 py-1.5 rounded-lg bg-[#2b6cb0] hover:bg-[#255c99] active:translate-y-[1px] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all", children: [(0, d.jsx)(uc, { className: "w-3.5 h-3.5" }), (0, d.jsx)("span", { children: "Pause" })] }), (0, d.jsx)("select", { "aria-label": "Difficulty", value: X?.difficulty || "medium", disabled: !X || X.level > 1 || X.over || X.complete, onChange: (E) => M.setDifficulty(E.target.value), className: "px-2.5 py-1.5 rounded-lg border border-slate-400 bg-white text-slate-900 text-xs font-semibold disabled:opacity-60 cursor-pointer", children: gc.map((E) => (0, d.jsx)("option", { value: E.value, children: E.label }, E.value)) }), (0, d.jsxs)("button", { type: "button", onClick: () => c("perm"), className: "px-2.5 py-1.5 rounded-lg bg-purple-700 hover:bg-purple-800 active:translate-y-[1px] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all", children: [(0, d.jsx)(ym, { className: "w-3.5 h-3.5" }), (0, d.jsx)("span", { children: "Upgrades" })] }), (0, d.jsxs)("button", { type: "button", onClick: () => c("temp"), className: "px-2.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 active:translate-y-[1px] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all", children: [(0, d.jsx)(em, { className: "w-3.5 h-3.5" }), (0, d.jsx)("span", { children: "Shop" })] }), (0, d.jsxs)("button", { type: "button", onClick: () => c("gameInfo"), className: "px-2.5 py-1.5 rounded-lg bg-slate-600 hover:bg-slate-700 active:translate-y-[1px] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all", children: [(0, d.jsx)(Fh, { className: "w-3.5 h-3.5" }), (0, d.jsx)("span", { children: "Guide" })] }), (0, d.jsxs)("button", { type: "button", onClick: () => c("leaderboard"), className: "px-2.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 active:translate-y-[1px] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all", children: [(0, d.jsx)(yh, { className: "w-3.5 h-3.5" }), (0, d.jsx)("span", { children: "Records" })] }), (0, d.jsxs)("button", { type: "button", onClick: () => c("achievements"), className: "px-2.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 active:translate-y-[1px] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all", children: [(0, d.jsx)(ho, { className: "w-3.5 h-3.5" }), (0, d.jsx)("span", { children: "Medals" })] })] }), (0, d.jsxs)("div", { className: "flex items-center gap-2", children: [(0, d.jsxs)("span", { className: `px-2.5 py-1 rounded-lg text-xs font-bold border ${Pe ? "bg-red-950/80 border-red-700 text-red-200" : je ? "bg-red-900 border-red-500 text-red-100" : "bg-slate-100 border-slate-300 text-slate-800"}`, children: ["File ", M.vault.getSlot() + 1] }), (0, d.jsx)("button", { type: "button", onClick: z, title: h ? "Unmute Audio" : "Mute Audio", className: "p-1.5 rounded-lg bg-slate-700 hover:bg-slate-800 text-white cursor-pointer transition-colors", children: h ? (0, d.jsx)(mc, { className: "w-4 h-4" }) : (0, d.jsx)(hc, { className: "w-4 h-4" }) }), (0, d.jsx)("button", { type: "button", onClick: () => c("settings"), title: "Game Settings", className: "p-1.5 rounded-lg bg-slate-700 hover:bg-slate-800 text-white cursor-pointer transition-colors", children: (0, d.jsx)(Xh, { className: "w-4 h-4" }) })] })] }), (0, d.jsxs)("main", { className: "game-shell-main flex-1 min-h-0 flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-3.5 p-3 overflow-y-auto lg:overflow-hidden", children: [(0, d.jsxs)("aside", { className: "w-full max-w-[710px] lg:w-[278px] shrink-0 flex flex-col gap-3 lg:overflow-y-auto", children: [(0, d.jsxs)("section", { id: "analysisPanel", className: `rounded-xl border-2 p-3.5 text-xs shadow-md ${Pe ? "bg-[#08080c]/95 border-[#4c1118] text-slate-200" : je ? "bg-[#260909]/95 border-[#631c1c] text-red-50" : "bg-white border-[#171717] text-[#1e293b]"}`, children: [(0, d.jsxs)("h3", { className: "text-sm font-bold tracking-tight flex items-center gap-1.5 pb-2 mb-2.5 border-b border-current/15", children: [(0, d.jsx)(Ah, { className: "w-4 h-4 text-[#2b6cb0]" }), (0, d.jsx)("span", { children: "Analysis" })] }), (0, d.jsxs)("div", { className: "flex flex-col gap-1.5 mb-2.5", children: [(0, d.jsx)("label", { className: "text-[11px] font-semibold opacity-80", htmlFor: "manualAngleInput", children: "Precision Firing Angle (deg)" }), (0, d.jsxs)("div", { className: "flex gap-1.5", children: [(0, d.jsx)("input", { id: "manualAngleInput", type: "number", step: "0.1", min: "-175", max: "-5", value: He, onFocus: () => {
      he(!0);
      const E = parseFloat(He);
      M.setManualAngle(Number.isFinite(E) ? E : null, !0);
    }, onBlur: () => {
      he(!1), M.setManualAngle(null, !1);
    }, onChange: (E) => {
      se(E.target.value);
      const Z = parseFloat(E.target.value);
      M.setManualAngle(Number.isFinite(Z) ? Z : null, !0);
    }, className: "flex-1 min-w-0 px-2 py-1 rounded border border-slate-300 bg-white text-slate-900 font-mono text-xs" }), (0, d.jsx)("button", { type: "button", onClick: Gr, className: "px-2.5 py-1 rounded bg-[#2b6cb0] hover:bg-[#2c5282] text-white font-semibold text-xs cursor-pointer shrink-0", children: "Fire angle" })] })] }), b ? (0, d.jsxs)("div", { className: "grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] mono-num", children: [(0, d.jsx)("span", { className: "opacity-75", children: "Pointer Aim" }), (0, d.jsxs)("span", { className: "text-right font-bold", children: [b.mouseAngleDeg.toFixed(1), "\xB0"] }), (0, d.jsx)("span", { className: "opacity-75", children: "Velocity X/Y" }), (0, d.jsxs)("span", { className: "text-right font-bold", children: [b.vx.toFixed(2), ", ", b.vy.toFixed(2)] }), (0, d.jsx)("span", { className: "opacity-75", children: "Ball Speed" }), (0, d.jsxs)("span", { className: "text-right font-bold", children: [b.speed.toFixed(1), " px/f"] }), (0, d.jsx)("span", { className: "opacity-75", children: "Frames to Top" }), (0, d.jsxs)("span", { className: "text-right font-bold", children: [b.framesToTop.toFixed(1), " f"] }), (0, d.jsx)("span", { className: "opacity-75", children: "Horiz. Drift" }), (0, d.jsxs)("span", { className: "text-right font-bold", children: [b.horizontalTravel.toFixed(0), " px"] }), (0, d.jsx)("span", { className: "opacity-75", children: "Anchor X" }), (0, d.jsxs)("span", { className: "text-right font-bold", children: [b.anchorX.toFixed(0), " px"] })] }) : (0, d.jsx)("p", { className: "text-[11px] opacity-70", children: "Telemetry active during gameplay." })] }), (0, d.jsxs)("section", { id: "tasPanel", className: `rounded-xl border-2 p-3 text-xs shadow-sm ${Pe ? "bg-[#08080c]/95 border-[#4c1118] text-slate-200" : je ? "bg-[#260909] border-[#631c1c] text-red-50" : "bg-white border-[#171717] text-[#222]"}`, children: [(0, d.jsxs)("div", { className: "flex items-center justify-between pb-1.5 mb-2 border-b border-current/15", children: [(0, d.jsxs)("h3", { className: "text-sm font-bold flex items-center gap-1.5", children: [(0, d.jsx)(om, { className: "w-4 h-4 text-emerald-600" }), (0, d.jsx)("span", { children: "TAS Split Tracker" })] }), en.visible && (0, d.jsx)("span", { className: "text-[11px] font-bold mono-num text-[#2b6cb0]", children: cn(en.currentTotalMs) })] }), en.visible ? (0, d.jsxs)(d.Fragment, { children: [(0, d.jsxs)("div", { className: "flex justify-between text-[11px] mb-2 mono-num", children: [(0, d.jsx)("span", { className: "opacity-75", children: "Sum of Best" }), (0, d.jsx)("span", { className: "font-bold", children: en.bestSegmentTotalMs > 0 ? cn(en.bestSegmentTotalMs) : "--:--.--" })] }), (0, d.jsx)("div", { className: "max-h-[190px] overflow-y-auto flex flex-col gap-1 pr-0.5 mono-num text-[11px]", children: en.rows.length === 0 ? (0, d.jsx)("div", { className: "opacity-70 text-center py-2", children: "Complete Level 1 to record first split." }) : en.rows.slice().reverse().map((E) => (0, d.jsxs)("div", { className: `flex items-center justify-between px-2 py-1 rounded ${Ve ? "bg-black/35" : "bg-slate-100"}`, children: [(0, d.jsxs)("span", { className: "font-bold", children: ["Lvl ", E.turn] }), (0, d.jsx)("span", { children: E.splitMs ? cn(E.splitMs) : "--:--.--" }), (0, d.jsx)("span", { className: `font-bold ${E.faster ? "text-emerald-500" : E.slower ? "text-red-500" : "opacity-70"}`, children: E.deltaLabel })] }, E.turn)) })] }) : (0, d.jsxs)("p", { className: "text-[11px] opacity-75 leading-snug", children: ["Active during ", (0, d.jsx)("strong", { children: "Speedrun" }), " modes. Tracks per-turn splits and delta vs. personal best segments."] })] })] }), (0, d.jsxs)("section", { className: "flex flex-col items-center justify-center min-h-0 flex-1 max-h-full gap-2", children: [(0, d.jsx)("div", { className: `relative rounded-xl border-2 overflow-hidden shadow-lg ${Pe ? "bg-[#030306] border-[#7f1d1d]" : je ? "bg-[#1a0505] border-[#9b2c2c]" : "bg-white border-[#171717]"}`, style: { aspectRatio: `${B.W} / ${B.H}`, height: "min(calc(100vh - 125px), 880px)", maxWidth: "100%" }, children: (0, d.jsx)("canvas", { ref: qe, width: B.W, height: B.H, onPointerMove: (E) => M.setPointerPosition(E.clientX, E.clientY), onPointerDown: (E) => {
      M.setPointerPosition(E.clientX, E.clientY), M.shoot();
    }, className: "w-full h-full block cursor-crosshair touch-none" }) }), (0, d.jsxs)("div", { className: "flex items-center gap-2", children: [(0, d.jsxs)("button", { type: "button", onClick: () => M.recallBalls(), disabled: !X?.turnInProgress || X?.paused || X?.over || X?.complete, className: "px-4 py-1.5 rounded-lg bg-[#222] hover:bg-[#333] disabled:opacity-45 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed", children: [(0, d.jsx)(mo, { className: "w-3.5 h-3.5" }), (0, d.jsx)("span", { children: "Recall Balls" })] }), (X?.over || X?.complete) && (0, d.jsx)("button", { type: "button", onClick: O, className: "px-4 py-1.5 rounded-lg bg-[#2b6cb0] hover:bg-[#2c5282] text-white text-xs font-bold cursor-pointer", children: "New Run" })] })] }), (0, d.jsxs)("aside", { className: "w-full max-w-[710px] lg:w-[270px] shrink-0 flex flex-col gap-3 lg:overflow-y-auto", children: [Ve && X && (0, d.jsxs)("section", { className: `rounded-xl border-2 p-3 text-xs shadow-sm ${Pe ? "bg-[#090408]/95 border-[#7f1d1d] text-red-100" : "bg-[#2d0808] border-[#9b2c2c] text-red-100"}`, children: [(0, d.jsxs)("div", { className: "flex items-center gap-2 pb-1.5 mb-2 border-b border-red-500/30", children: [Pe ? (0, d.jsx)(go, { className: "w-4 h-4 text-red-400 shrink-0" }) : (0, d.jsx)(Ia, { className: "w-4 h-4 text-orange-400 shrink-0" }), (0, d.jsx)("h3", { className: "text-sm font-bold text-red-300", children: Pe ? "Warden of Tartarus" : "Hell Overlord" })] }), (0, d.jsx)("p", { className: "italic text-[11px] text-red-200 leading-relaxed mb-2", children: X.overlordDialogue }), (0, d.jsxs)("div", { className: "flex justify-between items-center text-[11px] mono-num bg-black/35 px-2.5 py-1.5 rounded", children: [(0, d.jsx)("span", { className: "text-red-300", children: "Next Curse" }), (0, d.jsxs)("span", { className: "font-bold text-amber-300", children: [Math.max(0, 2 - (X.overlordTimer || 0)), " turn", 2 - (X.overlordTimer || 0) === 1 ? "" : "s"] })] })] }), (0, d.jsxs)("section", { className: `rounded-xl border-2 p-3 text-xs shadow-sm ${Pe ? "bg-[#08080c]/95 border-[#4c1118] text-slate-200" : je ? "bg-[#260909] border-[#631c1c] text-red-50" : "bg-white border-[#171717] text-[#222]"}`, children: [(0, d.jsxs)("div", { className: "flex gap-1.5 mb-2.5", children: [(0, d.jsx)("button", { type: "button", onClick: () => Se("general"), className: `flex-1 py-1.5 rounded-md font-bold text-xs cursor-pointer ${Y === "general" ? "bg-[#2b6cb0] text-white" : "bg-slate-200 text-slate-800"}`, children: "General" }), (0, d.jsx)("button", { type: "button", onClick: () => Se("speedrun"), className: `flex-1 py-1.5 rounded-md font-bold text-xs cursor-pointer ${Y === "speedrun" ? "bg-[#2b6cb0] text-white" : "bg-slate-200 text-slate-800"}`, children: "Speedrun" })] }), Y === "general" && X && (0, d.jsxs)("div", { className: "flex flex-col gap-1.5 mono-num text-[11px]", children: [(0, d.jsxs)("div", { className: `flex justify-between px-2.5 py-1.5 rounded ${Ve ? "bg-black/35" : "bg-slate-100"}`, children: [(0, d.jsx)("span", { children: "Coins" }), (0, d.jsx)("strong", { className: "text-amber-500", children: X.coins })] }), (0, d.jsxs)("div", { className: `flex justify-between px-2.5 py-1.5 rounded ${Ve ? "bg-black/35" : "bg-slate-100"}`, children: [(0, d.jsx)("span", { children: "Gems" }), (0, d.jsx)("strong", { className: "text-purple-500", children: X.gems })] }), (0, d.jsxs)("div", { className: `flex justify-between px-2.5 py-1.5 rounded ${Ve ? "bg-black/35" : "bg-slate-100"}`, children: [(0, d.jsx)("span", { children: "Run Timer" }), (0, d.jsx)("strong", { children: cn(Fa) })] }), Pe && (0, d.jsxs)("div", { className: "flex justify-between px-2.5 py-1.5 rounded bg-red-950/80 border border-red-700 text-red-200", children: [(0, d.jsx)("span", { children: "Turn Limit" }), (0, d.jsxs)("strong", { className: X.turnTimeRemaining < 2.5 ? "text-red-400" : "", children: [X.turnTimeRemaining.toFixed(1), "s"] })] }), (0, d.jsxs)("div", { className: `flex justify-between px-2.5 py-1.5 rounded ${Ve ? "bg-black/35" : "bg-slate-100"}`, children: [(0, d.jsx)("span", { children: "Active Buff" }), (0, d.jsx)("strong", { children: X.buffs.doubleDamageTurns > 0 ? `1.5x DMG (${X.buffs.doubleDamageTurns}t)` : "None" })] }), (0, d.jsxs)("div", { className: `flex justify-between px-2.5 py-1.5 rounded ${Ve ? "bg-black/35" : "bg-slate-100"}`, children: [(0, d.jsx)("span", { children: "Best Infinite" }), (0, d.jsxs)("strong", { children: ["Lvl ", gr.infinite] })] }), (0, d.jsxs)("div", { className: `flex justify-between px-2.5 py-1.5 rounded ${Ve ? "bg-black/35" : "bg-slate-100"}`, children: [(0, d.jsx)("span", { children: "Best Hell" }), (0, d.jsxs)("strong", { children: ["Lvl ", gr.hell] })] }), (0, d.jsxs)("div", { className: `flex justify-between px-2.5 py-1.5 rounded ${Ve ? "bg-black/35" : "bg-slate-100"}`, children: [(0, d.jsx)("span", { children: "Best Tartarus" }), (0, d.jsxs)("strong", { children: ["Lvl ", gr.tartarus] })] })] }), Y === "speedrun" && (0, d.jsxs)("div", { className: "flex flex-col gap-2 text-[11px]", children: [(0, d.jsxs)("div", { className: "flex gap-1.5", children: [(0, d.jsx)("select", { value: ze, onChange: (E) => tt(E.target.value), className: "flex-1 p-1.5 rounded border border-slate-300 bg-white text-slate-900 font-semibold", children: B.SR.map((E) => (0, d.jsxs)("option", { value: `speedrun_${E}`, children: ["Target ", E] }, E)) }), (0, d.jsx)("select", { value: lt, onChange: (E) => Ue(E.target.value), className: "flex-1 p-1.5 rounded border border-slate-300 bg-white text-slate-900 font-semibold", children: B.DF.map((E) => (0, d.jsx)("option", { value: E, children: E.toUpperCase() }, E)) })] }), (() => {
      const E = Jr[ze]?.[lt];
      return (0, d.jsxs)("div", { className: "flex flex-col gap-1.5 mono-num", children: [(0, d.jsxs)("div", { className: `flex justify-between px-2.5 py-1.5 rounded ${Ve ? "bg-black/35" : "bg-slate-100"}`, children: [(0, d.jsx)("span", { children: "Personal Best" }), (0, d.jsx)("strong", { children: E?.bestMs !== null && E?.bestMs !== void 0 ? cn(E.bestMs) : "--:--.--" })] }), (0, d.jsxs)("div", { className: `flex justify-between px-2.5 py-1.5 rounded ${Ve ? "bg-black/35" : "bg-slate-100"}`, children: [(0, d.jsx)("span", { children: "Clears" }), (0, d.jsx)("strong", { children: E?.clears || 0 })] }), (0, d.jsxs)("div", { className: `flex justify-between px-2.5 py-1.5 rounded ${Ve ? "bg-black/35" : "bg-slate-100"}`, children: [(0, d.jsx)("span", { children: "Current Time" }), (0, d.jsx)("strong", { children: cn(Fa) })] })] });
    })()] })] })] })] })] }), (0, d.jsx)(Sm, { activeModal: f, engine: M, isHell: je, isTartarus: Pe, muted: h, modeSelectState: te, exportedCode: j, confirmDialog: I, onCloseConfirm: () => q(null), onCloseModal: () => {
      f === "pause" ? Q() : c(null);
    }, onResumeGame: Q, onToggleAudio: z, onRestartRun: O, onSwitchSlot: le, onReturnHome: st, onStartSelectedMode: re, onCancelModeSelect: () => c(null), onExportSlotFile: xe, onImportSlotFile: Ze, onExportCode: Ge, onOpenImportCode: () => c("importCode"), onApplyImportCode: ke, onWipeCurrentSlot: () => H(M.vault.getSlot()), onSaveAccountName: (E) => {
      const Z = M.vault.getAccount();
      M.vault.saveAccount({ ...Z, name: E }), Ne("Player profile updated.", "info"), _();
    }, onSelectEmblem: (E) => {
      const Z = M.vault.getAccount();
      M.vault.saveAccount({ ...Z, emblem: E }), _();
    }, onExportAllSlots: qt, onImportAllSlots: mr, onDownloadSingleHtml: Yr, onClearAllAccountData: fn })] });
  }
  (0, bm.createRoot)(document.getElementById("root")).render((0, d.jsx)(Wm, {}));
})();
