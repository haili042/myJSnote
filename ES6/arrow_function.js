'use strict';

// arrow function in array api
var arr = [6, 4, 5, 8, 22];
var result1 = arr.filter((v, k) => v > 6);
var result2 = arr.map((v, k) => v + 1);
var result3 = arr.reduce((pre, cur, i, arr) => {
    console.log('i=' + i + ' , pre=' + pre + ', cur=' + cur);
    return cur + pre;
});
var result4 = arr.sort((v1, v2) => v2 - v1);

console.log(result1);
console.log(result2);
console.log(result3);
console.log(result4);


// complicated example
var person = {
    name: 'haili',
    sex: 'male',
    age: 25,
    sayHi: function() {
        console.log(this.name);

        foo(() => {
            console.log(this.name + ' say hi');
        });
    }
};
var foo = function(func) {
    func();
};
person.sayHi();