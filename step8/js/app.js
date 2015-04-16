var demoApp = angular.module('demoApp', [
	'ngAnimate',
	'ngTouch',
	'ngRoute',
	'demoControllers'
]);

demoApp.run(function($rootScope) {
    $rootScope.phones = null;
});

demoApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/phones', {
			templateUrl: 'partials/phone-list.html',
			controller: 'PhoneListCtrl'
		}).
		when('/phones/:phoneId', {
			templateUrl: 'partials/phone-detail.html',
			controller: 'PhoneDetailCtrl'
		}).
		when('/map', {
			templateUrl: 'partials/map.html',
			controller: 'MapCtrl'
		}).
		otherwise({
		redirectTo: '/phones'
	});
}]);

demoApp.directive('googlemap', function($rootScope) {
    return {
        restrict: 'E',
        replace: true,
        template: '<div></div>',
        link: function(scope, element, attrs) {
            var map = null;
            var mapOptions = {
                zoom: Number(attrs.zoom),
                center: new google.maps.LatLng(attrs.latitude, attrs.longitude),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
				animation: google.maps.Animation.DROP,
            };
            
            map = new google.maps.Map(document.getElementById(attrs.id), mapOptions);
        }
    };
});