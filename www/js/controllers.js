var testapp = angular.module('starter.controllers', ['ngCordova']);

// Handles the main view.
testapp.controller('HomeCtrl', function($scope) {

// Creates fake posts to the main view.
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

// Handles the search events
testapp.controller('SearchCtrl', function($scope) {

});

// Handles the phone camera.
testapp.controller("PhotoCtrl", function($scope, $cordovaCamera, $rootScope) {
// Handles the opening the camera and settings for the image and options.
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
// Displays the taken image in the view.
    $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.imgURI = "data:image/jpeg;base64," + imageData;
       $rootScope.imgURI = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      // An error occured. Show a message to the user
    });
  }

  
});

testapp.controller('FollowersCtrl', function($scope) {

});

// Handles the profile page.
testapp.controller('ProfileCtrl', function($scope, $cordovaImagePicker) {

// Loads the images to the view.
  $scope.images = [];
 
    $scope.loadImages = function() {
        for(var i = 0; i < 100; i++) {
            $scope.images.push({id: i, src: "img/aurora.jpeg"});
        }
    }
// Handles the image settings and how many images you can see at the time.
   var options = {
   
   maximumImagesCount: 10,
   width: 300,
   height: 300,
   quality: 80
  
};
// Opens up phone's image gallery.
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

$scope.login = function(username, password){

var hash = user.calchash(password);

var sessionToken = user.login(username, hash);

if (sessionToken != undefined){

  $state.go(tab.home)
  
}

} 

});

// Handles the sign up.
testapp.controller('SignupCtrl', function($scope, $http) {

 /*var req = {

 method: 'POST',
 url: 'http://mesta-server.herokuapp.com/users',
 headers: {
   'Content-Type': 'application/json'
 },
 data: { 
   username: 'string',
   hash: 'string',
   email: 'string'
  }
}

$http(req).then(function(){

  }, 
  function(){

    });*/

});


