angular.module('DemoServices')

//Constants used in rendering dates.
.constant('DATE_CONSTANTS', {
  'months': ['January', 'February', 'March', 'April', 'May', 'June', 'July',
       'August', 'September', 'October', 'November','December'],
  'daysOfWeek': ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'],
  'daysPerMonth': [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  'referenceDate': new Date(2014, 0, 1),
  'hours': [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  'day': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  'repeatDays': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
       18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
})

//Constants used in modal
.constant('MODAL_CONSTANTS', {
  'saveOptions':[
       {'text': 'Save only this event', 'value': 'NO'},
       {'text': 'Save this and all following events', 'value': 'AFTER'},
       {'text': 'Save all events', 'value': 'YES'},
       {'text':'Save as a new event','value':'CLONE'}
       ],
 'deleteOptions':[
      {'text': 'Delete only this event', 'value': 'NO'},
      {'text': 'Delete this and all following events', 'value': 'AFTER'},
      {'text': 'Delete all events', 'value': 'YES'}
      ],
      'dateOptions': {'year-format': "'yy'", 'starting-day': 1 },
      'timePicker': {'timeFormat': 'H:i:s'},
      'tpSelect2': {'width': 90, 'containerCssClass': 'event-modal-timepicker'}
})

//Constants used for select option 
.constant('SELECT_CONSTANTS', {
  'singleSelect2Options': {'width': 200, 'minimumResultsForSearch': -1},
  'multiSelect2Options': {'width': 300}
})

//Constants used for reccuring Option
.constant('REPEAT_CONSTANTS', {
  'recurrenceModel' : {
    'DAILY': {display: 'Day'},
    'WEEKLY': {display: 'Week', options: ['byweekday']},
    '12DAY': {display: '12 Day', options: ['bysetpos']},
    'MONTHLY': {display: 'Month'},
    'YEARLY': {display: 'Year'}
  },
  'recurrenceEndModel' : {
    never: {display: ''},
    date: {display: 'End Date:', options: ['until_date']},
    count: {display: 'Occurrences:', options: ['count']}
  },
  'recurringForm' : {
    byweekday: [],
    bysetpos: [],
    repeatEvent: false,
    recurrenceEnd: 'never',
    frequency: 'DAILY',
    interval: '1',
    count: '1'
  }
})

//Factory contains all the resource objects used to make api calls.
.factory('EventApis', function($resource) {
  return {
    recurringEvent: function() {
      return $resource('/api/ABC', {});
    },

    allEvents: function() {
      return $resource('/api/XYZ',
          {limit: 100});
    },

    singleEvent: function() {
      return $resource('/api/v1/DEF', {},
          {update: {method: 'PUT'}});
    },

    swapEvent: function() {
      return $resource('/api/v1/DEMO', {});
    }
  };
})

//Resource objects for Reports page
.factory('ReportsApis', function($resource) {
  return {
    getReports: function() {
      return $resource('/api/v1/reports/',{});
    }
  };
})

//Resource objects for preferences
.factory('PreferencesApis', function($resource) {
  return {
    getAppPreference: function() {
      return $resource('/api/v0/preferences', {});
    }
  };
})

//Resource objects for User managemaent
.factory('UserApis', function($resource) {
  return {
    getPeople: function() {
      return $resource('/api/v0/users/?limit', {});
    },

    getUserDetail: function() {
      /**
       * FIXME: We need to append the url parameters with the url
       * instead of passing it in the parametersDefault (2nd option)
       * as it removes trailing slashes
       * In angular version 1.2.* ng-resource removes trailing slash by default
       * This has been fixed in the latest unstable versions 1.3
       *
       * Once the version is updated move url parameters into the parametersDefault option
       */
      return $resource('/api/v0/people/', {});
    },

    singleUserDetail: function() {
      return $resource('/api/v0/people/:peopleId/', {},
          {'update': {method: 'PUT'}});
    },

    userEmergencyContact: function() {
      return $resource('/api/emergency-contact/:emergencyContactId/', {});
    }
  };
})

//Contains all resource objects for making Batch Apis
.factory('BatchApi', function($resource) {
  return {
    batchApi: function() {
      return $resource('/api/batch-api', {});
    }
  };
})

//Factory contains all utility functions.
.factory('Utils', function($filter, PREFERENCES, AppPreferences) {
  return {
    getFullName: function(firstName, lastName, userName) {
      firstName = firstName.trim();
      lastName = lastName.trim();

      if(firstName || lastName) {
        return firstName ? firstName + ' ' + lastName : lastName;
      } else {
        return userName.charAt(0).toUpperCase() +
        userName.substr(1).toLowerCase();
      }
    },

    getDaysArray: function(noOfDays) {
      /**
       * Accepts a number,
       * returns an array with 1 to the number of days
       * @type {Array}
       */
      var daysArray = [];
      for(var i=1; i <= noOfDays; i++){
        daysArray = daysArray.concat(i);
      }
      return daysArray;
    },

    getDaysInterval: function(startDate, endDate, withTime) {
      var difference, start = new Date(startDate), end = new Date(endDate);
      if(!withTime) {
        start.setHours(0, 0, 0);
        end.setHours(0, 0, 0);
      }
      difference = Math.abs(start - end);
      return Math.round( difference / 86400000 );
    },

    getNewEndDate: function(newStartDate, prevStartDate, prevEndDate){
      if(newStartDate.getDate){
        var daysDifference = prevEndDate ?
            this.getDaysInterval(prevStartDate, prevEndDate) : 1,
            newEndDate = new Date(newStartDate);
            newEndDate.setDate(newStartDate.getDate() + daysDifference);
            return newEndDate;
      }
      return '';
    },

    formatDate: function(date, format) {
      return $filter('date')(date, format);
    },


    parseDateString: function(dateString) {
      /**
       * Function takes a date string and returns a date object
       *
       * A large variety of date string formats are supported
       * using angular's powerful date filter, convert the string
       * into the format "January 26, 2011 13:51:50" which is supported
       * by all browsers
       * @param dateString
       * @returns {Date}
       */
      var startDateTime = this.formatDate(dateString, 'MMMM dd, yyyy HH:mm:ss');
      return new Date(startDateTime);
    },

    convertDateToIso: function(dateString){
      return this.formatDate(dateString, 'yyyy-MM-dd HH:mm:ss');
    },

    getFormattedTime: function(dateObj) {
      /**
       * Accepts a date object and returns the time (string)
       */
      return this.formatDate(dateObj, 'HH:mm:ss');
    },

    mergeTimeAndDateObj: function(dateObj, timeString) {
      /**
       * Accepts a date object and a time string and
       * returns a new Date object with the date and time merged
       * @type {*|Array}
       */
      var time = timeString.split(':'),
          hour = time[0],
          min = time[1],
          sec = time[2],
      formattedDate = new Date(dateObj);

      return formattedDate.setHours(hour, min, sec);
    },

    makeTag: function(type, value, display) {
      var tag = {
          type: type,
          value: value
      };

      if(display) {
        tag.display = display;
      }

      return tag;
    },

    getTagValue: function(tags, type) {
      for(var i=0; i<tags.length; i++) {
        if(tags[i].type === type) {
          return tags[i].value;
        }
      }
    },

    getAllTagValues: function(tags, type) {
      var values = [];
      for(var i=0; i<tags.length; i++) {
        if(tags[i].type === type) {
          values.push(tags[i].value);
        }
      }

      return values;
    },

    getTagDisplay: function(tags, type) {
      for(var i=0; i<tags.length; i++) {
        if(tags[i].type === type) {
          return tags[i].display;
        }
      }
    },

    getTagType: function(tags, value, listOfTypes) {
      /**
       * Checks for a tag with the given value and the type belonging
       * to one of the types given in the list of types
       *
       * @param tags
       * @param value
       * @param listOfTypes
       * @returns {*}
       */
      for(var i=0; i<tags.length; i++) {
        var tag = tags[i];
        if(tag.value === value &&
            listOfTypes.indexOf(tag.type) > -1) {
          return tag.type;
        }
      }
    },

    removeUserFromEvent: function(tags, userId) {
      var newTags = [];
      for(var i=0; i<tags.length; i++) {
        if(tags[i].value !== userId) {
          newTags.push(tags[i]);
        }
      }
      return newTags;
    },

    getCorrectEventType: function(eventType, eventValue) {
      if(PREFERENCES.correctEventTypes.indexOf(eventType) > -1 &&
          eventValue !== 'STANDARD') {
        return eventValue;
      }
      return eventType;
    },

    getImagePath: function(filePath, imageConfig) {
      /**
       * Formats the image file path wrt to the image server url
       * Eg: https://d2br86dlunkgzy.cloudfront.net/unsafe/0x50/https://s3.amazonaws.com/calendar-data/staff.jpg
       */
      var imgConf = imageConfig || {},
      height = imgConf.height || 0,
      width = imgConf.width || 0,
      res = width + 'x' + height,
      authCode = 'unsafe';

      return AppPreferences.getPreferences().imageServerUrl +
      authCode + '/' + res + '/' +
      PREFERENCES.s3ImageUrl + filePath;
    },

    getTagCss: function(tagType, tagValue) {
      var lstTagType, typeCss, lstTagValue, valueCss;

      if(tagType && tagValue) {
        lstTagType = tagType.toLowerCase().split(' ');
        lstTagType.unshift('scal');
        typeCss = lstTagType.join('-');

        lstTagValue = tagValue.toLowerCase().split(' ');
        lstTagValue.unshift('scal');
        valueCss = lstTagValue.join('-');
        return (typeCss + ' ' + typeCss + '-' + valueCss);
      }

      return '';
    },

    getCssClassFromTags: function(tags) {
      var className = [], tagClass;

      for(var i=0; i<tags.length; i++) {
        tagClass = this.getTagCss(tags[i].type, tags[i].value);
        className.push(tagClass);
      }

      return className.join(' ');
    },

    isFullDayShift: function(startDate, endDate) {
      return (Math.abs(endDate - startDate))/3.6e6 ===
        AppPreferences.getPreferences().shiftTimings.defaultShiftSpan;
    }
  };
})

.factory('DataService', function() {
  var userDetailsMap = {};

  return {
    setUserDetailsMap: function(value) {
      for(var i=0; i<value.length; i++) {
        var user = value[i];
        userDetailsMap[user.id] = user;
      }
    },
    getUserDetailsMap: function() {
      return userDetailsMap;
    }
  };
})

//Modal service
.factory('ModalService', function($modal) {

  var eventDetailsModal = function (usersList, userEvent) {
    return $modal.open({
      templateUrl: '/static/firestation/partials/event-modal.html',
      controller: 'EventDetailsModalCtrl',
      backdrop: 'static',
      windowClass: 'event-modal',
      resolve: {
        usersList: function () {
          return usersList;
        },
        userEvent: function () {
          return userEvent;
        }
      }
    });
  },


  vacationModal = function (usersList, userEvent) {
    return $modal.open({
      templateUrl: 'vacation-modal.html',
      controller: 'VacationModalCtrl',
      backdrop: 'static',
      windowClass: 'event-modal event-modal-shift',
      resolve: {
        usersList: function () {
          return usersList;
        },
        userEvent: function () {
          return userEvent;
        }
      }
    });
  },

  shiftSwapDetailsModal = function (usersList, userEvent) {
    return $modal.open({
      templateUrl: 'shift-swap-modal.html',
      controller: 'ShiftSwapModalCtrl',
      backdrop: 'static',
      windowClass: 'event-modal event-modal-shift',
      resolve: {
        usersList: function () {
          return usersList;
        },
        userEvent: function () {
          return userEvent;
        }
      }
    });
  },

  genericEventDetailsModal = function (usersList, userEvent) {
    return $modal.open({
      templateUrl: 'generic-event-modal.html',
      controller: 'GenericEventModalCtrl',
      backdrop: 'static',
      windowClass: 'event-modal',
      resolve: {
        usersList: function () {
          return usersList;
        },
        userEvent: function () {
          return userEvent;
        }
      }
    });
  };

  return {
    eventDetailsModal: eventDetailsModal,
    vacationDetailsModal: vacationDetailsModal,
    vacationModal: vacationModal,
    shiftSwapDetailsModal: shiftSwapDetailsModal,
    genericEventDetailsModal: genericEventDetailsModal
  };
})


.service('updateReccurenceService', function() {
  this.updateRecurrenceShiftDetails = function(recurringForm, recurrenceModel,
      recurrenceEndModel, eventForm) {
    var frequency = recurringForm.frequency,
    recurrenceEnd = recurringForm.recurrenceEnd,
    recurrenceOptions,
    recurrenceEndOptions = recurrenceEndModel[recurrenceEnd].options,
    newRecurringForm = {},

    formatRecOptions = function(recValue) {
      return recValue.join(' ').trim().replace(/\s+/g, ',');
    },
    updateOptions = function(options) {
      for (var i = 0; i < options.length; i++) {
        var option = options[i],
        recValue = recurringForm[option] ? recurringForm[option] : '',
          formattedOptions = angular.isArray(recValue) ?
            formatRecOptions(recValue) : recValue;

            if (formattedOptions) {
              newRecurringForm[option] = formattedOptions;
            }
      }
    };

    if (recurrenceModel.hasOwnProperty(frequency)) {
      recurrenceOptions = recurrenceModel[frequency].options;
      newRecurringForm.frequency = frequency;
      newRecurringForm.interval = recurringForm.interval.toString();
      if (recurrenceOptions) {
        updateOptions(recurrenceOptions);
      }
    } else {
      newRecurringForm.frequency = 'WEEKLY';
      newRecurringForm.byweekday = frequency;
    }

    if (recurrenceEndOptions) {
      updateOptions(recurrenceEndOptions);
    }
    if (eventForm.changeAll != 'CLONE') {
      newRecurringForm.recurring_event_id = eventForm.recurrenceEventId;
      newRecurringForm.dtstart_recurr = recurringForm.dtstart;
      newRecurringForm.dtend_recurr = recurringForm.dtend;
    }
    eventForm.recurringEventDetails = newRecurringForm;
  };

});
