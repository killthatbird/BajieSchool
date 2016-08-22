// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'controllers', 'directives', 'services', 'StudyCtrl', 'MyCtrl', 'AddCtrl', 'ActCtrl', 'TourCtrl', 'quoraCtrl', 'ngAnimate'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      /* var url = "";
       if (ionic.Platform.isAndroid()) {
       url = "/android_asset/www/";
       }*/
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

  .config(function ($stateProvider, $ionicConfigProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

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
            templateUrl: 'templates/tab-activity.html',
            controller: 'ActallCtrl'
          }
        }
      })
      .state('activity', {
        url: '/activity',
        abstract: true,
        templateUrl: 'templates/tab-activity.html'
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
      .state('newact', {
        url: '/activity/newact',
        templateUrl: 'templates/activity/new-act.html'
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
      .state('newstu', {
        url: '/study/newstu',
        templateUrl: 'templates/study/new-stu.html',
        controller: 'newstuCtrl'
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
      /*.state('tab.adds', {
       url: '/tab/adds',
       templateUrl: 'templates/tab-adds.html',
       controller: 'tabaddCtrl'
       })*/
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
      .state('newque', {
        url: '/quora/newque',
        templateUrl: 'templates/quora/new-que.html',
        controller: 'QuoraCtrl'
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
      .state('mycollection', {
        url: '/mine/mycollection',
        templateUrl: 'templates/mine/my_collection.html',
        controller: 'mycollectionCtrl'
      })

      .state('mynotice', {
        url: '/mine/mynotice',
        templateUrl: 'templates/mine/my_notice.html',
        controller: 'mynoticeCtrl'
      })

      .state('newplan', {
        url: '/mine/newplan',
        templateUrl: 'templates/mine/new_plan.html',
        controller: 'newplanCtrl'
      })
      .state('setting', {
        url: '/mine/setting',
        templateUrl: 'templates/mine/setting.html',
        controller: 'settingCtrl'
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
        templateUrl: 'templates/login.html'
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
