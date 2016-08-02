/**
 * Created by Administrator on 2016/8/2.
 */
angular.module('MessageCtrl', [])
  .controller('ChatsCtrl', function($scope, $state, $ionicPopup, localStorageService, messageService) {
    $scope.$on("$ionicView.beforeEnter", function(){
      console.log($scope.messages);
      $scope.messages = messageService.getAllMessages();
      $scope.popup = {
        isPopup: false,
        index: 0
      };
    });
    $scope.messages = messageService.getAllMessages();
    console.log($scope.messages);
    $scope.popup = {
      isPopup: false,
      index: 0
    };
    $scope.popupMessageOpthins = function(message) {
      $scope.popup.index = $scope.messages.indexOf(message);
      $scope.popup.optionsPopup = $ionicPopup.show({
        templateUrl: "templates/popup.html",
        scope: $scope,
      });
      $scope.popup.isPopup = true;
    };
    $scope.markMessage = function() {
      var index = $scope.popup.index;
      var message = $scope.messages[index];
      if (message.showHints) {
        message.showHints = false;
        message.noReadMessages = 0;
      } else {
        message.showHints = true;
        message.noReadMessages = 1;
      }
      $scope.popup.optionsPopup.close();
      $scope.popup.isPopup = false;
      messageService.updateMessage(message);
    };
    $scope.deleteMessage = function() {
      var index = $scope.popup.index;
      var message = $scope.messages[index];
      $scope.messages.splice(index, 1);
      $scope.popup.optionsPopup.close();
      $scope.popup.isPopup = false;
      messageService.deleteMessageId(message.id);
      messageService.clearMessage(message);
    };
    $scope.topMessage = function() {
      var index = $scope.popup.index;
      var message = $scope.messages[index];
      if (message.isTop) {
        message.isTop = 0;
      } else {
        message.isTop = new Date().getTime();
      }
      $scope.popup.optionsPopup.close();
      $scope.popup.isPopup = false;
      messageService.updateMessage(message);
    };
    $scope.messageDetils = function(message) {
      $state.go("messageDetail", {
        "messageId": message.id
      });
    };
  })
  .controller('messageDetailCtrl', ['$scope', '$stateParams',
    'messageService', '$ionicScrollDelegate', '$timeout',
    function($scope, $stateParams, messageService, $ionicScrollDelegate, $timeout) {
      $scope.message = messageService.getMessageById($stateParams.messageId);
      $scope.message.noReadMessages = 0;
      $scope.message.showHints = false;
      messageService.updateMessage($scope.message);
      $scope.messageNum = 10;
      $scope.messageDetils = messageService.getAmountMessageById($scope.messageNum,
        $stateParams.messageId);
      var viewScroll = $ionicScrollDelegate.$getByHandle('messageDetailsScroll');
      // console.log("enter");
      $scope.doRefresh = function() {
        // console.log("ok");
        $scope.messageNum += 5;
        $timeout(function() {
          $scope.messageDetils = messageService.getAmountMessageById($scope.messageNum,
            $stateParams.messageId);
          $scope.$broadcast('scroll.refreshComplete');
        }, 200);
      };

      $scope.$on("$ionicView.beforeEnter", function() {
        $scope.message = messageService.getMessageById($stateParams.messageId);
        $scope.message.noReadMessages = 0;
        $scope.message.showHints = false;
        messageService.updateMessage($scope.message);
        $scope.messageNum = 10;
        $scope.messageDetils = messageService.getAmountMessageById($scope.messageNum,
          $stateParams.messageId);
        $timeout(function() {
          viewScroll.scrollBottom();
        }, 0);
      });

      window.addEventListener("native.keyboardshow", function(e){
        viewScroll.scrollBottom();
      });
    }
  ])

