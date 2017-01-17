(function () {
    'use strict';

    angular
        .module('BeaconService',[])
        .factory('BeaconService', BeaconService);

    BeaconService.inject = ['$http'];

    function BeaconService($http) {
        var services = {}
        services.AddBeacon = AddBeacon;
        services.GetBeacons = GetBeacons;
        services.DeleteBeacon = DeleteBeacon;
        return services;

        function GetBeacons(cb) {
            $http.get('/api/beacons')
                .then(function success(response) {
                    cb(response.data)
                }, function failure(response) {
                    cb([])
                })
        }

        function AddBeacon(userId, beaconName, beaconId, cb) {
            $http.post('/api/beacons',
                {
                    userId: userId,
                    beaconName: beaconName,
                    beaconId: beaconId
                })
                .then(function success(response) {
                    cb(response.data);
                }, function failure(response) {
                    cb(false);
                });
        }

        function DeleteBeacon(id, cb) {
            $http.delete('/api/beacons/' + id)
                .then(function success(response) {
                    cb(response.data);
                }, function failure(response) {
                    cb(false);
                })
        }
    }



})();