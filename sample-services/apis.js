angular.module('DemoServices')

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

//Resource objects for User managemaent
.factory('UserApis', function($resource) {
  return {
    getPeople: function() {
      return $resource('/api/v0/users/?limit', {});
    },

    getUserDetail: function() {
      return $resource('/api/v0/people/', {});
    },

    singleUserDetail: function() {
      return $resource('/api/v0/people/:peopleId/', {},
          {'update': {method: 'PUT'}});
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
