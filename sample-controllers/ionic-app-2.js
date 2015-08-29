'use strict';
// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('Manipal', [
  'ionic',
  'config',

  'fancySelect',
  'highcharts-ng'
])

.run(function($ionicPlatform) {
$ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})



.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })

      .state('app.dashboard', {
        url: '/dashboard/:id',
        views: {
          'menuContent0': {
            templateUrl: 'templates/dashboard.html',
            controller: 'DashboardCtrl'
          }
        },
        resolve: {
          dashboardData: function($stateParams, DataService) {
            return DataService.getDashboardData($stateParams);
          }
        }
      });

    $urlRouterProvider.otherwise('/app/dashboard/1/');
})

.config(function($httpProvider) {
  // Pre-process outgoing request URLs
  $httpProvider.interceptors.push('httpEnvInterceptor');

  //Trigger events on AJAX calls
  $httpProvider.interceptors.push(function($rootScope) {

  //Events trigger on Ajax requests. These events are bound to a loader icon
  //Hence a loading icon displays on every ajax request
    return {
      request: function(config) {
        $rootScope.$broadcast('loading:show');
        return config;
      },
      response: function(response) {
        $rootScope.$broadcast('loading:hide');
        return response;
      }
    };
  });
})

.config(function($ionicConfigProvider) {
  //Ionic config
  $ionicConfigProvider.views.maxCache(0);
  $ionicConfigProvider.views.transition('none');
  $ionicConfigProvider.backButton.text('');
  $ionicConfigProvider.backButton.previousTitleText(false);
})

.constant('$ionicLoadingConfig', {
  template: '<i class="button-icon icon ion-loading-a"></i><br> Loading',
  showBackdrop: true
})

.run(function($rootScope, $ionicLoading, $timeout) {
  $rootScope.$on('$stateChangeStart', function() {
    $ionicLoading.show({
      showBackdrop: false
    });
  });

  $rootScope.$on('$stateChangeSuccess', function() {
    $ionicLoading.hide();
  });
});



