var module = angular.module('Home', []);

var controller = module.controller('HomeController', function($scope) {
    $scope.todaysDate = new Date().toDateString();
});