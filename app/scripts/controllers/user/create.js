'use strict';

angular.module('zugzugApp')
    .controller('UserCreateCtrl', function ($rootScope, $scope, User, $location) {
        if($rootScope.user){
            $scope.otherLogin = true;//Not classic login (ex : FB, google, ...)
            $scope.auth = 'Facebook';
            $scope.password1 = $scope.password2 = 'UnusedPassword';//For form validation

            $scope.mainEmail = $rootScope.user.email;
            $scope.name = $rootScope.user.name;
            $scope.avatar = $rootScope.user.avatar;
        }

        $scope.addMail = function(){
            if($scope.createUserForm.newMail.$valid && $scope.newMail){
                if(!$scope.emails){
                    $scope.emails = [];
                }
                $scope.emails.push($scope.newMail);
                $scope.newMail = '';
            }
        };

        $scope.addPhone = function(){
            if($scope.createUserForm.newPhone.$valid && $scope.newPhone){
                if(!$scope.phones){
                    $scope.phones = [];
                }
                $scope.phones.push($scope.newPhone);
                $scope.newPhone = '';
            }
        };

        $scope.passwordAreEquals = function(){
            return $scope.password1 == $scope.password2;
        };

        $scope.birthdayIsValid = function(){
            var birthday = new Date($scope.birthday);
            if(isNaN(birthday.getTime())){
                return false;
            }
            var now = new Date();
            birthday.setFullYear(birthday.getFullYear() + 16);
            return now >= birthday;
        };

        $scope.moreThan16Change = function(){
            if(this.y16){
                if(!$scope.birthdayIsValid()){
                    this.y16 = false;
                    $('#inputBirthday').focus();
                    $("html, body").animate({ scrollTop: $('#inputBirthday').offset().top - 80 }, 1000);
                }
            }
        };

        $scope.formIsValid = function(){
            return $scope.createUserForm.$valid && $scope.passwordAreEquals && $scope.birthdayIsValid;
        };

        $scope.create = function(){
            if($scope.formIsValid()){
                $scope.error = false;
                $scope.warning = false;

                var user = {
                    avatar      : this.avatar,
                    mainEmail   : this.mainEmail,
                    name        : this.name,
                    gender      : this.gender,
                    birthday    : this.birthday,
                    emails      : $scope.emails,
                    phones      : $scope.phones
                };

                if($scope.otherLogin){
                    user.auth = $scope.auth;
                }else{
                    user.password = this.password1;
                }

                User.create(user, function(data){
                    $location.path('/contact/list')
                }, function(data){
                    switch (data.status){
                        case 0:
                            $scope.error = true;
                            $scope.answer = $rootScope.i18n.get('server.response.down');
                            break;
                        default :
                            $scope.error = true;
                            $scope.answer = $rootScope.i18n.get('server.response.undefined');
                    }
                });
            }
        };
    });
