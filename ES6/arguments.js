'use strict';

//将所有参数相加的函数
function add(...x) {
    return x.reduce((m, n) => m + n);
}

console.log(add(1,3,5));
