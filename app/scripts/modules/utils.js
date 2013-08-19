angular.module('utils', []).run(function($rootScope) {
    $rootScope.utils = {

        isInArray : function(value, array){
            for(var i in array){
                if(array[i] == value){
                    return true;
                }
            }
            return false;
        }

    };
});