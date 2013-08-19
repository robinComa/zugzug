'use strict';

angular.module('zugzugApp.services.user', ['ngResource'])

    .factory('User', function ($http, $rootScope, $cookieStore) {

        //TODO remove
        var mock = {
            user : {
                id : 1,
                name : "Røbin Cøma Del Fanta",
                avatar : "http://graph.facebook.com/100005744828937/picture",
                api : [
                    'facebook'
                ],
                check : {
                    facebook : [
                        705248192
                    ]
                }
            }
        };

        if($cookieStore.get('user') != null){
            mock.user = $cookieStore.get('user');
        }

        return {
            login: function(attr, callbackSuccess, callbackError){
                //TODO remove
                $cookieStore.put('user', mock.user);
                callbackSuccess($cookieStore.get('user'));
                //callbackError();
                return;

                $http.post($rootScope.configuration.server + 'login', attr).success(function(response) {
                    $cookieStore.put('user', response);
                    callbackSuccess(response);
                }).error(function(response) {
                    callbackError(response);
                });
            },
            exist: function(attr, callbackSuccess, callbackError){
                //TODO remove
                $cookieStore.put('user', mock.user);
                callbackSuccess($cookieStore.get('user'));
                //callbackError();
                return;

                $http.post($rootScope.configuration.server + 'existUser', attr).success(function(response) {
                    $cookieStore.put('user', response);
                    callbackSuccess(response);
                }).error(function(response) {
                    callbackError(response);
                });
            },
            create: function(attr, callbackSuccess, callbackError){
                //TODO remove
                $cookieStore.put('user', mock.user);
                callbackSuccess($cookieStore.get('user'));
                //callbackError();
                return;

                $http.post($rootScope.configuration.server + 'registerUser', attr).success(function(response) {
                    $cookieStore.put('user', response);
                    callbackSuccess(response);
                }).error(function(response) {
                    callbackError(response);
                });
            },
            activeApi : function(apiName, callbackSuccess, callbackError){
                //TODO remove
                var user = $cookieStore.get('user');
                user.api.push(apiName);
                $cookieStore.put('user', user);
                callbackSuccess();
                //callbackError();
                return;

                $http.post($rootScope.configuration.server + 'activeApi', apiName).success(function(response) {
                    var user = $cookieStore.get('user');
                    user.api.push(apiName);
                    $cookieStore.put('user', user);
                    callbackSuccess();
                }).error(function(response) {
                    callbackError();
                });
            },
            addFacebookFriend : function(id, callbackSuccess, callbackError){
                //TODO remove
                var user = $cookieStore.get('user');
                user.check.facebook.push(id);
                $cookieStore.put('user', user);
                callbackSuccess();
                //callbackError();
                return;

                $http.post($rootScope.configuration.server + 'addFacebookFriend', id).success(function(response) {
                    var user = $cookieStore.get('user');
                    user.check.facebook.push(id);
                    $cookieStore.put('user', user);
                    callbackSuccess();
                }).error(function(response) {
                    callbackError();
                });
            },
            removeFacebookFriend : function(id, callbackSuccess, callbackError){
                //TODO remove
                var user = $cookieStore.get('user');
                user.check.facebook.splice(1, user.check.facebook.indexOf(id));
                $cookieStore.put('user', user);
                callbackSuccess();
                //callbackError();
                return;

                $http.post($rootScope.configuration.server + 'removeFacebookFriend', id).success(function(response) {
                    var user = $cookieStore.get('user');
                    user.check.facebook.splice(1, user.check.facebook.indexOf(id));
                    $cookieStore.put('user', user);
                    callbackSuccess();
                }).error(function(response) {
                    callbackError();
                });
            }
        }
});