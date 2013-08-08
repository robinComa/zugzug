'use strict';

angular.module('zugzugApp')
    .controller('ContactListCtrl', function ($rootScope, $scope, User) {

        var facebook = new $rootScope.Facebook();

        facebook.getFriends(function(friends){
            $scope.$apply(function() {
                $scope.facebookFriends = friends;
            });
        });

        $scope.clickFacebookFriend = function(id){

            this.loading = true;
            var scope = this;
            var success = function(){
                scope.active = !scope.active;
                scope.loading = false;
            };

            var error = function(){
                scope.loading = false;
            };

            if(this.active){
                User.removeFacebookFriend(id, success, error);
            }else{
                User.addFacebookFriend(id, success, error);
            }
        };

    });
