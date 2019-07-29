/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 92);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if ( true ) {
    // AMD - RequireJS
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {

"use strict";

function EvEmitter() {}

var proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // set events hash
  var events = this._events = this._events || {};
  // set listeners array
  var listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( listeners.indexOf( listener ) == -1 ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  var onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  // copy over to avoid interference if .off() in listener
  listeners = listeners.slice(0);
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  for ( var i=0; i < listeners.length; i++ ) {
    var listener = listeners[i]
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
  }

  return this;
};

proto.allOff = function() {
  delete this._events;
  delete this._onceEvents;
};

return EvEmitter;

}));


/***/ }),
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__root_static_free_colibri__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__root_static_free_colibri___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__root_static_free_colibri__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__colibri_kube_component__ = __webpack_require__(100);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__root_static_free_colibri___default.a; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__colibri_kube_component__["a"]; });



__WEBPACK_IMPORTED_MODULE_0__root_static_free_colibri___default.a.registerPlugin = function (name, plugin, autoload) {
  if (typeof name.componentName === 'function') {
    autoload = plugin;
    plugin = name;
    name = plugin.componentName();
  }

  __WEBPACK_IMPORTED_MODULE_0__root_static_free_colibri___default.a[name] = plugin;
  // Colibri[name].inherits(Colibri);
  __WEBPACK_IMPORTED_MODULE_0__root_static_free_colibri___default.a.Plugin.create(name);

  if (autoload !== false) {
    __WEBPACK_IMPORTED_MODULE_0__root_static_free_colibri___default.a.Plugin.autoload(name);
  }
};



/***/ }),
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * matchesSelector v2.0.2
 * matchesSelector( element, '.selector' )
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  /*global define: false, module: false */
  'use strict';
  // universal module definition
  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.matchesSelector = factory();
  }

}( window, function factory() {
  'use strict';

  var matchesMethod = ( function() {
    var ElemProto = window.Element.prototype;
    // check for the standard method name first
    if ( ElemProto.matches ) {
      return 'matches';
    }
    // check un-prefixed
    if ( ElemProto.matchesSelector ) {
      return 'matchesSelector';
    }
    // check vendor prefixes
    var prefixes = [ 'webkit', 'moz', 'ms', 'o' ];

    for ( var i=0; i < prefixes.length; i++ ) {
      var prefix = prefixes[i];
      var method = prefix + 'MatchesSelector';
      if ( ElemProto[ method ] ) {
        return method;
      }
    }
  })();

  return function matchesSelector( elem, selector ) {
    return elem[ matchesMethod ]( selector );
  };

}));


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * getSize v2.0.3
 * measure size of elements
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */
/* globals console: false */

( function( window, factory ) {
  /* jshint strict: false */ /* globals define, module */
  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.getSize = factory();
  }

})( window, function factory() {
'use strict';

// -------------------------- helpers -------------------------- //

// get a number from a string, not a percentage
function getStyleSize( value ) {
  var num = parseFloat( value );
  // not a percent like '100%', and a number
  var isValid = value.indexOf('%') == -1 && !isNaN( num );
  return isValid && num;
}

function noop() {}

var logError = typeof console == 'undefined' ? noop :
  function( message ) {
    console.error( message );
  };

// -------------------------- measurements -------------------------- //

var measurements = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth'
];

var measurementsLength = measurements.length;

function getZeroSize() {
  var size = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0
  };
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    size[ measurement ] = 0;
  }
  return size;
}

// -------------------------- getStyle -------------------------- //

/**
 * getStyle, get style of element, check for Firefox bug
 * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
 */
function getStyle( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    logError( 'Style returned ' + style +
      '. Are you running this code in a hidden iframe on Firefox? ' +
      'See https://bit.ly/getsizebug1' );
  }
  return style;
}

// -------------------------- setup -------------------------- //

var isSetup = false;

var isBoxSizeOuter;

/**
 * setup
 * check isBoxSizerOuter
 * do on first getSize() rather than on page load for Firefox bug
 */
function setup() {
  // setup once
  if ( isSetup ) {
    return;
  }
  isSetup = true;

  // -------------------------- box sizing -------------------------- //

  /**
   * Chrome & Safari measure the outer-width on style.width on border-box elems
   * IE11 & Firefox<29 measures the inner-width
   */
  var div = document.createElement('div');
  div.style.width = '200px';
  div.style.padding = '1px 2px 3px 4px';
  div.style.borderStyle = 'solid';
  div.style.borderWidth = '1px 2px 3px 4px';
  div.style.boxSizing = 'border-box';

  var body = document.body || document.documentElement;
  body.appendChild( div );
  var style = getStyle( div );
  // round value for browser zoom. desandro/masonry#928
  isBoxSizeOuter = Math.round( getStyleSize( style.width ) ) == 200;
  getSize.isBoxSizeOuter = isBoxSizeOuter;

  body.removeChild( div );
}

// -------------------------- getSize -------------------------- //

function getSize( elem ) {
  setup();

  // use querySeletor if elem is string
  if ( typeof elem == 'string' ) {
    elem = document.querySelector( elem );
  }

  // do not proceed on non-objects
  if ( !elem || typeof elem != 'object' || !elem.nodeType ) {
    return;
  }

  var style = getStyle( elem );

  // if hidden, everything is 0
  if ( style.display == 'none' ) {
    return getZeroSize();
  }

  var size = {};
  size.width = elem.offsetWidth;
  size.height = elem.offsetHeight;

  var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

  // get all measurements
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    var value = style[ measurement ];
    var num = parseFloat( value );
    // any 'auto', 'medium' value will be 0
    size[ measurement ] = !isNaN( num ) ? num : 0;
  }

  var paddingWidth = size.paddingLeft + size.paddingRight;
  var paddingHeight = size.paddingTop + size.paddingBottom;
  var marginWidth = size.marginLeft + size.marginRight;
  var marginHeight = size.marginTop + size.marginBottom;
  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
  var borderHeight = size.borderTopWidth + size.borderBottomWidth;

  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

  // overwrite width and height if we can get it from style
  var styleWidth = getStyleSize( style.width );
  if ( styleWidth !== false ) {
    size.width = styleWidth +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
  }

  var styleHeight = getStyleSize( style.height );
  if ( styleHeight !== false ) {
    size.height = styleHeight +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
  }

  size.innerWidth = size.width - ( paddingWidth + borderWidth );
  size.innerHeight = size.height - ( paddingHeight + borderHeight );

  size.outerWidth = size.width + marginWidth;
  size.outerHeight = size.height + marginHeight;

  return size;
}

return getSize;

});


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (name, definition) {

  if (true) {
    module.exports = definition();
  } else if (typeof define == 'function' && _typeof(define.amd) == 'object') {
    define(definition);
  } else {
    this[name] = definition();
  }
})('Colibri', function () {
  var $ = jQuery;
  if (typeof jQuery === 'undefined') {
    throw new Error('Colibri requires jQuery');
  }

  ;(function ($) {
    var version = $.fn.jquery.split('.');
    if (version[0] === 1 && version[1] < 8) {
      throw new Error('Colibri requires at least jQuery v1.8');
    }
  })(jQuery);

  var _Colibri;

  var lib_prefix = "colibri.";

  ;(function () {
    // Inherits
    Function.prototype.inherits = function (parent) {
      var F = function F() {};
      F.prototype = parent.prototype;
      var f = new F();

      for (var prop in this.prototype) {
        f[prop] = this.prototype[prop];
      }
      this.prototype = f;
      this.prototype.super = parent.prototype;
    };

    // Core Class
    _Colibri = function Colibri(element, options) {
      options = (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' ? options : {};

      this.$element = $(element);
      var instanceId = this.$element.data('colibri-id');

      var instanceData = _Colibri.getData(instanceId);
      this.instance = instanceId;

      var elementData = this.$element.data();

      this.opts = $.extend(true, {}, this.defaults, $.fn[lib_prefix + this.namespace].options, elementData, instanceData, options);
      this.$target = typeof this.opts.target === 'string' ? $(this.opts.target) : null;
    };

    _Colibri.getData = function (id) {
      if (window.colibriData && window.colibriData[id]) {
        return window.colibriData[id];
      }

      return {};
    };

    _Colibri.isCustomizerPreview = function () {
      return !!window.colibriCustomizerPreviewData;
    };
    // Core Functionality
    _Colibri.prototype = {
      updateOpts: function updateOpts(updatedData) {
        var instanceId = this.instance;
        var instanceData = $.extend(true, {}, this.defaults, _Colibri.getData(instanceId));
        var updatedDataWithDefault = updatedData ? updatedData : {};
        this.opts = $.extend(true, this.opts, instanceData, updatedDataWithDefault);
      },
      getInstance: function getInstance() {
        return this.$element.data('fn.' + this.namespace);
      },
      hasTarget: function hasTarget() {
        return !(this.$target === null);
      },
      callback: function callback(type) {
        var args = [].slice.call(arguments).splice(1);

        // on element callback
        if (this.$element) {
          args = this._fireCallback($._data(this.$element[0], 'events'), type, this.namespace, args);
        }

        // on target callback
        if (this.$target) {
          args = this._fireCallback($._data(this.$target[0], 'events'), type, this.namespace, args);
        }

        // opts callback
        if (this.opts && this.opts.callbacks && $.isFunction(this.opts.callbacks[type])) {
          return this.opts.callbacks[type].apply(this, args);
        }

        return args;
      },
      _fireCallback: function _fireCallback(events, type, eventNamespace, args) {
        if (events && typeof events[type] !== 'undefined') {
          var len = events[type].length;
          for (var i = 0; i < len; i++) {
            var namespace = events[type][i].namespace;
            if (namespace === eventNamespace) {
              var value = events[type][i].handler.apply(this, args);
            }
          }
        }

        return typeof value === 'undefined' ? args : value;
      }
    };
  })();

  (function (Colibri) {
    Colibri.Plugin = {
      create: function create(classname, pluginname) {
        pluginname = typeof pluginname === 'undefined' ? classname.toLowerCase() : pluginname;
        pluginname = lib_prefix + pluginname;

        $.fn[pluginname] = function (method, options) {
          var args = Array.prototype.slice.call(arguments, 1);
          var name = 'fn.' + pluginname;
          var val = [];

          this.each(function () {
            var $this = $(this),
                data = $this.data(name);
            options = (typeof method === 'undefined' ? 'undefined' : _typeof(method)) === 'object' ? method : options;

            if (!data) {
              // Initialization
              $this.data(name, {});
              data = new Colibri[classname](this, options);
              $this.data(name, data);
            }

            // Call methods
            if (typeof method === 'string') {
              if ($.isFunction(data[method])) {
                var methodVal = data[method].apply(data, args);
                if (methodVal !== undefined) {
                  val.push(methodVal);
                }
              } else {
                $.error('No such method "' + method + '" for ' + classname);
              }
            }
          });

          return val.length === 0 || val.length === 1 ? val.length === 0 ? this : val[0] : val;
        };

        $.fn[pluginname].options = {};

        return this;
      },
      autoload: function autoload(pluginname) {
        var arr = pluginname.split(',');
        var len = arr.length;

        for (var i = 0; i < len; i++) {
          var name = arr[i].toLowerCase().split(',').map(function (s) {
            return lib_prefix + s.trim();
          }).join(',');
          this.autoloadQueue.push(name);
        }

        return this;
      },
      autoloadQueue: [],
      startAutoload: function startAutoload() {
        if (!window.MutationObserver || this.autoloadQueue.length === 0) {
          return;
        }

        var self = this;
        var observer = new MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {
            var newNodes = mutation.addedNodes;
            if (newNodes.length === 0 || newNodes.length === 1 && newNodes.nodeType === 3) {
              return;
            }

            self.startAutoloadOnce();
          });
        });

        // pass in the target node, as well as the observer options
        observer.observe(document, {
          subtree: true,
          childList: true
        });
      },

      startAutoloadOnce: function startAutoloadOnce() {
        var self = this;
        var $nodes = $('[data-colibri-component]').not('[data-loaded]').not('[data-disabled]');
        $nodes.each(function () {
          var $el = $(this);
          var pluginname = lib_prefix + $el.data('colibri-component');

          if (self.autoloadQueue.indexOf(pluginname) !== -1) {
            $el.attr('data-loaded', true);
            try {
              $el[pluginname]();
            } catch (e) {
              console.error(e);
            }
          }
        });
      },
      watch: function watch() {
        Colibri.Plugin.startAutoloadOnce();
        Colibri.Plugin.startAutoload();
      }
    };

    $(window).on('load', function () {
      Colibri.Plugin.watch();
    });
  })(_Colibri);

  (function (Colibri) {
    Colibri.Animation = function (element, effect, callback) {
      this.namespace = 'animation';
      this.defaults = {};

      // Parent Constructor
      Colibri.apply(this, arguments);

      // Initialization
      this.effect = effect;
      this.completeCallback = typeof callback === 'undefined' ? false : callback;
      this.prefixes = ['', '-moz-', '-o-animation-', '-webkit-'];
      this.queue = [];

      this.start();
    };

    Colibri.Animation.prototype = {
      start: function start() {
        if (this.isSlideEffect()) {
          this.setElementHeight();
        }

        this.addToQueue();
        this.clean();
        this.animate();
      },
      addToQueue: function addToQueue() {
        this.queue.push(this.effect);
      },
      setElementHeight: function setElementHeight() {
        this.$element.height(this.$element.outerHeight());
      },
      removeElementHeight: function removeElementHeight() {
        this.$element.css('height', '');
      },
      isSlideEffect: function isSlideEffect() {
        return this.effect === 'slideDown' || this.effect === 'slideUp';
      },
      isHideableEffect: function isHideableEffect() {
        var effects = ['fadeOut', 'slideUp', 'flipOut', 'zoomOut', 'slideOutUp', 'slideOutRight', 'slideOutLeft'];

        return $.inArray(this.effect, effects) !== -1;
      },
      isToggleEffect: function isToggleEffect() {
        return this.effect === 'show' || this.effect === 'hide';
      },
      storeHideClasses: function storeHideClasses() {
        if (this.$element.hasClass('hide-sm')) {
          this.$element.data('hide-sm-class', true);
        } else if (this.$element.hasClass('hide-md')) {
          this.$element.data('hide-md-class', true);
        }
      },
      revertHideClasses: function revertHideClasses() {
        if (this.$element.data('hide-sm-class')) {
          this.$element.addClass('hide-sm').removeData('hide-sm-class');
        } else if (this.$element.data('hide-md-class')) {
          this.$element.addClass('hide-md').removeData('hide-md-class');
        } else {
          this.$element.addClass('hide');
        }
      },
      removeHideClass: function removeHideClass() {
        if (this.$element.data('hide-sm-class')) {
          this.$element.removeClass('hide-sm');
        } else {
          if (this.$element.data('hide-md-class')) {
            this.$element.removeClass('hide-md');
          } else {
            this.$element.removeClass('hide');
            this.$element.removeClass('force-hide');
          }
        }
      },
      animate: function animate() {
        this.storeHideClasses();
        if (this.isToggleEffect()) {
          return this.makeSimpleEffects();
        }

        this.$element.addClass('colibri-animated');
        this.$element.addClass(this.queue[0]);
        this.removeHideClass();

        var _callback = this.queue.length > 1 ? null : this.completeCallback;
        this.complete('AnimationEnd', $.proxy(this.makeComplete, this), _callback);
      },
      makeSimpleEffects: function makeSimpleEffects() {
        if (this.effect === 'show') {
          this.removeHideClass();
        } else if (this.effect === 'hide') {
          this.revertHideClasses();
        }

        if (typeof this.completeCallback === 'function') {
          this.completeCallback(this);
        }
      },
      makeComplete: function makeComplete() {
        if (this.$element.hasClass(this.queue[0])) {
          this.clean();
          this.queue.shift();

          if (this.queue.length) {
            this.animate();
          }
        }
      },
      complete: function complete(type, make, callback) {
        var events = type.split(' ').map(function (type) {
          return type.toLowerCase() + ' webkit' + type + ' o' + type + ' MS' + type;
        });

        this.$element.one(events.join(' '), $.proxy(function () {
          if (typeof make === 'function') {
            make();
          }
          if (this.isHideableEffect()) {
            this.revertHideClasses();
          }
          if (this.isSlideEffect()) {
            this.removeElementHeight();
          }
          if (typeof callback === 'function') {
            callback(this);
          }

          this.$element.off(event);
        }, this));
      },
      clean: function clean() {
        this.$element.removeClass('colibri-animated').removeClass(this.queue[0]);
      }
    };

    // Inheritance
    Colibri.Animation.inherits(Colibri);
  })(_Colibri);

  (function ($) {
    var animationName = lib_prefix + 'animation';
    $.fn[animationName] = function (effect, callback) {
      var name = 'fn.animation';

      return this.each(function () {
        var $this = $(this),
            data = $this.data(name);

        $this.data(name, {});
        $this.data(name, data = new _Colibri.Animation(this, effect, callback));
      });
    };

    $.fn[animationName].options = {};

    _Colibri.animate = function ($target, effect, callback) {
      $target[animationName](effect, callback);
      return $target;
    };
  })(jQuery);

  (function (Colibri) {
    Colibri.Detect = function () {};

    Colibri.Detect.prototype = {
      isMobile: function isMobile() {
        return (/(iPhone|iPod|BlackBerry|Android)/.test(navigator.userAgent)
        );
      },
      isDesktop: function isDesktop() {
        return !/(iPhone|iPod|iPad|BlackBerry|Android)/.test(navigator.userAgent);
      },
      isMobileScreen: function isMobileScreen() {
        return $(window).width() <= 768;
      },
      isTabletScreen: function isTabletScreen() {
        return $(window).width() >= 768 && $(window).width() <= 1024;
      },
      isDesktopScreen: function isDesktopScreen() {
        return $(window).width() > 1024;
      }
    };
  })(_Colibri);

  (function (Colibri) {
    Colibri.Utils = function () {};

    Colibri.Utils.prototype = {
      disableBodyScroll: function disableBodyScroll() {
        var $body = $('html');
        var windowWidth = window.innerWidth;

        if (!windowWidth) {
          var documentElementRect = document.documentElement.getBoundingClientRect();
          windowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
        }

        var isOverflowing = document.body.clientWidth < windowWidth;
        var scrollbarWidth = this.measureScrollbar();

        $body.css('overflow', 'hidden');
        if (isOverflowing) {
          $body.css('padding-right', scrollbarWidth);
        }
      },
      measureScrollbar: function measureScrollbar() {
        var $body = $('body');
        var scrollDiv = document.createElement('div');
        scrollDiv.className = 'scrollbar-measure';

        $body.append(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        $body[0].removeChild(scrollDiv);
        return scrollbarWidth;
      },
      enableBodyScroll: function enableBodyScroll() {
        $('html').css({ 'overflow': '', 'padding-right': '' });
      }
    };
  })(_Colibri);

  return _Colibri;
});

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseHandler = function () {
  function BaseHandler(element, settings) {
    _classCallCheck(this, BaseHandler);

    this.settings = settings;
    this.element = element;
    this.isPlaying = false;

    this.ready();
  }

  _createClass(BaseHandler, [{
    key: 'ready',
    value: function ready() {}
  }, {
    key: 'play',
    value: function play() {}
  }, {
    key: 'pause',
    value: function pause() {}
  }, {
    key: 'isPaused',
    value: function isPaused() {}
  }, {
    key: 'setVideo',
    value: function setVideo(node) {
      node.className = 'colibri-video-background-item';
      this.element.innerHTML = '';
      this.element.appendChild(node);
      this.addResizeBind();
    }
  }, {
    key: 'trigger',
    value: function trigger(name) {
      var evt;

      if ('function' === typeof window.Event) {
        evt = new Event(name);
      } else {
        evt = document.createEvent('Event');
        evt.initEvent(name, true, true);
      }

      this.element.dispatchEvent(evt);
    }
  }, {
    key: 'loaded',
    value: function loaded() {
      this.trigger('video-bg-loaded');
    }
  }, {
    key: 'addResizeBind',
    value: function addResizeBind() {
      var _this = this;

      this.trigger('video-bg-resize');
      this.onResize(function () {
        _this.trigger('video-bg-resize');
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(callback) {
      jQuery(this.element).on('video-bg-loaded', callback);
    }
  }, {
    key: 'onResize',
    value: function onResize(callback) {
      var debounce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;

      callback = jQuery.debounce(callback, debounce);
      jQuery(window).resize(callback);
      jQuery(window).on('orientationchange', callback);
    }
  }], [{
    key: 'test',
    value: function test() {
      return false;
    }
  }]);

  return BaseHandler;
}();

/* harmony default export */ __webpack_exports__["a"] = (BaseHandler);

/***/ }),
/* 65 */
/***/ (function(module, exports) {

(function ($, Colibri) {
  var className = 'offcanvas';

  var Component = function Component(element, options) {
    this.namespace = 'offcanvas';
    this.defaults = {
      target: null, // selector
      push: true, // boolean
      width: '250px', // string
      direction: 'left', // string: left or right
      toggleEvent: 'click',
      clickOutside: true, // boolean
      animationOpen: 'slideInLeft',
      animationClose: 'slideOutLeft',
      callbacks: ['open', 'opened', 'close', 'closed'],
      offcanvasOverlayId: null,
      $overlayElement: null,
      targetId: null
    };

    // Parent Constructor
    Colibri.apply(this, arguments);

    // Services
    this.utils = new Colibri.Utils();
    this.detect = new Colibri.Detect();

    // Initialization
    this.start();
  };

  // Functionality
  Component.prototype = {
    start: function start() {
      if (!this.hasTarget()) {
        return;
      }
      var overlayId = this.opts.offcanvasOverlayId;
      var $overlayElement = $('#' + overlayId + '.offscreen-overlay');
      this.opts.$overlayElement = $overlayElement;

      // this.stop();

      this.buildTargetWidth();
      this.buildAnimationDirection();

      this.$close = this.getCloseLink();
      this.$element.on(this.opts.toggleEvent + '.' + this.namespace, $.proxy(this.toggle, this));
      this.$target.addClass('offcanvas');
      this.$target.trigger('colibri.offcanvas.ready');

      this.moveOffcanvasToBody();

      this.addOffcanvasOverlayLogic();
    },
    stop: function stop() {
      this.closeAll();
      this.removeOffcanvasElements();
      this.$element.off('.' + this.namespace);
      if (this.$close) {
        this.$close.off('.' + this.namespace);
      }
      $(document).off('.' + this.namespace);
    },
    removeOffcanvasElements: function removeOffcanvasElements() {
      // var targetId = this.opts.targetId;
      // var $targetElement = $('#' + targetId + '.h-offcanvas-panel');

      this.$target.remove();
      this.opts.$overlayElement.remove();

      // if ($targetElement && $targetElement.length > 0) {
      //   for (var i = 0; i < $targetElement.length; i++) {
      //     var offcanvasPanel = $targetElement[i];
      //     var offcanvasPanelParent = offcanvasPanel.parentNode;
      //     if (offcanvasPanelParent && offcanvasPanelParent.tagName === 'BODY') {
      //       offcanvasPanelParent.removeChild(offcanvasPanel);
      //     }
      //   }
      // }
      //
      // var overlayElements = this.opts.$overlayElement;
      // if (overlayElements && overlayElements.length > 0) {
      //   for (var j = 0; j < overlayElements.length; j++) {
      //     var overlayElement = overlayElements[j];
      //     var overlayElementParent = overlayElement.parentNode;
      //     if (overlayElementParent && overlayElementParent.tagName === 'BODY') {
      //       overlayElementParent.removeChild(overlayElement);
      //     }
      //   }
      // }
    },
    moveOffcanvasToBody: function moveOffcanvasToBody() {
      var offcanvasPanel = this.$target[0];
      document.body.appendChild(offcanvasPanel);

      var overlayElement = this.opts.$overlayElement[0];
      document.body.appendChild(overlayElement);
    },
    addOffcanvasOverlayLogic: function addOffcanvasOverlayLogic() {
      var $overlayElement = this.opts.$overlayElement;
      var $offCanvasWrapper = this.$target;

      if ($offCanvasWrapper.length) {
        $overlayElement.on('scroll touchmove mousewheel', function (e) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        });

        $offCanvasWrapper.on('colibri.offcanvas.open', function () {
          $overlayElement.addClass('h-offcanvas-opened');
        });

        $offCanvasWrapper.on('colibri.offcanvas.close', function () {
          $overlayElement.removeClass('h-offcanvas-opened');
        });
      }
    },
    toggle: function toggle(e) {
      if (this.isOpened()) {
        this.close(e);
      } else {
        this.open(e);
      }
    },
    buildTargetWidth: function buildTargetWidth() {
      this.opts.width = $(window).width() < parseInt(this.opts.width) ? '100%' : this.opts.width;
    },
    buildAnimationDirection: function buildAnimationDirection() {
      if (this.opts.direction === 'right') {
        this.opts.animationOpen = 'slideInRight';
        this.opts.animationClose = 'slideOutRight';
      }
    },
    getCloseLink: function getCloseLink() {
      return this.$target.find('.close');
    },
    open: function open(e) {
      if (e) {
        e.preventDefault();
      }

      if (!this.isOpened()) {
        this.closeAll();
        this.callback('open');

        this.$target.addClass('offcanvas-' + this.opts.direction);
        this.$target.css('width', Math.min(parseInt(this.opts.width), window.innerWidth - 100));
        this.$target.css('right', '-' + Math.min(parseInt(this.opts.width), window.innerWidth - 100));

        this.pushBody();

        this.$target.trigger('colibri.offcanvas.open');
        // this.$target.animation(this.opts.animationOpen, $.proxy(this.onOpened, this));
        Colibri.animate(this.$target, this.opts.animationOpen, $.proxy(this.onOpened, this));
        this.$element.trigger('colibri.offcanvas.open');
      }
    },
    closeAll: function closeAll() {
      var $elms = $(document).find('.offcanvas');
      if ($elms.length !== 0) {
        $elms.each(function () {
          var $el = $(this);

          if ($el.hasClass('open')) {
            $el.css('width', '');
            //.animation('hide');
            Colibri.animate($el, 'hide');
            $el.removeClass('open offcanvas-left offcanvas-right');
          }
        });

        $(document).off('.' + this.namespace);
        $('body').css('left', '');
      }
    },
    close: function close(e) {
      if (e) {
        var $el = $(e.target);
        var isTag = $el[0].tagName === 'A' || $el[0].tagName === 'BUTTON' || $el.parents('a').length;
        if (isTag && $el.closest('.offcanvas').length !== 0 && !$el.hasClass('close')) {
          return;
        }

        e.preventDefault();
      }

      if (this.isOpened()) {
        // this.utils.enableBodyScroll();
        this.callback('close');
        this.pullBody();
        this.$target.trigger('colibri.offcanvas.close');
        // this.$target.animation(this.opts.animationClose, $.proxy(this.onClosed, this));
        Colibri.animate(this.$target, this.opts.animationClose, $.proxy(this.onClosed, this));
      }
    },
    isOpened: function isOpened() {
      return this.$target.hasClass('open');
    },
    onOpened: function onOpened() {
      if (this.opts.clickOutside) {
        $(document).on('click.' + this.namespace + ' tap.' + this.namespace, $.proxy(this.close, this));
      }
      if (this.detect.isMobileScreen()) {
        $('html').addClass('no-scroll');
      }

      $(document).on('keyup.' + this.namespace, $.proxy(this.handleKeyboard, this));
      this.$close.on('click.' + this.namespace, $.proxy(this.close, this));

      // this.utils.disableBodyScroll();
      this.$target.addClass('open');
      this.callback('opened');
    },
    onClosed: function onClosed() {
      if (this.detect.isMobileScreen()) {
        $('html').removeClass('no-scroll');
      }

      this.$target.css('width', '').removeClass('offcanvas-' + this.opts.direction);

      this.$close.off('.' + this.namespace);
      $(document).off('.' + this.namespace);

      this.$target.removeClass('open');
      this.callback('closed');

      this.$target.trigger('colibri.offcanvas.closed');
    },
    handleKeyboard: function handleKeyboard(e) {
      if (e.which === 27) {
        this.close();
      }
    },
    pullBody: function pullBody() {
      if (this.opts.push) {
        $('body').animate({ left: 0 }, 350, function () {
          $(this).removeClass('offcanvas-push-body');
        });
      }
    },
    pushBody: function pushBody() {
      if (this.opts.push) {
        var properties = this.opts.direction === 'left' ? { left: this.opts.width } : { left: '-' + this.opts.width };
        $('body').addClass('offcanvas-push-body').animate(properties, 200);
      }
    }
  };

  Component.inherits(Colibri);
  Colibri[className] = Component;

  Colibri.Plugin.create(className);
  Colibri.Plugin.autoload(className);
})(jQuery, Colibri);

/***/ }),
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(93);
__webpack_require__(116);
__webpack_require__(117);
__webpack_require__(118);
module.exports = __webpack_require__(119);


/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_libraries_jquery_extensions__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_libraries_detect_element_resize__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_libraries_detect_element_resize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__common_libraries_detect_element_resize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__root_static_free_masonryColibri__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__root_static_free_masonryColibri___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__root_static_free_masonryColibri__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_components_common_scripts_base___ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__kube_slideshow_customizable_slideshow__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__kube_video_background_customizable_video_background__ = __webpack_require__(103);









__WEBPACK_IMPORTED_MODULE_3__page_components_common_scripts_base___["b" /* ColibriFrontend */].registerPlugin(__WEBPACK_IMPORTED_MODULE_4__kube_slideshow_customizable_slideshow__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_3__page_components_common_scripts_base___["b" /* ColibriFrontend */].registerPlugin(__WEBPACK_IMPORTED_MODULE_5__kube_video_background_customizable_video_background__["a" /* default */]);

__WEBPACK_IMPORTED_MODULE_3__page_components_common_scripts_base___["b" /* ColibriFrontend */].getData = function (id) {
    if (window.colibriFrontendData && window.colibriFrontendData[id]) {
        return window.colibriFrontendData[id];
    }

    return {};
};

window.Colibri = __WEBPACK_IMPORTED_MODULE_3__page_components_common_scripts_base___["b" /* ColibriFrontend */];

__webpack_require__(109);
__webpack_require__(110);
__webpack_require__(65);

//
// // sticky
//
__webpack_require__(111);
__webpack_require__(112);
__webpack_require__(113);
__webpack_require__(114);
__webpack_require__(115);
__webpack_require__(65);

/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_debounce__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_debounce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_debounce__);

(function ($) {
  if (!$.throttle) {
    $.throttle = function (fn, threshhold, scope) {
      threshhold || (threshhold = 250);
      var last, deferTimer;
      return function () {
        var context = scope || this;

        var now = +new Date(),
            args = arguments;
        if (last && now < last + threshhold) {
          // hold on to it
          clearTimeout(deferTimer);
          deferTimer = setTimeout(function () {
            last = now;
            fn.apply(context, args);
          }, threshhold);
        } else {
          last = now;
          fn.apply(context, args);
        }
      };
    };
  }

  if (!$.debounce) {
    $.debounce = __WEBPACK_IMPORTED_MODULE_0_lodash_debounce___default.a;
    // $.debounce = function(func, wait, immediate) {
    //   var timeout;
    //   return function() {
    //     var context = this,
    //       args = arguments;
    //     var later = function() {
    //       timeout = null;
    //       if (!immediate) {
    //         func.apply(context, args);
    //       }
    //     };
    //     var callNow = immediate && !timeout;
    //     clearTimeout(timeout);
    //     timeout = setTimeout(later, wait);
    //     if (callNow) {
    //       func.apply(context, args);
    //     }
    //   };
    // };
  }
  if (!$.event.special.tap) {
    $.event.special.tap = {
      setup: function setup(data, namespaces) {
        var $elem = $(this);
        $elem.bind('touchstart', $.event.special.tap.handler).bind('touchmove', $.event.special.tap.handler).bind('touchend', $.event.special.tap.handler);
      },
      teardown: function teardown(namespaces) {
        var $elem = $(this);
        $elem.unbind('touchstart', $.event.special.tap.handler).unbind('touchmove', $.event.special.tap.handler).unbind('touchend', $.event.special.tap.handler);
      },
      handler: function handler(event) {
        var $elem = $(this);
        $elem.data(event.type, 1);
        if (event.type === 'touchend' && !$elem.data('touchmove')) {
          event.type = 'tap';
          $.event.handle.apply(this, arguments);
        } else if ($elem.data('touchend')) {
          $elem.removeData('touchstart touchmove touchend');
        }
      }
    };
  }
})(window.jQuery);

/***/ }),
/* 95 */
/***/ (function(module, exports) {

/**
 * Detect Element Resize
 *
 * https://github.com/sdecima/javascript-detect-element-resize
 * Sebastian Decima
 *
 * version: 0.5.3
 **/

var attachEvent = document.attachEvent,
    stylesCreated = false;

function resetTriggers(element) {
  var triggers = element.__resizeTriggers__,
      expand = triggers.firstElementChild,
      contract = triggers.lastElementChild,
      expandChild = expand.firstElementChild;
  contract.scrollLeft = contract.scrollWidth;
  contract.scrollTop = contract.scrollHeight;
  expandChild.style.width = expand.offsetWidth + 1 + 'px';
  expandChild.style.height = expand.offsetHeight + 1 + 'px';
  expand.scrollLeft = expand.scrollWidth;
  expand.scrollTop = expand.scrollHeight;
}

function checkTriggers(element) {
  return element.offsetWidth != element.__resizeLast__.width || element.offsetHeight != element.__resizeLast__.height;
}

function scrollListener(e) {
  var element = this;
  resetTriggers(this);
  if (this.__resizeRAF__) {
    cancelFrame(this.__resizeRAF__);
  }
  this.__resizeRAF__ = requestFrame(function () {
    if (checkTriggers(element)) {
      element.__resizeLast__.width = element.offsetWidth;
      element.__resizeLast__.height = element.offsetHeight;
      element.__resizeListeners__.forEach(function (fn) {
        fn.call(element, e);
      });
    }
  });
}

if (!attachEvent) {
  var requestFrame = function () {
    var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (fn) {
      return window.setTimeout(fn, 20);
    };
    return function (fn) {
      return raf(fn);
    };
  }();

  var cancelFrame = function () {
    var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;
    return function (id) {
      return cancel(id);
    };
  }();

  /* Detect CSS Animations support to detect element display/re-attach */
  var animation = false,
      animationstring = 'animation',
      keyframeprefix = '',
      animationstartevent = 'animationstart',
      domPrefixes = 'Webkit Moz O ms'.split(' '),
      startEvents = 'webkitAnimationStart animationstart oAnimationStart MSAnimationStart'.split(' '),
      pfx = '';
  {
    var elm = document.createElement('fakeelement');
    if (elm.style.animationName !== undefined) {
      animation = true;
    }

    if (animation === false) {
      for (var i = 0; i < domPrefixes.length; i++) {
        if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
          pfx = domPrefixes[i];
          animationstring = pfx + 'Animation';
          keyframeprefix = '-' + pfx.toLowerCase() + '-';
          animationstartevent = startEvents[i];
          animation = true;
          break;
        }
      }
    }
  }

  var animationName = 'resizeanim';
  var animationKeyframes = '@' + keyframeprefix + 'keyframes ' + animationName + ' { from { opacity: 0; } to { opacity: 0; } } ';
  var animationStyle = keyframeprefix + 'animation: 1ms ' + animationName + '; ';
}

function createStyles() {
  if (!stylesCreated) {
    //opacity:0 works around a chrome bug https://code.google.com/p/chromium/issues/detail?id=286360
    var css = (animationKeyframes ? animationKeyframes : '') + '.resize-triggers { ' + (animationStyle ? animationStyle : '') + 'visibility: hidden; opacity: 0; } ' + '.resize-triggers, .resize-triggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
    stylesCreated = true;
  }
}

window.addResizeListener = function (element, fn) {
  if (attachEvent) {
    element.attachEvent('onresize', fn);
  } else {
    if (!element.__resizeTriggers__) {
      if (getComputedStyle(element).position == 'static') {
        element.style.position = 'relative';
      }
      createStyles();
      element.__resizeLast__ = {};
      element.__resizeListeners__ = [];
      (element.__resizeTriggers__ = document.createElement('div')).className = 'resize-triggers';
      element.__resizeTriggers__.innerHTML = '<div class="expand-trigger"><div></div></div>' + '<div class="contract-trigger"></div>';
      element.appendChild(element.__resizeTriggers__);
      resetTriggers(element);
      element.addEventListener('scroll', scrollListener, true);

      /* Listen for a css animation to detect element display/re-attach */
      animationstartevent && element.__resizeTriggers__.addEventListener(animationstartevent, function (e) {
        if (e.animationName == animationName) {
          resetTriggers(element);
        }
      });
    }
    element.__resizeListeners__.push(fn);
  }
};

window.removeResizeListener = function (element, fn) {
  if (attachEvent) {
    element.detachEvent('onresize', fn);
  } else {
    if (!(element && element.__resizeListeners__ && element.__resizeTriggers__)) {
      return;
    }
    element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
    if (!element.__resizeListeners__.length) {
      element.removeEventListener('scroll', scrollListener);
      element.__resizeTriggers__ = !element.removeChild(element.__resizeTriggers__);
    }
  }
};

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_LOCAL_MODULE_2__, __WEBPACK_LOCAL_MODULE_2__factory, __WEBPACK_LOCAL_MODULE_2__module;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_4__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_LOCAL_MODULE_5__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Masonry PACKAGED v4.2.2
 * Cascading grid layout library
 * https://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

/**
 * Bridget makes jQuery widgets
 * v2.0.1
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */

(function (window, factory) {
  // universal module definition
  /*jshint strict: false */ /* globals define, module, require */
  if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(24)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (jQuery) {
      return factory(window, jQuery);
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) == 'object' && module.exports) {
    // CommonJS
    module.exports = factory(window, require('jquery'));
  } else {
    // browser global
    window.jQueryBridget = factory(window, window.jQuery);
  }
})(window, function factory(window, jQuery) {
  'use strict';

  // ----- utils ----- //

  var arraySlice = Array.prototype.slice;

  // helper function for logging errors
  // $.error breaks jQuery chaining
  var console = window.console;
  var logError = typeof console == 'undefined' ? function () {} : function (message) {
    console.error(message);
  };

  // ----- jQueryBridget ----- //

  function jQueryBridget(namespace, PluginClass, $) {
    $ = $ || jQuery || window.jQuery;
    if (!$) {
      return;
    }

    // add option method -> $().plugin('option', {...})
    if (!PluginClass.prototype.option) {
      // option setter
      PluginClass.prototype.option = function (opts) {
        // bail out if not an object
        if (!$.isPlainObject(opts)) {
          return;
        }
        this.options = $.extend(true, this.options, opts);
      };
    }

    // make jQuery plugin
    $.fn[namespace] = function (arg0 /*, arg1 */) {
      if (typeof arg0 == 'string') {
        // method call $().plugin( 'methodName', { options } )
        // shift arguments by 1
        var args = arraySlice.call(arguments, 1);
        return methodCall(this, arg0, args);
      }
      // just $().plugin({ options })
      plainCall(this, arg0);
      return this;
    };

    // $().plugin('methodName')
    function methodCall($elems, methodName, args) {
      var returnValue;
      var pluginMethodStr = '$().' + namespace + '("' + methodName + '")';

      $elems.each(function (i, elem) {
        // get instance
        var instance = $.data(elem, namespace);
        if (!instance) {
          logError(namespace + ' not initialized. Cannot call methods, i.e. ' + pluginMethodStr);
          return;
        }

        var method = instance[methodName];
        if (!method || methodName.charAt(0) == '_') {
          logError(pluginMethodStr + ' is not a valid method');
          return;
        }

        // apply method, get return value
        var value = method.apply(instance, args);
        // set return value if value is returned, use only first value
        returnValue = returnValue === undefined ? value : returnValue;
      });

      return returnValue !== undefined ? returnValue : $elems;
    }

    function plainCall($elems, options) {
      $elems.each(function (i, elem) {
        var instance = $.data(elem, namespace);
        if (instance) {
          // set options & init
          instance.option(options);
          instance._init();
        } else {
          // initialize new instance
          instance = new PluginClass(elem, options);
          $.data(elem, namespace, instance);
        }
      });
    }

    updateJQuery($);
  }

  // ----- updateJQuery ----- //

  // set $.bridget for v1 backwards compatibility
  function updateJQuery($) {
    if (!$ || $ && $.bridget) {
      return;
    }
    $.bridget = jQueryBridget;
  }

  updateJQuery(jQuery || window.jQuery);

  // -----  ----- //

  return jQueryBridget;
});

/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

(function (global, factory) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if (true) {
    // AMD - RequireJS
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) == 'object' && module.exports) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }
})(typeof window != 'undefined' ? window : this, function () {

  function EvEmitter() {}

  var proto = EvEmitter.prototype;

  proto.on = function (eventName, listener) {
    if (!eventName || !listener) {
      return;
    }
    // set events hash
    var events = this._events = this._events || {};
    // set listeners array
    var listeners = events[eventName] = events[eventName] || [];
    // only add once
    if (listeners.indexOf(listener) == -1) {
      listeners.push(listener);
    }

    return this;
  };

  proto.once = function (eventName, listener) {
    if (!eventName || !listener) {
      return;
    }
    // add event
    this.on(eventName, listener);
    // set once flag
    // set onceEvents hash
    var onceEvents = this._onceEvents = this._onceEvents || {};
    // set onceListeners object
    var onceListeners = onceEvents[eventName] = onceEvents[eventName] || {};
    // set flag
    onceListeners[listener] = true;

    return this;
  };

  proto.off = function (eventName, listener) {
    var listeners = this._events && this._events[eventName];
    if (!listeners || !listeners.length) {
      return;
    }
    var index = listeners.indexOf(listener);
    if (index != -1) {
      listeners.splice(index, 1);
    }

    return this;
  };

  proto.emitEvent = function (eventName, args) {
    var listeners = this._events && this._events[eventName];
    if (!listeners || !listeners.length) {
      return;
    }
    // copy over to avoid interference if .off() in listener
    listeners = listeners.slice(0);
    args = args || [];
    // once stuff
    var onceListeners = this._onceEvents && this._onceEvents[eventName];

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      var isOnce = onceListeners && onceListeners[listener];
      if (isOnce) {
        // remove listener
        // remove before trigger to prevent recursion
        this.off(eventName, listener);
        // unset once flag
        delete onceListeners[listener];
      }
      // trigger listener
      listener.apply(this, args);
    }

    return this;
  };

  proto.allOff = function () {
    delete this._events;
    delete this._onceEvents;
  };

  return EvEmitter;
});

/*!
 * getSize v2.0.3
 * measure size of elements
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */
/* globals console: false */

(function (window, factory) {
  /* jshint strict: false */ /* globals define, module */
  if (true) {
    // AMD
    !(__WEBPACK_LOCAL_MODULE_2__factory = (factory), (__WEBPACK_LOCAL_MODULE_2__module = { id: "get-size/get-size", exports: {}, loaded: false }), __WEBPACK_LOCAL_MODULE_2__ = (typeof __WEBPACK_LOCAL_MODULE_2__factory === 'function' ? (__WEBPACK_LOCAL_MODULE_2__factory.call(__WEBPACK_LOCAL_MODULE_2__module.exports, __webpack_require__, __WEBPACK_LOCAL_MODULE_2__module.exports, __WEBPACK_LOCAL_MODULE_2__module)) : __WEBPACK_LOCAL_MODULE_2__factory), (__WEBPACK_LOCAL_MODULE_2__module.loaded = true), __WEBPACK_LOCAL_MODULE_2__ === undefined && (__WEBPACK_LOCAL_MODULE_2__ = __WEBPACK_LOCAL_MODULE_2__module.exports));
  } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) == 'object' && module.exports) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.getSize = factory();
  }
})(window, function factory() {
  'use strict';

  // -------------------------- helpers -------------------------- //

  // get a number from a string, not a percentage

  function getStyleSize(value) {
    var num = parseFloat(value);
    // not a percent like '100%', and a number
    var isValid = value.indexOf('%') == -1 && !isNaN(num);
    return isValid && num;
  }

  function noop() {}

  var logError = typeof console == 'undefined' ? noop : function (message) {
    console.error(message);
  };

  // -------------------------- measurements -------------------------- //

  var measurements = ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom', 'marginLeft', 'marginRight', 'marginTop', 'marginBottom', 'borderLeftWidth', 'borderRightWidth', 'borderTopWidth', 'borderBottomWidth'];

  var measurementsLength = measurements.length;

  function getZeroSize() {
    var size = {
      width: 0,
      height: 0,
      innerWidth: 0,
      innerHeight: 0,
      outerWidth: 0,
      outerHeight: 0
    };
    for (var i = 0; i < measurementsLength; i++) {
      var measurement = measurements[i];
      size[measurement] = 0;
    }
    return size;
  }

  // -------------------------- getStyle -------------------------- //

  /**
   * getStyle, get style of element, check for Firefox bug
   * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
   */
  function getStyle(elem) {
    var style = getComputedStyle(elem);
    if (!style) {
      logError('Style returned ' + style + '. Are you running this code in a hidden iframe on Firefox? ' + 'See https://bit.ly/getsizebug1');
    }
    return style;
  }

  // -------------------------- setup -------------------------- //

  var isSetup = false;

  var isBoxSizeOuter;

  /**
   * setup
   * check isBoxSizerOuter
   * do on first getSize() rather than on page load for Firefox bug
   */
  function setup() {
    // setup once
    if (isSetup) {
      return;
    }
    isSetup = true;

    // -------------------------- box sizing -------------------------- //

    /**
     * Chrome & Safari measure the outer-width on style.width on border-box elems
     * IE11 & Firefox<29 measures the inner-width
     */
    var div = document.createElement('div');
    div.style.width = '200px';
    div.style.padding = '1px 2px 3px 4px';
    div.style.borderStyle = 'solid';
    div.style.borderWidth = '1px 2px 3px 4px';
    div.style.boxSizing = 'border-box';

    var body = document.body || document.documentElement;
    body.appendChild(div);
    var style = getStyle(div);
    // round value for browser zoom. desandro/masonry#928
    isBoxSizeOuter = Math.round(getStyleSize(style.width)) == 200;
    getSize.isBoxSizeOuter = isBoxSizeOuter;

    body.removeChild(div);
  }

  // -------------------------- getSize -------------------------- //

  function getSize(elem) {
    setup();

    // use querySeletor if elem is string
    if (typeof elem == 'string') {
      elem = document.querySelector(elem);
    }

    // do not proceed on non-objects
    if (!elem || (typeof elem === 'undefined' ? 'undefined' : _typeof(elem)) != 'object' || !elem.nodeType) {
      return;
    }

    var style = getStyle(elem);

    // if hidden, everything is 0
    if (style.display == 'none') {
      return getZeroSize();
    }

    var size = {};
    size.width = elem.offsetWidth;
    size.height = elem.offsetHeight;

    var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

    // get all measurements
    for (var i = 0; i < measurementsLength; i++) {
      var measurement = measurements[i];
      var value = style[measurement];
      var num = parseFloat(value);
      // any 'auto', 'medium' value will be 0
      size[measurement] = !isNaN(num) ? num : 0;
    }

    var paddingWidth = size.paddingLeft + size.paddingRight;
    var paddingHeight = size.paddingTop + size.paddingBottom;
    var marginWidth = size.marginLeft + size.marginRight;
    var marginHeight = size.marginTop + size.marginBottom;
    var borderWidth = size.borderLeftWidth + size.borderRightWidth;
    var borderHeight = size.borderTopWidth + size.borderBottomWidth;

    var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

    // overwrite width and height if we can get it from style
    var styleWidth = getStyleSize(style.width);
    if (styleWidth !== false) {
      size.width = styleWidth + (
      // add padding and border unless it's already including it
      isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth);
    }

    var styleHeight = getStyleSize(style.height);
    if (styleHeight !== false) {
      size.height = styleHeight + (
      // add padding and border unless it's already including it
      isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight);
    }

    size.innerWidth = size.width - (paddingWidth + borderWidth);
    size.innerHeight = size.height - (paddingHeight + borderHeight);

    size.outerWidth = size.width + marginWidth;
    size.outerHeight = size.height + marginHeight;

    return size;
  }

  return getSize;
});

/**
 * matchesSelector v2.0.2
 * matchesSelector( element, '.selector' )
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

(function (window, factory) {
  /*global define: false, module: false */
  'use strict';
  // universal module definition

  if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) == 'object' && module.exports) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.matchesSelector = factory();
  }
})(window, function factory() {
  'use strict';

  var matchesMethod = function () {
    var ElemProto = window.Element.prototype;
    // check for the standard method name first
    if (ElemProto.matches) {
      return 'matches';
    }
    // check un-prefixed
    if (ElemProto.matchesSelector) {
      return 'matchesSelector';
    }
    // check vendor prefixes
    var prefixes = ['webkit', 'moz', 'ms', 'o'];

    for (var i = 0; i < prefixes.length; i++) {
      var prefix = prefixes[i];
      var method = prefix + 'MatchesSelector';
      if (ElemProto[method]) {
        return method;
      }
    }
  }();

  return function matchesSelector(elem, selector) {
    return elem[matchesMethod](selector);
  };
});

/**
 * Fizzy UI utils v2.0.7
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

(function (window, factory) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(61)], __WEBPACK_LOCAL_MODULE_4__ = ((function (matchesSelector) {
      return factory(window, matchesSelector);
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)));
  } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) == 'object' && module.exports) {
    // CommonJS
    module.exports = factory(window, require('desandro-matches-selector'));
  } else {
    // browser global
    window.fizzyUIUtils = factory(window, window.matchesSelector);
  }
})(window, function factory(window, matchesSelector) {

  var utils = {};

  // ----- extend ----- //

  // extends objects
  utils.extend = function (a, b) {
    for (var prop in b) {
      a[prop] = b[prop];
    }
    return a;
  };

  // ----- modulo ----- //

  utils.modulo = function (num, div) {
    return (num % div + div) % div;
  };

  // ----- makeArray ----- //

  var arraySlice = Array.prototype.slice;

  // turn element or nodeList into an array
  utils.makeArray = function (obj) {
    if (Array.isArray(obj)) {
      // use object if already an array
      return obj;
    }
    // return empty array if undefined or null. #6
    if (obj === null || obj === undefined) {
      return [];
    }

    var isArrayLike = (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) == 'object' && typeof obj.length == 'number';
    if (isArrayLike) {
      // convert nodeList to array
      return arraySlice.call(obj);
    }

    // array of single index
    return [obj];
  };

  // ----- removeFrom ----- //

  utils.removeFrom = function (ary, obj) {
    var index = ary.indexOf(obj);
    if (index != -1) {
      ary.splice(index, 1);
    }
  };

  // ----- getParent ----- //

  utils.getParent = function (elem, selector) {
    while (elem.parentNode && elem != document.body) {
      elem = elem.parentNode;
      if (matchesSelector(elem, selector)) {
        return elem;
      }
    }
  };

  // ----- getQueryElement ----- //

  // use element as selector string
  utils.getQueryElement = function (elem) {
    if (typeof elem == 'string') {
      return document.querySelector(elem);
    }
    return elem;
  };

  // ----- handleEvent ----- //

  // enable .ontype to trigger from .addEventListener( elem, 'type' )
  utils.handleEvent = function (event) {
    var method = 'on' + event.type;
    if (this[method]) {
      this[method](event);
    }
  };

  // ----- filterFindElements ----- //

  utils.filterFindElements = function (elems, selector) {
    // make array of elems
    elems = utils.makeArray(elems);
    var ffElems = [];

    elems.forEach(function (elem) {
      // check that elem is an actual element
      if (!(elem instanceof HTMLElement)) {
        return;
      }
      // add elem if no selector
      if (!selector) {
        ffElems.push(elem);
        return;
      }
      // filter & find items if we have a selector
      // filter
      if (matchesSelector(elem, selector)) {
        ffElems.push(elem);
      }
      // find children
      var childElems = elem.querySelectorAll(selector);
      // concat childElems to filterFound array
      for (var i = 0; i < childElems.length; i++) {
        ffElems.push(childElems[i]);
      }
    });

    return ffElems;
  };

  // ----- debounceMethod ----- //

  utils.debounceMethod = function (_class, methodName, threshold) {
    threshold = threshold || 100;
    // original method
    var method = _class.prototype[methodName];
    var timeoutName = methodName + 'Timeout';

    _class.prototype[methodName] = function () {
      var timeout = this[timeoutName];
      clearTimeout(timeout);

      var args = arguments;
      var _this = this;
      this[timeoutName] = setTimeout(function () {
        method.apply(_this, args);
        delete _this[timeoutName];
      }, threshold);
    };
  };

  // ----- docReady ----- //

  utils.docReady = function (callback) {
    var readyState = document.readyState;
    if (readyState == 'complete' || readyState == 'interactive') {
      // do async to allow for other scripts to run. metafizzy/flickity#441
      setTimeout(callback);
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  };

  // ----- htmlInit ----- //

  // http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
  utils.toDashed = function (str) {
    return str.replace(/(.)([A-Z])/g, function (match, $1, $2) {
      return $1 + '-' + $2;
    }).toLowerCase();
  };

  var console = window.console;
  /**
   * allow user to initialize classes via [data-namespace] or .js-namespace class
   * htmlInit( Widget, 'widgetName' )
   * options are parsed from data-namespace-options
   */
  utils.htmlInit = function (WidgetClass, namespace) {
    utils.docReady(function () {
      var dashedNamespace = utils.toDashed(namespace);
      var dataAttr = 'data-' + dashedNamespace;
      var dataAttrElems = document.querySelectorAll('[' + dataAttr + ']');
      var jsDashElems = document.querySelectorAll('.js-' + dashedNamespace);
      var elems = utils.makeArray(dataAttrElems).concat(utils.makeArray(jsDashElems));
      var dataOptionsAttr = dataAttr + '-options';
      var jQuery = window.jQuery;

      elems.forEach(function (elem) {
        var attr = elem.getAttribute(dataAttr) || elem.getAttribute(dataOptionsAttr);
        var options;
        try {
          options = attr && JSON.parse(attr);
        } catch (error) {
          // log error, do not initialize
          if (console) {
            console.error('Error parsing ' + dataAttr + ' on ' + elem.className + ': ' + error);
          }
          return;
        }
        // initialize
        var instance = new WidgetClass(elem, options);
        // make available via $().data('namespace')
        if (jQuery) {
          jQuery.data(elem, namespace, instance);
        }
      });
    });
  };

  // -----  ----- //

  return utils;
});

/**
 * Outlayer Item
 */

(function (window, factory) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, require */
  if (true) {
    // AMD - RequireJS
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(25), __WEBPACK_LOCAL_MODULE_2__], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_LOCAL_MODULE_5__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__));
  } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) == 'object' && module.exports) {
    // CommonJS - Browserify, Webpack
    module.exports = factory(require('ev-emitter'), require('get-size'));
  } else {
    // browser global
    window.Outlayer = {};
    window.Outlayer.Item = factory(window.EvEmitter, window.getSize);
  }
})(window, function factory(EvEmitter, getSize) {
  'use strict';

  // ----- helpers ----- //

  function isEmptyObj(obj) {
    for (var prop in obj) {
      return false;
    }
    prop = null;
    return true;
  }

  // -------------------------- CSS3 support -------------------------- //


  var docElemStyle = document.documentElement.style;

  var transitionProperty = typeof docElemStyle.transition == 'string' ? 'transition' : 'WebkitTransition';
  var transformProperty = typeof docElemStyle.transform == 'string' ? 'transform' : 'WebkitTransform';

  var transitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    transition: 'transitionend'
  }[transitionProperty];

  // cache all vendor properties that could have vendor prefix
  var vendorProperties = {
    transform: transformProperty,
    transition: transitionProperty,
    transitionDuration: transitionProperty + 'Duration',
    transitionProperty: transitionProperty + 'Property',
    transitionDelay: transitionProperty + 'Delay'
  };

  // -------------------------- Item -------------------------- //

  function Item(element, layout) {
    if (!element) {
      return;
    }

    this.element = element;
    // parent layout class, i.e. Masonry, Isotope, or Packery
    this.layout = layout;
    this.position = {
      x: 0,
      y: 0
    };

    this._create();
  }

  // inherit EvEmitter
  var proto = Item.prototype = Object.create(EvEmitter.prototype);
  proto.constructor = Item;

  proto._create = function () {
    // transition objects
    this._transn = {
      ingProperties: {},
      clean: {},
      onEnd: {}
    };

    this.css({
      position: 'absolute'
    });
  };

  // trigger specified handler for event type
  proto.handleEvent = function (event) {
    var method = 'on' + event.type;
    if (this[method]) {
      this[method](event);
    }
  };

  proto.getSize = function () {
    this.size = getSize(this.element);
  };

  /**
   * apply CSS styles to element
   * @param {Object} style
   */
  proto.css = function (style) {
    var elemStyle = this.element.style;

    for (var prop in style) {
      // use vendor property if available
      var supportedProp = vendorProperties[prop] || prop;
      elemStyle[supportedProp] = style[prop];
    }
  };

  // measure position, and sets it
  proto.getPosition = function () {
    var style = getComputedStyle(this.element);
    var isOriginLeft = this.layout._getOption('originLeft');
    var isOriginTop = this.layout._getOption('originTop');
    var xValue = style[isOriginLeft ? 'left' : 'right'];
    var yValue = style[isOriginTop ? 'top' : 'bottom'];
    var x = parseFloat(xValue);
    var y = parseFloat(yValue);
    // convert percent to pixels
    var layoutSize = this.layout.size;
    if (xValue.indexOf('%') != -1) {
      x = x / 100 * layoutSize.width;
    }
    if (yValue.indexOf('%') != -1) {
      y = y / 100 * layoutSize.height;
    }
    // clean up 'auto' or other non-integer values
    x = isNaN(x) ? 0 : x;
    y = isNaN(y) ? 0 : y;
    // remove padding from measurement
    x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
    y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;

    this.position.x = x;
    this.position.y = y;
  };

  // set settled position, apply padding
  proto.layoutPosition = function () {
    var layoutSize = this.layout.size;
    var style = {};
    var isOriginLeft = this.layout._getOption('originLeft');
    var isOriginTop = this.layout._getOption('originTop');

    // x
    var xPadding = isOriginLeft ? 'paddingLeft' : 'paddingRight';
    var xProperty = isOriginLeft ? 'left' : 'right';
    var xResetProperty = isOriginLeft ? 'right' : 'left';

    var x = this.position.x + layoutSize[xPadding];
    // set in percentage or pixels
    style[xProperty] = this.getXValue(x);
    // reset other property
    style[xResetProperty] = '';

    // y
    var yPadding = isOriginTop ? 'paddingTop' : 'paddingBottom';
    var yProperty = isOriginTop ? 'top' : 'bottom';
    var yResetProperty = isOriginTop ? 'bottom' : 'top';

    var y = this.position.y + layoutSize[yPadding];
    // set in percentage or pixels
    style[yProperty] = this.getYValue(y);
    // reset other property
    style[yResetProperty] = '';

    this.css(style);
    this.emitEvent('layout', [this]);
  };

  proto.getXValue = function (x) {
    var isHorizontal = this.layout._getOption('horizontal');
    return this.layout.options.percentPosition && !isHorizontal ? x / this.layout.size.width * 100 + '%' : x + 'px';
  };

  proto.getYValue = function (y) {
    var isHorizontal = this.layout._getOption('horizontal');
    return this.layout.options.percentPosition && isHorizontal ? y / this.layout.size.height * 100 + '%' : y + 'px';
  };

  proto._transitionTo = function (x, y) {
    this.getPosition();
    // get current x & y from top/left
    var curX = this.position.x;
    var curY = this.position.y;

    var didNotMove = x == this.position.x && y == this.position.y;

    // save end position
    this.setPosition(x, y);

    // if did not move and not transitioning, just go to layout
    if (didNotMove && !this.isTransitioning) {
      this.layoutPosition();
      return;
    }

    var transX = x - curX;
    var transY = y - curY;
    var transitionStyle = {};
    transitionStyle.transform = this.getTranslate(transX, transY);

    this.transition({
      to: transitionStyle,
      onTransitionEnd: {
        transform: this.layoutPosition
      },
      isCleaning: true
    });
  };

  proto.getTranslate = function (x, y) {
    // flip cooridinates if origin on right or bottom
    var isOriginLeft = this.layout._getOption('originLeft');
    var isOriginTop = this.layout._getOption('originTop');
    x = isOriginLeft ? x : -x;
    y = isOriginTop ? y : -y;
    return 'translate3d(' + x + 'px, ' + y + 'px, 0)';
  };

  // non transition + transform support
  proto.goTo = function (x, y) {
    this.setPosition(x, y);
    this.layoutPosition();
  };

  proto.moveTo = proto._transitionTo;

  proto.setPosition = function (x, y) {
    this.position.x = parseFloat(x);
    this.position.y = parseFloat(y);
  };

  // ----- transition ----- //

  /**
   * @param {Object} style - CSS
   * @param {Function} onTransitionEnd
   */

  // non transition, just trigger callback
  proto._nonTransition = function (args) {
    this.css(args.to);
    if (args.isCleaning) {
      this._removeStyles(args.to);
    }
    for (var prop in args.onTransitionEnd) {
      args.onTransitionEnd[prop].call(this);
    }
  };

  /**
   * proper transition
   * @param {Object} args - arguments
   *   @param {Object} to - style to transition to
   *   @param {Object} from - style to start transition from
   *   @param {Boolean} isCleaning - removes transition styles after transition
   *   @param {Function} onTransitionEnd - callback
   */
  proto.transition = function (args) {
    // redirect to nonTransition if no transition duration
    if (!parseFloat(this.layout.options.transitionDuration)) {
      this._nonTransition(args);
      return;
    }

    var _transition = this._transn;
    // keep track of onTransitionEnd callback by css property
    for (var prop in args.onTransitionEnd) {
      _transition.onEnd[prop] = args.onTransitionEnd[prop];
    }
    // keep track of properties that are transitioning
    for (prop in args.to) {
      _transition.ingProperties[prop] = true;
      // keep track of properties to clean up when transition is done
      if (args.isCleaning) {
        _transition.clean[prop] = true;
      }
    }

    // set from styles
    if (args.from) {
      this.css(args.from);
      // force redraw. http://blog.alexmaccaw.com/css-transitions
      var h = this.element.offsetHeight;
      // hack for JSHint to hush about unused var
      h = null;
    }
    // enable transition
    this.enableTransition(args.to);
    // set styles that are transitioning
    this.css(args.to);

    this.isTransitioning = true;
  };

  // dash before all cap letters, including first for
  // WebkitTransform => -webkit-transform
  function toDashedAll(str) {
    return str.replace(/([A-Z])/g, function ($1) {
      return '-' + $1.toLowerCase();
    });
  }

  var transitionProps = 'opacity,' + toDashedAll(transformProperty);

  proto.enableTransition = function () /* style */{
    // HACK changing transitionProperty during a transition
    // will cause transition to jump
    if (this.isTransitioning) {
      return;
    }

    // make `transition: foo, bar, baz` from style object
    // HACK un-comment this when enableTransition can work
    // while a transition is happening
    // var transitionValues = [];
    // for ( var prop in style ) {
    //   // dash-ify camelCased properties like WebkitTransition
    //   prop = vendorProperties[ prop ] || prop;
    //   transitionValues.push( toDashedAll( prop ) );
    // }
    // munge number to millisecond, to match stagger
    var duration = this.layout.options.transitionDuration;
    duration = typeof duration == 'number' ? duration + 'ms' : duration;
    // enable transition styles
    this.css({
      transitionProperty: transitionProps,
      transitionDuration: duration,
      transitionDelay: this.staggerDelay || 0
    });
    // listen for transition end event
    this.element.addEventListener(transitionEndEvent, this, false);
  };

  // ----- events ----- //

  proto.onwebkitTransitionEnd = function (event) {
    this.ontransitionend(event);
  };

  proto.onotransitionend = function (event) {
    this.ontransitionend(event);
  };

  // properties that I munge to make my life easier
  var dashedVendorProperties = {
    '-webkit-transform': 'transform'
  };

  proto.ontransitionend = function (event) {
    // disregard bubbled events from children
    if (event.target !== this.element) {
      return;
    }
    var _transition = this._transn;
    // get property name of transitioned property, convert to prefix-free
    var propertyName = dashedVendorProperties[event.propertyName] || event.propertyName;

    // remove property that has completed transitioning
    delete _transition.ingProperties[propertyName];
    // check if any properties are still transitioning
    if (isEmptyObj(_transition.ingProperties)) {
      // all properties have completed transitioning
      this.disableTransition();
    }
    // clean style
    if (propertyName in _transition.clean) {
      // clean up style
      this.element.style[event.propertyName] = '';
      delete _transition.clean[propertyName];
    }
    // trigger onTransitionEnd callback
    if (propertyName in _transition.onEnd) {
      var onTransitionEnd = _transition.onEnd[propertyName];
      onTransitionEnd.call(this);
      delete _transition.onEnd[propertyName];
    }

    this.emitEvent('transitionEnd', [this]);
  };

  proto.disableTransition = function () {
    this.removeTransitionStyles();
    this.element.removeEventListener(transitionEndEvent, this, false);
    this.isTransitioning = false;
  };

  /**
   * removes style property from element
   * @param {Object} style
  **/
  proto._removeStyles = function (style) {
    // clean up transition styles
    var cleanStyle = {};
    for (var prop in style) {
      cleanStyle[prop] = '';
    }
    this.css(cleanStyle);
  };

  var cleanTransitionStyle = {
    transitionProperty: '',
    transitionDuration: '',
    transitionDelay: ''
  };

  proto.removeTransitionStyles = function () {
    // remove transition
    this.css(cleanTransitionStyle);
  };

  // ----- stagger ----- //

  proto.stagger = function (delay) {
    delay = isNaN(delay) ? 0 : delay;
    this.staggerDelay = delay + 'ms';
  };

  // ----- show/hide/remove ----- //

  // remove element from DOM
  proto.removeElem = function () {
    this.element.parentNode.removeChild(this.element);
    // remove display: none
    this.css({ display: '' });
    this.emitEvent('remove', [this]);
  };

  proto.remove = function () {
    // just remove element if no transition support or no transition
    if (!transitionProperty || !parseFloat(this.layout.options.transitionDuration)) {
      this.removeElem();
      return;
    }

    // start transition
    this.once('transitionEnd', function () {
      this.removeElem();
    });
    this.hide();
  };

  proto.reveal = function () {
    delete this.isHidden;
    // remove display: none
    this.css({ display: '' });

    var options = this.layout.options;

    var onTransitionEnd = {};
    var transitionEndProperty = this.getHideRevealTransitionEndProperty('visibleStyle');
    onTransitionEnd[transitionEndProperty] = this.onRevealTransitionEnd;

    this.transition({
      from: options.hiddenStyle,
      to: options.visibleStyle,
      isCleaning: true,
      onTransitionEnd: onTransitionEnd
    });
  };

  proto.onRevealTransitionEnd = function () {
    // check if still visible
    // during transition, item may have been hidden
    if (!this.isHidden) {
      this.emitEvent('reveal');
    }
  };

  /**
   * get style property use for hide/reveal transition end
   * @param {String} styleProperty - hiddenStyle/visibleStyle
   * @returns {String}
   */
  proto.getHideRevealTransitionEndProperty = function (styleProperty) {
    var optionStyle = this.layout.options[styleProperty];
    // use opacity
    if (optionStyle.opacity) {
      return 'opacity';
    }
    // get first property
    for (var prop in optionStyle) {
      return prop;
    }
  };

  proto.hide = function () {
    // set flag
    this.isHidden = true;
    // remove display: none
    this.css({ display: '' });

    var options = this.layout.options;

    var onTransitionEnd = {};
    var transitionEndProperty = this.getHideRevealTransitionEndProperty('hiddenStyle');
    onTransitionEnd[transitionEndProperty] = this.onHideTransitionEnd;

    this.transition({
      from: options.visibleStyle,
      to: options.hiddenStyle,
      // keep hidden stuff hidden
      isCleaning: true,
      onTransitionEnd: onTransitionEnd
    });
  };

  proto.onHideTransitionEnd = function () {
    // check if still hidden
    // during transition, item may have been un-hidden
    if (this.isHidden) {
      this.css({ display: 'none' });
      this.emitEvent('hide');
    }
  };

  proto.destroy = function () {
    this.css({
      position: '',
      left: '',
      right: '',
      top: '',
      bottom: '',
      transition: '',
      transform: ''
    });
  };

  return Item;
});

/*!
 * Outlayer v2.1.1
 * the brains and guts of a layout library
 * MIT license
 */

(function (window, factory) {
  'use strict';
  // universal module definition
  /* jshint strict: false */ /* globals define, module, require */

  if (true) {
    // AMD - RequireJS
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(25), __WEBPACK_LOCAL_MODULE_2__, __WEBPACK_LOCAL_MODULE_4__, __WEBPACK_LOCAL_MODULE_5__], __WEBPACK_AMD_DEFINE_RESULT__ = (function (EvEmitter, getSize, utils, Item) {
      return factory(window, EvEmitter, getSize, utils, Item);
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) == 'object' && module.exports) {
    // CommonJS - Browserify, Webpack
    module.exports = factory(window, require('ev-emitter'), require('get-size'), require('fizzy-ui-utils'), require('./item'));
  } else {
    // browser global
    window.Outlayer = factory(window, window.EvEmitter, window.getSize, window.fizzyUIUtils, window.Outlayer.Item);
  }
})(window, function factory(window, EvEmitter, getSize, utils, Item) {
  'use strict';

  // ----- vars ----- //

  var console = window.console;
  var jQuery = window.jQuery;
  var noop = function noop() {};

  // -------------------------- Outlayer -------------------------- //

  // globally unique identifiers
  var GUID = 0;
  // internal store of all Outlayer intances
  var instances = {};

  /**
   * @param {Element, String} element
   * @param {Object} options
   * @constructor
   */
  function Outlayer(element, options) {
    var queryElement = utils.getQueryElement(element);
    if (!queryElement) {
      if (console) {
        console.error('Bad element for ' + this.constructor.namespace + ': ' + (queryElement || element));
      }
      return;
    }
    this.element = queryElement;
    // add jQuery
    if (jQuery) {
      this.$element = jQuery(this.element);
    }

    // options
    this.options = utils.extend({}, this.constructor.defaults);
    this.option(options);

    // add id for Outlayer.getFromElement
    var id = ++GUID;
    this.element.outlayerGUID = id; // expando
    instances[id] = this; // associate via id

    // kick it off
    this._create();

    var isInitLayout = this._getOption('initLayout');
    if (isInitLayout) {
      this.layout();
    }
  }

  // settings are for internal use only
  Outlayer.namespace = 'outlayer';
  Outlayer.Item = Item;

  // default options
  Outlayer.defaults = {
    containerStyle: {
      position: 'relative'
    },
    initLayout: true,
    originLeft: true,
    originTop: true,
    resize: true,
    resizeContainer: true,
    // item options
    transitionDuration: '0.4s',
    hiddenStyle: {
      opacity: 0,
      transform: 'scale(0.001)'
    },
    visibleStyle: {
      opacity: 1,
      transform: 'scale(1)'
    }
  };

  var proto = Outlayer.prototype;
  // inherit EvEmitter
  utils.extend(proto, EvEmitter.prototype);

  /**
   * set options
   * @param {Object} opts
   */
  proto.option = function (opts) {
    utils.extend(this.options, opts);
  };

  /**
   * get backwards compatible option value, check old name
   */
  proto._getOption = function (option) {
    var oldOption = this.constructor.compatOptions[option];
    return oldOption && this.options[oldOption] !== undefined ? this.options[oldOption] : this.options[option];
  };

  Outlayer.compatOptions = {
    // currentName: oldName
    initLayout: 'isInitLayout',
    horizontal: 'isHorizontal',
    layoutInstant: 'isLayoutInstant',
    originLeft: 'isOriginLeft',
    originTop: 'isOriginTop',
    resize: 'isResizeBound',
    resizeContainer: 'isResizingContainer'
  };

  proto._create = function () {
    // get items from children
    this.reloadItems();
    // elements that affect layout, but are not laid out
    this.stamps = [];
    this.stamp(this.options.stamp);
    // set container style
    utils.extend(this.element.style, this.options.containerStyle);

    // bind resize method
    var canBindResize = this._getOption('resize');
    if (canBindResize) {
      this.bindResize();
    }
  };

  // goes through all children again and gets bricks in proper order
  proto.reloadItems = function () {
    // collection of item elements
    this.items = this._itemize(this.element.children);
  };

  /**
   * turn elements into Outlayer.Items to be used in layout
   * @param {Array or NodeList or HTMLElement} elems
   * @returns {Array} items - collection of new Outlayer Items
   */
  proto._itemize = function (elems) {

    var itemElems = this._filterFindItemElements(elems);
    var Item = this.constructor.Item;

    // create new Outlayer Items for collection
    var items = [];
    for (var i = 0; i < itemElems.length; i++) {
      var elem = itemElems[i];
      var item = new Item(elem, this);
      items.push(item);
    }

    return items;
  };

  /**
   * get item elements to be used in layout
   * @param {Array or NodeList or HTMLElement} elems
   * @returns {Array} items - item elements
   */
  proto._filterFindItemElements = function (elems) {
    return utils.filterFindElements(elems, this.options.itemSelector);
  };

  /**
   * getter method for getting item elements
   * @returns {Array} elems - collection of item elements
   */
  proto.getItemElements = function () {
    return this.items.map(function (item) {
      return item.element;
    });
  };

  // ----- init & layout ----- //

  /**
   * lays out all items
   */
  proto.layout = function () {
    this._resetLayout();
    this._manageStamps();

    // don't animate first layout
    var layoutInstant = this._getOption('layoutInstant');
    var isInstant = layoutInstant !== undefined ? layoutInstant : !this._isLayoutInited;
    this.layoutItems(this.items, isInstant);

    // flag for initalized
    this._isLayoutInited = true;
  };

  // _init is alias for layout
  proto._init = proto.layout;

  /**
   * logic before any new layout
   */
  proto._resetLayout = function () {
    this.getSize();
  };

  proto.getSize = function () {
    this.size = getSize(this.element);
  };

  /**
   * get measurement from option, for columnWidth, rowHeight, gutter
   * if option is String -> get element from selector string, & get size of element
   * if option is Element -> get size of element
   * else use option as a number
   *
   * @param {String} measurement
   * @param {String} size - width or height
   * @private
   */
  proto._getMeasurement = function (measurement, size) {
    var option = this.options[measurement];
    var elem;
    if (!option) {
      // default to 0
      this[measurement] = 0;
    } else {
      // use option as an element
      if (typeof option == 'string') {
        elem = this.element.querySelector(option);
      } else if (option instanceof HTMLElement) {
        elem = option;
      }
      // use size of element, if element
      this[measurement] = elem ? getSize(elem)[size] : option;
    }
  };

  /**
   * layout a collection of item elements
   * @api public
   */
  proto.layoutItems = function (items, isInstant) {
    items = this._getItemsForLayout(items);

    this._layoutItems(items, isInstant);

    this._postLayout();
  };

  /**
   * get the items to be laid out
   * you may want to skip over some items
   * @param {Array} items
   * @returns {Array} items
   */
  proto._getItemsForLayout = function (items) {
    return items.filter(function (item) {
      return !item.isIgnored;
    });
  };

  /**
   * layout items
   * @param {Array} items
   * @param {Boolean} isInstant
   */
  proto._layoutItems = function (items, isInstant) {
    this._emitCompleteOnItems('layout', items);

    if (!items || !items.length) {
      // no items, emit event with empty array
      return;
    }

    var queue = [];

    items.forEach(function (item) {
      // get x/y object from method
      var position = this._getItemLayoutPosition(item);
      // enqueue
      position.item = item;
      position.isInstant = isInstant || item.isLayoutInstant;
      queue.push(position);
    }, this);

    this._processLayoutQueue(queue);
  };

  /**
   * get item layout position
   * @param {Outlayer.Item} item
   * @returns {Object} x and y position
   */
  proto._getItemLayoutPosition = function () /* item */{
    return {
      x: 0,
      y: 0
    };
  };

  /**
   * iterate over array and position each item
   * Reason being - separating this logic prevents 'layout invalidation'
   * thx @paul_irish
   * @param {Array} queue
   */
  proto._processLayoutQueue = function (queue) {
    this.updateStagger();
    queue.forEach(function (obj, i) {
      this._positionItem(obj.item, obj.x, obj.y, obj.isInstant, i);
    }, this);
  };

  // set stagger from option in milliseconds number
  proto.updateStagger = function () {
    var stagger = this.options.stagger;
    if (stagger === null || stagger === undefined) {
      this.stagger = 0;
      return;
    }
    this.stagger = getMilliseconds(stagger);
    return this.stagger;
  };

  /**
   * Sets position of item in DOM
   * @param {Outlayer.Item} item
   * @param {Number} x - horizontal position
   * @param {Number} y - vertical position
   * @param {Boolean} isInstant - disables transitions
   */
  proto._positionItem = function (item, x, y, isInstant, i) {
    if (isInstant) {
      // if not transition, just set CSS
      item.goTo(x, y);
    } else {
      item.stagger(i * this.stagger);
      item.moveTo(x, y);
    }
  };

  /**
   * Any logic you want to do after each layout,
   * i.e. size the container
   */
  proto._postLayout = function () {
    this.resizeContainer();
  };

  proto.resizeContainer = function () {
    var isResizingContainer = this._getOption('resizeContainer');
    if (!isResizingContainer) {
      return;
    }
    var size = this._getContainerSize();
    if (size) {
      this._setContainerMeasure(size.width, true);
      this._setContainerMeasure(size.height, false);
    }
  };

  /**
   * Sets width or height of container if returned
   * @returns {Object} size
   *   @param {Number} width
   *   @param {Number} height
   */
  proto._getContainerSize = noop;

  /**
   * @param {Number} measure - size of width or height
   * @param {Boolean} isWidth
   */
  proto._setContainerMeasure = function (measure, isWidth) {
    if (measure === undefined) {
      return;
    }

    var elemSize = this.size;
    // add padding and border width if border box
    if (elemSize.isBorderBox) {
      measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight + elemSize.borderLeftWidth + elemSize.borderRightWidth : elemSize.paddingBottom + elemSize.paddingTop + elemSize.borderTopWidth + elemSize.borderBottomWidth;
    }

    measure = Math.max(measure, 0);
    this.element.style[isWidth ? 'width' : 'height'] = measure + 'px';
  };

  /**
   * emit eventComplete on a collection of items events
   * @param {String} eventName
   * @param {Array} items - Outlayer.Items
   */
  proto._emitCompleteOnItems = function (eventName, items) {
    var _this = this;
    function onComplete() {
      _this.dispatchEvent(eventName + 'Complete', null, [items]);
    }

    var count = items.length;
    if (!items || !count) {
      onComplete();
      return;
    }

    var doneCount = 0;
    function tick() {
      doneCount++;
      if (doneCount == count) {
        onComplete();
      }
    }

    // bind callback
    items.forEach(function (item) {
      item.once(eventName, tick);
    });
  };

  /**
   * emits events via EvEmitter and jQuery events
   * @param {String} type - name of event
   * @param {Event} event - original event
   * @param {Array} args - extra arguments
   */
  proto.dispatchEvent = function (type, event, args) {
    // add original event to arguments
    var emitArgs = event ? [event].concat(args) : args;
    this.emitEvent(type, emitArgs);

    if (jQuery) {
      // set this.$element
      this.$element = this.$element || jQuery(this.element);
      if (event) {
        // create jQuery event
        var $event = jQuery.Event(event);
        $event.type = type;
        this.$element.trigger($event, args);
      } else {
        // just trigger with type if no event available
        this.$element.trigger(type, args);
      }
    }
  };

  // -------------------------- ignore & stamps -------------------------- //


  /**
   * keep item in collection, but do not lay it out
   * ignored items do not get skipped in layout
   * @param {Element} elem
   */
  proto.ignore = function (elem) {
    var item = this.getItem(elem);
    if (item) {
      item.isIgnored = true;
    }
  };

  /**
   * return item to layout collection
   * @param {Element} elem
   */
  proto.unignore = function (elem) {
    var item = this.getItem(elem);
    if (item) {
      delete item.isIgnored;
    }
  };

  /**
   * adds elements to stamps
   * @param {NodeList, Array, Element, or String} elems
   */
  proto.stamp = function (elems) {
    elems = this._find(elems);
    if (!elems) {
      return;
    }

    this.stamps = this.stamps.concat(elems);
    // ignore
    elems.forEach(this.ignore, this);
  };

  /**
   * removes elements to stamps
   * @param {NodeList, Array, or Element} elems
   */
  proto.unstamp = function (elems) {
    elems = this._find(elems);
    if (!elems) {
      return;
    }

    elems.forEach(function (elem) {
      // filter out removed stamp elements
      utils.removeFrom(this.stamps, elem);
      this.unignore(elem);
    }, this);
  };

  /**
   * finds child elements
   * @param {NodeList, Array, Element, or String} elems
   * @returns {Array} elems
   */
  proto._find = function (elems) {
    if (!elems) {
      return;
    }
    // if string, use argument as selector string
    if (typeof elems == 'string') {
      elems = this.element.querySelectorAll(elems);
    }
    elems = utils.makeArray(elems);
    return elems;
  };

  proto._manageStamps = function () {
    if (!this.stamps || !this.stamps.length) {
      return;
    }

    this._getBoundingRect();

    this.stamps.forEach(this._manageStamp, this);
  };

  // update boundingLeft / Top
  proto._getBoundingRect = function () {
    // get bounding rect for container element
    var boundingRect = this.element.getBoundingClientRect();
    var size = this.size;
    this._boundingRect = {
      left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
      top: boundingRect.top + size.paddingTop + size.borderTopWidth,
      right: boundingRect.right - (size.paddingRight + size.borderRightWidth),
      bottom: boundingRect.bottom - (size.paddingBottom + size.borderBottomWidth)
    };
  };

  /**
   * @param {Element} stamp
  **/
  proto._manageStamp = noop;

  /**
   * get x/y position of element relative to container element
   * @param {Element} elem
   * @returns {Object} offset - has left, top, right, bottom
   */
  proto._getElementOffset = function (elem) {
    var boundingRect = elem.getBoundingClientRect();
    var thisRect = this._boundingRect;
    var size = getSize(elem);
    var offset = {
      left: boundingRect.left - thisRect.left - size.marginLeft,
      top: boundingRect.top - thisRect.top - size.marginTop,
      right: thisRect.right - boundingRect.right - size.marginRight,
      bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
    };
    return offset;
  };

  // -------------------------- resize -------------------------- //

  // enable event handlers for listeners
  // i.e. resize -> onresize
  proto.handleEvent = utils.handleEvent;

  /**
   * Bind layout to window resizing
   */
  proto.bindResize = function () {
    window.addEventListener('resize', this);
    this.isResizeBound = true;
  };

  /**
   * Unbind layout to window resizing
   */
  proto.unbindResize = function () {
    window.removeEventListener('resize', this);
    this.isResizeBound = false;
  };

  proto.onresize = function () {
    this.resize();
  };

  utils.debounceMethod(Outlayer, 'onresize', 100);

  proto.resize = function () {
    // don't trigger if size did not change
    // or if resize was unbound. See #9
    if (!this.isResizeBound || !this.needsResizeLayout()) {
      return;
    }

    this.layout();
  };

  /**
   * check if layout is needed post layout
   * @returns Boolean
   */
  proto.needsResizeLayout = function () {
    var size = getSize(this.element);
    // check that this.size and size are there
    // IE8 triggers resize on body size change, so they might not be
    var hasSizes = this.size && size;
    return hasSizes && size.innerWidth !== this.size.innerWidth;
  };

  // -------------------------- methods -------------------------- //

  /**
   * add items to Outlayer instance
   * @param {Array or NodeList or Element} elems
   * @returns {Array} items - Outlayer.Items
  **/
  proto.addItems = function (elems) {
    var items = this._itemize(elems);
    // add items to collection
    if (items.length) {
      this.items = this.items.concat(items);
    }
    return items;
  };

  /**
   * Layout newly-appended item elements
   * @param {Array or NodeList or Element} elems
   */
  proto.appended = function (elems) {
    var items = this.addItems(elems);
    if (!items.length) {
      return;
    }
    // layout and reveal just the new items
    this.layoutItems(items, true);
    this.reveal(items);
  };

  /**
   * Layout prepended elements
   * @param {Array or NodeList or Element} elems
   */
  proto.prepended = function (elems) {
    var items = this._itemize(elems);
    if (!items.length) {
      return;
    }
    // add items to beginning of collection
    var previousItems = this.items.slice(0);
    this.items = items.concat(previousItems);
    // start new layout
    this._resetLayout();
    this._manageStamps();
    // layout new stuff without transition
    this.layoutItems(items, true);
    this.reveal(items);
    // layout previous items
    this.layoutItems(previousItems);
  };

  /**
   * reveal a collection of items
   * @param {Array of Outlayer.Items} items
   */
  proto.reveal = function (items) {
    this._emitCompleteOnItems('reveal', items);
    if (!items || !items.length) {
      return;
    }
    var stagger = this.updateStagger();
    items.forEach(function (item, i) {
      item.stagger(i * stagger);
      item.reveal();
    });
  };

  /**
   * hide a collection of items
   * @param {Array of Outlayer.Items} items
   */
  proto.hide = function (items) {
    this._emitCompleteOnItems('hide', items);
    if (!items || !items.length) {
      return;
    }
    var stagger = this.updateStagger();
    items.forEach(function (item, i) {
      item.stagger(i * stagger);
      item.hide();
    });
  };

  /**
   * reveal item elements
   * @param {Array}, {Element}, {NodeList} items
   */
  proto.revealItemElements = function (elems) {
    var items = this.getItems(elems);
    this.reveal(items);
  };

  /**
   * hide item elements
   * @param {Array}, {Element}, {NodeList} items
   */
  proto.hideItemElements = function (elems) {
    var items = this.getItems(elems);
    this.hide(items);
  };

  /**
   * get Outlayer.Item, given an Element
   * @param {Element} elem
   * @param {Function} callback
   * @returns {Outlayer.Item} item
   */
  proto.getItem = function (elem) {
    // loop through items to get the one that matches
    for (var i = 0; i < this.items.length; i++) {
      var item = this.items[i];
      if (item.element == elem) {
        // return item
        return item;
      }
    }
  };

  /**
   * get collection of Outlayer.Items, given Elements
   * @param {Array} elems
   * @returns {Array} items - Outlayer.Items
   */
  proto.getItems = function (elems) {
    elems = utils.makeArray(elems);
    var items = [];
    elems.forEach(function (elem) {
      var item = this.getItem(elem);
      if (item) {
        items.push(item);
      }
    }, this);

    return items;
  };

  /**
   * remove element(s) from instance and DOM
   * @param {Array or NodeList or Element} elems
   */
  proto.remove = function (elems) {
    var removeItems = this.getItems(elems);

    this._emitCompleteOnItems('remove', removeItems);

    // bail if no items to remove
    if (!removeItems || !removeItems.length) {
      return;
    }

    removeItems.forEach(function (item) {
      item.remove();
      // remove item from collection
      utils.removeFrom(this.items, item);
    }, this);
  };

  // ----- destroy ----- //

  // remove and disable Outlayer instance
  proto.destroy = function () {
    // clean up dynamic styles
    var style = this.element.style;
    style.height = '';
    style.position = '';
    style.width = '';
    // destroy items
    this.items.forEach(function (item) {
      item.destroy();
    });

    this.unbindResize();

    var id = this.element.outlayerGUID;
    delete instances[id]; // remove reference to instance by id
    delete this.element.outlayerGUID;
    // remove data for jQuery
    if (jQuery) {
      jQuery.removeData(this.element, this.constructor.namespace);
    }
  };

  // -------------------------- data -------------------------- //

  /**
   * get Outlayer instance from element
   * @param {Element} elem
   * @returns {Outlayer}
   */
  Outlayer.data = function (elem) {
    elem = utils.getQueryElement(elem);
    var id = elem && elem.outlayerGUID;
    return id && instances[id];
  };

  // -------------------------- create Outlayer class -------------------------- //

  /**
   * create a layout class
   * @param {String} namespace
   */
  Outlayer.create = function (namespace, options) {
    // sub-class Outlayer
    var Layout = subclass(Outlayer);
    // apply new options and compatOptions
    Layout.defaults = utils.extend({}, Outlayer.defaults);
    utils.extend(Layout.defaults, options);
    Layout.compatOptions = utils.extend({}, Outlayer.compatOptions);

    Layout.namespace = namespace;

    Layout.data = Outlayer.data;

    // sub-class Item
    Layout.Item = subclass(Item);

    // -------------------------- declarative -------------------------- //

    utils.htmlInit(Layout, namespace);

    // -------------------------- jQuery bridge -------------------------- //

    // make into jQuery plugin
    if (jQuery && jQuery.bridget) {
      jQuery.bridget(namespace, Layout);
    }

    return Layout;
  };

  function subclass(Parent) {
    function SubClass() {
      Parent.apply(this, arguments);
    }

    SubClass.prototype = Object.create(Parent.prototype);
    SubClass.prototype.constructor = SubClass;

    return SubClass;
  }

  // ----- helpers ----- //

  // how many milliseconds are in each unit
  var msUnits = {
    ms: 1,
    s: 1000
  };

  // munge time-like parameter into millisecond number
  // '0.4s' -> 40
  function getMilliseconds(time) {
    if (typeof time == 'number') {
      return time;
    }
    var matches = time.match(/(^\d*\.?\d*)(\w*)/);
    var num = matches && matches[1];
    var unit = matches && matches[2];
    if (!num.length) {
      return 0;
    }
    num = parseFloat(num);
    var mult = msUnits[unit] || 1;
    return num * mult;
  }

  // ----- fin ----- //

  // back in global
  Outlayer.Item = Item;

  return Outlayer;
});

/*!
 * Masonry v4.2.2
 * Cascading grid layout library
 * https://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

(function (window, factory) {
  // universal module definition
  /* jshint strict: false */ /*globals define, module, require */
  if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(97), __WEBPACK_LOCAL_MODULE_2__], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) == 'object' && module.exports) {
    // CommonJS
    module.exports = factory(require('outlayer'), require('get-size'));
  } else {
    // browser global
    window.Masonry = factory(window.Outlayer, window.getSize);
  }
})(window, function factory(Outlayer, getSize) {

  // -------------------------- masonryDefinition -------------------------- //

  // create an Outlayer layout class
  var Masonry = Outlayer.create('masonry');
  // isFitWidth -> fitWidth
  Masonry.compatOptions.fitWidth = 'isFitWidth';

  var proto = Masonry.prototype;

  proto._resetLayout = function () {
    this.getSize();
    this._getMeasurement('columnWidth', 'outerWidth');
    this._getMeasurement('gutter', 'outerWidth');
    this.measureColumns();

    // reset column Y
    this.colYs = [];
    for (var i = 0; i < this.cols; i++) {
      this.colYs.push(0);
    }

    this.maxY = 0;
    this.horizontalColIndex = 0;
  };

  proto.measureColumns = function () {
    this.getContainerWidth();
    // if columnWidth is 0, default to outerWidth of first item
    if (!this.columnWidth) {
      var firstItem = this.items[0];
      var firstItemElem = firstItem && firstItem.element;
      // columnWidth fall back to item of first element
      this.columnWidth = firstItemElem && getSize(firstItemElem).outerWidth ||
      // if first elem has no width, default to size of container
      this.containerWidth;
    }

    var columnWidth = this.columnWidth += this.gutter;

    // calculate columns
    var containerWidth = this.containerWidth + this.gutter;
    var cols = containerWidth / columnWidth;
    // fix rounding errors, typically with gutters
    var excess = columnWidth - containerWidth % columnWidth;
    // if overshoot is less than a pixel, round up, otherwise floor it
    var mathMethod = excess && excess < 1 ? 'round' : 'floor';
    cols = Math[mathMethod](cols);
    this.cols = Math.max(cols, 1);
  };

  proto.getContainerWidth = function () {
    // container is parent if fit width
    var isFitWidth = this._getOption('fitWidth');
    var container = isFitWidth ? this.element.parentNode : this.element;
    // check that this.size and size are there
    // IE8 triggers resize on body size change, so they might not be
    var size = getSize(container);
    this.containerWidth = size && size.innerWidth;
  };

  proto._getItemLayoutPosition = function (item) {
    item.getSize();
    // how many columns does this brick span
    var remainder = item.size.outerWidth % this.columnWidth;
    var mathMethod = remainder && remainder < 1 ? 'round' : 'ceil';
    // round if off by 1 pixel, otherwise use ceil
    var colSpan = Math[mathMethod](item.size.outerWidth / this.columnWidth);
    colSpan = Math.min(colSpan, this.cols);
    // use horizontal or top column position
    var colPosMethod = this.options.horizontalOrder ? '_getHorizontalColPosition' : '_getTopColPosition';
    var colPosition = this[colPosMethod](colSpan, item);
    // position the brick
    var position = {
      x: this.columnWidth * colPosition.col,
      y: colPosition.y
    };
    // apply setHeight to necessary columns
    var setHeight = colPosition.y + item.size.outerHeight;
    var setMax = colSpan + colPosition.col;
    for (var i = colPosition.col; i < setMax; i++) {
      this.colYs[i] = setHeight;
    }

    return position;
  };

  proto._getTopColPosition = function (colSpan) {
    var colGroup = this._getTopColGroup(colSpan);
    // get the minimum Y value from the columns
    var minimumY = Math.min.apply(Math, colGroup);

    return {
      col: colGroup.indexOf(minimumY),
      y: minimumY
    };
  };

  /**
   * @param {Number} colSpan - number of columns the element spans
   * @returns {Array} colGroup
   */
  proto._getTopColGroup = function (colSpan) {
    if (colSpan < 2) {
      // if brick spans only one column, use all the column Ys
      return this.colYs;
    }

    var colGroup = [];
    // how many different places could this brick fit horizontally
    var groupCount = this.cols + 1 - colSpan;
    // for each group potential horizontal position
    for (var i = 0; i < groupCount; i++) {
      colGroup[i] = this._getColGroupY(i, colSpan);
    }
    return colGroup;
  };

  proto._getColGroupY = function (col, colSpan) {
    if (colSpan < 2) {
      return this.colYs[col];
    }
    // make an array of colY values for that one group
    var groupColYs = this.colYs.slice(col, col + colSpan);
    // and get the max value of the array
    return Math.max.apply(Math, groupColYs);
  };

  // get column position based on horizontal index. #873
  proto._getHorizontalColPosition = function (colSpan, item) {
    var col = this.horizontalColIndex % this.cols;
    var isOver = colSpan > 1 && col + colSpan > this.cols;
    // shift to next row if item can't fit on current row
    col = isOver ? 0 : col;
    // don't let zero-size items take up space
    var hasSize = item.size.outerWidth && item.size.outerHeight;
    this.horizontalColIndex = hasSize ? col + colSpan : this.horizontalColIndex;

    return {
      col: col,
      y: this._getColGroupY(col, colSpan)
    };
  };

  proto._manageStamp = function (stamp) {
    var stampSize = getSize(stamp);
    var offset = this._getElementOffset(stamp);
    // get the columns that this stamp affects
    var isOriginLeft = this._getOption('originLeft');
    var firstX = isOriginLeft ? offset.left : offset.right;
    var lastX = firstX + stampSize.outerWidth;
    var firstCol = Math.floor(firstX / this.columnWidth);
    firstCol = Math.max(0, firstCol);
    var lastCol = Math.floor(lastX / this.columnWidth);
    // lastCol should not go over if multiple of columnWidth #425
    lastCol -= lastX % this.columnWidth ? 0 : 1;
    lastCol = Math.min(this.cols - 1, lastCol);
    // set colYs to bottom of the stamp

    var isOriginTop = this._getOption('originTop');
    var stampMaxY = (isOriginTop ? offset.top : offset.bottom) + stampSize.outerHeight;
    for (var i = firstCol; i <= lastCol; i++) {
      this.colYs[i] = Math.max(stampMaxY, this.colYs[i]);
    }
  };

  proto._getContainerSize = function () {
    this.maxY = Math.max.apply(Math, this.colYs);
    var size = {
      height: this.maxY
    };

    if (this._getOption('fitWidth')) {
      size.width = this._getContainerFitWidth();
    }

    return size;
  };

  proto._getContainerFitWidth = function () {
    var unusedCols = 0;
    // count unused columns
    var i = this.cols;
    while (--i) {
      if (this.colYs[i] !== 0) {
        break;
      }
      unusedCols++;
    }
    // fit container to columns that have been used
    return (this.cols - unusedCols) * this.columnWidth - this.gutter;
  };

  proto.needsResizeLayout = function () {
    var previousWidth = this.containerWidth;
    this.getContainerWidth();
    return previousWidth != this.containerWidth;
  };

  return Masonry;
});

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Outlayer v2.1.1
 * the brains and guts of a layout library
 * MIT license
 */

( function( window, factory ) {
  'use strict';
  // universal module definition
  /* jshint strict: false */ /* globals define, module, require */
  if ( true ) {
    // AMD - RequireJS
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
        __webpack_require__(25),
        __webpack_require__(62),
        __webpack_require__(98),
        __webpack_require__(99)
      ], __WEBPACK_AMD_DEFINE_RESULT__ = (function( EvEmitter, getSize, utils, Item ) {
        return factory( window, EvEmitter, getSize, utils, Item);
      }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory(
      window,
      require('ev-emitter'),
      require('get-size'),
      require('fizzy-ui-utils'),
      require('./item')
    );
  } else {
    // browser global
    window.Outlayer = factory(
      window,
      window.EvEmitter,
      window.getSize,
      window.fizzyUIUtils,
      window.Outlayer.Item
    );
  }

}( window, function factory( window, EvEmitter, getSize, utils, Item ) {
'use strict';

// ----- vars ----- //

var console = window.console;
var jQuery = window.jQuery;
var noop = function() {};

// -------------------------- Outlayer -------------------------- //

// globally unique identifiers
var GUID = 0;
// internal store of all Outlayer intances
var instances = {};


/**
 * @param {Element, String} element
 * @param {Object} options
 * @constructor
 */
function Outlayer( element, options ) {
  var queryElement = utils.getQueryElement( element );
  if ( !queryElement ) {
    if ( console ) {
      console.error( 'Bad element for ' + this.constructor.namespace +
        ': ' + ( queryElement || element ) );
    }
    return;
  }
  this.element = queryElement;
  // add jQuery
  if ( jQuery ) {
    this.$element = jQuery( this.element );
  }

  // options
  this.options = utils.extend( {}, this.constructor.defaults );
  this.option( options );

  // add id for Outlayer.getFromElement
  var id = ++GUID;
  this.element.outlayerGUID = id; // expando
  instances[ id ] = this; // associate via id

  // kick it off
  this._create();

  var isInitLayout = this._getOption('initLayout');
  if ( isInitLayout ) {
    this.layout();
  }
}

// settings are for internal use only
Outlayer.namespace = 'outlayer';
Outlayer.Item = Item;

// default options
Outlayer.defaults = {
  containerStyle: {
    position: 'relative'
  },
  initLayout: true,
  originLeft: true,
  originTop: true,
  resize: true,
  resizeContainer: true,
  // item options
  transitionDuration: '0.4s',
  hiddenStyle: {
    opacity: 0,
    transform: 'scale(0.001)'
  },
  visibleStyle: {
    opacity: 1,
    transform: 'scale(1)'
  }
};

var proto = Outlayer.prototype;
// inherit EvEmitter
utils.extend( proto, EvEmitter.prototype );

/**
 * set options
 * @param {Object} opts
 */
proto.option = function( opts ) {
  utils.extend( this.options, opts );
};

/**
 * get backwards compatible option value, check old name
 */
proto._getOption = function( option ) {
  var oldOption = this.constructor.compatOptions[ option ];
  return oldOption && this.options[ oldOption ] !== undefined ?
    this.options[ oldOption ] : this.options[ option ];
};

Outlayer.compatOptions = {
  // currentName: oldName
  initLayout: 'isInitLayout',
  horizontal: 'isHorizontal',
  layoutInstant: 'isLayoutInstant',
  originLeft: 'isOriginLeft',
  originTop: 'isOriginTop',
  resize: 'isResizeBound',
  resizeContainer: 'isResizingContainer'
};

proto._create = function() {
  // get items from children
  this.reloadItems();
  // elements that affect layout, but are not laid out
  this.stamps = [];
  this.stamp( this.options.stamp );
  // set container style
  utils.extend( this.element.style, this.options.containerStyle );

  // bind resize method
  var canBindResize = this._getOption('resize');
  if ( canBindResize ) {
    this.bindResize();
  }
};

// goes through all children again and gets bricks in proper order
proto.reloadItems = function() {
  // collection of item elements
  this.items = this._itemize( this.element.children );
};


/**
 * turn elements into Outlayer.Items to be used in layout
 * @param {Array or NodeList or HTMLElement} elems
 * @returns {Array} items - collection of new Outlayer Items
 */
proto._itemize = function( elems ) {

  var itemElems = this._filterFindItemElements( elems );
  var Item = this.constructor.Item;

  // create new Outlayer Items for collection
  var items = [];
  for ( var i=0; i < itemElems.length; i++ ) {
    var elem = itemElems[i];
    var item = new Item( elem, this );
    items.push( item );
  }

  return items;
};

/**
 * get item elements to be used in layout
 * @param {Array or NodeList or HTMLElement} elems
 * @returns {Array} items - item elements
 */
proto._filterFindItemElements = function( elems ) {
  return utils.filterFindElements( elems, this.options.itemSelector );
};

/**
 * getter method for getting item elements
 * @returns {Array} elems - collection of item elements
 */
proto.getItemElements = function() {
  return this.items.map( function( item ) {
    return item.element;
  });
};

// ----- init & layout ----- //

/**
 * lays out all items
 */
proto.layout = function() {
  this._resetLayout();
  this._manageStamps();

  // don't animate first layout
  var layoutInstant = this._getOption('layoutInstant');
  var isInstant = layoutInstant !== undefined ?
    layoutInstant : !this._isLayoutInited;
  this.layoutItems( this.items, isInstant );

  // flag for initalized
  this._isLayoutInited = true;
};

// _init is alias for layout
proto._init = proto.layout;

/**
 * logic before any new layout
 */
proto._resetLayout = function() {
  this.getSize();
};


proto.getSize = function() {
  this.size = getSize( this.element );
};

/**
 * get measurement from option, for columnWidth, rowHeight, gutter
 * if option is String -> get element from selector string, & get size of element
 * if option is Element -> get size of element
 * else use option as a number
 *
 * @param {String} measurement
 * @param {String} size - width or height
 * @private
 */
proto._getMeasurement = function( measurement, size ) {
  var option = this.options[ measurement ];
  var elem;
  if ( !option ) {
    // default to 0
    this[ measurement ] = 0;
  } else {
    // use option as an element
    if ( typeof option == 'string' ) {
      elem = this.element.querySelector( option );
    } else if ( option instanceof HTMLElement ) {
      elem = option;
    }
    // use size of element, if element
    this[ measurement ] = elem ? getSize( elem )[ size ] : option;
  }
};

/**
 * layout a collection of item elements
 * @api public
 */
proto.layoutItems = function( items, isInstant ) {
  items = this._getItemsForLayout( items );

  this._layoutItems( items, isInstant );

  this._postLayout();
};

/**
 * get the items to be laid out
 * you may want to skip over some items
 * @param {Array} items
 * @returns {Array} items
 */
proto._getItemsForLayout = function( items ) {
  return items.filter( function( item ) {
    return !item.isIgnored;
  });
};

/**
 * layout items
 * @param {Array} items
 * @param {Boolean} isInstant
 */
proto._layoutItems = function( items, isInstant ) {
  this._emitCompleteOnItems( 'layout', items );

  if ( !items || !items.length ) {
    // no items, emit event with empty array
    return;
  }

  var queue = [];

  items.forEach( function( item ) {
    // get x/y object from method
    var position = this._getItemLayoutPosition( item );
    // enqueue
    position.item = item;
    position.isInstant = isInstant || item.isLayoutInstant;
    queue.push( position );
  }, this );

  this._processLayoutQueue( queue );
};

/**
 * get item layout position
 * @param {Outlayer.Item} item
 * @returns {Object} x and y position
 */
proto._getItemLayoutPosition = function( /* item */ ) {
  return {
    x: 0,
    y: 0
  };
};

/**
 * iterate over array and position each item
 * Reason being - separating this logic prevents 'layout invalidation'
 * thx @paul_irish
 * @param {Array} queue
 */
proto._processLayoutQueue = function( queue ) {
  this.updateStagger();
  queue.forEach( function( obj, i ) {
    this._positionItem( obj.item, obj.x, obj.y, obj.isInstant, i );
  }, this );
};

// set stagger from option in milliseconds number
proto.updateStagger = function() {
  var stagger = this.options.stagger;
  if ( stagger === null || stagger === undefined ) {
    this.stagger = 0;
    return;
  }
  this.stagger = getMilliseconds( stagger );
  return this.stagger;
};

/**
 * Sets position of item in DOM
 * @param {Outlayer.Item} item
 * @param {Number} x - horizontal position
 * @param {Number} y - vertical position
 * @param {Boolean} isInstant - disables transitions
 */
proto._positionItem = function( item, x, y, isInstant, i ) {
  if ( isInstant ) {
    // if not transition, just set CSS
    item.goTo( x, y );
  } else {
    item.stagger( i * this.stagger );
    item.moveTo( x, y );
  }
};

/**
 * Any logic you want to do after each layout,
 * i.e. size the container
 */
proto._postLayout = function() {
  this.resizeContainer();
};

proto.resizeContainer = function() {
  var isResizingContainer = this._getOption('resizeContainer');
  if ( !isResizingContainer ) {
    return;
  }
  var size = this._getContainerSize();
  if ( size ) {
    this._setContainerMeasure( size.width, true );
    this._setContainerMeasure( size.height, false );
  }
};

/**
 * Sets width or height of container if returned
 * @returns {Object} size
 *   @param {Number} width
 *   @param {Number} height
 */
proto._getContainerSize = noop;

/**
 * @param {Number} measure - size of width or height
 * @param {Boolean} isWidth
 */
proto._setContainerMeasure = function( measure, isWidth ) {
  if ( measure === undefined ) {
    return;
  }

  var elemSize = this.size;
  // add padding and border width if border box
  if ( elemSize.isBorderBox ) {
    measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight +
      elemSize.borderLeftWidth + elemSize.borderRightWidth :
      elemSize.paddingBottom + elemSize.paddingTop +
      elemSize.borderTopWidth + elemSize.borderBottomWidth;
  }

  measure = Math.max( measure, 0 );
  this.element.style[ isWidth ? 'width' : 'height' ] = measure + 'px';
};

/**
 * emit eventComplete on a collection of items events
 * @param {String} eventName
 * @param {Array} items - Outlayer.Items
 */
proto._emitCompleteOnItems = function( eventName, items ) {
  var _this = this;
  function onComplete() {
    _this.dispatchEvent( eventName + 'Complete', null, [ items ] );
  }

  var count = items.length;
  if ( !items || !count ) {
    onComplete();
    return;
  }

  var doneCount = 0;
  function tick() {
    doneCount++;
    if ( doneCount == count ) {
      onComplete();
    }
  }

  // bind callback
  items.forEach( function( item ) {
    item.once( eventName, tick );
  });
};

/**
 * emits events via EvEmitter and jQuery events
 * @param {String} type - name of event
 * @param {Event} event - original event
 * @param {Array} args - extra arguments
 */
proto.dispatchEvent = function( type, event, args ) {
  // add original event to arguments
  var emitArgs = event ? [ event ].concat( args ) : args;
  this.emitEvent( type, emitArgs );

  if ( jQuery ) {
    // set this.$element
    this.$element = this.$element || jQuery( this.element );
    if ( event ) {
      // create jQuery event
      var $event = jQuery.Event( event );
      $event.type = type;
      this.$element.trigger( $event, args );
    } else {
      // just trigger with type if no event available
      this.$element.trigger( type, args );
    }
  }
};

// -------------------------- ignore & stamps -------------------------- //


/**
 * keep item in collection, but do not lay it out
 * ignored items do not get skipped in layout
 * @param {Element} elem
 */
proto.ignore = function( elem ) {
  var item = this.getItem( elem );
  if ( item ) {
    item.isIgnored = true;
  }
};

/**
 * return item to layout collection
 * @param {Element} elem
 */
proto.unignore = function( elem ) {
  var item = this.getItem( elem );
  if ( item ) {
    delete item.isIgnored;
  }
};

/**
 * adds elements to stamps
 * @param {NodeList, Array, Element, or String} elems
 */
proto.stamp = function( elems ) {
  elems = this._find( elems );
  if ( !elems ) {
    return;
  }

  this.stamps = this.stamps.concat( elems );
  // ignore
  elems.forEach( this.ignore, this );
};

/**
 * removes elements to stamps
 * @param {NodeList, Array, or Element} elems
 */
proto.unstamp = function( elems ) {
  elems = this._find( elems );
  if ( !elems ){
    return;
  }

  elems.forEach( function( elem ) {
    // filter out removed stamp elements
    utils.removeFrom( this.stamps, elem );
    this.unignore( elem );
  }, this );
};

/**
 * finds child elements
 * @param {NodeList, Array, Element, or String} elems
 * @returns {Array} elems
 */
proto._find = function( elems ) {
  if ( !elems ) {
    return;
  }
  // if string, use argument as selector string
  if ( typeof elems == 'string' ) {
    elems = this.element.querySelectorAll( elems );
  }
  elems = utils.makeArray( elems );
  return elems;
};

proto._manageStamps = function() {
  if ( !this.stamps || !this.stamps.length ) {
    return;
  }

  this._getBoundingRect();

  this.stamps.forEach( this._manageStamp, this );
};

// update boundingLeft / Top
proto._getBoundingRect = function() {
  // get bounding rect for container element
  var boundingRect = this.element.getBoundingClientRect();
  var size = this.size;
  this._boundingRect = {
    left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
    top: boundingRect.top + size.paddingTop + size.borderTopWidth,
    right: boundingRect.right - ( size.paddingRight + size.borderRightWidth ),
    bottom: boundingRect.bottom - ( size.paddingBottom + size.borderBottomWidth )
  };
};

/**
 * @param {Element} stamp
**/
proto._manageStamp = noop;

/**
 * get x/y position of element relative to container element
 * @param {Element} elem
 * @returns {Object} offset - has left, top, right, bottom
 */
proto._getElementOffset = function( elem ) {
  var boundingRect = elem.getBoundingClientRect();
  var thisRect = this._boundingRect;
  var size = getSize( elem );
  var offset = {
    left: boundingRect.left - thisRect.left - size.marginLeft,
    top: boundingRect.top - thisRect.top - size.marginTop,
    right: thisRect.right - boundingRect.right - size.marginRight,
    bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
  };
  return offset;
};

// -------------------------- resize -------------------------- //

// enable event handlers for listeners
// i.e. resize -> onresize
proto.handleEvent = utils.handleEvent;

/**
 * Bind layout to window resizing
 */
proto.bindResize = function() {
  window.addEventListener( 'resize', this );
  this.isResizeBound = true;
};

/**
 * Unbind layout to window resizing
 */
proto.unbindResize = function() {
  window.removeEventListener( 'resize', this );
  this.isResizeBound = false;
};

proto.onresize = function() {
  this.resize();
};

utils.debounceMethod( Outlayer, 'onresize', 100 );

proto.resize = function() {
  // don't trigger if size did not change
  // or if resize was unbound. See #9
  if ( !this.isResizeBound || !this.needsResizeLayout() ) {
    return;
  }

  this.layout();
};

/**
 * check if layout is needed post layout
 * @returns Boolean
 */
proto.needsResizeLayout = function() {
  var size = getSize( this.element );
  // check that this.size and size are there
  // IE8 triggers resize on body size change, so they might not be
  var hasSizes = this.size && size;
  return hasSizes && size.innerWidth !== this.size.innerWidth;
};

// -------------------------- methods -------------------------- //

/**
 * add items to Outlayer instance
 * @param {Array or NodeList or Element} elems
 * @returns {Array} items - Outlayer.Items
**/
proto.addItems = function( elems ) {
  var items = this._itemize( elems );
  // add items to collection
  if ( items.length ) {
    this.items = this.items.concat( items );
  }
  return items;
};

/**
 * Layout newly-appended item elements
 * @param {Array or NodeList or Element} elems
 */
proto.appended = function( elems ) {
  var items = this.addItems( elems );
  if ( !items.length ) {
    return;
  }
  // layout and reveal just the new items
  this.layoutItems( items, true );
  this.reveal( items );
};

/**
 * Layout prepended elements
 * @param {Array or NodeList or Element} elems
 */
proto.prepended = function( elems ) {
  var items = this._itemize( elems );
  if ( !items.length ) {
    return;
  }
  // add items to beginning of collection
  var previousItems = this.items.slice(0);
  this.items = items.concat( previousItems );
  // start new layout
  this._resetLayout();
  this._manageStamps();
  // layout new stuff without transition
  this.layoutItems( items, true );
  this.reveal( items );
  // layout previous items
  this.layoutItems( previousItems );
};

/**
 * reveal a collection of items
 * @param {Array of Outlayer.Items} items
 */
proto.reveal = function( items ) {
  this._emitCompleteOnItems( 'reveal', items );
  if ( !items || !items.length ) {
    return;
  }
  var stagger = this.updateStagger();
  items.forEach( function( item, i ) {
    item.stagger( i * stagger );
    item.reveal();
  });
};

/**
 * hide a collection of items
 * @param {Array of Outlayer.Items} items
 */
proto.hide = function( items ) {
  this._emitCompleteOnItems( 'hide', items );
  if ( !items || !items.length ) {
    return;
  }
  var stagger = this.updateStagger();
  items.forEach( function( item, i ) {
    item.stagger( i * stagger );
    item.hide();
  });
};

/**
 * reveal item elements
 * @param {Array}, {Element}, {NodeList} items
 */
proto.revealItemElements = function( elems ) {
  var items = this.getItems( elems );
  this.reveal( items );
};

/**
 * hide item elements
 * @param {Array}, {Element}, {NodeList} items
 */
proto.hideItemElements = function( elems ) {
  var items = this.getItems( elems );
  this.hide( items );
};

/**
 * get Outlayer.Item, given an Element
 * @param {Element} elem
 * @param {Function} callback
 * @returns {Outlayer.Item} item
 */
proto.getItem = function( elem ) {
  // loop through items to get the one that matches
  for ( var i=0; i < this.items.length; i++ ) {
    var item = this.items[i];
    if ( item.element == elem ) {
      // return item
      return item;
    }
  }
};

/**
 * get collection of Outlayer.Items, given Elements
 * @param {Array} elems
 * @returns {Array} items - Outlayer.Items
 */
proto.getItems = function( elems ) {
  elems = utils.makeArray( elems );
  var items = [];
  elems.forEach( function( elem ) {
    var item = this.getItem( elem );
    if ( item ) {
      items.push( item );
    }
  }, this );

  return items;
};

/**
 * remove element(s) from instance and DOM
 * @param {Array or NodeList or Element} elems
 */
proto.remove = function( elems ) {
  var removeItems = this.getItems( elems );

  this._emitCompleteOnItems( 'remove', removeItems );

  // bail if no items to remove
  if ( !removeItems || !removeItems.length ) {
    return;
  }

  removeItems.forEach( function( item ) {
    item.remove();
    // remove item from collection
    utils.removeFrom( this.items, item );
  }, this );
};

// ----- destroy ----- //

// remove and disable Outlayer instance
proto.destroy = function() {
  // clean up dynamic styles
  var style = this.element.style;
  style.height = '';
  style.position = '';
  style.width = '';
  // destroy items
  this.items.forEach( function( item ) {
    item.destroy();
  });

  this.unbindResize();

  var id = this.element.outlayerGUID;
  delete instances[ id ]; // remove reference to instance by id
  delete this.element.outlayerGUID;
  // remove data for jQuery
  if ( jQuery ) {
    jQuery.removeData( this.element, this.constructor.namespace );
  }

};

// -------------------------- data -------------------------- //

/**
 * get Outlayer instance from element
 * @param {Element} elem
 * @returns {Outlayer}
 */
Outlayer.data = function( elem ) {
  elem = utils.getQueryElement( elem );
  var id = elem && elem.outlayerGUID;
  return id && instances[ id ];
};


// -------------------------- create Outlayer class -------------------------- //

/**
 * create a layout class
 * @param {String} namespace
 */
Outlayer.create = function( namespace, options ) {
  // sub-class Outlayer
  var Layout = subclass( Outlayer );
  // apply new options and compatOptions
  Layout.defaults = utils.extend( {}, Outlayer.defaults );
  utils.extend( Layout.defaults, options );
  Layout.compatOptions = utils.extend( {}, Outlayer.compatOptions  );

  Layout.namespace = namespace;

  Layout.data = Outlayer.data;

  // sub-class Item
  Layout.Item = subclass( Item );

  // -------------------------- declarative -------------------------- //

  utils.htmlInit( Layout, namespace );

  // -------------------------- jQuery bridge -------------------------- //

  // make into jQuery plugin
  if ( jQuery && jQuery.bridget ) {
    jQuery.bridget( namespace, Layout );
  }

  return Layout;
};

function subclass( Parent ) {
  function SubClass() {
    Parent.apply( this, arguments );
  }

  SubClass.prototype = Object.create( Parent.prototype );
  SubClass.prototype.constructor = SubClass;

  return SubClass;
}

// ----- helpers ----- //

// how many milliseconds are in each unit
var msUnits = {
  ms: 1,
  s: 1000
};

// munge time-like parameter into millisecond number
// '0.4s' -> 40
function getMilliseconds( time ) {
  if ( typeof time == 'number' ) {
    return time;
  }
  var matches = time.match( /(^\d*\.?\d*)(\w*)/ );
  var num = matches && matches[1];
  var unit = matches && matches[2];
  if ( !num.length ) {
    return 0;
  }
  num = parseFloat( num );
  var mult = msUnits[ unit ] || 1;
  return num * mult;
}

// ----- fin ----- //

// back in global
Outlayer.Item = Item;

return Outlayer;

}));


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Fizzy UI utils v2.0.7
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
      __webpack_require__(61)
    ], __WEBPACK_AMD_DEFINE_RESULT__ = (function( matchesSelector ) {
      return factory( window, matchesSelector );
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('desandro-matches-selector')
    );
  } else {
    // browser global
    window.fizzyUIUtils = factory(
      window,
      window.matchesSelector
    );
  }

}( window, function factory( window, matchesSelector ) {

'use strict';

var utils = {};

// ----- extend ----- //

// extends objects
utils.extend = function( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
};

// ----- modulo ----- //

utils.modulo = function( num, div ) {
  return ( ( num % div ) + div ) % div;
};

// ----- makeArray ----- //

var arraySlice = Array.prototype.slice;

// turn element or nodeList into an array
utils.makeArray = function( obj ) {
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    return obj;
  }
  // return empty array if undefined or null. #6
  if ( obj === null || obj === undefined ) {
    return [];
  }

  var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  if ( isArrayLike ) {
    // convert nodeList to array
    return arraySlice.call( obj );
  }

  // array of single index
  return [ obj ];
};

// ----- removeFrom ----- //

utils.removeFrom = function( ary, obj ) {
  var index = ary.indexOf( obj );
  if ( index != -1 ) {
    ary.splice( index, 1 );
  }
};

// ----- getParent ----- //

utils.getParent = function( elem, selector ) {
  while ( elem.parentNode && elem != document.body ) {
    elem = elem.parentNode;
    if ( matchesSelector( elem, selector ) ) {
      return elem;
    }
  }
};

// ----- getQueryElement ----- //

// use element as selector string
utils.getQueryElement = function( elem ) {
  if ( typeof elem == 'string' ) {
    return document.querySelector( elem );
  }
  return elem;
};

// ----- handleEvent ----- //

// enable .ontype to trigger from .addEventListener( elem, 'type' )
utils.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// ----- filterFindElements ----- //

utils.filterFindElements = function( elems, selector ) {
  // make array of elems
  elems = utils.makeArray( elems );
  var ffElems = [];

  elems.forEach( function( elem ) {
    // check that elem is an actual element
    if ( !( elem instanceof HTMLElement ) ) {
      return;
    }
    // add elem if no selector
    if ( !selector ) {
      ffElems.push( elem );
      return;
    }
    // filter & find items if we have a selector
    // filter
    if ( matchesSelector( elem, selector ) ) {
      ffElems.push( elem );
    }
    // find children
    var childElems = elem.querySelectorAll( selector );
    // concat childElems to filterFound array
    for ( var i=0; i < childElems.length; i++ ) {
      ffElems.push( childElems[i] );
    }
  });

  return ffElems;
};

// ----- debounceMethod ----- //

utils.debounceMethod = function( _class, methodName, threshold ) {
  threshold = threshold || 100;
  // original method
  var method = _class.prototype[ methodName ];
  var timeoutName = methodName + 'Timeout';

  _class.prototype[ methodName ] = function() {
    var timeout = this[ timeoutName ];
    clearTimeout( timeout );

    var args = arguments;
    var _this = this;
    this[ timeoutName ] = setTimeout( function() {
      method.apply( _this, args );
      delete _this[ timeoutName ];
    }, threshold );
  };
};

// ----- docReady ----- //

utils.docReady = function( callback ) {
  var readyState = document.readyState;
  if ( readyState == 'complete' || readyState == 'interactive' ) {
    // do async to allow for other scripts to run. metafizzy/flickity#441
    setTimeout( callback );
  } else {
    document.addEventListener( 'DOMContentLoaded', callback );
  }
};

// ----- htmlInit ----- //

// http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
utils.toDashed = function( str ) {
  return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) {
    return $1 + '-' + $2;
  }).toLowerCase();
};

var console = window.console;
/**
 * allow user to initialize classes via [data-namespace] or .js-namespace class
 * htmlInit( Widget, 'widgetName' )
 * options are parsed from data-namespace-options
 */
utils.htmlInit = function( WidgetClass, namespace ) {
  utils.docReady( function() {
    var dashedNamespace = utils.toDashed( namespace );
    var dataAttr = 'data-' + dashedNamespace;
    var dataAttrElems = document.querySelectorAll( '[' + dataAttr + ']' );
    var jsDashElems = document.querySelectorAll( '.js-' + dashedNamespace );
    var elems = utils.makeArray( dataAttrElems )
      .concat( utils.makeArray( jsDashElems ) );
    var dataOptionsAttr = dataAttr + '-options';
    var jQuery = window.jQuery;

    elems.forEach( function( elem ) {
      var attr = elem.getAttribute( dataAttr ) ||
        elem.getAttribute( dataOptionsAttr );
      var options;
      try {
        options = attr && JSON.parse( attr );
      } catch ( error ) {
        // log error, do not initialize
        if ( console ) {
          console.error( 'Error parsing ' + dataAttr + ' on ' + elem.className +
          ': ' + error );
        }
        return;
      }
      // initialize
      var instance = new WidgetClass( elem, options );
      // make available via $().data('namespace')
      if ( jQuery ) {
        jQuery.data( elem, namespace, instance );
      }
    });

  });
};

// -----  ----- //

return utils;

}));


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Outlayer Item
 */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, require */
  if ( true ) {
    // AMD - RequireJS
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
        __webpack_require__(25),
        __webpack_require__(62)
      ], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory(
      require('ev-emitter'),
      require('get-size')
    );
  } else {
    // browser global
    window.Outlayer = {};
    window.Outlayer.Item = factory(
      window.EvEmitter,
      window.getSize
    );
  }

}( window, function factory( EvEmitter, getSize ) {
'use strict';

// ----- helpers ----- //

function isEmptyObj( obj ) {
  for ( var prop in obj ) {
    return false;
  }
  prop = null;
  return true;
}

// -------------------------- CSS3 support -------------------------- //


var docElemStyle = document.documentElement.style;

var transitionProperty = typeof docElemStyle.transition == 'string' ?
  'transition' : 'WebkitTransition';
var transformProperty = typeof docElemStyle.transform == 'string' ?
  'transform' : 'WebkitTransform';

var transitionEndEvent = {
  WebkitTransition: 'webkitTransitionEnd',
  transition: 'transitionend'
}[ transitionProperty ];

// cache all vendor properties that could have vendor prefix
var vendorProperties = {
  transform: transformProperty,
  transition: transitionProperty,
  transitionDuration: transitionProperty + 'Duration',
  transitionProperty: transitionProperty + 'Property',
  transitionDelay: transitionProperty + 'Delay'
};

// -------------------------- Item -------------------------- //

function Item( element, layout ) {
  if ( !element ) {
    return;
  }

  this.element = element;
  // parent layout class, i.e. Masonry, Isotope, or Packery
  this.layout = layout;
  this.position = {
    x: 0,
    y: 0
  };

  this._create();
}

// inherit EvEmitter
var proto = Item.prototype = Object.create( EvEmitter.prototype );
proto.constructor = Item;

proto._create = function() {
  // transition objects
  this._transn = {
    ingProperties: {},
    clean: {},
    onEnd: {}
  };

  this.css({
    position: 'absolute'
  });
};

// trigger specified handler for event type
proto.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

proto.getSize = function() {
  this.size = getSize( this.element );
};

/**
 * apply CSS styles to element
 * @param {Object} style
 */
proto.css = function( style ) {
  var elemStyle = this.element.style;

  for ( var prop in style ) {
    // use vendor property if available
    var supportedProp = vendorProperties[ prop ] || prop;
    elemStyle[ supportedProp ] = style[ prop ];
  }
};

 // measure position, and sets it
proto.getPosition = function() {
  var style = getComputedStyle( this.element );
  var isOriginLeft = this.layout._getOption('originLeft');
  var isOriginTop = this.layout._getOption('originTop');
  var xValue = style[ isOriginLeft ? 'left' : 'right' ];
  var yValue = style[ isOriginTop ? 'top' : 'bottom' ];
  var x = parseFloat( xValue );
  var y = parseFloat( yValue );
  // convert percent to pixels
  var layoutSize = this.layout.size;
  if ( xValue.indexOf('%') != -1 ) {
    x = ( x / 100 ) * layoutSize.width;
  }
  if ( yValue.indexOf('%') != -1 ) {
    y = ( y / 100 ) * layoutSize.height;
  }
  // clean up 'auto' or other non-integer values
  x = isNaN( x ) ? 0 : x;
  y = isNaN( y ) ? 0 : y;
  // remove padding from measurement
  x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
  y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;

  this.position.x = x;
  this.position.y = y;
};

// set settled position, apply padding
proto.layoutPosition = function() {
  var layoutSize = this.layout.size;
  var style = {};
  var isOriginLeft = this.layout._getOption('originLeft');
  var isOriginTop = this.layout._getOption('originTop');

  // x
  var xPadding = isOriginLeft ? 'paddingLeft' : 'paddingRight';
  var xProperty = isOriginLeft ? 'left' : 'right';
  var xResetProperty = isOriginLeft ? 'right' : 'left';

  var x = this.position.x + layoutSize[ xPadding ];
  // set in percentage or pixels
  style[ xProperty ] = this.getXValue( x );
  // reset other property
  style[ xResetProperty ] = '';

  // y
  var yPadding = isOriginTop ? 'paddingTop' : 'paddingBottom';
  var yProperty = isOriginTop ? 'top' : 'bottom';
  var yResetProperty = isOriginTop ? 'bottom' : 'top';

  var y = this.position.y + layoutSize[ yPadding ];
  // set in percentage or pixels
  style[ yProperty ] = this.getYValue( y );
  // reset other property
  style[ yResetProperty ] = '';

  this.css( style );
  this.emitEvent( 'layout', [ this ] );
};

proto.getXValue = function( x ) {
  var isHorizontal = this.layout._getOption('horizontal');
  return this.layout.options.percentPosition && !isHorizontal ?
    ( ( x / this.layout.size.width ) * 100 ) + '%' : x + 'px';
};

proto.getYValue = function( y ) {
  var isHorizontal = this.layout._getOption('horizontal');
  return this.layout.options.percentPosition && isHorizontal ?
    ( ( y / this.layout.size.height ) * 100 ) + '%' : y + 'px';
};

proto._transitionTo = function( x, y ) {
  this.getPosition();
  // get current x & y from top/left
  var curX = this.position.x;
  var curY = this.position.y;

  var didNotMove = x == this.position.x && y == this.position.y;

  // save end position
  this.setPosition( x, y );

  // if did not move and not transitioning, just go to layout
  if ( didNotMove && !this.isTransitioning ) {
    this.layoutPosition();
    return;
  }

  var transX = x - curX;
  var transY = y - curY;
  var transitionStyle = {};
  transitionStyle.transform = this.getTranslate( transX, transY );

  this.transition({
    to: transitionStyle,
    onTransitionEnd: {
      transform: this.layoutPosition
    },
    isCleaning: true
  });
};

proto.getTranslate = function( x, y ) {
  // flip cooridinates if origin on right or bottom
  var isOriginLeft = this.layout._getOption('originLeft');
  var isOriginTop = this.layout._getOption('originTop');
  x = isOriginLeft ? x : -x;
  y = isOriginTop ? y : -y;
  return 'translate3d(' + x + 'px, ' + y + 'px, 0)';
};

// non transition + transform support
proto.goTo = function( x, y ) {
  this.setPosition( x, y );
  this.layoutPosition();
};

proto.moveTo = proto._transitionTo;

proto.setPosition = function( x, y ) {
  this.position.x = parseFloat( x );
  this.position.y = parseFloat( y );
};

// ----- transition ----- //

/**
 * @param {Object} style - CSS
 * @param {Function} onTransitionEnd
 */

// non transition, just trigger callback
proto._nonTransition = function( args ) {
  this.css( args.to );
  if ( args.isCleaning ) {
    this._removeStyles( args.to );
  }
  for ( var prop in args.onTransitionEnd ) {
    args.onTransitionEnd[ prop ].call( this );
  }
};

/**
 * proper transition
 * @param {Object} args - arguments
 *   @param {Object} to - style to transition to
 *   @param {Object} from - style to start transition from
 *   @param {Boolean} isCleaning - removes transition styles after transition
 *   @param {Function} onTransitionEnd - callback
 */
proto.transition = function( args ) {
  // redirect to nonTransition if no transition duration
  if ( !parseFloat( this.layout.options.transitionDuration ) ) {
    this._nonTransition( args );
    return;
  }

  var _transition = this._transn;
  // keep track of onTransitionEnd callback by css property
  for ( var prop in args.onTransitionEnd ) {
    _transition.onEnd[ prop ] = args.onTransitionEnd[ prop ];
  }
  // keep track of properties that are transitioning
  for ( prop in args.to ) {
    _transition.ingProperties[ prop ] = true;
    // keep track of properties to clean up when transition is done
    if ( args.isCleaning ) {
      _transition.clean[ prop ] = true;
    }
  }

  // set from styles
  if ( args.from ) {
    this.css( args.from );
    // force redraw. http://blog.alexmaccaw.com/css-transitions
    var h = this.element.offsetHeight;
    // hack for JSHint to hush about unused var
    h = null;
  }
  // enable transition
  this.enableTransition( args.to );
  // set styles that are transitioning
  this.css( args.to );

  this.isTransitioning = true;

};

// dash before all cap letters, including first for
// WebkitTransform => -webkit-transform
function toDashedAll( str ) {
  return str.replace( /([A-Z])/g, function( $1 ) {
    return '-' + $1.toLowerCase();
  });
}

var transitionProps = 'opacity,' + toDashedAll( transformProperty );

proto.enableTransition = function(/* style */) {
  // HACK changing transitionProperty during a transition
  // will cause transition to jump
  if ( this.isTransitioning ) {
    return;
  }

  // make `transition: foo, bar, baz` from style object
  // HACK un-comment this when enableTransition can work
  // while a transition is happening
  // var transitionValues = [];
  // for ( var prop in style ) {
  //   // dash-ify camelCased properties like WebkitTransition
  //   prop = vendorProperties[ prop ] || prop;
  //   transitionValues.push( toDashedAll( prop ) );
  // }
  // munge number to millisecond, to match stagger
  var duration = this.layout.options.transitionDuration;
  duration = typeof duration == 'number' ? duration + 'ms' : duration;
  // enable transition styles
  this.css({
    transitionProperty: transitionProps,
    transitionDuration: duration,
    transitionDelay: this.staggerDelay || 0
  });
  // listen for transition end event
  this.element.addEventListener( transitionEndEvent, this, false );
};

// ----- events ----- //

proto.onwebkitTransitionEnd = function( event ) {
  this.ontransitionend( event );
};

proto.onotransitionend = function( event ) {
  this.ontransitionend( event );
};

// properties that I munge to make my life easier
var dashedVendorProperties = {
  '-webkit-transform': 'transform'
};

proto.ontransitionend = function( event ) {
  // disregard bubbled events from children
  if ( event.target !== this.element ) {
    return;
  }
  var _transition = this._transn;
  // get property name of transitioned property, convert to prefix-free
  var propertyName = dashedVendorProperties[ event.propertyName ] || event.propertyName;

  // remove property that has completed transitioning
  delete _transition.ingProperties[ propertyName ];
  // check if any properties are still transitioning
  if ( isEmptyObj( _transition.ingProperties ) ) {
    // all properties have completed transitioning
    this.disableTransition();
  }
  // clean style
  if ( propertyName in _transition.clean ) {
    // clean up style
    this.element.style[ event.propertyName ] = '';
    delete _transition.clean[ propertyName ];
  }
  // trigger onTransitionEnd callback
  if ( propertyName in _transition.onEnd ) {
    var onTransitionEnd = _transition.onEnd[ propertyName ];
    onTransitionEnd.call( this );
    delete _transition.onEnd[ propertyName ];
  }

  this.emitEvent( 'transitionEnd', [ this ] );
};

proto.disableTransition = function() {
  this.removeTransitionStyles();
  this.element.removeEventListener( transitionEndEvent, this, false );
  this.isTransitioning = false;
};

/**
 * removes style property from element
 * @param {Object} style
**/
proto._removeStyles = function( style ) {
  // clean up transition styles
  var cleanStyle = {};
  for ( var prop in style ) {
    cleanStyle[ prop ] = '';
  }
  this.css( cleanStyle );
};

var cleanTransitionStyle = {
  transitionProperty: '',
  transitionDuration: '',
  transitionDelay: ''
};

proto.removeTransitionStyles = function() {
  // remove transition
  this.css( cleanTransitionStyle );
};

// ----- stagger ----- //

proto.stagger = function( delay ) {
  delay = isNaN( delay ) ? 0 : delay;
  this.staggerDelay = delay + 'ms';
};

// ----- show/hide/remove ----- //

// remove element from DOM
proto.removeElem = function() {
  this.element.parentNode.removeChild( this.element );
  // remove display: none
  this.css({ display: '' });
  this.emitEvent( 'remove', [ this ] );
};

proto.remove = function() {
  // just remove element if no transition support or no transition
  if ( !transitionProperty || !parseFloat( this.layout.options.transitionDuration ) ) {
    this.removeElem();
    return;
  }

  // start transition
  this.once( 'transitionEnd', function() {
    this.removeElem();
  });
  this.hide();
};

proto.reveal = function() {
  delete this.isHidden;
  // remove display: none
  this.css({ display: '' });

  var options = this.layout.options;

  var onTransitionEnd = {};
  var transitionEndProperty = this.getHideRevealTransitionEndProperty('visibleStyle');
  onTransitionEnd[ transitionEndProperty ] = this.onRevealTransitionEnd;

  this.transition({
    from: options.hiddenStyle,
    to: options.visibleStyle,
    isCleaning: true,
    onTransitionEnd: onTransitionEnd
  });
};

proto.onRevealTransitionEnd = function() {
  // check if still visible
  // during transition, item may have been hidden
  if ( !this.isHidden ) {
    this.emitEvent('reveal');
  }
};

/**
 * get style property use for hide/reveal transition end
 * @param {String} styleProperty - hiddenStyle/visibleStyle
 * @returns {String}
 */
proto.getHideRevealTransitionEndProperty = function( styleProperty ) {
  var optionStyle = this.layout.options[ styleProperty ];
  // use opacity
  if ( optionStyle.opacity ) {
    return 'opacity';
  }
  // get first property
  for ( var prop in optionStyle ) {
    return prop;
  }
};

proto.hide = function() {
  // set flag
  this.isHidden = true;
  // remove display: none
  this.css({ display: '' });

  var options = this.layout.options;

  var onTransitionEnd = {};
  var transitionEndProperty = this.getHideRevealTransitionEndProperty('hiddenStyle');
  onTransitionEnd[ transitionEndProperty ] = this.onHideTransitionEnd;

  this.transition({
    from: options.visibleStyle,
    to: options.hiddenStyle,
    // keep hidden stuff hidden
    isCleaning: true,
    onTransitionEnd: onTransitionEnd
  });
};

proto.onHideTransitionEnd = function() {
  // check if still hidden
  // during transition, item may have been un-hidden
  if ( this.isHidden ) {
    this.css({ display: 'none' });
    this.emitEvent('hide');
  }
};

proto.destroy = function() {
  this.css({
    position: '',
    left: '',
    right: '',
    top: '',
    bottom: '',
    transition: '',
    transform: ''
  });
};

return Item;

}));


/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__root_static_free_colibri__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__root_static_free_colibri___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__root_static_free_colibri__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var ColibriFrontComponent = function () {
  _createClass(ColibriFrontComponent, null, [{
    key: 'componentName',
    value: function componentName() {
      throw new TypeError('name getter should be implemented');
    }
  }]);

  function ColibriFrontComponent(element, options) {
    _classCallCheck(this, ColibriFrontComponent);

    this.$ = jQuery;
    this.namespace = this.constructor.componentName();
    this.utils = new __WEBPACK_IMPORTED_MODULE_0__root_static_free_colibri___default.a.Utils();
    this.detect = new __WEBPACK_IMPORTED_MODULE_0__root_static_free_colibri___default.a.Detect();
    this.init();
    __WEBPACK_IMPORTED_MODULE_0__root_static_free_colibri___default.a.apply(this, arguments);
    this.start();

    if (this.isCustomizerPreview()) {
      this.wpCustomize(wp.customize);
    }
    return this;
  }

  _createClass(ColibriFrontComponent, [{
    key: 'init',
    value: function init() {}
  }, {
    key: 'isCustomizerPreview',
    value: function isCustomizerPreview() {
      return __WEBPACK_IMPORTED_MODULE_0__root_static_free_colibri___default.a.isCustomizerPreview();
    }
  }, {
    key: 'wpCustomize',
    value: function wpCustomize(api) {}
  }, {
    key: 'wpSettingBind',
    value: function wpSettingBind(setting_id, callback) {
      window.wp.customize(setting_id, function (setting) {
        setting.bind(callback);
      });
    }
  }, {
    key: 'updateData',
    value: function updateData(data) {
      this.opts = jQuery.extend({}, this.opts, data);
      this.restart();
    }
  }, {
    key: 'restart',
    value: function restart() {}
  }, {
    key: 'start',
    value: function start() {}
  }]);

  return ColibriFrontComponent;
}();

/* harmony default export */ __webpack_exports__["a"] = (ColibriFrontComponent);

/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__page_components_common_background_scripts_slideshow_slideshow__ = __webpack_require__(102);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var CustomizableSlideshow = function (_Slideshow) {
    _inherits(CustomizableSlideshow, _Slideshow);

    function CustomizableSlideshow() {
        _classCallCheck(this, CustomizableSlideshow);

        return _possibleConstructorReturn(this, (CustomizableSlideshow.__proto__ || Object.getPrototypeOf(CustomizableSlideshow)).apply(this, arguments));
    }

    _createClass(CustomizableSlideshow, [{
        key: "start",
        value: function start() {
            _get(CustomizableSlideshow.prototype.__proto__ || Object.getPrototypeOf(CustomizableSlideshow.prototype), "start", this).call(this);

            if (!this.customizerBinded) {
                this.wpCustomize(wp.customize);
                this.customizerBinded = true;
            }
        }
    }, {
        key: "wpCustomize",
        value: function wpCustomize(api) {
            var _this2 = this;

            var _loop = function _loop(opt) {

                if (_this2.opts.wpSettings.hasOwnProperty(opt)) {
                    var setting = _this2.opts.wpSettings[opt];

                    _this2.wpSettingBind(setting, function (newValue) {
                        _this2.opts[opt] = parseInt(newValue);
                        _this2.stop();
                        setTimeout(function () {
                            _this2.start();
                        }, 100);
                    });
                }
            };

            for (var opt in this.opts.wpSettings) {
                _loop(opt);
            }
        }
    }, {
        key: "wpSettingBind",
        value: function wpSettingBind(setting_id, callback) {
            window.wp.customize(setting_id, function (setting) {
                setting.bind(callback);
            });
        }
    }]);

    return CustomizableSlideshow;
}(__WEBPACK_IMPORTED_MODULE_0__page_components_common_background_scripts_slideshow_slideshow__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (CustomizableSlideshow);

/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__page_components_common_scripts_base_index__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_debounce__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_debounce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash_debounce__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var Slideshow = function (_ColibriFrontComponen) {
  _inherits(Slideshow, _ColibriFrontComponen);

  function Slideshow() {
    _classCallCheck(this, Slideshow);

    return _possibleConstructorReturn(this, (Slideshow.__proto__ || Object.getPrototypeOf(Slideshow)).apply(this, arguments));
  }

  _createClass(Slideshow, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      this.currentIndex = 0;
      this.interval = -1;

      this.debouncedRestart = __WEBPACK_IMPORTED_MODULE_1_lodash_debounce___default()(function () {
        _this2.stop();

        _this2.start();
      }, 500);
    }
  }, {
    key: 'addImageEffect',
    value: function addImageEffect(image, index) {
      this.$(image).css({
        transition: 'opacity ' + this.opts.slideSpeed + 'ms',
        zIndex: this.$images.length - index
      });
    }
  }, {
    key: 'slideImage',
    value: function slideImage() {
      this.$images.eq(this.currentIndex).removeClass('current');

      var nextIndex = this.currentIndex + 1 === this.$images.length ? 0 : this.currentIndex + 1;

      this.$images.eq(nextIndex).addClass('current').removeClass('next');

      this.currentIndex = nextIndex;
      var futureIndex = this.currentIndex + 1 === this.$images.length ? 0 : this.currentIndex + 1;

      this.$images.eq(futureIndex).addClass('next');
    }
  }, {
    key: 'restart',
    value: function restart() {
      this.debouncedRestart();
    }
  }, {
    key: 'start',
    value: function start() {
      var _this3 = this;

      this.$images = this.$element.find('.slideshow-image');
      this.$images.eq(0).addClass('current');
      this.currentIndex = 0;

      this.$images.each(function (index, image) {
        _this3.addImageEffect(image, index);
      });

      this.interval = setInterval(function () {
        _this3.slideImage();
      }, parseInt(this.opts.slideDuration) + parseInt(this.opts.slideSpeed));
    }
  }, {
    key: 'stop',
    value: function stop() {
      clearInterval(this.interval);
      this.$images.css({
        transition: '',
        opacity: ''
      });
      this.$images.removeClass('current next');
      this.$images.eq(0).addClass('current');
      this.currentIndex = 0;
    }
  }], [{
    key: 'componentName',
    value: function componentName() {
      return 'slideshow';
    }
  }]);

  return Slideshow;
}(__WEBPACK_IMPORTED_MODULE_0__page_components_common_scripts_base_index__["a" /* ColibriFrontComponent */]);

/* harmony default export */ __webpack_exports__["a"] = (Slideshow);

/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__page_components_common_background_scripts_video_video_bg__ = __webpack_require__(104);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var CustomizableVideoBackground = function (_VideoBackground) {
    _inherits(CustomizableVideoBackground, _VideoBackground);

    function CustomizableVideoBackground(element, options) {
        var _ret;

        _classCallCheck(this, CustomizableVideoBackground);

        var _this = _possibleConstructorReturn(this, (CustomizableVideoBackground.__proto__ || Object.getPrototypeOf(CustomizableVideoBackground)).call(this, element, options));

        return _ret = _this, _possibleConstructorReturn(_this, _ret);
    }

    _createClass(CustomizableVideoBackground, [{
        key: "wpCustomize",
        value: function wpCustomize(api) {
            var _this2 = this;

            this.API_URL = colibri_ADDITIONAL_JS_DATA.api_url;

            var _loop = function _loop(opt) {

                if (_this2.opts.wpSettings.hasOwnProperty(opt)) {
                    var setting = _this2.opts.wpSettings[opt];

                    _this2.wpSettingBind(setting, function (newValue) {
                        if (opt === "externalUrl") {
                            _this2.restartYouTubeVideo(newValue);
                        }

                        if (opt === "internalUrl") {
                            _this2.restartSelfHostedVideo(newValue);
                        }

                        if (opt === "videoType") {
                            var videoType = "native";
                            if (newValue == "external") videoType = "youtube";
                            _this2.changeProvider(videoType);
                        }

                        if (opt === "posterUrl") {
                            _this2.$element.css({
                                backgroundImage: "url(" + newValue + ")"
                            });
                            _this2.videoData.poster = newValue;
                        }
                    });
                }
            };

            for (var opt in this.opts.wpSettings) {
                _loop(opt);
            }
        }
    }, {
        key: "changeProvider",
        value: function changeProvider(newValue) {
            if (newValue === "youtube") {
                this.restartYouTubeVideo(wp.customize(this.opts.wpSettings['externalUrl']).get());
            } else {
                this.restartSelfHostedVideo(wp.customize(this.opts.wpSettings['internalUrl']).get());
            }
        }
    }, {
        key: "restartYouTubeVideo",
        value: function restartYouTubeVideo(value) {
            this.videoData.videoUrl = value;
            this.videoData.mimeType = "video/x-youtube";

            _get(CustomizableVideoBackground.prototype.__proto__ || Object.getPrototypeOf(CustomizableVideoBackground.prototype), "generateVideo", this).call(this);
        }
    }, {
        key: "restartSelfHostedVideo",
        value: function restartSelfHostedVideo(value) {
            var _this3 = this;

            if (!value) {
                this.videoData.videoUrl = "";
                this.videoData.mimeType = "video/mp4";
                _get(CustomizableVideoBackground.prototype.__proto__ || Object.getPrototypeOf(CustomizableVideoBackground.prototype), "generateVideo", this).call(this);
            } else {

                this.$.getJSON(this.API_URL + "/attachment-data/" + value, function (data) {
                    _this3.videoData.videoUrl = data.url;
                    _this3.videoData.mimeType = data.mime_type;

                    _get(CustomizableVideoBackground.prototype.__proto__ || Object.getPrototypeOf(CustomizableVideoBackground.prototype), "generateVideo", _this3).call(_this3);
                });
            }
        }
    }]);

    return CustomizableVideoBackground;
}(__WEBPACK_IMPORTED_MODULE_0__page_components_common_background_scripts_video_video_bg__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (CustomizableVideoBackground);

/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__page_components_common_scripts_base_index__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__handlers_handlers__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_utils_is_mobile__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_utils_is_mobile___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__common_utils_is_mobile__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var VideoBackground = function (_ColibriFrontComponen) {
  _inherits(VideoBackground, _ColibriFrontComponen);

  function VideoBackground() {
    _classCallCheck(this, VideoBackground);

    return _possibleConstructorReturn(this, (VideoBackground.__proto__ || Object.getPrototypeOf(VideoBackground)).apply(this, arguments));
  }

  _createClass(VideoBackground, [{
    key: 'init',
    value: function init() {
      this.videoData = {};
      this.handler = false;
      this.debouncedSetPosition = jQuery.debounce(this.updateVideoBackground.bind(this), 100);
    }
  }, {
    key: 'generateVideo',
    value: function generateVideo() {
      var _this2 = this;

      for (var handle in __WEBPACK_IMPORTED_MODULE_1__handlers_handlers__["a" /* default */]) {
        if (__WEBPACK_IMPORTED_MODULE_1__handlers_handlers__["a" /* default */].hasOwnProperty(handle) && __WEBPACK_IMPORTED_MODULE_1__handlers_handlers__["a" /* default */][handle].test(this.videoData)) {
          this.$element.empty();
          this.handler = new __WEBPACK_IMPORTED_MODULE_1__handlers_handlers__["a" /* default */][handle](this.$element[0], this.videoData);
          break;
        }
      }

      this.handler.onLoad(function () {
        _this2.$element.children('iframe,video').addClass('h-hide-sm-force');
        _this2.debouncedSetPosition();
        _this2.handler.onResize(function () {
          return _this2.debouncedSetPosition();
        });
      });

      if (window.hop) {
        window.addResizeListener(this.$element.closest('.background-wrapper').parent()[0], this.debouncedSetPosition);
        this.debouncedSetPosition();
      }
    }
  }, {
    key: 'updateVideoBackground',
    value: function updateVideoBackground() {
      if (this.handler.updateVideoSize) {
        this.handler.updateVideoSize();
      }
      this.setPosition();
    }
  }, {
    key: 'setPosition',
    value: function setPosition() {
      var _this3 = this;

      this.handler.pause();
      if (this.$element.children('iframe,video').eq(0).css('display') === 'none') {
        return;
      }

      var $video = this.$element.children('iframe,video').eq(0),
          posX = $video.is('iframe') ? 50 : this.opts.positionX,
          posY = $video.is('iframe') ? 50 : this.opts.positionY,
          x = Math.max($video.width() - this.$element.width(), 0) * parseFloat(posX) / 100,
          y = Math.max($video.height() - this.$element.height(), 0) * parseFloat(posY) / 100;

      $video.css({
        transform: 'translate(-' + x + 'px,-' + y + 'px)',
        '-webkit-transform': 'translate(-' + x + 'px,-' + y + 'px)'
      });

      this.$element.addClass('visible');

      setTimeout(function () {
        _this3.handler.play();
      }, 100);
    }
  }, {
    key: 'start',
    value: function start() {
      this.videoData = {
        mimeType: this.opts.mimeType,
        poster: this.opts.poster,
        videoUrl: this.opts.video
      };

      if (!Object(__WEBPACK_IMPORTED_MODULE_2__common_utils_is_mobile__["isMobile"])()) {
        this.generateVideo();
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      window.removeResizeListener(this.$element.closest('.background-wrapper').parent()[0], this.debouncedSetPosition);
    }
  }, {
    key: 'restart',
    value: function restart() {
      this.stop();
      this.start();
    }
  }], [{
    key: 'componentName',
    value: function componentName() {
      return 'video-background';
    }
  }]);

  return VideoBackground;
}(__WEBPACK_IMPORTED_MODULE_0__page_components_common_scripts_base_index__["a" /* ColibriFrontComponent */]);

/* harmony default export */ __webpack_exports__["a"] = (VideoBackground);

/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__native_handler__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__youtube_handler__ = __webpack_require__(107);



var Handlers = {
  native: __WEBPACK_IMPORTED_MODULE_0__native_handler__["a" /* default */],
  youtube: __WEBPACK_IMPORTED_MODULE_1__youtube_handler__["a" /* default */]
};

/* harmony default export */ __webpack_exports__["a"] = (Handlers);

/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_handler__ = __webpack_require__(64);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var NativeHandler = function (_BaseHandler) {
  _inherits(NativeHandler, _BaseHandler);

  function NativeHandler() {
    _classCallCheck(this, NativeHandler);

    return _possibleConstructorReturn(this, (NativeHandler.__proto__ || Object.getPrototypeOf(NativeHandler)).apply(this, arguments));
  }

  _createClass(NativeHandler, [{
    key: 'isPaused',
    value: function isPaused() {
      return this.video.paused;
    }
  }, {
    key: 'ready',
    value: function ready() {
      var _this2 = this;

      if (this.settings.poster) {
        this.element.style.backgroundImage = 'url("' + this.settings.poster + '")';
      }

      if (!this.settings.videoUrl) {
        return;
      }

      var video = document.createElement('video');

      video.id = this.settings.id || '';

      // video.autoplay = 'autoplay';
      video.loop = 'loop';
      video.muted = 'muted';

      if (this.settings.width) {
        video.width = this.settings.width;
      }

      if (this.settings.height) {
        video.height = this.settings.height;
      }

      video.addEventListener('play', function () {
        _this2.trigger('play');
      });

      video.addEventListener('pause', function () {
        _this2.trigger('pause');
      });

      video.addEventListener('loadeddata', function () {
        _this2.loaded();
      });

      this.video = video;
      this.setVideo(video);
      video.src = this.settings.videoUrl;
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.video.pause();
    }
  }, {
    key: 'play',
    value: function play() {
      this.video.play();
    }
  }], [{
    key: 'test',
    value: function test(settings) {
      var video = document.createElement('video');
      return video.canPlayType(settings.mimeType);
    }
  }]);

  return NativeHandler;
}(__WEBPACK_IMPORTED_MODULE_0__base_handler__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (NativeHandler);

/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_handler__ = __webpack_require__(64);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @global YT */



var VIDEO_ID_REGEX = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|&v(?:i)?=))([^#&?]*).*/;

var YouTubeHandler = function (_BaseHandler) {
  _inherits(YouTubeHandler, _BaseHandler);

  function YouTubeHandler(element, settings) {
    var _ret;

    _classCallCheck(this, YouTubeHandler);

    var _this = _possibleConstructorReturn(this, (YouTubeHandler.__proto__ || Object.getPrototypeOf(YouTubeHandler)).call(this, element, settings));

    return _ret = _this, _possibleConstructorReturn(_this, _ret);
  }

  _createClass(YouTubeHandler, [{
    key: 'ready',
    value: function ready() {
      var _this2 = this;

      if (this.settings.poster) {
        this.element.style.backgroundImage = 'url("' + this.settings.poster + '")';
      }

      if ('YT' in window) {
        window.YT.ready(function () {
          _this2.loadVideo();
        });
      } else {
        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        tag.onload = function () {
          window.YT.ready(function () {
            _this2.loadVideo();
          });
        };

        document.getElementsByTagName('head')[0].appendChild(tag);
      }
    }
  }, {
    key: 'getVideoID',
    value: function getVideoID() {
      var matches = this.settings.videoUrl.match(VIDEO_ID_REGEX);

      if (matches && matches.length >= 2) {
        return matches[1];
      }

      return null;
    }
  }, {
    key: 'getYTOptions',
    value: function getYTOptions() {
      var _this3 = this;

      var options = {
        videoId: this.getVideoID(),
        events: {
          onReady: function onReady(e) {
            var ytVideo = e.target;

            //added mute param, not sure if this mute function call is needed anymore.
            ytVideo.mute();
            top.yt1 = ytVideo;
            ytVideo.setPlaybackQuality('auto');
            _this3.play();
            _this3.loaded();
          },
          onStateChange: function onStateChange(e) {
            if (window.YT.PlayerState.PLAYING === e.data) {
              _this3.trigger('play');
            } else if (window.YT.PlayerState.PAUSED === e.data) {
              _this3.trigger('pause');
            } else if (window.YT.PlayerState.ENDED === e.data) {
              e.target.playVideo();
            }
          },
          onError: function onError(e) {
            _this3.player.getIframe().style.display = 'none';
          }
        },
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          loop: 1,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          showinfo: 0,

          /**
           * Sometimes the mute function used in the onRead event did not work, but using this options the videos are
           * always muted
           */
          mute: 1
        }
      };

      if (this.settings.height) {
        options['height'] = this.settings.height;
      } else {
        options['height'] = 1080;
      }

      if (this.settings.width) {
        options['width'] = this.settings.width;
      } else {
        options['width'] = 1920;
      }
      // height: this.settings.height,
      // width: this.settings.width,

      return options;
    }
  }, {
    key: 'loadVideo',
    value: function loadVideo() {
      var video = document.createElement('div'),
          YT = window.YT;

      this.setVideo(video);
      this.player = new window.YT.Player(video, this.getYTOptions());
    }
  }, {
    key: 'updateVideoSize',
    value: function updateVideoSize() {
      if (!this.player) {
        return;
      }
      var $iframe = jQuery(this.player.getIframe()),
          size = this.calcVideosSize();
      $iframe.css(size);
      $iframe.addClass('ready');
    }
  }, {
    key: 'calcVideosSize',
    value: function calcVideosSize() {
      var width = jQuery(this.element).outerWidth(),
          height = jQuery(this.element).outerHeight(),
          aspectRatio = '16:9'.split(':'),
          proportion = aspectRatio[0] / aspectRatio[1],
          keepWidth = width / height > proportion,
          magnifier = 1;

      return {
        width: magnifier * (keepWidth ? width : height * proportion),
        height: magnifier * (keepWidth ? width / proportion : height)
      };
    }
  }, {
    key: 'play',
    value: function play() {
      if (!!this.player && !!this.player.playVideo) {
        if (!this.isPlaying) {
          this.isPlaying = true;
          this.player.playVideo();
        }
      }
    }
  }, {
    key: 'pause',
    value: function pause() {
      if (!!this.player && !!this.player.pauseVideo && !this.isPlaying) {
        this.isPlaying = false;
        this.player.pauseVideo();
      }
    }
  }, {
    key: 'isPaused',
    value: function isPaused() {
      return YT.PlayerState.PAUSED === this.player.getPlayerState();
    }
  }, {
    key: 'loaded',
    value: function loaded() {
      this.updateVideoSize();
      _get(YouTubeHandler.prototype.__proto__ || Object.getPrototypeOf(YouTubeHandler.prototype), 'loaded', this).call(this);
    }
  }, {
    key: 'addResizeBind',
    value: function addResizeBind() {
      var _this4 = this;

      this.onResize(function () {
        return _this4.updateVideoSize();
      }, 50);
      _get(YouTubeHandler.prototype.__proto__ || Object.getPrototypeOf(YouTubeHandler.prototype), 'addResizeBind', this).call(this);
    }
  }], [{
    key: 'test',
    value: function test(settings) {
      return 'video/x-youtube' === settings.mimeType;
    }
  }]);

  return YouTubeHandler;
}(__WEBPACK_IMPORTED_MODULE_0__base_handler__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (YouTubeHandler);

/***/ }),
/* 108 */
/***/ (function(module, exports) {

module.exports = isMobile;
module.exports.isMobile = isMobile;

var mobileRE = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i;

var tabletRE = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i;

function isMobile(opts) {
  if (!opts) {
    opts = {};
  }
  var ua = opts.ua;
  if (!ua && typeof navigator !== 'undefined') {
    ua = navigator.userAgent;
  }
  if (ua && ua.headers && typeof ua.headers['user-agent'] === 'string') {
    ua = ua.headers['user-agent'];
  }
  if (typeof ua !== 'string') {
    return false;
  }

  return opts.tablet ? tabletRE.test(ua) : mobileRE.test(ua);
}

/***/ }),
/* 109 */
/***/ (function(module, exports) {

(function ($) {
  function inCustomizer() {
    return Colibri.isCustomizerPreview();
  }

  if (window.location.hash === '#page-top') {
    changeUrlHash('', 5);
  }

  var __toCheckOnScroll = {
    items: {},
    eachCategory: function eachCategory(callback) {
      for (var id in this.items) {
        if (!this.items.hasOwnProperty(id)) {
          continue;
        }

        callback(this.items[id]);
      }
    },
    addItem: function addItem(id, item) {
      if (!this.items[id]) {
        this.items[id] = [];
      }

      this.items[id].push(item);
    },
    all: function all() {
      var result = [];

      for (var id in this.items) {
        if (!this.items.hasOwnProperty(id)) {
          continue;
        }

        result = result.concat(this.items[id]);
      }

      return result;
    }
  };
  var __alreadyScrolling = false;

  function getScrollToValue(elData) {
    var offset = !isNaN(parseFloat(elData.options.offset)) ? elData.options.offset : elData.options.offset.call(elData.target);
    var scrollToValue = elData.target.offset().top - offset - $('body').offset().top;

    return scrollToValue;
  }

  function changeUrlHash(hash, timeout) {
    if (hash === location.hash.replace('#', '') || hash === 'page-top' && '' === location.hash.replace('#', '')) {
      return;
    }

    setTimeout(function () {
      if (hash) {
        if (hash === 'page-top') {
          hash = ' ';
        } else {
          hash = '#' + hash;
        }
      } else {
        hash = ' ';
      }
      if (history && history.replaceState) {
        history.replaceState({}, '', hash);
      }
    }, timeout || 100);
    /* safari issue fixed by throtteling the event */
  }

  function scrollItem(elData) {
    if (__alreadyScrolling) {
      return;
    }

    __alreadyScrolling = true;
    var scrollToValue = getScrollToValue(elData);

    $('html, body').animate({ scrollTop: scrollToValue }, {
      easing: 'linear',
      complete: function complete() {
        // check for any updates
        var scrollToValue = getScrollToValue(elData);
        $('html, body').animate({ scrollTop: scrollToValue }, {
          easing: 'linear',
          duration: 100,
          complete: function complete() {
            __alreadyScrolling = false;
            changeUrlHash(elData.id, 5);
          }
        });
      }
    });
  }

  function getPageBaseUrl() {
    return [location.protocol, '//', location.host, location.pathname].join('');
  }

  function fallbackUrlParse(url) {
    return url.split('?')[0].split('#')[0];
  }

  function getABaseUrl(element) {
    var href = jQuery(element)[0].href || '';
    var url = '#';

    try {
      var _url = new window.URL(href);
      url = [_url.protocol, '//', _url.host, _url.pathname].join('');
    } catch (e) {
      url = fallbackUrlParse(href);
    }

    return url;
  }

  function getTargetForEl(element) {
    var targetId = (element.attr('href') || '').split('#').pop(),
        hrefBase = getABaseUrl(element),
        target = null,
        pageURL = getPageBaseUrl();

    if (hrefBase.length && hrefBase !== pageURL) {
      return target;
    }

    if (targetId.trim().length) {
      try {
        target = $('[id="' + targetId + '"]');
      } catch (e) {
        console.log('error scrollSpy', e);
      }
    }

    if (target && target.length) {
      return target;
    }

    return null;
  }

  $.fn.smoothScrollAnchor = function (options) {
    if (inCustomizer()) {
      return;
    }

    var elements = $(this);

    options = jQuery.extend({
      offset: 0
    }, options);

    elements.each(function () {
      var element = $(this);

      var target = options.target || getTargetForEl(element);
      if (target && target.length) {
        var elData = {
          element: element,
          options: options,
          target: target,
          targetSel: options.targetSel || '[id="' + target.attr('id').trim() + '"]',
          id: (target.attr('id') || '').trim()
        };

        element.off('click.smooth-scroll tap.smooth-scroll').on('click.smooth-scroll tap.smooth-scroll', function (event) {
          if ($(this).data('skip-smooth-scroll') || $(event.target).data('skip-smooth-scroll')) {
            return;
          }

          event.preventDefault();

          if (!$(this).data('allow-propagation')) {
            event.stopPropagation();
          }

          scrollItem(elData);

          if (elData.options.clickCallback) {
            elData.options.clickCallback.call(this, event);
          }
        });
      }
    });
  };

  $.fn.scrollSpy = function (options) {
    if (inCustomizer()) {
      return;
    }

    var elements = $(this);
    var id = 'spy-' + parseInt(Date.now() * Math.random());

    elements.each(function () {
      var element = $(this);
      var settings = jQuery.extend({
        onChange: function onChange() {},
        onLeave: function onLeave() {},
        clickCallback: function clickCallback() {},

        smoothScrollAnchor: false,
        offset: 0
      }, options);

      if (element.is('a') && (element.attr('href') || '').indexOf('#') !== -1) {
        var target = getTargetForEl(element);

        if (target) {
          var elData = {
            element: element,
            options: settings,
            target: target,
            targetSel: '[id="' + target.attr('id').trim() + '"]',
            id: target.attr('id').trim()
          };
          __toCheckOnScroll.addItem(id, elData);
          element.data('scrollSpy', elData);

          if (options.smoothScrollAnchor) {
            element.smoothScrollAnchor(options);
          }
        }
      }
    });
  };

  function update() {
    __toCheckOnScroll.eachCategory(function (items) {
      var ordered = items.sort(function (itemA, itemB) {
        return itemA.target.offset().top - itemB.target.offset().top;
      });
      var lastItem = ordered.filter(function (item) {
        var scrollY = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        return item.target.offset().top <= scrollY + window.innerHeight * 0.25;
      }).pop();
      ordered.forEach(function (item) {
        if (lastItem && item.element.is(lastItem.element)) {
          changeUrlHash(item.id, 5);
          item.options.onChange.call(item.element);
        } else {
          item.options.onLeave.call(item.element);
        }
      });
    });
  }

  function goToCurrentHash() {
    var hash = window.location.hash.replace('#', '');
    var currentItem = __toCheckOnScroll.all().filter(function (item) {
      return item.targetSel === '[id="' + decodeURIComponent(hash).trim() + '"]';
    });

    $(window).on('load', function () {
      if (currentItem.length) {
        scrollItem(currentItem[0]);
      }
      update();
    });
  }

  if (!inCustomizer()) {
    $(window).scroll(update);

    $(window).bind('smoothscroll.update', update);

    $(window).bind('smoothscroll.update', goToCurrentHash);

    $(goToCurrentHash);
  }
})(jQuery);

/***/ }),
/* 110 */
/***/ (function(module, exports) {

(function ($, Colibri) {
  var className = 'dropdown-menu';

  var arrowRightSvg = '<svg aria-hidden="true" data-prefix="fas" data-icon="angle-right" class="svg-inline--fa fa-angle-right fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg>';
  var arrowDownSvg = '<svg aria-hidden="true" data-prefix="fas" data-icon="angle-down" class="svg-inline--fa fa-angle-down fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path></svg>';
  var arrowUpSvg = '<svg aria-hidden="true" data-prefix="fas" data-icon="angle-up" class="svg-inline--fa fa-angle-up fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"></path></svg>';
  var Component = function Component(element, options) {
    this.namespace = className;
    this.defaults = {
      menuSelector: '.colibri-menu',
      offCanvasWrapper: '.colibri-menu-container',
      arrowSelector: 'svg.svg-inline--fa',
      linkSelector: '.menu-item-has-children > a, .page_item_has_children > a',
      menuLinkSelector: ' > .menu-item-has-children > a, > .page_item_has_children > a',
      subMenuLinkSelector: ' ul .menu-item-has-children > a, ul .page_item_has_children > a',
      $menu: null
    };

    // Parent Constructor
    Colibri.apply(this, arguments);

    // Initialization
    this.start();
  };

  Component.prototype = {
    start: function start() {
      var _this = this;

      var $menu = this.$element.find(this.opts.menuSelector).first();
      this.opts.$menu = $menu;

      this.stop();
      this.addLiListener();
      this.addSvgArrows();
      this.addReverseMenuLogic();

      /** TODO @catalin table menu logic needs work because it does not work*/
      this.addTabletMenuLogic();

      $(document).ready(function () {
        _this.addMenuScrollSpy($menu);
      });
    },
    stop: function stop() {
      this.removeAllSvgArrows();
      this.removeListeners();
    },
    copyLiEventTaA: function copyLiEventTaA(e) {
      var tagName = '';
      if (e.target && e.target.tagName) {
        tagName = e.target.tagName;
      }
      if (tagName.toLowerCase() === 'a') {
        return;
      }
      var a = $(e.target).find('> a');
      a[0].click();
    },
    addLiListener: function addLiListener() {
      this.opts.$menu.find('li').on('click', this.copyLiEventTaA);
    },
    addSvgArrows: function addSvgArrows() {
      var menuType = this.opts.data ? this.opts.data.type ? this.opts.data.type : null : null;
      switch (menuType) {
        case 'horizontal':
          this.addHorizontalMenuSvgArrows();
          break;
        case 'vertical':
          this.addVerticalMenuSvgArrow();
          break;
      }
    },
    addHorizontalMenuSvgArrows: function addHorizontalMenuSvgArrows() {
      var $menu = this.opts.$menu;
      var arrowSelector = this.opts.arrowSelector;
      var menuLinkSelector = this.opts.menuLinkSelector;
      var subMenuLinkSelector = this.opts.subMenuLinkSelector;

      $menu.find(menuLinkSelector).each(function () {
        if ($(this).children(arrowSelector).length === 0) {
          $(this).append(arrowDownSvg);
          // $(this).append(arrowUpSvg);
        }
      });
      $menu.find(subMenuLinkSelector).each(function () {
        if ($(this).children(arrowSelector).length === 0) {
          $(this).append(arrowRightSvg);
        }
      });
    },
    addVerticalMenuSvgArrow: function addVerticalMenuSvgArrow() {
      var $menu = this.opts.$menu;
      var arrowSelector = this.opts.arrowSelector;
      var linkSelector = this.opts.linkSelector;
      $menu.find(linkSelector).each(function () {
        if ($(this).children(arrowSelector).length === 0) {
          $(this).append(arrowRightSvg);
        }
      });
    },
    removeAllSvgArrows: function removeAllSvgArrows() {
      if (this.opts.$menu) {
        this.opts.$menu.find(this.opts.arrowSelector).remove();
      }
    },
    removeListeners: function removeListeners() {
      var $menu = this.opts.$menu;
      $menu.off('mouseover.navigation');
      $menu.find('li').off('click', this.copyLiEventTaA);
      this.removeTabletLogic();
    },
    removeTabletLogic: function removeTabletLogic() {
      var $menu = this.opts.$menu;
      $menu.off('tap.navigation');
    },
    addReverseMenuLogic: function addReverseMenuLogic() {
      var $menu = this.opts.$menu;
      var self = this;
      $menu.on('mouseover.navigation', 'li', function () {
        $menu.find('li.hover').removeClass('hover');
        self.setOpenReverseClass($menu, $(this));
      });
    },
    setOpenReverseClass: function setOpenReverseClass($menu, $item) {
      // level 0 - not in dropdown
      if (this.getItemLevel($menu, $item) > 0) {
        var $submenu = $item.children('ul');
        var subItemDoesNotFit = $submenu.length && $item.offset().left + $item.width() + 300 > window.innerWidth;
        var parentsAreReversed = $submenu.length && $item.closest('.open-reverse').length;

        if (subItemDoesNotFit || parentsAreReversed) {
          $submenu.addClass('open-reverse');
        } else {
          if ($submenu.length) {
            $submenu.removeClass('open-reverse');
          }
        }
      }
    },
    getItemLevel: function getItemLevel($menu, $item) {
      var menuSelector = this.opts.menuSelector;
      var temp2 = $item.parentsUntil(menuSelector);
      var temp = temp2.filter('li');
      return temp.length;
    },
    addTabletMenuLogic: function addTabletMenuLogic() {
      var self = this;
      var $menu = this.opts.$menu;
      if (!this.opts.clickOnLink) {
        this.opts.clickOnLink = this.clickOnLink.bind(this);
      }
      if (!this.opts.clickOnArrow) {
        this.opts.clickOnArrow = this.clickOnArrow.bind(this);
      }

      $menu.off('tap.navigation', this.opts.clickOnArrow);
      $menu.on('tap.navigation', 'li.menu-item > a svg', this.opts.clickOnArrow);

      $menu.off('tap.navigation', this.opts.clickOnLink);
      $menu.on('tap.navigation', 'li.menu-item > a', this.opts.clickOnLink);
    },
    clickOnLink: function clickOnLink(event) {
      var arrowWasClicked = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var self = this;
      var $this = $(event.target);
      var $item = $this.closest('li');
      var $link = $this.closest('a');
      var $menu = this.opts.$menu;
      var $submenu = $item.children('ul');

      if ($submenu.length) {
        if (self.isSelectedItem($item)) {
          var href = $link.attr('href');

          // do nothing if nothing
          if (href.indexOf('#') === 0) {
            var anchor = href.replace('#', '').trim();

            if (!anchor || !$('#' + anchor).length) {
              return;
            }
          }
          event.stopPropagation();
          if (arrowWasClicked) {
            event.preventDefault();
          }
          self.deselectItems($menu, $item);
        } else {
          event.stopPropagation();
          event.preventDefault();
          self.selectItem($menu, $item);
        }
      } else {
        event.stopPropagation();
        if (arrowWasClicked || !arrowWasClicked && self.isSelectedItem($item)) {
          event.preventDefault();
        }
        self.deselectItems($menu, $item);
      }
    },
    clickOnArrow: function clickOnArrow(event) {
      this.clickOnLink(event, true);
    },
    selectItem: function selectItem($menu, $item) {
      this.deselectItems($menu, $item);
      $item.attr('data-selected-item', true);
      this.clearMenuHovers($menu, $item);
      $item.addClass('hover');
      this.setOpenReverseClass($menu, $item);
      var self = this;
      $('body').on('tap.navigation-clear-selection', '*', function () {
        var $this = jQuery(this);
        self.clearSelectionWhenTapOutside($this, $menu);
      });

      $(window).on('scroll.navigation-clear-selection', function () {
        var $this = jQuery(this);
        self.clearSelectionWhenTapOutside($this, $menu);
      });
    },
    deselectItems: function deselectItems($menu, $item) {
      $item.removeClass('hover');
      $menu.find('[data-selected-item]').each(function () {
        var $item = $(this);
        $item.removeAttr('data-selected-item');
        var $submenu = $menu.children('ul');

        //TODO @catalin, check if this mobile menu code is needed
        if ($menu.is('.mobile-menu')) {
          $submenu.slideDown();
        }
      });
    },
    isSelectedItem: function isSelectedItem($item) {
      return $item.is('[data-selected-item]');
    },
    clearMenuHovers: function clearMenuHovers($menu, except) {
      var self = this;
      $menu.find('li.hover').each(function () {
        if (except && self.containsSelectedItem($(this))) {
          return;
        }
        $(this).removeClass('hover');
      });
    },
    containsSelectedItem: function containsSelectedItem($item) {
      return $item.find('[data-selected-item]').length > 0 || $item.is('[data-selected-item]');
    },
    clearSelectionWhenTapOutside: function clearSelectionWhenTapOutside($this, $menu) {
      $('body').off('tap.navigation-clear-selection');
      $(window).off('scroll.navigation-clear-selection');
      if ($this.is($menu) || $.contains($menu[0], this)) {
        return;
      }
      this.clearMenuHovers($menu);
    },
    addMenuScrollSpy: function addMenuScrollSpy(startFrom) {
      var $menu = startFrom;
      var _offset = 20;
      if ($.fn.scrollSpy) {
        $menu.find('a').scrollSpy({
          onChange: function onChange() {
            $menu.find('.current-menu-item,.current_page_item').removeClass('current-menu-item current_page_item');
            $(this).closest('li').addClass('current-menu-item current_page_item');
          },
          onLeave: function onLeave() {
            $(this).closest('li').removeClass('current-menu-item current_page_item');
          },

          smoothScrollAnchor: true,
          offset: function offset() {
            var $fixed = $menu.closest('[data-colibri-component="navigation"]');
            if ($fixed.length) {
              return $fixed[0].getBoundingClientRect().height + _offset;
            }

            return _offset;
          }
        });
      }

      $(window).trigger('smoothscroll.update');
    }
  };

  Component.inherits(Colibri);
  Colibri[className] = Component;

  Colibri.Plugin.create(className);
  Colibri.Plugin.autoload(className);
})(jQuery, Colibri);

/***/ }),
/* 111 */
/***/ (function(module, exports) {

(function ($, Colibri) {
  var className = 'navigation';

  var Component = function Component(element, options) {
    this.namespace = className;
    this.defaults = {
      data: {
        sticky: {
          className: 'h-navigation_sticky',
          startAfterNode: {
            enabled: false,
            selector: ''
          },
          animations: {
            enabled: false,
            currentInAnimationClass: '',
            currentOutAnimationClass: '',
            allInAnimationsClasses: '',
            allOutAnimationsClasses: '',
            duration: 0
          },
          zIndex: 9999,
          responsiveWidth: true,
          center: true,
          useShrink: true,
          toBottom: false,
          useNativeSticky: false,
          always: false
        },
        overlap: false,
        overlapIsActive: false
      }
    };
    // Parent Constructor
    Colibri.apply(this, arguments);
    this.computeOverlapPaddingDelayed = jQuery.debounce(this.computeOverlapPadding.bind(this), 10);

    //The script still is called two times but now both of the calls pass the check
    // if (!this.scriptCallIsValid()) {
    //   return;
    // }

    // Initialization
    this.start();
  };

  Component.prototype = {
    start: function start() {
      var data = {};
      if (this.opts.data) {
        data = this.opts.data;
      }
      if (data.sticky) {
        this.startSticky(data.sticky);
      }

      if (data.overlap) {
        this.startOverlap();
      }
    },


    //TODO @catalin this is a temporary workaround, until the issue: #0030376 is fixed
    scriptCallIsValid: function scriptCallIsValid() {
      var isInCustomizer = Colibri.isCustomizerPreview();
      if (!isInCustomizer) {
        return true;
      }
      var vueNavSelector = '.h-navigation_outer';
      var vueNav = $(this.$element).closest(vueNavSelector).get(0);
      if (!vueNav) {
        return true;
      }
      if (vueNav.__vue__) {
        return true;
      }
      return false;
    },
    startOverlap: function startOverlap() {
      var self = this;
      var $target = this.$element.closest('[data-colibri-navigation-overlap]');
      //for backward compatibility reasons
      if ($target.length === 0) {
        $target = this.$element;
      }
      this.overlapTarget = $target.get(0);
      this.overlapIsActive = true;
      $(window).bind('resize.overlap orientationchange.overlap', this.computeOverlapPaddingDelayed);
      window.addResizeListener(this.overlapTarget, this.computeOverlapPaddingDelayed);
      self.computeOverlapPadding();
    },
    stopOverlap: function stopOverlap() {
      this.overlapIsActive = false;
      if (this.$sheet) {
        document.head.removeChild(this.$sheet);
        this.$sheet = null;
      }
      $(window).off('.overlap');
      window.removeResizeListener(this.overlapTarget, this.computeOverlapPaddingDelayed);
    },
    computeOverlapPadding: function computeOverlapPadding() {
      if (!this.overlapIsActive) {
        return;
      }
      if (!this.$sheet) {
        this.$sheet = document.createElement('style');
        document.head.appendChild(this.$sheet);
      }
      var paddingTop = this.overlapTarget.offsetHeight + 'px !important;';
      this.$sheet.innerHTML = '.h-navigation-padding{padding-top:' + paddingTop + '}';
    },
    startSticky: function startSticky(data) {
      var self = this;

      this.$element.data('stickData', data);
      this.$element.fixTo('body', data);

      if (!Colibri.isCustomizerPreview()) {
        this.prepareSticky();
      }

      this.$element.bind('fixto-added.sticky', function () {
        self.$element.attr('data-in-sticky-state', true);
      });

      this.$element.bind('fixto-add.sticky', function () {
        self.$element.closest('.h-navigation_outer').css('min-height', self.$element[0].offsetHeight);
      });

      this.$element.bind('fixto-removed.sticky', function () {
        self.$element.removeAttr('data-in-sticky-state');
        self.resetParentHeight();
      });

      $(window).bind('resize.sticky orientationchange.sticky', function () {
        setTimeout(self.resizeCallback.bind(self), 50);
      });
      $(window).trigger('resize.sticky');
    },
    stopSticky: function stopSticky() {
      var instance = this.fixToInstance();
      if (instance) {
        instance.destroy();
        $(window).off('.sticky');
        this.$element.removeData('fixto-instance');
        this.resetParentHeight();
      }
    },
    resetParentHeight: function resetParentHeight() {
      var navOuter = this.$element.closest('.h-navigation_outer');
      var delay = parseFloat(this.$element.css('animation-duration')) * 1000;
      navOuter.css('animation-duration', 0);
      setTimeout(function () {
        navOuter.css('min-height', '');
        navOuter.css('animation-duration', '');
      }, delay + 50);
    },
    stop: function stop() {
      this.stopSticky();
      this.stopOverlap();
    },
    prepareSticky: function prepareSticky() {
      var self = this;

      this.normal = this.$element.find('[data-nav-normal]');
      this.sticky = this.$element.find('[data-nav-sticky]');

      this.sticky.find('span[data-placeholder]').each(function () {
        $(this).parent().attr('data-placeholder', $(this).attr('data-placeholder'));
        $(this).remove();
      });

      if (!this.sticky.length || !this.sticky.children().length) {
        return;
      }

      this.$element.bind('fixto-added.sticky', function () {
        self.moveElementsToSticky();
      });

      this.$element.bind('fixto-removed.sticky', function () {
        self.moveElementsToNormal();
      });
    },
    moveElementsToSticky: function moveElementsToSticky() {
      var stickyEls = this.sticky.find('[data-placeholder]');
      var self = this;
      stickyEls.each(function (index, el) {
        $this = $(this);

        var type = $this.attr('data-placeholder');

        var content = self.normal.find('[data-placeholder-provider=' + type + '] .h-column__content >');
        var stickyEquiv = $this;

        if (stickyEquiv && content.length) {
          $(stickyEquiv).append(content);
        }
      });

      this.normal.hide();
      this.sticky.show();
    },
    moveElementsToNormal: function moveElementsToNormal() {
      var stickyEls = this.sticky.find('[data-placeholder]');
      var self = this;
      stickyEls.each(function (index, el) {
        $this = $(this);

        var type = $this.attr('data-placeholder');

        var content = self.sticky.find('[data-placeholder=' + type + '] >');
        var equiv = self.normal.find('[data-placeholder-provider=' + type + '] .h-column__content');

        if (equiv && content.length) {
          $(equiv).append(content);
        }
      });

      this.normal.show();
      this.sticky.hide();
    },
    fixToInstance: function fixToInstance() {
      var data = this.$element.data();
      if (data && data.fixtoInstance) {
        return data.fixtoInstance;
      }
      return false;
    },
    resizeCallback: function resizeCallback() {
      if (window.innerWidth < 1024) {
        var data = this.$element.data();
        var stickData = data.stickData;

        if (!stickData) {
          return;
        }

        var fixToInstance = data.fixtoInstance;
        if (!fixToInstance) {
          return true;
        }

        if (window.innerWidth <= 767) {
          if (!stickData.stickyOnMobile) {
            fixToInstance.stop();
          }
        } else {
          if (!stickData.stickyOnTablet) {
            fixToInstance.stop();
          }
        }
      } else {
        var data = this.$element.data();
        if (!data) {
          return;
        }

        var fixToInstance = data.fixtoInstance;
        if (!fixToInstance) {
          return true;
        }

        fixToInstance.refresh();
        fixToInstance.start();
      }
    }
  };
  Component.inherits(Colibri);
  Colibri[className] = Component;

  Colibri.Plugin.create(className);
  Colibri.Plugin.autoload(className);
})(jQuery, Colibri);

/***/ }),
/* 112 */
/***/ (function(module, exports) {

(function ($, window, document) {
  // Start Computed Style. Please do not modify this module here. Modify it from its own repo. See address below.

  /*! Computed Style - v0.1.0 - 2012-07-19
   * https://github.com/bbarakaci/computed-style
   * Copyright (c) 2012 Burak Barakaci; Licensed MIT */
  var computedStyle = function () {
    var computedStyle = {
      getAll: function getAll(element) {
        return document.defaultView.getComputedStyle(element);
      },
      get: function get(element, name) {
        return this.getAll(element)[name];
      },
      toFloat: function toFloat(value) {
        return parseFloat(value, 10) || 0;
      },
      getFloat: function getFloat(element, name) {
        return this.toFloat(this.get(element, name));
      },
      _getAllCurrentStyle: function _getAllCurrentStyle(element) {
        return element.currentStyle;
      }
    };

    if (document.documentElement.currentStyle) {
      computedStyle.getAll = computedStyle._getAllCurrentStyle;
    }

    return computedStyle;
  }();

  // End Computed Style. Modify whatever you want to.

  var mimicNode = function () {
    /*
    Class Mimic Node
    Dependency : Computed Style
    Tries to mimick a dom node taking his styles, dimensions. May go to his repo if gets mature.
    */

    function MimicNode(element) {
      this.element = element;
      this.replacer = document.createElement('div');
      this.replacer.style.visibility = 'hidden';
      this.hide();
      element.parentNode.insertBefore(this.replacer, element);
    }

    MimicNode.prototype = {
      replace: function replace() {
        var rst = this.replacer.style;
        var styles = computedStyle.getAll(this.element);

        // rst.width = computedStyle.width(this.element) + 'px';
        // rst.height = this.element.offsetHeight + 'px';

        // Setting offsetWidth
        rst.width = this._width();
        rst.height = this._height();

        // Adopt margins
        rst.marginTop = styles.marginTop;
        rst.marginBottom = styles.marginBottom;
        rst.marginLeft = styles.marginLeft;
        rst.marginRight = styles.marginRight;

        // Adopt positioning
        rst.cssFloat = styles.cssFloat;
        rst.styleFloat = styles.styleFloat; //ie8;
        rst.position = styles.position;
        rst.top = styles.top;
        rst.right = styles.right;
        rst.bottom = styles.bottom;
        rst.left = styles.left;
        // rst.borderStyle = styles.borderStyle;

        rst.display = styles.display;
      },
      hide: function hide() {
        this.replacer.style.display = 'none';
      },
      _width: function _width() {
        return this.element.getBoundingClientRect().width + 'px';
      },
      _widthOffset: function _widthOffset() {
        return this.element.offsetWidth + 'px';
      },
      _height: function _height() {
        return jQuery(this.element).outerHeight() + 'px';
      },
      _heightOffset: function _heightOffset() {
        return this.element.offsetHeight + 'px';
      },
      destroy: function destroy() {
        $(this.replacer).remove();

        // set properties to null to break references
        for (var prop in this) {
          if (this.hasOwnProperty(prop)) {
            this[prop] = null;
          }
        }
      }
    };

    var bcr = document.documentElement.getBoundingClientRect();
    if (!bcr.width) {
      MimicNode.prototype._width = MimicNode.prototype._widthOffset;
      MimicNode.prototype._height = MimicNode.prototype._heightOffset;
    }

    return {
      MimicNode: MimicNode,
      computedStyle: computedStyle
    };
  }();

  // Class handles vendor prefixes
  function Prefix() {
    // Cached vendor will be stored when it is detected
    this._vendor = null;

    //this._dummy = document.createElement('div');
  }

  Prefix.prototype = {
    _vendors: {
      webkit: {
        cssPrefix: '-webkit-',
        jsPrefix: 'Webkit'
      },
      moz: {
        cssPrefix: '-moz-',
        jsPrefix: 'Moz'
      },
      ms: {
        cssPrefix: '-ms-',
        jsPrefix: 'ms'
      },
      opera: {
        cssPrefix: '-o-',
        jsPrefix: 'O'
      }
    },

    _prefixJsProperty: function _prefixJsProperty(vendor, prop) {
      return vendor.jsPrefix + prop[0].toUpperCase() + prop.substr(1);
    },
    _prefixValue: function _prefixValue(vendor, value) {
      return vendor.cssPrefix + value;
    },
    _valueSupported: function _valueSupported(prop, value, dummy) {
      // IE8 will throw Illegal Argument when you attempt to set a not supported value.
      try {
        dummy.style[prop] = value;
        return dummy.style[prop] === value;
      } catch (er) {
        return false;
      }
    },


    /**
     * Returns true if the property is supported
     * @param {string} prop Property name
     * @returns {boolean}
     */
    propertySupported: function propertySupported(prop) {
      // Supported property will return either inine style value or an empty string.
      // Undefined means property is not supported.
      return document.documentElement.style[prop] !== undefined;
    },


    /**
     * Returns prefixed property name for js usage
     * @param {string} prop Property name
     * @returns {string|null}
     */
    getJsProperty: function getJsProperty(prop) {
      // Try native property name first.
      if (this.propertySupported(prop)) {
        return prop;
      }

      // Prefix it if we know the vendor already
      if (this._vendor) {
        return this._prefixJsProperty(this._vendor, prop);
      }

      // We don't know the vendor, try all the possibilities
      var prefixed;
      for (var vendor in this._vendors) {
        prefixed = this._prefixJsProperty(this._vendors[vendor], prop);
        if (this.propertySupported(prefixed)) {
          // Vendor detected. Cache it.
          this._vendor = this._vendors[vendor];
          return prefixed;
        }
      }

      // Nothing worked
      return null;
    },


    /**
     * Returns supported css value for css property. Could be used to check support or get prefixed value string.
     * @param {string} prop Property
     * @param {string} value Value name
     * @returns {string|null}
     */
    getCssValue: function getCssValue(prop, value) {
      // Create dummy element to test value
      var dummy = document.createElement('div');

      // Get supported property name
      var jsProperty = this.getJsProperty(prop);

      // Try unprefixed value
      if (this._valueSupported(jsProperty, value, dummy)) {
        return value;
      }

      var prefixedValue;

      // If we know the vendor already try prefixed value
      if (this._vendor) {
        prefixedValue = this._prefixValue(this._vendor, value);
        if (this._valueSupported(jsProperty, prefixedValue, dummy)) {
          return prefixedValue;
        }
      }

      // Try all vendors
      for (var vendor in this._vendors) {
        prefixedValue = this._prefixValue(this._vendors[vendor], value);
        if (this._valueSupported(jsProperty, prefixedValue, dummy)) {
          // Vendor detected. Cache it.
          this._vendor = this._vendors[vendor];
          return prefixedValue;
        }
      }
      // No support for value
      return null;
    }
  };

  var prefix = new Prefix();

  // We will need this frequently. Lets have it as a global until we encapsulate properly.
  var transformJsProperty = prefix.getJsProperty('transform');

  // Will hold if browser creates a positioning context for fixed elements.
  var fixedPositioningContext;

  // Checks if browser creates a positioning context for fixed elements.
  // Transform rule will create a positioning context on browsers who follow the spec.
  // Ie for example will fix it according to documentElement
  // TODO: Other css rules also effects. perspective creates at chrome but not in firefox. transform-style preserve3d effects.
  function checkFixedPositioningContextSupport() {
    var support = false;
    var parent = document.createElement('div');
    var child = document.createElement('div');
    parent.appendChild(child);
    parent.style[transformJsProperty] = 'translate(0)';
    // Make sure there is space on top of parent
    parent.style.marginTop = '10px';
    parent.style.visibility = 'hidden';
    child.style.position = 'fixed';
    child.style.top = 0;
    document.body.appendChild(parent);
    var rect = child.getBoundingClientRect();
    // If offset top is greater than 0 meand transformed element created a positioning context.
    if (rect.top > 0) {
      support = true;
    }
    // Remove dummy content
    document.body.removeChild(parent);
    return support;
  }

  // It will return null if position sticky is not supported
  var nativeStickyValue = prefix.getCssValue('position', 'sticky');

  // It will return null if position fixed is not supported
  var fixedPositionValue = prefix.getCssValue('position', 'fixed');

  // Dirty business
  var ie = navigator.appName === 'Microsoft Internet Explorer';
  var ieversion;

  if (ie) {
    ieversion = parseFloat(navigator.appVersion.split('MSIE')[1]);
  }

  function FixTo(child, parent, options) {
    this.child = child;
    this._$child = $(child);
    this.parent = parent;
    this.options = {
      className: 'fixto-fixed',
      startAfterNode: {
        enabled: false,
        selector: ''
      },
      animations: {
        enabled: false,
        currentInAnimationClass: '',
        currentOutAnimationClass: '',
        allInAnimationsClasses: '',
        allOutAnimationsClasses: '',
        duration: 0
      },
      top: 0,
      zIndex: ''
    };
    this._setOptions(options);

    this._initAnimations();
  }

  FixTo.prototype = {
    // Returns the total outerHeight of the elements passed to mind option. Will return 0 if none.
    _mindtop: function _mindtop() {
      var top = 0;
      if (this._$mind) {
        var el;
        var rect;
        var height;
        for (var i = 0, l = this._$mind.length; i < l; i++) {
          el = this._$mind[i];
          rect = el.getBoundingClientRect();
          if (rect.height) {
            top += rect.height;
          } else {
            var styles = computedStyle.getAll(el);
            top += el.offsetHeight + computedStyle.toFloat(styles.marginTop) + computedStyle.toFloat(styles.marginBottom);
          }
        }
      }
      return top;
    },
    _updateOutAnimationDuration: function _updateOutAnimationDuration() {
      var animationDuration = this.options.animations.duration;
      if (isNaN(animationDuration)) {
        animationDuration = 0;
      }

      this._animationDuration = animationDuration;
    },
    _initAnimations: function _initAnimations() {
      var animations = this.options.animations;
      this._$child.removeClass(animations.allInAnimationsClasses);
      this._$child.removeClass(animations.allOutAnimationsClasses);

      var self = this;
      this._updateOutAnimationDuration();

      this._animationOutDebounce = $.debounce(function () {
        self._$child.removeClass(self.options.animations.allOutAnimationsClasses);
        self._inOutAnimation = false;
        self._unfix();
        self._removeTransitionFromOutAnimation();
      }, 100);

      this._animationInDebounce = $.debounce(function () {
        self._inInAnimation = false;
        self._$child.removeClass(self.options.animations.allInAnimationsClasses);
      }, this._animationDuration);
    },
    _removeTransitionFromOutAnimation: function _removeTransitionFromOutAnimation() {
      var noTransitionClass = 'h-global-transition-disable';
      this._$child.addClass(noTransitionClass);

      var childTransitionDuration = this._$child.css('transition-duration');
      var isNumberRegex = /\d+/;
      var transitionDurationInS = childTransitionDuration.match(isNumberRegex)[0];
      if (!transitionDurationInS) {
        transitionDurationInS = 0;
      }

      var transitionDurationInMs = transitionDurationInS * 1000;
      var transitionBuffer = 500;
      var transitionDuration = transitionDurationInMs + transitionBuffer;
      var self = this;
      setTimeout(function () {
        if (!self._$child) {
          return;
        }
        self._$child.removeClass(noTransitionClass);
      }, transitionDuration);
    },
    _passedStartAfterNode: function _passedStartAfterNode() {
      var $startAfterNode = this._$startAfterNode;
      if ($startAfterNode && $startAfterNode.length > 0) {
        var offsetTop = this._afterElementOffsetTop;
        var height = $startAfterNode.outerHeight();
        return this._scrollTop > offsetTop + height;
      }
      return true;
    },

    // Public method to stop the behaviour of this instance.
    stop: function stop() {
      this._stop();
      this._running = false;
    },


    // Public method starts the behaviour of this instance.
    start: function start() {
      // Start only if it is not running not to attach event listeners multiple times.
      if (!this._running) {
        this._start();
        this._running = true;
      }
    },


    //Public method to destroy fixto behaviour
    destroy: function destroy() {
      this.stop();

      this._destroy();

      // Remove jquery data from the element
      this._$child.removeData('fixto-instance');

      // set properties to null to break references
      for (var prop in this) {
        if (this.hasOwnProperty(prop)) {
          this[prop] = null;
        }
      }
    },
    _setOptions: function _setOptions(options) {
      $.extend(true, this.options, options);
      if (this.options.mind) {
        this._$mind = $(this.options.mind);
      }
      if (this.options.startAfterNode.enabled && this.options.startAfterNode.selector) {
        this._$startAfterNode = $(this.options.startAfterNode.selector);
      }
    },
    setOptions: function setOptions(options) {
      this._setOptions(options);
      this.refresh();
    },


    // Methods could be implemented by subclasses

    _stop: function _stop() {},
    _start: function _start() {},
    _destroy: function _destroy() {},
    refresh: function refresh() {}
  };

  // Class FixToContainer
  function FixToContainer(child, parent, options) {
    /** FIXME If you have a saved navigation with sticky, when you enter the page, this class creates two objects
     * and because of that there are two events listeners. There should be only one instance of this class for each
     * navigation
     */
    //The script still is called two times but now both of the calls pass the check
    // if (!child || !this._scriptCallIsValid(child)) {
    //   return;
    // }
    FixTo.call(this, child, parent, options);
    this._replacer = new mimicNode.MimicNode(child);
    this._ghostNode = this._replacer.replacer;

    this._saveStyles();

    this._saveViewportHeight();

    // Create anonymous functions and keep references to register and unregister events.
    this._proxied_onscroll = this._bind(this._onscroll, this);
    this._proxied_onresize = this._bind(this._onresize, this);

    this.start();
  }

  FixToContainer.prototype = new FixTo();

  $.extend(FixToContainer.prototype, {
    // Returns an anonymous function that will call the given function in the given context
    _bind: function _bind(fn, context) {
      return function () {
        return fn.call(context);
      };
    },


    // at ie8 maybe only in vm window resize event fires everytime an element is resized.
    _toresize: ieversion === 8 ? document.documentElement : window,

    //TODO @catalin this is a temporary workaround, until the issue: #0030376 is fixed
    _scriptCallIsValid: function _scriptCallIsValid(child) {
      var isInCustomizer = Colibri.isCustomizerPreview();
      if (!isInCustomizer) {
        return true;
      }
      var vueNavSelector = '.h-navigation_outer';
      var vueNav = $(child).closest(vueNavSelector).get(0);
      if (!vueNav) {
        return true;
      }
      if (vueNav.__vue__) {
        return true;
      }
      return false;
    },

    _onscroll: function _onscroll() {
      /**
       * TODO @catalin, now sometimes the child height is 0, other times is correct that ruins the out animation logic,
       * until that is fixed this is a workaround to that problem. When the child height will always be correct remove
       * this condition.
       */
      this._scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      this._parentBottom = this.parent.offsetHeight + this._fullOffset('offsetTop', this.parent);
      if (this.options.startAfterNode && !this._passedStartAfterNode()) {
        if (this.fixed && !this._inOutAnimation) {
          this._unfixFromScrollListener();
        }
        return;
      }
      // if (this.options.mindBottomPadding !== false) {
      //     this._parentBottom -= computedStyle.getFloat(this.parent, 'paddingBottom');
      // }

      // if (this.options.toBottom) {
      //     this._fix();
      //     this._adjust();
      //     return
      // }

      // if (this.options.toBottom) {
      //     this.options.top = this._viewportHeight - computedStyle.toFloat(computedStyle.getAll(this.child).height) - this.options.topSpacing;
      // }
      if (!this.fixed) {
        var childStyles = computedStyle.getAll(this.child);

        if (this._scrollTop < this._parentBottom && this._scrollTop > this._fullOffset('offsetTop', this.child) - this.options.top - this._mindtop() && this._viewportHeight > this.child.offsetHeight + computedStyle.toFloat(childStyles.marginTop) + computedStyle.toFloat(childStyles.marginBottom) || this.options.toBottom) {
          this._fix();
          this._adjust();
        }
      } else {
        if (this.options.toBottom) {
          if (this._scrollTop >= this._fullOffset('offsetTop', this._ghostNode)) {
            this._unfixFromScrollListener();
            return;
          }
        } else {
          if (this._scrollTop > this._parentBottom || this._scrollTop <= this._fullOffset('offsetTop', this._ghostNode) - this.options.top - this._mindtop()) {
            this._unfixFromScrollListener();
            return;
          }
        }
        this._adjust();
      }
    },

    _adjust: function _adjust() {
      var top = 0;
      var mindTop = this._mindtop();
      var diff = 0;
      var childStyles = computedStyle.getAll(this.child);
      var context = null;

      if (fixedPositioningContext) {
        // Get positioning context.
        context = this._getContext();
        if (context) {
          // There is a positioning context. Top should be according to the context.
          top = Math.abs(context.getBoundingClientRect().top);
        }
      }

      diff = this._parentBottom - this._scrollTop - (this.child.offsetHeight + computedStyle.toFloat(childStyles.marginBottom) + mindTop + this.options.top);

      if (diff > 0) {
        diff = 0;
      }

      if (this.options.toBottom) {
        // this.child.style.top = (diff + mindTop + top + this.options.top) - computedStyle.toFloat(childStyles.marginTop) + 'px';
      } else {
        var _top = this.options.top;
        if (_top === 0) {
          _top = $('body').offset().top;
        }

        this.child.style.top = Math.round(diff + mindTop + top + _top - computedStyle.toFloat(childStyles.marginTop)) + 'px';
      }
    },

    // Calculate cumulative offset of the element.
    // Optionally according to context
    _fullOffset: function _fullOffset(offsetName, elm, context) {
      var offset = elm[offsetName];
      var offsetParent = elm.offsetParent;

      // Add offset of the ascendent tree until we reach to the document root or to the given context
      while (offsetParent !== null && offsetParent !== context) {
        offset = offset + offsetParent[offsetName];
        offsetParent = offsetParent.offsetParent;
      }

      return offset;
    },

    // Get positioning context of the element.
    // We know that the closest parent that a transform rule applied will create a positioning context.
    _getContext: function _getContext() {
      var parent;
      var element = this.child;
      var context = null;
      var styles;

      // Climb up the treee until reaching the context
      while (!context) {
        parent = element.parentNode;
        if (parent === document.documentElement) {
          return null;
        }

        styles = computedStyle.getAll(parent);
        // Element has a transform rule
        if (styles[transformJsProperty] !== 'none') {
          context = parent;
          break;
        }
        element = parent;
      }
      return context;
    },


    _fix: function _fix() {
      var child = this.child;
      var childStyle = child.style;
      var childStyles = computedStyle.getAll(child);
      var left = child.getBoundingClientRect().left;
      var width = childStyles.width;

      this._$child.trigger('fixto-add');

      this._saveStyles();

      if (document.documentElement.currentStyle) {
        // Function for ie<9. When hasLayout is not triggered in ie7, he will report currentStyle as auto, clientWidth as 0. Thus using offsetWidth.
        // Opera also falls here

        width = child.offsetWidth;
        if (childStyles.boxSizing !== 'border-box') {
          width = width - (computedStyle.toFloat(childStyles.paddingLeft) + computedStyle.toFloat(childStyles.paddingRight) + computedStyle.toFloat(childStyles.borderLeftWidth) + computedStyle.toFloat(childStyles.borderRightWidth));
        }

        width += 'px';
      }

      // Ie still fixes the container according to the viewport.
      if (fixedPositioningContext) {
        var context = this._getContext();
        // if(context) {
        //     // There is a positioning context. Left should be according to the context.
        //     left = child.getBoundingClientRect().left - context.getBoundingClientRect().left;
        // } else {
        left = this._$child.offset().left;
        // }
      }

      this._replacer.replace();

      childStyle.left =
      /*left + "px"; */left - computedStyle.toFloat(childStyles.marginLeft) + 'px';
      childStyle.width = width;

      childStyle.position = 'fixed';
      if (this.options.toBottom) {
        childStyle.top = '';
        childStyle.bottom = this.options.top + computedStyle.toFloat(childStyles.marginBottom) + 'px';
      } else {
        childStyle.bottom = '';
        var _top = this.options.top;

        if (_top === 0) {
          _top = $('body').offset().top;
        }
        childStyle.top = this._mindtop() + _top - computedStyle.toFloat(childStyles.marginTop) + 'px';
      }

      if (this.options.zIndex) {
        this.child.style.zIndex = this.options.zIndex;
      }

      this._$child.addClass(this.options.className);
      var animations = this.options.animations;
      this._$child.removeClass(animations.allInAnimationsClasses);
      if (animations.enabled) {
        this._$child.addClass(animations.currentInAnimationClass);
        if (!this._inInAnimation) {
          this._inInAnimation = true;
          this._animationInDebounce();
        }
      }
      this.fixed = true;
      this._$child.trigger('fixto-added');
    },
    _unfixFromScrollListener: function _unfixFromScrollListener() {
      this._$child.trigger('fixto-unnfix-from-scroll');
      if (this.options.animations.enabled) {
        this._unfixTriggerAnimation();
      } else {
        this._unfix();
      }
    },
    _getAfterElementOffsetTop: function _getAfterElementOffsetTop() {
      var $node = this._$startAfterNode;
      var defaultValue = 0;
      if ($node && $node.length > 0) {
        var elem = $node.get(0);
        var distance = 0;
        do {
          // Increase our distance counter
          distance += elem.offsetTop;

          // Set the element to it's parent
          elem = elem.offsetParent;
        } while (elem);
        distance = distance < defaultValue ? defaultValue : distance;
        return distance;
      }
      return defaultValue;
    },

    _unfix: function _unfix() {
      this._replacer.hide();
      var childStyle = this.child.style;
      childStyle.position = this._childOriginalPosition;
      childStyle.top = this._childOriginalTop;
      childStyle.bottom = this._childOriginalBottom;
      childStyle.width = this._childOriginalWidth;
      childStyle.left = this._childOriginalLeft;
      childStyle.zIndex = this._childOriginalZIndex;
      if (!this.options.always) {
        this._$child.removeClass(this.options.className);
        this._$child.trigger('fixto-removed');
      }
      this.fixed = false;
    },
    _unfixTriggerAnimation: function _unfixTriggerAnimation() {
      this._$child.trigger('fixto-animated-remove');
      this._animationInDebounce.flush();
      var animations = this.options.animations;
      this._$child.removeClass(animations.allInAnimationsClasses);
      this._$child.removeClass(animations.allOutAnimationsClasses);
      if (animations.enabled) {
        this._$child.addClass(animations.currentOutAnimationClass);
      }
      this._inOutAnimation = true;
      this._animationOutDebounce();
    },
    _saveStyles: function _saveStyles() {
      this._animationOutDebounce.flush();
      var childStyle = this.child.style;
      this._childOriginalPosition = childStyle.position;
      if (this.options.toBottom) {
        this._childOriginalTop = '';
        this._childOriginalBottom = childStyle.bottom;
      } else {
        this._childOriginalTop = childStyle.top;
        this._childOriginalBottom = '';
      }
      this._childOriginalWidth = childStyle.width;
      this._childOriginalLeft = childStyle.left;
      this._childOriginalZIndex = childStyle.zIndex;
      this._afterElementOffsetTop = this._getAfterElementOffsetTop();
    },
    _onresize: function _onresize() {
      this.refresh();
    },
    _saveViewportHeight: function _saveViewportHeight() {
      // ie8 doesn't support innerHeight
      this._viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    },
    _stop: function _stop() {
      // Unfix the container immediately.
      this._unfix();
      // remove event listeners
      $(window).unbind('scroll.fixto mousewheel', this._proxied_onscroll);
      $(this._toresize).unbind('resize.fixto', this._proxied_onresize);
    },
    _start: function _start() {
      // Trigger onscroll to have the effect immediately.
      this._onscroll();

      // Attach event listeners
      $(window).bind('scroll.fixto mousewheel', this._proxied_onscroll);
      $(this._toresize).bind('resize.fixto', this._proxied_onresize);
    },
    _destroy: function _destroy() {
      // Destroy mimic node instance
      this._replacer.destroy();
    },
    refresh: function refresh() {
      this._saveViewportHeight();
      this._unfix();
      this._onscroll();
    }
  });

  function NativeSticky(child, parent, options) {
    FixTo.call(this, child, parent, options);
    this.start();
  }

  NativeSticky.prototype = new FixTo();

  $.extend(NativeSticky.prototype, {
    _start: function _start() {
      var childStyles = computedStyle.getAll(this.child);

      this._childOriginalPosition = childStyles.position;
      this._childOriginalTop = childStyles.top;

      this.child.style.position = nativeStickyValue;
      this.refresh();
    },
    _stop: function _stop() {
      this.child.style.position = this._childOriginalPosition;
      this.child.style.top = this._childOriginalTop;
    },
    refresh: function refresh() {
      this.child.style.top = this._mindtop() + this.options.top + 'px';
    }
  });

  var fixTo = function fixTo(childElement, parentElement, options) {
    if (nativeStickyValue && !options || nativeStickyValue && options && options.useNativeSticky !== false) {
      // Position sticky supported and user did not disabled the usage of it.
      return new NativeSticky(childElement, parentElement, options);
    } else if (fixedPositionValue) {
      // Position fixed supported

      if (fixedPositioningContext === undefined) {
        // We don't know yet if browser creates fixed positioning contexts. Check it.
        fixedPositioningContext = checkFixedPositioningContextSupport();
      }

      return new FixToContainer(childElement, parentElement, options);
    } else {
      return 'Neither fixed nor sticky positioning supported';
    }
  };

  /*
  No support for ie lt 8
  */

  if (ieversion < 8) {
    fixTo = function fixTo() {
      return 'not supported';
    };
  }

  // Let it be a jQuery Plugin
  $.fn.fixTo = function (targetSelector, options) {
    var $targets = $(targetSelector);

    var i = 0;
    return this.each(function () {
      // Check the data of the element.
      var instance = $(this).data('fixto-instance');

      // If the element is not bound to an instance, create the instance and save it to elements data.
      if (!instance) {
        $(this).data('fixto-instance', fixTo(this, $targets[i], options));
      } else {
        // If we already have the instance here, expect that targetSelector parameter will be a string
        // equal to a public methods name. Run the method on the instance without checking if
        // it exists or it is a public method or not. Cause nasty errors when necessary.
        var method = targetSelector;
        instance[method].call(instance, options);
      }
      i++;
    });
  };

  /*
      Expose
  */

  return {
    FixToContainer: FixToContainer,
    fixTo: fixTo,
    computedStyle: computedStyle,
    mimicNode: mimicNode
  };
})(window.jQuery, window, document);

/***/ }),
/* 113 */
/***/ (function(module, exports) {

(function ($, Colibri) {
  var className = 'overlap';

  var Component = function Component(element, options) {
    this.namespace = className;
    this.defaults = {
      data: {}
    };

    // Parent Constructor
    Colibri.apply(this, arguments);

    // Initialization
    this.start();
  };

  Component.prototype = {
    start: function start() {
      var self = this;
      $(window).bind('resize.overlap orientationchange.overlap', function () {
        setTimeout(self.resizeCallback.bind(self), 50);
      });
      self.resizeCallback();
    },
    stop: function stop() {
      $(window).off('.overlap');
      if (this.$sheet) {
        document.head.removeChild(this.$sheet);
        this.$sheet = null;
      }
    },
    computePadding: function computePadding() {
      if (!this.$sheet) {
        this.$sheet = document.createElement('style');
        document.head.appendChild(this.$sheet);
      }
      var paddingTop = this.$element[0].getBoundingClientRect().height + 'px !important;';
      this.$sheet.innerHTML = '.h-navigation-padding{padding-top:' + paddingTop + '}';
    },
    resizeCallback: function resizeCallback() {
      this.computePadding();
    }
  };
  Component.inherits(Colibri);
  Colibri[className] = Component;

  Colibri.Plugin.create(className);
  Colibri.Plugin.autoload(className);
})(jQuery, Colibri);

/***/ }),
/* 114 */
/***/ (function(module, exports) {

(function ($, Colibri) {
  var className = 'masonry';

  var Component = function Component(element, options) {
    this.namespace = className;
    this.defaults = {};
    // Parent Constructor
    Colibri.apply(this, arguments);
    this.start();
  };

  function attributeExistsAndFalse($node, attrName) {
    if ($node[0].hasAttribute(attrName) && $node.attr(attrName) != 'true') {
      return true;
    }
  }
  function showMasonry($node) {
    // check for old version of masonry, atribute not used anymore//
    if (attributeExistsAndFalse($node, 'data-show-masonry') || attributeExistsAndFalse($node, 'show-masonry')) {
      return false;
    }
    return true;
  }
  Component.prototype = {
    start: function start() {
      var masonry = this.$element;
      if (!showMasonry(masonry)) {
        return;
      }

      masonry.masonry({
        itemSelector: '.masonry-item',
        columnWidth: '.masonry-item',
        percentPosition: true
      });

      (function () {
        var images = masonry.find('img');
        var loadedImages = 0;
        var completed = 0;

        function imageLoaded() {
          loadedImages++;
          if (images.length === loadedImages) {
            try {
              masonry.data().masonry.layout();
            } catch (e) {
              console.error(e);
            }
          }
        }

        images.each(function () {
          if (this.complete) {
            completed++;
            imageLoaded();
          } else {
            $(this).on('load', imageLoaded);
            $(this).on('error', imageLoaded);
          }
        });
        if (images.length !== completed) {
          if (document.readyState == 'complete') {
            setTimeout(function () {
              masonry.data().masonry.layout();
            }, 10);
          }
        }

        $(window).on('load', function () {
          masonry.data().masonry.layout();
        });
      })();
    },
    stop: function stop() {
      try {
        var masonry = this.$element;
        masonry.masonry('destroy');
      } catch (e) {}
    },
    restart: function restart() {
      this.stop();
      this.start();
    },
    loadImages: function loadImages() {}
  };

  Component.inherits(Colibri);
  Colibri[className] = Component;
  Colibri.Plugin.create(className);
  Colibri.Plugin.autoload(className);
})(jQuery, Colibri);

/***/ }),
/* 115 */
/***/ (function(module, exports) {

(function ($, Colibri) {
  var className = 'footer-parallax';

  var Component = function Component(element, options) {
    this.namespace = className;
    this.defaults = {
      activeClasses: {
        header: 'h-footer-parallax-header-class',
        content: 'h-footer-parallax-content-class',
        footer: 'h-footer-parallax',
        container: 'new-stacking-context'
      },
      selectors: {
        /**
         * TODO @catalin, when the .header .content and .footer classes can be found in the customizer remove the
         * classes inserted in the vue components
         */

        header: '.page-header, .header',
        content: '.page-content, .content',
        container: '#page-top'
      }
    };

    this.bindedResizeListener = this.resizeListener.bind(this);

    // Parent Constructor
    Colibri.apply(this, arguments);
    // Initialization
    this.start();
  };

  Component.prototype = {
    start: function start() {
      var selectors = this.opts.selectors;
      var activeClasses = this.opts.activeClasses;
      this.$content = $(selectors.content).first();
      this.$header = $(selectors.header).first();
      this.$container = $(selectors.container);

      //TODO this.opts.enabled does not work, it does not update. When it will work this line should be replaced with
      //if (this.opts.enabled) {
      // if (this.$element.attr('data-enabled') !== 'true') {
      //   return;
      // }
      this.$container.addClass(activeClasses.container);
      this.$header.addClass(activeClasses.header);
      this.$content.addClass(activeClasses.content);
      this.$element.addClass(activeClasses.footer);

      window.addResizeListener(this.$element[0], this.bindedResizeListener);
      this.updateSiblingStyle();
    },
    stop: function stop() {
      var activeClasses = this.opts.activeClasses;
      if (this.$element.hasClass(activeClasses.footer)) {
        this.$container.removeClass(activeClasses.container);
        this.$header.removeClass(activeClasses.header);
        this.$content.removeClass(activeClasses.content);
        this.$element.removeClass(activeClasses.footer);
        window.removeResizeListener(this.$element[0], this.bindedResizeListener);
        this.$content.css('margin-bottom', '');
      }
    },
    restart: function restart() {
      this.stop();
      this.start();
    },
    resizeListener: function resizeListener() {
      this.updateSiblingStyle();
    },
    updateSiblingStyle: function updateSiblingStyle() {
      var footerHeight = this.$element.outerHeight();
      this.$content.css('margin-bottom', footerHeight + 'px');
    }
  };

  Component.inherits(Colibri);
  Colibri[className] = Component;
  Colibri.Plugin.create(className);
  Colibri.Plugin.autoload(className);
})(jQuery, Colibri);

/***/ }),
/* 116 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 117 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 118 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 119 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
