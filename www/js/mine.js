/**
 * Created by Administrator on 2016/7/20.
 */
angular.module('MyCtrl', [])
  .controller('MineCtrl', function ($scope, $state, LocalStorage, $http) {

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

  /*  $scope.blocks = {
      "status": 0,
      "result": [
        {
          "name": "points",
          "size": 520
        }, {
          "name": "agenda",
          "size": 3
        }, {
          "name": "notification",
          "size": 2
        }, {
          "name": "collection",
          "size": 1
        }
      ]
    }*/

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

  .controller('myplanCtrl', function ($scope, $stateParams, $state) {
    $scope.title = $stateParams.barTitle
    $scope.newplan = function () {
      $state.go("newplan")
    }
  })

  .controller('newplanCtrl', function ($scope, $state) {
    $scope.sets = [];
    $scope.disabled = false;
    $scope.add = function () {
      if ($scope.sets.length < 5) {
        $scope.disabled = false;
        var obj = {time: "7"};
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
