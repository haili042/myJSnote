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
            event.returnValue = false;
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

/*
var createXHR = function() {
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject !== 'undefined') {
        var version = 'Microsoft.XMLHTTP';
        return new ActiveXObject(version);
    } else {
        throw new Error('no xhr available');
    }
};

var xhr = createXHR();
var url = '';

xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
            //callback(xhr.responseText);
        } else {
            throw new Error('Requset was unsuccessful : ' + xhr.status);
        }
    }
};

xhr.open('get', url, true);
xhr.send(null);
*/


/**
 * 深度克隆: 完全创建新对象
 * 浅克隆: 复制对象的引用
 * */
var arr = [1,2,43];
var json = {a:6,b:4,c:[1,2,3]};
var str = 'sdfsdf';

function clone(obj) {
    var newObj = new obj.constructor(obj.valueOf());

    if (obj.constructor == Object) {

        for (var i in obj) {
            newObj[i] = obj[i];

            if (typeof newObj[i] == 'object') {
                clone(newObj[i]);
            }
        }
    }
    return newObj;
}
var json1 = clone(json);
console.log(json1 === json);
json1.a = 1000;
console.log(json);


function clone2 (obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    var newO = obj instanceof Array ? [] : {};
    for (var key in obj) {
        var val = obj[key];
        newO[key] = typeof val === 'object' ? arguments.callee(val) : val;
    }
    return newO;
}
var json2 = clone2(json);
json2.a = 2000;
console.log(json);

Function.prototype.bind = Funciton.prototype.bind || function(context) {
    var args = Array.prototype.slice.call(arguments, 1),
        that = this;
    return function() {
        var innerArgs = Array.prototype.slice.call(arguments);
        var outerArgs = args.concat(innerArgs);
        return that.apply(context, outerArgs);
    };
};