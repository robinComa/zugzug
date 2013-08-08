'use strict';

angular.module('zugzugApp')
  .controller('UserLoginCtrl', function ($rootScope, $scope, User, $http, $location) {

        var loginSuccess = function(data){
            $rootScope.user = data;
            $scope.$apply(function(){
                $location.path('contact/list');
            });
        };

        var loginError = function(status){
            switch (status){
                case undefined:
                    $scope.error = true;
                    $scope.answer = $rootScope.i18n.get('server.response.no.response');
                    break;
                case 0:
                    $scope.error = true;
                    $scope.answer = $rootScope.i18n.get('server.response.down');
                    break;
                case 'FB-ERROR':
                    $scope.error = true;
                    $scope.answer = $rootScope.i18n.get('server.response.facebook.error');
                    break;
                default :
                    $scope.error = true;
                    $scope.answer = $rootScope.i18n.get('server.response.undefined');
            }
        }

        var facebook = new $rootScope.Facebook(loginSuccess);

        $scope.loginFacebook = function(){
            facebook.login(loginSuccess, loginError('FB-ERROR'));
        };

        $scope.login = function(){
            $scope.error = false;
            $scope.warning = false;
            User.login({
                mainEmail : this.mainEmail,
                password : this.password
            }, loginSuccess, function(data){
                loginError(data.status)
            });
        };
  });
