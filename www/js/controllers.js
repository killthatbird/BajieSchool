angular.module('controllers', [])
  .controller('Allconfig', function ($scope, $state, LocalStorage) {
  /*  if (LocalStorage.get("userid",0)==0){
      $state.go("login")
    }else {
      $state.go("/tab/activity")
    }*/
  })
  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })
  .controller('loginCtrl', function ($scope, $state) {
    $scope.login = function () {
      $state.go("tab.activity")
    }
  })
