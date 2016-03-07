
// 通用controller
myModule.controller('CommonController', function($scope) {
    $scope.commonfn = function() {
        console.log("common controller");
    };
});


// 子控制器1, 继承通用控制器
myModule.controller('Conroller1', function($scope) {
    $scope.greeting = {
        text: 'hello1'
    };

    $scope.show1 = function() {
        console.log("test1");
    }
});

// 子控制器2, 继承通用控制器
myModule.controller('Conroller2', function($scope) {
    $scope.greeting = {
        text: 'hello2'
    };

    $scope.show2 = function() {
        console.log("test2");
    }
});


