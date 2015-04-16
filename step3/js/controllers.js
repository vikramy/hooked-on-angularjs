var demoApp = angular.module('demoApp', []);

demoApp.controller('PhoneListCtrl', function ($scope, $http) {
	$http.get('/json/phones.json').success(function(data) {
		$scope.phones = data;
	});

	$scope.orderProp = 'age';
});