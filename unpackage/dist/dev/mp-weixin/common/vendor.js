(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter) {if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;}}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
      /* eslint-disable no-extend-native */
      if (!Promise.prototype.finally) {
        Promise.prototype.finally = function (callback) {
          var promise = this.constructor;
          return this.then(
          function (value) {return promise.resolve(callback()).then(function () {return value;});},
          function (reason) {return promise.resolve(callback()).then(function () {
              throw reason;
            });});

        };
      }
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };




var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  interceptors: interceptors,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });




var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = {
            type: String,
            default: '' };

          vueProps['value'] = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = {
    multipleSlots: true,
    addGlobalClass: true };


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin']['options']) {
      Object.assign(options, vueOptions['mp-weixin']['options']);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 12:
/*!*********************************************************************!*\
  !*** C:/Users/wutongyue/Documents/HBuilderProjects/no/api/index.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _user = _interopRequireDefault(__webpack_require__(/*! @/api/user */ 13));
var _test = _interopRequireDefault(__webpack_require__(/*! @/api/test */ 18));
var _pay = _interopRequireDefault(__webpack_require__(/*! @/api/pay */ 20));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
// 汇集所有api接口函数
var ApiFunList = _objectSpread({},
_user.default,
_test.default,
_pay.default);

/**
                * @param {Object} data
                * @param {Object} callBack
                * 函数导出
                */
// 全量导出
var _default = ApiFunList;exports.default = _default;

/***/ }),

/***/ 13:
/*!**************************************************************************!*\
  !*** C:/Users/wutongyue/Documents/HBuilderProjects/no/api/user/index.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var all = _interopRequireWildcard(__webpack_require__(/*! ./user */ 14));function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};if (desc.get || desc.set) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}}newObj.default = obj;return newObj;}}

// 全量导出
var _default = all;exports.default = _default;

/***/ }),

/***/ 14:
/*!*************************************************************************!*\
  !*** C:/Users/wutongyue/Documents/HBuilderProjects/no/api/user/user.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.loginWx = loginWx;exports.login = login;var _request = __webpack_require__(/*! @/utils/request.js */ 15);

// 微信登录
function loginWx(data, callBack) {
  return (0, _request.axios)('wx/wx_login', 'POST', data, callBack);
}

// 普通登录
function login(data, callBack) {
  return (0, _request.axios)('login', 'POST', data, callBack);
}

/***/ }),

/***/ 143:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 144);


/***/ }),

/***/ 144:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 145);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 145:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 15:
/*!*************************************************************************!*\
  !*** C:/Users/wutongyue/Documents/HBuilderProjects/no/utils/request.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.post = post;exports.get = get;exports.axios = axios;var _request = _interopRequireDefault(__webpack_require__(/*! @/configs/request.js */ 16));
var _animation = __webpack_require__(/*! ./animation.js */ 17);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// post请求，不支持异步.then操作
function post(url, data, callBack, f) {
  (0, _animation.showLoading)();
  var token = uni.getStorageSync('token') || this.$store.getters.TOKEN;
  // 假定有token
  token = token ? token : true;
  // TOKEN拦截判断有无处理
  if (token) {
    token = 'Bearer ' + token;
  } else {
    // 跳转登录页面
    return false;
  }
  if (typeof data == 'function') {
    f = callBack;
    callBack = data;
  }
  uni.request({
    url: url.includes('http') || url.includes('yue') ? url : _request.default + url, //仅为示例，并非真实接口地址。
    data: typeof data == 'object' ? data : {},
    method: 'POST',
    header: {
      'Authorization': token, //自定义请求头信息
      'content-type': 'application/x-www-form-urlencoded' },

    success: function success(res) {
      if (callBack) {
        callBack(res.data);
      }
      (0, _animation.hideLoading)();
    },
    fail: function fail(res) {
      (0, _animation.hideLoading)();
      if (f)
      f(res);
    } });

}

// get请求，不支持异步.then操作
function get(url, data, callBack, f) {
  (0, _animation.showLoading)();
  var token = uni.getStorageSync('token') || this.$store.getters.TOKEN;
  // 假定有token
  token = true;
  // TOKEN拦截判断有无处理
  if (token) {
    token = 'Bearer ' + token;
  } else {
    // 跳转登录页面
    return false;
  }
  if (typeof data == 'function') {
    f = callBack;
    callBack = data;
  }
  uni.request({
    url: url.includes('http') || url.includes('yue') ? url : _request.default + url, //仅为示例，并非真实接口地址。
    data: typeof data == 'object' ? data : {},
    method: 'GET',
    header: {
      'Authorization': token //自定义请求头信息
    },
    success: function success(res) {
      if (callBack) {
        callBack(res.data);
      }
    },
    fail: function fail(res) {
      if (f)
      f(res);
    },
    complete: function complete() {
      (0, _animation.hideLoading)();
    } });

}

// 支持异步
function axios(url, type, data, callBack) {
  (0, _animation.showLoading)();
  var token;

  try {
    token = uni.getStorageSync('token') || this.$store.getters.TOKEN;
  } catch (e) {
    (0, _animation.hideLoading)();
    token = "";
    //TODO handle the exception
  }

  // TOKEN拦截判断有无处理
  if (token) {
    token = 'Bearer ' + token;
  } else {
    // 跳转登录页面
    // return false;
  }
  var promise = new Promise(function (resolve, reject) {
    uni.request({
      url: url.includes('yue') || url.includes('http') ? url : _request.default + url, //仅为示例，并非真实接口地址。
      data: data ? data : {},
      method: type,
      header: {
        'Authorization': token, //自定义请求头信息
        'content-type': 'application/x-www-form-urlencoded' },

      success: function success(res) {
        if (url == 'login') {
          try {
            uni.setStorageSync('token', res.data.token);
          } catch (e) {
            // error
          }
        }
        if (callBack) {
          callBack(res.data);
        }
        resolve(res.data);
      },
      fail: function fail() {
        reject('fail');
      },
      complete: function complete() {
        (0, _animation.hideLoading)();
      } });

  });
  return promise;
}
/**author:吴同岳
   * 时间:2019-10-12
   * contact:18814137320
   * 微信:wty1079051908
   * qq:1079051908
   */
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 16:
/*!***************************************************************************!*\
  !*** C:/Users/wutongyue/Documents/HBuilderProjects/no/configs/request.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var dev_boo = false,domain;
dev_boo ? domain = 'http://localhost:7777/yes/public/api/' : domain = 'https://coral3.com/yes/public/api/';var _default =
domain;exports.default = _default;

/***/ }),

/***/ 17:
/*!***************************************************************************!*\
  !*** C:/Users/wutongyue/Documents/HBuilderProjects/no/utils/animation.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.showLoading = showLoading;exports.hideLoading = hideLoading;exports.showToast = showToast;function showLoading() {
  uni.showLoading({
    title: '加载中...',
    mask: true });

}
function hideLoading() {
  uni.hideLoading();
}
function showToast(title, type) {
  uni.showToast({
    title: title,
    icon: type });

}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 18:
/*!**************************************************************************!*\
  !*** C:/Users/wutongyue/Documents/HBuilderProjects/no/api/test/index.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var all = _interopRequireWildcard(__webpack_require__(/*! ./test */ 19));function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};if (desc.get || desc.set) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}}newObj.default = obj;return newObj;}}

// 全量导出
var _default = all;exports.default = _default;

/***/ }),

/***/ 19:
/*!*************************************************************************!*\
  !*** C:/Users/wutongyue/Documents/HBuilderProjects/no/api/test/test.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.apiTest = apiTest;exports.needToken = needToken;var _request = __webpack_require__(/*! @/utils/request.js */ 15);

// 测试接口
function apiTest(data, callBack) {
  return (0, _request.axios)('test', 'POST', data, callBack);
}
// 需要token才可以访问的测试接口
function needToken(data, callBack) {
  return (0, _request.axios)('needToken', 'POST', data, callBack);
}

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    vm.mpHost !== 'mp-toutiao' && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    vm.mpHost !== 'mp-toutiao' && initProvide(vm); // resolve provide after data/props
    vm.mpHost !== 'mp-toutiao' && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  vm.mpHost !== 'mp-toutiao' && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    } else {
      console.error(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!*************************************************************************!*\
  !*** C:/Users/wutongyue/Documents/HBuilderProjects/no/api/pay/index.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var wxpay = _interopRequireWildcard(__webpack_require__(/*! ./wxpay */ 21));
var alipay = _interopRequireWildcard(__webpack_require__(/*! ./alipay */ 22));function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};if (desc.get || desc.set) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}}newObj.default = obj;return newObj;}}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
var all = _objectSpread({},
wxpay,
alipay);

// 全量导出
var _default = all;exports.default = _default;

/***/ }),

/***/ 21:
/*!*************************************************************************!*\
  !*** C:/Users/wutongyue/Documents/HBuilderProjects/no/api/pay/wxpay.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.wxpay = wxpay;exports.wxAppPay = wxAppPay;exports.wxMiniPay = wxMiniPay;var _request = __webpack_require__(/*! @/utils/request.js */ 15);

// 微信支付接口
function wxpay(data, callBack) {
  return (0, _request.axios)('wxpay', 'POST', data, callBack);
}
// 微信app支付接口
function wxAppPay(data, callBack) {
  return (0, _request.axios)('https://springboot.coral3.com/unifiedOrder', 'POST', data, callBack);
}

// 微信小程序支付接口
function wxMiniPay(data, callBack) {
  return (0, _request.axios)('http://localhost/coral3/createMiniProgramTradePay', 'POST', data, callBack);
}

/***/ }),

/***/ 22:
/*!**************************************************************************!*\
  !*** C:/Users/wutongyue/Documents/HBuilderProjects/no/api/pay/alipay.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.aliAppPay = aliAppPay;var _request = __webpack_require__(/*! @/utils/request.js */ 15);

// 支付宝app支付接口
function aliAppPay(data, callBack) {
  return (0, _request.axios)('https://springboot.coral3.com/createOrder', 'POST', data, callBack);
}

/***/ }),

/***/ 25:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    options.components = Object.assign(components, options.components || {})
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 26:
/*!***********************************************************************!*\
  !*** C:/Users/wutongyue/Documents/HBuilderProjects/no/store/index.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 27));



var _user = _interopRequireDefault(__webpack_require__(/*! ./user */ 28));
var _test = _interopRequireDefault(__webpack_require__(/*! ./test */ 29));
var _pay = _interopRequireDefault(__webpack_require__(/*! ./pay */ 30));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}_vue.default.use(_vuex.default); // 导入状态管理分支
/**
 * 注意：vuex只在uni的vue文件互通
 */
var store = new _vuex.default.Store({
  state: _objectSpread({},
  _user.default.state,
  _test.default.state,
  _pay.default.state, {
    getter: '这是测试getters' }),

  mutations: _objectSpread({
    // 测试
    doMutations: function doMutations(state, data) {
      state.getter = "hello world!";
    } },
  _user.default.mutations,
  _test.default.mutations,
  _pay.default.mutations),

  actions: _objectSpread({
    // 测试
    DOACTIONS: function DOACTIONS(context, data) {
      context.commit('doMutations');
      console.log(context.getters.TOKEN);
    } },
  _user.default.actions,
  _test.default.actions,
  _pay.default.actions),

  getters: {
    GETTER: function GETTER(state) {return state.getter;},
    TOKEN: function TOKEN(state) {return state.token;} } });var _default =



store;exports.default = _default;

/***/ }),

/***/ 27:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),

/***/ 28:
/*!****************************************************************************!*\
  !*** C:/Users/wutongyue/Documents/HBuilderProjects/no/store/user/index.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _user = _interopRequireDefault(__webpack_require__(/*! @/api/user */ 13));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
{
  state: {
    token: '' },

  mutations: {
    SETTOKEN: function SETTOKEN(state, data) {
      state.token = data.token;
    } },

  actions: {
    LOGIN: function LOGIN(context, data) {
      return _user.default.login(data).then(function (res) {
        if (res.token) {
          context.commit('SETTOKEN', { token: res.token });
        }
        return res;
      });
    },
    LOGINWX: function LOGINWX() {
      return _user.default.loginWx();
    } },

  getters: {} };exports.default = _default;

/***/ }),

/***/ 29:
/*!****************************************************************************!*\
  !*** C:/Users/wutongyue/Documents/HBuilderProjects/no/store/test/index.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _test = _interopRequireDefault(__webpack_require__(/*! @/api/test */ 18));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
{
  state: {},

  mutations: {},

  actions: {
    APITEST: function APITEST(context, data) {
      return _test.default.apiTest(data);
    },
    NEEDTOKEN: function NEEDTOKEN(context, data) {
      return _test.default.needToken(data);
    } },

  getters: {} };exports.default = _default;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!***************************************************************************!*\
  !*** C:/Users/wutongyue/Documents/HBuilderProjects/no/store/pay/index.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _pay = _interopRequireDefault(__webpack_require__(/*! @/api/pay */ 20));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
{
  state: {},

  mutations: {},

  actions: {
    WXPAY: function WXPAY(context, data) {
      return _pay.default.wxpay(data);
    },
    WXAPPPAY: function WXAPPPAY(context, data) {
      return _pay.default.wxAppPay(data);
    },
    ALIAPPAY: function ALIAPPAY(context, data) {
      return _pay.default.aliAppPay(data);
    },
    WXMINIPAY: function WXMINIPAY(context, data) {
      return _pay.default.wxMiniPay(data);
    } },

  getters: {} };exports.default = _default;

/***/ }),

/***/ 37:
/*!************************************************************************!*\
  !*** C:/Users/wutongyue/Documents/HBuilderProjects/no/utils/pageTo.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.reLaunch = reLaunch;exports.navigateTo = navigateTo;function reLaunch(url, data) {
  // 关闭所有页面，打开到应用内的某个页面
  var str = '';
  for (var key in data) {
    str += "".concat(key, "=").concat(data.key, "&");
  }
  data = str.substr(0, str.length - 1);
  uni.reLaunch({
    url: url + '?' + data });

}
function navigateTo(url, data) {
  var str = '';
  for (var key in data) {
    str += "".concat(key, "=").concat(data.key, "&");
  }
  data = str.substr(0, str.length - 1);
  uni.navigateTo({
    url: url + '?' + data });

}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 4:
/*!*******************************************************************!*\
  !*** C:/Users/wutongyue/Documents/HBuilderProjects/no/pages.json ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ 45:
/*!***********************************************************************************!*\
  !*** C:/Users/wutongyue/Documents/HBuilderProjects/no/utils/jsTools/navigator.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) { // nvue文件与vue文件互相跳转携带参数封装工具
module.exports = {

  navigateTo: function navigateTo(obj) {
    this.setParameters(obj.url);
    uni.navigateTo(obj);
  },

  redirectTo: function redirectTo(obj) {
    this.setParameters(obj.url);
    uni.redirectTo(obj);
  },

  reLaunch: function reLaunch(obj) {
    this.setParameters(obj.url);
    uni.reLaunch(obj);
  },

  switchTab: function switchTab(obj) {
    uni.switchTab(obj);
  },

  navigateBack: function (_navigateBack) {function navigateBack() {return _navigateBack.apply(this, arguments);}navigateBack.toString = function () {return _navigateBack.toString();};return navigateBack;}(function () {
    uni.switchTab(navigateBack);
  }),

  setParameters: function setParameters(url) {
    var urls = url.split('?');
    if (urls.length < 2) {return false;}
    var parameters = {};
    urls = urls[1];
    urls = urls.split('&');
    for (var i = 0; i < urls.length; i++) {
      var arr = urls[i].split('=');
      parameters[arr[0]] = arr[1];
    }
    try {
      uni.setStorageSync('graceUIPageParameters', JSON.stringify(parameters));
    } catch (e) {
      //TODO handle the exception
    }
  },

  getParameters: function getParameters() {
    try {
      return JSON.parse(uni.getStorageSync('graceUIPageParameters'));
    } catch (e) {
      return null;
    }
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 46:
/*!********************************************************************************!*\
  !*** C:/Users/wutongyue/Documents/HBuilderProjects/no/pages/index/img/cat.png ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAgAElEQVR4Xu1dB3hUVfY/782k9woJKUxCEhJaCFUBiQUEXKS5SFEEF3DFAjZcd3VB3f0rlhXLrusqAruuWFYJYkGwREWkCQEEQhASEkqAkE4CKfP+57xkQspk5t037b3Ju9833wTmvlvOvb936j2XA604nQLr8/LTdZw+qGPHQrAgCD05js8xN6ibk2K/c/pgu3iHXBefv92nvz4/v6euQR8vgDGTGscNL35jSUdiB9urQwGAQFTOAZcDXPM3cOUaiOxF4aZ2NIDYQE/iBDzwo3GzpiMUeiIxTWCwoVXbHxXBI0ABx3M5BKBGfeN3UwyGcttb7notaABhWPMWQBBX4CDTnhyBYRiyqjZxHASMANlGTyMBpkBWQ13sIQ0gFhZczYCwto8JMMhdsjmOy745KW6Dtfpd9XcNIO1WnnQIvp6fhLrDEo6Dno7aGCW1ApRcEuACfkpqmnopuYwf/Le5UlMP4OthfjS9g5qWMdwXIMybA189QFwAL3no2COKX1wWz3FZGljakk0DCNIDQRGMoLhDAGEuEgT1CfuVwiojFFU3gSC3QgDa6IVV5kFgv16bWiJAxQVwEOfPQbg3QCz9jR9fveVlFwTI4nl+jQaWLqyki6CoQ04BwmTkFJPtsTlrGgQ4UipAbrkAhQiKXPxbiUUEjQgcgJQQ+ts8t0GgFKAIlmX0ML7cVXWWLsdBmkWoxc3cwmaz695zRhEQuWUICidxBnuDjjhNRgQPvUMQMME8hPt03BYI9Wye41d2Na7SZQCy/mh+JmfkFtvKLYhL7D1vhD3nAPbgtzsW4i4jozgYiKBpD5ZmrrISucrarmA6dnuAiMAQuGW2+Ci6Aig6A3pnYCHFHsWvlUa9KH65rY/FbQFiD2CQgr2lSBA5BSnXXb2QGJYRCTAiStdCCncHitsBxFZgmLjF5kL16hSOBjLpLCOjeBgbxwtoVhb3kLsCxW0AQso3V8+jKCXMlbNBCBhbThhh80mNW7DQb2Q0T/qKkBLCNwGFLF/ALZ+UEr+WpR2l1nULgGw4emKZ6NiTEQxIDrsN+ah0a2KUTXu0dyjayg38FaCg1UvghCenJBmybWrYxQ+rGiDNlqnVcjzexDE2HEeOUeielihX7av2QEFXG1m8nlSrIq9KgDR7vpchQ1/CuhE0UYqVYvLqE1BmJ+kaYwI4HeknOkGYNzHFkCWvNdc9pTqAbDySP7mR41bLEad+PNMI7+ZpOoYztxvpKLOSeaOPnuMphEXwFOapiZuoBiC2cI3cMqOoZyg19MOZG9YVfZHVa2wMD5MSdWAUoFIPwh1q4SaqAAiFnaNlhLgGUyChpme4Ag6d90lOx/lpOiMGTaqGmygeIBvyTixGXWMl61IT11h1yAhkpdKKsiiA/hOYmsjVe3DcGUDGMiXZYPYMvhJGrViAkEiFfo2XWP0aGtdQwrayPgaK8bqrD3/JEMTX6znh/puTDWusP+X8GooESJPTj1vPKlJRaMir+zWu4fxtJL9H9J2IuokA3BrBw/iA0hR4xQGkOVSEwMEUir6lsMlCpRX1UYB0k4fSdbW+Htwx3ksYpSSQKAogn+Tlz8U3yWqWJSaRatXBJk+4VtRLAbJ03d1Xd7F3qK6M54wTlaKXKAYgFC6CgTzLWZaYFPBX9zeq9qASy1y7St1piXzteMws5gHCHCWYghUBkKy8E2jCZQsyJH1jxZ5GLQzdDZHTOxQaHkrX13nwcI+rlXeXA0QOODSPuBuiot2USC9ZmqEr9/eAB1wJEpcBpMmMK1qqMlmWe8OxRshCr7hW3J8CpJcsH6IrD/XW/Xtq73j0hzm/uAQgzeD4lsWMS8r4OrRSbT2tgcP528R1PRJI7u+vO9srWPfl1JT4O5w9EpcAJCuvYC8rOFb8rCnjzt4cSupvSbqusF+47tspyfFznTkupwOEVecgzqGBw5lbQrl9PZihy+8TqvvemSBxKkA0cCh386llZASSvmHcq5OTDC85Y8xOA8gnR/OXCALHNKlVhxo1ncMZu0BlfTw0SH+sXwj8xRnWLacARI6HXAOHynatk4f7SIbuaN8QbqmjnYkOB4gGDifvnC7U3UMD9dvSwuAeR4alOBQgzQedyJwrOfBQ4xxdaIfbOFUfjEf5v6v0hwL9YKSjAhwdBpDmkHUy50oGh+YEtHHHdMHH8S6USyuu1v80u6/hOkdM32EAYfV1UJb0VzDwUCsaBVgpEB/InV06ULdhZh/DXazPWqvvEIBsyMvHI7Kc5NAALfDQ2jJpv1ujwIAI7uAD6bq3bk4yMB/PttS23QFCaXmMHLfe2oRMv5MjcNmORu3suFSCafU6pcCMZH7XmDh+oT2VdrsCRI7esWJPg5aOR9v0dqPAH4fovkoM535rL6XdrgBBvYMsVplSZ6tZrKRSSqsnlQKotF/+81Dd8wvTE56Q+oxTRKwNR/KXA8dhOlBphc50vIVHZbWiUcDeFEgIgtyHBnveOzMl/mtb27YLB6FEC7zAfSt1MHRUdtnOBu00oFSCafWYKXBLL/6L8Un8LFtFLZsB0ny2I5/F36HpHczrrT3ASAFMFyigPvL3R4Yk3Mf4aJvqNgMETbpr0KQr+SCLlp7HluXSnmWhQKQPd/a+DH7BPQMSNrI817quTQDRRCu5ZNeecxYFBneD7+/O0E+SK2rZBJCsIwX5LJfXaKKVs7aF1k9rCszvo1/+3GjDk3KoIhsgrFYrTbSSszzaM/agAIpaJ/442POWOf3idrO2Jwsg5BDk67l8qZ1pViuplNLqOYoC18fyr384MXERa/uyAMKqmGuiFeuyaPXtTQFfvVD9UIbH7Q8MZrsGjhkgrIo53dNBSRfUUtLCvKC23gj5lfVqGbLixjkxwR82Hq9W3LiGRnFfbprSaxzLwJgBwhpOojbu8emkaKisF2DW52dY6KjVbaZAX3zBZE+PhZs3nIJtp2sVR5dJvXS3rx6b8I7UgTEBhPX4rNrCSSYm+MGaG6NE2k3deAq+O6m8BZa6sK6q983kbjAgKgCOlNbByA8K6U5CRZXEIO7gH6/WST6ByAQQVrPuIz82qCqM/dDsHtAt0Edc0F/L62DYukJFLG6AJw/iB7M5B3rxQItWVWcUP9UoDpZfVkZM2/SkAHj9hm4tNFv6w3lY9UuFImjYehA3GvS/Xzfe8IaUgUkGCCv3UJtZ9+GMIJjkdxYCgwIhJjZOpN0ffyyBN/aXS6Gj7DoJQR6QimJJ7xBPSA31gCg/PYR46yCwGRT+CAoppQaBUkWfZuCcrWmEQxcuw5GyejiMb/OD+LcjC17zDDkze0C4v3dLN2WXG2Hwf08oBsCmgUX5wba/XKO/SYrzUDJAWLgHHYIi7lGjEj23G8ZI750VC/98+UVY/PDSlgWuwDfz4HdPQOkl+xgZRvXwhf4RXpCGQEhBQAyMvLKZTJ1WVlTA4UMH2+zlw7/8ApWVHd/EMbGx0KMZzPRAalofBHhQpzjYVXwJdp29BNvx+yfUD+w1L+rwyaFBcO+gCKDxtx7Dv/AF8xi+aJRWpiR5zF41pue71sYlCSCs3ENtyRdWXRcK3S8cFmk1/OoRbWi2+mAFPPz9eWt0NPt7uI8OxvX0g3HxfjA6xgd8m7mBCQSHDhwQOVZlRSVyrVg4dPAXGNaq/7Q+fS1ueOr0UCvwnCoqhJNFRS1jCQwMgqqqSrFNc+A5Vl4PP52pxQ+CBr8LZFruegbqYceMOCg+fbKF+5oG0YhKCOkiecjJlFRi/GHT/jlJ462NSRJAWCxXauMeGZFesGVaLGzf9mMHcBDxBEGAq9+XvsDEGcYb/GACAiOjm7eoL5xs3rhV+HalEoBveQKESZSztki2/k4g2oHzIy5EoOEwPuiGceM69J9XVgfv51XBe0eqoPhig+RuP5kQASPig8R5mpsTWbMmolVLSYWifScmeFz/73E9LR7TsAoQVr+H2ixXP0ztBmndAiyu3Y+4wGS27KzEBujhtt6BMC05AAyBmK+/+c1Ob3QCA23KtL59FbM/iIMRYIhj0diIw7Qf3/cna+C9vGrYcKwKLqHI3Fm5EbnjuxOiRE5GoO9MxCOz+ZcnLiqGBjSQuAD4IOf2pFstDcoqQFi95mqyXM3CTf3qtZGSFm3Ol8XwWTvn1zS02sxJDYSRPZosX/QGJXGJ3tRSxCNJHTuhEm3uLZs+F3uaduuMNlzgIir+63+thv8croTdqL+0L/tmRkNMsG+nHNhUn8S3QaiwK6mgdNAwK9Vj5N+vM+zobFwWAcIac6Umr7m/R5PVJcSvo6Jsjlgnq+phCCrsOp6DuX2CYFH/YIj217cAg/6gt7ElJVlJm6OzsWz54nNRjwkKDoKp02e0qXYERbB3ECjrcquALFQPDAyCx4dHWOUepkaW/VQCr+U41irISuNQH3j213lJj8kCCGvErpq85n8dHgS/HxjBRM9vimrQ8uQFIV66NsBwli7BNFgbKxM33PLFFy1cpT3wNxyrhhvjvMHbQ2+Ve5iGQtwoA7lISa19rII2TlF83M9TKCian2yQBRAW0y5F7JJ4pYZCesL2GTGg1zVtdNZCMrzIMSyYVFnbVHJ94iokNo4ZN6HDnOm3MeMnSB4+caDF2eck13dGxaRgYeyOWclbzPXVqYjFmgBOTSl8/jcuDK41hDiD9m7VhwkoqX36iUo96S5UWAwQZBXM/LAIfrlQpxjaBHnDW/l3Ji1gAgiLcq4m0y75Iz6e2EMxi6PGgZjM1nJN1T+jsj/245OKmTra6MqevtYn6d7UmAvtB2WWg1CmEjwQVSZ1Bmox7eoxamPX9CiIC/GTOjWtnoMo8LstxZCF1jGllIHddPO/npawShJAWD3nr+5rhD3nlREwZ4ng9/YPhCdHSDPrKmXh3HUc5Igc+E4BYOiYUsqHpYuSpksCCFqvstDdOknKyEm8uidb+cp5mDcPORhv5evV5MjTiusp8OyuUnh+d6nrB4IjEECoLxOCQ+GeyDZsrYOI5a7i1WvXhMDMPmGKWAxtEE0UuNxoRC5yAijyWAkFj7EsOHh70lutx9IBIO4oXvUN84Ts38aKMUhaURYFPjpaBQu/OquIQaGFbV3ZPcmzLALEHcWrbyZH4im3QEUsgjaIjhQY81ER7Dnn2PMqUuiO1qyKsrt7heCbtCX4rMMrFSN3y6Tm2VWD9WpaL3/415juUuij1XERBQ6UXBZ9I0ooCaEeE3bP6NkUQoClDUBYI3eV7hwUT7nNiIbwgKZgQq0olwL3fXsO3s2tdPkAg725l4/f2WuJWYCwxl7d8129ok8N/mlwMDw4JNzlRNcGYJ0CFJ+VjmbfWguh9dZbsb2GnwccLlqQlGYWICw309LFm3S3oFJLD4y03T0zFjz18uKtlDovdx7Xy3vL4KntHZzZzp9yA8SW3p8kuvpbRCxW867SkzL854YwmJCkxVs5f3fJ77G+UYBBeKTgVLVr/Wqood9btijp720BwnhLlJL1j6uivOHTyTHyV0p70mUU+Cz/IszZ5PKkfS1e9RYOwqp/KPnk4M7fdofEcH+XLbLWsW0U+E3WSTGRhKsKcpBjyEF6teEg7uL/eHhQMDw2VFPMXbW57NEvpScat9610b6lOj8/uCu6poWDsPg/9p4zwiv7laegT070h1VjNZ+HPTapq9u4/Ysz8HmB65I8GDm4tvzupGwRIKxnz5WY92pEtA98Mkk75+HqjW2v/sncewN62HMxK6RLisA9XHpPrxebAMKooCvt7HkYpurcdmsMhPtqkbou2UwO6rSoqgE97IUuSV0a6AnvFsxPmi0ChFVBn/eVsrLkZf2mO4yK1ZRyB+1Tlza7GXNpzXTBVRQYuLgVAxdHNQGE4SpnpZ3/WIjpd54ZoSnlLt3FDu6cUr9SClhnFvSoF6NHPcoEkGz0GY6WMgAl5b6iNJ/bMCesVtybApTZcRTm9z1e4TzJhVKTll3y9msGSIHka06U4kGnPNDfTYuGlHBf994d2uxECuwsroXx652c35eHPswAUYoF64GMEHh8mHZCsCvhZzFG/L7jxIhfwcjfxLFasJSQoIGsVvtmx4CPp2a16koAoZu0KP2rPe81sUS/1HB4jBkgSjDx/m1EMNzRX1mKOeWKWvPmvzAJ9BdwqtUdHWPGjcfMg+M75LlV4samKyA+/uB9TDn6OVRVXjmbQXOYOv1WpgyKjprfazllsOwn50T8ot7xJ+6To/lLBIF7SeqElu1ogMIqySqL1GYl1+vmq4MDt8WDTiftajLJDdtQ8ZUXn4dXXnjeYgs98GqA199ey5SF0IYhMT1KqVRpDgRwS2XY1VeLc3BlytU6jPgd8J8COOeE/L7xwdxbnNp8IM8N9YPfDWq6iVYJZemS++Hj99+TNJSAwED470dZigPJxBuug8N4V4iUQkDfuOUbl4LkbTT5PiLz1i8pczTVwSyp/1UVQILwhtfcOfGKOQS1+l9vwF+XPcFCc7xT0PUbrPWAn37iT7D2rTeZ5kCchIDuypL49nHHe9gFYQvH4iQkgrjSi76kjzc8cY0yznmQWDJ66KA2srrUDXPfQw+3uSxU6nP2rkd6U+bQwbKaXbHyZbxsZ6asZ+3x0OPbSuD1fQ6+a0QQdhBAsqU6CV19xcH+WyOhR6gy0vd89P46eHTJYllrTVzku50/y3rWng/J4R6m/m+4cRz8c82/7TkcprbIaUgWLUeWbn5wmAkgrvSiD4nQw6ZbejqSHkxt/37uHPjqy01Mz7Su/AnK8SzXBsjuyMKDs6ZOgp0//SS76V/PuPaej2vQu37Qgdco9A3jilQDkGf6NsLCUSmyF9PeD9q6ud75aL3ZW3XtPU5L7fWKsi2R957coy5V1p/ZWQov/Oy43L59wrhi1QBk201+kBKnHOuVBhAAVwPk57O1eM+I48JP0kL5UlUAhBeMcOauRNlXpjnirbx08X2iU01ucScRiwwWrvCNGNEOG/WvY9DgoCsUUkO5ClUAZLhPOXw2V561Re4GtvacLUp6dEwMfL9rj7UuHP67PZR0uobNlboUpSyl1KWOKGmh3FmnA2R6SgDc1NMPQjCeSmrppq+DXpFBUqs7pR69Na8ZkgHVVVXM/bmDmZd0KLr2mi73HH71CGYa2OuBRd+cg/ePOCZlab9w7oRTAfIERt8uwShcdykUs3T3nXOZptM7rQ+8gebRCgSYK9+8pkHL4SJDr7oKHn/qrxh39rnL/Tkr8BKe5xx0Cc+AcO4IE0BOYAzWcozFkltOze8JdTUX4VCrsIYdGCBnrgxr9VaiN5USNpO5cbLoIv4BAfDS629AwbFjMG/hXXLJaPfnWEzWBPAH//AYHNiX43JwECH+faAEHtjqGIfhwAg+hwkgNCC5nvRIYyUcvifD7ourhAZJH3n6icctilv01h121dWozAYrChwsnCTzuushOTUVBg4arIjIXhp7XkkNZOVLSzJHebFzzl+CrwtrJG2baH/41mkASa35FbY+NE7SwNRYiXSS1W++gaHiX0DuoYPiFIhjkHyekJQEJefOwdRbZ7hUXrdGVwo9ofgyCtk/fbIpcRsZFAYNHgJBISEQ39OA4SUzXGKxsjZ2lt9/PF0LN2+wbh7uHQKbnQaQvtWH4btHJrLMQ9V1abPt/GkbVJRXAN0nPmb8BNXNh+ZQWVHpckW8M8KRBe0UjvEknr+JiYuzCtxUFA9N5ugZmCllC2ZMsVSGduc2EUBWYiyW5KAiuTl5+108DNkPdw2AmDaWUvUm1SFV4oDpwJe5Ys7K9n/ohX/Rihd+ZDT/P+Zwd7knChNK98OuP02VOFWtmkYBx1Jg5e5z8PQuy+bhG+L4fzgRIAfg3el9IQnlca1oFHA1Bf6+4xT8eU+txWFMTdI9znwmXW5Wk27VJ+DmC1tg0aJFEIfyolY0CriSAq8hQJZZAcjjg3VPOA0gRIzRx/8H3S8WyqLL9ddfD9OmTZP1rPaQRoH2FFixtRCeO2A5MfbLmZ5jOdbM7raeCUk5vxv0jewZuwfX/Qp/e+YpbaU1CtiFApPWHYSt5V6dthUfyJf+eSh/PXPiuPO1Aiz9Ub43Xe7shpzcDC/ddi2koqNKKxoFbKHA22+/DX+ovQoa+c7zqo3szud9MjUxxZTdPQc4boDUTuV606W2b65eZHURLPL+Be677z5bmtGedRMKfP3113DgwAGm2TQ2NsKpU6dgV1AGHIocbvHZiQbd9rXjE64yASQLATJJam+uyo11U+6b8OyjiyE6OlrqULV6bkiBixcvwt1PvQQ1RrbcaPU6LygMSoHC4N5WqXJnmm7TC5kJ42XdD+KqG24HVx+Ap0f3gKFDh1qdoFbBfSnwzscbYUlxCggcG0BYKPJwhsebfxzec6EIkE/y8ucKwK2W2oAzM7x78ByMxfMjM5MD4IZ4X6B/u+oEm1T6aPUcR4FzGNN209s74XiQdS4gdxR0UdmK4fpFs/sZXm+6gi0vP50Hbq/UBm21ZEnpZ0CEF8zEw1VTkwKAklVTIWBQeDyFwrviiKeUcWt1HEuB51f9F56tG+bQTjBZw+kHB+pumpJsyLlyT3qe9DtCaHSOUNTDfXQwu3cg3JYaCAlBVywMFNtEwKBzIWoM+nPoanahxmtra+HOrFzYXB7g0FnPTeUP/O3axP7USSuASE8gRw/KjclqPzNPFJkmJPjBDBShrovzA13LiAAo+IyAQdGwrszi59DV0BpnpkA+Jo374GgVrMO7QuiiT3uXxf35L5aNTBTDr1sDhCmqV27IiWky8YEecHf/IJiREggBnleULeIWX23ahEdSy0VRypXnne1NeK09+1NgV/El+BDB8mFeFVTW2Se9ybMj9O8tHGAQ86q2AIRVUbdFD4nx14t3C/rRPWrNhQ7pVCIoqIwZN0HTMey/l9y6xTqjAFsKLsL7R6thM37X47/llN4hXOOD6fpbb0nt+VEbgLCGnNDDcvWQZ4cHwoKBkaLSTYddKDNGWp++GijkrKj2TAcKlF1uhKxfq+ED5Co7kcOwlFnJfOH1ifyAKQaD+LZuJfGL96UzedTl6iHrBtXA2KGiDmS3UlZWBiF4LFQrGgVaU6Cgsl4Uv/5zuBJOVVvXVx4fwu95cEjiIFMbbQHCeLpQrj/k5YDtcNttt9m8kmTV2L59O+zatQsKCgpgwoQJ8Jvf/MbmdrUG3JMCd3xZDJ8er+50cuT/eHq4x3/m9es5xyxANh7Jn2zkuPVSySM3cPGWwnfhjWf+LLWbDvUoBoeAsXfvXqjjvaAoKAmqvEIhvfh7GDt2LEyePFl229qD7kuB08hB+uH1bZ2VzBiuZF6KbsHEFEPL7UBtOAjqIcF8PVfGQiI5cVkDz2TDi9OGwIABkuMj4SRm2dixY4f4qa6uhtMBBjge2g9OBfZqGW5sxRG4uvAzGDlyJMyaNYtlGlpdhVDgC8wKI2DO3aswTZIjROaeq45DVSfWrmVD+WOLByde2VDtdRCiEcuFOlR/XV4jbC5kM6+F1J6FPwQehvnz51tcFgpK+wnvr9i2bRsUFxdDqXcEFIakQX5wH6jTe5t9tkflMRh5YgP069cP7r77boUsu/2GQdkcLTlLKdMHFbUljKivr4fVq1fD1oPHwL++KZ1rcnKyGHc3ZMgQ8PCw/crvqppa6LnWfLofEq/+Oly39Y5+CaNar1YbDkI/sN56K1fMuunIKljx6P0QFdXxSgMSnUiEIlHqks4XTmD05fGw/lCJYpSUElZzGq7J/xh6xXSHBQsWQFhYmJTHXF6HNr+lMBq6MPQQ0uS5l181CwByrL7ywnPwz9X/VpVF8MKFC/CPf/wDvq2Phn1Ro8GvvhIMpb9AfNlBESyenp6Qnp4uSga9erV5wTOt2Wfb98GcvX5mnxkdzV26I023aHKyoU1MYgeAyDH3yhGzep/fBTc05sKUKVPAz88PGhoaRECQCEXKd1FQMhQEp8LpwEQmIpgqB166ANcUfAyhfB3Mnj0bBg9WVnZ4c5MybfD7H17axkFK5vC/4GWhlNeJErf9ft4cmLfgrhZOQs7VV158ASrLy0XwqClOLTc3F9588034Jvxas2HodA7IUH4QYsuPgE5oFMWuESNGwLBhw5hffPPXfAvra2PN7idUzoujQ4RUk3nXVKkDQEQxi9HcK8eaxRsb4IZj70HIpSvXeJX6dIN81CtOYMw+xe7bWjwaL8FQPIkYU/mrSNAZM2aAl5ft7do6LkvPmzI0HkZRieOalqeosBDz4D7SAghTHVNe45jYOMVnbTQ3540bN8JHW76HrYapUIbis6WiM9ZDbEWeyFkia5rEJJMIRi8/4jKWSklJCfR/rxgu6zqK5uE+HDw2SLd9Xn/DVe3bMAsQZ4lZNJgIFIc4fDPU6P2h2ssxfoxEzMk18PS3EBroD3PmzFHNsV0CAhU1cQQpL48idA6vXbsWcip42BY3ES7rfaQ81lLHr64CDCh+mUQw0k8GDRokKvadpZV6+9NseKTI/A3JtyRy1RMMuvvbi1fUoVmAyBGzXHWISipl/ZGowwo/h/DaMyKLnjp1Kvj4sC2M1L60ep1TgLjGp5s2o65xDRwNG2gzqSIunoSEC/tFKUEvNIhi1/Dhw8WPSffcvXs3zP/qLIrt5u+4fPUaj3JfP8HQXrzqFCD0A6s1K7dMgBU/W/dU2kwRGxvojVlVBqC/JAATS0+fPl1882jF8RQoRDGRuMa+Sh3sjBkHFz3te523DsERX3YY4stzIfJiUZsJlfhGw9eJM8xOMiOCExb21X05PdUw3lwFsxyEKrIGL9IzcvP2On552vbgf7kchpzajIQ8CWlpaSI30c65O2YVyEL16aefwraduyEHLVS/hqU7pqNWrfrVVYr6ig7TS9XrvaAgBN0CZnQPemT5UP0FQwDMb+0cbD3ATgEix2koR1l3OLUsdJBQegD6Ff8APsbLkJGRARMnToTISNuuRnblfGAhDJ0AAAxbSURBVJTUN8XGkdOPfFhFfgbYG32t3bmGrfMl5Rx9H+d+m2ro1llbnQKkWcxag2rKHVIHcrEeYOm2eqjBb7UUPVpHUkp+Bkpo5wUNorVr3LhxEBFh2aqilvk5e5yVlZXw5Zdfwg8//AAnvXvA/u6joMxHmS+du/rytcMi+OcnpxqWyQII61l1EVTHMNQ4n82z7uxFNNefZ8MlSDu/A3pdyBHt7WQRufHGGzWOInFxKN/U999/Lzp4T3lEwn5Uwi/4Kude+/bTIO7x/Ag9GD1E5bxAFkCauUg2cpHREukEauQirefm1VCDQNkJiRf2iUBJSUmBUaNGiZ5cnndcmhmp9FVSvbq6OiAL0datW8VoalKGD3a7Cor945U0TLNjWdCHbxgcyX+I4pXFoD2LIha1LEdZV7rJV8rqEVB6of8kETmKD/4dGBgoxgQNHDgQEhISpDThtnUoLi47Oxt27twJ1XWNGBuXBsfCBkCFd7gq5iyVe9BkrAKEKmUdyS9Ar67k14LauUj7VaYAyMTSfRBV1cSJCSxkHqZoZPLmdoWSn58P+/fvFz9nzpyBCz7d0Y+RDieDk6GR06uKBAv78nVDu3E7p6a0DUw0NwlJAJHDRdSqi1haaU8MXYmpOIpOqaMtYPH19RUjh0kEI3HM29t8lLGqdhAOlqJrDx8+LJ65OXjwoHjE4KJHAJwMTBKPGVR6qyMAtD3dW7gHJ1w7JcmA6oPlIgkgZPLl6qGAAy7IWoOm392Ni7Sft4exDqIqj4se3KiqfCBrGBW6HIgiTulDYQ8UiKmGcvnyZSAucfz4cTiG97gTODDbJpT6dsczN4l4/iZBNSKUJXov7MNfxss5d0nhHpJFLKqIAYzLMXquU3OYuUG5IxfpjPjd8QatyOpCCEfnY0TNmZZqFM6fmJgofmLwSuUePXooAi+kR5BibQIFWaGo0AnN8/4xIqc4g4fSWOOkFDG5TgYRF8DBk8PQciWRezABRA4XoQ7U4l2358JSpHI4giSiBsGC4dphNcVinJCpEFDIc9+tWzcIDQ0VQ7jpY0/fSzmGvpeWloqf8+fPA/2bvNr0bwKHqZR7hYnWp1K/aFGvUKvoJGX9Hhusq+sVxO2YkmK4Rkp9JoDI5SJqidGSSjC59ULxFGVw7TkIunwBv89D4KUS8G7seIkkhW1TECXpMvSh8HzSc+ib/p++KQyezsy0/ly6dKnl3zU1NR2GWe0ZBDUegaIeUYVR06XooyBANOgsh4nLna/SnsuI4OG+ATom7sEMEHqA1aJFz7y6rxH2nFef89DRi+zReBl88cScb301+OC3T0M1kMOS9Bs9/uaBsUTi3/ihv+nbEz8NaDWqx41dj+IQiUB0UxKdn6nj8f/oW+8rAqEGAwIvIihqPfwdPRVFt0/Haf8yXH85xAu2T0o2ZLIMVpKS3rpBORYtOpa7fGeDqkJQWIio1VU2BWYl64xj4njemtfc3CyYASKKWnlsia7pGbUFMip7ybXRSaVA71AOHs0gP43wMnKPJVKfM9WTBZD1R/MzeYH7lrUzuZkYWfvR6msUMFHgqeEeDTF+Qo3gCfHmDkRZo5QsgDRzkTUskb70jCZqWVsO7Xd7UgDz7MKYOB16c4R5NycbcL+yF9kAkWv23XraCBSrpRWNAo6kgMlqhaLVd6yKeetxyQYINSJHYafn3CGY0ZGLq7VtGwUonAQdgoK3TkCzIPS3FM5urSebANIsamWzhMPTMxSG8tyeBiiskneHg7VJab93bQosR295PHrNMYfpk5NSDMttoYbNAKEMKBinhZcdSo/T0vQRW5ZMe9YSBUx6B4JjH4LD5gPwNgNEFLWO5i8RBO4l1qXbc84Ir+7X9BFWumn1zVPAZNLF5NeVaLWiS3AKbKWVXQAiilpH8rMwBmIS64DkJL9m7UOr7/4UIG/5c1fr8Vo/lGU44YGbkwx456btxW4AkWvVoilo/hHbF7Irt0DgWIrOwGa9YwOKVna7IMZuAKEFkutA1JT2rry9bZ/7o4P0gJdv0r0iJ1C0SpfjEOxsFHYFSLOoxXxuRFPabd8kXbWF36XpYGR0UzINIwgDpyQbcuxJC7sDxBZ95ASafcn8q6a8WvZcDK0tNgq0Boct3nJLvToEIKI+UoemX4ZED6ZBaiBh2yRdtfbYOB5mJuuapy+sRW/5XEfQwiEAEfWRvPx0bDyb1T9Cz2ogccRSu0+bJFIR9xCLnfwdTtNBWnckV2mnNjQfiftsaHvOpD04jJ6QaU+lvP1YHcZBTB3Jjdei57XARntuLfW3ReCYkaRDXwcyDhAqMFAp095KudMBQh3iASt02nCL5SwRcZJVh/EGKhUlxJYzT+0ZyxRozTmcBQ4akcM5iGnaCJI1rOdHTM9qOknXhk8bsQpJwQvClM7u87A3pZwGkGZOIhskdNjqNYzb0iKA7b0FlN0eHXiiAERTcZQ5tzMqOBUgtoJE87grezPbe3St/RxN4o78k4Fyx+Z0gNgDJO8dbRQVeK24JwUotuq+/k3hI67iHFf6dRGNbdFJaMjv5hnFTClacS8KUHrQO9HHIQYeNhdXcA6XA8RWTkLPaxYu9wJHazOuEsDRJNa5uNjKSUgvee1AA+SWasd3XbyUNnVPYSMUPmIqzjTlWhq4ywFCg5N7IrH1xOheRMomrxV1UYASLNzbv61IpRRwKIKDmJaTPO6odq+UE7tlaoP8JWQKLkGTsFaUTwEy4U4y8KJn/ArrEPY5OnyEhTKK4CCmAdsS4Ghqg0SutzHvlpYsm2UbOLcuWal+l6qDjMh2l6IKwgYEx1xHxlaxzlRRAKHBU5YUvg7ofPsA1sm0rk8K/LqjRo2b2EJEBzxrlmtQP3ZI0eOA4bpeSe9sUrYq79QucZMNqJto5mBHbB22Nsl8S4p4a9+GiAsMOtQJMNdZoSNso1aAFcvSgG2JBG7dLukm5FzULF2s28P2+iROEdeYjLpGh4JnOVCkmmyP9Dy2j9R8C4oTsdoPk/QSXoA1topc1K4mdjlqG5lvt1NxSqwu7zoC585A4RykNTFsCZlvT9TNhWgSztdC6B212UZEoXUqgYMINOG2L6IJl0OuIeEKZkeNj6VdxXOQ1pOhE4qcEdbIOetujigUz0U6imYWZtkynde1BIwmpqE8K5W1masKIDQZSgjB18NyuQewNKBY2xLsv1sDBuWrwhPkS5SqiFuaseoAYpqMeN7dCCvtoZuY2iQdZctJo6bMS8CISfke0d28KHWlCeFlowcsV5JvQ8L0WqqoFiCmGWBO4OUo0y6xxQPfnmBk9dpSKMDeEk1PaU8bMteOieVbkrV1vtmE74wcAkMlukZn81A9QFqJXXTu/Q6Wt4O1uuRH2YvXV/9Y3LW5CsVLDcR7xsfEWuMWpGYIJ3gEhtwrz6ytibN/dwuAtIhdZBLGeC7WC32kEJ2O/O49L8CPZ4xd4tivCRQZEVwH5545epF1ihNgJfo1VqpVnDI3L7cCSBv9BK9mdwRQqA8TWHLLBThSZnSbjCskPqWE8DAiimtzYMnSC8RdgWGas1sCxFlAMfWTWyaACBY8k5KLgFFLIUDE+vOQEQEiMNpE1VqZhLsDo0sApJ3Fa4mcC37kbHYCDGVfKawCKKpWhkhGIlO4N3KIUBSZggkYHBMgWuiA4SEcBysbPSDLnUQpt1bSpW5iMVK4HpbgaZG59rR6SemfLGMXUI8pvAiiSFaE/65paAKSvYoJBD4Y/0TcIdwLgP6vfYCgvP6EtWiVWqN2qxTr3N1axOqMGORs1NXDZEEA4io2hdWzEryz+mQxK6ruCBYS3Uwlzg/AF68Ya1189CBZX2AdK1mksLc1qHivUXJAIeu8WOp3SYC0JpAruQrLQjm1LoaEoBiV5S6mWlto1+UB0pp4G4/kT0YxIhM5y2R7xXvZsjjOelZUuAGyMGo6S43hII6kkwaQTqgrhtmjroInejKVIobZcyOI4hNyCbS5rXF0hnR7jtvZbWkAkUDxFp0F0+0jd8lUI3dpNstmczxkNwqQrYFCwsJjFQ0g0ujUphYBRl8Hmfj2TUcKZqIajbdpcUEymnLgI8J32HgOLnAOJkPK0QAhj9QaQOTRrcNTBBpogHQM605HLtMTK6Q3VeJG26mLDs00i0kF+EMBioIFKBLmNHgiGAwG+j+t2IECGkDsQEQpTZC1DAFEwAEM08+U8kzrOuLm56Fc/D+9CIKmv7XiUAr8PyzDDnomDg7oAAAAAElFTkSuQmCC"

/***/ }),

/***/ 47:
/*!************************************************************************************!*\
  !*** C:/Users/wutongyue/Documents/HBuilderProjects/no/pages/index/img/red_cat.png ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 5:
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;

var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq' };

  return platformList["mp-weixin"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;
var statConfig = __webpack_require__(/*! uni-stat-config */ 8).default || __webpack_require__(/*! uni-stat-config */ 8);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$key = _ref.key,key = _ref$key === void 0 ? '' : _ref$key,_ref$value = _ref.value,value = _ref$value === void 0 ? "" : _ref$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // 时间超过，重新获取时间戳
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      uni.request({
        url: STAT_URL,
        method: 'POST',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        data: optionsData,
        success: function success() {
          // if (process.env.NODE_ENV === 'development') {
          //   console.log('stat request success');
          // }
        },
        fail: function fail(e) {
          if (++_this5._retry < 3) {
            setTimeout(function () {
              _this5._sendRequest(optionsData);
            }, 1000);
          }
        } });

    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      var image = new Image();
      var options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(Stat).call(this));
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 6:
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"@dcloudio/uni-stat@alpha","_id":"@dcloudio/uni-stat@2.0.0-alpha-25720200116005","_inBundle":false,"_integrity":"sha512-RZFw3WAaS/CZTzzv9JPaWvmoNitojD/06vPdHSzlqZi8GbuE222lFuyochEjrGkG8rPPrWHAnwfoPBuQVtkfdg==","_location":"/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"@dcloudio/uni-stat@alpha","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"alpha","saveSpec":null,"fetchSpec":"alpha"},"_requiredBy":["#USER","/","/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-alpha-25720200116005.tgz","_shasum":"08bb17aba91c84a981f33d74153aa3dd07b578ad","_spec":"@dcloudio/uni-stat@alpha","_where":"/Users/guoshengqiang/Documents/dcloud-plugins/alpha/uniapp-cli","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"a129bde60de35f7ef497f43d5a45b4556231995c","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-alpha-25720200116005"};

/***/ }),

/***/ 60:
/*!*******************************************************************************************!*\
  !*** C:/Users/wutongyue/Documents/HBuilderProjects/no/pages/slideShowHide/img/dunPai.png ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 69:
/*!*******************************************************************************************!*\
  !*** C:/Users/wutongyue/Documents/HBuilderProjects/no/pages/slideHIdeShow/img/dunPai.png ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 7:
/*!************************************************************************************!*\
  !*** C:/Users/wutongyue/Documents/HBuilderProjects/no/pages.json?{"type":"style"} ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/index/index": { "navigationBarTitleText": "基础架构", "enablePullDownRefresh": true }, "pages/requestTest/requestTest": {}, "pages/slideShowHide/slideShowHide": {}, "pages/slideHIdeShow/slideHIdeShow": {}, "pages/home/home": {}, "components/banner/banner": {}, "pages/androidTest/androidTest": {}, "pages/componentShow/componentShow": {}, "pages/nvueTest/nvueTest": {}, "pages/person/person": {}, "pages/shoppingCart/shoppingCart": {}, "pages/photo/photo": {}, "pages/otherPage/otherPage": {}, "components/pay/wxpay": {} }, "globalStyle": { "navigationBarTextStyle": "black", "navigationBarTitleText": "吴同岳", "navigationBarBackgroundColor": "#F8F8F8", "backgroundColor": "#F8F8F8", "navigationStyle": "custom" } };exports.default = _default;

/***/ }),

/***/ 8:
/*!***********************************************************************************!*\
  !*** C:/Users/wutongyue/Documents/HBuilderProjects/no/pages.json?{"type":"stat"} ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__9BE2053" };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map