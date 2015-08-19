
'use strict';

angular.module('DemoApp')
    .controller('DashboardCtrl', function(
        $scope, $state, $stateParams, $ionicTabsDelegate, $timeout, $ionicPopover,$ionicModal,
        chartConfig, chartUtils, dashboardData, FilterOptions) {

      var dashboardFilters = FilterOptions.dashboardFilters(),
          ownerIdArr = $stateParams.ownerId.split(','),
          dashboardOptions = dashboardFilters[$stateParams.owner];

      //Set the selected filters for fancy-select
      _.forEach(dashboardOptions, function(value) {
        if(_.indexOf(ownerIdArr, value.id) > -1) {
          value.checked = true;
        }
      });

      $scope.viewText = _.result(_.find(
          FilterOptions.viewOptions(), {value: $stateParams.owner}
      ), 'text');

      $scope.mainChart = chartUtils.formatMainChart(
          chartConfig.mainChart, dashboardData.revenueChart,         $stateParams.owner);

      $scope.drillDownChart = chartUtils.formatDrillDownChart(
          chartConfig.drillDownChart, dashboardData.revenueChart);

      $scope.miniChart1 = chartUtils.formatMiniChart1(
          chartConfig.miniChart1, dashboardData.projectionChart);

      $scope.miniChart2 = chartUtils.formatMiniChart2(
          chartConfig.miniChart2, dashboardData.guageChart);

      $scope.miniChart3 = chartConfig.miniChart3;
      $scope.miniChart4 = chartConfig.miniChart4;

      $scope.description = chartConfig.descriptionText;

      $scope.dashboardFilter = {
        options: dashboardOptions,
        header: 'Select ' + $scope.viewText + '(s)'
      };

      $scope.filterValue = {
        text: 'Select ' + $scope.viewText,
        value: '1001'
      };

     
        var index = _.findIndex($scope.periodOptions, {value: $stateParams.period});
        $scope.currentPeriod = $scope.periodOptions[index];

      $scope.periodOptions = FilterOptions.periodOptions();

      $scope.$watch(function() {
        return $scope.filterValue.value;
      }, function(newVal, oldVal) {
        if(newVal !== oldVal) {
          var params = _.assign({}, $stateParams, {ownerId: newVal.replace(/;/g, ',')});
          $state.go($state.current.name, params);
        }
      });

  $scope.popoverMsg
  $ionicPopover.fromTemplateUrl('/templates/popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.openPopover = function($event, $id) {


    $scope.popoverMsg = $scope.description[$id - 1]
    $scope.popover.show($event);
  };


  $ionicModal.fromTemplateUrl('/templates/expand.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.expand = function(chartName) {

  $scope.chartNew = angular.copy(chartName);
  $scope.chartNew.options.chart.height = '300';
  $scope.modal.show();
  };

  });
