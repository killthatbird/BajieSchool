/**
 * Created by Administrator on 2016/7/25.
 */
angular.module('ActCtrl', [])
  .controller('ActallCtrl', function ($scope, $ionicHistory, LocalStorage) {
  })
  .controller('ActivityCtrl', function ($scope, $state, $http, LocalStorage) {

    var username = localStorage.getItem("username");
    $scope.actdetial = function (A) {
      LocalStorage.set("acthViewid", "act1");
      $state.go("actdetial", {actobj: A});
    }
    $http.get('http://localhost:8080/api/acttype/' + username).then(function (response) {
      if (response.data.status == 0) {
        $scope.tabs = response.data.result;
      }
    });

    //加载“banner”
    $http.get('http://localhost:8080/api/banner').then(function (response) {
      if (response.data.status == 0) {
        $scope.bannerlist = response.data.result;
      }
    });

    //默认加载“推荐”的activitylist
    $http.get('http://localhost:8080/api/' + username + '/activity/0').then(function (response) {
      if (response.data.status == 0) {
        $scope.activitylist = response.data.result;
      }
    });

    $scope.doRefreshAct = function () {
      $timeout(function () {
        $http.get("../data/activity/activity-list-refresh.json")
          .then(function (response) {
            if (response.data.status == 0) {
              $scope.activitylist = response.data.activitylist;
            } else {
              console.error('网络连接失败...');
            }
          });
        $scope.$broadcast('scroll.refreshComplete');
      }, 100);
    };


    $scope.currentTab = '推荐';
    // var currentTab = '推荐'
    $scope.onClickTab = function (tab) {
      $scope.currentTab = tab.actTypeName;
      //切换TAB时请求该TAB对应的数据

      var actTypeId = tab.actTypeId;
      console.log(actTypeId);

      /**
       * 根据点击TAB动态加载数据
       */
      $http.get('http://localhost:8080/api/' + username + '/activity/' + actTypeId).then(function (response) {
        if (response.data.status == 0) {
          $scope.activitylist = response.data.result;
        }
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
  .controller('actdetialCtrl', function ($scope, $stateParams, $state, $http, $ionicHistory, LocalStorage) {
    console.log($ionicHistory.viewHistory())
    if ($stateParams.actobj != null) {
      $scope.actobj = $stateParams.actobj;
    }
    $scope.showComment = false;
    $scope.showcom = false;
    $scope.seecom = function () {
      $scope.showComment = true;
    }
    $scope.seecom1 = function () {
      $scope.showcom = true;
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
  .controller('newactCtrl', function ($scope, $ionicActionSheet, $http, IP) {

    $http.get("http://localhost:8080/api/acttype")
      .then(function (response) {
        if (response.data.status == 0) {
          $scope.types = response.data.result;
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
      $http({
        method: 'POST',
        url: IP.info() + '/api/newact',
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
