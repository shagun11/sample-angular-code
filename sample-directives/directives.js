angular.module('DemoDirectives')

//A directive for the click-outside event.
//It uses callback to call click outside events for the pop up.
.directive('Clickoutside', function($document, $timeout) {
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
                    scope.$apply(attr.Clickoutside);
                  });
                }, 100);
              } else if( clickOutsideEvt ) {
                clickOutsideEvt.unbind();
                clickOutsideEvt = null;
              }
            }
          });
  //to Stop bubbling of events.
      element.bind('click', function(e) {
        e.stopPropagation();
      });
    }
  };
})

//Custom time-picker
.directive('Timepicker', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attr, ngModel) {
      var selectNode,
          timePickerConfig = scope.$eval(attr.Timepicker) || {},
          select2Config = scope.$eval(attr.select2Config) || {};
      element.timepicker(timePickerConfig);
    }
  };
})

//Custom angular popover using bootstrap's popovers
/* It gets the date and format it to display in the popup in the expected format */
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
            type: 'MyTag',
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

	/* It gets the events for the popup */
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
        'EVENT1': 'type1',
        'EVENT2': 'type2',
        'EVENT3': 'type3',
        'EVENT4': 'type4'
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
