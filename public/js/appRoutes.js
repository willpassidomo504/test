angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

    // home page
        .when('/login', {
            templateUrl: './views/login.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        })
        // .when('/new_beacon', {
        //     templateUrl: './views/new_beacon.html',
        //     controller: 'NewBeaconController',
        //     controllerAs: 'vm'
        // })
        .when('/dash_board', {
            templateUrl: './views/dashboard.html',
            controller: 'DashboardController',
            controllerAs: 'vm'
        });

    $locationProvider.html5Mode(true);


}]);
