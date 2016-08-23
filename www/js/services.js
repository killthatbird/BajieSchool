angular.module('services', [])
//定义设置全局关键字/获取关键字/移除关键字
  .factory('LocalStorage', function ($window) {
    return {
      set: function (keys, value) {
        $window.localStorage[keys] = value
      },
      get: function (keys, defaultvalue) {
        return $window.localStorage[keys] || defaultvalue
      },
      remove: function (keys) {
        return $window.localStorage.removeItem(keys)
      },
      removeAll: function () {
        return $window.localStorage.clear()
      }
    }
  })
  .factory('IP', function () {
    //var ip = 'http://121.40.193.122';
    var ip = 'http://127.0.0.1:8080';
    return {
      info: function () {
        return ip
      }
    };
  })

  .factory('User', function () {
    return {
      info: function () {
        return JSON.parse(localStorage.getItem('member'));
      }
    };
  })
  .factory('Chats', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
      id: 0,
      name: 'Lucas',
      lastText: 'Hello~',
      face: 'img/ben.png'
    }, {
      id: 1,
      name: 'Jay',
      lastText: 'Hey, it\'s me',
      face: 'img/max.png'
    }, {
      id: 2,
      name: 'Robin',
      lastText: 'I should buy a boat',
      face: 'img/adam.jpg'
    }, {
      id: 3,
      name: 'Jack',
      lastText: 'Look at my mukluks!',
      face: 'img/perry.png'
    }, {
      id: 4,
      name: 'Pony',
      lastText: 'This is wicked good ice cream.',
      face: 'img/mike.png'
    }];

    return {
      all: function () {
        return chats;
      },
      remove: function (chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function (chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      }
    };
  });
