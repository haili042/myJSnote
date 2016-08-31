// Promise 对象的实现

// 1、promise有三种状态， 等待（pending）、已完成（fulfilled）、已拒绝（rejected）
// 2、 promise的状态只能从“等待”转到“完成”或者“拒绝”，不能逆向转换，同时“完成”和“拒绝”也不能相互转换
// 3、promise必须有一个then方法，而且要返回一个promise，供then的链式调用，也就是可thenable的
// 4、then接受俩个回调(成功与拒绝),在相应的状态转变时触发，回调可返回promise，等待此promise被resolved后，继续触发then链

// 使用方法: 
// var promise = new Promise(function(resolve, reject) {
  // setTimeout(function(){
    // resolve('val')
  // });
// });

// promise.then(onFulfilled,onRejected).then(onFulfilled,onRejected)

var Promise = function(resolver) {
	if (!isFunction(resolver)) {
		throw new TypeError('必须传入一个函数');
	}
	if (!(this instanceof Promise)) {
		return new Promise(resolver);
	}
	
	var promise = this;
	promise._value;
	promise._reason;
	promise._status = PENDING; // 状态是等待
	promise._resolves = [];
	promise._reject = [];
	
	var resolve = function(value){
		//状态转换为FULFILLED 
		//执行then时保存到_resolves里的回调，
		//如果回调有返回值，更新当前_value
	}
	var reject = function(reason){
		//状态转换为REJECTED
		//执行then时保存到_rejects里的回调，
		//如果回调有返回值，更新当前_rejects
	}
	
	resolver(resolve, reject);
};