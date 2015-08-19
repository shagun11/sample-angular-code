angular.module('DemoServices')

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
        lstTagType.unshift('l');
        typeCss = lstTagType.join('-');

        lstTagValue = tagValue.toLowerCase().split(' ');
        lstTagValue.unshift('l');
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

