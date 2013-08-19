angular.module('i18n', []).run(function($rootScope, I18n) {
    /**Langage detection*/
    var langage = (navigator.browserLanguage ? navigator.browserLanguage : navigator.language);
    if (langage.indexOf('en') > -1) langage = 'en';
    else if (langage.indexOf('fr') > -1) langage = 'fr';
    else langage = 'en';

    langage = 'en';//TODO remove

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
});