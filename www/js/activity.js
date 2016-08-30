/**
 * Created by Administrator on 2016/7/25.
 */
angular.module('ActCtrl', [])
  .controller('ActallCtrl', function ($scope, $ionicHistory) {
  })
  .controller('ActivityCtrl', function ($scope, $state, $http, $ionicLoading, $timeout, IP, $ionicSlideBoxDelegate) {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 500,
      duration: 10000
    });
    /*   $scope.myActiveSlide = 1;*/
    var username = localStorage.getItem("username");
    $scope.actdetial = function (A) {
      localStorage.setItem("acthViewid", "act1");
      $state.go("actdetial", {actobj: A});
    }
    $http({
      method: 'POST',
      url: IP.info() + '/api/activityALL',
      params: {username: username, type: 0}
    }).then(function successCallback(response) {
      $ionicLoading.hide();
      console.log(response)
      if (response.data.status == 0) {
        $scope.activitylist = response.data.result.Activity;
        $scope.tabs = response.data.result.ActivityType;
        $scope.bannerlist = response.data.result.Banner;
      }
    }, function errorCallback(response) {
      console.error("活动查询失败!");
    });

    $scope.doRefreshAct = function () {
      $http({
        method: 'POST',
        url: IP.info() + '/api/activity',
        params: {username: username, type: 0}
      }).then(function successCallback(response) {
        $ionicLoading.hide();
        if (response.data.status == 0) {
          $scope.activitylist = response.data.result;
        }
      }, function errorCallback(response) {
        console.error("活动查询失败!");
      });
      $timeout(function () {
        $scope.$broadcast('scroll.refreshComplete');
      }, 100);
    };


    $scope.currentTab = '推荐';
    $scope.onClickTab = function (tab) {
      $scope.currentTab = tab.actTypeName;
      //切换TAB时请求该TAB对应的数据

      var actTypeId = tab.actTypeId;

      /**
       * 根据点击TAB动态加载数据
       */
      $http({
        method: 'POST',
        url: IP.info() + '/api/activity/',
        params: {username: username, type: actTypeId}
      }).then(function successCallback(response) {
        $ionicLoading.hide();
        if (response.data.status == 0) {
          $scope.activitylist = response.data.result;
        }
      }, function errorCallback(response) {
        console.error("活动查询失败!");
      });
    }
    $scope.isActivetab = function (tabUrl) {
      return tabUrl == $scope.currentTab;
    }
    $scope.searchContent = '';
    $scope.reset = function ($event) {
      $scope.searchContent = '';
    }
  })


  /*活动详情*/
  .controller('actdetialCtrl', function ($scope, $stateParams, $sce, $state, $http, $ionicHistory, $ionicScrollDelegate, IP, LocalStorage) {
    if ($stateParams.actobj != null) {
      $scope.actobj = $stateParams.actobj;
    }
    $scope.dzlike = true;

    $scope.addlike = function (A, B) {
      $scope.dzlike = false;
      $scope.actobj.actLike = A + 1;
      $http({
        method: 'POST',
        url: IP.info() + '/api/activity/updlike',
        params: {id: B}
      }).then(function successCallback(response) {
        console.log("点赞成功!");
      }, function errorCallback(response) {
        console.error("点赞失败!");
      });
    }

    $scope.showComment = false;
    $scope.togComment = function () {
      $scope.showComment = !$scope.showComment;
      if ($scope.showComment == true) {
        $("#aComment").show();
        $("#acontent").style.bottom(44);
      } else {
        $("#aComment").hide();
        $("#acontent").css("botttom", "0px ！importanrt");
      }
    }
    $scope.creatcom = function (A) {
      $scope.a_comment = true;
      $scope.send_content = '回复@' + A + ':'
      /* $scope.send_content = $sce.trustAsHtml('回复<a style="color:deepskyblue" ng-click="' + "goTo(activitycomment.user)" + '">@"+A+"</a>:');*/
      /* $scope.send_content = '回复<a style="color:deepskyblue" ng-click="' + "goTo(activitycomment.user)" + '">@"+A+"</a>:'
       $("#asend").focus();*/
    }
    $scope.gohBack = function () {
      if (LocalStorage.get("acthViewid") == "act1") {
        $state.go("tab.activity")
      } else {
        var backHistoryId = $ionicHistory.currentHistoryId();
        var backView = $ionicHistory.viewHistory().histories[backHistoryId].stack.filter(function (v) {
          return v.viewId === LocalStorage.get("acthViewid");
        })[0];
        $ionicHistory.backView(backView);
        $ionicHistory.goBack();
      }
    }
    $http.get('../data/activity/activity-detail.json').then(function (response) {
      if (response.data.status == 0) {
        $scope.activitydetail = response.data.detail;
      }
    });

    $http.get('../data/activity/activity-comment.json').then(function (response) {
      if (response.data.status == 0) {
        $scope.activitycommentlist = response.data.commentlist;
      }
    });

    $http.get('../data/activity/activity-comment-comment.json').then(function (response) {
      if (response.data.status == 0) {
        $scope.act_c_c_list = response.data.comment_comment_list;
      }
    });
    $scope.send = function () {
      if ($scope.activitycommentlist != '') {
        $scope.activitycommentlist.push({
          id: $scope.activitycommentlist.length + 1,
          avatar: 'img/ionic.png',
          user: 'Tony Soup',
          content: $scope.send_content,
          timestamp: '7-9 17:00',
          agreenum: 0
        });
        $scope.a_comment = false;
        $scope.send_content = '';
        $ionicScrollDelegate.scrollBottom();
      }
    }
  })

  .controller('myActCtrl', function ($scope, $ionicSlideBoxDelegate, $ionicLoading, $http, IP, $timeout, MyactService) {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 500,
      duration: 10000
    });
    var username = localStorage.getItem("username");
    $scope.slideIndex = 0
    MyactService.load(username, 0).then(function successCallback(response) {
      $ionicLoading.hide();
      console.log(response)
      if (response.data.status == 0) {
        $scope.myactivitylist = response.data.result;
      }
    }, function errorCallback(response) {
      console.error("活动查询失败!");
    });
    $scope.activeSlide = function (index) {
      $scope.slideIndex = index;
      $scope.viewmore = false;
      MyactService.load(username, index).then(function successCallback(response) {
        $ionicLoading.hide();
        if (response.data.status == 0) {
          $scope.myactivitylist = response.data.result;
          console.log($scope.myactivitylist)
        }
      }, function errorCallback(response) {
        console.error("活动查询失败!");
      });
    };
    $scope.gomyact = function (A) {
      $scope.actobj = A
      $scope.viewmore = true
    }
    $scope.gomylist = function () {
      $scope.viewmore = false
    };
  })
  /*发起活动*/
  .controller('newactCtrl', function ($scope, $ionicActionSheet, $http, IP, LocalStorage) {
    $scope.formData = {}
    $http.get(IP.info() + "/api/acttype")
      .then(function (response) {
        if (response.data.status == 0) {
          $scope.types = response.data.result;
          console.log($scope.types)
        } else {
          console.error('网络连接失败...');
        }
      });

    $scope.choosePicMenuf = function () {
      $ionicActionSheet.show({
        buttons: [{
          text: '拍照'
        }, {
          text: '从相册选择'
        }],
        cancelText: '取消',
        cancel: function () {
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
          $cordovaCamera.getPicture(options).then(　　　　　　　　　 //返回一个imageURI，记录了照片的路径
            function (imageURI) {
              imgitems.push({
                url: "data:image/jpeg;base64," + imageURI
              });
              $scope.items = imgitems;
              tobackimg = tobackimg + imageURI + ',';
            },
            function (err) {

            });
          return true;
        }
      });
    }
    $scope.save = function () {
      $scope.formData.username = LocalStorage.get("username", 0)
      $http({
        method: 'POST',
        url: IP.info() + '/api/addact',
        data: $.param($scope.formData)
      }).then(function successCallback(response) {
        console.log(response);
        if (response.data.status == 0) {
          console.log("保存成功!");
        }

      }, function errorCallback(response) {
        console.error("保存失败！");
      });
    }

  })
