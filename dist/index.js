(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.xpLib = {})));
}(this, (function (exports) { 'use strict';

  /**
   * @author xiaoping
   * @email edwardhjp@gmail.com
   * @create date 2018-01-17 11:48:00
   * @modify date 2018-01-17 11:48:00
   * @desc [动态加载css]
  */

  function createLoadCSS() {
    // 执行函数
    function exec(options) {
      if (typeof options === 'string') {
        options = { url: options };
      }
      if (!options.url) {
        throw new Error('loadcss: you must provide a url');
      }
      if (checkLoaded(options.url)) {
        return Promise.resolve('loaded');
      } else {
        return loadLink(options.selector, createLink(options));
      }
    }

    // 去除协议
    function removeProtocol(url) {
      return url.replace(/^https?:/, '');
    }
    // 检查是否已经加载
    function checkLoaded(url) {
      url = removeProtocol(url);
      var tags = Array.prototype.slice.apply(document.getElementsByTagName('link'));
      var urls = tags.map(function (item) {
        return removeProtocol(item.href);
      });
      return urls.indexOf(url) > -1;
    }
    // 加载
    function loadLink(selector, link) {
      selector = selector || document.getElementsByTagName('head')[0];
      return new Promise(function (resolve, reject) {
        var done = false;
        // 处理浏览器兼容
        link.onload = link.onreadystatechange = function () {
          if (!done && (!link.readyState || link.readyState === 'loaded' || link.readyState === 'complete')) {
            done = true;
            // Handle memory leak in IE
            link.onload = link.onreadystatechange = null;
            resolve(link);
          }
        };
        link.onerror = reject;

        selector.appendChild(link);
      });
    }

    // 创建
    function createLink(options) {
      var link = document.createElement('link');
      link.charset = options.charset || 'utf-8';
      link.rel = options.rel || 'stylesheet';
      link.type = options.type || 'text/css';

      if (options.url) {
        link.href = options.url;
      }

      return link;
    }

    return function load(items) {
      return items instanceof Array ? Promise.all(items.map(exec)) : exec(items);
    };
  }

  var index = createLoadCSS();

  exports.default = index;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
