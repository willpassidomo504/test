(function () {
    'use strict';
    angular
        .module('DashboardCtrl', ['ngMaterial', ])
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$location', 'UserService', 'BeaconService', '$scope', '$mdDialog'];

    function DashboardController($location, UserService, BeaconService, $scope, $mdDialog) {
        var vm = this;
        vm.NewUser = NewUser;
        vm.NewBeacon = NewBeacon
        vm.SetUserId = SetUserId;
        vm.isAdmin = false;

        $scope.users = [];
        $scope.beacons = [];

        $scope.showConfirm = function(ev, type, id) {
            console.log("click");
            var title;
            var textContent;
            var okFun;

            switch (type) {
                case 'user':
                    title = "delete user?";
                    textContent = "are you sure you want to delete user: " + id;
                    okFun = function () {
                        UserService.DeleteUser(id, function (resp) {
                            if (resp) {
                                refreshUsers();
                            } else {
                                console.log("delete failed");
                            }
                        });
                    }
                    break;
                case 'beacon':
                    title = "delete beacon?";
                    textContent = "are you sure you want to delete beacon: " + id;
                    okFun = function() {
                        BeaconService.DeleteBeacon(id, function (resp) {
                            if (resp) {
                                refreshBeacons()
                            } else {
                                console.log("delete failed");
                            }
                        })
                    }
                    break;
                default:
                    break
            }

            var okText = "delete";
            var noText = "cancel"

            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title(title)
                .textContent(textContent)
                .targetEvent(ev)
                .ok(okText)
                .cancel(noText);

            $mdDialog.show(confirm).then(okFun, null);
        };


        refreshBeacons();
        refreshUsers();

        function NewUser() {
            UserService.NewUser(vm.username, vm.password, vm.isAdmin, function(response) {
                if (response) {
                    refreshUsers();
                }
            })
        }
        
        function NewBeacon() {
            BeaconService.AddBeacon(vm.userId, vm.beaconName, vm.beaconId, function (response) {
                if (response) {
                    refreshBeacons();
                } else {
                    //some shit got fucked up;
                }
            })
        }

        function SetUserId(userId) {
            vm.userId = userId;
        }

        function refreshBeacons() {
            BeaconService.GetBeacons(function(response) {
                $scope.beacons = response;
                clearBeacon();
                updateUserBeaconCount();
            });
        }

        function refreshUsers() {
            UserService.GetUsers(function (response) {
                $scope.users = response;
                clearUser();
                updateUserBeaconCount();
            });
        }

        function updateUserBeaconCount() {
            var usersDict = {};
            for (var i = 0; i < $scope.users.length; i++) {
                var user = $scope.users[i];
                user.beaconCount = 0;
                usersDict[user._id] = i;
            }
            for (var i = 0; i < $scope.beacons.length; i++) {
                var beacon = $scope.beacons[i];
                $scope.users[usersDict[beacon.userId]].beaconCount++;
            }

        }

        function clearBeacon() {
            vm.userId = "";
            vm.beaconName = "";
            vm.beaconId = "";
        }

        function clearUser() {
            vm.username = "";
            vm.password = "";
            vm.isAdmin = false;
        }

        function DialogController($scope, $mdDialog) {
            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };
        }
    }
})();