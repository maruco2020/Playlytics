(function(){
	'use strict';

	angular.module('Playlytics')

	.factory('Spotify', Spotify);

	Spotify.$inject = ['$http'];

	function Spotify($http){
		var service = {
			getTracks: getTracks
		}
		return service;

		function getTracks(query){
			return $http.get('https://api.spotify.com/v1/search?q=' + query + '&type=track');
		}
	}
})();