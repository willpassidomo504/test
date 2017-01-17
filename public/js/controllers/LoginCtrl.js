/**
 * Created by willpassidomo on 12/30/16.
 */
(function () {
    'use strict';
    angular
        .module('LoginCtrl', [])
        .controller('LoginController', LoginController);


    LoginController.$inject = ['$location', 'UserService'];

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login() {
            vm.dataLoading = true;
            UserService.Login(vm.username, vm.password, function (response) {
                if (response) {
                    $location.path('/dash_board');
                } else {
                    vm.dataLoading = false;
                }
            })
        }

    };
})();