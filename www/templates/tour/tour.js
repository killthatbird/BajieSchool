angular.module('TourCtrl', [])
  .controller('ToursCtrl', function ($scope, $state, $location, LocalStorage) {
    $scope.login = function () {
      if (LocalStorage.get("username",0)==0){
        $state.go("login")
      }else {
        $state.go("tab.activity")
      }
    }
  });
