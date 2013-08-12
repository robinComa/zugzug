'use strict';

angular.module('zugzugApp')
    .controller('UserCreateCtrl', function ($rootScope, $scope, User) {

        if($rootScope.user){
            $scope.mainEmail = $rootScope.user.email;
            $scope.name = $rootScope.user.name;
            $scope.avatar = $rootScope.user.avatar;
        }

        $scope.addMail = function(){
            if($scope.createUserForm.newMail.$valid && $scope.newMail){
                if(!$scope.emails){
                    $scope.emails = [];
                }
                $scope.emails.push($scope.newMail);
                $scope.newMail = '';
            }
        };

        $scope.addPhone = function(){
            if($scope.createUserForm.newPhone.$valid && $scope.newPhone){
                if(!$scope.phones){
                    $scope.phones = [];
                }
                $scope.phones.push($scope.newPhone);
                $scope.newPhone = '';
            }
        };

        $scope.create = function(){
            if($scope.createUserForm.$valid){
                $scope.error = false;
                $scope.warning = false;
                User.create({
                    mainEmail   : this.mainEmail,
                    name        : this.name,
                    password    : this.password,
                    emails      : $scope.emails,
                    phones      : this.phones
                }, function(data){
                    $scope.answer = data;
                }, function(data){
                    switch (data.status){
                        case 0:
                            $scope.error = true;
                            $scope.answer = $rootScope.i18n.get('server.response.down');
                            break;
                        default :
                            $scope.error = true;
                            $scope.answer = $rootScope.i18n.get('server.response.undefined');
                    }
                });
            }
        };
    });
