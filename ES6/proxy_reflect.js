'use strict';

{
    let obj = new Proxy({}, {
        get: function(target, key, receiver) {
            console.log(`getting ${key}`);
            return Reflect.get(target, key, receiver);
        },
        set: function (target, key, value, receiver) {
            console.log(`setting ${key}=${value}`);
            return Reflect.set(target, key, value, receiver);
        }
    });

    obj.count = 1;
    obj.count++;


    let handler = {
        get: function(target, name) {
            if (name === 'prototype') {
                return Object.prototype;
            }
            return 'hello ' + name;
        },
        apply: function (target, thisBinding, args) {
            return args[0];
        },
        construct: function (target, args) {
            return { value: args[1] };
        }
    };

    var fproxy = new Proxy(function(x, y){
        return x + y;
    }, handler);

    fproxy(1, 2); // 1
    new fproxy(1, 2); // {value: 2}
    fproxy.prototype = Object.prototype; // true
    fproxy.foo; // hello foo

}


// get
function createArray(...args) {
    let handler = {
        get: function(target, name, receiver) {
            let index = Number(name);
            if (index < 0) {
                name = String(target.length + index);
            }
            return Reflect.get(target, name, receiver);
        }
    };
    let arr = [];
    arr.push(...args);
    return new Proxy(arr, handler);
}
let arr = createArray('a', 'b', 'c');
console.log(arr[-1]); // c

// 管道
var pipe = (function() {
    return function (value) {
        var stack = [];

        var proxy = new Proxy({}, {
            get: function (target, name, receiver) {
                if (name === 'get') {
                    return stack.reduce((val, fn) => fn(val), value);
                }
                stack.push(global[name]);
                return proxy;
            }
        });
        return proxy;
    };
})();


global.double = n => n * 2;
global.pow    = n => n * n;
global.reverse = n => n.toString().split('').reverse().join('') || 0;
console.log(pipe(3).double.pow.reverse.get);

// set
let validator = {
    set: function (target, name, value) {
        if (name === 'age') {
            if (!Number.isInteger(value)) {
                throw new TypeError('age must be integer');
            }
            if (value > 200) {
                throw new RangeError('age is to big');
            }
        }

        return Reflect.set(target, name, value);
    }
};

let person = new Proxy({}, validator);

person.age = 100;

console.log(person.age); // 100
//person.age = 'young'; // 报错
//person.age = 300; // 报错