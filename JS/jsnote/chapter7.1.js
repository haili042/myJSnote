/**
 * Created by Administrator on 2015/5/18.
 */
/**
 * �������ʽ
 * */

/*1 �ݹ�д�� */
console.log("-------------1-----------");

function factorial(num){//�׳�
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
		return arguments.callee(num-1)*num;// ���������Ա�����һ��д��ʱ, factorial = null;ʱ����,�����ϸ�ģʽ�»����
	}
}
var factorial3 = (function f(num){
	if(num <= 1){
		return 1;
	}else{
		return f(num-1)*num;//�������ϸ�ģʽ��Ҳ������, �Ƚϱ���
	}
});
console.log(factorial3(5));



/*2 �հ� */
/**
 * �հ�: �����ķ���ֵ�Ǻ���, ��������Ҫע��
 * ��������:
 * function(){}; �������һ������,
 * ������������: var f = function(num){return num;}; var aa = f(10);
 * Ҳ������������: var f2 = function(num){return num;}(10);// ֱ�ӵ�����, ��ͨ��aa����
 * */
console.log("-------------2-----------");
function createFunction(){
	var result = new Array();
	for(var i = 0; i < 10; i++){
		result[i] = function(){
			return i;// ʵ���϶���10... ��Ȼô, ����������û����
		}
	}
	return result;
}
var s = createFunction();
for(var i = 0; i < s.length; i++){
	console.log(s[i]());// ��Ϊ��������Ԫ�ؾ��Ǻ���, ����ֱ�Ӽ� () ���ü���
}

function createFunction2(){
	var result = new Array();
	for(var i = 0; i < 10; i++){
		result[i] = function(num){// ����һ����������, ��i��Ϊ��������ȥ, �����ͱ�����
			return function(){
				return num;
			};
		}(i);// i��Ϊ����������  , �൱��ǰһ�� (num)
	}
	return result;
}
var s2 = createFunction2();
for(var i = 0; i < s2.length; i++){
	console.log(s2[i]());
}


/*3 this ����*/
console.log("-------------3-----------");
