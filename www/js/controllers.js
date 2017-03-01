const imageStorageUrlPrepend = "http://res.cloudinary.com/hvesn9ggf/image/upload/";
const serverUrl = "https://mesta-server.herokuapp.com/";
// Handles the main view.
app.controller('HomeCtrl', [ "$scope", "User", "Post", function ($scope, User, Post) {
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
  // Get all of the data for the user home page
  $scope.getHome = function () {
    $scope.arrayOfPosts = Post.getHome();
  };
  // Like (supply id of the picture/post)
  $scope.like = function (id) {
    Post.like(id);
  };
  // Like (supply id of the picture/post) and the comment itself
  $scope.comment = function (id, comment) {
    Post.comment(id, comment);
  };
}]);

// Handles the search events
app.controller('SearchCtrl', ["$scope", "User", "Post", function ($scope, User, Post) {

  // Initialize variables needed for search
  $scope.activeButton = "tags";
  $scope.input = "";

  $scope.toggleButton = function () {
    if ($scope.activeButton == "users"){
      $scope.activeButton = "tags";
    }
    else {
      $scope.activeButton = "users";
    }
  };
  $scope.search = function (input) {
    if($scope.activeButton == "users"){
      User.searchUser(input).then(function (data) {
        $scope.users = data;
        data.forEach(function (image) {
          image.profilePicture = imageStorageUrlPrepend + image.profilePicture;
        });
      });
    }
    else {
      Post.searchByTag(input).then(function (data) {
        data.forEach(function (image) {
          image.img = imageStorageUrlPrepend + image.img;
        });
        $scope.tags = data;
      });
    }
  };

}]);

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

app.controller('PostCtrl', function ($scope) {

});

app.controller('FollowersCtrl', function ($scope) {
  // Supply the id of the user to follow/unfollow
  $scope.searchByTag = function (tag) {
    $scope.usersPosts = searchByTag(tag);
  };
});

// Handles the profile page.
app.controller('ProfileCtrl', ['$scope', '$cordovaImagePicker', 'User', '$ionicModal', function ($scope, $cordovaImagePicker, User, $ionicModal) {

  // Use User service to get the data about current user at onload of profile
  User.getCurrentUserData().then(function (data) {
    console.log(data);
    // Prepend the sites const URL to the trailing parameter of the image
    data.profilePicture = imageStorageUrlPrepend + data.profilePicture;
    notprocesses_images = data.photos;
    $scope.images = [];
    if(notprocesses_images != undefined){
    notprocesses_images.forEach(function (image) {
      image.img = imageStorageUrlPrepend + image.img;
      $scope.images.push(image)
    });
    }
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

  // Handles the modal functions.
  $ionicModal.fromTemplateUrl('templates/options.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  // Opens the modal.
  $scope.openModal = function() {
    $scope.modal.show();
  };
  // Closes the modal.
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

$scope.logout = function () {
    User.logout();
    $scope.modal.remove();
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
