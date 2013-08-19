angular.module('routeAuth', []).run(function($rootScope, $location, $cookieStore, Facebook) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {

        var noAccountUrls = [
            'views/user/login.html',
            'views/user/create.html'
        ];

        //Not Logged
        if(!$cookieStore.get('user') && !$rootScope.utils.isInArray(next.templateUrl, noAccountUrls)) {
            $location.path( "/" );
        }
        //Logged
        else if($cookieStore.get('user') && $rootScope.utils.isInArray(next.templateUrl, noAccountUrls)){
            $location.path( "/contact/list" );
        }
    });
});