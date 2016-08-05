/**
 * Created by Administrator on 2016/7/20.
 */
angular.module('MyCtrl', [])
  .controller('MineCtrl', function ($scope, $state) {

    var myChart = echarts.init(document.getElementById('main'));

// 指定图表的配置项和数据
    var option = {
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    };

// 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

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
