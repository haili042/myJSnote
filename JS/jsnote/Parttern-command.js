
/**
 * 命令模式
 * 封装好一系列命令
 * */
var lian = {};
lian.paobing = function (pao_num) {
    console.log(pao_num + '门炮, 开始战斗');
};
lian.bubing = function (bubing_num) {
    console.log(bubing_num + '步兵, 开始战斗');
};
// 连长发送命令给下级
lian.lianzhang = function (mingling) {
    lian[mingling.type](mingling.num);
};

// 司令发送命令1给连长
lian.lianzhang({
    type: 'paobing',
    num: 100
});
// 司令发送命令2给连长
lian.lianzhang({
    type: 'bubing',
    num: 500
});

/**
 * 另一种实现
 * */
(function() {
    var CarManager = {
        carInfo: function(name, id) {
            console.log('查询啦: name: ' + name + ', id:' + id);
        },
        buyCar: function(name, id) {
            console.log('买车啦: name: ' + name + ', id:' + id);
        },
        seeCar: function(name, id) {
            console.log('看车啦: name: ' + name + ', id:' + id);
        },
        execute: function(command) {
            var args = Array.prototype.slice.call(arguments, 1);
            if (CarManager[command]) {
                CarManager[command].apply(CarManager, args);
            }
        }
    };
    // 执行命令
    CarManager.execute('carInfo', 'TOYOTA', '1');
    CarManager.execute('seeCar', 'AUDI', '2');
    CarManager.execute('buyCar', 'AUDI', '3');

})();
