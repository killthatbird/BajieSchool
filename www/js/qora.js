/**
 * Created by Administrator on 2016/8/1.
 */
angular.module('qoraCtrl', [])
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

  })
;