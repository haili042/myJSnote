/**
 *
 * 指令和指令之间交互
 * @type {angular.Module|*}
 */

// 定义模块
var myModule = angular.module('myngApp', []);

// 和 controller 的定义有点像, 返回一个对象
myModule.controller('MyCtrl', ['$scope', function($scope) {

    $scope.user = {
        usr: 'haili042@163.com',
        psw: '123456'
    };


    $scope.save = function() {
        alert('success');
    };
}]);
