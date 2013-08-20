'use strict';

angular.module('zugzugApp', [
        'ngCookies',
        'ngI18n',
        'zugzugApp.services.user',
        'zugzugApp.modules.configuration',
        'utils',
        'routeAuth',
        'facebook'

    ]).config(function ($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'views/user/login.html',
            controller: 'UserLoginCtrl'
        })
        .when('/user/login', {
            templateUrl: 'views/user/login.html',
            controller: 'UserLoginCtrl'
        })
        .when('/user/create', {
            templateUrl: 'views/user/create.html',
            controller: 'UserCreateCtrl'
        })
        .when('/contact/list', {
            templateUrl: 'views/contact/list.html',
            controller: 'ContactListCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

  }).config(['$httpProvider', function ($httpProvider) {
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
  }]);
