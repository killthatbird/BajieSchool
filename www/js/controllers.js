angular.module('controllers', [])
  .controller('Allconfig', function ($scope, $state) {
    if (localStorage.times == 0) {
      $state.go("tour");
    } else {
      $state.go("tab.activity");
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

  .controller('registerCtrl', function ($scope, $state, LocalStorage) {
    $scope.formdata = {};
    $scope.formdata.name = LocalStorage.get("sc_name")
    $scope.curstep =true;
    $scope.seleSch = function () {
      $state.go("selsch")
    }
    $scope.login = function () {
      $state.go("login")
    }
  })
  .controller('selSchCtrl', function ($scope, $state, LocalStorage) {
    $scope.users = [{"_id": "1", "name": "北京大学"}, {
      "_id": "2",
      "name": "清华大学"
    }, {
      "_id": "3",
      "name": "浙江大学"
    }, {
      "_id": "4",
      "name": "复旦大学"
    }, {
      "_id": "5",
      "name": "上海交通大学"
    }, {
      "_id": "6",
      "name": "Laurie"
    }, {
      "_id": "7",
      "name": "Rowland"
    }];
    $scope.searchContent = ''
    $scope.reset = function () {
      $scope.searchContent = ''
    }
    $scope.backpre = function (A) {
      LocalStorage.set("sc_name", A)
      $state.go("register")
    }
  })

  .controller('loginCtrl', function ($scope, $state) {
    $scope.login = function () {
      $state.go("tab.activity")
    }
    $scope.register = function () {
      $state.go("register")
    }
  })
