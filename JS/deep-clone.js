
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
