angular.module('controllers', [])
  .controller('Allconfig', function ($scope, $state, LocalStorage) {
  })
  .controller('ActivityCtrl', function ($scope, $http) {
    $scope.items = [1, 2, 3];
    $scope.doRefresh = function () {
      $http.get('https://www.baidu.com')
        .success(function (newItems) {
          $scope.items = newItems;
        })
        .finally(function () {
          // Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
        });
    };
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

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('MineCtrl', function ($scope, $state) {
    /*$scope.redirectTo = function () {
      $state.go("setting");
    }*/
  })

  .controller('QuoraCtrl', function ($scope) {
    $scope.listCanSwipe = true;
  });
