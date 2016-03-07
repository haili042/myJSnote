// UserInfoMudule 是页面中 ng-app 的名字, 只能调用一次, 也就是一个入口
var userInfoModule = angular.module('UserInfoMudule', []);

userInfoModule.controller('UserInfoCtrl', ['$scope', function($scope) {
    $scope.userInfo = {
        email: 'haili@042.com',
        password: 'haili@042.com',
        autoLogin: true
    };
    $scope.show = function() {
        console.log($scope.userInfo.email);
    };
}]);

userInfoModule.controller('Toggle', ['$scope', function($scope) {
    $scope.isHidden = false;
    $scope.isRed = false;
    $scope.isBlue = false;
    $scope.color = "red";

    $scope.toggle = function() {
        $scope.isHidden = !$scope.isHidden;
        $scope.color = "blue";
        $scope.isBlue = !$scope.isBlue;
        $scope.red = !$scope.red;
    };
}]);