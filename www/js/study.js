/**
 * Created by Administrator on 2016/7/25.
 */
angular.module('StudyCtrl', [])
  .controller('StudysCtrl', function ($scope, $state, $timeout, LocalStorage, $http) {
    $scope.currentTab = '推荐';
    $scope.onClickTab = function (tab) {
      $scope.currentTab = tab.title;

      $http.get("../data/study/tabs/study-list-cet.json")
        .then(function (response) {
          if (response.data.status == 0 && response.data.category == tab.title) {
            $scope.studylist = response.data.studylist;
          } else {
            console.error('网络连接失败...');
          }
        });

    }
    $scope.isActivetab = function (A) {
      return A == $scope.currentTab;
    }
    $scope.remove = false;
    $scope.showComment = false;
    $scope.showMore = false;

    $http.get("../data/study/study-type.json")
      .then(function (response) {
        if (response.data.status == 0) {
          $scope.stype = response.data.typelist;
        } else {
          console.error('网络连接失败...');
        }
      });

    $http.get("../data/study/study.json")
      .then(function (response) {
        if (response.data.status == 0 && response.data.category == "推荐") {
          $scope.studylist = response.data.studylist;
        } else {
          console.error('网络连接失败...');
        }
      });


    $scope.studetial = function () {
      $state.go("studetial")
    }
    $scope.gostype = function () {
      $state.go("stutype")
    }

    $scope.doRefresh = function () {
      var colorList = ["#e064b7", "#5ab770", "#ff7d23", "#ff0000", "#569ce3",
        "#ff768c", "#83ba1f", "#56c5ff", "#d2b48c", "#EE5F5B"];
      $scope.tname = LocalStorage.get("stutype")
      $timeout(function () {
        if ($scope.tname != null && $scope.tname != "undefined") {
          var colorIndex = Math.floor(Math.random() * colorList.length);
          var color = colorList[colorIndex];
          /*  for(var i=0;i<lineList.length;i++){
           var bgColor = getColorByRandom(colorList);
           }*/
          /*colorList.splice(colorIndex,1);*/
          $scope.stype.push({
            title: $scope.tname,
            bg: color,
            id: $scope.stype.length + 1
          });
        }
        $scope.$broadcast('scroll.refreshComplete');
      }, 100);
    }
    $scope.delete = function (idx) {
      console.log(idx)
      $scope.stype.splice(idx, 1);
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
  .controller('stutypeCtrl', function ($scope, $ionicPopup, $timeout) {
    $scope.tjTab = '推荐';
    $scope.isActivetab = function (A) {
      console.log(A == $scope.tjTab)
      return A == $scope.tjTab;
    }
    $scope.stype = [
      {
        title: '推荐'
      },
      {
        title: '考研'
      }, {
        title: '英语'
      }, {
        title: '出国'
      }, {
        title: '公务员'
      }, {
        title: '计算机'
      }, {
        title: '四六级'
      }, {
        title: '考前预习'
      }, {
        title: '政治学'
      }];
    $scope.removetype = function (idx) {
      $scope.stype.splice(idx, 1);
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
        $scope.stype.push({
          title: A,
          id: $scope.stype.length + 1
        });
      }
      /* LocalStorage.set("stutype", A)
       $state.go("tab.study", {}, {reload: true})*/
    }
  })
