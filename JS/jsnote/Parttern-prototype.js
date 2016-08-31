
/**
 * 原型模式
 * 本质上是对原型对象的拷贝, 而不影响原型对象
 * */

/**
 * 深度拷贝
 *  */
// myObj 是原型
var myObj = {
    str: 'myString',
    num: 1,
    myArr: [
        30,
        {
            arrStr: 'myArrInnerStr'
        }
    ],
    myObj: {
        innerObj: {
            test: 25
        },
        innerStr: 'myObjInnerStr'
    }
};

// 浅拷贝, 会影响复制的对象
function clone(obj) {
    var res = {}, k;
    for (k in obj) {
        res[k] = obj[k];
    }
    return res;
}

// 深拷贝, 不会影响复制的对象
function deepClone(obj) {
    var newobj = obj.constructor === Array ? [] : {}; // 创建一个新的对象用于复制

    for(var i in obj){
        newobj[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i];
    }
    return newobj;
}
// 浅拷贝
var result = clone(myObj); // 执行复制
result.myObj.innerStr = 'outter'; // 影响被复制对象的值
console.log(myObj); // 此时myObj 也发生了改变

// 深拷贝
var result2 = deepClone(myObj);
result2.myObj.innerStr = 'outter2'; // 不影响被复制对象的值
console.log(myObj);

// ES5 的方法
var result3 = Object.create(myObj);
result3.str = 'stwetaet'; // 不影响被复制对象的值
result3.myObj.innerStr = 'outter3'; // 影响被复制对象的值!!!!
console.log(myObj);


