angular.module('controllers', [])
  .controller('Allconfig', function ($scope, $state, LocalStorage) {
    $scope.tabs = [{
      title: '推荐',
      url: 'one.tpl.html'
    }, {
      title: '体育',
      url: 'two.tpl.html'
    }, {
      title: '旅游',
      url: 'two.tpl.html'
    }, {
      title: '音乐',
      url: 'two.tpl.html'
    }, {
      title: '舞蹈',
      url: 'two.tpl.html'
    }, {
      title: '联谊',
      url: 'two.tpl.html'
    }, {
      title: '学习',
      url: 'three.tpl.html'
    }];
    $scope.currentTab = '推荐'
    $scope.onClickTab = function (tab) {
      $scope.currentTab = tab.title;
    }
    $scope.isActivetab = function (tabUrl) {
      return tabUrl == $scope.currentTab;
    }

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
