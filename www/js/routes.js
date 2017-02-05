angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.mesta', {
    url: '/main',
    views: {
      'tab1': {
        templateUrl: 'templates/mesta.html',
        controller: 'mestaCtrl'
      }
    }
  })

  .state('tabsController.search', {
    url: '/search',
    views: {
      'tab2': {
        templateUrl: 'templates/search.html',
        controller: 'searchCtrl'
      }
    }
  })

  .state('tabsController.share', {
    url: '/share',
    views: {
      'tab3': {
        templateUrl: 'templates/share.html',
        controller: 'shareCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.profile', {
    url: '/profile',
    views: {
      'tab4': {
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl'
      }
    }
  })

  .state('logIn', {
    url: '/login',
    templateUrl: 'templates/logIn.html',
    controller: 'logInCtrl'
  })

  .state('signUp', {
    url: '/signup',
    templateUrl: 'templates/signUp.html',
    controller: 'signUpCtrl'
  })

  .state('tabsController.editProfile', {
    url: '/editprofile',
    views: {
      'tab4': {
        templateUrl: 'templates/editProfile.html',
        controller: 'editProfileCtrl'
      }
    }
  })

  .state('tabsController.searchUser', {
    url: '/searchuser',
    views: {
      'tab2': {
        templateUrl: 'templates/searchUser.html',
        controller: 'searchUserCtrl'
      }
    }
  })

  .state('searchTag', {
    url: '/search tag',
    templateUrl: 'templates/searchTag.html',
    controller: 'searchTagCtrl'
  })

$urlRouterProvider.otherwise('/login')

  

});