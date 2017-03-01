app.factory('Post', ['$http', '$state', '$q', function ($http, $state, $q) {
  return {
    searchByTag: function (tag) {
      var url = serverUrl + 'photos/' + tag;
      return $q(function (resolve, reject) {
        // Send the crafted request for searching photos by tag
        $http.get(url).then(function (response) {
          // Attach found posts to the response data sent to client
          resolve(response.data);
        });
      });
    },
    getPhoto: function (id) {
      var url = serverUrl + 'photos/object' + id;
      return $q(function (resolve, reject) {
        // Send the crafted request for getting photo/post with all of its data
        $http.get(url).then(function (response) {
          // Attach found post to the response data sent to client
          resolve(response.data);
        });
      });
    },
    comment: function (id, comment) {
      // Get the current session token needed for commenting function
      var sessionToken = Cookies.get('sessionToken');
      // Request for commenting
      var req = {
        method: 'POST',
        url: 'http://mesta-server.herokuapp.com/photos/comment',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          id: id,
          comment: comment,
          sessionToken: sessionToken
        }
      };
      // Send the crafted request for commenting
      $http(req).then(function succesCallback(response) {
        resolve(response.data);
      });
    },
    like: function (id) {
      // Get the current session token needed for liking function
      var sessionToken = Cookies.get('sessionToken');
      // Request for following
      var req = {
        method: 'POST',
        url: 'http://mesta-server.herokuapp.com/photos/like',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          id: id,
          sessionToken: sessionToken
        }
      };
      // Send the crafted request for following
      $http(req).then(function succesCallback(response) {
        resolve(response.data);
      });
    },
    getHome: function () {
      // Get the current session token needed for finding users being followed
      var username = Cookies.get('username');
      var url = serverUrl + 'home/' + username;
      return $q(function (resolve, reject) {
        // Send the crafted request for searching user's followers recent posts
        $http.get(url).then(function (response) {
          // Attach user's data to the scope of the profile controller
          resolve(response.data);
        });
      });
    }
  }
}]);
