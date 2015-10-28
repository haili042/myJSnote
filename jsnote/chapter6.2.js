/**
 * Created by Administrator on 2015/5/17.
 */
/**
 * ��������ļ���ģʽ
 * */
/*1 ����ģʽ*/
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



/*2 ���캯��ģʽ*/
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



/*3 ԭ��ģʽ*/
function ProtoPerson(){};
ProtoPerson.prototype.name = "protoName";
ProtoPerson.prototype.age = 24;
ProtoPerson.prototype.job = "protoJob";
ProtoPerson.prototype.friends = ["f1","f2"];//ԭ�͵�����: ��������Ҳ����
ProtoPerson.prototype.sayName = function(){
    console.log(this.name);
};
var p4 = new ProtoPerson();
p4.sayName();
console.log(ProtoPerson.prototype.constructor);
console.log(ProtoPerson.prototype);
console.log(Object.getPrototypeOf(p4) === ProtoPerson.prototype);// �ڲ�����=ԭ�Ͷ���
console.log(p4.prototype == ProtoPerson.prototype);//

p4.name = "haili";// ʵ�������ͬ�����ԻḲ�� ԭ�Ͷ����ֵ
console.log(p4.sayName());
delete p4.name;// ɾ����ʵ����������Ժ�, ��ָ���ԭ�Ͷ����ֵ
console.log(p4.sayName());
delete ProtoPerson.prototype.name;// ɾ��ԭ�Ͷ�������Ժ�, ���undefined��
console.log(p4.sayName());

var p4_1 = new ProtoPerson();
p4.friends.push("f3");//����Ҳtmd������.....
console.log(p4.friends);
console.log(p4_1.friends);

/*4 �ۺ�ģʽ*/
function IntergratePerson(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ["f1","f2"];//
}
IntergratePerson.prototype = {// ��������ԭ��ģʽ
    constructor: IntergratePerson,// һ��Ҫ����
    sayName: function(){
        console.log(this.name);
    }
};

var p5 = new IntergratePerson("aaa5",11,"b");
var p6 = new IntergratePerson("aaa6",11,"b");
p5.friends.push("f3");

console.log(p5);
console.log(p6);



/*5 ��̬ԭ��ģʽ*/
/*6 �������캯��ģʽ*/
/*7 ���׹��캯��ģʽ*/

