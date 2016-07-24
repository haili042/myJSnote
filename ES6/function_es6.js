'use strict';

/**====================默认参数===================**/
// es5
function hello(x, y) {
    if (typeof y === 'undefined') {
        y = 'World';
    }
    console.log(x, y);
}
hello('hello');

function foo({x, y = 5}) {
    console.log(x, y);
}

foo({}); // undefined, 5
foo({x: 1}); // 1, 5
foo({x: 1, y: 2}); // 1, 2

//将所有参数相加的函数
function add(...x) {
    return x.reduce((m, n) => m + n);
}

console.log(add(1,3,5));


var numbers = [4, 38];
let nn = add(...numbers); // 42
console.log(nn);


let map = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three']
]);

let arr = [...map.keys()]; // [1, 2, 3]
console.log(arr);


// function.name

function fo() {
}
console.log(fo.name);


/**====================箭头函数===================**/
var getTe = () => ({id: 1, text: 2});
console.log(getTe());

const headerAndTail = (head,...tail) => [head, tail];


function fooo() {
    setTimeout(() => {
        console.log(this.iiid);
    });
}
var iiid = 11;
console.log(fooo.apply({iiid: 22}));

/*

function Timer() {
    this.s1 = 0;
    this.s2 = 0;

    setInterval(() => {
        this.s1++;
    }, 1000);

    setInterval(function() {
        this.s2++;
    }, 1000);
}
var timer = new Timer();
setTimeout(() => console.log(timer.s1), 3100);
setTimeout(() => console.log(timer.s2), 3100);
*/


// 箭头函数嵌套, 由于箭头函数没有this, 所以this指向的是外层
let insert = (val) => ({into: (arr) => ({after: (afterVal) => {
    arr.splice(arr.indexOf(afterVal) + 1, 0, val);
    return arr;
}})});

console.log(insert(2).into([1, 3]).after(1));

// pipe
const pipeline = (...func) => val => func.reduce((pre, cur) => cur(pre), val);
const plus1 = a => a + 1;
const mlut2 = a => a * 2;
console.log(pipeline(plus1, mlut2)(5));



/**====================尾递归===================**/

// 普通递归
function factorial(n) {
    if (n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}
var start = new Date().getTime();
var fs = factorial(10); // 120
var end = new Date().getTime();
console.log('factorial cost:' + (end - start) + ', result = ' + fs);

// 尾递归不用向上回溯, 因此效率会更高
function factorial2(n, total) {
    if (n === 1) {
        return total;
    }
    return factorial2(n - 1, total * n);
}
var start2 = new Date().getTime();
var fs2 = factorial2(10, 1); // 120
var end2 = new Date().getTime();
console.log('factorial2 cost:' + (end2 - start2) + ', result = ' + fs2);

// 常规
function fibonacci(n) {
    if (n <= 1) {
        return 1;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log(fibonacci(10));

// 尾递归
function fibonacci2 (n, ac1 = 1, ac2 = 1) {
    if (n <= 1) {
        return ac2;
    }
    return fibonacci2(n - 1, ac2, ac1 + ac2);
}
console.log(fibonacci2(10));




