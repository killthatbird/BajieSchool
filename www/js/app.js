// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'controllers', 'directives', 'services', 'StudyCtrl', 'MyCtrl', 'MessageCtrl', 'ActCtrl', 'TourCtrl', 'quoraCtrl', 'ngAnimate'])

  .run(function ($ionicPlatform, $http, messageService, dateService) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      var url = "";
      if (ionic.Platform.isAndroid()) {
        url = "/android_asset/www/";
      }
      $http.get(url + "data/json/messages.json").then(function (response) {
        // localStorageService.update("messages", response.data.messages);
        messageService.init(response.data.messages);
      });
      $http.get(url + "data/json/friends.json").then(function (response) {
        // console.log(response.data.results);
      });
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $ionicConfigProvider, $urlRouterProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      .state('tour', {
        url: '/tour',
        templateUrl: 'templates/tour/tour.html',
        controller: 'ToursCtrl'
      })

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      // Each tab has its own nav history stack:
      .state('tab.activity', {
        url: '/activity',
        views: {
          'tab-activity': {
            templateUrl: 'templates/tab-activity.html'
          }
        }
      })
      .state('activity', {
        url: '/activity',
        abstract: true,
        templateUrl: 'templates/tab-activity.html'
      })

      .state('activity.list', {
        url: '/list',
        views: {
          'activity-list': {
            templateUrl: 'templates/activity/activity-list.html'
          }
        }
      })
      .state('actdetial', {
        url: '/activity/actdetial',
        templateUrl: 'templates/activity/act-detial.html',
        params: {
          actobj: null
        },
        controller: 'actdetialCtrl'
      })
      .state('published', {
        url: '/activity/published',
        templateUrl: 'templates/activity/published-act.html',
        controller: 'puactCtrl'
      })
      .state('tab.chats', {
        url: '/chats',
        views: {
          'tab-chats': {
            templateUrl: 'templates/tab-chats.html',
            controller: 'ChatsCtrl'
          }
        }
      })
      .state('messageDetail', {
        url: '/messageDetail/:messageId',
        templateUrl: "templates/message/message-detail.html",
        controller: "messageDetailCtrl"
      })
      .state('tab.study', {
        url: '/study',
        cache: false,
        views: {
          'tab-study': {
            templateUrl: 'templates/tab-study.html',
            controller: 'StudysCtrl',
            params: {
              tname: null
            }
          }
        }
      })
      .state('stutype', {
        url: '/study/type',
        templateUrl: 'templates/study/stu-type.html',
        params: {
          hdata: null
        },
        controller: 'stutypeCtrl'
      })
      .state('studetial', {
        url: '/study/detial',
        templateUrl: 'templates/study/stu-detial.html',
        params: {
          hdata: null
        },
        controller: 'studetialCtrl'
      })
      .state('tab.quora', {
        url: '/quora',
        views: {
          'tab-quora': {
            templateUrl: 'templates/tab-quora.html',
            params: {
              index: null
            },
            controller: 'QuoraCtrl'
          }
        }
      })

      .state('quora', {
        url: '/quora',
        abstract: true,
        templateUrl: 'templates/tab-quora.html',
        params: {
          index: null
        },
        controller: 'QuoraCtrl'
      })

      .state('quora.list', {
        url: '/quora/list',
        templateUrl: 'templates/quora/quora-list.html'
      })

      .state('qmine', {
        url: '/quora/mine',
        templateUrl: 'templates/quora/quora-mine.html',
        controller: 'qmineCtrl'
      })
      .state('qudetial', {
        url: '/quora/detial',
        templateUrl: 'templates/quora/qu-detial.html',
        controller: 'qudetialCtrl'
      })
      .state('comlist', {
        url: '/quora/comlist',
        templateUrl: 'templates/quora/com-list.html',
        controller: 'comlistCtrl'
      })
      .state('ansdetail', {
        url: '/quora/ansdetail',
        templateUrl: 'templates/quora/ans-detail.html',
        controller: 'ansdetailCtrl',
        params: {
          answer: null,
          question: null
        }
      })
      .state('tab.mine', {
        url: '/mine',
        views: {
          'tab-mine': {
            templateUrl: 'templates/tab-mine.html',
            controller: 'MineCtrl'
          }
        }
      })
      .state('myplan', {
        url: '/mine/myplan',
        templateUrl: 'templates/mine/my_plan.html',
        params: {
          barTitle: null
        },
        controller: 'myplanCtrl'
      })
      .state('newplan', {
        url: '/mine/newplan',
        templateUrl: 'templates/mine/new_plan.html',
        controller: 'newplanCtrl'
      })
      .state('setting', {
        url: '/mine/setting',
        templateUrl: 'templates/mine/setting.html'
      })
      .state('pinfo', {
        url: '/mine/pinfo',
        templateUrl: 'templates/mine/pinfo.html',
        controller: 'pInfoCtrl'
      })

      .state('about', {
        url: '/mine/about',
        templateUrl: 'templates/mine/about.html'
      })

      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      })

      .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html'
      })
      .state('findin', {
        url: '/findin',
        templateUrl: 'templates/account/for-password.html',
        controller: 'findCtrl'
      })
      .state('newpass', {
        url: '/newpass',
        templateUrl: 'templates/account/new-password.html',
        controller: 'newpassCtrl'
      })
      .state('selsch', {
        url: '/register/step1',
        templateUrl: 'templates/sel-school.html',
        controller: 'selSchCtrl'
      });
    /*   $urlRouterProvider.otherwise('/login');*/
    // $urlRouterProvider.otherwise('/tab/activity');
    $urlRouterProvider.otherwise('/tour');
  });
