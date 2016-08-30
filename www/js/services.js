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
    /*var ip = 'http://localhost:8080';*/
    var ip = 'http://192.168.0.120:8080';
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
  /*   我的活动*/
  .factory('MyactService', function ($http, IP) {
    var fData;
    return {
      load: function (username, type) {
        return $http({
          method: 'GET',
          url: IP.info() + '/api/activity/mine',
          params: {
            username: username,
            type: type
          }
        })
      }
    }
  })
  /*拍照*/
  .factory('Camera', function ($cordovaCamera) {
    var options = {
      //这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
      quality: 70,                                            //相片质量0-100
      destinationType: 1,        //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫)
      //sourceType: Camera.PictureSourceType.CAMERA,             //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
      allowEdit: false,                                        //在选择之前允许修改截图
      encodingType: 0,                   //保存的图片格式： JPEG = 0, PNG = 1
      //targetWidth: 200,                                        //照片宽度
      //targetHeight: 200,                                       //照片高度
      mediaType: 0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
      cameraDirection: 0,                                       //前后摄像头类型：Back= 0,Front-facing = 1
      //popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: true                                   //保存进手机相册
    };

    return {
      appendByCamera: function () {
        options.sourceType = Camera.PictureSourceType.CAMERA;
        return $cordovaCamera.getPicture(options)
      },
      appendByPhoto: function () {
        options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
        return $cordovaCamera.getPicture(options)
      }
    }

  })

  /*图片、视频、语音上传*/
  .factory('fileUpload', function ($cordovaFileTransfer, $ionicLoading, $cordovaToast, IP) {

    return {
      //fullPath 格式为：videoData[0].fullPath
      go: function (fullPath) {
        var foptions = new FileUploadOptions();
        foptions.fileKey = "files";
        // foptions.mimeType="video/mp4";
        //foptions.mimeType="image/jpeg";
        foptions.fileName = fullPath.substr(fullPath.lastIndexOf('/') + 1);
        $ionicLoading.show({
          //template: '正在上传...'
          //templateurl: 'loding.html'
        })
        return $cordovaFileTransfer.upload(IP.info() + "/api/commonUpload", fullPath, foptions)

      }
    }
  })

  .factory('userService', function ($http, IP) {
    return {
      load: function (username) {
        return $http({
          method: 'GET',
          url: IP.info() + '/api/user/' + username,
          params: {
            username: username
          }
        })
      }
    }
  });
