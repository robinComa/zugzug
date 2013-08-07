'use strict';

angular.module('zugzugApp')
  .controller('LoginCtrl', function ($scope, User, $http) {
        $scope.login = function(){
        $scope.error = false;
        $scope.warning = false;
        User.login({
            mainEmail : this.mainEmail,
            password : this.password
        }, function(data){
            $scope.answer = data;
        }, function(data){
            switch (data.status){
                case 0:
                    $scope.error = true;
                    $scope.answer = data;
                    break;
                default :
                    $scope.error = true;
                    $scope.answer = data;
            }
        });
    }
  });
