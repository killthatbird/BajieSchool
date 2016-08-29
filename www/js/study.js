/**
 * Created by Administrator on 2016/7/25.
 */
angular.module('StudyCtrl', [])
  .controller('StudysCtrl', function ($scope, $state, $timeout, LocalStorage, $http, $ionicLoading) {
    $scope.currentTab = '推荐';
    var username = localStorage.getItem("username");

    /**
     * 默认加载“推荐”
     */
    $http({
      method: 'POST',
      url: 'http://localhost:8080/api/study/' + 0,
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
        url: 'http://localhost:8080/api/study/' + tabIndex,
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
    $http.get("http://localhost:8080/api/studytype/" + username)
      .then(function (response) {
        if (response.data.status == 0) {
          $scope.stutypelist = response.data.result;
        } else {
          console.error('网络连接失败...');
        }
      });

    $scope.studetial = function () {
      $state.go("studetial")
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
    $http.get("http://localhost:8080/api/studyalltype")
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
  .controller('studetialCtrl', function ($scope, $state, $http) {
    $scope.choose = true
    $scope.attention = function () {
      $scope.choose = !$scope.choose
    }
    $scope.send_content = '';

    $http.get("../data/study/study-detail.json")
      .then(function (response) {
        if (response.data.status == 0) {
          $scope.comlist = response.data.comment.list;
          $scope.user = response.data.user;
          $scope.posting = response.data.posting;
        } else {
          console.error('网络连接失败...');
        }
      });

    $scope.send = function () {
      if ($scope.send_content != '') {
        $scope.comlist.push({
          id: $scope.comlist.length + 1,
          heaimg: 'img/ionic.png',
          nickname: 'Tony Soup',
          content: $scope.send_content,
          time: '7-9 17:00',
          agreenum: 0
        });
        $scope.send_content = ''
      }
    }
    $scope.replay = function (A) {
      $scope.send_content = '回复@' + A + ':'
    }
  })
  .controller('stutypeCtrl', function ($scope, $ionicPopup, $timeout, $http, $filter, IP, $stateParams) {
    $scope.tjTab = '推荐';
    $scope.stype = $stateParams.stypelist
    $scope.isActivetab = function (A) {
      return A == $scope.tjTab;
    }
    var colorList = ["#f18b1b", "#f58f85", "#74c75c", "#bcb1d6", "#44bb97", "#ebb904", "#9b5895", "#f59974"]
    $scope.bgc = colorList;

    var username = localStorage.getItem("username");
    $http.get("http://localhost:8080/api/studytype/" + username)
      .then(function (response) {
        if (response.data.status == 0) {
          $scope.stype = response.data.result;
        } else {
          console.error('网络连接失败...');
        }
      });

    $http.get("http://localhost:8080/api/unchosentypes/" + username)
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
  })
