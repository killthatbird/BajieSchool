angular.module('starter').controller('TourCtrl', function ($scope, $location, $ionicPopup) {

  $scope.login = function () {
    // Login with code
    localStorage.setItem('firstVisit', '1');
    $location.url('/');
  }

});
