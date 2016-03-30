

angular.module('fypApp')
	.controller('MainCtrl', function($scope,$q,$http){

		$scope.result = ""
		$scope.compute = function(){
			var promise = sendData();
			promise.then(function(result){
				$scope.result = result;
			})
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