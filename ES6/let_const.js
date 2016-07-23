'use strict';

// 1 - let



// 1 - let
// 只在代码块里生效, 能消除闭包的影响
// 不存在变量提升
{
    let a = 3;
}
//console.log(a); // 未定义


// 代码块内，使用let命令声明变量之前，该变量都是不可用的。
// 这在语法上，称为“暂时性死区”（temporal dead zone，简称TDZ）
//var tmp = 123;
//
//if (true) {
//    tmp = 'abc'; // ReferenceError
//    let tmp;
//}

/*
function f() { console.log('I am outside!'); }
(function () {
    if(false) {
        // 重复声明一次函数f
        function f() { console.log('I am inside!'); }
    }

    f();
}());
*/


{
    const PI = 3.14;
}

//PI = 2; // 报错, read only

console.log("\u0061");

const arr = [];
arr.push(1);
// arr = []; // error
console.log(arr);