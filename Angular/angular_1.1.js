var myModule = angular.module('fristAngularApp', []);

// angular ����ָ��, Ҳ�����Լ����� <hello> ֮��ı�ǩ, ���뵽 html ��
myModule.directive('hello', function() {
    return {
        restrict: 'AEMC',
        template: '<div>Hi everyone!<div ng-transclude></div></div>', // ģ�����Ҫ�滻��չ�ֵ�����
        transclude: true
    };
});

// angular ���������, ���������������ݰ󶨵���ͼ
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


