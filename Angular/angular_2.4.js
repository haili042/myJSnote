/**
 *
 * 指令和指令之间交互
 * @type {angular.Module|*}
 */

// 定义模块
var myModule = angular.module('myngApp', []);

// 和 controller 的定义有点像, 返回一个对象
myModule.directive('superman', function() {
    return {
        scope: {}, // 创建独立作用域
        restrict: 'AE',
        controller: function($scope) { // 指令内部的控制器, 作用是给其他指令提供公用方法
            $scope.abilities = [];
            this.addStrength = function() {
                $scope.abilities.push('strength');
            };
            this.addSpeed = function() {
                $scope.abilities.push('speed');
            };
            this.addLight = function() {
                $scope.abilities.push('light');
            };

        },
        link: function(scope, element, attrs) { // 共有4个参数

            // element 是 angular 内轻量级的 jquery 对象, 可以调用类似 jquery 的方法
            element.addClass('btn btn-primary');
            element.bind('mouseenter', function(){
                console.log(scope.abilities);
            });
        }

    };
});

// 指令 strength
myModule.directive('strength', function() {
    return {
        require: '^superman', // 依赖 superman 指令
        link: function(scope, element, attrs, superCtrl) { // 共有4个参数, 第四个是父控制器
            superCtrl.addStrength();
        }

    };
});

// 指令 speed
myModule.directive('speed', function() {
    return {
        require: '^superman', // 依赖 superman
        link: function(scope, element, attrs, superCtrl) { // 共有4个参数
            superCtrl.addSpeed();
        }

    };
});

// 指令 light
myModule.directive('light', function() {
    return {
        require: '^superman', // 依赖 superman
        link: function(scope, element, attrs, superCtrl) { // 共有4个参数
            superCtrl.addLight();
        }

    };
});


/**
 * 指令和控制器交互
 *
 * */
myModule.controller('MyCtrl', ['$scope', function($scope) {
    $scope.loadData = function() {
        console.log('load data...');
    };
}]);

myModule.controller('MyCtrl2', ['$scope', function($scope) {
    $scope.loadData2 = function() {
        console.log('load data...222');
    };
}]);

// 复用指令
myModule.directive('loader', function() {
    return {
        restrict: 'AE',
        link: function(scope, element, attr) {
            element.bind('mouseenter', function() {
                //scope.loadData(); // 调用控制器的方法
                scope.$apply(attr.mymethod); // 获取属性里的方法, 这里要小写....
            });
        }
    };
});

/**
 * 指令的独立scope
 *
 * */
myModule.directive('hello', function() {
    return {
        scope: {},// 定义一个独立scope, 防止定义了相同的指令之后相互影响
        restrict: 'AE',
        template: '<div><input type="text" ng-model="myHello">{{myHello}}</div>',
        replace: true // 是否会替换掉 <hello> 标签
    };
});

/**
 * 独立scope的绑定
 * @ 当前属性字符串传递
 * = 与父scope双向绑定
 * & 传递父scope函数
 * */
myModule.controller('Drink', ['$scope', function($scope) {
    $scope.ctrlFlavor = '百威';
    $scope.text = '可口可乐';
	
    $scope.sayHello = function(name) {
        console.log('hello' + name);
    };
	
	$scope.data = function() { // 有返回值的似乎不起作用
		return {
			data: 'adfsd'
		};
	}
	
	$scope.sayHi = function() {
		console.log('hi ');
	};
}]);

myModule.directive('drink', function() {
    return {
        scope: { // 定义一个独立scope, 防止定义了相同的指令之后相互影响
  //          flavor: '@'    // 传递父scope传递的字符串(准确来说是表达式 {{}}), 作用和下面的link 一样, @前面的是模版里的属性 @后面的是html里的属性(注意驼峰变横杠)
  //          text: '=',      // 与父scope的属性双向绑定, (=是针对某个对象的引用)
            sayHello1: '&',   // 对父级作用域 $sopce 进行绑定，并将其中的属性包装成一个函数，注意，是属性，意即，任何类型的属性都会被包装成一个函数，比如一个单纯的字符串，或是一个对象数组，或是一个函数方法。
			getData: '&'// 按照书写顺序匹配的, 
        },
		controller: function($scope, $http) { // 这里的 $sopce 是内部的scope

			console.log($scope.text); // undefined
			
			$scope.sayHello1 = function(name) { // 重写了 sayHello 方法
				console.log('hello 111 ' + name);
			};
			
			$scope.text = 'textasd';
			$scope.data1 = $scope.getData; // 相当于把父scope 的 data  传递给当前scope中, 起了别名
						
			$scope.sayData = function(data) { 
				console.log('hello data  ' + data);
			};
		},
        restrict: 'AE',
        template: '<div><input type="text" ng-model="text">{{flavor}}' +
                '<button class="btn btn-default" ng-click="sayHello1(text)" ng-mouseover="data1()">函数绑定</button></div>' // 这里替换的是scope.flavor
        ,
        link: function(scope, element, attrs) {

        }
        
    };
});



