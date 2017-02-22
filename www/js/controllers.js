const imageStorageUrlPrepend = "http://res.cloudinary.com/hvesn9ggf/image/upload/";
// Handles the main view.
app.controller('HomeCtrl', function ($scope) {
// Creates fake posts to the main view.
  $scope.datas = [{
    username: 'c2koju00',
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
app.controller('SearchCtrl', function ($scope) {

});

// Handles the phone camera.
app.controller("PhotoCtrl", function ($scope, $cordovaCamera, $rootScope) {
// Handles the opening the camera and settings for the image and options.
  $scope.takePicture = function () {
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };
// Displays the taken image in the view.
    $cordovaCamera.getPicture(options).then(function (imageData) {
      $scope.imgURI = "data:image/jpeg;base64," + imageData;
      $rootScope.imgURI = "data:image/jpeg;base64," + imageData;
    }, function (err) {
      // An error occured. Show a message to the user
    });
  }


});

app.controller('FollowersCtrl', function ($scope) {

});

// Handles the profile page.
app.controller('ProfileCtrl', ['$scope', '$cordovaImagePicker', 'User', function ($scope, $cordovaImagePicker, User) {

  User.getCurrentUserData();

// Loads the images to the view.
  $scope.images = [];

  $scope.loadImages = function () {
    for (var i = 0; i < 100; i++) {
      $scope.images.push({id: i, src: "img/aurora.jpeg"});
    }
  };
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
    }, function (error) {
      // error getting photos
    });

}]);

app.controller('EditprofileCtrl', function ($scope) {


});

// Handles the login and login out.
app.controller('LoginCtrl', ['$scope', 'User', function ($scope, User) {

  $scope.username = "";
  $scope.password = "";

  $scope.login = function (username, password) {
    User.login(username, password);
  };
}]);

// Handles the sign up.
app.controller('SignupCtrl', ['$scope', 'User', function ($scope, User) {

  $scope.username = "";
  $scope.password = "";
  $scope.email = "";

  $scope.signup = function (username, password, email) {
    User.signup(username, password, email);
  };
}]);
