(function(){
	'use strict';

	angular.module('Playlytics')

	.controller('MainController', MainController);

	MainController.$inject = ['Spotify', '$log', '$q', '$scope', '$rootScope', '$mdDialog'];

	function MainController(Spotify, $log, $q, $scope, $rootScope, $mdDialog){

		var vm = this;

		vm.alert = '';

		vm.clear = clear;
		vm.cool = 0;
		vm.name = 'Your playlist';
		vm.html = '';
		vm.isReadonly = true;
		vm.items = [];
		vm.max = 5;
		vm.querySearch = querySearch;
		vm.removeTrack = removeTrack;
		vm.saveToLocal = saveToLocal;
		vm.selectedItemChange = selectedItemChange;
		vm.searchTextChange   = searchTextChange;
		vm.showAlert = showAlert;
		vm.timeConvert = timeConvert;
		vm.total = 0;
		vm.totalTime = 0;

		function Playlist(name, list, pop, time) {
			this.name = name;
			this.list = list;
			this.pop = null;
			this.totalTime = time;
			this.tags = [];
		}

		function clear(){
			vm.items = [];

			vm.total = 0;
			vm.totalTime = 0;
			vm.name = '';
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
			vm.total = vm.total - vm.items[idx].popularity;
			vm.totalTime = vm.totalTime - vm.items[idx].duration_ms;
			vm.items.splice(idx, 1);
		}
		function searchTextChange(text) {
		  // $log.info('Text changed to ' + text);
		}

		function selectedItemChange(item) {
		  // $log.info('Item changed to ' + JSON.stringify(item));
		  if( item ){
		  	$log.info(item);
		  	vm.items.push(item);
		  	vm.totalTime = vm.totalTime + item.duration_ms;
		  	vm.cool = vm.cool + item.popularity;
		  	vm.total = Math.floor(vm.cool / vm.items.length);
		  }
		}

		function saveToLocal(){
			if( !vm.name ){
				throw new Error('Enter a playlist name!')
			} else {
				var copy = vm.items.slice();

				var playlist = new Playlist(vm.name, copy, vm.total, vm.totalTime);
				localStorage.setItem(vm.name, JSON.stringify(playlist));

				$log.info(playlist);
			}
		}

		function showAlert(ev) {
		    var title = '', content = '';
		    if( vm.name === 'Your playlist' || !vm.name ){
		    	title = 'Error!';
		    	content = 'Enter a unique playlist name!';
		    } else if( localStorage.getItem( vm.name ) ){
		    	title = 'Nice!';
		    	content = 'Your playlist' + ' ' + vm.name + ' ' + 'has been updated.';
		    	saveToLocal();
		    } else {
		    	title = 'Congrats!';
		    	content = 'Your playlist' + ' ' + vm.name + ' ' + 'has been saved!';
		    	saveToLocal();
		    }
		    $mdDialog.show(
		      $mdDialog.alert()
		        .title(title)
		        .content(content)
		        .ariaLabel('Alert Dialog Demo')
		        .ok('Got it!')
		        .targetEvent(ev)
		    );
		  };

		function timeConvert(ms){
			var minutes = Math.floor(ms / 60000);
			var seconds = ((ms % 60000) / 1000).toFixed(0);

			return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
		}
	}
})();