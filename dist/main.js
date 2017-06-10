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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ui = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Control = function () {
    function Control() {
        _classCallCheck(this, Control);
    }

    _createClass(Control, null, [{
        key: 'add',
        value: function add(element) {
            this.display(element).innerHTML = ++this.display(element).innerHTML;
            if (this.getTimerFromSession(element)) {
                this.getTimerFromSession(element).innerHTML = this.display(element).innerHTML;
                this.changeClasses(element);
            }
        }
    }, {
        key: 'sub',
        value: function sub(element) {
            if (this.display(element).innerHTML > 1) {
                this.display(element).innerHTML = --this.display(element).innerHTML;
            }
            if (this.getTimerFromSession(element)) {
                this.getTimerFromSession(element).innerHTML = this.display(element).innerHTML;
                this.changeClasses(element);
            }
        }
    }, {
        key: 'start',
        value: function start(element) {
            _ui.Ui.start(element);
            _ui.Effects.beating(element);
            var time = element.parentElement.previousElementSibling.innerHTML,
                timerDisplay = this.display(element);
            this.t = this.timer(time * 60, timerDisplay); // add * 60 for minutes
            this.changeClasses(element);
            // Effects.cloneBreak(element.parentElement.previousElementSibling);
            // Effects.cloneSession(element.parentElement.previousElementSibling);
        }
    }, {
        key: 'resume',
        value: function resume(element) {
            _ui.Ui.start(element);
            _ui.Effects.beating(element);
            if (this.display(element).innerHTML.includes(':')) {
                var timeSplit = this.display(element).innerHTML.split(':');
                if (timeSplit.length < 3) {
                    timeSplit.unshift('0');
                }

                var _timeSplit = _slicedToArray(timeSplit, 3),
                    h = _timeSplit[0],
                    m = _timeSplit[1],
                    s = _timeSplit[2];

                var pausedTime = parseInt(s) + parseInt(m) * 60 + parseInt(h) * 60 * 60;
                this.t = this.timer(pausedTime, this.display(element));
            } else {
                var _pausedTime = this.display(element).innerHTML;
                this.t = this.timer(_pausedTime, this.display(element));
            }
        }
    }, {
        key: 'timer',
        value: function timer(sTime, display) {
            var _this = this;

            var time = parseInt(sTime) - 1,
                //always take in min
            hours = void 0,
                minutes = void 0,
                seconds = void 0;

            var t = setInterval(function () {
                hours = parseInt(time / 60 / 60 % 60, 10);
                minutes = parseInt(time / 60 % 60, 10);
                seconds = parseInt(time % 60, 10);

                if (hours > 0) {
                    _ui.Ui.displayFontHours(display, { h: hours, m: minutes, s: seconds });
                } else if (minutes > 0) {
                    _ui.Ui.displayFontMinutes(display, { m: minutes, s: seconds });
                } else {
                    _ui.Ui.displayFontSeconds(display, { s: seconds });
                }
                --time;
                var title = _this.timerTitle(display);
                _this.sessionBreakToggle(t, time, title, display);
            }, 1000);

            return t;
        }
    }, {
        key: 'sessionBreakToggle',
        value: function sessionBreakToggle(t, time, title, display) {
            if (time < 0 && title.innerHTML === 'SESSION') {
                clearInterval(t);
                _ui.Effects.shake(display);
                this.t = this.timer(parseInt(this.fromTimerGetBreak(display) * 60), display); // add * 60 for minutes
                _ui.Effects.shakeRemoved(display);
                _ui.Effects.clone(display, 0, true);
                setTimeout(function () {
                    title.innerHTML = 'BREAK';
                }, 1000);
            } else if (time < 0 && title.innerHTML === 'BREAK') {
                clearInterval(t);
                _ui.Effects.shake(display);
                this.t = this.timer(parseInt(this.fromTimerGetSession(display) * 60), display); // add * 60 for minutes
                _ui.Effects.shakeRemoved(display);
                _ui.Effects.clone(display, 2, false);
                setTimeout(function () {
                    title.innerHTML = 'SESSION';
                }, 1000);
            }
        }
    }, {
        key: 'changeClasses',
        value: function changeClasses(element) {
            if (element.classList.contains('start')) {
                element.classList.remove('start');
                element.classList.add('resume');
            } else if (element.classList.contains('resume')) {
                element.classList.remove('resume');
                element.classList.add('start');
            } else if (element.classList.contains('add') || element.classList.contains('sub')) {
                element.parentElement.parentElement.parentElement.children[1].children[2].children[0].classList.remove('resume');
                element.parentElement.parentElement.parentElement.children[1].children[2].children[0].classList.add('start');
            } else if (element.classList.contains('reset')) {
                element.parentElement.children[0].classList.remove('resume');
                element.parentElement.children[0].classList.add('start');
            }
        }
    }, {
        key: 'pause',
        value: function pause(element) {
            _ui.Ui.pause(element);
            _ui.Effects.beatingPaused(element);
            clearInterval(this.t);
        }
    }, {
        key: 'reset',
        value: function reset(element) {
            _ui.Ui.reset(element);
            _ui.Effects.beatingRemoved(element);
            clearInterval(this.t);
            this.display(element).innerHTML = this.fromTimerGetSession(this.display(element));
            this.changeClasses(element);
        }
    }, {
        key: 'display',
        value: function display(e) {
            return e.parentElement.previousElementSibling;
        }
    }, {
        key: 'getTimerFromSession',
        value: function getTimerFromSession(e) {
            if (e.parentElement.parentElement.children[0].innerHTML.includes('SESSION')) {
                return e.parentElement.parentElement.previousElementSibling.children[1];
            } else {
                return false;
            }
        }
    }, {
        key: 'fromTimerGetBreak',
        value: function fromTimerGetBreak(timer) {
            return timer.parentElement.previousElementSibling.children[1].innerHTML;
        }
    }, {
        key: 'fromTimerGetSession',
        value: function fromTimerGetSession(timer) {
            return timer.parentElement.nextElementSibling.children[1].innerHTML;
        }
    }, {
        key: 'timerTitle',
        value: function timerTitle(timer) {
            return timer.previousElementSibling;
        }
    }, {
        key: 'disableControls',
        value: function disableControls(controls) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = controls[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var input = _step.value;

                    if (input.className === 'add' || input.className === 'sub') {
                        input.disabled = true;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'enableControls',
        value: function enableControls(controls) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = controls[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var input = _step2.value;

                    if (input.className === 'add' || input.className === 'sub') {
                        input.disabled = false;
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }]);

    return Control;
}();

exports.default = Control;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Effects = exports.Ui = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _control = __webpack_require__(0);

var _control2 = _interopRequireDefault(_control);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ui = exports.Ui = function () {
    function Ui() {
        _classCallCheck(this, Ui);
    }

    _createClass(Ui, null, [{
        key: 'start',
        value: function start(e) {
            Effects.scaleStart(e);
            Effects.animateReversePause(e.parentElement.children[1]);
            Effects.animateReverseReset(e.parentElement.children[2]);
            setTimeout(function () {
                e.style.height = '0';
                e.style.width = '0';
                for (var i = 1; i < e.parentElement.children.length; i++) {
                    e.parentElement.children[i].style.height = '40px';
                    e.parentElement.children[i].style.width = '40px';
                }
                Effects.animateReversePauseRemove(e.parentElement.children[1]);
                Effects.animateReverseResetRemove(e.parentElement.children[2]);
                Effects.scaleStartRemove(e);
            }, 500);
        }
    }, {
        key: 'pause',
        value: function pause(e) {
            Effects.animatePause(e.parentElement.children[1]);
            Effects.animateReset(e.parentElement.children[2]);
            Effects.scaleReverseStart(e.previousElementSibling);
            setTimeout(function () {
                e.previousElementSibling.style.height = '40px';
                e.previousElementSibling.style.width = '40px';
                for (var i = 1; i < e.parentElement.children.length; i++) {
                    e.parentElement.children[i].style.height = '0';
                    e.parentElement.children[i].style.width = '0';
                }
                Effects.animatePauseRemove(e.parentElement.children[1]);
                Effects.animateResetRemove(e.parentElement.children[2]);
            }, 500);
            Effects.scaleReverseStartRemove(e.previousElementSibling);
        }
    }, {
        key: 'reset',
        value: function reset(e) {
            e.parentElement.parentElement.children[0].innerHTML = 'SESSION';
            Effects.animatePause(e.parentElement.children[1]);
            Effects.animateReset(e.parentElement.children[2]);
            Effects.scaleReverseStart(e.previousElementSibling.previousElementSibling);
            setTimeout(function () {
                e.previousElementSibling.previousElementSibling.style.height = '40px';
                e.previousElementSibling.previousElementSibling.style.width = '40px';
                for (var i = 1; i < e.parentElement.children.length; i++) {
                    e.parentElement.children[i].style.height = '0';
                    e.parentElement.children[i].style.width = '0';
                }
                Effects.animatePauseRemove(e.parentElement.children[1]);
                Effects.animateResetRemove(e.parentElement.children[2]);
            }, 500);
            Effects.scaleReverseStartRemove(e.previousElementSibling.previousElementSibling);
        }
    }, {
        key: 'displayFontHours',
        value: function displayFontHours(display, _ref) {
            var h = _ref.h,
                s = _ref.s,
                m = _ref.m;

            display.style.fontSize = '120px';
            display.innerHTML = h + ":" + this.leadingZeros(m, s).mins + ":" + this.leadingZeros(m, s).secs;
        }
    }, {
        key: 'displayFontMinutes',
        value: function displayFontMinutes(display, _ref2) {
            var m = _ref2.m,
                s = _ref2.s;

            display.style.fontSize = '150px';
            display.innerHTML = this.leadingZeros(m, s).mins + ":" + this.leadingZeros(m, s).secs;
        }
    }, {
        key: 'displayFontSeconds',
        value: function displayFontSeconds(display, _ref3) {
            var s = _ref3.s;

            display.style.fontSize = '200px';
            display.innerHTML = s;
        }
    }, {
        key: 'leadingZeros',
        value: function leadingZeros(mins, secs) {
            mins = mins < 10 ? '0' + mins : mins;
            secs = secs < 10 ? '0' + secs : secs;
            return {
                mins: mins,
                secs: secs
            };
        }
    }]);

    return Ui;
}();

var Effects = exports.Effects = function () {
    function Effects() {
        _classCallCheck(this, Effects);
    }

    _createClass(Effects, null, [{
        key: 'beating',
        value: function beating(e) {
            _control2.default.display(e).classList.contains('beat-paused') ? _control2.default.display(e).classList.remove('beat-paused') : _control2.default.display(e).classList.add('beat-active');

            _control2.default.display(e).parentElement.parentElement.children[3].classList.contains('shadow-paused') ? _control2.default.display(e).parentElement.parentElement.children[3].classList.remove('shadow-paused') : _control2.default.display(e).parentElement.parentElement.children[3].classList.add('shadow-active');
        }
    }, {
        key: 'beatingPaused',
        value: function beatingPaused(e) {
            _control2.default.display(e).classList.add('beat-paused');
            _control2.default.display(e).parentElement.classList.add('shadow-paused');
        }
    }, {
        key: 'beatingRemoved',
        value: function beatingRemoved(e) {
            _control2.default.display(e).classList.remove('beat-active');
            _control2.default.display(e).parentElement.classList.remove('shadow-active');
        }
    }, {
        key: 'shake',
        value: function shake(e) {
            e.parentElement.classList.add('shake');
        }
    }, {
        key: 'shakeRemoved',
        value: function shakeRemoved(e) {
            setTimeout(function () {
                e.parentElement.classList.remove('shake');
            }, 1000);
        }
    }, {
        key: 'scaleStart',
        value: function scaleStart(e) {
            e.classList.add('ani-start');
        }
    }, {
        key: 'scaleStartRemove',
        value: function scaleStartRemove(e) {
            e.classList.remove('ani-start');
        }
    }, {
        key: 'animatePause',
        value: function animatePause(e) {
            e.classList.add('ani-pause');
        }
    }, {
        key: 'animatePauseRemove',
        value: function animatePauseRemove(e) {
            e.classList.remove('ani-pause');
        }
    }, {
        key: 'animateReset',
        value: function animateReset(e) {
            e.classList.add('ani-reset');
        }
    }, {
        key: 'animateResetRemove',
        value: function animateResetRemove(e) {
            e.classList.remove('ani-reset');
        }
    }, {
        key: 'scaleReverseStart',
        value: function scaleReverseStart(e) {
            e.classList.add('ani-start');
            e.style.animationDirection = 'reverse';
        }
    }, {
        key: 'scaleReverseStartRemove',
        value: function scaleReverseStartRemove(e) {
            setTimeout(function () {
                e.style.animationDirection = 'normal';
                e.classList.remove('ani-start');
            }, 1000);
        }
    }, {
        key: 'animateReversePause',
        value: function animateReversePause(e) {
            e.classList.add('ani-pause');
            e.style.animationDirection = 'reverse';
        }
    }, {
        key: 'animateReversePauseRemove',
        value: function animateReversePauseRemove(e) {
            setTimeout(function () {
                e.style.animationDirection = 'normal';
                e.classList.remove('ani-pause');
            }, 500);
        }
    }, {
        key: 'animateReverseReset',
        value: function animateReverseReset(e) {
            e.classList.add('ani-reset');
            e.style.animationDirection = 'reverse';
        }
    }, {
        key: 'animateReverseResetRemove',
        value: function animateReverseResetRemove(e) {
            setTimeout(function () {
                e.style.animationDirection = 'normal';
                e.classList.remove('ani-reset');
            }, 500);
        }
    }, {
        key: 'shrinkTheWrapper',
        value: function shrinkTheWrapper(e) {
            e.classList.add('shrink-All');
        }
    }, {
        key: 'removeShrinkWrapper',
        value: function removeShrinkWrapper(e, k) {
            var p = e.parentElement;
            var kid = p.children[k];

            setTimeout(function () {
                p.removeChild(kid);
                p.children[k].classList.remove('shrink-All');
            }, 2000);
        }
    }, {
        key: 'clone',
        value: function clone(e, n, w) {
            var mainOffsetLeft = e.parentElement.parentElement.children[n].offsetLeft;
            var parent = e.parentElement.parentElement;
            var item = parent.children[n];
            var clone = item.cloneNode(true);
            this.shrinkTheWrapper(e.parentElement.parentElement.children[n]);
            parent.insertBefore(clone, item);
            //THE WRAPPER
            if (w) {
                var x = parent.children[1].offsetLeft - parent.children[0].offsetLeft + 70;
                clone.style.transform = 'translateX(' + x + 'px)';
            } else if (!w) {
                var _x = parent.children[2].offsetLeft - parent.children[1].offsetLeft + 70;
                clone.style.transform = 'translateX(-' + _x + 'px)';
            }
            clone.style.transition = 'all 1s ease-out';
            clone.style.position = 'absolute';
            clone.style.backgroundColor = '#52B3D9';
            clone.style.left = mainOffsetLeft + 'px';
            clone.style.height = '400px';
            clone.style.width = '400px';
            clone.style.zIndex = '2000';
            //TITLEDIV
            clone.children[0].style.transition = 'all 1s ease-out';
            //BREAK 
            clone.children[0].children[0].style.transition = 'all 1s ease-out';
            clone.children[0].children[0].style.fontSize = '50px';
            clone.children[0].children[0].style.fontWeight = '500';
            //LENGTH
            clone.children[0].children[1].style.transition = 'all 1s ease-out';
            clone.children[0].children[1].style.fontSize = '0';
            //NUMBER
            clone.children[1].style.transition = 'all 1s ease-in-out';
            clone.children[1].style.fontSize = '200px';
            clone.children[1].style.fontWeight = '400';
            //CONTROLS
            clone.children[2].style.transition = 'all 1s ease-out';
            //+-pr
            clone.children[2].children[0].style.display = 'none';
            clone.children[2].children[1].style.display = 'none';
            clone.children[2].children[2].style.display = 'block';
            clone.children[2].children[3].style.display = 'block';
            //+
            clone.children[2].children[0].style.height = '0px';
            clone.children[2].children[0].style.width = '0px';
            //-
            clone.children[2].children[1].style.height = '0px';
            clone.children[2].children[1].style.width = '0px';
            //pause and reset dumms
            clone.children[2].children[2].style.height = '40px';
            clone.children[2].children[2].style.width = '40px';
            clone.children[2].children[3].style.height = '40px';
            clone.children[2].children[3].style.width = '40px';

            setTimeout(function () {

                if (w) {
                    var _x2 = parent.children[1].offsetLeft - parent.children[0].offsetLeft;
                    clone.style.transform = 'translateX(' + _x2 + 'px)';
                } else {
                    var _x3 = parent.children[2].offsetLeft - parent.children[1].offsetLeft - 494; //this
                    clone.style.transform = 'translateX(' + _x3 + 'px)';
                }
                //THE WRAPPER
                clone.style.backgroundColor = '#03A678';
                clone.style.opacity = '1';
                clone.style.height = '200px';
                clone.style.width = '200px';
                clone.style.zIndex = '0';
                //SESSION
                clone.children[0].children[0].style.fontSize = '20px';
                clone.children[0].children[0].style.fontWeight = '500';
                //LENGTH
                clone.children[0].children[1].style.fontSize = '20px';
                //NUMBER
                clone.children[1].style.fontSize = '80px';
                //CONTROLS
                //+-pr
                clone.children[2].children[0].style.display = 'block';
                clone.children[2].children[1].style.display = 'block';
                clone.children[2].children[2].style.display = 'none';
                clone.children[2].children[3].style.display = 'none';
                //+
                clone.children[2].children[0].style.height = '25px';
                clone.children[2].children[0].style.width = '25px';
                //-
                clone.children[2].children[1].style.height = '25px';
                clone.children[2].children[1].style.width = '25px';
                //pause and reset dumms
                clone.children[2].children[2].style.height = '0';
                clone.children[2].children[2].style.width = '0';
                clone.children[2].children[3].style.height = '0';
                clone.children[2].children[3].style.width = '0';
            }, 1000);

            this.removeShrinkWrapper(e.parentElement.parentElement.children[n], n);
        }
    }]);

    return Effects;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _control = __webpack_require__(0);

var _control2 = _interopRequireDefault(_control);

var _ui = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Events = function () {
    function Events(controls) {
        _classCallCheck(this, Events);

        this.controls = controls;
    }

    _createClass(Events, [{
        key: 'addListeners',
        value: function addListeners() {
            var _this = this;

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.controls[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var input = _step.value;

                    input.addEventListener('click', function (element) {
                        _this.actOn(element);
                    });
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'actOn',
        value: function actOn(e) {
            switch (e.target.className) {
                case 'add':
                    _control2.default.add(e.target);
                    break;
                case 'sub':
                    _control2.default.sub(e.target);
                    break;
                case 'start':
                    _control2.default.start(e.target);
                    _control2.default.disableControls(this.controls);
                    break;
                case 'pause':
                    _control2.default.pause(e.target);
                    _control2.default.enableControls(this.controls);
                    break;
                case 'resume':
                    _control2.default.resume(e.target);
                    _control2.default.disableControls(this.controls);
                    break;
                case 'reset':
                    _control2.default.reset(e.target);
                    _control2.default.enableControls(this.controls);
                    break;
            }
        }
    }]);

    return Events;
}();

exports.default = Events;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(4);

__webpack_require__(3);

var _events = __webpack_require__(2);

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controls = document.querySelectorAll('input');

new _events2.default(controls).addListeners();

/***/ })
/******/ ]);