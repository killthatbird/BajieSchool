/**
 * Created by Administrator on 2016/8/1.
 */
angular.module('quoraCtrl', [])
  .controller('QuoraCtrl', function ($scope, $stateParams, $ionicSlideBoxDelegate) {
    $scope.slideIndex = 0;
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

    $scope.activeSlide = function (index) {
      $ionicSlideBoxDelegate.slide(index);
    };

    $scope.allquoralist = [
      {
        imgSrc: "img/me.png",
        title: "如何规划自己的大学生活",
        timestamp: "2小时前",
        content: "大学生如何正确地规划自己的大学生活呢？好好学习，天天向上！",
        follownum: 562,
        commentnum: 520
      }, {
        imgSrc: "img/ionic.png",
        title: "军训那些事",
        timestamp: "3小时前",
        content: "太阳大，天气酷暑难耐，如何避免中暑？好好学习，天天向上！好好学习，天天向上！",
        follownum: 56,
        commentnum: 40
      }, {
        imgSrc: "img/adam.jpg",
        title: "如何学好高等数学",
        timestamp: "4小时前",
        content: "作为基础学科，如何学好高等数学不挂科？好好学习，天天向上！好好学习，天天向上！",
        follownum: 556,
        commentnum: 120
      }
    ]

  })
  /*  我的问题*/
  .controller('qmineCtrl', function ($scope, $ionicActionSheet) {
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
  /*  .controller('nqueCtrl', function ($scope,$state) {
   $scope.mqlist =function () {
   /!*$scope.addqu=true*!/
   $state.go("tab.quora",{index:2});
   }
   })*/

  /*我的回答*/
  .controller('amineCtrl', function ($scope) {
    $scope.myquoralist = [
      {
        imgSrc: "img/me.png",
        title: "如何规划自己的大学生活",
        timestamp: "2小时前",
        content: "大学生如何正确地规划自己的大学生活呢？好好学习，天天向上！",
        follownum: 562,
        commentnum: 520
      }, {
        imgSrc: "img/ionic.png",
        title: "军训那些事",
        timestamp: "3小时前",
        content: "太阳大，天气酷暑难耐，如何避免中暑？好好学习，天天向上！好好学习，天天向上！",
        follownum: 56,
        commentnum: 40
      }
    ]
  })
;
