angular.module('controllers', [])
  .controller('Allconfig', function ($scope, $state, $rootScope, $ionicModal,LocalStorage) {
    $scope.$watch('$viewContentLoaded', function() {
      if (LocalStorage.get("username",0)==0){
        $state.go("login")
      }else {
        $state.go("tab.activity")
      }
    });
    $scope.addsshow = false;
    $scope.adds = function () {
      $ionicModal.fromTemplateUrl('modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
        $scope.modal.show();
      });
    }
    $scope.hide = function () {
      $scope.modal.hide();
    }
    $scope.addstate = function (A) {
      $scope.modal.hide();
      $state.go(A)
    }

    /*    var userInfo = localStorage.getItem('userInfo');
     if (userInfo == null || userInfo.logintime == 0) {
     $state.go("tour");
     } else {
     $state.go("tab.activity");
     localStorage.setItem("userInfo", {username: localStorage.getItem("username"), logintime: 1});
     }*/
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

  .controller('registerCtrl', function ($scope, $state, $interval,$ionicPopup,$timeout, LocalStorage) {
    $scope.formdata = {};
    $scope.formdata.name = LocalStorage.get("sc_name")
    $scope.curstep = true;
    $scope.msg=false
    $scope.seleSch = function () {
      $state.go("selsch")
    }
    $scope.agreecon = function() {
      $scope.data = {};
      var myPopup = $ionicPopup.show({
        template: '<textarea  ng-model="data.wifi" style="min-height: 250px;padding:15px;width:100%;overflow-y: scroll"></textarea>',
        title: '注册协议',
        subTitle: 'Please use normal things',
        scope: $scope,
        buttons: [
          { text: '返回',
            onTap: function(e) {
              $scope.agg_checked=false
              return $scope.agg_checked;
            }},
          {
            text: '<b>确定</b>',
            type: 'button-positive',
            onTap: function(e) {
              $scope.agg_checked=true
              $scope.msg=false
              return $scope.agg_checked;
            }
          }
        ]
      });
      myPopup.then(function(res) {
      });

    };
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
              $scope.paracont = second + "秒后重发";
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

    $scope.login = function () {
      if($scope.agg_checked==true){
        $scope.msg=false
        $state.go("login")
      }else{$scope.msg=true}
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

  .controller('selSchCtrl', function ($scope, $state, LocalStorage, $http, $ionicLoading) {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0,
      duration: 3000
    });
    $http.get('http://localhost:8080/api/university').then(function (response) {
      $ionicLoading.hide();
      if (response.data.status == 0) {
        $scope.schoollist = response.data.result;
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

  .controller('newpassCtrl', function ($scope, $ionicPopup, $timeout, $state,$ionicLoading) {
    $scope.userdata = {};
    $scope.login = function () {
      if ($scope.userdata.$invalid) {
        $ionicLoading.hide();
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

  .controller('loginCtrl', function ($scope, $state, $http,$ionicLoading) {


    $scope.user = {};
    $scope.login = function () {
      $ionicLoading.show({
        template: 'Loading Contents...',
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 3000
      });
      console.log($scope.user.password);
      $http({
        method: 'POST',
        url: 'http://localhost:8080/api/login/' + $scope.user.username,
        data: $.param($scope.user)
      }).then(function successCallback(response) {
        $ionicLoading.hide();
        if (response.data.status == 0) {
          localStorage.setItem("username", $scope.user.username);
          $http.get("http://localhost:8080/api/status/" + $scope.user.username)
            .then(function (response) {
              console.log("用户状态修改成功!");
            });

          $state.go("tab.activity");
        }

      }, function errorCallback(response) {
        console.error("登录失败！");
      });

    }
    $scope.register = function () {
      $state.go("register");
    }
    $scope.findin = function () {
      $state.go("findin");
    }
    $scope.visit = function () {
      $state.go("tab.activity");
    }
  });
