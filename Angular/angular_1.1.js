var myModule = angular.module('fristAngularApp', []);

// angular 定义指令, 也就是自己定义 <hello> 之类的标签, 插入到 html 中
myModule.directive('hello', function() {
    return {
        restrict: 'AEMC',
        template: '<div>Hi everyone!<div ng-transclude></div></div>', // 模版就是要替换和展现的内容
        transclude: true
    };
});

// angular 定义控制器, 可以由它载入数据绑定到视图
myModule.controller("PhoneListCtrl", function($scope) {
	
    $scope.phones = [
        {
            "name": "Nexus S",
            "snippet": "Fast just got faster with Nexus S."
        },
        {
            "name": "Motorola XOOM? with Wi-Fi",
            "snippet": "The Next, Next Generation tablet."
        },
        {
            "name": "MOTOROLA XOOM?",
            "snippet": "The Next, Next Generation tablet."
        }
    ];
});

myModule.controller('Test', function($scope) {
    $scope.test = {
        test: "testsets"
    };
});


