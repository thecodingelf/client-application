var testapp = angular.module('starter.controllers', ['ngCordova']);

testapp.controller('HomeCtrl', function($scope, $rootScope) {

  $scope.datas = [{
    username:  'c2koju00',
    image: 'img/aurora.jpeg',
    comment: 'Nice picture!'
  },
    {
      username: 'giograf-',
      image: 'img/aurora.jpeg',
      comment: 'Cool'
    },
    {
      username: 'c2koju00',
      image: 'img/aurora.jpeg',
      comment: 'That is Epic.'
    }
  ];

});

testapp.controller('SearchCtrl', function($scope) {

});

testapp.controller('PhotoCtrl', function($scope) {

});

testapp.controller('FollowersCtrl', function($scope) {

});

testapp.controller('ProfileCtrl', function($scope, $cordovaImagePicker) {

  $scope.images = [];

    $scope.loadImages = function() {
        for(var i = 0; i < 100; i++) {
            $scope.images.push({id: i, src: "img/aurora.jpeg"});
        }
    }

   var options = {

   maximumImagesCount: 10,
   width: 300,
   height: 300,
   quality: 80

};

  $cordovaImagePicker.getPictures(options)
    .then(function (results) {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
      }
    }, function(error) {
      // error getting photos
    });

});

testapp.controller('EditprofileCtrl', function($scope) {


});

// Handles the login and login out.
testapp.controller('LoginCtrl', function($scope, $http) {

 var req = {

 method: 'POST',
 url: 'http://mesta-server.herokuapp.com/users/in',
 headers: {
   'Content-Type': 'application/json'
 },
 data: {
    username: 'string',
    hash: 'string'
  }
}
$http(req).then(function succesCallback(response){

console.log(response.data);
console.log(PostData);

  });
});

testapp.controller('SignupCtrl', function($scope, $http) {

});

testapp.controller("PhotoCtrl", function($scope, $cordovaCamera, $rootScope) {

  $scope.takePicture = function() {
    var options = {
      quality : 75,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.imgURI = "data:image/jpeg;base64," + imageData;
       $rootScope.imgURI = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      // An error occured. Show a message to the user
    });
  }


});
