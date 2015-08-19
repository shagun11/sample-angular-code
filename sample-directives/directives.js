angular.module('DemoDirectives')

//A directive for the click-outside event
.directive('scalClickoutside', function($document, $timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      var clickOutsideEvt;
      scope.$watch(
          function() {
            return element.is(':visible');
          },

          function(newValue, oldValue) {

            if(newValue !== oldValue) {
              if(newValue) {
                $timeout(function() {
                  clickOutsideEvt = $document.one('click', function() {
                    scope.$apply(attr.scalClickoutside);
                  });
                }, 100);
              } else if( clickOutsideEvt ) {
                clickOutsideEvt.unbind();
                clickOutsideEvt = null;
              }
            }
          });

      element.bind('click', function(e) {
        e.stopPropagation();
      });
    }
  };
})

//Custom time-picker
.directive('scalTimepicker', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attr, ngModel) {
      var selectNode,
          timePickerConfig = scope.$eval(attr.scalTimepicker) || {},
          select2Config = scope.$eval(attr.select2Config) || {};
      element.timepicker(timePickerConfig);
    }
  };
})

//Custom angular popover using bootstrap's popovers
.directive('DemoPopover', function($http, $compile, $timeout) {
  return {
    restrict: 'A',
    scope: {
      data: '=resolve',
      callback: '='
    },
    controller: function($scope) {
      var getDefaultEvent = function(eventType) {
        var defaultStartDate = new Date($scope.data.year, $scope.data.month, $scope.data.day),
            defaultEndDate = new Date(defaultStartDate.getTime() + 86400000),
            defaultEvent;

        defaultEvent = {
          'eventType': eventType,
          'startDate': defaultStartDate,
          'endDate': defaultEndDate,
          'tags': [{
            type: 'PERSON',
            value: $scope.data.userId
          }]
        };
        if (eventType === 'SWAP-REQUESTED') {
          defaultEvent.tags.push({
            type: 'GIVER',
            value: $scope.data.userId
          });
        }

        return defaultEvent;
      },

      getAddEvents = function() {
        var addEvents = [];
        angular.forEach($scope.eventNameMap, function(value, key) {
          if(key !== 'SHIFT' &&
              $scope.data.events.indexOfObjectKey('eventType', key) === -1) {
            addEvents.push(getDefaultEvent(key));
          }
        });

        return addEvents;
      };

      $scope.eventNameMap = {
        'VACATION': 'Time Off',
        'SHIFT': 'Shift',
        'SHIFT-ADJUSTMENT': 'Shift Adjustment',
        'SWAP-REQUESTED': 'Shift Trade'
      };

      $scope.addEvents = getAddEvents();

      $scope.invokeCallback = function(event) {
        $scope.closePopover();
        $scope.callback(event);
      };
    },
    link: function(scope, element, attr) {
      var content;
      if(attr.contentTemplateUrl) {
        $http.get(attr.contentTemplateUrl).then(function(res) {
          if(angular.isObject(res)) {
            content = res.data;
          } else {
            content = res;
          }
          element.popover({
            content: function() {
              return $compile( content )( scope );
            }
          });
        }, function() {
          element.popover();
        });
      } else if(attr.contentTemplate) {
        element.popover({
          content: function() {
            var template = angular.element(attr.contentTemplate).html();
            return $compile( template )( scope );
          }
        });
      }

      scope.closePopover = function() {
        
        angular.element('.popover').remove();
      };

      //Function to have only one popover opened at a time
      element.on('show.bs.popover', function() {
        scope.closePopover();
      });

      element.on('click', function() {
        $timeout(function() {
          element.popover('show');
        });
      });
    }
  };
});
