app.controller('IndexController', function($scope, $http, $compile, $rootScope) {

	$rootScope.pendingRequests = 0;
	$rootScope.checkLoadingDiv = function() {
		if ($rootScope.pendingRequests > 0) {
			$("#loading").show();
		} else {
			$("#loading").hide();
		}
	};

	var headers = {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

	$scope.list = function(){
		$rootScope.pendingRequests++;
		$scope.checkLoadingDiv();

		$http({
			method: 'GET', 
			url: 'http://mcollector.herokuapp.com/api/missions',
			headers: headers,

		}).success(function(data, status, headers, config) {
			// this callback will be called asynchronously
			// when the response is available
			$scope.missions = data.missions;

			$rootScope.pendingRequests--;
			$scope.checkLoadingDiv();

		}).error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.

			$rootScope.pendingRequests--;
			$scope.checkLoadingDiv();
		});

	};

	$scope.missionDetail = function(mission){
		console.log(mission);

		$scope.detailedMission = mission;
		$('#missionModal').modal();
	};

});