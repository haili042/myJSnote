/*

// 我们的目标是达成以下写法

var promise = new Promise(function(resolve, reject) {
    setTimeout(resolve, 100);
});

promise.then(function() { console.log('success') }, function() { console.log('error') })

*/

function MyPromise(fn) {

    var doneList = [];
    var failList = [];
    var state = 'pending';

    /**
     * 为了实现链式操作, 所以必须保存每一个 then 里的回调函数
     * */
    this.then = function(resolveFn, rejectFn) {

        switch(state) {
            case 'pending':
                doneList.push(resolveFn);
                failList.push(rejectFn || null); // null 占位
                break;

            case 'fulfilled':
                resolveFn();
                break;

            case 'rejected':
                rejectFn();
                break;
        }
        return this;
    };

    /**
     * resolve 函数
     * */
    function resolve(newValue) {

        // 改变状态
        state = 'fulfilled';

        // 这里promise里面如果是同步的函数的话，doneList里面还是空的，
        // 所以可以加个setTimeout来将这个放到js的最后执行。这里主要是参照了promiseA+的规范，就像这样
        setTimeout(function() {
            var value = newValue;
            for (var i = 0; i < doneList.length; i++) {
                var temp = doneList[i](value);

                // 如果 then 里返回的也是一个promise 对象
                if (temp instanceof MyPromise) {
                    var newP = temp;

                    // 从下一个回调函数开始执行
                    for (i++; i < doneList.length; i++) {
                        newP.then(doneList[i], failList[i]);
                    }
                } else {
                    value = temp;
                }
            }
            doneList.forEach(function(fulfill, i) {
                fulfill(value);
            });
        }, 0);
    }


    // reject 函数
    function reject(newValue) {

        // 改变状态
        state = 'rejected';

        setTimeout(function() {
            var value = newValue;
            var tempRe = failList[0](value);

            // 如果是一个 promise对象, 那么执行当前 fail 之后, 将剩余的 done 和 fail 传给新 promise
            if (tempRe instanceof MyPromise) {
                var newP = tempRe;

                for (i < 1; i < doneList; i++) {
                    newP.then(doneList[i], failList[i]);
                }
            } else {
                // 如果不是 promise 执行当前 fail 之后继续执行 doneList
                value = tempRe;
                doneList.shift();
                failList.shift();
                resolve(value);
            }
        }, 0);

    }


    fn(resolve, reject);
}

var pro = new MyPromise(function(resolve, reject) {
    setTimeout(function() {
        resolve('sucec');
    }, 2000);
});

pro.then(function(value){ console.log(value); }).then();