'use strict';

angular.module('zugzugApp')
  .controller('UserLoginCtrl', function ($scope, User, $http, $location) {
        $scope.login = function(){
        $scope.error = false;
        $scope.warning = false;
        User.login({
            mainEmail : this.mainEmail,
            password : this.password
        }, function(data){
            $location.path('contact/list')
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
