/**
 * Created by Administrator on 2016/8/1.
 */
angular.module('quoraCtrl', [])
  .controller('QuoraCtrl', function ($scope, $stateParams, $ionicSlideBoxDelegate, $state, $http) {
    $scope.showComment = false
    $scope.showMore = false
    $scope.slideIndex = 0;
    $scope.goqu = function (A) {
      $state.go("qudetial")
    }
    // Called each time the slide changes
    $scope.slideChanged = function (index) {
      $scope.slideIndex = index;
      console.log("slide Change");
      if ($scope.slideIndex == 0) {
        console.log("slide 1");
      }
      else if ($scope.slideIndex == 1) {
        console.log("slide 2");
      }
      else if ($scope.slideIndex == 2) {
        console.log("slide 3");
      }
    };
    $scope.doRefresh = function (A) {
      console.log("LIIDE====" + A)
    }
    $scope.activeSlide = function (index) {
      $ionicSlideBoxDelegate.slide(index);
    };

    $http.get("../data/quora/quora.json")
      .then(function (response) {
        if (response.data.status == 0) {
          $scope.allquoralist = response.data.quoralist;
        } else {
          console.error('网络连接失败...');
        }
      });

  })

  .controller('qudetialCtrl', function ($scope, $state) {
    $scope.answerlist = function () {
      $state.go("comlist")
    }
    $scope.anslist = function () {
      $state.go("anslist")
    }
  })

  .controller('comlistCtrl', function ($scope, $state, $http) {
    $scope.showcom = false
    $scope.send_content = '';
    /*$scope.comlist = [{
     id: 1,
     heaimg: 'img/ben.png',
     nickname: 'AUI',
     content: '广角换长焦？',
     time: '8-2 08:00',
     agreenum: '35'
     }, {
     id: 2,
     heaimg: 'img/me.png',
     nickname: '绿化撒哈拉',
     content: '广角换长焦？',
     time: '8-9 21:00',
     agreenum: '23'
     },
     {
     id: 3,
     heaimg: 'img/adam.jpg',
     nickname: 'AUI',
     content: '广角换长焦？',
     time: '8-9 08:00',
     agreenum: '350'
     }, {
     id: 4,
     heaimg: 'img/ionic.png',
     nickname: '绿化撒哈拉',
     content: '广角换长焦？',
     time: '8-9 21:00',
     agreenum: '23'
     }];*/
    $http.get("../data/quora/quora-answerlist-detail.json")
      .then(function (response) {
        console.log('get method is in');
        if (response.data.status == 0) {
          $scope.answerlist = response.data.answer.list;
          $scope.totalanswer = response.data.answer.totalanswer;
          $scope.question = response.data.question;
          console.log('I love you');
        } else {
          console.error('网络连接失败...');
        }
      });

    $scope.send = function () {
      if ($scope.send_content != '') {
        $scope.answerlist.push({
          id: $scope.answerlist.length + 1,
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
  .controller('anslistCtrl', function ($scope, $state) {
    $scope.choose = true
    $scope.gocom = function () {
      $state.go("comlist")
    }
    $scope.attention = function () {
      $scope.choose = !$scope.choose
    }
  })
  /*  我的问题*/
  .controller('qmineCtrl', function ($scope, $ionicActionSheet, $http) {
    $scope.addqu = false;
    $scope.add = function () {
      $scope.addqu = true
      $scope.quurl = 'templates/quora/new-que.html'
    }
    $scope.mqlist = function () {
      $scope.addqu = true
      $scope.quurl = 'templates/quora/quora-mine.html'
    }
    $scope.resect = function () {
      $scope.reset = false
    }
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

  /*我的回答*/
  .controller('amineCtrl', function ($scope, $http) {

    $http.get("../data/quora/quora.json")
      .then(function (response) {
        if (response.data.status == 0) {
          $scope.myquoralist = response.data.quoralist;
        } else {
          console.error('网络连接失败...');
        }
      });
  })
;
