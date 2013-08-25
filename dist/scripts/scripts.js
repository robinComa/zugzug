"use strict";angular.module("zugzugApp",["ngCookies","ngI18n","zugzugApp.services.user","zugzugApp.modules.configuration","utils","routeAuth","facebook"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/user/login.html",controller:"UserLoginCtrl"}).when("/user/login",{templateUrl:"views/user/login.html",controller:"UserLoginCtrl"}).when("/user/create",{templateUrl:"views/user/create.html",controller:"UserCreateCtrl"}).when("/contact/list",{templateUrl:"views/contact/list.html",controller:"ContactListCtrl"}).otherwise({redirectTo:"/"})}]).config(["$httpProvider",function(a){delete a.defaults.headers.common["X-Requested-With"]}]),angular.module("zugzugApp.services.user",["ngResource"]).factory("User",["$http","$rootScope","$cookieStore",function(a,b,c){var d={user:{id:1,name:"Røbin Cøma Del Fanta",avatar:"http://graph.facebook.com/100005744828937/picture",api:["facebook"],check:{facebook:[705248192]}}};return null!=c.get("user")&&(d.user=c.get("user")),{login:function(a,b){c.put("user",d.user),b(c.get("user"))},exist:function(a,b){c.put("user",d.user),b(c.get("user"))},create:function(a,b){c.put("user",d.user),b(c.get("user"))},activeApi:function(a,b){var d=c.get("user");d.api.push(a),c.put("user",d),b()},addFacebookFriend:function(a,b){var d=c.get("user");d.check.facebook.push(a),c.put("user",d),b()},removeFacebookFriend:function(a,b){var d=c.get("user");d.check.facebook.splice(1,d.check.facebook.indexOf(a)),c.put("user",d),b()}}}]),angular.module("zugzugApp").controller("NavBarCtrl",["$rootScope","$scope","Facebook","$location","$cookieStore",function(a,b,c,d,e){a.isAuth=null!=e.get("user"),b.logout=function(){c.logout(),a.isAuth=!1,e.put("user",null),d.path("/")}}]),angular.module("zugzugApp").controller("UserLoginCtrl",["$rootScope","$scope","User","$location","Facebook","$cookieStore","$i18n",function(a,b,c,d,e,f,g){var h=function(){a.isAuth=!0,d.path("contact/list")},i=function(e){c.exist(e,function(){b.$apply(function(){h()})},function(){b.$apply(function(){a.user=e,d.path("user/create")})})},j=function(a){switch(a){case void 0:b.error=!0,b.answer=g.get("server.response.no.response");break;case 0:b.error=!0,b.answer=g.get("server.response.down");break;case"FB-ERROR":b.error=!0,b.answer=g.get("server.response.facebook.error");break;default:b.error=!0,b.answer=g.get("server.response.undefined")}};e.isReady(function(){b.$apply(function(){b.facebookIsReady=!0,b.loginFacebook=function(){e.login(i,j("FB-ERROR"))}})}),b.login=function(){b.error=!1,b.warning=!1,c.login({mainEmail:this.mainEmail,password:this.password},h,function(a){j(a.status)})}}]),angular.module("zugzugApp").controller("UserCreateCtrl",["$rootScope","$scope","User","$location",function(a,b,c,d){a.user&&(b.otherLogin=!0,b.auth="Facebook",b.password1=b.password2="UnusedPassword",b.mainEmail=a.user.email,b.name=a.user.name,b.avatar=a.user.avatar),b.addMail=function(){b.createUserForm.newMail.$valid&&b.newMail&&(b.emails||(b.emails=[]),b.emails.push(b.newMail),b.newMail="")},b.addPhone=function(){b.createUserForm.newPhone.$valid&&b.newPhone&&(b.phones||(b.phones=[]),b.phones.push(b.newPhone),b.newPhone="")},b.passwordAreEquals=function(){return b.password1==b.password2},b.birthdayIsValid=function(){var a=new Date(b.birthday);if(isNaN(a.getTime()))return!1;var c=new Date;return a.setFullYear(a.getFullYear()+16),c>=a},b.moreThan16Change=function(){this.y16&&(b.birthdayIsValid()||(this.y16=!1,$("#inputBirthday").focus(),$("html, body").animate({scrollTop:$("#inputBirthday").offset().top-80},1e3)))},b.formIsValid=function(){return b.createUserForm.$valid&&b.passwordAreEquals&&b.birthdayIsValid},b.create=function(){if(b.formIsValid()){b.error=!1,b.warning=!1;var e={avatar:this.avatar,mainEmail:this.mainEmail,name:this.name,gender:this.gender,birthday:this.birthday,emails:b.emails,phones:b.phones};b.otherLogin?e.auth=b.auth:e.password=this.password1,c.create(e,function(){d.path("/contact/list")},function(c){switch(c.status){case 0:b.error=!0,b.answer=a.i18n.get("server.response.down");break;default:b.error=!0,b.answer=a.i18n.get("server.response.undefined")}})}}}]),angular.module("zugzugApp").controller("ContactListCtrl",["$rootScope","$scope","User","I18n","$cookieStore","Facebook",function(a,b,c,d,e,f){b.user=e.get("user"),b.contactsAvailable={facebook:!1};var g=function(){c.activeApi("facebook",function(){b.contactsAvailable.facebook=!0,f.getFriends(function(a){b.$apply(function(){b.facebookFriends=a})})},function(){})};f.login(function(){a.utils.isInArray("facebook",b.user.api)&&(b.contactsAvailable.facebook=!0,g())}),b.addFacebookContacts=function(){g()},b.alreadyFacebookChecked=function(c){return a.utils.isInArray(c,b.user.check.facebook)},b.clickFacebookFriend=function(a){this.loading=!0;var b=this,d=function(){b.active=!b.active,b.loading=!1},e=function(){b.loading=!1};this.active?c.removeFacebookFriend(a,d,e):c.addFacebookFriend(a,d,e)}}]),angular.module("utils",[]).run(["$rootScope",function(a){a.utils={isInArray:function(a,b){for(var c in b)if(b[c]==a)return!0;return!1}}}]),angular.module("facebook",["ngResource"]).factory("Facebook",["$rootScope",function(){!function(a,b,c){var d,e=a.getElementsByTagName(b)[0];a.getElementById(c)||(d=a.createElement(b),d.id=c,d.src="//connect.facebook.net/en_US/all.js",e.parentNode.insertBefore(d,e))}(document,"script","facebook-jssdk");var a=!1;window.fbAsyncInit=function(){FB.init({appId:"463627307038698",status:!0,cookie:!0,xfbml:!0}),a=!0};var b=function(a){return"http://graph.facebook.com/"+a+"/picture"},c=function(b){var c=setInterval(function(){window.FB&&a&&(b(),clearInterval(c))},10)};return{isReady:function(a){c(a)},login:function(a,d){var e=function(a){FB.api("/me",function(c){var d={id:c.id,name:c.name,email:c.email,avatar:b(c.id)};a(d)})};c(function(){FB.login(function(b){b.authResponse?e(function(b){a(b)}):d&&d()})})},getFriends:function(a){FB.api("/me/friends",{},function(c){for(var d in c.data)c.data[d].avatar=b(c.data[d].id);a(c.data)})},logout:function(){FB.logout()}}}]),angular.module("routeAuth",[]).run(["$rootScope","$location","$cookieStore","Facebook",function(a,b,c){a.$on("$routeChangeStart",function(d,e){var f=["views/user/login.html","views/user/create.html"];c.get("user")||a.utils.isInArray(e.templateUrl,f)?c.get("user")&&a.utils.isInArray(e.templateUrl,f)&&b.path("/contact/list"):b.path("/")})}]),angular.module("zugzugApp.modules.configuration",[]).run(["$rootScope",function(a){a.configuration={server:"http://ec2-54-214-124-166.us-west-2.compute.amazonaws.com\\:9090/mayo/rest/mayo/"}}]);