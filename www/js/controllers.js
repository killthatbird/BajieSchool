angular.module('controllers', [])
  .controller('Allconfig', function ($scope, $state) {
    if (localStorage.times == 0) {
      $state.go("tour");
    } else {
      $state.go("tab.activity");
    }
  })

  .controller('ChatsCtrl', function ($scope, Chats) {
    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('registerCtrl', function ($scope, $state, LocalStorage) {
    $scope.formdata = {};
    $scope.formdata.name = LocalStorage.get("sc_name")
    $scope.curstep = true;
    $scope.seleSch = function () {
      $state.go("selsch")
    }
    $scope.login = function () {
      $state.go("login")
    }
  })

  .controller('findCtrl', function ($scope, $state, $interval) {
    $scope.paracont = "获取验证码";
    $scope.paraclass = "but_null";
    $scope.paraevent = false;
    var second = 60,
      timePromise = undefined;
    $scope.sendphonecode = function () {
      timePromise = $interval(function () {
        if (second <= 0) {
          $interval.cancel(timePromise);
          timePromise = undefined;

          second = 60;
          $scope.paracont = "重发验证码";
          $scope.paraclass = "but_null";
          $scope.paraevent = true;
        } else {
          $scope.paracont = second + "秒后可重发";
          $scope.paraclass = "not but_null";
          second--;

        }
      }, 1000, 1000);
    }

    $scope.nextste = function () {
      $state.go("newpass")
    }
  })
  .controller('selSchCtrl', function ($scope, $state, LocalStorage, $http) {
    $http.get('../data/schoollist.json').then(function (response) {
      if (response.data.status == 0) {
        $scope.schoollist = response.data.schoollist;
      }
    });

    $scope.searchContent = ''
    $scope.reset = function () {
      $scope.searchContent = ''
    }
    $scope.backpre = function (A) {
      LocalStorage.set("sc_name", A)
      $state.go("register")
    }
  })
  .controller('newpassCtrl', function ($scope, $ionicPopup, $timeout, $state) {
    $scope.userdata = {};
    $scope.login = function () {
      if ($scope.userdata.$invalid) {
        alert("请检查您的信息");
      } else {
        var alertPopup = $ionicPopup.alert({
          title: '消息提示!',
          template: '修改成功！',
          okText: '返回'
        });
        $timeout(function () {
          alertPopup.close(); //由于某种原因3秒后关闭弹出
        }, 3000);
        $state.go("login")
      }
    }

  })
  .controller('loginCtrl', function ($scope, $state) {
    $scope.login = function () {
      $state.go("tab.activity")
    }
    $scope.register = function () {
      $state.go("register")
    }
    $scope.findin = function () {
      $state.go("findin")
    }
  })
