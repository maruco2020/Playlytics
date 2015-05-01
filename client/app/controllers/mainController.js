(function(){
	'use strict';

	angular.module('Playlytics')

	.controller('MainController', MainController);

	MainController.$inject = ['Spotify', '$log', '$q'];

	function MainController(Spotify, $log, $q){
		var vm = this;

		vm.querySearch   = querySearch;
		vm.selectedItemChange = selectedItemChange;
		vm.searchTextChange   = searchTextChange;

		function format(query) {
		  var search = query.split(' '), result = '';

		  for( var i = 0; i < search.length; i++ ){
		    if( i === search.length - 1){
		   		result = result + search[i];
		   	} else {
		   		result = result + search[i] + '%20';
		   	}
		  }

		  return result;
		}

		function querySearch (query) {
		  var deferred = $q.defer();

		  Spotify
		    .getTracks(format(query))
		    .then(function(res){
		      var tracks = res.data.tracks.items;
		        deferred.resolve(tracks);
		    });

		  return deferred.promise;
		}

		function searchTextChange(text) {
		  $log.info('Text changed to ' + text);
		}

		function selectedItemChange(item) {
			console.log(item.duration_ms, item.popularity);
		  $log.info('Item changed to ' + JSON.stringify(item));
		}
	}
})();