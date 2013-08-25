'use strict';

angular.module('facebook', ['ngResource'])

    .factory('Facebook', function ($rootScope) {

        // Load the SDK asynchronously
        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/all.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));


        var initLoaded = false;
        window.fbAsyncInit = function() {
            // init the FB JS SDK
            FB.init({
                appId  : '408979389207877',
                status : true,
                cookie : true,
                xfbml  : true
            });
            initLoaded = true;
        };

        var computeAvatar = function(id){
            return 'http://graph.facebook.com/' + id + '/picture';
        };

        var isReady =  function(callbackSuccess){
            var interval = setInterval(function() {
                if (window['FB'] && initLoaded) {
                    callbackSuccess();
                    clearInterval(interval);
                }
            }, 10);
        };

        return {

            isReady : function(callbackSuccess){
                isReady(callbackSuccess);
            },

            login: function(callbackSuccess, callbackError){

                var facebookInformation = function(facebookInformationCallback){
                    FB.api('/me', function(resp) {
                        var user = {
                            id : resp.id,
                            name : resp.name,
                            email : resp.email,
                            avatar : computeAvatar(resp.id)
                        };
                        facebookInformationCallback(user);
                    });
                };

                isReady(function(){
                    FB.login(function(response) {
                        if (response.authResponse) {
                            facebookInformation(function(user){
                                callbackSuccess(user);
                            });
                        } else if(callbackError) {
                            callbackError();
                        }
                    });
                });
            },

            getFriends : function(callbackSuccess){
                FB.api('/me/friends', {}, function(response) {
                    for (var i in response.data){
                        response.data[i].avatar = computeAvatar(response.data[i].id);
                    }
                    callbackSuccess(response.data);
                });
            },

            logout : function(){
                FB.logout();
            }
        }
});