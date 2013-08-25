'use strict';

angular.module('zugzugApp')
    .controller('ContactListCtrl', function ($rootScope, $scope, User, $i18n, $cookieStore, Facebook) {

        $scope.user = $cookieStore.get('user');

        $scope.contactsAvailable = {
            facebook : false
        };

        var facebookContactsShow = function(){
            User.activeApi('facebook', function(){
                $scope.contactsAvailable.facebook = true;
                Facebook.getFriends(function(friends){
                    $scope.$apply(function() {
                        $scope.facebookFriends = friends;
                    });
                });

            }, function(){

            });
        }

        Facebook.login(function(){
            if($rootScope.utils.isInArray('facebook', $scope.user.api)){
                $scope.contactsAvailable.facebook = true;
                facebookContactsShow();
            }
        });

        $scope.addFacebookContacts = function(){
            facebookContactsShow();
        };

        $scope.alreadyFacebookChecked = function(id){
            return $rootScope.utils.isInArray(id, $scope.user.check.facebook);
        };

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
