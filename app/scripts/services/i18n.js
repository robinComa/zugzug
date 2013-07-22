angular.module('zugzugApp.services.i18n', ['ngResource']).factory('I18n', function($resource){
    //TODO other i18n file (ex : fr, ...)
    //return $resource('i18n/:lang.json', {lang:'@lang'});
    return $resource('i18n/en.json', {lang:'@lang'});
})