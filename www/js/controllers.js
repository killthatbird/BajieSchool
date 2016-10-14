angular.module('controllers', [])
  .controller('Allconfig', function ($scope, $state, $rootScope, $ionicModal, LocalStorage) {
    $scope.$watch('$viewContentLoaded', function () {
      if (LocalStorage.get("username", 0) == 0) {
        $state.go("login")
      } else {
        $state.go("tab.activity")
      }
    });
    $scope.visit = function () {
      $state.go("tab.activity");
    }
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

  .controller('registerCtrl', function ($scope, $state, $interval, $ionicPopup, $stateParams, $http, IP, $timeout) {
    $scope.formdata = {};
    $scope.name = $stateParams.schname;
    $scope.curstep = true;
    $scope.msg = false
    $scope.checkname = false
    $scope.formdata.university = $stateParams.schid;
    var username = localStorage.getItem("username");
    $scope.seleSch = function () {
      $state.go("selsch")
    }
    $scope.agreecon = function () {
      $scope.data = {};
      var myPopup = $ionicPopup.show({
        template: '<div style="min-height: 250px;padding:15px;width:100%;overflow-y: scroll"><ul><li>请勿发布任何反动、色情、侮辱性言论</li><li>我们会严格保护您的隐私</li><li>您的每一处意见都很宝贵，为了能帮助到更多的用户，因此您的所有发布信息均不能被删除</li></ul></div>',
        // template: '<textarea style="min-height: 250px;padding:15px;width:100%;overflow-y: scroll">我们会严格保护您的隐私</textarea>',
        title: '用户协议',
        subTitle: '八戒上学APP用户须知',
        scope: $scope,
        buttons: [
          {
            text: '返回',
            onTap: function (e) {
              $scope.agg_checked = false
              return $scope.agg_checked;
            }
          },
          {
            text: '<b>确定</b>',
            type: 'button-positive',
            onTap: function (e) {
              $scope.agg_checked = true
              $scope.msg = false
              return $scope.agg_checked;
            }
          }
        ]
      });
      myPopup.then(function (res) {
      });

    };
    $scope.paracont = "获取验证码";
    $scope.paraclass = "but_null";
    $scope.paraevent = false;
    // $scope.disabled=false;
    var second = 60,
      timePromise = undefined;
    var flag = true;
    $scope.sendCaptcha = function (email) {

      if (flag == true) {
        $http({
          url: IP.info() + '/api/captcha',
          method: "GET",
          params: {email: email}
        }).then(function successCallback(response) {
          console.log('验证码发送成功!');
        }, function errorCallback(response) {
          console.error('验证码发送失败!');
        });


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
            // flag = false;
          }
          ,
          1000
        );
      }
    }

    $scope.ischecked = function () {
      if ($scope.agg_checked == true) {
        $scope.msg = false
      }
    }

    $scope.register = function () {
      if ($scope.agg_checked == true) {
        $http({
          method: 'GET',
          url: IP.info() + '/api/checkname/' + $scope.formdata.username
        }).then(function successCallback(response) {
          if (response.data.status == 0) {
            $scope.checkname = false
            /*  用户注册*/
            $http({
              method: 'POST',
              url: IP.info() + '/api/adduser',
              data: $.param($scope.formdata)
            }).then(function successCallback(response) {
              if (response.data.status == 0) {
                console.log("注册成功!");
                $state.go("login");
              }

            }, function errorCallback(response) {
              console.error("注册失败！");
            });
          } else {
            $scope.checkname = true;
            console.error("该用户已存在");
          }

        }, function errorCallback(response) {

        });
      } else {
        $scope.msg = true
      }
    }

    $scope.checkCaptcha = function (email, captcha) {
      console.log('验证成功!');
      $http({
        url: IP.info() + '/api/checkCaptcha',
        method: 'GET',
        params: {email: email, captcha: captcha}
      }).then(function successCallback(response) {
        console.log('验证成功!');
      }, function errorCallback() {
        console.error('验证失败,请检查网络...');
      });
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
      $scope.sendCaptcha = function () {

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
        $state.go("newpass");
      }

    }
  )

  .controller('selSchCtrl', function ($scope, $state, LocalStorage, $http, IP, $ionicLoading) {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0,
      duration: 3000
    });
    $http.get(IP.info() + '/api/university').then(function (response) {
      $ionicLoading.hide();
      if (response.data.status == 0) {
        $scope.schoollist = response.data.result;
      }
    });

    $scope.searchContent = ''
    $scope.reset = function () {
      $scope.searchContent = ''
    }
    $scope.backpre = function (A, B) {
      LocalStorage.set("sc_name", A)
      $state.go("register", {schname: A, schid: B})
    }
  })

  .controller('newpassCtrl', function ($scope, $ionicPopup, $timeout, $state, $ionicLoading) {
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

  .controller('loginCtrl', function ($scope, $state, $http, IP, $ionicLoading) {


    $scope.user = {};
    $scope.login = function () {
      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 3000
      });
      $http({
        method: 'POST',
        url: IP.info() + '/api/login/' + $scope.user.username,
        data: $.param($scope.user)
      }).then(function successCallback(response) {
        $ionicLoading.hide();
        if (response.data.status == 0) {
          localStorage.setItem("username", $scope.user.username);
          $http.get(IP.info() + '/api/status/' + $scope.user.username)
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
  })

  .controller('changeSettingCtrl', function ($scope) {
    $scope.changeSettingStatus = function () {
      alert('clicked!');
    }

  });
