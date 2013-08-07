'use strict';

angular.module('zugzugApp', ['zugzugApp.services.user', 'zugzugApp.services.i18n', 'zugzugApp.filters.i18n'])
  .config(function ($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'views/user/login.html',
            controller: 'LoginCtrl'
        })
        .when('/login', {
            templateUrl: 'views/user/login.html',
            controller: 'LoginCtrl'
        })
        .when('/create', {
            templateUrl: 'views/user/create.html',
            controller: 'CreateCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

  }).config(['$httpProvider', function ($httpProvider) {
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
    }]).run(function($rootScope, I18n) {

        /**Langage detection*/
        var langage = (navigator.browserLanguage ? navigator.browserLanguage : navigator.language);
        if (langage.indexOf('en') > -1) langage = 'en';
        else if (langage.indexOf('fr') > -1) langage = 'fr';
        else langage = 'en';

        /** i18n bootstrap */
        $rootScope.i18n = {
            dictionary : I18n.get({lang : langage}),
            get : function(input, args){
                if(!this.dictionary[input]){
                    return input;
                }
                var string = this.dictionary[input];
                for(var i in args){
                    string = string.replace(new RegExp('(\\{' + i + '\\})', "g"), args[i]);
                }
                return string;
            },
            changeLanguage : function (lang) {
                this.dictionary = I18n.get({lang : lang});
            }
        };

        /** Config */
        $rootScope.backend = 'http://ec2-54-214-124-166.us-west-2.compute.amazonaws.com\\:9090/mayo/rest/mayo/';
  });
