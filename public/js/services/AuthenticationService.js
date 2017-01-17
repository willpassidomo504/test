(function() {
    'use strict';

    angular
        .module('AuthenticationService', ['ngCookies'])
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.inject = ['$http', '$rootScope', '$cookies'];

    function AuthenticationService($http, $rootScope, $cookies) {
        var services = {};
        services.SetToken = SetToken;
        services.ClearToken = ClearToken;
        return services;

        var globals = 'globals';

        function SetToken(token) {
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    token: token
                }
            };

            // set default auth header for http requests
            $http.defaults.headers.common['x-access-token'] = token;

            // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
            var cookieExp = new Date();
            cookieExp.setDate(cookieExp.getDate() + 1);
            $cookies.putObject(globals, $rootScope.globals, { expires: cookieExp });
        }

        function ClearToken() {
            $rootScope.globals = {};
            $cookies.remove(globals);
            $http.defaults.headers.common.Authorization = 'Basic';
        }




    }





})();