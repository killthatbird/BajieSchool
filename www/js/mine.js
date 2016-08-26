/**
 * Created by Administrator on 2016/7/20.
 */
angular.module('MyCtrl', []).run(function ($rootScope, $http) {
  $http.get("../data/mine/main.json")
    .then(function (response) {
      if (response.data.status == 0) {
        $rootScope.badge = response.data.result[2].size;
      } else {
        console.error('网络连接失败...');
      }
    });
})
  .controller('MineCtrl', function ($scope, $state, $http) {

    $scope.username = localStorage.getItem("username");
    $scope.setting = function () {
      $state.go("setting")
    }
    var myChart = echarts.init(document.getElementById('main'));
    myChart.showLoading();

    myChart.setOption({
      tooltip: {},
      xAxis: {
        data: []
      },
      yAxis: {},
      series: [{
        name: '访问量',
        type: 'line',
        data: []
      }]
    });

    $.get('http://localhost:8080/api/visitor/' + $scope.username).done(function (data) {
      myChart.hideLoading();
      // 填入数据
      var result = JSON.parse(data).result;
      var categories = [];
      var number = [];
      for (var i = 0; i < result.length; i++) {
        categories[i] = result[i].date;
        number[i] = result[i].visitor;
      }

      myChart.setOption({
        xAxis: {
          data: categories
        },
        series: [{
          // 根据名字对应到相应的系列
          name: '访问量',
          data: number
        }]
      });
    });

    $http.get("../data/mine/main.json")
      .then(function (response) {
        if (response.data.status == 0) {
          $scope.blocks = response.data;
        } else {
          console.error('网络连接失败...');
        }
      });

    $scope.viewinfo = function () {
      $state.go("pinfo")
    }

    $scope.myplan = function (A) {
      $state.go("myplan", {barTitle: A})
    }
    /*通知*/
    $scope.mynotice = function () {
      $state.go("mynotice")
    }
    /*收藏*/
    $scope.collect = function () {
      $state.go("mycollection")
    }
  })

  .controller('myplanCtrl', function ($scope, $stateParams, $state, $http) {
    $scope.title = $stateParams.barTitle;
    $scope.newplan = function () {
      $state.go("newplan")
    }

    var username = localStorage.getItem("username");
    $http.get("http://localhost:8080/api/agenda/" + username)
      .then(function (response) {
        if (response.data.status == 0) {
          $scope.agendalist = response.data.result;
        } else {
          console.error('网络连接失败...');
        }
      });

  })
  .controller('mynoticeCtrl', function ($scope, $state, $interval, $http) {
    $scope.remove = false;
    var second = 5,
      timePromise = undefined;
    $scope.showdel = function () {
      timePromise = $interval(function () {
          if (second <= 0) {
            $interval.cancel(timePromise);
            timePromise = undefined;
            second = 5;
            $scope.remove = false;
          } else {
            $scope.remove = true;
            second--;
          }
        },
        1000
      );
    }

    $http.get("../data/mine/mine-notification.json")
      .then(function (response) {
        if (response.data.status == 0) {
          $scope.ntflist = response.data.ntflist;
        } else {
          console.error('网络连接失败...');
        }
      });

    $scope.deletebtn = function (idx) {
      $scope.sets.splice(idx, 1);
    }
  })
  .controller('mycollectionCtrl', function ($scope, $state, $http, $ionicHistory, LocalStorage) {
    $scope.searchContent = '';
    $scope.reset = function ($event) {
      $scope.searchContent = '';
    }
    $scope.godetial = function (A) {
      if (A == "活动") {
        var backViewId = $ionicHistory.currentView().viewId;
        LocalStorage.set("acthViewid", backViewId);
        $state.go("actdetial")
      } else if (A == "学习") {
        $state.go("studetial")
      } else if (A == "问答") {
        $state.go("qudetial")
      }
    }

    $http.get("../data/mine/mine-collection.json")
      .then(function (response) {
        if (response.data.status == 0) {
          $scope.cltlist = response.data.cltlist;
        } else {
          console.error('网络连接失败...');
        }
      });

    $scope.remove = false;
    var second = 5,
      timePromise = undefined;
    $scope.showdel = function () {
      timePromise = $interval(function () {
          if (second <= 0) {
            $interval.cancel(timePromise);
            timePromise = undefined;
            second = 5;
            $scope.remove = false;
          } else {
            $scope.remove = true;
            second--;
          }
        },
        1000
      );
    }
    $scope.deletebtn = function (idx) {
      $scope.sets.splice(idx, 1);
    }
  })
  .controller('newplanCtrl', function ($scope, $state, $http) {
    $http.get("../data/mine/reminder.json")
      .then(function (response) {
        if (response.data.status == 0) {
          $scope.reminders = response.data.reminder;
        } else {
          console.error('网络连接失败...');
        }
      });

    $scope.sets = [];
    $scope.disabled = false;
    $scope.add = function () {
      if ($scope.sets.length < 5) {
        $scope.disabled = false;
        var obj = {};

        $scope.sets.push(obj);
      } else {
        $scope.disabled = true;
      }
    }

    $scope.del = function (idx) {
      if ($scope.sets.length < 6) {
        $scope.disabled = false;
      }
      console.log(idx)
      $scope.sets.splice(idx, 1);
      /*$scope.sets.splice($scope.sets.indexOf(idx),1);*/
    }
  })

  .controller('pInfoCtrl', function ($scope, $http, $ionicActionSheet) {
    $scope.edit = true
    $scope.editPinfo = function () {
      $scope.edit = false
    }
    $scope.save = function () {
      $scope.edit = true
    }
    $http.get("../data/mine/p-info.json")
      .then(function (response) {
        if (response.data.status == 0) {
          $scope.pinfo = response.data.pinfo;
        } else {
          console.error('网络连接失败...');
        }
      });

    $scope.changepic = function () {
      $ionicActionSheet.show({
        buttons: [{
          text: '拍照'
        }, {
          text: '相册'
        }],
        titleText: '选择头像',
        destructiveText: '取消',
        destructiveButtonClicked: function () {
          return true;
        },
        buttonClicked: function (index) {
          if (index == 0) {
            var options = {
              destinationType: Camera.DestinationType.DATA_URL,
              sourceType: Camera.PictureSourceType.CAMERA,
            };

          } else if (index == 1) {
            var options = {
              destinationType: Camera.DestinationType.DATA_URL,
              sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            };
          }
          /* $cordovaCamera.getPicture(options).then(　　　　　　　　　 //返回一个imageURI，记录了照片的路径
           function (imageURI) {
           imgitems.push({
           url: "data:image/jpeg;base64," + imageURI
           });
           $scope.items = imgitems;
           tobackimg = tobackimg + imageURI + ',';
           },
           function (err) {

           });*/
          return true;
        }
      });
    }
  })

  .controller('settingCtrl', function ($scope, $http, $state,LocalStorage) {

    // 触发一个按钮点击，或一些其他目标
    $scope.logout = function () {
      var username = LocalStorage.get("username");
      $http.get("http://localhost:8080/api/status/" + username)
        .then(function (response) {
          LocalStorage.remove("username")
          console.log("用户退出成功!");
          $state.go("login");
        });
    }
  })

  .controller('feedbackCtrl', function ($scope, $http, $state) {
    $scope.feedback = {reserve1: "", reserve2: ""};
    var username = localStorage.getItem('username');
    $scope.submitFeedback = function () {

      $scope.feedback.username = username;
      console.log($scope.feedback.content + "\t" + $scope.feedback.qq + "\t" + $scope.feedback.wechat + "\t" + $scope.feedback.email + "\t" + $scope.feedback.username);
      $http({
        method: 'POST',
        url: 'http://localhost:8080/api/feedback',
        data: $.param($scope.feedback)
      }).then(function successCallback(response) {
        console.log("反馈提交成功!");
        $state.go('setting');
        $scope.feedback = {};
      }, function errorCallback(response) {
        console.error("反馈提交失败!");
      });


    }
  })

  .controller('againstCtrl', function ($scope, $http, $state) {
    $scope.accusation = {};
    var informant = localStorage.getItem('username');

    $scope.against = function () {
      $scope.accusation.informant = informant;
      console.log($scope.accusation.informant + "\t" + $scope.accusation.against + "\t" + $scope.accusation.content);
      $http({
        method: 'POST',
        url: 'http://localhost:8080/api/against',
        data: $.param($scope.accusation)
      }).then(function successCallback(response) {
        console.log("举报提交成功!");
        $state.go('setting');
        $scope.accusation = {};
      }, function errorCallback(response) {
        console.error("举报提交失败!");
      });

    }

  })
;
