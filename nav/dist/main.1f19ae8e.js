// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"main.js":[function(require,module,exports) {
// 读取 localStorage
var navData = localStorage.getItem('navData');
var navObj = JSON.parse(navData);
var dataArr = navObj || ['cnblogs.com', 'github.com', 'segmentfault.com', 'wangdoc.com', 'xiaohuochai.cc'];

window.onbeforeunload = function () {
  localStorage.setItem('navData', JSON.stringify(dataArr));
}; // 储存 localStorage


var navBar = document.getElementsByClassName('main-nav')[0];
var moduleNode = document.getElementsByClassName('module')[0];
var urlInput = moduleNode.getElementsByClassName('module-input')[0]; // 标志位(-1表示当前没有被操作的导航项，可以新增导航)

var selectedIndex = -1; // 根据 dataArr 来渲染页面

var render = function render() {
  // 清空元素
  navBar.innerHTML = '';
  var html = ''; // 生成元素

  dataArr.forEach(function (item, index) {
    html += "\n            <dl class=\"fl\" data-index=".concat(index, ">\n            <dt>").concat(item[0], "</dt>\n            <dd>").concat(item, "</dd>\n            <dd>\n                <svg class=\"main-nav-more\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\">\n                    <path d=\"M0 0h24v24H0z\" fill=\"none\" />\n                    <path d=\"M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z\"\n                    />\n                </svg>\n            </dd>\n            </dl>\n        ");
  });
  navBar.innerHTML = html; // 绑定事件
  // 导航面板点击

  navBar.onclick = function (e) {
    var target = e.target; // 点击相应导航项，打开对应网址

    while (target !== navBar) {
      if (target.nodeName === 'DL') {
        location = "https://".concat(dataArr[target.dataset.index]);
        break;
      }

      target = target.parentNode;
    } // 点击

  }; // 导航项的“更多”点击


  var navMores = document.getElementsByClassName('main-nav-more');
  Array.from(navMores).forEach(function (item, index) {
    item.onclick = function (e) {
      // 显示编辑窗口
      moduleNode.style.display = 'block'; // 设置标志位为当前索引值

      selectedIndex = index; // input 中显示网址

      urlInput.value = dataArr[index]; // 阻止冒泡

      e.stopPropagation();
    };
  });
};

render(); // 编辑窗口的三个按钮点击

var delBtn = moduleNode.getElementsByClassName('btn_delete')[0];
var addBtn = document.getElementsByClassName('main-add')[0];

moduleNode.onclick = function (e) {
  var target = e.target;
  var classList = target.classList;

  if (target.nodeName !== 'BUTTON') {
    return;
  }

  if (classList.contains('btn_delete')) {
    // 删除当前项
    dataArr.splice(selectedIndex, 1); // 重新渲染

    render();
  } else if (classList.contains('btn_cancel')) {// 取消
  } else if (classList.contains('btn_done')) {
    var value = urlInput.value; // 如果输入的网址不符合规范，则直接返回

    if (!testUrl(value)) {
      return;
    } // 如果标志位为 -1，则新增，否则修改


    if (selectedIndex === -1) {
      // 处理url，并添加到 dataArr 中
      dataArr.push(simplifyUrl(value));
    } else {
      // 修改处理后的url
      dataArr[selectedIndex] = simplifyUrl(urlInput.value);
    } // 重新渲染


    render();
  }

  initModule(e);
}; // 右下角的'+'按钮点击


addBtn.onclick = function () {
  // 隐藏删除按钮
  delBtn.style.display = 'none'; // 将标志位设置为 —1，表示可以新增

  selectedIndex = -1; // 显示编辑窗口

  moduleNode.style.display = 'block';
};

function initModule(e) {
  // 隐藏编辑窗口
  e.currentTarget.style.display = 'none'; // 清空 input 里面的值

  urlInput.value = ''; // 显示删除按钮

  delBtn.style.display = 'inline-block';
}

function testUrl(url) {
  if (/(https?:)?(\/\/)?(www.)?([^\/]+)(\/.*)?/.test(url)) {
    return true;
  }
} // 简化 url https://www.baidu.com/dfdfd/fdfdf/ -> baidu.com


function simplifyUrl(url) {
  return /(https?:)?(\/\/)?(www.)?([^\/]+)(\/.*)?/.exec(url)[4];
}
},{}],"../../../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51850" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map