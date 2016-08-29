/**
 * Created by Administrator on 2016/7/25.
 */
angular.module('ActCtrl', [])
  .controller('ActallCtrl', function ($scope, $ionicHistory) {
  })
  .controller('ActivityCtrl', function ($scope, $state, $http, $ionicLoading, $timeout, $ionicSlideBoxDelegate) {
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
      url: 'http://localhost:8080/api/activityALL',
      params: {username: username, type: 0}
    }).then(function successCallback(response) {
      $ionicLoading.hide();
      console.log(response)
      if (response.data.status == 0) {
        $scope.activitylist = response.data.result.Activity;
        console.log($scope.activitylist)
        $scope.tabs = response.data.result.ActivityType;
        $scope.bannerlist = response.data.result.Banner;
      }
    }, function errorCallback(response) {
      console.error("活动查询失败!");
    });
    /*  $ionicSlideBoxDelegate.update();*/

    /*  $http.get('http://localhost:8080/api/acttype/').then(function (response) {
     if (response.data.status == 0) {
     $scope.tabs = response.data.result;
     }
     });

     //加载“banner”
     $http.get('http://localhost:8080/api/banner').then(function (response) {
     if (response.data.status == 0) {
     $scope.bannerlist = response.data.result;
     }
     });*/

    //重写加载“默认”的activitylist
    /*   $http({
     method: 'POST',
     url: 'http://localhost:8080/api/activity',
     params: {username: username, type: 0}
     }).then(function successCallback(response) {
     $ionicLoading.hide();
     if (response.data.status == 0) {
     $scope.activitylist = response.data.result;
     }
     }, function errorCallback(response) {
     console.error("活动查询失败!");
     });*/

    $scope.doRefreshAct = function () {
      $http({
        method: 'POST',
        url: 'http://localhost:8080/api/activity',
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
        url: 'http://localhost:8080/api/activity/',
        params: {username: username, type: actTypeId}
      }).then(function successCallback(response) {
        $ionicLoading.hide();
        if (response.data.status == 0) {
          $scope.activitylist = response.data.result;
        }
      }, function errorCallback(response) {
        console.error("活动查询失败!");
      });

      /*      switch ($scope.currentTab) {
       case "推荐": {
       $http.get('http://localhost:8080/api/' + username + '/activity/0').then(function (response) {
       if (response.data.status == 0) {
       $scope.activitylist = response.data.result;
       }
       });
       }

       case "体育": {
       $http.get('../data/activity/tabs/activity-list-sports.json').then(function (response) {
       if (response.data.status == 0 && response.data.category == tab.title) {
       $scope.activitylist = response.data.activitylist;
       }
       });
       }

       case "旅游": {
       $http.get('../data/activity/tabs/activity-list-trip.json').then(function (response) {
       if (response.data.status == 0 && response.data.category == tab.title) {
       $scope.activitylist = response.data.activitylist;
       }
       });
       }

       case "明星": {
       $http.get('../data/activity/tabs/activity-list-star.json').then(function (response) {
       if (response.data.status == 0 && response.data.category == tab.title) {
       $scope.activitylist = response.data.activitylist;
       }
       });
       }

       case "电影": {
       $http.get('../data/activity/tabs/activity-list-movie.json').then(function (response) {
       if (response.data.status == 0 && response.data.category == tab.title) {
       $scope.activitylist = response.data.activitylist;
       }
       });
       }

       case "恋爱": {
       $http.get('../data/activity/tabs/activity-list-love.json').then(function (response) {
       if (response.data.status == 0 && response.data.category == tab.title) {
       $scope.activitylist = response.data.activitylist;
       }
       });
       }
       }*/


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
  .controller('actdetialCtrl', function ($scope, $stateParams, $sce, $state, $http, $ionicHistory, $ionicScrollDelegate, LocalStorage) {
    $scope.a_comment = false;
    if ($stateParams.actobj != null) {
      $scope.actobj = $stateParams.actobj;
    }
    $scope.showComment = false;
    $scope.seecom = function () {
      $scope.showComment = true;
    }
    $scope.creatcom = function (A) {
      $scope.a_comment = true;
      $scope.send_content = $sce.trustAsHtml('回复<a style="color:deepskyblue" ng-click="' + "goTo(activitycomment.user)" + '">@"+A+"</a>:');
      /* $scope.send_content = '回复<a style="color:deepskyblue" ng-click="' + "goTo(activitycomment.user)" + '">@"+A+"</a>:'
       $("#asend").focus();*/
    }
    $scope.goTo = function (A) {
      console.log(A)
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

  .controller('myActCtrl', function ($scope, $ionicSlideBoxDelegate, $http, $timeout) {
    $scope.slideIndex = 0;
    $scope.slideChanged = function (index) {
      $scope.slideIndex = index;
    };
    $scope.activeSlide = function (index) {
      $ionicSlideBoxDelegate.slide(index);
    };

  })

  /*发起活动*/
  .controller('newactCtrl', function ($scope, $ionicActionSheet, $http, IP, LocalStorage) {
    $scope.formData = {}
    $http.get("http://localhost:8080/api/acttype")
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
  /*已发布的活动*/
  .controller('puactCtrl', function ($scope, $http, $state) {
    var username = localStorage.getItem("username");
    $scope.viewmore = false;
    $scope.gopuact = function (A) {
      $scope.actobj = A
      $scope.viewmore = true
    }
    $scope.gopulist = function () {
      $scope.viewmore = false
    };

    $http.get('http://localhost:8080/api/activity/launch/' + username + '/0')
      .then(function (response) {
        if (response.data.status == 0) {
          $scope.publishedactivitylist = response.data.result;
        } else {
          console.error('网络连接失败...');
        }
      });

  })

  /*已参加的活动*/
  .controller('attactCtrl', function ($scope, $http, $state) {
    var username = localStorage.getItem("username");
    $scope.gopuact = function (A) {
      $scope.actobj = A
      $scope.viewmore = true
    }
    $scope.gopulist = function () {
      $scope.viewmore = false
    };
    $http.get('http://localhost:8080/api/activity/launch/' + username + '/1')
      .then(function (response) {
        if (response.data.status == 0) {
          $scope.joinactivitylist = response.data.result;
        } else {
          console.error('网络连接失败...');
        }
      });
  });
