/**
 * Created by Administrator on 2015/5/17.
 */
/**
 * 继承的几种模式
 * */
/*1 原型链, 还是具有引用类型的问题*/
//父类
function SuperType(){
    this.superName = "superName";
}

SuperType.prototype = {
    constructor: SuperType,
    getSuperName: function(){
        return this.superName;
    }
};

//子类
function SubType(){
    this.subName = "subName";
}

SubType.prototype = new SuperType();//继承了原型链; 这一句要在添加或替换原型语句之前, 否则链条就断了


// 不能使用字面量添加新方法, 这样相当于重新生成了一个对象复制给他, 会使得上一个语句失效
//SubType.prototype = {
//    // 子类添加新方法
//    getSubName: function(){
//        return this.subName;
//    },
//    //子类重写父类方法, 否则会提示未定义....
//    getSuperName: function(){
//        return "no defined";
//    }
//};

SubType.prototype.getSuperName = function(){
  return this.superName;
};

SubType.prototype.getSubName = function(){
  return this.subName;
};

var ins = new SubType();
console.log(ins.getSuperName());
console.log(ins.getSubName());
console.log(Object.getPrototypeOf(Object.getPrototypeOf(ins)) == SuperType.prototype);// 注意这里, 结合书上p163看
console.log(SubType.prototype == SuperType.prototype);



/*2 借用构造函数, 方法都在构造函数里写, 复用性差*/
function SuperType1(name){
    this.name = name;
    this.color = ["green", "red"];
}

function SubType1(name, age){
    SuperType1.call(this, name);//继承, 父类调用这个方法, 还传递了参数
    this.age = age;
}

var ins1_1 = new SubType1("haili",21);
ins1_1.color.push("blue");// 这样可以避免引用类型的问题
console.log(ins1_1);
var ins1_2 = new SubType1("haobi",22);
console.log(ins1_2);



/*3 组合继承, 会调用两次父类的构造函数*/
console.log("--------3----------");

function SuperType2(name){
    this.name = name;
    this.color = ["green", "red"];
}

SuperType2.prototype.sayName = function(){
    console.log("say " + this.name);
    return this.name;
};
SuperType2.prototype.sayColor = function(){
    console.log(this.sayName() + "say " + this.name);
};

function SubType2(name, age){
    SuperType2.call(this, name);//继承, 父类调用这个方法, 还传递了参数, 第二次调用
    this.age = age;
}
SubType2.prototype = new SuperType2();// 第一次调用
SubType2.prototype.constructor = SubType2;//记得加上构造函数
SubType2.prototype.sayAge = function(){
    console.log("say " + this.age);
};
SubType2.prototype.sayName = function(){
    console.log("say " + this.name);
    return this.name + "(changed)";
};

var ins3_1 = new SubType2("haili",21);
ins3_1.color.push("blue");// 这样可以避免引用类型的问题
ins3_1.sayName();
console.log(ins3_1);
var ins3_2 = new SubType2("haobi",22);
ins3_2.sayAge();
console.log(ins3_2);
console.log(Object.getPrototypeOf(Object.getPrototypeOf(ins3_1)) == SuperType2.prototype);
ins3_1.sayColor();
var ins3_3 = new SuperType2("super");
ins3_3.sayColor();


/*4 寄生组合继承, 堪称完美, 但是也有问题, 比如子类重写父类方法时, 父类的方法也会被覆盖, 而组合式就不会有这个问题*/
console.log("--------4----------");
function inherit(subType, superType){
    var prototype = Object(superType.prototype);//创建父类原型对象, 与 new Object(superType.prototype)一样, 返回 superType.prototype类型
    prototype.constructor = subType;
    subType.prototype = prototype;
}

function SuperType4(name){
    this.name = name;
    this.color = ["red","green"];
}
SuperType4.prototype.sayName = function(){
    console.log("say " + this.name);
    return this.name;
};
SuperType4.prototype.sayColor = function(){
    console.log(this.sayName() + " 's color is" + this.color);
};


function SubType4(name,age){
    SuperType4.call(this, name);
    this.age = age;
}
inherit(SubType4, SuperType4);//继承
SubType4.prototype.sayAge = function(){
    console.log("say " + this.age);
};
SubType4.prototype.sayName = function(){
    return this.name + "(changed)";
};


var ins4_1 = new SubType4("haili",21);
ins4_1.color.push("blue");// 这样可以避免引用类型的问题
ins4_1.sayName();
console.log(ins4_1);
var ins4_2 = new SubType4("haobi",22);
ins4_2.sayAge();
console.log(ins4_2);
console.log(Object.getPrototypeOf(Object.getPrototypeOf(ins4_1)) == SuperType4.prototype);
console.log(Object.getPrototypeOf(ins4_1) == SuperType4.prototype);

ins4_1.sayColor();

var ins4_3 = new SuperType4("suepr");
ins4_3.sayColor();


