/**
 * Created by Administrator on 2016/7/21.
 */
angular.module('friendsSearchApp', ['ionic', 'ionic.contrib.ui.tinderCards'])

  .directive('noScroll', function ($document) {

    return {
      restrict: 'A',
      link: function ($scope, $element, $attr) {

        $document.on('touchmove', function (e) {
          e.preventDefault();
        });
      }
    }
  })

  .controller('CardsCtrl', function ($scope, TDCardDelegate) {
    console.log('CARDS CTRL');
    var cardTypes = [
      {image: 'https://pbs.twimg.com/profile_images/696212819570655232/UJYdhVYj.jpg'},
      {image: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'},
      {image: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'},
      {image: 'https://pbs.twimg.com/profile_images/692904108424982528/0PESpDwT.jpg'}
    ];

    $scope.cards = Array.prototype.slice.call(cardTypes, 0);

    $scope.cardDestroyed = function (index) {
      $scope.cards.splice(index, 1);
    };

    $scope.addCard = function () {
      var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
      newCard.id = Math.random();
      $scope.cards.push(angular.extend({}, newCard));
    }
  })

  .controller('CardCtrl', function ($scope, TDCardDelegate) {
    $scope.cardSwipedLeft = function (index) {
      console.log('LEFT SWIPE');
      $scope.addCard();
    };
    $scope.cardSwipedRight = function (index) {
      console.log('RIGHT SWIPE');
      $scope.addCard();
    };
  });
