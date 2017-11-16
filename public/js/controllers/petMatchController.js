var module = angular.module('PetMatch', []);

var controller = module.controller('PetMatchController', function($scope, $http) {
    $scope.match = function() {
        $scope.petName = null;
        $scope.petInfo = null;
        $scope.petImageBase64 = null;
        $scope.petSourceUrl = null;

        var ownerName = $scope.ownerName;
        var petType = $scope.petType;

        $http.get('/api/pets/generateMatch?ownerName=' + ownerName + '&petType=' + petType)
             .then(result => {
                $scope.petName = result.data.petName;
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
    }
});