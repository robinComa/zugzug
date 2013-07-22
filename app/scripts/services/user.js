'use strict';

angular.module('zugzugApp.services.user', ['ngResource'])

    .factory('User', ['$resource', '$rootScope',
        function ($resource, $rootScope) {
            return $resource($rootScope.backend, {'method' : '@method'}, {
                login: {
                    method:'POST',
                    params: {
                        method: 'login'
                    }
                },
                create: {
                    method:'POST',
                    params: {
                        method: 'create'
                    }
                }
            });
        }
    ])

;