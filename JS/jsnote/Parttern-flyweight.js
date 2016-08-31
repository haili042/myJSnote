/**
 * 享元模式
 * 共享内存中的数据, 达到节省内存
 **/
// 模拟虚拟条件
Function.prototype.implementsFor = function (parent) {
    if (parent.constructor === Function) {

        // 正常继承
        this.prototype = new parent();
        this.prototype.constructor = this;
        this.prototype.parent = parent.prototype;
    } else {

        // 纯虚拟继承
        this.prototype = parent;
        this.prototype.constructor = this;
        this.prototype.parent = parent;
    }
    return this;
};

// Flyweight object
var CoffeeOrder = {

    // Interfaces
    serveCoffee:function(context){},
    getFlavor:function(){}

};

// ConcreteFlyweight object that creates ConcreteFlyweight
// Implements CoffeeOrder
function CoffeeFlavor( newFlavor ){

    var flavor = newFlavor;

    // If an interface has been defined for a feature
    // implement the feature
    if( typeof this.getFlavor === "function" ){
        this.getFlavor = function() {
            return flavor;
        };
    }

    if( typeof this.serveCoffee === "function" ){
        this.serveCoffee = function( context ) {
            console.log("Serving Coffee flavor "
                + flavor
                + " to table number "
                + context.getTable());
        };
    }

}

// Implement interface for CoffeeOrder
CoffeeFlavor.implementsFor( CoffeeOrder );

// Handle table numbers for a coffee order
function CoffeeOrderContext( tableNumber ) {
    return{
        getTable: function() {
            return tableNumber;
        }
    };
}

function CoffeeFlavorFactory() {
    var flavors = {},
        length = 0;

    return {
        getCoffeeFlavor: function (flavorName) {

            var flavor = flavors[flavorName];
            if (flavor === undefined) {
                flavor = new CoffeeFlavor(flavorName);
                flavors[flavorName] = flavor;
                length++;
            }
            return flavor;
        },

        getTotalCoffeeFlavorsMade: function () {
            return length;
        }
    };
}

// Sample usage:
// testFlyweight()

function testFlyweight(){

    // The flavors ordered.
    var flavors = new CoffeeFlavor(),

    // The tables for the orders.
        tables = new CoffeeOrderContext(),

    // Number of orders made
        ordersMade = 0,

    // The CoffeeFlavorFactory instance
        flavorFactory;

    function takeOrders( flavorIn, table) {
        flavors[ordersMade] = flavorFactory.getCoffeeFlavor( flavorIn );
        tables[ordersMade++] = new CoffeeOrderContext( table );
    }

    flavorFactory = new CoffeeFlavorFactory();

    takeOrders("Cappuccino", 2);
    takeOrders("Cappuccino", 2);
    takeOrders("Frappe", 1);
    takeOrders("Frappe", 1);
    takeOrders("Xpresso", 1);
    takeOrders("Frappe", 897);
    takeOrders("Cappuccino", 97);
    takeOrders("Cappuccino", 97);
    takeOrders("Frappe", 3);
    takeOrders("Xpresso", 3);
    takeOrders("Cappuccino", 3);
    takeOrders("Xpresso", 96);
    takeOrders("Frappe", 552);
    takeOrders("Cappuccino", 121);
    takeOrders("Xpresso", 121);

    for (var i = 0; i < ordersMade; ++i) {
        flavors[i].serveCoffee(tables[i]);
    }
    console.log(" ");
    console.log("total CoffeeFlavor objects made: " +  flavorFactory.getTotalCoffeeFlavorsMade());
}

// 实现 document.ready 事件
document.ready = function (callback) {
    ///兼容FF,Google
    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function () {
            document.removeEventListener('DOMContentLoaded', arguments.callee, false);
            callback();
        }, false);
    }
    //兼容IE
    else if (document.attachEvent) {
        document.attachEvent('onreadytstatechange', function () {
            if (document.readyState == "complete") {
                document.detachEvent("onreadystatechange", arguments.callee);
                callback();
            }
        });
    }
    else if (document.lastChild == document.body) {
        callback();
    }
};

window.onload = function () {
    alert('onload'); // 后执行
};

document.ready(function () {
    alert('ready'); // 先执行
});