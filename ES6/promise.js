'use strict';

// angular promise
/*
var q = require('q');
var deferred = q.defer();
var promise1 = deferred.promise;

let flag = true;
if (flag) {
    deferred.resolve('success');
} else {
    deferred.reject('error');
}
promise1.then((value) => {
    console.log(value);
}, (value) => {
    console.log(value)
});
*/

// ES6 promise
var promise = new Promise((resolve, reject) => {
    let flag = false;

    if (flag) {
        resolve('success');
    } else {
        reject('error');
    }
});

promise
    .then((value) => {
        console.log(value);
    })
    .catch((err) => {
        console.log(err)
    });
