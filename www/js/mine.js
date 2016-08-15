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

    $.get('../data/visitor.json').done(function (data) {
      myChart.hideLoading();
      // 填入数据
      myChart.setOption({
        xAxis: {
          data: data.categories
        },
        series: [{
          // 根据名字对应到相应的系列
          name: '访问量',
          data: data.data
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
  })

  .controller('myplanCtrl', function ($scope, $stateParams, $state, $http) {
    $scope.title = $stateParams.barTitle;
    $scope.newplan = function () {
      $state.go("newplan")
    }

    $http.get("../data/mine/mine-agenda.json")
      .then(function (response) {
        if (response.data.status == 0) {
          $scope.agendalist = response.data.aglist;
        } else {
          console.error('网络连接失败...');
        }
      });

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
;
