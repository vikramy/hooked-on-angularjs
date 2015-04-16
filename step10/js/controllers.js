var demoControllers = angular.module('demoControllers', []);

demoControllers.controller('PhoneListCtrl', ['$scope', '$rootScope', '$http',
	function ($scope, $rootScope, $http) {
		if(angular.isObject($rootScope.phones)) {
			$scope.phones = $rootScope.phones;
		} else {
			$http.get('/json/phones.json').success(function(data) {
				$rootScope.phones = $scope.phones = data;
			});
		}
		
		$scope.orderProp = 'age';

		$scope.setImage = function($event, imageUrl) {
			$event.target.src = imageUrl;
		};
	}
]);

demoControllers.controller('PhoneDetailCtrl', ['$scope', '$rootScope', '$routeParams', '$sce',
	function($scope, $rootScope, $routeParams, $sce) {
		$scope.phoneId = $routeParams.phoneId;
		$scope.phones = $rootScope.phones;
		$scope.detailContent = $sce.trustAsHtml("This phone is the <strong>greatest</strong>!");//$sce.trustAsHtml("This phone is the <strong>greatest</strong>!");
	}
]);

demoControllers.controller('MapCtrl', ['$scope',
	function($scope) {
	}
]);

demoControllers.controller('LocateCtrl', ['$scope', '$rootScope', 'geolocation',
	function($scope, $rootScope, geolocation) {
		$scope.locate = function() {
			geolocation().then(function(position) {
				$rootScope.latitude = position.coords.latitude;
				$rootScope.longitude = position.coords.longitude;
				$rootScope.$broadcast("locationUpdated");
			});
		};
	}
]);