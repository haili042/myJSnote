/**
 * Created by Administrator on 2015/5/17.
 */
/**
 * �̳еļ���ģʽ
 * */
/*1 ԭ����, ���Ǿ����������͵�����*/
//����
function SuperType(){
    this.superName = "superName";
}

SuperType.prototype = {
    constructor: SuperType,
    getSuperName: function(){
        return this.superName;
    }
};

//����
function SubType(){
    this.subName = "subName";
}

SubType.prototype = new SuperType();//�̳���ԭ����; ��һ��Ҫ����ӻ��滻ԭ�����֮ǰ, ���������Ͷ���


// ����ʹ������������·���, �����൱������������һ�������Ƹ���, ��ʹ����һ�����ʧЧ
//SubType.prototype = {
//    // ��������·���
//    getSubName: function(){
//        return this.subName;
//    },
//    //������д���෽��, �������ʾδ����....
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
console.log(Object.getPrototypeOf(Object.getPrototypeOf(ins)) == SuperType.prototype);// ע������, �������p163��
console.log(SubType.prototype == SuperType.prototype);



/*2 ���ù��캯��, �������ڹ��캯����д, �����Բ�*/
function SuperType1(name){
    this.name = name;
    this.color = ["green", "red"];
}

function SubType1(name, age){
    SuperType1.call(this, name);//�̳�, ��������������, �������˲���
    this.age = age;
}

var ins1_1 = new SubType1("haili",21);
ins1_1.color.push("blue");// �������Ա����������͵�����
console.log(ins1_1);
var ins1_2 = new SubType1("haobi",22);
console.log(ins1_2);



/*3 ��ϼ̳�, ��������θ���Ĺ��캯��*/
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
    SuperType2.call(this, name);//�̳�, ��������������, �������˲���, �ڶ��ε���
    this.age = age;
}
SubType2.prototype = new SuperType2();// ��һ�ε���
SubType2.prototype.constructor = SubType2;//�ǵü��Ϲ��캯��
SubType2.prototype.sayAge = function(){
    console.log("say " + this.age);
};
SubType2.prototype.sayName = function(){
    console.log("say " + this.name);
    return this.name + "(changed)";
};

var ins3_1 = new SubType2("haili",21);
ins3_1.color.push("blue");// �������Ա����������͵�����
ins3_1.sayName();
console.log(ins3_1);
var ins3_2 = new SubType2("haobi",22);
ins3_2.sayAge();
console.log(ins3_2);
console.log(Object.getPrototypeOf(Object.getPrototypeOf(ins3_1)) == SuperType2.prototype);
ins3_1.sayColor();
var ins3_3 = new SuperType2("super");
ins3_3.sayColor();


/*4 ������ϼ̳�, ��������, ����Ҳ������, ����������д���෽��ʱ, ����ķ���Ҳ�ᱻ����, �����ʽ�Ͳ������������*/
console.log("--------4----------");
function inherit(subType, superType){
    var prototype = Object(superType.prototype);//��������ԭ�Ͷ���, �� new Object(superType.prototype)һ��, ���� superType.prototype����
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
inherit(SubType4, SuperType4);//�̳�
SubType4.prototype.sayAge = function(){
    console.log("say " + this.age);
};
SubType4.prototype.sayName = function(){
    return this.name + "(changed)";
};


var ins4_1 = new SubType4("haili",21);
ins4_1.color.push("blue");// �������Ա����������͵�����
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


