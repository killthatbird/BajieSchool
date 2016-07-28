/**
 * Created by Administrator on 2016/7/20.
 */
angular.module('MyCtrl', [])
  .controller('MineCtrl', function ($scope, $state) {
    $scope.viewinfo = function () {
      $state.go("pinfo")
    }
    $scope.myplan = function (A) {
      $state.go("myplan", {barTitle: A})
    }
  })
  .controller('myplanCtrl', function ($scope, $stateParams, $state) {
    $scope.title = $stateParams.barTitle
    $scope.newplan = function () {
      $state.go("newplan")
    }
  })

  .controller('newplanCtrl', function ($scope, $state) {
    $scope.newplan = function () {
      $state.go("newplan")
    }
  })
;
