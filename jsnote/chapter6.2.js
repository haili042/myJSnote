/**
 * Created by Administrator on 2015/5/17.
 */
/**
 * 创建对象的几种模式
 * */
/*1 工厂模式*/
function objFactory(name, age, job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        console.log(this.name);
    };
    return o;
}
var p1 = objFactory("aaa1",10,"a");
p1.sayName();



/*2 构造函数模式*/
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function(){
        console.log(this.name);
    };
}
var p2 = new Person("aaa2",11,"b");
var p3 = new Person("aaa3",11,"b");
p2.sayName();
p3.sayName();
console.log(p2.constructor);
console.log(p2.sayName() === p3.sayName());
console.log(p2.prototype == Person.prototype);



/*3 原型模式*/
function ProtoPerson(){};
ProtoPerson.prototype.name = "protoName";
ProtoPerson.prototype.age = 24;
ProtoPerson.prototype.job = "protoJob";
ProtoPerson.prototype.friends = ["f1","f2"];//原型的问题: 引用类型也共享
ProtoPerson.prototype.sayName = function(){
    console.log(this.name);
};
var p4 = new ProtoPerson();
p4.sayName();
console.log(ProtoPerson.prototype.constructor);
console.log(ProtoPerson.prototype);
console.log(Object.getPrototypeOf(p4) === ProtoPerson.prototype);// 内部属性=原型对象
console.log(p4.prototype == ProtoPerson.prototype);//

p4.name = "haili";// 实例对象的同名属性会覆盖 原型对象的值
console.log(p4.sayName());
delete p4.name;// 删除该实例对象的属性后, 会恢复到原型对象的值
console.log(p4.sayName());
delete ProtoPerson.prototype.name;// 删除原型对象的属性后, 变成undefined了
console.log(p4.sayName());

var p4_1 = new ProtoPerson();
p4.friends.push("f3");//这里也tmd共享了.....
console.log(p4.friends);
console.log(p4_1.friends);

/*4 综合模式*/
function IntergratePerson(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ["f1","f2"];//
}
IntergratePerson.prototype = {// 字面量的原型模式
    constructor: IntergratePerson,// 一定要加上
    sayName: function(){
        console.log(this.name);
    }
};

var p5 = new IntergratePerson("aaa5",11,"b");
var p6 = new IntergratePerson("aaa6",11,"b");
p5.friends.push("f3");

console.log(p5);
console.log(p6);



/*5 动态原型模式*/
/*6 寄生构造函数模式*/
/*7 稳妥构造函数模式*/

