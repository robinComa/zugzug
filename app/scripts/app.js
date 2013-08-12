'use strict';

angular.module('zugzugApp', [
        'zugzugApp.services.user',
        'zugzugApp.services.i18n',
        'zugzugApp.filters.i18n',
        'zugzugApp.modules.i18n',
        'zugzugApp.modules.facebook',
        'zugzugApp.modules.configuration'
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
