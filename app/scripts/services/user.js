'use strict';

angular.module('zugzugApp.services.user', ['ngResource'])

    .factory('User', function ($http, $rootScope) {

            var fakeUser = {
                lastName : 'My Last Name',
                firstName : 'My First Name'
            };

            return {
                login: function(attr, callbackSuccess, callbackError){
                    $http.post($rootScope.backend + 'login', attr).success(function(response) {
                        callbackSuccess(response);
                    }).error(function(response) {
                        //callbackError(response); TODO remove comment
                            callbackSuccess(fakeUser);
                    });
                },
                create: function(attr, callbackSuccess, callbackError){
                    $http.post($rootScope.backend + 'registerUser', attr).success(function(response) {
                        callbackSuccess(response);
                    }).error(function(response) {
                            //callbackError(response); TODO remove comment
                            callbackSuccess(fakeUser);
                        });
                }
            }
});