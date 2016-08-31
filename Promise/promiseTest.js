/*
var p1 = new Promise(function(resolve, reject) {

    setTimeout(function() {
        resolve(1);
    }, 500);
});

p1.then(function(res) {
    if (res == 1) {
        console.log(res);
        return new Promise(function(resolve) {
            setTimeout(function() {
                resolve(11);
            }, 1000);
        });
    }
    return res;
}).then(function(res) {
    console.log(res);
});

p1.then(() => {

    return new Promise(function(resolve, reject) {

        setTimeout(function() {
            resolve(2);
        }, 500);
    });

}).then(function(res) {

    if (res == 2) {
        console.log(res);
        return new Promise(function(resolve) {
            setTimeout(function() {
                resolve(22);
            }, 1000);
        }).then(function(res) {
            console.log(res);
        });
    }

    return res;
});
*/


function genPromise(config) {


    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(config);
        }, 500);
    }).then((res) => {
        console.log(res);
        return new Promise(function(resolve) {
            setTimeout(function() {
                resolve(res + 10);
            }, 500);
        });
    }).then((res) => {
        console.log(res);
    });
}


var arr = [1, 2, 3];
var p = genPromise('init');
arr.reduce((pre, cur, i, array) => {

    return pre.then((res) => {
        return genPromise(cur);
    });

}, p);



