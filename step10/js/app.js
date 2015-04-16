var demoApp = angular.module('demoApp', [
	'ngAnimate',
	'ngTouch',
	'ngRoute',
	'demoControllers'
]);

demoApp.run(function($rootScope) {
    $rootScope.phones = null;
});

demoApp.config(function($sceProvider) {
    $sceProvider.enabled(true);
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
            var infowindow = new google.maps.InfoWindow({ maxWidth: 400 });
            var map = null;
            var mapOptions = {
                zoom: Number(attrs.zoom),
                center: new google.maps.LatLng(attrs.latitude, attrs.longitude),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                animation: google.maps.Animation.DROP,
            };
            
            map = new google.maps.Map(document.getElementById(attrs.id), mapOptions);

			scope.$on('locationUpdated', function() {
				var latlong = new google.maps.LatLng($rootScope.latitude, $rootScope.longitude);
				var marker = new google.maps.Marker({ position: latlong, title: "Your Location", description: "Hey this is where I'm currently at!", map: map});
                map.setZoom(16);
				map.panTo(latlong);

                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent("<h2>" + marker.title + "</h2>" + "<p>" + marker.description + "</p>");
                    infowindow.open(map, marker);
                });
			});
        }
    };
});

demoApp.factory('geolocation', ['$q', '$window',
    function ($q, $window) {
        return function () {
            var deferred = $q.defer();
            var options = { maximumAge: 15000, timeout: 15000, enableHighAccuracy: false };

            function onSuccess(position) {
                deferred.resolve(position);
            }

            function onError(error) {
                $window.navigator.notification.alert('There was a problem locating your position, please manually enter your city, state or zipcode.', null, 'Failed to Locate Position', 'Close');
                deferred.resolve(null);
            }

            navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

            return deferred.promise;
        };
    }
]);