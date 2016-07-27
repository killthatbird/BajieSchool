angular.module('TourCtrl', [])
  .controller('ToursCtrl', function ($scope, $state, $location, LocalStorage) {
    $scope.login = function () {
      // Login with code
      $state.go("tab.activity");
      /*LocalStorage.setItem('firstVisit', '1');
       $location.url('/');*/
    }

  });
