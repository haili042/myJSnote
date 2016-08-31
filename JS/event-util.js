var FileUtil = {
    addHandler: function (domEle, type, handler) {
        if (domEle.addEventListener) {
            domEle.addEventListener(type, handler, false);
        } else if (domEle.attachEvent) {
            domEle.attachEvent('on' + type, handler);
        } else {
            domEle['on' + type] = handler;
        }
    },
    removeHandler: function(domEle, type, handler) {
        if (domEle.removeEventListener) {
            domEle.removeEventListener(type, handler, false);
        } else if (domEle.detachedRuleset) {
            domEle.detachedRuleset('on' + type, handler);
        } else {
            domEle['on' + type] = null;
        }
    },
    getEvent: function(e) {
        return e ? e : window.event;
    },
    getTarget: function(e) {
        return e.target ? e.target : e.srcElement;
    },
    preventDefault: function(e) {
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    },
    stopPropagation: function(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    }

};


