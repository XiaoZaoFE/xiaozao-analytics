(function () {
  var VERSION = '0.0.3';
  var xa_tmt = new Date().getTime();
  var xa_F_HTTPS = false;
  var xa_u = {};
  xa_u.g_d = function () {
    var t = {};
    var ua = navigator.userAgent;
    t.Android = /(?:Android)/.test(ua);
    t.iPhone = /(?:iPhone)/.test(ua);
    t.iPad = /(?:iPad)/.test(ua);
    t.PC = !/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(ua);
    try {
      Object.keys(t).forEach(function (k) {
        if (t[k]) throw k;
      });
    } catch (e) {
      return e;
    }
    return 'unknown';
  };
  xa_u.get_l = function () {
    var type = navigator.appName;
    if (type == 'Netscape') {
      var lang = navigator.language;
    } else {
      var lang = navigator.userLanguage;
    }
    var lang = lang.substr(0, 2);
    return lang;
  };
  xa_u.g_v_s = function () {
    try {
      return document.documentElement.clientWidth + '*' + document.documentElement.clientHeight;
    } catch (error) {
      return document.body.clientWidth + '*' + document.body.clientHeight;
    }
  };
  xa_u.g_r = function () {
    try {
      return window.screen.width + '*' + window.screen.height;
    } catch (error) {
      return 'unknown';
    }
  };
  xa_u.g_cid = function (len, radix) {
    len = len || 20;
    radix = radix || 16;
    try {
      var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
      var cid = [];
      var i;
      radix = radix || chars.length;
      if (len) {
        for (i = 0; i < len; i++) cid[i] = chars[0 | Math.random() * radix];
      } else {
        var r;
        cid[8] = cid[13] = cid[18] = cid[23] = '-';
        cid[14] = '4';
        for (i = 0; i < 36; i++) {
          if (!cid[i]) {
            r = 0 | Math.random() * 16;
            cid[i] = chars[i == 19 ? r & 0x3 | 0x8 : r];
          }
        }
      }
      return cid.join('');
    } catch (b) {
      return Math.round(2147483647 * Math.random());
    }
  };
  xa_u.g_q_s = function () {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  };
  xa_u.s_c = function (name, value, days = 365) {
    var exp = new Date();
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
  };
  xa_u.g_c = function (name) {
    var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
    if (arr != null) return arr[2];
    return null;
  };
  xa_u.o_t_p = function (obj) {
    var r = [];
    try {
      Object.keys(obj).forEach(function (k) {
        r.push(k + '=' + obj[k]);
      });
    } catch (err) {
      xa_log(err)
    }
    return r.join('&');
  };

  var xa_log = function (e) {
    console && console.error(e)
  }

  var xa_Object_Assign = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

  var g_o = function () {
    return (xa_F_HTTPS ? 'https:' : document.location.protocol) + '//tracking.xiaozao.org';
  };
  var g_xhr = function () {
    var _xhr = null;
    try {
      _xhr = new ActiveXObject('Msxml2.XMLHTTP');
    } catch (e) {
      try {
        _xhr = new ActiveXObject('Microsoft.XMLHTTP');
      } catch (e1) {
        _xhr = new XMLHttpRequest();
      }
    }
    return _xhr;
  };
  var xa_request = function (a, b, c) {
    var e = g_xhr();
    if (!('withCredentials' in e)) return true;
    e.open('POST', a, true);
    e.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    e.onreadystatechange = function (e) {
      4 == e.readyState && (c(e), e = null);
    };
    e.send(b);
    return true;
  };
  var Basic = function () {
    //simple singleton
    if (typeof Basic.instance == 'object') return Basic.instance;
    Basic.instance = this;
    this.data = {
      cid: xa_u.g_c('_xa_cid'),
      uid: null,
      cs: xa_u.g_q_s('cs'),
      an: null,
      aid: null,
      sr: xa_u.g_r(),
      de: document.characterSet,
      sd: window.screen && window.screen.colorDepth,
      vp: xa_u.g_v_s(),
      ul: xa_u.get_l(),
      t: null,
      tmt: xa_tmt,
      cmt: new Date().getTime(),
      ter: xa_u.g_d(),
      app: null,
      ver: VERSION,
      xid: null,
      ua: navigator.userAgent
    };
    this.requires = ['cid', 'tmt', 'cmt', 'ter', 'app', 'ver'];
  };
  Basic.prototype.setData = function (obj) {
    xa_Object_Assign(this.data, obj);
  };
  var PageView = function () {
    if (typeof PageView.instance == 'object') return PageView.instance;
    PageView.instance = this;
    this.data = {
      dl: location.href,
      dh: location.host,
      dp: location.pathname,
      dt: document.title,
      t: 'pageview'
    };
  };
  var Event = function () {
    if (typeof Event.instance == 'object') return Event.instance;
    Event.instance = this;
    this.data = {
      ec: null,
      ea: null,
      el: null,
      ev: null,
      t: 'event'
    };
    this.requires = ['ec', 'el'];
  };
  Event.prototype.setData = function (obj) {
    xa_Object_Assign(this.data, obj);
  };
  var xa_send = function (type, obj, params) {
    try {
      obj = obj || {};
      params = params || [];
      var o = {};
      var parObj = {};
      switch (type) {
        case 'pageview':
          o = new PageView().data;
          break;
        case 'event':
          o = new Event().data;
          for (var i = 0, len = params.length; i < len; i++) {
            parObj['par' + (i + 1)] = params[i];
          }
          break;
        default:
          break;
      }
      var mObj = xa_Object_Assign(new Basic().data, o, obj, parObj);
      new Basic().requires.forEach(function (k) {
        if (!mObj.hasOwnProperty(k)) {
          throw k + ' is required';
        }
      });
      if (type == 'event') {
        new Event().requires.forEach(function (k) {
          if (!mObj.hasOwnProperty(k)) {
            throw k + ' is required';
          }
        });
      }
      Object.keys(mObj).forEach(function (k) {
        mObj[k] = mObj[k] || 'undefined';
        mObj[k] = mObj[k].toString();
        mObj[k] = mObj[k].replace(new RegExp(/&/g), '%26');
      });
      var params = xa_u.o_t_p(mObj);
      xa_request(g_o() + '/collect', params);
    } catch (err) {
      xa_log(err)
    }
  };
  var XA = function (method, type, obj, params) {
    try {
      this.method = method || '';
      this.type = type || '';
      this.obj = obj || {};
      this.params = params || [];
      this.set = function () {
        if (this.type == 'event') new Event().setData(this.obj);
        if (this.type == 'basic') new Basic().setData(this.obj);
      };
      this.send = function () {
        if (this.type == 'pageview') xa_send(this.type, this.obj);
        if (this.type == 'event') xa_send(this.type, this.obj, this.params);
      };
      if (typeof method != 'string') throw 'TypeError: method is not a String';
      if (typeof type != 'string') throw 'TypeError: type is not a String';
      if (Object.prototype.toString.call(this.obj) != '[object Object]') throw 'TypeError: obj is not a Object';
      if (Object.prototype.toString.call(this.params) != '[object Array]') throw 'TypeError: params is not a Array';
      if (typeof this[method] == 'function') this[method]();
      else throw 'Error: ' + method + ' is not a support';
    } catch (err) {
      xa_log(err)
    }
  };

  var r_s_t = function () {
    xa_send('event', {
      ec: 'leave',
      el: 'stay_time'
    }, [new Date().getTime() - xa_tmt]);
  };

  (function () {
    if (!xa_u.g_c('_xa_cid')) xa_u.s_c('_xa_cid', xa_u.g_cid());
    try {
      window.xa && Object.prototype.toString.call(window.xa.q) == '[object Array]' && window.xa.q.forEach(function (v) {
        XA(v[0], v[1], v[2], v[3])
      })
    } catch (err) {
      console && console.error(err)
    }
    window.XiaoZaoAnalyticsObject = 'xa';
    window.xa = XA;
  })();

  (function (history) {
    try {
      history.onpushstate = function () {
        r_s_t();
        xa_tmt = new Date().getTime();
        xa_send('pageview');
      };
      //simple autotrack
      var pushState = history.pushState;
      history.pushState = function () {
        if (typeof history.onpushstate == 'function') {
          history.onpushstate();
        }
        // ... whatever else you want to do maybe call onhashchange e.handler
        return pushState.apply(history, arguments);
      };
    } catch (e) {
      xa_log('autotrack failed')
    }
  })(window.history);

  window.onbeforeunload = function () {
    r_s_t();
  };

})(window);