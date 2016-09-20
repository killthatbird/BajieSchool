/**
 * Created by Administrator on 2016/7/25.
 */
angular.module('StudyCtrl', [])
  .controller('StudysCtrl', function ($scope, $state, $timeout, LocalStorage, $http, $ionicLoading, IP) {
    $scope.currentTab = '推荐';
    var username = localStorage.getItem("username");

    /**
     * 默认加载“推荐”
     */
    $http({
      method: 'POST',
      url: IP.info() + '/api/study/' + 0,
      params: {username: username}
    }).then(function successCallback(response) {
      $ionicLoading.hide();
      if (response.data.status == 0) {
        $scope.studylist = response.data.result;
      }
    }, function errorCallback(response) {
      console.error("活动查询失败!");
    });

    $scope.onClickTab = function (tab) {
      $scope.currentTab = tab.typeName;
      var tabIndex = tab.typeId;

      /**
       * 根据点击TAB动态加载数据
       */
      $http({
        method: 'POST',
        url: IP.info() + '/api/study/' + tabIndex,
        params: {username: username}
      }).then(function successCallback(response) {
        $ionicLoading.hide();
        if (response.data.status == 0) {
          $scope.studylist = response.data.result;
        }
      }, function errorCallback(response) {
        console.error("活动查询失败!");
      });
    }


    $scope.isActivetab = function (A) {
      return A == $scope.currentTab;
    }
    $scope.remove = false;
    $scope.showComment = false;
    $scope.showMore = false;

    var username = localStorage.getItem("username");
    $http.get(IP.info() + "/api/studytype/" + username)
      .then(function (response) {
        if (response.data.status == 0) {
          $scope.stutypelist = response.data.result;
        } else {
          console.error('网络连接失败...');
        }
      });

    $scope.studetail = function (study) {
      $state.go("studetail", {study: study});
      $scope.stdId = study.stdId;
    }
    $scope.gostype = function (A) {
      $state.go("stutype", {stypelist: A})
    }

    $scope.doRefreshStudy = function () {

      //下拉刷新
    }
    $scope.delete = function (idx) {
      console.log(idx)
      $scope.stype.splice(idx, 1);
    }
  })
  .controller('newstuCtrl', function ($scope, $state, $http, IP, LocalStorage) {
    $scope.formData = {}
    $http.get(IP.info() + "/api/studyalltype")
      .then(function (response) {
        if (response.data.status == 0) {
          $scope.types = response.data.result;
        } else {
          console.error('网络连接失败...');
        }
      });
    $scope.save = function () {
      $scope.formData.username = LocalStorage.get("username", 0)
      console.log($scope.formData)
      $http({
        method: 'POST',
        url: IP.info() + '/api/study/addstuqu',
        data: $.param($scope.formData)
      }).then(function successCallback(response) {
        console.log(response);
        if (response.data.status == 0) {
          console.log("帖子发表成功!");
          $state.go('tab.study');
        }

      }, function errorCallback(response) {
        console.error("帖子发表失败！");
      });
    }
  })
  .controller('studetailCtrl', function ($scope, $state, $http, $stateParams, userService, IP) {
    var username = localStorage.getItem("username");
    $scope.choose = true;
    $scope.attention = function () {
      $scope.choose = !$scope.choose
    }
    $scope.study = $stateParams.study;
    $scope.stdReContent = '';
    console.log('Request param : ' + $scope.study.stdId);
    /* $scope.addlike = function (A,B) {
     $scope.dzlike = false;
     $scope.reply.stdReLike=A+1;
     $http({
     method: 'POST',
     url: IP.info() + '/api/study/updlike',
     params: {id: B}
     }).then(function successCallback(response) {
     console.log("点赞成功!");
     }, function errorCallback(response) {
     console.error("点赞失败!");
     });
     }*/
    $http.get(IP.info() + "/api/userstudy/" + $scope.study.stdId)
      .then(function (response) {
        if (response.data.status == 0) {
          $scope.user = response.data.result;
        } else {
          console.error('网络连接失败...');
        }
      });

    $http({
      method: "POST",
      url: IP.info() + "/api/study/replys/",
      params: {stdId: $scope.study.stdId, username: username}
    }).then(
      function successCallback(response) {
        console.log('学习评论加载成功!');
        $scope.replylist = response.data.result;
      }, function errarCallback(response) {
        console.log('学习评论加载失败!');
      }
    );

    userService.load(username).then(
      function successCallback(response) {
        console.log('加载成功!');
        console.log(response.data.result.avatar);
        $scope.avatar = response.data.result.avatar;

      }, function errarCallback(response) {
        console.error('加载失败!');
      });

    $scope.send = function () {
      if ($scope.stdReContent != '') {
        console.log($scope.stdReContent);

        $scope.replylist.push({
          avatar: $scope.avatar,
          username: username,
          stdReContent: $scope.stdReContent,
          stdReTime: new Date(),
          stdReLike: 0
        });

        var studyReply = {
          stdId: $scope.study.stdId,
          username: username,
          stdReContent: $scope.stdReContent
        }

        /**
         * 新增回复消息
         */
        $http({
          method: "POST",
          url: IP.info() + "/api/addreply",
          data: $.param(studyReply)
        }).then(
          function successCallback(response) {
            console.log("新增成功!");
          }, function errorCallback() {
            console.error("新增失败!")
            ''
          }
        );

        /**
         * 新增用户回复标识
         */
        var userStudy = {
          stdId: $scope.study.stdId,
          username: username,
          flag: 1
        };
        $http({
          method: "POST",
          url: IP.info() + "/api/addus",
          data: $.param(userStudy)
        }).then(
          function successCallback(response) {
            console.log("新增成功!");
          }, function errorCallback() {
            console.error("新增失败!")
            ''
          }
        );

        $scope.stdReContent = '';
      }
    }
    $scope.replay = function (A) {
      $scope.send_content = '回复@' + A + ':'
    }
  })
  .controller('stutypeCtrl', function ($scope, $ionicPopup, $timeout, $http, $filter, $ionicLoading, IP, $stateParams) {
    $scope.tjTab = '推荐';
    $scope.stype = $stateParams.stypelist
    $scope.isActivetab = function (A) {
      return A == $scope.tjTab;
    }
    var colorList = ["#f18b1b", "#f58f85", "#74c75c", "#bcb1d6", "#44bb97", "#ebb904", "#9b5895", "#f59974"]
    $scope.bgc = colorList;

    var username = localStorage.getItem("username");
    $scope.username = username;
    $http.get(IP.info() + "/api/studytype/" + username)
      .then(function (response) {
        if (response.data.status == 0) {
          $scope.stype = response.data.result;
        } else {
          console.error('网络连接失败...');
        }
      });

    $http.get(IP.info() + "/api/unchosentypes/" + username)
      .then(function (response) {
        if (response.data.status == 0) {
          $scope.unChosenTypes = response.data.result;
        } else {
          console.error('网络连接失败...');
        }
      });
    $scope.stype = [];

    $scope.removetype = function (idx) {
      $scope.stype.splice($scope.stype.indexOf(idx), 1);
      $scope.unChosenTypes.push({typeName: idx.typeName, typeId: idx.typeId});
    }
    $scope.addtype = function (A) {
      if ($scope.stype.length >= 8) {
        var alertPopup = $ionicPopup.alert({
          title: '提示',
          template: '不能超过8个~',
          okText: '返回'
        });
        $timeout(function () {
          alertPopup.close(); //由于某种原因3秒后关闭弹出
        }, 3000);
      } else {
        $scope.unChosenTypes.splice($scope.unChosenTypes.indexOf(A), 1);
        $scope.stype.push({typeName: A.typeName, typeId: A.typeId});
      }
    }
    $scope.updateStu = function () {
      console.log($('#updateStu').serialize())
      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 500,
        duration: 10000
      });

      $http({
        method: 'POST',
        url: IP.info() + '/api/updateStu',
        data: $('#updateStu').serialize()
      }).then(function successCallback(response) {
        $ionicLoading.hide();
        if (response.data.status == 0) {
          var alertPopup = $ionicPopup.alert({
            title: '消息提示!',
            template: '保存成功！',
            okText: '返回'
          });
          $timeout(function () {
            alertPopup.close(); //由于某种原因3秒后关闭弹出
          }, 3000);
        }
      }, function errorCallback(response) {
        console.error(response)
        console.error("保存失败!");
      });
    }

  })
