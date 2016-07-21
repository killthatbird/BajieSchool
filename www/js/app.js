// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ionic.animationFrameThrottle'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
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

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      .state('tour', {
        url: '/tour',
        templateUrl: 'templates/tour/tour.html',
        controller: 'TourCtrl'
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
            controller: 'ActivityCtrl'
          }
        }
      })

      .state('activity', {
        url: '/activity',
        abstract: true,
        templateUrl: 'templates/tab-activity.html'
      })

      .state('activity.list', {
        url: '/activity/list',
        views: {
          'activity-list': {
            templateUrl: 'templates/activity/activity-list.html'
          }
        }
      })

      .state('activity.mine', {
        url: '/activity/mine',
        views: {
          'activity-mine': {
            templateUrl: 'templates/activity/activity-mine.html'
          }
        }
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

      .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': {
            templateUrl: 'templates/chat-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })

      .state('tab.study', {
        url: '/study',
        views: {
          'tab-study': {
            templateUrl: 'templates/tab-study.html',
            controller: 'StudyCtrl'
          }
        }
      })

      .state('tab.quora', {
        url: '/quora',
        views: {
          'tab-quora': {
            templateUrl: 'templates/tab-quora.html',
            controller: 'QuoraCtrl'
          }
        }
      })

      .state('quora', {
        url: '/quora',
        abstract: true,
        templateUrl: 'templates/tab-quora.html'
      })

      .state('quora.list', {
        url: '/quora/list',
        views: {
          'quora-list': {
            templateUrl: 'templates/quora/quora-list.html'
          }
        }
      })

      .state('quora.mine', {
        url: '/quora/mine',
        views: {
          'quora-mine': {
            templateUrl: 'templates/quora/quora-mine.html'
          }
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

      .state('setting', {
        url: '/mine/setting',
        templateUrl: 'templates/mine/setting.html'
      })

      .state('about', {
        url: '/mine/about',
        templateUrl: 'templates/mine/about.html'
      });

// if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/activity');

  });
