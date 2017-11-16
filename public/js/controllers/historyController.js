var module = angular.module('History', []);

var controller = module.controller('HistoryController', function($scope, $http) {
    $scope.loading = true;
    $http.get('/api/history')
        .then(result => {
            $scope.history = result.data;
            $scope.loading = false;
        });
});