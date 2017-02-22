const imageStorageUrlPrepend = "http://res.cloudinary.com/hvesn9ggf/image/upload/";
const serverUrl = "https://mesta-server.herokuapp.com/";
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

  // Use User service to get the data about current user at onload of profile
  User.getCurrentUserData().then(function (data) {
    // Prepend the sites const URL to the trailing parameter of the image
    data.profilePicture = imageStorageUrlPrepend + data.profilePicture;
    notprocesses_images = data.photos;
    $scope.images = [];
    notprocesses_images.forEach(function (image) {
      image.img = imageStorageUrlPrepend + image.img;
      $scope.images.push(image)
    });
    $scope.data = data;
    $scope.images = data.photos;
    console.log($scope.images)
  });


// Handles the image settings and how many images you can see at the time.
  var options = {

    maximumImagesCount: 10,
    width: 300,
    height: 300,
    quality: 80

  };

}]);

app.controller('EditprofileCtrl', function ($scope) {


});

// Handles the login and login out.
app.controller('LoginCtrl', ['$scope', 'User', function ($scope, User) {

  // Initialize variables required for sing-in
  $scope.username = "";
  $scope.password = "";

  // Function for logging in user through a button in a view through User service
  $scope.login = function (username, password) {
    User.login(username, password);
  };
}]);

// Handles the sign up.
app.controller('SignupCtrl', ['$scope', 'User', function ($scope, User) {

  // Initialize variables required for sign-up
  $scope.username = "";
  $scope.password = "";
  $scope.email = "";

  // Function for logging in user through a button in a view through User service*
  $scope.signup = function (username, password, email) {
    User.signup(username, password, email);
  };
}]);
