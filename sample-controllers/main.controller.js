
'use strict';

angular.module('DemoApp')

    .controller('AppCtrl', function(
        $scope, $ionicModal, $timeout, $state,
        $ionicTabsDelegate, FilterOptions) {
      // Form data for the login modal
      $scope.loginData = {};

      // Create the login modal that we will use later
      $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });

      // Triggered in the login modal to close it
      $scope.closeLogin = function() {
        $scope.modal.hide();
      };

      // Open the login modal
      $scope.login = function() {
        $scope.modal.show();
      };

      // Perform the login action when the user submits the login form
      $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        $timeout(function() {
          $scope.closeLogin();
        }, 1000);
      };

      $scope.getUrl = function(newParams, state) {
        var params = _.assign({}, $state.params, newParams);
        return $state.href(state || $state.current.name, params);
      };

      $scope.periodOptions = FilterOptions.periodOptions();

      $scope.goToNextPage = function() {
        var index = $ionicTabsDelegate.selectedIndex(),
            newIndex = (index + 1) % $scope.periodOptions.length,
            newPeriod = $scope.periodOptions[newIndex].value,
            params = _.assign({}, $state.params, {period: newPeriod});

        $state.go('app.dashboard' + newIndex, params);
      };

      $scope.doRefresh = function() {
        $timeout(function() {
          $state.go($state.$current, null, { reload: true });
        });
      };

      $scope.isActiveItem = function(value) {
        return value === $state.params.owner;
      };
    });
