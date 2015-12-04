/**
 * Created by Administrator on 2015/11/6.
 */
/**
 * 公用工具包
 * */

var EventUtil = {
    addHandler: function (domEle, type, handler) {
        if(domEle.addEventListener) {
            domEle.addEventListener(type, handler, false);
        } else if (domEle.attachEvent) {
            domEle.attachEvent('on' + type, handler);
        } else {
            domEle['on' + type] = handler;
        }
    },
    getEvent: function (event) {
        return event ? event : window.event;
    },
    getTarget: function (event) {
        return event.target || event.srcElement;
    },
    preventDefault: function (event) {
        if(event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    removeHandler: function (domEle, type, handler) {
        if(domEle.removeEventListener) {
            domEle.removeEventListener(type, handler, false);
        } else if (domEle.detachedRuleset) {
            domEle.detachedRuleset('on' + type, handler);
        } else {
            domEle['on' + type] = null;
        }
    },
    stopPropagation: function (event) {
        if(event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
};

/**
 * 日期格式
 * 参数为 "yyyy-MM-dd hh:mm:ss" "yyyy-MM-dd"
 * */
Date.prototype.format = function (fmt) {
    var o = {
        "M+" : this.getMonth()+1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
        "H+" : this.getHours(), //小时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds(), //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S" : this.getMilliseconds() //毫秒
    };
    var week = {
        "0" : "/u65e5",
        "1" : "/u4e00",
        "2" : "/u4e8c",
        "3" : "/u4e09",
        "4" : "/u56db",
        "5" : "/u4e94",
        "6" : "/u516d"
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+
                week[this.getDay()+""]);
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
};

var createXHR = (function () {
    if (typeof XMLHttpRequest != 'undefined') {
        return function () {
            return new XMLHttpRequest();
        };
    } else if (typeof ActiveXObject != 'undefined') {
        return function () {
            if (typeof arguments.callee.activeXString != 'string') {
                var version = ['MSXML2.XHMHttp.6.0','MSXML2.XHMHttp.3.0','MSXML2.XHMHttp'],
                    i, len;
                for (i=0, len=version.length; i < len; i++) {
                    try {
                        new ActiveXObject();
                        arguments.callee.activeXString = version[i];
                        break;
                    } catch (e) {
                        // skip
                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        };
    } else {
        return function () {
            throw new Error('no XHR object available.');
        };
    }
})();