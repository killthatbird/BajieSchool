angular.module('controllers', [])
  .controller('Allconfig', function ($scope, $state,$rootScope,$ionicModal) {
    $scope.addsshow =false;
    $scope.adds=function () {
      $ionicModal.fromTemplateUrl('modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
        $scope.modal.show();
      });
    }
    $scope.hide = function () {
      $scope.modal.hide();
    }
   /* $scope.adds=function () {
      $scope.addsshow = true;
    }*/
    $scope.newact = function () {
      $scope.modal.hide();
      $state.go("newact")
    }
    if (localStorage.times == 0) {
      $state.go("tour");
    } else {
      $state.go("tab.activity");
    }
 /*   var options = {
      message: 'share this', // not supported on some apps (Facebook, Instagram)
      subject: 'the subject', // fi. for email
      files: ['', ''], // an array of filenames either locally or remotely
      url: 'https://www.website.com/foo/#bar?a=b',
      chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
    }

    var onSuccess = function(result) {
      console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
      console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
    }

    var onError = function(msg) {
      console.log("Sharing failed with message: " + msg);
    }

    window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);*/
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
      // $scope.disabled=false;
      var second = 60,
        timePromise = undefined;
      var flag = true;
      $scope.sendphonecode = function () {

        if (flag == true) {
          timePromise = $interval(function () {
              if (second <= 0) {
                $interval.cancel(timePromise);
                timePromise = undefined;
                second = 60;
                $scope.paracont = "重发验证码";
                $scope.paraclass = "but_null";
                $scope.paraevent = true;
              } else {
                // $scope.disabled=true;
                $scope.paracont = second + "秒后可重发";
                $scope.paraclass = "not but_null";
                second--;
                flag = true;
              }
              flag = false;
            }
            ,
            1000
          );
        }
      }

      $scope.nextste = function () {
        $state.go("newpass")
      }
    }
  )

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
