(function(){
	'use strict';

	angular
		.module('Playlytics')
		.factory('Spotify', Spotify);

	Spotify.$inject = ['$http'];

	function Spotify($http){
		var service = {
			formatQuery: formatQuery,
			getTracks: getTracks
		}
		return service;

		function formatQuery(query){
			var search = query.split(' ');
			var result = '';

			for( var i = 0; i < search.length; i++ ){
				if( i === search.length - 1){
					result = result + search[i];
				} else {
					result = result + search[i] + '%20';
				}
			}
			return result;
		}

		function getTracks(query){
			return $http.get('https://api.spotify.com/v1/search?q=' + query + '&type=track');
		}
	}
})();