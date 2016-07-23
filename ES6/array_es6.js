'use strict';

let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

let newArray = Array.from(arrayLike);
console.log(Array.isArray(newArray));

for (let [v, k] of newArray.entries()) {
    console.log(k, v);
}

for (let v of newArray.keys()) {
    console.log(v);
}

let a = new Array(4).fill(8);
console.log(a);

console.log([1, 4, -5, 10].find((n) => n < 0));
console.log([1, 4, -5, 10].findIndex((n) => n < 0));
console.log([1, 4, -5, 10].includes(1));