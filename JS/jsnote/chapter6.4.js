/**
 * Created by Administrator on 2015/5/17.
 */
/**
 * ´«²ÎÎª function ²âÊÔ
 * */
var obj = {
    name : "objName",
    func : function(data){
        console.log("obj function : " + data);
    }
};

function SuperType(name,object){
    this.name = name;
    this.object = object;
}

SuperType.prototype.sayName = function (operation){
    var that = operation;
    sayObjcet({
        name : "objName 2",
        func : function(data){
            operation();
        }
    });
    return that.name + this.name;
};

function sayObjcet(obj){

    console.log("obj's function is " + obj.name);
}

//function SubType(name, age){
//    SuperType.call(this, name);
//    this.age = age;
//}
//SubType.prototype = new SuperType();
//SubType.constructor = SubType;


function operation1(obj){
    console.log("operation1 ");
    return obj;
}


var sup = new SuperType("super",23);
console.log(sup.sayName(function(obj){
    console.log("operation1 ");
    return obj;
}(sup)));