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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var random_normal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! random-normal */ \"./node_modules/random-normal/index.js\");\n/* harmony import */ var random_normal__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(random_normal__WEBPACK_IMPORTED_MODULE_0__);\n\nconst NUM_PARTICLES = 600;\nconst PARTICLE_SIZE = 0.4;\nconst SPEED = 20000;\n;\nlet particles = [];\nfunction rand(low, high) {\n    return Math.random() * (high - low) + low;\n}\nfunction createParticle() {\n    const colour = {\n        r: 255,\n        g: random_normal__WEBPACK_IMPORTED_MODULE_0___default()({ mean: 125, dev: 20 }),\n        b: 50,\n        a: rand(0, 1),\n    };\n    return {\n        x: -2,\n        y: -2,\n        diameter: Math.max(0, random_normal__WEBPACK_IMPORTED_MODULE_0___default()({ mean: PARTICLE_SIZE, dev: PARTICLE_SIZE / 2 })),\n        duration: random_normal__WEBPACK_IMPORTED_MODULE_0___default()({ mean: SPEED, dev: SPEED * 0.1 }),\n        amplitude: random_normal__WEBPACK_IMPORTED_MODULE_0___default()({ mean: 16, dev: 2 }),\n        offsetY: random_normal__WEBPACK_IMPORTED_MODULE_0___default()({ mean: 0, dev: 10 }),\n        arc: random_normal__WEBPACK_IMPORTED_MODULE_0___default()({ mean: Math.PI * 2, dev: 0.1 }),\n        startTime: performance.now() - rand(0, SPEED),\n        colour: `rgba(${colour.r}, ${colour.g}, ${colour.b}, ${colour.a})`,\n    };\n}\nfunction moveParticle(particle, time) {\n    const progress = ((time - particle.startTime) % particle.duration) / particle.duration;\n    return Object.assign({}, particle, { x: progress, y: ((Math.sin(progress * particle.arc) * particle.amplitude) + particle.offsetY) });\n}\nfunction drawParticle(particle, canvas, ctx) {\n    canvas = document.getElementById('particle-canvas');\n    const vh = canvas.height / 100;\n    ctx.fillStyle = particle.colour;\n    ctx.beginPath();\n    ctx.ellipse(particle.x * canvas.width, particle.y * vh + (canvas.height / 2), particle.diameter * vh, particle.diameter * vh, 0, 0, 2 * Math.PI);\n    ctx.fill();\n}\nfunction draw(time, canvas, ctx) {\n    // Move particles\n    particles.forEach((particle, index) => {\n        particles[index] = moveParticle(particle, time);\n    });\n    // Clear the canvas\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n    // Draw the particles\n    particles.forEach((particle) => {\n        drawParticle(particle, canvas, ctx);\n    });\n    // Schedule next frame\n    requestAnimationFrame((time) => draw(time, canvas, ctx));\n}\nfunction initializeCanvas() {\n    let canvas = document.getElementById('particle-canvas');\n    canvas.width = canvas.offsetWidth * window.devicePixelRatio;\n    canvas.height = canvas.offsetHeight * window.devicePixelRatio;\n    let ctx = canvas.getContext(\"2d\");\n    window.addEventListener('resize', () => {\n        canvas.width = canvas.offsetWidth * window.devicePixelRatio;\n        canvas.height = canvas.offsetHeight * window.devicePixelRatio;\n        ctx = canvas.getContext(\"2d\");\n    });\n    return [canvas, ctx];\n}\nfunction startAnimation() {\n    const [canvas, ctx] = initializeCanvas();\n    // Create a bunch of particles\n    for (let i = 0; i < NUM_PARTICLES; i++) {\n        particles.push(createParticle());\n    }\n    requestAnimationFrame((time) => draw(time, canvas, ctx));\n}\n;\n// Start animation when document is loaded\n(function () {\n    if (document.readyState !== 'loading') {\n        startAnimation();\n    }\n    else {\n        document.addEventListener('DOMContentLoaded', () => {\n            startAnimation();\n        });\n    }\n}());\n\n\n//# sourceURL=webpack:///./index.ts?");

/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*\nobject-assign\n(c) Sindre Sorhus\n@license MIT\n*/\n\n\n/* eslint-disable no-unused-vars */\nvar getOwnPropertySymbols = Object.getOwnPropertySymbols;\nvar hasOwnProperty = Object.prototype.hasOwnProperty;\nvar propIsEnumerable = Object.prototype.propertyIsEnumerable;\n\nfunction toObject(val) {\n\tif (val === null || val === undefined) {\n\t\tthrow new TypeError('Object.assign cannot be called with null or undefined');\n\t}\n\n\treturn Object(val);\n}\n\nfunction shouldUseNative() {\n\ttry {\n\t\tif (!Object.assign) {\n\t\t\treturn false;\n\t\t}\n\n\t\t// Detect buggy property enumeration order in older V8 versions.\n\n\t\t// https://bugs.chromium.org/p/v8/issues/detail?id=4118\n\t\tvar test1 = new String('abc');  // eslint-disable-line no-new-wrappers\n\t\ttest1[5] = 'de';\n\t\tif (Object.getOwnPropertyNames(test1)[0] === '5') {\n\t\t\treturn false;\n\t\t}\n\n\t\t// https://bugs.chromium.org/p/v8/issues/detail?id=3056\n\t\tvar test2 = {};\n\t\tfor (var i = 0; i < 10; i++) {\n\t\t\ttest2['_' + String.fromCharCode(i)] = i;\n\t\t}\n\t\tvar order2 = Object.getOwnPropertyNames(test2).map(function (n) {\n\t\t\treturn test2[n];\n\t\t});\n\t\tif (order2.join('') !== '0123456789') {\n\t\t\treturn false;\n\t\t}\n\n\t\t// https://bugs.chromium.org/p/v8/issues/detail?id=3056\n\t\tvar test3 = {};\n\t\t'abcdefghijklmnopqrst'.split('').forEach(function (letter) {\n\t\t\ttest3[letter] = letter;\n\t\t});\n\t\tif (Object.keys(Object.assign({}, test3)).join('') !==\n\t\t\t\t'abcdefghijklmnopqrst') {\n\t\t\treturn false;\n\t\t}\n\n\t\treturn true;\n\t} catch (err) {\n\t\t// We don't expect any of the above to throw, but better to be safe.\n\t\treturn false;\n\t}\n}\n\nmodule.exports = shouldUseNative() ? Object.assign : function (target, source) {\n\tvar from;\n\tvar to = toObject(target);\n\tvar symbols;\n\n\tfor (var s = 1; s < arguments.length; s++) {\n\t\tfrom = Object(arguments[s]);\n\n\t\tfor (var key in from) {\n\t\t\tif (hasOwnProperty.call(from, key)) {\n\t\t\t\tto[key] = from[key];\n\t\t\t}\n\t\t}\n\n\t\tif (getOwnPropertySymbols) {\n\t\t\tsymbols = getOwnPropertySymbols(from);\n\t\t\tfor (var i = 0; i < symbols.length; i++) {\n\t\t\t\tif (propIsEnumerable.call(from, symbols[i])) {\n\t\t\t\t\tto[symbols[i]] = from[symbols[i]];\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\treturn to;\n};\n\n\n//# sourceURL=webpack:///./node_modules/object-assign/index.js?");

/***/ }),

/***/ "./node_modules/random-normal/index.js":
/*!*********************************************!*\
  !*** ./node_modules/random-normal/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar assign = __webpack_require__(/*! object-assign */ \"./node_modules/object-assign/index.js\");\n\nfunction normalPool(options) {\n\n  var performanceCounter = 0;\n\n  do {\n\n    var idx = Math.round(normal({\n      mean: options.mean,\n      dev: options.dev\n    }));\n\n    if (idx < options.pool.length && idx >= 0) {\n      return options.pool[idx];\n    } else {\n      performanceCounter++;\n    }\n\n  } while (performanceCounter < 100);\n}\n\nfunction normal(options) {\n\n  options = assign({ mean: 0, dev: 1, pool: [] }, options);\n\n  // If a pool has been passed, then we are returning an item from that pool,\n  // using the normal distribution settings that were passed in\n  if (Array.isArray(options.pool) && options.pool.length > 0) {\n    return normalPool(options);\n  }\n\n  // The Marsaglia Polar method\n  var s;\n  var u;\n  var v;\n  var norm;\n  var mean = options.mean;\n  var dev  = options.dev;\n\n  do {\n    // U and V are from the uniform distribution on (-1, 1)\n    u = Math.random() * 2 - 1;\n    v = Math.random() * 2 - 1;\n\n    s = u * u + v * v;\n  } while (s >= 1);\n\n  // Compute the standard normal variate\n  norm = u * Math.sqrt(-2 * Math.log(s) / s);\n\n  // Shape and scale\n  return dev * norm + mean;\n}\n\nmodule.exports = normal;\n\n\n//# sourceURL=webpack:///./node_modules/random-normal/index.js?");

/***/ })

/******/ });