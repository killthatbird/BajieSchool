/**
 * Created by Administrator on 2016/7/25.
 */
angular.module('ActCtrl', [])
  .controller('ActivityCtrl', function ($scope, $state, $http) {
    $scope.actdetial = function (A) {
      $state.go("actdetial", {actobj: A})
    }

    $http.get('../data/activity/tabs.json').then(function (response) {
      if (response.data.status == 0) {
        $scope.tabs = response.data.tabs;
      }
    });

    //默认加载“推荐”的activitylist
    $http.get('../data/activity/activity-list.json').then(function (response) {
      if (response.data.status == 0) {
        $scope.activitylist = response.data.activitylist;
      }
    });


    $scope.currentTab = '推荐';
    // var currentTab = '推荐'
    $scope.onClickTab = function (tab) {
      $scope.currentTab = tab.title;
      //切换TAB时请求该TAB对应的数据

      switch ($scope.currentTab) {
        case "推荐": {
          $http.get('../data/activity/activity-list.json').then(function (response) {
            if (response.data.status == 0) {
              $scope.activitylist = response.data.activitylist;
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

      }
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
  .controller('actdetialCtrl', function ($scope,$stateParams) {
    if($stateParams.actobj!=null){
      $scope.actobj = $stateParams.actobj;
      console.log($scope.actobj)
    }
    $scope.showComment = false;
    $scope.showcom = false;
    $scope.seecom = function () {
      $scope.showComment = true;
    }
    $scope.seecom1 = function () {
      $scope.showcom = true;
    }
  })
  .controller('myActCtrl', function ($scope, $ionicSlideBoxDelegate, $http) {
    $scope.slideIndex = 0;
    $scope.slideChanged = function (index) {
      $scope.slideIndex = index;
    };
    $scope.activeSlide = function (index) {
      $ionicSlideBoxDelegate.slide(index);
    };

    $scope.doRefresh = function () {
      $http.get('/')
        .success(function (newItems) {
          $scope.items = newItems;
        })
        .finally(function () {
          // Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
        });
    };
  })
  /*发起活动*/
  .controller('newactCtrl', function ($scope, $ionicActionSheet, $http) {

    $http.get("../data/activity/activity-class.json")
      .then(function (response) {
        if (response.data.status == 0) {
          $scope.classes = response.data.classes;
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

  })
  /*已发布的活动*/
  .controller('puactCtrl', function ($scope, $http,$state) {
    $scope.viewmore = false;
    $scope.gopuact = function (A) {
      $scope.actobj=A
      $scope.viewmore = true
    }
    $scope.gopulist = function () {
      $scope.viewmore = false
    };
    $http.get("../data/activity/activity-published.json")
      .then(function (response) {
        if (response.data.status == 0) {
          $scope.publishedactivitylist = response.data.activitylist;
        } else {
          console.error('网络连接失败...');
        }
      });

  })

  /*已参加的活动*/
  .controller('attactCtrl', function ($scope, $http,$state) {
    $scope.gopuact = function (A) {
      $scope.actobj=A
      $scope.viewmore = true
    }
    $scope.gopulist = function () {
      $scope.viewmore = false
    };
    $http.get("../data/activity/activity-join.json")
      .then(function (response) {
        if (response.data.status == 0) {
          $scope.joinactivitylist = response.data.activitylist;
        } else {
          console.error('网络连接失败...');
        }
      });
  });
