angular.module('zugzugApp.modules.configuration', []).run(['$rootScope', function($rootScope) {
    $rootScope.configuration = {
        server : 'http://ec2-54-214-124-166.us-west-2.compute.amazonaws.com\\:9090/mayo/rest/mayo/'
    };
}]);