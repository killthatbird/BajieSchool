/**
 * Created by Administrator on 2016/7/25.
 */
angular.module('StudyCtrl', [])
  .controller('StudysCtrl', function ($scope, $state, $stateParams, LocalStorage) {
    $scope.valueh = $(".aui-col-xs-3")[0].offsetWidth;
    $scope.myheight = $scope.valueh + 'px';
    $scope.sth = $scope.valueh * 0.7 + 'px';
    $scope.remove = false;
    /*$scope.stype.push({
     title:'123467',
     bg: '#eee'
     });*/
    /* var text = $(".stu-warp").val();
     text = text.replace(/\r?\n/g, '< br /> ');*/
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
    $scope.gostype = function () {
      $state.go("stutype", {
        hdata: $scope.valueh
      })
    }
    $scope.doRefresh = function () {
      $scope.tname = LocalStorage.get("stutype")
      if ($scope.tname != null && $scope.tname != "undefined") {
        $scope.stype.push({
          title: $scope.tname,
          bg: 'green',
          id: $scope.stype.length + 1
        });
      }
    }
    $scope.delete = function (idx) {
      console.log(idx)
      $scope.stype.splice(idx, 1);
    }
  })
  .controller('stutypeCtrl', function ($scope, $stateParams, $state, LocalStorage) {
    $scope.valueh = $stateParams.hdata
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
