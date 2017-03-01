app.factory('User', ['$http', '$state', '$q', function ($http, $state, $q) {
  return {
    signup: function (username, password, email) {
      // Request for signing up
      var req = {
        method: 'POST',
        url: 'http://mesta-server.herokuapp.com/users',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          username: username,
          password: password,
          email: email
        }
      };
      // Send the crafted request and save the session token in a cookie if received.
      $http(req).then(function succesCallback(response) {
        if (response.data.token != undefined) {
          // Store the token in a cookie and move to the home tab
          Cookies.set('sessionToken', response.data.token.toString(), {expires: 14});
          Cookies.set('userId', response.data.userId.toString(), {expires: 14});
          Cookies.set('username', username, {expires: 14});
          $state.go('tab.home');
        }
      });
    },
    login: function (username, password) {
      // Request for loging in
      var req = {
        method: 'POST',
        url: 'http://mesta-server.herokuapp.com/users/in',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          username: username,
          password: password
        }
      };
      // Send the crafted request and save the session token in a cookie if received.
      $http(req).then(function succesCallback(response) {
        if (response.data.token != undefined) {
          // Store the token in a cookie and move to the home tab
          Cookies.set('sessionToken', response.data.token.toString(), {expires: 14});
          Cookies.set('userId', response.data.userId.toString(), {expires: 14});
          Cookies.set('username', username, {expires: 14});
          $state.go('tab.home');
        }
      });
    },
    logout: function () {
      // Get the current session token needed for loging out function
      var sessionToken = Cookies.get('sessionToken');
      // Request for loging out
      var req = {
        method: 'POST',
        url: 'http://mesta-server.herokuapp.com/users/out',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          sessionToken: sessionToken
        }
      };
      // Send the crafted request for logging out
      $http(req).then(function succesCallback(response) {
        // Remove the token in a cookie and move to the login tab
        Cookies.remove('sessionToken');
        Cookies.remove('userId');
        $state.go('login');
      });
    },
    getCurrentUserData: function () {
      var userId = Cookies.get('userId').toString();
      var url = serverUrl + 'users/profile/' + Cookies.get('userId');
      console.log(url);
      return $q(function (resolve, reject) {
        // Send the crafted request for getting profile data of the current user
        $http.get(url).then(function (response) {
          console.log(response.data);
          // Attach user's data to the scope of the profile controller
          resolve(response.data);
        });
      });
    },
    searchUser: function (username) {
      var url = serverUrl + 'users/' + username;
      return $q(function (resolve, reject) {
        // Send the crafted request for searching user by username
        $http.get(url).then(function (response) {
          // Attach user's data to the scope of the profile controller
          resolve(response.data);
        });
      });
    },
    follow: function (usernameToFollow) {
      // Get the current session token needed for following function
      var sessionToken = Cookies.get('sessionToken');
      // Request for following
      var req = {
        method: 'POST',
        url: 'http://mesta-server.herokuapp.com/users/follow',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          usernameToFollow: usernameToFollow,
          sessionToken: sessionToken
        }
      };
      // Send the crafted request for following
      $http(req).then(function succesCallback(response) {
        resolve(response.data);
      });
    }
  }
}]);
