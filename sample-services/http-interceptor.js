'use strict';

angular.module('DemoApp')
    .factory('httpEnvInterceptor', function (ENV, StorageService) {
      return {

        request: function(config) {
          if (!_.contains(config.url, 'html')) {
            //Add the Auth header
            var accessToken = StorageService.getApiKey(),
                username = StorageService.getUserName();
            if(accessToken) {
              config.headers.AUTHORIZATION = 'ApiKey ' + username + ':' + accessToken;
            }

            //Append domain name by default for CORS requests
            config.url = ENV.apiEndpoint + config.url;
          }
          return config;
        }
      };
    });


