(function(){
	'use strict';

	angular.module('Playlytics')

	.controller('MainController', MainController);

	MainController.$inject = ['Spotify', '$log', '$q', '$scope', '$rootScope'];

	function MainController(Spotify, $log, $q, $scope, $rootScope){
		var vm = this;

		vm.clear = clear;
		vm.console = console;
		vm.test = undefined;
		vm.items = [];
		vm.querySearch   = querySearch;
		vm.cool = 0;
		vm.removeTrack = removeTrack;
		vm.selectedItemChange = selectedItemChange;
		vm.searchTextChange   = searchTextChange;
		vm.timeConvert = timeConvert;
		vm.totalTime = 0;
		vm.total = 0;

		function Playlist(name, list, pop, time) {
			this.name = name;
			this.list = list;
			this.pop = null;
			this.totalTime = time;
			this.tags = [];
		}

		function clear(){
			vm.items = [];
		}

		function console(){
			if( !vm.test ){
				throw new Error('Enter a playlist name!')
			} else {
				$log.info(vm.items);
				var copy = vm.items.slice();
				$log.info(copy);
				vm.items = [];

				var playlist = new Playlist(vm.test, copy, vm.total, vm.totalTime);
				localStorage.setItem(vm.test, JSON.stringify(playlist));

				$log.info(playlist);
			}
		}

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

		function removeTrack(idx){
			var remove = vm.items[idx];
			vm.items.splice(idx, 1);
			$log.info(vm.items);
		}
		function searchTextChange(text) {
		  // $log.info('Text changed to ' + text);
		}

		function selectedItemChange(item) {
		  // $log.info('Item changed to ' + JSON.stringify(item));
		  if( item ){
		  	$log.info(vm.items);
		  	vm.items.push(item);
		  	vm.totalTime = vm.totalTime + item.duration_ms;
		  	vm.cool = vm.cool + item.popularity;
		  	vm.total = Math.floor(vm.cool / vm.items.length);
		  }
		}

		function timeConvert(ms){
			var minutes = Math.floor(ms / 60000);
			var seconds = ((ms % 60000) / 1000).toFixed(0);

			return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
		}
	}
})();