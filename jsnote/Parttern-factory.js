/**
 * 工厂模式
 * 一个创建对象的接口, 实例化的类型可以由子类决定
 * */

/**
 * 简单工厂
 * */
var factory = {};
factory.makeColoth = function (arg) {
    this.woker = 50;
    console.log('工厂人数' + this.woker);
}
factory.makeShoose = function () {
    console.log('产鞋子');

}
factory.transport = function () {
    console.log('运输');

}
factory.changzhang = function (arg) {

    // 工厂是单例的, 构造函数模式
    return new factory[arg]();
};

var me = factory.makeColoth('makeCloth');


// A constructor for defining new cars
function Car(options) {
    // some defaults
    this.doors = options.doors || 4;
    this.state = options.state || "brand new";
    this.color = options.color || "silver";
}

// A constructor for defining new trucks
function Truck(options) {
    this.state = options.state || "used";
    this.wheelSize = options.wheelSize || "large";
    this.color = options.color || "blue";
}

// Define a skeleton vehicle factory
function VehicleFactory() {
}
VehicleFactory.prototype.vehicleClass = Car; // 默认为Car
VehicleFactory.prototype.createVehicle = function (options) { // 工厂实现
    if (options.vehicleType === "car") {
        this.vehicleClass = Car;
    } else {
        this.vehicleClass = Truck;
    }
    // 单例的, 需要new
    return new this.vehicleClass(options);
};

// Create an instance of our factory that makes cars
var carFactory = new VehicleFactory();
var car = carFactory.createVehicle({
    vehicleType: "car",
    color: "yellow",
    doors: 6
});

console.log(car instanceof Car); // true
console.log(car); // Car object of color "yellow", doors: 6 in a "brand new" state


/**
 * 抽象工厂
 * 只允许创造符合条件的类
 * */
var AbstractVehicleFactory = (function () {
    // Storage for our vehicle types
    var types = {};

    return {
        getVehicle: function (type, customizations) {
            var Vehicle = types[type];

            return (Vehicle ? new Vehicle(customizations) : null);
        },
        registerVehicle: function (type, Vehicle) {
            var proto = Vehicle.prototype;

            // 只注册满足协议的类
            if (proto.drive && proto.breakDown) {
                types[type] = Vehicle;
            }
            return AbstractVehicleFactory;
        }
    };
})();

AbstractVehicleFactory.registerVehicle("car", Car);
AbstractVehicleFactory.registerVehicle("truck", Truck);

// 根据抽象类型初始化
var car = AbstractVehicleFactory.getVehicle("car", {
    color: "lime green",
    state: "like new"
});

// 根据抽象类型初始化
var truck = AbstractVehicleFactory.getVehicle("truck", {
    wheelSize: "medium",
    color: "neon yellow"
});
