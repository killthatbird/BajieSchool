/**
 * Created by Administrator on 2016/7/25.
 */
angular.module('ActCtrl', [])
  .controller('ActivityCtrl', function ($scope, $state) {
    $scope.actdetial = function () {
      $state.go("actdetial")
    }
    $scope.tabs = [{
      title: '推荐',
      url: 'one.tpl.html'
    }, {
      title: '体育',
      url: 'two.tpl.html'
    }, {
      title: '旅游',
      url: 'two.tpl.html'
    }, {
      title: '音乐',
      url: 'two.tpl.html'
    }, {
      title: '舞蹈',
      url: 'two.tpl.html'
    }, {
      title: '联谊',
      url: 'two.tpl.html'
    }, {
      title: '学习',
      url: 'three.tpl.html'
    }];

    $scope.activitylist = [
      {
        title: "周杰伦演唱会",
        content: "8月17日，周杰伦将在武汉光谷广场举办演唱会",
        imgSrc: "img/activity/act/周杰伦.jpg",
        timestamp: "1分钟前",
        follownum: 23,
        commentnum: 100
      }, {
        title: "科技展览",
        content: "VR,无人机，无人驾驶，机器人等在武汉大学开办展会",
        imgSrc: "img/activity/act/科技展览.jpeg",
        timestamp: "1小时前",
        follownum: 56,
        commentnum: 108
      }, {
        title: "数学建模大赛",
        content: "阿里巴巴天池大数据竞赛",
        imgSrc: "img/activity/act/阿里巴巴.jpg",
        timestamp: "2小时前",
        follownum: 165,
        commentnum: 548
      }
    ];

    $scope.currentTab = '推荐'
    $scope.onClickTab = function (tab) {
      $scope.currentTab = tab.title;
    }
    $scope.isActivetab = function (tabUrl) {
      return tabUrl == $scope.currentTab;
    }
    $scope.searchContent = '';
    $scope.reset = function ($event) {
      $scope.searchContent = '';
    }
  })
  /*活动详情*/
  .controller('actdetialCtrl', function ($scope) {
    $scope.showComment = false;
    $scope.showcom = false;
    $scope.seecom = function () {
      $scope.showComment = true;
    }
    $scope.seecom1 = function () {
      $scope.showcom = true;
    }
  })
  .controller('myActCtrl', function ($scope, $ionicSlideBoxDelegate) {
    $scope.slideIndex = 0;
    $scope.slideChanged = function (index) {
      $scope.slideIndex = index;
    };
    $scope.activeSlide = function (index) {
      $ionicSlideBoxDelegate.slide(index);
    };
  })
  /*发起活动*/
  .controller('newactCtrl', function ($scope, $ionicActionSheet) {

    $scope.classes = [
      "科技", "艺术", "设计"
    ];

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
  /*已发布的活动*/
  .controller('puactCtrl', function ($scope, $state) {
    $scope.viewmore = false;
    $scope.gopuact = function () {
      $scope.viewmore = true
    }
    $scope.gopulist = function () {
      $scope.viewmore = false
    };
    $scope.publishedactivitylist = [
      {
        title: "周杰伦演唱会",
        content: "8月17日，周杰伦将在武汉光谷广场举办演唱会",
        imgSrc: "img/activity/act/周杰伦.jpg",
        timestamp: "1分钟前",
        follownum: 23,
        commentnum: 100
      }, {
        title: "科技展览",
        content: "VR,无人机，无人驾驶，机器人等在武汉大学开办展会",
        imgSrc: "img/activity/act/科技展览.jpeg",
        timestamp: "1小时前",
        follownum: 56,
        commentnum: 108
      }
    ];
  })
  /*已参加的活动*/
  .controller('attactCtrl', function ($scope) {
    $scope.joinactivitylist = [
      {
        title: "周杰伦演唱会",
        content: "8月17日，周杰伦将在武汉光谷广场举办演唱会",
        imgSrc: "img/activity/act/周杰伦.jpg",
        timestamp: "1分钟前",
        follownum: 23,
        commentnum: 100
      }, {
        title: "科技展览",
        content: "VR,无人机，无人驾驶，机器人等在武汉大学开办展会",
        imgSrc: "img/activity/act/科技展览.jpeg",
        timestamp: "1小时前",
        follownum: 56,
        commentnum: 108
      }, {
        title: "武汉大学樱花节",
        content: "江城多山，珞珈独秀；山上有黉，武汉大学。武汉大学是国家教育部直属重点综合性大学，是国家“985工程”和“211工程”重点建设高校。武汉大学溯源于1893年清末湖广总督张之洞" +
        "奏请清政府创办的自强学堂，历经传承演变，1928年定名为国立武汉大学，是近代中国第一批国立大学。",
        imgSrc: "img/activity/act/武汉大学樱花节.jpg",
        timestamp: "2小时前",
        follownum: 1654,
        commentnum: 16554
      }, {
        title: "汉阳造一日游",
        content: "寻找江城最文艺的角落",
        imgSrc: "img/activity/act/汉阳造.jpeg",
        timestamp: "4小时前",
        follownum: 416,
        commentnum: 1654
      }
    ];
  })
;
