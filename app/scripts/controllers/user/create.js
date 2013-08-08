'use strict';

angular.module('zugzugApp')
    .controller('UserCreateCtrl', function ($rootScope, $scope, User) {

        $scope.addMail = function(){
            if(!$scope.emails){
                $scope.emails = [];
            }
            $scope.emails.push($scope.newMail);
            $scope.newMail = '';
        };

        $scope.addPhone = function(){
            if(!$scope.phones){
                $scope.phones = [];
            }
            $scope.phones.push($scope.newPhone);
            $scope.newPhone = '';
        };

        $scope.create = function(){
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
        };
    });
