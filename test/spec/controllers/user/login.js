'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('zugzugApp'));

  var $httpBackend, createController, $rootScope, $scope;

    beforeEach(inject(function($injector) {

        // Get hold of a scope (i.e. the root scope)
        $rootScope = $injector.get('$rootScope');

        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');

        // backend definition common for all tests
        $httpBackend.when('GET', $rootScope.backend + 'login').respond('ok');

        // The $controller service is used to create instances of controllers
        var $controller = $injector.get('$controller');

        createController = function() {
            return $controller('LoginCtrl', {'$scope' : $rootScope });
        };
    }));

  /**it('Login REST should work', function () {

      var controller = createController();
      $httpBackend.flush();

      $httpBackend.expectPOST($rootScope.backend + 'login', {
          mainEmail : 'email@test.com',
          password : 'secret'
      }).respond(0, 'ok');

      $scope.login({
          mainEmail : 'email@test.com',
          password : 'secret'
      });

  });*/
});
