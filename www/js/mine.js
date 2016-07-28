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
    $scope.sets = [];
    $scope.add = function () {
      if ($scope.sets.length < 5) {
        var obj = {time: "7"};
        $scope.sets.push(obj);
      }
    }

    $scope.del = function (idx) {
      $scope.sets.splice(idx, 1);
      /*$scope.sets.splice($scope.sets.indexOf(idx),1);*/
    }
  })
;
