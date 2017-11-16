angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })
        .when('/pets/matchmaker', {
            templateUrl: 'views/petMatcher.html',
            controller: 'PetMatchController'
        })
        .when('/pets/random', {
            templateUrl: 'views/petRandomiser.html',
            controller: 'PetRandomController'
        })
        .when('/history', {
            templateUrl: 'views/history.html',
            controller: 'HistoryController'
        });

    //$locationProvider.html5Mode(true);
}]);