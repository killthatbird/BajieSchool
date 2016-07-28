/**
 * Created by Administrator on 2016/7/25.
 */
angular.module('ActCtrl', [])
  .controller('ActivityCtrl', function ($scope, $location, $ionicPopup) {
    $scope.a0 = "aui-active";
    $scope.goactab = function (n) {
      for (var i = 0; i <= 6; i++) {
        var i = a + "i";
        console.log(i)
        $scope.i = "";
      }
      $scope.i = "aui-active";
    }
  });
