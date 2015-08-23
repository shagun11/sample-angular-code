 'use strict';

/**
 * @ngdoc overview
 * @name demoApp
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */


angular.module('DemoMobile', [
  'ionic',
  'ngCordova',
  'ngResource'])

  .run(function($ionicPlatform, $rootScope, $state, AuthService) {

    $ionicPlatform.ready(function() {
        // save to use plugins here
    });

    // add possible global event handlers here
    $rootScope.$on('$stateChangeStart', function (event, next) {
        var isAuthenticated = AuthService.isAuthenticated();
        if (next.name === "login" && isAuthenticated) {
            event.preventDefault();
            $state.go('app.home');
        }
    });

  })

  .config(function($httpProvider, $stateProvider, $urlRouterProvider) {
    // register $http interceptors, if any. e.g.
    // $httpProvider.interceptors.push('interceptor-name');
    // Application routing
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
      })
      .state('loginRedirect', {
        url: '/access_token=:accessToken',
        template: '',
        controller: function ($state, $rootScope, AuthService, $location) {
          var hash = $location.path().substr(1);

          var splitted = hash.split('&');
          var params = {};

          for (var i = 0; i < splitted.length; i++) {
            var param  = splitted[i].split('=');
            var key    = param[0];
            var value  = param[1];
            params[key] = value;
          }
          AuthService.login(params).then(function() {
            $state.go('app.home');
          });
        }
      })
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/main.html',
        controller: 'MainController'
      })
      .state('app.home', {
        url: '/home',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/home.html',
            controller: 'HomeController'
          }
        }
      })
      .state('app.settings', {
        url: '/settings',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/settings.html',
            controller: 'SettingsController'
          }
        }
      });


    // redirects to default route for undefined routes
    $urlRouterProvider.otherwise('/login');
  });
