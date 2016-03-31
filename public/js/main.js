

angular.module('fypApp')
	.controller('MainCtrl', function($scope,$q,$http){


		$scope.key1 = "AIzaSyCiI1Q0cmbWn6Kpw3abRXkiSt6RCtir9GU";

		$scope.map = {center: {latitude: 2, longitude: 2}, zoom: 6, bounds: {}, options: { scrollwheel: false}};
        $scope.bounds =  {
            sw: {
                latitude: $scope.map.center.latitude-2,
                longitude: $scope.map.center.longitude-2
            },
            ne: {
                latitude: $scope.map.center.latitude+2,
                longitude: $scope.map.center.longitude+2
            }
        }
		//chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security

		$scope.result = ""
		$scope.compute = function(){
			var promise = sendData();
			promise.then(function(result){
				$scope.result = result;
			})
		}

		$scope.elevation = function(){
			$http({
				method: "GET",
				url: "https://maps.googleapis.com/maps/api/elevation/json?locations=39.7391536,-104.9847034&key=" + $scope.key1,
				header: {
					"Access-Control-Allow-Origin" : "http:localhost:1337"
				}
			}).then(function success(response){
				console.log(response);
			}, function error(error){
				console.log(error);
			});
		}

		$scope.test1 = function(){
			$scope.data = {};
			$scope.data.elevation = 2596;
			$scope.data.aspect = 51;
			$scope.data.slope = 3;
			$scope.data.hor_hydro = 258;
			$scope.data.ver_hydro = 0;
			$scope.data.hor_road = 510;
			$scope.data.hill9 = 221;
			$scope.data.hill12 = 232;
			$scope.data.hill3 = 148;
			$scope.data.hor_fire = 6279;
			//Should return 5
		}

		$scope.test2 = function(){
			$scope.data = {};
			$scope.data.elevation = 2722;
			$scope.data.aspect = 315;
			$scope.data.slope = 24;
			$scope.data.hor_hydro = 30;
			$scope.data.ver_hydro = 19;
			$scope.data.hor_road = 3216;
			$scope.data.hill9 = 148;
			$scope.data.hill12 = 212;
			$scope.data.hill3 = 200;
			$scope.data.hor_fire = 6132;
			//Should return 2
		}

		$scope.test3 = function(){
			$scope.data = {};
			$scope.data.elevation = 2804;
			$scope.data.aspect = 139;
			$scope.data.slope = 9;
			$scope.data.hor_hydro = 268;
			$scope.data.ver_hydro = 65;
			$scope.data.hor_road = 3180;
			$scope.data.hill9 = 234;
			$scope.data.hill12 = 238;
			$scope.data.hill3 = 135;
			$scope.data.hor_fire = 6121;
			//Should Return 1
		}

		var sendData = function(){
			var deferred = $q.defer();

			$http({
				method: "POST",
				url: "http://localhost:1337/compute",
				data: $scope.data
			}).then(function success(response){
				console.log(response.data["0"]);
				deferred.resolve(response.data["0"]);

			}, function error(error){

				deferred.reject(error);

			})

			return deferred.promise;
		}

	});