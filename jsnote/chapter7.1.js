/**
 * Created by Administrator on 2015/5/18.
 */
/**
 * 函数表达式
 * */

/*1 递归写法 */
console.log("-------------1-----------");

function factorial(num){//阶乘
	if(num <= 1){
		return 1;
	}else{
		return factorial(num-1)*num;
	}
}
function factorial2(num){
	if(num <= 1){
		return 1;
	}else{
		return arguments.callee(num-1)*num;// 这样做可以避免上一种写法时, factorial = null;时出错,但是严格模式下会出错
	}
}
var factorial3 = (function f(num){
	if(num <= 1){
		return 1;
	}else{
		return f(num-1)*num;//这样就严格模式下也能用了, 比较保险
	}
});
console.log(factorial3(5));



/*2 闭包 */
/**
 * 闭包: 函数的返回值是函数, 作用域需要注意
 * 匿名函数:
 * function(){}; 本身就是一个对象,
 * 可以这样调用: var f = function(num){return num;}; var aa = f(10);
 * 也可以这样调用: var f2 = function(num){return num;}(10);// 直接调用了, 不通过aa调用
 * */
console.log("-------------2-----------");
function createFunction(){
	var result = new Array();
	for(var i = 0; i < 10; i++){
		result[i] = function(){
			return i;// 实际上都是10... 显然么, 函数作用域还没结束
		}
	}
	return result;
}
var s = createFunction();
for(var i = 0; i < s.length; i++){
	console.log(s[i]());// 因为本身数组元素就是函数, 所以直接加 () 调用即可
}

function createFunction2(){
	var result = new Array();
	for(var i = 0; i < 10; i++){
		result[i] = function(num){// 创建一个匿名函数, 将i作为参数传回去, 这样就避免了
			return function(){
				return num;
			};
		}(i);// i作为参数传进来  , 相当于前一个 (num)
	}
	return result;
}
var s2 = createFunction2();
for(var i = 0; i < s2.length; i++){
	console.log(s2[i]());
}


/*3 this 对象*/
console.log("-------------3-----------");
