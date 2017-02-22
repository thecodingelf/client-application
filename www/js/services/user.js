app.factory('User', ['$http', '$state', function ($http, $state) {
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
        if(response.data.token != undefined){
        // Store the token in a cookie and move to the home tab
          Cookies.set('sessionToken', response.data.token.toString() , { expires: 14 });
          Cookies.set('userId', response.data.userId.toString() , { expires: 14 });
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
        if(response.data.token != undefined){
          // Store the token in a cookie and move to the home tab
          Cookies.set('sessionToken', response.data.token.toString() , { expires: 14 });
          Cookies.set('userId', response.data.userId.toString() , { expires: 14 });
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
        url: 'http://mesta-server.herokuapp.com/users/out' + Cookies.get('userId'),
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
        $state.go('tab.login');
      });
    },
    getCurrentUserData: function($scope) {
      var userId = Cookies.get('userId').toString();
      var url = 'http://mesta-server.herokuapp.com/users/profile/' + Cookies.get('userId');

      // Send the crafted request for getting profile data of the current user
      $http.get(url).then(function succesCallback(response) {
        var data = response.data;
        // Attach user's data to the scope of the profile controller
        return data;
      });
    }
  }
}]);
