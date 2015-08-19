/**
 * Created by ralph on 18/3/14.
 */
angular.module('smartcalServices')

.factory('AppPreferences', function() {
  var //
  preferences = {},

  setPreferences = function(obj) {
    angular.forEach(obj, function(each) {
      var value = '';
      try {
        value = angular.fromJson(each.value);
      } catch(err) {
        value = each.value;
      }

      preferences[each.key] = value;
    });
  },

  getPreferences = function() {
    return preferences;
  };

  return {
    setPreferences: setPreferences,
    getPreferences: getPreferences
  };
})

//Constants set by user.
/* FIXME: Separate user preferences from app settings */
.constant('PREFERENCES', {
  'correctEventTypes': ['SHIFT'],
  'locationTypes': ['STATION'],
  'participantTypes': ['PERSON'],
  'eventColorTypes': ['SHIFT-COLOR', 'GIVER-COLOR'],
  'trimmedEvents': ['SHIFT'],
  'batchReqBaseUrl': '/api/v1/',
  's3ImageUrl': 'https://s3.amazonaws.com/calendar-data/'
});
