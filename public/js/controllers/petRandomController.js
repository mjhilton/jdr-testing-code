var module = angular.module('PetRandom', []);

var controller = module.controller('PetRandomController', function($scope, $http) {
    $scope.randomise = function() {
        $scope.petName = null;
        $scope.petType = null;
        $scope.petInfo = null;
        $scope.petSourceUrl = null;
        $scope.petImageBase64 = null;

        $http.get('/api/pets/random')
             .then(result => {
                 $scope.petName = result.data.petName;
                 $scope.petType = result.data.petType;
             })
             .then(() => {
                 $scope.loading = true;
                 return $http.get('/api/pets/info/' + $scope.petName);
             })
            .then(result => {
                $scope.petInfo = result.data.info;
                $scope.petImageBase64 = result.data.image;
                $scope.petSourceUrl = result.data.source;
                $scope.loading = false;
            });
    };
});