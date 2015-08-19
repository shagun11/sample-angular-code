'use strict';
angular
    .module('Demo', [
      'ngAnimate',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ui.bootstrap',
      'ui.select'
    ])

    //Datepicker config
    .config(function(datepickerConfig, datepickerPopupConfig) {
      datepickerConfig.showWeeks = false;
      datepickerPopupConfig.datepickerPopup = 'EEE, MMM dd, yyyy';
    })

    .config(function(uiSelectConfig) {
      uiSelectConfig.theme = 'bootstrap';
      uiSelectConfig.resetSearchInput = true;
    })

    .constant('GLOBALS', {
      odlIe: false,
      serverUrl: 'http://'
    })

    .config(function(GLOBALS) {
      var div = document.createElement("div");
      div.innerHTML = "<!--[if lt IE 10]><i></i><![endif]-->";
      GLOBALS.oldIe = (div.getElementsByTagName("i").length !== 0);
    })

    .directive('datepickerPopup', ['datepickerPopupConfig', 'dateParser', 'dateFilter', function (datepickerPopupConfig, dateParser, dateFilter) {
      return {
        'restrict': 'A',
        'require': '^ngModel',
        'link': function ($scope, element, attrs, ngModel) {
         var dateFormat;

         attrs.$observe('datepickerPopup', function(value) {
           dateFormat = value || datepickerPopupConfig.datepickerPopup;
           ngModel.$render();
         });

         ngModel.$formatters.push(function (value) {
           return ngModel.$isEmpty(value) ? value : dateFilter(value, dateFormat);
         });
        }
      };
    }]);
