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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Planet = exports.Commander = undefined;

__webpack_require__(5);

__webpack_require__(8);

var _Commander = __webpack_require__(4);

var _buttonHandel = __webpack_require__(12);

var _Spaceship = __webpack_require__(1);

var Planet = new _Commander.God_Planet(); // 初始化形星
var Commander = new _Commander.God_Commander(); // 初始化指挥官

Planet.init(); // 初始化形星
_buttonHandel.buttonHandel.init(); // 初始化事件绑定

exports.Commander = Commander;
exports.Planet = Planet;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SpaceshipGlobal = exports.Spaceship = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _app = __webpack_require__(0);

var _Commander = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * [Spaceship 飞船类]
 * @class Spaceship
 */
var Spaceship = function () {
    function Spaceship(id, speed, powerSpeed, engine, energy) {
        _classCallCheck(this, Spaceship);

        this.id = id; //飞船编号
        this.deg = 0; //飞船初始角度
        this.power = 100; //飞船初始能源
        this.state = 'stop'; //飞船初始状态
        this.orbit = 150 + 45 * id; //飞船初始轨道
        this.timer = null;
        this.speed = speed; //飞船速度
        this.powerSpeed = powerSpeed; //飞船充电速度
        this.engine = engine;
        this.energy = energy;
        this.adapter = _app.Planet.adapter; //安装指令转换器

        this.signalsend();
    }

    /**
     * [engineSystem 飞船动力系统(引擎) 控制飞船的飞行和停止]
     * @returns {Object} fly(飞行)方法，stop(停止)方法
     */


    _createClass(Spaceship, [{
        key: 'engineSystem',
        value: function engineSystem() {
            var self = this;

            /**
             * [fly 飞行方法]
             */
            var fly = function fly() {
                if (self.power > 0) {
                    // 如果电量大于0则可飞行
                    self.timer = setInterval(function () {
                        self.deg += self.speed;
                        if (self.deg >= 360) self.deg = 0;
                    }, 20);
                    _app.Planet.miniConsole.log('\u98DE\u8239' + self.id + ' \u53F7\u8D77\u98DE');
                }
            };

            /**
             * [stop 停止方法]
             */
            var stop = function stop() {
                clearInterval(self.timer);
                _app.Planet.miniConsole.log('\u98DE\u8239' + self.id + ' \u53F7\u505C\u6B62');
            };

            return {
                fly: fly,
                stop: stop
            };
        }

        /**
         * [powerSystem 飞船能源系统 控制飞船的充电和放电]
         * @returns {Object} charge(充电)方法，discharge(放电)方法
         */

    }, {
        key: 'powerSystem',
        value: function powerSystem() {
            var self = this;

            /**
             * [charge 飞船充电方法]
             */
            var charge = function charge() {
                var timer = setInterval(function () {
                    if (self.state === 'destroy') {
                        clearInterval(timer);
                        return false;
                    }
                    if (self.power >= 101) {
                        clearInterval(timer);
                        self.power = 100;
                        return false;
                    }

                    self.power += self.powerSpeed;
                    return true;
                }, 20);
                _app.Planet.miniConsole.log('\u98DE\u8239' + self.id + ' \u53F7\u5145\u7535');
            };

            /**
             * [charge 飞船放电方法]
             */
            var discharge = function discharge() {
                var timer = setInterval(function () {
                    if (self.state === 'stop' || self.state === 'destroy') {
                        clearInterval(timer);
                        return false;
                    }
                    if (self.power <= 0) {
                        clearInterval(timer);
                        self.power = 0;
                        self.stateSystem().changeState('stop');
                        return false;
                    }

                    self.power -= SPACE_DISCHARGE;
                    return true;
                }, 20);
                _app.Planet.miniConsole.log('\u98DE\u8239' + self.id + ' \u53F7\u653E\u7535');
            };

            return {
                charge: charge,
                discharge: discharge
            };
        }

        /**
         * [stateSystem 飞船状态系统，管理飞船状态]
         * @returns changeState方法，接受指令改变飞船状态
         */

    }, {
        key: 'stateSystem',
        value: function stateSystem() {
            var self = this,
                states = {
                // 状态对象
                fly: function fly() {
                    self.state = 'fly';
                    self.engineSystem().fly();
                    self.powerSystem().discharge();
                    self.powerSystem().charge();
                },
                stop: function stop() {
                    self.state = 'stop';
                    self.engineSystem().stop();
                },
                destroy: function destroy() {
                    self.state = 'destroy';
                    _Commander.BUS.destroy(self);
                }
            };

            // 切换状态方法
            var changeState = function changeState(state) {
                states[state] && states[state]();
                _app.Planet.miniConsole.log('\u98DE\u8239' + self.id + ' \u72B6\u6001\u4E3A ' + self.state);
            };

            return {
                changeState: changeState
            };
        }

        /**
         * [signalSystem 飞船信号系统，接受来自太空的信号，并通知状态系统完成状态切换]
         * @param {Object} msg 指令
         */

    }, {
        key: 'signalSystem',
        value: function signalSystem(msg) {
            var self = this,
                command = self.adapter.decrypt(msg); // 将二进制命令格式解码转换成JSON格式

            if (self.state !== command.commond && command.id === self.id) {
                self.stateSystem().changeState(command.commond);
            }
        }

        /**
         * [signalsend 飞船信号发射器]
         */

    }, {
        key: 'signalsend',
        value: function signalsend() {
            var self = this;

            var timer = setInterval(function () {
                var msg = self.adapter.encrypt(
                // 将JSON格式状态指令转换成二进制
                self.id, self.state, self.power, self.engine, self.energy);

                _Commander.BUS.send(msg, _app.Planet); // 利用BUS介质广播自身状态给行星

                if (self.state === 'destroy') {
                    clearInterval(timer);
                    return false;
                }
            }, 1000);
        }

        /**
         * 指令格式: {
         *     id: 0,
         * 	   commond: 'fly'
         * }
         */

        /**
         * 状态指令格式(JSON): {
         *     id: 0,
         * 	   commond: 'fly',
         *     power: 88,
         *     engine: "无动力模式",
         *     energy: "慢回复"
         * }
         */

        /************************************ *
         * 状态指令格式(二进制):                 *
         * ********************************** *
         * 0001   0010   0014           0088  *
         * id    state   engine,energy  power *
         * ********************************** */

    }]);

    return Spaceship;
}();

/**
 * [SpaceshipGlobal 飞船全局管理]
 */


var SpaceshipGlobal = function () {
    var spaceshipQueue = [],
        //存储飞船队列
    spaceshipSystem = [SPACE_SPEED, SPACE_SPEED2, SPACE_SPEED3, SPACE_CHAGE, SPACE_CHAGE2, SPACE_CHAGE3],
        // 存储飞船引擎和能源系统
    spaceshipSystemValues = ['无动力模式', '巡航模式', '高速模式', '慢回复', '快速回复', '光能驱动永久型'];

    /**
     * [delete 删除飞船方法]
     * @param {Object} spaceship 飞船实例(要删除的飞船)
     */
    var removeShip = function removeShip(spaceship) {
        delete spaceshipQueue[spaceship.id - 1];
    };

    /**
     * [push push飞船队列方法]
     * @param {Object} spaceship 飞船实例(要压入的飞船)
     */
    var pushShip = function pushShip(spaceship) {
        spaceshipQueue[spaceship.id - 1] = spaceship;
    };

    /**
     * [getQueue 获取飞船队列]
     * @returns {Array} spaceshipQueue(飞船队列)
     */
    var getQueue = function getQueue() {
        return spaceshipQueue;
    };

    var getSystem = function getSystem() {
        return {
            spaceshipSystem: spaceshipSystem,
            spaceshipSystemValues: spaceshipSystemValues
        };
    };

    return {
        pushShip: pushShip,
        removeShip: removeShip,
        getSystem: getSystem,
        getQueue: getQueue
    };
}();

// 接口
exports.Spaceship = Spaceship;
exports.SpaceshipGlobal = SpaceshipGlobal;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(7);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BUS = exports.God_Planet = exports.God_Commander = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Animate = __webpack_require__(10);

var _Spaceship = __webpack_require__(1);

var _app = __webpack_require__(0);

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * [Planet 行星类]
 * @class Planet
 */
var God_Planet = function () {
    function God_Planet() {
        _classCallCheck(this, God_Planet);

        this.bus = BUS;
        this.adapter = Adapter;
        this.miniConsole = miniConsole;
        this.DC = DC;
    }

    /**
     * [init 初始化行星]
     * @memberof God_Planet
     */


    _createClass(God_Planet, [{
        key: 'init',
        value: function init() {
            _Animate.Animate.init();
        }

        /**
         * [send 行星信号发射器]
         * @param {Object} msg 要发送的指令对象
         * @param {Array, Object} 传送的目标数组或目标对象 
         * @memberof God_Planet
         */

    }, {
        key: 'send',
        value: function send(msg, from) {
            this.msgs.push(msg);
            this.bus.send(msg, from);
        }

        /**
         * [signalSystem 行星信号接收器]
         * @param {msg} msg 接收的指令对象
         * @memberof God_Planet
         */

    }, {
        key: 'signalSystem',
        value: function signalSystem(msg) {
            this.DC.dispose(msg);
        }
    }]);

    return God_Planet;
}();

/**
 * [Commander 指挥官类]
 * @class Commander
 * @extends {Planet}
 */


var God_Commander = function (_God_Planet) {
    _inherits(God_Commander, _God_Planet);

    function God_Commander() {
        _classCallCheck(this, God_Commander);

        var _this = _possibleConstructorReturn(this, (God_Commander.__proto__ || Object.getPrototypeOf(God_Commander)).call(this));

        _this.id = 'Jason', _this.rank = 'admiral', _this.msgs = []; // 消息队列
        return _this;
    }

    return God_Commander;
}(God_Planet);

/**
 * [BUS 传播消息，专门负责让不同对象之间进行消息传递，并保存飞船队列, BUS介质非常先进，可以创建飞船和控制飞船自爆]
 * @return {Object} createSpaceship(创建飞船) destroy(飞船自毁) send(广播指令)
 */


var BUS = function () {
    /**
     * [createSpaceship 创建飞船]
     * @param {Number} id 飞船的id
     */
    var createSpaceship = function createSpaceship(msg) {
        if (msg.id === false) return false;

        var newSpaceship = null,
            systems = _Spaceship.SpaceshipGlobal.getSystem().spaceshipSystem,
            // 获取能源和引擎数组
        systemValues = _Spaceship.SpaceshipGlobal.getSystem().spaceshipSystemValues; // 获取能源和引擎字符串数组

        newSpaceship = new _Spaceship.Spaceship( // 新建飞船实例，根据指令选择不同能源和引擎
        msg.id, systems[msg.engine - 1], systems[msg.energy - 1], msg.engine, msg.energy);

        _Spaceship.SpaceshipGlobal.pushShip(newSpaceship); // 将新飞船实例压进数组

        _app.Commander.miniConsole.log('\u521B\u5EFA\u98DE\u8239' + msg.id + '\u6210\u529F, \u5F15\u64CE\u7CFB\u7EDF\u4E3A' + systemValues[msg.engine - 1] + ',\u80FD\u6E90\u7CFB\u7EDF\u4E3A' + systemValues[msg.energy - 1]);
    };

    /**
     * [destroy 飞船自爆]
     * @param {Object} spaceship 飞船实例
     */
    var destroy = function destroy(spaceship) {
        if (spaceship instanceof _Spaceship.Spaceship) {
            _Spaceship.SpaceshipGlobal.removeShip(spaceship);
            _app.Commander.miniConsole.log('\u98DE\u8239' + spaceship.id + '\u81EA\u7206\u5566');
        }
    };

    /**
     * [send 传播消息方法，采用广播传播消息的方式]
     * @param {Object} msg 指令消息
     * @param {Array||Object} from 广播目标
     */
    var send = function send(msg, from) {
        if (msg.commond === 'create') {
            // 如果指令是创建飞船则执行创建飞船
            BUS.createSpaceship(msg);
            return false;
        }

        if (msg instanceof Object) {
            // 如果是对象就加密
            msg = Adapter.encrypt(msg.id, msg.commond);
        }

        // 传递信息有多次重试机会在10%的丢包率下保证传递成功
        var timer = setInterval(function () {
            var success = Math.random() > FAILURE_RATE ? true : false; // 若随机数大于发送失败率则执行消息发送
            if (success) {
                clearInterval(timer);
                if (from instanceof Array) {
                    // 如果是数组则是行星广播飞船
                    from.forEach(function (item) {
                        item.signalSystem(msg);
                    });
                    return false;
                }
                from.signalSystem(msg); // 飞船广播行星
            }
        }, 300);
    };

    return {
        createSpaceship: createSpaceship,
        destroy: destroy,
        send: send
    };
}();

/**
 * [Adapter 指令转换方法]
 */
var Adapter = function () {
    /**
     * [adapter 命令解码器]
     * @param {Number} msg 
     * @returns {Object} JSON指令 { id: 0, commadn: ""}
     */
    var decrypt = function decrypt(msg) {
        var command = {
            id: '',
            commond: ''
        };

        command.id = parseInt(msg.substr(0, 4).substr(command.id.length - 1, 1)); // 截取前4位字符串的最后一个字符

        switch (msg.substr(4, 4)) {// 截取命令后四位
            case '0001':
                command.commond = 'fly';
                break;
            case '0010':
                command.commond = 'stop';
                break;
            case '1100':
                command.commond = 'destroy';
                break;
        }

        if (msg.length > 8) {
            // 判断二进制大于八则表示有power指令
            var engine = msg.substr(10, 1),
                energy = msg.substr(11, 1),
                power = parseInt(msg.substr(msg.length - 2, 2)),
                // 截取最后2位
            systemValues = _Spaceship.SpaceshipGlobal.getSystem().spaceshipSystemValues; // 获取能源和引擎字符串数组

            // engine, energy 动力，能源
            command.engine = systemValues[engine - 1];
            command.energy = systemValues[energy - 1];

            // power能耗
            if (power.toString() == '0') {
                power = 100;
            }

            command.power = power;
        }

        return command;
    };

    /**
     * [adapter 命令加密器]
     * @param {Object} msg 指挥官传送的指令
     * @returns {Number} message 加密后的二进制的指令
     */
    var encrypt = function encrypt(id, commond, power, engine, energy) {
        var message = null;

        switch (id) {
            case 1:
            case 2:
            case 3:
            case 4:
                message = '000' + id;
                break;
        }

        switch (commond) {
            case 'fly':
                message += '0001';
                break;

            case 'stop':
                message += '0010';
                break;

            case 'destroy':
                message += '1100';
                break;
        }

        if (power || engine || energy) {
            message += '00' + engine + energy;
            message += '00' + ~~power;
        }

        return message;
    };

    return {
        encrypt: encrypt,
        decrypt: decrypt
    };
}();

/**
 * [miniConsole 控制台]
 * @return {Function} log方法
 */
var miniConsole = function () {
    var consoleBox = document.querySelector('.console');

    var log = function log(value) {
        consoleBox.innerHTML += '<p>' + value + '</p>';
        consoleBox.scrollTop = consoleBox.scrollHeight;
    };

    return {
        log: log
    };
}();

/**
 * [DC 数据处理中心]
 */
var DC = function () {
    var data = {},
        tbody = document.querySelector('.monitor-body');

    var dispose = function dispose(msg) {
        var message = _app.Planet.adapter.decrypt(msg);

        data[message.id] = {
            id: message.id,
            engine: message.engine,
            energy: message.energy,
            commond: message.commond,
            power: message.power
        };

        if (message.commond == 'destroy') {
            // 如果飞船毁灭则删除
            delete data[message.id];
        }

        monitorRender(data);
    };

    var monitorRender = function monitorRender(data) {
        tbody.innerHTML = '';
        for (var key in data) {
            var tr = document.createElement('tr');
            for (var attr in data[key]) {
                var td = document.createElement('td');
                td.innerHTML = data[key][attr];
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
    };

    return {
        dispose: dispose
    };
}();

// 接口
exports.God_Commander = God_Commander;
exports.God_Planet = God_Planet;
exports.BUS = BUS;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js??ref--1-2!../../node_modules/sass-loader/lib/loader.js!./reset.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js??ref--1-2!../../node_modules/sass-loader/lib/loader.js!./reset.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\nhtml, body, h1, h2, h3, h4, h5, h6, div, dl, dt, dd, ul, ol, li, p, blockquote, pre, hr, figure, table, caption, th, td, form, fieldset, legend, input, button, textarea, menu {\n  margin: 0;\n  padding: 0; }\n\nheader, footer, section, article, aside, nav, hgroup, address, figure, figcaption, menu, details {\n  display: block; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\ncaption, th {\n  text-align: left;\n  font-weight: normal; }\n\nhtml, body, fieldset, img, iframe, abbr {\n  border: 0; }\n\ni, cite, em, var, address, dfn {\n  font-style: normal; }\n\n[hidefocus], summary {\n  outline: 0; }\n\nli {\n  list-style: none; }\n\nh1, h2, h3, h4, h5, h6, small {\n  font-size: 100%; }\n\nsup, sub {\n  font-size: 83%; }\n\npre, code, kbd, samp {\n  font-family: inherit; }\n\nq:before, q:after {\n  content: none; }\n\ntextarea {\n  overflow: auto;\n  resize: none; }\n\nlabel, summary {\n  cursor: default; }\n\na, button {\n  cursor: pointer; }\n\nh1, h2, h3, h4, h5, h6, em, strong, b {\n  font-weight: bold; }\n\ndel, ins, u, s, a, a:hover {\n  text-decoration: none; }\n\nbody, textarea, input, button, select, keygen, legend {\n  font: 12px/1.14 arial,\\5b8b\\4f53;\n  color: #333;\n  outline: 0; }\n\nbody {\n  background: #f1f1f1; }\n\n* {\n  -webkit-tap-highlight-color: transparent;\n  font-family: \"\\5FAE\\8F6F\\96C5\\9ED1\",\"\\9ED1\\4F53\",\"\\5B8B\\4F53\";\n  -webkit-font-smoothing: antialiased; }\n", ""]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js??ref--1-2!../../node_modules/sass-loader/lib/loader.js!./style.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js??ref--1-2!../../node_modules/sass-loader/lib/loader.js!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\nbody {\n  background: #02071d; }\n\n#planet, #ship {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  display: block;\n  margin: 0 auto; }\n\n.control .command .create, .control .shipCommand button {\n  display: block;\n  padding: 0 20px;\n  height: 30px;\n  border: 0;\n  background: #2980B9;\n  color: #fff;\n  border-radius: 5px; }\n\n/**************** canvas ****************/\n/* 轨道 */\n/* 飞船 */\n/**************** 控制台 ****************/\n.control {\n  position: fixed;\n  left: 0;\n  right: 0;\n  bottom: 10px;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  width: 90%;\n  height: 180px;\n  margin: 0 auto;\n  border: 2px dotted #3b3f58;\n  border-radius: 10px;\n  /* 命令台 */\n  /* 控制台 */ }\n  .control .command {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    padding: 20px;\n    -webkit-box-flex: 7;\n    -webkit-flex: 7;\n        -ms-flex: 7;\n            flex: 7; }\n    .control .command .create {\n      position: absolute;\n      top: 10px;\n      left: 20px; }\n  .control .shipCommand {\n    width: 150px;\n    height: 110px;\n    padding: 5px 0;\n    margin: 30px 20px 0 0;\n    border-radius: 5px;\n    background: #3498DB; }\n    .control .shipCommand p {\n      display: block;\n      float: left;\n      width: 70px;\n      line-height: 110px;\n      text-align: center;\n      color: #fff;\n      font-weight: bold;\n      font-size: 16px; }\n    .control .shipCommand button {\n      margin-top: 5px; }\n  .control .console {\n    -webkit-box-flex: 3;\n    -webkit-flex: 3;\n        -ms-flex: 3;\n            flex: 3;\n    margin: 0 20px;\n    width: 300px;\n    height: 160px;\n    padding: 10px;\n    line-height: 16px;\n    border-left: 2px dotted #3b3f58;\n    color: #fff;\n    font-size: .75rem;\n    overflow: hidden; }\n\n/* ststem */\n.system {\n  position: absolute;\n  top: -200px;\n  left: 0px; }\n  .system fieldset {\n    padding: 20px 15px;\n    margin-bottom: 10px;\n    color: #fff;\n    border-radius: 5px;\n    border: 2px dotted #3b3f58; }\n    .system fieldset legend {\n      font-size: 14px;\n      color: #fff; }\n\n/* monitor */\n.monitor {\n  position: absolute;\n  right: 1px;\n  top: 0;\n  display: table;\n  font-size: 14px;\n  color: #fff; }\n  .monitor thead {\n    background: #3498DB; }\n    .monitor thead th {\n      padding: 8px 18px; }\n  .monitor tbody td {\n    padding: 8px 18px;\n    text-align: center;\n    border: 1px solid #ccc;\n    border-top: 0; }\n", ""]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Animate = undefined;

var _Spaceship = __webpack_require__(1);

var _minIconfontRocketActive = __webpack_require__(11);

var _minIconfontRocketActive2 = _interopRequireDefault(_minIconfontRocketActive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [Animate 动画工具，canvas绘制]
 */
var Animate = function () {
    var ship = document.getElementById('ship'),
        shipCtx = ship.getContext('2d'),
        planet = document.getElementById('planet'),
        planet_ctx = planet.getContext('2d'),
        cacheCanvas = document.createElement('canvas'),
        cacheCtx = cacheCanvas.getContext('2d'); //生成缓存画布

    ship.width = SCREEN_WIDTH;
    ship.height = SCREEN_HEIGHT;
    planet.width = SCREEN_WIDTH;
    planet.height = SCREEN_HEIGHT;
    cacheCanvas.width = SCREEN_WIDTH;
    cacheCanvas.height = SCREEN_HEIGHT;

    /**
     * [drawPlanet 绘制行星]
     * @param {Canvas} _ctx 目标画布
     */
    var drawPlanet = function drawPlanet(_ctx) {
        var circle = function circle(color, x, y, w) {
            _ctx.fillStyle = color;
            _ctx.beginPath();
            _ctx.arc(x, y, w, 0, Math.PI * 2, true);
            _ctx.closePath();
            _ctx.fill();
        };
        circle(PLANET_MCOLOR, SCREEN_CENTER_X, SCREEN_CENTER_Y, PLANET_RADIUS); // 创建行星
        circle(PLANET_COLOR, 380, 440, 40);
        circle(PLANET_COLOR, 320, 320, 25);
        circle(PLANET_COLOR, 280, 250, 15);
    };

    /**
     * [drawOrbit 绘制轨道]
     * @param {Canvas} _ctx 目标画布
     */
    var drawOrbit = function drawOrbit(_ctx) {
        for (var i = 1; i < ORBIT_COUNT + 1; i++) {
            _ctx.strokeStyle = '#3e4059';
            _ctx.lineWidth = 3;
            _ctx.beginPath();
            _ctx.arc(SCREEN_CENTER_X, SCREEN_CENTER_Y, 150 + 45 * i, 0, 2 * Math.PI, false);
            _ctx.closePath();
            _ctx.stroke();
        }
    };

    /**
     * [drawSpaceship 绘制飞船]
     * @param {Canvas} _ctx 	  目标画布(cache画布)
     * @param {Object} spaceship  飞船实例
     * @return {Boolean}          绘画成功返回true，失败返回false
     */
    var drawSpaceship = function drawSpaceship(spaceship) {
        var spaceshipImg = new Image(),
            _ctx = cacheCtx;

        spaceshipImg.src = _minIconfontRocketActive2.default;
        spaceshipImg.onload = function () {
            try {
                _ctx.save(); // 保存画布原有状态
                _ctx.translate(SCREEN_CENTER_X, SCREEN_CENTER_Y); // 更改画布坐标系，将画布原点移到画布中心
                _ctx.rotate(-spaceship.deg * Math.PI / 180); // 飞船角度

                //画电量条，根据电量状态改变颜色
                _ctx.beginPath();
                if (spaceship.power > 60) {
                    _ctx.strokeStyle = POWERBAR_COLOR_GOOD;
                } else if (spaceship.power <= 60 && spaceship.power >= 20) {
                    _ctx.strokeStyle = POWERBAR_COLOR_MEDIUM;
                } else {
                    _ctx.strokeStyle = POWERBAR_COLOR_BAD;
                }
                _ctx.lineWidth = POWERBAR_WIDTH;
                _ctx.moveTo(spaceship.orbit - SPACE_SIZE / 2, -POWERBAR_POS_OFFSET);
                _ctx.lineTo(spaceship.orbit + SPACE_SIZE * (spaceship.power / 100) - SPACE_SIZE / 2, -POWERBAR_POS_OFFSET);
                _ctx.stroke();

                //画飞船图片
                _ctx.drawImage(spaceshipImg, spaceship.orbit - SPACE_SIZE / 2, 0, SPACE_SIZE, SPACE_SIZE);
                _ctx.restore(); // 恢复画布到原有状态

                shipCtx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT); // 清空飞船画布
                shipCtx.drawImage(cacheCanvas, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT); // 将缓存画布载入到飞船画布
                return true;
            } catch (error) {
                return false;
            }
        };
    };

    /**
     * [refreshShip 刷新飞船队列画布]
     * @param {Array} spaceships 飞船队列
     */
    var refreshShip = function refreshShip() {
        var spaceships = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

        if (spaceships !== undefined) {
            cacheCtx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT); // 清空缓存画布
            for (var i = 0; i < spaceships.length; i++) {
                if (spaceships[i] !== undefined) {
                    // 如果飞船存在
                    drawSpaceship(spaceships[i]);
                } else if (spaceships.every(function (item) {
                    return item === undefined;
                })) {
                    // 如果队列所有都为undefined
                    shipCtx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT); // 清空飞船画布
                }
            }
        } else {
            shipCtx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT); // 清空飞船画布
        }
    };

    /**
     * [animateLoop canvas绘制循环]
     */
    var animateLoop = function animateLoop() {
        requestAnimationFrame(animateLoop);
        var spaceshipQueue = _Spaceship.SpaceshipGlobal.getQueue();
        refreshShip(spaceshipQueue);
    };

    /**
     * [init 初始化canvas背景]
     */
    var init = function init() {
        drawPlanet(planet_ctx);
        drawOrbit(planet_ctx);
        animateLoop();
    };

    return {
        animateLoop: animateLoop,
        refreshShip: refreshShip,
        drawSpaceship: drawSpaceship,
        init: init
    };
}();

exports.Animate = Animate;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1MUZCNEIyMEZDOTkxMUU1QTU4OUM1N0E4MzVGMTQwMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1MUZCNEIyMUZDOTkxMUU1QTU4OUM1N0E4MzVGMTQwMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjUxRkI0QjFFRkM5OTExRTVBNTg5QzU3QTgzNUYxNDAxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjUxRkI0QjFGRkM5OTExRTVBNTg5QzU3QTgzNUYxNDAxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+jS560gAAAnxQTFRF6084+9jT+tfS+cvE+tHL//v67FQ98YNz+cjB+tbR61I7+s/J8Hxr+9nU7m1a+tLM+crD/e/t+tbQ/OHd/ero9q6k+MK67WBM/Obj+c3G/vf27FxH9rKo+9zX8H5t7FdB+tTO97qx85OF8Hhn73Ri9aWZ+9rV/Onm7FlD7V5J7mZS8YZ2+9/b7WFM8ox985aI/OXi+9vW9aqf8YBv+tTP+tXP7mlW/e7s/vPy73Vj/fHv8pCB+9/a/vb19aug85eK9rSq9J6R73Bd73Fe97Wr7FlE+tDK+97a/vr6725b/fDu+9zY+93Z7FZA8op6//z78o1+9JyP7FhC8H9v+MC4+tPN/ern7WJO8Hpo8H9u/e3r8YFw+L6285mM61I8/OTh8Hpp8H1s8Yh47FU++cnC/vj3/Ojl8Htq9q+k85WH61A5+MS8/ezq7mhU/vn57FU/7WJN97mv9aSY73Jf7mpW85GD8op79KCT/Ojk9amd7mdT/vXz/vPx9J+T73Zk97Sr+c7I97et9aeb7WNP//z873Jg9qyh/OLe/evo/OXh9KCU8o5/9KGV7WRP61M97mtY8Hlo8ol6/ezp9aec9JuO8YJy8YFx9rOp9aaa7FtG97mw85eJ97yz9q6j9720/vTz73Nh+MW9729d/Ofk97as+MO78Hdl7V1I729c85KE+ca/9aWa7FpE7V9K7mlV8YV18o+B//7997eu85WI9aOX8ot8/OPg7WBL+c3H//3961A6+Ma++MC361E685qM9KOW9rGn8o6A++Dc9rCm+9rW7FtF8oh57mtX97uz7mZT85OE9J2Q9KKW/e7r+L+29q2i7WRQ+MG57mVR////+/UiBQAAANR0Uk5T/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wCDgII9AAAGbUlEQVR42uzd91vUSBgH8HcLZWlL772DNCmCAgoioIh0qSogIoK9t/Ps3bOdd7brvffee+/7D53Pnd6xm8myyZuZfcOT74/kfSbz4SHszCSZBccsCRgQA2JADIgBMSAGxIAoSZh/xKyAxJZ1XbLOAkhJCtxJk+4hZ/9xABzROaT3JtxNqq4hVfn3HHDxGx1D4v+A/7OmQL+QF2B6cnv1CvED53xfq09IB7hmQpeQvSBNtQ4hjwErdbqDmIGdcp1BYlNkIF2R+oI0gFye0BUkHeSzR0eQW+Aub+kG8nSAW8iKHL1AdoH7jOgEUg0zJUoXEAvMnGYdQOIf8ACyWAeQavAkpeQhz3rkAN99xCEnfvQMAkPEIaXgafxJQ5o9dsA80pA9nkPgN8IQiwIHrBikCwlSAoGFZCFNihxwnCxksTIIHCMKsSp0QEw7TcgQs7cZUdGhPYltzGOrSEJaWV0NOX336Bk/xtF8kpBJRk/PTzv+O+N4HEHIh8el/WxzqnhUWvAGQcgn0m4WbnEu6ZZUbA2jB2F8GKa5lHwgLdlADvLrRUknpySLitIL/iQ5SKL0t50sKTokLYqgBumX9rFTUvSFtCiRGCQ+QdrH/ZKqo9KiOcQg0YwPiUlJ1SnG5H0TLUi9R2s+xYyqW7QgA6zxiesTKFtiGEWrSUE2fcqCvO1SFcUq+osUJJo9Ts92KsrxZRa1UoKcY0O+nf6R6LOMXXSdEuSK3AKD/b+Smj6Zmk5KkAOys8C1/17xNYtkK0IIQSLcTWj7yq74uVuhn7pKBxIKmJjoQJ5BQXroQC6gIIvoQB5CQebTgeSjII3xVCCxgMs+KhAbErKcCmQdEmKhAlmFhBymArmOhNRTgdxAQtZSgXyJhNxPBdKNhMScIALJREJ8FxCBzENC4AwNiM/zWEgsDch9KVhIAQ1ICdahydRKA0gNGmKnAWlFQ5poQLLRkEAakHA0JJQGxIyG+NOArERDNtKAWNGQaBoQGxqybrZAiFwjJjTEQgMyFw2xzhbIERqQWDQklQakFw0Jni3zkWYakPEELOQrGpA3t2Ehw0QWH5ZhIeuJQJ5DOgIqiUD8kJDcWiKQdCQkbykRyCEk5BKVtd9SJKSfCiQRCUmmAklDQtKpQDYiIVlUIKFICJl7iNhllI+pQLAzq0AqkMEAHCSJCiQeOY4voAKJQv5plRGB1KGnurtJQOIAn3cIQCpAiyzxOiRiShMIftUUCXm8DzTKXK9Cxjdr5YBXSrwJmQ/aJb/We5Ai0DKjXoPcBm3zsJcgD4LWKfIKJA20z6QXIP7AIzuEQ4KBT04Jhgz7coLAdqGQsATgFqtASHsIPwcEJImDZADP5EWKgnwHfBPiIwbyGfDOhBDIQuCfIgGQNBCRn7lDLCAmSzhDykFUerhCCkBcrBwhVYUCIV3D/CANIDI3K3lB/EFsdvCC7BcMKeYFsQiG3OAFqVwjFmLhdrHvFOp434cbpFMoZJTfv9/lQiFZ/CAHG0VCkjgOUZIFOnbxHGstFAjx4wmxC4Qc5QlpGRMHOc11PvKuMIfSx+oUQrYLg3TwnSGahEGe5AtpjxEFWc8X4lgtyHGA9yrKS4Ig9bwhEYIggbwhjqdm6EHme9l2synclGoz2c02W/lKm8lkrzBV3PmZOdUcbE4tDw43X50zQyu+YdwhM10knu1FXDnDDZZMry+Zerql58taDuFVQXI+ctsDs4fNLMh120wof4j7zbQ836tlr7tmxloEQH7RaDL0mrbPQCiHWDRaiYrSci1eDSRM/s50gKJxRYiGnyKqbr11yJ7/gqJ25J9EL/QRApF9XaSxSllDsjvcqHl9QQVEdo+HcwobipZr6BExkKWvavUHMSQDCRYDkXvL7WvFDck8maNqm1Y1kCzm6TeraIm9TrZbFOQs8/RqvkwkidlSoigI851Wdd9LxdwGuEQYpEj18N01rO16LjuEQeqkZ1e7Id5P0qauiYNESl/hqVAJCZMO5/8UB5E+gf26Q22uuTa1tUUg5LYGo7x7E7UxlXNMTSCu27C+6FCfDS5tfS4SMuhyfxez0e14HuJeLhbiOOl07vMOTJwfTY/xEQr5Yfq5tx1EQRxl0xtT+/VDap/EjmvLCOqfCAoaGGkoRu/geWxnxmhQ9+WR5MwB1f81eH3RvPAYEANiQAyIATEgBsSAGBADYkB0l78FGADvl6cWI8agegAAAABJRU5ErkJggg=="

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.buttonHandel = undefined;

var _Spaceship = __webpack_require__(1);

var _app = __webpack_require__(0);

/**
 * [message 生成消息命令格式]
 * @param {Number} id 飞船id
 * @param {String} commond 飞船命令
 * @returns 
 */
var Message = function () {
    var command = {
        id: null,
        commond: null,
        engine: '1',
        energy: '4'
    };

    var setMessage = function setMessage(name, msg, name2, msg2) {
        command[name] = msg;
        if (name2) {
            command[name2] = msg2;
        }
        return command;
    };

    var init = function init() {
        command.engine = '1';
        command.energy = '4';
    };

    return {
        setMessage: setMessage,
        init: init
    };
}();

/**
 * [buttonHandel 按钮事件绑定]
 */
var buttonHandel = function () {
    var command = document.querySelector('.command'),
        system = document.querySelector('.system'),
        ships = Array.apply(null, Array(SPACE_COUNT)).map(function (item, i) {
        return i + 1;
    }); // 创建按飞船数量排列的数组，如[1, 2, 3, 4];

    /**
     * [createBtn 创建按钮飞船对呀控制按钮]
     * @returns {Number} 飞船id
     */
    function createBtn() {
        ships = ships.sort(function (a, b) {
            return a - b;
        }); // 数组排序
        var id = ships.shift(); // 拿出数组第一项

        if (!id) {
            // 如果id不存在
            _app.Commander.miniConsole.log('\u98DE\u8239\u603B\u6570\u8D85\u8FC7\u603B\u6570\u91CF' + SPACE_COUNT + '\u4E86');
            return false;
        }

        command.innerHTML += '\n            <div class="shipCommand" data-id="' + id + '">\n                <p>\u98DE\u8239' + id + '</p>\n                <button class="fly">\u98DE\u884C</button>\n                <button class="stop">\u505C\u6B62</button>\n                <button class="destroy">\u9500\u6BC1</button>\n            </div>\n        ';

        return id;
    }

    /**
     * [btnEvent 按钮事件处理]
     * @param {Event} e 
     */
    function btnEvent(e) {
        var target = e.target,
            parent = target.parentNode;

        var id = parseInt(parent.getAttribute('data-id')),
            // 获取按钮指令对应的id
        cmd = target.className,
            // 获取按钮指令对应的class(指令)
        msg = Message.setMessage('id', id, 'commond', cmd),
            // 设置msg的id和commond
        spaceshipQueue = _Spaceship.SpaceshipGlobal.getQueue(); // 从全局飞船管理获得飞船队列

        // 控制台按钮
        if (target.nodeName === 'BUTTON') {
            switch (target.className) {
                case 'create':
                    id = createBtn(); // 获取新创建的id
                    msg = Message.setMessage('id', id);
                    _app.Commander.send(msg, spaceshipQueue);
                    Message.init();
                    break;

                case 'destroy':
                    ships.unshift(id);
                    command.removeChild(parent);
                    _app.Commander.send(msg, spaceshipQueue);
                    break;

                case 'fly':
                case 'stop':
                    _app.Commander.send(msg, spaceshipQueue);
                    break;
            }
        }

        // 控制台radio
        if (target.nodeName === 'INPUT') {
            switch (target.value) {
                case '1':
                case '2':
                case '3':
                    Message.setMessage('engine', target.value);
                    break;

                case '4':
                case '5':
                case '6':
                    Message.setMessage('energy', target.value);
                    break;
            }
        }
    }

    // 初始化绑定事件
    var init = function init() {
        addEvent(command, 'click', btnEvent);
    };

    return {
        init: init
    };
}();

exports.buttonHandel = buttonHandel;

//跨浏览器事件绑定

function addEvent(element, event, hanlder) {
    if (element.addEventListener) {
        addEvent = function addEvent(element, event, hanlder) {
            element.addEventListener(event, hanlder, false);
        };
    } else if (element.attachEvent) {
        addEvent = function addEvent(element, event, hanlder) {
            element.attachEvent('on' + event, hanlder);
        };
    } else {
        addEvent = function addEvent(element, event, hanlder) {
            element['on' + event] = hanlder;
        };
    }

    addEvent(element, event, hanlder);
}

/***/ })
/******/ ]);