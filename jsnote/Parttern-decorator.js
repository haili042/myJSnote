/**
 * 装饰者模式
 * 类似继承, 不会影响原对象
 **/
var House = function() {

};
House.prototype.decorate= function() {
    console.log('空房子');
};

var Decorator = function(house) {
    this.house = house;
};
// 重写了 decorate 方法
Decorator.prototype.decorate = function() {
    this.house.decorate();
    console.log('添加了一个家具');
};
var house = new House();
var decorator = new Decorator(house);
decorator.decorate();

/**
 * 简单实现2
 * */
function vehicle( vehicleType ){
    // some sane defaults
    this.vehicleType = vehicleType || "car";
    this.model = "default";
    this.license = "00000-000";
}

var testInstance = new vehicle( "car" );
console.log( testInstance ); // vehicle: car, model:default, license: 00000-000

// 扩展对象
var truck = new vehicle( "truck" ); // 创造一个truck 给装饰者扩展
truck.setModel = function( modelName ){
    this.model = modelName;
};
truck.setColor = function( color ){
    this.color = color;
};
truck.setModel( "CAT" );
truck.setColor( "blue" );
console.log( truck ); // vehicle:truck, model:CAT, color: blue
// 扩展对象 end

var secondInstance = new vehicle( "car" );
console.log( secondInstance );//没发生改变,  vehicle: car, model:default, license: 00000-000


/**
 * 伪经典装饰者
 * */
var reminder = new Interface( "List", ["summary", "placeOrder"] );
// 定义好配置文件
var properties = {
    name: "Remember to buy the milk",
    date: "05/06/2016",
    actions:{
        summary: function (){
            return "Remember to buy the milk, we are almost out!";
        },
        placeOrder: function (){
            return "Ordering milk from your local grocery store";
        }
    }
};

// 根据配置拓展功能
function Todo( config ){
    // 检查是否存在功能
    // ...

    Interface.ensureImplements( config.actions, reminder );
    this.name = config.name;
    this.methods = config.actions;
}
var todoItem = Todo( properties );

/**
 * JQuery 的装饰者
 * */
$.extend({}, defaults, options);