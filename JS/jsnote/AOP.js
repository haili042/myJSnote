
// AOP
// promise 也常用

// 比如要实现统计每个函数的执行时间,
// 肯定不能每个函数都加上这些代码, 所以需要AOP
// function test() {
	// var start = new Date(), end;
	// // ...
	// end = new Date();
	// console.log(start - end);
// }

// 原函数
function test() {
	console.log(2);
	return 'test return value';
}

	
Function.prototype.before = function(fn) {
	var __self = this;
	fn();
	return __self.apply(this, arguments);
};	
Function.prototype.after = function(fn) {
	var __self = this;
	__self.apply(this, arguments);	// after 先执行原函数
	fn();
};	

// 改进型
// 通过在 Function.prototype 上绑定方法
// before 回调和 before 一起送到 after 去
Function.prototype.before1 = function(fn) {
	var __self = this; // __self 是 test

	return function() { // 因为是绑定到 Function.prototype 上, 所以这个函数可以调用 after方法
		var result;
		
		// 权限校验
		if (fn.apply(__self, arguments) == false) { 
			return false;
		}
		result = __self.apply(__self, arguments); // __self 是 test
		return result; // 返回 test 的 return
	};
};
// after 回调和 after 一起送到 before 去
Function.prototype.after1 = function(fn) {
	var __self = this;
	
	return function() {
		var result = __self.apply(__self, arguments);
		
		// 之前未完成则返回
		if (result == false) {
			return false;
		}
		fn.apply(__self, arguments); // 先执行 bofore
		return result;
	};
};


test.before(function() {
	console.log(1);
});
test.after(function() {
	console.log(3);
});
// 输出 1 2 2 3 默认函数被调用了2次
console.log('\n\n\n\n');


// 改进后, 级联操作
var t = test.before1(function() { // test.before1() 执行后返回的是一个函数, 可以调用 after1函数
	console.log(1);
	//return false;
}).after1(function() { // after 中的 __self = this 是 test.before1 返回的函数, 以此类推
	console.log(3);
}).before1(function() {
	console.log(0);
}).after1(function() {
	console.log(4);
	//return false;
})(); // 输出0 1 2 3 4, 默认函数被调用了1次

console.log(t + '\n\n\n\n'); // 输出 'test return value' ,test 的返回值也可以用 


// diy
function Test(name) {
	this.name = name;
}
Test.prototype = {
	doing: function(fn) {
		this.fn = fn;
		return this;
	},
	before: function(fn) {
		fn();
		this.fn();
		return this;
	},
	after: function(fn) {
		this.fn();
		fn();
		return this;
	}
};
var t = new Test('promise');

t.doing(function() {
	console.log(2);
})
.before(function() {
	console.log(1);
})
.after(function() {
	console.log(3);
});



