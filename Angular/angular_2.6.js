/**
 *
 * 指令和指令之间交互
 * @type {angular.Module|*}
 */

// 定义模块
var myModule = angular.module('myngApp', []);

// 注入 $http 服务
myModule.controller('LoadDataCtrl', ['$scope', '$http', function($scope, $http) {

    // 类似 ajax
    $http({
        method: 'GET',
        url: 'data.json'
    }).success(function(data, status, headers, config) { // promises 规范
        console.log('success');
        $scope.users = data;
    }).error(function(data, status, headers, config) {
        console.log('error..');
    });

}]);

// 自定义服务

// 自定义filter, 返回函数
myModule.filter('myFilter1', function() {
    return function(item) {
        return item + '=_=';
    };
});