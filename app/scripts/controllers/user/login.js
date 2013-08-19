'use strict';

angular.module('zugzugApp')
  .controller('UserLoginCtrl', function ($rootScope, $scope, User, $location, Facebook, $cookieStore) {

        var loginSuccess = function(){
            $rootScope.isAuth = true;
            $location.path('contact/list');
        };

        var loginApiSuccess = function(data){
            User.exist(data, function(data){
                $scope.$apply(function(){
                    loginSuccess();
                });
            }, function(){
                $scope.$apply(function(){
                    $rootScope.user = data;
                    $location.path('user/create');
                });
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
        };

        Facebook.isReady(function(){
            $scope.$apply(function(){
                $scope.facebookIsReady = true;
                $scope.loginFacebook = function(){
                    Facebook.login(loginApiSuccess, loginError('FB-ERROR'));
                };
            });
        });

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
