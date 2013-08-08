angular.module('zugzugApp.modules.facebook', []).run(['$rootScope', function($rootScope) {

    // Load the SDK asynchronously
    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/all.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));


    $rootScope.Facebook = function(alreadyConnectedCallback){

        var scope = this;

        var computeAvatar = function(id){
            return 'http://graph.facebook.com/' + id + '/picture';
        };

        var facebookInformation = function(facebookInformationCallback){
            FB.api('/me', function(resp) {
                var user = {
                    id : resp.id,
                    name : resp.name,
                    email : resp.email,
                    avatar : computeAvatar(resp.id)
                };
                facebookInformationCallback(user);
            });
        };

        window.fbAsyncInit = function() {

            // init the FB JS SDK
            FB.init({
                appId  : '463627307038698',
                status : true,
                cookie : true,
                xfbml  : true
            });

            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    if(alreadyConnectedCallback){
                        facebookInformation(function(user){
                            alreadyConnectedCallback(user);
                        });
                    }
                } else if (response.status === 'not_authorized') {

                } else {

                }
            });

        };

        this.login = function(successCallback, errorCallback){
            FB.login(function(response) {
                if (response.authResponse) {
                    facebookInformation(function(user){
                        successCallback(user);
                    });
                } else {
                    errorCallback();
                }
            });
        };

        this.getFriends = function(successCallback){
            FB.api('/me/friends', {}, function(response) {
                for (var i in response.data){
                    response.data[i].avatar = computeAvatar(response.data[i].id);
                }
                successCallback(response.data);
            });
        };

    };

}]);