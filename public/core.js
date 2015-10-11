var scotchTodo = angular.module('scotchTodo', []);
scotchTodo.controller("mainController", function($scope, $http) {
    $scope.lat;
    $scope.lng;
    $scope.desc;
    $scope.locations;
    $scope.loc = {};
    $scope.radius;
    $scope.getLocation = function() {
        if ($scope.radius === undefined || $scope.radius === "") {
            $scope.radius = 1800;
        }
        if ($scope.lat === undefined || $scope.lat === "") {
            $scope.lat = 18;
        }
        if ($scope.lng === undefined || $scope.lng === "") {
            $scope.lng = 73;
        }
        var reqData = {
            radius: $scope.radius,
            lat: $scope.lat,
            lng: $scope.lng,
            isActive: false
        };
        //db.locations.ensureIndex({ position: '2dsphere' });
        console.log("req data" + JSON.stringify(reqData))
        $http.get('/api/location', {
                params: reqData,
            }).success(function(data) {
                $scope.locations = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
    $scope.createLocation = function() {
        var location = {};
        location.lat = $scope.lat;
        location.lng = $scope.lng;
        location.desc = $scope.desc;
        console.log("post data object >>>" + JSON.stringify(location))
        $http.post('/api/location', location)
            .success(function(data) {
                $scope.locations = data;
                console.log("req.body.lat" + JSON.stringify(data));
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    // delete a todo after checking it
    $scope.deleteLocation = function(locationId) {
        console.log("delete id >>>" + locationId);
        $http.delete('/api/location/' + locationId)
            .success(function(data) {
                $scope.locations = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    $scope.activateLocation = function(locationId) {
        console.log("put id >>>" + locationId);
        var loc = {};
        loc.isActive = false;
        console.log("post data object >>>" + JSON.stringify(loc))
        $http.put("/api/location/" + locationId, loc).success(function(data) {
                $scope.locations = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    $scope.getLocation();
});