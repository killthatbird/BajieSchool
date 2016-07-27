/**
 * Created by Administrator on 2016/7/20.
 */
angular.module('MyCtrl', [])
  .controller('MineCtrl', function ($scope, $state) {
    $scope.viewinfo = function () {
      $state.go("pinfo")
    }
});

