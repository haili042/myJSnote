'use strict';

/**
 * 解构
 * */

/**====================数组解构===================**/
/*
var a = 1;
var b = 2;
var c = 3;
*/

let [a, c] = [1, 3];
console.log(a, c); // 1 3

let [e, ...f] = [1, 2, 3, 4];
console.log(e, f); // 1 [ 2, 3, 4 ]

// const [foo] = {'foo'}; // error
const {foo} = ['foo']; // foo

/**====================默认值===================**/
const [one = 1, two = 2] = [3, null];
console.log(one, two);

function ff() {
    console.log('aaa');
}

let [xf = ff()] = [1]; // ff() 不执行

/**====================对象解构===================**/
let {fooo: fzz, goo} = {fooo: 1, goo: 2};
console.log(fzz, goo); // 1 2

var obj = {
    p: [
        'hello',
        {
            y: 'world'
        }
    ]
};
var {p: [x, { y }]} = obj;
console.log(x, y); // p 没定义


const {ass: bbb = 1} = {};
console.log(bbb); // 默认值

let {cos, sin} = Math;
console.log(cos(10));

var arr = [1, 2, 3];
var {0 : first1, [arr.length - 1]: last1} = arr;
console.log(first1, last1);


/**====================字符串解构===================**/
const [xx] = 'asdf';
console.log(xx);

/**====================函数参数解构===================**/
function add([x, y]) {
    console.log(arguments);
    return x + y;
}
console.log(add([1 ,2]));

let arra = [[1, 2], [3, 4]].map(([a, b], i) => a + b + i);
console.log(arra);

// 参数默认值
function move({x = 0, y = 0}) {
    return [x, y];
}
let pos = move({x: 22, y: 23});
pos = move({x: 22});
console.log(pos);


/**====================用途===================**/
// 遍历map
let map = new Map();
map.set('frist', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
    console.log(`${key} ${value}`);
}