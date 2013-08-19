'use strict';

angular.module('zugzugApp')
  .controller('NavBarCtrl', function ($rootScope, $scope, Facebook, $location, $cookieStore) {

    $rootScope.isAuth = $cookieStore.get('user') != null;

    $scope.logout = function(){
        Facebook.logout();
        $rootScope.isAuth = false;
        $cookieStore.put('user', null);
        $location.path('/');
    };

  });
