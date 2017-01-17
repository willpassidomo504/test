(function () {
    'use strict';

    angular
        .module('UserService',[])
        .factory('UserService', UserService);

    //UserService.$inject = ['$http', 'AuthenticationService'];

    function UserService ($http, AuthenticationService) {

        var service = {};
        service.Login = Login;
        service.GetUsers = GetUsers;
        service.NewUser = NewUser;
        service.DeleteUser = DeleteUser;
        return service;

        function GetUsers(cb) {
            $http.get('/api/users')
                .then(function successCallback(response) {
                    cb(response.data);
                })
        }

        function Login(username, password, cb) {
            $http.post('/api/login', {username: username, password: password})
                .then(function successCallback(response) {
                    var success = response.data.status == "success"
                    if (success) {
                        AuthenticationService.SetToken(response.data.token);
                    }
                    cb(success);
                }, function errorCallback(response) {
                    cb(response);
                });
        }

        function NewUser(username, password, isAdmin, cb) {
            $http.post('/api/users',
                {
                    username: username,
                    password: password,
                    isAdmin: isAdmin
                }).then(function succress(response) {
                    cb(response.data);
            }, function failure(response) {
                    cb(false);
            });
        }

        function DeleteUser(id, cb) {
            $http.delete('/api/users/' + id)
                .then(function success(response) {
                    cb(response.data);
                }, function failure(response) {
                    cb(false);
                })
        }

    }
})();