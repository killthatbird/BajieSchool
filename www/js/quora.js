/**
 * Created by Administrator on 2016/8/1.
 */
angular.module('quoraCtrl', [])
  .controller('QuoraCtrl', function ($scope, $stateParams, $ionicSlideBoxDelegate, $ionicModal, $ionicActionSheet, $state, $http) {
    $scope.question = {}
    $scope.qtitle = function (a) {
      $scope.question.title = a
    }
    var username = localStorage.getItem("username");
    $scope.showComment = false
    $scope.showMore = false
    $scope.slideIndex = 0;
    if ($stateParams.index != null) {
      $scope.slideIndex = $stateParams.index;
      $http.get("http://localhost:8080/api/quora/" + username + "/" + $scope.slideIndex)
        .then(function (response) {
          if (response.data.status == 0) {
            $scope.quoralist = response.data.result;
          } else {
            console.error('网络连接失败...');
          }
        });
    } else {
      $http.get("http://localhost:8080/api/quora/" + username)
        .then(function (response) {
          if (response.data.status == 0) {
            $scope.quoralist = response.data.result;
          } else {
            console.error('网络连接失败...');
          }
        });
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
      $state.go("qudetial", {quobj: A})
    }

    $scope.doRefresh = function (A) {
      console.log("LIIDE====" + A)
    }


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
    $scope.addqu = function () {
      $state.go("newque");
    }
    $scope.ask = function () {
      alert('I love you');
      $scope.question.username = localStorage.getItem("username");
      $scope.question.queImg = "";
      console.log($scope.question);
      $http({
        method: "POST",
        url: "http://localhost:8080/api/quora/ask",
        data: $.param($scope.question)
      }).then(function successCallback(response) {
        console.log('ask ok!');
        $scope.modal.hide();
        $state.go('tab.quora');
      }, function () {
        console.error('ask fail...');
      });
    }
  })

  .controller('askCtrl', function ($state, $scope, $http, $ionicActionSheet) {
    $scope.queTitle = "新增问题";
    $scope.question = {};
    $scope.imglist = [];
    //传到后台的图片片段
    var sImg = '';
    $scope.bindtitle = function (a) {
      if (a == "") {
        $scope.queTitle = "新增问题";
      } else {
        $scope.queTitle = a;
      }
    }

    $scope.choosePicMenuf = function () {
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          {text: '相机'},
          {text: '图库'}
        ],
        titleText: '选择照片',
        cancelText: '取消',
        cancel: function () {
          return true;
        },
        /*=== cordova-plugin-camera=====*/
        /* ===cordova-plugin-x-toast====*/
        /*===cordova-plugin-file====*/
        /*  buttonClicked: function (index) {
         switch (index) {
         case 0:
         Camera.appendByCamera().then(function (imageData) {
         fileUpload.go(imageData).then(function (result) {
         $scope.imglist.push(imageData)
         $scope.question.queImg = result.response;
         sImg += '<p><img src="' + result.response + '" style="max-width: 100%"/></p>';
         $ionicLoading.hide()
         $cordovaToast.showShortCenter("上传成功！")
         }, function (err) {
         $ionicLoading.hide()
         console.error("ERROR: " + angular.toJson(err));
         $cordovaToast.showShortCenter("上传失败，请检查网络！")
         }, function (progress) {
         var downloadProgress = (progress.loaded / progress.total) * 100;
         $ionicLoading.show({
         template: "已经上传：" + Math.floor(downloadProgress) + "%"
         });
         if (downloadProgress > 99) {
         $ionicLoading.hide();
         }
         })
         });
         break;
         case 1:
         Camera.appendByPhoto().then(function (imageData) {
         /!*imageData=imageData.substring(0,imageData.indexOf('?'))
         console.log("2:"+imageData)*!/
         fileUpload.go(imageData).then(function (result) {
         $scope.imglist.push(imageData)
         $scope.question.queImg = result.response;
         sImg += '<p><img src="' + result.response + '" style="max-width: 100%"/></p>'
         $ionicLoading.hide()
         $cordovaToast.showShortCenter("上传成功！")
         }, function (err) {
         $ionicLoading.hide()
         console.error("ERROR: " + angular.toJson(err));
         $cordovaToast.showShortCenter("上传失败，请检查网络！")
         }, function (progress) {
         var downloadProgress = (progress.loaded / progress.total) * 100;
         $ionicLoading.show({
         template: "已经上传：" + Math.floor(downloadProgress) + "%"
         });
         if (downloadProgress > 99) {
         $ionicLoading.hide();
         }
         })
         });
         break;
         default:
         break;
         }
         return true;
         }*/
      });
    }
    $scope.ask = function () {
      $scope.question.username = localStorage.getItem("username");
      $scope.question.queImg = "";
      console.log($scope.question);
      $http({
        method: "POST",
        url: "http://localhost:8080/api/quora/ask",
        data: $.param($scope.question)
      }).then(function successCallback(response) {
        console.log('ask ok!');
        $state.go('tab.quora', {index: 1});
      }, function () {
        console.error('ask fail...');
      });
    }
  })

  .controller('qudetialCtrl', function ($scope, $state, $http, $stateParams, $ionicModal, IP) {
    $scope.gz = true;
    $scope.dzlike = true;
    $scope.question = $stateParams.quobj
    $scope.isgz = function () {
      $scope.gz = !$scope.gz
    }
    $scope.addlike = function (A, B) {
      $scope.dzlike = false;
      $scope.question.queLike = A + 1;
      $http({
        method: 'POST',
        url: IP.info() + '/api/quora/updlike',
        params: {id: B}
      }).then(function successCallback(response) {
        console.log("点赞成功!");
      }, function errorCallback(response) {
        console.error("点赞失败!");
      });
    }

    $scope.comlist = function () {
      $state.go("comlist");
    }
    $ionicModal.fromTemplateUrl('modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.smodal = modal;
    });
    $scope.openModal = function () {
      $scope.smodal.show();
    };
    $scope.closeModal = function () {
      $scope.smodal.hide();
    };
    $http.get("../data/quora/quora-answerlist-detail.json")
      .then(function (response) {
        if (response.data.status == 0) {
          $scope.answerlist = response.data.answer.list;
          $scope.totalanswer = response.data.answer.totalanswer;
          /*$scope.question = response.data.question;*/
        } else {
          console.error('网络连接失败...');
        }
      });
    $scope.ansdetail = function (answerobj, questionobj) {
      $state.go("ansdetail", {answer: answerobj, question: questionobj});
    }
  })

  .controller('comlistCtrl', function ($scope, $state, $http) {
    $scope.q_comment = false
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
      if ($scope.commentlist != '') {
        $scope.commentlist.push({
          id: $scope.commentlist.length + 1,
          avatar: 'img/ionic.png',
          nickname: 'Tony Soup',
          content: $scope.send_content,
          timestamp: '7-9 17:00',
          agreenum: 0
        });
        $scope.q_comment = false;
        $scope.send_content = ''
      }
    }
    $scope.replay = function (A) {
      $scope.q_comment = true;
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
