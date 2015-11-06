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