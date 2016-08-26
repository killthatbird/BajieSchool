/**
 * Created by Administrator on 2016/8/1.
 */
angular.module('quoraCtrl', [])
  .controller('QuoraCtrl', function ($scope, $stateParams, $ionicSlideBoxDelegate, $ionicModal, $ionicActionSheet, $state, $http) {

    var username = localStorage.getItem("username");
    $scope.showComment = false
    $scope.showMore = false
    $scope.slideIndex = 0;
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
          /* $cordovaCamera.getPicture(options).then(　　　　　　　　　 //返回一个imageURI，记录了照片的路径
           function (imageURI) {
           imgitems.push({
           url: "data:image/jpeg;base64," + imageURI
           });
           $scope.items = imgitems;
           tobackimg = tobackimg + imageURI + ',';
           },
           function (err) {

           });*/
          return true;
        }
      });
    };

    $scope.answerlist = function () {
      $state.go("comlist");
    }

    $scope.goqu = function (A) {
      $state.go("qudetial")
    }

    $scope.doRefresh = function (A) {
      console.log("LIIDE====" + A)
    }

    $http.get("http://localhost:8080/api/quora/" + username)
      .then(function (response) {
        if (response.data.status == 0) {
          $scope.quoralist = response.data.result;
        } else {
          console.error('网络连接失败...');
        }
      });

    $scope.activeSlide = function (index) {
      $scope.slideIndex = index
      if (index == 0) {
        $http.get("http://localhost:8080/api/quora/" + username)
          .then(function (response) {
            if (response.data.status == 0) {
              $scope.quoralist = response.data.result;
            } else {
              console.error('网络连接失败...');
            }
          });
        console.log("slide 1");
      }
      else if (index == 1) {
        $http.get("http://localhost:8080/api/quora/" + username + "/0")
          .then(function (response) {
            if (response.data.status == 0) {
              $scope.quoralist = response.data.result;
            } else {
              console.error('网络连接失败...');
            }
          });
        console.log("slide 2");
      }
      else if (index == 2) {
        $http.get("http://localhost:8080/api/quora/" + username + "/1")
          .then(function (response) {
            if (response.data.status == 0) {
              $scope.quoralist = response.data.result;
            } else {
              console.error('网络连接失败...');
            }
          });
        console.log("slide 3");
      }
    };

    $scope.openModal = function () {
      $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
        $scope.modal.show();
      });
    }
  })

  .controller('askCtrl', function ($state, $scope, $http) {
    $scope.ask = function () {
      console.log("asking...");
      console.log($scope.question.queTitle);
      $http({
        method: "POST",
        url: "http://localhost:8080/api/quora/ask",
        params: {
          username: username,
          queTitle: $scope.question.queTitle,
          queTags: $scope.question.queTags,
          queContent: $scope.question.queContent,
          queImg: $scope.question.queImg
        }
      }).then(function successCallback(response) {
        console.log('ask ok!');
      }, function () {
        console.error('ask fail...');
      });
    }
  })

  .controller('qudetialCtrl', function ($scope, $state, $http, $ionicModal) {
    $scope.answerlist = function () {
      $state.go("comlist");
    }

    $scope.openModal = function () {
      $scope.modal.show();
    };
    $http.get("../data/quora/quora-answerlist-detail.json")
      .then(function (response) {
        if (response.data.status == 0) {
          $scope.answerlist = response.data.answer.list;
          $scope.totalanswer = response.data.answer.totalanswer;
          $scope.question = response.data.question;
        } else {
          console.error('网络连接失败...');
        }
      });
    $scope.ansdetail = function (answerobj, questionobj) {
      $state.go("ansdetail", {answer: answerobj, question: questionobj});
    }
  })

  .controller('comlistCtrl', function ($scope, $state, $http) {
    $scope.showcom = false
    $scope.send_content = '';
    $http.get("../data/quora/comment.json")
      .then(function (response) {
        if (response.data.status == 0) {
          $scope.commentlist = response.data.commentlist;
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
  .controller('ansdetailCtrl', function ($scope, $state, $stateParams) {
    $scope.choose = true
    $scope.answer = $stateParams.answer;
    $scope.question = $stateParams.question;
    $scope.gocom = function () {
      $state.go("comlist")
    }
    $scope.attention = function () {
      $scope.choose = !$scope.choose
    }
  })
  /*  我的问题*/
  .controller('qmineCtrl', function ($scope, $ionicActionSheet, $http) {

    var username = localStorage.getItem("username");
    $http.get("http://localhost:8080/api/quora/" + username + "/0")
      .then(function (response) {
        if (response.data.status == 0) {
          $scope.myquestions = response.data.result;
        } else {
          console.error('网络连接失败...');
        }
      });


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
  })

  /*我的回答*/
  .controller('amineCtrl', function ($scope, $http) {

    var username = localStorage.getItem("username");
    $http.get("http://localhost:8080/api/quora/" + username + "/1")
      .then(function (response) {
        if (response.data.status == 0) {
          $scope.myanswerlist = response.data.result;
        } else {
          console.error('网络连接失败...');
        }
      });

  })
;
