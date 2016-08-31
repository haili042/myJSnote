/**
 * 中介者模式
 * 简单实现
 * */
var mediator = (function() {
    var topics = {}; // 存储事件名

    var subscribe = function(topic, fn) {
        if (!topics[topic]) {
            topics[topic] = [];
        }

        topics[topic].push({
            context: this, // 绑定了调用环境
            callback: fn
        });

        return this;
    };

    var publish = function(topic) {
        var args;

        if (!topics[topic]) {
            return false;
        }

        args = Array.prototype.slice.call(arguments, 1); // 去掉第一个参数: topic

        for (var i = 0, len = topics[topic].length; i < len; i++) {
            var subscription = topics[topic][i];
            subscription.callback.apply(subscription.context, args); // 可以传入多个参数
        }
        return this;
    };

    return {
        publish: publish,
        subscribe: subscribe,
        installTo: function(obj) {
            obj.subscribe = subscribe;
            obj.publish = publish;
        }
    };
})();

var obj1 = {}, obj2 = {};
mediator.installTo(obj1); // 在注册中介者内注册
mediator.installTo(obj2);

obj1.subscribe('receive', function(msg) {
    console.log('obj1 收到消息: ' + msg); // 收到通知
});
obj2.subscribe('receive', function(msg) {
    console.log('obj2 收到消息: ' + msg);
});

mediator.subscribe('objSend', function(msg) {
    mediator.publish('receive', '控制台广播:' + msg); // 中介者广播消息
});

obj1.publish('objSend', 'obj1 发送了消息'); // 发送给控制台





/**
 * 极客学院
 * 中介者模式, 飞机直接发送给控制台
 * */
var Plane = function(name) {
    this.name = name;
};
Plane.prototype.send = function(msg, to) {
    console.log(this.name + ' send: ' + msg);
    mediator2.send(msg, to);
};
Plane.prototype.receive = function(msg) {
    console.log(this.name + ' receive: ' + msg);
};

var mediator2 = {
    all: {},
    install: function(plane) {
        this.all[plane.name] = plane;
    },
    send: function(msg, to) {
        this.all[to.name].receive(msg);
    }
};
var plane1 = new Plane('feiji1');
var plane2 = new Plane('feiji2');
mediator2.install(plane1);
mediator2.install(plane2);
plane1.send('msg  ', plane2);


/**
 * 极客学院
 * 外观模式: 封装复杂的接口
 * */
var A = function (){
    console.log('A');
};
var B = function (){
    console.log('B');
};
// 外观模式
var facade = function (){
    A();
    B();
};
facade();



