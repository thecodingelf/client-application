myApp.factory('Users', function() {
  
  return {
      // Function 1.
        loginUser: function(username, hash) {
            
            return $q(function(resolve, reject){
                
                var req = {

                method: 'POST',
                url: 'http://mesta-server.herokuapp.com/users/in',
                headers: {
                      'Content-Type': 'application/json'
                },
                data: {
                 username: username,
                 hash: hash
                }
            }

$http(req).then(function succesCallback(response){

var sessionToken = response.sessionToken

  });

});            
        },
        // Function 3: Calculating the hash.
        calchash: function()
        {
           
            password: {

            }

        },
        // Function 4.
        getOne: function(key)
        {
            return $q(function(resolve, reject){
                for(var i = 0; i < users.length; i++)
                {
                    if(users[i].id == key)
                    {
                        resolve(users[i]);
                    }
                }
                reject();
                
            });
        },
        // Function 5.
        getActiveUser: function()
        {
            return activeUser;
        },
        // Function 6.
        getActiveUserActivity: function()
        {
            return activeUser.activity;
        }

    };

});
    
    