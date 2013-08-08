angular.module('zugzugApp.services.i18n', ['ngResource']).factory('I18n', function($resource){
    return $resource('i18n/:lang.json', {lang:'@lang'});
})