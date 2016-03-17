
var myModule = angular.module('SelectApp', []);

myModule.controller('OptionCtrl', ['$scope', function($scope) {
    $scope.seleted = '';
    $scope.animals = [
      {
        id: '00001',
        name: '猫',
        sex: '雌',
        food: '鱼',
        favor: '玩球'
      },
      {
        id: '00002',
        name: '狗',
        sex: '雄',
        food: '骨头',
        favor: '接盘子'
      },
      {
        id: '00003',
        name: '兔',
        sex: '雌',
        food: '胡萝卜',
        favor: '刨洞'
      },
      {
        id: '00004',
        name: '狮',
        sex: '雄',
        food: '肉',
        favor: '猎物'
      }
    ];
}]);