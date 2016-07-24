'use strict';

let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();


// next 返回 { value: 'a', done: false } 结构
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next()); // { value: undefined, done: true }


// case 1
class RangeIterator {
    constructor(start, stop) {
        this.value = start;
        this.stop = stop;
    }

    // 部署 Symbol.iterator 属性
    [Symbol.iterator]() {
        return this;
    }

    // 配置 next 方法
    next() {
        var value = this.value;
        if (value < this.stop) {
            this.value++;
            return { done: false, value: value };
        } else {
            return { done: true, value: undefined };
        }
    }
}
function range(start , stop) {
    return new RangeIterator(start, stop);
}

for (let value of range(0, 3)) {
    console.log(value);
}

// case 2
let obj = {
    data: [ 'hello', 'world' ],
    [Symbol.iterator]() {
        let index = 0;
        let next = () => {
            if (index < this.data.length) {
                return { done: false, value: this.data[index++] };
            } else {
                return { done: true };
            }
        };

        return { next };
    }
};
// way 1 to cycle
for (let data of obj) {
    console.log(data);
}

// way 2 to cycle
let $iterator = obj[Symbol.iterator]();
let $res = $iterator.next();
while(!$res.done) {
    console.log($res.value);
    $res = $iterator.next();
}



//generator and iterator
let gen1 = function* () {
    yield 1;
    yield [2, 3, 4];
    yield* [5, 6];
    yield 7;
};
let gg = gen1();
for (let n of gg) {
    console.log(n);
}
//1
//[ 2, 3, 4 ]
//5
//6
//7


// generator 2
var oo = { a: 1, b: 2, c: 3 };
function* gen2(oo) {
    for (let k in oo) {
        if (oo.hasOwnProperty(k)) {
            yield [k, oo[k]];
        }
    }
}
let oog = gen2(oo);
for (let [k, v] of oog) {
    console.log(`key: ${k}, value:${v}`);
}

// generator3
var myIteartor = {};
myIteartor[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    return 3;
};
console.log([...myIteartor]); // [1, 2]


// yield 将gen3 分成了3块, 由next触发每块的执行
function* gen3(){
    console.log('gen3 part1');
    yield 1;
    console.log('gen3 part2');
    yield 2;
    console.log('gen3 part3');
    yield 3;
}
let g3 = gen3(); // 什么都不执行
g3.next(); // 执行第1部分 'gen3 part1'
g3.next(); // 执行第2部分 'gen3 part2'
g3.next(); // 执行第3部分 'gen3 part3'


// yield*
// generator 嵌套
function* foo() {
    yield 1;
    yield 2;
}
function* bar() {
    yield* foo();
    yield 3;
    yield 4;
}
for (let v of bar()){
    console.log(v);
}
// 1
// 2
// 3
// 4

function* f1() {
    yield* gen1();

    // 等同于
    for (let v of gen1()) {
        yield v;
    }

    // 数组支持iterator
    yield* ["a", "b", "c"];

    // 等同于
    yield 'a';
    yield 'b';
    yield 'c';
}

// 无限的状态机
var clock = function* () {
    while(true) {
        console.log('tick');
        yield;
        console.log('tock');
        yield;
    }
};
let c = clock();
c.next();
c.next();
c.next();
c.next();
c.next();
c.next();

