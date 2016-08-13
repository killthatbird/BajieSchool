/**
 * Created by Administrator on 2016/7/25.
 */
angular.module('StudyCtrl', [])
  .controller('StudysCtrl', function ($scope, $state, $timeout, LocalStorage, $http) {
    $scope.valueh = $(".aui-col-xs-3")[0].offsetWidth;
    LocalStorage.set("stuh", $scope.valueh)
    $scope.myheight = $scope.valueh + 'px';
    $scope.sth = $scope.valueh * 0.7 + 'px';
    $scope.remove = false;
    $scope.showComment = false;
    $scope.showMore = false;
    $scope.stype = [{
      id: 1,
      title: '考研',
      bg: '#e4842e'
    }, {
      id: 2,
      title: '英语',
      bg: '#e5b31c'
    }, {
      id: 3,
      title: '出国',
      bg: '#67bc95'
    }, {
      id: 4,
      title: '公务员',
      bg: '#bad3b5'
    }, {
      id: 5,
      title: '计算机',
      bg: '#935996'
    }, {
      id: 6,
      title: '四六级',
      bg: '#8dc759'
    }, {
      id: 7,
      title: '考前预习',
      bg: '#e26b8b'
    }];

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

  .controller('studetialCtrl', function ($scope, $state) {
    $scope.comlist = function () {
      $state.go("comlist")
    }
    $scope.anslist = function () {
      $state.go("anslist")
    }
  })
  .controller('comlistCtrl', function ($scope, $state) {
    $scope.showcom=false
    $scope.send_content='';
    $scope.comlist =[{
      id: 1,
      heaimg:'img/ben.png',
      nickname:'AUI',
      content: '广角换长焦？',
      time:'8-2 08:00',
      agreenum: '35'
    }, {
      id: 2,
      heaimg:'img/me.png',
      nickname:'绿化撒哈拉',
      content: '广角换长焦？',
      time:'8-9 21:00',
      agreenum: '23'
    },
      {
        id: 3,
        heaimg:'img/adam.jpg',
        nickname:'AUI',
        content: '广角换长焦？',
        time:'8-9 08:00',
        agreenum: '350'
      }, {
        id: 4,
        heaimg:'img/ionic.png',
        nickname:'绿化撒哈拉',
        content: '广角换长焦？',
        time:'8-9 21:00',
        agreenum: '23'
      }];
    $scope.send=function () {
      if($scope.send_content!=''){
        $scope.comlist.push({
          id: $scope.comlist.length + 1,
          heaimg:'img/ionic.png',
          nickname:'Tony Soup',
          content: $scope.send_content,
          time: '7-9 17:00',
          agreenum:0
        });
        $scope.send_content=''
      }

    }

  })
  .controller('anslistCtrl', function ($scope, $state) {
    $scope.choose=true
    $scope.gocom = function () {
      $state.go("comlist")
    }
    $scope.attention = function () {
      $scope.choose = !$scope.choose
    }
  })
  .controller('stutypeCtrl', function ($scope, $state, LocalStorage) {
    $scope.valueh = LocalStorage.get("stuh")
    $scope.myheight = $scope.valueh + 'px';
    $scope.sth = $scope.valueh * 0.7 + 'px';
    $scope.stype = [{
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
    $scope.addtype = function (A) {
      LocalStorage.set("stutype", A)
      $state.go("tab.study", {}, {reload: true})
    }
  })
