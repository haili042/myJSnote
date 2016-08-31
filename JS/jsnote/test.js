/**
 * Created by Administrator on 2016/2/22.
 */
function foo() {}
console.log(Object instanceof Object);//true
console.log(Function instanceof Function);//true
console.log(Number instanceof Number);//false
console.log(String instanceof String);//false
console.log(Function instanceof Object);//true
console.log(Object instanceof Object);
console.log(typeof Object);
console.log(foo instanceof foo);
console.log("*********");

console.log(Object);

setTimeout(function() {
    console.log(this); // 这个this 是 window 对象, 由于这是 node 环境, 所以木有 window 对象
}, 1000);

var a = {
    run: function(){
        return  function runFast(){
            console.log(this);
        };
    }
};
a.run()(); // global