

angular.module('fypApp')
	.controller('MainCtrl', function($scope,$q,$http){

		$scope.data = {
			elevation : 0
		};

		$scope.key1 = "AIzaSyCiI1Q0cmbWn6Kpw3abRXkiSt6RCtir9GU";

		$scope.map = {center: {latitude: 12.9716, longitude: 77.5946}, zoom: 12, bounds: {}, options: { scrollwheel: false}};
        $scope.bounds =  {
            sw: {
                latitude: $scope.map.center.latitude-0.0002,
                longitude: $scope.map.center.longitude-0.0002
            },
            ne: {
                latitude: $scope.map.center.latitude+0.0002,
                longitude: $scope.map.center.longitude+0.0002
            }
        }
		//Windows + R : chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security

		$scope.result = ""
		$scope.compute = function(){
			var promise = sendData();
			promise.then(function(result){
				if(result == 1.0){
					$scope.result = "Spruce";
				}
				else if(result == 2.0){
					$scope.result = "Lodgepole Pine";
				}
				else if(result == 3.0){
					$scope.result = "Poderosa Pine";
				}
				else if(result == 4.0){
					$scope.result = "Cottonwood/Willow";
				}
				else if(result == 5.0){
					$scope.result = "Aspen";
				}
				else if(result == 6.0){
					$scope.result = "Douglas-Fir";
				}
				else if(result == 7.0){
					$scope.result = "Krummholz";
				}
				//$scope.result = result;
			})
		}

		$scope.elevation = function(){

			var topLeftLat = $scope.bounds.ne.latitude;
			var topLeftLong = $scope.bounds.sw.longitude;

			var bottomLeftLat = $scope.bounds.sw.latitude;
			var bottomLeftLong = $scope.bounds.sw.longitude;

			var bottomRightLat = $scope.bounds.sw.latitude;
			var bottomRightLong = $scope.bounds.ne.longitude;

			var topRightLat = $scope.bounds.ne.latitude;
			var topRightLong = $scope.bounds.ne.longitude;

			var locationArray = topLeftLat + ',' + topLeftLong;
			locationArray += "|" + topRightLong + ',' + topRightLong;
			locationArray += "|" + bottomLeftLat + ',' + bottomLeftLong;
			locationArray += "|" + bottomRightLat + ',' + bottomRightLong;

			var endpoint = "https://maps.googleapis.com/maps/api/elevation/json?locations=" + locationArray + "&key=" + $scope.key1;
			$http({
				method: "GET",
				url: endpoint,
				header: {
					"Access-Control-Allow-Origin" : "http:localhost:1337"
				}
			}).then(function success(response){
				//console.log(response.data.results);
				calculateElevation(response.data.results);
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
			//Should return 1
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
			//Should Return 2
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

		var calculateElevation = function(data){
			var total = 0;
			for(var i = 0; i<data.length;i++){
				//console.log(data[i].elevation);
				total += data[i].elevation;
			}
			console.log(total);
			$scope.data.elevation = 0;
			$scope.data.elevation = total/4;
		}
	});