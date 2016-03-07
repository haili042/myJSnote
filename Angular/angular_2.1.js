var myModule = angular.module('myngApp', []);


myModule.controller('EventController', ['$scope', function($scope) {
    $scope.count = 0;

    // 自定义事件
    $scope.$on('MyEvent', function() {
        $scope.count ++;
    });
}]);

/*
myModule.config(function($routeProvider) {

    $routeProvider.when('/hello', { // 路由名称
        templateUrl: 'template/tpls.html', // 模版路径
        controller: 'Test' // 控制器
    }).otherwise({ // 默认
        redirectTo: '/hello'
    });
});*/
