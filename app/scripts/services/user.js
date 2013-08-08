'use strict';

angular.module('zugzugApp.services.user', ['ngResource'])

    .factory('User', function ($http, $rootScope) {

            return {
                login: function(attr, callbackSuccess, callbackError){
                    $http.post($rootScope.configuration.server + 'login', attr).success(function(response) {
                        callbackSuccess(response);
                    }).error(function(response) {
                        callbackError(response);
                    });
                },
                create: function(attr, callbackSuccess, callbackError){
                    $http.post($rootScope.configuration.server + 'registerUser', attr).success(function(response) {
                        callbackSuccess(response);
                    }).error(function(response) {
                        callbackError(response);
                    });
                },
                addFacebookFriend : function(id, callbackSuccess, callbackError){
                    $http.post($rootScope.configuration.server + 'addFacebookFriend', id).success(function(response) {
                        callbackSuccess();
                    }).error(function(response) {
                        //callbackError(); TODO remove comment
                        callbackSuccess();
                    });
                },
                removeFacebookFriend : function(id, callbackSuccess, callbackError){
                    $http.post($rootScope.configuration.server + 'removeFacebookFriend', id).success(function(response) {
                        callbackSuccess();
                    }).error(function(response) {
                        //callbackError(); TODO remove comment
                        callbackSuccess();
                    });
                }
            }
});